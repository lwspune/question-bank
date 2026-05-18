import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Languages } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";

export const metadata: Metadata = {
  title: "NDA Guides — Strategy for Maths and English",
  description:
    "Evidence-led strategy guides for NDA Mathematics and NDA English (GAT). Every claim is measured against the live past-year question bank.",
  alternates: { canonical: "/guide/nda" },
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

const GUIDES: ExamGuide[] = [
  {
    href: "/guide/nda-maths",
    exam: "NDA Mathematics",
    title: "How NDA Maths actually works",
    blurb:
      "A 2,160-question analysis of every Mathematics paper from 2017 to 2026. Principles, strategy, compound tricks, year-on-year drift, and the distractor traps.",
    qCount: 2160,
    yearWindow: "2017–2026 · 18 papers",
    highlights: [
      "11 cross-chapter principles with DB-tagged drill links",
      "Tier A / B / Skip strategy backed by per-chapter %HARD",
      "Year-by-year drift across 15 principles",
      "Distractor traps measured against the live bank",
    ],
  },
  {
    href: "/guide/nda-english",
    exam: "NDA English (GAT)",
    title: "How NDA English actually works",
    blurb:
      "A 900-question analysis of the English half of GAT, 2017–2026. Recall vs Rule vs Reason buckets, 16 chapter playbooks, vocabulary word families, and the trap shapes NDA reuses.",
    qCount: 900,
    yearWindow: "2017–2026 · 10 years",
    highlights: [
      "Recall (Vocab + Idioms) / Rule (Grammar + Errors) / Reason (RC + Cloze + PQRS + FIB) strategy",
      "16 chapter-and-subtopic playbooks with worked PYQs",
      "Vocabulary word families mined from 270 PYQ-tested words",
      "Trends: Grammar exploded post-2024, Spotting Errors went quiet",
    ],
  },
];

export default function NdaGuideIndex() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/guide/nda"
          headline="NDA Guides — Strategy for Maths and English"
          description="Evidence-led strategy guides for NDA Mathematics and NDA English (GAT). Every claim is measured against the live past-year question bank."
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
              <span className="font-medium text-foreground">NDA</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 sm:mt-8">
          <GuideHero
            eyebrow="NDA Guides"
            title="Strategy guides for NDA Maths and NDA English"
            subtitle="Two evidence-led guides — one per subject — built from the live past-year question bank. Pick the subject you're preparing."
          />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {GUIDES.map((g) => {
            const Icon = g.href.includes("english") ? Languages : BookOpen;
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
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {g.exam}
                      </p>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {g.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
                    {g.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 font-medium tabular-nums">
                      {g.qCount.toLocaleString("en-IN")} questions
                    </span>
                    <span className="text-muted-foreground">{g.yearWindow}</span>
                  </div>
                  <ul className="mt-4 space-y-1.5 font-serif text-sm text-muted-foreground">
                    {g.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
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

        <section className="mt-12 rounded-lg border bg-muted/30 p-5">
          <h2 className="text-base font-semibold tracking-tight">
            What makes these different
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            Both guides are built the same way: pull every PUBLIC question from
            the bank, classify it, look at the patterns. Every &ldquo;drill the
            N questions&rdquo; link goes to the exact set we&rsquo;re talking
            about. No claim survives that the data doesn&rsquo;t back up.
          </p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
            The two guides are also structured <em>differently</em> on purpose.
            NDA Maths has cross-chapter principles (AM-GM, Vieta), so the Maths
            guide leads with those. NDA English doesn&rsquo;t — each English
            chapter is its own question type — so the English guide leads with
            16 chapter playbooks instead.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
