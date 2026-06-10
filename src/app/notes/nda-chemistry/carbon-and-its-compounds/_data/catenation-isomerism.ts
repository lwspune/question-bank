import type { SubtopicNote } from "@/app/notes/_types";

export const CATENATION_ISOMERISM_NOTE: SubtopicNote = {
  subtopicName: "Catenation, Tetra-valency and Isomerism",
  title: "Tetra-valency, Catenation and Isomerism",
  oneLineDefinition:
    "Carbon forms four covalent bonds and links to itself in chains and rings, so a handful of atoms can be arranged many different ways — which is why carbon has more compounds than any other element.",
  whyItMatters:
    "The foundation of the whole chapter. The bank tests two ideas directly — the properties that make carbon special (tetra-valency + catenation), and counting the structural isomers of a small alkane. " +
    "Get these two right and every later allotrope and functional-group fact has a frame to hang on.",
  concepts: [
    // FOUNDATION — why carbon is unique (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "tetravalency-catenation",
      name: "Why carbon forms so many compounds",
      intuition:
        "Carbon has 4 electrons in its outer shell, so it shares 4 electrons to complete its octet — it forms exactly four covalent bonds (tetra-valency). " +
        "It is also small, so those bonds are strong, and it bonds happily to other carbons — chains, branches and rings of any length (catenation). Four strong bonds plus self-linking is the whole reason organic chemistry exists.",
      definition:
        "The two defining properties and what follows from them:\n" +
        "- **Tetra-valency** — carbon (atomic number 6, configuration 2,4) shares 4 electrons to form **four covalent bonds**.\n" +
        "- **Catenation** — carbon atoms bond to one another in long **chains, branches and rings**; no other element does this to the same extent.\n" +
        "- Carbon forms **single, double and triple** bonds with itself — but **never a quadruple (four) bond**.\n" +
        "- Bonds are **covalent**, so most carbon compounds are **poor conductors** of electricity, have low melting points and are often volatile.",
      pyqExampleId: "235e36a1-e159-46a4-bf7c-365310e5f2a6", // tetravalency / catenation statements
      authoredExample: {
        prompt:
          "Carbon has the electron configuration 2,4. Explain how many bonds it forms and why it cannot form a positive or negative ion easily.",
        steps: [
          "The outer shell holds 4 electrons and needs 8 for a stable octet.",
          "Losing 4 electrons (to become C4+) or gaining 4 (to become C4-) both need too much energy.",
          "So carbon instead SHARES its 4 electrons, forming four covalent bonds.",
        ],
        answer:
          "Carbon forms four covalent bonds (tetra-valency); ionising it four times over is energetically impossible, so it bonds by sharing.",
      },
      practiceSet: [
        { prompt: "How many covalent bonds does a carbon atom form?", answer: "Four" },
        { prompt: "What is the name for carbon's ability to bond to other carbon atoms in chains and rings?", answer: "Catenation" },
        { prompt: "What is the maximum bond order between two carbon atoms?", answer: "Three (a triple bond)", method: "carbon forms single, double or triple bonds — never quadruple" },
        { prompt: "Are most carbon compounds good or poor conductors of electricity?", answer: "Poor conductors", method: "they are covalent, with no free ions or electrons" },
      ],
      traps: [
        {
          title: "Carbon forms a triple bond, not a 'four' bond",
          body:
            "A statement that 'carbon forms compounds with quadruple bonds between carbon atoms' is **false**. The maximum is a triple bond (as in ethyne, HC≡CH).",
        },
        {
          title: "Covalent means poor conductor",
          body:
            "'Most carbon compounds are good conductors of electricity' is **NOT correct** — covalent compounds have no free charges. (Graphite is the famous exception, because of its delocalised electrons.)",
        },
      ],
    },

    // structural isomerism — counting (formula variant)
    {
      kind: "formula" as const,
      slug: "structural-isomerism",
      name: "Structural isomerism and counting isomers",
      intuition:
        "The same molecular formula can be built in more than one way — straight chain, branched chain, or a different branch position. These are structural isomers: same atoms, different skeletons, different compounds. " +
        "For the small alkanes the bank simply asks 'how many isomers?', so learn the running count.",
      definition:
        "Structural isomers share a **molecular formula** but differ in the **arrangement of atoms**. The number of chain isomers of the straight-chain alkanes:\n" +
        "- **C4H10 (butane)** → **2** isomers (n-butane, isobutane).\n" +
        "- **C5H12 (pentane)** → **3** isomers (n-pentane, isopentane, neopentane).\n" +
        "- **C6H14 (hexane)** → **5** isomers.\n" +
        "Methane, ethane and propane have **no** chain isomers (only one possible skeleton).",
      formula: {
        label: "Structural isomer counts (alkanes)",
        latex: "\\text{C}_4\\text{H}_{10}\\!: 2 \\qquad \\text{C}_5\\text{H}_{12}\\!: 3 \\qquad \\text{C}_6\\text{H}_{14}\\!: 5",
      },
      pyqExampleId: "9311d665-145d-4f52-80ad-110652ed7ccd", // pentane has 3 isomers
      authoredExample: {
        prompt: "How many structural isomers does butane (C4H10) have? Name them.",
        steps: [
          "Draw the straight chain of 4 carbons: n-butane.",
          "Move one carbon to a branch: a 3-carbon chain with a methyl branch on the middle carbon — isobutane (2-methylpropane).",
          "No further distinct skeleton is possible for 4 carbons.",
        ],
        answer: "Two structural isomers: n-butane and isobutane (2-methylpropane).",
      },
      selfCheckExample: {
        prompt: "How many structural isomers does hexane (C6H14) have?",
        steps: [
          "n-hexane (straight chain).",
          "2-methylpentane and 3-methylpentane (one methyl branch, two positions).",
          "2,2-dimethylbutane and 2,3-dimethylbutane (two methyl branches).",
        ],
        answer: "Five structural isomers.",
      },
      practiceSet: [
        { prompt: "Number of structural isomers of pentane (C5H12)?", answer: "3" },
        { prompt: "Number of structural isomers of propane (C3H8)?", answer: "1", method: "only one skeleton is possible" },
        { prompt: "Number of structural isomers of hexane (C6H14)?", answer: "5" },
      ],
      traps: [
        {
          title: "Pentane has 3 isomers, not 5",
          body:
            "Students confuse the number of carbons with the number of isomers. C5H12 has **3** isomers (the carbon count is 5, the isomer count is 3). Hexane (6 carbons) is the one with 5 isomers.",
        },
      ],
    },
  ],
};
