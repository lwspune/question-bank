/**
 * "Ask V about this question" (2026-10-19, study-partner Phase 1): what V is
 * shown of a question, and the rules the server keeps for it. 9 of ~50 real
 * askers wanted a question on their screen explained; V could only say "tap
 * Show solution". The scope agreed with the owner: V explains FROM the stored
 * solution and key, never works out its own answer, and a full explanation is
 * one of the day's free answers.
 */
import { describe, it, expect } from "vitest";
import {
  answerText,
  explainView,
  firstStep,
  hintView,
  pickSimilar,
  revealCheck,
  type VQuestion,
} from "@/lib/chat/questionTools";

function q(over: Partial<VQuestion> = {}): VQuestion {
  return {
    id: "q1",
    text: "If \\(x^2 = 9\\) and \\(x > 0\\), then \\(x\\) is",
    context: null,
    hasFigure: false,
    solution: "Take the square root of both sides: \\(x = \\pm 3\\).\nSince \\(x > 0\\), \\(x = 3\\).",
    format: "mcq",
    numericAnswer: null,
    options: [
      { label: "A", text: "-3", isCorrect: false },
      { label: "B", text: "3", isCorrect: true },
      { label: "C", text: "9", isCorrect: false },
      { label: "D", text: "0", isCorrect: false },
    ],
    exam: "NDA",
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    subtopic: "Nature of Roots",
    ...over,
  };
}

describe("firstStep", () => {
  it("is the solution's first line", () => {
    expect(firstStep("Take the square root.\nThen pick the positive one.")).toBe("Take the square root.");
  });

  it("cuts a long first line at a sentence end, within 300 characters", () => {
    const long = `${"Expand the bracket. ".repeat(30)}`;
    const s = firstStep(long)!;
    expect(s.length).toBeLessThanOrEqual(300);
    expect(s.endsWith(".")).toBe(true);
  });

  it("is null without a solution", () => {
    expect(firstStep(null)).toBeNull();
    expect(firstStep("   ")).toBeNull();
  });
});

describe("hintView", () => {
  it("shows the question and options and the first step, and never the answer", () => {
    const v = hintView(q());
    expect(v).toContain("If \\(x^2 = 9\\)");
    expect(v).toContain("(B) 3");
    expect(v).toContain("Take the square root of both sides");
    expect(v).not.toMatch(/correct|answer is|key/i);
    expect(v).not.toContain("Since \\(x > 0\\), \\(x = 3\\)");
  });

  it("names the chapter, so V can point at its notes", () => {
    expect(hintView(q())).toContain("NDA, Mathematics, Quadratic Equations (Nature of Roots)");
  });

  it("says when the question has a figure V cannot see", () => {
    expect(hintView(q({ hasFigure: true }))).toMatch(/has a figure you cannot see/);
  });
});

describe("explainView", () => {
  it("gives the key and the whole stored solution", () => {
    const v = explainView(q(), null);
    expect(v).toContain("Correct answer: (B) 3");
    expect(v).toContain("Since \\(x > 0\\), \\(x = 3\\).");
  });

  it("names the student's wrong pick, so V can start from it", () => {
    expect(explainView(q(), "A")).toContain("The student chose (A) -3, which is wrong.");
    expect(explainView(q(), "B")).toContain("The student chose (B) 3, which is right.");
  });

  it("says plainly when no worked solution is stored", () => {
    const v = explainView(q({ solution: null }), null);
    expect(v).toContain("No worked solution is stored");
    expect(v).toContain("Correct answer: (B) 3");
  });

  it("carries the passage of a set question", () => {
    expect(explainView(q({ context: "Read the passage. Rivers flood." }), null)).toContain("Passage: Read the passage. Rivers flood.");
  });
});

describe("answerText", () => {
  it("names the key of an MCQ, a numeric answer, and a written one", () => {
    expect(answerText(q())).toBe("(B) 3");
    expect(answerText(q({ format: "numeric", options: [], numericAnswer: 12.5 }))).toBe("12.5");
    expect(answerText(q({ format: "subjective", options: [] }))).toBe("the model answer in the solution");
  });

  it("does not invent a key when an MCQ has none marked", () => {
    expect(answerText(q({ options: q().options.map((o) => ({ ...o, isCorrect: false })) }))).toBe("not recorded");
  });
});

describe("revealCheck", () => {
  it("lets a pass holder or a day with no limit through without counting", () => {
    expect(revealCheck({ limit: null, todayIds: [], questionId: "q1" })).toEqual({ kind: "ok", counts: false });
  });

  it("does not count a question already opened today again", () => {
    expect(revealCheck({ limit: 30, todayIds: ["q1"], questionId: "q1" })).toEqual({ kind: "ok", counts: false });
  });

  it("counts a new question while answers are left", () => {
    expect(revealCheck({ limit: 30, todayIds: ["a", "b"], questionId: "q1" })).toEqual({ kind: "ok", counts: true });
  });

  it("stops at the limit", () => {
    const ids = Array.from({ length: 30 }, (_, i) => `x${i}`);
    expect(revealCheck({ limit: 30, todayIds: ids, questionId: "q1" })).toEqual({ kind: "limit", limit: 30 });
  });
});

describe("pickSimilar", () => {
  it("never picks the same question or one already opened today", () => {
    expect(pickSimilar(["q1", "q2", "q3"], new Set(["q1", "q2"]), () => 0)).toBe("q3");
  });

  it("is null when nothing is left", () => {
    expect(pickSimilar(["q1"], new Set(["q1"]), () => 0)).toBeNull();
  });

  it("varies the pick, so a second ask is a different question", () => {
    expect(pickSimilar(["a", "b", "c"], new Set(), () => 0)).toBe("a");
    expect(pickSimilar(["a", "b", "c"], new Set(), () => 0.99)).toBe("c");
  });
});
