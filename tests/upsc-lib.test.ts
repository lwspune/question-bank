import { hasMethodNote } from "@/lib/questions/methodNotes";
import { describe, it, expect } from "vitest";
import {
  normalizeQuestions,
  mergeBands,
  validateCatalog,
  crosstab,
  buildRecords,
  buildWithdrawnRecords,
  validateRows,
  findLonelyContexts,
  assignSetLabels,
  findLatexImbalance,
  englishPagesFor,
  stripRunnerUp,
  type Band,
  type TQ,
  type Derivation,
} from "../scripts/upsc/lib";
import { subjectsFor, type Catalog } from "../scripts/upsc/config";

const CATALOG: Catalog = {
  "Polity and Governance": {
    "The Union Executive": ["The President of India", "The Council of Ministers"],
    "The Judiciary": ["Constitutional Remedies"],
  },
  History: {
    "Ancient India": ["Maurya Empire"],
  },
  "Basic Numeracy": {
    "Number System": ["Divisibility and Remainders"],
  },
  Comprehension: {
    "Reading Comprehension": ["Central Idea and Best Reflection"],
  },
};

const q = (over: Partial<TQ> = {}): TQ => ({
  number: 1,
  stem: "Who among the following appoints the Chief Justice of India?",
  options: [
    { label: "A", text: "The President" },
    { label: "B", text: "The Prime Minister" },
    { label: "C", text: "The Law Minister" },
    { label: "D", text: "The Collegium" },
  ],
  subject: "Polity and Governance",
  chapter: "The Union Executive",
  subtopic: "The President of India",
  difficulty: "MODERATE",
  ...over,
});

const d = (over: Partial<Derivation> = {}): Derivation => ({
  number: 1,
  answer: "A",
  value: "The President",
  confidence: "HIGH",
  reasoning: "Article 124 vests the appointment in the President.",
  ...over,
});

const band = (over: Partial<Band> = {}): Band => ({
  band: "b1",
  pages: [1, 2],
  bandReport: { numbersFound: [1], firstComplete: true, lastComplete: true, notes: "" },
  questions: [q()],
  ...over,
});

describe("englishPagesFor", () => {
  it("returns even 0-based indices from 2 for a raw bilingual booklet", () => {
    expect(englishPagesFor({ kind: "bilingual", pageCount: 48, lastContentIndex: 42 })).toEqual([
      2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42,
    ]);
  });

  it("returns consecutive indices after the cover for a Hindi-stripped extract", () => {
    expect(englishPagesFor({ kind: "extract", pageCount: 22, lastContentIndex: 21 })).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    ]);
  });

  it("refuses a lastContentIndex outside the document", () => {
    expect(() => englishPagesFor({ kind: "extract", pageCount: 22, lastContentIndex: 22 })).toThrow(
      /outside/i
    );
  });

  it("refuses an odd lastContentIndex on a bilingual booklet — English is even", () => {
    expect(() => englishPagesFor({ kind: "bilingual", pageCount: 48, lastContentIndex: 43 })).toThrow(
      /even/i
    );
  });
});

describe("subjectsFor", () => {
  it("partitions the real catalog into nine Paper-I and five Paper-II subjects", () => {
    expect(subjectsFor(1)).toHaveLength(9);
    expect(subjectsFor(2)).toHaveLength(5);
  });

  it("never puts a CSAT subject in Paper I or a GS subject in Paper II", () => {
    expect(subjectsFor(1)).not.toContain("Basic Numeracy");
    expect(subjectsFor(2)).not.toContain("Polity and Governance");
  });
});

describe("normalizeQuestions", () => {
  it("converts object-form options into a labelled array", () => {
    const [out] = normalizeQuestions([{ ...q(), options: { A: "one", B: "two" } }]);
    expect(out.options).toEqual([
      { label: "A", text: "one" },
      { label: "B", text: "two" },
    ]);
  });

  it("normalises difficulty synonyms and casing", () => {
    expect(normalizeQuestions([{ ...q(), difficulty: "medium" }])[0].difficulty).toBe("MODERATE");
    expect(normalizeQuestions([{ ...q(), difficulty: "hard" }])[0].difficulty).toBe("HARD");
  });

  it("defaults an unrecognised difficulty to MODERATE rather than dropping the row", () => {
    expect(normalizeQuestions([{ ...q(), difficulty: "tricky" }])[0].difficulty).toBe("MODERATE");
  });

  it("preserves context verbatim — a shared passage must not be reflowed", () => {
    const ctx = "Passage - 1\n\nMaintaining an ecosystem  just to conserve biodiversity...";
    expect(normalizeQuestions([{ ...q(), context: ctx }])[0].context).toBe(ctx);
  });
});

