import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CB_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Cell Structure",
  title: "Cell Structure",
  oneLineDefinition:
    "Every living thing is made of cells, and each cell has a membrane around it, cytoplasm inside it and small parts called organelles that each do one job.",
  whyItMatters:
    "Six questions in the bank, five of them EASY: how a large animal begins life, what a potato peel is made of, the feature that tells a plant cell from an animal cell, what the cell membrane is made of and what it does, and the suicidal bag of the cell. Each is one fact about a cell part.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spicbst-unit",
      name: "The cell as the unit of life, plant and animal cells",
      intuition:
        "The cell is the smallest unit that is alive. An elephant and a bacterium both start as one cell; the elephant's single cell, the zygote, divides again and again. " +
        "Plant and animal cells share most parts. The parts only one of them has are the ones that tell them apart.",
      definition:
        "- Robert Hooke first saw cells in 1665, in a thin slice of **cork**.\n" +
        "- Every organism, however large, begins life as a **single cell**, the **zygote**.\n" +
        "- **Unicellular** organisms (Amoeba, Paramecium, bacteria) are one cell; **multicellular** ones (plants, animals) are many.\n" +
        "- Both plant and animal cells have a **cell membrane**, **cytoplasm**, a **nucleus** and **mitochondria**.\n" +
        "- Only plant cells have a **cell wall** (made of cellulose) and **chloroplasts**, and they have one large **vacuole**.\n" +
        "- Animal cells have **centrosomes** and only small vacuoles, if any.",
      table: {
        columns: ["Part", "Plant cell", "Animal cell"],
        rows: [
          {
            cells: ["Cell wall", "Present (cellulose)", "Absent"],
            noteAmber: "The cell wall is the surest feature that tells a plant cell from an animal cell.",
          },
          { cells: ["Chloroplasts", "Present in green parts", "Absent"] },
          { cells: ["Vacuole", "One large central vacuole", "Small or none"] },
          { cells: ["Centrosome", "Absent", "Present"] },
          { cells: ["Cell membrane, nucleus, mitochondria", "Present", "Present"] },
        ],
        caption: "A part that both cells have cannot tell them apart.",
      },
      selfCheckExample: {
        prompt: "Which of these is found in an animal cell but not in a plant cell: cell wall, chloroplast, centrosome, nucleus?",
        steps: [
          "Cell wall and chloroplast belong to plant cells only.",
          "The nucleus is in both.",
          "The centrosome is in animal cells only.",
        ],
        answer: "Centrosome",
      },
      practiceSet: [
        { prompt: "Who first saw cells, in a slice of cork?", answer: "Robert Hooke" },
        { prompt: "What is the cell wall of a plant cell made of?", answer: "Cellulose" },
        { prompt: "Name a unicellular organism.", answer: "Amoeba (or Paramecium, or a bacterium)" },
        { prompt: "Which part of a plant cell carries out photosynthesis?", answer: "The chloroplast" },
        { prompt: "What is the single cell called that forms when a sperm and an egg fuse?", answer: "The zygote" },
      ],
      pyqExampleId: "73dbe68b-177a-4207-a529-9de56588b3bb",
      traps: [
        {
          title: "Picking a part both cells share",
          body:
            "Mitochondria, a nucleus and a cell membrane are in plant and animal cells alike, so none of them can tell the two apart. Look for the cell wall, chloroplasts or a large vacuole.",
        },
        {
          title: "Thinking a big animal starts as many cells",
          body: "Every organism, an elephant or a whale included, begins as one cell, the zygote. The many cells come later, by division.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicbst-membrane",
      name: "The cell membrane",
      intuition:
        "The cell membrane is a thin, flexible skin around the cell. It decides what may come in and what may go out, like a gatekeeper who checks both doors.",
      definition:
        "- Also called the **plasma membrane**.\n" +
        "- Made mainly of **lipids and proteins** (a double layer of lipid with proteins in it).\n" +
        "- It is **selectively permeable**: it lets some substances pass and stops others.\n" +
        "- It controls **both the entry and the exit** of materials.\n" +
        "- In a plant cell it lies just inside the cell wall. The cell wall is **freely permeable**; the membrane is not.",
      table: {
        columns: ["Feature", "Cell membrane", "Cell wall"],
        rows: [
          { cells: ["Found in", "All cells", "Plant cells (also fungi and bacteria)"] },
          { cells: ["Made of", "Lipids and proteins", "Cellulose (in plants)"] },
          {
            cells: ["Lets substances through", "Selectively: it controls entry and exit", "Freely"],
            noteAmber: "The membrane controls traffic both ways, not just one way.",
          },
          { cells: ["Nature", "Thin, flexible, living", "Rigid, gives shape and support"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the two, the cell wall or the cell membrane, is selectively permeable?",
        steps: ["The cell wall lets almost everything through.", "The cell membrane chooses what passes."],
        answer: "The cell membrane",
      },
      practiceSet: [
        { prompt: "What is another name for the cell membrane?", answer: "The plasma membrane" },
        { prompt: "What does selectively permeable mean?", answer: "It lets some substances pass and stops others" },
        { prompt: "Which outer layer of a plant cell is rigid and made of cellulose?", answer: "The cell wall" },
      ],
      pyqExampleId: "0422c5d0-376c-47b9-879c-66c97fa4bddc",
      traps: [
        {
          title: "Only entry, or only exit",
          body: "The cell membrane controls materials going in and coming out. An option that says it controls only one direction is wrong.",
        },
        {
          title: "Carbohydrates as the main material",
          body:
            "The membrane has a few short sugar chains on its surface, but it is made mainly of lipids and proteins. Nucleic acids (DNA, RNA) are in the nucleus, not the membrane.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicbst-organelles",
      name: "Cell organelles and their jobs",
      intuition:
        "Organelles are the small working parts inside a cell, each with one job. The questions name a job or a nickname and ask for the organelle.",
      definition:
        "- **Nucleus**: holds the chromosomes (DNA) and controls the cell.\n" +
        "- **Mitochondria**: release energy from food: the **powerhouse** of the cell.\n" +
        "- **Ribosomes**: make proteins.\n" +
        "- **Lysosomes**: bags of digestive enzymes. When the cell is damaged they burst and digest it: the **suicidal bags**.\n" +
        "- **Golgi apparatus**: packs and sends out materials.\n" +
        "- **Endoplasmic reticulum**: a network of channels that carries materials.\n" +
        "- **Plastids** (chloroplasts): photosynthesis, in plant cells.\n" +
        "- **Vacuoles**: store water, food and waste.",
      table: {
        columns: ["Organelle", "Job", "Nickname"],
        rows: [
          { cells: ["Nucleus", "Controls the cell, holds DNA", "Control centre"] },
          { cells: ["Mitochondria", "Release energy", "Powerhouse of the cell"] },
          {
            cells: ["Lysosome", "Digests worn out parts and germs", "Suicidal bag"],
            noteAmber: "Lysosomes, not vacuoles, are the suicidal bags.",
          },
          { cells: ["Ribosome", "Makes proteins", "Protein factory"] },
          { cells: ["Chloroplast", "Photosynthesis", "Kitchen of the cell"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong row: (a) mitochondria: powerhouse (b) ribosome: makes proteins (c) nucleus: makes food by photosynthesis (d) chloroplast: photosynthesis",
        steps: [
          "Mitochondria are the powerhouse, ribosomes make proteins and chloroplasts do photosynthesis: all right.",
          "The nucleus controls the cell. It makes no food.",
        ],
        answer: "(c) is wrong: the nucleus controls the cell; chloroplasts make the food.",
      },
      practiceSet: [
        { prompt: "Which organelle is called the powerhouse of the cell?", answer: "Mitochondria" },
        { prompt: "Which organelle makes proteins?", answer: "The ribosome" },
        { prompt: "Which part of the cell holds the chromosomes?", answer: "The nucleus" },
        { prompt: "Which organelle packs and sends out materials made in the cell?", answer: "The Golgi apparatus" },
      ],
      pyqExampleId: "8e5831f2-adc5-4dd8-874f-1dca5cd5fcc1",
      traps: [
        {
          title: "A vacuole as the suicidal bag",
          body: "A vacuole is a store of water and waste. The suicidal bag is the lysosome, because its enzymes digest the cell itself when the cell is damaged.",
        },
      ],
    },
  ],
};
