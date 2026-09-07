import { describe, it, expect } from "vitest";
import {
  NDA_MATHS_PAPER,
  NEET_PAPER,
  CDS_ENGLISH_PAPER,
  CDS_GK_PAPER,
  CDS_MATHS_PAPER,
  JEE_MAINS_PAPER,
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
import { jeeMockSlug, jeeMockTitle } from "@/lib/mocks/reconstruct";

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
      answer: { kind: "mcq", label: (["A", "B", "C", "D"] as const)[n % 4] },
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
      answer: { kind: "mcq", label: (["A", "B", "C", "D"] as const)[i % 4] },
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
      answer: { kind: "mcq", label: (["A", "B", "C", "D"] as const)[i % 4] },
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
      { id: "b", sourceRow: null, questionNumber: "10", subjectName: "Mathematics", answer: { kind: "mcq", label: "A" } },
      { id: "a", sourceRow: null, questionNumber: "2", subjectName: "Mathematics", answer: { kind: "mcq", label: "B" } },
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
    expect(cdsMockSlug(2026, "I", "english")).toBe("cds-2026-i-english");
    expect(cdsMockSlug(2017, "II", "english")).toBe("cds-2017-ii-english");
    expect(cdsMockTitle(2026, "I", "english")).toBe("CDS (I) 2026 — English");
    expect(cdsMockTitle(2025, "II", "english")).toBe("CDS (II) 2025 — English");
  });

  /**
   * THE ENGLISH SLUGS MUST NOT MOVE. 19 English mocks are already published and
   * their id is slugToUuid(slug); changing a slug mints a NEW id, so the old row
   * is orphaned along with every attempt against it while a duplicate appears
   * under the new id. Adding the `subject` parameter is only safe because the
   * english value reproduces the pre-existing string exactly — pinned here as a
   * literal rather than derived, so a later refactor of the helper cannot quietly
   * take the assertion with it.
   */
  it("keeps every published English slug byte-identical", () => {
    const published = [
      [2017, "I"], [2017, "II"], [2018, "I"], [2018, "II"], [2019, "I"],
      [2019, "II"], [2020, "I"], [2020, "II"], [2021, "I"], [2021, "II"],
      [2022, "I"], [2022, "II"], [2023, "I"], [2023, "II"], [2024, "I"],
      [2024, "II"], [2025, "I"], [2025, "II"], [2026, "I"],
    ] as const;
    const expected = [
      "cds-2017-i-english", "cds-2017-ii-english", "cds-2018-i-english",
      "cds-2018-ii-english", "cds-2019-i-english", "cds-2019-ii-english",
      "cds-2020-i-english", "cds-2020-ii-english", "cds-2021-i-english",
      "cds-2021-ii-english", "cds-2022-i-english", "cds-2022-ii-english",
      "cds-2023-i-english", "cds-2023-ii-english", "cds-2024-i-english",
      "cds-2024-ii-english", "cds-2025-i-english", "cds-2025-ii-english",
      "cds-2026-i-english",
    ];
    expect(published.map(([y, e]) => cdsMockSlug(y, e, "english"))).toEqual(expected);
  });

  it("gives each subject of one sitting a distinct slug, title and id", () => {
    // A shared sitting is the collision risk: same year, same edition, and
    // pyq_month is null for all three, so ONLY the subject separates them.
    const slugs = (["english", "gk", "maths"] as const).map((s) =>
      cdsMockSlug(2026, "I", s)
    );
    expect(slugs).toEqual(["cds-2026-i-english", "cds-2026-i-gk", "cds-2026-i-maths"]);
    // NB: not `slugs.map(slugToUuid)` — map passes (value, index, array) and
    // slugToUuid's second parameter is a namespace, so the index would be
    // silently taken as one.
    expect(new Set(slugs.map((sl) => slugToUuid(sl))).size).toBe(3);

    expect(cdsMockTitle(2026, "I", "gk")).toBe("CDS (I) 2026 — General Knowledge");
    expect(cdsMockTitle(2026, "I", "maths")).toBe(
      "CDS (I) 2026 — Elementary Mathematics"
    );
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

    const one = cdsMockSlug(2025, "I", "english");
    const two = cdsMockSlug(2025, "II", "english");
    expect(one).not.toBe(two);
    expect(slugToUuid(one)).not.toBe(slugToUuid(two));
  });

  it("builds a 120-question, 100-mark, single-section snapshot", () => {
    const snap = buildMockPaper(CDS_ENGLISH_PAPER, cdsRows(120), {
      year: 2026,
      month: null,
      slug: cdsMockSlug(2026, "I", "english"),
      title: cdsMockTitle(2026, "I", "english"),
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
        slug: cdsMockSlug(2026, "I", "english"),
      })
    ).toThrow(/120/);
  });
});

