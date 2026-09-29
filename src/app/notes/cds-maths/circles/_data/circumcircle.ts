import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_CIRCUM_NOTE: SubtopicNote = {
  subtopicName: "Circumcircle and Locus",
  title: "The Circle Through Three Points, and Locus",
  oneLineDefinition:
    "Exactly one circle passes through three points that are not on a line; a locus is the path of every point that satisfies one condition.",
  whyItMatters:
    "Nine PYQs, four of them HARD. The circle through a triangle's vertices is centred where the perpendicular bisectors meet, and a right angle puts the hypotenuse on a diameter. The locus items ask which curve a moving point traces — usually a circle about a fixed centre.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-circumcircle",
      name: "Circumcircle of a triangle",
      intuition:
        "A point equally far from \\(A\\) and \\(B\\) lies on the perpendicular bisector of \\(AB\\). Two such bisectors meet in one point, the centre of the only circle through all three vertices.",
      definition:
        "- Three non-collinear points: exactly one circle. Collinear points (\\(AB + BC = AC\\)): none. Two points: infinitely many.\n" +
        "- A point at the same distance from all three vertices is the circumcentre, and that distance is the circumradius \\(R\\).\n" +
        "- Right triangle: the hypotenuse is a diameter, so \\(R = \\dfrac{\\text{hypotenuse}}{2}\\).\n" +
        "- Any triangle: \\(R = \\dfrac{abc}{4\\Delta}\\); equilateral with side \\(a\\): \\(R = \\dfrac{a}{\\sqrt3}\\).\n" +
        "- Each side is a chord, so its distance from the circumcentre is \\(\\sqrt{R^2 - (\\text{side}/2)^2}\\).",
      formula: {
        label: "Circumradius",
        latex: "R = \\dfrac{abc}{4\\Delta}",
      },
      authoredExample: {
        prompt: "A triangle with sides \\(7\\), \\(24\\) and \\(25\\) cm is inscribed in a circle. Find the radius.",
        steps: ["\\(7^2 + 24^2 = 25^2\\), so the triangle is right-angled.", "The hypotenuse is a diameter."],
        answer: "\\(12.5\\) cm.",
      },
      selfCheckExample: {
        prompt: "\\(AB = 4\\), \\(BC = 6\\), \\(CA = 10\\). Can a circle pass through \\(A\\), \\(B\\) and \\(C\\)?",
        steps: ["\\(4 + 6 = 10\\), so \\(B\\) lies on segment \\(AC\\): the points are collinear."],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "Sides \\(6, 8, 10\\). Circumradius?", answer: "\\(5\\)" },
        { prompt: "Equilateral, side \\(6\\sqrt3\\). Circumradius?", answer: "\\(6\\)" },
        { prompt: "Sides \\(5, 5, 6\\) (area \\(12\\)). Circumradius?", answer: "\\(\\dfrac{25}{8}\\)" },
        { prompt: "Circles through two given points?", answer: "Infinitely many" },
      ],
      pyqExampleId: "815de069-154d-4de2-8496-117fe3d39262", // 2022 (II) — sides 15, 9, 12 inscribed in a circle
      traps: [
        {
          title: "Equal distance from every vertex means circumcentre",
          body:
            "A point 'at the same distance from each vertex' is the circumcentre, not the incentre. The circle it centres may be a different, smaller circle; the sides are then chords of the circumcircle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsci-locus",
      name: "Locus of a moving point",
      intuition:
        "If a condition fixes a point's distance from one fixed point, the point moves on a circle about it. Most locus questions hide that fixed distance; find it and the answer is a circle.",
      definition:
        "- Midpoints of all radii of a circle of radius \\(r\\): a concentric circle of radius \\(\\dfrac r2\\).\n" +
        "- Midpoints of all chords of length \\(c\\): a concentric circle of radius \\(\\sqrt{r^2 - c^2/4}\\).\n" +
        "- \\(PA^2 + PB^2 =\\) constant: a circle centred at the midpoint of \\(AB\\).\n" +
        "- \\(PA = PB\\): the perpendicular bisector of \\(AB\\), a line.\n" +
        "- \\(\\angle APB = 90^\\circ\\): the circle on \\(AB\\) as diameter.",
      formula: {
        label: "Sum of squares",
        latex: "PA^2 + PB^2 = 2\\,PM^2 + \\dfrac{AB^2}{2}",
      },
      authoredExample: {
        prompt: "Find the locus of the midpoints of chords \\(10\\) cm long in a circle of radius \\(13\\) cm.",
        steps: ["Each midpoint is \\(\\sqrt{13^2 - 5^2} = 12\\) cm from the centre."],
        answer: "A concentric circle of radius \\(12\\) cm.",
      },
      selfCheckExample: {
        prompt: "\\(A = (-3, 0)\\), \\(B = (3, 0)\\) and \\(PA^2 + PB^2 = 50\\). Find the locus of \\(P\\).",
        steps: ["\\(2(x^2 + y^2) + 18 = 50\\), so \\(x^2 + y^2 = 16\\)."],
        answer: "A circle of radius \\(4\\) about the origin.",
      },
      practiceSet: [
        { prompt: "Midpoints of radii of a circle of radius \\(10\\)?", answer: "Concentric circle, radius \\(5\\)" },
        { prompt: "Points equidistant from \\(A\\) and \\(B\\)?", answer: "The perpendicular bisector of \\(AB\\)" },
        { prompt: "Points \\(P\\) with \\(\\angle APB = 90^\\circ\\)?", answer: "The circle on \\(AB\\) as diameter" },
        { prompt: "Midpoints of chords of length \\(r\\) in a circle of radius \\(r\\)?", answer: "Concentric circle, radius \\(\\dfrac{\\sqrt3}{2}r\\)" },
      ],
      pyqExampleId: "c0fd8d8f-2010-4dd3-bb8d-6a82323bca6b", // 2018 (I) — midpoints of radii of length 16 cm
      traps: [
        {
          title: "Sum of squares is a circle, not a line",
          body:
            "Equal DISTANCES from \\(A\\) and \\(B\\) give the perpendicular bisector. A constant SUM OF SQUARES of the distances gives a circle about the midpoint; the bisector is the distractor.",
        },
      ],
    },
  ],
};
