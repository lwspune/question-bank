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

/** Default empty drill map used by tests that don't care about concept-drill slides. */
const NO_DRILLS = new Map<string, string[]>();

describe("splitNoteIntoSlides", () => {
  it("emits a title slide first and a drill slide last", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides[0].kind).toBe("title");
    expect(slides[slides.length - 1].kind).toBe("drill");
  });

  it("title slide carries the subtopic title + one-line definition", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides[0]).toEqual({
      kind: "title",
      title: "Test Subtopic",
      definition: "A single sentence definition.",
    });
  });

  it("emits a why slide right after the title when whyItMatters is non-empty", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides[1].kind).toBe("why");
  });

  it("skips the why slide when whyItMatters is empty", () => {
    const slides = splitNoteIntoSlides(baseNote({ whyItMatters: "" }), NO_DRILLS);
    expect(slides[1].kind).not.toBe("why");
  });

  it("each concept emits at minimum a concept-intro + authored-example slide", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
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
      }),
      NO_DRILLS
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
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
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
      }),
      NO_DRILLS
    );
    const withoutPyq = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(withPyq.some((s) => s.kind === "pyq-example")).toBe(true);
    expect(withoutPyq.some((s) => s.kind === "pyq-example")).toBe(false);
  });

  it("pyq-example slide carries the UUID and concept name", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ pyqExampleId: "uuid-pyq-1" })],
      }),
      NO_DRILLS
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
      }),
      NO_DRILLS
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
          }),
        ],
      }),
      new Map([["c1", ["d1", "d2"]]])
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

  it("emits a concept-drill slide when drillsByConcept has a non-empty entry for the concept", () => {
    const slides = splitNoteIntoSlides(
      baseNote(),
      new Map([["c1", ["d1", "d2", "d3"]]])
    );
    expect(
      slides.some(
        (s) => s.kind === "concept-drill" && s.questionIds.length === 3
      )
    ).toBe(true);
  });

  it("omits concept-drill slide when drillsByConcept has no entry or an empty array", () => {
    const without = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    const withEmpty = splitNoteIntoSlides(baseNote(), new Map([["c1", []]]));
    expect(without.some((s) => s.kind === "concept-drill")).toBe(false);
    expect(withEmpty.some((s) => s.kind === "concept-drill")).toBe(false);
  });

  it("concept-drill carries concept name and questionIds from the map", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ slug: "x", name: "X" })],
      }),
      new Map([["x", ["a", "b", "c"]]])
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
      }),
      NO_DRILLS
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
      }),
      NO_DRILLS
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
      baseNote({ whyItMatters: "", concepts: [] }),
      NO_DRILLS
    );
    expect(slides).toHaveLength(2);
    expect(slides[0].kind).toBe("title");
    expect(slides[1].kind).toBe("drill");
  });

  it("drill slide carries the subtopicName", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides[slides.length - 1]).toEqual({
      kind: "drill",
      subtopicName: "Test Subtopic",
    });
  });

  it("multi-concept: drills lookup is keyed by concept.slug, not by index or name", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({ slug: "alpha", name: "A" }),
          minimalConcept({ slug: "beta", name: "B" }),
          minimalConcept({ slug: "gamma", name: "C" }),
        ],
      }),
      new Map([
        ["alpha", ["a1"]],
        ["gamma", ["c1", "c2"]],
      ])
    );
    const drills = slides.filter((s) => s.kind === "concept-drill");
    expect(drills.map((s) => s.kind === "concept-drill" && s.conceptName)).toEqual([
      "A",
      "C",
    ]);
  });

  // ───── M1 additions: visualization, faded-example, self-check ─────

  it("emits a visualization slide right after concept-intro when visualizationSlug is set", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({ visualizationSlug: "regression-line-fit" }),
        ],
      }),
      NO_DRILLS
    );
    const introIdx = slides.findIndex((s) => s.kind === "concept-intro");
    expect(slides[introIdx + 1]).toEqual({
      kind: "visualization",
      conceptName: "Concept 1",
      slug: "regression-line-fit",
    });
  });

  it("omits visualization slide when visualizationSlug is unset", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides.some((s) => s.kind === "visualization")).toBe(false);
  });

  it("emits a faded-example slide right after the authored example when fadedExample is set", () => {
    const faded = {
      prompt: "Faded p",
      steps: ["S1", "S2"],
      answer: "A",
      hiddenStepIndexes: [1],
    };
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ fadedExample: faded })],
      }),
      NO_DRILLS
    );
    const authoredIdx = slides.findIndex((s) => s.kind === "authored-example");
    expect(slides[authoredIdx + 1]).toEqual({
      kind: "faded-example",
      conceptName: "Concept 1",
      example: faded,
    });
  });

  it("omits faded-example slide when fadedExample is unset", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides.some((s) => s.kind === "faded-example")).toBe(false);
  });

  it("emits self-check after the faded example when both fadedExample + selfCheckExample are set", () => {
    const selfCheck = { prompt: "s", steps: ["s"], answer: "a" };
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({
            fadedExample: {
              prompt: "f",
              steps: ["s"],
              answer: "a",
              hiddenStepIndexes: [],
            },
            selfCheckExample: selfCheck,
          }),
        ],
      }),
      NO_DRILLS
    );
    const fadedIdx = slides.findIndex((s) => s.kind === "faded-example");
    expect(slides[fadedIdx + 1]).toEqual({
      kind: "self-check",
      conceptName: "Concept 1",
      example: selfCheck,
    });
  });

  it("emits self-check directly after authored-example when fadedExample is absent", () => {
    const selfCheck = { prompt: "s", steps: ["s"], answer: "a" };
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [minimalConcept({ selfCheckExample: selfCheck })],
      }),
      NO_DRILLS
    );
    const authoredIdx = slides.findIndex((s) => s.kind === "authored-example");
    expect(slides[authoredIdx + 1]).toEqual({
      kind: "self-check",
      conceptName: "Concept 1",
      example: selfCheck,
    });
  });

  it("omits self-check slide when selfCheckExample is unset", () => {
    const slides = splitNoteIntoSlides(baseNote(), NO_DRILLS);
    expect(slides.some((s) => s.kind === "self-check")).toBe(false);
  });

  it("full per-concept order with every optional field set: intro → viz → authored → faded → self-check → pyq → trap → concept-drill", () => {
    const slides = splitNoteIntoSlides(
      baseNote({
        concepts: [
          minimalConcept({
            visualizationSlug: "histogram-bin-slider",
            fadedExample: {
              prompt: "f",
              steps: ["s"],
              answer: "a",
              hiddenStepIndexes: [],
            },
            selfCheckExample: { prompt: "s", steps: ["s"], answer: "a" },
            pyqExampleId: "pyq-1",
            traps: [{ title: "T", body: "b" }],
          }),
        ],
      }),
      new Map([["c1", ["d1"]]])
    );
    const conceptKinds = slides
      .filter((s) => s.kind !== "title" && s.kind !== "why" && s.kind !== "drill")
      .map((s) => s.kind);
    expect(conceptKinds).toEqual([
      "concept-intro",
      "visualization",
      "authored-example",
      "faded-example",
      "self-check",
      "pyq-example",
      "trap",
      "concept-drill",
    ]);
  });
});
