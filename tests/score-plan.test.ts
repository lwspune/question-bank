/**
 * "How to raise your score" on the mock result page (owner, 2026-11-10): the
 * pure core that turns one fair, full-paper attempt into marks-valued actions.
 * Pure core src/lib/mocks/scorePlan.ts.
 */
import { describe, it, expect } from "vitest";
import { buildScorePlan, type ScorePlanInput } from "@/lib/mocks/scorePlan";
import type { PerfAttempt, PerfFact, StudentPerformancePayload } from "@/lib/performance/types";
import type { ChapterWeight } from "@/lib/me/startNext";

const A = "att-now";
const T0 = Date.UTC(2026, 10, 1, 6, 0);
const iso = (min: number) => new Date(T0 + min * 60_000).toISOString();

// subjects 0..2, chapters 0..3
const dims = {
  subjects: ["Reasoning", "Quantitative Aptitude", "English"],
  chapters: ["Coding", "Mensuration", "Cloze Test", "Vocabulary"],
  subtopics: ["s0", "s1", "s2", "s3"],
};

function attempt(over: Partial<PerfAttempt> = {}): PerfAttempt {
  return {
    attemptId: A,
    mockSlug: "ssc-cgl-2025-09-20-s1",
    mockTitle: "SSC CGL Tier I, 20 Sep 2025, Shift 1",
    examName: "SSC CGL",
    paperCode: "tier-1",
    pyqYear: 2025,
    source: "pyq",
    scope: "full",
    sections: [],
    totalQuestions: 20,
    totalMarks: 40,
    durationSecs: 20 * 36,
    status: "submitted",
    startedAt: iso(0),
    submittedAt: iso(11),
    score: 20,
    maxScore: 40,
    ...over,
  };
}

type F = { s: number; c: number; ok: boolean | null; ts?: number; d?: PerfFact["d"]; m?: number; nm?: number; rc?: boolean; a?: string; q?: string };
let seq = 0;
function fact(x: F): PerfFact {
  seq += 1;
  const answered = x.ok !== null;
  return {
    a: x.a ?? A,
    p: seq,
    q: x.q ?? `q${seq}`,
    s: x.s,
    c: x.c,
    t: x.c,
    d: x.d ?? "MODERATE",
    f: "mcq",
    k: "A",
    kn: null,
    r: answered ? (x.ok ? "A" : "B") : null,
    rn: null,
    g: false,
    m: x.m ?? 2,
    nm: x.nm ?? -0.5,
    ts: x.ts ?? 30,
    rc: x.rc ?? true,
  };
}

function input(facts: PerfFact[], over: Partial<ScorePlanInput> = {}, attempts: PerfAttempt[] = [attempt()]): ScorePlanInput {
  const payload: StudentPerformancePayload = { userId: "u1", attempts, dims, facts, weightage: [] };
  return { payload, attemptId: A, peer: new Map(), weights: [], ...over };
}

/** A fair SSC-like paper: Reasoning strong and quick, Quant slow, English weak. */
function paper(): PerfFact[] {
  seq = 0;
  return [
    // Reasoning: 6 of 6 right, quick
    ...Array.from({ length: 6 }, () => fact({ s: 0, c: 0, ok: true, ts: 12, d: "EASY" })),
    // Quant: 4 right, 3 wrong (2 of them slow), all slow-ish
    ...Array.from({ length: 4 }, () => fact({ s: 1, c: 1, ok: true, ts: 70 })),
    fact({ s: 1, c: 1, ok: false, ts: 120, d: "EASY" }),
    fact({ s: 1, c: 1, ok: false, ts: 130 }),
    fact({ s: 1, c: 1, ok: false, ts: 40, d: "EASY" }),
    // English: cloze 0 of 4, vocabulary 1 of 3
    ...Array.from({ length: 4 }, () => fact({ s: 2, c: 2, ok: false, ts: 20, d: "HARD" })),
    fact({ s: 2, c: 3, ok: true, ts: 20 }),
    fact({ s: 2, c: 3, ok: false, ts: 20, d: "EASY" }),
    fact({ s: 2, c: 3, ok: false, ts: 20 }),
  ];
}

const weights: ChapterWeight[] = [
  { chapterId: "c2", chapter: "Cloze Test", subject: "English", exam: "SSC CGL", paperCode: "tier-1", papers: 100, qPerPaper: 3.6, marksPerPaper: 7.2, paperMarks: 200 },
  { chapterId: "c3", chapter: "Vocabulary", subject: "English", exam: "SSC CGL", paperCode: "tier-1", papers: 100, qPerPaper: 9.2, marksPerPaper: 18.4, paperMarks: 200 },
];

