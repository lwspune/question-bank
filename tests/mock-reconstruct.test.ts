import { describe, it, expect } from "vitest";
import {
  NDA_MATHS_PAPER,
  NEET_PAPER,
  CDS_ENGLISH_PAPER,
} from "@/lib/mocks/blueprints";
import {
  mockSlug,
  mockTitle,
  neetMockSlug,
  neetMockTitle,
  cdsMockSlug,
  cdsMockTitle,
  orderPaperRows,
  validatePaperRows,
  buildMockPaper,
  type PaperQuestionRow,
} from "@/lib/mocks/reconstruct";
import { slugToUuid } from "@/lib/quiz/quizPayload";

// A NEET sitting: Physics 1-N, Chemistry N+1..2N, then a CONTENT-MIXED Biology
// block (Botany + Zoology interleaved by source_row). Default 200-q layout.
function neetRows(per = 50): PaperQuestionRow[] {
  const rows: PaperQuestionRow[] = [];
  const push = (n: number, subject: string) =>
    rows.push({
      id: `q-${n}`,
      sourceRow: n,
      questionNumber: String(n),
      subjectName: subject,
      answer: (["A", "B", "C", "D"] as const)[n % 4],
    });
  for (let n = 1; n <= per; n++) push(n, "Physics");
  for (let n = per + 1; n <= 2 * per; n++) push(n, "Chemistry");
  // Biology: mostly Botany, a few Zoology interleaved (row 3 and 7 of the block).
  for (let n = 2 * per + 1; n <= 4 * per; n++) {
    const k = n - 2 * per;
    push(n, k % 4 === 3 ? "Zoology" : "Botany");
  }
  return rows.sort((a, b) => (a.id < b.id ? 1 : -1)); // shuffle
}

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

