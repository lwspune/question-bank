import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_TG_LINE_NOTE: SubtopicNote = {
  subtopicName: "Equation of a Line in Space",
  title: "Equation of a Line in Space",
  oneLineDefinition:
    "A line in space is fixed by a point on it and a direction: its vector equation adds any multiple of a direction vector to the point's position vector, and its Cartesian equation sets three ratios equal.",
  whyItMatters:
    "76 questions, sixty-nine of them from board papers, the most of any page in this chapter: six in 2022 and fourteen to eighteen a year from 2023 to 2026. One-mark MCQs ask for the line through a point parallel to a vector, a line or an axis (2023 to 2025). The long answers ask for the foot of the perpendicular from a point and its length (every year from 2023), the image of a point in a line (2023, 2024 and 2025), a line perpendicular to two given lines (2023 to 2026), the point where two lines meet (every year from 2022), and the points of a line at a given distance from a point (2022, 2023, 2025 and 2026). The case studies of 2022 and 2025 put two lines in a story about motorcycles, transmission wires and metro tracks. The textbook adds Example 6, Exercise 11.2 Q4 to Q7 and Miscellaneous Exercise Q2 and Q5.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmtg-line-forms",
      name: "Vector and Cartesian equations of a line through a point",
      intuition:
        "Stand at a point \\(A\\) with position vector \\(\\vec{a}\\) and walk along a vector \\(\\vec{b}\\). After walking \\(\\lambda\\) times \\(\\vec{b}\\) you are at \\(\\vec{r} = \\vec{a} + \\lambda\\vec{b}\\). Every real \\(\\lambda\\) gives a point of the line, and every point of the line comes from one \\(\\lambda\\). Comparing the \\(\\hat{i}\\), \\(\\hat{j}\\), \\(\\hat{k}\\) parts and removing \\(\\lambda\\) gives the Cartesian form.",
      definition:
        "- **Vector form:** \\(\\vec{r} = \\vec{a} + \\lambda\\vec{b}\\), where \\(\\vec{a}\\) is the position vector of a point and \\(\\vec{b} = a\\hat{i} + b\\hat{j} + c\\hat{k}\\) is parallel to the line.\n" +
        "- **Parametric form:** \\(x = x_1 + \\lambda a\\), \\(y = y_1 + \\lambda b\\), \\(z = z_1 + \\lambda c\\).\n" +
        "- **Cartesian form:** \\(\\dfrac{x - x_1}{a} = \\dfrac{y - y_1}{b} = \\dfrac{z - z_1}{c}\\).\n" +
        "- **Through two points** with position vectors \\(\\vec{a}\\) and \\(\\vec{b}\\): \\(\\vec{r} = \\vec{a} + \\lambda(\\vec{b} - \\vec{a})\\).\n" +
        "- **Parallel to a given line:** copy its direction ratios, after putting it in standard form. Parallel to the y-axis: \\(\\vec{b} = \\hat{j}\\).\n" +
        "- From a vector equation such as \\(\\vec{r} = (2 + \\lambda)\\hat{i} + \\lambda\\hat{j} + (2\\lambda - 1)\\hat{k}\\), collect the terms in \\(\\lambda\\): the point is \\((2, 0, -1)\\) and the direction is \\(\\hat{i} + \\hat{j} + 2\\hat{k}\\).",
      formula: {
        label: "Line through a point, parallel to a vector",
        latex: "\\vec{r} = \\vec{a} + \\lambda\\vec{b} \\qquad \\dfrac{x - x_1}{a} = \\dfrac{y - y_1}{b} = \\dfrac{z - z_1}{c}",
        symbols: [
          { symbol: "\\(\\vec{a}\\)", meaning: "position vector of the point (x₁, y₁, z₁)" },
          { symbol: "\\(\\vec{b}\\)", meaning: "a vector along the line, with direction ratios a, b, c" },
          { symbol: "\\(\\lambda\\)", meaning: "a real number (the parameter)" },
        ],
      },
      authoredExample: {
        prompt: "Find the vector and Cartesian equations of the line through \\((3, -1, 2)\\) parallel to the line \\(\\dfrac{x + 2}{4} = \\dfrac{1 - y}{2} = \\dfrac{3z - 6}{9}\\).",
        steps: [
          "Put the given line in standard form: \\(\\dfrac{1 - y}{2} = \\dfrac{y - 1}{-2}\\) and \\(\\dfrac{3z - 6}{9} = \\dfrac{3(z - 2)}{9} = \\dfrac{z - 2}{3}\\).",
          "So the given line is \\(\\dfrac{x + 2}{4} = \\dfrac{y - 1}{-2} = \\dfrac{z - 2}{3}\\), with direction ratios \\(4, -2, 3\\).",
          "A parallel line has the same direction: \\(\\vec{b} = 4\\hat{i} - 2\\hat{j} + 3\\hat{k}\\).",
          "The point: \\(\\vec{a} = 3\\hat{i} - \\hat{j} + 2\\hat{k}\\).",
          "Vector equation: \\(\\vec{r} = (3\\hat{i} - \\hat{j} + 2\\hat{k}) + \\lambda(4\\hat{i} - 2\\hat{j} + 3\\hat{k})\\).",
          "Cartesian equation: \\(\\dfrac{x - 3}{4} = \\dfrac{y + 1}{-2} = \\dfrac{z - 2}{3}\\).",
        ],
        answer: "\\(\\vec{r} = (3\\hat{i} - \\hat{j} + 2\\hat{k}) + \\lambda(4\\hat{i} - 2\\hat{j} + 3\\hat{k})\\); \\(\\dfrac{x - 3}{4} = \\dfrac{y + 1}{-2} = \\dfrac{z - 2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "The Cartesian equation of a line is \\(\\dfrac{x + 1}{2} = \\dfrac{y - 4}{-3} = \\dfrac{z}{5}\\). Write its vector equation.",
        steps: [
          "The line passes through \\((-1, 4, 0)\\), so \\(\\vec{a} = -\\hat{i} + 4\\hat{j}\\).",
          "Its direction ratios are \\(2, -3, 5\\), so \\(\\vec{b} = 2\\hat{i} - 3\\hat{j} + 5\\hat{k}\\).",
          "\\(\\vec{r} = (-\\hat{i} + 4\\hat{j}) + \\lambda(2\\hat{i} - 3\\hat{j} + 5\\hat{k})\\).",
        ],
        answer: "\\(\\vec{r} = (-\\hat{i} + 4\\hat{j}) + \\lambda(2\\hat{i} - 3\\hat{j} + 5\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Find the vector equation of the line through \\((0, 2, -3)\\) parallel to the z-axis.", answer: "\\(\\vec{r} = 2\\hat{j} - 3\\hat{k} + \\lambda\\hat{k}\\)" },
        { prompt: "Write the Cartesian equation of the line \\(\\vec{r} = (1 + 2\\lambda)\\hat{i} + (3 - \\lambda)\\hat{j} + 4\\lambda\\hat{k}\\).", answer: "\\(\\dfrac{x - 1}{2} = \\dfrac{y - 3}{-1} = \\dfrac{z}{4}\\)" },
        { prompt: "Find the vector equation of the line through the points with position vectors \\(\\hat{i} - \\hat{j} + 2\\hat{k}\\) and \\(3\\hat{i} + \\hat{j} - \\hat{k}\\).", answer: "\\(\\vec{r} = (\\hat{i} - \\hat{j} + 2\\hat{k}) + \\lambda(2\\hat{i} + 2\\hat{j} - 3\\hat{k})\\)" },
      ],
      pyqExampleId: "90f55e3f-7b6e-4d9c-b0c0-109717cc2460",
      traps: [
        {
          title: "Keeping the old point",
          body: "A line parallel to a given line copies only its direction. The point must be the new one the question gives; MCQ options often keep the given line's point to catch this.",
        },
        {
          title: "Copying a direction before the standard form",
          body: "From a line printed as a chain of expressions, or with numerators like \\((k - y)\\), the direction ratios can be read only after each variable has coefficient \\(+1\\).",
        },
        {
          title: "A vector equation without a parameter",
          body: "A vector equation needs \\(\\vec{r} =\\) on the left and a parameter such as \\(\\lambda\\) multiplying the direction. Writing only \\(\\vec{a} + \\vec{b}\\) is one point, not a line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-line-points",
      name: "Points on a line: the general point and a given distance",
      intuition:
        "Set the three equal ratios equal to \\(\\lambda\\) and solve for \\(x\\), \\(y\\) and \\(z\\). This writes every point of the line with one letter. Any condition on the point, a given coordinate, a sum of coordinates or a distance from another point, becomes an equation in \\(\\lambda\\) alone.",
      definition:
        "- **General point:** from \\(\\dfrac{x - x_1}{a} = \\dfrac{y - y_1}{b} = \\dfrac{z - z_1}{c} = \\lambda\\), the point is \\((x_1 + a\\lambda,\\ y_1 + b\\lambda,\\ z_1 + c\\lambda)\\).\n" +
        "- **Line through two points** \\(A\\) and \\(B\\): use \\(A\\) as the point and \\(B - A\\) as the direction ratios.\n" +
        "- **A coordinate is given** (it meets the zx-plane where \\(y = 0\\), or \\(y\\) is three times \\(x\\)): one linear equation in \\(\\lambda\\).\n" +
        "- **At distance \\(d\\) from a point \\(Q\\):** write \\(PQ^2 = d^2\\). This is a quadratic in \\(\\lambda\\), so there are usually two points.\n" +
        "- **Medians, sides and diagonals** of a triangle or parallelogram are lines through two known points (a vertex and a mid-point, or two vertices).",
      formula: {
        label: "General point of a line",
        latex: "\\dfrac{x - x_1}{a} = \\dfrac{y - y_1}{b} = \\dfrac{z - z_1}{c} = \\lambda \\ \\Rightarrow\\ (x_1 + a\\lambda,\\ y_1 + b\\lambda,\\ z_1 + c\\lambda)",
      },
      authoredExample: {
        prompt: "Find the equation of the line through \\(A(2, -1, 1)\\) and \\(B(4, 1, 2)\\). Hence find the points on this line at a distance of 6 units from \\(A\\).",
        steps: [
          "Direction ratios of \\(AB\\): \\(4 - 2, 1 + 1, 2 - 1\\), that is \\(2, 2, 1\\).",
          "The line: \\(\\dfrac{x - 2}{2} = \\dfrac{y + 1}{2} = \\dfrac{z - 1}{1}\\).",
          "General point: \\(P(2\\lambda + 2,\\ 2\\lambda - 1,\\ \\lambda + 1)\\).",
          "\\(AP^2 = (2\\lambda)^2 + (2\\lambda)^2 + \\lambda^2 = 9\\lambda^2\\).",
          "\\(AP = 6\\), so \\(9\\lambda^2 = 36\\) and \\(\\lambda = \\pm 2\\).",
          "\\(\\lambda = 2\\) gives \\((6, 3, 3)\\); \\(\\lambda = -2\\) gives \\((-2, -5, -1)\\).",
        ],
        answer: "\\(\\dfrac{x - 2}{2} = \\dfrac{y + 1}{2} = \\dfrac{z - 1}{1}\\); the points \\((6, 3, 3)\\) and \\((-2, -5, -1)\\)",
      },
      selfCheckExample: {
        prompt: "Find the point on the line \\(\\dfrac{x - 1}{2} = \\dfrac{y + 3}{-1} = \\dfrac{z - 2}{4}\\) whose z-coordinate is 10.",
        steps: [
          "General point: \\((2\\lambda + 1,\\ -\\lambda - 3,\\ 4\\lambda + 2)\\).",
          "\\(4\\lambda + 2 = 10\\), so \\(\\lambda = 2\\).",
          "The point is \\((5, -5, 10)\\).",
        ],
        answer: "\\((5, -5, 10)\\)",
      },
      practiceSet: [
        { prompt: "Find where the line through \\((2, -3, 1)\\) and \\((4, 1, 3)\\) crosses the xy-plane.", answer: "\\((1, -5, 0)\\)", method: "General point \\((2\\lambda + 2, 4\\lambda - 3, 2\\lambda + 1)\\); \\(z = 0\\) gives \\(\\lambda = -\\dfrac{1}{2}\\)." },
        { prompt: "Find the point on the line \\(\\dfrac{x + 1}{1} = \\dfrac{y - 2}{2} = \\dfrac{z - 3}{-2}\\) whose coordinates add up to 5.", answer: "\\((0, 4, 1)\\)", method: "\\((\\lambda - 1) + (2\\lambda + 2) + (-2\\lambda + 3) = \\lambda + 4 = 5\\)" },
        { prompt: "\\(A(1, 3, -2)\\) and \\(B(5, -1, 4)\\) are two vertices of a triangle with the third vertex at the origin. Find the equation of the median through the origin.", answer: "\\(\\dfrac{x}{3} = \\dfrac{y}{1} = \\dfrac{z}{1}\\)", method: "The mid-point of \\(AB\\) is \\((3, 1, 1)\\)." },
      ],
      pyqExampleId: "84aa54cf-a541-4ba8-b8d2-ad8370c353e7",
      traps: [
        {
          title: "One point where there are two",
          body: "A distance condition gives a quadratic in \\(\\lambda\\). Both roots are points of the line at that distance, one on each side. Give both.",
        },
        {
          title: "Measuring from the wrong point",
          body: "Read whether the distance is from \\(A\\), from \\(B\\) or from some other point, and subtract that point's coordinates from the general point.",
        },
        {
          title: "Leaving the square root in",
          body: "Square both sides of \\(PQ = d\\) before expanding. Expanding under a square root is where most arithmetic slips happen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-line-perp",
      name: "A line perpendicular to two given lines",
      intuition:
        "A direction perpendicular to both \\(\\vec{b_1}\\) and \\(\\vec{b_2}\\) is exactly what the cross product gives: \\(\\vec{b_1} \\times \\vec{b_2}\\) is perpendicular to each of them. So the required line has the given point and the direction \\(\\vec{b_1} \\times \\vec{b_2}\\).",
      definition:
        "- Read \\(\\vec{b_1}\\) and \\(\\vec{b_2}\\) from the two lines, in standard form.\n" +
        "- Direction of the required line: \\(\\vec{b} = \\vec{b_1} \\times \\vec{b_2}\\). Divide out any common factor.\n" +
        "- The same answer comes from solving \\(a a_1 + b b_1 + c c_1 = 0\\) and \\(a a_2 + b b_2 + c c_2 = 0\\) by cross-multiplication.\n" +
        "- Check: \\(\\vec{b} \\cdot \\vec{b_1} = 0\\) and \\(\\vec{b} \\cdot \\vec{b_2} = 0\\).\n" +
        "- If the line must pass through the point where the two lines meet, find that point first (see the next concept).",
      formula: {
        label: "Direction perpendicular to two lines",
        latex: "\\vec{b} = \\vec{b_1} \\times \\vec{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}",
      },
      authoredExample: {
        prompt: "Find the vector and Cartesian equations of the line through \\((1, 0, -2)\\) perpendicular to both the lines \\(\\dfrac{x - 2}{1} = \\dfrac{y + 1}{-1} = \\dfrac{z}{2}\\) and \\(\\dfrac{x + 3}{2} = \\dfrac{y - 4}{1} = \\dfrac{z - 1}{-1}\\).",
        steps: [
          "\\(\\vec{b_1} = \\hat{i} - \\hat{j} + 2\\hat{k}\\) and \\(\\vec{b_2} = 2\\hat{i} + \\hat{j} - \\hat{k}\\).",
          "\\(\\vec{b_1} \\times \\vec{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -1 & 2 \\\\ 2 & 1 & -1 \\end{vmatrix} = \\hat{i}(1 - 2) - \\hat{j}(-1 - 4) + \\hat{k}(1 + 2)\\).",
          "\\(= -\\hat{i} + 5\\hat{j} + 3\\hat{k}\\).",
          "Check: \\(-1 - 5 + 6 = 0\\) and \\(-2 + 5 - 3 = 0\\).",
          "Vector equation: \\(\\vec{r} = (\\hat{i} - 2\\hat{k}) + \\lambda(-\\hat{i} + 5\\hat{j} + 3\\hat{k})\\).",
          "Cartesian equation: \\(\\dfrac{x - 1}{-1} = \\dfrac{y}{5} = \\dfrac{z + 2}{3}\\).",
        ],
        answer: "\\(\\vec{r} = (\\hat{i} - 2\\hat{k}) + \\lambda(-\\hat{i} + 5\\hat{j} + 3\\hat{k})\\); \\(\\dfrac{x - 1}{-1} = \\dfrac{y}{5} = \\dfrac{z + 2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Find the vector equation of the line through the origin perpendicular to both \\(\\vec{r} = \\lambda(\\hat{i} + 2\\hat{j} + 2\\hat{k})\\) and \\(\\vec{r} = \\hat{i} + \\mu(2\\hat{i} - \\hat{j})\\).",
        steps: [
          "\\(\\vec{b_1} \\times \\vec{b_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 2 \\\\ 2 & -1 & 0 \\end{vmatrix} = \\hat{i}(0 + 2) - \\hat{j}(0 - 4) + \\hat{k}(-1 - 4)\\).",
          "\\(= 2\\hat{i} + 4\\hat{j} - 5\\hat{k}\\).",
          "\\(\\vec{r} = \\lambda(2\\hat{i} + 4\\hat{j} - 5\\hat{k})\\).",
        ],
        answer: "\\(\\vec{r} = \\lambda(2\\hat{i} + 4\\hat{j} - 5\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Find direction ratios of a line perpendicular to the lines with direction ratios \\(1, 1, 0\\) and \\(0, 1, 1\\).", answer: "\\(1, -1, 1\\)" },
        { prompt: "Write the Cartesian equation of the line through \\((2, -1, 3)\\) perpendicular to both the x-axis and the y-axis.", answer: "\\(\\dfrac{x - 2}{0} = \\dfrac{y + 1}{0} = \\dfrac{z - 3}{1}\\)" },
        { prompt: "Find a direction perpendicular to lines with direction ratios \\(3, -1, 2\\) and \\(1, 2, -1\\).", answer: "\\(-3, 5, 7\\)", method: "Check: \\(-9 - 5 + 14 = 0\\) and \\(-3 + 10 - 7 = 0\\)." },
      ],
      pyqExampleId: "515da6ee-40b8-41d1-a5b4-e351677e8509",
      traps: [
        {
          title: "The middle sign of the cross product",
          body: "The \\(\\hat{j}\\) term of \\(\\vec{b_1} \\times \\vec{b_2}\\) carries a minus sign: \\(-\\hat{j}(a_1c_2 - a_2c_1)\\). Check the answer with two dot products; both must be zero.",
        },
        {
          title: "Adding or dotting the directions",
          body: "\\(\\vec{b_1} + \\vec{b_2}\\) is not perpendicular to either line, and \\(\\vec{b_1} \\cdot \\vec{b_2}\\) is a number, not a direction. Only the cross product gives a direction perpendicular to both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-line-meet",
      name: "Where two lines meet",
      intuition:
        "Two lines meet when one point lies on both. Write a general point of each line with its own letter, \\(\\lambda\\) for one and \\(\\mu\\) for the other. Equating two coordinates gives two equations for \\(\\lambda\\) and \\(\\mu\\); the third coordinate is then the test.",
      definition:
        "- General points: \\(P(x_1 + a_1\\lambda,\\ y_1 + b_1\\lambda,\\ z_1 + c_1\\lambda)\\) and \\(Q(x_2 + a_2\\mu,\\ y_2 + b_2\\mu,\\ z_2 + c_2\\mu)\\).\n" +
        "- Equate two coordinates and solve for \\(\\lambda\\) and \\(\\mu\\).\n" +
        "- **Put them in the third equation.** If it holds, the lines meet, at \\(P\\) for that \\(\\lambda\\). If it fails, they do not meet.\n" +
        "- An unknown in the equations (a value of \\(b\\) or \\(p\\) that makes the lines meet) is found from the third equation, or from the shortest-distance test on the next page.\n" +
        "- A vertex of a figure is where two of its sides meet. The diagonals of a parallelogram meet at their common mid-point.",
      formula: {
        label: "The lines meet when one λ and one μ satisfy all three",
        latex: "x_1 + a_1\\lambda = x_2 + a_2\\mu,\\quad y_1 + b_1\\lambda = y_2 + b_2\\mu,\\quad z_1 + c_1\\lambda = z_2 + c_2\\mu",
      },
      authoredExample: {
        prompt: "Show that the lines \\(\\dfrac{x - 1}{2} = \\dfrac{y + 1}{3} = \\dfrac{z}{1}\\) and \\(\\dfrac{x - 4}{1} = \\dfrac{y - 1}{-1} = \\dfrac{z - 3}{2}\\) intersect, and find the point of intersection.",
        steps: [
          "General points: \\(P(2\\lambda + 1,\\ 3\\lambda - 1,\\ \\lambda)\\) and \\(Q(\\mu + 4,\\ -\\mu + 1,\\ 2\\mu + 3)\\).",
          "x-coordinates: \\(2\\lambda + 1 = \\mu + 4\\), so \\(2\\lambda - \\mu = 3\\).",
          "y-coordinates: \\(3\\lambda - 1 = -\\mu + 1\\), so \\(3\\lambda + \\mu = 2\\).",
          "Adding: \\(5\\lambda = 5\\), so \\(\\lambda = 1\\) and \\(\\mu = -1\\).",
          "z-coordinates: \\(\\lambda = 1\\) and \\(2\\mu + 3 = 1\\). They agree, so the lines intersect.",
          "The point is \\(P\\) at \\(\\lambda = 1\\): \\((3, 2, 1)\\).",
        ],
        answer: "They intersect at \\((3, 2, 1)\\).",
      },
      selfCheckExample: {
        prompt: "Do the lines \\(\\dfrac{x}{1} = \\dfrac{y}{1} = \\dfrac{z}{1}\\) and \\(\\dfrac{x - 2}{1} = \\dfrac{y + 1}{2} = \\dfrac{z - 3}{-1}\\) meet?",
        steps: [
          "General points: \\((\\lambda, \\lambda, \\lambda)\\) and \\((\\mu + 2,\\ 2\\mu - 1,\\ -\\mu + 3)\\).",
          "\\(\\lambda = \\mu + 2\\) and \\(\\lambda = 2\\mu - 1\\) give \\(\\mu = 3\\), \\(\\lambda = 5\\).",
          "z-coordinates: \\(\\lambda = 5\\) but \\(-\\mu + 3 = 0\\). They do not agree.",
          "So the lines do not meet.",
        ],
        answer: "No: the z-coordinates disagree, so there is no common point.",
      },
      practiceSet: [
        { prompt: "Find the point where the lines \\(\\vec{r} = \\lambda(\\hat{i} + \\hat{j} + \\hat{k})\\) and \\(\\vec{r} = 2\\hat{i} + \\hat{k} + \\mu(-\\hat{i} + \\hat{j})\\) meet.", answer: "\\((1, 1, 1)\\)", method: "\\(\\lambda = 2 - \\mu\\) and \\(\\lambda = \\mu\\) give \\(\\lambda = \\mu = 1\\); z: \\(1 = 1\\)." },
        { prompt: "Find \\(k\\) so that the lines \\(\\dfrac{x - 1}{1} = \\dfrac{y - 2}{1} = \\dfrac{z - k}{1}\\) and \\(\\dfrac{x}{2} = \\dfrac{y}{3} = \\dfrac{z}{1}\\) meet.", answer: "\\(k = 0\\); they meet at \\((2, 3, 1)\\)" },
        { prompt: "\\(A(1, 0, 2)\\), \\(B(3, 2, 2)\\), \\(C(5, 2, 0)\\), \\(D(3, 0, 0)\\) form a parallelogram. Where do its diagonals meet?", answer: "\\((3, 1, 1)\\), the common mid-point of \\(AC\\) and \\(BD\\)" },
      ],
      pyqExampleId: "f76fe110-13e8-46f0-80eb-997f6f5d203c",
      traps: [
        {
          title: "One letter for both lines",
          body: "Using \\(\\lambda\\) in both general points forces the two points to move together, and you may decide that lines which do meet do not. Give each line its own parameter.",
        },
        {
          title: "Not checking the third coordinate",
          body: "Two equations in \\(\\lambda\\) and \\(\\mu\\) always have a solution unless the lines are parallel. The lines meet only if that solution also satisfies the third equation; write the check in your answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-foot",
      name: "The foot of the perpendicular and the distance of a point from a line",
      intuition:
        "From a point \\(P\\) off a line, the shortest path to the line meets it at a right angle, at the foot \\(M\\). \\(M\\) is one of the line's general points, and the condition that \\(PM\\) is perpendicular to the line (dot product zero) fixes which one.",
      definition:
        "- Put the line in standard form and write its general point \\(M(x_1 + a\\lambda,\\ y_1 + b\\lambda,\\ z_1 + c\\lambda)\\).\n" +
        "- Direction ratios of \\(PM\\): \\(M - P\\), in terms of \\(\\lambda\\).\n" +
        "- \\(PM\\) is perpendicular to the line: \\(a(x_M - x_P) + b(y_M - y_P) + c(z_M - z_P) = 0\\). Solve for \\(\\lambda\\).\n" +
        "- Put \\(\\lambda\\) back to get the foot \\(M\\).\n" +
        "- The length of the perpendicular is \\(PM\\), the distance between \\(P\\) and \\(M\\).\n" +
        "- The same length is \\(\\dfrac{|\\vec{b} \\times (\\vec{p} - \\vec{a})|}{|\\vec{b}|}\\), the expression the book uses for the distance between parallel lines.",
      formula: {
        label: "Foot M of the perpendicular from P",
        latex: "M = (x_1 + a\\lambda,\\ y_1 + b\\lambda,\\ z_1 + c\\lambda), \\qquad \\overrightarrow{PM} \\cdot (a\\hat{i} + b\\hat{j} + c\\hat{k}) = 0",
      },
      authoredExample: {
        prompt: "Find the foot of the perpendicular from \\(P(1, 2, -3)\\) to the line \\(\\dfrac{x + 1}{2} = \\dfrac{y - 3}{-2} = \\dfrac{z}{-1}\\). Also find the length of the perpendicular.",
        steps: [
          "General point of the line: \\(M(2\\lambda - 1,\\ -2\\lambda + 3,\\ -\\lambda)\\).",
          "Direction ratios of \\(PM\\): \\(2\\lambda - 2,\\ -2\\lambda + 1,\\ -\\lambda + 3\\).",
          "\\(PM\\) is perpendicular to the line (direction ratios \\(2, -2, -1\\)): \\(2(2\\lambda - 2) - 2(-2\\lambda + 1) - 1(-\\lambda + 3) = 0\\).",
          "\\(4\\lambda - 4 + 4\\lambda - 2 + \\lambda - 3 = 0\\), so \\(9\\lambda = 9\\) and \\(\\lambda = 1\\).",
          "Foot: \\(M(1, 1, -1)\\).",
          "\\(PM = \\sqrt{0^2 + (-1)^2 + 2^2} = \\sqrt{5}\\).",
        ],
        answer: "Foot \\((1, 1, -1)\\); length \\(\\sqrt{5}\\) units",
      },
      selfCheckExample: {
        prompt: "Vertices \\(B\\) and \\(C\\) of a triangle lie on the line \\(\\dfrac{x - 1}{1} = \\dfrac{y + 1}{2} = \\dfrac{z + 4}{2}\\), and \\(BC = 4\\) units. The third vertex is the origin \\(O\\). Find the area of the triangle.",
        steps: [
          "The height from \\(O\\) is the perpendicular distance from \\(O\\) to the line. General point: \\(M(\\lambda + 1,\\ 2\\lambda - 1,\\ 2\\lambda - 4)\\).",
          "\\(OM \\perp\\) line: \\(1(\\lambda + 1) + 2(2\\lambda - 1) + 2(2\\lambda - 4) = 0\\).",
          "\\(9\\lambda - 9 = 0\\), so \\(\\lambda = 1\\) and \\(M = (2, 1, -2)\\).",
          "Height \\(OM = \\sqrt{4 + 1 + 4} = 3\\).",
          "Area \\(= \\dfrac{1}{2} \\times BC \\times OM = \\dfrac{1}{2} \\times 4 \\times 3 = 6\\).",
        ],
        answer: "6 square units",
      },
      practiceSet: [
        { prompt: "Find the length of the perpendicular from \\((1, 2, 3)\\) to the x-axis.", answer: "\\(\\sqrt{13}\\) units" },
        { prompt: "Find the foot of the perpendicular from \\((3, 1, 2)\\) to the line \\(\\vec{r} = \\lambda(\\hat{i} + \\hat{j} + \\hat{k})\\), and its length.", answer: "Foot \\((2, 2, 2)\\); length \\(\\sqrt{2}\\) units", method: "\\((\\lambda - 3) + (\\lambda - 1) + (\\lambda - 2) = 0\\)" },
        { prompt: "Find the foot of the perpendicular from \\((5, 0, 1)\\) to the line \\(\\dfrac{x - 1}{2} = \\dfrac{y}{-1} = \\dfrac{z + 1}{2}\\).", answer: "\\(\\left(\\dfrac{11}{3}, -\\dfrac{4}{3}, \\dfrac{5}{3}\\right)\\)", method: "\\(9\\lambda - 12 = 0\\), so \\(\\lambda = \\dfrac{4}{3}\\); the length is 2 units." },
      ],
      pyqExampleId: "a05d3569-9fe5-46eb-acd3-be27663194b6",
      traps: [
        {
          title: "Reading the direction before the standard form",
          body: "A numerator like \\((k - x)\\) means the denominator's sign must change before it is a direction ratio. A wrong sign in one direction ratio gives a wrong \\(\\lambda\\) and a wrong foot.",
        },
        {
          title: "Dotting the wrong vectors",
          body: "The perpendicular condition is \\(\\overrightarrow{PM}\\) dotted with the line's direction. Dotting \\(\\vec{p}\\) or \\(\\vec{a}\\) with the direction gives nothing useful.",
        },
        {
          title: "The length to the wrong point",
          body: "The length of the perpendicular is \\(P\\) to the foot \\(M\\), not \\(P\\) to the point printed in the line's equation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-image",
      name: "The image of a point in a line",
      intuition:
        "Fold space along the line like a mirror: \\(P\\) lands on its image \\(P'\\). The line is then the perpendicular bisector of \\(PP'\\), so the foot \\(M\\) of the perpendicular from \\(P\\) is the mid-point of \\(PP'\\). Find \\(M\\), then go the same distance again beyond it.",
      definition:
        "- Find the foot \\(M\\) of the perpendicular from \\(P\\) to the line (previous concept).\n" +
        "- \\(M\\) is the mid-point of \\(PP'\\): \\(P' = 2M - P\\), coordinate by coordinate.\n" +
        "- \\(PP' = 2PM\\), and the line \\(PP'\\) has the direction ratios of \\(PM\\).\n" +
        "- **Given the image, find the point:** the same steps starting from \\(P'\\).\n" +
        "- **Image of a line parallel to the mirror line:** it is parallel to the mirror line, so it is the line through the image of any one of its points, with the same direction.",
      formula: {
        label: "Image from the foot",
        latex: "M = \\dfrac{P + P'}{2} \\ \\Rightarrow\\ P' = 2M - P",
      },
      authoredExample: {
        prompt: "Find the image of the point \\(P(5, 0, 2)\\) in the line \\(\\dfrac{x - 1}{2} = \\dfrac{y + 1}{1} = \\dfrac{z - 2}{-2}\\). Also find the length \\(PP'\\).",
        steps: [
          "General point of the line: \\(M(2\\lambda + 1,\\ \\lambda - 1,\\ -2\\lambda + 2)\\).",
          "Direction ratios of \\(PM\\): \\(2\\lambda - 4,\\ \\lambda - 1,\\ -2\\lambda\\).",
          "\\(PM \\perp\\) line: \\(2(2\\lambda - 4) + 1(\\lambda - 1) - 2(-2\\lambda) = 0\\), so \\(9\\lambda - 9 = 0\\) and \\(\\lambda = 1\\).",
          "Foot: \\(M(3, 0, 0)\\).",
          "\\(M\\) is the mid-point of \\(PP'\\): \\(P' = (2 \\times 3 - 5,\\ 0 - 0,\\ 0 - 2) = (1, 0, -2)\\).",
          "\\(PP' = \\sqrt{16 + 0 + 16} = 4\\sqrt{2}\\).",
        ],
        answer: "Image \\((1, 0, -2)\\); \\(PP' = 4\\sqrt{2}\\) units",
      },
      selfCheckExample: {
        prompt: "Find the image of the point \\((3, 1, 2)\\) in the line \\(\\dfrac{x}{1} = \\dfrac{y}{2} = \\dfrac{z}{2}\\).",
        steps: [
          "General point \\(M(\\lambda, 2\\lambda, 2\\lambda)\\); \\(PM\\): \\(\\lambda - 3,\\ 2\\lambda - 1,\\ 2\\lambda - 2\\).",
          "\\((\\lambda - 3) + 2(2\\lambda - 1) + 2(2\\lambda - 2) = 0\\), so \\(9\\lambda = 9\\) and \\(M = (1, 2, 2)\\).",
          "Image \\(= 2M - P = (2 - 3,\\ 4 - 1,\\ 4 - 2) = (-1, 3, 2)\\).",
        ],
        answer: "\\((-1, 3, 2)\\)",
      },
      practiceSet: [
        { prompt: "Find the image of \\((2, 5, -1)\\) in the y-axis.", answer: "\\((-2, 5, 1)\\)", method: "The foot is \\((0, 5, 0)\\)." },
        { prompt: "The foot of the perpendicular from \\(A(1, 3, 4)\\) to a line is \\((2, 1, 0)\\). Find the image of \\(A\\) in the line.", answer: "\\((3, -1, -4)\\)" },
        { prompt: "A point and its image in a line are \\((1, 2, 3)\\) and \\((3, 0, 7)\\). Find the foot of the perpendicular.", answer: "\\((2, 1, 5)\\), the mid-point" },
      ],
      pyqExampleId: "3cad81b8-8f5e-481b-afb5-3e1509c14819",
      traps: [
        {
          title: "Stopping at the foot",
          body: "The foot \\(M\\) is halfway. The image is as far beyond \\(M\\) as \\(P\\) is before it: \\(P' = 2M - P\\).",
        },
        {
          title: "Subtracting the wrong way",
          body: "\\(M - P\\) is the step from \\(P\\) to the foot, not the image. Use the mid-point formula and solve for each coordinate of \\(P'\\).",
        },
      ],
    },
  ],
};
