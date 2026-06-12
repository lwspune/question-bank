/**
 * NDA Maths · Conics · practiceSet MCQs (computation theme).
 * Hand-authored distractors. Every `correct` re-derived from the notes _data.
 *
 * NOTE: the chapter's atoms JSON exposes only 3 computation (practiceSet) atoms —
 * all under conics-what-is-a-conic, classifying a conic from its eccentricity.
 * (The chapter is formula-rich, not computation-rich; the bulk of needs_review
 * atoms are FORMULA atoms, handled in nda-maths__conics-formulas.ts.) All three
 * keys verified correct against the notes; no notes fix needed here.
 *   npm run quiz:verify nda-maths__conics-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── conics-what-is-a-conic ──
  // Eccentricity of a circle = 0
  e("conics-what-is-a-conic:practiceSet:0", [f("e = 1"), f("e = \\tfrac12"), f("e > 1")]),
  // e = √2 > 1 ⇒ hyperbola
  e("conics-what-is-a-conic:practiceSet:1", ["Parabola (\\(e=1\\)).", "Ellipse (\\(e<1\\)).", "Circle (\\(e=0\\))."]),
  // e = 1 ⇒ parabola
  e("conics-what-is-a-conic:practiceSet:2", ["Hyperbola (\\(e>1\\)).", "Ellipse (\\(e<1\\)).", "Circle (\\(e=0\\))."]),
];
