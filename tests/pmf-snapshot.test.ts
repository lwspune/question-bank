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
  FEATURE_LABELS,
  TELEMETRY_KINDS,
  MIN_LIFT_N,
  MIN_SEGMENT_N,
  MIN_NPS_RESPONSES,
  type CohortRow,
  type FeatureRow,
  type SegmentRow,
} from "@/lib/pmf/snapshot";
import { ACTIVITY_KINDS } from "@/lib/activity/events";
import { PRACTICE_SURFACES, DEFAULT_PRACTICE_SURFACE } from "@/lib/questions/practiceBatch";

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

  it("labels the surface-split practice key, rather than printing a raw composite", () => {
    // get_pmf_snapshot splits question_practiced by reveal surface (migration
    // 0107), so a feature key can be "question_practiced:guide". Without a label
    // the page would render the composite key at a reader.
    const v = viewFeature(feature({ kind: "question_practiced:guide" }));
    expect(v.label).toBe("Guide worked examples");
    expect(v.label).not.toContain(":");
  });

  it("labels the board reader's split key too", () => {
    // Added 2026-09-18. /board shared useRevealMeter with /browse, so its
    // reveals were recorded from 0105 onward — under the bank's surface, which
    // made the textbook reader unmeasurable while looking instrumented.
    const v = viewFeature(feature({ kind: "question_practiced:board" }));
    expect(v.label).toBe("Board reader");
    expect(v.label).not.toContain(":");
  });

  it("keeps a surface-split key OUT of the telemetry drop — it is a feature", () => {
    const rows = [feature({ kind: "question_practiced:guide" })];
    expect(viewFeatures(rows).map((f) => f.kind)).toContain("question_practiced:guide");
  });

  it("STRUCTURAL: every activity kind is either a labelled feature or declared telemetry", () => {
    // This is the guard for the defect that prompted the whole change. 0103's
    // kind list carried a comment claiming it mirrored ACTIVITY_KINDS; when 0105
    // added question_practiced hours later, nothing noticed, and "Bank practice"
    // had a label that could never render. A kind must be one or the other, and
    // adding a kind without deciding which now fails here.
    for (const kind of ACTIVITY_KINDS) {
      const decided =
        FEATURE_LABELS[kind] !== undefined || TELEMETRY_KINDS.includes(kind);
      expect(decided, `${kind} is neither a labelled feature nor declared telemetry`).toBe(true);
    }
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

  it("marks GUIDES as partial — worked-example reveals land, reading the prose does not", () => {
    // Until 2026-09-17 this row read "Guides (/guide), blog (/blog) · not tracked
    // · read-only content surfaces emit nothing". Half of that was wrong:
    // WorkedExampleCard has always had a three-stage reveal over real bank
    // questions, structurally identical to the act recorded on /browse and
    // /board. It was not a read-only surface; the beacon was simply never wired
    // into it. Guides and blog are therefore separate rows with separate reasons.
    const guides = SURFACE_COVERAGE.find((s) => s.surface.startsWith("Guides"));
    expect(guides).toBeDefined();
    expect(guides!.tracked).toBe("partial");
    expect(guides!.kinds).toContain("question_practiced");
    expect(guides!.via).not.toBe("nothing");
    expect(guides!.lost).toMatch(/prose|reading/i);
  });

  it("keeps BLOG dark, and for the honest reason — there is no discrete act to record", () => {
    // The one genuinely unmeasurable surface. A post offers only "viewed", which
    // clears no learning bar and would outnumber every real signal on the page.
    const blog = SURFACE_COVERAGE.find((s) => s.surface.startsWith("Blog"));
    expect(blog).toBeDefined();
    expect(blog!.tracked).toBe("none");
    expect(blog!.kinds).toEqual([]);
    expect(blog!.lost).toMatch(/view/i);
  });

  it("STRUCTURAL: no row bundles two surfaces, so one can never hide the other's status", () => {
    // The guide/blog row hid an instrumentation GAP behind a correct statement
    // about the blog for as long as the two shared a line.
    for (const s of SURFACE_COVERAGE) {
      expect(s.surface, s.surface).not.toMatch(/\),\s/);
    }
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

  it("marks the BOARD READER as partial and as a surface of its OWN", () => {
    // It was never dark: BoardReader has called useRevealMeter since 0105, so
    // every reveal was recorded — with no surface, therefore under the bank's
    // default. A row that is recorded but indistinguishable is worse than a
    // dark one, because the coverage table reads as instrumented and the
    // feature table silently attributes the reader's use to /browse.
    const board = SURFACE_COVERAGE.find((s) => s.surface.startsWith("Board reader"));
    expect(board).toBeDefined();
    expect(board!.tracked).toBe("partial");
    expect(board!.kinds).toContain("question_practiced");
    expect(board!.practiceSurface).toBe("board");
    // The split starts at deploy: earlier reveals carry no surface at all and
    // COALESCE puts them in the bank's row forever. Unbackfillable, so it has
    // to be said here rather than left for a reader to infer.
    expect(board!.lost).toMatch(/2026-09-18|before/i);
  });

  it("STRUCTURAL: reveal surfaces are a BIJECTION — one coverage row, one value, one label", () => {
    // THE GUARD FOR THIS WHOLE CLASS. /guide (2026-09-17) and /board
    // (2026-09-18) were both recording reveals that nothing could tell apart,
    // and neither was detectable from the outside: the events existed, the
    // coverage row claimed tracking, and only reading the call site revealed
    // that the surface argument was missing. A fourth reveal surface now fails
    // here unless it is declared, given a PracticeSurface of its own, and given
    // a human label — which is exactly the set of steps that was skipped twice.
    const rows = SURFACE_COVERAGE.filter((s) => s.kinds.includes("question_practiced"));
    for (const r of rows) expect(r.practiceSurface, r.surface).toBeDefined();

    const declared = rows.map((r) => r.practiceSurface!);
    // No two surfaces share a value — that sharing IS the defect.
    expect(new Set(declared).size).toBe(rows.length);
    // And no value exists without a row, so the list cannot outgrow the page.
    expect([...declared].sort()).toEqual([...PRACTICE_SURFACES].sort());

    // Every surface renders as prose in the feature table, never a raw key.
    for (const surface of PRACTICE_SURFACES) {
      const key =
        surface === DEFAULT_PRACTICE_SURFACE ? "question_practiced" : `question_practiced:${surface}`;
      const label = viewFeature(feature({ kind: key })).label;
      expect(label, key).not.toBe(key);
      expect(label, key).not.toContain(":");
    }
  });

  it("every kind named by a surface is a real activity kind, so the map cannot rot", () => {
    for (const s of SURFACE_COVERAGE) {
      for (const k of s.kinds) expect(ACTIVITY_KINDS).toContain(k);
    }
  });

  it("STRUCTURAL: every activity kind is claimed by a surface, or explicitly exempt", () => {
    // THE REVERSE of the assertion above, and its absence is exactly how the
    // quiz funnel stayed invisible. `quiz_taken` was in ACTIVITY_KINDS and in
    // the 0052 DB CHECK from the start, and carried a label in THREE surfaces —
    // while /quiz appeared in SURFACE_COVERAGE not at all and no code ever
    // emitted it. Checking only "surface -> kind" could never catch that; the
    // map was not wrong about anything it mentioned, it simply did not mention
    // the funnel.
    //
    // A kind may be exempt, but exempting it has to be a DELIBERATE act here
    // rather than an omission somewhere else. Both current entries are reserved
    // in the allowlist and the DB CHECK with no emitter anywhere in src/ or
    // scripts/ — verified, not assumed:
    const UNBUILT: string[] = [
      "answer_correct", // reserved beside answer_wrong; only the WRONG half is emitted (drill fuel)
      "drill_completed", // personalised weak-area drills are a future phase
    ];
    const claimed = new Set(SURFACE_COVERAGE.flatMap((s) => s.kinds));
    for (const kind of ACTIVITY_KINDS) {
      if (UNBUILT.includes(kind)) {
        expect(claimed.has(kind), `${kind} is exempt as unbuilt but a surface claims it`).toBe(false);
        continue;
      }
      expect(claimed.has(kind), `${kind} is emitted but no SURFACE_COVERAGE row accounts for it`).toBe(true);
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
