import { describe, it, expect } from "vitest";
import {
  extractAnswerKeyFromText,
  buildRecords,
  normalizeQuestions,
  validateRows,
  type NQ,
} from "../scripts/pariksha/lib";

// A minimal well-formed NQ (single-subject Pariksha question).
function nq(over: Partial<NQ> = {}): NQ {
  return {
    number: 1,
    subject: "Physics",
    chapter: "Mechanical Properties of Fluids",
    subtopic: "Bernoulli",
    stem: "A stem.",
    options: ["a", "b", "c", "d"],
    answer: "A",
    solution: "",
    difficulty: "MODERATE",
    confidence: "HIGH",
    ...over,
  } as NQ;
}

describe("extractAnswerKeyFromText", () => {
  it("pulls one A-D key per question in document (1..N) order", () => {
    const txt = "1 )\nAnswer : D\n2 )\nAnswer : B\n3 )\nAnswer : C\n";
    expect(extractAnswerKeyFromText(txt)).toEqual(["D", "B", "C"]);
  });
  it("tolerates spacing / case variants and ignores non-key text", () => {
    const txt = "Answer:a\nblah\nAnswer :  B\nSection : ZOOLOGY\nanswer : c";
    expect(extractAnswerKeyFromText(txt)).toEqual(["A", "B", "C"]);
  });
  it("returns [] when the file carries no keys (a keyless test)", () => {
    expect(extractAnswerKeyFromText("1 )\n2 )\n3 )\nno keys here")).toEqual([]);
  });
});

describe("buildRecords (Pariksha)", () => {
  it("assembles a RawRow and flags nothing for an in-catalog chapter", () => {
    const { rows, flags } = buildRecords([nq()]);
    expect(flags).toEqual([]);
    expect(rows[0]).toMatchObject({
      questionNumber: "1",
      subject: "Physics",
      chapter: "Mechanical Properties of Fluids",
      optionA: "a",
      optionD: "d",
      answer: "A",
    });
  });
  it("flags a chapter that is not in the subject's NCERT catalog", () => {
    const { flags } = buildRecords([nq({ chapter: "Made Up Chapter" })]);
    expect(flags).toHaveLength(1);
    expect(flags[0].reason).toMatch(/not in the Physics catalog/);
  });
  it("flags an unknown subject", () => {
    const { flags } = buildRecords([nq({ subject: "Maths" as NQ["subject"] })]);
    expect(flags[0].reason).toMatch(/unknown subject/);
  });
  it("does NOT apply the NEET 4-block subject cross-check (a Physics Q46 is fine)", () => {
    // In NEET, Q46 must be Chemistry; a Pariksha single-subject test has no such rule.
    const { flags } = buildRecords([nq({ number: 46, subject: "Physics" })]);
    expect(flags).toEqual([]);
  });
});

describe("validateRows (reused) still catches structural defects", () => {
  it("flags a bad answer + a blank option", () => {
    const { rows } = buildRecords([nq({ answer: "X", options: ["a", "", "c", "d"] })]);
    const errs = validateRows(rows, 0, 0); // 0,0 = skip 1..N coverage
    expect(errs.some((e) => /bad answer/.test(e))).toBe(true);
    expect(errs.some((e) => /blank option/.test(e))).toBe(true);
  });
  it("normalizeQuestions self-heals difficulty + object-form options before build", () => {
    const [q] = normalizeQuestions([
      { number: 1, subject: "Physics", chapter: "Gravitation", subtopic: "x", stem: "s", options: { "1": "a", "2": "b", "3": "c", "4": "d" }, answer: 3, difficulty: "medium", confidence: "HIGH" },
    ]);
    expect(q.options).toEqual(["a", "b", "c", "d"]);
    expect(q.answer).toBe("C");
    expect(q.difficulty).toBe("MODERATE");
  });
});
