import { describe, it, expect } from "vitest";
import {
  viewCohort,
  viewCohorts,
  viewFeature,
  viewFeatures,
  viewSegment,
  viewSegments,
  abandonment,
  viewNps,
  signalFunnel,
  viewDifficulty,
  SURFACE_COVERAGE,
  MIN_LIFT_N,
  MIN_SEGMENT_N,
  MIN_NPS_RESPONSES,
  type CohortRow,
  type FeatureRow,
  type SegmentRow,
} from "@/lib/pmf/snapshot";
import { ACTIVITY_KINDS } from "@/lib/activity/events";

const cohort = (over: Partial<CohortRow> = {}): CohortRow => ({
  week: "2026-07-06",
  signups: 20,
  signalled: 12,
  daysSinceClose: 60,
  retD1: 12,
  retD7: 10,
  retD28: 9,
  ...over,
});

describe("viewCohort — censoring is the load-bearing rule", () => {
  it("reports every horizon once the cohort is old enough", () => {
    const v = viewCohort(cohort());
    expect(v.d1.censored).toBe(false);
    expect(v.d28.censored).toBe(false);
    expect(v.d28.pct).toBe(45); // 9/20
    expect(v.signalPct).toBe(60); // 12/20
  });

  it("CENSORS a horizon the cohort has not yet had time to reach — never 0%", () => {
    const v = viewCohort(cohort({ daysSinceClose: 3, retD7: 0, retD28: 0 }));
    expect(v.d1.censored).toBe(false);
    expect(v.d7.censored).toBe(true);
    expect(v.d7.pct).toBeNull();
    expect(v.d28.censored).toBe(true);
    expect(v.d28.pct).toBeNull();
  });

  it("censors at the exact boundary and reports one day later", () => {
    expect(viewCohort(cohort({ daysSinceClose: 27 })).d28.censored).toBe(true);
    expect(viewCohort(cohort({ daysSinceClose: 28 })).d28.censored).toBe(false);
  });

  it("a brand-new cohort censors every horizon rather than reading as collapse", () => {
    const v = viewCohort(cohort({ daysSinceClose: 0, retD1: 0, retD7: 0, retD28: 0 }));
    expect([v.d1.censored, v.d7.censored, v.d28.censored]).toEqual([true, true, true]);
  });

  it("an empty cohort yields 0% — not NaN", () => {
    const v = viewCohort(cohort({ signups: 0, signalled: 0, retD1: 0, retD7: 0, retD28: 0 }));
    expect(v.signalPct).toBe(0);
    expect(v.d1.pct).toBe(0);
  });

  it("orders cohorts newest-first", () => {
    const rows = [cohort({ week: "2026-07-06" }), cohort({ week: "2026-08-31" })];
    expect(viewCohorts(rows).map((c) => c.week)).toEqual(["2026-08-31", "2026-07-06"]);
  });
});

const feature = (over: Partial<FeatureRow> = {}): FeatureRow => ({
  kind: "mock_submitted",
  users: 141,
  events: 614,
  usedEligible: 40,
  usedRetained: 30,
  unusedEligible: 20,
  unusedRetained: 4,
  ...over,
});

describe("viewFeature — adoption and retention lift, with a floor", () => {
  it("computes the lift in percentage points", () => {
    const v = viewFeature(feature());
    expect(v.usedRate).toBe(75);
    expect(v.unusedRate).toBe(20);
    expect(v.liftPp).toBe(55);
    expect(v.verdict).toBe("ok");
  });

  it("calls a feature with ZERO users dead — a missing emitter reads as dead, not as bad", () => {
    const v = viewFeature(
      feature({ kind: "quiz_taken", users: 0, events: 0, usedEligible: 0, usedRetained: 0 })
    );
    expect(v.verdict).toBe("dead");
    expect(v.liftPp).toBeNull();
  });

  it("REFUSES a lift when either arm is below the floor", () => {
    const thin = viewFeature(feature({ usedEligible: MIN_LIFT_N - 1, usedRetained: 1 }));
    expect(thin.verdict).toBe("thin");
    expect(thin.usedRate).toBeNull();
    expect(thin.liftPp).toBeNull();

    const thinBase = viewFeature(feature({ unusedEligible: MIN_LIFT_N - 1, unusedRetained: 0 }));
    expect(thinBase.verdict).toBe("thin");
    expect(thinBase.liftPp).toBeNull();
  });

  it("still reports adoption for a thin feature — only the LIFT is withheld", () => {
    const v = viewFeature(feature({ users: 26, usedEligible: 3, usedRetained: 2 }));
    expect(v.users).toBe(26);
    expect(v.verdict).toBe("thin");
  });

  it("drops per-question telemetry kinds — they are not features", () => {
    const rows = ACTIVITY_KINDS.map((kind) => feature({ kind }));
    const keys = viewFeatures(rows).map((f) => f.kind);
    expect(keys).not.toContain("answer_wrong");
    expect(keys).not.toContain("answer_correct");
    expect(keys).toContain("mock_submitted");
  });

  it("sorts by adoption so dead features fall to the bottom", () => {
    const rows = [
      feature({ kind: "quiz_taken", users: 0 }),
      feature({ kind: "mock_submitted", users: 141 }),
    ];
    expect(viewFeatures(rows)[0].kind).toBe("mock_submitted");
  });
});

