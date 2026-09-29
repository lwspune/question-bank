import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo/title";
import { ArrowDownNarrowWide, Calculator, CheckCircle2, Clock, Flame, ListOrdered } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { OVERVIEW, ROUTES } from "../_data/cds-maths";
import {
  GUESS_RULE,
  STRATEGY_HEADLINE,
  STRATEGY_STRANDS,
  TAIL_CHAPTERS,
  type DrillPosture,
  type StrandChapter,
} from "../_data/strategy";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: fitTitle("CDS Maths Strategy — What to Attempt with a One-Third Penalty") },
  description:
    "CDS Elementary Mathematics is 100 questions in 120 minutes with a third of a mark lost per wrong answer, so the decision on each question is whether to attempt it. Three strands — Cornerstone, Quick-Win, Selective — with a posture, must-drill subtopics and study hours per chapter, and the guessing rule. Backed by 2,096 past-year questions across 21 papers.",
  alternates: { canonical: "/guide/cds-maths/strategy" },
};

/** Posture badges: how to take a chapter's questions on a paper that deducts for a wrong answer. */
const POSTURE_BADGE: Record<DrillPosture, { label: string; className: string }> = {
  "attempt-all": {
    label: "Attempt all — cheap chapter",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  "own-outright": {
    label: "Own outright — HARD spread through it",
    className: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  "split-pass": {
    label: "Split pass — cheap pages first",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  },
};

export default async function CdsMathsStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "CDS", "Mathematics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths",
    label: r.label,
  }));

  const resolveChapter = (c: StrandChapter) => {
    const chap = taxonomy.chapters.get(c.chapter);
    const withId = (name: string) => ({ name, id: chap?.subtopics.get(name) });
    return {
      ...c,
      chapterId: chap?.id,
      drillSubtopics: c.mustDrill.map(withId),
      targetHardSubtopics: (c.targetHard ?? []).map(withId),
      poolSubtopics: (c.skipSubtopics ?? []).map(withId),
    };
  };

  const h = STRATEGY_HEADLINE;
  const right = Math.round((h.targetAttempts * h.targetAccuracyPct) / 100);
  const wrong = h.targetAttempts - right;

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
    { value: `${h.targetMarks}+`, label: `marks out of ${h.totalMarks}` },
    { value: `${h.targetAttempts}/${h.paperQ}`, label: "questions attempted" },
    { value: `${h.targetAccuracyPct}%`, label: "accuracy on those" },
    { value: `~${totalHours} h`, label: "total prep time" },
  ];

  return (
    <GuideShell
      guideTitle="CDS Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/cds-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/cds", label: "CDS" },
        { href: "/guide/cds-maths", label: "Mathematics" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/cds-maths/strategy"
        headline="CDS Maths Strategy — What to Attempt with a One-Third Penalty"
        description="CDS Elementary Mathematics deducts a third of a mark per wrong answer, so the decision on each question is whether to attempt it. Three strands with a posture, must-drill subtopics and study hours per chapter, and the guessing rule."
      />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${h.targetMarks}+ by choosing what to attempt`}
        subtitle={`${h.paperQ} questions × ${h.marksPerCorrect} mark = ${h.totalMarks} marks in ${h.durationMin} minutes, and a third of a mark lost for each wrong answer. That makes two decisions matter: which chapters to prepare first, and on the day, which questions to attempt and which to leave.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The arithmetic */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Calculator className="h-5 w-5 text-primary" aria-hidden />
          The arithmetic of {h.targetMarks}+
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          {h.targetAttempts} attempts at {h.targetAccuracyPct}% accuracy is {right} right and {wrong} wrong:{" "}
          {right} − {wrong}/3 ={" "}
          <span className="font-medium text-foreground">{right - wrong / 3} marks</span>. The {h.paperQ - h.targetAttempts} you leave
          are the ones you could not narrow down. Attempting them blind would add nothing on average — and
          attempting them after ruling out an option would add a little.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Expected marks from guessing a CDS Maths question, by how many options are still in play
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Options still in play</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Expected marks from a guess</th>
                <th scope="col" className="px-3 py-2 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {GUESS_RULE.map((g) => (
                <tr key={g.optionsLeft} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left font-normal">{g.optionsLeft}</th>
                  <td className="px-3 py-2 text-right">{g.expected}</td>
                  <td className="px-3 py-2 text-muted-foreground">{g.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">So a guess is a tool, not a gamble.</span> Ruling out
          one option on sight — a value out of range, the wrong units, the wrong sign — is what turns a
          question you cannot solve into one worth attempting. And at {h.minutesPerQuestion} minutes a
          question, the questions you leave should be the ones you could not open, not the ones you ran out of
          time for. The three strands below are ordered for both.
        </p>
      </section>

      {/* Strands */}
      {STRATEGY_STRANDS.map((strand) => {
        const resolved = strand.chapters.map(resolveChapter);
        return (
          <section key={strand.id} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{strand.label}</h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">{strand.pitch}</p>
            <div className="mt-4 rounded-md border-l-4 border-primary/60 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">The approach</p>
              <ul className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
                {strand.approach.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              {resolved.map((c) => {
                const badge = POSTURE_BADGE[c.posture];
                return (
                  <article key={c.chapter} className="rounded-lg border bg-card p-5 shadow-sm">
                    <header className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight sm:text-lg">{c.chapter}</h3>
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

                    <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">{c.summary}</p>

                    <div className="mt-4 space-y-2">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Drill — in this order
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
                          <Flame className="h-3.5 w-3.5" aria-hidden /> HARD-target
                        </p>
                        <p className="font-serif text-xs leading-relaxed text-foreground/85">
                          These subtopics carry the chapter&rsquo;s HARD questions. Timed reps with a HARD-only
                          filter are what turn them from questions you leave into questions you attempt.
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
                                <span className="sr-only">Drill HARD questions in {s.name}</span>
                                <span aria-hidden>Drill HARD</span>
                              </BrowseLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {c.poolSubtopics.length > 0 && (
                      <div className="mt-4 space-y-2 rounded-md border-l-4 border-slate-400/60 bg-muted/40 p-3">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <ArrowDownNarrowWide className="h-3.5 w-3.5" aria-hidden /> The HARD pool — last
                        </p>
                        <p className="font-serif text-xs leading-relaxed text-foreground/85">
                          Last in prep, and first to drop if your hours run out. On the paper, attempt one of
                          these only if you can see the solution; otherwise rule out what you can and apply
                          the guessing rule.
                        </p>
                        <ul className="space-y-1.5">
                          {c.poolSubtopics.map((s) => (
                            <li
                              key={s.name}
                              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                            >
                              <span className="text-sm text-muted-foreground">{s.name}</span>
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
                      <span className="font-medium text-foreground">{c.expectedYieldPerPaper}</span>
                      <span>
                        <span className="font-medium tabular-nums text-foreground">{c.studyHours}h</span> study time
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
          These average under 1.5 questions a paper, so none ships a playbook. They are listed so the{" "}
          {OVERVIEW.chapters}-chapter bank is accounted for. Each still has full teaching notes.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Tail chapters with lifetime question count, questions per paper, percentage HARD and a note
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">q/paper</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">% HARD</th>
              </tr>
            </thead>
            <tbody>
              {TAIL_CHAPTERS.map((t) => (
                <tr key={t.chapter} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium">
                    {t.chapter}
                    <span className="mt-1 block font-serif text-xs font-normal leading-relaxed text-muted-foreground">
                      {t.note}
                    </span>
                  </th>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.qCount}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.qPerPaper}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.pctHard}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Time budget */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          Time investment plan
        </h2>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">Study hours by strand, summed from each strand&rsquo;s chapters</caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Strand</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Chapters</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Bank share</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Hours</th>
              </tr>
            </thead>
            <tbody>
              {strandHours.map((s) => (
                <tr key={s.id} className="border-b">
                  <th scope="row" className="px-3 py-2 text-left font-normal">{s.label}</th>
                  <td className="px-3 py-2 text-right tabular-nums">{s.chapters}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {s.qCount} q · {s.pctOfBank}%
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.hours}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground/20 bg-muted/40">
                <th scope="row" className="px-3 py-2 text-left font-semibold">Total</th>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {strandHours.reduce((sum, s) => sum + s.chapters, 0)}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {strandHours.reduce((sum, s) => sum + s.qCount, 0)} q
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">{totalHours}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          Prepare in strand order — Cornerstone, then Quick-Win, then Selective. On the paper, take two
          passes: first everything you can solve in about a minute, from any chapter; then the marked
          questions, closest first. Whatever is left at the end gets an answer only if you can rule out an
          option.
        </p>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with the {cornerstone?.chapters.length ?? 0} cornerstone chapters
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {cornerstone?.qCount} questions — {cornerstone?.pctOfBank}% of the bank — across{" "}
          {cornerstone?.chapters.length} chapters. No good score is possible without them.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} chapterIds={cornerstoneChapterIds}>
            Drill the {cornerstone?.qCount} cornerstone questions
          </BrowseLink>
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} variant="outline">
            Browse all CDS Maths
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/cds-maths", label: "Overview" }}
        next={{ href: "/guide/cds-maths/playbooks", label: `Playbooks — ${PLAYBOOKS.length} chapter deep-dives` }}
      />
    </GuideShell>
  );
}
