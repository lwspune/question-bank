import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M2_QUADS_NOTE: SubtopicNote = {
  subtopicName: "Rectangles, Squares and Other Quadrilaterals",
  title: "Rectangles, Squares and Other Quadrilaterals",
  oneLineDefinition:
    "A rectangle's area is length times breadth and its perimeter is twice their sum; a square, a parallelogram and a trapezium each have one short rule of their own.",
  whyItMatters:
    "Twenty-five questions in the bank, all but one EASY, seventeen of them from the 2025 shifts. They are quick marks: write the sides as one unknown, use the right rule, and watch the units. Tiles, paths and painting costs are the same rules with one extra step.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm2qu-rectangle",
      name: "Area and perimeter of a rectangle and a square",
      intuition:
        "Area counts the unit squares inside a shape; perimeter is the distance round its edge. For a rectangle both come straight from its two sides, so most questions are really about finding those two sides from what the stem gives you.",
      definition:
        "- **Rectangle** with length \\(l\\) and breadth \\(b\\): area \\(lb\\), perimeter \\(2(l + b)\\).\n" +
        "- **Square** with side \\(a\\): area \\(a^2\\), perimeter \\(4a\\). From the area, the side is \\(\\sqrt{\\text{area}}\\).\n" +
        "- When the sides are linked (a ratio, or one side '2 m less' than the other), write both sides with **one unknown** and use the one number the stem gives.\n" +
        "- **Fast route:** half the perimeter is \\(l + b\\). With a ratio such as \\(5 : 3\\), split that half in the ratio and the sides fall out with no equation. Safe whenever the sides are given as a ratio and the perimeter is known.\n" +
        "- A **regular polygon** with \\(n\\) equal sides of length \\(a\\) has perimeter \\(na\\).",
      formula: {
        label: "Rectangle and square",
        latex: "A = lb \\qquad P = 2(l + b) \\qquad A = a^2 \\qquad P = 4a",
        symbols: [
          { symbol: "l, b", meaning: "length and breadth of the rectangle" },
          { symbol: "a", meaning: "side of the square" },
        ],
      },
      authoredExample: {
        prompt: "The length and breadth of a rectangle are in the ratio 5 : 3 and its perimeter is 64 cm. Find its area.",
        steps: [
          "Full method: let the sides be \\(5x\\) and \\(3x\\). Then \\(2(5x + 3x) = 16x = 64\\), so \\(x = 4\\).",
          "The sides are \\(20\\) cm and \\(12\\) cm.",
          "Area \\(= 20 \\times 12 = 240\\ \\text{cm}^2\\).",
          "Fast route: half the perimeter is \\(32 = l + b\\). Split 32 in the ratio \\(5 : 3\\): one part is \\(\\frac{32}{8} = 4\\), so the sides are \\(20\\) and \\(12\\).",
        ],
        answer: "\\(240\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "The length of a rectangle is 7 m more than its breadth and its perimeter is 54 m. Find its area.",
        steps: [
          "Half the perimeter: \\(l + b = 27\\). Also \\(l - b = 7\\).",
          "Adding: \\(2l = 34\\), so \\(l = 17\\) and \\(b = 10\\).",
          "Area \\(= 17 \\times 10 = 170\\ \\text{m}^2\\).",
        ],
        answer: "\\(170\\ \\text{m}^2\\)",
      },
      practiceSet: [
        { prompt: "A square has an area of 196 cm². What is its perimeter?", answer: "56 cm", method: "Side \\(= \\sqrt{196} = 14\\), perimeter \\(= 4 \\times 14\\)." },
        { prompt: "A rectangle is 18 m long and 7 m wide. What is its perimeter?", answer: "50 m" },
        { prompt: "A regular hexagon has sides of 4.5 cm. What is its perimeter?", answer: "27 cm" },
        {
          prompt: "The area of a square is \\(9x^2 + 12x + 4\\) square units. What is its side?",
          answer: "\\(3x + 2\\)",
          method: "\\(9x^2 + 12x + 4 = (3x + 2)^2\\), and the side is the square root of the area.",
        },
      ],
      pyqExampleId: "2e5d2ff7-4228-42e8-9c63-94d3fe3d1b1a",
      traps: [
        {
          title: "Dividing a rectangle's perimeter by 4",
          body:
            "Only a square has side \\(\\frac{P}{4}\\). For a rectangle, \\(\\frac{P}{2}\\) is the sum \\(l + b\\), and you still need a second fact to split it.",
        },
        {
          title: "Multiplying lengths in different units",
          body:
            "A length in metres and a breadth in centimetres must be changed to one unit before you multiply. \\(5\\ \\text{m} \\times 40\\ \\text{cm}\\) is \\(5 \\times 0.4 = 2\\ \\text{m}^2\\), not 200.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2qu-diagonal",
      name: "Diagonal of a rectangle and of a square",
      intuition:
        "A diagonal cuts a rectangle into two right triangles, with the length and the breadth as the two shorter sides. So the diagonal is a hypotenuse, and Pythagoras gives it at once.",
      definition:
        "- **Rectangle:** diagonal \\(d = \\sqrt{l^2 + b^2}\\).\n" +
        "- **Square** of side \\(a\\): diagonal \\(a\\sqrt{2}\\).\n" +
        "- A square's area from its diagonal: \\(\\frac{d^2}{2}\\). No need to find the side first.\n" +
        "- **Fast route:** know the common right triangles. \\(3, 4, 5\\); \\(5, 12, 13\\); \\(8, 15, 17\\); \\(7, 24, 25\\) and their multiples. A \\(16 \\times 12\\) rectangle is the \\(3, 4, 5\\) triangle scaled by 4, so its diagonal is 20. Safe only when both sides are the same multiple of a known triple; otherwise square and add.",
      formula: {
        label: "Diagonals",
        latex: "d = \\sqrt{l^2 + b^2} \\qquad d_{\\text{square}} = a\\sqrt{2} \\qquad A_{\\text{square}} = \\frac{d^2}{2}",
      },
      authoredExample: {
        prompt: "A rectangle is 16 cm long and 12 cm wide. Find the length of its diagonal.",
        steps: [
          "Full method: \\(d = \\sqrt{16^2 + 12^2} = \\sqrt{256 + 144} = \\sqrt{400} = 20\\) cm.",
          "Fast route: \\(16 = 4 \\times 4\\) and \\(12 = 4 \\times 3\\), the \\(3, 4, 5\\) triangle scaled by 4, so \\(d = 4 \\times 5 = 20\\) cm.",
        ],
        answer: "20 cm",
      },
      selfCheckExample: {
        prompt: "A square has a diagonal of 10 cm. Find its area.",
        steps: ["Area \\(= \\frac{d^2}{2} = \\frac{100}{2} = 50\\ \\text{cm}^2\\).", "Check: side \\(= \\frac{10}{\\sqrt{2}}\\), and its square is \\(\\frac{100}{2} = 50\\)."],
        answer: "\\(50\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A rectangle is 15 m by 8 m. What is the length of its diagonal?", answer: "17 m" },
        { prompt: "A square has a side of 6 cm. What is the length of its diagonal?", answer: "\\(6\\sqrt{2}\\) cm" },
        { prompt: "A square has a diagonal of 12 m. What is its area?", answer: "\\(72\\ \\text{m}^2\\)" },
        {
          prompt: "A rectangle has a diagonal of 25 cm and a length of 24 cm. What is its breadth?",
          answer: "7 cm",
          method: "\\(b = \\sqrt{25^2 - 24^2} = \\sqrt{49} = 7\\), the \\(7, 24, 25\\) triangle.",
        },
      ],
      pyqExampleId: "62616c53-9fbd-49ce-b42d-6119cb2cb06c",
      traps: [
        {
          title: "Squaring the diagonal for a square's area",
          body: "The square of the diagonal is twice the area. A square with diagonal 8 m has area \\(\\frac{64}{2} = 32\\ \\text{m}^2\\), not 64.",
        },
        {
          title: "Adding the sides to get the diagonal",
          body: "The diagonal of a rectangle is \\(\\sqrt{l^2 + b^2}\\), always shorter than \\(l + b\\). A 6 by 8 rectangle has diagonal 10, not 14.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2qu-tiles",
      name: "Tiles, paths, cut-outs and the cost of covering",
      intuition:
        "These are word problems wrapped round one area. Find the area that is actually covered (a wall minus its window, a lawn plus its path), then divide by one tile's area or multiply by the rate.",
      definition:
        "- **Tiles needed** \\(=\\) area to cover \\(\\div\\) area of one tile. When each side divides exactly by the tile's side, count along each side and multiply; that is also the check.\n" +
        "- **Extra tiles** for breakage: multiply by \\(1 + \\frac{p}{100}\\) and round **up**, since part of a tile cannot be bought.\n" +
        "- **Path of width \\(w\\) outside** an \\(l \\times b\\) rectangle: the outer rectangle is \\((l + 2w) \\times (b + 2w)\\); the path is outer minus inner.\n" +
        "- **Path inside** the edge: the inner rectangle is \\((l - 2w) \\times (b - 2w)\\).\n" +
        "- **Cut-out:** subtract the removed area.\n" +
        "- **Cost:** painting, paving or tiling is charged per square metre (area \\(\\times\\) rate); fencing is charged per metre (perimeter \\(\\times\\) rate).\n" +
        "- **Fast route** for an outside path: its area is \\(2w(l + b) + 4w^2\\), with no need to work out the outer rectangle. Safe only for a path of the same width on every side.",
      formula: {
        label: "Tiles and paths",
        latex: "N = \\frac{\\text{area to cover}}{\\text{area of one tile}} \\qquad A_{\\text{path}} = (l + 2w)(b + 2w) - lb = 2w(l + b) + 4w^2",
        symbols: [
          { symbol: "w", meaning: "width of the path" },
          { symbol: "N", meaning: "number of tiles" },
        ],
      },
      authoredExample: {
        prompt: "A rectangular lawn 20 m by 15 m has a path 2 m wide all round it, outside the lawn. Find the area of the path and the cost of paving it at ₹50 per m².",
        steps: [
          "Outer rectangle: \\((20 + 4) \\times (15 + 4) = 24 \\times 19 = 456\\ \\text{m}^2\\).",
          "Lawn: \\(20 \\times 15 = 300\\ \\text{m}^2\\). Path \\(= 456 - 300 = 156\\ \\text{m}^2\\).",
          "Fast route: \\(2 \\times 2 \\times (20 + 15) + 4 \\times 2^2 = 140 + 16 = 156\\ \\text{m}^2\\).",
          "Cost \\(= 156 \\times 50 = 7800\\), that is ₹7,800.",
        ],
        answer: "156 m², ₹7,800",
      },
      selfCheckExample: {
        prompt: "How many square tiles of side 40 cm are needed to cover a floor 6 m long and 4 m wide?",
        steps: [
          "Along the length: \\(\\frac{600}{40} = 15\\) tiles. Along the width: \\(\\frac{400}{40} = 10\\) tiles.",
          "Tiles \\(= 15 \\times 10 = 150\\).",
          "Check by area: \\(\\frac{24\\ \\text{m}^2}{0.16\\ \\text{m}^2} = 150\\).",
        ],
        answer: "150 tiles",
      },
      practiceSet: [
        { prompt: "A wall 10 m by 8 m has a window 3 m by 2 m. What area of the wall is to be painted?", answer: "\\(74\\ \\text{m}^2\\)" },
        {
          prompt: "A square garden of side 30 m has a path 1 m wide running along the inside of its edge. What is the area of the path?",
          answer: "\\(116\\ \\text{m}^2\\)",
          method: "\\(30^2 - 28^2 = 900 - 784 = 116\\).",
        },
        { prompt: "A rectangular field 50 m by 30 m is fenced at ₹15 per metre. What is the cost of the fencing?", answer: "₹2,400", method: "Perimeter \\(= 160\\) m, and \\(160 \\times 15 = 2400\\)." },
        { prompt: "A job needs 120 tiles, and 15% extra are bought for breakage. How many tiles are bought?", answer: "138" },
      ],
      pyqExampleId: "7207eed2-1970-44aa-8692-7a1f0bd3be8a",
      traps: [
        {
          title: "Adding the path width only once",
          body: "A path on every side adds its width at both ends, so each side of the outer rectangle grows by \\(2w\\), not \\(w\\).",
        },
        {
          title: "Rounding the tile count down",
          body: "If the working gives 89.6 tiles, buy 90. A count of tiles, boxes or trips is always rounded up to cover the whole job.",
        },
        {
          title: "Charging fencing by area",
          body: "Fencing runs along the boundary, so its cost is perimeter times the rate per metre. Painting, paving and tiling cover the surface, so they use the area.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2qu-trapezium",
      name: "Area of a parallelogram, a trapezium and a rhombus",
      intuition:
        "Slide the slanted end of a parallelogram across and it becomes a rectangle with the same base and height. A trapezium is a rectangle whose width is the average of its two parallel sides.",
      definition:
        "- **Parallelogram:** area \\(=\\) base \\(\\times\\) height, where the height is the **perpendicular** distance between the base and the opposite side, not the slanting side.\n" +
        "- **Trapezium** with parallel sides \\(a\\) and \\(b\\) a distance \\(h\\) apart: area \\(= \\frac{1}{2}(a + b)h\\).\n" +
        "- **Rhombus** with diagonals \\(d_1\\) and \\(d_2\\): area \\(= \\frac{1}{2}d_1 d_2\\).\n" +
        "- When the parallel sides are given as a ratio, write them as \\(3x\\) and \\(5x\\) and solve one equation.\n" +
        "- A plot made of several pieces: find each area and add.",
      formula: {
        label: "Parallelogram, trapezium and rhombus",
        latex: "A = bh \\qquad A = \\frac{1}{2}(a + b)h \\qquad A = \\frac{1}{2}d_1 d_2",
        symbols: [
          { symbol: "a, b", meaning: "the two parallel sides of a trapezium" },
          { symbol: "h", meaning: "perpendicular height" },
          { symbol: "\\(d_1, d_2\\)", meaning: "diagonals of a rhombus" },
        ],
      },
      authoredExample: {
        prompt: "A trapezium has parallel sides of 14 cm and 22 cm, and the distance between them is 9 cm. Find its area.",
        steps: [
          "Average of the parallel sides: \\(\\frac{14 + 22}{2} = 18\\) cm.",
          "Area \\(= 18 \\times 9 = 162\\ \\text{cm}^2\\).",
        ],
        answer: "\\(162\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "The parallel sides of a trapezium are in the ratio 4 : 5, its height is 6 cm and its area is 108 cm². Find the parallel sides.",
        steps: [
          "Let the sides be \\(4x\\) and \\(5x\\). Area \\(= \\frac{1}{2}(9x)(6) = 27x = 108\\), so \\(x = 4\\).",
          "The sides are \\(16\\) cm and \\(20\\) cm.",
        ],
        answer: "16 cm and 20 cm",
      },
      practiceSet: [
        { prompt: "A parallelogram has a base of 15 cm and a height of 7 cm. What is its area?", answer: "\\(105\\ \\text{cm}^2\\)" },
        { prompt: "A rhombus has diagonals of 10 cm and 24 cm. What is its area?", answer: "\\(120\\ \\text{cm}^2\\)" },
        {
          prompt: "A trapezium has area 90 m², height 6 m and one parallel side of 11 m. What is the other parallel side?",
          answer: "19 m",
          method: "\\(\\frac{1}{2}(11 + x) \\times 6 = 90\\) gives \\(11 + x = 30\\).",
        },
        {
          prompt: "A plot is made of two trapeziums. One has parallel sides 10 m and 6 m with height 5 m; the other has parallel sides 6 m and 4 m with height 3 m. What is the total area?",
          answer: "\\(55\\ \\text{m}^2\\)",
          method: "\\(40 + 15 = 55\\).",
        },
      ],
      pyqExampleId: "216499f6-b877-4d1e-b6f4-2df1ffbeb2c5",
      traps: [
        {
          title: "Using the slanting side as the height",
          body: "A parallelogram's area uses the perpendicular height. A slanting side of 10 cm with a perpendicular height of 8 cm on a base of 12 cm gives \\(96\\ \\text{cm}^2\\), not 120.",
        },
        {
          title: "Forgetting the half in a trapezium",
          body: "A trapezium's area is the AVERAGE of the parallel sides times the height. Adding the sides and multiplying by the height doubles the answer.",
        },
      ],
    },
  ],
};
