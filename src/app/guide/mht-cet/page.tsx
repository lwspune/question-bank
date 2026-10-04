import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, BookOpen, FlaskConical, Sigma } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";
import { getSubjectGuides } from "@/lib/guide/guideCatalog";

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

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {GUIDES.map((g) => {
          const Icon = g.href.includes("maths")
            ? Sigma
            : g.href.includes("physics")
              ? Atom
              : g.href.includes("chemistry")
                ? FlaskConical
                : BookOpen;
          return (
            <li key={g.href}>
              <Link
                href={g.href}
                className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg icon-tile">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {g.exam}
                    </p>
                    <h2 className="text-lg font-semibold leading-tight">
                      {g.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">{g.blurb}</p>

                <p className="mt-4 text-xs font-medium text-muted-foreground">
                  {g.qCount.toLocaleString()} questions · {g.yearWindow}
                </p>

                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {g.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden className="text-brand-accent">
                        ·
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                  Open the guide
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </GuideShell>
  );
}
