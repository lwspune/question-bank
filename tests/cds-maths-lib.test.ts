import { describe, expect, it } from "vitest";
import {
  buildRecords,
  crosstab,
  findLatexImbalance,
  mergeBands,
  normalizeQuestions,
  validateCatalog,
  validateRows,
  validateSets,
  type Band,
  type Derivation,
  type TQ,
} from "../scripts/cds-maths/lib";

const q = (over: Partial<TQ> = {}): TQ => ({
  number: 1,
  stem: "What is 2 + 2 ?",
  options: [
    { label: "A", text: "3" },
    { label: "B", text: "4" },
    { label: "C", text: "5" },
    { label: "D", text: "6" },
  ],
  chapter: "Number System",
  subtopic: "Digits and Place Value",
  difficulty: "EASY",
  ...over,
});

const band = (name: string, questions: TQ[]): Band => ({
  band: name,
  pages: [0],
  bandReport: { numbersFound: questions.map((x) => x.number), firstComplete: true, lastComplete: true, notes: "" },
  questions,
});

const CAT = {
  "Number System": ["Digits and Place Value", "Unit Digit and Powers"],
  Circles: ["Tangents and Secants"],
};

describe("normalizeQuestions", () => {
  it("accepts object-form options and labels them", () => {
    const [out] = normalizeQuestions([{ ...q(), options: { a: "3", b: "4", c: "5", d: "6" } }]);
    expect(out.options).toEqual([
      { label: "A", text: "3" },
      { label: "B", text: "4" },
      { label: "C", text: "5" },
      { label: "D", text: "6" },
    ]);
  });

  it("maps difficulty synonyms and defaults the unrecognised to MODERATE", () => {
    expect(normalizeQuestions([{ ...q(), difficulty: "medium" }])[0].difficulty).toBe("MODERATE");
    expect(normalizeQuestions([{ ...q(), difficulty: "hard" }])[0].difficulty).toBe("HARD");
    expect(normalizeQuestions([{ ...q(), difficulty: "spicy" }])[0].difficulty).toBe("MODERATE");
  });
});

describe("findLatexImbalance", () => {
  it("passes balanced delimiters and names an imbalance", () => {
    expect(findLatexImbalance("the value \\(x^2\\) is")).toBeNull();
    expect(findLatexImbalance("the value \\(x^2 is")).toMatch(/unbalanced/);
  });
});

describe("mergeBands", () => {
  it("merges an overlapping question when both bands read it identically", () => {
    const { questions, errors } = mergeBands([band("b1", [q()]), band("b2", [q()])]);
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(1);
  });

  it("refuses when two bands disagree on the stem", () => {
    const { errors } = mergeBands([band("b1", [q()]), band("b2", [q({ stem: "What is 2 + 3 ?" })])]);
    expect(errors[0]).toMatch(/bands b1 and b2 disagree/);
  });

  it("refuses when two bands disagree on OPTION ORDER alone", () => {
    const swapped = q({
      options: [
        { label: "A", text: "4" },
        { label: "B", text: "3" },
        { label: "C", text: "5" },
        { label: "D", text: "6" },
      ],
    });
    expect(mergeBands([band("b1", [q()]), band("b2", [swapped])]).errors).toHaveLength(1);
  });

  // DIVERGENCE FROM cds-gs: its fingerprint is stem + options only, so this case
  // passes there. A Directions block is shared stimulus two bands can both
  // legitimately transcribe, and two readings of one data table is exactly the
  // disagreement worth surfacing.
  it("refuses when two bands disagree on CONTEXT alone", () => {
    const a = q({ context: "The table shows sales of 120 units.", setLabel: "S1" });
    const b = q({ context: "The table shows sales of 720 units.", setLabel: "S1" });
    const { errors } = mergeBands([band("b1", [a]), band("b2", [b])]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/disagree/);
  });

  it("returns questions sorted by number regardless of band order", () => {
    const { questions } = mergeBands([band("b2", [q({ number: 9 })]), band("b1", [q({ number: 2 })])]);
    expect(questions.map((x) => x.number)).toEqual([2, 9]);
  });
});

