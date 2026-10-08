import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_BACTERIA_NOTE: SubtopicNote = {
  subtopicName: "Bacteria",
  title: "Bacteria: Structure, Growth and Gene Transfer",
  oneLineDefinition:
    "Bacteria are prokaryotes: single cells with a circular chromosome loose in the cytoplasm, 70S ribosomes and a peptidoglycan wall, which divide by binary fission and swap genes sideways.",
  whyItMatters:
    "The ministry papers keep returning to this page: prokaryotic DNA in 2023, then flagella, ribosomes and bacterial transformation, all in 2026. The older papers asked which cells carry circular DNA (2020). Every one was a single fact, so learn the tables exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mbt-prokaryote-cell",
      name: "The prokaryotic cell and its structures",
      intuition:
        "A bacterium is a small, simple cell with no nucleus and no membrane-bound organelles. Everything happens in one compartment: the DNA sits in the cytoplasm, so a ribosome can start translating an mRNA while it is still being transcribed. Most of the extra parts (wall, capsule, flagellum, pili) are on the outside and help the cell survive, move or stick.",
      definition:
        "**Prokaryotes** (bacteria and archaea) differ from eukaryotes in these ways:\n" +
        "- **No nucleus**: the DNA lies in a region of the cytoplasm called the **nucleoid**.\n" +
        "- The main chromosome is usually **one circular, double-stranded DNA molecule**. It is not wrapped round histones into chromatin as in our nuclei, and its genes usually have **no introns**.\n" +
        "- Small extra circles of DNA, **plasmids**, may also be present.\n" +
        "- **70S ribosomes** (smaller than the 80S ribosomes in eukaryotic cytoplasm) lie free in the cytoplasm. Translation happens there.\n" +
        "- **No membrane-bound organelles**: no mitochondria, chloroplasts, ER or Golgi. Respiration enzymes sit on the plasma membrane.\n" +
        "- They divide by **binary fission**, never by mitosis or meiosis. Typical size: 1 to 5 µm.",
      table: {
        columns: ["Structure", "What it is", "Job"],
        rows: [
          { cells: ["Nucleoid", "Region holding the circular chromosome, no membrane around it", "Carries the genes the cell needs to live"] },
          { cells: ["Plasmid", "Small circle of DNA, copied independently of the chromosome", "Extra genes, for example antibiotic resistance; can pass to other bacteria"] },
          { cells: ["Ribosomes (70S)", "rRNA and protein, free in the cytoplasm", "Protein synthesis (translation)"] },
          { cells: ["Cell wall", "**Peptidoglycan** (murein): sugars cross-linked by short peptides", "Keeps the shape and stops the cell bursting by osmosis"] },
          { cells: ["Capsule (slime layer)", "Polysaccharide layer outside the wall, in some species", "Protects from drying and from being engulfed by white cells"] },
          { cells: ["Flagellum", "Long protein filament turned by a motor in the membrane", "**Movement** (swimming)"] },
          { cells: ["Pili and fimbriae", "Short, thin protein hairs", "Sticking to surfaces and cells; the sex pilus links two cells in conjugation"] },
          { cells: ["Endospore (some species)", "Tough dormant form with a thick coat", "Survives heat and drying; it is not a way of reproducing"] },
        ],
        caption: "Every bacterium has a membrane, cytoplasm, ribosomes and a nucleoid; capsule, flagella, pili, plasmids and spores are found only in some.",
      },
      selfCheckExample: {
        prompt: "Which of the following is found in a typical bacterial cell but NOT in a human liver cell?",
        options: ["Ribosomes", "A peptidoglycan cell wall", "Circular DNA", "A plasma membrane", "DNA polymerase"],
        steps: [
          "Human cells have no cell wall at all, and peptidoglycan is found only in bacteria. So B is the answer.",
          "Ribosomes, a plasma membrane and DNA polymerase are in every living cell (A, D, E).",
          "C is the classic trap: a liver cell is full of mitochondria, and each mitochondrion has its own small circular DNA.",
        ],
        answer: "(B) A peptidoglycan cell wall",
      },
      practiceSet: [
        { prompt: "Where in a bacterium is the main chromosome found?", answer: "In the cytoplasm, in a region called the nucleoid", method: "There is no nuclear membrane" },
        { prompt: "What size are bacterial ribosomes, and what size are those in human cytoplasm?", answer: "70S in bacteria; 80S in human cytoplasm" },
        { prompt: "Which structure lets a bacterium swim towards food?", answer: "The flagellum" },
        { prompt: "Name the polymer that makes up the bacterial cell wall.", answer: "Peptidoglycan (murein)" },
      ],
      traps: [
        {
          title: "Circular DNA is not only in prokaryotes",
          body: "Mitochondria and chloroplasts carry their own circular DNA, and yeast often carries a small circular plasmid too. So a human, plant or yeast cell also contains circular DNA. What only prokaryotes have is a circular **main chromosome** lying free in the cytoplasm.",
        },
        {
          title: "Prokaryotic DNA has no chromatin, introns or meiosis",
          body: "Any feature borrowed from our own nuclei describes a eukaryote, not a bacterium. Bacterial DNA is circular, lies in the cytoplasm, is not packed on histones into chromatin, mostly lacks introns, and is shared out by binary fission.",
        },
        {
          title: "Flagella move the cell; pili attach it",
          body: "The flagellum is for movement and nothing else. Sticking to surfaces and joining to another cell for conjugation are jobs of the pili.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-gram-stain",
      name: "Gram staining and bacterial shapes",
      intuition:
        "The Gram stain sorts bacteria into two groups by their wall. A thick peptidoglycan wall traps the purple dye even when it is washed with alcohol. A thin wall covered by an outer membrane lets the alcohol wash the purple out, so those cells take up the pink counterstain instead.",
      definition:
        "The **Gram stain** has four steps:\n" +
        "- **Crystal violet** stains every cell purple.\n" +
        "- **Iodine** fixes the dye inside the cell.\n" +
        "- **Alcohol (or acetone)** washes the dye out of Gram-negative cells only.\n" +
        "- **Safranin**, a red counterstain, colours the now colourless Gram-negative cells pink.\n" +
        "Bacteria are also named by **shape**: **cocci** are spheres (Staphylococcus in clusters, Streptococcus in chains), **bacilli** are rods (E. coli), **spirilla** are spirals and **vibrios** are comma-shaped (Vibrio cholerae).",
      table: {
        columns: ["Feature", "Gram-positive", "Gram-negative"],
        rows: [
          { cells: ["Peptidoglycan layer", "Thick", "Thin"] },
          { cells: ["Outer membrane (with lipopolysaccharide)", "Absent", "Present, outside the thin wall"] },
          { cells: ["After the alcohol wash", "Keeps the crystal violet", "Loses the crystal violet"] },
          { cells: ["Colour seen", "**Purple**", "**Pink or red**"] },
          { cells: ["Examples", "Staphylococcus, Streptococcus, Bacillus, Clostridium", "E. coli, Salmonella, Vibrio cholerae, Neisseria"] },
          { cells: ["Penicillin", "Usually more sensitive", "Usually less sensitive: the outer membrane keeps many drugs out"] },
        ],
      },
      selfCheckExample: {
        prompt: "After a Gram stain, a rod-shaped bacterium looks pink under the light microscope. What can be concluded about it?",
        options: [
          "It has a thick peptidoglycan wall and no outer membrane",
          "It is a coccus",
          "It kept the crystal violet through the alcohol wash",
          "It has a thin peptidoglycan layer and an outer membrane",
          "It cannot cause disease",
        ],
        steps: [
          "Pink means the crystal violet was washed out and the safranin counterstain was taken up: the cell is Gram-negative.",
          "Gram-negative cells have a thin peptidoglycan layer under an outer membrane, so D is correct.",
          "A and C describe Gram-positive cells. B contradicts the rod shape. E is false: many Gram-negative bacteria (Salmonella, Vibrio) are pathogens.",
        ],
        answer: "(D) It has a thin peptidoglycan layer and an outer membrane",
      },
      practiceSet: [
        { prompt: "Which reagent in the Gram stain removes the dye from Gram-negative cells?", answer: "Alcohol (or acetone)" },
        { prompt: "What colour are Gram-positive cells at the end of the stain?", answer: "Purple" },
        { prompt: "What shape is a bacillus?", answer: "A rod" },
        { prompt: "Why is the safranin step needed?", answer: "Without it the decolourised Gram-negative cells would be invisible", method: "It is a counterstain" },
      ],
      traps: [
        {
          title: "Gram-negative does not mean no wall",
          body: "Gram-negative bacteria still have a peptidoglycan wall; it is just thin, with an outer membrane around it. Their extra outer membrane makes them harder for many antibiotics to enter, not easier.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mbt-growth",
      name: "Binary fission and the bacterial growth curve",
      intuition:
        "In binary fission one cell copies its chromosome and splits into two identical cells. If every cell divides once per doubling time, the population multiplies by 2 each time: 1, 2, 4, 8, 16. That is exponential growth, so after n generations you multiply by \\(2^n\\), not by n. Growth stops when food runs out and waste builds up.",
      definition:
        "**Binary fission**: the circular chromosome is copied, the two copies move apart as the cell grows, and the cell splits into two genetically identical daughter cells (no spindle, no mitosis).\n" +
        "- **Generation (doubling) time**: the time for the population to double; about 20 minutes for E. coli in ideal conditions.\n" +
        "A culture in a closed flask passes through four phases:\n" +
        "- **Lag phase**: cells adjust to the medium and make enzymes; numbers hardly rise.\n" +
        "- **Log (exponential) phase**: constant doubling time; a straight line on a log scale.\n" +
        "- **Stationary phase**: nutrients run short and waste builds up, so new cells balance dying cells.\n" +
        "- **Death (decline) phase**: more cells die than divide.",
      formula: {
        label: "Number of bacteria after n doublings",
        latex: "N = N_0 \\times 2^{n} \\qquad n = \\frac{t}{t_d}",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "number of cells at the start" },
          { symbol: "\\(N\\)", meaning: "number of cells after time t" },
          { symbol: "\\(n\\)", meaning: "number of generations (doublings)" },
          { symbol: "\\(t_d\\)", meaning: "doubling (generation) time, in the same units as t" },
        ],
      },
      authoredExample: {
        prompt:
          "A culture starts with 500 bacteria in the log phase. The doubling time is 20 minutes. How many bacteria are there after 2 hours?",
        steps: [
          "Use the same units: 2 hours = 120 minutes.",
          "Number of generations: \\(n = 120 / 20 = 6\\).",
          "\\(N = 500 \\times 2^6 = 500 \\times 64 = 32\\,000 = 3.2 \\times 10^4\\).",
        ],
        answer: "\\(3.2 \\times 10^4\\) bacteria",
      },
      selfCheckExample: {
        prompt:
          "A flask is inoculated with \\(1.0 \\times 10^3\\) bacteria, which immediately start dividing with a doubling time of 30 minutes. Assuming exponential growth, about how many bacteria are present after 4 hours?",
        options: [
          "\\(8.0 \\times 10^3\\)",
          "\\(1.6 \\times 10^4\\)",
          "\\(2.6 \\times 10^5\\)",
          "\\(1.3 \\times 10^5\\)",
          "\\(2.6 \\times 10^2\\)",
        ],
        steps: [
          "4 hours = 240 minutes, so \\(n = 240 / 30 = 8\\) generations.",
          "\\(N = 1.0 \\times 10^3 \\times 2^8 = 1.0 \\times 10^3 \\times 256 \\approx 2.6 \\times 10^5\\).",
          "A multiplies by 8 instead of \\(2^8\\). B counts 4 doublings (one per hour). D is one generation short. E forgets the starting number.",
        ],
        answer: "(C) \\(2.6 \\times 10^5\\)",
      },
      practiceSet: [
        { prompt: "A population rises from \\(2 \\times 10^3\\) to \\(1.6 \\times 10^4\\) in 90 minutes. What is the doubling time?", answer: "30 minutes", method: "Eight times larger is 3 doublings; 90/3" },
        { prompt: "How many generations pass in 3 hours if the doubling time is 20 minutes?", answer: "9", method: "180/20" },
        { prompt: "In which phase of the growth curve is the doubling time constant?", answer: "The log (exponential) phase" },
        { prompt: "Give two reasons why a culture enters the stationary phase.", answer: "Nutrients run short and toxic waste builds up" },
      ],
      traps: [
        {
          title: "Bacterial growth multiplies, it does not add",
          body: "After n generations the population is \\(2^n\\) times bigger, not n times bigger. Eight doublings give 256 times the starting number, not 8 times. Also count generations, not hours: with a 30 minute doubling time, 4 hours is 8 generations.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-gene-transfer",
      name: "Plasmids and bacterial gene transfer",
      intuition:
        "Bacteria do not reproduce sexually, but they still mix genes. Besides passing DNA down to daughter cells at division, they can pick DNA up sideways from other bacteria, even of other species. This horizontal transfer is why a resistance gene can spread through a whole population quickly.",
      definition:
        "- **Plasmids** are small, circular, double-stranded DNA molecules that copy themselves independently of the chromosome. They carry useful but non-essential genes (antibiotic resistance on **R plasmids**; the **F plasmid** codes for the sex pilus).\n" +
        "- **Vertical** gene transfer: from parent cell to daughter cells by binary fission.\n" +
        "- **Horizontal** gene transfer: between existing cells, by the three processes in the table.\n" +
        "- **Transformation** was discovered by Griffith (1928): harmless pneumococci became deadly after taking up material from heat-killed deadly ones. That material was later shown to be DNA.",
      table: {
        columns: ["Process", "How the DNA moves", "What it needs"],
        rows: [
          { cells: ["**Transformation**", "A cell takes up naked DNA directly from its surroundings, for example from a dead cell", "A competent cell; no contact with another cell, no virus"] },
          { cells: ["**Transduction**", "A bacteriophage carries a piece of bacterial DNA from one bacterium to the next", "A virus as the carrier"] },
          { cells: ["**Conjugation**", "DNA, usually a plasmid copy, passes from a donor to a recipient through a sex pilus", "Direct contact between two living cells"] },
          { cells: ["Binary fission", "A full copy of the DNA goes to each daughter cell", "Cell division (this is vertical transfer)"] },
        ],
      },
      selfCheckExample: {
        prompt: "A virus that infects bacteria picks up a piece of DNA from one bacterium and carries it into another. What is this process called?",
        options: ["Transformation", "Conjugation", "Binary fission", "Translation", "Transduction"],
        steps: [
          "A virus carrying bacterial DNA between cells is transduction, so E.",
          "Transformation (A) is uptake of naked DNA with no carrier. Conjugation (B) needs two bacteria in contact through a pilus.",
          "Binary fission (C) is cell division and translation (D) is protein synthesis; neither moves DNA between cells.",
        ],
        answer: "(E) Transduction",
      },
      practiceSet: [
        { prompt: "A bacterium takes up a fragment of DNA released by a dead cell. Name the process.", answer: "Transformation" },
        { prompt: "Which structure joins two bacteria during conjugation?", answer: "The sex pilus", method: "Coded for by the F plasmid" },
        { prompt: "Which kind of genes do R plasmids carry?", answer: "Antibiotic resistance genes" },
        { prompt: "Is conjugation a form of reproduction?", answer: "No: no new cell is made; DNA passes from one cell to another" },
      ],
      traps: [
        {
          title: "A transformed bacterium has taken up foreign DNA",
          body: "In bacteria, transformation means a cell has taken up DNA from its surroundings and now carries the new genes. It needs no virus and no contact with another cell. It is not a mutation, which changes the cell's own DNA. (In animal cell biology, transformation can also mean a cell becoming cancerous, a different use of the word.)",
        },
      ],
    },
  ],
};
