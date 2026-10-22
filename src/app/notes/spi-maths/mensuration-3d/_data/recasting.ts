import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M3_RECASTING_NOTE: SubtopicNote = {
  subtopicName: "Melting, Recasting and Water Level",
  title: "Melting, Recasting and Water Level",
  oneLineDefinition:
    "When a solid is melted and remade, or dropped into water, its volume stays the same: equate the old volume to the new one and solve.",
  whyItMatters:
    "Six questions in the bank, five MODERATE and one EASY, one of them from the 2022 paper. Coins from a cuboid or a cylinder, spheres from a cylinder, and the rise of water when a ball is dropped in. Each is one division of two volumes from the earlier pages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim3re-recast",
      name: "Melting and recasting: how many pieces",
      intuition:
        "Melting changes the shape, never the amount of metal. Find the volume you start with, find the volume of one new piece, and divide.",
      definition:
        "- **Volume is kept**: old volume \\(=\\) total new volume.\n" +
        "- **Number of pieces** \\(=\\) big volume \\(\\div\\) volume of one piece.\n" +
        "- A **coin** is a short cylinder: its radius is half its diameter and its height is its thickness.\n" +
        "- When both solids are round, write both volumes with \\(\\pi\\) and cancel it before dividing.\n" +
        "- If your count is not among the options, check the radius and the units once, then choose 'None of these'.",
      formula: {
        label: "Recasting",
        latex: "V_{\\text{old}} = n \\times V_{\\text{piece}}, \\qquad n = \\frac{V_{\\text{old}}}{V_{\\text{piece}}}",
      },
      authoredExample: {
        prompt: "A metal cylinder of radius 4 cm and height 12 cm is melted and made into spheres of radius 2 cm. How many spheres are made?",
        steps: [
          "Cylinder: \\(\\pi \\times 16 \\times 12 = 192\\pi\\) cubic cm.",
          "One sphere: \\(\\frac{4}{3}\\pi \\times 8 = \\frac{32\\pi}{3}\\) cubic cm.",
          "\\(n = 192\\pi \\times \\frac{3}{32\\pi} = 18\\).",
        ],
        answer: "18 spheres",
      },
      selfCheckExample: {
        prompt: "A metal block 22 cm by 14 cm by 5 cm is melted into coins of diameter 2 cm and thickness 0.5 cm. How many coins are made?",
        steps: [
          "Block: \\(22 \\times 14 \\times 5 = 1540\\) cubic cm.",
          "One coin: \\(\\frac{22}{7} \\times 1^2 \\times 0.5 = \\frac{11}{7}\\) cubic cm.",
          "\\(n = 1540 \\times \\frac{7}{11} = 980\\).",
        ],
        answer: "980 coins",
      },
      practiceSet: [
        { prompt: "A sphere of radius 6 cm is melted and recast into a cylinder of radius 4 cm. What is the height of the cylinder?", answer: "\\(288\\pi \\div 16\\pi = 18\\) cm" },
        { prompt: "How many balls of radius 1 cm can be made by melting a solid sphere of radius 5 cm?", answer: "\\(5^3 = 125\\)" },
        { prompt: "A cone of radius 6 cm and height 8 cm is melted into a cylinder of radius 4 cm. What is the cylinder's height?", answer: "\\(96\\pi \\div 16\\pi = 6\\) cm" },
        {
          prompt: "How many coins of radius 1.5 cm and thickness 0.2 cm can be made from a cylinder of radius 3 cm and height 10 cm?",
          answer: "\\(90\\pi \\div 0.45\\pi = 200\\)",
        },
      ],
      pyqExampleId: "cb44c0a4-0733-4ad8-9a5b-a0b9560dd52e",
      traps: [
        {
          title: "Using the coin's diameter as its radius",
          body: "A coin of diameter 3 cm has radius 1.5 cm. Using 3 makes each coin four times too big and the count four times too small.",
        },
        {
          title: "Same shape, smaller size: cube the ratio",
          body: "Small spheres from a big sphere: \\(n = \\left(\\frac{R}{r}\\right)^3\\). A sphere of radius 4 cm makes 64 balls of radius 1 cm, not 4 and not 16.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3re-water",
      name: "Rise in water level",
      intuition:
        "Push a stone under water and the water has to go somewhere: it rises up the sides. The water that rises is a thin slab with the vessel's base and a volume equal to the stone's.",
      definition:
        "- A solid fully under water pushes up water of **its own volume**.\n" +
        "- **Rise** \\(=\\) volume of the solid \\(\\div\\) base area of the vessel.\n" +
        "- In a cylindrical vessel of radius \\(R\\): \\(\\pi R^2 \\times \\text{rise} = V_{\\text{solid}}\\).\n" +
        "- How full the vessel was at the start does not matter, as long as the solid is covered and nothing spills.",
      formula: {
        label: "Water rise in a cylinder",
        latex: "\\pi R^2 \\times \\text{rise} = V_{\\text{solid}}",
        symbols: [{ symbol: "R", meaning: "radius of the vessel (not of the solid)" }],
      },
      authoredExample: {
        prompt: "Ten marbles, each of radius 1.5 cm, are dropped into a cylindrical beaker of radius 5 cm partly filled with water. By how much does the water rise?",
        steps: [
          "One marble: \\(\\frac{4}{3}\\pi \\times 3.375 = 4.5\\pi\\). Ten marbles: \\(45\\pi\\) cubic cm.",
          "\\(\\pi \\times 25 \\times \\text{rise} = 45\\pi\\).",
          "Rise \\(= \\frac{45}{25} = 1.8\\) cm.",
        ],
        answer: "1.8 cm",
      },
      selfCheckExample: {
        prompt: "A solid cone of radius 3 cm and height 12 cm is lowered completely into a cylindrical vessel of radius 6 cm containing water. By how much does the water rise?",
        steps: [
          "Cone: \\(\\frac{1}{3}\\pi \\times 9 \\times 12 = 36\\pi\\) cubic cm.",
          "\\(\\pi \\times 36 \\times \\text{rise} = 36\\pi\\), so the rise is 1 cm.",
        ],
        answer: "1 cm",
      },
      practiceSet: [
        { prompt: "A stone 10 cm by 8 cm by 5 cm is dropped into a rectangular tank whose base is 40 cm by 20 cm. By how much does the water rise?", answer: "\\(400 \\div 800 = 0.5\\) cm" },
        { prompt: "Water in a cylinder of radius 7 cm rises by 2 cm when a stone is dropped in. What is the stone's volume?", answer: "\\(154 \\times 2 = 308\\) cubic cm" },
        { prompt: "A sphere of radius 3 cm is lowered into a cylindrical vessel of radius 6 cm containing water. By how much does the water rise?", answer: "\\(36\\pi \\div 36\\pi = 1\\) cm" },
      ],
      pyqExampleId: "34639f46-c16d-4106-a4e0-8ac32a79f71f",
      traps: [
        {
          title: "Dividing by the wrong circle",
          body: "The risen water spreads over the vessel's base, so divide by \\(\\pi R^2\\) of the vessel, not by the area of the ball or cone dropped in.",
        },
        {
          title: "Worrying about the starting depth",
          body: "'Partly filled' only tells you the solid is covered. The rise depends on the solid's volume and the vessel's base, not on how much water was there.",
        },
      ],
    },
  ],
};
