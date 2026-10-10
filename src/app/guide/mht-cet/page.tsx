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
  "Built from the live past-year question bank — every MHT-CET paper from 2021 to 2025, not a syllabus " +
  "summary. Pick the subject you're preparing.";

export const metadata: Metadata = {
  title: "MHT-CET Guides — Strategy for Maths, Physics and Chemistry",
  description:
    "Evidence-led strategy guides for MHT-CET Mathematics, Physics and Chemistry, built from every past paper from 2021 to 2025. Every claim is measured against the live past-year question bank.",
  alternates: { canonical: "/guide/mht-cet" },
};



/** The cards live in src/lib/guide/guideCatalog.ts. */
const GUIDES = getSubjectGuides("mht-cet");

export default function MhtCetGuideIndex() {
  return (
    <GuideShell
      guideTitle="Strategy Guides"
      sideNav={buildGuideSideNav()}
      breadcrumbs={[{ href: "/guide", label: "Guides" }, { label: "MHT-CET" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/mht-cet"
        headline="MHT-CET Guides — Strategy for Maths, Physics and Chemistry"
        description="Evidence-led strategy guides for MHT-CET Mathematics, Physics and Chemistry, built from every past paper from 2021 to 2025."
      />

      <GuideHero
        eyebrow="MHT-CET guides"
        title="Strategy guides for MHT-CET"
        subtitle={PAGE_INTRO}
      />

      <ResultsStrip examSlugs={["mht-cet"]} className="mb-6" />

      <GuideHubList guides={GUIDES} examDisplay="MHT-CET" restTitle="Other subjects" />
    </GuideShell>
  );
}
