import type { SubtopicNote } from "@/app/notes/_types";

export const ANGLES_CONDITIONS_NOTE: SubtopicNote = {
  subtopicName: "Angles — Line, Plane, and Direction Conditions",
  title: "Angles — Line, Plane, and Direction Conditions",
  oneLineDefinition:
    "The angle formulas of 3-D geometry — between two lines, two planes, and a line and a plane — plus the direction-ratio conditions for parallel, perpendicular, and line-lies-in-plane, run in the MHT-CET's favourite direction: set the formula equal to a given value and solve for an unknown.",
  whyItMatters:
    "This is the most HARD-heavy subtopic in the chapter: roughly 21 PYQs, the majority MODERATE-to-HARD. " +
    "One shape dominates — you are handed an angle (or a perpendicular/parallel/lies-in condition) and asked for a missing constant: solve for m, lambda, p, alpha, or mu. " +
    "Almost every question reduces to ONE of three formulas (line-line cos, plane-plane cos, line-plane sin) or ONE of two conditions (dot product zero for perpendicular, point-on-plane AND direction-dot-normal-zero for lies-in). Learn to recognise which of the five you are in, and the algebra is routine.",
  concepts: [
    // ── FOUNDATION ───────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-dr-dc-foundations",
      name: "Direction ratios, direction cosines, and the dot/cross toolkit",
      visualizationSlug: "direction-cosines",
      intuition:
        "A line in space is captured by its **direction ratios** \\((a, b, c)\\) — any vector pointing along it. Normalise them and you get **direction cosines** \\((l, m, n)\\), the cosines of the angles the line makes with the three axes, which always satisfy \\(l^2 + m^2 + n^2 = 1\\). A plane is captured by its **normal vector** \\((A, B, C)\\), read straight off \\(Ax + By + Cz = d\\). Every angle in this subtopic is a dot product of two of these.",
      definition:
        "The four building blocks every later formula uses:\n" +
        "- **Direction ratios (d.r.s):** the components \\((a, b, c)\\) of any vector \\(\\vec{d}\\) along the line; for \\(\\dfrac{x-x_1}{a} = \\dfrac{y-y_1}{b} = \\dfrac{z-z_1}{c}\\) they are the denominators.\n" +
        "- **Direction cosines (d.c.s):** \\(l = \\dfrac{a}{|\\vec{d}|}\\), \\(m = \\dfrac{b}{|\\vec{d}|}\\), \\(n = \\dfrac{c}{|\\vec{d}|}\\), with \\(|\\vec{d}| = \\sqrt{a^2 + b^2 + c^2}\\). They obey \\(l^2 + m^2 + n^2 = 1\\).\n" +
        "- **Plane normal:** for \\(Ax + By + Cz = d\\), the normal vector is \\(\\vec{n} = (A, B, C)\\).\n" +
        "- **Dot and cross:** \\(\\vec{u}\\cdot\\vec{v} = u_1v_1 + u_2v_2 + u_3v_3\\) measures alignment (zero ⟹ perpendicular); \\(\\vec{n_1}\\times\\vec{n_2}\\) gives a vector perpendicular to both — the direction of the line where two planes meet.",
      formula: {
        label: "The toolkit",
        latex:
          "l^2 + m^2 + n^2 = 1, \\qquad \\vec{u}\\cdot\\vec{v} = u_1v_1 + u_2v_2 + u_3v_3, \\qquad |\\vec{d}| = \\sqrt{a^2 + b^2 + c^2}",
        symbols: [
          { symbol: "\\((a,b,c)\\)", meaning: "direction ratios of a line" },
          { symbol: "\\((l,m,n)\\)", meaning: "direction cosines (normalised d.r.s)" },
          { symbol: "\\((A,B,C)\\)", meaning: "normal of the plane \\(Ax+By+Cz=d\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the direction cosines of the line \\(\\dfrac{x-1}{2} = \\dfrac{y+3}{-1} = \\dfrac{z}{2}\\), and write the normal of the plane \\(3x - 4y + z = 5\\).",
        steps: [
          "Direction ratios of the line: \\((2, -1, 2)\\) (the denominators).",
          "Magnitude: \\(\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3\\).",
          "Direction cosines: \\(\\left(\\dfrac{2}{3}, -\\dfrac{1}{3}, \\dfrac{2}{3}\\right)\\); check \\(\\tfrac{4}{9}+\\tfrac{1}{9}+\\tfrac{4}{9}=1\\) ✓.",
          "Normal of the plane is read straight off the coefficients: \\(\\vec{n} = (3, -4, 1)\\).",
        ],
        answer:
          "d.c.s \\(= \\left(\\tfrac{2}{3}, -\\tfrac{1}{3}, \\tfrac{2}{3}\\right)\\); plane normal \\(= (3, -4, 1)\\)",
      },
      practiceSet: [
        { prompt: "Direction ratios of \\(\\dfrac{x-2}{4} = \\dfrac{y}{-3} = \\dfrac{z+1}{0}\\)?", answer: "\\((4, -3, 0)\\)" },
        { prompt: "Normal of the plane \\(2x - 5y + 2z = 7\\)?", answer: "\\((2, -5, 2)\\)" },
        { prompt: "d.c.s of the line with d.r.s \\((1, 2, 2)\\)?", answer: "\\(\\left(\\tfrac{1}{3}, \\tfrac{2}{3}, \\tfrac{2}{3}\\right)\\)", method: "\\(|\\vec{d}| = 3\\)" },
        { prompt: "What does \\(l^2 + m^2 + n^2\\) always equal for direction cosines?", answer: "\\(1\\)" },
      ],
      traps: [
        {
          title: "Direction RATIOS are not direction COSINES",
          body:
            "\\((2, -1, 2)\\) are direction ratios; you must divide by \\(|\\vec{d}| = 3\\) to get the cosines. An angle formula written with cos uses the cosines (or, equivalently, ratios divided by the magnitudes inside the formula) — never raw ratios where unit vectors are required.",
        },
        {
          title: "A zero denominator is a valid direction ratio",
          body:
            "In \\(\\dfrac{z+1}{0}\\) the \\(0\\) means the line is perpendicular to the \\(z\\)-axis, with d.r.s \\((\\cdot, \\cdot, 0)\\). Don't discard it — it contributes \\(0\\) to dot products and \\(0^2\\) to magnitudes, not an error.",
        },
      ],
    },

    // ── ANGLE BETWEEN TWO LINES ──────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-angle-between-lines",
      name: "Angle between two lines",
      visualizationSlug: "angle-between-lines-3d",
      intuition:
        "Two lines (anywhere in space, even skew) make an angle determined entirely by their directions — position is irrelevant. Take the two direction vectors, dot them, and divide by the product of their magnitudes. The **modulus** in the numerator is what forces the ACUTE angle, which is what the question almost always wants.",
      definition:
        "For lines with direction vectors \\(\\vec{d_1} = (a_1, b_1, c_1)\\) and \\(\\vec{d_2} = (a_2, b_2, c_2)\\), the **acute angle** \\(\\theta\\) between them satisfies:\n" +
        "\\[\\cos\\theta = \\frac{|\\vec{d_1}\\cdot\\vec{d_2}|}{|\\vec{d_1}|\\,|\\vec{d_2}|} = \\frac{|a_1a_2 + b_1b_2 + c_1c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\,\\sqrt{a_2^2+b_2^2+c_2^2}}\\]\n" +
        "If the line is given as a join of two points \\(A, B\\), its direction is \\(\\vec{AB} = \\vec{b} - \\vec{a}\\). The **modulus** guarantees \\(\\cos\\theta \\geq 0\\), i.e. the acute angle.",
      formula: {
        label: "Angle between two lines",
        latex:
          "\\cos\\theta = \\frac{|\\vec{d_1}\\cdot\\vec{d_2}|}{|\\vec{d_1}|\\,|\\vec{d_2}|}",
        symbols: [
          { symbol: "\\(\\vec{d_1}, \\vec{d_2}\\)", meaning: "direction vectors of the two lines" },
          { symbol: "\\(|\\cdots|\\) (numerator)", meaning: "modulus — forces the acute angle" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the acute angle between the lines with direction ratios \\((2, -4, 1)\\) and \\((-1, 2, 3)\\).",
        steps: [
          "Dot product: \\((2)(-1) + (-4)(2) + (1)(3) = -2 - 8 + 3 = -7\\).",
          "Magnitudes: \\(\\sqrt{4+16+1} = \\sqrt{21}\\) and \\(\\sqrt{1+4+9} = \\sqrt{14}\\).",
          "\\(\\cos\\theta = \\dfrac{|-7|}{\\sqrt{21}\\,\\sqrt{14}} = \\dfrac{7}{\\sqrt{294}} = \\dfrac{7}{7\\sqrt{6}} = \\dfrac{1}{\\sqrt{6}}\\).",
          "So \\(\\theta = \\cos^{-1}\\left(\\dfrac{1}{\\sqrt{6}}\\right)\\).",
        ],
        answer: "\\(\\theta = \\cos^{-1}\\left(\\dfrac{1}{\\sqrt{6}}\\right)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the acute angle between the line joining \\((2,1,-3)\\) and \\((-3,1,7)\\), and a line with direction ratios \\((3,4,5)\\).",
        steps: [
          "First direction: \\((-3-2,\\,1-1,\\,7-(-3)) = (-5, 0, 10) \\parallel (-1, 0, 2)\\).",
          "Dot with \\((3,4,5)\\): \\((-1)(3) + 0 + (2)(5) = 7\\).",
          "Magnitudes: \\(\\sqrt{1+0+4} = \\sqrt{5}\\) and \\(\\sqrt{9+16+25} = \\sqrt{50}\\); product \\(= \\sqrt{250} = 5\\sqrt{10}\\).",
          "\\(\\cos\\theta = \\dfrac{7}{5\\sqrt{10}}\\).",
        ],
        answer: "\\(\\theta = \\cos^{-1}\\dfrac{7}{5\\sqrt{10}}\\)",
      },
      practiceSet: [
        { prompt: "d.r.s \\((1,0,0)\\) and \\((0,1,0)\\): angle?", answer: "\\(90^\\circ\\)", method: "dot product \\(= 0\\)" },
        { prompt: "Direction of the line joining \\(A(1,2,3)\\), \\(B(4,2,7)\\)?", answer: "\\((3, 0, 4)\\)" },
        { prompt: "\\(\\cos\\theta\\) for d.r.s \\((1,1,1)\\) and \\((1,1,1)\\)?", answer: "\\(1\\)", method: "parallel" },
        { prompt: "Why is the numerator taken in modulus?", answer: "to give the ACUTE angle" },
      ],
      pyqExampleId: "136407ae-2cc8-4797-a604-78bfe474ad93",
      traps: [
        {
          title: "Drop the modulus and you may report the obtuse angle",
          body:
            "A negative dot product (like \\(-7\\)) gives a negative cosine and the obtuse angle. MHT-CET asks for the ACUTE angle — take \\(|\\vec{d_1}\\cdot\\vec{d_2}|\\) so \\(\\cos\\theta\\) is positive.",
        },
        {
          title: "Lines need DIRECTIONS, not points",
          body:
            "When a line is given as a join of two points, first subtract to get \\(\\vec{AB} = \\vec{b}-\\vec{a}\\). Dotting the position vectors instead of the direction is a classic error.",
        },
      ],
    },

    // ── ANGLE BETWEEN TWO PLANES ─────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-angle-between-planes",
      name: "Angle between two planes (and solving for an unknown coefficient)",
      visualizationSlug: "plane-with-normal",
      intuition:
        "The angle between two planes equals the angle between their NORMALS — so it is the same dot-product formula as for two lines, just applied to \\(\\vec{n_1}\\) and \\(\\vec{n_2}\\). When a plane carries an unknown coefficient and the angle is given, you set this formula equal to the given cosine and solve — usually a quadratic in the unknown.",
      definition:
        "For planes \\(A_1x + B_1y + C_1z = d_1\\) and \\(A_2x + B_2y + C_2z = d_2\\) with normals \\(\\vec{n_1}, \\vec{n_2}\\):\n" +
        "\\[\\cos\\theta = \\frac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\,|\\vec{n_2}|}\\]\n" +
        "- **Solve-for-the-unknown:** if one normal has an unknown (say \\(\\alpha\\)) and \\(\\theta\\) is given, equate and square; you usually get a **quadratic in \\(\\alpha\\)** with two roots.\n" +
        "- **Difference of the values:** for a quadratic \\(a\\alpha^2 + b\\alpha + c = 0\\), the gap between the roots is \\(\\dfrac{\\sqrt{b^2 - 4ac}}{|a|}\\) — no need to find each root.",
      formula: {
        label: "Angle between two planes",
        latex:
          "\\cos\\theta = \\frac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}|\\,|\\vec{n_2}|}, \\qquad |\\alpha_1 - \\alpha_2| = \\frac{\\sqrt{b^2 - 4ac}}{|a|}",
        symbols: [
          { symbol: "\\(\\vec{n_1}, \\vec{n_2}\\)", meaning: "normals of the two planes" },
          { symbol: "\\(|\\alpha_1 - \\alpha_2|\\)", meaning: "difference of the two roots of the resulting quadratic" },
        ],
      },
      authoredExample: {
        prompt:
          "The angle between the planes \\(x + y + z = 2\\) and \\(2x - y + \\beta z = 5\\) is \\(\\cos^{-1}\\left(\\frac{1}{\\sqrt{6}}\\right)\\). Find the difference between the two values of \\(\\beta\\).",
        steps: [
          "Normals: \\((1, 1, 1)\\) and \\((2, -1, \\beta)\\). Dot \\(= 2 - 1 + \\beta = 1 + \\beta\\); magnitudes \\(\\sqrt{3}\\) and \\(\\sqrt{5 + \\beta^2}\\).",
          "Set up: \\(\\dfrac{|1 + \\beta|}{\\sqrt{3}\\,\\sqrt{5 + \\beta^2}} = \\dfrac{1}{\\sqrt{6}}\\).",
          "Square: \\(\\dfrac{(1 + \\beta)^2}{3(5 + \\beta^2)} = \\dfrac{1}{6} \\Rightarrow 2(1 + \\beta)^2 = 5 + \\beta^2 \\Rightarrow \\beta^2 + 4\\beta - 3 = 0\\).",
          "Difference of roots: \\(\\dfrac{\\sqrt{4^2 - 4(1)(-3)}}{1} = \\sqrt{28} = 2\\sqrt{7}\\).",
        ],
        answer: "\\(|\\beta_1 - \\beta_2| = 2\\sqrt{7}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the acute angle between the planes \\(2x + y - 2z = 5\\) and \\(x + 2y + 2z = 3\\).",
        steps: [
          "Normals: \\((2, 1, -2)\\) and \\((1, 2, 2)\\); both have magnitude \\(3\\).",
          "Dot: \\((2)(1) + (1)(2) + (-2)(2) = 2 + 2 - 4 = 0\\).",
          "\\(\\cos\\theta = \\dfrac{|0|}{3\\cdot 3} = 0\\), so \\(\\theta = 90^\\circ\\): the planes are perpendicular.",
        ],
        answer: "\\(\\theta = 90^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Angle between planes uses the angle between which vectors?", answer: "their normals" },
        { prompt: "Planes \\(x+y+z=1\\) and \\(x+y+z=9\\): angle?", answer: "\\(0^\\circ\\)", method: "parallel normals" },
        { prompt: "\\(\\cos\\theta\\) for normals \\((1,0,0)\\) and \\((1,1,0)\\)?", answer: "\\(\\tfrac{1}{\\sqrt{2}}\\)", method: "\\(45^\\circ\\)" },
        { prompt: "Difference of roots of \\(55\\alpha^2 - 392\\alpha + 681 = 0\\)?", answer: "\\(\\tfrac{62}{55}\\)" },
      ],
      pyqExampleId: "d7c19d54-34e6-4af5-bd58-28ff04740ccb",
      traps: [
        {
          title: "Plane angle uses normals, not the plane's 'direction'",
          body:
            "A plane has no single direction — it is fixed by its normal. Equating the angle to \\(\\cos^{-1}\\) of a dot of in-plane vectors is wrong; always dot \\(\\vec{n_1}\\cdot\\vec{n_2}\\).",
        },
        {
          title: "The question may want the DIFFERENCE of roots, not a root",
          body:
            "Squaring the angle equation gives a quadratic with two valid \\(\\alpha\\). Use \\(\\dfrac{\\sqrt{b^2-4ac}}{|a|}\\) for the gap — solving each root separately wastes time and invites sign slips.",
        },
      ],
    },

    // ── ANGLE BETWEEN A LINE AND A PLANE ─────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-angle-line-plane",
      name: "Angle between a line and a plane (the solve-for-lambda variant)",
      visualizationSlug: "plane-with-normal",
      intuition:
        "The angle between a line and a plane is the COMPLEMENT of the angle between the line and the plane's normal — which is why it uses **sine**, not cosine. Dot the line's direction with the plane's normal: \\(\\sin\\theta = \\frac{|\\vec{d}\\cdot\\vec{n}|}{|\\vec{d}|\\,|\\vec{n}|}\\). The MHT-CET hands you \\(\\theta\\) (often as \\(\\sin\\theta\\) or a \\(\\cos^{-1}\\) you convert) and asks for the unknown \\(\\lambda\\) inside the normal.",
      definition:
        "For a line with direction \\(\\vec{d}\\) and a plane with normal \\(\\vec{n}\\), the line–plane angle \\(\\theta\\) is:\n" +
        "\\[\\sin\\theta = \\frac{|\\vec{d}\\cdot\\vec{n}|}{|\\vec{d}|\\,|\\vec{n}|}\\]\n" +
        "- **Why sine:** the line makes angle \\((90^\\circ - \\theta)\\) with the normal, and \\(\\cos(90^\\circ - \\theta) = \\sin\\theta\\).\n" +
        "- **Convert a given \\(\\cos^{-1}\\):** if \\(\\theta = \\cos^{-1}\\!\\left(\\tfrac{2\\sqrt2}{3}\\right)\\), then \\(\\sin\\theta = \\sqrt{1 - \\tfrac{8}{9}} = \\tfrac{1}{3}\\) — plug that into the formula.\n" +
        "- **Solve:** set the formula equal to \\(\\sin\\theta\\), square, and solve the resulting equation for \\(\\lambda\\).",
      formula: {
        label: "Angle between a line and a plane",
        latex:
          "\\sin\\theta = \\frac{|\\vec{d}\\cdot\\vec{n}|}{|\\vec{d}|\\,|\\vec{n}|}",
        symbols: [
          { symbol: "\\(\\vec{d}\\)", meaning: "direction vector of the line" },
          { symbol: "\\(\\vec{n}\\)", meaning: "normal of the plane" },
          { symbol: "\\(\\sin\\theta\\)", meaning: "sine (NOT cosine) — angle is with the plane, not the normal" },
        ],
      },
      authoredExample: {
        prompt:
          "The angle \\(\\theta\\) between the line \\(\\dfrac{x-3}{2} = \\dfrac{y}{-1} = \\dfrac{z+5}{2}\\) and the plane \\(x + 2y + \\sqrt{\\lambda}\\,z = 9\\) satisfies \\(\\sin\\theta = \\dfrac{\\sqrt{2}}{3}\\). Find \\(\\lambda\\).",
        steps: [
          "Line direction \\(\\vec{d} = (2, -1, 2)\\), \\(|\\vec{d}| = 3\\); plane normal \\(\\vec{n} = (1, 2, \\sqrt{\\lambda})\\), \\(|\\vec{n}| = \\sqrt{5 + \\lambda}\\).",
          "Dot: \\((2)(1) + (-1)(2) + (2)\\sqrt{\\lambda} = 2\\sqrt{\\lambda}\\).",
          "\\(\\sin\\theta = \\dfrac{2\\sqrt{\\lambda}}{3\\sqrt{5 + \\lambda}} = \\dfrac{\\sqrt{2}}{3}\\); square: \\(\\dfrac{4\\lambda}{9(5 + \\lambda)} = \\dfrac{2}{9}\\).",
          "\\(4\\lambda = 2(5 + \\lambda) \\Rightarrow 2\\lambda = 10 \\Rightarrow \\lambda = 5\\).",
        ],
        answer: "\\(\\lambda = 5\\)",
      },
      selfCheckExample: {
        prompt:
          "The angle between the line \\(\\dfrac{x+1}{2} = \\dfrac{y-2}{1} = \\dfrac{z-3}{-2}\\) and the plane \\(x - 2y - \\lambda z = 3\\) is \\(\\cos^{-1}\\!\\left(\\tfrac{2\\sqrt2}{3}\\right)\\). Find \\(\\lambda\\).",
        steps: [
          "Convert: \\(\\sin\\theta = \\sqrt{1 - \\tfrac{8}{9}} = \\tfrac{1}{3}\\).",
          "\\(\\vec{d} = (2, 1, -2)\\), \\(|\\vec{d}| = 3\\); \\(\\vec{n} = (1, -2, -\\lambda)\\), \\(|\\vec{n}| = \\sqrt{5 + \\lambda^2}\\). Dot \\(= 2 - 2 + 2\\lambda = 2\\lambda\\).",
          "\\(\\dfrac{|2\\lambda|}{3\\sqrt{5 + \\lambda^2}} = \\dfrac{1}{3} \\Rightarrow 4\\lambda^2 = 5 + \\lambda^2 \\Rightarrow \\lambda^2 = \\dfrac{5}{3}\\).",
          "\\(\\lambda = \\sqrt{\\dfrac{5}{3}}\\).",
        ],
        answer: "\\(\\lambda = \\sqrt{\\dfrac{5}{3}}\\)",
      },
      practiceSet: [
        { prompt: "Line–plane angle uses sine or cosine of \\(\\vec{d}\\cdot\\vec{n}\\)?", answer: "sine" },
        { prompt: "If \\(\\theta = \\cos^{-1}\\tfrac{2\\sqrt2}{3}\\), then \\(\\sin\\theta = ?\\)", answer: "\\(\\tfrac{1}{3}\\)" },
        { prompt: "A line lies IN a plane — its angle with the plane is?", answer: "\\(0^\\circ\\)" },
        { prompt: "If \\(\\vec{d}\\parallel\\vec{n}\\), the line–plane angle is?", answer: "\\(90^\\circ\\)", method: "line is perpendicular to the plane" },
      ],
      pyqExampleId: "83523e99-2225-492c-9c43-ff63223eaae4",
      traps: [
        {
          title: "Use SINE for line–plane, COSINE for line–line and plane–plane",
          body:
            "The single most common error here: writing \\(\\cos\\theta = \\frac{|\\vec{d}\\cdot\\vec{n}|}{|\\vec{d}||\\vec{n}|}\\). The line–plane angle is the complement of the line–normal angle, so the dot-product ratio equals \\(\\sin\\theta\\), not \\(\\cos\\theta\\).",
        },
        {
          title: "Convert a \\(\\cos^{-1}\\) given-angle to \\(\\sin\\theta\\) first",
          body:
            "If the question states the angle as \\(\\cos^{-1}(k)\\), you need \\(\\sin\\theta = \\sqrt{1-k^2}\\) before substituting, because the formula carries \\(\\sin\\theta\\). Plugging \\(k\\) straight in gives the wrong \\(\\lambda\\).",
        },
      ],
    },

    // ── PARALLEL & PERPENDICULAR CONDITIONS ──────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-parallel-perp-conditions",
      name: "Parallel and perpendicular conditions (lines, and line-parallel-to-plane)",
      intuition:
        "When the question says \"perpendicular\" or \"parallel\" instead of giving a numeric angle, you don't need the full formula — just the dot product. Perpendicular ⟹ dot \\(= 0\\); parallel ⟹ direction ratios proportional. For a line PARALLEL to a plane, the line's direction is perpendicular to the plane's normal, so \\(\\vec{d}\\cdot\\vec{n} = 0\\) — the same trick.",
      definition:
        "Three conditions, all from one idea (perpendicular ⟺ dot product zero):\n" +
        "- **Two lines perpendicular:** \\(\\vec{d_1}\\cdot\\vec{d_2} = a_1a_2 + b_1b_2 + c_1c_2 = 0\\).\n" +
        "- **Two lines parallel:** \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\) (proportional d.r.s).\n" +
        "- **Line parallel to a plane:** the line's direction lies IN the plane, so it is perpendicular to the normal: \\(\\vec{d}\\cdot\\vec{n} = 0\\). (For a point \\(P\\) off the line and \\(Q\\) on it, \\(\\vec{PQ}\\) parallel to the plane likewise needs \\(\\vec{PQ}\\cdot\\vec{n} = 0\\).)\n\n" +
        "**Solve-for-the-unknown:** when a coefficient \\(p\\) or parameter \\(\\mu\\) appears, the single equation \\(\\vec{d_1}\\cdot\\vec{d_2} = 0\\) (or \\(\\vec{PQ}\\cdot\\vec{n} = 0\\)) is linear — solve directly.",
      formula: {
        label: "Perpendicular / parallel conditions",
        latex:
          "\\vec{d_1}\\cdot\\vec{d_2} = 0 \\;\\text{(}\\perp\\text{)}, \\qquad \\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2} \\;\\text{(}\\parallel\\text{)}, \\qquad \\vec{d}\\cdot\\vec{n} = 0 \\;\\text{(line}\\parallel\\text{plane)}",
        symbols: [
          { symbol: "\\(\\vec{d_1}\\cdot\\vec{d_2} = 0\\)", meaning: "two lines are perpendicular" },
          { symbol: "\\(\\vec{d}\\cdot\\vec{n} = 0\\)", meaning: "line (or \\(\\vec{PQ}\\)) parallel to the plane" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(P(2,3,6)\\) and let \\(Q\\) lie on \\(\\vec{r} = (\\hat{i} - \\hat{j} + 2\\hat{k}) + \\mu(-3\\hat{i} + \\hat{j} + 5\\hat{k})\\). Find \\(\\mu\\) so that \\(\\vec{PQ}\\) is parallel to the plane \\(x - 4y + 4z = 1\\).",
        steps: [
          "\\(Q = (1 - 3\\mu,\\ -1 + \\mu,\\ 2 + 5\\mu)\\), so \\(\\vec{PQ} = Q - P = (-1 - 3\\mu,\\ -4 + \\mu,\\ -4 + 5\\mu)\\).",
          "Parallel to plane ⟹ \\(\\vec{PQ}\\cdot\\vec{n} = 0\\) with \\(\\vec{n} = (1, -4, 4)\\).",
          "\\((-1 - 3\\mu) - 4(-4 + \\mu) + 4(-4 + 5\\mu) = 0\\).",
          "\\(-1 - 3\\mu + 16 - 4\\mu - 16 + 20\\mu = 0 \\Rightarrow 13\\mu - 1 = 0 \\Rightarrow \\mu = \\dfrac{1}{13}\\).",
        ],
        answer: "\\(\\mu = \\dfrac{1}{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "If the lines \\(\\dfrac{1-x}{3} = \\dfrac{7y-14}{2p} = \\dfrac{z-3}{2}\\) and \\(\\dfrac{7-7x}{3p} = \\dfrac{y-5}{1} = \\dfrac{6-z}{5}\\) are at right angles, find \\(p\\).",
        steps: [
          "Rewrite to standard form. First line d.r.s: \\(\\left(-3,\\ \\tfrac{2p}{7},\\ 2\\right)\\) (the \\(7y-14 = 7(y-2)\\) gives the \\(y\\)-ratio \\(\\tfrac{2p}{7}\\)).",
          "Second line d.r.s: \\(\\left(-\\tfrac{3p}{7},\\ 1,\\ -5\\right)\\).",
          "Perpendicular ⟹ dot \\(= 0\\): \\((-3)\\!\\left(-\\tfrac{3p}{7}\\right) + \\tfrac{2p}{7}(1) + (2)(-5) = 0\\).",
          "\\(\\dfrac{9p}{7} + \\dfrac{2p}{7} - 10 = 0 \\Rightarrow \\dfrac{11p}{7} = 10 \\Rightarrow p = \\dfrac{70}{11}\\).",
        ],
        answer: "\\(p = \\dfrac{70}{11}\\)",
      },
      practiceSet: [
        { prompt: "d.r.s \\((1,2,-1)\\) and \\((3,k,1)\\) perpendicular: find \\(k\\).", answer: "\\(k = -1\\)", method: "\\(3 + 2k - 1 = 0\\)" },
        { prompt: "Is \\((2,4,6)\\) parallel to \\((1,2,3)\\)?", answer: "Yes", method: "ratios all \\(=2\\)" },
        { prompt: "Line direction \\((1,1,1)\\), plane normal \\((1,-1,0)\\): is the line parallel to the plane?", answer: "Yes", method: "\\(\\vec{d}\\cdot\\vec{n} = 0\\)" },
        { prompt: "Condition for \\(\\vec{PQ}\\) parallel to a plane with normal \\(\\vec{n}\\)?", answer: "\\(\\vec{PQ}\\cdot\\vec{n} = 0\\)" },
      ],
      pyqExampleId: "b8c06071-09a2-41ae-b49f-9bd03b3a48b8",
      traps: [
        {
          title: "Line PARALLEL to a plane means direction ⟂ NORMAL",
          body:
            "Parallel-to-the-plane is a perpendicularity in disguise: the line's direction sits inside the plane, hence \\(\\vec{d}\\cdot\\vec{n} = 0\\). Students wrongly set \\(\\vec{d}\\parallel\\vec{n}\\) (that would make the line perpendicular to the plane).",
        },
        {
          title: "Normalise messy ratios before dotting",
          body:
            "A term like \\(\\dfrac{7y-14}{2p}\\) is \\(\\dfrac{y-2}{2p/7}\\): the \\(y\\)-direction ratio is \\(\\tfrac{2p}{7}\\), not \\(2p\\). And \\(\\dfrac{6-z}{5} = \\dfrac{z-6}{-5}\\) flips the sign. Convert each fraction to \\(\\dfrac{x-x_1}{a}\\) form first.",
        },
      ],
    },

    // ── LINE LIES IN A PLANE ─────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-in-plane",
      name: "Line lies in a plane (two conditions, solve the unknowns)",
      intuition:
        "This is the single biggest cluster in the subtopic. A line lies entirely in a plane only when BOTH hold: (1) a point of the line is on the plane, and (2) the line's direction is perpendicular to the plane's normal. Two conditions ⟹ you can pin down two unknowns (or one, with the other equation as a check).",
      definition:
        "A line \\(\\dfrac{x-x_1}{a} = \\dfrac{y-y_1}{b} = \\dfrac{z-z_1}{c}\\) lies in the plane \\(Ax + By + Cz = d\\) iff:\n" +
        "- **Point on plane:** \\((x_1, y_1, z_1)\\) satisfies \\(Ax_1 + By_1 + Cz_1 = d\\).\n" +
        "- **Direction perpendicular to normal:** \\(\\vec{d}\\cdot\\vec{n} = aA + bB + cC = 0\\).\n\n" +
        "**Single-unknown version:** if only the line's point carries an unknown \\(m\\) (and the direction already satisfies condition 2), the point-on-plane equation alone gives \\(m\\). **Two-unknown version:** the two conditions form a linear system in (say) \\(l, m\\); solve for both, then read off whatever the question asks (e.g. \\(l^2 + m^2\\)).",
      formula: {
        label: "Line-lies-in-plane conditions",
        latex:
          "Ax_1 + By_1 + Cz_1 = d \\quad \\text{and} \\quad aA + bB + cC = 0",
        symbols: [
          { symbol: "\\((x_1, y_1, z_1)\\)", meaning: "a point on the line — must lie on the plane" },
          { symbol: "\\((a, b, c)\\)", meaning: "line direction — must be \\(\\perp\\) the normal \\((A,B,C)\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "If the line \\(\\dfrac{x-1}{3} = \\dfrac{y-2}{2} = \\dfrac{z+1}{1}\\) lies in the plane \\(lx + my - z = 4\\), find \\(l^2 + m^2\\).",
        steps: [
          "Direction \\((3, 2, 1)\\) perpendicular to normal \\((l, m, -1)\\): \\(3l + 2m - 1 = 0\\).",
          "Point \\((1, 2, -1)\\) on plane: \\(l + 2m - (-1) = 4 \\Rightarrow l + 2m = 3\\).",
          "Subtract the second from the first: \\((3l + 2m) - (l + 2m) = 1 - 3 \\Rightarrow 2l = -2 \\Rightarrow l = -1\\); then \\(m = \\tfrac{3 - l}{2} = 2\\).",
          "\\(l^2 + m^2 = (-1)^2 + 2^2 = 5\\).",
        ],
        answer: "\\(l^2 + m^2 = 5\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\(m\\) such that \\(\\dfrac{x-4}{1} = \\dfrac{y-2}{1} = \\dfrac{z-m}{2}\\) lies in the plane \\(2x - 4y + z = 7\\).",
        steps: [
          "Direction \\((1, 1, 2)\\) ⟂ normal \\((2, -4, 1)\\): \\(2 - 4 + 2 = 0\\) ✓ (condition 2 holds automatically).",
          "Point \\((4, 2, m)\\) on plane: \\(2(4) - 4(2) + m = 7 \\Rightarrow 8 - 8 + m = 7\\).",
          "\\(m = 7\\).",
        ],
        answer: "\\(m = 7\\)",
      },
      practiceSet: [
        { prompt: "How many conditions for a line to LIE in a plane?", answer: "two (point on plane AND direction ⟂ normal)" },
        { prompt: "Line direction \\((1,1,2)\\), plane normal \\((2,-4,1)\\): is direction ⟂ normal?", answer: "Yes", method: "\\(2-4+2 = 0\\)" },
        { prompt: "Point \\((4,2,5)\\) on plane \\(2x - 5y + 2z = 7\\)?", answer: "No", method: "\\(8 - 10 + 10 = 8 \\ne 7\\)" },
        { prompt: "If only the line's z-intercept \\(m\\) is unknown, which condition finds it?", answer: "point-on-plane" },
      ],
      pyqExampleId: "a1f7c5d6-67ca-42bc-9e40-e30a8d06964d",
      traps: [
        {
          title: "BOTH conditions are required — one is not enough",
          body:
            "A point on the plane only puts ONE point of the line there; without \\(\\vec{d}\\cdot\\vec{n} = 0\\) the line would pierce the plane. Conversely \\(\\vec{d}\\cdot\\vec{n} = 0\\) alone only makes the line parallel to the plane (possibly floating above it). You need both.",
        },
        {
          title: "Read the point off the numerators correctly",
          body:
            "For \\(\\dfrac{z-m}{2}\\) the point's \\(z\\)-coordinate is \\(+m\\), but for \\(\\dfrac{z+m}{2}\\) it is \\(-m\\) — the sign flips the answer (\\(m = 7\\) vs \\(m = -7\\)). Similarly \\(\\dfrac{2z-m}{3}\\) means \\(z = \\tfrac{m}{2}\\), not \\(z = m\\).",
        },
      ],
    },

    // ── DIRECTION-COSINE SYSTEMS ─────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-direction-angle-systems",
      name: "Direction-cosine systems and equal-angle lines",
      visualizationSlug: "direction-cosines",
      intuition:
        "Two flavours that both lean on \\(l^2 + m^2 + n^2 = 1\\). (1) A line making EQUAL angles with two axes, plus a known angle with the third — use the identity to find the missing angle. (2) A pair of lines whose direction cosines satisfy a LINEAR constraint and a QUADRATIC constraint — eliminate one variable, get two direction sets, then find the angle between them.",
      definition:
        "- **Equal-angle line:** if a line makes \\(45^\\circ\\) with the \\(x\\)-axis and equal angles \\(\\beta\\) with \\(y\\)- and \\(z\\)-axes, then \\(\\cos^2 45^\\circ + 2\\cos^2\\beta = 1 \\Rightarrow \\cos^2\\beta = \\tfrac{1}{4} \\Rightarrow \\beta = 60^\\circ\\). The sum of the three angles is then \\(45^\\circ + 60^\\circ + 60^\\circ = 165^\\circ\\).\n" +
        "- **Two-constraint system:** given \\(l + m + n = 0\\) (linear) and a quadratic like \\(2l^2 + m^2 - n^2 = 0\\): substitute \\(n = -(l+m)\\) into the quadratic, factor to get two direction sets, then apply the line–line angle formula \\(\\cos\\theta = \\dfrac{|l_1l_2 + m_1m_2 + n_1n_2|}{1\\cdot 1}\\) (d.c.s are already unit).",
      formula: {
        label: "Direction-cosine identity",
        latex:
          "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1, \\qquad \\cos\\theta = |l_1l_2 + m_1m_2 + n_1n_2|",
        symbols: [
          { symbol: "\\(\\alpha, \\beta, \\gamma\\)", meaning: "angles the line makes with the \\(x, y, z\\) axes" },
          { symbol: "\\((l_i, m_i, n_i)\\)", meaning: "direction cosines (unit) of the two lines" },
        ],
      },
      authoredExample: {
        prompt:
          "A line makes \\(45^\\circ\\) with the positive \\(x\\)-axis and equal angles with the positive \\(y\\)- and \\(z\\)-axes. Find the SUM of the three angles it makes with the axes.",
        steps: [
          "Let the equal \\(y\\)- and \\(z\\)-angles be \\(\\beta\\). Use \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\) with \\(\\alpha = 45^\\circ\\) and \\(\\beta = \\gamma\\): \\(\\cos^2 45^\\circ + 2\\cos^2\\beta = 1\\).",
          "\\(\\tfrac{1}{2} + 2\\cos^2\\beta = 1 \\Rightarrow \\cos^2\\beta = \\tfrac{1}{4} \\Rightarrow \\cos\\beta = \\tfrac{1}{2} \\Rightarrow \\beta = 60^\\circ\\).",
          "Sum of the three angles \\(= 45^\\circ + 60^\\circ + 60^\\circ = 165^\\circ\\).",
        ],
        answer: "\\(165^\\circ\\)",
      },
      selfCheckExample: {
        prompt:
          "The direction cosines \\(l, m, n\\) of two lines satisfy \\(l + m + n = 0\\) and \\(l^2 + m^2 - n^2 = 0\\). Find the angle between the two lines.",
        steps: [
          "From the linear equation, \\(n = -(l + m)\\); substitute into the quadratic: \\(l^2 + m^2 - (l + m)^2 = 0\\).",
          "Expand: \\(l^2 + m^2 - l^2 - 2lm - m^2 = -2lm = 0 \\Rightarrow lm = 0\\), so \\(l = 0\\) or \\(m = 0\\).",
          "Case \\(l = 0\\): \\(n = -m\\), direction \\((0, 1, -1)\\). Case \\(m = 0\\): \\(n = -l\\), direction \\((1, 0, -1)\\).",
          "Line–line angle: \\(\\cos\\theta = \\dfrac{|(0)(1) + (1)(0) + (-1)(-1)|}{\\sqrt{0+1+1}\\,\\sqrt{1+0+1}} = \\dfrac{1}{2}\\), so \\(\\theta = 60^\\circ\\).",
        ],
        answer: "\\(\\theta = 60^\\circ\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = ?\\)", answer: "\\(1\\)" },
        { prompt: "Line makes \\(60^\\circ\\) with \\(x\\) and \\(60^\\circ\\) with \\(y\\): angle with \\(z\\)?", answer: "\\(45^\\circ\\)", method: "\\(\\cos^2\\gamma = 1 - \\tfrac14 - \\tfrac14 = \\tfrac12\\)" },
        { prompt: "Angle between unit d.c. directions \\((0,1,-1)/\\sqrt2\\) and \\((2,1,-3)/\\sqrt{14}\\) uses which formula?", answer: "\\(\\cos\\theta = |l_1l_2 + m_1m_2 + n_1n_2|\\)" },
        { prompt: "In \\(l + m + n = 0\\), express \\(n\\).", answer: "\\(n = -(l+m)\\)" },
      ],
      pyqExampleId: "42c20362-6825-440e-bb72-454f8d272202",
      traps: [
        {
          title: "Use the identity \\(\\sum\\cos^2 = 1\\), not \\(\\sum\\cos = 1\\)",
          body:
            "Direction cosines square-sum to 1, they do not add to 1. For an equal-angle line, set \\(\\cos^2\\alpha + 2\\cos^2\\beta = 1\\) — squaring the cosines is essential.",
        },
        {
          title: "A two-constraint system gives TWO directions — find the angle BETWEEN them",
          body:
            "Solving \\(l + m + n = 0\\) with a quadratic yields two factor cases, i.e. two distinct lines. The question wants the angle between THOSE two, computed with the line–line formula — not a single direction.",
        },
      ],
    },

    // ── LINE OF INTERSECTION & AXIS ──────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-of-intersection-axis",
      name: "Line of intersection of two planes, and its angle with an axis",
      visualizationSlug: "plane-with-normal",
      intuition:
        "Where two planes meet is a line, and that line runs perpendicular to BOTH normals — so its direction is the cross product \\(\\vec{n_1}\\times\\vec{n_2}\\). Once you have that direction, the angle it makes with a coordinate axis (giving \\(\\sec\\alpha\\), \\(\\cos\\alpha\\), etc.) is just the line–line angle with the axis's unit vector.",
      definition:
        "For planes with normals \\(\\vec{n_1}, \\vec{n_2}\\):\n" +
        "- **Direction of the line of intersection:** \\(\\vec{d} = \\vec{n_1}\\times\\vec{n_2}\\).\n" +
        "- **Angle with an axis:** the \\(x\\)-axis has direction \\((1, 0, 0)\\), so \\(\\cos\\alpha = \\dfrac{|d_1|}{|\\vec{d}|}\\) (first component over magnitude); then \\(\\sec\\alpha = \\dfrac{1}{\\cos\\alpha}\\).\n" +
        "- **Plane parallel to two vectors:** if a plane is parallel to \\(\\vec{u}\\) and \\(\\vec{v}\\), its normal is \\(\\vec{u}\\times\\vec{v}\\); the line common to two such planes is the cross product of the two normals.",
      formula: {
        label: "Line of intersection",
        latex:
          "\\vec{d} = \\vec{n_1}\\times\\vec{n_2}, \\qquad \\cos\\alpha = \\frac{|\\vec{d}\\cdot\\hat{x}|}{|\\vec{d}|}",
        symbols: [
          { symbol: "\\(\\vec{n_1}\\times\\vec{n_2}\\)", meaning: "direction of the line where the planes meet" },
          { symbol: "\\(\\hat{x}\\)", meaning: "unit vector along the axis, e.g. \\((1,0,0)\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Line \\(L\\) is the intersection of \\(x + y - z = 3\\) and \\(2x - y + z = 1\\). If \\(L\\) makes angle \\(\\alpha\\) with the positive \\(y\\)-axis, find \\(\\cos\\alpha\\).",
        steps: [
          "Direction \\(\\vec{d} = (1, 1, -1)\\times(2, -1, 1)\\).",
          "Cross product: \\(\\big((1)(1) - (-1)(-1),\\ (-1)(2) - (1)(1),\\ (1)(-1) - (1)(2)\\big) = (0, -3, -3) \\parallel (0, 1, 1)\\).",
          "Angle with the \\(y\\)-axis uses the second component: \\(\\cos\\alpha = \\dfrac{|1|}{\\sqrt{0 + 1 + 1}} = \\dfrac{1}{\\sqrt{2}}\\).",
          "So \\(\\alpha = 45^\\circ\\).",
        ],
        answer: "\\(\\cos\\alpha = \\dfrac{1}{\\sqrt{2}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Line \\(L\\) is the intersection of the planes \\(x + 2y + z = 4\\) and \\(2x + y - z = 2\\). If \\(L\\) makes angle \\(\\gamma\\) with the positive \\(z\\)-axis, find \\(\\cos\\gamma\\).",
        steps: [
          "Direction \\(\\vec{d} = (1, 2, 1)\\times(2, 1, -1)\\).",
          "Cross product: \\(\\big((2)(-1) - (1)(1),\\ (1)(2) - (1)(-1),\\ (1)(1) - (2)(2)\\big) = (-3, 3, -3) \\parallel (1, -1, 1)\\).",
          "Angle with the \\(z\\)-axis uses the third component: \\(\\cos\\gamma = \\dfrac{|1|}{\\sqrt{1 + 1 + 1}} = \\dfrac{1}{\\sqrt{3}}\\).",
        ],
        answer: "\\(\\cos\\gamma = \\dfrac{1}{\\sqrt{3}}\\)",
      },
      practiceSet: [
        { prompt: "Direction of the line where planes with normals \\(\\vec{n_1}, \\vec{n_2}\\) meet?", answer: "\\(\\vec{n_1}\\times\\vec{n_2}\\)" },
        { prompt: "\\((2,3,1)\\times(1,3,2)\\) simplifies (parallel) to?", answer: "\\((1, -1, 1)\\)" },
        { prompt: "Line direction \\((1,-1,1)\\): \\(\\cos\\alpha\\) with the \\(x\\)-axis?", answer: "\\(\\tfrac{1}{\\sqrt3}\\)" },
        { prompt: "If \\(\\cos\\alpha = \\tfrac{1}{\\sqrt3}\\), then \\(\\sec\\alpha = ?\\)", answer: "\\(\\sqrt3\\)" },
      ],
      pyqExampleId: "5fc5e9c6-a624-47dc-a445-4c0b7f7d2fb3",
      traps: [
        {
          title: "The intersection direction is the CROSS product of the normals",
          body:
            "The line lies in both planes, so it is perpendicular to both normals — that is exactly \\(\\vec{n_1}\\times\\vec{n_2}\\). Using \\(\\vec{n_1} + \\vec{n_2}\\) or a dot product instead gives a meaningless direction.",
        },
        {
          title: "Plane 'parallel to two vectors' ⟹ normal is THEIR cross product",
          body:
            "When a plane is described by two vectors it contains, the normal is their cross product first; only then cross the two normals to get the common line. Skipping the inner cross product is the usual slip in the multi-plane variant.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Lines and planes — equations and forms",
      href: "/notes/mht-cet-maths/line-and-plane",
    },
    {
      label: "Vectors — dot and cross product",
      href: "/notes/mht-cet-maths/vectors",
    },
  ],
};
