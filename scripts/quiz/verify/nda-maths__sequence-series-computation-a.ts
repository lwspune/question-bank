/**
 * NDA Maths · Sequence & Series · subtopic seq-arithmetic-progressions
 * practiceSet + selfCheck MCQs (computation). Hand-authored distractors, theme=computation.
 *   npm run quiz:verify nda-maths__sequence-series-computation-a
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ap-clever-identities
  // p0: S_m=n, S_n=m => S_{m+n} = -(m+n)
  e("ap-clever-identities:practiceSet:0", [f("0"), f("m + n"), f("m - n")]),
  // p1 SKIPPED — garbled stem ("p a_p = q a_q pattern"), not self-contained. See ISSUES.
  // p2: S_4 = S_9 => sum of terms 5..9 = 0 => S_13 = 0 (since S_13 = S_4 + sum(5..13), and 13 = 4+9 => S_13=0)
  e("ap-clever-identities:practiceSet:2", [f("13"), f("26"), f("-13")]),
  // p3: a_5 = a_11 => common difference = 0
  e("ap-clever-identities:practiceSet:3", [f("1"), f("-1"), f("6")]),
  // sc0: S_9 = S_11 => S_20 = 0
  e("ap-clever-identities:selfCheck:0", [f("S_{20} = 20"), f("S_{20} = 11"), f("S_{20} = -20")]),

  // ap-means-symmetric-terms
  // p0: AM of 8 and 20 = 14
  e("ap-means-symmetric-terms:practiceSet:0", [f("28"), f("12"), f("16")]),
  // p1: a1+a9 = 30 => a4+a6 = 30 (equidistant pairs equal)
  e("ap-means-symmetric-terms:practiceSet:1", [f("15"), f("60"), f("25")]),
  // p2: three in AP sum 18 => middle = 6
  e("ap-means-symmetric-terms:practiceSet:2", [f("9"), f("3"), f("18")]),
  // p3: one AM between 7 and 17 = 12
  e("ap-means-symmetric-terms:practiceSet:3", [f("24"), f("10"), f("5")]),

  // ap-nth-term-and-sum
  // p0: a=2,d=3 => a10 = 2+9*3 = 29
  e("ap-nth-term-and-sum:practiceSet:0", [f("26"), f("32"), f("30")]),
  // p1: sum first 10 naturals = 55
  e("ap-nth-term-and-sum:practiceSet:1", [f("45"), f("50"), f("110")]),
  // p2: 5+10+...20 terms => 5*210 = 1050
  e("ap-nth-term-and-sum:practiceSet:2", [f("525"), f("2100"), f("1000")]),
  // p3: 7,11,...,79 => (79-7)/4+1 = 19
  e("ap-nth-term-and-sum:practiceSet:3", [f("18"), f("20"), f("72")]),
  // sc0: 3,7,11,...20 terms => 10*(6+19*4) = 10*82 = 820
  e("ap-nth-term-and-sum:selfCheck:0", [f("780"), f("1640"), f("410")]),

  // ap-nth-term-from-sum
  // p0: S_n=n^2 => a_n = S_n - S_{n-1} = 2n-1
  e("ap-nth-term-from-sum:practiceSet:0", [f("2n + 1"), f("2n"), f("4n - 1")]),
  // p1: S_n=3n^2 => a_n = 6n-3 => d = 6
  e("ap-nth-term-from-sum:practiceSet:1", [f("3"), f("12"), f("9")]),
  // p2: S_n=n(2n+1)=2n^2+n => a_n = 4n-1
  e("ap-nth-term-from-sum:practiceSet:2", [f("4n + 1"), f("2n - 1"), f("4n - 3")]),
  // p3 SKIPPED — stored `correct` is WRONG: S_n=5n-2n^2 => a_n=7-4n => a_3 = -5, not -7. See ISSUES.
  // sc0: S_n=n(n+1)=n^2+n => a_n=2n => a_4 = 8
  e("ap-nth-term-from-sum:selfCheck:0", [f("a_4 = 20"), f("a_4 = 6"), f("a_4 = 16")]),

  // ap-properties-condition
  // p0: 5,9,13 in AP? Yes
  e("ap-properties-condition:practiceSet:0", ["No", "Only the first two", "Cannot be determined"]),
  // p1: x,8,14 in AP => 8 = (x+14)/2 => x = 2
  e("ap-properties-condition:practiceSet:1", [f("4"), f("-2"), f("6")]),
  // p2: a,b,c in AP => 3a,3b,3c in AP? Yes
  e("ap-properties-condition:practiceSet:2", ["No", "Only if a,b,c > 0", "Cannot be determined"]),
  // p3: 2,x,18 in AP => x = 10
  e("ap-properties-condition:practiceSet:3", [f("20"), f("9"), f("8")]),

  // ap-special-sums-sign
  // p0: 1-2+3-4+...+9-10 = -5 (five pairs of -1)
  e("ap-special-sums-sign:practiceSet:0", [f("5"), f("-55"), f("0")]),
  // p1: two-digit multiples of 3: 12..99 => (99-12)/3+1 = 30
  e("ap-special-sums-sign:practiceSet:1", [f("33"), f("29"), f("60")]),
  // p2: 20,17,14,... a=20,d=-3, a_n<0 => 23-3n<0 => n>7.67 => 8th
  e("ap-special-sums-sign:practiceSet:2", ["7th", "9th", "6th"]),
  // p3: 2-4+6-...+18-20 = -10 (five pairs of -2)
  e("ap-special-sums-sign:practiceSet:3", [f("10"), f("-110"), f("0")]),
  // sc0: 27,24,21,... a=27,d=-3 => 30-3n<0 => n>10 => 11th
  e("ap-special-sums-sign:selfCheck:0", ["The 10th term.", "The 12th term.", "The 9th term."]),

  // ap-sum-ratios
  // p0: sum-ratio (2n):(3n) => term ratio 2:3 (constant)
  e("ap-sum-ratios:practiceSet:0", [f("2 : 5"), f("4 : 9"), f("1 : 1")]),
  // p1: to get k-th term ratio replace n with 2k-1 => 5th => 9
  e("ap-sum-ratios:practiceSet:1", [f("5"), f("10"), f("11")]),
  // p2: sum-ratio (n+1):(2n+3), 1st-term ratio => n=1 => 2:5
  e("ap-sum-ratios:practiceSet:2", [f("2 : 3"), f("1 : 2"), f("3 : 5")]),
  // p3: S_p:S_q = p^2:q^2 => d = 2a
  e("ap-sum-ratios:practiceSet:3", [f("a"), f("3a"), f("\\tfrac{a}{2}")]),
  // sc0: (7n+1):(4n+27), 11th term => n=21 => 148:111 = 4:3
  e("ap-sum-ratios:selfCheck:0", [f("7 : 4"), f("11 : 4"), f("3 : 4")]),

  // common-terms-of-two-aps
  // p0: d1=2,d2=3 => common-term spacing = lcm = 6
  e("common-terms-of-two-aps:practiceSet:0", [f("5"), f("1"), f("12")]),
  // p1: common terms of two APs form an AP? Yes
  e("common-terms-of-two-aps:practiceSet:1", ["No", "Only if d1 = d2", "Cannot be determined"]),
  // p2: d1=4,d2=6 => lcm = 12
  e("common-terms-of-two-aps:practiceSet:2", [f("10"), f("2"), f("24")]),

  // foundations-sequence-series
  // p0: a_n=2n+1 => a_5 = 11
  e("foundations-sequence-series:practiceSet:0", [f("10"), f("13"), f("9")]),
  // p1: a_n=n^2 => 1,4,9
  e("foundations-sequence-series:practiceSet:1", [f("1, 2, 3"), f("2, 4, 6"), f("1, 3, 5")]),
  // p2: a_3 = S_3 - S_2 = 12-7 = 5
  e("foundations-sequence-series:practiceSet:2", [f("19"), f("12"), f("7")]),
  // p3: 2+4+6+... to n terms => sum_{k=1}^n 2k
  e("foundations-sequence-series:practiceSet:3", [f("\\sum_{k=1}^{n} k"), f("\\sum_{k=1}^{n} (2k-1)"), f("\\sum_{k=1}^{n} 2^k")]),
];
