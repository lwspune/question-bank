import type { SubtopicNote } from "@/app/notes/_types";

export const TETRAHEDRON_GEOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Tetrahedron Geometry — Centroid, Volume, and Vertices",
  title: "Tetrahedron Geometry — Centroid, Volume, and Vertices",
  oneLineDefinition:
    "Average the four vertices to get a tetrahedron's centroid (or the three vertices for a triangle), reverse that average to recover a missing vertex or coordinate, and use one-sixth the scalar triple product to get a tetrahedron's volume — including the plane-cuts-the-axes volume of OABC.",
  whyItMatters:
    "This thin subtopic is pure plug-in: across the 9 PYQs here, only THREE shapes appear and every one is a one-line formula. The centroid shape (direct average, or the inverse: solve for a missing vertex/coordinate) is the most frequent and runs EASY-to-MODERATE. " +
    "The volume shape is a single scalar triple product set equal to a given value and solved for one unknown coordinate. The third shape — a plane parallel to two given lines, cutting the axes — chains a cross product, the intercept form, and the product-of-intercepts volume of OABC. " +
    "There are no proofs and no tricks: memorise the three formulas, watch the factor of 1/4 vs 1/3 and the 1/6 on the volumes, and the subtopic is yours.",
  concepts: [
    // ── CONCEPT 1 — Centroid (direct + inverse) ──────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-tetrahedron-centroid",
      name: "Centroid of a tetrahedron and a triangle",
      visualizationSlug: "octants-coordinate-planes",
      intuition:
        "The centroid is just the average of the corner points: add up the vertices and divide by how many there are — 4 for a tetrahedron, 3 for a triangle. The same averaging, read backwards, lets you recover a missing vertex (or a missing coordinate) when the centroid is given.",
      definition:
        "For a **tetrahedron** with vertices \\(A, B, C, D\\), the **centroid** is the average of all four:\n" +
        "- \\(G = \\dfrac{A + B + C + D}{4}\\), i.e. \\(\\left(\\dfrac{x_A+x_B+x_C+x_D}{4},\\ \\dfrac{y_A+\\cdots}{4},\\ \\dfrac{z_A+\\cdots}{4}\\right)\\).\n\n" +
        "For a **triangle** with vertices \\(A, B, C\\), divide by **3** instead:\n" +
        "- \\(G = \\dfrac{A + B + C}{3}\\).\n\n" +
        "**Inverse use:** if \\(G\\) and all-but-one vertex are known, isolate the missing one — e.g. for a triangle \\(x_C = 3x_G - x_A - x_B\\) (and likewise for a tetrahedron with the factor 4).",
      formula: {
        label: "Centroid (tetrahedron and triangle)",
        latex:
          "G_{\\text{tet}} = \\dfrac{A + B + C + D}{4} \\qquad G_{\\triangle} = \\dfrac{A + B + C}{3}",
        symbols: [
          { symbol: "\\(A, B, C, D\\)", meaning: "position vectors (or coordinate triples) of the vertices" },
          { symbol: "\\(G\\)", meaning: "centroid — the component-wise average of the vertices" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the centroid of the tetrahedron with vertices \\(A(2,0,1)\\), \\(B(0,4,-1)\\), \\(C(2,2,2)\\), \\(D(0,2,2)\\).",
        steps: [
          "Average the \\(x\\)-coordinates: \\(\\dfrac{2+0+2+0}{4} = \\dfrac{4}{4} = 1\\).",
          "Average the \\(y\\)-coordinates: \\(\\dfrac{0+4+2+2}{4} = \\dfrac{8}{4} = 2\\).",
          "Average the \\(z\\)-coordinates: \\(\\dfrac{1-1+2+2}{4} = \\dfrac{4}{4} = 1\\).",
          "So \\(G = (1, 2, 1)\\).",
        ],
        answer: "\\(G = (1, 2, 1)\\)",
      },
      selfCheckExample: {
        prompt:
          "Two vertices of a triangle are \\(A(2,3,-1)\\) and \\(B(0,1,5)\\), and the centroid is \\(G(1,2,1)\\). Find the third vertex \\(C\\).",
        steps: [
          "From \\(x\\): \\(\\dfrac{2+0+x_C}{3} = 1 \\Rightarrow 2 + x_C = 3 \\Rightarrow x_C = 1\\).",
          "From \\(y\\): \\(\\dfrac{3+1+y_C}{3} = 2 \\Rightarrow 4 + y_C = 6 \\Rightarrow y_C = 2\\).",
          "From \\(z\\): \\(\\dfrac{-1+5+z_C}{3} = 1 \\Rightarrow 4 + z_C = 3 \\Rightarrow z_C = -1\\).",
        ],
        answer: "\\(C = (1, 2, -1)\\)",
      },
      practiceSet: [
        { prompt: "Centroid of a tetrahedron divides the vertex sum by what number?", answer: "\\(4\\)" },
        { prompt: "Centroid of a triangle divides the vertex sum by what number?", answer: "\\(3\\)" },
        {
          prompt: "Tetrahedron centroid of \\((0,0,0), (4,0,0), (0,4,0), (0,0,4)\\)?",
          answer: "\\((1,1,1)\\)",
          method: "each axis: \\(4/4 = 1\\)",
        },
        {
          prompt: "Triangle vertices \\(A(1,0,0), B(0,3,0)\\), centroid \\((1,1,1)\\). Find \\(C\\).",
          answer: "\\((2,0,3)\\)",
          method: "\\(x_C = 3\\cdot1 - 1 - 0\\), etc.",
        },
      ],
      pyqExampleId: "5df0ae26-80e4-4770-ab0b-4fef12698a6b",
      traps: [
        {
          title: "Divide by 4 for a tetrahedron, by 3 for a triangle",
          body:
            "The single most common slip: a four-vertex solid averages over 4, a three-vertex triangle over 3. Read the figure named in the stem — \"tetrahedron\" means \\(/4\\), \"triangle\" means \\(/3\\). Using the wrong divisor lands you on a tempting distractor every time.",
        },
        {
          title: "Inverse problems: rearrange, don't re-guess",
          body:
            "When the centroid is given and a vertex is unknown, multiply through by the divisor first: \\(x_A + x_B + x_C = 3x_G\\), then subtract the knowns. Skipping the multiply-through step is where sign errors creep in.",
        },
        {
          title: "Watch which coordinate the puzzle reuses",
          body:
            "Some stems reuse a letter across the centroid AND a vertex (e.g. centroid \\((r, q, 1)\\) with a vertex coordinate \\(q\\)). Match coordinates by POSITION, solve the chain in order, and don't conflate a centroid component with a same-named vertex component.",
        },
      ],
    },

    // ── CONCEPT 2 — Volume via scalar triple product ─────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-tetrahedron-volume-triple-product",
      name: "Volume of a tetrahedron via the scalar triple product",
      visualizationSlug: "triple-product-box",
      intuition:
        "Pick any vertex as a base point and form the three edge vectors leaving it. The scalar triple product of those edges measures the volume of the parallelepiped they span; a tetrahedron is exactly one-sixth of that box. When one coordinate is unknown, set the volume equal to the given value and solve the resulting linear equation.",
      definition:
        "For a tetrahedron with vertices \\(A, B, C, D\\), build the three edges from \\(A\\): \\(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}\\). Then:\n" +
        "- **Volume** \\(V = \\dfrac{1}{6}\\,\\big|\\,[\\,\\overrightarrow{AB}\\ \\ \\overrightarrow{AC}\\ \\ \\overrightarrow{AD}\\,]\\,\\big|\\), where the bracket is the **scalar triple product** — equal to the \\(3\\times 3\\) determinant of the three edge rows.\n" +
        "- The **absolute value** is taken because volume is non-negative (the determinant's sign only records orientation).\n\n" +
        "**Solve-for-a-coordinate variant:** with one vertex coordinate as \\(x\\), the determinant becomes linear in \\(x\\); set \\(\\dfrac{1}{6}|\\det| = V\\) (so \\(|\\det| = 6V\\)) and solve.",
      formula: {
        label: "Tetrahedron volume",
        latex:
          "V = \\dfrac{1}{6}\\left|\\det\\begin{bmatrix} \\overrightarrow{AB} \\\\ \\overrightarrow{AC} \\\\ \\overrightarrow{AD} \\end{bmatrix}\\right| = \\dfrac{1}{6}\\big|\\,\\overrightarrow{AB}\\cdot(\\overrightarrow{AC}\\times\\overrightarrow{AD})\\,\\big|",
        symbols: [
          { symbol: "\\(\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}\\)", meaning: "the three edge vectors from a common vertex \\(A\\)" },
          { symbol: "\\([\\,\\cdot\\ \\cdot\\ \\cdot\\,]\\)", meaning: "scalar triple product = determinant of the edge rows" },
          { symbol: "\\(\\tfrac{1}{6}\\)", meaning: "a tetrahedron is one-sixth of the spanning parallelepiped" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the volume of the tetrahedron with vertices \\(A(0,0,0)\\), \\(B(2,0,0)\\), \\(C(0,3,0)\\), \\(D(0,0,4)\\).",
        steps: [
          "Edges from \\(A\\): \\(\\overrightarrow{AB} = (2,0,0)\\), \\(\\overrightarrow{AC} = (0,3,0)\\), \\(\\overrightarrow{AD} = (0,0,4)\\).",
          "The determinant of these rows is diagonal: \\(\\det = 2\\cdot 3\\cdot 4 = 24\\).",
          "Volume: \\(V = \\dfrac{1}{6}|24| = 4\\).",
        ],
        answer: "\\(V = 4\\) cubic units",
      },
      selfCheckExample: {
        prompt:
          "The tetrahedron with vertices \\(A(0,0,0)\\), \\(B(a,0,0)\\), \\(C(0,2,0)\\), \\(D(0,0,3)\\) has volume \\(4\\) cubic units. Find \\(a\\) (take \\(a > 0\\)).",
        steps: [
          "Edges from \\(A\\): \\((a,0,0), (0,2,0), (0,0,3)\\); determinant \\(= 6a\\).",
          "Set \\(\\dfrac{1}{6}|6a| = 4 \\Rightarrow |a| = 4\\).",
          "With \\(a > 0\\), \\(a = 4\\).",
        ],
        answer: "\\(a = 4\\)",
      },
      practiceSet: [
        { prompt: "A tetrahedron is what fraction of the parallelepiped spanned by its three edges?", answer: "\\(\\tfrac{1}{6}\\)" },
        { prompt: "If the scalar triple product of the edges is \\(-30\\), the volume is?", answer: "\\(5\\)", method: "\\(\\tfrac{1}{6}|-30|\\)" },
        { prompt: "Why take the absolute value of the determinant?", answer: "volume is non-negative; sign only records orientation" },
        { prompt: "Edges \\((1,0,0),(0,1,0),(0,0,6)\\): volume?", answer: "\\(1\\)", method: "\\(\\tfrac{1}{6}\\cdot 6\\)" },
      ],
      pyqExampleId: "f499884f-f4e0-466c-981a-d8d8fbacc571",
      traps: [
        {
          title: "It's \\(\\tfrac{1}{6}\\) for a tetrahedron, not \\(\\tfrac{1}{3}\\) or 1",
          body:
            "The parallelepiped volume is \\(|\\det|\\); the tetrahedron is one-SIXTH of it, not one-third. (\\(\\tfrac{1}{3}\\) belongs to the pyramid-volume formula \\(\\tfrac{1}{3}\\times\\text{base}\\times\\text{height}\\), a different setup.) Forgetting the \\(\\tfrac{1}{6}\\) gives an answer six times too big.",
        },
        {
          title: "Build edges from ONE common vertex",
          body:
            "Use \\(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}\\) — all three leaving the same vertex \\(A\\) (head minus the SAME tail). Mixing tails (e.g. \\(\\overrightarrow{AB}, \\overrightarrow{BC}, \\overrightarrow{AD}\\)) breaks the triple-product meaning and the volume is wrong.",
        },
        {
          title: "Set \\(|\\det| = 6V\\), not \\(|\\det| = V\\)",
          body:
            "In a solve-for-\\(x\\) problem, multiply the target volume by 6 BEFORE equating to the determinant: \\(\\dfrac{1}{6}|\\det| = \\tfrac{11}{6}\\) means \\(|\\det| = 11\\), not \\(\\tfrac{11}{6}\\). Dropping the \\(\\times 6\\) corrupts the linear equation for \\(x\\).",
        },
      ],
    },

    // ── CONCEPT 3 — Plane from intercepts → volume of OABC ────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-tetrahedron-from-plane-intercepts",
      name: "Volume of OABC from a plane cutting the axes",
      intuition:
        "A favourite MHT-CET chain: a plane is parallel to two given lines, so its normal is the cross product of their direction ratios. Write the plane in the form \\(x+y+z=k\\) (or the matching intercept form), read off where it crosses each axis, and the tetrahedron \\(OABC\\) — origin plus the three intercepts — has volume one-sixth the product of the intercepts.",
      definition:
        "Step by step, for a plane parallel to two lines with direction ratios \\(\\vec{d_1}\\) and \\(\\vec{d_2}\\), passing through a point \\(P\\):\n" +
        "- **Normal** \\(\\vec{n} = \\vec{d_1}\\times\\vec{d_2}\\) (the plane is parallel to both lines, so \\(\\vec{n}\\) is perpendicular to both).\n" +
        "- **Plane:** \\(\\vec{n}\\cdot(\\vec{r}-\\vec{P}) = 0\\); when \\(\\vec{n}\\propto(1,1,1)\\) this is \\(x+y+z = k\\) with \\(k\\) fixed by \\(P\\).\n" +
        "- **Intercepts:** set two coordinates to 0 — \\(A(a,0,0), B(0,b,0), C(0,0,c)\\). For \\(x+y+z=k\\) each intercept is \\(k\\).\n" +
        "- **Volume of \\(OABC\\):** the edges from \\(O\\) are along the axes, so \\(V = \\dfrac{1}{6}\\,|abc|\\) (for \\(x+y+z=k\\), \\(V = \\dfrac{k^3}{6}\\)).",
      formula: {
        label: "Plane normal, intercepts, and OABC volume",
        latex:
          "\\vec{n} = \\vec{d_1}\\times\\vec{d_2} \\qquad V_{OABC} = \\dfrac{1}{6}\\,|a\\,b\\,c| = \\dfrac{k^3}{6}\\ \\ (\\text{for } x+y+z=k)",
        symbols: [
          { symbol: "\\(\\vec{d_1}, \\vec{d_2}\\)", meaning: "direction ratios of the two parallel lines" },
          { symbol: "\\(a, b, c\\)", meaning: "the \\(x\\)-, \\(y\\)-, \\(z\\)-intercepts of the plane" },
          { symbol: "\\(k\\)", meaning: "the constant in \\(x+y+z=k\\); each intercept when \\(\\vec{n}\\propto(1,1,1)\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A plane is parallel to the lines with direction ratios \\((1,0,-1)\\) and \\((0,1,-1)\\) and passes through \\((1,1,2)\\). It cuts the axes at \\(A, B, C\\). Find the volume of tetrahedron \\(OABC\\).",
        steps: [
          "Normal: \\(\\vec{n} = (1,0,-1)\\times(0,1,-1) = (0\\cdot(-1)-(-1)\\cdot 1,\\ (-1)\\cdot 0 - 1\\cdot(-1),\\ 1\\cdot 1 - 0) = (1,1,1)\\).",
          "Plane: \\(x + y + z = k\\). Through \\((1,1,2)\\): \\(k = 1+1+2 = 4\\), so \\(x+y+z=4\\).",
          "Intercepts: \\(A(4,0,0), B(0,4,0), C(0,0,4)\\).",
          "Volume: \\(V = \\dfrac{1}{6}|4\\cdot 4\\cdot 4| = \\dfrac{64}{6} = \\dfrac{32}{3}\\).",
        ],
        answer: "\\(V_{OABC} = \\dfrac{32}{3}\\) cubic units",
      },
      selfCheckExample: {
        prompt:
          "A plane parallel to lines with direction ratios \\((2,0,-2)\\) and \\((0,2,-2)\\) passes through \\((1,1,1)\\) and meets the axes at \\(A, B, C\\). Find the volume of \\(OABC\\).",
        steps: [
          "Normal: \\((2,0,-2)\\times(0,2,-2) = (4,4,4)\\propto(1,1,1)\\).",
          "Plane: \\(x+y+z = k\\); through \\((1,1,1)\\) gives \\(k = 3\\), so \\(x+y+z=3\\).",
          "Intercepts each \\(=3\\); \\(V = \\dfrac{1}{6}(3)(3)(3) = \\dfrac{27}{6} = \\dfrac{9}{2}\\).",
        ],
        answer: "\\(V_{OABC} = \\dfrac{9}{2}\\) cubic units",
      },
      practiceSet: [
        { prompt: "The normal to a plane parallel to two lines is found how?", answer: "cross product of the two direction ratios" },
        {
          prompt: "Plane \\(x+y+z=6\\): what are its three axis intercepts?",
          answer: "\\(6, 6, 6\\)",
          method: "set two coords to 0",
        },
        {
          prompt: "Volume of OABC for \\(x+y+z=6\\)?",
          answer: "\\(36\\)",
          method: "\\(\\tfrac{1}{6}\\cdot 6\\cdot 6\\cdot 6\\)",
        },
        {
          prompt: "Intercepts \\(2, 3, 4\\): volume of OABC?",
          answer: "\\(4\\)",
          method: "\\(\\tfrac{1}{6}\\cdot 24\\)",
        },
      ],
      pyqExampleId: "18b65c3d-a457-45a8-865a-ad47893aeb19",
      traps: [
        {
          title: "Normal = cross product, then the constant comes from the POINT",
          body:
            "Two steps, in order: first \\(\\vec{n} = \\vec{d_1}\\times\\vec{d_2}\\) gives the coefficients, THEN plug the given point into \\(\\vec{n}\\cdot\\vec{r}=k\\) to fix \\(k\\). Skipping the point and assuming \\(k\\) is wrong; the point is what pins the plane down.",
        },
        {
          title: "Volume of OABC is \\(\\tfrac{1}{6}\\,abc\\), not \\(\\tfrac{1}{6}k\\) or \\(abc\\)",
          body:
            "It's one-sixth the PRODUCT of the three intercepts. For \\(x+y+z=k\\) that's \\(\\tfrac{1}{6}k^3\\) (since all three intercepts equal \\(k\\)) — e.g. \\(k=3\\) gives \\(\\tfrac{27}{6}=\\tfrac{9}{2}\\), not \\(\\tfrac{3}{6}\\). Don't forget to cube \\(k\\) before dividing by 6.",
        },
        {
          title: "Simplify the cross-product normal before reading intercepts",
          body:
            "A normal like \\((4,4,4)\\) is parallel to \\((1,1,1)\\) — reduce it so the plane reads cleanly as \\(x+y+z=k\\). Carrying the un-reduced \\((4,4,4)\\) into the intercept step muddies the constant and the intercepts.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Vector algebra fundamentals",
      href: "/notes/mht-cet-maths/vectors",
    },
  ],
};
