import { ref, nextTick, watchEffect } from "vue"
import { type Signal, Adapter } from "../core"

export class VueAdapter extends Adapter {
  private effects: (() => void)[] = [];

  public createSignal<T>(initialValue: T): Signal<T> {
    const state = ref<T>(initialValue);
    return [() => state.value as T, (v: T) => (state.value = v)];
  }

  public createEffect(callback: () => void): () => void {
    const stop = watchEffect(() => nextTick(callback));
    this.effects.push(stop);
    return stop;
  }

  public batchUpdate(callback: () => void): void {
    nextTick(callback);
  }

  public dispose() {
    this.effects.forEach(stop => stop());
    this.effects = [];
  }
}