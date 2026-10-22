import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M3_CUBOIDS_NOTE: SubtopicNote = {
  subtopicName: "Cuboids and Cubes",
  title: "Cuboids and Cubes",
  oneLineDefinition:
    "A cuboid has six rectangular faces in three equal pairs; its surface is the sum of their areas, its volume is length times breadth times height.",
  whyItMatters:
    "Eleven questions in the bank, three of them from the 2022 paper: four EASY, six MODERATE and one HARD. They cover painting a box, sheet metal, bricks in a wall, earth from a pit and the longest rod in a room. The formulas are short; the marks go on units (inches, litres) and on which faces are counted.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim3cc-surface",
      name: "Surface area of a cuboid and a cube",
      intuition:
        "Unfold a box and you get six rectangles: top and bottom, front and back, two ends. Each pair is the same size, so you find three areas, add them and double.",
      definition:
        "- **Total surface** of a cuboid: \\(2(lb + bh + hl)\\). For a cube of edge \\(a\\), all six faces are \\(a^2\\), so \\(6a^2\\).\n" +
        "- **Lateral surface** (the four walls, no top or bottom): \\(2(l + b)h\\). For a cube, \\(4a^2\\).\n" +
        "- **Cubes joined in a row**: each joint hides two faces. Two cubes of edge \\(a\\) give \\(10a^2\\), three give \\(14a^2\\).\n" +
        "- **Change units before you square.** If a rate is per square inch, turn each edge into inches first. The 2022 paper fixes 1 inch \\(= 2.5\\) cm, so 1 square inch \\(= 6.25\\) square cm.",
      formula: {
        label: "Surface of a cuboid and a cube",
        latex:
          "S = 2(lb + bh + hl), \\quad \\text{walls} = 2(l + b)h, \\quad S_{\\text{cube}} = 6a^2, \\quad \\text{walls}_{\\text{cube}} = 4a^2",
        symbols: [
          { symbol: "l, b, h", meaning: "length, breadth and height of the cuboid" },
          { symbol: "a", meaning: "edge of the cube" },
        ],
      },
      authoredExample: {
        prompt: "A closed box is 8 cm long, 5 cm wide and 3 cm high. Sheet costs ₹2 per square cm. Find the cost of the sheet for the box.",
        steps: [
          "Face areas: \\(lb = 40\\), \\(bh = 15\\), \\(hl = 24\\).",
          "Total surface \\(= 2(40 + 15 + 24) = 2 \\times 79 = 158\\) square cm.",
          "Cost \\(= 158 \\times 2 = 316\\), that is ₹316.",
        ],
        answer: "₹316",
      },
      selfCheckExample: {
        prompt: "A cube has edge 15 cm. Find its total surface area and the area of its four side faces.",
        steps: [
          "One face \\(= 15^2 = 225\\) square cm.",
          "Total \\(= 6 \\times 225 = 1350\\) square cm; four sides \\(= 4 \\times 225 = 900\\) square cm.",
        ],
        answer: "1350 square cm and 900 square cm",
      },
      practiceSet: [
        { prompt: "A room is 6 m long, 4 m wide and 3 m high. What is the area of its four walls?", answer: "\\(2(6 + 4) \\times 3 = 60\\) square m" },
        { prompt: "Two cubes of edge 4 cm are joined face to face. What is the surface area of the cuboid formed?", answer: "\\(10 \\times 16 = 160\\) square cm" },
        { prompt: "The total surface area of a cube is 294 square cm. What is its edge?", answer: "\\(294 \\div 6 = 49\\), so 7 cm" },
        { prompt: "A square face has edge 15 cm. Taking 1 inch as 2.5 cm, what is its area in square inches?", answer: "Edge 6 inches, area 36 square inches" },
      ],
      pyqExampleId: "84f075ad-6d02-4392-880a-196a135c79db",
      traps: [
        {
          title: "Total surface or four walls",
          body:
            "Painting the sides only, or the walls of a room, leaves out the top and bottom: \\(2(l + b)h\\), or \\(4a^2\\) for a cube. The whole outside is \\(6a^2\\). Read which one is asked before you multiply.",
        },
        {
          title: "Converting an area by the length factor",
          body:
            "If 1 inch is 2.5 cm, then 1 square inch is \\(2.5^2 = 6.25\\) square cm, not 2.5. Convert each edge to inches first, then find the area.",
        },
        {
          title: "Counting the hidden faces",
          body:
            "Three separate cubes of edge \\(a\\) show \\(18a^2\\). Joined in a row, two joints hide four faces, so the cuboid shows \\(14a^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3cc-volume",
      name: "Volume of a cuboid, litres and how many blocks fit",
      intuition:
        "Volume counts how many unit cubes fill the box: a layer of length times breadth, stacked height times. Most questions then turn that volume into litres, bricks or a rise in level.",
      definition:
        "- **Volume** \\(= l \\times b \\times h\\), with all three lengths in the same unit. A cube: \\(a^3\\).\n" +
        "- **Litres**: 1 litre \\(= 1000\\) cubic cm, and 1 cubic m \\(= 1000\\) litres.\n" +
        "- **How many blocks**: divide the big volume by one block's volume. If mortar fills a share of a wall, the bricks fill only the rest.\n" +
        "- **Earth spread over land**: rise in level \\(=\\) volume of earth \\(\\div\\) area it is spread over. Leave the pit's own area out.",
      formula: {
        label: "Volume and units",
        latex:
          "V = lbh, \\quad V_{\\text{cube}} = a^3, \\quad 1\\ \\text{litre} = 1000\\ \\text{cm}^3, \\quad 1\\ \\text{m}^3 = 1000\\ \\text{litres}, \\quad \\text{rise} = \\frac{\\text{volume}}{\\text{area}}",
      },
      authoredExample: {
        prompt: "A tank is 2 m long, 1.5 m wide and 1 m deep. How many 10-litre buckets of water fill it?",
        steps: [
          "Volume \\(= 2 \\times 1.5 \\times 1 = 3\\) cubic m.",
          "\\(3\\) cubic m \\(= 3 \\times 1000 = 3000\\) litres.",
          "Buckets \\(= 3000 \\div 10 = 300\\).",
        ],
        answer: "300 buckets",
      },
      selfCheckExample: {
        prompt:
          "A field is 16 m by 10 m. A pit 4 m long, 2.5 m wide and 3 m deep is dug in one corner and the earth is spread evenly over the rest of the field. By how much does the level rise?",
        steps: [
          "Earth \\(= 4 \\times 2.5 \\times 3 = 30\\) cubic m.",
          "Area left \\(= 160 - 10 = 150\\) square m.",
          "Rise \\(= 30 \\div 150 = 0.2\\) m \\(= 20\\) cm.",
        ],
        answer: "20 cm",
      },
      practiceSet: [
        { prompt: "How many cubes of edge 2 cm fill a box 10 cm by 6 cm by 4 cm exactly?", answer: "\\(240 \\div 8 = 30\\)" },
        { prompt: "A tank holds 4.5 cubic m of water. How many litres is that?", answer: "4500 litres" },
        {
          prompt: "How many bricks of 25 cm by 12.5 cm by 8 cm make a wall 10 m long, 25 cm thick and 2 m high, if no space is left for mortar?",
          answer: "\\(5\\,000\\,000 \\div 2500 = 2000\\)",
        },
        {
          prompt: "Water is poured into a tank with a base 5 m by 4 m and the level rises by 0.5 m. How many litres went in?",
          answer: "10 cubic m, that is 10 000 litres",
        },
      ],
      pyqExampleId: "23005267-9d3a-4de8-b62a-53bed449dd06",
      traps: [
        {
          title: "Mixing units inside one product",
          body:
            "A tank 4 m by 150 cm by 1 m must be written as 400 cm by 150 cm by 100 cm (or all in metres) before multiplying. And 1 cubic m is 1000 litres, not 100.",
        },
        {
          title: "Leaving the pit in the area",
          body:
            "Earth dug from a pit is spread over the rest of the field, so subtract the pit's floor area from the field's area before dividing.",
        },
        {
          title: "Forgetting the mortar",
          body:
            "If one eighth of a wall is mortar, the bricks fill seven eighths of its volume. Take that share first, then divide by one brick's volume.",
        },
        {
          title: "Dividing volumes when the blocks cannot fit",
          body:
            "Cubes of edge 4 cm from a block 12 cm by 10 cm by 8 cm: the volumes divide to 15, but only \\(3 \\times 2 \\times 2 = 12\\) whole cubes can be cut, because 10 is not a multiple of 4. Check each edge when the question says cut.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3cc-diagonal",
      name: "The longest rod: the diagonal of a cuboid",
      intuition:
        "The longest straight rod in a room runs from one bottom corner to the opposite top corner. Pythagoras on the floor gives the floor diagonal; Pythagoras once more with the height gives the rod.",
      definition:
        "- Floor diagonal \\(= \\sqrt{l^2 + b^2}\\).\n" +
        "- Space diagonal \\(= \\sqrt{l^2 + b^2 + h^2}\\). This is the longest rod.\n" +
        "- For a cube of edge \\(a\\): \\(\\sqrt{3a^2} = a\\sqrt{3}\\).\n" +
        "- Simplify the root by taking out the largest square: \\(\\sqrt{72} = 6\\sqrt{2}\\).",
      formula: {
        label: "Diagonal of a cuboid",
        latex: "d = \\sqrt{l^2 + b^2 + h^2}, \\qquad d_{\\text{cube}} = a\\sqrt{3}",
      },
      authoredExample: {
        prompt: "Find the length of the longest pencil that fits in a box 12 cm by 4 cm by 3 cm.",
        steps: [
          "\\(d = \\sqrt{12^2 + 4^2 + 3^2} = \\sqrt{144 + 16 + 9}\\).",
          "\\(= \\sqrt{169} = 13\\) cm.",
        ],
        answer: "13 cm",
      },
      selfCheckExample: {
        prompt: "Find the longest rod that fits in a cube of edge 5 cm.",
        steps: ["\\(d = a\\sqrt{3} = 5\\sqrt{3}\\) cm."],
        answer: "\\(5\\sqrt{3}\\) cm",
      },
      practiceSet: [
        { prompt: "A box is 2 cm by 3 cm by 6 cm. What is its longest diagonal?", answer: "\\(\\sqrt{4 + 9 + 36} = 7\\) cm" },
        { prompt: "A room is 12 m by 9 m by 8 m. How long is the longest rod it can hold?", answer: "\\(\\sqrt{144 + 81 + 64} = \\sqrt{289} = 17\\) m" },
        { prompt: "The diagonal of a cube is \\(6\\sqrt{3}\\) cm. What is its edge?", answer: "6 cm" },
      ],
      pyqExampleId: "5ce3ff9e-5e5a-4104-8de8-ffe3eb781394",
      traps: [
        {
          title: "Stopping at the floor diagonal",
          body:
            "\\(\\sqrt{l^2 + b^2}\\) is the longest rod that lies flat on the floor. The longest rod in the room also uses the height: \\(\\sqrt{l^2 + b^2 + h^2}\\).",
        },
        {
          title: "Leaving the root unsimplified",
          body: "Options print roots in simplest form: \\(\\sqrt{200} = 10\\sqrt{2}\\). Take out the largest square factor before matching.",
        },
      ],
    },
  ],
};
