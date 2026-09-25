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
