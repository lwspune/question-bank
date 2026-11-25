import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_ACIDPHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties of Carboxylic Acids",
  title: "Physical Properties of Carboxylic Acids",
  oneLineDefinition:
    "Carboxylic acids boil higher than aldehydes, ketones and even alcohols of similar molar mass because their molecules hydrogen bond into dimers; the lower acids mix with water and solubility falls as the chain grows.",
  whyItMatters:
    "1 question, from the 2024 board paper: which of ethanal, ethanoyl chloride, propanone and ethanoic acid boils highest. The same reason (hydrogen bonded dimers) is asked inside longer board questions on the other pages, in 2022, 2023 and 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcak-acid-boiling",
      name: "Boiling point and solubility: hydrogen bonded dimers",
      intuition:
        "An acid molecule has both an O-H to give a hydrogen bond and a C=O to take one. Two molecules lock together face to face through two hydrogen bonds, so the acid behaves like a molecule twice its size. That is why acids boil even higher than alcohols of the same mass.",
      definition:
        "- Aliphatic acids up to nine carbons are colourless liquids with unpleasant odours; higher acids are wax-like solids, nearly odourless because they are not volatile.\n" +
        "- Acids boil **higher than aldehydes, ketones and even alcohols** of comparable molar mass, because of **more extensive intermolecular hydrogen bonding**.\n" +
        "- The hydrogen bonds are not broken completely even in the vapour: most acids exist as **dimers** in the vapour phase and in aprotic solvents.\n" +
        "- Acids with up to **four carbons are miscible with water** (hydrogen bonds with water). Solubility falls as the hydrocarbon part grows; higher acids are practically insoluble.\n" +
        "- **Benzoic acid** is nearly insoluble in cold water. Acids also dissolve in benzene, ether, alcohol and chloroform.",
      formula: {
        label: "Boiling point order at similar molar mass",
        latex: "\\text{aldehyde, ketone} < \\text{alcohol} < \\text{carboxylic acid}",
      },
      authoredExample: {
        prompt: "Arrange propanal, propan-1-ol and ethanoic acid (molar masses 58 to 60) in increasing order of boiling point. Give the reason.",
        steps: [
          "Propanal has a polar C=O but no O-H: only dipole-dipole attraction (322 K).",
          "Propan-1-ol hydrogen bonds through its O-H (370 K).",
          "Ethanoic acid forms two hydrogen bonds per pair of molecules, as dimers: the highest of the three.",
        ],
        answer: "Propanal < propan-1-ol < ethanoic acid",
      },
      selfCheckExample: {
        prompt: "Ethanoic acid mixes with water in all proportions, but benzoic acid hardly dissolves in cold water. Why?",
        steps: [
          "Both can hydrogen bond with water through -COOH.",
          "In benzoic acid the large benzene ring is a hydrocarbon part that water cannot hold.",
          "Ethanoic acid's hydrocarbon part is only one CH₃.",
        ],
        answer: "The large hydrophobic ring of benzoic acid outweighs the hydrogen bonding of its -COOH",
      },
      practiceSet: [
        { prompt: "Up to how many carbon atoms are simple aliphatic carboxylic acids miscible with water?", answer: "Four" },
        { prompt: "In what form do most carboxylic acids exist in the vapour phase?", answer: "As hydrogen bonded dimers" },
        { prompt: "Why are the higher fatty acids practically odourless?", answer: "They have very low volatility" },
      ],
      pyqExampleId: "3e7ef460-f78f-4352-8e79-be502740ee1e",
      traps: [
        {
          title: "Saying the hydrogen bonds break on boiling",
          body: "Even in the vapour most acids stay paired as dimers. Write \"two hydrogen bonds hold a pair of molecules together\" to explain why the boiling point beats that of an alcohol.",
        },
      ],
    },
  ],
};
