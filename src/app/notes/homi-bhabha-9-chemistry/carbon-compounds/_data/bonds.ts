import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CC_BONDS_NOTE: SubtopicNote = {
  subtopicName: "Covalent Bonds and Hydrocarbons",
  title: "Covalent Bonds and Hydrocarbons",
  oneLineDefinition:
    "Carbon has valency 4 and shares electrons to form covalent bonds, single, double or triple, which link it into chains that make the alkanes, alkenes and alkynes.",
  whyItMatters:
    "Nine questions in the bank, three EASY and six MODERATE. Three are about carbon's valency and counting the bonds in a molecule, two pick out the compound with a triple bond, two give the same pair of statements about methane, one matches isomers, allotropes, homologous series and functional group, and one reads the formula of glucose.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9ccbo-covalent",
      name: "Valency of carbon and counting covalent bonds",
      intuition:
        "A carbon atom has 4 electrons in its outer shell. Losing or gaining 4 electrons is too hard, so carbon shares them instead. Each shared pair is one covalent bond, so every carbon atom always makes 4 bonds in all. Carbon atoms can also share with each other again and again, which is why carbon forms chains, branches and rings and so many compounds.",
      definition:
        "- Carbon: atomic number **6**, electronic configuration **2, 4**, so its **valency is 4** (it is **tetravalent**).\n" +
        "- A **covalent bond** is formed by **sharing a pair of electrons** between two atoms.\n" +
        "- **Single bond**: 1 shared pair. **Double bond**: 2 shared pairs. **Triple bond**: 3 shared pairs.\n" +
        "- **Catenation**: carbon atoms join to one another to form long chains, branched chains and rings. Catenation and valency 4 are why carbon forms a very large number of compounds.\n" +
        "- **Sigma and pi bonds**: every single bond is **1 sigma (σ)** bond. A double bond is **1 σ + 1 π**. A triple bond is **1 σ + 2 π**.\n" +
        "- **Counting bonds**: draw the structure, count the carbon to carbon bonds and the carbon to hydrogen bonds, and add. An alkane with n carbon atoms has \\(n - 1\\) C to C bonds and \\(2n + 2\\) C to H bonds, so \\(3n + 1\\) bonds in all.",
      formula: {
        label: "Counting bonds",
        latex:
          "\\text{Alkane } \\mathrm{C_nH_{2n+2}}: (n-1) + (2n+2) = 3n + 1 \\text{ bonds} \\qquad \\text{single} = 1\\sigma \\qquad \\text{double} = 1\\sigma + 1\\pi \\qquad \\text{triple} = 1\\sigma + 2\\pi",
        symbols: [
          { symbol: "n", meaning: "number of carbon atoms in the molecule" },
          { symbol: "σ", meaning: "sigma bond: every single bond is one" },
          { symbol: "π", meaning: "pi bond: the extra bonds in a double or triple bond" },
        ],
      },
      authoredExample: {
        prompt: "Propene is \\(\\mathrm{CH_3{-}CH{=}CH_2}\\). How many sigma bonds and how many pi bonds does one molecule have?",
        steps: [
          "Carbon to hydrogen bonds: 3 + 1 + 2 = 6, all single, so 6 σ.",
          "The \\(\\mathrm{CH_3{-}CH}\\) bond is single: 1 σ.",
          "The \\(\\mathrm{CH{=}CH_2}\\) bond is double: 1 σ and 1 π.",
          "Sigma bonds: 6 + 1 + 1 = 8. Pi bonds: 1.",
        ],
        answer: "8 sigma bonds and 1 pi bond",
      },
      selfCheckExample: {
        prompt: "How many covalent bonds are there in one molecule of butane, \\(\\mathrm{C_4H_{10}}\\)?",
        steps: [
          "Four carbons in a chain are joined by 3 C to C bonds.",
          "There are 10 C to H bonds.",
          "3 + 10 = 13, which matches \\(3n + 1\\) with n = 4.",
        ],
        answer: "13",
      },
      practiceSet: [
        { prompt: "How many covalent bonds are there in one molecule of ethane, \\(\\mathrm{C_2H_6}\\)?", answer: "7: one C to C bond and six C to H bonds" },
        { prompt: "How many sigma and how many pi bonds are there in ethyne, \\(\\mathrm{HC{\\equiv}CH}\\)?", answer: "3 sigma (two C to H and one in the triple bond) and 2 pi" },
        { prompt: "What is the valency of carbon, and why?", answer: "4: its electronic configuration is 2, 4, so it shares its 4 outer electrons" },
        { prompt: "What is the property of carbon atoms joining one another to form long chains and rings called?", answer: "Catenation" },
      ],
      pyqExampleId: "87900807-8579-4852-abd4-b912e86060ce",
      traps: [
        {
          title: "Taking the atomic number as the valency",
          body: "Carbon's atomic number is 6, but its valency is 4. The valency comes from the 4 electrons in its outer shell (2, 4).",
        },
        {
          title: "Counting a double bond as two sigma bonds",
          body: "A double bond is one sigma bond and one pi bond. Only the first bond between two atoms is a sigma bond.",
        },
        {
          title: "Counting only the carbon to hydrogen bonds",
          body: "The bonds between carbon atoms count too. Propane has 8 C to H bonds and 2 C to C bonds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ccbo-families",
      name: "Alkanes, alkenes and alkynes",
      intuition:
        "Compounds of only carbon and hydrogen are hydrocarbons. Sort them by the bond between the carbon atoms. All single bonds: an alkane, name ending -ane. One double bond: an alkene, -ene. One triple bond: an alkyne, -yne. The first part of the name tells you the number of carbons: meth 1, eth 2, prop 3, but 4.",
      definition:
        "- A **hydrocarbon** contains only carbon and hydrogen.\n" +
        "- **Saturated** hydrocarbons (alkanes) have only single bonds. **Unsaturated** ones (alkenes and alkynes) have a double or a triple bond.\n" +
        "- The name tells the bond: **-ane** single, **-ene** double, **-yne** triple.\n" +
        "- The formula tells it too: \\(\\mathrm{C_nH_{2n+2}}\\) alkane, \\(\\mathrm{C_nH_{2n}}\\) alkene, \\(\\mathrm{C_nH_{2n-2}}\\) alkyne.\n" +
        "- **Methane**, \\(\\mathrm{CH_4}\\), with one carbon atom, is the **smallest hydrocarbon**. It is the main gas in natural gas and biogas, used as a fuel in homes.",
      table: {
        columns: ["Family", "Bond between carbons", "General formula", "Examples"],
        rows: [
          { cells: ["Alkane", "Single bonds only", "\\(\\mathrm{C_nH_{2n+2}}\\)", "Methane \\(\\mathrm{CH_4}\\), ethane \\(\\mathrm{C_2H_6}\\), propane \\(\\mathrm{C_3H_8}\\), butane \\(\\mathrm{C_4H_{10}}\\)"] },
          { cells: ["Alkene", "One double bond", "\\(\\mathrm{C_nH_{2n}}\\)", "Ethene \\(\\mathrm{C_2H_4}\\), propene \\(\\mathrm{C_3H_6}\\)"] },
          {
            cells: ["Alkyne", "One triple bond", "\\(\\mathrm{C_nH_{2n-2}}\\)", "Ethyne \\(\\mathrm{C_2H_2}\\), propyne \\(\\mathrm{C_3H_4}\\)"],
            noteAmber: "The fewest hydrogen atoms for the number of carbons.",
          },
        ],
        caption: "Put the number of carbons into each general formula to see which family a formula belongs to.",
      },
      selfCheckExample: {
        prompt: "Which of these has a carbon to carbon double bond: \\(\\mathrm{C_2H_6}\\), \\(\\mathrm{C_3H_6}\\), \\(\\mathrm{C_2H_2}\\)?",
        steps: [
          "For n = 3, an alkene is \\(\\mathrm{C_3H_6}\\) (2n = 6).",
          "\\(\\mathrm{C_2H_6}\\) is an alkane and \\(\\mathrm{C_2H_2}\\) is an alkyne.",
        ],
        answer: "\\(\\mathrm{C_3H_6}\\) (propene)",
      },
      practiceSet: [
        { prompt: "Name the alkyne that has two carbon atoms and give its formula.", answer: "Ethyne, \\(\\mathrm{C_2H_2}\\)" },
        { prompt: "What is the general formula of the alkenes?", answer: "\\(\\mathrm{C_nH_{2n}}\\)" },
        { prompt: "Which is the smallest hydrocarbon?", answer: "Methane, \\(\\mathrm{CH_4}\\)" },
        { prompt: "Is butane a saturated or an unsaturated hydrocarbon?", answer: "Saturated: it has only single bonds" },
      ],
      pyqExampleId: "eaf22878-0ba8-4976-86eb-2ddf5904df92",
      traps: [
        {
          title: "Reading -ene as a triple bond",
          body: "The ending -ene means a double bond, as in ethene. A triple bond is -yne, as in ethyne and propyne.",
        },
        {
          title: "Thinking three carbons means a triple bond",
          body: "The prefix prop- only counts three carbon atoms. Propane has single bonds, propene a double bond and propyne a triple bond.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ccbo-series",
      name: "Isomers, homologous series and functional groups",
      intuition:
        "Carbon compounds are sorted into families. Compounds in one family share the same working group of atoms, so they react alike, and each member is one \\(\\mathrm{CH_2}\\) bigger than the one before. Sometimes the same atoms can be joined in two different ways: same formula, different compound. Those are isomers.",
      definition:
        "- **Molecular formula**: the number of each kind of atom in one molecule. Glucose is \\(\\mathrm{C_6H_{12}O_6}\\): 6 carbon, 12 hydrogen and 6 oxygen atoms.\n" +
        "- **Isomers**: compounds with the **same molecular formula** but **different structures**.\n" +
        "- **Functional group**: the group of atoms in a molecule that **decides its chemical properties**, such as \\(\\mathrm{{-}OH}\\) in alcohols.\n" +
        "- **Homologous series**: compounds with the **same functional group** whose formulas differ by \\(\\mathrm{CH_2}\\). They have **similar chemical properties**.\n" +
        "- **Allotropes**: different forms of the **same element**, with different physical properties but the same chemical properties.",
      table: {
        columns: ["Term", "What is the same", "What is different", "Example"],
        rows: [
          { cells: ["Isomers", "Molecular formula", "Structure (how the atoms are joined)", "Butane and isobutane, both \\(\\mathrm{C_4H_{10}}\\)"] },
          { cells: ["Homologous series", "Functional group and chemical properties", "Molecular formula, by \\(\\mathrm{CH_2}\\) each step", "Methanol \\(\\mathrm{CH_3OH}\\), ethanol \\(\\mathrm{C_2H_5OH}\\)"] },
          { cells: ["Functional group", "Decides the chemical properties", "Changes from family to family", "\\(\\mathrm{{-}OH}\\) alcohol, \\(\\mathrm{{-}COOH}\\) carboxylic acid"] },
          { cells: ["Allotropes", "The element and its chemical properties", "Physical properties", "Diamond and graphite"] },
        ],
        caption: "Isomers are compounds with one formula; allotropes are forms of one element.",
      },
      selfCheckExample: {
        prompt: "Methanol is \\(\\mathrm{CH_3OH}\\) and ethanol is \\(\\mathrm{C_2H_5OH}\\). Both have the \\(\\mathrm{{-}OH}\\) group. What is the relation between them?",
        steps: [
          "They have the same functional group.",
          "Their formulas differ by one \\(\\mathrm{CH_2}\\).",
        ],
        answer: "They belong to the same homologous series (alcohols).",
      },
      practiceSet: [
        { prompt: "What are two compounds with the same molecular formula but different structures called?", answer: "Isomers" },
        { prompt: "By which group of atoms do two neighbouring members of a homologous series differ?", answer: "\\(\\mathrm{CH_2}\\): one carbon and two hydrogen atoms" },
        { prompt: "What is the ratio of carbon atoms to hydrogen atoms in a molecule of ethane, \\(\\mathrm{C_2H_6}\\)?", answer: "2 : 6, that is 1 : 3" },
        { prompt: "Which part of an organic molecule decides its chemical properties?", answer: "Its functional group" },
      ],
      pyqExampleId: "c880f4ca-60d0-4d56-8861-8d014c15a013",
      traps: [
        {
          title: "Mixing up isomers and allotropes",
          body: "Isomers are different compounds with the same formula. Allotropes are different forms of one element, such as diamond and graphite.",
        },
        {
          title: "Giving a homologous series one formula",
          body: "Members of a homologous series share a functional group, but each formula is one \\(\\mathrm{CH_2}\\) bigger than the last.",
        },
        {
          title: "Leaving a ratio unsimplified",
          body: "Glucose has 6 carbon and 12 hydrogen atoms, and the ratio 6 : 12 must be written as 1 : 2.",
        },
      ],
    },
  ],
};
