/**
 * NDA Maths · Trigonometric Identities · the "Common Traps" theme.
 *
 * Trap atoms are SEEDS (placeholder stem + empty key) — each entry authors the
 * FULL question via `stem` + `correct` overrides, engineered so the concept's
 * classic misconception is the most TEMPTING wrong option (the FIRST distractor).
 * Theme stays 'trap'. Run:
 *   npm run quiz:verify nda-maths__trigonometric-identities-traps
 *
 * 14 distinct traps → one 14-question "Common Traps" quiz. The misconception in
 * each is the trap taught by the matching notes `traps` callout (added 2026-06-10).
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Values & quadrants ──
  { atomKey: "trig-quadrant-signs-allied:trap:0", stem: "If \\(\\cos\\theta=\\dfrac35\\), what is \\(\\cos(180^\\circ-\\theta)\\)?", correct: f("-\\dfrac35"), distractors: [f("\\dfrac35"), f("-\\dfrac45"), f("\\dfrac45")] }, // cos(180−θ)=−cosθ=−3/5; trap drops the sign
  { atomKey: "trig-standard-values:trap:0", stem: "Evaluate \\(\\sin 30^\\circ+\\cos 60^\\circ\\).", correct: f("1"), distractors: [f("\\sqrt3"), f("\\dfrac12"), f("\\dfrac{\\sqrt3}{2}")] }, // ½+½=1; trap swaps to √3/2 each → √3
  { atomKey: "trig-fundamental-identities:trap:0", stem: "If \\(\\tan\\theta=\\dfrac34\\), what is \\(\\sec^2\\theta\\)?", correct: f("\\dfrac{25}{16}"), distractors: [f("\\dfrac{7}{16}"), f("\\dfrac{9}{16}"), f("\\dfrac{16}{25}")] }, // 1+tan²=25/16; trap 1−tan²=7/16
  { atomKey: "trig-ratios-from-one:trap:0", stem: "If \\(\\cos\\theta=\\dfrac35\\) and \\(\\theta\\) lies in the fourth quadrant, find \\(\\tan\\theta\\).", correct: f("-\\dfrac43"), distractors: [f("\\dfrac43"), f("-\\dfrac34"), f("\\dfrac34")] }, // QIV→sin=−4/5→tan=−4/3; trap positive root
  // ── Compound angle ──
  { atomKey: "trig-compound-sin-cos:trap:0", stem: "\\(A\\) and \\(B\\) are acute with \\(\\sin A=\\dfrac35\\) and \\(\\cos B=\\dfrac{5}{13}\\). Find \\(\\sin(A+B)\\).", correct: f("\\dfrac{63}{65}"), distractors: [f("\\dfrac{99}{65}"), f("\\dfrac{33}{65}"), f("\\dfrac{56}{65}")] }, // 15/65+48/65=63/65; trap sinA+sinB=99/65
  { atomKey: "trig-compound-tan:trap:0", stem: "If \\(\\tan A=\\dfrac12\\) and \\(\\tan B=\\dfrac13\\), find \\(\\tan(A+B)\\).", correct: f("1"), distractors: [f("\\dfrac56"), f("\\dfrac57"), f("\\dfrac16")] }, // (5/6)/(5/6)=1; trap drops denominator → 5/6
  { atomKey: "trig-compound-identities:trap:0", stem: "Evaluate \\(\\cos 75^\\circ\\cos 15^\\circ\\).", correct: f("\\dfrac14"), distractors: [f("-\\dfrac14"), f("\\dfrac12"), f("\\dfrac34")] }, // cos²45−sin²30=¼; trap cos²A−cos²B=−¼
  // ── Multiple / half angle ──
  { atomKey: "trig-double-angle:trap:0", stem: "If \\(A\\) is acute with \\(\\sin A=\\dfrac35\\), find \\(\\sin 2A\\).", correct: f("\\dfrac{24}{25}"), distractors: [f("\\dfrac65"), f("\\dfrac{7}{25}"), f("\\dfrac{12}{25}")] }, // 2·(3/5)(4/5)=24/25; trap 2 sinA=6/5
  { atomKey: "trig-triple-angle:trap:0", stem: "Simplify \\(3\\sin 20^\\circ-4\\sin^3 20^\\circ\\).", correct: f("\\dfrac{\\sqrt3}{2}"), distractors: [f("-\\dfrac{\\sqrt3}{2}"), f("\\dfrac12"), f("\\sqrt3")] }, // =sin60°=√3/2; trap flips formula → −sin60°
  { atomKey: "trig-half-angle:trap:0", stem: "Given \\(\\cos 300^\\circ=\\dfrac12\\), use the half-angle formula to find \\(\\cos 150^\\circ\\).", correct: f("-\\dfrac{\\sqrt3}{2}"), distractors: [f("\\dfrac{\\sqrt3}{2}"), f("\\dfrac12"), f("-\\dfrac12")] }, // 150° in QII→negative root → −√3/2; trap positive root
  // ── Product / sum ──
  { atomKey: "trig-product-to-sum:trap:0", stem: "Express \\(2\\sin 45^\\circ\\sin 15^\\circ\\) as a difference of cosines and evaluate.", correct: f("\\dfrac{\\sqrt3-1}{2}"), distractors: [f("\\dfrac{1-\\sqrt3}{2}"), f("\\dfrac{\\sqrt3+1}{2}"), f("\\dfrac{\\sqrt3}{2}")] }, // cos30−cos60=(√3−1)/2; trap reverses order
  { atomKey: "trig-sum-to-product:trap:0", stem: "Evaluate \\(\\sin 75^\\circ+\\sin 15^\\circ\\) using sum-to-product.", correct: f("\\dfrac{\\sqrt6}{2}"), distractors: [f("\\dfrac{\\sqrt2}{2}"), f("\\dfrac{\\sqrt3}{2}"), f("2")] }, // 2 sin45 cos30=√6/2; trap swaps slots → 2 cos45 sin30=√2/2
  { atomKey: "trig-conditional-identities:trap:0", stem: "In a triangle \\(A+B+C=180^\\circ\\) with \\(\\tan A=2\\) and \\(\\tan B=3\\). Find \\(\\tan C\\).", correct: f("1"), distractors: [f("-1"), f("5"), f("6")] }, // 5+tanC=6 tanC → tanC=1; trap uses tan(A+B)=−1
  // ── Max / min ──
  { atomKey: "trig-asinx-bcosx-range:trap:0", stem: "Find the maximum value of \\(5\\sin x+12\\cos x\\).", correct: f("13"), distractors: [f("17"), f("\\sqrt{17}"), f("7")] }, // √(25+144)=13; trap adds coefficients → 17
];
