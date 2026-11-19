import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_PF_PIGMENTS_NOTE: SubtopicNote = {
  subtopicName: "Pigments, Hormones and Minerals",
  title: "Pigments, Hormones and Minerals",
  oneLineDefinition:
    "Each colour in a plant comes from a pigment (green chlorophyll, orange carotene, yellow xanthophyll, red lycopene, red to purple anthocyanin), and growth is steered by hormones and by minerals such as nitrogen and phosphorus.",
  whyItMatters:
    "Five questions in the bank, one EASY and four MODERATE: three match a colour to its pigment (the red of a tomato, purple, and a list of colour and pigment pairs), one matches three hormones to their jobs, and one picks the signs of phosphorus deficiency.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9pfpi-pigments",
      name: "Plant pigments and their colours",
      intuition:
        "A leaf is green because of chlorophyll. When a tomato ripens, its green plastids change into coloured plastids (chromoplasts) full of red pigment. The purple of a brinjal skin or the blue of some flowers comes from another family of pigments that dissolves in the cell sap. Learn each colour with its pigment.",
      definition:
        "- **Chlorophyll**: **green**, in **chloroplasts**; traps sunlight.\n" +
        "- **Chromoplasts** hold the yellow, orange and red pigments: **carotene** (**orange**, carrot), **xanthophyll** (**yellow**), **lycopene** (**red**, ripe tomato).\n" +
        "- **Anthocyanins**: **red, purple and blue** colours of flowers, fruits and leaves; they dissolve in water in the cell sap.\n" +
        "- **Betalains**: the deep **red and purple** of **beetroot**.",
      table: {
        columns: ["Pigment", "Colour", "Example"],
        rows: [
          { cells: ["Chlorophyll", "Green", "Leaves"] },
          { cells: ["Carotene", "Orange", "Carrot"] },
          { cells: ["Xanthophyll", "Yellow", "Yellowing leaves, yellow flowers"] },
          { cells: ["Lycopene", "Red", "Ripe tomato, watermelon"] },
          { cells: ["Anthocyanin", "Red, purple, blue", "Purple flowers, brinjal skin"] },
          { cells: ["Betalains", "Deep red, purple", "Beetroot"] },
        ],
        caption: "Green always means chlorophyll; no other pigment in this table is green.",
      },
      selfCheckExample: {
        prompt: "Which pigment gives a carrot its orange colour, and in which kind of plastid is it kept?",
        steps: ["The orange pigment of carrot is carotene.", "Coloured pigments other than chlorophyll are held in chromoplasts."],
        answer: "Carotene, in chromoplasts",
      },
      practiceSet: [
        { prompt: "Which pigment makes a ripe tomato red?", answer: "Lycopene" },
        { prompt: "What colour does xanthophyll give?", answer: "Yellow" },
        { prompt: "Which pigment gives beetroot its deep red colour?", answer: "Betalains" },
        { prompt: "In which plastids is chlorophyll found?", answer: "In chloroplasts" },
      ],
      pyqExampleId: "abd6f41e-d4b9-4cfa-a33f-681069b5803a",
      traps: [
        {
          title: "Calling carotene red or blue",
          body: "Carotene is orange, as in carrots. The red of a tomato is lycopene, and blue or purple comes from anthocyanins.",
        },
        {
          title: "Linking green with any pigment except chlorophyll",
          body: "Green in plants comes only from chlorophyll. Betalains are the red and purple of beetroot.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9pfpi-hormones",
      name: "Plant hormones and mineral nutrients",
      intuition:
        "A plant has no nerves, yet it knows when to grow, bend towards light, ripen its fruit or drop its leaves. Tiny amounts of chemicals called hormones carry these messages. And like us, a plant needs the right minerals from its food: when one is missing, the plant shows it in its leaves, flowers and roots.",
      definition:
        "- **Cytokinins**: help **cell division**.\n" +
        "- **Auxins**: help **cells enlarge**; make a shoot bend towards light and help cuttings grow roots.\n" +
        "- **Gibberellins**: make **stems grow longer**.\n" +
        "- **Abscisic acid**: a growth **inhibitor**; makes leaves fall and keeps seeds dormant.\n" +
        "- **Ethylene**: a gas that **ripens fruit**.\n" +
        "- **Nitrogen** lack: leaves turn **yellow**, growth is stunted.\n" +
        "- **Phosphorus** lack: **leaves fall early**, **flowering is late**, growth is stunted.\n" +
        "- **Magnesium** is part of chlorophyll, so its lack also makes leaves yellow.",
      table: {
        columns: ["Hormone", "Main job"],
        rows: [
          { cells: ["Cytokinins", "Cell division"] },
          { cells: ["Auxins", "Cell enlargement; bending towards light"] },
          { cells: ["Gibberellins", "Stem elongation"] },
          { cells: ["Abscisic acid", "Stops growth; leaf fall, seed dormancy"] },
          { cells: ["Ethylene", "Ripening of fruit"] },
        ],
        caption: "Abscisic acid is the odd one out: it slows growth, the first three speed it up.",
      },
      selfCheckExample: {
        prompt: "Raw mangoes are kept in a closed box with a ripe banana and ripen faster. Which plant hormone, given off as a gas, is at work?",
        steps: ["Ripe fruit gives off a gaseous hormone that speeds up ripening."],
        answer: "Ethylene",
      },
      practiceSet: [
        { prompt: "Which hormone makes leaves fall and keeps seeds dormant?", answer: "Abscisic acid" },
        { prompt: "Which hormone makes a shoot bend towards light?", answer: "Auxin" },
        { prompt: "The leaves of a plant are turning yellow and the plant is short. The lack of which mineral is most likely?", answer: "Nitrogen" },
        { prompt: "Which mineral is a part of the chlorophyll molecule?", answer: "Magnesium" },
      ],
      pyqExampleId: "e3d3991d-bc57-471c-86c6-93b6a6777c50",
      traps: [
        {
          title: "Swapping cytokinins and gibberellins",
          body: "Cytokinins help cells divide. Gibberellins make the stem grow longer.",
        },
        {
          title: "Calling abscisic acid a growth hormone",
          body: "Abscisic acid slows growth: it causes leaf fall and seed dormancy. Auxins, gibberellins and cytokinins promote growth.",
        },
        {
          title: "Blaming phosphorus for yellow leaves",
          body: "Yellowing of leaves is the sign of nitrogen (or magnesium) shortage. Phosphorus shortage shows as early leaf fall and late flowering.",
        },
      ],
    },
  ],
};
