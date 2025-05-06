import { type ItemResize } from "./types"

export enum ActionType {
  VIEWPORT_RESIZE,
  VIEWPRT_SCROLL,
  ITEM_RESIZE,
  ITEM_LENGTH_UPDATED
}

export enum ScrollDirection {
  SCROLL_IDLE,
  SCROLL_DOWN,
  SCROLL_UP
}

export type Actions =
  | [type: ActionType.VIEWPORT_RESIZE, size: number]
  | [type: ActionType.VIEWPRT_SCROLL, offset: number]
  | [type: ActionType.ITEM_RESIZE, entries: ItemResize[]]
  | [type: ActionType.ITEM_LENGTH_UPDATED, length: number]

export const actions = {
  [ActionType.VIEWPORT_RESIZE](this: Store, size: number) {
    if (this.viewportSize !== size) {
      this.viewportSize = size
    }
  },
  [ActionType.VIEWPRT_SCROLL](this: Store, offset: number) {
    this.scrollOffset = offset;
  },
  [ActionType.ITEM_RESIZE](this: Store, entries: ItemResize[]) {
    const updated = entries.filter(
      ([_, size]) => size !== undefined
    );

    for (const [index, size] of updated) {
    }
  },
  [ActionType.ITEM_LENGTH_UPDATED](this: Store, length: number) {
  }
}

export abstract class VirtualStore {
  abstract update(...actions: Actions): void;
}

export class Store extends VirtualStore {
  public viewportSize: number = 0

  public scrollOffset: number = 0

  public update(...[type, payload]: Actions) {
    console.log(type, payload)
  }
}