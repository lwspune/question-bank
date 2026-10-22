import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SQ_SUM_NOTE: SubtopicNote = {
  subtopicName: "Sum of n Terms of an AP",
  title: "Sum of n Terms of an AP",
  oneLineDefinition:
    "The sum of n terms of an AP is n/2 times the first term plus the last term, or n/2 times (2a + (n − 1)d) when the last term is not known.",
  whyItMatters:
    "Fourteen questions in the bank, 8 EASY, 4 MODERATE and 2 HARD, and one is from the 2022 paper. Two formulas do all the work, plus three habits: knowing the standard sums, solving for n when the sum is given, and reading terms off a sum written in n. The two HARD ones are the same formulas with letters in place of numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisqsu-formula",
      name: "The two sum formulas",
      intuition:
        "Write the sum forwards, then backwards under it, and add the two rows. Every pair adds up to the first term plus the last, and there are n pairs. That is twice the sum, so halve it. When the last term is not given, replace it with a + (n − 1)d.",
      definition:
        "- \\(S_n = \\dfrac{n}{2}(a + l)\\) when the first term \\(a\\) and the last term \\(l\\) are known.\n" +
        "- \\(S_n = \\dfrac{n}{2}[2a + (n - 1)d]\\) when \\(a\\) and \\(d\\) are known.\n" +
        "- If two terms are given instead, find \\(a\\) and \\(d\\) first (two equations), then add.\n" +
        "- With letters in place of numbers the formulas are the same. Check a letter answer by putting in small numbers, such as \\(a = 1\\) and \\(d = 1\\).",
      formula: {
        label: "Sum of n terms",
        latex: "S_n = \\frac{n}{2}(a + l) = \\frac{n}{2}\\left[2a + (n - 1)d\\right]",
        symbols: [
          { symbol: "a", meaning: "the first term" },
          { symbol: "l", meaning: "the last term" },
          { symbol: "d", meaning: "the common difference" },
        ],
      },
      authoredExample: {
        prompt: "Find the sum of the first 20 terms of the AP 3, 7, 11, ...",
        steps: [
          "\\(a = 3\\), \\(d = 4\\), \\(n = 20\\).",
          "\\(S_{20} = \\frac{20}{2}[2 \\times 3 + 19 \\times 4] = 10 \\times (6 + 76) = 820\\).",
          "Check: the 20th term is \\(3 + 76 = 79\\), and \\(10 \\times (3 + 79) = 820\\).",
        ],
        answer: "820",
      },
      selfCheckExample: {
        prompt: "Find the sum of the AP 5, 8, 11, ..., 62.",
        steps: [
          "Number of terms: \\(\\frac{62 - 5}{3} + 1 = 20\\).",
          "\\(S = \\frac{20}{2}(5 + 62) = 10 \\times 67 = 670\\).",
        ],
        answer: "670",
      },
      practiceSet: [
        { prompt: "Find the sum of the first 10 terms of the AP 2, 5, 8, ...", answer: "\\(5 \\times (4 + 27) = 155\\)" },
        { prompt: "Find the sum of the first 12 terms of the AP 30, 27, 24, ...", answer: "\\(6 \\times (60 - 33) = 162\\)" },
        {
          prompt: "The 3rd term of an AP is 7 and its 6th term is 16. Find the sum of its first 10 terms.",
          answer: "\\(d = 3\\), \\(a = 1\\), so the sum is 145",
        },
        { prompt: "Find the sum of the first \\(n\\) terms of \\(2b, 4b, 6b, \\ldots\\)", answer: "\\(n(n + 1)b\\)" },
      ],
      pyqExampleId: "95ef92ec-887d-4564-a7bc-5ec3f082d622",
      traps: [
        {
          title: "Giving the last term when the sum is asked",
          body:
            "For 1, 4, 7, ... the 10th term is 28 but the sum of 10 terms is 145. An option that matches the nth term formula is a common wrong answer.",
        },
        {
          title: "Halving twice",
          body:
            "The \\(\\frac{n}{2}\\) already does the halving. Do not also divide \\((a + l)\\) by 2, or the answer comes out half the right size.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqsu-standard",
      name: "Standard sums of natural, odd and even numbers",
      intuition:
        "A few sums come up so often that it pays to know their answers by heart. Each one is just the sum formula worked out once.",
      definition:
        "- First \\(n\\) natural numbers: \\(1 + 2 + \\cdots + n = \\dfrac{n(n + 1)}{2}\\).\n" +
        "- First \\(n\\) odd numbers: \\(1 + 3 + 5 + \\cdots + (2n - 1) = n^2\\).\n" +
        "- First \\(n\\) even numbers: \\(2 + 4 + 6 + \\cdots + 2n = n(n + 1)\\).\n" +
        "- First \\(n\\) multiples of \\(k\\): \\(k + 2k + \\cdots + nk = k \\times \\dfrac{n(n + 1)}{2}\\).",
      formula: {
        label: "Standard sums",
        latex:
          "1 + 2 + \\cdots + n = \\frac{n(n + 1)}{2} \\qquad 1 + 3 + \\cdots + (2n - 1) = n^2 \\qquad 2 + 4 + \\cdots + 2n = n(n + 1)",
      },
      authoredExample: {
        prompt: "Find the sum of the first 12 multiples of 5.",
        steps: [
          "\\(5 + 10 + \\cdots + 60 = 5(1 + 2 + \\cdots + 12)\\).",
          "\\(1 + 2 + \\cdots + 12 = \\frac{12 \\times 13}{2} = 78\\), so the sum is \\(5 \\times 78 = 390\\).",
        ],
        answer: "390",
      },
      selfCheckExample: {
        prompt: "Find the sum of the first 25 natural numbers.",
        steps: ["\\(\\frac{25 \\times 26}{2} = 325\\)."],
        answer: "325",
      },
      practiceSet: [
        { prompt: "Find the sum of the first 15 odd natural numbers.", answer: "\\(15^2 = 225\\)" },
        { prompt: "Find the sum of the first 30 even natural numbers.", answer: "\\(30 \\times 31 = 930\\)" },
        { prompt: "Find \\(1 + 2 + 3 + \\cdots + 40\\).", answer: "820" },
        { prompt: "Find the sum of the first 10 multiples of 6.", answer: "\\(6 \\times 55 = 330\\)" },
      ],
      pyqExampleId: "1724e961-00d5-4282-b0f3-f2ded04acab5",
      traps: [
        {
          title: "Mixing up the odd and the even sums",
          body:
            "The first 10 odd numbers add up to 100 and the first 10 even numbers to 110. Each even number is one more than the matching odd number, so the even sum is larger by \\(n\\).",
        },
        {
          title: "Using the last number as n",
          body:
            "\\(1 + 3 + \\cdots + 41\\) has 21 terms, because \\(2n - 1 = 41\\) gives \\(n = 21\\). Its sum is \\(21^2 = 441\\), not \\(41^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqsu-count",
      name: "Finding the number of terms from the sum",
      intuition:
        "When the sum is given and the number of terms is not, put the sum into a formula and solve for n. With the first and last terms known it is a simple equation; with only a and d known it is a quadratic.",
      definition:
        "- First and last terms known: \\(\\dfrac{n}{2}(a + l) = S\\) gives \\(n = \\dfrac{2S}{a + l}\\).\n" +
        "- Only \\(a\\) and \\(d\\) known: \\(\\dfrac{n}{2}[2a + (n - 1)d] = S\\) is a quadratic in \\(n\\).\n" +
        "- Keep only the positive whole-number root, because \\(n\\) counts terms.",
      formula: {
        label: "Number of terms from the sum",
        latex: "n = \\frac{2S}{a + l}",
      },
      authoredExample: {
        prompt: "How many terms of the AP 5, 9, 13, ... add up to 230?",
        steps: [
          "\\(a = 5\\), \\(d = 4\\): \\(S_n = \\frac{n}{2}[10 + 4(n - 1)] = n(2n + 3)\\).",
          "\\(n(2n + 3) = 230\\), so \\(2n^2 + 3n - 230 = 0\\), which factors as \\((n - 10)(2n + 23) = 0\\).",
          "\\(n\\) must be a positive whole number, so \\(n = 10\\). Check: \\(10 \\times 23 = 230\\).",
        ],
        answer: "10 terms",
      },
      selfCheckExample: {
        prompt: "The first term of an AP is 4, the last term is 46 and the sum is 375. How many terms are there?",
        steps: ["\\(n = \\frac{2 \\times 375}{4 + 46} = \\frac{750}{50} = 15\\)."],
        answer: "15",
      },
      practiceSet: [
        { prompt: "An AP starts at 2, ends at 20, and its terms add up to 110. How many terms does it have?", answer: "10" },
        { prompt: "How many terms of the AP 1, 3, 5, ... must be taken to get a sum of 144?", answer: "12 (\\(n^2 = 144\\))" },
        { prompt: "How many terms of the AP 2, 4, 6, ... add up to 156?", answer: "12 (\\(n(n + 1) = 156\\))" },
      ],
      pyqExampleId: "ec0a66a0-cc8c-496a-8d05-4fd18cd1690a",
      traps: [
        {
          title: "Keeping the negative root",
          body:
            "The quadratic for \\(n\\) usually has a negative or fractional second root. A number of terms is a positive whole number, so that root is thrown away.",
        },
        {
          title: "Forgetting the half",
          body:
            "Writing \\(n(a + l) = S\\) without the \\(\\frac{1}{2}\\) gives half the right number of terms. The formula is \\(\\frac{n}{2}(a + l)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqsu-from-sum",
      name: "Terms from a sum written in n",
      intuition:
        "If you know the sum for every number of terms, the nth term is what the nth term adds: the sum of n terms minus the sum of n minus 1 terms. The first term is simply the sum of one term.",
      definition:
        "- \\(a_1 = S_1\\).\n" +
        "- \\(a_n = S_n - S_{n-1}\\).\n" +
        "- \\(d = a_2 - a_1\\), where \\(a_2 = S_2 - S_1\\).\n" +
        "- Shortcut: if \\(S_n = pn^2 + qn\\), then \\(d = 2p\\) and \\(a_1 = p + q\\).",
      formula: {
        label: "Terms from the sum",
        latex: "a_1 = S_1 \\qquad a_n = S_n - S_{n-1} \\qquad S_n = pn^2 + qn \\Rightarrow d = 2p",
      },
      authoredExample: {
        prompt:
          "The sum of the first \\(n\\) terms of an AP is \\(2n^2 + 3n\\). Find its first term, its common difference and its 5th term.",
        steps: [
          "\\(a_1 = S_1 = 2 + 3 = 5\\).",
          "\\(S_2 = 8 + 6 = 14\\), so \\(a_2 = 14 - 5 = 9\\) and \\(d = 4\\).",
          "\\(a_5 = 5 + 4 \\times 4 = 21\\). Check: \\(S_5 - S_4 = 65 - 44 = 21\\).",
        ],
        answer: "First term 5, common difference 4, 5th term 21.",
      },
      selfCheckExample: {
        prompt: "The sum of \\(n\\) terms of an AP is \\(n^2 + 5n\\). Find its first term.",
        steps: ["\\(a_1 = S_1 = 1 + 5 = 6\\)."],
        answer: "6",
      },
      practiceSet: [
        { prompt: "The sum of \\(n\\) terms of an AP is \\(4n^2 - n\\). Find its common difference.", answer: "8" },
        { prompt: "The sum of \\(n\\) terms of an AP is \\(n^2 + 3n\\). Find its nth term.", answer: "\\(2n + 2\\)" },
        { prompt: "The sum of \\(n\\) terms of an AP is \\(3n^2 + n\\). Find its 10th term.", answer: "\\(310 - 252 = 58\\)" },
      ],
      pyqExampleId: "738525cf-4a00-4c5c-b07d-47a77f5b286a",
      traps: [
        {
          title: "Reading the sum as a term",
          body:
            "If \\(S_n = n^2 + 5n\\), the 3rd term is not \\(S_3 = 24\\). It is \\(S_3 - S_2 = 24 - 14 = 10\\).",
        },
        {
          title: "Expanding the bracket carelessly",
          body:
            "\\(S_{n-1}\\) means \\(n - 1\\) in place of every \\(n\\), so \\((n - 1)^2 = n^2 - 2n + 1\\). The minus sign in front of \\(S_{n-1}\\) then changes every sign inside it.",
        },
      ],
    },
  ],
};
