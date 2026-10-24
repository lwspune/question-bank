import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_LA_REGULAR_NOTE: SubtopicNote = {
  subtopicName: "Regular Polygons",
  title: "Regular Polygons",
  oneLineDefinition:
    "In a regular polygon every side and every angle is equal, so each exterior angle is 360° divided by the number of sides, each interior angle is 180° minus that, and one side subtends the same 360°/n at the centre.",
  whyItMatters:
    "Ten questions in the bank, nine EASY and one MODERATE, all from the 2025 shifts. Most give one angle and ask for the number of sides, or give the sides and ask for an angle. The fast route for all of them is the exterior angle: it is 360°/n, it is the easy number to divide, and the interior angle is only 180° minus it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssclarg-angle",
      name: "Each interior and exterior angle of a regular polygon",
      intuition:
        "The exterior angles of any polygon add to 360°. In a regular polygon all n of them are equal, so each one is 360° shared n ways. The interior angle at the same corner makes a straight line with it, so it is what is left of 180°.",
      definition:
        "- Each **exterior angle** of a regular n-sided polygon \\(= \\frac{360^\\circ}{n}\\).\n" +
        "- Each **interior angle** \\(= 180^\\circ - \\frac{360^\\circ}{n}\\), which is the same as \\(\\frac{(n - 2) \\times 180^\\circ}{n}\\).\n" +
        "- Fast route: find the exterior angle first (one division of 360), then subtract from 180. It is quicker than dividing the interior sum by n.\n" +
        "- Values worth knowing: triangle \\(60^\\circ\\), square \\(90^\\circ\\), pentagon \\(108^\\circ\\), hexagon \\(120^\\circ\\), octagon \\(135^\\circ\\), decagon \\(144^\\circ\\), dodecagon (12 sides) \\(150^\\circ\\).\n" +
        "- As n grows, each exterior angle shrinks towards \\(0^\\circ\\) and each interior angle grows towards \\(180^\\circ\\), but never reaches it.",
      formula: {
        label: "One angle of a regular polygon",
        latex:
          "\\text{exterior} = \\frac{360^\\circ}{n} \\qquad \\text{interior} = 180^\\circ - \\frac{360^\\circ}{n} = \\frac{(n - 2) \\times 180^\\circ}{n}",
        symbols: [{ symbol: "n", meaning: "the number of equal sides" }],
      },
      authoredExample: {
        prompt: "Find each interior angle of a regular decagon (10 sides).",
        steps: [
          "Exterior angle \\(= \\frac{360}{10} = 36^\\circ\\).",
          "Interior angle \\(= 180 - 36 = 144^\\circ\\).",
          "Check with the sum: \\(\\frac{(10 - 2) \\times 180}{10} = \\frac{1440}{10} = 144\\).",
        ],
        answer: "\\(144^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "What is the ratio of each interior angle of a regular pentagon to each interior angle of a regular decagon?",
        steps: [
          "Pentagon: exterior \\(= \\frac{360}{5} = 72^\\circ\\), interior \\(= 108^\\circ\\).",
          "Decagon: exterior \\(= 36^\\circ\\), interior \\(= 144^\\circ\\).",
          "\\(108 : 144\\). Divide both by 36: \\(3 : 4\\).",
        ],
        answer: "\\(3 : 4\\)",
      },
      practiceSet: [
        { prompt: "What is each exterior angle of a regular 15-sided polygon?", answer: "\\(24^\\circ\\)" },
        { prompt: "What is each interior angle of a regular 18-sided polygon?", answer: "\\(160^\\circ\\)" },
        { prompt: "What is each interior angle of a regular 36-sided polygon?", answer: "\\(170^\\circ\\)" },
        { prompt: "What is each interior angle of a regular pentagon?", answer: "\\(108^\\circ\\)" },
      ],
      pyqExampleId: "b8c47f08-33cc-407e-bd77-705f0c2aea24",
      traps: [
        {
          title: "Taking 360°/n as the interior angle",
          body:
            "\\(\\frac{360^\\circ}{n}\\) is the exterior angle. The interior angle is \\(180^\\circ\\) minus it. For a regular octagon, \\(45^\\circ\\) is the exterior angle and \\(135^\\circ\\) the interior one.",
        },
        {
          title: "Using these formulas on a polygon that is not regular",
          body:
            "The angles of an irregular polygon are not equal, so \\(\\frac{360^\\circ}{n}\\) is only their average. Without the word 'regular', use the angle sums instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclarg-sides",
      name: "Number of sides of a regular polygon from one angle",
      intuition:
        "Turn the angle formula round. If each exterior angle is known, the number of sides is how many of those angles fit into 360°. Every other clue (an interior angle, a difference, a ratio) is only a route to the exterior angle.",
      definition:
        "- From the exterior angle: \\(n = \\frac{360^\\circ}{\\text{exterior}}\\).\n" +
        "- From the interior angle: exterior \\(= 180^\\circ -\\) interior, then divide 360 by it.\n" +
        "- Interior minus exterior \\(= d\\): the two add to 180 and differ by d, so exterior \\(= \\frac{180^\\circ - d}{2}\\).\n" +
        "- Interior \\(= k \\times\\) exterior: the two make \\(k + 1\\) parts of \\(180^\\circ\\), so exterior \\(= \\frac{180^\\circ}{k + 1}\\) and \\(n = 2(k + 1)\\).\n" +
        "- The answer must be a whole number of at least 3. If the exterior angle does not divide 360 exactly, no regular polygon has that angle.",
      formula: {
        label: "Sides from an angle",
        latex:
          "n = \\frac{360^\\circ}{\\text{exterior}} \\qquad \\text{exterior} = \\frac{180^\\circ - d}{2} \\qquad n = 2(k + 1)",
        symbols: [
          { symbol: "d", meaning: "interior angle minus exterior angle" },
          { symbol: "k", meaning: "how many times the exterior angle the interior angle is" },
        ],
      },
      authoredExample: {
        prompt: "Each interior angle of a regular polygon is \\(156^\\circ\\). How many sides does it have?",
        steps: [
          "Exterior angle \\(= 180 - 156 = 24^\\circ\\).",
          "\\(n = \\frac{360}{24} = 15\\).",
          "Check: \\(\\frac{(15 - 2) \\times 180}{15} = \\frac{2340}{15} = 156\\).",
        ],
        answer: "15",
      },
      selfCheckExample: {
        prompt: "Each interior angle of a regular polygon is \\(120^\\circ\\) more than each exterior angle. How many sides does it have?",
        steps: [
          "Interior \\(+\\) exterior \\(= 180\\) and interior \\(-\\) exterior \\(= 120\\).",
          "Exterior \\(= \\frac{180 - 120}{2} = 30^\\circ\\).",
          "\\(n = \\frac{360}{30} = 12\\).",
        ],
        answer: "12",
      },
      practiceSet: [
        { prompt: "Each exterior angle of a regular polygon is \\(45^\\circ\\). How many sides does it have?", answer: "8" },
        {
          prompt: "Each interior angle of a regular polygon is \\(165^\\circ\\). How many sides does it have?",
          answer: "24",
          method: "Exterior \\(15^\\circ\\), and \\(\\frac{360}{15} = 24\\).",
        },
        {
          prompt: "Each interior angle of a regular polygon is 4 times each exterior angle. How many sides does it have?",
          answer: "10",
          method: "Exterior \\(= \\frac{180}{5} = 36^\\circ\\).",
        },
        {
          prompt: "Can a regular polygon have each interior angle equal to \\(130^\\circ\\)?",
          answer: "No",
          method: "The exterior angle would be \\(50^\\circ\\), and \\(\\frac{360}{50} = 7.2\\) is not a whole number.",
        },
      ],
      pyqExampleId: "1c99f5e3-70db-4d16-b557-810ce590bf07",
      traps: [
        {
          title: "Dividing 360 by the interior angle",
          body:
            "\\(n = \\frac{360}{\\text{exterior}}\\). If the interior angle is \\(150^\\circ\\), first find the exterior angle, \\(30^\\circ\\), and only then divide: 12 sides.",
        },
        {
          title: "Forgetting to halve when the difference is given",
          body:
            "If the interior angle exceeds the exterior one by d, the exterior angle is \\(\\frac{180 - d}{2}\\), not \\(180 - d\\). With \\(d = 100\\) it is \\(40^\\circ\\), not \\(80^\\circ\\).",
        },
        {
          title: "Accepting a polygon that cannot exist",
          body:
            "The number of sides must be a whole number. An exterior angle that does not divide 360 exactly, such as \\(50^\\circ\\) or \\(70^\\circ\\), belongs to no regular polygon.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclarg-centre",
      name: "Centre, side and area of a regular polygon",
      intuition:
        "A regular polygon has a centre that is the same distance from every corner. Join the centre to all the corners and you cut the polygon into n equal triangles, which share the full turn of 360° at the centre.",
      definition:
        "- Each side subtends \\(\\frac{360^\\circ}{n}\\) at the centre, the same number as the exterior angle.\n" +
        "- Each of the n triangles from the centre is isosceles, and its two base angles are each half an interior angle.\n" +
        "- The centre is the centre of the circle through the corners and of the circle inside touching every side.\n" +
        "- All sides are equal, so side \\(= \\frac{\\text{perimeter}}{n}\\).\n" +
        "- **Regular hexagon:** the angle at the centre is \\(60^\\circ\\), so the six triangles are equilateral with side a. Area \\(= 6 \\times \\frac{\\sqrt{3}}{4}a^2 = \\frac{3\\sqrt{3}}{2}a^2\\), and the distance from the centre to each corner equals the side.",
      formula: {
        label: "Centre angle and hexagon area",
        latex: "\\text{angle at centre} = \\frac{360^\\circ}{n} \\qquad \\text{hexagon area} = 6 \\times \\frac{\\sqrt{3}}{4}a^2 = \\frac{3\\sqrt{3}}{2}a^2",
        symbols: [{ symbol: "a", meaning: "the side of the regular hexagon" }],
      },
      authoredExample: {
        prompt: "A regular hexagon has side 4 cm. Find its area.",
        steps: [
          "Join the centre to the six corners: six equilateral triangles of side 4 cm.",
          "One triangle \\(= \\frac{\\sqrt{3}}{4} \\times 4^2 = 4\\sqrt{3}\\) cm².",
          "Hexagon \\(= 6 \\times 4\\sqrt{3} = 24\\sqrt{3}\\) cm².",
        ],
        answer: "\\(24\\sqrt{3}\\) cm²",
      },
      selfCheckExample: {
        prompt:
          "A regular dodecagon (12 sides) has its corners on a circle. What angle does one side subtend at the centre, and what are the two base angles of the triangle it makes with the centre?",
        steps: [
          "Angle at the centre \\(= \\frac{360}{12} = 30^\\circ\\).",
          "The triangle is isosceles (two radii), so each base angle is \\(\\frac{180 - 30}{2} = 75^\\circ\\).",
          "Check: \\(75^\\circ\\) is half the dodecagon's interior angle of \\(150^\\circ\\).",
        ],
        answer: "\\(30^\\circ\\) at the centre, \\(75^\\circ\\) at each base corner",
      },
      practiceSet: [
        { prompt: "A regular hexagon has a perimeter of 42 cm. What is the length of each side?", answer: "7 cm" },
        { prompt: "What angle does one side of a regular hexagon subtend at its centre?", answer: "\\(60^\\circ\\)" },
        {
          prompt: "A regular hexagon has side 2 cm. What is its area?",
          answer: "\\(6\\sqrt{3}\\) cm²",
          method: "\\(6 \\times \\frac{\\sqrt{3}}{4} \\times 4\\).",
        },
        { prompt: "Each side of a regular polygon subtends \\(40^\\circ\\) at its centre. How many sides does it have?", answer: "9" },
      ],
      pyqExampleId: "69bf2a1f-537f-4626-ba94-6652f82a0709",
      traps: [
        {
          title: "Giving the interior angle for the angle at the centre",
          body:
            "A side of a regular pentagon subtends \\(72^\\circ\\) at the centre. Its interior angle, \\(108^\\circ\\), is a different angle, at a corner, and is printed as a wrong option.",
        },
        {
          title: "Treating the hexagon's centre distance as different from its side",
          body:
            "The six triangles in a regular hexagon are equilateral, so the distance from the centre to any corner equals the side. A circle through the corners of a hexagon of side 5 cm has radius 5 cm.",
        },
      ],
    },
  ],
};
