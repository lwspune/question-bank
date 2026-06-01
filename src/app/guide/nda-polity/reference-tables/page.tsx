import type { Metadata } from "next";
import { Scale } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import ReferenceTables from "@/app/guide/_components/ReferenceTables";
import { ROUTES } from "../_data/nda-polity";
import { REFERENCE_STATS, REFERENCE_CLUSTERS } from "../_data/reference-tables";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "NDA Polity Reference Tables — Articles, Amendments, Bodies, Parts/Schedules",
  description:
    "The ~80 Articles + Constitutional Amendments + Bodies + Parts/Schedules NDA PART A Polity actually tests, grouped into 4 themed clusters. Key Articles ↔ Subject; Constitutional Amendments ↔ Year ↔ Theme; Constitutional Bodies ↔ Function ↔ Article; Parts ↔ Schedules ↔ Content. Built for active-recall.",
  alternates: { canonical: "/guide/nda-polity/reference-tables" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-polity/${r.slug}` : "/guide/nda-polity",
  label: r.label,
}));

export default function ReferenceTablesPage() {
  const stats = [
    { value: String(REFERENCE_STATS.facts), label: "Articles + Amendments + Bodies + Parts" },
    { value: String(REFERENCE_STATS.clusters), label: "themed clusters" },
    { value: "1", label: "page to revise from" },
    { value: "10", label: "years of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Polity Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-polity"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-polity", label: "NDA Polity" },
        { label: "Reference tables" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-polity/reference-tables"
        headline="NDA Polity Reference Tables — Articles, Amendments, Bodies, Parts/Schedules"
        description="The ~80 Articles + Constitutional Amendments + Bodies + Parts/Schedules NDA PART A Polity actually tests, grouped into 4 themed clusters."
      />
      <GuideHero
        eyebrow="Reference tables"
        title={`The ${REFERENCE_STATS.facts} Articles + Amendments + Bodies + Parts NDA Polity actually tests`}
        subtitle="Single page, named-fact reference grouped by domain. Key Articles ↔ Subject (~32 article-pair anchors — the bank's #1 cross-chapter lever, 28 q reference Articles). Constitutional Amendments ↔ Year ↔ Theme (~18 entries). Constitutional Bodies ↔ Function ↔ Article (~19 entries — densest CTA target). Parts ↔ Schedules ↔ Content (~11 structural entries). Each row links to the playbook where that fact most appears. Bookmark and active-recall the morning of the exam."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to use */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Scale className="h-4 w-4 text-primary" aria-hidden />
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
              the ones you couldn&rsquo;t derive from the Article number or
              entity name alone. Most candidates know ~30 of the {REFERENCE_STATS.facts}.
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
              memory. Repeat for any you miss. Drill &lsquo;Key Articles ↔
              Subject&rsquo; first (highest leverage — bank&rsquo;s #1 cross-
              chapter lever); then &lsquo;Constitutional Bodies&rsquo; (densest
              CTA target on the 21-q subtopic); then &lsquo;Amendments&rsquo;
              + &lsquo;Parts/Schedules&rsquo; as separate 4-pass sessions.
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
              distractor for that pair (Article 21A age is 6–14 not 6–18;
              42nd 1976 added Fundamental Duties Article 51A; Lokpal is
              STATUTORY not constitutional; HC territorial jurisdictions
              like Calcutta covers A&amp;N not Lakshadweep; Article 51A
              inserted by 42nd 1976; right to property removed from FRs by
              44th 1978).
            </span>
          </li>
        </ul>
      </section>

      {/* The reference tables */}
      <ReferenceTables guidePath="nda-polity" clusters={REFERENCE_CLUSTERS} />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text tables (no Constitution-tree visual)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          NDA Polity recall is almost entirely text-pair memorisation —
          Article ↔ subject; Amendment ↔ year ↔ theme; body ↔ function ↔
          Article; Part ↔ Schedule ↔ content. The structural relationships
          (which Schedules sit under which Parts, what amendments inserted
          which provisions) are best learned from your NCERT textbook
          alongside this page; the named-fact pairings live in tables.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-polity/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-polity/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
