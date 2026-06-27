import type { SubtopicNote } from "@/app/notes/_types";

export const LINE_EQUATION_NOTE: SubtopicNote = {
  subtopicName: "Line — Equation, Direction Cosines, and Vector Form",
  title: "Line — Equation, Direction Cosines, and Vector Form",
  oneLineDefinition:
    "How to describe a straight line in 3-D — through direction ratios and direction cosines (with l² + m² + n² = 1), in symmetric Cartesian form and vector form r = a + λb, and — the MHT-CET workhorse — how to find a line's direction as the cross product of two given directions (perpendicular to two lines, or parallel to / the intersection of two planes).",
  whyItMatters:
    "This is the densest single subtopic in Line and Plane — about 23 PYQs, leaning MODERATE-to-HARD. " +
    "ONE idea dominates the hard half: when a line must be perpendicular to two given directions, or parallel to two planes, or is the intersection of two planes, its direction vector is the CROSS PRODUCT of the two direction/normal vectors — the same 3×3 determinant every time. " +
    "The rest is conversion fluency: rewrite a non-standard Cartesian equation like 2x − 2 = 3y + 1 = 6z − 2 into symmetric form, read off a point and direction, and translate to vector form. Master the cross-product reflex plus the normalize-the-Cartesian-form drill and you own the subtopic.",
  concepts: [
    // ── FOUNDATION 1 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-dr-dc-identity",
      name: "Direction ratios, direction cosines, and the l² + m² + n² = 1 identity",
      visualizationSlug: "direction-cosines",
      intuition:
        "A line's direction is fixed by three numbers. The raw, unscaled triple \\((a, b, c)\\) is its **direction ratios** — any nonzero multiple points the same way. Normalise them to unit length and you get the **direction cosines** \\((l, m, n)\\): the cosines of the angles the line makes with the X, Y, Z axes. Because they are components of a UNIT vector, they always satisfy \\(l^2 + m^2 + n^2 = 1\\).",
      definition:
        "For a line with **direction ratios** \\((a, b, c)\\):\n" +
        "- The **direction cosines** are \\(l = \\dfrac{a}{\\sqrt{a^2+b^2+c^2}}\\), \\(m = \\dfrac{b}{\\sqrt{a^2+b^2+c^2}}\\), \\(n = \\dfrac{c}{\\sqrt{a^2+b^2+c^2}}\\), where \\(l = \\cos\\alpha\\), \\(m = \\cos\\beta\\), \\(n = \\cos\\gamma\\) and \\(\\alpha, \\beta, \\gamma\\) are the angles with the X, Y, Z axes.\n" +
        "- They always satisfy the **identity** \\(l^2 + m^2 + n^2 = 1\\), i.e. \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\).\n\n" +
        "So from any two of the three axis-angles you can recover the third, and a sign choice (\\(\\pm\\)) decides which of the two supplementary angles the line makes.",
      formula: {
        label: "Direction cosines and their identity",
        latex:
          "(l, m, n) = \\frac{(a, b, c)}{\\sqrt{a^2 + b^2 + c^2}}, \\qquad l^2 + m^2 + n^2 = \\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1",
        symbols: [
          { symbol: "\\((a, b, c)\\)", meaning: "direction ratios — any unscaled triple along the line" },
          { symbol: "\\((l, m, n)\\)", meaning: "direction cosines — the normalised (unit) triple" },
          { symbol: "\\(\\alpha, \\beta, \\gamma\\)", meaning: "angles the line makes with the X, Y, Z axes" },
        ],
      },
      authoredExample: {
        prompt:
          "A line makes angles \\(60^\\circ\\) with the X-axis and \\(45^\\circ\\) with the Z-axis. Find the acute angle it makes with the Y-axis.",
        steps: [
          "Use \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\) with \\(\\alpha = 60^\\circ\\), \\(\\gamma = 45^\\circ\\).",
          "\\(\\cos^2 60^\\circ + \\cos^2\\beta + \\cos^2 45^\\circ = 1 \\Rightarrow \\tfrac{1}{4} + \\cos^2\\beta + \\tfrac{1}{2} = 1\\).",
          "\\(\\cos^2\\beta = \\tfrac{1}{4} \\Rightarrow \\cos\\beta = \\pm\\tfrac{1}{2}\\). The acute angle is \\(\\beta = 60^\\circ\\).",
        ],
        answer: "\\(\\beta = 60^\\circ\\)",
      },
      selfCheckExample: {
        prompt:
          "A line has direction ratios \\((2, -1, 2)\\). Find its direction cosines.",
        steps: [
          "Magnitude: \\(\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3\\).",
          "Direction cosines: \\(\\left(\\tfrac{2}{3}, -\\tfrac{1}{3}, \\tfrac{2}{3}\\right)\\).",
          "Check: \\(\\tfrac{4}{9} + \\tfrac{1}{9} + \\tfrac{4}{9} = 1\\). \\(\\checkmark\\)",
        ],
        answer: "\\(\\left(\\tfrac{2}{3}, -\\tfrac{1}{3}, \\tfrac{2}{3}\\right)\\)",
      },
      practiceSet: [
        { prompt: "Direction cosines of a line with direction ratios \\((1, 2, 2)\\)?", answer: "\\(\\left(\\tfrac{1}{3}, \\tfrac{2}{3}, \\tfrac{2}{3}\\right)\\)" },
        { prompt: "If \\(l = \\tfrac{1}{2}, m = \\tfrac{1}{2}\\), find \\(n^2\\).", answer: "\\(\\tfrac{1}{2}\\)", method: "\\(n^2 = 1 - \\tfrac14 - \\tfrac14\\)" },
        { prompt: "A line makes \\(90^\\circ\\) with the X-axis. What is \\(l\\)?", answer: "\\(0\\)" },
        { prompt: "Can \\((l, m, n) = (\\tfrac{2}{3}, \\tfrac{2}{3}, \\tfrac{2}{3})\\) be direction cosines?", answer: "No", method: "sum of squares \\(= \\tfrac43 \\ne 1\\)" },
      ],
      pyqExampleId: "d6754bd6-1bb6-47e9-8b3a-de99061e50cd",
      traps: [
        {
          title: "Direction ratios are NOT direction cosines until you normalise",
          body:
            "\\((2, -1, 2)\\) are direction ratios; the direction cosines are \\((2, -1, 2)/3\\). The identity \\(l^2 + m^2 + n^2 = 1\\) holds only for the normalised triple — never for raw ratios.",
        },
        {
          title: "The \\(\\pm\\) sign decides acute vs obtuse",
          body:
            "Solving \\(\\cos^2\\gamma = \\tfrac14\\) gives \\(\\cos\\gamma = \\pm\\tfrac12\\), i.e. \\(\\gamma = 60^\\circ\\) OR \\(120^\\circ\\). Read the question: if it asks for the OBTUSE angle, take the negative root and report \\(120^\\circ\\), not \\(60^\\circ\\).",
        },
      ],
    },

    // ── FOUNDATION 2 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-symmetric-vector-form",
      name: "Symmetric Cartesian form and vector form of a line",
      intuition:
        "A line in 3-D is pinned down by ONE point on it and ONE direction. The **vector form** \\(\\vec{r} = \\vec{a} + \\lambda\\vec{b}\\) says \"start at \\(\\vec{a}\\), then walk any multiple \\(\\lambda\\) of \\(\\vec{b}\\).\" The **symmetric Cartesian form** is the same line with \\(\\lambda\\) eliminated — equating the three coordinate expressions. Translating between them is pure book-keeping: read the point, read the direction.",
      definition:
        "A line through point \\(A(x_1, y_1, z_1)\\) with direction ratios \\((a, b, c)\\):\n" +
        "- **Vector form:** \\(\\vec{r} = \\vec{a} + \\lambda\\vec{b}\\), where \\(\\vec{a} = x_1\\hat{i} + y_1\\hat{j} + z_1\\hat{k}\\) is the position vector of \\(A\\) and \\(\\vec{b} = a\\hat{i} + b\\hat{j} + c\\hat{k}\\) is the direction.\n" +
        "- **Symmetric (Cartesian) form:** \\(\\dfrac{x - x_1}{a} = \\dfrac{y - y_1}{b} = \\dfrac{z - z_1}{c}\\).\n\n" +
        "To convert: the constants in the numerators give the **point**, the denominators give the **direction**. The two forms describe exactly the same line.",
      formula: {
        label: "Symmetric and vector form",
        latex:
          "\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c} \\quad\\Longleftrightarrow\\quad \\vec{r} = \\vec{a} + \\lambda\\vec{b}",
        symbols: [
          { symbol: "\\((x_1, y_1, z_1)\\)", meaning: "a fixed point on the line (the numerators)" },
          { symbol: "\\((a, b, c)\\)", meaning: "direction ratios of the line (the denominators)" },
          { symbol: "\\(\\lambda\\)", meaning: "scalar parameter sweeping along the line" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the vector equation of the line \\(\\dfrac{x-3}{2} = \\dfrac{y+1}{-4} = \\dfrac{z-5}{1}\\).",
        steps: [
          "Read the point from the numerators: \\(A(3, -1, 5)\\), so \\(\\vec{a} = 3\\hat{i} - \\hat{j} + 5\\hat{k}\\).",
          "Read the direction from the denominators: \\(\\vec{b} = 2\\hat{i} - 4\\hat{j} + \\hat{k}\\).",
          "Assemble: \\(\\vec{r} = (3\\hat{i} - \\hat{j} + 5\\hat{k}) + \\lambda(2\\hat{i} - 4\\hat{j} + \\hat{k})\\).",
        ],
        answer: "\\(\\vec{r} = (3\\hat{i} - \\hat{j} + 5\\hat{k}) + \\lambda(2\\hat{i} - 4\\hat{j} + \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the vector equation of the line whose Cartesian form is \\(y = 2,\\ 4x - 3z + 5 = 0\\).",
        steps: [
          "\\(y = 2\\) is constant; rewrite the other relation: \\(4x = 3z - 5 \\Rightarrow \\dfrac{x}{3} = \\dfrac{z - 5/3}{4}\\).",
          "A point: \\(\\left(0, 2, \\tfrac{5}{3}\\right)\\); direction \\((3, 0, 4)\\) (the \\(y\\)-component is 0 since \\(y\\) is fixed).",
          "Vector form: \\(\\vec{r} = 2\\hat{j} + \\tfrac{5}{3}\\hat{k} + \\lambda(3\\hat{i} + 4\\hat{k})\\).",
        ],
        answer: "\\(\\vec{r} = 2\\hat{j} + \\tfrac{5}{3}\\hat{k} + \\lambda(3\\hat{i} + 4\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Direction of the line \\(\\dfrac{x-1}{4} = \\dfrac{y}{-2} = \\dfrac{z+3}{5}\\)?", answer: "\\((4, -2, 5)\\)" },
        { prompt: "A point on \\(\\dfrac{x+2}{1} = \\dfrac{y-7}{3} = \\dfrac{z}{6}\\)?", answer: "\\((-2, 7, 0)\\)" },
        { prompt: "Vector form of \\(\\dfrac{x}{1} = \\dfrac{y-1}{1} = \\dfrac{z-2}{1}\\)?", answer: "\\(\\vec{r} = (\\hat{j} + 2\\hat{k}) + \\lambda(\\hat{i} + \\hat{j} + \\hat{k})\\)" },
        { prompt: "In \\(\\vec{r} = \\vec{a} + \\lambda\\vec{b}\\), which vector gives the direction?", answer: "\\(\\vec{b}\\)" },
      ],
      pyqExampleId: "8ab3b80c-e809-409b-babc-303d85b41096",
      traps: [
        {
          title: "Numerators give the point, denominators give the direction — don't swap them",
          body:
            "In \\(\\dfrac{x-3}{2} = \\cdots\\) the point coordinate is \\(+3\\) (sign flipped from \\(x - 3\\)) and the direction is \\(2\\). A frequent slip is reading the denominator as part of the point or carrying the wrong sign on the constant.",
        },
        {
          title: "A fixed coordinate means a zero direction component",
          body:
            "For \\(y = 2\\), the line never moves in \\(y\\), so the direction's \\(\\hat{j}\\)-component is \\(0\\) — the direction is \\((3, 0, 4)\\), not \\((3, 2, 4)\\). The constant \\(2\\) belongs to the POINT, not the direction.",
        },
      ],
    },

    // ── FOUNDATION 3 ─────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-through-two-points",
      name: "Line through two points",
      visualizationSlug: "position-displacement",
      intuition:
        "Two points fix a line. The direction is simply the displacement from one to the other — head minus tail, \\(B - A\\). Take that as the direction and either point as the base, and you have the whole line. \"Parallel to the line joining \\(P\\) and \\(Q\\)\" means the same thing: just borrow the direction \\(Q - P\\).",
      definition:
        "The line through points \\(A(\\vec{a})\\) and \\(B(\\vec{b})\\) has:\n" +
        "- **Direction** \\(\\vec{b} - \\vec{a}\\) (head minus tail).\n" +
        "- **Vector form** \\(\\vec{r} = \\vec{a} + \\lambda(\\vec{b} - \\vec{a})\\).\n\n" +
        "A line **parallel** to \\(AB\\) but passing through a different point \\(P(\\vec{p})\\) keeps the same direction: \\(\\vec{r} = \\vec{p} + \\lambda(\\vec{b} - \\vec{a})\\).",
      formula: {
        label: "Direction from two points",
        latex: "\\vec{r} = \\vec{a} + \\lambda(\\vec{b} - \\vec{a})",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of the two points" },
          { symbol: "\\(\\vec{b} - \\vec{a}\\)", meaning: "the line's direction (displacement \\(A \\to B\\))" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the vector equation of the line through \\((3, 0, -2)\\) parallel to the line joining \\(P(2\\hat{i} - \\hat{j} + \\hat{k})\\) and \\(Q(4\\hat{i} + 3\\hat{j} - \\hat{k})\\).",
        steps: [
          "Direction \\(= Q - P = (4\\hat{i} + 3\\hat{j} - \\hat{k}) - (2\\hat{i} - \\hat{j} + \\hat{k}) = 2\\hat{i} + 4\\hat{j} - 2\\hat{k}\\).",
          "Base point given: \\(\\vec{p} = 3\\hat{i} - 2\\hat{k}\\).",
          "Line: \\(\\vec{r} = (3\\hat{i} - 2\\hat{k}) + \\lambda(2\\hat{i} + 4\\hat{j} - 2\\hat{k})\\).",
        ],
        answer: "\\(\\vec{r} = (3\\hat{i} - 2\\hat{k}) + \\lambda(2\\hat{i} + 4\\hat{j} - 2\\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the direction ratios of the line joining \\(A(1, 4, 2)\\) and \\(B(-1, 4, 5)\\).",
        steps: [
          "Direction \\(= B - A = (-1 - 1,\\ 4 - 4,\\ 5 - 2) = (-2, 0, 3)\\).",
        ],
        answer: "\\((-2, 0, 3)\\)",
      },
      practiceSet: [
        { prompt: "Direction of the line through \\((0,0,0)\\) and \\((2,3,6)\\)?", answer: "\\((2, 3, 6)\\)" },
        { prompt: "Direction of the line joining \\((5,1,2)\\) and \\((5,4,2)\\)?", answer: "\\((0, 3, 0)\\)", method: "only \\(y\\) changes" },
        { prompt: "Is the direction \\(A \\to B\\) the same as \\(B \\to A\\)?", answer: "No — it reverses sign" },
        { prompt: "Direction of the line joining \\(\\hat{i} + \\hat{j}\\) and \\(3\\hat{i} - \\hat{j} + 2\\hat{k}\\)?", answer: "\\((2, -2, 2)\\)" },
      ],
      pyqExampleId: "09fc224e-914b-4ef8-87b6-f0aaddf99612",
      traps: [
        {
          title: "Head minus tail — keep the order consistent",
          body:
            "Direction is \\(\\vec{b} - \\vec{a}\\); reversing gives the opposite direction. For a line that is fine (a line has no preferred sense), but the option must MATCH a scalar multiple of your direction — a sign flip on only some components is a different vector.",
        },
        {
          title: "\"Parallel to the line joining P, Q\" ≠ \"through P or Q\"",
          body:
            "Borrow only the DIRECTION \\(Q - P\\); the base point is the separately-given point. Plugging \\(P\\) or \\(Q\\) in as the base point gives the wrong line.",
        },
      ],
    },

    // ── CORE 1 (Cartesian normalisation) ─────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-cartesian-normalize",
      name: "Normalising a non-standard Cartesian equation",
      intuition:
        "MHT-CET loves to disguise a line as \\(2x - 2 = 3y + 1 = 6z - 2\\). This is NOT yet in symmetric form — the coefficients of \\(x, y, z\\) aren't 1. The fix is mechanical: in each piece factor out the coefficient so the variable appears alone, which exposes the true point and rescales the direction ratios. Then clear the fractions to get clean integer direction ratios.",
      definition:
        "Given \\(px - p_0 = qy - q_0 = rz - r_0\\) (the \\(x, y, z\\) coefficients \\(p, q, r\\) are not 1):\n" +
        "- Factor each piece: \\(p\\left(x - \\tfrac{p_0}{p}\\right) = q\\left(y - \\tfrac{q_0}{q}\\right) = r\\left(z - \\tfrac{r_0}{r}\\right)\\).\n" +
        "- Divide through to symmetric form: \\(\\dfrac{x - p_0/p}{1/p} = \\dfrac{y - q_0/q}{1/q} = \\dfrac{z - r_0/r}{1/r}\\).\n\n" +
        "So the **point** is \\(\\left(\\tfrac{p_0}{p}, \\tfrac{q_0}{q}, \\tfrac{r_0}{r}\\right)\\) and the **direction ratios** are \\(\\left(\\tfrac{1}{p}, \\tfrac{1}{q}, \\tfrac{1}{r}\\right)\\) — multiply by the LCM to make them integers.",
      formula: {
        label: "Reduce to symmetric form",
        latex:
          "px - p_0 = qy - q_0 = rz - r_0 \\;\\Rightarrow\\; \\frac{x - p_0/p}{1/p} = \\frac{y - q_0/q}{1/q} = \\frac{z - r_0/r}{1/r}",
        symbols: [
          { symbol: "point", meaning: "\\(\\left(\\tfrac{p_0}{p}, \\tfrac{q_0}{q}, \\tfrac{r_0}{r}\\right)\\)" },
          { symbol: "direction", meaning: "\\(\\left(\\tfrac{1}{p}, \\tfrac{1}{q}, \\tfrac{1}{r}\\right)\\), scaled to integers" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the vector equation of the line \\(2x - 2 = 3y + 1 = 6z - 2\\).",
        steps: [
          "Factor each piece: \\(2(x - 1) = 3\\left(y + \\tfrac{1}{3}\\right) = 6\\left(z - \\tfrac{1}{3}\\right)\\).",
          "Symmetric form: \\(\\dfrac{x - 1}{1/2} = \\dfrac{y + 1/3}{1/3} = \\dfrac{z - 1/3}{1/6}\\). Point \\(\\left(1, -\\tfrac{1}{3}, \\tfrac{1}{3}\\right)\\).",
          "Direction ratios \\(\\left(\\tfrac{1}{2}, \\tfrac{1}{3}, \\tfrac{1}{6}\\right)\\); multiply by 6 \\(\\to (3, 2, 1)\\).",
          "Vector form: \\(\\vec{r} = \\left(\\hat{i} - \\tfrac{1}{3}\\hat{j} + \\tfrac{1}{3}\\hat{k}\\right) + \\lambda(3\\hat{i} + 2\\hat{j} + \\hat{k})\\).",
        ],
        answer:
          "\\(\\vec{r} = \\left(\\hat{i} - \\tfrac{1}{3}\\hat{j} + \\tfrac{1}{3}\\hat{k}\\right) + \\lambda(3\\hat{i} + 2\\hat{j} + \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "Reduce \\(6x - 2 = 3y + 1 = 2z - 2\\) to vector form.",
        steps: [
          "Factor: \\(6\\left(x - \\tfrac{1}{3}\\right) = 3\\left(y + \\tfrac{1}{3}\\right) = 2(z - 1)\\).",
          "Point \\(\\left(\\tfrac{1}{3}, -\\tfrac{1}{3}, 1\\right)\\); direction ratios \\(\\left(\\tfrac{1}{6}, \\tfrac{1}{3}, \\tfrac{1}{2}\\right) \\times 6 = (1, 2, 3)\\).",
          "Vector form: \\(\\vec{r} = \\tfrac{1}{3}\\hat{i} - \\tfrac{1}{3}\\hat{j} + \\hat{k} + \\lambda(\\hat{i} + 2\\hat{j} + 3\\hat{k})\\).",
        ],
        answer:
          "\\(\\vec{r} = \\tfrac{1}{3}\\hat{i} - \\tfrac{1}{3}\\hat{j} + \\hat{k} + \\lambda(\\hat{i} + 2\\hat{j} + 3\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "Point on the line \\(3x - 3 = 2y + 4 = z\\)?", answer: "\\(\\left(1, -2, 0\\right)\\)", method: "set each piece \\(= 0\\)" },
        { prompt: "Integer direction ratios from \\(\\left(\\tfrac{1}{2}, \\tfrac{1}{3}, \\tfrac{1}{6}\\right)\\)?", answer: "\\((3, 2, 1)\\)", method: "\\(\\times 6\\)" },
        { prompt: "Direction of \\(4x = 3y = 2z\\)?", answer: "\\((3, 4, 6)\\)", method: "ratios \\(\\tfrac14:\\tfrac13:\\tfrac12 \\times 12\\)" },
        { prompt: "Is \\(2x - 2 = 3y + 1 = 6z - 2\\) already in symmetric form?", answer: "No — coefficients of \\(x,y,z\\) are not 1" },
      ],
      pyqExampleId: "49b619ff-64bb-4044-9ce3-41279f6d3138",
      traps: [
        {
          title: "You must factor BEFORE reading the point",
          body:
            "From \\(2x - 2 = \\cdots\\), the point coordinate is \\(x = 1\\) (set \\(2x - 2 = 0\\)), NOT \\(x = 2\\) and NOT \\(x = -2\\). Factor out the coefficient first; the constant alone is misleading.",
        },
        {
          title: "Direction ratios are the RECIPROCALS of the coefficients",
          body:
            "For \\(2x = 3y = 6z\\) the direction is \\(\\left(\\tfrac12, \\tfrac13, \\tfrac16\\right) \\propto (3, 2, 1)\\) — the reciprocal pattern. The classic distractor leaves the direction as the coefficients \\((2, 3, 6)\\), which points the wrong way.",
        },
      ],
    },

    // ── CORE 2 (THE WORKHORSE — cross product) ───────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-direction-cross-product",
      name: "Direction as a cross product: ⊥ two lines, ∥ two planes, intersection of two planes",
      visualizationSlug: "unit-normal-vector",
      intuition:
        "This single reflex answers the hardest and most common questions in the subtopic. Whenever a line's direction must be PERPENDICULAR to two given directions, that direction is their **cross product** \\(\\vec{d}_1 \\times \\vec{d}_2\\). Three disguises of the same idea: " +
        "(1) a line perpendicular to two given lines → cross the two lines' directions; " +
        "(2) a line parallel to two planes → it's perpendicular to both normals, so cross the two NORMALS; " +
        "(3) the line of intersection of two planes → it lies in both, hence perpendicular to both normals, so again cross the normals.",
      definition:
        "Compute the direction via the \\(3 \\times 3\\) determinant:\n" +
        "\\[\\vec{d} = \\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}\\]\n" +
        "where \\(\\vec{u}, \\vec{v}\\) are:\n" +
        "- the **two lines' direction vectors** (for a line \\(\\perp\\) both lines, or perpendicular to two given vectors), OR\n" +
        "- the **two planes' normal vectors** \\(\\vec{n}_1, \\vec{n}_2\\) (for a line parallel to both planes, or the intersection of the two planes).\n\n" +
        "For a plane \\(ax + by + cz = d\\), the normal is \\((a, b, c)\\). The resulting \\(\\vec{d}\\) gives the direction ratios directly; divide by \\(|\\vec{d}|\\) for direction cosines or a unit vector.",
      formula: {
        label: "Cross product (determinant expansion)",
        latex:
          "\\vec{u} \\times \\vec{v} = (u_2 v_3 - u_3 v_2)\\,\\hat{i} - (u_1 v_3 - u_3 v_1)\\,\\hat{j} + (u_1 v_2 - u_2 v_1)\\,\\hat{k}",
        symbols: [
          { symbol: "\\(\\vec{u}, \\vec{v}\\)", meaning: "the two directions (line directions or plane normals)" },
          { symbol: "\\(\\hat{j}\\) term", meaning: "carries a MINUS sign — the cofactor expansion's alternating sign" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the equation of the line through \\((2, 1, -1)\\) and parallel to the planes \\(x + 2y - z = 3\\) and \\(2x - y + z = 4\\).",
        steps: [
          "Normals: \\(\\vec{n}_1 = (1, 2, -1)\\), \\(\\vec{n}_2 = (2, -1, 1)\\). The line is parallel to both planes, so \\(\\perp\\) both normals.",
          "Direction \\(= \\vec{n}_1 \\times \\vec{n}_2 = \\big((2)(1) - (-1)(-1),\\ -[(1)(1) - (-1)(2)],\\ (1)(-1) - (2)(2)\\big)\\).",
          "\\(= (2 - 1,\\ -(1 + 2),\\ -1 - 4) = (1, -3, -5)\\).",
          "Line: \\(\\dfrac{x - 2}{1} = \\dfrac{y - 1}{-3} = \\dfrac{z + 1}{-5}\\).",
        ],
        answer: "\\(\\dfrac{x - 2}{1} = \\dfrac{y - 1}{-3} = \\dfrac{z + 1}{-5}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the equation of the line through \\((1, 2, 3)\\) perpendicular to the lines \\(\\dfrac{x-2}{3} = \\dfrac{y-1}{2} = \\dfrac{z+1}{-2}\\) and \\(\\dfrac{x}{2} = \\dfrac{y}{-3} = \\dfrac{z}{1}\\).",
        steps: [
          "Directions: \\(\\vec{d}_1 = (3, 2, -2)\\), \\(\\vec{d}_2 = (2, -3, 1)\\).",
          "\\(\\vec{d}_1 \\times \\vec{d}_2 = \\big((2)(1) - (-2)(-3),\\ -[(3)(1) - (-2)(2)],\\ (3)(-3) - (2)(2)\\big) = (2 - 6,\\ -(3 + 4),\\ -9 - 4) = (-4, -7, -13)\\).",
          "Line: \\(\\vec{r} = (\\hat{i} + 2\\hat{j} + 3\\hat{k}) + \\lambda(-4\\hat{i} - 7\\hat{j} - 13\\hat{k})\\).",
        ],
        answer: "\\(\\vec{r} = (\\hat{i} + 2\\hat{j} + 3\\hat{k}) + \\lambda(-4\\hat{i} - 7\\hat{j} - 13\\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "\\((1, 0, 0) \\times (0, 1, 0) = ?\\)", answer: "\\((0, 0, 1)\\)" },
        { prompt: "Normal of the plane \\(3x - y + 2z = 7\\)?", answer: "\\((3, -1, 2)\\)" },
        { prompt: "Direction of the intersection of \\(x = 0\\) and \\(y = 0\\) (the YZ and XZ planes)?", answer: "\\((0, 0, 1)\\)", method: "\\((1,0,0)\\times(0,1,0)\\)" },
        { prompt: "\\(\\vec{d}_1 \\times \\vec{d}_2\\) for \\(\\vec{d}_1 = (1,1,0), \\vec{d}_2 = (0,1,1)\\)?", answer: "\\((1, -1, 1)\\)" },
      ],
      pyqExampleId: "f8dcd766-6e55-43bf-b5e0-e8658c99daec",
      traps: [
        {
          title: "Parallel to two PLANES → cross the NORMALS, not the planes",
          body:
            "A line parallel to two planes is perpendicular to both normals, so its direction is \\(\\vec{n}_1 \\times \\vec{n}_2\\). Likewise the line of intersection of two planes uses \\(\\vec{n}_1 \\times \\vec{n}_2\\). Don't confuse a plane's normal \\((a,b,c)\\) with the plane itself.",
        },
        {
          title: "The \\(\\hat{j}\\) component flips sign",
          body:
            "The middle term of \\(\\vec{u} \\times \\vec{v}\\) is \\(-(u_1 v_3 - u_3 v_1)\\). Dropping that minus sign is the single most common cross-product error — and the wrong-sign option is always sitting right there as a distractor.",
        },
        {
          title: "Direction ratios are only defined up to a scalar",
          body:
            "\\((−4, −7, −13)\\) and \\((4, 7, 13)\\) point along the same line, and \\((2, -7, 4)\\) equals \\((4, -14, 8)/2\\). When matching options, scale your answer before declaring it absent — a common multiple may be the listed choice.",
        },
      ],
    },

    // ── CORE 3 (unit vector ⊥ two lines) ─────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-unit-vector",
      name: "Unit vector perpendicular to two lines",
      intuition:
        "Same cross-product engine, one extra step. After you find \\(\\vec{d} = \\vec{d}_1 \\times \\vec{d}_2\\) (perpendicular to both lines), the QUESTION often wants the UNIT vector — so divide by \\(|\\vec{d}|\\). The hard part is arithmetic discipline: get the cross product's signs right, then compute the magnitude correctly.",
      definition:
        "The unit vector perpendicular to two lines with directions \\(\\vec{d}_1, \\vec{d}_2\\) is\n" +
        "\\[\\hat{n} = \\frac{\\vec{d}_1 \\times \\vec{d}_2}{|\\vec{d}_1 \\times \\vec{d}_2|}.\\]\n" +
        "Compute \\(\\vec{d}_1 \\times \\vec{d}_2\\) by the determinant, then \\(|\\vec{d}| = \\sqrt{d_x^2 + d_y^2 + d_z^2}\\). There are TWO unit normals, \\(\\pm\\hat{n}\\); match the sign pattern of the given options.",
      formula: {
        label: "Unit normal to two lines",
        latex: "\\hat{n} = \\frac{\\vec{d}_1 \\times \\vec{d}_2}{|\\vec{d}_1 \\times \\vec{d}_2|}",
        symbols: [
          { symbol: "\\(\\vec{d}_1 \\times \\vec{d}_2\\)", meaning: "vector perpendicular to both lines" },
          { symbol: "\\(|\\vec{d}_1 \\times \\vec{d}_2|\\)", meaning: "its magnitude — divide to normalise" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a unit vector perpendicular to the lines with directions \\(\\vec{d}_1 = (5, 2, 1)\\) and \\(\\vec{d}_2 = (4, 3, 5)\\).",
        steps: [
          "\\(\\vec{d}_1 \\times \\vec{d}_2 = \\big((2)(5) - (1)(3),\\ -[(5)(5) - (1)(4)],\\ (5)(3) - (2)(4)\\big) = (10 - 3,\\ -(25 - 4),\\ 15 - 8) = (7, -21, 7)\\).",
          "Factor: \\((7, -21, 7) = 7(1, -3, 1)\\), so use direction \\((1, -3, 1)\\).",
          "Magnitude: \\(\\sqrt{1 + 9 + 1} = \\sqrt{11}\\).",
          "Unit vector: \\(\\dfrac{1}{\\sqrt{11}}(\\hat{i} - 3\\hat{j} + \\hat{k})\\).",
        ],
        answer: "\\(\\dfrac{\\hat{i} - 3\\hat{j} + \\hat{k}}{\\sqrt{11}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find a unit vector perpendicular to both lines whose directions are \\((3, 1, 2)\\) and \\((1, 2, 3)\\).",
        steps: [
          "Cross product: \\(\\big((1)(3) - (2)(2),\\ -[(3)(3) - (2)(1)],\\ (3)(2) - (1)(1)\\big) = (3 - 4,\\ -(9 - 2),\\ 6 - 1) = (-1, -7, 5)\\).",
          "Magnitude: \\(\\sqrt{1 + 49 + 25} = \\sqrt{75} = 5\\sqrt{3}\\).",
          "Unit vector: \\(\\dfrac{-\\hat{i} - 7\\hat{j} + 5\\hat{k}}{5\\sqrt{3}}\\).",
        ],
        answer: "\\(\\dfrac{-\\hat{i} - 7\\hat{j} + 5\\hat{k}}{5\\sqrt{3}}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\vec{d}_1 \\times \\vec{d}_2 = (2, -1, 2)\\), the unit normal is?", answer: "\\(\\tfrac{1}{3}(2, -1, 2)\\)", method: "\\(|\\vec{d}| = 3\\)" },
        { prompt: "Magnitude of \\((5, -7, -1)\\)?", answer: "\\(5\\sqrt{3}\\)", method: "\\(\\sqrt{25 + 49 + 1} = \\sqrt{75}\\)" },
        { prompt: "How many unit vectors are perpendicular to two given (non-parallel) lines?", answer: "Two — \\(\\pm\\hat{n}\\)" },
        { prompt: "Unit vector along \\((7, -21, 7)\\)?", answer: "\\(\\tfrac{1}{\\sqrt{11}}(1, -3, 1)\\)", method: "factor 7 first" },
      ],
      pyqExampleId: "b5e0648e-941f-4d39-983b-4eab5dc2c6d3",
      traps: [
        {
          title: "Factor the cross product before normalising",
          body:
            "\\((7, -21, 7) = 7(1, -3, 1)\\). Normalising the unfactored vector still works (\\(\\sqrt{49 + 441 + 49} = 7\\sqrt{11}\\)), but factoring first turns the magnitude into the clean \\(\\sqrt{11}\\) the options use and avoids arithmetic slips.",
        },
        {
          title: "Both signs are valid — read the option set",
          body:
            "\\(+\\hat{n}\\) and \\(-\\hat{n}\\) are both perpendicular to the two lines. The bank's key picks ONE; match the sign pattern of the cross product exactly (especially that flipped \\(\\hat{j}\\) sign) rather than assuming all-positive.",
        },
      ],
    },

    // ── CORE 4 (angle with an axis / equal inclination) ──────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-axis-angle",
      name: "Angle a line makes with an axis; equal inclination",
      visualizationSlug: "direction-cosines",
      intuition:
        "The cosine of the angle a line makes with an axis is just that axis's direction cosine. With the X-axis it's \\(l = a/|\\vec{d}|\\); similarly \\(m, n\\) for Y, Z. A line **equally inclined** to all three axes has equal direction cosines, which forces equal direction RATIOS — \\((1, 1, 1)\\) up to sign and scale.",
      definition:
        "For a line with direction \\(\\vec{d} = (a, b, c)\\):\n" +
        "- Angle \\(\\alpha\\) with the **X-axis**: \\(\\cos\\alpha = \\dfrac{a}{\\sqrt{a^2 + b^2 + c^2}}\\). Similarly \\(\\cos\\beta = \\dfrac{b}{|\\vec{d}|}\\), \\(\\cos\\gamma = \\dfrac{c}{|\\vec{d}|}\\).\n" +
        "- **Equally inclined to all axes:** \\(|a| = |b| = |c|\\); each \\(\\cos = \\dfrac{1}{\\sqrt{3}}\\), so the angle is \\(\\cos^{-1}\\tfrac{1}{\\sqrt 3}\\).\n\n" +
        "When a line is the intersection of two planes, first get its direction \\(\\vec{n}_1 \\times \\vec{n}_2\\), then take \\(\\cos\\alpha = a/|\\vec{d}|\\).",
      formula: {
        label: "Angle with an axis",
        latex:
          "\\cos\\alpha = \\frac{a}{\\sqrt{a^2 + b^2 + c^2}}, \\qquad \\text{equally inclined} \\Rightarrow |a| = |b| = |c|,\\ \\cos = \\tfrac{1}{\\sqrt 3}",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "angle between the line and the X-axis" },
          { symbol: "\\(a\\)", meaning: "the X-direction ratio of the line" },
        ],
      },
      authoredExample: {
        prompt:
          "The line of intersection of the planes \\(2x + 3y + z = 1\\) and \\(x + 3y + 2z = 2\\) makes an angle \\(\\alpha\\) with the positive X-axis. Find \\(\\cos\\alpha\\).",
        steps: [
          "Direction \\(= \\vec{n}_1 \\times \\vec{n}_2 = (2,3,1) \\times (1,3,2) = \\big((3)(2)-(1)(3),\\ -[(2)(2)-(1)(1)],\\ (2)(3)-(3)(1)\\big) = (3, -3, 3)\\).",
          "Magnitude: \\(|\\vec{d}| = \\sqrt{9 + 9 + 9} = 3\\sqrt{3}\\).",
          "\\(\\cos\\alpha = \\dfrac{a}{|\\vec{d}|} = \\dfrac{3}{3\\sqrt 3} = \\dfrac{1}{\\sqrt 3}\\).",
        ],
        answer: "\\(\\cos\\alpha = \\dfrac{1}{\\sqrt 3}\\)",
      },
      selfCheckExample: {
        prompt:
          "Triangle with \\(A(2, 3, 5)\\), \\(B(-1, 3, 2)\\), \\(C(\\lambda, 5, \\mu)\\). The median through \\(A\\) is equally inclined to the coordinate axes. Find \\(\\lambda + \\mu\\).",
        steps: [
          "Midpoint of \\(BC\\): \\(M = \\left(\\tfrac{-1 + \\lambda}{2},\\ 4,\\ \\tfrac{2 + \\mu}{2}\\right)\\).",
          "Median direction \\(\\overrightarrow{AM} = \\left(\\tfrac{\\lambda - 1}{2} - 2,\\ 4 - 3,\\ \\tfrac{\\mu + 2}{2} - 5\\right) = \\left(\\tfrac{\\lambda - 5}{2},\\ 1,\\ \\tfrac{\\mu - 8}{2}\\right)\\).",
          "Equally inclined \\(\\Rightarrow\\) all components equal \\(\\Rightarrow \\tfrac{\\lambda - 5}{2} = 1\\) and \\(\\tfrac{\\mu - 8}{2} = 1 \\Rightarrow \\lambda = 7,\\ \\mu = 10\\).",
          "\\(\\lambda + \\mu = 17\\).",
        ],
        answer: "\\(\\lambda + \\mu = 17\\)",
      },
      practiceSet: [
        { prompt: "Angle of \\((1, 1, 1)\\) with each axis?", answer: "\\(\\cos^{-1}\\tfrac{1}{\\sqrt 3}\\)" },
        { prompt: "\\(\\cos\\alpha\\) (with X-axis) for direction \\((2, 1, 2)\\)?", answer: "\\(\\tfrac{2}{3}\\)", method: "\\(a/|\\vec d| = 2/3\\)" },
        { prompt: "Equal inclination to all axes forces which direction ratios?", answer: "\\((1, 1, 1)\\) up to sign/scale" },
        { prompt: "Direction making \\(45^\\circ\\) with X and Z, \\(90^\\circ\\) with Y?", answer: "\\((1, 0, 1)\\)" },
      ],
      pyqExampleId: "74b978ab-2417-42ad-93e3-7eddee491eba",
      traps: [
        {
          title: "Divide by the magnitude — \\(\\cos\\alpha = a/|\\vec{d}|\\), not \\(a\\) alone",
          body:
            "For direction \\((3, -3, 3)\\), \\(\\cos\\alpha = 3/(3\\sqrt 3) = 1/\\sqrt 3\\), NOT \\(3\\). The cosine is the NORMALISED first component (the direction cosine), so always divide by \\(|\\vec{d}|\\).",
        },
        {
          title: "\"Equally inclined\" means equal magnitudes, watch the signs",
          body:
            "Equal inclination forces \\(|a| = |b| = |c|\\), but signs can differ if the question specifies acute/obtuse angles with particular axes. For the basic case take all components equal and positive.",
        },
      ],
    },

    // ── ADVANCED (DC constraint system) ──────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-dc-constraint-system",
      name: "Direction cosines from a linear + quadratic constraint pair",
      intuition:
        "The hardest item type: you're given TWO relations between \\(l, m, n\\) — one linear, one quadratic (often involving the missing third relation \\(l^2 + m^2 + n^2 = 1\\) implicitly). Use the linear one to eliminate a variable, substitute into the quadratic to get a single-variable quadratic, solve for the RATIO \\(l : m : n\\), then normalise to actual direction cosines.",
      definition:
        "Given a **linear** relation (e.g. \\(l - 5m + 3n = 0\\)) and a **quadratic** relation (e.g. \\(7l^2 + 5m^2 - 3n^2 = 0\\)):\n" +
        "- Solve the linear relation for one variable, say \\(l = 5m - 3n\\).\n" +
        "- Substitute into the quadratic → a homogeneous quadratic in \\(m, n\\) → factor for the ratio \\(m : n\\) (two cases).\n" +
        "- Back-substitute to get the full ratio \\(l : m : n\\) for each case, then **normalise** (divide by \\(\\sqrt{l^2 + m^2 + n^2}\\)) to get genuine direction cosines.\n\n" +
        "Two ratios usually emerge, so there are two valid lines — the answer often lists both.",
      formula: {
        label: "Method (linear eliminate, quadratic factor, normalise)",
        latex:
          "l = 5m - 3n \\;\\xrightarrow{\\text{sub}}\\; \\text{quadratic in } m, n \\;\\Rightarrow\\; l : m : n \\;\\xrightarrow{\\div\\sqrt{l^2+m^2+n^2}}\\; (l, m, n)",
        symbols: [
          { symbol: "linear", meaning: "eliminate one of \\(l, m, n\\)" },
          { symbol: "quadratic", meaning: "factor for the surviving ratio (two roots → two lines)" },
        ],
      },
      authoredExample: {
        prompt:
          "If the direction cosines \\(l, m, n\\) satisfy \\(l + m + n = 0\\) and \\(2lm + 2ln - mn = 0\\), find the ratio \\(l : m : n\\) for one solution.",
        steps: [
          "From the linear relation: \\(l = -(m + n)\\).",
          "Substitute: \\(2(-(m+n))m + 2(-(m+n))n - mn = 0 \\Rightarrow -2m^2 - 2mn - 2mn - 2n^2 - mn = 0\\).",
          "\\(-2m^2 - 5mn - 2n^2 = 0 \\Rightarrow 2m^2 + 5mn + 2n^2 = 0 \\Rightarrow (2m + n)(m + 2n) = 0\\).",
          "Case \\(n = -2m\\): then \\(l = -(m - 2m) = m\\), so \\(l : m : n = 1 : 1 : -2\\).",
        ],
        answer: "\\(l : m : n = 1 : 1 : -2\\) (one solution)",
      },
      selfCheckExample: {
        prompt:
          "Direction cosines \\(l, m, n\\) satisfy \\(l = 5m - 3n\\) and \\(7l^2 + 5m^2 - 3n^2 = 0\\). Find \\(l + m + n\\) for the case \\(l : m : n = 1 : 2 : 3\\).",
        steps: [
          "Check the ratio satisfies both: linear \\(1 = 5(2) - 3(3) = 10 - 9 = 1\\) \\(\\checkmark\\); quadratic \\(7(1) + 5(4) - 3(9) = 7 + 20 - 27 = 0\\) \\(\\checkmark\\).",
          "Normalise: \\(|\\vec{d}| = \\sqrt{1 + 4 + 9} = \\sqrt{14}\\), so \\((l, m, n) = \\tfrac{1}{\\sqrt{14}}(1, 2, 3)\\).",
          "\\(l + m + n = \\dfrac{1 + 2 + 3}{\\sqrt{14}} = \\dfrac{6}{\\sqrt{14}}\\).",
        ],
        answer: "\\(l + m + n = \\dfrac{6}{\\sqrt{14}}\\)",
      },
      practiceSet: [
        { prompt: "Normalise the ratio \\(1 : 2 : 3\\) to direction cosines.", answer: "\\(\\tfrac{1}{\\sqrt{14}}(1, 2, 3)\\)" },
        { prompt: "\\(l + m + n\\) for direction cosines \\(\\tfrac{1}{\\sqrt 6}(-1, 1, 2)\\)?", answer: "\\(\\tfrac{2}{\\sqrt 6}\\)" },
        { prompt: "Factor \\(2m^2 + 5mn + 2n^2 = 0\\).", answer: "\\((2m + n)(m + 2n) = 0\\)" },
        { prompt: "How many lines typically satisfy a linear + quadratic DC pair?", answer: "Two" },
      ],
      pyqExampleId: "0174d03e-6b08-4b6a-a326-2bb5b4c01176",
      traps: [
        {
          title: "Solve for the RATIO first, then normalise — don't skip normalisation",
          body:
            "The quadratic gives \\(l : m : n\\) (e.g. \\(1 : 2 : 3\\)), which are direction RATIOS. Direction cosines require dividing by \\(\\sqrt{l^2 + m^2 + n^2} = \\sqrt{14}\\). Reporting \\(l + m + n = 6\\) instead of \\(6/\\sqrt{14}\\) is the classic miss.",
        },
        {
          title: "Two roots → two answers; report both if asked",
          body:
            "The quadratic factors into two cases, giving two distinct lines (e.g. \\(\\tfrac{6}{\\sqrt{14}}\\) AND \\(\\tfrac{2}{\\sqrt 6}\\)). The correct option usually lists BOTH values — a single value is an incomplete distractor.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Vector cross product and angle between vectors",
      href: "/notes/mht-cet-maths/vectors",
    },
  ],
};
