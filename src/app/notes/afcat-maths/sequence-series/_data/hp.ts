import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SS_HP_NOTE: SubtopicNote = {
  subtopicName: "Harmonic Progression and Means",
  title: "Harmonic Progression, and the Three Means",
  oneLineDefinition:
    "Numbers whose reciprocals form an AP, the harmonic mean of two numbers, the tests that say whether three numbers are in AP, GP or HP, and how the arithmetic, geometric and harmonic means compare.",
  whyItMatters:
    "There is no new formula for a harmonic progression: flip every term, work in the AP, and flip back at the end. Marks go when the last flip is forgotten, or when the harmonic mean is taken as the average of the reciprocals. This is the chapter's hardest page, and its HARD questions ask which of the three means is largest or mix arithmetic and harmonic means inserted between the same two numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afss-hp-terms",
      name: "Terms of an HP through the reciprocals",
      intuition:
        "\\(\\tfrac 12, \\tfrac 14, \\tfrac 16, \\tfrac 18, \\dots\\) is not an AP, but turn each term upside down and you get \\(2, 4, 6, 8, \\dots\\), which is. A sequence is a **harmonic progression** (HP) when the reciprocals of its terms are in AP.",
      definition:
        "- Flip every given term, find the AP's first term and common difference, find the term you need in the AP, then flip it back.\n" +
        "- The nth term of an HP is \\(\\dfrac{1}{a + (n - 1)d}\\), where \\(a\\) and \\(d\\) belong to the AP of reciprocals.\n" +
        "- Given two terms of an HP, flip both and use the two-term method from the Arithmetic Progression page.\n" +
        "- 'The common difference of the HP' in a question means the common difference of the reciprocals. An HP has no common difference of its own.\n" +
        "- No term of an HP can be zero.",
      formula: {
        label: "nth term of an HP",
        latex: "h_n = \\dfrac{1}{a + (n - 1)d}",
      },
      authoredExample: {
        prompt: "Find the 8th term of the HP \\(\\tfrac 12, \\tfrac 16, \\tfrac 1{10}, \\dots\\)",
        steps: [
          "The reciprocals \\(2, 6, 10, \\dots\\) are an AP with \\(a = 2\\) and \\(d = 4\\).",
          "The 8th reciprocal is \\(2 + 7 \\times 4 = 30\\).",
          "Flip it back.",
        ],
        answer: "\\(\\tfrac 1{30}\\).",
      },
      selfCheckExample: {
        prompt: "The 3rd term of an HP is \\(\\tfrac 1{12}\\) and the 6th term is \\(\\tfrac 1{21}\\). Find the first term.",
        steps: [
          "The reciprocals have 3rd term 12 and 6th term 21, so \\(3d = 9\\) and \\(d = 3\\).",
          "The first reciprocal is \\(12 - 2 \\times 3 = 6\\).",
        ],
        answer: "\\(\\tfrac 16\\).",
      },
      practiceSet: [
        { prompt: "Find the 5th term of the HP \\(\\tfrac 12, \\tfrac 17, \\tfrac 1{12}, \\dots\\)", answer: "\\(\\tfrac 1{22}\\)" },
        { prompt: "Find the 4th term of the HP \\(6, 3, 2, \\dots\\)", answer: "\\(\\tfrac 32\\)", method: "The reciprocals step up by \\(\\tfrac 16\\), so the 4th is \\(\\tfrac 46\\)." },
        { prompt: "The nth term of an HP is \\(\\dfrac{1}{3n + 1}\\). Find its 10th term.", answer: "\\(\\tfrac 1{31}\\)" },
        { prompt: "Are \\(\\tfrac 16, \\tfrac 18, \\tfrac 1{10}\\) in HP?", answer: "Yes", method: "\\(6, 8, 10\\) is an AP." },
      ],
      pyqExampleId: "03c17a91-c566-4196-8cc9-c265ce3f665f",
      traps: [
        {
          title: "Flip back at the end",
          body: "In \\(\\tfrac 12, \\tfrac 16, \\tfrac 1{10}, \\dots\\) the 8th reciprocal is 30, so the 8th term is \\(\\tfrac 1{30}\\). Answering 30 forgets the last step.",
        },
        {
          title: "The terms themselves do not step evenly",
          body: "In the HP \\(\\tfrac 17, \\tfrac 1{14}, \\tfrac 1{21}\\) the gaps are \\(\\tfrac 1{14}\\) and \\(\\tfrac 1{42}\\). Only the reciprocals \\(7, 14, 21\\) go up by the same amount.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-hp-mean",
      name: "The harmonic mean of two numbers",
      intuition:
        "If \\(a, H, b\\) are in HP, \\(H\\) is the **harmonic mean** of \\(a\\) and \\(b\\). Its reciprocal is the average of the reciprocals, and that simplifies to \\(\\dfrac{2ab}{a + b}\\).",
      definition:
        "- \\(H = \\dfrac{2ab}{a + b}\\), from \\(\\dfrac 2H = \\dfrac 1a + \\dfrac 1b\\).\n" +
        "- For unit fractions \\(\\tfrac 1p\\) and \\(\\tfrac 1q\\) it is quicker to flip: the reciprocals \\(p\\) and \\(q\\) have mean \\(\\tfrac{p + q}{2}\\), so \\(H = \\dfrac{2}{p + q}\\).\n" +
        "- 'Find \\(y\\) if \\(x, y, z\\) are in HP' asks for the harmonic mean of \\(x\\) and \\(z\\).\n" +
        "- The harmonic mean lies between the two numbers, nearer the smaller one.",
      formula: {
        label: "Harmonic mean",
        latex: "H = \\dfrac{2ab}{a + b}",
      },
      authoredExample: {
        prompt: "Find the harmonic mean of 6 and 10.",
        steps: ["\\(H = \\dfrac{2 \\times 6 \\times 10}{6 + 10} = \\dfrac{120}{16}\\)."],
        answer: "\\(7.5\\).",
      },
      selfCheckExample: {
        prompt: "Find the harmonic mean of \\(\\tfrac 14\\) and \\(\\tfrac 16\\).",
        steps: ["Flip: the reciprocals 4 and 6 have mean 5.", "Flip back."],
        answer: "\\(\\tfrac 15\\).",
      },
      practiceSet: [
        { prompt: "Find the harmonic mean of 5 and 45.", answer: "\\(9\\)" },
        { prompt: "Find the harmonic mean of 10 and 40.", answer: "\\(16\\)" },
        { prompt: "If \\(9, x, 18\\) are in HP, find \\(x\\).", answer: "\\(12\\)" },
        { prompt: "Find the harmonic mean of \\(\\tfrac 13\\) and \\(\\tfrac 15\\).", answer: "\\(\\tfrac 14\\)" },
      ],
      pyqExampleId: "4a7dd94d-5c21-4170-85dd-c91cd19f3e27",
      traps: [
        {
          title: "Not the average of the reciprocals",
          body: "For 6 and 10 the reciprocals average to \\(\\tfrac 2{15}\\), so the harmonic mean is \\(\\tfrac{15}{2} = 7.5\\). Stopping at \\(\\tfrac 2{15}\\) answers a different question.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afss-hp-which-progression",
      name: "AP, GP or HP: the middle-term test",
      intuition:
        "Three numbers \\(a, b, c\\), in that order, are in AP, GP or HP exactly when the middle one is the matching mean of the other two. Test the middle number rather than the gaps.",
      definition:
        "To show a condition means an HP, clear the fractions and aim for \\(b(a + c) = 2ac\\). If the condition factorises, look at every factor: a factor such as \\(a + c - b\\) can make the condition true with no progression at all. When the AP and GP tests both pass, the numbers are equal: \\(2b = a + c\\) and \\(b^2 = ac\\) together force \\((a - c)^2 = 0\\).",
      table: {
        columns: ["Progression", "Middle term b", "Test to check"],
        rows: [
          { cells: ["AP", "Arithmetic mean \\(\\dfrac{a + c}{2}\\)", "\\(2b = a + c\\)"] },
          { cells: ["GP", "Geometric mean \\(\\sqrt{ac}\\)", "\\(b^2 = ac\\)"] },
          {
            cells: ["HP", "Harmonic mean \\(\\dfrac{2ac}{a + c}\\)", "\\(\\dfrac 2b = \\dfrac 1a + \\dfrac 1c\\)"],
            noteAmber: "The HP test is the AP test on the reciprocals.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Are \\(2, 3, 6\\) in AP, GP or HP?",
        steps: [
          "AP: \\(2 \\times 3 = 6\\), but \\(2 + 6 = 8\\). No.",
          "GP: \\(3^2 = 9\\), but \\(2 \\times 6 = 12\\). No.",
          "HP: \\(\\dfrac{2 \\times 2 \\times 6}{2 + 6} = 3\\). Yes.",
        ],
        answer: "HP.",
      },
      practiceSet: [
        { prompt: "Are \\(4, 6, 9\\) in AP, GP or HP?", answer: "GP" },
        { prompt: "Are \\(3, 4, 6\\) in AP, GP or HP?", answer: "HP" },
        { prompt: "\\(x, 10, 25\\) are in GP. Find \\(x\\).", answer: "\\(4\\)" },
      ],
      pyqExampleId: "9f5215c4-c37e-4998-9db1-94d22a9d21ba",
      traps: [
        {
          title: "The order matters",
          body: "The test is on the middle term in the order given. \\(2, 3, 6\\) is an HP, but \\(6, 2, 3\\) is not: the harmonic mean of 6 and 3 is 4, not 2.",
        },
        {
          title: "Equal numbers pass every test",
          body: "\\(5, 5, 5\\) is an AP, a GP and an HP at once. So 'both an AP and a GP' means the three numbers are equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afss-hp-am-gm-hm",
      name: "AM, GM and HM together, and inserted means",
      intuition:
        "For two different positive numbers the three means always come in the same order: the arithmetic mean is the largest, the harmonic mean the smallest, and the geometric mean sits between. For 3 and 12 they are 7.5, 6 and 4.8.",
      definition:
        "- \\(A = \\dfrac{a + b}{2}\\), \\(G = \\sqrt{ab}\\) and \\(H = \\dfrac{2ab}{a + b}\\) for positive \\(a\\) and \\(b\\).\n" +
        "- \\(A \\ge G \\ge H\\), with equality only when \\(a = b\\).\n" +
        "- \\(G^2 = AH\\), so any two of the means give the third.\n" +
        "- **Inserted means**: if \\(n\\) numbers are put between \\(a\\) and \\(b\\) to make an AP, their sum is \\(n \\times \\dfrac{a + b}{2}\\).\n" +
        "- If the \\(n\\) numbers make an HP instead, the sum of their reciprocals is \\(n \\times \\dfrac 12 \\left(\\dfrac 1a + \\dfrac 1b\\right)\\).",
      formula: {
        label: "Order of the three means",
        latex: "A \\ge G \\ge H, \\qquad G^2 = AH",
      },
      authoredExample: {
        prompt:
          "Four numbers are inserted between \\(a\\) and \\(b\\). When they make an AP, they add up to 40. When they make an HP, their reciprocals add up to \\(\\tfrac 58\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "AP: \\(4 \\times \\dfrac{a + b}{2} = 40\\), so \\(a + b = 20\\).",
          "HP: \\(4 \\times \\dfrac 12 \\times \\dfrac{a + b}{ab} = \\dfrac 58\\), so \\(\\dfrac{20}{ab} = \\dfrac{5}{16}\\) and \\(ab = 64\\).",
          "Two numbers with sum 20 and product 64 are the roots of \\(t^2 - 20t + 64 = 0\\).",
        ],
        answer: "4 and 16.",
      },
      selfCheckExample: {
        prompt: "The arithmetic mean of two numbers is 25 and their geometric mean is 20. Find their harmonic mean.",
        steps: ["\\(H = \\dfrac{G^2}{A} = \\dfrac{400}{25}\\)."],
        answer: "\\(16\\).",
      },
      practiceSet: [
        { prompt: "Find the AM, GM and HM of 2 and 18.", answer: "10, 6 and 3.6" },
        { prompt: "The GM of two numbers is 10 and their HM is 8. Find their AM.", answer: "\\(12.5\\)" },
        { prompt: "Three arithmetic means are inserted between 4 and 20. Find their sum.", answer: "\\(36\\)", method: "They are 8, 12 and 16." },
      ],
      pyqExampleId: "dfec7032-1a94-492f-b2b2-0511a1a0f533",
      traps: [
        {
          title: "The order is fixed",
          body: "For two different positive numbers, AM is greater than GM, which is greater than HM. An option that puts HM above GM is wrong without any working.",
        },
        {
          title: "G is not the average of A and H",
          body: "\\(G^2 = AH\\). For 3 and 12, \\(\\tfrac{7.5 + 4.8}{2} = 6.15\\), but the geometric mean is 6.",
        },
      ],
    },
  ],
};
