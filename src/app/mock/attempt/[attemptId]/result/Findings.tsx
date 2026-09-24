import Link from "next/link";
import { ArrowRight, Clock, Target, XCircle } from "lucide-react";
import { formatDwell } from "@/lib/email/templates";
import { formatMarks, formatWhere, type MockReport } from "@/lib/email/mockReport";
import { goPracticeHref } from "@/lib/performance/links";

/**
 * "What to fix next" — the diagnosis, at the moment the student is looking at
 * the result rather than in an inbox they may never open.
 *
 * WHY THIS CARD EXISTS AT ALL. Before it, a finished mock ended in a score, a
 * Retake button and a link to the catalogue: the single highest-intent moment
 * in the product told the student nothing about what to do next. CLAUDE.md's
 * engagement gate is explicit that feedback fires at the TRIGGER SURFACE and
 * never on a dashboard they have to go and find — and /performance, which is
 * exactly this diagnosis in full, was reachable only from the profile menu.
 *
 * IT RENDERS THE SAME FINDINGS AS THE EMAIL, FROM THE SAME buildMockReport.
 * Not a second diagnosis that happens to agree today: the report's grain split
 * is load-bearing (per-question facts from THIS attempt, subtopic picks POOLED
 * across every paper), and a re-derivation here would drift from it silently.
 * The headings deliberately match the email's, so a student who reads both sees
 * one voice rather than two products.
 *
 * WHAT IT ADDS OVER THE EMAIL: links. Each question jumps to its own card in
 * the review list below, and each subtopic opens practice on that topic — the
 * email can only name them.
 *
 * NO PEER PERCENTAGES. question_item_stats is staff-read by RLS, so the page
 * passes an empty PeerMap and this shows no "x% of students got this right".
 * That is a deliberate stop, not an oversight: surfacing it would need a
 * service-role read on a student page plus a decision about showing one student
 * how the cohort did, which is the kind of peer comparison the engagement gate
 * is careful about. The cost is that ranking falls back to dwell-then-position.
 */
export default function Findings({ report, attemptId }: { report: MockReport; attemptId: string }) {
  if (!report.hasFindings) return null;

  return (
    <section className="mt-6 rounded-xl border bg-card p-6" aria-labelledby="findings-heading">
      <h2 id="findings-heading" className="text-lg font-semibold">
        What to fix next
      </h2>

      {report.easyWrong.length > 0 && (
        <Block
          icon={XCircle}
          tone="text-red-600"
          title={`Easy marks you dropped (${report.easyWrong.length})`}
        >
          <ul className="space-y-1.5">
            {report.easyWrong.map((q) => (
              <li key={q.questionId}>
                <QuestionLink position={q.position} where={formatWhere(q)} />
              </li>
            ))}
          </ul>
        </Block>
      )}

      {report.easyLeft.length > 0 && (
        <Block
          icon={Target}
          tone="text-amber-600"
          title={`Easy ones you looked at and left (${report.easyLeft.length})`}
        >
          <ul className="space-y-1.5">
            {report.easyLeft.map((q) => (
              <li key={q.questionId}>
                <QuestionLink
                  position={q.position}
                  where={formatWhere(q)}
                  /* Dwell is the reason this question is on the list rather
                     than any other blank — a 90s abandon is a decision. */
                  note={formatDwell(q.secs) ? `you spent ${formatDwell(q.secs)} on it` : undefined}
                />
              </li>
            ))}
          </ul>
        </Block>
      )}

      {report.pacing && (
        <Block icon={Clock} tone="text-muted-foreground" title="Pacing">
          <p className="text-sm text-muted-foreground">
            You never reached{" "}
            <span className="font-medium text-foreground">
              {report.pacing.neverReached} questions
            </span>{" "}
            — {formatMarks(report.pacing.marksLeft)} marks you didn&apos;t get a shot at. That&apos;s
            the clock, not the syllabus.
          </p>
        </Block>
      )}

      {report.subtopics.length > 0 && (
        <Block icon={ArrowRight} tone="text-brand-accent" title="Where your next marks are">
          {/* The one POOLED section. Saying so is not a caveat, it is the
              claim: these picks get better the more papers they sit, and a
              student who read it as "in this paper" would rightly wonder why a
              topic they never saw today is on the list. */}
          <p className="mb-2 text-sm text-muted-foreground">
            Across every paper you&apos;ve sat, not just this one:
          </p>
          <ul className="space-y-2">
            {report.subtopics.map((s) => (
              <li
                key={`${s.subject}-${s.chapter}-${s.subtopic}`}
                className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm"
              >
                <span className="font-semibold tabular-nums">about {formatMarks(s.gap)} marks</span>
                <span className="text-muted-foreground">· {formatWhere(s)}</span>
                {s.accuracy !== null && (
                  <span className="text-xs text-muted-foreground">
                    (you&apos;re at {s.accuracy}% over {s.judged} questions)
                  </span>
                )}
                <Link
                  href={goPracticeHref(report.examName, s.subject, s.chapter, s.subtopic)}
                  className="text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
                >
                  Practise this
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* The card names what is broken; this is the only control that DOES
          something about it. It leads because a diagnosis nobody can act on is
          where this surface started — /drill serves these same questions back,
          which is the deliberate-practice half of the engagement gate. It is
          offered on every result, not only a bad one: the pool is built from
          every paper they have sat, so there is something to fix after a good
          sitting too. */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          // Scoped to THIS attempt, the same target as the headline button
          // above, so the two CTAs on the page agree about where "fix" goes.
          href={`/drill?attempt=${attemptId}`}
          prefetch={false}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-base font-medium text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Target className="h-5 w-5" aria-hidden />
          Fix five of these now
        </Link>
        <Link
          href="/performance"
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
        >
          Your full performance across all papers
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function Block({
  icon: Icon,
  tone,
  title,
  children,
}: {
  icon: typeof XCircle;
  tone: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Icon className={`h-4 w-4 ${tone}`} aria-hidden />
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/** Jumps to the question's own card in the review list further down the page,
 *  where the stem, their answer and the solution already render. A same-page
 *  anchor, so there is no route to prefetch and nothing to load. */
function QuestionLink({
  position,
  where,
  note,
}: {
  position: number;
  where: string;
  note?: string;
}) {
  return (
    <a
      href={`#q${position}`}
      className="group flex flex-wrap items-baseline gap-x-2 text-sm underline-offset-4 hover:underline focus-visible:underline"
    >
      <span className="font-mono text-xs text-muted-foreground">Q{position}</span>
      <span>{where}</span>
      {note && <span className="text-xs text-muted-foreground">— {note}</span>}
    </a>
  );
}
