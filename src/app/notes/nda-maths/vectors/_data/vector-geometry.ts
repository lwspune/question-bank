import type { SubtopicNote } from "@/app/notes/_types";

export const VECTOR_GEOMETRY_NOTE: SubtopicNote = {
  subtopicName: "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
  title: "Vector Geometry — Triangles, Parallelograms, Quadrilaterals",
  oneLineDefinition:
    "Treating triangle / parallelogram / quadrilateral sides and diagonals as vectors, then using the loop identity, centroid formula and parallelogram law to extract distances and angles.",
  whyItMatters:
    "Once vectors are anchored at an origin, plane figures (triangles, parallelograms, quadrilaterals) become vector equations you can solve algebraically. " +
    "The closed-loop identity AB + BC + CA = 0 turns a triangle into one usable relation; the centroid is the average of the three vertex position vectors; parallelogram identities link sides to diagonals; named-vertex angles drop out of dot products on position vectors. " +
    "The four concepts below are the levers — once you spot which one is in play, every PYQ resolves to a few lines of algebra. " +
    "11 PYQs across 2017–2026, mostly MODERATE.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "triangle-vector-loop-and-centroid",
      name: "Triangle closed-loop and centroid formula",
      intuition:
        "Walking around a triangle from \\(A\\) to \\(B\\) to \\(C\\) and back to \\(A\\) returns you to the starting point, so the three side-vectors taken in order must sum to the zero vector. The centroid is the average of the three vertex position vectors — geometrically the meeting point of the three medians, which it divides in a \\(2:1\\) ratio.",
      definition:
        "For a triangle \\(ABC\\), the side-vectors satisfy \\(\\vec{AB} + \\vec{BC} + \\vec{CA} = \\vec{0}\\). " +
        "The centroid \\(G\\) has position vector \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}\\). " +
        "Each median is divided by \\(G\\) in ratio \\(2 : 1\\) (longer part from vertex to \\(G\\)).",
      formula: {
        label: "Loop identity + centroid",
        latex:
          "\\vec{AB} + \\vec{BC} + \\vec{CA} = \\vec{0} \\qquad \\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}, \\vec{c}\\)", meaning: "position vectors of vertices \\(A, B, C\\)" },
          { symbol: "\\(\\vec{AB}\\)", meaning: "side vector from \\(A\\) to \\(B\\), equal to \\(\\vec{b} - \\vec{a}\\)" },
          { symbol: "\\(\\vec{g}\\)", meaning: "position vector of the centroid \\(G\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "The vertices of a triangle have position vectors \\(\\vec{a} = \\hat{i} + 2\\hat{j}\\), \\(\\vec{b} = 3\\hat{i} + 4\\hat{j}\\), \\(\\vec{c} = 5\\hat{i} - \\hat{j}\\). " +
          "Find \\(\\vec{AG}\\), where \\(G\\) is the centroid.",
        steps: [
          "Compute the centroid: \\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3} = \\dfrac{(1+3+5)\\hat{i} + (2+4-1)\\hat{j}}{3} = 3\\hat{i} + \\dfrac{5}{3}\\hat{j}\\).",
          "Use \\(\\vec{AG} = \\vec{g} - \\vec{a} = \\left(3\\hat{i} + \\tfrac{5}{3}\\hat{j}\\right) - (\\hat{i} + 2\\hat{j}) = 2\\hat{i} - \\tfrac{1}{3}\\hat{j}\\).",
        ],
        answer: "\\(\\vec{AG} = 2\\hat{i} - \\dfrac{1}{3}\\hat{j}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the centroid of the triangle with vertices \\(A(1, 2, 3)\\), \\(B(3, -1, 0)\\), \\(C(2, 2, 3)\\).",
        steps: [
          "\\(\\vec{g} = \\dfrac{\\vec{a} + \\vec{b} + \\vec{c}}{3} = \\dfrac{(1+3+2)\\hat{i} + (2-1+2)\\hat{j} + (3+0+3)\\hat{k}}{3}\\).",
          "\\(\\vec{g} = 2\\hat{i} + \\hat{j} + 2\\hat{k}\\).",
        ],
        answer: "\\(\\vec{g} = 2\\hat{i} + \\hat{j} + 2\\hat{k}\\), i.e. \\((2, 1, 2)\\).",
      },
      pyqExampleId: "e5219e5f-57ad-4606-8d5d-5b4f3f57c485",
      traps: [
        {
          title: "Direction matters in the loop — \\(\\vec{BA} = -\\vec{AB}\\)",
          body:
            "The identity \\(\\vec{AB}+\\vec{BC}+\\vec{CA}=\\vec{0}\\) requires the sides to be traversed in one consistent direction around the triangle. " +
            "If a statement reads \\(\\vec{AB}+\\vec{BC}-\\vec{CA}=\\vec{0}\\), it's wrong — that's saying \\(\\vec{AC}\\) instead of \\(\\vec{CA}\\), which reverses one side.",
        },
        {
          title: "\\(\\vec{AG}\\) is NOT \\(\\vec{g}/3\\) — it is \\(\\vec{g} - \\vec{a}\\)",
          body:
            "A common factor-of-3 distractor. \\(\\vec{AG}\\) is the displacement from \\(A\\) to \\(G\\), so it equals \\(\\vec{g} - \\vec{a}\\). " +
            "After algebra \\(\\vec{AG} = \\dfrac{(\\vec{b}-\\vec{a}) + (\\vec{c}-\\vec{a})}{3}\\) — two-thirds of the median from \\(A\\).",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "parallelogram-properties-and-diagonals",
      name: "Parallelogram properties and diagonal relations",
      intuition:
        "A parallelogram has opposite sides equal and parallel as vectors. Its diagonals bisect each other, so the midpoint of one diagonal IS the midpoint of the other. Whenever a question mentions an origin \\(O\\) and a parallelogram, expect a clean linear identity built around that shared midpoint.",
      definition:
        "In parallelogram \\(ABCD\\) (vertices in order): \\(\\vec{AB} = \\vec{DC}\\) and \\(\\vec{AD} = \\vec{BC}\\). " +
        "Diagonals: \\(\\vec{AC} = \\vec{AB} + \\vec{AD}\\) and \\(\\vec{BD} = \\vec{AD} - \\vec{AB}\\), so " +
        "\\(\\vec{AB} = \\dfrac{\\vec{AC} - \\vec{BD}}{2}\\) and \\(\\vec{AD} = \\dfrac{\\vec{AC} + \\vec{BD}}{2}\\). " +
        "From any origin \\(O\\): \\(\\vec{OA} + \\vec{OC} = \\vec{OB} + \\vec{OD} = 2\\vec{OP}\\), where \\(P\\) is the common midpoint of \\(AC\\) and \\(BD\\).",
      formula: {
        label: "Sides from diagonals",
        latex:
          "\\vec{AB} = \\tfrac{1}{2}(\\vec{AC} - \\vec{BD}), \\quad \\vec{AD} = \\tfrac{1}{2}(\\vec{AC} + \\vec{BD}), \\quad \\vec{OA}+\\vec{OC} = \\vec{OB}+\\vec{OD}",
        symbols: [
          { symbol: "\\(ABCD\\)", meaning: "parallelogram with vertices labelled in order" },
          { symbol: "\\(\\vec{AC}, \\vec{BD}\\)", meaning: "diagonal vectors" },
          { symbol: "\\(O\\)", meaning: "arbitrary origin (often the centre or an external point)" },
        ],
      },
      authoredExample: {
        prompt:
          "In parallelogram \\(PQRS\\), let \\(\\vec{PR} = \\vec{a}\\) and \\(\\vec{QS} = \\vec{b}\\). " +
          "Find \\(\\vec{PQ}\\) in terms of \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        steps: [
          "Diagonal \\(\\vec{PR}\\) goes from \\(P\\) to \\(R\\); diagonal \\(\\vec{QS}\\) goes from \\(Q\\) to \\(S\\). In a parallelogram, walking \\(P\\to Q\\to R\\) gives \\(\\vec{PR} = \\vec{PQ} + \\vec{QR}\\); walking \\(Q\\to S\\) via \\(R\\) gives \\(\\vec{QS} = \\vec{QR} + \\vec{RS} = \\vec{QR} - \\vec{PQ}\\) (since \\(\\vec{RS} = -\\vec{PQ}\\)).",
          "Add the two: \\(\\vec{a} + \\vec{b} = 2\\vec{QR}\\), so \\(\\vec{QR} = \\dfrac{\\vec{a}+\\vec{b}}{2}\\).",
          "Subtract: \\(\\vec{a} - \\vec{b} = 2\\vec{PQ}\\), so \\(\\vec{PQ} = \\dfrac{\\vec{a}-\\vec{b}}{2}\\).",
        ],
        answer: "\\(\\vec{PQ} = \\dfrac{1}{2}(\\vec{a} - \\vec{b})\\)",
      },
      selfCheckExample: {
        prompt:
          "In parallelogram \\(ABCD\\), \\(\\vec{AB} = 3\\hat{i} + \\hat{j}\\) and \\(\\vec{AD} = \\hat{i} + 2\\hat{j}\\). Find the diagonal \\(\\vec{AC}\\).",
        steps: [
          "Diagonal \\(\\vec{AC} = \\vec{AB} + \\vec{AD}\\).",
          "\\(= (3+1)\\hat{i} + (1+2)\\hat{j} = 4\\hat{i} + 3\\hat{j}\\).",
        ],
        answer: "\\(\\vec{AC} = 4\\hat{i} + 3\\hat{j}\\)",
      },
      pyqExampleId: "fd094a97-71e2-4df2-9844-d448aef38e6f",
      traps: [
        {
          title: "Vertex order \\(ABCD\\) matters",
          body:
            "If the vertices are listed in a non-cyclic order, the figure is NOT a parallelogram in the standard sense. \\(\\vec{AB} = \\vec{DC}\\) (not \\(\\vec{CD}\\)) — the equal sides are the ones going in the SAME direction around the figure.",
        },
        {
          title: "The fourth vertex of a parallelogram: \\(D = A + C - B\\)",
          body:
            "If \\(A, B, C\\) are three consecutive vertices, \\(\\vec{AD} = \\vec{BC}\\) forces \\(\\vec{d} = \\vec{a} + \\vec{c} - \\vec{b}\\). " +
            "A factor-of-2 distractor here often offers \\(\\vec{a} + \\vec{c} - 2\\vec{b}\\); reject it.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "angles-and-vertices-from-position-vectors",
      name: "Angles and vertices from position vectors",
      intuition:
        "The angle at vertex \\(C\\) of a triangle is the angle between the two sides leaving \\(C\\) — namely \\(\\vec{CA}\\) and \\(\\vec{CB}\\). Build those side-vectors from position vectors, then plug into the dot-product angle formula. Same idea works for the angle between diagonals of a quadrilateral.",
      definition:
        "If \\(A, B, C\\) have position vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\), the side vectors at \\(C\\) are " +
        "\\(\\vec{CA} = \\vec{a} - \\vec{c}\\) and \\(\\vec{CB} = \\vec{b} - \\vec{c}\\). " +
        "Then \\(\\cos C = \\dfrac{\\vec{CA}\\cdot\\vec{CB}}{|\\vec{CA}|\\,|\\vec{CB}|}\\). " +
        "For a quadrilateral with diagonals \\(AC\\) and \\(BD\\), the same formula applies with the two diagonal vectors.",
      formula: {
        label: "Angle at vertex from position vectors",
        latex:
          "\\cos C = \\dfrac{(\\vec{a} - \\vec{c})\\cdot(\\vec{b} - \\vec{c})}{|\\vec{a} - \\vec{c}|\\,|\\vec{b} - \\vec{c}|}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}, \\vec{c}\\)", meaning: "position vectors of the vertices" },
          { symbol: "\\(C\\)", meaning: "angle of the triangle at vertex \\(C\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "The vertices of triangle \\(ABC\\) have position vectors \\(\\vec{a} = \\hat{i} + \\hat{j}\\), \\(\\vec{b} = 3\\hat{i} + 5\\hat{j}\\), \\(\\vec{c} = 5\\hat{i} + \\hat{j}\\). " +
          "Find the angle at vertex \\(C\\).",
        steps: [
          "Build the side vectors at \\(C\\): \\(\\vec{CA} = \\vec{a} - \\vec{c} = -4\\hat{i}\\), \\(\\vec{CB} = \\vec{b} - \\vec{c} = -2\\hat{i} + 4\\hat{j}\\).",
          "Dot product: \\(\\vec{CA}\\cdot\\vec{CB} = (-4)(-2) + 0\\cdot 4 = 8\\).",
          "Magnitudes: \\(|\\vec{CA}| = 4\\), \\(|\\vec{CB}| = \\sqrt{4 + 16} = 2\\sqrt{5}\\).",
          "Apply the angle formula: \\(\\cos C = \\dfrac{8}{4 \\cdot 2\\sqrt{5}} = \\dfrac{1}{\\sqrt{5}}\\).",
        ],
        answer: "\\(C = \\cos^{-1}\\!\\left(\\dfrac{1}{\\sqrt{5}}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Find the angle between \\(\\vec{p} = \\hat{i} + \\sqrt{3}\\,\\hat{j}\\) and \\(\\vec{q} = \\hat{i}\\).",
        steps: [
          "Dot: \\(\\vec{p}\\cdot\\vec{q} = 1\\cdot 1 + \\sqrt{3}\\cdot 0 = 1\\).",
          "Magnitudes: \\(|\\vec{p}| = \\sqrt{1 + 3} = 2\\), \\(|\\vec{q}| = 1\\).",
          "\\(\\cos\\theta = \\dfrac{1}{2\\cdot 1} = \\dfrac{1}{2}\\), so \\(\\theta = \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{\\pi}{3}\\) (i.e. \\(60^\\circ\\))",
      },
      pyqExampleId: "77319cff-1210-425f-9d1c-c42ddbcac754",
      traps: [
        {
          title: "Direction of side vectors changes the angle",
          body:
            "The angle at \\(C\\) is between \\(\\vec{CA}\\) and \\(\\vec{CB}\\) — NOT between \\(\\vec{AC}\\) and \\(\\vec{BC}\\). " +
            "Reversing both flips the dot-product sign and gives \\(\\pi - C\\) instead of \\(C\\). Always start from the named vertex outwards.",
        },
        {
          title: "Fourth-vertex problems: \\(D = A + C - B\\), not the midpoint",
          body:
            "If a parallelogram \\(ABCD\\) lists \\(A, B, C\\) as consecutive vertices, the fourth vertex \\(D\\) satisfies \\(\\vec{AD} = \\vec{BC}\\), giving \\(\\vec{d} = \\vec{a} + \\vec{c} - \\vec{b}\\). Mid-segment formulas applied here are the typical wrong-option trap.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "distance-identities-in-quadrilaterals",
      name: "Distance and perpendicularity identities in quadrilaterals",
      intuition:
        "Quadrilateral distance puzzles are almost always tests of vector arithmetic. Expand each squared distance as \\(|\\vec{XY}|^2 = \\vec{XY}\\cdot\\vec{XY}\\), collect like terms, and watch dot products with shared edges cancel. The parallelogram law \\(|\\vec{p}+\\vec{q}|^2 + |\\vec{p}-\\vec{q}|^2 = 2(|\\vec{p}|^2 + |\\vec{q}|^2)\\) is the workhorse identity.",
      definition:
        "For any four points \\(P, Q, R, S\\) with position vectors \\(\\vec{p}, \\vec{q}, \\vec{r}, \\vec{s}\\): " +
        "\\(\\vec{PQ}\\) is parallel to \\(\\vec{RS}\\) iff \\(\\vec{PQ} \\times \\vec{RS} = \\vec{0}\\); " +
        "perpendicular iff \\(\\vec{PQ} \\cdot \\vec{RS} = 0\\). " +
        "Squared distances expand as \\(|\\vec{PQ}|^2 = (\\vec{q}-\\vec{p})\\cdot(\\vec{q}-\\vec{p}) = |\\vec{q}|^2 - 2\\vec{p}\\cdot\\vec{q} + |\\vec{p}|^2\\).",
      formula: {
        label: "Parallelogram law and distance expansion",
        latex:
          "|\\vec{p}+\\vec{q}|^2 + |\\vec{p}-\\vec{q}|^2 = 2(|\\vec{p}|^2 + |\\vec{q}|^2)",
        symbols: [
          { symbol: "\\(\\vec{p}, \\vec{q}\\)", meaning: "any two vectors (often diagonals or sides)" },
          { symbol: "\\(|\\vec{p}+\\vec{q}|, |\\vec{p}-\\vec{q}|\\)", meaning: "diagonal magnitudes when \\(\\vec{p}, \\vec{q}\\) are sides" },
        ],
      },
      authoredExample: {
        prompt:
          "Points have position vectors \\(\\vec{p} = \\hat{i}\\), \\(\\vec{q} = \\hat{j}\\), \\(\\vec{r} = -\\hat{i}\\), \\(\\vec{s} = -\\hat{j}\\). " +
          "Check whether \\(\\vec{PQ}\\) is parallel to \\(\\vec{SR}\\) and whether \\(\\vec{PR}\\) is perpendicular to \\(\\vec{QS}\\).",
        steps: [
          "Compute the vectors: \\(\\vec{PQ} = \\vec{q} - \\vec{p} = -\\hat{i} + \\hat{j}\\); \\(\\vec{SR} = \\vec{r} - \\vec{s} = -\\hat{i} + \\hat{j}\\).",
          "They are equal (and hence parallel — in fact same direction): the figure has a pair of parallel sides.",
          "Now \\(\\vec{PR} = \\vec{r} - \\vec{p} = -2\\hat{i}\\); \\(\\vec{QS} = \\vec{s} - \\vec{q} = -2\\hat{j}\\).",
          "Dot product: \\(\\vec{PR}\\cdot\\vec{QS} = (-2)(0) + 0(-2) = 0\\), so the diagonals are perpendicular.",
        ],
        answer: "\\(\\vec{PQ} \\parallel \\vec{SR}\\) and \\(\\vec{PR} \\perp \\vec{QS}\\).",
      },
      selfCheckExample: {
        prompt:
          "For points with position vectors \\(\\vec{p} = \\hat{i}\\), \\(\\vec{q} = \\hat{j}\\), \\(\\vec{r} = -\\hat{i}\\), \\(\\vec{s} = -\\hat{j}\\), are the diagonals \\(\\vec{PR}\\) and \\(\\vec{QS}\\) perpendicular?",
        steps: [
          "\\(\\vec{PR} = \\vec{r} - \\vec{p} = -2\\hat{i}\\); \\(\\vec{QS} = \\vec{s} - \\vec{q} = -2\\hat{j}\\).",
          "Dot: \\(\\vec{PR}\\cdot\\vec{QS} = (-2)(0) + (0)(-2) = 0\\) — perpendicular.",
        ],
        answer: "Yes — \\(\\vec{PR}\\cdot\\vec{QS} = 0\\), so \\(\\vec{PR} \\perp \\vec{QS}\\).",
      },
      pyqExampleId: "1815d449-8aa2-486f-8eff-8d12762246f5",
      traps: [
        {
          title: "Direction of comparison matters for parallelism",
          body:
            "Two vectors are parallel if one is a scalar multiple of the other — the scalar can be negative. " +
            "\\(\\vec{PQ}\\) and \\(\\vec{RS}\\) point in opposite directions yet are still parallel. " +
            "But if a PYQ asks whether \\(\\vec{PQ}\\) and \\(\\vec{SR}\\) are equal (not just parallel), the sign matters.",
        },
        {
          title: "Expand squared distances algebraically — don't reach for coordinates first",
          body:
            "An identity like \\(PQ^2 + 2QS^2 - 2PR^2 = ?\\) is much faster to verify by expanding each \\(|\\cdots|^2\\) as a dot product and collecting terms in \\(\\vec{p}\\cdot\\vec{q}\\), \\(\\vec{p}\\cdot\\vec{r}\\), etc., than by plugging in coordinates and computing each squared distance separately.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Position vectors and section",
      href: "/notes/nda-maths/vectors/position-vectors-section",
    },
    {
      label: "Dot product and angle",
      href: "/notes/nda-maths/vectors/dot-product-angle",
    },
  ],
};
