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
import { CHAPTER_TABLE, OVERVIEW, ROUTES } from "./_data/nda-physics";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Physics — Strategy Guide",
  description:
    "How NDA PART B Physics actually works. A 449-question analysis of every paper from 2017 to 2026 — Recall vs Apply vs Reason strands, 14 chapter playbooks, formula compendium, and the trap shapes NDA reuses.",
  alternates: { canonical: "/guide/nda-physics" },
};

export default async function NdaPhysicsLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Physics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
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
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { label: "NDA Physics" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-physics"
        headline="NDA Physics — Strategy Guide"
        description="A 449-question analysis of the Physics half of GAT PART B, 2017–2026. Recall vs Apply vs Reason strands, 14 chapter playbooks, formula compendium, and the trap shapes NDA reuses."
      />
      <GuideHero
        eyebrow="NDA Physics Guide"
        title="How NDA Physics actually works"
        subtitle={`A ${OVERVIEW.totalQ.toLocaleString("en-IN")}-question analysis of the Physics half of GAT PART B from 2017 to 2026. We mapped the 14 chapter playbooks, the formula compendium, the year-on-year drift, and the distractor traps — so you can prep what the exam actually tests.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <BrowseLink
        examId={taxonomy.examId}
        subjectId={taxonomy.subjectId}
        className="mt-2"
      >
        Browse the full NDA Physics bank
      </BrowseLink>

      {/* Why this guide is structured differently */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Why this guide is structured differently from NDA Maths and English
        </h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            NDA Maths has cross-chapter principles — AM-GM appears in 10
            chapters, Vieta in 7. So the{" "}
            <Link href="/guide/nda-maths/principles" className="text-primary hover:underline">
              Maths guide leads with 11 principle deep-dives
            </Link>
            .
          </p>
          <p>
            NDA Physics doesn&rsquo;t work that way. The strongest
            cross-chapter physics lever in the bank — ratio/proportional
            reasoning — has only 12 questions across 6 chapters. That fails
            the threshold for a principle axis (NDA Maths&rsquo; weakest
            curated principle still spans ~30 questions). And %HARD is
            mid-spread, not flat like English — 5 chapters carry real HARD
            load (E&amp;M 22%, FMPoM 30%, Heat 21%, Kinematics 25%, Oscillations
            15%).
          </p>
          <p>
            So this guide does three things differently:{" "}
            <strong className="font-semibold text-foreground">
              14 chapter-level playbooks
            </strong>{" "}
            (chapters ARE the natural unit in physics — subtopics are too
            fine), a{" "}
            <strong className="font-semibold text-foreground">skill-strand strategy</strong>{" "}
            (Recall / Apply / Reason) with a %HARD-aware tier overlay, and a
            dedicated{" "}
            <Link href="/guide/nda-physics/formulas" className="text-primary hover:underline">
              formula compendium
            </Link>{" "}
            page (the first guide where ~30 formulas covering every chapter
            serves as a stand-alone revision artefact).
          </p>
        </div>
      </section>

      {/* CHAPTER BREAKDOWN TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions break down
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          All 14 chapters tested in NDA PART B Physics, sized by question count
          across the 2017–2026 bank. Sorted by share of bank.
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
                href={`/guide/nda-physics/${r.slug}`}
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
            Most NDA Physics prep splits two ways: a coaching-class lecture
            sequence that doesn&rsquo;t match the chapter weights, or a
            chapter-list-grind without strategy. We&rsquo;ve done the third
            thing: pull every question, tag every subtopic, look at the
            patterns.
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
          href: "/guide/nda-physics/strategy",
          label: "Strategy — Recall, Apply, Reason",
        }}
      />
    </GuideShell>
  );
}
