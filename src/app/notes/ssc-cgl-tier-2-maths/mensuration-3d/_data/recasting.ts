import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_M3_RECASTING_NOTE: SubtopicNote = {
  subtopicName: "Melting, Recasting and Water",
  title: "Melting, Recasting and Water",
  oneLineDefinition:
    "Melting, pouring and digging change a shape but never the amount: set the old volume equal to the new one, and divide by an area, a piece's volume or a flow rate.",
  whyItMatters:
    "10 questions in the Tier II bank, 9 EASY and 1 MODERATE. Every one rests on the same fact, that the volume does not change, and the work is in choosing what to divide by.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2m3rc-count",
      name: "Counting the pieces: the volume stays the same",
      intuition:
        "Melting changes the shape, never the amount of metal. Write the old volume equal to the total of the new pieces, and the number of pieces, or the size of each one, falls out.",
      definition:
        "- Number of pieces \\(=\\) big volume \\(\\div\\) one small volume.\n" +
        "- Spheres from a sphere: \\(n = \\left(\\frac{R}{r}\\right)^3\\); cubes from a cube: \\(n = \\left(\\frac{A}{a}\\right)^3\\).\n" +
        "- A cuboid recast into \\(n\\) equal cubes: each cube's volume is \\(\\frac{lbh}{n}\\), and its edge is the cube root of that.\n" +
        "- Pouring a liquid follows the same rule: the bowl's volume \\(\\div\\) one bottle's volume.",
      formula: {
        label: "Number of pieces",
        latex: "n = \\frac{V_{\\text{big}}}{V_{\\text{small}}}",
      },
      authoredExample: {
        prompt: "A solid cuboid 18 cm by 12 cm by 4 cm is melted and recast into 4 equal cubes. Find the edge of each cube.",
        steps: ["Volume \\(= 18 \\times 12 \\times 4 = 864\\ \\text{cm}^3\\).", "Each cube holds \\(864 \\div 4 = 216 = 6^3\\), so its edge is 6 cm."],
        answer: "6 cm",
      },
      selfCheckExample: {
        prompt: "A hemispherical bowl of radius 9 cm is full of juice. It is poured into cylindrical glasses of radius 3 cm and height 3 cm. How many glasses are filled?",
        steps: ["Bowl \\(= \\frac{2}{3}\\pi \\times 729 = 486\\pi\\); glass \\(= \\pi \\times 9 \\times 3 = 27\\pi\\).", "Glasses \\(= 486 \\div 27 = 18\\)."],
        answer: "18",
      },
      practiceSet: [
        { prompt: "A sphere of radius 6 cm is melted into spheres of radius 2 cm. How many are made?", answer: "27" },
        { prompt: "A cube of edge 20 cm is melted into cubes of edge 5 cm. How many are made?", answer: "64" },
        { prompt: "A metal cone of radius 6 cm and height 8 cm is melted into a cylinder of radius 4 cm. Find the cylinder's height.", answer: "6 cm", method: "\\(96\\pi = 16\\pi h\\)" },
      ],
      pyqExampleId: "3bd41df6-ba67-43dd-91ae-32cbc95293e0",
      traps: [
        {
          title: "Dividing the radii without cubing",
          body: "A sphere of radius 6 recast into spheres of radius 2 makes \\((6 \\div 2)^3 = 27\\) spheres, not 3. The count is a ratio of volumes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3rc-surface",
      name: "Surface area after recasting",
      intuition:
        "Breaking metal into smaller pieces keeps the volume but shows more surface. When one sphere is recast into \\(n\\) equal spheres, the total surface grows by the factor \\(\\frac{R}{r}\\).",
      definition:
        "- \\(n\\) equal spheres from one: total small surface \\(:\\) big surface \\(= R : r\\), because \\(n = \\left(\\frac{R}{r}\\right)^3\\) and each surface goes with \\(r^2\\).\n" +
        "- The same holds for cubes cut from a cube: the small cubes have \\(\\frac{A}{a}\\) times the surface.\n" +
        "- When in doubt, find \\(n\\) first, then multiply \\(n\\) by one small surface.",
      formula: {
        label: "Surface after recasting into equal spheres",
        latex: "\\frac{\\text{total surface of the small spheres}}{\\text{surface of the big sphere}} = \\frac{R}{r}",
      },
      authoredExample: {
        prompt: "A sphere of radius 9 cm is recast into spheres of radius 3 cm. Find the ratio of the big sphere's surface to the total surface of the small ones.",
        steps: ["\\(n = 3^3 = 27\\).", "Ratio \\(= 9^2 : 27 \\times 3^2 = 81 : 243 = 1 : 3\\)."],
        answer: "1 : 3",
      },
      selfCheckExample: {
        prompt: "A cube of edge 8 cm is cut into cubes of edge 2 cm. Find the total surface area of the small cubes.",
        steps: ["\\(n = 4^3 = 64\\); each small cube has surface \\(6 \\times 4 = 24\\).", "Total \\(= 64 \\times 24 = 1536\\ \\text{cm}^2\\), four times the big cube's 384."],
        answer: "\\(1536\\ \\text{cm}^2\\)",
      },
      practiceSet: [
        { prompt: "A sphere is melted into 27 equal spheres. How many times the original surface do they have together?", answer: "3 times" },
        { prompt: "A sphere of radius 10 cm is recast into 1,000 equal spheres. Find the radius of each.", answer: "1 cm" },
        { prompt: "A sphere of radius 6 cm is melted into 8 equal spheres. Find their total surface area.", answer: "\\(288\\pi\\ \\text{cm}^2\\)", method: "Each has radius 3." },
      ],
      pyqExampleId: "be712dd9-ac93-429a-9eff-85de3ac75226",
      traps: [
        {
          title: "Assuming the surface is kept",
          body: "Recasting keeps the VOLUME. The surface grows: 8 equal spheres from one have twice the surface of the original.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3rc-water",
      name: "Earth dug out and water drained",
      intuition:
        "Earth dug from a well becomes a ring-shaped bank around it, and water in a tank drains out at a steady rate. In both, write the volume once and divide it by an area or by a rate.",
      definition:
        "- Bank height \\(=\\) earth dug out \\(\\div\\) area of the ring, where the ring runs from the well's radius \\(r\\) to \\(r + w\\) for a bank of width \\(w\\).\n" +
        "- Time to drain \\(=\\) volume \\(\\div\\) rate. Change \\(\\text{m}^3\\) to litres (\\(\\times 1000\\)) before dividing by litres per second.\n" +
        "- Rain on a flat roof: water \\(=\\) roof area \\(\\times\\) depth of rain.",
      formula: {
        label: "Height of an embankment",
        latex: "h_{\\text{bank}} = \\frac{\\pi r^2 d}{\\pi\\left((r + w)^2 - r^2\\right)}",
        symbols: [{ symbol: "r, d, w", meaning: "well radius, well depth, bank width" }],
      },
      authoredExample: {
        prompt: "A well of radius 2 m is dug 14 m deep. The earth is spread evenly in a ring 3 m wide around it. Find the height of the ring.",
        steps: [
          "Earth \\(= \\pi \\times 4 \\times 14 = 56\\pi\\ \\text{m}^3\\).",
          "Ring area \\(= \\pi(5^2 - 2^2) = 21\\pi\\ \\text{m}^2\\).",
          "Height \\(= \\frac{56}{21} = \\frac{8}{3} = 2\\frac{2}{3}\\) m.",
        ],
        answer: "\\(2\\frac{2}{3}\\) m",
      },
      selfCheckExample: {
        prompt: "A full cylindrical tank of radius 1.4 m and height 2 m is emptied by a pipe at 11 litres a second. How long does it take? (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Volume \\(= \\frac{22}{7} \\times 1.96 \\times 2 = 12.32\\ \\text{m}^3 = 12320\\) litres.",
          "Time \\(= 12320 \\div 11 = 1120\\) s, that is 18 minutes 40 seconds.",
        ],
        answer: "18 minutes 40 seconds",
      },
      practiceSet: [
        { prompt: "A flat roof 20 m by 15 m collects 2 cm of rain. How many litres is that?", answer: "6,000 litres" },
        { prompt: "A pit 8 m by 5 m by 3 m is dug and the earth spread evenly over a field of 600 m². How much does the field rise?", answer: "20 cm" },
        { prompt: "A tank holds 9,000 litres and drains at 15 litres a second. How many minutes does it take to empty?", answer: "10 minutes" },
      ],
      pyqExampleId: "9353ec08-3e3b-450d-949e-5b3cded1d1b7",
      traps: [
        {
          title: "Spreading the earth over the whole circle",
          body: "The bank is a ring around the well, so its area is \\(\\pi\\left((r + w)^2 - r^2\\right)\\). Using \\(\\pi(r + w)^2\\) counts the well's own mouth as part of the bank.",
        },
      ],
    },
  ],
};
