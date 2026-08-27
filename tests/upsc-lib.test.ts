import { describe, it, expect } from "vitest";
import {
  normalizeQuestions,
  mergeBands,
  validateCatalog,
  crosstab,
  buildRecords,
  validateRows,
  findLonelyContexts,
  assignSetLabels,
  findLatexImbalance,
  englishPagesFor,
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
  "Reading Comprehension": {
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
  it("stamps the derived answer and its provenance into solution", () => {
    const [row] = buildRecords([q()], [d()]);
    expect(row.answer).toBe("A");
    expect(row.solution).toMatch(/Derived answer/);
    expect(row.solution).toMatch(/no official key/);
    expect(row.solution).toMatch(/confidence: HIGH/);
  });

  it("says so when an answer was reconciled by hand rather than agreed", () => {
    const [row] = buildRecords([q()], [d()], { reconciled: new Set([1]) });
    expect(row.solution).toMatch(/reconciled by hand/);
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
