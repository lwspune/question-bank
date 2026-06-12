/**
 * NDA Maths · Permutation & Combination · practiceSet + selfCheck MCQs
 * (theme=computation). Hand-authored WRONG distractors (re-derived correct values
 * verified against the notes _data — all keys correct, no notes errors).
 *
 * Distractors model real P&C mistakes: nPr↔nCr swap, off-by-a-factorial,
 * over/under-counting, circular-vs-linear, with/without repetition, leading-zero
 * mishandling, forgetting the collinear correction.
 *   npm run quiz:verify nda-maths__permutation-combination-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
// Stem-rewrite variant for atoms whose harvested prompt isn't self-contained.
const r = (atomKey: string, stem: string, distractors: string[]): VerifiedEntry => ({ atomKey, stem, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── pc-fundamental-counting (correct: Multiply / Add / n!/(n-r)! / nPr=nCr·r! / 30) ──
  r("pc-fundamental-counting:practiceSet:0",
    "Two independent tasks are joined by 'and' (do the first, then the second). The total number of ways is found by which operation?",
    ["Adding the two counts", "Subtracting the two counts", "Taking the factorial of the sum"]),
  r("pc-fundamental-counting:practiceSet:1",
    "Two mutually-exclusive alternatives are joined by 'or' (do exactly one of them). The total number of ways is found by which operation?",
    ["Multiplying the two counts", "Subtracting the two counts", "Taking the larger of the two counts"]),
  r("pc-fundamental-counting:practiceSet:2",
    "What is the number of permutations of \\(r\\) objects taken from \\(n\\) distinct objects, \\(^nP_r\\)?",
    [f("\\dfrac{n!}{r!(n-r)!}"), f("\\dfrac{n!}{r!}"), f("n!\\,(n-r)!")]),
  r("pc-fundamental-counting:practiceSet:3",
    "Which relation correctly links \\(^nP_r\\) and \\(^nC_r\\)?",
    [f("^nP_r = \\dfrac{^nC_r}{r!}"), f("^nC_r = \\,^nP_r\\cdot r!"), f("^nP_r = \\,^nC_r + r!")]),
  r("pc-fundamental-counting:selfCheck:0",
    "In how many ways can a chairperson and then a secretary (two distinct roles) be picked from 6 people?",
    [f("15"), f("36"), f("720")]), // correct 6P2=30; 15=6C2, 36=6², 720=6!

  // ── pc-factorial-properties (correct: 5 / 6 / 0 / Yes / [selfCheck]1) ──
  r("pc-factorial-properties:practiceSet:0",
    "The number of trailing zeros of \\(n!\\) is counted by the number of factors of which prime?",
    [f("2"), f("3"), f("10")]),
  r("pc-factorial-properties:practiceSet:1",
    "How many trailing zeros does \\(25!\\) have?",
    [f("5"), f("4"), f("7")]), // correct 6; 5 forgets ⌊25/25⌋, 4 / 7 off
  r("pc-factorial-properties:practiceSet:2",
    "For \\(n\\ge 4\\), what is \\(n!\\bmod 8\\)?",
    [f("1"), f("4"), f("2")]), // correct 0
  e("pc-factorial-properties:practiceSet:3",
    ["No", "Only the prime integers \\(\\le n\\)", "Only the even integers \\(\\le n\\)"]), // "Is n! divisible by every integer ≤ n?" → Yes
  r("pc-factorial-properties:selfCheck:0",
    "Find the remainder when \\(1!+2!+3!+\\cdots+50!\\) is divided by \\(8\\).",
    [f("0"), f("9"), f("6")]), // correct 1 (=1+2+6=9≡1); 9 forgets to reduce, 6 drops a term

  // ── pc-binomial-coefficient-identities (correct: Symmetry / ⁿ⁺¹Cᵣ / 20 / r!=P/C / [selfCheck]5) ──
  r("pc-binomial-coefficient-identities:practiceSet:0",
    "The identity \\(^nC_r = \\,^nC_{n-r}\\) expresses which property of binomial coefficients?",
    ["Pascal's rule", "The permutation–combination link", "The addition rule"]),
  r("pc-binomial-coefficient-identities:practiceSet:1",
    "Pascal's rule states that \\(^nC_r + \\,^nC_{r-1} = \\)?",
    [f("^{n+1}C_{r-1}"), f("^nC_{r+1}"), f("^{n-1}C_r")]),
  r("pc-binomial-coefficient-identities:practiceSet:2",
    "If \\(^nC_8 = \\,^nC_{12}\\), find \\(n\\).",
    [f("4"), f("96"), f("20!/(8!\\,12!)")]), // correct 20 (8+12); 4=|12-8|, 96=8·12
  r("pc-binomial-coefficient-identities:practiceSet:3",
    "Given \\(^nP_r\\) and \\(^nC_r\\), how do you recover \\(r!\\)?",
    [f("r! = \\,^nC_r / \\,^nP_r"), f("r! = \\,^nP_r\\cdot{}^nC_r"), f("r! = \\,^nP_r - \\,^nC_r")]),
  r("pc-binomial-coefficient-identities:selfCheck:0",
    "If \\(P(n,r)=2520\\) and \\(C(n,r)=21\\), find \\(r\\).",
    [f("r=6"), f("r=120"), f("r=4")]), // correct r=5 (r!=2520/21=120 → r=5); 120 stops at r!

  // ── pc-permutations-basics (correct: n! / 11!/(2!2!2!) / over-counted / 30 / [selfCheck]120) ──
  r("pc-permutations-basics:practiceSet:0",
    "How many arrangements (in a row) are there of \\(n\\) distinct objects?",
    [f("2^n"), f("n^n"), f("\\dfrac{n!}{2}")]), // correct n!
  r("pc-permutations-basics:practiceSet:1",
    "How many distinct arrangements are there of the letters of the word MATHEMATICS?",
    [f("11!"), f("\\dfrac{11!}{3!}"), f("\\dfrac{11!}{2!}")]), // correct 11!/(2!2!2!) — M,A,T each twice
  r("pc-permutations-basics:practiceSet:3",
    "How many distinct arrangements are there of the letters of the word LEVEL?",
    [f("120"), f("60"), f("20")]), // correct 30 = 5!/(2!2!); 120 ignores repeats, 60 divides by one 2!
  r("pc-permutations-basics:selfCheck:0",
    "How many distinct words can be formed from the letters of DELHI?",
    [f("60"), f("24"), f("25")]), // correct 120 = 5!; 24=4!, 25=5²

  // ── pc-restricted-arrangements (correct selfCheck: 12) ──
  r("pc-restricted-arrangements:selfCheck:0",
    "How many arrangements of the letters of TIGER have both vowels in the two even positions?",
    [f("6"), f("24"), f("48")]), // correct 2!·3!=12; 6=3!, 24, 48

  // ── pc-combinations-basics (correct: ⁿCᵣ / 2ⁿ / 56 / ⁿ⁻ᵏCᵣ₋ₖ / [selfCheck]56) ──
  r("pc-combinations-basics:practiceSet:0",
    "How many ways are there to choose \\(r\\) objects from \\(n\\) when order is irrelevant?",
    [f("^nP_r"), f("\\dfrac{n!}{(n-r)!}"), f("r!\\,^nC_r")]), // correct ⁿCᵣ; distractors are permutation forms
  r("pc-combinations-basics:practiceSet:1",
    "How many subsets does a set of \\(n\\) elements have?",
    [f("n^2"), f("n!"), f("2^n - 1")]), // correct 2ⁿ; 2ⁿ-1 forgets the empty set
  r("pc-combinations-basics:practiceSet:2",
    "Evaluate \\(^8C_3\\).",
    [f("336"), f("24"), f("21")]), // correct 56; 336=8P3, 24, 21=8C2
  r("pc-combinations-basics:practiceSet:3",
    "From \\(n\\) people, \\(k\\) are compulsory; how many ways to choose a group of \\(r\\)?",
    [f("^nC_r - \\,^kC_r"), f("^nC_{r-k}"), f("^{n-k}C_r")]), // correct ⁿ⁻ᵏCᵣ₋ₖ
  r("pc-combinations-basics:selfCheck:0",
    "A team of 5 is chosen from 10 players, 2 of whom must be included. How many teams are possible?",
    [f("252"), f("120"), f("28")]), // correct 56 = ⁸C₃; 252=10C5, 120=10C3, 28=8C2

  // ── pc-selection-constraints (correct: Total−none / ΣⁿC₀..ⁿCₖ / 246 / cases / [selfCheck]16) ──
  r("pc-selection-constraints:practiceSet:1",
    "The number of ways to choose 'at most \\(k\\)' objects from \\(n\\) distinct objects equals?",
    [f("^nC_k"), f("^nC_0\\cdot{}^nC_1\\cdots{}^nC_k"), f("2^n - \\,^nC_k")]), // correct sum ⁿC₀+…+ⁿCₖ
  r("pc-selection-constraints:practiceSet:2",
    "Choose 5 workers from 6 programmers and 4 typists with at least one typist. (Total \\(^{10}C_5=252\\); all-programmer \\(^6C_5=6\\).) How many ways?",
    [f("258"), f("246!"), f("6")]), // correct 252-6=246; 258 adds, 6 = the complement
  r("pc-selection-constraints:selfCheck:0",
    "How many selections of at most 2 items are possible from 5 distinct items?",
    [f("10"), f("15"), f("31")]), // correct 16 = 1+5+10; 10=C(5,2), 15=5+10, 31=2^5-1

  // ── pc-forming-numbers (correct: leading digit / 24 / total minus leading-0 / multiplied / [selfCheck]18) ──
  r("pc-forming-numbers:practiceSet:1",
    "How many 3-digit numbers with all distinct digits can be formed from \\(\\{1,2,3,4\\}\\)?",
    [f("12"), f("64"), f("4")]), // correct 4P3=24; 12=4·3, 64=4³, 4
  r("pc-forming-numbers:selfCheck:0",
    "How many numbers greater than 1000 can be formed using the digits \\(0,1,2,3\\) without repetition?",
    [f("24"), f("6"), f("12")]), // correct 18 = 24-6; 24 ignores leading 0, 6 = leading-0 count

  // ── pc-number-divisibility (correct: last two digits / digit sum / 0 / always sum 15 / [selfCheck]0) ──
  r("pc-number-divisibility:practiceSet:2",
    "A number is divisible by 10 exactly when its units digit is?",
    [f("5"), f("\\text{even}"), f("0 \\text{ or } 5")]), // correct 0
  // correct is the phrase "Always (sum 15)" — override `correct` to keep the stem self-contained and grammatical.
  { atomKey: "pc-number-divisibility:practiceSet:3", theme: "computation",
    stem: "A 5-digit number is formed using all of \\(1,2,3,4,5\\) (each once). Is it divisible by 3?",
    correct: "Always — the digit sum is \\(15\\)",
    distractors: ["Never", "Only when it ends in 3", "Only half the time"] },
  r("pc-number-divisibility:selfCheck:0",
    "How many 5-digit primes can be formed using all of \\(1,2,3,4,5\\) (each once)?",
    [f("120"), f("119"), f("1")]), // correct 0 (digit sum 15 ⇒ all divisible by 3); 120=5!

  // ── pc-sum-of-numbers (correct: (n-1)! / 111 / 2664 / formula factors / [selfCheck]2) ──
  r("pc-sum-of-numbers:practiceSet:0",
    "When all \\(n\\)-digit numbers are formed from \\(n\\) distinct non-zero digits (no repetition), each digit appears in each place how many times?",
    [f("n!"), f("(n-1)"), f("n\\cdot(n-1)!")]), // correct (n-1)!
  r("pc-sum-of-numbers:practiceSet:1",
    "In the sum-of-all-numbers formula, the place-value repunit for 3-digit numbers is which integer?",
    [f("100"), f("123"), f("1000")]), // correct 111
  r("pc-sum-of-numbers:practiceSet:2",
    "Find the sum of all 3-digit numbers formed using the digits \\(3,4,5\\) without repetition.",
    [f("1332"), f("3996"), f("2640")]), // correct 2·12·111=2664; 1332=12·111, 3996=3·12·111
  r("pc-sum-of-numbers:selfCheck:0",
    "Across all 3-digit numbers formed from \\(\\{1,2,3\\}\\) without repetition, how many times does each digit appear in the units place?",
    [f("3 \\text{ times}"), f("6 \\text{ times}"), f("1 \\text{ time}")]), // correct 2 = (3-1)!

  // ── pc-points-and-polygons (correct: ⁿC₃ / subtract ᵏC₃ / n(n-3)/2 / ᵐC₂·ⁿC₂ / [selfCheck]185) ──
  r("pc-points-and-polygons:practiceSet:0",
    "How many triangles can be formed from \\(n\\) points, no three of which are collinear?",
    [f("^nC_2"), f("^nP_3"), f("\\dfrac{n(n-3)}{2}")]), // correct ⁿC₃
  r("pc-points-and-polygons:practiceSet:1",
    "If \\(k\\) of the points are collinear, the triangle count \\(^nC_3\\) must be corrected by?",
    ["Subtracting \\(^kC_2\\)", "Adding \\(^kC_3\\)", "Subtracting \\(k\\)"]), // correct "Subtract \(^kC_3\)"
  r("pc-points-and-polygons:practiceSet:2",
    "How many diagonals does a convex \\(n\\)-gon have?",
    [f("\\dfrac{n(n-1)}{2}"), f("^nC_3"), f("n-3")]), // correct n(n-3)/2 = ⁿC₂-n; n(n-1)/2 = ⁿC₂ (all chords)
  r("pc-points-and-polygons:practiceSet:3",
    "Given \\(m\\) parallel lines crossed by \\(n\\) parallel lines, how many parallelograms are formed?",
    [f("^mC_2 + \\,^nC_2"), f("m\\cdot n"), f("^{mn}C_4")]), // correct ᵐC₂·ⁿC₂
  r("pc-points-and-polygons:selfCheck:0",
    "How many triangles can be formed from 12 points, of which 7 are collinear?",
    [f("220"), f("185!"), f("35")]), // correct ¹²C₃-⁷C₃=220-35=185; 220 forgets correction, 35 = ⁷C₃
];
