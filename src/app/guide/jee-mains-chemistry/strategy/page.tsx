import type { Metadata } from "next";
import Link from "next/link";
import { fitTitle } from "@/lib/seo/title";
import { Calculator, CheckCircle2, Clock, ListChecks, ListOrdered } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { EARLY, OVERVIEW, PAPER, RECENT } from "../_data/jee-mains-chemistry";
import {
  CALC_LINE,
  FORMAT_RULES,
  GUESS_RULE,
  LEFT_CHAPTERS,
  NUMERIC_RULE,
  PLAYBOOK_LINE,
  STRATEGY_HEADLINE,
  STRATEGY_STRANDS,
  TAIL_CHAPTERS,
  TIME_PLAN,
} from "../_data/strategy";
import { PLAYBOOKS } from "../_data/playbooks";
import { lastSeen } from "../_data/trends";
import { GUIDE_BASE, jeeChemGuideSideNav } from "../_data/nav";

export const revalidate = 86400;

const TITLE = "JEE Mains Chemistry Strategy — The Order to Take the Paper";
const DESCRIPTION = `JEE Mains Chemistry is ${PAPER.questions} questions at +${PAPER.marksPerCorrect} / −${PAPER.penaltyPerWrong}, on a clock shared with Physics and Maths. Three kinds of work — calculate, reactions, structure and recall — with the subtopics to drill in each chapter, how to handle the question formats, and a plan for the clock. Backed by ${OVERVIEW.totalQ.toLocaleString("en-IN")} past-year questions.`;

export const metadata: Metadata = {
  title: { absolute: fitTitle(TITLE) },
  description: DESCRIPTION,
  alternates: { canonical: `${GUIDE_BASE}/strategy` },
};

const STRAND_RULE = {
  calculate: `Chapters where ${CALC_LINE}% or more of the questions are calculations.`,
  reactions: `Organic reaction chapters, under ${CALC_LINE}% calculation.`,
  structure: `Structure, bonding and descriptive chapters, under ${CALC_LINE}% calculation.`,
} as const;

