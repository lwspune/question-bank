/**
 * The past-papers page, /mock/exam/<slug>/download (2026-11-10): one exam's
 * published past papers by year, with the facts a student searches for around
 * them. The page itself is the one template for all 22 mock exams.
 *
 * WHY THIS EXISTS. Read against testbook.com's NDA papers page (2026-11-10),
 * ours was a bare list: 888 words, and every year heading read "20264" to
 * Google and to a screen reader, because the count badge sat inside the <h2>.
 * What the page now adds is all read from data we already hold, so a new exam
 * gets it without anyone writing copy:
 *
 *  - the facts box (questions, marks, minutes, marking) from the newest paper's
 *    mock row, and from its blueprint only to learn whether its sections are
 *    marked differently (IPMAT Indore, UCEED), in which case the page points to
 *    the paper's own start page, which already prints a line per section;
 *  - "what the papers show" from get_chapter_paper_weights (migration 0242),
 *    the figure Home's "Start next" uses, measured from the published papers;
 *  - an FAQ whose every answer is computed. The one hand-written input is
 *    YEAR_NOTES, the reason a year has fewer papers, which no column records.
 *
 * Deliberately NOT here: an "Updated <date>" line. The listing carries no
 * publish date, and a render date would claim a freshness the page does not
 * have (Testbook refreshes dateModified on unchanged pages). The newest sitting
 * is shown instead, which is true.
 *
 * Pure: no React, no DB. Spec: tests/past-papers-page.test.ts.
 */
import type { MockListItem } from "./query";
import { sectionMarking, type MockPaperBlueprint } from "./blueprints";
import { comparePaperLabels, monthRank } from "./catalogue";
import { plainPaperTitle } from "./paperPage";
import type { ChapterWeight } from "@/lib/me/startNext";

/** Recent years stay open until this many papers show; older years fold. */
export const OPEN_PAPER_TARGET = 8;
/** A paper needs this many published sittings before its averages mean much. */
export const MIN_TREND_PAPERS = 4;
/** Chapters shown for a one-subject paper. */
export const TREND_ROWS = 6;

/**
 * Why a year has fewer papers than usual, per exam. Nothing in the data says
 * why, so the FAQ asks the question only where a note is written here.
 */
export const YEAR_NOTES: Readonly<Record<string, Readonly<Record<number, string>>>> = {
  nda: {
    2020: "UPSC held NDA 1 and NDA 2 2020 as one combined exam, so there is a single sitting that year.",
  },
};

/**
 * A rule a paper's marking line cannot show, by paper code. MPSC CSAT scores
 * Decision Making per option with no penalty (scripts/mpsc/README.md); the row's
 * one scheme covers the other questions only.
 */