/**
 * CDS General Knowledge — the paper whose 120 items are filed across EIGHT bank
 * subjects because subject is a per-question decision in that pipeline, while the
 * printed booklet interleaves them and prints no subject heading anywhere.
 */
describe("CDS General Knowledge reconstruction", () => {
  const GK_SUBJECTS = [
    "Physics", "Chemistry", "Biology", "History",
    "Geography", "Polity", "Economics", "Current Affairs",
  ];

  // 120 rows with the eight subjects INTERLEAVED, exactly as the booklet prints
  // them — subject cycles per question, so no subject occupies a contiguous run.
  function gkRows(count = 120): PaperQuestionRow[] {
    const rows: PaperQuestionRow[] = [];
    for (let i = 1; i <= count; i++) {
      rows.push({
        id: `q-${i}`,
        sourceRow: i,
        questionNumber: String(i),
        subjectName: GK_SUBJECTS[i % GK_SUBJECTS.length],
        answer: { kind: "mcq", label: (["A", "B", "C", "D"] as const)[i % 4] },
      });
    }
    return rows.sort((a, b) => (a.id < b.id ? 1 : -1)); // shuffle
  }

  it("maps all eight bank subjects to the single section", () => {
    expect(validatePaperRows(CDS_GK_PAPER, gkRows(120))).toEqual([]);
  });

  /**
   * THE REASON GK IS ONE SECTION AND NOT EIGHT. reconstructPaper emits section by
   * section, so eight sections would group the paper into subject blocks — every
   * History question together — in an order no candidate ever sat. One section
   * preserves the printed interleaving via source_row. This asserts the ORDER,
   * which is the only thing that would catch the mistake; counts pass either way.
   */
  it("preserves printed order rather than grouping by subject", () => {
    const snap = buildMockPaper(CDS_GK_PAPER, gkRows(120), {
      year: 2026,
      month: null,
      slug: cdsMockSlug(2026, "I", "gk"),
      title: cdsMockTitle(2026, "I", "gk"),
    });
    expect(snap.questions.map((q) => q.questionId)).toEqual(
      Array.from({ length: 120 }, (_, i) => `q-${i + 1}`)
    );
    expect(snap.totalQuestions).toBe(120);
    expect(snap.totalMarks).toBe(100); // 120 × 0.8333, rounded off the float drift
    expect(snap.slug).toBe("cds-2026-i-gk");
  });

  it("flags a subject that is not one of the eight", () => {
    const rows = gkRows(120);
    rows[0].subjectName = "Mathematics"; // a real CDS subject, wrong paper
    expect(
      validatePaperRows(CDS_GK_PAPER, rows).some((m) => /section|Mathematics/i.test(m))
    ).toBe(true);
  });
});

describe("CDS Elementary Mathematics reconstruction", () => {
  function cdsMathsRows(count = 100): PaperQuestionRow[] {
    const rows: PaperQuestionRow[] = [];
    for (let i = 1; i <= count; i++) {
      rows.push({
        id: `q-${i}`,
        sourceRow: i,
        questionNumber: String(i),
        subjectName: "Mathematics",
        answer: { kind: "mcq", label: (["A", "B", "C", "D"] as const)[i % 4] },
      });
    }
    return rows.sort((a, b) => (a.id < b.id ? 1 : -1));
  }

  /**
   * Marking differs from English/GK and must not be copied from them: this paper
   * is 100 items for 100 marks (+1, −1/3), where those are 120 items for 100
   * marks (+0.8333, −0.2778).
   */
  it("is 100 questions for 100 marks at +1 / −0.3333", () => {
    const snap = buildMockPaper(CDS_MATHS_PAPER, cdsMathsRows(100), {
      year: 2026,
      month: null,
      slug: cdsMockSlug(2026, "I", "maths"),
      title: cdsMockTitle(2026, "I", "maths"),
    });
    expect(snap.totalQuestions).toBe(100);
    expect(snap.totalMarks).toBe(100);
    expect(snap.durationSecs).toBe(7200);
    expect(snap.questions[0]).toMatchObject({ marks: 1, negMarks: -0.3333 });
    expect(snap.title).toBe("CDS (I) 2026 — Elementary Mathematics");
  });

  /**
   * The HOLD contract. Three sittings are 98/99/99 because a question with no
   * correct printed option was dropped at assembly. The count is HARD so a short
   * paper REFUSES to build — that is what stops a fragment shipping labelled as
   * the real sitting.
   */
  it("refuses to build a short paper rather than shipping a fragment", () => {
    expect(validatePaperRows(CDS_MATHS_PAPER, cdsMathsRows(98)).length).toBeGreaterThan(0);
    expect(() =>
      buildMockPaper(CDS_MATHS_PAPER, cdsMathsRows(98), { year: 2018, month: null })
    ).toThrow();
  });
});

