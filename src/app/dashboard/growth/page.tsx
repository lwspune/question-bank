import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, TriangleAlert } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getGrowthSnapshot } from "@/lib/growth/adminStats";
import {
  DECIDED_AGAINST,
  EXPERIMENTS,
  NORTH_STAR_KINDS,
  READINGS,
  checkOn,
  type Experiment,
} from "@/lib/growth/registry";
import {
  CHAPTER_TESTS_MIN_SITTINGS,
  chapterShareVerdict,
  chapterTestsVerdict,
  emailCapVerdict,
  indexingView,
  onboardingVerdict,
  todayIst,
  viewFunnelWeek,
  viewNorthStar,
  type ArmCounts,
  type Verdict,
  type VerdictStatus,
} from "@/lib/growth/snapshot";
import type { GrowthSnapshotRaw } from "@/lib/growth/query";
import { MIN_LIFT_N } from "@/lib/pmf/snapshot";

/**
 * /dashboard/growth — the experiments we are running, judged on live data.
 *
 * READ-ONLY by the owner's choice (2026-10-01): status, decisions and the hand
 * readings live in lib/growth/registry.ts and change by commit. Every rate and
 * verdict comes from lib/growth/snapshot.ts, which refuses to call a result
 * before its check date or below the sample floor.
 *
 * Superadmin-only and dynamic, so `next build` never renders it: the data
 * chain is proven by `npm run growth:smoke`, the layout only in a browser.
 */
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<VerdictStatus, string> = {
  "too-early": "Too early",
  "early-read": "Early read",
  running: "Running",
  keep: "Keep",
  kill: "Remove",
  "no-difference": "No clear difference",
  holding: "Holding",
  failing: "Failing",
  tracking: "Tracking",
};

const NEUTRAL = "bg-muted text-muted-foreground";
const GOOD = "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
const WARN = "bg-amber-500/10 text-amber-700 dark:text-amber-400";
const BAD = "bg-red-500/10 text-red-700 dark:text-red-400";

const STATUS_STYLE: Record<VerdictStatus, string> = {
  "too-early": NEUTRAL,
  "early-read": NEUTRAL,
  running: NEUTRAL,
  tracking: NEUTRAL,
  keep: GOOD,
  holding: GOOD,
  "no-difference": WARN,
  kill: BAD,
  failing: BAD,
};

