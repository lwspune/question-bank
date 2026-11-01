/**
 * A LaTeX macro sitting OUTSIDE a \(...\) / \[...\] zone, in a field that is
 * handed to KatexRenderer raw (a formula's symbol/meaning legend). Such a macro
 * prints as literal markup. Returns the first one found, or null.
 *
 * Letter macros (\det) AND the spacing macros (\, \; \: \! and backslash-space):
 * the letter-only rule missed three legends that printed "g(x)\,f'(x)/f(x)" on
 * the live notes (2026-11-02). A LaTeX line break (\\) is not a leak.
 *
 * Pure. Spec: tests/notes-unwrapped-macro.test.ts.
 */
const MATH_ZONE = /\\\(.*?\\\)|\\\[.*?\\\]/gs;

export function findUnwrappedMacro(s: string | undefined): string | null {
  if (!s) return null;
  const residual = s.replace(/\\\\/g, " ").replace(MATH_ZONE, " ");
  const m = residual.match(/\\(?:[a-zA-Z]+|[,;:! ])/);
  return m ? m[0] : null;
}
