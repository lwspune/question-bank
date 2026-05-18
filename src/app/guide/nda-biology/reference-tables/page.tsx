import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import BiologyReferenceTables from "@/app/guide/_components/BiologyReferenceTables";
import { ROUTES } from "../_data/nda-biology";
import { REFERENCE_STATS } from "../_data/reference-tables";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "NDA Biology Reference Tables — Diseases, Vitamins, Hormones, Scientists",
  description:
    "The ~50 named-fact pairs NDA PART B Biology actually tests, grouped into 4 themed clusters. Diseases ↔ pathogens, vitamins ↔ deficiencies, hormones ↔ glands, scientists ↔ discoveries. Built for active-recall.",
  alternates: { canonical: "/guide/nda-biology/reference-tables" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-biology/${r.slug}` : "/guide/nda-biology",
  label: r.label,
}));

export default function ReferenceTablesPage() {
  const stats = [
    { value: String(REFERENCE_STATS.facts), label: "named facts indexed" },
    { value: String(REFERENCE_STATS.clusters), label: "themed clusters" },
    { value: "1", label: "page to revise from" },
    { value: "10", label: "years of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Biology Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-biology"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-biology", label: "NDA Biology" },
        { label: "Reference tables" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-biology/reference-tables"
        headline="NDA Biology Reference Tables — Diseases, Vitamins, Hormones, Scientists"
        description="The ~50 named-fact pairs NDA PART B Biology actually tests, grouped into 4 themed clusters."
      />
      <GuideHero
        eyebrow="Reference tables"
        title={`The ${REFERENCE_STATS.facts} named-fact pairs NDA Biology actually tests`}
        subtitle="Single page, every paired fact grouped by domain. Diseases ↔ pathogens. Vitamins ↔ deficiencies. Hormones ↔ glands. Scientists ↔ discoveries. Each row links to the playbook where that fact most appears. Bookmark and active-recall the morning of the exam."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to use */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Leaf className="h-4 w-4 text-primary" aria-hidden />
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
              cover-to-cover. Mark facts you DON&rsquo;T already know cold —
              the ones you couldn&rsquo;t derive from the entity name or the
              context alone. Most candidates know ~30 of the {REFERENCE_STATS.facts}.
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
              cover the right two columns (paired fact + context), read the
              entity NAME, write the paired fact + one context note from
              memory. Repeat for any you miss.
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
              fact appears.
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
              distractor for that pair (malaria-Mycobacterium swap, HIV is
              RNA virus, B12 deficiency in vegans).
            </span>
          </li>
        </ul>
      </section>

      {/* The reference tables */}
      <BiologyReferenceTables />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text tables (no diagrams)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          NDA Biology recall is almost entirely text-pair memorisation —
          disease name ↔ pathogen name; vitamin name ↔ deficiency disease;
          hormone name ↔ source gland. No diagrams needed for the recall
          surface. The structural biology (cell organelles, plant tissue
          anatomy, human organ systems) is best learned from your textbook
          diagrams; the named-fact pairings live in tables.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-biology/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-biology/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
