import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_LP_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Equations of a Plane",
  title: "Equations of a Plane",
  oneLineDefinition:
    "A plane is fixed by a point and a normal, by a point and two directions in it, or by three points. It is written in vector, Cartesian, normal or parametric form.",
  whyItMatters:
    "54 questions, thirteen of them from board papers: a plane through a point perpendicular to a vector (2016, 2025) or with given direction ratios of its normal (2022, 2025), the vector form of a Cartesian plane (2019), a plane parallel to two vectors (2022, 2025) or given in parametric form (2026), a plane through three points (2017, 2025, 2026), a plane through the line of intersection of two planes and the origin (2024), and the planes parallel to a given plane at unit distance from a point (2015). The textbook rows are Exercise 6.3, Solved Examples 1 to 11, and thirteen written questions and six MCQs of Miscellaneous Exercise 6 B.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmlp-normal-plane",
      name: "Plane through a point, perpendicular to a vector",
      intuition:
        "A plane is fixed by one point A on it and a normal n, a vector perpendicular to the plane. For any point P of the plane, AP lies in the plane, so AP is perpendicular to n. That single dot product equal to zero is the equation of the plane.",
      definition:
        "- A line perpendicular to a plane is a **normal** to the plane. All normals of one plane have proportional direction ratios.\n" +
        "- **Theorem 6.8:** the plane through \\(A(\\bar{a})\\) perpendicular to \\(\\bar{n}\\) is \\(\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}\\).\n" +
        "- Proof outline: let \\(P(\\bar{r})\\) be any point on the plane. \\(\\overline{AP}\\) is perpendicular to \\(\\bar{n}\\), so \\(\\overline{AP} \\cdot \\bar{n} = 0\\).\n" +
        "- \\((\\bar{r} - \\bar{a}) \\cdot \\bar{n} = 0\\), so \\(\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}\\). This is the scalar product form.\n" +
        "- **Theorem 6.9 (Cartesian):** the plane through \\(A(x_1, y_1, z_1)\\) whose normal has direction ratios \\(a, b, c\\) is \\(a(x - x_1) + b(y - y_1) + c(z - z_1) = 0\\).\n" +
        "- \\(\\bar{r} \\cdot (a\\hat{i} + b\\hat{j} + c\\hat{k}) = d\\) and \\(ax + by + cz = d\\) are the same plane.\n" +
        "- Parallel planes have the same normal. The normal to the XY plane has direction ratios \\(0, 0, 1\\).",
      formula: {
        label: "Plane through a point with a given normal",
        latex: "\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}, \\qquad a(x - x_1) + b(y - y_1) + c(z - z_1) = 0",
        symbols: [
          { symbol: "\\(\\bar{n}\\)", meaning: "a normal to the plane, with direction ratios a, b, c" },
          { symbol: "\\(\\bar{a}\\)", meaning: "position vector of a known point A of the plane" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the vector and Cartesian equations of the plane through \\(A(2, -1, 4)\\) and parallel to the plane \\(3x + y - 2z = 7\\).",
        steps: [
          "A parallel plane has the same normal: \\(\\bar{n} = 3\\hat{i} + \\hat{j} - 2\\hat{k}\\).",
          "Formula: \\(\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}\\), with \\(\\bar{a} = 2\\hat{i} - \\hat{j} + 4\\hat{k}\\).",
          "\\(\\bar{a} \\cdot \\bar{n} = (2)(3) + (-1)(1) + (4)(-2) = 6 - 1 - 8 = -3\\).",
          "Vector equation: \\(\\bar{r} \\cdot (3\\hat{i} + \\hat{j} - 2\\hat{k}) = -3\\).",
          "Cartesian equation: \\(3x + y - 2z = -3\\). Check at \\(A\\): \\(6 - 1 - 8 = -3\\).",
        ],
        answer: "\\(\\bar{r} \\cdot (3\\hat{i} + \\hat{j} - 2\\hat{k}) = -3\\), that is \\(3x + y - 2z + 3 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Write the plane \\(2x - 5y + z = 4\\) in vector form.",
        steps: ["\\(\\bar{r} \\cdot (2\\hat{i} - 5\\hat{j} + \\hat{k}) = 2x - 5y + z\\)."],
        answer: "\\(\\bar{r} \\cdot (2\\hat{i} - 5\\hat{j} + \\hat{k}) = 4\\)",
      },
      practiceSet: [
        {
          prompt: "Write the Cartesian equation of the plane \\(\\bar{r} \\cdot (\\hat{i} - 4\\hat{k}) = 7\\).",
          answer: "\\(x - 4z = 7\\)",
        },
        {
          prompt: "Write the equation of the plane through \\((5, -2, 3)\\) parallel to the XZ plane.",
          answer: "\\(y = -2\\)",
          method: "The normal is along the Y-axis, direction ratios \\(0, 1, 0\\).",
        },
        {
          prompt:
            "The foot of the perpendicular from the origin to a plane is \\(M(2, -1, 2)\\). Write the vector equation of the plane.",
          answer: "\\(\\bar{r} \\cdot (2\\hat{i} - \\hat{j} + 2\\hat{k}) = 9\\)",
          method: "\\(\\overline{OM}\\) is a normal and \\(M\\) is on the plane: \\(\\overline{OM} \\cdot \\overline{OM} = 4 + 1 + 4\\).",
        },
      ],
      pyqExampleId: "4c3f4a6e-3873-4d32-86fc-2f4f6ea1936c",
      traps: [
        {
          title: "A vector on the right side",
          body: "In \\(\\bar{r} \\cdot \\bar{n} = \\bar{a} \\cdot \\bar{n}\\) the right side is a number. Work out \\(\\bar{a} \\cdot \\bar{n}\\) fully; writing \\(\\bar{r} \\cdot \\bar{n} = \\bar{a}\\) is not an equation of a plane.",
        },
        {
          title: "The wrong constant for a coordinate plane",
          body: "A plane parallel to the XY plane has normal \\(\\hat{k}\\), so it is \\(z = \\text{constant}\\), not \\(x = \\text{constant}\\). Match the missing letter of the plane's name to the variable that stays fixed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-two-vectors",
      name: "Plane parallel to two vectors, or through three points",
      intuition:
        "If a plane contains two directions b and c that are not parallel, its normal is b × c. Three points give two such directions, AB and AC. So both cases come back to a point and a normal, and the last step is the same as on the card above.",
      definition:
        "- **Theorem 6.10:** the plane through \\(A(\\bar{a})\\) parallel to \\(\\bar{b}\\) and \\(\\bar{c}\\) has normal \\(\\bar{b} \\times \\bar{c}\\), so its equation is \\(\\bar{r} \\cdot (\\bar{b} \\times \\bar{c}) = \\bar{a} \\cdot (\\bar{b} \\times \\bar{c})\\).\n" +
        "- The same plane in parametric form is \\(\\bar{r} = \\bar{a} + \\lambda\\bar{b} + \\mu\\bar{c}\\).\n" +
        "- **Theorem 6.11:** the plane through non-collinear points \\(A(\\bar{a})\\), \\(B(\\bar{b})\\), \\(C(\\bar{c})\\) is \\((\\bar{r} - \\bar{a}) \\cdot [(\\bar{b} - \\bar{a}) \\times (\\bar{c} - \\bar{a})] = 0\\).\n" +
        "- Its Cartesian form is \\(\\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \\end{vmatrix} = 0\\).\n" +
        "- Finish with a check: the other given points satisfy the equation, and the normal dots to 0 with each given direction.",
      formula: {
        label: "Plane parallel to two vectors",
        latex: "\\bar{r} \\cdot (\\bar{b} \\times \\bar{c}) = \\bar{a} \\cdot (\\bar{b} \\times \\bar{c}), \\qquad \\bar{r} = \\bar{a} + \\lambda\\bar{b} + \\mu\\bar{c}",
      },
      authoredExample: {
        prompt:
          "Find the vector equation of the plane through \\(A(1, 0, 2)\\) and parallel to the vectors \\(\\hat{i} + 2\\hat{j} - \\hat{k}\\) and \\(2\\hat{i} - \\hat{j} + 3\\hat{k}\\). Write its Cartesian equation.",
        steps: [
          "Normal: \\(\\bar{b} \\times \\bar{c} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & -1 \\\\ 2 & -1 & 3 \\end{vmatrix} = \\hat{i}(6 - 1) - \\hat{j}(3 + 2) + \\hat{k}(-1 - 4) = 5\\hat{i} - 5\\hat{j} - 5\\hat{k}\\).",
          "Take \\(\\bar{n} = \\hat{i} - \\hat{j} - \\hat{k}\\) (dividing by 5). Check: \\(1 - 2 + 1 = 0\\) and \\(2 + 1 - 3 = 0\\).",
          "\\(\\bar{a} \\cdot \\bar{n} = (1)(1) + (0)(-1) + (2)(-1) = -1\\).",
          "Vector equation: \\(\\bar{r} \\cdot (\\hat{i} - \\hat{j} - \\hat{k}) = -1\\).",
          "Cartesian equation: \\(x - y - z = -1\\).",
        ],
        answer: "\\(\\bar{r} \\cdot (\\hat{i} - \\hat{j} - \\hat{k}) = -1\\), that is \\(x - y - z + 1 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Find the Cartesian equation of the plane \\(\\bar{r} = (\\hat{i} + \\hat{k}) + \\lambda\\hat{i} + \\mu\\hat{j}\\).",
        steps: [
          "Normal \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), and \\((\\hat{i} + \\hat{k}) \\cdot \\hat{k} = 1\\).",
          "So \\(\\bar{r} \\cdot \\hat{k} = 1\\).",
        ],
        answer: "\\(z = 1\\)",
      },
      practiceSet: [
        {
          prompt: "Find a normal to a plane that contains the directions \\(\\hat{i} + \\hat{j}\\) and \\(\\hat{j} + \\hat{k}\\).",
          answer: "\\(\\hat{i} - \\hat{j} + \\hat{k}\\)",
        },
        {
          prompt: "Do the points \\(A(1, 2, 3)\\), \\(B(2, 4, 6)\\) and \\(C(3, 6, 9)\\) fix a single plane?",
          answer: "No: \\(\\overline{AC} = 2\\overline{AB}\\), so the points are collinear",
        },
        {
          prompt:
            "Find the vector equation of the plane through the origin that contains the line \\(\\bar{r} = (\\hat{i} + \\hat{j}) + \\lambda\\hat{k}\\).",
          answer: "\\(\\bar{r} \\cdot (\\hat{i} - \\hat{j}) = 0\\)",
          method: "The plane contains \\(\\hat{i} + \\hat{j}\\) (origin to a point of the line) and \\(\\hat{k}\\); their cross product is \\(\\hat{i} - \\hat{j}\\).",
        },
      ],
      pyqExampleId: "e75111f0-1e90-4cdd-a757-3bda9dcda2a0",
      traps: [
        {
          title: "Crossing the position vectors",
          body: "For three points, cross \\(\\overline{AB} = \\bar{b} - \\bar{a}\\) with \\(\\overline{AC} = \\bar{c} - \\bar{a}\\). Crossing \\(\\bar{b}\\) with \\(\\bar{c}\\) themselves gives a vector that is not normal to the plane.",
        },
        {
          title: "Leaving λ and μ in a Cartesian answer",
          body: "The parametric form still carries \\(\\lambda\\) and \\(\\mu\\). For the Cartesian equation, find the normal \\(\\bar{b} \\times \\bar{c}\\) and the constant \\(\\bar{a} \\cdot \\bar{n}\\); the answer has only \\(x, y, z\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-normal-form",
      name: "Normal form, distance from the origin and intercepts",
      intuition:
        "Divide r · n = d by the length of n. The normal becomes a unit vector, and the number on the right becomes the distance of the plane from the origin. The foot of the perpendicular from the origin sits that far along the unit normal.",
      definition:
        "- **Theorem 6.12:** the plane at distance \\(p\\) from the origin, with unit normal \\(\\hat{n}\\), is \\(\\bar{r} \\cdot \\hat{n} = p\\). This is the normal form.\n" +
        "- To reduce \\(\\bar{r} \\cdot \\bar{n} = d\\) with \\(d > 0\\), divide both sides by \\(|\\bar{n}|\\): \\(\\bar{r} \\cdot \\dfrac{\\bar{n}}{|\\bar{n}|} = \\dfrac{d}{|\\bar{n}|}\\). If \\(d < 0\\), multiply the equation by \\(-1\\) first.\n" +
        "- Cartesian normal form: \\(lx + my + nz = p\\), where \\(l, m, n\\) are the direction cosines of the normal.\n" +
        "- The foot of the perpendicular from the origin is \\(N(lp, mp, np)\\).\n" +
        "- There are two planes at distance \\(p\\) from the origin with normal along \\(\\hat{n}\\): \\(\\bar{r} \\cdot \\hat{n} = \\pm p\\).\n" +
        "- A plane parallel to \\(ax + by + cz + d = 0\\) is \\(ax + by + cz + k = 0\\); a distance condition then gives the value of \\(k\\), usually two values.\n" +
        "- A plane with intercepts \\(a, b, c\\) on the axes is \\(\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1\\). Equal intercepts give \\(x + y + z = a\\).",
      formula: {
        label: "Normal form of a plane",
        latex: "\\bar{r} \\cdot \\hat{n} = p, \\qquad lx + my + nz = p, \\qquad N(lp,\\ mp,\\ np)",
        symbols: [
          { symbol: "\\(\\hat{n}\\)", meaning: "unit vector normal to the plane" },
          { symbol: "\\(p\\)", meaning: "distance of the plane from the origin" },
          { symbol: "\\(l, m, n\\)", meaning: "direction cosines of the normal" },
        ],
      },
      authoredExample: {
        prompt:
          "Reduce \\(\\bar{r} \\cdot (2\\hat{i} - 6\\hat{j} + 3\\hat{k}) = 14\\) to normal form. Hence find the distance of the plane from the origin, the direction cosines of the normal and the foot of the perpendicular from the origin.",
        steps: [
          "\\(|\\bar{n}| = \\sqrt{4 + 36 + 9} = 7\\).",
          "Divide by 7: \\(\\bar{r} \\cdot \\left(\\dfrac{2}{7}\\hat{i} - \\dfrac{6}{7}\\hat{j} + \\dfrac{3}{7}\\hat{k}\\right) = 2\\). This is the normal form.",
          "Distance from the origin: \\(p = 2\\) units.",
          "Direction cosines of the normal: \\(\\dfrac{2}{7}, -\\dfrac{6}{7}, \\dfrac{3}{7}\\).",
          "Foot: \\((lp, mp, np) = \\left(\\dfrac{4}{7}, -\\dfrac{12}{7}, \\dfrac{6}{7}\\right)\\). Check: \\(2\\left(\\dfrac{4}{7}\\right) - 6\\left(-\\dfrac{12}{7}\\right) + 3\\left(\\dfrac{6}{7}\\right) = \\dfrac{98}{7} = 14\\).",
        ],
        answer: "\\(p = 2\\) units; direction cosines \\(\\dfrac{2}{7}, -\\dfrac{6}{7}, \\dfrac{3}{7}\\); foot \\(\\left(\\dfrac{4}{7}, -\\dfrac{12}{7}, \\dfrac{6}{7}\\right)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the vector equation of the plane at a distance of 4 units from the origin whose normal is along \\(\\hat{i} - 2\\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(\\hat{n} = \\dfrac{1}{3}(\\hat{i} - 2\\hat{j} + 2\\hat{k})\\), so \\(\\bar{r} \\cdot \\dfrac{1}{3}(\\hat{i} - 2\\hat{j} + 2\\hat{k}) = 4\\).",
          "Multiply by 3.",
        ],
        answer: "\\(\\bar{r} \\cdot (\\hat{i} - 2\\hat{j} + 2\\hat{k}) = 12\\)",
      },
      practiceSet: [
        { prompt: "Find the distance of the plane \\(2x + y - 2z = 9\\) from the origin.", answer: "3 units", method: "\\(\\dfrac{9}{\\sqrt{4 + 1 + 4}}\\)" },
        {
          prompt: "Find the plane that makes equal intercepts on the axes and passes through \\((1, 2, -1)\\).",
          answer: "\\(x + y + z = 2\\)",
        },
        {
          prompt: "Write the direction cosines of the normal to the plane \\(4x - 4y + 2z = 5\\), taken from its normal form.",
          answer: "\\(\\dfrac{2}{3}, -\\dfrac{2}{3}, \\dfrac{1}{3}\\)",
          method: "\\(\\sqrt{16 + 16 + 4} = 6\\); divide each coefficient by 6.",
        },
      ],
      pyqExampleId: "7d7ef37f-acb3-4f5c-9627-b87376a5d88a",
      traps: [
        {
          title: "Dividing one side only",
          body: "To reach normal form divide the whole equation by \\(|\\bar{n}|\\): the normal vector and the number on the right. Dividing only the right side gives a wrong distance.",
        },
        {
          title: "A negative right side in normal form",
          body: "In normal form \\(p\\) is a distance, so it is not negative. If the constant is negative, multiply the equation by \\(-1\\) before dividing; otherwise the direction cosines and the foot come out with the wrong signs.",
        },
        {
          title: "Keeping one plane when there are two",
          body: "A distance condition gives a modulus equation, which has two solutions. That means two parallel planes, one on each side; give both unless the question rules one out.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmlp-intersection-plane",
      name: "Plane through the line of intersection of two planes",
      intuition:
        "Any plane through the line where two planes meet can be written as the first plane plus λ times the second, because every point of that line makes both brackets zero. One more condition, such as a point the plane must pass through, fixes λ.",
      definition:
        "- If the planes \\(\\bar{r} \\cdot \\bar{n_1} = d_1\\) and \\(\\bar{r} \\cdot \\bar{n_2} = d_2\\) intersect, then for every real \\(\\lambda\\), \\(\\bar{r} \\cdot (\\bar{n_1} + \\lambda\\bar{n_2}) = d_1 + \\lambda d_2\\) is a plane through their line of intersection.\n" +
        "- Cartesian form: \\((a_1x + b_1y + c_1z + d_1) + \\lambda(a_2x + b_2y + c_2z + d_2) = 0\\).\n" +
        "- Steps: write this family of planes; put in the given condition (for a point, substitute its coordinates) to find \\(\\lambda\\); substitute \\(\\lambda\\) back and simplify.",
      formula: {
        label: "Plane through the line of intersection",
        latex: "(a_1x + b_1y + c_1z + d_1) + \\lambda(a_2x + b_2y + c_2z + d_2) = 0",
      },
      authoredExample: {
        prompt:
          "Find the equation of the plane through the line of intersection of the planes \\(x + y + z = 1\\) and \\(2x + 3y + 4z = 5\\), which passes through \\((1, 1, 1)\\).",
        steps: [
          "The required plane is \\((x + y + z - 1) + \\lambda(2x + 3y + 4z - 5) = 0\\).",
          "It passes through \\((1, 1, 1)\\): \\((3 - 1) + \\lambda(9 - 5) = 0\\), so \\(2 + 4\\lambda = 0\\) and \\(\\lambda = -\\dfrac{1}{2}\\).",
          "Substitute and multiply by 2: \\(2(x + y + z - 1) - (2x + 3y + 4z - 5) = 0\\).",
          "\\(\\therefore -y - 2z + 3 = 0\\), that is \\(y + 2z = 3\\).",
          "Check: \\((1, 1, 1)\\) gives \\(1 + 2 = 3\\); and \\((-2, 3, 0)\\), which lies on both given planes, gives \\(3 + 0 = 3\\).",
        ],
        answer: "\\(y + 2z = 3\\)",
      },
      selfCheckExample: {
        prompt:
          "Write the family of planes through the line of intersection of \\(\\bar{r} \\cdot (\\hat{i} + \\hat{j}) = 2\\) and \\(\\bar{r} \\cdot (\\hat{j} - \\hat{k}) = 1\\).",
        steps: ["Use \\(\\bar{r} \\cdot (\\bar{n_1} + \\lambda\\bar{n_2}) = d_1 + \\lambda d_2\\)."],
        answer: "\\(\\bar{r} \\cdot [(\\hat{i} + \\hat{j}) + \\lambda(\\hat{j} - \\hat{k})] = 2 + \\lambda\\)",
      },
      practiceSet: [
        {
          prompt: "Which member of the family \\((x + y - 2) + \\lambda(x - y) = 0\\) is parallel to the Y-axis?",
          answer: "\\(\\lambda = 1\\), giving \\(x = 1\\)",
          method: "The coefficient of \\(y\\), \\(1 - \\lambda\\), must be 0.",
        },
        {
          prompt:
            "Show that the plane \\(2x + 3y + 4z = 4\\) contains the line of intersection of the planes \\(x + y + z = 2\\) and \\(x + 2y + 3z = 2\\).",
          answer: "It is the member \\((x + y + z - 2) + 1(x + 2y + 3z - 2) = 0\\), with \\(\\lambda = 1\\)",
        },
      ],
      pyqExampleId: "99caf9ca-f3dc-43e7-8859-79e2fc90cff6",
      traps: [
        {
          title: "Combining planes written in different forms",
          body: "Bring both planes to the same form, both as '… = 0' or both as \\(\\bar{r} \\cdot \\bar{n} = d\\), before adding \\(\\lambda\\) times the second. Otherwise the constant of one plane enters with the wrong sign.",
        },
        {
          title: "Leaving λ in the answer",
          body: "The family with \\(\\lambda\\) is not yet the answer. Find \\(\\lambda\\) from the condition, substitute it, and simplify to one plane with whole-number coefficients.",
        },
      ],
    },
  ],
};
