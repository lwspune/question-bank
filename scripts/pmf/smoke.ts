/**
 * Drive /dashboard/pmf's OWN loader + the whole pure core against live data.
 *
 *   npm run pmf:smoke
 *
 * That page is superadmin-gated and `force-dynamic`, so `next build` never
 * executes it: a green build proves it COMPILES and nothing more. This runs the
 * loader the page actually calls, then every derived number, and THROWS on any
 * internal contradiction — the class of failure that a type-check cannot see
 * because the numbers are all just integers.
 *
 * The assertions below are the point. Each one is an invariant the RPC must
 * satisfy for the page's rates to mean what their labels say:
 *   · every subset count is <= its superset
 *   · the two lift arms must PARTITION the mature pool (used + unused == pool);
 *     if they ever disagree, a feature's "didn't use it" column is being drawn
 *     from a different population than its "used it" column
 *   · attempt statuses must partition the attempts
 *   · a censored horizon must be reported as null, never as 0%
 *
 * It does NOT prove the page lays out. That is owed to a browser.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`INVARIANT VIOLATED — ${msg}`);
}

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { fetchPmfSnapshot, fetchShareSnapshot } = await import("@/lib/pmf/query");
  const {
    viewCohorts,
    viewFeatures,
    viewSegments,
    viewDifficulty,
    abandonment,
    viewNps,
    signalFunnel,
    viewShare,
    viewStickiness,
    SURFACE_COVERAGE,
    MIN_SHARE_OPPORTUNITIES,
    MIN_STICKINESS_MAU,
    SHARE_LIVE_SINCE,
    INSTRUMENT_CHANGED_SINCE,
  } = await import("@/lib/pmf/snapshot");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const snap = await fetchPmfSnapshot(db, 12);

  // ── Funnel ────────────────────────────────────────────────────────────────
  const f = snap.funnel;
  console.log(
    `funnel: ${f.students} students → ${f.signalled} signalled → ${f.returned} returned → ${f.habit} habit`
  );
  assert(f.students > 0, "no students came back — the RPC or the grant is wrong");
  assert(f.signalled <= f.students, "more signalled students than students exist");
  assert(f.returned <= f.signalled, "a student returned without ever leaving a signal");
  const steps = signalFunnel(f);
  assert(steps.length === 4, "the funnel lost a step");
  assert(
    !steps[1].label.toLowerCase().includes("activated"),
    "step 2 is labelled 'activated' — it measures recorded signals, not activation"
  );

  // ── Mature pool + feature lift arms ───────────────────────────────────────
  const pool = snap.maturePool;
  console.log(
    `mature pool: ${pool.students} signed up 28d+ ago, ${pool.signalled} signalled, ${pool.retained} retained`
  );
  assert(pool.signalled <= pool.students, "mature signalled exceeds mature students");
  assert(pool.retained <= pool.signalled, "retained exceeds the pool it is drawn from");

  for (const row of snap.features) {
    assert(
      row.usedEligible + row.unusedEligible === pool.signalled,
      `feature ${row.kind}: lift arms (${row.usedEligible}+${row.unusedEligible}) do not partition the mature pool (${pool.signalled})`
    );
    assert(
      row.usedRetained + row.unusedRetained === pool.retained,
      `feature ${row.kind}: retained arms do not partition the pool's retained (${pool.retained})`
    );
    assert(row.usedRetained <= row.usedEligible, `feature ${row.kind}: retained exceeds eligible`);
  }

  const features = viewFeatures(snap.features);
  console.log(`\nfeatures (${features.length} after dropping per-question telemetry):`);
  for (const v of features) {
    const lift = v.liftPp === null ? `(${v.verdict})` : `${v.liftPp > 0 ? "+" : ""}${v.liftPp}pp`;
    console.log(`  ${v.label.padEnd(20)} ${String(v.users).padStart(4)} students  ${lift}`);
  }
  assert(
    !features.some((v) => v.kind === "answer_wrong" || v.kind === "answer_correct"),
    "per-question telemetry leaked into the feature table"
  );

  // ── Cohorts + censoring ───────────────────────────────────────────────────
  const cohorts = viewCohorts(snap.cohorts);
  console.log(`\ncohorts: ${cohorts.length}`);
  let censoredCells = 0;
  for (const c of cohorts) {
    assert(c.signalled <= c.signups, `cohort ${c.week}: signalled exceeds signups`);
    for (const [name, cell] of [["d1", c.d1], ["d7", c.d7], ["d28", c.d28]] as const) {
      if (cell.censored) {
        censoredCells += 1;
        assert(cell.pct === null, `cohort ${c.week} ${name}: censored cell still reported a percent`);
      } else {
        assert(cell.value !== null && cell.value <= c.signups, `cohort ${c.week} ${name}: retained exceeds signups`);
      }
    }
    const show = (cell: { pct: number | null }) => (cell.pct === null ? "  — " : `${String(cell.pct).padStart(3)}%`);
    console.log(
      `  ${c.week}  n=${String(c.signups).padStart(3)}  signal ${String(c.signalPct).padStart(3)}%  d1 ${show(c.d1)}  d7 ${show(c.d7)}  d28 ${show(c.d28)}`
    );
  }
  console.log(`  censored cells: ${censoredCells} (recent cohorts, correctly blank rather than 0%)`);

  // ── Segments ──────────────────────────────────────────────────────────────
  const segments = viewSegments(snap.segments);
  console.log(`\nsegments (declared target exams, overlapping):`);
  for (const s of segments) {
    assert(s.signalled <= s.students, `segment ${s.exam}: signalled exceeds students`);
    const rates = s.thin ? "too few to rate" : `signal ${s.signalPct}% · d28 ${s.d28Pct}%`;
    console.log(`  ${s.exam.padEnd(20)} ${String(s.students).padStart(4)} students  ${rates}`);
  }

  // ── Attempts + difficulty + NPS ───────────────────────────────────────────
  const a = snap.attempts;
  assert(
    a.submitted + a.expired + a.stranded + a.live === a.started,
    `attempt statuses do not partition the attempts (${a.submitted}+${a.expired}+${a.stranded}+${a.live} != ${a.started})`
  );
  const ab = abandonment(a);
  console.log(
    `\nattempts: ${ab.started} started, ${ab.abandoned} abandoned of ${ab.resolved} resolved = ${ab.pct}%`
  );

  const d = viewDifficulty({ counts: snap.difficulty, submitted: a.submitted });
  assert(
    snap.difficulty.tooEasy + snap.difficulty.justRight + snap.difficulty.tooHard ===
      snap.difficulty.responses,
    "difficulty ratings do not sum to the response count"
  );
  console.log(
    `difficulty: ${d.tooEasyPct}% easy / ${d.justRightPct}% right / ${d.tooHardPct}% hard, from ${snap.difficulty.responses} ratings (${d.responseRate}% of submissions)`
  );

  const nps = viewNps(snap.nps);
  for (const s of snap.nps.scores) assert(s >= 0 && s <= 10, `NPS score out of range: ${s}`);
  console.log(
    `nps: ${nps.rollup.count} responses from ${nps.eligible} eligible (${nps.responseRate}%) — ${nps.reportable ? `score ${nps.rollup.score}` : "below the reporting floor, score withheld"}`
  );

  // ── Share loop (0109/0111) ────────────────────────────────────────────────
  // The invariant that matters here is the DENOMINATOR. `opportunities` counts
  // attempts finished since the share button shipped, so it must never exceed
  // the all-time submitted count — and when it equals it, the anchor constant is
  // almost certainly wrong (it would mean no attempt predates the feature).
  const share = viewShare(await fetchShareSnapshot(db, SHARE_LIVE_SINCE));
  const sc = share.counts;

  assert(sc.withScore <= sc.events, "more score-opt-ins than share intents");
  assert(
    sc.byChannel.whatsapp + sc.byChannel.share + sc.byChannel.copy === sc.events,
    `channel counts (${sc.byChannel.whatsapp}+${sc.byChannel.share}+${sc.byChannel.copy}) do not sum to ${sc.events} intents`
  );
  assert(
    sc.byMock.reduce((n, m) => n + m.events, 0) <= sc.events,
    "per-mock intents exceed the total"
  );
  assert(
    sc.opportunities <= a.submitted,
    `opportunities (${sc.opportunities}) exceed all submitted attempts (${a.submitted}) — the since-anchor is not filtering`
  );
  if (sc.events === 0) {
    assert(
      share.signupsPerShare === null,
      "signups-per-intent reported a rate with zero intents in the denominator"
    );
  }
  if (sc.opportunities < MIN_SHARE_OPPORTUNITIES) {
    assert(
      share.sharePct === null,
      `share rate reported on only ${sc.opportunities} opportunities (floor is ${MIN_SHARE_OPPORTUNITIES})`
    );
  }

  console.log(
    `
share loop: ${sc.events} intents over ${sc.opportunities} opportunities since ${SHARE_LIVE_SINCE}` +
      ` — ${share.sharePct === null ? "below the floor, rate withheld" : `${share.sharePct}%`}`
  );
  console.log(
    `  channels: ${sc.byChannel.whatsapp} whatsapp / ${sc.byChannel.share} os-sheet / ${sc.byChannel.copy} copy` +
      ` · score opt-in ${share.scoreOptInPct === null ? "n/a" : `${share.scoreOptInPct}%`}` +
      ` · inbound ${sc.inboundSignups} signups`
  );
  if (sc.opportunities === 0) {
    console.log("  NOTE: nobody has finished a mock since the button shipped — 0 intents proves nothing yet.");
  }

  // ── Stickiness (0112) ─────────────────────────────────────────────────────
  // The invariants here are all about the DENOMINATORS lining up. Three of the
  // numbers come from separate aggregates over the same window, so nothing but
  // a live cross-check can catch one of them drifting: the histogram must
  // account for exactly the monthly actives, the nested windows must nest, and
  // studentDays must be consistent with both (at least one day each, at most
  // windowDays each). A unit test cannot see any of this — its fixtures are
  // internally consistent by construction.
  const st = viewStickiness(snap.stickiness);
  const s0 = st.counts;

  assert(s0.windowDays > 0, "stickiness window has no length");
  assert(s0.dauToday <= s0.wau, `DAU (${s0.dauToday}) exceeds WAU (${s0.wau}) — windows do not nest`);
  assert(s0.wau <= s0.mau, `WAU (${s0.wau}) exceeds MAU (${s0.mau}) — windows do not nest`);
  assert(
    st.bucketedStudents === s0.mau,
    `L${s0.windowDays} histogram accounts for ${st.bucketedStudents} students but MAU is ${s0.mau} — two aggregates over one window disagree`
  );
  assert(
    s0.studentDays >= s0.mau,
    `studentDays (${s0.studentDays}) is below MAU (${s0.mau}) — every monthly active owes at least one active day`
  );
  assert(
    s0.studentDays <= s0.mau * s0.windowDays,
    `studentDays (${s0.studentDays}) exceeds ${s0.mau} students x ${s0.windowDays} days — a student was counted twice on one day`
  );
  assert(
    s0.activeDays.every((r) => r.days >= 1 && r.days <= s0.windowDays),
    `a student is recorded active on more than ${s0.windowDays} days, or on none`
  );
  // The whole reason the numerator is an average: dauToday must never reach it.
  if (st.dauMau !== null) {
    assert(st.avgDau !== null, "reported DAU/MAU without an average DAU to build it from");
  }
  if (s0.mau < MIN_STICKINESS_MAU) {
    assert(
      st.dauMau === null && st.wauMau === null,
      `stickiness rates reported on only ${s0.mau} monthly actives (floor is ${MIN_STICKINESS_MAU})`
    );
  }
  if (s0.firstSignalDay !== null && s0.windowStart < s0.firstSignalDay) {
    assert(
      st.withheld === "short-history",
      "averaged over a window that opens before the first signal ever recorded"
    );
  }

  console.log(
    `\nstickiness: ${s0.mau} MAU / ${s0.wau} WAU / ${s0.dauToday} today` +
      ` over ${s0.windowDays}d from ${s0.windowStart} (first signal ${s0.firstSignalDay ?? "none"})`
  );
  console.log(
    `  DAU/MAU ${st.dauMau === null ? `withheld (${st.withheld})` : `${st.dauMau}%`}` +
      ` · WAU/MAU ${st.wauMau === null ? "withheld" : `${st.wauMau}%`}` +
      ` · ${st.studyDaysPerStudent ?? "n/a"} study days per student` +
      ` · avg DAU ${st.avgDau ?? "n/a"}`
  );
  console.log(`  L${s0.windowDays}: ${st.buckets.map((b) => `${b.label} ${b.students}`).join(" · ")}`);
  if (st.instrumentChanged) {
    console.log(
      `  NOTE: the window opens before ${INSTRUMENT_CHANGED_SINCE}, when the recorded-act set grew.` +
        " A rise across it is instrumentation before it is behaviour."
    );
  }

  // ── Coverage map ──────────────────────────────────────────────────────────
  const dark = SURFACE_COVERAGE.filter((s) => s.tracked === "none");
  console.log(`\ncoverage: ${dark.length} of ${SURFACE_COVERAGE.length} surfaces record nothing:`);
  for (const s of dark) console.log(`  · ${s.surface}`);

  console.log("\nOK — every invariant held.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
