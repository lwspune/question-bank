import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_POINTLINE_NOTE: SubtopicNote = {
  subtopicName: "Distance of a Point from a Line",
  title: "Distance of a Point from a Line",
  oneLineDefinition:
    "The perpendicular distance from a point to a line in space, found by a formula built from a projection, or by first finding the foot of the perpendicular.",
  whyItMatters:
    "9 questions, one of them from a board paper: the length of the perpendicular from the point (3, 2, 1) to a line, set in 2023, which is the textbook's own Solved Example 12 word for word. The textbook rows are Exercise 6.2 Questions 1, 2, 5 and 6, Solved Examples 12 and 13, one question of Miscellaneous Exercise 6 A and one MCQ of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-perpendicular-length",
      name: "Length of the perpendicular from a point to a line",
      intuition:
        "Drop the perpendicular PM from the point P to the line, and take a known point A of the line. Triangle AMP has its right angle at M, and AM is the projection of AP on the line. Pythagoras then gives PM without finding M at all.",
      definition:
        "- **Theorem 6.5:** the line \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\) passes through \\(A(\\bar{a})\\). Let \\(P(\\bar{\\alpha})\\) be the point and \\(M\\) the foot of the perpendicular from \\(P\\).\n" +
        "- \\(AM\\) = the projection of \\(\\overline{AP}\\) on \\(\\bar{b}\\) = \\(\\dfrac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\).\n" +
        "- Triangle \\(AMP\\) is right angled at \\(M\\), so \\(PM^2 = AP^2 - AM^2\\).\n" +
        "- \\(\\therefore PM = \\sqrt{|\\bar{\\alpha} - \\bar{a}|^2 - \\left[\\dfrac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\right]^2}\\).",
      formula: {
        label: "Distance of a point from a line",
        latex: "PM = \\sqrt{|\\bar{\\alpha} - \\bar{a}|^2 - \\left[\\frac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\right]^2}",
        symbols: [
          { symbol: "\\(\\bar{\\alpha}\\)", meaning: "position vector of the point P" },
          { symbol: "\\(\\bar{a}\\)", meaning: "position vector of a point A of the line" },
          { symbol: "\\(\\bar{b}\\)", meaning: "a vector along the line" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the length of the perpendicular from \\(P(1, 2, 3)\\) to the line \\(\\bar{r} = (3\\hat{i} + \\hat{j} + \\hat{k}) + \\lambda(2\\hat{i} - \\hat{j} + 2\\hat{k})\\).",
        steps: [
          "Given: \\(\\bar{\\alpha} = \\hat{i} + 2\\hat{j} + 3\\hat{k}\\), \\(\\bar{a} = 3\\hat{i} + \\hat{j} + \\hat{k}\\), \\(\\bar{b} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
          "\\(\\bar{\\alpha} - \\bar{a} = -2\\hat{i} + \\hat{j} + 2\\hat{k}\\), so \\(|\\bar{\\alpha} - \\bar{a}|^2 = 4 + 1 + 4 = 9\\).",
          "\\((\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b} = -4 - 1 + 4 = -1\\), and \\(|\\bar{b}| = \\sqrt{4 + 1 + 4} = 3\\).",
          "\\(PM = \\sqrt{9 - \\left(\\dfrac{-1}{3}\\right)^2} = \\sqrt{9 - \\dfrac{1}{9}} = \\sqrt{\\dfrac{80}{9}} = \\dfrac{4\\sqrt{5}}{3}\\).",
        ],
        answer: "\\(\\dfrac{4\\sqrt{5}}{3}\\) units",
      },
      selfCheckExample: {
        prompt: "Find the distance of the origin from the line \\(\\bar{r} = (\\hat{i} + \\hat{j}) + \\lambda(\\hat{i} - \\hat{j})\\).",
        steps: [
          "\\(\\bar{\\alpha} - \\bar{a} = -\\hat{i} - \\hat{j}\\), so \\(|\\bar{\\alpha} - \\bar{a}|^2 = 2\\).",
          "\\((\\bar{\\alpha} - \\bar{a}) \\cdot (\\hat{i} - \\hat{j}) = -1 + 1 = 0\\), so the distance is \\(\\sqrt{2 - 0}\\).",
        ],
        answer: "\\(\\sqrt{2}\\) units",
      },
      practiceSet: [
        {
          prompt:
            "A point P is 5 units from a point A of a line, and the projection of AP on the line is 3 units long. How far is P from the line?",
          answer: "4 units",
          method: "\\(\\sqrt{5^2 - 3^2} = 4\\)",
        },
        {
          prompt: "Find the distance of the point \\((2, 3, 4)\\) from the X-axis, the line \\(\\bar{r} = \\lambda\\hat{i}\\).",
          answer: "5 units",
          method: "\\(|\\bar{\\alpha}|^2 = 29\\) and \\(\\bar{\\alpha} \\cdot \\hat{i} = 2\\), so \\(\\sqrt{29 - 4} = 5\\).",
        },
      ],
      pyqExampleId: "fb48d9c0-2bbb-4fe1-a0fd-f3e689ab8200",
      traps: [
        {
          title: "Not squaring the whole projection",
          body: "The projection is \\(\\dfrac{(\\bar{\\alpha} - \\bar{a}) \\cdot \\bar{b}}{|\\bar{b}|}\\). Square the whole of it, which divides the square of the dot product by \\(|\\bar{b}|^2\\). Dividing by \\(|\\bar{b}|\\) only once gives a wrong answer.",
        },
        {
          title: "Stopping at the square of the distance",
          body: "The bracket under the root is \\(PM^2\\). Take the square root and write the unit; giving the value under the root as the answer loses the last mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-foot",
      name: "Foot of the perpendicular, and points at a given distance",
      intuition:
        "Every point of the line can be written with one parameter: (x₁ + λa, y₁ + λb, z₁ + λc). The foot M is the one point where PM is perpendicular to the line, and that gives one equation in λ. The same general point answers questions about points of the line at a given distance from its base point.",
      definition:
        "- Write the general point \\(M(x_1 + \\lambda a,\\ y_1 + \\lambda b,\\ z_1 + \\lambda c)\\) of the line.\n" +
        "- Direction ratios of \\(PM\\) are the coordinates of \\(M\\) minus those of \\(P\\).\n" +
        "- \\(PM\\) is perpendicular to the line, so \\(a(x_M - x_P) + b(y_M - y_P) + c(z_M - z_P) = 0\\). Solve for \\(\\lambda\\).\n" +
        "- Put \\(\\lambda\\) back to get \\(M\\); then \\(PM\\) by the distance formula, if it is asked.\n" +
        "- A point of the line at distance \\(d\\) from the base point \\(A(x_1, y_1, z_1)\\): \\(AM = |\\lambda|\\sqrt{a^2 + b^2 + c^2} = d\\), which gives two points, one on each side of \\(A\\).",
      formula: {
        label: "General point of a line",
        latex: "M(x_1 + \\lambda a,\\ y_1 + \\lambda b,\\ z_1 + \\lambda c), \\qquad \\overline{PM} \\cdot (a\\hat{i} + b\\hat{j} + c\\hat{k}) = 0",
      },
      authoredExample: {
        prompt:
          "Find the co-ordinates of the foot of the perpendicular from \\(P(5, 0, 3)\\) to the line \\(\\dfrac{x - 2}{1} = \\dfrac{y + 1}{2} = \\dfrac{z - 4}{-1}\\), and the length of the perpendicular.",
        steps: [
          "Let \\(M(2 + \\lambda,\\ -1 + 2\\lambda,\\ 4 - \\lambda)\\) be the foot; it lies on the line.",
          "Direction ratios of \\(PM\\): \\(\\lambda - 3,\\ 2\\lambda - 1,\\ 1 - \\lambda\\).",
          "\\(PM\\) is perpendicular to the line: \\(1(\\lambda - 3) + 2(2\\lambda - 1) - 1(1 - \\lambda) = 0\\), so \\(6\\lambda - 6 = 0\\) and \\(\\lambda = 1\\).",
          "\\(\\therefore M = (3, 1, 3)\\).",
          "\\(PM = \\sqrt{(3 - 5)^2 + (1 - 0)^2 + (3 - 3)^2} = \\sqrt{5}\\).",
        ],
        answer: "Foot \\((3, 1, 3)\\); length \\(\\sqrt{5}\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the points on the line \\(\\dfrac{x - 1}{2} = \\dfrac{y}{2} = \\dfrac{z + 1}{1}\\) at a distance of 6 units from \\(A(1, 0, -1)\\).",
        steps: [
          "General point \\((1 + 2\\lambda,\\ 2\\lambda,\\ -1 + \\lambda)\\); its distance from \\(A\\) is \\(|\\lambda|\\sqrt{4 + 4 + 1} = 3|\\lambda|\\).",
          "\\(3|\\lambda| = 6\\), so \\(\\lambda = 2\\) or \\(\\lambda = -2\\).",
        ],
        answer: "\\((5, 4, 1)\\) and \\((-3, -4, -3)\\)",
      },
      practiceSet: [
        {
          prompt: "Write the general point of the line \\(\\dfrac{x + 1}{3} = \\dfrac{y - 2}{-1} = \\dfrac{z}{4}\\).",
          answer: "\\((3\\lambda - 1,\\ 2 - \\lambda,\\ 4\\lambda)\\)",
        },
        {
          prompt: "\\(M(2, 1, 0)\\) is the foot of the perpendicular from \\(P(3, 2, 4)\\) to a line. Find the length of the perpendicular.",
          answer: "\\(3\\sqrt{2}\\) units",
          method: "\\(PM = \\sqrt{1 + 1 + 16} = \\sqrt{18}\\)",
        },
      ],
      pyqExampleId: "32837633-10dc-4d3a-83e3-81895472959c",
      traps: [
        {
          title: "Dotting PM with the wrong vector",
          body: "The perpendicular condition dots the direction ratios of \\(PM\\) with the direction ratios of the line, \\(a, b, c\\). Dotting with the base point of the line gives a meaningless \\(\\lambda\\).",
        },
        {
          title: "Giving λ as the answer",
          body: "\\(\\lambda\\) only locates the foot. Substitute it back to write \\(M\\) as a point, and find \\(PM\\) when the length is also asked.",
        },
        {
          title: "Treating the parameter as the distance",
          body: "With direction ratios that are not direction cosines, the distance from the base point is \\(|\\lambda|\\sqrt{a^2 + b^2 + c^2}\\), not \\(|\\lambda|\\). The parameter equals the distance only when \\(a, b, c\\) are direction cosines.",
        },
      ],
    },
  ],
};
