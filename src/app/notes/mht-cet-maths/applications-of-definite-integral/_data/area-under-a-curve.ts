import type { SubtopicNote } from "@/app/notes/_types";

export const AREA_UNDER_A_CURVE_NOTE: SubtopicNote = {
  subtopicName: "Area Under a Curve — Between a Curve and an Axis",
  title: "Area Under a Curve — Between a Curve and an Axis",
  oneLineDefinition:
    "The area between y = f(x) and the x-axis from a to b is ∫|f(x)| dx — sketch, find where the curve meets the axis, and integrate each piece with a positive sign.",
  whyItMatters:
    "14 PYQs at 14% HARD — the cheapest page in the whole MHT-CET Maths long tail, and the one where a sketch is the entire method. " +
    "The recurring stems are a parabola cut off by the axis, a modulus or a cubic that crosses the axis (so the signed integral and the area differ), and a curve given as x in terms of y that wants a horizontal strip. " +
    "Two stems hide the curve behind a derivative or two unknown coefficients, and one asks for the vertical line that halves an area — all of them are one integral once the setup is written.",
  concepts: [
    // 1 — foundation
    {
      kind: "formula" as const,
      slug: "cetadi-area-under-a-curve-definition",
      name: "Area Under a Curve Is an Integral of |y|",
      intuition:
        "Slice the region into thin vertical strips of width \\(dx\\) and height \\(y\\); the area is the sum \\(\\int y\\,dx\\). Where the curve dips below the axis the strip's height is \\(-y\\), which is why the honest formula carries a modulus.",
      definition:
        "- Area between \\(y = f(x)\\), the x-axis and \\(x = a\\), \\(x = b\\): \\(A = \\int_a^b|f(x)|\\,dx\\). When \\(f \\ge 0\\) on the interval this is just \\(\\int_a^b f(x)\\,dx\\).\n" +
        "- **Sketch first**: find where \\(f = 0\\) (the curve meets the axis) — those are the natural limits when the stem says 'bounded by the curve and the x-axis'.\n" +
        "- \\(y = 4x - x^2\\) meets the axis at \\(0\\) and \\(4\\) and is positive between: \\(A = \\int_0^4(4x - x^2)\\,dx = \\dfrac{32}{3}\\).\n" +
        "- A **ratio of two areas** under different curves over the same interval is just the ratio of the two integrals: \\(\\int_0^{\\pi/3}\\cos x : \\int_0^{\\pi/3}\\cos 2x = \\dfrac{\\sqrt3}{2} : \\dfrac{\\sqrt3}{4} = 2 : 1\\).\n" +
        "- Units: 'sq. units' — the answer is a number, and it is never negative.",
      formula: {
        label: "Area under a curve",
        latex:
          "A = \\int_a^b\\left|f(x)\\right|dx \\qquad (f \\ge 0 \\text{ on } [a, b] \\Rightarrow A = \\int_a^b f(x)\\,dx)",
      },
      visualizationSlug: "aoi-area-under-curve-region",
      authoredExample: {
        prompt: "Find the area bounded by \\(y = 6x - x^2\\) and the x-axis.",
        steps: [
          "The curve meets the axis where \\(x(6 - x) = 0\\): \\(x = 0\\) and \\(x = 6\\); between them \\(y > 0\\).",
          "\\(A = \\int_0^6(6x - x^2)\\,dx = \\left[3x^2 - \\dfrac{x^3}{3}\\right]_0^6 = 108 - 72\\).",
        ],
        answer: "\\(36\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y = \\sin x\\), the x-axis, \\(x = 0\\) and \\(x = \\pi\\).",
        steps: [
          "\\(\\sin x \\ge 0\\) on \\([0, \\pi]\\), so \\(A = \\int_0^\\pi\\sin x\\,dx = [-\\cos x]_0^\\pi = 1 + 1\\).",
        ],
        answer: "\\(2\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "Area under \\(y = x^2\\) from \\(0\\) to \\(3\\)?",
          answer: "\\(9\\)",
        },
        {
          prompt: "Area bounded by \\(y = 9 - x^2\\) and the x-axis?",
          answer: "\\(36\\)",
          method: "\\(\\int_{-3}^{3}(9 - x^2)\\,dx\\).",
        },
        {
          prompt: "Area under \\(y = e^x\\) from \\(0\\) to \\(1\\)?",
          answer: "\\(e - 1\\)",
        },
        {
          prompt: "Area under \\(y = \\cos x\\) from \\(0\\) to \\(\\pi/2\\)?",
          answer: "\\(1\\)",
        },
      ],
      pyqExampleId: "29cd86a0-f468-4c6b-a1e0-9e823ded0708",
      traps: [
        {
          title: "Integrating over the wrong interval",
          body:
            "'Bounded by \\(y = 4x - x^2\\) and the x-axis' means from one axis-crossing to the other, \\(0\\) to \\(4\\). Integrating to some other convenient number, or from \\(-4\\), produces \\(16\\) or \\(32\\) — both offered.",
        },
      ],
    },

    // 2 — crossing the axis
    {
      kind: "formula" as const,
      slug: "cetadi-curve-crossing-the-axis",
      name: "When the Curve Crosses the Axis: Split and Take Each Piece Positive",
      intuition:
        "\\(y = x(x - 2)(x + 1)\\) is above the axis on \\((-1, 0)\\) and below on \\((0, 2)\\). The signed integral cancels part of one against the other; the AREA adds them, so integrate each piece and take absolute values.",
      definition:
        "- Find the roots inside the interval, integrate between consecutive roots, take the **absolute value of each piece**, add.\n" +
        "- \\(y = x(x - 2)(x + 1) = x^3 - x^2 - 2x\\): \\(\\left|\\int_{-1}^{0}\\right| = \\dfrac{5}{12}\\), \\(\\left|\\int_0^2\\right| = \\dfrac83\\), total \\(\\dfrac{37}{12}\\).\n" +
        "- \\(y = x|x|\\) on \\([-1, 1]\\): \\(-x^2\\) on the left, \\(x^2\\) on the right — each piece has area \\(\\dfrac13\\), total \\(\\dfrac23\\).\n" +
        "- \\(y = |x - 2|\\) between \\(x = 1\\) and \\(x = 3\\) is already non-negative: two triangles of area \\(\\dfrac12\\) each, total \\(1\\).\n" +
        "- The **signed** integral \\(\\int_{-1}^{2}(x^3 - x^2 - 2x)\\,dx = \\dfrac{5}{12} - \\dfrac83 = -\\dfrac94\\) is what the setter offers as a distractor.",
      formula: {
        label: "Area across a sign change",
        latex:
          "A = \\left|\\int_a^c f\\,dx\\right| + \\left|\\int_c^b f\\,dx\\right| \\quad (f(c) = 0)",
      },
      authoredExample: {
        prompt: "Find the area bounded by \\(y = x^3 - x\\) and the x-axis.",
        steps: [
          "Roots: \\(x(x - 1)(x + 1) = 0\\) at \\(-1, 0, 1\\). On \\((-1, 0)\\), \\(y > 0\\); on \\((0, 1)\\), \\(y < 0\\).",
          "\\(\\int_{-1}^{0}(x^3 - x)\\,dx = \\left[\\dfrac{x^4}{4} - \\dfrac{x^2}{2}\\right]_{-1}^{0} = 0 - \\left(\\dfrac14 - \\dfrac12\\right) = \\dfrac14\\); by symmetry the other piece has magnitude \\(\\dfrac14\\).",
          "Area \\(= \\dfrac14 + \\dfrac14\\).",
        ],
        answer: "\\(\\dfrac12\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(y = \\cos x\\), the x-axis, \\(x = 0\\) and \\(x = \\pi\\).",
        steps: [
          "\\(\\cos x\\) changes sign at \\(\\frac{\\pi}{2}\\): \\(\\int_0^{\\pi/2}\\cos x = 1\\), \\(\\int_{\\pi/2}^{\\pi}\\cos x = -1\\).",
          "Area \\(= 1 + |{-1}| = 2\\).",
        ],
        answer: "\\(2\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "Area between \\(y = x\\) and the x-axis from \\(-1\\) to \\(1\\)?",
          answer: "\\(1\\)",
          method: "Two triangles of \\(\\frac12\\).",
        },
        {
          prompt: "Signed integral \\(\\int_{-1}^{1}x\\,dx = ?\\)",
          answer: "\\(0\\)",
        },
        {
          prompt: "Area bounded by \\(y = |x - 2|\\), \\(x = 1\\), \\(x = 3\\) and the x-axis?",
          answer: "\\(1\\)",
        },
        {
          prompt: "Area bounded by \\(y = x|x|\\), \\(x = -1\\), \\(x = 1\\) and the x-axis?",
          answer: "\\(\\dfrac23\\)",
        },
      ],
      pyqExampleId: "0e01c900-defe-4f35-94f0-3130d0febf77",
      traps: [
        {
          title: "Reporting the signed integral as the area",
          body:
            "\\(\\int_0^\\pi\\cos x\\,dx = 0\\), but the area between \\(\\cos x\\) and the axis on \\([0, \\pi]\\) is \\(2\\). Whenever the curve crosses the axis inside the interval, one integral is not the answer.",
        },
      ],
    },

    // 3 — horizontal strips
    {
      kind: "formula" as const,
      slug: "cetadi-integrate-in-y-horizontal-strips",
      name: "Curves Given as x = g(y): Integrate in y",
      intuition:
        "\\(x = 2 - y - y^2\\) is a sideways parabola. Slicing it horizontally gives strips of width \\(x\\) and thickness \\(dy\\), so the area is \\(\\int x\\,dy\\) between the y-values where it meets the y-axis.",
      definition:
        "- Area between \\(x = g(y)\\) and the y-axis from \\(y = c\\) to \\(y = d\\): \\(A = \\int_c^d|g(y)|\\,dy\\).\n" +
        "- \\(x = 2 - y - y^2\\) meets the y-axis where \\(y^2 + y - 2 = 0\\): \\(y = -2, 1\\). \\(A = \\int_{-2}^{1}(2 - y - y^2)\\,dy = \\dfrac92\\).\n" +
        "- A region between two **horizontal lines**: \\(y = 4x^2\\), \\(x = 0\\), \\(y = 2\\), \\(y = 4\\) — solve for \\(x = \\dfrac{\\sqrt y}{2}\\) and integrate in \\(y\\): \\(\\dfrac12\\int_2^4\\sqrt y\\,dy = \\dfrac13(8 - 2\\sqrt2)\\).\n" +
        "- A parabola **symmetric about the x-axis** between two vertical lines uses vertical strips of full height \\(2y\\): area inside \\(y^2 = 4ax\\) from \\(x = a\\) to \\(4a\\) is \\(2\\int_a^{4a}2\\sqrt{ax}\\,dx = \\dfrac{56}{3}a^2\\).\n" +
        "- Choose the strip direction that makes the region a **single** integral; a horizontal strip is the natural choice whenever the boundary is given as \\(x\\) in terms of \\(y\\).",
      formula: {
        label: "Horizontal strips",
        latex:
          "A = \\int_c^d\\left|g(y)\\right|dy \\qquad \\text{(strip width } x = g(y)\\text{, thickness } dy)",
      },
      authoredExample: {
        prompt: "Find the area bounded by \\(x = y^2\\) and the y-axis between \\(y = 0\\) and \\(y = 3\\).",
        steps: [
          "Horizontal strips of width \\(x = y^2\\): \\(A = \\int_0^3 y^2\\,dy = \\left[\\dfrac{y^3}{3}\\right]_0^3\\).",
        ],
        answer: "\\(9\\) sq. units",
      },
      selfCheckExample: {
        prompt: "Find the area bounded by \\(x = 4 - y^2\\) and the y-axis.",
        steps: [
          "Meets the y-axis at \\(y = \\pm2\\); \\(x \\ge 0\\) between.",
          "\\(A = \\int_{-2}^{2}(4 - y^2)\\,dy = 2\\left[4y - \\dfrac{y^3}{3}\\right]_0^2 = 2\\left(8 - \\dfrac83\\right) = \\dfrac{32}{3}\\).",
        ],
        answer: "\\(\\dfrac{32}{3}\\) sq. units",
      },
      practiceSet: [
        {
          prompt: "Area between \\(x = y\\) and the y-axis from \\(y = 0\\) to \\(y = 4\\)?",
          answer: "\\(8\\)",
        },
        {
          prompt: "\\(y = 4x^2\\) solved for \\(x \\ge 0\\) is?",
          answer: "\\(x = \\dfrac{\\sqrt y}{2}\\)",
        },
        {
          prompt: "Area inside \\(y^2 = 4x\\) between \\(x = 0\\) and \\(x = 1\\)?",
          answer: "\\(\\dfrac83\\)",
          method: "\\(2\\int_0^1 2\\sqrt x\\,dx\\).",
        },
        {
          prompt: "Where does \\(x = 2 - y - y^2\\) meet the y-axis?",
          answer: "\\(y = -2\\) and \\(y = 1\\).",
        },
      ],
      pyqExampleId: "ff7a19df-3b35-4afb-997a-4420111f6368",
      traps: [
        {
          title: "Forgetting the lower half of a sideways parabola",
          body:
            "\\(y^2 = 4ax\\) has a branch below the axis. 'Area inside the parabola between \\(x = a\\) and \\(x = 4a\\)' counts both halves: the strip height is \\(2\\sqrt{4ax}\\), not \\(\\sqrt{4ax}\\). Half the correct answer is always in the options.",
        },
      ],
    },

    // 4 — unknown coefficients
    {
      kind: "formula" as const,
      slug: "cetadi-curve-with-unknown-coefficients",
      name: "Recover the Curve First: Unknown Coefficients and a Given Derivative",
      intuition:
        "'\\(y = a\\sqrt x + bx\\) passes through \\((1, 2)\\) and the area under it to \\(x = 4\\) is \\(8\\)' is two equations for two unknowns — one from the point, one from the area integral. Set them up, solve, then answer whatever combination is asked.",
      definition:
        "- **Point condition**: substitute the coordinates into the curve.\n" +
        "- **Area condition**: integrate the curve with the unknowns as symbols; \\(\\int_0^4(a\\sqrt x + bx)\\,dx = \\dfrac{16a}{3} + 8b\\), set equal to \\(8\\), i.e. \\(2a + 3b = 3\\). With \\(a + b = 2\\): \\(a = 3\\), \\(b = -1\\).\n" +
        "- **Given a slope**: \\(f'(x) = 2x + 1\\) through \\((1, 2)\\) means \\(f(x) = x^2 + x + c\\) with \\(c = 0\\); then the area to \\(x = 1\\) is \\(\\int_0^1(x^2 + x)\\,dx = \\dfrac56\\).\n" +
        "- Answer the **asked** quantity — \\(a - b = 4\\), the pair \\((3, -1)\\), or the area — the same setup has been asked three ways.",
      formula: {
        label: "Two conditions, two unknowns",
        latex:
          "\\text{point: } y_0 = f(x_0;\\,a, b) \\qquad \\text{area: } \\int_0^{4}f(x;\\,a, b)\\,dx = 8",
      },
      authoredExample: {
        prompt: "The curve \\(y = ax^2 + b\\) passes through \\((1, 4)\\), and the area under it from \\(x = 0\\) to \\(x = 1\\) is \\(3\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "Point: \\(a + b = 4\\).",
          "Area: \\(\\int_0^1(ax^2 + b)\\,dx = \\dfrac{a}{3} + b = 3\\).",
          "Subtract: \\(a - \\dfrac{a}{3} = 1 \\Rightarrow a = \\dfrac32\\), so \\(b = \\dfrac52\\).",
        ],
        answer: "\\(a = \\dfrac32,\\ b = \\dfrac52\\)",
      },
      selfCheckExample: {
        prompt: "A curve has slope \\(3x^2\\) at every point and passes through \\((1, 2)\\). Find the area under it from \\(x = 0\\) to \\(x = 1\\).",
        steps: [
          "\\(y = x^3 + c\\); through \\((1, 2)\\): \\(c = 1\\). So \\(y = x^3 + 1\\).",
          "Area \\(= \\int_0^1(x^3 + 1)\\,dx = \\dfrac14 + 1\\).",
        ],
        answer: "\\(\\dfrac54\\) sq. units",
      },
      pyqExampleId: "9bf0a29d-18c6-460e-978e-9238763228c3",
      traps: [
        {
          title: "Answering a when a − b was asked",
          body:
            "With \\(a = 3\\), \\(b = -1\\): \\(a - b = 4\\), \\(a + b = 2\\), \\(ab = -3\\). Every one of those is an option on some sitting of this question. Re-read the last line of the stem before choosing.",
        },
      ],
    },

    // 5 — halving an area, accumulated change
    {
      kind: "formula" as const,
      slug: "cetadi-halving-an-area-and-accumulated-change",
      name: "Dividing an Area in Half, and the Integral as Accumulated Change",
      intuition:
        "If \\(x = \\alpha\\) splits the area under \\(y = \\dfrac{x^2}{4}\\) on \\([0, 4]\\) into two equal parts, the area up to \\(\\alpha\\) is half the total: \\(\\dfrac{\\alpha^3}{12} = \\dfrac12\\cdot\\dfrac{64}{12}\\). The same integral, read as a rate summed over an interval, gives the total change in a quantity.",
      definition:
        "- **Halving line**: \\(\\int_0^\\alpha f\\,dx = \\dfrac12\\int_0^4 f\\,dx\\). For \\(f = \\dfrac{x^2}{4}\\): \\(\\alpha^3 = 32\\), \\(\\alpha = 32^{1/3}\\).\n" +
        "- **Accumulated change**: if \\(\\dfrac{dP}{dx} = 100 - 12\\sqrt x\\), the change in \\(P\\) as \\(x\\) goes \\(0 \\to 9\\) is \\(\\int_0^9(100 - 12\\sqrt x)\\,dx = 900 - 216 = 684\\); the new level is the old level plus \\(684\\).\n" +
        "- Both are 'area under a curve' with a different question attached: an unknown limit, or a starting value to add.",
      formula: {
        label: "Halving and accumulation",
        latex:
          "\\int_0^\\alpha f\\,dx = \\frac12\\int_0^b f\\,dx \\qquad P(b) - P(a) = \\int_a^b\\frac{dP}{dx}\\,dx",
      },
      authoredExample: {
        prompt: "The line \\(x = \\alpha\\) divides the area under \\(y = x^2\\) on \\([0, 2]\\) into two equal parts. Find \\(\\alpha\\).",
        steps: [
          "Total area \\(\\int_0^2 x^2\\,dx = \\dfrac83\\); half of it is \\(\\dfrac43\\).",
          "\\(\\int_0^\\alpha x^2\\,dx = \\dfrac{\\alpha^3}{3} = \\dfrac43 \\Rightarrow \\alpha^3 = 4\\).",
        ],
        answer: "\\(\\alpha = 4^{1/3}\\)",
      },
      selfCheckExample: {
        prompt: "A tank's volume changes at the rate \\(\\dfrac{dV}{dt} = 6t\\) litres per minute. If it holds \\(20\\) litres at \\(t = 0\\), how much does it hold at \\(t = 4\\)?",
        steps: [
          "Change \\(= \\int_0^4 6t\\,dt = [3t^2]_0^4 = 48\\).",
          "New volume \\(= 20 + 48\\).",
        ],
        answer: "\\(68\\) litres",
      },
      practiceSet: [
        {
          prompt: "\\(\\int_0^\\alpha x\\,dx = \\dfrac12\\int_0^4 x\\,dx\\) gives \\(\\alpha = ?\\)",
          answer: "\\(2\\sqrt2\\)",
        },
        {
          prompt: "\\(\\int_0^9(100 - 12\\sqrt x)\\,dx = ?\\)",
          answer: "\\(684\\)",
        },
        {
          prompt: "If \\(\\dfrac{dP}{dx} = 2x\\) and \\(P(0) = 5\\), then \\(P(3) = ?\\)",
          answer: "\\(14\\)",
        },
        {
          prompt: "\\(\\int_0^4\\dfrac{x^2}{4}\\,dx = ?\\)",
          answer: "\\(\\dfrac{16}{3}\\)",
        },
      ],
      pyqExampleId: "ff83c897-2061-4500-99fe-39a4d44b3e45",
      traps: [
        {
          title: "Reporting the change instead of the new level",
          body:
            "The integral gives the CHANGE (\\(684\\) items); the question asks for the new level (\\(1000 + 684 = 1684\\)). Both numbers are offered.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Definite Integration — Evaluating Definite Integrals (the antiderivatives this page assumes)",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-evaluation-and-substitution",
    },
    {
      label: "Definite Integration — Modulus and Greatest-Integer Integrands (splitting at a sign change)",
      href: "/notes/mht-cet-maths/definite-integration/cetdi-modulus-and-greatest-integer",
    },
  ],
};
