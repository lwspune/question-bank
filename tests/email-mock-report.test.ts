/**
 * The per-attempt mock report core. Pure — no DB, no network.
 *
 * The rules under test are the ones the 2026-09-18 data argued for:
 *  - per-QUESTION facts are per-attempt (one question is a fact, no floor);
 *  - subtopic picks are POOLED (one paper gives a subtopic 1-3 questions,
 *    under MIN_JUDGED_FOR_CLAIM);
 *  - a never-reached question is NEVER shown as "you skipped this" — it
 *    becomes the pacing line instead.
 */
import { describe, it, expect } from "vitest";
import { buildMockReport, resolveCutoff, PICK, PACING_FLOOR } from "@/lib/email/mockReport";
import type { PerfAttempt, PerfFact, StudentPerformancePayload } from "@/lib/performance/types";

const ATTEMPT = "att-1";

function attempt(over: Partial<PerfAttempt> = {}): PerfAttempt {
  return {
    attemptId: ATTEMPT,
    mockSlug: "nda-2025-sep-maths",
    mockTitle: "NDA 2025 (II) — Mathematics",
    examName: "NDA",
    paperCode: "maths",
    pyqYear: 2025,
    source: "pyq",
    scope: "full",
    sections: [{ key: "mathematics", label: "Mathematics", count: 120 }],
    totalQuestions: 120,
    totalMarks: 300,
    durationSecs: 9000,
    status: "submitted",
    startedAt: "2026-09-01T10:00:00Z",
    submittedAt: "2026-09-01T12:30:00Z",
    score: 84,
    maxScore: 300,
    ...over,
  };
}

/** One question of the paper. Defaults to an EASY question answered WRONG. */
function fact(over: Partial<PerfFact> = {}): PerfFact {
  return {
    a: ATTEMPT, p: 1, q: "q1", s: 0, c: 0, t: 0,
    d: "EASY", f: "mcq",
    k: "A", kn: null, r: "B", rn: null,
    g: false, m: 2.5, nm: -0.83, ts: 40, rc: true,
    ...over,
  };
}

function payload(facts: PerfFact[], attempts: PerfAttempt[] = [attempt()]): StudentPerformancePayload {
  return {
    userId: "u1",
    attempts,
    facts,
    dims: { subjects: ["Mathematics"], chapters: ["Algebra", "Trigonometry"], subtopics: ["Quadratics", "Identities"] },
    weightage: [],
  } as unknown as StudentPerformancePayload;
}

describe("buildMockReport — easy questions got wrong", () => {
  it("picks EASY wrong answers from THIS attempt only", () => {
    const r = buildMockReport(
      payload([
        fact({ q: "a", p: 1 }),
        fact({ q: "b", p: 2, a: "other-attempt" }),
        fact({ q: "c", p: 3, d: "HARD" }),
        fact({ q: "d", p: 4, r: "A" }), // correct
      ]),
      ATTEMPT,
      new Map(),
      new Date("2026-09-01T13:00:00Z")
    );
    expect(r!.easyWrong.map((x) => x.questionId)).toEqual(["a"]);
  });

  it("caps the list at PICK and ranks the highest peer accuracy first", () => {
    const facts = ["a", "b", "c", "d"].map((q, i) => fact({ q, p: i + 1 }));
    const peer = new Map([["a", 40], ["b", 90], ["c", 70], ["d", 55]]);
    const r = buildMockReport(payload(facts), ATTEMPT, peer, new Date());
    expect(r!.easyWrong).toHaveLength(PICK);
    expect(r!.easyWrong.map((x) => x.questionId)).toEqual(["b", "c", "d"]);
  });

  it("sorts questions with no peer evidence last, never first", () => {
    const facts = [fact({ q: "known", p: 1 }), fact({ q: "unknown", p: 2 })];
    const r = buildMockReport(payload(facts), ATTEMPT, new Map([["known", 30]]), new Date());
    expect(r!.easyWrong.map((x) => x.questionId)).toEqual(["known", "unknown"]);
  });

  it("treats a grace question as correct, never as wrong", () => {
    const r = buildMockReport(payload([fact({ q: "g", g: true })]), ATTEMPT, new Map(), new Date());
    expect(r!.easyWrong).toHaveLength(0);
  });
});

