import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { CHAPTER_TABLE, EARLY, OVERVIEW, PAPER, RECENT, ROUTES } from "./_data/jee-mains-chemistry";
import { PLAYBOOKS } from "./_data/playbooks";
import { REFERENCE_GROUPS } from "./_data/reference";
import {
  CHAPTER_NOTES,
  GUESS_RULE,
  LEFT_CHAPTERS,
  NUMERIC_RULE,
  STRATEGY_STRANDS,
  strandOfChapter,
} from "./_data/strategy";
import { GUIDE_BASE, jeeChemGuideSideNav } from "./_data/nav";

export const revalidate = 86400;

const STRAND_LABEL = {
  calculate: "Calculate",
  reactions: "Reactions",
  structure: "Structure",
  tail: "Small",
  left: "Left the syllabus",
} as const;

/** Each strand's share of a recent paper and of all the numeric answers. */
const STRAND_SUMMARY = STRATEGY_STRANDS.map((s) => {
  const perPaper = s.chapters.reduce((n, c) => n + c.recentPerPaper, 0);
  const numeric = s.chapters.reduce((n, c) => n + c.numeric, 0);
  return {
    id: s.id,
    label: s.label,
    pitch: s.pitch,
    chapters: s.chapters.length,
    perPaper,
    pctOfNumeric: Math.round((100 * numeric) / OVERVIEW.totalNumeric),
  };
});
const CALC = STRAND_SUMMARY.find((s) => s.id === "calculate")!;

const REFERENCE_ENTRIES = REFERENCE_GROUPS.reduce((n, g) => n + g.formulas.length, 0);

const DESCRIPTION = `How JEE Mains Chemistry actually works. A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of every shift from ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}: +4 for a right answer and −1 for a wrong one, three kinds of work (calculate, reactions, structure and recall), ${PLAYBOOKS.length} chapter playbooks, a reference sheet, trends and traps.`;

export const metadata: Metadata = {
  title: "JEE Mains Chemistry — Strategy Guide",
  description: DESCRIPTION,
  alternates: { canonical: GUIDE_BASE },
};

