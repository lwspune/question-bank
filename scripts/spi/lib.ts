// Pure core of the SPI lane. A paper's transcript (transcripts/<paperId>.txt) is read
// by SSC CGL's parser, whose format already carries what a two-part, many-subject paper
// needs (subject:, context:/context_from:, figure:, flawed:/note:/notice:). This file
// checks a transcript against its paper, turns it into upload rows, and runs the
// verify lane: a stripped packet out, a second agent's answers back, a comparison.
import type { RawRow } from "../../src/lib/upload/validate";
import { FIGURE_OPTION } from "../ssc-cgl/figures";
import { literalDollar, studentSolution, type Label, type TranscriptQuestion } from "../ssc-cgl/lib";
import { CATALOG, DERIVED_DISCLOSURE, partOf, type Paper } from "./config";

const LABELS: Label[] = ["A", "B", "C", "D"];

/** Symbols the brief says to write as LaTeX. ₹ and plain ASCII are fine. */
const RAW_SYMBOL = /[×÷≥≤≠≈∞√∑°±·²³¹⁰⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉α-ωΑ-Ω½⅓¼¾∈∪∩→←π]/;
/** A solution that points at an option by its letter instead of its content. */
const LETTER_NAMED = /\b(option|choice|answer)\s*\(?[A-Da-d]\)?(?![A-Za-z])|\([a-d]\)\s+is\s+(correct|right|the answer)/i;

/** A \( ... \) zone holding ₹: KaTeX has no metrics for it and falls back to another font. */
const MATH_ZONE_WITH_RUPEE = /\\\((?:(?!\\\)).)*₹/s;

export type PaperCheck = { problems: string[]; figures: number[]; flawed: number[] };

export function subjectOf(q: TranscriptQuestion, paper: Paper): string | undefined {
  return q.subject ?? partOf(paper, q.number)?.defaultSubject;
}

/**
 * Check a transcript (or one slice of it, `range`) against its paper: numbering whole,
 * each block filed under a subject of its own part and a chapter of that subject, and
 * the house rules for text that ships to students.
 */
export function checkPaper(qs: TranscriptQuestion[], paper: Paper, range?: { from: number; to: number }): PaperCheck {
  const from = range?.from ?? 1;
  const to = range?.to ?? paper.parts.at(-1)!.to;
  const problems: string[] = [];
  const have = new Set(qs.map((q) => q.number));
  const missing: string[] = [];
  for (let n = from; n <= to; n++) if (!have.has(n)) missing.push(`Q${n}`);
  if (missing.length) problems.push(`missing ${missing.join(", ")}`);
  const outside = qs.filter((q) => q.number < from || q.number > to).map((q) => `Q${q.number}`);
  if (outside.length) problems.push(`outside ${from}-${to}: ${outside.join(", ")}`);

  for (const q of qs) {
    const p = (msg: string) => problems.push(`Q${q.number}: ${msg}`);
    const part = partOf(paper, q.number);
    if (!part) continue; // already reported as outside
    const subject = subjectOf(q, paper);
    if (!subject) p("needs a subject: line");
    else if (!part.subjects.includes(subject)) p(`subject "${subject}" is not in ${part.title.split(":")[0]}`);
    else if (!CATALOG[subject]?.includes(q.chapter)) p(`chapter "${q.chapter}" is not a ${subject} chapter`);

    const texts = [q.context ?? "", q.stem, ...q.options, q.solution];
    for (const t of texts) {
      const m = RAW_SYMBOL.exec(t);
      if (m) {
        p(`raw symbol "${m[0]}": write it as LaTeX`);
        break;
      }
    }
    if (texts.some(literalDollar)) p("two bare dollar signs on one line: write each as \\$");
    if (texts.some((t) => MATH_ZONE_WITH_RUPEE.test(t))) p("rupee sign inside \\(...\\): KaTeX has no glyph for it, write ₹ outside the maths");
    if (LETTER_NAMED.test(q.solution)) p("the solution names an option by letter: name its content");
    if (q.solution.includes("—")) p("em dash in the solution");
    if (q.flawed && !q.note) p("flawed without a note");
    // A draft slice is checked before the blind comparison, when the key is not settled yet.
    if (!range && q.flawed && !q.notice) p("flawed without a notice: the line students read above the solution");
    // commit.ts maps option pictures to letters by position, so they must be A, AB, ABC or ABCD.
    const pictured = pictureOptions(q);
    if (pictured.length && pictured.join("") !== LABELS.slice(0, pictured.length).join("")) p("picture options must run from A");
    if ((q.figure === "options" || q.figure === "stem+options") && !pictured.length) p(`figure: ${q.figure} but no [figure] option`);
    if (pictured.length && q.figure !== "options" && q.figure !== "stem+options") p("[figure] options need figure: options or stem+options");
  }
  return {
    problems,
    figures: qs.filter((q) => q.figure !== "none").map((q) => q.number),
    flawed: qs.filter((q) => q.flawed).map((q) => q.number),
  };
}

