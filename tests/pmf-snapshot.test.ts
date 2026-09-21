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
  viewShare,
  viewStickiness,
  MIN_LIFT_N,
  MIN_SEGMENT_N,
  MIN_NPS_RESPONSES,
  MIN_SHARE_OPPORTUNITIES,
  MIN_STICKINESS_MAU,
  SHARE_LIVE_SINCE,
  SHARE_LABEL,
  SHARE_CAVEAT,
  INSTRUMENT_CHANGED_SINCE,
  INSTRUMENT_CHANGE_CAVEAT,
  type CohortRow,
  type FeatureRow,
  type SegmentRow,
  type ShareCounts,
  type StickinessCounts,
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
    // EMPTY since 2026-09-19, and that is the point: both former entries were
    // claimed by /drill the day the weak-area drill shipped. `answer_correct`
    // now has an emitter (the drill grades server-side and records both
    // verdicts) and `drill_completed` is the drill's own feature event. An
    // empty list is not a reason to delete the check — the next kind added to
    // ACTIVITY_KINDS without a surface must still fail here.
    const UNBUILT: string[] = [];
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

  it("the share surface is on the map and admits it cannot see delivery", () => {
    // The outbound counter exists to disambiguate "nobody shared" from "nobody
    // clicked through". That only works if the reader knows a row is a tap.
    const sh = SURFACE_COVERAGE.find((s) => s.surface.toLowerCase().includes("share"));
    expect(sh).toBeDefined();
    expect(sh!.tracked).toBe("partial");
    expect(sh!.lost).toMatch(/sent|delivery/i);
    // Distribution, not learning: it must never claim a user_activity kind.
    expect(sh!.kinds).toEqual([]);
  });

  it("still names at least one fully dark surface — coverage is not complete", () => {
    expect(SURFACE_COVERAGE.some((s) => s.tracked === "none")).toBe(true);
    expect(SURFACE_COVERAGE.some((s) => s.tracked === "full")).toBe(true);
  });
});

/**
 * The share loop (migration 0109 share_events, surfaced on /dashboard/pmf).
 *
 * THE DENOMINATOR IS THE WHOLE POINT. When this panel was built there were 619
 * finished mock attempts in the table and AT MOST 2 of them could have seen a
 * share button — the affordance shipped on 2026-09-18. Dividing intents by all
 * 619 reports ~0% forever and reads as a dead feature; it is the same defect as
 * a half-period cell rendering like a full one. So the only admissible
 * denominator is attempts submitted since SHARE_LIVE_SINCE, and this core takes
 * `opportunities` as an input rather than computing it from a total it could
 * get wrong.
 *
 * A ROW IS AN INTENT, NOT A DELIVERY. navigator.share() resolves when the OS
 * sheet is dismissed and never reports the chosen app, so nothing here may be
 * labelled "shares". The wording lives in the core and is pinned below, because
 * a caveat that lives only in a migration header does not reach the reader.
 */
