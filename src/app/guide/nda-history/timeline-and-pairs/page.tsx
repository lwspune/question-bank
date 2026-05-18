import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import HistoryReferenceTables from "@/app/guide/_components/HistoryReferenceTables";
import { ROUTES } from "../_data/nda-history";
import { REFERENCE_STATS } from "../_data/timeline-and-pairs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "NDA History Timeline & Pairs — Era anchors, Rulers, Reformers, Scholars, British Acts",
  description:
    "The ~95 chronology anchors + named-pair facts NDA PART A History actually tests, grouped into 5 themed clusters. Era timeline (BCE → 1947+); Rulers ↔ dynasty; Reformers ↔ movement; Scholars ↔ texts; British Acts + Viceroys ↔ year. Built for active-recall.",
  alternates: { canonical: "/guide/nda-history/timeline-and-pairs" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-history/${r.slug}` : "/guide/nda-history",
  label: r.label,
}));

export default function TimelineAndPairsPage() {
  const stats = [
    { value: String(REFERENCE_STATS.facts), label: "anchors + named pairs" },
    { value: String(REFERENCE_STATS.clusters), label: "themed clusters" },
    { value: "1", label: "page to revise from" },
    { value: "10", label: "years of PYQs behind it" },
  ];

  return (
    <GuideShell
      guideTitle="NDA History Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-history"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-history", label: "NDA History" },
        { label: "Timeline & pairs" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-history/timeline-and-pairs"
        headline="NDA History Timeline & Pairs — Era anchors, Rulers, Reformers, Scholars, British Acts"
        description="The ~95 chronology anchors + named-pair facts NDA PART A History actually tests, grouped into 5 themed clusters."
      />
      <GuideHero
        eyebrow="Timeline & pairs"
        title={`The ${REFERENCE_STATS.facts} anchors + named pairs NDA History actually tests`}
        subtitle="Single page, chronology + named-pair facts grouped by domain. Era timeline (~42 absolute dates BCE → 1947+). Rulers ↔ dynasty. Reformers ↔ movement ↔ text. Scholars ↔ texts. British Acts + Viceroys ↔ year. Each row links to the playbook where that fact most appears. Bookmark and active-recall the morning of the exam."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to use */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <Landmark className="h-4 w-4 text-primary" aria-hidden />
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
              the ones you couldn&rsquo;t derive from the entity name or
              era context alone. Most candidates know ~30 of the {REFERENCE_STATS.facts}.
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
              memory. Repeat for any you miss. Drill &lsquo;Reformers ↔ movement&rsquo;
              + &lsquo;Rulers ↔ dynasty&rsquo; + &lsquo;British Acts ↔ year&rsquo; as separate
              4-pass sessions — they&rsquo;re the highest-leverage.
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
              distractor for that pair (Shankardeva = Assam Vaishnavism not
              Gaudiya; Khalsa = Guru Gobind Singh 1699 not Guru Nanak;
              Krishnadevaraya never marched on Gujarat).
            </span>
          </li>
        </ul>
      </section>

      {/* The reference tables */}
      <HistoryReferenceTables />

      {/* Note on rendering */}
      <section className="mt-12 rounded-md border bg-muted/30 p-5 text-sm">
        <h2 className="text-base font-semibold tracking-tight">
          Why plain-text tables (no timelines visual)
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          NDA History recall is almost entirely text-pair memorisation — date
          ↔ event; reformer ↔ movement; ruler ↔ dynasty; scholar ↔ text; Act
          ↔ year. The era-anchoring (where exactly Buxar sits in the
          Plassey→Allahabad sequence, which Mughal ruler the traveller
          served) is best learned from your NCERT textbook alongside this
          page; the named-fact pairings + absolute dates live in tables.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-history/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-history/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
