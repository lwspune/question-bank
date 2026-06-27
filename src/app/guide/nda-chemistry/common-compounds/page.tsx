import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import CommonCompoundsTable from "@/app/guide/_components/CommonCompoundsTable";
import { ROUTES } from "../_data/nda-chemistry";
import { COMPOUND_STATS } from "../_data/common-compounds";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Chemistry Common Compounds — Name ↔ Formula ↔ Use reference",
  description:
    "The ~50 chemical name ↔ formula ↔ use pairs NDA PART B Chemistry actually tests, grouped into 6 themed clusters. Acids, salts, gases, fuels, allotropes, alloys. Built for active-recall.",
  alternates: { canonical: "/guide/nda-chemistry/common-compounds" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-chemistry/${r.slug}` : "/guide/nda-chemistry",
  label: r.label,
}));

export default function CommonCompoundsPage() {
  const stats = [
    { value: String(COMPOUND_STATS.compounds), label: "compounds indexed" },
    { value: String(COMPOUND_STATS.clusters), label: "themed clusters" },
    { value: "1", label: "page to revise from" },
    { value: "10", label: "years of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Chemistry Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-chemistry"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-chemistry", label: "NDA Chemistry" },
        { label: "Common compounds" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-chemistry/common-compounds"
        headline="NDA Chemistry Common Compounds — Name ↔ Formula ↔ Use reference"
        description="The ~50 chemical name ↔ formula ↔ use pairs NDA PART B Chemistry actually tests, grouped into 6 themed clusters."
      />
      <GuideHero
        eyebrow="Common compounds"
        title={`The ${COMPOUND_STATS.compounds} compounds NDA Chemistry actually tests`}
        subtitle="Single page, every compound grouped by theme. Each entry shows the common name, the formula in plain-text + unicode, the primary use, and a link to the playbook where it most appears. Bookmark and active-recall the morning of the exam."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to use */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <FlaskConical className="h-4 w-4 text-primary" aria-hidden />
          How to use this page
        </h2>
        <ul className="mt-3 space-y-2 font-serif text-sm leading-relaxed text-foreground/90">
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">First read:</strong>{" "}
              cover-to-cover. Mark compounds you DON&rsquo;T already know cold —
              the ones you couldn&rsquo;t derive from the formula or the name
              alone. Most candidates know ~30 of the {COMPOUND_STATS.compounds}.
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
              cover the right two columns (formula + use), read just the
              compound NAME, write the formula + one use from memory. Repeat
              for any you miss.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                Drill the playbook:
              </strong>{" "}
              click the &lsquo;Playbook&rsquo; link on any row to jump to the
              chapter&rsquo;s deep-dive + drill the bank questions where that
              compound appears.
            </span>
          </li>
          <li className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
            />
            <span>
              <strong className="font-semibold text-foreground">
                Trap-aware:
              </strong>{" "}
              the amber &lsquo;Note&rsquo; on a row flags the most-common
              distractor for that compound (oxalic NOT citric in tomatoes;
              graphite NOT diamond conducts electricity; Cr is essential in
              stainless steel).
            </span>
          </li>
        </ul>
      </section>

      {/* The compounds table */}
      <CommonCompoundsTable />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text formulas (not LaTeX)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Chemical formulas are short enough to read in plain text + unicode
          (Na₂CO₃·10H₂O, CaSO₄·½H₂O, Ca(OCl)Cl). Plain text means the page
          loads instantly, copies cleanly into your notes, and screen readers
          handle every symbol. The complex chemistry notation (skeletal
          formulas, stereochemistry) appears only in the worked-example PYQs
          on the playbook detail pages.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-chemistry/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-chemistry/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
