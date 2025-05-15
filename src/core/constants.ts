import { isFirefox } from "./is"

export const DEBUG = true;

/** 预估尺寸 */
export const ESTIMATED_SIZE = 40

export const OVERSCAN = 4

export const BROWSER_MAX_HEIGHT = isFirefox ? 5000000 : 10000000;

export const UPDATE_VIRTUAL_STATE = 0b0001;

export const UPDATE_SCROLL_EVENT = 0b0100;

export const UPDATE_SIZE_EVENT = 0b0010;