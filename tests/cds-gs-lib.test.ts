import { describe, it, expect } from "vitest";
import {
  normalizeQuestions,
  mergeBands,
  validateCatalog,
  crosstab,
  buildRecords,
  validateRows,
  findLatexImbalance,
  type Band,
  type TQ,
  type Derivation,
} from "../scripts/cds-gs/lib";
import type { Catalog } from "../scripts/cds-gs/config";

const CATALOG: Catalog = {
  Chemistry: {
    "Atomic Structure and Periodic Classification": ["Periodic Trends, Valency and Atomicity", "Isotopes and Isoelectronic Species"],
    "Chemical Reactions": ["Redox: Oxidation, Reduction and Reducing Agents"],
  },
  Geography: {
    Oceanography: ["Ocean Currents"],
  },
};

const q = (over: Partial<TQ> = {}): TQ => ({
  number: 1,
  stem: "Which element is used as a timekeeper in atomic clocks?",
  options: [
    { label: "A", text: "Potassium" },
    { label: "B", text: "Caesium" },
    { label: "C", text: "Calcium" },
    { label: "D", text: "Magnesium" },
  ],
  subject: "Chemistry",
  chapter: "Atomic Structure and Periodic Classification",
  subtopic: "Periodic Trends, Valency and Atomicity",
  difficulty: "MODERATE",
  ...over,
});

const band = (name: string, questions: TQ[]): Band => ({
  band: name,
  pages: [1],
  bandReport: { numbersFound: questions.map((x) => x.number), firstComplete: true, lastComplete: true, notes: "" },
  questions,
});

const der = (over: Partial<Derivation> = {}): Derivation => ({
  number: 1,
  answer: "B",
  value: "Caesium",
  confidence: "HIGH",
  reasoning: "Caesium-133 defines the SI second.",
  ...over,
});

describe("normalizeQuestions — self-heals recurring agent output quirks", () => {
  it("converts object-form options into the labelled array form", () => {
    const [out] = normalizeQuestions([{ ...q(), options: { A: "Potassium", B: "Caesium", C: "Calcium", D: "Magnesium" } }]);
    expect(out.options).toEqual([
      { label: "A", text: "Potassium" },
      { label: "B", text: "Caesium" },
      { label: "C", text: "Calcium" },
      { label: "D", text: "Magnesium" },
    ]);
  });

  it("maps difficulty synonyms and casing onto the enum", () => {
    expect(normalizeQuestions([{ ...q(), difficulty: "medium" }])[0].difficulty).toBe("MODERATE");
    expect(normalizeQuestions([{ ...q(), difficulty: "easy" }])[0].difficulty).toBe("EASY");
    expect(normalizeQuestions([{ ...q(), difficulty: "" }])[0].difficulty).toBe("MODERATE");
  });

  it("trims option labels and upper-cases them", () => {
    const [out] = normalizeQuestions([{ ...q(), options: [{ label: "a ", text: "Potassium" }] }]);
    expect(out.options[0].label).toBe("A");
  });
});

describe("mergeBands — a duplicate is only safe when the two copies AGREE", () => {
  it("merges disjoint bands in question order", () => {
    const { questions, errors } = mergeBands([band("B2", [q({ number: 3 })]), band("B1", [q({ number: 1 }), q({ number: 2 })])]);
    expect(errors).toEqual([]);
    expect(questions.map((x) => x.number)).toEqual([1, 2, 3]);
  });

  it("accepts a byte-identical duplicate across a band seam (bands overlap by design)", () => {
    const { questions, errors } = mergeBands([band("B1", [q({ number: 5 })]), band("B2", [q({ number: 5 })])]);
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(1);
  });

  it("REFUSES a duplicate whose two copies disagree, naming both bands", () => {
    // Two readings of one page is a FINDING, not a duplicate to resolve by
    // whichever file happened to be read last.
    const { errors } = mergeBands([
      band("B1", [q({ number: 5, stem: "Which gas dissolves in water to give an acidic solution?" })]),
      band("B2", [q({ number: 5, stem: "Which gas dissolves in water to give a basic solution?" })]),
    ]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/Q5/);
    expect(errors[0]).toMatch(/B1/);
    expect(errors[0]).toMatch(/B2/);
  });

  it("catches an option-ORDER disagreement between bands, not just a stem disagreement", () => {
    const swapped = q({ number: 5 });
    const reordered = q({
      number: 5,
      options: [
        { label: "A", text: "Caesium" },
        { label: "B", text: "Potassium" },
        { label: "C", text: "Calcium" },
        { label: "D", text: "Magnesium" },
      ],
    });
    const { errors } = mergeBands([band("B1", [swapped]), band("B2", [reordered])]);
    expect(errors).toHaveLength(1);
  });
});

describe("validateCatalog — subject/chapter are HARD, subtopic is soft", () => {
  it("passes a row whose subject, chapter and subtopic are all in the catalog", () => {
    expect(validateCatalog([q()], CATALOG)).toEqual({ errors: [], warnings: [] });
  });

  it("ERRORS on an unknown subject", () => {
    const { errors } = validateCatalog([q({ subject: "General Science" })], CATALOG);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/General Science/);
  });

  it("ERRORS on a chapter that exists under a DIFFERENT subject", () => {
    // The catalog is per-subject; validating against the union would let a
    // Geography chapter be filed under Chemistry and split the corpus.
    const { errors } = validateCatalog([q({ subject: "Chemistry", chapter: "Oceanography" })], CATALOG);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/Oceanography/);
  });

  it("WARNS but does not error on an unknown subtopic", () => {
    const { errors, warnings } = validateCatalog([q({ subtopic: "Atomic Clocks" })], CATALOG);
    expect(errors).toEqual([]);
    expect(warnings).toHaveLength(1);
  });

  it("does not warn when subtopic is absent altogether", () => {
    const { errors, warnings } = validateCatalog([q({ subtopic: undefined })], CATALOG);
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });
});

