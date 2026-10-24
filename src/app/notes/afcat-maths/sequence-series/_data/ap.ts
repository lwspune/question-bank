import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SS_AP_NOTE: SubtopicNote = {
  subtopicName: "Arithmetic Progression",
  title: "Arithmetic Progression: Terms, Counting Terms and Sums",
  oneLineDefinition:
    "A sequence that rises or falls by the same amount at every step: find any term, which term a number is, the progression from two of its terms, the sum of n terms, and the terms hidden in a sum formula.",
  whyItMatters:
    "Almost every question here is one of two formulas, the nth term or the sum of n terms, read forwards or backwards. Marks go on counting: from 4 to 40 in steps of 4 there are 10 terms, not 9. The HARD questions give the sum and ask how many terms, which needs a quadratic, or give the sum as a formula in n and ask for a term.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afss-ap-nth-term",
      name: "The nth term of an AP",
      intuition:
        "An **arithmetic progression** (AP) adds the same number, the common difference \\(d\\), at every step. To reach the nth term from the first you take \\(n - 1\\) steps, not \\(n\\).",
      definition:
        "- The **common difference** is any term minus the one before it: \\(d = a_2 - a_1\\). It can be negative or a fraction.\n" +
        "- The **nth term** is \\(a_n = a + (n - 1)d\\), where \\(a\\) is the first term.\n" +
        "- Any one of \\(a\\), \\(d\\), \\(n\\) and \\(a_n\\) can be found from the other three.\n" +
        "- A falling AP has \\(d < 0\\): for \\(20, 17, 14, \\dots\\) the common difference is \\(-3\\).",
      formula: {
        label: "nth term of an AP",
        latex: "a_n = a + (n - 1)d",
      },
      authoredExample: {
        prompt: "Find the 12th term of the AP \\(3, 8, 13, 18, \\dots\\)",
        steps: [
          "\\(a = 3\\) and \\(d = 8 - 3 = 5\\).",
          "\\(a_{12} = 3 + 11 \\times 5 = 3 + 55 = 58\\).",
        ],
        answer: "\\(58\\).",
      },
      selfCheckExample: {
        prompt: "The 9th term of an AP is 50 and its common difference is 6. Find the first term.",
        steps: ["\\(50 = a + 8 \\times 6 = a + 48\\).", "So \\(a = 2\\)."],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Find the 10th term of the AP \\(2, 6, 10, 14, \\dots\\)", answer: "\\(38\\)" },
        { prompt: "Find the 8th term of the AP \\(30, 26, 22, \\dots\\)", answer: "\\(2\\)", method: "\\(d = -4\\), so \\(30 + 7(-4)\\)." },
        { prompt: "Find the common difference of the AP \\(\\tfrac 12, 1, \\tfrac 32, \\dots\\)", answer: "\\(\\tfrac 12\\)" },
        { prompt: "Find the 30th term of the AP \\(7, 10, 13, \\dots\\)", answer: "\\(94\\)" },
      ],
      pyqExampleId: "77ef87f0-88a8-49d2-838c-60a291661fd3",
      traps: [
        {
          title: "n minus 1 steps, not n",
          body: "The 10th term of \\(3, 8, 13, \\dots\\) is \\(3 + 9 \\times 5 = 48\\). Using \\(10 \\times 5\\) gives 53, one step too far.",
        },
        {
          title: "Subtract in order",
          body: "\\(d\\) is a later term minus the earlier one. For \\(20, 17, 14\\) it is \\(17 - 20 = -3\\). Reading it as 3 sends the progression the wrong way.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-ap-which-term",
      name: "Which term is it, and how many terms are there",
      intuition:
        "Run the nth-term formula backwards. Set \\(a + (n - 1)d\\) equal to the number and solve for \\(n\\). A whole-number \\(n\\) means the number is a term; a fraction means it is not. The position of the last term is the number of terms.",
      definition:
        "- Is \\(x\\) a term? Solve \\(x = a + (n - 1)d\\). It is a term only if \\(n\\) comes out a positive whole number.\n" +
        "- Number of terms from \\(a\\) to the last term \\(l\\): \\(n = \\dfrac{l - a}{d} + 1\\).\n" +
        "- Terms below a bound \\(B\\): solve \\(a + (n - 1)d < B\\) and take the largest whole \\(n\\). Check that the next term goes past \\(B\\).\n" +
        "- 'How many two-digit multiples of 6' is the same count: the AP \\(12, 18, \\dots, 96\\).",
      formula: {
        label: "Number of terms",
        latex: "n = \\dfrac{l - a}{d} + 1",
      },
      authoredExample: {
        prompt: "How many terms are there in the AP \\(6, 10, 14, \\dots, 102\\)?",
        steps: [
          "\\(a = 6\\), \\(d = 4\\) and \\(l = 102\\).",
          "\\(n = \\dfrac{102 - 6}{4} + 1 = 24 + 1 = 25\\).",
        ],
        answer: "25 terms.",
      },
      selfCheckExample: {
        prompt: "Is 90 a term of the AP \\(3, 8, 13, \\dots\\)? How many terms of this AP are less than 60?",
        steps: [
          "\\(90 = 3 + 5(n - 1)\\) gives \\(n - 1 = 17.4\\), not a whole number, so 90 is not a term.",
          "\\(3 + 5(n - 1) < 60\\) gives \\(n - 1 < 11.4\\), so \\(n - 1 \\le 11\\) and \\(n \\le 12\\).",
          "Check: the 12th term is 58 and the 13th is 63.",
        ],
        answer: "No; 12 terms.",
      },
      practiceSet: [
        { prompt: "Which term of the AP \\(5, 9, 13, \\dots\\) is 69?", answer: "The 17th", method: "\\(64 \\div 4 = 16\\) steps." },
        { prompt: "How many terms are there in the AP \\(11, 14, 17, \\dots, 98\\)?", answer: "\\(30\\)" },
        { prompt: "How many two-digit numbers are divisible by 6?", answer: "\\(15\\)", method: "\\(12, 18, \\dots, 96\\)." },
        { prompt: "Which term of the AP \\(40, 37, 34, \\dots\\) is \\(-2\\)?", answer: "The 15th" },
      ],
      pyqExampleId: "44ccc2a7-64eb-481a-a8ad-f047430fb3b0",
      traps: [
        {
          title: "Add the 1",
          body: "From 6 to 102 in steps of 4 there are 24 steps but 25 terms. Dividing the gap by \\(d\\) counts the steps, not the terms.",
        },
        {
          title: "A fraction means no",
          body: "If solving gives \\(n - 1 = 17.4\\), the number is not in the AP at all. Do not round it to the nearest term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-ap-two-terms",
      name: "An AP from two of its terms",
      intuition:
        "Two terms fix an AP. The gap between them is a whole number of common differences: from the 3rd term to the 8th is 5 steps. Divide the gap by the steps to get \\(d\\), then step back to the first term.",
      definition:
        "- \\(a_q - a_p = (q - p)d\\), so \\(d = \\dfrac{a_q - a_p}{q - p}\\).\n" +
        "- Then the first term is \\(a = a_p - (p - 1)d\\).\n" +
        "- The first term counts as a term: \\(a_1\\) and \\(a_8\\) are 7 steps apart.",
      formula: {
        label: "Difference from two terms",
        latex: "d = \\dfrac{a_q - a_p}{q - p}",
      },
      authoredExample: {
        prompt: "The 4th term of an AP is 14 and the 10th term is 32. Find the first term and the 20th term.",
        steps: [
          "\\(6d = 32 - 14 = 18\\), so \\(d = 3\\).",
          "\\(a = 14 - 3 \\times 3 = 5\\).",
          "\\(a_{20} = 5 + 19 \\times 3 = 62\\).",
        ],
        answer: "First term 5; 20th term 62.",
      },
      selfCheckExample: {
        prompt: "In an AP, \\(a_3 = 17\\) and \\(a_7 = 5\\). Find \\(d\\) and the first term.",
        steps: ["\\(4d = 5 - 17 = -12\\), so \\(d = -3\\).", "\\(a = 17 - 2(-3) = 23\\)."],
        answer: "\\(d = -3\\), \\(a = 23\\).",
      },
      practiceSet: [
        { prompt: "In an AP, \\(a_1 = 4\\) and \\(a_6 = 29\\). Find \\(d\\).", answer: "\\(5\\)" },
        { prompt: "In an AP, \\(a_2 = 9\\) and \\(a_6 = 25\\). Find the first term.", answer: "\\(5\\)", method: "\\(d = 4\\)." },
        { prompt: "In an AP, \\(a_5 = 30\\) and \\(a_{12} = 58\\). Find \\(a_{20}\\).", answer: "\\(90\\)", method: "\\(d = 4\\), \\(a = 14\\)." },
      ],
      pyqExampleId: "c041bee2-f9db-43b3-8972-c689a2647dcc",
      traps: [
        {
          title: "Count the steps, not the positions",
          body: "Between the 4th and 10th terms there are \\(10 - 4 = 6\\) steps. Dividing the gap by 7, or by 10, gives the wrong \\(d\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-ap-sum",
      name: "Sum of the first n terms",
      intuition:
        "Pair the first term with the last, the second with the second last, and so on: every pair has the same total. So the sum is the number of terms times the average of the first and last terms.",
      definition:
        "- With the last term \\(l\\) known: \\(S_n = \\dfrac n2 (a + l)\\).\n" +
        "- Without it: \\(S_n = \\dfrac n2 [2a + (n - 1)d]\\).\n" +
        "- If only the last term is given, find the number of terms first (previous concepts).\n" +
        "- Given the sum and asked for \\(n\\): put the sum into the second form, clear the 2, and solve the quadratic in \\(n\\). Only a positive whole root counts.",
      formula: {
        label: "Sum of n terms of an AP",
        latex: "S_n = \\dfrac n2 (a + l) = \\dfrac n2 [2a + (n - 1)d]",
      },
      authoredExample: {
        prompt: "Find the sum of the first 16 terms of the AP \\(3, 7, 11, \\dots\\)",
        steps: [
          "\\(a = 3\\), \\(d = 4\\), and the 16th term is \\(3 + 15 \\times 4 = 63\\).",
          "\\(S_{16} = \\dfrac{16}{2}(3 + 63) = 8 \\times 66 = 528\\).",
        ],
        answer: "\\(528\\).",
      },
      selfCheckExample: {
        prompt: "How many terms of the AP \\(2, 5, 8, \\dots\\) add up to 155?",
        steps: [
          "\\(155 = \\dfrac n2 [4 + 3(n - 1)] = \\dfrac{n(3n + 1)}{2}\\).",
          "\\(3n^2 + n - 310 = 0\\). The discriminant is \\(1 + 3720 = 3721 = 61^2\\), so \\(n = \\dfrac{-1 + 61}{6} = 10\\).",
          "Check: \\(S_{10} = 5(4 + 27) = 155\\).",
        ],
        answer: "10 terms.",
      },
      practiceSet: [
        { prompt: "Find the sum of the first 12 terms of the AP \\(5, 8, 11, \\dots\\)", answer: "\\(258\\)" },
        { prompt: "An AP has first term 4, last term 46 and 15 terms. Find its sum.", answer: "\\(375\\)" },
        { prompt: "Find \\(6 + 12 + 18 + \\dots + 120\\).", answer: "\\(1260\\)", method: "20 terms, \\(10 \\times 126\\)." },
        { prompt: "Find the sum of the first 10 terms of the AP \\(20, 17, 14, \\dots\\)", answer: "\\(65\\)" },
      ],
      pyqExampleId: "f54e9e4c-c280-4f4b-8cf9-39bdb23c4db5",
      traps: [
        {
          title: "Two roots, one answer",
          body: "\\(3n^2 + n - 310 = 0\\) has roots 10 and \\(-\\tfrac{31}{3}\\). A number of terms is a positive whole number, so only 10 counts.",
        },
        {
          title: "2a inside the bracket",
          body: "The bracket in \\(\\dfrac n2 [2a + (n - 1)d]\\) holds twice the first term. Writing \\(a\\) there undercounts every pair, and the answer lands on a distractor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-ap-sum-to-term",
      name: "From a sum formula to the nth term",
      intuition:
        "When the sum of \\(n\\) terms is given as a formula in \\(n\\), the nth term is what the nth term adds to the sum: \\(S_n - S_{n-1}\\). The first term is simply \\(S_1\\).",
      definition:
        "- \\(a_n = S_n - S_{n-1}\\) for \\(n \\ge 2\\), and \\(a_1 = S_1\\).\n" +
        "- For one particular term, skip the algebra: \\(a_5 = S_5 - S_4\\).\n" +
        "- If \\(S_n = pn^2 + qn\\), the AP has \\(d = 2p\\) and first term \\(p + q\\), so \\(a_n = 2pn + (q - p)\\).",
      formula: {
        label: "nth term from the sum",
        latex: "a_n = S_n - S_{n-1}",
      },
      authoredExample: {
        prompt: "The sum of \\(n\\) terms of an AP is \\(2n^2 + 5n\\). Find the nth term and the 10th term.",
        steps: [
          "\\(S_{n-1} = 2(n - 1)^2 + 5(n - 1) = 2n^2 + n - 3\\).",
          "\\(a_n = (2n^2 + 5n) - (2n^2 + n - 3) = 4n + 3\\).",
          "\\(a_{10} = 43\\). Check with \\(d = 2p = 4\\) and first term \\(p + q = 7\\).",
        ],
        answer: "\\(a_n = 4n + 3\\); \\(a_{10} = 43\\).",
      },
      selfCheckExample: {
        prompt: "The sum of \\(n\\) terms of an AP is \\(4n^2 - n\\). Find the first term and the common difference.",
        steps: ["\\(a_1 = S_1 = 3\\).", "\\(a_2 = S_2 - S_1 = 14 - 3 = 11\\), so \\(d = 8\\)."],
        answer: "First term 3, \\(d = 8\\).",
      },
      practiceSet: [
        { prompt: "The sum of \\(n\\) terms of an AP is \\(n^2 + 4n\\). Find the 6th term.", answer: "\\(15\\)", method: "\\(S_6 - S_5 = 60 - 45\\)." },
        { prompt: "The sum of \\(n\\) terms of an AP is \\(5n^2 + n\\). Find the nth term.", answer: "\\(10n - 4\\)" },
        { prompt: "The sum of \\(n\\) terms of an AP is \\(2n^2 + 3n\\). Which term is 45?", answer: "The 11th", method: "\\(a_n = 4n + 1\\)." },
      ],
      pyqExampleId: "59c6249a-e74c-44f8-b580-93f965e4c7fb",
      traps: [
        {
          title: "S of n is not the nth term",
          body: "Putting \\(n = 6\\) into the sum formula gives the sum of six terms, not the sixth term. Subtract \\(S_5\\) from it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-ap-middle-term",
      name: "Symmetric terms and the middle term",
      intuition:
        "In an AP the middle term is the average of the terms around it. So three unknown terms are best written \\(a - d, a, a + d\\): their sum is \\(3a\\), and \\(d\\) drops out.",
      definition:
        "- Three numbers in AP: write \\(a - d, a, a + d\\). The sum is \\(3a\\) and the product is \\(a(a^2 - d^2)\\).\n" +
        "- \\(a, b, c\\) are in AP exactly when \\(2b = a + c\\): the middle one is the **arithmetic mean** of the other two.\n" +
        "- With an odd number \\(n\\) of terms, the middle term is the average of all of them, so the sum is \\(n\\) times the middle term.\n" +
        "- Four numbers in AP: write \\(a - 3d, a - d, a + d, a + 3d\\) (the common difference is \\(2d\\)).",
      formula: {
        label: "Three terms in AP",
        latex: "a - d,\\; a,\\; a + d \\qquad \\text{sum} = 3a",
      },
      authoredExample: {
        prompt: "Three numbers in AP add up to 24 and their product is 480. Find them.",
        steps: [
          "\\(3a = 24\\), so \\(a = 8\\).",
          "\\(8(64 - d^2) = 480\\), so \\(64 - d^2 = 60\\) and \\(d = \\pm 2\\).",
          "Either sign gives the same three numbers.",
        ],
        answer: "6, 8, 10.",
      },
      selfCheckExample: {
        prompt: "An AP has 11 terms and its middle term is 14. Find the sum of all its terms.",
        steps: ["The middle term is the average of the 11 terms.", "Sum \\(= 11 \\times 14\\)."],
        answer: "\\(154\\).",
      },
      practiceSet: [
        { prompt: "Find \\(x\\) if \\(3, x, 17\\) are in AP.", answer: "\\(10\\)" },
        { prompt: "Three numbers in AP add up to 27 and the smallest is 4. Find the largest.", answer: "\\(14\\)", method: "The middle one is 9." },
        {
          prompt: "Three numbers in AP have sum 18 and the sum of their squares is 140. Find them.",
          answer: "2, 6, 10",
          method: "\\(a = 6\\) and \\(108 + 2d^2 = 140\\).",
        },
      ],
      pyqExampleId: "a07c5b40-90b7-42e7-bb44-25c06bfc76c4",
      traps: [
        {
          title: "Centre on the middle term",
          body: "With \\(a, a + d, a + 2d\\) the sum is \\(3a + 3d\\) and both unknowns stay. Writing \\(a - d, a, a + d\\) makes the sum give \\(a\\) at once.",
        },
        {
          title: "Both signs of d",
          body: "\\(d^2 = 4\\) gives \\(d = 2\\) or \\(d = -2\\). Both give the same three numbers in opposite order, so neither is lost.",
        },
      ],
    },
  ],
};
