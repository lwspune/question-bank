// Pure core for the UP Board lane (tests/up-board-lib.test.ts).
//
// A paper is one JSON file, data/<id>.questions.json, holding every question in
// English (the canonical row) with its Hindi print under `hi`. It moves through
// two stages, and paperIssues checks each:
//
//   transcribed  read from the page by an agent: both languages, chapter,
//                subtopic, difficulty. NO answer and NO solution: transcription
//                is blind, so it cannot lean an answer toward a guess.
//   solved       every MCQ keyed (two blind passes agreed, or settled by hand;
//                UPMSP publishes no key) and every row carrying a solution in
//                English AND Hindi (owner, 2026-11-17).
//
// content_hash is English only, so a Hindi correction never moves a row.
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { OptionLabel, ParsedRowPayload } from "../../src/lib/upload/validate";
import { findLatexImbalance, findTableWithoutSeparator } from "../upsc/lib";
import { numberBag } from "../mpsc/lib";
import { solverVoice } from "../ras/lib";
import { SUBJECTS, type UpSubject, type UpSubjectKey } from "./config";

export type Label = "A" | "B" | "C" | "D";
const LABELS: Label[] = ["A", "B", "C", "D"];

export type UpHindi = { stem: string; context?: string; options?: string[]; solution?: string };

export type UpQuestion = {
  /** Unique within the paper: "Q1".."Q20" for Section A, "B1a", "B3a"/"B3b" for an OR pair. */
  ref: string;
  /** As printed: "2", "1 (c)", "3 (a)". */
  questionNumber: string;
  section: string;
  marks: number;
  format: "mcq" | "subjective";
  chapter: string;
  subtopic: string;
  /** The bank's own scale (the `difficulty` enum, migration 0001). */
  difficulty: "EASY" | "MODERATE" | "HARD";
  stem: string;
  context?: string;
  options?: { label: string; text: string }[];
  answer?: Label;
  solution?: string;
  /** The ref of the question this one is the OR alternative to. Both are ingested. */
  alternativeTo?: string;
  /**
   * A question that needs its printed figure: the 1-based page of the ENGLISH
   * print and the figure's box as fractions of the page [left, top, right,
   * bottom]. The crop is cut and checked by the main session.
   */
  figure?: { page: number; region?: [number, number, number, number]; note?: string };
  hi: UpHindi;
  /** What the transcriber saw and did not "fix": a misprint, an unclear digit. */
  _flag?: string;
};

export type UpPaper = {
  /** "<code>-<SERIES>", e.g. "822-BW". */
  paper: string;
  year: number;
  subject: UpSubjectKey;
  /** The transcriber's page map: which page carries which language and section. */
  pages?: string;
  questions: UpQuestion[];
};

export type PaperFile = { id: string; subject: UpSubjectKey; year: number; code: string; series: string; file: string };

/** upboardonline's file name -> the paper. Throws on anything outside the scope. */
export function parsePaperFile(name: string): PaperFile {
  const base = name.replace(/\.pdf$/i, "");
  const m = /^up-board-class-(10|12)-([a-z]+)-(\d{3})-([a-z]{2})-(20\d\d)$/.exec(base);
  if (!m) throw new Error(`not a board paper file name: ${name}`);
  const [, cls, word, code, series, year] = m;
  const subject = Object.values(SUBJECTS).find((s) => s.cls === Number(cls) && s.fileWord === word);
  if (!subject) throw new Error(`${name}: class ${cls} ${word} is outside this lane's scope`);
  if (subject.code !== code) throw new Error(`${name}: code ${code} is not ${subject.key}'s code ${subject.code}`);
  return { id: `${year}-${code}-${series.toUpperCase()}`, subject: subject.key, year: Number(year), code, series: series.toUpperCase(), file: `${base}.pdf` };
}

const splitPaper = (p: UpPaper) => {
  const [code, series] = p.paper.split("-");
  return { code, series };
};

/** Every row of a paper carries this, so one DELETE removes exactly that paper. */
export function sourceFileFor(p: UpPaper): string {
  const { code, series } = splitPaper(p);
  return `up-board-${SUBJECTS[p.subject].cls}-pyq-${p.year}-${code}-${series}`;
}

/** The public sitting note. The year is pyq_year; the series tells two papers of a year apart. */
export function pyqNoteFor(p: UpPaper): string {
  const { code, series } = splitPaper(p);
  return `Paper ${code} (${series})`;
}

const DEVANAGARI = /[ऀ-ॿ]/;
const LATIN_WORD = /[A-Za-z]{3,}/;
const prose = (s: string) => s.replace(/\\\([\s\S]*?\\\)/g, " ");

export type Stage = "transcribed" | "solved";

