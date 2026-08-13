/**
 * Pure core for the MH HSC Class-12 board-PYQ ingestion.
 *
 * The compilation is born-digital .docx read through pandoc, so extraction is a
 * TEXT transform, not vision — but pandoc's output carries a specific and
 * MEASURED set of quirks (Phase 0 analysis, 2026-08-12), and every rule here
 * exists because of one of them. Nothing is defensive-in-general; each case in
 * tests/mh-hsc-12-pyq-normalise.test.ts is a real string from the source.
 */

export type Provenance = {
  /** questions.question_number — the board's own label, best-effort. */
  questionNumber: string;
  /** "March" | "February" | null. NULL when the tag records none. */
  month: string | null;
  year: number;
};

// e.g. "[Q. 1. (A) i., March 2015]" / "[Q. 27, 2025]" / "[Q. 30 (OR), March 2019\]"
// pandoc escapes the closing bracket, hence the optional backslash.
const TAG = /\[\s*(Q\.[^\]]*?)\s*,\s*(January|February|March|April)?\s*(\d{4})\s*\\?\]/;

/**
 * Read the `[Q. n, Month Year]` provenance tag.
 *
 * ⚠ The RESULT IS NOT A UNIQUE KEY and its questionNumber half is unreliable:
 * 20 tags in the source label DIFFERENT questions, and several duplicate pairs
 * disagree with each other on the number for the same question (Q.4(B)v vs
 * Q.5(A)v, March 2015). Year and month agree everywhere and are the parts to
 * trust. Never reconcile against a raw paper on questionNumber alone.
 *
 * month is null rather than guessed when absent: the 2024 and 2025 tags record
 * no month, and although the board sits in Feb/March, which one is not stated.
 */
export function parseProvenanceTag(text: string): Provenance | null {
  const m = TAG.exec(text);
  if (!m) return null;
  return {
    questionNumber: m[1].trim().replace(/\s+/g, " "),
    month: m[2] ?? null,
    year: Number(m[3]),
  };
}

/** Unicode → LaTeX. Only glyphs actually present in the source are listed. */
const UNICODE: [RegExp, string][] = [
  [/∠/g, "\\angle"], // ∠
  [/∞/g, "\\infty"], // ∞
  [/≠/g, "\\neq"], // ≠
  [/±/g, "\\pm"], // ±
];

/**
 * Convert the source's math conventions to the project's.
 *
 * - `$...$` → `\(...\)` (project convention; 948 zones in the source).
 * - `vmatrix` → `bmatrix`. All 20 occurrences denote a MATRIX, not a
 *   determinant — verified against the stems ("the inverse of the matrix",
 *   "adjoint of matrix A", "is a non singular matrix") and against the March
 *   2023 paper, which prints its counterpart with brackets. One stem even
 *   writes `|A|I` with genuine bars alongside a vmatrix for the matrix itself.
 * - U+1F86A (a wide arrow) is used as a SEPARATOR MEANING "for" in piecewise
 *   p.d.f. definitions — `f(x) = x^2/3 [arrow] -1 < x < 2`. Rendering it as
 *   \rightarrow would read as a limit and change the meaning, so it becomes the
 *   word "for".
 * - Loose unicode operators outside a math zone are wrapped in one, since a
 *   bare `\neq` in plain text renders as literal backslash-n-e-q.
 *
 * Idempotent: applying twice equals applying once.
 */
export function normaliseMath(text: string): string {
  let out = text;

  // $...$ -> \(...\). Skip if already converted (idempotence).
  out = out.replace(/\$([^$]+)\$/g, (_, inner) => `\\(${inner}\\)`);

  out = out.replace(/\\begin\{vmatrix\}/g, "\\begin{bmatrix}");
  out = out.replace(/\\end\{vmatrix\}/g, "\\end{bmatrix}");

  out = out.replace(/\u{1F86A}/gu, " for ");
  out = out.replace(/ /g, " ");

  for (const [re, latex] of UNICODE) {
    out = out.replace(re, (glyph, ...rest) => {
      const offset = rest[rest.length - 2] as number;
      return inMathZone(out, offset) ? latex : `\\(${latex}\\)`;
    });
  }

  // pandoc's line-continuation backslash sometimes lands INSIDE a math zone.
  // A zone ending in a lone backslash is a KaTeX parse error that takes the
  // whole stem down with it — the JEE lesson. Strip it, but only when it is
  // genuinely alone: `\\` is a legitimate LaTeX line break.
  out = out.replace(/([^\\])\\\\\)/g, "$1\\)");

  // A bare symbol command butted against a letter is CORRECT — `\(\angle\)B` is
  // the angle named B, and inserting a space to get "∠ B" would be a
  // regression. Pull the letter into the zone instead. Must run BEFORE the
  // general de-gluing below, which would otherwise separate them.
  out = out.replace(/\\\((\\(?:angle|triangle|Delta))\\\)([A-Z])/g, "\\($1 $2\\)");

  // Any other math zone butted straight against the next word renders glued
  // ("]³respectively"). Insert the missing space.
  out = out.replace(/\\\)(?=[A-Za-z])/g, "\\) ");
  out = out.replace(/(?<=[A-Za-z])\\\(/g, " \\(");

  return collapseSpaces(out);
}

