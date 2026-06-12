/**
 * NDA Maths · Limits & Continuity · FORMULA-recall MCQs.
 *
 * Triage of the 9 coverage-flagged empty-formula concepts: Limits is
 * technique-heavy, so MOST flags were SKIPPED as methods/criteria (0/0-factoring
 * method, L'Hôpital-as-rule, substitute-first, sign-of-|x|, GIF behaviour,
 * continuity-parameter matching, discontinuity classification, diff⇒cont
 * implication). Only TWO concepts carry a genuine recallable formula and were
 * enriched (formula.latex appended): the x^n−a^n standard limit and the
 * continuity test. Plus the pre-existing 1^∞ shortcut formula atom gets a
 * concrete stem here (the auto/needs_review-formula guard).
 *
 * Concrete stems + 3 tight full-equation permutation distractors per piece
 * (no bare-RHS tell).
 *   npm run quiz:verify nda-maths__limits-continuity-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "lim-algebraic-zero-over-zero:formula:0",
    stem: "Which is the standard limit \\(\\displaystyle\\lim_{x\\to a}\\dfrac{x^n-a^n}{x-a}\\)?",
    distractors: [
      f("\\lim_{x\\to a}\\dfrac{x^n-a^n}{x-a}=n\\,a^{n}"),
      f("\\lim_{x\\to a}\\dfrac{x^n-a^n}{x-a}=(n-1)\\,a^{n-1}"),
      f("\\lim_{x\\to a}\\dfrac{x^n-a^n}{x-a}=n\\,a^{1-n}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "lim-continuity-definition:formula:0",
    stem: "Which condition makes \\(f\\) continuous at \\(x=a\\)?",
    distractors: [
      f("\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)\\neq f(a)"),
      f("\\lim_{x\\to a^-}f(x)=f(a)\\neq\\lim_{x\\to a^+}f(x)"),
      f("\\lim_{x\\to a}f(x)=f'(a)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "lim-one-power-infinity:formula:0",
    stem: "For the \\(1^\\infty\\) form with \\(f\\to 1,\\ g\\to\\infty\\), which is \\(\\displaystyle\\lim [f(x)]^{g(x)}\\)?",
    distractors: [
      f("\\lim [f(x)]^{g(x)} = e^{\\,\\lim\\, [f(x)-1]/g(x)}"),
      f("\\lim [f(x)]^{g(x)} = e^{\\,\\lim\\, g(x)/[f(x)-1]}"),
      f("\\lim [f(x)]^{g(x)} = \\lim\\, g(x)\\,[f(x)-1]"),
    ],
    theme: "formula",
  },
];
