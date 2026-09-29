import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_CENTRES_NOTE: SubtopicNote = {
  subtopicName: "Centres of a Triangle",
  title: "Centres of a Triangle",
  oneLineDefinition:
    "A triangle has four classical centres — centroid, incentre, circumcentre and orthocentre — each the meeting point of three special lines, and each with its own rule about where it lies.",
  whyItMatters:
    "Sixteen PYQs. Six are statement questions about where each centre lies, which one table answers. Six more use the two radii — the circumradius of a right triangle is half the hypotenuse, its inradius is (a + b − c) ÷ 2. The hardest items come in two sets, from the 2024 (I) and 2026 (II) papers, and are solved fastest by putting the triangle on coordinates.",
  concepts: [
    // C1 — the four centres (reference)
    {
      kind: "reference" as const,
      slug: "cdstg-four-centres",
      name: "The four centres and where they lie",
      intuition:
        "Each centre is where three lines of the same kind meet. Two of them — the centroid and the incentre — are built from lines that stay inside the triangle, so they are always inside. The other two move outside when the triangle has an obtuse angle.",
      definition:
        "- **Centroid \\(G\\):** where the medians meet; always inside; it divides each median \\(2 : 1\\) from the vertex.\n" +
        "- **Incentre \\(I\\):** where the angle bisectors meet; always inside; the same distance \\(r\\) from all three sides.\n" +
        "- **Circumcentre \\(O\\):** where the perpendicular bisectors of the sides meet; the same distance \\(R\\) from all three vertices, so the circumcircle is unique.\n" +
        "- **Orthocentre \\(H\\):** where the altitudes meet. \\(A\\), \\(B\\), \\(C\\) and \\(H\\) form a set in which each point is the orthocentre of the triangle made by the other three.\n" +
        "- In an equilateral triangle all four coincide.",
      table: {
        columns: ["Centre", "Acute triangle", "Right triangle", "Obtuse triangle"],
        rows: [
          { cells: ["Centroid", "inside", "inside", "inside"] },
          { cells: ["Incentre", "inside", "inside", "inside"] },
          { cells: ["Circumcentre", "inside", "midpoint of the hypotenuse", "outside"] },
          { cells: ["Orthocentre", "inside", "at the right-angle vertex", "outside"], noteAmber: "In a right triangle the two legs are themselves altitudes, so they meet at the right angle." },
        ],
        caption: "The centroid and incentre never leave the triangle; the circumcentre and orthocentre do when an angle is obtuse.",
      },
      selfCheckExample: {
        prompt: "A pole stands inside a triangular park, and its top has the same angle of elevation from all three corners. Which centre of the triangle is the foot of the pole?",
        steps: [
          "Equal angles of elevation to one top mean equal horizontal distances to the three corners.",
          "The point equidistant from the three vertices is the circumcentre.",
        ],
        answer: "The circumcentre.",
      },
      practiceSet: [
        { prompt: "Which centre is equidistant from the three sides?", answer: "Incentre" },
        { prompt: "Which centres always lie inside?", answer: "Centroid and incentre" },
        { prompt: "Orthocentre of a right triangle?", answer: "At the right-angle vertex" },
        { prompt: "How many circumcircles can a triangle have?", answer: "Exactly one" },
      ],
      pyqExampleId: "8aebfbe5-eb73-4af6-977c-b39216606e28", // 2018 (I) — where orthocentre and centroid lie
      traps: [
        {
          title: "'On the triangle' is not 'inside'",
          body:
            "The orthocentre of a right triangle is a vertex, and the circumcentre is the midpoint of a side: both lie ON the triangle. A statement saying 'inside' or 'outside' for a right triangle is false.",
        },
      ],
    },

    // C2 — circumradius and inradius
    {
      kind: "formula" as const,
      slug: "cdstg-circumradius-inradius",
      name: "Circumradius and inradius",
      intuition:
        "A right angle stands on a diameter, so the hypotenuse of a right triangle is the diameter of its circumcircle. The incircle touches each side, and the two tangents from a vertex are equal, which turns the inradius of a right triangle into a one-line formula.",
      definition:
        "- **Any triangle:** \\(R = \\dfrac{abc}{4\\Delta}\\) and \\(r = \\dfrac{\\Delta}{s}\\), where \\(s\\) is half the perimeter.\n" +
        "- **Right triangle** (hypotenuse \\(c\\)): \\(R = \\dfrac c2\\) and \\(r = \\dfrac{a + b - c}{2}\\).\n" +
        "- **Equilateral** (side \\(a\\)): \\(R = \\dfrac{a}{\\sqrt3}\\), \\(r = \\dfrac{a}{2\\sqrt3}\\), so \\(R = 2r\\).\n" +
        "- **Tangent lengths:** from vertex \\(A\\) to the incircle the tangent is \\(s - a\\). If the incircle touches \\(BC\\), \\(CA\\), \\(AB\\) at \\(D\\), \\(E\\), \\(F\\), then \\(\\angle EDF = 90^\\circ - \\dfrac A2\\).",
      formula: {
        label: "Right-triangle radii",
        latex: "R = \\dfrac c2, \\qquad r = \\dfrac{a + b - c}{2}",
      },
      visualizationSlug: "pt-circumcircle-incircle",
      authoredExample: {
        prompt: "Find the circumradius and the inradius of the right triangle with sides \\(6\\), \\(8\\), \\(10\\).",
        steps: [
          "The hypotenuse is \\(10\\), so \\(R = 5\\).",
          "\\(r = \\dfrac{6 + 8 - 10}{2} = 2\\). Check: \\(\\Delta = 24\\), \\(s = 12\\), \\(\\dfrac{24}{12} = 2\\).",
        ],
        answer: "\\(R = 5\\), \\(r = 2\\).",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle is inscribed in a circle of radius \\(12\\). Find its side and its inradius.",
        steps: [
          "\\(a = R\\sqrt3 = 12\\sqrt3\\).",
          "\\(r = \\dfrac R2 = 6\\).",
        ],
        answer: "Side \\(12\\sqrt3\\), inradius \\(6\\).",
      },
      practiceSet: [
        { prompt: "Inradius of the \\(20, 21, 29\\) triangle?", answer: "\\(6\\)" },
        { prompt: "Circumradius of the \\(9, 12, 15\\) triangle?", answer: "\\(7.5\\)" },
        { prompt: "Circumradius of an equilateral triangle of side \\(6\\sqrt3\\)?", answer: "\\(6\\)" },
        { prompt: "\\(A = 60^\\circ\\). Angle \\(EDF\\) of the triangle joining the incircle's touching points?", answer: "\\(60^\\circ\\)" },
      ],
      pyqExampleId: "391c6535-7afa-4f53-a79e-42abd38ac897", // 2024 (II) — inradius, legs 5 and 12
      traps: [
        {
          title: "Halve it",
          body:
            "\\(a + b - c\\) is the incircle's DIAMETER in a right triangle. For \\(8, 15, 17\\) it is \\(6\\), and the radius is \\(3\\).",
        },
      ],
    },

    // C3 — coordinates for the hard ones
    {
      kind: "formula" as const,
      slug: "cdstg-centres-by-coordinates",
      name: "Placing the triangle on axes",
      intuition:
        "The HARD centre questions ask for exact ratios along an altitude or the radius of a circle squeezed into a corner. Put the triangle on coordinates with its symmetry along an axis and each centre is the crossing of two straight lines.",
      definition:
        "- **Isosceles triangle:** put the base on the \\(x\\)-axis centred at the origin, the apex on the \\(y\\)-axis. The altitude from the apex is \\(x = 0\\); intersect it with one more altitude to get the orthocentre.\n" +
        "- **An altitude** is perpendicular to its side: if the side has slope \\(m\\), the altitude has slope \\(-\\dfrac1m\\).\n" +
        "- **A circle in a corner** touching both sides of angle \\(A\\) has its centre on the bisector of \\(A\\), at distance \\(\\dfrac{\\rho}{\\sin(A/2)}\\) from \\(A\\). If it also touches the incircle (radius \\(r\\)) from outside: \\(\\dfrac{r - \\rho}{\\sin(A/2)} = r + \\rho\\).",
      formula: {
        label: "Circle in the corner of angle A",
        latex: "\\rho = r\\,\\dfrac{1 - \\sin(A/2)}{1 + \\sin(A/2)}",
      },
      authoredExample: {
        prompt: "Triangle \\(PQR\\) has \\(QP = QR = 13\\) and \\(PR = 10\\). \\(QM\\) is the altitude from \\(Q\\) and \\(H\\) is the orthocentre. Find \\(QH : HM\\).",
        steps: [
          "Put \\(P(-5, 0)\\), \\(R(5, 0)\\), \\(Q(0, 12)\\); then \\(M\\) is the origin and \\(QM = 12\\).",
          "\\(QR\\) has slope \\(-\\dfrac{12}{5}\\), so the altitude from \\(P\\) has slope \\(\\dfrac{5}{12}\\): \\(y = \\dfrac{5}{12}(x + 5)\\).",
          "At \\(x = 0\\), \\(y = \\dfrac{25}{12}\\), so \\(H = \\left(0, \\dfrac{25}{12}\\right)\\).",
          "\\(HM = \\dfrac{25}{12}\\) and \\(QH = 12 - \\dfrac{25}{12} = \\dfrac{119}{12}\\).",
        ],
        answer: "\\(119 : 25\\).",
      },
      selfCheckExample: {
        prompt: "A right triangle has inradius \\(2\\). A small circle sits in the right-angle corner, touching both legs and the incircle. Find its radius.",
        steps: [
          "At the right angle, \\(\\sin 45^\\circ = \\dfrac{1}{\\sqrt2}\\).",
          "\\(\\rho = 2\\cdot\\dfrac{1 - 1/\\sqrt2}{1 + 1/\\sqrt2} = 2\\cdot\\dfrac{\\sqrt2 - 1}{\\sqrt2 + 1} = 2(\\sqrt2 - 1)^2\\).",
        ],
        answer: "\\(6 - 4\\sqrt2 \\approx 0.34\\).",
      },
      practiceSet: [
        { prompt: "Orthocentre of the triangle \\((0,0)\\), \\((4,0)\\), \\((0,3)\\)?", answer: "\\((0, 0)\\)" },
        { prompt: "Centroid of \\((0,0)\\), \\((6,0)\\), \\((0,9)\\)?", answer: "\\((2, 3)\\)" },
        { prompt: "Circumcentre of \\((0,0)\\), \\((8,0)\\), \\((0,6)\\)?", answer: "\\((4, 3)\\)" },
        { prompt: "A side has slope \\(\\dfrac34\\). Slope of the altitude to it?", answer: "\\(-\\dfrac43\\)" },
      ],
      pyqExampleId: "a6cdbe6c-a647-47a7-8259-d98684a8a6f9", // 2026 (II) — QP = QR = 15, PR = 18: QO : OM
      traps: [
        {
          title: "Half the angle",
          body:
            "The corner circle's centre is on the bisector, so the distance from the vertex is \\(\\dfrac{\\rho}{\\sin(A/2)}\\), not \\(\\dfrac{\\rho}{\\sin A}\\). Get \\(\\sin\\dfrac A2\\) from \\(\\cos A\\) with \\(\\sin^2\\dfrac A2 = \\dfrac{1 - \\cos A}{2}\\).",
        },
      ],
    },
  ],
};