describe("findLatexImbalance", () => {
  it("accepts balanced delimiters", () => {
    expect(findLatexImbalance("the value \\(x^2\\) is positive")).toBeNull();
  });
  it("reports unbalanced delimiters", () => {
    expect(findLatexImbalance("the value \\(x^2 is positive")).toMatch(/unbalanced/);
  });
});

describe("mergeBands", () => {
  it("dedupes a question two bands both reported, when they agree", () => {
    const { questions, errors } = mergeBands([band(), band({ band: "b2" })]);
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(1);
  });

  it("REFUSES when two bands disagree on the same question", () => {
    const other = band({ band: "b2", questions: [q({ stem: "A different reading" })] });
    const { errors } = mergeBands([band(), other]);
    expect(errors.join(" ")).toMatch(/b1 and b2 disagree/);
  });

  it("REFUSES a disagreement that is only in option ORDER — the mis-slotted-option class", () => {
    const swapped = q({
      options: [
        { label: "A", text: "The Prime Minister" },
        { label: "B", text: "The President" },
        { label: "C", text: "The Law Minister" },
        { label: "D", text: "The Collegium" },
      ],
    });
    const { errors } = mergeBands([band(), band({ band: "b2", questions: [swapped] })]);
    expect(errors.join(" ")).toMatch(/disagree/);
  });

  it("returns questions sorted by number", () => {
    const { questions } = mergeBands([
      band({ band: "b2", questions: [q({ number: 7 })] }),
      band({ band: "b1", questions: [q({ number: 3 })] }),
    ]);
    expect(questions.map((x) => x.number)).toEqual([3, 7]);
  });
});

