import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_STRUCTURE_FUNDAMENTALS_NOTE: SubtopicNote = {
  subtopicName: "Cell Structure Fundamentals",
  title: "Cell Structure Fundamentals — What Every Cell Has",
  oneLineDefinition:
    "The cell is the smallest unit of life; every living cell — whether a bacterium or a human nerve cell — must have a plasma membrane, cytoplasm, ribosomes and genetic material, while only some have a cell wall or an organized nucleus.",
  whyItMatters:
    "Start here — this subtopic sets the vocabulary (cell, tissue, organ, organism) and the universal-vs-optional distinction the whole chapter leans on (6 PYQs). " +
    "The bank's favourite trap is the word 'all': 'all cells have a cell wall' (false — animal cells don't) and 'all cells have a well-organized nucleus' (false — prokaryotes don't). " +
    "All EASY or MODERATE — pure recall and careful statement-reading.",
  concepts: [
    // Foundation — levels of organization (no PYQ)
    {
      kind: "formula" as const,
      slug: "cell-levels-of-organization",
      name: "Levels of organization — molecules to organism",
      intuition:
        "Life is built in a ladder of increasing complexity. Molecules (like proteins) build cells; similar cells form a tissue; different tissues form an organ; organs form the whole organism. " +
        "Knowing the rungs tells you what KIND of thing each exam term is, so you can sort a jumbled list into the right order.",
      definition:
        "The structural hierarchy of life, simplest to most complex:\n" +
        "- **Molecule** — e.g. a protein, the chemical building block.\n" +
        "- **Cell** — the basic structural and functional unit of life.\n" +
        "- **Tissue** — a group of similar cells doing one job.\n" +
        "- **Organ** — different tissues working together (heart, leaf).\n" +
        "- **Organism** — the complete living individual.",
      authoredExample: {
        prompt:
          "Arrange in order of increasing complexity: organ, molecule, organism, tissue.",
        steps: [
          "A molecule (e.g. a protein) is the chemical building block — simplest.",
          "Cells are built from molecules; similar cells form a tissue — next rung.",
          "Different tissues combine into an organ.",
          "Organs build the whole organism — most complex.",
        ],
        answer: "Molecule → tissue → organ → organism.",
      },
      practiceSet: [
        { prompt: "Which is simpler: a tissue or an organ?", answer: "Tissue", method: "tissue is built first, then organs are built from tissues" },
        { prompt: "What is the basic structural and functional unit of life?", answer: "The cell" },
        { prompt: "Order these by increasing complexity: protein, organ, tissue.", answer: "Protein → tissue → organ" },
      ],
    },

    // increasing complexity sequence (PYQ 7e86fdba)
    {
      kind: "reference" as const,
      slug: "cell-complexity-sequence",
      name: "The increasing-complexity sequence",
      intuition:
        "The NDA likes to scramble the complexity ladder and ask you to pick the correctly-ordered option. The only sequence that works runs from the chemical building block up to the whole body.",
      definition:
        "The correct order of increasing complexity, with the trap distractors that scramble it:\n" +
        "- Correct: **Protein → Tissue → Organ → Organism**.\n" +
        "- A protein is a molecule; tissues are built from cells; organs from tissues; the organism is the whole.\n" +
        "- Any option that puts 'organism' before 'organ' or 'tissue' is wrong — the organism is always last.",
      table: {
        columns: ["Step", "Level", "What it is"],
        rows: [
          { cells: ["1 (simplest)", "**Protein**", "A molecule — chemical building block"] },
          { cells: ["2", "**Tissue**", "Group of similar cells doing one job"] },
          { cells: ["3", "**Organ**", "Several tissues working together"] },
          {
            cells: ["4 (most complex)", "**Organism**", "The whole living individual"],
            noteAmber: "Organism is ALWAYS last — any option listing it earlier is a distractor.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which is the correctly ordered increasing-complexity sequence: (a) Protein–Organism–Tissue–Organ, or (b) Protein–Tissue–Organ–Organism?",
        steps: [
          "Reject any sequence that lists 'organism' before organ or tissue.",
          "Option (a) puts organism second — wrong.",
          "Option (b) runs building-block → tissue → organ → whole body — correct.",
        ],
        answer: "(b) Protein–Tissue–Organ–Organism.",
      },
      practiceSet: [
        { prompt: "In the complexity ladder, what comes immediately after tissue?", answer: "Organ" },
        { prompt: "Which level is always the most complex (last)?", answer: "Organism" },
        { prompt: "Is a protein simpler or more complex than a tissue?", answer: "Simpler", method: "a protein is a single molecule" },
      ],
      pyqExampleId: "7e86fdba-1011-4a4b-bd66-695adc54a017",
      traps: [
        {
          title: "Organism is the LAST rung, not an early one",
          body:
            "Distractors scramble the order by sliding 'organism' forward (Protein–Organism–Tissue–Organ). The organism is the complete individual — it can never come before the organ or tissue that builds it.",
        },
      ],
    },

    // what every cell must have / cell theory (PYQs fdb366aa, 13ea35aa, 74168eae, 8566d094)
    {
      kind: "reference" as const,
      slug: "cell-universal-vs-optional",
      name: "Universal vs optional cell features",
      intuition:
        "Some structures are in EVERY living cell; others are only in some. The exam tests this line constantly with the word 'all'. Four things are truly universal: a plasma membrane, cytoplasm, ribosomes, and genetic material. " +
        "The cell wall and a membrane-bound (well-organized) nucleus are OPTIONAL — present in plants/bacteria or eukaryotes, absent elsewhere.",
      definition:
        "The universal-vs-optional split the bank tests:\n" +
        "- **Universal (in all cells):** plasma membrane, cytoplasm, **ribosomes**, genetic material (DNA).\n" +
        "- **Optional (only some cells):** **cell wall** (plants, fungi, bacteria — NOT animals), a **membrane-bound nucleus** (eukaryotes only — prokaryotes lack it), **linear DNA** (eukaryotes; prokaryotes have circular DNA).\n" +
        "- A living being also shows **growth, repair and metabolism** — non-living things do not.",
      table: {
        columns: ["Feature", "In all cells?", "Note"],
        rows: [
          { cells: ["Plasma membrane", "**Yes** — universal", "Outer boundary of every cell"] },
          { cells: ["Cytoplasm", "**Yes** — universal", "The cell's internal fluid"] },
          { cells: ["Ribosomes", "**Yes** — universal", "Even prokaryotes have them (70S)"] },
          { cells: ["Genetic material (DNA)", "**Yes** — universal", "Present in every cell"] },
          {
            cells: ["Cell wall", "**No** — optional", "Plants/fungi/bacteria have it; animal cells do NOT"],
            noteAmber: "'All cells have a cell wall' is FALSE — animal cells lack one.",
          },
          {
            cells: ["Well-organized nucleus", "**No** — optional", "Eukaryotes only; prokaryotes have a nucleoid"],
            noteAmber: "'All cells have a well-organized nucleus' is FALSE — prokaryotes don't.",
          },
        ],
        caption:
          "When a statement says 'ALL cells have X', check it against this table — ribosomes pass, cell wall and organized nucleus fail.",
      },
      selfCheckExample: {
        prompt:
          "Of these statements, how many are correct? I. All cells possess a cell wall. II. All cells have ribosomes. III. All cells have a well-organized nucleus.",
        steps: [
          "I — false: animal cells have no cell wall.",
          "II — true: ribosomes are universal (prokaryotes have 70S ribosomes).",
          "III — false: prokaryotes have no membrane-bound nucleus.",
          "Only statement II is correct.",
        ],
        answer: "Only one (statement II).",
      },
      practiceSet: [
        { prompt: "Which structure is NOT always present in living cells?", answer: "Cell wall", method: "animal cells and some protists lack it" },
        { prompt: "Are ribosomes present in all cells?", answer: "Yes", method: "even prokaryotes have 70S ribosomes" },
        { prompt: "Name two features that distinguish living from non-living things.", answer: "Growth/repair and metabolism" },
        { prompt: "Is a monocyte an animal cell type?", answer: "Yes", method: "monocyte, basophil, lymphocyte = white blood cells; chondrocyte = cartilage cell" },
      ],
      pyqExampleId: "74168eae-2768-4fc6-a2bd-fcd76155b455",
      traps: [
        {
          title: "Beware the word 'ALL' in statement questions",
          body:
            "'All cells have a cell wall' and 'all cells have a well-organized nucleus' are both FALSE traps. Only the plasma membrane, cytoplasm, ribosomes and DNA are truly universal. Read each statement against the universal list.",
        },
        {
          title: "Animal cell types: monocyte, basophil, lymphocyte, chondrocyte",
          body:
            "A 2024 question listed monocyte, chondrocyte, basophil and lymphocyte and asked how many are animal cells — the answer is all four. Three are white blood cells; the chondrocyte is a cartilage cell. All belong to animals.",
        },
      ],
    },
  ],
};
