import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { CHAPTER_TABLE, OVERVIEW, ROUTES } from "./_data/nda-history";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA History — Strategy Guide",
  description:
    "How NDA PART A History actually works. A 260-question analysis of every paper from 2017 to 2026 — Cornerstone vs Foundation Recall vs Quick-Win strands, 4 chapter playbooks, ~95-entry timeline + named-pairs reference, and the trap shapes NDA reuses.",
  alternates: { canonical: "/guide/nda-history" },
};

export default async function NdaHistoryLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "History");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-history/${r.slug}` : "/guide/nda-history",
    label: r.label,
  }));

  const stats = [
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "Past-year questions" },
    { value: String(OVERVIEW.papers), label: "Papers (2017–2026)" },
    { value: String(OVERVIEW.chapters), label: "Chapters" },
    { value: String(OVERVIEW.playbooks), label: "Playbooks" },
  ];

  const sectionCards = ROUTES.filter((r) => r.slug !== "");

  return (
    <GuideShell
      guideTitle="NDA History Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-history"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { label: "NDA History" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-history"
        headline="NDA History — Strategy Guide"
        description="A 260-question analysis of the History half of GAT PART A, 2017–2026. Cornerstone vs Foundation Recall vs Quick-Win strands, 4 chapter playbooks, ~95-entry timeline + named-pairs reference, and the trap shapes NDA reuses."
      />
      <GuideHero
        eyebrow="NDA History Guide"
        title="How NDA History actually works"
        subtitle={`A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of the History section of GAT PART A from 2017 to 2026. We mapped the 4 chapter playbooks, the ~95 most-tested timeline anchors + named-pair facts, the year-on-year drift (the paper has NOT consistently hardened — Modern dominated 2017–20, Ancient surged 2022–24), and the distractor traps — so you can prep what the exam actually tests.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink
        examId={taxonomy.examId}
        subjectId={taxonomy.subjectId}
        className="mt-2"
      >
        Browse the full NDA History bank
      </BrowseLink>

      {/* CHAPTER BREAKDOWN TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions break down
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          All 4 chapters tested in NDA PART A History, sized by question count
          across the 2017–2026 bank. Modern India is uniquely dominant (47% of
          bank — no other NDA subject has one chapter at this share).
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Chapter</th>
                <th className="px-3 py-2 text-right font-medium">Questions</th>
                <th className="px-3 py-2 text-right font-medium">Share</th>
                <th className="px-3 py-2 text-right font-medium">% HARD</th>
                <th className="px-3 py-2 font-medium">Focus subtopics</th>
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
          Six sections, each answering a different question a candidate walks
          in with. Read top-to-bottom or jump to what you need.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sectionCards.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/guide/nda-history/${r.slug}`}
                className="group block rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
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
      </section>

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Why we built this
        </h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Most NDA History prep splits two ways: a textbook chapter-list
            that doesn&rsquo;t match the exam weights, or a flash-card grind
            without strategy. We&rsquo;ve done the third thing: pull every
            question, tag every subtopic, look at the patterns.
          </p>
          <p>
            Every claim on this site is verifiable. Click any &ldquo;Drill
            these N questions →&rdquo; link and you&rsquo;ll see the exact
            set we&rsquo;re talking about.
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Data snapshot: {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
          {" "}Numbers refresh as new papers land.
        </p>
      </section>

      <PrevNextNav
        next={{
          href: "/guide/nda-history/strategy",
          label: "Strategy — Cornerstone, Foundation, Quick-Win",
        }}
      />
    </GuideShell>
  );
}