describe("validateCatalog", () => {
  it("accepts a row whose subject/chapter/subtopic are all in the catalog", () => {
    const { errors, warnings } = validateCatalog([q()], CATALOG, 1);
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it("rejects an unknown subject", () => {
    const { errors } = validateCatalog([q({ subject: "Astrology" })], CATALOG, 1);
    expect(errors.join(" ")).toMatch(/unknown subject/);
  });

  it("rejects a chapter that belongs to a DIFFERENT subject", () => {
    const { errors } = validateCatalog([q({ chapter: "Ancient India" })], CATALOG, 1);
    expect(errors.join(" ")).toMatch(/not a chapter of subject/);
  });

  it("REJECTS a CSAT subject on a Paper I question", () => {
    const bad = q({ subject: "Basic Numeracy", chapter: "Number System", subtopic: undefined });
    const { errors } = validateCatalog([bad], CATALOG, 1);
    expect(errors.join(" ")).toMatch(/Paper I/);
  });

  it("REJECTS a GS subject on a Paper II question", () => {
    const { errors } = validateCatalog([q()], CATALOG, 2);
    expect(errors.join(" ")).toMatch(/Paper II/);
  });

  it("only WARNS on an unlisted subtopic — subtopics auto-create harmlessly", () => {
    const { errors, warnings } = validateCatalog([q({ subtopic: "Something Else" })], CATALOG, 1);
    expect(errors).toEqual([]);
    expect(warnings.join(" ")).toMatch(/subtopic/);
  });

  // Another UPSC exam (CAPF Paper I) mixes GS and CSAT-type subjects in ONE
  // paper, so CSE's Paper I / Paper II split cannot say what is legal there.
  // An explicit list replaces it.
  it("an explicit legal-subject list OVERRIDES the CSE paper split", () => {
    const { errors } = validateCatalog([q()], CATALOG, 2, [q().subject]);
    expect(errors).toEqual([]);
  });

  it("an explicit legal-subject list still REJECTS a subject outside it", () => {
    const { errors } = validateCatalog([q()], CATALOG, 1, ["Basic Numeracy"]);
    expect(errors.join(" ")).toMatch(/not a legal subject/);
  });
});

describe("crosstab", () => {
  it("AGREE when both passes name the same letter", () => {
    expect(crosstab([d()], [d()], [q()])[0].verdict).toBe("AGREE");
  });

  it("DISPUTE when the passes name different letters carrying different text", () => {
    expect(crosstab([d()], [d({ answer: "B" })], [q()])[0].verdict).toBe("DISPUTE");
  });

  it("TWIN when different letters carry the SAME text — repair the option, not the answer", () => {
    const twin = q({
      options: [
        { label: "A", text: "The President" },
        { label: "B", text: "the president" },
        { label: "C", text: "The Law Minister" },
        { label: "D", text: "The Collegium" },
      ],
    });
    const row = crosstab([d()], [d({ answer: "B" })], [twin])[0];
    expect(row.verdict).toBe("TWIN");
    expect(row.note).toMatch(/repair the option/);
  });

  it("MISSING when a pass did not derive the question, naming which", () => {
    const row = crosstab([d()], [], [q()])[0];
    expect(row.verdict).toBe("MISSING");
    expect(row.note).toMatch(/pass B/);
  });
});

describe("buildRecords", () => {
  // No method note on a solution (owner, 2026-11-22): the working alone.
  it("writes the derived answer and the working alone, with no method note", () => {
    const [row] = buildRecords([q()], [d()]);
    expect(row.answer).toBe("A");
    expect(row.solution).toBe(d().reasoning.trim());
    expect(hasMethodNote(row.solution)).toBe(false);
  });

  it("writes no method note when an answer was reconciled by hand either", () => {
    const [row] = buildRecords([q()], [d()], { reconciled: new Set([1]) });
    expect(hasMethodNote(row.solution)).toBe(false);
  });

  it("on a KEYED paper the solution is the working alone (the key supplied the letter)", () => {
    const [row] = buildRecords([q()], [d()], { keyed: true });
    expect(row.solution).toBe("Article 124 vests the appointment in the President.");
    expect(row.solution).not.toMatch(/no official key/);
  });

  it("DROPS a question nobody derived rather than inventing an answer", () => {
    expect(buildRecords([q(), q({ number: 2 })], [d()])).toHaveLength(1);
  });

  it("carries a shared passage through to context", () => {
    const [row] = buildRecords([q({ context: "Passage - 1\n\nSome text." })], [d()]);
    expect(row.context).toBe("Passage - 1\n\nSome text.");
  });
});

describe("validateRows", () => {
  const rows = (qs: TQ[], ds: Derivation[]) => buildRecords(qs, ds);

  it("passes a clean single-question paper", () => {
    expect(validateRows(rows([q()], [d()]), 1, 1)).toEqual([]);
  });

  it("reports a missing question number — the coverage gate", () => {
    expect(validateRows(rows([q()], [d()]), 1, 3).join(" ")).toMatch(/missing Q2.*missing Q3/);
  });

  it("refuses a solution that still carries a runner-up aside (solver voice)", () => {
    const voiced = rows([q()], [d({ reasoning: "Article 124 decides it. Runner-up: B, if read loosely." })]);
    expect(validateRows(voiced, 1, 1).join(" ")).toMatch(/Q1 solution: runner-up aside/);
  });

  it("refuses the overruled-derivation marker: a solution must argue for the official answer", () => {
    const marked = rows(
      [q()],
      [d({ reasoning: "D fits. [Answer corrected to A from the official UPSC answer key; an independent blind derivation had reached D. The reasoning above argues for D and is retained so the disagreement is visible rather than hidden.]" })]
    );
    expect(validateRows(marked, 1, 1).join(" ")).toMatch(/Q1 solution: argues for a letter the key overruled/);
  });

  it("allows the aside where UPSC's key overruled the derivation (it argues for the key)", () => {
    const corrected = rows(
      [q()],
      [d({ reasoning: "D fits. Runner-up: A, the keyed answer. [Answer corrected to A from the official UPSC answer key.]" })]
    );
    expect(validateRows(corrected, 1, 1)).toEqual([]);
  });

  it("reports duplicate option text", () => {
    const dup = q({
      options: [
        { label: "A", text: "The President" },
        { label: "B", text: "The President" },
        { label: "C", text: "x" },
        { label: "D", text: "y" },
      ],
    });
    expect(validateRows(rows([dup], [d()]), 1, 1).join(" ")).toMatch(/duplicate option text at A and B/);
  });

  it("reports a content_hash collision between two questions", () => {
    const twin = q({ number: 2 });
    const out = validateRows(rows([q(), twin], [d(), d({ number: 2 })]), 1, 2);
    expect(out.join(" ")).toMatch(/content_hash collision/);
  });

  it("does NOT let context rescue a collision — the MCQ hash excludes context", () => {
    const a = q({ context: "Passage - 1" });
    const b = q({ number: 2, context: "Passage - 2" });
    const out = validateRows(rows([a, b], [d(), d({ number: 2 })]), 1, 2);
    expect(out.join(" ")).toMatch(/content_hash collision/);
  });

  it("reports unbalanced LaTeX in any long-form field, including context", () => {
    const bad = q({ context: "Given \\(x^2 for all x" });
    expect(validateRows(rows([bad], [d()]), 1, 1).join(" ")).toMatch(/context.*unbalanced/);
  });

  it("reports a pipe table with no separator row", () => {
    const bad = q({ stem: "Consider:\n| A | B |\n| 1 | 2 |" });
    expect(validateRows(rows([bad], [d()]), 1, 1).join(" ")).toMatch(/separator/);
  });


});

describe("assignSetLabels", () => {
  const withCtx = (n: number, ctx?: string, stem = `Q${n}?`) =>
    q({ number: n, stem, ...(ctx ? { context: ctx } : {}) });

  it("groups items that share a passage under one label", () => {
    const p = "Passage - 1\n\nSome text.";
    const out = assignSetLabels([withCtx(1, p), withCtx(2, p)]);
    expect(out[0].setLabel).toBeDefined();
    expect(out[0].setLabel).toBe(out[1].setLabel);
  });

  it("gives two DIFFERENT passages two different labels", () => {
    const out = assignSetLabels([withCtx(1, "Passage A"), withCtx(2, "Passage A"), withCtx(3, "Passage B"), withCtx(4, "Passage B")]);
    expect(out[0].setLabel).toBe(out[1].setLabel);
    expect(out[2].setLabel).toBe(out[3].setLabel);
    expect(out[0].setLabel).not.toBe(out[2].setLabel);
  });

  it("leaves a LONE passage unlabelled — a set of one is not a set", () => {
    expect(assignSetLabels([withCtx(1, "Only mine")])[0].setLabel).toBeUndefined();
  });

  it("leaves a context-less item unlabelled", () => {
    expect(assignSetLabels([withCtx(1)])[0].setLabel).toBeUndefined();
  });

  it("labels by the FIRST item of the group, so the label is stable and readable", () => {
    const p = "Passage - 1";
    const out = assignSetLabels([withCtx(7, p), withCtx(8, p)]);
    expect(out[0].setLabel).toBe("Q7");
  });

  it("ignores whitespace differences when deciding two items share a passage", () => {
    const out = assignSetLabels([withCtx(1, "Passage  one"), withCtx(2, "Passage one")]);
    expect(out[0].setLabel).toBe(out[1].setLabel);
  });

  it("REFUSES a set whose members are not consecutive — groupBySet only collapses a consecutive run", () => {
    const p = "Shared";
    expect(() => assignSetLabels([withCtx(1, p), withCtx(2, "Other"), withCtx(3, p)])).toThrow(/consecutive/i);
  });

  it("is a pure mapping — it does not mutate its input", () => {
    const p = "Passage - 1";
    const input = [withCtx(1, p), withCtx(2, p)];
    assignSetLabels(input);
    expect(input[0].setLabel).toBeUndefined();
  });
});

describe("buildRecords + sets", () => {
  it("carries setLabel through to the row commitStaged consumes", () => {
    const p = "Passage - 1";
    const qs = assignSetLabels([q({ number: 1, context: p }), q({ number: 2, stem: "Other?", context: p })]);
    const rows = buildRecords(qs, [d(), d({ number: 2 })]);
    expect(rows[0].setLabel).toBe("Q1");
    expect(rows[1].setLabel).toBe("Q1");
  });

  it("emits no setLabel for an unset question", () => {
    expect(buildRecords([q()], [d()])[0].setLabel).toBeUndefined();
  });
});

describe("validateRows — Directions preamble in context", () => {
  const rows = (qs: TQ[], ds: Derivation[]) => buildRecords(qs, ds);

  it("REJECTS a context carrying a 'Directions for the following N items' preamble", () => {
    const bad = q({
      context:
        "Directions for the following 2 (two) items :\nRead the following two passages...\n\nPassage - 1\n\nSome prose.",
    });
    expect(validateRows(rows([bad], [d()]), 1, 1).join(" ")).toMatch(/Directions/i);
  });

  it("names the mismatch it causes, so the fix is obvious", () => {
    const bad = q({ context: "Directions for the following 4 (four) items :\nblah\n\nProse." });
    expect(validateRows(rows([bad], [d()]), 1, 1).join(" ")).toMatch(/instruction, not passage/i);
  });

  it("accepts a context that is passage prose only", () => {
    const ok = q({ context: "A single number for inflation is an aggregate across commodities." });
    expect(validateRows(rows([ok], [d()]), 1, 1)).toEqual([]);
  });

  it("does not fire on prose that merely mentions directions", () => {
    const ok = q({ context: "The court issued directions for the following year's budget." });
    expect(validateRows(rows([ok], [d()]), 1, 1)).toEqual([]);
  });
});

describe("buildWithdrawnRecords", () => {
  const q = (number: number): TQ => ({
    number,
    stem: `Stem ${number}`,
    options: ["A", "B", "C", "D"].map((label) => ({ label, text: `${label}${number}` })) as TQ["options"],
    subject: "History",
    chapter: "Modern India",
    subtopic: "Revolt",
    difficulty: "MODERATE",
  });

  it("builds a CANCELLED row, with its note, for each withdrawn item only", () => {
    const rows = buildWithdrawnRecords([q(1), q(2), q(3)], [2], "Withdrawn by UPSC.");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      sourceRow: 2,
      questionNumber: "2",
      question: "Stem 2",
      optionA: "A2",
      optionD: "D2",
      answer: "CANCELLED",
      cancelledNote: "Withdrawn by UPSC.",
      subject: "History",
    });
    expect(rows[0].solution).toBeUndefined();
  });

  it("refuses a withdrawn number the transcription does not hold", () => {
    expect(() => buildWithdrawnRecords([q(1)], [9], "x")).toThrow(/9/);
  });
});

