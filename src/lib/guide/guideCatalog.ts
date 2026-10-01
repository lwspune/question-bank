/**
 * The subject-level guide registry: every exam's /guide hub cards, in one place.
 *
 * Before 2026-09-29 each hub (/guide/nda, /guide/mht-cet) hardcoded its own
 * card list, so nothing tied a hub to EXAM_REGISTRY.guidesPath and a third exam
 * meant a third hand-written list. The hubs keep their own markup (the NDA and
 * MHT-CET cards are styled differently); only the DATA lives here.
 * tests/guides-catalog.test.ts keeps this and EXAM_REGISTRY in step both ways
 * and checks every href is a real route.
 *
 * Pure data (no React), so tests and server code can both import it.
 */
import type { ExamSlug } from "@/lib/exam/examContext";

export type SubjectGuideCard = {
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
const NDA_GUIDES: SubjectGuideCard[] = [
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

/**
 * All three subjects: Mathematics (2026-08-22) and Physics (2026-09-28), both
 * Template C with tier strands, and Chemistry (2026-09-28), whose strands are
 * execution modes — it is ~3% HARD and flat, and it splits cleanly by how a
 * question is answered (physical chapters mostly numerical answers).
 */
const MHT_CET_GUIDES: SubjectGuideCard[] = [
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
  {
    href: "/guide/mht-cet-chemistry",
    exam: "MHT-CET Chemistry",
    title: "How MHT-CET Chemistry actually works",
    blurb:
      "Every Chemistry paper from 2021 to 2025, all 2,074 questions. Only 3% of them are HARD, so the axis is speed: answer the recall and reaction questions on sight, calculate after, and hand the saved minutes to Physics.",
    qCount: 2074,
    yearWindow: "2021-2025 · 42 papers",
    highlights: [
      "Three strands by how a question is answered: Recall, Reactions, Calculate",
      "23 chapter playbooks with the named reactions and formulas each turns on",
      "2025: Structure of Atom halved, three chapters rose, EASY fell to 42%",
      "One reference page of reactions, reagents and formulas",
    ],
  },
];

const CDS_GUIDES: SubjectGuideCard[] = [
  {
    href: "/guide/cds-maths",
    exam: "CDS Elementary Mathematics",
    title: "How CDS Maths actually works",
    blurb:
      "Five chapters are nearly half the paper, and a wrong answer costs a third of a mark. So the guide is about what to attempt: which pages of each chapter are cheap, where the HARD questions pool, and when a guess is worth making.",
    qCount: 2096,
    yearWindow: "2016–2026 · 21 papers",
    highlights: [
      "Cornerstone (Trigonometry, Number System, the two Mensurations, Triangles) / Quick-Win / Selective tier-strands",
      "22 chapter playbooks, each linked to full teaching notes",
      "The guessing rule: a blind guess is worth 0; rule out one option and it is worth +1/9",
      "Trends: Trigonometry and Number System up to 13 questions a paper; Linear Equations almost gone",
    ],
  },
];

const JEE_MAINS_GUIDES: SubjectGuideCard[] = [
  {
    href: "/guide/jee-mains-maths",
    exam: "JEE Mains Mathematics",
    title: "How JEE Mains Maths actually works",
    blurb:
      "Four chapters carry a third of the paper, and a wrong answer costs a mark on multiple-choice and numeric questions alike. So the guide is about what to learn first, which answers to guess and which to leave blank.",
    qCount: 3556,
    yearWindow: "2021–2026 · every shift",
    highlights: [
      "Cornerstone (Conic Sections, 3D Geometry, Relations and Functions, Sequences and Series) / Core / Long-tail tiers, set by the 2025–26 papers",
      "24 chapter playbooks, each linked to full teaching notes",
      "The guessing rule: a blind MCQ guess is worth +0.25, a blind numeric guess close to −1",
      "Trends: Conic Sections and Relations and Functions up; three chapters gone from the paper",
    ],
  },
  {
    href: "/guide/jee-mains-chemistry",
    exam: "JEE Mains Chemistry",
    title: "How JEE Mains Chemistry actually works",
    blurb:
      "Every chapter still on the paper sets one or two questions, so weight decides little. What differs is the work: calculate, follow a reaction, or recall a structure or fact. The guide sorts the chapters that way and sets the order to take the paper.",
    qCount: 3455,
    yearWindow: "2021–2026 · every shift",
    highlights: [
      "Calculate (physical) / Reactions (organic) / Structure and recall strands, drawn on a measured calculation share",
      "19 chapter playbooks, each linked to full teaching notes",
      "How to work the formats: two statements, match the list, and the count from a list",
      "Trends: physical chemistry up from 6 to 9 questions a paper as eight chapters left the syllabus",
    ],
  },
];

export const GUIDE_CATALOG: Partial<Record<ExamSlug, SubjectGuideCard[]>> = {
  nda: NDA_GUIDES,
  "mht-cet": MHT_CET_GUIDES,
  cds: CDS_GUIDES,
  "jee-mains": JEE_MAINS_GUIDES,
};

/** The subject guides of one exam, in hub order; empty when it has none. */
export function getSubjectGuides(slug: ExamSlug): SubjectGuideCard[] {
  return GUIDE_CATALOG[slug] ?? [];
}

/**
 * Whether /guide/<subjectRoute> exists. The notes pages link their subject's strategy
 * guide; before this they linked it unconditionally, so a notes subject without a guide
 * (JEE Chemistry) carried a 404 on every page.
 */
export function hasSubjectGuide(subjectRoute: string): boolean {
  const href = `/guide/${subjectRoute}`;
  return Object.values(GUIDE_CATALOG).some((cards) => cards?.some((c) => c.href === href));
}
