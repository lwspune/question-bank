import { describe, it, expect } from "vitest";
import {
  selectByQuota,
  selectTotal,
  orderPaper,
  orderPaperBySections,
  passesChapterFilters,
  type Cand,
} from "../scripts/bank-paper/lib";

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

describe("orderPaperBySections", () => {
  // A real GAT paper is English 1-50 then General Knowledge 51-150. A candidate
  // works one section at a time, so difficulty may NOT be interleaved across the
  // section boundary the way orderPaper interleaves across chapters.
  it("keeps sections contiguous even when a later section is easier", () => {
    const eng = [c("eng-h", "grammar", "HARD")];
    const gk = [c("gk-e", "physics", "EASY")];
    const out = orderPaperBySections([
      { key: "english", groups: [eng] },
      { key: "gk", groups: [gk] },
    ]);
    // orderPaper alone would put the EASY question first; the section wall forbids it.
    expect(out.map((q) => q.cand.id)).toEqual(["eng-h", "gk-e"]);
    expect(out.map((q) => q.sectionKey)).toEqual(["english", "gk"]);
  });

  it("applies the existing within-section ordering unchanged", () => {
    const phy = [c("phy-e", "phy", "EASY"), c("phy-h", "phy", "HARD")];
    const geo = [c("geo-e", "geo", "EASY"), c("geo-h", "geo", "HARD")];
    const out = orderPaperBySections([{ key: "gk", groups: [phy, geo] }]);
    expect(out.map((q) => q.cand.id)).toEqual(orderPaper([phy, geo]).map((q) => q.id));
  });

  // Backwards compatibility: the three shipped single-section papers must not move.
  it("is identical to orderPaper for a single section", () => {
    const a = [c("a1", "a", "HARD"), c("a2", "a", "EASY")];
    const b = [c("b1", "b", "MODERATE")];
    const out = orderPaperBySections([{ key: "maths", groups: [a, b] }]);
    expect(out.map((q) => q.cand.id)).toEqual(orderPaper([a, b]).map((q) => q.id));
    expect(new Set(out.map((q) => q.sectionKey))).toEqual(new Set(["maths"]));
  });

  it("tags every question with the section it was drawn for", () => {
    const eng = [c("e1", "voc", "HARD"), c("e2", "voc", "EASY")];
    const gk = [c("g1", "phy", "HARD")];
    const out = orderPaperBySections([
      { key: "english", groups: [eng] },
      { key: "gk", groups: [gk] },
    ]);
    expect(out.filter((q) => q.sectionKey === "english").map((q) => q.cand.id).sort()).toEqual(["e1", "e2"]);
    expect(out.filter((q) => q.sectionKey === "gk").map((q) => q.cand.id)).toEqual(["g1"]);
  });

  it("is a permutation of its input across sections", () => {
    const eng = [c("a", "voc", "HARD"), c("b", "voc", "EASY")];
    const gk = [c("cc", "phy", "MODERATE"), c("d", "geo", "EASY")];
    const out = orderPaperBySections([
      { key: "english", groups: [eng] },
      { key: "gk", groups: [gk] },
    ]);
    expect(out.map((q) => q.cand.id).sort()).toEqual(["a", "b", "cc", "d"]);
  });

  it("skips an empty section without emitting a hole", () => {
    const gk = [c("g1", "phy", "HARD")];
    const out = orderPaperBySections([
      { key: "english", groups: [] },
      { key: "gk", groups: [gk] },
    ]);
    expect(out.map((q) => q.cand.id)).toEqual(["g1"]);
  });

  // A real GAT paper prints ONE directions block per English question type and
  // runs the GK half subject by subject, so a chapter's questions must stay
  // together rather than being interleaved by difficulty.
  describe('layout: "sequential"', () => {
    const phy = [c("phy-h", "phy", "HARD"), c("phy-e", "phy", "EASY")];
    const chem = [c("chem-m", "chem", "MODERATE")];
    const geo = [c("geo-h", "geo", "HARD")];

    it("keeps each chapter contiguous, in spec order", () => {
      const out = orderPaperBySections([{ key: "gk", groups: [phy, chem, geo] }], "sequential");
      expect(out.map((q) => q.cand.id)).toEqual(["phy-e", "phy-h", "chem-m", "geo-h"]);
    });

    it("still runs EASY -> MODERATE -> HARD *within* a chapter", () => {
      const mixed = [c("m", "x", "MODERATE"), c("h", "x", "HARD"), c("e", "x", "EASY")];
      const out = orderPaperBySections([{ key: "gk", groups: [mixed] }], "sequential");
      expect(out.map((q) => q.cand.id)).toEqual(["e", "m", "h"]);
    });

    it("does not let a later chapter's EASY question jump the earlier chapter", () => {
      const out = orderPaperBySections([{ key: "gk", groups: [geo, phy] }], "sequential");
      // interleave would lead with phy-e; sequential must not.
      expect(out[0].cand.id).toBe("geo-h");
      expect(orderPaper([geo, phy])[0].id).toBe("phy-e"); // the contrast, pinned
    });

    it("still honours the section wall", () => {
      const out = orderPaperBySections(
        [{ key: "english", groups: [[c("eng-h", "voc", "HARD")]] }, { key: "gk", groups: [phy] }],
        "sequential"
      );
      expect(out.map((q) => q.sectionKey)).toEqual(["english", "gk", "gk"]);
    });

    it("is a permutation of its input", () => {
      const out = orderPaperBySections([{ key: "gk", groups: [phy, chem, geo] }], "sequential");
      expect(out.map((q) => q.cand.id).sort()).toEqual(["chem-m", "geo-h", "phy-e", "phy-h"]);
    });

    it("defaults to interleave, so existing papers are untouched", () => {
      const a = [{ key: "gk", groups: [phy, chem, geo] }];
      expect(orderPaperBySections(a).map((q) => q.cand.id)).toEqual(
        orderPaperBySections(a, "interleave").map((q) => q.cand.id)
      );
      expect(orderPaperBySections(a).map((q) => q.cand.id)).toEqual(
        orderPaper([phy, chem, geo]).map((q) => q.id)
      );
    });
  });
});

