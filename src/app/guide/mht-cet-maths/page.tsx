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
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { CHAPTER_TABLE, OVERVIEW, ROUTES } from "./_data/mht-cet-maths";
import { PLAYBOOKS, playbooksInBucket } from "./_data/playbooks";
import { FORMULA_STATS } from "./_data/formulas";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MHT-CET Mathematics — Strategy Guide",
  description:
    "How MHT-CET Maths actually works. A 2,228-question analysis of every shift from 2021 to 2025 — 50 questions in 90 minutes with no negative marking, six chapters carrying 47% of the paper, 22 chapter playbooks, formulas, trends and traps.",
  alternates: { canonical: "/guide/mht-cet-maths" },
};

/** Human-readable label for a non-"live" chapter status. Rendered as TEXT so
 *  the state is never carried by colour alone. */
const STATUS_LABEL = {
  live: "Live",
  dropped: "Dropped for 2025",
  entered: "New for 2025",
} as const;

export default async function MhtCetMathsLanding() {
  const supabase = createSupabaseAnonClient();
  // "Maths" is MHT-CET's subject literal — NOT "Mathematics" (that is NDA's).
  const taxonomy = await resolveTaxonomy(supabase, "MHT-CET", "Maths");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/mht-cet-maths/${r.slug}` : "/guide/mht-cet-maths",
    label: r.label,
  }));

  const { paper, difficulty } = OVERVIEW;

  const pct = (n: number) => ((n / OVERVIEW.totalQ) * 100).toFixed(1);

  // The headline finding, computed from the playbook catalog rather than
  // hard-coded: how much of a 50-question paper the cornerstone strand is.
  const cornerstones = playbooksInBucket("cornerstone");
  const cornerstoneQPerPaper = cornerstones.reduce(
    (s, p) => s + p.qPerPaper,
    0
  );
  const cornerstoneShare = (cornerstoneQPerPaper / paper.questions) * 100;

  // Chapters that also ship full teaching notes, derived from the live notes
  // registry (notes chapterSlug === playbook slug).
  const notedSlugs = new Set(
    getNotesChaptersForSubject("mht-cet-maths").map((c) => c.chapterSlug)
  );
  const notedPlaybooks = PLAYBOOKS.filter((p) => notedSlugs.has(p.slug));

  const stats = [
    {
      value: OVERVIEW.totalQ.toLocaleString("en-IN"),
      label: "Past-year questions",
    },
    { value: String(OVERVIEW.papers), label: "Shifts (2021–2025)" },
    { value: String(OVERVIEW.chapters), label: "Chapters" },
    { value: String(OVERVIEW.playbooks), label: "Playbooks" },
    { value: `${pct(difficulty.hard)}%`, label: "of the bank is HARD" },
  ];

  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  const cardClass =
    "group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <GuideShell
      guideTitle="MHT-CET Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { label: "Mathematics" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/mht-cet-maths"
        headline="MHT-CET Mathematics — Strategy Guide"
        description="A 2,228-question analysis of every MHT-CET Mathematics shift from 2021 to 2025. No negative marking, 1.8 minutes a question, 22 chapter playbooks, formulas, trends and traps."
      />
      <GuideHero
        eyebrow="MHT-CET Mathematics Guide"
        title="How MHT-CET Maths actually works"
        subtitle={`A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of every Mathematics shift from 2021 to 2025 — ${OVERVIEW.papers} papers in all. ${paper.questions} questions, ${paper.durationMinutes} minutes, and no negative marking, so the whole game is order and time rather than selection. We mapped the ${OVERVIEW.playbooks} chapter playbooks, the formulas, the year-on-year drift and the distractor traps.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink
        examId={taxonomy.examId}
        subjectId={taxonomy.subjectId}
        className="mt-2"
      >
        Browse the full MHT-CET Maths bank
      </BrowseLink>

      {/* THE PAPER — and the fact that inverts the usual advice */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The paper you are actually sitting
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          MHT-CET Paper I is Mathematics on its own. Everything below is that
          paper — not the Physics and Chemistry paper, which is scored
          differently.
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-4">
          <div className="bg-card p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Questions
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
              {paper.questions}
            </dd>
          </div>
          <div className="bg-card p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Marks
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
              {paper.totalMarks}
            </dd>
            <p className="mt-1 text-xs text-muted-foreground">
              {paper.marksPerQuestion} marks a question
            </p>
          </div>
          <div className="bg-card p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Duration
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
              {paper.durationMinutes} min
            </dd>
          </div>
          <div className="bg-card p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Per question
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
              {paper.minutesPerQuestion} min
            </dd>
          </div>
        </dl>

        <div className="mt-4 rounded-lg border border-brand-accent/40 bg-brand-accent/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
            Read this before anything else
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">
            MHT-CET Maths has NO negative marking
          </h3>
          <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <p>
              A wrong answer costs you nothing beyond the time you spent on
              it. That single fact inverts the advice most candidates carry in
              from other entrance exams: there is no attempt-versus-skip
              decision to make, because a blank and a wrong answer score
              exactly the same. Every one of the {paper.questions} questions
              gets an answer.
            </p>
            <p>
              So the binding constraint is not accuracy, it is the clock.{" "}
              {paper.durationMinutes} minutes across {paper.questions}{" "}
              questions is{" "}
              <strong className="font-semibold text-foreground">
                {paper.minutesPerQuestion} minutes per question
              </strong>{" "}
              — and {pct(difficulty.hard)}% of this bank is HARD. The decision
              you actually make, question by question, is the ORDER you take
              them in and how long you let one run before you commit an answer
              and move.
            </p>
          </div>
          <Link
            href="/guide/mht-cet-maths/strategy"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>How to order the paper</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          The difficulty split behind that: {difficulty.easy.toLocaleString("en-IN")}{" "}
          EASY ({pct(difficulty.easy)}%),{" "}
          {difficulty.moderate.toLocaleString("en-IN")} MODERATE (
          {pct(difficulty.moderate)}%) and{" "}
          {difficulty.hard.toLocaleString("en-IN")} HARD (
          {pct(difficulty.hard)}%) across the {OVERVIEW.totalQ.toLocaleString("en-IN")}{" "}
          questions. This is a dense paper and we would rather say so than sell
          you the subject.
        </p>
      </section>

      {/* THE HEADLINE FINDING */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Six chapters are {cornerstoneShare.toFixed(0)}% of the paper
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          On recent shifts (2024–2025) the {cornerstones.length} cornerstone
          chapters run to{" "}
          <strong className="font-semibold text-foreground">
            {cornerstoneQPerPaper.toFixed(1)} of the {paper.questions}{" "}
            questions
          </strong>{" "}
          — {cornerstoneShare.toFixed(0)}% of the paper. They are not the easy
          chapters; they are the ones you cannot afford to be slow in.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {cornerstones.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/guide/mht-cet-maths/playbooks/${p.slug}`}
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
          Weightage here is the RECENT rate (2024–2025 shifts), not a lifetime
          average — the two disagree, and the 2025 syllabus shift is why. See{" "}
          <Link
            href="/guide/mht-cet-maths/trends"
            className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Trends
          </Link>
          .
        </p>
      </section>

      {/* CHAPTER BREAKDOWN TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions break
          down
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          All {OVERVIEW.chapters} chapters tested across the {OVERVIEW.papers}{" "}
          shifts in the bank, sorted by questions per paper on recent shifts —
          not by lifetime count, because that is the number worth planning
          against. Two chapters carry a status: the 2025 syllabus shift moved
          them.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[860px] text-sm">
            <caption className="sr-only">
              MHT-CET Mathematics chapters by recent weightage, with lifetime
              question count, share of bank, percentage HARD and the subtopic
              split.
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  Chapter
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Q / paper
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Questions
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Share
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  % HARD
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Focus subtopics
                </th>
              </tr>
            </thead>
            <tbody>
              {CHAPTER_TABLE.map((row) => (
                <tr
                  key={row.chapter}
                  className="border-b align-top last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-3 py-2 text-left align-top font-medium"
                  >
                    {row.chapter}
                    {row.status && row.status !== "live" && (
                      <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-brand-accent">
                        {STATUS_LABEL[row.status]}
                      </span>
                    )}
                  </th>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">
                    {row.qPerPaper.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
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
                    {row.note && (
                      <p className="mt-2 border-l-2 border-brand-accent/50 pl-3 text-sm">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wide text-brand-accent">
                          {row.status ? STATUS_LABEL[row.status] : "Note"}:
                        </span>{" "}
                        {row.note}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          &ldquo;Q / paper&rdquo; is the rate on recent shifts (2024–2025);
          &ldquo;Questions&rdquo; and &ldquo;Share&rdquo; are lifetime figures
          across all {OVERVIEW.papers} shifts. Where the two disagree, the rate
          is the one to plan on. {OVERVIEW.playbooks} of these{" "}
          {OVERVIEW.chapters} chapters ship a full playbook; the rest are
          covered in the tail block on{" "}
          <Link
            href="/guide/mht-cet-maths/strategy"
            className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Strategy
          </Link>
          .
        </p>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          What&rsquo;s inside
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          {sectionCards.length} sections, each answering a different question a
          candidate walks in with. Read top-to-bottom or jump to what you need.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sectionCards.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/guide/mht-cet-maths/${r.slug}`}
                className={cardClass}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold tracking-tight">
                    {r.label}
                  </h3>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                </div>
                <p className="mt-1.5 font-serif text-sm leading-relaxed text-muted-foreground">
                  {r.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          The formula compendium indexes {FORMULA_STATS.formulas} formulas
          across {FORMULA_STATS.chapters} chapters.
        </p>
      </section>

      {/* CROSS-LINK TO /notes */}
      {notedPlaybooks.length > 0 && (
        <section className="mt-12 rounded-lg border bg-card p-5">
          <div className="flex items-start gap-3">
            <BookOpen
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
              aria-hidden
            />
            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight">
                Want the teaching, not just the strategy?
              </h2>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                This guide tells you what the exam asks and in what order to
                take it. The notes teach the chapter: foundations, worked
                examples, self-checks, drills and a per-subtopic mastery
                checkpoint. {notedPlaybooks.length} of the{" "}
                {OVERVIEW.playbooks} playbook chapters have full notes
                shipped —{" "}
                {notedPlaybooks.map((p, i) => (
                  <span key={p.slug}>
                    {i > 0 && (i === notedPlaybooks.length - 1 ? " and " : ", ")}
                    <Link
                      href={`/notes/mht-cet-maths/${p.slug}`}
                      className="font-medium text-brand-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {p.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
              <Link
                href="/notes/mht-cet-maths"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span>All MHT-CET Maths notes</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Why we built this
        </h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Most MHT-CET Maths prep splits two ways: a coaching-class lecture
            sequence that doesn&rsquo;t match the chapter weights, or a
            chapter-list grind with no sense of what the paper actually
            rewards. We&rsquo;ve done the third thing — pulled every question,
            tagged every subtopic, and looked at the patterns.
          </p>
          <p>
            Every claim on this page is verifiable. Click any &ldquo;Drill
            these N questions →&rdquo; link and you&rsquo;ll see the exact set
            we&rsquo;re talking about.
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

      <PrevNextNav
        next={{
          href: "/guide/mht-cet-maths/strategy",
          label: "Strategy — order and time, not selection",
        }}
      />
    </GuideShell>
  );
}
