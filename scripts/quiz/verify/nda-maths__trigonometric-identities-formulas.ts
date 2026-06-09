/**
 * NDA Maths · Trigonometric Identities · per-FORMULA recall MCQs (bundle-split pass).
 * Each genuine formula gets a specific stem + 3 TEMPTING PERMUTATION distractors
 * (wrong versions of the same formula — same shape, no tell). Run:
 *   npm run quiz:verify nda-maths__trigonometric-identities-formulas
 *
 * Skipped (judgment — not a formula): trig-am-gm-minimum:formula:1 ("equality at u=v", a condition).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    atomKey: "trig-am-gm-minimum:formula:0",
    stem: "For \\(u,v>0\\), which is the AM–GM inequality (used for reciprocal-type minima)?",
    distractors: [f("u+v\\ge \\sqrt{uv}"), f("u+v\\ge 2uv"), f("u+v\\le 2\\sqrt{uv}")],
    theme: "formula",
  },
  {
    atomKey: "trig-compound-sin-cos:formula:0",
    stem: "Which is the correct expansion of \\(\\sin(A\\pm B)\\)?",
    distractors: [f("\\sin A\\cos B\\mp\\cos A\\sin B"), f("\\cos A\\cos B\\pm\\sin A\\sin B"), f("\\sin A\\sin B\\pm\\cos A\\cos B")],
    theme: "formula",
  },
  {
    atomKey: "trig-compound-sin-cos:formula:1",
    stem: "Which is the correct expansion of \\(\\cos(A\\pm B)\\)?",
    distractors: [f("\\cos A\\cos B\\pm\\sin A\\sin B"), f("\\sin A\\cos B\\mp\\cos A\\sin B"), f("\\cos A\\sin B\\mp\\sin A\\cos B")],
    theme: "formula",
  },
  {
    atomKey: "trig-fundamental-identities:formula:0",
    stem: "Which Pythagorean identity is correct?",
    distractors: [f("\\sin^2\\theta-\\cos^2\\theta=1"), f("\\sin^2\\theta+\\cos^2\\theta=0"), f("1+\\cos^2\\theta=\\sin^2\\theta")],
    theme: "formula",
  },
  {
    atomKey: "trig-fundamental-identities:formula:1",
    stem: "Which identity relating \\(\\sec\\) and \\(\\tan\\) is correct?",
    distractors: [f("\\sec^2\\theta+\\tan^2\\theta=1"), f("\\tan^2\\theta-\\sec^2\\theta=1"), f("\\sec^2\\theta-\\tan^2\\theta=0")],
    theme: "formula",
  },
  {
    atomKey: "trig-fundamental-identities:formula:2",
    stem: "Which identity relating \\(\\csc\\) and \\(\\cot\\) is correct?",
    distractors: [f("\\csc^2\\theta+\\cot^2\\theta=1"), f("\\cot^2\\theta-\\csc^2\\theta=1"), f("\\csc^2\\theta-\\cot^2\\theta=0")],
    theme: "formula",
  },
  {
    atomKey: "trig-product-to-sum:formula:0",
    stem: "Which product-to-sum identity for \\(2\\sin A\\cos B\\) is correct?",
    distractors: [f("\\sin(A+B)-\\sin(A-B)"), f("\\cos(A-B)-\\cos(A+B)"), f("\\cos(A+B)+\\cos(A-B)")],
    theme: "formula",
  },
  {
    atomKey: "trig-product-to-sum:formula:1",
    stem: "Which product-to-sum identity for \\(2\\cos A\\cos B\\) is correct?",
    distractors: [f("\\cos(A-B)-\\cos(A+B)"), f("\\sin(A+B)+\\sin(A-B)"), f("\\cos(A+B)-\\cos(A-B)")],
    theme: "formula",
  },
  {
    atomKey: "trig-sum-to-product:formula:0",
    stem: "Which sum-to-product identity for \\(\\sin C+\\sin D\\) is correct?",
    distractors: [f("2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("2\\sin\\tfrac{C-D}{2}\\cos\\tfrac{C+D}{2}"), f("2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}")],
    theme: "formula",
  },
  {
    atomKey: "trig-sum-to-product:formula:1",
    stem: "Which sum-to-product identity for \\(\\cos C-\\cos D\\) is correct?",
    distractors: [f("2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("-2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}"), f("2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}")],
    theme: "formula",
  },
  {
    atomKey: "trig-triple-angle:formula:0",
    stem: "Which is the correct triple-angle formula for \\(\\sin 3A\\)?",
    distractors: [f("4\\sin^3 A-3\\sin A"), f("3\\sin A+4\\sin^3 A"), f("4\\sin A-3\\sin^3 A")],
    theme: "formula",
  },
  {
    atomKey: "trig-triple-angle:formula:1",
    stem: "Which is the correct triple-angle formula for \\(\\cos 3A\\)?",
    distractors: [f("3\\cos A-4\\cos^3 A"), f("4\\cos^3 A+3\\cos A"), f("3\\cos^3 A-4\\cos A")],
    theme: "formula",
  },
];
