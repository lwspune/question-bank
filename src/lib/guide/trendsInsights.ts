/**
 * The "Key numbers" box and the FAQ on the /guide trends reports.
 *
 * WHY. Each trends page carries the full chapter x paper grid, but the numbers
 * a student (or a search engine quoting the page) wants first were buried
 * under a method note and the drift narrative. This turns the page's OWN
 * matrix into four or five sentences and three or four questions with
 * answers. Nothing here is typed in: every figure is computed from what the
 * page passes, so the box moves when the generated matrix moves.
 *
 * WINDOWS ARE THE PAGE'S OWN. MHT-CET compares 2023-2024 with 2025-2026 (the
 * syllabus move), CDS its earliest and latest windows, JEE its EARLY and
 * RECENT. The page passes each chapter's per-paper rate in both, so a sentence
 * here can never contradict the drift cards beside it.
 *
 * PAPER PRESENCE ONLY WHERE A COLUMN IS ONE PAPER. MHT-CET and CDS grids have
 * a column per sitting, so "in 66 of 68 papers" is a count. JEE's columns are
 * years, so the page passes no `presencePapers` and no sentence or question
 * mentions it.
 *
 * Pure; spec tests/trends-insights.test.ts.
 */
import type { FaqEntry } from "@/lib/blog/faq";

export type InsightChapter = {
  chapter: string;
  /** Questions per paper in the earlier window. */
  early: number;
  /** Questions per paper in the recent window. */
  recent: number;
  /** Papers the chapter appeared in, of `presencePapers`. Only where each column is one paper. */
  appeared?: number;
};

export type InsightInput = {
  exam: string;
  subject: string;
  /** Label of the earlier window, e.g. "2023–2024". */
  early: string;
  /** Label of the recent window, e.g. "2025–2026". */
  recent: string;
  /** Questions behind the page. */
  questions: number;
  /** Papers behind the page, where the grid counts papers. */
  papers?: number;
  firstYear: number;
  lastYear: number;
  /** The paper count `appeared` is out of. Absent when columns are not papers. */
  presencePapers?: number;
  chapters: InsightChapter[];
};

const round2 = (x: number) => Math.round(x * 100 + 1e-9) / 100;
const one = (x: number) => x.toFixed(1);
const pct = (part: number, whole: number) => (whole > 0 ? Math.round((100 * part) / whole) : 0);

/** Questions per paper over the papers whose year falls in [from, to]. */
export function windowRate(counts: number[], years: number[], from: number, to: number): number {
  let q = 0;
  let papers = 0;
  years.forEach((y, i) => {
    if (y >= from && y <= to) {
      q += counts[i] ?? 0;
      papers++;
    }
  });
  return papers === 0 ? 0 : round2(q / papers);
}

/** Papers in which the chapter had at least one question. */
export function papersAppeared(counts: number[]): number {
  return counts.filter((c) => c > 0).length;
}

/**
 * A grid with one column per paper (MHT-CET shifts, CDS sittings) as insight
 * rows: each chapter's rate in both windows and the papers it appeared in.
 */
export function perPaperChapters(
  rows: { chapter: string; counts: number[] }[],
  years: number[],
  early: { from: number; to: number },
  recent: { from: number; to: number }
): InsightChapter[] {
  return rows.map((r) => ({
    chapter: r.chapter,
    early: windowRate(r.counts, years, early.from, early.to),
    recent: windowRate(r.counts, years, recent.from, recent.to),
    appeared: papersAppeared(r.counts),
  }));
}

type Window = { from: number; to: number; label: string };

/**
 * The whole insight input for a per-paper grid (MHT-CET, CDS). Every column is
 * one paper, so the paper count and the presence denominator are both the
 * column count, and the year span is the grid's own.
 */
export function perPaperInsightInput(args: {
  exam: string;
  subject: string;
  rows: { chapter: string; counts: number[] }[];
  /** The year of each column, aligned 1:1 to `counts`. */
  years: number[];
  questions: number;
  early: Window;
  recent: Window;
}): InsightInput {
  return {
    exam: args.exam,
    subject: args.subject,
    early: args.early.label,
    recent: args.recent.label,
    questions: args.questions,
    papers: args.years.length,
    firstYear: Math.min(...args.years),
    lastYear: Math.max(...args.years),
    presencePapers: args.years.length,
    chapters: perPaperChapters(args.rows, args.years, args.early, args.recent),
  };
}

