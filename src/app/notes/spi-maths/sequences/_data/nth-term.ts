import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SQ_NTH_TERM_NOTE: SubtopicNote = {
  subtopicName: "The nth Term of an AP",
  title: "The nth Term of an AP",
  oneLineDefinition:
    "In an arithmetic progression each term is the one before it plus a fixed common difference d, so the nth term is a + (n − 1)d.",
  whyItMatters:
    "Seventeen questions in the bank, 13 EASY and 4 MODERATE, and one is from the 2022 paper. Almost every one is a single use of a + (n − 1)d: find a term, find which term a number is, find d from two terms, or count back from the last term.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisqnt-difference",
      name: "What makes a list an AP",
      intuition:
        "A list of numbers is an **arithmetic progression** (AP) when you add the same number each time to get the next one. That fixed number is the **common difference**. It can be positive, negative, zero or a fraction.",
      definition:
        "- An **AP** is a list \\(a_1, a_2, a_3, \\ldots\\) in which \\(a_2 - a_1 = a_3 - a_2 = \\ldots\\)\n" +
        "- The **common difference** is \\(d = a_2 - a_1\\): a term minus the one before it, never the other way round.\n" +
        "- To test a list, find every gap. One unequal gap and it is not an AP.\n" +
        "- A rule such as \\(a_n = 3n - 1\\) gives the terms when you put \\(n = 1, 2, 3, \\ldots\\) A rule of the form \\(a_n = pn + q\\) always gives an AP with \\(d = p\\).\n" +
        "- **Surds:** write each term as a multiple of the same root first, as in \\(\\sqrt{12} = 2\\sqrt{3}\\) and \\(\\sqrt{27} = 3\\sqrt{3}\\).",
      formula: {
        label: "Common difference",
        latex: "d = a_2 - a_1 = a_3 - a_2",
      },
      authoredExample: {
        prompt: "Write the first four terms of the sequence \\(a_n = 4n - 3\\) and find its common difference.",
        steps: [
          "\\(a_1 = 4 - 3 = 1\\), \\(a_2 = 8 - 3 = 5\\), \\(a_3 = 12 - 3 = 9\\), \\(a_4 = 16 - 3 = 13\\).",
          "The gaps are \\(5 - 1 = 4\\), \\(9 - 5 = 4\\), \\(13 - 9 = 4\\): all equal.",
          "So it is an AP with \\(d = 4\\), the number in front of \\(n\\).",
        ],
        answer: "1, 5, 9, 13, with \\(d = 4\\).",
      },
      selfCheckExample: {
        prompt: "Is the list 2, 5, 9, 14, ... an arithmetic progression?",
        steps: ["The gaps are \\(5 - 2 = 3\\), \\(9 - 5 = 4\\), \\(14 - 9 = 5\\).", "The gaps are not equal."],
        answer: "No: the gaps are 3, 4 and 5.",
      },
      practiceSet: [
        { prompt: "Find the common difference of the AP 20, 17, 14, 11, ...", answer: "\\(-3\\)" },
        {
          prompt: "Find the next term of the AP \\(\\sqrt{3}, \\sqrt{12}, \\sqrt{27}, \\ldots\\)",
          answer: "\\(4\\sqrt{3} = \\sqrt{48}\\)",
        },
        {
          prompt: "Find the common difference of the AP \\(\\frac{1}{2}, \\frac{5}{6}, \\frac{7}{6}, \\ldots\\)",
          answer: "\\(\\frac{1}{3}\\)",
        },
        { prompt: "Write the first three terms of the sequence \\(a_n = 7 - 2n\\).", answer: "5, 3, 1" },
      ],
      pyqExampleId: "f858873c-c0c8-46e6-abb2-d99eae67fa3d",
      traps: [
        {
          title: "Subtracting the wrong way round",
          body:
            "The common difference is a term minus the term before it. For 20, 17, 14 it is \\(17 - 20 = -3\\), not 3. A list that falls has a negative common difference.",
        },
        {
          title: "Judging surds by their look",
          body:
            "\\(\\sqrt{2}, \\sqrt{4}, \\sqrt{6}\\) looks evenly spaced but is not an AP: the gaps are about 0.59 and 0.45. Rewrite each surd as a multiple of one root before deciding.",
        },
        {
          title: "Squares of an AP are not an AP",
          body:
            "2, 4, 6 is an AP, but their squares 4, 16, 36 have gaps 12 and 20. Squaring the terms breaks the equal steps.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqnt-general",
      name: "The nth term formula",
      intuition:
        "To reach the nth term you start at the first term and take n minus 1 steps of size d. So the 10th term is the first term plus 9 common differences, not 10.",
      definition:
        "- \\(a_n = a + (n - 1)d\\), where \\(a\\) is the first term and \\(d\\) the common difference.\n" +
        "- **Find a term:** put in the value of \\(n\\).\n" +
        "- **Find which term a number is:** set \\(a + (n - 1)d\\) equal to it and solve for \\(n\\). If \\(n\\) is not a whole number, the number is not a term.\n" +
        "- **Find \\(a\\) or \\(d\\):** each fact about a term gives one equation.\n" +
        "- **Count the terms** from \\(a\\) to a last term \\(l\\): \\(n = \\dfrac{l - a}{d} + 1\\). Counting the multiples of 7 between 100 and 200 uses this.\n" +
        "- **Two APs with an equal term:** write both nth terms and set them equal.",
      formula: {
        label: "The nth term and the number of terms",
        latex: "a_n = a + (n - 1)d \\qquad n = \\frac{l - a}{d} + 1",
        symbols: [
          { symbol: "a", meaning: "the first term" },
          { symbol: "d", meaning: "the common difference" },
          { symbol: "l", meaning: "the last term" },
        ],
      },
      authoredExample: {
        prompt: "Find the 12th term of the AP 4, 9, 14, ...",
        steps: [
          "\\(a = 4\\) and \\(d = 9 - 4 = 5\\).",
          "\\(a_{12} = 4 + 11 \\times 5 = 4 + 55 = 59\\).",
        ],
        answer: "59",
      },
      selfCheckExample: {
        prompt: "Which term of the AP 11, 8, 5, ... is \\(-16\\)?",
        steps: [
          "\\(a = 11\\) and \\(d = -3\\).",
          "\\(11 - 3(n - 1) = -16\\), so \\(3(n - 1) = 27\\) and \\(n - 1 = 9\\).",
        ],
        answer: "The 10th term.",
      },
      practiceSet: [
        { prompt: "Find the 20th term of the AP 2, 6, 10, ...", answer: "\\(2 + 19 \\times 4 = 78\\)" },
        {
          prompt: "How many two-digit numbers are divisible by 7?",
          answer: "13 (from 14 to 98: \\(\\frac{98 - 14}{7} + 1 = 13\\))",
        },
        {
          prompt: "The first term of an AP is 5 and its 9th term is 37. Find the common difference.",
          answer: "\\(5 + 8d = 37\\), so \\(d = 4\\)",
        },
        {
          prompt: "For what value of \\(n\\) are the nth terms of the APs 10, 14, 18, ... and 40, 42, 44, ... equal?",
          answer: "\\(n = 16\\) (both are 70)",
        },
      ],
      pyqExampleId: "1b7b7355-d024-43b0-8784-6357402176b4",
      traps: [
        {
          title: "Using n instead of n minus 1",
          body:
            "The 10th term of 3, 7, 11, ... is \\(3 + 9 \\times 4 = 39\\). Adding \\(10 \\times 4\\) gives 43, one step too far.",
        },
        {
          title: "Forgetting the +1 when counting terms",
          body:
            "From 12 to 96 in steps of 12 there are \\(\\frac{96 - 12}{12} + 1 = 8\\) terms, not 7. Dividing the distance counts the steps; the terms are one more.",
        },
        {
          title: "Starting the count at the wrong number",
          body:
            "To count the three-digit multiples of 8, start at 104 (the first multiple of 8 above 99), not at 100, and end at 992, the last one below 1000.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqnt-gap",
      name: "The gap between two terms",
      intuition:
        "Between the 9th and the 15th term there are 6 steps, so the two terms differ by 6 common differences. The first term cancels, so you do not need it.",
      definition:
        "- \\(a_m - a_k = (m - k)d\\). The first term cancels.\n" +
        "- If two terms are given, divide their difference by the number of steps between them to get \\(d\\).\n" +
        "- Then put \\(d\\) back into either term to find the first term.",
      formula: {
        label: "Difference of two terms",
        latex: "a_m - a_k = (m - k)d",
      },
      authoredExample: {
        prompt: "The 15th term of an AP is 30 more than its 9th term. Find the common difference.",
        steps: ["\\(a_{15} - a_9 = (15 - 9)d = 6d\\).", "\\(6d = 30\\), so \\(d = 5\\)."],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "In an AP the 4th term is 11 and the 10th term is 29. Find the first term and the common difference.",
        steps: [
          "\\(a_{10} - a_4 = 6d = 29 - 11 = 18\\), so \\(d = 3\\).",
          "\\(a + 3d = 11\\), so \\(a = 11 - 9 = 2\\).",
        ],
        answer: "First term 2, common difference 3.",
      },
      practiceSet: [
        { prompt: "The common difference of an AP is 4. Find \\(a_{25} - a_{17}\\).", answer: "\\(8 \\times 4 = 32\\)" },
        { prompt: "The common difference of an AP is \\(-2\\). Find \\(a_{30} - a_{21}\\).", answer: "\\(9 \\times (-2) = -18\\)" },
        {
          prompt: "In an AP, \\(a_9 - a_6 = 15\\) and the 2nd term is 8. Find the first term.",
          answer: "\\(3d = 15\\) gives \\(d = 5\\), so the first term is 3",
        },
      ],
      pyqExampleId: "80fefdc0-d7fd-4ec3-8a7c-abb8f4cb7729",
      traps: [
        {
          title: "Counting the terms instead of the steps",
          body:
            "From the 9th term to the 15th there are 6 steps, not 7. The gap is \\((m - k)d\\), not \\((m - k + 1)d\\).",
        },
        {
          title: "Losing the sign",
          body:
            "\\(a_{10} - a_{14}\\) is \\(-4d\\), because the later term is subtracted. With \\(d = 3\\) it is \\(-12\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisqnt-end",
      name: "Terms counted from the end",
      intuition:
        "Read an AP backwards from its last term and you get a new AP whose common difference has the opposite sign. The 3rd term from the end is two steps back from the last term.",
      definition:
        "- If the last term is \\(l\\), the nth term from the end is \\(l - (n - 1)d\\).\n" +
        "- Or reverse the list: it starts at \\(l\\) and its common difference is \\(-d\\).\n" +
        "- If the AP has \\(N\\) terms, the nth term from the end is the \\((N - n + 1)\\)th term from the start.",
      formula: {
        label: "nth term from the end",
        latex: "l - (n - 1)d",
      },
      authoredExample: {
        prompt: "Find the 4th term from the end of the AP 3, 8, 13, ..., 98.",
        steps: [
          "The common difference is 5 and the last term is 98.",
          "4th from the end: \\(98 - 3 \\times 5 = 83\\).",
          "Check: 98, 93, 88, 83 counted back from the end.",
        ],
        answer: "83",
      },
      selfCheckExample: {
        prompt: "The last term of an AP is 60 and its 5th term from the end is 44. Find the common difference.",
        steps: ["\\(60 - 4d = 44\\).", "\\(4d = 16\\), so \\(d = 4\\)."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "Find the 3rd term from the end of the AP 1, 4, 7, ..., 49.", answer: "\\(49 - 2 \\times 3 = 43\\)" },
        { prompt: "An AP has 25 terms. Its 6th term from the end is which term from the start?", answer: "The 20th (\\(25 - 6 + 1\\))" },
        { prompt: "Find the 2nd term from the end of the AP 50, 46, 42, ..., 2.", answer: "6" },
      ],
      pyqExampleId: "9e32a95e-8e6f-485b-8370-0ad50f692f22",
      traps: [
        {
          title: "Getting the direction wrong in a falling AP",
          body:
            "For 50, 46, 42, ..., 2 the common difference is \\(-4\\), so the terms just before 2 are 6, 10, 14. Going back from the end you subtract \\(d\\), which here adds 4.",
        },
        {
          title: "Taking n steps back instead of n minus 1",
          body: "The 5th term from the end is 4 steps back from the last term, so it is \\(l - 4d\\), not \\(l - 5d\\).",
        },
      ],
    },
  ],
};
