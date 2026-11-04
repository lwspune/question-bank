import { describe, expect, it } from "vitest";
import { formatKey, formatNumericKey } from "@/lib/questions/formatKey";

const opts = (correct: string[]) => ["A", "B", "C", "D"].map((label) => ({ label, isCorrect: correct.includes(label) }));

describe("formatKey: the answer as every display prints it", () => {
  it("prints an MCQ's one letter", () => {
    expect(formatKey({ questionFormat: "mcq", options: opts(["B"]) })).toBe("B");
    expect(formatKey({ questionFormat: null, options: opts(["D"]) })).toBe("D");
  });

  it("prints every correct letter of a multiple-select question, in order", () => {
    expect(formatKey({ questionFormat: "msq", options: opts(["C", "A"]) })).toBe("A, C");
    expect(formatKey({ questionFormat: "msq", options: opts(["D"]) })).toBe("D");
  });

  it("lowercases in brackets for the printed papers", () => {
    expect(formatKey({ questionFormat: "msq", options: opts(["A", "C"]) }, { style: "paper" })).toBe("(a), (c)");
    expect(formatKey({ questionFormat: "mcq", options: opts(["B"]) }, { style: "paper" })).toBe("(b)");
  });

  it("prints a numeric answer, and a range as from-to", () => {
    expect(formatKey({ questionFormat: "numeric", options: [], numericAnswer: 12 })).toBe("12");
    expect(formatKey({ questionFormat: "numeric", options: [], numericAnswer: 132.8, numericAnswerMax: 133.1 })).toBe("132.8 to 133.1");
  });

  it("returns null when there is no key to print, never a guessed one", () => {
    expect(formatKey({ questionFormat: "mcq", options: opts([]) })).toBeNull();
    expect(formatKey({ questionFormat: "numeric", options: [], numericAnswer: null })).toBeNull();
    expect(formatKey({ questionFormat: "subjective", options: [] })).toBeNull();
  });
});

describe("formatNumericKey", () => {
  it("treats a max equal to the value, or absent, as exact", () => {
    expect(formatNumericKey(5, 5)).toBe("5");
    expect(formatNumericKey(5, null)).toBe("5");
    expect(formatNumericKey(null, null)).toBeNull();
  });
});
