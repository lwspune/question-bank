/**
 * NDA Maths · Binary Numbers · practiceSet + selfCheck MCQs (computation).
 * Hand-authored distractors, theme=computation. Every `correct` re-derived from
 * the notes _data — all 39 checked CORRECT, no notes errors found.
 * Distractors are binary-flavoured mistakes: off-by-one place value, read-the-
 * remainders-the-wrong-way (reversed bits), carry/borrow slips, LSB/MSB swap,
 * decimal-vs-binary confusion, and quotient/remainder mix-ups.
 *   npm run quiz:verify nda-maths__binary-numbers-computation
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "computation" });
const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bin-place-value-foundation ──
  // leftmost bit of (100000)₂ = 2⁵ = 32
  e("bin-place-value-foundation:practiceSet:0", [f("2^6 = 64"), f("2^4 = 16"), f("2^5 = 31")]),
  // (1101)₂ → three 1s, LSB is the rightmost (2⁰=1)
  e("bin-place-value-foundation:practiceSet:1", [
    "Three 1s; the least significant bit is the leftmost (value \\(2^3 = 8\\)).",
    "Two 1s; the least significant bit is the rightmost (value \\(2^0 = 1\\)).",
    "Four 1s; the least significant bit is the rightmost (value \\(2^0 = 1\\)).",
  ]),
  // (1111)₂ = 2⁴-1 = 15
  e("bin-place-value-foundation:practiceSet:2", [f("16"), f("14"), f("31")]),
  // (1021)₂ invalid — contains a 2
  e("bin-place-value-foundation:practiceSet:3", [
    "Yes — every digit is below 10, so it is a valid binary number.",
    "Yes — it converts to \\(13_{10}\\).",
    "No — binary numbers may not start with a 1.",
  ]),

  // ── bin-binary-to-decimal ──
  // (1010)₂ = 8+2 = 10
  e("bin-binary-to-decimal:practiceSet:0", [f("8"), f("12"), f("5")]),
  // (1101)₂ = 8+4+1 = 13
  e("bin-binary-to-decimal:practiceSet:1", [f("11"), f("14"), f("12")]),
  // (111000)₂ = 32+16+8 = 56
  e("bin-binary-to-decimal:practiceSet:2", [f("7"), f("48"), f("62")]),
  // (100001)₂ = 32+1 = 33
  e("bin-binary-to-decimal:practiceSet:3", [f("17"), f("3"), f("65")]),
  // (100110)₂ = 32+4+2 = 38
  e("bin-binary-to-decimal:selfCheck:0", [f("26"), f("54"), f("19")]),

  // ── bin-decimal-to-binary ──
  // 8 = (1000)₂
  e("bin-decimal-to-binary:practiceSet:0", [f("(100)_2"), f("(0001)_2"), f("(1100)_2")]),
  // 15 = (1111)₂
  e("bin-decimal-to-binary:practiceSet:1", [f("(1110)_2"), f("(10000)_2"), f("(1011)_2")]),
  // 20 = 16+4 = (10100)₂
  e("bin-decimal-to-binary:practiceSet:2", [f("(00101)_2"), f("(11000)_2"), f("(1010)_2")]),
  // 63 = 2⁶-1 = (111111)₂
  e("bin-decimal-to-binary:practiceSet:3", [f("(1000000)_2"), f("(11111)_2"), f("(101111)_2")]),
  // 26 = 16+8+2 = (11010)₂
  e("bin-decimal-to-binary:selfCheck:0", [f("(01011)_2"), f("(11100)_2"), f("(10110)_2")]),

  // ── bin-addition-subtraction ──
  // (101)₂ + (11)₂ = 5+3 = 8 = (1000)₂
  e("bin-addition-subtraction:practiceSet:0", [f("(110)_2"), f("(1110)_2"), f("(111)_2")]),
  // (1110)₂ - (101)₂ = 14-5 = 9 = (1001)₂
  e("bin-addition-subtraction:practiceSet:1", [f("(1011)_2"), f("(1010)_2"), f("(101)_2")]),
  // (1111)₂ + (1)₂ = 15+1 = 16 = (10000)₂
  e("bin-addition-subtraction:practiceSet:2", [f("(1111)_2"), f("(1000)_2"), f("(11111)_2")]),
  // (1x0)₂ = 6 → 4+2x = 6 → x = 1
  e("bin-addition-subtraction:practiceSet:3", [f("x = 0"), f("x = 2"), f("x = 3")]),
  // (11p1)₂ + (101)₂ = (10100)₂ → 13+2p+5 = 20 → p = 1
  e("bin-addition-subtraction:selfCheck:0", [f("p = 0"), f("p = 2"), f("p = 3")]),

  // ── bin-division ──
  // (1010)₂ ÷ (10)₂ = 10÷2 = 5 = (101)₂
  e("bin-division:practiceSet:0", [f("(110)_2"), f("(1010)_2"), f("(11)_2")]),
  // (1011)₂ ÷ (11)₂ = 11÷3 → q 3 = (11)₂, r 2 = (10)₂
  e("bin-division:practiceSet:1", [
    "Quotient \\((100)_2\\), remainder \\((1)_2\\)",
    "Quotient \\((11)_2\\), remainder 0",
    "Quotient \\((101)_2\\), remainder \\((10)_2\\)",
  ]),
  // (110000)₂ ÷ (1000)₂ = 48÷8 = 6 = (110)₂
  e("bin-division:practiceSet:2", [f("(101)_2"), f("(1100)_2"), f("(1000)_2")]),
  // (1111)₂ ÷ (101)₂ = 15÷5 = 3 exact
  e("bin-division:practiceSet:3", [
    "No — \\(15 \\div 5 = 3\\) with remainder \\((1)_2\\).",
    "No — the divisor does not divide the dividend.",
    "Yes — \\(15 \\div 5 = (101)_2\\), remainder 0.",
  ]),
  // (100100)₂ ÷ (110)₂ = 36÷6 = 6 = (110)₂ exact
  e("bin-division:selfCheck:0", [
    "\\((101)_2\\) (remainder \\((10)_2\\)).",
    "\\((1000)_2\\) (exact).",
    "\\((110)_2\\) (remainder \\((11)_2\\)).",
  ]),

  // ── bin-algebraic-identities ──
  // x+y=5, xy=6 → (x-y)² = 25-24 = 1
  e("bin-algebraic-identities:practiceSet:0", [f("49"), f("25"), f("13")]),
  // a=b+c → a³-b³-c³-3abc = 0
  e("bin-algebraic-identities:practiceSet:1", [f("3abc"), f("a^3"), f("-3abc")]),
  // x³+y³ = (x+y)(x²-xy+y²)
  e("bin-algebraic-identities:practiceSet:2", [
    f("(x+y)(x^2 + xy + y^2)"),
    f("(x-y)(x^2 + xy + y^2)"),
    f("(x+y)^3"),
  ]),
  // x³+y³=35, x+y=5 → x²-xy+y² = 35/5 = 7
  e("bin-algebraic-identities:practiceSet:3", [f("30"), f("175"), f("12")]),
  // x+y=10, xy=21 → x²+y² = 100-42 = 58
  e("bin-algebraic-identities:selfCheck:0", [f("142"), f("121"), f("79")]),

  // ── bin-representation-bit-count ──
  // 31 = 2⁵-1 → 5 bits
  e("bin-representation-bit-count:practiceSet:0", [f("6 \\text{ bits}"), f("4 \\text{ bits}"), f("31 \\text{ bits}")]),
  // 32 = 2⁵ = (100000)₂ → 6 bits
  e("bin-representation-bit-count:practiceSet:1", [f("5 \\text{ bits}"), f("7 \\text{ bits}"), f("32 \\text{ bits}")]),
  // largest in 4 bits = 2⁴-1 = 15
  e("bin-representation-bit-count:practiceSet:2", [f("16"), f("8"), f("31")]),
  // 200 = 128+64+8 = (11001000)₂
  e("bin-representation-bit-count:practiceSet:3", [f("(10001000)_2"), f("(11000100)_2"), f("(11001001)_2")]),
  // 250: 2⁷=128 ≤ 250 < 256 → 8 bits
  e("bin-representation-bit-count:selfCheck:0", [f("7 \\text{ bits}"), f("9 \\text{ bits}"), f("250 \\text{ bits}")]),

  // ── bin-number-theory-facts ──
  // sum of first 10 odd numbers = 10² = 100
  e("bin-number-theory-facts:practiceSet:0", [f("90"), f("55"), f("121")]),
  // 1+3+5+… = 169 → n = √169 = 13
  e("bin-number-theory-facts:practiceSet:1", [f("169"), f("84"), f("12")]),
  // 2¹⁰ mod 3: cycle 2,1,2,1; even exponent → 1
  e("bin-number-theory-facts:practiceSet:2", [f("2"), f("0"), f("1024")]),
  // 7⁴ mod 5: 7≡2, 2⁴=16≡1
  e("bin-number-theory-facts:practiceSet:3", [f("2"), f("3"), f("0")]),
  // sum = 441 → n = √441 = 21 terms
  e("bin-number-theory-facts:selfCheck:0", [f("441 \\text{ terms}"), f("20 \\text{ terms}"), f("22 \\text{ terms}")]),
];
