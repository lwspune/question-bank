import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_CE_PROKARYOTIC_NOTE: SubtopicNote = {
  subtopicName: "Cell Theory and the Prokaryotic Cell",
  title: "Cell Theory and the Prokaryotic Cell",
  oneLineDefinition:
    "Who first saw the cell and its parts, what the cell theory says, and how a bacterial cell is built: its envelope, mesosome, ribosomes and plasmids.",
  whyItMatters:
    "Six NEET questions, all from 2024 to 2026. Two ask who found what (the cell theory, and the people behind the nucleus, chromatin, ribosomes and the Golgi body). Four are about the prokaryotic cell, and the mesosome alone was asked twice, Re-NEET 2024 and NEET 2025.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboce-cell-theory",
      name: "The cell theory and who found the cell's parts",
      intuition:
        "The cell theory grew in steps. First people saw cells. Then Schleiden looked at plants and Schwann at animals, and together they said living things are made of cells. They could not say where new cells come from. Virchow answered that: every cell comes from a cell that already existed. NEET likes to match each name with exactly what that person did.",
      definition:
        "The people and the theory:\n" +
        "- **Anton von Leeuwenhoek** first saw and described a **live cell**. **Robert Brown** later discovered the **nucleus** (1831).\n" +
        "- **Matthias Schleiden** (1838), a botanist, studied many plants and found that all plants are made of different kinds of cells which form the tissues of the plant.\n" +
        "- **Theodore Schwann** (1839), a zoologist, studied animal cells. He reported that cells have a thin outer layer, today called the **plasma membrane**. From plant tissues he concluded that the **cell wall is a unique character of plant cells**. He proposed that the bodies of animals and plants are made of **cells and products of cells**.\n" +
        "- **Schleiden and Schwann** together formulated the **cell theory**. It did not explain how new cells are formed.\n" +
        "- **Rudolf Virchow** (1855) explained that cells divide and new cells form from pre-existing cells (*Omnis cellula-e cellula*). This gave the theory its final shape.\n" +
        "- **The cell theory today:** (i) all living organisms are made of cells and products of cells; (ii) all cells arise from pre-existing cells.\n" +
        "- Later names: **Flemming** named **chromatin** (nuclear material that takes up basic dyes); **George Palade** first saw **ribosomes** as dense particles under the electron microscope; **Camillo Golgi** (1898) first saw the densely stained network near the nucleus, now the **Golgi apparatus**.",
      table: {
        columns: ["Scientist", "What NCERT credits to them"],
        rows: [
          { cells: ["Anton von Leeuwenhoek", "First saw and described a live cell"] },
          { cells: ["Robert Brown", "Discovered the nucleus (1831)"] },
          { cells: ["Matthias Schleiden (1838)", "All plants are made of different kinds of cells that form their tissues"] },
          {
            cells: [
              "Theodore Schwann (1839)",
              "Cells have a thin outer layer (the plasma membrane); the cell wall is unique to plant cells; bodies are made of cells and products of cells",
            ],
          },
          {
            cells: ["Schleiden and Schwann", "Together formulated the cell theory"],
            noteAmber: "Re-NEET 2026: the cell theory was formulated by Schleiden and Schwann, not Robert Brown, Leeuwenhoek or Singer and Nicolson.",
            pyqExampleId: "215317a6-443a-4764-a134-1eb79d7148ca",
          },
          { cells: ["Rudolf Virchow (1855)", "New cells arise from pre-existing cells (Omnis cellula-e cellula)"] },
          { cells: ["Flemming", "Named chromatin"] },
          { cells: ["George Palade", "First saw ribosomes as dense particles"] },
          { cells: ["Camillo Golgi (1898)", "First saw the Golgi apparatus near the nucleus"] },
          { cells: ["Singer and Nicolson (1972)", "Fluid mosaic model of the cell membrane"] },
        ],
      },
      pyqExampleId: "e186484a-0fd4-4db3-8bdd-6f33f502532b",
      selfCheckExample: {
        prompt: "Schleiden and Schwann said living things are made of cells, but their theory left one question open. What was it, and who answered it?",
        steps: [
          "Their theory did not say how new cells are formed.",
          "Rudolf Virchow (1855) showed that cells divide and new cells come from cells that already exist.",
        ],
        answer: "How new cells form; Virchow answered it with Omnis cellula-e cellula (cells arise from pre-existing cells).",
      },
      practiceSet: [
        { prompt: "Who first saw and described a live cell?", answer: "Anton von Leeuwenhoek" },
        { prompt: "State the two points of the cell theory as it stands today.", answer: "All living organisms are made of cells and products of cells; all cells arise from pre-existing cells" },
        { prompt: "Which scientist concluded that the presence of a cell wall is a unique character of plant cells?", answer: "Theodore Schwann" },
        { prompt: "What did Schleiden conclude after studying many plants?", answer: "All plants are made of different kinds of cells which form the tissues of the plant" },
      ],
      traps: [
        {
          title: "The cell theory needed a third name",
          body: "Schleiden and Schwann **formulated** the cell theory, but it did not explain where new cells come from. **Virchow** (1855) added that cells arise from pre-existing cells and gave the theory its final shape.",
        },
        {
          title: "Brown found the nucleus, Flemming named chromatin",
          body: "**Robert Brown** described the nucleus in 1831. **Flemming** gave the name **chromatin** to the nuclear material stained by basic dyes. Swapping the two is the usual wrong option in a match.",
        },
        {
          title: "Schwann did all three",
          body: "Schwann reported the thin outer layer (plasma membrane), said the cell wall is unique to plant cells, and proposed that bodies are made of cells and products of cells. A statement set may credit all three to him.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-prokaryote",
      name: "The prokaryotic cell: what it has and what it lacks",
      intuition:
        "A prokaryotic cell is small and simple. Its DNA lies loose in the cytoplasm with no membrane around it, and it has no organelles wrapped in membranes. It still has ribosomes, because every cell must make proteins, and many bacteria carry small extra rings of DNA called plasmids. Most questions are statement sets: tick what a prokaryote has, reject what only a eukaryote has.",
      definition:
        "Prokaryotic cells:\n" +
        "- Examples: **bacteria, blue-green algae, mycoplasma and PPLO** (pleuropneumonia-like organisms). They are generally smaller and multiply faster than eukaryotic cells.\n" +
        "- Size: **mycoplasma**, the smallest cell, is about **0.3 µm**; bacteria are **3 to 5 µm**. Four basic bacterial shapes: **bacillus** (rod), **coccus** (sphere), **vibrio** (comma) and **spirillum** (spiral).\n" +
        "- All except mycoplasma have a **cell wall** around the plasma membrane.\n" +
        "- No well-defined nucleus: the genetic material is **naked**, not covered by a nuclear membrane. Besides the genomic DNA (a single circular chromosome), many bacteria have small circular DNA outside it, the **plasmids**. Plasmids give traits such as **resistance to antibiotics**.\n" +
        "- **No membrane-bound organelles** (no ER, Golgi, mitochondria, plastids, lysosomes or peroxisomes).\n" +
        "- **Ribosomes** are present: **70S**, made of **50S and 30S** subunits, about 15 nm by 20 nm. Several ribosomes on one mRNA form a **polysome**.\n" +
        "- **Inclusion bodies** store reserve food free in the cytoplasm, with no membrane: **phosphate granules, cyanophycean granules and glycogen granules**. **Gas vacuoles** occur in blue-green and purple and green photosynthetic bacteria.",
      table: {
        columns: ["Feature", "Prokaryotic cell", "Eukaryotic cell"],
        rows: [
          { cells: ["Nucleus", "No nuclear membrane; naked genetic material", "Organised nucleus inside a nuclear envelope"] },
          {
            cells: ["Membrane-bound organelles", "Absent (no ER, Golgi, mitochondria, plastids, peroxisomes)", "Present"],
            noteAmber: "Re-NEET 2026: prokaryotes have 50S and 30S subunits, plasmids and mesosomes, but not peroxisomes.",
            pyqExampleId: "c7577050-4953-4b3d-b4f2-adcd8fb2b40b",
          },
          { cells: ["Ribosomes", "70S (50S + 30S)", "80S (60S + 40S) in the cytoplasm"] },
          { cells: ["Extra DNA", "Plasmids: small circular DNA outside the genomic DNA", "DNA also in mitochondria and plastids"] },
          { cells: ["Cell wall", "Present in all except mycoplasma", "Present in plants and fungi, absent in animals"] },
          { cells: ["Examples", "Bacteria, blue-green algae, mycoplasma, PPLO", "Protists, plants, animals and fungi"] },
        ],
      },
      pyqExampleId: "c011bc3c-479c-467b-acdc-a55a32c36995",
      selfCheckExample: {
        prompt: "A bacterium survives an antibiotic because of a gene carried on small circular DNA lying outside its main chromosome. What is this DNA called, and does a membrane surround it?",
        steps: [
          "Small circular DNA outside the genomic DNA of a bacterium is a plasmid.",
          "Prokaryotic DNA has no membrane around it, so neither does the plasmid.",
        ],
        answer: "A plasmid; it has no membrane around it.",
      },
      practiceSet: [
        { prompt: "Name the smallest cell known, and give its size.", answer: "Mycoplasma, about 0.3 µm" },
        { prompt: "Name the three kinds of granules a prokaryotic cell stores as inclusion bodies.", answer: "Phosphate granules, cyanophycean granules and glycogen granules" },
        { prompt: "What are the four basic shapes of bacteria?", answer: "Bacillus (rod), coccus (sphere), vibrio (comma) and spirillum (spiral)" },
        { prompt: "Which prokaryote has no cell wall?", answer: "Mycoplasma" },
        { prompt: "What is a group of ribosomes attached to one mRNA called?", answer: "A polysome (polyribosome)" },
      ],
      traps: [
        {
          title: "Only the ribosome is in both",
          body: "The **ribosome** has no membrane and is found in both prokaryotic and eukaryotic cells. **Lysosomes** and **mitochondria** are membrane-bound, so prokaryotes lack them; the **centrosome** has no membrane but is found only in eukaryotic (animal) cells.",
        },
        {
          title: "Plasmids and mesosomes yes, peroxisomes no",
          body: "A statement set on prokaryotes accepts **50S + 30S ribosomes**, **plasmids** and **mesosomes**. Any membrane-bound organelle, such as a **peroxisome**, is the false statement.",
        },
        {
          title: "Inclusion bodies have no membrane",
          body: "Phosphate, cyanophycean and glycogen granules lie **free in the cytoplasm**. They are not organelles and have no membrane around them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboce-envelope",
      name: "The bacterial envelope, mesosome and surface structures",
      intuition:
        "A bacterium is wrapped in three layers that work as one protective coat. Its plasma membrane also folds inwards in places, making the mesosome, which does jobs a eukaryote gives to separate organelles. On the outside some bacteria carry flagella to swim, and pili and fimbriae that are not used for swimming.",
      definition:
        "The cell envelope and its modifications:\n" +
        "- Most bacteria have a **cell envelope** of three tightly bound layers: the outermost **glycocalyx**, then the **cell wall**, then the **plasma membrane**. Each layer has its own job, but together they act as one protective unit.\n" +
        "- The glycocalyx differs in make-up and thickness: a loose sheath is a **slime layer**, a thick, tough one is a **capsule**.\n" +
        "- The **cell wall** decides the shape of the cell and gives strong support, so the bacterium does not burst or collapse.\n" +
        "- **Gram staining:** bacteria that take up the stain are **Gram positive**; those that do not are **Gram negative**.\n" +
        "- The **plasma membrane** is semi-permeable and built like a eukaryote's.\n" +
        "- **Mesosome:** formed by **extensions of the plasma membrane into the cell**, as vesicles, tubules and lamellae. It helps in **cell wall formation, DNA replication and distribution to daughter cells, respiration and secretion**, and increases the membrane's surface area and enzyme content.\n" +
        "- **Chromatophores:** membranous extensions into the cytoplasm in some prokaryotes such as cyanobacteria, which hold **pigments**.\n" +
        "- **Flagella** (in motile bacteria) have three parts: **filament** (the longest part), **hook** and **basal body**.\n" +
        "- **Pili** are elongated tubular structures made of a special protein. **Fimbriae** are small bristle-like fibres; in some bacteria they help attach to rocks in streams and to host tissues. Pili and fimbriae are not used for movement.",
      table: {
        columns: ["Structure", "What it is", "Its job"],
        rows: [
          { cells: ["Glycocalyx", "Outermost layer: slime layer (loose) or capsule (thick, tough)", "Part of the protective envelope"] },
          { cells: ["Cell wall", "Middle layer of the envelope", "Gives shape and support; stops bursting or collapse"] },
          {
            cells: ["Mesosome", "Extension of the plasma membrane into the cell: vesicles, tubules, lamellae", "Wall formation, DNA replication and distribution, respiration, secretion"],
            noteAmber: "Re-NEET 2024: a mesosome is a special structure formed by extension of the plasma membrane, not a vesicle or a ribosome chain.",
            pyqExampleId: "f558cbf6-2581-4709-b6b1-f37cfddb9021",
          },
          { cells: ["Chromatophores", "Membranous extensions into the cytoplasm (cyanobacteria)", "Hold the pigments"] },
          { cells: ["Flagellum", "Filament, hook and basal body", "Movement"] },
          { cells: ["Pili", "Elongated tubes of a special protein", "Not used for movement"] },
          { cells: ["Fimbriae", "Small bristle-like fibres", "Attach some bacteria to rocks and host tissues"] },
        ],
      },
      pyqExampleId: "f6f02fe0-139e-487d-9226-6f75348a8939",
      selfCheckExample: {
        prompt: "List the three layers of a bacterial cell envelope, from the outside in.",
        steps: [
          "The outermost layer is the glycocalyx.",
          "Under it lies the cell wall, and innermost is the plasma membrane.",
        ],
        answer: "Glycocalyx, cell wall, plasma membrane.",
      },
      practiceSet: [
        { prompt: "What is a loose glycocalyx sheath called, and what is a thick, tough glycocalyx called?", answer: "A slime layer; a capsule" },
        { prompt: "Name the three parts of a bacterial flagellum.", answer: "Filament, hook and basal body" },
        { prompt: "What job does NCERT give to the fimbriae of some bacteria?", answer: "Attaching the bacterium to rocks in streams and to host tissues" },
        { prompt: "In cyanobacteria, what are the pigment-holding membranous extensions into the cytoplasm called?", answer: "Chromatophores" },
      ],
      traps: [
        {
          title: "A mesosome is a fold of the membrane",
          body: "The **mesosome** is an extension of the **plasma membrane** into the cell. A membrane-bound vesicle (a lysosome) and a chain of ribosomes on one mRNA (a polysome) are the distractors.",
        },
        {
          title: "Only flagella move the cell",
          body: "**Pili** and **fimbriae** are surface structures too, but they play no part in movement. A pairing of pili with respiration or motility is wrong.",
        },
        {
          title: "The glycocalyx belongs to the bacterial envelope",
          body: "NCERT describes the **glycocalyx** as the outermost layer of the **prokaryotic** cell envelope, either a slime layer or a capsule.",
        },
      ],
    },
  ],
};
