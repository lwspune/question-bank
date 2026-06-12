import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_PROKARYOTIC_EUKARYOTIC_NOTE: SubtopicNote = {
  subtopicName: "Prokaryotic vs Eukaryotic Cells",
  title: "Prokaryotic vs Eukaryotic Cells",
  oneLineDefinition:
    "Prokaryotic cells (bacteria) have no membrane-bound nucleus — just a 'nucleoid' of naked circular DNA — and no membrane-bound organelles; eukaryotic cells (plants, animals, fungi) have a true nucleus and organelles like mitochondria.",
  whyItMatters:
    "A tight, high-frequency 5-PYQ cluster, all single-fact recall. " +
    "The bank tests the same handful of points: prokaryotes lack a true nucleus (they have a nucleoid), lack membrane-bound organelles (no mitochondria), have a single circular chromosome, and their DNA is 'naked' (no histone proteins). " +
    "All EASY or MODERATE.",
  concepts: [
    // the core contrast table (PYQs d0275591, 6236217a, 934dc595)
    {
      kind: "reference" as const,
      slug: "cell-prokaryote-eukaryote-contrast",
      name: "Prokaryote vs eukaryote — the contrast table",
      intuition:
        "The whole subtopic rests on one comparison. A eukaryote has a membrane-bound nucleus and organelles; a prokaryote has neither — its DNA sits free as a nucleoid and it has no mitochondria. Anything 'membrane-bound' is the eukaryote's signature.",
      definition:
        "The key differences between the two cell types:\n" +
        "- **Nucleus** — eukaryotes have a true membrane-bound nucleus; prokaryotes have only a **nucleoid** (no membrane).\n" +
        "- **Organelles** — eukaryotes have membrane-bound organelles (**mitochondria**, ER, Golgi); prokaryotes have none.\n" +
        "- **Both** have a cell wall, plasma membrane and ribosomes — so these do NOT distinguish them.\n" +
        "- 'Exclusively present in a eukaryote' = the **mitochondrion** (a membrane-bound organelle).\n" +
        "- 'NOT present in a prokaryote' = the **nucleus** (and other membrane-bound organelles).",
      visualizationSlug: "cell-prokaryote-eukaryote",
      table: {
        columns: ["Feature", "Prokaryote", "Eukaryote"],
        rows: [
          {
            cells: ["Nucleus", "**Nucleoid** (no membrane)", "True membrane-bound nucleus"],
            noteAmber: "'Not present in a prokaryote' → the nucleus.",
          },
          {
            cells: ["Mitochondria", "**Absent**", "Present"],
            noteAmber: "'Exclusively in eukaryotes' → mitochondria (membrane-bound).",
          },
          { cells: ["Cell wall", "Present", "Present (plants/fungi)"] },
          { cells: ["Plasma membrane", "Present", "Present"] },
          { cells: ["Ribosomes", "Present (70S)", "Present (80S)"] },
        ],
        caption:
          "Cell wall, plasma membrane and ribosomes are in BOTH — so they can never be the answer to 'what's exclusive / what's missing'. Look for the membrane-bound feature.",
      },
      selfCheckExample: {
        prompt:
          "Which organelle is found ONLY in eukaryotic cells: cell wall, plasma membrane, nucleic acid, or mitochondria?",
        steps: [
          "Cell walls exist in bacteria (prokaryotes) too — not exclusive.",
          "Plasma membrane and nucleic acid are in both cell types.",
          "Mitochondria are membrane-bound organelles, found only in eukaryotes.",
        ],
        answer: "Mitochondria.",
      },
      practiceSet: [
        { prompt: "Which organelle is NOT found in prokaryotic cells?", answer: "Mitochondria", method: "prokaryotes have no membrane-bound organelles" },
        { prompt: "Which structure is exclusively present in eukaryotic cells?", answer: "Mitochondria (a true nucleus too)" },
        { prompt: "Do prokaryotes have a membrane-bound nucleus?", answer: "No", method: "they have a nucleoid" },
        { prompt: "Name three structures present in BOTH cell types.", answer: "Cell wall, plasma membrane, ribosomes" },
      ],
      pyqExampleId: "6236217a-449b-44dd-ab73-5123095621a9",
      traps: [
        {
          title: "Cell wall is NOT eukaryote-exclusive",
          body:
            "Bacteria (prokaryotes) have a cell wall, so 'cell wall' can never be the answer to 'what is exclusive to eukaryotes'. The eukaryote-only answer is a membrane-bound structure — the nucleus or mitochondria.",
        },
      ],
    },

    // the nucleoid and naked DNA (PYQs b86b1082, d5f1711f, plus 438e6dbd lives in another subtopic)
    {
      kind: "reference" as const,
      slug: "cell-nucleoid-naked-dna",
      name: "The nucleoid and 'naked' bacterial DNA",
      intuition:
        "Because a prokaryote has no nuclear membrane, its DNA floats free in a region called the nucleoid. That DNA is also called 'naked' — it isn't wrapped around histone proteins the way eukaryotic DNA is. And there's just one of it: a single circular chromosome.",
      definition:
        "Prokaryotic DNA facts:\n" +
        "- The membrane-less region holding the DNA is the **nucleoid** (not nucleolus, not nucleosome).\n" +
        "- Bacterial DNA is called **'naked'** because it is **NOT associated with histone proteins** (eukaryotic DNA is wound around histones).\n" +
        "- Most prokaryotes have a **single circular chromosome** — chromosome number = **1** (plus optional plasmids).",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["**Nucleoid**", "The membrane-less DNA region of a prokaryote"],
            noteAmber: "Nucleoid — not nucleolus (eukaryotic) or nucleosome (DNA+histone unit).",
          },
          {
            cells: ["**'Naked' DNA**", "Bacterial DNA NOT bound to histone proteins"],
            noteAmber: "'Naked because not associated with' → proteins (histones).",
          },
          { cells: ["**Chromosome number**", "Usually 1 (a single circular chromosome)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Bacterial DNA is described as 'naked'. What is it NOT associated with?",
        steps: [
          "Eukaryotic DNA is wrapped around histone proteins to form chromatin.",
          "Bacterial DNA has no such packaging proteins.",
          "So 'naked' means it is not associated with proteins (histones).",
        ],
        answer: "Proteins (histones).",
      },
      practiceSet: [
        { prompt: "What is the membrane-less nuclear region of a prokaryote called?", answer: "The nucleoid" },
        { prompt: "Bacterial DNA is 'naked' because it lacks association with ___.", answer: "Proteins (histones)" },
        { prompt: "How many chromosomes does a typical prokaryote have?", answer: "One", method: "a single circular chromosome" },
      ],
      pyqExampleId: "b86b1082-0b0a-4bc0-b48e-49553f3dd1fc",
      traps: [
        {
          title: "Nucleoid vs nucleolus vs nucleosome",
          body:
            "The prokaryotic DNA region is the NUCLEOID. The nucleolus (makes ribosomes) and the nucleosome (DNA wound on histones) are EUKARYOTIC structures — both are distractors here.",
        },
      ],
    },
  ],
};
