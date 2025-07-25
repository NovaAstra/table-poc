import { type ItemsRange } from "./types"
import { min, clamp } from "./math"

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
  return model.indices[index] = size;
}

export function estimateItemSize() { }

export function calculateOffset(model: Model, index: number): number {
  if (!model.length || index < 0) return 0;

  if (model.lastMeasuredIndex >= index)
    return model.offsets[index]

  let idx = model.lastMeasuredIndex
  let top = model.offsets[index];
  while (idx++ < index) {
    top += getItemSize(model, idx)
    model.offsets[idx] = top
  }

  model.lastMeasuredIndex = index
  return top;
}

export function calculateSizes(model: Model) {
  if (!model.length) return 0;
  return (
    calculateOffset(model, model.length - 1) +
    getItemSize(model, model.length - 1)
  )
}

export function calculateIndex(
  model: Model,
  offset: number,
  start: number = 0,
  end: number = model.length - 1
) {
  while (start <= end) {
    let middle = start + ((end - start) >> 1);

    const measuredOffset = calculateOffset(model, middle);
    if (measuredOffset <= offset) {
      if (measuredOffset + getItemSize(model, middle) > offset) {
        return middle;
      }

      start = middle + 1
    } else {
      end = middle - 1
    }
  }

  return clamp(start, 0, model.length - 1)
}

export function calculateRange(
  model: Model,
  scrollOffset: number,
  viewportSize: number,
  lastVisibleStartIndex: number
): ItemsRange {
  lastVisibleStartIndex = min([lastVisibleStartIndex, model.length - 1]);

  if (calculateOffset(model, lastVisibleStartIndex) <= scrollOffset) {
    const end = calculateIndex(model, scrollOffset + viewportSize, lastVisibleStartIndex)
    return [calculateIndex(model, scrollOffset, lastVisibleStartIndex), end]
  } else {
    const start = calculateIndex(model, scrollOffset, 0, lastVisibleStartIndex);
    return [start, calculateIndex(model, scrollOffset + viewportSize, start)];
  }
}