describe("validateCatalog", () => {
  it("hard-errors an unknown chapter", () => {
    const { errors } = validateCatalog([q({ chapter: "Time and Work" })], CAT);
    expect(errors[0]).toMatch(/unknown chapter "Time and Work"/);
  });

  it("soft-warns an unlisted subtopic but does not error", () => {
    const { errors, warnings } = validateCatalog([q({ subtopic: "Nowhere" })], CAT);
    expect(errors).toEqual([]);
    expect(warnings[0]).toMatch(/subtopic "Nowhere" is not listed/);
  });

  it("accepts a listed chapter and subtopic", () => {
    const { errors, warnings } = validateCatalog([q()], CAT);
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  // A subtopic that is valid under a DIFFERENT chapter must not pass: validating
  // against the union of every chapter's subtopics waves a mis-filed row through.
  it("rejects a subtopic borrowed from another chapter", () => {
    const { warnings } = validateCatalog([q({ chapter: "Circles", subtopic: "Unit Digit and Powers" })], CAT);
    expect(warnings).toHaveLength(1);
  });
});

describe("crosstab", () => {
  const d = (over: Partial<Derivation> = {}): Derivation => ({
    number: 1,
    answer: "B",
    value: "4",
    confidence: "HIGH",
    reasoning: "two plus two",
    ...over,
  });

  it("AGREEs when both passes name the same letter", () => {
    expect(crosstab([d()], [d()], [q()])[0].verdict).toBe("AGREE");
  });

  it("DISPUTEs when the letters differ and the option texts differ", () => {
    expect(crosstab([d()], [d({ answer: "C" })], [q()])[0].verdict).toBe("DISPUTE");
  });

  it("calls a TWIN when the two letters carry the same option text", () => {
    const twin = q({
      options: [
        { label: "A", text: "3" },
        { label: "B", text: "4" },
        { label: "C", text: "4" },
        { label: "D", text: "6" },
      ],
    });
    const row = crosstab([d()], [d({ answer: "C" })], [twin])[0];
    expect(row.verdict).toBe("TWIN");
    expect(row.note).toMatch(/repair the option, not the answer/);
  });

  it("MISSING names which pass failed to derive", () => {
    const row = crosstab([], [d()], [q()])[0];
    expect(row.verdict).toBe("MISSING");
    expect(row.note).toMatch(/pass A/);
  });
});

describe("buildRecords", () => {
  const d: Derivation = { number: 1, answer: "b", value: "4", confidence: "high", reasoning: "sum" };

  it("carries context and setLabel onto the row and upper-cases the answer", () => {
    const [row] = buildRecords([q({ context: "Study the table.", setLabel: "S1" })], [d]);
    expect(row.context).toBe("Study the table.");
    expect(row.setLabel).toBe("S1");
    expect(row.answer).toBe("B");
    expect(row.subject).toBe("Mathematics");
  });

  it("omits context and setLabel entirely when the question is standalone", () => {
    const [row] = buildRecords([q()], [d]);
    expect("context" in row).toBe(false);
    expect("setLabel" in row).toBe(false);
  });

  it("DROPS a question nobody derived rather than inventing an answer", () => {
    expect(buildRecords([q(), q({ number: 2 })], [d])).toHaveLength(1);
  });

  it("states reconciliation and the prep-house key in the provenance bracket", () => {
    const [plain] = buildRecords([q()], [d]);
    expect(plain.solution).toMatch(/blind derivations agreed/);
    expect(plain.solution).not.toMatch(/prep-house/);

    const [keyed] = buildRecords([q()], [d], { reconciled: new Set([1]), keyed: true });
    expect(keyed.solution).toMatch(/reconciled by hand/);
    expect(keyed.solution).toMatch(/prep-house answer key/);
  });
});

describe("validateRows", () => {
  const row = (over: Record<string, unknown> = {}) => ({
    sourceRow: 1,
    questionNumber: "1",
    subject: "Mathematics",
    chapter: "Number System",
    question: "What is 2 + 2 ?",
    optionA: "3",
    optionB: "4",
    optionC: "5",
    optionD: "6",
    answer: "B",
    difficulty: "EASY",
    ...over,
  });

  it("reports a gap in the question numbering", () => {
    expect(validateRows([row()], 1, 2)).toContain("missing Q2");
  });

  it("reports a blank option and a bad answer letter", () => {
    const errs = validateRows([row({ optionC: "  ", answer: "E" })], 1, 1);
    expect(errs.some((e) => /blank option/.test(e))).toBe(true);
    expect(errs.some((e) => /bad answer "E"/.test(e))).toBe(true);
  });

  it("reports duplicate option text, naming both letters", () => {
    const errs = validateRows([row({ optionC: "4" })], 1, 1);
    expect(errs.some((e) => /duplicate option text at B and C/.test(e))).toBe(true);
  });

  it("checks LaTeX balance in the CONTEXT field, not just the stem", () => {
    const errs = validateRows([row({ context: "Given \\(x^2 for the next two items." })], 1, 1);
    expect(errs.some((e) => /context: unbalanced/.test(e))).toBe(true);
  });

  it("reports a pipe table with no separator row", () => {
    const errs = validateRows([row({ context: "| Year | Sales |\n| 2011 | 13 |" })], 1, 1);
    expect(errs.some((e) => /no \|---\|---\| separator/.test(e))).toBe(true);
  });

  it("accepts a well-formed pipe table", () => {
    const errs = validateRows([row({ context: "| Year | Sales |\n|---|---|\n| 2011 | 13 |" })], 1, 1);
    expect(errs).toEqual([]);
  });

  it("catches a content_hash collision between two set members", () => {
    const errs = validateRows(
      [
        row({ context: "Chart I" }),
        row({ sourceRow: 2, questionNumber: "2", context: "Chart II" }),
      ],
      1,
      2
    );
    expect(errs.some((e) => /collision with Q1/.test(e))).toBe(true);
  });
});

describe("validateSets", () => {
  const member = (n: number, over: Partial<TQ> = {}) =>
    q({ number: n, setLabel: "S1", context: "Study the pie chart.", ...over });

  it("accepts a contiguous set sharing one context", () => {
    expect(validateSets([member(4), member(5), member(6)])).toEqual([]);
  });

  it("rejects a set interrupted by an unrelated question", () => {
    const errs = validateSets([member(4), member(6)]);
    expect(errs[0]).toMatch(/not contiguous/);
  });

  it("rejects members whose context text differs", () => {
    const errs = validateSets([member(4), member(5, { context: "Study the bar chart." })]);
    expect(errs.some((e) => /different context values/.test(e))).toBe(true);
  });

  it("rejects a set label with no shared stimulus", () => {
    const errs = validateSets([member(4, { context: "" }), member(5, { context: "" })]);
    expect(errs.some((e) => /no context/.test(e))).toBe(true);
  });

  it("ignores standalone questions entirely", () => {
    expect(validateSets([q({ number: 1 }), q({ number: 2 })])).toEqual([]);
  });
});

describe("normalizeQuestions — flags coercion", () => {
  // Iterating a bare string yields one CHARACTER per entry, which produced a
  // 40-line-per-character flag report on the first real merge.
  it("wraps a bare string flag into an array", () => {
    const [out] = normalizeQuestions([{ ...q(), flags: "invented subtopic" }]);
    expect(out.flags).toEqual(["invented subtopic"]);
  });

  it("leaves an array of flags alone and omits the field when absent", () => {
    expect(normalizeQuestions([{ ...q(), flags: ["a", "b"] }])[0].flags).toEqual(["a", "b"]);
    expect("flags" in normalizeQuestions([q()])[0]).toBe(false);
  });
});
