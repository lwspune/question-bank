/**
 * Syllogisms judged exactly (owner, 2026-10-31). Sets are drawn as circles,
 * but a picture is only one arrangement: whether a conclusion FOLLOWS is
 * decided here by trying every way the sets can overlap. With n sets (at
 * most 4) there are 2^n - 1 regions, each empty or not; an arrangement is
 * allowed when it satisfies every statement and leaves no set empty (the
 * exam's convention). A definite conclusion follows when it holds in every
 * allowed arrangement; a possibility ("All A being B is a possibility")
 * when it holds in at least one. Two conclusions that do not follow form an
 * either/or pair when exactly one of them holds in every arrangement. Pure.
 */

export type Form = "all" | "no" | "some" | "someNot" | "overlap";
export interface Claim {
  form: Form;
  a: string;
  b: string;
  /** A possibility conclusion. */
  possible?: boolean;
}

export const FORMS: readonly Form[] = ["all", "no", "some", "someNot", "overlap"];
export class SylError extends Error {}

export interface Judgement {
  /** One per conclusion. */
  follows: boolean[];
  /** 1-based pairs of conclusions that form an either/or. */
  either: [number, number][];
  /** How many arrangements the statements allow. */
  arrangements: number;
}

export function judge(sets: readonly string[], statements: readonly Claim[], conclusions: readonly Claim[]): Judgement {
  const n = sets.length;
  if (n < 2 || n > 4) throw new SylError("2 to 4 sets");
  const bit = (id: string) => {
    const i = sets.indexOf(id);
    if (i < 0) throw new SylError(`${id} is not among the sets`);
    return 1 << i;
  };
  const R = (1 << n) - 1;
  const regions = Array.from({ length: R }, (_, k) => k + 1);
  // For each claim, the regions it looks at, as bitmasks over the model.
  const mask = (pred: (r: number) => boolean) => regions.reduce((m, r, k) => (pred(r) ? m | (1 << k) : m), 0);
  const compile = (c: Claim) => {
    const A = bit(c.a);
    const B = bit(c.b);
    const aNotB = mask((r) => (r & A) !== 0 && (r & B) === 0);
    const bNotA = mask((r) => (r & B) !== 0 && (r & A) === 0);
    const both = mask((r) => (r & A) !== 0 && (r & B) !== 0);
    return (m: number) => {
      switch (c.form) {
        case "all":
          return (m & aNotB) === 0;
        case "no":
          return (m & both) === 0;
        case "some":
          return (m & both) !== 0;
        case "someNot":
          return (m & aNotB) !== 0;
        case "overlap":
          return (m & both) !== 0 && (m & aNotB) !== 0 && (m & bNotA) !== 0;
      }
    };
  };
  const nonEmpty = sets.map((id) => mask((r) => (r & bit(id)) !== 0));
  const st = statements.map(compile);
  const allowed: number[] = [];
  for (let m = 1; m < 1 << R; m++) if (nonEmpty.every((s) => (m & s) !== 0) && st.every((f) => f(m))) allowed.push(m);
  if (!allowed.length) throw new SylError("no arrangement of the sets satisfies every statement");

  const co = conclusions.map(compile);
  const truth = co.map((f) => allowed.map(f));
  const follows = conclusions.map((c, i) => (c.possible ? truth[i].some(Boolean) : truth[i].every(Boolean)));
  const either: [number, number][] = [];
  for (let i = 0; i < conclusions.length; i++)
    for (let j = i + 1; j < conclusions.length; j++)
      if (!follows[i] && !follows[j] && !conclusions[i].possible && !conclusions[j].possible && allowed.every((_, k) => truth[i][k] !== truth[j][k])) either.push([i + 1, j + 1]);
  return { follows, either, arrangements: allowed.length };
}
