/**
 * NDA Maths · Sequence & Series · GP + Harmonic Means · practiceSet + selfCheck MCQs (computation).
 * Subtopics: seq-geometric-progressions, seq-harmonic-means.
 * Hand-authored distractors, theme=computation. Each correct answer re-derived; distractors
 * are plausible GP/HP mistakes (off-by-one nth term, AM/GM/HM swaps, ratio inversion,
 * rejected continued-fraction roots, finite-vs-infinite-sum confusion) — not random numbers.
 *   npm run quiz:verify nda-maths__sequence-series-computation-b
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ─── seq-geometric-progressions ───

  // gp-nth-term-and-mean
  e("gp-nth-term-and-mean:practiceSet:0", [f("9"), f("54"), f("81")]),         // 1,3,9 (r=3): 4th=27; 9=3rd, 54=double, 81=5th
  e("gp-nth-term-and-mean:practiceSet:1", [f("6.5"), f("13"), f("18")]),        // GM√36=6; 6.5=AM, 13=4+9, 18=½·36
  e("gp-nth-term-and-mean:practiceSet:2", [f("5"), f("6"), f("16")]),           // 2,x,8: x²=16→x=4; 5=AM, 6, 16=x²
  e("gp-nth-term-and-mean:practiceSet:3", [f("3"), f("\\tfrac{1}{9}"), f("-\\tfrac{1}{3}")]), // 81,27,9: r=1/3; 3=inverted, 1/9, -1/3
  e("gp-nth-term-and-mean:selfCheck:0", [f("-162"), f("-54"), f("54")]),        // 2,-6,18 (r=-3): 5th=162; -162 sign, -54=4th, 54

  // gp-product-symmetry
  e("gp-product-symmetry:practiceSet:0", [f("10"), f("16"), f("64")]),          // 5 terms, mid=2: 2⁵=32; 10=2·5, 16=2⁴, 64=2⁶
  e("gp-product-symmetry:practiceSet:1", [f("15"), f("25"), f("75")]),          // 3 terms, mid=5: 5³=125; 15=5·3, 25=5², 75
  e("gp-product-symmetry:practiceSet:2", ["increasing", "zero", "their sum"]),  // correct: "constant"
  e("gp-product-symmetry:practiceSet:3", [f("21"), f("729"), f("6561")]),       // 7 terms, mid=3: 3⁷=2187; 21=3·7, 729=3⁶, 6561=3⁸
  e("gp-product-symmetry:selfCheck:0", [f("20"), f("256"), f("64")]),           // 5 terms, mid=4: 4⁵=1024; 20=4·5, 256=4⁴, 64=4³

  // gp-properties
  e("gp-properties:practiceSet:0", ["No", "Only if the ratio is positive", "Only when \\(a>0\\)"]),       // 5a,5b,5c stays GP: Yes
  e("gp-properties:practiceSet:1", ["No", "No — it becomes an AP", "Only if the ratio is \\(1\\)"]),       // squares stay GP (r²): Yes
  e("gp-properties:practiceSet:2", ["Yes", "Yes, with the same ratio", "It becomes an AP"]),               // adding 1: No
  e("gp-properties:practiceSet:3", ["an AP", "an HP", "neither"]),                                          // reciprocals of GP: GP

  // gp-sum-finite
  e("gp-sum-finite:practiceSet:0", [f("15"), f("32"), f("30")]),                // 1+2+4+8+16=31; 15=first4, 32=2⁵, 30
  e("gp-sum-finite:practiceSet:1", [f("30"), f("36"), f("81")]),                // 3+9+27=39; 30, 36, 81=next term
  e("gp-sum-finite:practiceSet:2", [f("\\tfrac{3}{2}"), f("\\tfrac{13}{9}"), f("\\tfrac{27}{40}")]), // sum4=40/27; 3/2=S∞, 13/9=sum3, 27/40 inv
  e("gp-sum-finite:practiceSet:3", [f("5"), f("5^n"), f("0")]),                 // r=1: Sₙ=5n; 5=a, 5ⁿ, 0
  e("gp-sum-finite:selfCheck:0", [f("2"), f("\\tfrac{15}{8}"), f("\\tfrac{16}{31}")]), // sum5=31/16; 2=S∞, 15/8=sum4, inverted

  // gp-sum-infinite
  e("gp-sum-infinite:practiceSet:0", [f("1"), f("\\tfrac{1}{2}"), f("\\infty")]),     // S∞=2; 1=a, 1/2=r, ∞
  e("gp-sum-infinite:practiceSet:1", [f("13"), f("9"), f("18")]),                     // 9+3+1+..=27/2; 13=sum3, 9=a, 18
  e("gp-sum-infinite:practiceSet:2", ["Yes", "Yes, the sum is \\(-1\\)", "Yes, it converges to \\(\\infty\\)"]), // 1+2+4+..: No
  e("gp-sum-infinite:practiceSet:3", [f("2"), f("\\tfrac{1}{5}"), f("-\\tfrac12")]),  // a=5,S∞=10→r=1/2; 2, 1/5, -1/2
  e("gp-sum-infinite:selfCheck:0", [f("\\tfrac{3}{2}"), f("\\tfrac{4}{3}"), f("-\\tfrac34")]), // alt GP r=-1/3: 3/4; 3/2=|r|, 4/3, -3/4

  // self-referential-continued-fractions
  e("self-referential-continued-fractions:practiceSet:0", [f("x^2 + 2x - 1 = 0"), f("x^2 - 2x + 1 = 0"), f("x^2 - x - 2 = 0")]), // x=2+1/x → x²-2x-1=0
  e("self-referential-continued-fractions:practiceSet:2", [f("-1"), f("1"), f("4")]),  // x=√(2+x)→x²-x-2=0→x=2; -1=rejected root, 1, 4
  e("self-referential-continued-fractions:selfCheck:0", [f("-2"), f("6"), f("2")]),    // x=√(6+x)→x²-x-6=0→x=3; -2=rejected, 6, 2

  // ─── seq-harmonic-means ───

  // harmonic-mean-computation
  e("harmonic-mean-computation:practiceSet:0", [f("\\tfrac{1}{2}"), f("2"), f("0")]),          // HM(1,1)=1
  e("harmonic-mean-computation:practiceSet:1", [f("3"), f("2\\sqrt2"), f("6")]),               // HM(2,4)=8/3; 3=AM, 2√2=GM, 6
  e("harmonic-mean-computation:practiceSet:2", ["the numbers themselves", "the squares", "the geometric means"]), // 1/HM = AM of reciprocals
  e("harmonic-mean-computation:practiceSet:3", [f("9"), f("1"), f("\\tfrac{1}{3}")]),          // HM(3,3,3)=3; 9, 1, 1/3
  e("harmonic-mean-computation:selfCheck:0", [f("\\tfrac{7}{3}"), f("\\tfrac{7}{12}"), f("2")]), // HM(1,2,4)=12/7; 7/3=AM, 7/12 inv, 2

  // hp-definition
  e("hp-definition:practiceSet:0", ["a GP", "another HP", "a constant sequence"]),             // reciprocals of HP: AP
  e("hp-definition:practiceSet:1", ["No", "No, it is a GP", "Only if the terms are positive"]), // 1/3,1/5,1/7 (recip 3,5,7 AP): Yes
  e("hp-definition:practiceSet:2", [f("b = \\tfrac{a+c}{2}"), f("b^2 = ac"), f("b = \\tfrac{a+c}{2ac}")]), // HM cond b=2ac/(a+c); AM, GM, reciprocal-flip
  e("hp-definition:practiceSet:3", ["True", "True, \\(S_n = \\tfrac{n}{a+l}\\)", "True, but only for a finite HP"]), // no closed sum: False
  e("hp-definition:selfCheck:0", ["No, they are not in HP", "Yes, in HP; next term \\(1\\)", "Yes, in HP; next term \\(\\tfrac43\\)"]), // 6,3,2 HP, next=3/2

  // three-means-am-gm-hm
  e("three-means-am-gm-hm:practiceSet:0", [f("\\sqrt{21}"), f("\\tfrac{21}{5}"), f("10")]),    // AM(3,7)=5; √21=GM, 21/5=HM, 10
  e("three-means-am-gm-hm:practiceSet:1", [f("5"), f("\\tfrac{16}{5}"), f("8")]),              // GM(2,8)=4; 5=AM, 16/5=HM, 8
  e("three-means-am-gm-hm:practiceSet:2", [f("\\tfrac{9}{2}"), f("3\\sqrt2"), f("9")]),        // HM(3,6)=4; 9/2=AM, 3√2=GM, 9
  e("three-means-am-gm-hm:selfCheck:0", [f("\\tfrac{45}{2}"), f("20"), f("45")]),              // AM=25,GM=20→HM=GM²/AM=16; 45/2=AM-of, 20=GM, 45
];
