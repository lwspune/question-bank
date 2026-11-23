import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_M3_PRISMS_NOTE: SubtopicNote = {
  subtopicName: "Cuboids, Prisms and Pyramids",
  title: "Cuboids, Prisms and Pyramids",
  oneLineDefinition:
    "Solids with flat faces: a cuboid and a prism hold base area times height, a pyramid holds one third of that, and their surfaces are rectangles and triangles you add up.",
  whyItMatters:
    "19 questions in the Tier II bank, 14 EASY and 5 MODERATE, the largest page of the chapter. The MODERATE ones are pyramids, where the height has to be found from a slant edge or a slant face first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2m3pp-cuboid",
      name: "Cuboids: volume, faces and diagonals",
      visualizationSlug: "af-cuboid-diagonal",
      intuition:
        "A cuboid is a box with length, breadth and height. Its volume multiplies the three edges, its six faces come in three equal pairs, and its long diagonal runs from one corner through the inside to the opposite corner.",
      definition:
        "- Volume \\(= lbh\\); total surface \\(= 2(lb + bh + lh)\\). A cube of edge \\(a\\) has \\(a^3\\) and \\(6a^2\\).\n" +
        "- Three faces that meet at a corner have areas whose product is \\((lbh)^2\\), so the volume is the square root of that product.\n" +
        "- Long diagonal \\(= \\sqrt{l^2 + b^2 + h^2}\\); a cube's is \\(a\\sqrt{3}\\).\n" +
        "- If the three face diagonals at a corner are \\(p, q, r\\), then \\(l^2 + b^2 + h^2 = \\frac{p^2 + q^2 + r^2}{2}\\).\n" +
        "- \\(1\\ \\text{m}^3 = 1000\\) litres and 1 litre \\(= 1000\\ \\text{cm}^3\\).",
      formula: {
        label: "Cuboid",
        latex: "V = lbh, \\quad S = 2(lb + bh + lh), \\quad d = \\sqrt{l^2 + b^2 + h^2}",
      },
      authoredExample: {
        prompt: "The areas of three faces of a box that meet at a corner are 20 cm², 24 cm² and 30 cm². Find its volume.",
        steps: [
          "\\((lbh)^2 = 20 \\times 24 \\times 30 = 14400\\).",
          "Volume \\(= \\sqrt{14400} = 120\\ \\text{cm}^3\\).",
          "Check: the edges are 5, 4 and 6 cm, and \\(5 \\times 4 = 20\\), \\(4 \\times 6 = 24\\), \\(5 \\times 6 = 30\\).",
        ],
        answer: "\\(120\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "The edges of a cuboid are in the ratio 4 : 3 : 2 and its total surface area is 832 cm². Find its volume.",
        steps: [
          "Edges \\(4k, 3k, 2k\\): surface \\(= 2(12 + 6 + 8)k^2 = 52k^2 = 832\\), so \\(k = 4\\).",
          "Edges 16, 12 and 8 cm, volume \\(= 1536\\ \\text{cm}^3\\).",
        ],
        answer: "\\(1536\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the long diagonal of a cuboid 12 cm by 4 cm by 3 cm.", answer: "13 cm" },
        { prompt: "How many litres does a tank 2 m by 1.5 m by 1 m hold?", answer: "3,000 litres" },
        { prompt: "A cube's long diagonal is \\(6\\sqrt{3}\\) cm. Find its volume.", answer: "\\(216\\ \\text{cm}^3\\)" },
      ],
      pyqExampleId: "823e401f-d443-4427-92be-5bcdb6e4cb5e",
      traps: [
        {
          title: "Adding the three face areas",
          body: "Faces of 20, 24 and 30 cm² give a volume of \\(\\sqrt{20 \\times 24 \\times 30} = 120\\), not their sum. The product is the square of the volume.",
        },
        {
          title: "Mixing cubic centimetres and litres",
          body: "1 litre is 1,000 cm³ and 1 m³ is 1,000 litres. A capacity worked out in cm³ must be divided by 1,000 before it is given in litres.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3pp-prism",
      name: "Right prisms",
      intuition:
        "A right prism has the same cross-section all the way up. Its volume is that base area times the height, and its side walls unroll into one rectangle as long as the base's perimeter.",
      definition:
        "- Volume \\(=\\) base area \\(\\times\\) height.\n" +
        "- Lateral surface \\(=\\) perimeter of the base \\(\\times\\) height; total surface \\(=\\) lateral \\(+ 2 \\times\\) base area.\n" +
        "- Base areas: right triangle \\(\\frac{1}{2} \\times\\) the two shorter sides (test for a triple such as 8, 15, 17); equilateral triangle \\(\\frac{\\sqrt{3}}{4}a^2\\); regular hexagon \\(\\frac{3\\sqrt{3}}{2}a^2\\); trapezium \\(\\frac{1}{2}(a + b)h\\).\n" +
        "- Given the lateral surface and the base's sides, height \\(=\\) lateral \\(\\div\\) perimeter.",
      formula: {
        label: "Right prism",
        latex: "V = B \\times h, \\quad L = P \\times h, \\quad T = L + 2B",
        symbols: [
          { symbol: "B, P", meaning: "base area and base perimeter" },
          { symbol: "L, T", meaning: "lateral and total surface" },
        ],
      },
      authoredExample: {
        prompt: "A right prism has a base that is a right triangle with sides 5 cm, 12 cm and 13 cm. Its height is 10 cm. Find its volume and total surface area.",
        steps: [
          "Base area \\(= \\frac{1}{2} \\times 5 \\times 12 = 30\\), so volume \\(= 300\\ \\text{cm}^3\\).",
          "Perimeter 30, so lateral surface \\(= 30 \\times 10 = 300\\).",
          "Total \\(= 300 + 2 \\times 30 = 360\\ \\text{cm}^2\\).",
        ],
        answer: "\\(300\\ \\text{cm}^3\\) and \\(360\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A right prism with a regular hexagonal base of side 4 cm has a volume of \\(288\\sqrt{3}\\) cm³. Find its lateral surface area.",
        steps: [
          "Base area \\(= \\frac{3\\sqrt{3}}{2} \\times 16 = 24\\sqrt{3}\\), so height \\(= 288\\sqrt{3} \\div 24\\sqrt{3} = 12\\).",
          "Lateral surface \\(= 24 \\times 12 = 288\\ \\text{cm}^2\\).",
        ],
        answer: "\\(288\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A prism stands 12 cm tall on an equilateral-triangle base of side 5 cm. How much area do its three side walls cover?", answer: "\\(180\\ \\text{cm}^2\\)" },
        { prompt: "A prism 15 cm long has a trapezium base with parallel sides 6 cm and 10 cm and height 4 cm. Find its volume.", answer: "\\(480\\ \\text{cm}^3\\)" },
        { prompt: "A triangular prism has base sides 7, 24 and 25 cm and a lateral surface of 1,120 cm². Find its height.", answer: "20 cm", method: "\\(1120 \\div 56\\)" },
      ],
      pyqExampleId: "14ce0d52-fb78-4939-9f91-9cab0fddcc6a",
      traps: [
        {
          title: "Taking a slanted side as the trapezium's height",
          body: "An isosceles trapezium with parallel sides 6 and 14 and slanted sides 5 has height \\(\\sqrt{5^2 - 4^2} = 3\\), not 5. Drop a perpendicular first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3pp-pyramid",
      name: "Pyramids: one third, and the slant triangles",
      intuition:
        "A pyramid on the same base and height as a prism holds exactly a third as much. Its surface is the base plus triangles, and every hidden length inside it comes from a right triangle.",
      definition:
        "- Volume \\(= \\frac{1}{3} \\times\\) base area \\(\\times\\) vertical height.\n" +
        "- Lateral surface of a regular pyramid \\(= \\frac{1}{2} \\times\\) perimeter \\(\\times\\) slant height, where the slant height is the height of one face.\n" +
        "- Square base of side \\(a\\): slant height\\(^2 = h^2 + \\left(\\frac{a}{2}\\right)^2\\); slant EDGE\\(^2 = h^2 + \\frac{a^2}{2}\\) (half the diagonal).\n" +
        "- Equilateral base of side \\(a\\): the height's foot is the centre, \\(\\frac{a}{\\sqrt{3}}\\) from each corner and \\(\\frac{a}{2\\sqrt{3}}\\) from each side.\n" +
        "- A square's area from its diagonal \\(d\\) is \\(\\frac{d^2}{2}\\).",
      formula: {
        label: "Pyramid",
        latex: "V = \\tfrac{1}{3}Bh, \\quad L = \\tfrac{1}{2}P\\,l, \\quad l^2 = h^2 + \\left(\\tfrac{a}{2}\\right)^2",
        symbols: [{ symbol: "\\(l\\)", meaning: "slant height of a face (square base of side \\(a\\))" }],
      },
      authoredExample: {
        prompt: "A pyramid has a square base of side 12 cm and a vertical height of 8 cm. Find its slant height, lateral surface area and volume.",
        steps: [
          "Slant height \\(= \\sqrt{8^2 + 6^2} = 10\\) cm.",
          "Lateral surface \\(= \\frac{1}{2} \\times 48 \\times 10 = 240\\ \\text{cm}^2\\).",
          "Volume \\(= \\frac{1}{3} \\times 144 \\times 8 = 384\\ \\text{cm}^3\\).",
        ],
        answer: "10 cm, \\(240\\ \\text{cm}^2\\), \\(384\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A square-based pyramid has base side \\(6\\sqrt{2}\\) cm and each slant edge 10 cm. Find its volume.",
        steps: [
          "The base's diagonal is 12, so a corner is 6 cm from the centre.",
          "Height \\(= \\sqrt{10^2 - 6^2} = 8\\).",
          "Volume \\(= \\frac{1}{3} \\times 72 \\times 8 = 192\\ \\text{cm}^3\\).",
        ],
        answer: "\\(192\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "A prism and a pyramid share a base of area 45 cm² and a height of 8 cm. Find the difference of their volumes.", answer: "\\(240\\ \\text{cm}^3\\)" },
        { prompt: "A pyramid's base is a square with diagonal 10 cm and its height is 9 cm. Find its volume.", answer: "\\(150\\ \\text{cm}^3\\)" },
        { prompt: "A pyramid has an equilateral-triangle base of side 6 cm and a height of 10 cm. Find its volume.", answer: "\\(30\\sqrt{3}\\ \\text{cm}^3\\)" },
      ],
      pyqExampleId: "3ae67ebc-f07d-4822-bde8-15667132714f",
      traps: [
        {
          title: "Using the vertical height for the faces",
          body: "The lateral surface uses the slant height of each face, not the vertical height of the pyramid. Find the slant height from the right triangle first.",
        },
        {
          title: "Mixing the slant height and the slant edge",
          body: "On a square base, the slant height reaches the middle of a base edge, half a side from the centre; the slant edge reaches a corner, half a diagonal from the centre.",
        },
      ],
    },
  ],
};
