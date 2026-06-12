/**
 * NDA Maths · Complex Numbers · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived;
 * the lone fix: cn-cube-roots-properties:practiceSet:3 had a wrong notes answer
 * (1+ω+ω⁴ = 1+2ω ≠ 0) — the notes prompt was corrected to 1+ω⁴+ω⁸ (= 0), and
 * this atom's stem rides the corrected prompt below.
 * The open-form cn-de-moivre-and-roots:selfCheck:0 ("find a square root of -i")
 * is NOT MCQ-able and is skipped (looksMcqClean=false).
 *   npm run quiz:verify nda-maths__complex-numbers-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── cn-complex-fundamentals ──
  // i²=-1
  e("cn-complex-fundamentals:practiceSet:0", [f("1"), f("i"), f("-i")]),
  // (a+ib)=(c+id) requires a=c and b=d
  e("cn-complex-fundamentals:practiceSet:1", ["\\(a=d\\) and \\(b=c\\)", "\\(a+b=c+d\\)", "\\(ac=bd\\)"]),
  // divide by multiplying by the denominator's conjugate
  e("cn-complex-fundamentals:practiceSet:2", ["The numerator's conjugate", "The denominator's modulus", "\\(i\\)"]),
  // Re(3-5i)=3
  e("cn-complex-fundamentals:practiceSet:3", [f("-5"), f("5"), f("-3")]),
  // z=z̄ ⇒ purely real
  e("cn-complex-fundamentals:selfCheck:0", ["\\(z\\) is purely imaginary.", "\\(z=0\\).", "\\(|z|=1\\)."]),

  // ── cn-conjugate-and-real-imaginary ──
  // conj(a+ib)=a-ib
  e("cn-conjugate-and-real-imaginary:practiceSet:0", [f("-a+ib"), f("-a-ib"), f("b-ia")]),
  // zz̄=|z|²
  e("cn-conjugate-and-real-imaginary:practiceSet:1", [f("|z|"), f("z^2"), f("2\\operatorname{Re}(z)")]),
  // purely imaginary ⇔ z=-z̄ (real part 0)
  e("cn-conjugate-and-real-imaginary:practiceSet:2", [
    "\\(z=\\bar z\\) (imaginary part 0)",
    "\\(z\\bar z=1\\)",
    "\\(z+\\bar z=1\\)",
  ]),
  // real-coeff equation: complex roots in conjugate pairs
  e("cn-conjugate-and-real-imaginary:practiceSet:3", ["Reciprocal pairs", "Negative pairs", "All distinct, no pattern"]),
  // (z-1)/(z+1) purely imaginary ⇒ |z|=1
  e("cn-conjugate-and-real-imaginary:selfCheck:0", [f("|z|=2"), f("|z|=0"), f("|z|=\\tfrac12")]),

  // ── cn-modulus-properties ──
  // |z|=√(a²+b²)
  e("cn-modulus-properties:practiceSet:0", [f("a^2+b^2"), f("a+b"), f("\\sqrt{a^2-b^2}")]),
  // |z₁z₂|=|z₁||z₂|
  e("cn-modulus-properties:practiceSet:1", [f("|z_1|+|z_2|"), f("|z_1+z_2|"), f("|z_1|-|z_2|")]),
  // tool for max/min of |z±c|
  e("cn-modulus-properties:practiceSet:2", ["De Moivre's theorem", "Conjugate multiplication", "The argument formula"]),
  // |3+4i|=5
  e("cn-modulus-properties:practiceSet:3", [f("7"), f("25"), f("\\sqrt7")]),
  // |z+4|≤3 ⇒ max|z+1| = 6
  e("cn-modulus-properties:selfCheck:0", ["Maximum \\(=3\\).", "Maximum \\(=4\\).", "Maximum \\(=2\\)."]),

  // ── cn-argument-polar ──
  // polar form r(cosθ+i sinθ)
  e("cn-argument-polar:practiceSet:0", [
    f("r(\\cos\\theta-i\\sin\\theta)"),
    f("r(\\sin\\theta+i\\cos\\theta)"),
    f("|z|(\\cos\\theta+i\\sin\\theta)^2"),
  ]),
  // principal argument range (-π,π]
  e("cn-argument-polar:practiceSet:1", [f("[0,2\\pi)"), f("[0,\\pi]"), f("(-\\tfrac\\pi2,\\tfrac\\pi2]")]),
  // arg(z₁z₂)=arg z₁+arg z₂
  e("cn-argument-polar:practiceSet:2", [f("\\arg z_1-\\arg z_2"), f("\\arg z_1\\cdot\\arg z_2"), f("\\tan^{-1}(z_1z_2)")]),
  // principal arg of 1+i = π/4
  e("cn-argument-polar:practiceSet:3", [f("\\tfrac{3\\pi}4"), f("\\tfrac\\pi2"), f("-\\tfrac\\pi4")]),
  // principal arg of -1+i = 3π/4
  e("cn-argument-polar:selfCheck:0", [f("\\tfrac\\pi4"), f("-\\tfrac{3\\pi}4"), f("\\tfrac{5\\pi}4")]),

  // ── cn-powers-of-i ──
  // i³=-i
  e("cn-powers-of-i:practiceSet:0", [f("i"), f("-1"), f("1")]),
  // i^n depends on n mod 4
  e("cn-powers-of-i:practiceSet:1", [f("n \\bmod 2"), f("n \\bmod 3"), f("n \\bmod 5")]),
  // i^k+i^{k+1}+i^{k+2}+i^{k+3}=0
  e("cn-powers-of-i:practiceSet:2", [f("1"), f("4i"), f("-1")]),
  // i^102 = -1
  e("cn-powers-of-i:practiceSet:3", [f("1"), f("i"), f("-i")]),
  // i^2026 = -1
  e("cn-powers-of-i:selfCheck:0", [f("1"), f("i"), f("-i")]),

  // ── cn-de-moivre-and-roots ──
  // De Moivre: cos nθ + i sin nθ
  e("cn-de-moivre-and-roots:practiceSet:0", [
    f("\\cos\\theta^n+i\\sin\\theta^n"),
    f("n(\\cos\\theta+i\\sin\\theta)"),
    f("\\cos n\\theta-i\\sin n\\theta"),
  ]),
  // distinct nth roots: n
  e("cn-de-moivre-and-roots:practiceSet:1", [f("2"), f("n-1"), f("2n")]),
  // nth roots spaced equally on a circle
  e("cn-de-moivre-and-roots:practiceSet:2", ["On a straight line", "All at the same point", "On two concentric circles"]),
  // (1+i)^4 = -4
  e("cn-de-moivre-and-roots:practiceSet:3", [f("4"), f("4i"), f("-4i")]),

  // ── cn-cube-roots-properties ──
  // ω³=1
  e("cn-cube-roots-properties:practiceSet:0", [f("\\omega"), f("0"), f("-1")]),
  // 1+ω+ω²=0
  e("cn-cube-roots-properties:practiceSet:1", [f("1"), f("3"), f("\\omega")]),
  // ω² = ω̄ (the conjugate)
  e("cn-cube-roots-properties:practiceSet:2", [f("-\\omega"), f("1"), f("0")]),
  // STEM FIXED: notes prompt 1+ω+ω⁴ was wrong (=1+2ω≠0); corrected to 1+ω⁴+ω⁸ = 0
  {
    atomKey: "cn-cube-roots-properties:practiceSet:3",
    stem: "\\(1+\\omega^4+\\omega^8=\\)? (\\(\\omega\\) a non-real cube root of unity)",
    distractors: [f("3"), f("1"), f("\\omega")],
    theme: "computation",
  },
  // (1+ω)(1+ω²) = 1
  e("cn-cube-roots-properties:selfCheck:0", [f("0"), f("-1"), f("\\omega")]),

  // ── cn-cube-roots-applications ──
  // roots of x²+x+1=0 : ω, ω²
  e("cn-cube-roots-applications:practiceSet:0", [f("-\\omega,-\\omega^2"), f("1,\\omega"), f("1,-1")]),
  // roots of x²-x+1=0 : -ω, -ω²
  e("cn-cube-roots-applications:practiceSet:1", [f("\\omega,\\omega^2"), f("1,-1"), f("\\omega,-\\omega")]),
  // first step on any ω^n : reduce n mod 3
  e("cn-cube-roots-applications:practiceSet:2", ["Reduce \\(n \\bmod 4\\)", "Reduce \\(n \\bmod 6\\)", "Expand using De Moivre"]),
  // three cube roots of k sum to 0
  e("cn-cube-roots-applications:practiceSet:3", [f("1"), f("k"), f("3k^{1/3}")]),
  // x²-x+1=0 ⇒ x⁶ = 1
  e("cn-cube-roots-applications:selfCheck:0", [f("-1"), f("\\omega"), f("0")]),
];
