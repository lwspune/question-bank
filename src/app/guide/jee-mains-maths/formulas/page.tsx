import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import FormulaSheet from "@/app/guide/_components/FormulaSheet";
import { OVERVIEW, PAPER } from "../_data/jee-mains-maths";
import { GUIDE_BASE, jeeGuideSideNav } from "../_data/nav";
import { FORMULA_GROUPS, FORMULA_STATS } from "../_data/formulas";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `JEE Mains Maths Formulas — ${FORMULA_STATS.formulas} formulas on one page`,
  description: `The ${FORMULA_STATS.formulas} formulas and results JEE Mains Mathematics actually tests, grouped across ${FORMULA_STATS.chapters} chapters: conic tangency conditions, shortest distance between skew lines, counting relations and functions, the a + b − x property, Bayes' theorem, the binomial general term, adjoint identities. About ${PAPER.minutesPerQuestion} minutes a question — recall has to be instant.`,
  alternates: { canonical: `${GUIDE_BASE}/formulas` },
};

const sideNav = jeeGuideSideNav();

const bullet = <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />;

export default function FormulasPage() {
  const stats = [
    { value: String(FORMULA_STATS.formulas), label: "formulas" },
    { value: String(FORMULA_STATS.chapters), label: "chapters covered" },
    { value: `${PAPER.minutesPerQuestion} min`, label: "per question in the hall" },
    { value: `${OVERVIEW.firstYear}–${OVERVIEW.lastYear}`, label: "shifts of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="JEE Mains Maths Guide"
      sideNav={sideNav}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Mathematics" },
        { label: "Formulas" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`${GUIDE_BASE}/formulas`}
        headline={`JEE Mains Maths Formulas — ${FORMULA_STATS.formulas} formulas on one page`}
        description={`The ${FORMULA_STATS.formulas} formulas and results JEE Mains Mathematics actually tests, grouped across ${FORMULA_STATS.chapters} chapters, each with its symbol legend.`}
      />
      <GuideHero
        eyebrow="Formulas"
        title={`The ${FORMULA_STATS.formulas} formulas JEE Mains Maths actually tests`}
        subtitle={`One page, grouped by chapter in strategy order — cornerstone first. Each entry has the formula, what the symbols mean, and a note where a slip is common. At about ${PAPER.minutesPerQuestion} minutes a question on a shared clock, a formula you have to work out in the hall costs you a question.`}
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
              slip that produces a wrong option — a condition that is easy to forget, a sign that is easy to
              flip.
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

      <FormulaSheet groups={FORMULA_GROUPS} guideSlug="jee-mains-maths" />

      <PrevNextNav
        prev={{ href: `${GUIDE_BASE}/playbooks`, label: "Playbooks" }}
        next={{ href: `${GUIDE_BASE}/trends`, label: "Trends" }}
      />
    </GuideShell>
  );
}
