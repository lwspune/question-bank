/**
 * The IAT lane's pure core. Spec: tests/iat-lib.test.ts.
 *
 * ── THE ONE THING THAT IS DIFFERENT HERE ─────────────────────────────────────
 * IISER's key files print every question with the correct answer as (a). The
 * answer key IS the printed order. So in a keyed year:
 *   - the options are put in a fixed, seeded order (`rowOrder`) before anything
 *     downstream sees them: the blind payload, the bank, the mocks;
 *   - the key letter is the stored slot of printed (a) (`keyLetter`);
 *   - a solver is never handed a page image, since the page IS the key.
 * In a year with no key (2017-2022) the printed order is the real one and is
 * kept as it is.
 *
 * ── WHERE EACH PART OF A ROW COMES FROM ──────────────────────────────────────
 *   stem, options, chapter, subtopic   the transcription (data/<stem>.questions.json)
 *   answer                             keyed year: printed (a), never overruled
 *                                      no key: two independent solvers, a person settles a split
 *   solution, difficulty               the first solver (or an adjudication's rewrite)
 */
import { createHash } from "node:crypto";
import { textIssues } from "../cisce-pyq/lib";
import { IAT_TAXONOMY } from "./taxonomy";
import type { IatSubject, IatYear } from "./config";

export type Region = [number, number, number, number];
export type IatFigure = {
  page: string;
  region: Region;
  note?: string;
  required?: boolean;
  /** "none": a person looked at a crop the watermark check flagged and saw no watermark. */
  watermark?: "none";
};

export type IatRow = {
  /** The printed question number within its subject, "1".."15". */
  ref: string;
  questionNumber: string;
  chapter: string;
  subtopic: string;
  context?: string;
  text: string;
  /** In PRINTED order. In a keyed year the first one is IISER's answer. */
  options: string[];
  figure?: IatFigure;
  /** One crop per option, printed order, when the options are pictures. */
  optionFigures?: IatFigure[];
  _flag?: string;
};

export type IatPaper = {
  subject: IatSubject;
  year: number;
  source: string;
  _transcription?: string;
  rows: IatRow[];
};

export type Confidence = "HIGH" | "MEDIUM" | "LOW";
export type DerivedEntry = {
  ref: string;
  /** A-D in the STORED order the solver was given. */
  label: string;
  value: string;
  working: string;
  difficulty: string;
  confidence: Confidence;
  flag?: string;
};

export type Adjudication = {
  ref: string;
  /** No-key year only: the letter a person settled on. A keyed year refuses it. */
  answer?: string;
  solution?: string;
  solutionNote?: string;
  hold?: string;
  why?: string;
};

export const LABELS = ["A", "B", "C", "D"] as const;
type Label = (typeof LABELS)[number];
const DIFFICULTIES = ["Easy", "Moderate", "Hard"] as const;

/** "None of the above", "All of these", "Both of the above": belongs last, whatever its printed slot. */
const PINNED = /\b(all|none|both|neither)\s+of\s+(the\s+)?(above|these|them)\b/i;

/** Maths zones removed, so `\(f(a)\)` is not read as a reference to option (a). */
const outsideMath = (s: string) => s.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, " ");

