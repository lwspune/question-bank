/**
 * The UGC NET lane's pure core. Spec: tests/ugc-net-lib.test.ts.
 *
 * ── WHERE EACH PART OF A ROW COMES FROM ──────────────────────────────────────
 *   stem, options, chapter, subtopic,   the transcription (data/<shift>.questions.json),
 *   NTA question id                     read off NTA's own master paper
 *   answer                              NTA's FINAL key, looked up by question id
 *   solution, difficulty                a blind solver (or an adjudication's rewrite)
 *
 * NTA's final key prints no question text: one row per question id, with the
 * correct option NUMBER (1-4), "D" for a dropped question, or "2, 4" where NTA
 * accepted two options. The id ties it to the paper, so the transcription
 * carries every question's id and the answer is never read off anything else.
 *
 * Options are stored in NTA's printed order (the master paper prints "Option
 * Shuffling : No"), so printed option N is stored label A-D by position.
 *
 * Owner policy 2026-10-29, as it applies here:
 *   - the solver agrees with NTA: NTA's answer.
 *   - the solver disagrees: a person reads it. NTA's key stays and the
 *     solution is rewritten to teach it, OR (maths certain) the key is
 *     corrected and a notice says NTA's key differed.
 *   - NTA dropped it, or accepted two options: one answer kept, a notice
 *     above the solution, grace in every mock.
 */
import { textIssues } from "../cisce-pyq/lib";
import { UGC_NET_TAXONOMY } from "./taxonomy";

export type KeyValue = { kind: "single"; option: number } | { kind: "dropped" } | { kind: "multi"; options: number[] };

export type KeySection = {
  /** NTA's subject code, e.g. 8 for Commerce. */
  code: number;
  subject: string;
  /** ISO date of the sitting. */
  date: string;
  shift: 1 | 2;
  answers: Map<string, KeyValue>;
};

// June 2024's 21 Aug sections print 9-digit ids; every other section 10 or 11.
const ID = String.raw`\d{9,11}`;
const VALUE = String.raw`D|[1-4](?:\s*,\s*[1-4])*`;
const PAIR = new RegExp(String.raw`(?<![\d])(${ID})\s+(${VALUE})(?![\d])`, "g");

function isoDate(dmy: string): string {
  const [d, m, y] = dmy.split(".");
  return `${y}-${m}-${d}`;
}

function shiftNumber(s: string): 1 | 2 {
  const t = s.trim().toLowerCase();
  if (t === "1" || t === "first") return 1;
  if (t === "2" || t === "second") return 2;
  throw new Error(`NTA key: unknown shift "${s}"`);
}

function keyValue(raw: string): KeyValue {
  if (raw === "D") return { kind: "dropped" };
  const options = raw.split(",").map((x) => Number(x.trim()));
  return options.length === 1 ? { kind: "single", option: options[0] } : { kind: "multi", options };
}

const same = (a: KeyValue, b: KeyValue) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Every subject section of an NTA final-key PDF, read from `pdftotext -layout`
 * output. Two layouts are known:
 *   2024  "Subject: 8 - Commerce   Shift: SHIFT 1   Exam Date: 03.09.2024"
 *   2025  "Exam Date : 27.06.2025  Exam Shift : Second" then "Subject: (030) English"
 * An id listed twice with two different answers is refused, never guessed.
 */
export function parseNtaKey(text: string): KeySection[] {
  const sections: KeySection[] = [];
  let pendingDate: { date: string; shift: 1 | 2 } | undefined;
  let current: KeySection | undefined;
  const seen = new Map<string, KeyValue>();

  for (const line of text.split(/\r?\n/)) {
    const a = line.match(/Subject:\s*(\d+)\s*-\s*(.+?)\s{2,}Shift:\s*SHIFT\s*(\d)\s+Exam Date:\s*(\d{2}\.\d{2}\.\d{4})/);
    const b = line.match(/Exam Date\s*:\s*(\d{2}\.\d{2}\.\d{4})\s+Exam Shift\s*:\s*(\w+)/);
    const c = line.match(/Subject:\s*\((\d+)\)\s*(.+?)\s*$/);
    if (a) {
      current = { code: Number(a[1]), subject: a[2].trim(), date: isoDate(a[4]), shift: shiftNumber(a[3]), answers: new Map() };
      sections.push(current);
      continue;
    }
    if (b) {
      pendingDate = { date: isoDate(b[1]), shift: shiftNumber(b[2]) };
      continue;
    }
    if (c) {
      if (!pendingDate) throw new Error(`NTA key: subject ${c[1]} has no exam date above it`);
      current = { code: Number(c[1]), subject: c[2].trim(), ...pendingDate, answers: new Map() };
      sections.push(current);
      pendingDate = undefined;
      continue;
    }
    for (const m of line.matchAll(PAIR)) {
      const value = keyValue(m[2].replace(/\s+/g, ""));
      const prev = seen.get(m[1]);
      if (prev && !same(prev, value)) throw new Error(`NTA key: question id ${m[1]} is listed twice with different answers`);
      seen.set(m[1], value);
      if (!current) throw new Error(`NTA key: question id ${m[1]} sits above every subject header`);
      current.answers.set(m[1], value);
    }
  }
  return sections;
}

