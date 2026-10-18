// Pure core for the MARATHI-MEDIUM prints of the MH SSC Class-10 board papers.
// Unit-tested in tests/mh-ssc-10-marathi.test.ts. No IO here.
//
// The board prints every subject paper twice, English medium and Marathi medium
// (codes in pairs: N 919 English Algebra, N 920 Marathi). The two are the SAME
// paper: same numbering, same options in the same order. So a Marathi question
// is not a new question. It is stored as a translation (migration 0118) of the
// canonical English row, which keeps the hash, the key, the stats and the mocks.
//
// "Translation" names the storage only. The Marathi WORDING is read from the
// board's own Marathi print, never written from the English. The checks below
// exist to catch the two ways that goes wrong: a Marathi reading attached to the
// wrong English row (structure + numbers), and English text where the Marathi
// print should have been read (script share).
import katex from "katex";
import { maskMathZones } from "../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import type { PaperQuestion } from "./lib";

type Label = "A" | "B" | "C" | "D";
const LABELS: Label[] = ["A", "B", "C", "D"];

/** One question as read from a Marathi-medium print. `ref` is the ENGLISH
 *  paper's ref for the same question (the numbering is identical). */
export type MarathiQuestion = {
  ref: string;
  stem: string;
  context?: string;
  options?: { label: string; text: string }[];
  /** Marathi model answer (the solution lane). MCQ ends "योग्य पर्याय: X." */
  solution?: string;
  /** Free-text remark from the reader about a print difference. Not stored. */
  note?: string;
};

export type Finding = { ref: string; level: "error" | "warn"; reason: string };

const DEVA_LABELS: Record<string, Label> = { अ: "A", ब: "B", क: "C", ड: "D" };

/** The printed option letter → the bank's A-D. Science papers print (अ)(ब)(क)(ड). */
export function marathiLabel(raw: string): Label {
  const s = raw.trim().replace(/^\(|\)$/g, "").trim();
  const latin = s.toUpperCase();
  if ((LABELS as string[]).includes(latin)) return latin as Label;
  const deva = DEVA_LABELS[s];
  if (deva) return deva;
  throw new Error(`option label "${raw}" is not A-D or अ/ब/क/ड`);
}

const DEVA_LETTER = /[ऀ-ॣ॰-ॿ]/g; // Devanagari minus its digits
const LATIN_LETTER = /[A-Za-z]/g;
/** Below this many letters outside math, the script share says nothing. */
const MIN_LETTERS = 8;

/** Share of the letters OUTSIDE math zones that are Devanagari; null when the
 *  text has too few such letters to judge (a stem that is all maths). */
export function devanagariShare(text: string): number | null {
  const { masked } = maskMathZones(text);
  const deva = masked.match(DEVA_LETTER)?.length ?? 0;
  const latin = masked.match(LATIN_LETTER)?.length ?? 0;
  if (deva + latin < MIN_LETTERS) return null;
  return deva / (deva + latin);
}

const DEVA_DIGITS = "०१२३४५६७८९";

/** Every number in the text, Devanagari digits read as Latin, sorted. */
export function numberTokens(text: string): string[] {
  const latin = text.replace(/[०-९]/g, (d) => String(DEVA_DIGITS.indexOf(d)));
  return (latin.match(/\d+(?:\.\d+)?/g) ?? []).sort();
}

const sameList = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

function delimiterProblem(text: string): string | null {
  const count = (re: RegExp) => text.match(re)?.length ?? 0;
  if (count(/\\\(/g) !== count(/\\\)/g)) return "unbalanced \\( \\)";
  if (count(/\\\[/g) !== count(/\\\]/g)) return "unbalanced \\[ \\]";
  return null;
}

/** The first maths zone KaTeX refuses, if any (the site draws every zone with it). */
function katexProblem(text: string): { zone: string; message: string } | null {
  for (const m of text.matchAll(/\\\(([\s\S]*?)\\\)/g)) {
    try {
      katex.renderToString(m[1], { throwOnError: true, strict: "ignore" });
    } catch (e) {
      return { zone: m[1].slice(0, 60), message: (e as Error).message.slice(0, 80) };
    }
  }
  return null;
}

