import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, BookOpen, FlaskConical, Globe, Landmark, Languages, Leaf } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";

export const metadata: Metadata = {
  title: "NDA Guides — Strategy for Maths, English, Physics, Chemistry, Biology, Geography and History",
  description:
    "Evidence-led strategy guides for NDA Mathematics, NDA English (GAT), NDA PART B Physics, NDA PART B Chemistry, NDA PART B Biology, NDA PART A Geography, and NDA PART A History. Every claim is measured against the live past-year question bank.",
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
  {
    href: "/guide/nda-physics",
    exam: "NDA PART B Physics",
    title: "How NDA Physics actually works",
    blurb:
      "A 449-question analysis of every PART B Physics paper, 2017–2026. Recall vs Apply vs Reason strands with a %HARD-aware drill posture, 14 chapter playbooks, formula compendium, and the trap shapes NDA reuses.",
    qCount: 449,
    yearWindow: "2017–2026 · 18 papers",
    highlights: [
      "Recall (Sound + Modern + Astronomy) / Apply (Light + Mechanics + Gravity) / Reason (E&M + Heat + Fluids) strands",
      "14 chapter playbooks — one per chapter with worked PYQs",
      "32-formula single-page revision compendium",
      "Trends: paper hardened 22× per question 2021→2026 (2% → 44% HARD)",
    ],
  },
  {
    href: "/guide/nda-chemistry",
    exam: "NDA PART B Chemistry",
    title: "How NDA Chemistry actually works",
    blurb:
      "A 262-question analysis of every PART B Chemistry paper, 2017–2026. Recall vs Rule vs Calculate strands matched to a Recall-heavy bank, 12 chapter playbooks, 50-compound reference, and the trap shapes NDA reuses.",
    qCount: 262,
    yearWindow: "2017–2026 · 18 papers",
    highlights: [
      "Recall (Carbon + Matter + Industrial + Metals + Hydrogen + Everyday) / Rule (Atomic Structure + Acids/Bases + Reactions + Bonding) / Calculate (Mole) strands",
      "12 chapter playbooks — one per chapter with worked PYQs",
      "50-compound name↔formula↔use reference in 6 themed clusters",
      "Trends: paper has NOT hardened (UNLIKE Physics) — drill all 10 years equally",
    ],
  },
  {
    href: "/guide/nda-biology",
    exam: "NDA PART B Biology",
    title: "How NDA Biology actually works",
    blurb:
      "A 190-question analysis of every PART B Biology paper, 2017–2026. Recall vs Apply vs Verify strands matched to an 82%-recall bank, 9 chapter playbooks, 50-fact reference, and the trap shapes NDA reuses.",
    qCount: 190,
    yearWindow: "2017–2026 · 18 papers",
    highlights: [
      "Recall (Human Physiology + Cell Biology + Microbiology + Biodiversity + Genetics) / Apply (Plant Biology + Reproduction) / Verify (Ecology + Biochemistry) strands",
      "9 chapter playbooks — one per chapter with worked PYQs",
      "50-fact reference (diseases ↔ pathogens, vitamins ↔ deficiencies, hormones ↔ glands, scientists ↔ discoveries)",
      "Trends: paper has NOT hardened — only 4 HARDs across 190 q over 10 years",
    ],
  },
  {
    href: "/guide/nda-geography",
    exam: "NDA PART A Geography",
    title: "How NDA Geography actually works",
    blurb:
      "A 345-question analysis of every PART A Geography paper, 2017–2026. Recall vs Apply vs Verify strands, 7 chapter playbooks, 62-fact reference, and the trap shapes NDA reuses.",
    qCount: 345,
    yearWindow: "2017–2026 · 18 papers",
    highlights: [
      "Recall (Indian Geography Economy + Indian Geography Physical + World/Human) / Apply (Climatology + Earth's Structure) / Verify (Earth in Space + Oceanography) strands",
      "7 chapter playbooks — one per chapter with worked PYQs",
      "62-fact reference (Indian rivers ↔ states, mountain peaks ↔ ranges, mineral/crop ↔ producer states, local winds ↔ regions)",
      "Trends: paper has NOT consistently hardened — drill all 10 years equally",
    ],
  },
  {
    href: "/guide/nda-history",
    exam: "NDA PART A History",
    title: "How NDA History actually works",
    blurb:
      "A 260-question analysis of every PART A History paper, 2017–2026. Cornerstone vs Foundation Recall vs Quick-Win chapter-tier strands, 4 chapter playbooks, ~95-entry timeline + named-pair reference, and the trap shapes NDA reuses.",
    qCount: 260,
    yearWindow: "2017–2026 · 18 papers",
    highlights: [
      "Cornerstone (Modern India alone — 47% of bank) / Foundation Recall (Ancient + Medieval India) / Quick-Win (World History) tier-strands",
      "4 chapter playbooks — one per chapter with worked PYQs",
      "~95-entry timeline + named pairs (Era timeline, Rulers ↔ dynasty, Reformers ↔ movement, Scholars ↔ texts, British Acts ↔ year)",
      "Trends: paper has NOT consistently hardened, but chapter mix shifted (Modern dominated 2017–20, Ancient surged 2022–24)",
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
          headline="NDA Guides — Strategy for Maths, English, Physics, Chemistry, Biology and Geography"
          description="Evidence-led strategy guides for NDA Mathematics, NDA English (GAT), NDA PART B Physics, NDA PART B Chemistry, NDA PART B Biology, and NDA PART A Geography. Every claim is measured against the live past-year question bank."
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
            title="Strategy guides for NDA Maths, English, Physics, Chemistry, Biology, Geography and History"
            subtitle="Seven evidence-led guides — one per subject — built from the live past-year question bank. Pick the subject you're preparing."
          />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {GUIDES.map((g) => {
            const Icon = g.href.includes("english")
              ? Languages
              : g.href.includes("physics")
                ? Atom
                : g.href.includes("chemistry")
                  ? FlaskConical
                  : g.href.includes("biology")
                    ? Leaf
                    : g.href.includes("geography")
                      ? Globe
                      : g.href.includes("history")
                        ? Landmark
                        : BookOpen;
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
            All six guides are built the same way: pull every PUBLIC question
            from the bank, classify it, look at the patterns. Every &ldquo;drill
            the N questions&rdquo; link goes to the exact set we&rsquo;re
            talking about. No claim survives that the data doesn&rsquo;t back up.
          </p>
          <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
            Each guide is shaped by its bank, not by a shared template — open
            any guide above to see the structure that matches that
            subject&rsquo;s past-year question shape.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