// A CDS English sitting: 120 rows, ONE bank subject, source_row clean 1..120.
function cdsRows(count = 120): PaperQuestionRow[] {
  const rows: PaperQuestionRow[] = [];
  for (let i = 1; i <= count; i++) {
    rows.push({
      id: `q-${i}`,
      sourceRow: i,
      questionNumber: String(i),
      subjectName: "English",
      answer: (["A", "B", "C", "D"] as const)[i % 4],
    });
  }
  return rows.sort((a, b) => (a.id < b.id ? 1 : -1)); // shuffle
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

describe("NEET reconstruction", () => {
  it("builds edition-aware slugs (no month; Re-NEET distinguished)", () => {
    expect(neetMockSlug(2024, false)).toBe("neet-2024");
    expect(neetMockSlug(2024, true)).toBe("neet-2024-re");
    expect(neetMockSlug(2021, false)).toBe("neet-2021");
  });

  it("titles regular vs re-examination sittings", () => {
    expect(neetMockTitle(2024, false)).toBe("NEET (UG) 2024");
    expect(neetMockTitle(2024, true)).toBe("Re-NEET (UG) 2024");
  });

  it("validates a NEET paper: Botany+Zoology both map to the Biology section", () => {
    // No hard per-section count for NEET; every row maps to a section, keys present.
    expect(validatePaperRows(NEET_PAPER, neetRows(50))).toEqual([]);
  });

  it("does NOT flag a NEET paper that is a couple of questions short (soft count)", () => {
    const rows = neetRows(50).slice(0, 198); // 198 of 200
    expect(validatePaperRows(NEET_PAPER, rows)).toEqual([]);
  });

  it("does not flag a grace row that has no answer key", () => {
    const rows = neetRows(50);
    const idx = rows.findIndex((r) => r.id === "q-93");
    rows[idx] = { ...rows[idx], answer: null, grace: true };
    expect(validatePaperRows(NEET_PAPER, rows)).toEqual([]);
  });

  it("still flags a non-grace row with no key", () => {
    const rows = neetRows(50);
    const idx = rows.findIndex((r) => r.id === "q-93");
    rows[idx] = { ...rows[idx], answer: null };
    expect(validatePaperRows(NEET_PAPER, rows).some((m) => /key|answer/i.test(m))).toBe(true);
  });

  it("orders Biology by source_row so Botany + Zoology interleave, and derives totals from actual rows", () => {
    const snap = buildMockPaper(NEET_PAPER, neetRows(50), {
      year: 2024,
      month: null,
      slug: neetMockSlug(2024, false),
      title: neetMockTitle(2024, false),
      durationSecs: 200 * 60,
    });
    expect(snap.slug).toBe("neet-2024");
    expect(snap.id).toBe(slugToUuid("neet-2024"));
    expect(snap.totalQuestions).toBe(200);
    expect(snap.totalMarks).toBe(800); // 200 * +4
    expect(snap.durationSecs).toBe(200 * 60);
    // positions are 1..200 contiguous, matching the source numbering
    expect(snap.questions.map((q) => q.position)).toEqual(
      Array.from({ length: 200 }, (_, i) => i + 1)
    );
    // the Biology block (positions 101..200) is ordered by source_row: q-101..q-200
    expect(snap.questions[100].questionId).toBe("q-101");
    expect(snap.questions[199].questionId).toBe("q-200");
    // Physics first, Biology last
    expect(snap.questions[0].sectionKey).toBe("physics");
    expect(snap.questions[199].sectionKey).toBe("biology");
  });

  it("carries the grace flag onto the snapshot question", () => {
    const rows = neetRows(50);
    const idx = rows.findIndex((r) => r.id === "q-93");
    rows[idx] = { ...rows[idx], grace: true };
    const snap = buildMockPaper(NEET_PAPER, rows, {
      year: 2022,
      month: null,
      slug: neetMockSlug(2022, false),
      title: neetMockTitle(2022, false),
      durationSecs: 200 * 60,
    });
    const graced = snap.questions.find((q) => q.questionId === "q-93");
    expect(graced?.grace).toBe(true);
    // a normal question carries no grace flag
    expect(snap.questions.find((q) => q.questionId === "q-1")?.grace).toBeUndefined();
  });
});

describe("CDS reconstruction", () => {
  it("builds edition-aware slugs and titles", () => {
    expect(cdsMockSlug(2026, "I")).toBe("cds-2026-i-english");
    expect(cdsMockSlug(2017, "II")).toBe("cds-2017-ii-english");
    expect(cdsMockTitle(2026, "I")).toBe("CDS (I) 2026 — English");
    expect(cdsMockTitle(2025, "II")).toBe("CDS (II) 2025 — English");
  });

  /**
   * THE COLLISION GUARD. `pyq_month` is NULL on every CDS row, so the generic
   * mockSlug() produces the SAME slug for the I and II sittings of one year —
   * and because the mock id is slugToUuid(slug), the second upsert would
   * SILENTLY OVERWRITE the first. cdsMockSlug must separate them.
   */
  it("gives the two same-year sittings distinct slugs AND distinct ids", () => {
    // The collision the generic helper would produce (month is null for both):
    expect(mockSlug("cds", 2025, null, "english")).toBe(
      mockSlug("cds", 2025, null, "english")
    );

    const one = cdsMockSlug(2025, "I");
    const two = cdsMockSlug(2025, "II");
    expect(one).not.toBe(two);
    expect(slugToUuid(one)).not.toBe(slugToUuid(two));
  });

  it("builds a 120-question, 100-mark, single-section snapshot", () => {
    const snap = buildMockPaper(CDS_ENGLISH_PAPER, cdsRows(120), {
      year: 2026,
      month: null,
      slug: cdsMockSlug(2026, "I"),
      title: cdsMockTitle(2026, "I"),
    });
    expect(snap.slug).toBe("cds-2026-i-english");
    expect(snap.id).toBe(slugToUuid("cds-2026-i-english"));
    expect(snap.title).toBe("CDS (I) 2026 — English");
    expect(snap.pyqMonth).toBeNull();
    expect(snap.totalQuestions).toBe(120);
    expect(snap.totalMarks).toBe(100); // 120 * 0.8333, rounded off the float drift
    expect(snap.durationSecs).toBe(120 * 60);
    expect(snap.sections).toEqual([
      { key: "english", label: "English", count: 120 },
    ]);
    expect(snap.questions).toHaveLength(120);
    expect(snap.questions.map((q) => q.position)).toEqual(
      Array.from({ length: 120 }, (_, i) => i + 1)
    );
    // ordered by source_row despite the shuffled input
    expect(snap.questions[0].questionId).toBe("q-1");
    expect(snap.questions[119].questionId).toBe("q-120");
    expect(snap.questions[0]).toMatchObject({
      sectionKey: "english",
      marks: 0.8333,
      negMarks: -0.2778,
    });
  });

  it("rejects a short paper — 120 is a HARD count contract", () => {
    expect(() =>
      buildMockPaper(CDS_ENGLISH_PAPER, cdsRows(119), {
        year: 2026,
        month: null,
        slug: cdsMockSlug(2026, "I"),
      })
    ).toThrow(/120/);
  });
});
