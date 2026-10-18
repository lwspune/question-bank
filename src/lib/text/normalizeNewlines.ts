/**
 * Convert literal two-char `\n` (backslash + n) sequences typed by Excel
 * authors into real newline characters, while leaving math zones untouched.
 *
 * Why: teachers sometimes type `\n` in an Excel cell instead of pressing
 * Alt+Enter, so the DB ends up with literal backslash+n that never renders
 * as a line break. A naive global replacement would corrupt LaTeX commands
 * that begin with `\n` (e.g. `\neq`, `\nu`, `\nabla`, `\notin`), so this
 * helper masks math zones first, replaces only outside them, then restores.
 *
 * Idempotent: applying twice equals applying once (real newlines are not
 * re-matched as the literal sequence).
 */
export function normalizeNewlines(text: string): string {
  if (!text || !text.includes("\\n")) return text;

  const tokens: string[] = [];
  const stash = (m: string): string => {
    const idx = tokens.length;
    tokens.push(m);
    return `\u0000MATH${idx}\u0000`;
  };

  // Mask in delimiter-precedence order so block forms win over inline forms
  // when starts coincide ($$…$$ before $…$, \[…\] before \(…\)).
  let masked = text
    .replace(/\\\[[\s\S]+?\\\]/g, stash)
    .replace(/\$\$[\s\S]+?\$\$/g, stash)
    .replace(/\\\([\s\S]+?\\\)/g, stash)
    // An escaped `\$` is a literal dollar sign (parseLatex), never a maths delimiter.
    .replace(/\\\$/g, stash)
    .replace(/\$(?:[^$\n\\]|\\[^$\n])+?\$/g, stash);

  masked = masked.replace(/\\n/g, "\n");

  return masked.replace(/\u0000MATH(\d+)\u0000/g, (_, i) => tokens[Number(i)]);
}
