import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_CUBOIDS_NOTE: SubtopicNote = {
  subtopicName: "Cubes and Cuboids",
  title: "Cubes & Cuboids",
  oneLineDefinition:
    "Volume and surface area of cubes and cuboids: the walls of a room, blocks joined or cut, and open boxes with walls of some thickness.",
  whyItMatters:
    "A steady, mostly MODERATE page. The formulas are the easiest in the chapter; the marks are lost on reading — which faces are counted, whether the top is open, and how many faces disappear when blocks are joined.",
  concepts: [
    // C1 — walls, edges and faces
    {
      kind: "formula" as const,
      slug: "cdsm3-walls-edges-faces",
      name: "Walls, edges and faces",
      intuition:
        "Before any formula, count what the question counts. Four walls leave out the floor and the ceiling. A skeleton or a taped cube uses the twelve edges. Paint and tiles cover faces.",
      definition:
        "For an \\(l \\times b \\times h\\) cuboid:\n" +
        "- Volume \\(lbh\\); total surface \\(2(lb + bh + hl)\\).\n" +
        "- Four walls only \\(= 2(l + b)h\\), the perimeter of the floor times the height.\n" +
        "- A cube has \\(6\\) faces and \\(12\\) edges; its surface is \\(6a^2\\).\n" +
        "- Buying paint or tiles: divide, then round **up** to whole cans or packets.",
      formula: {
        label: "Four walls of a room",
        latex: "\\text{walls} = 2(l + b)\\,h",
      },
      authoredExample: {
        prompt: "A room is \\(8\\) m long, \\(5\\) m wide and \\(3\\) m high. One litre of paint covers \\(16\\) m\\(^2\\), and paint is sold in whole litres. How many litres are needed for the four walls?",
        steps: [
          "Walls \\(= 2(8 + 5)\\times 3 = 78\\) m\\(^2\\).",
          "\\(\\dfrac{78}{16} = 4.875\\) litres, so \\(5\\) litres must be bought.",
        ],
        answer: "\\(5\\) litres.",
      },
      selfCheckExample: {
        prompt: "A wire frame of a cube uses \\(60\\) cm of wire. Find the cube's surface area.",
        steps: [
          "A cube has \\(12\\) edges, so each is \\(5\\) cm.",
          "Surface \\(= 6\\times 25 = 150\\) cm\\(^2\\).",
        ],
        answer: "\\(150\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Cube of edge \\(4\\): total surface?", answer: "\\(96\\)" },
        { prompt: "Room \\(6\\times 4\\times 3\\): area of the four walls?", answer: "\\(60\\)" },
        { prompt: "Cube cut into two equal cuboids: cube's surface : one cuboid's?", answer: "\\(3 : 2\\)" },
        { prompt: "Number of edges of a cube?", answer: "\\(12\\)" },
      ],
      pyqExampleId: "d4a3871b-1fc8-4ea3-b8e0-910cbfb5ff69", // 2016 (II) — four walls 120 m², length twice breadth, height 4 m
      traps: [
        {
          title: "Round the cans up, never down",
          body:
            "\\(12.5\\) litres of paint means \\(13\\) one-litre cans. The rounded-down value is always one of the options.",
        },
      ],
    },

    // C2 — joining and cutting blocks
    {
      kind: "formula" as const,
      slug: "cdsm3-join-and-cut",
      name: "Joining and cutting blocks",
      intuition:
        "Joining blocks keeps the volume but hides the faces that touch. Cutting a block into cubes keeps the volume too; the fewest cubes come from the largest edge that divides every dimension.",
      definition:
        "- \\(n\\) cubes of edge \\(a\\) in a row: a cuboid \\(na\\times a\\times a\\) with surface \\((4n + 2)a^2\\). Each join hides two faces.\n" +
        "- Fewest equal cubes from an \\(l \\times b \\times h\\) block: edge \\(= \\gcd(l, b, h)\\).\n" +
        "- Bricks in a wall: \\(\\dfrac{\\text{wall volume}}{\\text{brick volume}}\\), both in the same unit.\n" +
        "- Edges that are consecutive, prime or natural numbers: factorise the volume.",
      formula: {
        label: "n cubes in a row",
        latex: "\\text{surface} = (4n + 2)\\,a^2",
      },
      authoredExample: {
        prompt: "Four cubes of edge \\(5\\) cm are joined end to end. Find the surface area of the cuboid.",
        steps: [
          "The cuboid is \\(20\\times 5\\times 5\\).",
          "Surface \\(= 2(100 + 25 + 100) = 450\\) cm\\(^2\\). (Check: \\((4\\times 4 + 2)\\times 25 = 450\\).)",
        ],
        answer: "\\(450\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A block \\(24\\times 18\\times 12\\) cm is cut into equal cubes with none wasted. What is the least number of cubes?",
        steps: [
          "The largest edge dividing all three is \\(\\gcd(24, 18, 12) = 6\\).",
          "Number \\(= 4\\times 3\\times 2 = 24\\).",
        ],
        answer: "\\(24\\).",
      },
      practiceSet: [
        { prompt: "Three cubes of edge \\(2\\) in a row: surface?", answer: "\\(56\\)" },
        { prompt: "Cubes of edge \\(10\\) in a row, surface \\(2600\\): how many cubes?", answer: "\\(6\\)" },
        { prompt: "Edges consecutive integers, volume \\(60\\): edges?", answer: "\\(3, 4, 5\\)" },
        { prompt: "Bricks \\(25\\times 10\\times 8\\) cm for a wall \\(10\\times 0.2\\times 2\\) m: how many?", answer: "\\(2000\\)" },
      ],
      pyqExampleId: "f9773485-1d34-4ba6-a183-b752828a7565", // 2019 (I) — six cubes of edge 12 in a row
    },

    // C3 — open boxes and thickness
    {
      kind: "formula" as const,
      slug: "cdsm3-boxes-thickness",
      name: "Open boxes and wall thickness",
      intuition:
        "A box made by cutting squares from a sheet's corners has the cut size as its height and loses twice the cut from each side. A box with thick walls is the outer block minus the inner block; the bottom counts once, the sides twice.",
      definition:
        "- Sheet \\(L\\times B\\), corners of side \\(x\\) cut out: box \\((L - 2x)\\times(B - 2x)\\times x\\). Test the options, since the equation is a cubic.\n" +
        "- Closed box of wall thickness \\(t\\), external \\(L\\times B\\times H\\): internal \\((L - 2t)(B - 2t)(H - 2t)\\).\n" +
        "- Open box with sides \\(s\\) thick and bottom \\(t\\) thick: external height \\(= \\) internal \\(+ t\\) only.\n" +
        "- Material \\(= \\) external volume \\(-\\) internal volume.",
      formula: {
        label: "Box from a sheet",
        latex: "V = x(L - 2x)(B - 2x)",
      },
      authoredExample: {
        prompt: "Squares of side \\(3\\) cm are cut from the corners of a \\(20\\times 16\\) cm sheet and the sides folded up. Find the volume of the box.",
        steps: [
          "Base \\((20 - 6)\\times(16 - 6) = 14\\times 10\\), height \\(3\\).",
          "Volume \\(= 14\\times 10\\times 3 = 420\\) cm\\(^3\\).",
        ],
        answer: "\\(420\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "A closed wooden box has external dimensions \\(10\\times 8\\times 6\\) cm and walls \\(1\\) cm thick. Find the volume of wood.",
        steps: [
          "Internal: \\(8\\times 6\\times 4 = 192\\) cm\\(^3\\).",
          "External: \\(480\\) cm\\(^3\\).",
          "Wood \\(= 480 - 192 = 288\\) cm\\(^3\\).",
        ],
        answer: "\\(288\\) cm\\(^3\\).",
      },
      practiceSet: [
        { prompt: "Sheet \\(12\\times 10\\), corners of \\(2\\) cut: box volume?", answer: "\\(96\\)" },
        { prompt: "Closed box external \\(6\\times 6\\times 6\\), walls \\(1\\) thick: internal volume?", answer: "\\(64\\)" },
        { prompt: "Open box, internal depth \\(8\\), bottom \\(1\\) thick: external height?", answer: "\\(9\\)" },
        { prompt: "\\(2000\\) kg per m\\(^3\\) in g per cm\\(^3\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "7b06b01e-5d28-41aa-ac6c-3b82ef24f5f3", // 2022 (II) — closed box 12×10×8, inner surface 376
      traps: [
        {
          title: "The open top has no wall",
          body:
            "An open box adds thickness to the height only once, at the bottom. Adding it twice, as for a closed box, overstates the material.",
        },
      ],
    },
  ],
};
