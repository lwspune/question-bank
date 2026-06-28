import type { SubtopicNote } from "@/app/notes/_types";

export const PLANE_EQUATION_NOTE: SubtopicNote = {
  subtopicName: "Plane — Equation, Normal, and Construction",
  title: "Plane — Equation, Normal, and Construction",
  oneLineDefinition:
    "How to write the equation of a plane from whatever the question hands you — a point and a normal, three points, two lines or two planes it must respect — by always first nailing the normal vector, plus the family-of-planes lambda trick for planes through an intersection line.",
  whyItMatters:
    "This is the densest scoring subtopic in Line and Plane: roughly 36 PYQs, MODERATE-to-HARD, and the templates repeat hard — the 'plane through a point parallel to two lines' and the 'plane through an intersection line with a side condition' shapes each recur three or four times across 2023-2025. " +
    "Almost every question reduces to ONE move: find the normal vector, then write n-dot-(r minus a) = 0. The normal comes either from a cross product (two directions the plane must contain) or from a family-of-planes lambda solved against a perpendicularity or parallelism condition. " +
    "Learn those two engines — the cross-product normal and the lambda family — and the rest (intercepts, foot of perpendicular, mirror image) is bookkeeping.",
  concepts: [
    // ── FOUNDATION 1 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-forms-overview",
      name: "Equation of a plane and its normal",
      intuition:
        "A plane is fixed by ONE point on it plus a direction perpendicular to it — the normal vector. Every plane equation, no matter how it is dressed up, is just \"the normal dotted with the displacement from a known point is zero.\" Read the coefficients of \\(x, y, z\\) and you have read off the normal.",
      definition:
        "A plane in space has three equivalent forms:\n" +
        "- **Cartesian form:** \\(ax + by + cz = d\\). The coefficients give the **normal vector** \\(\\vec{n} = a\\hat{i} + b\\hat{j} + c\\hat{k}\\).\n" +
        "- **Vector form:** \\(\\vec{r}\\cdot\\vec{n} = d\\), where \\(\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}\\) is the position vector of a general point.\n" +
        "- **Point-normal form:** through a point \\(A(x_0,y_0,z_0)\\) with normal \\(\\vec{n} = (a,b,c)\\): \\(a(x-x_0) + b(y-y_0) + c(z-z_0) = 0\\).\n\n" +
        "**Two planes are parallel** when their normals are parallel (proportional coefficients). **Two planes are perpendicular** when their normals are perpendicular: \\(\\vec{n_1}\\cdot\\vec{n_2} = 0\\).",
      formula: {
        label: "The three equivalent forms",
        latex:
          "ax + by + cz = d \\;\\Longleftrightarrow\\; \\vec{r}\\cdot\\vec{n} = d \\;\\Longleftrightarrow\\; \\vec{n}\\cdot(\\vec{r} - \\vec{a}) = 0",
        symbols: [
          { symbol: "\\(\\vec{n} = (a,b,c)\\)", meaning: "normal — the coefficients of \\(x, y, z\\)" },
          { symbol: "\\(\\vec{a}\\)", meaning: "position vector of a known point on the plane" },
          { symbol: "\\(d\\)", meaning: "constant, fixed by substituting the known point" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the equation of the plane through \\(A(2,-1,3)\\) with normal \\(\\vec{n} = \\hat{i} + 4\\hat{j} - 2\\hat{k}\\).",
        steps: [
          "Point-normal form: \\(1(x-2) + 4(y+1) - 2(z-3) = 0\\).",
          "Expand: \\(x - 2 + 4y + 4 - 2z + 6 = 0\\).",
          "Collect: \\(x + 4y - 2z + 8 = 0\\).",
        ],
        answer: "\\(x + 4y - 2z + 8 = 0\\)",
      },
      practiceSet: [
        { prompt: "Normal of the plane \\(3x - y + 5z = 7\\)?", answer: "\\((3, -1, 5)\\)" },
        { prompt: "Are \\(2x + y - z = 1\\) and \\(4x + 2y - 2z = 9\\) parallel?", answer: "Yes", method: "normals are proportional \\(2:1:-1\\)" },
        { prompt: "Is \\(\\vec{n_1} = (1,2,1)\\) perpendicular to \\(\\vec{n_2} = (1,-1,1)\\)?", answer: "Yes", method: "\\(1-2+1 = 0\\)" },
        { prompt: "Plane through \\((0,0,0)\\) with normal \\((1,1,1)\\)?", answer: "\\(x + y + z = 0\\)" },
      ],
      traps: [
        {
          title: "The normal is the coefficient triple, not the point",
          body:
            "In \\(ax+by+cz=d\\) the normal is \\((a,b,c)\\). Students sometimes grab the point's coordinates as the normal — those only fix \\(d\\). Read direction from the coefficients, position from the given point.",
        },
        {
          title: "\\(d\\) is found by substituting, never left at the wrong sign",
          body:
            "After \\(a(x-x_0)+b(y-y_0)+c(z-z_0)=0\\), expand fully before reading \\(d\\). A sign slip on \\(-bx_0\\) etc. flips the constant — the most common reason a correct normal still lands on the wrong option.",
        },
      ],
    },

    // ── FOUNDATION 2 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-normal-direction-cosines",
      name: "Direction cosines of the normal",
      visualizationSlug: "direction-cosines",
      intuition:
        "The angles a normal makes with the three axes are not free — their cosines must square-sum to 1. So if a question gives you two of the angles, the third is forced (up to sign), and that pins the normal direction completely.",
      definition:
        "If a normal \\(\\vec{n}\\) makes angles \\(\\alpha, \\beta, \\gamma\\) with the \\(X, Y, Z\\) axes, its **direction cosines** \\(\\cos\\alpha, \\cos\\beta, \\cos\\gamma\\) satisfy:\n" +
        "\\[\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\]\n" +
        "A normal **equally inclined** to all three axes has \\(\\cos\\alpha = \\cos\\beta = \\cos\\gamma\\), so each \\(= \\pm\\tfrac{1}{\\sqrt 3}\\) and the direction is \\((1,1,1)\\). The word **acute** picks the positive root.",
      formula: {
        label: "Direction-cosine identity",
        latex: "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1",
        symbols: [
          { symbol: "\\(\\alpha, \\beta, \\gamma\\)", meaning: "angles the normal makes with \\(X, Y, Z\\) axes" },
        ],
      },
      authoredExample: {
        prompt:
          "A normal makes \\(45^\\circ\\) with the X-axis, \\(60^\\circ\\) with the Y-axis, and an acute angle with the Z-axis. Find a direction ratio of the normal.",
        steps: [
          "Apply the identity: \\(\\cos^2 45^\\circ + \\cos^2 60^\\circ + \\cos^2\\gamma = 1\\).",
          "\\(\\tfrac{1}{2} + \\tfrac{1}{4} + \\cos^2\\gamma = 1 \\Rightarrow \\cos^2\\gamma = \\tfrac{1}{4} \\Rightarrow \\cos\\gamma = \\tfrac{1}{2}\\) (acute, so positive).",
          "Direction cosines \\(\\left(\\tfrac{1}{\\sqrt 2}, \\tfrac{1}{2}, \\tfrac{1}{2}\\right)\\); clear the \\(\\sqrt 2\\) by scaling to ratios \\((\\sqrt 2, 1, 1)\\) or doubling to \\((2, \\sqrt2\\cdot 1, \\dots)\\) — proportional triple \\((2,1,1)\\).",
        ],
        answer: "Normal direction \\(\\propto (2,1,1)\\)",
      },
      pyqExampleId: "63b0923e-20ce-4267-a2ee-6ee9df4f123e",
      selfCheckExample: {
        prompt:
          "A normal is equally inclined to all three coordinate axes at an acute angle. What is each direction cosine, and what is a direction ratio of the normal?",
        steps: [
          "Equal cosines: \\(3\\cos^2\\alpha = 1 \\Rightarrow \\cos\\alpha = \\tfrac{1}{\\sqrt 3}\\) (acute → positive).",
          "Direction cosines \\(\\left(\\tfrac{1}{\\sqrt3}, \\tfrac{1}{\\sqrt3}, \\tfrac{1}{\\sqrt3}\\right)\\), so the direction ratio is \\((1,1,1)\\).",
        ],
        answer: "Each \\(= \\tfrac{1}{\\sqrt3}\\); direction ratio \\((1,1,1)\\)",
      },
      practiceSet: [
        { prompt: "If two direction cosines are \\(\\tfrac{1}{2}, \\tfrac{1}{2}\\), the third (acute)?", answer: "\\(\\tfrac{1}{\\sqrt 2}\\)" },
        { prompt: "Direction ratio of a normal equally inclined to all axes?", answer: "\\((1,1,1)\\)" },
        { prompt: "Can a normal make \\(45^\\circ\\) with both X and Y axes?", answer: "No", method: "\\(\\tfrac12+\\tfrac12 = 1\\) leaves \\(\\cos^2\\gamma = 0\\), so only if \\(\\gamma = 90^\\circ\\)" },
        { prompt: "\\(\\cos\\gamma\\) if \\(\\alpha = 60^\\circ, \\beta = 60^\\circ\\) (acute)?", answer: "\\(\\tfrac{1}{\\sqrt 2}\\)" },
      ],
      traps: [
        {
          title: "\"Acute angle\" chooses the positive square root",
          body:
            "\\(\\cos^2\\gamma = \\tfrac14\\) gives \\(\\cos\\gamma = \\pm\\tfrac12\\). The word *acute* forces the \\(+\\) sign, so the Z-component of the normal is positive. Miss this and you may build the plane from the mirror-flipped normal.",
        },
        {
          title: "Equally inclined means equal COSINES, not equal angles spread over 90 degrees",
          body:
            "Equal inclination gives \\((1,1,1)\\), not \\((1,1,0)\\). All three cosines equal forces \\(\\tfrac{1}{\\sqrt3}\\) each — don't assume one axis drops out.",
        },
      ],
    },

    // ── FOUNDATION 3 / parallel-to-axis-and-plane ────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-parallel-axis-and-plane",
      name: "Planes parallel to a coordinate plane or to a given plane",
      visualizationSlug: "plane-with-normal",
      intuition:
        "A plane parallel to the XY-plane is just \\(z = k\\) — its normal points straight up the Z-axis. More generally, a plane parallel to a given plane keeps the SAME normal, so it has the same left-hand side; only the constant changes, and the given point fixes it.",
      definition:
        "Parallel to a coordinate plane (normal along one axis):\n" +
        "- Parallel to **XY-plane**: \\(z = k\\). Parallel to **YZ-plane**: \\(x = k\\). Parallel to **ZX-plane**: \\(y = k\\).\n\n" +
        "**Parallel to a given plane** \\(ax+by+cz = d\\): the required plane is \\(ax+by+cz = d'\\) with the **same normal** \\((a,b,c)\\); substitute the given point to find \\(d'\\).",
      formula: {
        label: "Same normal, new constant",
        latex: "ax + by + cz = d' \\quad\\text{where } d' = a x_0 + b y_0 + c z_0",
        symbols: [
          { symbol: "\\((a,b,c)\\)", meaning: "normal copied from the given plane" },
          { symbol: "\\((x_0,y_0,z_0)\\)", meaning: "point the new plane passes through" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the equation of the plane through \\((1,4,-2)\\) parallel to the plane \\(-2x + y - 3z = 9\\).",
        steps: [
          "Keep the normal \\((-2, 1, -3)\\): the plane is \\(-2x + y - 3z = d'\\).",
          "Substitute \\((1,4,-2)\\): \\(-2(1) + 4 - 3(-2) = -2 + 4 + 6 = 8\\).",
          "So \\(-2x + y - 3z = 8\\), i.e. \\(2x - y + 3z + 8 = 0\\).",
        ],
        answer: "\\(2x - y + 3z + 8 = 0\\)",
      },
      pyqExampleId: "a0805763-6307-445d-8513-afc228065204",
      selfCheckExample: {
        prompt: "Cartesian equation of the plane through \\(B(4,-3,5)\\) parallel to the YZ-plane.",
        steps: [
          "Parallel to the YZ-plane means the form \\(x = k\\) (normal along X).",
          "It passes through \\(B\\), whose X-coordinate is \\(4\\), so \\(x = 4\\).",
        ],
        answer: "\\(x = 4\\)",
      },
      practiceSet: [
        { prompt: "Plane through \\((3,-1,5)\\) parallel to the YZ-plane?", answer: "\\(x = 3\\)" },
        { prompt: "Plane through \\((0,2,9)\\) parallel to the ZX-plane?", answer: "\\(y = 2\\)" },
        { prompt: "Plane through \\((1,1,1)\\) parallel to \\(2x - y + z = 5\\)?", answer: "\\(2x - y + z = 2\\)" },
        { prompt: "Normal of any plane parallel to the XY-plane?", answer: "\\((0,0,1)\\)" },
      ],
      traps: [
        {
          title: "Parallel to XY-plane is \\(z = k\\), not \\(x + y = k\\)",
          body:
            "The XY-plane is \\(z = 0\\); any plane parallel to it freezes \\(z\\). Match the right coordinate: parallel to YZ freezes \\(x\\), parallel to ZX freezes \\(y\\).",
        },
        {
          title: "Re-use the WHOLE normal when copying a plane",
          body:
            "A parallel plane shares all three coefficients, signs included. Substitute the point only into the constant — do not rescale or re-sign the normal, or it stops being parallel.",
        },
      ],
    },

    // ── FOOT OF PERPENDICULAR / NORMAL FORM ──────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-normal-foot-perpendicular",
      name: "Plane from the foot of the perpendicular from the origin",
      visualizationSlug: "unit-normal-vector",
      intuition:
        "If \\(M\\) is the foot of the perpendicular dropped from the origin onto a plane, then \\(\\overrightarrow{OM}\\) IS the normal direction, and \\(M\\) lies on the plane. So the plane is \\(\\vec{r}\\cdot\\overrightarrow{OM} = |\\overrightarrow{OM}|^2\\) — the constant comes out as the squared length of \\(M\\).",
      definition:
        "Let \\(M(x_0,y_0,z_0)\\) be the foot of perpendicular from the origin to the plane. Then:\n" +
        "- The **normal** is \\(\\vec{n} = \\overrightarrow{OM} = (x_0,y_0,z_0)\\).\n" +
        "- The plane passes through \\(M\\), so the constant is \\(\\vec{n}\\cdot\\overrightarrow{OM} = x_0^2 + y_0^2 + z_0^2\\).\n\n" +
        "**Cartesian:** \\(x_0 x + y_0 y + z_0 z = x_0^2 + y_0^2 + z_0^2\\). **Vector:** \\(\\vec{r}\\cdot(x_0\\hat{i} + y_0\\hat{j} + z_0\\hat{k}) = x_0^2 + y_0^2 + z_0^2\\).",
      formula: {
        label: "Plane from foot of perpendicular",
        latex: "\\vec{r}\\cdot\\overrightarrow{OM} = |\\overrightarrow{OM}|^2 = x_0^2 + y_0^2 + z_0^2",
        symbols: [
          { symbol: "\\(M(x_0,y_0,z_0)\\)", meaning: "foot of perpendicular from the origin" },
          { symbol: "\\(\\overrightarrow{OM}\\)", meaning: "the normal vector to the plane" },
        ],
      },
      authoredExample: {
        prompt:
          "The foot of the perpendicular from the origin to a plane is \\(M(2,1,-2)\\). Find the vector equation of the plane.",
        steps: [
          "Normal \\(\\vec{n} = \\overrightarrow{OM} = 2\\hat{i} + \\hat{j} - 2\\hat{k}\\).",
          "Constant \\(= |\\overrightarrow{OM}|^2 = 2^2 + 1^2 + (-2)^2 = 4 + 1 + 4 = 9\\).",
          "Plane: \\(\\vec{r}\\cdot(2\\hat{i} + \\hat{j} - 2\\hat{k}) = 9\\).",
        ],
        answer: "\\(\\vec{r}\\cdot(2\\hat{i} + \\hat{j} - 2\\hat{k}) = 9\\)",
      },
      pyqExampleId: "f0580ddc-192a-478a-8773-5dab4ac28abf",
      selfCheckExample: {
        prompt:
          "The foot of perpendicular from the origin to a plane is \\((4,-2,5)\\). Find the Cartesian equation of the plane.",
        steps: [
          "Normal \\((4,-2,5)\\); constant \\(= 4^2 + (-2)^2 + 5^2 = 16 + 4 + 25 = 45\\).",
          "Plane: \\(4x - 2y + 5z = 45\\).",
        ],
        answer: "\\(4x - 2y + 5z = 45\\)",
      },
      practiceSet: [
        { prompt: "Foot of perpendicular \\((1,2,2)\\): the plane's constant \\(d\\)?", answer: "\\(9\\)", method: "\\(1+4+4\\)" },
        { prompt: "Foot of perpendicular \\((3,0,4)\\): equation of the plane?", answer: "\\(3x + 4z = 25\\)" },
        { prompt: "Normal direction if the foot is \\((6,2,-3)\\)?", answer: "\\((6,2,-3)\\)" },
        { prompt: "Length of the perpendicular from origin if foot is \\((2,1,2)\\)?", answer: "\\(3\\)" },
      ],
      traps: [
        {
          title: "The constant is \\(|\\overrightarrow{OM}|^2\\), not \\(|\\overrightarrow{OM}|\\)",
          body:
            "For foot \\((2,1,-2)\\) the constant is \\(9\\) (the squared length), not \\(3\\) (the distance). The distance \\(\\sqrt9 = 3\\) is the perpendicular *length*; the plane equation uses the squared value.",
        },
        {
          title: "Don't move the foot to the wrong side of the equation",
          body:
            "The form is \\(\\vec{r}\\cdot\\overrightarrow{OM} = +|\\overrightarrow{OM}|^2\\), a POSITIVE constant. Distractors flip it to \\(\\dots + 45 = 0\\); that plane no longer passes through \\(M\\).",
        },
      ],
    },

    // ── NORMAL FROM ANGLES (point + dir-cosine normal) ───────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-normal-from-angles",
      name: "Plane through a point with normal fixed by axis angles",
      intuition:
        "Combine the direction-cosine identity with the point-normal form. The angles (or the 'equal acute angles' phrasing) give you the normal direction; the point gives you the constant. Two foundations clicking together.",
      definition:
        "Given the angles a normal makes with the axes, recover its direction ratio via \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\), then write the plane through the point \\(A\\):\n" +
        "\\[a(x-x_0) + b(y-y_0) + c(z-z_0) = 0\\]\n" +
        "When the normal is **equally inclined** to all axes the direction is \\((1,1,1)\\), giving a plane of the form \\(x + y + z = k\\).",
      formula: {
        label: "Point-normal with angle-derived normal",
        latex: "a(x - x_0) + b(y - y_0) + c(z - z_0) = 0",
        symbols: [
          { symbol: "\\((a,b,c)\\)", meaning: "normal recovered from the axis angles" },
          { symbol: "\\((x_0,y_0,z_0)\\)", meaning: "the given point on the plane" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the plane through \\((-1,1,2)\\) whose normal makes equal acute angles with the coordinate axes.",
        steps: [
          "Equal acute angles → normal direction \\((1,1,1)\\).",
          "Point-normal: \\((x+1) + (y-1) + (z-2) = 0\\).",
          "Expand: \\(x + y + z - 2 = 0\\).",
        ],
        answer: "\\(x + y + z - 2 = 0\\)",
      },
      pyqExampleId: "afab1dfe-9347-4aa4-b96b-1deb070bebb6",
      selfCheckExample: {
        prompt:
          "A normal is inclined \\(45^\\circ\\) to X, \\(60^\\circ\\) to Y, acute to Z, and is normal to a plane through \\((-2,1,1)\\). Find the plane.",
        steps: [
          "From the cosines: \\(\\cos^2\\gamma = 1 - \\tfrac12 - \\tfrac14 = \\tfrac14\\), so the normal \\(\\propto (2,1,1)\\) (X-component doubled to clear \\(\\sqrt2\\)).",
          "Point-normal: \\(2(x+2) + (y-1) + (z-1) = 0\\).",
          "Expand: \\(2x + y + z = 0\\).",
        ],
        answer: "\\(2x + y + z = 0\\)",
      },
      practiceSet: [
        { prompt: "Plane through \\((1,1,1)\\) with normal \\((1,1,1)\\)?", answer: "\\(x + y + z = 3\\)" },
        { prompt: "Form of a plane whose normal is equally inclined to the axes?", answer: "\\(x + y + z = k\\)" },
        { prompt: "Plane through origin with normal \\((2,1,1)\\)?", answer: "\\(2x + y + z = 0\\)" },
        { prompt: "Constant for \\(x+y+z=k\\) through \\((-1,1,2)\\)?", answer: "\\(2\\)" },
      ],
      traps: [
        {
          title: "Clear the irrational direction cosine into a clean ratio",
          body:
            "Direction cosines \\(\\left(\\tfrac{1}{\\sqrt2}, \\tfrac12, \\tfrac12\\right)\\) become the ratio \\((2,1,1)\\) — double everything until the \\(\\sqrt2\\) is gone. Writing the normal as \\((1,1,1)\\) here is wrong; only EQUAL angles give \\((1,1,1)\\).",
        },
        {
          title: "Put the point into the expanded form, not the angle data",
          body:
            "The angles fix only the normal's DIRECTION; the point alone fixes the constant. Don't try to use an angle to find \\(k\\).",
        },
      ],
    },

    // ── PERPENDICULAR TO TWO PLANES (n = n1 x n2) — workhorse ─────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-perp-two-planes",
      name: "Plane perpendicular to two given planes",
      visualizationSlug: "plane-with-normal",
      intuition:
        "A plane perpendicular to two given planes must contain BOTH their normals as directions lying in it. So the required normal is perpendicular to both given normals — exactly what the cross product delivers: \\(\\vec{n} = \\vec{n_1}\\times\\vec{n_2}\\).",
      definition:
        "To build a plane through a point \\(A\\) perpendicular to planes with normals \\(\\vec{n_1}\\) and \\(\\vec{n_2}\\):\n" +
        "- The required normal is \\(\\vec{n} = \\vec{n_1}\\times\\vec{n_2}\\) (perpendicular to both, so both given normals lie IN the required plane).\n" +
        "- Then write the plane through \\(A\\): \\(\\vec{n}\\cdot(\\vec{r} - \\vec{a}) = 0\\).\n\n" +
        "This is the **cross-product-normal engine** — one of the two HARD workhorses of this subtopic.",
      formula: {
        label: "Normal from two perpendicular planes",
        latex: "\\vec{n} = \\vec{n_1}\\times\\vec{n_2}, \\qquad \\vec{n}\\cdot(\\vec{r} - \\vec{a}) = 0",
        symbols: [
          { symbol: "\\(\\vec{n_1}, \\vec{n_2}\\)", meaning: "normals of the two given planes" },
          { symbol: "\\(\\vec{n}\\)", meaning: "required normal = their cross product" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the plane through \\((2,0,-1)\\) perpendicular to the planes \\(x + y + z = 3\\) and \\(2x - y + 3z = 1\\).",
        steps: [
          "Normals \\(\\vec{n_1} = (1,1,1)\\), \\(\\vec{n_2} = (2,-1,3)\\).",
          "Cross product: \\(\\vec{n} = (1,1,1)\\times(2,-1,3) = (1\\cdot3 - 1\\cdot(-1),\\; 1\\cdot2 - 1\\cdot3,\\; 1\\cdot(-1) - 1\\cdot2) = (4,-1,-3)\\).",
          "Plane through \\((2,0,-1)\\): \\(4(x-2) - (y-0) - 3(z+1) = 0 \\Rightarrow 4x - y - 3z - 11 = 0\\).",
        ],
        answer: "\\(4x - y - 3z - 11 = 0\\)",
      },
      pyqExampleId: "dab43a11-3fe6-45b7-96ec-5f44ed91ad79",
      selfCheckExample: {
        prompt:
          "Find the plane through \\((1,1,1)\\) perpendicular to \\(2x + y - 2z = 5\\) and \\(3x - 6y - 2z = 7\\).",
        steps: [
          "Normals \\((2,1,-2)\\) and \\((3,-6,-2)\\); cross product \\(= (1\\cdot(-2) - (-2)(-6),\\; (-2)(3) - 2(-2),\\; 2(-6) - 1\\cdot3) = (-14, -2, -15)\\), use \\((14,2,15)\\).",
          "Plane through \\((1,1,1)\\): \\(14(x-1) + 2(y-1) + 15(z-1) = 0\\).",
          "Expand: \\(14x + 2y + 15z = 31\\).",
        ],
        answer: "\\(14x + 2y + 15z = 31\\)",
      },
      practiceSet: [
        { prompt: "Which operation gives a normal perpendicular to two normals?", answer: "the cross product \\(\\vec{n_1}\\times\\vec{n_2}\\)" },
        { prompt: "\\((1,0,0)\\times(0,1,0) = ?\\)", answer: "\\((0,0,1)\\)" },
        { prompt: "If \\(\\vec{n} = (6,-7,-4)\\) and the plane passes through the origin, its equation?", answer: "\\(6x - 7y - 4z = 0\\)" },
        { prompt: "Two given normals lie WHERE relative to the required plane?", answer: "inside it (parallel to it)" },
      ],
      traps: [
        {
          title: "Cross product, not dot product, for the normal",
          body:
            "Perpendicular-to-two-planes needs a direction perpendicular to BOTH normals — that is \\(\\vec{n_1}\\times\\vec{n_2}\\). A dot product gives a number, not a direction; reaching for it here is the classic wrong start.",
        },
        {
          title: "Keep the cross-product sign and middle-term flip straight",
          body:
            "The \\(\\hat{j}\\) component carries a minus sign in the determinant expansion. A sign error there sends you to a sibling option with the middle coefficient flipped (e.g. \\(6x+7y\\dots\\) instead of \\(6x-7y\\dots\\)).",
        },
      ],
    },

    // ── PARALLEL TO TWO LINES (n = d1 x d2) — workhorse ───────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-parallel-two-lines",
      name: "Plane through a point parallel to two lines",
      intuition:
        "If a plane is parallel to two lines, both line directions lie IN the plane — so the normal is perpendicular to both directions. Same engine as before: \\(\\vec{n} = \\vec{d_1}\\times\\vec{d_2}\\). This is the single most repeated template in the subtopic.",
      definition:
        "For a plane through a point \\(A\\) **parallel to two lines** with direction vectors \\(\\vec{d_1}, \\vec{d_2}\\):\n" +
        "- The normal is \\(\\vec{n} = \\vec{d_1}\\times\\vec{d_2}\\).\n" +
        "- Plane: \\(\\vec{n}\\cdot(\\vec{r} - \\vec{a}) = 0\\).\n\n" +
        "Read each line's direction straight off its symmetric form \\(\\frac{x - x_1}{p} = \\frac{y - y_1}{q} = \\frac{z - z_1}{s}\\): the direction is \\((p, q, s)\\).",
      formula: {
        label: "Normal from two parallel lines",
        latex: "\\vec{n} = \\vec{d_1}\\times\\vec{d_2}, \\qquad \\vec{n}\\cdot(\\vec{r} - \\vec{a}) = 0",
        symbols: [
          { symbol: "\\(\\vec{d_1}, \\vec{d_2}\\)", meaning: "direction vectors of the two lines" },
          { symbol: "\\(\\vec{a}\\)", meaning: "the point the plane passes through" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the plane through \\((1,0,2)\\) parallel to the lines \\(\\frac{x-2}{1} = \\frac{y+1}{2} = \\frac{z-3}{3}\\) and \\(\\frac{x+1}{2} = \\frac{y}{1} = \\frac{z-4}{-1}\\).",
        steps: [
          "Directions \\(\\vec{d_1} = (1,2,3)\\), \\(\\vec{d_2} = (2,1,-1)\\).",
          "\\(\\vec{n} = \\vec{d_1}\\times\\vec{d_2} = (2(-1) - 3\\cdot1,\\; 3\\cdot2 - 1(-1),\\; 1\\cdot1 - 2\\cdot2) = (-5, 7, -3)\\); use \\((5,-7,3)\\).",
          "Plane through \\((1,0,2)\\): \\(5(x-1) - 7(y-0) + 3(z-2) = 0 \\Rightarrow 5x - 7y + 3z - 11 = 0\\).",
        ],
        answer: "\\(5x - 7y + 3z - 11 = 0\\)",
      },
      pyqExampleId: "37da8102-d7d3-4917-9843-b86d60b60307",
      selfCheckExample: {
        prompt:
          "Find the plane through \\((2,1,2)\\) and \\((1,2,1)\\) parallel to the line \\(2x = 3y,\\; z = 1\\).",
        steps: [
          "Line direction: \\(2x = 3y\\) means \\(\\frac{x}{3} = \\frac{y}{2}\\) with \\(z\\) fixed, so \\(\\vec{d} = (3,2,0)\\). The plane also contains \\(\\overrightarrow{AB} = (1,2,1) - (2,1,2) = (-1,1,-1)\\).",
          "\\(\\vec{n} = \\overrightarrow{AB}\\times\\vec{d} = (1\\cdot0 - (-1)2,\\; (-1)3 - (-1)0,\\; (-1)2 - 1\\cdot3) = (2,-3,-5)\\).",
          "Plane through \\((2,1,2)\\): \\(2(x-2) - 3(y-1) - 5(z-2) = 0 \\Rightarrow 2x - 3y - 5z + 9 = 0\\). Testing \\((-2,0,1)\\): \\(-4 - 0 - 5 + 9 = 0\\) — it lies on the plane.",
        ],
        answer: "\\(2x - 3y - 5z + 9 = 0\\); passes through \\((-2,0,1)\\)",
      },
      practiceSet: [
        { prompt: "Direction of \\(\\frac{x-1}{3} = \\frac{y+2}{2} = \\frac{z}{-4}\\)?", answer: "\\((3,2,-4)\\)" },
        { prompt: "If a plane is parallel to two lines, the normal is perpendicular to...?", answer: "both line directions" },
        { prompt: "\\((1,0,0)\\times(0,0,1) = ?\\)", answer: "\\((0,-1,0)\\)" },
        { prompt: "Plane through \\((0,0,0)\\) parallel to lines with directions \\((1,0,0),(0,1,0)\\)?", answer: "\\(z = 0\\)" },
      ],
      traps: [
        {
          title: "Parallel to two LINES uses their directions, parallel to two PLANES uses their normals",
          body:
            "Both reduce to a cross product, but read the right vectors: a line gives a direction \\((p,q,s)\\) from its denominators; a plane gives a normal \\((a,b,c)\\) from its coefficients. Mixing them up cross-products the wrong pair.",
        },
        {
          title: "Read line directions from the denominators, signs included",
          body:
            "In \\(\\frac{z}{-4}\\) the Z-direction is \\(-4\\), not \\(4\\). A dropped minus on a single component changes the whole cross product.",
        },
      ],
    },

    // ── PLANE THROUGH THREE POINTS ───────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-through-three-points",
      name: "Plane through three points",
      intuition:
        "Three non-collinear points fix a plane. Build two direction vectors inside the plane from one anchor point, cross them to get the normal, then write the point-normal form — or expand the standard 3-by-3 determinant directly.",
      definition:
        "For points \\(A, B, C\\):\n" +
        "- Form two in-plane vectors \\(\\overrightarrow{AB} = \\vec{b} - \\vec{a}\\) and \\(\\overrightarrow{AC} = \\vec{c} - \\vec{a}\\).\n" +
        "- Normal \\(\\vec{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}\\); plane through \\(A\\).\n\n" +
        "**Determinant form** (equivalent):\n" +
        "\\[\\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \\end{vmatrix} = 0\\]",
      formula: {
        label: "Three-point plane",
        latex: "\\vec{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}, \\qquad \\vec{n}\\cdot(\\vec{r} - \\vec{a}) = 0",
        symbols: [
          { symbol: "\\(\\overrightarrow{AB}, \\overrightarrow{AC}\\)", meaning: "two edges from anchor \\(A\\)" },
          { symbol: "\\(\\vec{n}\\)", meaning: "normal = their cross product" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the Cartesian equation of the plane through \\((1,1,2)\\), \\((2,3,1)\\) and \\((0,1,4)\\).",
        steps: [
          "Anchor \\(A(1,1,2)\\): \\(\\overrightarrow{AB} = (1,2,-1)\\), \\(\\overrightarrow{AC} = (-1,0,2)\\).",
          "\\(\\vec{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = (2\\cdot2 - (-1)\\cdot0,\\; (-1)\\cdot(-1) - 1\\cdot2,\\; 1\\cdot0 - 2\\cdot(-1)) = (4, -1, 2)\\).",
          "Plane through \\(A\\): \\(4(x-1) - (y-1) + 2(z-2) = 0 \\Rightarrow 4x - y + 2z - 7 = 0\\).",
        ],
        answer: "\\(4x - y + 2z - 7 = 0\\)",
      },
      pyqExampleId: "0ebce59e-1f9b-4a7d-8eeb-bda1d4804a13",
      selfCheckExample: {
        prompt:
          "Find the plane through \\((2,3,1)\\) and \\((4,-5,3)\\) parallel to the X-axis.",
        steps: [
          "Parallel to the X-axis means the normal is perpendicular to \\(\\hat{i}\\), so the coefficient of \\(x\\) is \\(0\\): plane \\(by + cz = d\\).",
          "Substitute the two points: \\(3b + c = d\\) and \\(-5b + 3c = d\\). Subtracting: \\(8b - 2c = 0 \\Rightarrow c = 4b\\); take \\(b = 1, c = 4\\), then \\(d = 3 + 4 = 7\\).",
          "Plane: \\(y + 4z = 7\\).",
        ],
        answer: "\\(y + 4z = 7\\)",
      },
      practiceSet: [
        { prompt: "How many non-collinear points fix a plane?", answer: "three" },
        { prompt: "Two in-plane edges from \\(A\\) to \\(B, C\\) are crossed to get the...?", answer: "normal" },
        { prompt: "If a plane is parallel to the X-axis, the coefficient of \\(x\\) is?", answer: "\\(0\\)" },
        { prompt: "\\(\\overrightarrow{AB}\\) for \\(A(3,1,1), B(1,2,3)\\)?", answer: "\\((-2,1,2)\\)" },
      ],
      traps: [
        {
          title: "Anchor BOTH edge vectors at the same point",
          body:
            "Use \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) (both from \\(A\\)), not \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{BC}\\) mixed with the wrong anchor for the point-normal step. The normal is fine either way, but the substituted point must lie on the plane.",
        },
        {
          title: "\"Parallel to an axis\" kills exactly one coefficient",
          body:
            "Parallel to X-axis sets the \\(x\\)-coefficient to \\(0\\) (the axis direction must lie in the plane, so the normal has no \\(\\hat{i}\\) part). Don't also zero \\(y\\) or \\(z\\).",
        },
      ],
    },

    // ── PERPENDICULAR BISECTOR OF A SEGMENT ──────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-perp-bisector-segment",
      name: "Perpendicular bisector plane of a segment",
      intuition:
        "The plane that perpendicularly bisects segment \\(PQ\\) passes through the MIDPOINT of \\(PQ\\) and has \\(\\overrightarrow{PQ}\\) as its normal — every point on it is equidistant from \\(P\\) and \\(Q\\).",
      definition:
        "For the plane perpendicular to segment \\(PQ\\) and passing through its midpoint:\n" +
        "- **Midpoint** \\(M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}, \\frac{z_1+z_2}{2}\\right)\\).\n" +
        "- **Normal** \\(\\vec{n} = \\overrightarrow{PQ} = (x_2 - x_1, y_2 - y_1, z_2 - z_1)\\).\n" +
        "- Plane: \\(\\vec{n}\\cdot(\\vec{r} - \\vec{m}) = 0\\).",
      formula: {
        label: "Perpendicular bisector plane",
        latex: "\\vec{n} = \\overrightarrow{PQ}, \\quad M = \\tfrac{1}{2}(\\vec{p} + \\vec{q}), \\quad \\vec{n}\\cdot(\\vec{r} - \\vec{m}) = 0",
        symbols: [
          { symbol: "\\(M\\)", meaning: "midpoint of \\(PQ\\) — the plane passes through it" },
          { symbol: "\\(\\overrightarrow{PQ}\\)", meaning: "segment direction = the normal" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the plane through the midpoint of \\(P(2,-1,4)\\) and \\(Q(4,3,-2)\\) and perpendicular to \\(PQ\\).",
        steps: [
          "Midpoint \\(M = (3,1,1)\\).",
          "\\(\\overrightarrow{PQ} = (2,4,-6)\\); take normal \\((1,2,-3)\\).",
          "Plane: \\((x-3) + 2(y-1) - 3(z-1) = 0 \\Rightarrow x + 2y - 3z - 2 = 0\\).",
        ],
        answer: "\\(x + 2y - 3z - 2 = 0\\)",
      },
      pyqExampleId: "1b50b18b-bae7-4293-ac75-e5d3b9658235",
      selfCheckExample: {
        prompt:
          "Find the perpendicular bisector plane of the segment joining \\((0,0,0)\\) and \\((2,4,6)\\).",
        steps: [
          "Midpoint \\(M = (1,2,3)\\); normal \\((2,4,6)\\), simplify to \\((1,2,3)\\).",
          "Plane: \\(1(x-1) + 2(y-2) + 3(z-3) = 0\\).",
          "Expand: \\(x + 2y + 3z = 14\\).",
        ],
        answer: "\\(x + 2y + 3z = 14\\)",
      },
      practiceSet: [
        { prompt: "Midpoint of \\((1,2,5)\\) and \\((3,4,3)\\)?", answer: "\\((2,3,4)\\)" },
        { prompt: "Normal of the perpendicular bisector plane of \\(PQ\\)?", answer: "\\(\\overrightarrow{PQ}\\)" },
        { prompt: "Points on this plane are equidistant from which two points?", answer: "\\(P\\) and \\(Q\\)" },
        { prompt: "\\(\\overrightarrow{PQ}\\) for \\(P(1,2,5), Q(3,4,3)\\)?", answer: "\\((2,2,-2)\\)" },
      ],
      traps: [
        {
          title: "Pass through the MIDPOINT, not through \\(P\\) or \\(Q\\)",
          body:
            "The perpendicular bisector plane goes through \\(M\\), the midpoint. Substituting \\(P\\) or \\(Q\\) gives a parallel plane with the wrong constant.",
        },
        {
          title: "Simplify the normal before substituting",
          body:
            "\\(\\overrightarrow{PQ} = (2,2,-2)\\) is fine, but \\((1,1,-1)\\) is cleaner — just keep the constant consistent. Either way, the direction (signs) must match \\(\\overrightarrow{PQ}\\).",
        },
      ],
    },

    // ── FAMILY OF PLANES — λ ENGINE (HARD workhorse, richest) ─────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-family-intersection",
      name: "Family of planes through a line of intersection (lambda engine)",
      intuition:
        "Any plane through the intersection line of two planes \\(P_1 = 0\\) and \\(P_2 = 0\\) can be written as \\(P_1 + \\lambda P_2 = 0\\) for some scalar \\(\\lambda\\). You then impose ONE extra condition — perpendicular to a coordinate plane, parallel to an axis or a line, perpendicular to a third plane, or passing through a point — to solve for \\(\\lambda\\). This single trick is the most repeated HARD shape in the subtopic.",
      definition:
        "The **family of planes** through the line of intersection of \\(P_1: a_1x+b_1y+c_1z+d_1 = 0\\) and \\(P_2: a_2x+b_2y+c_2z+d_2 = 0\\) is:\n" +
        "\\[P_1 + \\lambda P_2 = 0\\]\n" +
        "Its normal is \\((a_1 + \\lambda a_2,\\; b_1 + \\lambda b_2,\\; c_1 + \\lambda c_2)\\). Pin \\(\\lambda\\) with the side condition:\n" +
        "- **Perpendicular to XY-plane** → \\(z\\)-coefficient \\(= 0\\): \\(c_1 + \\lambda c_2 = 0\\).\n" +
        "- **Parallel to X / Y / Z-axis** → the matching coefficient \\(= 0\\) (e.g. parallel to Y-axis → \\(b_1 + \\lambda b_2 = 0\\)).\n" +
        "- **Perpendicular to a third plane** with normal \\(\\vec{m}\\) → family-normal \\(\\cdot\\, \\vec{m} = 0\\).\n" +
        "- **Parallel to a line** with direction \\(\\vec{d}\\) → family-normal \\(\\cdot\\, \\vec{d} = 0\\).\n" +
        "- **Through a point** → substitute the point.",
      formula: {
        label: "Family of planes",
        latex: "P_1 + \\lambda P_2 = 0, \\qquad \\vec{n}_\\lambda = \\big(a_1 + \\lambda a_2,\\; b_1 + \\lambda b_2,\\; c_1 + \\lambda c_2\\big)",
        symbols: [
          { symbol: "\\(\\lambda\\)", meaning: "scalar fixed by the one extra condition" },
          { symbol: "\\(\\vec{n}_\\lambda\\)", meaning: "the family's normal, a function of \\(\\lambda\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the plane through the intersection of \\(2x + y - z = 3\\) and \\(x - y + 2z = 1\\) that passes through the point \\((1,0,1)\\).",
        steps: [
          "Family: \\((2x+y-z-3) + \\lambda(x-y+2z-1) = 0\\).",
          "Through \\((1,0,1)\\): \\((2+0-1-3) + \\lambda(1-0+2-1) = -2 + 2\\lambda = 0 \\Rightarrow \\lambda = 1\\).",
          "Substitute: \\((2+1)x + (1-1)y + (-1+2)z - (3+1) = 0 \\Rightarrow 3x + z - 4 = 0\\).",
        ],
        answer: "\\(3x + z = 4\\)",
      },
      pyqExampleId: "8c9a7b7d-98f3-46e1-981e-e5b4bb34b809",
      selfCheckExample: {
        prompt:
          "Find the plane through the intersection of \\(x + 2y + 3z = 4\\) and \\(2x + y + z = 5\\) that is perpendicular to the YZ-plane.",
        steps: [
          "Family: \\((1+2\\lambda)x + (2+\\lambda)y + (3+\\lambda)z = 4 + 5\\lambda\\).",
          "Perpendicular to YZ-plane → \\(x\\)-coefficient \\(= 0\\): \\(1 + 2\\lambda = 0 \\Rightarrow \\lambda = -\\tfrac12\\).",
          "Substitute: \\(\\tfrac32 y + \\tfrac52 z = \\tfrac32 \\Rightarrow 3y + 5z = 3\\).",
        ],
        answer: "\\(3y + 5z = 3\\)",
      },
      practiceSet: [
        { prompt: "Write the family through the intersection of \\(P_1 = 0\\) and \\(P_2 = 0\\).", answer: "\\(P_1 + \\lambda P_2 = 0\\)" },
        { prompt: "\"Perpendicular to the XY-plane\" sets which coefficient to 0?", answer: "the \\(z\\)-coefficient" },
        { prompt: "\"Parallel to the Y-axis\" sets which coefficient to 0?", answer: "the \\(y\\)-coefficient" },
        { prompt: "\"Parallel to a line of direction \\(\\vec{d}\\)\" imposes which equation on the normal?", answer: "\\(\\vec{n}_\\lambda\\cdot\\vec{d} = 0\\)" },
      ],
      traps: [
        {
          title: "Perpendicular to the XY-plane means the Z-coefficient vanishes",
          body:
            "A plane perpendicular to the XY-plane is 'vertical' — its normal lies IN the XY-plane, so it has no \\(z\\)-part: set \\(c_1 + \\lambda c_2 = 0\\). Students often confuse this with parallel (which would set \\(a, b\\) to make the normal point along Z). Vertical → kill \\(z\\); horizontal → keep only \\(z\\).",
        },
        {
          title: "Parallel-to-axis kills the SAME-named coefficient",
          body:
            "Parallel to the Y-axis means \\(\\hat{j}\\) lies in the plane, so the normal has no \\(\\hat{j}\\): \\(b_1 + \\lambda b_2 = 0\\). Don't confuse 'parallel to Y-axis' (kill \\(b\\)) with 'perpendicular to ZX-plane' even though they coincide.",
        },
        {
          title: "Clear the fractions before matching options",
          body:
            "Solving for \\(\\lambda\\) leaves fractional coefficients like \\(\\tfrac25 x + \\tfrac15 y\\). Multiply through (here by 5) to reach \\(2x + y - 3 = 0\\); the un-cleared version matches no option.",
        },
      ],
    },

    // ── INTERCEPT FORM + TRIANGLE ────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-intercept-triangle",
      name: "Intercept form, intercept triangle area and centroid",
      visualizationSlug: "octants-coordinate-planes",
      intuition:
        "A plane cuts the axes at \\((a,0,0), (0,b,0), (0,0,c)\\) — the intercepts. Those three points form a triangle whose area and centroid have clean closed forms, so a question that mentions where a plane 'meets the axes' is almost always testing one of these two formulas.",
      definition:
        "**Intercept form:** \\(\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1\\), with axis points \\(A(a,0,0), B(0,b,0), C(0,0,c)\\).\n\n" +
        "- **Centroid of \\(\\triangle ABC\\):** \\(\\left(\\dfrac{a}{3}, \\dfrac{b}{3}, \\dfrac{c}{3}\\right)\\).\n" +
        "- **Area of \\(\\triangle ABC\\):** \\(\\dfrac{1}{2}\\sqrt{a^2 b^2 + b^2 c^2 + c^2 a^2}\\).",
      formula: {
        label: "Intercept triangle: centroid and area",
        latex:
          "G = \\left(\\tfrac{a}{3}, \\tfrac{b}{3}, \\tfrac{c}{3}\\right), \\qquad \\text{Area} = \\tfrac{1}{2}\\sqrt{a^2 b^2 + b^2 c^2 + c^2 a^2}",
        symbols: [
          { symbol: "\\(a, b, c\\)", meaning: "intercepts on the \\(X, Y, Z\\) axes" },
          { symbol: "\\(G\\)", meaning: "centroid of the triangle of intercepts" },
        ],
      },
      authoredExample: {
        prompt:
          "The plane \\(\\frac{x}{3} + \\frac{y}{2} - \\frac{z}{4} = 1\\) cuts the axes at \\(A, B, C\\). Find the area of \\(\\triangle ABC\\).",
        steps: [
          "Intercepts \\(a = 3, b = 2, c = -4\\).",
          "Area \\(= \\tfrac12\\sqrt{a^2b^2 + b^2c^2 + c^2a^2} = \\tfrac12\\sqrt{36 + 64 + 144} = \\tfrac12\\sqrt{244}\\).",
          "\\(\\sqrt{244} = 2\\sqrt{61}\\), so area \\(= \\tfrac12\\cdot 2\\sqrt{61} = \\sqrt{61}\\).",
        ],
        answer: "\\(\\sqrt{61}\\) sq. units",
      },
      pyqExampleId: "2a84ea2e-ce1f-4c76-8ef9-c7427d43c797",
      selfCheckExample: {
        prompt:
          "The plane \\(2x + 3y + 4z = 1\\) meets the X, Y, Z axes at \\(A, B, C\\). Find the centroid of \\(\\triangle ABC\\).",
        steps: [
          "Rewrite in intercept form: \\(\\frac{x}{1/2} + \\frac{y}{1/3} + \\frac{z}{1/4} = 1\\), so \\(a = \\tfrac12, b = \\tfrac13, c = \\tfrac14\\).",
          "Centroid \\(= \\left(\\tfrac{a}{3}, \\tfrac{b}{3}, \\tfrac{c}{3}\\right) = \\left(\\tfrac16, \\tfrac19, \\tfrac{1}{12}\\right)\\).",
        ],
        answer: "\\(\\left(\\tfrac16, \\tfrac19, \\tfrac{1}{12}\\right)\\)",
      },
      practiceSet: [
        { prompt: "X-intercept of \\(2x + 3y + 4z = 1\\)?", answer: "\\(\\tfrac12\\)", method: "set \\(y = z = 0\\)" },
        { prompt: "Centroid of intercept triangle with \\(a=3,b=3,c=3\\)?", answer: "\\((1,1,1)\\)" },
        { prompt: "Area when \\(a=b=c=1\\)?", answer: "\\(\\tfrac{\\sqrt3}{2}\\)", method: "\\(\\tfrac12\\sqrt{1+1+1}\\)" },
        { prompt: "Intercept form of \\(2x + 3y + 4z = 1\\)?", answer: "\\(\\frac{x}{1/2} + \\frac{y}{1/3} + \\frac{z}{1/4} = 1\\)" },
      ],
      traps: [
        {
          title: "Read intercepts from the form \\(\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1\\)",
          body:
            "For \\(2x + 3y + 4z = 1\\), the X-intercept is \\(\\tfrac12\\), NOT \\(2\\). Divide through to make the RHS exactly \\(1\\), then the denominators are the intercepts.",
        },
        {
          title: "Use the squared intercepts in the area formula",
          body:
            "Area \\(= \\tfrac12\\sqrt{a^2b^2 + b^2c^2 + c^2a^2}\\) — pairwise PRODUCTS of squares. A negative intercept like \\(c = -4\\) contributes \\(c^2 = 16\\); the sign drops out, but don't forget to square it.",
        },
      ],
    },

    // ── MIRROR IMAGE OF A POINT IN A PLANE ───────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-mirror-image",
      name: "Recovering a plane from a point and its mirror image",
      intuition:
        "If a point and its mirror image in a plane are both given, the plane is the perpendicular bisector of the segment joining them: it passes through their midpoint and has the segment as its normal. So this reduces to the perpendicular-bisector construction, run in reverse.",
      definition:
        "Given a point \\(P\\) and its **mirror image** \\(P'\\) in an unknown plane:\n" +
        "- The plane passes through the **midpoint** \\(M = \\tfrac12(P + P')\\).\n" +
        "- Its **normal** is \\(\\overrightarrow{PP'} = P' - P\\) (the segment is perpendicular to the plane).\n\n" +
        "Build the plane, then test which option-point satisfies it. (The fuller treatment of finding an image or foot of perpendicular lives on the *Foot of Perpendicular, Image, and Projection* page; here we only need this reverse construction.)",
      formula: {
        label: "Plane from point and its image",
        latex: "M = \\tfrac12(P + P'), \\quad \\vec{n} = P' - P, \\quad \\vec{n}\\cdot(\\vec{r} - \\vec{m}) = 0",
        symbols: [
          { symbol: "\\(P, P'\\)", meaning: "the point and its mirror image" },
          { symbol: "\\(M\\)", meaning: "midpoint — lies on the plane" },
        ],
      },
      authoredExample: {
        prompt:
          "The mirror image of \\((1,2,3)\\) in a plane is \\(\\left(-\\tfrac73, -\\tfrac43, -\\tfrac13\\right)\\). Find the plane, and verify it passes through \\((1,-1,1)\\).",
        steps: [
          "Midpoint \\(M = \\tfrac12\\left(1 - \\tfrac73,\\; 2 - \\tfrac43,\\; 3 - \\tfrac13\\right) = \\left(-\\tfrac13, \\tfrac13, \\tfrac43\\right)\\).",
          "Normal \\(\\overrightarrow{PP'} = \\left(-\\tfrac73 - 1,\\; -\\tfrac43 - 2,\\; -\\tfrac13 - 3\\right) = \\left(-\\tfrac{10}{3}, -\\tfrac{10}{3}, -\\tfrac{10}{3}\\right) \\propto (1,1,1)\\).",
          "Plane through \\(M\\): \\((x + \\tfrac13) + (y - \\tfrac13) + (z - \\tfrac43) = 0 \\Rightarrow x + y + z = \\tfrac43\\)... clearing, \\(x + y + z = 1\\). Check \\((1,-1,1)\\): \\(1 - 1 + 1 = 1\\) ✓.",
        ],
        answer: "Plane \\(x + y + z = 1\\); it passes through \\((1,-1,1)\\)",
      },
      pyqExampleId: "344bbfa3-25d2-48a3-a029-ecf120305753",
      selfCheckExample: {
        prompt:
          "The image of \\((0,0,0)\\) in a plane is \\((2,2,2)\\). Find the plane.",
        steps: [
          "Midpoint \\(M = (1,1,1)\\); normal \\(\\overrightarrow{PP'} = (2,2,2) \\propto (1,1,1)\\).",
          "Plane through \\(M\\): \\((x-1) + (y-1) + (z-1) = 0 \\Rightarrow x + y + z = 3\\).",
        ],
        answer: "\\(x + y + z = 3\\)",
      },
      practiceSet: [
        { prompt: "The plane is the ____ of the segment joining a point and its image.", answer: "perpendicular bisector" },
        { prompt: "Normal of the plane if \\(P = (1,2,3), P' = (3,2,3)\\)?", answer: "\\((1,0,0)\\)", method: "\\(P' - P = (2,0,0)\\)" },
        { prompt: "Midpoint of \\((1,2,3)\\) and \\((3,4,5)\\)?", answer: "\\((2,3,4)\\)" },
        { prompt: "Does the plane pass through \\(P\\) or through \\(M\\)?", answer: "through \\(M\\) (the midpoint)" },
      ],
      traps: [
        {
          title: "The normal is the segment, the plane is at the midpoint",
          body:
            "Use \\(\\overrightarrow{PP'}\\) as the normal and the MIDPOINT as the through-point — not \\(P\\) or \\(P'\\). Substituting an endpoint gives a plane parallel to the true one.",
        },
        {
          title: "Simplify the messy normal before testing option-points",
          body:
            "\\(\\left(-\\tfrac{10}{3}, -\\tfrac{10}{3}, -\\tfrac{10}{3}\\right)\\) is just \\((1,1,1)\\). Reduce first; then substituting each option-point to find which lies on \\(x + y + z = 1\\) is trivial arithmetic.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Foot of Perpendicular, Image, and Projection",
      href: "/notes/mht-cet-maths/line-and-plane/foot-perpendicular-image-projection",
    },
    {
      label: "Vectors — cross product and the normal",
      href: "/notes/mht-cet-maths/vectors",
    },
  ],
};