describe("buildMockReport — easy questions left blank", () => {
  it("counts a REACHED blank and never a never-reached one", () => {
    const r = buildMockReport(
      payload([
        fact({ q: "seen", p: 1, r: null, rc: true }),
        fact({ q: "never", p: 2, r: null, rc: false }),
      ]),
      ATTEMPT,
      new Map(),
      new Date()
    );
    expect(r!.easyLeft.map((x) => x.questionId)).toEqual(["seen"]);
  });

  it("reports never-reached as PACING instead, once past the floor", () => {
    const facts = Array.from({ length: PACING_FLOOR }, (_, i) =>
      fact({ q: `n${i}`, p: i + 1, r: null, rc: false })
    );
    const r = buildMockReport(payload(facts), ATTEMPT, new Map(), new Date());
    expect(r!.easyLeft).toHaveLength(0);
    expect(r!.pacing).not.toBeNull();
    expect(r!.pacing!.neverReached).toBe(PACING_FLOOR);
    expect(r!.pacing!.marksLeft).toBeCloseTo(PACING_FLOOR * 2.5);
  });

  it("stays silent on pacing below the floor — two unreached questions is not a finding", () => {
    const facts = [fact({ q: "n1", r: null, rc: false }), fact({ q: "n2", p: 2, r: null, rc: false })];
    const r = buildMockReport(payload(facts), ATTEMPT, new Map(), new Date());
    expect(r!.pacing).toBeNull();
  });
});

describe("buildMockReport — ranking", () => {
  it("ranks blanks by DWELL, not by peer evidence — a 90s abandon beats a 1s glance", () => {
    const facts = [
      fact({ q: "glance", p: 1, r: null, ts: 1 }),
      fact({ q: "abandon", p: 2, r: null, ts: 90 }),
    ];
    // Peer evidence deliberately favours the glance: dwell must still win.
    const peer = new Map([["glance", 95], ["abandon", 20]]);
    const r = buildMockReport(payload(facts), ATTEMPT, peer, new Date());
    expect(r!.easyLeft.map((x) => x.questionId)).toEqual(["abandon", "glance"]);
  });
});

describe("buildMockReport — guards", () => {
  it("returns null for an attempt that isn't in the payload", () => {
    expect(buildMockReport(payload([fact()]), "nope", new Map(), new Date())).toBeNull();
  });

  it("returns null for an attempt that was never graded", () => {
    const p = payload([fact()], [attempt({ status: "in_progress", score: null, maxScore: null })]);
    expect(buildMockReport(p, ATTEMPT, new Map(), new Date())).toBeNull();
  });

  it("reports hasFindings=false when the paper yielded nothing to say", () => {
    const r = buildMockReport(payload([fact({ r: "A" })]), ATTEMPT, new Map(), new Date());
    expect(r!.hasFindings).toBe(false);
  });
});

/**
 * The subtopic picks are the one POOLED section, and the only one a reader can
 * act on directly — so they have to be linkable. A link needs the SUBJECT: a
 * subtopic name is unique only within its chapter, a chapter only within its
 * subject, and an NDA paper's lanes span nine of them.
 *
 * The email itself never renders the subject (it prints "chapter · subtopic").
 * It is carried because the RESULT PAGE builds a /go/practice href from it, and
 * deriving it a second time there would mean re-running the projection.
 */
