export interface ReactiveState<T> {
  value: T;
  subscribe(callback: (value: T) => void): () => void;
}

export abstract class ReactiveAdapter<T> {
  abstract create(initialValue: T): ReactiveState<T>;
  abstract batchUpdate(callback: () => void): void;
}