const segment = (over: Partial<SegmentRow> = {}): SegmentRow => ({
  exam: "NDA",
  students: 60,
  signalled: 45,
  retD28: 24,
  ...over,
});

describe("viewSegment — PMF lives in a segment, not in the average", () => {
  it("reports both rates for a segment above the floor", () => {
    const v = viewSegment(segment());
    expect(v.signalPct).toBe(75);
    expect(v.d28Pct).toBe(40);
    expect(v.thin).toBe(false);
  });

  it("WITHHOLDS the rates for a segment too small to carry them", () => {
    const v = viewSegment(segment({ exam: "CDS", students: MIN_SEGMENT_N - 1, signalled: 3, retD28: 3 }));
    expect(v.thin).toBe(true);
    expect(v.signalPct).toBeNull();
    expect(v.d28Pct).toBeNull();
    expect(v.students).toBe(MIN_SEGMENT_N - 1); // the count itself is still shown
  });

  it("sorts segments by size, largest first", () => {
    const rows = [segment({ exam: "NEET", students: 20 }), segment({ exam: "NDA", students: 60 })];
    expect(viewSegments(rows).map((s) => s.exam)).toEqual(["NDA", "NEET"]);
  });

  it("segments OVERLAP — a student declaring two exams counts in both, so they never sum to the roster", () => {
    // 60 + 40 = 100 declared memberships from (say) 80 distinct students. The view
    // must not imply a partition; nothing here divides by a total.
    const views = viewSegments([
      segment({ exam: "NDA", students: 60, signalled: 45, retD28: 24 }),
      segment({ exam: "CDS", students: 40, signalled: 30, retD28: 12 }),
    ]);
    expect(views.reduce((n, s) => n + s.students, 0)).toBe(100);
    expect(views.every((s) => s.signalPct === null || s.signalPct <= 100)).toBe(true);
  });
});

describe("abandonment — a still-live attempt has not had its chance yet", () => {
  it("excludes live attempts from the denominator", () => {
    const a = abandonment({ started: 730, submitted: 538, expired: 76, stranded: 100, live: 16 });
    expect(a.resolved).toBe(714); // 730 - 16 live
    expect(a.abandoned).toBe(176); // 76 + 100
    expect(a.pct).toBe(25); // 176/714
  });

  it("is 0% — not NaN — when nothing has resolved yet", () => {
    const a = abandonment({ started: 3, submitted: 0, expired: 0, stranded: 0, live: 3 });
    expect(a.resolved).toBe(0);
    expect(a.pct).toBe(0);
  });
});

describe("viewNps — suppress a headline the sample cannot carry", () => {
  it("withholds the score below the response floor but keeps the raw counts", () => {
    const v = viewNps({ scores: [10, 0, 5, 10, 6, 10], eligible: 76 });
    expect(v.rollup.count).toBe(6);
    expect(v.rollup.promoters).toBe(3);
    expect(v.rollup.detractors).toBe(3);
    expect(v.reportable).toBe(false);
    expect(v.responseRate).toBe(8); // 6/76
  });

  it("reports once the floor is met", () => {
    const scores = Array.from({ length: MIN_NPS_RESPONSES }, () => 10);
    const v = viewNps({ scores, eligible: 100 });
    expect(v.reportable).toBe(true);
    expect(v.rollup.score).toBe(100);
  });

  it("has a null response rate when nobody is eligible — not a divide by zero", () => {
    expect(viewNps({ scores: [], eligible: 0 }).responseRate).toBeNull();
  });
});

