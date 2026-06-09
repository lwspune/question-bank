import { describe, it, expect } from "vitest";
import { buildSubmitResult, notesHrefFor } from "@/lib/quiz/submit";
import type { GradingData, GradingQuestion } from "@/lib/quiz/publicQuiz";

const q = (over: Partial<GradingQuestion>): GradingQuestion => ({
  q: 1, answer: "A", conceptSlug: "c", subjectRoute: "nda-maths",
  chapterSlug: "probability", subtopicSlug: "classical-probability-counting", ...over,
});

describe("notesHrefFor", () => {
  it("builds a /notes deep-link with the concept anchor", () => {
    expect(notesHrefFor(q({}))).toBe(
      "/notes/nda-maths/probability/classical-probability-counting#c"
    );
  });
  it("omits the anchor when concept is missing but path resolves", () => {
    expect(notesHrefFor(q({ conceptSlug: null }))).toBe(
      "/notes/nda-maths/probability/classical-probability-counting"
    );
  });
  it("returns null when the notes path can't be built", () => {
    expect(notesHrefFor(q({ subtopicSlug: null }))).toBeNull();
    expect(notesHrefFor(q({ subjectRoute: null }))).toBeNull();
  });
});

describe("buildSubmitResult", () => {
  const grading: GradingData = {
    quizId: "qz",
    marking: { correct: 1, wrong: 0 },
    questions: [
      q({ q: 1, answer: "A", conceptSlug: "c1" }),
      q({ q: 2, answer: "B", conceptSlug: "c2" }),
      q({ q: 3, answer: "C", subtopicSlug: null }), // unmapped notes link
    ],
  };

  it("grades, reveals the key, and maps notes links", () => {
    const r = buildSubmitResult(grading, { "1": "A", "2": "X", "3": "" }, true);
    expect(r).toMatchObject({ correct: 1, incorrect: 1, notAttempted: 1, score: 1, total: 3 });
    expect(r.responses).toEqual({ "1": 1, "2": -1, "3": 0 });
    expect(r.key).toEqual({ "1": "A", "2": "B", "3": "C" });
    expect(r.notesLinks["1"]).toContain("/notes/nda-maths/probability");
    expect(r.notesLinks["3"]).toBeNull();
    expect(r.billingLive).toBe(true);
  });

  it("passes billingLive=false through", () => {
    expect(buildSubmitResult(grading, {}, false).billingLive).toBe(false);
  });
});
