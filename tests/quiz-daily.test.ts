import { describe, it, expect } from "vitest";
import { defineDailyQuiz, fromAtom, type DailyQuizSpec } from "../scripts/quiz/daily";
import { buildImportPayload } from "../scripts/quiz/quizPayload";

const SPEC: DailyQuizSpec = {
  slug: "nda-test-1",
  exam: "NDA",
  subject: "Maths",
  title: "Test Daily",
  chapter: "Probability",
  questions: [
    {
      concept: "classical-probability",
      stem: "P(an ace) from 52 cards?",
      correct: "\\(\\dfrac{1}{13}\\)",
      distractors: ["\\(\\dfrac{1}{52}\\)", "\\(\\dfrac{1}{4}\\)", "\\(\\dfrac{4}{13}\\)"],
    },
    {
      concept: "complement",
      stem: "P(E') equals?",
      options: { A: "1-P(E)", B: "1+P(E)", C: "P(E)-1", D: "1/P(E)" },
      answer: "A",
    },
  ],
};

describe("defineDailyQuiz", () => {
  it("places correct+distractors and marks the right answer letter", () => {
    const quiz = defineDailyQuiz(SPEC);
    const q1 = quiz.questions[0];
    const opts = { A: q1.optionA, B: q1.optionB, C: q1.optionC, D: q1.optionD };
    expect(opts[q1.answer as "A"]).toBe("\\(\\dfrac{1}{13}\\)");
    expect(Object.values(opts).sort()).toEqual(
      ["\\(\\dfrac{1}{13}\\)", "\\(\\dfrac{1}{52}\\)", "\\(\\dfrac{1}{4}\\)", "\\(\\dfrac{4}{13}\\)"].sort()
    );
  });

  it("stamps provenance (conceptSlug + chapter) onto every question", () => {
    const quiz = defineDailyQuiz(SPEC);
    expect(quiz.questions[0].conceptSlug).toBe("classical-probability");
    expect(quiz.questions[0].chapter).toBe("Probability");
    expect(quiz.questions.map((q) => q.q)).toEqual([1, 2]);
  });

  it("honors the explicit options form unchanged", () => {
    const quiz = defineDailyQuiz(SPEC);
    expect(quiz.questions[1].optionA).toBe("1-P(E)");
    expect(quiz.questions[1].answer).toBe("A");
  });

  it("produces a quiz that passes buildImportPayload", () => {
    const out = buildImportPayload(defineDailyQuiz(SPEC));
    expect(out.status).toBe("draft");
    expect(out.questions).toHaveLength(2);
  });

  it("is deterministic — same spec yields identical option placement", () => {
    expect(defineDailyQuiz(SPEC)).toEqual(defineDailyQuiz(SPEC));
  });

  it("throws when a question lacks both forms", () => {
    expect(() =>
      defineDailyQuiz({ ...SPEC, questions: [{ concept: "x", stem: "?" }] })
    ).toThrow(/correct.*distractors|options.*answer/i);
  });
});

describe("fromAtom", () => {
  it("converts a finalized auto atom into a question spec", () => {
    const spec = fromAtom({
      conceptSlug: "tissues",
      subtopicSlug: "tissues",
      stem: 'Which Function corresponds to Tissue "Epithelial"?',
      correct: "Covering and lining",
      options: { A: "Support", B: "Covering and lining", C: "Contraction", D: "Signalling" },
      answer: "B",
    });
    expect(spec.concept).toBe("tissues");
    expect(spec.answer).toBe("B");
  });

  it("refuses an atom whose distractors were never finalized", () => {
    expect(() =>
      fromAtom({
        conceptSlug: "c",
        subtopicSlug: "s",
        stem: "How many outcomes for two dice?",
        correct: "36",
        options: null,
        answer: null,
      })
    ).toThrow(/finalize|verify/i);
  });
});
