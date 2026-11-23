import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_POINTPLANE_NOTE: SubtopicNote = {
  subtopicName: "Distance of a Point from a Plane",
  title: "Distance of a Point from a Plane",
  oneLineDefinition:
    "The perpendicular distance of a point from a plane, found from the normal form of the plane's equation, and its special case, the distance of a plane from the origin.",
  whyItMatters:
    "11 questions, three of them from board papers: the perpendicular distance of a plane from the origin (two MCQs in 2024) and the distance of a point from a plane given in vector form (2020). The textbook rows are Solved Example 15, Exercise 6.4 Questions 4 and 5, and four written questions and one MCQ of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-origin-distance",
      name: "Distance of a plane from the origin",
      intuition:
        "In normal form \\(\\bar{r} \\cdot \\hat{n} = p\\), the number p is the distance of the plane from the origin. For any other form, divide the constant by the length of the normal. The foot of the perpendicular from the origin is p steps along the unit normal.",
      definition:
        "- The distance of the origin from the plane \\(\\bar{r} \\cdot \\hat{n} = p\\) is \\(p\\).\n" +
        "- For \\(\\bar{r} \\cdot \\bar{n} = d\\), the distance is \\(\\dfrac{|d|}{|\\bar{n}|}\\).\n" +
        "- For \\(ax + by + cz + d = 0\\), the distance is \\(\\dfrac{|d|}{\\sqrt{a^2 + b^2 + c^2}}\\).\n" +
        "- The foot of the perpendicular from the origin is \\((lp, mp, np)\\), where \\(l, m, n\\) are the direction cosines of the normal in the normal form.",
      formula: {
        label: "Distance of a plane from the origin",
        latex: "p = \\frac{|d|}{|\\bar{n}|} = \\frac{|d|}{\\sqrt{a^2 + b^2 + c^2}}",
      },
      authoredExample: {
        prompt:
          "Find the perpendicular distance of the origin from the plane \\(2x - 3y + 6z + 14 = 0\\), and the foot of the perpendicular.",
        steps: [
          "\\(\\sqrt{a^2 + b^2 + c^2} = \\sqrt{4 + 9 + 36} = 7\\), so the distance is \\(\\dfrac{|14|}{7} = 2\\) units.",
          "Normal form: write the plane as \\(-2x + 3y - 6z = 14\\) (right side positive), then divide by 7: \\(-\\dfrac{2}{7}x + \\dfrac{3}{7}y - \\dfrac{6}{7}z = 2\\).",
          "So \\(l, m, n = -\\dfrac{2}{7}, \\dfrac{3}{7}, -\\dfrac{6}{7}\\) and \\(p = 2\\).",
          "Foot: \\((lp, mp, np) = \\left(-\\dfrac{4}{7}, \\dfrac{6}{7}, -\\dfrac{12}{7}\\right)\\). Check: \\(2\\left(-\\dfrac{4}{7}\\right) - 3\\left(\\dfrac{6}{7}\\right) + 6\\left(-\\dfrac{12}{7}\\right) + 14 = -\\dfrac{98}{7} + 14 = 0\\).",
        ],
        answer: "2 units; foot \\(\\left(-\\dfrac{4}{7}, \\dfrac{6}{7}, -\\dfrac{12}{7}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "The plane \\(2x + y + 2z = k\\), with \\(k > 0\\), is 5 units from the origin. Find \\(k\\).",
        steps: ["\\(\\dfrac{|k|}{\\sqrt{4 + 1 + 4}} = \\dfrac{k}{3} = 5\\)."],
        answer: "\\(k = 15\\)",
      },
      practiceSet: [
        { prompt: "How far is the plane \\(x + y + z = 0\\) from the origin?", answer: "0: it passes through the origin" },
        {
          prompt: "Find the foot of the perpendicular from the origin to the plane \\(x + 2y + 2z = 18\\).",
          answer: "\\((2, 4, 4)\\)",
          method: "\\(|\\bar{n}| = 3\\), so \\(p = 6\\) and \\(l, m, n = \\dfrac{1}{3}, \\dfrac{2}{3}, \\dfrac{2}{3}\\).",
        },
      ],
      pyqExampleId: "45a8de5e-93f7-41b9-888e-bf6f0bb0f9fb",
      traps: [
        {
          title: "Dividing by the sum of squares",
          body: "Divide by \\(\\sqrt{a^2 + b^2 + c^2}\\), the length of the normal, not by \\(a^2 + b^2 + c^2\\). The two agree only when the normal is already a unit vector.",
        },
        {
          title: "A negative distance",
          body: "Use \\(|d|\\). A plane such as \\(x + y + z + 6 = 0\\) is \\(\\dfrac{6}{\\sqrt{3}}\\) units from the origin, not \\(-\\dfrac{6}{\\sqrt{3}}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-point-distance",
      name: "Distance of a point from a plane",
      intuition:
        "Slide the plane, keeping it parallel, until it passes through the point A. Both planes now have the same unit normal, and their distances from the origin are p and \\(\\bar{a} \\cdot \\hat{n}\\). The distance of A from the given plane is the gap between those two numbers.",
      definition:
        "- The book's rule: to find the distance of a point from a plane, first write the plane in normal form \\(\\bar{r} \\cdot \\hat{n} = p\\).\n" +
        "- The plane through \\(A(\\bar{a})\\) parallel to it is \\(\\bar{r} \\cdot \\hat{n} = \\bar{a} \\cdot \\hat{n}\\).\n" +
        "- So the distance of \\(A(\\bar{a})\\) from \\(\\bar{r} \\cdot \\hat{n} = p\\) is \\(|p - \\bar{a} \\cdot \\hat{n}|\\).\n" +
        "- In Cartesian form this is \\(\\dfrac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}\\) for the point \\((x_1, y_1, z_1)\\) and the plane \\(ax + by + cz + d = 0\\).\n" +
        "- A distance of 0 means the point lies on the plane.",
      formula: {
        label: "Distance of a point from a plane",
        latex: "\\text{distance} = |p - \\bar{a} \\cdot \\hat{n}| = \\frac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}",
      },
      authoredExample: {
        prompt: "Find the distance of the point \\((2, 5, -3)\\) from the plane \\(\\bar{r} \\cdot (6\\hat{i} - 3\\hat{j} + 2\\hat{k}) = 4\\).",
        steps: [
          "Given: \\(\\bar{a} = 2\\hat{i} + 5\\hat{j} - 3\\hat{k}\\), \\(\\bar{n} = 6\\hat{i} - 3\\hat{j} + 2\\hat{k}\\), \\(|\\bar{n}| = \\sqrt{36 + 9 + 4} = 7\\).",
          "Normal form: \\(\\bar{r} \\cdot \\dfrac{6\\hat{i} - 3\\hat{j} + 2\\hat{k}}{7} = \\dfrac{4}{7}\\), so \\(p = \\dfrac{4}{7}\\).",
          "\\(\\bar{a} \\cdot \\hat{n} = \\dfrac{12 - 15 - 6}{7} = -\\dfrac{9}{7}\\).",
          "Distance \\(= \\left|\\dfrac{4}{7} - \\left(-\\dfrac{9}{7}\\right)\\right| = \\dfrac{13}{7}\\).",
        ],
        answer: "\\(\\dfrac{13}{7}\\) units",
      },
      selfCheckExample: {
        prompt: "Find the distance between the parallel planes \\(2x - y + 2z = 1\\) and \\(2x - y + 2z = 7\\).",
        steps: [
          "The point \\((0, -1, 0)\\) lies on the first plane.",
          "Its distance from \\(2x - y + 2z - 7 = 0\\) is \\(\\dfrac{|0 + 1 + 0 - 7|}{\\sqrt{4 + 1 + 4}} = \\dfrac{6}{3}\\).",
        ],
        answer: "2 units",
      },
      practiceSet: [
        {
          prompt: "Does the point \\((1, 2, 3)\\) lie on the plane \\(x + y + z = 6\\)? What is its distance from the plane?",
          answer: "Yes; the distance is 0",
        },
        {
          prompt: "Write the plane \\(2x + y = 5\\) in the form \\(ax + by + cz + d = 0\\) and name \\(d\\).",
          answer: "\\(2x + y + 0z - 5 = 0\\), so \\(d = -5\\)",
        },
      ],
      pyqExampleId: "40647475-1d8b-4141-9825-2e92b2b1983e",
      traps: [
        {
          title: "Using the formula before the normal form",
          body: "\\(|p - \\bar{a} \\cdot \\hat{n}|\\) needs the unit normal. With \\(\\bar{n}\\) not divided by \\(|\\bar{n}|\\), both \\(p\\) and \\(\\bar{a} \\cdot \\bar{n}\\) are too large by the same factor, and so is the answer.",
        },
        {
          title: "The wrong sign of the constant",
          body: "In the Cartesian formula the plane must read \\(ax + by + cz + d = 0\\). For \\(3x + 4y = 10\\), \\(d = -10\\), not \\(+10\\); move every term to one side before you substitute the point.",
        },
      ],
    },
  ],
};
