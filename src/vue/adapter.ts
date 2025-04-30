import { type Ref, ref, watchEffect } from "vue"
import { type ReactiveState, ReactiveAdapter } from "../core"

export class VueReactiveAdapter extends ReactiveAdapter<any> {
  public create<T>(initialValue: T): ReactiveState<T> {
    const state = ref(initialValue) as Ref<T>;
    const subscribers = new Set<(value: T) => void>();

    watchEffect(() => {
      const currentValue = state.value;
      subscribers.forEach(cb => cb(currentValue));
    });

    return {
      get value() {
        return state.value;
      },
      set value(newValue: T) {
        state.value = newValue;
      },
      subscribe(callback: (value: T) => void) {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
      }
    };
  }

  public batchUpdate(callback: () => void): void {
    callback();
  }
}