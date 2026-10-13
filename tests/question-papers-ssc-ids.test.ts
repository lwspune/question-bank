import { describe, it, expect } from "vitest";
import { sscPatternFor, sscSittingSlugs } from "../scripts/question-papers/mhPatterns";

// The SSC supplementary sitting (July; June from 2026) adds papers whose data id
// carries the sitting: `alg-2024-jul`. They share a subject AND a year with the
// March paper, so they need their own slug and group, and they print the same
// marks scheme as that year's March paper.
describe("sscPatternFor — supplementary ids", () => {
  it("gives a supplementary paper its year's pattern", () => {
    expect(sscPatternFor("alg-2024-jul")).toBe("sscMathsNew");
    expect(sscPatternFor("sci2-2026-jun")).toBe("sscScienceNew");
    expect(sscPatternFor("hist-2025-jul")).toBe("sscHistory");
  });

  it("leaves the March ids exactly as before", () => {
    expect(sscPatternFor("alg-2016")).toBe("sscMathsOld");
    expect(sscPatternFor("geog-2022")).toBe("sscGeography2022");
    expect(sscPatternFor("geog-2024")).toBe("sscGeography2024");
  });

  it("refuses an id it does not recognise", () => {
    expect(sscPatternFor("alg-2024-dec")).toBeNull();
    expect(sscPatternFor("alg")).toBeNull();
  });
});

describe("sscSittingSlugs", () => {
  it("keeps a March paper's slug and group", () => {
    expect(sscSittingSlugs("algebra", "alg-2024", 2024)).toEqual({ slug: "algebra-2024", groupSlug: "2024" });
  });

  it("gives a supplementary paper its own slug and group in the same year", () => {
    expect(sscSittingSlugs("algebra", "alg-2024-jul", 2024)).toEqual({
      slug: "algebra-2024-july",
      groupSlug: "2024-july",
    });
    expect(sscSittingSlugs("geography", "geog-2026-jun", 2026)).toEqual({
      slug: "geography-2026-june",
      groupSlug: "2026-june",
    });
  });
});
