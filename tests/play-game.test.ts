import { describe, it, expect } from "vitest";
import { LEVELS, levelById, CLEAR_ACCURACY, ROUND_MS, type LevelId } from "@/lib/play/levels";
import { makeProblem, nextProblem, seededRng } from "@/lib/play/generate";
import {
  startRun,
  answer,
  finishRun,
  shouldSubmit,
  multiplierFor,
  ghostCountAt,
  feedbackLine,
} from "@/lib/play/run";
import { emptyProgress, parseProgress, recordResult, isUnlocked, serializeProgress } from "@/lib/play/progress";

/** Evaluate a prompt independently of the generator: swap the shown signs for JS ones. */
function evaluate(prompt: string): number {
  const js = prompt.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
  expect(js).toMatch(/^[\d\s+\-*/()]+$/);
  return Function(`"use strict"; return (${js});`)() as number;
}

describe("LEVELS", () => {
  it("are numbered 1..N in order, each with a name, a blurb and a positive target", () => {
    expect(LEVELS.length).toBeGreaterThanOrEqual(6);
    LEVELS.forEach((l, i) => {
      expect(l.id).toBe(i + 1);
      expect(l.name.length).toBeGreaterThan(0);
      expect(l.blurb.length).toBeGreaterThan(0);
      expect(l.target).toBeGreaterThan(0);
    });
  });

  it("a round is 60 seconds and clearing needs 80% right", () => {
    expect(ROUND_MS).toBe(60_000);
    expect(CLEAR_ACCURACY).toBe(0.8);
  });

  it("levelById finds a level and rejects anything else", () => {
    expect(levelById(1)?.id).toBe(1);
    expect(levelById(0)).toBeUndefined();
    expect(levelById(LEVELS.length + 1)).toBeUndefined();
    expect(levelById(1.5)).toBeUndefined();
  });
});

describe("makeProblem", () => {
  for (const level of LEVELS) {
    it(`level ${level.id}: every answer is a whole number >= 0 that the prompt really equals`, () => {
      const rng = seededRng(level.id * 7919);
      for (let i = 0; i < 2000; i++) {
        const p = makeProblem(level.id, rng);
        expect(Number.isInteger(p.answer)).toBe(true);
        expect(p.answer).toBeGreaterThanOrEqual(0);
        expect(evaluate(p.prompt)).toBe(p.answer);
        // Nothing trivial: no x 1, / 1, + 0 or - 0 (they teach nothing and feel like filler).
        expect(p.prompt).not.toMatch(/[×÷] 1(?!\d)|(?<!\d)1 ×|[+−] 0(?!\d)/);
      }
    });
  }

  it("level 1 stays small: both numbers 20 or under", () => {
    const rng = seededRng(1);
    for (let i = 0; i < 500; i++) {
      const nums = makeProblem(1, rng).prompt.match(/\d+/g)!.map(Number);
      for (const n of nums) expect(n).toBeLessThanOrEqual(20);
    }
  });

  it("division levels always divide exactly", () => {
    for (const id of [3, 6] as const) {
      const rng = seededRng(id);
      for (let i = 0; i < 1000; i++) {
        const p = makeProblem(id, rng);
        if (p.prompt.includes("÷")) {
          const [a, b] = p.prompt.split("÷").map((s) => Number(s.trim()));
          expect(a % b).toBe(0);
        }
      }
    }
  });

  it("level 2 covers every table from 2 to 10", () => {
    const rng = seededRng(2);
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) {
      const [a, b] = makeProblem(2, rng).prompt.split("×").map((s) => Number(s.trim()));
      seen.add(a);
      seen.add(b);
    }
    for (let t = 2; t <= 10; t++) expect(seen.has(t)).toBe(true);
  });

  it("is repeatable for a seed", () => {
    const a = seededRng(42);
    const b = seededRng(42);
    for (let i = 0; i < 50; i++) expect(makeProblem(4, a)).toEqual(makeProblem(4, b));
  });
});

describe("nextProblem", () => {
  it("never repeats the previous prompt", () => {
    const rng = seededRng(9);
    let prev = makeProblem(2, rng);
    for (let i = 0; i < 1000; i++) {
      const p = nextProblem(2, rng, prev);
      expect(p.prompt).not.toBe(prev.prompt);
      prev = p;
    }
  });
});

