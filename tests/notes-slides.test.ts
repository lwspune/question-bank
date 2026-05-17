import { describe, it, expect } from "vitest";
import { splitNoteIntoSlides } from "@/lib/notes/splitNoteIntoSlides";
import type { ConceptUnit, SubtopicNote } from "@/app/notes/_types";

const minimalConcept = (
  overrides: Partial<ConceptUnit> = {}
): ConceptUnit => ({
  slug: "c1",
  name: "Concept 1",
  intuition: "Plain intuition.",
  definition: "Formal definition.",
  authoredExample: {
    prompt: "Find x.",
    steps: ["Step 1.", "Step 2."],
    answer: "x = 5",
  },
  ...overrides,
});

const baseNote = (overrides: Partial<SubtopicNote> = {}): SubtopicNote => ({
  subtopicName: "Test Subtopic",
  title: "Test Subtopic",
  oneLineDefinition: "A single sentence definition.",
  whyItMatters: "Two sentences on why it matters.",
  concepts: [minimalConcept()],
  ...overrides,
});

describe("splitNoteIntoSlides", () => {
  it("emits a title slide first and a drill slide last", () => {
    const slides = splitNoteIntoSlides(baseNote());
    expect(slides[0].kind).toBe("title");
    expect(slides[slides.length - 1].kind).toBe("drill");
  });

  it("title slide carries the subtopic title + one-line definition", () => {
    const slides = splitNoteIntoSlides(baseNote());
    expect(slides[0]).toEqual({
      kind: "title",
      title: "Test Subtopic",
      definition: "A single sentence definition.",
    });
  });

  it("emits a why slide right after the title when whyItMatters is non-empty", () => {
    const slides = splitNoteIntoSlides(baseNote());
    expect(slides[1].kind).toBe("why");
  });

  it("skips the why slide when whyItMatters is empty", () => {
    const slides = splitNoteIntoSlides(baseNote({ whyItMatters: "" }));
    expect(slides[1].kind).not.toBe("why");
  });

  it("each concept emits at minimum a concept-intro + authored-example slide", () => {
    const slides = splitNoteIntoSlides(baseNote());
    const conceptIntros = slides.filter((s) => s.kind === "concept-intro");
    const examples = slides.filter((s) => s.kind === "authored-example");
    expect(conceptIntros).toHaveLength(1);
    expect(examples).toHaveLength(1);
  });

  it("concept-intro carries name + intuition + definition + formula", () => {
    const formula = { label: "Mean", latex: "\\bar{x}" };
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ formula })],
      })
    );
    const intro = slides.find((s) => s.kind === "concept-intro");
    expect(intro).toEqual({
      kind: "concept-intro",
      conceptName: "Concept 1",
      intuition: "Plain intuition.",
      definition: "Formal definition.",
      formula,
    });
  });

  it("authored-example slide carries the full example payload and the concept name", () => {
    const slides = splitNoteIntoSlides(baseNote());
    const ex = slides.find((s) => s.kind === "authored-example");
    expect(ex).toMatchObject({
      conceptName: "Concept 1",
      example: {
        prompt: "Find x.",
        steps: ["Step 1.", "Step 2."],
        answer: "x = 5",
      },
    });
  });

  it("emits a pyq-example slide when pyqExampleId is set, omits otherwise", () => {
    const withPyq = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ pyqExampleId: "uuid-pyq-1" })],
      })
    );
    const withoutPyq = splitNoteIntoSlides(baseNote());
    expect(withPyq.some((s) => s.kind === "pyq-example")).toBe(true);
    expect(withoutPyq.some((s) => s.kind === "pyq-example")).toBe(false);
  });

  it("pyq-example slide carries the UUID and concept name", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ pyqExampleId: "uuid-pyq-1" })],
      })
    );
    const pyq = slides.find((s) => s.kind === "pyq-example");
    expect(pyq).toEqual({
      kind: "pyq-example",
      conceptName: "Concept 1",
      exampleId: "uuid-pyq-1",
    });
  });

  it("emits one trap slide per trap when traps are provided", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({
            traps: [
              { title: "Trap A", body: "Body A" },
              { title: "Trap B", body: "Body B" },
            ],
          }),
        ],
      })
    );
    const traps = slides.filter((s) => s.kind === "trap");
    expect(traps).toHaveLength(2);
    expect(traps[0]).toEqual({
      kind: "trap",
      conceptName: "Concept 1",
      trap: { title: "Trap A", body: "Body A" },
    });
  });

  it("orders slides within a concept: intro → authored → pyq → traps → concept-drill", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({
            pyqExampleId: "uuid-1",
            traps: [{ title: "T", body: "b" }],
            drillQuestionIds: ["d1", "d2"],
          }),
        ],
      })
    );
    const conceptKinds = slides
      .filter((s) => s.kind !== "title" && s.kind !== "why" && s.kind !== "drill")
      .map((s) => s.kind);
    expect(conceptKinds).toEqual([
      "concept-intro",
      "authored-example",
      "pyq-example",
      "trap",
      "concept-drill",
    ]);
  });

  it("emits a concept-drill slide when drillQuestionIds is non-empty", () => {
    const withDrill = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ drillQuestionIds: ["d1", "d2", "d3"] })],
      })
    );
    expect(
      withDrill.some(
        (s) => s.kind === "concept-drill" && s.questionIds.length === 3
      )
    ).toBe(true);
  });

  it("omits concept-drill slide when drillQuestionIds is empty or undefined", () => {
    const without = splitNoteIntoSlides(baseNote());
    const withEmpty = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ drillQuestionIds: [] })],
      })
    );
    expect(without.some((s) => s.kind === "concept-drill")).toBe(false);
    expect(withEmpty.some((s) => s.kind === "concept-drill")).toBe(false);
  });

  it("concept-drill carries concept name and questionIds in order", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({
            slug: "x",
            name: "X",
            drillQuestionIds: ["a", "b", "c"],
          }),
        ],
      })
    );
    const drill = slides.find((s) => s.kind === "concept-drill");
    expect(drill).toEqual({
      kind: "concept-drill",
      conceptName: "X",
      questionIds: ["a", "b", "c"],
    });
  });

  it("preserves concept order across multiple concepts", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({ slug: "a", name: "A" }),
          minimalConcept({ slug: "b", name: "B" }),
          minimalConcept({ slug: "c", name: "C" }),
        ],
      })
    );
    const intros = slides.filter((s) => s.kind === "concept-intro");
    expect(
      intros.map((s) => s.kind === "concept-intro" && s.conceptName)
    ).toEqual(["A", "B", "C"]);
  });

  it("each concept's pyq-example and traps appear before the next concept's intro", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({
            slug: "a",
            name: "A",
            pyqExampleId: "pyq-a",
            traps: [{ title: "Ta", body: "ba" }],
          }),
          minimalConcept({ slug: "b", name: "B" }),
        ],
      })
    );
    const kinds = slides.map((s) => s.kind);
    const bIntroIdx = slides.findIndex(
      (s) => s.kind === "concept-intro" && s.conceptName === "B"
    );
    const aTrapIdx = kinds.findIndex((k) => k === "trap");
    const aPyqIdx = kinds.findIndex((k) => k === "pyq-example");
    expect(aPyqIdx).toBeGreaterThan(-1);
    expect(aTrapIdx).toBeGreaterThan(aPyqIdx);
    expect(bIntroIdx).toBeGreaterThan(aTrapIdx);
  });

  it("produces title + drill only for a note with no concepts", () => {
    const slides = splitNoteIntoSlides(
      baseNote({ whyItMatters: "", concepts: [] })
    );
    expect(slides).toHaveLength(2);
    expect(slides[0].kind).toBe("title");
    expect(slides[1].kind).toBe("drill");
  });

  it("drill slide carries the subtopicName", () => {
    const slides = splitNoteIntoSlides(baseNote());
    expect(slides[slides.length - 1]).toEqual({
      kind: "drill",
      subtopicName: "Test Subtopic",
    });
  });
});
