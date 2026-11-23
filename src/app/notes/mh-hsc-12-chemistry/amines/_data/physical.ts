import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_PHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties of Amines",
  title: "Boiling Points and Solubility of Amines",
  oneLineDefinition:
    "How hydrogen bonding through N-H decides the boiling points of isomeric amines, why branching lowers the boiling point, and how amines compare with alkanes and alcohols in boiling point and solubility.",
  whyItMatters:
    "2 questions, both from the textbook exercise: the boiling point order of three amines of formula C₃H₉N, and which of the four butylamines boils highest. No board paper in this bank asked this page, but its reason, hydrogen bonding through the N-H bond, comes back in the basicity and Hinsberg answers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccam-boiling-isomers",
      name: "Hydrogen bonding and the boiling points of isomers",
      intuition:
        "Molecules that hold on to each other strongly need more heat to pull apart, so they boil higher. A primary amine has two hydrogen atoms on nitrogen to make hydrogen bonds with, a secondary amine has one, and a tertiary amine has none. For isomers, which have the same molar mass, that count decides the order.",
      definition:
        "- The N-H bond is polar, because nitrogen (electronegativity 3.0) and hydrogen (2.1) differ.\n" +
        "- So primary and secondary amines show **intermolecular hydrogen bonding**. It is greater in primary amines, which have two H atoms on nitrogen, than in secondary amines, which have one.\n" +
        "- Tertiary amines have no H on nitrogen, so no intermolecular hydrogen bonding. They are polar (polar N-C bonds) and have only dipole-dipole attractions.\n" +
        "- So intermolecular forces are strongest in primary and weakest in tertiary amines, and for isomeric amines the boiling points are **primary > secondary > tertiary**.",
      table: {
        columns: ["Isomer of C₄H₁₁N", "Class", "Hydrogen atoms on N", "Boiling point (K)"],
        rows: [
          { cells: ["n-Butylamine, \\(\\text{CH}_3(\\text{CH}_2)_3\\text{NH}_2\\)", "Primary", "2", "350.8"] },
          { cells: ["Diethylamine, \\((\\text{C}_2\\text{H}_5)_2\\text{NH}\\)", "Secondary", "1", "329.3"] },
          { cells: ["Ethyldimethylamine, \\(\\text{C}_2\\text{H}_5\\text{N(CH}_3)_2\\)", "Tertiary", "0", "310.5"] },
        ],
        caption: "All three have molar mass 73 g mol⁻¹ (textbook Table 13.3).",
      },
      selfCheckExample: {
        prompt: "Ethylamine and dimethylamine are isomers of formula C₂H₇N. Which has the higher boiling point? Give the reason.",
        steps: [
          "Ethylamine, \\(\\text{C}_2\\text{H}_5\\text{NH}_2\\), is primary: two H atoms on nitrogen.",
          "Dimethylamine, \\((\\text{CH}_3)_2\\text{NH}\\), is secondary: one H atom on nitrogen.",
          "The primary amine forms more intermolecular hydrogen bonds, so it needs more heat to boil.",
        ],
        answer: "Ethylamine, because it has more extensive intermolecular hydrogen bonding",
      },
      practiceSet: [
        { prompt: "Why does a tertiary amine have no intermolecular hydrogen bonding?", answer: "It has no hydrogen atom on nitrogen" },
        { prompt: "What forces act between molecules of a tertiary amine?", answer: "Dipole-dipole attractions, from its polar N-C bonds" },
        { prompt: "Write the order of boiling points of isomeric primary, secondary and tertiary amines.", answer: "Primary > secondary > tertiary" },
      ],
      pyqExampleId: "bed27467-d922-4f1c-984b-85dbb4a9d1fa",
      traps: [
        {
          title: "Ranking isomers by molar mass",
          body: "Isomers all have the same molar mass, so it cannot decide their order. Count the H atoms on nitrogen: that sets the extent of hydrogen bonding.",
        },
        {
          title: "Giving a tertiary amine hydrogen bonds",
          body: "A tertiary amine can accept a hydrogen bond from water, but it cannot hydrogen bond to another tertiary amine molecule, because it has no N-H. Its molecules attract only by dipole-dipole forces.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccam-branching-solubility",
      name: "Branching, other families and solubility",
      intuition:
        "A long, straight molecule touches its neighbours along its whole length; a branched one is rounder and touches less, so it boils lower. Across families of the same molar mass, what matters is how strongly the molecules hydrogen bond: alkanes not at all, amines through the weaker N-H, alcohols through the stronger O-H, and carboxylic acids most of all.",
      definition:
        "- **Branching** lowers the boiling point: n-butylamine boils at 350.8 K and tert-butylamine, \\((\\text{CH}_3)_3\\text{C-NH}_2\\), at 318.15 K, with the same molar mass 73.\n" +
        "- For comparable molar masses, boiling points rise in the order **alkanes < amines < alcohols < carboxylic acids** (2-methylbutane 300.8 K, n-butylamine 350.8 K, butan-1-ol 390.3 K, propanoic acid 414.4 K).\n" +
        "- **Solubility:** lower aliphatic amines dissolve in water because they form hydrogen bonds with water molecules. Solubility falls as molar mass rises, because the hydrophobic alkyl group grows. Aromatic amines and higher aliphatic amines are insoluble in water.\n" +
        "- N-H bonds are less polar than O-H bonds, so for comparable molar masses the solubility in water is **alcohols > amines > alkanes**.\n" +
        "- **State and colour:** lower aliphatic amines are gases with a fishy odour, middle members are liquids and higher members are solids. Aniline and other arylamines are usually colourless liquids but get coloured on standing, because air oxidises them.",
      formula: {
        label: "Boiling points at comparable molar mass",
        latex: "\\text{alkanes} < \\text{amines} < \\text{alcohols} < \\text{carboxylic acids}",
      },
      authoredExample: {
        prompt: "Arrange \\(\\text{C}_2\\text{H}_5\\text{OH}\\), \\(\\text{C}_2\\text{H}_5\\text{NH}_2\\) and \\((\\text{CH}_3)_2\\text{NH}\\) in decreasing order of boiling point. Give reasons.",
        steps: [
          "All three have molar mass 45 or 46 g mol⁻¹, so the intermolecular forces decide.",
          "Ethanol hydrogen bonds through O-H, which is more polar than N-H, so it boils highest.",
          "Ethylamine (primary) has two H atoms on nitrogen and dimethylamine (secondary) has one, so ethylamine hydrogen bonds more.",
        ],
        answer: "\\(\\text{C}_2\\text{H}_5\\text{OH} > \\text{C}_2\\text{H}_5\\text{NH}_2 > (\\text{CH}_3)_2\\text{NH}\\)",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\text{C}_2\\text{H}_5\\text{NH}_2\\), \\(\\text{C}_3\\text{H}_7\\text{NH}_2\\) and \\(\\text{C}_6\\text{H}_5\\text{NH}_2\\) in increasing order of solubility in water.",
        steps: [
          "Aniline is an aromatic amine, insoluble in water: least soluble.",
          "Between the two aliphatic amines, solubility falls as the alkyl group grows, so propylamine is less soluble than ethylamine.",
        ],
        answer: "\\(\\text{C}_6\\text{H}_5\\text{NH}_2 < \\text{C}_3\\text{H}_7\\text{NH}_2 < \\text{C}_2\\text{H}_5\\text{NH}_2\\)",
      },
      practiceSet: [
        { prompt: "Which boils higher, butan-1-ol or n-butylamine?", answer: "Butan-1-ol (390.3 K against 350.8 K): O-H hydrogen bonds are stronger" },
        { prompt: "Why are the lower aliphatic amines soluble in water?", answer: "They form hydrogen bonds with water molecules" },
        { prompt: "Why does a sample of aniline darken on standing in air?", answer: "Air oxidises it, and the products are coloured" },
        { prompt: "Arrange alcohols, alkanes and amines of comparable molar mass in decreasing order of solubility in water.", answer: "Alcohols > amines > alkanes" },
      ],
      pyqExampleId: "0d4cb18a-b614-4219-994b-781a29a6d93e",
      traps: [
        {
          title: "Amines above alcohols",
          body: "Nitrogen is less electronegative than oxygen, so N-H hydrogen bonds are weaker than O-H ones. Amines boil lower than alcohols of similar molar mass, and are less soluble in water.",
        },
        {
          title: "Calling aniline soluble because it is an amine",
          body: "Only the lower aliphatic amines dissolve in water. Aniline, with its large hydrophobic benzene ring, is insoluble; it dissolves in dilute HCl instead, as anilinium chloride.",
        },
      ],
    },
  ],
};
