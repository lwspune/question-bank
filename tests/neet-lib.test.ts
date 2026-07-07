import { describe, it, expect } from "vitest";
import {
  optionLetter,
  parseAnswer,
  normalizeQuestions,
  buildRecords,
  validateRows,
  findLatexImbalance,
  type NQ,
} from "../scripts/neet/lib";
import { allowedSubjectsForNumber } from "../scripts/neet/config";

describe("optionLetter", () => {
  it("maps printed option numbers 1-4 to A-D", () => {
    expect(optionLetter(1)).toBe("A");
    expect(optionLetter(2)).toBe("B");
    expect(optionLetter(3)).toBe("C");
    expect(optionLetter(4)).toBe("D");
  });
  it("throws for out-of-range indices", () => {
    expect(() => optionLetter(0)).toThrow();
    expect(() => optionLetter(5)).toThrow();
  });
});

describe("parseAnswer", () => {
  it("parses the booklet 'Answer (N)' / 'Ans. (N)' forms to a letter", () => {
    expect(parseAnswer("Answer (2)")).toBe("B");
    expect(parseAnswer("Ans. (3)")).toBe("C");
    expect(parseAnswer("Answer(4)")).toBe("D");
    expect(parseAnswer("(1)")).toBe("A");
  });
  it("parses a bare number", () => {
    expect(parseAnswer(2)).toBe("B");
    expect(parseAnswer("4")).toBe("D");
  });
  it("passes through a letter (any case)", () => {
    expect(parseAnswer("B")).toBe("B");
    expect(parseAnswer("d")).toBe("D");
  });
  it("returns empty string for unparseable input", () => {
    expect(parseAnswer("")).toBe("");
    expect(parseAnswer("both 1 and 2")).toBe("");
    expect(parseAnswer("5")).toBe("");
  });
});

describe("findLatexImbalance", () => {
  it("returns null for balanced inline math", () => {
    expect(findLatexImbalance("energy \\(E = mc^2\\) is conserved")).toBeNull();
  });
  it("flags an unbalanced delimiter", () => {
    expect(findLatexImbalance("\\(E = mc^2")).toMatch(/unbalanced/);
  });
});

const baseQ = (over: Partial<NQ> = {}): NQ => ({
  number: 1,
  subject: "Physics",
  chapter: "Laws of Motion",
  subtopic: "Friction on Inclined Plane",
  stem: "A body slides down a rough incline. The coefficient of friction is close to",
  options: ["0.25", "0.40", "0.5", "0.75"],
  answer: "Answer (4)",
  solution: "\\(t_{rough} = 2 t_{smooth}\\) gives \\(\\mu = 0.75\\).",
  difficulty: "MODERATE",
  confidence: "HIGH",
  ...over,
});

describe("normalizeQuestions", () => {
  it("coerces an options object into an ordered array (1..4 keys)", () => {
    const [q] = normalizeQuestions([
      { ...baseQ(), options: { "1": "0.25", "2": "0.40", "3": "0.5", "4": "0.75" } },
    ]);
    expect(q.options).toEqual(["0.25", "0.40", "0.5", "0.75"]);
  });
  it("normalizes difficulty synonyms/casing to the enum", () => {
    expect(normalizeQuestions([baseQ({ difficulty: "medium" })])[0].difficulty).toBe("MODERATE");
    expect(normalizeQuestions([baseQ({ difficulty: "easy" })])[0].difficulty).toBe("EASY");
    expect(normalizeQuestions([baseQ({ difficulty: "" })])[0].difficulty).toBe("MODERATE");
  });
  it("normalizes the answer to a letter", () => {
    expect(normalizeQuestions([baseQ({ answer: 2 })])[0].answer).toBe("B");
    expect(normalizeQuestions([baseQ({ answer: "Answer (3)" })])[0].answer).toBe("C");
    expect(normalizeQuestions([baseQ({ answer: "d" })])[0].answer).toBe("D");
  });
});

describe("allowedSubjectsForNumber", () => {
  it("uses the 45-per-subject blocks for the 180-question format (default)", () => {
    expect(allowedSubjectsForNumber(45)).toEqual(["Physics"]);
    expect(allowedSubjectsForNumber(46)).toEqual(["Chemistry"]);
    expect(allowedSubjectsForNumber(90)).toEqual(["Chemistry"]);
    expect(allowedSubjectsForNumber(91)).toEqual(["Botany", "Zoology"]);
    expect(allowedSubjectsForNumber(180)).toEqual(["Botany", "Zoology"]);
    expect(allowedSubjectsForNumber(181)).toEqual([]);
  });
  it("uses the 50-per-subject blocks for the 200-question format (pre-2025 NEET)", () => {
    expect(allowedSubjectsForNumber(50, 200)).toEqual(["Physics"]);
    expect(allowedSubjectsForNumber(46, 200)).toEqual(["Physics"]); // 46 is Physics in 200-format
    expect(allowedSubjectsForNumber(51, 200)).toEqual(["Chemistry"]);
    expect(allowedSubjectsForNumber(100, 200)).toEqual(["Chemistry"]);
    expect(allowedSubjectsForNumber(101, 200)).toEqual(["Botany", "Zoology"]);
    expect(allowedSubjectsForNumber(200, 200)).toEqual(["Botany", "Zoology"]);
    expect(allowedSubjectsForNumber(201, 200)).toEqual([]);
  });
});

