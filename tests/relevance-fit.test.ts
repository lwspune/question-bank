import { describe, it, expect } from "vitest";
import {
  isFitExam,
  unreviewedChapterIds,
  fitCoverage,
  parseFit,
  type SyllabusFit,
} from "@/lib/relevance/fit";
import {
  JEE_MAINS_EXAM_ID,
  REVIEWED_CHAPTER_IDS,
  REVIEWED_CHAPTER_NAMES,
} from "@/lib/relevance/config";

const MATRICES = "9526b878-11cb-4014-a3a5-79ccc3d8d8e1";
const DETERMINANTS = "84561864-98dd-4943-9949-3ab1fb3016ff";
const CONICS = "00000000-0000-0000-0000-0000000000c1";

describe("parseFit", () => {
  it("defaults to 'all' for missing or unknown values", () => {
    expect(parseFit(null)).toBe("all");
    expect(parseFit("")).toBe("all");
    expect(parseFit("bogus")).toBe("all");
  });

  it("accepts the three known values", () => {
    const cases: SyllabusFit[] = ["all", "answerable", "excluded"];
    for (const c of cases) expect(parseFit(c)).toBe(c);
  });
});

describe("isFitExam", () => {
  it("is true only for JEE Mains — the filter is meaningless elsewhere", () => {
    expect(isFitExam(JEE_MAINS_EXAM_ID)).toBe(true);
    expect(isFitExam("56360311-0000-0000-0000-000000000000")).toBe(false);
    expect(isFitExam(null)).toBe(false);
  });
});

describe("unreviewedChapterIds", () => {
  it("returns nothing when every selected chapter is reviewed", () => {
    expect(
      unreviewedChapterIds([MATRICES, DETERMINANTS], REVIEWED_CHAPTER_IDS)
    ).toEqual([]);
  });

  it("returns the chapters that have not been adjudicated", () => {
    expect(
      unreviewedChapterIds([MATRICES, CONICS], REVIEWED_CHAPTER_IDS)
    ).toEqual([CONICS]);
  });

  it("returns everything when nothing is reviewed", () => {
    expect(unreviewedChapterIds([MATRICES], new Set())).toEqual([MATRICES]);
  });

  it("handles an empty selection", () => {
    expect(unreviewedChapterIds([], REVIEWED_CHAPTER_IDS)).toEqual([]);
  });
});

describe("fitCoverage", () => {
  it("is inactive when the fit filter is off", () => {
    expect(fitCoverage("all", [MATRICES, CONICS])).toEqual({ kind: "inactive" });
  });

  it("reports full coverage when all selected chapters are reviewed", () => {
    expect(fitCoverage("answerable", [MATRICES, DETERMINANTS])).toEqual({
      kind: "full",
    });
  });

  it("names the unreviewed chapters on a partial selection", () => {
    expect(fitCoverage("answerable", [MATRICES, CONICS])).toEqual({
      kind: "partial",
      unreviewed: [CONICS],
    });
  });

  // The honesty case: with no chapter filter the user is browsing the whole
  // exam, most of which has never been screened. Silently returning everything
  // would read as "all vetted".
  it("flags an unscoped selection rather than implying the whole exam is vetted", () => {
    expect(fitCoverage("answerable", [])).toEqual({
      kind: "unscoped",
      reviewedNames: REVIEWED_CHAPTER_NAMES,
    });
  });

  it("applies the same coverage logic to the 'excluded' view", () => {
    expect(fitCoverage("excluded", [MATRICES])).toEqual({ kind: "full" });
  });
});

describe("reviewed-scope config", () => {
  it("pins chapters by UUID so a chapter rename cannot silently rot the scope", () => {
    for (const id of REVIEWED_CHAPTER_IDS) {
      expect(id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
    }
  });

  it("carries a display name for every reviewed chapter", () => {
    expect(REVIEWED_CHAPTER_NAMES.length).toBe(REVIEWED_CHAPTER_IDS.size);
  });
});