/** The rows the Excel upload's validator takes, one per question, in number order. */
export function toRawRows(qs: TranscriptQuestion[], paper: Paper): RawRow[] {
  return [...qs]
    .sort((a, b) => a.number - b.number)
    .map((q) => ({
      sourceRow: q.number,
      questionNumber: String(q.number),
      subject: subjectOf(q, paper) ?? "",
      chapter: q.chapter,
      subtopic: q.subtopic,
      ...(q.context ? { context: q.context } : {}),
      question: q.stem,
      optionA: q.options[0],
      optionB: q.options[1],
      optionC: q.options[2],
      optionD: q.options[3],
      answer: q.answer,
      difficulty: q.difficulty,
      solution: paper.answerSource === "derived" ? `${studentSolution(q)}\n\n${DERIVED_DISCLOSURE}` : studentSolution(q),
    }));
}

/**
 * Join pass-1 drafts (in number order) into one transcript under `header`. Anything a draft
 * carries before its first "=== n" line is dropped: the parser reads a block's solution to
 * the next "===", so a draft's own preamble would otherwise land at the end of the previous
 * draft's last solution (it did, once, in SPI 2022 Q38).
 */
export function mergeDrafts(drafts: string[], header: string): string {
  const bodies = drafts.map((d, i) => {
    const text = d.replace(/\r\n/g, "\n");
    const at = text.search(/^=== \d+\s*$/m);
    if (at === -1) throw new Error(`draft ${i + 1} has no "=== n" block`);
    return text.slice(at).trimEnd();
  });
  return `${header.trimEnd()}\n\n${bodies.join("\n\n")}\n`;
}

/**
 * Where a figure block's crops live (committed under figures/<paperId>/): one stem picture,
 * and one picture per option when the options are pictures. The shape is SSC CGL's
 * CommitRow `figures`, so its parseCommitRows hashes and stores them.
 */
export function figurePaths(q: TranscriptQuestion, dir: string): { stem: string | null; options: string[] | null } {
  const base = `${dir}/q${String(q.number).padStart(3, "0")}`;
  const pictured = pictureOptions(q);
  return {
    stem: q.figure === "stem" || q.figure === "stem+options" ? `${base}.png` : null,
    options: (q.figure === "options" || q.figure === "stem+options") && pictured.length ? pictured.map((l) => `${base}-${l}.png`) : null,
  };
}

/** Labels whose option is a picture. A text option beside them ("None of these.") stays text. */
function pictureOptions(q: TranscriptQuestion): Label[] {
  return LABELS.filter((_, i) => q.options[i] === FIGURE_OPTION);
}

/**
 * What the verify agent sees: number, shared passage, stem and options. Never the
 * answer, solution, note or classification, so its answer is blind.
 */
export function verifyPacket(qs: TranscriptQuestion[]): string {
  return qs
    .map((q) => {
      const ctx = q.context ? `context:\n${q.context}\n` : "";
      const figure = q.figure !== "none" ? `figure: ${q.figure}\n` : "";
      return `=== ${q.number}\n${figure}${ctx}stem:\n${q.stem}\n${q.options.map((o, i) => `${LABELS[i]}: ${o}`).join("\n")}\n`;
    })
    .join("\n");
}

