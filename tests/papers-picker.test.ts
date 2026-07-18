import { describe, it, expect } from "vitest";
import {
  PAPER_PICKER_LIMIT,
  normalizePaperQuery,
  paperTitleIlikePattern,
} from "@/lib/papers/picker";

describe("normalizePaperQuery", () => {
  it("returns undefined for null/undefined/blank", () => {
    expect(normalizePaperQuery(null)).toBeUndefined();
    expect(normalizePaperQuery(undefined)).toBeUndefined();
    expect(normalizePaperQuery("")).toBeUndefined();
    expect(normalizePaperQuery("   ")).toBeUndefined();
  });

  it("trims surrounding whitespace", () => {
    expect(normalizePaperQuery("  Mock 3 ")).toBe("Mock 3");
  });

  it("keeps interior text intact", () => {
    expect(normalizePaperQuery("NDA GAT")).toBe("NDA GAT");
  });
});

describe("paperTitleIlikePattern", () => {
  it("returns undefined for a blank query", () => {
    expect(paperTitleIlikePattern("")).toBeUndefined();
    expect(paperTitleIlikePattern("   ")).toBeUndefined();
    expect(paperTitleIlikePattern(null)).toBeUndefined();
  });

  it("wraps a plain term in contains-wildcards", () => {
    expect(paperTitleIlikePattern("mock")).toBe("%mock%");
  });

  it("trims before wrapping", () => {
    expect(paperTitleIlikePattern("  mock  ")).toBe("%mock%");
  });

  it("escapes ilike wildcards so they match literally", () => {
    // A user typing % or _ should match those characters, not act as a wildcard.
    expect(paperTitleIlikePattern("50%")).toBe("%50\\%%");
    expect(paperTitleIlikePattern("a_b")).toBe("%a\\_b%");
    expect(paperTitleIlikePattern("back\\slash")).toBe("%back\\\\slash%");
  });
});

describe("PAPER_PICKER_LIMIT", () => {
  it("is a sane positive cap", () => {
    expect(PAPER_PICKER_LIMIT).toBeGreaterThan(0);
    expect(PAPER_PICKER_LIMIT).toBeLessThanOrEqual(50);
  });
});
