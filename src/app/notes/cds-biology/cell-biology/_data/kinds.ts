import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_CE_KINDS_NOTE: SubtopicNote = {
  subtopicName: "Kinds of Cells and the Microscope",
  title: "Kinds of Cells and the Microscope",
  oneLineDefinition:
    "How a compound microscope makes a cell look bigger, and how a prokaryotic cell such as a bacterium differs from the eukaryotic cells of plants and animals.",
  whyItMatters:
    "Seven CDS questions from 2019 (I) to 2026 (II). Five are about prokaryotes, two of them the same question on the nucleoid (2023 (II) and 2026 (I)). Two are about the microscope: what magnification means and the path light takes through it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsbice-microscope",
      name: "The compound microscope and magnification",
      intuition:
        "Most cells are far too small to see with the eye, so we look at them through a compound microscope. Light from below is gathered onto the specimen, then two lenses enlarge it one after the other. Magnification simply says how many times bigger the image looks than the real thing.",
      definition:
        "The compound microscope:\n" +
        "- Light comes from a **mirror or lamp** below, is focused onto the slide by the **condenser**, passes through the specimen to the **objective lens**, travels up the **body tube**, and is enlarged again by the **eyepiece** next to your eye.\n" +
        "- **Magnification** = size of the image ÷ actual size of the object.\n" +
        "- **Total magnification** = magnification of the objective × magnification of the eyepiece.\n" +
        "- Cells are measured in **micrometres** (µm): 1 µm is one-thousandth of a millimetre.\n" +
        "- Robert **Hooke** first saw and named cells (1665) in a thin slice of cork.",
      formula: {
        label: "Magnification",
        latex: "\\text{Magnification} = \\dfrac{\\text{size of the image}}{\\text{actual size of the object}}",
        symbols: [
          { symbol: "Size of the image", meaning: "how big the specimen looks through the microscope" },
          { symbol: "Actual size of the object", meaning: "the real size of the specimen" },
        ],
      },
      authoredExample: {
        prompt: "A cell 0.02 mm across looks 8 mm across under a microscope. What is the magnification?",
        steps: [
          "Magnification = image size ÷ actual size.",
          "\\(8 \\div 0.02 = 400\\).",
        ],
        answer: "400 times (×400).",
      },
      selfCheckExample: {
        prompt: "A microscope has a 10× eyepiece and a 40× objective. What is its total magnification?",
        steps: [
          "The two lenses enlarge one after the other, so their magnifications multiply.",
          "\\(10 \\times 40 = 400\\).",
        ],
        answer: "400 times.",
      },
      pyqExampleId: "c545c569-a7f6-4101-a054-0799aa53d14d",
      practiceSet: [
        { prompt: "An image is 5 mm across and the real object is 0.01 mm across. What is the magnification?", answer: "500 times", method: "\\(5 \\div 0.01\\)" },
        { prompt: "What is the total magnification of a 10× eyepiece used with a 100× objective?", answer: "1000 times", method: "\\(10 \\times 100\\)" },
        { prompt: "Which lens of a compound microscope is nearest the eye?", answer: "The eyepiece" },
        { prompt: "Who first saw and named cells, in a slice of cork?", answer: "Robert Hooke" },
      ],
      traps: [
        {
          title: "Image size goes on top",
          body: "Magnification is **image ÷ object**, so it is bigger than 1 for an enlarged image. Object ÷ image, or the difference or product of the two sizes, are the wrong options.",
        },
        {
          title: "The condenser comes before the objective",
          body: "Light meets the **condenser** first (below the stage), then the specimen and the **objective**, then the **body tube**, and the **eyepiece** last. An order that puts the eyepiece before the body tube is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbice-prokaryote",
      name: "Prokaryotic and eukaryotic cells",
      intuition:
        "A prokaryotic cell, such as a bacterium, is the simple kind. Its DNA lies loose in the middle of the cell with no membrane around it, and it has no membrane-bound organelles at all. It still has ribosomes, because every living cell must make proteins. Plant, animal and fungal cells are eukaryotic: they have a true nucleus wrapped in a membrane, and many organelles each in its own membrane.",
      definition:
        "Prokaryote against eukaryote:\n" +
        "- **Prokaryotes**: bacteria and cyanobacteria (blue-green algae). No **nuclear membrane**: the DNA lies in a region called the **nucleoid**. No mitochondria, Golgi, ER or plastids. They do have a **cell wall**, a cell membrane, **ribosomes** (smaller, 70S) and often small extra rings of DNA called **plasmids**.\n" +
        "- In photosynthetic bacteria the pigment sits on **infoldings of the cell membrane** (membranous vesicles called chromatophores), since there are no chloroplasts.\n" +
        "- **Eukaryotes**: plants, animals, fungi and protists. A **true nucleus** with a nuclear membrane, membrane-bound organelles, and larger (80S) ribosomes.",
      table: {
        columns: ["Feature", "Prokaryotic cell", "Eukaryotic cell"],
        rows: [
          {
            cells: ["Nucleus", "No nuclear membrane; DNA in the nucleoid", "True nucleus inside a nuclear membrane"],
            noteAmber: "Asked twice, CDS 2023 (II) and 2026 (I): the region holding a bacterium's DNA is the nucleoid.",
            pyqExampleId: "709ed389-fbc7-4da7-bb09-06382d6401e0",
          },
          { cells: ["Mitochondria, Golgi, ER", "Absent", "Present"] },
          {
            cells: ["Ribosomes", "Present (70S)", "Present (80S)"],
            noteAmber: "CDS 2025 (II): of mitochondria, a nucleus, ribosomes and Golgi bodies, only ribosomes are in a prokaryotic cell.",
            pyqExampleId: "06f22079-e6a3-4e44-bccd-d06ea0c798cb",
          },
          {
            cells: ["Photosynthetic pigment", "On membranous vesicles of the cell membrane", "In chloroplasts"],
            noteAmber: "CDS 2019 (II): chlorophyll in photosynthetic bacteria is held on membranous vesicles.",
            pyqExampleId: "a2027305-5689-4856-ba44-88f8aaf283cc",
          },
          { cells: ["Examples", "Bacteria, cyanobacteria", "Plants, animals, fungi, protists"] },
        ],
      },
      pyqExampleId: "34c9ee5b-4dae-43f5-ad2c-28e0a1f0b6fa",
      selfCheckExample: {
        prompt: "Some bacteria carry out photosynthesis, yet they have no chloroplasts. How is this possible?",
        steps: [
          "A prokaryote has no membrane-bound organelles, so it cannot have chloroplasts.",
          "Instead its cell membrane folds inwards into sacs, and the pigment sits on those membranes.",
        ],
        answer: "The pigment is held on infoldings of the cell membrane, not in chloroplasts.",
      },
      practiceSet: [
        { prompt: "Give one example of a prokaryotic organism.", answer: "A bacterium (or a cyanobacterium)" },
        { prompt: "What are the small extra rings of DNA in many bacteria called?", answer: "Plasmids" },
        { prompt: "Which organelle is found in both prokaryotic and eukaryotic cells?", answer: "The ribosome" },
        { prompt: "Are fungi prokaryotes or eukaryotes?", answer: "Eukaryotes" },
      ],
      traps: [
        {
          title: "Nucleoid, not nucleolus or nucleosome",
          body: "The **nucleoid** is the bacterial DNA region with no membrane. The **nucleolus** is a body inside a true nucleus, and a **nucleosome** is DNA wound on proteins in eukaryotes.",
        },
        {
          title: "Prokaryotes do have ribosomes and a wall",
          body: "'No organelles' means no **membrane-bound** ones. Ribosomes, the cell wall, the cell membrane and plasmids are all found in bacteria; the **nuclear membrane** is not.",
        },
      ],
    },
  ],
};
