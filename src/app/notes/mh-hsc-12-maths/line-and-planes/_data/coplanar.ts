import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_COPLANAR_NOTE: SubtopicNote = {
  subtopicName: "Coplanarity of Two Lines",
  title: "Coplanarity of Two Lines",
  oneLineDefinition:
    "Two lines lie in one plane when they are parallel or when they meet. The test is a scalar triple product equal to zero, and the plane through both lines has normal b₁ × b₂.",
  whyItMatters:
    "6 questions, one of them from a board paper: show that two given lines intersect (2026), the same pair of lines the textbook proves coplanar in Solved Example 14. The textbook rows are Solved Example 14, Exercise 6.4 Question 3, and two written questions and one MCQ of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-coplanar-test",
      name: "Condition for two lines to be coplanar",
      intuition:
        "Parallel lines always lie in one plane. Two lines that are not parallel lie in one plane exactly when they meet, that is when the shortest distance between them is zero. So the test is the numerator of the shortest-distance formula.",
      definition:
        "- Two parallel lines are always coplanar.\n" +
        "- If two non-parallel lines are coplanar, the shortest distance between them is zero; and if that distance is zero, they are coplanar.\n" +
        "- So \\(\\bar{r} = \\bar{a_1} + \\lambda\\bar{b_1}\\) and \\(\\bar{r} = \\bar{a_2} + \\mu\\bar{b_2}\\) are coplanar if and only if \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 0\\).\n" +
        "- Cartesian form: \\(\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0\\).\n" +
        "- Work the scalar triple product as this determinant, with rows \\(\\bar{a_2} - \\bar{a_1}\\), \\(\\bar{b_1}\\), \\(\\bar{b_2}\\).",
      formula: {
        label: "Condition for coplanar lines",
        latex: "(\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 0",
      },
      authoredExample: {
        prompt:
          "Show that the lines \\(\\dfrac{x + 3}{-3} = \\dfrac{y - 1}{1} = \\dfrac{z - 5}{5}\\) and \\(\\dfrac{x + 1}{-1} = \\dfrac{y - 2}{2} = \\dfrac{z - 5}{5}\\) are coplanar.",
        steps: [
          "Given: \\((x_1, y_1, z_1) = (-3, 1, 5)\\), direction ratios \\(-3, 1, 5\\); \\((x_2, y_2, z_2) = (-1, 2, 5)\\), direction ratios \\(-1, 2, 5\\).",
          "\\(x_2 - x_1 = 2\\), \\(y_2 - y_1 = 1\\), \\(z_2 - z_1 = 0\\).",
          "\\(\\begin{vmatrix} 2 & 1 & 0 \\\\ -3 & 1 & 5 \\\\ -1 & 2 & 5 \\end{vmatrix} = 2(5 - 10) - 1(-15 + 5) + 0 = -10 + 10 = 0\\).",
          "The determinant is 0, so the lines are coplanar.",
        ],
        answer: "The determinant is 0, so the lines are coplanar",
      },
      selfCheckExample: {
        prompt:
          "Find \\(k\\) if the lines \\(\\dfrac{x - 1}{2} = \\dfrac{y}{1} = \\dfrac{z}{1}\\) and \\(\\dfrac{x}{1} = \\dfrac{y - k}{1} = \\dfrac{z}{2}\\) are coplanar.",
        steps: [
          "First row: \\((0 - 1, k - 0, 0 - 0) = (-1, k, 0)\\).",
          "\\(\\begin{vmatrix} -1 & k & 0 \\\\ 2 & 1 & 1 \\\\ 1 & 1 & 2 \\end{vmatrix} = -1(2 - 1) - k(4 - 1) + 0 = -1 - 3k = 0\\).",
        ],
        answer: "\\(k = -\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "Are two parallel lines always coplanar?", answer: "Yes" },
        {
          prompt:
            "For two lines, \\(\\bar{a_2} - \\bar{a_1} = \\hat{i}\\), \\(\\bar{b_1} = \\hat{j}\\) and \\(\\bar{b_2} = \\hat{k}\\). Are they coplanar?",
          answer: "No: \\(\\hat{i} \\cdot (\\hat{j} \\times \\hat{k}) = 1 \\neq 0\\), so they are skew",
        },
      ],
      pyqExampleId: "c0c87bfb-4e4b-41a6-a069-5d68c4ede399",
      traps: [
        {
          title: "Position vectors in place of their difference",
          body: "The first row of the determinant is \\(\\bar{a_2} - \\bar{a_1}\\), the step from one line to the other. Using \\(\\bar{a_1}\\) or \\(\\bar{a_2}\\) alone gives a value that means nothing.",
        },
        {
          title: "Concluding 'intersect' for parallel lines",
          body: "Parallel lines also give a triple product of 0, yet they never meet. Before you write 'the lines intersect', check that their direction ratios are not proportional.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-coplanar-plane",
      name: "Plane containing two coplanar lines",
      intuition:
        "The plane holds both directions b₁ and b₂, so its normal is b₁ × b₂. It also passes through a point of either line. That is a point and a normal again, the same last step as for any plane.",
      definition:
        "- The plane determined by the coplanar lines passes through \\(A(\\bar{a_1})\\) and has normal \\(\\bar{b_1} \\times \\bar{b_2}\\).\n" +
        "- Its equation is \\((\\bar{r} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 0\\), that is \\(\\bar{r} \\cdot (\\bar{b_1} \\times \\bar{b_2}) = \\bar{a_1} \\cdot (\\bar{b_1} \\times \\bar{b_2})\\).\n" +
        "- Cartesian form: \\(\\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0\\).\n" +
        "- Board layout: show the lines are coplanar first, then find \\(\\bar{b_1} \\times \\bar{b_2}\\), then the plane, and check that \\(\\bar{a_2}\\) also satisfies it.",
      formula: {
        label: "Plane determined by two coplanar lines",
        latex: "\\bar{r} \\cdot (\\bar{b_1} \\times \\bar{b_2}) = \\bar{a_1} \\cdot (\\bar{b_1} \\times \\bar{b_2})",
      },
      authoredExample: {
        prompt:
          "Find the equation of the plane containing the lines \\(\\bar{r} = (\\hat{i} + \\hat{j}) + \\lambda(\\hat{i} + 2\\hat{j} - \\hat{k})\\) and \\(\\bar{r} = (\\hat{i} + \\hat{j}) + \\mu(-\\hat{i} + \\hat{j} - 2\\hat{k})\\).",
        steps: [
          "Both lines pass through \\((1, 1, 0)\\), so they meet and are coplanar.",
          "\\(\\bar{b_1} \\times \\bar{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & -1 \\\\ -1 & 1 & -2 \\end{vmatrix} = \\hat{i}(-4 + 1) - \\hat{j}(-2 - 1) + \\hat{k}(1 + 2) = -3\\hat{i} + 3\\hat{j} + 3\\hat{k}\\).",
          "Take \\(\\bar{n} = -\\hat{i} + \\hat{j} + \\hat{k}\\) (dividing by 3); \\(\\bar{a_1} \\cdot \\bar{n} = -1 + 1 + 0 = 0\\).",
          "\\(\\bar{r} \\cdot (-\\hat{i} + \\hat{j} + \\hat{k}) = 0\\), that is \\(-x + y + z = 0\\).",
          "Check: \\(\\bar{b_1} \\cdot \\bar{n} = -1 + 2 - 1 = 0\\) and \\(\\bar{b_2} \\cdot \\bar{n} = 1 + 1 - 2 = 0\\).",
        ],
        answer: "\\(\\bar{r} \\cdot (\\hat{i} - \\hat{j} - \\hat{k}) = 0\\), that is \\(x - y - z = 0\\)",
      },
      selfCheckExample: {
        prompt:
          "Two coplanar lines have \\(\\bar{b_1} \\times \\bar{b_2} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\), and one of them passes through \\((1, 1, 1)\\). Write the equation of the plane containing them.",
        steps: ["\\(\\bar{a_1} \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 2 - 1 + 3 = 4\\)."],
        answer: "\\(\\bar{r} \\cdot (2\\hat{i} - \\hat{j} + 3\\hat{k}) = 4\\), that is \\(2x - y + 3z = 4\\)",
      },
      practiceSet: [
        {
          prompt: "Two lines through the origin run along \\(\\hat{i}\\) and along \\(\\hat{j}\\). Which plane contains both?",
          answer: "The XY plane, \\(z = 0\\)",
        },
        {
          prompt:
            "Two lines meet at \\((2, 0, 1)\\) and have directions \\(\\hat{i} + \\hat{k}\\) and \\(\\hat{j}\\). Find the plane containing them.",
          answer: "\\(x - z = 1\\)",
          method: "\\((\\hat{i} + \\hat{k}) \\times \\hat{j} = -\\hat{i} + \\hat{k}\\); through \\((2, 0, 1)\\): \\(-x + z = -1\\).",
        },
      ],
      pyqExampleId: "73282058-bdd4-4f3e-9ee1-9bf506959a11",
      traps: [
        {
          title: "Skipping the coplanarity step",
          body: "In 'show that the lines are coplanar and find the plane', the first marks are for the test. Write the triple product and its value 0 before you find the plane.",
        },
        {
          title: "A point that is not on either line",
          body: "The constant on the right is \\(\\bar{a_1} \\cdot \\bar{n}\\) (or \\(\\bar{a_2} \\cdot \\bar{n}\\)), the dot product with a point of a line. Using \\(\\bar{a_2} - \\bar{a_1}\\) there gives a plane that misses both lines.",
        },
      ],
    },
  ],
};
