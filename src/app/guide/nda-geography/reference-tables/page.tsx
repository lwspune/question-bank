import type { Metadata } from "next";
import { Globe } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import GeographyReferenceTables from "@/app/guide/_components/GeographyReferenceTables";
import { ROUTES } from "../_data/nda-geography";
import { REFERENCE_STATS } from "../_data/reference-tables";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "NDA Geography Reference Tables — Indian Rivers, Mountain Peaks, Mineral/Crop States, Local Winds",
  description:
    "The ~62 named-fact pairs NDA PART A Geography actually tests, grouped into 4 themed clusters. Indian Rivers ↔ states ↔ tributaries; Indian Mountain Peaks ↔ ranges; Mineral & Crop ↔ producer states; Local Winds + Climate Zones. Built for active-recall.",
  alternates: { canonical: "/guide/nda-geography/reference-tables" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-geography/${r.slug}` : "/guide/nda-geography",
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
      guideTitle="NDA Geography Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-geography"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-geography", label: "NDA Geography" },
        { label: "Reference tables" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-geography/reference-tables"
        headline="NDA Geography Reference Tables — Indian Rivers, Mountain Peaks, Mineral/Crop States, Local Winds"
        description="The ~62 named-fact pairs NDA PART A Geography actually tests, grouped into 4 themed clusters."
      />
      <GuideHero
        eyebrow="Reference tables"
        title={`The ${REFERENCE_STATS.facts} named-fact pairs NDA Geography actually tests`}
        subtitle="Single page, every paired fact grouped by domain. Indian Rivers ↔ states ↔ tributaries. Indian Mountain Peaks ↔ ranges. Mineral & Crop ↔ producer states. Local Winds + Climate Zones. Each row links to the playbook where that fact most appears. Bookmark and active-recall the morning of the exam."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to use */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Globe className="h-4 w-4 text-primary" aria-hidden />
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
              distractor for that pair (Mahendragiri = Odisha not TN; Suez
              has NO locks; Helmand is endorheic).
            </span>
          </li>
        </ul>
      </section>

      {/* The reference tables */}
      <GeographyReferenceTables />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text tables (no maps)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          NDA Geography recall is almost entirely text-pair memorisation —
          river name ↔ states crossed; peak name ↔ range; mineral ↔ leading
          producer state; wind name ↔ region. The map-anchoring (where
          exactly Mahendragiri sits, which state Coal Belt covers) is best
          learned from your atlas alongside this page; the named-fact
          pairings live in tables.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-geography/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-geography/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
