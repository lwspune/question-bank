import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, FlaskConical, Languages, Leaf, NotebookPen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { CHAPTER_TABLE, OVERVIEW, ROUTES } from "./_data/nda-maths";

/** Pages with full content as of this commit. Other section cards get a
 * "Coming soon" tag so readers know what to expect. */
const LIVE_SLUGS = new Set([
  "strategy",
  "principles",
  "compound-tricks",
  "trends",
  "traps",
]);

export const metadata: Metadata = {
  title: "NDA Mathematics — Strategy Guide",
  description:
    "How NDA Mathematics actually works. A 2,160-question analysis of the 2017–2026 papers — principles, strategy, traps, and how to score 100+.",
  alternates: { canonical: "/guide/nda-maths" },
};

export default function NdaMathsLanding() {
  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
    label: r.label,
  }));

  const stats = [
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "Past-year questions" },
    { value: String(OVERVIEW.papers), label: "Papers (2017–2026)" },
    { value: String(OVERVIEW.chapters), label: "Chapters" },
    { value: String(OVERVIEW.principles), label: "Principle atoms" },
  ];

  // Skip the overview row for the inner-cards grid — that's this page.
  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { label: "NDA Mathematics" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-maths"
        headline="NDA Mathematics — Strategy Guide"
        description="A 2,160-question analysis of every NDA Maths paper from 2017 to 2026 — principles, strategy, traps, and how to score 100+."
      />
      <GuideHero
        eyebrow="NDA Mathematics Guide"
        title="How NDA Mathematics actually works"
        subtitle="A 2,160-question analysis of every paper from 2017 to 2026. We mapped the principles, the compound tricks, the year-on-year drift, and the distractor traps — so you can study what the exam actually tests, not what a textbook tells you to."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink examId={undefined} className="mt-2">
        Browse the full question bank
      </BrowseLink>

      {/* Cross-link to the NDA English guide — same NDA cohort, different
          subject; many readers prepping NDA want both. */}
      <Link
        href="/guide/nda-english"
        className="group mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
      >
        <Languages
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Also new: NDA English (GAT) strategy guide
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            16 chapter playbooks, 13 vocabulary families, 10-year drift, and
            distractor traps — across 900 GAT English questions, 2017–2026.
          </p>
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>

      {/* Cross-link to the NDA Physics guide — same NDA cohort, PART B Physics. */}
      <Link
        href="/guide/nda-physics"
        className="group mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
      >
        <Atom
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Also new: NDA PART B Physics strategy guide
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            14 chapter playbooks, 32-formula compendium, 10-year drift (paper
            hardened 22× per question), and distractor traps — across 449
            PART B Physics questions, 2017–2026.
          </p>
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>

      {/* Cross-link to the NDA Chemistry guide — same NDA cohort, PART B Chemistry. */}
      <Link
        href="/guide/nda-chemistry"
        className="group mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
      >
        <FlaskConical
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Also new: NDA PART B Chemistry strategy guide
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            12 chapter playbooks, 50-compound name↔formula reference,
            Recall/Rule/Calculate strands, and the trap shapes NDA reuses —
            across 262 PART B Chemistry questions, 2017–2026.
          </p>
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>

      {/* Cross-link to the NDA Biology guide — same NDA cohort, PART B Biology. */}
      <Link
        href="/guide/nda-biology"
        className="group mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
      >
        <Leaf
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            Also new: NDA PART B Biology strategy guide
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            9 chapter playbooks, 50-fact reference (diseases ↔ pathogens,
            vitamins ↔ deficiencies, hormones ↔ glands, scientists ↔
            discoveries), Recall/Apply/Verify strands — across 190 PART B
            Biology questions, 2017–2026.
          </p>
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>

      {/* Cross-link to teaching notes — students who land here looking for
          strategy often want chapter-deep teaching content too. */}
      <Link
        href="/notes/nda-maths/statistics"
        className="group mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
      >
        <NotebookPen
          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
          aria-hidden
        />
        <div className="flex-1">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            New: NDA Maths Statistics teaching notes
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
            21 concept units across 4 subtopics — intuition, formulas,
            worked examples, and per-concept drill links. Built for the
            digital board and student self-study.
          </p>
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>

      {/* CHAPTER BREAKDOWN TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions break down
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          All 31 chapters tested in NDA Mathematics, sized by question count
          across the 2017–2026 bank. Focus column names the top 1–2 subtopics
          to drill within each chapter. Sorted by share of bank.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Chapter</th>
                <th className="px-3 py-2 text-right font-medium">Questions</th>
                <th className="px-3 py-2 text-right font-medium">Share</th>
                <th className="px-3 py-2 text-right font-medium">% HARD</th>
                <th className="px-3 py-2 font-medium">Focus topics</th>
              </tr>
            </thead>
            <tbody>
              {CHAPTER_TABLE.map((row) => (
                <tr key={row.chapter} className="border-b last:border-b-0 align-top">
                  <td className="px-3 py-2 font-medium">{row.chapter}</td>
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

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          What&rsquo;s inside
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          Five sections, each answering a different question a student walks
          in with. Read top-to-bottom or jump to what you need.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sectionCards.map((r) => {
            const href = `/guide/nda-maths/${r.slug}`;
            const isLive = LIVE_SLUGS.has(r.slug);
            return (
              <li key={r.slug}>
                <Link
                  href={href}
                  className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight">
                        {r.label}
                      </h3>
                      {!isLive && (
                        <span className="inline-flex items-center rounded-full border border-dashed bg-muted/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </div>
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
            );
          })}
        </ul>
      </section>

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Why we built this
        </h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Most NDA Maths preparation is generic — practice everything,
            hope something sticks. We took the opposite approach: we
            extracted every question from every paper since 2021, classified
            them by the underlying principle, and looked at the patterns.
          </p>
          <p>
            Every claim on this site is verifiable. Click any &ldquo;Drill these
            X questions →&rdquo; link and you&rsquo;ll see the exact set we&rsquo;re
            talking about.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data snapshot: {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
          {" "}Numbers refresh as new papers land.
        </p>
      </section>

      <PrevNextNav
        next={{
          href: "/guide/nda-maths/strategy",
          label: "Strategy — Score 100+ in 50 hours",
        }}
      />
    </GuideShell>
  );
}
