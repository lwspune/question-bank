/**
 * The formula-sheet download names ONE chapter: `{ subjectRoute, chapterSlug }`
 * as the /notes registry spells them. The parser is the route's first guard,
 * so it must refuse anything that is not two plain slugs before any lookup,
 * and the free-sheet key must be the same string from both the download route
 * and the access endpoint, or the box would show "free" for a sheet the route
 * then refuses.
 */
import { describe, it, expect } from "vitest";
import { formulaSheetKey, parseFormulaSheetTarget } from "@/lib/export/formulaSheet";

describe("parseFormulaSheetTarget", () => {
  it("accepts two slugs", () => {
    expect(parseFormulaSheetTarget({ subjectRoute: "nda-maths", chapterSlug: "trigonometric-identities" })).toEqual({
      subjectRoute: "nda-maths",
      chapterSlug: "trigonometric-identities",
    });
  });
  it("accepts the one-string form the access endpoint receives", () => {
    expect(parseFormulaSheetTarget("nda-maths/trigonometric-identities")).toEqual({
      subjectRoute: "nda-maths",
      chapterSlug: "trigonometric-identities",
    });
  });
  it.each([
    null,
    undefined,
    42,
    "",
    "nda-maths",
    "nda-maths/",
    "nda-maths/a/b",
    "NDA-Maths/trig",
    "nda maths/trig",
    "../etc/passwd",
    { subjectRoute: "nda-maths" },
    { subjectRoute: "nda-maths", chapterSlug: "" },
    { subjectRoute: "nda-maths", chapterSlug: "x".repeat(121) },
    { subjectRoute: 1, chapterSlug: "trig" },
  ])("refuses %j", (v) => {
    expect(parseFormulaSheetTarget(v)).toBeNull();
  });
});

describe("formulaSheetKey", () => {
  it("is one string per chapter, distinct from every paper key", () => {
    const k = formulaSheetKey({ subjectRoute: "nda-maths", chapterSlug: "vectors" });
    expect(k).toBe("formula:nda-maths/vectors");
    expect(k.startsWith("mock:")).toBe(false);
  });
});
