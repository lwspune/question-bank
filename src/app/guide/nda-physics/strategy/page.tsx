import type { Metadata } from "next";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Clock,
  Flame,
  XCircle,
} from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-physics";
import {
  STRATEGY_HEADLINE,
  STRATEGY_STRANDS,
  TEST_DAY_PLAN,
  TIME_BUDGET,
  type DrillPosture,
  type StrandChapter,
} from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Physics Strategy — Recall, Apply, Reason",
  description:
    "Evidence-led NDA PART B Physics preparation: three skill strands (Recall vs Apply vs Reason) with a %HARD-aware tier overlay (drill all / cherry-pick / target HARD). Per-chapter must-drill subtopics, test-day attempt order, and a ~50-hour time-budget plan. Backed by 449 past-year questions across 18 papers.",
  alternates: { canonical: "/guide/nda-physics/strategy" },
};

const POSTURE_BADGE: Record<DrillPosture, { label: string; className: string }> = {
  "drill-all": {
    label: "Drill all subtopics",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  "drill-all-target-hard": {
    label: "Drill all + target HARD",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  "cherry-pick-easy-mod": {
    label: "Cherry-pick EASY+MOD",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  },
  skim: {
    label: "Skim — 15 min total",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300",
  },
};

export default async function NdaPhysicsStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Physics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
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

  return (
    <GuideShell
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-physics", label: "NDA Physics" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-physics/strategy"
        headline="NDA Physics Strategy — Recall, Apply, Reason"
        description="Evidence-led NDA PART B Physics preparation: three skill strands with a %HARD-aware tier overlay, per-chapter must-drill subtopics, test-day attempt order, and a ~50-hour time-budget plan."
      />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${STRATEGY_HEADLINE.targetMarks}+ in PART B Physics with ~50 hours`}
        subtitle={`${STRATEGY_HEADLINE.paperQ} PART B Physics questions × ${STRATEGY_HEADLINE.marksPerCorrect} marks − ${STRATEGY_HEADLINE.penaltyPerWrong} per wrong. Three skill strands with a %HARD-aware drill posture per chapter.`}
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
          PART B Physics has ~{STRATEGY_HEADLINE.paperQ} questions on the GAT
          (sometimes 20–28), each worth {STRATEGY_HEADLINE.marksPerCorrect}{" "}
          marks with{" "}
          <span className="font-medium text-foreground">
            −{STRATEGY_HEADLINE.penaltyPerWrong}
          </span>{" "}
          per wrong. To net {STRATEGY_HEADLINE.targetMarks}+ marks:
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
                <td className="px-3 py-2">20</td>
                <td className="px-3 py-2">15</td>
                <td className="px-3 py-2">5</td>
                <td className="px-3 py-2">~53</td>
                <td className="px-3 py-2 text-destructive">Miss</td>
              </tr>
              <tr className="border-b bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="px-3 py-2 font-medium">90%</td>
                <td className="px-3 py-2 font-medium">20</td>
                <td className="px-3 py-2 font-medium">18</td>
                <td className="px-3 py-2 font-medium">2</td>
                <td className="px-3 py-2 font-medium">~69</td>
                <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                  Close ✓
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">95%</td>
                <td className="px-3 py-2">22</td>
                <td className="px-3 py-2">21</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">~83</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">
                  Target ✓
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Target: attempt 20 questions at 90%+ accuracy. Skip the 5 you&rsquo;re
            unsure of.
          </span>{" "}
          The −1.33 penalty per wrong is harsher than NDA Maths&rsquo; −0.83 —
          skipping is strictly correct when you&rsquo;re below ~55% confident.
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

                    {c.targetHardSubtopics.length > 0 && (
                      <div className="mt-4 space-y-2 rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 p-3 dark:bg-amber-950/20">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                          <Flame className="h-3.5 w-3.5" aria-hidden /> HARD-target
                        </p>
                        <p className="font-serif text-xs leading-relaxed text-foreground/85">
                          These subtopics carry the chapter&rsquo;s HARD pool —
                          extra reps with a HARD-only drill filter pay off.
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
                                Drill HARD
                              </BrowseLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {c.skipSubtopics && c.skipSubtopics.length > 0 && (
                      <div className="mt-4 space-y-1.5">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <XCircle className="h-3.5 w-3.5" aria-hidden /> Skip
                        </p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {c.skipSubtopics.map((s) => (
                            <li key={s} className="line-through">
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

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
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Test-day plan */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Clock className="h-5 w-5 text-primary" aria-hidden />
          Test-day attempt order — for PART B Physics&rsquo;s 30-minute slot
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Bank Recall marks first (fast, high-confidence), then Apply, then
          Reason. Within the GAT 2-hour total, PART B Physics is ~30 min — this
          plan fits inside it.
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
              Skip is not failure on the Reason strand.
            </strong>{" "}
            A 5-min calorimetry problem you can&rsquo;t set up burns the budget
            for 4 confident Recall items. Banking 18 confident attempts beats
            25 mixed-confidence attempts.
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
                  {TIME_BUDGET.reduce((s, r) => s + r.hours, 0)}
                </td>
                <td className="px-3 py-2 font-serif font-medium">
                  Target: 70+ marks
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif leading-relaxed text-muted-foreground">
          That&rsquo;s about 7 weeks at 7 hours/week. The Apply strand takes
          the most hours because it spans 6 chapters; Reason has only 3
          chapters but the highest hours-per-chapter ratio because the HARD
          pool demands timed practice.
        </p>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with the Recall strand — guaranteed marks
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          79 questions across 5 chapters at 2% average HARD. Highest
          marks-per-hour in the bank — bank these before touching anything
          calculation-heavy.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={[
              taxonomy.chapters.get("Sound")?.id,
              taxonomy.chapters.get("Modern Physics")?.id,
              taxonomy.chapters.get("Units, Measurement and Dimensions")?.id,
              taxonomy.chapters.get("Astronomy and Space")?.id,
              taxonomy.chapters.get("Energy Sources")?.id,
            ].filter((id): id is string => Boolean(id))}
          >
            Drill the 79 Recall-strand questions
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            variant="outline"
          >
            Browse all NDA Physics
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-physics", label: "Overview" }}
        next={{
          href: "/guide/nda-physics/playbooks",
          label: "Playbooks — 14 chapter deep-dives",
        }}
      />
    </GuideShell>
  );
}
