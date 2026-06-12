import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATION_CENTRE_RADIUS_NOTE: SubtopicNote = {
  subtopicName: "Circle Equation — Centre, Radius, Diameter, and Properties",
  title: "Circle Equation — Centre, Radius & Properties",
  oneLineDefinition:
    "A circle is the set of points a fixed distance (the radius) from a fixed point (the centre); its equation comes in two forms, and almost every question starts by reading the centre and radius off that equation.",
  whyItMatters:
    "This is the chapter's foundation and its largest pocket (11 PYQs, all EASY/MODERATE). Most questions never go beyond converting the general equation to centre-and-radius form and then applying one everyday property — a chord intercept, a perpendicular from the centre, a circle touching the axes, or two circles intersecting. " +
    "Get fluent at completing the square (including the divide-by-the-leading-coefficient step that the NDA loves to hide) and you clear half the chapter without effort.",
  concepts: [
    // 1 — FOUNDATION: what a circle equation is
    {
      kind: "formula" as const,
      slug: "circ-what-is-a-circle",
      name: "What a Circle Equation Is",
      intuition:
        "A circle is every point that sits exactly one radius away from the centre. Writing that distance condition with the distance formula gives the standard equation directly — there is nothing to memorise, it is just 'distance from centre = radius', squared.",
      definition:
        "A **circle** is the set of all points at a fixed distance \\(r\\) (the **radius**) from a fixed point \\(C=(h,k)\\) (the **centre**).\n" +
        "- **Standard (centre–radius) form:** a point \\((x,y)\\) is on the circle when its distance to the centre equals \\(r\\). Squaring the distance formula,\n" +
        "\\[(x-h)^2 + (y-k)^2 = r^2.\\]\n" +
        "- A **chord** is a segment joining two points on the circle; the longest chord, passing through the centre, is a **diameter** \\(=2r\\).\n" +
        "- The circle centred at the **origin** with radius \\(r\\) is simply \\(x^2 + y^2 = r^2\\).",
      formula: {
        label: "Standard form",
        latex: "(x-h)^2 + (y-k)^2 = r^2",
        symbols: [
          { symbol: "(h,k)", meaning: "centre" },
          { symbol: "r", meaning: "radius (diameter = 2r)" },
        ],
      },
      visualizationSlug: "circ-circle-anatomy",
      authoredExample: {
        prompt:
          "Write the equation of the circle with centre \\((3,-1)\\) and radius \\(4\\).",
        steps: [
          "Substitute \\(h=3,\\ k=-1,\\ r=4\\) into \\((x-h)^2+(y-k)^2=r^2\\).",
          "\\((x-3)^2 + (y+1)^2 = 16\\).",
        ],
        answer: "\\((x-3)^2 + (y+1)^2 = 16\\).",
      },
      practiceSet: [
        { prompt: "Centre \\((0,0)\\), radius \\(5\\) — write the equation.", answer: "\\(x^2 + y^2 = 25\\)" },
        { prompt: "What is the radius of \\((x-2)^2+(y+4)^2=49\\)?", answer: "\\(r = 7\\)", method: "\\(r^2 = 49\\)." },
        { prompt: "Centre \\((-1,2)\\), diameter \\(6\\) — write the equation.", answer: "\\((x+1)^2 + (y-2)^2 = 9\\)", method: "Diameter \\(6 \\Rightarrow r=3\\)." },
      ],
    },

    // 2 — general form → centre & radius
    {
      kind: "formula" as const,
      slug: "circ-general-form",
      name: "General Form — Centre and Radius by Completing the Square",
      pyqExampleId: "5ae82900-39cb-4d6b-a17c-e87c33d7d167",
      intuition:
        "Expanding the standard form scatters the centre into the linear coefficients. To get the centre back, you either complete the square or read it straight off the general form: the centre is minus half the x- and y-coefficients, and the radius comes from a fixed combination.",
      definition:
        "Expanding \\((x-h)^2+(y-k)^2=r^2\\) gives the **general form**\n" +
        "\\[x^2 + y^2 + 2gx + 2fy + c = 0,\\]\n" +
        "from which you read off:\n" +
        "- **Centre** \\(= (-g,\\,-f)\\) — minus half the coefficient of \\(x\\) and of \\(y\\).\n" +
        "- **Radius** \\(= \\sqrt{g^2 + f^2 - c}\\) (a real circle needs \\(g^2+f^2-c > 0\\)).\n" +
        "- **Watch the leading coefficient:** if the equation reads \\(Ax^2+Ay^2+\\ldots=0\\) with \\(A\\neq 1\\), **divide through by \\(A\\) first** so the \\(x^2\\) and \\(y^2\\) coefficients are \\(1\\) — otherwise the centre/radius formulas give wrong numbers.",
      formula: {
        label: "General form",
        latex: "x^2+y^2+2gx+2fy+c=0 \\;\\Rightarrow\\; \\text{centre }(-g,-f),\\;\\; r=\\sqrt{g^2+f^2-c}",
      },
      authoredExample: {
        prompt:
          "Find the centre and radius of \\(x^2 + y^2 - 6x + 8y - 11 = 0\\).",
        steps: [
          "Compare with \\(x^2+y^2+2gx+2fy+c=0\\): \\(2g=-6\\Rightarrow g=-3\\); \\(2f=8\\Rightarrow f=4\\); \\(c=-11\\).",
          "Centre \\(=(-g,-f)=(3,-4)\\).",
          "Radius \\(=\\sqrt{g^2+f^2-c}=\\sqrt{9+16+11}=\\sqrt{36}=6\\).",
        ],
        answer: "Centre \\((3,-4)\\), radius \\(6\\).",
      },
      selfCheckExample: {
        prompt: "Find the radius of \\(4x^2 + 4y^2 - 8x + 12y - 3 = 0\\).",
        steps: [
          "Divide through by \\(4\\): \\(x^2+y^2-2x+3y-\\tfrac34=0\\).",
          "Here \\(g=-1,\\ f=\\tfrac32,\\ c=-\\tfrac34\\), so \\(r=\\sqrt{1+\\tfrac94+\\tfrac34}=\\sqrt{4}=2\\).",
        ],
        answer: "\\(r = 2\\).",
      },
      practiceSet: [
        { prompt: "Find the centre of \\(x^2+y^2+4x-6y-12=0\\).", answer: "\\((-2,3)\\)", method: "\\(2g=4,\\ 2f=-6\\Rightarrow(-g,-f)=(-2,3)\\)." },
        { prompt: "Find the radius of \\(x^2+y^2-6x+8y=0\\).", answer: "\\(r = 5\\)", method: "\\(g=-3,f=4,c=0\\Rightarrow\\sqrt{9+16}=5\\)." },
      ],
      traps: [
        {
          title: "Divide by the leading coefficient BEFORE reading g, f, c",
          body:
            "A \\(4x^2+4y^2+\\ldots\\) circle is the single most common NDA trap here. The centre is NOT \\((-g,-f)\\) of the un-divided equation — you must first make the \\(x^2\\) coefficient \\(1\\). Skipping this scales the centre and radius by the wrong factor.",
        },
        {
          title: "Centre is MINUS g and MINUS f",
          body:
            "From \\(x^2+y^2+2gx+2fy+c=0\\) the centre is \\((-g,-f)\\). Many slips come from reading the centre as \\((g,f)\\) or as \\((2g,2f)\\) — it is half the coefficient, negated.",
        },
      ],
    },

    // 3 — diameter form (factored) — set-free single q ace3e89c + statements e91b7c86
    {
      kind: "formula" as const,
      slug: "circ-diameter-form",
      name: "Diameter Form — Circle From Two Endpoints",
      pyqExampleId: "ace3e89c-0727-401b-8a3d-1ed031f87f41",
      intuition:
        "If you know the two ends of a diameter, you do not need the centre at all. Any point on the circle sees the diameter at a right angle (angle in a semicircle), so the two vectors from it to the endpoints are perpendicular — that dot-product-equals-zero condition IS the circle.",
      definition:
        "The circle with a **diameter** from \\((x_1,y_1)\\) to \\((x_2,y_2)\\) is\n" +
        "\\[(x-x_1)(x-x_2) + (y-y_1)(y-y_2) = 0.\\]\n" +
        "- It comes from the **angle-in-a-semicircle** fact: a point \\(P=(x,y)\\) is on the circle exactly when \\(\\vec{PA}\\perp\\vec{PB}\\), i.e. their dot product is zero.\n" +
        "- Recognising a circle ALREADY in this factored shape \\(\\big((x-p)(x-q)+(y-s)(y-t)=0\\big)\\) hands you the diameter endpoints \\((p,s)\\) and \\((q,t)\\) — and the **centre** is their midpoint \\(\\big(\\tfrac{p+q}{2},\\tfrac{s+t}{2}\\big)\\).",
      formula: {
        label: "Diameter form",
        latex: "(x-x_1)(x-x_2) + (y-y_1)(y-y_2) = 0",
      },
      authoredExample: {
        prompt:
          "Find the centre of the circle \\((x-1)(x-5)+(y-2)(y-8)=0\\).",
        steps: [
          "This is diameter form with endpoints \\((1,2)\\) and \\((5,8)\\).",
          "Centre = midpoint of the diameter \\(=\\left(\\tfrac{1+5}{2},\\tfrac{2+8}{2}\\right)=(3,5)\\).",
        ],
        answer: "Centre \\((3,5)\\).",
      },
      traps: [
        {
          title: "The x-factors and y-factors are separate",
          body:
            "In \\((x-x_1)(x-x_2)+(y-y_1)(y-y_2)=0\\) the endpoints are \\((x_1,y_1)\\) and \\((x_2,y_2)\\) — you pair the FIRST x-factor with the FIRST y-factor. A common error mixes them, e.g. reading endpoints as \\((x_1,y_2)\\), giving the wrong diameter.",
        },
      ],
    },

    // 4 — intercepts on the axes  (98c2032c)
    {
      kind: "formula" as const,
      slug: "circ-axis-intercepts",
      name: "Intercepts a Circle Cuts on the Axes",
      pyqExampleId: "98c2032c-d378-4a98-b32a-039e6417272a",
      intuition:
        "Where a circle meets the x-axis, y is zero; where it meets the y-axis, x is zero. Set the relevant variable to zero and you get a quadratic in the other — the gap between its two roots is the length of the intercept.",
      definition:
        "For a circle, the **chord it cuts on an axis** is found by zeroing the other coordinate:\n" +
        "- **y-axis intercept:** put \\(x=0\\); the equation becomes a quadratic in \\(y\\). Its two roots \\(y_1,y_2\\) are where the circle meets the y-axis, and the **intercept length** is \\(|y_1 - y_2|\\).\n" +
        "- **x-axis intercept:** put \\(y=0\\) and read the gap between the roots in \\(x\\) the same way.\n" +
        "- In general-form symbols, the x-axis intercept length is \\(2\\sqrt{g^2-c}\\) and the y-axis intercept length is \\(2\\sqrt{f^2-c}\\) (real only when the bracket is positive).",
      formula: {
        label: "Axis intercept lengths",
        latex: "\\text{x-axis: }2\\sqrt{g^2-c}\\qquad \\text{y-axis: }2\\sqrt{f^2-c}",
      },
      authoredExample: {
        prompt:
          "Find the length of the chord that \\(x^2+y^2-2x-8=0\\) cuts on the x-axis.",
        steps: [
          "Set \\(y=0\\): \\(x^2 - 2x - 8 = 0 \\Rightarrow (x-4)(x+2)=0\\), so \\(x=4\\) or \\(x=-2\\).",
          "Intercept length \\(=|4-(-2)|=6\\).",
        ],
        answer: "\\(6\\) units.",
      },
      practiceSet: [
        { prompt: "Find the length of the chord \\(x^2+y^2-4x-5=0\\) cuts on the x-axis.", answer: "\\(6\\)", method: "\\(y=0:\\ x^2-4x-5=0\\Rightarrow x=5,-1\\); gap \\(6\\)." },
        { prompt: "Find the length of the chord \\(x^2+y^2-6y-7=0\\) cuts on the y-axis.", answer: "\\(8\\)", method: "\\(x=0:\\ y^2-6y-7=0\\Rightarrow y=7,-1\\); gap \\(8\\)." },
      ],
      traps: [
        {
          title: "Intercept is the GAP between roots, not a single root",
          body:
            "After zeroing a variable you get two roots — the intercept length is \\(|y_1-y_2|\\) (or \\(|x_1-x_2|\\)), the distance between them. Reporting just one root, or their sum, is the standard slip. If the quadratic has no real roots, the circle simply doesn't meet that axis.",
        },
      ],
    },

    // 5 — perpendicular from centre bisects a chord (8cf0f8f8)
    {
      kind: "formula" as const,
      slug: "circ-perpendicular-from-centre",
      name: "Perpendicular From the Centre Bisects a Chord",
      pyqExampleId: "8cf0f8f8-183b-4fea-9b73-c50f3be595b7",
      intuition:
        "Drop a perpendicular from the centre onto any chord and it lands exactly at the chord's midpoint. So to find a chord's midpoint you do not solve for the chord's endpoints — you just intersect the chord with the line through the centre perpendicular to it.",
      definition:
        "A fundamental circle property: **the perpendicular from the centre to a chord bisects the chord** (and, conversely, the line from the centre to a chord's midpoint is perpendicular to the chord).\n" +
        "- **Midpoint of a chord on a line \\(L\\):** drop a perpendicular from the centre \\(C\\) to \\(L\\); the foot of that perpendicular is the midpoint. Build the line through \\(C\\) with slope \\(=-1/(\\text{slope of }L)\\) and intersect it with \\(L\\).\n" +
        "- **Length of a chord** at perpendicular distance \\(d\\) from the centre: \\(2\\sqrt{r^2 - d^2}\\).",
      formula: {
        label: "Chord length from centre distance",
        latex: "\\text{chord} = 2\\sqrt{r^2 - d^2}\\quad(d=\\text{distance from centre to the chord})",
      },
      authoredExample: {
        prompt:
          "Find the midpoint of the chord that the line \\(x+y=4\\) cuts on the circle \\(x^2+y^2=16\\).",
        steps: [
          "Centre is \\((0,0)\\). The line \\(x+y=4\\) has slope \\(-1\\), so the perpendicular through the centre has slope \\(1\\): \\(y=x\\).",
          "Intersect \\(y=x\\) with \\(x+y=4\\): \\(2x=4\\Rightarrow x=2,\\ y=2\\).",
          "The foot of the perpendicular is the midpoint.",
        ],
        answer: "Midpoint \\((2,2)\\).",
      },
      practiceSet: [
        { prompt: "A chord of \\(x^2+y^2=25\\) is \\(3\\) units from the centre. Find its length.", answer: "\\(8\\)", method: "\\(2\\sqrt{r^2-d^2}=2\\sqrt{25-9}=8\\)." },
        { prompt: "A chord of length \\(24\\) lies in a circle of radius \\(13\\). How far is it from the centre?", answer: "\\(5\\)", method: "\\(d=\\sqrt{r^2-(\\tfrac{\\text{chord}}2)^2}=\\sqrt{169-144}=5\\)." },
      ],
      traps: [
        {
          title: "Use the NEGATIVE-reciprocal slope for the perpendicular",
          body:
            "If the chord's line has slope \\(m\\), the line from the centre is perpendicular with slope \\(-1/m\\) — not \\(m\\), not \\(1/m\\). Getting the sign or the reciprocal wrong lands you at the wrong point on the chord (the sign-of-slope slip is exactly what trips this PYQ).",
        },
      ],
    },

    // 6 — circle touching the axes / a line (ccbae73d) + (4c0820c6) statements
    {
      kind: "formula" as const,
      slug: "circ-touching-axes",
      name: "Circles That Touch the Axes",
      pyqExampleId: "ccbae73d-ad0a-4296-94fa-6b9682e0b30c",
      intuition:
        "A circle touches a line when its centre is exactly one radius away from that line. Touching an axis pins one coordinate of the centre to the radius — and touching BOTH axes forces the centre to be (r, r) (up to signs), which collapses the problem to a single unknown.",
      definition:
        "**Tangency to a line = distance from centre equals radius.**\n" +
        "- **Touches the x-axis** \\(\\iff\\) \\(|k| = r\\) (the centre's height equals the radius). Touches the **y-axis** \\(\\iff |h| = r\\).\n" +
        "- **Touches BOTH axes in the first quadrant** \\(\\iff\\) centre \\(=(r,r)\\), so the equation is \\((x-r)^2+(y-r)^2=r^2\\).\n" +
        "- **Touches a general line \\(ax+by+c=0\\)** \\(\\iff\\) \\(\\dfrac{|ah+bk+c|}{\\sqrt{a^2+b^2}} = r\\).",
      formula: {
        label: "Tangency condition",
        latex: "\\frac{|ah+bk+c|}{\\sqrt{a^2+b^2}} = r",
        symbols: [
          { symbol: "(h,k)", meaning: "centre" },
          { symbol: "r", meaning: "radius" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the equation of the circle that touches both axes in the first quadrant and also the line \\(x=6\\).",
        steps: [
          "Touching both axes in the first quadrant \\(\\Rightarrow\\) centre \\((r,r)\\), radius \\(r\\).",
          "Touching \\(x=6\\): the horizontal distance from the centre to \\(x=6\\) is \\(|6-r|\\), set equal to \\(r\\): \\(6-r=r\\Rightarrow r=3\\).",
          "Centre \\((3,3)\\): \\((x-3)^2+(y-3)^2=9\\).",
        ],
        answer: "\\((x-3)^2+(y-3)^2=9\\), i.e. \\(x^2+y^2-6x-6y+9=0\\).",
      },
      practiceSet: [
        { prompt: "A circle in the first quadrant touches both axes and has radius \\(4\\). Find its centre.", answer: "\\((4,4)\\)", method: "Centre \\((r,r)=(4,4)\\)." },
        { prompt: "A circle with centre \\((3,5)\\) touches the x-axis. Find its radius.", answer: "\\(5\\)", method: "Touches x-axis \\(\\Rightarrow r=|k|=5\\)." },
      ],
      traps: [
        {
          title: "Touching an axis is |coordinate| = r, not coordinate = r",
          body:
            "A circle touching both axes can sit in any quadrant: centre \\((\\pm r,\\pm r)\\). The PYQ usually pins it to the first quadrant, giving \\((r,r)\\) — but read the quadrant condition. And touching a line means distance \\(=r\\) (tangent), which is stricter than merely crossing it.",
        },
      ],
    },

    // 7 — two circles intersecting (d8eb9ed6)
    {
      kind: "formula" as const,
      slug: "circ-two-circles",
      name: "Two Circles — Intersecting, Touching, Separate",
      pyqExampleId: "d8eb9ed6-7a27-4d05-88a1-fc78b31d1a30",
      intuition:
        "Whether two circles cross, kiss, or miss is decided entirely by one number: the distance between their centres, compared to the sum and difference of their radii. Picture sliding one circle toward the other — it first touches externally, then overlaps, then touches internally, then one swallows the other.",
      definition:
        "For circles with centres \\(C_1,C_2\\), radii \\(r_1,r_2\\), and centre distance \\(d=|C_1C_2|\\):\n" +
        "- **Two distinct intersection points** \\(\\iff |r_1 - r_2| < d < r_1 + r_2\\).\n" +
        "- **Touch externally** (one common point) \\(\\iff d = r_1+r_2\\); **touch internally** \\(\\iff d = |r_1-r_2|\\).\n" +
        "- **Lie outside each other** (no common point) \\(\\iff d > r_1+r_2\\); **one inside the other** \\(\\iff d < |r_1-r_2|\\).",
      formula: {
        label: "Two distinct intersections",
        latex: "|r_1 - r_2| < d < r_1 + r_2",
      },
      authoredExample: {
        prompt:
          "For which \\(r>0\\) do \\(x^2+y^2=r^2\\) and \\((x-6)^2+y^2=4\\) intersect at two points?",
        steps: [
          "Centres \\((0,0)\\) and \\((6,0)\\), so \\(d=6\\); radii \\(r\\) and \\(2\\).",
          "Two intersections need \\(|r-2|<6<r+2\\).",
          "Right inequality: \\(r>4\\). Left inequality: \\(|r-2|<6\\Rightarrow -4<r<8\\). Combine with \\(r>4\\).",
        ],
        answer: "\\(4 < r < 8\\).",
      },
      practiceSet: [
        { prompt: "Two circles of radii \\(3\\) and \\(4\\) touch externally. What is the distance between their centres?", answer: "\\(7\\)", method: "External touch \\(\\Rightarrow d=r_1+r_2=7\\)." },
        { prompt: "Two circles of radii \\(9\\) and \\(4\\) touch internally. What is the distance between their centres?", answer: "\\(5\\)", method: "Internal touch \\(\\Rightarrow d=|r_1-r_2|=5\\)." },
      ],
      traps: [
        {
          title: "Both inequalities matter — it's a band, not a single bound",
          body:
            "\"Intersect at two points\" is the strict double inequality \\(|r_1-r_2|<d<r_1+r_2\\). Using only \\(d<r_1+r_2\\) lets one circle sit entirely inside the other (which has NO intersection). Always check the lower bound too.",
        },
      ],
    },

    // 8 — circle through origin with axis intercepts (443e966d), + radius-of-4x²-circle (94c2e57d) tagged here
    {
      kind: "formula" as const,
      slug: "circ-through-origin-intercepts",
      name: "Circle Through the Origin With Given Axis Intercepts",
      pyqExampleId: "443e966d-f032-4fdd-a92b-59c11a1655d6",
      intuition:
        "A circle through the origin that also crosses the axes at known points is fully determined: those three points (the origin and the two axis-crossings) fix the circle. Because two of the points lie on the axes, the diameter form makes the centre fall out instantly.",
      definition:
        "A circle through the **origin** making intercepts \\(a\\) on the x-axis and \\(b\\) on the y-axis passes through \\((0,0),(a,0),(0,b)\\):\n" +
        "- Its general form is \\(x^2+y^2-ax-by=0\\) (the constant term is \\(0\\) because it passes through the origin).\n" +
        "- **Centre** \\(=\\left(\\tfrac a2,\\tfrac b2\\right)\\) — the midpoint of the axis-crossings, since \\((a,0)\\) and \\((0,b)\\) are ends of a diameter (the angle at the origin is a right angle).\n" +
        "- To test which line the centre lies on, substitute \\(\\left(\\tfrac a2,\\tfrac b2\\right)\\) into each candidate.",
      formula: {
        label: "Circle through origin, intercepts a, b",
        latex: "x^2+y^2-ax-by=0,\\qquad \\text{centre }\\left(\\tfrac a2,\\tfrac b2\\right)",
      },
      authoredExample: {
        prompt:
          "A circle through the origin makes positive intercepts \\(8\\) on the x-axis and \\(6\\) on the y-axis. Find its centre and radius.",
        steps: [
          "It passes through \\((0,0),(8,0),(0,6)\\). Centre = midpoint of \\((8,0)\\) and \\((0,6)\\) \\(=(4,3)\\).",
          "Radius = distance from \\((4,3)\\) to the origin \\(=\\sqrt{16+9}=5\\).",
        ],
        answer: "Centre \\((4,3)\\), radius \\(5\\).",
      },
      traps: [
        {
          title: "Through the origin forces the constant term to vanish",
          body:
            "Substituting \\((0,0)\\) into \\(x^2+y^2+2gx+2fy+c=0\\) gives \\(c=0\\) — a circle through the origin has no constant term. Forgetting this adds a spurious unknown and the system stops being solvable from the three points.",
        },
      ],
    },
  ],
};
