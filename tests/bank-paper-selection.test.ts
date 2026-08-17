import { describe, it, expect } from "vitest";
import { selectByQuota, selectTotal, orderPaper, type Cand } from "../scripts/bank-paper/lib";

const c = (id: string, chapterId: string, difficulty: Cand["difficulty"]): Cand => ({
  id,
  chapterId,
  difficulty,
});

describe("selectByQuota", () => {
  const pool: Cand[] = [
    c("e2", "bd", "EASY"),
    c("e1", "bd", "EASY"),
    c("m2", "bd", "MODERATE"),
    c("m1", "bd", "MODERATE"),
    c("m3", "bd", "MODERATE"),
    c("h1", "bd", "HARD"),
  ];

  it("picks exactly the quota per difficulty, in stable id order", () => {
    const { picked, shortfall } = selectByQuota(pool, { EASY: 1, MODERATE: 2, HARD: 1 });
    expect(picked.map((p) => p.id)).toEqual(["e1", "m1", "m2", "h1"]);
    expect(shortfall).toEqual({});
  });

  it("reports a shortfall instead of silently under-delivering", () => {
    // HARD supply is 1; ask for 3.
    const { picked, shortfall } = selectByQuota(pool, { EASY: 0, MODERATE: 0, HARD: 3 });
    expect(picked.map((p) => p.id)).toEqual(["h1"]);
    expect(shortfall).toEqual({ HARD: 2 });
  });

  it("never picks the same question twice", () => {
    const { picked } = selectByQuota(pool, { EASY: 2, MODERATE: 3, HARD: 1 });
    expect(new Set(picked.map((p) => p.id)).size).toBe(picked.length);
    expect(picked.length).toBe(6);
  });

  it("returns nothing for an all-zero quota", () => {
    const { picked, shortfall } = selectByQuota(pool, { EASY: 0, MODERATE: 0, HARD: 0 });
    expect(picked).toEqual([]);
    expect(shortfall).toEqual({});
  });
});

describe("selectTotal", () => {
  const SHAPE = { EASY: 0.2, MODERATE: 0.55, HARD: 0.25 };
  const many = (prefix: string, d: Cand["difficulty"], n: number): Cand[] =>
    Array.from({ length: n }, (_, i) => c(`${prefix}${String(i).padStart(2, "0")}`, "ch", d));

  it("hits the target shape when supply allows, and sums to exactly `take`", () => {
    const pool = [...many("e", "EASY", 20), ...many("m", "MODERATE", 20), ...many("h", "HARD", 20)];
    const { picked, shortfall } = selectTotal(pool, 20, SHAPE);
    expect(picked.length).toBe(20);
    expect(shortfall).toBe(0);
    expect(picked.filter((p) => p.difficulty === "EASY").length).toBe(4);
    expect(picked.filter((p) => p.difficulty === "MODERATE").length).toBe(11);
    expect(picked.filter((p) => p.difficulty === "HARD").length).toBe(5);
  });

  // Unlike selectByQuota, a TOTAL is the caller's actual ask — the shape is only
  // a preference, so a thin difficulty is back-filled rather than left short.
  it("back-fills from other difficulties rather than under-delivering", () => {
    const pool = [...many("e", "EASY", 1), ...many("m", "MODERATE", 30)];
    const { picked, shortfall } = selectTotal(pool, 10, SHAPE);
    expect(picked.length).toBe(10);
    expect(shortfall).toBe(0);
    expect(picked.filter((p) => p.difficulty === "EASY").length).toBe(1);
    expect(picked.filter((p) => p.difficulty === "MODERATE").length).toBe(9);
  });

  it("reports a shortfall only when the whole pool is too small", () => {
    const pool = [...many("m", "MODERATE", 3)];
    const { picked, shortfall } = selectTotal(pool, 10, SHAPE);
    expect(picked.length).toBe(3);
    expect(shortfall).toBe(7);
  });

  it("takes the entire pool when take equals supply, with no duplicates", () => {
    const pool = [...many("e", "EASY", 1), ...many("m", "MODERATE", 1), ...many("h", "HARD", 1)];
    const { picked, shortfall } = selectTotal(pool, 3, SHAPE);
    expect(picked.length).toBe(3);
    expect(shortfall).toBe(0);
    expect(new Set(picked.map((p) => p.id)).size).toBe(3);
  });

  it("is deterministic and picks in stable id order", () => {
    const pool = [c("m3", "ch", "MODERATE"), c("m1", "ch", "MODERATE"), c("m2", "ch", "MODERATE")];
    expect(selectTotal(pool, 2, SHAPE).picked.map((p) => p.id)).toEqual(["m1", "m2"]);
    expect(selectTotal(pool, 2, SHAPE).picked.map((p) => p.id)).toEqual(["m1", "m2"]);
  });

  it("returns nothing for take = 0", () => {
    const pool = many("m", "MODERATE", 5);
    expect(selectTotal(pool, 0, SHAPE)).toEqual({ picked: [], shortfall: 0 });
  });

  // A 1-of-1 chapter is the common case in this bank's thin Class-11 chapters.
  it("handles a single-question pool", () => {
    const { picked, shortfall } = selectTotal([c("only", "ch", "HARD")], 1, SHAPE);
    expect(picked.map((p) => p.id)).toEqual(["only"]);
    expect(shortfall).toBe(0);
  });
});

describe("orderPaper", () => {
  it("runs EASY -> MODERATE -> HARD, interleaving the groups within each tier", () => {
    const bd = [c("bd-e", "bd", "EASY"), c("bd-m", "bd", "MODERATE"), c("bd-h", "bd", "HARD")];
    const lg = [c("lg-e", "lg", "EASY"), c("lg-m", "lg", "MODERATE"), c("lg-h", "lg", "HARD")];
    expect(orderPaper([bd, lg]).map((q) => q.id)).toEqual([
      "bd-e",
      "lg-e",
      "bd-m",
      "lg-m",
      "bd-h",
      "lg-h",
    ]);
  });

  it("appends the longer group's tail in order when groups are unequal", () => {
    const bd = [c("bd-m1", "bd", "MODERATE"), c("bd-m2", "bd", "MODERATE"), c("bd-m3", "bd", "MODERATE")];
    const lg = [c("lg-m1", "lg", "MODERATE")];
    expect(orderPaper([bd, lg]).map((q) => q.id)).toEqual(["bd-m1", "lg-m1", "bd-m2", "bd-m3"]);
  });

  // The load-bearing invariant: ordering must never lose or duplicate a pick.
  it("is a permutation of its input", () => {
    const bd = [c("a", "bd", "HARD"), c("b", "bd", "EASY"), c("cc", "bd", "MODERATE")];
    const lg = [c("d", "lg", "MODERATE"), c("e", "lg", "EASY")];
    const out = orderPaper([bd, lg]);
    expect(out.length).toBe(5);
    expect(out.map((q) => q.id).sort()).toEqual(["a", "b", "cc", "d", "e"]);
  });

  it("handles an empty group without emitting a hole", () => {
    const bd = [c("bd-e", "bd", "EASY")];
    expect(orderPaper([bd, []]).map((q) => q.id)).toEqual(["bd-e"]);
  });
});
