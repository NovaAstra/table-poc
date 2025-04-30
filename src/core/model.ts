export class Model {
  public lastMeasuredIndex: number = -1;

  public constructor(
    public readonly size: number = 0,
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
  return model.indices[index] ?? model.size
}

export function setItemSize(model: Model, index: number, size: number): number {
  model.indices[index] = size
  return size;
}

export function estimateItemSize() { }

export function calculateOffset(model: Model, index: number): number {
  if (!model.length || index < 0) return 0;

  if (model.lastMeasuredIndex >= index)
    return model.offsets[index]

  let idx = model.lastMeasuredIndex
  let top = 0;
  while (idx++ < index) {
    top += getItemSize(model, idx)
    model.offsets[idx] = top
  }

  return top;
}

export function calculateViewportSize(model: Model) {
  if (!model.length) return 0;
  return 1
}

export function calculateIndex(model: Model, offset: number, start: number, end: number = model.length - 1) {
  while (start <= end) {
    let middle = start + ((end - start) >> 1);

    const measuredOffset = calculateOffset(model, middle);
    if (measuredOffset <= offset) {
      start = middle + 1
    } else {
      end = middle - 1
    }
  }

  return
}