import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CC_HYDROCARBONS_NOTE: SubtopicNote = {
  subtopicName: "Carbon Bonding and Hydrocarbons",
  title: "Carbon Bonding and Hydrocarbons",
  oneLineDefinition:
    "Carbon shares its four valence electrons to make covalent bonds, links to itself in chains and rings, and so forms whole families of hydrocarbons.",
  whyItMatters:
    "Seven questions in the bank, two EASY and five MODERATE, and two of them are from the 2022 paper (naming a ring of six carbons drawn in a figure). The others count the covalent bonds in an alkane, pick out graphite, find a compound with one single and one triple bond, and test the homologous series and isomers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicchy-bonds",
      name: "Covalent bonds and how to count them",
      intuition:
        "Carbon has 4 valence electrons. Losing or gaining 4 would cost too much energy, so carbon shares them instead: each shared pair is one covalent bond. Carbon can also join other carbon atoms in long chains, which is why there are so many carbon compounds.",
      definition:
        "- Carbon is **tetravalent**: it always makes 4 bonds.\n" +
        "- **Catenation** is carbon's power to bond to other carbon atoms in chains, branches and rings.\n" +
        "- A **single** bond shares one pair of electrons, a **double** bond two pairs, a **triple** bond three pairs.\n" +
        "- To count the bonds in an alkane with \\(n\\) carbons: \\(n - 1\\) carbon-carbon bonds plus \\(2n + 2\\) carbon-hydrogen bonds.\n" +
        "- Covalent compounds have no ions, so they are mostly poor conductors with low melting and boiling points.",
      formula: {
        label: "Covalent bonds in an alkane",
        latex: "\\text{bonds in } \\mathrm{C}_n\\mathrm{H}_{2n+2} = (n - 1) + (2n + 2) = 3n + 1",
        symbols: [{ symbol: "n", meaning: "number of carbon atoms" }],
      },
      authoredExample: {
        prompt: "How many covalent bonds are there in a molecule of propane, \\(\\mathrm{C_3H_8}\\)?",
        steps: [
          "A chain of 3 carbons has 2 carbon-carbon bonds.",
          "Each of the 8 hydrogens makes one carbon-hydrogen bond: 8 bonds.",
          "Total \\(= 2 + 8 = 10\\). Check: \\(3 \\times 3 + 1 = 10\\).",
        ],
        answer: "10 covalent bonds",
      },
      selfCheckExample: {
        prompt: "How many covalent bonds are there in a molecule of ethane, \\(\\mathrm{C_2H_6}\\)?",
        steps: ["1 carbon-carbon bond and 6 carbon-hydrogen bonds.", "\\(1 + 6 = 7\\). Check: \\(3 \\times 2 + 1 = 7\\)."],
        answer: "7",
      },
      practiceSet: [
        { prompt: "How many covalent bonds are there in methane, \\(\\mathrm{CH_4}\\)?", answer: "4" },
        { prompt: "How many covalent bonds are there in butane, \\(\\mathrm{C_4H_{10}}\\)?", answer: "13 (3 carbon-carbon and 10 carbon-hydrogen)" },
        { prompt: "How many valence electrons does a carbon atom have?", answer: "4" },
        { prompt: "What is the name for carbon's power to form long chains of carbon atoms?", answer: "Catenation" },
        { prompt: "How many pairs of electrons are shared in a triple bond?", answer: "3 pairs (6 electrons)" },
      ],
      pyqExampleId: "214d3fee-1416-4f38-9b94-1e3a9af2c134",
      traps: [
        {
          title: "Counting only the carbon-hydrogen bonds",
          body:
            "The number of hydrogens is not the number of bonds. An alkane with \\(n\\) carbons also has \\(n - 1\\) carbon-carbon bonds, so the total is \\(3n + 1\\).",
        },
        {
          title: "Thinking carbon forms ions",
          body:
            "Carbon neither loses nor gains 4 electrons. It shares them, so its compounds are covalent and do not conduct electricity.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicchy-allotropes",
      name: "Allotropes of carbon",
      intuition:
        "Diamond, graphite and fullerene are all pure carbon. They look and behave differently only because their atoms are joined in different patterns.",
      definition:
        "- **Allotropes** are different forms of the same element.\n" +
        "- In **diamond** each carbon bonds to **4** others in a rigid three-dimensional network: very hard, does not conduct.\n" +
        "- In **graphite** each carbon bonds to **3** others in flat **hexagonal layers** stacked one above another. The layers slide, so graphite is soft and slippery, and the fourth electron of each carbon is free, so graphite **conducts electricity**.\n" +
        "- **Fullerenes** are cages of carbon atoms. The best known, \\(\\mathrm{C_{60}}\\) (buckminsterfullerene), is shaped like a football.",
      table: {
        columns: ["Allotrope", "Each carbon bonds to", "Structure", "Key property"],
        rows: [
          { cells: ["Diamond", "4 carbons", "Rigid three-dimensional network", "Hardest natural substance, does not conduct"] },
          {
            cells: ["Graphite", "3 carbons", "Hexagonal layers, one above another", "Soft, slippery, conducts electricity"],
            noteAmber: "Graphite is the only one of the three that conducts.",
          },
          { cells: ["Fullerene", "3 carbons", "Closed cage, \\(\\mathrm{C_{60}}\\) is a football shape", "Separate molecules, not one giant network"] },
        ],
        caption: "Same atoms, different arrangements: that is what allotropes means.",
      },
      selfCheckExample: {
        prompt: "Graphite conducts electricity but diamond does not. Why?",
        steps: [
          "In graphite each carbon uses only 3 of its 4 valence electrons in bonds.",
          "The fourth electron is free to move. In diamond all 4 are used in bonds.",
        ],
        answer: "Graphite has free electrons; diamond has none.",
      },
      practiceSet: [
        { prompt: "Which allotrope of carbon is the hardest natural substance?", answer: "Diamond" },
        { prompt: "How many carbon atoms are in one molecule of buckminsterfullerene?", answer: "60" },
        { prompt: "In diamond, to how many other carbon atoms is each carbon bonded?", answer: "4" },
        { prompt: "Which allotrope of carbon is used as a dry lubricant?", answer: "Graphite (its layers slide)" },
      ],
      pyqExampleId: "167a1444-10e7-4742-b0ed-f15d6a6e2f5e",
      traps: [
        {
          title: "Calling diamond a conductor because it is carbon",
          body: "Diamond does not conduct: every valence electron is held in a bond. Graphite conducts because one electron per carbon is free.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicchy-families",
      name: "Alkanes, alkenes, alkynes and rings",
      intuition:
        "Hydrocarbons contain only carbon and hydrogen. If every carbon-carbon bond is single, the compound is saturated. One double or triple bond makes it unsaturated. The name tells you which: -ane, -ene or -yne, with a prefix for the number of carbons.",
      definition:
        "- **Saturated**: only single bonds (alkanes). **Unsaturated**: a double bond (alkenes) or a triple bond (alkynes).\n" +
        "- Prefixes count the carbons: **meth** 1, **eth** 2, **prop** 3, **but** 4, **pent** 5, **hex** 6.\n" +
        "- A **cyclo** compound has its carbons in a ring. Cyclohexane is a ring of 6 carbons with single bonds only.\n" +
        "- **Benzene**, \\(\\mathrm{C_6H_6}\\), is a ring of 6 carbons with alternate single and double bonds.",
      table: {
        columns: ["Family", "General formula", "Bonds", "Example"],
        rows: [
          { cells: ["Alkane", "\\(\\mathrm{C}_n\\mathrm{H}_{2n+2}\\)", "Single only", "Methane \\(\\mathrm{CH_4}\\), propane \\(\\mathrm{C_3H_8}\\)"] },
          { cells: ["Alkene", "\\(\\mathrm{C}_n\\mathrm{H}_{2n}\\)", "One double bond", "Ethene \\(\\mathrm{C_2H_4}\\), propene \\(\\mathrm{C_3H_6}\\)"] },
          { cells: ["Alkyne", "\\(\\mathrm{C}_n\\mathrm{H}_{2n-2}\\)", "One triple bond", "Ethyne \\(\\mathrm{C_2H_2}\\), propyne \\(\\mathrm{C_3H_4}\\)"] },
          {
            cells: ["Cycloalkane", "\\(\\mathrm{C}_n\\mathrm{H}_{2n}\\)", "Ring of single bonds", "Cyclohexane \\(\\mathrm{C_6H_{12}}\\)"],
            noteAmber: "A ring has the same general formula as an alkene, but no double bond.",
          },
          { cells: ["Cycloalkene", "\\(\\mathrm{C}_n\\mathrm{H}_{2n-2}\\)", "Ring with one double bond", "Cyclohexene \\(\\mathrm{C_6H_{10}}\\)"] },
          { cells: ["Benzene", "\\(\\mathrm{C_6H_6}\\)", "Ring, alternate single and double bonds", "Benzene"] },
        ],
        caption: "In a drawn ring, each corner is a carbon: count the double bonds to name it.",
      },
      selfCheckExample: {
        prompt: "An open-chain hydrocarbon has the formula \\(\\mathrm{C_4H_8}\\). Is it saturated, and to which family does it belong?",
        steps: [
          "\\(n = 4\\) and \\(2n = 8\\), so it fits \\(\\mathrm{C}_n\\mathrm{H}_{2n}\\).",
          "An open chain with that formula has one double bond.",
        ],
        answer: "Unsaturated: an alkene (butene).",
      },
      practiceSet: [
        { prompt: "What is the formula of ethyne?", answer: "\\(\\mathrm{C_2H_2}\\)" },
        { prompt: "How many carbon atoms does a hydrocarbon whose name starts with pent- have?", answer: "5" },
        { prompt: "Is propane, \\(\\mathrm{C_3H_8}\\), saturated or unsaturated?", answer: "Saturated" },
        { prompt: "Which has a triple bond, ethene or ethyne?", answer: "Ethyne" },
        { prompt: "What is the general formula of the alkenes?", answer: "\\(\\mathrm{C}_n\\mathrm{H}_{2n}\\)" },
      ],
      pyqExampleId: "90d435fc-fd29-4f6c-ac1a-88f2bd1e97b6",
      traps: [
        {
          title: "Taking a ring for an alkene",
          body:
            "Cyclohexane, \\(\\mathrm{C_6H_{12}}\\), fits \\(\\mathrm{C}_n\\mathrm{H}_{2n}\\) but has only single bonds, because its carbons close into a ring. Look at the structure, not just the formula.",
        },
        {
          title: "Counting the single bonds next to a triple bond",
          body:
            "A triple bond does not make every other bond triple. Butyne has four carbons, so besides its triple bond it has two carbon-carbon single bonds. Propyne has exactly one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spicchy-series",
      name: "Homologous series and isomers",
      intuition:
        "Methane, ethane, propane and butane form a ladder: each step adds one \\(\\mathrm{CH_2}\\) unit. Compounds on one ladder behave alike chemically. Isomers are the opposite idea: one formula, but the atoms joined in different ways.",
      definition:
        "- A **homologous series** has the same general formula and the same functional group. Each member differs from the next by \\(\\mathrm{CH_2}\\), which is 14 u.\n" +
        "- Members have **similar chemical properties**. Their **physical properties** (melting and boiling points) change step by step as the chain grows.\n" +
        "- **Isomers** have the **same molecular formula** but **different structural formulae**, so their properties differ.\n" +
        "- Methane, ethane and propane have no isomers. **Butane**, \\(\\mathrm{C_4H_{10}}\\), is the first alkane with isomers: a straight chain and a branched chain.",
      formula: {
        label: "Mass step in a homologous series",
        latex: "M_{\\text{next}} = M + 14 \\text{ u} \\qquad \\mathrm{CH_2} = 12 + 2 \\times 1 = 14 \\text{ u}",
      },
      authoredExample: {
        prompt: "Ethanol, \\(\\mathrm{C_2H_5OH}\\), has a molecular mass of 46 u. Find the molecular mass of propanol, the next member of its series.",
        steps: [
          "The next member has one more \\(\\mathrm{CH_2}\\): add 14 u.",
          "\\(46 + 14 = 60\\) u.",
          "Check: \\(\\mathrm{C_3H_7OH} = 3 \\times 12 + 8 \\times 1 + 16 = 60\\) u.",
        ],
        answer: "60 u",
      },
      selfCheckExample: {
        prompt: "How many isomers does butane, \\(\\mathrm{C_4H_{10}}\\), have?",
        steps: [
          "The four carbons can be a straight chain of 4.",
          "Or a chain of 3 with the fourth carbon as a branch on the middle carbon.",
        ],
        answer: "2",
      },
      practiceSet: [
        { prompt: "Methane has a molecular mass of 16 u. What is the molecular mass of ethane?", answer: "30 u" },
        { prompt: "Do the members of a homologous series have similar chemical properties?", answer: "Yes" },
        { prompt: "Two compounds have the same molecular formula but different structures. What are they called?", answer: "Isomers" },
        { prompt: "Which is the first alkane to have isomers?", answer: "Butane" },
      ],
      pyqExampleId: "28917dd4-df13-4d7a-b2b3-eddd580ef87c",
      traps: [
        {
          title: "Saying isomers have the same structure",
          body: "Isomers share the molecular formula only. Their structural formulae differ, and so do their properties.",
        },
        {
          title: "Expecting the physical properties to stay the same",
          body:
            "Down a homologous series the chemical properties stay similar, but the boiling point rises as the chain grows by each \\(\\mathrm{CH_2}\\).",
        },
      ],
    },
  ],
};
