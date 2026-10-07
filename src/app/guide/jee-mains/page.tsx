import type { Metadata } from "next";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";
import { getSubjectGuides } from "@/lib/guide/guideCatalog";
import GuideHubList from "@/app/guide/_components/GuideHubList";

export const revalidate = 86400;

const PAGE_INTRO =
  "Built from the live past-year question bank — every JEE Mains shift from 2021 to 2026, not a syllabus " +
  "summary. Mathematics is live; Physics and Chemistry guides are not written yet.";

export const metadata: Metadata = {
  title: "JEE Mains Guides — Strategy for Mathematics",
  description:
    "Evidence-led strategy guide for JEE Mains Mathematics, built from every shift from 2021 to 2026. Every claim is measured against the live past-year question bank.",
  alternates: { canonical: "/guide/jee-mains" },
};

/** The cards live in src/lib/guide/guideCatalog.ts. */
const GUIDES = getSubjectGuides("jee-mains");

export default function JeeMainsGuideIndex() {
  return (
    <GuideShell
      guideTitle="Strategy Guides"
      sideNav={buildGuideSideNav()}
      breadcrumbs={[{ href: "/guide", label: "Guides" }, { label: "JEE Mains" }]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/jee-mains"
        headline="JEE Mains Guides — Strategy for Mathematics"
        description="Evidence-led strategy guide for JEE Mains Mathematics, built from every shift from 2021 to 2026."
      />

      <GuideHero
        eyebrow="JEE Mains guides"
        title="Strategy guides for JEE Mains"
        subtitle={PAGE_INTRO}
      />

      <GuideHubList guides={GUIDES} examDisplay="JEE Mains" restTitle="Other subjects" />
    </GuideShell>
  );
}
