import { isBrowserEnv, isTestEnv } from './is'

export const getGlobal = (): Window => (isBrowserEnv || isTestEnv ? window : {} as Window);

export const global = getGlobal()

export const noop = Object.freeze(<T extends unknown[]>(..._: T): void => { });

export const getDocumentElement = (): HTMLElement => document.documentElement;

export const getCurrentDocument = (node: Node): Document => node.ownerDocument ?? document;

export const getCurrentWindow = (doc: Document): Window & typeof globalThis => doc.defaultView ?? window;