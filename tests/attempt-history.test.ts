/**
 * A student's mock history, read per SUBJECT (2026-10-11): the result page's
 * "+N marks since your last try", the My attempts subject filter and its marks
 * trend. A mock has no subject column; its subject is its exam plus its paper
 * code, named from the paper blueprints. Comparisons use FULL papers with the
 * SAME total only: chapter tests share a paper code but cover different
 * chapters, and NEET sat as 720 and as 800, so a difference across those is
 * not a change in the student.
 */
import { describe, it, expect } from "vitest";
import {
  type HistoryAttempt,
  defaultTrendSubject,
  formatElapsed,
  previousComparable,
  subjectKey,
  subjectLabel,
  subjectOptions,
  trendFor,
} from "@/lib/mocks/attemptHistory";
import { matchesReviewFilter, reviewFilterCounts } from "@/lib/mocks/reviewFilter";

let seq = 0;
const at = (over: Partial<HistoryAttempt> = {}): HistoryAttempt => {
  seq += 1;
  return {
    attemptId: `a${seq}`,
    examSlug: "nda",
    examName: "NDA",
    paperCode: "maths",
    scope: "full",
    status: "submitted",
    score: 100,
    maxScore: 300,
    correct: 40,
    wrong: 10,
    skipped: 70,
    startedAt: `2026-10-${String(seq).padStart(2, "0")}T10:00:00Z`,
    ...over,
  };
};

describe("subjectLabel", () => {
  it("names a subject from its paper blueprint, without the paper number", () => {
    expect(subjectLabel("nda", "NDA", "maths")).toBe("NDA Mathematics");
    expect(subjectLabel("nda", "NDA", "gat")).toBe("NDA General Ability Test");
    expect(subjectLabel("cds", "CDS", "english")).toBe("CDS English");
    expect(subjectLabel("mht-cet", "MHT-CET", "phy-chem")).toBe("MHT-CET Physics & Chemistry");
  });

  it("does not repeat the exam when the paper is named after it", () => {
    expect(subjectLabel("neet", "NEET", "full")).toBe("NEET (UG)");
    expect(subjectLabel("ipmat-indore", "IPMAT Indore", "paper")).toBe("IPMAT Indore");
  });

  it("falls back to the exam name for a paper with no blueprint", () => {
    expect(subjectLabel("mpsc-sti-mains", "MPSC STI Mains", "paper-1")).toBe("MPSC STI Mains");
  });

  it("keys a subject by exam and paper", () => {
    expect(subjectKey(at())).toBe("nda:maths");
    expect(subjectKey(at({ paperCode: "gat" }))).toBe("nda:gat");
  });
});

describe("previousComparable", () => {
  it("is the last FINISHED FULL paper in the same subject before this one, with the change", () => {
    const first = at({ score: 80 });
    const chapter = at({ scope: "sectional", score: 20, maxScore: 50 });
    const otherSubject = at({ paperCode: "gat", score: 300, maxScore: 600 });
    const running = at({ status: "in_progress", score: null });
    const mid = at({ score: 96.7 });
    const now = at({ score: 118.4 });
    const all = [now, mid, running, otherSubject, chapter, first];
    expect(previousComparable(all, now.attemptId)).toEqual({ attemptId: mid.attemptId, score: 96.7, delta: 21.7 });
    expect(previousComparable(all, mid.attemptId)).toEqual({ attemptId: first.attemptId, score: 80, delta: 16.7 });
    expect(previousComparable(all, first.attemptId)).toBeNull();
  });

  it("says nothing for a chapter test", () => {
    const a = at({ scope: "sectional" });
    const b = at({ scope: "sectional" });
    expect(previousComparable([b, a], b.attemptId)).toBeNull();
  });

  it("skips an earlier paper with a different total (NEET 720 vs 800)", () => {
    const old = at({ examSlug: "neet", examName: "NEET", paperCode: "full", maxScore: 800, score: 400 });
    const now = at({ examSlug: "neet", examName: "NEET", paperCode: "full", maxScore: 720, score: 410 });
    expect(previousComparable([now, old], now.attemptId)).toBeNull();
  });

  it("reports a fall as a negative change, rounded to one decimal", () => {
    const a = at({ score: 120 });
    const b = at({ score: 115.83 });
    expect(previousComparable([b, a], b.attemptId)?.delta).toBe(-4.2);
  });
});

