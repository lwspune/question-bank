import type { SubtopicNote } from "@/app/notes/_types";

export const HARMONIC_MEANS_NOTE: SubtopicNote = {
  subtopicName: "Harmonic Progressions and the Three Means",
  title: "Harmonic Progressions and the Three Means",
  oneLineDefinition:
    "A harmonic progression is just an AP turned upside down — its reciprocals are in AP — and it comes packaged with the three classical means AM, GM, HM and the inequality that orders them.",
  whyItMatters:
    "A small but conceptually central subtopic — five PYQs, but the AM-GM-HM machinery underpins the " +
    "harder interrelating-progressions questions and the compound-trick traps. The one rule to burn " +
    "in: an HP problem is solved by flipping to its AP of reciprocals. There is no \"sum of an HP\" " +
    "formula — that is the trap.",
  concepts: [
    // C1 — HP definition via reciprocals
    {
      kind: "formula" as const,
      slug: "hp-definition",
      name: "Harmonic progression — flip to the reciprocal AP",
      intuition:
        "Numbers are in harmonic progression when their reciprocals are in arithmetic progression. " +
        "That one sentence is the whole method: never work with an HP directly — take reciprocals, " +
        "solve the AP, then flip back. There is deliberately no closed formula for the sum of an HP.",
      definition:
        "\\(a_1, a_2, a_3, \\ldots\\) are in **harmonic progression (HP)** \\(\\iff " +
        "\\tfrac{1}{a_1}, \\tfrac{1}{a_2}, \\tfrac{1}{a_3}, \\ldots\\) are in AP. So the nth term of an HP " +
        "is \\(a_n = \\dfrac{1}{a + (n-1)d}\\), where \\(a, d\\) are the first term and common difference " +
        "of the reciprocal AP. The three-term condition: \\(a, b, c\\) are in HP " +
        "\\(\\iff b = \\dfrac{2ac}{a+c}\\) (equivalently \\(\\tfrac{2}{b} = \\tfrac1a + \\tfrac1c\\)).",
      formula: {
        label: "HP nth term and three-term condition",
        latex: "a_n = \\frac{1}{a + (n-1)d}, \\qquad b = \\frac{2ac}{a+c}\\ \\text{(for } a,b,c \\text{ in HP)}",
      },
      authoredExample: {
        prompt: "Find the 4th term of the HP \\(\\tfrac12, \\tfrac15, \\tfrac18, \\ldots\\)",
        steps: [
          "Take reciprocals: \\(2, 5, 8, \\ldots\\) — an AP with \\(a = 2,\\ d = 3\\).",
          "4th term of the AP: \\(2 + 3(3) = 11\\).",
          "Flip back: the 4th term of the HP is \\(\\tfrac{1}{11}\\).",
        ],
        answer: "\\(\\tfrac{1}{11}\\).",
      },
      selfCheckExample: {
        prompt: "The numbers \\(6, 3, 2\\) — are they in HP, and what is the next term?",
        steps: [
          "Reciprocals: \\(\\tfrac16, \\tfrac13, \\tfrac12\\). Differences: \\(\\tfrac13 - \\tfrac16 = \\tfrac16\\) and \\(\\tfrac12 - \\tfrac13 = \\tfrac16\\) — constant, so it is an AP.",
          "So \\(6, 3, 2\\) are in HP. Next reciprocal: \\(\\tfrac12 + \\tfrac16 = \\tfrac23\\).",
          "Flip back: next HP term \\(= \\tfrac32\\).",
        ],
        answer: "Yes, in HP; next term \\(\\tfrac32\\).",
      },
      practiceSet: [
        { prompt: "Reciprocals of an HP form a?", answer: "AP" },
        { prompt: "Is \\(\\tfrac13, \\tfrac15, \\tfrac17\\) an HP?", answer: "Yes", method: "reciprocals \\(3,5,7\\) in AP" },
        { prompt: "HP three-term condition for \\(a, b, c\\)?", answer: "\\(b = \\tfrac{2ac}{a+c}\\)" },
        { prompt: "There is a formula for the sum of an HP — true or false?", answer: "False" },
      ],
      pyqExampleId: "f0e6f0c2-b3ce-4682-b74a-e4c08c946447", // 2023 — (a+b),2b,(b+c) in HP -> a,b,c in GP
    },

    // C2 — the three means + AM>=GM>=HM
    {
      kind: "formula" as const,
      slug: "three-means-am-gm-hm",
      name: "AM, GM, HM and the inequality that orders them",
      intuition:
        "Two positive numbers have three classical averages. The arithmetic mean is the everyday " +
        "average; the geometric mean is the square root of the product; the harmonic mean is the " +
        "reciprocal-average. For any two unequal positive numbers they line up in a fixed order, " +
        "AM \\(>\\) GM \\(>\\) HM, and the GM is always exactly the geometric mean of the other two.",
      definition:
        "For positive \\(a, b\\):\n" +
        "- **AM** \\(= \\dfrac{a+b}{2}\\), **GM** \\(= \\sqrt{ab}\\), **HM** \\(= \\dfrac{2ab}{a+b}\\).\n" +
        "- **Ordering:** \\(\\text{AM} \\ge \\text{GM} \\ge \\text{HM}\\), with equality only when \\(a = b\\).\n" +
        "- **Key identity:** \\(\\text{GM}^2 = \\text{AM} \\times \\text{HM}\\) — so the GM is the geometric mean of the AM and HM.",
      formula: {
        label: "The three means and their relation",
        latex: "\\text{AM} = \\frac{a+b}{2},\\quad \\text{GM} = \\sqrt{ab},\\quad \\text{HM} = \\frac{2ab}{a+b}, \\qquad \\text{GM}^2 = \\text{AM}\\cdot\\text{HM}",
      },
      visualizationSlug: "am-gm-hm-means",
      authoredExample: {
        prompt: "Find the AM, GM, and HM of \\(4\\) and \\(16\\), and verify \\(\\text{GM}^2 = \\text{AM}\\cdot\\text{HM}\\).",
        steps: [
          "\\(\\text{AM} = \\dfrac{4 + 16}{2} = 10\\).",
          "\\(\\text{GM} = \\sqrt{4 \\times 16} = \\sqrt{64} = 8\\).",
          "\\(\\text{HM} = \\dfrac{2 \\times 4 \\times 16}{4 + 16} = \\dfrac{128}{20} = 6.4\\).",
          "Check: \\(\\text{AM}\\cdot\\text{HM} = 10 \\times 6.4 = 64 = 8^2 = \\text{GM}^2\\). ✓ And \\(10 > 8 > 6.4\\).",
        ],
        answer: "AM \\(= 10\\), GM \\(= 8\\), HM \\(= 6.4\\); the identity holds.",
      },
      selfCheckExample: {
        prompt: "The AM of two positive numbers is 25 and their GM is 20. Find their HM.",
        steps: [
          "Use \\(\\text{GM}^2 = \\text{AM}\\cdot\\text{HM}\\).",
          "\\(20^2 = 25 \\times \\text{HM} \\Rightarrow 400 = 25\\,\\text{HM}\\).",
          "\\(\\text{HM} = 16\\).",
        ],
        answer: "\\(\\text{HM} = 16\\).",
      },
      practiceSet: [
        { prompt: "AM of \\(3\\) and \\(7\\)?", answer: "\\(5\\)" },
        { prompt: "GM of \\(2\\) and \\(8\\)?", answer: "\\(4\\)" },
        { prompt: "HM of \\(3\\) and \\(6\\)?", answer: "\\(4\\)", method: "\\(\\tfrac{2\\cdot18}{9}\\)" },
        { prompt: "If AM \\(=\\) GM for two positive numbers, what must be true?", answer: "They are equal" },
      ],
      pyqExampleId: "4407e957-ff49-44d0-8717-aa98ac609d41", // 2018 — AM:GM = 5:3 -> a:b
      traps: [
        {
          title: "AM ≥ GM ≥ HM only for positives",
          body:
            "The ordering and the equality-when-equal rule need \\(a, b > 0\\). A common NDA setup gives " +
            "AM and GM and asks for HM — reach straight for \\(\\text{HM} = \\tfrac{\\text{GM}^2}{\\text{AM}}\\) " +
            "rather than solving for \\(a, b\\) first.",
        },
      ],
    },

    // C3 — HM of n numbers
    {
      kind: "formula" as const,
      slug: "harmonic-mean-computation",
      name: "Harmonic mean of several numbers",
      intuition:
        "The harmonic mean of a set is the count divided by the sum of reciprocals — it is the right " +
        "average when the quantities are rates (think average speed over equal distances). For two " +
        "numbers it reduces to the familiar \\(\\tfrac{2ab}{a+b}\\).",
      definition:
        "The harmonic mean of \\(n\\) positive numbers \\(x_1, \\ldots, x_n\\) is\n" +
        "\\[ \\text{HM} = \\frac{n}{\\dfrac{1}{x_1} + \\dfrac{1}{x_2} + \\cdots + \\dfrac{1}{x_n}}. \\]\n" +
        "Equivalently, \\(\\tfrac{1}{\\text{HM}}\\) is the arithmetic mean of the reciprocals.",
      formula: {
        label: "Harmonic mean of n numbers",
        latex: "\\text{HM} = \\frac{n}{\\sum_{i=1}^{n} \\frac{1}{x_i}}",
      },
      authoredExample: {
        prompt: "Find the harmonic mean of \\(2, 3,\\) and \\(6\\).",
        steps: [
          "Sum of reciprocals: \\(\\tfrac12 + \\tfrac13 + \\tfrac16 = \\tfrac{3 + 2 + 1}{6} = 1\\).",
          "\\(\\text{HM} = \\dfrac{n}{\\sum 1/x_i} = \\dfrac{3}{1}\\).",
        ],
        answer: "\\(\\text{HM} = 3\\).",
      },
      selfCheckExample: {
        prompt: "Find the harmonic mean of \\(1, 2,\\) and \\(4\\).",
        steps: [
          "Sum of reciprocals: \\(1 + \\tfrac12 + \\tfrac14 = \\tfrac{7}{4}\\).",
          "\\(\\text{HM} = \\dfrac{3}{\\tfrac74} = \\dfrac{12}{7}\\).",
        ],
        answer: "\\(\\tfrac{12}{7}\\).",
      },
      practiceSet: [
        { prompt: "HM of \\(1\\) and \\(1\\)?", answer: "\\(1\\)" },
        { prompt: "HM of \\(2\\) and \\(4\\)?", answer: "\\(\\tfrac{8}{3}\\)", method: "\\(\\tfrac{2\\cdot8}{6}\\)" },
        { prompt: "\\(\\tfrac{1}{\\text{HM}}\\) is the AM of what?", answer: "the reciprocals" },
        { prompt: "HM of \\(3, 3, 3\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "c9f47630-b267-432a-9fe7-11e04699f5a5", // 2023 — HM of binomial coefficients
    },
  ],
  related: [
    { label: "Geometric Progressions", href: "/notes/nda-maths/sequence-series/seq-geometric-progressions" },
    { label: "Interrelating AP, GP and HP", href: "/notes/nda-maths/sequence-series/seq-interrelating-progressions" },
  ],
};
