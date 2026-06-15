import { describe, it, expect } from "vitest";
import {
  und, undFirst, normalizeDirections, findLatexImbalance,
  buildRecords, normalizeQuestions, validateRows, type Section, type TQ,
} from "../scripts/cds/lib";

const sec = (over: Partial<Section> & Pick<Section, "type" | "qFrom" | "qTo" | "setLabel">): Section => ({
  directions: "Directions : do the thing accordingly.", ...over,
});
const q = (over: Partial<TQ> & Pick<TQ, "number" | "stem">): TQ => ({
  options: [{ label: "A", text: "a" }, { label: "B", text: "b" }, { label: "C", text: "c" }, { label: "D", text: "d" }],
  answer: "A", confidence: "HIGH", difficulty: "MODERATE", ...over,
});

describe("primitives", () => {
  it("wraps a word in underline markup", () => {
    expect(und("nadir")).toBe("\\(\\underline{\\text{nadir}}\\)");
  });
  it("underlines only the first whole-word occurrence", () => {
    expect(undFirst("the cat sat on the cat", "cat")).toBe("the \\(\\underline{\\text{cat}}\\) sat on the cat");
  });
  it("does not underline a substring", () => {
    expect(undFirst("category error", "cat")).toBe("category error"); // \b prevents substring
  });
  it("normalizes a Directions prefix to a single canonical form", () => {
    expect(normalizeDirections("Directions : do the thing accordingly.")).toBe("Directions: do the thing accordingly.");
    expect(normalizeDirections("do the thing")).toBe("Directions: do the thing");
  });
  it("flags unbalanced inline-math delimiters", () => {
    expect(findLatexImbalance("\\(\\underline{\\text{x}}\\)")).toBeNull();
    expect(findLatexImbalance("\\(\\underline{\\text{x}}")).toMatch(/unbalanced/);
  });
});

describe("normalizeQuestions", () => {
  it("converts object-form options to an A-D array", () => {
    const [n] = normalizeQuestions([{ number: 1, stem: "x", options: { A: "a", B: "b", C: "c", D: "d" }, answer: "A", confidence: "HIGH", difficulty: "MODERATE" }]);
    expect(Array.isArray(n.options)).toBe(true);
    expect(n.options).toEqual([{ label: "A", text: "a" }, { label: "B", text: "b" }, { label: "C", text: "c" }, { label: "D", text: "d" }]);
  });
  it("unwraps object-form options whose values are {text}", () => {
    const [n] = normalizeQuestions([{ number: 1, stem: "x", options: { A: { text: "a" }, B: { text: "b" }, C: { text: "c" }, D: { text: "d" } }, answer: "A", confidence: "HIGH", difficulty: "EASY" }]);
    expect(n.options[0]).toEqual({ label: "A", text: "a" });
  });
  it("normalizes difficulty synonyms + casing", () => {
    expect(normalizeQuestions([{ number: 1, stem: "x", options: [], answer: "A", confidence: "HIGH", difficulty: "medium" }])[0].difficulty).toBe("MODERATE");
    expect(normalizeQuestions([{ number: 1, stem: "x", options: [], answer: "A", confidence: "HIGH", difficulty: "hard" }])[0].difficulty).toBe("HARD");
  });
  it("maps a rearrangement ordering-string answer back to its option label", () => {
    const [n] = normalizeQuestions([{ number: 21, stem: "x", answer: "QSPR", confidence: "HIGH", difficulty: "EASY",
      options: [{ label: "A", text: "SPQR" }, { label: "B", text: "QSPR" }, { label: "C", text: "QPSR" }, { label: "D", text: "RQPS" }] }]);
    expect(n.answer).toBe("B");
  });
  it("leaves a well-formed array untouched", () => {
    const opts = [{ label: "A", text: "a" }, { label: "B", text: "b" }, { label: "C", text: "c" }, { label: "D", text: "d" }];
    expect(normalizeQuestions([{ number: 1, stem: "x", options: opts, answer: "A", confidence: "HIGH", difficulty: "HARD" }])[0].options).toEqual(opts);
  });
});

