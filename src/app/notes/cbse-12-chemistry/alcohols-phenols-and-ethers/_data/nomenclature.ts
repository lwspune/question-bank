import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AP_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature",
  title: "Nomenclature: Naming Alcohols, Phenols and Ethers",
  oneLineDefinition:
    "Common and IUPAC names of alcohols, phenols and ethers: the -ol ending and its locant, diols and triols, substituted phenols, and ethers named as alkoxyalkanes.",
  whyItMatters:
    "6 questions, all from the NCERT chapter: two lists of compounds to name, a list of names to draw, the three phenols of formula C₇H₈O, and a list of ethers to name. The board does not set a naming question on its own, but from 2023 to 2026 it asks for the IUPAC name of the product inside reaction questions (the alcohol from a Grignard reagent in 2023, the product of the Reimer-Tiemann reaction in 2025, the ether made by Williamson synthesis in 2025), so a wrong name costs a mark there.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcap-naming-alcohols",
      name: "Naming alcohols and phenols",
      intuition:
        "An IUPAC name is built from the longest carbon chain that carries the OH group. Drop the final e of the alkane and add -ol, with a number that says where the OH is. The OH gets the lowest number it can. Phenols keep the name phenol, and the ring carbon with the OH is always carbon 1.",
      definition:
        "- **Common name:** alkyl group + alcohol. CH₃OH is methyl alcohol, (CH₃)₃COH is tert-butyl alcohol.\n" +
        "- **IUPAC name:** take the longest chain that contains the carbon bearing OH, number it from the end nearer the OH, and replace the e of the alkane by -ol with its locant: propan-2-ol.\n" +
        "- **Diols and triols:** keep the e of the alkane and add diol or triol with all the locants: ethane-1,2-diol, propane-1,2,3-triol (glycerol).\n" +
        "- **Cyclic alcohols:** prefix cyclo; the carbon with OH is C-1: cyclohexanol.\n" +
        "- **Phenols:** phenol is the IUPAC name too. The OH carbon is C-1: o-cresol is 2-methylphenol, p-cresol 4-methylphenol. Catechol, resorcinol and quinol are benzene-1,2-diol, benzene-1,3-diol and benzene-1,4-diol.\n" +
        "- When the OH locant ties both ways, give the lower set of numbers to the other substituents.",
      formula: {
        label: "Parts of an alcohol's IUPAC name",
        latex: "\\text{(locants)}\\,\\text{substituents} + \\text{alkan} + \\text{(OH locant)} + \\text{ol}",
      },
      authoredExample: {
        prompt: "Give the IUPAC name of \\(\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}(\\text{OH})-\\text{CH}_3\\).",
        steps: [
          "Longest chain holding the OH carbon: five carbons, so the parent is pentane.",
          "Number from the end nearer the OH: OH on C-2, CH₃ on C-4.",
          "Replace the e of pentane by -ol and put the substituent in front.",
        ],
        answer: "4-Methylpentan-2-ol",
      },
      selfCheckExample: {
        prompt: "Name the compound in which a benzene ring carries OH and, on the carbon opposite to it, a Cl atom.",
        steps: ["The OH carbon is C-1.", "The carbon opposite to it is C-4, so the name is chlorophenol with locant 4."],
        answer: "4-Chlorophenol",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name of \\(\\text{HO}-\\text{CH}_2-\\text{CH}_2-\\text{OH}\\).", answer: "Ethane-1,2-diol (ethylene glycol)" },
        { prompt: "Give the IUPAC name of resorcinol.", answer: "Benzene-1,3-diol" },
        { prompt: "Give the IUPAC name of isobutyl alcohol, \\((\\text{CH}_3)_2\\text{CH}-\\text{CH}_2\\text{OH}\\).", answer: "2-Methylpropan-1-ol" },
      ],
      pyqExampleId: "46aef73c-f777-4f75-9bc9-9a7b67cff46e",
      traps: [
        {
          title: "Numbering from the wrong end",
          body: "The OH group decides the numbering, not the substituent. \\(\\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_2\\text{CH}(\\text{CH}_3)_2\\) is 4-methylpentan-2-ol, never 2-methylpentan-4-ol.",
        },
        {
          title: "Calling benzyl alcohol a phenol",
          body: "C₆H₅CH₂OH has its OH on a CH₂ carbon, not on the ring. It is an alcohol (phenylmethanol), not a cresol, even though it has the same formula as the cresols.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcap-naming-ethers",
      name: "Naming ethers",
      intuition:
        "An ether has two groups on one oxygen. The common name lists the two groups in alphabetical order and adds ether. The IUPAC name treats the smaller group plus the oxygen as an alkoxy substituent on the larger hydrocarbon: CH₃O- is methoxy, C₂H₅O- is ethoxy.",
      definition:
        "- **Common name:** the two alkyl or aryl groups as separate words in alphabetical order, then ether: CH₃OC₂H₅ is ethyl methyl ether.\n" +
        "- **IUPAC name:** alkoxyalkane. The bigger group is the parent; the smaller group with the oxygen is the alkoxy prefix, with a locant: CH₃OCH₂CH₂CH₃ is 1-methoxypropane.\n" +
        "- With a benzene ring: C₆H₅OCH₃ is methoxybenzene (anisole); C₆H₅OC₂H₅ is ethoxybenzene (phenetole).\n" +
        "- When the chain is longer than the ring, the chain is the parent and the ring is phenoxy: C₆H₅O(CH₂)₆CH₃ is 1-phenoxyheptane.\n" +
        "- Other substituents are listed alphabetically with the alkoxy group, and the lowest set of locants wins.",
      table: {
        columns: ["Compound", "Common name", "IUPAC name"],
        rows: [
          { cells: ["CH₃OCH₃", "Dimethyl ether", "Methoxymethane"] },
          { cells: ["C₂H₅OC₂H₅", "Diethyl ether", "Ethoxyethane"] },
          { cells: ["CH₃OCH₂CH₂CH₃", "Methyl n-propyl ether", "1-Methoxypropane"] },
          { cells: ["CH₃OCH(CH₃)₂", "Methyl isopropyl ether", "2-Methoxypropane"] },
          { cells: ["C₆H₅OCH₃", "Methyl phenyl ether (anisole)", "Methoxybenzene"] },
          { cells: ["C₆H₅OCH₂CH₃", "Ethyl phenyl ether (phenetole)", "Ethoxybenzene"] },
          { cells: ["C₆H₅O(CH₂)₆CH₃", "Heptyl phenyl ether", "1-Phenoxyheptane"] },
        ],
      },
      selfCheckExample: {
        prompt: "Give the IUPAC name of \\(\\text{CH}_3\\text{O}-\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_3\\).",
        steps: ["The bigger group is butyl, so the parent is butane.", "CH₃O- is methoxy, on C-1 of the butane chain."],
        answer: "1-Methoxybutane",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name of \\(\\text{CH}_3\\text{CH}_2-\\text{O}-\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_3\\).", answer: "1-Ethoxybutane" },
        { prompt: "Give the common name and the IUPAC name of C₂H₅OC₂H₅.", answer: "Diethyl ether; ethoxyethane" },
        { prompt: "Write the structure of 2-ethoxypropane.", answer: "\\(\\text{CH}_3-\\text{CH}(\\text{OC}_2\\text{H}_5)-\\text{CH}_3\\)" },
      ],
      pyqExampleId: "f5d34edf-f7b7-4daa-a33d-28f6314ce777",
      traps: [
        {
          title: "Naming the bigger group as the alkoxy",
          body: "The smaller group goes with the oxygen as the prefix. Straight-chain C₂H₅OC₃H₇ is 1-ethoxypropane, not 1-propoxyethane.",
        },
        {
          title: "Common names out of alphabetical order",
          body: "In a common name the groups are written alphabetically: ethyl methyl ether, not methyl ethyl ether.",
        },
      ],
    },
  ],
};
