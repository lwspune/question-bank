import type { Metadata } from "next";
import { Calculator, Clock } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import ChapterCard from "@/app/guide/_components/ChapterCard";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-english";
import {
  DIFFICULTIES_EASY_MOD,
  STRATEGY_BUCKETS,
  STRATEGY_HEADLINE,
  TEST_DAY_PLAN,
  TIME_BUDGET,
  type BucketChapter,
} from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA English Strategy — Recall, Rule, Reason",
  description:
    "Evidence-led NDA English (GAT) preparation: three skill buckets (Recall vs Rule vs Reason), per-chapter must-drill subtopics, test-day attempt order, and a 48-hour time-budget plan. Backed by 900 past-year questions across 18 papers.",
  alternates: { canonical: "/guide/nda-english/strategy" },
};

export default async function NdaEnglishStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "English");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-english/${r.slug}` : "/guide/nda-english",
    label: r.label,
  }));

  const resolveBucket = (chapters: BucketChapter[]) =>
    chapters.map((c) => {
      const chap = taxonomy.chapters.get(c.chapter);
      return {
        ...c,
        chapterId: chap?.id,
        drillSubtopics: c.mustDrill.map((name) => ({
          name,
          id: chap?.subtopics.get(name),
        })),
      };
    });

  const stats = [
    {
      value: `${STRATEGY_HEADLINE.targetMarks}+`,
      label: `marks out of ${STRATEGY_HEADLINE.totalMarks}`,
    },
    {
      value: `${STRATEGY_HEADLINE.targetAttempts}`,
      label: `attempts of ${STRATEGY_HEADLINE.paperQ}`,
    },
    {
      value: `${STRATEGY_HEADLINE.targetAccuracyPct}%`,
      label: "accuracy needed",
    },
    {
      value: `~${TIME_BUDGET.reduce((s, r) => s + r.hours, 0)} h`,
      label: "total prep time",
    },
  ];

  return (
    <GuideShell
      guideTitle="NDA English Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-english"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-english", label: "NDA English" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-english/strategy"
        headline="NDA English Strategy — Recall, Rule, Reason"
        description="Evidence-led NDA English preparation: three skill buckets, per-chapter must-drill subtopics, test-day attempt order, and a 48-hour time-budget plan."
      />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${STRATEGY_HEADLINE.targetMarks}+ in NDA English with ~48 hours of prep`}
        subtitle={`${STRATEGY_HEADLINE.paperQ} English questions × ${STRATEGY_HEADLINE.marksPerCorrect} marks − ${STRATEGY_HEADLINE.penaltyPerWrong} per wrong. Here's the math, then the three buckets.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The arithmetic */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Calculator className="h-5 w-5 text-primary" aria-hidden />
          The arithmetic of {STRATEGY_HEADLINE.targetMarks}+
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          NDA GAT&rsquo;s English half has {STRATEGY_HEADLINE.paperQ} questions
          worth {STRATEGY_HEADLINE.marksPerCorrect} marks each, with{" "}
          <span className="font-medium text-foreground">
            −{STRATEGY_HEADLINE.penaltyPerWrong}
          </span>{" "}
          per wrong. To net {STRATEGY_HEADLINE.targetMarks} marks you need:
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Accuracy</th>
                <th className="px-3 py-2 font-medium">Attempts</th>
                <th className="px-3 py-2 font-medium">Correct</th>
                <th className="px-3 py-2 font-medium">Wrong</th>
                <th className="px-3 py-2 font-medium">Net marks</th>
                <th className="px-3 py-2 font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              <tr className="border-b">
                <td className="px-3 py-2">75%</td>
                <td className="px-3 py-2">40</td>
                <td className="px-3 py-2">30</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">~107</td>
                <td className="px-3 py-2 text-destructive">Miss</td>
              </tr>
              <tr className="border-b bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="px-3 py-2 font-medium">85%</td>
                <td className="px-3 py-2 font-medium">40</td>
                <td className="px-3 py-2 font-medium">34</td>
                <td className="px-3 py-2 font-medium">6</td>
                <td className="px-3 py-2 font-medium">~128</td>
                <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                  Close ✓
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">90%</td>
                <td className="px-3 py-2">40</td>
                <td className="px-3 py-2">36</td>
                <td className="px-3 py-2">4</td>
                <td className="px-3 py-2">~139</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">
                  Target ✓
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Target: attempt 40 questions at ≥85% accuracy. Skip the 10
            you&rsquo;re unsure of.
          </span>{" "}
          The arithmetic for English is more forgiving than Maths&rsquo; — 4
          marks per correct vs 2.5, but a steeper 1.33-penalty per wrong, so
          accuracy still matters more than coverage.
        </p>
      </section>

      {/* Three buckets */}
      {STRATEGY_BUCKETS.map((bucket, idx) => {
        const resolved = resolveBucket(bucket.chapters);
        return (
          <section key={bucket.id} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {bucket.label}
            </h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
              {bucket.pitch}
            </p>
            <div className="mt-4 rounded-md border-l-4 border-primary/60 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                The approach
              </p>
              <ul className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
                {bucket.approach.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              {resolved.map((c, i) => (
                <ChapterCard
                  key={c.chapter}
                  rank={
                    STRATEGY_BUCKETS.slice(0, idx).reduce(
                      (s, b) => s + b.chapters.length,
                      0
                    ) +
                    i +
                    1
                  }
                  chapter={c.chapter}
                  qCount={c.qCount}
                  pctEasy={undefined}
                  pctHard={c.pctHard}
                  expectedYieldPerPaper={c.expectedYieldPerPaper}
                  studyHours={c.studyHours}
                  summary={c.summary}
                  drillSubtopics={c.drillSubtopics}
                  skipSubtopics={c.skipSubtopics}
                  chapterId={c.chapterId}
                  examId={taxonomy.examId}
                  subjectId={taxonomy.subjectId}
                  defaultDifficulties={
                    bucket.id === "reason" ? DIFFICULTIES_EASY_MOD : undefined
                  }
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Test-day plan */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          Test-day attempt order
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Bank Recall marks first (fast, high-confidence), then Rule, then
          Reason (slowest, context-heavy). Don&rsquo;t start with passages —
          they bleed time.
        </p>
        <ol className="mt-6 space-y-4">
          {TEST_DAY_PLAN.map((phase, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex h-10 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                <span className="text-sm font-bold tabular-nums">
                  {phase.durationMin}
                </span>
                <span className="text-[10px] uppercase tracking-wide">min</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{phase.label}</h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                  {phase.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-md border bg-muted/30 p-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            Never guess on Vocab or Idioms.
          </strong>{" "}
          The 1.33 penalty wipes out 33% of a correct answer. If you
          don&rsquo;t know the word, skip — don&rsquo;t pick.
        </p>
      </section>

      {/* Time budget */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Time investment plan
        </h2>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Bucket</th>
                <th className="px-3 py-2 text-right font-medium">Hours</th>
                <th className="px-3 py-2 font-medium">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {TIME_BUDGET.map((row) => (
                <tr key={row.label} className="border-b last:border-b-0">
                  <td className="px-3 py-2">{row.label}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {row.hours}
                  </td>
                  <td className="px-3 py-2 font-serif text-muted-foreground">
                    {row.outcome}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground/20 bg-muted/40">
                <td className="px-3 py-2 font-semibold">Total</td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">
                  {TIME_BUDGET.reduce((s, r) => s + r.hours, 0)}
                </td>
                <td className="px-3 py-2 font-serif font-medium">
                  Target: 130–140 marks
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          That&rsquo;s about 7 weeks at 7 hours/week. Recall takes the most
          hours because vocabulary breadth doesn&rsquo;t come fast — but
          it&rsquo;s also the most reliable bucket for marks-per-hour.
        </p>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with Vocabulary — the biggest bucket
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          316 questions in the bank, 12+ marks per paper, 12 hours of work.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={
              taxonomy.chapters.get("Vocabulary")?.id
                ? [taxonomy.chapters.get("Vocabulary")!.id]
                : []
            }
          >
            Drill Vocabulary now
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            variant="outline"
          >
            Browse all NDA English
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-english", label: "Overview" }}
        next={{
          href: "/guide/nda-english/playbooks",
          label: "Playbooks — 16 question types",
        }}
      />
    </GuideShell>
  );
}
