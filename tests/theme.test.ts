import {afterEach, describe, expect, it, vi} from "vitest";
import {themeScript, themeStorageKey} from "../lib/theme";
afterEach(() => {localStorage.clear(); delete document.documentElement.dataset.theme; vi.unstubAllGlobals(); vi.restoreAllMocks();});
describe("theme before first paint", () => {
  it("uses the saved choice ahead of the system preference", () => {
    vi.stubGlobal("matchMedia", () => ({matches:true}));
    localStorage.setItem(themeStorageKey, "light");
    new Function(themeScript)();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
  it("uses the system when there is no saved preference", () => {
    vi.stubGlobal("matchMedia", () => ({matches:true}));
    new Function(themeScript)();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
  it("still works when browser storage is blocked", () => {
    vi.stubGlobal("matchMedia", () => ({matches:false}));
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {throw new Error("blocked")});
    new Function(themeScript)();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
