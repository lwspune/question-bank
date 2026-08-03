import { describe, expect, it } from "vitest";
import {
  chapterKey,
  isTopLevelSection,
  parseChapterKey,
  rollUpChapterStatus,
  sectionGroupKey,
  tallyByExam,
} from "../src/lib/syllabus/summary";

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
    expect(rollUpChapterStatus(["full", "full", null])).toBe("mixed");
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