describe("shouldSubmit", () => {
  it("submits once as many digits as the answer has are typed", () => {
    expect(shouldSubmit("8", 85)).toBe(false);
    expect(shouldSubmit("85", 85)).toBe(true);
    expect(shouldSubmit("84", 85)).toBe(true);
    expect(shouldSubmit("7", 7)).toBe(true);
    expect(shouldSubmit("", 7)).toBe(false);
    expect(shouldSubmit("10", 100)).toBe(false);
  });
});

describe("multiplierFor", () => {
  it("answers 1-5 of a run score x1, 6-10 x2, 11-15 x3, then x4 at most", () => {
    expect([1, 5].map(multiplierFor)).toEqual([1, 1]);
    expect([6, 10].map(multiplierFor)).toEqual([2, 2]);
    expect([11, 15].map(multiplierFor)).toEqual([3, 3]);
    expect([16, 40].map(multiplierFor)).toEqual([4, 4]);
  });
});

describe("a round", () => {
  const p = (prompt: string, ans: number) => ({ prompt, answer: ans });

  it("a right answer adds to correct, the streak and points, and records when it came", () => {
    let s = startRun(2);
    s = answer(s, p("3 × 4", 12), 12, 1500);
    expect(s.correct).toBe(1);
    expect(s.streak).toBe(1);
    expect(s.points).toBe(10);
    expect(s.correctTimes).toEqual([1500]);
  });

  it("the combo pays more for a run of right answers", () => {
    let s = startRun(2);
    for (let i = 1; i <= 6; i++) s = answer(s, p("2 × 2", 4), 4, i * 1000);
    expect(s.points).toBe(5 * 10 + 20);
    expect(s.bestStreak).toBe(6);
  });

  it("a wrong answer resets the streak and keeps the mistake with the right answer", () => {
    let s = startRun(2);
    s = answer(s, p("2 × 2", 4), 4, 1000);
    s = answer(s, p("7 × 8", 56), 54, 2000);
    expect(s.streak).toBe(0);
    expect(s.bestStreak).toBe(1);
    expect(s.wrong).toBe(1);
    expect(s.mistakes).toEqual([{ prompt: "7 × 8", answer: 56, given: 54 }]);
  });

  it("stores whole milliseconds, though the browser clock gives fractions", () => {
    // performance.now() returns e.g. 13532.80000000447; stored as-is it failed
    // the progress parser and every saved round was thrown away (2026-11-16).
    const s = answer(startRun(1), p("2 + 2", 4), 4, 13532.80000000447);
    expect(s.correctTimes).toEqual([13533]);
    const r = finishRun(s);
    expect(parseProgress(serializeProgress(recordResult(emptyProgress(), r).progress)).best[1]?.times).toEqual([13533]);
  });

  it("does not change the state it was given", () => {
    const s = startRun(1);
    answer(s, p("2 + 2", 4), 4, 10);
    expect(s.correct).toBe(0);
    expect(s.correctTimes).toEqual([]);
  });
});

describe("finishRun", () => {
  const level = LEVELS[0];
  const run = (correct: number, wrong: number) => {
    let s = startRun(level.id);
    for (let i = 0; i < correct; i++) s = answer(s, { prompt: "2 + 2", answer: 4 }, 4, i);
    for (let i = 0; i < wrong; i++) s = answer(s, { prompt: "2 + 2", answer: 4 }, 5, i);
    return finishRun(s);
  };

  it("clears at the target with 80%+ right", () => {
    const r = run(level.target, 2);
    expect(r.cleared).toBe(true);
    expect(r.accuracy).toBeCloseTo(level.target / (level.target + 2));
  });

  it("does not clear below the target, or below 80%", () => {
    expect(run(level.target - 1, 0).cleared).toBe(false);
    expect(run(level.target, level.target).cleared).toBe(false);
  });

  it("a round with no answers has 0 accuracy and does not clear", () => {
    const r = run(0, 0);
    expect(r.accuracy).toBe(0);
    expect(r.cleared).toBe(false);
  });
});

