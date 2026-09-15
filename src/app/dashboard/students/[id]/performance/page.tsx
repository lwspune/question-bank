import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, Dumbbell } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import StudentTabs from "../StudentTabs";
import ChapterAccordion from "./ChapterAccordion";
import AuditList from "./AuditList";
import ProjectionList from "./ProjectionList";
import { cn } from "@/lib/utils";
import { getSessionSuperadmin } from "@/lib/auth";
import { getStudentDetail } from "@/lib/students/detail";
import { getStudentPerformance } from "@/lib/performance/service";
import { getTaxonomyLinks } from "@/lib/performance/taxonomy";
import { EMPTY_TAXONOMY_LINKS, type TaxonomyLinks } from "@/lib/performance/links";
import { buildPerformance, type Lane, type TimeAnalysis } from "@/lib/performance/compute";
import { buildLaneNav } from "@/lib/performance/laneNav";
import { buildFocusAreas } from "@/lib/performance/focusAreas";
import { DASH } from "@/lib/students/profileView";

// Reads another student's own-row data through the service-role client behind a
// superadmin gate, so it must never be cached or indexed.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Params = { id: string };
type Search = { exam?: string; subject?: string };

export default async function StudentPerformancePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  // Platform-wide data (not org-scoped) — superadmin only, same gate as the
  // profile tab. AUTHORIZATION LIVES HERE, never in the pure core: that is what
  // makes the future student-facing version a new route reading the same
  // helpers with the anon client rather than a refactor of them.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const [detail, payload] = await Promise.all([
    getStudentDetail(params.id),
    getStudentPerformance(params.id),
  ]);
  if (!detail) notFound();

  const perf = buildPerformance(payload, new Date());
  const { summary, lanes } = perf;

  // Two axes, not one row of (exam · subject) pills: on a multi-exam student
  // the single list interleaves the exams, and the default lane was whichever
  // they had answered most of rather than the one they last sat. Both rules
  // live in buildLaneNav, where they are pinned by tests.
  const nav = buildLaneNav(lanes, summary.latest?.exam ?? null, searchParams);
  const selected = nav.selected;

  // Only the SELECTED lane's taxonomy, and only for the links: the RPC returns
  // chapters and subtopics as NAMES (the facts index into string arrays), which
  // keeps a 1,270 kB payload from carrying a uuid per dim entry. This is a
  // ~30-120 row read for one subject, independent of how much the student sat,
  // and it FAILS SOFT — every number on the page comes from the RPC, so a
  // taxonomy read that breaks must cost the links and nothing else.
  const links: TaxonomyLinks = selected
    ? await getTaxonomyLinks(selected.exam, selected.subject)
    : EMPTY_TAXONOMY_LINKS;
  const hrefFor = (exam: string, subject?: string) => {
    const qs = new URLSearchParams({ exam });
    if (subject) qs.set("subject", subject);
    return `/dashboard/students/${params.id}/performance?${qs.toString()}`;
  };

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <StudentTabs id={params.id} name={detail.profile.name} active="performance" />

        {summary.graded === 0 ? (
          <EmptyState inProgress={summary.inProgress} excluded={summary.retakesDropped + summary.belowFloor} />
        ) : (
          <>
            <section>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  kind="text"
                  value={summary.latest ? `${summary.latest.pct}%` : DASH}
                  label={summary.latest ? `Latest · ${summary.latest.title}` : "Latest"}
                />
                <StatCard
                  kind="text"
                  value={summary.deltaPoints === null ? DASH : `${summary.deltaPoints > 0 ? "+" : ""}${summary.deltaPoints} pts`}
                  label="vs previous paper"
                />
                <StatCard
                  kind="text"
                  value={summary.attemptQuality === null ? DASH : `${summary.attemptQuality}%`}
                  label="Attempt quality · correct ÷ attempted"
                />
                <StatCard
                  kind="text"
                  value={summary.consistency?.label ?? DASH}
                  label={
                    summary.consistency
                      ? `Consistency · σ ${Math.round(summary.consistency.sd * 100)}%`
                      : "Consistency · needs 2 papers"
                  }
                />
              </div>

              {/* What was counted, and what was not. The roster shows a different
                  total on purpose, and an unexplained discrepancy reads as a bug. */}
              <p className="mt-3 text-xs text-muted-foreground">
                Counting <span className="font-medium text-foreground">{summary.graded}</span>{" "}
                paper{summary.graded === 1 ? "" : "s"} — first attempts only.
                {summary.retakesDropped > 0 && ` ${summary.retakesDropped} retake${summary.retakesDropped === 1 ? "" : "s"} excluded (the review screen shows the answers).`}
                {summary.belowFloor > 0 && ` ${summary.belowFloor} abandoned attempt${summary.belowFloor === 1 ? "" : "s"} excluded (under 20% answered).`}
                {summary.inProgress > 0 && ` ${summary.inProgress} still in progress.`}
              </p>
            </section>

            {/* Exam first, subject second. The exam row appears only for a
                student who has sat more than one — 112 of the 124 students with
                submitted attempts have exactly one, and a single-option filter
                is furniture. */}
            {nav.exams.length > 1 && (
              <nav aria-label="Exam" className="flex flex-wrap gap-2">
                {nav.exams.map((e) => (
                  <Pill
                    key={e.exam}
                    // No subject: switching exam lands on that exam's busiest
                    // lane rather than carrying a subject the exam may not have.
                    href={hrefFor(e.exam)}
                    active={e.exam === nav.selectedExam}
                    count={e.judged}
                  >
                    {e.exam}
                  </Pill>
                ))}
              </nav>
            )}

            {nav.subjects.length > 1 && (
              <nav aria-label="Subject" className="flex flex-wrap gap-2">
                {nav.subjects.map((l) => (
                  <Pill
                    key={`${l.exam}-${l.subject}`}
                    href={hrefFor(l.exam, l.subject)}
                    active={l === selected}
                    count={l.judged}
                  >
                    {l.subject}
                  </Pill>
                ))}
              </nav>
            )}

            {selected && <LaneView lane={selected} links={links} />}
          </>
        )}
      </main>
    </>
  );
}