/** An option that names another option ("Both (a) and (c)", "B and C"): the order is load-bearing. */
function namesAnOption(option: string): boolean {
  const s = outsideMath(option);
  return /\([a-dA-D]\)/.test(s) || /\b(option|choice)s?\s+\(?[a-dA-D1-4]\b/i.test(s) || /\b[A-D]\s+(and|or|&)\s+[A-D]\b/.test(s);
}

/**
 * A fixed order for four options from a seed: `order[slot] = printed index`.
 * Pinned options go to the end, in their printed order; the rest are shuffled
 * by a sha256 of the seed, so the same seed gives the same order on every run.
 */
export function storedOrder(seed: string, options: readonly string[]): number[] {
  const idx = options.map((_, i) => i);
  const pinned = idx.filter((i) => PINNED.test(options[i]));
  const free = idx.filter((i) => !pinned.includes(i));
  const bytes = createHash("sha256").update(seed).digest();
  for (let i = free.length - 1; i > 0; i--) {
    const j = bytes[i] % (i + 1);
    [free[i], free[j]] = [free[j], free[i]];
  }
  return [...free, ...pinned];
}

/** The order a row is stored, shown and committed in. */
export function rowOrder(year: IatYear, subject: IatSubject, row: IatRow): number[] {
  const identity = row.options.map((_, i) => i);
  if (year.keyMode === "none") return identity;
  if (row.options.some(namesAnOption)) return identity;
  return storedOrder(`iat-${year.year}-${subject}-${row.ref}`, row.options);
}

/** The stored slot of printed (a). */
export function keyLetter(order: readonly number[]): Label {
  return LABELS[order.indexOf(0)];
}

export const optionFigureFile = (ref: string, printedIndex: number) => `${ref}-opt${printedIndex + 1}.png`;
export const stemFigureFile = (ref: string) => `${ref}.png`;

export function paperIssues(paper: IatPaper): string[] {
  const issues: string[] = [];
  const chapters = IAT_TAXONOMY[paper.subject];
  if (!chapters) return [`unknown subject "${paper.subject}"`];
  const refs = new Set<string>();
  for (const r of paper.rows) {
    const at = `${paper.subject} ${r.ref}`;
    if (refs.has(r.ref)) issues.push(`${at}: duplicate ref`);
    refs.add(r.ref);
    const ch = chapters.find((c) => c.name === r.chapter);
    if (!ch) issues.push(`${at}: chapter "${r.chapter}" is not in the IAT ${paper.subject} taxonomy`);
    else if (!ch.subtopics.includes(r.subtopic)) issues.push(`${at}: subtopic "${r.subtopic}" is not one of ${r.chapter}'s`);
    const leaked = Object.keys(r).filter((k) => /answer|correct|key|solution/i.test(k));
    if (leaked.length) issues.push(`${at}: answer-shaped field (${leaked.join(", ")}) in the questions file`);
    if (r.options?.length !== 4) issues.push(`${at}: needs 4 options, has ${r.options?.length ?? 0}`);
    else if (new Set(r.options.map((o) => o.trim())).size !== 4) issues.push(`${at}: duplicate option text`);
    if (r.optionFigures && r.optionFigures.length !== 4) issues.push(`${at}: optionFigures needs 4 entries, has ${r.optionFigures.length}`);
    if (!r.text?.trim()) issues.push(`${at}: empty text`);
    issues.push(...textIssues(`${at} text`, r.text), ...textIssues(`${at} context`, r.context));
    for (const [i, o] of (r.options ?? []).entries()) issues.push(...textIssues(`${at} option ${i + 1}`, o));
  }
  return issues;
}

export type BlindRow = {
  ref: string;
  context?: string;
  text: string;
  options: string[];
  figure?: string;
  figureNote?: string;
  optionFigures?: string[];
};

/**
 * The solver's payload: stored order only, figure files renamed to stored
 * letters, no answer-shaped field. `copies` says which crop goes to which name.
 */
export function blindPayload(paper: IatPaper, year: IatYear) {
  const copies: { from: string; to: string }[] = [];
  const rows: BlindRow[] = paper.rows.map((r) => {
    const order = rowOrder(year, paper.subject, r);
    const out: BlindRow = { ref: r.ref, text: r.text, options: order.map((p) => r.options[p]) };
    if (r.context) out.context = r.context;
    if (r.figure && r.figure.required !== false) {
      copies.push({ from: stemFigureFile(r.ref), to: stemFigureFile(r.ref) });
      out.figure = `figures/${stemFigureFile(r.ref)}`;
      if (r.figure.note) out.figureNote = r.figure.note;
    }
    if (r.optionFigures) {
      out.optionFigures = order.map((p, slot) => {
        const to = `${r.ref}-${LABELS[slot]}.png`;
        copies.push({ from: optionFigureFile(r.ref, p), to });
        return `figures/${to}`;
      });
    }
    return out;
  });
  return { subject: paper.subject, year: paper.year, rows, copies };
}

export type Verdict = "AGREE" | "DISAGREE" | "NO_KEY" | "MISSING_DERIVATION";

/**
 * Keyed year: the solver against printed (a). No key: the solver against a
 * second solver (NO_KEY until there is one). Nothing is dropped.
 */
export function crosscheck(
  paper: IatPaper,
  year: IatYear,
  derived: readonly DerivedEntry[],
  second?: readonly DerivedEntry[]
) {
  const d = new Map(derived.map((x) => [x.ref, x]));
  const s = new Map((second ?? []).map((x) => [x.ref, x]));
  const rows = paper.rows.map((r) => {
    const mine = d.get(r.ref)?.label?.trim().toUpperCase();
    const key = year.keyMode === "first-option" ? keyLetter(rowOrder(year, paper.subject, r)) : s.get(r.ref)?.label?.trim().toUpperCase();
    let verdict: Verdict;
    if (!mine) verdict = "MISSING_DERIVATION";
    else if (!key) verdict = "NO_KEY";
    else verdict = mine === key ? "AGREE" : "DISAGREE";
    return { ref: r.ref, verdict, derived: mine, key, confidence: d.get(r.ref)?.confidence, flag: d.get(r.ref)?.flag };
  });
  return {
    rows,
    total: rows.length,
    agree: rows.filter((r) => r.verdict === "AGREE").length,
    disagree: rows.filter((r) => r.verdict === "DISAGREE").length,
  };
}

/**
 * A year is committed as ONE source file, numbered 1..N the way the paper runs:
 * Biology, Chemistry, Mathematics, Physics, each by its printed number. So
 * question_number is unique within the source file, and a mock's sections
 * read in paper order.
 */
export function numberAcrossPaper<R extends { ref: string }>(
  papers: readonly { subject: IatSubject; rows: readonly R[] }[]
): { subject: IatSubject; row: R; n: number }[] {
  const order = ["Biology", "Chemistry", "Mathematics", "Physics"];
  for (const p of papers) if (!order.includes(p.subject)) throw new Error(`"${p.subject}" is not an IAT subject`);
  const out: { subject: IatSubject; row: R; n: number }[] = [];
  for (const subject of order) {
    for (const p of papers.filter((x) => x.subject === subject)) {
      for (const row of [...p.rows].sort((a, b) => Number(a.ref) - Number(b.ref))) {
        out.push({ subject: p.subject, row, n: out.length + 1 });
      }
    }
  }
  return out;
}

export type AssembledRow = {
  ref: string;
  questionNumber: string;
  chapter: string;
  subtopic: string;
  difficulty: (typeof DIFFICULTIES)[number];
  text: string;
  context?: string;
  solution: string;
  answer: Label;
  options: { label: Label; text: string; isCorrect: boolean; figureFile?: string; figureWatermark?: "none" }[];
  figure?: IatFigure;
};

export function assemblePaper(input: {
  paper: IatPaper;
  year: IatYear;
  derived: readonly DerivedEntry[];
  second?: readonly DerivedEntry[];
  adjudications?: readonly Adjudication[];
}): { rows: AssembledRow[]; issues: string[] } {
  const { paper, year } = input;
  const issues: string[] = [];
  const rows: AssembledRow[] = [];
  const byRef = <T extends { ref: string }>(xs: readonly T[] | undefined) => new Map((xs ?? []).map((x) => [x.ref, x]));
  const derived = byRef(input.derived);
  const second = byRef(input.second);
  const adj = byRef(input.adjudications);
  const keyed = year.keyMode === "first-option";

  if (keyed && !year.keyConfirmed) {
    return { rows, issues: [`IAT ${year.year}: the (a)-is-correct key format is not confirmed yet; run report.ts and set keyConfirmed`] };
  }

  for (const r of paper.rows) {
    const at = `${paper.subject} ${r.ref}`;
    const a = adj.get(r.ref);
    if (a?.hold) continue;
    const d = derived.get(r.ref);
    if (!d) {
      issues.push(`${at}: no derivation`);
      continue;
    }
    if (!DIFFICULTIES.includes(d.difficulty as (typeof DIFFICULTIES)[number])) {
      issues.push(`${at}: difficulty "${d.difficulty}" is not Easy / Moderate / Hard`);
      continue;
    }
    const order = rowOrder(year, paper.subject, r);
    const mine = d.label?.trim().toUpperCase();
    let answer: string | undefined;

    if (keyed) {
      const key = keyLetter(order);
      if (a?.answer) {
        issues.push(`${at}: an adjudication cannot overrule IISER's key (${key}); use solutionNote to say why`);
        continue;
      }
      if (mine !== key && !a?.solution) {
        issues.push(`${at}: solver ${mine ?? "(none)"} and key ${key} disagree; adjudicate (rewrite the solution)`);
        continue;
      }
      answer = key;
    } else {
      const s = second.get(r.ref)?.label?.trim().toUpperCase();
      if (!s && !a?.answer) {
        issues.push(`${at}: no second derivation (a year with no key needs two solvers)`);
        continue;
      }
      if (s && s !== mine && !a?.answer) {
        issues.push(`${at}: solvers split ${mine} / ${s}; adjudicate`);
        continue;
      }
      answer = a?.answer ?? mine;
    }

    if (!answer || !LABELS.includes(answer as Label)) {
      issues.push(`${at}: answer "${answer ?? ""}" names no option`);
      continue;
    }
    let solution = a?.solution ?? d.working;
    if (a?.solutionNote) solution = `${solution}\n\n${a.solutionNote}`;
    const bad = textIssues(`${at} solution`, solution);
    if (!solution?.trim()) bad.push(`${at}: empty solution`);
    if (bad.length) {
      issues.push(...bad);
      continue;
    }
    rows.push({
      ref: r.ref,
      questionNumber: r.questionNumber,
      chapter: r.chapter,
      subtopic: r.subtopic,
      difficulty: d.difficulty as AssembledRow["difficulty"],
      text: r.text,
      ...(r.context ? { context: r.context } : {}),
      solution,
      answer: answer as Label,
      options: order.map((p, slot) => ({
        label: LABELS[slot],
        text: r.options[p],
        isCorrect: LABELS[slot] === answer,
        ...(r.optionFigures ? { figureFile: optionFigureFile(r.ref, p) } : {}),
        ...(r.optionFigures?.[p]?.watermark ? { figureWatermark: r.optionFigures[p].watermark } : {}),
      })),
      ...(r.figure ? { figure: r.figure } : {}),
    });
  }
  return { rows, issues };
}