/** True when `offset` sits inside a `\(...\)` zone. */
function inMathZone(text: string, offset: number): boolean {
  const before = text.slice(0, offset);
  const open = before.lastIndexOf("\\(");
  const close = before.lastIndexOf("\\)");
  return open > close;
}

const EDITORIAL = /\s*\((?:Note|note):[^)]*\)/g;

/**
 * Remove the compilation's own artifacts from a stem.
 *
 * - a trailing "Options:" label (the compilation's marker for an option list,
 *   not part of the printed question);
 * - pandoc's escaped fill-in blanks `\_\_\_\_`, which render as literal
 *   backslash-underscores outside a math zone;
 * - pandoc's escaped `\^` before a superscript;
 * - `<!-- -->` block separators pandoc emits between a stem and its sub-items;
 * - LWS's own bracketed editorial annotations, which are commentary added by
 *   the compiler and were never on the board's paper.
 */
export function stripArtifacts(text: string): string {
  let out = text;
  // "Options:" is NOT always trailing — when pandoc puts the option list in a
  // following block the label sits mid-string, so this cannot be anchored to $.
  out = out.replace(/\s*\bOptions:\s*/g, " ");
  // The comment separator can be split across lines by pandoc's hard wrap, so
  // match it tolerantly rather than as the literal "<!-- -->".
  out = out.replace(/<!--[\s\S]*?-->/g, " ");
  out = out.replace(/<!--[-\s>]*/g, " ");
  out = out.replace(EDITORIAL, "");
  // The compilation's own "#### **A. Negation, Dual, ...**" section banners. A
  // question block runs to the next NUMBERED item, so any banner between two
  // questions is absorbed by the one BEFORE it — three stems shipped with one
  // glued on in the first extraction run.
  //
  // ONE global rule, not a banner rule plus a trailing-marker rule. The two-rule
  // version left a gap: the compilation emits a BARE "####" line immediately
  // before a titled banner, so an end-anchored cleanup ran while the banner was
  // still there, and the banner rule then removed the banner and left the bare
  // marker stranded at the end. Nine stems shipped with a trailing "####".
  // The heading text is optional here precisely so both forms are covered.
  out = out.replace(/#{2,}[ \t]*(?:\*{0,2}[A-Z]\.[^\n]*)?/g, " ");
  out = out.replace(/\\_/g, "_");
  out = out.replace(/\\\^/g, "^");
  // pandoc escapes < and > outside a math zone. Left alone they ship as literal
  // backslashes — every p.d.f. support interval in the corpus reads "0\<x\<8".
  out = out.replace(/\\([<>])/g, "$1");
  // A trailing "\:" is the compilation's flattening of the printed fill-in
  // blank, confirmed against the 2019 page (the item ends "______."). Where a
  // blank is ALREADY present the artifact is pure noise; otherwise restore it,
  // since a question ending "the differential equation is" reads as truncated.
  out = out.replace(/\s*\\:\s*$/, (m, ...r) => "");
  if (/\\:\s*$/.test(text) && !/_{3,}\s*\.?\s*$/.test(out)) out = `${out} ______.`;
  // pandoc sometimes closes a math zone one token early, stranding the closing
  // bracket outside it (item 21: "...\vee \sim p$\]."). A literal "\]" then
  // ships in the stem. The reading is unambiguous — a \lbrack is open inside the
  // zone — so move the delimiter back in rather than deleting it.
  out = out.replace(/\\\)\\\]/g, " \\rbrack\\)");
  // pandoc's hard-wrap line-continuation backslash. Strip only at a line end or
  // string end, so a genuine LaTeX command is never touched.
  // Allow trailing spaces before the newline: earlier substitutions above
  // (Options:, comment separators) replace with a space, so by this point the
  // backslash is often followed by " \n" rather than "\n" directly.
  out = out.replace(/\\(?=[ \t]*(?:\n|$))/g, "");
  // The same continuation backslash can also land MID-string — before the
  // board's internal-choice "OR" marker — where it ships as a literal backslash
  // between two sentences. Matched only as a STANDALONE token (space, backslash,
  // space), which leaves `\ ` inside a math zone alone: that is a real LaTeX
  // spacing command and is how this corpus lays out its piecewise p.d.f.
  // definitions, e.g. `\(\ \ \ \ = 0\)`.
  out = out.replace(/(^|[^\\(])\s\\\s(?=[^\\)])/g, "$1 ");
  return collapseSpaces(out);
}

