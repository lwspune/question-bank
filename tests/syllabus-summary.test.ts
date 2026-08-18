import { describe, expect, it } from "vitest";
import {
  chapterKey,
  examOfSpine,
  isExamSpine,
  isTopLevelSection,
  parseChapterKey,
  rollUpChapterStatus,
  sectionGroupKey,
  coverCellState,
  EXAM_COLUMNS,
  SPINE,
  SYLLABUS_EXAMS,
  statusCellText,
  statusCellTitle,
  tallyByExam,
} from "../src/lib/syllabus/summary";

describe("examOfSpine", () => {
  it("names the exam an exam-spine was sampled from", () => {
    expect(examOfSpine("NDA bank taxonomy")).toBe("NDA");
    expect(examOfSpine("JEE Mains bank taxonomy")).toBe("JEE Mains");
    expect(examOfSpine("MHT-CET bank taxonomy")).toBe("MHT-CET");
  });

  it("only strips the suffix at the END", () => {
    // A book spine is not an exam spine; leaving it unchanged is what lets a
    // caller detect that it passed the wrong kind of source.
    expect(examOfSpine("MH State Board")).toBe("MH State Board");
    expect(examOfSpine("bank taxonomy of nowhere")).toBe("bank taxonomy of nowhere");
  });

  it("isExamSpine separates the two kinds of source", () => {
    expect(isExamSpine("NDA bank taxonomy")).toBe(true);
    expect(isExamSpine("MH State Board")).toBe(false);
    expect(isExamSpine("NCERT")).toBe(false);
  });
});

describe("rollUpChapterStatus", () => {
  it("returns the shared status when every concept agrees", () => {
    expect(rollUpChapterStatus(["full", "full", "full"])).toBe("full");
    expect(rollUpChapterStatus(["not", "not"])).toBe("not");
  });

  it("returns 'mixed' when concepts disagree", () => {
    expect(rollUpChapterStatus(["full", "not"])).toBe("mixed");
  });

  it("returns null when nothing has been assessed", () => {
    expect(rollUpChapterStatus([null, null])).toBeNull();
    expect(rollUpChapterStatus([])).toBeNull();
  });

  it("does NOT summarise from the assessed subset alone", () => {
    // Half-reviewed must not read as a clean 'full' — that would overstate
    // the review and hide the unassessed remainder.
    expect(rollUpChapterStatus(["full", "full", null])).toBe("partly-assessed");
  });

  it("separates a half-reviewed chapter from a genuine disagreement", () => {
    // THE BUG THIS PINS. Both cases used to return "mixed", whose label reads
    // "concepts in this chapter differ — open the chapter". Measured against the
    // live bank on 2026-08-18 that claim was false for every cell carrying it in
    // two of the three subjects: 239 Physics and 259 Maths cells said "Mixed"
    // and the count of genuine disagreements was 0 and 0. Chemistry hid the
    // defect for a year by being 100% assessed.
    expect(rollUpChapterStatus(["partial", "partial", null])).toBe("partly-assessed");
    expect(rollUpChapterStatus(["full", "not"])).toBe("mixed");
  });

  it("lets absence of review outrank a disagreement", () => {
    // Both statements are true here — the ruled concepts DO disagree, and the
    // chapter is also unfinished. "partly-assessed" is the weaker claim and so
    // the honest one, and it costs the reader nothing: both labels send them
    // into the chapter detail for the same reason.
    expect(rollUpChapterStatus(["full", "not", null])).toBe("partly-assessed");
  });
});

describe("EXAM_COLUMNS", () => {
  it("drops the book's self-column and keeps every real exam", () => {
    // The matrix rows ARE State Board sections, so a "MH State Board" column is
    // the book ruled against itself. Measured 2026-08-18 it carried no
    // information in any subject: 863 rows of `full` in Chemistry, all sharing
    // one note ("Baseline: this concept is a printed section of the ...
    // textbook"), and no rows at all in Physics or Maths, whose derived spines
    // were never given a self-column. A column that is constant within every
    // subject it appears in is a column of noise.
    expect(EXAM_COLUMNS).not.toContain(SPINE.stateBoard);
    expect(EXAM_COLUMNS).toEqual(["NDA", "MHT-CET", "JEE Mains", "CBSE Class 12"]);
  });

  it("is a strict subset of the exams the data layer still computes", () => {
    // Narrowing is a RENDER decision. The loaders keep tallying every exam, so
    // the 863 Chemistry rows stay queryable and this is reversible by one line.
    for (const e of EXAM_COLUMNS) expect(SYLLABUS_EXAMS).toContain(e);
    expect(EXAM_COLUMNS.length).toBe(SYLLABUS_EXAMS.length - 1);
  });
});

describe("tallyByExam", () => {
  it("counts each status and derives unassessed from the total", () => {
    expect(tallyByExam(["full", "full", "partial", "not"], 10)).toEqual({
      full: 2,
      partial: 1,
      not: 1,
      unassessed: 6,
    });
  });

  it("treats nulls in the list as unassessed, not as a status", () => {
    expect(tallyByExam(["full", null], 2)).toEqual({
      full: 1,
      partial: 0,
      not: 0,
      unassessed: 1,
    });
  });
});

