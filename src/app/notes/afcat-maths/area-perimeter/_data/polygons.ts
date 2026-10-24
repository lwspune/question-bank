import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AP_POLYGONS_NOTE: SubtopicNote = {
  subtopicName: "Quadrilaterals and Regular Polygons",
  title: "Rhombus, Trapezium, Parallelogram and Regular Polygons",
  oneLineDefinition:
    "Every figure here is cut into triangles or measured from its diagonals: a rhombus by half the product of its diagonals, a trapezium by the mean of its parallel sides, a hexagon as six equilateral triangles.",
  whyItMatters:
    "This is a formula page: half its questions are EASY and each one names its figure. The marks go on the rhombus, where the diagonals must be halved before Pythagoras gives the side, and on the parallelogram, where each height belongs to its own pair of sides.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afap-diagonals",
      name: "Rhombus and kite: working from the diagonals",
      intuition:
        "The diagonals of a rhombus cross at right angles and cut each other in half, so they split it into four equal right triangles. Those triangles give both the area and the side. A kite's diagonals also cross at right angles, so its area uses the same formula.",
      definition:
        "- **Area of a rhombus or kite** \\(= \\tfrac12 d_1 d_2\\).\n" +
        "- **Side of a rhombus** \\(= \\sqrt{\\left(\\tfrac{d_1}{2}\\right)^2 + \\left(\\tfrac{d_2}{2}\\right)^2}\\), and its perimeter is four sides.\n" +
        "- A rhombus is also a parallelogram, so its area is side × height as well.\n" +
        "- A square is a rhombus with equal diagonals: \\(\\tfrac12 d^2\\), the formula from the rectangles page.",
      formula: {
        label: "Rhombus",
        latex: "A = \\tfrac12 d_1 d_2,\\qquad \\text{side} = \\sqrt{\\left(\\tfrac{d_1}{2}\\right)^2 + \\left(\\tfrac{d_2}{2}\\right)^2}",
      },
      authoredExample: {
        prompt: "A rhombus has diagonals of 16 cm and 30 cm. Find its area and its perimeter.",
        steps: [
          "Area \\(= \\tfrac12 \\times 16 \\times 30 = 240\\) cm².",
          "The half-diagonals are 8 and 15, so a side is \\(\\sqrt{64 + 225} = 17\\) cm.",
          "Perimeter \\(= 4 \\times 17 = 68\\) cm.",
        ],
        answer: "240 cm²; 68 cm.",
      },
      selfCheckExample: {
        prompt: "A rhombus has a perimeter of 100 cm and one diagonal of 40 cm. Find the other diagonal and the area.",
        steps: [
          "A side is 25 cm and half the known diagonal is 20 cm.",
          "Half the other diagonal is \\(\\sqrt{625 - 400} = 15\\), so that diagonal is 30 cm.",
          "Area \\(= \\tfrac12 \\times 40 \\times 30 = 600\\) cm².",
        ],
        answer: "30 cm; 600 cm².",
      },
      practiceSet: [
        { prompt: "Find the area of a kite with diagonals 9 cm and 16 cm.", answer: "\\(72\\) cm²" },
        { prompt: "A rhombus has diagonals of 18 cm and 80 cm. Find its perimeter.", answer: "\\(164\\) cm", method: "The side is 41 cm." },
        { prompt: "A rhombus of area 120 cm² has one diagonal of 15 cm. Find the other.", answer: "\\(16\\) cm" },
        { prompt: "A rhombus has a side of 8 cm and a height of 6 cm. Find its area.", answer: "\\(48\\) cm²" },
      ],
      pyqExampleId: "c0b0b19d-7f7f-4790-81b8-fd4691eaff93",
      traps: [
        {
          title: "Halve the diagonals first",
          body: "With diagonals 16 and 30 the side is \\(\\sqrt{8^2 + 15^2} = 17\\). Putting the whole diagonals into Pythagoras gives 34, twice the side.",
        },
        {
          title: "Half the product",
          body: "Diagonals 9 and 16 give an area of 72, not 144. The product of the diagonals is the rectangle drawn round the rhombus.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-parallel-sides",
      name: "Trapezium, parallelogram and any quadrilateral",
      intuition:
        "A parallelogram can be cut and slid into a rectangle with the same base and height. A trapezium is the average of its two parallel sides times the gap between them. Any other four-sided field is cut along a diagonal into two triangles.",
      definition:
        "- **Parallelogram:** area = base × height. Each pair of sides has its own height, so \\(\\text{side}_1 \\times h_1 = \\text{side}_2 \\times h_2\\).\n" +
        "- **Trapezium:** area \\(= \\tfrac12(a + b) \\times h\\), with \\(a, b\\) the parallel sides and \\(h\\) the distance between them.\n" +
        "- **Any quadrilateral** with a diagonal \\(d\\) and the perpendiculars \\(h_1, h_2\\) dropped on it from the other two corners: area \\(= \\tfrac12 d (h_1 + h_2)\\).\n" +
        "- Given four sides and one angle: the diagonal opposite the known angle splits it into two triangles. Find each by the triangle formulas and add.",
      formula: {
        label: "Trapezium and quadrilateral",
        latex: "A_{\\text{trap}} = \\tfrac12(a + b)h,\\qquad A_{\\text{quad}} = \\tfrac12 d(h_1 + h_2)",
      },
      authoredExample: {
        prompt: "A parallelogram has sides of 20 cm and 16 cm. The distance between its longer sides is 8 cm. Find the distance between its shorter sides.",
        steps: [
          "The 8 cm is the height on a 20 cm side, so the area is \\(20 \\times 8 = 160\\) cm².",
          "On a 16 cm side the height is \\(\\dfrac{160}{16} = 10\\) cm.",
        ],
        answer: "10 cm.",
      },
      selfCheckExample: {
        prompt: "A four-sided field has a diagonal of 30 m. The perpendiculars on it from the other two corners are 7 m and 11 m. Find the area of the field.",
        steps: ["The diagonal is the base of two triangles: \\(\\tfrac12 \\times 30 \\times (7 + 11)\\).", "\\(15 \\times 18 = 270\\)."],
        answer: "270 m².",
      },
      practiceSet: [
        { prompt: "A trapezium has parallel sides of 11 cm and 17 cm, 6 cm apart. Find its area.", answer: "\\(84\\) cm²" },
        { prompt: "Find the area of a parallelogram with base 14 cm and height 5 cm.", answer: "\\(70\\) cm²" },
        { prompt: "A trapezium of area 120 cm² has parallel sides of 13 cm and 17 cm. Find the distance between them.", answer: "\\(8\\) cm" },
        {
          prompt: "In a quadrilateral ABCD, AB is 6 cm, BC is 8 cm and angle B is a right angle; CD is 24 cm and DA is 26 cm. Find its area.",
          answer: "\\(144\\) cm²",
          method: "AC is 10, and 10, 24, 26 is a right triangle: \\(24 + 120\\).",
        },
      ],
      pyqExampleId: "a73bc8cb-019c-44e2-90f4-36266b6347cb",
      traps: [
        {
          title: "Each height goes with its own sides",
          body: "Sides 20 and 16 with a height of 8 on the 20 cm sides give an area of 160. Multiplying 8 by 16 pairs the height with the wrong side and gives 128.",
        },
        {
          title: "The slant side is not the height",
          body: "In a trapezium the height is the perpendicular gap between the parallel sides. A slanting side of 10 cm tells you nothing until it is turned into that gap.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-equilateral-hexagon",
      name: "Equilateral triangles and the regular hexagon",
      intuition:
        "An equilateral triangle's height cuts it into two right triangles with legs \\(\\tfrac a2\\) and \\(h\\), which gives \\(h = \\tfrac{\\sqrt 3}{2}a\\). A regular hexagon is six of those triangles meeting at its centre, each with the hexagon's side.",
      definition:
        "- **Equilateral triangle of side \\(a\\):** height \\(\\dfrac{\\sqrt 3}{2}a\\), area \\(\\dfrac{\\sqrt 3}{4}a^2\\), perimeter \\(3a\\).\n" +
        "- **Regular hexagon of side \\(a\\):** six equilateral triangles, so area \\(\\dfrac{3\\sqrt 3}{2}a^2\\) and perimeter \\(6a\\).\n" +
        "- Going back: from the area, \\(a^2 = \\dfrac{4A}{\\sqrt 3}\\); from the height, \\(a = \\dfrac{2h}{\\sqrt 3}\\).",
      formula: {
        label: "Equilateral triangle and hexagon",
        latex: "A_{\\triangle} = \\dfrac{\\sqrt 3}{4}a^2,\\qquad A_{\\text{hex}} = 6 \\times \\dfrac{\\sqrt 3}{4}a^2 = \\dfrac{3\\sqrt 3}{2}a^2",
      },
      authoredExample: {
        prompt: "Find the height and area of an equilateral triangle of side 10 cm, and the area of a regular hexagon of side 10 cm.",
        steps: [
          "Height \\(= \\dfrac{\\sqrt 3}{2} \\times 10 = 5\\sqrt 3\\) cm.",
          "Area \\(= \\tfrac12 \\times 10 \\times 5\\sqrt 3 = 25\\sqrt 3\\) cm².",
          "The hexagon is six such triangles: \\(150\\sqrt 3\\) cm².",
        ],
        answer: "\\(5\\sqrt 3\\) cm; \\(25\\sqrt 3\\) cm²; \\(150\\sqrt 3\\) cm².",
      },
      selfCheckExample: {
        prompt: "An equilateral triangle has an area of \\(9\\sqrt 3\\) cm². Find its perimeter.",
        steps: ["\\(\\dfrac{\\sqrt 3}{4}a^2 = 9\\sqrt 3\\), so \\(a^2 = 36\\) and \\(a = 6\\) cm.", "Perimeter \\(= 3 \\times 6 = 18\\) cm."],
        answer: "18 cm.",
      },
      practiceSet: [
        { prompt: "Find the height of an equilateral triangle of side 12 cm.", answer: "\\(6\\sqrt 3\\) cm" },
        { prompt: "Find the area of a regular hexagon of side 8 cm.", answer: "\\(96\\sqrt 3\\) cm²" },
        { prompt: "An equilateral triangle has a height of \\(3\\sqrt 3\\) cm. Find its side.", answer: "\\(6\\) cm" },
        { prompt: "A regular hexagon has a perimeter of 42 cm. Find its area.", answer: "\\(\\dfrac{147\\sqrt 3}{2}\\) cm²", method: "The side is 7 cm." },
      ],
      pyqExampleId: "a01f2149-f93c-4cf7-9af8-8ccce0200cdc",
      traps: [
        {
          title: "Height has a 2 under it, area a 4",
          body: "For side 10 the height is \\(5\\sqrt 3\\) and the area \\(25\\sqrt 3\\). Swapping the two denominators gives an area of \\(50\\sqrt 3\\), twice too big.",
        },
        {
          title: "Six triangles, not three",
          body: "A regular hexagon of side 10 holds six equilateral triangles of side 10, so its area is \\(150\\sqrt 3\\). Counting three gives half the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-polygon-angles",
      name: "Angles and perimeter of a regular polygon",
      intuition:
        "Lines from one corner of an \\(n\\)-sided polygon cut it into \\(n - 2\\) triangles, each with 180° of angle. In a regular polygon all sides and all angles are equal, so the total is shared out equally, and walking round it turns you through 360° in all.",
      definition:
        "- **Sum of interior angles** \\(= (n - 2) \\times 180°\\).\n" +
        "- **Each interior angle** of a regular polygon \\(= \\dfrac{(n - 2) \\times 180°}{n}\\).\n" +
        "- **Each exterior angle** \\(= \\dfrac{360°}{n}\\), and interior + exterior \\(= 180°\\). From an exterior angle, \\(n = \\dfrac{360°}{\\text{exterior}}\\).\n" +
        "- **Perimeter** of a regular \\(n\\)-gon of side \\(a\\) is \\(na\\). Equal perimeters: \\(n_1 a_1 = n_2 a_2\\).",
      formula: {
        label: "Polygon angles",
        latex: "\\text{sum} = (n - 2) \\times 180°,\\qquad \\text{exterior} = \\dfrac{360°}{n}",
      },
      authoredExample: {
        prompt: "For a regular octagon, find the sum of the interior angles, each interior angle and each exterior angle.",
        steps: [
          "Sum \\(= (8 - 2) \\times 180° = 1080°\\).",
          "Each interior angle \\(= 1080° \\div 8 = 135°\\).",
          "Each exterior angle \\(= 360° \\div 8 = 45°\\), and \\(135° + 45° = 180°\\) checks.",
        ],
        answer: "1080°, 135°, 45°.",
      },
      selfCheckExample: {
        prompt: "Each exterior angle of a regular polygon is 30°. How many sides has it, and what is each interior angle?",
        steps: ["\\(n = 360° \\div 30° = 12\\).", "Interior \\(= 180° - 30° = 150°\\)."],
        answer: "12 sides; 150°.",
      },
      practiceSet: [
        { prompt: "Find the sum of the interior angles of a hexagon.", answer: "\\(720°\\)" },
        { prompt: "Find the perimeter of a regular decagon of side 3 cm.", answer: "\\(30\\) cm" },
        { prompt: "A square has the same perimeter as a regular octagon of side 3 cm. Find the side of the square.", answer: "\\(6\\) cm" },
        { prompt: "Each interior angle of a regular polygon is 140°. How many sides has it?", answer: "\\(9\\)", method: "The exterior angle is 40°." },
      ],
      pyqExampleId: "b35c82eb-c5a8-4dae-95b2-845adf04163b",
      traps: [
        {
          title: "Sum or each",
          body: "\\((n - 2) \\times 180°\\) is the total. For an octagon that is 1080°; each angle is 135°. Options often carry both.",
        },
        {
          title: "Exterior angles always total 360°",
          body: "Whatever the number of sides, the exterior angles of a polygon add to 360°. Going from an angle to the number of sides is quickest through the exterior angle.",
        },
      ],
    },
  ],
};
