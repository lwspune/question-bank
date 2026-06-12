/**
 * NDA Maths · Binomial Distribution · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived
 * (all 10 confirmed correct against the notes — no notes errors found).
 * Distractors are real binomial-distribution mistakes: p↔q swap, np vs npq,
 * forgetting ⁿCₖ, variance vs SD, "at least one" = 1−qⁿ vs qⁿ.
 *   npm run quiz:verify nda-maths__binomial-distribution-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bernoulli-trial ──
  // p=1/4 ⇒ q=3/4
  e("bernoulli-trial:practiceSet:0", [f("q = \\tfrac{1}{4}"), f("q = \\tfrac{4}{3}"), f("q = \\tfrac{1}{2}")]),
  // die, success='6' ⇒ p=1/6, q=5/6
  e("bernoulli-trial:practiceSet:1", [
    f("p = \\tfrac{5}{6},\\ q = \\tfrac{1}{6}"),
    f("p = \\tfrac{1}{6},\\ q = \\tfrac{1}{6}"),
    f("p = \\tfrac{1}{2},\\ q = \\tfrac{1}{2}"),
  ]),

  // ── binomial-probability-formula ──
  // 3 heads in 4 tosses: C(4,3)(½)⁴ = 4/16 = 1/4
  e("binomial-probability-formula:practiceSet:0", [
    f("\\tfrac{1}{16}"), // forgot the C(4,3)=4 ordering count
    f("\\tfrac{1}{8}"),
    f("\\tfrac{3}{4}"),
  ]),
  // die 3 times, all six: (1/6)³ = 1/216
  e("binomial-probability-formula:practiceSet:1", [
    f("\\tfrac{3}{216}"), // multiplied by 3 instead of C(3,3)=1
    f("\\tfrac{1}{18}"),
    f("\\tfrac{1}{6}"),
  ]),
  // seed p=0.8, n=5, exactly 2 germinate: C(5,2)(0.8)²(0.2)³ = 0.0512
  e("binomial-probability-formula:selfCheck:0", [
    f("0.2048"), // p↔q swap: C(5,2)(0.2)²(0.8)³ = 10·0.04·0.512
    f("0.00512"), // dropped the C(5,2)=10 ordering count
    f("0.64"),
  ]),

  // ── tail-probabilities ──
  // p=1/5, n=7, at least 2 hits: 1 − (11·4⁶)/5⁷
  e("tail-probabilities:selfCheck:0", [
    f("\\dfrac{11\\cdot 4^6}{5^7}"), // forgot to subtract from 1 (gave P(0)+P(1))
    f("1 - \\dfrac{4^7}{5^7}"), // only complemented P(0): this is P(X≥1), not P(X≥2)
    f("\\dfrac{4^7}{5^7}"),
  ]),

  // ── recovering-n-and-p ──
  // mean 200, var 160: q=4/5, p=1/5, n=200/p=1000
  e("recovering-n-and-p:practiceSet:0", [
    f("n = 250"), // used q (=4/5) as p: 200/(4/5)
    f("n = 160"),
    f("n = 40"),
  ]),
  // mean 6, SD √2 ⇒ var 2: q=1/3, p=2/3, n=6/p=9
  e("recovering-n-and-p:practiceSet:1", [
    f("n = 18,\\ p = \\tfrac13"), // used q (=1/3) as p: 6/(1/3)=18
    f("n = 6,\\ p = 1"), // forgot to square the SD (took variance=6=mean ⇒ q=1,p=0... wrong path)
    f("n = 9,\\ p = \\tfrac13"),
  ]),
  // mean 2/3, var 5/9: q=5/6, p=1/6, n=4; P(X=2)=C(4,2)(1/6)²(5/6)²=6·(25/1296)=25/216
  e("recovering-n-and-p:selfCheck:0", [
    f("\\dfrac{25}{1296}"), // dropped the C(4,2)=6 ordering count
    f("\\dfrac{1}{36}"), // mistook q for p so used p=5/6 with the OTHER root, or just lost the 25; a plausible slip
    f("\\dfrac{25}{144}"), // used n=3 (mis-solved n=mean/p) ⇒ wrong binomial coefficient/powers
  ]),

  // ── parameter-from-probability-equation ──
  // B(4,p), P(X=1)=P(X=2): 4pq³=6p²q² ⇒ 4q=6p ⇒ 2(1−p)=3p ⇒ p=2/5
  e("parameter-from-probability-equation:selfCheck:0", [
    f("p = \\tfrac35"), // solved for q instead of p
    f("p = \\tfrac12"), // assumed symmetry (the B(5,p) case, not B(4,p))
    f("p = \\tfrac23"),
  ]),
];
