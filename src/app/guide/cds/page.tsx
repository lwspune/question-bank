import type { Metadata } from "next";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";
import { getSubjectGuides } from "@/lib/guide/guideCatalog";
import GuideHubList from "@/app/guide/_components/GuideHubList";
import ResultsStrip from "@/components/results/ResultsStrip";

export const revalidate = 86400;

const PAGE_INTRO =
  "Built from the live past-year question bank — every CDS paper from 2016 to 2026, not a syllabus " +
  "summary. Elementary Mathematics is live; English and General Knowledge guides are not written yet.";

export const metadata: Metadata = {
  title: "CDS Guides — Strategy for Elementary Mathematics",
  description:
    "Evidence-led strategy guide for CDS Elementary Mathematics, built from every past paper from 2016 to 2026. Every claim is measured against the live past-year question bank.",
  alternates: { canonical: "/guide/cds" },
};

/** The cards live in src/lib/guide/guideCatalog.ts. */
const GUIDES = getSubjectGuides("cds");

export default function CdsGuideIndex() {
  return (
    <GuideShell
      guideTitle="Strategy Guides"
      sideNav={buildGuideSideNav()}
      breadcrumbs={[{ href: "/guide", label: "Guides" }, { label: "CDS" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/cds"
        headline="CDS Guides — Strategy for Elementary Mathematics"
        description="Evidence-led strategy guide for CDS Elementary Mathematics, built from every past paper from 2016 to 2026."
      />

      <GuideHero
        eyebrow="CDS guides"
        title="Strategy guides for CDS"
        subtitle={PAGE_INTRO}
      />

      <ResultsStrip examSlugs={["cds"]} className="mb-6" />

      <GuideHubList guides={GUIDES} examDisplay="CDS" restTitle="Other subjects" />
    </GuideShell>
  );
}
