import { describe, it, expect } from "vitest";
import { BOARD_QUESTION_COLUMNS, asBilingual, mapBoardQuestion, type RawBoardQuestion } from "@/lib/board/query";
import { usableVisual } from "@/lib/visuals/visual";
import { ROTATION_VISUAL } from "./fixtures/visuals";

const raw = (over: Partial<RawBoardQuestion> = {}): RawBoardQuestion => ({
  id: "q1",
  question_number: "Q1(A)(i)",
  text: "Rate of GST on essential commodities is ____.",
  context: null,
  solution: "Exempt, so 0%. Correct option: C.",
  image_url: null,
  solution_image_url: null,
  question_format: "mcq",
  set_id: null,
  options: [
    { label: "B", text: "12%", is_correct: false, image_url: null },
    { label: "A", text: "5%", is_correct: false, image_url: null },
    { label: "D", text: "18%", is_correct: false, image_url: null },
    { label: "C", text: "0%", is_correct: true, image_url: null },
  ],
  ...over,
});

describe("mapBoardQuestion", () => {
  it("maps the row and puts options in A-D order", () => {
    const q = mapBoardQuestion(raw());
    expect(q.questionNumber).toBe("Q1(A)(i)");
    expect(q.options.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(q.options.find((o) => o.isCorrect)?.label).toBe("C");
  });

  it("leaves an English-only question without a translations key", () => {
    expect("translations" in mapBoardQuestion(raw())).toBe(false);
    expect("translations" in mapBoardQuestion(raw({ question_translations: [] }))).toBe(false);
  });

  it("attaches the Marathi print, options matched by label", () => {
    const q = mapBoardQuestion(
      raw({
        question_translations: [{ lang: "mr", text: "जीवनावश्यक वस्तूवरील कराचा दर ____ आहे.", context: null, solution: "योग्य पर्याय: C." }],
        options: [
          { label: "C", text: "0%", is_correct: true, image_url: null, option_translations: [{ lang: "mr", text: "0%" }] },
          { label: "A", text: "5%", is_correct: false, image_url: null, option_translations: [{ lang: "mr", text: "5%" }] },
        ],
      }),
    );
    expect(q.translations?.mr?.text).toMatch(/जीवनावश्यक/);
    expect(q.translations?.mr?.solution).toBe("योग्य पर्याय: C.");
    expect(q.translations?.mr?.options).toEqual({ A: "5%", C: "0%" });
  });

  it("attaches an animated solution that passes its check", () => {
    const q = mapBoardQuestion(raw({ solution_visual: ROTATION_VISUAL }));
    expect(q.solutionVisual).not.toBeNull();
    expect(q.solutionVisual).toEqual(usableVisual(ROTATION_VISUAL));
  });

  it("adds no solutionVisual key when there is no visual, or one that fails its check", () => {
    expect("solutionVisual" in mapBoardQuestion(raw())).toBe(false);
    expect("solutionVisual" in mapBoardQuestion(raw({ solution_visual: null }))).toBe(false);
    expect("solutionVisual" in mapBoardQuestion(raw({ solution_visual: { scene: "no-such-scene" } }))).toBe(false);
  });
});

describe("asBilingual", () => {
  it("hands the bilingual components the stem, context, options and Marathi", () => {
    const q = mapBoardQuestion(
      raw({
        context: "Passage",
        question_translations: [{ lang: "mr", text: "प्रश्न", context: "उतारा", solution: null }],
      }),
    );
    const b = asBilingual(q);
    expect(b.text).toBe(q.text);
    expect(b.context).toBe("Passage");
    expect(b.options).toEqual([
      { label: "A", text: "5%" },
      { label: "B", text: "12%" },
      { label: "C", text: "0%" },
      { label: "D", text: "18%" },
    ]);
    expect(b.translations?.mr?.context).toBe("उतारा");
  });
});

describe("BOARD_QUESTION_COLUMNS", () => {
  it("selects the Marathi question and option rows, or the readers silently lose them", () => {
    expect(BOARD_QUESTION_COLUMNS).toMatch(/question_translations\(lang, text, context, solution\)/);
    expect(BOARD_QUESTION_COLUMNS).toMatch(/options\([^)]*option_translations\(lang, text\)/);
  });

  it("selects the animated solution, or past papers never show one", () => {
    expect(BOARD_QUESTION_COLUMNS).toMatch(/\bsolution_visual\b/);
  });
});

// JEE Mains homework (2026-11-06): a numeric (Section B) question has no
// options. The reader has no number input, so like the mock paper page
// (lib/mocks/paperPage.ts) it shows as a written question whose reveal leads
// with the value, then the worked solution.
describe("mapBoardQuestion on a numeric question", () => {
  const numeric = (over: Partial<RawBoardQuestion> = {}) =>
    raw({ question_format: "numeric", options: [], solution: "Work it out.", numeric_answer: 12, numeric_answer_max: null, ...over });

  it("shows as a written question with no options", () => {
    const q = mapBoardQuestion(numeric());
    expect(q.format).toBe("subjective");
    expect(q.options).toEqual([]);
  });

  it("leads the reveal with the value, then the solution", () => {
    expect(mapBoardQuestion(numeric()).solution).toBe("**Answer: 12**\n\nWork it out.");
  });

  it("prints a range key as a range", () => {
    expect(mapBoardQuestion(numeric({ numeric_answer: 2.5, numeric_answer_max: 2.7 })).solution).toBe("**Answer: 2.5 to 2.7**\n\nWork it out.");
  });

  it("shows the value alone when there is no worked solution", () => {
    expect(mapBoardQuestion(numeric({ solution: null })).solution).toBe("**Answer: 12**");
  });

  it("loads the value with every reader's columns", () => {
    expect(BOARD_QUESTION_COLUMNS).toMatch(/numeric_answer, numeric_answer_max/);
  });

  it("leaves an MCQ's solution untouched", () => {
    expect(mapBoardQuestion(raw()).solution).toBe("Exempt, so 0%. Correct option: C.");
  });
});