function StatusBadge({ status }: { status: VerdictStatus }) {
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function fmtDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

function pctOrDash(v: number | null): string {
  return v === null ? "—" : `${v}%`;
}

function VerdictLine({ verdict }: { verdict: Verdict }) {
  return (
    <p className="flex flex-wrap items-center gap-2 text-sm">
      <StatusBadge status={verdict.status} />
      <span className="text-muted-foreground">{verdict.reason}</span>
    </p>
  );
}

function ExperimentCard({
  experiment,
  children,
}: {
  experiment: Experiment;
  children: React.ReactNode;
}) {
  return (
    <article className="space-y-3 rounded-lg border p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">{experiment.title}</h3>
        <p className="text-xs text-muted-foreground">
          Live since {fmtDate(experiment.liveSince)} · check on {fmtDate(checkOn(experiment.liveSince))}
        </p>
      </header>
      <p className="text-sm">{experiment.change}</p>
      <dl className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-[7rem_1fr]">
        <dt className="font-medium text-foreground">Why</dt>
        <dd>{experiment.why}</dd>
        <dt className="font-medium text-foreground">Measured by</dt>
        <dd>{experiment.metric}</dd>
        <dt className="font-medium text-foreground">Decision rule</dt>
        <dd>{experiment.rule}</dd>
        {experiment.decision && (
          <>
            <dt className="font-medium text-foreground">Decision</dt>
            <dd>{experiment.decision}</dd>
          </>
        )}
      </dl>
      {children}
    </article>
  );
}

function OnboardingReadout({ raw, today, liveSince }: { raw: GrowthSnapshotRaw; today: string; liveSince: string }) {
  const v = onboardingVerdict(raw.arms, today, liveSince);
  const rows = [
    { label: "Students", get: (a: ArmCounts) => String(a.onboarded) },
    { label: "With 7 full days", get: (a: ArmCounts) => String(a.matured) },
    {
      label: "Came back within 7 days",
      get: (a: ArmCounts) =>
        a.matured >= MIN_LIFT_N ? `${Math.round((100 * a.returned7) / a.matured)}% (${a.returned7})` : `— (${a.returned7})`,
    },
    { label: "Studied 2+ days in week 1", get: (a: ArmCounts) => String(a.twoPlus) },
    { label: "First act: practice", get: (a: ArmCounts) => String(a.firstPractice) },
    { label: "First act: mock", get: (a: ArmCounts) => String(a.firstMock) },
  ];
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[22rem] text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-1.5 pr-3 font-medium" scope="col"></th>
              <th className="py-1.5 pr-3 text-right font-medium" scope="col">Practice-first</th>
              <th className="py-1.5 text-right font-medium" scope="col">Control (mock-first)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b last:border-0">
                <th scope="row" className="py-1.5 pr-3 text-left font-normal text-muted-foreground">
                  {r.label}
                </th>
                <td className="py-1.5 pr-3 text-right tabular-nums">{r.get(v.arms["practice-first"])}</td>
                <td className="py-1.5 text-right tabular-nums">{r.get(v.arms["mock-first"])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <VerdictLine verdict={v} />
      {v.diffPoints !== null && (
        <p className="text-xs text-muted-foreground">
          Gap: {v.diffPoints > 0 ? "+" : ""}
          {v.diffPoints} points (practice-first minus control).
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        &ldquo;First act&rdquo; checks the change took effect: if practice-first students still open a
        mock first, the screen is not doing its job, whatever the return rate says.
      </p>
    </div>
  );
}

function ReadingsList({ metric }: { metric: keyof typeof READINGS }) {
  const r = READINGS[metric];
  return (
    <div className="text-xs text-muted-foreground">
      <p>
        Read by hand from <span className="font-medium text-foreground">{r.source}</span>.{" "}
        {r.entries.length === 0 ? "No reading yet." : null}
      </p>
      {r.entries.length > 0 && (
        <ul className="mt-1 space-y-0.5">
          {[...r.entries].reverse().map((e) => (
            <li key={e.on} className="tabular-nums">
              {fmtDate(e.on)}: <span className="font-medium text-foreground">{e.value}</span>
              {e.note ? ` — ${e.note}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function GrowthPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const raw = await getGrowthSnapshot();
  const today = todayIst();
  const north = viewNorthStar(raw.weeks, today);
  const maxTwoPlus = Math.max(1, ...north.weeks.map((w) => w.twoPlus));
  const funnel = raw.signupWeeks.slice(-6).map(viewFunnelWeek).reverse();
  const running = EXPERIMENTS.filter((e) => e.status === "running");
  const decided = EXPERIMENTS.filter((e) => e.status === "decided");

  function readout(e: Experiment) {
    switch (e.readout) {
      case "onboarding-arms":
        return <OnboardingReadout raw={raw} today={today} liveSince={e.liveSince} />;
      case "chapter-share": {
        const v = chapterShareVerdict(raw.chapterShare.signups, today, e.liveSince);
        return (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-2xl font-semibold tabular-nums">{raw.chapterShare.signups}</span>{" "}
              signups tagged chapter-share, {raw.chapterShare.signalled} of whom did something.
            </p>
            <VerdictLine verdict={v} />
            <ReadingsList metric="share-taps" />
          </div>
        );
      }
      case "indexing": {
        const v = indexingView(READINGS["google-indexed"].entries);
        return (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-2xl font-semibold tabular-nums">{v.latest?.value ?? "—"}</span> of{" "}
              {v.goal} pages indexed
              {v.change !== null && ` (${v.change >= 0 ? "+" : ""}${v.change} since the reading before)`}.
            </p>
            <VerdictLine verdict={v} />
            <ReadingsList metric="google-indexed" />
          </div>
        );
      }
      case "chapter-tests": {
        const v = chapterTestsVerdict(raw.chapterTests, today, e.liveSince);
        const recent = raw.chapterTests.slice(-6).reverse();
        return (
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[22rem] text-sm">
                <caption className="sr-only">MHT-CET mock sittings since chapter tests launched</caption>
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th scope="col" className="py-1.5 pr-3 font-medium">Since launch</th>
                    <th scope="col" className="py-1.5 pr-3 text-right font-medium">Chapter tests</th>
                    <th scope="col" className="py-1.5 text-right font-medium">Full papers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal text-muted-foreground">Sittings</th>
                    <td className="py-1.5 pr-3 text-right tabular-nums">{v.since.chapterSittings}</td>
                    <td className="py-1.5 text-right tabular-nums">{v.since.fullSittings}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal text-muted-foreground">Share answered</th>
                    <td className="py-1.5 pr-3 text-right tabular-nums">{pctOrDash(v.since.chapterAnsweredPct)}</td>
                    <td className="py-1.5 text-right tabular-nums">{pctOrDash(v.since.fullAnsweredPct)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              MHT-CET students sitting any mock, last full week:{" "}
              <span className="font-semibold tabular-nums">{v.lastFullWeekStudents ?? "—"}</span>{" "}
              <span className="text-muted-foreground">(about 5 a week before launch)</span>
            </p>
            <VerdictLine verdict={v} />
            <ul className="space-y-0.5 text-xs tabular-nums text-muted-foreground">
              {recent.map((w) => (
                <li key={w.weekStart}>
                  Week of {fmtDate(w.weekStart)}: {w.chapterSittings} chapter tests · {w.fullSittings} full papers ·{" "}
                  {w.anyStudents} students
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              The share answered shows from {CHAPTER_TESTS_MIN_SITTINGS} sittings. The launch week mixes a few days of full
              papers alone, which can only understate the change.
            </p>
          </div>
        );
      }
      case "email-cap": {
        const v = emailCapVerdict(raw.emailDays, today, e.liveSince);
        const recent = raw.emailDays.slice(-7).reverse();
        return (
          <div className="space-y-2">
            <VerdictLine verdict={v} />
            <p className="text-xs text-muted-foreground">
              Busiest day since live:{" "}
              {v.busiest ? `${fmtDate(v.busiest.day)}, ${v.busiest.total} of ${v.cap}` : "none yet"}. Sign-up
              and password-reset mail share the same 100/day account, so the cap leaves room for it.
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-xs tabular-nums text-muted-foreground sm:grid-cols-4">
              {recent.map((d) => (
                <li key={d.day}>
                  {fmtDate(d.day)}: {d.sent} sent
                  {d.failed > 0 && <span className="text-red-700 dark:text-red-400">, {d.failed} failed</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Growth</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The North Star, signups by week, and every experiment against its own decision rule. Students
            only (staff excluded). Product-wide numbers — channels, cohorts, stickiness, the mock share
            loop — are on{" "}
            <Link href="/dashboard/pmf" prefetch={false} className="text-brand-accent underline underline-offset-2">
              Product/market fit
            </Link>
            .
          </p>
        </header>

        <section className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden />
            How to read this page
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              Experiments count from their <span className="font-medium">merge date</span>. Until the push
              deploys, students still see the old site, so the first days of a window can only make a
              result look weaker.
            </li>
            <li>
              A <span className="font-medium">study day</span> is a day with a learning act (practice,
              mock, drill, checkpoint, bookmark, quiz). Page views do not count.
            </li>
            <li>
              Rates need {MIN_LIFT_N}+ students who have had all 7 days; below that the count shows and the
              rate is a dash. Nothing is called keep or remove before its check date.
            </li>
            <li>
              Google and Vercel numbers are read by hand and added in code
              (lib/growth/registry.ts); they are only as fresh as the last reading.
            </li>
          </ul>
        </section>

        {/* ── North Star ─────────────────────────────────────────────────── */}
        <section className="space-y-4 rounded-lg border p-5">
          <div>
            <h2 className="text-sm font-semibold">North Star: weekly learners on 2+ study days</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Students who studied on at least two different days in an IST week (Monday to Sunday).
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              kind="text"
              value={north.thisWeek ? String(north.thisWeek.twoPlus) : "—"}
              label="This week so far"
            />
            <StatCard
              kind="text"
              value={north.lastFullWeek ? String(north.lastFullWeek.twoPlus) : "—"}
              label="Last full week"
            />
            <StatCard
              kind="text"
              value={north.peak ? String(north.peak.twoPlus) : "—"}
              label={north.peak ? `Peak, week of ${fmtDate(north.peak.weekStart)}` : "Peak"}
            />
          </div>
          <div className="space-y-1" role="list" aria-label="Weekly learners on 2+ study days, oldest first">
            {north.weeks.map((w) => (
              <div
                key={w.weekStart}
                role="listitem"
                className="flex items-center gap-3"
                title={`Week of ${fmtDate(w.weekStart)}: ${w.twoPlus} of ${w.learners} learners studied on 2+ days`}
              >
                <div className="w-24 shrink-0 text-xs text-muted-foreground">
                  {fmtDate(w.weekStart)}
                  {w.undercounted ? "*" : ""}
                </div>
                <div className="h-4 flex-1 overflow-hidden rounded bg-muted">
                  <div
                    className={`h-full rounded-r ${w.partial ? "bg-brand/40" : "bg-brand"}`}
                    style={{ width: `${w.twoPlus === 0 ? 0 : Math.max(2, (w.twoPlus / maxTwoPlus) * 100)}%` }}
                  />
                </div>
                <div className="w-28 shrink-0 text-right text-xs tabular-nums">
                  {w.twoPlus} <span className="text-muted-foreground">of {w.learners}</span>
                  {w.partial && <span className="text-muted-foreground"> · so far</span>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            * Starts before practice tracking began on 17 Sep, so it counts low. Learning acts counted:{" "}
            {NORTH_STAR_KINDS.length} kinds, plus every mock start.
          </p>
        </section>

        {/* ── Funnel by signup week ─────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Signups by week</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[30rem] text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th scope="col" className="py-1.5 pr-3 font-medium">Week of</th>
                  <th scope="col" className="py-1.5 pr-3 text-right font-medium">Signups</th>
                  <th scope="col" className="py-1.5 pr-3 text-right font-medium">Did something</th>
                  <th scope="col" className="py-1.5 pr-3 text-right font-medium">Came back ≤7 days</th>
                  <th scope="col" className="py-1.5 text-right font-medium">Paid</th>
                </tr>
              </thead>
              <tbody>
                {funnel.map((w) => (
                  <tr key={w.weekStart} className="border-b last:border-0">
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                      {fmtDate(w.weekStart)}
                    </th>
                    <td className="py-1.5 pr-3 text-right tabular-nums">{w.signups}</td>
                    <td className="py-1.5 pr-3 text-right tabular-nums">{pctOrDash(w.signalRate)}</td>
                    <td className="py-1.5 pr-3 text-right tabular-nums">
                      {pctOrDash(w.returnRate)}
                      <span className="text-muted-foreground"> of {w.matured}</span>
                    </td>
                    <td className="py-1.5 text-right tabular-nums">{w.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            &ldquo;Came back&rdquo; is counted only over students who have had all 7 days (the &ldquo;of&rdquo;
            number), so the newest week fills in as it ages.
          </p>
        </section>

        {/* ── Experiments ───────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold">
            Experiments · {running.length} running · {decided.length + DECIDED_AGAINST.length} decided
          </h2>
          {running.map((e) => (
            <ExperimentCard key={e.id} experiment={e}>
              {readout(e)}
            </ExperimentCard>
          ))}
          {decided.map((e) => (
            <ExperimentCard key={e.id} experiment={e}>
              {readout(e)}
            </ExperimentCard>
          ))}
        </section>

        {/* ── Decided against ───────────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Decided against</h2>
          <ul className="space-y-2 text-sm">
            {DECIDED_AGAINST.map((d) => (
              <li key={d.title}>
                <span className="font-medium">{d.title}:</span> {d.decision}{" "}
                <span className="text-xs text-muted-foreground">
                  ({fmtDate(d.on)}) — {d.why}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-muted-foreground">
          To start, decide or remove an experiment, change lib/growth/registry.ts.{" "}
          <Link
            href="/dashboard/pmf"
            prefetch={false}
            className="inline-flex items-center gap-0.5 text-brand-accent underline underline-offset-2"
          >
            Product/market fit
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </Link>
        </p>
      </main>
    </>
  );
}
