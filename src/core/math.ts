export const boil = <T>(
  array: readonly T[],
  callback: (a: T, b: T) => T
) => {
  if (!array || (array.length ?? 0) === 0) return null
  return array.reduce(callback)
}


export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function max<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}

export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function min<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) < get(b) ? a : b))
}

export const sort = <T>(
  array: readonly T[],
  getter: (item: T) => number,
  desc = false
) => {
  if (!array) return []
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc)
}

export function clamp(value: number, maximum: number): number;
export function clamp(value: number, minimum: number, maximum: number): number;
export function clamp(value: number, minimum: number, maximum?: number): number {
  if (maximum == null) {
    return Math.min(value, minimum);
  }

  return Math.min(Math.max(value, minimum), maximum);
}