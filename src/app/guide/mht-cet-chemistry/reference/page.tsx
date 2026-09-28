import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import FormulaSheet from "@/app/guide/_components/FormulaSheet";
import { OVERVIEW, ROUTES } from "../_data/mht-cet-chemistry";
import { FORMULA_GROUPS, FORMULA_STATS } from "../_data/reference";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `MHT-CET Chemistry Reference — reactions and formulas on one page`,
  description: `The ${FORMULA_STATS.formulas} named reactions, reagents and formulas MHT-CET Chemistry actually tests, grouped across ${FORMULA_STATS.chapters} chapters — Rosenmund to Hardy–Schulze, ρ = zM/(a³N_A) to the Nernst equation. Chemistry shares a ${OVERVIEW.paper.durationMinutes}-minute paper with Physics — recall has to be instant.`,
  alternates: { canonical: "/guide/mht-cet-chemistry/reference" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/mht-cet-chemistry/${r.slug}` : "/guide/mht-cet-chemistry",
  label: r.label,
}));

export default function ReferencePage() {
  const stats = [
    { value: String(FORMULA_STATS.formulas), label: "reactions and formulas" },
    { value: String(FORMULA_STATS.chapters), label: "chapters covered" },
    {
      value: `${OVERVIEW.paper.minutesPerQuestion} min`,
      label: "a question, Paper II average",
    },
    { value: String(OVERVIEW.papers), label: "papers of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="MHT-CET Chemistry Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-chemistry"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-chemistry", label: "Chemistry" },
        { label: "Reference" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-chemistry/reference"
        headline={`MHT-CET Chemistry Reference — reactions and formulas on one page`}
        description={`The ${FORMULA_STATS.formulas} named reactions, reagents and formulas MHT-CET Chemistry actually tests, grouped across ${FORMULA_STATS.chapters} chapters.`}
      />
      <GuideHero
        eyebrow="Reference"
        title={`The ${FORMULA_STATS.formulas} reactions and formulas MHT-CET Chemistry actually tests`}
        subtitle={`One page, grouped by chapter in strand order. The Calculate chapters carry their formulas, the Reactions chapters their named reactions and reagents, the Recall chapters their tables. At about 40 seconds a Chemistry question, a reaction you have to work out in the hall is time Physics does not get.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to use */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Calculator className="h-4 w-4 text-primary" aria-hidden />
          How to use this page
        </h2>
        <ul className="mt-3 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                First read:
              </strong>{" "}
              cover-to-cover, marking every line you don&rsquo;t already know
              cold. The groups follow the strategy strands — Calculate, then
              Reactions, then Recall.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                Learn reactions both ways:
              </strong>{" "}
              the paper asks for the product from a reagent AND the reagent
              from a product. Clemmensen and Wolff–Kishner give the same product
              from opposite conditions; Finkelstein and Swarts differ in one
              halide. The look-alike is always an option.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                Active recall:
              </strong>{" "}
              cover the right-hand side, read only the NAME, and write the
              reaction or formula from memory. Anything you
              miss goes on tomorrow&rsquo;s list. Each chapter header links to
              its playbook, which is where you find out how the paper uses it.
            </span>
          </li>
        </ul>
      </section>

      {/* The formula sheet */}
      <FormulaSheet groups={FORMULA_GROUPS} guideSlug="mht-cet-chemistry" />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain text (not typeset)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Everything on this page is plain text plus unicode (ρ = z·M/(a³·N_A),
          RCOCl + H₂ → RCHO, μ = √(n(n + 2))). Plain text means
          the page loads instantly, copies cleanly into your own notes, and
          reads correctly to a screen reader symbol by symbol. Full
          typesetting is reserved for the teaching notes, where you are
          solving rather than revising.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/mht-cet-chemistry/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/mht-cet-chemistry/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
