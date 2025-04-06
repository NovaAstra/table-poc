export class Model {
  public constructor(
    public readonly size: number = 0,
    public readonly length: number = 0,
    public readonly indices: number[] = [],
    public readonly offsets: number[] = [],
    public readonly override: number[] = [],
  ) { }

  public get snapshot() {
    return new Snapshot(this.size, this.indices, this.override);
  }

  public static create(size: number = 0, length: number = 0) {
    return new Model(size, length);
  }
}

export class Snapshot {
  public constructor(
    public readonly size: number = 0,
    public readonly indices: number[] = [],
    public readonly override: number[] = [],
  ) { }
}

export function getItemSize(model: Model, index: number) {
  const size = model.indices[index]
  return size === undefined ? model.size : size
}