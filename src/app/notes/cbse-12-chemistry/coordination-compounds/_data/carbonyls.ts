import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_CARBONYLS_NOTE: SubtopicNote = {
  subtopicName: "Bonding in Metal Carbonyls",
  title: "Bonding in Metal Carbonyls: Synergic Bonding",
  oneLineDefinition:
    "The shapes of the common homoleptic metal carbonyls and the synergic bonding in them: a sigma bond from CO to the metal and a pi bond from the metal back to CO.",
  whyItMatters:
    "1 question, the NCERT exercise on the nature of bonding in metal carbonyls. No board paper from 2022 to 2026 set a question on this page alone, but in 2025 the board asked why CO is a stronger complexing agent than NH₃, and the answer is the synergic bonding taught here. The carbonyls [Ni(CO)₄] and [Fe(CO)₅] also turn up in oxidation state and hybridisation questions every year.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbccc-carbonyl",
      name: "Metal carbonyls and synergic bonding",
      intuition:
        "Carbon monoxide gives and takes at the same time. It gives the lone pair on its carbon to an empty orbital of the metal. The metal, now rich in electrons, pushes some back from a filled d orbital into an empty orbital of CO. Each push makes the other easier, so the two together hold far more strongly than either alone. That two-way bonding is called synergic.",
      definition:
        "- **Homoleptic carbonyls** contain carbonyl ligands only and are formed by most transition metals. The metal is in the zero oxidation state.\n" +
        "- Tetracarbonylnickel(0) is **tetrahedral**, pentacarbonyliron(0) is **trigonal bipyramidal**, hexacarbonylchromium(0) is **octahedral**.\n" +
        "- Decacarbonyldimanganese(0) is two square pyramidal \\(\\text{Mn}(\\text{CO})_5\\) units joined by a Mn-Mn bond. Octacarbonyldicobalt(0) has a Co-Co bond bridged by two CO groups.\n" +
        "- The metal-carbon bond has both \\(\\sigma\\) and \\(\\pi\\) character.\n" +
        "- **M-C \\(\\sigma\\) bond:** the lone pair on the carbonyl carbon is donated into a vacant orbital of the metal (ligand to metal).\n" +
        "- **M-C \\(\\pi\\) bond:** a pair of electrons from a filled d orbital of the metal is donated into the vacant antibonding \\(\\pi^{*}\\) orbital of CO (metal to ligand).\n" +
        "- The metal to ligand bonding creates a **synergic effect** which strengthens the bond between CO and the metal and gives metal carbonyls their stability.",
      table: {
        columns: ["Carbonyl", "IUPAC name", "Shape"],
        rows: [
          { cells: ["[Ni(CO)₄]", "Tetracarbonylnickel(0)", "Tetrahedral"] },
          { cells: ["[Fe(CO)₅]", "Pentacarbonyliron(0)", "Trigonal bipyramidal"] },
          { cells: ["[Cr(CO)₆]", "Hexacarbonylchromium(0)", "Octahedral"] },
          { cells: ["[Mn₂(CO)₁₀]", "Decacarbonyldimanganese(0)", "Two square pyramidal Mn(CO)₅ units joined by a Mn-Mn bond"] },
          { cells: ["[Co₂(CO)₈]", "Octacarbonyldicobalt(0)", "Co-Co bond bridged by two CO groups"] },
        ],
      },
      selfCheckExample: {
        prompt: "Give the oxidation state of iron and the shape of \\([\\text{Fe}(\\text{CO})_5]\\).",
        steps: ["CO is neutral and the carbonyl is neutral, so \\(x + 5(0) = 0\\): iron is 0.", "Pentacarbonyliron(0) is trigonal bipyramidal."],
        answer: "Oxidation state 0; trigonal bipyramidal",
      },
      practiceSet: [
        { prompt: "Which bond in a metal carbonyl is formed by donation from the metal to the ligand?", answer: "The M-C \\(\\pi\\) bond: a filled metal d orbital donates into the vacant \\(\\pi^{*}\\) orbital of CO" },
        { prompt: "Name \\([\\text{Cr}(\\text{CO})_6]\\) and give its shape.", answer: "Hexacarbonylchromium(0); octahedral" },
        { prompt: "Why is the bonding in metal carbonyls called synergic?", answer: "The \\(\\sigma\\) donation and the \\(\\pi\\) back donation strengthen each other, making the metal-carbon bond stronger" },
      ],
      pyqExampleId: "24e72b1e-cf16-46cf-a411-f29255aa165e",
      traps: [
        {
          title: "Reversing the two donations",
          body: "The \\(\\sigma\\) bond is ligand to metal (the carbon lone pair). The \\(\\pi\\) bond is metal to ligand (a filled d orbital into \\(\\pi^{*}\\) of CO). Write the direction of each.",
        },
        {
          title: "Leaving out the word synergic",
          body: "A full answer names both bonds and then says they reinforce each other: the synergic effect. That last sentence is the mark most often dropped.",
        },
      ],
    },
  ],
};
