import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_PHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties of Amines",
  title: "Physical Properties of Amines",
  oneLineDefinition:
    "State and smell of amines, solubility in water and organic solvents, and boiling points set by hydrogen bonding, compared with alcohols and alkanes of similar mass.",
  whyItMatters:
    "3 questions, all from board papers and all assertion-reason items: butan-1-ol boils higher than butan-1-amine (2024), and diethylamine boils lower than butan-1-amine, set twice in 2025, once with a true reason and once with a false one. Orders of boiling point and of solubility in water also come as parts of longer questions on other pages of this chapter, every year from 2022 to 2025.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcam-boiling",
      name: "Boiling points and hydrogen bonding",
      intuition:
        "To boil a liquid you must pull its molecules apart. Primary and secondary amines hold each other by hydrogen bonds between N-H and the nitrogen of a neighbour, so they boil higher than an alkane of the same mass. The more N-H hydrogens a molecule has, the more it holds on, so among isomers the primary amine boils highest and the tertiary amine lowest.",
      definition:
        "- The lower aliphatic amines are **gases with a fishy odour**. Primary amines with three or more carbons are liquids; higher ones are solids.\n" +
        "- Aniline and other arylamines are usually colourless but **become coloured on storage** because of atmospheric oxidation.\n" +
        "- Primary and secondary amines show **intermolecular hydrogen bonding**; it is more in primary amines, which have two hydrogens on nitrogen.\n" +
        "- Tertiary amines have no hydrogen on nitrogen, so they show no intermolecular association.\n" +
        "- Boiling points of **isomeric amines: primary > secondary > tertiary**.\n" +
        "- Alcohols boil higher than amines of similar mass: they are more polar and form stronger hydrogen bonds.",
      table: {
        columns: ["Compound", "Class", "Molar mass (g/mol)", "Boiling point (K)"],
        rows: [
          { cells: ["n-C₄H₉OH", "Alcohol", "74", "390.3"] },
          { cells: ["n-C₄H₉NH₂", "Primary amine", "73", "350.8"] },
          {
            cells: ["(C₂H₅)₂NH", "Secondary amine", "73", "329.3"],
            pyqExampleId: "bd8505a3-2a19-41f7-b5c4-a2329484ff0e",
            noteAmber: "Board 2025 gave this boiling point with a reason that put the hydrogen bonding in diethylamine: Assertion true, Reason false, (C).",
          },
          { cells: ["C₂H₅N(CH₃)₂", "Tertiary amine", "73", "310.5"] },
          { cells: ["C₂H₅CH(CH₃)₂", "Alkane", "72", "300.8"] },
        ],
        caption: "Compounds of almost the same molar mass, from NCERT's Table 9.2.",
      },
      selfCheckExample: {
        prompt: "Arrange propan-1-amine, N-methylethanamine and N,N-dimethylmethanamine in increasing order of boiling point.",
        steps: [
          "All three are C₃H₉N, so they are isomers and hydrogen bonding decides.",
          "N,N-Dimethylmethanamine is tertiary: no N-H, no hydrogen bonding between molecules.",
          "N-Methylethanamine is secondary: one N-H. Propan-1-amine is primary: two N-H, the most association.",
        ],
        answer: "N,N-Dimethylmethanamine < N-methylethanamine < propan-1-amine",
      },
      practiceSet: [
        { prompt: "Why does aniline become coloured when it is stored?", answer: "It is oxidised by the air (atmospheric oxidation)" },
        { prompt: "What is the state and smell of the lower aliphatic amines?", answer: "Gases with a fishy odour" },
        { prompt: "Which boils higher, N,N-dimethylethanamine (molar mass 73) or 2-methylbutane (molar mass 72)?", answer: "N,N-Dimethylethanamine: 310.5 K against 300.8 K" },
      ],
      pyqExampleId: "495f2e48-09dc-43a7-8464-9a43bca34c87",
      traps: [
        {
          title: "Comparing amines of different mass",
          body: "Primary > secondary > tertiary is the order for isomers. If the molar masses differ, say so and compare carefully; a much heavier tertiary amine can boil higher.",
        },
        {
          title: "Saying tertiary amines have \"weak\" hydrogen bonds",
          body: "Tertiary amines have no hydrogen on nitrogen, so they have no hydrogen bonds between their molecules at all. Write \"no N-H, so no intermolecular hydrogen bonding\".",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcam-vs-alcohol",
      name: "Amines compared with alcohols; solubility",
      intuition:
        "An amine and an alcohol of the same chain both hydrogen bond. The difference is the atom: oxygen pulls on electrons harder than nitrogen, so the O-H bond is more polar and its hydrogen bonds are stronger. Stronger hydrogen bonds mean a higher boiling point and better mixing with water.",
      definition:
        "- Electronegativity: **nitrogen 3.0, oxygen 3.5**. So alcohols are more polar than amines and form **stronger** intermolecular hydrogen bonds.\n" +
        "- **Boiling point:** an alcohol boils higher than the amine of similar mass (butan-1-ol 390.3 K, butan-1-amine 350.8 K), even though the amine has two N-H hydrogens and the alcohol one O-H: the strength of the bonds decides.\n" +
        "- **Solubility:** lower aliphatic amines dissolve in water because they form hydrogen bonds with water molecules. Amines are less soluble than alcohols of the same chain.\n" +
        "- Solubility **falls as the molar mass rises**, because the hydrophobic alkyl part grows. Higher amines are essentially insoluble in water.\n" +
        "- Amines dissolve in organic solvents such as alcohol, ether and benzene.",
      table: {
        columns: ["Property", "Amine", "Alcohol", "Reason"],
        rows: [
          { cells: ["Electronegativity of N or O", "3.0", "3.5", "Oxygen pulls the shared electrons harder"] },
          { cells: ["Boiling point (four carbons)", "Butan-1-amine, 350.8 K", "Butan-1-ol, 390.3 K", "O-H hydrogen bonds are stronger than N-H hydrogen bonds"] },
          { cells: ["Solubility in water (same chain)", "Less soluble", "More soluble", "Stronger hydrogen bonds with water"] },
          { cells: ["Solubility as the chain grows", "Falls; higher amines insoluble", "Falls", "The hydrophobic alkyl part gets bigger"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is more soluble in water, ethanamine or hexan-1-amine? Give the reason.",
        steps: [
          "Both have one -NH₂ group that hydrogen bonds with water.",
          "Hexan-1-amine has a much larger hydrophobic alkyl part.",
          "A larger hydrophobic part lowers solubility.",
        ],
        answer: "Ethanamine: its alkyl part is small, so hydrogen bonding with water dominates",
      },
      practiceSet: [
        { prompt: "Name two organic solvents in which amines dissolve.", answer: "Any two of alcohol, ether and benzene" },
        { prompt: "Arrange ethanol, ethanamine and N-methylmethanamine in increasing order of boiling point.", answer: "N-Methylmethanamine < ethanamine < ethanol" },
        { prompt: "Why are higher amines insoluble in water?", answer: "Their large hydrophobic alkyl part outweighs the hydrogen bonding of the -NH₂ group" },
      ],
      pyqExampleId: "bb1cdc4c-9825-48c0-b894-20708585da39",
      traps: [
        {
          title: "Deciding by the number of hydrogen bonds",
          body: "Butan-1-amine has two N-H hydrogens and butan-1-ol only one O-H, yet the alcohol boils higher. The strength of each hydrogen bond (O is more electronegative) decides, not the count.",
        },
      ],
    },
  ],
};
