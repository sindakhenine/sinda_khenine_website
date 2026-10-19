// @vitest-environment node
import {describe, expect, it} from "vitest";
import {NextRequest} from "next/server";
import proxy from "../proxy";
describe("locale routing", () => {
  it("rewrites English internally without a redirect loop", () => {
    const response = proxy(new NextRequest("https://sindakhenine.com/about?from=book"));
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toBe("https://sindakhenine.com/en/about?from=book");
  });
  it("keeps explicitly localized pages and redirects redundant English prefixes", () => {
    expect(proxy(new NextRequest("https://sindakhenine.com/fr/about")).status).toBe(200);
    const response = proxy(new NextRequest("https://sindakhenine.com/en/about"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://sindakhenine.com/about");
  });
});
