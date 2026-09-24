import type { SubtopicNote } from "@/app/notes/_types";

export const FORMS_INTERSECTIONS_AND_CONCURRENCY_NOTE: SubtopicNote = {
  subtopicName: "Forms of a Line, Intersections and Concurrency",
  title: "Forms of a Line, Intersections and Concurrency",
  oneLineDefinition:
    "Five ways to write a line — point-slope, two-point, intercept x/a + y/b = 1, normal x cos α + y sin α = p, general — plus the point where two lines meet and the determinant test for three lines through one point.",
  whyItMatters:
    "14 PYQs at 21% HARD. The intercept form carries the most stems (a line through a point with intercepts in a ratio, a triangle of given area with the axes, 1/a² + 1/b² = 1/p²); the normal form appears with the angle of the perpendicular given; medians and parallels test point-slope; and the concurrency determinant was set as a cubic in k in two 2024 shifts. " +
    "The three HARD questions are the area-with-axes count and the concurrency cubic, both of which are careful casework, not new ideas.",
  concepts: [
    // 1 — intercept form
    {
      kind: "formula" as const,
      slug: "cetsl-intercept-form-and-area-with-axes",
      name: "Intercept Form x/a + y/b = 1: Ratios of Intercepts, Triangle Area and 1/a² + 1/b² = 1/p²",
      intuition:
        "A line meeting the axes at \\((a, 0)\\) and \\((0, b)\\) is \\(\\dfrac{x}{a} + \\dfrac{y}{b} = 1\\). It makes a right triangle of area \\(\\dfrac{|ab|}{2}\\) with the axes, and its distance from the origin \\(p\\) satisfies \\(\\dfrac{1}{p^2} = \\dfrac{1}{a^2} + \\dfrac{1}{b^2}\\).",
      definition:
        "- \\(b = 3a\\), through \\((1, 3)\\): \\(\\dfrac{1}{a} + \\dfrac{3}{3a} = 1 \\Rightarrow a = 2\\), \\(b = 6\\): \\(3x + y = 6\\).\n" +
        "- Through \\((2, 3)\\) with area \\(12\\): \\(\\dfrac{2}{a} + \\dfrac{3}{b} = 1\\), \\(|ab| = 24\\). With \\(ab = 24\\): \\(2b + 3a = 24 \\Rightarrow 3a^2 - 24a + 48 = 0 \\Rightarrow a = 4\\), \\(b = 6\\) (one line, \\(3x + 2y = 12\\)). With \\(ab = -24\\): \\(3a^2 + 24a + 48 = 0\\)… gives \\(2b + 3a = -24\\), \\(3a^2 + 24a - 72 = 0\\), two real roots — two more lines. Three lines in all.\n" +
        "- \\(P(-4, 1)\\) divides \\(A(a, 0)\\), \\(B(0, b)\\) in \\(1 : 2\\): \\(\\left(\\dfrac{2a}{3}, \\dfrac{b}{3}\\right) = (-4, 1) \\Rightarrow a = -6\\), \\(b = 3\\): \\(x - 2y + 6 = 0\\).\n" +
        "- Distance from the origin: \\(p = \\dfrac{1}{\\sqrt{1/a^2 + 1/b^2}}\\), hence \\(\\dfrac{1}{a^2} + \\dfrac{1}{b^2} = \\dfrac{1}{p^2}\\).",
      formula: {
        label: "Intercept form",
        latex:
          "\\frac{x}{a} + \\frac{y}{b} = 1,\\qquad \\text{area with axes} = \\frac{|ab|}{2},\\qquad \\frac{1}{a^2} + \\frac{1}{b^2} = \\frac{1}{p^2}",
      },
      authoredExample: {
        prompt: "A line through \\((3, 4)\\) has \\(y\\)-intercept twice its \\(x\\)-intercept. Find the line.",
        steps: [
          "\\(b = 2a\\): \\(\\dfrac{3}{a} + \\dfrac{4}{2a} = 1 \\Rightarrow \\dfrac{5}{a} = 1 \\Rightarrow a = 5\\), \\(b = 10\\).",
        ],
        answer: "\\(2x + y = 10\\)",
      },
      selfCheckExample: {
        prompt: "A line through \\((1, 2)\\) makes a triangle of area \\(4\\) with the axes and has positive intercepts. Find it.",
        steps: [
          "\\(\\dfrac1a + \\dfrac2b = 1\\), \\(ab = 8\\): \\(b + 2a = 8 \\Rightarrow 2a^2 - 8a + 8 = 0 \\Rightarrow a = 2\\), \\(b = 4\\).",
        ],
        answer: "\\(2x + y = 4\\)",
      },
      practiceSet: [
        {
          prompt: "Intercepts of \\(3x + y = 6\\)?",
          answer: "\\(2\\) and \\(6\\)",
        },
        {
          prompt: "Area of the triangle \\(3x + 2y = 12\\) makes with the axes?",
          answer: "\\(12\\)",
        },
        {
          prompt: "\\(a = 3\\), \\(b = 4\\): \\(p = ?\\)",
          answer: "\\(\\dfrac{12}{5}\\)",
        },
        {
          prompt: "Line with intercepts \\(-6\\) and \\(3\\)?",
          answer: "\\(x - 2y + 6 = 0\\)",
        },
      ],
      pyqExampleId: "50249cb1-497e-4fc9-85b8-8802b448b63c",
      traps: [
        {
          title: "Forgetting the negative-product case",
          body:
            "Area \\(12\\) means \\(|ab| = 24\\), so \\(ab = -24\\) must be solved too; it supplies two of the three lines through \\((2, 3)\\). 'One' and 'two' are the options for the student who stopped at \\(ab = 24\\).",
        },
      ],
    },

    // 2 — normal form
    {
      kind: "formula" as const,
      slug: "cetsl-normal-form",
      name: "Normal Form x cos α + y sin α = p: the Perpendicular's Length and Direction",
      intuition:
        "If the perpendicular from the origin to a line has length \\(p\\) and makes angle \\(\\alpha\\) with the positive \\(x\\)-axis, the line is \\(x\\cos\\alpha + y\\sin\\alpha = p\\). The direction \\(\\alpha\\) fixes the signs; \\(p > 0\\) always.",
      definition:
        "- \\(p = 2\\sqrt2\\), \\(\\alpha = 135^\\circ\\): \\(-\\dfrac{x}{\\sqrt2} + \\dfrac{y}{\\sqrt2} = 2\\sqrt2 \\Rightarrow x - y + 4 = 0\\). The foot of the perpendicular is \\((-2, 2)\\), in the second quadrant as \\(135^\\circ\\) demands; \\(x + y = 4\\) has the right distance but the wrong direction (\\(45^\\circ\\)).\n" +
        "- \\(p = 7\\), \\(\\alpha = 120^\\circ\\): \\(-\\dfrac{x}{2} + \\dfrac{\\sqrt3 y}{2} = 7 \\Rightarrow x - \\sqrt3 y + 14 = 0\\).\n" +
        "- To convert \\(ax + by + c = 0\\): divide by \\(\\pm\\sqrt{a^2 + b^2}\\) so that the constant on the right is positive.\n" +
        "- The line's own slope is \\(-\\cot\\alpha\\); its inclination is \\(\\alpha + 90^\\circ\\).",
      formula: {
        label: "Normal form",
        latex:
          "x\\cos\\alpha + y\\sin\\alpha = p \\quad (p > 0),\\qquad \\text{foot of the perpendicular } (p\\cos\\alpha, p\\sin\\alpha)",
      },
      authoredExample: {
        prompt: "Write the line whose perpendicular from the origin has length \\(4\\) and makes \\(60^\\circ\\) with the positive \\(x\\)-axis.",
        steps: [
          "\\(x\\cos 60^\\circ + y\\sin 60^\\circ = 4 \\Rightarrow \\dfrac{x}{2} + \\dfrac{\\sqrt3 y}{2} = 4\\).",
        ],
        answer: "\\(x + \\sqrt3 y = 8\\)",
      },
      selfCheckExample: {
        prompt: "The perpendicular from the origin to a line has length \\(3\\) and makes \\(210^\\circ\\) with the positive \\(x\\)-axis. Find the line.",
        steps: [
          "\\(\\cos 210^\\circ = -\\dfrac{\\sqrt3}{2}\\), \\(\\sin 210^\\circ = -\\dfrac12\\): \\(-\\dfrac{\\sqrt3 x}{2} - \\dfrac{y}{2} = 3\\).",
        ],
        answer: "\\(\\sqrt3 x + y + 6 = 0\\)",
      },
      practiceSet: [
        {
          prompt: "Foot of the perpendicular for \\(p = 2\\sqrt2\\), \\(\\alpha = 135^\\circ\\)?",
          answer: "\\((-2, 2)\\)",
        },
        {
          prompt: "Normal form of \\(3x + 4y = 10\\)?",
          answer: "\\(\\dfrac{3x}{5} + \\dfrac{4y}{5} = 2\\)",
        },
        {
          prompt: "Distance of \\(x - y + 4 = 0\\) from the origin?",
          answer: "\\(2\\sqrt2\\)",
        },
        {
          prompt: "Slope of \\(x\\cos 120^\\circ + y\\sin 120^\\circ = 7\\)?",
          answer: "\\(\\dfrac{1}{\\sqrt3}\\)",
        },
      ],
      pyqExampleId: "23d6cab1-c334-42dc-b57e-98c964142ea3",
      traps: [
        {
          title: "Matching the distance and ignoring the direction",
          body:
            "Both \\(x + y = 4\\) and \\(x - y + 4 = 0\\) are \\(2\\sqrt2\\) from the origin. Only one has its perpendicular at \\(135^\\circ\\); check the foot's quadrant.",
        },
      ],
    },

    // 3 — point-slope, medians, parallels
    {
      kind: "formula" as const,
      slug: "cetsl-point-slope-medians-and-parallels",
      name: "Point-Slope and Two-Point Forms: Medians, Parallels Through a Point, and Reading Intercepts Back",
      intuition:
        "Given a point and a slope, \\(y - y_1 = m(x - x_1)\\); given two points, the slope comes first. A median joins a vertex to the midpoint of the opposite side; a parallel through a point copies the slope. Once written, set \\(y = 0\\) and \\(x = 0\\) to read the intercepts.",
      definition:
        "- \\(P(2, 2)\\), \\(Q(6, -1)\\), \\(R(7, 3)\\): midpoint \\(S\\left(\\tfrac{13}{2}, 1\\right)\\), slope of \\(PS\\) is \\(-\\tfrac29\\). The parallel through \\((1, -1)\\): \\(2x + 9y + 7 = 0\\); intercepts \\(-\\tfrac72\\) and \\(-\\tfrac79\\).\n" +
        "- Median from \\(A(3, k)\\) to \\(BC\\) with \\(B(2, 1)\\), \\(C(-4, 5)\\) has equation \\(x + 4y = p\\): the midpoint \\((-1, 3)\\) gives \\(p = 11\\); then \\(3 + 4k = 11\\), \\(k = 2\\).\n" +
        "- Two-point form: \\(\\dfrac{y - y_1}{y_2 - y_1} = \\dfrac{x - x_1}{x_2 - x_1}\\).\n" +
        "- An intercept can be negative; the sign is part of the answer.",
      formula: {
        label: "Point-slope",
        latex:
          "y - y_1 = m(x - x_1),\\qquad \\text{midpoint } \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)",
      },
      authoredExample: {
        prompt: "Find the median from \\(A(1, 4)\\) in the triangle with \\(B(3, -2)\\), \\(C(7, 0)\\), and its \\(x\\)-intercept.",
        steps: [
          "Midpoint of \\(BC\\): \\((5, -1)\\). Slope \\(\\dfrac{-1 - 4}{5 - 1} = -\\dfrac54\\). Line: \\(y - 4 = -\\dfrac54(x - 1) \\Rightarrow 5x + 4y = 21\\).",
          "\\(x\\)-intercept \\(\\dfrac{21}{5}\\).",
        ],
        answer: "\\(5x + 4y = 21\\); \\(x\\)-intercept \\(\\dfrac{21}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Find the line through \\((2, -3)\\) parallel to the line joining \\((1, 1)\\) and \\((4, 7)\\), and its \\(y\\)-intercept.",
        steps: [
          "Slope \\(2\\): \\(y + 3 = 2(x - 2) \\Rightarrow y = 2x - 7\\).",
        ],
        answer: "\\(2x - y - 7 = 0\\); \\(y\\)-intercept \\(-7\\)",
      },
      practiceSet: [
        {
          prompt: "Midpoint of \\((6, -1)\\) and \\((7, 3)\\)?",
          answer: "\\(\\left(\\dfrac{13}{2}, 1\\right)\\)",
        },
        {
          prompt: "\\(x\\)-intercept of \\(2x + 9y + 7 = 0\\)?",
          answer: "\\(-\\dfrac72\\)",
        },
        {
          prompt: "Line through \\((1, -1)\\) with slope \\(-\\dfrac29\\)?",
          answer: "\\(2x + 9y + 7 = 0\\)",
        },
        {
          prompt: "Midpoint of \\((2, 1)\\) and \\((-4, 5)\\)?",
          answer: "\\((-1, 3)\\)",
        },
      ],
      pyqExampleId: "1c36f5ee-798f-4989-b707-e2bbfb73d511",
      traps: [
        {
          title: "Using the vertex instead of the midpoint",
          body:
            "A median goes to the MIDPOINT of the opposite side. Joining \\(P\\) to \\(Q\\) or \\(R\\) gives a side, and the resulting intercepts are on the list.",
        },
      ],
    },

    // 4 — intersection and family through it
    {
      kind: "formula" as const,
      slug: "cetsl-intersection-and-a-line-through-it",
      name: "Intersection of Two Lines, and a Line Through It With a Given Property",
      intuition:
        "Solve the two equations to get the point, then write the required line through it — equal intercepts means \\(x + y = c\\), a given slope means point-slope. For a parametric line, substitute one equation into the other and read the condition off the resulting expression.",
      definition:
        "- \\(3x - y = 5\\), \\(x + 3y = 1\\) meet at \\(\\left(\\tfrac85, -\\tfrac15\\right)\\); the equal-intercept line through it is \\(x + y = \\tfrac75\\), i.e. \\(5x + 5y - 7 = 0\\).\n" +
        "- \\(3x + 4y = 9\\) with \\(y = mx + 1\\): \\(x = \\dfrac{5}{3 + 4m}\\). For integer \\(x\\) with integer \\(m\\), \\(3 + 4m\\) divides \\(5\\): \\(3 + 4m \\in \\{\\pm1, \\pm5\\}\\) gives integer \\(m\\) only for \\(-1\\) and \\(-5\\): \\(m = -1, -2\\). Two values.\n" +
        "- Family through the intersection of \\(L_1 = 0\\) and \\(L_2 = 0\\): \\(L_1 + \\lambda L_2 = 0\\) — useful when the point itself is ugly.\n" +
        "- 'Equal intercepts' includes the sign: \\(x + y = c\\). 'Equal in magnitude' would also allow \\(x - y = c\\).",
      formula: {
        label: "Family through an intersection",
        latex:
          "L_1 + \\lambda L_2 = 0 \\qquad \\text{equal intercepts: } x + y = c",
      },
      authoredExample: {
        prompt: "Find the line through the intersection of \\(x + 2y = 5\\) and \\(3x - y = 1\\) that is parallel to \\(4x + 3y = 0\\).",
        steps: [
          "Intersection: \\(x = 1\\), \\(y = 2\\). Slope \\(-\\dfrac43\\): \\(y - 2 = -\\dfrac43(x - 1)\\).",
        ],
        answer: "\\(4x + 3y = 10\\)",
      },
      selfCheckExample: {
        prompt: "For how many integers \\(m\\) is the \\(x\\)-coordinate of the intersection of \\(2x + 3y = 7\\) and \\(y = mx + 1\\) an integer?",
        steps: [
          "\\(2x + 3mx + 3 = 7 \\Rightarrow x = \\dfrac{4}{2 + 3m}\\); \\(2 + 3m \\in \\{\\pm1, \\pm2, \\pm4\\}\\) with integer \\(m\\): \\(2 + 3m = -1\\) (\\(m = -1\\)), \\(= 2\\) (\\(m = 0\\)), \\(= -4\\) (\\(m = -2\\)).",
        ],
        answer: "\\(3\\)",
      },
      practiceSet: [
        {
          prompt: "Intersection of \\(3x - y = 5\\) and \\(x + 3y = 1\\)?",
          answer: "\\(\\left(\\dfrac85, -\\dfrac15\\right)\\)",
        },
        {
          prompt: "Equal-intercept line through \\((2, 3)\\)?",
          answer: "\\(x + y = 5\\)",
        },
        {
          prompt: "Divisors of \\(5\\) among \\(3 + 4m\\), \\(m\\) integer?",
          answer: "\\(-1\\) and \\(-5\\)",
        },
        {
          prompt: "Do \\(y = mx + 1\\) and \\(3x + 4y = 9\\) always meet?",
          answer: "Unless \\(m = -\\dfrac34\\).",
        },
      ],
      pyqExampleId: "1637b25b-c8cb-4718-9403-db6195e4323a",
      traps: [
        {
          title: "Counting a divisor that gives a fractional m",
          body:
            "\\(3 + 4m = 1\\) has \\(m = -\\tfrac12\\); it is a divisor of \\(5\\) but not an integer \\(m\\). Only two of the four divisors survive.",
        },
      ],
    },

    // 5 — concurrency
    {
      kind: "formula" as const,
      slug: "cetsl-concurrency-determinant",
      name: "Concurrency of Three Lines: the 3 × 3 Determinant Is Zero",
      intuition:
        "Three lines \\(a_ix + b_iy + c_i = 0\\) pass through one point iff the determinant of their coefficients vanishes. It is the same test as collinearity of three points, and later as coplanarity and the scalar triple product — one determinant in four costumes.",
      definition:
        "- \\(kx + 2y + 2 = 0\\), \\(2x + ky + 3 = 0\\), \\(3x + 3y + k = 0\\): \\(\\begin{vmatrix} k & 2 & 2 \\\\ 2 & k & 3 \\\\ 3 & 3 & k \\end{vmatrix} = k^3 - 19k + 30 = (k - 2)(k - 3)(k + 5) = 0\\). \\(\\sum k_i = 0\\) — visible at once from Vieta, since there is no \\(k^2\\) term.\n" +
        "- \\(ax + by = c\\), \\(bx + cy = a\\), \\(cx + ay = b\\) concurrent: \\(\\begin{vmatrix} a & b & -c \\\\ b & c & -a \\\\ c & a & -b \\end{vmatrix} = 0 \\Rightarrow a^3 + b^3 + c^3 - 3abc = 0 \\Rightarrow a + b + c = 0\\) (or \\(a = b = c\\)).\n" +
        "- Alternative: intersect two lines and substitute into the third — quicker when the numbers are small, worse when a parameter is involved.\n" +
        "- The determinant vanishes also when two of the lines are parallel and the third is anything; check for a genuine common point when \\(k\\) makes two lines parallel.",
      formula: {
        label: "Concurrency",
        latex:
          "\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = 0",
      },
      authoredExample: {
        prompt: "Find \\(\\lambda\\) if \\(x + 2y = 3\\), \\(2x - y = 1\\) and \\(3x + \\lambda y = 5\\) are concurrent.",
        steps: [
          "First two meet at \\((1, 1)\\). Substitute: \\(3 + \\lambda = 5\\).",
        ],
        answer: "\\(\\lambda = 2\\)",
      },
      selfCheckExample: {
        prompt: "For which \\(k\\) are \\(x + y = 1\\), \\(2x + ky = 2\\) and \\(3x + 2y = 3\\) concurrent?",
        steps: [
          "First and third meet at \\((1, 0)\\); substitute: \\(2 = 2\\) holds for every \\(k\\).",
        ],
        answer: "All \\(k\\) — the point \\((1, 0)\\) lies on every line.",
      },
      practiceSet: [
        {
          prompt: "Sum of roots of \\(k^3 - 19k + 30 = 0\\)?",
          answer: "\\(0\\)",
        },
        {
          prompt: "Factor \\(k^3 - 19k + 30\\).",
          answer: "\\((k - 2)(k - 3)(k + 5)\\)",
        },
        {
          prompt: "\\(a^3 + b^3 + c^3 - 3abc = 0\\) with \\(a, b, c\\) not all equal means?",
          answer: "\\(a + b + c = 0\\)",
        },
        {
          prompt: "Are \\(x = 1\\), \\(y = 2\\), \\(x + y = 3\\) concurrent?",
          answer: "Yes, at \\((1, 2)\\).",
        },
      ],
      pyqExampleId: "3bbd9263-d1f4-476e-99c6-5b2602b1ce65",
      traps: [
        {
          title: "Expanding the determinant wrong and losing the k term",
          body:
            "The cubic is \\(k^3 - 19k + 30\\), not \\(k^3 - 10k + 30\\). Whatever the expansion, the answer to 'sum of the \\(k_i\\)' is the negative of the \\(k^2\\) coefficient — \\(0\\) here — so Vieta is the check.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Distance and the Foot of the Perpendicular — where 1/a² + 1/b² = 1/p² comes from",
      href: "/notes/mht-cet-maths/straight-line/cetsl-distance-and-foot-of-perpendicular",
    },
    {
      label: "Determinants — expanding the concurrency determinant",
      href: "/notes/mht-cet-maths/determinants-and-matrices/cetdm-determinants-and-adjoint",
    },
  ],
};
