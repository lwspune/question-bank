import { describe, expect, it } from "vitest";
import { difficultyDrift, difficultyMix } from "../scripts/mhtcet/difficultyDrift";

const many = (d: "EASY" | "MODERATE" | "HARD", n: number) => Array.from({ length: n }, () => d);

describe("difficultyMix", () => {
  it("returns whole-number percentages of EASY, MODERATE and HARD", () => {
    expect(difficultyMix([...many("EASY", 10), ...many("MODERATE", 25), ...many("HARD", 15)])).toEqual({
      n: 50,
      EASY: 20,
      MODERATE: 50,
      HARD: 30,
    });
  });
});

describe("difficultyDrift", () => {
  const baseline = { EASY: 10, MODERATE: 52, HARD: 38 };

  it("passes a paper graded on the same scale", () => {
    const mix = difficultyMix([...many("EASY", 6), ...many("MODERATE", 25), ...many("HARD", 19)]);
    expect(difficultyDrift(mix, baseline)).toEqual([]);
  });

  it("flags a paper whose HARD share is far below the bank's (the 2026 Maths labels: 11% vs 38%)", () => {
    const mix = difficultyMix([...many("EASY", 18), ...many("MODERATE", 26), ...many("HARD", 6)]);
    const out = difficultyDrift(mix, baseline);
    expect(out.join(" ")).toMatch(/HARD/);
    expect(out.join(" ")).toMatch(/EASY/);
  });

  it("flags EASY drift even where HARD is near zero anyway (the 2026 Chemistry labels)", () => {
    const chem = { EASY: 53, MODERATE: 44, HARD: 3 };
    const mix = difficultyMix([...many("EASY", 43), ...many("MODERATE", 7)]);
    expect(difficultyDrift(mix, chem).join(" ")).toMatch(/EASY/);
  });

  it("allows ordinary paper-to-paper noise inside the tolerance", () => {
    const mix = difficultyMix([...many("EASY", 12), ...many("MODERATE", 24), ...many("HARD", 14)]);
    expect(difficultyDrift(mix, baseline)).toEqual([]);
  });
});