/**
 * JEE Mains — the first paper whose answers are not all option labels. Each
 * subject runs 20 MCQ (Section A) then 5 numeric (Section B), and the paper runs
 * Physics 1-25, Chemistry 26-50, Maths 51-75.
 */
function jeeRows(perSubject = 25, numericPer = 5): PaperQuestionRow[] {
  const rows: PaperQuestionRow[] = [];
  const subjects = ["Physics", "Chemistry", "Maths"];
  let n = 0;
  for (const subject of subjects) {
    for (let k = 1; k <= perSubject; k++) {
      n += 1;
      const isNumeric = k > perSubject - numericPer;
      rows.push({
        id: `q-${n}`,
        sourceRow: n,
        questionNumber: String(n),
        subjectName: subject,
        answer: isNumeric
          ? { kind: "numeric", value: n * 10 }
          : { kind: "mcq", label: (["A", "B", "C", "D"] as const)[n % 4] },
      });
    }
  }
  return rows;
}

describe("JEE Mains reconstruction", () => {
  it("builds a 75-question / 300-mark paper", () => {
    const snap = buildMockPaper(JEE_MAINS_PAPER, jeeRows(), {
      year: 2026,
      month: null,
      slug: jeeMockSlug("2026-jan-21-s1", JEE_MAINS_PAPER.code),
      title: jeeMockTitle(2026, "21 Jan, Shift 1", JEE_MAINS_PAPER),
    });
    expect(snap.totalQuestions).toBe(75);
    expect(snap.totalMarks).toBe(300);
    expect(snap.slug).toBe("jee-mains-2026-jan-21-s1-paper-1");
    expect(snap.title).toBe("JEE Mains 2026 (21 Jan, Shift 1) — Paper 1 (B.E./B.Tech)");
    expect(snap.id).toBe(slugToUuid(snap.slug));
  });

  /** Section order IS paper order: Physics must occupy positions 1-25. */
  it("places the subjects in printed order", () => {
    const snap = buildMockPaper(JEE_MAINS_PAPER, jeeRows(), {
      year: 2026, month: null, slug: "s", title: "t",
    });
    const keyAt = (pos: number) => snap.questions.find((q) => q.position === pos)!.sectionKey;
    expect(keyAt(1)).toBe("physics");
    expect(keyAt(25)).toBe("physics");
    expect(keyAt(26)).toBe("chemistry");
    expect(keyAt(50)).toBe("chemistry");
    expect(keyAt(51)).toBe("maths");
    expect(keyAt(75)).toBe("maths");
    expect(snap.questions.map((q) => q.position)).toEqual(
      Array.from({ length: 75 }, (_, i) => i + 1)
    );
  });

  /** A numeric key is a valid key: validatePaperRows must not read the union as
   *  "no answer" and refuse the 15 Section-B questions of every JEE paper. */
  it("accepts numeric answer keys", () => {
    expect(validatePaperRows(JEE_MAINS_PAPER, jeeRows())).toEqual([]);
  });

  it("marks every question +4 / -1, Section B included", () => {
    const snap = buildMockPaper(JEE_MAINS_PAPER, jeeRows(), {
      year: 2026, month: null, slug: "s", title: "t",
    });
    expect(snap.questions.every((q) => q.marks === 4 && q.negMarks === -1)).toBe(true);
  });

  /** A short paper is questions MISSING, not a layout variant — it must refuse
   *  rather than ship a 74-question fragment labelled as the real sitting. */
  it("refuses a paper short of 75 questions", () => {
    const short = jeeRows().slice(0, 74);
    expect(validatePaperRows(JEE_MAINS_PAPER, short).length).toBeGreaterThan(0);
    expect(() =>
      buildMockPaper(JEE_MAINS_PAPER, short, { year: 2026, month: null, slug: "s", title: "t" })
    ).toThrow();
  });

  /** The bank spells it "Maths"; a row arriving as "Mathematics" belongs to no
   *  section and must be reported, not silently dropped. */
  it("reports a row whose subject maps to no section", () => {
    const rows = jeeRows();
    rows[60] = { ...rows[60], subjectName: "Mathematics" };
    expect(
      validatePaperRows(JEE_MAINS_PAPER, rows).some((m) => /maps to no section/.test(m))
    ).toBe(true);
  });
});
