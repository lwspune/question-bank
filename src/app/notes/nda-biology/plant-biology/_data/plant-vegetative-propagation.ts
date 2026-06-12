import type { SubtopicNote } from "@/app/notes/_types";

export const PLANT_VEGETATIVE_PROPAGATION_NOTE: SubtopicNote = {
  subtopicName: "Vegetative Propagation",
  title: "Vegetative Propagation",
  oneLineDefinition:
    "Vegetative propagation is growing a new plant from a vegetative part (root, stem, leaf) without seeds — potato propagates through its eye buds.",
  whyItMatters:
    "1 PYQ, EASY. Vegetative propagation is asexual reproduction in plants from a non-seed part. The one tested example: potato grows new plants from its 'eyes' (axillary buds on the tuber).",
  concepts: [
    // FOUNDATION + the one PYQ — propagation by special structures
    {
      kind: "reference" as const,
      slug: "plant-vegetative-propagation-organs",
      name: "Vegetative propagation — the organs that do it",
      intuition:
        "Some plants skip seeds entirely and grow a whole new plant from a vegetative part. Each plant uses a particular organ: the potato uses the eye buds on its tuber, ginger uses its rhizome, onion uses its bulb. Match the plant to its propagating part.",
      definition:
        "**Vegetative propagation** is asexual reproduction in plants from a vegetative part (root, stem or leaf) — no seeds, no fertilisation, so the offspring is genetically identical to the parent. Common examples:\n" +
        "- **Potato** — propagates through **eye buds** (axillary buds in the depressions of the stem tuber).\n" +
        "- **Ginger** — through its **rhizome** (underground stem).\n" +
        "- **Onion** — through its **bulb**.\n" +
        "- **Sugarcane** — through **stem cuttings (nodes)**.",
      table: {
        columns: ["Plant", "Propagating part"],
        rows: [
          {
            cells: ["**Potato**", "Eye buds (on the tuber)"],
            noteAmber: "Vegetative propagation through eye buds = potato (NDA 2024).",
          },
          { cells: ["**Ginger**", "Rhizome (underground stem)"] },
          { cells: ["**Onion**", "Bulb"] },
          { cells: ["**Sugarcane**", "Stem cuttings (nodes)"] },
        ],
        caption:
          "Eye buds = potato; rhizome = ginger; bulb = onion; stem cuttings = sugarcane.",
      },
      selfCheckExample: {
        prompt:
          "A farmer plants pieces of a tuber, each with a small 'eye', and new plants sprout. Which crop is this, and what are the eyes?",
        steps: [
          "Planting tuber pieces with 'eyes' that sprout into new plants is potato propagation.",
          "The eyes are axillary (vegetative) buds on the stem tuber.",
        ],
        answer: "Potato — the eyes are its vegetative (axillary) buds.",
      },
      practiceSet: [
        { prompt: "Which plant propagates through eye buds?", answer: "Potato", method: "buds on the tuber" },
        { prompt: "Ginger propagates through which structure?", answer: "Rhizome" },
        { prompt: "Is vegetative propagation sexual or asexual?", answer: "Asexual", method: "no seeds; offspring identical to parent" },
      ],
      pyqExampleId: "128264a9-c141-4acc-ba22-38eaf0c90f66", // potato = eye buds
      traps: [
        {
          title: "Eye buds = potato",
          body:
            "Propagation through 'eye buds' is **potato** (buds on the tuber). Ginger uses a rhizome, onion uses a bulb, sugarcane uses stem cuttings — don't confuse the propagating organ with the plant.",
        },
      ],
    },
  ],
};
