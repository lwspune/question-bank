import type { Metadata } from "next";
import { Calculator, Clock, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import ChapterCard, {
  SkipChapterRow,
} from "@/app/guide/_components/ChapterCard";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-maths";
import {
  DIFFICULTIES_EASY_MOD,
  SKIP_LIST,
  STRATEGY_HEADLINE,
  TEST_DAY_PLAN,
  TIER_A,
  TIER_B,
  TIME_BUDGET,
  type TierChapter,
} from "../_data/strategy";

export const metadata: Metadata = {
  title: "NDA Mathematics Strategy — Score 100+ in 50 hours",
  description:
    "Evidence-led NDA Maths preparation: which chapters to drill, which to skip, and how to attempt the paper. Backed by 1,320 past-year questions across 11 papers.",
  alternates: { canonical: "/guide/nda-maths/strategy" },
};

export default async function NdaMathsStrategy() {
  const supabase = createSupabaseServerClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Mathematics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
    label: r.label,
  }));

  const resolveTier = (tier: TierChapter[]) =>
    tier.map((c) => {
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

  const tierA = resolveTier(TIER_A);
  const tierB = resolveTier(TIER_B);

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
    { value: "~45 h", label: "total prep time" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda-maths", label: "NDA Mathematics" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-maths/strategy"
        headline="NDA Mathematics Strategy — Score 100+ in 50 hours"
        description="Evidence-led NDA Maths preparation: which chapters to drill, which to skip, and how to attempt the paper. Backed by 1,320 past-year questions across 11 papers."
      />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${STRATEGY_HEADLINE.targetMarks}+ in NDA Maths with 50 hours of focused prep`}
        subtitle={`${STRATEGY_HEADLINE.paperQ} questions × ${STRATEGY_HEADLINE.marksPerCorrect} marks − ${STRATEGY_HEADLINE.penaltyPerWrong} per wrong. Here's the math, then the chapters.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* SECTION 1 — The arithmetic */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Calculator className="h-5 w-5 text-primary" aria-hidden />
          The arithmetic of 100+
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          NDA Mathematics has {STRATEGY_HEADLINE.paperQ} questions worth{" "}
          {STRATEGY_HEADLINE.marksPerCorrect} marks each, with{" "}
          <span className="font-medium text-foreground">
            −{STRATEGY_HEADLINE.penaltyPerWrong}
          </span>{" "}
          per wrong answer. To net 100 marks you need{" "}
          <span className="font-medium text-foreground">
            (correct × 2.5) − (wrong × 0.83) ≥ 100
          </span>
          . Plug in realistic accuracy:
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
                <td className="px-3 py-2">80%</td>
                <td className="px-3 py-2">50</td>
                <td className="px-3 py-2">40</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">91.7</td>
                <td className="px-3 py-2 text-destructive">Miss</td>
              </tr>
              <tr className="border-b bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="px-3 py-2 font-medium">85%</td>
                <td className="px-3 py-2 font-medium">50</td>
                <td className="px-3 py-2 font-medium">42.5</td>
                <td className="px-3 py-2 font-medium">7.5</td>
                <td className="px-3 py-2 font-medium">~106</td>
                <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                  Target ✓
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">90%</td>
                <td className="px-3 py-2">47</td>
                <td className="px-3 py-2">42.3</td>
                <td className="px-3 py-2">4.7</td>
                <td className="px-3 py-2">~107</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">
                  Comfortable ✓
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Target: attempt 50 questions at ≥85% accuracy. Skip the other 70.
          </span>{" "}
          This means picking the right 50 chapters&rsquo; worth of preparation
          — not &ldquo;doing all 31 chapters&rdquo;. The data below tells you
          exactly which 50.
        </p>
      </section>

      {/* SECTION 2 — Tier A */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Target className="h-5 w-5 text-primary" aria-hidden />
          Tier A — the foundation (5 chapters, ~32 q/paper)
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Must-master, no skipping. These chapters share three properties: high
          q-count, high easy/moderate ratio, and reliable appearance every paper.
          Together they account for 311 questions (24% of the bank) and ~32
          questions per paper.
        </p>
        <div className="mt-6 space-y-4">
          {tierA.map((c, i) => (
            <ChapterCard
              key={c.chapter}
              rank={i + 1}
              chapter={c.chapter}
              qCount={c.qCount}
              pctEasy={c.pctEasy}
              pctHard={c.pctHard}
              expectedYieldPerPaper={c.expectedYieldPerPaper}
              studyHours={c.studyHours}
              summary={c.summary}
              drillSubtopics={c.drillSubtopics}
              skipSubtopics={c.skipSubtopics}
              chapterId={c.chapterId}
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3 — Tier B */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Tier B — selective drill (4 chapters, ~20 q/paper)
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Cover only the easier subtopics here. The hard subtopics in these
          chapters are time-sinks — leave them and pick up Tier A marks instead.
        </p>
        <div className="mt-6 space-y-4">
          {tierB.map((c, i) => (
            <ChapterCard
              key={c.chapter}
              rank={tierA.length + i + 1}
              chapter={c.chapter}
              qCount={c.qCount}
              pctEasy={c.pctEasy}
              pctHard={c.pctHard}
              expectedYieldPerPaper={c.expectedYieldPerPaper}
              studyHours={c.studyHours}
              summary={c.summary}
              drillSubtopics={c.drillSubtopics}
              skipSubtopics={c.skipSubtopics}
              chapterId={c.chapterId}
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
              defaultDifficulties={DIFFICULTIES_EASY_MOD}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4 — Skip list */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Skip list — 22 chapters
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          These chapters yield poor marks-per-hour. Browse them once for free
          wins on test day, but don&rsquo;t deep-study. The 9 Tier A+B chapters
          above give you the 50 attempts you need.
        </p>
        <ul className="mt-4 rounded-md border bg-card p-4">
          {SKIP_LIST.map((s) => (
            <SkipChapterRow key={s.chapter} {...s} />
          ))}
        </ul>
      </section>

      {/* SECTION 5 — Test-day plan */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          Test-day attempt order
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Don&rsquo;t go in paper order. Scan the entire paper, mark Tier A
          questions, then attack:
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
            Never attempt a question whose method you don&rsquo;t recognise in
            30 seconds.
          </strong>{" "}
          Three unlucky guesses wipe out a correct answer&rsquo;s worth of
          marks.
        </p>
      </section>

      {/* SECTION 6 — Time investment */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Time investment plan
        </h2>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Tier</th>
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
                  Target: 100–115 marks
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          That&rsquo;s roughly 6 weeks at 7 hours/week. Much less than the
          &ldquo;do everything&rdquo; approach — which typically takes 150+
          hours and still scores 80–100 because attention&rsquo;s spread too
          thin.
        </p>
      </section>

      {/* PRIMARY CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with Tier A — Statistics
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          Highest marks-per-hour. 4 hours, 7–8 marks expected per paper.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={
              taxonomy.chapters.get("Statistics")?.id
                ? [taxonomy.chapters.get("Statistics")!.id]
                : []
            }
          >
            Drill Statistics now
          </BrowseLink>
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} variant="outline">
            Browse all NDA Maths questions
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-maths", label: "Overview" }}
        next={{
          href: "/guide/nda-maths/principles",
          label: "Principles — 70 atoms behind every question",
        }}
      />
    </GuideShell>
  );
}
