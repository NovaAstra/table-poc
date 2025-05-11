import { min } from "./math"

export class Model {
  public lastMeasuredIndex: number = -1;

  public constructor(
    public readonly length: number,
    public readonly size: number,
    public readonly indices: number[] = [],
    public readonly offsets: number[] = [],
    public readonly override: number[] = [],
  ) { }
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

  return 0
}

export function calculateRange(
  model: Model,
  scrollOffset: number,
  viewportSize: number,
  lastVisibleStartIndex: number
) {
  lastVisibleStartIndex = min([lastVisibleStartIndex, model.length - 1]);

  if (calculateOffset(model, lastVisibleStartIndex) <= scrollOffset) {
    const end = calculateIndex(model, scrollOffset + viewportSize, lastVisibleStartIndex)
    return [calculateIndex(model, scrollOffset, lastVisibleStartIndex), end]
  } else {
    const start = calculateIndex(model, scrollOffset, 0, lastVisibleStartIndex);
    return [start, calculateIndex(model, scrollOffset + viewportSize, start)];
  }

  return [0, 0]
}