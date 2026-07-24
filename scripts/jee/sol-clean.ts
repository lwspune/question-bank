/**
 * Shared cleanup for agent-authored JEE solutions. No side effects on import
 * (unlike the assemble-*.ts entrypoints, which run main()).
 */

/**
 * Some agents double-escape LaTeX (`\\(`, `\\frac`). The literal `\\(` is never
 * valid — the inline delimiter is a single-backslash `\(` — so its presence means
 * the whole string is double-escaped; halve every run (also fixes matrix `\\\\`→`\\`).
 */
export function normalizeEscaping(sol: string): string {
  if (sol.includes("\\\\(")) return sol.replace(/\\\\/g, "\\");
  return sol;
}

/**
 * Agents sometimes append a stray closing `\)` at the very end of a solution
 * (e.g. "…so (B) is NOT true.\)"). When the string has exactly one more `\)`
 * than `\(` and ends with `\)`, strip that trailing delimiter. Conservative:
 * only touches an end-of-string +1 imbalance, never interior math.
 */
export function stripStrayCloseDelim(sol: string): string {
  const opens = (sol.match(/\\\(/g) || []).length;
  const closes = (sol.match(/\\\)/g) || []).length;
  if (closes === opens + 1 && sol.trimEnd().endsWith("\\)")) {
    const t = sol.trimEnd();
    return t.slice(0, t.length - 2).trimEnd();
  }
  return sol;
}

export function cleanSolution(sol: string): string {
  return stripStrayCloseDelim(normalizeEscaping(sol));
}
