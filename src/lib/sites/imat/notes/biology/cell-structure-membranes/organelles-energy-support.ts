import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_ENERGY_SUPPORT_NOTE: SubtopicNote = {
  subtopicName: "Mitochondria, Plastids and Cytoskeleton",
  title: "Mitochondria, Chloroplasts, the Cytoskeleton and the Cell Wall",
  oneLineDefinition:
    "Mitochondria and chloroplasts handle energy and carry their own DNA; the cytoskeleton shapes and moves the cell; walls give plants, fungi and bacteria a rigid outer case.",
  whyItMatters:
    "The 2023, 2024 and 2025 ministry papers all asked about these structures: which have a double membrane, what the mitochondrial membranes are like, which organelles contain DNA, and what the cytoskeleton and centrioles are made of. The older papers asked which cells have the most mitochondria.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-csm-mitochondria-chloroplasts",
      name: "Mitochondria and chloroplasts: double membranes and their own DNA",
      intuition:
        "Mitochondria release energy from food; chloroplasts capture energy from light. Both look like bacteria living inside the cell, and that is very likely what they once were. They still have two membranes, their own small circular DNA and bacterial-sized ribosomes, and they divide by splitting in two.",
      definition:
        "Only three structures in a eukaryotic cell have a **double membrane**: the **nucleus**, **mitochondria** and **plastids** (chloroplasts, and the starch-storing amyloplasts of roots).\n" +
        "- **Mitochondrion**: a permeable outer membrane and a folded, highly selective **inner membrane** (folds called **cristae**) around the **matrix**. Aerobic respiration: the Krebs cycle runs in the matrix, and most ATP is made on the inner membrane.\n" +
        "- **Chloroplast**: outer and inner membranes around the **stroma**, plus a third internal system of **thylakoids**, stacked into **grana**. Light-dependent reactions on the thylakoids; sugar made in the stroma (Calvin cycle, enzyme RuBisCO). Starch grains are stored there.\n" +
        "- **Endosymbiotic theory**: both came from bacteria engulfed by an early eukaryote. Evidence: double membrane, circular DNA without histones, 70S ribosomes, division by binary fission.\n" +
        "- So DNA is found in the nucleus, mitochondria and chloroplasts, and nowhere else in the cell. Mitochondrial DNA is inherited from the mother.\n" +
        "- Cells with high energy demand have the most mitochondria: heart muscle, sperm (midpiece), kidney tubule and liver cells. Mature red blood cells have none.\n" +
        "- Plant cells have mitochondria as well as chloroplasts, and only their green cells have chloroplasts. A root cell respires but cannot photosynthesise.",
      table: {
        columns: ["Feature", "Mitochondrion", "Chloroplast"],
        rows: [
          { cells: ["Found in", "Almost all eukaryotic cells", "Green cells of plants and algae"] },
          { cells: ["Membranes", "Outer membrane plus a folded inner membrane (cristae)", "Outer and inner membrane, plus thylakoids stacked in grana"] },
          { cells: ["Fluid inside", "Matrix", "Stroma"] },
          { cells: ["Job", "Aerobic respiration, making most of the cell's ATP", "Photosynthesis, making sugar from \\(\\mathrm{CO_2}\\) and water"] },
          { cells: ["Own genetic system", "Circular DNA and 70S ribosomes", "Circular DNA and 70S ribosomes"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which observation supports the idea that mitochondria evolved from bacteria taken in by an ancestral eukaryotic cell?",
        options: [
          "They are surrounded by a single membrane.",
          "They contain circular DNA and 70S ribosomes.",
          "They form by budding from the Golgi apparatus.",
          "Their DNA is wound round histones like the DNA in the nucleus.",
          "They are found in prokaryotic cells as well as eukaryotic cells.",
        ],
        steps: [
          "Circular DNA and 70S ribosomes are bacterial features: B.",
          "Mitochondria have two membranes, not one (A). They divide by fission rather than forming from the Golgi (C). Their DNA lacks histones (D). Prokaryotes have no mitochondria (E).",
        ],
        answer: "(B) They contain circular DNA and 70S ribosomes.",
      },
      practiceSet: [
        { prompt: "Where in a mitochondrion is most ATP made?", answer: "On the inner membrane (the cristae)" },
        { prompt: "Name the three structures in a plant cell surrounded by two membranes.", answer: "Nucleus, mitochondria and plastids such as chloroplasts" },
        { prompt: "Which would have more mitochondria: a heart muscle cell or a cheek cell?", answer: "A heart muscle cell", method: "It works without rest and needs a constant ATP supply" },
        { prompt: "Does a cell in a potato tuber have chloroplasts?", answer: "No", method: "It stores starch in amyloplasts and respires" },
      ],
      traps: [
        {
          title: "Two membranes, not three",
          body: "A mitochondrion has an outer and an inner membrane, with an intermembrane space between them. The space is not a third membrane, and the outer membrane is a normal bilayer, not a monolayer. In a chloroplast the thylakoids are a separate internal system, not part of the envelope.",
        },
        {
          title: "Sugar units are in almost every organelle",
          body: "Nucleotides contain a sugar (ribose in RNA and ATP, deoxyribose in DNA). So any structure with DNA, RNA or ATP contains carbohydrate monomers: the nucleolus, mitochondria and chloroplasts all do, as do the glycoproteins of every membrane and the cellulose of the wall.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-cytoskeleton",
      name: "The cytoskeleton: microtubules, microfilaments and intermediate filaments",
      intuition:
        "The cytoplasm is not a loose soup. A network of protein fibres holds the cell's shape like tent poles and ropes, and also acts as rail tracks along which motor proteins drag vesicles and chromosomes. Different jobs use fibres of different thickness.",
      definition:
        "The **cytoskeleton** has three kinds of protein fibre:\n" +
        "- **Microfilaments**: the thinnest, made of **actin**. Cell shape, muscle contraction (with myosin), amoeboid movement, pinching an animal cell in two.\n" +
        "- **Intermediate filaments**: middle thickness, made of several proteins (keratin in skin, lamins in the nuclear lamina). Mechanical strength.\n" +
        "- **Microtubules**: the thickest, hollow tubes of **tubulin**. The mitotic spindle, tracks for vesicles, and the core of **centrioles**, **cilia** and **flagella**.\n" +
        "- **Motor proteins** walk along the fibres: myosin on actin, kinesin and dynein on microtubules. They are not fibres themselves.\n" +
        "- A **centriole** is a ring of nine triplets of microtubules. Animal cells have a pair in the centrosome, which organises the spindle; most flowering plants have none.\n" +
        "- Eukaryotic cilia and flagella have nine pairs of microtubules round a central two (9 + 2). Bacterial flagella are different: a rotating protein filament with no microtubules.\n" +
        "- Collagen is outside the cell (extracellular matrix), not part of the cytoskeleton.",
      table: {
        columns: ["Fibre", "Protein", "Diameter", "Main jobs"],
        rows: [
          { cells: ["Microfilament", "Actin", "About 7 nm", "Shape, muscle contraction, cell movement, cytokinesis in animals"] },
          { cells: ["Intermediate filament", "Keratin, lamins and others", "About 10 nm", "Strength; anchors desmosomes; supports the nucleus"] },
          { cells: ["Microtubule", "Tubulin", "About 25 nm, hollow", "Spindle, vesicle tracks, centrioles, cilia and flagella"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Colchicine binds tubulin and stops microtubules forming. Which process in a dividing animal cell does it block most directly?",
        options: [
          "Separation of chromatids at anaphase",
          "Contraction of the actin ring that pinches the cell in two",
          "ATP production in the mitochondria",
          "Diffusion of oxygen into the cell",
          "Replication of DNA in S phase",
        ],
        steps: [
          "Chromatids are pulled apart by the spindle, which is made of microtubules: A.",
          "The contractile ring (B) is actin, a microfilament. ATP production (C), diffusion (D) and DNA replication (E) do not depend on microtubules.",
        ],
        answer: "(A) Separation of chromatids at anaphase",
      },
      practiceSet: [
        { prompt: "What are centrioles made of?", answer: "Microtubules (nine triplets)" },
        { prompt: "Which cytoskeleton fibre is made of actin?", answer: "Microfilaments" },
        { prompt: "Name the three components of the cytoskeleton.", answer: "Microtubules, microfilaments and intermediate filaments" },
      ],
      traps: [
        {
          title: "Myosin, kinesin and dynein are motors, not cytoskeleton fibres",
          body: "The three fibres of the cytoskeleton are microtubules, microfilaments and intermediate filaments. Myosin, kinesin and dynein are motor proteins that move along them, and collagen is an extracellular protein. Lists built from motors or collagen are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-cell-wall",
      name: "Cell walls in plants, fungi and bacteria",
      intuition:
        "A wall is a rigid case outside the plasma membrane. It stops a cell bursting when water rushes in, and gives it a fixed shape. It is full of holes, so it lets almost everything through; the membrane inside it still does the choosing.",
      definition:
        "A **cell wall** lies outside the plasma membrane. Its material depends on the group.\n" +
        "- **Plants**: **cellulose** microfibrils set in other polysaccharides (pectins, hemicelluloses). Neighbouring walls are glued by a pectin layer, the middle lamella. Woody cells add lignin.\n" +
        "- **Fungi**: mainly **chitin**.\n" +
        "- **Bacteria**: **peptidoglycan** (murein). Penicillin stops the cross-links of peptidoglycan forming, so growing bacteria burst; human cells have no peptidoglycan, so they are unharmed.\n" +
        "- **Animals** have no cell wall; their cells sit in an extracellular matrix of collagen and other proteins.\n" +
        "- The wall is **freely permeable**; the plasma membrane is the selectively permeable barrier.",
      table: {
        columns: ["Group", "Main wall material", "Key point"],
        rows: [
          { cells: ["Plants", "Cellulose", "Resists turgor pressure; crossed by plasmodesmata"] },
          { cells: ["Fungi", "Chitin", "Same polysaccharide as insect exoskeletons"] },
          { cells: ["Bacteria", "Peptidoglycan", "Target of penicillin"] },
          { cells: ["Archaea", "No peptidoglycan; other polymers or protein", "Not affected by penicillin"] },
          { cells: ["Animals", "No wall", "Extracellular matrix of collagen instead"] },
        ],
      },
      selfCheckExample: {
        prompt: "Penicillin kills many growing bacteria but does not harm human cells. What is the best explanation?",
        options: [
          "Human cells have no ribosomes for penicillin to bind.",
          "Penicillin dissolves cellulose, which bacteria contain and humans lack.",
          "Penicillin destroys the bacterial nucleus.",
          "Penicillin stops peptidoglycan being made, and human cells have no peptidoglycan.",
          "Penicillin blocks chitin synthesis in bacterial walls.",
        ],
        steps: [
          "Penicillin targets peptidoglycan cross-linking in the bacterial wall, a structure human cells do not have: D.",
          "Human cells do have ribosomes (A). Bacterial walls are not cellulose (B) or chitin (E). Bacteria have no nucleus to destroy (C).",
        ],
        answer: "(D) Penicillin stops peptidoglycan being made, and human cells have no peptidoglycan.",
      },
      practiceSet: [
        { prompt: "What is the main polysaccharide of a fungal cell wall?", answer: "Chitin" },
        { prompt: "Is a plant cell wall selectively permeable?", answer: "No: it is freely permeable; the plasma membrane is selective" },
        { prompt: "Do animal cells have a cell wall?", answer: "No" },
      ],
      traps: [
        {
          title: "The outermost selective layer of a plant cell is the membrane, not the wall",
          body: "A plant cell's wall is its outermost layer, but water and solutes pass through it freely. The selectively permeable barrier is the plasma membrane just inside it. An option calling the plant cell's outermost layer selectively permeable is wrong.",
        },
      ],
    },
  ],
};
