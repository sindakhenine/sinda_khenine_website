import React from "react";
import {cleanup, fireEvent, render, within} from "@testing-library/react";
import {afterEach, describe, expect, it} from "vitest";
import {FistbumpBenefits} from "../components/fistbump/FistbumpBenefits";
import {getFistbumpBenefits} from "../content/projects/fistbump-benefits";

afterEach(cleanup);

describe("Fistbump reasons to join", () => {
  it.each(["en", "de", "fr"])("lets visitors explore all eight benefits with translated controls in %s", locale => {
    const copy = getFistbumpBenefits(locale);
    const view = render(<FistbumpBenefits copy={copy}/>);
    expect(view.getAllByRole("listitem")).toHaveLength(8);
    const list = within(view.getByRole("list"));
    expect(list.getAllByRole("region")).toHaveLength(1);
    expect(view.getByRole("link", {name:copy.items[0].action}).getAttribute("href")).toBe("https://app.fistbump.world/?open=news");
    for (const index of [1,2,3,4,5,6,7]) {
      const item = copy.items[index];
      const row = within(view.getAllByRole("listitem")[index]);
      fireEvent.click(row.getByRole("button"));
      expect(row.getByRole("button").getAttribute("aria-expanded")).toBe("true");
      expect(list.getAllByRole("region")).toHaveLength(1);
      expect(row.getByRole("link").getAttribute("href")).toBe(item.href);
      if (item.plus) expect(row.getByText(copy.plus)).toBeTruthy();
    }
    fireEvent.click(within(view.getAllByRole("listitem")[7]).getByRole("button"));
    expect(list.queryAllByRole("region")).toHaveLength(0);
    fireEvent.click(view.getByRole("button", {name:copy.pause}));
    expect(view.getByRole("button", {name:copy.resume}).getAttribute("aria-pressed")).toBe("true");
  });
});
