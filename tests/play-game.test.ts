import { describe, it, expect } from "vitest";
import { LEVELS, levelById, CLEAR_ACCURACY, ROUND_MS, type LevelId } from "@/lib/play/levels";
import { makeProblem, nextProblem, seededRng } from "@/lib/play/generate";
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
