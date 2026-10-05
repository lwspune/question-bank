/**
 * Where a drill visit came from (2026-10-05). Before this, a /drill view could
 * not be traced to the avatar menu, the Today card, the result page, an email
 * or the bank, so no change to any of them could be measured. Every link into
 * /drill now carries `?from=`, checked against a fixed list before it is
 * recorded. Pure core: src/lib/drill/from.ts.
 */
import { describe, it, expect } from "vitest";
import { DRILL_FROM, parseDrillFrom, drillHref } from "@/lib/drill/from";

describe("parseDrillFrom", () => {
  it("keeps every listed source", () => {
    for (const f of DRILL_FROM) expect(parseDrillFrom(f)).toBe(f);
  });

  it("covers every link we ship", () => {
    expect([...DRILL_FROM].sort()).toEqual(
      ["again", "bank", "email", "findings", "map", "menu", "push", "result", "start", "today"].sort()
    );
  });

  it("records 'other' for anything unlisted, so a typed URL cannot pollute the field", () => {
    expect(parseDrillFrom("twitter")).toBe("other");
    expect(parseDrillFrom("BANK")).toBe("other");
    expect(parseDrillFrom("<script>")).toBe("other");
    expect(parseDrillFrom(["bank", "menu"])).toBe("other");
  });

  it("records 'direct' when there is no tag at all", () => {
    expect(parseDrillFrom(undefined)).toBe("direct");
    expect(parseDrillFrom("")).toBe("direct");
  });
});

describe("drillHref", () => {
  it("tags a plain drill link", () => {
    expect(drillHref("menu")).toBe("/drill?from=menu");
  });

  it("keeps the attempt scope ahead of the tag", () => {
    expect(drillHref("result", "8f0c2a4e-1b2c-4d3e-9f00-112233445566")).toBe(
      "/drill?attempt=8f0c2a4e-1b2c-4d3e-9f00-112233445566&from=result"
    );
  });
});
