export interface ParsedUrl {
  /** 资源标识符 */
  readonly id?: string;
  /** 备用回退URL */
  readonly fallback?: string;
  /** 资源实际路径 */
  readonly src: string;
  /** 是否为ES模块 */
  readonly isModule: boolean;
}

export type Arrayable<T> = T | T[]

export type Resource = Arrayable<string> | (() => Promise<void>)

export class Loader {
  private readonly loaded = new Set<string>();
  private readonly errors = new Set<(url: string, error: Error) => void>();

  public onError(callback: (url: string, error: Error) => void): Loader {
    this.errors.add(callback);
    return this;
  }

  public async load(...resources: Resource[]): Promise<Loader> {
    await Promise.all(
      resources.map(resource =>
        Array.isArray(resource)
          ? Promise.all(resource.map(url => this.load(url)))
          : typeof resource === 'function'
            ? resource()
            : this._load(resource)
      )
    )

    return this
  }

  public js(url: string) {
    const { src, isModule, fallback } = this._parse(url);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = isModule ? "module" : "text/javascript";
      script.src = src;

      script.onload = resolve;
      script.onerror = () => {
        fallback ? () => { } : reject()
      }

      document.head.append(script);
    })
  }

  public css(url: string) {
    const { src } = this._parse(url);
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      link.onload = resolve;
      link.onerror = reject;
      document.head.append(link);
    })
  }

  private async _load(url: string) {
    if (this.loaded.has(url)) return;

    try {
      url.endsWith(".css") ? await this.css(url) : await this.js(url);
      this.loaded.add(url);
    } catch (error) {
      for (const fn of this.errors) {
        fn(url, error as Error);
      }
      throw error;
    }
  }

  private _parse(url: string): ParsedUrl {
    if (typeof url !== 'string' || url.trim() === '')
      throw new TypeError(`Failed to construct 'Loader': The url provided as parameter 1 is not a string.`)

    const [path, hash] = url.split("#", 2)
    const isModule = path.startsWith('module:');
    const src = isModule ? path.slice(7) : path;
    if (!src)
      throw new TypeError(`Failed to construct 'Loader': The parsed resource path cannot be empty.`);

    const [fallback, id] = (hash?.split("=") || []).reduce(
      (a, p) => (p.startsWith("=") ? [p.slice(1), a[1]] : [a[0], p]),
      [undefined, undefined] as [string?, string?],
    );

    return {
      id,
      src,
      fallback,
      isModule
    }
  }
}