import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BCB_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Cell Structure and Organelles",
  title: "Cell Structure and Organelles",
  oneLineDefinition:
    "The cell wall and membrane with the people who studied them, each organelle and its job, and how prokaryotic cells such as bacteria differ from eukaryotic ones.",
  whyItMatters:
    "Twenty-five questions in the bank: 12 from the 2023 shifts, nine from the 2024 shifts and four from the 2025 shifts. Most name an organelle and ask its job, or the reverse, so the organelle table answers the bulk of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbcbst-membrane",
      name: "Cell wall, membrane and early discoveries",
      intuition:
        "Every cell has a membrane; plant cells add a stiff wall outside it. SSC also asks who first saw cells and who worked out that the membrane has two layers.",
      definition:
        "The covers:\n" +
        "- The **cell wall** is found in **plant cells only** (among plants and animals) and is their **outermost** cover. It is made mainly of **cellulose**; **pectin** cements cells together in the **middle lamella**.\n" +
        "- The **plasma membrane** is a **phospholipid bilayer** with proteins in it. It is **selectively permeable**; water diffuses from **higher to lower** concentration.\n\n" +
        "Discoveries:\n" +
        "- **Robert Hooke** described cells in 1665.\n" +
        "- **Anton van Leeuwenhoek** saw living single-celled organisms in **1674**.\n" +
        "- **Gorter and Grendel** (**1925**) spread red-cell lipids into a layer twice the cell's area and concluded the membrane is a **bilayer**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Only in plant cells", "Cell wall"], pyqExampleId: "0b761b0b-496e-43a5-8b70-b5fc329dff80" },
          { cells: ["Middle lamella", "Pectin"], pyqExampleId: "707aa82d-e6e7-40cf-ad26-4db472fb9e5b" },
          { cells: ["Membrane is", "Selectively permeable"], pyqExampleId: "62475551-86a9-4449-94a1-30607d6ccb17" },
          { cells: ["Lipid bilayer, 1925", "Gorter and Grendel"], pyqExampleId: "803b5a97-366e-4e07-9ed0-bd7a387cd544" },
          { cells: ["Single-celled life, 1674", "Leeuwenhoek"], pyqExampleId: "ea70c635-e6e4-4a84-b72d-5b2fbf7913b0" },
        ],
      },
      pyqExampleId: "4e00ad0b-cc79-4fb3-923e-60f7664123fa",
      selfCheckExample: {
        prompt: "A statement says water crosses the cell membrane from lower to higher concentration by diffusion. Is it right?",
        steps: ["Diffusion always runs down a gradient.", "So water moves from its higher concentration to its lower one."],
        answer: "No: from higher to lower concentration.",
      },
      practiceSet: [
        { prompt: "What is the outermost cover of a plant cell?", answer: "The cell wall" },
        { prompt: "What is the plant cell wall mainly made of?", answer: "Cellulose" },
        { prompt: "Who first described cells, in 1665?", answer: "Robert Hooke" },
      ],
      traps: [
        {
          title: "The nucleolus is not plant-only",
          body: "Of membrane, nucleolus, mitochondria and wall, only the **cell wall** is unique to plant cells. The other three are in animal cells too.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbcbst-organelles",
      name: "Organelles and their jobs",
      intuition:
        "Each organelle has one job SSC pairs it with, often by a nickname. Learn the pairs and the nicknames, and watch for the pair that is swapped.",
      definition:
        "The organelles:\n" +
        "- **Ribosome**: the **protein factory**; made of **rRNA and protein**, with no membrane.\n" +
        "- **Mitochondrion**: the **powerhouse**; makes ATP; folded inner membrane (cristae).\n" +
        "- **Golgi apparatus**: **modifies and packages** proteins; first seen by **Camillo Golgi** (1898).\n" +
        "- **Lysosome**: **intracellular digestion**; the **suicidal bag**.\n" +
        "- **Peroxisome**: oxidation reactions that make **hydrogen peroxide**.\n" +
        "- **Smooth ER**: **lipid** synthesis. The **nucleus** holds the DNA and controls the cell.\n" +
        "- **Cytoskeleton**: the protein network that supports every eukaryotic cell.\n" +
        "- **Plastids**: chloroplasts (green, with grana); leucoplasts are colourless: amyloplasts store starch, proteinoplasts protein, **elaioplasts oils** (found in the tapetum of pollen sacs).\n\n" +
        "Animal cells have ribosomes, mitochondria and lysosomes; fungi have **no chloroplasts**.",
      table: {
        columns: ["Organelle", "Job"],
        rows: [
          { cells: ["Golgi apparatus", "Modifies and packages proteins"], pyqExampleId: "84bc0cbb-3a10-4725-95f8-31ff1bb1a67f" },
          { cells: ["Lysosome", "Intracellular digestion"], pyqExampleId: "9a1b3ff1-a827-403a-b7ab-2e2a1f57c785" },
          { cells: ["Peroxisome", "Makes hydrogen peroxide"], pyqExampleId: "0ebb6ab3-197b-4c21-b1b2-b463777944fb" },
          { cells: ["Cytoskeleton", "Structural support"], pyqExampleId: "92111483-3b88-4869-9a8a-1de0dfe93caa" },
          { cells: ["Elaioplast", "Stores oil"], pyqExampleId: "6d17072a-7a74-4aee-86fd-7d7f4eb91c5f" },
          { cells: ["Nucleus", "Holds DNA, not lipid work"], pyqExampleId: "2bfffb9c-3159-4946-aad8-4f9bbdec5384" },
        ],
      },
      pyqExampleId: "6443c208-8e28-4dac-b318-23a0a29ae1af",
      selfCheckExample: {
        prompt: "Which organelle is called the suicidal bag, and why?",
        steps: ["Lysosomes hold digestive enzymes.", "If they burst, those enzymes digest the cell itself."],
        answer: "The lysosome, because its enzymes can digest the cell.",
      },
      practiceSet: [
        { prompt: "What is a ribosome made of?", answer: "Ribosomal RNA and protein" },
        { prompt: "Where in the cell are lipids made?", answer: "The smooth endoplasmic reticulum" },
        { prompt: "Which organelle is the powerhouse of the cell?", answer: "The mitochondrion" },
      ],
      traps: [
        {
          title: "Fungi have no chloroplasts",
          body: "A statement giving a **fungal** cell chloroplasts is false: fungi do not photosynthesise.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbcbst-prokaryotes",
      name: "Prokaryotic cells",
      intuition:
        "A prokaryote has no nucleus wrapped in a membrane and no membrane-bound organelles. Bacteria are the example SSC always uses.",
      definition:
        "Prokaryotes:\n" +
        "- **Bacteria** and blue-green algae; kingdom **Monera** in Whittaker's five kingdoms.\n" +
        "- No nuclear membrane and **no mitochondria**. Yeast, algae, fungi, Plasmodium and Leishmania are all eukaryotes.\n" +
        "- The bacterial **glycocalyx** is a loose **slime layer** or a thick, tough **capsule**.\n" +
        "- **PPLO** (mycoplasma) are the smallest living cells, about **0.1 micrometre**. A bacterium is 3 to 5 micrometres, a typical eukaryotic cell 10 to 20.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Kingdom of prokaryotes", "Monera"], pyqExampleId: "a128c2ed-de51-444e-ad8f-0b051da73e69" },
          { cells: ["Loose glycocalyx", "Slime layer"], pyqExampleId: "b478d111-ebfa-49a0-9b82-aeb29d35cdc9" },
          { cells: ["No mitochondria in", "Bacteria"], pyqExampleId: "c0138daf-3c4c-4d81-83c7-6e34f3810cf1" },
          { cells: ["Size of PPLO", "About 0.1 micrometre"], pyqExampleId: "cb5ab93e-ee19-4a06-847f-52163eaebccc" },
        ],
      },
      pyqExampleId: "d530bb0a-8dd1-498e-b4a9-77f654d2883c",
      selfCheckExample: {
        prompt: "Is yeast a prokaryote or a eukaryote? What is the deciding feature?",
        steps: ["Yeast is a fungus with a nucleus inside a membrane and with mitochondria.", "A membrane-bound nucleus makes it a eukaryote."],
        answer: "A eukaryote, because it has a membrane-bound nucleus.",
      },
      practiceSet: [
        { prompt: "What is a thick, tough glycocalyx called?", answer: "A capsule" },
        { prompt: "Which are the smallest known living cells?", answer: "PPLO (mycoplasma)" },
        { prompt: "Is Plasmodium a prokaryote?", answer: "No, it is a eukaryote" },
      ],
      traps: [
        {
          title: "Slime layer loose, capsule thick",
          body: "A **loose** glycocalyx is the **slime layer**; a thick, tough one is the **capsule**. Options offer the capsule for the loose one.",
        },
      ],
    },
  ],
};
