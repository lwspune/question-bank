import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SS_GP_NOTE: SubtopicNote = {
  subtopicName: "Geometric Progression",
  title: "Geometric Progression: Terms, Sums and the Sum to Infinity",
  oneLineDefinition:
    "A sequence that is multiplied by the same number at every step: find any term, which term a number is, the progression from two of its terms, the sum of n terms and the sum to infinity.",
  whyItMatters:
    "The questions mirror the AP page with multiplying in place of adding, and the same slip costs marks: the ratio is used one time fewer than the term number. The new idea is the sum to infinity, which exists only when the ratio lies between minus 1 and 1. The HARD questions run the formulas backwards to find the number of terms, the first term or the ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afss-gp-nth-term",
      name: "The nth term of a GP",
      intuition:
        "A **geometric progression** (GP) multiplies by the same number, the common ratio \\(r\\), at every step. From the first term to the nth there are \\(n - 1\\) steps, so \\(r\\) is used \\(n - 1\\) times.",
      definition:
        "- The **common ratio** is any term divided by the one before it: \\(r = \\dfrac{a_2}{a_1}\\). It can be negative or a fraction.\n" +
        "- The **nth term** is \\(a_n = ar^{n-1}\\).\n" +
        "- A negative ratio makes the signs alternate: odd powers of \\(r\\) are negative, even powers positive.\n" +
        "- Given a term and the ratio, the first term is \\(a = \\dfrac{a_n}{r^{n-1}}\\).",
      formula: {
        label: "nth term of a GP",
        latex: "a_n = a r^{n-1}",
      },
      authoredExample: {
        prompt: "Find the 6th term of the GP \\(3, 6, 12, \\dots\\)",
        steps: ["\\(a = 3\\) and \\(r = \\dfrac 63 = 2\\).", "\\(a_6 = 3 \\times 2^5 = 3 \\times 32 = 96\\)."],
        answer: "\\(96\\).",
      },
      selfCheckExample: {
        prompt: "A GP has first term 4 and common ratio \\(-3\\). Find its 4th and 5th terms.",
        steps: [
          "\\(a_4 = 4 \\times (-3)^3 = 4 \\times (-27) = -108\\).",
          "\\(a_5 = 4 \\times (-3)^4 = 4 \\times 81 = 324\\).",
        ],
        answer: "\\(-108\\) and \\(324\\).",
      },
      practiceSet: [
        { prompt: "Find the 5th term of the GP \\(1, 4, 16, \\dots\\)", answer: "\\(256\\)" },
        { prompt: "Find the 6th term of the GP \\(64, 32, 16, \\dots\\)", answer: "\\(2\\)", method: "\\(64 \\times \\left(\\tfrac 12\\right)^5\\)." },
        { prompt: "The 5th term of a GP is 48 and the common ratio is 2. Find the first term.", answer: "\\(3\\)" },
        { prompt: "Find the common ratio of the GP \\(\\tfrac 13, 1, 3, \\dots\\)", answer: "\\(3\\)" },
      ],
      pyqExampleId: "973360bd-e30a-4989-9209-66c6e3f653b9",
      traps: [
        {
          title: "r to the power n minus 1",
          body: "The 6th term of \\(3, 6, 12, \\dots\\) is \\(3 \\times 2^5 = 96\\). Using \\(2^6\\) gives 192, the 7th term.",
        },
        {
          title: "Bracket a negative ratio",
          body: "With \\(r = -3\\), \\((-3)^4 = 81\\) but \\(-3^4 = -81\\). Drop the bracket and every even-numbered term comes out with the wrong sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-gp-which-term",
      name: "Which term is it, and how many terms",
      intuition:
        "Divide the number by the first term and ask which power of \\(r\\) is left. If \\(\\dfrac xa = r^k\\), the number is term \\(k + 1\\), because the first term already carries \\(r^0\\).",
      definition:
        "- \\(x = ar^{n-1}\\) means \\(r^{n-1} = \\dfrac xa\\). Write that as a power of \\(r\\) and read off \\(n - 1\\).\n" +
        "- If \\(\\dfrac xa\\) is not a whole power of \\(r\\), \\(x\\) is not a term.\n" +
        "- Number of terms from \\(a\\) to the last term \\(l\\): \\(r^{n-1} = \\dfrac la\\), then add 1 to the power.\n" +
        "- Powers worth knowing: \\(2^{10} = 1024\\), \\(3^5 = 243\\), \\(4^5 = 1024\\), \\(5^4 = 625\\).",
      formula: {
        label: "Position of a term",
        latex: "r^{n-1} = \\dfrac{a_n}{a}",
      },
      authoredExample: {
        prompt: "Which term of the GP \\(5, 10, 20, \\dots\\) is 640?",
        steps: ["\\(r = 2\\) and \\(\\dfrac{640}{5} = 128 = 2^7\\).", "So \\(n - 1 = 7\\) and \\(n = 8\\)."],
        answer: "The 8th term.",
      },
      selfCheckExample: {
        prompt: "How many terms are there in the GP \\(3, 12, 48, \\dots, 3072\\)?",
        steps: ["\\(r = 4\\) and \\(\\dfrac{3072}{3} = 1024 = 4^5\\).", "So \\(n - 1 = 5\\)."],
        answer: "6 terms.",
      },
      practiceSet: [
        { prompt: "Which term of the GP \\(1, 3, 9, \\dots\\) is 243?", answer: "The 6th" },
        { prompt: "How many terms are there in the GP \\(2, 4, 8, \\dots, 1024\\)?", answer: "\\(10\\)", method: "\\(\\tfrac{1024}{2} = 2^9\\)." },
        { prompt: "Is 300 a term of the GP \\(4, 12, 36, \\dots\\)?", answer: "No", method: "\\(\\tfrac{300}{4} = 75\\) is not a power of 3." },
        { prompt: "Which term of the GP \\(\\tfrac 12, 1, 2, \\dots\\) is 64?", answer: "The 8th", method: "\\(64 \\div \\tfrac 12 = 128 = 2^7\\)." },
      ],
      pyqExampleId: "0d59ae51-06a2-4bd4-96fa-6af519d5fbaf",
      traps: [
        {
          title: "The power plus one",
          body: "If \\(\\dfrac xa = 2^7\\), the number is the 8th term, not the 7th. The power counts the steps, and the first term is one term before any step.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-gp-two-terms",
      name: "A GP from two of its terms, and the middle term",
      intuition:
        "Dividing one term by another cancels \\(a\\) and leaves a power of \\(r\\): the 7th term over the 4th is \\(r^3\\). Multiplying two terms that sit equally far from a middle term gives the middle term squared.",
      definition:
        "- \\(\\dfrac{a_q}{a_p} = r^{q-p}\\). Find \\(r\\), then the first term \\(a = \\dfrac{a_p}{r^{p-1}}\\).\n" +
        "- An even power has two real roots: \\(r^2 = 9\\) gives \\(r = 3\\) or \\(r = -3\\). Keep both unless the question rules one out.\n" +
        "- \\(a, b, c\\) are in GP exactly when \\(b^2 = ac\\): the middle one is the **geometric mean** \\(\\sqrt{ac}\\) of the other two.\n" +
        "- More generally \\(a_{m-k} \\times a_{m+k} = (a_m)^2\\) for any \\(k\\).\n" +
        "- When the terms are expressions in an unknown, set \\(b^2 = ac\\) and solve. Reject a value that makes a term zero.",
      formula: {
        label: "Ratio from two terms",
        latex: "\\dfrac{a_q}{a_p} = r^{\\,q-p}",
      },
      authoredExample: {
        prompt: "The 2nd term of a GP is 15 and the 5th term is 405. Find the common ratio and the first term.",
        steps: [
          "\\(r^3 = \\dfrac{405}{15} = 27\\), so \\(r = 3\\).",
          "\\(a = \\dfrac{15}{3} = 5\\).",
        ],
        answer: "\\(r = 3\\), first term 5.",
      },
      selfCheckExample: {
        prompt: "If \\(x, x + 3, x + 9\\) are in GP, find \\(x\\) and the common ratio.",
        steps: [
          "\\((x + 3)^2 = x(x + 9)\\) gives \\(x^2 + 6x + 9 = x^2 + 9x\\).",
          "So \\(3x = 9\\) and \\(x = 3\\). The GP is \\(3, 6, 12\\).",
        ],
        answer: "\\(x = 3\\), ratio 2.",
      },
      practiceSet: [
        { prompt: "In a GP, \\(a_1 = 3\\) and \\(a_4 = 81\\). Find the common ratio.", answer: "\\(3\\)" },
        { prompt: "In a GP, \\(a_3 = 12\\) and \\(a_5 = 48\\). Find the possible values of the common ratio.", answer: "\\(2\\) or \\(-2\\)" },
        { prompt: "Find the geometric mean of 9 and 25.", answer: "\\(15\\)" },
        {
          prompt: "The 3rd term of a GP is 5. Find the product of its first five terms.",
          answer: "\\(3125\\)",
          method: "The terms pair off around the 3rd: the product is \\(5^5\\).",
        },
      ],
      pyqExampleId: "f1141840-2e0c-4a86-9933-2edb37e1d8e6",
      traps: [
        {
          title: "Two square roots",
          body: "\\(r^2 = 25\\) gives \\(r = 5\\) or \\(r = -5\\). Writing only 5 loses an answer when the options list both signs, or list them together as \\(\\pm 5\\).",
        },
        {
          title: "No term can be zero",
          body: "When \\(b^2 = ac\\) gives two values of \\(x\\), test each in the terms. A value that makes a term zero, such as \\(x = -2\\) when one term is \\(x + 2\\), is not allowed: use the other root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-gp-sum",
      name: "Sum of the first n terms",
      intuition:
        "Multiply the sum by \\(r\\) and subtract the original: every term cancels except the first and the one just past the last. That leaves \\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\).",
      definition:
        "- \\(S_n = \\dfrac{a(r^n - 1)}{r - 1}\\). For \\(r < 1\\) the same thing reads more easily as \\(\\dfrac{a(1 - r^n)}{1 - r}\\).\n" +
        "- If \\(r = 1\\), every term is \\(a\\) and \\(S_n = na\\).\n" +
        "- Given the sum and asked for \\(n\\): solve for \\(r^n\\) first, then read off the power.\n" +
        "- The sum uses \\(r^n\\), while the nth term uses \\(r^{n-1}\\).",
      formula: {
        label: "Sum of n terms of a GP",
        latex: "S_n = \\dfrac{a(r^n - 1)}{r - 1}, \\quad r \\ne 1",
      },
      authoredExample: {
        prompt: "Find the sum of the first 6 terms of the GP \\(5, 15, 45, \\dots\\)",
        steps: [
          "\\(a = 5\\), \\(r = 3\\), \\(n = 6\\).",
          "\\(S_6 = \\dfrac{5(3^6 - 1)}{3 - 1} = \\dfrac{5 \\times 728}{2} = 1820\\).",
        ],
        answer: "\\(1820\\).",
      },
      selfCheckExample: {
        prompt: "How many terms of the GP \\(3, 6, 12, \\dots\\) add up to 381?",
        steps: ["\\(3(2^n - 1) = 381\\), so \\(2^n - 1 = 127\\).", "\\(2^n = 128 = 2^7\\)."],
        answer: "7 terms.",
      },
      practiceSet: [
        { prompt: "Find the sum of the first 5 terms of the GP \\(1, 4, 16, \\dots\\)", answer: "\\(341\\)", method: "\\(\\tfrac{1023}{3}\\)." },
        { prompt: "Find \\(6 + 12 + 24 + \\dots\\) to 5 terms.", answer: "\\(186\\)" },
        { prompt: "Find \\(81 + 27 + 9 + 3 + 1\\).", answer: "\\(121\\)" },
        { prompt: "Find the sum of the first 4 terms of the GP \\(2, -4, 8, \\dots\\)", answer: "\\(-10\\)", method: "\\(\\tfrac{2((-2)^4 - 1)}{-3}\\)." },
      ],
      pyqExampleId: "cbf9b804-8d70-478a-82c8-7b981428e11f",
      traps: [
        {
          title: "r to the n, not n minus 1",
          body: "The sum of 6 terms uses \\(r^6\\); the 6th term uses \\(r^5\\). Mixing them up is the commonest slip on this page.",
        },
        {
          title: "Subtract 1 before multiplying",
          body: "With \\(a = 5\\), \\(r = 2\\) and \\(n = 4\\), the sum is \\(5(2^4 - 1) = 75\\), not \\(5 \\times 2^4 = 80\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-gp-infinite",
      name: "Sum to infinity",
      intuition:
        "When the ratio lies between minus 1 and 1, the terms shrink towards zero and the running total settles at a fixed value. Start at 3 and take a third each time: \\(3 + 1 + \\tfrac 13 + \\dots\\) never passes 4.5.",
      definition:
        "- \\(S_\\infty = \\dfrac{a}{1 - r}\\), valid only when \\(-1 < r < 1\\).\n" +
        "- For \\(r \\ge 1\\) or \\(r \\le -1\\) the terms do not shrink and there is no sum to infinity.\n" +
        "- Given \\(S_\\infty\\) and \\(a\\): \\(1 - r = \\dfrac{a}{S_\\infty}\\), so \\(r = 1 - \\dfrac{a}{S_\\infty}\\).\n" +
        "- A negative ratio works too: \\(r = -\\tfrac 13\\) gives \\(S_\\infty = \\dfrac{a}{4/3} = \\tfrac{3a}{4}\\).\n" +
        "- The sum of \\(n\\) terms in terms of the sum to infinity: \\(S_n = S_\\infty(1 - r^n)\\).",
      formula: {
        label: "Sum to infinity",
        latex: "S_\\infty = \\dfrac{a}{1 - r}, \\quad -1 < r < 1",
      },
      authoredExample: {
        prompt: "Find the sum to infinity of \\(9 + 3 + 1 + \\tfrac 13 + \\dots\\)",
        steps: ["\\(a = 9\\) and \\(r = \\tfrac 13\\).", "\\(S_\\infty = \\dfrac{9}{1 - \\tfrac 13} = \\dfrac{9}{2/3} = 13.5\\)."],
        answer: "\\(13.5\\).",
      },
      selfCheckExample: {
        prompt: "The sum to infinity of a GP is 15 and its first term is 5. Find the common ratio.",
        steps: ["\\(1 - r = \\dfrac{5}{15} = \\dfrac 13\\).", "So \\(r = \\dfrac 23\\)."],
        answer: "\\(\\tfrac 23\\).",
      },
      practiceSet: [
        { prompt: "Find the sum to infinity of \\(20 + 5 + \\tfrac 54 + \\dots\\)", answer: "\\(\\tfrac{80}{3}\\)" },
        { prompt: "Find the sum to infinity of \\(1 - \\tfrac 13 + \\tfrac 19 - \\dots\\)", answer: "\\(\\tfrac 34\\)" },
        { prompt: "A GP has sum to infinity 10 and common ratio \\(\\tfrac 35\\). Find its first term.", answer: "\\(4\\)" },
        { prompt: "Find the sum to infinity of \\(0.3 + 0.03 + 0.003 + \\dots\\)", answer: "\\(\\tfrac 13\\)" },
      ],
      pyqExampleId: "f9877f55-1844-4e21-8530-cc5a31a09d79",
      traps: [
        {
          title: "Only when the terms shrink",
          body: "\\(2 + 4 + 8 + \\dots\\) has no sum to infinity. Putting \\(r = 2\\) into \\(\\dfrac{a}{1 - r}\\) gives \\(-2\\), which means nothing.",
        },
        {
          title: "1 minus r, not r minus 1",
          body: "The denominator is \\(1 - r\\). For \\(9 + 3 + 1 + \\dots\\), \\(\\dfrac{9}{r - 1}\\) gives \\(-13.5\\), a negative sum of positive terms.",
        },
      ],
    },
  ],
};
