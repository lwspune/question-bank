/**
 * The mastery map — ENGAGEMENT_SPEC.md B1. Chapter tiles with one dot per
 * subtopic, coloured by the band the performance core already computes.
 *
 * The bands are NOT redefined here: `bandOf` reads WEAK_BELOW / MASTERED_AT /
 * MIN_JUDGED_FOR_CLAIM from compute.ts, so the map can never disagree with the
 * chapter accordion or the focus card about what "weak" means.
 */
import { describe, it, expect } from "vitest";
import {
  bandOf,
  buildMasteryMap,
  BAND_ORDER,
  type Band,
} from "@/lib/performance/masteryMap";
import {
  WEAK_BELOW,
  MASTERED_AT,
  MIN_JUDGED_FOR_CLAIM,
  type ChapterRow,
  type SubtopicRow,
  type Lane,
} from "@/lib/performance/compute";

function sub(over: Partial<SubtopicRow> = {}): SubtopicRow {
  return {
    chapter: "Trigonometry",
    subtopic: "Identities",
    total: 10,
    answered: 6,
    correct: 4,
    wrong: 2,
    seenBlank: 1,
    neverReached: 3,
    judged: 6,
    thin: false,
    accuracy: 67,
    weightedScore: 0.6,
    markScore: 0.5,
    trend: "stable",
    medianSecs: null,
    timedCount: 0,
    wrongQuestionIds: ["w1", "w2"],
    seenBlankQuestionIds: ["b1"],
    ...over,
  };
}

function chapter(name: string, subtopics: SubtopicRow[]): ChapterRow {
  const { subtopic: _drop, ...rest } = sub({ chapter: name });
  void _drop;
  return { ...rest, chapter: name, subtopics };
}

function lane(chapters: ChapterRow[]): Lane {
  return {
    exam: "NDA",
    subject: "Mathematics",
    attempts: 3,
    judged: 30,
    thin: false,
    accuracy: 60,
    coverage: { inPaper: 0, reached: 0, answered: 0, seenBlank: 0, neverReached: 0, medianSecs: null, headMedianSecs: null, tailMedianSecs: null },
    time: { slow: [], rushedTail: null } as unknown as Lane["time"],
    difficulty: [],
    chapters,
    wrongAudit: [],
    skipAudit: [],
    projection: null,
  };
}

describe("bandOf", () => {
  it("is unknown below the evidence floor, whatever the score", () => {
    expect(bandOf(sub({ judged: MIN_JUDGED_FOR_CLAIM - 1, thin: true, weightedScore: 0.1 }))).toBe("unknown");
    expect(bandOf(sub({ judged: MIN_JUDGED_FOR_CLAIM - 1, thin: true, weightedScore: 0.9 }))).toBe("unknown");
  });

  it("is weak below WEAK_BELOW, mastered at MASTERED_AT, mid between", () => {
    expect(bandOf(sub({ weightedScore: WEAK_BELOW - 0.01 }))).toBe("weak");
    expect(bandOf(sub({ weightedScore: WEAK_BELOW }))).toBe("mid");
    expect(bandOf(sub({ weightedScore: MASTERED_AT - 0.01 }))).toBe("mid");
    expect(bandOf(sub({ weightedScore: MASTERED_AT }))).toBe("mastered");
  });

  it("orders bands weakest first for sorting", () => {
    expect(BAND_ORDER).toEqual(["weak", "mid", "mastered", "unknown"] satisfies Band[]);
  });
});

describe("buildMasteryMap", () => {
  const trig = chapter("Trigonometry", [
    sub({ subtopic: "Identities", weightedScore: 0.3 }),
    sub({ subtopic: "Heights", weightedScore: 0.8 }),
    sub({ subtopic: "Inverse", judged: 1, thin: true, weightedScore: 1 }),
  ]);
  const algebra = chapter("Algebra", [
    sub({ chapter: "Algebra", subtopic: "Sets", weightedScore: 0.9 }),
    sub({ chapter: "Algebra", subtopic: "Complex", weightedScore: 0.75 }),
  ]);
  const untouched = chapter("Statistics", [sub({ chapter: "Statistics", subtopic: "Mean", judged: 0, thin: true, weightedScore: 0 })]);

  it("makes one tile per chapter with a dot per subtopic, each carrying its band", () => {
    const m = buildMasteryMap(lane([trig, algebra]));
    expect(m.tiles).toHaveLength(2);
    const t = m.tiles.find((x) => x.chapter === "Trigonometry")!;
    expect(t.dots.map((d) => [d.subtopic, d.band])).toEqual([
      ["Identities", "weak"],
      ["Heights", "mastered"],
      ["Inverse", "unknown"],
    ]);
  });

  it("counts bands per tile and totals across the map", () => {
    const m = buildMasteryMap(lane([trig, algebra, untouched]));
    const t = m.tiles.find((x) => x.chapter === "Trigonometry")!;
    expect(t.counts).toEqual({ weak: 1, mid: 0, mastered: 1, unknown: 1 });
    expect(m.totals).toEqual({ weak: 1, mid: 0, mastered: 3, unknown: 2 });
    expect(m.subtopics).toBe(6);
  });

  it("puts chapters with weak dots first, then mid, then mastered, then untouched", () => {
    const m = buildMasteryMap(lane([untouched, algebra, trig]));
    expect(m.tiles.map((t) => t.chapter)).toEqual(["Trigonometry", "Algebra", "Statistics"]);
  });

  it("gives every dot a practise link naming its exam, subject, chapter and subtopic", () => {
    const m = buildMasteryMap(lane([algebra]));
    const d = m.tiles[0].dots[0];
    expect(d.href).toContain("exam=NDA");
    expect(d.href).toContain("subject=Mathematics");
    expect(d.href).toContain("chapter=Algebra");
    expect(d.href).toContain("subtopic=Sets");
  });

  it("labels a tile's state in plain words a student can act on", () => {
    const m = buildMasteryMap(lane([trig, algebra, untouched]));
    const by = (c: string) => m.tiles.find((t) => t.chapter === c)!.label;
    expect(by("Trigonometry")).toMatch(/1 to fix/);
    expect(by("Algebra")).toMatch(/mastered/i);
    expect(by("Statistics")).toMatch(/not tested yet/i);
  });

  it("is empty, not absent, for a lane with no chapters", () => {
    const m = buildMasteryMap(lane([]));
    expect(m.tiles).toEqual([]);
    expect(m.subtopics).toBe(0);
  });
});
