// Pure assembly logic for CDS English ingestion — testable, no I/O.
//
// Inputs (per paper, produced by the agent passes documented in README.md):
//   sections[]   — the SECTION-MAP: each section's type + Q-range + verbatim Directions + set label
//   questions[]  — clean transcription: per-Q stem (question-specific only) + options + LLM-derived answer
//   underlines   — { single: {n: word}, triple: {n: {1,2,3}} } for underline sections
//
// Output: ParsedRowPayload[]-compatible rows (subject/chapter/subtopic/context/text/options/answer/...)
// with directions in `context`, each section grouped as a set, underlines marked, and the
// per-question stimulus (Match List / S1-S2) kept IN the hash-bearing stem.
import type { RawRow } from "../../src/lib/upload/validate";
import { SECTION_CATALOG, SUBJECT_NAME, type SectionType } from "./config";

export type Section = {
  type: string; // key into SECTION_CATALOG
  qFrom: number;
  qTo: number;
  directions: string; // verbatim from the paper (with or without a leading "Directions:")
  setLabel: string; // S1, S2, ... (one per section)
  passage?: string; // shared passage text for passage sections (RC / Cloze)
};

export type TQ = {
  number: number;
  stem: string; // clean, question-specific content only
  options: { label: string; text: string }[]; // A-D (errorParts: A,B,C = parts, D = "No error")
  answer: string; // A|B|C|D, LLM-derived
  confidence: string; // HIGH|MED|LOW
  difficulty: string; // EASY|MODERATE|HARD
  reasoning?: string;
  subtopic?: string; // required when the section has perQuestionSubtopic
};

export type Underlines = {
  single?: Record<string, string>;
  triple?: Record<string, { "1"?: string; "2"?: string; "3"?: string }>;
};

export type Flag = { number: number; reason: string };
export type BuildResult = { rows: RawRow[]; flags: Flag[] };

/**
 * Self-heal two recurring transcription-agent quirks before buildRecords:
 *  - `options` emitted as an object `{ "A": "text", ... }` instead of `[{label,text}]`
 *  - difficulty synonyms / casing ("medium", "easy") instead of EASY|MODERATE|HARD
 */
export function normalizeQuestions(raw: unknown[]): TQ[] {
  const diffMap: Record<string, string> = { easy: "EASY", moderate: "MODERATE", hard: "HARD", medium: "MODERATE" };
  return (raw as Record<string, unknown>[]).map((q) => {
    let options = q.options as unknown;
    if (options && !Array.isArray(options) && typeof options === "object") {
      options = Object.entries(options as Record<string, unknown>).map(([label, v]) => ({
        label,
        text: typeof v === "string" ? v : ((v as { text?: string })?.text ?? ""),
      }));
    }
    const d = String(q.difficulty ?? "").trim();
    const difficulty = ["EASY", "MODERATE", "HARD"].includes(d.toUpperCase()) ? d.toUpperCase() : (diffMap[d.toLowerCase()] ?? "MODERATE");
    // A rearrangement-grid agent sometimes returns the ORDERING STRING (e.g. "QSPR") as
    // `answer` instead of the option LABEL — map it back to the matching option's label.
    let answer = String(q.answer ?? "").trim();
    if (!["A", "B", "C", "D"].includes(answer.toUpperCase()) && Array.isArray(options)) {
      const norm = (s: string) => s.replace(/\s+/g, "").toUpperCase();
      const hit = (options as { label: string; text: string }[]).find((o) => norm(o.text ?? "") === norm(answer));
      if (hit) answer = hit.label;
    } else {
      answer = answer.toUpperCase();
    }
    return { ...(q as object), options, difficulty, answer } as TQ;
  });
}

export const und = (w: string) => `\\(\\underline{\\text{${w}}}\\)`;

export function undFirst(text: string, w: string): string {
  if (!w) return text;
  const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
  return text.replace(re, () => und(w));
}

/**
 * The internal provenance bracket this pipeline appends to every solution (see
 * the `solution` template in buildRecords below). It records that the answer is
 * LLM-derived from a booklet with no printed key — a fact worth keeping, but the
 * answer-key export prints `solution` verbatim, so it reaches students.
 *
 * Deliberately anchored to this exact shape rather than a generic `\[[^\]]*\]`:
 * solutions across the bank carry other bracketed editorial notes — `[Textbook…]`
 * errata brackets especially — and a greedy strip would silently delete
 * adjudicated findings. Tolerates an ASCII hyphen for the em dash because the
 * corpus was written over several passes.
 */
const DERIVATION_MARKER_RE =
  /\s*\[LLM-derived,\s*confidence:[^\]]*?;\s*no official key\s*[—–-]\s*verify before PUBLIC\]\s*/g;

/**
 * Remove the provenance bracket from a stored solution. Idempotent, and a no-op
 * on text that never had one. The fact itself is not lost — callers move it to
 * `derived_model` / `derived_at` and a `question_reviews` row, which no surface
 * renders. See tests/cds-strip-marker.test.ts.
 */
export function stripDerivationMarker(solution: string | null | undefined): string {
  if (!solution) return "";
  return solution.replace(DERIVATION_MARKER_RE, " ").trim();
}