describe("abandoned papers (under ENGAGEMENT_FLOOR answered) are not compared or trended", () => {
  // Measured 2026-10-11 by attempts:smoke: a heavy student's NDA GAT line ran
  // 25 -> 18 -> 53 -> 0 -> 164 -> -1.33, and "latest" was 1 minute of 3 hours.
  // Against an abandoned zero, "+164 since your last try" is not progress.
  const abandoned = (over: Partial<HistoryAttempt> = {}) => at({ score: 0, correct: 1, wrong: 0, skipped: 119, ...over });

  it("compares with the last ENGAGED paper, skipping an abandoned one in between", () => {
    const first = at({ score: 90 });
    const quit = abandoned();
    const now = at({ score: 110 });
    expect(previousComparable([now, quit, first], now.attemptId)).toMatchObject({ attemptId: first.attemptId, delta: 20 });
  });

  it("gives an abandoned paper no chip of its own", () => {
    const first = at({ score: 90 });
    const quit = abandoned();
    expect(previousComparable([quit, first], quit.attemptId)).toBeNull();
  });

  it("leaves abandoned papers out of the trend and the default subject", () => {
    const list = [at(), abandoned(), at(), abandoned(), abandoned(), abandoned({ paperCode: "gat" })];
    expect(trendFor(list, "nda:maths")).toBeNull();
    expect(defaultTrendSubject(list)).toBe("nda:maths");
  });
});

describe("subjectOptions and the default trend subject", () => {
  it("lists each subject once, most attempted first", () => {
    const list = [at(), at({ paperCode: "gat", maxScore: 600 }), at(), at({ scope: "sectional", maxScore: 50 })];
    expect(subjectOptions(list)).toEqual([
      { key: "nda:maths", label: "NDA Mathematics", count: 3 },
      { key: "nda:gat", label: "NDA General Ability Test", count: 1 },
    ]);
  });

  it("picks the subject with the most finished full papers for the trend", () => {
    const list = [at({ paperCode: "gat", maxScore: 600 }), at({ scope: "sectional" }), at({ scope: "sectional" }), at({ paperCode: "gat", maxScore: 600 }), at()];
    expect(defaultTrendSubject(list)).toBe("nda:gat");
    expect(defaultTrendSubject([])).toBeNull();
  });
});

describe("trendFor", () => {
  it("is the last six finished full papers of a subject, oldest first", () => {
    const list = Array.from({ length: 8 }, (_, i) => at({ score: 80 + i })).reverse();
    const t = trendFor(list, "nda:maths")!;
    expect(t.maxScore).toBe(300);
    expect(t.points.map((p) => p.score)).toEqual([82, 83, 84, 85, 86, 87]);
  });

  it("needs three comparable papers, and keeps only those with the newest one's total", () => {
    expect(trendFor([at(), at()], "nda:maths")).toBeNull();
    const list = [at({ maxScore: 720 }), at({ maxScore: 800 }), at({ maxScore: 720 }), at({ maxScore: 720 })].reverse();
    expect(trendFor(list, "nda:maths")!.points).toHaveLength(3);
  });

  it("ignores chapter tests, unfinished attempts and other subjects", () => {
    const list = [at(), at(), at({ scope: "sectional" }), at({ status: "in_progress", score: null }), at({ paperCode: "gat" })];
    expect(trendFor(list, "nda:maths")).toBeNull();
  });
});

describe("formatElapsed", () => {
  it("says how long the paper took against its time", () => {
    expect(formatElapsed("2026-10-11T10:00:00Z", "2026-10-11T11:52:00Z", 150 * 60)).toBe("1 h 52 m of 2 h 30 m");
    expect(formatElapsed("2026-10-11T10:00:00Z", "2026-10-11T10:41:30Z", 60 * 60)).toBe("42 m of 1 h");
  });

  it("never claims more than the paper's time (an expired attempt is backdated to its end)", () => {
    expect(formatElapsed("2026-10-11T10:00:00Z", "2026-10-11T14:00:00Z", 150 * 60)).toBe("2 h 30 m of 2 h 30 m");
  });

  it("is null without an end", () => {
    expect(formatElapsed("2026-10-11T10:00:00Z", null, 3600)).toBeNull();
  });
});

describe("the review filter", () => {
  const items = [{ verdict: 1 as const }, { verdict: -1 as const }, { verdict: 0 as const }, { verdict: 1 as const }];

  it("counts each filter", () => {
    expect(reviewFilterCounts(items)).toEqual({ all: 4, wrong: 1, left: 1, right: 2 });
  });

  it("matches by verdict", () => {
    expect(items.filter((i) => matchesReviewFilter(i, "wrong"))).toHaveLength(1);
    expect(items.filter((i) => matchesReviewFilter(i, "left"))).toHaveLength(1);
    expect(items.filter((i) => matchesReviewFilter(i, "right"))).toHaveLength(2);
    expect(items.filter((i) => matchesReviewFilter(i, "all"))).toHaveLength(4);
  });
});
