/**
 * Pure repairs for the pandoc-ingest artifacts left in `questions.solution`.
 *
 * WHY THIS EXISTS. Solutions extracted from Word mock-test papers via pandoc
 * carry LaTeX fragments that were never wrapped in `\(...\)`. Our renderers
 * (KatexRenderer on the web, `mathRuns` in the docx exporter) only typeset
 * INSIDE a math zone, so anything stranded outside prints as literal
 * characters — `\Rightarrow`, `\\`, `\qquad` — on the page and in a teacher's
 * downloaded answer key. None of the existing gates sees this class:
 * `audit:omml` only inspects what is already inside a zone, `audit:text`
 * covers four unrelated shapes, and `board:lint` checks structure.
 *
 * SAFETY. `solution` is excluded from BOTH dedup hashes (`contentHash` covers
 * text+options+answer; `subjectiveContentHash` deliberately omits the model
 * answer so backfill doesn't re-mint ids). So repairing a solution is a plain
 * in-place UPDATE: nothing re-hashes, and no `paper_questions` / mock snapshot
 * reference can be orphaned. Do NOT extend these transforms to `text` or
 * `options` without re-reading that constraint — there, an edit means
 * delete-and-re-commit.
 *
 * Every transform is idempotent and math-zone aware, and each one is pinned by
 * a spec case built from a VERBATIM live solution.
 */
import { maskMathZones } from "../../src/components/math/parseLatex";

export type ArtifactKind =
  | "crlf"
  | "answer-prefix"
  | "stray-linebreak"
  | "alignment-matrix"
  | "bare-command"
  | "raw-latex-block"
  | "devanagari";

/** Windows line endings from the source `.docx`; the rest of the bank uses LF. */
export function normalizeCrLf(text: string): string {
  return text.replace(/\r\n?/g, "\n");
}

/**
 * Drop the source paper's answer-key prefix — `Ans. (b)** : `, `Ans-(a)**`,
 * `Ans. (d) :** `, `Ans- (c)**\\` — which leaks the answer letter into the
 * student-facing solution and leaves an unbalanced `**` behind.
 *
 * The trailing class deliberately excludes a lone backslash: the next token is
 * very often `\(`, and eating its backslash would destroy the opening math
 * delimiter and silently turn the whole solution into prose. A DOUBLE
 * backslash (a line-continuation belonging to the prefix) is consumed, but
 * only when a newline follows it.
 */
export function stripAnswerPrefix(text: string): string {
  // Three keywords in the wild — `Ans`, `Sol.`, `Solution` (longest first so
  // `Sol` cannot shadow `Solution`). The parenthesised letter is REQUIRED:
  // without it, ordinary prose like "Solution: substitute x = 1" or "Solving a
  // cubic…" would be eaten. Every observed form parenthesises the letter.
  const stripped = text.replace(
    /^[\s]*(?:Solution|Sol|Ans)[\s.\-]*\([a-dA-D]\)[\s:*]*(?:\\\\(?=\s|$))?[\s]*/,
    ""
  );
  if (stripped !== text) return stripped;

  // Some rows lost the letter upstream and kept the prefix's trailing `**`,
  // which then prints literally. Strip a LEADING `**` only when the count is
  // ODD — an even count is genuine `**bold**` and must survive untouched.
  const marks = (text.match(/\*\*/g) ?? []).length;
  if (marks % 2 === 1 && /^\s*\*\*/.test(text))
    return text.replace(/^\s*\*\*\s*/, "");
  return text;
}

/**
 * Remove a `\\` sitting at end-of-line OUTSIDE math. pandoc emits it as a
 * Markdown hard break; our renderer has no such syntax, so it prints as two
 * literal backslashes. Inside math `\\` is a ROW SEPARATOR and is preserved by
 * masking — collapsing those would flatten a matrix into one unreadable line.
 */
export function stripStrayLineBreaks(text: string): string {
  const { masked, unmask } = maskMathZones(text);
  return unmask(masked.replace(/\\{1,2}(?=[ \t]*\n)/g, ""));
}

/**
 * `\begin{matrix}` used as a poor-man's multi-line alignment (pandoc's output
 * for a Word equation array) centres every column, so a two-line derivation
 * stacks into what reads as a single nested fraction. `aligned` is the
 * environment that shape wants.
 *
 * A matrix wrapped in `\left|`/`\left(`/`\left[` is a GENUINE determinant or
 * matrix in the mathematics and is left untouched — as are the self-delimiting
 * `bmatrix`/`vmatrix`/`pmatrix` forms, which this never matches.
 */
