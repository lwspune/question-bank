import { describe, expect, it } from "vitest";
import {
  SCORE_CALCULATORS,
  LIVE_CALCULATORS,
  calculatorBySlug,
  computeScore,
  type SheetItem,
} from "@/lib/scoreCalc/score";
import { JEE_MAINS_PAPER, SSC_CGL_T1_PAPER, SSC_CPO_P1_PAPER } from "@/lib/mocks/blueprints";

/** n items of one outcome in one section. */
function many(section: string, outcome: SheetItem["outcome"], n: number): SheetItem[] {
  return Array.from({ length: n }, () => ({ section, outcome }));
}

describe("SCORE_CALCULATORS", () => {
  it("reads each exam's marking from the mock blueprints, never a second copy", () => {
    expect(calculatorBySlug("ssc-cgl")?.blueprint).toBe(SSC_CGL_T1_PAPER);
    expect(calculatorBySlug("ssc-cpo")?.blueprint).toBe(SSC_CPO_P1_PAPER);
    expect(calculatorBySlug("jee-main")?.blueprint).toBe(JEE_MAINS_PAPER);
  });

  it("has unique URL slugs and no calculator without a blueprint (MTS waits for its scheme)", () => {
    const slugs = SCORE_CALCULATORS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).not.toContain("ssc-mts");
    for (const c of SCORE_CALCULATORS) {
      expect(c.blueprint.sections.length).toBeGreaterThan(0);
      // A sheet is checked question by question, so every part needs a fixed count.
      for (const s of c.blueprint.sections) expect(s.count, `${c.slug} ${s.key}`).toBeGreaterThan(0);
    }
  });

  it("puts only calculators with a checked reader live (SSC waits for its browser reader)", () => {
    expect(LIVE_CALCULATORS.map((c) => c.slug)).toEqual(["jee-main"]);
  });

  it("returns undefined for an unknown slug", () => {
    expect(calculatorBySlug("ssc-gd")).toBeUndefined();
  });
});

describe("computeScore", () => {
  it("scores the mockup's SSC CGL sample part by part (+2 / -0.5)", () => {
    const items: SheetItem[] = [
      ...many("reasoning", "right", 21), ...many("reasoning", "wrong", 3), ...many("reasoning", "blank", 1),
      ...many("general-awareness", "right", 15), ...many("general-awareness", "wrong", 6), ...many("general-awareness", "blank", 4),
      ...many("quantitative-aptitude", "right", 18), ...many("quantitative-aptitude", "wrong", 4), ...many("quantitative-aptitude", "blank", 3),
      ...many("english", "right", 22), ...many("english", "wrong", 2), ...many("english", "blank", 1),
    ];
    const r = computeScore(SSC_CGL_T1_PAPER, items);
    if (!r.ok) throw new Error(r.error);
    expect(r.score.total).toBe(144.5);
    expect(r.score.max).toBe(200);
    expect(r.score.right).toBe(76);
    expect(r.score.wrong).toBe(15);
    expect(r.score.blank).toBe(9);
    expect(r.score.negative).toBe(7.5);
    expect(r.score.sections.map((s) => [s.key, s.marks, s.max])).toEqual([
      ["reasoning", 40.5, 50],
      ["general-awareness", 27, 50],
      ["quantitative-aptitude", 34, 50],
      ["english", 43, 50],
    ]);
  });

  it("scores JEE at +4 / -1 and gives a bonus question full marks", () => {
    const items: SheetItem[] = [
      ...many("physics", "right", 19), ...many("physics", "wrong", 4), ...many("physics", "blank", 1),
      { section: "physics", outcome: "bonus" },
      ...many("chemistry", "right", 21), ...many("chemistry", "wrong", 3), ...many("chemistry", "blank", 1),
      ...many("maths", "right", 13), ...many("maths", "wrong", 4), ...many("maths", "blank", 8),
    ];
    const r = computeScore(JEE_MAINS_PAPER, items);
    if (!r.ok) throw new Error(r.error);
    expect(r.score.total).toBe(205);
    expect(r.score.max).toBe(300);
    expect(r.score.bonus).toBe(1);
    expect(r.score.sections.find((s) => s.key === "physics")?.marks).toBe(76);
  });

  it("refuses a sheet whose question count does not match the paper, rather than show a wrong score", () => {
    const items = [...many("reasoning", "right", 24), ...many("general-awareness", "right", 25),
      ...many("quantitative-aptitude", "right", 25), ...many("english", "right", 25)];
    const r = computeScore(SSC_CGL_T1_PAPER, items);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/General Intelligence and Reasoning.*24.*25/);
  });

  it("refuses an item in a section the paper does not have", () => {
    const items = [...many("reasoning", "right", 25), ...many("general-awareness", "right", 25),
      ...many("quantitative-aptitude", "right", 25), ...many("english", "right", 24),
      { section: "computer", outcome: "right" as const }];
    const r = computeScore(SSC_CGL_T1_PAPER, items);
    expect(r.ok).toBe(false);
  });

  it("keeps quarter marks exact (CPO +1 / -0.25 over 200 questions)", () => {
    const items: SheetItem[] = SSC_CPO_P1_PAPER.sections.flatMap((s) => [
      ...many(s.key, "right", 37), ...many(s.key, "wrong", 9), ...many(s.key, "blank", 4),
    ]);
    const r = computeScore(SSC_CPO_P1_PAPER, items);
    if (!r.ok) throw new Error(r.error);
    expect(r.score.total).toBe(4 * (37 - 9 * 0.25));
    expect(r.score.max).toBe(200);
  });
});
