import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_CE_ORGANELLES_NOTE: SubtopicNote = {
  subtopicName: "Cell Organelles",
  title: "Cell Organelles",
  oneLineDefinition:
    "The working parts of a eukaryotic cell: the endoplasmic reticulum and Golgi body, lysosomes and microbodies, mitochondria and plastids with their own DNA, and how to match each organelle to its job.",
  whyItMatters:
    "Seventeen CDS questions from 2017 (II) to 2026 (I), the biggest group in Cell Biology. Four ask what lysosomes do or which cell has the most of them, three are match-the-organelle lists, and two ask which organelles carry their own DNA.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbice-er-golgi",
      name: "Endoplasmic reticulum, ribosomes and the Golgi body",
      intuition:
        "Think of the cell as a factory. Ribosomes are the machines that join amino acids into proteins. Many of them sit on a network of membranes called the endoplasmic reticulum, which makes that part look rough; the part without ribosomes looks smooth and makes fats instead. The Golgi body is the packing and dispatch room: it wraps the products in little sacs and sends them where they are needed.",
      definition:
        "The membrane network:\n" +
        "- **Ribosomes**: the site of **protein synthesis**. Not bounded by a membrane; made of RNA and protein.\n" +
        "- **Rough ER (RER)**: ER with **ribosomes on its surface**, which is why it looks rough. Makes proteins and carries them through the cell.\n" +
        "- **Smooth ER (SER)**: no ribosomes. Makes **lipids** and **steroid hormones**, and **detoxifies** drugs and poisons in liver cells. It cannot make proteins.\n" +
        "- **Golgi body** (Golgi apparatus): stores, modifies, **packs** and dispatches products in vesicles. It also forms the **lysosomes**.",
      table: {
        columns: ["Organelle", "Main work"],
        rows: [
          {
            cells: ["Rough ER", "Carries ribosomes on its surface; makes and transports proteins"],
            noteAmber: "CDS 2025 (I): it looks rough because of the ribosomes on its surface.",
            pyqExampleId: "a6fa32f7-96c4-4210-b6a3-f89663c26367",
          },
          {
            cells: ["Smooth ER", "Makes lipids and steroid hormones; detoxifies drugs in the liver"],
            noteAmber: "CDS 2019 (I): protein synthesis is the one job smooth ER does not do.",
            pyqExampleId: "f1518c87-654b-4e58-a44a-ac9f1ebfdbc1",
          },
          { cells: ["Ribosome", "Joins amino acids into proteins"] },
          {
            cells: ["Golgi body", "Packs and dispatches products; forms lysosomes"],
            noteAmber: "CDS 2018 (I): lysosomes are formed from the Golgi bodies.",
            pyqExampleId: "289e6cf0-3895-4655-8f04-3212ac5d5a72",
          },
        ],
      },
      pyqExampleId: "a6fa32f7-96c4-4210-b6a3-f89663c26367",
      selfCheckExample: {
        prompt: "A person takes a large dose of a drug, and the liver must break it down. Which organelle in the liver cells will become more developed, and why?",
        steps: [
          "Breaking down drugs and poisons in the liver is the work of the smooth endoplasmic reticulum.",
          "A cell that needs more of a job done builds more of the organelle that does it.",
        ],
        answer: "The smooth endoplasmic reticulum, because it detoxifies drugs.",
      },
      practiceSet: [
        { prompt: "On which organelle are proteins made?", answer: "The ribosome" },
        { prompt: "Which kind of ER makes steroid hormones?", answer: "Smooth ER" },
        { prompt: "Which organelle is called the packaging and dispatch centre of the cell?", answer: "The Golgi body" },
        { prompt: "Is the ribosome bounded by a membrane?", answer: "No" },
      ],
      traps: [
        {
          title: "Smooth ER makes fats, not proteins",
          body: "Proteins need ribosomes, and ribosomes sit on the **rough** ER. The **smooth** ER makes lipids and steroids, detoxifies and transports, but never synthesises protein.",
        },
        {
          title: "Lysosomes come from the Golgi",
          body: "The digestive enzymes are made on the rough ER, but they are packed and budded off as lysosomes by the **Golgi body**. 'Formed from the ER' or 'from the nucleus' is the trap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-lysosome",
      name: "Lysosomes and microbodies",
      intuition:
        "A lysosome is a small sac full of digestive enzymes. It digests food the cell has swallowed, germs and worn-out parts of the cell. If the sac bursts, the enzymes digest the cell itself, so lysosomes are called the suicide bags of the cell. Cells whose work is to eat germs, such as white blood cells, are packed with them. Microbodies are other small sacs of enzymes, found in both plant and animal cells.",
      definition:
        "Lysosomes:\n" +
        "- Membrane sacs holding **hydrolytic (digestive) enzymes** that work best in **acid**.\n" +
        "- Work: **intracellular digestion** of engulfed food, **foreign particles and germs**, and worn-out organelles.\n" +
        "- Called **suicide bags**: if one bursts, its enzymes digest the cell.\n" +
        "- Most numerous in **phagocytic white blood cells**, which engulf and digest bacteria.\n" +
        "- Formed by the **Golgi body**.\n\n" +
        "**Microbodies** (such as **peroxisomes** and glyoxysomes): small membrane sacs found in **plant and animal** cells that contain **enzymes** (for example catalase).",
      table: {
        columns: ["Question about lysosomes", "Answer"],
        rows: [
          {
            cells: ["What do they store?", "Digestive (hydrolytic) enzymes"],
            noteAmber: "CDS 2019 (I): the lysosome is the storehouse of digestive enzymes.",
            pyqExampleId: "206fbf4e-331b-48e0-93dd-d93cb565faa4",
          },
          {
            cells: ["What can they digest?", "Food, germs, foreign particles and worn-out cell parts"],
            noteAmber: "CDS 2024 (II): the organelle that digests foreign material in animal cells is the lysosome.",
            pyqExampleId: "18589ab8-8d00-4f24-8fae-7efb95cf69bb",
          },
          {
            cells: ["Which cell has the most?", "White blood cells that engulf germs"],
            noteAmber: "CDS 2026 (I): a white blood cell, not a pancreatic, ovarian or muscle cell.",
            pyqExampleId: "e48d5223-9666-4502-8349-e34cb036a202",
          },
          { cells: ["Which organelle makes them?", "The Golgi body"] },
          {
            cells: ["What do microbodies contain?", "Enzymes"],
            noteAmber: "CDS 2024 (I): microbodies in plant and animal cells contain enzymes.",
            pyqExampleId: "1f386dc2-6e6d-4b2a-af1b-dedcb5d35333",
          },
        ],
      },
      pyqExampleId: "3078fde4-77b5-4c51-8781-fbc756519ea2",
      selfCheckExample: {
        prompt: "Lysosomes are full of enzymes that can digest almost anything. Why do they not digest the rest of a healthy cell?",
        steps: [
          "The enzymes are sealed inside the lysosome's own membrane.",
          "They also work best in acid, and the cytoplasm around them is close to neutral.",
        ],
        answer: "Their enzymes stay locked inside the lysosome membrane and work poorly outside it; only if it bursts do they digest the cell.",
      },
      practiceSet: [
        { prompt: "In what kind of medium do lysosomal enzymes work best: acidic, neutral or alkaline?", answer: "Acidic" },
        { prompt: "Name one kind of microbody.", answer: "A peroxisome (or a glyoxysome)" },
        { prompt: "What is digestion inside a cell, by lysosomes, called?", answer: "Intracellular digestion" },
        { prompt: "Why do white blood cells that eat germs need many lysosomes?", answer: "To digest the bacteria and debris they engulf" },
      ],
      traps: [
        {
          title: "Suicide bags are lysosomes, not vacuoles",
          body: "A **vacuole** stores sap and water. The organelle full of digestive enzymes, which can destroy the cell, is the **lysosome**. Ribosomes and desmosomes are distractors too.",
        },
        {
          title: "Phagocytes, not busy secretory cells",
          body: "A pancreatic cell makes and exports enzymes (lots of ER and Golgi) and a running muscle needs energy (lots of mitochondria). The cell richest in **lysosomes** is the one that **eats**: the white blood cell.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-energy",
      name: "Mitochondria and plastids: energy and their own DNA",
      intuition:
        "Mitochondria are the power stations of the cell: they finish breaking down food with oxygen and store the energy in ATP, the cell's energy currency. Chloroplasts, a kind of plastid, do the opposite job, trapping sunlight to make food. Both have two membranes and carry their own DNA and ribosomes, so they can make some of their own proteins. This is why they are thought to have been free-living bacteria long ago.",
      definition:
        "The energy organelles:\n" +
        "- **Mitochondria**: site of **aerobic respiration**; make **ATP** (the **energy currency** of the cell). Called the **powerhouse** of the cell.\n" +
        "- **Plastids**: in plant cells. **Chloroplasts** (green, photosynthesis, with stacks of membranes called **grana**), **chromoplasts** (coloured), **leucoplasts** (store starch, oil or protein).\n" +
        "- Both mitochondria and plastids have a **double membrane** and their **own DNA and ribosomes**; they are called **semi-autonomous**.\n" +
        "- Glycolysis, in the cytoplasm, splits a six-carbon glucose into two **pyruvate** molecules of **three carbons** each; pyruvate then enters the mitochondrion.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          {
            cells: ["Which organelles have their own DNA and ribosomes?", "Mitochondria and plastids"],
            noteAmber: "Asked twice: CDS 2020 (I) (mitochondrion) and 2021 (I) (mitochondria and plastids).",
            pyqExampleId: "acf5dcad-ed07-440c-8796-4ad4267aefb8",
          },
          { cells: ["Which molecule is the cell's energy currency?", "ATP"] },
          {
            cells: ["How many carbon atoms does pyruvate have?", "Three"],
            noteAmber: "CDS 2025 (I): pyruvate is a three-carbon molecule.",
            pyqExampleId: "d0155cb4-62f7-4117-938c-4a6affcc984c",
          },
          { cells: ["How many membranes surround a mitochondrion or chloroplast?", "Two"] },
          { cells: ["Which plastids store starch?", "Leucoplasts"] },
        ],
      },
      pyqExampleId: "79cca415-46e6-45a4-8df7-252d39f0ddea",
      selfCheckExample: {
        prompt: "Muscle cells and sperm cells contain very many mitochondria. Why?",
        steps: [
          "Both cells do a lot of work: muscles contract and sperm swim.",
          "Work needs ATP, and ATP is made mainly in the mitochondria by aerobic respiration.",
        ],
        answer: "They need a lot of energy as ATP, and mitochondria make it.",
      },
      practiceSet: [
        { prompt: "Which organelle is called the powerhouse of the cell?", answer: "The mitochondrion" },
        { prompt: "What are the stacks of membranes inside a chloroplast called?", answer: "Grana" },
        { prompt: "Which colourless plastids store starch?", answer: "Leucoplasts" },
        { prompt: "Why are mitochondria called semi-autonomous?", answer: "They have their own DNA and ribosomes and can make some of their own proteins" },
      ],
      traps: [
        {
          title: "Golgi, ER and lysosomes have no DNA",
          body: "Apart from the nucleus, only **mitochondria** and **plastids** (chloroplasts) carry DNA and ribosomes of their own. A vacuole paired with plastids is half wrong, so the option fails.",
        },
        {
          title: "ATP is the currency, glucose is the fuel",
          body: "Glucose is broken down to make energy available, but the molecule the cell actually spends is **ATP**. ADP is what is left after spending it, and pyruvic acid is a step in between.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-matching",
      name: "Matching organelles to their jobs",
      intuition:
        "Several CDS items give four organelles and four jobs and ask you to pair them. The fastest way is to fix the one pair you are surest of, usually mitochondria with respiration or ATP, and strike out every code that does not have it. Then one more sure pair settles the rest.",
      definition:
        "The pairs to know cold:\n" +
        "- **Mitochondria**: respiration, ATP.\n" +
        "- **Chloroplast**: photosynthesis.\n" +
        "- **Ribosome**: protein synthesis.\n" +
        "- **Rough ER**: transport of proteins. **Smooth ER**: lipids, detoxification.\n" +
        "- **Lysosome**: intracellular digestion.\n" +
        "- **Cytoskeleton** (microtubules and filaments): keeps the **shape** of the cell and helps it move.\n" +
        "- **Vacuole**: stores cell sap and chemicals; in a plant cell one large central vacuole makes the cell swell and grow (enlarge).\n" +
        "- **Nucleus**: control centre, holds the DNA.",
      table: {
        columns: ["Organelle", "Job"],
        rows: [
          {
            cells: ["Mitochondria", "Respiration and ATP formation"],
            noteAmber: "In all three CDS match items (2017 (II), 2023 (II), 2026 (I)) mitochondria go with respiration or ATP.",
            pyqExampleId: "f52d02a0-5f16-42d9-af59-4290b1e071b7",
          },
          { cells: ["Chloroplast", "Photosynthesis"] },
          { cells: ["Ribosome", "Protein synthesis"] },
          { cells: ["Lysosome", "Intracellular digestion"] },
          {
            cells: ["Cytoskeleton", "Keeps the shape of the cell"],
            noteAmber: "CDS 2026 (I): cytoskeleton with cell shape, smooth ER with detoxification in liver cells, vacuoles with storage and cell enlargement.",
            pyqExampleId: "9422715e-31b2-48ed-8105-73af15f1c727",
          },
          { cells: ["Vacuole", "Storage of sap and chemicals; enlarges the plant cell"] },
        ],
      },
      pyqExampleId: "df15143a-e3d0-471e-84e6-3bd17f9deda7",
      selfCheckExample: {
        prompt: "A cell has many chloroplasts and one large central vacuole. Is it from a leaf or from the liver, and which clue settles it fastest?",
        steps: [
          "Chloroplasts carry out photosynthesis and occur only in plant cells.",
          "A single large central vacuole is also a mark of a plant cell.",
        ],
        answer: "A leaf cell; the chloroplasts alone settle it.",
      },
      practiceSet: [
        { prompt: "Which structure of microtubules and filaments keeps the shape of an animal cell?", answer: "The cytoskeleton" },
        { prompt: "What does the large central vacuole of a plant cell store?", answer: "Cell sap (water, salts, sugars and other chemicals)" },
        { prompt: "Which organelle is the control centre of the cell?", answer: "The nucleus" },
        { prompt: "Does an animal cell or a plant cell usually have one large central vacuole?", answer: "A plant cell" },
      ],
      traps: [
        {
          title: "Ribosome makes; rough ER carries",
          body: "Options love to swap these two. **Ribosomes** synthesise protein; the **rough ER** they sit on transports it. Likewise mitochondria (respiration) and chloroplasts (photosynthesis) are swapped in the wrong codes.",
        },
        {
          title: "Fix one sure pair first",
          body: "Do not try to match all four at once. Mitochondria with respiration usually removes two of the four codes immediately; one more sure pair leaves only the answer.",
        },
      ],
    },
  ],
};
