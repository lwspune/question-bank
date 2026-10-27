/**
 * V's "How's my progress" card (2026-10-27, owner): the button that replaced
 * "Plan my week". Built from the student's own numbers, never by the model.
 * Pure: every input is a literal.
 */
import { describe, it, expect } from "vitest";
import {
  buildProgressCard,
  progressRows,
  isEmptyCard,
  notesChaptersOf,
  pickProgressExams,
  weekWindows,
  type ProgressCardInput,
} from "@/lib/chat/progressCard";
import type { PerfAttempt, PerfFact, StudentPerformancePayload } from "@/lib/performance/types";
import type { StrategyData } from "@/lib/chat/examStrategy";

const DAY = 86_400_000;
// 2026-10-27 18:00 IST.
const NOW = new Date("2026-10-27T12:30:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * DAY).toISOString();

function attempt(id: string, over: Partial<PerfAttempt> = {}): PerfAttempt {
  return {
    attemptId: id,
    mockSlug: `mock-${id}`,
    mockTitle: `NDA mock ${id}`,
    examName: "NDA",
    paperCode: "maths",
    pyqYear: 2025,
    source: "pyq",
    scope: "full",
    sections: [{ key: "maths", label: "Mathematics", count: 4 }],
    totalQuestions: 4,
    totalMarks: 10,
    durationSecs: 9000,
    status: "submitted",
    startedAt: daysAgo(1),
    submittedAt: daysAgo(1),
    score: 5,
    maxScore: 10,
    ...over,
  };
}

/** One answered question. `c` indexes dims.chapters. */
function fact(a: string, q: string, c: number, ok: boolean): PerfFact {
  return { a, p: 1, q, s: 0, c, t: 0, d: "MODERATE", f: "mcq", k: "A", kn: null, r: ok ? "A" : "B", rn: null, g: false, m: 2.5, nm: -0.83, ts: 30, rc: true };
}

const CHAPTERS = ["Trigonometry", "Matrices", "Statistics"];

function payload(attempts: PerfAttempt[], facts: PerfFact[]): StudentPerformancePayload {
  return { userId: "u1", attempts, facts, dims: { subjects: ["Mathematics"], chapters: CHAPTERS, subtopics: ["All"] }, weightage: [] };
}

/** Four answers in one chapter of one attempt, `right` of them right. */
function four(a: string, c: number, right: number): PerfFact[] {
  return [0, 1, 2, 3].map((i) => fact(a, `${a}-${c}-${i}`, c, i < right));
}

const STRATEGY: StrategyData = {
  examName: "NDA",
  board: false,
  chapters: [
    { id: "trig", name: "Trigonometry", subject: "Mathematics", byYear: { "2023": 10, "2024": 10, "2025": 10 } },
    { id: "mat", name: "Matrices", subject: "Mathematics", byYear: { "2023": 5, "2024": 5, "2025": 10 } },
    { id: "stat", name: "Statistics", subject: "Mathematics", byYear: { "2023": 10, "2024": 10, "2025": 10 } },
  ],
};

function input(over: Partial<ProgressCardInput> = {}): ProgressCardInput {
  return {
    exam: { slug: "nda", examName: "NDA", displayName: "NDA" },
    now: NOW,
    daysLeft: null,
    practice: { week: { answered: 0, right: 0 }, prev: { answered: 0, right: 0 } },
    perf: null,
    drill: { fixed: 0, due: 0 },
    chapters: [
      { id: "trig", name: "Trigonometry", subject: "Mathematics", answered: 0 },
      { id: "mat", name: "Matrices", subject: "Mathematics", answered: 0 },
      { id: "stat", name: "Statistics", subject: "Mathematics", answered: 0 },
    ],
    strategy: STRATEGY,
    notesChapters: 0,
    ...over,
  };
}

describe("weekWindows", () => {
  it("is the last seven days in India, today included, and the seven before (0165's week)", () => {
    const w = weekWindows(NOW);
    // Midnight 21 Oct IST = 20 Oct 18:30 UTC.
    expect(w.weekStart.toISOString()).toBe("2026-10-20T18:30:00.000Z");
    expect(w.prevStart.toISOString()).toBe("2026-10-13T18:30:00.000Z");
  });
});

describe("buildProgressCard", () => {
  it("is empty for a student with nothing in this exam, so the window can say so", () => {
    const card = buildProgressCard(input());
    expect(isEmptyCard(card)).toBe(true);
    expect(progressRows(card)).toEqual([]);
  });

  it("adds mock answers of the week to practice answers, and gives the change in points", () => {
    const perf = payload([attempt("A1", { startedAt: daysAgo(2), submittedAt: daysAgo(2) })], four("A1", 0, 2));
    const card = buildProgressCard(
      input({ practice: { week: { answered: 16, right: 14 }, prev: { answered: 20, right: 10 } }, perf })
    );
    // 16 + 4 answered, 14 + 2 right = 80%; the week before 50%.
    expect(card.week).toEqual({ answered: 20, right: 16, pct: 80, changePoints: 30 });
  });

  it("gives no change when either week has under 10 answers: a swing on 4 answers means nothing", () => {
    const card = buildProgressCard(input({ practice: { week: { answered: 30, right: 20 }, prev: { answered: 6, right: 1 } } }));
    expect(card.week?.changePoints).toBeNull();
  });

  it("leaves a mock from before this week out of the week's answers", () => {
    const perf = payload([attempt("A1", { startedAt: daysAgo(10), submittedAt: daysAgo(10) })], four("A1", 0, 4));
    const card = buildProgressCard(input({ perf }));
    expect(card.week).toBeNull();
    expect(card.mocks?.taken).toBe(1);
  });

  it("lists the last three mock scores of THIS exam, oldest first", () => {
    const attempts = [
      attempt("A1", { startedAt: daysAgo(9), score: 4, maxScore: 10 }),
      attempt("A2", { startedAt: daysAgo(6), score: 5, maxScore: 10 }),
      attempt("A3", { startedAt: daysAgo(4), score: 6, maxScore: 10 }),
      attempt("A4", { startedAt: daysAgo(2), score: 7, maxScore: 10 }),
      attempt("C1", { examName: "CDS", startedAt: daysAgo(1), score: 1, maxScore: 10 }),
    ];
    const facts = attempts.flatMap((a) => four(a.attemptId, 0, 2));
    const card = buildProgressCard(input({ perf: payload(attempts, facts) }));
    expect(card.mocks).toEqual({ taken: 4, recent: [50, 60, 70] });
  });

  it("counts chapter bands by the mastery map and names a chapter that moved up this week", () => {
    // Trigonometry: 2 of 4 before this week (getting there), then 4 of 4 twice this week (weighted towards recent) -> up.
    // Matrices: 4 of 4 before and still (mastered, did not move). Statistics: never judged (unknown, not counted).
    const attempts = [
      attempt("OLD", { startedAt: daysAgo(12), submittedAt: daysAgo(12) }),
      attempt("N1", { startedAt: daysAgo(2), submittedAt: daysAgo(2) }),
      attempt("N2", { startedAt: daysAgo(1), submittedAt: daysAgo(1) }),
    ];
    const facts = [...four("OLD", 0, 2), ...four("OLD", 1, 4), ...four("N1", 0, 4), ...four("N2", 0, 4)];
    const card = buildProgressCard(input({ perf: payload(attempts, facts) }));
    expect(card.chapters?.weak).toBe(0);
    expect(card.chapters?.strong).toBe(2);
    expect(card.chapters?.movedUp).toEqual(["Trigonometry"]);
  });

  it("weighs the practised chapters by their share of the last 3 years' papers", () => {
    // Trigonometry 30 of 80 recent questions, practised (5 bank answers). Matrices 4 answers: not yet.
    const card = buildProgressCard(
      input({
        chapters: [
          { id: "trig", name: "Trigonometry", subject: "Mathematics", answered: 5 },
          { id: "mat", name: "Matrices", subject: "Mathematics", answered: 4 },
          { id: "stat", name: "Statistics", subject: "Mathematics", answered: 0 },
        ],
      })
    );
    expect(card.covered).toEqual({ kind: "share", pct: 38, started: 1, total: 3 });
  });

  it("counts mock answers towards a chapter being practised", () => {
    const perf = payload([attempt("A1")], four("A1", 1, 3));
    const card = buildProgressCard(
      input({
        perf,
        chapters: [
          { id: "trig", name: "Trigonometry", subject: "Mathematics", answered: 0 },
          { id: "mat", name: "Matrices", subject: "Mathematics", answered: 1 },
          { id: "stat", name: "Statistics", subject: "Mathematics", answered: 0 },
        ],
      })
    );
    // Matrices: 1 bank + 4 mock = 5. Its 20 of 80 recent questions = 25%.
    expect(card.covered).toEqual({ kind: "share", pct: 25, started: 1, total: 3 });
  });

  it("falls back to chapters started of all chapters on an exam with no past papers", () => {
    const card = buildProgressCard(
      input({
        strategy: { examName: "NDA", board: false, chapters: [] },
        chapters: [
          { id: "trig", name: "Trigonometry", subject: "Mathematics", answered: 9 },
          { id: "mat", name: "Matrices", subject: "Mathematics", answered: 0 },
        ],
      })
    );
    expect(card.covered).toEqual({ kind: "chapters", started: 1, total: 2 });
  });

  it("on a board exam weighs only the subjects the student practises: a share across PCB and PCM means nothing", () => {
    const strategy: StrategyData = {
      examName: "CBSE Class 12",
      board: true,
      chapters: [
        { id: "p1", name: "Optics", subject: "Physics", byYear: { "2025": 10 } },
        { id: "p2", name: "Waves", subject: "Physics", byYear: { "2025": 30 } },
        { id: "b1", name: "Genetics", subject: "Biology", byYear: { "2025": 60 } },
      ],
    };
    const card = buildProgressCard(
      input({
        exam: { slug: "cbse-12", examName: "CBSE Class 12", displayName: "CBSE Class 12" },
        strategy,
        chapters: [
          { id: "p1", name: "Optics", subject: "Physics", answered: 5 },
          { id: "p2", name: "Waves", subject: "Physics", answered: 0 },
          { id: "b1", name: "Genetics", subject: "Biology", answered: 0 },
        ],
      })
    );
    expect(card.covered).toEqual({ kind: "share", pct: 25, started: 1, total: 2 });
  });

  it("carries the drill's fixed and due counts, and the notes chapters read", () => {
    const card = buildProgressCard(input({ drill: { fixed: 23, due: 8 }, notesChapters: 9, daysLeft: 41 }));
    expect(card.fixed).toBe(23);
    expect(card.due).toBe(8);
    expect(card.notesChapters).toBe(9);
    expect(card.daysLeft).toBe(41);
    expect(isEmptyCard(card)).toBe(false);
  });
});

describe("progressRows", () => {
  const full = () => {
    const attempts = [attempt("A1", { startedAt: daysAgo(3), score: 5, maxScore: 10 }), attempt("A2", { startedAt: daysAgo(2), score: 6, maxScore: 10 })];
    const facts = [...four("A1", 0, 4), ...four("A2", 0, 4)];
    return buildProgressCard(
      input({
        practice: { week: { answered: 300, right: 200 }, prev: { answered: 100, right: 60 } },
        perf: payload(attempts, facts),
        drill: { fixed: 23, due: 8 },
        notesChapters: 1,
      })
    );
  };

  it("labels each line in plain words, in the card's order", () => {
    expect(progressRows(full()).map((r) => r.label)).toEqual([
      "This week",
      "Mistakes fixed",
      "Exam covered",
      "Mocks",
      "Chapters",
      "Notes read",
    ]);
  });

  it("writes the numbers the way a student says them", () => {
    const rows = Object.fromEntries(progressRows(full()).map((r) => [r.label, r.value]));
    expect(rows["This week"]).toBe("308 answered, 68% right, up 8 points on last week");
    expect(rows["Mistakes fixed"]).toBe("23 you got wrong, now right");
    expect(rows["Exam covered"]).toBe("Chapters you've practised carry 38% of recent NDA questions");
    expect(rows["Mocks"]).toBe("2 taken: 50%, 60%");
    expect(rows["Notes read"]).toBe("1 chapter in the last 30 days");
  });

  it("never writes an em dash (owner rule) nor a zero line", () => {
    const rows = progressRows(full());
    for (const r of rows) {
      expect(r.value).not.toMatch(/[—–]/);
      expect(r.value).not.toMatch(/^0 /);
    }
  });

  it("says down, or the same, when accuracy fell or held", () => {
    const down = buildProgressCard(input({ practice: { week: { answered: 10, right: 5 }, prev: { answered: 10, right: 8 } } }));
    expect(progressRows(down)[0].value).toBe("10 answered, 50% right, down 30 points on last week");
    const same = buildProgressCard(input({ practice: { week: { answered: 10, right: 5 }, prev: { answered: 10, right: 5 } } }));
    expect(progressRows(same)[0].value).toBe("10 answered, 50% right, same as last week");
  });

  it("gives the covered share as a 0-100 bar value and the fallback as chapters", () => {
    const covered = progressRows(full()).find((r) => r.label === "Exam covered");
    expect(covered?.bar).toBe(38);
    const fallback = buildProgressCard(
      input({ strategy: { examName: "NDA", board: false, chapters: [] }, chapters: [{ id: "x", name: "X", subject: "S", answered: 5 }] })
    );
    expect(progressRows(fallback)[0]).toMatchObject({ label: "Exam covered", value: "1 of 1 chapter started", bar: 100 });
  });
});

describe("pickProgressExams", () => {
  it("lists the profile's exams, the asked one first when it is among them", () => {
    expect(pickProgressExams({ asked: "cds", targetExams: ["nda", "cds"], latestMockExam: null })).toEqual({ exam: "cds", exams: ["nda", "cds"] });
    expect(pickProgressExams({ asked: "jee-mains", targetExams: ["nda", "cds"], latestMockExam: null })).toEqual({ exam: "nda", exams: ["nda", "cds"] });
  });

  it("with no exam on the profile, uses the exam of their latest mock", () => {
    expect(pickProgressExams({ asked: null, targetExams: [], latestMockExam: "cds" })).toEqual({ exam: "cds", exams: ["cds"] });
  });

  it("with neither, leaves the choice to the database (the exam they practise most)", () => {
    expect(pickProgressExams({ asked: null, targetExams: [], latestMockExam: null })).toEqual({ exam: null, exams: [] });
  });
});

describe("notesChaptersOf", () => {
  const index = [
    { examName: "NDA", subjectRoute: "nda-maths", subjectDisplay: "NDA Maths", chapterSlug: "statistics", subtopicCount: 4 },
    { examName: "NDA", subjectRoute: "nda-maths", subjectDisplay: "NDA Maths", chapterSlug: "vectors", subtopicCount: 5 },
    { examName: "CDS", subjectRoute: "cds-maths", subjectDisplay: "CDS Maths", chapterSlug: "statistics", subtopicCount: 3 },
  ];

  it("counts the opened notes chapters of this exam only, each once", () => {
    expect(notesChaptersOf(["nda-maths/statistics", "nda-maths/vectors", "cds-maths/statistics", "nda-maths/gone"], "NDA", index)).toBe(2);
  });
});