describe("buildRecords", () => {
  it("maps a transcribed question onto a RawRow (options positional → A-D)", () => {
    const { rows, flags } = buildRecords(normalizeQuestions([baseQ()]));
    expect(flags).toHaveLength(0);
    const r = rows[0];
    expect(r.subject).toBe("Physics");
    expect(r.chapter).toBe("Laws of Motion");
    expect(r.subtopic).toBe("Friction on Inclined Plane");
    expect(r.optionA).toBe("0.25");
    expect(r.optionD).toBe("0.75");
    expect(r.answer).toBe("D"); // Answer (4) → 4th option → D
    expect(r.difficulty).toBe("MODERATE");
    expect(r.questionNumber).toBe("1");
    expect(r.solution).toContain("0.75");
  });

  it("flags a question whose chapter is not in the subject's catalog", () => {
    const { flags } = buildRecords(normalizeQuestions([baseQ({ chapter: "Astrology" })]));
    expect(flags.some((f) => /not in the Physics catalog/i.test(f.reason))).toBe(true);
  });

  it("flags a question whose subject is not allowed for its number block", () => {
    // Q1 is a Physics-block number, but tagged Chemistry
    const { flags } = buildRecords(
      normalizeQuestions([baseQ({ subject: "Chemistry", chapter: "Structure of Atom" })])
    );
    expect(flags.some((f) => /subject "Chemistry" not allowed/i.test(f.reason))).toBe(true);
  });

  it("allows either Botany or Zoology in the Q91-180 biology block", () => {
    const zo = buildRecords(normalizeQuestions([baseQ({ number: 94, subject: "Zoology", chapter: "Body Fluids and Circulation" })]));
    const bo = buildRecords(normalizeQuestions([baseQ({ number: 91, subject: "Botany", chapter: "Respiration in Plants" })]));
    expect(zo.flags).toHaveLength(0);
    expect(bo.flags).toHaveLength(0);
  });

  it("honors the 200-question block boundaries when questionCount=200", () => {
    // Q51 is Chemistry in the 200-format (would be Botany/Zoology-adjacent under 180)
    const chem = buildRecords(
      normalizeQuestions([baseQ({ number: 51, subject: "Chemistry", chapter: "Structure of Atom" })]),
      200
    );
    expect(chem.flags).toHaveLength(0);
    // Q50 is Physics in 200-format; tagging it Chemistry should flag
    const bad = buildRecords(
      normalizeQuestions([baseQ({ number: 50, subject: "Chemistry", chapter: "Structure of Atom" })]),
      200
    );
    expect(bad.flags.some((f) => /subject "Chemistry" not allowed/i.test(f.reason))).toBe(true);
  });
});

describe("validateRows", () => {
  const rowsFor = (qs: NQ[]) => buildRecords(normalizeQuestions(qs)).rows;

  it("passes a clean single-question set (range 1..1)", () => {
    expect(validateRows(rowsFor([baseQ()]), 1, 1)).toEqual([]);
  });

  it("reports a missing question number", () => {
    const errs = validateRows(rowsFor([baseQ({ number: 1 })]), 1, 2);
    expect(errs.some((e) => /missing Q2/.test(e))).toBe(true);
  });

  it("reports a blank option", () => {
    const errs = validateRows(rowsFor([baseQ({ options: ["0.25", "", "0.5", "0.75"] })]), 1, 1);
    expect(errs.some((e) => /blank option/.test(e))).toBe(true);
  });

  it("reports the wrong number of options", () => {
    const errs = validateRows(rowsFor([baseQ({ options: ["a", "b", "c"] })]), 1, 1);
    expect(errs.some((e) => /needs exactly 4 options|blank option/.test(e))).toBe(true);
  });

  it("reports an unparseable answer", () => {
    const errs = validateRows(rowsFor([baseQ({ answer: "both 1 and 2" })]), 1, 1);
    expect(errs.some((e) => /bad answer/.test(e))).toBe(true);
  });

  it("reports a latex imbalance in the stem", () => {
    const errs = validateRows(rowsFor([baseQ({ stem: "compute \\(x^2 for the body" })]), 1, 1);
    expect(errs.some((e) => /unbalanced/.test(e))).toBe(true);
  });

  it("detects a content_hash collision between two identical questions", () => {
    const errs = validateRows(rowsFor([baseQ({ number: 1 }), baseQ({ number: 2 })]), 1, 2);
    expect(errs.some((e) => /collision/.test(e))).toBe(true);
  });
});