export function alignmentMatrixToAligned(text: string): string {
  const BEGIN = "\\begin{matrix}";
  const END = "\\end{matrix}";

  // pandoc NESTS these: a row of an alignment block can itself be one. Pairing
  // has to be depth-aware — taking the first `\end{matrix}` after a begin binds
  // the OUTER open to the INNER close, which leaves a dangling `\end` and
  // breaks the whole math zone. Found on a live row, not hypothesised.
  const tokens = [...text.matchAll(/\\begin\{matrix\}|\\end\{matrix\}/g)];
  const stack: number[] = [];
  const edits: { at: number; len: number; text: string }[] = [];

  for (const t of tokens) {
    const at = t.index!;
    if (t[0] === BEGIN) {
      stack.push(at);
      continue;
    }
    const openAt = stack.pop();
    if (openAt === undefined) continue; // unbalanced source — leave it alone

    // A `\left|`-wrapped matrix is a GENUINE determinant; leave the pair be.
    const before = text.slice(Math.max(0, openAt - 12), openAt);
    if (/\\left\s*[|([{.]?\s*$/.test(before)) continue;

    // No `&` means this is not an alignment hack but a genuine stack, which
    // `matrix` already renders correctly (centred) — e.g. the column
    // subtraction laid out inside a `\frac` on Mock-1 Q120. Converting would
    // change a render that is not broken.
    if (!text.slice(openAt + BEGIN.length, at).includes("&")) continue;

    edits.push({ at: openAt, len: BEGIN.length, text: "\\begin{aligned}" });
    edits.push({ at, len: END.length, text: "\\end{aligned}" });
  }
  if (edits.length === 0) return text;

  // Apply back-to-front so earlier offsets stay valid.
  edits.sort((a, b) => b.at - a.at);
  let out = text;
  for (const e of edits) out = out.slice(0, e.at) + e.text + out.slice(e.at + e.len);
  return out;
}

/**
 * A LaTeX command stranded outside a math zone, wrapped into one. Adjacent
 * commands are wrapped as a single zone so `\quad \ldots` stays one unit.
 *
 * A Windows path (`C:\Users\vilas\…`) matches the same shape and must never be
 * wrapped, so a candidate is skipped when it is preceded by a path separator
 * or a drive letter — it is a leak to report, not maths to typeset.
 */
export function wrapBareCommands(text: string): string {
  const { masked, unmask } = maskMathZones(text);

  // Mask WHOLE filesystem paths first. Guarding token-by-token does not work:
  // in `C:\Users\vilas\out` only the FIRST segment is preceded by the drive
  // letter, so `\vilas` and `\out` would still be wrapped into math. A path is
  // one unit and has to be recognised as one.
  const paths: string[] = [];
  const pathMasked = masked.replace(/[A-Za-z]:\\[^\s)]*/g, (p) => {
    paths.push(p);
    return `\u0000PATH${paths.length - 1}\u0000`;
  });

  // A raw-LaTeX BLOCK needs one wrap around the whole thing — an editorial
  // call about where the math begins and ends. Wrapping token-by-token here
  // produces nonsense, so leave the row entirely to `solutionArtifacts`.
  if (isRawLatexBlock(text)) return text;

  // Only ARGUMENT-LESS operators (`\Rightarrow`, `\therefore`, `\quad`) may be
  // wrapped. A command taking a brace argument must not be: the wrap closes
  // before the `{`, so `\begin{aligned}` becomes `\(\begin\){aligned}` — worse
  // than the defect. `\left`/`\right` take a delimiter rather than a brace and
  // are excluded by name.
  // The "followed by {" test is done on the SOURCE, not as a lookahead in the
  // pattern: a lookahead lets the engine backtrack to a shorter command so the
  // test passes — `\text{` matched as `\tex` + `t{`, producing `\(\tex\)t{…}`.
  const TAKES_ARG = /^\\(?:left|right|begin|end)$/;
  const repaired = pathMasked.replace(
    /\\[a-zA-Z]+(?:\s+\\[a-zA-Z]+)*/g,
    (run: string, offset: number) => {
      if (pathMasked[offset + run.length] === "{") return run;
      const parts = run.split(/\s+/);
      if (parts.some((p) => TAKES_ARG.test(p))) return run;
      return `\\(${run}\\)`;
    }
  );

  return unmask(
    repaired.replace(/\u0000PATH(\d+)\u0000/g, (_, i) => paths[Number(i)])
  );
}

/**
 * True when the solution carries a LaTeX ENVIRONMENT outside any math zone —
 * i.e. the whole block was never delimited, rather than one operator being
 * stranded. Repairing that means deciding where the math starts and stops,
 * which is an editorial judgement, so these rows are reported for a human.
 */
export function isRawLatexBlock(text: string): boolean {
  const { masked } = maskMathZones(text);
  // Any undelimited command that takes an ARGUMENT — `\begin{…}`, `\frac{…}`,
  // `\text{…}`, `\left|`. None can be auto-wrapped (the wrap would close before
  // the argument), so wrapping only the argument-less operators around them
  // leaves the row half repaired, which reads as finished when it is not.
  return /\\[a-zA-Z]+\s*\{/.test(masked) || /\\(?:left|right)\b/.test(masked);
}

/** Report every artifact class present, without repairing anything. */
export function solutionArtifacts(text: string): ArtifactKind[] {
  const found: ArtifactKind[] = [];
  if (/\r/.test(text)) found.push("crlf");
  if (stripAnswerPrefix(text) !== text) found.push("answer-prefix");
  if (stripStrayLineBreaks(text) !== text) found.push("stray-linebreak");
  if (alignmentMatrixToAligned(text) !== text) found.push("alignment-matrix");
  if (wrapBareCommands(text) !== text) found.push("bare-command");
  if (isRawLatexBlock(text)) found.push("raw-latex-block");
  // Detected, never repaired: translating is an editorial act and deleting the
  // line would delete the reasoning. Surfaced for a human to rewrite.
  if (/[\u0900-\u097F]/.test(text)) found.push("devanagari");
  return found;
}

/**
 * All mechanical repairs, in dependency order: normalise line endings first so
 * the prefix and line-break patterns see one newline form, then strip, then
 * restructure, then wrap whatever LaTeX is still stranded.
 */
export function repairSolution(text: string): string {
  // A wholesale raw-LaTeX block is left EXACTLY as found, so whoever rewrites
  // it sees the original. Restructuring it first would be churn on a row that
  // still renders as literal text either way.
  if (isRawLatexBlock(text)) return text;

  let s = normalizeCrLf(text);
  s = stripAnswerPrefix(s);
  s = stripStrayLineBreaks(s);
  s = alignmentMatrixToAligned(s);
  s = wrapBareCommands(s);
  return s;
}