const PAPER_NOTES: Readonly<Record<string, string>> = {
  "ssp-csat": "Decision Making questions lose nothing for a wrong answer and score per option.",
  "ssp-csat-2021": "Decision Making questions lose nothing for a wrong answer and score per option.",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "NDA 2026 question papers". The count is NOT part of it (the "20264" bug). */
export function yearHeading(examName: string, yearLabel: string): string {
  return /^\d{4}$/.test(yearLabel)
    ? `${examName} ${yearLabel} question papers`
    : `${examName} papers with no year recorded`;
}

export function paperCountLabel(n: number): string {
  return `${n} ${n === 1 ? "paper" : "papers"}`;
}

/** The year groups to show open, newest first, until OPEN_PAPER_TARGET papers show. */
export function openYearKeys(groups: readonly { key: string; items: readonly unknown[] }[]): Set<string> {
  const open = new Set<string>();
  let shown = 0;
  for (const g of groups) {
    if (shown >= OPEN_PAPER_TARGET) break;
    open.add(g.key);
    shown += g.items.length;
  }
  return open;
}

function fmt(v: number): string {
  return String(Math.round(v * 100) / 100);
}

const SHARES: readonly [number, string][] = [
  [1 / 2, "half its marks"],
  [1 / 3, "a third of its marks"],
  [1 / 4, "a quarter of its marks"],
];

/** "+2.5 for a right answer, -0.83 for a wrong one (a third of its marks)". */
export function markingLine(m: { correct: number; wrong: number }): string {
  const right = `+${fmt(m.correct)} for a right answer`;
  if (m.wrong === 0) return `${right}, nothing lost for a wrong one`;
  const ratio = Math.abs(m.wrong) / m.correct;
  const share = SHARES.find(([r]) => Math.abs(r - ratio) < 0.01)?.[1];
  return `${right}, ${fmt(m.wrong)} for a wrong one${share ? ` (${share})` : ""}`;
}

export type PaperFact = {
  /** The newest paper's code; `codes` is every code printed under the same name. */
  code: string;
  codes: string[];
  /** "Paper I, Mathematics": the printed label, dashes turned into commas. */
  label: string;
  questions: number;
  marks: number;
  minutes: number;
  /** "English 50, General Knowledge 100" when the paper has more than one section. */
  sections: string | null;
  marking: { kind: "one"; line: string } | { kind: "by-section" };
  /** Does a wrong answer cost marks: everywhere, nowhere, or in some sections. */
  penalised: boolean | "some";
  note: string | null;
  /** Question counts earlier papers had, when the paper changed shape (NEET 200 -> 180). */
  earlierQuestions: number[];
  /** "Earlier papers had 100, 85, 80 or 68 questions.", or null when the shape never changed. */
  earlierText: string | null;
  newestSlug: string;
};

/** "100, 85, 80 or 68". */
function orList(xs: readonly (string | number)[]): string {
  const s = xs.map(String);
  return s.length <= 1 ? (s[0] ?? "") : `${s.slice(0, -1).join(", ")} or ${s[s.length - 1]}`;
}

function newestFirst(a: MockListItem, b: MockListItem): number {
  return (b.pyqYear ?? 0) - (a.pyqYear ?? 0) || monthRank(b.pyqMonth) - monthRank(a.pyqMonth);
}

function sameMarking(a: { correct: number; wrong: number }, b: { correct: number; wrong: number }): boolean {
  return a.correct === b.correct && a.wrong === b.wrong;
}

function labelOf(m: MockListItem, bp: MockPaperBlueprint | null): string {
  if (bp) return plainPaperTitle(bp.paperLabel);
  return m.sections.map((s) => s.label).join(" and ") || m.paperCode;
}

/** One card per printed paper, read from its newest published sitting. */
export function paperFacts(
  papers: readonly MockListItem[],
  blueprintOf: (code: string) => MockPaperBlueprint | null
): PaperFact[] {
  const byLabel = new Map<string, MockListItem[]>();
  for (const m of [...papers].sort(newestFirst)) {
    const label = labelOf(m, blueprintOf(m.paperCode));
    byLabel.set(label, [...(byLabel.get(label) ?? []), m]);
  }

  const facts: PaperFact[] = [];
  for (const [label, items] of byLabel) {
    const newest = items[0];
    const bp = blueprintOf(newest.paperCode);
    const perSection = bp
      ? bp.sections.some((s) => s.msqScheme !== undefined || !sameMarking(sectionMarking(bp, s), bp.marking))
      : false;
    const wrongs = perSection && bp ? bp.sections.map((s) => sectionMarking(bp, s).wrong) : [newest.marking.wrong];
    const penalised = wrongs.every((w) => w !== 0) ? true : wrongs.every((w) => w === 0) ? false : "some";

    const earlierQuestions = [...new Set(items.map((m) => m.totalQuestions))]
      .filter((n) => n !== newest.totalQuestions)
      .sort((a, b) => b - a);
    facts.push({
      code: newest.paperCode,
      codes: [...new Set(items.map((m) => m.paperCode))],
      label,
      questions: newest.totalQuestions,
      marks: newest.totalMarks,
      minutes: Math.round(newest.durationSecs / 60),
      sections: newest.sections.length > 1 ? newest.sections.map((s) => `${s.label} ${s.count}`).join(", ") : null,
      marking: perSection ? { kind: "by-section" } : { kind: "one", line: markingLine(newest.marking) },
      penalised,
      note: PAPER_NOTES[newest.paperCode] ?? null,
      earlierQuestions,
      earlierText: earlierQuestions.length > 0 ? `Earlier papers had ${orList(earlierQuestions)} questions.` : null,
      newestSlug: newest.slug,
    });
  }
  return facts.sort((a, b) => comparePaperLabels(a.label, b.label));
}

export type TrendRow = { name: string; perPaper: number; href?: string };
export type TrendCard = {
  code: string;
  title: string;
  /** Questions in the newest paper: the bars' "of N". */
  total: number;
  /** Published sittings the averages cover. */
  papers: number;
  rows: TrendRow[];
};

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}

/**
 * "What the papers show": per paper, its most-asked chapters, or its subjects
 * when it spans several (NDA GAT, NEET). Averages over every published sitting
 * of the paper, combining codes printed under one name by sitting count.
 */
