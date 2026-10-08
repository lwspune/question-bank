import { describe, it, expect } from "vitest";
import {
  shuffleOrder,
  buildRow,
  validatePaper,
  keyModeFor,
  MUR_SHAPE,
  PAPER_SHAPES,
  type ImatQuestion,
  type ShapeBlock,
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
  function paper(shape: readonly ShapeBlock[]): ImatQuestion[] {
    const out: ImatQuestion[] = [];
    let n = 1;
    for (const block of shape) {
      for (let i = 0; i < block.count; i++) {
        const section = block.sections[i % block.sections.length];
        out.push(q(n, { section, subject: section === "physmath" ? "Physics" : undefined }));
        n++;
      }
    }
    return out;
  }

  it("accepts a full ministry paper in the official 4/5/23/15/13 shape", () => {
    expect(validatePaper(2024, paper(MUR_SHAPE))).toEqual([]);
  });

  it("reports a missing question number", () => {
    const p = paper(MUR_SHAPE).filter((x) => x.n !== 31);
    expect(validatePaper(2024, p).join(" ")).toMatch(/31/);
  });

  it("reports a question filed in the wrong block", () => {
    const p = paper(MUR_SHAPE);
    p[10] = { ...p[10], section: "chemistry" }; // Q11 sits in the Biology block
    expect(validatePaper(2024, p).join(" ")).toMatch(/Q11/);
  });

  it("refuses a year whose shape has not been confirmed", () => {
    expect(validatePaper(1999, paper(MUR_SHAPE)).join(" ")).toMatch(/no confirmed shape/);
  });

  it("takes a Cambridge shape whose first block mixes reading and logic", () => {
    const shape: ShapeBlock[] = [
      { sections: ["reading", "logic"], count: 22 },
      { sections: ["biology"], count: 18 },
      { sections: ["chemistry"], count: 12 },
      { sections: ["physmath"], count: 8 },
    ];
    expect(validatePaper(2016, paper(shape), shape)).toEqual([]);
    const wrong = paper(shape);
    wrong[0] = { ...wrong[0], section: "biology" };
    expect(validatePaper(2016, wrong, shape).join(" ")).toMatch(/Q1/);
  });

  it("knows 2022's own shape: 20 general knowledge and logic, 15 biology, 15 chemistry, 10 physics and maths", () => {
    expect(PAPER_SHAPES[2022].map((b) => b.count)).toEqual([20, 15, 15, 10]);
    expect(validatePaper(2022, paper(PAPER_SHAPES[2022]))).toEqual([]);
  });
});

describe("keyModeFor", () => {
  it("is printed-A for the ministry's papers and the printed key for Cambridge's", () => {
    expect(keyModeFor(2023)).toBe("printed-a");
    expect(keyModeFor(2026)).toBe("printed-a");
    expect(keyModeFor(2020)).toBe("printed-key");
    expect(keyModeFor(2011)).toBe("printed-key");
  });

  it("treats 2021 and 2022 as printed-A: their copies put the answer at A, confirmed question by question", () => {
    expect(keyModeFor(2021)).toBe("printed-a");
    expect(keyModeFor(2022)).toBe("printed-a");
  });

  it("knows 2021's shape is the usual Cambridge 22/18/12/8", () => {
    expect(PAPER_SHAPES[2021].map((b) => b.count)).toEqual([22, 18, 12, 8]);
  });

  it("knows 2011's shape: 80 questions, 40 general knowledge and logic, 18 biology, 11 chemistry, 11 physics and maths", () => {
    expect(PAPER_SHAPES[2011].map((b) => b.count)).toEqual([40, 18, 11, 11]);
    expect(PAPER_SHAPES[2011][0].sections).toEqual(["reading", "logic"]);
  });

  it("knows 2012's own shape: 80 questions, 40 thinking skills, 18 biology, 11 chemistry, 11 physics and maths", () => {
    expect(PAPER_SHAPES[2012].map((b) => b.count)).toEqual([40, 18, 11, 11]);
    expect(PAPER_SHAPES[2012][0].sections).toEqual(["logic"]);
  });

  it("knows 2013's own shape: 30 thinking skills and general knowledge, 14 biology, 8 chemistry, 8 physics and maths", () => {
    expect(PAPER_SHAPES[2013].map((b) => b.count)).toEqual([30, 14, 8, 8]);
    expect(keyModeFor(2013)).toBe("printed-key");
  });
});

describe("buildRow, Cambridge papers (printed key, printed order)", () => {
  it("marks the keyed option correct and keeps the printed order", () => {
    const row = buildRow(2016, q(12, { answer: "C" }));
    expect(row.options.map((o) => o.text)).toEqual(q(12).options);
    expect(row.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["C"]);
    expect(row.contentHash).toBe(contentHash(row.text, row.options.map((o) => o.text), "C"));
  });

  it("refuses a Cambridge question without its key", () => {
    expect(() => buildRow(2016, q(12))).toThrow(/key/);
  });

  it("refuses a key on a ministry question, where printed A is the key", () => {
    expect(() => buildRow(2024, q(12, { answer: "C" }))).toThrow(/printed A/);
  });

  it("accepts picture options: empty text, one image per option", () => {
    const row = buildRow(2011, q(6, { options: ["", "", "", "", ""], optionImages: true, answer: "D" }));
    expect(row.options.map((o) => o.text)).toEqual(["", "", "", "", ""]);
    expect(row.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["D"]);
  });

  it("still refuses an empty option on a question without picture options", () => {
    expect(() => buildRow(2011, q(6, { options: ["a", "", "c", "d", "e"], answer: "A" }))).toThrow(/empty/);
  });
});
