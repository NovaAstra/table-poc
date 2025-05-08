import { isElement } from "./element"
import { getCurrentWindow, getCurrentDocument } from "./global"

export class Resizer {
  public static connect(callback: ResizeObserverCallback) {
    return new Resizer(callback);
  }

  private observer: ResizeObserver | undefined;

  private readonly callback: ResizeObserverCallback

  public constructor(callback: ResizeObserverCallback) {
    if (arguments.length === 0)
      throw new TypeError(`Failed to construct 'Resizer': 1 argument required, but only 0 present.`)

    if (typeof callback !== 'function')
      throw new TypeError(`Failed to construct 'Resizer': The callback provided as parameter 1 is not a function.`);

    this.callback = callback
  }

  public observe(target: Element, options?: ResizeObserverOptions): Resizer {
    if (arguments.length === 0)
      throw new TypeError(`Failed to execute 'observe' on 'Resizer': 1 argument required, but only 0 present.`)

    if (!isElement(target))
      throw new TypeError(`Failed to execute 'observe' on 'Resizer': parameter 1 is not of type 'Element`);

    (
      this.observer ||
      (this.observer = new (getCurrentWindow(getCurrentDocument(target as Node)).ResizeObserver)(this.callback))
    ).observe(target, options);

    return this;
  }

  public unobserve(target: Element): void {
    if (arguments.length === 0)
      throw new TypeError(`Failed to execute 'unobserve' on 'Resizer': 1 argument required, but only 0 present.`)

    if (!isElement(target))
      throw new TypeError(`Failed to execute 'unobserve' on 'Resizer': parameter 1 is not of type 'Element`);

    this.observer!.unobserve(target)
  }

  public disconnect(): void {
    this.observer!.disconnect()
  }

  public static toString(): string {
    return 'function Resizer () { [native code] }';
  }
}

export class GridResizer {
  private readonly observer: Resizer

  private viewport: HTMLElement | undefined
  private readonly observedItems = new WeakMap<Element, [rowIndex: number, colIndex: number]>();

  public constructor() {
    const callback = (entries: ResizeObserverEntry[]) => {
      for (const { target, contentRect } of entries) {
        if (!(target as HTMLElement).offsetParent) continue;

        if (target === this.viewport) {

        } else {
          const item = this.observedItems.get(target);
          if (item) {
            const [rowIndex, colIndex] = item
            console.log(rowIndex, colIndex)
          }
        }

        console.log(target, contentRect)
      }
    }

    this.observer = new Resizer(callback)
  }

  public observeRoot(element: HTMLElement) {
    this.observer.observe(this.viewport = element)
  }

  public observeItem(element: HTMLElement, rowIndex: number, colIndex: number) {
    this.observedItems.set(element, [rowIndex, colIndex])
    this.observer.observe(element)

    return () => {
      this.observedItems.delete(element)
      this.observer.unobserve(element)
    }
  }

  public disconnect() {
    this.observer.disconnect()
  }
}