export default async function JeeMainsChemistryStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "JEE Mains", "Chemistry");

  const h = STRATEGY_HEADLINE;
  const right = Math.round((h.targetAttempts * h.targetAccuracyPct) / 100);
  const wrong = h.targetAttempts - right;
  const left = h.paperQ - h.targetAttempts;

  const calculate = STRATEGY_STRANDS.find((s) => s.id === "calculate");
  const calcNumeric = (calculate?.chapters ?? []).reduce((s, c) => s + c.numeric, 0);
  const calcPctOfNumeric = Math.round((100 * calcNumeric) / OVERVIEW.totalNumeric);
  const calculateIds = (calculate?.chapters ?? [])
    .map((c) => taxonomy.chapters.get(c.chapter)?.id)
    .filter((id): id is string => Boolean(id));

  const stats = [
    { value: `${h.targetMarks}+`, label: `marks out of ${h.totalMarks}` },
    { value: `${h.targetAttempts}/${h.paperQ}`, label: "questions attempted" },
    { value: `${h.targetAccuracyPct}%`, label: "accuracy on those" },
    { value: `~${h.durationMin} min`, label: "of the shared clock" },
  ];

  return (
    <GuideShell
      guideTitle="JEE Mains Chemistry Guide"
      sideNav={jeeChemGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Chemistry" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd type="Article" path={`${GUIDE_BASE}/strategy`} headline={TITLE} description={DESCRIPTION} />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${h.targetMarks}+ by taking the paper in the right order`}
        subtitle={`${h.paperQ} questions × ${h.marksPerCorrect} marks = ${h.totalMarks}, with ${h.penaltyPerWrong} mark lost for each wrong answer, on a clock shared with Physics and Maths. Chemistry is the section where many questions are answered on sight, so the plan is about order: what to answer first, what to calculate after, and what to guess.`}
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
          {h.targetAttempts} attempted questions at {h.targetAccuracyPct}% accuracy is {right} right and {wrong}{" "}
          wrong: {right} × {h.marksPerCorrect} − {wrong} ={" "}
          <span className="font-medium text-foreground">{right * h.marksPerCorrect - wrong * h.penaltyPerWrong} marks</span>.
          The other {left} are not simply left blank. Every multiple-choice question among them still gets an answer
          at the end, because a guess there is worth more than a blank:
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Expected marks from guessing a JEE Mains Chemistry question, by format and by options still in play
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Question</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Expected marks from a guess</th>
                <th scope="col" className="px-3 py-2 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {GUESS_RULE.map((g) => (
                <tr key={g.optionsLeft} className="border-b">
                  <th scope="row" className="px-3 py-2 text-left font-normal">MCQ, {g.optionsLeft} options left</th>
                  <td className="px-3 py-2 text-right">{g.expected}</td>
                  <td className="px-3 py-2 text-muted-foreground">{g.verdict}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="px-3 py-2 text-left font-normal">Numeric answer</th>
                <td className="px-3 py-2 text-right">{NUMERIC_RULE.expected}</td>
                <td className="px-3 py-2 text-muted-foreground">{NUMERIC_RULE.verdict}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">So the formats split.</span> The physical chapters hold{" "}
          {calcPctOfNumeric}% of the numeric answers, and a numeric answer is worth something only when you can
          finish it. Those chapters must be owned, not half-learned. A multiple-choice question is worth something
          even when you cannot finish it, and more once one option is ruled out on sight.
        </p>
      </section>

      {/* Clock */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          The shared clock
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          {PAPER.sharedMinutes} minutes cover all three subjects, and every question pays the same{" "}
          {PAPER.marksPerCorrect} marks. The plan below is a starting budget of about {PAPER.suggestedMinutes}{" "}
          minutes for Chemistry, not a measurement; adjust it from your own mock tests.
        </p>
        <ol className="mt-4 space-y-3">
          {TIME_PLAN.map((s, i) => (
            <li key={s.step} className="flex gap-3 rounded-md border bg-card p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{s.step}</p>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Formats */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <ListChecks className="h-5 w-5 text-primary" aria-hidden />
          The formats the paper reuses
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          A few question formats turn up in every chapter. Each has a way of working that saves time and marks.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">How to work each question format on the JEE Mains Chemistry paper</caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Format</th>
                <th scope="col" className="px-3 py-2 font-medium">How to work it</th>
                <th scope="col" className="px-3 py-2 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {FORMAT_RULES.map((f) => (
                <tr key={f.format} className="border-b align-top last:border-b-0">
                  <th scope="row" className="whitespace-nowrap px-3 py-2 text-left font-medium">{f.format}</th>
                  <td className="px-3 py-2 font-serif leading-relaxed text-foreground/90">{f.how}</td>
                  <td className="px-3 py-2 font-serif leading-relaxed text-muted-foreground">{f.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Strands */}
      {STRATEGY_STRANDS.map((strand) => {
        const share = strand.chapters.reduce((s, c) => s + c.recentPerPaper, 0);
        return (
          <section key={strand.id} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {strand.label} — {strand.chapters.length} chapters, {share.toFixed(1)} questions a paper
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{STRAND_RULE[strand.id]}</p>
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
              {strand.chapters.map((c) => {
                const chap = taxonomy.chapters.get(c.chapter);
                return (
                  <article key={c.chapter} className="rounded-lg border bg-card p-5 shadow-sm">
                    <header className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                          <Link
                            href={`${GUIDE_BASE}/playbooks/${c.slug}`}
                            className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {c.chapter}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                          {c.recentPerPaper.toFixed(2)} a paper in {RECENT.label} · {c.earlyPerPaper.toFixed(2)} in{" "}
                          {EARLY.label} · {c.pctCalc}% calculation · {c.pctNumeric}% numeric
                        </p>
                      </div>
                      {c.notesHref && (
                        <Link
                          href={c.notesHref}
                          className="shrink-0 text-xs font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Notes
                          <span className="sr-only"> for {c.chapter}</span>
                        </Link>
                      )}
                    </header>

                    <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">{c.summary}</p>

                    <div className="mt-4 space-y-2">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Drill — in teaching order
                      </p>
                      <ul className="space-y-1.5">
                        {c.subtopics.map((name) => {
                          const id = chap?.subtopics.get(name);
                          return (
                            <li
                              key={name}
                              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                            >
                              <span className="text-sm">{name}</span>
                              <BrowseLink
                                examId={taxonomy.examId}
                                subjectId={taxonomy.subjectId}
                                chapterIds={chap?.id ? [chap.id] : []}
                                subtopicIds={id ? [id] : []}
                                variant="outline"
                                className="shrink-0 px-3 py-1 text-xs"
                              >
                                <span className="sr-only">
                                  Drill {name} in {c.chapter}
                                </span>
                                <span aria-hidden>Drill</span>
                              </BrowseLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Tail + left the syllabus */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <ListOrdered className="h-5 w-5 text-primary" aria-hidden />
          The rest of the bank
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          {TAIL_CHAPTERS.length === 1 ? "One chapter is" : `${TAIL_CHAPTERS.length} chapters are`} still on the paper
          but sets under {PLAYBOOK_LINE} questions a paper, so it has notes but no playbook. The{" "}
          {LEFT_CHAPTERS.length} chapters below it left the syllabus and are no longer set. They are listed so the{" "}
          {OVERVIEW.chapters}-chapter bank is accounted for; their past questions stay in the bank for anyone
          working through older papers.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Chapters outside the strands: the small chapter still on the paper and the chapters that left the
              syllabus, with total questions and the last year set
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{RECENT.label}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Last set</th>
              </tr>
            </thead>
            <tbody>
              {TAIL_CHAPTERS.map((t) => (
                <tr key={t.chapter} className="border-b">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium">
                    {t.notesHref ? (
                      <Link href={t.notesHref} className="underline-offset-4 hover:underline">
                        {t.name}
                      </Link>
                    ) : (
                      t.name
                    )}
                    <span className="mt-1 block font-serif text-xs font-normal leading-relaxed text-muted-foreground">
                      {t.summary}
                    </span>
                  </th>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.qCount}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.recentPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{lastSeen(t.chapter) ?? "—"}</td>
                </tr>
              ))}
              {LEFT_CHAPTERS.map((t) => (
                <tr key={t.chapter} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium text-muted-foreground">
                    {t.chapter}
                    <span className="mt-1 block text-xs font-normal">Left the syllabus</span>
                  </th>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.qCount}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.recentPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{lastSeen(t.chapter) ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          A few recent questions are still filed under chapters that left the syllabus. They are on live topics,
          such as salt analysis, so a &ldquo;last set&rdquo; year there does not mean the chapter is back.
        </p>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">Own the {calculate?.chapters.length ?? 0} Calculate chapters</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          They hold {calcPctOfNumeric}% of the numeric answers, the questions a guess cannot save. The other
          strands are mostly answered on sight once learned.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} chapterIds={calculateIds}>
            Drill the Calculate chapters
          </BrowseLink>
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} variant="outline">
            Browse all JEE Mains Chemistry
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: GUIDE_BASE, label: "Overview" }}
        next={{ href: `${GUIDE_BASE}/playbooks`, label: `Playbooks — ${PLAYBOOKS.length} chapter deep-dives` }}
      />
    </GuideShell>
  );
}
