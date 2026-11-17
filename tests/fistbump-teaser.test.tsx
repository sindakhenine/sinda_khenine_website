import React from "react";
import {cleanup, fireEvent, render} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {FistbumpTeaser} from "../components/fistbump/FistbumpTeaser";
import {getFistbumpCopy} from "../content/projects/fistbump";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); this.dispatchEvent(new Event("close")); };
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {cleanup(); vi.restoreAllMocks();});

describe("Fistbump teaser", () => {
  it.each(["en", "de", "fr"])("loads video only on request and releases playback and scrolling when closed in %s", locale => {
    const t = getFistbumpCopy(locale);
    const view = render(<FistbumpTeaser watch={t.watch} close={t.closeVideo} note={t.videoNote}/>);
    expect(view.container.querySelector("video")).toBeNull();
    fireEvent.click(view.getByRole("button", {name: new RegExp(t.watch)}));
    const video = view.container.querySelector("video")!;
    expect(video.autoplay).toBe(false);
    expect(video.controls).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(view.getByRole("button", {name:t.closeVideo}));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(view.container.querySelector("video")).toBeNull();
    expect(view.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");
    fireEvent.click(view.getByRole("button", {name: new RegExp(t.watch)}));
    view.unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