/** NTA's answer for a question id, from whichever section holds it. */
export function keyFor(keys: readonly KeySection[], qid: string): KeyValue | undefined {
  for (const k of keys) {
    const v = k.answers.get(qid);
    if (v) return v;
  }
  return undefined;
}

export type Region = [number, number, number, number];
export type UgcFigure = { file: string; region?: Region; note?: string; watermark?: "none" };

export type UgcRow = {
  /** The printed question number, "1".."50". */
  ref: string;
  /** NTA's question id, as printed on the master paper. */
  qid: string;
  chapter: string;
  subtopic: string;
  /** A set's shared passage, table or instructions. */
  context?: string;
  text: string;
  /** In NTA's printed order, option 1 first. */
  options: string[];
  figure?: UgcFigure;
  _flag?: string;
};

export type UgcPaper = {
  /** The shift id from config.ts, e.g. "2024-09-03-1". */
  shift: string;
  _transcription?: string;
  rows: UgcRow[];
};

export type Confidence = "HIGH" | "MEDIUM" | "LOW";
export type DerivedEntry = {
  ref: string;
  /** A-D: printed option 1-4. */
  label: string;
  value: string;
  working: string;
  difficulty: string;
  confidence: Confidence;
  flag?: string;
};

export type Adjudication = {
  ref: string;
  /** Replaces the solver's working (NTA's key stays): the usual answer to a disagreement. */
  solution?: string;
  solutionNote?: string;
  /** NTA's key is wrong and the maths is certain: the corrected letter. Needs a notice. */
  correctKey?: Label;
  /** For a dropped or two-answer question: the one answer to keep. */
  answer?: Label;
  /** Shown above the solution as "**Note:** ...". */
  notice?: string;
  /** Defective as printed: everyone gets its marks in a mock. Needs a notice. */
  grace?: true;
  hold?: string;
  why?: string;
};

export const LABELS = ["A", "B", "C", "D"] as const;
export type Label = (typeof LABELS)[number];
const DIFFICULTIES = ["Easy", "Moderate", "Hard"] as const;
const letter = (option: number): Label => LABELS[option - 1];

export function paperIssues(paper: UgcPaper): string[] {
  const issues: string[] = [];
  const refs = new Set<string>();
  const qids = new Set<string>();
  for (const r of paper.rows) {
    const at = `${paper.shift} Q${r.ref}`;
    if (refs.has(r.ref)) issues.push(`${at}: duplicate ref`);
    refs.add(r.ref);
    if (!/^\d{10,11}$/.test(r.qid ?? "")) issues.push(`${at}: no NTA question id`);
    else if (qids.has(r.qid)) issues.push(`${at}: question id ${r.qid} used twice`);
    qids.add(r.qid);
    const ch = UGC_NET_TAXONOMY.find((c) => c.name === r.chapter);
    if (!ch) issues.push(`${at}: chapter "${r.chapter}" is not a Paper 1 unit`);
    else if (!ch.subtopics.includes(r.subtopic)) issues.push(`${at}: subtopic "${r.subtopic}" is not one of ${r.chapter}'s`);
    const leaked = Object.keys(r).filter((k) => /answer|correct|key|solution/i.test(k));
    if (leaked.length) issues.push(`${at}: answer-shaped field (${leaked.join(", ")}) in the questions file`);
    if (r.options?.length !== 4) issues.push(`${at}: needs 4 options, has ${r.options?.length ?? 0}`);
    else if (new Set(r.options.map((o) => o.trim())).size !== 4) issues.push(`${at}: duplicate option text`);
    if (!r.text?.trim()) issues.push(`${at}: empty text`);
    issues.push(...textIssues(`${at} text`, r.text), ...textIssues(`${at} context`, r.context));
    for (const [i, o] of (r.options ?? []).entries()) issues.push(...textIssues(`${at} option ${i + 1}`, o));
  }
  return issues;
}

/** The solver's payload: no question id (it would lead to the key), no answer-shaped field. */
export function blindPayload(paper: UgcPaper) {
  return {
    shift: paper.shift,
    rows: paper.rows.map((r) => ({
      ref: r.ref,
      ...(r.context ? { context: r.context } : {}),
      text: r.text,
      options: r.options,
      ...(r.figure ? { figure: `figures/${r.figure.file}`, ...(r.figure.note ? { figureNote: r.figure.note } : {}) } : {}),
    })),
  };
}

export type Verdict = "AGREE" | "DISAGREE" | "DROPPED" | "MULTI" | "NO_KEY" | "MISSING_DERIVATION";

