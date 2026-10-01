import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import FormulaSheet from "@/app/guide/_components/FormulaSheet";
import { OVERVIEW, PAPER } from "../_data/jee-mains-chemistry";
import { REFERENCE_GROUPS } from "../_data/reference";
import { GUIDE_BASE, jeeChemGuideSideNav } from "../_data/nav";

export const revalidate = 86400;

const ENTRIES = REFERENCE_GROUPS.reduce((n, g) => n + g.formulas.length, 0);
const TITLE = "JEE Mains Chemistry Reference — formulas, reactions and orders on one page";
const DESCRIPTION = `The ${ENTRIES} formulas, reagents, named reactions, orders and tables JEE Mains Chemistry actually tests, across ${REFERENCE_GROUPS.length} chapters, in the order of the playbooks.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${GUIDE_BASE}/reference` },
};

export default function ReferencePage() {
  const stats = [
    { value: String(ENTRIES), label: "formulas, reactions and facts" },
    { value: String(REFERENCE_GROUPS.length), label: "chapters covered" },
    { value: `${PAPER.minutesPerQuestion} min`, label: "a question, suggested budget" },
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "past-year questions behind it" },
  ];

  return (
    <GuideShell
      guideTitle="JEE Mains Chemistry Guide"
      sideNav={jeeChemGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Chemistry" },
        { label: "Reference" },
      ]}
    >
      <GuideJsonLd type="Article" path={`${GUIDE_BASE}/reference`} headline={TITLE} description={DESCRIPTION} />
      <GuideHero
        eyebrow="Reference"
        title={`The ${ENTRIES} formulas, reactions and facts the paper tests`}
        subtitle="One page, grouped by chapter in playbook order. The Calculate chapters carry their formulas, the Reactions chapters their reagents and named reactions, the Structure chapters their orders, rules and tables."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Calculator className="h-4 w-4 text-primary" aria-hidden />
          How to use this page
        </h2>
        <ul className="mt-3 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
          <li className="flex gap-2">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
            <span>
              <strong className="font-semibold text-foreground">First read:</strong> mark every line you do not
              already know cold. The groups follow the strands: Calculate, then Reactions, then Structure and recall.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
            <span>
              <strong className="font-semibold text-foreground">Learn reactions both ways:</strong> the paper asks
              for the product from a reagent and the reagent from a product. The look-alike reagent is always an
              option.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
            <span>
              <strong className="font-semibold text-foreground">Active recall:</strong> cover the right-hand side,
              read only the name, and write the formula, product or order from memory. Each chapter header links to
              its playbook, which shows how the paper uses it.
            </span>
          </li>
        </ul>
      </section>

      <FormulaSheet groups={REFERENCE_GROUPS} guideSlug="jee-mains-chemistry" />

      <PrevNextNav
        prev={{ href: `${GUIDE_BASE}/playbooks`, label: "Playbooks" }}
        next={{ href: `${GUIDE_BASE}/trends`, label: "Trends" }}
      />
    </GuideShell>
  );
}