describe("viewShare — the share loop, and the denominator it must use", () => {
  const counts = (over: Partial<ShareCounts> = {}): ShareCounts => ({
    events: 0,
    withScore: 0,
    byChannel: { whatsapp: 0, share: 0, copy: 0 },
    byMock: [],
    opportunities: 0,
    inboundSignups: 0,
    ...over,
  });

  it("withholds the share RATE below the opportunity floor, and still shows the counts", () => {
    const v = viewShare(counts({ events: 1, opportunities: 2 }));

    expect(v.reportable).toBe(false);
    expect(v.sharePct).toBeNull();
    // The counts are never withheld — only the rate derived from too few of them.
    expect(v.counts.events).toBe(1);
    expect(v.counts.opportunities).toBe(2);
  });

  it("reports the share rate once enough opportunities exist", () => {
    const v = viewShare(
      counts({ events: 15, opportunities: MIN_SHARE_OPPORTUNITIES * 2 })
    );

    expect(v.reportable).toBe(true);
    expect(v.sharePct).toBe(30);
  });

  it("ZERO opportunities yields null, never 0% — nobody has been asked yet", () => {
    const v = viewShare(counts({ events: 0, opportunities: 0 }));

    expect(v.sharePct).toBeNull();
    expect(v.reportable).toBe(false);
  });

  it("a zero share rate over a REAL sample is reported as 0, not withheld", () => {
    // The floor exists to suppress noise, not bad news. Once enough students
    // have seen the button, "none of them tapped it" is a finding.
    const v = viewShare(counts({ events: 0, opportunities: 200 }));

    expect(v.reportable).toBe(true);
    expect(v.sharePct).toBe(0);
  });

  it("computes score opt-in over INTENTS, and withholds it when there are none", () => {
    expect(viewShare(counts({ events: 0, withScore: 0 })).scoreOptInPct).toBeNull();
    expect(viewShare(counts({ events: 8, withScore: 2 })).scoreOptInPct).toBe(25);
  });

  it("computes signups per intent, and withholds it when nothing was shared", () => {
    // Inbound alone is ambiguous: zero signups reads identically whether nobody
    // tapped share or plenty did and nobody clicked. The ratio only exists once
    // the outbound side is non-zero.
    expect(viewShare(counts({ events: 0, inboundSignups: 0 })).signupsPerShare).toBeNull();
    expect(viewShare(counts({ events: 20, inboundSignups: 5 })).signupsPerShare).toBe(25);
  });

  it("keeps the OS share sheet distinct from WhatsApp", () => {
    // 'share' is navigator.share() — the destination app is genuinely unknown.
    // Folding it into whatsapp would invent a fact the browser never gave us.
    const v = viewShare(
      counts({ events: 6, byChannel: { whatsapp: 3, share: 2, copy: 1 } })
    );

    expect(v.counts.byChannel.whatsapp).toBe(3);
    expect(v.counts.byChannel.share).toBe(2);
    expect(v.counts.byChannel.copy).toBe(1);
  });

  it("never reports a rate the counts cannot support, across a sweep", () => {
    for (let opp = 0; opp < MIN_SHARE_OPPORTUNITIES; opp++) {
      expect(viewShare(counts({ events: 1, opportunities: opp })).sharePct).toBeNull();
    }
  });

  it("SHARE_LIVE_SINCE is a real instant, and not in the future", () => {
    const t = Date.parse(SHARE_LIVE_SINCE);
    expect(Number.isNaN(t)).toBe(false);
    expect(t).toBeLessThanOrEqual(Date.now());
  });

  it("the rendered wording says INTENT, never bare 'shares'", () => {
    // A row does not prove anything was sent. This is pinned in the core so the
    // page cannot quietly relabel it — the migration header's caveat is only
    // load-bearing if it reaches the person reading the number.
    expect(SHARE_LABEL.toLowerCase()).toContain("intent");
    expect(SHARE_CAVEAT.toLowerCase()).toContain("intent");
    expect(SHARE_CAVEAT.length).toBeGreaterThan(20);
  });
});

/**
 * Stickiness — DAU/MAU, WAU/MAU and the L28 shape (/dashboard/pmf).
 *
 * THREE THINGS MAKE THIS METRIC LIE ON THIS PRODUCT, and each has a refusal.
 *
 * 1. THE NUMERATOR. DAU has a one-day memory and MAU a 28-day one, so after a
 *    batch mock drive the ratio falls for calendar reasons. Measured on the
 *    live bank: 6 active on 2026-09-21 and 15 on 2026-09-20 against the same
 *    MAU of 183 — the headline halves overnight on a cohort this size. So the
 *    numerator is the window's AVERAGE DAU (studentDays / windowDays), and
 *    `dauToday` is carried for context only, never divided by anything.
 * 2. THE INSTRUMENT MOVED. question_practiced and mock_started first wrote on
 *    2026-09-17, drill_completed on 2026-09-19. On 2026-09-20, 13 of 15 active
 *    students were active ONLY through an instrument that did not exist four
 *    days earlier — under the old set that day's DAU was 2. Any window
 *    straddling that date measures the instrumentation, not the students, so it
 *    is FLAGGED on the number rather than in a footnote.
 * 3. THE WINDOW HAS TO EXIST. The first signal ever recorded is 2026-07-10.
 *    Dividing studentDays by 28 when only 10 of those days had a product to use
 *    understates the average — so a window that starts before the first signal
 *    withholds instead of computing. Same family as viewCohort's censoring.
 *
 * The BUCKETS are never withheld: they are counts, and the L28 distribution is
 * the honest answer to "are students coming back" that no single ratio gives.
 */
