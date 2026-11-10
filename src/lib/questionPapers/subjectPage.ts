/**
 * One board subject's past papers, /question-papers/<exam>/<subject>
 * (2026-11-10): the papers by year, with the facts a student searches for
 * around them. The board counterpart of the mock past-papers page
 * (lib/mocks/pastPapersPage.ts), whose year folding and counts it reuses.
 *
 * WHY THE AVERAGES PICK THEIR PAPERS. Two things in the stored papers would
 * skew "marks a paper by chapter" (measured 2026-11-10):
 *  - CBSE prints about three sets of each paper, and the sets of one paper
 *    share only 38-81% of their questions (64% on average, Class 12
 *    Chemistry), so counting every set would weigh a year by its set count.
 *    One set per paper (the lowest number) is counted.
 *  - The 2022 CBSE papers were half-syllabus term papers of 35 or 40 marks;
 *    only papers with the newest paper's total are averaged.
 * An "OR" alternative is a choice, not more marks, so it is never counted:
 * the same rule as the paper's own total (manifest.marksTotal).
 *
 * Pure: no React, no DB. The loader is ./subjectStats.ts. Spec:
 * tests/board-subject-page.test.ts.
 */
import type { PaperListing } from "./listing";
import { monthRank } from "@/lib/mocks/catalogue";
import { orList, paperCountLabel, type FaqItem } from "@/lib/mocks/pastPapersPage";

/** A paper needs this many papers on the current pattern before its chapter averages mean much. */
export const MIN_CHAPTER_PAPERS = 4;
/** Chapters shown in "marks a paper by chapter". */
export const CHAPTER_ROWS = 8;

/** What the page reads beyond the listing: every item's marks and chapter, sections, reader links. */
export type SubjectStats = {
  items: {
    paperId: string;
    /** Null on a part of a question: the question above carries the marks. */
    marks: number | null;
    alternativeTo: number | null;
    questionId: string;
    chapter: string | null;
    /** The paper's section key ("D"), as stored on the item. */
    section: string | null;
    /** Shared by the parts of one case study: each part is its own item. */
    caseKey: string | null;
  }[];
  /** Sections as stored on each paper, by paper id. */
  sections: Record<string, { key: string; title: string; note: string }[]>;
  /** Chapter name -> its /board chapter page, for chapters the board reader lists. */
  chapterHrefs: Record<string, string>;
};

/** "CBSE Class 12 Chemistry 2026 papers": never a bare year. */
export function boardYearHeading(examDisplay: string, subject: string, year: number): string {
  return `${examDisplay} ${subject} ${year} papers`;
}

/** "2 papers, 6 sets" where the board prints sets; "1 paper" otherwise. */
export function yearCountLabel(groups: readonly { sets: readonly unknown[] }[]): string {
  const sets = groups.reduce((s, g) => s + g.sets.length, 0);
  return sets > groups.length ? `${paperCountLabel(groups.length)}, ${sets} sets` : paperCountLabel(groups.length);
}

