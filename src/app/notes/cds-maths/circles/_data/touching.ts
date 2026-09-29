import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_TOUCHING_NOTE: SubtopicNote = {
  subtopicName: "Touching Circles",
  title: "Touching Circles",
  oneLineDefinition:
    "Circles that touch have their point of contact on the line of centres: the centres are r₁ + r₂ apart outside, r₁ − r₂ apart inside.",
  whyItMatters:
    "Ten PYQs, three of them HARD. Five give the sum of the areas and the distance between the centres, which is a sum-and-sum-of-squares system for the radii. Two of the HARD ones put circles in an angle, where each centre lies on the bisector.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-touching",
      name: "Radii from contact and areas",
      intuition:
        "Touching externally, the centres are the two radii apart; touching internally, one radius minus the other. A sum of areas gives the sum of squares, and the identity \\((a + b)^2 = a^2 + b^2 + 2ab\\) does the rest.",
      definition:
        "- External contact: \\(d = r_1 + r_2\\). Internal contact: \\(d = r_1 - r_2\\).\n" +
        "- Sum of areas \\(k\\pi\\): \\(r_1^2 + r_2^2 = k\\).\n" +
        "- Then \\(2r_1r_2 = (r_1 + r_2)^2 - k\\) and \\((r_1 - r_2)^2 = k - 2r_1r_2\\).\n" +
        "- Three circles centred at a triangle's vertices, each touching the other two: the radii add to the semi-perimeter \\(s\\), and the one at \\(A\\) is \\(s - a\\).",
      formula: {
        label: "Difference of the radii",
        latex: "(r_1 - r_2)^2 = 2(r_1^2 + r_2^2) - (r_1 + r_2)^2",
      },
      authoredExample: {
        prompt: "Two circles touch externally, their centres are \\(11\\) cm apart, and their areas add to \\(61\\pi\\) cm\\(^2\\). Find the radii.",
        steps: [
          "\\(r_1 + r_2 = 11\\), \\(r_1^2 + r_2^2 = 61\\).",
          "\\(2r_1r_2 = 121 - 61 = 60\\), so \\((r_1 - r_2)^2 = 61 - 60 = 1\\).",
        ],
        answer: "\\(6\\) cm and \\(5\\) cm.",
      },
      selfCheckExample: {
        prompt: "A triangle has sides \\(5\\), \\(7\\) and \\(8\\) cm. Circles centred at its vertices each touch the other two externally. Find the sum of the radii.",
        steps: ["The radii add to half the perimeter."],
        answer: "\\(10\\) cm.",
      },
      practiceSet: [
        { prompt: "Touching internally, radii \\(9\\) and \\(4\\). \\(d\\)?", answer: "\\(5\\)" },
        { prompt: "Touching externally, \\(d = 7\\), areas \\(25\\pi\\). Radii?", answer: "\\(4\\) and \\(3\\)" },
        { prompt: "Triangle \\(6, 10, 8\\), circles at vertices. Largest radius?", answer: "\\(6\\)" },
        { prompt: "Touching internally, \\(d = 2\\), areas \\(20\\pi\\). Radii?", answer: "\\(4\\) and \\(2\\)" },
      ],
      pyqExampleId: "206aa3e0-3d32-45dc-8256-f757287bb1ba", // 2022 (II) — areas add to 89π, centres 13 apart
      traps: [
        {
          title: "Internal contact uses the difference",
          body:
            "When one circle touches the other from inside, the centres are \\(r_1 - r_2\\) apart. Using the sum gives radii that do not fit the areas.",
        },
        {
          title: "Diameters, not radii",
          body:
            "Some items ask for the difference of the DIAMETERS, which is twice the difference of the radii.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-circle-in-angle",
      name: "Circles inside an angle",
      intuition:
        "A circle touching both arms of an angle is equally far from them, so its centre lies on the bisector. Its radius is its distance along the bisector times the sine of the half-angle.",
      definition:
        "- A circle touching both arms of angle \\(2\\theta\\) at vertex \\(A\\): centre on the bisector, \\(r = AO \\sin\\theta\\).\n" +
        "- Two such circles touching each other: \\(\\dfrac{r_2}{r_1} = \\dfrac{1 - \\sin\\theta}{1 + \\sin\\theta}\\).\n" +
        "- A right angle (\\(\\theta = 45^\\circ\\)): the centre of a circle of radius \\(r\\) is \\(r\\sqrt2\\) from the corner, and \\(\\dfrac{r_2}{r_1} = 3 - 2\\sqrt2\\).\n" +
        "- A \\(60^\\circ\\) angle (\\(\\theta = 30^\\circ\\)): \\(\\dfrac{r_2}{r_1} = \\dfrac13\\).",
      formula: {
        label: "Two circles in an angle",
        latex: "\\dfrac{r_2}{r_1} = \\dfrac{1 - \\sin\\theta}{1 + \\sin\\theta}",
      },
      authoredExample: {
        prompt: "Two circles in a \\(60^\\circ\\) angle touch both arms and each other. The larger has radius \\(12\\) cm. Find the smaller.",
        steps: ["Half-angle \\(30^\\circ\\): \\(\\dfrac{1 - \\frac12}{1 + \\frac12} = \\dfrac13\\)."],
        answer: "\\(4\\) cm.",
      },
      selfCheckExample: {
        prompt: "A circle of radius \\(5\\) cm touches two perpendicular lines. How far is its centre from the corner?",
        steps: ["The centre is \\((5, 5)\\) from the corner."],
        answer: "\\(5\\sqrt2\\) cm.",
      },
      practiceSet: [
        { prompt: "Right angle, larger radius \\(1\\). Smaller radius?", answer: "\\(3 - 2\\sqrt2\\)" },
        { prompt: "Areas in ratio \\(9 : 1\\). Radii ratio?", answer: "\\(3 : 1\\)" },
        { prompt: "Radius \\(3\\), angle \\(60^\\circ\\). Centre's distance from the vertex?", answer: "\\(6\\)" },
        { prompt: "Where is the centre of a circle touching both arms?", answer: "On the angle bisector" },
      ],
      pyqExampleId: "7c12fb0b-b882-4c66-bfa4-6b7274870ce6", // 2020 (I) — circle of diameter 8 cm in a right angle, smaller circle in the gap
      traps: [
        {
          title: "Sine of the HALF-angle",
          body:
            "The bisector splits the angle, so \\(r = AO\\sin\\theta\\) uses half the angle between the lines. With the full angle, a right angle would give \\(r = AO\\).",
        },
      ],
    },
  ],
};
