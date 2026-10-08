import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ORG_HYDROCARBONS_NOTE: SubtopicNote = {
  subtopicName: "Hydrocarbons and Naming",
  title: "Hydrocarbons: Families, Benzene, Names and Unsaturation",
  oneLineDefinition:
    "Hydrocarbons contain only carbon and hydrogen; their family, their name and their number of rings and multiple bonds can all be read from the formula.",
  whyItMatters:
    "The 2026 paper asked which family ethene belongs to and the 2024 paper asked which of five named compounds has the most hydrogen atoms. Older papers asked for formulas of aromatic compounds and for the IUPAC name of a drawn molecule.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-org-families",
      name: "Hydrocarbon families and their general formulas",
      intuition:
        "Start from an alkane, where every carbon holds as many hydrogens as it can. Each double bond or ring costs two hydrogens, and a triple bond costs four. So the general formula of a family tells you how many multiple bonds and rings it has.",
      definition:
        "A **hydrocarbon** contains only C and H.\n" +
        "- **Saturated**: only C-C single bonds (alkanes, cycloalkanes). **Unsaturated**: at least one C=C or C≡C (alkenes, alkynes, arenes).\n" +
        "- A compound with two C=C bonds is a **diene** (general formula \\(\\mathrm{C_nH_{2n-2}}\\), like an alkyne).\n" +
        "- Alkanes are fairly unreactive: they burn, and react with halogens in UV light. Alkenes and alkynes are much more reactive because of the π bond.\n" +
        "- A **homologous series** is a family whose members differ by \\(\\mathrm{CH_2}\\); they share a general formula and similar chemistry.",
      table: {
        columns: ["Family", "General formula", "Key feature", "Example", "Name ending"],
        rows: [
          { cells: ["Alkane", "\\(\\mathrm{C_nH_{2n+2}}\\)", "Only single bonds, open chain", "Propane \\(\\mathrm{C_3H_8}\\)", "-ane"] },
          { cells: ["Cycloalkane", "\\(\\mathrm{C_nH_{2n}}\\)", "Single bonds in one ring", "Cyclohexane \\(\\mathrm{C_6H_{12}}\\)", "cyclo-, then -ane"] },
          { cells: ["Alkene", "\\(\\mathrm{C_nH_{2n}}\\)", "One C=C double bond", "Propene \\(\\mathrm{C_3H_6}\\)", "-ene"] },
          { cells: ["Alkyne", "\\(\\mathrm{C_nH_{2n-2}}\\)", "One C≡C triple bond", "Propyne \\(\\mathrm{C_3H_4}\\)", "-yne"] },
          { cells: ["Arene (aromatic)", "\\(\\mathrm{C_nH_{2n-6}}\\) for one benzene ring", "A benzene ring", "Methylbenzene \\(\\mathrm{C_7H_8}\\)", "-benzene"] },
        ],
        caption: "Alkenes and cycloalkanes share \\(\\mathrm{C_nH_{2n}}\\); a formula alone cannot tell them apart.",
      },
      selfCheckExample: {
        prompt: "Which molecular formula fits a hexyne: an open-chain hydrocarbon with six carbon atoms whose only multiple bond is one triple bond?",
        options: [
          "\\(\\mathrm{C_6H_{14}}\\)",
          "\\(\\mathrm{C_6H_{12}}\\)",
          "\\(\\mathrm{C_6H_{10}}\\)",
          "\\(\\mathrm{C_6H_{8}}\\)",
          "\\(\\mathrm{C_6H_{6}}\\)",
        ],
        steps: [
          "Alkynes are \\(\\mathrm{C_nH_{2n-2}}\\). With \\(n = 6\\): \\(2 \\times 6 - 2 = 10\\).",
          "A is the alkane, B the alkene (or cycloalkane). D needs a second multiple bond (two triple bonds, or a triple and a double), which the question rules out, and E is benzene.",
        ],
        answer: "(C) \\(\\mathrm{C_6H_{10}}\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of the alkane with 8 carbons.", answer: "\\(\\mathrm{C_8H_{18}}\\)", method: "\\(\\mathrm{C_nH_{2n+2}}\\)" },
        { prompt: "\\(\\mathrm{C_5H_{10}}\\) could belong to which two families?", answer: "An alkene or a cycloalkane", method: "Both are \\(\\mathrm{C_nH_{2n}}\\)" },
        { prompt: "Which name ending shows a C≡C triple bond?", answer: "-yne", method: "As in ethyne and propyne" },
        { prompt: "Is butane saturated or unsaturated?", answer: "Saturated", method: "Only single bonds" },
      ],
      traps: [
        {
          title: "Ethene is an alkene, not an alkyne",
          body: "The letters before the ending count the carbons (eth = 2) and the ending gives the bond: -ane single, -ene double, -yne triple. Ethene \\(\\mathrm{CH_2{=}CH_2}\\) has one double bond, so it is an alkene. A diene has two C=C bonds and needs at least three carbons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-org-benzene",
      name: "Benzene and aromatic compounds",
      intuition:
        "Benzene looks as if it should have three double bonds in a ring, but it does not behave that way. Its six π electrons spread evenly around the whole ring. This makes the ring flat, very stable and unwilling to give up its π electrons in addition reactions.",
      definition:
        "**Benzene** is \\(\\mathrm{C_6H_6}\\): a ring of six carbons, each carrying one H.\n" +
        "- Every carbon is **sp²** and joined to three atoms, so the molecule is **planar** with 120° angles.\n" +
        "- The π electrons are **delocalised** over the ring. All six C-C bonds are the same length, between a single and a double bond. The ring is often drawn as a hexagon with a circle inside.\n" +
        "- **Aromatic** compounds contain a benzene ring. Benzene reacts mainly by **substitution** (an H is replaced), because addition would destroy the stable ring.\n" +
        "- Common aromatics: methylbenzene (toluene) \\(\\mathrm{C_6H_5CH_3}\\), phenol \\(\\mathrm{C_6H_5OH}\\), benzoic acid \\(\\mathrm{C_6H_5COOH}\\). The group \\(\\mathrm{C_6H_5}\\) is called **phenyl**.\n" +
        "- Rings that share an edge are **fused**. Each extra fused ring adds 4 C and 2 H.",
      table: {
        columns: ["Property", "Benzene", "Cyclohexane, for contrast"],
        rows: [
          { cells: ["Formula", "\\(\\mathrm{C_6H_6}\\)", "\\(\\mathrm{C_6H_{12}}\\)"] },
          { cells: ["Hybridisation of every carbon", "\\(\\mathrm{sp^2}\\)", "\\(\\mathrm{sp^3}\\)"] },
          { cells: ["Shape", "Flat hexagon, 120° angles", "Puckered ring (chair or boat shape)"] },
          { cells: ["C-C bonds", "Six equal bonds, delocalised π electrons", "Six single bonds"] },
          { cells: ["Typical reaction", "Substitution (keeps the ring)", "Burns; substitution with halogens in UV light"] },
        ],
      },
      selfCheckExample: {
        prompt: "In methylbenzene, \\(\\mathrm{C_6H_5CH_3}\\), how many carbon atoms are \\(\\mathrm{sp^2}\\) hybridised?",
        options: ["7", "6", "3", "1", "0"],
        steps: [
          "All six ring carbons are \\(\\mathrm{sp^2}\\), as in benzene.",
          "The methyl carbon has four single bonds, so it is \\(\\mathrm{sp^3}\\).",
          "Option C imagines only three double bonds with three sp² carbons; but every ring carbon takes part in the π system. Option A forgets the methyl carbon is sp³.",
        ],
        answer: "(B) 6",
      },
      practiceSet: [
        { prompt: "Write the molecular formula of ethylbenzene, \\(\\mathrm{C_6H_5CH_2CH_3}\\).", answer: "\\(\\mathrm{C_8H_{10}}\\)", method: "\\(\\mathrm{C_6H_5}\\) plus \\(\\mathrm{C_2H_5}\\)" },
        { prompt: "What is the C-C-C bond angle in benzene?", answer: "120°", method: "Every carbon is sp², trigonal planar" },
        { prompt: "Does benzene prefer addition or substitution?", answer: "Substitution", method: "Addition would break up the delocalised ring" },
        { prompt: "Write the molecular formula of phenol.", answer: "\\(\\mathrm{C_6H_6O}\\)", method: "\\(\\mathrm{C_6H_5OH}\\)" },
      ],
      traps: [
        {
          title: "Benzene is flat; the chair and boat shapes belong to cyclohexane",
          body: "Benzene's carbons are all sp² and the ring is planar. Cyclohexane's carbons are sp³, so its ring folds into chair or boat shapes. Options that mix the two (sp² but chair-shaped, or some sp³ carbons in benzene) are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-naming",
      name: "IUPAC names for alkanes and alkenes",
      intuition:
        "An IUPAC name is a set of instructions for drawing the molecule. The stem gives the longest carbon chain, the ending gives the bond type, and numbered prefixes say which branches hang off which carbon. Number the chain so that the numbers come out as small as possible.",
      definition:
        "Steps:\n" +
        "- Find the **longest carbon chain**. It may turn through a branch as written. Stems: meth 1, eth 2, prop 3, but 4, pent 5, hex 6, hept 7, oct 8, non 9, dec 10.\n" +
        "- For an alkene, the chain must contain the C=C, and the C=C gets the lowest possible number: but-1-ene, but-2-ene. Two double bonds: buta-1,3-diene.\n" +
        "- **Number** from the end that gives the branches (after the C=C) the **lowest locants**.\n" +
        "- Name the branches: methyl \\(\\mathrm{CH_3}\\), ethyl \\(\\mathrm{C_2H_5}\\), chloro, bromo. Use di-, tri- for repeats, and list branches in **alphabetical order** (ignore di- and tri- when sorting).\n" +
        "- Commas between numbers, hyphens between numbers and letters: 2,3-dimethylpentane.\n" +
        "- A ring takes **cyclo-**: methylcyclohexane. Older names put the number first (2-butene for but-2-ene); IMAT uses both.",
      formula: {
        label: "Order of an IUPAC name",
        latex: "\\text{locants-branches} + \\text{stem} + \\text{ending}",
        symbols: [
          { symbol: "branches", meaning: "alphabetical, with their carbon numbers" },
          { symbol: "stem", meaning: "the number of carbons in the longest chain" },
          { symbol: "ending", meaning: "-ane, -ene (with its number), -yne" },
        ],
      },
      authoredExample: {
        prompt: "Name the alkane \\(\\mathrm{CH_3CH(CH_3)CH(C_2H_5)CH_2CH_3}\\).",
        steps: [
          "Longest chain: \\(\\mathrm{CH_3{-}CH{-}CH{-}CH_2{-}CH_3}\\) is 5 carbons. Running into the ethyl branch instead also gives only 5, so the stem is pentane.",
          "Branches: a methyl and an ethyl. Numbering from the left puts them on carbons 2 and 3; from the right on 3 and 4. Take {2, 3}.",
          "Alphabetical order: ethyl before methyl.",
          "Name: 3-ethyl-2-methylpentane (formula \\(\\mathrm{C_8H_{18}}\\)).",
        ],
        answer: "3-ethyl-2-methylpentane",
      },
      selfCheckExample: {
        prompt: "What is the IUPAC name of \\(\\mathrm{CH_3CHClCH_2CH(CH_3)CH_3}\\)?",
        options: [
          "4-chloro-2-methylpentane",
          "2-chlorohexane",
          "2-methyl-4-chloropentane",
          "1-chloro-1,3-dimethylbutane",
          "2-chloro-4-methylpentane",
        ],
        steps: [
          "The longest chain has 5 carbons (the last \\(\\mathrm{CH_3}\\) and the branch \\(\\mathrm{CH_3}\\) sit on the same carbon).",
          "From either end the branches fall on carbons 2 and 4. When the numbers tie, the branch first in the alphabet gets the lower number: chloro gets 2.",
          "A breaks the tie the wrong way. B counts all six carbons as one chain. C lists the branches out of alphabetical order. D picks a 4-carbon chain, which is not the longest.",
        ],
        answer: "(E) 2-chloro-4-methylpentane",
      },
      practiceSet: [
        { prompt: "Name \\(\\mathrm{CH_2{=}CHCH_2CH_3}\\).", answer: "But-1-ene", method: "4 carbons, C=C starting at carbon 1" },
        { prompt: "Name \\(\\mathrm{(CH_3)_3CH}\\).", answer: "2-methylpropane", method: "Longest chain is 3 carbons, methyl on carbon 2" },
        { prompt: "Write the condensed formula of 2,2-dimethylbutane.", answer: "\\(\\mathrm{CH_3C(CH_3)_2CH_2CH_3}\\), which is \\(\\mathrm{C_6H_{14}}\\)", method: "Butane chain, two methyls on carbon 2" },
        { prompt: "Name \\(\\mathrm{CH_3CH{=}CHCH_2CH_3}\\).", answer: "Pent-2-ene", method: "Number from the end nearer the C=C" },
      ],
      traps: [
        {
          title: "The longest chain is not always the one written in a straight line",
          body: "Condensed and skeletal formulas often bend the main chain through a branch. Check every path from one end carbon to another; a molecule written as a butane with an ethyl branch may really be a pentane or hexane chain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-dou",
      name: "Degrees of unsaturation: rings and multiple bonds from a formula",
      intuition:
        "An open-chain alkane holds the most hydrogens a carbon skeleton can carry. Every ring or π bond removes two of them. So by counting how many hydrogens are missing compared with the alkane, you know how many rings plus π bonds the molecule has, without seeing its structure.",
      definition:
        "The **degree of unsaturation (DoU)** is the number of rings plus π bonds.\n" +
        "- A C=C or C=O counts 1, a C≡C or C≡N counts 2, a ring counts 1, a benzene ring counts 4 (one ring, three π).\n" +
        "- Halogens count like H. Nitrogen adds one place for H. Oxygen and sulfur do not change the count.\n" +
        "- To compare hydrogen counts of named compounds: each ring or double bond removes 2 H from the alkane value \\(2n + 2\\).",
      formula: {
        label: "Degree of unsaturation",
        latex: "\\text{DoU} = \\frac{2C + 2 + N - H - X}{2}",
        symbols: [
          { symbol: "\\(C, H, N\\)", meaning: "numbers of carbon, hydrogen and nitrogen atoms" },
          { symbol: "\\(X\\)", meaning: "number of halogen atoms (F, Cl, Br, I)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the degree of unsaturation of \\(\\mathrm{C_5H_8}\\) and of \\(\\mathrm{C_4H_9Br}\\), and say what each could contain.",
        steps: [
          "\\(\\mathrm{C_5H_8}\\): \\((2 \\times 5 + 2 - 8)/2 = 4/2 = 2\\).",
          "So it has two π bonds or rings: two C=C (a diene), one C≡C (an alkyne), one ring and one C=C (a cycloalkene), or two rings.",
          "\\(\\mathrm{C_4H_9Br}\\): \\((2 \\times 4 + 2 - 9 - 1)/2 = 0\\). It is saturated and open chain: a bromobutane.",
        ],
        answer: "\\(\\mathrm{C_5H_8}\\): 2; \\(\\mathrm{C_4H_9Br}\\): 0",
      },
      selfCheckExample: {
        prompt: "Which of the following compounds contains the most hydrogen atoms per molecule?",
        options: [
          "Pent-1-ene",
          "Cyclopentane",
          "2-methylbutane",
          "Pent-2-yne",
          "Penta-1,3-diene",
        ],
        steps: [
          "All five have 5 carbons, so start from the alkane value \\(2 \\times 5 + 2 = 12\\) H and subtract 2 per ring or π bond.",
          "Pent-1-ene: one C=C, 10 H. Cyclopentane: one ring, 10 H. Pent-2-yne: two π bonds, 8 H. Penta-1,3-diene: two C=C, 8 H.",
          "2-methylbutane is a branched alkane, \\(\\mathrm{C_5H_{12}}\\): 12 H. Branching does not change the H count.",
        ],
        answer: "(C) 2-methylbutane",
      },
      practiceSet: [
        { prompt: "What is the DoU of benzene, \\(\\mathrm{C_6H_6}\\)?", answer: "4", method: "\\((12 + 2 - 6)/2\\): one ring and three π bonds" },
        { prompt: "A hydrocarbon \\(\\mathrm{C_7H_{12}}\\) has one ring. How many C=C bonds does it have?", answer: "1", method: "DoU \\(= (14 + 2 - 12)/2 = 2\\); one is the ring" },
        { prompt: "What is the DoU of \\(\\mathrm{C_3H_5N}\\)? Suggest a group that fits.", answer: "2: for example a C≡N, as in \\(\\mathrm{CH_3CH_2CN}\\)", method: "\\((6 + 2 + 1 - 5)/2\\)" },
        { prompt: "What is the DoU of \\(\\mathrm{C_2H_4Cl_2}\\)?", answer: "0", method: "\\((4 + 2 - 4 - 2)/2\\)" },
      ],
      traps: [
        {
          title: "A ring removes two hydrogens just like a double bond",
          body: "Cyclohexane \\(\\mathrm{C_6H_{12}}\\) has two fewer H than hexane \\(\\mathrm{C_6H_{14}}\\) even though it has no double bond. When ranking named compounds by hydrogen count, a 'cyclo' or a 'methylcyclo' costs 2 H, exactly like an '-ene'.",
        },
      ],
    },
  ],
};
