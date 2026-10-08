import { describe, it, expect } from "vitest";
import {
  shuffleOrder,
  buildRow,
  validatePaper,
  SECTION_COUNTS,
  type ImatQuestion,
} from "../scripts/imat/lib";
import { contentHash } from "@/lib/upload/hash";

// The ministry prints the correct answer as option A in every IMAT question
// (2023 says so in words; 2025 and 2026 highlight A in all 60). The pipeline
// must therefore shuffle each question's options, the SAME way on every run,
// or every answer on the site would be A.

function q(n: number, over: Partial<ImatQuestion> = {}): ImatQuestion {
  return {
    n,
    section: "biology",
    chapter: "The cell",
    text: `Question ${n}?`,
    options: [`right ${n}`, `wrong b ${n}`, `wrong c ${n}`, `wrong d ${n}`, `wrong e ${n}`],
    ...over,
  };
}

describe("shuffleOrder", () => {
  it("is a permutation of 0..4", () => {
    for (const seed of ["imat:2024:1", "imat:2024:2", "imat:2026:60"]) {
      expect([...shuffleOrder(seed)].sort()).toEqual([0, 1, 2, 3, 4]);
    }
  });

  it("is deterministic for a seed", () => {
    expect(shuffleOrder("imat:2025:17")).toEqual(shuffleOrder("imat:2025:17"));
  });

  it("spreads the printed-A answer across letters over a 60-question paper", () => {
    const letters = new Set<number>();
    const counts = [0, 0, 0, 0, 0];
    for (let n = 1; n <= 60; n++) {
      const order = shuffleOrder(`imat:2024:${n}`);
      const posOfPrintedA = order.indexOf(0);
      letters.add(posOfPrintedA);
      counts[posOfPrintedA]++;
    }
    expect(letters.size).toBe(5);
    // No letter carries more than half the paper's answers.
    expect(Math.max(...counts)).toBeLessThanOrEqual(30);
  });
});

describe("buildRow", () => {
  it("marks the printed A correct, at its shuffled letter", () => {
    const row = buildRow(2024, q(7));
    const correct = row.options.filter((o) => o.isCorrect);
    expect(correct).toHaveLength(1);
    expect(correct[0].text).toBe("right 7");
    expect(row.options.map((o) => o.label)).toEqual(["A", "B", "C", "D", "E"]);
    // The displayed order is the printed order permuted by shuffleOrder.
    const order = shuffleOrder("imat:2024:7");
    expect(row.options.map((o) => o.text)).toEqual(order.map((i) => q(7).options[i]));
  });

  it("hashes the stored text, options and answer letter", () => {
    const row = buildRow(2025, q(3));
    const answer = row.options.find((o) => o.isCorrect)!.label;
    expect(row.contentHash).toBe(
      contentHash(row.text, row.options.map((o) => o.text), answer)
    );
  });

  it("files a section under its subject, and Physics-and-Maths by the question's own subject", () => {
    expect(buildRow(2024, q(1, { section: "reading" })).subjectName).toBe(
      "Reading Skills and General Knowledge"
    );
    expect(buildRow(2024, q(5, { section: "logic" })).subjectName).toBe(
      "Logical Reasoning and Problem Solving"
    );
    expect(buildRow(2024, q(25, { section: "chemistry" })).subjectName).toBe("Chemistry");
    expect(buildRow(2024, q(50, { section: "physmath", subject: "Mathematics" })).subjectName).toBe(
      "Mathematics"
    );
    expect(buildRow(2024, q(55, { section: "physmath", subject: "Physics" })).subjectName).toBe("Physics");
  });

  it("carries the question number, chapter and context", () => {
    const row = buildRow(2026, q(12, { context: "A passage." }));
    expect(row.questionNumber).toBe("12");
    expect(row.chapterName).toBe("The cell");
    expect(row.context).toBe("A passage.");
  });

  it("refuses a question without exactly five options", () => {
    expect(() => buildRow(2024, q(1, { options: ["a", "b", "c", "d"] }))).toThrow(/five options/);
  });

  it("refuses an empty or duplicated option", () => {
    expect(() => buildRow(2024, q(1, { options: ["a", "b", " ", "d", "e"] }))).toThrow(/empty/);
    expect(() => buildRow(2024, q(1, { options: ["a", "b", "a", "d", "e"] }))).toThrow(/duplicate/);
  });

  it("allows a duplicated distractor only when the question is marked as printed", () => {
    // 2025 Q51 prints options B and E identically. Kept as printed, by name.
    const opts = ["right", "same", "other", "third", "same"];
    expect(() => buildRow(2025, q(51, { options: opts }))).toThrow(/duplicate/);
    const row = buildRow(2025, q(51, { options: opts, duplicateOptionsAsPrinted: true }));
    expect(row.options).toHaveLength(5);
    expect(row.options.filter((o) => o.isCorrect).map((o) => o.text)).toEqual(["right"]);
  });

  it("never allows the correct option to be duplicated", () => {
    const opts = ["right", "b", "c", "right", "e"];
    expect(() =>
      buildRow(2025, q(51, { options: opts, duplicateOptionsAsPrinted: true }))
    ).toThrow(/correct option/);
  });

  it("refuses a Physics-and-Maths question with no subject", () => {
    expect(() => buildRow(2024, q(50, { section: "physmath" }))).toThrow(/Physics or Mathematics/);
  });

  it("refuses a literal backslash-n rather than storing it", () => {
    expect(() => buildRow(2024, q(1, { text: "line one\\nline two" }))).toThrow(/backslash/);
  });
});

describe("validatePaper", () => {
  function paper(): ImatQuestion[] {
    const out: ImatQuestion[] = [];
    let n = 1;
    for (const [section, count] of Object.entries(SECTION_COUNTS)) {
      for (let i = 0; i < count; i++) {
        out.push(
          q(n, {
            section: section as ImatQuestion["section"],
            subject: section === "physmath" ? "Physics" : undefined,
          })
        );
        n++;
      }
    }
    return out;
  }

  it("accepts a full 60-question paper in the official section shape", () => {
    expect(validatePaper(paper())).toEqual([]);
  });

  it("reports a missing question number", () => {
    const p = paper().filter((x) => x.n !== 31);
    expect(validatePaper(p).join(" ")).toMatch(/31/);
  });

  it("reports a section whose count is off", () => {
    const p = paper();
    p[10] = { ...p[10], section: "chemistry" }; // a Biology question filed as Chemistry
    expect(validatePaper(p).join(" ")).toMatch(/biology/i);
  });
});
