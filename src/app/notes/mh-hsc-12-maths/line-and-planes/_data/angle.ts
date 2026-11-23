import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Angle Between Planes and Line-Plane Angle",
  title: "Angle Between Two Planes, and Between a Line and a Plane",
  oneLineDefinition:
    "The angle between two planes is the acute angle between their normals. The angle between a line and a plane is the complement of the acute angle between the line and the normal to the plane.",
  whyItMatters:
    "13 questions, four of them from board papers: the acute angle between two planes (an MCQ in 2019), the value of m that makes a line parallel to a plane (an MCQ in 2020), and the angle between a line and a plane (2024, and an MCQ in 2026). The textbook rows are Solved Examples 12 and 13, Exercise 6.4 Questions 1 and 2, and two written questions and three MCQs of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-plane-angle",
      name: "Angle between two planes",
      intuition:
        "A plane tilts the way its normal points, so the angle between two planes is the angle between their normals. The book defines it as the acute angle, so take the modulus of the dot product. The same dot-product rule, used on direction vectors, gives the angle between two lines.",
      definition:
        "- Planes \\(\\bar{r} \\cdot \\bar{n_1} = d_1\\) and \\(\\bar{r} \\cdot \\bar{n_2} = d_2\\) are perpendicular if and only if \\(\\bar{n_1} \\cdot \\bar{n_2} = 0\\), that is \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\).\n" +
        "- If the planes are not perpendicular, the angle between them is the acute angle between their normals: \\(\\cos\\theta = \\dfrac{|\\bar{n_1} \\cdot \\bar{n_2}|}{|\\bar{n_1}|\\,|\\bar{n_2}|}\\).\n" +
        "- Parallel planes have proportional normals, \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\), and the angle between them is \\(0^{\\circ}\\).\n" +
        "- The constants \\(d_1\\) and \\(d_2\\) fix where the planes are, not how they tilt, so they never enter the angle.",
      formula: {
        label: "Angle between two planes",
        latex: "\\cos\\theta = \\frac{|\\bar{n_1} \\cdot \\bar{n_2}|}{|\\bar{n_1}|\\,|\\bar{n_2}|}",
      },
      authoredExample: {
        prompt: "Find the angle between the planes \\(6x - 7y + 6z = 5\\) and \\(8x + 4y + z = 9\\).",
        steps: [
          "Normals: \\(\\bar{n_1} = 6\\hat{i} - 7\\hat{j} + 6\\hat{k}\\) and \\(\\bar{n_2} = 8\\hat{i} + 4\\hat{j} + \\hat{k}\\).",
          "\\(\\bar{n_1} \\cdot \\bar{n_2} = 48 - 28 + 6 = 26\\).",
          "\\(|\\bar{n_1}| = \\sqrt{36 + 49 + 36} = 11\\) and \\(|\\bar{n_2}| = \\sqrt{64 + 16 + 1} = 9\\).",
          "\\(\\cos\\theta = \\dfrac{26}{11 \\times 9} = \\dfrac{26}{99}\\).",
        ],
        answer: "\\(\\theta = \\cos^{-1}\\left(\\dfrac{26}{99}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(k\\) if the planes \\(3x - y + kz = 3\\) and \\(x + 2y + 2z = 1\\) are perpendicular.",
        steps: ["\\(3(1) + (-1)(2) + k(2) = 0\\), so \\(1 + 2k = 0\\)."],
        answer: "\\(k = -\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "Are the planes \\(x - 2y + 3z = 1\\) and \\(-2x + 4y - 6z = 5\\) parallel?",
          answer: "Yes: the second normal is \\(-2\\) times the first, so the angle is \\(0^{\\circ}\\)",
        },
        {
          prompt: "Is the plane \\(\\bar{r} \\cdot (\\hat{i} + \\hat{j}) = 3\\) perpendicular to the plane \\(\\bar{r} \\cdot (\\hat{i} - \\hat{j} + 4\\hat{k}) = 1\\)?",
          answer: "Yes: \\(1 - 1 + 0 = 0\\)",
        },
      ],
      pyqExampleId: "39b905d6-05bf-434a-a927-27fe6ce8039a",
      traps: [
        {
          title: "Using sine for two planes",
          body: "Two normals give the cosine of the angle between two planes. The sine appears only for a line and a plane, where the line is compared with the normal.",
        },
        {
          title: "An obtuse answer",
          body: "If \\(\\bar{n_1} \\cdot \\bar{n_2}\\) is negative, the formula without the modulus gives the obtuse angle. The angle between planes is the acute one, so take the modulus.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-line-plane",
      name: "Angle between a line and a plane",
      intuition:
        "The normal stands at right angles to the plane. If a line makes an angle θ with the plane, it makes 90° − θ with the normal, and cos(90° − θ) = sin θ. So the same dot product, of the line's direction with the normal, now gives the sine.",
      definition:
        "- The angle between a line and a plane is the complement of the acute angle between the line and the normal to the plane, so it is never obtuse.\n" +
        "- For \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b}\\) and \\(\\bar{r} \\cdot \\bar{n} = d\\): \\(\\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right) = \\dfrac{|\\bar{b} \\cdot \\bar{n}|}{|\\bar{b}|\\,|\\bar{n}|}\\), so \\(\\sin\\theta = \\dfrac{|\\bar{b} \\cdot \\bar{n}|}{|\\bar{b}|\\,|\\bar{n}|}\\).\n" +
        "- The line is perpendicular to the plane if and only if \\(\\bar{b}\\) and \\(\\bar{n}\\) are collinear, \\(\\bar{b} = t\\bar{n}\\).\n" +
        "- The line is parallel to the plane if and only if \\(\\bar{b} \\cdot \\bar{n} = 0\\).\n" +
        "- If also a point of the line satisfies the plane's equation, the line lies in the plane.",
      formula: {
        label: "Angle between a line and a plane",
        latex: "\\sin\\theta = \\frac{|\\bar{b} \\cdot \\bar{n}|}{|\\bar{b}|\\,|\\bar{n}|}",
      },
      authoredExample: {
        prompt:
          "Find the angle between the line \\(\\dfrac{x - 1}{2} = \\dfrac{y}{3} = \\dfrac{z + 1}{6}\\) and the plane \\(10x + 2y - 11z = 3\\).",
        steps: [
          "Direction of the line \\(\\bar{b} = 2\\hat{i} + 3\\hat{j} + 6\\hat{k}\\); normal \\(\\bar{n} = 10\\hat{i} + 2\\hat{j} - 11\\hat{k}\\).",
          "\\(\\bar{b} \\cdot \\bar{n} = 20 + 6 - 66 = -40\\).",
          "\\(|\\bar{b}| = \\sqrt{4 + 9 + 36} = 7\\) and \\(|\\bar{n}| = \\sqrt{100 + 4 + 121} = 15\\).",
          "\\(\\sin\\theta = \\dfrac{|-40|}{7 \\times 15} = \\dfrac{40}{105} = \\dfrac{8}{21}\\).",
        ],
        answer: "\\(\\theta = \\sin^{-1}\\left(\\dfrac{8}{21}\\right)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\(m\\) if the line \\(\\bar{r} = \\hat{i} + \\lambda(2\\hat{i} + m\\hat{j} - \\hat{k})\\) is parallel to the plane \\(\\bar{r} \\cdot (\\hat{i} + \\hat{j} + 3\\hat{k}) = 4\\).",
        steps: ["\\(\\bar{b} \\cdot \\bar{n} = 2 + m - 3 = 0\\)."],
        answer: "\\(m = 1\\)",
      },
      practiceSet: [
        {
          prompt: "Is a line with direction ratios \\(2, -4, 6\\) perpendicular to the plane \\(x - 2y + 3z = 7\\)?",
          answer: "Yes: \\(2, -4, 6\\) is 2 times the normal \\(1, -2, 3\\)",
        },
        {
          prompt: "Does the line \\(\\dfrac{x - 1}{1} = \\dfrac{y - 1}{1} = \\dfrac{z - 1}{-2}\\) lie in the plane \\(x + y + z = 3\\)?",
          answer: "Yes: \\(1 + 1 - 2 = 0\\), and its point \\((1, 1, 1)\\) gives \\(1 + 1 + 1 = 3\\)",
        },
      ],
      pyqExampleId: "a2fcc9cd-fc00-4ca3-aea3-91f8ec828d84",
      traps: [
        {
          title: "Writing cos where sin belongs",
          body: "With a line and a normal, the dot product gives \\(\\sin\\theta\\) for the angle with the plane. Writing \\(\\theta = \\cos^{-1}\\) of that value gives the angle with the normal, which is the complement of the answer.",
        },
        {
          title: "Calling a line parallel when it lies in the plane",
          body: "\\(\\bar{b} \\cdot \\bar{n} = 0\\) holds both for a line parallel to the plane and for a line in it. Test a point of the line in the plane's equation to tell them apart.",
        },
      ],
    },
  ],
};
