import { getDocumentElement } from "./global"

export const isType = (type: string) =>
  (input: unknown) => Object.prototype.toString.call(input) === `[object ${type}]`

export const isWindow = isType("Window")

export const isBrowserEnv = isWindow(typeof window !== 'undefined' ? window : 0)

export const isTestEnv =
  (typeof navigator !== 'undefined' && navigator.userAgent.includes('jsdom')) ||
  // @ts-expect-error: jsdom
  (typeof window !== 'undefined' && window.jsdom)

export const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

export const isIOSWebKit = () => /iP(hone|od|ad)/.test(navigator.userAgent);

export const isSmoothScrollSupported = (): boolean => "scrollBehavior" in getDocumentElement().style;
