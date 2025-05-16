import { type ItemsRange, type ItemResize } from "./types"
import { Model, setItemSize } from "./model"
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

export enum ScrollBehavior {
  AUTO,
  SMOOTH
}

export type Action<T extends ActionType, P> = Readonly<[type: T, payload: P]>;

export type Actions =
  | Action<ActionType.VIEWPORT_RESIZE, number>
  | Action<ActionType.VIEWPORT_ITEM_RESIZE, ItemResize[]>

export type Payload<T extends ActionType> = Extract<Actions, { type: T }>[1]

export interface VirtualStoreOptions {
  count: number;
  size?: number;
  overscan?: number;
  debug?: boolean;
}

export interface VirtualStore {
  getRange(): ItemsRange;
  update(...actions: Actions): void;
}

export class Store implements VirtualStore {
  public options!: Required<VirtualStoreOptions>;
  public readonly cache: Model;

  private viewportSize: number = 0;
  private scrollOffset: number = 0;
  private scrollDirection: ScrollDirection = ScrollDirection.SCROLL_IDLE;

  public constructor(opts: VirtualStoreOptions) {
    this.setOptions(opts)

    const { count, size } = this.options
    this.cache = new Model(count, size)
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

  public update(): void {
    const [type, payload] = arguments as unknown as Actions;

    let mutated: number = 0
    let shouldSync: boolean = false;

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

  private setOptions(opts: VirtualOptions) {
    Object.entries(opts).forEach(([key, value]) => {
      if (typeof value === 'undefined') delete (opts as any)[key]
    })

    this.options = {
      size: ESTIMATED_SIZE,
      overscan: OVERSCAN,
      debug: false,
      ...opts,
    }
  }

  public subscribe() { }
}