describe("buildRecords", () => {
  it("puts directions in context (not the stem) and groups the section as a set", () => {
    const s = [sec({ type: "synonyms", qFrom: 1, qTo: 2, setLabel: "S1", directions: "Directions : nearest in meaning." })];
    const { rows } = buildRecords(s, [q({ number: 1, stem: "He felt nadir." })], { single: { "1": "nadir" } });
    expect(rows[0].context).toBe("Directions: nearest in meaning.");
    expect(rows[0].setLabel).toBe("S1");
    expect(rows[0].question).toContain("\\(\\underline{\\text{nadir}}\\)");
    expect(rows[0].question).not.toContain("Directions"); // never in the stem
  });

  it("rebuilds an errorParts stem from the 3 labelled parts and keeps options", () => {
    const s = [sec({ type: "spotting-errors", qFrom: 1, qTo: 1, setLabel: "S1" })];
    const eq = q({
      number: 1, stem: "(unused)", answer: "C", subtopic: "Subject-Verb Agreement",
      options: [{ label: "A", text: "The pair of trousers" }, { label: "B", text: "you bought for me" }, { label: "C", text: "do not fit me" }, { label: "D", text: "No error" }],
    });
    const { rows } = buildRecords(s, [eq], {});
    expect(rows[0].question).toBe("\\(\\underline{\\text{The pair of trousers}}\\) \\(\\underline{\\text{you bought for me}}\\) \\(\\underline{\\text{do not fit me}}\\).");
    expect(rows[0].optionA).toBe("The pair of trousers");
    expect(rows[0].subtopic).toBe("Subject-Verb Agreement"); // perQuestionSubtopic honoured
  });

  it("underlines each numbered sentence in a triple (homophone) section", () => {
    const s = [sec({ type: "homophones", qFrom: 1, qTo: 1, setLabel: "S1" })];
    const stem = "crops, corps, corpse\n1. growing GM crops?\n2. The volunteer corps marched.\n3. like a corpse.";
    const { rows } = buildRecords(s, [q({ number: 1, stem })], { triple: { "1": { "1": "crops", "2": "corps", "3": "corpse" } } });
    expect(rows[0].question).toContain("1. growing GM \\(\\underline{\\text{crops}}\\)?");
    expect(rows[0].question).toContain("2. The volunteer \\(\\underline{\\text{corps}}\\) marched.");
    expect(rows[0].question).toMatch(/^crops, corps, corpse/); // header words stay plain
  });

  it("puts the shared passage in context for a passage section, stem stays question-specific", () => {
    const s = [sec({ type: "reading-comprehension", qFrom: 1, qTo: 1, setLabel: "S1", directions: "Read the passage.", passage: "Once upon a time." })];
    const { rows } = buildRecords(s, [q({ number: 1, stem: "What happened?", subtopic: "Literal Comprehension" })], {});
    expect(rows[0].context).toBe("Directions: Read the passage.\n\nPassage\nOnce upon a time.");
    expect(rows[0].question).toBe("What happened?");
  });

  it("keeps an inline-stimulus (match list / S1-S2) in the hash-bearing stem", () => {
    const s = [sec({ type: "match-list", qFrom: 1, qTo: 1, setLabel: "S1" })];
    const stem = "| List I | List II |\n| --- | --- |\n| A. X | 1. y |";
    const { rows } = buildRecords(s, [q({ number: 1, stem })], {});
    expect(rows[0].question).toContain("List I"); // stimulus stays in the stem
    expect(rows[0].context).not.toContain("List I");
  });

  it("flags a question with no covering section", () => {
    const { flags } = buildRecords([sec({ type: "synonyms", qFrom: 1, qTo: 5, setLabel: "S1" })], [q({ number: 9, stem: "x" })], {});
    expect(flags).toHaveLength(1);
    expect(flags[0].number).toBe(9);
  });
});

describe("validateRows", () => {
  const s = [sec({ type: "sentence-relationship", qFrom: 1, qTo: 2, setLabel: "S1" })];

  it("detects a content_hash collision when two generic stems are identical", () => {
    // identical stem + options + answer (the trap fold-into-stem prevents)
    const dupe = (n: number) => q({ number: n, stem: "The second sentence:", answer: "A" });
    const { rows } = buildRecords(s, [dupe(1), dupe(2)], {});
    const errs = validateRows(rows, 1, 2);
    expect(errs.some((e) => /collision/.test(e))).toBe(true);
  });

  it("passes when stems differ (stimulus folded in)", () => {
    const { rows } = buildRecords(s, [
      q({ number: 1, stem: "S1: Delhi is hot.\nS2: Shimla is cold.", answer: "B" }),
      q({ number: 2, stem: "S1: Bananas have potassium.\nS2: Doctors recommend them.", answer: "C" }),
    ], {});
    expect(validateRows(rows, 1, 2)).toEqual([]);
  });

  it("reports missing coverage", () => {
    const { rows } = buildRecords(s, [q({ number: 1, stem: "a" })], {});
    expect(validateRows(rows, 1, 2)).toContain("missing Q2");
  });
});
