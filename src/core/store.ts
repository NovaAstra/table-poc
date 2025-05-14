import { type ItemsRange, type ItemResize } from "./types"
import { type Signal, Adapter } from "./adapter"
import { Model, calculateRange } from "./model"
import { ESTIMATED_SIZE, OVERSCAN } from "./constants"
import { min, max } from "./math"

export enum ActionType {
  VIEWPORT_RESIZE,
  VIEWPORT_ITEM_RESIZE
}

export enum ScrollDirection {
  SCROLL_IDLE,
  SCROLL_DOWN,
  SCROLL_UP
}

export type Action<T extends ActionType, P> = { type: T, payload: P };
export type Actions =
  | Action<ActionType.VIEWPORT_RESIZE, number>
  | Action<ActionType.VIEWPORT_ITEM_RESIZE, ItemResize>

const actions = {
  [ActionType.VIEWPORT_RESIZE](this: Store, size: number) {
    if (this.viewportSize != size) {
      this.viewportSize = size
    }
  },
  [ActionType.VIEWPORT_ITEM_RESIZE](this: Store, payload: ItemResize) {
    console.log(payload)
  }
} satisfies {
  [T in ActionType]: (this: Store, payload: Extract<Actions, { type: T }>['payload']) => void
};

export abstract class VirtualStore {
  public readonly model: Model

  public constructor(
    public readonly length: number,
    public readonly size: number = ESTIMATED_SIZE,
    public readonly overscan: number = OVERSCAN,
    public readonly adapter: Adapter
  ) {
    this.model = new Model(length, size)
  }

  public abstract update<T extends ActionType>(type: T, payload: Extract<Actions, { type: T }>['payload']): void;
  public abstract update(actions: Actions): void;

  public abstract getRange(): ItemsRange;
}

export class Store extends VirtualStore {
  public version: Signal<number> = this.adapter.createSignal(0);

  public viewportSize: number = 0;

  public scrollDirection: ScrollDirection = ScrollDirection.SCROLL_IDLE;

  public getRange() {
    let startIndex: number = 0;
    let endIndex: number = 0;

    [startIndex, endIndex] = this.calculateRange(max([0]));

    if (this.scrollDirection !== ScrollDirection.SCROLL_DOWN) {
      startIndex -= max([0, this.overscan]);
    }
    if (this.scrollDirection !== ScrollDirection.SCROLL_UP) {
      endIndex += max([0, this.overscan]);
    }

    return [
      max([startIndex, 0]),
      min([endIndex, this.model.length - 1])
    ] as ItemsRange;
  }

  public update<T extends ActionType>(...actions: [Actions] | [T, Extract<Actions, { type: T }>["payload"]]) {
    const [type, payload] = actions.length === 1 ? [actions[0].type, actions[0].payload] : actions
    actions[type].call(this, payload)
  }

  private calculateRange(offset: number) {
    return calculateRange(this.model, offset, this.viewportSize, 0);
  }
}