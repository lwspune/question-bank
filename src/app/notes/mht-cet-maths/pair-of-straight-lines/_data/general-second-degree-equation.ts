import type { SubtopicNote } from "@/app/notes/_types";

export const GENERAL_SECOND_DEGREE_EQUATION_NOTE: SubtopicNote = {
  subtopicName: "General Second-Degree Equation — Condition for a Pair, Parallel Lines and Distances",
  title: "General Second-Degree Equation — Condition for a Pair, Parallel Lines and Distances",
  oneLineDefinition:
    "ax² + 2hxy + by² + 2gx + 2fy + c = 0 is a pair of lines iff abc + 2fgh − af² − bg² − ch² = 0 (with h² ≥ ab); when h² = ab the pair is parallel and the gap is 2√((g² − ac)/(a(a + b))).",
  whyItMatters:
    "10 PYQs at 40% HARD. The determinant condition appears with a parameter to find (k in kxy + 10x + 8y + 16 = 0; the fg = ch identity; a count of integer p), and the parallel-lines case appears as a distance to compute or a p² + q² − pq to evaluate; two stems are the product of perpendicular distances from a point to a homogeneous pair. " +
    "Read 2g, 2f, 2h off the equation as HALVES — every wrong answer here is a factor of 2 in g, f or h.",
  concepts: [
    // 1 — condition for a pair
    {
      kind: "formula" as const,
      slug: "cetpsl-condition-for-a-pair",
      name: "Condition for a Pair: abc + 2fgh − af² − bg² − ch² = 0",
      intuition:
        "A second-degree equation factorises into two linear ones only when its \\(3 \\times 3\\) coefficient determinant vanishes. Identify \\(a, h, b, g, f, c\\) with the halves, substitute, and solve for the unknown.",
      definition:
        "- \\(kxy + 10x + 8y + 16 = 0\\): \\(a = b = 0\\), \\(h = \\tfrac{k}{2}\\), \\(g = 5\\), \\(f = 4\\), \\(c = 16\\): \\(2 \\cdot 4 \\cdot 5 \\cdot \\tfrac{k}{2} - 16 \\cdot \\tfrac{k^2}{4} = 20k - 4k^2 = 0 \\Rightarrow k = 0\\) or \\(5\\). \\(k = 0\\) leaves a single line, so \\(k = 5\\) only.\n" +
        "- \\(hxy + gx + fy + c = 0\\): the condition reduces to \\(\\dfrac{fgh}{4} - \\dfrac{ch^2}{4} = 0\\), i.e. \\(fg = ch\\).\n" +
        "- \\(2x^2 + 4xy - py^2 + 4x + qy + 1 = 0\\): the condition gives \\(p = \\dfrac{(q - 4)^2}{4} - 2 \\ge -2\\), every \\(p \\ge -2\\) attained; integers in \\([-5, 5]\\): \\(-2, \\dots, 5\\), eight.\n" +
        "- Also required: \\(h^2 \\ge ab\\) for the lines to be real. Check it when the answer is a count.",
      formula: {
        label: "Pair condition",
        latex:
          "\\Delta = \\begin{vmatrix} a & h & g \\\\ h & b & f \\\\ g & f & c \\end{vmatrix} = abc + 2fgh - af^2 - bg^2 - ch^2 = 0",
      },
      authoredExample: {
        prompt: "Find \\(\\lambda\\) if \\(x^2 + 3xy + 2y^2 + x + \\lambda y - 2 = 0\\) represents a pair of lines.",
        steps: [
          "\\(a = 1\\), \\(h = \\tfrac32\\), \\(b = 2\\), \\(g = \\tfrac12\\), \\(f = \\tfrac{\\lambda}{2}\\), \\(c = -2\\).",
          "\\(-4 + 2 \\cdot \\tfrac{\\lambda}{2} \\cdot \\tfrac12 \\cdot \\tfrac32 - \\tfrac{\\lambda^2}{4} - \\tfrac12 + \\tfrac92 = 0 \\Rightarrow -\\tfrac{\\lambda^2}{4} + \\tfrac{3\\lambda}{4} = 0 \\Rightarrow \\lambda = 0\\) or \\(3\\). Check \\(\\lambda = 3\\): \\((x + y - 1)(x + 2y + 2)\\) ✓; \\(\\lambda = 0\\): \\((x + 2y - 1)(x + y + 2)\\) ✓.",
        ],
        answer: "\\(\\lambda = 0\\) or \\(3\\)",
      },
      selfCheckExample: {
        prompt: "For what \\(k\\) does \\(xy + 3x + ky + 12 = 0\\) represent a pair of lines?",
        steps: [
          "For \\(hxy + gx + fy + c = 0\\) the condition is \\(fg = ch\\) with the coefficients as written: \\(h = 1\\), \\(g = 3\\), \\(f = k\\), \\(c = 12\\): \\(3k = 12\\).",
          "Check: \\((x + 4)(y + 3) = xy + 3x + 4y + 12\\).",
        ],
        answer: "\\(k = 4\\)",
      },
      practiceSet: [
        {
          prompt: "\\(h\\) in \\(kxy + 10x + 8y + 16 = 0\\)?",
          answer: "\\(\\dfrac{k}{2}\\)",
        },
        {
          prompt: "Is \\(k = 0\\) admissible for \\(kxy + 10x + 8y + 16 = 0\\) as a pair?",
          answer: "No — it becomes one line.",
        },
        {
          prompt: "\\(fg = ch\\) for \\(2xy + 4x + 3y + c = 0\\): \\(c = ?\\)",
          answer: "\\(6\\)",
        },
        {
          prompt: "Minimum \\(p\\) for \\(2x^2 + 4xy - py^2 + 4x + qy + 1 = 0\\) to be a pair?",
          answer: "\\(-2\\)",
        },
      ],
      pyqExampleId: "80c97fa3-5d61-4955-8e8f-35cda7209cbe",
      traps: [
        {
          title: "Counting k = 0 as a pair",
          body:
            "\\(k = 0\\) satisfies \\(\\Delta = 0\\) but reduces the equation to \\(10x + 8y + 16 = 0\\), a single line. 'k = 0 or 5' is option (C) and wrong.",
        },
      ],
    },

    // 2 — parallel lines and their distance
    {
      kind: "formula" as const,
      slug: "cetpsl-parallel-lines-and-their-distance",
      name: "Parallel Pair (h² = ab): Factor as a Perfect Square, or Use 2√((g² − ac)/(a(a + b)))",
      intuition:
        "When \\(h^2 = ab\\) the quadratic part is a perfect square \\((\\sqrt a x + \\sqrt b y)^2\\), and the whole equation is \\((\\sqrt a x + \\sqrt b y + \\alpha)(\\sqrt a x + \\sqrt b y + \\beta)\\): two parallel lines whose gap is the parallel-lines distance.",
      definition:
        "- \\(4x^2 + 4xy + y^2 - 6x - 3y - 4 = (2x + y)^2 - 3(2x + y) - 4 = (2x + y - 4)(2x + y + 1)\\): gap \\(\\dfrac{5}{\\sqrt5} = \\sqrt5\\).\n" +
        "- \\((x - 2y + 1)^2 + k(x - 2y + 1) = 0\\): lines \\(x - 2y + 1 = 0\\) and \\(x - 2y + 1 + k = 0\\), gap \\(\\dfrac{|k|}{\\sqrt5} = \\sqrt5 \\Rightarrow k = 5\\).\n" +
        "- \\(16x^2 - 24xy + 9y^2 + 48x - 36y + 35 = 0\\): \\(a = 16\\), \\(g = 24\\), \\(c = 35\\), \\(b = 9\\): \\(2\\sqrt{\\dfrac{576 - 560}{16 \\cdot 25}} = 2 \\cdot \\dfrac{4}{20} = \\dfrac25\\).\n" +
        "- \\(x^2 + 4xy + py^2 + 3x + qy - 4 = 0\\) parallel: \\(p = 4\\); \\((x + 2y)^2 + 3(x + 2y) - 4 = (x + 2y + 4)(x + 2y - 1)\\) needs \\(q = 6\\); gap \\(\\dfrac{5}{\\sqrt5} = \\sqrt5\\), \\(\\lambda^2 = 5\\).\n" +
        "- \\(7x^2 - 14xy + py^2 - 12x + qy - 4 = 0\\) parallel: \\(p = 7\\); \\(7(x - y)^2 - 12(x - y) - 4 = 0\\) forces the \\(y\\) coefficient \\(q = 12\\); \\(p^2 + q^2 - pq = 49 + 144 - 84 = 109\\).",
      formula: {
        label: "Parallel pair",
        latex:
          "h^2 = ab:\\quad d = 2\\sqrt{\\frac{g^2 - ac}{a(a + b)}} = 2\\sqrt{\\frac{f^2 - bc}{b(a + b)}}",
      },
      authoredExample: {
        prompt: "Find the distance between the lines \\(x^2 + 2xy + y^2 - 5x - 5y + 6 = 0\\).",
        steps: [
          "\\((x + y)^2 - 5(x + y) + 6 = (x + y - 2)(x + y - 3)\\).",
          "Gap \\(\\dfrac{|{-2} + 3|}{\\sqrt2} = \\dfrac{1}{\\sqrt2}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt2}\\)",
      },
      selfCheckExample: {
        prompt: "\\(9x^2 - 6xy + y^2 + 12x + ky + 3 = 0\\) represents two parallel lines. Find \\(k\\) and the distance between them.",
        steps: [
          "\\((3x - y)^2 + 4(3x - y) + 3\\) needs the \\(y\\) coefficient \\(-4\\): \\(k = -4\\). Factors \\((3x - y + 1)(3x - y + 3)\\).",
          "Gap \\(\\dfrac{2}{\\sqrt{10}}\\).",
        ],
        answer: "\\(k = -4\\); distance \\(\\dfrac{2}{\\sqrt{10}}\\)",
      },
      practiceSet: [
        {
          prompt: "Is \\(4x^2 + 4xy + y^2 = 0\\) a parallel pair?",
          answer: "Yes: \\(h^2 = 4 = ab\\).",
        },
        {
          prompt: "Lines of \\((2x + y)^2 - 3(2x + y) - 4 = 0\\)?",
          answer: "\\(2x + y = 4\\), \\(2x + y = -1\\)",
        },
        {
          prompt: "Gap between \\(2x + y = 4\\) and \\(2x + y = -1\\)?",
          answer: "\\(\\sqrt5\\)",
        },
        {
          prompt: "\\(p\\) for \\(7x^2 - 14xy + py^2 + \\dots\\) to be parallel?",
          answer: "\\(7\\)",
        },
      ],
      pyqExampleId: "84afd396-d34a-42b5-b3b5-8bc53dd937ac",
      traps: [
        {
          title: "Reporting the gap squared, or halving it",
          body:
            "The formula already carries the factor \\(2\\): \\(2\\sqrt{16/400} = \\dfrac25\\). \\(\\dfrac15\\) (no \\(2\\)) and \\(5\\) (squared reciprocal) are the neighbours on the list.",
        },
      ],
    },

    // 3 — product of distances from a point to a pair
    {
      kind: "formula" as const,
      slug: "cetpsl-product-of-distances-from-a-point",
      name: "Product of the Perpendicular Distances From a Point to the Two Lines",
      intuition:
        "Factorise the pair and multiply the two point-to-line distances; the \\(\\sqrt{\\cdot}\\) denominators often cancel. For a homogeneous pair there is a closed form: \\(\\dfrac{|ax_1^2 + 2hx_1y_1 + by_1^2|}{\\sqrt{(a - b)^2 + 4h^2}}\\).",
      definition:
        "- \\(2x^2 - 5xy + 2y^2 = (2x - y)(x - 2y)\\); from \\((2, -1)\\): \\(P_1 = \\dfrac{|4 + 1|}{\\sqrt5} = \\sqrt5\\), \\(P_2 = \\dfrac{|2 + 2|}{\\sqrt5} = \\dfrac{4}{\\sqrt5}\\); product \\(4\\).\n" +
        "- Closed form check: \\(\\dfrac{|8 + 10 + 2|}{\\sqrt{0 + 25}} = \\dfrac{20}{5} = 4\\).\n" +
        "- The closed form's denominator is \\(\\sqrt{(a - b)^2 + 4h^2}\\), the same square root that appears in the angle formula's numerator squared plus \\((a + b)^2\\).",
      formula: {
        label: "Product of distances",
        latex:
          "P_1 P_2 = \\frac{|ax_1^2 + 2hx_1y_1 + by_1^2|}{\\sqrt{(a - b)^2 + 4h^2}}",
      },
      authoredExample: {
        prompt: "Find the product of the perpendicular distances from \\((1, 2)\\) to the lines \\(x^2 - y^2 = 0\\).",
        steps: [
          "Lines \\(x - y = 0\\), \\(x + y = 0\\): \\(\\dfrac{1}{\\sqrt2} \\cdot \\dfrac{3}{\\sqrt2} = \\dfrac32\\). Closed form: \\(\\dfrac{|1 - 4|}{\\sqrt{4 + 0}} = \\dfrac32\\).",
        ],
        answer: "\\(\\dfrac32\\)",
      },
      selfCheckExample: {
        prompt: "Find the product of the distances from \\((3, 1)\\) to the lines \\(3x^2 - 8xy - 3y^2 = 0\\).",
        steps: [
          "\\(\\dfrac{|27 - 24 - 3|}{\\sqrt{36 + 64}} = 0\\): the point lies on one of the lines (\\(x - 3y = 0\\)).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        {
          prompt: "Lines of \\(2x^2 - 5xy + 2y^2 = 0\\)?",
          answer: "\\(2x - y = 0\\), \\(x - 2y = 0\\)",
        },
        {
          prompt: "Distance from \\((2, -1)\\) to \\(2x - y = 0\\)?",
          answer: "\\(\\sqrt5\\)",
        },
        {
          prompt: "Distance from \\((2, -1)\\) to \\(x - 2y = 0\\)?",
          answer: "\\(\\dfrac{4}{\\sqrt5}\\)",
        },
        {
          prompt: "\\(\\sqrt{(a - b)^2 + 4h^2}\\) for \\(2x^2 - 5xy + 2y^2\\)?",
          answer: "\\(5\\)",
        },
      ],
      pyqExampleId: "b04ed897-7aff-4e1c-9083-d4286850ebfd",
      traps: [
        {
          title: "Adding the distances",
          body:
            "The stem asks for the PRODUCT \\(P_1 P_2\\). The sum \\(\\sqrt5 + \\dfrac{4}{\\sqrt5} = \\dfrac{9}{\\sqrt5}\\) is not offered, but the squared product \\(16\\)-style and \\(5\\), \\(10\\) are.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Straight Line — distance between parallel lines and from a point",
      href: "/notes/mht-cet-maths/straight-line/cetsl-distance-and-foot-of-perpendicular",
    },
    {
      label: "Angle Between the Pair — h² = ab and a + b = 0 as the two extremes",
      href: "/notes/mht-cet-maths/pair-of-straight-lines/cetpsl-angle-between-the-pair",
    },
  ],
};
