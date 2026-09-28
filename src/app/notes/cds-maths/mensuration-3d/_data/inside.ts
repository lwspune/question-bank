import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_INSIDE_NOTE: SubtopicNote = {
  subtopicName: "Solids Inside Solids",
  title: "Solids Inside Solids",
  oneLineDefinition:
    "One solid fitted inside another so that it just touches: a cube in a sphere, a cylinder round a sphere, a sphere in a cone, and balls or cones touching each other.",
  whyItMatters:
    "The hardest page of the chapter: more than half its questions are HARD. The method is always the same — find the ONE length the two solids share (a diagonal, a diameter, a height) — and then the question is the formulas of the earlier pages.",
  concepts: [
    // C1 — cube, cylinder and sphere nested
    {
      kind: "formula" as const,
      slug: "cdsm3-nested-cube-sphere",
      name: "Cube, cylinder and sphere nested",
      intuition:
        "A cube inside a sphere touches it at its corners, so the cube's space diagonal is the sphere's diameter. A cylinder or sphere inside a cube touches its faces, so its diameter is the cube's edge.",
      definition:
        "- Cube in a sphere: \\(a\\sqrt3 = 2R\\).\n" +
        "- Sphere in a cube: \\(2r = a\\).\n" +
        "- Cylinder just enclosing a sphere: radius \\(r\\), height \\(2r\\); its curved surface equals the sphere's surface, \\(4\\pi r^2\\).\n" +
        "- Cuboid in a sphere: the sphere's diameter is the space diagonal.\n" +
        "- Cylinder inscribed in a sphere of radius \\(R\\) with height \\(2x\\): radius \\(\\sqrt{R^2 - x^2}\\).",
      formula: {
        label: "Cube in a sphere",
        latex: "a\\sqrt3 = 2R",
      },
      authoredExample: {
        prompt: "A cube is inscribed in a sphere of radius \\(3\\sqrt3\\) cm. Find the cube's volume.",
        steps: [
          "\\(a\\sqrt3 = 6\\sqrt3\\), so \\(a = 6\\) cm.",
          "Volume \\(= 216\\) cm\\(^3\\).",
        ],
        answer: "\\(216\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "A cylinder of height \\(6\\) cm is inscribed in a sphere of radius \\(5\\) cm. Find the cylinder's volume.",
        steps: [
          "Half the height is \\(3\\), so the cylinder's radius is \\(\\sqrt{25 - 9} = 4\\).",
          "Volume \\(= \\pi(16)(6) = 96\\pi\\) cm\\(^3\\).",
        ],
        answer: "\\(96\\pi\\) cm\\(^3\\).",
      },
      practiceSet: [
        { prompt: "Sphere in a cube of edge \\(8\\): sphere's volume?", answer: "\\(\\tfrac{256\\pi}{3}\\)" },
        { prompt: "Cuboid \\(2\\times 3\\times 6\\) in a sphere: sphere's radius?", answer: "\\(3.5\\)" },
        { prompt: "Cylinder round a sphere of radius \\(r\\): curved surface?", answer: "\\(4\\pi r^2\\)" },
        { prompt: "Cube of edge \\(2\\) in a sphere: sphere's radius?", answer: "\\(\\sqrt3\\)" },
      ],
      pyqExampleId: "c44d2515-1eae-4dfb-b54d-7943fce09139", // 2020 (I) — cylinder just encloses a sphere
    },

    // C2 — sphere in a cone
    {
      kind: "formula" as const,
      slug: "cdsm3-sphere-in-cone",
      name: "A sphere inside a cone",
      intuition:
        "Cut through the axis. The cone becomes an isosceles triangle and a sphere touching its sides becomes the triangle's incircle. So the sphere's radius is the triangle's area divided by its semi-perimeter.",
      definition:
        "- Axial section: triangle with base \\(2r\\), height \\(h\\), equal sides \\(l\\).\n" +
        "- Inscribed sphere's radius \\(= \\dfrac{\\text{area}}{s} = \\dfrac{rh}{r + l}\\).\n" +
        "- A sphere touching the cone's sides has its centre \\(\\dfrac{\\rho}{\\sin\\alpha}\\) from the apex (\\(\\alpha\\) the semi-vertical angle).\n" +
        "- Two spheres stacked in a cone: \\(\\sin\\alpha = \\dfrac{R - r}{R + r}\\).",
      formula: {
        label: "Sphere in a cone",
        latex: "\\rho = \\frac{rh}{r + l}",
      },
      authoredExample: {
        prompt: "A cone has base radius \\(6\\) cm and height \\(8\\) cm. Find the radius of the sphere that fits inside it, touching the base and the sides.",
        steps: [
          "\\(l = 10\\).",
          "\\(\\rho = \\dfrac{6\\times 8}{6 + 10} = 3\\) cm.",
        ],
        answer: "\\(3\\) cm.",
      },
      selfCheckExample: {
        prompt: "For the same cone full of water, the sphere is pushed in until just immersed. What volume of water is left?",
        steps: [
          "Cone \\(= \\dfrac13\\pi(36)(8) = 96\\pi\\).",
          "Sphere \\(= \\dfrac43\\pi(27) = 36\\pi\\).",
          "Left \\(= 60\\pi\\) cm\\(^3\\).",
        ],
        answer: "\\(60\\pi\\) cm\\(^3\\).",
      },
      practiceSet: [
        { prompt: "Cone \\(r = 5\\), \\(h = 12\\): inscribed sphere's radius?", answer: "\\(\\tfrac{10}{3}\\)" },
        { prompt: "Axial section equilateral, side \\(6\\): inscribed sphere's radius?", answer: "\\(\\sqrt3\\)" },
        { prompt: "Stacked spheres \\(R = 3\\), \\(r = 1\\): \\(\\sin\\alpha\\)?", answer: "\\(\\tfrac12\\)" },
        { prompt: "Incircle radius of a triangle, area \\(A\\), semi-perimeter \\(s\\)?", answer: "\\(\\tfrac{A}{s}\\)" },
      ],
      pyqExampleId: "8e47fce6-af15-47fb-9040-5b1d44ffccfa", // 2022 (II) — cone r 12, h 16; sphere touching the sides
    },

    // C3 — touching solids
    {
      kind: "formula" as const,
      slug: "cdsm3-touching-solids",
      name: "Balls and cones that touch",
      intuition:
        "Equal balls or cones standing on a plane and touching each other have their centres (or their base centres) at the corners of an equilateral triangle. A fourth ball resting on three sits above the centre of that triangle.",
      definition:
        "- Three equal circles of radius \\(r\\) touching: centres form an equilateral triangle of side \\(2r\\), circumradius \\(\\dfrac{2r}{\\sqrt3}\\).\n" +
        "- A fourth ball on three: its centre is \\(\\sqrt{(2r)^2 - \\dfrac{4r^2}{3}} = 2r\\sqrt{\\tfrac23}\\) above the other centres, which are themselves \\(r\\) above the ground.\n" +
        "- The apexes of three equal cones touching on a plane lie on a circle of radius \\(\\dfrac{2r}{\\sqrt3}\\).",
      formula: {
        label: "Fourth ball on three",
        latex: "\\text{height of centre} = r + 2r\\sqrt{\\tfrac23}",
      },
      authoredExample: {
        prompt: "Three equal balls of radius \\(\\sqrt3\\) cm lie on a table, each touching the other two. Find the radius of the circle through their centres.",
        steps: [
          "The centres form an equilateral triangle of side \\(2\\sqrt3\\).",
          "Its circumradius is \\(\\dfrac{2\\sqrt3}{\\sqrt3} = 2\\) cm.",
        ],
        answer: "\\(2\\) cm.",
      },
      selfCheckExample: {
        prompt: "A fourth ball of the same radius \\(\\sqrt3\\) rests on those three. How high above the table is its centre?",
        steps: [
          "Above the plane of the lower centres: \\(\\sqrt{(2\\sqrt3)^2 - 2^2} = \\sqrt8 = 2\\sqrt2\\).",
          "Add \\(\\sqrt3\\) for the lower centres' height: \\(\\sqrt3 + 2\\sqrt2 \\approx 4.56\\) cm.",
        ],
        answer: "\\(\\sqrt3 + 2\\sqrt2\\) cm.",
      },
      practiceSet: [
        { prompt: "Three touching circles of radius \\(1\\): circumradius of the centres' triangle?", answer: "\\(\\tfrac{2}{\\sqrt3}\\)" },
        { prompt: "Three equal cones of base radius \\(\\sqrt3\\): circle through the apexes, radius?", answer: "\\(2\\)" },
        { prompt: "Fourth ball on three, radius \\(r\\): centre above the lower centres by?", answer: "\\(2r\\sqrt{\\tfrac23}\\)" },
        { prompt: "Centres of balls on a table are how high?", answer: "One radius" },
      ],
      pyqExampleId: "77c0aed5-61ee-4b02-ab11-7066f286be82", // 2024 (II) — three cones of base radius 3 touching
      traps: [
        {
          title: "Measure from the table, not from the lower centres",
          body:
            "The fourth ball's centre is \\(2r\\sqrt{\\tfrac23}\\) above the other CENTRES. The question usually asks for its height above the plane, which adds one more \\(r\\).",
        },
      ],
    },
  ],
};
