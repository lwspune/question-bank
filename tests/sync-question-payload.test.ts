import { describe, expect, it } from "vitest";
import { buildQuestionPayload } from "@/lib/sync/questionPayload";
import type { QuestionRow } from "@/lib/questions/query";
import type { Difficulty } from "@/lib/questions/filters";

const SB = "https://wunv.supabase.co";
const ID = "11111111-1111-4111-8111-111111111111";

function q(over: Partial<QuestionRow> = {}): QuestionRow {
  return {
    id: ID,
    text: "find a.b",
    context: null,
    difficulty: "MODERATE" as Difficulty,
    solution: "because",
    imageUrl: null,
    solutionImageUrl: null,
    setId: null,
    questionNumber: null,
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    exam: { id: "e", name: "NDA" },
    subject: { id: "s", name: "Mathematics" },
    chapter: { id: "c", name: "Vectors" },
    subtopic: { id: "st", name: "Dot Product" },
    options: (["A", "B", "C", "D"] as const).map((label) => ({
      label,
      text: `${label}-text`,
      isCorrect: label === "B",
      imageUrl: null,
    })),
    ...over,
  } as QuestionRow;
}

describe("buildQuestionPayload — the shape nda-tracker stores", () => {
  it("uses the tracker's field names and subject key", () => {
    const p = buildQuestionPayload(q(), { supabaseUrl: SB });
    expect(p.questionId).toBe(ID);
    expect(p.subject).toBe("Maths"); // Mathematics -> Maths
    expect(p.chapter).toBe("Vectors");
    expect(p.subtopic).toBe("Dot Product");
    expect(p.question).toBe("find a.b");
    expect(p.optionB).toBe("B-text");
    expect(p.answer).toBe("B");
    expect(p.difficulty).toBe("Moderate");
  });

  it("uses null for absent, never the empty string", () => {
    const p = buildQuestionPayload(q({ solution: null }), { supabaseUrl: SB });
    expect(p.solution).toBeNull();
    expect(p.context).toBeNull();
    expect(p.imageUrl).toBeNull();
    expect(p.subtopicSlug).toBeNull();
  });

  it("answer is null when no option is flagged correct", () => {
    const opts = q().options.map((o) => ({ ...o, isCorrect: false }));
    expect(buildQuestionPayload(q({ options: opts }), { supabaseUrl: SB }).answer).toBeNull();
  });

  it("defaults a missing subtopic to General, like the sheet does", () => {
    expect(buildQuestionPayload(q({ subtopic: null }), { supabaseUrl: SB }).subtopic).toBe("General");
  });
});

describe("buildQuestionPayload — images become ABSOLUTE urls", () => {
  // The DB stores a storage PATH; the vault's own UI wraps it at render time.
  // The tracker must store something it can render without knowing our host.
  it("resolves the question image path to a public url", () => {
    const p = buildQuestionPayload(q({ imageUrl: "org/abc.png" }), { supabaseUrl: SB });
    expect(p.imageUrl).toBe(`${SB}/storage/v1/object/public/question-images/org/abc.png`);
  });

  it("resolves the solution image too", () => {
    const p = buildQuestionPayload(q({ solutionImageUrl: "org/sol.png" }), { supabaseUrl: SB });
    expect(p.solutionImageUrl).toContain("/question-images/org/sol.png");
  });

  it("resolves per-option images and keeps absent ones null", () => {
    const opts = q().options.map((o) =>
      o.label === "C" ? { ...o, imageUrl: "org/c.png" } : o
    );
    const p = buildQuestionPayload(q({ options: opts }), { supabaseUrl: SB });
    expect(p.optionImages.C).toContain("/question-images/org/c.png");
    expect(p.optionImages.A).toBeNull();
  });
});

describe("buildQuestionPayload — passthrough extras", () => {
  it("carries the notes slugs when a concept tag is supplied", () => {
    const p = buildQuestionPayload(q(), {
      supabaseUrl: SB,
      tag: { subtopicSlug: "vectors-dot-product", conceptSlug: "dot-product" },
    });
    expect(p.subtopicSlug).toBe("vectors-dot-product");
    expect(p.conceptSlug).toBe("dot-product");
  });

  it("takes an explicit context override (set siblings share the lead passage)", () => {
    const p = buildQuestionPayload(q({ context: "own" }), { supabaseUrl: SB, context: "shared passage" });
    expect(p.context).toBe("shared passage");
  });

  it("carries format and numericAnswer", () => {
    const p = buildQuestionPayload(
      q({ questionFormat: "numeric", numericAnswer: 3.5 }),
      { supabaseUrl: SB }
    );
    expect(p.format).toBe("numeric");
    expect(p.numericAnswer).toBe(3.5);
  });
});
