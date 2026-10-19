import {localizedPath} from "./routing";

export type CopyMessages = Record<string, string>;
export function normalizeCopy(value: string) { return value.replace(/\s+/g, " ").trim(); }
// Stable identifiers keep punctuation and technical prose out of message paths.
export function copyKey(value: string) {
  let hash = 2166136261;
  for (const char of normalizeCopy(value)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `s${(hash >>> 0).toString(16)}`;
}
export function createCopy(messages: CopyMessages, locale: string) {
  function copy<T>(value: T): T {
    if (typeof value !== "string" || !value.trim()) return value;
    const translated = messages[copyKey(value)];
    if (translated === undefined) return value;
    return (value.match(/^\s*/)?.[0] + translated + value.match(/\s*$/)?.[0]) as T;
  }
  copy.href = (path: string) => localizedPath(path, locale);
  return copy;
}
