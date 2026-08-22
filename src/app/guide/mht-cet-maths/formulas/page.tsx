import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import FormulaSheet from "@/app/guide/_components/FormulaSheet";
import { OVERVIEW, ROUTES } from "../_data/mht-cet-maths";
import { FORMULA_GROUPS, FORMULA_STATS } from "../_data/formulas";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `MHT-CET Maths Formulas — ${FORMULA_STATS.formulas} formulas on one page`,
  description: `The ${FORMULA_STATS.formulas} formulas MHT-CET Maths Paper I actually tests, grouped across ${FORMULA_STATS.chapters} chapters. Direction cosines, plane distance, scalar triple product, integration by parts, Bayes' theorem, the pair-of-lines conditions. Each formula with its symbol legend and the recurring trap. Paper I is ${OVERVIEW.paper.questions} questions in ${OVERVIEW.paper.durationMinutes} minutes — recall has to be instant.`,
  alternates: { canonical: "/guide/mht-cet-maths/formulas" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/mht-cet-maths/${r.slug}` : "/guide/mht-cet-maths",
  label: r.label,
}));

export default function FormulasPage() {
  const stats = [
    { value: String(FORMULA_STATS.formulas), label: "formulas" },
    { value: String(FORMULA_STATS.chapters), label: "chapters covered" },
    {
      value: `${OVERVIEW.paper.minutesPerQuestion} min`,
      label: "per question in the hall",
    },
    { value: String(OVERVIEW.papers), label: "shifts of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="MHT-CET Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-maths", label: "Mathematics" },
        { label: "Formulas" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-maths/formulas"
        headline={`MHT-CET Maths Formulas — ${FORMULA_STATS.formulas} formulas on one page`}
        description={`The ${FORMULA_STATS.formulas} formulas MHT-CET Maths Paper I actually tests, grouped across ${FORMULA_STATS.chapters} chapters. Symbol legend and the recurring trap for each.`}
      />
      <GuideHero
        eyebrow="Formulas"
        title={`The ${FORMULA_STATS.formulas} formulas MHT-CET Maths actually tests`}
        subtitle={`One page, every formula grouped by chapter and ordered by recent weightage. Each entry shows the formula, the symbol legend, and the trap that costs marks. Paper I gives you ${OVERVIEW.paper.minutesPerQuestion} minutes a question — a formula you have to derive in the hall is a formula you have already lost time to.`}
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
              cover-to-cover, marking every formula you don&rsquo;t already
              know cold. The groups are ordered by recent weightage, so the
              chapters at the top of this page are the ones carrying the most
              questions per paper — start your marking there, not at the
              chapter you happen to like.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                Read the &lsquo;Note&rsquo; row:
              </strong>{" "}
              several of them exist purely to save time — a formula that
              replaces a whole calculus routine with one line of arithmetic is
              worth more than a formula you already know, because the binding
              constraint in this paper is the clock, not the syllabus.
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
              cover the right-hand side, read only the formula NAME, and write
              the formula plus two symbol meanings from memory. Anything you
              miss goes on tomorrow&rsquo;s list. Each chapter header links to
              its playbook, which is where you find out what the formula is
              actually used for.
            </span>
          </li>
        </ul>
      </section>

      {/* The formula sheet */}
      <FormulaSheet groups={FORMULA_GROUPS} guideSlug="mht-cet-maths" />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text formulas (not LaTeX)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Every formula on this page is plain text plus unicode (l² + m² + n²
          = 1, tan θ = |2√(h² − ab) / (a + b)|, r = a + λb). Plain text means
          the page loads instantly, copies cleanly into your own notes, and
          reads correctly to a screen reader symbol by symbol. Full
          typesetting is reserved for the worked examples on the playbook
          detail pages, where you are solving rather than revising.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/mht-cet-maths/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/mht-cet-maths/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
