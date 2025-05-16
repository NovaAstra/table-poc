import { type Signal, Adapter } from "./adapter"
import { type VirtualStoreOptions, Store } from "./store";
import { type ItemsRange } from "./types";

export interface VirtualizerOptions extends VirtualStoreOptions {
  scrollElement: Element | Window;
  adapter: Adapter;
}

export class Virtualizer {
  private readonly store: Store;
  private readonly adapter: Adapter;

  private range: Signal<ItemsRange>;

  public constructor(opts: VirtualizerOptions) {
    this.adapter = opts.adapter;
    this.range = opts.adapter.createSignal([0, 0]) as unknown as Signal<ItemsRange>

    this.store = new Store(opts);
  }
}