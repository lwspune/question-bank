import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_LINE_NOTE: SubtopicNote = {
  subtopicName: "Vector and Cartesian Equations of a Line",
  title: "Vector and Cartesian Equations of a Line",
  oneLineDefinition:
    "A line in space is fixed by one point on it and its direction. That gives its vector equation r = a + λb and its Cartesian equations (x − x₁)/a = (y − y₁)/b = (z − z₁)/c.",
  whyItMatters:
    "63 questions, the largest page of the chapter, seventeen of them from board papers: the vector equation of a line through a point parallel to a vector (2018, 2024, 2025) or through two points (2026), the Cartesian equations through two points (MCQs in 2020, 2022, 2026), changing Cartesian equations to vector form (2015), direction ratios and direction cosines (2025), a line perpendicular to two given lines or vectors (2015, 2019, 2020, 2024), and the angle between two lines (2018, 2025, 2026). The textbook rows are Exercise 6.1, Solved Examples 1 to 11, most of Miscellaneous Exercise 6 A and six MCQs of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-vector-line",
      name: "Vector equation of a line",
      intuition:
        "A line is fixed by one point A on it and a direction b. You reach any point P of the line by starting at A and moving some multiple of b. That multiple, λ, is the parameter: each real value of λ gives one point of the line, and each point gives one value of λ.",
      definition:
        "- **Theorem 6.1:** the line through \\(A(\\bar{a})\\) parallel to \\(\\bar{b}\\) is \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\).\n" +
        "- Proof outline: let \\(P(\\bar{r})\\) be any point on the line.\n" +
        "- \\(\\overline{AP}\\) is parallel to \\(\\bar{b}\\), so \\(\\overline{AP} = \\lambda\\bar{b}\\) for some scalar \\(\\lambda\\).\n" +
        "- \\(\\overline{OP} - \\overline{OA} = \\lambda\\bar{b}\\), so \\(\\bar{r} - \\bar{a} = \\lambda\\bar{b}\\), that is \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\).\n" +
        "- **Theorem 6.3:** the line through \\(A(\\bar{a})\\) and \\(B(\\bar{b})\\) is \\(\\bar{r} = \\bar{a} + \\lambda(\\bar{b} - \\bar{a})\\), because \\(\\overline{AB} = \\bar{b} - \\bar{a}\\) lies along the line.\n" +
        "- A point \\(P(\\bar{r})\\) lies on \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\) exactly when \\(\\bar{r} - \\bar{a}\\) is a scalar multiple of \\(\\bar{b}\\).",
      formula: {
        label: "Vector equation of a line",
        latex: "\\bar{r} = \\bar{a} + \\lambda\\bar{b}, \\qquad \\bar{r} = \\bar{a} + \\lambda(\\bar{b} - \\bar{a})",
        symbols: [
          { symbol: "\\(\\bar{r}\\)", meaning: "position vector of any point of the line" },
          { symbol: "\\(\\bar{a}\\)", meaning: "position vector of a known point A of the line" },
          { symbol: "\\(\\bar{b}\\)", meaning: "a vector along the line (in the second form, the position vector of a second point B)" },
          { symbol: "\\(\\lambda\\)", meaning: "the parameter, any real number" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the vector equation of the line passing through \\(A(2, -1, 3)\\) and \\(B(5, 1, -1)\\). Hence check whether \\(C(8, 3, -5)\\) lies on it.",
        steps: [
          "Given: \\(\\bar{a} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\) and \\(\\bar{b} = 5\\hat{i} + \\hat{j} - \\hat{k}\\).",
          "Formula: the line through \\(A(\\bar{a})\\) and \\(B(\\bar{b})\\) is \\(\\bar{r} = \\bar{a} + \\lambda(\\bar{b} - \\bar{a})\\).",
          "\\(\\bar{b} - \\bar{a} = (5 - 2)\\hat{i} + (1 + 1)\\hat{j} + (-1 - 3)\\hat{k} = 3\\hat{i} + 2\\hat{j} - 4\\hat{k}\\).",
          "\\(\\therefore \\bar{r} = (2\\hat{i} - \\hat{j} + 3\\hat{k}) + \\lambda(3\\hat{i} + 2\\hat{j} - 4\\hat{k})\\).",
          "For \\(C\\): \\(\\bar{c} - \\bar{a} = 6\\hat{i} + 4\\hat{j} - 8\\hat{k} = 2(3\\hat{i} + 2\\hat{j} - 4\\hat{k})\\), a scalar multiple of the direction, so \\(C\\) lies on the line (at \\(\\lambda = 2\\)).",
        ],
        answer: "\\(\\bar{r} = (2\\hat{i} - \\hat{j} + 3\\hat{k}) + \\lambda(3\\hat{i} + 2\\hat{j} - 4\\hat{k})\\), and \\(C\\) lies on it",
      },
      selfCheckExample: {
        prompt:
          "Write the vector equation of the line through the point with position vector \\(\\hat{i} - 3\\hat{k}\\) and parallel to \\(2\\hat{i} + 5\\hat{j} - \\hat{k}\\).",
        steps: ["Use \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\) with \\(\\bar{a} = \\hat{i} - 3\\hat{k}\\) and \\(\\bar{b} = 2\\hat{i} + 5\\hat{j} - \\hat{k}\\)."],
        answer: "\\(\\bar{r} = (\\hat{i} - 3\\hat{k}) + \\lambda(2\\hat{i} + 5\\hat{j} - \\hat{k})\\)",
      },
      practiceSet: [
        {
          prompt: "Write the vector equation of the line through the point with position vector \\(3\\hat{i} - \\hat{j}\\) and direction ratios \\(1, 0, 2\\).",
          answer: "\\(\\bar{r} = (3\\hat{i} - \\hat{j}) + \\lambda(\\hat{i} + 2\\hat{k})\\)",
        },
        {
          prompt:
            "Does the point with position vector \\(5\\hat{i} + 3\\hat{j}\\) lie on the line \\(\\bar{r} = (\\hat{i} + \\hat{j} + 2\\hat{k}) + \\lambda(2\\hat{i} + \\hat{j} - \\hat{k})\\)?",
          answer: "Yes: \\(4\\hat{i} + 2\\hat{j} - 2\\hat{k} = 2(2\\hat{i} + \\hat{j} - \\hat{k})\\), so \\(\\lambda = 2\\)",
        },
        {
          prompt:
            "Write the vector equation of the line through \\(2\\hat{i} - \\hat{k}\\) parallel to the line \\(\\bar{r} = (\\hat{i} + \\hat{j}) + \\mu(4\\hat{i} - \\hat{j} + 3\\hat{k})\\).",
          answer: "\\(\\bar{r} = (2\\hat{i} - \\hat{k}) + \\lambda(4\\hat{i} - \\hat{j} + 3\\hat{k})\\)",
          method: "A parallel line has the same direction; only the point changes.",
        },
      ],
      pyqExampleId: "dafc65d2-6bba-4c1a-8319-87d56afeed46",
      traps: [
        {
          title: "Using a position vector as the direction",
          body: "For a line through two points the direction is \\(\\bar{b} - \\bar{a}\\), not \\(\\bar{b}\\). Writing \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\) here gives a line through \\(A\\) in the wrong direction, which misses \\(B\\).",
        },
        {
          title: "Dropping the parameter",
          body: "An equation such as \\(\\bar{r} = 2\\hat{i} + 3\\hat{j}\\) is one point, not a line. The direction must carry \\(\\lambda\\), and a full answer says \\(\\lambda\\) is a real number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-cartesian-line",
      name: "Cartesian equations and direction ratios of a line",
      intuition:
        "In coordinates, a point (x, y, z) is on the line when its steps from A, namely x − x₁, y − y₁ and z − z₁, are in the same proportion as the direction ratios. That is two equations written as one chain. A line in space cannot be given by a single equation.",
      definition:
        "- **Theorem 6.2:** the line through \\(A(x_1, y_1, z_1)\\) with direction ratios \\(a, b, c\\) is \\(\\dfrac{x - x_1}{a} = \\dfrac{y - y_1}{b} = \\dfrac{z - z_1}{c}\\).\n" +
        "- **Theorem 6.4:** the line through \\(A(x_1, y_1, z_1)\\) and \\(B(x_2, y_2, z_2)\\) is \\(\\dfrac{x - x_1}{x_2 - x_1} = \\dfrac{y - y_1}{y_2 - y_1} = \\dfrac{z - z_1}{z_2 - z_1}\\).\n" +
        "- Vector to Cartesian and back: \\(\\bar{a} = x_1\\hat{i} + y_1\\hat{j} + z_1\\hat{k}\\) gives the point, and \\(\\bar{b} = a\\hat{i} + b\\hat{j} + c\\hat{k}\\) gives the direction ratios.\n" +
        "- Before reading a point or a direction, make the coefficient of \\(x\\), \\(y\\) and \\(z\\) each equal to 1: \\(\\dfrac{2x - 1}{4} = \\dfrac{x - \\frac{1}{2}}{2}\\).\n" +
        "- If a direction ratio is 0, the book writes the line in parametric form \\(x = x_1 + \\lambda a\\), \\(y = y_1 + \\lambda b\\), \\(z = z_1 + \\lambda c\\), not as a fraction with 0 below.\n" +
        "- Direction cosines are the direction ratios divided by \\(\\sqrt{a^2 + b^2 + c^2}\\), and \\(l^2 + m^2 + n^2 = 1\\).",
      formula: {
        label: "Cartesian equations of a line",
        latex: "\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}",
        symbols: [
          { symbol: "\\((x_1, y_1, z_1)\\)", meaning: "a point of the line" },
          { symbol: "\\(a, b, c\\)", meaning: "direction ratios of the line" },
        ],
      },
      authoredExample: {
        prompt: "Find the vector equation of the line \\(\\dfrac{2x - 1}{4} = \\dfrac{y + 3}{-1} = \\dfrac{1 - z}{2}\\).",
        steps: [
          "Make each coefficient 1: \\(2x - 1 = 2\\left(x - \\dfrac{1}{2}\\right)\\), so \\(\\dfrac{2x - 1}{4} = \\dfrac{x - \\frac{1}{2}}{2}\\).",
          "\\(1 - z = -(z - 1)\\), so \\(\\dfrac{1 - z}{2} = \\dfrac{z - 1}{-2}\\).",
          "The line is \\(\\dfrac{x - \\frac{1}{2}}{2} = \\dfrac{y + 3}{-1} = \\dfrac{z - 1}{-2}\\): it passes through \\(\\left(\\dfrac{1}{2}, -3, 1\\right)\\) with direction ratios \\(2, -1, -2\\).",
          "With \\(\\bar{a} = \\dfrac{1}{2}\\hat{i} - 3\\hat{j} + \\hat{k}\\) and \\(\\bar{b} = 2\\hat{i} - \\hat{j} - 2\\hat{k}\\), use \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\).",
        ],
        answer: "\\(\\bar{r} = \\left(\\dfrac{1}{2}\\hat{i} - 3\\hat{j} + \\hat{k}\\right) + \\lambda(2\\hat{i} - \\hat{j} - 2\\hat{k})\\)",
      },
      selfCheckExample: {
        prompt: "Find the direction cosines of the line \\(\\dfrac{x - 1}{2} = \\dfrac{y + 2}{-6} = \\dfrac{z}{3}\\).",
        steps: [
          "Direction ratios \\(2, -6, 3\\); \\(\\sqrt{4 + 36 + 9} = 7\\).",
          "Divide each ratio by 7.",
        ],
        answer: "\\(\\dfrac{2}{7}, -\\dfrac{6}{7}, \\dfrac{3}{7}\\)",
      },
      practiceSet: [
        {
          prompt: "Write the Cartesian equations of the line through \\((2, 0, -1)\\) with direction ratios \\(3, -2, 4\\).",
          answer: "\\(\\dfrac{x - 2}{3} = \\dfrac{y}{-2} = \\dfrac{z + 1}{4}\\)",
        },
        {
          prompt: "Write the vector equation of the line \\(\\dfrac{x + 2}{3} = \\dfrac{y - 1}{4} = \\dfrac{z}{-5}\\).",
          answer: "\\(\\bar{r} = (-2\\hat{i} + \\hat{j}) + \\lambda(3\\hat{i} + 4\\hat{j} - 5\\hat{k})\\)",
        },
        {
          prompt: "Write the parametric equations of the line through \\((1, 4, 2)\\) with direction ratios \\(0, 1, -3\\).",
          answer: "\\(x = 1\\), \\(y = 4 + \\lambda\\), \\(z = 2 - 3\\lambda\\)",
        },
      ],
      pyqExampleId: "396badb8-2fe0-440f-a5a3-2f152ce5b7bd",
      traps: [
        {
          title: "Reading the point with the wrong sign",
          body: "\\(\\dfrac{x + 2}{3}\\) belongs to the point with \\(x = -2\\), not \\(x = 2\\). Write each numerator as \\(x - x_1\\) before you read the point.",
        },
        {
          title: "Reading direction ratios before the coefficients are 1",
          body: "In \\(\\dfrac{3x + 1}{1}\\) the direction ratio along \\(x\\) is \\(\\dfrac{1}{3}\\), not 1. Divide out the coefficient of the variable first, then clear fractions.",
        },
        {
          title: "Giving direction ratios when direction cosines are asked",
          body: "Direction cosines must satisfy \\(l^2 + m^2 + n^2 = 1\\). Divide the ratios by \\(\\sqrt{a^2 + b^2 + c^2}\\) and check the squares add to 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-perpendicular-line",
      name: "A line perpendicular to two given lines",
      intuition:
        "When a line must be perpendicular to two directions, its direction is their cross product, because b × c is perpendicular to both b and c. After that you only need one point of the line, and the question gives it.",
      definition:
        "- \\(\\bar{b} \\times \\bar{c}\\) is perpendicular to both \\(\\bar{b}\\) and \\(\\bar{c}\\), so it is the direction of a line perpendicular to both.\n" +
        "- For lines given in Cartesian form, use their direction ratios as \\(\\bar{b}\\) and \\(\\bar{c}\\); their points play no part.\n" +
        "- Work the cross product as a determinant, then write \\(\\bar{r} = \\bar{a} + \\lambda(\\bar{b} \\times \\bar{c})\\) or the Cartesian form through the given point.\n" +
        "- Check: the direction found must give a dot product of 0 with each given direction.",
      formula: {
        label: "Direction perpendicular to two vectors",
        latex: "\\bar{b} \\times \\bar{c} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
      },
      authoredExample: {
        prompt:
          "Find the Cartesian equations of the line through \\((1, -2, 3)\\) and perpendicular to the lines \\(\\dfrac{x}{2} = \\dfrac{y - 1}{-1} = \\dfrac{z + 2}{3}\\) and \\(\\dfrac{x - 4}{1} = \\dfrac{y}{2} = \\dfrac{z - 1}{-1}\\).",
        steps: [
          "Directions of the given lines: \\(\\bar{b} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\) and \\(\\bar{c} = \\hat{i} + 2\\hat{j} - \\hat{k}\\).",
          "\\(\\bar{b} \\times \\bar{c} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 3 \\\\ 1 & 2 & -1 \\end{vmatrix} = \\hat{i}(1 - 6) - \\hat{j}(-2 - 3) + \\hat{k}(4 + 1) = -5\\hat{i} + 5\\hat{j} + 5\\hat{k}\\).",
          "So the direction ratios of the required line are \\(-5, 5, 5\\), that is \\(1, -1, -1\\).",
          "Check: \\((1)(2) + (-1)(-1) + (-1)(3) = 0\\) and \\((1)(1) + (-1)(2) + (-1)(-1) = 0\\).",
          "Through \\((1, -2, 3)\\): \\(\\dfrac{x - 1}{1} = \\dfrac{y + 2}{-1} = \\dfrac{z - 3}{-1}\\).",
        ],
        answer: "\\(\\dfrac{x - 1}{1} = \\dfrac{y + 2}{-1} = \\dfrac{z - 3}{-1}\\)",
      },
      selfCheckExample: {
        prompt: "Find direction ratios of a line perpendicular to both \\(\\hat{i} + \\hat{j}\\) and \\(\\hat{j} + \\hat{k}\\).",
        steps: ["\\((\\hat{i} + \\hat{j}) \\times (\\hat{j} + \\hat{k}) = \\hat{i}(1 - 0) - \\hat{j}(1 - 0) + \\hat{k}(1 - 0)\\)."],
        answer: "\\(1, -1, 1\\)",
      },
      practiceSet: [
        {
          prompt: "Check that \\(2\\hat{i} - \\hat{j} + \\hat{k}\\) is perpendicular to both \\(\\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\hat{j} + \\hat{k}\\).",
          answer: "Yes: \\(2 - 1 - 1 = 0\\) and \\(0 - 1 + 1 = 0\\)",
        },
        {
          prompt: "A line has direction ratios \\(2, 1, -2\\). Is it perpendicular to a line with direction ratios \\(1, 0, 1\\)?",
          answer: "Yes, \\(2 + 0 - 2 = 0\\)",
        },
        {
          prompt: "A line is perpendicular to both \\(\\hat{i}\\) and \\(\\hat{j}\\). Which axis is it parallel to?",
          answer: "The Z-axis, since \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\)",
        },
      ],
      pyqExampleId: "4889ab37-0c86-4730-9f16-4fec1710eaba",
      traps: [
        {
          title: "A sign slip in the middle term",
          body: "The \\(\\hat{j}\\) part of a cross product carries a minus sign: \\(-(b_1c_3 - b_3c_1)\\). Dot your answer with both given directions; if either dot product is not 0, recheck that term.",
        },
        {
          title: "Using the points of the given lines",
          body: "Only the direction ratios of the given lines are crossed. The required line passes through the point the question names, not through a point of either given line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-line-angle",
      name: "Angle between two lines, and lines that meet",
      intuition:
        "The angle between two lines is the angle between their directions, so dot the two direction vectors. A dot product of 0 means the lines are perpendicular; proportional directions mean they are parallel. Whether two lines actually meet is a different question: one point must satisfy both equations.",
      definition:
        "- The angle \\(\\theta\\) between \\(\\bar{r} = \\bar{a_1} + \\lambda\\bar{b_1}\\) and \\(\\bar{r} = \\bar{a_2} + \\mu\\bar{b_2}\\) is the angle between \\(\\bar{b_1}\\) and \\(\\bar{b_2}\\): \\(\\cos\\theta = \\dfrac{\\bar{b_1} \\cdot \\bar{b_2}}{|\\bar{b_1}|\\,|\\bar{b_2}|}\\).\n" +
        "- For the acute angle, take the modulus of the dot product.\n" +
        "- With direction ratios: \\(\\cos\\theta = \\dfrac{a_1a_2 + b_1b_2 + c_1c_2}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}}\\).\n" +
        "- Perpendicular lines: \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\). Parallel lines: \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\).\n" +
        "- To show two lines meet: write the general point of each, equate the coordinates, solve two of the equations for \\(\\lambda\\) and \\(\\mu\\), and check that the third is satisfied.",
      formula: {
        label: "Angle between two lines",
        latex: "\\cos\\theta = \\frac{|\\bar{b_1} \\cdot \\bar{b_2}|}{|\\bar{b_1}|\\,|\\bar{b_2}|}",
      },
      authoredExample: {
        prompt:
          "Find the acute angle between the lines \\(\\dfrac{x - 5}{1} = \\dfrac{y + 1}{4} = \\dfrac{z}{8}\\) and \\(\\dfrac{x}{4} = \\dfrac{y - 6}{7} = \\dfrac{z + 4}{4}\\).",
        steps: [
          "Directions: \\(\\bar{b_1} = \\hat{i} + 4\\hat{j} + 8\\hat{k}\\) and \\(\\bar{b_2} = 4\\hat{i} + 7\\hat{j} + 4\\hat{k}\\).",
          "\\(\\bar{b_1} \\cdot \\bar{b_2} = 4 + 28 + 32 = 64\\).",
          "\\(|\\bar{b_1}| = \\sqrt{1 + 16 + 64} = 9\\) and \\(|\\bar{b_2}| = \\sqrt{16 + 49 + 16} = 9\\).",
          "\\(\\cos\\theta = \\dfrac{64}{9 \\times 9} = \\dfrac{64}{81}\\).",
        ],
        answer: "\\(\\theta = \\cos^{-1}\\left(\\dfrac{64}{81}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(k\\) if the lines with direction ratios \\(2, k, 3\\) and \\(1, -2, 4\\) are perpendicular.",
        steps: ["\\(2(1) + k(-2) + 3(4) = 0\\), so \\(14 - 2k = 0\\)."],
        answer: "\\(k = 7\\)",
      },
      practiceSet: [
        {
          prompt: "Are the lines with direction ratios \\(1, -2, 3\\) and \\(-2, 4, -6\\) parallel, perpendicular or neither?",
          answer: "Parallel: \\(-2, 4, -6\\) is \\(-2\\) times \\(1, -2, 3\\)",
        },
        {
          prompt: "Two lines have direction ratios with \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\). What is the angle between them?",
          answer: "\\(90^{\\circ}\\): the lines are perpendicular",
        },
        {
          prompt: "Do the lines \\(\\bar{r} = \\lambda(\\hat{i} + \\hat{j})\\) and \\(\\bar{r} = 2\\hat{i} + \\mu\\hat{j}\\) meet? If so, where?",
          answer: "Yes, at \\((2, 2, 0)\\)",
          method: "\\(x\\): \\(\\lambda = 2\\); \\(y\\): \\(\\lambda = \\mu = 2\\); \\(z\\): \\(0 = 0\\).",
        },
      ],
      pyqExampleId: "a98a5a9e-174a-4327-a14a-39f6f4b5557d",
      traps: [
        {
          title: "Putting the points into the angle",
          body: "The angle uses only the directions \\(\\bar{b_1}\\) and \\(\\bar{b_2}\\). The position vectors \\(\\bar{a_1}\\) and \\(\\bar{a_2}\\) never enter it.",
        },
        {
          title: "A negative cosine for the acute angle",
          body: "If the dot product is negative, the formula gives the obtuse angle. When the acute angle is asked, take the modulus of the dot product.",
        },
        {
          title: "Checking only two equations when lines are said to meet",
          body: "Two of the three coordinate equations always give some \\(\\lambda\\) and \\(\\mu\\). The lines meet only if the third equation holds too; write that check in the answer.",
        },
      ],
    },
  ],
};
