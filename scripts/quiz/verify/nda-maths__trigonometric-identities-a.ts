/**
 * NDA Maths · Trigonometric Identities (Part A: trig-values-quadrants + trig-compound-angle)
 * · practiceSet + selfCheck MCQs (computation). Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__trigonometric-identities-a
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // === trig-compound-angle ===

  // trig-compound-applications
  e("trig-compound-applications:practiceSet:0", [f("\\tan(45°+\\theta)"), f("\\cot(45°-\\theta)"), f("\\tan(\\theta-45°)")]),
  e("trig-compound-applications:practiceSet:1", [f("2\\cos(\\theta-30°)"), f("2\\sin(\\theta+30°)"), f("2\\cos(\\theta+60°)")]),
  e("trig-compound-applications:practiceSet:2", [f("\\cos(A+B)\\cos(A-B)"), f("\\sin(A+B)\\cos(A-B)"), f("\\cos(A+B)\\sin(A-B)")]),
  e("trig-compound-applications:practiceSet:3", [f("0"), f("\\tfrac12"), f("89")]),
  e("trig-compound-applications:selfCheck:0", [f("2\\sin(\\theta-30°)"), f("2\\cos(\\theta+30°)"), f("2\\sin(\\theta+60°)")]),

  // trig-compound-conditional-roots
  e("trig-compound-conditional-roots:practiceSet:0", [f("\\dfrac{b}{1+c}"), f("\\dfrac{c}{1-b}"), f("\\dfrac{-b}{1-c}")]),
  e("trig-compound-conditional-roots:practiceSet:2", ["Componendo only", "Cross-multiplication", "Substitution \\(x=y\\)"]),
  e("trig-compound-conditional-roots:practiceSet:3", [f("\\tfrac67"), f("-\\tfrac68"), f("\\tfrac68")]),
  e("trig-compound-conditional-roots:selfCheck:0", [f("\\dfrac{\\tan x}{\\tan y}=\\dfrac{b}{a}"), f("\\dfrac{\\tan x}{\\tan y}=\\dfrac{a+b}{a-b}"), f("\\dfrac{\\tan x}{\\tan y}=\\dfrac{a-b}{a+b}")]),

  // trig-compound-identities
  e("trig-compound-identities:practiceSet:0", [f("\\text{Dividing by }\\sin^2 x"), f("\\text{Multiplying by }\\sec^2 x"), f("\\text{Adding }\\tan^2 x")]),
  e("trig-compound-identities:practiceSet:1", [f("\\cot^2\\theta"), f("1"), f("\\sec^2\\theta")]),
  e("trig-compound-identities:practiceSet:2", [f("\\sec\\alpha"), f("\\cot\\alpha"), f("\\sin\\alpha")]),
  e("trig-compound-identities:practiceSet:3", [f("\\tfrac13"), f("\\tfrac34"), f("\\tfrac14")]),
  e("trig-compound-identities:selfCheck:0", [f("\\cot^2\\theta"), f("1"), f("\\sec^2\\theta\\csc^2\\theta")]),

  // trig-compound-sin-cos
  e("trig-compound-sin-cos:practiceSet:0", [f("\\sin A\\cos B-\\cos A\\sin B"), f("\\cos A\\cos B+\\sin A\\sin B"), f("\\sin A\\sin B+\\cos A\\cos B")]),
  e("trig-compound-sin-cos:practiceSet:1", [f("\\cos A\\cos B+\\sin A\\sin B"), f("\\sin A\\cos B-\\cos A\\sin B"), f("\\cos A\\sin B-\\sin A\\cos B")]),
  e("trig-compound-sin-cos:practiceSet:2", [f("\\tfrac{\\sqrt3-1}{2\\sqrt2}"), f("\\tfrac{\\sqrt3+1}{2}"), f("\\tfrac{1}{2\\sqrt2}")]),
  e("trig-compound-sin-cos:practiceSet:3", [f("2\\cos A\\cos B"), f("2\\sin A\\cos B"), f("-2\\sin A\\sin B")]),
  e("trig-compound-sin-cos:selfCheck:0", [f("-\\tfrac{1}{\\sqrt2}"), f("\\tfrac{\\sqrt3}{2}"), f("\\tfrac{\\sqrt3-1}{2\\sqrt2}")]),

  // trig-compound-tan
  e("trig-compound-tan:practiceSet:0", [f("\\dfrac{\\tan A-\\tan B}{1+\\tan A\\tan B}"), f("\\dfrac{\\tan A+\\tan B}{1+\\tan A\\tan B}"), f("\\dfrac{1-\\tan A\\tan B}{\\tan A+\\tan B}")]),
  e("trig-compound-tan:practiceSet:1", [f("\\dfrac{1-\\tan\\theta}{1+\\tan\\theta}"), f("\\dfrac{\\tan\\theta-1}{1+\\tan\\theta}"), f("\\dfrac{1+\\tan\\theta}{1+\\tan\\theta}")]),
  e("trig-compound-tan:practiceSet:2", [f("2-\\sqrt3"), f("\\sqrt3-2"), f("\\sqrt3+1")]),
  e("trig-compound-tan:practiceSet:3", ["Zero", f("1"), f("\\sqrt3")]),
  e("trig-compound-tan:selfCheck:0", [f("\\dfrac{1-\\tan 9°}{1+\\tan 9°}"), f("\\dfrac{\\tan 9°-1}{1+\\tan 9°}"), f("\\dfrac{1+\\tan 9°}{1+\\tan 9°}")]),

  // === trig-values-quadrants ===

  // trig-fundamental-identities
  e("trig-fundamental-identities:practiceSet:0", [f("\\csc^2\\theta"), f("\\tan^2\\theta"), f("\\sec^2\\theta-1")]),
  e("trig-fundamental-identities:practiceSet:1", [f("\\sec^2\\theta"), f("\\cot^2\\theta"), f("\\csc^2\\theta-1")]),
  e("trig-fundamental-identities:practiceSet:2", [f("0"), f("\\tan^2\\theta"), f("2")]),
  e("trig-fundamental-identities:practiceSet:3", [f("\\sec\\alpha"), f("\\cot\\alpha"), f("\\sin\\alpha")]),

  // trig-quadrant-signs-allied
  e("trig-quadrant-signs-allied:practiceSet:0", ["Quadrants II and IV", "Quadrants I and II", "Quadrants III and IV"]),
  e("trig-quadrant-signs-allied:practiceSet:1", ["Positive", "Zero", "Undefined"]),
  e("trig-quadrant-signs-allied:practiceSet:2", ["IV", "II", "I"]),
  e("trig-quadrant-signs-allied:selfCheck:0", [f("\\sin^2\\theta"), f("-\\cos^2\\theta"), f("\\cos^2\\theta")]),

  // trig-ratios-from-one
  e("trig-ratios-from-one:practiceSet:0", [f("\\tfrac45"), f("-\\tfrac35"), f("\\tfrac35")]),
  e("trig-ratios-from-one:practiceSet:1", ["The magnitude", "Another ratio", "The reference angle"]),
  e("trig-ratios-from-one:practiceSet:2", [f("\\tfrac{20}{29}"), f("\\tfrac{20}{21}"), f("\\tfrac{29}{21}")]),
  e("trig-ratios-from-one:selfCheck:0", [f("\\tan\\theta=\\tfrac{20}{21}"), f("\\tan\\theta=\\tfrac{21}{29}"), f("\\tan\\theta=\\tfrac{20}{29}")]),

  // trig-special-angle-values
  e("trig-special-angle-values:practiceSet:0", [f("2+\\sqrt3"), f("\\sqrt3-2"), f("\\tfrac{1}{\\sqrt3}")]),
  e("trig-special-angle-values:practiceSet:1", [f("4"), f("2-\\sqrt3"), f("0")]),
  e("trig-special-angle-values:practiceSet:2", [f("2"), f("2\\sqrt3"), f("1")]),
  e("trig-special-angle-values:practiceSet:3", [f("\\tfrac{\\sqrt5}{2}"), f("1"), f("\\tfrac{1}{4}")]),
  e("trig-special-angle-values:selfCheck:0", [f("4"), f("2"), f("196")]),

  // trig-standard-values
  e("trig-standard-values:practiceSet:0", [f("\\tfrac{1}{\\sqrt3}"), f("\\sqrt3"), f("\\tfrac{\\sqrt3}{2}")]),
  e("trig-standard-values:practiceSet:1", [f("\\tfrac12"), f("\\tfrac{1}{\\sqrt2}"), f("\\tfrac{\\sqrt3}{3}")]),
  e("trig-standard-values:practiceSet:2", [f("-\\sin\\theta"), f("\\cos\\theta"), f("-\\cos\\theta")]),
  e("trig-standard-values:practiceSet:3", [f("\\sin\\theta"), f("\\cos\\theta"), f("-\\cos\\theta")]),
  e("trig-standard-values:selfCheck:0", [f("2"), f("-\\tfrac{2}{\\sqrt3}"), f("\\tfrac12")]),
];
