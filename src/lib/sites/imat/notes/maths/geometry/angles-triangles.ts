import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_GEO_ANGLES_TRIANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles, Triangles and Polygons",
  title: "Angles, Triangles and Polygons",
  oneLineDefinition:
    "Angle facts for crossing and parallel lines, the angle sum and Pythagoras for triangles, similarity, and the angle sums of polygons.",
  whyItMatters:
    "Past questions used Pythagoras on a right triangle of given area (2016), similar triangles cut off by a parallel line (2021) and the area of a symmetric pentagon (2018). These facts also sit underneath most circle and coordinate questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-geo-angle-facts",
      name: "Angle facts for crossing lines and parallel lines",
      intuition:
        "A straight line is a half turn, 180°, and a full turn round a point is 360°. When a third line (a transversal) crosses two parallel lines, it meets both at the same slope, so the angles at the two crossings copy each other.",
      definition:
        "- A **transversal** is a line crossing two or more other lines.\n" +
        "- **Corresponding** angles sit in the same position at each crossing (an F shape).\n" +
        "- **Alternate** angles lie between the parallels on opposite sides of the transversal (a Z shape).\n" +
        "- **Co-interior** angles lie between the parallels on the same side of the transversal (a C shape).",
      table: {
        columns: ["Situation", "Fact"],
        rows: [
          { cells: ["Angles on a straight line", "Add up to \\(180^\\circ\\)"] },
          { cells: ["Angles around a point", "Add up to \\(360^\\circ\\)"] },
          { cells: ["Vertically opposite angles, where two lines cross", "Are equal"] },
          { cells: ["Corresponding angles on parallel lines", "Are equal"] },
          { cells: ["Alternate angles on parallel lines", "Are equal"] },
          { cells: ["Co-interior angles on parallel lines", "Add up to \\(180^\\circ\\)"], noteAmber: "Co-interior angles are supplementary, not equal." },
        ],
      },
      selfCheckExample: {
        prompt:
          "A transversal crosses two parallel lines. Two co-interior angles it makes measure \\((3x + 10)^\\circ\\) and \\((2x - 5)^\\circ\\). What is \\(x\\)?",
        options: ["\\(17\\)", "\\(35\\)", "\\(71\\)", "\\(36\\)", "\\(65\\)"],
        steps: [
          "Co-interior angles add up to \\(180^\\circ\\): \\(5x + 5 = 180\\), so \\(x = 35\\).",
          "The angles are \\(115^\\circ\\) and \\(65^\\circ\\), which do add to \\(180^\\circ\\).",
          "C uses \\(360^\\circ\\) and A uses \\(90^\\circ\\); D forgets the \\(+5\\); E is one of the angles, not \\(x\\).",
        ],
        answer: "(B) \\(35\\)",
      },
      practiceSet: [
        { prompt: "One angle on a straight line is \\(47^\\circ\\). Find the other.", answer: "\\(133^\\circ\\)" },
        { prompt: "Three angles round a point are \\(90^\\circ\\), \\(130^\\circ\\) and \\(x\\). Find \\(x\\).", answer: "\\(140^\\circ\\)" },
        { prompt: "An alternate angle to a \\(72^\\circ\\) angle measures?", answer: "\\(72^\\circ\\)" },
        { prompt: "A co-interior angle to a \\(105^\\circ\\) angle measures?", answer: "\\(75^\\circ\\)" },
      ],
      traps: [
        {
          title: "Only parallel lines give equal alternate and corresponding angles",
          body: "The equal-angle facts need the two lines to be parallel. If a diagram does not say so (arrows on the lines or words in the question), you cannot assume it, even if the lines look parallel.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-triangles",
      name: "Triangles: angle sum, Pythagoras and special right triangles",
      intuition:
        "Draw a line through one corner parallel to the opposite side and the three angles of the triangle fit together on it, so they add up to 180°. In a right triangle the squares on the two short sides together equal the square on the longest side. Two right triangles come up so often that their side ratios are worth knowing by heart.",
      definition:
        "- The angles of a triangle add up to \\(180^\\circ\\). An **exterior angle** equals the sum of the two interior angles not next to it.\n" +
        "- **Area** \\(= \\tfrac{1}{2} \\times \\text{base} \\times \\text{perpendicular height}\\).\n" +
        "- **Pythagoras**: in a right triangle with legs \\(a, b\\) and **hypotenuse** \\(c\\) (opposite the right angle), \\(a^2 + b^2 = c^2\\).\n" +
        "- **Isosceles**: two equal sides and two equal base angles; the height from the apex bisects the base.\n" +
        "- **45-45-90**: sides \\(1 : 1 : \\sqrt{2}\\). **30-60-90**: sides \\(1 : \\sqrt{3} : 2\\) (shortest side faces 30°).\n" +
        "- **Equilateral** with side \\(s\\): height \\(\\dfrac{\\sqrt{3}}{2}s\\), area \\(\\dfrac{\\sqrt{3}}{4}s^2\\).",
      formula: {
        label: "Pythagoras and triangle area",
        latex: "a^2 + b^2 = c^2 \\qquad A = \\tfrac{1}{2}bh",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "the two legs, which meet at the right angle" },
          { symbol: "\\(c\\)", meaning: "the hypotenuse" },
          { symbol: "\\(b, h\\)", meaning: "in the area formula: a base and the height perpendicular to it" },
        ],
      },
      authoredExample: {
        prompt: "An isosceles triangle has two sides of 13 cm and a base of 10 cm. Find its height and its area.",
        steps: [
          "The height from the apex splits the base into two halves of 5 cm, making two right triangles with hypotenuse 13 cm.",
          "Height: \\(\\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\) cm.",
          "Area: \\(\\tfrac{1}{2} \\times 10 \\times 12 = 60\\ \\text{cm}^2\\).",
        ],
        answer: "Height 12 cm; area \\(60\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle has a perimeter of 18 cm. What is its area?",
        options: [
          "\\(9\\sqrt{3}\\ \\text{cm}^2\\)",
          "\\(18\\sqrt{3}\\ \\text{cm}^2\\)",
          "\\(3\\sqrt{3}\\ \\text{cm}^2\\)",
          "\\(36\\ \\text{cm}^2\\)",
          "\\(81\\sqrt{3}\\ \\text{cm}^2\\)",
        ],
        steps: [
          "Side \\(= 18 / 3 = 6\\) cm; height \\(= \\sqrt{6^2 - 3^2} = 3\\sqrt{3}\\) cm.",
          "Area \\(= \\tfrac{1}{2} \\times 6 \\times 3\\sqrt{3} = 9\\sqrt{3}\\ \\text{cm}^2\\).",
          "B forgets the \\(\\tfrac{1}{2}\\); C is the height; E uses the perimeter as the side; D treats it as a square of side 6.",
        ],
        answer: "(A) \\(9\\sqrt{3}\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "Two angles of a triangle are \\(48^\\circ\\) and \\(77^\\circ\\). Find the third.", answer: "\\(55^\\circ\\)" },
        { prompt: "A right triangle has legs 9 and 12. Find the hypotenuse.", answer: "15" },
        { prompt: "A right isosceles triangle has legs of 5 cm. Find the hypotenuse.", answer: "\\(5\\sqrt{2}\\) cm" },
        { prompt: "A 30-60-90 triangle has hypotenuse 10. Find its two legs.", answer: "5 and \\(5\\sqrt{3}\\)" },
      ],
      traps: [
        {
          title: "The hypotenuse is the side opposite the right angle",
          body: "In \\(a^2 + b^2 = c^2\\), \\(c\\) must be the longest side, facing the right angle. Adding the squares of a leg and the hypotenuse gives nonsense; when the hypotenuse is known, subtract: \\(a^2 = c^2 - b^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-similar",
      name: "Congruent and similar triangles",
      intuition:
        "Similar triangles are enlargements of each other: same angles, every side multiplied by the same scale factor. A line drawn parallel to one side of a triangle cuts off a smaller copy of it, because the parallel line makes equal corresponding angles. Areas grow faster than lengths: by the square of the scale factor.",
      definition:
        "- **Congruent** triangles are identical in shape and size. Tests: SSS (three sides), SAS (two sides and the angle between), ASA (two angles and a side), RHS (right angle, hypotenuse, side).\n" +
        "- **Similar** triangles have equal angles; their corresponding sides are in a fixed ratio \\(k\\), the **scale factor**. Two equal angles are enough to prove similarity.\n" +
        "- A line parallel to one side of a triangle cuts off a triangle similar to the whole.\n" +
        "- If lengths scale by \\(k\\), areas scale by \\(k^2\\).",
      formula: {
        label: "Similar triangles",
        latex: "\\frac{a'}{a} = \\frac{b'}{b} = \\frac{c'}{c} = k \\qquad \\frac{\\text{Area}'}{\\text{Area}} = k^2",
        symbols: [
          { symbol: "\\(a, b, c\\)", meaning: "sides of one triangle" },
          { symbol: "\\(a', b', c'\\)", meaning: "the matching sides of the other" },
          { symbol: "\\(k\\)", meaning: "scale factor" },
        ],
      },
      authoredExample: {
        prompt:
          "In triangle ABC, point D is on AB and point E is on AC, with DE parallel to BC. AD = 4 cm, DB = 6 cm and DE = 5 cm. Find BC, and the ratio of the areas of triangles ADE and ABC.",
        steps: [
          "DE is parallel to BC, so triangle ADE is similar to triangle ABC.",
          "Matching sides: AB = 4 + 6 = 10 cm against AD = 4 cm, so the scale factor from small to large is \\(10/4 = 2.5\\).",
          "BC \\(= 2.5 \\times 5 = 12.5\\) cm.",
          "Area ratio ADE : ABC \\(= (4/10)^2 = 4 : 25\\).",
        ],
        answer: "BC = 12.5 cm; areas in the ratio 4 : 25",
      },
      selfCheckExample: {
        prompt:
          "Two triangles are similar. A side of the smaller one is 6 cm and the matching side of the larger one is 9 cm. The smaller triangle has an area of \\(20\\ \\text{cm}^2\\). What is the area of the larger one?",
        options: ["\\(30\\ \\text{cm}^2\\)", "\\(67.5\\ \\text{cm}^2\\)", "\\(8.9\\ \\text{cm}^2\\)", "\\(45\\ \\text{cm}^2\\)", "\\(60\\ \\text{cm}^2\\)"],
        steps: [
          "Scale factor \\(k = 9/6 = 1.5\\); areas scale by \\(k^2 = 2.25\\).",
          "\\(20 \\times 2.25 = 45\\ \\text{cm}^2\\).",
          "A scales the area by \\(k\\); B by \\(k^3\\); C divides instead of multiplying.",
        ],
        answer: "(D) \\(45\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "Similar triangles: sides 4 and 6 in one match sides 10 and ? in the other. Find ?.", answer: "15", method: "Scale factor 2.5" },
        { prompt: "Two similar triangles have scale factor 3. What is the ratio of their areas?", answer: "9 : 1" },
        { prompt: "DE is parallel to BC, AD : AB = 1 : 3 and DE = 4 cm. Find BC.", answer: "12 cm" },
        { prompt: "Are triangles with angles 50°, 60°, 70° and 70°, 50°, 60° similar?", answer: "Yes", method: "Same three angles" },
      ],
      traps: [
        {
          title: "Match the sides through the angles, not through their position on the page",
          body: "In the cut-off triangle, AD matches AB (the whole side), not DB. Use \\(AD/AB\\), not \\(AD/DB\\), for the scale factor; the second ratio gives a wrong answer that is usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-geo-polygons",
      name: "Polygons: interior and exterior angles",
      intuition:
        "From one corner of an n-sided polygon you can draw diagonals that split it into \\(n - 2\\) triangles, each holding 180°. Walking round any convex polygon you turn through one full turn in total, so the exterior angles always add up to 360°.",
      definition:
        "- The **interior angles** of an n-sided polygon add up to \\((n - 2) \\times 180^\\circ\\).\n" +
        "- The **exterior angles** (one at each corner, between a side and the next side extended) add up to \\(360^\\circ\\).\n" +
        "- At each corner, interior + exterior \\(= 180^\\circ\\).\n" +
        "- In a **regular** polygon (all sides and angles equal), each exterior angle is \\(360^\\circ / n\\).",
      formula: {
        label: "Polygon angles",
        latex: "S_{\\text{int}} = (n - 2) \\times 180^\\circ \\qquad \\text{regular: each exterior} = \\frac{360^\\circ}{n}",
        symbols: [{ symbol: "\\(n\\)", meaning: "number of sides" }],
      },
      authoredExample: {
        prompt: "Find the sum of the interior angles of an octagon and the size of each interior angle of a regular octagon.",
        steps: [
          "Sum: \\((8 - 2) \\times 180^\\circ = 1080^\\circ\\).",
          "Regular: each interior angle is \\(1080^\\circ / 8 = 135^\\circ\\).",
          "Check with exterior angles: \\(360^\\circ / 8 = 45^\\circ\\), and \\(180^\\circ - 45^\\circ = 135^\\circ\\).",
        ],
        answer: "\\(1080^\\circ\\); \\(135^\\circ\\) each",
      },
      selfCheckExample: {
        prompt: "Each interior angle of a regular polygon is \\(156^\\circ\\). How many sides does it have?",
        options: ["12", "13", "15", "18", "24"],
        steps: [
          "Each exterior angle is \\(180^\\circ - 156^\\circ = 24^\\circ\\).",
          "\\(n = 360^\\circ / 24^\\circ = 15\\).",
          "E gives the exterior angle instead of the number of sides.",
        ],
        answer: "(C) 15",
      },
      practiceSet: [
        { prompt: "Sum of the interior angles of a hexagon?", answer: "\\(720^\\circ\\)" },
        { prompt: "Each exterior angle of a regular pentagon?", answer: "\\(72^\\circ\\)" },
        { prompt: "Each interior angle of a regular decagon?", answer: "\\(144^\\circ\\)" },
        { prompt: "A pentagon has angles \\(100^\\circ, 110^\\circ, 120^\\circ, 90^\\circ\\) and \\(x\\). Find \\(x\\).", answer: "\\(120^\\circ\\)", method: "Sum is \\(540^\\circ\\)" },
      ],
      traps: [
        {
          title: "Exterior angles total 360° for every polygon",
          body: "The interior sum grows with the number of sides, but the exterior angles of any convex polygon add up to \\(360^\\circ\\). For a regular polygon, start from the exterior angle: it is the quickest route to \\(n\\).",
        },
      ],
    },
  ],
};