describe("crosstab — two blind derivations, compared by VALUE not just by letter", () => {
  it("AGREEs when both passes name the same letter", () => {
    const rows = crosstab([der()], [der()], [q()]);
    expect(rows[0].verdict).toBe("AGREE");
  });

  it("flags a DISPUTE when the two passes name different letters holding different text", () => {
    const rows = crosstab([der({ answer: "B", value: "Caesium" })], [der({ answer: "C", value: "Calcium" })], [q()]);
    expect(rows[0].verdict).toBe("DISPUTE");
  });

  it("calls it a TWIN, not a dispute, when the two letters hold EQUIVALENT option text", () => {
    // The Worksheets lesson: the correct answer printed twice makes a letter
    // disagreement look like a wrong key when the key is right. The repair is to
    // the option text, never to the answer — so this must not reach adjudication
    // as a disagreement.
    const twinQ = q({
      options: [
        { label: "A", text: "Caesium" },
        { label: "B", text: "caesium" },
        { label: "C", text: "Calcium" },
        { label: "D", text: "Magnesium" },
      ],
    });
    const rows = crosstab([der({ answer: "A", value: "Caesium" })], [der({ answer: "B", value: "Caesium" })], [twinQ]);
    expect(rows[0].verdict).toBe("TWIN");
  });

  it("reports a question missing from a pass as MISSING rather than silently agreeing", () => {
    const rows = crosstab([der()], [], [q()]);
    expect(rows[0].verdict).toBe("MISSING");
  });

  it("counts every question exactly once", () => {
    const qs = [q({ number: 1 }), q({ number: 2 })];
    const rows = crosstab([der({ number: 1 }), der({ number: 2 })], [der({ number: 1 }), der({ number: 2 })], qs);
    expect(rows).toHaveLength(2);
  });
});

describe("buildRecords", () => {
  it("assembles a bank row carrying the derived answer and its provenance", () => {
    const [row] = buildRecords([q()], [der()]);
    expect(row.questionNumber).toBe("1");
    expect(row.subject).toBe("Chemistry");
    expect(row.chapter).toBe("Atomic Structure and Periodic Classification");
    expect(row.answer).toBe("B");
    expect(row.optionB).toBe("Caesium");
    expect(row.solution).toMatch(/no official key/);
  });

  it("carries NO context — a GK paper has no shared directions or passage", () => {
    const [row] = buildRecords([q()], [der()]);
    expect(row.context).toBeUndefined();
  });

  it("omits a question that has no derivation rather than inventing an answer", () => {
    const rows = buildRecords([q({ number: 1 }), q({ number: 2 })], [der({ number: 1 })]);
    expect(rows.map((r) => r.questionNumber)).toEqual(["1"]);
  });
});

describe("validateRows — structural gates over the assembled rows", () => {
  const rows = () => buildRecords([q()], [der()]);

  it("reports every missing question number in the expected range", () => {
    const errs = validateRows(rows(), 1, 3);
    expect(errs).toContain("missing Q2");
    expect(errs).toContain("missing Q3");
  });

  it("rejects a blank option", () => {
    const r = rows();
    r[0].optionC = "";
    expect(validateRows(r, 1, 1).join(" ")).toMatch(/blank option/);
  });

  it("rejects an answer outside A-D", () => {
    const r = rows();
    r[0].answer = "E";
    expect(validateRows(r, 1, 1).join(" ")).toMatch(/bad answer/);
  });

  it("rejects DUPLICATE option text within one question", () => {
    // Two identical options make the printed answer ambiguous as a LETTER even
    // when it is unambiguous as chemistry — the CDS English defect class.
    const r = rows();
    r[0].optionC = r[0].optionB;
    expect(validateRows(r, 1, 1).join(" ")).toMatch(/duplicate option/i);
  });

  it("catches a content_hash collision between two questions", () => {
    const r = [...rows(), ...buildRecords([q({ number: 2 })], [der({ number: 2 })])];
    expect(validateRows(r, 1, 2).join(" ")).toMatch(/collision/);
  });

  it("catches an unbalanced inline-math delimiter", () => {
    const r = rows();
    r[0].question = "What is \\(10^{-9}\\ \\text{cm}?";
    expect(validateRows(r, 1, 1).join(" ")).toMatch(/unbalanced/);
  });

  it("catches a pipe-table with no separator row (renders as literal pipes)", () => {
    const r = rows();
    r[0].question = "Match the lists:\n| List-I | List-II |\n| A. Kail | 1. Pine |";
    expect(validateRows(r, 1, 1).join(" ")).toMatch(/separator/i);
  });

  it("accepts a well-formed pipe table", () => {
    const r = rows();
    r[0].question = "Match the lists:\n| List-I | List-II |\n|---|---|\n| A. Kail | 1. Pine |";
    expect(validateRows(r, 1, 1)).toEqual([]);
  });
});

describe("findLatexImbalance", () => {
  it("returns null for balanced delimiters", () => {
    expect(findLatexImbalance("a \\(x\\) b \\(y\\)")).toBeNull();
  });
  it("names the imbalance", () => {
    expect(findLatexImbalance("a \\(x b")).toMatch(/unbalanced/);
  });
});
