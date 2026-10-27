import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, TriangleAlert } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getGrowthSnapshot } from "@/lib/growth/adminStats";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { loadEbookStoreReadout } from "@/lib/ebooks/readout";
import { loadTutorInterestReadout } from "@/lib/tutor/readout";
import { getExamBySlug } from "@/lib/exam/examContext";
import { formatRupees } from "@/lib/billing/plans";
import {
  INSIGHTS,
  isDue,
  latestVerdict,
  nextCheckOn,
  sortForReview,
  type Insight,
  type InsightVerdict,
} from "@/lib/growth/insights";
import {
  DECIDED_AGAINST,
  EXPERIMENTS,
  NORTH_STAR_KINDS,
  READINGS,
  SECOND_PAGE_KEEP_PCT,
  BOX_BUY_MIN_SALES,
  PREMIUM_LIMITS_MIN_SALES,
  PRICE_BASELINE_WEEKLY_REVENUE,
  ANSWER_LIMIT_RETURN_BASELINE_PCT,
  ANSWER_LIMIT_RETURN_MAX_DROP,
  STARTER_KEEP_PCT,
  CHIPS_KEEP_PCT,
  FORMULA_PAGES_INDEXED_KEEP,
  FORMULA_PAGES_SIGNUPS_KEEP,
  PAPER_PAGES_CHATGPT_KEEP,
  NOTES_TITLES_CHATGPT_KEEP,
  NOTES_TITLES_SHARE_KEEP_PCT,
  MOCK_TOGETHER_SENDS_KEEP,
  MOCK_TOGETHER_STARTS_KEEP,
  IMAT_STUDENTS_KEEP,
  IMAT_FOREIGN_SHARE_PCT,
  PRACTICE_FRIEND_SENDS_KEEP,
  PRACTICE_FRIEND_STARTS_KEEP,
  PRACTICE_TESTS_ANSWERED_KEEP_PCT,
  PRACTICE_TESTS_STARTED_KEEP,
  PAPER_PAGES_SIGNUPS_KEEP,
  PYQ_WORDING_IMPRESSIONS_KEEP_RATIO,
  V_FINDER_NOT_FOUND_MAX_PCT,
  V_EXPLAIN_STUDENTS_KEEP,
  V_EXPLAIN_SIMILAR_RIGHT_KEEP_PCT,
  V_STRATEGY_ANSWERS_KEEP,
  V_PLAN_STUDENTS_KEEP,
  V_REVEAL_FOLLOWUP_BASELINE_PCT,
  V_REVEAL_FOLLOWUP_MAX_DROP,
  V_PLAN_DAYS_DONE_KEEP_PCT,
  V_PROGRESS_NEXT_STEP_KEEP_PCT,
  V_PROGRESS_STUDENTS_KEEP,
  SPECIFIC_OFFER_CHECKOUT_PCT,
  TUTOR_STUDENT_YES_KEEP,
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
  viewSignupCountries,
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

const VERDICT_LABEL: Record<InsightVerdict, string> = {
  holds: "Holds",
  stronger: "Stronger",
  weaker: "Weaker",
  reversed: "Reversed",
  mixed: "Mixed",
};

const VERDICT_STYLE: Record<InsightVerdict, string> = {
  holds: GOOD,
  stronger: GOOD,
  weaker: WARN,
  mixed: WARN,
  reversed: BAD,
};

const INSIGHT_STATUS_LABEL: Record<Insight["status"], string> = {
  open: "Watching",
  confirmed: "Confirmed",
  retired: "Retired",
};

function InsightCard({ insight, today }: { insight: Insight; today: string }) {
  const verdict = latestVerdict(insight);
  const due = isDue(insight, today);
  const latest = insight.checks[insight.checks.length - 1];
  const earlier = insight.checks.slice(0, -1).reverse();
  return (
    <article className="space-y-3 rounded-lg border p-5">
      <header className="space-y-2">
        <h3 className="font-semibold">{insight.title}</h3>
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded px-2 py-0.5 font-medium ${insight.status === "retired" ? NEUTRAL : GOOD}`}>
            {INSIGHT_STATUS_LABEL[insight.status]}
          </span>
          <span className={`rounded px-2 py-0.5 font-medium ${NEUTRAL}`}>{insight.confidence} confidence</span>
          {verdict && (
            <span className={`rounded px-2 py-0.5 font-medium ${VERDICT_STYLE[verdict]}`}>
              Last check: {VERDICT_LABEL[verdict]}
            </span>
          )}
          {insight.status !== "retired" && (
            <span className={`rounded px-2 py-0.5 font-medium ${due ? WARN : NEUTRAL}`}>
              {due ? "Re-check due" : "Next check"} {fmtDate(nextCheckOn(insight))}
            </span>
          )}
        </p>
      </header>
      <p className="text-sm">{insight.finding}</p>
      <dl className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-[7rem_1fr]">
        <dt className="font-medium text-foreground">First seen</dt>
        <dd>{fmtDate(insight.firstSeen)}</dd>
        <dt className="font-medium text-foreground">Source</dt>
        <dd>{insight.source}</dd>
        {latest && (
          <>
            <dt className="font-medium text-foreground">Latest check</dt>
            <dd>
              {fmtDate(latest.on)}: {latest.numbers}
            </dd>
          </>
        )}
        {insight.actedOn && (
          <>
            <dt className="font-medium text-foreground">Acted on</dt>
            <dd>{insight.actedOn}</dd>
          </>
        )}
      </dl>
      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer rounded font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          How to re-check{earlier.length > 0 ? ` · ${earlier.length} earlier check${earlier.length === 1 ? "" : "s"}` : ""}
        </summary>
        <p className="mt-2">{insight.howToCheck}</p>
        {earlier.length > 0 && (
          <ul className="mt-2 space-y-1">
            {earlier.map((c) => (
              <li key={c.on + c.numbers}>
                {fmtDate(c.on)} · {VERDICT_LABEL[c.verdict]}: {c.numbers}
              </li>
            ))}
          </ul>
        )}
      </details>
    </article>
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
          Live since {fmtDate(experiment.liveSince)} · check on {fmtDate(checkOn(experiment.liveSince, experiment.windowDays))}
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

  const admin = createSupabaseAdminClient();
  const [raw, ebookRows, tutor] = await Promise.all([
    getGrowthSnapshot(),
    loadEbookStoreReadout(admin),
    loadTutorInterestReadout(admin),
  ]);
  const today = todayIst();
  const north = viewNorthStar(raw.weeks, today);
  const maxTwoPlus = Math.max(1, ...north.weeks.map((w) => w.twoPlus));
  const funnel = raw.signupWeeks.slice(-6).map(viewFunnelWeek).reverse();
  const countries = viewSignupCountries(raw.signupCountries);
  const running = EXPERIMENTS.filter((e) => e.status === "running");
  const decided = EXPERIMENTS.filter((e) => e.status === "decided");
  const insights = sortForReview(INSIGHTS, today);
  const insightsDue = insights.filter((i) => isDue(i, today)).length;
  const insightsWatched = insights.filter((i) => i.status !== "retired").length;

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
      case "second-page":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand: keep each nudge if {SECOND_PAGE_KEEP_PCT}%+ of those who see it tap it by{" "}
              {fmtDate(checkOn(e.liveSince))}. Clarity&rsquo;s share of single-page visits on chapter pages is the
              background check.
            </p>
            <ReadingsList metric="hello-tap-rate" />
            <ReadingsList metric="card-tap-rate" />
          </div>
        );
      case "resource-chips":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep the chips if {CHIPS_KEEP_PCT}%+ of cards that show
              them get a tap. Below that, keep them only if the notes and guide pages they point at are indexed and get
              search clicks (Search Console); otherwise retire them.
            </p>
            <ReadingsList metric="chip-tap-rate" />
          </div>
        );
      case "box-buy":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand: keep it if {BOX_BUY_MIN_SALES}+ passes sell through the download box by{" "}
              {fmtDate(checkOn(e.liveSince))}. If not, read the checkout_* events to see which step loses buyers
              before touching the price.
            </p>
            <ReadingsList metric="box-sales-per-100" />
          </div>
        );
      case "performance-starter":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep the offer if {STARTER_KEEP_PCT}%+ of students who
              open an empty performance page start a test within a day. Below that, try a different offer first.
            </p>
            <ReadingsList metric="starter-start-rate" />
          </div>
        );
      case "specific-offer":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep the lead if {SPECIFIC_OFFER_CHECKOUT_PCT}%+ of
              students shown the offer on a board paper or homework open checkout. Compare with /browse&apos;s rate,
              read from the same rows.
            </p>
            <ReadingsList metric="specific-offer-checkout" />
          </div>
        );
      case "notes-titles":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep the wording if {NOTES_TITLES_SHARE_KEEP_PCT}%+ of
              signups first landed on a notes page (3.9% before), or ChatGPT names us in {NOTES_TITLES_CHATGPT_KEEP}+ of the five prompts.
            </p>
            <ReadingsList metric="notes-signups" />
            <ReadingsList metric="notes-chatgpt-named" />
          </div>
        );
      case "practice-tests":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep it if students start {PRACTICE_TESTS_STARTED_KEEP}+
              practice tests and answer {PRACTICE_TESTS_ANSWERED_KEEP_PCT}%+ of them on average. Where students stop in
              the builder is at /dashboard/chat.
            </p>
            <ReadingsList metric="practice-tests-started" />
            <ReadingsList metric="practice-tests-answered" />
          </div>
        );
      case "practice-friends":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if students send{" "}
              {PRACTICE_FRIEND_SENDS_KEEP}+ practice tests and {PRACTICE_FRIEND_STARTS_KEEP}+ friends start their copy. Sends
              but no finishes: read where friends stop. No sends: take the box off the result page.
            </p>
            <ReadingsList metric="practice-friend-sends" />
            <ReadingsList metric="practice-friend-starts" />
            <ReadingsList metric="practice-friend-signups" />
            <ReadingsList metric="practice-friend-finished-taps" />
          </div>
        );
      case "ebook-store":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No decision rule yet: watch. Each row reads left to right as a funnel of signed-in students: opened
              the book&apos;s page, took the free sample, bought, asked for a printed copy. Signed-out visits, header
              Ebooks taps and checkout drop-offs per book are in Vercel Analytics.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="py-1 pr-3 font-medium">Book</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Opened</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Took sample</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Buyers</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Revenue</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Refunds</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Want it printed</th>
                    <th scope="col" className="py-1 text-right font-medium">Downloads</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {ebookRows.map((b) => (
                    <tr key={b.slug} className="border-t">
                      <td className="py-1.5 pr-3">
                        {b.title}
                        {!b.active && <span className="ml-1 text-xs text-muted-foreground">(not on sale)</span>}
                      </td>
                      <td className="py-1.5 pr-3 text-right">{b.openedBy}</td>
                      <td className="py-1.5 pr-3 text-right">{b.sampledBy}</td>
                      <td className="py-1.5 pr-3 text-right">{b.buyers}</td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(b.revenuePaise)}</td>
                      <td className="py-1.5 pr-3 text-right">{b.refunds}</td>
                      <td className="py-1.5 pr-3 text-right">
                        {b.printInterest}
                        <span className="text-xs text-muted-foreground"> ({b.withPincode} with pincode)</span>
                      </td>
                      <td className="py-1.5 text-right">{b.downloads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "mock-together":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if students send{" "}
              {MOCK_TOGETHER_SENDS_KEEP}+ papers and {MOCK_TOGETHER_STARTS_KEEP}+ friends start one. Sends but no starts:
              read where friends stop. No sends: take the box off the start page.
            </p>
            <ReadingsList metric="mock-together-sends" />
            <ReadingsList metric="mock-together-starts" />
            <ReadingsList metric="mock-together-signups" />
          </div>
        );
      case "imat":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep investing in IMAT if{" "}
              {IMAT_STUDENTS_KEEP}+ students choose it; build intl.pyqvault.com once visitors from outside India are{" "}
              {IMAT_FOREIGN_SHARE_PCT}%+ of IMAT page views.
            </p>
            <ReadingsList metric="imat-students" />
            <ReadingsList metric="imat-page-views" />
            <ReadingsList metric="imat-foreign-share" />
          </div>
        );
      case "pyq-wording":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep the wording and change the guide and notes prose
              next if impressions for &quot;previous year&quot; queries reach {PYQ_WORDING_IMPRESSIONS_KEEP_RATIO}x the
              window before.
            </p>
            <ReadingsList metric="pyq-wording-impressions" />
          </div>
        );
      case "v-explain":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if {V_EXPLAIN_STUDENTS_KEEP}+ students
              get an explanation and the similar question is answered right {V_EXPLAIN_SIMILAR_RIGHT_KEEP_PCT}%+ of the time.
            </p>
            <ReadingsList metric="v-explain-students" />
            <ReadingsList metric="v-explain-similar-right" />
          </div>
        );
      case "tutor-interest":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Check on {fmtDate(checkOn(e.liveSince, e.windowDays))}: take tutoring further if{" "}
              {TUTOR_STUDENT_YES_KEEP}+ students answer Yes. {tutor.total} answers so far, {tutor.signedIn} signed in
              (a signed-out visitor who answers twice counts twice). Header Tutor taps are in Vercel Analytics.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="py-1 pr-3 font-medium">Who</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Yes</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Online</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Offline</th>
                    <th scope="col" className="py-1 pr-3 text-right font-medium">Either</th>
                    <th scope="col" className="py-1 text-right font-medium">No</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {(["student", "teacher"] as const).map((role) => (
                    <tr key={role} className="border-t">
                      <td className="py-1.5 pr-3">{role === "student" ? "Students wanting a tutor" : "Teachers willing to teach"}</td>
                      <td className="py-1.5 pr-3 text-right font-semibold">{tutor[role].yes}</td>
                      <td className="py-1.5 pr-3 text-right">{tutor[role].online}</td>
                      <td className="py-1.5 pr-3 text-right">{tutor[role].offline}</td>
                      <td className="py-1.5 pr-3 text-right">{tutor[role].either}</td>
                      <td className="py-1.5 text-right">{tutor[role].no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tutor.studentYesByExam.length > 0 && (
              <p className="text-sm">
                <span className="text-muted-foreground">Student Yes by exam: </span>
                {tutor.studentYesByExam
                  .map((x) => `${x.exam ? getExamBySlug(x.exam)?.displayName ?? x.exam : "no exam chosen"} ${x.count}`)
                  .join(" · ")}
              </p>
            )}
          </div>
        );
      case "v-reveal":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if the follow-up share holds at{" "}
              {V_REVEAL_FOLLOWUP_BASELINE_PCT}% or rises; if it falls {V_REVEAL_FOLLOWUP_MAX_DROP}+ points, read the
              conversations first.
            </p>
            <ReadingsList metric="v-follow-up" />
          </div>
        );
      case "v-plan":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if {V_PLAN_STUDENTS_KEEP}+ students make a
              plan and {V_PLAN_DAYS_DONE_KEEP_PCT}%+ of planned days are done.
            </p>
            <ReadingsList metric="v-plan-students" />
            <ReadingsList metric="v-plan-days-done" />
          </div>
        );
      case "v-progress":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if {V_PROGRESS_STUDENTS_KEEP}+ students
              open it and {V_PROGRESS_NEXT_STEP_KEEP_PCT}%+ of them drill or open /performance within 30 minutes.
            </p>
            <ReadingsList metric="v-progress-students" />
            <ReadingsList metric="v-progress-next-step" />
          </div>
        );
      case "v-strategy":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: keep it if {V_STRATEGY_ANSWERS_KEEP}+ asks are
              answered from it and none gets &quot;no data&quot;.
            </p>
            <ReadingsList metric="v-strategy-answers" />
            <ReadingsList metric="v-strategy-no-data" />
          </div>
        );
      case "v-finder":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince, e.windowDays))}: start Phase 1 (Ask V about this question)
              if at most {V_FINDER_NOT_FOUND_MAX_PCT}% of chapter asks get a false &quot;not found&quot;.
            </p>
            <ReadingsList metric="v-false-not-found" />
            <ReadingsList metric="v-clarify-turns" />
            <ReadingsList metric="v-practice-after" />
          </div>
        );
      case "paper-pages":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep building on them if {PAPER_PAGES_SIGNUPS_KEEP}+
              signups first landed on a past paper page or list, or ChatGPT names us in {PAPER_PAGES_CHATGPT_KEEP}+ of the
              five prompts.
            </p>
            <ReadingsList metric="paper-signups" />
            <ReadingsList metric="paper-chatgpt-named" />
          </div>
        );
      case "formula-pages":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand on {fmtDate(checkOn(e.liveSince))}: keep building on them if {FORMULA_PAGES_INDEXED_KEEP}+
              pages are indexed and {FORMULA_PAGES_SIGNUPS_KEEP}+ signups first landed on one.
            </p>
            <ReadingsList metric="formula-indexed" />
            <ReadingsList metric="formula-signups" />
          </div>
        );
      case "premium-limits":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand: keep the limits if {PREMIUM_LIMITS_MIN_SALES}+ passes sell by{" "}
              {fmtDate(checkOn(e.liveSince))} and the students who meet the answer limit keep coming back.
            </p>
            <ReadingsList metric="limit-sales" />
          </div>
        );
      case "pass-price":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand, first at 14 days, then on {fmtDate(checkOn(e.liveSince))}: keep Rs 199 if a week&apos;s
              revenue holds at Rs {PRICE_BASELINE_WEEKLY_REVENUE}+. The answer limit changed the same day, so
              checkout-to-paid is the cleaner read on price.
            </p>
            <ReadingsList metric="price-weekly-revenue" />
            <ReadingsList metric="price-checkout-paid" />
          </div>
        );
      case "answer-limit":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Judged by hand, first at 14 days, then on {fmtDate(checkOn(e.liveSince))}: keep 25 a day if students who
              meet it stay within {ANSWER_LIMIT_RETURN_MAX_DROP} points of {ANSWER_LIMIT_RETURN_BASELINE_PCT}% coming
              back within a week.
            </p>
            <ReadingsList metric="answer-limit-students" />
            <ReadingsList metric="answer-limit-return" />
          </div>
        );
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

        {/* ── Signups by country ─────────────────────────────────────────── */}
        <section className="space-y-3 rounded-lg border p-5">
          <div>
            <h2 className="text-sm font-semibold">Signups by country</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Where each account was created from, since recording began on 9 Oct at 21:30 IST:{" "}
              <span className="font-medium text-foreground tabular-nums">{countries.total}</span> signups.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem] text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th scope="col" className="py-1.5 pr-3 font-medium">Country</th>
                  <th scope="col" className="py-1.5 pr-3 text-right font-medium">Signups</th>
                  <th scope="col" className="py-1.5 text-right font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {countries.rows.map((r) => (
                  <tr key={r.country} className="border-b">
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                      {r.name === r.country ? r.country : `${r.name} (${r.country})`}
                    </th>
                    <td className="py-1.5 pr-3 text-right tabular-nums">{r.n}</td>
                    <td className="py-1.5 text-right tabular-nums">{r.sharePct}%</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-1.5 pr-3 text-left font-normal text-muted-foreground">
                    Not recorded
                  </th>
                  <td
                    className={`py-1.5 pr-3 text-right tabular-nums ${
                      countries.unrecorded > 0 ? "text-amber-700 dark:text-amber-400" : ""
                    }`}
                  >
                    {countries.unrecorded}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{pctOrDash(countries.unrecordedPct)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            &ldquo;Not recorded&rdquo; should stay near 0. Logins that staff create for a batch land there,
            since the country is saved only at a new account&rsquo;s own first sign-in; anything else there means
            the recording has stopped working. Accounts made before 9 Oct have no country and are not counted.
          </p>
        </section>

        {/* ── Insights ──────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold">
              Insights · {insightsWatched} watched · {insightsDue} due for a re-check
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              What we have learned about students, with the evidence and a way to measure it again. Due ones come
              first. To add one or record a re-check, change lib/growth/insights.ts.
            </p>
          </div>
          {insights.map((i) => (
            <InsightCard key={i.id} insight={i} today={today} />
          ))}
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
