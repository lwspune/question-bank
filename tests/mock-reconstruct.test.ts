import { describe, it, expect } from "vitest";
import { NDA_MATHS_PAPER } from "@/lib/mocks/blueprints";
import {
  mockSlug,
  mockTitle,
  orderPaperRows,
  validatePaperRows,
  buildMockPaper,
  type PaperQuestionRow,
} from "@/lib/mocks/reconstruct";
import { slugToUuid } from "@/lib/quiz/quizPayload";

// 120 well-formed Mathematics rows, deliberately shuffled + with text
// question_number ("1","10","100") to prove we sort numerically, not lexically.
function mathsRows(count = 120): PaperQuestionRow[] {
  const rows: PaperQuestionRow[] = [];
  for (let i = 1; i <= count; i++) {
    rows.push({
      id: `q-${i}`,
      sourceRow: i + 1, // Excel row 1 is the header, so q1 → source_row 2
      questionNumber: String(i),
      subjectName: "Mathematics",
      answer: (["A", "B", "C", "D"] as const)[i % 4],
    });
  }
  // shuffle to prove ordering is derived, not input order
  return rows.sort((a, b) => (a.id < b.id ? 1 : -1));
}

describe("mockSlug", () => {
  it("builds a stable slug from exam/year/month/code", () => {
    expect(mockSlug("nda", 2024, "Sep", "maths")).toBe("nda-2024-sep-maths");
    expect(mockSlug("nda", 2024, "Apr", "maths")).toBe("nda-2024-apr-maths");
  });
  it("omits the month segment when there is no month", () => {
    expect(mockSlug("nda", 2020, null, "maths")).toBe("nda-2020-maths");
  });
});

describe("mockTitle", () => {
  it("labels NDA April as edition I and September as edition II", () => {
    expect(mockTitle(NDA_MATHS_PAPER, 2024, "Apr")).toBe(
      "NDA 2024 (I) — Paper I — Mathematics"
    );
    expect(mockTitle(NDA_MATHS_PAPER, 2024, "Sep")).toBe(
      "NDA 2024 (II) — Paper I — Mathematics"
    );
  });
});

describe("orderPaperRows", () => {
  it("orders by source_row numerically (1,2,...100), not lexically", () => {
    const ordered = orderPaperRows(mathsRows(120));
    expect(ordered.map((r) => r.id)).toEqual(
      Array.from({ length: 120 }, (_, i) => `q-${i + 1}`)
    );
  });

  it("falls back to numeric question_number when source_row is null", () => {
    const rows: PaperQuestionRow[] = [
      { id: "b", sourceRow: null, questionNumber: "10", subjectName: "Mathematics", answer: "A" },
      { id: "a", sourceRow: null, questionNumber: "2", subjectName: "Mathematics", answer: "B" },
    ];
    expect(orderPaperRows(rows).map((r) => r.id)).toEqual(["a", "b"]);
  });
});

describe("validatePaperRows", () => {
  it("passes a complete, well-formed 120-question paper", () => {
    expect(validatePaperRows(NDA_MATHS_PAPER, mathsRows(120))).toEqual([]);
  });

  it("flags a wrong question count", () => {
    const issues = validatePaperRows(NDA_MATHS_PAPER, mathsRows(119));
    expect(issues.some((m) => /120/.test(m) && /119/.test(m))).toBe(true);
  });

  it("flags a row with no correct answer", () => {
    const rows = mathsRows(120);
    rows[0].answer = null;
    const issues = validatePaperRows(NDA_MATHS_PAPER, rows);
    expect(issues.some((m) => /answer/i.test(m))).toBe(true);
  });

  it("flags a row whose subject maps to no section", () => {
    const rows = mathsRows(120);
    rows[0].subjectName = "Physics";
    const issues = validatePaperRows(NDA_MATHS_PAPER, rows);
    expect(issues.some((m) => /section|Physics/i.test(m))).toBe(true);
  });

  it("flags duplicate ordering keys", () => {
    const rows = mathsRows(120);
    rows[1].sourceRow = rows[0].sourceRow;
    const issues = validatePaperRows(NDA_MATHS_PAPER, rows);
    expect(issues.some((m) => /duplicate/i.test(m))).toBe(true);
  });
});

describe("buildMockPaper", () => {
  it("produces a deterministic, ordered, self-consistent snapshot", () => {
    const snap = buildMockPaper(NDA_MATHS_PAPER, mathsRows(120), {
      year: 2024,
      month: "Sep",
    });
    expect(snap.slug).toBe("nda-2024-sep-maths");
    expect(snap.id).toBe(slugToUuid("nda-2024-sep-maths"));
    expect(snap.totalQuestions).toBe(120);
    expect(snap.totalMarks).toBe(300);
    expect(snap.durationSecs).toBe(9000);
    expect(snap.questions).toHaveLength(120);
    // positions are 1..120 contiguous, in paper order
    expect(snap.questions.map((q) => q.position)).toEqual(
      Array.from({ length: 120 }, (_, i) => i + 1)
    );
    expect(snap.questions[0].questionId).toBe("q-1");
    expect(snap.questions[119].questionId).toBe("q-120");
    // every question carries the section marking
    expect(snap.questions[0]).toMatchObject({
      sectionKey: "mathematics",
      marks: 2.5,
      negMarks: -0.83,
    });
  });

  it("throws when the paper is incomplete", () => {
    expect(() =>
      buildMockPaper(NDA_MATHS_PAPER, mathsRows(118), { year: 2024, month: "Sep" })
    ).toThrow();
  });
});
