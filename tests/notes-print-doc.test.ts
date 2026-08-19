/**
 * Pure-logic tests for the /notes printable handout.
 *
 * The print document is the shareable artifact — a teacher sends the PDF and
 * nobody re-checks it against the site. So the invariants that matter are
 * COMPLETENESS ones: it must carry every concept, and it must not silently
 * drop a featured PYQ. Those are asserted here against the real registry, not
 * just against fixtures, so a future chapter can't ship a handout that quietly
 * omits half its content.
 */
import { describe, it, expect } from "vitest";
import {
  collectPyqIds,
  printDocStats,
  printHandoutHref,
} from "@/lib/notes/printDoc";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import type { ConceptUnit, SubtopicNote } from "@/app/notes/_types";

const concept = (over: Partial<ConceptUnit> = {}): ConceptUnit =>
  ({
    kind: "formula",
    slug: "c",
    name: "C",
    intuition: "i",
    definition: "d",
    authoredExample: { prompt: "p", steps: ["s"], answer: "a" },
    ...over,
  }) as ConceptUnit;

const note = (concepts: ConceptUnit[]): SubtopicNote => ({
  subtopicName: "S",
  title: "S",
  oneLineDefinition: "one",
  whyItMatters: "",
  concepts,
});

describe("printHandoutHref", () => {
  it("builds the handout URL from a subject route + chapter slug", () => {
    expect(printHandoutHref("nda-maths", "sets-relations")).toBe(
      "/notes/print/nda-maths/sets-relations"
    );
  });

  it("resolves for every registered chapter", () => {
    for (const c of NOTES_CHAPTERS) {
      expect(printHandoutHref(c.subjectRoute, c.chapterSlug)).toBe(
        `/notes/print/${c.subjectRoute}/${c.chapterSlug}`
      );
    }
  });
});

describe("collectPyqIds", () => {
  it("gathers ids across subtopics, deduped, order preserved", () => {
    const notes = [
      note([concept({ pyqExampleId: "a" }), concept({ pyqExampleId: "b" })]),
      note([concept({ pyqExampleId: "b" }), concept({ pyqExampleId: "c" })]),
    ];
    expect(collectPyqIds(notes)).toEqual(["a", "b", "c"]);
  });

  it("skips concepts with no featured PYQ", () => {
    expect(collectPyqIds([note([concept(), concept({ pyqExampleId: "x" })])])).toEqual(["x"]);
  });

  it("returns empty for a chapter with no featured PYQs", () => {
    expect(collectPyqIds([note([concept()])])).toEqual([]);
  });

  it("collects EVERY featured PYQ of every real chapter — a dropped id is a silently missing question in the handout", () => {
    for (const c of NOTES_CHAPTERS) {
      const notes = c.slugs.map((s) => c.notes[s]);
      const expected = new Set(
        notes.flatMap((n) =>
          n.concepts.map((u) => u.pyqExampleId).filter((x): x is string => Boolean(x))
        )
      );
      expect(new Set(collectPyqIds(notes)), c.chapterSlug).toEqual(expected);
    }
  });
});

describe("printDocStats", () => {
  it("counts subtopics, concepts, figures and practice reps", () => {
    const notes = [
      note([
        concept({ visualizationSlug: "sets-venn-two" }),
        concept({ practiceSet: [{ prompt: "p", answer: "a" }, { prompt: "q", answer: "b" }] }),
      ]),
      note([concept()]),
    ];
    expect(printDocStats(notes)).toMatchObject({
      subtopics: 2,
      concepts: 3,
      figures: 1,
      reps: 2,
    });
  });

  it("counts a reference-variant concept like any other", () => {
    const ref = concept({
      kind: "reference",
      table: { columns: ["A"], rows: [{ cells: ["1"] }] },
    } as Partial<ConceptUnit>);
    expect(printDocStats([note([ref])]).concepts).toBe(1);
  });

  it("concept count matches the registry for every chapter — the handout must not truncate", () => {
    for (const c of NOTES_CHAPTERS) {
      const notes = c.slugs.map((s) => c.notes[s]);
      const expected = notes.reduce((a, n) => a + n.concepts.length, 0);
      expect(printDocStats(notes).concepts, c.chapterSlug).toBe(expected);
      expect(printDocStats(notes).subtopics, c.chapterSlug).toBe(c.slugs.length);
    }
  });

  it("is zero-safe for an empty chapter", () => {
    expect(printDocStats([])).toEqual({
      subtopics: 0,
      concepts: 0,
      figures: 0,
      reps: 0,
      formulas: 0,
    });
  });
});
