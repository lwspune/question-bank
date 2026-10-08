import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_CSM_CELLS_SIZE_NOTE: SubtopicNote = {
  subtopicName: "Cells, Size and Microscopy",
  title: "Cell Theory, Cell Size and Microscopes",
  oneLineDefinition:
    "Every living thing is made of cells; cells are tiny because a small cell has more surface for its volume, and microscopes let us measure them.",
  whyItMatters:
    "The older papers asked for cells and organelles put in order of size, a magnification calculation, and the features shared by all living things. The 2023 ministry paper asked how the surface area to volume ratio changes as a cell grows.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-csm-cell-theory",
      name: "Cell theory and the features of living things",
      intuition:
        "Look closely enough at any living thing, a tree, a mushroom or a person, and it turns out to be built of cells. Nothing smaller than a cell can stay alive on its own. A cell never appears from nowhere: it always comes from another cell dividing.",
      definition:
        "The **cell theory** grew from the work of Schleiden (plants, 1838), Schwann (animals, 1839) and Virchow (1855, \"every cell from a cell\").\n" +
        "- All living things are made of one or more **cells**.\n" +
        "- The cell is the smallest unit of structure and function that is alive.\n" +
        "- New cells come only from existing cells, by division.\n" +
        "- Cells pass on hereditary information as **DNA**.\n" +
        "Cells come in two basic kinds: **prokaryotic** (no nucleus: bacteria and archaea) and **eukaryotic** (DNA inside a nucleus: protists, fungi, plants, animals). The last page of this chapter compares them in detail.\n" +
        "Every living organism shows all of these features: made of cells, DNA as its genetic material, metabolism (it uses energy to stay alive and keep its inside steady as the outside changes), growth and development, reproduction, and response to stimuli.",
      table: {
        columns: ["Statement", "What it means", "Exam angle"],
        rows: [
          { cells: ["All living things are made of cells", "One cell (unicellular) or many (multicellular)", "Viruses are not made of cells, so they are not covered"] },
          { cells: ["The cell is the basic unit of life", "It is the smallest thing that shows every feature of life", "An organelle taken out of a cell cannot live on its own"] },
          { cells: ["Cells come only from cells", "New cells form when existing cells divide", "Rules out life arising from non-living matter today"] },
          { cells: ["Cells carry hereditary information", "All cells use DNA as their genetic material", "Some viruses use RNA, which is one reason they are not cells"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following is NOT part of the modern cell theory?",
        options: [
          "All organisms consist of one or more cells.",
          "New cells arise only from cells that already exist.",
          "The cell is the smallest unit that shows all the properties of life.",
          "Every cell contains a nucleus.",
          "Cells carry their hereditary information as DNA.",
        ],
        steps: [
          "Options A, B, C and E are the standard statements of the theory.",
          "Option D is false: bacteria have no nucleus, and a mature human red blood cell loses its nucleus. Both are still cells.",
        ],
        answer: "(D) Every cell contains a nucleus.",
      },
      practiceSet: [
        { prompt: "Which scientist stated that every cell comes from a cell?", answer: "Rudolf Virchow (1855)" },
        { prompt: "Is a virus made of cells?", answer: "No", method: "It is a particle of nucleic acid in a protein coat, with no cytoplasm" },
        { prompt: "Which molecule is the genetic material of every living cell?", answer: "DNA" },
        { prompt: "Name the two basic kinds of cell.", answer: "Prokaryotic and eukaryotic", method: "The difference is whether the DNA sits inside a nucleus" },
      ],
      traps: [
        {
          title: "A cell does not need a nucleus to be a cell",
          body: "Bacteria never have a nucleus, and mature red blood cells lose theirs. Options that make the nucleus part of the definition of a cell, or of life, are wrong. What every cell has is a plasma membrane, cytoplasm, ribosomes and DNA.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-csm-sizes",
      name: "Sizes of cells, organelles and viruses",
      intuition:
        "Biology runs across a huge range of sizes, so learn a few anchor values and place everything else between them. Each step from nanometres to micrometres to millimetres is a factor of a thousand. A light microscope cannot separate two points closer than about 0.2 µm, so anything smaller needs an electron microscope.",
      definition:
        "Units: \\(1\\ \\text{mm} = 10^{-3}\\ \\text{m}\\), \\(1\\ \\mu\\text{m} = 10^{-6}\\ \\text{m}\\), \\(1\\ \\text{nm} = 10^{-9}\\ \\text{m}\\). So \\(1\\ \\text{mm} = 1000\\ \\mu\\text{m}\\) and \\(1\\ \\mu\\text{m} = 1000\\ \\text{nm}\\).\n" +
        "- **Magnification** is how many times larger the image is than the object.\n" +
        "- **Resolution** is the smallest distance between two points that can still be seen as separate. It sets the detail you can see; enlarging a blurred image adds no detail.\n" +
        "- Light microscope: resolution about 200 nm, useful magnification up to about ×1500. It can show living, coloured cells.\n" +
        "- Electron microscope: resolution about 1 nm or better, magnification above ×100 000. Transmission EM shows thin sections; scanning EM shows surfaces in 3D. Samples must be dead and in a vacuum.",
      table: {
        columns: ["Structure", "Typical size", "Seen with"],
        rows: [
          { cells: ["Ribosome", "About 25 nm", "Electron microscope only"] },
          { cells: ["Most viruses", "About 20 to 300 nm", "Electron microscope only"] },
          { cells: ["Bacterium such as E. coli", "About 2 µm long, under 1 µm wide", "Light microscope, but no inner detail"] },
          { cells: ["Mitochondrion", "About 0.5 to 1 µm wide, 1 to 5 µm long", "Light microscope as a speck; inner membranes need EM"] },
          { cells: ["Nucleus", "About 5 to 10 µm", "Light microscope"] },
          { cells: ["Human red blood cell", "About 7 to 8 µm across", "Light microscope"] },
          { cells: ["Typical animal cell (liver cell)", "About 20 to 30 µm", "Light microscope"] },
          { cells: ["Plant cell (onion epidermis)", "A few hundred µm long", "Light microscope, low power"] },
          { cells: ["Human egg cell", "About 0.1 mm", "Just visible to the naked eye"] },
        ],
        caption: "Rough order to remember: ribosome < virus < bacterium ≈ mitochondrion < nucleus < red blood cell < most animal cells < plant cells.",
      },
      selfCheckExample: {
        prompt: "Which sequence lists the structures in order of increasing size?",
        options: [
          "ribosome → influenza virus → yeast cell → human egg cell",
          "influenza virus → ribosome → yeast cell → human egg cell",
          "ribosome → yeast cell → influenza virus → human egg cell",
          "ribosome → influenza virus → human egg cell → yeast cell",
          "influenza virus → ribosome → human egg cell → yeast cell",
        ],
        steps: [
          "Ribosome about 25 nm; influenza virus about 100 nm; yeast cell a few µm; human egg about 100 µm.",
          "B and E put the virus below the ribosome: most viruses are several times larger than a ribosome.",
          "C puts a whole yeast cell below a virus, and D and E put a single yeast cell above the largest human cell.",
        ],
        answer: "(A) ribosome → influenza virus → yeast cell → human egg cell",
      },
      practiceSet: [
        { prompt: "How many micrometres are there in one millimetre?", answer: "1000" },
        { prompt: "Can a light microscope show individual ribosomes?", answer: "No", method: "About 25 nm is far below its resolution of about 200 nm" },
        { prompt: "In a human sperm cell, put the nucleus, a mitochondrion and a ribosome in order of decreasing size.", answer: "Nucleus, mitochondrion, ribosome" },
      ],
      traps: [
        {
          title: "More magnification does not mean more detail",
          body: "A light microscope can enlarge a ribosome's image as much as you like, but it will never show it, because two points closer than about 200 nm blur into one. Resolution, not magnification, decides what can be seen. Ribosomes and viruses need an electron microscope.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-csm-magnification",
      name: "Magnification: image size, actual size and scale bars",
      intuition:
        "A micrograph is an enlarged picture, so the real object is the picture's size divided by the enlargement. The only hard part is the units. Put the image and the object in the same unit before dividing, and convert the answer to the unit that suits the object (µm for cells, nm for viruses).",
      definition:
        "**Magnification** = image size ÷ actual size. It has no unit.\n" +
        "- Rearranged: actual size = image size ÷ magnification.\n" +
        "- A **scale bar** is a line drawn on the image with its real length written beside it. Measure the bar on the page, then magnification = measured bar length ÷ the length written on it.\n" +
        "- Convert first: \\(1\\ \\text{mm} = 1000\\ \\mu\\text{m} = 10^6\\ \\text{nm}\\).",
      formula: {
        label: "Magnification",
        latex: "M = \\frac{I}{A}",
        symbols: [
          { symbol: "\\(M\\)", meaning: "magnification (no unit)" },
          { symbol: "\\(I\\)", meaning: "size of the image, as measured on the picture" },
          { symbol: "\\(A\\)", meaning: "actual size of the object, in the same unit as I" },
        ],
      },
      authoredExample: {
        prompt:
          "An electron micrograph shows a mitochondrion 45 mm long at a magnification of ×15 000. Find its actual length. A second micrograph has a scale bar 10 mm long labelled 2 µm; what is its magnification?",
        steps: [
          "Actual length \\(= 45\\ \\text{mm} / 15\\,000 = 0.003\\ \\text{mm}\\).",
          "Convert: \\(0.003\\ \\text{mm} \\times 1000 = 3\\ \\mu\\text{m}\\), a sensible length for a mitochondrion.",
          "Scale bar: \\(10\\ \\text{mm} = 10\\,000\\ \\mu\\text{m}\\), so \\(M = 10\\,000 / 2 = 5000\\).",
        ],
        answer: "3 µm; magnification ×5000",
      },
      selfCheckExample: {
        prompt:
          "An electron micrograph of a structure is 24 mm long. The magnification is ×80 000. What is the actual length of the structure?",
        options: [
          "30 nm",
          "300 nm",
          "3.0 µm",
          "0.30 mm",
          "1.9 km",
        ],
        steps: [
          "\\(A = I / M = 24\\ \\text{mm} / 80\\,000 = 3.0 \\times 10^{-4}\\ \\text{mm}\\).",
          "\\(3.0 \\times 10^{-4}\\ \\text{mm} = 0.30\\ \\mu\\text{m} = 300\\ \\text{nm}\\).",
          "A and C are the right digits with a wrong power of ten; D forgets to change units at the end; E multiplies by the magnification instead of dividing.",
        ],
        answer: "(B) 300 nm",
      },
      practiceSet: [
        { prompt: "A cell 4 µm long appears 12 mm long in a drawing. What is the magnification?", answer: "×3000", method: "\\(12\\,000\\ \\mu\\text{m} / 4\\ \\mu\\text{m}\\)" },
        { prompt: "A scale bar 20 mm long is labelled 5 µm. What is the magnification?", answer: "×4000", method: "\\(20\\,000 / 5\\)" },
        { prompt: "A cell 50 µm across is drawn at ×400. How wide is the drawing?", answer: "20 mm", method: "\\(50 \\times 400 = 20\\,000\\ \\mu\\text{m}\\)" },
      ],
      traps: [
        {
          title: "Divide by the magnification; do not multiply",
          body: "The object is smaller than its image, so actual size = image size ÷ magnification. Multiplying gives an answer in metres or kilometres for a cell, which no living cell could be. Always check the answer against the size table.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-csm-sav",
      name: "Surface area to volume ratio and the limit on cell size",
      intuition:
        "A cell takes in oxygen and food, and gets rid of waste, through its surface. What it needs depends on its volume. When a cell grows, its volume rises faster than its surface, so each unit of volume is served by less membrane. That is why cells stay small, and why big organisms need lungs, guts and blood vessels.",
      definition:
        "For any shape, scaling all lengths by \\(k\\) multiplies the surface by \\(k^2\\) and the volume by \\(k^3\\). So the **surface area to volume ratio** falls as \\(1/k\\).\n" +
        "- Cube of side \\(L\\): surface \\(6L^2\\), volume \\(L^3\\), ratio \\(6/L\\).\n" +
        "- Sphere of radius \\(r\\): ratio \\(3/r\\).\n" +
        "- Cells raise the ratio by being flat (red blood cells), long and thin (neurons), or folded (microvilli on gut cells).\n" +
        "- A large ratio means fast exchange by diffusion; this is the main reason cells divide rather than keep growing.",
      formula: {
        label: "Ratio for a cube",
        latex: "\\frac{\\text{surface area}}{\\text{volume}} = \\frac{6L^2}{L^3} = \\frac{6}{L}",
        symbols: [{ symbol: "\\(L\\)", meaning: "length of one side of the cube" }],
      },
      authoredExample: {
        prompt: "Compare the surface area to volume ratios of cube-shaped cells with sides 1 µm, 2 µm and 4 µm.",
        steps: [
          "1 µm: surface \\(6\\ \\mu\\text{m}^2\\), volume \\(1\\ \\mu\\text{m}^3\\), ratio 6 per µm.",
          "2 µm: surface \\(24\\ \\mu\\text{m}^2\\), volume \\(8\\ \\mu\\text{m}^3\\), ratio 3 per µm.",
          "4 µm: surface \\(96\\ \\mu\\text{m}^2\\), volume \\(64\\ \\mu\\text{m}^3\\), ratio 1.5 per µm.",
          "Each doubling of the side halves the ratio, as \\(6/L\\) predicts.",
        ],
        answer: "6, 3 and 1.5 per µm: the ratio falls as the cell grows",
      },
      selfCheckExample: {
        prompt:
          "A cube-shaped cell grows from a side of 2 µm to a side of 6 µm. How does its surface area to volume ratio change?",
        options: [
          "It triples.",
          "It stays the same.",
          "It falls to one third.",
          "It falls to one ninth.",
          "It rises ninefold.",
        ],
        steps: [
          "Ratio \\(= 6/L\\): at 2 µm it is 3 per µm; at 6 µm it is 1 per µm.",
          "So it falls to one third.",
          "D and E use the change in surface area (ninefold) instead of the ratio; A gets the direction backwards.",
        ],
        answer: "(C) It falls to one third.",
      },
      practiceSet: [
        { prompt: "What is the surface area to volume ratio of a cube of side 3 µm?", answer: "2 per µm", method: "\\(54 / 27\\)" },
        { prompt: "What is the ratio for a sphere of radius 3 µm?", answer: "1 per µm", method: "\\(3/r\\)" },
        { prompt: "Why are the cells lining the small intestine covered in microvilli?", answer: "To raise the surface area for absorption without raising the volume much" },
      ],
      traps: [
        {
          title: "The ratio falls as a cell grows",
          body: "Surface area and volume both increase when a cell grows, but volume increases faster, so their ratio gets smaller. Options saying the ratio stays the same, rises, or is unrelated to size are wrong.",
        },
      ],
    },
  ],
};
