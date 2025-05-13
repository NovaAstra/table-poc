import { type ItemsRange } from "./types"
import { Model, calculateRange } from "./model"
import { min, max } from "./math"

export const ESTIMATED_SIZE = 40
export const OVERSCAN = 4

export enum ActionType {
  VIEWPORT_RESIZE
}

export enum ScrollDirection {
  SCROLL_IDLE,
  SCROLL_DOWN,
  SCROLL_UP
}

export type Action<T extends ActionType, P> = [type: T, payload: P];
export type Actions =
  | Action<ActionType.VIEWPORT_RESIZE, number>

const actions = {
  [ActionType.VIEWPORT_RESIZE](this: Store, size: number) {
    if (this.viewportSize != size) {
      this.viewportSize = size
    }
  }
} satisfies {
  [K in ActionType]: (payload: Extract<Actions, [K, any]>[1]) => void
};

export abstract class VirtualStore {
  public readonly model: Model

  public constructor(
    public readonly length: number,
    public readonly size: number = ESTIMATED_SIZE,
    public readonly overscan: number = OVERSCAN
  ) {
    this.model = new Model(length, size)
  }

  public abstract update<K extends ActionType>(type: K, payload: Extract<Actions, [K, any]>[1]): void;
  public abstract update(...actions: Actions): void;

  public abstract getRange(): ItemsRange;
}

export class Store extends VirtualStore {
  public viewportSize: number = 0

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

  public update<K extends ActionType>(type: K, payload: Extract<Actions, [K, any]>[1]) {
    actions[type].call(this, payload)
  }

  private calculateRange(offset: number) {
    return calculateRange(this.model, offset, this.viewportSize, 0);
  }
}