import type { SubtopicNote } from "@/app/notes/_types";

export const FUNGI_NOTE: SubtopicNote = {
  subtopicName: "Kingdom Fungi",
  title: "The Five Kingdoms and Kingdom Fungi",
  oneLineDefinition:
    "All living things are sorted into five kingdoms (Monera, Protista, Fungi, Plantae, Animalia) by cell type, cellularity and nutrition; Fungi are the eukaryotic, chitin-walled, spore-forming decomposers that cannot photosynthesise.",
  whyItMatters:
    "Start here — the five-kingdom system is the frame the whole chapter hangs on, and the NDA tests it directly. " +
    "Two facts carry the marks: which kingdoms are made of only single cells (Monera and Protista), and the signature features of Fungi (chitin cell wall, mycelium, spores, NO photosynthesis). " +
    "Both PYQs in this subtopic are EASY — pure recall.",
  concepts: [
    // Foundation — the five-kingdom system (no PYQ on the table itself; the
    // two PYQs test specific cells of it, tagged below)
    {
      kind: "formula" as const,
      slug: "biodiv-five-kingdoms",
      name: "Whittaker's five-kingdom classification",
      intuition:
        "Every organism on Earth belongs to one of five kingdoms. The first split is the cell type: Monera is the only kingdom of prokaryotes (no true nucleus); the other four are all eukaryotes. " +
        "After that, kingdoms differ by how many cells they have and how they get food.",
      definition:
        "R. H. Whittaker (1969) proposed the **five-kingdom system**, splitting life on cell structure, body organisation and mode of nutrition:\n" +
        "- **Monera** — prokaryotes (no true nucleus); always **unicellular**. Bacteria, blue-green algae (cyanobacteria).\n" +
        "- **Protista** — eukaryotes; **unicellular**. Amoeba, Paramecium, Euglena.\n" +
        "- **Fungi** — eukaryotes; mostly multicellular; **saprophytic** decomposers (absorb food). Mushrooms, moulds, yeast.\n" +
        "- **Plantae** — eukaryotes; multicellular; **autotrophs** that photosynthesise. All green plants.\n" +
        "- **Animalia** — eukaryotes; multicellular; **heterotrophs** that ingest food. All animals.",
      visualizationSlug: "biodiv-five-kingdoms",
      authoredExample: {
        prompt:
          "Bacteria and Amoeba are both single-celled. Why are they placed in different kingdoms?",
        steps: [
          "A bacterium is a prokaryote — its DNA is not enclosed in a true membrane-bound nucleus → kingdom Monera.",
          "An Amoeba is a eukaryote — it has a true nucleus and membrane-bound organelles, but is still single-celled → kingdom Protista.",
          "The deciding feature is cell type (prokaryote vs eukaryote), not the number of cells.",
        ],
        answer: "Bacteria are prokaryotes (Monera); Amoeba are unicellular eukaryotes (Protista).",
      },
      selfCheckExample: {
        prompt:
          "Place each in its kingdom: (a) a mushroom, (b) cyanobacteria, (c) Paramecium, (d) a mango tree.",
        steps: [
          "A mushroom is a multicellular eukaryotic decomposer → Fungi.",
          "Cyanobacteria (blue-green algae) are prokaryotes → Monera.",
          "Paramecium is a single-celled eukaryote → Protista.",
          "A mango tree is a multicellular photosynthetic autotroph → Plantae.",
        ],
        answer: "(a) Fungi, (b) Monera, (c) Protista, (d) Plantae.",
      },
      practiceSet: [
        { prompt: "Which two kingdoms contain only unicellular organisms?", answer: "Monera and Protista" },
        { prompt: "Which is the only kingdom of prokaryotes?", answer: "Monera", method: "no true nucleus" },
        { prompt: "Which kingdom do Amoeba and Paramecium belong to?", answer: "Protista", method: "unicellular eukaryotes" },
        { prompt: "Who proposed the five-kingdom system?", answer: "R. H. Whittaker (1969)" },
      ],
      pyqExampleId: "19496b5c-93b5-4d4c-9e2b-c3c0abbc01eb", // Monera + Protista only unicellular
      traps: [
        {
          title: "Only Monera and Protista are 'only unicellular'",
          body:
            "The bank asks which kingdoms have **only** single-celled members. Monera (always unicellular) and **Protista** (unicellular eukaryotes) both qualify. Fungi is wrong — it has multicellular members (mushrooms). Watch the distractor 'Protista and Fungi'.",
        },
        {
          title: "Unicellular is not the same as prokaryote",
          body:
            "Both Monera and Protista are unicellular, but only **Monera** is prokaryotic. Protista cells are eukaryotic (true nucleus). The first split in the five-kingdom system is cell type, not cell count.",
        },
      ],
    },

    // Kingdom Fungi features (REFERENCE)
    {
      kind: "reference" as const,
      slug: "biodiv-fungi-features",
      name: "Kingdom Fungi — features",
      intuition:
        "Fungi look plant-like (they are fixed, branching, and live in soil) but they are NOT plants. The single most-tested point: fungi **cannot photosynthesise** — they have no chlorophyll, so they feed by absorbing nutrients from dead matter (saprophytes). " +
        "Their cell wall is made of chitin (like an insect's shell), not cellulose.",
      definition:
        "Defining features of Kingdom **Fungi**:\n" +
        "- **No chlorophyll** → **cannot photosynthesise**; they are **heterotrophs** (saprophytes/parasites that absorb food).\n" +
        "- **Cell wall of chitin** — not cellulose (which is the plant cell wall).\n" +
        "- Body is a network of thread-like filaments called **hyphae**, forming a **mycelium**.\n" +
        "- Reproduce by **spores** (both asexual and sexual).\n" +
        "- Examples: mushrooms, moulds (Rhizopus), yeast (unicellular), Penicillium.",
      table: {
        columns: ["Feature", "Fungi", "Contrast"],
        rows: [
          {
            cells: ["Nutrition", "Heterotroph — **no photosynthesis** (no chlorophyll)", "Plants are autotrophs"],
            noteAmber: "NDA 2023 — 'can carry out photosynthesis' is NOT a feature of fungi; it is the odd one out.",
          },
          { cells: ["Cell wall", "**Chitin**", "Plants use cellulose"] },
          { cells: ["Body", "**Mycelium** of thread-like **hyphae**", "Not roots/stems/leaves"] },
          { cells: ["Reproduction", "By **spores** (asexual + sexual)", "Not by seeds"] },
          { cells: ["Examples", "Mushroom, mould, yeast, Penicillium", "Yeast is unicellular"] },
        ],
        caption:
          "Fungi are decomposers, not producers — the green-plant feature (photosynthesis) is exactly what they lack.",
      },
      selfCheckExample: {
        prompt:
          "A student claims fungi are plants because they grow in soil and don't move. Give two features that prove fungi are NOT plants.",
        steps: [
          "Fungi have no chlorophyll, so they cannot photosynthesise — plants can.",
          "A fungal cell wall is made of chitin, while a plant cell wall is made of cellulose.",
          "Either feature is enough; together they place fungi in a separate kingdom.",
        ],
        answer: "Fungi cannot photosynthesise (no chlorophyll) and their cell wall is chitin, not cellulose.",
      },
      practiceSet: [
        { prompt: "Can fungi carry out photosynthesis?", answer: "No", method: "no chlorophyll — they are saprophytes" },
        { prompt: "What is the fungal cell wall made of?", answer: "Chitin" },
        { prompt: "What is the network of fungal filaments called?", answer: "Mycelium", method: "made of hyphae" },
        { prompt: "How do fungi reproduce asexually?", answer: "By spores" },
      ],
      pyqExampleId: "19e3fdb5-ed09-4407-9b96-f740df9f311b", // photosynthesis NOT a fungi feature
      traps: [
        {
          title: "Photosynthesis is the feature fungi LACK",
          body:
            "A 'which is NOT a feature of fungi?' question lists chitin wall, mycelium and spores (all true) alongside 'can carry out photosynthesis' (false). Fungi have **no chlorophyll** — the photosynthesis option is always the answer to the 'not a feature' version.",
        },
        {
          title: "Chitin, not cellulose",
          body:
            "Fungal cell walls are **chitin**; plant cell walls are **cellulose**. Don't let the plant-like appearance of fungi pull you to 'cellulose'.",
        },
      ],
    },
  ],
};
