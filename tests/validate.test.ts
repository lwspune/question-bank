import { describe, it, expect } from "vitest";
import { validateRow, type RawRow } from "@/lib/upload/validate";

const baseRow: RawRow = {
  sourceRow: 2,
  subject: "Physics",
  chapter: "Optics",
  subtopic: "Lens Formula",
  context: undefined,
  question: "What is the focal length?",
  optionA: "5cm",
  optionB: "10cm",
  optionC: "15cm",
  optionD: "20cm",
  answer: "B",
  difficulty: "Moderate",
  solution: "Some explanation",
};

describe("validateRow", () => {
  it("accepts a fully valid row and produces parsed payload", () => {
    const result = validateRow(baseRow);
    expect(result.errors).toEqual([]);
    expect(result.parsed).toBeDefined();
    expect(result.parsed!.difficulty).toBe("MODERATE");
    expect(result.parsed!.options).toHaveLength(4);
    const correct = result.parsed!.options.find((o) => o.isCorrect);
    expect(correct?.label).toBe("B");
    expect(result.parsed!.contentHash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("treats subtopic as optional", () => {
    const result = validateRow({ ...baseRow, subtopic: undefined });
    expect(result.errors).toEqual([]);
    expect(result.parsed!.subtopicName).toBeUndefined();
  });

  it("rejects an empty question", () => {
    const result = validateRow({ ...baseRow, question: "" });
    expect(result.errors.some((e) => /question/i.test(e))).toBe(true);
    expect(result.parsed).toBeUndefined();
  });

  it("rejects an unknown difficulty", () => {
    const result = validateRow({ ...baseRow, difficulty: "extreme" });
    expect(result.errors.some((e) => /difficulty/i.test(e))).toBe(true);
  });

  it("accepts mixed-case difficulty", () => {
    const result = validateRow({ ...baseRow, difficulty: "HARD" });
    expect(result.errors).toEqual([]);
    expect(result.parsed!.difficulty).toBe("HARD");
  });

  it("rejects an answer outside A-D", () => {
    const result = validateRow({ ...baseRow, answer: "E" });
    expect(result.errors.some((e) => /answer/i.test(e))).toBe(true);
  });

  it("rejects when an option is missing", () => {
    const result = validateRow({ ...baseRow, optionC: "" });
    expect(result.errors.some((e) => /option.*c/i.test(e))).toBe(true);
  });

  it("rejects missing subject and chapter", () => {
    const result = validateRow({
      ...baseRow,
      subject: "",
      chapter: "",
    });
    expect(result.errors.some((e) => /subject/i.test(e))).toBe(true);
    expect(result.errors.some((e) => /chapter/i.test(e))).toBe(true);
  });
});

describe("validateRow — officially cancelled questions (migration 0119)", () => {
  const note = "Cancelled by MPSC in the final answer key. No option is correct.";

  it("accepts CANCELLED with a notice: no option is correct, and the notice is carried", () => {
    const r = validateRow({ ...baseRow, answer: "CANCELLED", cancelledNote: note });
    expect(r.errors).toEqual([]);
    expect(r.parsed!.options.some((o) => o.isCorrect)).toBe(false);
    expect(r.parsed!.cancelledNote).toBe(note);
  });

  it("hashes a cancelled question apart from every keyed version of it", () => {
    const cancelled = validateRow({ ...baseRow, answer: "CANCELLED", cancelledNote: note }).parsed!.contentHash;
    for (const answer of ["A", "B", "C", "D"]) {
      expect(validateRow({ ...baseRow, answer }).parsed!.contentHash).not.toBe(cancelled);
    }
  });

  it("refuses CANCELLED without a notice — a question with no key must say why", () => {
    expect(validateRow({ ...baseRow, answer: "CANCELLED" }).errors).toEqual([
      "A CANCELLED question needs a cancelledNote explaining it",
    ]);
  });

  it("refuses a notice on a question that still has a key", () => {
    expect(validateRow({ ...baseRow, answer: "B", cancelledNote: note }).errors).toEqual([
      "cancelledNote is only allowed with Answer = CANCELLED",
    ]);
  });
});

describe("validateRow — multiple-select questions (migration 0214)", () => {
  const msq: RawRow = { ...baseRow, questionFormat: "msq", answer: "A, C" };

  it("marks every listed letter correct and stores the format", () => {
    const r = validateRow(msq);
    expect(r.errors).toEqual([]);
    expect(r.parsed!.questionFormat).toBe("msq");
    expect(r.parsed!.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["A", "C"]);
  });

  it("reads the letters in any order and separator, and allows a single correct option", () => {
    expect(validateRow({ ...msq, answer: "c a" }).parsed!.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["A", "C"]);
    expect(validateRow({ ...msq, answer: "D" }).parsed!.options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["D"]);
    expect(validateRow({ ...msq, answer: "A,B,C,D" }).errors).toEqual([]);
  });

  it("hashes with the order-free MSQ hash", async () => {
    const { msqContentHash } = await import("@/lib/upload/hash");
    expect(validateRow(msq).parsed!.contentHash).toBe(
      msqContentHash(msq.question, [msq.optionA, msq.optionB, msq.optionC, msq.optionD], ["A", "C"]),
    );
  });

  it("refuses an empty set, a letter outside A-D and a repeated letter", () => {
    expect(validateRow({ ...msq, answer: "," }).errors).toEqual(['Answer must list one or more of A/B/C/D (got ",")']);
    expect(validateRow({ ...msq, answer: "A,E" }).errors).toEqual(['Answer must list one or more of A/B/C/D (got "A,E")']);
    expect(validateRow({ ...msq, answer: "A,A" }).errors).toEqual(['Answer lists a letter twice (got "A,A")']);
  });

  it("can be cancelled like an MCQ (IIT Bombay gave full marks)", () => {
    const r = validateRow({ ...msq, answer: "CANCELLED", cancelledNote: "Full marks to all." });
    expect(r.errors).toEqual([]);
    expect(r.parsed!.options.every((o) => !o.isCorrect)).toBe(true);
    expect(r.parsed!.questionFormat).toBe("msq");
  });

  it("leaves a plain MCQ exactly as before (no format written)", () => {
    expect(validateRow(baseRow).parsed!.questionFormat).toBeUndefined();
  });
});
