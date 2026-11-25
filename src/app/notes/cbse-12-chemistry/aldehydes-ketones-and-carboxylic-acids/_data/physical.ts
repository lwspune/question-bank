import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_PHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties of Aldehydes and Ketones",
  title: "Physical Properties of Aldehydes and Ketones",
  oneLineDefinition:
    "Aldehydes and ketones boil above hydrocarbons and ethers of similar molar mass (dipole-dipole attraction) but below alcohols (no hydrogen bonding between their molecules); the lower members dissolve in water by hydrogen bonding with it.",
  whyItMatters:
    "3 questions, one of them from a board paper: 2025 set an assertion-reason item on why solubility in water falls as the alkyl group grows. The textbook adds two boiling point orders. Boiling point orders also come inside longer board questions on the other pages of this chapter (2022, 2024 and 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcak-boiling",
      name: "Boiling points: between hydrocarbons and alcohols",
      intuition:
        "Molecules that hold each other more strongly need more heat to separate. A hydrocarbon has only weak van der Waals forces. A C=O group is strongly polar, so aldehyde and ketone molecules attract each other end to end. But they have no O-H, so they cannot hydrogen bond with each other the way alcohols do.",
      definition:
        "- Methanal is a gas at room temperature, ethanal a volatile liquid; other aldehydes and ketones are liquids or solids.\n" +
        "- Boiling points are **higher than hydrocarbons and ethers** of similar molar mass, because of weak molecular association by **dipole-dipole interaction**.\n" +
        "- Boiling points are **lower than alcohols** of similar molar mass, because there is **no intermolecular hydrogen bonding**.\n" +
        "- The comparison only works for compounds of **comparable molar mass**.",
      formula: {
        label: "Boiling point order at similar molar mass",
        latex: "\\text{alkane} < \\text{ether} < \\text{aldehyde, ketone} < \\text{alcohol}",
      },
      authoredExample: {
        prompt: "Arrange n-butane, methoxyethane, propanal and propan-1-ol (molar masses 58 to 60) in increasing order of boiling point.",
        steps: [
          "n-Butane is non-polar: only weak van der Waals forces. Lowest.",
          "Methoxyethane is weakly polar, with no O-H.",
          "Propanal has the strongly polar C=O: stronger dipole-dipole attraction than the ether.",
          "Propan-1-ol has an O-H and hydrogen bonds between its molecules. Highest.",
          "Boiling points: 273 K < 281 K < 322 K < 370 K.",
        ],
        answer: "n-Butane < methoxyethane < propanal < propan-1-ol",
      },
      selfCheckExample: {
        prompt: "Which boils higher, propanone or propan-2-ol? Give the reason.",
        steps: [
          "Both have three carbons and nearly the same molar mass.",
          "Propan-2-ol has an O-H, so its molecules hydrogen bond with each other.",
          "Propanone has only dipole-dipole attraction between its molecules.",
        ],
        answer: "Propan-2-ol, because of intermolecular hydrogen bonding",
      },
      practiceSet: [
        { prompt: "Why does ethanal boil higher than propane, though their molar masses are close?", answer: "Ethanal's polar C=O gives dipole-dipole attraction; propane has only weak van der Waals forces" },
        { prompt: "Which boils higher, butanone or diethyl ether?", answer: "Butanone: its C=O is more polar than the ether's C-O-C" },
        { prompt: "Name the attraction present between propanone molecules but absent between propane molecules.", answer: "Dipole-dipole attraction" },
      ],
      pyqExampleId: "a3a9b3f0-e00c-4aa9-8953-e711c13fbd96",
      traps: [
        {
          title: "Giving aldehydes hydrogen bonds between their own molecules",
          body: "An aldehyde or ketone has no hydrogen on oxygen, so its molecules cannot hydrogen bond with each other. They can only accept a hydrogen bond from water. That is why they boil below alcohols.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcak-solubility",
      name: "Solubility, state and odour",
      intuition:
        "Water molecules can hydrogen bond to the oxygen of a C=O group, so small aldehydes and ketones mix with water. Every extra CH₂ adds a part that water cannot grip, so as the chain grows the compound dissolves less and less.",
      definition:
        "- **Methanal, ethanal and propanone** are miscible with water in all proportions, because they **form hydrogen bonds with water**.\n" +
        "- Solubility **decreases rapidly** as the alkyl chain gets longer.\n" +
        "- All aldehydes and ketones are fairly soluble in organic solvents such as benzene, ether, methanol and chloroform.\n" +
        "- Lower aldehydes have sharp, pungent odours; larger molecules smell less pungent and more fragrant, and many are used in perfumes and flavours.",
      table: {
        columns: ["Property", "What is observed", "Reason"],
        rows: [
          { cells: ["Solubility of lower members", "Methanal, ethanal and propanone mix with water in all proportions", "Their C=O oxygen accepts hydrogen bonds from water"] },
          { cells: ["Solubility of higher members", "Falls rapidly as the alkyl chain grows", "The larger hydrocarbon part cannot hydrogen bond with water"] },
          { cells: ["Organic solvents", "All are fairly soluble in benzene, ether, methanol and chloroform", "Their hydrocarbon part mixes well with organic solvents"] },
          { cells: ["Physical state", "Methanal a gas, ethanal a volatile liquid, others liquids or solids", "Attraction between molecules grows with size"] },
          { cells: ["Odour", "Lower aldehydes pungent; larger ones fragrant", "Used in perfumes and flavouring agents"] },
        ],
      },
      selfCheckExample: {
        prompt: "Ethanal molecules cannot hydrogen bond with each other. Why, then, does ethanal mix with water?",
        steps: [
          "Water has O-H groups that can donate a hydrogen bond.",
          "The oxygen of ethanal's C=O has lone pairs that accept it.",
          "So ethanal hydrogen bonds with water, though not with itself.",
        ],
        answer: "Its carbonyl oxygen accepts hydrogen bonds from water molecules",
      },
      practiceSet: [
        { prompt: "What is the physical state of methanal at room temperature?", answer: "A gas" },
        { prompt: "How does the odour of aldehydes change as the molecule gets bigger?", answer: "It becomes less pungent and more fragrant" },
        { prompt: "Name two organic solvents in which aldehydes and ketones are fairly soluble.", answer: "Any two of benzene, ether, methanol and chloroform" },
      ],
      pyqExampleId: "6b79724b-8541-49c4-a32c-a48f73a9abf9",
      traps: [
        {
          title: "Using dipole-dipole attraction to explain solubility",
          body: "Dipole-dipole attraction between carbonyl molecules explains their boiling points. Solubility in water comes from hydrogen bonds with water, and it falls because the hydrocarbon part grows.",
        },
      ],
    },
  ],
};
