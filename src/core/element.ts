import { getCurrentWindow, getCurrentDocument } from "./global"

export const isElement = (input: unknown): input is Element => {
  if (input instanceof Element) return true;

  const scope = getCurrentWindow(getCurrentDocument(input as Node));
  return !!(scope && input instanceof scope.Element);
};