/**
 * Strip pandoc's blockquote markers.
 *
 * pandoc renders the compilation's indented option lists as BLOCKQUOTES, so
 * every wrapped line inside one begins "> ". Left alone these leak into the
 * content — and in a matrix they land INSIDE `\begin{bmatrix}`, where they
 * break it outright (four options of one Matrices row carried them).
 *
 * ⚠ MUST run on the RAW multi-line block, before any newline collapsing. The
 * marker is only identifiable by sitting at the START OF A LINE; once the lines
 * are joined it is indistinguishable from a genuine `x > 3`, and a rule loose
 * enough to catch it there eats real inequalities. That is not hypothetical —
 * the first attempt at this did exactly that.
 */
export function stripBlockquote(text: string): string {
  return text.replace(/^[ \t]*>[ \t]?/gm, "");
}

/**
 * Cut a leaked option run off the end of a stem.
 *
 * Applied ONLY when a question's real options are supplied from the adjudicated
 * defects ledger. Such a question is there precisely because its printed option
 * block failed to parse — e.g. one carries the labels (a)(b)(b)(c), a duplicated
 * "b" and no "d" — so the run stays glued to the stem and renders in full on the
 * card. Restricted to that case rather than run everywhere: a lone "(a)" is
 * ordinary prose, and a stem that DID parse has nothing left to strip.
 */
export function stripLeakedOptionRun(stem: string): string {
  const labels = [...stem.matchAll(/\\?\(\s*([a-d])\s*\\?\)/g)];
  if (labels.length < 3) return stem;
  const start = labels.find((m) => m[1] === "a");
  if (!start) return stem;
  const after = labels.filter((m) => m.index! > start.index!).map((m) => m[1]);
  if (new Set(after).size < 2) return stem;
  return collapseSpaces(stem.slice(0, start.index!).replace(/[\s\\>]+$/, ""));
}

/** pandoc renders an embedded picture as `![](media/imageN.png){width=... }`. */
const IMAGE = /!\[[^\]]*\]\(media\/([^)]+)\)(?:\{[^}]*\})?/;

/**
 * The compilation's own prose description of a diagram, e.g.
 * "(Circuit diagram depicting S1 and S2 in parallel, connected to S3 in series)".
 */
// The `(?:\\\)|[^)])*` body is load-bearing: these descriptions CONTAIN math
// zones, so a plain `[^)]*` stops at the `\)` closing "\(S_{1}\)" and leaves the
// tail of the description behind.
const DIAGRAM_DESCRIPTION =
  /\s*\((?:Circuit|circuit|Diagram|diagram|Graph|graph|Figure|figure)(?:\\\)|[^)])*\)\s*\.?/g;

/**
 * Separate an embedded image from a stem.
 *
 * ⚠ When an image IS present the compilation's prose description of it is
 * DROPPED, because every one that could be checked is WRONG. All four circuit
 * descriptions in the pilot chapter were compared against the extracted PNGs on
 * 2026-08-13 and none survived — one calls a series pair parallel, one is
 * self-contradictory, and two describe a different topology from the one drawn
 * (data/defects.json → circuitDescriptionsWrong). They are the compiler's
 * reading of the diagram, never the board's printed text, so shipping one
 * alongside the real figure would put a false claim next to the truth.
 *
 * When there is NO image the description is KEPT: it is then the only thing
 * making the question answerable, and a suspect description beats none.
 */
