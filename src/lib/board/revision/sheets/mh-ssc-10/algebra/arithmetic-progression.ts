import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Algebra, Ch. 3 Arithmetic Progression. Statements checked against
 * the Balbharati Mathematics Part I text; formulas rebuilt (the book's text
 * loses its notation); most-asked years and marks from the board past-paper
 * questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Algebra",
  subjectRoute: "algebra",
  chapterName: "Arithmetic Progression",
  chapterSlug: "arithmetic-progression",
  source: "Balbharati Mathematics Part I Std X (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Sequence",
      text: "A set of numbers arranged in a definite order, like the natural numbers. Its terms are written \\(t_1, t_2, t_3, \\ldots, t_n\\).",
    },
    {
      term: "Arithmetic Progression (A.P.)",
      text: "A sequence in which the difference between two consecutive terms, \\(t_{n+1} - t_n\\), is **constant**.",
    },
    {
      term: "Common difference",
      text: "That constant difference, denoted by \\(d\\): \\(d = t_2 - t_1 = t_3 - t_2\\). It can be positive, negative or zero (\\(4, 4, 4, \\ldots\\) has \\(d = 0\\)).",
    },
    {
      term: "Terms of an A.P.",
      text: "If the first term is \\(a\\) and the common difference is \\(d\\), the terms are \\(a, a + d, a + 2d, \\ldots\\). Check an A.P. by finding the difference of every pair of consecutive terms.",
    },
    {
      term: "nth term",
      text: "\\(t_n = a + (n - 1)d\\). To test whether a number is a term, put it equal to \\(t_n\\) and solve: \\(n\\) must be a natural number.",
    },
    {
      term: "Sum of first n terms",
      text: "Found by Gauss's method: write the sum forwards and backwards and add. \\(S_n = \\frac{n}{2}[2a + (n - 1)d]\\), or \\(S_n = \\frac{n}{2}[\\text{first term} + \\text{last term}]\\).",
    },
    {
      term: "Sums of natural numbers",
      text: "First \\(n\\) natural numbers: \\(\\frac{n(n + 1)}{2}\\). First \\(n\\) even natural numbers: \\(n(n + 1)\\). First \\(n\\) odd natural numbers: \\(n^2\\).",
    },
    {
      term: "Consecutive terms to assume",
      text: "Three consecutive terms: \\(a - d, a, a + d\\) (their sum is \\(3a\\), so \\(a\\) comes out at once). Four (as the book takes them): \\(a - d, a, a + d, a + 2d\\).",
    },
    {
      term: "Numbers divisible by a number",
      text: "Multiples of a number in a range form an A.P. Find the first and last multiples, take \\(d\\) = the number, and use \\(t_n\\) to count them.",
    },
    {
      term: "Applications",
      text: "Savings that rise by a fixed amount, instalments that fall by a fixed amount, rows of seats, yearly production with the same growth, and simple interest each year all form an A.P.",
    },
  ],
  formulas: [
    { label: "Common difference", latex: "d = t_{n+1} - t_n" },
    { label: "nth term", latex: "t_n = a + (n - 1)d" },
    { label: "Sum of first n terms", latex: "S_n = \\frac{n}{2}\\left[2a + (n - 1)d\\right] \\qquad S_n = \\frac{n}{2}\\left[t_1 + t_n\\right]" },
    { label: "Sums of natural numbers", latex: "1 + 2 + \\cdots + n = \\frac{n(n + 1)}{2} \\qquad 2 + 4 + \\cdots + 2n = n(n + 1) \\qquad 1 + 3 + \\cdots + (2n - 1) = n^2" },
    { label: "Number of terms from first to last", latex: "n = \\frac{t_n - a}{d} + 1" },
    { label: "Simple interest", latex: "I = \\frac{P \\times R \\times N}{100}" },
  ],
  derivations: [
    {
      title: "Derive the formula for the sum of the first n terms of an A.P.",
      steps: [
        "\\(S_n = a + (a + d) + \\cdots + [a + (n - 1)d]\\). Write it again in reverse order.",
        "Add the two: each pair of terms gives \\(2a + (n - 1)d\\), and there are \\(n\\) pairs.",
        "So \\(2S_n = n[2a + (n - 1)d]\\), and \\(S_n = \\frac{n}{2}[2a + (n - 1)d]\\).",
      ],
    },
    {
      title: "If the 9th term of an A.P. is zero, show that the 29th term is twice the 19th term",
      steps: [
        "\\(t_9 = a + 8d = 0\\), so \\(a = -8d\\).",
        "\\(t_{29} = a + 28d = 20d\\) and \\(t_{19} = a + 18d = 10d\\).",
        "Hence \\(t_{29} = 2 \\times t_{19}\\).",
      ],
    },
    {
      title: "If the sum of the first p terms equals the sum of the first q terms, show that the sum of the first (p + q) terms is zero",
      steps: [
        "\\(\\frac{p}{2}[2a + (p - 1)d] = \\frac{q}{2}[2a + (q - 1)d]\\), so \\(2a(p - q) + d[(p^2 - q^2) - (p - q)] = 0\\).",
        "Divide by \\(p - q \\neq 0\\): \\(2a + (p + q - 1)d = 0\\).",
        "\\(S_{p+q} = \\frac{p + q}{2}[2a + (p + q - 1)d] = 0\\).",
      ],
    },
    {
      title: "First term p, second term q, last term r: show that the sum is (p + r)(q + r - 2p) / 2(q - p)",
      steps: [
        "\\(a = p\\), \\(d = q - p\\), \\(t_n = r\\).",
        "\\(r = p + (n - 1)(q - p)\\), so \\(n = \\frac{r - p}{q - p} + 1 = \\frac{q + r - 2p}{q - p}\\).",
        "\\(S_n = \\frac{n}{2}(p + r) = \\frac{(p + r)(q + r - 2p)}{2(q - p)}\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "First term, common difference, next terms, or is it an A.P.?", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Find the nth term, or which term is a given number", marks: 2, years: [2026, 2025, 2024, 2023, 2022, 2020, 2019, 2018, 2016] },
    { topic: "Word problems: savings, instalments, seats, interest, angles", marks: 4, years: [2026, 2025, 2024, 2022, 2020, 2019] },
    { topic: "Show that: proofs using tn and Sn", years: [2025, 2023, 2022, 2018, 2017] },
    { topic: "Sum of first n terms, or of numbers divisible by a given number", years: [2026, 2022, 2020, 2018, 2016] },
    { topic: "How many numbers in a range are divisible by a given number", marks: 3, years: [2026, 2017] },
    { topic: "Three consecutive terms from their sum and product", marks: 3, years: [2025, 2020] },
  ],
  mistakes: [
    {
      title: "Taking d the wrong way round",
      body: "\\(d = t_2 - t_1\\) (later term minus earlier term). For \\(5, 1, -3, \\ldots\\), \\(d = 1 - 5 = -4\\), not \\(4\\).",
    },
    {
      title: "Using n d instead of (n - 1) d",
      body: "The first term already counts as one term: \\(t_{19} = a + 18d\\), not \\(a + 19d\\).",
    },
    {
      title: "Mixing up the nth term and the sum",
      body: "\\(t_n\\) is one term (the amount in the 12th year); \\(S_n\\) is the total (the amount in 12 years). Read which one the question wants.",
    },
    {
      title: "Accepting a fraction for n",
      body: "If solving \\(t_n = \\) the number gives \\(n\\) as a fraction or a negative number, that number is **not** a term of the A.P.",
    },
    {
      title: "Wrong count of days or terms",
      body: "February 2020 had 29 days (a leap year). From 50 to 350, count only the multiples that lie inside the range.",
    },
  ],
};

export default sheet;
