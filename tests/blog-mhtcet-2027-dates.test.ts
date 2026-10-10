/**
 * The MHT-CET 2027 dates post: its numbers are internally consistent, and the
 * rule that files a chapter under a book behaves as the post says it does.
 * The numbers themselves are re-derived from production by the prod-contract
 * suite tests/blog-mhtcet-2027-stats.test.ts.
 */
import { describe, it, expect } from "vitest";
import {
  BOOKS,
  CHAPTER_COUNTS,
  MARKS_PER_QUESTION,
  MIN_RULED_QUESTIONS,
  SUBJECTS,
  TIMELINE,
  WINDOW,
  bookFromRuledTally,
  marksShare,
  perPaper,
  subjectTotal,
  topChaptersOf,
} from "@/app/blog/_posts/mht-cet-2027-december-attempt-moved-after-boards/_data/stats";
import { postBySlug } from "@/lib/blog/posts";

const SLUG = "mht-cet-2027-december-attempt-moved-after-boards";

describe("bookFromRuledTally", () => {
  it("files a chapter under one book when 75%+ of its ruled questions point only there", () => {
    expect(bookFromRuledTally({ XII: 160, XI: 0, both: 8 })).toBe("XII");
    expect(bookFromRuledTally({ XII: 0, XI: 38, both: 9 })).toBe("XI");
    // Exactly 75% counts.
    expect(bookFromRuledTally({ XII: 57, XI: 0, both: 19 })).toBe("XII");
  });

  it("calls a chapter 'both books' when no single book reaches 75%", () => {
    expect(bookFromRuledTally({ XII: 41, XI: 24, both: 28 })).toBe("both");
    expect(bookFromRuledTally({ XII: 22, XI: 0, both: 9 })).toBe("both");
  });

  // Too few ruled questions to call either way: the chapter title decides.
  it("returns null below the sample floor", () => {
    expect(bookFromRuledTally({ XII: MIN_RULED_QUESTIONS - 1, XI: 0, both: 0 })).toBeNull();
    expect(bookFromRuledTally({ XII: 0, XI: 0, both: 0 })).toBeNull();
  });
});

describe("chapter table", () => {
  it("lists each chapter once per subject, with a positive count and a known book", () => {
    for (const s of SUBJECTS) {
      const rows = CHAPTER_COUNTS.filter((r) => r.subject === s);
      expect(new Set(rows.map((r) => r.chapter)).size, s).toBe(rows.length);
      for (const r of rows) {
        expect(r.questions, r.chapter).toBeGreaterThan(0);
        expect(BOOKS).toContain(r.book);
      }
    }
  });

  // Every paper has 50 questions per subject, so the subject totals must be
  // close to 50 x the paper count (a few questions were dropped or withheld).
  it("adds up to about 50 questions per paper in every subject", () => {
    for (const s of SUBJECTS) {
      const total = subjectTotal(s);
      expect(total, s).toBeLessThanOrEqual(WINDOW.papers * 50);
      expect(total, s).toBeGreaterThan(WINDOW.papers * 49);
    }
  });
});

describe("derived figures", () => {
  it("gives questions per paper to one decimal, from the same table", () => {
    for (const s of SUBJECTS) {
      for (const b of BOOKS) {
        const n = CHAPTER_COUNTS.filter((r) => r.subject === s && r.book === b).reduce((a, r) => a + r.questions, 0);
        expect(perPaper(s, b)).toBe(Math.round((10 * n) / WINDOW.papers) / 10);
      }
    }
  });

  it("weights Maths at 2 marks a question and gives whole-number shares adding to 100", () => {
    expect(MARKS_PER_QUESTION).toEqual({ Physics: 1, Chemistry: 1, Maths: 2 });
    const share = marksShare();
    expect(share.XII + share.XI + share.both).toBe(100);
    for (const b of BOOKS) expect(Number.isInteger(share[b])).toBe(true);
  });

  it("lists a subject's top chapters of one book, largest first", () => {
    const top = topChaptersOf("Maths", "XI", 3);
    expect(top).toHaveLength(3);
    expect(top.every((r) => r.book === "XI" && r.subject === "Maths")).toBe(true);
    expect([...top].sort((a, b) => b.questions - a.questions)).toEqual(top);
  });
});

describe("timeline", () => {
  it("runs in date order", () => {
    const starts = TIMELINE.map((t) => t.sortKey);
    expect([...starts].sort()).toEqual(starts);
  });
});

describe("the post", () => {
  it("is registered with a FAQ and dated", () => {
    const p = postBySlug(SLUG);
    expect(p).toBeDefined();
    expect(p!.examSlug).toBe("mht-cet");
    expect(p!.faq?.length ?? 0).toBeGreaterThanOrEqual(4);
  });

  // The layout appends " · PYQ Vault"; the whole <title> stays within 70.
  it("keeps its full page title within 70 characters", () => {
    expect(`${postBySlug(SLUG)!.title} · PYQ Vault`.length).toBeLessThanOrEqual(70);
  });
});
