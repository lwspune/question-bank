import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_CE_NUCLEUS_NOTE: SubtopicNote = {
  subtopicName: "The Nucleus and Cell Division",
  title: "The Nucleus and Cell Division",
  oneLineDefinition:
    "What the nucleus holds and which cells have none, where RNA is found in a cell, how mitosis differs from meiosis, and how cancer starts and spreads.",
  whyItMatters:
    "Six CDS questions from 2016 (II) to 2026 (II). Two ask which cells have no nucleus (red blood cells, and platelets too in 2016 (II)), and the 2026 (II) paper added two on mitosis and cancer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbice-nucleus",
      name: "The nucleus, and the cells that have none",
      intuition:
        "The nucleus is the control room of the cell. It keeps the DNA, wrapped in a double membrane with pores, and sends out RNA messages that tell the ribosomes which proteins to make. A few cells give up their nucleus as they mature. A red blood cell does this to make room for more haemoglobin, so it can carry more oxygen but can no longer divide.",
      definition:
        "The nucleus:\n" +
        "- Bounded by a **double membrane** (the nuclear envelope) with **pores**. In a plant cell the chloroplasts also have their own double membrane, separate from the nucleus.\n" +
        "- Holds **chromatin**, which condenses into **chromosomes** (DNA with proteins) when the cell divides.\n" +
        "- The **nucleolus**, a dense body inside, makes ribosomal RNA for the ribosomes.\n" +
        "- **RNA** is made in the nucleus and works in the cytoplasm, so it is found in the **nucleus, cytoplasm and ribosomes**, and also in **mitochondria and chloroplasts**, which make their own.\n\n" +
        "Cells **without a nucleus**: mature **red blood cells** of mammals, and **platelets**, which are only fragments of a large cell. Muscle cells, white blood cells and plant root hair cells all have nuclei.",
      table: {
        columns: ["Cell or part", "Nucleus"],
        rows: [
          {
            cells: ["Mature red blood cell (mammal)", "None: it is lost as the cell matures"],
            noteAmber: "CDS 2016 (II): red blood cells and platelets are the two without a nucleus; root hair cells and monocytes have one.",
            pyqExampleId: "f741ead9-f052-4d3d-a751-fc1a1cf86b5d",
          },
          { cells: ["Platelet", "None: it is a cell fragment"] },
          { cells: ["White blood cell, muscle cell", "Present"] },
          {
            cells: ["Plant cell", "Present, in its own double membrane, as each chloroplast is"],
            noteAmber: "CDS 2022 (II): in plant cells the nucleus and the chloroplasts are each surrounded by their own membrane.",
            pyqExampleId: "356098a4-debb-4057-8d98-eb39b0bb46a7",
          },
        ],
      },
      pyqExampleId: "8f34bd54-c8ac-4897-9a9e-b75236144ccf",
      selfCheckExample: {
        prompt: "Why can a mature red blood cell not make new proteins or divide?",
        steps: [
          "Making proteins and dividing both need the instructions in DNA, which sits in the nucleus.",
          "A mature red blood cell has lost its nucleus, and with it its ribosomes.",
        ],
        answer: "It has no nucleus (no DNA) and no ribosomes left to work from.",
      },
      practiceSet: [
        { prompt: "How many membranes make up the nuclear envelope?", answer: "Two" },
        { prompt: "What are chromosomes made of?", answer: "DNA and proteins" },
        { prompt: "Which dense body inside the nucleus makes ribosomal RNA?", answer: "The nucleolus" },
        { prompt: "Besides the nucleus, name two organelles that make their own RNA.", answer: "Mitochondria and chloroplasts" },
      ],
      traps: [
        {
          title: "Platelets have no nucleus either",
          body: "A **platelet** is a fragment broken off a large bone-marrow cell, so it has no nucleus, just like a mature **red blood cell**. Monocytes and other white blood cells keep theirs.",
        },
        {
          title: "RNA is not only in the nucleus",
          body: "RNA is made in the nucleus but works in the **cytoplasm** and **ribosomes**, and mitochondria and chloroplasts have their own. The endoplasmic reticulum membranes are not where RNA lives.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-division",
      name: "Mitosis, meiosis and cancer",
      intuition:
        "Cells make more cells by dividing. Mitosis copies a cell exactly: two daughters, each with the full set of chromosomes. It is how we grow and heal, and how many simple organisms reproduce without sex. Meiosis is the special division that makes eggs and sperm: four daughters, each with half the chromosomes. Cancer is mitosis out of control, when the genes that should stop a cell dividing are damaged.",
      definition:
        "Two kinds of division:\n" +
        "- **Mitosis** (equational division): **two** daughter cells with the **same number** of chromosomes as the parent. Used for **growth, repair** and replacing cells, and for **asexual reproduction**.\n" +
        "- **Meiosis** (reduction division): **four** daughter cells with **half** the chromosomes (**haploid**). Happens only in the cells that form **gametes**.\n\n" +
        "**Cancer**:\n" +
        "- Cells divide without control and form a **tumour**.\n" +
        "- Caused when normal genes become **oncogenes**, by radiation, chemicals such as those in tobacco smoke, or some **viruses**.\n" +
        "- **Metastasis**: cancer cells leave the tumour and spread through the **blood and lymph** to new sites.",
      table: {
        columns: ["Feature", "Mitosis", "Meiosis"],
        rows: [
          { cells: ["Daughter cells", "Two", "Four"] },
          {
            cells: ["Chromosome number", "Same as the parent", "Half of the parent (haploid)"],
            noteAmber: "CDS 2026 (II): 'the cells become haploid' is the one statement that is not true of mitosis.",
            pyqExampleId: "e3af86d1-9f0d-4757-956e-db538b9eb7d7",
          },
          { cells: ["Where it happens", "Body cells everywhere", "Cells that form eggs and sperm"] },
          { cells: ["Used for", "Growth, repair, asexual reproduction", "Making gametes"] },
        ],
      },
      pyqExampleId: "e3af86d1-9f0d-4757-956e-db538b9eb7d7",
      selfCheckExample: {
        prompt: "A human cell with 46 chromosomes divides by meiosis. How many cells are formed, and how many chromosomes does each have?",
        steps: [
          "Meiosis gives four daughter cells.",
          "It halves the chromosome number: 46 ÷ 2 = 23.",
        ],
        answer: "Four cells, each with 23 chromosomes.",
      },
      practiceSet: [
        { prompt: "How many daughter cells does meiosis produce?", answer: "Four" },
        { prompt: "What is the spread of cancer cells from a tumour to other organs called?", answer: "Metastasis" },
        { prompt: "What is a changed gene that can make a cell divide without control called?", answer: "An oncogene" },
        { prompt: "Which kind of cell division forms sperm and eggs?", answer: "Meiosis" },
      ],
      traps: [
        {
          title: "Mitosis never halves the number",
          body: "Halving to the **haploid** number is meiosis. Mitosis is **equational**: each daughter keeps the parent's full set, which is why it can repair tissue.",
        },
        {
          title: "Cancer spreads by blood and lymph",
          body: "In **metastasis** the cells travel through **both** the blood and the lymphatic system. And cancer can have outside causes, including some viruses, as well as changed genes.",
        },
      ],
    },
  ],
};
