import type { SubtopicNote } from "@/app/notes/_types";

export const AREA_BOUNDED_BY_CURVE_NOTE: SubtopicNote = {
  subtopicName: "Area Bounded by a Curve, Lines, and Axes",
  title: "Area Bounded by a Curve, Lines & Axes",
  oneLineDefinition:
    "The definite integral of a curve over an interval measures the area trapped between that curve and the x-axis — so a region's area becomes an integral you set up from where the region starts to where it ends.",
  whyItMatters:
    "This is the chapter's foundation and its larger pocket (16 PYQs, 3 HARD). Almost every question is the same skeleton — identify the boundary curve and the two vertical lines, write one definite integral, evaluate. " +
    "The marks are lost not in the integration but in the setup: forgetting the area is below the axis (so the integral is negative), forgetting a factor of 2 for a symmetric region, or missing that a curve like a semicircle or a |x|+|y|=1 square has a known area you never integrate at all. Master the signed-area idea first; everything else is recognition.",
  concepts: [
    // 1 — FOUNDATION: definite integral as signed area (no PYQ)
    {
      kind: "formula" as const,
      slug: "aoi-integral-as-signed-area",
      name: "The Definite Integral as Signed Area",
      intuition:
        "Picture thin vertical strips of width dx standing on the x-axis, each reaching up to the curve at height y. The strip's area is y·dx; adding all the strips from x=a to x=b is exactly the definite integral. When the curve dips below the axis the height y is negative, so the integral counts that part as negative area.",
      definition:
        "For a function \\(y = f(x)\\) and an interval \\([a, b]\\), the **definite integral** measures the **signed area** between the curve and the x-axis:\n" +
        "\\[\\int_a^b y\\,dx = \\int_a^b f(x)\\,dx.\\]\n" +
        "- If \\(f(x) \\ge 0\\) on \\([a, b]\\) (curve **above** the axis), the integral equals the geometric area, which is always positive.\n" +
        "- If \\(f(x) \\le 0\\) (curve **below** the axis), the integral is **negative**; the geometric area is its absolute value.\n" +
        "- The two vertical lines \\(x = a\\) and \\(x = b\\) are the **limits** — read them off as where the region starts and ends. The x-axis itself is \\(y = 0\\).",
      formula: {
        label: "Area under a curve above the axis",
        latex: "A = \\int_a^b f(x)\\,dx \\quad (f \\ge 0)",
        symbols: [
          { symbol: "a, b", meaning: "left and right boundary lines x = a, x = b" },
          { symbol: "f(x)", meaning: "the height of the region at position x" },
        ],
      },
      visualizationSlug: "aoi-area-under-curve-region",
      authoredExample: {
        prompt:
          "Find the area bounded by the line \\(y = 2x\\), the x-axis, and the lines \\(x = 1\\) and \\(x = 3\\).",
        steps: [
          "The line \\(y = 2x\\) is above the axis on \\([1, 3]\\), so the area is the plain integral.",
          "\\(A = \\int_1^3 2x\\,dx = \\left[x^2\\right]_1^3 = 9 - 1 = 8.\\)",
        ],
        answer: "\\(8\\) square units.",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\int_0^2 3x^2\\,dx\\) (area under \\(y = 3x^2\\) from 0 to 2).",
          answer: "\\(8\\)",
          method: "\\([x^3]_0^2 = 8 - 0\\).",
        },
        {
          prompt:
            "What is the area under \\(y = 4\\) (a horizontal line) between \\(x = 0\\) and \\(x = 5\\)?",
          answer: "\\(20\\)",
          method: "It is a rectangle: \\(\\int_0^5 4\\,dx = 4 \\times 5\\).",
        },
        {
          prompt:
            "Is \\(\\int_{-1}^{0} x\\,dx\\) positive or negative? Give its value.",
          answer: "Negative; \\(-\\tfrac{1}{2}\\).",
          method: "\\(y = x\\) is below the axis on \\([-1, 0]\\): \\([x^2/2]_{-1}^0 = -\\tfrac{1}{2}\\).",
        },
        {
          prompt:
            "Find the area under \\(y = x^2\\), the x-axis, and the lines \\(x = 1\\) and \\(x = 2\\).",
          answer: "\\(\\tfrac{7}{3}\\)",
          method: "\\(\\int_1^2 x^2\\,dx = [x^3/3]_1^2 = \\tfrac{8}{3} - \\tfrac{1}{3} = \\tfrac{7}{3}\\).",
        },
        {
          prompt:
            "Find the area bounded by \\(y = \\sin x\\), the x-axis, from \\(x = 0\\) to \\(x = \\pi\\).",
          answer: "\\(2\\)",
          method: "\\(\\sin x \\ge 0\\) on \\([0, \\pi]\\): \\(\\int_0^{\\pi}\\sin x\\,dx = [-\\cos x]_0^{\\pi} = 1 + 1 = 2\\).",
        },
      ],
    },

    // 2 — area under a curve, incl. known shapes (semicircle), trig over interval
    {
      kind: "formula" as const,
      slug: "aoi-area-under-curve",
      name: "Area Under a Curve Between Two Lines",
      pyqExampleId: "96aa0ad6-66d5-482d-b97d-cfdc2940090a",
      intuition:
        "The standard move: write the area as one integral of the boundary curve between the two given vertical lines. But before integrating, look at the curve — if it is a recognisable shape (a semicircle, a triangle), its area is a known formula and you can skip the integral entirely.",
      definition:
        "To find the area bounded by \\(y = f(x)\\), the x-axis, and the lines \\(x = a\\), \\(x = b\\):\n" +
        "- **Set up:** \\(A = \\int_a^b f(x)\\,dx\\), provided \\(f \\ge 0\\) on \\([a, b]\\).\n" +
        "- **Recognise known shapes** instead of integrating when you can:\n" +
        "  - \\(y = \\sqrt{r^2 - x^2}\\) is the **upper semicircle** of radius \\(r\\); its area is \\(\\tfrac{1}{2}\\pi r^2\\).\n" +
        "  - A region cut by straight lines is a triangle or rectangle — use \\(\\tfrac{1}{2}\\,\\text{base}\\times\\text{height}\\) or length×breadth.\n" +
        "- For a trig boundary like \\(y = \\cos x\\) on a subinterval, just integrate: \\(\\int \\cos x\\,dx = \\sin x\\), \\(\\int \\sin x\\,dx = -\\cos x\\).",
      formula: {
        label: "Semicircle area shortcut",
        latex: "y = \\sqrt{r^2 - x^2}\\ \\Rightarrow\\ A = \\tfrac{1}{2}\\pi r^2",
      },
      authoredExample: {
        prompt:
          "Find the area between \\(y = \\sqrt{9 - x^2}\\) (the part with \\(y \\ge 0\\)) and the x-axis.",
        steps: [
          "Recognise the curve: \\(y = \\sqrt{9 - x^2}\\) means \\(x^2 + y^2 = 9\\) with \\(y \\ge 0\\) — the upper semicircle of radius \\(3\\).",
          "Its area is half a full circle: \\(A = \\tfrac{1}{2}\\pi r^2 = \\tfrac{1}{2}\\pi (9)\\).",
        ],
        answer: "\\(\\tfrac{9\\pi}{2}\\) square units.",
      },
      selfCheckExample: {
        prompt:
          "Find the area between \\(y = \\cos x\\) and the x-axis on \\([0, \\tfrac{\\pi}{2}]\\).",
        steps: [
          "\\(\\cos x \\ge 0\\) on \\([0, \\tfrac{\\pi}{2}]\\), so \\(A = \\int_0^{\\pi/2}\\cos x\\,dx\\).",
          "\\(= [\\sin x]_0^{\\pi/2} = 1 - 0 = 1.\\)",
        ],
        answer: "\\(1\\) square unit.",
      },
      practiceSet: [
        {
          prompt:
            "Find the area of the upper semicircle \\(y = \\sqrt{16 - x^2}\\) above the x-axis.",
          answer: "\\(8\\pi\\)",
          method: "It is the upper half of \\(x^2 + y^2 = 16\\) (radius \\(4\\)): \\(\\tfrac{1}{2}\\pi r^2 = \\tfrac{1}{2}\\pi(16) = 8\\pi\\).",
        },
        {
          prompt:
            "Find the area bounded by \\(y = \\sqrt{x}\\), the x-axis, and the lines \\(x = 0\\), \\(x = 4\\).",
          answer: "\\(\\tfrac{16}{3}\\)",
          method: "\\(\\int_0^4 x^{1/2}\\,dx = [\\tfrac{2}{3}x^{3/2}]_0^4 = \\tfrac{2}{3}(8) = \\tfrac{16}{3}\\).",
        },
      ],
      traps: [
        {
          title: "Integrate only where the curve stays above the axis",
          body:
            "The formula \\(A = \\int_a^b f\\,dx\\) gives the true area only when \\(f \\ge 0\\) throughout. If the curve crosses the axis inside \\([a, b]\\), split the integral at the crossing and take absolute values — see the next concept.",
        },
      ],
    },

    // 3 — symmetry, |area|, split where curve crosses axis, factor of 2
    {
      kind: "formula" as const,
      slug: "aoi-below-axis-and-symmetry",
      name: "Below the Axis, Loops & the Factor of 2",
      pyqExampleId: "33199c28-b9ff-4864-8a51-136d8695fee7",
      intuition:
        "When a region sits partly below the axis, the raw integral cancels the positive and negative pieces. To get geometric area you must take the absolute value of each piece — and when a curve is symmetric (an odd function, or a sine loop), the parts on either side have equal area, so you compute one and multiply by 2.",
      definition:
        "**Geometric area** never cancels. When the curve crosses the axis or the region is symmetric:\n" +
        "- **Split at every crossing.** If \\(f\\) changes sign at \\(x = c\\) inside \\([a, b]\\), then\n" +
        "\\[A = \\left|\\int_a^c f\\,dx\\right| + \\left|\\int_c^b f\\,dx\\right|.\\]\n" +
        "- **Use symmetry as a shortcut.** For a region symmetric about the y-axis (or about a point), area on one side equals the other: \\(A = 2 \\times (\\text{area of one half})\\). A **loop** of \\(y = c\\sin x\\) runs over one half-period.\n" +
        "- A function like \\(f(x) = x|x|\\) equals \\(x^2\\) for \\(x > 0\\) and \\(-x^2\\) for \\(x < 0\\) — equal areas on each side, so total area \\(= 2\\int_0^{\\,k} x^2\\,dx\\).",
      formula: {
        label: "Area with a sign change at c",
        latex:
          "A = \\left|\\int_a^c f\\,dx\\right| + \\left|\\int_c^b f\\,dx\\right|",
      },
      authoredExample: {
        prompt:
          "Find the geometric area between \\(y = x^3\\) and the x-axis from \\(x = -1\\) to \\(x = 1\\).",
        steps: [
          "\\(y = x^3\\) is negative on \\([-1, 0]\\) and positive on \\([0, 1]\\), so split at \\(x = 0\\).",
          "By symmetry the two pieces have equal area: \\(A = 2\\int_0^1 x^3\\,dx = 2\\left[\\tfrac{x^4}{4}\\right]_0^1 = 2 \\cdot \\tfrac{1}{4}.\\)",
          "(Note: \\(\\int_{-1}^1 x^3\\,dx = 0\\) — the raw integral cancels, which is NOT the area.)",
        ],
        answer: "\\(\\tfrac{1}{2}\\) square unit.",
      },
      practiceSet: [
        {
          prompt:
            "Find the geometric area between \\(y = x^3\\) and the x-axis from \\(x = -2\\) to \\(x = 2\\).",
          answer: "\\(8\\)",
          method: "Symmetric: \\(2\\int_0^2 x^3\\,dx = 2[x^4/4]_0^2 = 2(4) = 8\\) (the raw integral \\(\\int_{-2}^2 x^3\\,dx = 0\\) is NOT the area).",
        },
        {
          prompt:
            "Find the total area between \\(y = x\\) and the x-axis from \\(x = -2\\) to \\(x = 2\\).",
          answer: "\\(4\\)",
          method: "Split at \\(0\\): \\(|\\int_{-2}^0 x\\,dx| + \\int_0^2 x\\,dx = 2 + 2 = 4\\) (each half is a triangle of area \\(2\\)).",
        },
      ],
      traps: [
        {
          title: "The raw integral can be zero while the area is not",
          body:
            "For an odd function over a symmetric interval, \\(\\int_{-a}^{a} f\\,dx = 0\\). That is the signed integral, not the area. Whenever a region straddles the axis, split and take absolute values — and a symmetric region doubles one half rather than cancelling it.",
        },
        {
          title: "A negative area answer means a missing modulus",
          body:
            "Geometric area is always positive. If a region lies below the axis, \\(\\int_a^b f\\,dx\\) comes out negative — that is the SIGNED value, and the area is its magnitude \\(\\left|\\int_a^b f\\,dx\\right|\\). Reporting a negative number as 'the area' (forgetting the \\(|\\cdot|\\)) is the single most common slip in this chapter.",
        },
      ],
    },

    // 4 — area enclosed by linear / modulus boundaries (geometry shortcut)
    {
      kind: "formula" as const,
      slug: "aoi-modulus-and-linear-regions",
      name: "Regions Bounded by Lines & Modulus",
      pyqExampleId: "ac86c5c3-edae-4635-b108-df74b538fa3a",
      intuition:
        "When every boundary is a straight line — including modulus boundaries like |x|+|y|=1 or x=|y| — the region is a polygon (a square, rectangle, or triangle). Sketch it, read off the vertices, and use the plain area formula. No integration needed.",
      definition:
        "Modulus equations unfold into straight-line pieces, fencing off a polygon:\n" +
        "- \\(|x| + |y| = 1\\) is a **square** (a tilted diamond) with vertices \\((\\pm 1, 0)\\) and \\((0, \\pm 1)\\); diagonal \\(2\\), area \\(2\\).\n" +
        "- \\(|x| \\le p\\) and \\(|y| \\le q\\) is a **rectangle** of width \\(2p\\) and height \\(2q\\): area \\(4pq\\).\n" +
        "- \\(x = |y|\\) is a sideways **V**; with a vertical line \\(x = c\\) it closes a triangle of base \\(2c\\) (the vertical side) and height \\(c\\).\n" +
        "**Method:** sketch, find the corner points, then apply length×breadth (rectangle) or \\(\\tfrac{1}{2}\\,\\text{base}\\times\\text{height}\\) (triangle).",
      formula: {
        label: "Polygon area, not an integral",
        latex:
          "\\text{rectangle } = \\text{w}\\times\\text{h} \\qquad \\text{triangle } = \\tfrac{1}{2}\\,b\\,h",
      },
      authoredExample: {
        prompt:
          "Find the area of the region bounded by \\(|x| \\le 3\\) and \\(|y| \\le 2\\).",
        steps: [
          "\\(|x| \\le 3\\) means \\(-3 \\le x \\le 3\\) (width \\(6\\)); \\(|y| \\le 2\\) means \\(-2 \\le y \\le 2\\) (height \\(4\\)).",
          "It is a rectangle: \\(A = \\text{width} \\times \\text{height} = 6 \\times 4.\\)",
        ],
        answer: "\\(24\\) square units.",
      },
      practiceSet: [
        {
          prompt: "Find the area of the region \\(|x| + |y| = 1\\).",
          answer: "\\(2\\)",
          method: "A tilted square (diamond) with diagonals of length \\(2\\) each: area \\(= \\tfrac{1}{2}d_1 d_2 = \\tfrac{1}{2}(2)(2) = 2\\).",
        },
        {
          prompt: "Find the area of the region bounded by \\(|x| \\le 2\\) and \\(|y| \\le 5\\).",
          answer: "\\(40\\)",
          method: "Rectangle of width \\(2(2) = 4\\) and height \\(2(5) = 10\\): area \\(= 4 \\times 10 = 40\\).",
        },
      ],
      traps: [
        {
          title: "|x| ≤ p gives a side of length 2p, not p",
          body:
            "A modulus bound \\(|x| \\le p\\) runs from \\(-p\\) to \\(+p\\), so the full side is \\(2p\\). Treating it as length \\(p\\) halves your dimension and quarters a rectangle's area — the most common modulus-region slip.",
        },
      ],
    },

    // 5 — parabola & latus rectum area (set S14 HARD + the 2022/2024 q's)
    {
      kind: "formula" as const,
      slug: "aoi-parabola-latus-rectum-area",
      name: "Area of a Parabola Cut by Its Latus Rectum",
      pyqExampleId: "72c0c0cf-6ffd-4a8e-8c86-814d89c3ef58",
      intuition:
        "A parabola y² = 4ax cut off by its latus rectum (the vertical line through the focus) encloses a region symmetric about the x-axis. Integrate the upper half from the vertex to the focus and double it — the factor of 2 is the whole game here.",
      definition:
        "For the right-opening parabola \\(y^2 = 4ax\\):\n" +
        "- The **latus rectum** is the vertical chord through the focus, the line \\(x = a\\).\n" +
        "- The upper boundary is \\(y = \\sqrt{4ax}\\); the region is symmetric about the x-axis, so\n" +
        "\\[A = 2\\int_0^{a} \\sqrt{4ax}\\,dx = 2 \\cdot 2\\sqrt{a}\\cdot \\tfrac{2}{3}a^{3/2} = \\tfrac{8}{3}a^2.\\]\n" +
        "- **Read the limit off the equation:** for \\(y^2 = 4kx\\) the latus rectum is \\(x = k\\); for \\(y^2 = x\\) write it as \\(y^2 = 4(\\tfrac14)x\\), so \\(a = \\tfrac14\\) and the limit is \\(x = \\tfrac14\\).",
      formula: {
        label: "Parabola–latus rectum area",
        latex: "y^2 = 4ax:\\quad A = 2\\int_0^{a}\\sqrt{4ax}\\,dx = \\tfrac{8}{3}a^2",
      },
      authoredExample: {
        prompt:
          "Find the area enclosed by the parabola \\(y^2 = 8x\\) and its latus rectum.",
        steps: [
          "Compare with \\(y^2 = 4ax\\): \\(4a = 8 \\Rightarrow a = 2\\), so the latus rectum is \\(x = 2\\).",
          "Symmetric about the x-axis: \\(A = 2\\int_0^2 \\sqrt{8x}\\,dx = 2\\cdot 2\\sqrt{2}\\left[\\tfrac{2}{3}x^{3/2}\\right]_0^2.\\)",
          "\\(= 4\\sqrt{2}\\cdot \\tfrac{2}{3}(2\\sqrt2) = \\tfrac{8}{3}(2)^2 = \\tfrac{32}{3}.\\)",
        ],
        answer: "\\(\\tfrac{32}{3}\\) square units.",
      },
      practiceSet: [
        {
          prompt:
            "Find the area enclosed by the parabola \\(y^2 = 4x\\) and its latus rectum.",
          answer: "\\(\\tfrac{8}{3}\\)",
          method: "\\(4a = 4 \\Rightarrow a = 1\\); area \\(= \\tfrac{8}{3}a^2 = \\tfrac{8}{3}(1) = \\tfrac{8}{3}\\).",
        },
      ],
      traps: [
        {
          title: "Double the half-region, and use the right limit",
          body:
            "Two slips combine here: forgetting the factor of 2 (the parabola lies on both sides of the axis), and integrating to \\(x = a\\) the parameter rather than to the actual latus-rectum line. For \\(y^2 = x\\) the limit is \\(x = \\tfrac14\\), not \\(x = 1\\).",
        },
      ],
    },

    // 6 — greatest integer / piecewise area
    {
      kind: "formula" as const,
      slug: "aoi-step-and-piecewise-area",
      name: "Area Under a Step (Greatest-Integer) Curve",
      pyqExampleId: "c0aa2cc4-9520-455e-86dc-d288da7b3f6e",
      intuition:
        "A step function like y = [x] is constant on each unit interval, so the region under it is a stack of rectangles. On a short interval where the step value never changes, the area is just one rectangle — height times width — and if the value is negative you take its magnitude.",
      definition:
        "For a **piecewise-constant** boundary such as the greatest-integer function \\(y = [x]\\):\n" +
        "- On any interval where \\([x]\\) holds a single value \\(n\\), the region is a rectangle of height \\(|n|\\) and width = interval length.\n" +
        "- \\([x] = n\\) for \\(n \\le x < n+1\\); e.g. for \\(x \\in [-1.8, -1.5]\\), every value lies in \\([-2, -1)\\), so \\([x] = -2\\) throughout.\n" +
        "- **Area** \\(= |n| \\times (\\text{width})\\). For a multi-step interval, sum the rectangles.",
      formula: {
        label: "One step = one rectangle",
        latex: "A = |n| \\times (\\text{interval width}), \\quad [x] = n",
      },
      authoredExample: {
        prompt:
          "Find the area bounded by \\(y = [x]\\), the x-axis, and the lines \\(x = 2.2\\) and \\(x = 2.7\\).",
        steps: [
          "For \\(2.2 \\le x \\le 2.7\\), every value is in \\([2, 3)\\), so \\([x] = 2\\) throughout.",
          "The region is one rectangle: height \\(2\\), width \\(2.7 - 2.2 = 0.5\\).",
          "\\(A = 2 \\times 0.5.\\)",
        ],
        answer: "\\(1\\) square unit.",
      },
      practiceSet: [
        {
          prompt:
            "Find the area bounded by \\(y = [x]\\), the x-axis, and the lines \\(x = -1.8\\) and \\(x = -1.5\\).",
          answer: "\\(0.6\\)",
          method: "On \\([-1.8, -1.5]\\), \\([x] = -2\\); height \\(= |-2| = 2\\), width \\(= 0.3\\): area \\(= 2 \\times 0.3 = 0.6\\).",
        },
      ],
      traps: [
        {
          title: "Negative step values still give positive area",
          body:
            "For a negative interval, \\([x]\\) is the lower integer: on \\([-1.8, -1.5]\\), \\([x] = -2\\) (not \\(-1\\)). The rectangle's height is the magnitude \\(|{-2}| = 2\\). Using \\(-1\\), or letting the area come out negative, are the two traps.",
        },
      ],
    },

    // 7 — circle-line segment (HARD set S9)
    {
      kind: "formula" as const,
      slug: "aoi-circular-segment-area",
      name: "Area of a Circular Segment by a Chord",
      pyqExampleId: "e7be1834-ca37-49d0-a582-a88f07602b52",
      intuition:
        "A line through a circle splits it into two pieces — a minor segment and a major segment. The minor segment is the integral between the chord and the arc, which equals the circular sector minus the triangle it contains. The major segment is then the whole circle minus the minor one.",
      definition:
        "When a chord (here a line such as \\(y = x\\)) cuts a circle into two regions \\(A_1\\) (major) and \\(A_2\\) (minor):\n" +
        "- The **minor segment** \\(A_2 = (\\text{sector area}) - (\\text{triangle area})\\); set it up as a definite integral between the chord and the arc.\n" +
        "- The **major segment** \\(A_1 = (\\text{full circle area}) - A_2 = \\pi r^2 - A_2\\).\n" +
        "- For the unit-radius circle \\((x-1)^2 + y^2 = 1\\) cut by \\(y = x\\) (chord from \\((0,0)\\) to \\((1,1)\\)): \\(A_2 = \\tfrac{\\pi - 2}{4}\\) and \\(A_1 = \\pi - A_2 = \\tfrac{3\\pi + 2}{4}.\\)",
      formula: {
        label: "Segments of a circle",
        latex: "A_2 = \\text{sector} - \\text{triangle}, \\qquad A_1 = \\pi r^2 - A_2",
      },
      authoredExample: {
        prompt:
          "A diameter of the circle \\(x^2 + y^2 = r^2\\) splits it into two regions. What is the area of each, and is either a 'segment'?",
        steps: [
          "A diameter passes through the centre, so it bisects the circle: each region is a semicircle.",
          "Each area \\(= \\tfrac{1}{2}\\pi r^2\\). (Only a chord that misses the centre makes unequal minor/major segments.)",
        ],
        answer: "Two equal semicircles, each \\(\\tfrac{1}{2}\\pi r^2\\).",
      },
      traps: [
        {
          title: "Subtract the triangle from the sector",
          body:
            "The minor-segment area is the sector area MINUS the triangle formed by the two radii and the chord — not the whole sector. Computing the segment as the full sector (or as the full integral without removing the triangle) is the standard mistake on these circle-cut questions.",
        },
      ],
    },
  ],
};