export function normalizeDirections(d: string): string {
  const body = d.replace(/^\s*Directions\s*:?\s*/i, "").trim();
  return "Directions: " + body;
}

/** Balanced inline-math delimiters \( \) across a field (catches a stray underline typo). */
export function findLatexImbalance(s: string): string | null {
  const open = (s.match(/\\\(/g) || []).length;
  const close = (s.match(/\\\)/g) || []).length;
  if (open !== close) return `unbalanced \\( (${open}) vs \\) (${close})`;
  return null;
}

function sectionFor(n: number, sections: Section[]): Section | null {
  return sections.find((s) => n >= s.qFrom && n <= s.qTo) ?? null;
}

export function buildRecords(
  sections: Section[],
  questions: TQ[],
  underlines: Underlines
): BuildResult {
  const rows: RawRow[] = [];
  const flags: Flag[] = [];

  for (const q of questions) {
    const sec = sectionFor(q.number, sections);
    if (!sec) { flags.push({ number: q.number, reason: "no section covers this number" }); continue; }
    const cat: SectionType | undefined = SECTION_CATALOG[sec.type];
    if (!cat) { flags.push({ number: q.number, reason: `unknown section type "${sec.type}"` }); continue; }

    const subtopic = cat.perQuestionSubtopic ? (q.subtopic || cat.subtopic) : cat.subtopic;
    if (cat.perQuestionSubtopic && !q.subtopic) flags.push({ number: q.number, reason: `perQuestionSubtopic section but no subtopic given (fell back to "${cat.subtopic}")` });

    let stem = q.stem.trim();
    let options = q.options.map((o) => ({ ...o }));

    // ── underlines ──
    if (cat.underline === "single") {
      const w = underlines.single?.[String(q.number)];
      if (w) stem = undFirst(stem, w);
      else flags.push({ number: q.number, reason: "single-underline section but no underline token" });
    } else if (cat.underline === "triple") {
      const m = (underlines.triple?.[String(q.number)] || {}) as Record<string, string>;
      stem = stem.split("\n").map((ln) => {
        const mt = ln.match(/^(\d)\.\s/);
        if (!mt) return ln;
        const tok = m[mt[1]];
        return tok ? undFirst(ln, tok) : ln;
      }).join("\n");
    } else if (cat.underline === "errorParts") {
      const parts = options.filter((o) => o.label !== "D").map((o) => o.text);
      if (parts.length === 3) stem = `${und(parts[0])} ${und(parts[1])} ${und(parts[2])}.`;
      else flags.push({ number: q.number, reason: "errorParts section needs exactly 3 labelled parts (A,B,C)" });
    }

    // ── context = directions (+ passage for passage sections) ──
    const dir = normalizeDirections(sec.directions);
    const context = cat.passage
      ? `${dir}\n\nPassage\n${(sec.passage || "").trim()}`
      : dir;

    const conf = q.confidence.toUpperCase();
    const note = conf === "HIGH" ? " (verified in review)" : "";
    const solution = `Answer: ${q.answer}. ${(q.reasoning || "").trim()} [LLM-derived, confidence: ${conf}${note}; no official key — verify before PUBLIC]`;

    const opt = (l: string) => options.find((o) => o.label === l)?.text ?? "";
    rows.push({
      sourceRow: q.number,
      questionNumber: String(q.number),
      setLabel: sec.setLabel,
      subject: SUBJECT_NAME,
      chapter: cat.chapter,
      subtopic,
      context,
      question: stem,
      optionA: opt("A"), optionB: opt("B"), optionC: opt("C"), optionD: opt("D"),
      answer: q.answer,
      difficulty: q.difficulty,
      solution,
    });
  }
  return { rows, flags };
}

/** Coverage + structural + collision checks over the assembled rows. */
export function validateRows(rows: RawRow[], qFrom: number, qTo: number): string[] {
  const errs: string[] = [];
  const nums = new Set(rows.map((r) => Number(r.questionNumber)));
  for (let n = qFrom; n <= qTo; n++) if (!nums.has(n)) errs.push(`missing Q${n}`);
  const seen = new Map<string, number>();
  for (const r of rows) {
    const opts = [r.optionA, r.optionB, r.optionC, r.optionD];
    if (opts.some((o) => !o || !o.trim())) errs.push(`Q${r.questionNumber}: blank option`);
    if (!["A", "B", "C", "D"].includes((r.answer || "").toUpperCase())) errs.push(`Q${r.questionNumber}: bad answer "${r.answer}"`);
    for (const [name, val] of [["stem", r.question], ["ctx", r.context], ["A", r.optionA], ["B", r.optionB], ["C", r.optionC], ["D", r.optionD]] as [string, string | undefined][]) {
      const bad = val ? findLatexImbalance(val) : null;
      if (bad) errs.push(`Q${r.questionNumber} ${name}: ${bad}`);
    }
    const key = [r.question.replace(/\s+/g, " ").trim(), ...opts.map((o) => (o || "").replace(/\s+/g, " ").trim()).sort(), r.answer].join("\n");
    if (seen.has(key)) errs.push(`Q${r.questionNumber}: content_hash collision with Q${seen.get(key)} (stem/options/answer identical — fold stimulus into stem)`);
    seen.set(key, Number(r.questionNumber));
  }
  return errs;
}