function textOf(q: { stem: string; context?: string; options?: { text: string }[] }): string {
  return [q.context ?? "", q.stem, ...(q.options ?? []).map((o) => o.text)].join("\n");
}

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F]/;

const MCQ_KEY =/योग्य पर्याय\s*:\s*([A-D])\s*\.?\s*$/;

/**
 * Check a Marathi paper against its English twin. Errors block the commit;
 * warnings are for the main session to read (a number differing between the two
 * prints is usually the print, not a misreading, but it has to be looked at).
 */
export function checkMarathiPaper(
  english: PaperQuestion[],
  marathi: MarathiQuestion[],
  opts: { requireSolution: boolean },
): Finding[] {
  const out: Finding[] = [];
  const err = (ref: string, reason: string) => out.push({ ref, level: "error", reason });
  const warn = (ref: string, reason: string) => out.push({ ref, level: "warn", reason });

  const enByRef = new Map(english.map((q) => [q.ref, q]));
  const mrRefs = marathi.map((q) => q.ref);
  const mrSet = new Set(mrRefs);
  if (mrSet.size !== mrRefs.length) {
    for (const r of mrRefs.filter((r, i) => mrRefs.indexOf(r) !== i)) err(r, "ref given twice");
  }
  for (const q of english) if (!mrSet.has(q.ref)) err(q.ref, "missing from the Marathi reading");
  for (const r of mrRefs) if (!enByRef.has(r)) err(r, "not in the English paper");
  const common = mrRefs.filter((r) => enByRef.has(r));
  const enOrder = english.map((q) => q.ref).filter((r) => mrSet.has(r));
  if (!sameList(common, enOrder)) err(common.find((r, i) => r !== enOrder[i]) ?? "?", "question order differs from the English paper");

  const contextBySet = new Map<string, { ref: string; context: string }>();

  for (const m of marathi) {
    const e = enByRef.get(m.ref);
    if (!e) continue;

    const fields: [string, string | undefined][] = [
      ["stem", m.stem],
      ["context", m.context],
      ["solution", m.solution],
      ...(m.options ?? []).map((o): [string, string] => [`option ${o.label}`, o.text]),
    ];
    for (const [field, v] of fields) {
      if (v === undefined) continue;
      // A backslash lost on the way in turns \theta into TAB + "heta" and \r…
      // into a carriage return: a control character is always a corruption.
      if (CONTROL.test(v)) err(m.ref, `${field} carries a control character (a lost backslash?)`);
      if (normalizeNewlines(v) !== v) err(m.ref, `${field} carries a literal \\n`);
      const d = delimiterProblem(v);
      if (d) err(m.ref, `${field}: ${d}`);
      else {
        const k = katexProblem(v);
        if (k) err(m.ref, `${field}: KaTeX cannot render \\(${k.zone}\\): ${k.message}`);
      }
    }
    if (!m.stem.trim()) err(m.ref, "empty stem");

    if (e.format === "mcq") {
      const o = m.options ?? [];
      let labels: Label[] = [];
      try {
        labels = o.map((x) => marathiLabel(x.label));
      } catch (x) {
        err(m.ref, (x as Error).message);
      }
      if (o.length !== 4 || new Set(labels).size !== 4) err(m.ref, `MCQ needs exactly four options A-D (got ${o.length})`);
    } else if (m.options?.length) {
      err(m.ref, "a written question carries options");
    }

    if (Boolean(e.context?.trim()) !== Boolean(m.context?.trim())) {
      err(m.ref, e.context ? "the English row has a shared passage and the Marathi has none" : "the Marathi has a passage the English row does not");
    }
    if (e.setLabel && e.context && m.context) {
      // Siblings must read alike only where the ENGLISH rows share a passage: a
      // graph-drawing row can carry the heading alone while its sub-questions
      // carry the data.
      const key = `${e.setLabel}\u0000${e.context}`;
      const prev = contextBySet.get(key);
      if (!prev) contextBySet.set(key, { ref: m.ref, context: m.context });
      else if (prev.context !== m.context) err(m.ref, `set ${e.setLabel}: passage differs from ${prev.ref}'s`);
    }

    const share = devanagariShare(m.stem);
    if (share !== null && share < 0.5) err(m.ref, `stem is mostly Latin letters (Devanagari ${Math.round(share * 100)}%): read the Marathi print`);

    const enNums = numberTokens(textOf(e));
    const mrNums = numberTokens(textOf(m));
    if (!sameList(enNums, mrNums)) warn(m.ref, `numbers differ: English [${enNums.join(" ")}] vs Marathi [${mrNums.join(" ")}]`);

    if (opts.requireSolution) {
      if (!m.solution?.trim()) {
        err(m.ref, "no Marathi solution");
      } else {
        const s = devanagariShare(m.solution);
        if (s !== null && s < 0.5) err(m.ref, `solution is mostly Latin letters (Devanagari ${Math.round(s * 100)}%)`);
        // The Marathi answer is written FROM the checked English one, so its
        // working should carry the same numbers; a difference is a changed step.
        const enSol = numberTokens(e.solution ?? "");
        const mrSol = numberTokens(m.solution);
        if (e.solution && !sameList(enSol, mrSol)) {
          warn(m.ref, `solution numbers differ: English [${enSol.join(" ")}] vs Marathi [${mrSol.join(" ")}]`);
        }
        if (e.format === "mcq") {
          const k = m.solution.trim().match(MCQ_KEY)?.[1];
          if (!k) err(m.ref, 'MCQ solution must end "योग्य पर्याय: X."');
          else if (k !== e.answer) err(m.ref, `solution names option ${k}, the key is ${e.answer}`);
        }
      }
    }
  }
  return out;
}