describe("buildScorePlan: which attempts get it", () => {
  it("builds a plan for a fair full paper", () => {
    expect(buildScorePlan(input(paper()))).not.toBeNull();
  });

  it("is null for a chapter test or custom test (today's card stays)", () => {
    expect(buildScorePlan(input(paper(), {}, [attempt({ scope: "sectional" })]))).toBeNull();
    expect(buildScorePlan(input(paper(), {}, [attempt({ scope: "custom" })]))).toBeNull();
  });

  it("is null for a rushed attempt: submitted in under 40% of the time", () => {
    expect(buildScorePlan(input(paper(), {}, [attempt({ submittedAt: iso(4) })]))).toBeNull();
    expect(buildScorePlan(input(paper(), {}, [attempt({ submittedAt: iso(5) })]))).not.toBeNull();
  });

  it("is null when under a fifth of the paper was answered, or the attempt is not graded", () => {
    seq = 0;
    const few = [fact({ s: 0, c: 0, ok: true }), ...Array.from({ length: 19 }, () => fact({ s: 0, c: 0, ok: null, rc: false }))];
    expect(buildScorePlan(input(few))).toBeNull();
    expect(buildScorePlan(input(paper(), {}, [attempt({ status: "in_progress", score: null })]))).toBeNull();
  });

  it("keeps a genuine re-sit of the same paper", () => {
    const earlier = attempt({ attemptId: "att-before", startedAt: iso(-3000), submittedAt: iso(-2990), score: 10 });
    expect(buildScorePlan(input(paper(), {}, [earlier, attempt()]))).not.toBeNull();
  });
});

describe("easy marks", () => {
  it("counts easy questions answered wrong, values each at the marks plus the penalty avoided, and offers half as reachable", () => {
    const plan = buildScorePlan(input(paper()))!;
    expect(plan.easy).toEqual({
      count: 3,
      valueEach: 2.5,
      gain: 4,
      bySection: [
        { section: "Quantitative Aptitude", count: 2 },
        { section: "English", count: 1 },
      ],
    });
  });

  it("uses how other students did when the paper's difficulty labels are all the same", () => {
    seq = 0;
    const flat = paper().map((f) => ({ ...f, d: "MODERATE" as const }));
    const wrongIds = flat.filter((f) => f.r === "B").map((f) => f.q);
    const peer = new Map<string, number>([
      [wrongIds[0], 80],
      [wrongIds[1], 75],
      [wrongIds[2], 20],
    ]);
    expect(buildScorePlan(input(flat, { peer }))!.easy?.count).toBe(2);
    expect(buildScorePlan(input(flat))!.easy).toBeNull();
  });
});

describe("time", () => {
  it("names the section that took far more than its share of the time, and its slow wrong answers", () => {
    const plan = buildScorePlan(input(paper()))!;
    // Paper: 36 s a question, so the cap is 75 s (twice that, to the nearest 15).
    expect(plan.time).toMatchObject({ section: "Quantitative Aptitude", slowWrong: 2, capSecs: 75 });
    expect(plan.time!.mins).toBeCloseTo((4 * 70 + 120 + 130 + 40) / 60, 5);
    expect(plan.time!.slowWrongMins).toBeCloseTo((120 + 130) / 60, 5);
  });

  it("leaves out answers whose time was not recorded (0 means not measured)", () => {
    const facts = paper().map((f) => (f.s === 1 ? { ...f, ts: 0 } : f));
    expect(buildScorePlan(input(facts))!.time).toBeNull();
  });
});

describe("topics worth the most", () => {
  it("names the chapters that lost the most marks, with how often a typical paper asks them", () => {
    const plan = buildScorePlan(input(paper(), { weights }))!;
    expect(plan.topics.slice(0, 2)).toEqual([
      { subject: "English", chapter: "Cloze Test", right: 0, asked: 4, marksLost: 10, qPerPaper: 3.6 },
      { subject: "Quantitative Aptitude", chapter: "Mensuration", right: 4, asked: 7, marksLost: 7.5, qPerPaper: null },
    ]);
  });
});

