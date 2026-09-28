import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_TOUCHING_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Touching Circles",
  title: "Touching Circles",
  oneLineDefinition:
    "Circles that touch each other or the sides of a figure: join the centres, and the distance between them is the sum or the difference of the radii.",
  whyItMatters:
    "A small page, but the hardest in the chapter: most of its questions are HARD. They all yield to the same first move, so the page is short and the payoff is large.",
  concepts: [
    // C1 — join the centres
    {
      kind: "formula" as const,
      slug: "cdsm2-join-centres",
      name: "Join the centres",
      intuition:
        "The point where two circles touch lies on the line joining their centres. So the distance between the centres is the sum of the radii (touching from outside) or their difference (one inside the other). Turn the figure into a triangle of centres and use Pythagoras.",
      definition:
        "- Touching externally: \\(O_1O_2 = r_1 + r_2\\). Touching internally: \\(O_1O_2 = R - r\\).\n" +
        "- A circle touching a straight side has its centre at a distance \\(r\\) from that side.\n" +
        "- Three equal circles of radius \\(r\\) touching each other: centres form an equilateral triangle of side \\(2r\\); the circle round all three has radius \\(r + \\dfrac{2r}{\\sqrt3}\\).\n" +
        "- Four equal circles of diameter \\(D\\) touching in a square: the gap in the middle holds a circle of diameter \\(D(\\sqrt2 - 1)\\).\n" +
        "- Two equal circles cut from a disc of radius \\(R\\) are largest at radius \\(\\dfrac R2\\), leaving half the disc.",
      formula: {
        label: "Distance between centres",
        latex: "O_1O_2 = r_1 + r_2 \\;(\\text{outside}), \\qquad O_1O_2 = R - r \\;(\\text{inside})",
      },
      authoredExample: {
        prompt: "Two circles in a \\(10\\) cm by \\(8\\) cm rectangle: the larger touches the top, bottom and left sides, and the smaller touches the bottom side, the right side and the larger circle. Find the smaller radius.",
        steps: [
          "The larger circle has diameter \\(8\\), radius \\(4\\), centre \\((4, 4)\\).",
          "The smaller has centre \\((10 - r, r)\\). Touching: \\((6 - r)^2 + (r - 4)^2 = (4 + r)^2\\).",
          "\\(r^2 - 28r + 36 = 0\\), so \\(r = 14 - \\sqrt{160} \\approx 1.35\\) cm (the other root is far too large).",
        ],
        answer: "\\(14 - 4\\sqrt{10} \\approx 1.35\\) cm.",
      },
      selfCheckExample: {
        prompt: "Three circles of radius \\(2\\) cm touch each other. Find the radius of the smallest circle that encloses all three.",
        steps: [
          "The centres form an equilateral triangle of side \\(4\\), whose circumradius is \\(\\dfrac{4}{\\sqrt3}\\).",
          "The enclosing circle reaches one radius further: \\(R = \\dfrac{4}{\\sqrt3} + 2 = \\dfrac{4\\sqrt3}{3} + 2 \\approx 4.31\\) cm.",
        ],
        answer: "\\(2 + \\dfrac{4}{\\sqrt3}\\) cm.",
      },
      practiceSet: [
        { prompt: "Radii \\(3\\) and \\(5\\) touching externally: distance between centres?", answer: "\\(8\\)" },
        { prompt: "Radii \\(3\\) and \\(5\\) touching internally: distance between centres?", answer: "\\(2\\)" },
        { prompt: "Four circles of diameter \\(D\\) in a square: diameter of the middle circle?", answer: "\\(D(\\sqrt2 - 1)\\)" },
        { prompt: "Two largest equal discs from a sheet of area \\(A\\): area left?", answer: "\\(\\dfrac A2\\)" },
      ],
      pyqExampleId: "923d7891-79d7-4d51-9e04-ff66d801128d", // 2024 (II) — circle circumscribing three equal touching circles
      traps: [
        {
          title: "Reject the root that doesn't fit the figure",
          body:
            "The touching condition is a quadratic, and one root is usually impossible: a circle wider than the rectangle, or one that would overlap the other. Check the root against the figure before choosing.",
        },
      ],
    },

    // C2 — the gap between circles
    {
      kind: "formula" as const,
      slug: "cdsm2-gap-between-circles",
      name: "The gap between touching circles",
      intuition:
        "The curved region enclosed by circles that touch is the polygon of centres minus the sectors of the circles inside it. For three equal circles the three sectors are \\(60^\\circ\\) each, which together make half a circle.",
      definition:
        "- Three equal circles of radius \\(r\\): gap \\(= \\sqrt3 r^2 - \\dfrac{\\pi r^2}{2} = \\dfrac{r^2}{2}(2\\sqrt3 - \\pi)\\).\n" +
        "- Four equal coins at the corners of a square of side \\(2r\\): the four quarter-circles make one whole circle, so the uncovered part is \\(4r^2 - \\pi r^2\\).\n" +
        "- Circles of different radii at the corners of a triangle: sector at each corner \\(= \\dfrac{\\text{angle}}{360^\\circ}\\pi r^2\\); the three angles add to \\(180^\\circ\\).\n" +
        "- Radii of three mutually touching circles centred at the vertices of a triangle with sides \\(a, b, c\\): \\(s - a\\), \\(s - b\\), \\(s - c\\).",
      formula: {
        label: "Three equal touching circles",
        latex: "\\text{gap} = \\frac{\\sqrt3}{4}(2r)^2 - 3\\cdot\\frac{60^\\circ}{360^\\circ}\\pi r^2 = \\frac{r^2}{2}(2\\sqrt3 - \\pi)",
      },
      authoredExample: {
        prompt: "Three circles of radius \\(7\\) cm touch one another. Find the area enclosed between them. \\((\\pi = \\tfrac{22}{7},\\ \\sqrt3 = 1.732)\\)",
        steps: [
          "The centres form an equilateral triangle of side \\(14\\): area \\(\\dfrac{\\sqrt3}{4}\\times 196 = 49\\sqrt3 \\approx 84.87\\).",
          "The three \\(60^\\circ\\) sectors make half a circle: \\(\\dfrac12\\times\\dfrac{22}{7}\\times 49 = 77\\).",
          "Gap \\(\\approx 84.87 - 77 = 7.87\\) cm\\(^2\\).",
        ],
        answer: "about \\(7.87\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Circles are drawn with centres at the vertices of a triangle with sides \\(5\\), \\(12\\) and \\(13\\) cm, each touching the other two externally. Find their radii.",
        steps: [
          "\\(s = 15\\). The radii are \\(s - a\\), \\(s - b\\), \\(s - c\\): \\(10\\), \\(3\\) and \\(2\\) cm.",
          "Check: the pairs add to \\(5\\), \\(12\\) and \\(13\\).",
        ],
        answer: "\\(10\\), \\(3\\) and \\(2\\) cm.",
      },
      practiceSet: [
        { prompt: "Three equal touching circles: total angle of the sectors inside the triangle?", answer: "\\(180^\\circ\\)" },
        { prompt: "Four coins of radius \\(1\\) at the corners of a square of side \\(2\\): uncovered area?", answer: "\\(4 - \\pi\\)" },
        { prompt: "Three touching circles of radius \\(2\\): gap?", answer: "\\(4\\sqrt3 - 2\\pi\\)" },
        { prompt: "Right angle at \\(A\\), circle radius \\(4\\) there: sector inside the triangle?", answer: "\\(4\\pi\\)" },
      ],
      pyqExampleId: "3915c114-8f23-4d5a-955d-4f4ed4d3b284", // 2022 (I) — three circles of radius 4 touching
      visualizationSlug: "cds-touching-circles",
      traps: [
        {
          title: "The sectors add to half a circle, not a whole one",
          body:
            "Three \\(60^\\circ\\) sectors make \\(180^\\circ\\), half a circle. Subtracting a whole circle gives a negative gap, and an option built on it is usually printed.",
        },
      ],
    },
  ],
};