describe("viewStickiness — DAU/MAU, and the three things that make it lie here", () => {
  // The live shape on 2026-09-21, so the fixture is a real measurement rather
  // than a round number that could hide a rounding defect.
  const stick = (over: Partial<StickinessCounts> = {}): StickinessCounts => ({
    windowDays: 28,
    windowStart: "2026-08-25",
    mau: 181,
    wau: 35,
    dauToday: 6,
    studentDays: 488,
    activeDays: [
      { days: 1, students: 87 },
      { days: 2, students: 40 },
      { days: 3, students: 20 },
      { days: 4, students: 10 },
      { days: 5, students: 5 },
      { days: 6, students: 3 },
      { days: 8, students: 3 },
      { days: 9, students: 4 },
      { days: 10, students: 1 },
      { days: 11, students: 1 },
      { days: 12, students: 4 },
      { days: 14, students: 1 },
      { days: 16, students: 1 },
      { days: 19, students: 1 },
    ],
    firstSignalDay: "2026-07-10",
    ...over,
  });

  it("reports all three rates on a window the data can carry", () => {
    const v = viewStickiness(stick({ windowStart: "2026-10-01" }));

    expect(v.withheld).toBeNull();
    expect(v.reportable).toBe(true);
    expect(v.avgDau).toBe(17.4); // 488 / 28
    expect(v.dauMau).toBe(9.6); // 488 / (181 * 28)
    expect(v.wauMau).toBe(19.3); // 35 / 181
    expect(v.studyDaysPerStudent).toBe(2.7); // 488 / 181
  });

  it("keeps ONE DECIMAL — a whole percent is 10% granularity on a number that sits at 9", () => {
    // Every other rate on this page is a whole percent because it lives in the
    // tens. Stickiness lives in single digits, where rounding 9.6 to 10 moves
    // the number by more than a month of real change would.
    expect(viewStickiness(stick({ windowStart: "2026-10-01", studentDays: 480 })).dauMau).toBe(9.5);
    expect(viewStickiness(stick({ windowStart: "2026-10-01", studentDays: 495 })).dauMau).toBe(9.8);
  });

  it("divides by the WHOLE window, not by the days that happened to be busy", () => {
    // A quiet day is a real zero: the product existed and nobody came.
    // Averaging over active days only would report a number that RISES as usage
    // becomes more concentrated, which is backwards.
    const v = viewStickiness(
      stick({ windowStart: "2026-10-01", windowDays: 28, studentDays: 28, mau: 28 })
    );
    expect(v.avgDau).toBe(1);
    expect(v.dauMau).toBe(3.6); // 28 / (28*28), not 100
  });

  it("NEVER divides by dauToday — it is carried for context only", () => {
    // The 2.5x overnight swing this avoids: same MAU, DAU 6 vs 15.
    const a = viewStickiness(stick({ windowStart: "2026-10-01", dauToday: 6 }));
    const b = viewStickiness(stick({ windowStart: "2026-10-01", dauToday: 15 }));
    expect(a.dauMau).toBe(b.dauMau);
    expect(a.counts.dauToday).toBe(6);
    expect(b.counts.dauToday).toBe(15);
  });

  it("WITHHOLDS every rate below the MAU floor, and still shows the counts", () => {
    const v = viewStickiness(
      stick({ windowStart: "2026-10-01", mau: MIN_STICKINESS_MAU - 1, studentDays: 40, wau: 5 })
    );

    expect(v.withheld).toBe("thin");
    expect(v.reportable).toBe(false);
    expect(v.dauMau).toBeNull();
    expect(v.wauMau).toBeNull();
    expect(v.avgDau).toBeNull();
    expect(v.studyDaysPerStudent).toBeNull();
    // Counts survive — only the rates derived from too few of them are withheld.
    expect(v.counts.mau).toBe(MIN_STICKINESS_MAU - 1);
    expect(v.counts.wau).toBe(5);
  });

  it("never reports a rate the sample cannot support, across a sweep", () => {
    for (let mau = 0; mau < MIN_STICKINESS_MAU; mau++) {
      const v = viewStickiness(stick({ windowStart: "2026-10-01", mau, studentDays: mau * 3 }));
      expect(v.dauMau, `mau=${mau}`).toBeNull();
    }
  });

  it("WITHHOLDS when the window starts before the first signal ever recorded", () => {
    // The MAU-still-filling trap. A 28-day average over a product that only
    // existed for 10 of those days is not a low number, it is a wrong one.
    const v = viewStickiness(stick({ windowStart: "2026-07-01", firstSignalDay: "2026-07-10" }));

    expect(v.withheld).toBe("short-history");
    expect(v.dauMau).toBeNull();
    expect(v.wauMau).toBeNull();
  });

  it("reports at the exact boundary — a window starting ON the first signal is complete", () => {
    expect(
      viewStickiness(stick({ windowStart: "2026-07-10", firstSignalDay: "2026-07-10" })).withheld
    ).toBeNull();
    expect(
      viewStickiness(stick({ windowStart: "2026-07-09", firstSignalDay: "2026-07-10" })).withheld
    ).toBe("short-history");
  });

  it("short history OUTRANKS a thin sample — the denominator is the deeper defect", () => {
    // Both are true here. The sample floor says "ask again when more students
    // arrive"; the history floor says "this window cannot be averaged at all".
    // Reporting the first would send the reader away waiting for the wrong thing.
    const v = viewStickiness(
      stick({ windowStart: "2026-07-01", firstSignalDay: "2026-07-10", mau: 3, studentDays: 4 })
    );
    expect(v.withheld).toBe("short-history");
  });

  it("an empty bank withholds rather than dividing by zero", () => {
    const v = viewStickiness(
      stick({ mau: 0, wau: 0, dauToday: 0, studentDays: 0, activeDays: [], firstSignalDay: null })
    );

    // Nothing has ever been recorded, so there is no window to average over —
    // which is a statement about the denominator, not about the sample size.
    expect(v.withheld).toBe("short-history");
    expect(v.dauMau).toBeNull();
    expect(v.avgDau).toBeNull();
    expect(v.buckets.every((b) => b.students === 0)).toBe(true);
    expect(v.bucketedStudents).toBe(0);
  });

  it("a ZERO rate over a real sample IS reported — the floor suppresses noise, not bad news", () => {
    // Same asymmetry viewShare documents. Once enough students exist, "nobody
    // came back all week" is a finding, not an absence of one.
    const v = viewStickiness(
      stick({
        windowStart: "2026-10-01",
        mau: 200,
        wau: 0,
        studentDays: 200,
        activeDays: [{ days: 1, students: 200 }],
      })
    );
    expect(v.reportable).toBe(true);
    expect(v.wauMau).toBe(0);
  });

  it("buckets the L28 distribution at 1 / 2 / 3 / 4-7 / 8+", () => {
    const v = viewStickiness(stick());
    expect(v.buckets.map((b) => [b.label, b.students])).toEqual([
      ["1 day", 87],
      ["2 days", 40],
      ["3 days", 20],
      ["4–7 days", 18], // 10 + 5 + 3
      ["8+ days", 16], // 3+4+1+1+4+1+1+1
    ]);
  });

  it("STRUCTURAL: the buckets partition the active students exactly", () => {
    // One student at every possible day-count. A boundary that double-counts or
    // drops a day shows up here and nowhere else.
    const activeDays = Array.from({ length: 28 }, (_, i) => ({ days: i + 1, students: 1 }));
    const v = viewStickiness(stick({ windowStart: "2026-10-01", mau: 28, activeDays }));

    expect(v.buckets.reduce((n, b) => n + b.students, 0)).toBe(28);
    expect(v.buckets.map((b) => b.students)).toEqual([1, 1, 1, 4, 21]);
  });

  it("reports what the buckets actually cover rather than assuming they cover the MAU", () => {
    // The two come from different aggregates. If they ever disagree the page
    // must be able to SAY so — a core that silently rescaled to the MAU would
    // make a broken histogram look correct.
    const v = viewStickiness(
      stick({ windowStart: "2026-10-01", mau: 200, activeDays: [{ days: 1, students: 150 }] })
    );
    expect(v.bucketedStudents).toBe(150);
    expect(v.counts.mau).toBe(200);
  });

  it("buckets are shown even when every rate is withheld — they are counts, not rates", () => {
    const v = viewStickiness(stick({ windowStart: "2026-07-01", firstSignalDay: "2026-07-10" }));
    expect(v.withheld).toBe("short-history");
    expect(v.bucketedStudents).toBe(181);
  });

  it("FLAGS a window that straddles the instrumentation change", () => {
    expect(viewStickiness(stick({ windowStart: "2026-08-25" })).instrumentChanged).toBe(true);
  });

  it("turns the flag off by itself once the window clears the change date", () => {
    // It must expire without anyone remembering to delete it — a warning that
    // outlives its cause trains the reader to ignore warnings.
    expect(viewStickiness(stick({ windowStart: "2026-09-16" })).instrumentChanged).toBe(true);
    expect(viewStickiness(stick({ windowStart: INSTRUMENT_CHANGED_SINCE })).instrumentChanged).toBe(
      false
    );
    expect(viewStickiness(stick({ windowStart: "2026-10-01" })).instrumentChanged).toBe(false);
  });

  it("an ABSENT window start does not read as an early one", () => {
    // emptySnapshot() carries "" when the RPC has not answered. A lexical
    // compare would call that a straddling window and warn about the
    // instrumentation of a window that does not exist.
    const v = viewStickiness(
      stick({ windowStart: "", mau: 0, studentDays: 0, activeDays: [], firstSignalDay: null })
    );
    expect(v.instrumentChanged).toBe(false);
  });

  it("a flagged window is still REPORTED — the warning qualifies the number, it does not withhold it", () => {
    const v = viewStickiness(stick({ windowStart: "2026-08-25" }));
    expect(v.instrumentChanged).toBe(true);
    expect(v.reportable).toBe(true);
    expect(v.dauMau).not.toBeNull();
  });

  it("the caveat names the date and the kinds, so the reader can go and check", () => {
    // Pinned in the core for the same reason SHARE_CAVEAT is: a caveat that
    // lives only in a migration header never reaches the person reading.
    expect(INSTRUMENT_CHANGE_CAVEAT).toContain(INSTRUMENT_CHANGED_SINCE);
    for (const kind of ["question_practiced", "mock_started", "drill_completed"]) {
      expect(INSTRUMENT_CHANGE_CAVEAT, kind).toContain(kind);
    }
  });

  it("INSTRUMENT_CHANGED_SINCE is a real past date", () => {
    const t = Date.parse(INSTRUMENT_CHANGED_SINCE);
    expect(Number.isNaN(t)).toBe(false);
    expect(t).toBeLessThanOrEqual(Date.now());
  });

  it("STRUCTURAL: every kind the caveat names is a real activity kind", () => {
    // The same rot-guard SURFACE_COVERAGE gets: a renamed kind must break here
    // rather than leave the banner naming something that no longer exists.
    const named = ACTIVITY_KINDS.filter((k) => INSTRUMENT_CHANGE_CAVEAT.includes(k));
    expect(named).toContain("question_practiced");
    expect(named).toContain("mock_started");
    expect(named).toContain("drill_completed");
  });
});
