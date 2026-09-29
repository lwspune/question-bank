import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_MEDIANS_NOTE: SubtopicNote = {
  subtopicName: "Medians and Apollonius Theorem",
  title: "Medians and Apollonius Theorem",
  oneLineDefinition:
    "Apollonius' theorem gives a median from the three sides; in a right triangle, Pythagoras on a point of one leg does the same job; and a perpendicular turns the difference of two squared sides into a difference of two squared pieces.",
  whyItMatters:
    "Fourteen PYQs, and six of them are HARD, more than on any other page. Almost none needs the median formula itself. Most put a point on a leg of a right triangle and ask for a combination of squares, which two Pythagoras equations settle; the rest subtract two Pythagoras equations across an altitude.",
  concepts: [
    // C1 — Apollonius
    {
      kind: "formula" as const,
      slug: "cdstg-apollonius",
      name: "Apollonius' theorem",
      intuition:
        "A median splits the base in half. Write Pythagoras in the two halves, with the altitude from the vertex as a shared leg, and add: the unknown altitude cancels and leaves the median in terms of the sides.",
      definition:
        "If \\(AD\\) is the median to \\(BC\\) (so \\(BD = DC = \\dfrac a2\\)):\n" +
        "- \\(AB^2 + AC^2 = 2(AD^2 + BD^2)\\);\n" +
        "- equivalently \\(m_a^2 = \\dfrac{2b^2 + 2c^2 - a^2}{4}\\);\n" +
        "- adding the three: \\(m_a^2 + m_b^2 + m_c^2 = \\dfrac34(a^2 + b^2 + c^2)\\);\n" +
        "- in a right triangle the median to the hypotenuse is half the hypotenuse.",
      formula: {
        label: "Apollonius' theorem",
        latex: "AB^2 + AC^2 = 2\\left(AD^2 + BD^2\\right)",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(AB = 5\\), \\(AC = 7\\) and \\(BC = 8\\). Find the median \\(AD\\).",
        steps: [
          "\\(BD = 4\\), so \\(25 + 49 = 2(AD^2 + 16)\\).",
          "\\(AD^2 = 37 - 16 = 21\\).",
        ],
        answer: "\\(AD = \\sqrt{21}\\).",
      },
      selfCheckExample: {
        prompt: "A triangle has sides \\(4\\), \\(6\\) and \\(8\\). Find the sum of the squares of its medians.",
        steps: ["\\(\\dfrac34(16 + 36 + 64) = \\dfrac34\\times 116\\)."],
        answer: "\\(87\\).",
      },
      practiceSet: [
        { prompt: "Right triangle with hypotenuse \\(26\\). Median to the hypotenuse?", answer: "\\(13\\)" },
        { prompt: "\\(AB^2 + AC^2 = 50\\), \\(BC = 6\\). Median \\(AD\\)?", answer: "\\(4\\)" },
        { prompt: "Median of an equilateral triangle of side \\(2\\)?", answer: "\\(\\sqrt3\\)" },
        { prompt: "Squares of the sides add to \\(40\\). Squares of the medians add to?", answer: "\\(30\\)" },
      ],
      pyqExampleId: "e9839217-b0fd-4897-a93a-9bf1292c514d", // 2025 (I) — sides k, 1.5k, 2.25k
      traps: [
        {
          title: "Half the base, not the base",
          body:
            "Apollonius uses \\(BD^2 = \\left(\\dfrac{BC}{2}\\right)^2\\). Putting \\(BC^2\\) in its place is the usual slip, and it gives a median that is too short.",
        },
      ],
    },

    // C2 — points on a leg of a right triangle
    {
      kind: "formula" as const,
      slug: "cdstg-cevians-right-triangle",
      name: "Points on a leg of a right triangle",
      intuition:
        "If the right angle is at \\(B\\) and \\(P\\) is any point on \\(BC\\), then \\(ABP\\) is itself a right triangle. So every line from \\(A\\) to a point of \\(BC\\) gives one Pythagoras equation, and two such lines give two equations in the two legs.",
      definition:
        "With the right angle at \\(B\\), \\(AB = c\\), \\(BC = a\\):\n" +
        "- for \\(P\\) on \\(BC\\): \\(AP^2 = c^2 + BP^2\\);\n" +
        "- with \\(Q\\) the midpoint of \\(BC\\) and \\(P\\) the midpoint of \\(AB\\): \\(AQ^2 = c^2 + \\dfrac{a^2}{4}\\) and \\(CP^2 = a^2 + \\dfrac{c^2}{4}\\), so \\(AQ^2 + CP^2 = \\dfrac54 AC^2\\);\n" +
        "- right angle at \\(C\\), \\(P\\) on \\(AC\\) and \\(Q\\) on \\(BC\\): \\(AQ^2 + BP^2 = AB^2 + PQ^2\\).",
      formula: {
        label: "Two midpoints of the legs",
        latex: "AQ^2 + CP^2 = \\tfrac54\\,AC^2",
      },
      authoredExample: {
        prompt: "\\(ABC\\) is right-angled at \\(B\\) and \\(P\\) is the midpoint of \\(BC\\). If \\(AP = 5\\) and \\(AC = \\sqrt{73}\\), find \\(AB\\) and \\(BC\\).",
        steps: [
          "\\(AB^2 + \\dfrac{BC^2}{4} = 25\\) and \\(AB^2 + BC^2 = 73\\).",
          "Subtract: \\(\\dfrac34 BC^2 = 48\\), so \\(BC = 8\\).",
          "Then \\(AB^2 = 73 - 64 = 9\\).",
        ],
        answer: "\\(AB = 3\\), \\(BC = 8\\).",
      },
      selfCheckExample: {
        prompt: "\\(ABC\\) is right-angled at \\(B\\); \\(P\\) and \\(Q\\) are the midpoints of \\(AB\\) and \\(BC\\). If \\(AC = 10\\), find \\(AQ^2 + CP^2\\).",
        steps: ["\\(AQ^2 + CP^2 = \\dfrac54 AC^2 = \\dfrac54\\times 100\\)."],
        answer: "\\(125\\).",
      },
      practiceSet: [
        { prompt: "Right angle at \\(B\\), \\(AB = 6\\), \\(BC = 8\\), \\(Q\\) the midpoint of \\(BC\\). \\(AQ\\)?", answer: "\\(2\\sqrt{13}\\)" },
        { prompt: "\\(M\\) is one-third of the way from \\(B\\) along \\(BC\\). \\(AM^2\\)?", answer: "\\(AB^2 + \\dfrac{BC^2}{9}\\)" },
        { prompt: "Right angle at \\(B\\), \\(AC = 4\\), midpoints of the legs \\(P\\), \\(Q\\). \\(AQ^2 + CP^2\\)?", answer: "\\(20\\)" },
        { prompt: "Right angle at \\(C\\): is \\(AQ^2 + BP^2 = AB^2 + PQ^2\\) always true?", answer: "Yes" },
      ],
      pyqExampleId: "4e114854-4561-437d-b6a3-4a951df76fb5", // 2026 (I) — AP = 4√13, AB = 20
      traps: [
        {
          title: "Measure from the right angle",
          body:
            "\\(AP^2 = AB^2 + BP^2\\) uses the piece of the leg from the right angle \\(B\\) to \\(P\\). With \\(M\\) and \\(N\\) trisecting \\(BC\\), \\(BN\\) is two-thirds of \\(BC\\), not one-third.",
        },
      ],
    },

    // C3 — the squared-difference identities
    {
      kind: "formula" as const,
      slug: "cdstg-squared-difference",
      name: "Subtracting across an altitude",
      intuition:
        "Drop the altitude \\(AD\\) to \\(BC\\) and write Pythagoras on both sides of it. Both equations contain \\(AD^2\\), so subtracting them removes it, leaving two sides against the two pieces of the base.",
      definition:
        "- **Any triangle, \\(AD \\perp BC\\):** \\(AB^2 - AC^2 = BD^2 - DC^2\\). Factorised: \\((AB + AC)(AB - AC) = BC\\,(BD - DC)\\).\n" +
        "- **Isosceles, \\(AB = AC\\), any \\(D\\) on \\(BC\\):** \\(AB^2 - AD^2 = BD\\cdot DC\\). (Drop the altitude to the midpoint \\(M\\) and use \\(BM^2 - MD^2 = (BM - MD)(BM + MD)\\).)\n" +
        "- **Foot of an altitude:** with \\(BD + DC = a\\) and \\(BD - DC = \\dfrac{c^2 - b^2}{a}\\), each piece follows.",
      formula: {
        label: "Across an altitude",
        latex: "AB^2 - AC^2 = BD^2 - DC^2",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(AB = 13\\), \\(AC = 15\\) and \\(BC = 14\\). \\(AD\\) is perpendicular to \\(BC\\). Find \\(BD\\), \\(DC\\) and \\(AD\\).",
        steps: [
          "\\(BD^2 - DC^2 = 169 - 225 = -56\\), and \\(BD + DC = 14\\), so \\(BD - DC = -4\\).",
          "Hence \\(BD = 5\\), \\(DC = 9\\).",
          "\\(AD = \\sqrt{169 - 25} = 12\\).",
        ],
        answer: "\\(BD = 5\\), \\(DC = 9\\), \\(AD = 12\\).",
      },
      selfCheckExample: {
        prompt: "In triangle \\(ABC\\), \\(AB = AC = 10\\) and \\(D\\) is on \\(BC\\) with \\(BD = 4\\), \\(DC = 12\\). Find \\(AD\\).",
        steps: [
          "\\(AB^2 - AD^2 = BD\\cdot DC = 48\\), so \\(AD^2 = 52\\).",
          "Check: \\(BC = 16\\), the altitude to the midpoint is \\(\\sqrt{100 - 64} = 6\\), and \\(D\\) is \\(4\\) from the midpoint, so \\(AD^2 = 36 + 16 = 52\\).",
        ],
        answer: "\\(AD = 2\\sqrt{13}\\).",
      },
      practiceSet: [
        { prompt: "\\(AB = AC\\), \\(AD = 5\\), \\(BD = 4\\), \\(CD = 6\\). Find \\(AB\\).", answer: "\\(7\\)" },
        { prompt: "\\(AD \\perp BC\\), \\(BD = 5\\), \\(DC = 3\\), \\(AB = 7\\). Find \\(AC^2\\).", answer: "\\(33\\)" },
        { prompt: "\\(AD \\perp BC\\) and \\(DB = 2\\,CD\\). \\(AB^2 - AC^2\\) in terms of \\(BC^2\\)?", answer: "\\(\\dfrac13 BC^2\\)" },
        { prompt: "\\(AB + AC = p\\), \\(AB - AC = q\\), \\(BD - CD = r\\) (\\(AD\\) an altitude). \\(BC\\)?", answer: "\\(\\dfrac{pq}{r}\\)" },
      ],
      pyqExampleId: "46d36cda-94ff-460b-a46f-d8085d393247", // 2022 (II) — DB = 3CD
      traps: [
        {
          title: "The general form needs a perpendicular",
          body:
            "\\(AB^2 - AC^2 = BD^2 - DC^2\\) holds only when \\(AD\\) is the altitude. The isosceles form \\(AB^2 - AD^2 = BD\\cdot DC\\) is different: there \\(D\\) can be any point of \\(BC\\).",
        },
      ],
    },
  ],
};