/** Every hard error in a paper at the given stage. Empty = ok. */
export function paperIssues(
  p: UpPaper,
  catalog: Map<string, string[]>,
  stage: Stage,
  opts: { expectMcq?: number } = {}
): string[] {
  const out: string[] = [];
  const refs = new Set<string>();
  for (const q of p.questions) {
    const id = q.ref;
    if (refs.has(id)) out.push(`${id}: duplicate ref`);
    refs.add(id);
  }

  for (const q of p.questions) {
    const id = q.ref;
    if (!q.questionNumber?.trim()) out.push(`${id}: no questionNumber`);

    const subs = catalog.get(q.chapter);
    if (!subs) out.push(`${id}: chapter "${q.chapter}" is not in the catalog`);
    else if (!subs.includes(q.subtopic)) out.push(`${id}: subtopic "${q.subtopic}" is not under ${q.chapter}`);
    if (!["EASY", "MODERATE", "HARD"].includes(q.difficulty)) {
      out.push(`${id}: difficulty "${q.difficulty}" (want EASY, MODERATE or HARD)`);
    }

    if (q.alternativeTo && !refs.has(q.alternativeTo)) out.push(`${id}: alternativeTo "${q.alternativeTo}" names no row`);

    // English
    if (q.format === "mcq") {
      const labels = (q.options ?? []).map((o) => o.label);
      if (labels.join("") !== "ABCD") out.push(`${id}: mcq needs options A-D, has ${labels.join(" ") || "none"}`);
      (q.options ?? []).forEach((o) => {
        if (!o.text?.trim()) out.push(`${id}: option ${o.label} is blank`);
      });
    } else if (q.format === "subjective") {
      if (q.options?.length) out.push(`${id}: a written row carries options`);
    } else {
      out.push(`${id}: format "${q.format as string}"`);
    }

    const en: [string, string | undefined][] = [
      ["stem", q.stem],
      ["context", q.context],
      ["solution", q.solution],
      ...(q.options ?? []).map((o): [string, string] => [`option ${o.label}`, o.text]),
    ];
    // Hindi
    const hi = q.hi;
    const hiFields: [string, string | undefined][] = hi
      ? [
          ["hi stem", hi.stem],
          ["hi context", hi.context],
          ["hi solution", hi.solution],
          ...(hi.options ?? []).map((o, i): [string, string] => [`hi option ${LABELS[i] ?? i}`, o]),
        ]
      : [];
    if (!hi) out.push(`${id}: no Hindi version (hi)`);
    else {
      if (!hi.stem?.trim()) out.push(`${id}: hi stem is blank`);
      else if (!DEVANAGARI.test(hi.stem) && LATIN_WORD.test(prose(q.stem))) out.push(`${id}: hi stem carries no Devanagari`);
      if (q.format === "mcq") {
        const n = hi.options?.length ?? 0;
        if (n !== 4) out.push(`${id}: hi has ${n} options, expected 4`);
        (hi.options ?? []).forEach((o, i) => {
          if (!o?.trim()) out.push(`${id}: hi option ${LABELS[i]} is blank`);
        });
      } else if (hi.options?.length) out.push(`${id}: a written row carries Hindi options`);
      if (Boolean(q.context) !== Boolean(hi.context)) out.push(`${id}: context present in ${q.context ? "English" : "Hindi"} only`);
    }

    for (const [name, text] of [...en, ...hiFields]) {
      if (!text) continue;
      const latex = findLatexImbalance(text);
      if (latex) out.push(`${id}: ${name}: ${latex}`);
      const table = findTableWithoutSeparator(text);
      if (table) out.push(`${id}: ${name}: ${table}`);
      if (normalizeNewlines(text) !== text) out.push(`${id}: ${name} has a literal \\n`);
      if (/upboardonline/i.test(text)) out.push(`${id}: carries the upboardonline.com footer`);
    }

    if (stage === "transcribed") {
      if (q.answer || q.solution || hi?.solution) out.push(`${id}: carries an answer at the transcribed stage`);
    } else {
      if (q.format === "mcq" && !q.answer) out.push(`${id}: mcq has no answer`);
      if (q.answer && !LABELS.includes(q.answer)) out.push(`${id}: answer "${q.answer}" is not A-D`);
      if (!q.solution?.trim()) out.push(`${id}: no English solution`);
      else {
        const voice = solverVoice(q.solution);
        if (voice.length) out.push(`${id}: solution reads as solver notes (${voice.join(", ")})`);
      }
      if (!hi?.solution?.trim()) out.push(`${id}: no Hindi solution`);
      else if (!DEVANAGARI.test(hi.solution)) out.push(`${id}: hi solution carries no Devanagari`);
    }
  }

  if (opts.expectMcq !== undefined) {
    const n = p.questions.filter((q) => q.format === "mcq").length;
    if (n !== opts.expectMcq) out.push(`paper: ${n} MCQ(s), expected ${opts.expectMcq}`);
  }
  return [...new Set(out)];
}

const sameBag = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

/**
 * TRIAGE, not a gate: a field whose numbers differ between the two languages.
 * Usually a misread digit in one of them; occasionally a real print difference,
 * which is then recorded in the question's _flag.
 */