describe("buildMockReport — subtopic picks carry their lane", () => {
  const weightage = [
    { exam: "NDA", subject: "Mathematics", chapter: "Algebra", subtopic: "Quadratics", q: 60 },
    { exam: "NDA", subject: "Mathematics", chapter: "Trigonometry", subtopic: "Identities", q: 60 },
  ];

  /** Four judged answers in Quadratics, half of them wrong — past
   *  MIN_JUDGED_FOR_CLAIM (so not thin) with a real gap left on the table. */
  const facts = [
    fact({ p: 1, q: "q1", c: 0, t: 0, r: "B", k: "A" }),
    fact({ p: 2, q: "q2", c: 0, t: 0, r: "B", k: "A" }),
    fact({ p: 3, q: "q3", c: 0, t: 0, r: "A", k: "A" }),
    fact({ p: 4, q: "q4", c: 0, t: 0, r: "A", k: "A" }),
  ];

  /**
   * A FOUR-question paper, not the 120-question default. buildPerformance drops
   * any attempt answering less than ENGAGEMENT_FLOOR (20%) of its paper before
   * a lane is built, so four facts against a declared 120 yields no projection
   * and therefore no picks at all — which is also the live behaviour a barely
   * engaged sitting gets, and why hasFindings can be false on a graded attempt.
   */
  const smallPaper = attempt({
    totalQuestions: 4,
    totalMarks: 10,
    maxScore: 10,
    score: 3.34,
    sections: [{ key: "mathematics", label: "Mathematics", count: 4 }],
  });

  function withBank() {
    const p = payload(facts, [smallPaper]);
    return { ...p, weightage } as unknown as StudentPerformancePayload;
  }

  it("names the subject of every pick", () => {
    const r = buildMockReport(withBank(), ATTEMPT, new Map(), new Date("2026-09-02T00:00:00Z"))!;
    expect(r.subtopics.length).toBeGreaterThan(0);
    for (const s of r.subtopics) expect(s.subject).toBe("Mathematics");
  });

  it("still names the chapter and subtopic the subject qualifies", () => {
    const r = buildMockReport(withBank(), ATTEMPT, new Map(), new Date("2026-09-02T00:00:00Z"))!;
    const quadratics = r.subtopics.find((s) => s.subtopic === "Quadratics");
    expect(quadratics?.chapter).toBe("Algebra");
  });
});

/**
 * The cutoff the DAILY cron runs on.
 *
 * `SINCE` in the runner is the feature's start line and stays a constant, so a
 * replay picks the same set. A scheduled run needs a second, NARROWER bound —
 * otherwise every night's run re-reads every attempt since 2026-09-18, a set
 * that only grows. The window may never widen past the start line: 542 attempts
 * predate the feature and mailing a report for one of them is the failure this
 * whole design has been avoiding since it shipped.
 */
describe("resolveCutoff — the daily cron's lookback window", () => {
  const FEATURE_START = new Date("2026-09-18T00:00:00Z");
  const NOW = new Date("2026-09-25T12:00:00Z");

  it("returns the feature start when no lookback is given", () => {
    expect(resolveCutoff(FEATURE_START, NOW).toISOString()).toBe(FEATURE_START.toISOString());
  });

  it("narrows to the window when that lands after the feature start", () => {
    expect(resolveCutoff(FEATURE_START, NOW, 48).toISOString()).toBe("2026-09-23T12:00:00.000Z");
  });

  it("CLAMPS to the feature start rather than sweeping history back in", () => {
    const justAfterLaunch = new Date("2026-09-19T00:00:00Z");
    expect(resolveCutoff(FEATURE_START, justAfterLaunch, 24 * 30).toISOString()).toBe(
      FEATURE_START.toISOString()
    );
  });

  it("THROWS on a lookback that is not a finite positive number", () => {
    // A mistyped --lookback-hours must fail the cron loudly. Falling back to a
    // default would silently pick a window nobody chose, and Math.max(1, NaN)
    // is NaN — a bad value propagates rather than being clamped away.
    for (const bad of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => resolveCutoff(FEATURE_START, NOW, bad)).toThrow();
    }
  });
});
