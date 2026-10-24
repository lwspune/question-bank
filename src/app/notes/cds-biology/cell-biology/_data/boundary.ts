import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_CE_BOUNDARY_NOTE: SubtopicNote = {
  subtopicName: "Cell Wall, Membrane and Transport",
  title: "Cell Wall, Membrane and Transport",
  oneLineDefinition:
    "Which living things have a cell wall and what it is made of, how the cell membrane is built, and how substances cross it: diffusion, osmosis and active transport.",
  whyItMatters:
    "Eleven CDS questions from 2017 (II) to 2026 (II). Three ask which cell has no cell wall (always the animal: 2019 (II), 2021 (I), 2023 (II)), two ask how the membrane is built, and five are about crossing it, from osmosis to active transport.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbice-wall",
      name: "The cell wall: who has one and what it is made of",
      intuition:
        "A cell wall is a stiff layer outside the cell membrane. It gives the cell a fixed shape and stops it bursting when water rushes in. Plants, fungi and bacteria all have one, each made of a different material. Animal cells have no wall at all, only the soft membrane, which is why an animal cell can change its shape.",
      definition:
        "Cell walls:\n" +
        "- **Plants**: **cellulose**.\n" +
        "- **Fungi** (mushrooms, yeast): **chitin**.\n" +
        "- **Bacteria**: **peptidoglycan**. The antibiotic **penicillin** stops bacteria building this wall, so it kills them without harming human cells.\n" +
        "- **Diatoms**: a glassy wall of **silica**.\n" +
        "- **Animals** (including humans and worms such as the tapeworm): **no cell wall**, only the cell membrane.",
      table: {
        columns: ["Living thing", "Cell wall made of"],
        rows: [
          { cells: ["Plants", "Cellulose"] },
          { cells: ["Fungi, such as mushrooms", "Chitin"] },
          {
            cells: ["Bacteria", "Peptidoglycan"],
            noteAmber: "CDS 2026 (I): penicillin spares human cells because it targets the bacterial cell wall.",
            pyqExampleId: "ba35b0c1-5359-4d79-aa19-0bafd6338d91",
          },
          { cells: ["Diatoms", "Silica"] },
          {
            cells: ["Animals, including humans", "No cell wall"],
            noteAmber: "Asked three times: CDS 2019 (II), 2021 (I) and 2023 (II). The organism without a wall is always the animal.",
            pyqExampleId: "5f3cae8d-d4ed-4874-af9e-4c05b02b6517",
          },
        ],
      },
      pyqExampleId: "2885d8d4-3f4c-4634-86a3-df1e0ad8550d",
      selfCheckExample: {
        prompt: "An amoeba can push out its body to engulf food, but a cell in a leaf keeps the same box-like shape. What difference between the two cells explains this?",
        steps: [
          "A leaf cell has a stiff cellulose wall outside its membrane, which fixes its shape.",
          "An amoeba has only a soft, flexible cell membrane, so it can change its shape.",
        ],
        answer: "The leaf cell has a rigid cell wall; the amoeba has none.",
      },
      practiceSet: [
        { prompt: "What is the cell wall of a fungus made of?", answer: "Chitin" },
        { prompt: "What is the main substance of a plant cell wall?", answer: "Cellulose" },
        { prompt: "What is the cell wall of a bacterium made of?", answer: "Peptidoglycan" },
        { prompt: "Which substance makes the glassy wall of a diatom?", answer: "Silica" },
      ],
      traps: [
        {
          title: "Fungi and bacteria do have walls",
          body: "A mushroom (a fungus) has a **chitin** wall and a bacterium a **peptidoglycan** wall. Only **animal** cells, human or tapeworm, have none.",
        },
        {
          title: "Not every wall is cellulose",
          body: "**Cellulose** is the **plant** wall. Fungi use chitin and bacteria peptidoglycan, which is why penicillin harms bacteria and not plants or people.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-membrane",
      name: "The cell membrane",
      intuition:
        "Every cell, plant or animal, is wrapped in a thin, soft membrane. It is made of two layers of fat-like phospholipid molecules, with proteins floating in it like tiles in a mosaic. It lets some things through and keeps others out. Because it is flexible, a cell like an amoeba can fold it around food and swallow it.",
      definition:
        "The plasma membrane:\n" +
        "- A **bilayer of phospholipids** with **proteins** embedded in it, and **cholesterol** among the lipids in animal cells. This picture is the **fluid mosaic model**.\n" +
        "- It is **selectively permeable** (semi-permeable): water and small gases such as **oxygen and carbon dioxide** pass easily; many other substances need carriers.\n" +
        "- It is **flexible**, so a cell can engulf food or particles by folding it inwards (**endocytosis**), as an amoeba does.\n" +
        "- It is not made of cellulose: that is the cell wall, outside it in plants.",
      table: {
        columns: ["Statement about the cell membrane", "True or false"],
        rows: [
          {
            cells: ["It is a phospholipid bilayer with proteins and cholesterol in it", "True"],
            noteAmber: "CDS 2022 (II): the bilayer is of phospholipid, not of protein or neutral lipid.",
            pyqExampleId: "9f713d73-e7f1-4b75-8c9a-8838a0942884",
          },
          {
            cells: ["It is flexible and lets the cell engulf material", "True"],
            noteAmber: "CDS 2022 (I): this is the correct statement; the other three are false.",
            pyqExampleId: "189a247d-27e0-4539-b6f3-69c9339ec67c",
          },
          { cells: ["It is made of cellulose", "False: that is the plant cell wall"] },
          { cells: ["It lets every substance through", "False: it is selectively permeable"] },
          { cells: ["It stops oxygen and carbon dioxide", "False: these gases diffuse through it"] },
        ],
      },
      pyqExampleId: "9f713d73-e7f1-4b75-8c9a-8838a0942884",
      selfCheckExample: {
        prompt: "Oxygen enters a cell without any carrier protein and without using energy. Which property of the cell membrane allows this?",
        steps: [
          "Oxygen is a small molecule that slips through the lipid bilayer.",
          "It moves from where it is more concentrated (outside) to where it is less (inside), which needs no energy.",
        ],
        answer: "The membrane is selectively permeable and lets small gases diffuse straight through.",
      },
      practiceSet: [
        { prompt: "What is the name of the model that describes the structure of the cell membrane?", answer: "The fluid mosaic model" },
        { prompt: "What is it called when a cell takes in material by folding its membrane around it?", answer: "Endocytosis" },
        { prompt: "Name a single-celled organism that engulfs its food using its flexible membrane.", answer: "Amoeba" },
        { prompt: "Is the cell membrane fully permeable, selectively permeable or impermeable?", answer: "Selectively permeable" },
      ],
      traps: [
        {
          title: "A bilayer of lipid, not of protein",
          body: "The two layers are **phospholipid**. Proteins sit **in** the bilayer; they do not form it. An option calling it a protein bilayer, or a neutral-lipid bilayer without proteins, is wrong.",
        },
        {
          title: "Membrane and wall are different layers",
          body: "The **membrane** is in every cell and is made of lipid and protein. The **cell wall** is outside it, only in plants, fungi and bacteria, and is the part made of cellulose (in plants).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-transport",
      name: "Diffusion, osmosis and active transport",
      intuition:
        "Things on their own spread from where there is more of them to where there is less: that is diffusion, and it costs nothing. Osmosis is the same thing for water, through a membrane that lets water pass but holds back the dissolved substance. To push something the other way, from less to more, the cell has to spend energy from respiration: that is active transport.",
      definition:
        "Moving across the membrane:\n" +
        "- **Diffusion**: from **higher to lower** concentration. No energy needed.\n" +
        "- **Osmosis**: water moves from its **higher concentration** (a dilute solution) to its **lower concentration** (a strong solution) through a **semi-permeable membrane**.\n" +
        "- **Facilitated diffusion**: down the gradient through a **protein channel or carrier**, still with **no energy**. Na⁺ and Cl⁻ ions crossing through protein channels is an example.\n" +
        "- **Active transport**: **against** the gradient, using **energy (ATP) from respiration**. Examples: reabsorbing glucose and amino acids in the kidney, loading sugar into phloem, absorbing glucose from the gut.\n" +
        "- **Tonicity**: in an **isotonic** solution (same strength as the cell, like normal saline for red cells) nothing changes; in a **hypotonic** one (weaker, like pure water) the cell swells and may burst; in a **hypertonic** one (stronger) it shrinks.\n" +
        "- **Reverse osmosis**: a pressure **greater than the osmotic pressure** is put on salt water, forcing pure water out through the membrane. This is how sea water is made drinkable.",
      table: {
        columns: ["Process", "Direction", "Energy used", "Example"],
        rows: [
          { cells: ["Diffusion", "High to low concentration", "None", "Oxygen entering a cell"] },
          {
            cells: ["Osmosis", "Water, through a semi-permeable membrane, from dilute to strong solution", "None", "Root hairs taking in water"],
            noteAmber: "CDS 2021 (I): the membrane is semi-permeable, not fully permeable and not the cell wall.",
            pyqExampleId: "23f57f43-6574-41fb-9f12-36df84950d7b",
          },
          {
            cells: ["Facilitated diffusion", "High to low, through a protein channel", "None", "Na⁺ and Cl⁻ through protein channels"],
            noteAmber: "CDS 2026 (II): this is the one process in the list that is not active transport.",
            pyqExampleId: "4794133e-e454-4eab-882b-32239d8cd00a",
          },
          { cells: ["Active transport", "Low to high concentration", "ATP from respiration", "Glucose reabsorbed in the kidney"] },
          {
            cells: ["Reverse osmosis", "Water forced out of a strong solution", "Pressure above the osmotic pressure", "Desalination of sea water"],
            noteAmber: "CDS 2017 (II): the pressure applied is larger than the osmotic pressure.",
            pyqExampleId: "479c2cdd-36d7-412f-acf1-a8ec7c73bad2",
          },
        ],
      },
      pyqExampleId: "cbc254d9-dd6a-4cec-9e1d-c72758ea8dcc",
      selfCheckExample: {
        prompt: "Dry raisins are left in a bowl of plain water and swell up. Explain why.",
        steps: [
          "The inside of a raisin is a strong sugar solution; the water outside is pure.",
          "Water moves by osmosis from its higher concentration (outside) to its lower concentration (inside), through the raisin's skin and cell membranes.",
        ],
        answer: "Water enters the raisins by osmosis, so they swell.",
      },
      practiceSet: [
        { prompt: "What happens to red blood cells placed in pure water?", answer: "They swell and may burst" },
        { prompt: "What happens to red blood cells placed in a hypertonic (strong) salt solution?", answer: "They shrink" },
        { prompt: "Does facilitated diffusion through a protein channel use energy?", answer: "No" },
        { prompt: "What is reverse osmosis used for on a large scale?", answer: "Desalination: making sea water drinkable" },
      ],
      traps: [
        {
          title: "Active transport runs on respiration",
          body: "Active transport moves a substance **against** the gradient using **ATP from respiration**. 'Without energy', 'energy from photosynthesis' or 'along the gradient' are the wrong versions.",
        },
        {
          title: "A protein channel is not active transport",
          body: "Ions flowing **down** their gradient through a protein channel is **facilitated diffusion** and uses no energy. Kidney reabsorption, loading phloem and taking glucose from the gut all pump against the gradient.",
        },
        {
          title: "Isotonic means no change",
          body: "In an **isotonic** solution such as normal saline the water moving in equals the water moving out, so red cells neither swell nor shrink.",
        },
      ],
    },
  ],
};
