/**
 * Static content + numbers for the /guide/jee-mains-chemistry route.
 *
 * NOTHING HERE IS A TYPED COUNT. Every rate comes from `matrix.generated.ts`
 * (npm run jee:matrix -- --subject=Chemistry, chapter x YEAR from the live PUBLIC bank), and every
 * chapter's subtopics and notes slug come from the NOTES_CHAPTERS registry, so the guide and the
 * notes cannot name different pages.
 *
 * WHY YEARS, NOT PAPERS, and WHY NO %HARD: as for /guide/jee-mains-maths — a JEE source file holds
 * two shifts, so the grid is chapter x year and a rate is a share of its year scaled to a 25-question
 * paper; every JEE row is MODERATE, so difficulty sorts nothing.
 *
 * WHAT CHEMISTRY ADDS: the CALCULATION share (numeric answers + MCQs whose options are all numbers,
 * see isCalculationRow). It is the measure the strategy strands are drawn on.
 *
 * Eight chapters in the bank left the syllabus and have no notes. They stay in the table (slug and
 * notesHref null) so the bank is accounted for; strategy.ts lists them separately.
 */

import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { perPaper, windowPerPaper } from "@/lib/guide/jeeTrendsMatrix";
import { CHAPTER_MATRIX, YEARS } from "./matrix.generated";

export type GuideRoute = {
  slug: string; // path segment after /guide/jee-mains-chemistry (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes under /guide/jee-mains-chemistry, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How the Chemistry section of JEE Mains works: +4 for a right answer, −1 for a wrong one, one clock shared with Physics and Maths, and what kind of work each chapter asks for.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Three kinds of work: calculate, follow a reaction, recall a structure or fact. Which chapters sit in each, the order to take them on the paper, and how to handle the question formats.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "One playbook for every chapter carrying real weight on the paper: its pages, the skills in order, and the distractors it reuses.",
  },
  {
    slug: "reference",
    label: "Reference",
    blurb:
      "The formulas, reagents, orders and tables the paper tests, chapter by chapter, on one page.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "Physical chemistry has grown since the syllabus cut; eight chapters have left the paper. What moved since the early papers.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The distractors JEE reuses: the count from a list with one wrong item, the swapped reagent, the sign convention, and the blind numeric guess that costs a mark.",
  },
];

/** The paper as set from 2025: 25 Chemistry questions, all compulsory. */
export const PAPER = {
  questions: 25,
  mcq: 20,
  numeric: 5,
  marksPerCorrect: 4,
  penaltyPerWrong: 1,
  totalMarks: 100,
  /** One clock for the whole paper: Physics, Chemistry and Maths. */
  sharedMinutes: 180,
  /** The Chemistry share of that clock we suggest starting from. A budget, not a measurement. */
  suggestedMinutes: 50,
  /** suggestedMinutes / questions. */
  minutesPerQuestion: 2,
} as const;

/** Years in the grid's two comparison windows. */
export const EARLY = { from: 2021, to: 2024, label: "2021–24" } as const;
export const RECENT = { from: 2025, to: 2026, label: "2025–26" } as const;

export type ChapterRow = {
  /** Canonical DB chapter name. */
  chapter: string;
  /** The chapter's /notes/jee-mains-chemistry slug (also its playbook slug); null = left the syllabus. */
  slug: string | null;
  /** PUBLIC PYQs since 2021. */
  qCount: number;
  /** Numeric-answer (NAT) rows since 2021. */
  numeric: number;
  /** % of the chapter's rows with a numeric answer, rounded. */
  pctNumeric: number;
  /** Calculation rows: numeric answers + all-number MCQs. */
  calc: number;
  /** % of the chapter's rows that are calculations, rounded. The strand line uses it. */
  pctCalc: number;
  /** Questions per 25-question paper, 2021-2024 pooled. */
  earlyPerPaper: number;
  /** Questions per 25-question paper, 2025-2026 pooled. */
  recentPerPaper: number;
  /** The notes pages' subtopic names, in teaching order (empty with no notes). */
  subtopics: string[];
  notesHref: string | null;
};

const NOTES = getNotesChaptersForSubject("jee-mains-chemistry");

const pct = (n: number, d: number) => (d > 0 ? Math.round((100 * n) / d) : 0);

/** Every chapter in the grid, heaviest on the RECENT papers first. */
export const CHAPTER_TABLE: ChapterRow[] = CHAPTER_MATRIX.map((r) => {
  const reg = NOTES.find((c) => c.chapter.chapterName === r.chapter);
  const calc = r.calc ?? 0;
  return {
    chapter: r.chapter,
    slug: reg?.chapterSlug ?? null,
    qCount: r.total,
    numeric: r.numeric,
    pctNumeric: pct(r.numeric, r.total),
    calc,
    pctCalc: pct(calc, r.total),
    earlyPerPaper: windowPerPaper(r.counts, YEARS, EARLY.from, EARLY.to),
    recentPerPaper: windowPerPaper(r.counts, YEARS, RECENT.from, RECENT.to),
    subtopics: reg
      ? reg.chapter.subtopicOrder.map((s) => {
          const note = reg.notes[s];
          if (!note) throw new Error(`jee-mains-chemistry guide: ${r.chapter} lists unknown subtopic slug ${s}`);
          return note.subtopicName;
        })
      : [],
    notesHref: reg ? `/notes/jee-mains-chemistry/${reg.chapterSlug}` : null,
  };
}).sort((a, b) => b.recentPerPaper - a.recentPerPaper || b.qCount - a.qCount || a.chapter.localeCompare(b.chapter));

export function chapterRow(chapter: string): ChapterRow {
  const row = CHAPTER_TABLE.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`jee-mains-chemistry guide: no chapter row for "${chapter}"`);
  return row;
}

/** Per-year rates for one chapter, for the trends grid. */
export function yearRates(chapter: string): { year: number; perPaper: number }[] {
  const r = CHAPTER_MATRIX.find((x) => x.chapter === chapter);
  if (!r) throw new Error(`jee-mains-chemistry guide: no matrix row for "${chapter}"`);
  return YEARS.map((y, i) => ({ year: y.year, perPaper: perPaper(r.counts[i], y.total) }));
}

const totalQ = CHAPTER_MATRIX.reduce((s, r) => s + r.total, 0);
const totalNumeric = CHAPTER_MATRIX.reduce((s, r) => s + r.numeric, 0);
const totalCalc = CHAPTER_MATRIX.reduce((s, r) => s + (r.calc ?? 0), 0);

export const OVERVIEW = {
  /** PUBLIC PYQs since 2021 (the rows the rates use). */
  totalQ,
  totalNumeric,
  pctNumeric: pct(totalNumeric, totalQ),
  totalCalc,
  pctCalc: pct(totalCalc, totalQ),
  firstYear: YEARS[0].year,
  lastYear: YEARS[YEARS.length - 1].year,
  years: YEARS.length,
  chapters: CHAPTER_MATRIX.length,
  asOf: "2026-10-01",
};
