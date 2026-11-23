import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_SKEW_NOTE: SubtopicNote = {
  subtopicName: "Skew Lines and Shortest Distance",
  title: "Skew Lines and the Shortest Distance Between Two Lines",
  oneLineDefinition:
    "Two lines in space that neither meet nor are parallel are skew. This page finds the shortest distance between them, tests whether two lines intersect, and finds the distance between parallel lines.",
  whyItMatters:
    "21 questions, six of them from board papers: the shortest distance between two skew lines (2016, 2023, 2024, 2025) and the distance between two parallel lines (2022, 2026). The four skew-line questions are only two questions, each set twice: the 2016 and 2024 one is Exercise 6.2 Question 3, and the 2023 and 2025 one is Solved Example 15. The textbook rows are Exercise 6.2 Questions 3, 4, 7 and 8, Solved Examples 14 to 18, Miscellaneous Exercise 6 A Questions 16 and 17, and two MCQs of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-skew-distance",
      name: "Shortest distance between skew lines",
      intuition:
        "Skew lines never meet and are not parallel, so no plane holds both. The shortest segment PQ joining them is perpendicular to both lines, so it runs along b₁ × b₂. Its length is the projection, on that direction, of the segment AB joining a point of one line to a point of the other.",
      definition:
        "- **Theorem 6.6:** the lines \\(\\bar{r} = \\bar{a_1} + \\lambda\\bar{b_1}\\) and \\(\\bar{r} = \\bar{a_2} + \\mu\\bar{b_2}\\) pass through \\(A(\\bar{a_1})\\) and \\(B(\\bar{a_2})\\).\n" +
        "- Let \\(PQ\\) be the segment perpendicular to both lines. It is parallel to \\(\\bar{b_1} \\times \\bar{b_2}\\).\n" +
        "- \\(PQ\\) = the projection of \\(\\overline{AB} = \\bar{a_2} - \\bar{a_1}\\) on \\(\\bar{b_1} \\times \\bar{b_2}\\).\n" +
        "- \\(\\therefore d = \\left|\\dfrac{(\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2})}{|\\bar{b_1} \\times \\bar{b_2}|}\\right|\\).\n" +
        "- For lines in Cartesian form, first read \\(\\bar{a_1}, \\bar{b_1}\\) and \\(\\bar{a_2}, \\bar{b_2}\\) from the numerators and denominators.\n" +
        "- Board layout: \\(\\bar{a_1}, \\bar{a_2}, \\bar{b_1}, \\bar{b_2}\\); \\(\\bar{b_1} \\times \\bar{b_2}\\) as a determinant; its magnitude; \\(\\bar{a_2} - \\bar{a_1}\\); the dot product; \\(d\\) with units.",
      formula: {
        label: "Shortest distance between skew lines",
        latex: "d = \\left|\\frac{(\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2})}{|\\bar{b_1} \\times \\bar{b_2}|}\\right|",
      },
      authoredExample: {
        prompt:
          "Find the shortest distance between the lines \\(\\bar{r} = (\\hat{i} + \\hat{j}) + \\lambda(2\\hat{i} - \\hat{j} + \\hat{k})\\) and \\(\\bar{r} = (2\\hat{i} + \\hat{j} - \\hat{k}) + \\mu(3\\hat{i} - 5\\hat{j} + 2\\hat{k})\\).",
        steps: [
          "Given: \\(\\bar{a_1} = \\hat{i} + \\hat{j}\\), \\(\\bar{b_1} = 2\\hat{i} - \\hat{j} + \\hat{k}\\), \\(\\bar{a_2} = 2\\hat{i} + \\hat{j} - \\hat{k}\\), \\(\\bar{b_2} = 3\\hat{i} - 5\\hat{j} + 2\\hat{k}\\).",
          "\\(\\bar{b_1} \\times \\bar{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 1 \\\\ 3 & -5 & 2 \\end{vmatrix} = \\hat{i}(-2 + 5) - \\hat{j}(4 - 3) + \\hat{k}(-10 + 3) = 3\\hat{i} - \\hat{j} - 7\\hat{k}\\).",
          "\\(|\\bar{b_1} \\times \\bar{b_2}| = \\sqrt{9 + 1 + 49} = \\sqrt{59}\\).",
          "\\(\\bar{a_2} - \\bar{a_1} = \\hat{i} - \\hat{k}\\), so \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 3 + 0 + 7 = 10\\).",
          "\\(d = \\dfrac{|10|}{\\sqrt{59}} = \\dfrac{10}{\\sqrt{59}}\\).",
        ],
        answer: "\\(\\dfrac{10}{\\sqrt{59}}\\) units",
      },
      selfCheckExample: {
        prompt:
          "For two lines, \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = -6\\) and \\(\\bar{b_1} \\times \\bar{b_2} = 2\\hat{i} - \\hat{j} + 2\\hat{k}\\). Find the shortest distance between them.",
        steps: ["\\(|\\bar{b_1} \\times \\bar{b_2}| = \\sqrt{4 + 1 + 4} = 3\\), so \\(d = \\dfrac{|-6|}{3}\\)."],
        answer: "2 units",
      },
      practiceSet: [
        {
          prompt: "Find \\((2\\hat{i} + \\hat{j}) \\times (\\hat{i} - \\hat{k})\\).",
          answer: "\\(-\\hat{i} + 2\\hat{j} - \\hat{k}\\)",
        },
        {
          prompt: "Can two skew lines be parallel? Can they lie in one plane?",
          answer: "No to both: skew lines neither meet nor are parallel, so they are not coplanar",
        },
      ],
      pyqExampleId: "849dcd32-5199-4e5a-b098-df52bcfb2927",
      traps: [
        {
          title: "A magnitude where a dot product belongs",
          body: "The numerator is the dot product \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2})\\), a number. Only the denominator is a magnitude, \\(|\\bar{b_1} \\times \\bar{b_2}|\\).",
        },
        {
          title: "A negative distance",
          body: "The dot product may come out negative. A distance never does: take its modulus before dividing.",
        },
        {
          title: "An unchecked cross product",
          body: "One sign slip in \\(\\bar{b_1} \\times \\bar{b_2}\\) spoils both the numerator and the denominator. Dot it with \\(\\bar{b_1}\\) and with \\(\\bar{b_2}\\); both must give 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-intersect-test",
      name: "Do two lines intersect?",
      intuition:
        "Two lines meet exactly when the shortest distance between them is zero, so the numerator of the skew-line formula must be zero. In Cartesian form that numerator is a 3 by 3 determinant. A non-zero value means the lines are skew.",
      definition:
        "- Two lines that are not parallel intersect if and only if \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 0\\).\n" +
        "- Cartesian form: \\(\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0\\).\n" +
        "- If the value is not 0, the shortest distance is not 0 and the lines do not intersect: they are skew.\n" +
        "- To find an unknown \\(k\\) that makes the lines intersect, set the determinant equal to 0 and solve.\n" +
        "- To find the point where they meet, equate the general points of the two lines.",
      formula: {
        label: "Condition for two lines to intersect",
        latex: "(\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 0",
      },
      authoredExample: {
        prompt:
          "By computing the shortest distance, show that the lines \\(\\bar{r} = (\\hat{i} + 2\\hat{j} + 3\\hat{k}) + \\lambda(\\hat{i} - \\hat{j} + \\hat{k})\\) and \\(\\bar{r} = (2\\hat{i} + \\hat{j} + 4\\hat{k}) + \\mu(2\\hat{i} + \\hat{j} + 2\\hat{k})\\) intersect, and find their point of intersection.",
        steps: [
          "\\(\\bar{b_1} \\times \\bar{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -1 & 1 \\\\ 2 & 1 & 2 \\end{vmatrix} = \\hat{i}(-2 - 1) - \\hat{j}(2 - 2) + \\hat{k}(1 + 2) = -3\\hat{i} + 3\\hat{k} \\neq \\bar{0}\\), so the lines are not parallel.",
          "\\(\\bar{a_2} - \\bar{a_1} = \\hat{i} - \\hat{j} + \\hat{k}\\), and \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = -3 + 0 + 3 = 0\\).",
          "So the shortest distance is 0 and the lines intersect.",
          "Equate general points: \\(1 + \\lambda = 2 + 2\\mu\\), \\(2 - \\lambda = 1 + \\mu\\), \\(3 + \\lambda = 4 + 2\\mu\\).",
          "From the first two, \\(\\lambda - 2\\mu = 1\\) and \\(\\lambda + \\mu = 1\\), so \\(\\mu = 0\\), \\(\\lambda = 1\\). The third gives \\(4 = 4\\), as it must.",
          "Putting \\(\\lambda = 1\\) in the first line: \\(2\\hat{i} + \\hat{j} + 4\\hat{k}\\).",
        ],
        answer: "The lines intersect at \\((2, 1, 4)\\)",
      },
      selfCheckExample: {
        prompt:
          "Two lines are not parallel, and \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 0\\) for them. Do they intersect?",
        steps: ["The shortest distance is \\(\\dfrac{0}{|\\bar{b_1} \\times \\bar{b_2}|} = 0\\)."],
        answer: "Yes, they intersect",
      },
      practiceSet: [
        {
          prompt: "Two different lines have direction ratios \\(1, 2, 3\\) and \\(2, 4, 6\\). Can they intersect?",
          answer: "No: the directions are proportional, so the lines are parallel",
        },
        {
          prompt: "For two lines, \\((\\bar{a_2} - \\bar{a_1}) \\cdot (\\bar{b_1} \\times \\bar{b_2}) = 5\\). Do they intersect?",
          answer: "No: the shortest distance is not 0, so the lines are skew",
        },
      ],
      pyqExampleId: "301a776d-655c-4f4b-80fd-1f88d2f0e230",
      traps: [
        {
          title: "Using the test on parallel lines",
          body: "For parallel lines \\(\\bar{b_1} \\times \\bar{b_2} = \\bar{0}\\), so the triple product is 0 even though the lines never meet. Check the directions are not proportional first.",
        },
        {
          title: "A verdict without its reason",
          body: "Write 'shortest distance = 0, hence the lines intersect' or 'shortest distance is not 0, hence the lines do not intersect'. The value alone does not answer the question asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-parallel-distance",
      name: "Distance between parallel lines",
      intuition:
        "Parallel lines have the same direction b, so b₁ × b₂ = 0 and the skew-line formula would divide by zero. Instead, the distance between them is the distance of any point of one line from the other line.",
      definition:
        "- **Theorem 6.7:** the distance between the parallel lines \\(\\bar{r} = \\bar{a_1} + \\lambda\\bar{b}\\) and \\(\\bar{r} = \\bar{a_2} + \\mu\\bar{b}\\) is \\(d = \\dfrac{|(\\bar{a_2} - \\bar{a_1}) \\times \\bar{b}|}{|\\bar{b}|}\\).\n" +
        "- Another way: it is the distance of \\(A(\\bar{a_1})\\) from the other line, \\(d = \\sqrt{|\\bar{a_2} - \\bar{a_1}|^2 - \\left[\\dfrac{(\\bar{a_2} - \\bar{a_1}) \\cdot \\bar{b}}{|\\bar{b}|}\\right]^2}\\).\n" +
        "- First check that the lines are parallel: their direction ratios must be proportional. Use the same \\(\\bar{b}\\) for both.",
      formula: {
        label: "Distance between parallel lines",
        latex: "d = \\frac{|(\\bar{a_2} - \\bar{a_1}) \\times \\bar{b}|}{|\\bar{b}|}",
      },
      authoredExample: {
        prompt:
          "Find the distance between the parallel lines \\(\\bar{r} = (\\hat{i} + 2\\hat{j} - 4\\hat{k}) + \\lambda(2\\hat{i} + 3\\hat{j} + 6\\hat{k})\\) and \\(\\bar{r} = (3\\hat{i} + 3\\hat{j} - 5\\hat{k}) + \\mu(2\\hat{i} + 3\\hat{j} + 6\\hat{k})\\).",
        steps: [
          "Given: \\(\\bar{a_2} - \\bar{a_1} = 2\\hat{i} + \\hat{j} - \\hat{k}\\) and \\(\\bar{b} = 2\\hat{i} + 3\\hat{j} + 6\\hat{k}\\), with \\(|\\bar{b}| = \\sqrt{4 + 9 + 36} = 7\\).",
          "\\((\\bar{a_2} - \\bar{a_1}) \\times \\bar{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 1 & -1 \\\\ 2 & 3 & 6 \\end{vmatrix} = \\hat{i}(6 + 3) - \\hat{j}(12 + 2) + \\hat{k}(6 - 2) = 9\\hat{i} - 14\\hat{j} + 4\\hat{k}\\).",
          "\\(|(\\bar{a_2} - \\bar{a_1}) \\times \\bar{b}| = \\sqrt{81 + 196 + 16} = \\sqrt{293}\\).",
          "\\(d = \\dfrac{\\sqrt{293}}{7}\\).",
        ],
        answer: "\\(\\dfrac{\\sqrt{293}}{7}\\) units",
      },
      selfCheckExample: {
        prompt:
          "For two parallel lines, \\(|\\bar{b}| = 3\\) and \\((\\bar{a_2} - \\bar{a_1}) \\times \\bar{b} = 2\\hat{i} - 2\\hat{j} + \\hat{k}\\). Find the distance between them.",
        steps: ["\\(|2\\hat{i} - 2\\hat{j} + \\hat{k}| = \\sqrt{4 + 4 + 1} = 3\\), so \\(d = \\dfrac{3}{3}\\)."],
        answer: "1 unit",
      },
      practiceSet: [
        {
          prompt:
            "Are the lines \\(\\dfrac{x}{1} = \\dfrac{y}{2} = \\dfrac{z}{2}\\) and \\(\\dfrac{x - 1}{-2} = \\dfrac{y}{-4} = \\dfrac{z + 1}{-4}\\) parallel?",
          answer: "Yes: \\(-2, -4, -4\\) is \\(-2\\) times \\(1, 2, 2\\)",
        },
        {
          prompt: "The distance between two parallel lines equals the distance of which point from which line?",
          answer: "Of any point of one line from the other line",
        },
      ],
      pyqExampleId: "d2e2a421-d8a2-4833-87a8-a2f1551cc126",
      traps: [
        {
          title: "Using the skew-line formula on parallel lines",
          body: "For parallel lines \\(\\bar{b_1} \\times \\bar{b_2} = \\bar{0}\\), so the skew-line formula divides by zero. Use \\(\\dfrac{|(\\bar{a_2} - \\bar{a_1}) \\times \\bar{b}|}{|\\bar{b}|}\\).",
        },
        {
          title: "Two different multiples of the direction",
          body: "If one line is written with \\(\\bar{b}\\) and the other with \\(2\\bar{b}\\), pick one of them and use it throughout. Mixing them changes the cross product and the magnitude by different factors.",
        },
      ],
    },
  ],
};