/** "3 hours", "1 hour", or "90 minutes". */
export function hoursLabel(minutes: number): string {
  if (minutes % 60 !== 0) return `${minutes} minutes`;
  const h = minutes / 60;
  return `${h} ${h === 1 ? "hour" : "hours"}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function newestFirst(a: PaperListing, b: PaperListing): number {
  return (
    b.year - a.year ||
    monthRank(b.sitting) - monthRank(a.sitting) ||
    a.groupSlug.localeCompare(b.groupSlug, "en", { numeric: true }) ||
    (a.setNumber ?? 0) - (b.setNumber ?? 0)
  );
}

function newestPaper(papers: readonly PaperListing[]): PaperListing | null {
  return [...papers].sort(newestFirst)[0] ?? null;
}

/** "June 2026" for a Maharashtra sitting, "2026" for CBSE (no sitting); null with no papers. */
export function newestBoardSitting(papers: readonly PaperListing[]): string | null {
  const p = newestPaper(papers);
  if (!p) return null;
  const m = monthRank(p.sitting);
  return m > 0 ? `${MONTH_NAMES[m - 1]} ${p.year}` : String(p.year);
}

export type BoardFacts = {
  /** "June 2026 paper" or "2026 paper". */
  label: string;
  marks: number;
  minutes: number | null;
  /** Null when the items could not be read. */
  questions: number | null;
  /** Questions with an OR alternative; null when the items could not be read. */
  choices: number | null;
  /** "Section A: 1 mark each". */
  sections: string[];
  /** "Earlier papers had 35 or 40 marks.", or null when the total never changed. */
  earlierText: string | null;
};

type Item = SubjectStats["items"][number];

/**
 * How a board's case key reads (measured 2026-11-10). On CBSE papers it joins
 * the parts of ONE printed question ("29 (a)", "29 (b)" are question 29), so
 * CBSE 12 Chemistry 2026 has 33 questions, not 37. On Maharashtra papers it
 * joins a block of separate questions (HSC Geography "1 (A) (1)" to "(5)" are
 * five 1-mark questions under one key), so there every item is a question.
 * The printed numbers cannot tell the two apart; the board can.
 */
export type CaseRule = { casesAreQuestions: boolean };

/** One printed question per entry. */
function questionUnits(items: readonly Item[], rule: CaseRule): Item[][] {
  const units: Item[][] = [];
  const byCase = new Map<string, Item[]>();
  for (const i of items) {
    if (!rule.casesAreQuestions || i.caseKey === null) {
      units.push([i]);
      continue;
    }
    const unit = byCase.get(i.caseKey);
    if (unit) unit.push(i);
    else {
      const fresh = [i];
      byCase.set(i.caseKey, fresh);
      units.push(fresh);
    }
  }
  return units;
}

/**
 * A section's marks from its own questions, OR alternatives left out: "4 marks
 * each", or "16 questions, 30 marks" when they differ (CBSE 10 Science's
 * sections are by subject). Null with nothing to read.
 */
function sectionMarksNote(items: readonly Item[], key: string, rule: CaseRule): string | null {
  const counted = items.filter((i) => i.section === key && i.alternativeTo === null && i.marks !== null);
  const units = questionUnits(counted, rule);
  const totals = units.map((u) => u.reduce((s, i) => s + (i.marks ?? 0), 0));
  if (totals.length === 0) return null;
  const distinct = [...new Set(totals)];
  if (distinct.length === 1) return `${distinct[0]} ${distinct[0] === 1 ? "mark" : "marks"} each`;
  return `${units.length} questions, ${totals.reduce((a, b) => a + b, 0)} marks`;
}

/**
 * The facts box, read from the newest paper. A section's stored note is kept,
 * except where it is empty (401 CBSE sections) or the section holds a CBSE case
 * study, whose stored note describes one PART (Physics stores "1 mark each" on
 * its 4-mark case studies): those are worked out from the items.
 */
export function boardFacts(papers: readonly PaperListing[], stats: SubjectStats, rule: CaseRule): BoardFacts | null {
  const newest = newestPaper(papers);
  if (!newest) return null;
  const mine = stats.items.filter((i) => i.paperId === newest.id);
  const earlier = [...new Set(papers.map((p) => p.totalMarks))]
    .filter((m) => m !== newest.totalMarks)
    .sort((a, b) => b - a);
  const holdsCase = (key: string) => rule.casesAreQuestions && mine.some((i) => i.section === key && i.caseKey !== null);
  return {
    label: `${newestBoardSitting([newest])} paper`,
    marks: newest.totalMarks,
    minutes: newest.durationMinutes,
    questions:
      mine.length > 0
        ? questionUnits(mine.filter((i) => i.marks !== null && i.alternativeTo === null), rule).length
        : null,
    choices: mine.length > 0 ? questionUnits(mine.filter((i) => i.alternativeTo !== null), rule).length : null,
    sections: (stats.sections[newest.id] ?? []).map((s) => {
      const note = holdsCase(s.key) || !s.note ? (sectionMarksNote(mine, s.key, rule) ?? s.note) : s.note;
      return note ? `${s.title}: ${note}` : s.title;
    }),
    earlierText: earlier.length > 0 ? `Earlier papers had ${orList(earlier)} marks.` : null,
  };
}

export type ChapterMarksRow = { name: string; marks: number; href?: string };
export type ChapterMarks = { papers: number; total: number; rows: ChapterMarksRow[] };

/**
 * Marks a paper by chapter: one set per paper, papers with `total` marks only,
 * and only papers whose items were read. Null below MIN_CHAPTER_PAPERS.
 */
export function chapterMarks(papers: readonly PaperListing[], stats: SubjectStats, total: number): ChapterMarks | null {
  const withItems = new Set(stats.items.map((i) => i.paperId));
  const firstSet = new Map<string, PaperListing>();
  for (const p of papers) {
    if (p.totalMarks !== total) continue;
    const key = `${p.year}\u0000${p.groupSlug}`;
    const cur = firstSet.get(key);
    if (!cur || (p.setNumber ?? 0) < (cur.setNumber ?? 0)) firstSet.set(key, p);
  }
  const picked = new Set([...firstSet.values()].filter((p) => withItems.has(p.id)).map((p) => p.id));
  if (picked.size < MIN_CHAPTER_PAPERS) return null;

  const sums = new Map<string, number>();
  for (const i of stats.items) {
    if (!picked.has(i.paperId) || i.marks === null || i.alternativeTo !== null || !i.chapter) continue;
    sums.set(i.chapter, (sums.get(i.chapter) ?? 0) + i.marks);
  }
  const rows = [...sums]
    .map(([name, sum]) => ({ name, marks: Math.round((sum / picked.size) * 10) / 10 }))
    .sort((a, b) => b.marks - a.marks || a.name.localeCompare(b.name))
    .slice(0, CHAPTER_ROWS)
    .map((r) => (stats.chapterHrefs[r.name] ? { ...r, href: stats.chapterHrefs[r.name] } : r));
  return { papers: picked.size, total, rows };
}

/**
 * How much the sets of one paper have in common: per pair of sets, the share
 * of the lower set's questions the other set also has, averaged, as a whole
 * percentage. Null when no paper has two sets.
 */
export function setOverlap(papers: readonly PaperListing[], stats: SubjectStats): number | null {
  const qs = new Map<string, Set<string>>();
  for (const i of stats.items) {
    if (i.alternativeTo !== null) continue;
    qs.set(i.paperId, (qs.get(i.paperId) ?? new Set()).add(i.questionId));
  }
  const groups = new Map<string, PaperListing[]>();
  for (const p of papers) {
    if (p.setNumber === null || !qs.has(p.id)) continue;
    const key = `${p.year}\u0000${p.groupSlug}`;
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  const shares: number[] = [];
  for (const sets of groups.values()) {
    const ordered = [...sets].sort((a, b) => (a.setNumber ?? 0) - (b.setNumber ?? 0));
    for (let i = 0; i < ordered.length; i++) {
      for (let j = i + 1; j < ordered.length; j++) {
        const a = qs.get(ordered[i].id)!;
        const b = qs.get(ordered[j].id)!;
        shares.push([...a].filter((q) => b.has(q)).length / a.size);
      }
    }
  }
  if (shares.length === 0) return null;
  return Math.round((100 * shares.reduce((s, x) => s + x, 0)) / shares.length);
}

/** Questions a student asks about one subject's papers, each answered from data. */
export function boardPapersFaq(input: {
  exam: string;
  subject: string;
  facts: BoardFacts | null;
  years: readonly number[];
  /** Papers, counting a CBSE paper's sets once. */
  paperCount: number;
  setCount: number;
  overlap: number | null;
}): FaqItem[] {
  const { exam, subject, facts, years, paperCount, setCount, overlap } = input;
  const faq: FaqItem[] = [];

  if (facts) {
    const time = facts.minutes !== null ? ` in ${hoursLabel(facts.minutes)}` : "";
    const questions = facts.questions !== null ? `, with ${facts.questions} questions` : "";
    faq.push({
      q: `How long is the ${exam} ${subject} paper, and how many marks?`,
      a: `The ${facts.label} is ${facts.marks} marks${time}${questions}.${facts.earlierText ? ` ${facts.earlierText}` : ""}`,
    });
    if (facts.choices) {
      faq.push({
        q: "Is there a choice of questions?",
        a: `Yes. In the ${facts.label}, ${facts.choices} ${facts.choices === 1 ? "question has" : "questions have"} an OR: you answer one of the two.`,
      });
    }
  }

  if (years.length > 0) {
    const sorted = [...years].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const missing: number[] = [];
    for (let y = min; y <= max; y++) if (!sorted.includes(y)) missing.push(y);
    const sets = setCount > paperCount ? ` (${setCount} sets)` : "";
    faq.push({
      q: `Which ${exam} ${subject} papers are here?`,
      a:
        `${paperCountLabel(paperCount)}${sets} ${min === max ? `from ${min}` : `from ${min} to ${max}`}.` +
        (missing.length > 0 ? ` Not here: ${missing.join(", ")}.` : ""),
    });
  }

  if (overlap !== null) {
    faq.push({
      q: "Are the sets of a paper the same?",
      a: `No. The board prints several sets of each paper, and here the sets of one paper share about ${overlap}% of their questions, so each set is worth reading.`,
    });
  }

  faq.push({
    q: "Do the papers have answers?",
    a: "Yes. Every question has a model answer, one tap away on the paper's page.",
  });
  // No "first PDF is free": the owner took that promise off the past-paper pages (2026-11-10).
  faq.push({
    q: "Can I download these papers?",
    a: "Every paper is free to read online, and each one downloads as a PDF with its answers.",
  });
  return faq;
}
