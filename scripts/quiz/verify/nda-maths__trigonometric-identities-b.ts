/**
 * NDA Maths · Trigonometric Identities (Part B) · practiceSet + selfCheck MCQs (computation).
 * Subtopics: trig-multiple-half-angle, trig-product-sum, trig-max-min.
 * Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__trigonometric-identities-b
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── trig-max-min ──────────────────────────────────────────────
  // trig-am-gm-minimum
  e("trig-am-gm-minimum:practiceSet:0", [f("n"), f("n^2"), f("2n^2")]),                                  // min cot²+n²tan² = 2n
  e("trig-am-gm-minimum:practiceSet:1", [f("1"), f("\\tfrac12"), f("4")]),                                // min cosθ+secθ = 2
  e("trig-am-gm-minimum:practiceSet:2", [f("a^2+b^2"), f("2ab"), f("(a-b)^2")]),                          // min = (a+b)²
  e("trig-am-gm-minimum:selfCheck:0", [f("6"), f("13"), f("36")]),                                        // 2√36 = 12
  // trig-asinx-bcosx-range
  e("trig-asinx-bcosx-range:practiceSet:0", [f("a+b"), f("a^2+b^2"), f("|a|+|b|")]),                       // max = √(a²+b²)
  e("trig-asinx-bcosx-range:practiceSet:1", [f("-7"), f("-1"), f("5")]),                                  // min 3sin+4cos = -5
  e("trig-asinx-bcosx-range:practiceSet:2", [f("[1,\\ 3]"), f("[2-2,\\ 2+2]"), f("[-\\sqrt2,\\ \\sqrt2]")]), // 2±√2
  e("trig-asinx-bcosx-range:practiceSet:3", [f("\\sqrt3"), f("1+\\sqrt3"), f("4")]),                      // max cosx+√3sinx = 2
  e("trig-asinx-bcosx-range:selfCheck:0", [f("2"), f("1"), f("1+\\tfrac{\\sqrt3}{2}")]),                  // max sinφ+cosφ = √2
  // trig-substitution-range
  e("trig-substitution-range:practiceSet:0", [f("t=\\tan x\\in\\mathbb R"), f("t=\\sin x\\in[-1,1]"), f("t=\\cos 2x\\in[-1,1]")]), // t=sin²x∈[0,1]
  e("trig-substitution-range:practiceSet:1", [f("\\tfrac12"), f("1"), f("\\tfrac14")]),                   // min sin²+cos⁴ = 3/4
  e("trig-substitution-range:selfCheck:0", [f("Maximum \\(=11\\) (at \\(u=0\\))."), f("Maximum \\(=14\\) (at \\(u=-1\\))."), f("Maximum \\(=12\\) (at \\(u=\\tfrac12\\)).")]), // max = 13

  // ── trig-multiple-half-angle ──────────────────────────────────
  // trig-double-angle
  e("trig-double-angle:practiceSet:0", [f("\\sin^2 A-\\cos^2 A"), f("\\cos^2 A-\\sin^2 A"), f("2\\sin A")]), // sin2A = 2sinAcosA
  e("trig-double-angle:practiceSet:1", [f("2\\sin^2 A-1"), f("1-2\\cos^2 A"), f("2\\cos^2 A-1")]),         // cos2A = 1-2sin²A
  e("trig-double-angle:practiceSet:2", [f("\\dfrac{1}{\\sin 2A}"), f("\\dfrac{2}{\\cos 2A}"), f("\\sin 2A")]), // tanA+cotA = 2/sin2A
  e("trig-double-angle:practiceSet:3", [f("\\cos 2\\theta"), f("\\tan 2\\theta"), f("2\\sin\\theta")]),     // = sin2θ
  e("trig-double-angle:selfCheck:0", [f("\\tfrac{31}{25}"), f("\\tfrac{17}{5}"), f("\\tfrac{7}{5}")]),     // 2·24/25+7/25 = 55/25 = 11/5
  // trig-half-angle
  e("trig-half-angle:practiceSet:0", [f("2\\cos^2\\tfrac A2"), f("\\sin^2\\tfrac A2"), f("1-2\\sin^2\\tfrac A2")]), // 1-cosA = 2sin²(A/2)
  e("trig-half-angle:practiceSet:1", [f("2\\sin^2\\tfrac A2"), f("\\cos^2\\tfrac A2"), f("2\\cos A")]),     // 1+cosA = 2cos²(A/2)
  e("trig-half-angle:practiceSet:2", [f("\\tan\\tfrac A2"), f("\\csc A-\\cot A"), f("\\tan A")]),           // cscA+cotA = cot(A/2)
  e("trig-half-angle:practiceSet:3", [f("\\cot\\tfrac A2"), f("\\tan A"), f("\\sin\\tfrac A2")]),           // = tan(A/2)
  e("trig-half-angle:selfCheck:0", [f("\\sqrt2-1"), f("\\sqrt3+1"), f("\\sqrt3-1")]),                      // tan67.5° = √2+1
  // trig-multiple-applications
  e("trig-multiple-applications:practiceSet:0", [f("1-\\sin 2\\alpha"), f("1+\\cos 2\\alpha"), f("\\sin 2\\alpha")]), // (sin+cos)² = 1+sin2α
  e("trig-multiple-applications:practiceSet:1", [f("1-p^2"), f("p^2"), f("2p-1")]),                        // sin2α = p²-1
  e("trig-multiple-applications:practiceSet:2", [f("2\\sin n\\theta"), f("2\\cos\\theta"), f("\\cos n\\theta")]), // = 2cos(nθ)
  e("trig-multiple-applications:practiceSet:3", [f("1+\\sin 2\\alpha"), f("1-\\cos 2\\alpha"), f("\\sin^2\\alpha-\\cos^2\\alpha")]), // (sin-cos)² = 1-sin2α
  e("trig-multiple-applications:selfCheck:0", [f("4\\cos^2\\theta"), f("2\\cos^2\\theta"), f("4\\cos^2\\theta-1")]), // x²+1/x² = 2cos2θ
  // trig-triple-angle
  e("trig-triple-angle:practiceSet:0", [f("4\\sin^3 A-3\\sin A"), f("3\\cos A-4\\cos^3 A"), f("3\\sin A+4\\sin^3 A")]), // sin3A = 3sinA-4sin³A
  e("trig-triple-angle:practiceSet:1", [f("3\\cos A-4\\cos^3 A"), f("4\\cos^3 A+3\\cos A"), f("4\\sin^3 A-3\\sin A")]), // cos3A = 4cos³A-3cosA
  e("trig-triple-angle:practiceSet:2", [f("\\sin 30°=\\tfrac12"), f("\\cos 10°"), f("\\cos 3°")]),         // = cos30°
  e("trig-triple-angle:practiceSet:3", [f("\\dfrac{3\\tan A+\\tan^3 A}{1+3\\tan^2 A}"), f("\\dfrac{3\\tan A-\\tan^3 A}{1+3\\tan^2 A}"), f("\\dfrac{\\tan^3 A-3\\tan A}{1-3\\tan^2 A}")]), // tan3A
  e("trig-triple-angle:selfCheck:0", [f("\\sin 3x"), f("\\sin 3x+\\cos 3x"), f("2\\cos 3x")]),             // = cos3x

  // ── trig-product-sum ──────────────────────────────────────────
  // trig-conditional-identities
  e("trig-conditional-identities:practiceSet:0", [f("\\cot A\\cot B\\cot C"), f("0"), f("1")]),            // tanA+tanB+tanC = tanAtanBtanC
  e("trig-conditional-identities:practiceSet:1", [f("0"), f("\\tan A\\tan B\\tan C"), f("\\tfrac12")]),     // ΣtanAtanB = 1
  e("trig-conditional-identities:practiceSet:2", [f("4\\cos A\\cos B\\cos C"), f("2\\sin A\\sin B\\sin C"), f("4\\sin A\\sin B\\cos C")]), // sin2A+sin2B+sin2C = 4sinAsinBsinC
  e("trig-conditional-identities:selfCheck:0", [f("4\\cos A\\cos B\\cos C"), f("2\\sin A\\sin B\\sin C"), f("4\\cos A\\cos B\\sin C")]), // = 4sinAsinBsinC
  // trig-product-to-sum
  e("trig-product-to-sum:practiceSet:0", [f("\\sin(A+B)-\\sin(A-B)"), f("\\cos(A-B)-\\cos(A+B)"), f("\\cos(A+B)+\\cos(A-B)")]), // 2sinAcosB = sin(A+B)+sin(A-B)
  e("trig-product-to-sum:practiceSet:1", [f("\\cos(A+B)-\\cos(A-B)"), f("\\cos(A+B)+\\cos(A-B)"), f("\\sin(A+B)-\\sin(A-B)")]), // 2sinAsinB = cos(A-B)-cos(A+B)
  e("trig-product-to-sum:practiceSet:2", [f("\\cos(A+B)-\\cos(A-B)"), f("\\cos(A-B)-\\cos(A+B)"), f("\\sin(A+B)+\\sin(A-B)")]), // 2cosAcosB = cos(A+B)+cos(A-B)
  e("trig-product-to-sum:selfCheck:0", [f("1"), f("\\tfrac{\\sqrt3}{2}"), f("\\tfrac{1}{4}")]),            // 2cos75cos15 = 1/2
  // trig-sum-to-product
  e("trig-sum-to-product:practiceSet:0", [f("2\\cos\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("2\\sin\\tfrac{C-D}{2}\\cos\\tfrac{C+D}{2}"), f("2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}")]), // sinC+sinD
  e("trig-sum-to-product:practiceSet:1", [f("2\\sin\\tfrac{C+D}{2}\\sin\\tfrac{C-D}{2}"), f("-2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}"), f("2\\cos\\tfrac{C+D}{2}\\cos\\tfrac{C-D}{2}")]), // cosC-cosD = -2sin((C+D)/2)sin((C-D)/2)
  e("trig-sum-to-product:practiceSet:2", [f("\\cot\\tfrac{C+D}{2}"), f("\\tan\\tfrac{C-D}{2}"), f("\\tan(C+D)")]), // = tan((C+D)/2)
  e("trig-sum-to-product:practiceSet:3", [f("2\\sin 4x\\cos x"), f("2\\cos 4x\\cos x"), f("2\\sin 4x\\sin x")]), // sin5x-sin3x = 2cos4x sinx
  e("trig-sum-to-product:selfCheck:0", [f("-\\dfrac{\\sqrt5+1}{4}"), f("\\dfrac{\\sqrt5-1}{4}"), f("-\\dfrac{\\sqrt5-1}{2}")]), // cos48-cos12 = -(√5-1)/4
  // trig-telescoping-products
  e("trig-telescoping-products:practiceSet:1", [f("\\dfrac{\\sin 8\\theta}{4\\sin\\theta}"), f("\\dfrac{\\sin 4\\theta}{8\\sin\\theta}"), f("\\dfrac{\\sin 8\\theta}{8\\cos\\theta}")]), // = sin8θ/(8sinθ)
  e("trig-telescoping-products:practiceSet:2", [f("\\tfrac14\\cos 3\\theta"), f("\\tfrac34\\sin 3\\theta"), f("\\tfrac18\\sin 3\\theta")]), // = (1/4)sin3θ
  e("trig-telescoping-products:selfCheck:0", [f("\\tfrac18"), f("\\tfrac12"), f("-\\tfrac14")]),           // cos36cos72 = 1/4
];
