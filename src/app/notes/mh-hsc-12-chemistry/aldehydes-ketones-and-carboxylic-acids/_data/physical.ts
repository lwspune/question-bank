import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_PHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties",
  title: "Physical Properties",
  oneLineDefinition:
    "Why carboxylic acids boil highest, how dipole-dipole forces and hydrogen bonds set the boiling points of carbonyl compounds, how well they dissolve in water, and named facts such as formalin and carbonyl flavours.",
  whyItMatters:
    "4 questions, two of them from board papers: why carboxylic acids boil higher than the corresponding alcohols (2015) and the compound used as pistachio flavour in ice cream (2019). The textbook adds what formalin is and an order of boiling points.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccak-boiling-points",
      name: "Intermolecular forces and boiling points",
      intuition:
        "A liquid boils when its molecules are pulled apart, so the stronger they attract one another, the higher it boils. Alkanes have only weak van der Waals forces. The polar C=O bond adds dipole-dipole attraction. An O-H bond adds hydrogen bonds. A carboxylic acid does best of all: two molecules hold each other by two hydrogen bonds.",
      definition:
        "- The C=O bond is **polar covalent**, so aldehydes and ketones attract one another by **dipole-dipole forces**. They have no O-H bond, so they cannot hydrogen bond with one another.\n" +
        "- In the liquid, carboxylic acids form a **dimer**: the acidic H of one molecule hydrogen bonds to the C=O oxygen of the other, and the other way round, so two hydrogen bonds hold the pair. This doubles the size of the unit and raises the van der Waals forces too. Acetic acid stays as a dimer even in the vapour.\n" +
        "- So at comparable molecular mass: carboxylic acids > alcohols > ketones > aldehydes > ethers > alkanes.\n" +
        "- Boiling points rise along each homologous series as molecular mass increases.",
      table: {
        columns: ["Compound (molecular mass 58 or 60)", "Boiling point", "Strongest force between molecules"],
        rows: [
          { cells: ["Butane, CH₃CH₂CH₂CH₃ (58)", "272 K", "van der Waals forces"] },
          { cells: ["Methoxyethane, CH₃OCH₂CH₃ (60)", "281 K", "Weak dipole-dipole attraction"] },
          { cells: ["Propanal, CH₃CH₂CHO (58)", "322 K", "Dipole-dipole attraction"] },
          { cells: ["Propanone, CH₃COCH₃ (58)", "329 K", "Dipole-dipole attraction"] },
          { cells: ["Propan-1-ol, CH₃CH₂CH₂OH (60)", "370 K", "Hydrogen bonds"] },
          {
            cells: ["Ethanoic acid, CH₃COOH (60)", "391 K", "Two hydrogen bonds in each dimer"],
            pyqExampleId: "52e33dc7-1470-4ce2-9df8-b419bc628bf3",
            noteAmber: "Board 2015 asked why carboxylic acids boil higher than the corresponding alcohols.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Arrange propanal, propan-1-ol and butane in increasing order of boiling point.", answer: "Butane < propanal < propan-1-ol" },
        { prompt: "Propanone and butane both have molecular mass 58. Why does propanone boil higher?", answer: "Its polar C=O bond gives dipole-dipole attraction; butane has only van der Waals forces" },
        { prompt: "Why do aldehydes boil lower than alcohols of similar mass?", answer: "Aldehydes have no O-H bond, so their molecules cannot hydrogen bond with one another" },
      ],
      traps: [
        {
          title: "Answering 'hydrogen bonding' and stopping",
          body: "Alcohols hydrogen bond too, so that alone does not explain why acids boil higher. The mark is for the dimer: two molecules held by two hydrogen bonds, which doubles the size of the unit.",
        },
        {
          title: "Aldehydes hydrogen bonded to each other",
          body: "An aldehyde has no O-H bond, so its molecules attract one another only by dipole-dipole forces. Its C=O oxygen can, however, accept a hydrogen bond from water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccak-state-solubility",
      name: "Physical state, solubility and everyday carbonyl compounds",
      intuition:
        "Small carbonyl compounds and acids dissolve in water because their oxygen atoms hydrogen bond with water. As the carbon chain grows, the oily hydrocarbon part takes over and solubility falls. Many familiar smells and flavours are aldehydes or ketones.",
      definition:
        "- **State:** formaldehyde is a gas with an irritating odour; acetaldehyde is a very volatile colourless liquid; acetone is a liquid with a pleasant odour. Lower aliphatic acids (up to nine carbons) are colourless liquids with irritating odours; higher ones are odourless wax-like solids.\n" +
        "- **Solubility of aldehydes and ketones:** the C=O oxygen hydrogen bonds with water, so the lower members (acetaldehyde, acetone) dissolve. Solubility falls as the molecular mass rises.\n" +
        "- **Solubility of acids:** acids with up to four carbons mix with water in all proportions through hydrogen bonds; higher acids are practically insoluble because of the large hydrophobic hydrocarbon part.\n" +
        "- **Commercial forms:** formaldehyde is sold as formalin, or as the solids paraformaldehyde and trioxane; acetaldehyde as its solid trimer (paraldehyde) and tetramer (metaldehyde).",
      table: {
        columns: ["Compound", "What the book says about it"],
        rows: [
          { cells: ["Formalin", "Aqueous solution of formaldehyde gas; used to preserve biological and anatomical specimens"] },
          { cells: ["Paraformaldehyde and trioxane", "Solid forms of formaldehyde, convenient sources of it; heating them gives dry formaldehyde"] },
          {
            cells: ["Acetophenone", "Smell of pistachio; used in ice cream"],
            pyqExampleId: "da56b8b4-437f-400b-ae28-e1c4fc3db455",
            noteAmber: "Board 2019 asked which compound gives the pistachio flavour in ice cream.",
          },
          { cells: ["Butyraldehyde", "Buttery odour; used in margarine and food"] },
          { cells: ["Muscone", "Musky aroma; used in perfumes"] },
          { cells: ["Benzaldehyde, vanillin, cinnamaldehyde", "Bitter almond, vanilla and cinnamon flavours"] },
          { cells: ["Butane-2,3-dione", "The butter flavour of popcorn"] },
        ],
      },
      practiceSet: [
        { prompt: "Why are acetaldehyde and acetone soluble in water?", answer: "The C=O oxygen forms hydrogen bonds with water molecules" },
        { prompt: "Why are higher carboxylic acids practically insoluble in water?", answer: "Their large hydrocarbon part is hydrophobic" },
        { prompt: "How is dry formaldehyde obtained when it is needed?", answer: "By heating paraformaldehyde or trioxane" },
      ],
      traps: [
        {
          title: "Formalin as solid formaldehyde",
          body: "Formalin is the aqueous solution. The solid forms are paraformaldehyde and trioxane.",
        },
      ],
    },
  ],
};
