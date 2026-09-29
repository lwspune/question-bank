import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_INEQUALITIES_NOTE: SubtopicNote = {
  subtopicName: "Triangle Inequalities",
  title: "Triangle Inequalities",
  oneLineDefinition:
    "Any two sides together are longer than the third, the longer side faces the larger angle, and the three medians together lie between three-quarters of the perimeter and the whole perimeter.",
  whyItMatters:
    "Ten PYQs, and half of them are HARD, the highest share of any page in the chapter. They are almost all statement questions: which inequality always holds. Three facts settle every one of them, and the traps are inequalities printed the wrong way round.",
  concepts: [
    // C1 — the triangle inequality
    {
      kind: "formula" as const,
      slug: "cdstg-triangle-inequality",
      name: "The triangle inequality",
      intuition:
        "The straight path between two corners is the shortest, so going round by the third corner is always longer. If two sides only just add up to the third, the triangle has collapsed into a straight line.",
      definition:
        "For sides \\(a, b, c\\):\n" +
        "- \\(a + b > c\\), \\(b + c > a\\) and \\(c + a > b\\);\n" +
        "- equivalently, each side lies strictly between the difference and the sum of the other two: \\(|b - c| < a < b + c\\).\n" +
        "To test three lengths, add the two smaller and compare with the largest. Since \\(a - b - c < 0\\) for every side, a product like \\((a - b - c)(b - c - a)(c - a - b)\\) is a product of three negatives, so it is negative.",
      formula: {
        label: "Triangle inequality",
        latex: "|b - c| < a < b + c",
      },
      authoredExample: {
        prompt: "Which of \\((5, 6, 12)\\), \\((4, 5, 9)\\) and \\((6, 8, 13)\\) can be the sides of a triangle?",
        steps: [
          "\\(5 + 6 = 11 < 12\\): no triangle.",
          "\\(4 + 5 = 9\\), not more than \\(9\\): the three points are in a straight line, so no triangle.",
          "\\(6 + 8 = 14 > 13\\): a triangle.",
        ],
        answer: "Only \\((6, 8, 13)\\).",
      },
      selfCheckExample: {
        prompt: "Two sides of a triangle are \\(7\\) and \\(11\\). How many whole-number values can the third side take?",
        steps: [
          "The third side lies strictly between \\(11 - 7 = 4\\) and \\(11 + 7 = 18\\).",
          "Whole numbers from \\(5\\) to \\(17\\): that is \\(13\\) values.",
        ],
        answer: "\\(13\\).",
      },
      practiceSet: [
        { prompt: "Is \\((3, 4, 8)\\) a triangle?", answer: "No" },
        { prompt: "Is \\((5, 5, 9)\\) a triangle?", answer: "Yes" },
        { prompt: "Sides \\(4\\) and \\(9\\). The third side lies between?", answer: "\\(5\\) and \\(13\\)" },
        { prompt: "Sign of \\(a - b - c\\) in any triangle?", answer: "Negative" },
      ],
      pyqExampleId: "1f4dfbfe-7b03-44fb-a8ea-f7d482e49ada", // 2017 (I) — which triple is not a triangle
      traps: [
        {
          title: "Equal is not enough",
          body:
            "\\(4 + 5 = 9\\) gives a flat line, not a triangle. The inequality is strict.",
        },
        {
          title: "When two options are both true",
          body:
            "If a quantity is always positive, 'non-negative' is also true. CDS has printed both; mark the tighter description, 'positive', which is the one the setter means.",
        },
      ],
    },

    // C2 — larger side, larger angle
    {
      kind: "formula" as const,
      slug: "cdstg-side-angle-order",
      name: "The larger side faces the larger angle",
      intuition:
        "Open the angle between two fixed sides and the third side grows. So the order of the sides is the order of the angles opposite them, and the side facing a right or obtuse angle is the longest.",
      definition:
        "- In any triangle, \\(a > b\\) exactly when \\(A > B\\).\n" +
        "- The hypotenuse faces the right angle, so it is the longest side.\n" +
        "- If \\(c\\) is the longest side: \\(c^2 < a^2 + b^2\\) means the triangle is acute, \\(=\\) means right, \\(>\\) means obtuse.\n" +
        "- In a right triangle \\(a^3 + b^3 = a\\cdot a^2 + b\\cdot b^2 < c(a^2 + b^2) = c^3\\), since each leg is shorter than \\(c\\).",
      formula: {
        label: "Acute, right or obtuse",
        latex: "c^2 \\lessgtr a^2 + b^2 \\quad (c \\text{ the longest side})",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(A = 50^\\circ\\) and \\(B = 60^\\circ\\). Put the sides in order.",
        steps: [
          "\\(C = 180^\\circ - 110^\\circ = 70^\\circ\\), the largest angle.",
          "The angles run \\(A < B < C\\), so the sides opposite them run \\(a < b < c\\).",
        ],
        answer: "\\(BC < CA < AB\\).",
      },
      selfCheckExample: {
        prompt: "\\(ABC\\) is right-angled with hypotenuse \\(AC\\). Which is larger, \\(AC^3\\) or \\(AB^3 + BC^3\\)?",
        steps: [
          "\\(AB^3 + BC^3 = AB\\cdot AB^2 + BC\\cdot BC^2 < AC(AB^2 + BC^2)\\).",
          "\\(AB^2 + BC^2 = AC^2\\), so the right side is \\(AC^3\\).",
        ],
        answer: "\\(AC^3\\).",
      },
      practiceSet: [
        { prompt: "Angles \\(40^\\circ, 60^\\circ, 80^\\circ\\). The longest side faces?", answer: "the \\(80^\\circ\\) angle" },
        { prompt: "Sides \\(7, 8, 12\\): acute or obtuse?", answer: "Obtuse (\\(49 + 64 < 144\\))" },
        { prompt: "Sides \\(5, 6, 7\\): acute or obtuse?", answer: "Acute (\\(25 + 36 > 49\\))" },
        { prompt: "Largest angle of a right triangle faces?", answer: "the hypotenuse" },
      ],
      pyqExampleId: "33aa50dc-a363-4215-9308-9c9f5cc04217", // 2019 (I) — bisector meets BC at X: AB > BX
      traps: [
        {
          title: "Compare the angles, not the picture",
          body:
            "A figure that is not drawn to scale can make any side look the longest. Name the angles in the small triangle that holds the two sides, then compare the angles opposite them; the larger angle faces the longer side.",
        },
      ],
    },

    // C3 — the medians against the perimeter
    {
      kind: "formula" as const,
      slug: "cdstg-median-bounds",
      name: "The medians against the perimeter",
      intuition:
        "A median joins a vertex to the midpoint of the opposite side. Double it into a parallelogram and the triangle inequality says the two sides beside it are longer than twice the median. Apply the triangle inequality at the centroid instead and the medians turn out longer than three-quarters of the perimeter.",
      definition:
        "Let \\(m_a, m_b, m_c\\) be the medians and \\(P = a + b + c\\).\n" +
        "- \\(b + c > 2m_a\\), and likewise for the other two.\n" +
        "- Adding the three: \\(m_a + m_b + m_c < P\\).\n" +
        "- At the centroid \\(G\\), \\(GB + GC > a\\) gives \\(\\dfrac23(m_b + m_c) > a\\); adding the three: \\(m_a + m_b + m_c > \\dfrac34 P\\).\n" +
        "- Also, for any point \\(D\\) on \\(BC\\): \\(AB + BC + CA > 2AD\\).",
      formula: {
        label: "Sum of the medians",
        latex: "\\tfrac34 (a + b + c) < m_a + m_b + m_c < a + b + c",
      },
      authoredExample: {
        prompt: "Check the bounds on an equilateral triangle of side \\(2\\).",
        steps: [
          "Each median is \\(\\sqrt{2^2 - 1^2} = \\sqrt3\\), so their sum is \\(3\\sqrt3 \\approx 5.20\\).",
          "The perimeter is \\(6\\), and three-quarters of it is \\(4.5\\).",
          "\\(4.5 < 5.20 < 6\\), as the bounds say.",
        ],
        answer: "The sum \\(3\\sqrt3\\) sits between \\(4.5\\) and \\(6\\).",
      },
      selfCheckExample: {
        prompt: "Can the medians of a triangle of perimeter \\(24\\) add up to \\(17\\)?",
        steps: ["The sum must lie strictly between \\(\\dfrac34\\times 24 = 18\\) and \\(24\\)."],
        answer: "No; \\(17 < 18\\).",
      },
      practiceSet: [
        { prompt: "Perimeter \\(40\\). The sum of the medians lies between?", answer: "\\(30\\) and \\(40\\)" },
        { prompt: "Is 'sum of two sides \\(<\\) twice the median to the third' ever true?", answer: "No" },
        { prompt: "Perimeter \\(12\\). Can the medians add up to \\(10\\)?", answer: "Yes (\\(9 < 10 < 12\\))" },
        { prompt: "Which is larger, \\(2(m_a + m_b + m_c)\\) or \\(3(a + b + c)\\)?", answer: "\\(3(a + b + c)\\)" },
      ],
      pyqExampleId: "12fa1bdc-c690-4e34-94d4-c6300bbcaab4", // 2018 (I) — 3(a + b + c) < 4(p + q + r)
      traps: [
        {
          title: "Read which way the inequality points",
          body:
            "Statement questions print the true result reversed: 'the sum of two sides is less than twice the median'. The true fact is greater. Check any printed inequality on an equilateral triangle, where each median is \\(\\dfrac{\\sqrt3}{2}\\) of the side.",
        },
      ],
    },
  ],
};
