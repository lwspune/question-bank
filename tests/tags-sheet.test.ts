import { describe, expect, it } from "vitest";
import {
  buildTagRows,
  tagRowsToAoa,
  mapSubjectToTracker,
  TAG_COLUMNS,
} from "@/lib/export/tagsSheet";
import type { QuestionRow } from "@/lib/questions/query";
import type { Difficulty } from "@/lib/questions/filters";

/**
 * Fixture factory — a full QuestionRow with sensible defaults. `correct` picks
 * which option is the answer; everything else is overridable per test.
 */
function q(opts: {
  id: string;
  subject?: string;
  chapter?: string;
  subtopic?: string | null;
  difficulty?: Difficulty;
  setId?: string | null;
  context?: string | null;
  solution?: string | null;
  correct?: "A" | "B" | "C" | "D" | null;
  text?: string;
}): QuestionRow {
  const correct = opts.correct === undefined ? "A" : opts.correct;
  return {
    id: opts.id,
    text: opts.text ?? `stem ${opts.id}`,
    context: opts.context ?? null,
    difficulty: opts.difficulty ?? "EASY",
    solution: opts.solution ?? null,
    imageUrl: null,
    setId: opts.setId ?? null,
    questionNumber: null,
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    exam: { id: "e", name: "NDA" },
    subject: { id: "s", name: opts.subject ?? "Mathematics" },
    chapter: { id: "c", name: opts.chapter ?? "Probability" },
    subtopic:
      opts.subtopic === null
        ? null
        : { id: "st", name: opts.subtopic ?? "Classical Probability" },
    options: (["A", "B", "C", "D"] as const).map((label) => ({
      label,
      text: `${label}-text-${opts.id}`,
      isCorrect: label === correct,
      imageUrl: null,
    })),
  };
}

