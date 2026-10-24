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
  parseAskedQuestion,
  matchPasted,
  explainView,
  firstStep,
  hintView,
  originLine,
  pickSimilar,
  revealCheck,
  type VQuestion,
} from "@/lib/chat/questionTools";
import { searchWordsOf } from "@/lib/chat/questionToolsServer";
import { DAILY_REVEAL_SURFACES } from "@/lib/questions/revealQuota";

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
    subtopicId: "s1",
    origin: null,
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

// 2026-10-24: a student asked "Which yrs ques is this" and V said it could not tell, though the bank knew (8 Apr 2023).
describe("originLine", () => {
  const base = { examName: "JEE Mains", questionNumber: null, pyqYear: 2023, pyqMonth: null, pyqNote: "8 Apr 2023" };

  it("names a past-year question's paper with the card's own label", () => {
    expect(originLine({ ...base, kind: "pyq" })).toBe("From the past paper: 8 Apr 2023 · 2023.");
    expect(originLine({ ...base, kind: "pyq", questionNumber: "12" })).toBe("From the past paper: Q12 · 8 Apr 2023 · 2023.");
  });

  it("uses the month for NDA, as the card does", () => {
    expect(originLine({ ...base, examName: "NDA", pyqMonth: "Apr", pyqNote: null, kind: "pyq" })).toBe(
      "From the past paper: Apr · 2023."
    );
  });

  it("says when a past-year question's year is not recorded", () => {
    expect(originLine({ ...base, kind: "pyq", pyqYear: null, pyqNote: null })).toBe(
      "A past-year question; its paper and year are not recorded."
    );
    expect(originLine({ ...base, kind: "pyq", pyqYear: null, questionNumber: "4" })).toBe(
      "From the past paper: Q4 · 8 Apr 2023 (its year is not recorded)."
    );
  });

  it("calls a practice question a practice question, and never prints its source note", () => {
    const line = originLine({ ...base, kind: "practice", pyqNote: "Oswaal sample paper" });
    expect(line).toBe("A practice question, not from a past paper.");
  });

  it("says nothing when the kind is unknown", () => {
    expect(originLine({ ...base, kind: null })).toBeNull();
  });
});

describe("what V is shown of a question's paper", () => {
  it("is in the hint and the explanation, so 'which year?' needs no free answer", () => {
    const origin = "From the past paper: 8 Apr 2023 · 2023.";
    expect(hintView(q({ origin }))).toContain(origin);
    expect(explainView(q({ origin }), null)).toContain(origin);
  });

  it("adds no line when there is none", () => {
    expect(hintView(q())).not.toMatch(/past paper|practice question/i);
  });
});

describe("explainView", () => {
  it("gives the key and the whole solution, labelled in the student's words", () => {
    const v = explainView(q(), null);
    expect(v).toContain("Correct answer: (B) 3");
    // The student hears what V reads: "Solution", not our word "stored" (2026-10-23).
    expect(v).toContain("Solution:");
    expect(v).not.toMatch(/stored/i);
    expect(v).toContain("Since \\(x > 0\\), \\(x = 3\\).");
  });

  it("names the student's wrong pick, so V can start from it", () => {
    expect(explainView(q(), "A")).toContain("The student chose (A) -3, which is wrong.");
    expect(explainView(q(), "B")).toContain("The student chose (B) 3, which is right.");
  });

  it("says plainly when no worked solution is stored", () => {
    const v = explainView(q({ solution: null }), null);
    expect(v).toContain("No worked solution for this question");
    expect(v).not.toMatch(/stored/i);
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

// A V explanation is one of the day's free answers (owner, 2026-10-19): the count must include it.
describe("the day's free answers", () => {
  it("count V's explanations with the bank, board and guide reveals", () => {
    expect(DAILY_REVEAL_SURFACES).toContain("v");
    for (const s of ["bank", "board", "guide"]) expect(DAILY_REVEAL_SURFACES).toContain(s);
  });
});

// Text pasted from a rendered page: "8 · Integration by Substitution Find : ∫ cot ⁡ x sin ⁡ x cos ⁡ x d x ... give me pure ans".
describe("searchWordsOf", () => {
  it("keeps the longest real words and drops the maths debris", () => {
    const words = searchWordsOf("Find the combined equation of pair of lines passing through (2, 3) and perpendicular to 3x+2y−1=0", 4);
    expect(words).toEqual(["perpendicular", "combined", "equation", "passing"]);
  });

  it("ignores short tokens such as cot, sin and d x", () => {
    expect(searchWordsOf("∫ cot ⁡ x sin ⁡ x cos ⁡ x d x integration substitution", 6)).toEqual(["substitution", "integration"]);
  });
});

describe("parseAskedQuestion", () => {
  const ID = "11111111-1111-4111-8111-111111111111";
  it("reads the tapped question and the student's pick", () => {
    expect(parseAskedQuestion({ id: ID, chose: "b" })).toEqual({ id: ID, chose: "B" });
    expect(parseAskedQuestion({ id: ID })).toEqual({ id: ID, chose: null });
  });

  it("drops anything that is not a question id, and a pick that is not an option letter", () => {
    expect(parseAskedQuestion({ id: "x" })).toBeNull();
    expect(parseAskedQuestion(null)).toBeNull();
    expect(parseAskedQuestion("q1")).toBeNull();
    expect(parseAskedQuestion({ id: ID, chose: "F" })).toEqual({ id: ID, chose: null });
    // IMAT prints five options, so E is a real pick.
    expect(parseAskedQuestion({ id: ID, chose: "e" })).toEqual({ id: ID, chose: "E" });
  });
});

// 2026-10-19 check: a pasted, maths-heavy stem found nothing, and word search attached a DIFFERENT question.
describe("matchPasted", () => {
  const stems = [
    { id: "a", text: "The value of \\(\\int x^{x}(1+\\log x)\\,dx\\) is equal to" },
    { id: "b", text: "\\(\\int \\cos^{-\\frac{3}{7}}x\\,\\sin^{-\\frac{11}{7}}x\\,dx =\\)" },
    { id: "c", text: "Find \\(\\int \\frac{\\cot x}{\\sin x \\cos x}\\,dx\\)" },
    { id: "d", text: "Evaluate \\(\\int e^{x}(\\sin x + \\cos x)\\,dx\\)" },
  ];

  it("finds a stem pasted from the rendered page, maths debris and all", () => {
    expect(matchPasted("The value of ( int x x (1 + logx)dx ) is equal to . give me pure ans", stems)[0]).toBe("a");
    expect(matchPasted("8 · Integration by Substitution Find : ∫ cot ⁡ x sin ⁡ x cos ⁡ x d x give me pure ans", stems)[0]).toBe("c");
  });

  it("returns nothing for text that is no stem in the chapter", () => {
    expect(matchPasted("how do I study for the board exam in less time", stems)).toEqual([]);
  });

  // A copy of a rendered fraction can come out denominator first (3/7 as "73"), and a short stem
  // such as \int\cos^7 x\,dx is "mostly contained" in any long paste: the bigger overlap wins.
  it("ranks by how much is shared, so a short stem inside a long paste does not win, and reads digits in any order", () => {
    const withDecoy = [...stems, { id: "short", text: "\\(\\int \\cos^7 x\\, dx\\)" }];
    expect(matchPasted("∫cos−73​xsin−711​xdx give answer", withDecoy)[0]).toBe("b");
  });
});
