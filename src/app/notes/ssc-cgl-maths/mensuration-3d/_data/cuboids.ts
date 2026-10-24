import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_CUBOIDS_NOTE: SubtopicNote = {
  subtopicName: "Cubes and Cuboids",
  title: "Cubes and Cuboids",
  oneLineDefinition:
    "A cuboid holds length times breadth times height, and its surface is six rectangles in three equal pairs. A cube is the cuboid whose three edges are equal.",
  whyItMatters:
    "Thirty-one questions in the bank, twenty-seven EASY and four MODERATE, fourteen of them from the 2023 shifts. They test four things: volume and surface from the edges (or the edges back from them), the walls of a room and the capacity of a tank, cutting and joining blocks, and the longest diagonal. Every later page reuses the habit started here: write the formula, put the numbers in, and simplify before you multiply.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3cu-volume",
      name: "Volume and surface area of a cuboid and a cube",
      intuition:
        "Volume counts the unit cubes that fill the box: one layer holds length times breadth of them, and there are as many layers as the height. Surface area is the paper you need to wrap the box: six rectangles, two of each size.",
      definition:
        "- **Volume** of a cuboid \\(= lbh\\). For a cube of edge \\(a\\) it is \\(a^3\\).\n" +
        "- **Total surface area** of a cuboid \\(= 2(lb + bh + hl)\\). For a cube it is \\(6a^2\\): six equal square faces.\n" +
        "- **Going back**: from the surface of a cube, divide by 6 and take the square root; from its volume, take the cube root.\n" +
        "- **Fast cube root** of a perfect cube: the last digit of the cube fixes the last digit of the root (a cube ending in 2 comes from a number ending in 8, 3 from 7, 7 from 3, 8 from 2; every other digit gives itself). Then drop the last three digits and see which two cubes the rest lies between. For 13824: last digit 4 gives 4; 13 lies between \\(2^3 = 8\\) and \\(3^3 = 27\\), so the root is 24. This works only when the number is a perfect cube.\n" +
        "- **Edges in a ratio** \\(a : b : c\\): write them as \\(ak\\), \\(bk\\), \\(ck\\). The volume is \\(abc\\,k^3\\), so find \\(k^3\\) first.",
      formula: {
        label: "Cuboid and cube",
        latex: "V = lbh \\qquad S = 2(lb + bh + hl) \\qquad V_{\\text{cube}} = a^3 \\qquad S_{\\text{cube}} = 6a^2",
        symbols: [
          { symbol: "\\(l, b, h\\)", meaning: "length, breadth and height of the cuboid" },
          { symbol: "\\(a\\)", meaning: "edge of the cube" },
        ],
      },
      authoredExample: {
        prompt: "A cuboid is 9 cm long, 5 cm wide and 4 cm high. Find its volume and its total surface area.",
        steps: [
          "Volume \\(= 9 \\times 5 \\times 4 = 180\\ \\text{cm}^3\\).",
          "The three different faces are \\(9 \\times 5 = 45\\), \\(5 \\times 4 = 20\\) and \\(4 \\times 9 = 36\\).",
          "Total surface area \\(= 2(45 + 20 + 36) = 2 \\times 101 = 202\\ \\text{cm}^2\\).",
        ],
        answer: "\\(180\\ \\text{cm}^3\\) and \\(202\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "The total surface area of a cube is \\(294\\ \\text{cm}^2\\). Find its volume.",
        steps: [
          "\\(6a^2 = 294\\), so \\(a^2 = 49\\) and \\(a = 7\\) cm.",
          "Volume \\(= 7^3 = 343\\ \\text{cm}^3\\).",
        ],
        answer: "\\(343\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the volume of a cube of edge 13 cm.", answer: "\\(2197\\ \\text{cm}^3\\)" },
        {
          prompt: "The volume of a cube is \\(3375\\ \\text{cm}^3\\). What is its edge?",
          answer: "15 cm",
          method: "Last digit 5 gives 5; 3 lies between \\(1^3\\) and \\(2^3\\), so the root is 15.",
        },
        {
          prompt: "The edges of a cuboid are in the ratio \\(1 : 2 : 3\\) and its volume is \\(750\\ \\text{cm}^3\\). Find the longest edge.",
          answer: "15 cm",
          method: "\\(6k^3 = 750\\), so \\(k^3 = 125\\), \\(k = 5\\) and the longest edge is \\(3k = 15\\).",
        },
        { prompt: "Find the total surface area of a cuboid 6 cm by 4 cm by 3 cm.", answer: "\\(108\\ \\text{cm}^2\\)" },
      ],
      pyqExampleId: "00a315fc-87a0-44d5-af9b-c36600f3dd3a",
      traps: [
        {
          title: "Leaving out the 2 in the surface formula",
          body:
            "The total surface of a cuboid is \\(2(lb + bh + hl)\\). For a cuboid 2 by 3 by 4 the bracket is 26 but the surface is 52; the half value is often a printed option.",
        },
        {
          title: "Edge from the perimeter of one face",
          body:
            "A face of a cube is a square, so its perimeter is \\(4a\\). A face perimeter of 36 cm gives an edge of 9 cm. The total of all twelve edges, \\(12a\\), is a different measure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3cu-walls",
      name: "Walls of a room and the capacity of a tank",
      intuition:
        "Unfold the four walls of a room and they make one long strip: its length is the distance round the floor, \\(2(l + b)\\), and its height is the room's height. The floor and the ceiling are separate rectangles that you add only when the question names them.",
      definition:
        "- **Four walls** \\(= 2(l + b)h\\): walk once round the floor, and multiply that distance by the height.\n" +
        "- Add the **ceiling** \\(lb\\) or the **floor** \\(lb\\) only when the question asks for them. A box open at the top has its floor and four walls: \\(lb + 2(l + b)h\\).\n" +
        "- **Cost** \\(=\\) area \\(\\times\\) rate. A rate such as ₹40 per \\(20\\ \\text{m}^2\\) is first turned into ₹2 per \\(\\text{m}^2\\).\n" +
        "- **Capacity**: \\(1\\ \\text{m}^3 = 1000\\) litres \\(= 1\\) kilolitre, and \\(1000\\ \\text{cm}^3 = 1\\) litre. Put every length in one unit before you multiply.\n" +
        "- **Wall thickness**: a closed box of outer size \\(l \\times b \\times h\\) with walls \\(t\\) thick has inner size \\((l - 2t)(b - 2t)(h - 2t)\\). The wood used is the outer volume minus the inner volume.\n" +
        "- **Whole items**: to cover or fill something, round up (13.1 cans of paint means buying 14). To count how many whole items fit into a space, round down.",
      formula: {
        label: "Four walls and capacity",
        latex: "A_{\\text{walls}} = 2(l + b)h \\qquad 1\\ \\text{m}^3 = 1000\\ \\text{L} \\qquad 1\\ \\text{L} = 1000\\ \\text{cm}^3",
      },
      authoredExample: {
        prompt: "A room is 12 m long, 7 m wide and 4 m high. Find the cost of painting its four walls and its ceiling at ₹15 per \\(\\text{m}^2\\).",
        steps: [
          "Four walls \\(= 2(12 + 7) \\times 4 = 38 \\times 4 = 152\\ \\text{m}^2\\).",
          "Ceiling \\(= 12 \\times 7 = 84\\ \\text{m}^2\\). The floor is not painted.",
          "Area \\(= 152 + 84 = 236\\ \\text{m}^2\\), so the cost is \\(236 \\times 15 =\\) ₹3,540.",
        ],
        answer: "₹3,540",
      },
      selfCheckExample: {
        prompt: "A water tank is 4 m long, 2.5 m wide and 1.5 m deep. How many litres does it hold when full?",
        steps: [
          "Volume \\(= 4 \\times 2.5 \\times 1.5 = 15\\ \\text{m}^3\\).",
          "\\(1\\ \\text{m}^3 = 1000\\) litres, so the tank holds \\(15000\\) litres.",
        ],
        answer: "15,000 litres",
      },
      practiceSet: [
        { prompt: "A hall is 8 m by 6 m by 5 m high. Find the area of its four walls.", answer: "\\(140\\ \\text{m}^2\\)" },
        { prompt: "How many litres are there in one cubic metre?", answer: "1000" },
        {
          prompt: "A tank open at the top is 3 m by 2 m by 1 m deep. Find the area of its floor and four walls.",
          answer: "\\(16\\ \\text{m}^2\\)",
          method: "\\(3 \\times 2 + 2(3 + 2) \\times 1 = 6 + 10\\).",
        },
        {
          prompt: "A closed wooden box measures 10 cm by 8 cm by 6 cm on the outside and its wood is 1 cm thick. Find its inner volume.",
          answer: "\\(192\\ \\text{cm}^3\\)",
          method: "Inner size \\(8 \\times 6 \\times 4\\).",
        },
      ],
      pyqExampleId: "fc5c49c4-bdea-499e-9ac5-94fab2eaccdf",
      traps: [
        {
          title: "Taking the thickness off once",
          body:
            "A wall 1 cm thick sits at both ends of every edge, so each inner edge is 2 cm shorter than the outer edge, not 1 cm shorter.",
        },
        {
          title: "Mixing metres and centimetres",
          body:
            "A depth of 80 cm is 0.8 m. Change every length to one unit before multiplying, then use \\(1\\ \\text{m}^3 = 1000\\) litres or \\(1000\\ \\text{cm}^3 = 1\\) litre.",
        },
        {
          title: "Adding the floor to the walls by habit",
          body:
            "Whitewashing walls and ceiling leaves out the floor; painting only the walls leaves out both. Add \\(lb\\) only for each surface the question names.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3cu-blocks",
      name: "Cutting a cuboid into cubes and joining cubes",
      intuition:
        "A big block cut into equal small blocks keeps its volume, so the count is the big volume over the small one. The surface does change: every cut makes two new faces and every join hides two.",
      definition:
        "- **Largest equal cubes** from an \\(l \\times b \\times h\\) block with no waste: edge \\(a = \\) HCF of \\(l\\), \\(b\\), \\(h\\); count \\(= \\frac{l}{a} \\times \\frac{b}{a} \\times \\frac{h}{a}\\).\n" +
        "- **Bricks in a wall**: count \\(= \\frac{\\text{wall volume}}{\\text{one brick's volume}}\\), both in the same unit.\n" +
        "- **Cubes in a row**: \\(n\\) cubes of edge \\(a\\) joined end to end make an \\(na \\times a \\times a\\) cuboid. Its surface is \\((4n + 2)a^2\\), because each join hides two faces.\n" +
        "- **Straight cuts**: to split the three edges into \\(p\\), \\(q\\) and \\(r\\) parts you need \\((p - 1) + (q - 1) + (r - 1)\\) cuts and get \\(pqr\\) pieces. For the fewest cuts, share the parts as evenly as you can among the three directions.",
      formula: {
        label: "Cutting and joining",
        latex: "\\text{Count} = \\frac{V_{\\text{big}}}{V_{\\text{small}}} \\qquad S_{n \\text{ cubes in a row}} = (4n + 2)a^2",
      },
      authoredExample: {
        prompt: "A block of wood measures 36 cm by 24 cm by 60 cm. It is cut into the largest identical cubes possible with no waste. How many cubes are there?",
        steps: [
          "The cube's edge must divide all three lengths, and be as large as possible: HCF of 36, 24 and 60 is 12 cm.",
          "Count \\(= \\frac{36}{12} \\times \\frac{24}{12} \\times \\frac{60}{12} = 3 \\times 2 \\times 5 = 30\\).",
          "Check by volume: \\(\\frac{36 \\times 24 \\times 60}{12^3} = \\frac{51840}{1728} = 30\\).",
        ],
        answer: "30 cubes",
      },
      selfCheckExample: {
        prompt: "Five cubes of edge 4 cm are set in a straight line, each touching the next, to make a cuboid. Find the total surface area of that cuboid.",
        steps: [
          "Surface \\(= (4 \\times 5 + 2) \\times 4^2 = 22 \\times 16 = 352\\ \\text{cm}^2\\).",
          "Check with the cuboid itself, \\(20 \\times 4 \\times 4\\): \\(2(80 + 16 + 80) = 352\\).",
        ],
        answer: "\\(352\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        {
          prompt: "What is the smallest number of straight cuts that divides a cube into 27 identical smaller cubes?",
          answer: "6",
          method: "\\(27 = 3 \\times 3 \\times 3\\), so 2 cuts in each of the three directions.",
        },
        { prompt: "How many bricks of volume \\(0.002\\ \\text{m}^3\\) build a wall of volume \\(6\\ \\text{m}^3\\)?", answer: "3000" },
        {
          prompt: "A cuboid 10 cm by 15 cm by 20 cm is cut into the largest identical cubes possible with no waste. What is the edge of each cube?",
          answer: "5 cm",
        },
        {
          prompt: "Two cubes of edge 3 cm are joined face to face. Find the total surface area of the cuboid formed.",
          answer: "\\(90\\ \\text{cm}^2\\)",
          method: "\\((4 \\times 2 + 2) \\times 9 = 90\\).",
        },
      ],
      pyqExampleId: "7f40e32c-d985-44a2-aa63-528da4af8f40",
      traps: [
        {
          title: "Adding the surfaces of joined cubes",
          body:
            "Three separate cubes show 18 faces, but joined in a row they show only 14: the two faces at each join are hidden. The surface of \\(n\\) cubes in a row is \\((4n + 2)a^2\\), not \\(6na^2\\).",
        },
        {
          title: "One cut for every part",
          body:
            "Dividing one edge into 4 parts needs 3 cuts, not 4: the last part needs no cut of its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3cu-diagonal",
      name: "The longest diagonal of a cuboid and a cube",
      intuition:
        "The longest straight rod that fits in a box runs from one bottom corner to the opposite top corner. Use Pythagoras twice: across the floor, then up.",
      definition:
        "- **Body diagonal** of a cuboid \\(= \\sqrt{l^2 + b^2 + h^2}\\).\n" +
        "- For a cube of edge \\(a\\) this is \\(a\\sqrt{3}\\). The diagonal of one **face** is only \\(a\\sqrt{2}\\).\n" +
        "- The longest stick or rod that fits inside a box lies along the body diagonal.",
      formula: {
        label: "Body diagonal",
        latex: "d = \\sqrt{l^2 + b^2 + h^2} \\qquad d_{\\text{cube}} = a\\sqrt{3} \\qquad d_{\\text{face}} = a\\sqrt{2}",
      },
      authoredExample: {
        prompt: "Find the length of the longest rod that fits inside a box 12 cm long, 4 cm wide and 3 cm high.",
        steps: [
          "Across the floor: \\(12^2 + 4^2 = 160\\).",
          "Up to the far top corner: \\(160 + 3^2 = 169\\).",
          "Rod \\(= \\sqrt{169} = 13\\) cm.",
        ],
        answer: "13 cm",
      },
      selfCheckExample: {
        prompt: "The body diagonal of a cube is \\(5\\sqrt{3}\\) cm. Find its total surface area.",
        steps: ["\\(a\\sqrt{3} = 5\\sqrt{3}\\), so \\(a = 5\\) cm.", "Total surface \\(= 6 \\times 25 = 150\\ \\text{cm}^2\\)."],
        answer: "\\(150\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "Find the body diagonal of a cube of edge 4 cm.", answer: "\\(4\\sqrt{3}\\) cm" },
        {
          prompt: "Find the longest diagonal of a cuboid 2 cm by 3 cm by 6 cm.",
          answer: "7 cm",
          method: "\\(\\sqrt{4 + 9 + 36} = \\sqrt{49}\\).",
        },
        { prompt: "The diagonal of one face of a cube is \\(6\\sqrt{2}\\) cm. What is its edge?", answer: "6 cm" },
      ],
      pyqExampleId: "77c850b9-ed62-4a85-850d-38817e216a66",
      traps: [
        {
          title: "Using the face diagonal for the longest rod",
          body:
            "\\(a\\sqrt{2}\\) runs across one face. The rod through the inside of a cube is longer: \\(a\\sqrt{3}\\).",
        },
      ],
    },
  ],
};
