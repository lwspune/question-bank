import type { SubtopicNote } from "@/app/notes/_types";

export const SECTION_FORMULA_AND_RECTANGLES_NOTE: SubtopicNote = {
  subtopicName: "Section Formula, Midpoints and Rectangles",
  title: "Section Formula, Midpoints and Rectangles",
  oneLineDefinition:
    "The point dividing AB in m : n is ((mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n)); the midpoint is the 1 : 1 case, and it is the centre of any rectangle's diagonal and the circumcentre of a right triangle.",
  whyItMatters:
    "6 PYQs, none HARD — the smallest page in the chapter and the cheapest. A ratio on a segment, the centre of a rectangle given by its side lines, the two missing vertices of a rectangle from one diagonal and the line they lie on (set in 2024 and 2025), a circumcentre, and the ratio in which the origin divides a segment between two parallel lines. " +
    "Each is one formula and one substitution.",
  concepts: [
    // 1 — section formula
    {
      kind: "formula" as const,
      slug: "cetsl-section-formula-internal-and-external",
      name: "Section Formula: Internal and External Division",
      intuition:
        "Dividing \\(AB\\) internally in \\(m : n\\) weights \\(B\\) by \\(m\\) and \\(A\\) by \\(n\\). External division flips one sign. When a line through the origin meets two PARALLEL lines, the origin divides the segment in the ratio of the perpendicular distances from the origin to the two lines.",
      definition:
        "- \\((1, 1)\\), \\((2, 4)\\) in \\(3 : 2\\): \\(\\left(\\dfrac{6 + 2}{5}, \\dfrac{12 + 2}{5}\\right) = \\left(\\dfrac85, \\dfrac{14}{5}\\right)\\). On \\(2x + y = k\\): \\(k = 6\\), so \\((k + 1) : (k - 1) = 7 : 5\\).\n" +
        "- \\(4x + 3y = 10\\) and \\(8x + 6y + 5 = 0\\) are parallel, at distances \\(2\\) and \\(\\tfrac12\\) from the origin, on opposite sides; a line through \\(O\\) meets them at \\(A\\), \\(B\\) with \\(AO : OB = 2 : \\tfrac12 = 4 : 1\\).\n" +
        "- External division in \\(m : n\\): \\(\\left(\\dfrac{mx_2 - nx_1}{m - n}, \\dfrac{my_2 - ny_1}{m - n}\\right)\\).\n" +
        "- \\(P\\) divides \\(A(a, 0)\\), \\(B(0, b)\\) in \\(1 : 2\\) at \\((-4, 1)\\): \\(\\dfrac{2a}{3} = -4\\), \\(\\dfrac{b}{3} = 1\\) — the intercepts follow.",
      formula: {
        label: "Section formula",
        latex:
          "P = \\left(\\frac{m x_2 + n x_1}{m + n}, \\frac{m y_2 + n y_1}{m + n}\\right) \\quad(\\text{internal});\\qquad \\frac{AO}{OB} = \\frac{d_1}{d_2} \\text{ between parallel lines}",
      },
      visualizationSlug: "section-formula",
      authoredExample: {
        prompt: "Find the point dividing \\((2, -1)\\) and \\((7, 9)\\) internally in \\(2 : 3\\).",
        steps: [
          "\\(\\left(\\dfrac{2 \\cdot 7 + 3 \\cdot 2}{5}, \\dfrac{2 \\cdot 9 + 3 \\cdot (-1)}{5}\\right) = \\left(\\dfrac{20}{5}, \\dfrac{15}{5}\\right)\\).",
        ],
        answer: "\\((4, 3)\\)",
      },
      selfCheckExample: {
        prompt: "A line through the origin meets \\(x + y = 6\\) at \\(A\\) and \\(x + y = -2\\) at \\(B\\). In what ratio does \\(O\\) divide \\(AB\\)?",
        steps: [
          "Distances from \\(O\\): \\(\\dfrac{6}{\\sqrt2}\\) and \\(\\dfrac{2}{\\sqrt2}\\), opposite sides.",
        ],
        answer: "\\(3 : 1\\)",
      },
      practiceSet: [
        {
          prompt: "Midpoint of \\((1, 1)\\) and \\((2, 4)\\)?",
          answer: "\\(\\left(\\dfrac32, \\dfrac52\\right)\\)",
        },
        {
          prompt: "\\((0, 0)\\) and \\((6, 3)\\) in \\(1 : 2\\)?",
          answer: "\\((2, 1)\\)",
        },
        {
          prompt: "\\((1, 2)\\), \\((3, 4)\\) externally in \\(2 : 1\\)?",
          answer: "\\((5, 6)\\)",
        },
        {
          prompt: "Distance of \\(8x + 6y + 5 = 0\\) from the origin?",
          answer: "\\(\\dfrac12\\)",
        },
      ],
      pyqExampleId: "12310333-65ff-47af-99d3-f1ff3532388a",
      traps: [
        {
          title: "Swapping the weights",
          body:
            "In \\(m : n\\) the weight \\(m\\) goes on the SECOND point. \\(\\left(\\dfrac{3 \\cdot 1 + 2 \\cdot 2}{5}, \\dots\\right)\\) gives \\(\\left(\\dfrac75, \\dfrac{11}{5}\\right)\\) and a different \\(k\\).",
        },
      ],
    },

    // 2 — midpoints, rectangles, circumcentre
    {
      kind: "formula" as const,
      slug: "cetsl-midpoints-rectangles-and-circumcentre",
      name: "Midpoints Everywhere: Rectangle Centres, Missing Vertices and the Circumcentre",
      intuition:
        "A rectangle's diagonals bisect each other, so the centre is the midpoint of either diagonal; a missing vertex lies on the given line AND makes a right angle with the known diagonal's ends. The circumcentre is equidistant from the vertices — solve two perpendicular-bisector equations.",
      definition:
        "- Sides \\(x = 8, x = 10, y = 11, y = 12\\): the diagonals meet at the centre \\(\\left(9, \\tfrac{23}{2}\\right)\\).\n" +
        "- Opposite vertices \\((1, 3)\\), \\((5, 1)\\), other two on \\(y = 2x + c\\): the centre \\((3, 2)\\) lies on that line, so \\(c = -4\\). A vertex \\((x, 2x - 4)\\) sees the diagonal at a right angle: slope to \\((1,3)\\) times slope to \\((5,1)\\) is \\(-1\\), giving \\(x^2 - 6x + 8 = 0\\), \\(x = 2, 4\\): \\((2, 0)\\) and \\((4, 4)\\).\n" +
        "- Circumcentre of \\((-2, 3)\\), \\((6, -1)\\), \\((4, 3)\\): equate distances, \\(2h - k = 3\\) and \\(h - 2k = -3\\), so \\((1, -1)\\). For a right triangle it is the midpoint of the hypotenuse.\n" +
        "- The centre trick — 'the other diagonal passes through the midpoint of the first' — is what fixes \\(c\\) without knowing either missing vertex.",
      formula: {
        label: "Rectangle centre",
        latex:
          "\\text{centre} = \\text{midpoint of a diagonal};\\qquad \\text{right angle at a vertex: } m_{VA}\\, m_{VC} = -1",
      },
      authoredExample: {
        prompt: "\\((0, 0)\\) and \\((6, 2)\\) are opposite vertices of a rectangle whose other vertices lie on \\(y = x + c\\). Find \\(c\\).",
        steps: [
          "Centre \\((3, 1)\\) lies on the line: \\(1 = 3 + c\\).",
        ],
        answer: "\\(c = -2\\)",
      },
      selfCheckExample: {
        prompt: "Find the circumcentre of the triangle with vertices \\((0, 0)\\), \\((6, 0)\\), \\((0, 8)\\).",
        steps: [
          "Right angle at the origin; circumcentre is the midpoint of the hypotenuse \\((6, 0)\\)–\\((0, 8)\\).",
        ],
        answer: "\\((3, 4)\\)",
      },
      practiceSet: [
        {
          prompt: "Centre of the rectangle \\(x = 8, x = 10, y = 11, y = 12\\)?",
          answer: "\\(\\left(9, \\dfrac{23}{2}\\right)\\)",
        },
        {
          prompt: "Midpoint of \\((1, 3)\\) and \\((5, 1)\\)?",
          answer: "\\((3, 2)\\)",
        },
        {
          prompt: "Is \\((2, 0)\\) on \\(y = 2x - 4\\)?",
          answer: "Yes.",
        },
        {
          prompt: "Circumcentre of a right triangle is at?",
          answer: "The midpoint of the hypotenuse.",
        },
      ],
      pyqExampleId: "30fae52f-f629-4210-a19a-a85ea9a618f4",
      traps: [
        {
          title: "Solving for the vertices without fixing c first",
          body:
            "The line \\(y = 2x + c\\) has an unknown; the midpoint of the known diagonal lies on it and gives \\(c = -4\\) in one line. Without that step the right-angle condition has two unknowns.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Distance and the Foot of the Perpendicular — the parallel-line distances behind the 4 : 1 ratio",
      href: "/notes/mht-cet-maths/straight-line/cetsl-distance-and-foot-of-perpendicular",
    },
  ],
};