export default async function JeeMainsChemistryLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "JEE Mains", "Chemistry");

  const stats = [
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "Past-year questions" },
    { value: `${OVERVIEW.firstYear}–${OVERVIEW.lastYear}`, label: "Every shift" },
    { value: String(PLAYBOOKS.length), label: "Playbooks" },
    { value: `${OVERVIEW.pctNumeric}%`, label: "have a numeric answer" },
    { value: `${OVERVIEW.pctCalc}%`, label: "are calculations" },
  ];

  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  const cardClass =
    "group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const linkClass =
    "underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <GuideShell
      guideTitle="JEE Mains Chemistry Guide"
      sideNav={jeeChemGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { label: "Chemistry" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path={GUIDE_BASE}
        headline="JEE Mains Chemistry — Strategy Guide"
        description={DESCRIPTION}
      />
      <GuideHero
        eyebrow="JEE Mains Chemistry Guide"
        title="How JEE Mains Chemistry actually works"
        subtitle={`A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of every JEE Mains shift from ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}. ${PAPER.questions} Chemistry questions, +${PAPER.marksPerCorrect} for a right answer and −${PAPER.penaltyPerWrong} for a wrong one, on one clock shared with Physics and Maths. We sorted every chapter by the kind of work its questions ask for, and wrote ${PLAYBOOKS.length} chapter playbooks, a reference sheet, what moved since ${OVERVIEW.firstYear}, and the distractor traps.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} className="mt-2">
        Browse the full JEE Mains Chemistry bank
      </BrowseLink>

      {/* THE PAPER */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">The paper you are sitting</h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Chemistry is one of three sections in JEE Mains Paper 1. Since 2025 each section is {PAPER.mcq}{" "}
          multiple-choice and {PAPER.numeric} numeric-answer questions, all compulsory, set on a syllabus that
          dropped {LEFT_CHAPTERS.length} chapters. The {EARLY.label} papers printed ten numeric questions and asked
          for five, so older papers in the bank show more questions each.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-4">
          {[
            { label: "Questions", value: String(PAPER.questions), sub: `${PAPER.mcq} MCQ · ${PAPER.numeric} numeric` },
            { label: "Marks", value: String(PAPER.totalMarks), sub: `+${PAPER.marksPerCorrect} right · −${PAPER.penaltyPerWrong} wrong` },
            { label: "Clock", value: `${PAPER.sharedMinutes} min`, sub: "shared by all three subjects" },
            { label: "Suggested for Chemistry", value: `~${PAPER.suggestedMinutes} min`, sub: `${PAPER.minutesPerQuestion} min a question` },
          ].map((c) => (
            <div key={c.label} className="bg-card p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{c.value}</dd>
              <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </dl>

        <div className="mt-4 rounded-lg border border-brand-accent/40 bg-brand-accent/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Read this before anything else</p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
            The same −1 means opposite rules for the two formats
          </h3>
          <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <p>
              On a multiple-choice question a blind guess is right one time in four for +4 and wrong three times
              for −1 each, so it is worth something on average:
            </p>
            <ul className="space-y-1">
              {GUESS_RULE.map((g) => (
                <li key={g.optionsLeft}>
                  <strong className="font-semibold text-foreground">
                    {g.optionsLeft} options left: {g.expected}.
                  </strong>{" "}
                  {g.verdict}
                </li>
              ))}
            </ul>
            <p>
              <strong className="font-semibold text-foreground">A numeric answer guessed blind: {NUMERIC_RULE.expected}.</strong>{" "}
              {NUMERIC_RULE.verdict}
            </p>
          </div>
          <Link
            href={`${GUIDE_BASE}/strategy`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>The order to take the paper, and how to handle each format</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* THE HEADLINE FINDING */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Three kinds of work, not three tiers</h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every Chemistry chapter still on the paper sets one or two questions a paper, so ranking chapters by
          weight decides little. What differs is the work a question asks for. In the {CALC.chapters} physical
          chapters most questions are calculations, and they hold{" "}
          <strong className="font-semibold text-foreground">{CALC.pctOfNumeric}% of all the numeric answers</strong>.
          Everywhere else a question is answered by following a reaction or recalling a structure or fact.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {STRAND_SUMMARY.map((s) => (
            <li key={s.id} className="rounded-md border bg-card p-4">
              <p className="text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{s.perPaper.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">
                questions a paper · {s.chapters} chapters · {s.pctOfNumeric}% of numeric answers
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">{s.pitch}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CHAPTER TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions break down
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          All {OVERVIEW.chapters} chapters in the bank, heaviest on the recent papers first. A rate is the
          chapter&rsquo;s share of that window&rsquo;s questions, scaled to one {PAPER.questions}-question paper, so the
          early and recent columns compare even though the papers changed length. A calculation is a numeric
          answer or a multiple-choice question whose options are all numbers.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[900px] text-sm">
            <caption className="sr-only">
              JEE Mains Chemistry chapters by questions per paper in {RECENT.label} and {EARLY.label}, with the
              total questions, the share that are calculations and the strategy strand.
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{RECENT.label}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{EARLY.label}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">% calculation</th>
                <th scope="col" className="px-3 py-2 font-medium">Strand</th>
                <th scope="col" className="px-3 py-2 font-medium">What it asks</th>
              </tr>
            </thead>
            <tbody>
              {CHAPTER_TABLE.map((row) => (
                <tr key={row.chapter} className="border-b align-top last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium">
                    {row.notesHref ? (
                      <Link href={row.notesHref} className={linkClass}>
                        {row.chapter}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">{row.chapter}</span>
                    )}
                  </th>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">{row.recentPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.earlyPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.qCount}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.pctCalc}%</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">
                    {STRAND_LABEL[strandOfChapter(row.chapter)]}
                  </td>
                  <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    {CHAPTER_NOTES[row.chapter]?.summary ?? "Left the syllabus: no longer set."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {RECENT.label} is only two years of papers, so a small move in that column is noise. Chapter names link
          to the notes. The chapters that left the syllabus still show a few recent questions: those are questions
          on live topics, such as salt analysis, that were filed under the old chapter.
        </p>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What&rsquo;s inside</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sectionCards.map((r) => (
            <li key={r.slug}>
              <Link href={`${GUIDE_BASE}/${r.slug}`} className={cardClass}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">{r.label}</h3>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <p className="mt-1.5 font-serif text-sm leading-relaxed text-muted-foreground">{r.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          The reference sheet holds {REFERENCE_ENTRIES} entries across {REFERENCE_GROUPS.length} chapters.
        </p>
      </section>

      {/* NOTES CROSS-LINK */}
      <section className="mt-12 rounded-lg border bg-card p-5">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight">Want the teaching, not just the strategy?</h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
              This guide tells you what the paper asks and in what order to learn it. The notes teach each
              chapter: foundations, worked examples, self-checks, drills and a mastery check for every page. Every
              chapter still on the paper has notes; the {LEFT_CHAPTERS.length} that left the syllabus do not.
            </p>
            <Link
              href="/notes/jee-mains-chemistry"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>All JEE Mains Chemistry notes</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">Where the numbers come from</h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Every question from the {OVERVIEW.firstYear}–{OVERVIEW.lastYear} shifts is in the bank, tagged by
            chapter and subtopic. Click any &ldquo;Drill&rdquo; link and you see the exact questions a claim is
            about.
          </p>
          <p>
            The bank does not grade JEE questions by difficulty, so this guide sorts chapters by the kind of work
            their questions ask for, and shows each chapter&rsquo;s weight beside it.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data snapshot:{" "}
          {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
        </p>
      </section>

      <PrevNextNav next={{ href: `${GUIDE_BASE}/strategy`, label: "Strategy — the order to take the paper" }} />
    </GuideShell>
  );
}
