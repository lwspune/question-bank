import { describe, expect, it } from "vitest";
import {
  buildRecords,
  validateCatalog,
  validateSections,
  type GatCatalog,
  type GatTQ,
} from "../scripts/nda-gat/lib";
import type { Derivation } from "../scripts/cds-maths/lib";

const CAT: GatCatalog = {
  English: {
    "Vocabulary": ["Synonyms", "Antonyms"],
    "Grammar and Usage": ["Parts of Speech"],
  },
  Physics: {
    "Light and Optics": ["Refraction and Lenses"],
    // A chapter name that ALSO exists under Biology — the collision the
    // two-level catalog cannot express. See the test below.
    "Modern Physics": ["Photoelectric Effect"],
  },
  Biology: {
    "Human Physiology": ["Digestive System"],
  },
  History: {
    // Same chapter NAME as Physics carries, on purpose. Two subjects legitimately
    // owning one name is the case a two-level catalog cannot express, and it is
    // the property under test below.
    "Modern Physics": ["Freedom Struggle"],
  },
};

const q = (over: Partial<GatTQ> = {}): GatTQ => ({
  number: 1,
  stem: "Choose the word nearest in meaning.",
  options: [
    { label: "A", text: "alpha" },
    { label: "B", text: "beta" },
    { label: "C", text: "gamma" },
    { label: "D", text: "delta" },
  ],
  subject: "English",
  chapter: "Vocabulary",
  subtopic: "Synonyms",
  difficulty: "EASY",
  ...over,
});

const d = (over: Partial<Derivation> = {}): Derivation => ({
  number: 1,
  answer: "B",
  value: "beta",
  confidence: "HIGH",
  reasoning: "beta is nearest in meaning.",
  ...over,
});

describe("validateCatalog — three-level, subject-scoped", () => {
  it("accepts a row whose subject, chapter and subtopic all resolve", () => {
    const { errors, warnings } = validateCatalog([q()], CAT, { strictSubtopics: true });
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it("ERRORS on an unknown subject and names the known ones", () => {
    const { errors } = validateCatalog([q({ subject: "Enlish" })], CAT);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("unknown subject");
    expect(errors[0]).toContain("Enlish");
  });

  it("ERRORS on a chapter that exists only under a DIFFERENT subject", () => {
    // "Modern Physics" is a real chapter of Physics and of History in this
    // fixture. A two-level catalog would pass a Biology row naming it; the
    // subject-scoped one must not, because commitStaged would auto-create it
    // under Biology and split that chapter's corpus across two subjects.
    const { errors } = validateCatalog([q({ subject: "Biology", chapter: "Modern Physics" })], CAT);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("unknown chapter");
    expect(errors[0]).toContain("Biology");
  });

  it("accepts the SAME chapter name under each subject that really has it", () => {
    const rows = [
      q({ number: 1, subject: "Physics", chapter: "Modern Physics", subtopic: "Photoelectric Effect" }),
      q({ number: 2, subject: "History", chapter: "Modern Physics", subtopic: "Freedom Struggle" }),
    ];
    expect(validateCatalog(rows, CAT, { strictSubtopics: true }).errors).toEqual([]);
  });

  it("ERRORS on an unlisted subtopic under strictSubtopics, warns otherwise", () => {
    const row = [q({ subtopic: "Synonym" })]; // singular — a near-miss, not a new idea
    expect(validateCatalog(row, CAT, { strictSubtopics: true }).errors).toHaveLength(1);
    const loose = validateCatalog(row, CAT);
    expect(loose.errors).toEqual([]);
    expect(loose.warnings).toHaveLength(1);
  });

  it("does not resolve a subtopic across chapters of the same subject", () => {
    const row = [q({ chapter: "Grammar and Usage", subtopic: "Synonyms" })];
    expect(validateCatalog(row, CAT, { strictSubtopics: true }).errors).toHaveLength(1);
  });

  it("allows a row with no subtopic at all", () => {
    expect(
      validateCatalog([q({ subtopic: undefined })], CAT, { strictSubtopics: true }).errors
    ).toEqual([]);
  });
});

describe("validateSections — the Part A / Part B boundary", () => {
  it("passes a paper whose English block is exactly Q1..Q50", () => {
    const rows = [
      ...Array.from({ length: 50 }, (_, i) => q({ number: i + 1, subject: "English" })),
      ...Array.from({ length: 100 }, (_, i) =>
        q({
          number: i + 51,
          subject: "Physics",
          chapter: "Light and Optics",
          subtopic: "Refraction and Lenses",
        })
      ),
    ];
    expect(validateSections(rows)).toEqual([]);
  });

  it("catches a GK question mis-filed as English", () => {
    const errs = validateSections([q({ number: 77, subject: "English" })]);
    expect(errs).toHaveLength(1);
    expect(errs[0]).toContain("Q77");
    expect(errs[0]).toContain("English");
  });

  it("catches an English question mis-filed under a GK subject", () => {
    const errs = validateSections([q({ number: 12, subject: "Physics" })]);
    expect(errs).toHaveLength(1);
    expect(errs[0]).toContain("Q12");
  });

  it("catches a subject that is not on the GAT paper at all", () => {
    const errs = validateSections([q({ number: 60, subject: "Mathematics" })]);
    expect(errs).toHaveLength(1);
    expect(errs[0]).toContain("Mathematics");
  });
});

describe("buildRecords — per-question subject", () => {
  it("carries each row's OWN subject rather than one paper-wide constant", () => {
    const rows = buildRecords(
      [
        q({ number: 1, subject: "English" }),
        q({
          number: 60,
          subject: "Biology",
          chapter: "Human Physiology",
          subtopic: "Digestive System",
        }),
      ],
      [d({ number: 1 }), d({ number: 60 })]
    );
    expect(rows.map((r) => r.subject)).toEqual(["English", "Biology"]);
  });

  it("applies the source_row offset so the paper lands on 2..151", () => {
    const rows = buildRecords([q({ number: 1 }), q({ number: 150 })], [d({ number: 1 }), d({ number: 150 })], {
      sourceRowOffset: 1,
    });
    expect(rows.map((r) => r.sourceRow)).toEqual([2, 151]);
  });

  it("emits context and setLabel only when the question is in a Directions set", () => {
    const [plain, inSet] = buildRecords(
      [
        q({ number: 1 }),
        q({ number: 2, context: "Directions: read the passage.", setLabel: "S1" }),
      ],
      [d({ number: 1 }), d({ number: 2 })]
    );
    expect(plain.context).toBeUndefined();
    expect(plain.setLabel).toBeUndefined();
    expect(inSet.context).toBe("Directions: read the passage.");
    expect(inSet.setLabel).toBe("S1");
  });

  it("drops a question the deriver found no correct option for, rather than inventing one", () => {
    const rows = buildRecords(
      [q({ number: 1 }), q({ number: 2 })],
      [d({ number: 1 }), d({ number: 2, answer: null })]
    );
    expect(rows.map((r) => r.questionNumber)).toEqual(["1"]);
  });

  it("drops a question nobody derived", () => {
    expect(buildRecords([q({ number: 1 }), q({ number: 2 })], [d({ number: 1 })])).toHaveLength(1);
  });

  it("stores the deriver's reasoning as the solution", () => {
    const [row] = buildRecords([q()], [d({ reasoning: "  because beta.  " })]);
    expect(row.solution).toBe("because beta.");
  });
});
