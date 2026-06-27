import type { Metadata } from "next";
import { Info, TrendingUp } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import {
  OVERVIEW,
  SUBTOPIC_TABLE,
  FIVE_YEAR_PLANS,
  POST_PLAN_NOTE,
} from "./_data/nda-economics";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Economics — Strategy Guide",
  description:
    "How NDA Economics actually works. A 24-question analysis of every paper from 2017 to 2026 — Five Year Plans dominate (75% of bank), schemes and trade are thin. The honest stance, the Plan timeline reference, and a single drill link to the full bank.",
  alternates: { canonical: "/guide/nda-economics" },
};

export default async function NdaEconomicsLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Economics");

  const stats = [
    {
      value: OVERVIEW.totalQ.toLocaleString("en-IN"),
      label: "Past-year questions",
    },
    {
      value: `~${OVERVIEW.avgQPerPaper}`,
      label: "Q per paper (avg)",
    },
    {
      value: `~${OVERVIEW.maxMarksPerPaper}`,
      label: "Max marks per paper",
    },
    {
      value: `${OVERVIEW.pctHard}%`,
      label: "% HARD bank-wide",
    },
  ];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/guide/nda-economics"
          headline="NDA Economics — Strategy Guide"
          description="A 24-question analysis of NDA Economics across every paper 2017–2026. Five Year Plans dominate at 75% of the bank; schemes and trade are thin and current-affairs-heavy. The Plan timeline + an honest strategic cap on a single page."
        />

        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/" className="hover:text-foreground">
                Home
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>›</span>
              <a href="/guide" className="hover:text-foreground">
                Guides
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>›</span>
              <a href="/guide/nda" className="hover:text-foreground">
                NDA
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>›</span>
              <span className="font-medium text-foreground">NDA Economics</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 sm:mt-8">
          <GuideHero
            eyebrow="NDA Economics Guide"
            title="How NDA Economics actually works"
            subtitle={`A ${OVERVIEW.totalQ}-question analysis of NDA Economics across every paper from 2017 to 2026. The smallest GAT topic — about ${OVERVIEW.avgQPerPaper} questions per paper, ${OVERVIEW.maxMarksPerPaper} marks at most. We mapped the bank so you can prep proportionally: drill the Five Year Plan timeline, accept the cap, move on.`}
          >
            <StatBlock stats={stats} />
          </GuideHero>
        </div>

        <BrowseLink
          examId={taxonomy.examId}
          subjectId={taxonomy.subjectId}
          className="mt-2"
        >
          Drill all {OVERVIEW.totalQ} NDA Economics questions
        </BrowseLink>

        {/* HONEST STRATEGIC STANCE */}
        <section className="mt-10 rounded-lg border bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <TrendingUp className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight">
                The honest stance
              </h2>
              <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
                <p>
                  NDA Economics contributes about{" "}
                  <strong className="text-foreground">
                    {OVERVIEW.maxMarksPerPaper} marks of the 600-mark GAT
                  </strong>{" "}
                  ({OVERVIEW.avgQPerPaper} q/paper × 4 marks). Even at 100%
                  accuracy on every question, the upside is ~6 marks per paper
                  — about 1% of the GAT total.
                </p>
                <p>
                  So we&rsquo;re not going to build you a 5-section strategy
                  guide. There&rsquo;s no cross-chapter principles axis (only
                  1 chapter), no playbook tier (only 3 subtopics), no
                  meaningful trend signal (1.5 q/paper is noise). With{" "}
                  <strong className="text-foreground">
                    {OVERVIEW.pctHard}% HARD bank-wide
                  </strong>{" "}
                  — the densest of any NDA subject — the questions are also
                  harder than they look.
                </p>
                <p>
                  <strong className="text-foreground">What works:</strong>{" "}
                  internalise the Five Year Plans timeline below (75% of the
                  bank), drill all {OVERVIEW.totalQ} questions once, and aim
                  for 3–4 marks consistently. Spend the time you save on the
                  larger PART A sections (Geography 76 max, History 56 max,
                  Polity 20 max).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC TABLE */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            How the {OVERVIEW.totalQ} questions break down
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
            All 3 subtopics tested under the single Indian Economy chapter,
            sized by question count across the 2017–2026 bank. Five Year Plans
            and Indian Planning is overwhelmingly the lever; everything else
            is thin and largely current-affairs-spillover.
          </p>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Subtopic</th>
                  <th className="px-3 py-2 text-right font-medium">
                    Questions
                  </th>
                  <th className="px-3 py-2 text-right font-medium">Share</th>
                  <th className="px-3 py-2 text-right font-medium">% HARD</th>
                  <th className="px-3 py-2 font-medium">What it tests</th>
                </tr>
              </thead>
              <tbody>
                {SUBTOPIC_TABLE.map((row) => (
                  <tr
                    key={row.subtopic}
                    className="border-b align-top last:border-b-0"
                  >
                    <td className="px-3 py-2 font-medium">{row.subtopic}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.qCount}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {row.pctTotal.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {row.pctHard}%
                    </td>
                    <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
                      {row.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FIVE YEAR PLANS TIMELINE — THE RECALL ANCHOR */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            The Five Year Plans — 1951 to 2017
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
            Twelve Plans across 66 years, with three inter-Plan gaps (Plan
            Holiday 1966–69, Rolling Plan 1978–80, Annual Plans 1990–92). NDA
            tests pairings — Plan ↔ objective, Plan ↔ year range, Plan ↔
            strategist (Mahalanobis), Plan ↔ event (LPG reforms,
            Garibi Hatao, Twenty-Point Programme). Drill this table the
            morning of the exam.
          </p>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Period</th>
                  <th className="px-3 py-2 font-medium">Years</th>
                  <th className="px-3 py-2 font-medium">Tagline / objective</th>
                  <th className="px-3 py-2 font-medium">Strategic emphasis</th>
                </tr>
              </thead>
              <tbody>
                {FIVE_YEAR_PLANS.map((row) => (
                  <tr
                    key={`${row.label}-${row.years}`}
                    className={
                      "border-b align-top last:border-b-0 " +
                      (row.plan === null ? "bg-muted/20" : "")
                    }
                  >
                    <td className="px-3 py-2 font-medium">{row.label}</td>
                    <td className="px-3 py-2 tabular-nums text-muted-foreground">
                      {row.years}
                    </td>
                    <td className="px-3 py-2 font-serif text-sm leading-relaxed">
                      {row.tagline}
                    </td>
                    <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
                      {row.emphasis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-md border bg-muted/30 p-4">
            <div className="flex items-start gap-2">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">
                  Post-{POST_PLAN_NOTE.year}:
                </strong>{" "}
                {POST_PLAN_NOTE.body}
              </p>
            </div>
          </div>
        </section>

        {/* WHAT TO DO ON EXAM DAY */}
        <section className="mt-12 rounded-lg border bg-muted/30 p-5">
          <h2 className="text-base font-semibold tracking-tight">
            What to do on exam day
          </h2>
          <ol className="mt-3 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Attempt the easy 1.</strong>{" "}
              Most papers carry one Plan-recall question that&rsquo;s directly
              answerable from the timeline above. Take it.
            </li>
            <li>
              <strong className="text-foreground">
                Be cautious on the second.
              </strong>{" "}
              If a question is multi-statement or asks for a specific 12th
              Plan target / Nehru–Mahalanobis component, judge each statement
              independently and use elimination — 41.7% HARD means distractors
              are engineered.
            </li>
            <li>
              <strong className="text-foreground">
                Skip current-affairs spillover.
              </strong>{" "}
              ODI rankings, FDI percentages, named-scheme sub-missions — these
              age out fast and the bank&rsquo;s only 6 examples. If the stem
              quotes a specific year/policy you don&rsquo;t recognise,
              don&rsquo;t guess.
            </li>
            <li>
              <strong className="text-foreground">
                Target 3–4 of {OVERVIEW.maxMarksPerPaper} marks.
              </strong>{" "}
              Don&rsquo;t let a hard Economics question pull your time away
              from a Geography Apply chapter where 4 marks are sitting
              ungrabbed.
            </li>
          </ol>
        </section>

        {/* DRILL CTA */}
        <section className="mt-12">
          <h2 className="text-base font-semibold tracking-tight">
            Drill the bank
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            One pass through all 24 questions is enough — the bank is small
            and the recall doesn&rsquo;t compound. Bookmark the timeline
            above and come back to it the morning of the exam.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
            >
              Drill all {OVERVIEW.totalQ} questions
            </BrowseLink>
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
              difficulties={["HARD"]}
              variant="outline"
            >
              Drill the {OVERVIEW.difficulty.hard} HARD only
            </BrowseLink>
          </div>
        </section>

        {/* WHY WE BUILT THIS */}
        <section className="mt-12 rounded-lg border bg-card p-5">
          <h2 className="text-base font-semibold tracking-tight">
            Why this guide is one page
          </h2>
          <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <p>
              The other NDA guides on this site are 10–22 indexable pages
              each — strategy, playbooks, references, trends, traps — because
              each subject has enough bank shape to support that structure.
              NDA Economics doesn&rsquo;t.
            </p>
            <p>
              With {OVERVIEW.totalQ} questions in {OVERVIEW.chapters} chapter
              and {OVERVIEW.subtopics} subtopics, a multi-route guide would be
              padding. So we put the recall anchor (the Plan timeline) and
              the strategic cap (~{OVERVIEW.maxMarksPerPaper} marks/paper) on
              one page and let the /browse filters carry the drill workflow.
              Honest is better than thorough.
            </p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Data snapshot:{" "}
            {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Numbers refresh as new papers land.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
