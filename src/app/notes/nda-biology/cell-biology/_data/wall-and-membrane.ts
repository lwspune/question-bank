import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_WALL_AND_MEMBRANE_NOTE: SubtopicNote = {
  subtopicName: "Cell Wall and Cell Membrane",
  title: "Cell Wall and Cell Membrane — the Cell's Boundaries",
  oneLineDefinition:
    "Every cell has a plasma (cell) membrane — a fluid mosaic of phospholipids, proteins and cholesterol; only plants, fungi and bacteria add a rigid cell wall on top, made of cellulose, chitin and peptidoglycan respectively.",
  whyItMatters:
    "A tight 4-PYQ cluster that the bank tests almost entirely on composition (which material in which wall) and on the fluid-mosaic membrane recipe. " +
    "The two highest-value facts: the membrane = phospholipids + proteins + cholesterol, and the wall material differs by kingdom — plant = cellulose, fungus = chitin, bacterium = peptidoglycan. " +
    "All EASY or MODERATE.",
  concepts: [
    // plasma membrane / fluid mosaic (PYQ b6673daa)
    {
      kind: "reference" as const,
      slug: "cell-plasma-membrane",
      name: "The plasma membrane — fluid mosaic model",
      intuition:
        "The cell membrane is a double layer of phospholipids with proteins floating in it like icebergs and cholesterol wedged between the lipids to control fluidity. This 'fluid mosaic' is the universal boundary of every cell.",
      definition:
        "The animal cell membrane (fluid mosaic model) is built from three components:\n" +
        "- **Phospholipids** — form the bilayer; heads face water, tails face inward.\n" +
        "- **Proteins** — embedded in the bilayer; act as channels, pumps and receptors.\n" +
        "- **Cholesterol** (a lipid) — sits among the phospholipids and regulates membrane **fluidity**.\n" +
        "The membrane is **selectively permeable** — it controls what enters and leaves.",
      visualizationSlug: "cell-fluid-mosaic-membrane",
      table: {
        columns: ["Component", "Role in the membrane"],
        rows: [
          { cells: ["Phospholipid bilayer", "The basic two-layer sheet (heads out, tails in)"] },
          { cells: ["Proteins", "Channels, pumps, receptors embedded in the bilayer"] },
          {
            cells: ["Cholesterol (a lipid)", "Regulates membrane fluidity"],
            noteAmber: "The full recipe = phospholipids + proteins + cholesterol — not lipids 'only' or proteins 'only'.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which is the correct description of an animal cell membrane: 'phospholipids only', or 'phospholipids, proteins and cholesterol'?",
        steps: [
          "The membrane is a bilayer of phospholipids — but not phospholipids alone.",
          "Proteins are embedded throughout for transport and signalling.",
          "Cholesterol (a lipid) is wedged in to control fluidity.",
          "So the full answer is phospholipids + proteins + cholesterol.",
        ],
        answer: "Phospholipids, proteins and cholesterol (a lipid).",
      },
      practiceSet: [
        { prompt: "Name the three components of an animal cell membrane.", answer: "Phospholipids, proteins, cholesterol" },
        { prompt: "What regulates membrane fluidity?", answer: "Cholesterol" },
        { prompt: "What is the model describing membrane structure called?", answer: "The fluid mosaic model" },
      ],
      pyqExampleId: "b6673daa-c70a-4316-91b8-497e94fca51d",
      traps: [
        {
          title: "'Phospholipids only' and 'proteins only' are both traps",
          body:
            "The membrane is NOT made of one component. The complete fluid-mosaic recipe is phospholipids + proteins + cholesterol. Options listing a single ingredient are distractors.",
        },
      ],
    },

    // cell wall composition by kingdom (PYQs 6891a2bc, 0dbef298)
    {
      kind: "reference" as const,
      slug: "cell-wall-composition",
      name: "Cell wall composition by kingdom",
      intuition:
        "Only plants, fungi and bacteria add a rigid cell wall outside the membrane — and each uses a different material. This one table answers most cell-wall questions: plant = cellulose, fungus = chitin, bacterium = peptidoglycan. Animals have no wall.",
      definition:
        "Cell wall material differs by the type of organism:\n" +
        "- **Plant cell wall** — made of **cellulose**.\n" +
        "- **Fungal cell wall** — made of **chitin** (the key difference from plants).\n" +
        "- **Bacterial cell wall** — made of **peptidoglycan**.\n" +
        "- **Animal cells** — NO cell wall; they have an **extracellular matrix** of sugars and proteins instead.",
      table: {
        columns: ["Organism", "Cell wall material", "Note"],
        rows: [
          { cells: ["Plant", "**Cellulose**", "A carbohydrate polymer"] },
          {
            cells: ["Fungus", "**Chitin**", "NOT cellulose — this is the plant-vs-fungus trap"],
            noteAmber: "Fungal walls are chitin, not cellulose — the bank tests this directly.",
          },
          { cells: ["Bacterium", "**Peptidoglycan**", "Also called murein"] },
          { cells: ["Animal", "**None**", "Extracellular matrix of sugars + proteins instead"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A fungal cell wall differs from a plant cell wall in being made of which material?",
        steps: [
          "Plant cell walls are made of cellulose.",
          "Fungal cell walls are made of chitin — the same tough polymer found in insect exoskeletons.",
          "So the distinguishing material is chitin.",
        ],
        answer: "Chitin.",
      },
      practiceSet: [
        { prompt: "What is a plant cell wall made of?", answer: "Cellulose" },
        { prompt: "What is a fungal cell wall made of?", answer: "Chitin" },
        { prompt: "What is a bacterial cell wall made of?", answer: "Peptidoglycan" },
        { prompt: "Do animal cells have a cell wall?", answer: "No", method: "they have an extracellular matrix of sugars and proteins" },
      ],
      pyqExampleId: "6891a2bc-9c3b-4625-aed0-2f630534802e",
      traps: [
        {
          title: "Fungus = chitin, NOT cellulose",
          body:
            "A statement that 'the fungal cell wall is made of cellulose' is FALSE — fungal walls are chitin. Cellulose is the PLANT wall. This swap is the most common cell-wall distractor (2023 statement question).",
        },
      ],
    },

    // animal vs plant cell (PYQ 2d219454)
    {
      kind: "reference" as const,
      slug: "cell-animal-vs-plant-boundary",
      name: "Animal vs plant cell — wall and membrane",
      intuition:
        "The simplest plant-vs-animal contrast is the boundary: a plant cell has BOTH a cell membrane AND a cell wall, while an animal cell has ONLY a membrane. Get the 'both vs only' phrasing right and these questions are free.",
      definition:
        "The boundary difference between animal and plant cells:\n" +
        "- **Animal cell** — has a cell **membrane only** (no cell wall).\n" +
        "- **Plant cell** — has **both** a cell membrane (inside) AND a cell wall of cellulose (outside).\n" +
        "- Every cell — animal or plant — has a membrane; only the plant adds the wall.",
      visualizationSlug: "cell-animal-plant-structure",
      table: {
        columns: ["Cell type", "Cell membrane?", "Cell wall?"],
        rows: [
          { cells: ["Animal", "**Yes**", "**No**"] },
          {
            cells: ["Plant", "**Yes**", "**Yes** (cellulose)"],
            noteAmber: "Plant cells have BOTH; animal cells have the membrane ONLY.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Does a plant cell have a cell wall, a cell membrane, or both?", answer: "Both" },
        { prompt: "Does an animal cell have a cell wall?", answer: "No", method: "membrane only" },
        { prompt: "Which boundary does every cell — plant or animal — have?", answer: "The cell membrane" },
      ],
      pyqExampleId: "2d219454-a95f-43a4-b0c9-5109479e02df",
      traps: [
        {
          title: "Plant cells don't have 'only a wall'",
          body:
            "A trap option says plant cells have 'only a cell wall, not a membrane'. False — plant cells have BOTH. The membrane lies inside the wall in every plant cell.",
        },
      ],
    },
  ],
};