describe("feedbackLine", () => {
  const level = LEVELS[1];
  const result = (over: Partial<ReturnType<typeof finishRun>>) => ({
    ...finishRun(startRun(level.id)),
    ...over,
  });

  it("names what is left to clear, never a bare score", () => {
    expect(feedbackLine(result({ correct: level.target - 3, wrong: 0, accuracy: 1 }))).toContain("3 more right");
    expect(
      feedbackLine(result({ correct: level.target + 2, wrong: 10, accuracy: 0.6, cleared: false }))
    ).toContain("80%");
    expect(feedbackLine(result({ correct: level.target, wrong: 0, accuracy: 1, cleared: true }))).toContain("cleared");
  });

  it("says how to play when nothing was answered", () => {
    expect(feedbackLine(result({}))).toMatch(/keypad/i);
  });

  it("uses no em dash", () => {
    for (const r of [result({}), result({ correct: 1, accuracy: 1 }), result({ cleared: true, correct: 30, accuracy: 1 })]) {
      expect(feedbackLine(r)).not.toContain("—");
    }
  });
});

describe("ghostCountAt", () => {
  it("counts the best run's right answers given by that moment", () => {
    const times = [1000, 2500, 4000];
    expect(ghostCountAt(times, 0)).toBe(0);
    expect(ghostCountAt(times, 2500)).toBe(2);
    expect(ghostCountAt(times, 60_000)).toBe(3);
  });
});

describe("progress", () => {
  const result = (level: number, correct: number, cleared: boolean, points = correct * 10) => ({
    level: level as LevelId,
    correct,
    wrong: 0,
    accuracy: correct ? 1 : 0,
    points,
    bestStreak: correct,
    cleared,
    correctTimes: Array.from({ length: correct }, (_, i) => (i + 1) * 1000),
  });

  it("starts with only level 1 open", () => {
    const p = emptyProgress();
    expect(isUnlocked(p, 1)).toBe(true);
    expect(isUnlocked(p, 2)).toBe(false);
  });

  it("clearing a level opens the next one and says so once", () => {
    const first = recordResult(emptyProgress(), result(1, 25, true));
    expect(first.unlocked).toBe(2);
    expect(isUnlocked(first.progress, 2)).toBe(true);
    expect(isUnlocked(first.progress, 3)).toBe(false);
    const again = recordResult(first.progress, result(1, 25, true));
    expect(again.unlocked).toBeNull();
  });

  it("clearing the last level unlocks nothing new", () => {
    const last = LEVELS.length;
    let p = emptyProgress();
    for (let l = 1; l < last; l++) p = recordResult(p, result(l, 30, true)).progress;
    expect(recordResult(p, result(last, 30, true)).unlocked).toBeNull();
  });

  it("keeps the best round per level, with its timings for the ghost", () => {
    const a = recordResult(emptyProgress(), result(1, 10, false));
    expect(a.newBest).toBe(true);
    const b = recordResult(a.progress, result(1, 8, false));
    expect(b.newBest).toBe(false);
    expect(b.progress.best[1]?.correct).toBe(10);
    const c = recordResult(b.progress, result(1, 12, false));
    expect(c.newBest).toBe(true);
    expect(c.progress.best[1]?.times).toHaveLength(12);
  });

  it("a round with nothing right is never a best", () => {
    expect(recordResult(emptyProgress(), result(1, 0, false)).newBest).toBe(false);
  });

  it("survives a round trip through storage", () => {
    const p = recordResult(emptyProgress(), result(1, 25, true)).progress;
    expect(parseProgress(serializeProgress(p))).toEqual(p);
  });

  it("falls back to a fresh start on anything it cannot trust", () => {
    for (const raw of [null, "", "not json", "[]", '{"v":2}', '{"v":1,"cleared":["x"],"best":{}}', '{"v":1,"cleared":[1],"best":{"1":{"points":"9"}}}']) {
      expect(parseProgress(raw)).toEqual(emptyProgress());
    }
  });

  it("drops a cleared level that does not exist", () => {
    const p = parseProgress(JSON.stringify({ v: 1, cleared: [1, 99], best: {} }));
    expect(p.cleared).toEqual([1]);
  });
});
