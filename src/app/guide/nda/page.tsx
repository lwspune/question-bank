import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, BookOpen, FlaskConical, Globe, Landmark, Languages, Leaf, Newspaper, Scale, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { buildGuideSideNav } from "@/lib/guide/guidesNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";

export const metadata: Metadata = {
  title: "NDA Guides — Strategy for Maths, English, Physics, Chemistry, Biology, Geography, History, Polity, Economics and Current Affairs",
  description:
    "Evidence-led strategy guides for NDA Mathematics, NDA English (GAT), NDA PART B Physics, NDA PART B Chemistry, NDA PART B Biology, NDA PART A Geography, NDA PART A History, NDA PART A Polity, NDA PART A Economics, and NDA Current Affairs. Every claim is measured against the live past-year question bank.",
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

/**
 * The ten cards render in one grid, so a reader takes the whole set in at a
 * glance. Until 2026-09-16 that set was a template: 9 of 10 blurbs opened "A
 * {N}-question analysis of…" and 7 of 10 closed with the identical six words
 * "and the trap shapes NDA reuses."
 *
 * Two rules when editing one of these, both load-bearing:
 *
 * 1. DO NOT re-add the "A {N}-question analysis of {subject}, {years}" opener.
 *    It is not merely repetitive, it is REDUNDANT — `qCount` and `yearWindow`
 *    render as chips one line below the blurb, so that sentence spends the
 *    card's most valuable words restating two fields already on screen.
 * 2. A blurb earns its place by saying what is true of THIS subject and no
 *    other. Shared openings and shared closings are what read as machine
 *    written; the reader is choosing between ten cards, so the difference is
 *    the only information the blurb can carry.
 *
 * Every figure below is one already asserted in that card's own `highlights`.
 */
const GUIDES: ExamGuide[] = [
  {
    href: "/guide/nda-maths",
    exam: "NDA Mathematics",
    title: "How NDA Maths actually works",
    blurb:
      "The only NDA subject big enough to reward cross-chapter thinking: eleven principles that cut across the syllabus, plus a Tier A / B / Skip call on every chapter, each backed by its own %HARD.",
    qCount: 2280,
    yearWindow: "2017–2026 · 19 papers",
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
      "Vocabulary and idioms you recall, grammar you rule-check, comprehension you reason through. Sixteen playbooks split along those lines, and a word-family list mined from the 270 words NDA has actually tested.",
    qCount: 950,
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
      "Physics is the one NDA subject that has genuinely got harder: 2% of questions were HARD in 2021, 37% by 2026. The strands and the drill posture here are built around that, not around syllabus order.",
    qCount: 473,
    yearWindow: "2017–2026 · 19 papers",
    highlights: [
      "Recall (Sound + Modern + Astronomy) / Apply (Light + Mechanics + Gravity) / Reason (E&M + Heat + Fluids) strands",
      "14 chapter playbooks — one per chapter with worked PYQs",
      "32-formula single-page revision compendium",
      "Trends: paper hardened sharply 2021→2026 (2% → 37% HARD)",
    ],
  },
  {
    href: "/guide/nda-chemistry",
    exam: "NDA PART B Chemistry",
    title: "How NDA Chemistry actually works",
    blurb:
      "Mostly recall, and unlike Physics it has not hardened at all, so a 2017 paper is worth as much as a 2026 one. The core of the guide is a fifty-compound name/formula/use reference in six themed clusters.",
    qCount: 277,
    yearWindow: "2017–2026 · 19 papers",
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
      "Four questions in ten years have been rated HARD. Biology is 82% straight recall, so this guide is mostly a fifty-fact reference: diseases to pathogens, vitamins to deficiencies, hormones to glands.",
    qCount: 199,
    yearWindow: "2017–2026 · 19 papers",
    highlights: [
      "Recall (Human Physiology + Cell Biology + Microbiology + Biodiversity + Genetics) / Apply (Plant Biology + Reproduction) / Verify (Ecology + Biochemistry) strands",
      "9 chapter playbooks — one per chapter with worked PYQs",
      "50-fact reference (diseases ↔ pathogens, vitamins ↔ deficiencies, hormones ↔ glands, scientists ↔ discoveries)",
      "Trends: paper has NOT hardened — only 4 HARDs across 199 q over 10 years",
    ],
  },
  {
    href: "/guide/nda-geography",
    exam: "NDA PART A Geography",
    title: "How NDA Geography actually works",
    blurb:
      "Rivers to states, peaks to ranges, crops to producer states. Sixty-two such pairings carry most of the marks, and the seven playbooks tell you which of them a given paper is likely to reach for.",
    qCount: 367,
    yearWindow: "2017–2026 · 19 papers",
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
      "Modern India alone is 47% of everything NDA has asked. That single fact sets the structure: one cornerstone chapter, two you learn for recall, one quick win, and a ninety-five-entry timeline underneath all four.",
    qCount: 269,
    yearWindow: "2017–2026 · 19 papers",
    highlights: [
      "Cornerstone (Modern India alone — 47% of bank) / Foundation Recall (Ancient + Medieval India) / Quick-Win (World History) tier-strands",
      "4 chapter playbooks — one per chapter with worked PYQs",
      "~95-entry timeline + named pairs (Era timeline, Rulers ↔ dynasty, Reformers ↔ movement, Scholars ↔ texts, British Acts ↔ year)",
      "Trends: paper has NOT consistently hardened, but chapter mix shifted (Modern dominated 2017–20, Ancient surged 2022–24)",
    ],
  },
  {
    href: "/guide/nda-polity",
    exam: "NDA PART A Polity",
    title: "How NDA Polity actually works",
    blurb:
      "Small subject, sharply split. Government Structure is 40% of the bank and worth learning properly; World Polity is 42% HARD and worth a decision about whether you attempt it at all. Roughly eighty Articles, Amendments and Bodies sit behind both.",
    qCount: 99,
    yearWindow: "2017–2026 · 19 papers",
    highlights: [
      "Cornerstone (Government Structure — 40% of bank) / Foundation Recall (Indian Constitution + FR/DPSP) / Specialist Wildcard (World Polity — 42% HARD) tier-strands",
      "4 chapter playbooks — one per chapter with worked PYQs",
      "~80-entry reference (Key Articles ↔ subject, Constitutional Amendments ↔ year ↔ theme, Constitutional Bodies ↔ function ↔ Article, Parts ↔ Schedules ↔ content)",
      "Trends: paper has NOT consistently hardened, but the completed 2026 pair is the hardest year on record (37%)",
    ],
  },
  {
    href: "/guide/nda-economics",
    exam: "NDA PART A Economics",
    title: "How NDA Economics actually works",
    blurb:
      "Twenty-five questions in ten years, and 42% of them HARD. This is a one-page guide because the honest advice is short: learn the twelve Five Year Plans, target three or four marks, and don't let it eat time from Geography or History.",
    qCount: 25,
    yearWindow: "2017–2026 · 17 papers",
    highlights: [
      "Single-page guide — bank too thin for a multi-route structure",
      "75% of bank is Five Year Plans — 12-plan timeline as the recall anchor",
      "41.7% HARD bank-wide — densest of any NDA subject, distractors are engineered",
      "Honest cap: ~6 marks/paper, target 3–4. Don't let it eat time from Geography/History.",
    ],
  },
  {
    href: "/guide/nda-current-affairs",
    exam: "NDA Current Affairs",
    title: "How NDA Current Affairs actually works",
    blurb:
      "Ninety per cent of these questions are about something that happened within a year of the paper, which means the facts expire and the shapes don't. So this page teaches the eight themes NDA keeps returning to, with a checklist for each, and sends you elsewhere for this year's facts.",
    qCount: 191,
    yearWindow: "2017–2026 · 19 papers",
    highlights: [
      "Single-page Template D — theme-prep-checklist for a short-half-life subject",
      "8 anchor themes (5+ year recurrence) + 16 recurring + 7 occasional",
      "Drill the bank for SHAPE; harvest THIS YEAR's facts from an external compendium",
      "~10 q/paper · ~40 marks max · target ~24 marks at 80% on 7 attempts",
    ],
  },
];

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
            title="Strategy guides for NDA Maths, English, Physics, Chemistry, Biology, Geography, History, Polity, Economics and Current Affairs"
            subtitle="One guide per NDA subject, ten in all, each built from that subject's own past papers rather than from the syllabus. Pick the one you're preparing."
          />
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
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
                        : g.href.includes("polity")
                          ? Scale
                          : g.href.includes("economics")
                            ? TrendingUp
                            : g.href.includes("current-affairs")
                              ? Newspaper
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
