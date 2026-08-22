import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowDownNarrowWide,
  Calculator,
  CheckCircle2,
  Clock,
  Flame,
  ListOrdered,
} from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { OVERVIEW, ROUTES } from "../_data/mht-cet-maths";
import {
  STRATEGY_HEADLINE,
  STRATEGY_STRANDS,
  TAIL_CHAPTERS,
  type DrillPosture,
  type StrandChapter,
  type TailStatus,
} from "../_data/strategy";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MHT-CET Maths Strategy — Order and Time, Never Attempt-vs-Skip",
  description:
    "MHT-CET Paper I is 50 Maths questions in 90 minutes with NO negative marking, so the strategic axis is order and time budget, never whether to attempt. Three strands — Cornerstone, Quick-Win, Long Tail — with a drill posture, must-drill subtopics and study hours per chapter, plus the five tail chapters and the 2025 syllabus move. Backed by 2,228 past-year questions across 45 shifts.",
  alternates: { canonical: "/guide/mht-cet-maths/strategy" },
};

/**
 * Posture badges. These describe WHEN in the 90 minutes a chapter's questions
 * get answered and how long you may stay on one — not whether to attempt it.
 * With no negative marking every question on this paper gets an answer, so no
 * badge here may read as "leave it".
 */
const POSTURE_BADGE: Record<DrillPosture, { label: string; className: string }> =
  {
    "bank-first": {
      label: "Bank first — opening sweep",
      className:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    },
    "own-outright": {
      label: "Own outright — no cheap half",
      className:
        "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    },
    "split-pass": {
      label: "Split pass — cheap half first",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
    },
    "last-pass-guess": {
      label: "Last pass — answer every one",
      className:
        "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
    },
  };

const TAIL_STATUS: Record<TailStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
  },
  entering: {
    label: "Entering — new in 2025",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  dropped: {
    label: "Dropped after 2024",
    className: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
  },
};

