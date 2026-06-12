/**
 * NDA Maths · Binomial Theorem · practiceSet MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the notes; all keys verified correct (no notes errors found).
 *
 * The chapter shipped with only 2 practiceSet atoms (general-term), so the
 * computation theme was below the 12-atom floor. Topped up with 11 genuine
 * practiceSet items authored into the notes _data (specific-coefficient ×2,
 * middle-term ×2, term-independent-of-x ×1, counting-terms ×1, general-term ×1,
 * sum-of-coefficients ×2, weighted-sums ×1) → 13 computation atoms.
 *
 * Distractors target real binomial mistakes: T_{r+1} vs T_r off-by-one,
 * \binom{n}{r}a^{n-r}b^r power swap, middle-term index, coefficient-vs-term
 * value, sum-of-coefficients via x=1 (2^n).
 *   npm run quiz:verify nda-maths__binomial-theorem-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bt-theorem-general-term ──
  // terms in (1+x)^15 = 16 (n+1)
  e("bt-theorem-general-term:practiceSet:0", ["15", "17", "14"]),
  // T_{r+1} for (x+2)^10 = C(10,r) x^{10-r} 2^r
  e("bt-theorem-general-term:practiceSet:1", [
    f("\\binom{10}{r} x^{r} 2^{10-r}"),
    f("\\binom{10}{r} x^{10-r} 2^{10-r}"),
    f("\\binom{10}{r-1} x^{10-r} 2^{r}"),
  ]),
  // terms in (x+y)^20 = 21 (n+1)
  e("bt-theorem-general-term:practiceSet:2", ["20", "22", "40"]),

  // ── bt-specific-term-coefficient ──
  // coeff of x^3 in (1+x)^6 = C(6,3) = 20
  e("bt-specific-term-coefficient:practiceSet:0", ["15", "6", "120"]),
  // coeff of x^2 in (1+2x)^5 = C(5,2)·2^2 = 40
  e("bt-specific-term-coefficient:practiceSet:1", ["10", "20", "80"]),

  // ── bt-middle-term ──
  // middle term of (a+b)^10 is T_6
  e("bt-middle-term:practiceSet:0", [
    "\\(T_5\\) (the 5th term)",
    "\\(T_{11}\\) (the 11th term)",
    "\\(T_4\\) (the 4th term)",
  ]),
  // (a+b)^9 has two middle terms
  e("bt-middle-term:practiceSet:1", ["1", "3", "0"]),

  // ── bt-term-independent-of-x ──
  // term independent of x in (x + 1/x)^6 = C(6,3) = 20
  e("bt-term-independent-of-x:practiceSet:0", ["15", "1", "64"]),
  // term independent of x in (x^2 + 1/x)^6 = C(6,4) = 15
  e("bt-term-independent-of-x:practiceSet:1", ["20", "6", "1"]),

  // ── bt-counting-terms-products ──
  // distinct terms in (a+b+c)^5 = C(7,2) = 21
  e("bt-counting-terms-products:practiceSet:0", ["6", "15", "10"]),

  // ── bt-sum-of-all-coefficients ──
  // sum of coefficients in (1+x)^8 = 2^8 = 256
  e("bt-sum-of-all-coefficients:practiceSet:0", ["128", "512", "16"]),
  // sum of coefficients in (2x-1)^3 = f(1) = 1
  e("bt-sum-of-all-coefficients:practiceSet:1", ["-1", "27", "8"]),

  // ── bt-weighted-sums-differentiation ──
  // C1 + 2C2 + 3C3 + 4C4 for n=4 = n·2^{n-1} = 32
  e("bt-weighted-sums-differentiation:practiceSet:0", ["16", "64", "24"]),
];
