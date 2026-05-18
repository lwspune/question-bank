import type { Metadata } from "next";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Clock,
} from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-geography";
import {
  STRATEGY_HEADLINE,
  STRATEGY_STRANDS,
  TEST_DAY_PLAN,
  TIME_BUDGET,
  type StrandChapter,
} from "../_data/strategy";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Geography Strategy — Recall, Apply, Verify",
  description:
    "Evidence-led NDA PART A Geography preparation: three skill strands (Recall vs Apply vs Verify) matched to the bank's actual shape. Per-chapter must-drill subtopics, test-day attempt order, and a ~40-hour time-budget plan. Backed by 345 past-year questions across 18 papers.",
  alternates: { canonical: "/guide/nda-geography/strategy" },
};

const STRAND_TONE = {
  recall:
    "border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/15",
  apply: "border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/15",
  verify: "border-blue-500/40 bg-blue-50/30 dark:bg-blue-950/15",
} as const;

export default async function NdaGeographyStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Geography");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-geography/${r.slug}` : "/guide/nda-geography",
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
    };
  };

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

  const totalHours = TIME_BUDGET.reduce((s, r) => s + r.hours, 0);

  return (
    <GuideShell
      guideTitle="NDA Geography Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-geography"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-geography", label: "NDA Geography" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-geography/strategy"
        headline="NDA Geography Strategy — Recall, Apply, Verify"
        description="Evidence-led NDA PART A Geography preparation: three skill strands matched to the bank's actual shape, per-chapter must-drill subtopics, test-day attempt order, and a ~40-hour time-budget plan."
      />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${STRATEGY_HEADLINE.targetMarks}+ in PART A Geography with ~${totalHours} hours`}
        subtitle={`${STRATEGY_HEADLINE.paperQ} PART A Geography questions × ${STRATEGY_HEADLINE.marksPerCorrect} marks − ${STRATEGY_HEADLINE.penaltyPerWrong} per wrong. Per-paper max ≈ ${STRATEGY_HEADLINE.totalMarks} marks. Three skill strands matched to the bank's actual shape (50% Recall, 38% Apply, 12% Verify by chapter grouping — the strand structure tracks which chapters lean each way).`}
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
          PART A Geography has ~{STRATEGY_HEADLINE.paperQ} questions on the
          GAT (range 17–21 across the 2017–2026 bank), each worth{" "}
          {STRATEGY_HEADLINE.marksPerCorrect} marks with{" "}
          <span className="font-medium text-foreground">
            −{STRATEGY_HEADLINE.penaltyPerWrong}
          </span>{" "}
          per wrong. Per-paper max ≈ {STRATEGY_HEADLINE.totalMarks} marks.
          To net {STRATEGY_HEADLINE.targetMarks}+ marks:
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
                <td className="px-3 py-2">12</td>
                <td className="px-3 py-2">9</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">~32</td>
                <td className="px-3 py-2 text-destructive">Miss</td>
              </tr>
              <tr className="border-b bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="px-3 py-2 font-medium">85%</td>
                <td className="px-3 py-2 font-medium">16</td>
                <td className="px-3 py-2 font-medium">14</td>
                <td className="px-3 py-2 font-medium">2</td>
                <td className="px-3 py-2 font-medium">~53</td>
                <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                  Target ✓
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">95%</td>
                <td className="px-3 py-2">17</td>
                <td className="px-3 py-2">16</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">~63</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">
                  Stretch ✓
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Target: attempt {STRATEGY_HEADLINE.targetAttempts} of ~{STRATEGY_HEADLINE.paperQ} questions at 85%+ accuracy. Skip
            the ~3 you&rsquo;re unsure of.
          </span>{" "}
          The −1.33 penalty is harsh — and Geography&rsquo;s named-fact
          density rewards &lsquo;know cold or skip&rsquo; more than guessing.
          If you don&rsquo;t recognise a state↔river or mineral↔state pair
          within 5 seconds, skip — the −1.33 makes guessing negative-EV at
          below ~55% confidence.
        </p>
      </section>

      {/* Skill strands */}
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
            <div className={`mt-4 rounded-md border-l-4 p-4 ${STRAND_TONE[strand.id]}`}>
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
              {resolved.map((c) => (
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
                  </header>

                  <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
                    {c.summary}
                  </p>

                  <div className="mt-4 space-y-2">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Drill
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
                            Drill
                          </BrowseLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
                    <span>
                      <span className="font-medium text-foreground">
                        {c.expectedYieldPerPaper}
                      </span>{" "}
                      per paper
                    </span>
                    <span>
                      <span className="font-medium text-foreground tabular-nums">
                        {c.studyHours}h
                      </span>{" "}
                      study time
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Test-day plan */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          Test-day attempt order — for PART A Geography&rsquo;s ~16-min slot
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Bank Recall marks first (fast, high-confidence), then Apply, then
          Verify last (slowest per attempt). Within the GAT 2.5-hour total
          (150 min for 150 q across English + 5 PART A sections + 5 PART B
          sections), PART A Geography&rsquo;s share is ~16 min for its ~19
          questions — this plan fits inside it.
        </p>
        <ol className="mt-6 space-y-4">
          {TEST_DAY_PLAN.map((phase, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex h-10 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                <span className="text-sm font-bold tabular-nums">
                  {phase.durationMin}
                </span>
                <span className="text-[10px] uppercase tracking-wide">
                  min
                </span>
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
        <p className="mt-4 flex items-start gap-2 rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 p-4 font-serif text-sm leading-relaxed text-foreground/90 dark:bg-amber-950/20">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
            aria-hidden
          />
          <span>
            <strong className="font-semibold text-foreground">
              Recognition speed &gt; knowledge depth.
            </strong>{" "}
            A 20-second pause on a state↔river question is fine; a 90-second
            pause is wasting your time budget. If you can&rsquo;t name a
            mineral&rsquo;s leading state within 10 seconds, skip — recall
            either fires fast or it doesn&rsquo;t fire at all.
          </span>
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
                <th className="px-3 py-2 font-medium">Strand</th>
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
                  {totalHours}
                </td>
                <td className="px-3 py-2 font-serif font-medium">
                  Target: {STRATEGY_HEADLINE.targetMarks}+ marks (of {STRATEGY_HEADLINE.totalMarks} max)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          That&rsquo;s about 5 weeks at 8 hours/week. The Recall strand gets
          the most hours (16h) because it&rsquo;s 3 chapters totaling 173 q
          and the marks-per-hour leader; /reference-tables active recall sits
          alongside Recall as a dedicated cross-chapter pass. Apply (Climatology
          + Earth&rsquo;s Structure = 131 q at 23% HARD) is the densest-HARD
          strand — don&rsquo;t skip the mechanism-tracing prep.
        </p>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with the Recall strand — highest marks-per-hour
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          173 questions across 3 chapters at 17% average HARD. The bank&rsquo;s
          marks-per-hour leader — bank these before touching anything else.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={[
              taxonomy.chapters.get("Indian Geography — Economy, Resources and Transport")?.id,
              taxonomy.chapters.get("Indian Geography — Physical Features")?.id,
              taxonomy.chapters.get("World and Human Geography")?.id,
            ].filter((id): id is string => Boolean(id))}
          >
            Drill the 173 Recall-strand questions
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            variant="outline"
          >
            Browse all NDA Geography
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-geography", label: "Overview" }}
        next={{
          href: "/guide/nda-geography/playbooks",
          label: "Playbooks — 7 chapter deep-dives",
        }}
      />
    </GuideShell>
  );
}
