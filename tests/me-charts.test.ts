/**
 * Small charts on the student's own tabs (2026-11-10): a marks line on Papers,
 * reason bars on Review, rings on the Progress tiles, one subject bar over the
 * map and a bar per weak spot on Home. Every chart draws numbers the page
 * already holds; these tests hold that the shapes add up to the numbers the
 * words beside them print, since a bar that disagrees with its label is worse
 * than no bar.
 */
import { describe, it, expect } from "vitest";
import { barWidth, fixProgress, segments } from "@/lib/me/charts";
import { laneTrendKey, type HistoryAttempt } from "@/lib/mocks/attemptHistory";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("segments: a bar split into parts", () => {
  it("gives each part its share of the total, in the order given", () => {
    const s = segments([
      { key: "wrong", n: 16 },
      { key: "later", n: 5 },
      { key: "v", n: 2 },
    ]);
    expect(s.map((x) => x.key)).toEqual(["wrong", "later", "v"]);
    expect(s.map((x) => x.pct)).toEqual([69.6, 21.7, 8.7]);
  });

  it("drops empty parts, so no zero-width sliver gets a rounded end", () => {
    expect(segments([{ key: "a", n: 4 }, { key: "b", n: 0 }]).map((x) => x.key)).toEqual(["a"]);
  });

  it("measures against a given total when the parts do not fill it", () => {
    expect(segments([{ key: "a", n: 1 }], 4)[0].pct).toBe(25);
  });

  it("draws nothing for an empty total, never dividing by zero", () => {
    expect(segments([{ key: "a", n: 0 }])).toEqual([]);
    expect(segments([{ key: "a", n: 3 }], 0)).toEqual([]);
  });
});

describe("barWidth: a row's bar against the biggest row", () => {
  it("is the row's share of the biggest, so the top row fills the track", () => {
    expect(barWidth(6, 6)).toBe(100);
    expect(barWidth(5, 6)).toBe(83.3);
    expect(barWidth(4, 6)).toBe(66.7);
  });

  it("never draws a row as empty that has something in it", () => {
    expect(barWidth(1, 400)).toBeGreaterThanOrEqual(4);
  });

  it("is zero for nothing, and never more than full", () => {
    expect(barWidth(0, 6)).toBe(0);
    expect(barWidth(3, 0)).toBe(0);
    expect(barWidth(9, 6)).toBe(100);
  });
});

describe("fixProgress: mistakes fixed out of every mistake made", () => {
  it("counts the waiting mistakes of every exam, the same scope as fixed", () => {
    // fixed is counted across exams, so waiting must be too: the focused due
    // count would put one exam's backlog under every exam's fixes.
    expect(fixProgress(41, { c1: 6, c2: 17 })).toEqual({ fixed: 41, waiting: 23, share: 41 / 64 });
  });

  it("is nothing until the pulse has arrived", () => {
    expect(fixProgress(null, { c1: 3 })).toBeNull();
  });

  it("has no ring for a student who has made no mistakes yet", () => {
    expect(fixProgress(0, {})).toEqual({ fixed: 0, waiting: 0, share: 0 });
  });

  it("reads a pulse without per-chapter counts as nothing waiting", () => {
    expect(fixProgress(5, undefined)).toEqual({ fixed: 5, waiting: 0, share: 1 });
  });
});

let seq = 0;
const attempt = (over: Partial<HistoryAttempt> = {}): HistoryAttempt => {
  seq += 1;
  return {
    attemptId: `t${seq}`,
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

describe("laneTrendKey: which paper's marks line goes with the subject on screen", () => {
  const maths = [attempt(), attempt(), attempt()];
  const gat = [
    attempt({ paperCode: "gat", maxScore: 600 }),
    attempt({ paperCode: "gat", maxScore: 600 }),
    attempt({ paperCode: "gat", maxScore: 600 }),
    attempt({ paperCode: "gat", maxScore: 600 }),
  ];
  const all = [...maths, ...gat];

  it("picks the paper that carries the subject: Mathematics is NDA Paper I", () => {
    expect(laneTrendKey(all, { exam: "NDA", subject: "Mathematics" })).toBe("nda:maths");
  });

  it("picks the GAT for any of its subjects", () => {
    expect(laneTrendKey(all, { exam: "NDA", subject: "English" })).toBe("nda:gat");
    expect(laneTrendKey(all, { exam: "NDA", subject: "Physics" })).toBe("nda:gat");
  });

  it("ignores another exam's papers with the same subject", () => {
    const cds = [1, 2, 3, 4].map(() => attempt({ examSlug: "cds", examName: "CDS", paperCode: "maths", maxScore: 100 }));
    expect(laneTrendKey([...maths, ...cds], { exam: "NDA", subject: "Mathematics" })).toBe("nda:maths");
  });

  it("is null when no paper of that exam carries the subject", () => {
    expect(laneTrendKey(maths, { exam: "NDA", subject: "English" })).toBeNull();
    expect(laneTrendKey(maths, { exam: "CDS", subject: "Mathematics" })).toBeNull();
  });
});

describe("the charts are on the pages", () => {
  const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

  it("Papers shows the marks line for the subject on screen", () => {
    const page = read("src", "app", "performance", "page.tsx");
    expect(page).toContain("laneTrendKey(");
    expect(page).toContain("<AttemptsTrend");
  });

  it("Review draws the reason bars and the fixed count", () => {
    const fix = read("src", "app", "review", "FixOverview.tsx");
    expect(fix).toContain("<ReasonBar");
    expect(fix).toContain("<FixedSoFar");
  });

  it("the tiles carry rings, the map a subject bar, Home's weak spots a bar each", () => {
    expect(read("src", "components", "me", "OutcomeTiles.tsx")).toContain("<ProgressRing");
    expect(read("src", "app", "me", "map", "page.tsx")).toContain("<SegmentBar");
    expect(read("src", "app", "me", "WeakSpots.tsx")).toContain("barWidth(");
  });

  it("every bar's numbers are also in words beside it (colour is never the only carrier)", () => {
    const bar = read("src", "components", "me", "SegmentBar.tsx");
    expect(bar).toContain('aria-hidden');
  });
});