describe("viewDifficulty — shares of RESPONDENTS, not of submissions", () => {
  it("splits the mix over respondents and rates the response separately", () => {
    const v = viewDifficulty({
      counts: { tooEasy: 9, justRight: 31, tooHard: 26, responses: 66 },
      submitted: 533,
    });
    expect(v.tooHardPct).toBe(39);
    expect(v.justRightPct).toBe(47);
    expect(v.responseRate).toBe(12); // 66/533 — most submitters never rate
  });

  it("returns a null response rate rather than dividing by zero submissions", () => {
    const v = viewDifficulty({
      counts: { tooEasy: 0, justRight: 0, tooHard: 0, responses: 0 },
      submitted: 0,
    });
    expect(v.responseRate).toBeNull();
    expect(v.tooHardPct).toBe(0);
  });
});

describe("signalFunnel — steps named for what is actually measured", () => {
  it("expresses each step against the step before it", () => {
    const steps = signalFunnel({ students: 330, signalled: 245, returned: 90, habit: 76 });
    expect(steps.map((s) => s.count)).toEqual([330, 245, 90, 76]);
    expect(steps[1].pctOfPrev).toBe(74);
    expect(steps[0].pctOfPrev).toBe(100);
  });

  it("labels step 2 as a RECORDED signal, never as 'activated'", () => {
    // The distinction is the whole point: untracked surfaces (the bank) mean a
    // student can be deeply engaged and still register no signal at all.
    const steps = signalFunnel({ students: 330, signalled: 245, returned: 90, habit: 76 });
    expect(steps[1].label.toLowerCase()).toContain("signal");
    expect(steps[1].label.toLowerCase()).not.toContain("activated");
  });

  it("does not divide by zero on an empty roster", () => {
    const steps = signalFunnel({ students: 0, signalled: 0, returned: 0, habit: 0 });
    expect(steps.every((s) => s.pctOfPrev === 0 || s.pctOfPrev === 100)).toBe(true);
  });
});

describe("SURFACE_COVERAGE — the blind spots are ON the page", () => {
  it("marks the question bank as PARTIAL — signed-in reveals land, anon does not", () => {
    // Before 2026-09-16 this surface was fully dark. It is now partial, and the
    // distinction matters: the anon half is excluded by DECISION (a persistent
    // device id on an under-18 audience), not by oversight.
    const bank = SURFACE_COVERAGE.find((s) => s.surface.startsWith("Question bank"));
    expect(bank).toBeDefined();
    expect(bank!.tracked).toBe("partial");
    expect(bank!.kinds).toContain("question_practiced");
    expect(bank!.lost).toMatch(/anon/i);
  });

  it("marks notes as STATE-only — it records that you viewed, never when you viewed before", () => {
    const notes = SURFACE_COVERAGE.find((s) => s.surface.startsWith("Notes"));
    expect(notes!.tracked).toBe("partial");
    expect(notes!.lost).toMatch(/histor/i);
  });

  it("says acquisition is not backfillable, so 'unknown' cannot be read as 'direct'", () => {
    const acq = SURFACE_COVERAGE.find((s) => s.surface.startsWith("Acquisition"));
    expect(acq!.tracked).toBe("partial");
    expect(acq!.lost).toMatch(/backfill/i);
  });

  it("every kind named by a surface is a real activity kind, so the map cannot rot", () => {
    for (const s of SURFACE_COVERAGE) {
      for (const k of s.kinds) expect(ACTIVITY_KINDS).toContain(k);
    }
  });

  it("STRUCTURAL: any surface claiming full or partial tracking must say what records it", () => {
    // A surface cannot claim coverage without either an activity kind or an
    // explicit note — that combination is how a map silently stops being true.
    for (const s of SURFACE_COVERAGE) {
      if (s.tracked === "none") continue;
      expect(s.via.length, s.surface).toBeGreaterThan(0);
      expect(s.via, s.surface).not.toBe("nothing");
    }
  });

  it("STRUCTURAL: every surface that is not fully tracked explains what is lost", () => {
    for (const s of SURFACE_COVERAGE) {
      if (s.tracked === "full") continue;
      expect(s.lost.length, s.surface).toBeGreaterThan(0);
    }
  });

  it("still names at least one fully dark surface — coverage is not complete", () => {
    expect(SURFACE_COVERAGE.some((s) => s.tracked === "none")).toBe(true);
    expect(SURFACE_COVERAGE.some((s) => s.tracked === "full")).toBe(true);
  });
});
