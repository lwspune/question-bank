import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import FormulaSheet from "@/app/guide/_components/FormulaSheet";
import { ROUTES } from "../_data/nda-physics";
import { FORMULA_STATS } from "../_data/formulas";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Physics Formulas — Single-page revision compendium",
  description:
    "The ~30 formulas NDA PART B Physics actually tests, grouped by chapter. v=u+at, F=ma, F=Gm₁m₂/r², T=2π√(L/g), mirror/lens formula, Snell's law, V=IR, Q=mcΔT, PV=nRT, E=hf. Each formula with symbols, units, and the recurring trap.",
  alternates: { canonical: "/guide/nda-physics/formulas" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
  label: r.label,
}));

export default function FormulasPage() {
  const stats = [
    { value: String(FORMULA_STATS.formulas), label: "essential formulas" },
    { value: String(FORMULA_STATS.chapters), label: "chapters covered" },
    { value: "1", label: "page to revise from" },
    { value: "10", label: "years of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-physics", label: "NDA Physics" },
        { label: "Formulas" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-physics/formulas"
        headline="NDA Physics Formulas — Single-page revision compendium"
        description="The ~30 formulas NDA PART B Physics actually tests, grouped by chapter. Symbols, units, and the recurring trap for each."
      />
      <GuideHero
        eyebrow="Formulas"
        title="The 32 formulas NDA Physics actually tests"
        subtitle="One page, every formula grouped by chapter. Each entry shows the formula, the symbol legend, and the most-common trap. Bookmark and revise the morning of the exam."
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
              cover-to-cover. Mark formulas you DON&rsquo;T already know cold.
              Most candidates know ~20 of the 32 — the other 12 are the
              marks-on-the-table.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                Pre-test revision:
              </strong>{" "}
              re-read the &lsquo;Note&rsquo; row on each formula. NDA tests the
              traps more than the formulas themselves — knowing v_esc =
              √(2gR) is not the same as remembering that planet-scaled-ρ
              questions usually cancel.
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
              cover the right side, read just the formula NAME, write the
              formula + 2 symbol meanings from memory. Repeat for any you miss.
            </span>
          </li>
        </ul>
      </section>

      {/* The formula sheet */}
      <FormulaSheet />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text formulas (not LaTeX)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          NDA Physics formulas are short enough to read in plain text +
          unicode (v²=u²+2as, F=Gm₁m₂/r², T=2π√(L/g)). Plain text means the
          page loads instantly, copies cleanly into your notes, and screen
          readers handle every symbol. The complex math typesetting is
          reserved for the worked-example PYQs on the playbook detail pages
          where you actually solve problems.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-physics/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-physics/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
