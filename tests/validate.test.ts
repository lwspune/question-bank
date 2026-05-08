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
