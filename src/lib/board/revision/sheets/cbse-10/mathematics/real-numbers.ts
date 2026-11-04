import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 1 Real Numbers. Statements checked against the
 * NCERT Class 10 text (rationalised); formulas rebuilt; most-asked years and
 * marks from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Real Numbers",
  chapterSlug: "real-numbers",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 1",
  keyPoints: [
    {
      term: "Fundamental Theorem of Arithmetic",
      text: "Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.",
    },
    {
      term: "HCF by prime factorisation",
      text: "HCF = product of the **smallest power** of each **common** prime factor in the numbers.",
    },
    {
      term: "LCM by prime factorisation",
      text: "LCM = product of the **greatest power** of each prime factor involved in the numbers.",
    },
    {
      term: "HCF and LCM of two numbers",
      text: "For any two positive integers \\(a\\) and \\(b\\): \\(\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b\\). This is **not true for three numbers**.",
    },
    {
      term: "Co-prime numbers",
      text: "Two numbers with HCF 1. For co-prime \\(a\\) and \\(b\\): HCF = 1 and LCM = \\(ab\\). Two different primes are always co-prime.",
    },
    {
      term: "Irrational number",
      text: "A number \\(s\\) is irrational if it cannot be written in the form \\(\\frac{p}{q}\\), where \\(p\\) and \\(q\\) are integers and \\(q \\neq 0\\). Examples: \\(\\sqrt{2}\\), \\(\\sqrt{3}\\), \\(\\pi\\).",
    },
    {
      term: "Theorem 1.2",
      text: "Let \\(p\\) be a prime number. If \\(p\\) divides \\(a^2\\), then \\(p\\) divides \\(a\\), where \\(a\\) is a positive integer.",
    },
    {
      term: "Rational with irrational",
      text: "The sum or difference of a rational and an irrational number is irrational. The product and quotient of a **non-zero** rational and an irrational number is irrational.",
    },
    {
      term: "Ending with the digit 0",
      text: "A number ends with 0 only if its prime factorisation has **both 2 and 5**. \\(4^n = 2^{2n}\\) has no 5, so by the uniqueness of the factorisation \\(4^n\\) never ends with 0.",
    },
    {
      term: "Proof by contradiction",
      text: "Assume the opposite (the number is rational, \\(\\frac{a}{b}\\) with \\(a, b\\) co-prime), reach something false, and conclude the assumption was wrong.",
    },
  ],
  formulas: [
    { label: "HCF and LCM of two numbers", latex: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b" },
    { label: "Prime-power form", latex: "a = 2^3 \\times 3^2,\\ b = 2^2 \\times 3^3 \\times 5 \\Rightarrow \\text{HCF} = 2^2 \\times 3^2,\\ \\text{LCM} = 2^3 \\times 3^3 \\times 5" },
    { label: "Greatest number leaving remainders r1 and r2", latex: "\\text{HCF}(a - r_1,\\ b - r_2)" },
    { label: "Least number leaving remainder r in each case", latex: "\\text{LCM}(x, y, z) + r" },
    { label: "Co-prime numbers", latex: "\\text{HCF} = 1, \\qquad \\text{LCM} = a \\times b" },
  ],
  derivations: [
    {
      title: "Prove that \\(\\sqrt{2}\\) is irrational (same steps for \\(\\sqrt{3}\\), \\(\\sqrt{5}\\))",
      steps: [
        "Assume, to the contrary, that \\(\\sqrt{2}\\) is rational: \\(\\sqrt{2} = \\frac{a}{b}\\), with \\(a\\), \\(b\\) co-prime and \\(b \\neq 0\\).",
        "Square: \\(2b^2 = a^2\\). So 2 divides \\(a^2\\), and by Theorem 1.2, 2 divides \\(a\\). Write \\(a = 2c\\).",
        "Then \\(2b^2 = 4c^2\\), so \\(b^2 = 2c^2\\). So 2 divides \\(b^2\\), and hence 2 divides \\(b\\).",
        "So 2 is a common factor of \\(a\\) and \\(b\\). This contradicts that \\(a\\) and \\(b\\) are co-prime.",
        "The contradiction arose from the wrong assumption. So \\(\\sqrt{2}\\) is irrational.",
      ],
    },
    {
      title: "Prove that \\(5 - 2\\sqrt{3}\\) is irrational, given that \\(\\sqrt{3}\\) is irrational",
      steps: [
        "Assume, to the contrary, that \\(5 - 2\\sqrt{3}\\) is rational: \\(5 - 2\\sqrt{3} = \\frac{a}{b}\\), \\(a\\), \\(b\\) co-prime integers, \\(b \\neq 0\\).",
        "Rearrange: \\(\\sqrt{3} = \\frac{5b - a}{2b}\\).",
        "The right side is rational, since \\(a\\), \\(b\\) are integers. So \\(\\sqrt{3}\\) would be rational.",
        "This contradicts the fact that \\(\\sqrt{3}\\) is irrational. So \\(5 - 2\\sqrt{3}\\) is irrational.",
      ],
    },
    {
      title: "Show that \\(4^n\\) can never end with the digit 0 for any natural number \\(n\\)",
      steps: [
        "A number ending with 0 is divisible by 10, so its prime factorisation must contain 2 and 5.",
        "\\(4^n = 2^{2n}\\): the only prime in its factorisation is 2.",
        "By the uniqueness of the Fundamental Theorem of Arithmetic, no other prime (such as 5) can appear.",
        "So \\(4^n\\) never ends with 0. (Same for \\(6^n = 2^n 3^n\\), \\(8^n\\); but \\(15^n\\) has no 2, so it cannot end with 0 either.)",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "HCF and LCM by prime factorisation, including numbers written as powers of primes", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Word problems: greatest number leaving remainders, bells or lights together, containers, plank, rows of students", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Prime factorisation: find the powers, show a number is composite, prime or not", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Prove that a number like \\(5 - 2\\sqrt{3}\\) is irrational, given that \\(\\sqrt{3}\\) is irrational", marks: 2, years: [2026, 2025, 2024, 2023] },
    { topic: "HCF × LCM = product of two numbers; HCF and LCM of primes or co-primes", marks: 1, years: [2025, 2024, 2023] },
    { topic: "Can \\(4^n\\), \\(6^n\\), \\(15^n\\) end with the digit 0? Unit digit of a power", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Rational or irrational: identify, or pick a pair whose product is rational", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Prove that \\(\\sqrt{2}\\), \\(\\sqrt{3}\\), \\(\\sqrt{5}\\) or \\(\\frac{1}{\\sqrt{5}}\\) is irrational", marks: 3, years: [2025] },
  ],
  mistakes: [
    {
      title: "Using HCF × LCM = product for three numbers",
      body: "The rule holds for **two** numbers only. For 6, 72 and 120, the product of the numbers is not HCF × LCM. Find the HCF and LCM of three numbers by prime factorisation.",
    },
    {
      title: "Forgetting to subtract the remainders",
      body: "Greatest number dividing 70 and 125 leaving remainders 5 and 8: find HCF(65, 117) = 13, not HCF(70, 125).",
    },
    {
      title: "Skipping the co-prime step in the proof",
      body: "Write \\(\\frac{a}{b}\\) with \\(a\\), \\(b\\) **co-prime** and \\(b \\neq 0\\). The contradiction is that they share a factor. End with the conclusion sentence.",
    },
    {
      title: "Calling 1 a prime",
      body: "1 is neither prime nor composite. 2 is the only even prime. The smallest composite number is 4.",
    },
    {
      title: "Saying the sum of two irrationals is always irrational",
      body: "False: \\(\\sqrt{3} + (-\\sqrt{3}) = 0\\). Only a rational plus an irrational is sure to be irrational.",
    },
  ],
};

export default sheet;
