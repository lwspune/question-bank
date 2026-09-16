import Link from "next/link";
import { redirect } from "next/navigation";
import { EyeOff, TriangleAlert } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getPmfSnapshot } from "@/lib/pmf/adminStats";
import {
  viewCohorts,
  viewFeatures,
  viewSegments,
  viewDifficulty,
  abandonment,
  viewNps,
  signalFunnel,
  SURFACE_COVERAGE,
  MIN_LIFT_N,
  MIN_SEGMENT_N,
  MIN_NPS_RESPONSES,
  type RetentionCell,
  type Tracked,
} from "@/lib/pmf/snapshot";

export const dynamic = "force-dynamic";

const TRACKED_STYLE: Record<Tracked, string> = {
  full: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  partial: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  none: "bg-red-500/10 text-red-700 dark:text-red-400",
};

const TRACKED_LABEL: Record<Tracked, string> = {
  full: "Tracked",
  partial: "Partial",
  none: "Not tracked",
};

/** A censored cell is an em dash, never a zero. */
function Cell({ cell }: { cell: RetentionCell }) {
  if (cell.censored) {
    return (
      <span className="text-muted-foreground/60" title="Too early to measure — this cohort has not had that long yet">
        —
      </span>
    );
  }
  return (
    <span>
      {cell.pct}% <span className="text-xs text-muted-foreground">({cell.value})</span>
    </span>
  );
}

