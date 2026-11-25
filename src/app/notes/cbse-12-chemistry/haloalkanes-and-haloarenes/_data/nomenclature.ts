import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature",
  title: "Nomenclature of Haloalkanes and Haloarenes",
  oneLineDefinition:
    "Common names (alkyl group plus halide) and IUPAC names (halo-substituted hydrocarbons) of haloalkanes, haloalkenes and haloarenes, with gem and vic dihalides.",
  whyItMatters:
    "7 questions, two of them from board papers: the IUPAC name of a chlorotoluene (2025) and the structure of 4-bromo-3-methylpent-2-ene (2026). Board questions on other pages of this chapter also open with a name to write (2024, 2026). The textbook adds the eight isomers of C₅H₁₁Br, names of bromoalkenes and structures from names.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcha-iupac",
      name: "IUPAC names of haloalkanes and haloalkenes",
      intuition:
        "In IUPAC a halogen is just a prefix on the parent hydrocarbon: chloro, bromo, iodo, fluoro, like methyl. So name the parent chain first, number it, then put the prefixes in alphabetical order. If the chain has a double bond, the double bond gets the lowest number, not the halogen.",
      definition:
        "- **Common name:** name of the alkyl group followed by the halide: isopropyl chloride, tert-butyl bromide, allyl bromide.\n" +
        "- **IUPAC name:** the compound is a halo-substituted hydrocarbon: 2-chloropropane, 2-bromo-2-methylpropane, 3-bromopropene.\n" +
        "- Choose the longest chain; if there is a C=C, the chain must contain it.\n" +
        "- Number the chain so that the **double bond** gets the lowest locant; then the substituents (halo and alkyl alike) get the lowest set of locants.\n" +
        "- Write the prefixes in **alphabetical order** (bromo, chloro, ethyl, iodo, methyl).\n" +
        "- If the locant set is the same from both ends, the prefix that comes first alphabetically gets the lower number.",
      authoredExample: {
        prompt: "Give the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{CH(Cl)CH(CH}_3)_2\\).",
        steps: [
          "Longest chain: \\(\\text{CH}_3\\text{-CH}_2\\text{-CH(Cl)-CH(CH}_3)\\text{-CH}_3\\), five carbons, so the parent is pentane.",
          "Numbered from the left, Cl is on C-3 and the methyl on C-4: locants {3, 4}.",
          "Numbered from the right, the methyl is on C-2 and Cl on C-3: locants {2, 3}, which is lower.",
          "Prefixes in alphabetical order: chloro before methyl.",
        ],
        answer: "3-Chloro-2-methylpentane",
      },
      selfCheckExample: {
        prompt: "Give the IUPAC name of \\(\\text{CH}_2\\text{=CHCH(Br)CH}_3\\).",
        steps: [
          "The chain has four carbons and contains the double bond: a butene.",
          "Number from the left so the double bond starts at C-1.",
          "The bromine is then on C-3.",
        ],
        answer: "3-Bromobut-1-ene",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name and the common name of (CH₃)₃CBr.", answer: "2-Bromo-2-methylpropane; tert-butyl bromide" },
        { prompt: "Write the structure of 1-bromo-2,2-dimethylpropane and give its common name.", answer: "(CH₃)₃CCH₂Br, neo-pentyl bromide" },
        { prompt: "Give the IUPAC name of allyl bromide, CH₂=CHCH₂Br.", answer: "3-Bromopropene" },
      ],
      pyqExampleId: "c3932212-648a-410c-b894-e15233555146",
      traps: [
        {
          title: "Numbering for the halogen instead of the double bond",
          body: "CH₂=CHCH₂CH₂Cl is 4-chlorobut-1-ene, not 1-chlorobut-3-ene. The double bond gets the lowest locant first (Board 2024 asked this name).",
        },
        {
          title: "Breaking a tie the wrong way",
          body: "In CH₃CH(CH₃)CH(Br)CH₃ the locants are {2, 3} from either end. Bromo comes before methyl in the alphabet, so bromine takes 2: 2-bromo-3-methylbutane (Board 2026 asked this name).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-common-names",
      name: "Common and IUPAC names, haloarenes and dihalides",
      intuition:
        "Many halides are still called by their old common names in the lab: chloroform, vinyl chloride, benzyl chloride. A board question may give either name, so learn them in pairs. For benzene rings, the common name uses o-, m- and p-, while the IUPAC name uses numbers.",
      definition:
        "- For a **monohalobenzene** the common and IUPAC names are the same: chlorobenzene, bromobenzene.\n" +
        "- For **dihalobenzenes** the common name uses o-, m-, p-; the IUPAC name uses 1,2-; 1,3-; 1,4-.\n" +
        "- On a ring with two different groups, the prefixes go in alphabetical order and the one written first takes locant 1, as in 1-chloro-2-methylbenzene.\n" +
        "- **Gem-dihalides** (both halogens on one carbon) have common names ending in alkylidene halide; **vic-dihalides** (on adjacent carbons) end in alkylene dihalide. In IUPAC both are dihaloalkanes.",
      table: {
        columns: ["Structure", "Common name", "IUPAC name"],
        rows: [
          { cells: ["CH₃CH₂CH(Cl)CH₃", "sec-Butyl chloride", "2-Chlorobutane"] },
          { cells: ["(CH₃)₃CCH₂Br", "neo-Pentyl bromide", "1-Bromo-2,2-dimethylpropane"] },
          { cells: ["CH₂=CHCl", "Vinyl chloride", "Chloroethene"] },
          { cells: ["CH₂=CHCH₂Br", "Allyl bromide", "3-Bromopropene"] },
          { cells: ["o-CH₃C₆H₄Cl", "o-Chlorotoluene", "1-Chloro-2-methylbenzene (2-chlorotoluene)"] },
          { cells: ["C₆H₅CH₂Cl", "Benzyl chloride", "Chlorophenylmethane"] },
          { cells: ["CH₂Cl₂", "Methylene chloride", "Dichloromethane"] },
          { cells: ["CHCl₃", "Chloroform", "Trichloromethane"] },
          { cells: ["CHBr₃", "Bromoform", "Tribromomethane"] },
          { cells: ["CCl₄", "Carbon tetrachloride", "Tetrachloromethane"] },
        ],
      },
      selfCheckExample: {
        prompt: "Give the IUPAC names of m-dibromobenzene and o-bromochlorobenzene.",
        steps: [
          "Meta means the two groups are on carbons 1 and 3: 1,3-dibromobenzene.",
          "Ortho means carbons 1 and 2. Bromo comes before chloro, so bromine takes locant 1.",
        ],
        answer: "1,3-Dibromobenzene and 1-bromo-2-chlorobenzene",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name of chloroform.", answer: "Trichloromethane" },
        { prompt: "What is the IUPAC name of benzyl chloride?", answer: "Chlorophenylmethane" },
        { prompt: "Is ethylidene chloride, CH₃CHCl₂, a gem or a vic dihalide?", answer: "Gem: both chlorines are on the same carbon" },
      ],
      pyqExampleId: "2e82de5c-c92d-40e8-90e9-df2776ccfb8d",
      traps: [
        {
          title: "Putting the prefixes in the wrong order",
          body: "On a benzene ring with Cl and CH₃ para to each other the name is 1-chloro-4-methylbenzene. Chloro comes first in the alphabet, so it is written first and takes locant 1; 1-methyl-4-chlorobenzene loses the mark.",
        },
        {
          title: "Using a common name where IUPAC is asked",
          body: "\"Toluene\" or \"methylene chloride\" is a common name. When the question says IUPAC, write the systematic name (methylbenzene, dichloromethane).",
        },
      ],
    },
  ],
};
