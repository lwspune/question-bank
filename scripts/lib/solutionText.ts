/**
 * Every reason a worked solution cannot be written to `questions.solution` as
 * it stands. Pure; shared by the solutions backfill (scripts/solutions/apply.ts)
 * and the IMAT solutions script, which held the first copy of these checks.
 *
 * Most drafts arrive as JSON written by an agent, and JSON eats a LaTeX
 * backslash it recognises as an escape: "\times" becomes TAB + "imes", "\frac"
 * FF + "rac", "\beta" BS + "eta", "\rho" CR + "ho". Those leave a control
 * character, which the first check sees. "\neq", "\nu", "\nabla", "\not" leave
 * a real LINE BREAK, which is legal in a solution, so they need their own
 * check: a line break inside inline maths, or a line inside display maths that
 * starts with what an eaten \n command leaves behind. Spec:
 * tests/solution-text.test.ts.
 */
import { literalNewlineFields } from "../../src/lib/upload/textGuard";

/**
 * What "\n" + a LaTeX command name leaves once the "\n" is eaten: the rest of
 * the name straight after the line break. (\ne and \ni are left out: a display
 * line may well start with e^x or i.)
 */
const EATEN_N_COMMAND = /\n(?:eq|u|abla|ot|otin|eg|ewline|exists|mid|leq|geq|parallel|subseteq)(?![a-zA-Z])/;

/** Maths symbols the style rule writes in LaTeX (\pi, \times, \leq, ^\circ, ^2). */
const UNICODE_MATHS = /[α-ωΑ-Ω×÷≤≥≠√∞±→⇒∴∵°²³∠∑∫−≈∈⊂∪∩]/;

function count(text: string, re: RegExp): number {
  return (text.match(re) ?? []).length;
}

/** Everything the backfill refuses: the text checks and the style checks. */
export function solutionProblems(text: string): string[] {
  const out = solutionTextProblems(text);
  if (!text.trim()) return out;
  if (/\bstored\b/i.test(text)) out.push('the word "stored"');
  if (UNICODE_MATHS.test(text)) out.push("Unicode maths symbol (write it in LaTeX)");
  return out;
}

/**
 * The checks that say the text was damaged or will not render: an eaten
 * escape, a dash, an unbalanced delimiter, a literal \n. The IMAT script uses
 * these alone, because its file was applied before the style checks existed
 * (7 of its 240 fail them; SUGGESTIONS.md backfill ledger).
 */
export function solutionTextProblems(text: string): string[] {
  const out: string[] = [];
  if (!text.trim()) return ["empty"];
  if (/[\t\f\r\x08\x0b]/.test(text)) out.push("control character (an escape eaten on the way)");
  if (/[–—]/.test(text)) out.push("en or em dash");
  if (count(text, /\\\(/g) !== count(text, /\\\)/g)) out.push("unbalanced \\( \\)");
  if (count(text, /\\\[/g) !== count(text, /\\\]/g)) out.push("unbalanced \\[ \\]");
  if (literalNewlineFields({ solution: text }).length) out.push("literal \\n");
  for (const m of text.matchAll(/\\\(([\s\S]*?)\\\)/g)) {
    if (m[1].includes("\n")) {
      out.push("line break inside \\( \\) (an eaten \\neq, \\nu, \\nabla?)");
      break;
    }
  }
  for (const m of text.matchAll(/\\\[([\s\S]*?)\\\]/g)) {
    if (EATEN_N_COMMAND.test(m[1])) {
      out.push("a \\n command eaten inside \\[ \\] (\\neq, \\nabla, \\nu?)");
      break;
    }
  }
  return out;
}
