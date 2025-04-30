import { getCurrentDocument, getCurrentWindow } from "./global";

export function createResizeObserver(callback: ResizeObserverCallback) {
  let observer: ResizeObserver | undefined;

  return {
    observe(element: HTMLElement) {
      (
        observer ||
        (observer = new (getCurrentWindow(getCurrentDocument(element)).ResizeObserver)(callback))
      ).observe(element);
    },
    unobserve(element: HTMLElement) {
      observer!.unobserve(element);
    },
    disconnect() {
      observer && observer.disconnect()
    }
  }
}

export function createGridResizer() {
  let root: HTMLElement | undefined;

  const mountedIndexes = new WeakMap<
    Element,
    [rowIndex: number, colIndex: number]
  >();
  const maybeCachedRowIndexes = new Set<number>();
  const maybeCachedColIndexes = new Set<number>();

  const observer = createResizeObserver(() => {

  })

  return {
    observeRoot(element: HTMLElement) {
      observer.observe(root = element)
    },
    observeItem(element: HTMLElement, rowIndex: number, colIndex: number) {
      mountedIndexes.set(element, [rowIndex, colIndex]);
      maybeCachedRowIndexes.add(rowIndex);
      maybeCachedColIndexes.add(colIndex);
      observer.observe(element);
    },
    disconnect: observer.disconnect
  }
}