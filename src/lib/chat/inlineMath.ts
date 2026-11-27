/**
 * V's inline fractions at text size (2026-11-27, the owner's screenshot): an
 * inline \dfrac forces a full-size fraction, so in V's narrow bubble the line
 * grew tall and broke after "f0 =", leaving the fraction on a line of its own
 * (249 of 1,882 V replies in 30 days). Inside \( \) a \dfrac becomes \frac;
 * display maths \[ \] keeps it, and an unclosed zone is left as written.
 *
 * Pure. Spec: tests/v-inline-fractions.test.ts.
 */
const INLINE_ZONE = /\\\(([\s\S]*?)\\\)/g;
const DFRAC = /\\dfrac(?![a-zA-Z])/g;

export function inlineFractions(text: string): string {
  if (!text.includes("\\dfrac")) return text;
  return text.replace(INLINE_ZONE, (_zone: string, body: string) => `\\(${body.replace(DFRAC, "\\frac")}\\)`);
}