/** The rate table's "In papers" column, or nothing when the grid does not count papers. */
export function appearedColumn(input: InsightInput): { byChapter: Record<string, number>; of: number } | undefined {
  if (!input.presencePapers) return undefined;
  return {
    byChapter: Object.fromEntries(input.chapters.map((c) => [c.chapter, c.appeared ?? 0])),
    of: input.presencePapers,
  };
}

/** "A", "A and B", "A, B and C". */
function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Heaviest in the recent window first; a tie breaks on the name so the order never wobbles. */
function byRecent(chapters: InsightChapter[]): InsightChapter[] {
  return [...chapters].sort((a, b) => b.recent - a.recent || a.chapter.localeCompare(b.chapter));
}

function paperLength(chapters: InsightChapter[]): number {
  return chapters.reduce((s, c) => s + c.recent, 0);
}

function everyPaper(input: InsightInput): InsightChapter[] {
  if (!input.presencePapers) return [];
  return byRecent(input.chapters.filter((c) => c.appeared === input.presencePapers));
}

function mostRegular(input: InsightInput): InsightChapter | null {
  if (!input.presencePapers) return null;
  const withCount = input.chapters.filter((c) => c.appeared !== undefined);
  if (withCount.length === 0) return null;
  return [...withCount].sort(
    (a, b) => (b.appeared ?? 0) - (a.appeared ?? 0) || b.recent - a.recent || a.chapter.localeCompare(b.chapter)
  )[0];
}

/** Chapters asked in the earlier window and not at all in the recent one, heaviest first. */
function droppedChapters(chapters: InsightChapter[]): InsightChapter[] {
  return chapters
    .filter((c) => c.early > 0 && c.recent === 0)
    .sort((a, b) => b.early - a.early || a.chapter.localeCompare(b.chapter));
}

/**
 * Largest move between the windows in one direction, or null when nothing
 * moved that way. A fall counts only chapters still asked: a chapter that went
 * to zero has its own "gone" line, and reporting it twice would hide the
 * biggest fall among the chapters a student still has to prepare.
 */
function biggestMove(chapters: InsightChapter[], dir: 1 | -1): InsightChapter | null {
  let best: InsightChapter | null = null;
  let bestDelta = 0;
  const pool = dir === -1 ? chapters.filter((c) => c.recent > 0) : chapters;
  for (const c of [...pool].sort((a, b) => a.chapter.localeCompare(b.chapter))) {
    const delta = dir * (c.recent - c.early);
    if (delta > bestDelta + 1e-9) {
      best = c;
      bestDelta = delta;
    }
  }
  return best;
}

function moveSentence(c: InsightChapter, kind: "rise" | "fall", early: string, recent: string): string {
  const head = `Biggest ${kind}: ${c.chapter}, from`;
  if (c.early === 0) return `${head} none in ${early} to ${one(c.recent)} questions a paper in ${recent}.`;
  return `${head} ${one(c.early)} to ${one(c.recent)} questions a paper (${early} to ${recent}).`;
}

function presenceSentence(input: InsightInput): string | null {
  const all = everyPaper(input);
  const m = input.presencePapers;
  if (!m) return null;
  if (all.length > 0) {
    const names = all.map((c) => c.chapter);
    const shown = names.length > 4 ? [...names.slice(0, 3), `${names.length - 3} more chapters`] : names;
    return `${list(shown)} appeared in all ${m} papers.`;
  }
  const top = mostRegular(input);
  return top ? `The most regular chapter is ${top.chapter}, in ${top.appeared} of ${m} papers.` : null;
}

/** "A (1.0 a paper) was asked in 2023-2024 and not at all in 2025-2026.", or null when nothing dropped. */
function droppedSentence(input: InsightInput): string | null {
  const dropped = droppedChapters(input.chapters);
  if (dropped.length === 0) return null;
  const names = dropped.map((c, i) => `${c.chapter} (${one(c.early)}${i === 0 ? " a paper" : ""})`);
  const verb = dropped.length === 1 ? "was" : "were";
  return `${list(names)} ${verb} asked in ${input.early} and not at all in ${input.recent}.`;
}

