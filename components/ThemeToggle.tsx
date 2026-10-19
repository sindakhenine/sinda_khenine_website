"use client";
import {useSyncExternalStore} from "react";
import {useCopy} from "@/i18n/use-copy";
import {themeStorageKey} from "@/lib/theme";
function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    let preference: string | null = null;
    try { preference = localStorage.getItem(themeStorageKey); } catch {}
    document.documentElement.dataset.theme = preference === "light" || preference === "dark" ? preference : media.matches ? "dark" : "light";
    callback();
  };
  window.addEventListener("storage", sync);
  window.addEventListener("sinda-theme-change", callback);
  media.addEventListener("change", sync);
  return () => { window.removeEventListener("storage", sync); window.removeEventListener("sinda-theme-change", callback); media.removeEventListener("change", sync); };
}
export function ThemeToggle() {
  const copy = useCopy();
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme || "light", () => "light");
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(themeStorageKey, next); } catch {}
    window.dispatchEvent(new Event("sinda-theme-change"));
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={copy(theme === "dark" ? "Switch to light mode" : "Switch to dark mode")} title={copy(theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}>
    <svg className="theme-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
    <svg className="theme-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>
  </button>;
}
