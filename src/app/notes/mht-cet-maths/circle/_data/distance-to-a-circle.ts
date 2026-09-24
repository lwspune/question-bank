import type { SubtopicNote } from "@/app/notes/_types";

export const DISTANCE_TO_A_CIRCLE_NOTE: SubtopicNote = {
  subtopicName: "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area",
  title: "Distance From a Point to a Circle — Greatest, Least, a Line Cutting the Circle and the Segment Area",
  oneLineDefinition:
    "The least and greatest distances from an external point to a circle are d − r and d + r (d = distance to the centre); a line cuts the circle when its distance from the centre is less than r; and the area a chord cuts off is a sector minus a triangle.",
  whyItMatters:
    "6 PYQs at 17% HARD. Greatest and least distance from a point to a circle (twice, once continued to the far end of the diameter), the maximum distance from a point of the circle to a line, a count of integer m for which a line cuts the circle, the minor segment cut off by x = a/√2, and the median of an equilateral triangle inscribed in a circle. " +
    "The first three are the Complex Numbers 'greatest and least modulus' move in coordinate dress.",
  concepts: [
    // 1 — greatest and least distance
    {
      kind: "formula" as const,
      slug: "cetcir-greatest-and-least-distance",
      name: "Greatest and Least Distance: d ± r From a Point, and From the Circle to a Line",
      intuition:
        "Join the point to the centre; the line through both meets the circle at the nearest and farthest points, at \\(d - r\\) and \\(d + r\\). Similarly the farthest point of the circle from a line is the centre's distance to the line plus \\(r\\).",
      definition:
        "- \\(P(2, -7)\\), circle centre \\((7, 5)\\), \\(r = 15\\): \\(d = 13\\); least \\(15 - 13 = 2\\) (the point is inside!), greatest \\(28\\). Inside or outside, the two values are \\(|d - r|\\) and \\(d + r\\).\n" +
        "- \\(A(10, 7)\\), centre \\((2, 1)\\), \\(r = 5\\): \\(d = 10\\); \\(AM = 5\\), and \\(AM' = AM + 2r = 15\\) where \\(MM'\\) is the diameter through \\(M\\).\n" +
        "- Circle centre \\((-1, -1)\\), \\(r = \\sqrt5\\); line \\(2x + y + 13 = 0\\) at distance \\(\\dfrac{10}{\\sqrt5} = 2\\sqrt5\\) from the centre: maximum distance of a point of the circle from the line \\(= 3\\sqrt5\\), minimum \\(\\sqrt5\\).\n" +
        "- Same move as the greatest and least \\(|z|\\) on \\(|z - a| \\le r\\).",
      formula: {
        label: "Extreme distances",
        latex:
          "\\min = |d - r|,\\quad \\max = d + r \\qquad (d = \\text{distance from the point, or the line, to the centre})",
      },
      authoredExample: {
        prompt: "Find the greatest and least distances of \\((7, 9)\\) from \\(x^2 + y^2 - 2x - 2y - 7 = 0\\).",
        steps: [
          "Centre \\((1, 1)\\), \\(r = 3\\); \\(d = \\sqrt{36 + 64} = 10\\).",
        ],
        answer: "Least \\(7\\), greatest \\(13\\)",
      },
      selfCheckExample: {
        prompt: "Find the maximum and minimum distance of a point on \\(x^2 + y^2 = 4\\) from the line \\(3x + 4y = 20\\).",
        steps: [
          "Distance of the origin from the line: \\(4\\); \\(r = 2\\).",
        ],
        answer: "Maximum \\(6\\), minimum \\(2\\)",
      },
      practiceSet: [
        {
          prompt: "Centre and radius of \\(x^2 + y^2 - 14x - 10y - 151 = 0\\)?",
          answer: "\\((7, 5)\\), \\(15\\)",
        },
        {
          prompt: "\\(d\\) from \\((2, -7)\\) to \\((7, 5)\\)?",
          answer: "\\(13\\)",
        },
        {
          prompt: "\\(AM'\\) if \\(AM = 5\\) and \\(r = 5\\)?",
          answer: "\\(15\\)",
        },
        {
          prompt: "Max distance of a point of \\(x^2 + y^2 + 2x + 2y - 3 = 0\\) from \\(2x + y + 13 = 0\\)?",
          answer: "\\(3\\sqrt5\\)",
        },
      ],
      pyqExampleId: "841ed1c4-9fc4-42ea-aef8-85a7a0697938",
      traps: [
        {
          title: "Adding r twice for the far end of the diameter",
          body:
            "\\(AM' = AM + 2r\\) because \\(MM'\\) is a whole diameter — \\(5 + 10 = 15\\). \\(AM + r = 10\\) is option (A).",
        },
      ],
    },

    // 2 — line cutting the circle
    {
      kind: "formula" as const,
      slug: "cetcir-line-cutting-the-circle",
      name: "When a Line Cuts the Circle: Distance From the Centre < r",
      intuition:
        "Compare the centre's distance from the line with the radius: less means two intersection points, equal means a tangent, more means no intersection. For a line with a parameter, the inequality gives the range of the parameter.",
      definition:
        "- \\(x - 2y = m\\) with \\(x^2 + y^2 = 2x + 4y\\) (centre \\((1, 2)\\), \\(r = \\sqrt5\\)): \\(\\dfrac{|1 - 4 - m|}{\\sqrt5} < \\sqrt5 \\Rightarrow |m + 3| < 5 \\Rightarrow -8 < m < 2\\): nine integers.\n" +
        "- Strict inequality for two DISTINCT points; the endpoints \\(m = -8, 2\\) are tangents and are excluded.\n" +
        "- The chord length when the line cuts is \\(2\\sqrt{r^2 - p^2}\\), \\(p\\) the centre's distance.",
      formula: {
        label: "Line and circle",
        latex:
          "p = \\frac{|ah + bk + c|}{\\sqrt{a^2 + b^2}}:\\quad p < r \\text{ cuts},\\ p = r \\text{ touches},\\ p > r \\text{ misses};\\qquad \\text{chord} = 2\\sqrt{r^2 - p^2}",
      },
      authoredExample: {
        prompt: "For how many integers \\(k\\) does \\(y = x + k\\) cut \\(x^2 + y^2 = 8\\) at two distinct points?",
        steps: [
          "\\(\\dfrac{|k|}{\\sqrt2} < 2\\sqrt2 \\Rightarrow |k| < 4\\): \\(k = -3, \\dots, 3\\).",
        ],
        answer: "\\(7\\)",
      },
      selfCheckExample: {
        prompt: "Find the length of the chord cut by \\(3x + 4y = 5\\) on \\(x^2 + y^2 = 25\\).",
        steps: [
          "\\(p = 1\\); chord \\(= 2\\sqrt{25 - 1} = 2\\sqrt{24} = 4\\sqrt6\\).",
        ],
        answer: "\\(4\\sqrt6\\)",
      },
      practiceSet: [
        {
          prompt: "Centre and radius of \\(x^2 + y^2 = 2x + 4y\\)?",
          answer: "\\((1, 2)\\), \\(\\sqrt5\\)",
        },
        {
          prompt: "\\(|m + 3| < 5\\): integer \\(m\\)?",
          answer: "\\(-7, \\dots, 1\\) — nine values",
        },
        {
          prompt: "Does \\(x - 2y = 2\\) cut, touch or miss that circle?",
          answer: "Touches (\\(m = 2\\)).",
        },
        {
          prompt: "Chord length with \\(r = 5\\), \\(p = 3\\)?",
          answer: "\\(8\\)",
        },
      ],
      pyqExampleId: "455ced01-322f-466a-a1a5-a43fc1a687ac",
      traps: [
        {
          title: "Counting the tangent cases",
          body:
            "'Two distinct points' is strict: \\(m = -8\\) and \\(m = 2\\) are tangents. Including them gives \\(11\\), option (D); excluding both gives \\(9\\).",
        },
      ],
    },

    // 3 — segment area and circumcircle facts
    {
      kind: "formula" as const,
      slug: "cetcir-segment-area-and-circumcircle-facts",
      name: "Area Cut Off by a Chord, and the Circumcircle of an Equilateral Triangle",
      intuition:
        "A chord splits the disc into two segments; the minor one is a sector minus an isosceles triangle, or the integral \\(2\\int \\sqrt{a^2 - x^2}\\,dx\\) beyond the chord. For an equilateral triangle the circumradius is two-thirds of the median, so the median is \\(\\dfrac{3R}{2}\\).",
      definition:
        "- \\(x^2 + y^2 = a^2\\) cut by \\(x = \\dfrac{a}{\\sqrt2}\\): the chord subtends \\(90^\\circ\\) at the centre; segment \\(= \\dfrac{\\pi a^2}{4} - \\dfrac{a^2}{2} = \\dfrac{a^2}{2}\\left(\\dfrac{\\pi}{2} - 1\\right)\\). By integration: \\(2\\int_{a/\\sqrt2}^{a}\\sqrt{a^2 - x^2}\\,dx\\) gives the same.\n" +
        "- Circle centred at the origin through \\(A(2, 4)\\): \\(R = 2\\sqrt5\\); an inscribed equilateral triangle has median \\(= \\dfrac32 R = 3\\sqrt5\\).\n" +
        "- Segment by a chord subtending angle \\(\\theta\\) at the centre: \\(\\dfrac{r^2}{2}(\\theta - \\sin\\theta)\\).\n" +
        "- For an equilateral triangle the centroid, circumcentre and orthocentre coincide, and the centroid divides each median \\(2 : 1\\).",
      formula: {
        label: "Segment and circumradius",
        latex:
          "\\text{segment} = \\frac{r^2}{2}(\\theta - \\sin\\theta) \\qquad \\text{equilateral: median} = \\frac{3R}{2}",
      },
      authoredExample: {
        prompt: "Find the area of the minor segment cut off from \\(x^2 + y^2 = 16\\) by the line \\(y = 2\\).",
        steps: [
          "Half-chord \\(\\sqrt{16 - 4} = 2\\sqrt3\\); the chord subtends \\(2 \\cdot 60^\\circ = 120^\\circ = \\dfrac{2\\pi}{3}\\).",
          "Segment \\(= \\dfrac{16}{2}\\left(\\dfrac{2\\pi}{3} - \\dfrac{\\sqrt3}{2}\\right) = \\dfrac{16\\pi}{3} - 4\\sqrt3\\).",
        ],
        answer: "\\(\\dfrac{16\\pi}{3} - 4\\sqrt3\\)",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle is inscribed in \\(x^2 + y^2 = 36\\). Find its side.",
        steps: [
          "\\(R = 6\\); median \\(= 9\\); side \\(= \\dfrac{2}{\\sqrt3} \\cdot 9 = 6\\sqrt3\\).",
        ],
        answer: "\\(6\\sqrt3\\)",
      },
      practiceSet: [
        {
          prompt: "Angle subtended at the centre by the chord \\(x = \\dfrac{a}{\\sqrt2}\\) of \\(x^2 + y^2 = a^2\\)?",
          answer: "\\(90^\\circ\\)",
        },
        {
          prompt: "Quarter-disc area minus the triangle for \\(r = a\\)?",
          answer: "\\(\\dfrac{a^2}{2}\\left(\\dfrac{\\pi}{2} - 1\\right)\\)",
        },
        {
          prompt: "\\(R\\) for the circle through \\((2, 4)\\) centred at the origin?",
          answer: "\\(2\\sqrt5\\)",
        },
        {
          prompt: "Median of an equilateral triangle with \\(R = 2\\sqrt5\\)?",
          answer: "\\(3\\sqrt5\\)",
        },
      ],
      pyqExampleId: "d0af45e9-12f2-4fce-bec5-18973b72694a",
      traps: [
        {
          title: "Taking R as the median",
          body:
            "The circumradius is two-thirds of the median, so the median is \\(\\dfrac{3}{2}R = 3\\sqrt5\\); \\(2\\sqrt5\\) itself is option (A).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Complex Numbers — greatest and least modulus on a disc, the same move",
      href: "/notes/mht-cet-maths/complex-numbers/cetcn-locus",
    },
    {
      label: "Applications of Definite Integral — the segment by integration",
      href: "/notes/mht-cet-maths/applications-of-definite-integral",
    },
  ],
};