export default async function PmfPage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const snap = await getPmfSnapshot(12);
  const funnel = signalFunnel(snap.funnel);
  const cohorts = viewCohorts(snap.cohorts);
  const features = viewFeatures(snap.features);
  const segments = viewSegments(snap.segments);
  const attempts = abandonment(snap.attempts);
  const difficulty = viewDifficulty({ counts: snap.difficulty, submitted: snap.attempts.submitted });
  const nps = viewNps(snap.nps);
  const dark = SURFACE_COVERAGE.filter((s) => s.tracked === "none");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Product/market fit</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cohort retention, feature adoption and segment strength for self-serve students (staff
            excluded). Last {snap.weeks} weeks of cohorts.
          </p>
        </header>

        {/* The limits come FIRST. Every rate below has a partly-invisible denominator. */}
        <section className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden />
            What this page cannot see
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {dark.length} product surfaces record nothing when a student uses them — including the
            question bank itself. A student can read for an hour and register as silent here, so
            treat every rate below as a <span className="font-medium">floor</span>, never a
            measurement of engagement. Nothing on this page is evidence about anonymous visitors,
            who are most of the traffic.
          </p>
        </section>

        {/* ── Funnel ─────────────────────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Signal funnel</h2>
          <p className="text-xs text-muted-foreground">
            Step 2 is deliberately not called &ldquo;activated&rdquo; — it means we recorded
            something, not that nothing happened otherwise.
          </p>
          <div className="space-y-2">
            {funnel.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="w-48 shrink-0 text-sm">{step.label}</div>
                <div className="h-6 flex-1 overflow-hidden rounded bg-muted">
                  <div
                    className="h-full bg-brand"
                    style={{ width: `${Math.max(2, (step.count / Math.max(1, funnel[0].count)) * 100)}%` }}
                  />
                </div>
                <div className="w-28 shrink-0 text-right text-sm tabular-nums">
                  {step.count}
                  {i > 0 && (
                    <span className="ml-1 text-xs text-muted-foreground">({step.pctOfPrev}%)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cohort retention ───────────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Retention by signup week</h2>
          <p className="text-xs text-muted-foreground">
            Share of the cohort still leaving signals N days after signup. A dash means the cohort
            has not existed that long — it is not a zero.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2 font-medium">Week</th>
                  <th className="py-2 font-medium">Signups</th>
                  <th className="py-2 font-medium">Any signal</th>
                  <th className="py-2 font-medium">Day 1+</th>
                  <th className="py-2 font-medium">Day 7+</th>
                  <th className="py-2 font-medium">Day 28+</th>
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c) => (
                  <tr key={c.week} className="border-b last:border-0">
                    <td className="py-2 tabular-nums">{c.week}</td>
                    <td className="py-2 tabular-nums">{c.signups}</td>
                    <td className="py-2 tabular-nums">
                      {c.signalPct}% <span className="text-xs text-muted-foreground">({c.signalled})</span>
                    </td>
                    <td className="py-2 tabular-nums"><Cell cell={c.d1} /></td>
                    <td className="py-2 tabular-nums"><Cell cell={c.d7} /></td>
                    <td className="py-2 tabular-nums"><Cell cell={c.d28} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Segments ───────────────────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">By target exam</h2>
          <p className="text-xs text-muted-foreground">
            Students who signed up 28+ days ago, by the exam(s) they declared at onboarding. A
            student declaring two exams appears in both rows, so these do not sum to the roster.
            Rows under {MIN_SEGMENT_N} students show the count only.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2 font-medium">Exam</th>
                  <th className="py-2 font-medium">Students</th>
                  <th className="py-2 font-medium">Any signal</th>
                  <th className="py-2 font-medium">Still active at 28d</th>
                </tr>
              </thead>
              <tbody>
                {segments.map((s) => (
                  <tr key={s.exam} className="border-b last:border-0">
                    <td className="py-2">{s.exam}</td>
                    <td className="py-2 tabular-nums">{s.students}</td>
                    <td className="py-2 tabular-nums">
                      {s.signalPct === null ? (
                        <span className="text-muted-foreground/60">too few</span>
                      ) : (
                        `${s.signalPct}%`
                      )}
                    </td>
                    <td className="py-2 tabular-nums">
                      {s.d28Pct === null ? (
                        <span className="text-muted-foreground/60">too few</span>
                      ) : (
                        `${s.d28Pct}%`
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Feature adoption + lift ────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Feature adoption and retention lift</h2>
          <p className="text-xs text-muted-foreground">
            Lift compares 28-day retention of students who used a feature against those who did
            not, within the {snap.maturePool.signalled} students who signed up 28+ days ago and left
            a signal. It is a correlation, not a cause — a student who was going to stick around
            anyway is also more likely to try things. Both arms need {MIN_LIFT_N}+ students.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2 font-medium">Feature</th>
                  <th className="py-2 font-medium">Students</th>
                  <th className="py-2 font-medium">Events</th>
                  <th className="py-2 font-medium">Used → 28d</th>
                  <th className="py-2 font-medium">Didn&rsquo;t → 28d</th>
                  <th className="py-2 font-medium">Lift</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.kind} className="border-b last:border-0">
                    <td className="py-2">
                      {f.label}
                      {f.verdict === "dead" && (
                        <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          no events ever
                        </span>
                      )}
                    </td>
                    <td className="py-2 tabular-nums">{f.users}</td>
                    <td className="py-2 tabular-nums">{f.events}</td>
                    <td className="py-2 tabular-nums">{f.usedRate === null ? "—" : `${f.usedRate}%`}</td>
                    <td className="py-2 tabular-nums">{f.unusedRate === null ? "—" : `${f.unusedRate}%`}</td>
                    <td className="py-2 tabular-nums">
                      {f.liftPp === null ? (
                        <span className="text-muted-foreground/60">
                          {f.verdict === "thin" ? "too few" : "—"}
                        </span>
                      ) : (
                        <span className={f.liftPp > 0 ? "text-emerald-600 dark:text-emerald-400" : ""}>
                          {f.liftPp > 0 ? "+" : ""}
                          {f.liftPp} pp
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Satisfaction ───────────────────────────────────────────────── */}
        <section className="space-y-4 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Satisfaction signals</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard kind="text" value={`${attempts.pct}%`} label="Mocks started but never finished" />
            <StatCard kind="text" value={`${difficulty.tooHardPct}%`} label="Rated the paper too hard" />
            <StatCard
              kind="text"
              value={nps.reportable ? String(nps.rollup.score) : "n/a"}
              label={nps.reportable ? "NPS" : `NPS — only ${nps.rollup.count} responses`}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Abandonment is over {attempts.resolved} resolved attempts ({snap.attempts.live} still
            live are excluded). Difficulty is {snap.difficulty.responses} ratings —{" "}
            {difficulty.responseRate === null ? "n/a" : `${difficulty.responseRate}%`} of submitted
            papers. NPS needs {MIN_NPS_RESPONSES} responses before a score is shown; there are{" "}
            {nps.rollup.count} from {nps.eligible} eligible students (
            {nps.responseRate === null ? "n/a" : `${nps.responseRate}%`}). The prompt only appears
            after two completed mocks, so it structurally samples the most engaged students —{" "}
            <Link href="/dashboard/feedback" prefetch={false} className="underline">
              see feedback
            </Link>
            .
          </p>
        </section>

        {/* ── Instrumentation coverage ───────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden />
            Instrumentation coverage
          </h2>
          <p className="text-xs text-muted-foreground">
            What each surface records when a student uses it. This is on the page rather than in a
            footnote because it defines what the numbers above can mean.
          </p>
          <div className="space-y-2">
            {SURFACE_COVERAGE.map((s) => (
              <div key={s.surface} className="rounded border p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{s.surface}</span>
                  <span className={`rounded px-1.5 py-0.5 text-xs ${TRACKED_STYLE[s.tracked]}`}>
                    {TRACKED_LABEL[s.tracked]}
                  </span>
                </div>
                {s.lost && <p className="mt-1 text-xs text-muted-foreground">{s.lost}</p>}
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs text-muted-foreground">
          Snapshot generated {snap.generatedAt}. Related:{" "}
          <Link href="/dashboard/activity" prefetch={false} className="underline">
            usage shape
          </Link>{" "}
          ·{" "}
          <Link href="/dashboard/students" prefetch={false} className="underline">
            student roster
          </Link>
          .
        </p>
      </main>
    </>
  );
}
