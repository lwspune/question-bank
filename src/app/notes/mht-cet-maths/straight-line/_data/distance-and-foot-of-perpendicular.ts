import type { SubtopicNote } from "@/app/notes/_types";

export const DISTANCE_AND_FOOT_OF_PERPENDICULAR_NOTE: SubtopicNote = {
  subtopicName: "Distance — From a Point, Between Parallels, Along a Direction and the Foot of the Perpendicular",
  title: "Distance — From a Point, Between Parallels, Along a Direction and the Foot of the Perpendicular",
  oneLineDefinition:
    "|ax₀ + by₀ + c|/√(a² + b²) is the distance from a point to a line; |c₁ − c₂|/√(a² + b²) the gap between parallels; the foot of the perpendicular is where the perpendicular through the point meets the line; distance along a direction needs the parallel line through the point.",
  whyItMatters:
    "9 PYQs at 11% HARD. The stems are the nearest of four lines to the origin, points on a line at unit distance from another, the area of a square from two parallel sides (set in 2023 and 2024), the foot of the perpendicular from (−2, 3) to 3x − y = 1 (twice), a distance measured parallel to a third line, and the distance of an intersection point from the origin. " +
    "One formula per stem, applied once.",
  concepts: [
    // 1 — distance from a point
    {
      kind: "formula" as const,
      slug: "cetsl-distance-from-a-point-to-a-line",
      name: "Distance From a Point to a Line",
      intuition:
        "Substitute the point into the line's expression and divide by the length of the normal vector \\((a, b)\\). The sign of the numerator tells which side of the line the point is on; the modulus gives the distance.",
      definition:
        "- Distance of the origin from \\(ax + by + c = 0\\) is \\(\\dfrac{|c|}{\\sqrt{a^2 + b^2}}\\): \\(3x - 4y + 4 = 0\\) gives \\(0.8\\), \\(2x - 3y = 5\\) gives \\(\\dfrac{5}{\\sqrt{13}} \\approx 1.39\\), \\(4x - 3y + 12 = 0\\) gives \\(2.4\\), \\(5x - 2y = 3\\) gives \\(\\dfrac{3}{\\sqrt{29}} \\approx 0.56\\) — the nearest.\n" +
        "- Points on \\(2x - y = 5\\) at distance \\(1\\) from \\(3x + 4y = 5\\): \\(\\dfrac{|3x + 4y - 5|}{5} = 1\\) with \\(y = 2x - 5\\): \\(|11x - 25| = 5\\), \\(x = \\dfrac{30}{11}\\) or \\(\\dfrac{20}{11}\\): \\(\\left(\\dfrac{30}{11}, \\dfrac{5}{11}\\right)\\), \\(\\left(\\dfrac{20}{11}, -\\dfrac{15}{11}\\right)\\).\n" +
        "- \\(x + (a - 1)y = 1\\) and \\(2x + a^2y = 1\\) perpendicular forces \\(a = -1\\); they meet at \\(\\left(\\dfrac35, -\\dfrac15\\right)\\), at distance \\(\\sqrt{\\dfrac{2}{5}}\\) from the origin — a plain two-point distance once the point is found.\n" +
        "- Two answers to '\\(|\\cdot| = d\\)' are normal: one point on each side of the line.",
      formula: {
        label: "Point to line",
        latex:
          "d = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}",
      },
      visualizationSlug: "lines-distance-point-line",
      authoredExample: {
        prompt: "Find the distance of \\((3, -2)\\) from \\(5x + 12y - 4 = 0\\).",
        steps: [
          "\\(\\dfrac{|15 - 24 - 4|}{13} = \\dfrac{13}{13}\\).",
        ],
        answer: "\\(1\\)",
      },
      selfCheckExample: {
        prompt: "Find the points on the \\(x\\)-axis at distance \\(2\\) from \\(3x + 4y = 1\\).",
        steps: [
          "\\((t, 0)\\): \\(\\dfrac{|3t - 1|}{5} = 2 \\Rightarrow 3t - 1 = \\pm10 \\Rightarrow t = \\dfrac{11}{3}\\) or \\(-3\\).",
        ],
        answer: "\\(\\left(\\dfrac{11}{3}, 0\\right)\\) and \\((-3, 0)\\)",
      },
      practiceSet: [
        {
          prompt: "Distance of the origin from \\(3x - 4y + 4 = 0\\)?",
          answer: "\\(\\dfrac45\\)",
        },
        {
          prompt: "Distance of \\((1, 1)\\) from \\(x + y = 4\\)?",
          answer: "\\(\\sqrt2\\)",
        },
        {
          prompt: "\\(|11x - 25| = 5\\): \\(x = ?\\)",
          answer: "\\(\\dfrac{30}{11}\\), \\(\\dfrac{20}{11}\\)",
        },
        {
          prompt: "Distance of \\(\\left(\\dfrac35, -\\dfrac15\\right)\\) from the origin?",
          answer: "\\(\\sqrt{\\dfrac25}\\)",
        },
      ],
      pyqExampleId: "e9ca26c3-ca50-440a-955f-aa1cca65c981",
      traps: [
        {
          title: "Comparing |c| without dividing by √(a² + b²)",
          body:
            "\\(5x - 2y = 3\\) has the smallest constant AND the smallest distance, but \\(3x - 4y + 4 = 0\\) has \\(|c| = 4 > 3\\) and distance \\(0.8\\), less than \\(\\dfrac{5}{\\sqrt{13}}\\) from the line with \\(|c| = 5\\). Always divide.",
        },
      ],
    },

    // 2 — between parallels
    {
      kind: "formula" as const,
      slug: "cetsl-distance-between-parallel-lines",
      name: "Distance Between Parallel Lines, and the Square Between Them",
      intuition:
        "Write both lines with the SAME \\(a, b\\); then the gap is \\(\\dfrac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}\\). Two opposite sides of a square are parallel lines, so the side is that gap and the area its square.",
      definition:
        "- \\(4x + 3y - 20 = 0\\) and \\(4x + 3y + 15 = 0\\): gap \\(\\dfrac{35}{5} = 7\\), square area \\(49\\). \\(5x - 12y + 39 = 0\\), \\(5x - 12y + 78 = 0\\): gap \\(3\\), area \\(9\\).\n" +
        "- \\(L: \\dfrac{x}{5} + \\dfrac{y}{b} = 1\\) through \\((13, 32)\\) gives \\(b = -20\\), i.e. \\(4x - y = 20\\); \\(K: \\dfrac{x}{c} + \\dfrac{y}{3} = 1\\) parallel to it is \\(4x - y = -3\\); distance \\(\\dfrac{23}{\\sqrt{17}}\\).\n" +
        "- If the coefficients differ by a factor (\\(2x + y = 3\\) and \\(4x + 2y = 1\\)), scale one line first.\n" +
        "- The gap is also the distance from ANY point of one line to the other.",
      formula: {
        label: "Parallel lines",
        latex:
          "d = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}} \\quad\\text{for } ax + by + c_1 = 0,\\ ax + by + c_2 = 0",
      },
      authoredExample: {
        prompt: "Two sides of a square lie on \\(3x + 4y = 7\\) and \\(3x + 4y = 27\\). Find its area.",
        steps: [
          "Gap \\(\\dfrac{20}{5} = 4\\); area \\(16\\).",
        ],
        answer: "\\(16\\)",
      },
      selfCheckExample: {
        prompt: "Find the distance between \\(x - 2y = 1\\) and \\(2x - 4y = 9\\).",
        steps: [
          "Scale the first: \\(2x - 4y = 2\\). Gap \\(\\dfrac{|2 - 9|}{\\sqrt{20}} = \\dfrac{7}{2\\sqrt5}\\).",
        ],
        answer: "\\(\\dfrac{7}{2\\sqrt5}\\)",
      },
      practiceSet: [
        {
          prompt: "Gap between \\(4x + 3y = 20\\) and \\(4x + 3y = -15\\)?",
          answer: "\\(7\\)",
        },
        {
          prompt: "Gap between \\(5x - 12y = -39\\) and \\(5x - 12y = -78\\)?",
          answer: "\\(3\\)",
        },
        {
          prompt: "\\(b\\) if \\(\\dfrac{x}{5} + \\dfrac{y}{b} = 1\\) passes through \\((13, 32)\\)?",
          answer: "\\(-20\\)",
        },
        {
          prompt: "Gap between \\(4x - y = 20\\) and \\(4x - y = -3\\)?",
          answer: "\\(\\dfrac{23}{\\sqrt{17}}\\)",
        },
      ],
      pyqExampleId: "61b9e0ca-b386-4a21-9c5f-5ae8da97c10a",
      traps: [
        {
          title: "Subtracting constants of differently scaled lines",
          body:
            "\\(4x + 3y = 20\\) and \\(8x + 6y = 30\\) are not \\(10\\) apart; rescale to \\(4x + 3y = 15\\) first, giving \\(1\\).",
        },
      ],
    },

    // 3 — foot of perpendicular
    {
      kind: "formula" as const,
      slug: "cetsl-foot-of-the-perpendicular",
      name: "Foot of the Perpendicular: Intersect the Perpendicular Through the Point With the Line",
      intuition:
        "The foot is on the line and on the perpendicular through the given point. Write the perpendicular (negative reciprocal slope through the point) and solve the two equations — or use the ratio form \\(\\dfrac{h - x_1}{a} = \\dfrac{k - y_1}{b} = -\\dfrac{ax_1 + by_1 + c}{a^2 + b^2}\\).",
      definition:
        "- From \\((-2, 3)\\) to \\(3x - y - 1 = 0\\): the perpendicular has slope \\(-\\tfrac13\\), \\(x + 3y = 7\\); with \\(3x - y = 1\\): \\((1, 2)\\).\n" +
        "- Ratio form: \\(\\dfrac{h + 2}{3} = \\dfrac{k - 3}{-1} = -\\dfrac{-6 - 3 - 1}{10} = 1 \\Rightarrow (h, k) = (1, 2)\\).\n" +
        "- The reflection (image) of the point is twice as far: \\(2 \\times\\) foot \\(-\\) point \\(= (4, 1)\\).\n" +
        "- A tangent's point of contact on a circle is the foot of the perpendicular from the centre — the same computation in the Circle chapter.",
      formula: {
        label: "Foot of the perpendicular",
        latex:
          "\\frac{h - x_1}{a} = \\frac{k - y_1}{b} = -\\frac{ax_1 + by_1 + c}{a^2 + b^2}",
      },
      authoredExample: {
        prompt: "Find the foot of the perpendicular from \\((4, 1)\\) to \\(x + 2y = 6\\).",
        steps: [
          "\\(\\dfrac{h - 4}{1} = \\dfrac{k - 1}{2} = -\\dfrac{4 + 2 - 6}{5} = 0\\).",
        ],
        answer: "\\((4, 1)\\) — the point is already on the line.",
      },
      selfCheckExample: {
        prompt: "Find the foot of the perpendicular from \\((1, 5)\\) to \\(2x + y = 3\\), and the image of \\((1, 5)\\) in that line.",
        steps: [
          "\\(\\dfrac{h - 1}{2} = \\dfrac{k - 5}{1} = -\\dfrac{2 + 5 - 3}{5} = -\\dfrac45\\): foot \\(\\left(-\\dfrac35, \\dfrac{21}{5}\\right)\\).",
          "Image \\(= 2 \\cdot \\text{foot} - (1, 5) = \\left(-\\dfrac{11}{5}, \\dfrac{17}{5}\\right)\\).",
        ],
        answer: "Foot \\(\\left(-\\dfrac35, \\dfrac{21}{5}\\right)\\); image \\(\\left(-\\dfrac{11}{5}, \\dfrac{17}{5}\\right)\\)",
      },
      practiceSet: [
        {
          prompt: "Perpendicular through \\((-2, 3)\\) to \\(3x - y = 1\\)?",
          answer: "\\(x + 3y = 7\\)",
        },
        {
          prompt: "Foot from \\((-2, 3)\\) on \\(3x - y = 1\\)?",
          answer: "\\((1, 2)\\)",
        },
        {
          prompt: "Image of \\((-2, 3)\\) in \\(3x - y = 1\\)?",
          answer: "\\((4, 1)\\)",
        },
        {
          prompt: "Foot from \\((0, 0)\\) on \\(x + y = 2\\)?",
          answer: "\\((1, 1)\\)",
        },
      ],
      pyqExampleId: "061547f7-5643-437b-ad79-d489aa7dfbdf",
      traps: [
        {
          title: "Sign slips in the ratio form",
          body:
            "The common ratio is MINUS \\(\\dfrac{ax_1 + by_1 + c}{a^2 + b^2}\\). Dropping the minus sends the foot to the wrong side, \\((-5, 4)\\)-style, which is never on the line — check the foot satisfies the line's equation.",
        },
      ],
    },

    // 4 — distance along a direction
    {
      kind: "formula" as const,
      slug: "cetsl-distance-measured-along-a-direction",
      name: "Distance From a Point to a Line Measured Parallel to Another Line",
      intuition:
        "Draw the line through the point parallel to the given direction, find where it meets the target line, and measure the ordinary distance between the point and that meeting point. It is longer than the perpendicular distance unless the direction is the normal.",
      definition:
        "- From \\((1, 2)\\) to \\(x + y = 0\\) parallel to \\(3x - y = 2\\): the parallel through \\((1, 2)\\) is \\(3x - y = 1\\); it meets \\(x + y = 0\\) at \\(\\left(\\tfrac14, -\\tfrac14\\right)\\); distance \\(\\sqrt{\\left(\\tfrac34\\right)^2 + \\left(\\tfrac94\\right)^2} = \\dfrac{3\\sqrt{10}}{4}\\).\n" +
        "- Formula: if the direction has inclination \\(\\theta\\), the distance is \\(\\dfrac{|ax_1 + by_1 + c|}{|a\\cos\\theta + b\\sin\\theta|}\\).\n" +
        "- The perpendicular distance is the special case \\(\\theta = \\) direction of the normal, and it is the minimum over all directions.",
      formula: {
        label: "Along a direction",
        latex:
          "d_\\theta = \\frac{|ax_1 + by_1 + c|}{|a\\cos\\theta + b\\sin\\theta|}",
      },
      authoredExample: {
        prompt: "Find the distance of \\((2, 3)\\) from \\(x - y = 5\\) measured parallel to the \\(x\\)-axis.",
        steps: [
          "Parallel to the \\(x\\)-axis through \\((2, 3)\\): \\(y = 3\\); meets \\(x - y = 5\\) at \\((8, 3)\\).",
        ],
        answer: "\\(6\\)",
      },
      selfCheckExample: {
        prompt: "Find the distance of \\((0, 0)\\) from \\(x + y = 4\\) measured along the line \\(y = \\sqrt3 x\\).",
        steps: [
          "\\(\\theta = 60^\\circ\\): \\(d = \\dfrac{|{-4}|}{|\\cos 60^\\circ + \\sin 60^\\circ|} = \\dfrac{4}{\\frac12 + \\frac{\\sqrt3}{2}} = \\dfrac{8}{1 + \\sqrt3} = 4(\\sqrt3 - 1)\\).",
        ],
        answer: "\\(4(\\sqrt3 - 1)\\)",
      },
      practiceSet: [
        {
          prompt: "Line through \\((1, 2)\\) parallel to \\(3x - y = 2\\)?",
          answer: "\\(3x - y = 1\\)",
        },
        {
          prompt: "Where does \\(3x - y = 1\\) meet \\(x + y = 0\\)?",
          answer: "\\(\\left(\\dfrac14, -\\dfrac14\\right)\\)",
        },
        {
          prompt: "Distance from \\((1, 2)\\) to \\(\\left(\\dfrac14, -\\dfrac14\\right)\\)?",
          answer: "\\(\\dfrac{3\\sqrt{10}}{4}\\)",
        },
        {
          prompt: "Is the distance along a direction ever less than the perpendicular distance?",
          answer: "No.",
        },
      ],
      pyqExampleId: "ad6e6047-5eb0-42fe-b49a-5391296727d7",
      traps: [
        {
          title: "Reporting the perpendicular distance",
          body:
            "\\(\\dfrac{3}{\\sqrt2}\\) is the perpendicular distance from \\((1, 2)\\) to \\(x + y = 0\\); measured along \\(3x - y = 2\\) it is \\(\\dfrac{3\\sqrt{10}}{4}\\). 'Measured parallel to' changes the answer.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Circle — the tangent's point of contact is a foot of perpendicular",
      href: "/notes/mht-cet-maths/circle/cetcir-tangents",
    },
    {
      label: "Section Formula — the parallel-line ratio",
      href: "/notes/mht-cet-maths/straight-line/cetsl-section-formula-and-rectangles",
    },
  ],
};
