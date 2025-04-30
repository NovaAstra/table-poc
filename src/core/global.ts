import { isBrowserEnv, isTestEnv } from './is'

export const getGlobal = (): Window => {
  if (isBrowserEnv || isTestEnv) return window
  return {} as Window
}

export const _global = getGlobal()

export const noop = () => { }

export const getDocumentElement = () => document.documentElement;

export const getCurrentDocument = (node: HTMLElement): Document =>
  node.ownerDocument;

export const getCurrentWindow = (doc: Document) => doc.defaultView!;