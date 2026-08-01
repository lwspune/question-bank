/**
 * Repair the pandoc extraction artifacts that reach a reader as literal markup.
 *
 * Earned by /dashboard/reports on 2026-08-01: six of eight open reports were
 * one of these classes, and a probe showed each report was the tip of a much
 * larger set (~1118 stray hard-line-break backslashes, 25 CJK full stops).
 * They appear ONLY in the pandoc-fed exams (JEE / MHT-CET / NDA / CBSE /
 * State Board); every vision-transcribed exam is clean, which is what pins the
 * cause on the DOCX->markdown step rather than on transcription.
 *
 * THE WHOLE DESIGN CONSTRAINT IS RESTRAINT. A backslash is load-bearing inside
 * a math zone (`\ ` is a control space, `\\` a matrix row break) and inside
 * markdown (`\|` keeps a pipe out of a table cell, `\*` keeps a literal star
 * out of a bold span). So:
 *
 *   - math zones are masked with the RENDERER'S OWN `maskMathZones`, so this
 *     transform cannot disagree with what the reader actually sees;
 *   - only punctuation ACTUALLY OBSERVED escaped in the bank is unescaped, and
 *     `| * ( ) [ ] $` are excluded as markdown- or delimiter-significant;
 *   - `\`+letter is never touched. It is a mixed bag — mostly `$...$` math that
 *     a naive probe misreads, plus a few genuine but heterogeneous defects
 *     (`\ldots` in prose, a raw `\begin{array}`) that need a human, not a regex.
 */
import { maskMathZones } from "../../src/components/math/parseLatex";

/** U+3002 IDEOGRAPHIC FULL STOP — an OCR substitution for a plain period. */
const CJK_FULL_STOP = "。";

/**
 * Punctuation pandoc escapes that is safe to unescape in PLAIN text.
 * Deliberately excludes:
 *   `(` `)` `[` `]` `$`  — math delimiters; a stray one means an UNBALANCED
 *                          zone, and guessing there corrupts the math.
 *   `|`                  — unescaping forges a table cell boundary.
 *   `*` and a backtick   — unescaping forges a bold/code span.
 *   `\`                  — `\\` is a deliberate line break in several dialects.
 */
const UNESCAPABLE = `."'-_{}<>,:;!?+=@#%&~/`;

const ESCAPED_PUNCT = new RegExp(`\\\\([${UNESCAPABLE.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&")}])`, "g");

/**
 * A RUN of backslashes sitting before horizontal whitespace, a newline, or the
 * end of the string.
 *
 * The run length is load-bearing and matching a single `\` here is a genuine
 * data-loss bug (it cost one row's array separators during the 2026-08-01
 * sweep before this rule existed):
 *
 *   `\`   (odd)  -> pandoc's hard line break. Repair.
 *   `\\`  (even) -> a LaTeX ROW SEPARATOR, e.g. inside a `\begin{array}` that
 *                   sits outside a math zone. Untouchable.
 *   `\\\` (odd)  -> a row separator PLUS a pandoc break. Drop exactly one.
 *
 * So: drop one backslash only when the run length is odd, and never more.
 * This is also what makes the transform idempotent — after one pass every
 * surviving run is even, so a second pass is a no-op.
 */
const HARD_BREAK = /(\\+)([ \t]+|(?=\n)|$)/g;

/** Apply the plain-text-only repairs to one unmasked region. */
function repairPlain(s: string): string {
  return s
    .split(CJK_FULL_STOP).join(".")
    .replace(HARD_BREAK, (whole: string, run: string, tail: string) => {
      if (run.length % 2 === 0) return whole; // paired LaTeX break — leave alone
      return run.slice(1) + (tail && tail.length ? "\n" : "");
    })
    .replace(ESCAPED_PUNCT, "$1");
}

/**
 * Repair pandoc artifacts outside math zones. Pure, idempotent, and a strict
 * no-op on clean text (returns an identical string).
 */
export function stripPandocArtifacts(input: string): string {
  if (!input) return input;
  // Fast path — nothing repairable present.
  if (!input.includes("\\") && !input.includes(CJK_FULL_STOP)) return input;

  const { masked, unmask } = maskMathZones(input);
  return unmask(repairPlain(masked));
}

/**
 * How many REPAIRABLE artifacts a field carries (0 = clean).
 *
 * Must agree with `stripPandocArtifacts` exactly, or the audit reports a row as
 * dirty that the repair then declines to touch — which is precisely what
 * happened when this counted every backslash run instead of only the ODD ones
 * (an even run is a LaTeX row separator and is deliberately left alone).
 */
export function pandocArtifactCount(input: string): number {
  if (!input) return 0;
  const { masked } = maskMathZones(input);
  const cjk = masked.split(CJK_FULL_STOP).length - 1;
  const breaks = (masked.match(HARD_BREAK) ?? []).filter((m) => {
    const run = /^\\+/.exec(m)?.[0].length ?? 0;
    return run % 2 === 1;
  }).length;
  const punct = masked.match(ESCAPED_PUNCT)?.length ?? 0;
  return cjk + breaks + punct;
}
