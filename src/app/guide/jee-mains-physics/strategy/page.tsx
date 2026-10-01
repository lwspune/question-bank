import type { Metadata } from "next";
import Link from "next/link";
import { fitTitle } from "@/lib/seo/title";
import { Calculator, CheckCircle2, Clock, ListOrdered } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { EARLY, OVERVIEW, PAPER, RECENT } from "../_data/jee-mains-physics";
import {
  DROPPED_CHAPTERS,
  GUESS_RULE,
  NUMERIC_RULE,
  STRATEGY_HEADLINE,
  STRATEGY_TIERS,
  TIER_RULES,
  TIME_PLAN,
} from "../_data/strategy";
import { PLAYBOOKS } from "../_data/playbooks";
import { lastSeen } from "../_data/trends";
import { GUIDE_BASE, jeeGuideSideNav } from "../_data/nav";

export const revalidate = 86400;

const TITLE = "JEE Mains Physics Strategy — What to Learn First, What to Guess";
const DESCRIPTION = `JEE Mains Physics is ${PAPER.questions} questions at +${PAPER.marksPerCorrect} / −${PAPER.penaltyPerWrong}, on a clock shared with Chemistry and Maths. A blind MCQ guess pays on average and a blind numeric guess does not. Three tiers set by the ${RECENT.label} papers, with the subtopics to drill in each chapter, and a plan for the clock. Backed by ${OVERVIEW.totalQ.toLocaleString("en-IN")} past-year questions.`;

export const metadata: Metadata = {
  title: { absolute: fitTitle(TITLE) },
  description: DESCRIPTION,
  alternates: { canonical: `${GUIDE_BASE}/strategy` },
};

export default async function JeeMainsPhysicsStrategy() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "JEE Mains", "Physics");

  const h = STRATEGY_HEADLINE;
  const right = Math.round((h.targetAttempts * h.targetAccuracyPct) / 100);
  const wrong = h.targetAttempts - right;
  const left = h.paperQ - h.targetAttempts;

  const ruleLabel = (id: string) => {
    const r = TIER_RULES.find((x) => x.id === id);
    return r && r.minRecentPerPaper >= 1 ? `${r.minRecentPerPaper} or more a paper` : "under one a paper";
  };

  const cornerstone = STRATEGY_TIERS.find((t) => t.id === "cornerstone");
  const cornerstoneIds = (cornerstone?.chapters ?? [])
    .map((c) => taxonomy.chapters.get(c.chapter)?.id)
    .filter((id): id is string => Boolean(id));

  const stats = [
    { value: `${h.targetMarks}+`, label: `marks out of ${h.totalMarks}` },
    { value: `${h.targetAttempts}/${h.paperQ}`, label: "questions solved" },
    { value: `${h.targetAccuracyPct}%`, label: "accuracy on those" },
    { value: `~${h.durationMin} min`, label: "of the shared clock" },
  ];

  return (
    <GuideShell
      guideTitle="JEE Mains Physics Guide"
      sideNav={jeeGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Physics" },
        { label: "Strategy" },
      ]}
    >
      <GuideJsonLd type="Article" path={`${GUIDE_BASE}/strategy`} headline={TITLE} description={DESCRIPTION} />
      <GuideHero
        eyebrow="Strategy"
        title={`Score ${h.targetMarks}+ by learning the right chapters first`}
        subtitle={`${h.paperQ} questions × ${h.marksPerCorrect} marks = ${h.totalMarks}, with ${h.penaltyPerWrong} mark lost for each wrong answer, on a clock shared with Chemistry and Maths. Two decisions matter: which chapters to learn first, and on the day, which answers to guess and which to leave blank.`}
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
          {h.targetAttempts} solved questions at {h.targetAccuracyPct}% accuracy is {right} right and {wrong} wrong:{" "}
          {right} × {h.marksPerCorrect} − {wrong} ={" "}
          <span className="font-medium text-foreground">{right * h.marksPerCorrect - wrong * h.penaltyPerWrong} marks</span>.
          The other {left} are not simply left blank. Every multiple-choice question among them still gets an answer
          at the end, because a guess there is worth more than a blank:
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Expected marks from guessing a JEE Mains Physics question, by format and by options still in play
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
          <span className="font-medium text-foreground">So the formats split.</span> A numeric question is
          worth something only when you can finish it, which is why the chapters heavy in numeric answers need
          to be owned, not half-learned. A multiple-choice question is worth something even when you cannot,
          and more once one option is ruled out on sight.
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
          {PAPER.marksPerCorrect} marks. The plan below is a starting budget, not a measurement; adjust it from
          your own mock tests.
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

      {/* Tiers */}
      {STRATEGY_TIERS.map((tier) => {
        const share = tier.chapters.reduce((s, c) => s + c.recentPerPaper, 0);
        return (
          <section key={tier.id} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {tier.label} — {tier.chapters.length} chapters, {share.toFixed(1)} questions a paper
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Chapters setting {ruleLabel(tier.id)} on the {RECENT.label} papers.
            </p>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">{tier.pitch}</p>
            <div className="mt-4 rounded-md border-l-4 border-primary/60 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">The approach</p>
              <ul className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
                {tier.approach.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 space-y-4">
              {tier.chapters.map((c) => {
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
                          {EARLY.label} · {c.pctNumeric}% numeric
                        </p>
                      </div>
                      <Link
                        href={c.notesHref}
                        className="shrink-0 text-xs font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Notes
                        <span className="sr-only"> for {c.chapter}</span>
                      </Link>
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

      {/* Dropped chapters */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <ListOrdered className="h-5 w-5 text-primary" aria-hidden />
          The chapter that has left the paper
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Set no question on the {RECENT.label} papers, so there is no playbook for it. It is listed so the{" "}
          {OVERVIEW.chapters}-chapter bank is accounted for, and its notes stay up for anyone working through
          older papers.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Chapters with no question in {RECENT.label}: total questions, the last year set, and a note
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Last set</th>
              </tr>
            </thead>
            <tbody>
              {DROPPED_CHAPTERS.map((t) => (
                <tr key={t.chapter} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium">
                    <Link href={t.notesHref} className="underline-offset-4 hover:underline">
                      {t.name}
                    </Link>
                    <span className="mt-1 block font-serif text-xs font-normal leading-relaxed text-muted-foreground">
                      {t.summary}
                    </span>
                  </th>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{t.qCount}</td>
                  <td className="px-3 py-2 text-right align-top tabular-nums">{lastSeen(t.chapter) ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Primary CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Start with the {cornerstone?.chapters.length ?? 0} cornerstone chapters
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          They set{" "}
          {(cornerstone?.chapters ?? []).reduce((s, c) => s + c.recentPerPaper, 0).toFixed(1)} of the{" "}
          {PAPER.questions} questions on a recent paper. No good score is possible without them.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} chapterIds={cornerstoneIds}>
            Drill the cornerstone chapters
          </BrowseLink>
          <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} variant="outline">
            Browse all JEE Mains Physics
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
