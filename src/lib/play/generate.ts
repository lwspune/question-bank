import type { LevelId } from "./levels";

/**
 * /play's sums, made by code: nothing to transcribe and no key to check, so
 * every answer is right by construction (tests/play-game.test.ts evaluates each
 * prompt independently). Whole numbers only, never negative, division always
 * exact, and no x 1 / + 0 filler.
 */

export type Rng = () => number;
export type Problem = { prompt: string; answer: number };

/** mulberry32: small, fast, repeatable for a seed (tests only need repeatable). */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const int = (rng: Rng, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));
const pick = <T,>(rng: Rng, xs: readonly T[]): T => xs[Math.floor(rng() * xs.length)];

/** The minus sign students see in print (U+2212), not a hyphen. */
const MINUS = "−";

function addSub(rng: Rng, lo: number, hi: number): Problem {
  const a = int(rng, lo, hi);
  const b = int(rng, lo, hi);
  if (rng() < 0.5) return { prompt: `${a} + ${b}`, answer: a + b };
  const [big, small] = a >= b ? [a, b] : [b, a];
  return { prompt: `${big} ${MINUS} ${small}`, answer: big - small };
}

function times(a: number, b: number, rng: Rng): Problem {
  return rng() < 0.5 ? { prompt: `${a} × ${b}`, answer: a * b } : { prompt: `${b} × ${a}`, answer: a * b };
}

function divide(divisor: number, quotient: number): Problem {
  return { prompt: `${divisor * quotient} ÷ ${divisor}`, answer: quotient };
}

function orderOfOperations(rng: Rng): Problem {
  switch (pick(rng, [0, 1, 2, 3] as const)) {
    case 0: {
      const a = int(rng, 2, 30), b = int(rng, 2, 9), c = int(rng, 2, 9);
      return { prompt: `${a} + ${b} × ${c}`, answer: a + b * c };
    }
    case 1: {
      const a = int(rng, 2, 9), b = int(rng, 2, 9);
      const c = int(rng, 2, Math.min(20, a * b));
      return { prompt: `${a} × ${b} ${MINUS} ${c}`, answer: a * b - c };
    }
    case 2: {
      const a = int(rng, 2, 9), b = int(rng, 2, 9), c = int(rng, 2, 9), d = int(rng, 2, 9);
      return { prompt: `${a} × ${b} + ${c} × ${d}`, answer: a * b + c * d };
    }
    default: {
      const a = int(rng, 2, 15), b = int(rng, 2, 15), c = int(rng, 2, 9);
      return { prompt: `(${a} + ${b}) × ${c}`, answer: (a + b) * c };
    }
  }
}

/**
 * A two-digit add or subtract with no carrying or borrowing, like 43 + 25 or
 * 78 − 35: Number Rain's world 4 opens with these (2026-11-23), so the first
 * sums of a new skill are the easy kind before carries come.
 */
export function makeNoCarryTwoDigit(rng: Rng): Problem {
  if (rng() < 0.5) {
    const t1 = int(rng, 1, 8);
    const t2 = int(rng, 1, 9 - t1);
    const u1 = int(rng, 0, 9);
    const u2 = int(rng, 0, 9 - u1);
    const a = t1 * 10 + u1;
    const b = t2 * 10 + u2;
    return { prompt: `${a} + ${b}`, answer: a + b };
  }
  const t1 = int(rng, 2, 9);
  const t2 = int(rng, 1, t1 - 1);
  const u1 = int(rng, 0, 9);
  const u2 = int(rng, 0, u1);
  const a = t1 * 10 + u1;
  const b = t2 * 10 + u2;
  return { prompt: `${a} ${MINUS} ${b}`, answer: a - b };
}

export function makeProblem(level: LevelId, rng: Rng): Problem {
  switch (level) {
    case 1:
      return addSub(rng, 2, 20);
    case 2:
      return times(int(rng, 2, 10), int(rng, 2, 10), rng);
    case 3:
      return divide(int(rng, 2, 10), int(rng, 2, 10));
    case 4:
      return addSub(rng, 11, 99);
    case 5:
      return times(int(rng, 11, 20), int(rng, 2, 10), rng);
    case 6:
      return rng() < 0.5 ? times(int(rng, 12, 99), int(rng, 3, 9), rng) : divide(int(rng, 3, 9), int(rng, 12, 99));
    case 7:
      return orderOfOperations(rng);
    case 8:
      return times(int(rng, 11, 60), int(rng, 11, 25), rng);
  }
}

/** The next sum, never the same prompt twice in a row. */
export function nextProblem(level: LevelId, rng: Rng, prev?: Problem): Problem {
  for (let i = 0; i < 20; i++) {
    const p = makeProblem(level, rng);
    if (p.prompt !== prev?.prompt) return p;
  }
  // 20 repeats in a row cannot happen on any level's range; this is a guard, not a path.
  return makeProblem(level, rng);
}