export default async function MhtCetMathsStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "MHT-CET", "Maths");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/mht-cet-maths/${r.slug}` : "/guide/mht-cet-maths",
    label: r.label,
  }));

  const resolveChapter = (c: StrandChapter) => {
    const chap = taxonomy.chapters.get(c.chapter);
    return {
      ...c,
      chapterId: chap?.id,
      drillSubtopics: c.mustDrill.map((name) => ({
        name,
        id: chap?.subtopics.get(name),
      })),
      targetHardSubtopics: (c.targetHard ?? []).map((name) => ({
        name,
        id: chap?.subtopics.get(name),
      })),
      lateQueueSubtopics: (c.skipSubtopics ?? []).map((name) => ({
        name,
        id: chap?.subtopics.get(name),
      })),
    };
  };

  // Every number below is summed from the data modules, never hand-written.
  const strandHours = STRATEGY_STRANDS.map((s) => ({
    id: s.id,
    label: s.label.split(" — ")[0],
    qCount: s.qCount,
    pctOfBank: s.pctOfBank,
    chapters: s.chapters.length,
    hours: s.chapters.reduce((sum, c) => sum + c.studyHours, 0),
  }));
  const totalHours = strandHours.reduce((sum, s) => sum + s.hours, 0);

  const cornerstone = STRATEGY_STRANDS.find((s) => s.id === "cornerstone");
  const cornerstoneChapterIds = (cornerstone?.chapters ?? [])
    .map((c) => taxonomy.chapters.get(c.chapter)?.id)
    .filter((id): id is string => Boolean(id));

  const stats = [
    {
      value: `${STRATEGY_HEADLINE.targetMarks}+`,
      label: `marks out of ${STRATEGY_HEADLINE.totalMarks}`,
    },
    {
      value: `${STRATEGY_HEADLINE.targetAttempts}/${STRATEGY_HEADLINE.paperQ}`,
      label: "questions answered — all of them",
    },
    {
      value: `${STRATEGY_HEADLINE.minutesPerQuestion} min`,
      label: "per question, all you get",
    },
    { value: `~${totalHours} h`, label: "total prep time" },
  ];

  return (
    <GuideShell
      guideTitle="MHT-CET Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-maths", label: "Mathematics" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-maths/strategy"
        headline="MHT-CET Maths Strategy — Order and Time, Never Attempt-vs-Skip"
        description="MHT-CET Paper I is 50 Maths questions in 90 minutes with no negative marking, so the strategic axis is order and time budget. Three strands with a drill posture, must-drill subtopics and study hours per chapter, plus the five tail chapters and the 2025 syllabus move."
      />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${STRATEGY_HEADLINE.targetMarks}+ on Paper I by deciding ORDER, not what to skip`}
        subtitle={`${STRATEGY_HEADLINE.paperQ} Mathematics questions × ${STRATEGY_HEADLINE.marksPerCorrect} marks = ${STRATEGY_HEADLINE.totalMarks} marks in ${STRATEGY_HEADLINE.durationMin} minutes, with a penalty of ${STRATEGY_HEADLINE.penaltyPerWrong} for a wrong answer. Nothing is deducted here, so every bubble gets filled and the only real decisions are what you answer first and how long you are allowed to stay.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The arithmetic — and why the attempt-vs-skip axis does not exist */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Calculator className="h-5 w-5 text-primary" aria-hidden />
          The arithmetic of {STRATEGY_HEADLINE.targetMarks}+
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          {STRATEGY_HEADLINE.targetAttempts} answers at{" "}
          {STRATEGY_HEADLINE.targetAccuracyPct}% accuracy is{" "}
          {Math.round(
            (STRATEGY_HEADLINE.targetAttempts *
              STRATEGY_HEADLINE.targetAccuracyPct) /
              100
          )}{" "}
          correct, which at {STRATEGY_HEADLINE.marksPerCorrect} marks each is{" "}
          <span className="font-medium text-foreground">
            {Math.round(
              (STRATEGY_HEADLINE.targetAttempts *
                STRATEGY_HEADLINE.targetAccuracyPct *
                STRATEGY_HEADLINE.marksPerCorrect) /
                100
            )}{" "}
            marks
          </span>
          . Note what that target does <em>not</em> contain: an
          attempts-versus-accuracy trade-off. Target attempts is{" "}
          {STRATEGY_HEADLINE.targetAttempts} because the paper has{" "}
          {STRATEGY_HEADLINE.paperQ} questions, and the reason it can be the
          whole paper is the row in the middle of this table.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              What each of the three things you can do with an uncertain
              question is worth on MHT-CET Paper I
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  What you do with an uncertain question
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Marks
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Verdict
                </th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              <tr className="border-b bg-emerald-50/50 dark:bg-emerald-950/20">
                <th scope="row" className="px-3 py-2 text-left font-medium">
                  Answer it, and it is right
                </th>
                <td className="px-3 py-2 text-right font-medium">
                  +{STRATEGY_HEADLINE.marksPerCorrect}
                </td>
                <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                  Paid
                </td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="px-3 py-2 text-left font-normal">
                  Answer it, and it is wrong
                </th>
                <td className="px-3 py-2 text-right">
                  −{STRATEGY_HEADLINE.penaltyPerWrong}
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  Costs nothing
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-3 py-2 text-left font-normal">
                  Leave it blank
                </th>
                <td className="px-3 py-2 text-right">0</td>
                <td className="px-3 py-2 text-destructive">
                  Identical to a wrong answer, with no chance of the{" "}
                  {STRATEGY_HEADLINE.marksPerCorrect}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            The penalty for a wrong answer on this exam is{" "}
            {STRATEGY_HEADLINE.penaltyPerWrong}.
          </span>{" "}
          A blank and a wrong answer score exactly the same, so a guess is free
          and a blank is strictly worse than one. Every strategy habit imported
          from an exam that deducts marks — hold back unless you are confident,
          protect your accuracy, attempt fewer and attempt better — is actively
          harmful here. What is scarce on this paper is not attempts. It is the{" "}
          {STRATEGY_HEADLINE.minutesPerQuestion} minutes per question, and that
          is what the three strands below are ordered by.
        </p>
      </section>

      {/* Strands */}
      {STRATEGY_STRANDS.map((strand) => {
        const resolved = strand.chapters.map(resolveChapter);
        return (
          <section key={strand.id} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {strand.label}
            </h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
              {strand.pitch}
            </p>
            <div className="mt-4 rounded-md border-l-4 border-primary/60 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                The approach
              </p>
              <ul className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
                {strand.approach.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              {resolved.map((c) => {
                const badge = POSTURE_BADGE[c.posture];
                return (
                  <article
                    key={c.chapter}
                    className="rounded-lg border bg-card p-5 shadow-sm"
                  >
                    <header className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                          {c.chapter}
                        </h3>
                        <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                          {c.qCount} questions · {c.pctHard}% hard
                        </p>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </header>

                    <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
                      {c.summary}
                    </p>

                    <div className="mt-4 space-y-2">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Drill
                        — in this order
                      </p>
                      <ul className="space-y-1.5">
                        {c.drillSubtopics.map((s) => (
                          <li
                            key={s.name}
                            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                          >
                            <span className="text-sm">{s.name}</span>
                            <BrowseLink
                              examId={taxonomy.examId}
                              subjectId={taxonomy.subjectId}
                              chapterIds={c.chapterId ? [c.chapterId] : []}
                              subtopicIds={s.id ? [s.id] : []}
                              variant="outline"
                              className="shrink-0 px-3 py-1 text-xs"
                            >
                              <span className="sr-only">
                                Drill {s.name} in {c.chapter}
                              </span>
                              <span aria-hidden>Drill</span>
                            </BrowseLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {c.targetHardSubtopics.length > 0 && (
                      <div className="mt-4 space-y-2 rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 p-3 dark:bg-amber-950/20">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          <Flame className="h-3.5 w-3.5" aria-hidden />{" "}
                          HARD-target
                        </p>
                        <p className="font-serif text-xs leading-relaxed text-foreground/85">
                          These subtopics carry the chapter&rsquo;s HARD pool.
                          Extra timed reps with a HARD-only filter pay off — not
                          because these questions are worth more (every question
                          on this paper is worth{" "}
                          {STRATEGY_HEADLINE.marksPerCorrect} marks) but because
                          they are where the minutes go.
                        </p>
                        <ul className="space-y-1.5">
                          {c.targetHardSubtopics.map((s) => (
                            <li
                              key={s.name}
                              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                            >
                              <span className="text-sm">{s.name}</span>
                              <BrowseLink
                                examId={taxonomy.examId}
                                subjectId={taxonomy.subjectId}
                                chapterIds={c.chapterId ? [c.chapterId] : []}
                                subtopicIds={s.id ? [s.id] : []}
                                difficulties={["HARD"]}
                                variant="outline"
                                className="shrink-0 px-3 py-1 text-xs"
                              >
                                <span className="sr-only">
                                  Drill HARD questions in {s.name}
                                </span>
                                <span aria-hidden>Drill HARD</span>
                              </BrowseLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {c.lateQueueSubtopics.length > 0 && (
                      <div className="mt-4 space-y-2 rounded-md border-l-4 border-slate-400/60 bg-muted/40 p-3">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <ArrowDownNarrowWide
                            className="h-3.5 w-3.5"
                            aria-hidden
                          />{" "}
                          Last in the prep queue
                        </p>
                        <p className="font-serif text-xs leading-relaxed text-foreground/85">
                          Low prep priority — these go last, and are the first
                          to drop if your hours run out before the exam.{" "}
                          <span className="font-medium text-foreground">
                            This is a prep-order call, not a paper-day one:
                          </span>{" "}
                          if one of these turns up in the hall you still answer
                          it, because a blank scores the same as a wrong answer.
                        </p>
                        <ul className="space-y-1.5">
                          {c.lateQueueSubtopics.map((s) => (
                            <li
                              key={s.name}
                              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                            >
                              <span className="text-sm text-muted-foreground">
                                {s.name}
                              </span>
                              <BrowseLink
                                examId={taxonomy.examId}
                                subjectId={taxonomy.subjectId}
                                chapterIds={c.chapterId ? [c.chapterId] : []}
                                subtopicIds={s.id ? [s.id] : []}
                                variant="ghost"
                                className="shrink-0 px-3 py-1 text-xs"
                              >
                                <span className="sr-only">
                                  Drill {s.name} in {c.chapter} if time allows
                                </span>
                                <span aria-hidden>If time allows</span>
                              </BrowseLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
                      <span>
                        <span className="font-medium text-foreground">
                          {c.expectedYieldPerPaper}
                        </span>
                      </span>
                      <span>
                        <span className="font-medium text-foreground tabular-nums">
                          {c.studyHours}h
                        </span>{" "}
                        study time
                      </span>
                    </footer>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Tail chapters */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <ListOrdered className="h-5 w-5 text-primary" aria-hidden />
          The {TAIL_CHAPTERS.length} chapters below the playbook line
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          These sit under 0.9 questions a paper, so none of them ships a
          playbook — they are listed here so the {OVERVIEW.chapters}-chapter
          bank is accounted for rather than quietly truncated at{" "}
          {OVERVIEW.playbooks}. Read the status column first: the 2025 syllabus
          moved in both directions, and it matters more than the question
          counts suggest.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Tail chapters with lifetime question count, recent questions per
              paper, percentage HARD, syllabus status and a note
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  Chapter
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Questions
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  q/paper
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  % HARD
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {TAIL_CHAPTERS.map((t) => {
                const status = TAIL_STATUS[t.status];
                return (
                  <tr key={t.chapter} className="border-b last:border-b-0">
                    <th
                      scope="row"
                      className="px-3 py-2 text-left align-top font-medium"
                    >
                      {t.chapter}
                      <span className="mt-1 block font-serif text-xs font-normal leading-relaxed text-muted-foreground">
                        {t.note}
                      </span>
                    </th>
                    <td className="px-3 py-2 text-right align-top tabular-nums">
                      {t.qCount}
                    </td>
                    <td className="px-3 py-2 text-right align-top tabular-nums">
                      {t.qPerPaper}
                    </td>
                    <td className="px-3 py-2 text-right align-top tabular-nums">
                      {t.pctHard}%
                    </td>
                    <td className="px-3 py-2 align-top">
                      <span
                        className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 p-4 font-serif text-sm leading-relaxed text-foreground/90 dark:bg-amber-950/20">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
            aria-hidden
          />
          <span>
            <strong className="font-semibold text-foreground">
              Measures of Dispersion is dropped, and it is the pleasant trap on
              this list.
            </strong>{" "}
            At {
              TAIL_CHAPTERS.find((t) => t.chapter === "Measures of Dispersion")
                ?.pctHard
            }
            % HARD it reads as guaranteed cheap marks and it appears in
            essentially every 2023-24 paper you will practise — then it scored
            zero across all of 2025. Hours spent there buy nothing. Conic
            Sections is its mirror image: it entered in 2025, and a student
            prepping from 2023-24 papers has never seen it.
          </span>
        </p>
      </section>

      {/* Time budget */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          Time investment plan
        </h2>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Study hours by strand, summed from each strand&rsquo;s chapters
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  Strand
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Chapters
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Bank share
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {strandHours.map((s) => (
                <tr key={s.id} className="border-b">
                  <th scope="row" className="px-3 py-2 text-left font-normal">
                    {s.label}
                  </th>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {s.chapters}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {s.qCount} q · {s.pctOfBank}%
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {s.hours}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground/20 bg-muted/40">
                <th scope="row" className="px-3 py-2 text-left font-semibold">
                  Total
                </th>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {strandHours.reduce((sum, s) => sum + s.chapters, 0)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {strandHours.reduce((sum, s) => sum + s.qCount, 0)} q
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {totalHours}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          Spend the hours in strand order — Cornerstone first, then Quick-Win,
          then Long Tail — but note that the order you PREPARE in is not the
          order you ANSWER in. On the paper the quick-wins and the cheap halves
          of the split-pass cornerstones go on the opening sweep; the expensive
          halves and the long tail wait for the second pass, when you know how
          much clock you actually have. Whatever is still unanswered in the
          last five minutes gets a guess, because a guess is free.
        </p>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with the {cornerstone?.chapters.length ?? 0} cornerstone
          chapters
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {cornerstone?.qCount} questions — {cornerstone?.pctOfBank}% of the
          bank — across {cornerstone?.chapters.length} chapters, on a{" "}
          {STRATEGY_HEADLINE.paperQ}-question paper. You cannot reach a good
          score without these, and a half-remembered technique here costs you
          minutes rather than marks.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={cornerstoneChapterIds}
          >
            Drill the {cornerstone?.qCount} cornerstone questions
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            variant="outline"
          >
            Browse all MHT-CET Maths
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/mht-cet-maths", label: "Overview" }}
        next={{
          href: "/guide/mht-cet-maths/playbooks",
          label: `Playbooks — ${PLAYBOOKS.length} chapter deep-dives`,
        }}
      />
    </GuideShell>
  );
}