describe("passesChapterFilters", () => {
  const used = new Set(["used-1", "used-2"]);
  const row = (id: string, setId: string | null = null, hasContext = false) => ({
    id,
    setId,
    hasContext,
  });

  it("defaults to the pre-existing behaviour: drop rows already in a paper", () => {
    expect(passesChapterFilters(row("fresh"), {}, used)).toBe(true);
    expect(passesChapterFilters(row("used-1"), {}, used)).toBe(false);
  });

  it("allowUsed lets a repeat through — needed when a topic's HARD supply is exhausted", () => {
    expect(passesChapterFilters(row("used-1"), { allowUsed: true }, used)).toBe(true);
  });

  it("soloOnly drops set members (RULE 1: a context is all-or-nothing)", () => {
    expect(passesChapterFilters(row("a", "set:S1"), { soloOnly: true }, used)).toBe(false);
    expect(passesChapterFilters(row("a"), { soloOnly: true }, used)).toBe(true);
  });

  it("soloOnly also drops a context-bearing row with a NULL set_id", () => {
    // set_id alone is not a sufficient guard — some sources share a context
    // with set_id NULL, which a set_id-only check cannot see.
    expect(passesChapterFilters(row("a", null, true), { soloOnly: true }, used)).toBe(false);
  });

  it("soloOnly is off by default, so specs predating it are unaffected", () => {
    expect(passesChapterFilters(row("a", "set:S1"), {}, used)).toBe(true);
  });

  it("includeIds restricts the pool to exactly the listed ids", () => {
    const f = { includeIds: ["keep"] };
    expect(passesChapterFilters(row("keep"), f, used)).toBe(true);
    expect(passesChapterFilters(row("other"), f, used)).toBe(false);
  });

  it("an EMPTY includeIds means nothing is eligible, not everything", () => {
    // Fails closed: an accidentally-empty screening list must starve the chapter
    // loudly (shortfall) rather than silently admit the whole chapter.
    expect(passesChapterFilters(row("a"), { includeIds: [] }, used)).toBe(false);
  });

  it("includeIds does not bypass the used-question rule", () => {
    expect(passesChapterFilters(row("used-1"), { includeIds: ["used-1"] }, used)).toBe(false);
    expect(
      passesChapterFilters(row("used-1"), { includeIds: ["used-1"], allowUsed: true }, used)
    ).toBe(true);
  });
});
