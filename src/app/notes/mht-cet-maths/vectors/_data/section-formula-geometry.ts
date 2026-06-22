import type { SubtopicNote } from "@/app/notes/_types";

export const SECTION_FORMULA_GEOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Vector Geometry — Section Formula, Triangle, and Parallelogram",
  title: "Vector Geometry — Section Formula, Triangle, and Parallelogram",
  oneLineDefinition:
    "Using the section formula (internal and external), the centroid and median identities, the triangle-centre formulas (incentre, orthocentre), and parallelogram relations to locate points and ratios from position vectors.",
  whyItMatters:
    "This is the bread-and-butter geometry strand of MHT-CET Vectors — about a dozen PYQs across the years, roughly half of them HARD. " +
    "The two engines are the section formula (a point dividing a segment in a given ratio) and the centroid as the average of vertex position vectors; from those, medians, cevian-intersection ratios, the incentre, and parallelogram classification all follow. " +
    "Get the internal-vs-external sign right and decide which point is weighted m versus n, and most of these resolve to a few lines of vector algebra.",
  concepts: [
    // 1 ── FOUNDATION ──────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-geo-section-formula",
      name: "Section formula — internal, external, and midpoint",
      visualizationSlug: "section-formula",
      intuition:
        "A point that splits the segment joining \\(A\\) and \\(B\\) in the ratio \\(m:n\\) sits at a weighted average of the two endpoint position vectors. For internal division the weights add; for external division they subtract. The midpoint is the symmetric case \\(m=n\\).",
      definition:
        "Let \\(A\\) and \\(B\\) have position vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), and let \\(R\\) divide \\(AB\\) in the ratio \\(m:n\\).\n" +
        "- **Internal division** (\\(R\\) between \\(A\\) and \\(B\\)): \\(\\vec{r} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\).\n" +
        "- **External division** (\\(R\\) on the line, outside \\(AB\\)): \\(\\vec{r} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\).\n" +
        "- **Midpoint** (\\(m = n = 1\\)): \\(\\vec{r} = \\dfrac{\\vec{a} + \\vec{b}}{2}\\).\n" +
        "In the internal form, the far endpoint \\(\\vec{b}\\) carries the weight \\(m\\) and the near endpoint \\(\\vec{a}\\) carries \\(n\\), where \\(AR : RB = m : n\\). Memorise the form rather than a side-story.",
      formula: {
        label: "Section formula (internal / external / midpoint)",
        latex:
          "\\vec{r} = \\frac{m\\vec{b} + n\\vec{a}}{m + n} \\qquad \\vec{r} = \\frac{m\\vec{b} - n\\vec{a}}{m - n} \\qquad \\vec{r} = \\frac{\\vec{a} + \\vec{b}}{2}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of the endpoints \\(A, B\\)" },
          { symbol: "\\(m : n\\)", meaning: "ratio \\(AR : RB\\) in which \\(R\\) divides the segment" },
          { symbol: "\\(\\vec{r}\\)", meaning: "position vector of the dividing point \\(R\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the position vector of the point \\(R\\) that divides the segment joining \\(A(\\vec{a} = 2\\hat{i} + \\hat{j})\\) and \\(B(\\vec{b} = 5\\hat{i} + 7\\hat{j})\\) internally in the ratio \\(2:1\\).",
        steps: [
          "Internal division: \\(\\vec{r} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\) with \\(m = 2\\), \\(n = 1\\).",
          "\\(\\vec{r} = \\dfrac{2(5\\hat{i} + 7\\hat{j}) + 1(2\\hat{i} + \\hat{j})}{3} = \\dfrac{12\\hat{i} + 15\\hat{j}}{3}\\).",
          "\\(\\vec{r} = 4\\hat{i} + 5\\hat{j}\\).",
        ],
        answer: "\\(\\vec{r} = 4\\hat{i} + 5\\hat{j}\\)",
      },
      practiceSet: [
        { prompt: "Midpoint of \\(\\vec{a}\\) and \\(\\vec{b}\\)?", answer: "\\(\\dfrac{\\vec{a} + \\vec{b}}{2}\\)" },
        {
          prompt: "Internal-division formula for ratio \\(m:n\\)?",
          answer: "\\(\\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\)",
        },
        {
          prompt: "External-division formula for ratio \\(m:n\\)?",
          answer: "\\(\\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\)",
        },
        {
          prompt: "Point dividing \\(A(0,0)\\), \\(B(6,3)\\) internally \\(1:2\\)?",
          answer: "\\((2, 1)\\)",
          method: "\\(\\tfrac{1\\cdot B + 2\\cdot A}{3}\\)",
        },
      ],
      traps: [
        {
          title: "Internal adds, external subtracts",
          body:
            "The only difference between the two formulas is the sign in the denominator (and numerator): internal uses \\(m + n\\), external uses \\(m - n\\). " +
            "An external-division question with the internal formula (or vice versa) is the single most common slip — read whether \\(R\\) lies between the points or beyond them.",
        },
        {
          title: "Which point gets the weight \\(m\\)?",
          body:
            "In \\(\\dfrac{m\\vec{b} + n\\vec{a}}{m+n}\\), the FAR endpoint \\(\\vec{b}\\) carries \\(m\\) and the NEAR endpoint \\(\\vec{a}\\) carries \\(n\\), where the ratio is \\(AR:RB = m:n\\). " +
            "Swapping the weights places \\(R\\) at the mirror point. When unsure, sanity-check: a \\(2:1\\) point should sit closer to \\(B\\).",
        },
      ],
    },

    // 2 ────────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-geo-centroid-median",
      name: "Centroid and median identities",
      visualizationSlug: "triangle-centroid",
      intuition:
        "The centroid of a triangle is just the average of the three vertex position vectors — the balance point of the three corners. A median runs from a vertex to the midpoint of the opposite side, so its vector is built from the midpoint formula. The centroid lies on every median, cutting each in the ratio \\(2:1\\) from the vertex.",
      definition:
        "For triangle \\(ABC\\) with vertices \\(\\vec{a}, \\vec{b}, \\vec{c}\\):\n" +
        "- **Centroid**: \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\).\n" +
        "- **Median through \\(A\\)** to the midpoint \\(D\\) of \\(BC\\): \\(\\vec{AD} = \\dfrac{\\vec{b} + \\vec{c}}{2} - \\vec{a}\\), equivalently \\(\\vec{AD} = \\dfrac{\\vec{AB} + \\vec{AC}}{2}\\).\n" +
        "- The centroid divides each median in ratio \\(2:1\\) (vertex to centroid : centroid to midpoint).\n" +
        "- **Tetrahedron centroid** (four vertices): \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d}}{4}\\).",
      formula: {
        label: "Centroid and median vector",
        latex:
          "\\vec{g} = \\frac{\\vec{a} + \\vec{b} + \\vec{c}}{3} \\qquad \\vec{AD} = \\frac{\\vec{AB} + \\vec{AC}}{2} \\qquad \\vec{g}_{\\text{tetra}} = \\frac{\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d}}{4}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}, \\vec{c}\\)", meaning: "position vectors of the vertices" },
          { symbol: "\\(\\vec{g}\\)", meaning: "position vector of the centroid" },
          { symbol: "\\(D\\)", meaning: "midpoint of \\(BC\\); \\(\\vec{AD}\\) is the median from \\(A\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "The vectors \\(\\vec{AB} = 2\\hat{i} + 6\\hat{j} + 3\\hat{k}\\) and \\(\\vec{AC} = 4\\hat{i} - 2\\hat{j} - \\hat{k}\\) are two sides of triangle \\(ABC\\). Find the length of the median through \\(A\\).",
        steps: [
          "Median vector: \\(\\vec{AD} = \\dfrac{\\vec{AB} + \\vec{AC}}{2} = \\dfrac{6\\hat{i} + 4\\hat{j} + 2\\hat{k}}{2} = 3\\hat{i} + 2\\hat{j} + \\hat{k}\\).",
          "Length: \\(|\\vec{AD}| = \\sqrt{3^2 + 2^2 + 1^2} = \\sqrt{9 + 4 + 1}\\).",
          "\\(= \\sqrt{14}\\).",
        ],
        answer: "\\(|\\vec{AD}| = \\sqrt{14}\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the centroid of the triangle with vertices \\(A(1, 2, -1)\\), \\(B(3, 0, 4)\\), \\(C(-1, 4, 0)\\).",
        steps: [
          "\\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3} = \\dfrac{(1+3-1)\\hat{i} + (2+0+4)\\hat{j} + (-1+4+0)\\hat{k}}{3}\\).",
          "\\(= \\dfrac{3\\hat{i} + 6\\hat{j} + 3\\hat{k}}{3} = \\hat{i} + 2\\hat{j} + \\hat{k}\\).",
        ],
        answer: "\\(\\vec{g} = \\hat{i} + 2\\hat{j} + \\hat{k}\\), i.e. \\((1, 2, 1)\\).",
      },
      practiceSet: [
        { prompt: "Centroid formula for \\(\\vec{a}, \\vec{b}, \\vec{c}\\)?", answer: "\\(\\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\)" },
        { prompt: "Median vector through \\(A\\) in terms of the sides?", answer: "\\(\\dfrac{\\vec{AB} + \\vec{AC}}{2}\\)" },
        { prompt: "The centroid divides each median in what ratio (from the vertex)?", answer: "\\(2:1\\)" },
        { prompt: "Centroid of \\(A(0,0,0)\\), \\(B(3,0,0)\\), \\(C(0,6,0)\\)?", answer: "\\((1, 2, 0)\\)", method: "average each coordinate" },
      ],
      pyqExampleId: "7dec5ff8-67fc-4646-923b-a9c189bdd241",
      traps: [
        {
          title: "Median length \\(\\neq\\) half the side it bisects",
          body:
            "The median through \\(A\\) is \\(\\dfrac{\\vec{AB} + \\vec{AC}}{2}\\), NOT \\(\\dfrac{1}{2}\\vec{BC}\\). " +
            "Take half of the SUM of the two adjacent side-vectors, then take its magnitude — don't halve the opposite side's length.",
        },
        {
          title: "Centroid uses position vectors, not side vectors",
          body:
            "\\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\) needs the position vectors of the vertices. If a problem hands you only \\(\\vec{AB}\\) and \\(\\vec{AC}\\), the centroid relative to \\(A\\) is \\(\\dfrac{\\vec{AB} + \\vec{AC}}{3}\\) — a different (and frequently tested) form.",
        },
      ],
    },

    // 3 ────────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-geo-ratio-collinearity",
      name: "Finding the ratio, collinearity, and cevian intersection",
      intuition:
        "Run the section formula in reverse: when you already know a point on a segment, equating coefficients tells you the ratio in which it divides the segment. The same idea proves collinearity — three points are collinear exactly when one divides the join of the other two in some ratio — and locates the intersection of two cevians by writing the meeting point two ways and matching.",
      definition:
        "If \\(R\\) lies on line \\(AB\\) with \\(\\vec{r} = \\dfrac{m\\vec{b} + n\\vec{a}}{m+n}\\), then comparing the two sides recovers \\(m:n\\). " +
        "**Collinearity**: \\(A, B, C\\) are collinear iff \\(\\vec{c} = \\lambda\\vec{a} + \\mu\\vec{b}\\) with \\(\\lambda + \\mu = 1\\) (i.e. \\(C\\) divides \\(AB\\) in ratio \\(\\mu:\\lambda\\)). " +
        "**Cevian intersection**: write the meeting point \\(G\\) as a section point of cevian 1 AND of cevian 2, equate, and solve the resulting linear system for the two parameters.",
      formula: {
        label: "Ratio recovery and external division",
        latex:
          "\\vec{r} = \\frac{m\\vec{b} + n\\vec{a}}{m + n} \\;\\Rightarrow\\; \\text{ratio } m:n \\qquad \\vec{r}_{\\text{ext}} = \\frac{m\\vec{b} - n\\vec{a}}{m - n}",
        symbols: [
          { symbol: "\\(m : n\\)", meaning: "the ratio recovered by comparing coefficients" },
          { symbol: "\\(\\vec{r}_{\\text{ext}}\\)", meaning: "external-division point — used for one branch of perpendicular-cevian problems" },
        ],
      },
      authoredExample: {
        prompt:
          "In what ratio does the point \\(R = 3\\hat{i} + 5\\hat{j}\\) divide the segment joining \\(A = \\hat{i} + \\hat{j}\\) and \\(B = 5\\hat{i} + 9\\hat{j}\\)?",
        steps: [
          "Let \\(R\\) divide \\(AB\\) internally in ratio \\(k:1\\): \\(\\vec{r} = \\dfrac{k\\vec{b} + \\vec{a}}{k + 1}\\).",
          "Compare the \\(\\hat{i}\\) components: \\(3 = \\dfrac{5k + 1}{k + 1} \\Rightarrow 3k + 3 = 5k + 1 \\Rightarrow k = 1\\).",
          "Check the \\(\\hat{j}\\) components: \\(\\dfrac{9(1) + 1}{2} = 5\\) ✓ — consistent, so \\(k = 1\\).",
        ],
        answer: "\\(R\\) divides \\(AB\\) in ratio \\(1:1\\) (it is the midpoint).",
      },
      selfCheckExample: {
        prompt:
          "Show that \\(A = \\hat{i} + 2\\hat{j}\\), \\(B = 3\\hat{i} + 4\\hat{j}\\), \\(C = 4\\hat{i} + 5\\hat{j}\\) are collinear, and find the ratio in which \\(B\\) divides \\(AC\\).",
        steps: [
          "\\(\\vec{AB} = 2\\hat{i} + 2\\hat{j}\\) and \\(\\vec{AC} = 3\\hat{i} + 3\\hat{j} = \\tfrac{3}{2}\\vec{AB}\\), so \\(A, B, C\\) are collinear.",
          "Write \\(B\\) dividing \\(AC\\) in ratio \\(k:1\\): \\(\\vec{b} = \\dfrac{k\\vec{c} + \\vec{a}}{k+1}\\); compare \\(\\hat{i}\\): \\(3 = \\dfrac{4k + 1}{k+1} \\Rightarrow 3k + 3 = 4k + 1 \\Rightarrow k = 2\\).",
        ],
        answer: "Collinear; \\(B\\) divides \\(AC\\) internally in ratio \\(2:1\\).",
      },
      practiceSet: [
        { prompt: "\\(A, B, C\\) collinear with \\(\\vec{c} = \\lambda\\vec{a} + \\mu\\vec{b}\\) requires?", answer: "\\(\\lambda + \\mu = 1\\)" },
        { prompt: "Recover the ratio: equate the ____ of the two section-formula expressions.", answer: "components (coefficients of \\(\\hat{i}, \\hat{j}, \\hat{k}\\))" },
        { prompt: "External division of \\(AB\\) in ratio \\(m:n\\)?", answer: "\\(\\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\)" },
        { prompt: "Midpoint divides a segment in ratio?", answer: "\\(1:1\\)" },
      ],
      pyqExampleId: "2d2004b5-ee16-4c36-bbd4-b13bd4efb4a5",
      traps: [
        {
          title: "Internal and external points use the SAME magnitude of ratio",
          body:
            "When \\(R\\) and \\(S\\) divide \\(PQ\\) internally and externally in the same ratio \\(2:3\\), use \\(\\vec{OR} = \\dfrac{2\\vec{q} + 3\\vec{p}}{5}\\) and \\(\\vec{OS} = \\dfrac{2\\vec{q} - 3\\vec{p}}{-1} = 3\\vec{p} - 2\\vec{q}\\). " +
            "Forgetting the sign flip in the external denominator is the classic error in OR \\(\\perp\\) OS problems.",
        },
        {
          title: "Cevian-intersection ratio is asked along ONE cevian",
          body:
            "If \\(AP\\) and \\(BQ\\) meet at \\(G\\), the question wants the ratio \\(AG:GP\\) (along \\(AP\\)) — not \\(BG:GQ\\). " +
            "Pin which cevian you are reporting the ratio on, and don't invert it (a \\(5:7\\) answer reads as \\(7:5\\) if you measure from the wrong end).",
        },
      ],
    },

    // 4 ────────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-geo-triangle-centres",
      name: "Incentre, orthocentre, and the angle bisector",
      intuition:
        "The triangle centres are weighted (or unweighted) averages of the vertices. The incentre weights each vertex by the length of the OPPOSITE side, because it sits where the three internal angle bisectors meet. The orthocentre is where the altitudes meet, characterised by perpendicularity of a vertex-to-point vector against the opposite side. The internal bisector of two vectors points along the sum of their UNIT vectors.",
      definition:
        "For triangle \\(ABC\\) with vertices \\(\\vec{a}, \\vec{b}, \\vec{c}\\) and opposite side lengths \\(a = |BC|\\), \\(b = |CA|\\), \\(c = |AB|\\):\n" +
        "- **Incentre**: \\(\\vec{I} = \\dfrac{a\\vec{a} + b\\vec{b} + c\\vec{c}}{a + b + c}\\) — each vertex weighted by its OPPOSITE side.\n" +
        "- **Orthocentre**: the point \\(H\\) with \\((\\vec{a} - \\vec{h})\\cdot(\\vec{b} - \\vec{c}) = 0\\) and \\((\\vec{b} - \\vec{h})\\cdot(\\vec{c} - \\vec{a}) = 0\\) (each altitude \\(\\perp\\) the opposite side).\n" +
        "- **Internal angle bisector** of \\(\\angle AOB\\): along \\(\\hat{a} + \\hat{b} = \\dfrac{\\vec{a}}{|\\vec{a}|} + \\dfrac{\\vec{b}}{|\\vec{b}|}\\) — equal coefficients on the two unit vectors.",
      formula: {
        label: "Incentre and angle bisector",
        latex:
          "\\vec{I} = \\frac{a\\vec{a} + b\\vec{b} + c\\vec{c}}{a + b + c} \\qquad \\text{bisector of }\\angle AOB \\parallel \\frac{\\vec{a}}{|\\vec{a}|} + \\frac{\\vec{b}}{|\\vec{b}|}",
        symbols: [
          { symbol: "\\(a, b, c\\)", meaning: "lengths of sides opposite \\(A, B, C\\): \\(a = |BC|\\), etc." },
          { symbol: "\\(\\vec{I}\\)", meaning: "position vector of the incentre" },
          { symbol: "\\(\\hat{a} + \\hat{b}\\)", meaning: "sum of unit vectors — the internal-bisector direction" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the incentre of the triangle with vertices \\(A(0, 0)\\), \\(B(4, 0)\\), \\(C(0, 3)\\).",
        steps: [
          "Side lengths (opposite each vertex): \\(a = |BC| = \\sqrt{4^2 + 3^2} = 5\\), \\(b = |CA| = 3\\), \\(c = |AB| = 4\\).",
          "\\(\\vec{I} = \\dfrac{a\\vec{a} + b\\vec{b} + c\\vec{c}}{a + b + c} = \\dfrac{5(0,0) + 3(4,0) + 4(0,3)}{5 + 3 + 4}\\).",
          "\\(= \\dfrac{(12, 12)}{12} = (1, 1)\\).",
        ],
        answer: "Incentre \\(= (1, 1)\\)",
      },
      selfCheckExample: {
        prompt:
          "The internal bisector of \\(\\angle AOB\\), where \\(\\vec{OA} = \\vec{a}\\) and \\(\\vec{OB} = \\vec{b}\\), is given by \\(x\\dfrac{\\vec{a}}{|\\vec{a}|} + y\\dfrac{\\vec{b}}{|\\vec{b}|}\\). What relation must \\(x\\) and \\(y\\) satisfy?",
        steps: [
          "The internal bisector direction is the sum of the two UNIT vectors \\(\\hat{a} + \\hat{b}\\), i.e. equal coefficients on \\(\\hat{a}\\) and \\(\\hat{b}\\).",
          "So the coefficient of \\(\\hat{a}\\) equals the coefficient of \\(\\hat{b}\\): \\(x = y\\).",
        ],
        answer: "\\(x = y\\) (equivalently \\(x - y = 0\\)).",
      },
      practiceSet: [
        { prompt: "Incentre weight on vertex \\(A\\)?", answer: "\\(a = |BC|\\) (the opposite side length)" },
        { prompt: "The orthocentre is the meeting point of the triangle's ____.", answer: "altitudes" },
        { prompt: "Internal bisector of \\(\\angle AOB\\) points along?", answer: "\\(\\hat{a} + \\hat{b}\\)" },
        { prompt: "Centroid vs incentre: which uses side-length weights?", answer: "incentre" },
      ],
      pyqExampleId: "d555d053-24ee-41f6-b062-e084af8daef7",
      traps: [
        {
          title: "Incentre weights are OPPOSITE side lengths",
          body:
            "Vertex \\(A\\) is weighted by \\(a = |BC|\\) — the side facing \\(A\\), not \\(|AB|\\) or \\(|AC|\\). " +
            "Mis-pairing the weight with an adjacent side is the standard incentre trap; label the sides \\(a, b, c\\) opposite \\(A, B, C\\) first.",
        },
        {
          title: "Bisector uses unit vectors — sum, not difference",
          body:
            "The INTERNAL bisector is along \\(\\hat{a} + \\hat{b}\\) (sum of unit vectors); the EXTERNAL bisector is along \\(\\hat{a} - \\hat{b}\\). " +
            "Forgetting to normalise (using \\(\\vec{a} + \\vec{b}\\) instead of \\(\\hat{a} + \\hat{b}\\)) gives the wrong direction unless \\(|\\vec{a}| = |\\vec{b}|\\).",
        },
        {
          title: "Orthocentre \\(\\neq\\) centroid \\(\\neq\\) circumcentre",
          body:
            "A perpendicularity condition like \\((\\vec{a} - \\vec{d})\\cdot(\\vec{b} - \\vec{c}) = 0\\) says \\(DA \\perp BC\\) — an ALTITUDE, so \\(D\\) is the orthocentre. " +
            "Equal distances to the vertices would mean circumcentre; equal angle-bisector weighting means incentre. Read which condition is given.",
        },
      ],
    },

    // 5 ────────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-geo-triangle-parallelogram",
      name: "Triangle and parallelogram applications",
      visualizationSlug: "parallelogram-diagonals",
      intuition:
        "Many geometry PYQs are dressed-up dot-product or section-formula problems. A right angle at a vertex is a dot product of the two side-vectors equal to zero. Classifying a quadrilateral from four position vectors is a checklist: equal opposite sides means parallelogram; equal diagonals adds rectangle; perpendicular diagonals adds rhombus.",
      definition:
        "**Right angle at a vertex**: \\(\\angle A = 90^\\circ\\) iff \\(\\vec{AB} \\cdot \\vec{AC} = 0\\). " +
        "**Quadrilateral classification** from vertices \\(P, Q, R, S\\) (in order):\n" +
        "- Opposite sides equal as vectors (\\(\\vec{PQ} = \\vec{SR}\\)) \\(\\Rightarrow\\) **parallelogram**.\n" +
        "- A parallelogram with \\(|\\vec{PR}| = |\\vec{QS}|\\) (equal diagonals) \\(\\Rightarrow\\) **rectangle**.\n" +
        "- A parallelogram with \\(\\vec{PR} \\cdot \\vec{QS} = 0\\) (perpendicular diagonals) \\(\\Rightarrow\\) **rhombus**.\n" +
        "- Both equal AND perpendicular diagonals \\(\\Rightarrow\\) **square**.",
      formula: {
        label: "Right-angle test and parallelogram diagonals",
        latex:
          "\\angle A = 90^\\circ \\iff \\vec{AB}\\cdot\\vec{AC} = 0 \\qquad \\vec{PR} = \\vec{PQ} + \\vec{QR}, \\;\\; \\vec{QS} = \\vec{QP} + \\vec{PS}",
        symbols: [
          { symbol: "\\(\\vec{AB}, \\vec{AC}\\)", meaning: "the two side-vectors leaving the right-angle vertex" },
          { symbol: "\\(\\vec{PR}, \\vec{QS}\\)", meaning: "diagonals of quadrilateral \\(PQRS\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Triangle \\(ABC\\) has \\(A = (1, 0, 2)\\), \\(B = (3, -1, 1)\\), \\(C = (2, t, 3)\\). For what value of \\(t\\) is the angle at \\(A\\) a right angle?",
        steps: [
          "Side-vectors at \\(A\\): \\(\\vec{AB} = (2, -1, -1)\\), \\(\\vec{AC} = (1, t, 1)\\).",
          "Right angle at \\(A\\): \\(\\vec{AB}\\cdot\\vec{AC} = 0 \\Rightarrow (2)(1) + (-1)(t) + (-1)(1) = 0\\).",
          "\\(2 - t - 1 = 0 \\Rightarrow t = 1\\).",
        ],
        answer: "\\(t = 1\\)",
      },
      selfCheckExample: {
        prompt:
          "Are the points \\(P(0,0)\\), \\(Q(4,0)\\), \\(R(5,3)\\), \\(S(1,3)\\) the vertices of a parallelogram (in order)?",
        steps: [
          "\\(\\vec{PQ} = (4, 0)\\) and \\(\\vec{SR} = R - S = (4, 0)\\): equal, so \\(PQ \\parallel SR\\) and equal length.",
          "\\(\\vec{QR} = (1, 3)\\) and \\(\\vec{PS} = (1, 3)\\): equal too.",
          "Both pairs of opposite sides equal as vectors \\(\\Rightarrow\\) parallelogram.",
        ],
        answer: "Yes — \\(PQRS\\) is a parallelogram.",
      },
      practiceSet: [
        { prompt: "Right angle at \\(A\\) iff \\(\\vec{AB}\\cdot\\vec{AC} = ?\\)", answer: "\\(0\\)" },
        { prompt: "Equal opposite side-vectors imply which quadrilateral?", answer: "parallelogram" },
        { prompt: "Parallelogram with perpendicular diagonals is a?", answer: "rhombus" },
        { prompt: "Parallelogram with equal diagonals is a?", answer: "rectangle" },
      ],
      pyqExampleId: "b8c273c9-d2f4-44a0-813b-a80304c31331",
      traps: [
        {
          title: "Equal diagonals \\(\\to\\) rectangle, perpendicular diagonals \\(\\to\\) rhombus",
          body:
            "Don't mix the two tests. A parallelogram whose diagonals are EQUAL in length is a rectangle; one whose diagonals are PERPENDICULAR is a rhombus. " +
            "A figure that is a parallelogram but neither (diagonals unequal AND not perpendicular) is the 'neither rhombus nor rectangle' answer.",
        },
        {
          title: "Right-angle test needs side-vectors FROM the vertex",
          body:
            "For a right angle at \\(A\\), dot \\(\\vec{AB}\\) with \\(\\vec{AC}\\) (both leaving \\(A\\)) — not \\(\\vec{AB}\\) with \\(\\vec{BC}\\). " +
            "Using the wrong pair tests perpendicularity at the wrong vertex and gives a spurious value.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Magnitude, Components, and Unit Vectors",
      href: "/notes/mht-cet-maths/vectors/magnitude-unit-vectors",
    },
    {
      label: "Dot Product, Angle, and Perpendicularity",
      href: "/notes/mht-cet-maths/vectors/dot-product",
    },
  ],
};
