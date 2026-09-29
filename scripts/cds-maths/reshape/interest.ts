/**
 * Reshape plan — CDS "Simple and Compound Interest" (34 q), for scripts/cds-maths/reshape.ts.
 *
 * Read all 34 stems AND solutions (2026-09-29). The existing cut by kind of interest is sound;
 * the only change is that "Principal, Rate and Time Relationships" (2) is simple-interest work
 * (a change of rate on a fixed sum, and a data-sufficiency item on P and R), so it joins
 * "Simple Interest". The 2026-I two-loan premise set stays together there.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  simple: "Simple Interest",
  compound: "Compound Interest",
  difference: "Instalments and Difference of SI and CI",
} as const;

const plan: ReshapePlan = {
  chapter: "Simple and Compound Interest",
  order: [T.simple, T.compound, T.difference],
  whole: {},
  byPrefix: {
    [T.simple]: [
      "f37881d2", "9ac2aaf8", "d55a4fad", "8b00a8eb", "c2a7eda1", "55e5fdbf", "9cbe385e", "abdc4f2a",
      "9f21e3e2", "66c83beb", "0a09522c", "14622523", "960f806e",
    ],
    [T.compound]: [
      "b562a3e9", "22207e65", "d7f2ccb9", "1072ff43", "9bc3c8ac", "88eea6ca", "7d2b2337", "a01f7bcf",
      "4c789db6", "8af4c864", "5dd94ccb", "574af138", "484944e0",
    ],
    [T.difference]: ["715ac322", "c5ff808d", "60d16d1e", "7fdf498d", "18ba474c", "85e00e3c", "eb62e646", "8a5a8d2f"],
  },
  expected: {
    [T.simple]: 13,
    [T.compound]: 13,
    [T.difference]: 8,
  },
  total: 34,
};

export default plan;
