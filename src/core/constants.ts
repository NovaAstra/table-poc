import { isFirefox } from "./is"

export const DEBUG = true;

/** 预估尺寸 */
export const ESTIMATED_SIZE = 40

export const OVERSCAN = 4

export const BROWSER_MAX_HEIGHT = isFirefox ? 5000000 : 10000000;