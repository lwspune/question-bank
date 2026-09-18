import { describe, it, expect } from "vitest";
import {
  fromQuestionRow,
  fromWorkedExample,
  fromBoardQuestion,
  fromReviewItem,
} from "@/lib/present/viewModel";
import type { QuestionRow } from "@/lib/questions/query";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import type { BoardQuestion } from "@/lib/board/query";
import type { ReviewItem } from "@/lib/mocks/service";

/**
 * Spec for the projection view-model — the pure seam between four surfaces that
 * each hold a DIFFERENT row shape (/browse + /questions, /notes + /guide,
 * /board, /mock review) and the one overlay that projects them onto a
 * classroom board.
 *
 * The load-bearing rule pinned here is the ANSWER one: the overlay reveals an
 * answer to a full classroom, so a key it cannot stand behind must come back
 * null rather than guessed. Two options flagged correct, zero options flagged,
 * or an officially-graced mock question are all "we don't know" — and a wrong
 * key projected at 2 metres is worse than no key at all.
 */

function makeQuestionRow(partial: Partial<QuestionRow> = {}): QuestionRow {
  return {
    id: "q-1",
    text: "If \\(|A| = 3\\) for a \\(3 \\times 3\\) matrix, find \\(|\\operatorname{adj} A|\\).",
    context: null,
    difficulty: "MODERATE",
    solution: null,
    imageUrl: null,
    solutionImageUrl: null,
    setId: null,
    questionNumber: null,
    pyqYear: null,
    pyqMonth: null,
    pyqNote: null,
    exam: { id: "e-1", name: "NDA" },
    subject: { id: "s-1", name: "Mathematics" },
    chapter: { id: "c-1", name: "Matrices and Determinants" },
    subtopic: { id: "st-1", name: "Adjoint and Inverse" },
    options: [
      { label: "A", text: "3", isCorrect: false, imageUrl: null },
      { label: "B", text: "9", isCorrect: true, imageUrl: null },
      { label: "C", text: "27", isCorrect: false, imageUrl: null },
      { label: "D", text: "81", isCorrect: false, imageUrl: null },
    ],
    ...partial,
  };
}

function makeWorkedExample(partial: Partial<WorkedExample> = {}): WorkedExample {
  return {
    id: "we-1",
    text: "Find the mean of the first ten natural numbers.",
    context: null,
    difficulty: "EASY",
    solution: "Mean = 55/10 = 5.5",
    chapter: "Statistics",
    subtopic: "Central Tendency",
    provenance: "Q110 · Sep · 2023",
    options: [
      { label: "A", text: "5", isCorrect: false },
      { label: "B", text: "5.5", isCorrect: true },
      { label: "C", text: "6", isCorrect: false },
      { label: "D", text: "6.5", isCorrect: false },
    ],
    ...partial,
  };
}

function makeBoardQuestion(partial: Partial<BoardQuestion> = {}): BoardQuestion {
  return {
    id: "b-1",
    questionNumber: "Q.3 (i)",
    text: "Prove that the given matrix is invertible.",
    context: null,
    solution: "Since \\(|A| \\neq 0\\), the inverse exists.",
    imageUrl: null,
    solutionImageUrl: null,
    format: "subjective",
    setId: null,
    options: [],
    ...partial,
  };
}

function makeReviewItem(partial: Partial<ReviewItem> = {}): ReviewItem {
  return {
    position: 7,
    sectionKey: "maths",
    text: "Evaluate the integral.",
    context: null,
    imageUrl: null,
    options: [
      { label: "A", text: "0", imageUrl: null, isCorrect: false },
      { label: "B", text: "1", imageUrl: null, isCorrect: true },
      { label: "C", text: "2", imageUrl: null, isCorrect: false },
      { label: "D", text: "3", imageUrl: null, isCorrect: false },
    ],
    format: "mcq",
    selectedLabel: "C",
    correctLabel: "B",
    numericResponse: null,
    correctNumeric: null,
    verdict: -1,
    solution: "Substitute \\(u = x^2\\).",
    solutionImageUrl: null,
    grace: false,
    ...partial,
  };
}

