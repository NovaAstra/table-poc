export type Signal<T> = [get: () => T, set: (v: T) => T]

export abstract class Adapter {
  public abstract createSignal<T>(value: T): Signal<T>;

  public abstract createEffect(callback: () => void): () => void;

  public abstract batchUpdate(callback: () => void): void;
}