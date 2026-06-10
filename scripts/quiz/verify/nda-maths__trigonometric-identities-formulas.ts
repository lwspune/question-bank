/**
 * NDA Maths · Trigonometric Identities · per-FORMULA recall MCQs.
 * Each formula gets a specific stem + 3 TEMPTING PERMUTATION distractors — wrong
 * versions of the SAME formula, in the SAME full-equation format as the answer
 * (no length/format tell). Run:
 *   npm run quiz:verify nda-maths__trigonometric-identities-formulas
 *
 * Covers EVERY trig identity formula the chapter teaches: fundamental, compound
 * (sin/cos/tan), double-angle (sin/cos/tan 2A), triple-angle (sin/cos/tan 3A),
 * half-angle (sin/cos/tan A/2), the four product-to-sum + four sum-to-product,
 * the A+B+C=π conditional, and AM-GM. (formula.latex was enriched 2026-06-10 so
 * every taught formula harvests as a recall atom — see CLAUDE.md Decisions log.)
 * Skipped (not a formula): trig-am-gm-minimum:formula:1 ("equality at u=v", a condition).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Fundamental (Pythagorean) identities ──
  { atomKey: "trig-fundamental-identities:formula:0", stem: "Which Pythagorean identity is correct?", distractors: [f("\\sin^2\\theta-\\cos^2\\theta=1"), f("\\sin^2\\theta+\\cos^2\\theta=0"), f("1+\\cos^2\\theta=\\sin^2\\theta")], theme: "formula" },
  { atomKey: "trig-fundamental-identities:formula:1", stem: "Which identity relating sec and tan is correct?", distractors: [f("\\sec^2\\theta+\\tan^2\\theta=1"), f("\\tan^2\\theta-\\sec^2\\theta=1"), f("\\sec^2\\theta-\\tan^2\\theta=0")], theme: "formula" },
  { atomKey: "trig-fundamental-identities:formula:2", stem: "Which identity relating csc and cot is correct?", distractors: [f("\\csc^2\\theta+\\cot^2\\theta=1"), f("\\cot^2\\theta-\\csc^2\\theta=1"), f("\\csc^2\\theta-\\cot^2\\theta=0")], theme: "formula" },

  // ── Compound angle ──
  { atomKey: "trig-compound-sin-cos:formula:0", stem: "Which is the correct expansion of sin(A ± B)?", distractors: [f("\\sin(A\\pm B)=\\sin A\\cos B\\mp\\cos A\\sin B"), f("\\sin(A\\pm B)=\\cos A\\cos B\\pm\\sin A\\sin B"), f("\\sin(A\\pm B)=\\sin A\\sin B\\pm\\cos A\\cos B")], theme: "formula" },
  { atomKey: "trig-compound-sin-cos:formula:1", stem: "Which is the correct expansion of cos(A ± B)?", distractors: [f("\\cos(A\\pm B)=\\cos A\\cos B\\pm\\sin A\\sin B"), f("\\cos(A\\pm B)=\\sin A\\cos B\\mp\\cos A\\sin B"), f("\\cos(A\\pm B)=\\cos A\\sin B\\mp\\sin A\\cos B")], theme: "formula" },
  { atomKey: "trig-compound-tan:formula:0", stem: "Which is the correct expansion of tan(A ± B)?", distractors: [f("\\tan(A\\pm B)=\\dfrac{\\tan A\\pm\\tan B}{1\\pm\\tan A\\tan B}"), f("\\tan(A\\pm B)=\\dfrac{\\tan A\\mp\\tan B}{1\\mp\\tan A\\tan B}"), f("\\tan(A\\pm B)=\\dfrac{1\\mp\\tan A\\tan B}{\\tan A\\pm\\tan B}")], theme: "formula" },

  // ── Double angle ──
  { atomKey: "trig-double-angle:formula:0", stem: "Which double-angle formula for sin 2A is correct?", distractors: [f("\\sin 2A=\\cos^2 A-\\sin^2 A"), f("\\sin 2A=2\\cos^2 A-1"), f("\\sin 2A=\\sin A\\cos A")], theme: "formula" },
  { atomKey: "trig-double-angle:formula:1", stem: "Which double-angle formula for cos 2A is correct?", distractors: [f("\\cos 2A=\\sin^2 A-\\cos^2 A"), f("\\cos 2A=2\\sin A\\cos A"), f("\\cos 2A=2\\sin^2 A-1")], theme: "formula" },
  { atomKey: "trig-double-angle:formula:2", stem: "Which double-angle formula for tan 2A is correct?", distractors: [f("\\tan 2A=\\dfrac{2\\tan A}{1+\\tan^2 A}"), f("\\tan 2A=\\dfrac{\\tan A}{1-\\tan^2 A}"), f("\\tan 2A=\\dfrac{1-\\tan^2 A}{2\\tan A}")], theme: "formula" },

  // ── Triple angle ──
  { atomKey: "trig-triple-angle:formula:0", stem: "Which triple-angle formula for sin 3A is correct?", distractors: [f("\\sin 3A=4\\sin^3 A-3\\sin A"), f("\\sin 3A=3\\sin A+4\\sin^3 A"), f("\\sin 3A=4\\sin A-3\\sin^3 A")], theme: "formula" },
  { atomKey: "trig-triple-angle:formula:1", stem: "Which triple-angle formula for cos 3A is correct?", distractors: [f("\\cos 3A=3\\cos A-4\\cos^3 A"), f("\\cos 3A=4\\cos^3 A+3\\cos A"), f("\\cos 3A=3\\cos^3 A-4\\cos A")], theme: "formula" },
  { atomKey: "trig-triple-angle:formula:2", stem: "Which triple-angle formula for tan 3A is correct?", distractors: [f("\\tan 3A=\\dfrac{3\\tan A+\\tan^3 A}{1-3\\tan^2 A}"), f("\\tan 3A=\\dfrac{3\\tan A-\\tan^3 A}{1+3\\tan^2 A}"), f("\\tan 3A=\\dfrac{\\tan^3 A-3\\tan A}{1-3\\tan^2 A}")], theme: "formula" },

  // ── Half angle ──
  { atomKey: "trig-half-angle:formula:0", stem: "Which half-angle formula for sin(A/2) is correct?", distractors: [f("\\sin\\tfrac A2=\\pm\\sqrt{\\tfrac{1+\\cos A}{2}}"), f("\\sin\\tfrac A2=\\pm\\dfrac{1-\\cos A}{2}"), f("\\sin\\tfrac A2=\\pm\\sqrt{1-\\cos A}")], theme: "formula" },
  { atomKey: "trig-half-angle:formula:1", stem: "Which half-angle formula for cos(A/2) is correct?", distractors: [f("\\cos\\tfrac A2=\\pm\\sqrt{\\tfrac{1-\\cos A}{2}}"), f("\\cos\\tfrac A2=\\pm\\dfrac{1+\\cos A}{2}"), f("\\cos\\tfrac A2=\\pm\\sqrt{1+\\cos A}")], theme: "formula" },
  { atomKey: "trig-half-angle:formula:2", stem: "Which half-angle formula for tan(A/2) is correct?", distractors: [f("\\tan\\tfrac A2=\\dfrac{1+\\cos A}{\\sin A}"), f("\\tan\\tfrac A2=\\dfrac{\\sin A}{1-\\cos A}"), f("\\tan\\tfrac A2=\\dfrac{1-\\cos A}{1+\\cos A}")], theme: "formula" },

  // ── Product-to-sum (all four) ──
  { atomKey: "trig-product-to-sum:formula:0", stem: "Which product-to-sum identity for 2 sin A cos B is correct?", distractors: [f("2\\sin A\\cos B=\\sin(A+B)-\\sin(A-B)"), f("2\\sin A\\cos B=\\cos(A-B)-\\cos(A+B)"), f("2\\sin A\\cos B=\\cos(A+B)+\\cos(A-B)")], theme: "formula" },
  { atomKey: "trig-product-to-sum:formula:1", stem: "Which product-to-sum identity for 2 cos A cos B is correct?", distractors: [f("2\\cos A\\cos B=\\cos(A-B)-\\cos(A+B)"), f("2\\cos A\\cos B=\\sin(A+B)+\\sin(A-B)"), f("2\\cos A\\cos B=\\cos(A+B)-\\cos(A-B)")], theme: "formula" },
  { atomKey: "trig-product-to-sum:formula:2", stem: "Which product-to-sum identity for 2 cos A sin B is correct?", distractors: [f("2\\cos A\\sin B=\\sin(A+B)+\\sin(A-B)"), f("2\\cos A\\sin B=\\sin(A-B)-\\sin(A+B)"), f("2\\cos A\\sin B=\\cos(A+B)-\\cos(A-B)")], theme: "formula" },
  { atomKey: "trig-product-to-sum:formula:3", stem: "Which product-to-sum identity for 2 sin A sin B is correct?", distractors: [f("2\\sin A\\sin B=\\cos(A+B)-\\cos(A-B)"), f("2\\sin A\\sin B=\\cos(A+B)+\\cos(A-B)"), f("2\\sin A\\sin B=\\sin(A+B)-\\sin(A-B)")], theme: "formula" },

  // ── Sum-to-product (all four) ──
  { atomKey: "trig-sum-to-product:formula:0", stem: "Which sum-to-product identity for sin C + sin D is correct?", distractors: [f("\\sin C+\\sin D=2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("\\sin C+\\sin D=2\\sin\\tfrac{C-D}{2}\\cos\\tfrac{C+D}{2}"), f("\\sin C+\\sin D=2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}")], theme: "formula" },
  { atomKey: "trig-sum-to-product:formula:1", stem: "Which sum-to-product identity for cos C − cos D is correct?", distractors: [f("\\cos C-\\cos D=2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("\\cos C-\\cos D=-2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}"), f("\\cos C-\\cos D=2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}")], theme: "formula" },
  { atomKey: "trig-sum-to-product:formula:2", stem: "Which sum-to-product identity for sin C − sin D is correct?", distractors: [f("\\sin C-\\sin D=2\\sin\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}"), f("\\sin C-\\sin D=2\\sin\\tfrac{C-D}{2}\\cos\\tfrac{C+D}{2}"), f("\\sin C-\\sin D=-2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}")], theme: "formula" },
  { atomKey: "trig-sum-to-product:formula:3", stem: "Which sum-to-product identity for cos C + cos D is correct?", distractors: [f("\\cos C+\\cos D=-2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("\\cos C+\\cos D=2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("\\cos C+\\cos D=2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}")], theme: "formula" },

  // ── Conditional + AM-GM ──
  { atomKey: "trig-conditional-identities:formula:0", stem: "If A + B + C = π, which conditional tangent identity is correct?", distractors: [f("A+B+C=\\pi:\\ \\tan A+\\tan B+\\tan C=0"), f("A+B+C=\\pi:\\ \\tan A\\tan B\\tan C=1"), f("A+B+C=\\pi:\\ \\tan A+\\tan B+\\tan C=1")], theme: "formula" },
  { atomKey: "trig-am-gm-minimum:formula:0", stem: "For u, v > 0, which is the AM–GM inequality (used for reciprocal-type minima)?", distractors: [f("u+v\\ge \\sqrt{uv}"), f("u+v\\ge 2uv"), f("u+v\\le 2\\sqrt{uv}")], theme: "formula" },
];
