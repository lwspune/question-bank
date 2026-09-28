import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_CONES_NOTE: SubtopicNote = {
  subtopicName: "Cones",
  title: "Cones",
  oneLineDefinition:
    "Volume and surface of a cone, the right triangle formed by its radius, height and slant height, and cones made by rolling a sector or turning a triangle.",
  whyItMatters:
    "Cone questions are one right triangle wearing different clothes. Draw the axial section — radius, height, slant height, and the half-angle at the vertex — and nearly every question becomes Pythagoras or a trigonometric ratio.",
  concepts: [
    // C1 — the right triangle
    {
      kind: "formula" as const,
      slug: "cdsm3-cone-triangle",
      name: "Radius, height, slant height — one right triangle",
      intuition:
        "Cut a cone down its axis and you see a right triangle with legs \\(r\\) and \\(h\\) and hypotenuse \\(l\\). The volume uses \\(h\\); the curved surface uses \\(l\\). Mixing them up is the commonest error on this page.",
      definition:
        "- \\(l^2 = r^2 + h^2\\).\n" +
        "- Volume \\(\\dfrac13\\pi r^2 h\\) (vertical height).\n" +
        "- Curved surface \\(\\pi r l\\) (slant height); total \\(\\pi r(l + r)\\).\n" +
        "- Total : curved \\(= (l + r) : l\\).\n" +
        "- A canvas tent is the curved surface only; cloth of width \\(w\\) needs length \\(\\dfrac{\\pi r l}{w}\\).",
      formula: {
        label: "Cone",
        latex: "V = \\tfrac13\\pi r^2 h, \\quad \\text{CSA} = \\pi r l, \\quad l^2 = r^2 + h^2",
      },
      authoredExample: {
        prompt: "A cone has radius \\(7\\) cm and slant height \\(25\\) cm. Find its volume. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(h = \\sqrt{25^2 - 7^2} = 24\\) cm.",
          "\\(V = \\dfrac13\\times\\dfrac{22}{7}\\times 49\\times 24 = 1232\\) cm\\(^3\\).",
        ],
        answer: "\\(1232\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "A conical tent is \\(8\\) m high with base radius \\(6\\) m. How many metres of cloth \\(2\\) m wide are needed? \\((\\pi = 3.14)\\)",
        steps: [
          "\\(l = \\sqrt{36 + 64} = 10\\) m.",
          "Curved surface \\(= 3.14\\times 6\\times 10 = 188.4\\) m\\(^2\\).",
          "Length \\(= \\dfrac{188.4}{2} = 94.2\\) m.",
        ],
        answer: "\\(94.2\\) m.",
      },
      practiceSet: [
        { prompt: "\\(r = 3\\), \\(h = 4\\): curved surface?", answer: "\\(15\\pi\\)" },
        { prompt: "\\(r = 3\\), \\(h = 4\\): total surface?", answer: "\\(24\\pi\\)" },
        { prompt: "\\(r : l = 1 : 4\\): total : curved?", answer: "\\(5 : 4\\)" },
        { prompt: "\\(r = 6\\), \\(h = 7\\): volume? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(264\\)" },
      ],
      pyqExampleId: "c39f8bce-b18c-4a45-a993-e7b7512c80bc", // 2018 (I) — radius 5, slant height 13
      visualizationSlug: "cds-cone-anatomy",
      traps: [
        {
          title: "Volume uses h, surface uses l",
          body:
            "Putting the slant height into \\(\\dfrac13\\pi r^2 h\\) is the planted error — with \\(r = 9\\) and \\(l = 15\\) it gives \\(405\\pi\\) instead of \\(324\\pi\\).",
        },
      ],
    },

    // C2 — the vertical angle
    {
      kind: "formula" as const,
      slug: "cdsm3-vertical-angle",
      name: "The vertical angle and the axial section",
      intuition:
        "The vertical angle is split in two by the axis. The half-angle sits at the apex of the right triangle, opposite the radius, so \\(\\sin = \\dfrac rl\\) and \\(\\tan = \\dfrac rh\\).",
      definition:
        "For semi-vertical angle \\(\\alpha\\) (half the vertical angle):\n" +
        "- \\(r = l\\sin\\alpha\\), \\(h = l\\cos\\alpha\\), \\(r = h\\tan\\alpha\\).\n" +
        "- Vertical angle \\(90^\\circ\\): \\(r = h\\). Vertical angle \\(60^\\circ\\): \\(r = \\dfrac l2\\). Vertical angle \\(120^\\circ\\): \\(h = \\dfrac l2\\), \\(r = \\dfrac{\\sqrt3}{2}l\\).\n" +
        "- An equilateral axial section of side \\(a\\): \\(r = \\dfrac a2\\), \\(h = \\dfrac{\\sqrt3}{2}a\\).",
      formula: {
        label: "Semi-vertical angle α",
        latex: "r = l\\sin\\alpha, \\qquad h = l\\cos\\alpha",
      },
      authoredExample: {
        prompt: "A cone has a vertical angle of \\(90^\\circ\\) and slant height \\(6\\sqrt2\\) cm. Find its volume.",
        steps: [
          "The half-angle is \\(45^\\circ\\), so \\(r = h = 6\\sqrt2\\cdot\\dfrac{1}{\\sqrt2} = 6\\) cm.",
          "\\(V = \\dfrac13\\pi(36)(6) = 72\\pi\\) cm\\(^3\\).",
        ],
        answer: "\\(72\\pi\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "The axial section of a cone is an equilateral triangle of side \\(6\\) cm. Find its curved surface area.",
        steps: [
          "\\(r = 3\\) and the slant height is a side of the triangle, \\(l = 6\\).",
          "Curved surface \\(= \\pi(3)(6) = 18\\pi\\) cm\\(^2\\).",
        ],
        answer: "\\(18\\pi\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Vertical angle \\(60^\\circ\\): \\(r : l\\)?", answer: "\\(1 : 2\\)" },
        { prompt: "Vertical angle \\(120^\\circ\\): \\(r : l\\)?", answer: "\\(\\sqrt3 : 2\\)" },
        { prompt: "Vertical angle \\(90^\\circ\\), \\(h = 4\\): radius?", answer: "\\(4\\)" },
        { prompt: "Equilateral axial section of side \\(10\\): height?", answer: "\\(5\\sqrt3\\)" },
      ],
      pyqExampleId: "b64814e4-89d3-4eb5-803a-bdd6f771c3fb", // 2025 (I) — vertex angle 120°, l + h + r = 9 + 3√3
      traps: [
        {
          title: "Halve the vertical angle first",
          body:
            "The trigonometry uses the half-angle at the apex. Taking \\(\\sin 120^\\circ\\) instead of \\(\\sin 60^\\circ\\) happens to give the same value, which hides the slip until a \\(90^\\circ\\) or \\(60^\\circ\\) cone exposes it.",
        },
      ],
    },

    // C3 — rolling and revolving
    {
      kind: "formula" as const,
      slug: "cdsm3-cone-from-sector",
      name: "Cones from a sector or a turning triangle",
      intuition:
        "Roll a sector of a circle and its radius becomes the slant height while its arc becomes the base circumference. Spin a right triangle about one leg and that leg becomes the height, the other the radius.",
      definition:
        "- Sector of radius \\(R\\) and angle \\(\\theta\\) rolled up: \\(l = R\\), \\(2\\pi r = \\dfrac{\\theta}{360^\\circ}2\\pi R\\), so \\(r = \\dfrac{\\theta}{360^\\circ}R\\).\n" +
        "- A semicircle makes a cone with \\(r = \\dfrac R2\\): the half-angle is \\(30^\\circ\\).\n" +
        "- A right triangle turned about a leg: that leg is the height, the other leg the radius, the hypotenuse the slant height.",
      formula: {
        label: "Sector rolled into a cone",
        latex: "l = R, \\qquad r = \\frac{\\theta}{360^\\circ}\\,R",
      },
      authoredExample: {
        prompt: "A sector of radius \\(12\\) cm and angle \\(120^\\circ\\) is rolled into a cone. Find the cone's radius and height.",
        steps: [
          "\\(l = 12\\) and \\(r = \\dfrac{120}{360}\\times 12 = 4\\) cm.",
          "\\(h = \\sqrt{144 - 16} = \\sqrt{128} = 8\\sqrt2\\) cm.",
        ],
        answer: "\\(r = 4\\) cm, \\(h = 8\\sqrt2\\) cm.",
      },
      selfCheckExample: {
        prompt: "A right triangle with legs \\(6\\) and \\(8\\) cm is turned about the \\(8\\) cm leg. Find the volume of the cone formed.",
        steps: [
          "Height \\(8\\), radius \\(6\\).",
          "\\(V = \\dfrac13\\pi(36)(8) = 96\\pi\\) cm\\(^3\\).",
        ],
        answer: "\\(96\\pi\\) cm\\(^3\\).",
      },
      practiceSet: [
        { prompt: "Semicircle of radius \\(10\\) rolled: cone radius?", answer: "\\(5\\)" },
        { prompt: "Quarter circle of radius \\(8\\) rolled: cone radius?", answer: "\\(2\\)" },
        { prompt: "Legs \\(3, 4\\) turned about \\(4\\): slant height?", answer: "\\(5\\)" },
        { prompt: "Semicircle rolled: angle between generator and axis?", answer: "\\(30^\\circ\\)" },
      ],
      pyqExampleId: "82d9feb4-bfe6-496a-a7dd-5560488e460c", // 2021 (II) — triangle 8, 6 turned about BC
    },
  ],
};
