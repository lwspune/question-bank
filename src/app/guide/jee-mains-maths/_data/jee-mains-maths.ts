/**
 * Static content + numbers for the /guide/jee-mains-maths route.
 *
 * NOTHING HERE IS A TYPED COUNT. Every rate comes from `matrix.generated.ts` (npm run jee:matrix,
 * chapter x YEAR from the live PUBLIC bank), and every chapter's subtopics and notes slug come from
 * the NOTES_CHAPTERS registry, so the guide and the notes cannot name different pages.
 *
 * WHY YEARS, NOT PAPERS. A JEE source file holds two shifts from 2022 on, so a paper cannot be keyed
 * by file, and the number of sittings changes year to year. A chapter's SHARE of its year's questions
 * does compare, and scaled to a 25-question paper it is the rate this guide prints (`perPaper`).
 *
 * WHY NO %HARD. Every JEE row in the bank is MODERATE: the papers are ungraded. So unlike the CDS and
 * MHT-CET guides, tiers are set by recent weight alone (2025-2026, the two years of the current
 * 25-question paper), and the chapter table shows the numeric-answer share instead.
 */

import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { perPaper, windowPerPaper } from "@/lib/guide/jeeTrendsMatrix";
import { CHAPTER_MATRIX, EXCLUDED_BEFORE_2021, YEARS } from "./matrix.generated";

export type GuideRoute = {
  slug: string; // path segment after /guide/jee-mains-maths (or "" for landing)
  label: string;
  blurb: string;
};

/** The 6 main routes under /guide/jee-mains-maths, in reading order. */
export const ROUTES: GuideRoute[] = [
  {
    slug: "",
    label: "Overview",
    blurb:
      "How the Maths section of JEE Mains actually works: +4 for a right answer, −1 for a wrong one, one clock shared with Physics and Chemistry, and what every recent shift reveals.",
  },
  {
    slug: "strategy",
    label: "Strategy",
    blurb:
      "Four chapters carry the paper. Which to learn first, which answers to guess and which to leave, and how long to give the section.",
  },
  {
    slug: "playbooks",
    label: "Playbooks",
    blurb:
      "One playbook for every chapter still on the paper: its pages, the skills in order, and the distractors it reuses.",
  },
  {
    slug: "formulas",
    label: "Formulas",
    blurb: "The formulas and results the paper actually tests, chapter by chapter, on one page.",
  },
  {
    slug: "trends",
    label: "Trends",
    blurb:
      "Conic Sections and Relations and Functions have grown; Application of Derivatives has shrunk; three chapters have left the paper. What moved since the early papers.",
  },
  {
    slug: "traps",
    label: "Traps",
    blurb:
      "The distractors JEE reuses: the shifted conic, the non-transitive relation, the negative greatest integer, and the blind numeric guess that costs a mark.",
  },
];

/** The paper as set from 2025: 25 Maths questions, all compulsory. */
export const PAPER = {
  questions: 25,
  mcq: 20,
  numeric: 5,
  marksPerCorrect: 4,
  penaltyPerWrong: 1,
  totalMarks: 100,
  /** One clock for the whole paper: Physics, Chemistry and Maths. */
  sharedMinutes: 180,
  /** The Maths share of that clock we suggest starting from. A budget, not a measurement. */
  suggestedMinutes: 60,
  /** suggestedMinutes / questions. */
  minutesPerQuestion: 2.4,
} as const;

/** Years in the grid's two comparison windows. */
export const EARLY = { from: 2021, to: 2024, label: "2021–24" } as const;
export const RECENT = { from: 2025, to: 2026, label: "2025–26" } as const;

export type ChapterRow = {
  /** Canonical DB chapter name. */
  chapter: string;
  /** The chapter's /notes/jee-mains-maths slug; also its playbook slug. */
  slug: string;
  /** PUBLIC PYQs since 2021. */
  qCount: number;
  /** Numeric-answer (NAT) rows since 2021. */
  numeric: number;
  /** % of the chapter's rows with a numeric answer, rounded. */
  pctNumeric: number;
  /** Questions per 25-question paper, 2021-2024 pooled. */
  earlyPerPaper: number;
  /** Questions per 25-question paper, 2025-2026 pooled. The number the tiers use. */
  recentPerPaper: number;
  /** The notes pages' subtopic names, in teaching order. */
  subtopics: string[];
  notesHref: string;
};

const NOTES = getNotesChaptersForSubject("jee-mains-maths");

function notesFor(chapter: string) {
  const reg = NOTES.find((c) => c.chapter.chapterName === chapter);
  if (!reg) throw new Error(`jee-mains-maths guide: no notes chapter named "${chapter}"`);
  return reg;
}

const pct = (n: number, d: number) => (d > 0 ? Math.round((100 * n) / d) : 0);

/** Every chapter in the grid, heaviest on the RECENT papers first. */
export const CHAPTER_TABLE: ChapterRow[] = CHAPTER_MATRIX.map((r) => {
  const reg = notesFor(r.chapter);
  return {
    chapter: r.chapter,
    slug: reg.chapterSlug,
    qCount: r.total,
    numeric: r.numeric,
    pctNumeric: pct(r.numeric, r.total),
    earlyPerPaper: windowPerPaper(r.counts, YEARS, EARLY.from, EARLY.to),
    recentPerPaper: windowPerPaper(r.counts, YEARS, RECENT.from, RECENT.to),
    subtopics: reg.chapter.subtopicOrder.map((s) => {
      const note = reg.notes[s];
      if (!note) throw new Error(`jee-mains-maths guide: ${r.chapter} lists unknown subtopic slug ${s}`);
      return note.subtopicName;
    }),
    notesHref: `/notes/jee-mains-maths/${reg.chapterSlug}`,
  };
}).sort((a, b) => b.recentPerPaper - a.recentPerPaper || b.qCount - a.qCount || a.chapter.localeCompare(b.chapter));

export function chapterRow(chapter: string): ChapterRow {
  const row = CHAPTER_TABLE.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`jee-mains-maths guide: no chapter row for "${chapter}"`);
  return row;
}

/** Per-year rates for one chapter, for the trends grid. */
export function yearRates(chapter: string): { year: number; perPaper: number }[] {
  const r = CHAPTER_MATRIX.find((x) => x.chapter === chapter);
  if (!r) throw new Error(`jee-mains-maths guide: no matrix row for "${chapter}"`);
  return YEARS.map((y, i) => ({ year: y.year, perPaper: perPaper(r.counts[i], y.total) }));
}

const totalQ = CHAPTER_MATRIX.reduce((s, r) => s + r.total, 0);
const totalNumeric = CHAPTER_MATRIX.reduce((s, r) => s + r.numeric, 0);

export const OVERVIEW = {
  /** PUBLIC PYQs since 2021 (the rows the rates use). */
  totalQ,
  totalNumeric,
  pctNumeric: pct(totalNumeric, totalQ),
  /** Reprints before 2021, kept in the bank but left out of every rate. */
  excluded: EXCLUDED_BEFORE_2021,
  firstYear: YEARS[0].year,
  lastYear: YEARS[YEARS.length - 1].year,
  years: YEARS.length,
  chapters: CHAPTER_MATRIX.length,
  asOf: "2026-09-30",
};
