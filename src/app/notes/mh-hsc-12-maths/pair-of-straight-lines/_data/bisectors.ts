import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_PS_BISECTORS_NOTE: SubtopicNote = {
  subtopicName: "Angle Bisectors of a Pair of Lines",
  title: "Angle Bisectors of a Pair of Lines",
  oneLineDefinition:
    "The joint equation of the two lines that bisect the angles between the lines ax² + 2hxy + by² = 0 is hx² − (a − b)xy − hy² = 0, and the two bisectors are always perpendicular.",
  whyItMatters:
    "2 questions, both from the textbook's Miscellaneous Exercise: the bisectors of the angles between x² + 3xy + 2y² = 0 and between 5x² + 6xy − y² = 0. No board paper in this bank has asked for them, and the textbook states the result only as a remark in section 4.4, so learn the formula and how to substitute in it, and give this page less time than the others.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmps-bisectors",
      name: "Joint equation of the angle bisectors",
      intuition:
        "Two lines through the origin make two pairs of angles, and each pair has its own bisector, so there are two bisectors, also through the origin. Their joint equation is one more homogeneous equation of degree two, and the textbook gives it directly. Its x² and y² coefficients are h and −h, which add to zero, so the bisectors are always at right angles.",
      definition:
        "- The joint equation of the bisectors of the angles between the lines \\(ax^2 + 2hxy + by^2 = 0\\) is \\(hx^2 - (a - b)xy - hy^2 = 0\\).\n" +
        "- The same equation can be written \\(\\dfrac{x^2 - y^2}{a - b} = \\dfrac{xy}{h}\\).\n" +
        "- Coefficient of \\(x^2\\) + coefficient of \\(y^2\\) \\(= h - h = 0\\), so the bisectors are perpendicular to each other.\n" +
        "- Method: compare with \\(ax^2 + 2hxy + by^2 = 0\\), write \\(a\\), \\(h\\), \\(b\\), substitute, and clear fractions.",
      formula: {
        label: "Bisectors of the angles between the pair",
        latex: "hx^2 - (a - b)xy - hy^2 = 0",
      },
      authoredExample: {
        prompt: "Find the joint equation of the bisectors of the angles between the lines represented by \\(x^2 + 6xy + 4y^2 = 0\\).",
        steps: [
          "Comparing with \\(ax^2 + 2hxy + by^2 = 0\\): \\(a = 1\\), \\(2h = 6\\) so \\(h = 3\\), \\(b = 4\\).",
          "The joint equation of the bisectors is \\(hx^2 - (a - b)xy - hy^2 = 0\\).",
          "\\(\\therefore 3x^2 - (1 - 4)xy - 3y^2 = 0\\), that is \\(3x^2 + 3xy - 3y^2 = 0\\).",
          "Divide by 3: \\(x^2 + xy - y^2 = 0\\).",
        ],
        answer: "\\(x^2 + xy - y^2 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the joint equation of the bisectors of the angles between the co-ordinate axes, \\(xy = 0\\).",
        steps: ["\\(a = 0\\), \\(h = \\dfrac{1}{2}\\), \\(b = 0\\).", "\\(\\dfrac{1}{2}x^2 - 0 \\cdot xy - \\dfrac{1}{2}y^2 = 0\\)."],
        answer: "\\(x^2 - y^2 = 0\\), the lines \\(y = x\\) and \\(y = -x\\)",
      },
      practiceSet: [
        { prompt: "Find the joint equation of the bisectors of the angles between the lines \\(x^2 - 3y^2 = 0\\).", answer: "\\(h = 0\\), so the equation is \\(-4xy = 0\\), that is \\(xy = 0\\): the co-ordinate axes" },
        { prompt: "Are the two bisectors of the angles between any pair of lines \\(ax^2 + 2hxy + by^2 = 0\\) perpendicular?", answer: "Yes. In \\(hx^2 - (a - b)xy - hy^2 = 0\\) the coefficients of \\(x^2\\) and \\(y^2\\) add to zero" },
      ],
      pyqExampleId: "4f7c57f5-f7a9-4119-8662-d32a79d3fe2a",
      traps: [
        {
          title: "Losing the sign of the middle term",
          body: "The middle term is \\(-(a - b)xy\\). When \\(b\\) is negative, \\(a - b\\) is larger than \\(a\\): with \\(a = 2\\), \\(b = -3\\), \\(a - b = 5\\), and the middle term is \\(-5xy\\).",
        },
        {
          title: "Using the whole xy coefficient as h",
          body: "In \\(x^2 + 6xy + 4y^2 = 0\\), \\(h = 3\\). Taking \\(h = 6\\) changes the ratio of the coefficients and gives two lines that do not bisect the angles.",
        },
      ],
    },
  ],
};
