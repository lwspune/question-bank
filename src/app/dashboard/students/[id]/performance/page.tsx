import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, Dumbbell, ExternalLink } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import StudentTabs from "../StudentTabs";
import ChapterAccordion from "./ChapterAccordion";
import { cn } from "@/lib/utils";
import { getSessionSuperadmin } from "@/lib/auth";
import { getStudentDetail } from "@/lib/students/detail";
import { getStudentPerformance } from "@/lib/performance/service";
import { buildPerformance, type Lane } from "@/lib/performance/compute";
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

  // Lanes are pre-sorted by evidence, so the first is the best default.
  const selected =
    lanes.find((l) => l.exam === searchParams.exam && l.subject === searchParams.subject) ??
    lanes[0] ??
    null;

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

            {lanes.length > 1 && (
              <nav aria-label="Subject" className="flex flex-wrap gap-2">
                {lanes.map((l) => {
                  const active = l === selected;
                  return (
                    <Link
                      key={`${l.exam}-${l.subject}`}
                      href={`/dashboard/students/${params.id}/performance?exam=${encodeURIComponent(l.exam)}&subject=${encodeURIComponent(l.subject)}`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active
                          ? "border-brand-accent bg-brand text-brand-foreground"
                          : "hover:bg-accent"
                      )}
                    >
                      {l.exam} · {l.subject}
                      <span className={cn("ml-1.5", active ? "opacity-80" : "text-muted-foreground")}>
                        {l.judged}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            )}

            {selected && <LaneView lane={selected} studentId={params.id} />}
          </>
        )}
      </main>
    </>
  );
}

function LaneView({ lane, studentId }: { lane: Lane; studentId: string }) {
  const focus = buildFocusAreas(lane.exam, lane.subject, lane.chapters);
  const cov = lane.coverage;
  // Only claim a pacing finding when both ends of the paper were actually timed.
  const rushed =
    cov.headMedianSecs !== null &&
    cov.tailMedianSecs !== null &&
    cov.headMedianSecs >= 2 * cov.tailMedianSecs;

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

      {/* Coverage & pacing — the readout nda-tracker cannot build, because an
          OMR sheet cannot tell a deliberate skip from a question never reached. */}
      <Section title="Coverage &amp; pacing">
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
            {rushed && (
              <>
                {" "}
                Pace fell from{" "}
                <span className="font-medium text-foreground">{cov.headMedianSecs}s</span> per
                question in the first fifth to{" "}
                <span className="font-medium text-foreground">{cov.tailMedianSecs}s</span> in the
                last — the paper was rushed at the end.
              </>
            )}
          </p>
        </div>
      </Section>

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
          <AuditList rows={lane.wrongAudit} kind="wrong" studentId={studentId} />
        </Section>
      )}

      {lane.skipAudit.length > 0 && (
        <Section
          title="Skipped audit"
          note="Questions they SAW and left blank. Questions never reached are excluded — those are a pacing problem, reported above."
        >
          <AuditList rows={lane.skipAudit} kind="skipped" studentId={studentId} />
        </Section>
      )}

      {lane.projection && (
        <Section
          title="Projected score"
          note={`Ranked by recoverable marks. Chapter weight is derived live from the bank's own PYQ counts, and the penalty from this paper's real marking scheme.`}
        >
          <div className="rounded-lg border bg-card">
            <div className="flex items-baseline justify-between border-b p-4">
              <span className="text-sm text-muted-foreground">Projected</span>
              <span className="text-2xl font-semibold tabular-nums">
                {lane.projection.total}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / {lane.projection.ceiling}
                </span>
              </span>
            </div>
            <ul className="divide-y">
              {lane.projection.rows.slice(0, 10).map((r) => (
                <li key={r.chapter} className="flex flex-wrap items-center gap-x-3 gap-y-1 p-3">
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {r.chapter}
                    {!r.tested && (
                      <span className="ml-2 text-xs text-muted-foreground">never tested</span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {r.projected.toFixed(1)} of {r.marksAtStake.toFixed(1)} marks
                  </span>
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-accent">
                    +{r.gap.toFixed(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </div>
  );
}

function AuditList({
  rows,
  kind,
  studentId,
}: {
  rows: Lane["wrongAudit"];
  kind: "wrong" | "skipped";
  studentId: string;
}) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {rows.slice(0, 12).map((r) => (
        <li key={`${r.chapter}-${r.subtopic}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 p-3">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{r.subtopic}</span>
            <span className="block truncate text-xs text-muted-foreground">{r.chapter}</span>
          </span>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
              kind === "wrong"
                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
          >
            {kind === "wrong" ? `${r.wrong} wrong` : `${r.seenBlank} skipped`}
          </span>
          {kind === "wrong" && r.wrongQuestionIds.length > 0 && (
            // The exact questions they missed, not a filter that approximates
            // them — `extras` takes question ids directly.
            <Chip
              href={`/browse?extras=${r.wrongQuestionIds.slice(0, 50).join(",")}`}
              icon={ExternalLink}
            >
              Open {r.wrongQuestionIds.length}
            </Chip>
          )}
        </li>
      ))}
      {rows.length > 12 && (
        <li className="p-3 text-xs text-muted-foreground">
          Showing the 12 worst of {rows.length} subtopics.{" "}
          <Link href={`/dashboard/students/${studentId}`} className="underline">
            Back to profile
          </Link>
        </li>
      )}
    </ul>
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
