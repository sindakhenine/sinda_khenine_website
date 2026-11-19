import React from "react";
import {cleanup,fireEvent,render} from "@testing-library/react";
import {afterEach,describe,expect,it} from "vitest";
import {FistbumpWorld} from "../components/fistbump/FistbumpWorld";
import {getFistbumpCampaign} from "../content/projects/fistbump-campaign";
afterEach(cleanup);
describe("Fistbump guide selector",()=>{
  it.each(["en","de","fr"])("opens the selected feature with the correct translated explanation in %s",locale=>{
    const copy=getFistbumpCampaign(locale);
    const view=render(<FistbumpWorld copy={copy}/>);
    expect(view.getByRole("link").getAttribute("href")).toBe("https://app.fistbump.world/?open=news");
    expect(view.getByRole("group",{name:copy.choose})).toBeTruthy();
    for(const guide of copy.guides){
      const control=view.getByRole("button",{name:`${guide.name}: ${guide.label}`});
      fireEvent.click(control);
      expect(control.getAttribute("aria-pressed")).toBe("true");
      expect(view.getAllByRole("button").filter(button=>button.getAttribute("aria-pressed")==="true")).toHaveLength(1);
      expect(view.getByRole("heading",{name:guide.title})).toBeTruthy();
      expect(view.getByRole("link",{name:guide.action}).getAttribute("href")).toBe(guide.href);
    }
  });
});
