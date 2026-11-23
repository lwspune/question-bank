import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GN_NANOSCALE_NOTE: SubtopicNote = {
  subtopicName: "Introduction to Nanochemistry",
  title: "Nanoscience, the Nanoscale and Nanostructures",
  oneLineDefinition:
    "The nanometre scale, the four definitions (nanoscience, nanotechnology, nanomaterial, nanochemistry), zero, one and two dimensional nanostructures, and why properties change at the nanoscale.",
  whyItMatters:
    "7 questions. Three were set in board papers: define nanoscience (2024), pick the one dimensional nanostructure from four (2025), and give an example of a one dimensional nanostructure (2026). The textbook adds where the prefix nano comes from, 1 nm in metres, the scanning tunneling microscope, and all four definitions together.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgn-scale",
      name: "The nanometre scale",
      intuition:
        "A nanometre is to a metre what a small marble is to the whole Earth. Things on this scale are larger than single atoms but smaller than bacteria and cells.",
      definition:
        "- 'Nano' in **Greek means dwarf**, though a nanometre is far smaller than any dwarf.\n" +
        "- **One nanometre is one billionth of a metre:** \\(1\\ \\text{nm} = 10^{-9}\\ \\text{m}\\).\n" +
        "- Conventionally the **nanometre scale is 1 to 100 nm**.\n" +
        "- Material made at this scale has unique optical, structural, thermal, catalytic, magnetic and electrical properties, which change with size and differ from those of the bulk material.\n" +
        "- Useful steps: \\(1\\ \\mu\\text{m} = 10^{-6}\\ \\text{m} = 1000\\ \\text{nm}\\).",
      formula: {
        label: "The nanometre",
        latex: "1\\ \\text{nm} = 10^{-9}\\ \\text{m}, \\qquad \\text{nanoscale: } 1\\ \\text{nm} \\text{ to } 100\\ \\text{nm}",
      },
      authoredExample: {
        prompt: "A human hair is about 50 µm wide. Express its width in metres and in nanometres, and say whether a hair is a nanomaterial.",
        steps: [
          "Given: width \\(= 50\\ \\mu\\text{m}\\); \\(1\\ \\mu\\text{m} = 10^{-6}\\ \\text{m}\\); \\(1\\ \\text{nm} = 10^{-9}\\ \\text{m}\\).",
          "In metres: \\(50 \\times 10^{-6}\\ \\text{m} = 5 \\times 10^{-5}\\ \\text{m}\\).",
          "In nanometres: \\(\\dfrac{5 \\times 10^{-5}\\ \\text{m}}{10^{-9}\\ \\text{m nm}^{-1}} = 5 \\times 10^{4}\\ \\text{nm} = 50\\,000\\ \\text{nm}\\).",
          "This is far above 100 nm, so a hair is not on the nanometre scale.",
        ],
        answer: "5 × 10⁻⁵ m = 50 000 nm; not a nanomaterial",
      },
      selfCheckExample: {
        prompt: "A particle is 250 nm across. Is it on the nanometre scale?",
        steps: ["The nanometre scale is 1 to 100 nm.", "250 nm is larger than 100 nm."],
        answer: "No",
      },
      practiceSet: [
        { prompt: "How many nanometres make one micrometre?", answer: "1000" },
        { prompt: "Express \\(5 \\times 10^{-8}\\) m in nanometres. Is it on the nanometre scale?", answer: "50 nm; yes" },
        { prompt: "Between which two kinds of object do nanomaterials lie in size, according to the textbook?", answer: "Larger than single atoms, smaller than bacteria and cells" },
      ],
      pyqExampleId: "b3b17aae-11af-4269-bd8a-9af366ca4f34",
      traps: [
        {
          title: "Nano means dwarf, not billion",
          body: "One nanometre is one billionth of a metre, but the Greek word 'nano' means dwarf. A question on the origin of the word wants Greek and dwarf.",
        },
        {
          title: "10⁻⁹, not 10⁻⁶",
          body: "\\(10^{-6}\\) m is a micrometre. A nanometre is a thousand times smaller, \\(10^{-9}\\) m.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgn-definitions",
      name: "Nanoscience, nanotechnology, nanomaterial and nanochemistry",
      intuition:
        "Four words that sound alike. Nanoscience studies the small world; nanotechnology builds things in it; a nanomaterial is the stuff with a nanoscale part; nanochemistry is chemistry joined with nanoscience to design and make that stuff.",
      definition:
        "- Write each definition in the textbook's words: these are one-mark and two-mark questions, and the key words carry the mark.\n" +
        "- The term **nanotechnology** was defined by Professor **Nario Taniguchi** of Tokyo Science University in **1974**.\n" +
        "- The invention of the **scanning tunneling microscope (STM) in 1980** led to the discovery of **fullerenes in 1986** and of carbon nanotubes a few years later.",
      table: {
        columns: ["Term", "Textbook definition", "Key words"],
        rows: [
          {
            cells: ["Nanoscience", "The study of phenomena and manipulation of materials at atomic, molecular and macromolecular scales, where properties differ significantly from those at a larger scale.", "Phenomena and manipulation; properties differ"],
            pyqExampleId: "c988ef99-a5ef-4718-b8b2-06d27867e619",
            noteAmber: "Board 2024 asked you to define nanoscience.",
          },
          { cells: ["Nanotechnology", "The design, characterization, production and application of structures, devices and systems by controlling shape and size at the nanometre scale.", "Controlling shape and size"] },
          {
            cells: ["Nanomaterial", "A material having structural components with at least one dimension in the nanometre scale, that is 1 to 100 nm.", "At least one dimension; 1 to 100 nm"],
            pyqExampleId: "f5826fa5-6523-4b61-9eaa-41931106efc0",
          },
          { cells: ["Nanochemistry", "The combination of chemistry and nanoscience. It deals with designing and synthesis of nanoscale materials of different size, shape, structure and composition, and their organization into functional architectures.", "Chemistry plus nanoscience; designing and synthesis"] },
          {
            cells: ["Scanning tunneling microscope", "Invented in 1980; it led to the discovery of fullerenes (1986) and carbon nanotubes.", "1980; fullerenes 1986"],
            pyqExampleId: "5b6727a2-8950-4f39-a874-a12241982983",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which term is defined as the combination of chemistry and nanoscience?",
        steps: ["Nanochemistry joins chemistry with nanoscience to design and make nanoscale materials."],
        answer: "Nanochemistry",
      },
      practiceSet: [
        { prompt: "Who defined the term nanotechnology, and in which year?", answer: "Professor Nario Taniguchi of Tokyo Science University, in 1974" },
        { prompt: "Define nanomaterial.", answer: "A material having structural components with at least one dimension in the nanometre scale, that is 1 to 100 nm" },
        { prompt: "Which discovery of 1986 followed the invention of the scanning tunneling microscope?", answer: "The discovery of fullerenes" },
        { prompt: "According to their dimensions, nanomaterials may be of which three kinds named in the textbook's definition?", answer: "Nanoparticles, nanowires and nanotubes" },
      ],
      pyqExampleId: "c988ef99-a5ef-4718-b8b2-06d27867e619",
      traps: [
        {
          title: "Nanoscience and nanotechnology swapped",
          body: "Nanoscience is the **study** of phenomena and manipulation at small scales. Nanotechnology is the **design, production and application** of structures by controlling shape and size. Do not write one for the other.",
        },
        {
          title: "All three dimensions are not needed",
          body: "A nanomaterial needs only **at least one** dimension in the 1 to 100 nm range. A nanotube is micrometres long and is still a nanomaterial.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgn-dimensions",
      name: "Zero, one and two dimensional nanostructures",
      intuition:
        "Count the dimensions that are NOT small. A nanoparticle is tiny every way, so none is large: zero dimensional. A wire or rod is long in one direction: one dimensional. A thin film is wide in two directions: two dimensional.",
      definition:
        "- **Zero dimensional:** all three dimensions are in the nanoscale.\n" +
        "- **One dimensional:** two dimensions are in the nanoscale.\n" +
        "- **Two dimensional:** one dimension is in the nanoscale.\n" +
        "- So the name counts the dimensions that are **outside** the nanoscale.",
      table: {
        columns: ["Type", "Dimensions below 100 nm", "Textbook examples"],
        rows: [
          { cells: ["Zero dimensional", "All three", "Nanoparticles, quantum dots, nanoshells, nanorings, microcapsules"] },
          {
            cells: ["One dimensional", "Two", "Nanowires, nanorods, nanotubes, fibres"],
            pyqExampleId: "24c45071-6270-4059-b680-6065a0a5658f",
            noteAmber: "Board 2026 asked for an example; Board 2025 asked you to pick one from a list.",
          },
          { cells: ["Two dimensional", "One", "Thin films, layers, coatings"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify a thin coating whose thickness alone is in the nanometre range.",
        steps: ["Only one dimension is in the nanoscale.", "That is a two dimensional nanostructure."],
        answer: "Two dimensional",
      },
      practiceSet: [
        { prompt: "Classify quantum dots by dimension.", answer: "Zero dimensional: all three dimensions are in the nanoscale" },
        { prompt: "How many dimensions of a two dimensional nanostructure are in the nanoscale?", answer: "One" },
        { prompt: "Nanorings look like bent wires. How does the textbook classify them?", answer: "Zero dimensional, along with nanoparticles and quantum dots" },
      ],
      pyqExampleId: "24c45071-6270-4059-b680-6065a0a5658f",
      traps: [
        {
          title: "Counting the small dimensions",
          body: "A nanotube has two dimensions in the nanoscale but is called one dimensional. The name counts the long, non-nano dimensions, not the small ones.",
        },
        {
          title: "Nanotubes and nanorods are both one dimensional",
          body: "The textbook lists nanowires and nanorods in its text and nanotubes and fibres in its table, all as one dimensional. The 2025 board choice offered both nanotubes and nanorods; nanotubes is the answer it keyed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgn-surface-area",
      name: "Why nanoparticles behave differently",
      intuition:
        "Cut a cube into smaller cubes and every cut exposes new faces, while the total volume stays the same. At the nanoscale the surface becomes huge for the amount of material, and most atoms sit on the surface. That one change makes nanoparticles more reactive, better catalysts, and different in colour, melting point, strength and conductivity.",
      definition:
        "The textbook's characteristic features of nanoparticles:\n" +
        "- **Colour:** bulk gold is shining yellow, but 100 gold atoms arranged in a cube would be red.\n" +
        "- **Surface area:** a high surface-to-volume ratio. Subdividing a bulk material keeps the volume the same but greatly increases the surface area, giving more reaction sites and more chemical reactivity. A 1 m cube (6 m²) cut into cubes of side 1/2 m has 12 m²; into cubes of side 1/3 m, 18 m².\n" +
        "- **Catalytic activity:** a larger surface gives more catalytic activity. These are heterogeneous catalysts that can be separated easily and recycled: Pd and Pt nanoparticles in hydrogenation, TiO₂ and ZnO in photocatalysis. Bulk gold is unreactive, but gold nanoparticles are very good catalysts for many organic reactions.\n" +
        "- **Thermal properties:** melting point depends on size. Sodium clusters of 1000 atoms melt at 288 K, of 10,000 atoms at 303 K, while bulk sodium melts at 371 K.\n" +
        "- **Mechanical properties:** copper and palladium clusters 5 to 7 nm across can be up to 500% harder than the bulk metal.\n" +
        "- **Electrical conductivity:** a carbon nanotube can act as a conductor or as a semiconductor.",
      formula: {
        label: "Total surface area after cutting a cube",
        latex: "A = 6L^2 \\times n \\quad (\\text{a cube of side } L \\text{ cut into } n^3 \\text{ cubes of side } L/n)",
        symbols: [
          { symbol: "\\(L\\)", meaning: "side of the original cube" },
          { symbol: "\\(n\\)", meaning: "number of pieces each edge is cut into" },
        ],
      },
      authoredExample: {
        prompt: "A cube of side 1 cm is cut into cubes of side 1 nm. By what factor does the total surface area increase, and what is the new surface area in m²?",
        steps: [
          "Given: \\(L = 1\\ \\text{cm} = 10^{-2}\\ \\text{m}\\); small cube side \\(= 1\\ \\text{nm} = 10^{-9}\\ \\text{m}\\).",
          "Pieces per edge: \\(n = \\dfrac{10^{-2}}{10^{-9}} = 10^{7}\\).",
          "Formula: \\(A = 6L^2 \\times n\\), so the area grows by the factor \\(n = 10^{7}\\).",
          "Original area: \\(6L^2 = 6 \\times (10^{-2}\\ \\text{m})^2 = 6 \\times 10^{-4}\\ \\text{m}^2\\).",
          "New area: \\(6 \\times 10^{-4}\\ \\text{m}^2 \\times 10^{7} = 6 \\times 10^{3}\\ \\text{m}^2\\).",
        ],
        answer: "Ten million times larger: 6000 m²",
      },
      selfCheckExample: {
        prompt: "A cube of side 1 m is cut into cubes of side 1/4 m. Find the total surface area of the pieces.",
        steps: ["Number of pieces: \\(4^3 = 64\\).", "Area: \\(6 \\times (1/4\\ \\text{m})^2 \\times 64 = 24\\ \\text{m}^2\\)."],
        answer: "24 m²",
      },
      practiceSet: [
        { prompt: "A cube of side 1 m is cut into cubes of side 1/10 m. Find the total surface area.", answer: "60 m²" },
        { prompt: "Why do nanoparticles react faster than the same mass of bulk material?", answer: "Their much larger surface area gives more reaction sites" },
        { prompt: "What colour would 100 gold atoms arranged in a cube show?", answer: "Red, unlike the yellow of bulk gold" },
        { prompt: "How does the melting point of sodium clusters compare with that of bulk sodium?", answer: "It is lower, and falls as the cluster gets smaller" },
      ],
      traps: [
        {
          title: "Volume does not change",
          body: "Cutting a solid into nanoparticles increases only the surface area. The total volume stays the same.",
        },
        {
          title: "Smaller clusters melt lower, not higher",
          body: "Melting point falls as size falls: 1000-atom sodium clusters melt below 10,000-atom clusters, and both below bulk sodium.",
        },
      ],
    },
  ],
};