export function splitImage(block: string): { text: string; image?: string } {
  const m = IMAGE.exec(block);
  if (!m) return { text: block };
  const text = block.replace(IMAGE, " ").replace(DIAGRAM_DESCRIPTION, " ");
  return { text: collapseSpaces(text), image: m[1] };
}

/**
 * Join a question onto one line — EXCEPT across a GFM pipe table.
 *
 * Everything else in this corpus is a single paragraph, so collapsing is right.
 * But a pipe table IS its line structure: flattened onto one line the `|---|`
 * row stops being a separator, GFM refuses to build a table, and the whole thing
 * ships as raw pipes. Five probability-distribution tables were doing exactly
 * that — and the defect was invisible until the extractor was switched to emit
 * pipe tables at all, because before that they were a dashed grid.
 *
 * Lines are therefore collapsed in RUNS: a line starting with `|` is a table row
 * and keeps its own newline, fenced off from the prose either side of it.
 */
function collapseSpaces(s: string): string {
  const isRow = (l: string) => l.trim().startsWith("|");
  const out: string[] = [];
  let prose: string[] = [];
  const flushProse = () => {
    // Trim each line BEFORE joining, and drop the blanks. The rule this replaced
    // was `/\s*\n\s*/ -> " "`, which consumed the whitespace either side of the
    // break; joining raw lines instead leaves a double space wherever a line had
    // a trailing one, and that silently invalidated every adjudicated stem.
    const t = prose.map((l) => l.trim()).filter(Boolean).join(" ").replace(/[ \t]{2,}/g, " ").trim();
    if (t) out.push(t);
    prose = [];
  };
  for (const line of s.split("\n")) {
    if (isRow(line)) {
      flushProse();
      out.push(line.trim());
    } else {
      prose.push(line);
    }
  }
  flushProse();
  return out.join("\n").replace(/\n{2,}/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
}

// ───────────────────────────── record building ─────────────────────────────
//
// Deliberately NOT reusing scripts/stateboard/lib.ts's buildRecords. That one
// requires a `bucket` ("solved" | "exercise-mcq" | "exercise-subjective") which
// drives the /board reader's `section_*` book-structure axis — and a board PYQ
// has no place in the book's structure at all. Forcing a bucket onto these rows
// would put them inside a textbook section they were never printed in, which is
// exactly the axis confusion CLAUDE.md's "content-organisation axis" wall warns
// about. PYQ rows carry the CONCEPTUAL axis (subtopic) only.

import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import type { ParsedRowPayload, OptionLabel } from "../../src/lib/upload/validate";

const DIFFICULTIES = ["EASY", "MODERATE", "HARD"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

export type PyqQuestion = {
  /** Stable provenance ref, e.g. "logic-12-pyq#5". Unique within the chapter. */
  ref: string;
  /** The board's own label → questions.question_number, e.g. "Q. 1. (A) i.". */
  questionNumber: string;
  pyqYear: number;
  /** null when the tag records no month — 2024 and 2025 do not. Never guessed. */
  pyqMonth: string | null;
  format: "mcq" | "subjective";
  subtopic: string;
  difficulty: string;
  stem: string;
  options?: { label: string; text: string }[];
  /** The DERIVED key. Absent is a real state: a board paper ships no key, so an
   *  MCQ nobody has answered yet must stay unanswered rather than be guessed. */
  answer?: string;
  /** MCQ: the worked derivation. Subjective: the model answer itself. */
  solution?: string;
  /** Filename in the docx's word/media/, attached separately after commit. */
  image?: string;
  /** A KNOWN MCQ whose option list the compilation lost. It reads as
   *  free-response, which is the wrong format, so the build REFUSES it. */
  pendingMcq?: string;
  /** The chapter this question actually belongs to, when the compilation filed
   *  it elsewhere. Both known cases were CAUSED by a transcription defect. */
  chapterOverride?: string;
};

export type PyqChapter = { chapterName: string; subjectName: string; subtopics: string[] };
export type Flag = { ref: string; reason: string };

export function buildPyqRecords(
  chapter: PyqChapter,
  questions: PyqQuestion[],
  /** Chapters a row may be RELOCATED into, by the id its `chapterOverride` names.
   *  A relocated row commits under that chapter's name and is validated against
   *  ITS axis — the compilation files a question by the section it was typed
   *  into, so a stem that acquired an integral sign from its neighbour acquired
   *  that neighbour's chapter too. */
  relocationTargets: Record<string, PyqChapter> = {},
): { rows: ParsedRowPayload[]; flags: Flag[] } {
  const rows: ParsedRowPayload[] = [];
  const flags: Flag[] = [];
  const seen = new Set<string>();
  let sourceRow = 0;

  for (const q of questions) {
    sourceRow++;
    if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}"`);
    seen.add(q.ref);
    const home = q.chapterOverride ? relocationTargets[q.chapterOverride] : chapter;
    if (!home) {
      throw new Error(`${q.ref}: relocated to "${q.chapterOverride}", which was not supplied`);
    }
    if (!home.subtopics.includes(q.subtopic)) {
      throw new Error(`${q.ref}: subtopic "${q.subtopic}" not one of [${home.subtopics.join(", ")}]`);
    }
    const difficulty = q.difficulty.trim().toUpperCase() as Difficulty;
    if (!DIFFICULTIES.includes(difficulty)) {
      throw new Error(`${q.ref}: difficulty "${q.difficulty}" not EASY|MODERATE|HARD`);
    }
    // Shipping a known MCQ as free-response is a silent format downgrade: the
    // student is asked to write an answer to a question that was set with four
    // options, and nothing in the row records that anything is missing.
    if (q.pendingMcq) {
      throw new Error(
        `${q.ref}: known MCQ ${q.pendingMcq} whose options are still lost — repair it in ` +
          `data/defects.json (mcqOptionsLost) or drop the row. Refusing to ship it as subjective.`,
      );
    }

    const base = {
      sourceRow,
      questionNumber: q.questionNumber,
      subjectName: home.subjectName,
      chapterName: home.chapterName,
      subtopicName: q.subtopic,
      text: q.stem,
      difficulty,
      ...(q.solution ? { solution: q.solution } : {}),
    };

    if (q.format === "subjective") {
      rows.push({
        ...base,
        questionFormat: "subjective",
        options: [],
        // Namespaced so a subjective row can never collide with an MCQ carrying
        // the same stem, and computed WITHOUT the solution so backfilling an
        // answer does not move the row's identity.
        contentHash: subjectiveContentHash(q.stem, null),
      });
      continue;
    }

    const opts = q.options ?? [];
    if (opts.length !== 4) throw new Error(`${q.ref}: mcq needs exactly 4 options, has ${opts.length}`);
    if (q.answer && !opts.some((o) => o.label === q.answer)) {
      throw new Error(`${q.ref}: answer "${q.answer}" names no option`);
    }
    if (!q.answer) flags.push({ ref: q.ref, reason: "no derived key — row commits with no correct option" });

    rows.push({
      ...base,
      questionFormat: "mcq",
      options: opts.map((o) => ({
        label: o.label as OptionLabel,
        text: o.text,
        isCorrect: o.label === q.answer,
      })),
      // The project's MCQ hash INCLUDES the answer, by design and bank-wide. So
      // correcting a key later orphans the row on re-commit (delete by
      // source_file first) — but the property is worth the cost here: two boards
      // that set the same question with DIFFERENT keys stay two rows, and the
      // conflict is visible instead of being silently deduped into one.
      // An unanswered MCQ hashes with "" and re-hashes once a key is derived.
      contentHash: contentHash(q.stem, opts.map((o) => o.text), q.answer ?? ""),
    });
  }
  return { rows, flags };
}

/**
 * Split a chapter's questions by SITTING.
 *
 * `pyq_year` / `pyq_month` are set per commitStaged CALL, not per row, and this
 * corpus spans ten sittings — so the commit runs once per group. One call for
 * the whole chapter would stamp every question with a single year.
 */
export function groupBySitting(
  questions: PyqQuestion[],
): { year: number; month: string | null; questions: PyqQuestion[] }[] {
  const groups = new Map<string, { year: number; month: string | null; questions: PyqQuestion[] }>();
  for (const q of questions) {
    // A null month is its OWN group, not folded into a named one: the 2024 and
    // 2025 tags record no month and inventing Feb-or-March would be a fabrication.
    const key = `${q.pyqYear}|${q.pyqMonth ?? ""}`;
    let g = groups.get(key);
    if (!g) groups.set(key, (g = { year: q.pyqYear, month: q.pyqMonth, questions: [] }));
    g.questions.push(q);
  }
  return [...groups.values()].sort(
    (a, b) => a.year - b.year || (a.month ?? "").localeCompare(b.month ?? ""),
  );
}
