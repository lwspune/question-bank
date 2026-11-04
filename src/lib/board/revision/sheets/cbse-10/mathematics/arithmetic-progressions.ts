import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 5 Arithmetic Progressions. Statements checked
 * against the NCERT Class 10 text (rationalised); formulas rebuilt; most-asked
 * years and marks from the CBSE board past-paper questions in the bank,
 * 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Arithmetic Progressions",
  chapterSlug: "arithmetic-progressions",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 5",
  keyPoints: [
    {
      term: "Arithmetic progression",
      text: "An AP is a list of numbers in which each term is obtained by adding a fixed number \\(d\\) to the preceding term, except the first term. The fixed number \\(d\\) is called the **common difference**. It can be positive, negative or zero.",
    },
    {
      term: "General form",
      text: "\\(a, a + d, a + 2d, a + 3d, \\ldots\\), where \\(a\\) is the first term and \\(d\\) the common difference.",
    },
    {
      term: "Testing for an AP",
      text: "A list is an AP if the differences \\(a_2 - a_1\\), \\(a_3 - a_2\\), \\(a_4 - a_3, \\ldots\\) all give the same value. Check at least two differences.",
    },
    {
      term: "nth term",
      text: "The nth term (general term) of the AP with first term \\(a\\) and common difference \\(d\\) is \\(a_n = a + (n - 1)d\\).",
    },
    {
      term: "Last term",
      text: "If an AP has \\(m\\) terms, \\(a_m\\) is the last term, sometimes written \\(l\\). Use \\(l = a + (n - 1)d\\) to find the number of terms \\(n\\).",
    },
    {
      term: "Sum of n terms",
      text: "\\(S_n = \\frac{n}{2}[2a + (n - 1)d]\\).",
    },
    {
      term: "Sum with the last term",
      text: "\\(S_n = \\frac{n}{2}(a + l)\\). Useful when the first and last terms are given and \\(d\\) is not.",
    },
    {
      term: "Term from the sum",
      text: "The nth term is the difference of the sum to first \\(n\\) terms and the sum to first \\((n - 1)\\) terms: \\(a_n = S_n - S_{n-1}\\). Also \\(a_1 = S_1\\).",
    },
    {
      term: "Term from the end",
      text: "The kth term from the end of an AP with \\(n\\) terms is the \\((n - k + 1)\\)th term from the start. Or reverse the AP: first term \\(l\\), difference \\(-d\\).",
    },
    {
      term: "Sum of first n positive integers",
      text: "\\(1 + 2 + 3 + \\cdots + n = \\frac{n(n + 1)}{2}\\).",
    },
    {
      term: "Three terms in AP",
      text: "\\(a\\), \\(b\\), \\(c\\) are in AP exactly when \\(2b = a + c\\). Take three terms as \\(a - d\\), \\(a\\), \\(a + d\\) when their sum is given.",
    },
  ],
  formulas: [
    { label: "nth term", latex: "a_n = a + (n - 1)d" },
    { label: "Common difference", latex: "d = a_2 - a_1 = a_{n} - a_{n-1}" },
    { label: "Sum of n terms", latex: "S_n = \\frac{n}{2}\\left[2a + (n - 1)d\\right]" },
    { label: "Sum with the last term", latex: "S_n = \\frac{n}{2}(a + l)" },
    { label: "nth term from the sum", latex: "a_n = S_n - S_{n-1}" },
    { label: "kth term from the end", latex: "l - (k - 1)d" },
    { label: "Sum of first n natural numbers", latex: "\\frac{n(n + 1)}{2}" },
    { label: "Difference of two terms", latex: "a_p - a_q = (p - q)d" },
  ],
  derivations: [
    {
      title: "Derive \\(S_n = \\frac{n}{2}[2a + (n - 1)d]\\)",
      steps: [
        "Write \\(S_n = a + (a + d) + \\cdots + [a + (n - 1)d]\\).",
        "Rewrite the terms in reverse order: \\(S_n = [a + (n - 1)d] + [a + (n - 2)d] + \\cdots + a\\).",
        "Add the two term by term: each pair gives \\(2a + (n - 1)d\\), and there are \\(n\\) pairs.",
        "So \\(2S_n = n[2a + (n - 1)d]\\), that is, \\(S_n = \\frac{n}{2}[2a + (n - 1)d]\\).",
      ],
    },
    {
      title: "If the pth term is q and the qth term is p, prove that the nth term is \\(p + q - n\\)",
      steps: [
        "\\(a + (p - 1)d = q\\) and \\(a + (q - 1)d = p\\).",
        "Subtract: \\((p - q)d = q - p\\), so \\(d = -1\\).",
        "Then \\(a = q + (p - 1) = p + q - 1\\).",
        "\\(a_n = (p + q - 1) + (n - 1)(-1) = p + q - n\\).",
      ],
    },
    {
      title: "If \\(S_m = S_n\\) (\\(m \\neq n\\)), show that \\(S_{m+n} = 0\\)",
      steps: [
        "\\(\\frac{m}{2}[2a + (m - 1)d] = \\frac{n}{2}[2a + (n - 1)d]\\).",
        "Rearrange: \\(2a(m - n) + d[(m^2 - n^2) - (m - n)] = 0\\), so \\((m - n)[2a + (m + n - 1)d] = 0\\).",
        "As \\(m \\neq n\\), \\(2a + (m + n - 1)d = 0\\).",
        "So \\(S_{m+n} = \\frac{m + n}{2}[2a + (m + n - 1)d] = 0\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Case study: instalments, savings, salary, interest, logs, lanes, poles, dot or triangle patterns", marks: 2, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "nth term: find a term, which term is a given number, first negative term, or d from \\(a_n\\)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Sum of n terms: find \\(S_n\\), the number of terms, or a and d from given sums", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Three terms in AP: find x or k from \\(2b = a + c\\), the middle term, or the terms from their sum", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Two conditions on terms (ratio of terms, sum and product of terms): find the AP, then a sum", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "\\(S_n\\) given as an expression in n: find \\(a_n\\), d or the AP", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Multiples of a number in a range, their sum, or the sum of the first n natural numbers", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "kth term from the end of an AP", marks: 1, years: [2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Finding d the wrong way round",
      body: "\\(d = a_2 - a_1\\) (later term minus earlier term). For \\(5, 1, -3, \\ldots\\), \\(d = 1 - 5 = -4\\), not 4.",
    },
    {
      title: "Using n instead of (n - 1)",
      body: "\\(a_n = a + (n - 1)d\\). The 10th term is \\(a + 9d\\), not \\(a + 10d\\).",
    },
    {
      title: "Counting multiples 'between' two numbers",
      body: "Multiples of 4 between 12 and 250: the first is 16 (12 itself is not between), the last is 248. Then \\(248 = 16 + (n - 1)4\\) gives \\(n = 59\\).",
    },
    {
      title: "Keeping an impossible n",
      body: "The number of terms must be a natural number. If solving \\(S_n\\) gives a fraction or a negative value, reject it. Two positive values can both be right when \\(d < 0\\): check both.",
    },
    {
      title: "Taking \\(S_n\\) for the nth term",
      body: "If \\(S_n = 2n^2 + 13n\\), then \\(a_n = S_n - S_{n-1} = 4n + 11\\), not \\(2n^2 + 13n\\).",
    },
  ],
};

export default sheet;