describe("fromQuestionRow (/browse + /questions)", () => {
  it("carries the stem, options and the single correct label", () => {
    const p = fromQuestionRow(makeQuestionRow());
    expect(p.key).toBe("q-1");
    expect(p.text).toContain("adj");
    expect(p.options.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(p.answer?.correctLabel).toBe("B");
  });

  it("always names the exam in the breadcrumb — a projected question has no filter bar for context", () => {
    const p = fromQuestionRow(makeQuestionRow());
    expect(p.breadcrumb).toBe("NDA → Mathematics → Matrices and Determinants → Adjoint and Inverse");
  });

  it("appends the PYQ provenance to the breadcrumb when the row carries it", () => {
    const p = fromQuestionRow(
      makeQuestionRow({ questionNumber: "42", pyqMonth: "Sep", pyqYear: 2023 })
    );
    expect(p.breadcrumb).toBe(
      "NDA → Mathematics → Matrices and Determinants → Adjoint and Inverse · Q42 · Sep · 2023"
    );
  });

  it("treats a row with no questionFormat as an MCQ (hand-built fixtures omit it)", () => {
    const p = fromQuestionRow(makeQuestionRow({ questionFormat: undefined }));
    expect(p.options).toHaveLength(4);
    expect(p.answer?.correctLabel).toBe("B");
  });

  it("renders a subjective question with zero options and the model answer", () => {
    const p = fromQuestionRow(
      makeQuestionRow({
        questionFormat: "subjective",
        options: [],
        solution: "The model answer.",
      })
    );
    expect(p.options).toEqual([]);
    expect(p.answer?.correctLabel).toBeNull();
    expect(p.answer?.solution).toBe("The model answer.");
  });

  it("surfaces the exact value for a numeric (NAT) question", () => {
    const p = fromQuestionRow(
      makeQuestionRow({ questionFormat: "numeric", options: [], numericAnswer: 6.25 })
    );
    expect(p.options).toEqual([]);
    expect(p.answer?.numericAnswer).toBe(6.25);
    expect(p.answer?.correctLabel).toBeNull();
  });

  it("refuses to name a key when NO option is flagged correct", () => {
    const p = fromQuestionRow(
      makeQuestionRow({
        options: [
          { label: "A", text: "3", isCorrect: false, imageUrl: null },
          { label: "B", text: "9", isCorrect: false, imageUrl: null },
        ],
        solution: "Worked solution.",
      })
    );
    expect(p.answer?.correctLabel).toBeNull();
    // The solution still reveals — losing the letter must not lose the working.
    expect(p.answer?.solution).toBe("Worked solution.");
  });

  it("refuses to name a key when TWO options are flagged correct", () => {
    const p = fromQuestionRow(
      makeQuestionRow({
        options: [
          { label: "A", text: "3", isCorrect: true, imageUrl: null },
          { label: "B", text: "9", isCorrect: true, imageUrl: null },
        ],
        solution: "Worked solution.",
      })
    );
    expect(p.answer?.correctLabel).toBeNull();
    expect(p.answer?.solution).toBe("Worked solution.");
  });

  it("returns a null answer when there is nothing whatsoever to reveal", () => {
    const p = fromQuestionRow(
      makeQuestionRow({ options: [], solution: null, questionFormat: "subjective" })
    );
    expect(p.answer).toBeNull();
  });

  it("keeps option images, which a diagram-answer question needs on the board", () => {
    const p = fromQuestionRow(
      makeQuestionRow({
        options: [{ label: "A", text: "", isCorrect: true, imageUrl: "opt-a.png" }],
      })
    );
    expect(p.options[0].imageUrl).toBe("opt-a.png");
  });
});

describe("fromWorkedExample (/notes checkpoints + /guide)", () => {
  it("builds the breadcrumb from chapter, subtopic and provenance", () => {
    const p = fromWorkedExample(makeWorkedExample());
    expect(p.breadcrumb).toBe("Statistics → Central Tendency · Q110 · Sep · 2023");
    expect(p.answer?.correctLabel).toBe("B");
  });

  it("drops the missing segments rather than emitting empty separators", () => {
    const p = fromWorkedExample(makeWorkedExample({ subtopic: null, provenance: null }));
    expect(p.breadcrumb).toBe("Statistics");
  });

  it("has no images — the worked-example loader does not select them", () => {
    const p = fromWorkedExample(makeWorkedExample());
    expect(p.imageUrl).toBeNull();
    expect(p.options.every((o) => o.imageUrl === null)).toBe(true);
  });
});

describe("fromBoardQuestion (/board)", () => {
  it("projects a subjective textbook question with its model answer", () => {
    const p = fromBoardQuestion(makeBoardQuestion(), {
      chapter: "Matrices",
      sectionLabel: "Exercise 2.2",
    });
    expect(p.options).toEqual([]);
    expect(p.breadcrumb).toBe("Matrices → Exercise 2.2 · Q.3 (i)");
    expect(p.answer?.solution).toContain("inverse exists");
  });

  it("skips a missing section label and a missing book ref", () => {
    const p = fromBoardQuestion(makeBoardQuestion({ questionNumber: null }), {
      chapter: "Matrices",
      sectionLabel: null,
    });
    expect(p.breadcrumb).toBe("Matrices");
  });

  it("carries the solution diagram, which many board answers depend on", () => {
    const p = fromBoardQuestion(makeBoardQuestion({ solutionImageUrl: "sol-1.png" }), {
      chapter: "Matrices",
      sectionLabel: null,
    });
    expect(p.answer?.solutionImageUrl).toBe("sol-1.png");
  });
});

describe("fromReviewItem (/mock review)", () => {
  it("keys and labels by position — a review item carries no question id", () => {
    const p = fromReviewItem(makeReviewItem());
    expect(p.key).toBe("pos-7");
    expect(p.breadcrumb).toBe("Q7");
    expect(p.answer?.correctLabel).toBe("B");
  });

  it("shows NO key for an officially graced question — there is no correct option", () => {
    const p = fromReviewItem(makeReviewItem({ grace: true }));
    expect(p.answer?.correctLabel).toBeNull();
  });

  it("surfaces the numeric key for a JEE Section-B item", () => {
    const p = fromReviewItem(
      makeReviewItem({
        format: "numeric",
        options: [],
        correctLabel: null,
        correctNumeric: 12,
      })
    );
    expect(p.options).toEqual([]);
    expect(p.answer?.numericAnswer).toBe(12);
  });

  it("never leaks the student's own selection into the projection", () => {
    const p = fromReviewItem(makeReviewItem({ selectedLabel: "C" }));
    expect(JSON.stringify(p)).not.toContain("selected");
  });
});
