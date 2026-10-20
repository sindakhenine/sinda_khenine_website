import React from "react";
import {cleanup, fireEvent, render, within} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {BookFeature} from "../components/book/BookFeature";

vi.mock("@vercel/analytics", () => ({track: vi.fn()}));
vi.mock("@/i18n/navigation", () => ({
  Link: ({children, ...props}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>
}));

beforeEach(() => {
  // jsdom does not implement the native dialog methods.
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("book discovery preview", () => {
  it("opens a bounded preview, explores layers, and releases scrolling when closed", () => {
    const view = render(<BookFeature locale="en"/>);
    expect(view.queryByRole("dialog")).toBeNull();
    fireEvent.click(view.getByRole("button", {name: "Open the book"}));
    const reader = within(view.getByRole("dialog"));
    expect(reader.getByText("“You are good at your life.”")).toBeTruthy();
    expect(document.body.style.overflow).toBe("hidden");
    expect(reader.getByRole("button", {name: "Previous glimpse"}).hasAttribute("disabled")).toBe(true);

    fireEvent.click(reader.getByRole("button", {name: "Next glimpse"}));
    fireEvent.click(reader.getByRole("button", {name: /Wiring/}));
    expect(reader.getByText("The reactions that arrive before you have time to think.")).toBeTruthy();
    expect(reader.getByRole("button", {name: /Wiring/}).getAttribute("aria-pressed")).toBe("true");
    expect(reader.getByRole("button", {name: /Ground/}).getAttribute("aria-pressed")).toBe("false");

    fireEvent.keyDown(view.getByRole("dialog"), {key: "ArrowRight"});
    expect(reader.getByText("Which part of your life feels chosen, and which part feels inherited?")).toBeTruthy();
    fireEvent.keyDown(view.getByRole("dialog"), {key: "ArrowRight"});
    expect(reader.queryByRole("button", {name: "Next glimpse"})).toBeNull();
    fireEvent.click(reader.getByRole("button", {name: "Close the book"}));
    expect(view.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");

    fireEvent.click(view.getByRole("button", {name: "Open a preview of The Subconscious Architect"}));
    expect(within(view.getByRole("dialog")).getByText("“You are good at your life.”")).toBeTruthy();
    view.unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it.each([
    ["de", "Das Buch öffnen", "Bevor du eintrittst", "Vorschau schließen"],
    ["fr", "Ouvrir le livre", "Avant d’entrer", "Fermer l’aperçu"]
  ])("uses translated controls and reading content in %s", (locale, open, heading, close) => {
    const view = render(<BookFeature locale={locale} standalone/>);
    expect(view.getByRole("heading", {level: 1}).textContent).toBe("The Subconscious Architect");
    fireEvent.click(view.getByRole("button", {name: open}));
    expect(within(view.getByRole("dialog")).getByRole("heading", {name: heading})).toBeTruthy();
    fireEvent.click(view.getByRole("button", {name: close}));
    expect(view.queryByRole("dialog")).toBeNull();
  });
});
