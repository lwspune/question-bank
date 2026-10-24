import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SV_CUBOID_NOTE: SubtopicNote = {
  subtopicName: "Cube, Cuboid, Prism and Pyramid",
  title: "Cube, Cuboid, Prism and Pyramid",
  oneLineDefinition:
    "Volume, surface area and diagonal of a cube and a cuboid, the open tank and its wetted surface, how a cube's measures scale, and the base area rule for prisms and pyramids.",
  whyItMatters:
    "Most questions here are one formula and one line of arithmetic, so the marks go on reading the stem: total or lateral surface, a closed box or an open tank, a face diagonal or the space diagonal. All six prism and pyramid questions are marked HARD, yet each is base area times height, with a third for the pyramid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsv-cube-formulas",
      name: "Cube: volume, surface and diagonal",
      intuition:
        "A cube is six equal square faces. Its volume is the edge used three times, its surface is six squares, and the walls alone (no top, no bottom) are four squares.",
      definition:
        "- **Volume** \\(a^3\\), **total surface** \\(6a^2\\), **lateral surface** (four walls) \\(4a^2\\).\n" +
        "- **Face diagonal** \\(a\\sqrt 2\\); **space diagonal** (corner to opposite corner) \\(a\\sqrt 3\\). So two corners of a cube are \\(a\\), \\(a\\sqrt 2\\) or \\(a\\sqrt 3\\) apart.\n" +
        "- Working back: from the volume take the cube root; from the total surface divide by 6, then take the square root.\n" +
        "- With total surface \\(S\\) and volume \\(V\\): \\(S^3 = 216a^6 = 216V^2\\).",
      formula: {
        label: "Cube of edge a",
        latex: "V = a^3,\\quad S = 6a^2,\\quad \\text{LSA} = 4a^2,\\quad d = a\\sqrt{3}",
      },
      authoredExample: {
        prompt: "A cube has edge 7 cm. Find its volume, total surface, lateral surface and space diagonal.",
        steps: [
          "Volume \\(7^3 = 343\\) cm³.",
          "Total surface \\(6 \\times 49 = 294\\) cm²; lateral surface \\(4 \\times 49 = 196\\) cm².",
          "Space diagonal \\(7\\sqrt 3\\) cm.",
        ],
        answer: "343 cm³, 294 cm², 196 cm², \\(7\\sqrt 3\\) cm.",
      },
      selfCheckExample: {
        prompt: "The total surface of a cube is 384 cm². Find its volume.",
        steps: [
          "\\(6a^2 = 384\\), so \\(a^2 = 64\\) and \\(a = 8\\).",
          "Volume \\(8^3 = 512\\).",
        ],
        answer: "512 cm³.",
      },
      practiceSet: [
        { prompt: "A cube has volume 1,000 cm³. Find its lateral surface.", answer: "400 cm²", method: "The edge is 10 cm." },
        { prompt: "Find the space diagonal of a cube of edge 4 cm.", answer: "\\(4\\sqrt 3\\) cm" },
        { prompt: "The lateral surface of a cube is 324 cm². Find its total surface.", answer: "486 cm²", method: "\\(4a^2 = 324\\) gives \\(a^2 = 81\\)." },
        { prompt: "The space diagonal of a cube is \\(9\\sqrt 3\\) cm. Find its volume.", answer: "729 cm³" },
      ],
      pyqExampleId: "83abfd31-2f46-4fdd-ae9b-f4ae965f8b0e",
      traps: [
        {
          title: "Lateral surface is four faces, not six",
          body: "A cube of edge 7 cm has total surface 294 cm² but lateral surface 196 cm². Lateral means the walls only.",
        },
        {
          title: "Divide by 6 before the square root",
          body: "A total surface of 600 cm² gives \\(a^2 = 100\\) and \\(a = 10\\) cm. Taking \\(\\sqrt{600}\\) skips the six faces.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cuboid-formulas",
      visualizationSlug: "af-cuboid-diagonal",
      name: "Cuboid: volume, surface, diagonal and the open tank",
      intuition:
        "A cuboid has three pairs of equal rectangles. Its volume is length times breadth times height, and its surface counts each pair twice. The space diagonal is Pythagoras used twice: across the floor, then up.",
      definition:
        "- **Volume** \\(lbh\\); **total surface** \\(2(lb + bh + hl)\\); **lateral surface** (four walls) \\(2h(l + b)\\).\n" +
        "- **Space diagonal** \\(\\sqrt{l^2 + b^2 + h^2}\\): the longest rod that fits in the box.\n" +
        "- An **open tank** or a **wetted surface** has the floor once and the walls only up to the water: \\(lb + 2d(l + b)\\) for water \\(d\\) deep.\n" +
        "- Cubes of edge \\(a\\) set in a row of \\(n\\) make a cuboid \\(na \\times a \\times a\\). The faces that touch are lost.\n" +
        "- Given the three face diagonals: they are \\(l^2 + b^2\\), \\(b^2 + h^2\\) and \\(h^2 + l^2\\). Add them and halve to get \\(l^2 + b^2 + h^2\\), then subtract each to get one edge squared.",
      formula: {
        label: "Cuboid l × b × h",
        latex: "V = lbh,\\quad S = 2(lb + bh + hl),\\quad d = \\sqrt{l^2 + b^2 + h^2}",
      },
      authoredExample: {
        prompt: "A box is 12 cm × 9 cm × 8 cm. Find its volume, total surface, lateral surface and the longest rod that fits inside.",
        steps: [
          "Volume \\(12 \\times 9 \\times 8 = 864\\) cm³.",
          "Total surface \\(2(108 + 72 + 96) = 552\\) cm²; lateral surface \\(2 \\times 8 \\times (12 + 9) = 336\\) cm².",
          "Across the floor \\(\\sqrt{144 + 81} = 15\\); then up: \\(\\sqrt{15^2 + 8^2} = 17\\) cm.",
        ],
        answer: "864 cm³, 552 cm², 336 cm², 17 cm.",
      },
      selfCheckExample: {
        prompt: "A cuboid has volume 495 cm³ and a base 11 cm × 9 cm. Find its height and total surface.",
        steps: [
          "\\(h = 495 \\div 99 = 5\\) cm.",
          "Total surface \\(2(99 + 45 + 55) = 398\\) cm².",
        ],
        answer: "5 cm; 398 cm².",
      },
      practiceSet: [
        { prompt: "Find the volume of a cuboid 15 cm × 10 cm × 2 cm.", answer: "300 cm³" },
        { prompt: "Find the longest rod that fits in a box 11 cm × 10 cm × 2 cm.", answer: "15 cm" },
        {
          prompt: "An open tank 10 m long and 7 m wide holds water 2 m deep. Find the wetted surface.",
          answer: "138 m²",
          method: "\\(70 + 2 \\times 2 \\times 17\\).",
        },
        { prompt: "Two cubes of edge 5 cm are joined end to end. Find the total surface of the cuboid formed.", answer: "250 cm²" },
      ],
      pyqExampleId: "97f9e66b-7c62-4db6-a78f-96f8f9bf2dca",
      traps: [
        {
          title: "Lateral surface leaves out top and bottom",
          body: "A box 12 cm × 9 cm × 8 cm has total surface 552 cm² but lateral surface 336 cm². Read which one the stem asks for.",
        },
        {
          title: "An open tank has no lid, and wet walls stop at the water",
          body: "A tank 5 m × 3 m with water 2 m deep has wetted surface \\(15 + 2 \\times 2 \\times 8 = 47\\) m², not the closed box's 62 m².",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cube-ratios",
      name: "Scaling a cube, and comparing a cube with a cuboid",
      intuition:
        "Make every length k times as long and every area becomes k² times as big, every volume k³ times. Two cubes are always the same shape, so their edges, surfaces and volumes follow k, k² and k³.",
      definition:
        "- Edges in the ratio \\(k\\): surfaces in \\(k^2\\), volumes in \\(k^3\\).\n" +
        "- Back from volumes, take the cube root to get the edges; back from surfaces, the square root.\n" +
        "- An edge up by \\(r\\%\\) multiplies the volume by \\(\\left(1 + \\tfrac{r}{100}\\right)^3\\) and the surface by \\(\\left(1 + \\tfrac{r}{100}\\right)^2\\).\n" +
        "- A cuboid with edges in a given ratio: write them \\(pk, qk, rk\\), set its volume or surface equal to the cube's, and find the cube's edge in \\(k\\).",
      formula: {
        label: "Two cubes of edges a₁ and a₂",
        latex: "\\dfrac{S_1}{S_2} = \\left(\\dfrac{a_1}{a_2}\\right)^2,\\quad \\dfrac{V_1}{V_2} = \\left(\\dfrac{a_1}{a_2}\\right)^3",
      },
      authoredExample: {
        prompt: "Two cubes have surfaces in the ratio \\(25 : 49\\). Find the ratio of their volumes.",
        steps: [
          "Edges: \\(\\sqrt{25} : \\sqrt{49} = 5 : 7\\).",
          "Volumes: \\(5^3 : 7^3 = 125 : 343\\).",
        ],
        answer: "\\(125 : 343\\).",
      },
      selfCheckExample: {
        prompt: "Each edge of a cube grows by 20%. By what percent do its surface and its volume grow?",
        steps: [
          "Surface: \\(1.2^2 = 1.44\\), up 44%.",
          "Volume: \\(1.2^3 = 1.728\\), up 72.8%.",
        ],
        answer: "Surface 44%, volume 72.8%.",
      },
      practiceSet: [
        { prompt: "Two cubes have edges in the ratio \\(1 : 5\\). Find the ratio of their volumes.", answer: "\\(1 : 125\\)" },
        { prompt: "The edge of a cube is cut to a sixth of its length. What fraction of its volume is left?", answer: "\\(\\tfrac{1}{216}\\)" },
        { prompt: "A cube's volume becomes 64 times as large. How many times as large is its surface?", answer: "16 times" },
        {
          prompt: "A cuboid with edges in the ratio \\(1 : 5 : 25\\) has the same volume as a cube. Find the ratio of the cube's edge to the cuboid's shortest edge.",
          answer: "\\(5 : 1\\)",
          method: "The cuboid holds \\(125k^3\\).",
        },
      ],
      pyqExampleId: "a8938d5d-c70b-4cde-bc0d-7d4a3335f5f3",
      traps: [
        {
          title: "Square for area, cube for volume",
          body: "Cubes with volumes \\(1 : 1000\\) have edges \\(1 : 10\\) and surfaces \\(1 : 100\\). The volume ratio is not the surface ratio.",
        },
        {
          title: "A 10% longer edge is not 30% more volume",
          body: "\\(1.1^3 = 1.331\\), so the volume grows by 33.1%. Adding the percentages three times leaves out the cross terms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-prism-pyramid",
      name: "Prisms and pyramids: base area times height",
      intuition:
        "A prism has the same cross-section all the way along, so its volume is that cross-section times its length; a cuboid is a prism on a rectangle. A pyramid narrows to a point and holds exactly a third of the prism on the same base and height.",
      definition:
        "- **Prism**: volume = base area × height; lateral surface = perimeter of the base × height.\n" +
        "- **Pyramid**: volume = \\(\\tfrac 13\\) × base area × height. For a regular pyramid the lateral surface is \\(\\tfrac 12\\) × perimeter of the base × slant height.\n" +
        "- An equilateral triangle of side \\(a\\) has area \\(\\dfrac{\\sqrt 3}{4}a^2\\); a right triangle has half the product of its legs.\n" +
        "- A prism and a pyramid of equal base and equal volume: the pyramid is three times as tall.",
      formula: {
        label: "Base area A, height h",
        latex: "V_{\\text{prism}} = Ah,\\quad V_{\\text{pyramid}} = \\tfrac13 Ah",
      },
      authoredExample: {
        prompt:
          "A prism 15 cm long has a right-triangle base with legs 6 cm and 8 cm. Find its volume, and the volume of a pyramid on the same base with the same height.",
        steps: [
          "Base area \\(\\tfrac 12 \\times 6 \\times 8 = 24\\) cm².",
          "Prism \\(24 \\times 15 = 360\\) cm³.",
          "Pyramid \\(\\tfrac 13 \\times 360 = 120\\) cm³.",
        ],
        answer: "360 cm³ and 120 cm³.",
      },
      selfCheckExample: {
        prompt: "A square pyramid has base edge 8 cm and slant height 7 cm. Find its lateral and total surface.",
        steps: [
          "Lateral: \\(\\tfrac 12 \\times 32 \\times 7 = 112\\) cm².",
          "Total: \\(112 + 64 = 176\\) cm².",
        ],
        answer: "112 cm² and 176 cm².",
      },
      practiceSet: [
        {
          prompt: "A prism 5 cm long has an equilateral triangle of side 6 cm as its base. Find its volume.",
          answer: "\\(45\\sqrt 3\\) cm³",
          method: "Base area \\(9\\sqrt 3\\).",
        },
        { prompt: "A pyramid with base area 50 cm² holds 200 cm³. Find its height.", answer: "12 cm" },
        { prompt: "A prism and a pyramid have equal bases and equal volumes. The prism is 7 cm tall. How tall is the pyramid?", answer: "21 cm" },
      ],
      pyqExampleId: "451b4f6a-d45f-4a63-9d10-4facc82fa76f",
      traps: [
        {
          title: "Do not forget the third",
          body: "A pyramid on a base of 30 cm² and 12 cm tall holds 120 cm³, not 360 cm³. Only the prism is base times height.",
        },
        {
          title: "Slant height for faces, vertical height for volume",
          body: "A square pyramid's triangular faces use the slant height; its volume uses the height straight up from the base.",
        },
      ],
    },
  ],
};
