import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import FormulaSheet from "@/app/guide/_components/FormulaSheet";
import { OVERVIEW, ROUTES } from "../_data/cds-maths";
import { FORMULA_GROUPS, FORMULA_STATS } from "../_data/formulas";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `CDS Maths Formulas — ${FORMULA_STATS.formulas} formulas on one page`,
  description: `The ${FORMULA_STATS.formulas} formulas and results CDS Elementary Mathematics actually tests, grouped across ${FORMULA_STATS.chapters} chapters: trigonometric identities, HCF and LCM, Heron's formula, frustum volume, Apollonius, successive percentages, compound interest, the cube identity. ${OVERVIEW.paper.questions} questions in ${OVERVIEW.paper.durationMinutes} minutes — recall has to be instant.`,
  alternates: { canonical: "/guide/cds-maths/formulas" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths",
  label: r.label,
}));

const bullet = <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />;

export default function FormulasPage() {
  const stats = [
    { value: String(FORMULA_STATS.formulas), label: "formulas" },
    { value: String(FORMULA_STATS.chapters), label: "chapters covered" },
    { value: `${OVERVIEW.paper.minutesPerQuestion} min`, label: "per question in the hall" },
    { value: String(OVERVIEW.papers), label: "papers of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="CDS Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/cds-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/cds", label: "CDS" },
        { href: "/guide/cds-maths", label: "Mathematics" },
        { label: "Formulas" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/cds-maths/formulas"
        headline={`CDS Maths Formulas — ${FORMULA_STATS.formulas} formulas on one page`}
        description={`The ${FORMULA_STATS.formulas} formulas and results CDS Elementary Mathematics actually tests, grouped across ${FORMULA_STATS.chapters} chapters, each with its symbol legend.`}
      />
      <GuideHero
        eyebrow="Formulas"
        title={`The ${FORMULA_STATS.formulas} formulas CDS Maths actually tests`}
        subtitle={`One page, grouped by chapter in strategy order — cornerstone first. Each entry has the formula, what the symbols mean, and a note where a slip is common. At ${OVERVIEW.paper.minutesPerQuestion} minutes a question, a formula you have to work out in the hall costs you a question.`}
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
            {bullet}
            <span>
              <strong className="font-semibold text-foreground">First read:</strong> mark every formula you do
              not know cold. The chapters at the top carry the most questions, so start there.
            </span>
          </li>
          <li className="flex gap-2">
            {bullet}
            <span>
              <strong className="font-semibold text-foreground">Read the notes:</strong> most of them name the
              slip that produces a wrong option — a formula that holds for two numbers only, a term that is easy
              to drop.
            </span>
          </li>
          <li className="flex gap-2">
            {bullet}
            <span>
              <strong className="font-semibold text-foreground">Active recall:</strong> cover the formula, read
              only its name, and write it from memory. Anything you miss goes on tomorrow&rsquo;s list. Each
              chapter header links to its playbook.
            </span>
          </li>
        </ul>
      </section>

      <FormulaSheet groups={FORMULA_GROUPS} guideSlug="cds-maths" />

      <PrevNextNav
        prev={{ href: "/guide/cds-maths/playbooks", label: "Playbooks" }}
        next={{ href: "/guide/cds-maths/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
