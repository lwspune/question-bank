import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_BO_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Bond Counting and Molecular Structure",
  title: "Molecular Shapes and Bond Counting",
  oneLineDefinition:
    "How hybridisation sets a molecule's shape, from linear HCN to trigonal bipyramidal PCl₅, and how to count sigma and pi bonds.",
  whyItMatters:
    "Three CDS questions, two of them in 2019 (I): a match of four molecules to their shapes, and the hybridisation of PCl₅ (HARD). The third counts the single bonds in cyclohexane.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschbo-shapes",
      name: "Hybridisation and molecular shape",
      intuition:
        "Electron pairs around a central atom push each other as far apart as possible. Count the bonding pairs and lone pairs around the centre, and the shape follows. Lone pairs take up room but are not seen in the shape, so ammonia is a pyramid, not a tetrahedron.",
      definition:
        "Count the electron groups (bonds + lone pairs) on the central atom:\n" +
        "- **2 groups — sp — linear**: BeCl₂, CO₂, HCN.\n" +
        "- **3 groups — sp² — trigonal planar**: BF₃, HCHO.\n" +
        "- **4 groups — sp³ — tetrahedral**: CH₄, CH₃F. With one lone pair: **trigonal pyramidal** (NH₃). With two: bent (H₂O).\n" +
        "- **5 groups — sp³d (dsp³) — trigonal bipyramidal**: PCl₅.\n" +
        "- **6 groups — sp³d² — octahedral**: SF₆.",
      table: {
        columns: ["Molecule", "Hybridisation", "Shape"],
        rows: [
          { cells: ["HCN", "sp", "Linear"] },
          { cells: ["HCHO", "sp²", "Trigonal planar"] },
          { cells: ["CH₃F", "sp³", "Tetrahedral"] },
          { cells: ["NH₃", "sp³ (one lone pair)", "Trigonal pyramidal"] },
          {
            cells: ["PCl₅", "sp³d (dsp³)", "Trigonal bipyramidal"],
            pyqExampleId: "976309cc-958f-4591-a655-7efd0327d954",
          },
          { cells: ["SF₆", "sp³d²", "Octahedral"] },
        ],
      },
      pyqExampleId: "544f0ffb-097f-4b97-9ecc-a3065b76897b",
      selfCheckExample: {
        prompt: "What are the hybridisation and the shape of BF₃?",
        steps: [
          "Boron has three bonds and no lone pair: 3 electron groups.",
          "3 groups means sp² hybridisation.",
        ],
        answer: "sp², trigonal planar.",
      },
      practiceSet: [
        { prompt: "What is the shape of a CO₂ molecule?", answer: "Linear" },
        { prompt: "What is the hybridisation of carbon in methane?", answer: "sp³" },
        { prompt: "What is the shape of SF₆?", answer: "Octahedral" },
      ],
      traps: [
        {
          title: "Ammonia is a pyramid, not a tetrahedron",
          body: "NH₃ has four electron groups (sp³), but one is a lone pair, so the atoms form a **trigonal pyramid**. CH₄ and CH₃F, with no lone pair, are tetrahedral.",
        },
        {
          title: "Five groups need a d orbital",
          body: "PCl₅'s five bonds need five hybrid orbitals: one s, three p and one d, so **sp³d (dsp³)**. sp³ gives only four.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschbo-bond-count",
      name: "Counting sigma and pi bonds",
      intuition:
        "Every bond between two atoms has exactly one sigma bond. A double bond adds one pi bond, a triple bond adds two. So count the bonds in the structure, then split each into its sigma and pi parts.",
      definition:
        "The count:\n" +
        "- **Single bond** = 1 σ. **Double bond** = 1 σ + 1 π. **Triple bond** = 1 σ + 2 π.\n" +
        "- A **saturated** compound (only single bonds) has **no pi bonds**; every bond is a single (sigma) bond.\n" +
        "- Total bonds in a hydrocarbon = C–C bonds + C–H bonds.",
      formula: {
        label: "Sigma and pi bonds",
        latex: "\\text{single} = 1\\sigma \\qquad \\text{double} = 1\\sigma + 1\\pi \\qquad \\text{triple} = 1\\sigma + 2\\pi",
      },
      authoredExample: {
        prompt: "How many sigma and pi bonds are there in ethene, C₂H₄ (CH₂=CH₂)?",
        steps: [
          "Four C–H single bonds: 4 σ.",
          "One C=C double bond: 1 σ + 1 π.",
          "Total: 5 σ and 1 π.",
        ],
        answer: "5 sigma and 1 pi bond.",
      },
      selfCheckExample: {
        prompt: "How many sigma and pi bonds are there in ethyne, C₂H₂ (HC≡CH)?",
        steps: [
          "Two C–H single bonds: 2 σ.",
          "One C≡C triple bond: 1 σ + 2 π.",
        ],
        answer: "3 sigma and 2 pi bonds.",
      },
      pyqExampleId: "d612a062-4c5d-4137-9590-de20d71e8bbc",
      practiceSet: [
        { prompt: "How many sigma bonds are in methane, CH₄?", answer: "4" },
        { prompt: "How many pi bonds does a triple bond contain?", answer: "2" },
        { prompt: "How many pi bonds does a saturated hydrocarbon have?", answer: "None" },
      ],
      traps: [
        {
          title: "Count the C–H bonds too",
          body: "A ring of six carbons has 6 C–C bonds, but a hydrocarbon's total also includes every C–H bond. Leaving them out undercounts badly.",
        },
        {
          title: "Saturated means zero pi bonds",
          body: "Saturated compounds, cycloalkanes included, have only single bonds. A ring is not a double bond.",
        },
      ],
    },
  ],
};
