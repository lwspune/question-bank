import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Sigma } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";

export const metadata: Metadata = {
  title: "MHT-CET Guides — Strategy for MHT-CET Mathematics",
  description:
    "Evidence-led strategy guides for MHT-CET, built from 2,228 past-year Mathematics questions across 45 shifts (2021-2025). Every claim is measured against the live past-year question bank.",
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
 * One guide today (Mathematics). Physics and Chemistry are the natural next
 * two — their banks are comparable in size (2,221 and 2,165 PYQ) but their
 * shapes differ sharply from Maths, so each needs its own template analysis
 * rather than a copy of this one: MHT-CET Chemistry is 3.3% HARD and flat,
 * where Maths is 38.4% and steeply tiered.
 */
const GUIDES: ExamGuide[] = [
  {
    href: "/guide/mht-cet-maths",
    exam: "MHT-CET Mathematics",
    title: "How MHT-CET Maths actually works",
    blurb:
      "A 2,228-question analysis of every Mathematics shift from 2021 to 2025. Six chapters carry 47% of the paper, there is no negative marking, and you get 1.8 minutes per question — so the whole game is order and time, not selection.",
    qCount: 2228,
    yearWindow: "2021-2025 · 45 shifts",
    highlights: [
      "Cornerstone / Quick-Win / Long-tail tiers built on recent weightage, not lifetime averages",
      "22 chapter playbooks with per-subtopic %HARD and drill links",
      "The 2025 syllabus shift: Measures of Dispersion out, Conic Sections in",
      "Formula sheet and the distractor traps MHT-CET reuses",
    ],
  },
];

export default function MhtCetGuideIndex() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/guide/mht-cet"
          headline="MHT-CET Guides — Strategy for MHT-CET Mathematics"
          description="Evidence-led strategy guides for MHT-CET, built from 2,228 past-year Mathematics questions across 45 shifts (2021-2025). Every claim is measured against the live past-year question bank."
        />
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ArrowRight className="h-3 w-3" aria-hidden />
              <Link href="/guide" className="hover:text-foreground">
                Guides
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ArrowRight className="h-3 w-3" aria-hidden />
              <span className="font-medium text-foreground">MHT-CET</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 sm:mt-8">
          <GuideHero
            eyebrow="MHT-CET Guides"
            title="Strategy guides for MHT-CET"
            subtitle="Built from the live past-year question bank — 45 shifts of real papers, not a syllabus summary. Pick the subject you're preparing."
          />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {GUIDES.map((g) => {
            const Icon = g.href.includes("maths") ? Sigma : BookOpen;
            return (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent"
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
      </main>
      <Footer />
    </>
  );
}