describe("sectionGroupKey / isTopLevelSection", () => {
  it("rolls a sub-section up into its parent section", () => {
    expect(sectionGroupKey("1.2.1")).toBe("1.2");
    expect(sectionGroupKey("13.8.4")).toBe("13.8");
  });

  it("leaves a top-level section as its own group, so nothing is dropped", () => {
    expect(sectionGroupKey("1.2")).toBe("1.2");
    expect(isTopLevelSection("1.2")).toBe(true);
    expect(isTopLevelSection("1.2.1")).toBe(false);
  });

  it("groups a lettered NCERT-style ref under its numeric parent", () => {
    // "5.4 (a)" must join 5.4, not become a singleton group.
    expect(sectionGroupKey("5.4 (a)")).toBe("5.4");
    expect(sectionGroupKey("5.2.2 (d)")).toBe("5.2");
  });

  it("handles depth beyond three levels", () => {
    expect(sectionGroupKey("1.2.3.4")).toBe("1.2");
  });

  it("falls back to the ref itself when unparseable, rather than losing the row", () => {
    expect(sectionGroupKey("Misc")).toBe("Misc");
    expect(isTopLevelSection("Misc")).toBe(true);
  });
});

describe("chapterKey / parseChapterKey", () => {
  it("round-trips", () => {
    expect(parseChapterKey(chapterKey(11, 2))).toEqual({ cls: 11, chapterNo: 2 });
  });

  it("keeps Std XI and Std XII chapter 1 distinct", () => {
    expect(chapterKey(11, 1)).not.toBe(chapterKey(12, 1));
  });

  it("rejects malformed or out-of-range keys rather than coercing them", () => {
    expect(parseChapterKey("abc")).toBeNull();
    expect(parseChapterKey("11")).toBeNull();
    expect(parseChapterKey("13-1")).toBeNull();
    expect(parseChapterKey("11-0")).toBeNull();
    expect(parseChapterKey("11-2; drop table")).toBeNull();
  });
});

describe("coverCellState", () => {
  const cover = (status: "full" | "partial" | "not" | null, refCount = 0) => ({
    status,
    refs: Array.from({ length: refCount }, (_, i) => i),
  });

  it("reports a located topic when the ruling names sections", () => {
    expect(coverCellState(cover("full", 2))).toBe("located");
    expect(coverCellState(cover("partial", 1))).toBe("located");
  });

  it("reports not-covered when the ruling says the book lacks it", () => {
    expect(coverCellState(cover("not"))).toBe("not-covered");
  });

  it("reports diffuse when the ruling says covered but names no section", () => {
    expect(coverCellState(cover("full"))).toBe("diffuse");
    expect(coverCellState(cover("partial"))).toBe("diffuse");
  });

  // The whole reason this function exists. A null status means NO RULING ROW,
  // and it used to fall into the same branch as "diffuse" — so 53 never-reviewed
  // JEE Chemistry subtopics rendered "no single section", an affirmative claim
  // that the book teaches them in scattered places. Absence of review is not a
  // finding, and must not borrow the wording of one.
  it("reports unassessed when there is no ruling at all", () => {
    expect(coverCellState(cover(null))).toBe("unassessed");
    expect(coverCellState(undefined)).toBe("unassessed");
  });

  it("treats unassessed as distinct from every assessed state", () => {
    const assessed = [cover("full", 1), cover("not"), cover("full")].map(coverCellState);
    expect(assessed).not.toContain("unassessed");
  });
});

describe("statusCellText / statusCellTitle", () => {
  // Extracted from the /dashboard/syllabus page so the Word export and the page
  // cannot drift: a doc that renders "Part" where the page renders "Mixed" is a
  // disagreement no reader can detect.
  it("renders each ruled status with its short label", () => {
    expect(statusCellText("full")).toBe("Yes");
    expect(statusCellText("partial")).toBe("Part");
    expect(statusCellText("not")).toBe("—");
  });

  it("distinguishes disagreement from absence of review", () => {
    // The load-bearing pair: "Mixed" is a finding (concepts within the chapter
    // disagree), "?" is the absence of one. Collapsing them would let an
    // unreviewed chapter borrow the wording of a reviewed one.
    expect(statusCellText("mixed")).toBe("Mixed");
    expect(statusCellText(null)).toBe("?");
    expect(statusCellTitle("mixed")).not.toBe(statusCellTitle(null));
  });

  it("renders a half-reviewed chapter as a blank, not as a finding", () => {
    // Same GLYPH as an untouched cell, deliberately: both mean "no verdict you
    // can rely on", and the page's own rule is that colour must never be the
    // only carrier of a distinction — so a third symbol here would need a third
    // legend entry to earn its place. The difference lives in the title and the
    // screen-reader text, which is where a reader goes to resolve a "?".
    expect(statusCellText("partly-assessed")).toBe("?");
    expect(statusCellTitle("partly-assessed")).not.toBe(statusCellTitle(null));
    expect(statusCellTitle("partly-assessed")).not.toBe(statusCellTitle("mixed"));
  });

  it("gives every state a non-empty long title", () => {
    for (const s of ["full", "partial", "not", "mixed", "partly-assessed", null] as const) {
      expect(statusCellTitle(s).length).toBeGreaterThan(0);
    }
  });

  it("never renders an empty cell", () => {
    for (const s of ["full", "partial", "not", "mixed", "partly-assessed", null] as const) {
      expect(statusCellText(s).trim()).not.toBe("");
    }
  });
});