describe("buildTagRows — numbering", () => {
  it("numbers standalone questions 1..n in input (cart) order", () => {
    const rows = buildTagRows([q({ id: "a" }), q({ id: "b" }), q({ id: "c" })]);
    expect(rows.map((r) => r.q)).toEqual([1, 2, 3]);
    // order preserved by id
    expect(rows.map((r) => r.question)).toEqual([
      "stem a",
      "stem b",
      "stem c",
    ]);
  });

  it("numbers set siblings contiguously, mirroring the printed paper", () => {
    // single, then a 3-question passage set, then a single → 1,2,3,4,5
    const rows = buildTagRows([
      q({ id: "solo1" }),
      q({ id: "p1", setId: "S1", context: "Passage X" }),
      q({ id: "p2", setId: "S1", context: "Passage X" }),
      q({ id: "p3", setId: "S1", context: "Passage X" }),
      q({ id: "solo2" }),
    ]);
    expect(rows.map((r) => r.q)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("buildTagRows — context / passage", () => {
  it("carries the passage onto every sibling of a set (the Context column)", () => {
    const rows = buildTagRows([
      q({ id: "p1", setId: "S1", context: "Read the passage." }),
      q({ id: "p2", setId: "S1", context: "Read the passage." }),
    ]);
    expect(rows.map((r) => r.context)).toEqual([
      "Read the passage.",
      "Read the passage.",
    ]);
  });

  it("defensively fills a sibling's blank context from the set's lead passage", () => {
    // group passage comes from the first sibling; a later null must not blank it
    const rows = buildTagRows([
      q({ id: "p1", setId: "S1", context: "Lead passage" }),
      q({ id: "p2", setId: "S1", context: null }),
    ]);
    expect(rows[1].context).toBe("Lead passage");
  });

  it("emits empty context for a standalone question with no context", () => {
    const rows = buildTagRows([q({ id: "a", context: null })]);
    expect(rows[0].context).toBe("");
  });

  it("carries context for a standalone question that has its own context", () => {
    const rows = buildTagRows([q({ id: "a", context: "Given the table below" })]);
    expect(rows[0].context).toBe("Given the table below");
  });
});

describe("buildTagRows — answer derivation", () => {
  it("derives the Answer letter from the isCorrect option", () => {
    const rows = buildTagRows([q({ id: "a", correct: "C" })]);
    expect(rows[0].answer).toBe("C");
  });

  it("emits empty Answer when no option is marked correct (defensive)", () => {
    const rows = buildTagRows([q({ id: "a", correct: null })]);
    expect(rows[0].answer).toBe("");
  });

  it("maps option text by label into OptionA–D", () => {
    const rows = buildTagRows([q({ id: "a" })]);
    expect(rows[0].optionA).toBe("A-text-a");
    expect(rows[0].optionB).toBe("B-text-a");
    expect(rows[0].optionC).toBe("C-text-a");
    expect(rows[0].optionD).toBe("D-text-a");
  });
});

describe("buildTagRows — taxonomy + metadata", () => {
  it("passes the PYQ Vault (master) chapter name through verbatim", () => {
    const rows = buildTagRows([
      q({ id: "a", chapter: "Indefinite Integration" }),
    ]);
    expect(rows[0].chapter).toBe("Indefinite Integration");
  });

  it("defaults a null subtopic to 'General'", () => {
    const rows = buildTagRows([q({ id: "a", subtopic: null })]);
    expect(rows[0].subtopic).toBe("General");
  });

  it("title-cases difficulty for nda-tracker", () => {
    expect(buildTagRows([q({ id: "a", difficulty: "EASY" })])[0].difficulty).toBe(
      "Easy"
    );
    expect(
      buildTagRows([q({ id: "a", difficulty: "MODERATE" })])[0].difficulty
    ).toBe("Moderate");
    expect(buildTagRows([q({ id: "a", difficulty: "HARD" })])[0].difficulty).toBe(
      "Hard"
    );
  });

  it("emits empty solution when the question has none", () => {
    const rows = buildTagRows([q({ id: "a", solution: null })]);
    expect(rows[0].solution).toBe("");
  });
});

describe("mapSubjectToTracker", () => {
  it("maps Mathematics → Maths (nda-tracker's exam-subject key)", () => {
    expect(mapSubjectToTracker("Mathematics")).toBe("Maths");
  });

  it("maps Current Affairs → Others (no CA key in nda-tracker)", () => {
    expect(mapSubjectToTracker("Current Affairs")).toBe("Others");
  });

  it("passes the other GAT subjects through unchanged", () => {
    for (const s of [
      "English",
      "Physics",
      "Chemistry",
      "Biology",
      "Geography",
      "History",
      "Polity",
      "Economics",
    ]) {
      expect(mapSubjectToTracker(s)).toBe(s);
    }
  });

  it("every emitted GAT row carries a non-empty Subject (validateGatSubjects)", () => {
    const rows = buildTagRows([
      q({ id: "a", subject: "English", chapter: "Reading Comprehension" }),
      q({ id: "b", subject: "Geography", chapter: "Climatology" }),
      q({ id: "c", subject: "Current Affairs", chapter: "Defence" }),
    ]);
    expect(rows.map((r) => r.subject)).toEqual([
      "English",
      "Geography",
      "Others",
    ]);
    expect(rows.every((r) => r.subject.trim().length > 0)).toBe(true);
  });
});

describe("tagRowsToAoa — sheet shape", () => {
  it("emits the parseTagsFile-compatible header as row 0", () => {
    const aoa = tagRowsToAoa(buildTagRows([q({ id: "a" })]));
    expect(aoa[0]).toEqual([...TAG_COLUMNS]);
    // parseTagsFile requires a 'Q' and a 'Chapter' header (case-insensitive)
    const lower = (aoa[0] as string[]).map((h) => h.toLowerCase());
    expect(lower).toContain("q");
    expect(lower).toContain("chapter");
    expect(lower).toContain("context");
  });

  it("lays each row out in column order", () => {
    const aoa = tagRowsToAoa(
      buildTagRows([
        q({
          id: "a",
          subject: "Mathematics",
          chapter: "Statistics",
          subtopic: "Mean",
          difficulty: "MODERATE",
          correct: "B",
          solution: "because",
          text: "find the mean",
          context: "data set",
        }),
      ])
    );
    expect(aoa[1]).toEqual([
      1,
      "Maths",
      "Statistics",
      "Mean",
      "find the mean",
      "A-text-a",
      "B-text-a",
      "C-text-a",
      "D-text-a",
      "B",
      "because",
      "Moderate",
      "data set",
      "", // SubtopicSlug — empty when untagged
      "", // ConceptSlug
    ]);
  });
});

describe("buildTagRows — concept tags", () => {
  it("emits the question's primary concept tag when supplied", () => {
    const tags = new Map([
      ["a", { subtopicSlug: "vectors-dot-product", conceptSlug: "dot-product" }],
    ]);
    const rows = buildTagRows([q({ id: "a" }), q({ id: "b" })], tags);
    expect(rows[0].subtopicSlug).toBe("vectors-dot-product");
    expect(rows[0].conceptSlug).toBe("dot-product");
    // Untagged question → empty slug cells (falls back to name resolution).
    expect(rows[1].subtopicSlug).toBe("");
    expect(rows[1].conceptSlug).toBe("");
  });

  it("defaults to empty slug columns when no map is given", () => {
    const rows = buildTagRows([q({ id: "a" })]);
    expect(rows[0].subtopicSlug).toBe("");
    expect(rows[0].conceptSlug).toBe("");
  });

  it("carries the tag onto every sibling row by its own id", () => {
    const tags = new Map([
      ["b", { subtopicSlug: "st-x", conceptSlug: "c-x" }],
    ]);
    const rows = buildTagRows(
      [
        q({ id: "a", setId: "S1", context: "P" }),
        q({ id: "b", setId: "S1" }),
      ],
      tags
    );
    expect(rows[0].conceptSlug).toBe(""); // a untagged
    expect(rows[1].conceptSlug).toBe("c-x"); // b tagged
  });
});
