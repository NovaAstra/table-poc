export class Model {
  public constructor(
    public readonly defaultSize: number = 0,
    public readonly length: number = 0,
    public readonly indices: number[] = [],
    public readonly offsets: number[] = [],
    public readonly override: number[] = [],
  ) { }

  public static create(size: number = 0, length: number = 0) {
    return new Model(size, length);
  }
}

export function getItemSize(model: Model, index: number): number {
  return model.indices[index] ?? model.defaultSize
}

export function setItemSize(model: Model, index: number, size: number): number {
  model.indices[index] = size
  return size;
}