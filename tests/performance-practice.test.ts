/**
 * Practice evidence on the mastery map (2026-11-06). Pure core, no I/O.
 *
 * Until now the map read only the first sitting of each mock, so a student who
 * practised in the bank saw an empty map, and a mistake fixed in the drill
 * never moved a dot, although the map and the homepage both say it does.
 * `withPractice` folds the student's graded practice answers (bank, board,
 * question of the day, drill) into the chapter and subtopic BANDS only.
 *
 * Owner rulings (2026-11-06): per question, the LATEST answer counts, wherever
 * it was given; a practice answer weighs the same as a mock answer.
 *
 * Everything that needs a timed sitting with marks (projection, clock,
 * difficulty, coverage, the sitting summary) stays exactly as the mocks made it.
 */
import { describe, it, expect } from "vitest";
import { buildPerformance, type PerfInput } from "@/lib/performance/compute";
import { withPractice, latestEvidenceExam } from "@/lib/performance/practice";
import {
  EMPTY_PRACTICE,
  type PerfAttempt,
  type PerfFact,
  type PracticeEvidence,
  type PracticeRow,
} from "@/lib/performance/types";

const DAY = 86_400_000;
const NOW = new Date("2026-11-06T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * DAY).toISOString();

function attempt(over: Partial<PerfAttempt> = {}): PerfAttempt {
  return {
    attemptId: "A1",
    mockSlug: "nda-2025-apr-maths",
    mockTitle: "NDA I 2025 Mathematics",
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
    startedAt: daysAgo(10),
    submittedAt: daysAgo(10),
    score: 5,
    maxScore: 10,
    ...over,
  };
}

function fact(over: Partial<PerfFact> = {}): PerfFact {
  return {
    a: "A1", p: 1, q: "q1", s: 0, c: 0, t: 0,
    d: "MODERATE", f: "mcq",
    k: "A", kn: null, r: null, rn: null,
    g: false, m: 2.5, nm: -0.83, ts: 30, rc: true,
    ...over,
  };
}
const right = (o: Partial<PerfFact> = {}) => fact({ r: "A", ...o });
const wrong = (o: Partial<PerfFact> = {}) => fact({ r: "B", ...o });
const blank = (o: Partial<PerfFact> = {}) => fact({ r: null, ...o });

/** One NDA Maths paper: Conics > Parabola, four questions. */
function mockInput(facts: PerfFact[], attempts: PerfAttempt[] = [attempt()]): PerfInput {
  return {
    userId: "u1",
    attempts,
    facts,
    dims: { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola"] },
    weightage: [
      { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Parabola", q: 40 },
    ],
  };
}

const PRACTICE_DIMS: PracticeEvidence["dims"] = {
  exams: ["NDA", "IMAT"],
  subjects: ["Mathematics", "Biology"],
  chapters: ["Conics", "Matrices", "Genetics"],
  subtopics: ["Parabola", "Determinants", "Mendel"],
};

function prow(over: Partial<PracticeRow> = {}): PracticeRow {
  return { q: "p1", e: 0, s: 0, c: 0, t: 0, ok: true, at: daysAgo(1), ...over };
}
function practice(rows: PracticeRow[]): PracticeEvidence {
  return { dims: PRACTICE_DIMS, rows };
}

function laneOf(perf: ReturnType<typeof buildPerformance>, exam: string, subject: string) {
  return perf.lanes.find((l) => l.exam === exam && l.subject === subject);
}
function subOf(perf: ReturnType<typeof buildPerformance>, exam: string, subject: string, chapter: string, subtopic: string) {
  return laneOf(perf, exam, subject)?.chapters.find((c) => c.chapter === chapter)?.subtopics.find((s) => s.subtopic === subtopic);
}

const noPractice = mockInput([right({ q: "q1" }), wrong({ q: "q2", p: 2 }), right({ q: "q3", p: 3 }), blank({ q: "q4", p: 4 })]);

describe("withPractice: no practice changes nothing", () => {
  it("returns the mock-only performance untouched when there is no practice", () => {
    const perf = buildPerformance(noPractice, NOW);
    expect(withPractice(noPractice, perf, EMPTY_PRACTICE, NOW)).toEqual(perf);
  });

  it("leaves a lane the practice never touched as it was", () => {
    const perf = buildPerformance(noPractice, NOW);
    const out = withPractice(noPractice, perf, practice([prow({ e: 1, s: 1, c: 2, t: 2 })]), NOW);
    expect(laneOf(out, "NDA", "Mathematics")).toEqual(laneOf(perf, "NDA", "Mathematics"));
  });
});

describe("withPractice: a student who has only practised", () => {
  const empty = mockInput([], []);
  const rows = [
    prow({ q: "p1", ok: true }),
    prow({ q: "p2", ok: true }),
    prow({ q: "p3", ok: false }),
    prow({ q: "p4", c: 1, t: 1, ok: false }),
  ];
  const out = withPractice(empty, buildPerformance(empty, NOW), practice(rows), NOW);

  it("gets a lane per exam and subject practised", () => {
    expect(out.lanes.map((l) => `${l.exam}/${l.subject}`)).toEqual(["NDA/Mathematics"]);
  });

  it("counts each practised question once in its subtopic, all from practice", () => {
    const parabola = subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(parabola.judged).toBe(3);
    expect(parabola.correct).toBe(2);
    expect(parabola.wrong).toBe(1);
    expect(parabola.practiceJudged).toBe(3);
    expect(parabola.thin).toBe(false);
    expect(parabola.accuracy).toBe(67);
  });

  it("claims nothing that needs a timed sitting", () => {
    const lane = laneOf(out, "NDA", "Mathematics")!;
    expect(lane.attempts).toBe(0);
    expect(lane.projection).toBeNull();
    expect(lane.coverage.answered).toBe(0);
    expect(lane.difficulty.every((d) => d.answered === 0)).toBe(true);
    expect(lane.chapters.find((c) => c.chapter === "Conics")!.markScore).toBe(0);
  });

  it("leaves the sitting summary alone", () => {
    expect(out.summary.graded).toBe(0);
    expect(out.summary.latest).toBeNull();
  });

  it("rolls the lane's judged count up from its chapters", () => {
    expect(laneOf(out, "NDA", "Mathematics")!.judged).toBe(4);
  });
});

describe("withPractice: the latest answer to a question counts", () => {
  it("a mistake fixed after the mock moves the subtopic, without counting the question twice", () => {
    const input = mockInput([wrong({ q: "q1" }), wrong({ q: "q2", p: 2 }), wrong({ q: "q3", p: 3 }), right({ q: "q4", p: 4 })]);
    const perf = buildPerformance(input, NOW);
    const before = subOf(perf, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(before.correct).toBe(1);

    const out = withPractice(input, perf, practice([prow({ q: "q1", ok: true, at: daysAgo(2) })]), NOW);
    const after = subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(after.judged).toBe(4);
    expect(after.correct).toBe(2);
    expect(after.wrong).toBe(2);
    expect(after.practiceJudged).toBe(1);
    expect(after.weightedScore).toBeGreaterThan(before.weightedScore);
  });

  it("an answer given BEFORE the mock is superseded by the mock", () => {
    const input = mockInput([wrong({ q: "q1" }), right({ q: "q2", p: 2 }), right({ q: "q3", p: 3 }), right({ q: "q4", p: 4 })]);
    const perf = buildPerformance(input, NOW);
    const out = withPractice(input, perf, practice([prow({ q: "q1", ok: true, at: daysAgo(30) })]), NOW);
    const sub = subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(sub.correct).toBe(3);
    expect(sub.wrong).toBe(1);
    expect(sub.practiceJudged ?? 0).toBe(0);
  });

  it("a question seen and left blank in the mock, then answered later, counts as answered", () => {
    const input = mockInput([right({ q: "q1" }), right({ q: "q2", p: 2 }), right({ q: "q3", p: 3 }), blank({ q: "q4", p: 4 })]);
    const perf = buildPerformance(input, NOW);
    const out = withPractice(input, perf, practice([prow({ q: "q4", ok: true, at: daysAgo(1) })]), NOW);
    const sub = subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(sub.seenBlank).toBe(0);
    expect(sub.judged).toBe(4);
    expect(sub.weightedScore).toBeGreaterThan(subOf(perf, "NDA", "Mathematics", "Conics", "Parabola")!.weightedScore);
  });

  it("keeps only the latest practice row when a question appears twice", () => {
    const empty = mockInput([], []);
    const out = withPractice(
      empty,
      buildPerformance(empty, NOW),
      practice([prow({ q: "p1", ok: false, at: daysAgo(5) }), prow({ q: "p1", ok: true, at: daysAgo(1) })]),
      NOW
    );
    const sub = subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(sub.judged).toBe(1);
    expect(sub.correct).toBe(1);
  });
});

describe("withPractice: same weight as a mock answer, by recency", () => {
  it("an old right answer counts for less than a recent wrong one", () => {
    const empty = mockInput([], []);
    const out = withPractice(
      empty,
      buildPerformance(empty, NOW),
      practice([
        prow({ q: "p1", ok: true, at: daysAgo(59) }),
        prow({ q: "p2", ok: true, at: daysAgo(59) }),
        prow({ q: "p3", ok: false, at: daysAgo(0) }),
      ]),
      NOW
    );
    // Two right answers at weight 0.2 against one wrong at weight 1.
    expect(subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!.weightedScore).toBeLessThan(0.5);
  });
});

describe("withPractice: the timed-sitting numbers never move", () => {
  it("keeps the projection, the clock, difficulty and coverage identical", () => {
    const input = mockInput([wrong({ q: "q1" }), wrong({ q: "q2", p: 2 }), right({ q: "q3", p: 3 }), right({ q: "q4", p: 4 })]);
    const perf = buildPerformance(input, NOW);
    const out = withPractice(input, perf, practice([prow({ q: "q1", ok: true }), prow({ q: "p9", c: 1, t: 1 })]), NOW);
    const a = laneOf(perf, "NDA", "Mathematics")!;
    const b = laneOf(out, "NDA", "Mathematics")!;
    expect(b.projection).toEqual(a.projection);
    expect(b.time).toEqual(a.time);
    expect(b.difficulty).toEqual(a.difficulty);
    expect(b.coverage).toEqual(a.coverage);
    expect(b.attempts).toBe(a.attempts);
    expect(b.wrongAudit).toEqual(a.wrongAudit);
    expect(b.skipAudit).toEqual(a.skipAudit);
    expect(out.summary).toEqual(perf.summary);
  });

  it("keeps a mock-backed subtopic's marks score and trend from the mocks", () => {
    const input = mockInput([wrong({ q: "q1" }), wrong({ q: "q2", p: 2 }), right({ q: "q3", p: 3 }), right({ q: "q4", p: 4 })]);
    const perf = buildPerformance(input, NOW);
    const out = withPractice(input, perf, practice([prow({ q: "q1", ok: true })]), NOW);
    const a = subOf(perf, "NDA", "Mathematics", "Conics", "Parabola")!;
    const b = subOf(out, "NDA", "Mathematics", "Conics", "Parabola")!;
    expect(b.markScore).toBe(a.markScore);
    expect(b.trend).toBe(a.trend);
    expect(b.medianSecs).toBe(a.medianSecs);
  });

  it("adds a chapter met only in practice to an existing lane", () => {
    const perf = buildPerformance(noPractice, NOW);
    const out = withPractice(noPractice, perf, practice([prow({ q: "p9", c: 1, t: 1, ok: true })]), NOW);
    const chapters = laneOf(out, "NDA", "Mathematics")!.chapters.map((c) => c.chapter);
    expect(chapters).toContain("Matrices");
    expect(chapters).toContain("Conics");
  });
});

describe("latestEvidenceExam", () => {
  it("is the exam of the most recent evidence, paper or practice", () => {
    const input = mockInput([right({ q: "q1" }), right({ q: "q2", p: 2 })], [attempt({ startedAt: daysAgo(10) })]);
    const perf = buildPerformance(input, NOW);
    expect(latestEvidenceExam(perf, EMPTY_PRACTICE)).toBe("NDA");
    expect(latestEvidenceExam(perf, practice([prow({ e: 1, s: 1, c: 2, t: 2, at: daysAgo(1) })]))).toBe("IMAT");
    expect(latestEvidenceExam(perf, practice([prow({ e: 1, s: 1, c: 2, t: 2, at: daysAgo(20) })]))).toBe("NDA");
  });

  it("is null with no evidence at all", () => {
    const empty = mockInput([], []);
    expect(latestEvidenceExam(buildPerformance(empty, NOW), EMPTY_PRACTICE)).toBeNull();
  });
});
