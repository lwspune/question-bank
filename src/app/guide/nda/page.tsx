import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo/title";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";
import { getSubjectGuides } from "@/lib/guide/guideCatalog";
import GuideHubList from "@/app/guide/_components/GuideHubList";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import ResultsStrip from "@/components/results/ResultsStrip";

export const metadata: Metadata = {
  title: { absolute: fitTitle("NDA Strategy Guides for All 10 Subjects") },
  description:
    "Evidence-led strategy guides for NDA Mathematics, NDA English (GAT), NDA PART B Physics, NDA PART B Chemistry, NDA PART B Biology, NDA PART A Geography, NDA PART A History, NDA PART A Polity, NDA PART A Economics, and NDA Current Affairs. Every claim is measured against the live past-year question bank.",
  alternates: { canonical: "/guide/nda" },
};



/** The cards and their editing rules live in src/lib/guide/guideCatalog.ts. */
const GUIDES = getSubjectGuides("nda");

export default function NdaGuideIndex() {
  return (
    <GuideShell
      guideTitle="Strategy Guides"
      sideNav={buildGuideSideNav()}
      breadcrumbs={[{ href: "/guide", label: "Guides" }, { label: "NDA" }]}
    >
        <GuideJsonLd
          type="CollectionPage"
          path="/guide/nda"
          headline="NDA Guides — Strategy for Maths, English, Physics, Chemistry, Biology, Geography, History, Polity and Economics"
          description="Evidence-led strategy guides for NDA Mathematics, NDA English (GAT), NDA PART B Physics, NDA PART B Chemistry, NDA PART B Biology, NDA PART A Geography, NDA PART A History, NDA PART A Polity, and NDA PART A Economics. Every claim is measured against the live past-year question bank."
        />
        <div>
          <GuideHero
            eyebrow="NDA Guides"
            title="NDA strategy guides"
            subtitle="One guide per NDA subject, ten in all, each built from that subject's own past papers since 2017."
          />
        </div>

        <ResultsStrip examSlugs={["nda"]} className="mb-6" />

        <GuideHubList guides={GUIDES} examDisplay="NDA" restTitle="Paper II · General Ability" />

        <section className="mt-12 rounded-lg border bg-muted/30 p-5">
          <h2 className="text-base font-semibold tracking-tight">
            What makes these different
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            All ten guides are built the same way: pull every PUBLIC question
            from the bank, classify it, look at the patterns. Every
            &ldquo;drill the N questions&rdquo; link goes to the exact set
            we&rsquo;re talking about. No claim survives that the data
            doesn&rsquo;t back up.
          </p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
            Each guide is shaped by its bank, not by a shared template — open
            any guide above to see the structure that matches that
            subject&rsquo;s past-year question shape.
          </p>
        </section>
    </GuideShell>
  );
}
