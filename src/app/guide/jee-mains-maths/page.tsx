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
import { CHAPTER_TABLE, EARLY, OVERVIEW, PAPER, RECENT, ROUTES } from "./_data/jee-mains-maths";
import { PLAYBOOKS, playbooksInBucket } from "./_data/playbooks";
import { FORMULA_STATS } from "./_data/formulas";
import { CHAPTER_NOTES, GUESS_RULE, NUMERIC_RULE, tierOf } from "./_data/strategy";
import { GUIDE_BASE, jeeGuideSideNav } from "./_data/nav";

export const revalidate = 86400;

const CORNERSTONES = playbooksInBucket("cornerstone");
const CORNERSTONE_Q = CORNERSTONES.reduce((s, p) => s + p.recentPerPaper, 0);
const CORNERSTONE_PCT = Math.round((100 * CORNERSTONE_Q) / PAPER.questions);

const DESCRIPTION = `How JEE Mains Maths actually works. A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of every shift from ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}: +4 for a right answer and −1 for a wrong one on both formats, ${CORNERSTONES.length} chapters carrying ${CORNERSTONE_PCT}% of the paper, ${PLAYBOOKS.length} chapter playbooks, formulas, trends and traps.`;

export const metadata: Metadata = {
  title: "JEE Mains Mathematics — Strategy Guide",
  description: DESCRIPTION,
  alternates: { canonical: GUIDE_BASE },
};

const TIER_LABEL = { cornerstone: "Cornerstone", core: "Core", longtail: "Long tail", dropped: "Left the paper" } as const;

export default async function JeeMainsMathsLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "JEE Mains", "Maths");

  const cornerstones = CORNERSTONES;
  const top = cornerstones[0];

  const stats = [
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "Past-year questions" },
    { value: `${OVERVIEW.firstYear}–${OVERVIEW.lastYear}`, label: "Every shift" },
    { value: String(OVERVIEW.chapters), label: "Chapters" },
    { value: String(PLAYBOOKS.length), label: "Playbooks" },
    { value: `${OVERVIEW.pctNumeric}%`, label: "have a numeric answer" },
  ];

  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  const cardClass =
    "group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const linkClass =
    "underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <GuideShell
      guideTitle="JEE Mains Maths Guide"
      sideNav={jeeGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { label: "Mathematics" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path={GUIDE_BASE}
        headline="JEE Mains Mathematics — Strategy Guide"
        description={DESCRIPTION}
      />
      <GuideHero
        eyebrow="JEE Mains Mathematics Guide"
        title="How JEE Mains Maths actually works"
        subtitle={`A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of every JEE Mains shift from ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}. ${PAPER.questions} Maths questions, +${PAPER.marksPerCorrect} for a right answer and −${PAPER.penaltyPerWrong} for a wrong one, on one clock shared with Physics and Chemistry. We mapped which chapters the paper leans on now, the ${PLAYBOOKS.length} chapter playbooks, the formulas, what moved since ${OVERVIEW.firstYear}, and the distractor traps.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} className="mt-2">
        Browse the full JEE Mains Maths bank
      </BrowseLink>

      {/* THE PAPER */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">The paper you are sitting</h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Maths is one of three sections in JEE Mains Paper 1. Since 2025 each section is {PAPER.mcq}{" "}
          multiple-choice and {PAPER.numeric} numeric-answer questions, all compulsory. The {EARLY.label} papers
          printed ten numeric questions and asked for five, so older papers in the bank show more questions each.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-4">
          {[
            { label: "Questions", value: String(PAPER.questions), sub: `${PAPER.mcq} MCQ · ${PAPER.numeric} numeric` },
            { label: "Marks", value: String(PAPER.totalMarks), sub: `+${PAPER.marksPerCorrect} right · −${PAPER.penaltyPerWrong} wrong` },
            { label: "Clock", value: `${PAPER.sharedMinutes} min`, sub: "shared by all three subjects" },
            { label: "Suggested for Maths", value: `~${PAPER.suggestedMinutes} min`, sub: `${PAPER.minutesPerQuestion} min a question` },
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
            <span>What to learn first, and how to spend the clock</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* THE HEADLINE FINDING */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{cornerstones.length} chapters are {CORNERSTONE_PCT}% of the paper</h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          On the {RECENT.label} papers the {cornerstones.length} cornerstone chapters set{" "}
          <strong className="font-semibold text-foreground">
            {CORNERSTONE_Q.toFixed(1)} of the {PAPER.questions} questions
          </strong>{" "}
          on an average paper. {top.name} alone sets about one in {Math.round(PAPER.questions / top.recentPerPaper)}.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {cornerstones.map((p) => (
            <li key={p.slug}>
              <Link
                href={`${GUIDE_BASE}/playbooks/${p.slug}`}
                className="flex items-baseline justify-between gap-3 rounded-md border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="text-sm font-medium">{p.name}</span>
                <span className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
                  {p.recentPerPaper.toFixed(2)}/paper · {p.pctNumeric}% numeric
                </span>
              </Link>
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
          All {OVERVIEW.chapters} chapters, heaviest on the recent papers first. A rate is the chapter&rsquo;s
          share of that window&rsquo;s questions, scaled to one {PAPER.questions}-question paper, so the early
          and recent columns compare even though the papers changed length.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[860px] text-sm">
            <caption className="sr-only">
              JEE Mains Maths chapters by questions per paper in {RECENT.label} and {EARLY.label}, with the total
              questions, the share with a numeric answer and the strategy tier.
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{RECENT.label}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{EARLY.label}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">% numeric</th>
                <th scope="col" className="px-3 py-2 font-medium">Tier</th>
                <th scope="col" className="px-3 py-2 font-medium">What it asks</th>
              </tr>
            </thead>
            <tbody>
              {CHAPTER_TABLE.map((row) => (
                <tr key={row.chapter} className="border-b align-top last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium">
                    <Link href={row.notesHref} className={linkClass}>
                      {row.chapter}
                    </Link>
                  </th>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">{row.recentPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.earlyPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.qCount}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.pctNumeric}%</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{TIER_LABEL[tierOf(row.recentPerPaper)]}</td>
                  <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    {CHAPTER_NOTES[row.chapter]?.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {RECENT.label} is only two years of papers, so a small move in that column is noise. The chapter
          names link to the notes; the {OVERVIEW.excluded} questions dated before {OVERVIEW.firstYear} are left out
          of every rate.
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
          The formula sheet holds {FORMULA_STATS.formulas} formulas across {FORMULA_STATS.chapters} chapters.
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
              chapter: foundations, worked examples, self-checks, drills and a mastery check for every page. All{" "}
              {OVERVIEW.chapters} chapters have notes, including the ones that have left the paper.
            </p>
            <Link
              href="/notes/jee-mains-maths"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>All JEE Mains Maths notes</span>
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
            The bank does not grade JEE questions by difficulty, so this guide sets its tiers by weight alone:
            how many questions a chapter sets on the recent papers.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data snapshot:{" "}
          {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
        </p>
      </section>

      <PrevNextNav next={{ href: `${GUIDE_BASE}/strategy`, label: "Strategy — what to learn first" }} />
    </GuideShell>
  );
}
