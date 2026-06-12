import type { SubtopicNote } from "@/app/notes/_types";

export const PROTEIN_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Protein Structure",
  title: "Biomolecules and Protein Structure",
  oneLineDefinition:
    "Living things are built from four kinds of biomolecule — carbohydrates, proteins, lipids and nucleic acids; proteins are chains of amino acids joined by peptide bonds, folded through four structural levels.",
  whyItMatters:
    "The NDA tests this as a single recall fact — most often the four levels of protein structure, where a 'linear sequence of amino acids joined by peptide bonds' is the primary structure. " +
    "Learn the four biomolecules and the primary → secondary → tertiary → quaternary ladder, and the marks are yours. EASY recall.",
  concepts: [
    // Foundation — the four biomolecules (no PYQ)
    {
      kind: "formula" as const,
      slug: "biochem-biomolecules",
      name: "The four biomolecules of life",
      intuition:
        "Every living cell is built from four families of large molecules. Each is a polymer — a long chain assembled from small repeating units (monomers). " +
        "Knowing which monomer builds which biomolecule is the foundation for everything else in this chapter.",
      definition:
        "The four classes of biomolecule and their building blocks:\n" +
        "- **Carbohydrates** — monomer is a **monosaccharide** (e.g. glucose); store and supply energy (starch, glycogen, cellulose).\n" +
        "- **Proteins** — monomer is an **amino acid**; build tissues, act as enzymes and hormones.\n" +
        "- **Lipids** (fats and oils) — built from **fatty acids + glycerol**; long-term energy store and cell membranes.\n" +
        "- **Nucleic acids** (DNA, RNA) — monomer is a **nucleotide**; store and carry genetic information.\n" +
        "Enzymes — biological catalysts that speed up reactions — are themselves **proteins**.",
      authoredExample: {
        prompt:
          "Glycogen, an energy store in the liver, is a long chain of glucose units. Which class of biomolecule is it, and what is its monomer?",
        steps: [
          "Glucose is a monosaccharide (a simple sugar).",
          "A polymer of monosaccharides is a carbohydrate.",
        ],
        answer: "Glycogen is a carbohydrate; its monomer is glucose (a monosaccharide).",
      },
    },

    // Protein structure levels (REFERENCE; PYQ 41f7058e primary structure) + diagram
    {
      kind: "reference" as const,
      slug: "biochem-protein-levels",
      name: "The four levels of protein structure",
      intuition:
        "A protein is a chain of amino acids that folds up into a precise 3-D shape — and that shape decides what the protein does. " +
        "Biologists describe the folding in four levels, from the bare sequence (primary) up to an assembly of several chains (quaternary). The NDA's favourite is the primary level: a linear sequence of amino acids joined by peptide bonds.",
      definition:
        "The four levels, in order. Amino acids are linked by **peptide bonds**; the bonds that hold the higher folds are mostly **hydrogen bonds** and other weak interactions.",
      table: {
        columns: ["Level", "What it is"],
        rows: [
          {
            cells: [
              "**Primary**",
              "The linear **sequence of amino acids** joined by **peptide bonds**",
            ],
            noteAmber:
              "'A linear sequence of amino acids linked by peptide bonds' = PRIMARY structure — the bank's exact phrasing.",
          },
          {
            cells: [
              "**Secondary**",
              "Local coiling/folding into an **α-helix** or **β-pleated sheet**, held by hydrogen bonds",
            ],
          },
          {
            cells: [
              "**Tertiary**",
              "The overall **3-D folded shape** of a single polypeptide chain",
            ],
          },
          {
            cells: [
              "**Quaternary**",
              "Two or more folded chains (subunits) assembled together (e.g. **haemoglobin** = 4 subunits)",
            ],
          },
        ],
        caption:
          "Primary = sequence; Secondary = helix/sheet; Tertiary = 3-D fold of one chain; Quaternary = several chains together.",
      },
      visualizationSlug: "biochem-protein-structure-levels",
      selfCheckExample: {
        prompt:
          "Haemoglobin is made of four separate folded polypeptide chains held together. Which level of protein structure does this describe?",
        steps: [
          "A single folded chain is tertiary structure.",
          "Several folded chains (subunits) joined together is the next level up.",
        ],
        answer: "Quaternary structure.",
      },
      practiceSet: [
        { prompt: "Which level is a linear sequence of amino acids joined by peptide bonds?", answer: "Primary structure" },
        { prompt: "Which level is the α-helix or β-pleated sheet?", answer: "Secondary structure", method: "held by hydrogen bonds" },
        { prompt: "Which bond links amino acids in a protein chain?", answer: "Peptide bond" },
        { prompt: "Haemoglobin's four-subunit assembly is which level?", answer: "Quaternary structure" },
      ],
      pyqExampleId: "41f7058e-c9e3-42f0-bd4e-7c417e1fbb19", // primary structure
      traps: [
        {
          title: "Linear sequence + peptide bonds = PRIMARY, not secondary",
          body:
            "The stem 'linear sequence of amino acids linked by peptide bonds' is the **primary** structure. Secondary (helix/sheet), tertiary (3-D fold) and quaternary (multiple chains) are the distractors. Peptide bonds define the primary chain; hydrogen bonds shape the higher levels.",
        },
      ],
    },
  ],
};