describe("attempt strategy follows the exam's marking", () => {
  it("says keep attempting when accuracy beats the break-even rate (SSC: 1 in 5)", () => {
    const plan = buildScorePlan(input(paper()))!;
    expect(plan.strategy).toMatchObject({ kind: "keep", breakEvenOneIn: 5, accuracyPct: 55 });
  });

  it("says to guess less when quick answers fall below break-even, and counts what they cost", () => {
    seq = 0;
    const facts = [
      ...Array.from({ length: 10 }, () => fact({ s: 0, c: 0, ok: true, ts: 100 })),
      ...Array.from({ length: 2 }, () => fact({ s: 0, c: 0, ok: true, ts: 5, nm: -1, m: 4 })),
      ...Array.from({ length: 10 }, () => fact({ s: 0, c: 0, ok: false, ts: 5, nm: -1, m: 4 })),
    ].map((f) => ({ ...f, m: 4, nm: -1 }));
    const plan = buildScorePlan(input(facts, {}, [attempt({ totalQuestions: 22, durationSecs: 22 * 144, submittedAt: iso(40) })]))!;
    // 12 quick answers, 2 right: 2 x 4 - 10 x 1 = -2 marks; JEE marking breaks even at 1 in 5.
    expect(plan.strategy).toMatchObject({ kind: "fewer_guesses", breakEvenOneIn: 5, fastTotal: 12, fastRight: 2, marksAtStake: 2 });
  });

  it("with no negative marking, says never leave a question blank", () => {
    const facts = paper().map((f) => ({ ...f, nm: 0 }));
    seq = 100;
    facts.push(fact({ s: 0, c: 0, ok: null, nm: 0 }), fact({ s: 0, c: 0, ok: null, nm: 0 }));
    const plan = buildScorePlan(input(facts, {}, [attempt({ totalQuestions: 22 })]))!;
    expect(plan.strategy).toMatchObject({ kind: "never_blank", blanks: 2, breakEvenOneIn: null });
  });

  it("does not count a never-opened grace question as a blank to fill: it already scores", () => {
    const facts = paper().map((f) => ({ ...f, nm: 0 }));
    seq = 100;
    facts.push(fact({ s: 0, c: 0, ok: null, nm: 0 }), fact({ s: 0, c: 0, ok: null, nm: 0, rc: false }));
    facts.push({ ...fact({ s: 0, c: 0, ok: null, nm: 0, rc: false }), g: true });
    const plan = buildScorePlan(input(facts, {}, [attempt({ totalQuestions: 23 })]))!;
    expect(plan.strategy).toMatchObject({ kind: "never_blank", blanks: 2 });
  });
});

describe("sections follow the paper, not the subject", () => {
  it("groups by the paper's own sections when it has several (SSC's General Awareness spans subjects)", () => {
    const sections = [
      { key: "reasoning", label: "Reasoning", count: 6 },
      { key: "mixed", label: "Quant and English", count: 14 },
    ];
    const plan = buildScorePlan(input(paper(), {}, [attempt({ sections })]))!;
    expect(plan.sections.map((x) => [x.section, x.questions, x.right])).toEqual([
      ["Reasoning", 6, 6],
      ["Quant and English", 14, 5],
    ]);
  });

  it("falls back to subjects for a one-section paper", () => {
    const plan = buildScorePlan(input(paper(), {}, [attempt({ sections: [{ key: "all", label: "Paper", count: 20 }] })]))!;
    expect(plan.sections.map((x) => x.section)).toEqual(["Reasoning", "Quantitative Aptitude", "English"]);
  });
});

describe("what went well, progress and the headline", () => {
  it("names the best section by accuracy among what was answered, with its time", () => {
    expect(buildScorePlan(input(paper()))!.wentWell).toEqual({ section: "Reasoning", right: 6, answered: 6, mins: 72 / 60 });
  });

  // NDA Paper I printed "went well: Mathematics 35 out of 120 right": one section is the whole paper.
  it("says nothing went well on a one-section paper", () => {
    seq = 0;
    const one = paper().map((f) => ({ ...f, s: 1, r: f.r === null ? null : ("A" as const) }));
    expect(buildScorePlan(input(one))!.wentWell).toBeNull();
  });

  it("compares with the last try at the same paper first", () => {
    seq = 0;
    const before = paper().map((f) => ({ ...f, a: "att-before", q: f.q }));
    const sameExamOther = attempt({ attemptId: "att-other", mockSlug: "other", startedAt: iso(-100), submittedAt: iso(-90), score: 25 });
    const samePaper = attempt({ attemptId: "att-before", startedAt: iso(-3000), submittedAt: iso(-2990), score: 12 });
    const plan = buildScorePlan(input([...before, ...paper()], {}, [samePaper, sameExamOther, attempt()]))!;
    expect(plan.progress).toMatchObject({ kind: "same_paper", previous: 12, delta: 8 });
  });

  it("adds only gains it can show to the headline", () => {
    const plan = buildScorePlan(input(paper()))!;
    expect(plan.headlineGain).toBe(4);
  });
});