export type VerifyRow = { n: number; answer: Label; fidelity: string | null; why: string | null };

/**
 * The verify agent's output, one line per question:
 *   <n> | <A-D> | ok [| <why, optional>]
 *   <n> | <A-D> | fidelity: <what on the page differs from the packet>
 * Lines starting with # and blank lines are ignored.
 */
export function parseVerify(text: string): VerifyRow[] {
  const out: VerifyRow[] = [];
  text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .forEach((raw, i) => {
      const line = raw.trim();
      if (!line || line.startsWith("#")) return;
      const [n, answer, status, ...rest] = line.split("|").map((s) => s.trim());
      const num = Number(n);
      if (!Number.isInteger(num) || !LABELS.includes(answer as Label) || !status) {
        throw new Error(`verify line ${i + 1}: expected "<n> | <A-D> | ok|fidelity: ..." got "${line}"`);
      }
      const fidelity = status.startsWith("fidelity:") ? status.slice("fidelity:".length).trim() : null;
      if (!fidelity && status !== "ok") throw new Error(`verify line ${i + 1}: status must be "ok" or "fidelity: ...", got "${status}"`);
      out.push({ n: num, answer: answer as Label, fidelity, why: rest.join(" | ") || null });
    });
  return out;
}

export type VerifyComparison = {
  agree: number[];
  disagree: { n: number; ours: Label; blind: Label; why: string | null }[];
  fidelity: { n: number; issue: string }[];
  missing: number[];
};

export function compareVerify(qs: TranscriptQuestion[], verify: VerifyRow[]): VerifyComparison {
  const byN = new Map(verify.map((v) => [v.n, v]));
  const r: VerifyComparison = { agree: [], disagree: [], fidelity: [], missing: [] };
  for (const q of [...qs].sort((a, b) => a.number - b.number)) {
    const v = byN.get(q.number);
    if (!v) {
      r.missing.push(q.number);
      continue;
    }
    if (v.fidelity) r.fidelity.push({ n: q.number, issue: v.fidelity });
    if (v.answer === q.answer) r.agree.push(q.number);
    else r.disagree.push({ n: q.number, ours: q.answer, blind: v.answer, why: v.why });
  }
  return r;
}

export type Retag = { text: string; changes: number; problems: string[] };

/**
 * The transcript side of a notes re-cut (scripts/spi/reshape.ts): rewrite the `subtopic:` line of
 * every block in `chapter`. A block takes `targets.get(n)`, else keeps a subtopic already in the
 * teaching order; anything else is a problem, never a silent skip. Only those lines change, so the
 * transcript stays byte-identical elsewhere (CRLF included).
 */
export function retagSubtopics(text: string, chapter: string, targets: Map<number, string>, order: string[]): Retag {
  const problems: string[] = [];
  let changes = 0;
  let n: number | null = null;
  let inChapter = false;
  const lines = text.split(/(?<=\n)/);
  for (let i = 0; i < lines.length; i++) {
    const body = lines[i].replace(/\r?\n$/, "");
    const head = /^=== (\d+)\s*$/.exec(body);
    if (head) { n = Number(head[1]); inChapter = false; continue; }
    if (n === null) continue;
    if (body.startsWith("chapter:")) { inChapter = body.slice(8).trim() === chapter; continue; }
    if (!inChapter || !body.startsWith("subtopic:")) continue;
    const from = body.slice(9).trim();
    const to = targets.get(n) ?? (order.includes(from) ? from : undefined);
    if (!to) { problems.push(`Q${n}: no target for subtopic "${from}"`); continue; }
    if (!order.includes(to)) { problems.push(`Q${n}: target "${to}" is not in the teaching order`); continue; }
    if (to !== from) { lines[i] = `subtopic: ${to}` + lines[i].slice(body.length); changes++; }
  }
  return { text: lines.join(""), changes, problems };
}
