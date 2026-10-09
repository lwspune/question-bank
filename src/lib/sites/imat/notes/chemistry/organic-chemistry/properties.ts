import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ORG_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties",
  title: "Physical Properties: Boiling Points and Solubility",
  oneLineDefinition:
    "Boiling point and solubility depend on the forces between molecules: chain length, branching and above all hydrogen bonding.",
  whyItMatters:
    "The 2025 paper offered wrong options about how amino acids dissolve in water and in hexane, and the 2013 paper asked whether isomers must have similar physical properties. Comparing boiling points and solubilities is standard syllabus even where the past papers have not asked it directly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-org-boiling",
      name: "Boiling points of organic compounds: size, branching and hydrogen bonds",
      intuition:
        "To boil a liquid you pull its molecules apart from each other; you do not break the bonds inside them. Bigger molecules have more electrons and touch over a larger area, so they attract more. Molecules with O-H or N-H can also hydrogen bond, which is much stronger, so they boil far higher than molecules of the same size without it.",
      definition:
        "Forces between molecules, weakest to strongest:\n" +
        "- **London (dispersion) forces**: in every molecule; grow with chain length and surface contact.\n" +
        "- **Dipole-dipole forces**: in polar molecules such as aldehydes, ketones, esters and haloalkanes.\n" +
        "- **Hydrogen bonds**: between molecules that have O-H or N-H (alcohols, carboxylic acids, amines, amides). Carboxylic acids pair up through two hydrogen bonds.\n" +
        "For molecules of similar size the boiling points rise in the order: **alkane < ether < aldehyde or ketone < alcohol < carboxylic acid**. Amines hydrogen bond more weakly than alcohols (N-H is less polar than O-H), so they boil lower than alcohols of similar size.\n" +
        "- **Branching lowers** the boiling point: a compact molecule has less surface contact than a straight chain with the same formula.",
      table: {
        columns: ["Factor", "Effect on boiling point", "Example pair (approximate boiling points)"],
        rows: [
          { cells: ["Longer chain", "Higher", "Butane −1 °C < pentane 36 °C"] },
          { cells: ["More branching", "Lower", "2,2-dimethylpropane 10 °C < pentane 36 °C"] },
          { cells: ["Hydrogen bonding (O-H)", "Much higher", "Dimethyl ether −24 °C < ethanol 78 °C (both \\(M = 46\\))"] },
          { cells: ["Polar C=O", "Higher than an alkane", "Butane −1 °C < propanone 56 °C (both \\(M = 58\\))"] },
          { cells: ["Two hydrogen bonds per pair (acid)", "Highest for its size", "Propan-1-ol 97 °C < ethanoic acid 118 °C (both \\(M = 60\\))"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Butane, propanal and propan-1-ol have similar molar masses. Which order shows them from lowest to highest boiling point?",
        options: [
          "Propan-1-ol, propanal, butane",
          "Propanal, butane, propan-1-ol",
          "Butane, propan-1-ol, propanal",
          "Butane, propanal, propan-1-ol",
          "Propanal, propan-1-ol, butane",
        ],
        steps: [
          "Butane has only London forces: lowest.",
          "Propanal has a polar C=O, so dipole-dipole forces as well: higher.",
          "Propan-1-ol has an O-H, so it forms hydrogen bonds between molecules: highest.",
          "Option A is the reverse order. Option C puts the aldehyde above the alcohol, but a C=O cannot hydrogen bond to another aldehyde molecule.",
        ],
        answer: "(D) Butane, propanal, propan-1-ol",
      },
      practiceSet: [
        { prompt: "Which boils higher: hexane or 2-methylpentane?", answer: "Hexane", method: "Same formula; the straight chain has more surface contact" },
        { prompt: "Why does ethanol boil far higher than dimethyl ether, its isomer?", answer: "Ethanol molecules hydrogen bond to each other through O-H; the ether has no O-H", method: "Same molar mass, different forces" },
        { prompt: "Which boils higher: methylamine \\(\\mathrm{CH_3NH_2}\\) or ethane \\(\\mathrm{C_2H_6}\\)?", answer: "Methylamine", method: "N-H hydrogen bonding; the masses are similar" },
      ],
      traps: [
        {
          title: "Boiling breaks forces between molecules, not covalent bonds",
          body: "When ethanol boils, its molecules separate but each one stays whole: the C-O and O-H bonds are not broken. Options that explain a boiling point by bond strength inside the molecule are wrong.",
        },
        {
          title: "Branching lowers the boiling point even with the same formula",
          body: "Isomers have the same molar mass but can boil at very different temperatures. The more branched isomer is more compact, touches its neighbours less, and boils lower.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-org-solubility",
      name: "Solubility of organic compounds in water and in non-polar solvents",
      intuition:
        "Like dissolves like. Water molecules hold each other by hydrogen bonds, so a substance dissolves in water only if it can join in with hydrogen bonds or ionic attractions of its own. A long hydrocarbon tail cannot, so as the tail grows, water solubility falls and solubility in oils and hexane rises.",
      definition:
        "- Small alcohols, carboxylic acids, aldehydes, ketones and amines (up to about 3 or 4 carbons) **mix with water**: they hydrogen bond with water molecules.\n" +
        "- A C=O oxygen cannot hydrogen bond to another aldehyde or ketone, but it can **accept** a hydrogen bond from water. That is why propanone mixes with water.\n" +
        "- As the carbon chain gets longer, water solubility **falls** (hexan-1-ol dissolves only a little).\n" +
        "- Hydrocarbons and haloalkanes do **not** dissolve in water; they dissolve in non-polar solvents such as hexane. Liquid hydrocarbons are less dense than water and float on it.\n" +
        "- Ionic organic compounds (carboxylate salts, amine salts, amino acid zwitterions) dissolve in water and not in hexane.",
      table: {
        columns: ["Compound type", "In water", "In hexane", "Reason"],
        rows: [
          { cells: ["Ethanol, ethanoic acid", "Mixes completely", "Soluble", "Small, hydrogen bonds with water"] },
          { cells: ["Propanone", "Mixes completely", "Soluble", "C=O accepts hydrogen bonds from water"] },
          { cells: ["Hexan-1-ol", "Slightly soluble", "Soluble", "Long non-polar tail outweighs the OH"] },
          { cells: ["Hexane, chloroethane", "Insoluble", "Soluble", "No hydrogen bonding with water"] },
          { cells: ["Sodium ethanoate, glycine", "Soluble", "Insoluble", "Ionic"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these substances is the least soluble in water?",
        options: [
          "Octane",
          "Ethanol",
          "Ethanoic acid",
          "Propanone",
          "Glycine",
        ],
        steps: [
          "Octane is a hydrocarbon: no O-H, no C=O, no charge, so it cannot hydrogen bond with water and does not dissolve.",
          "Ethanol and ethanoic acid hydrogen bond with water. Propanone accepts hydrogen bonds from water. Glycine is a zwitterion and dissolves like an ionic compound.",
        ],
        answer: "(A) Octane",
      },
      practiceSet: [
        { prompt: "Does water solubility of alcohols rise or fall as the chain gets longer?", answer: "It falls", method: "The non-polar part grows" },
        { prompt: "Sodium ethanoate is shaken with water and with hexane. Where does it dissolve?", answer: "In water", method: "It is ionic" },
        { prompt: "Suggest a solvent for removing a grease stain made of long hydrocarbon chains.", answer: "A non-polar solvent such as hexane", method: "Like dissolves like" },
      ],
      traps: [
        {
          title: "A molecule does not need its own O-H to dissolve in water",
          body: "Propanone and small esters have no O-H, yet they dissolve because water can hydrogen bond to their oxygen. The test is whether the molecule can hydrogen bond with water, not with itself.",
        },
      ],
    },
  ],
};