/** Attach the solution lane's answers to the transcription by ref. */
export function mergeSolutions(
  marathi: MarathiQuestion[],
  solutions: { ref: string; solution: string }[],
): MarathiQuestion[] {
  const refs = new Set(marathi.map((q) => q.ref));
  const byRef = new Map<string, string>();
  for (const s of solutions) {
    if (!refs.has(s.ref)) throw new Error(`solution for ${s.ref}, which the transcription does not have`);
    if (byRef.has(s.ref)) throw new Error(`solution for ${s.ref} given twice`);
    byRef.set(s.ref, s.solution);
  }
  return marathi.map((q) => (byRef.has(q.ref) ? { ...q, solution: byRef.get(q.ref) } : q));
}

export type TranslationWrite = {
  questionId: string;
  paperId: string;
  ref: string;
  stem: string;
  context: string | null;
  solution: string | null;
  options: { label: Label; text: string }[];
};

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

/**
 * One write per QUESTION. The per-exam hash dedup stores a question the board
 * repeated across sittings once, so two papers can point at the same row: the
 * first paper (input order) wins, and a second print that READS differently is
 * reported, never silently dropped.
 */
export function planTranslations(
  entries: { paperId: string; questionId: string; question: MarathiQuestion }[],
): { writes: TranslationWrite[]; conflicts: { questionId: string; kept: string; other: string; ref: string }[] } {
  const writes = new Map<string, TranslationWrite>();
  const conflicts: { questionId: string; kept: string; other: string; ref: string }[] = [];
  for (const { paperId, questionId, question: q } of entries) {
    const options = (q.options ?? [])
      .map((o) => ({ label: marathiLabel(o.label), text: o.text }))
      .sort((a, b) => a.label.localeCompare(b.label));
    const w: TranslationWrite = {
      questionId,
      paperId,
      ref: q.ref,
      stem: q.stem,
      context: q.context?.trim() ? q.context : null,
      solution: q.solution?.trim() ? q.solution : null,
      options,
    };
    const prev = writes.get(questionId);
    if (!prev) {
      writes.set(questionId, w);
      continue;
    }
    const sig = (x: TranslationWrite) => squash([x.context ?? "", x.stem, ...x.options.map((o) => o.text)].join("|"));
    if (sig(prev) !== sig(w)) conflicts.push({ questionId, kept: prev.paperId, other: paperId, ref: q.ref });
  }
  return { writes: [...writes.values()], conflicts };
}
