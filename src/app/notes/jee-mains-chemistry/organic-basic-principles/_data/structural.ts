import type { SubtopicNote } from "@/app/notes/_types";

export const STRUCTURAL_GOC_NOTE: SubtopicNote = {
  subtopicName: "Structural Isomerism",
  title: "Structural Isomerism",
  oneLineDefinition:
    "Structural isomers share a molecular formula but join the atoms differently: a different carbon skeleton, a group in a different place, a different functional group, different alkyl groups on either side of one group, or a ring in place of a double bond.",
  whyItMatters:
    "Thirteen PYQs, four of them asking for a number, and three from 2026. Eight name the kind of isomerism a pair of compounds shows, usually as a match list or a set of statements. Five count the isomers of a formula, from the chain isomers of an alkane to the substituted benzenes of one aromatic formula.",
  concepts: [
    // C1 — kinds of structural isomerism
    {
      kind: "reference" as const,
      slug: "jcgoc-isomer-types",
      name: "Kinds of structural isomerism",
      intuition:
        "Two compounds with the same molecular formula are isomers. If their atoms are joined differently, they are structural isomers. To name the kind, ask what changed between the two: the carbon skeleton, the position of a group, the group itself, or only the alkyl groups on either side of it.",
      definition:
        "- **Chain**: a different carbon skeleton (straight against branched).\n" +
        "- **Position**: the same skeleton and group, with the group or the multiple bond moved.\n" +
        "- **Functional group**: a different functional group: an alcohol and an ether, an aldehyde and a ketone. A primary and a secondary amine of one formula are counted here too.\n" +
        "- **Metamerism**: the same functional group with different alkyl groups on its two sides. It is seen in ethers, secondary amines and ketones.\n" +
        "- **Ring-chain**: a ring in one isomer where the other has a double bond.\n" +
        "- **Tautomerism**: a hydrogen moves between two atoms and the two forms interconvert, usually keto and enol. It needs a hydrogen on the α-carbon.",
      table: {
        columns: ["Type", "What differs", "Example pair (one formula)"],
        rows: [
          { cells: ["Chain", "The carbon skeleton", "Pentane and 2-methylbutane (C₅H₁₂)"] },
          { cells: ["Position", "Where the group or multiple bond sits", "Propan-1-ol and propan-2-ol (C₃H₈O)"] },
          { cells: ["Functional group", "The functional group itself", "Ethanol and methoxymethane (C₂H₆O)"] },
          {
            cells: ["Metamerism", "The alkyl groups on either side of one group", "Methoxypropane and ethoxyethane (C₄H₁₀O)"],
            noteAmber: "Two ethers can be metamers. An ether and an alcohol cannot: they are functional isomers.",
          },
          { cells: ["Ring-chain", "A ring in place of a C=C", "Cyclopropane and propene (C₃H₆)"] },
          { cells: ["Tautomerism", "The position of a mobile hydrogen; the forms interconvert", "Propanone and prop-1-en-2-ol (keto and enol)"] },
        ],
        caption: "Chain, position, functional, metamer and ring-chain isomers are separate compounds; tautomers exist in equilibrium.",
      },
      selfCheckExample: {
        prompt: "What kind of isomers are diethylamine, \\(\\mathrm{(C_2H_5)_2NH}\\), and N-methylpropan-1-amine, \\(\\mathrm{CH_3NHCH_2CH_2CH_3}\\)?",
        steps: [
          "Both have the formula \\(\\mathrm{C_4H_{11}N}\\) and both are secondary amines: the functional group is the same.",
          "Only the alkyl groups on the two sides of the NH differ: ethyl and ethyl against methyl and propyl.",
        ],
        answer: "Metamers.",
      },
      practiceSet: [
        { prompt: "What kind of isomers are butan-1-ol and ethoxyethane?", answer: "Functional group isomers" },
        { prompt: "What kind of isomers are butane and 2-methylpropane?", answer: "Chain isomers" },
        { prompt: "Can 2,2-dimethylpropanal, \\(\\mathrm{(CH_3)_3C{-}CHO}\\), show keto–enol tautomerism?", answer: "No; its α-carbon carries no hydrogen" },
        { prompt: "What kind of isomers are cyclobutane and but-1-ene?", answer: "Ring-chain isomers" },
      ],
      pyqExampleId: "dba3ba79-e17e-4127-bc82-dfda4e626832", // 2026 — match pairs of C4 compounds to isomer types
      traps: [
        {
          title: "A moved double bond is position isomerism",
          body: "But-1-ene and but-2-ene keep one straight four-carbon skeleton and one kind of group; only the C=C moves. They are position isomers, not chain or functional isomers.",
        },
        {
          title: "Metamers keep one functional group",
          body: "Metamerism needs the same group with different alkyls around it. An alcohol and an ether of one formula are functional isomers, never metamers.",
        },
        {
          title: "No α-hydrogen, no tautomer",
          body: "Keto–enol tautomerism moves a hydrogen from the carbon next to C=O onto the oxygen. A ketone whose α-carbons carry no hydrogen, such as 2,2,4,4-tetramethylpentan-3-one, cannot form an enol.",
        },
      ],
    },

    // C2 — counting structural isomers
    {
      kind: "formula" as const,
      slug: "jcgoc-isomer-count",
      name: "Counting structural isomers of a formula",
      intuition:
        "Start with the degree of unsaturation: it tells you how many rings and π bonds the formula must contain. Then build the isomers in order: the longest chain first, then one carbon shorter with the branch placed in every distinct position, and so on. Never count a renumbered or turned-round copy twice.",
      definition:
        "- Each ring or double bond counts 1 towards the degree of unsaturation, a triple bond 2 and a benzene ring 4.\n" +
        "- Alkanes: \\(\\mathrm{C_4H_{10}}\\) has 2 structural isomers, \\(\\mathrm{C_5H_{12}}\\) 3, \\(\\mathrm{C_6H_{14}}\\) 5 and \\(\\mathrm{C_7H_{16}}\\) 9.\n" +
        "- Benzene with two groups: ortho (1,2), meta (1,3) and para (1,4), so 3 isomers. With three identical groups: 1,2,3, 1,2,4 and 1,3,5, again 3.\n" +
        "- A side chain of three carbons can join the ring at its end (propyl) or at its middle carbon (isopropyl): two different isomers.\n" +
        "- A count of structural isomers leaves out stereoisomers unless the question asks for them.",
      formula: {
        label: "Degree of unsaturation (rings + π bonds)",
        latex: "\\text{DoU} = \\dfrac{2C + 2 + N - H - X}{2}",
      },
      authoredExample: {
        prompt: "How many aromatic structural isomers have the formula \\(\\mathrm{C_8H_{10}}\\)?",
        steps: [
          "DoU \\(= (2 \\times 8 + 2 - 10)/2 = 4\\): one benzene ring and nothing else unsaturated.",
          "The ring uses six carbons, so two carbons are left for saturated side chains.",
          "As one ethyl group: ethylbenzene, 1 isomer.",
          "As two methyl groups: 1,2-, 1,3- and 1,4-dimethylbenzene (o-, m- and p-xylene), 3 isomers.",
        ],
        answer: "4: ethylbenzene and the three xylenes.",
      },
      selfCheckExample: {
        prompt: "How many structural isomers does hexane, \\(\\mathrm{C_6H_{14}}\\), have?",
        steps: [
          "Six carbons in a row: hexane.",
          "Five in a row with one methyl branch: 2-methylpentane and 3-methylpentane.",
          "Four in a row with two methyl branches: 2,2-dimethylbutane and 2,3-dimethylbutane.",
          "A three-carbon chain cannot carry the rest without becoming a longer chain again.",
        ],
        answer: "5.",
      },
      practiceSet: [
        { prompt: "What is the degree of unsaturation of \\(\\mathrm{C_6H_6}\\)?", answer: "4" },
        { prompt: "How many structural isomers does \\(\\mathrm{C_5H_{12}}\\) have?", answer: "3" },
        { prompt: "How many isomers has a benzene ring carrying three identical groups?", answer: "3 (1,2,3; 1,2,4; 1,3,5)" },
        { prompt: "What is the degree of unsaturation of \\(\\mathrm{C_4H_5N}\\)?", answer: "3" },
      ],
      pyqExampleId: "66cf2d07-fb6a-4106-a236-5d596e234114", // 2025 — structural isomers of an aromatic C9H12
      traps: [
        {
          title: "Isopropyl and propyl are different side chains",
          body: "A three-carbon side chain attached through its end carbon gives propylbenzene; attached through its middle carbon it gives isopropylbenzene (cumene). Count both.",
        },
        {
          title: "A renumbered chain is the same compound",
          body: "2-Methylpentane and 4-methylpentane are one compound numbered from opposite ends. Always name each isomer properly before you add it to the count.",
        },
        {
          title: "Nitrogen adds and halogen subtracts in the DoU formula",
          body: "Each N adds one to the top of the degree-of-unsaturation formula and each halogen counts like a hydrogen. Leaving N out makes a nitrile formula look saturated.",
        },
      ],
    },
  ],
};
