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
import { CHAPTER_TABLE, OVERVIEW, ROUTES } from "./_data/cds-maths";
import { PLAYBOOKS, playbooksInBucket } from "./_data/playbooks";
import { FORMULA_STATS } from "./_data/formulas";
import { GUESS_RULE } from "./_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "CDS Elementary Mathematics — Strategy Guide",
  description:
    "How CDS Maths actually works. A 2,096-question analysis of 21 papers from 2016 to 2026 — 100 questions in 120 minutes with a third of a mark lost per wrong answer, five chapters carrying nearly half the paper, 22 chapter playbooks, formulas, trends and traps.",
  alternates: { canonical: "/guide/cds-maths" },
};

export default async function CdsMathsLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "CDS", "Mathematics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths",
    label: r.label,
  }));

  const { paper, difficulty } = OVERVIEW;
  const pct = (n: number) => ((n / OVERVIEW.totalQ) * 100).toFixed(1);

  // The headline finding, computed from the playbooks rather than typed.
  const cornerstones = playbooksInBucket("cornerstone");
  const cornerstoneQPerPaper = cornerstones.reduce((s, p) => s + p.qPerPaper, 0);

  const stats = [
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "Past-year questions" },
    { value: String(OVERVIEW.papers), label: "Papers (2016–2026)" },
    { value: String(OVERVIEW.chapters), label: "Chapters" },
    { value: String(OVERVIEW.playbooks), label: "Playbooks" },
    { value: `${pct(difficulty.hard)}%`, label: "of the bank is HARD" },
  ];

  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  const cardClass =
    "group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const linkClass =
    "underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <GuideShell
      guideTitle="CDS Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/cds-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/cds", label: "CDS" },
        { label: "Mathematics" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/cds-maths"
        headline="CDS Elementary Mathematics — Strategy Guide"
        description="A 2,096-question analysis of 21 CDS Elementary Mathematics papers from 2016 to 2026. A third of a mark lost per wrong answer, 1.2 minutes a question, 22 chapter playbooks, formulas, trends and traps."
      />
      <GuideHero
        eyebrow="CDS Elementary Mathematics Guide"
        title="How CDS Maths actually works"
        subtitle={`A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of every CDS Elementary Mathematics paper from 2016 II to 2026 II — ${OVERVIEW.papers} papers in all. ${paper.questions} questions, ${paper.durationMinutes} minutes, and a third of a mark lost for each wrong answer, so the decision on every question is whether to attempt it. We mapped the ${OVERVIEW.playbooks} chapter playbooks, the formulas, what moved over ten years, and the distractor traps.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink examId={taxonomy.examId} subjectId={taxonomy.subjectId} className="mt-2">
        Browse the full CDS Maths bank
      </BrowseLink>

      {/* THE PAPER */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">The paper you are sitting</h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Elementary Mathematics is one of the three CDS papers, alongside English and General Knowledge
          (OTA candidates sit only those two). Everything below is the Maths paper.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-4">
          {[
            { label: "Questions", value: String(paper.questions) },
            { label: "Marks", value: String(paper.totalMarks), sub: `${paper.marksPerQuestion} mark a question` },
            { label: "Duration", value: `${paper.durationMinutes} min` },
            { label: "Per question", value: `${paper.minutesPerQuestion} min` },
          ].map((c) => (
            <div key={c.label} className="bg-card p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{c.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{c.value}</dd>
              {c.sub && <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>}
            </div>
          ))}
        </dl>

        <div className="mt-4 rounded-lg border border-brand-accent/40 bg-brand-accent/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">Read this before anything else</p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
            A wrong answer costs a third of a mark
          </h3>
          <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <p>
              That makes a blind guess among four options worth nothing on average: right one time in four
              for +1, wrong three times for −1/3 each. Rule out one option first and the same guess is worth
              something. This is the whole guessing rule:
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
              And the clock is tight: {paper.durationMinutes} minutes for {paper.questions} questions is{" "}
              <strong className="font-semibold text-foreground">{paper.minutesPerQuestion} minutes a question</strong>,
              and {pct(difficulty.hard)}% of the bank is HARD.
            </p>
          </div>
          <Link
            href="/guide/cds-maths/strategy"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>What to attempt, and in what order</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          The difficulty split: {difficulty.easy.toLocaleString("en-IN")} EASY ({pct(difficulty.easy)}%),{" "}
          {difficulty.moderate.toLocaleString("en-IN")} MODERATE ({pct(difficulty.moderate)}%) and{" "}
          {difficulty.hard.toLocaleString("en-IN")} HARD ({pct(difficulty.hard)}%) across the{" "}
          {OVERVIEW.totalQ.toLocaleString("en-IN")} questions.
        </p>
      </section>

      {/* THE HEADLINE FINDING */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Five chapters are nearly half the paper
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Across all {OVERVIEW.papers} papers the {cornerstones.length} cornerstone chapters average{" "}
          <strong className="font-semibold text-foreground">
            {cornerstoneQPerPaper.toFixed(1)} of the {paper.questions} questions
          </strong>
          . No score is possible without them.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {cornerstones.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/guide/cds-maths/playbooks/${p.slug}`}
                className="flex items-baseline justify-between gap-3 rounded-md border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="text-sm font-medium">{p.name}</span>
                <span className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
                  {p.qPerPaper.toFixed(2)}/paper · {p.pctHard}% HARD
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          These are lifetime rates. Trigonometry and Number System have each risen to 13 a paper on
          2024–2026 papers; see{" "}
          <Link href="/guide/cds-maths/trends" className={linkClass}>
            Trends
          </Link>
          .
        </p>
      </section>

      {/* CHAPTER TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions break down
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          All {OVERVIEW.chapters} chapters across the {OVERVIEW.papers} papers, heaviest first, with the
          rate in the early and recent papers beside the lifetime one.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[920px] text-sm">
            <caption className="sr-only">
              CDS Elementary Mathematics chapters by lifetime weight, with questions per paper in 2016–2020
              and 2024–2026, percentage HARD and the subtopic split.
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Q / paper</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">2016–20</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">2024–26</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">% HARD</th>
                <th scope="col" className="px-3 py-2 font-medium">Subtopics</th>
              </tr>
            </thead>
            <tbody>
              {CHAPTER_TABLE.map((row) => (
                <tr key={row.chapter} className="border-b align-top last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left align-top font-medium">{row.chapter}</th>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">{row.qPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.earlyPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.recentPerPaper.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.qCount}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{row.pctHard}%</td>
                  <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          &ldquo;Q / paper&rdquo; is over all {OVERVIEW.papers} papers; 2016–20 is nine papers and 2024–26 six,
          so a small move in the recent column is noise. {OVERVIEW.playbooks} chapters ship a playbook; the
          four smallest are covered on{" "}
          <Link href="/guide/cds-maths/strategy" className={linkClass}>
            Strategy
          </Link>
          .
        </p>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What&rsquo;s inside</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sectionCards.map((r) => (
            <li key={r.slug}>
              <Link href={`/guide/cds-maths/${r.slug}`} className={cardClass}>
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

      {/* NOTES CROSS-LINK — every CDS Maths chapter ships notes */}
      <section className="mt-12 rounded-lg border bg-card p-5">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" aria-hidden />
          <div className="min-w-0">
            <h2 className="text-base font-semibold tracking-tight">Want the teaching, not just the strategy?</h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
              This guide tells you what the paper asks and in what order to take it. The notes teach each
              chapter: foundations, worked examples, self-checks, drills and a mastery check for every
              subtopic. All {PLAYBOOKS.length} playbook chapters have notes, and so do the four small ones.
            </p>
            <Link
              href="/notes/cds-maths"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>All CDS Maths notes</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">Where the numbers come from</h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Every question from the {OVERVIEW.papers} papers is in the bank, tagged by chapter, subtopic and
            difficulty. Click any &ldquo;Drill&rdquo; link and you see the exact questions a claim is about.
          </p>
          <p>
            UPSC published no answer key for CDS Maths before 2026 II, so the answers to earlier papers were
            worked out by our team; 2026 II uses UPSC&rsquo;s provisional key.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data snapshot:{" "}
          {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
        </p>
      </section>

      <PrevNextNav next={{ href: "/guide/cds-maths/strategy", label: "Strategy — what to attempt" }} />
    </GuideShell>
  );
}
