import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_TG_PLANE_NOTE: SubtopicNote = {
  subtopicName: "The Plane",
  title: "The Plane",
  oneLineDefinition:
    "A plane is fixed by a point on it and a normal direction perpendicular to it; this topic is not in the present NCERT book and was asked only in the 2022 board papers.",
  whyItMatters:
    "11 questions, all from the 2022 board papers. The present NCERT book does not teach the plane at all, and no paper from 2023 to 2026 has asked it, so give it the least of your time. The 2022 questions asked for the equation of a plane from the foot of a perpendicular or from three points, the distance of a point from a plane, the planes through the line where two planes meet, and the point where a line crosses a plane, with its distance from another point.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmtg-plane-forms",
      name: "Equation of a plane and the distance of a point from it",
      intuition:
        "Every line drawn in a plane is perpendicular to its normal. So a point \\((x, y, z)\\) lies on the plane through \\((x_1, y_1, z_1)\\) with normal direction ratios \\(a, b, c\\) exactly when the vector from \\((x_1, y_1, z_1)\\) to it has zero dot product with the normal. Distance from a point to the plane is measured along the normal.",
      definition:
        "- **Not in the present NCERT book.** Only the 2022 papers asked it.\n" +
        "- Through \\((x_1, y_1, z_1)\\) with normal \\(a, b, c\\): \\(a(x - x_1) + b(y - y_1) + c(z - z_1) = 0\\). In vector form \\(\\vec{r} \\cdot \\vec{n} = d\\).\n" +
        "- If \\(B\\) is the foot of the perpendicular from \\(A\\) to the plane, \\(AB\\) is a normal and \\(B\\) lies on the plane.\n" +
        "- Through three points \\(A\\), \\(B\\), \\(C\\): \\(\\overrightarrow{AB} \\times \\overrightarrow{AC}\\) is a normal; use it with \\(A\\).\n" +
        "- Intercepts \\(a\\), \\(b\\), \\(c\\) on the axes: \\(\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1\\).\n" +
        "- Distance of \\((x_1, y_1, z_1)\\) from \\(ax + by + cz + d = 0\\): \\(\\dfrac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}\\).",
      formula: {
        label: "Plane through a point with a given normal",
        latex: "a(x - x_1) + b(y - y_1) + c(z - z_1) = 0 \\qquad d = \\dfrac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}",
      },
      authoredExample: {
        prompt: "Find the equation of the plane through \\((2, -1, 3)\\) perpendicular to the line joining \\((1, 0, 2)\\) and \\((3, 2, 1)\\). Also find its distance from the origin.",
        steps: [
          "The normal has direction ratios \\(3 - 1, 2 - 0, 1 - 2\\), that is \\(2, 2, -1\\).",
          "Plane: \\(2(x - 2) + 2(y + 1) - (z - 3) = 0\\).",
          "\\(2x + 2y - z + 1 = 0\\).",
          "Distance from the origin: \\(\\dfrac{|0 + 0 - 0 + 1|}{\\sqrt{4 + 4 + 1}} = \\dfrac{1}{3}\\).",
        ],
        answer: "\\(2x + 2y - z + 1 = 0\\); distance \\(\\dfrac{1}{3}\\) unit",
      },
      selfCheckExample: {
        prompt: "Find the distance of the point \\((1, -2, 3)\\) from the plane \\(2x - y + 2z = 3\\).",
        steps: [
          "Write the plane as \\(2x - y + 2z - 3 = 0\\).",
          "\\(\\dfrac{|2(1) - (-2) + 2(3) - 3|}{\\sqrt{4 + 1 + 4}} = \\dfrac{7}{3}\\).",
        ],
        answer: "\\(\\dfrac{7}{3}\\) units",
      },
      practiceSet: [
        { prompt: "Find the equation of the plane that cuts intercepts 2, 3 and 6 on the x, y and z axes.", answer: "\\(3x + 2y + z = 6\\)" },
        { prompt: "Find \\(k\\) if the distance of \\((k, 0, 0)\\) from the plane \\(x + 2y - 2z = 1\\) is 2 units.", answer: "\\(k = 7\\) or \\(k = -5\\)", method: "\\(\\dfrac{|k - 1|}{3} = 2\\)" },
      ],
      pyqExampleId: "3aa7986e-f112-4034-80d3-3ff621264b7f",
      traps: [
        {
          title: "Distance without the constant moved across",
          body: "The distance formula uses the plane as \\(ax + by + cz + d = 0\\). Move the constant to the left first, and keep the modulus: a given distance then gives two values of an unknown.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-plane-family",
      name: "Planes through the line of intersection of two planes",
      intuition:
        "Any point on the line where two planes meet makes both equations zero, so it also makes their combination \\(P_1 + \\lambda P_2\\) zero. That combination is a plane for every \\(\\lambda\\), and each one contains the line. One more condition fixes \\(\\lambda\\).",
      definition:
        "- **Not in the present NCERT book.** Only the 2022 papers asked it.\n" +
        "- Write each plane with zero on the right: \\(P_1 = 0\\), \\(P_2 = 0\\).\n" +
        "- Every plane through their line of intersection is \\(P_1 + \\lambda P_2 = 0\\). In vector form: \\((\\vec{r} \\cdot \\vec{n_1} - d_1) + \\lambda(\\vec{r} \\cdot \\vec{n_2} - d_2) = 0\\).\n" +
        "- Fix \\(\\lambda\\) from the extra condition: a point on the plane, or a distance from the origin.",
      formula: {
        label: "Family of planes through a line of intersection",
        latex: "(a_1x + b_1y + c_1z + d_1) + \\lambda(a_2x + b_2y + c_2z + d_2) = 0",
      },
      authoredExample: {
        prompt: "Find the equation of the plane through the line of intersection of the planes \\(x + 2y - z = 3\\) and \\(2x - y + z = 1\\) that passes through the origin.",
        steps: [
          "Family: \\((x + 2y - z - 3) + \\lambda(2x - y + z - 1) = 0\\).",
          "The origin lies on it: \\(-3 + \\lambda(-1) = 0\\), so \\(\\lambda = -3\\).",
          "\\((x + 2y - z - 3) - 3(2x - y + z - 1) = 0\\).",
          "\\(-5x + 5y - 4z = 0\\), that is \\(5x - 5y + 4z = 0\\).",
        ],
        answer: "\\(5x - 5y + 4z = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the plane through the line of intersection of \\(x - y = 0\\) and \\(y - z = 2\\) that passes through \\((2, 1, 0)\\).",
        steps: [
          "Family: \\((x - y) + \\lambda(y - z - 2) = 0\\).",
          "At \\((2, 1, 0)\\): \\(1 + \\lambda(1 - 0 - 2) = 0\\), so \\(\\lambda = 1\\).",
          "\\(x - y + y - z - 2 = 0\\), that is \\(x - z = 2\\).",
        ],
        answer: "\\(x - z = 2\\)",
      },
      practiceSet: [
        { prompt: "Write the family of planes through the line of intersection of \\(\\vec{r} \\cdot (\\hat{i} + \\hat{j}) = 3\\) and \\(\\vec{r} \\cdot (\\hat{j} - \\hat{k}) = 1\\).", answer: "\\(\\vec{r} \\cdot [(\\hat{i} + \\hat{j}) + \\lambda(\\hat{j} - \\hat{k})] = 3 + \\lambda\\)" },
        { prompt: "Which plane through the line of intersection of \\(x + 2y = 4\\) and \\(z = 1\\) passes through the origin?", answer: "\\(x + 2y - 4z = 0\\)", method: "\\(-4 - \\lambda = 0\\), so \\(\\lambda = -4\\)." },
      ],
      pyqExampleId: "199bab8b-f4e7-4007-a1b8-078efc9772dd",
      traps: [
        {
          title: "Constants on the wrong side",
          body: "Bring each plane to the form (expression) \\(= 0\\) before adding \\(\\lambda\\) times the second. Adding the equations with constants on the right changes the sign of one constant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-plane-line",
      name: "Where a line meets a plane",
      intuition:
        "The general point of the line, written with \\(\\lambda\\), lies on the plane for exactly one value of \\(\\lambda\\) (unless the line is parallel to the plane). Substitute it into the plane's equation and solve.",
      definition:
        "- **Not in the present NCERT book.** Only the 2022 papers asked it.\n" +
        "- Write the general point of the line, substitute it into the plane, solve for \\(\\lambda\\), and put \\(\\lambda\\) back.\n" +
        "- The xy-plane is \\(z = 0\\), the yz-plane is \\(x = 0\\), the zx-plane is \\(y = 0\\).\n" +
        "- **Distance measured along a line:** draw the line through the given point parallel to the given line, find where it meets the plane, and measure from the point to that meeting point. It is not the perpendicular distance.",
      formula: {
        label: "General point substituted into the plane",
        latex: "a(x_1 + l\\lambda) + b(y_1 + m\\lambda) + c(z_1 + n\\lambda) + d = 0",
      },
      authoredExample: {
        prompt: "Find the point where the line \\(\\dfrac{x - 1}{2} = \\dfrac{y + 2}{3} = \\dfrac{z}{-1}\\) meets the plane \\(2x + y - z = 8\\).",
        steps: [
          "General point: \\((2\\lambda + 1,\\ 3\\lambda - 2,\\ -\\lambda)\\).",
          "Substitute: \\(2(2\\lambda + 1) + (3\\lambda - 2) - (-\\lambda) = 8\\).",
          "\\(8\\lambda = 8\\), so \\(\\lambda = 1\\).",
          "The point is \\((3, 1, -1)\\). Check: \\(6 + 1 + 1 = 8\\).",
        ],
        answer: "\\((3, 1, -1)\\)",
      },
      selfCheckExample: {
        prompt: "Find where the line through \\((0, 1, 2)\\) and \\((2, 3, 4)\\) meets the xy-plane.",
        steps: [
          "Direction ratios \\(2, 2, 2\\); general point \\((2\\lambda,\\ 2\\lambda + 1,\\ 2\\lambda + 2)\\).",
          "On the xy-plane \\(z = 0\\): \\(2\\lambda + 2 = 0\\), so \\(\\lambda = -1\\).",
          "The point is \\((-2, -1, 0)\\).",
        ],
        answer: "\\((-2, -1, 0)\\)",
      },
      practiceSet: [
        { prompt: "Find the point where the line \\(\\vec{r} = (\\hat{i} + \\hat{j}) + \\lambda(\\hat{i} - \\hat{j} + 2\\hat{k})\\) meets the plane \\(\\vec{r} \\cdot (\\hat{i} + \\hat{j} + \\hat{k}) = 4\\).", answer: "\\((2, 0, 2)\\)", method: "\\(2 + 2\\lambda = 4\\)" },
      ],
      pyqExampleId: "33f53c84-04cd-400f-ae4f-7aa776ede1aa",
      traps: [
        {
          title: "Along a line is not perpendicular",
          body: "\"Distance measured along a line\" is the length of a segment parallel to that line, from the point to the plane. The perpendicular-distance formula answers a different question.",
        },
      ],
    },
  ],
};