export function crosscheck(paper: UgcPaper, keys: readonly KeySection[], derived: readonly DerivedEntry[]) {
  const d = new Map(derived.map((x) => [x.ref, x]));
  const rows = paper.rows.map((r) => {
    const mine = d.get(r.ref)?.label?.trim().toUpperCase();
    const k = keyFor(keys, r.qid);
    let verdict: Verdict;
    let key: string | undefined;
    if (!mine) verdict = "MISSING_DERIVATION";
    else if (!k) verdict = "NO_KEY";
    else if (k.kind === "dropped") verdict = "DROPPED";
    else if (k.kind === "multi") {
      key = k.options.map(letter).join("/");
      verdict = "MULTI";
    } else {
      key = letter(k.option);
      verdict = mine === key ? "AGREE" : "DISAGREE";
    }
    return { ref: r.ref, verdict, derived: mine, key, confidence: d.get(r.ref)?.confidence, flag: d.get(r.ref)?.flag };
  });
  return {
    rows,
    total: rows.length,
    agree: rows.filter((r) => r.verdict === "AGREE").length,
    disagree: rows.filter((r) => r.verdict === "DISAGREE").length,
  };
}

export type AssembledRow = {
  ref: string;
  qid: string;
  chapter: string;
  subtopic: string;
  difficulty: (typeof DIFFICULTIES)[number];
  text: string;
  context?: string;
  solution: string;
  answer: Label;
  options: { label: Label; text: string; isCorrect: boolean }[];
  figure?: UgcFigure;
  /** Defective or dropped: commit.ts records it in src/lib/mocks/flawed.json. */
  grace?: true;
};

export function assemblePaper(input: {
  paper: UgcPaper;
  keys: readonly KeySection[];
  derived: readonly DerivedEntry[];
  adjudications?: readonly Adjudication[];
}): { rows: AssembledRow[]; issues: string[] } {
  const issues: string[] = [];
  const rows: AssembledRow[] = [];
  const derived = new Map(input.derived.map((x) => [x.ref, x]));
  const adj = new Map((input.adjudications ?? []).map((x) => [x.ref, x]));

  for (const r of input.paper.rows) {
    const at = `${input.paper.shift} Q${r.ref}`;
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
    const k = keyFor(input.keys, r.qid);
    if (!k) {
      issues.push(`${at}: question id ${r.qid} is in no NTA key`);
      continue;
    }
    const mine = d.label?.trim().toUpperCase() as Label | undefined;
    let answer: Label | undefined;
    let notice = a?.notice;
    let grace = a?.grace;

    if (k.kind === "single") {
      const key = letter(k.option);
      if (a?.correctKey) {
        if (!a.notice?.trim()) {
          issues.push(`${at}: correcting NTA's key (${key} -> ${a.correctKey}) needs a notice`);
          continue;
        }
        answer = a.correctKey;
      } else if (mine !== key && !a?.solution) {
        issues.push(`${at}: solver ${mine ?? "(none)"} and NTA's key ${key} disagree; adjudicate`);
        continue;
      } else answer = key;
    } else if (k.kind === "dropped") {
      answer = a?.answer ?? mine;
      notice ??= "NTA dropped this question from its final key, so every candidate got its marks. The working below gives the answer it was set for.";
      grace = true;
    } else {
      const accepted = k.options.map(letter);
      answer = a?.answer ?? mine;
      if (!answer || !accepted.includes(answer)) {
        issues.push(`${at}: NTA accepted ${accepted.join(" and ")}; the kept answer (${answer ?? "none"}) must be one of them`);
        continue;
      }
      notice ??= `NTA's final key accepted both (${k.options.join(") and (")}) for this question.`;
      grace = true;
    }

    if (!answer || !LABELS.includes(answer)) {
      issues.push(`${at}: answer "${answer ?? ""}" names no option`);
      continue;
    }
    if (grace && !notice?.trim()) {
      issues.push(`${at}: grace needs a notice telling students why`);
      continue;
    }
    let solution = a?.solution ?? d.working;
    if (a?.solutionNote) solution = `${solution}\n\n${a.solutionNote}`;
    if (notice) solution = `**Note:** ${notice}\n\n${solution}`;
    const bad = textIssues(`${at} solution`, solution);
    if (!solution?.trim()) bad.push(`${at}: empty solution`);
    if (bad.length) {
      issues.push(...bad);
      continue;
    }
    rows.push({
      ref: r.ref,
      qid: r.qid,
      chapter: r.chapter,
      subtopic: r.subtopic,
      difficulty: d.difficulty as AssembledRow["difficulty"],
      text: r.text,
      ...(r.context ? { context: r.context } : {}),
      solution,
      answer,
      options: r.options.map((text, i) => ({ label: LABELS[i], text, isCorrect: LABELS[i] === answer })),
      ...(r.figure ? { figure: r.figure } : {}),
      ...(grace ? { grace: true as const } : {}),
    });
  }
  return { rows, issues };
}