function LaneView({ lane, links }: { lane: Lane; links: TaxonomyLinks }) {
  const focus = buildFocusAreas(lane.exam, lane.subject, lane.chapters);
  const cov = lane.coverage;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        {lane.exam} · {lane.subject}
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          {lane.attempts} paper{lane.attempts === 1 ? "" : "s"} ·{" "}
          {lane.accuracy === null ? "nothing answered" : `${lane.accuracy}% of ${lane.judged} answered`}
          {lane.thin && " · too little to call"}
        </span>
      </h2>

      {/* Coverage — the readout nda-tracker cannot build, because an OMR sheet
          cannot tell a deliberate skip from a question never reached. Pacing
          used to share this card and now has its own below: completion and the
          clock are two different diagnoses. */}
      <Section title="Coverage">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex h-3 overflow-hidden rounded-full bg-muted" aria-hidden>
            <Segment n={cov.answered} total={cov.inPaper} className="bg-emerald-500" />
            <Segment n={cov.seenBlank} total={cov.inPaper} className="bg-amber-500" />
            <Segment n={cov.neverReached} total={cov.inPaper} className="bg-muted-foreground/30" />
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <Metric label="Answered" value={cov.answered} tone="text-emerald-600 dark:text-emerald-400" />
            <Metric label="Seen, left blank" value={cov.seenBlank} tone="text-amber-600 dark:text-amber-400" />
            <Metric label="Never reached" value={cov.neverReached} tone="text-muted-foreground" />
            <Metric
              label="Median per question"
              value={cov.medianSecs === null ? DASH : `${cov.medianSecs}s`}
            />
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            {cov.inPaper} questions across {lane.attempts} paper{lane.attempts === 1 ? "" : "s"}.{" "}
            <span className="font-medium text-foreground">Never reached</span> means no answer row
            was written at all — a clock problem, not a knowledge gap, and it is kept out of the
            skipped audit for that reason.
          </p>
        </div>
      </Section>

      <TimeCard lane={lane} />

      <Section title="Accuracy by difficulty">
        <dl className="grid grid-cols-3 gap-3">
          {lane.difficulty.map((d) => (
            <div key={d.difficulty} className="rounded-lg border bg-card p-4">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {d.difficulty.toLowerCase()}
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums">
                {d.accuracy === null ? DASH : `${d.accuracy}%`}
              </dd>
              <dd className="text-xs text-muted-foreground">
                {d.answered === 0 ? "none answered" : `of ${d.answered} answered`}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {focus && (focus.startHere.length > 0 || focus.readyToLearn.length > 0) && (
        <Section
          title="Where to focus"
          note="Root cause from the NDA Mathematics prerequisite graph — the deepest weak chapter a weakness traces back to."
        >
          {focus.startHere.length > 0 && (
            <ul className="space-y-2">
              {focus.startHere.map((f) => (
                <li key={f.chapter} className="rounded-lg border bg-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{f.chapter}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {f.accuracy === null ? DASH : `${f.accuracy}%`}
                    </span>
                  </div>
                  {f.unlocks.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Also holding back: {f.unlocks.join(", ")}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip href={f.learnHref} icon={BookOpen}>
                      Learn
                    </Chip>
                    <Chip href={f.practiceHref} icon={Dumbbell}>
                      Practise
                    </Chip>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {focus.readyToLearn.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Ready to learn next:</span>{" "}
              {focus.readyToLearn.slice(0, 6).map((r) => r.chapter).join(" · ")}
            </p>
          )}
        </Section>
      )}

      <Section title="Chapter performance" note="Recency-weighted. Weakest measured chapter first; chapters with nothing answered sink to the bottom.">
        <ChapterAccordion chapters={lane.chapters} />
      </Section>

      {lane.wrongAudit.length > 0 && (
        <Section title="Wrong-answer audit" note="Subtopics by wrong count — the highest-priority revision targets.">
          <AuditList rows={lane.wrongAudit} kind="wrong" />
        </Section>
      )}

      {lane.skipAudit.length > 0 && (
        <Section
          title="Skipped audit"
          note="Questions they SAW and left blank. Questions never reached are excluded — those are a pacing problem, reported above."
        >
          <AuditList rows={lane.skipAudit} kind="skipped" />
        </Section>
      )}

      {lane.projection && (
        <Section
          title="Projected score"
          note={`Ranked by recoverable marks. Chapter weight is derived live from the bank's own PYQ counts, and the penalty from this paper's real marking scheme.`}
        >
          <ProjectionList projection={lane.projection} links={links} />
        </Section>
      )}
    </div>
  );
}

/**
 * Time analysis — where the sitting's clock actually went.
 *
 * This is the half of the diagnosis an OMR sheet cannot produce at all, and
 * until now the page spent one number on it. The data earns the card: measured
 * across 300 submitted attempts in production, per-question dwell sums to the
 * attempt's own wall clock (median ratio 0.95, never above 1.01), so these
 * shares partition the real sitting rather than sampling it.
 *
 * Every figure is a MEDIAN, because dwell is wall-clock and includes idle —
 * production holds a single question at 6,131 seconds, which moves a mean and
 * not a median.
 */
function TimeCard({ lane }: { lane: Lane }) {
  const t: TimeAnalysis = lane.time;
  const cov = lane.coverage;
  if (t.totalSecs === 0) return null;

  // Only claim a pacing finding when both ends of the paper were actually timed.
  const rushed =
    cov.headMedianSecs !== null &&
    cov.tailMedianSecs !== null &&
    cov.headMedianSecs >= 2 * cov.tailMedianSecs;

  return (
    <Section
      title="Time analysis"
      note="Where the clock went, and what it bought. Medians throughout — dwell is wall-clock on the question, so one abandoned tab would move a mean."
    >
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Where the clock went</span>
            <span className="text-sm font-semibold tabular-nums">{fmtDuration(t.totalSecs)}</span>
          </div>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-muted" aria-hidden>
            <Segment n={t.correctSecs} total={t.totalSecs} className="bg-emerald-500" />
            <Segment n={t.wrongSecs} total={t.totalSecs} className="bg-red-500" />
            <Segment n={t.blankSecs} total={t.totalSecs} className="bg-amber-500" />
            <Segment n={t.unjudgedSecs} total={t.totalSecs} className="bg-muted-foreground/30" />
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <TimeMetric
              label="On correct answers"
              secs={t.correctSecs}
              total={t.totalSecs}
              median={t.medianCorrectSecs}
              tone="text-emerald-600 dark:text-emerald-400"
            />
            <TimeMetric
              label="On wrong answers"
              secs={t.wrongSecs}
              total={t.totalSecs}
              median={t.medianWrongSecs}
              tone="text-red-600 dark:text-red-400"
            />
            <TimeMetric
              label="On questions left blank"
              secs={t.blankSecs}
              total={t.totalSecs}
              median={t.medianBlankSecs}
              tone="text-amber-600 dark:text-amber-400"
            />
          </dl>
        </div>

        {/* The pace curve, always — not only when it crosses a threshold. Two
            numbers a reader can judge beat a sentence that appears sometimes. */}
        {(cov.headMedianSecs !== null || cov.tailMedianSecs !== null) && (
          <p className="border-t pt-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Pace.</span>{" "}
            {cov.headMedianSecs ?? DASH}s per question in the first fifth of the paper →{" "}
            {cov.tailMedianSecs ?? DASH}s in the last.
            {rushed && " The paper was rushed at the end."}
          </p>
        )}

        {t.slowest.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Slowest chapters.</span> Seconds are
              only a finding next to the accuracy they bought.
            </p>
            <ul className="mt-2 space-y-1.5">
              {t.slowest.map((c) => (
                <li key={c.chapter} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="min-w-0 flex-1 truncate">{c.chapter}</span>
                  <span className="shrink-0 tabular-nums">
                    <span className="font-semibold">{c.medianSecs}s</span>
                    <span className="text-xs text-muted-foreground"> of {c.timedCount}</span>
                  </span>
                  <span
                    className={cn(
                      "w-20 shrink-0 text-right text-xs tabular-nums",
                      c.thin && "text-muted-foreground"
                    )}
                  >
                    {c.accuracy === null ? "not answered" : `${c.accuracy}% of ${c.judged}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {t.zeroDwell > 0 && (
          // Absence is not zero: a reached question with no recorded dwell is a
          // measurement gap, and counting it as a 0-second solve would assert
          // something we never observed.
          <p className="border-t pt-3 text-xs text-muted-foreground">
            {t.zeroDwell} reached question{t.zeroDwell === 1 ? "" : "s"} recorded no time and{" "}
            {t.zeroDwell === 1 ? "is" : "are"} excluded from these medians.
          </p>
        )}
      </div>
    </Section>
  );
}

/** A time bucket: share of the clock, then the median question inside it. */
function TimeMetric({
  label,
  secs,
  total,
  median,
  tone,
}: {
  label: string;
  secs: number;
  total: number;
  median: number | null;
  tone: string;
}) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("text-lg font-semibold tabular-nums", tone)}>
        {total > 0 ? `${Math.round((secs / total) * 100)}%` : DASH}
      </dd>
      <dd className="text-xs tabular-nums text-muted-foreground">
        {fmtDuration(secs)}
        {median !== null && ` · ${median}s each`}
      </dd>
    </div>
  );
}

/** Seconds as something a teacher reads at a glance: 45s, 12m, 2h 34m. */
function fmtDuration(secs: number): string {
  if (secs < 60) return `${Math.round(secs)}s`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

/** One filter pill, shared by the exam and subject rows so the two axes cannot
 *  drift apart visually. `count` is judged answers — the same denominator both
 *  rows report, which is what makes them comparable. */
function Pill({
  href,
  active,
  count,
  children,
}: {
  href: string;
  active: boolean;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      // NEVER prefetch. These pills are query-param links on THIS route, so
      // there is no loading boundary for a prefetch to stop at — each one is a
      // FULL page render, and each render is a ~500 ms / 1.27 MB RPC. The
      // heaviest student carries 13 of them; on 2026-09-15 that made 18 of 24
      // calls in one minute time out (57014) and the page 500. Measured:
      // 5 concurrent 0/5 fail, 9 concurrent 7/9, 12 concurrent 12/12.
      prefetch={false}
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "border-brand-accent bg-brand text-brand-foreground" : "hover:bg-accent"
      )}
    >
      {children}
      <span className={cn("ml-1.5", active ? "opacity-80" : "text-muted-foreground")}>
        {count}
      </span>
    </Link>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="text-sm font-semibold">{title}</h3>
      {note && <p className="mb-3 mt-0.5 text-xs text-muted-foreground">{note}</p>}
      <div className={note ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

function Segment({ n, total, className }: { n: number; total: number; className: string }) {
  if (n <= 0 || total <= 0) return null;
  return <span className={className} style={{ width: `${(n / total) * 100}%` }} />;
}

function Metric({ label, value, tone }: { label: string; value: string | number; tone?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={cn("text-lg font-semibold tabular-nums", tone)}>{value}</dd>
    </div>
  );
}

function Chip({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof BookOpen;
  children: React.ReactNode;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </Link>
  );
}

function EmptyState({ inProgress, excluded }: { inProgress: number; excluded: number }) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center">
      <p className="text-sm text-muted-foreground">
        No graded paper to analyse yet.
        {inProgress > 0 && ` ${inProgress} attempt${inProgress === 1 ? " is" : "s are"} still in progress.`}
      </p>
      {excluded > 0 && (
        // Saying so matters: otherwise a student with attempts on the roster
        // shows an empty page here and it reads as a broken query.
        <p className="mt-1 text-xs text-muted-foreground">
          {excluded} attempt{excluded === 1 ? " was" : "s were"} excluded as a retake or as
          abandoned (under 20% answered).
        </p>
      )}
    </div>
  );
}
