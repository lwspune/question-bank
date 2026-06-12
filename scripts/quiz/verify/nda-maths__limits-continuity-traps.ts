/**
 * NDA Maths · Limits & Continuity · COMMON-TRAPS theme — "spot the mistake" MCQs.
 * Authored from the misconception callouts added to the notes concepts (the
 * first distractor in each is the warned mistake). Full stem + correct + 3
 * distractors per trap atom (the harvested stem is a placeholder).
 *   npm run quiz:verify nda-maths__limits-continuity-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "lim-standard-limits:trap:0",
    stem: "Evaluate \\(\\lim_{x\\to \\pi}\\dfrac{\\sin x}{x}\\).",
    correct: f("0"),
    distractors: [f("1"), f("\\pi"), "Does not exist"],
    theme: "trap",
  },
  {
    atomKey: "lim-standard-limits:trap:1",
    stem: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\sin 5x}{x}\\).",
    correct: f("5"),
    distractors: [f("1"), f("\\tfrac15"), f("0")],
    theme: "trap",
  },
  {
    atomKey: "lim-lhopital:trap:0",
    stem: "Which limit may NOT be evaluated by L'Hôpital's rule (differentiating top and bottom)?",
    correct: f("\\lim_{x\\to 0}\\dfrac{\\sin x}{x+1}"),
    distractors: [f("\\lim_{x\\to 0}\\dfrac{\\sin x}{x}"), f("\\lim_{x\\to \\infty}\\dfrac{x}{e^x}"), f("\\lim_{x\\to 1}\\dfrac{\\ln x}{x-1}")],
    theme: "trap",
  },
  {
    atomKey: "lim-one-sided:trap:0",
    stem: "A function has LHL \\(=1\\) and RHL \\(=-1\\) at \\(x=a\\). What is \\(\\lim_{x\\to a}f(x)\\)?",
    correct: "Does not exist",
    distractors: [f("0"), f("1"), f("-1")],
    theme: "trap",
  },
  {
    atomKey: "lim-greatest-integer-limits:trap:0",
    stem: "Evaluate \\(\\lim_{x\\to 3^-}\\lfloor x\\rfloor\\).",
    correct: f("2"),
    distractors: [f("3"), f("4"), f("2.5")],
    theme: "trap",
  },
  {
    atomKey: "lim-absolute-value-limits:trap:0",
    stem: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{x}{|x|}\\).",
    correct: "Does not exist",
    distractors: [f("1"), f("0"), f("-1")],
    theme: "trap",
  },
  {
    atomKey: "lim-absolute-value-limits:trap:1",
    stem: "Simplify \\(\\sqrt{A^2}\\).",
    correct: f("|A|"),
    distractors: [f("A"), f("-A"), f("A^2")],
    theme: "trap",
  },
  {
    atomKey: "lim-continuity-definition:trap:0",
    stem: "At \\(x=a\\), \\(\\lim_{x\\to a}f(x)=3\\) but \\(f(a)=5\\). Is \\(f\\) continuous at \\(a\\)?",
    correct: "No — the limit must equal \\(f(a)\\)",
    distractors: ["Yes — the limit exists", "Yes — \\(f(a)\\) is defined", "Yes — LHL \\(=\\) RHL"],
    theme: "trap",
  },
  {
    atomKey: "lim-discontinuity-types:trap:0",
    stem: "\\(\\lfloor x\\rfloor\\) at an integer has which discontinuity?",
    correct: "Jump (LHL \\(\\neq\\) RHL, both finite)",
    distractors: ["Removable (patchable)", "Oscillatory", "None — it is continuous"],
    theme: "trap",
  },
];
