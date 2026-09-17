import { describe, it, expect } from "vitest";
import {
  examShortLabel,
  buildFacets,
  applyFilters,
  type FilterableQuestion,
} from "@/lib/formula/filters";

/**
 * Filtering for the /formula pages is CLIENT-side over rows the server already
 * loaded, so this pure core is the whole of the logic. Two things it must never
 * get wrong: the kind split (which comes from `question_kind`, NOT from whether
 * a pyq_year happens to be set) and the input ORDER, which is the page's
 * easiest-first learning ramp.
 */
const q = (id: string, exam: string): FilterableQuestion => ({ id, exam: { name: exam } });

const ROWS: FilterableQuestion[] = [
  q("a", "NDA"),
  q("b", "NDA"),
  q("c", "MHT-CET"),
  q("d", "CBSE Class 12"),
  q("e", "Maharashtra HSC Class 12"),
  q("f", "NDA"),
];
// b, e are practice; the rest are PYQ.
const PRACTICE = new Set(["b", "e"]);

describe("formula filters — exam labels", () => {
  it("shortens the four exam names the chapter actually contains", () => {
    expect(examShortLabel("NDA")).toBe("NDA");
    expect(examShortLabel("MHT-CET")).toBe("MHT-CET");
    expect(examShortLabel("Maharashtra HSC Class 12")).toBe("MH State Board");
    expect(examShortLabel("CBSE Class 12")).toBe("CBSE");
  });

  it("passes an unknown exam through unchanged rather than dropping it", () => {
    // A new exam's questions must still be filterable the day they land, even
    // before anyone adds a short label for it.
    expect(examShortLabel("JEE Mains")).toBe("JEE Mains");
  });
});

describe("formula filters — facets", () => {
  it("counts each exam present and omits ones with no questions", () => {
    const f = buildFacets(ROWS, PRACTICE);
    expect(f.exams.map((e) => [e.label, e.count])).toEqual([
      ["NDA", 3],
      ["MHT-CET", 1],
      ["MH State Board", 1],
      ["CBSE", 1],
    ]);
  });

  it("splits kinds from question_kind, not from a pyq year", () => {
    const f = buildFacets(ROWS, PRACTICE);
    expect(f.total).toBe(6);
    expect(f.pyq).toBe(4);
    expect(f.practice).toBe(2);
  });

  it("returns empty facets for no rows", () => {
    const f = buildFacets([], new Set());
    expect(f.exams).toEqual([]);
    expect(f.total).toBe(0);
    expect(f.pyq).toBe(0);
    expect(f.practice).toBe(0);
  });
});

describe("formula filters — applying", () => {
  it("returns everything, in the original order, with both filters off", () => {
    const out = applyFilters(ROWS, PRACTICE, { exam: "all", kind: "all" });
    expect(out.map((r) => r.id)).toEqual(["a", "b", "c", "d", "e", "f"]);
  });

  it("narrows by exam", () => {
    const out = applyFilters(ROWS, PRACTICE, { exam: "NDA", kind: "all" });
    expect(out.map((r) => r.id)).toEqual(["a", "b", "f"]);
  });

  it("narrows by kind", () => {
    expect(
      applyFilters(ROWS, PRACTICE, { exam: "all", kind: "pyq" }).map((r) => r.id)
    ).toEqual(["a", "c", "d", "f"]);
    expect(
      applyFilters(ROWS, PRACTICE, { exam: "all", kind: "practice" }).map((r) => r.id)
    ).toEqual(["b", "e"]);
  });

  it("composes the two filters", () => {
    expect(
      applyFilters(ROWS, PRACTICE, { exam: "NDA", kind: "practice" }).map((r) => r.id)
    ).toEqual(["b"]);
    expect(
      applyFilters(ROWS, PRACTICE, { exam: "CBSE Class 12", kind: "practice" })
    ).toEqual([]);
  });

  it("preserves the learning ramp — filtering never reorders", () => {
    const reversed = [...ROWS].reverse();
    const out = applyFilters(reversed, PRACTICE, { exam: "NDA", kind: "all" });
    expect(out.map((r) => r.id)).toEqual(["f", "b", "a"]);
  });

  it("treats an exam with no matching rows as an empty result, not everything", () => {
    expect(applyFilters(ROWS, PRACTICE, { exam: "JEE Mains", kind: "all" })).toEqual([]);
  });
});