export function parityWarnings(q: UpQuestion): string[] {
  const out: string[] = [];
  const pair = (name: string, en?: string, hi?: string) => {
    const a = numberBag(en ?? "");
    const b = numberBag(hi ?? "");
    if (!sameBag(a, b)) out.push(`${q.ref}: ${name} numbers differ: en ${a.join(" ") || "(none)"} hi ${b.join(" ") || "(none)"}`);
  };
  if (!q.hi) return out;
  pair("stem", q.stem, q.hi.stem);
  if (q.context || q.hi.context) pair("context", q.context, q.hi.context);
  (q.options ?? []).forEach((o, i) => pair(`option ${o.label}`, o.text, q.hi.options?.[i]));
  return out;
}

/** A solved paper -> the rows commitStaged takes. Throws on an unsolved MCQ. */
export function buildRows(p: UpPaper, subject: UpSubject): ParsedRowPayload[] {
  return p.questions.map((q, i) => {
    const base = {
      sourceRow: i + 1,
      questionNumber: q.questionNumber,
      subjectName: subject.subjectName,
      chapterName: q.chapter,
      subtopicName: q.subtopic,
      text: q.stem,
      difficulty: q.difficulty as ParsedRowPayload["difficulty"],
      ...(q.context ? { context: q.context } : {}),
      ...(q.solution ? { solution: q.solution } : {}),
    };
    if (q.format === "subjective") {
      return { ...base, questionFormat: "subjective" as const, options: [], contentHash: subjectiveContentHash(q.stem, q.context ?? null) };
    }
    if (!q.answer) throw new Error(`${q.ref}: mcq has no answer`);
    const opts = q.options ?? [];
    return {
      ...base,
      questionFormat: "mcq" as const,
      options: opts.map((o) => ({ label: o.label as OptionLabel, text: o.text, isCorrect: o.label === q.answer })),
      contentHash: contentHash(q.stem, opts.map((o) => o.text), q.answer),
    };
  });
}

/** Pass A: a letter for every MCQ and a solution in both languages for every row. */
export type SolverPass = { answers: Record<string, Label>; solutions: Record<string, { en: string; hi: string }> };
/** Pass B: an independent, blind letter for every MCQ (English only, no solutions kept). */
export type BlindPass = { answers: Record<string, Label> };
/** A dispute settled by hand: the right letter and the solution that shows it. */
export type Settled = Record<string, { answer: Label; en: string; hi: string; note?: string }>;

export const NO_KEY_NOTE = {
  en: "*Solution by PYQ Vault: UP Board does not publish an answer key.*",
  hi: "*हल PYQ Vault द्वारा: यूपी बोर्ड उत्तर कुंजी प्रकाशित नहीं करता।*",
};

/**
 * Write answers and solutions into a transcribed paper. An MCQ is keyed only
 * where both blind passes agree or a person settled it; any other dispute
 * throws, so a guess can never reach the file. Every solution, in both
 * languages, ends with the note that UP Board publishes no key.
 */
export function applySolutions(p: UpPaper, a: SolverPass, b: BlindPass, settled: Settled): UpPaper {
  const { agreed, disputed } = answerSummary(p.questions, a.answers, b.answers);
  const open = disputed.filter((d) => !settled[d.ref]);
  if (open.length) {
    throw new Error(`unsettled: ${open.map((d) => `${d.ref} (A ${d.a ?? "-"}, B ${d.b ?? "-"})`).join(", ")}`);
  }
  const questions = p.questions.map((q) => {
    const s = settled[q.ref];
    const sol = s ? { en: s.en, hi: s.hi } : a.solutions[q.ref];
    if (!sol?.en?.trim() || !sol?.hi?.trim()) throw new Error(`${q.ref}: no solution in pass A`);
    const answer = q.format === "mcq" ? (s?.answer ?? agreed[q.ref]) : undefined;
    return {
      ...q,
      ...(answer ? { answer } : {}),
      solution: `${sol.en.trim()}\n\n${NO_KEY_NOTE.en}`,
      hi: { ...q.hi, solution: `${sol.hi.trim()}\n\n${NO_KEY_NOTE.hi}` },
    };
  });
  return { ...p, questions };
}

export type Dispute = { ref: string; a: Label | null; b: Label | null };

/** Two blind passes' MCQ letters: what they agree on, and every ref they do not. */
export function answerSummary(
  mcqs: UpQuestion[],
  a: Record<string, Label>,
  b: Record<string, Label>
): { agreed: Record<string, Label>; disputed: Dispute[] } {
  const agreed: Record<string, Label> = {};
  const disputed: Dispute[] = [];
  for (const q of mcqs) {
    if (q.format !== "mcq") continue;
    const x = a[q.ref] ?? null;
    const y = b[q.ref] ?? null;
    if (x && x === y) agreed[q.ref] = x;
    else disputed.push({ ref: q.ref, a: x, b: y });
  }
  return { agreed, disputed };
}
