import React from "react";
import {act, cleanup, render} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {PageMotion} from "../components/PageMotion";
vi.mock("@/i18n/navigation", () => ({usePathname: () => "/"}));
afterEach(() => {cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks();});

function setup(reduced: boolean) {
  const preference = new EventTarget() as EventTarget & {matches: boolean};
  preference.matches = reduced;
  vi.stubGlobal("matchMedia", () => preference);
  let enter: IntersectionObserverCallback;
  const unobserve = vi.fn(), disconnect = vi.fn(), cancel = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) {enter = callback;}
    observe() {}
    unobserve = unobserve;
    disconnect = disconnect;
  });
  const animate = vi.fn(() => ({cancel, onfinish: null}));
  vi.stubGlobal("Animation", class {});
  Object.defineProperty(Element.prototype, "animate", {configurable: true, value: animate});
  const view = render(<><main id="main"><article data-reveal>My project</article></main><PageMotion/></>);
  const item = view.getByText("My project");
  const arrive = () => act(() => enter([{isIntersecting:true, target:item} as unknown as IntersectionObserverEntry], {} as IntersectionObserver));
  return {preference, animate, unobserve, disconnect, cancel, view, item, arrive};
}

describe("optional page motion", () => {
  it("keeps content visible and skips movement for reduced motion", () => {
    const {item, arrive, animate} = setup(true);
    arrive();
    expect(item.style.opacity).toBe("");
    expect(item.hidden).toBe(false);
    expect(animate).not.toHaveBeenCalled();
  });
  it("reveals arriving content once and releases observers on navigation", () => {
    const {arrive, animate, unobserve, disconnect, view, item, cancel} = setup(false);
    arrive();
    expect(animate).toHaveBeenCalledOnce();
    expect(unobserve).toHaveBeenCalledWith(item);
    view.unmount();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenCalledOnce();
  });
  it("stops an active animation when reduced motion is enabled", () => {
    const {arrive, preference, cancel} = setup(false);
    arrive();
    act(() => {preference.matches = true; preference.dispatchEvent(new Event("change"));});
    expect(cancel).toHaveBeenCalledOnce();
  });
});
