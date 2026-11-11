import { describe, expect, it } from "vitest";
import { CLAT_PAPER, clatPaper, getBlueprint, totalMarks, totalQuestions } from "@/lib/mocks/blueprints";
import { clatSittings, deriveClatSittings } from "../scripts/mocks/clatSittings";

/**
 * CLAT UG mocks: one per year, the Consortium's Set A paper whole. 120 questions
 * since CLAT 2024 (150 in 2022 and 2023), five sections in the booklet's order,
 * +1 / -0.25, two hours. A question the Consortium withdrew stays in as grace,
 * so no section shortens.
 */
describe("CLAT blueprint", () => {
  it("is the current pattern by default: 120 questions, 120 marks, 2 hours, +1 / -0.25, five sections in booklet order", () => {
    expect(totalQuestions(CLAT_PAPER)).toBe(120);
    expect(totalMarks(CLAT_PAPER)).toBe(120);
    expect(CLAT_PAPER.durationSecs).toBe(120 * 60);
    expect(CLAT_PAPER.marking).toEqual({ correct: 1, wrong: -0.25 });
    expect(CLAT_PAPER.sections.map((s) => [s.subjects.join(), s.count])).toEqual([
      ["English Language", 24],
      ["Current Affairs including General Knowledge", 28],
      ["Legal Reasoning", 30],
      ["Logical Reasoning", 26],
      ["Quantitative Techniques", 12],
    ]);
  });

  it("takes a year's own section counts, keeping the same code", () => {
    const bp = clatPaper({ "English Language": 30, "Current Affairs including General Knowledge": 35, "Legal Reasoning": 40, "Logical Reasoning": 30, "Quantitative Techniques": 15 });
    expect(totalQuestions(bp)).toBe(150);
    expect(bp.code).toBe(CLAT_PAPER.code);
    expect(bp.durationSecs).toBe(120 * 60);
  });

  it("resolves through getBlueprint", () => {
    expect(getBlueprint("clat", "paper")).toBe(CLAT_PAPER);
  });
});

describe("CLAT sittings: one mock per year in the bank", () => {
  it("names a year's paper by its source file, slug and title", () => {
    const [s] = deriveClatSittings([2026], () => 1);
    expect(s).toMatchObject({
      key: "2026",
      year: 2026,
      sourceFile: "CLAT 2026 (sat 7 Dec 2025, Set A)",
      slug: "clat-2026",
      title: "CLAT 2026",
    });
  });

  it("reads each year's section counts from years.json, the printed contents page", () => {
    const by = new Map(clatSittings().map((s) => [s.year, s.counts]));
    expect(by.get(2026)?.["Legal Reasoning"]).toBe(30);
    expect(by.get(2025)?.["Legal Reasoning"]).toBe(32);
    expect(by.get(2023)?.["Current Affairs including General Knowledge"]).toBe(35);
    for (const [y, c] of by) expect(Object.values(c).reduce((a, b) => a + b, 0), String(y)).toBe(y <= 2023 ? 150 : 120);
  });
});