export function paperTrends(
  weights: readonly ChapterWeight[],
  facts: readonly PaperFact[],
  hrefOf: (subject: string, chapter: string) => string | undefined
): TrendCard[] {
  const cards: TrendCard[] = [];
  for (const f of facts) {
    const ws = weights.filter((w) => f.codes.includes(w.paperCode));
    if (ws.length === 0) continue;
    const papersByCode = new Map(ws.map((w) => [w.paperCode, w.papers]));
    const papers = [...papersByCode.values()].reduce((s, n) => s + n, 0);
    if (papers < MIN_TREND_PAPERS) continue;

    // Questions a paper, averaged over every sitting of every code.
    const perPaper = new Map<string, { subject: string; chapter: string; total: number }>();
    for (const w of ws) {
      const key = `${w.subject}\u0000${w.chapter}`;
      const cur = perPaper.get(key) ?? { subject: w.subject, chapter: w.chapter, total: 0 };
      cur.total += w.qPerPaper * w.papers;
      perPaper.set(key, cur);
    }
    const chapters = [...perPaper.values()].map((c) => ({ ...c, avg: c.total / papers }));
    const subjects = [...new Set(chapters.map((c) => c.subject))];

    let rows: TrendRow[];
    let title: string;
    if (subjects.length > 1) {
      const bySubject = new Map<string, number>();
      for (const c of chapters) bySubject.set(c.subject, (bySubject.get(c.subject) ?? 0) + c.avg);
      rows = [...bySubject]
        .map(([name, v]) => ({ name, perPaper: round1(v) }))
        .sort((a, b) => b.perPaper - a.perPaper);
      title = `${f.label}: questions by subject`;
    } else {
      rows = chapters
        .sort((a, b) => b.avg - a.avg)
        .slice(0, TREND_ROWS)
        .map((c) => {
          const href = hrefOf(c.subject, c.chapter);
          return href ? { name: c.chapter, perPaper: round1(c.avg), href } : { name: c.chapter, perPaper: round1(c.avg) };
        });
      title = `${f.label}: most-asked chapters`;
    }
    cards.push({ code: f.code, title, total: f.questions, papers, rows });
  }
  return cards;
}

/** "September 2026", or "2026" when no month is recorded; null with no papers. */
export function newestSittingLabel(papers: readonly MockListItem[]): string | null {
  const newest = [...papers].sort(newestFirst)[0];
  if (!newest || newest.pyqYear === null) return null;
  const month = monthRank(newest.pyqMonth);
  return month > 0 ? `${MONTH_NAMES[month - 1]} ${newest.pyqYear}` : String(newest.pyqYear);
}

export type FaqItem = { q: string; a: string };

/** Questions a student asks about these papers, each answered from data. */
export function pastPapersFaq(input: {
  examName: string;
  facts: readonly PaperFact[];
  years: readonly number[];
  paperCount: number;
  solved: boolean;
  yearNotes: Readonly<Record<number, string>>;
}): FaqItem[] {
  const { examName, facts, years, paperCount, solved, yearNotes } = input;
  const faq: FaqItem[] = [];

  if (facts.length > 0) {
    const shape = (f: PaperFact) => `${f.questions} questions for ${f.marks} marks in ${f.minutes} minutes`;
    const earlier = (f: PaperFact) => (f.earlierText ? ` ${f.earlierText}` : "");
    // "Paper I, Mathematics, has": the closing comma pairs with the label's own.
    const subject = (f: PaperFact) => (f.label.includes(", ") ? `${f.label},` : f.label);
    faq.push({
      q: `How many questions are in each ${examName} paper?`,
      a:
        facts.length === 1
          ? `The ${examName} paper has ${shape(facts[0])}.${earlier(facts[0])}`
          : facts.map((f) => `${subject(f)} has ${shape(f)}.${earlier(f)}`).join(" "),
    });

    const anyPenalty = facts.some((f) => f.penalised !== false);
    const allPenalty = facts.every((f) => f.penalised === true);
    const lines = facts
      .map((f) => {
        const line =
          f.marking.kind === "one"
            ? f.marking.line
            : "each section is marked differently: a paper's start page lists the marking for each";
        const label = facts.length === 1 ? line.charAt(0).toUpperCase() + line.slice(1) : `${f.label}: ${line}`;
        return `${label}.${f.note ? ` ${f.note}` : ""}`;
      })
      .join(" ");
    faq.push({
      q: `Does ${examName} have negative marking?`,
      a: !anyPenalty
        ? "No. A wrong answer costs nothing, so answer every question, even a guess."
        : `${allPenalty ? "Yes." : facts.length === 1 ? "In some sections." : "On some papers or sections."} ${lines} A question you leave blank loses nothing.`,
    });
  }

  if (years.length > 0) {
    const sorted = [...years].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const missing: number[] = [];
    for (let y = min; y <= max; y++) if (!sorted.includes(y)) missing.push(y);
    faq.push({
      q: `Which ${examName} papers are here?`,
      a:
        `${paperCountLabel(paperCount)} ${min === max ? `from ${min}` : `from ${min} to ${max}`}.` +
        (missing.length > 0 ? ` Not here: ${missing.join(", ")}.` : ""),
    });
    for (const y of sorted.slice().reverse()) {
      const note = yearNotes[y];
      if (note) faq.push({ q: `Why does ${y} have fewer papers?`, a: note });
    }
  }

  faq.push({
    q: "Do the papers have solutions?",
    a: solved
      ? "Yes. Read any paper online and tap a question to see its answer and worked solution."
      : "Every paper has its answers. Worked solutions are not written for every question yet.",
  });
  faq.push({
    q: "Can I download these papers?",
    a: "Every paper is free to read online and to sit as a timed mock. Your first PDF paper and its answer key are free to download.",
  });
  return faq;
}
