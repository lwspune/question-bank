import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, BookOpen, Sigma } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";

export const revalidate = 86400;

const PAGE_INTRO =
  "Built from the live past-year question bank — every MHT-CET paper from 2021 to 2025, not a syllabus " +
  "summary. Pick the subject you're preparing.";

export const metadata: Metadata = {
  title: "MHT-CET Guides — Strategy for MHT-CET Maths and Physics",
  description:
    "Evidence-led strategy guides for MHT-CET Mathematics and Physics, built from every past paper from 2021 to 2025. Every claim is measured against the live past-year question bank.",
  alternates: { canonical: "/guide/mht-cet" },
};

type ExamGuide = {
  href: string;
  exam: string;
  title: string;
  blurb: string;
  qCount: number;
  yearWindow: string;
  highlights: string[];
};

/**
 * Two guides today: Mathematics (2026-08-22) and Physics (2026-09-28), both
 * Template C with tier strands. Chemistry is next and needs its own analysis:
 * it is ~3% HARD and flat, and it splits cleanly by execution mode (physical
 * chapters 59-71% numerical answers, organic and inorganic 3-17%).
 *
 * This list is hand-written because guides have no registry — see the note in
 * src/lib/guide/guidesNav.ts.
 */
const GUIDES: ExamGuide[] = [
  {
    href: "/guide/mht-cet-maths",
    exam: "MHT-CET Mathematics",
    title: "How MHT-CET Maths actually works",
    blurb:
      // Deliberately NOT phrased like the /guide picker's MHT-CET card: a
      // reader arrives here straight from that card, and two near-identical
      // sentences one click apart is exactly what reads as machine-written.
      "Every Mathematics shift from 2021 to 2025, all 2,175 questions. The short version: nothing is deducted for a wrong answer and you have 1.8 minutes a question, so the order you attempt in matters more than what you leave out.",
    qCount: 2228,
    yearWindow: "2021-2025 · 44 shifts",
    highlights: [
      "Cornerstone / Quick-Win / Long-tail tiers built on recent weightage, not lifetime averages",
      "21 chapter playbooks with per-subtopic %HARD and drill links",
      "The 2025 syllabus shift: Measures of Dispersion out, Conic Sections in",
      "Formula sheet and the distractor traps MHT-CET reuses",
    ],
  },
  {
    href: "/guide/mht-cet-physics",
    exam: "MHT-CET Physics",
    title: "How MHT-CET Physics actually works",
    blurb:
      "Every Physics paper from 2021 to 2025, all 2,098 questions. Physics shares a 90-minute paper with Chemistry, so the first decision is how to split the clock — then which cheap pages to bank before the hard ones.",
    qCount: 2098,
    yearWindow: "2021-2025 · 42 papers",
    highlights: [
      "Six quick-win chapters: 13 questions a paper at 14% HARD or less",
      "21 chapter playbooks with per-subtopic %HARD and drill links",
      "2025 moves: Gravitation and Ray Optics halved, Units and Measurement entered",
      "Formula sheet and the ratio, sign and figure traps the paper reuses",
    ],
  },
];

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
        headline="MHT-CET Guides — Strategy for MHT-CET Maths and Physics"
        description="Evidence-led strategy guides for MHT-CET Mathematics and Physics, built from every past paper from 2021 to 2025."
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
              : BookOpen;
          return (
            <li key={g.href}>
              <Link
                href={g.href}
                className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
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
