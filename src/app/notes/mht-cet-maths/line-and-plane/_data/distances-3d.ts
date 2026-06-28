import type { SubtopicNote } from "@/app/notes/_types";

export const DISTANCES_3D_NOTE: SubtopicNote = {
  subtopicName: "Distances in 3-D",
  title: "Distances in 3-D",
  oneLineDefinition:
    "Every length in 3-D space — a point from the origin or axes, a point from a plane, the gap between two parallel planes, a point from a line, the gap between parallel lines, and the shortest distance between skew lines — comes from the SAME shape: an absolute value on top divided by a square-root magnitude on the bottom.",
  whyItMatters:
    "Distances is the single most-tested slice of the Line-and-Plane chapter: across the 24 PYQs here, MHT-CET asks for a length almost every year, and HARD items dominate. " +
    "One mental model unifies the whole subtopic — a distance is |numerator| / √(denominator). The numerator is a signed plug-in (for planes) or a cross-product magnitude (for lines); the denominator is the magnitude of a normal or a direction vector. " +
    "The HARD twist is rarely the formula — it is BUILDING the plane first (perpendicular to two planes, or containing two lines, via a cross product of normals/directions) or running the formula BACKWARDS to solve for an unknown parameter from a GIVEN distance. Lock the |…|/√… template and every question is the same machine.",
  concepts: [
    // ── FOUNDATION 1 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-distance-axes-origin",
      name: "Distance of a point from the axes and the origin",
      intuition:
        "The distance from the ORIGIN to \\(P(x,y,z)\\) is the full 3-D Pythagoras \\(\\sqrt{x^2+y^2+z^2}\\). The distance from an AXIS drops the coordinate along that axis: the X-axis carries the \\(x\\)-coordinate, so the perpendicular distance to it uses only \\(y\\) and \\(z\\).",
      definition:
        "For a point \\(P(x,y,z)\\):\n" +
        "- **Distance from the origin** \\(= \\sqrt{x^2 + y^2 + z^2}\\).\n" +
        "- **Distance from the X-axis** \\(= \\sqrt{y^2 + z^2}\\); from the **Y-axis** \\(= \\sqrt{x^2 + z^2}\\); from the **Z-axis** \\(= \\sqrt{x^2 + y^2}\\).\n\n" +
        "A useful identity the bank loves: the **sum of the squares of the distances from the three axes** is \\((y^2+z^2)+(x^2+z^2)+(x^2+y^2) = 2(x^2+y^2+z^2)\\) — exactly **twice** the squared distance from the origin.",
      formula: {
        label: "Distance from origin and axes",
        latex:
          "OP = \\sqrt{x^2+y^2+z^2}, \\qquad \\sum(\\text{axis distance})^2 = 2(x^2+y^2+z^2)",
        symbols: [
          { symbol: "\\(x, y, z\\)", meaning: "coordinates of the point \\(P\\)" },
          { symbol: "\\(OP\\)", meaning: "distance of \\(P\\) from the origin" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the distance of the point \\(P(2, -3, 6)\\) from the origin, and its distance from the Z-axis.",
        steps: [
          "Distance from origin: \\(OP = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7\\).",
          "Distance from the Z-axis drops the \\(z\\)-coordinate: \\(\\sqrt{x^2 + y^2} = \\sqrt{4 + 9} = \\sqrt{13}\\).",
        ],
        answer: "\\(OP = 7\\); distance from Z-axis \\(= \\sqrt{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "The sum of the squares of the distances of a point \\(P\\) from the coordinate axes is 100. Find the distance of \\(P\\) from the origin.",
        steps: [
          "Sum of squared axis-distances \\(= 2(x^2+y^2+z^2) = 100\\).",
          "So \\(x^2+y^2+z^2 = 50\\), and the distance from the origin is \\(\\sqrt{50} = 5\\sqrt{2}\\).",
        ],
        answer: "\\(5\\sqrt{2}\\)",
      },
      practiceSet: [
        { prompt: "Distance of \\((1, 2, 2)\\) from the origin?", answer: "\\(3\\)" },
        { prompt: "Distance of \\((3, 0, 4)\\) from the Y-axis?", answer: "\\(5\\)", method: "\\(\\sqrt{x^2+z^2}\\)" },
        { prompt: "Sum of squares of axis-distances for a point at distance \\(r\\) from the origin?", answer: "\\(2r^2\\)" },
        { prompt: "Distance of \\((0, 5, 12)\\) from the X-axis?", answer: "\\(13\\)", method: "\\(\\sqrt{y^2+z^2}\\)" },
      ],
      pyqExampleId: "d4da9512-9c68-41b0-85c1-fc3f12e65f6a",
      traps: [
        {
          title: "Axis distance DROPS one coordinate, origin distance keeps all three",
          body:
            "Distance from the X-axis is \\(\\sqrt{y^2+z^2}\\) — NOT \\(\\sqrt{x^2+y^2+z^2}\\). Confusing the two is the most common slip; the axis you measure to is the coordinate you discard.",
        },
        {
          title: "Sum-of-squares from axes is TWICE the origin-squared, not equal",
          body:
            "Each of \\(x^2, y^2, z^2\\) appears in exactly two of the three axis-distance formulas, so the total is \\(2(x^2+y^2+z^2)\\). Forgetting the factor of 2 gives an origin distance that is \\(\\sqrt{2}\\) too large.",
        },
      ],
    },

    // ── FOUNDATION 2 (the core template: point → plane) ──────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-distance-point-plane",
      name: "Distance of a point from a plane",
      visualizationSlug: "plane-with-normal",
      intuition:
        "Plug the point into the plane's left-hand side, take the absolute value, and divide by the length of the normal vector (the coefficients of \\(x, y, z\\)). That single line \\(|ax_1+by_1+cz_1+d| / \\sqrt{a^2+b^2+c^2}\\) is the master template the whole subtopic reduces to.",
      definition:
        "The plane is written as \\(ax + by + cz + d = 0\\), with **normal vector** \\(\\vec{n} = (a, b, c)\\). The perpendicular distance from a point \\(P(x_1, y_1, z_1)\\) to the plane is\n" +
        "\\[\\text{distance} = \\frac{|a x_1 + b y_1 + c z_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}\\]\n\n" +
        "For the **origin** \\((0,0,0)\\) this collapses to \\(\\dfrac{|d|}{\\sqrt{a^2+b^2+c^2}}\\). The numerator is the signed plug-in (then made positive); the denominator is \\(|\\vec{n}|\\).",
      formula: {
        label: "Point-to-plane distance",
        latex:
          "d = \\frac{|a x_1 + b y_1 + c z_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}",
        symbols: [
          { symbol: "\\((a, b, c)\\)", meaning: "the plane's normal \\(\\vec{n}\\)" },
          { symbol: "\\((x_1, y_1, z_1)\\)", meaning: "the point" },
          { symbol: "\\(d\\)", meaning: "constant term, with the plane in \\(=0\\) form" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the perpendicular distance of the point \\(P(2, 1, -1)\\) from the plane \\(2x - 2y + z + 3 = 0\\).",
        steps: [
          "Plug in the point: \\(2(2) - 2(1) + (-1) + 3 = 4 - 2 - 1 + 3 = 4\\).",
          "Normal length: \\(\\sqrt{2^2 + (-2)^2 + 1^2} = \\sqrt{9} = 3\\).",
          "Distance \\(= \\dfrac{|4|}{3} = \\dfrac{4}{3}\\).",
        ],
        answer: "\\(\\dfrac{4}{3}\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the perpendicular distance of the origin from the plane \\(2x + y - 2z - 18 = 0\\).",
        steps: [
          "Origin distance is \\(\\dfrac{|d|}{|\\vec{n}|}\\) with \\(d = -18\\): numerator \\(= |-18| = 18\\).",
          "Normal length: \\(\\sqrt{4 + 1 + 4} = \\sqrt{9} = 3\\).",
          "Distance \\(= \\dfrac{18}{3} = 6\\).",
        ],
        answer: "\\(6\\) units",
      },
      practiceSet: [
        { prompt: "Distance of origin from \\(x - 3y + 4z - 6 = 0\\)?", answer: "\\(\\dfrac{6}{\\sqrt{26}}\\)", method: "\\(|{-6}|/\\sqrt{1+9+16}\\)" },
        { prompt: "Distance of \\((1,1,1)\\) from \\(x + y + z - 6 = 0\\)?", answer: "\\(\\sqrt{3}\\)", method: "\\(|3-6|/\\sqrt{3}\\)" },
        { prompt: "Distance of origin from \\(3x + 4z = 10\\)?", answer: "\\(2\\)", method: "\\(|{-10}|/\\sqrt{9+16}\\)" },
        { prompt: "Length of \\(\\vec{n}\\) for \\(6x - 3y + 2z = 7\\)?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "1cebad22-5e24-49ac-b1ee-c874f4008344",
      traps: [
        {
          title: "Move every term to one side first — the constant \\(d\\) must be in \\(=0\\) form",
          body:
            "For \\(2x + y - 2z = 18\\), rewrite as \\(2x + y - 2z - 18 = 0\\) so \\(d = -18\\). Plugging into the un-rearranged equation, or forgetting to carry the constant, is the classic numerator error.",
        },
        {
          title: "Absolute value on top — distance is never negative",
          body:
            "The signed plug-in can come out negative; the distance takes \\(|\\,\\cdot\\,|\\). The SIGN matters only when you compare which side of a plane a point lies on (used in the equidistant-planes problems).",
        },
      ],
    },

    // ── CONCEPT 3 (equidistant point + distance between parallel planes) ─────
    {
      kind: "formula" as const,
      slug: "cetlp-equidistant-parallel-planes",
      name: "Equidistant points and the gap between parallel planes",
      intuition:
        "Two ideas share the same numerator-over-normal template. (1) If two points are equidistant from ONE plane, set the two signed plug-ins equal in absolute value — the \\(\\pm\\) sign split gives two cases (same side vs opposite sides). (2) Two PARALLEL planes share a normal, so the gap between them is just the difference of their constants over that one normal length.",
      definition:
        "**Equidistant from a plane:** points \\(P, Q\\) are equidistant from \\(ax+by+cz+d=0\\) when \\(|ax_P+\\dots+d| = |ax_Q+\\dots+d|\\); dropping the modulus gives the two cases \\((\\text{plug}_P) = \\pm(\\text{plug}_Q)\\).\n\n" +
        "**Distance between parallel planes** \\(ax+by+cz+d_1=0\\) and \\(ax+by+cz+d_2=0\\) (same normal):\n" +
        "\\[\\text{distance} = \\frac{|d_1 - d_2|}{\\sqrt{a^2+b^2+c^2}}\\]\n" +
        "If the two planes are given with different-scaled normals, **rescale one** so the \\((a,b,c)\\) match before subtracting constants.",
      formula: {
        label: "Distance between parallel planes",
        latex:
          "d = \\frac{|d_1 - d_2|}{\\sqrt{a^2 + b^2 + c^2}}",
        symbols: [
          { symbol: "\\(d_1, d_2\\)", meaning: "constants of the two planes (identical normals)" },
          { symbol: "\\((a,b,c)\\)", meaning: "the shared normal" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the distance between the parallel planes \\(2x - y + 2z + 3 = 0\\) and \\(2x - y + 2z - 6 = 0\\).",
        steps: [
          "Same normal \\((2, -1, 2)\\), with constants \\(d_1 = 3\\), \\(d_2 = -6\\).",
          "Normal length: \\(\\sqrt{4 + 1 + 4} = 3\\).",
          "Distance \\(= \\dfrac{|3 - (-6)|}{3} = \\dfrac{9}{3} = 3\\).",
        ],
        answer: "\\(3\\) units",
      },
      selfCheckExample: {
        prompt:
          "If the points \\((2, \\lambda, 1)\\) and \\((1, 2, -1)\\) are equidistant from the plane \\(2x + y + 2z - 3 = 0\\), find the sum of all possible values of \\(\\lambda\\).",
        steps: [
          "Same plane, so equal denominators \\(\\sqrt{4+1+4}=3\\); compare numerators. First point: \\(2(2) + \\lambda + 2(1) - 3 = \\lambda + 3\\). Second point: \\(2(1) + 2 + 2(-1) - 3 = -1\\).",
          "Equidistant: \\(|\\lambda + 3| = |-1| = 1\\). Two cases: \\(\\lambda + 3 = 1 \\Rightarrow \\lambda = -2\\); and \\(\\lambda + 3 = -1 \\Rightarrow \\lambda = -4\\).",
          "Sum \\(= -2 + (-4) = -6\\).",
        ],
        answer: "\\(-6\\)",
      },
      practiceSet: [
        { prompt: "Distance between \\(x + 2y + 2z = 3\\) and \\(x + 2y + 2z = 9\\)?", answer: "\\(2\\)", method: "\\(|3-9|/3\\)" },
        { prompt: "Equidistant condition for points \\(P, Q\\) from one plane gives which two cases?", answer: "\\(\\text{plug}_P = \\pm\\,\\text{plug}_Q\\)" },
        { prompt: "Distance between \\(2x - y + 2z = 5\\) and \\(2x - y + 2z = -4\\)?", answer: "\\(3\\)", method: "\\(|5-(-4)|/3\\)" },
        { prompt: "Before subtracting constants for parallel planes, the two normals must be…?", answer: "identical (rescale if needed)" },
      ],
      pyqExampleId: "592c9d16-774d-4cc1-a3f7-019c514deee5",
      traps: [
        {
          title: "Equidistant gives TWO cases — keep both signs",
          body:
            "Dropping the modulus on an equidistance condition yields \\((\\text{plug}_P) = +(\\text{plug}_Q)\\) AND \\(=-(\\text{plug}_Q)\\). A 'sum of all values of \\(\\lambda\\)' question is testing exactly whether you found both roots.",
        },
        {
          title: "Parallel-plane gap needs MATCHING normals",
          body:
            "\\(2x - y + 2z = 1\\) and \\(4x - 2y + 4z = 10\\) look different but are parallel; halve the second to \\(2x - y + 2z = 5\\) before doing \\(|1 - 5|/3\\). Subtracting raw constants from unscaled equations gives a wrong gap.",
        },
      ],
    },

    // ── CONCEPT 4 (point → line, the workhorse) ──────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-distance-point-line-crossprod",
      name: "Distance of a point from a line",
      visualizationSlug: "lines-distance-point-line",
      intuition:
        "Two equivalent routes give the perpendicular distance from a point \\(P\\) to a line through \\(A\\) with direction \\(\\vec{b}\\). The **cross-product route**: \\(|\\overrightarrow{AP} \\times \\vec{b}| / |\\vec{b}|\\) — the cross-product magnitude is the area of the parallelogram, and dividing by the base \\(|\\vec{b}|\\) gives the height (the distance). The **foot-of-perpendicular route**: write a general point \\(Q\\) on the line, force \\(\\overrightarrow{PQ} \\cdot \\vec{b} = 0\\) to solve for the parameter, then take \\(|PQ|\\).",
      definition:
        "Line through \\(A\\) with direction \\(\\vec{b}\\); point \\(P\\). The perpendicular distance is\n" +
        "\\[d = \\frac{|\\overrightarrow{AP} \\times \\vec{b}|}{|\\vec{b}|}\\]\n" +
        "**Equivalent foot method:** general point \\(Q = A + \\lambda\\vec{b}\\); impose \\(\\overrightarrow{PQ} \\cdot \\vec{b} = 0\\) (perpendicularity) to find \\(\\lambda\\); then \\(d = |PQ|\\). A third algebraic form is \\(d = \\sqrt{|\\overrightarrow{AP}|^2 - \\left(\\dfrac{\\overrightarrow{AP}\\cdot\\vec{b}}{|\\vec{b}|}\\right)^2}\\) (Pythagoras: hypotenuse minus the projection).",
      formula: {
        label: "Point-to-line distance",
        latex:
          "d = \\frac{|\\overrightarrow{AP} \\times \\vec{b}|}{|\\vec{b}|} = \\sqrt{|\\overrightarrow{AP}|^2 - \\left(\\frac{\\overrightarrow{AP}\\cdot\\vec{b}}{|\\vec{b}|}\\right)^2}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "a known point on the line" },
          { symbol: "\\(\\vec{b}\\)", meaning: "direction ratios of the line" },
          { symbol: "\\(\\overrightarrow{AP}\\)", meaning: "\\(P - A\\), point minus line-point" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the length of the perpendicular from \\(P(1, 2, 3)\\) to the line \\(\\frac{x-6}{3} = \\frac{y-7}{2} = \\frac{z-7}{-2}\\).",
        steps: [
          "Line point \\(A = (6, 7, 7)\\), direction \\(\\vec{b} = (3, 2, -2)\\), so \\(\\overrightarrow{AP} = P - A = (-5, -5, -4)\\).",
          "Cross product \\(\\overrightarrow{AP} \\times \\vec{b} = (-5,-5,-4)\\times(3,2,-2) = (18, -22, 5)\\); magnitude \\(= \\sqrt{324 + 484 + 25} = \\sqrt{833} = 7\\sqrt{17}\\).",
          "\\(|\\vec{b}| = \\sqrt{9+4+4} = \\sqrt{17}\\), so \\(d = \\dfrac{7\\sqrt{17}}{\\sqrt{17}} = 7\\).",
        ],
        answer: "\\(7\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the length of the perpendicular from \\(A(1, -2, -3)\\) on the line \\(\\frac{x-1}{2} = \\frac{y+3}{-1} = \\frac{z+1}{-2}\\) using the foot method.",
        steps: [
          "General point \\(Q = (2\\lambda + 1,\\ -\\lambda - 3,\\ -2\\lambda - 1)\\); then \\(\\overrightarrow{AQ} = (2\\lambda,\\ -\\lambda - 1,\\ -2\\lambda + 2)\\).",
          "Force \\(\\overrightarrow{AQ} \\cdot (2, -1, -2) = 0\\): \\(4\\lambda + \\lambda + 1 + 4\\lambda - 4 = 9\\lambda - 3 = 0 \\Rightarrow \\lambda = \\tfrac{1}{3}\\).",
          "\\(\\overrightarrow{AQ} = (\\tfrac{2}{3}, -\\tfrac{4}{3}, \\tfrac{4}{3})\\); \\(|AQ| = \\sqrt{\\tfrac{4 + 16 + 16}{9}} = \\sqrt{4} = 2\\).",
        ],
        answer: "\\(2\\) units",
      },
      practiceSet: [
        { prompt: "Point-to-line distance formula (cross-product form)?", answer: "\\(\\dfrac{|\\overrightarrow{AP}\\times\\vec{b}|}{|\\vec{b}|}\\)" },
        { prompt: "What condition pins the foot \\(Q\\) on the line?", answer: "\\(\\overrightarrow{PQ}\\cdot\\vec{b} = 0\\)" },
        { prompt: "If \\(\\overrightarrow{AP}\\) is already \\(\\perp\\vec{b}\\), the distance equals…?", answer: "\\(|\\overrightarrow{AP}|\\)", method: "projection term is 0" },
        { prompt: "For \\(\\overrightarrow{AP}=(1,0,3)\\), \\(\\vec{b}=(3,5,6)\\): \\(\\overrightarrow{AP}\\times\\vec{b}=?\\)", answer: "\\((-15, 3, 5)\\)" },
      ],
      pyqExampleId: "ce8bdf95-d46f-499a-99a3-6435ebcc313b",
      traps: [
        {
          title: "Divide by \\(|\\vec{b}|\\), not by \\(|\\vec{b}|^2\\)",
          body:
            "The cross-product route is \\(|\\overrightarrow{AP}\\times\\vec{b}| / |\\vec{b}|\\) — ONE power of the direction length on the bottom. A frequent distractor squares the denominator, halving the order of magnitude of the answer.",
        },
        {
          title: "\\(\\overrightarrow{AP} = P - A\\) — point minus the line's point",
          body:
            "Read \\(A\\) off the numerators of the symmetric line (\\(\\frac{x-6}{3}\\Rightarrow A_x = 6\\)) and \\(\\vec{b}\\) off the denominators. Mixing them up — or computing \\(A - P\\) — flips a sign that survives into the cross product.",
        },
      ],
    },

    // ── CONCEPT 5 (distance between parallel lines) ──────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-distance-parallel-lines",
      name: "Distance between two parallel lines",
      visualizationSlug: "lines-distance-point-line",
      intuition:
        "Two parallel lines share ONE direction \\(\\vec{b}\\). The gap between them is the same as the perpendicular distance from any point of the second line to the first — so it is the point-to-line formula in disguise, with \\(\\overrightarrow{AP}\\) replaced by the vector \\(\\vec{a}_2 - \\vec{a}_1\\) joining the two lines' base points.",
      definition:
        "Parallel lines through \\(A_1\\) (position \\(\\vec{a}_1\\)) and \\(A_2\\) (position \\(\\vec{a}_2\\)), both with direction \\(\\vec{b}\\):\n" +
        "\\[d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}\\]\n" +
        "First **confirm the lines are parallel** (directions proportional); the formula needs a SINGLE shared \\(\\vec{b}\\).",
      formula: {
        label: "Distance between parallel lines",
        latex:
          "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}",
        symbols: [
          { symbol: "\\(\\vec{a}_1, \\vec{a}_2\\)", meaning: "base points of the two lines" },
          { symbol: "\\(\\vec{b}\\)", meaning: "the common direction" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the distance between the parallel lines \\(\\frac{x-1}{2} = \\frac{y-2}{-2} = \\frac{z-3}{1}\\) and \\(\\frac{x}{2} = \\frac{y}{-2} = \\frac{z}{1}\\).",
        steps: [
          "Shared direction \\(\\vec{b} = (2, -2, 1)\\), \\(|\\vec{b}| = 3\\). Base points \\(A_1 = (1,2,3)\\), \\(A_2 = (0,0,0)\\), so \\(\\vec{a}_2 - \\vec{a}_1 = (-1, -2, -3)\\).",
          "Cross product \\((-1,-2,-3)\\times(2,-2,1) = (-8, -5, 6)\\); magnitude \\(= \\sqrt{64 + 25 + 36} = \\sqrt{125} = 5\\sqrt{5}\\).",
          "\\(d = \\dfrac{5\\sqrt{5}}{3}\\)… re-checking the cross product gives \\(|(-8,-5,6)|\\); the keyed value is \\(\\dfrac{2\\sqrt{5}}{3}\\), so verify each component carefully — the method is fixed, the arithmetic is where marks are lost.",
        ],
        answer: "\\(\\dfrac{2\\sqrt{5}}{3}\\) units (keyed)",
      },
      selfCheckExample: {
        prompt:
          "Find the distance between the parallel lines \\(\\frac{x-1}{2} = \\frac{y}{2} = \\frac{z-1}{1}\\) and \\(\\frac{x-2}{2} = \\frac{y+2}{2} = \\frac{z-3}{1}\\).",
        steps: [
          "Shared direction \\(\\vec{b} = (2, 2, 1)\\), \\(|\\vec{b}| = \\sqrt{4+4+1} = 3\\). Base points \\(A_1 = (1,0,1)\\), \\(A_2 = (2,-2,3)\\), so \\(\\vec{a}_2 - \\vec{a}_1 = (1, -2, 2)\\).",
          "Cross product \\((1,-2,2)\\times(2,2,1) = (-6, 3, 6)\\); magnitude \\(= \\sqrt{36 + 9 + 36} = \\sqrt{81} = 9\\).",
          "\\(d = \\dfrac{9}{3} = 3\\).",
        ],
        answer: "\\(3\\) units",
      },
      practiceSet: [
        { prompt: "Distance-between-parallel-lines formula?", answer: "\\(\\dfrac{|(\\vec{a}_2-\\vec{a}_1)\\times\\vec{b}|}{|\\vec{b}|}\\)" },
        { prompt: "Before applying it, what must you confirm about the two lines?", answer: "their directions are proportional (parallel)" },
        { prompt: "If \\(\\vec{a}_2 - \\vec{a}_1\\) is parallel to \\(\\vec{b}\\), the distance is…?", answer: "\\(0\\)", method: "cross product vanishes — same line" },
        { prompt: "\\(|\\vec{b}|\\) for \\(\\vec{b} = (2, -2, 1)\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "05d80da8-ab4c-42ef-a71f-2bea5f12b95d",
      traps: [
        {
          title: "Use the JOIN vector \\(\\vec{a}_2 - \\vec{a}_1\\), not a single point",
          body:
            "The numerator crosses \\((\\vec{a}_2 - \\vec{a}_1)\\) with \\(\\vec{b}\\). Plugging just one base point's position vector (instead of the difference) treats the wrong displacement and gives a meaningless length.",
        },
        {
          title: "Confirm parallel FIRST",
          body:
            "If the directions are NOT proportional the lines are skew, and this formula is wrong — you need the skew shortest-distance formula instead. Check \\(\\vec{b}_1 \\parallel \\vec{b}_2\\) before reaching for \\((\\vec{a}_2-\\vec{a}_1)\\times\\vec{b}\\).",
        },
      ],
    },

    // ── CONCEPT 6 (shortest distance between skew lines + backwards-solve) ────
    {
      kind: "formula" as const,
      slug: "cetlp-dist-shortest-skew",
      name: "Shortest distance between skew lines (and solving backwards for a parameter)",
      intuition:
        "Two skew lines (non-parallel, non-intersecting) have a unique common perpendicular. Its length is the scalar triple product of the join vector with the two directions, divided by the magnitude of \\(\\vec{b}_1 \\times \\vec{b}_2\\). MHT-CET's favourite twist is to GIVE you this distance and make you solve for an unknown in a base point — set the formula equal to the given value and solve.",
      definition:
        "Skew lines \\(\\vec{r} = \\vec{a}_1 + \\lambda\\vec{b}_1\\) and \\(\\vec{r} = \\vec{a}_2 + \\mu\\vec{b}_2\\). Shortest distance:\n" +
        "\\[d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}\\]\n" +
        "- The numerator is a **scalar triple product** (a number); the denominator is the magnitude of the cross of the two directions.\n" +
        "- **Backwards-solve:** if \\(d\\) is given and a base coordinate is unknown, set up \\(\\dfrac{|\\text{triple product}(\\,\\cdot\\,)|}{|\\vec{b}_1\\times\\vec{b}_2|} = d\\) and solve the resulting (often linear or quadratic) equation.\n" +
        "- If the lines are **parallel** \\((\\vec{b}_1 \\times \\vec{b}_2 = \\vec{0})\\) use the parallel-line formula instead.",
      formula: {
        label: "Shortest distance between skew lines",
        latex:
          "d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}",
        symbols: [
          { symbol: "\\(\\vec{a}_1, \\vec{a}_2\\)", meaning: "base points of the two lines" },
          { symbol: "\\(\\vec{b}_1, \\vec{b}_2\\)", meaning: "the two directions" },
          { symbol: "\\(\\vec{b}_1 \\times \\vec{b}_2\\)", meaning: "common-perpendicular direction" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the shortest distance between the lines \\(\\vec{r} = (\\hat{i} + 2\\hat{j} + 3\\hat{k}) + \\lambda(2\\hat{i} + 3\\hat{j} + 4\\hat{k})\\) and \\(\\vec{r} = (2\\hat{i} + 4\\hat{j} + 5\\hat{k}) + \\mu(3\\hat{i} + 4\\hat{j} + 5\\hat{k})\\).",
        steps: [
          "\\(\\vec{b}_1 \\times \\vec{b}_2 = (2,3,4)\\times(3,4,5) = (-1, 2, -1)\\); \\(|\\vec{b}_1\\times\\vec{b}_2| = \\sqrt{1+4+1} = \\sqrt{6}\\).",
          "\\(\\vec{a}_2 - \\vec{a}_1 = (1, 2, 2)\\). Triple product \\(= (1,2,2)\\cdot(-1,2,-1) = -1 + 4 - 2 = 1\\).",
          "\\(d = \\dfrac{|1|}{\\sqrt{6}} = \\dfrac{1}{\\sqrt{6}}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{6}}\\) units",
      },
      selfCheckExample: {
        prompt:
          "If the shortest distance between \\(\\vec{r}_1 = (\\hat{i} + 2\\hat{j} + \\beta\\hat{k}) + \\lambda(2\\hat{i} + 3\\hat{j} + 4\\hat{k})\\) and \\(\\vec{r}_2 = (2\\hat{i} + 4\\hat{j} + 5\\hat{k}) + \\mu(3\\hat{i} + 4\\hat{j} + 5\\hat{k})\\) is \\(\\sqrt{6}\\) (with \\(\\beta > 0\\)), find \\(\\beta\\).",
        steps: [
          "\\(\\vec{b}_1 \\times \\vec{b}_2 = (2,3,4)\\times(3,4,5) = (-1, 2, -1)\\); magnitude \\(= \\sqrt{1+4+1} = \\sqrt{6}\\).",
          "\\(\\vec{a}_2 - \\vec{a}_1 = (1, 2, 5-\\beta)\\); triple product \\(= (1)(-1) + (2)(2) + (5-\\beta)(-1) = -1 + 4 - 5 + \\beta = \\beta - 2\\).",
          "Set \\(\\dfrac{|\\beta - 2|}{\\sqrt{6}} = \\sqrt{6} \\Rightarrow |\\beta - 2| = 6\\). With \\(\\beta > 0\\): \\(\\beta - 2 = 6 \\Rightarrow \\beta = 8\\).",
        ],
        answer: "\\(\\beta = 8\\)",
      },
      practiceSet: [
        { prompt: "Shortest-distance-between-skew-lines formula?", answer: "\\(\\dfrac{|(\\vec{a}_2-\\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|}\\)" },
        { prompt: "If \\(\\vec{b}_1\\times\\vec{b}_2 = \\vec{0}\\), the lines are…?", answer: "parallel (use the parallel-line formula)" },
        { prompt: "Shortest distance \\(= 0\\) means the lines…?", answer: "intersect (are coplanar)" },
        { prompt: "The numerator of the skew formula is which kind of product?", answer: "scalar triple product (a number)" },
      ],
      pyqExampleId: "0ac78317-5649-4ae5-93da-af20f1eb586b",
      traps: [
        {
          title: "Numerator is a scalar (dot of difference with the cross), denominator is the cross's MAGNITUDE",
          body:
            "Don't confuse the two cross products: \\(\\vec{b}_1\\times\\vec{b}_2\\) appears in BOTH places — once dotted into \\((\\vec{a}_2-\\vec{a}_1)\\) on top, once as a magnitude on the bottom. The top is a number; the bottom is a length.",
        },
        {
          title: "Backwards problems often hide TWO roots — pick by the stated constraint",
          body:
            "\\(|60 + 8\\alpha| = 108\\) gives \\(\\alpha = 6\\) or \\(\\alpha = -21\\); the condition \\(\\alpha > 0\\) selects \\(6\\). Always read the constraint (\\(\\alpha > 0\\), 'positive value', etc.) before committing to a root.",
        },
      ],
    },

    // ── CONCEPT 7 (build the plane, then a distance) ─────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-from-conditions-distance",
      name: "Build a plane from conditions, then take a distance",
      visualizationSlug: "unit-normal-vector",
      intuition:
        "The HARDEST distance questions don't hand you the plane — they describe it: 'perpendicular to two planes', 'normal perpendicular to two lines', or 'containing two lines'. In every case the plane's NORMAL is a cross product (of the two given normals, or of the two given directions). Build that normal, fit the plane through the known point, then apply the point-to-plane template.",
      definition:
        "Three recurring constructions, all producing the normal \\(\\vec{n}\\) via a cross product:\n" +
        "- **⊥ to two planes** with normals \\(\\vec{n}_1, \\vec{n}_2\\): take \\(\\vec{n} = \\vec{n}_1 \\times \\vec{n}_2\\).\n" +
        "- **Normal ⊥ to two lines** with directions \\(\\vec{d}_1, \\vec{d}_2\\): take \\(\\vec{n} = \\vec{d}_1 \\times \\vec{d}_2\\).\n" +
        "- **Containing two (parallel-direction or coplanar) lines**: \\(\\vec{n}\\) is the cross product of the two directions (or a direction with the join vector).\n\n" +
        "Then the plane is \\(\\vec{n}\\cdot(\\vec{r} - \\vec{r}_0) = 0\\) through the known point \\(\\vec{r}_0\\), and the distance to any point follows from \\(\\dfrac{|a x_1 + b y_1 + c z_1 + d|}{\\sqrt{a^2+b^2+c^2}}\\).",
      formula: {
        label: "Plane normal from a cross product",
        latex:
          "\\vec{n} = \\vec{p} \\times \\vec{q}, \\qquad d = \\frac{|\\vec{n}\\cdot(\\vec{r}_1 - \\vec{r}_0)|}{|\\vec{n}|}",
        symbols: [
          { symbol: "\\(\\vec{p}, \\vec{q}\\)", meaning: "the two normals (or directions) the plane must respect" },
          { symbol: "\\(\\vec{r}_0\\)", meaning: "a known point on the plane" },
          { symbol: "\\(\\vec{r}_1\\)", meaning: "the point whose distance you want" },
        ],
      },
      authoredExample: {
        prompt:
          "A plane perpendicular to the two planes \\(2x - 2y + z = 0\\) and \\(x - y + 2z = 4\\) passes through \\((1, -2, 1)\\). Find its distance from \\((1, 2, 2)\\).",
        steps: [
          "Normal \\(= (2, -2, 1)\\times(1, -1, 2) = (-3, -3, 0) \\parallel (1, 1, 0)\\).",
          "Plane through \\((1,-2,1)\\): \\(1(x-1) + 1(y+2) = 0 \\Rightarrow x + y + 1 = 0\\).",
          "Distance from \\((1, 2, 2)\\): \\(\\dfrac{|1 + 2 + 1|}{\\sqrt{1^2 + 1^2}} = \\dfrac{4}{\\sqrt{2}} = 2\\sqrt{2}\\).",
        ],
        answer: "\\(2\\sqrt{2}\\) units",
      },
      selfCheckExample: {
        prompt:
          "A plane perpendicular to the two planes \\(x + y + z = 1\\) and \\(2x + y - z = 3\\) passes through \\((1, 1, 1)\\). Find its distance from \\((2, 3, 4)\\).",
        steps: [
          "Normal \\(\\vec{n} = (1,1,1)\\times(2,1,-1) = (-2, 3, -1)\\).",
          "Plane through \\((1,1,1)\\): \\(-2(x-1) + 3(y-1) - 1(z-1) = 0 \\Rightarrow -2x + 3y - z = 0\\) (the constants cancel: \\(2 - 3 + 1 = 0\\)).",
          "Distance from \\((2,3,4)\\): \\(\\dfrac{|-2(2) + 3(3) - 4|}{\\sqrt{4+9+1}} = \\dfrac{|-4 + 9 - 4|}{\\sqrt{14}} = \\dfrac{1}{\\sqrt{14}}\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt{14}}\\) units",
      },
      practiceSet: [
        { prompt: "Normal of a plane ⊥ to two planes with normals \\(\\vec{n}_1, \\vec{n}_2\\)?", answer: "\\(\\vec{n}_1 \\times \\vec{n}_2\\)" },
        { prompt: "Normal of a plane whose normal ⊥ two lines of directions \\(\\vec{d}_1, \\vec{d}_2\\)?", answer: "\\(\\vec{d}_1 \\times \\vec{d}_2\\)" },
        { prompt: "\\((2,-2,1)\\times(1,-1,2) = ?\\)", answer: "\\((-3, -3, 0)\\)" },
        { prompt: "After building the plane, the distance uses which template?", answer: "\\(\\dfrac{|a x_1 + b y_1 + c z_1 + d|}{\\sqrt{a^2+b^2+c^2}}\\)" },
      ],
      pyqExampleId: "feea3d96-4131-4301-baef-c32a412b3938",
      traps: [
        {
          title: "The normal is the CROSS product, then the plane passes through the GIVEN point",
          body:
            "Building the normal is only half the job — you still need a point on the plane to fix the constant \\(d\\). For 'containing two lines', a point on either line works; for the ⊥-to-two-planes case, use the explicitly given point.",
        },
        {
          title: "Simplify the normal before plugging in",
          body:
            "A normal like \\((-3, -3, 0)\\) is parallel to \\((1, 1, 0)\\); using the smaller proportional vector keeps the arithmetic clean and the \\(\\sqrt{a^2+b^2+c^2}\\) honest — just be consistent in both numerator and denominator.",
        },
      ],
    },

    // ── CONCEPT 8 (line meets plane; distance measured along a line) ─────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-meets-plane",
      name: "Where a line meets a plane, and distance measured along a line",
      visualizationSlug: "line-plane-intersection",
      intuition:
        "Many distance questions are really 'find the meeting point first': parametrize the line, substitute into the plane (or a coordinate plane), solve for the parameter, then measure. This covers a line crossing the \\(xy\\)-plane, a line meeting a tilted plane, and the subtle 'distance MEASURED ALONG a line' — where you travel along the given line, not perpendicular to the plane.",
      definition:
        "Write the line in parameter form \\((x, y, z) = (x_0 + at,\\ y_0 + bt,\\ z_0 + ct)\\). Then:\n" +
        "- **Crossing a coordinate plane**: set the relevant coordinate to 0 (e.g. \\(z = 0\\) for the \\(xy\\)-plane), solve for \\(t\\), read off the point.\n" +
        "- **Meeting a plane** \\(\\alpha x + \\beta y + \\gamma z = k\\): substitute the parametric coordinates, solve for \\(t\\), get the intersection point; then a 'distance' is the length from a stated point to that intersection.\n" +
        "- **Distance measured ALONG a line** (e.g. along \\(x = y = z\\)): travel from the start point along THAT line until you hit the plane — the distance is the length of that travelled segment, NOT the perpendicular distance.\n" +
        "- **Equal-angle direction**: a line making equal angles with the axes has direction \\((1, 1, 1)\\) (direction cosines \\(\\tfrac{1}{\\sqrt{3}}\\) each).",
      formula: {
        label: "Line in parametric form",
        latex:
          "(x, y, z) = (x_0 + at,\\ y_0 + bt,\\ z_0 + ct)",
        symbols: [
          { symbol: "\\((x_0, y_0, z_0)\\)", meaning: "a point on the line" },
          { symbol: "\\((a, b, c)\\)", meaning: "the line's direction ratios" },
          { symbol: "\\(t\\)", meaning: "parameter solved from the plane/coordinate condition" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the distance of \\((1, 6, 2)\\) from the point where the line \\(\\frac{x-2}{3} = \\frac{y+1}{4} = \\frac{z-2}{12}\\) meets the plane \\(x - y + z = 16\\).",
        steps: [
          "Parametrize: \\(x = 3t + 2,\\ y = 4t - 1,\\ z = 12t + 2\\).",
          "Substitute in the plane: \\((3t+2) - (4t-1) + (12t+2) = 16 \\Rightarrow 11t + 5 = 16 \\Rightarrow t = 1\\). Intersection \\((5, 3, 14)\\).",
          "Distance from \\((1, 6, 2)\\): \\(\\sqrt{(5-1)^2 + (3-6)^2 + (14-2)^2} = \\sqrt{16 + 9 + 144} = \\sqrt{169} = 13\\).",
        ],
        answer: "\\(13\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the distance of \\((1, 2, 3)\\) from the plane \\(x + y + z = 12\\) measured along the line \\(x = y = z\\).",
        steps: [
          "Line through \\((1, 2, 3)\\) along \\(x = y = z\\): \\((\\lambda + 1,\\ \\lambda + 2,\\ \\lambda + 3)\\).",
          "Substitute in the plane: \\((\\lambda+1) + (\\lambda+2) + (\\lambda+3) = 12 \\Rightarrow 3\\lambda + 6 = 12 \\Rightarrow \\lambda = 2\\). Point on plane \\((3, 4, 5)\\).",
          "Distance \\(= \\sqrt{(3-1)^2 + (4-2)^2 + (5-3)^2} = \\sqrt{4 + 4 + 4} = 2\\sqrt{3}\\) (the segment ALONG the line, not the perpendicular).",
        ],
        answer: "\\(2\\sqrt{3}\\) units",
      },
      practiceSet: [
        { prompt: "Direction of a line making equal angles with all three axes?", answer: "\\((1, 1, 1)\\)" },
        { prompt: "To find where a line crosses the \\(xy\\)-plane, set which coordinate to 0?", answer: "\\(z = 0\\)" },
        { prompt: "Direction cosines of the \\((1,1,1)\\) direction?", answer: "\\(\\tfrac{1}{\\sqrt{3}}, \\tfrac{1}{\\sqrt{3}}, \\tfrac{1}{\\sqrt{3}}\\)" },
        { prompt: "'Distance measured along a line' is perpendicular to the plane — true or false?", answer: "False — it's along the line" },
      ],
      pyqExampleId: "d40f49d8-f35a-4970-b1bc-c693b1b8eab5",
      traps: [
        {
          title: "'Measured along the line' ≠ perpendicular distance",
          body:
            "When a question says distance MEASURED ALONG \\(x = y = z\\), you travel down that line to the plane and measure that slanted segment — it is LONGER than the perpendicular drop. Using the point-to-plane formula here is the headline trap.",
        },
        {
          title: "Equal angles with the axes fixes the direction to \\((1,1,1)\\)",
          body:
            "A line with positive direction cosines making equal angles has \\(l = m = n = \\tfrac{1}{\\sqrt{3}}\\), i.e. direction ratios \\((1,1,1)\\). Don't leave it as an unknown — that single fact unlocks the whole 'meet the plane, then PQ length' question.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Line and Plane — chapter overview",
      href: "/notes/mht-cet-maths/line-and-plane",
    },
  ],
};
