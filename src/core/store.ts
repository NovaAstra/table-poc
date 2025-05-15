import { type ItemsRange, type ItemResize } from "./types"
import { Model, calculateRange, setItemSize } from "./model"
import { ESTIMATED_SIZE, OVERSCAN, UPDATE_SIZE_EVENT, UPDATE_VIRTUAL_STATE } from "./constants"
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

export type Action<T extends ActionType, P> = Readonly<{ type: T, payload: P }>;

export type Actions =
  | Action<ActionType.VIEWPORT_RESIZE, number>
  | Action<ActionType.VIEWPORT_ITEM_RESIZE, ItemResize[]>

export type Payload<T extends ActionType> = Extract<Actions, { type: T }>['payload']

export interface VirtualStore {
  getRange(): ItemsRange;
  update(actions: Actions): void;
}

export class Store implements VirtualStore {
  private readonly model: Model

  private viewportSize: number = 0;

  private scrollDirection: ScrollDirection = ScrollDirection.SCROLL_IDLE;

  public constructor(
    private readonly length: number,
    private readonly size: number = ESTIMATED_SIZE,
    private readonly overscan: number = OVERSCAN,
  ) {
    this.model = new Model(length, size)
  }

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

  public update({ type, payload }: Actions): void {
    let mutated = 0

    switch (type) {
      case ActionType.VIEWPORT_RESIZE: {
        if (this.viewportSize !== payload) {
          this.viewportSize = payload
          mutated = UPDATE_VIRTUAL_STATE + UPDATE_SIZE_EVENT
        }
        break;
      }
      case ActionType.VIEWPORT_ITEM_RESIZE: {
        const updated = payload.filter(([index, size]) => this.model.indices[index] !== size)

        if (!updated.length) break;

        for (const [index, size] of updated) {
          setItemSize(this.model, index, size);
        }

        mutated = UPDATE_VIRTUAL_STATE + UPDATE_SIZE_EVENT;
        break;
      }
    }

    if (mutated) {

    }
  }

  private calculateRange(offset: number) {
    return calculateRange(this.model, offset, this.viewportSize, 0);
  }
}