describe("stripRunnerUp", () => {
  it("drops a 'Runner-up:' sentence and keeps the bracket after it", () => {
    const t = "Statement 2 is not correct. Runner-up: C, if the 2005 figure is judged inaccurate. [Answer worked out by PYQ Vault. Checked by hand.]";
    expect(stripRunnerUp(t).text).toBe("Statement 2 is not correct. [Answer worked out by PYQ Vault. Checked by hand.]");
  });

  it("drops the aside to the end of its paragraph (the sentences after it argue for the runner-up)", () => {
    const t = "So A. RUNNER-UP: D. The Commission did also recommend gold; D would win if read so.";
    expect(stripRunnerUp(t).text).toBe("So A.");
  });

  it("keeps the next paragraph after an aside", () => {
    const t = "So A. The runner-up is C. It would win if read loosely.\n\nFinal: A.";
    expect(stripRunnerUp(t).text).toBe("So A.\n\nFinal: A.");
  });

  it("does not split at spaced initials", () => {
    const t = "So B. Runner-up is A (K. P. Krishnan), who headed other committees. [Checked.]";
    expect(stripRunnerUp(t).text).toBe("So B. [Checked.]");
  });

  it("REPORTS a mention woven into working instead of removing it", () => {
    const t = "A is right. Option C is the runner-up and is defensible, but it misses half the passage.";
    const r = stripRunnerUp(t);
    expect(r.text).toBe(t);
    expect(r.removed).toEqual([]);
    expect(r.inline).toEqual(["Option C is the runner-up and is defensible, but it misses half the passage."]);
  });

  it("stops a 'Runner-up' aside at the first sentence that is not about the runner-up", () => {
    const t = "So A. Runner-up: B. It would win if the setter read it loosely. Statement 3 is fine. [x]";
    expect(stripRunnerUp(t).text).toBe("So A. Statement 3 is fine. [x]");
  });

  it("never splits inside a math zone", () => {
    const t = String.raw`Here \(x = 2.5. y\) holds. The runner-up is D, \(3.5. z\). [Done.]`;
    expect(stripRunnerUp(t).text).toBe(String.raw`Here \(x = 2.5. y\) holds. [Done.]`);
  });

  it("drops a whole runner-up paragraph without leaving a doubled break", () => {
    const t = "Para one.\n\nThe runner-up is B. B would win if read so.\n\nPara three.";
    expect(stripRunnerUp(t).text).toBe("Para one.\n\nPara three.");
  });

  it("drops a final runner-up paragraph and its leading break", () => {
    expect(stripRunnerUp("Para one.\n\nRunner-up: B.").text).toBe("Para one.");
  });

  it("does not split inside a run of initials", () => {
    const t = "Chatterjee was elected. Runner-up is P.A. Sangma, elected in 1996. [Checked by hand.]";
    expect(stripRunnerUp(t).text).toBe("Chatterjee was elected. [Checked by hand.]");
  });

  it("does not split at an abbreviation", () => {
    const t = "So A. The runner-up is B, e.g. if read loosely. [Done.]";
    expect(stripRunnerUp(t).text).toBe("So A. [Done.]");
  });

  it("leaves text without a runner-up untouched", () => {
    const t = "Nothing to see. Really.";
    expect(stripRunnerUp(t)).toEqual({ text: t, removed: [], inline: [] });
  });
});
