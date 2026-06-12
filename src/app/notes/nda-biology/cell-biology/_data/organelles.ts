import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_ORGANELLES_NOTE: SubtopicNote = {
  subtopicName: "Cell Organelles and Functions",
  title: "Cell Organelles and Functions — the Chapter's Core",
  oneLineDefinition:
    "Organelles are the tiny working compartments of a eukaryotic cell — the mitochondrion makes energy, the lysosome digests, the endoplasmic reticulum transports and builds lipids, and three organelles (mitochondria, chloroplasts, nucleus) carry their own DNA.",
  whyItMatters:
    "This is the single biggest cluster in Cell Biology — 17 of 44 PYQs. Master the organelle table and you win a third of the chapter. " +
    "The bank's three favourite facts: which organelles have their own DNA (mitochondria + chloroplast/plastid + nucleus), which one is the cell's digestive/suicide bag (lysosome), and the ER's split roles (rough = transport, smooth = lipids + detox). " +
    "All EASY or MODERATE — pure named-fact recall.",
  concepts: [
    // organelle overview map (foundation reference) — also the DNA-bearing facts
    {
      kind: "reference" as const,
      slug: "cell-organelle-map",
      name: "The organelle map — who does what",
      intuition:
        "Before the detail, fix the one-line job of each organelle on a labelled cell. Almost every organelle question reduces to 'which one does X?' — so the map below is the highest-leverage thing in the chapter.",
      definition:
        "The working organelles and their signature jobs:\n" +
        "- **Mitochondrion** — the powerhouse; makes **ATP** (cellular respiration). Has its own DNA.\n" +
        "- **Chloroplast / plastid** — photosynthesis (plants); has its own DNA.\n" +
        "- **Nucleus** — holds the DNA; controls the cell.\n" +
        "- **Ribosome** — builds proteins (rRNA, no own DNA).\n" +
        "- **Endoplasmic reticulum** — transport network; smooth ER also makes lipids.\n" +
        "- **Golgi body** — packages and ships secretions.\n" +
        "- **Lysosome** — digests waste (hydrolytic enzymes).\n" +
        "- **Vacuole** — storage; osmoregulation in unicellular organisms.",
      visualizationSlug: "cell-organelle-map",
      table: {
        columns: ["Organelle", "Job"],
        rows: [
          { cells: ["**Mitochondrion**", "Makes ATP — the powerhouse"] },
          { cells: ["**Chloroplast**", "Photosynthesis (plant cells)"] },
          { cells: ["**Nucleus**", "Stores DNA, controls the cell"] },
          { cells: ["**Ribosome**", "Protein synthesis"] },
          { cells: ["**Endoplasmic reticulum**", "Transport; smooth ER makes lipids"] },
          { cells: ["**Golgi body**", "Packaging and secretion"] },
          { cells: ["**Lysosome**", "Intracellular digestion"] },
          { cells: ["**Vacuole**", "Storage; water expulsion in unicellulars"] },
        ],
      },
      practiceSet: [
        { prompt: "Which organelle is the powerhouse of the cell?", answer: "The mitochondrion", method: "it makes ATP" },
        { prompt: "Which organelle digests waste?", answer: "The lysosome" },
        { prompt: "Which organelle is the cell's transport network?", answer: "The endoplasmic reticulum" },
        { prompt: "Which organelle controls the cell and stores DNA?", answer: "The nucleus" },
      ],
    },

    // DNA-bearing organelles (PYQs 81fe8e0b, d841337e, 380e2c52, f7adf41e, 2b19b4c1, 535bd639, 0d182427)
    {
      kind: "reference" as const,
      slug: "cell-dna-bearing-organelles",
      name: "Organelles with their own DNA",
      intuition:
        "Most organelles have no genome of their own — but three do: the mitochondrion, the chloroplast (plastid), and the nucleus. The mitochondrion and chloroplast also have their own ribosomes, because they were once free-living bacteria (endosymbiotic theory). This is the bank's most-repeated organelle fact.",
      definition:
        "Which organelles carry genetic material:\n" +
        "- **Have their own DNA:** mitochondria, **chloroplasts / plastids**, and the nucleus.\n" +
        "- **Mitochondria + chloroplasts** also have their own **ribosomes** and can make some of their own proteins (endosymbiotic theory).\n" +
        "- **No own DNA encoding proteins:** ribosomes (carry rRNA only — structural), Golgi bodies, plasma membrane, ER, lysosomes.\n" +
        "- The **plasma membrane** has NO nucleic acid at all (it is lipid + protein).",
      table: {
        columns: ["Organelle", "Own DNA?", "Note"],
        rows: [
          {
            cells: ["Mitochondrion", "**Yes**", "Own DNA + ribosomes; makes some proteins"],
            noteAmber: "Mitochondria + chloroplasts are the 'has its own DNA AND ribosomes' pair.",
          },
          { cells: ["Chloroplast / plastid", "**Yes**", "Own DNA + ribosomes (plant cells)"] },
          { cells: ["Nucleus", "**Yes**", "Holds the cell's main DNA"] },
          { cells: ["Ribosome", "**No**", "Carries rRNA (structural), not its own genome"] },
          {
            cells: ["Plasma membrane", "**No**", "No nucleic acid at all — lipid + protein"],
            noteAmber: "'Which organelle does NOT possess nucleic acid?' → plasma membrane.",
          },
          { cells: ["Golgi body / ER / lysosome", "**No**", "No own genome"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which two organelles have BOTH their own DNA and their own ribosomes?",
        steps: [
          "The nucleus has DNA but is not the 'own DNA + own ribosomes' organelle in the endosymbiotic sense.",
          "Mitochondria descend from free-living bacteria — they keep their own circular DNA and 70S ribosomes.",
          "Chloroplasts (plastids) likewise keep their own DNA and ribosomes.",
          "So the pair is mitochondria and chloroplasts.",
        ],
        answer: "Mitochondria and chloroplasts (plastids).",
      },
      practiceSet: [
        { prompt: "Name three organelles with their own DNA.", answer: "Mitochondria, chloroplast, nucleus" },
        { prompt: "Which two organelles have their own DNA AND ribosomes?", answer: "Mitochondria and chloroplast" },
        { prompt: "Which organelle has NO nucleic acid at all?", answer: "Plasma membrane", method: "it is lipid + protein only" },
        { prompt: "Mitochondria can produce their own ___.", answer: "Proteins", method: "they have their own DNA and ribosomes" },
      ],
      pyqExampleId: "d841337e-44c3-490b-ba4c-c2d22f3cb077",
      traps: [
        {
          title: "Ribosomes have rRNA, but no DNA genome",
          body:
            "A ribosome contains rRNA, so 'does it have nucleic acid?' is yes — but it has no DNA genome encoding proteins. When the question asks which organelle lacks 'its own genetic material encoding proteins', the answer is the ribosome.",
        },
        {
          title: "Plasma membrane has NO nucleic acid",
          body:
            "Unlike the nucleus, chloroplast or ribosome, the plasma membrane is purely lipid + protein. In 'which does NOT possess nucleic acid', it is the answer.",
        },
      ],
    },

    // lysosomes (PYQs ceda1efa, f95bfaf4, 63a1d3be)
    {
      kind: "reference" as const,
      slug: "cell-lysosomes",
      name: "Lysosomes — the digestive 'suicide bags'",
      intuition:
        "The lysosome is the cell's stomach and waste-disposal unit, packed with hydrolytic (digestive) enzymes. It breaks down ORGANIC material and worn-out parts, and can self-destruct the cell — earning the nickname 'suicide bag'.",
      definition:
        "Key lysosome facts the bank tests:\n" +
        "- Lysosomes are **rich in hydrolytic (digestive) enzymes** — lipases, proteases, nucleases.\n" +
        "- They perform **intracellular digestion** and are the cell's **waste-disposal system**.\n" +
        "- Nicknamed **'suicide bags'** because their enzymes can digest the whole cell.\n" +
        "- They break down **organic** material — NOT 'all inorganic materials' (a false-statement trap).",
      table: {
        columns: ["Fact about lysosomes", "Correct?"],
        rows: [
          { cells: ["Rich in hydrolytic (digestive) enzymes", "**True**"] },
          { cells: ["Waste-disposal system of the cell", "**True**"] },
          { cells: ["Called 'suicide bags'", "**True**"] },
          {
            cells: ["They break down all INORGANIC materials", "**False**"],
            noteAmber: "Lysosomes digest ORGANIC matter — 'breaks down all inorganic materials' is the wrong statement.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statement about lysosomes is NOT correct: (a) waste-disposal system, (b) they break down all inorganic materials, (c) called 'suicide bags'?",
        steps: [
          "Lysosomes ARE the cell's waste-disposal system — (a) is true.",
          "They ARE nicknamed suicide bags — (c) is true.",
          "Their hydrolytic enzymes digest ORGANIC matter, not inorganic — (b) is the incorrect statement.",
        ],
        answer: "(b) — they break down organic, not all inorganic, materials.",
      },
      practiceSet: [
        { prompt: "Which organelle is rich in hydrolytic enzymes?", answer: "The lysosome" },
        { prompt: "Where in the cell are digestive enzymes found?", answer: "Lysosomes" },
        { prompt: "What is the lysosome's nickname?", answer: "Suicide bag" },
        { prompt: "Do lysosomes break down organic or inorganic material?", answer: "Organic" },
      ],
      pyqExampleId: "ceda1efa-3f83-43af-8cf8-f6746bf7be9f",
      traps: [
        {
          title: "Lysosomes digest ORGANIC, not 'all inorganic'",
          body:
            "A statement saying lysosomes 'break down all inorganic materials' is FALSE — their hydrolytic enzymes act on organic macromolecules (proteins, lipids, nucleic acids). Watch for this in 'which statement is NOT correct' questions.",
        },
      ],
    },

    // endoplasmic reticulum (PYQs d0fb1415, fea75caa, 822a5cae)
    {
      kind: "reference" as const,
      slug: "cell-endoplasmic-reticulum",
      name: "Endoplasmic reticulum — transport, lipids, detox",
      intuition:
        "The endoplasmic reticulum (ER) is the cell's internal highway, moving materials around the cytoplasm. It comes in two flavours: rough ER (studded with ribosomes) and smooth ER. The smooth ER builds lipids and, in liver cells, detoxifies poisons.",
      definition:
        "The ER's roles, split by type:\n" +
        "- **General role** — the ER is the cell's **transport system**, moving materials through the cytoplasm and to the nucleus.\n" +
        "- **Smooth ER (SER)** — synthesises **lipids**; a defect here blocks lipid synthesis. Its specialised extra function is **detoxification** of toxic substances (e.g. in liver cells).\n" +
        "- **Rough ER (RER)** — studded with ribosomes; involved in protein synthesis.",
      table: {
        columns: ["ER role", "Which type", "Note"],
        rows: [
          { cells: ["Transport of materials", "ER (general)", "Moves substances through cytoplasm/nucleus"] },
          {
            cells: ["Lipid synthesis", "Smooth ER", "A cell that can't make lipids has a defective SER"],
            noteAmber: "Can't synthesise lipids → the smooth ER is defective.",
          },
          {
            cells: ["Detoxification", "Smooth ER", "The SER's 'additional' function (liver cells)"],
            noteAmber: "SER's extra job = detoxification, not protein synthesis.",
          },
          { cells: ["Protein synthesis", "Rough ER", "Ribosome-studded surface"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A cell cannot synthesise lipids. Which organelle is most likely defective, and what is that organelle's other special function?",
        steps: [
          "Lipid synthesis happens on the smooth endoplasmic reticulum.",
          "So the defective organelle is the smooth ER.",
          "Beyond lipid synthesis, the SER's additional function is detoxification of toxic substances (notably in liver cells).",
        ],
        answer: "Smooth ER is defective; its other role is detoxification.",
      },
      practiceSet: [
        { prompt: "Which organelle moves materials around the cytoplasm and nucleus?", answer: "The endoplasmic reticulum" },
        { prompt: "Which ER synthesises lipids?", answer: "Smooth ER" },
        { prompt: "What is the smooth ER's additional function?", answer: "Detoxification of toxic substances" },
        { prompt: "Which ER is involved in protein synthesis?", answer: "Rough ER", method: "it is studded with ribosomes" },
      ],
      pyqExampleId: "822a5cae-e7a2-472f-aa80-0575acc7173d",
      traps: [
        {
          title: "Smooth ER detoxifies; rough ER does proteins",
          body:
            "The SER's 'additional function' is detoxification — NOT protein synthesis (that's the rough ER). Don't pick 'protein synthesis' for a smooth-ER question.",
        },
      ],
    },

    // vacuoles (PYQs 6b3f6885, 6062f46c)
    {
      kind: "reference" as const,
      slug: "cell-vacuoles",
      name: "Vacuoles — storage and osmoregulation",
      intuition:
        "The vacuole is the cell's storage tank. In plants a single large central vacuole fills most of the cell and keeps it turgid; in unicellular organisms a contractile vacuole pumps out excess water. Vacuoles exist in animal cells too — just smaller.",
      definition:
        "Vacuole facts the bank tests:\n" +
        "- In **plant cells**, a large **central vacuole** may occupy up to **90%** of the cell volume and provides **turgidity and rigidity**.\n" +
        "- In **unicellular organisms** (e.g. Amoeba, Paramecium), the **contractile vacuole** expels excess water and wastes — **osmoregulation**.\n" +
        "- Vacuoles are **present in animal cells** too (smaller and more numerous) — saying they are 'absent in animal cells' is FALSE.",
      table: {
        columns: ["Vacuole fact", "Correct?"],
        rows: [
          { cells: ["Large central vacuole can be ~90% of a plant cell", "**True**"] },
          { cells: ["Provides turgidity and rigidity in plants", "**True**"] },
          { cells: ["Expels excess water in unicellular organisms", "**True** (contractile vacuole)"] },
          {
            cells: ["Vacuoles are absent in animal cells", "**False**"],
            noteAmber: "Animal cells DO have vacuoles (smaller) — 'absent in animal cells' is the wrong statement.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which organelle helps a unicellular organism expel excess water and wastes?",
        steps: [
          "Unicellular organisms in fresh water constantly absorb water by osmosis.",
          "The contractile vacuole collects and pumps this excess water back out.",
          "So the organelle is the vacuole.",
        ],
        answer: "The vacuole (contractile vacuole).",
      },
      practiceSet: [
        { prompt: "Which organelle expels excess water in unicellular organisms?", answer: "The vacuole", method: "the contractile vacuole" },
        { prompt: "What gives a plant cell turgidity?", answer: "The central vacuole" },
        { prompt: "Are vacuoles absent in animal cells?", answer: "No", method: "they are present but smaller" },
      ],
      pyqExampleId: "6b3f6885-13f5-48ac-85d6-17f86e80e67b",
      traps: [
        {
          title: "Vacuoles are NOT absent in animal cells",
          body:
            "A common false statement says 'vacuoles are absent in animal cells'. Animal cells have vacuoles too — just smaller and more numerous than the plant central vacuole. Mark this statement as incorrect.",
        },
      ],
    },

    // plastids (PYQ aa833031)
    {
      kind: "reference" as const,
      slug: "cell-plastids",
      name: "Plastids — chloroplast, chromoplast, leucoplast",
      intuition:
        "Plastids are plant-only organelles, and they come in three colours of job: green chloroplasts photosynthesise, coloured chromoplasts give flowers and fruits their hue, and colourless leucoplasts store food (starch, oil, protein).",
      definition:
        "The three plastid types:\n" +
        "- **Chloroplast** — green; carries out **photosynthesis** (has chlorophyll + its own DNA).\n" +
        "- **Chromoplast** — coloured (red/yellow/orange); gives colour to flowers and fruits.\n" +
        "- **Leucoplast** — colourless; **stores** starch, oil and protein granules.",
      table: {
        columns: ["Plastid", "Colour", "Function"],
        rows: [
          { cells: ["**Chloroplast**", "Green", "Photosynthesis"] },
          { cells: ["**Chromoplast**", "Red/yellow/orange", "Colour of flowers and fruits"] },
          {
            cells: ["**Leucoplast**", "Colourless", "Stores starch, oil and protein"],
            noteAmber: "Stores starch + oil + protein granules → leucoplast (not chloroplast).",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which plastid stores starch, oil and protein?", answer: "Leucoplast" },
        { prompt: "Which plastid carries out photosynthesis?", answer: "Chloroplast" },
        { prompt: "Which plastid colours flowers and fruits?", answer: "Chromoplast" },
      ],
      pyqExampleId: "aa833031-40be-4565-9c93-7e40a507118a",
      traps: [
        {
          title: "Storage plastid = leucoplast, not chloroplast",
          body:
            "The colourless leucoplast is the storage plastid (starch, oil, protein). The green chloroplast photosynthesises. Don't pick chloroplast for a storage question. (There is no 'xanthoplast' — a distractor.)",
        },
      ],
    },

    // RBC — no organelles (PYQ 6b8ec10a)
    {
      kind: "reference" as const,
      slug: "cell-rbc-no-organelles",
      name: "Red blood cells — a cell with almost no organelles",
      intuition:
        "The mature mammalian red blood cell is a famous exception: to pack in as much haemoglobin as possible, it throws out its nucleus, mitochondria and endoplasmic reticulum. It is essentially a bag of haemoglobin.",
      definition:
        "Mature mammalian RBC facts:\n" +
        "- A mature RBC has **no nucleus, no mitochondria and no endoplasmic reticulum**.\n" +
        "- Losing these organelles maximises space for **haemoglobin** and oxygen-carrying capacity.\n" +
        "- Because it has no mitochondria, the RBC makes its energy by **anaerobic** glycolysis — it doesn't consume the oxygen it carries.",
      table: {
        columns: ["RBC component", "Present?"],
        rows: [
          { cells: ["Nucleus", "**Absent**"] },
          { cells: ["Mitochondria", "**Absent**"] },
          {
            cells: ["Endoplasmic reticulum", "**Absent**"],
            noteAmber: "Mature RBC = NO nucleus, NO mitochondria, NO ER — maximises haemoglobin.",
          },
          { cells: ["Haemoglobin", "**Present** — the cell is packed with it"] },
        ],
      },
      practiceSet: [
        { prompt: "Does a mature RBC have a nucleus?", answer: "No" },
        { prompt: "Which three organelles does a mature mammalian RBC lack?", answer: "Nucleus, mitochondria, endoplasmic reticulum" },
        { prompt: "Why does the RBC shed its organelles?", answer: "To pack in more haemoglobin" },
      ],
      pyqExampleId: "6b8ec10a-fffa-428a-a602-feb101ef8d1c",
      traps: [
        {
          title: "Mature RBC = no nucleus AND no mitochondria",
          body:
            "Distractors say the RBC keeps a nucleus or mitochondria. The mature mammalian RBC has neither, nor an ER — it sacrifices organelles for maximum haemoglobin.",
        },
      ],
    },
  ],
};