/** Four to six sentences for the "Key numbers" box, in reading order. */
export function keyInsights(input: InsightInput): string[] {
  const ranked = byRecent(input.chapters);
  const total = paperLength(input.chapters);
  const lines: string[] = [];

  const top3 = ranked.slice(0, 3);
  if (top3.length > 0) {
    const parts = top3.map((c, i) => (i === 0 ? `${c.chapter} (${one(c.recent)} a paper)` : `${c.chapter} (${one(c.recent)})`));
    const sum = top3.reduce((s, c) => s + c.recent, 0);
    lines.push(
      `In the ${input.recent} papers the heaviest chapters are ${list(parts)}: ${one(sum)} of every ${Math.round(total)} questions.`
    );
  }

  if (ranked.length > 5) {
    const top5 = ranked.slice(0, 5).reduce((s, c) => s + c.recent, 0);
    lines.push(
      `The five heaviest chapters carry ${pct(top5, total)}% of the paper; the other ${ranked.length - 5} share the rest.`
    );
  }

  const presence = presenceSentence(input);
  if (presence) lines.push(presence);

  const rise = biggestMove(input.chapters, 1);
  if (rise) lines.push(moveSentence(rise, "rise", input.early, input.recent));
  const fall = biggestMove(input.chapters, -1);
  if (fall) lines.push(moveSentence(fall, "fall", input.early, input.recent));
  const gone = droppedSentence(input);
  if (gone) lines.push(`Gone from the paper: ${gone}`);

  return lines;
}

function sourceClause(input: InsightInput): string {
  const qs = input.questions.toLocaleString("en-IN");
  return input.papers
    ? `counted from ${input.papers} past papers (${qs} questions, ${input.firstYear} to ${input.lastYear})`
    : `counted from ${qs} past-year questions from ${input.firstYear} to ${input.lastYear}`;
}

/** The trends page's FAQ: the same numbers as questions, for the visible section and FAQPage markup. */
export function trendsFaq(input: InsightInput): FaqEntry[] {
  const name = `${input.exam} ${input.subject}`;
  const ranked = byRecent(input.chapters);
  const total = paperLength(input.chapters);
  const top5 = ranked.slice(0, 5);
  const faq: FaqEntry[] = [];

  faq.push({
    q: `Which chapters carry the most weight in ${name}?`,
    a:
      `Going by the ${input.recent} papers, the heaviest are ${list(
        top5.map((c, i) => (i === 0 ? `${c.chapter} (${one(c.recent)} questions a paper)` : `${c.chapter} (${one(c.recent)})`))
      )}. ` +
      `Together they make up ${pct(top5.reduce((s, c) => s + c.recent, 0), total)}% of the paper. ` +
      `Figures are questions per paper, ${sourceClause(input)}.`,
  });

  if (input.presencePapers) {
    const all = everyPaper(input);
    const top = mostRegular(input);
    const a =
      all.length > 0
        ? `${list(all.map((c) => c.chapter))} appeared in all ${input.presencePapers} papers from ${input.firstYear} to ${input.lastYear}.`
        : top
          ? `No chapter appeared in every paper. The most regular is ${top.chapter}, in ${top.appeared} of ${input.presencePapers} papers.`
          : null;
    if (a) faq.push({ q: `Which ${name} chapters come in every paper?`, a });
  }

  const rise = biggestMove(input.chapters, 1);
  const fall = biggestMove(input.chapters, -1);
  if (rise || fall) {
    faq.push({
      q: `Which ${name} chapters have grown or shrunk?`,
      a: [rise && moveSentence(rise, "rise", input.early, input.recent), fall && moveSentence(fall, "fall", input.early, input.recent)]
        .filter(Boolean)
        .join(" "),
    });
  }

  const gone = droppedSentence(input);
  if (gone) faq.push({ q: `Has any chapter dropped out of the ${name} paper?`, a: `Yes. ${gone}` });

  return faq;
}
