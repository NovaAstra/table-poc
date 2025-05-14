import { Adapter } from "./adapter"
import { GridResizer } from "./resizer"
import { Scroller } from "./scroller"
import { Store } from "./store"
import { ESTIMATED_SIZE, OVERSCAN } from "./constants"

export type Size = [height: number, width: number]

export interface TableOptions {
  row: number;
  col: number;
  size?: Partial<Size> | number;
  overscan?: number;
}

export const DEFAULT_CELL_SIZE: Size = [ESTIMATED_SIZE, ESTIMATED_SIZE]

export class Table {
  public readonly options: Required<TableOptions> & { size: Size };

  public readonly adapter: Adapter;

  public readonly scroller: Scroller
  public readonly resizer: GridResizer

  public readonly hs: Store;
  public readonly vs: Store;

  public constructor(options: TableOptions, adapter: Adapter) {
    const opts = this.getOptions(options)

    const { row, size, overscan } = opts
    this.hs = new Store(row, size[0], overscan)
    this.vs = new Store(row, size[1], overscan)

    this.options = opts
    this.adapter = adapter

    this.scroller = new Scroller()
    this.resizer = new GridResizer(this.hs, this.vs)
  }

  private getOptions(
    options: TableOptions
  ): Required<TableOptions> & { size: Size } {
    options = Object.assign(
      { overscan: OVERSCAN },
      options,
      { size: this.getSize(options.size) }
    )

    return options as Required<TableOptions> & { size: Size };
  }

  private getSize(size: Partial<Size> | number = DEFAULT_CELL_SIZE): Size {
    return typeof size === 'number'
      ? [size, size]
      : [size[0] ?? ESTIMATED_SIZE, size[1] ?? ESTIMATED_SIZE]
  }
}