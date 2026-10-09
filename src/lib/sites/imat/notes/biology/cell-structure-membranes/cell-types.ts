import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_CELL_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Cell Types Compared",
  title: "Prokaryotes, Eukaryotes, Plant and Animal Cells, and Viruses",
  oneLineDefinition:
    "Prokaryotes lack a nucleus and membrane-bound organelles; plant and animal cells differ in walls, chloroplasts and vacuoles; viruses are not cells at all.",
  whyItMatters:
    "The 2024 ministry paper asked which organisms have internal compartments. The older papers used tables of features, asking which belong to a bacterium, a plant cell or an animal cell, and which are shared by all of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-csm-prokaryote-eukaryote",
      name: "Prokaryotic and eukaryotic cells compared",
      intuition:
        "A prokaryotic cell is a single open room: DNA, ribosomes and enzymes all share one space. A eukaryotic cell is a house with many rooms, each sealed by membranes, so different jobs can run side by side without getting in each other's way. That division into compartments is the defining feature of eukaryotes.",
      definition:
        "**Prokaryotes** (bacteria and archaea) have no nucleus and no membrane-bound organelles. **Eukaryotes** (protists, fungi, plants, animals) have a nucleus and membrane-bound organelles: this internal **compartmentalisation** is the key difference.\n" +
        "- Shared by both: plasma membrane, cytoplasm, ribosomes, DNA as the genetic material, ATP. Both can store glycogen (bacteria and animals do).\n" +
        "- In a prokaryote the single circular chromosome lies in a region of the cytoplasm called the **nucleoid**. Many also carry **plasmids**, small extra rings of DNA that often carry antibiotic resistance genes.\n" +
        "- Eukaryotes also contain circular DNA, inside their mitochondria and chloroplasts.\n" +
        "- A eukaryotic cell can still be recognised in metaphase, when the nucleus has broken down, by its membrane-bound organelles such as mitochondria.",
      table: {
        columns: ["Feature", "Prokaryotic cell", "Eukaryotic cell"],
        rows: [
          { cells: ["Examples", "Bacteria and archaea", "Protists, fungi, plants, animals"] },
          { cells: ["Typical size", "About 1 to 5 µm", "About 10 to 100 µm"] },
          { cells: ["DNA", "One circular chromosome in the nucleoid, often plasmids", "Linear chromosomes with histones in a nucleus, plus circular DNA in mitochondria and chloroplasts"] },
          { cells: ["Membrane-bound organelles", "None", "Nucleus, mitochondria, ER, Golgi, lysosomes and others"] },
          { cells: ["Ribosomes", "70S", "80S in the cytoplasm; 70S in mitochondria and chloroplasts"] },
          { cells: ["Cell wall", "Usually present; peptidoglycan in bacteria", "In plants (cellulose) and fungi (chitin); none in animals"] },
          { cells: ["Cell division", "Binary fission", "Mitosis and meiosis"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which of these statements are true of BOTH prokaryotic cells and eukaryotic animal cells? 1. They contain ribosomes. 2. Their chromosomal DNA is enclosed by a nuclear envelope. 3. They can contain circular DNA.",
        options: [
          "1 only",
          "1 and 2 only",
          "1 and 3 only",
          "2 and 3 only",
          "1, 2 and 3",
        ],
        steps: [
          "1 is true: every cell has ribosomes (70S or 80S).",
          "2 is false for prokaryotes, which have no nucleus.",
          "3 is true: prokaryotes have a circular chromosome, and animal cells have circular DNA in their mitochondria. So the answer is 1 and 3.",
          "B is the common slip of thinking all cells have a nucleus; A forgets mitochondrial DNA.",
        ],
        answer: "(C) 1 and 3 only",
      },
      practiceSet: [
        { prompt: "What is the region holding a bacterium's chromosome called?", answer: "The nucleoid" },
        { prompt: "Name a structure that shows a cell is eukaryotic even in metaphase, when no nucleus is visible.", answer: "Mitochondria (or any membrane-bound organelle such as the Golgi)", method: "Ribosomes and DNA are in prokaryotes too" },
        { prompt: "Which type of cell has 70S ribosomes in its cytoplasm?", answer: "Prokaryotic" },
      ],
      traps: [
        {
          title: "Circular DNA and ribosomes do not prove a cell is prokaryotic",
          body: "Human cells contain circular DNA in their mitochondria, and every cell has ribosomes. To show a cell is eukaryotic, point to a membrane-bound organelle. To show it is prokaryotic, point to the absence of a nucleus, 70S ribosomes in the cytoplasm or a peptidoglycan wall.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-plant-animal",
      name: "Plant and animal cells compared",
      intuition:
        "Plant and animal cells share almost all their organelles, because both are eukaryotic. The differences follow from how a plant lives: it stands still, makes its own food from light, and holds itself up with water pressure inside a stiff wall.",
      definition:
        "Both have a nucleus, mitochondria, ER, Golgi, ribosomes, plasma membrane, cytoskeleton and peroxisomes.\n" +
        "- Only plants (green cells) have **chloroplasts**; all plant cells have mitochondria.\n" +
        "- Plants have a **cellulose cell wall**, a **large central vacuole**, and store **starch**. Animals store **glycogen**.\n" +
        "- Animal cells have **centrioles**; most flowering plant cells do not.\n" +
        "- In plants the vacuole does much of the digestive work that lysosomes do in animal cells.\n" +
        "- Cytokinesis: an animal cell is pinched in two by a ring of actin; a plant cell builds a **cell plate** from Golgi vesicles between the two new nuclei.",
      table: {
        columns: ["Feature", "Plant cell", "Animal cell"],
        rows: [
          { cells: ["Cell wall", "Cellulose wall outside the membrane", "None"] },
          { cells: ["Chloroplasts", "In green, photosynthetic cells", "None"] },
          { cells: ["Vacuole", "One large permanent central vacuole", "Small, temporary vacuoles, if any"] },
          { cells: ["Centrioles", "Absent in most flowering plants", "A pair in the centrosome"] },
          { cells: ["Storage carbohydrate", "Starch", "Glycogen"] },
          { cells: ["Shape", "Fixed, often box-like", "Variable, often rounded"] },
          { cells: ["Cytokinesis", "Cell plate", "Cleavage furrow"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A cell has mitochondria, a pair of centrioles and granules of glycogen, but no cell wall. Which cell is it most likely to be?",
        options: [
          "A root hair cell",
          "A leaf palisade cell",
          "A yeast cell",
          "A bacterium",
          "A liver cell",
        ],
        steps: [
          "No wall, centrioles and glycogen all point to an animal cell: E.",
          "Plant cells (A, B) have cellulose walls and store starch. Yeast (C) is a fungus with a wall. Bacteria (D) have no mitochondria and no centrioles.",
        ],
        answer: "(E) A liver cell",
      },
      practiceSet: [
        { prompt: "What is the storage carbohydrate of plant cells?", answer: "Starch" },
        { prompt: "Do plant cells contain mitochondria?", answer: "Yes", method: "Every plant cell respires" },
        { prompt: "What forms the cell plate during plant cell division?", answer: "Vesicles from the Golgi apparatus" },
      ],
      traps: [
        {
          title: "Plant cells respire too",
          body: "Plant cells have mitochondria as well as chloroplasts, and respire day and night. Only cells with chloroplasts photosynthesise; roots and other non-green parts only respire. An option saying all plant cells photosynthesise, or that plant cells lack mitochondria, is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-viruses",
      name: "Viruses: structure and why they are not cells",
      intuition:
        "A virus is a set of instructions in a protective case. It has no machinery of its own: no ribosomes, no enzymes for making energy, no cytoplasm. Outside a cell it does nothing at all. Inside one, it takes over the cell's machinery to make copies of itself.",
      definition:
        "A **virus** is a particle of **nucleic acid** inside a **protein coat** (the **capsid**). Most are 20 to 300 nm across.\n" +
        "- Its genome is DNA **or** RNA, never both; it may be single- or double-stranded.\n" +
        "- Some viruses (HIV, influenza) have an **envelope**: a phospholipid membrane taken from the host cell as they leave, studded with viral glycoproteins.\n" +
        "- **Retroviruses** such as HIV carry **reverse transcriptase**, which copies their RNA into DNA.\n" +
        "- Viruses are not cells: no cytoplasm, no ribosomes, no metabolism. They reproduce only inside a living host cell (**obligate intracellular parasites**). They are not prokaryotes.\n" +
        "- Viruses that infect bacteria are **bacteriophages**.\n" +
        "- Antibiotics do not work on viruses, because they target bacterial walls, ribosomes and enzymes that viruses do not have.",
      table: {
        columns: ["Part", "Made of", "Note"],
        rows: [
          { cells: ["Genome", "DNA or RNA", "HIV and influenza use RNA; herpes viruses use DNA"] },
          { cells: ["Capsid", "Protein subunits", "Protects the genome; helical or many-sided shapes"] },
          { cells: ["Envelope (some viruses)", "Host phospholipid bilayer with viral glycoproteins", "Present in HIV and influenza; absent in bacteriophages"] },
          { cells: ["Enzymes (some viruses)", "Proteins such as reverse transcriptase", "Carried in the particle, used once inside the host"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about viruses is correct?",
        options: [
          "They contain 70S ribosomes.",
          "A single virus particle contains both DNA and RNA as its genome.",
          "They are killed by penicillin.",
          "They can reproduce only inside a living host cell.",
          "They are larger than most bacteria.",
        ],
        steps: [
          "Viruses have no ribosomes or metabolism of their own, so they can multiply only inside a host cell: D.",
          "A confuses viruses with bacteria. A virus genome is DNA or RNA, not both (B). Penicillin acts on peptidoglycan walls, which viruses lack (C). Most viruses are tens of times smaller than a bacterium (E).",
        ],
        answer: "(D) They can reproduce only inside a living host cell.",
      },
      practiceSet: [
        { prompt: "What is the protein coat of a virus called?", answer: "The capsid" },
        { prompt: "Where does the envelope of an enveloped virus come from?", answer: "The membrane of the host cell it left" },
        { prompt: "Why do antibiotics not cure viral infections?", answer: "Viruses lack the walls, ribosomes and enzymes that antibiotics target" },
      ],
      traps: [
        {
          title: "Viruses are not prokaryotes",
          body: "Prokaryotes are cells: they have a membrane, cytoplasm and ribosomes. Viruses have none of these, so they are not prokaryotes and not cells. They have no internal compartments either, so an option linking compartmentalisation to viruses is wrong.",
        },
      ],
    },
  ],
};
