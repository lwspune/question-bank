import { describe, expect, it } from "vitest";
import { scoreInsights } from "@/lib/scoreCalc/insights";
import { computeScore, type SheetItem } from "@/lib/scoreCalc/score";
import { JEE_MAINS_PAPER } from "@/lib/mocks/blueprints";

function sheet(spec: Record<string, [number, number, number]>): SheetItem[] {
  return Object.entries(spec).flatMap(([section, [r, w, b]]) => [
    ...Array.from({ length: r }, () => ({ section, outcome: "right" as const })),
    ...Array.from({ length: w }, () => ({ section, outcome: "wrong" as const })),
    ...Array.from({ length: b }, () => ({ section, outcome: "blank" as const })),
  ]);
}

function insights(spec: Record<string, [number, number, number]>) {
  const r = computeScore(JEE_MAINS_PAPER, sheet(spec));
  if (!r.ok) throw new Error(r.error);
  return scoreInsights(JEE_MAINS_PAPER, r.score);
}

describe("scoreInsights", () => {
  it("names the strongest subject, then the blanks in the weakest as the next marks", () => {
    expect(insights({ physics: [19, 4, 2], chemistry: [21, 3, 1], maths: [13, 4, 8] })).toEqual([
      "Chemistry carried your score.",
      "Mathematics is where your next marks are: you left 8 questions blank there, worth up to 32 marks.",
    ]);
  });

  it("points at wrong answers when the weakest subject has few blanks", () => {
    expect(insights({ physics: [20, 4, 1], chemistry: [22, 2, 1], maths: [15, 9, 1] })).toEqual([
      "Chemistry carried your score.",
      "Mathematics cost you the most: 9 wrong answers took away 9 marks. Answer only when you can rule out the other options.",
    ]);
  });

  it("says something kind and true when every subject is close", () => {
    expect(insights({ physics: [24, 0, 1], chemistry: [24, 0, 1], maths: [24, 0, 1] })).toEqual([
      "Even across all three subjects. Well done.",
    ]);
  });

  it("never uses an em dash (owner rule for visible text)", () => {
    const all = insights({ physics: [5, 10, 10], chemistry: [21, 3, 1], maths: [13, 4, 8] }).join(" ");
    expect(all).not.toMatch(/—| -- | – /);
  });
});
