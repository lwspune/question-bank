/**
 * NDA Maths · Binomial Theorem · COMMON-TRAPS theme — "spot the value/mistake" MCQs.
 * One per misconception callout authored into the notes (each concept's only trap
 * → index 0). The FIRST distractor in each is the warned mistake the trap names,
 * so the tempting wrong answer is exactly the error a student makes.
 *   npm run quiz:verify nda-maths__binomial-theorem-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  {
    // term number is r+1, not r → 4th term has r=3
    atomKey: "bt-theorem-general-term:trap:0",
    stem: "In the expansion of \\((a+b)^n\\), which value of \\(r\\) gives the 4th term \\(T_4\\)?",
    correct: f("r=3"),
    distractors: [f("r=4"), f("r=5"), f("r=2")],
    theme: "trap",
  },
  {
    // equal coefficients: a=b OR a+b=n; students stop at a=b
    atomKey: "bt-binomial-coefficients:trap:0",
    stem: "Solve \\(\\binom{15}{r} = \\binom{15}{r+3}\\) for \\(r\\).",
    correct: f("r=6"),
    distractors: [f("\\text{no solution}"), f("r=3"), f("r=9")],
    theme: "trap",
  },
  {
    // forgetting 1/x = x^{-r}: exponent is 4-2r, not 4-r
    atomKey: "bt-specific-term-coefficient:trap:0",
    stem: "What is the constant term in \\(\\left(x - \\dfrac{1}{x}\\right)^4\\)?",
    correct: f("6"),
    distractors: [f("1"), f("4"), f("-6")],
    theme: "trap",
  },
  {
    // odd n has TWO middle terms
    atomKey: "bt-middle-term:trap:0",
    stem: "How many middle terms does the expansion of \\((x+y)^7\\) have?",
    correct: f("2"),
    distractors: [f("1"), f("3"), f("4")],
    theme: "trap",
  },
  {
    // combine bases first: (x+1)^4(x-1)^4 = (x²-1)^4 → 5 terms, not 5+5
    atomKey: "bt-counting-terms-products:trap:0",
    stem: "How many terms are in the expansion of \\((x+1)^4(x-1)^4\\)?",
    correct: f("5"),
    distractors: [f("10"), f("9"), f("25")],
    theme: "trap",
  },
  {
    // rational terms need BOTH exponents integer; one condition over-counts
    atomKey: "bt-rational-and-general-index:trap:0",
    stem: "How many rational terms are in \\(\\left(\\sqrt{2} + \\sqrt[3]{3}\\right)^6\\)?",
    correct: f("2"),
    distractors: [f("4"), f("3"), f("7")],
    theme: "trap",
  },
  {
    // sum of coefficients uses x=1, not x=0 (which gives the constant)
    atomKey: "bt-sum-of-all-coefficients:trap:0",
    stem: "What is the sum of all coefficients in the expansion of \\((1+x)^5\\)?",
    correct: f("32"),
    distractors: [f("1"), f("31"), f("10")],
    theme: "trap",
  },
  {
    // differentiate FIRST: plain x=1 gives 2^n, not the weighted sum
    atomKey: "bt-weighted-sums-differentiation:trap:0",
    stem: "Evaluate \\(\\binom{3}{1} + 2\\binom{3}{2} + 3\\binom{3}{3}\\).",
    correct: f("12"),
    distractors: [f("8"), f("7"), f("6")],
    theme: "trap",
  },
  {
    // Pascal: same top, consecutive bottom → C(8,2)+C(8,3)=C(9,3)
    atomKey: "bt-coefficient-identities-pascal:trap:0",
    stem: "Simplify \\(\\binom{8}{2} + \\binom{8}{3}\\) to a single binomial coefficient's value.",
    correct: f("84"),
    distractors: [f("56"), f("36"), f("120")],
    theme: "trap",
  },
  {
    // add the conjugate: (√3+1)²+(√3-1)² = 8 (surds cancel)
    atomKey: "bt-conjugate-integer-trick:trap:0",
    stem: "Evaluate \\((\\sqrt{3}+1)^2 + (\\sqrt{3}-1)^2\\).",
    correct: f("8"),
    distractors: [f("4+2\\sqrt{3}"), f("4\\sqrt{3}"), f("16")],
    theme: "trap",
  },
  {
    // f' is exactly 1-f, not negligible: f+f' = 1
    atomKey: "bt-fractional-part:trap:0",
    stem: "For \\((\\sqrt{2}+1)^4 = I + f\\) (\\(0\\le f<1\\)) and \\(f' = (\\sqrt{2}-1)^4\\), what is \\(f + f'\\)?",
    correct: f("1"),
    distractors: [f("0"), f("2"), f("\\sqrt{2}")],
    theme: "trap",
  },
  {
    // pick base = multiple ± 1: 7 = 8-1, so 7^100 ≡ (-1)^100 = 1 (mod 8)
    atomKey: "bt-remainders-via-binomial:trap:0",
    stem: "What is the remainder when \\(7^{100}\\) is divided by 8?",
    correct: f("1"),
    distractors: [f("7"), f("-1"), f("0")],
    theme: "trap",
  },
  {
    // count power of 2 then divide by 2: E₂(10!)=8 ⇒ power of 4 = ⌊8/2⌋ = 4
    atomKey: "bt-legendre-power-in-factorial:trap:0",
    stem: "What is the highest power of 4 that divides \\(10!\\)?",
    correct: f("4"),
    distractors: [f("2"), f("8"), f("5")],
    theme: "trap",
  },
];
