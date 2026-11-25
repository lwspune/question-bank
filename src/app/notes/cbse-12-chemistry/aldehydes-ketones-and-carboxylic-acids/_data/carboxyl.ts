import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_CARBOXYL_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature and Structure of Carboxyl Group",
  title: "Naming Carboxylic Acids and the Carboxyl Group",
  oneLineDefinition:
    "Carboxylic acids are named by replacing the -e of the alkane with -oic acid, counting the carboxyl carbon as C-1; the carboxyl carbon is less electrophilic than a carbonyl carbon because of resonance with the -OH oxygen.",
  whyItMatters:
    "2 questions. The board asked in 2022 why carboxylic acids do not give the nucleophilic addition reactions of aldehydes and ketones; the same reason came back in 2023 and 2025 inside longer questions on other pages. The textbook asks the IUPAC names of four acids.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcak-acid-names",
      name: "Common and IUPAC names of carboxylic acids",
      intuition:
        "Many acids were found in nature long before the naming rules, so their common names tell you where they came from: formic acid from ants, acetic acid from vinegar, butyric acid from rancid butter. For the IUPAC name, find the chain that includes the -COOH carbon, call that carbon 1, and end the name in -oic acid.",
      definition:
        "- A carboxylic acid has the **-COOH** group: a carbonyl group joined to a hydroxyl group.\n" +
        "- **IUPAC:** replace the **-e** of the alkane by **-oic acid**. The **carboxylic carbon is C-1**.\n" +
        "- For more than one -COOH, number the chain left after the carboxyl groups and add **dicarboxylic acid**, **tricarboxylic acid** and so on, with the positions.\n" +
        "- A -COOH on a ring: name the ring and add **carboxylic acid** (cyclohexanecarboxylic acid); the ring carbon carrying it is C-1.\n" +
        "- Higher acids (C12 to C18), the **fatty acids**, occur in fats as esters of glycerol.",
      table: {
        columns: ["Structure", "Common name", "IUPAC name"],
        rows: [
          { cells: ["\\(\\text{HCOOH}\\)", "Formic acid", "Methanoic acid"] },
          { cells: ["\\(\\text{CH}_3\\text{COOH}\\)", "Acetic acid", "Ethanoic acid"] },
          { cells: ["\\(\\text{CH}_3\\text{CH}_2\\text{COOH}\\)", "Propionic acid", "Propanoic acid"] },
          { cells: ["\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{COOH}\\)", "Butyric acid", "Butanoic acid"] },
          { cells: ["\\((\\text{CH}_3)_2\\text{CHCOOH}\\)", "Isobutyric acid", "2-Methylpropanoic acid"] },
          { cells: ["\\(\\text{HOOC-COOH}\\)", "Oxalic acid", "Ethanedioic acid"] },
          { cells: ["\\(\\text{HOOC-(CH}_2)_4\\text{-COOH}\\)", "Adipic acid", "Hexanedioic acid"] },
          { cells: ["\\(\\text{C}_6\\text{H}_5\\text{COOH}\\)", "Benzoic acid", "Benzenecarboxylic acid (benzoic acid)"] },
          { cells: ["\\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{COOH}\\)", "Phenylacetic acid", "2-Phenylethanoic acid"] },
          { cells: ["\\(\\text{C}_6\\text{H}_4(\\text{COOH})_2\\) (1,2)", "Phthalic acid", "Benzene-1,2-dicarboxylic acid"] },
        ],
      },
      selfCheckExample: {
        prompt: "Give the IUPAC name of HOOC-CH₂-COOH (malonic acid).",
        steps: [
          "Both ends are -COOH, so this is a dicarboxylic acid.",
          "The chain, counting both carboxyl carbons, has three carbons: propane.",
          "Name: propanedioic acid.",
        ],
        answer: "Propanedioic acid",
      },
      practiceSet: [
        { prompt: "Which carbon is numbered 1 in the IUPAC name of a carboxylic acid?", answer: "The carboxylic carbon (the -COOH carbon)" },
        { prompt: "Give the IUPAC name of (CH₃)₂CHCH₂COOH.", answer: "3-Methylbutanoic acid" },
        { prompt: "From which natural source was formic acid first obtained?", answer: "Red ants (Latin formica, ant)" },
      ],
      pyqExampleId: "c065f67e-c54d-410d-8fd0-6a7975f6aca2",
      traps: [
        {
          title: "Numbering from the wrong end",
          body: "In an acid the carboxyl carbon is always C-1, so substituent numbers are counted from it. Counting from the other end gives a wrong locant even when the chain length is right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcak-carboxyl-structure",
      name: "Structure of the carboxyl group",
      intuition:
        "The -OH oxygen in -COOH sits right beside the C=O and has lone pairs. It pushes one of them towards the carbon, so the carbon is much less positive than in an aldehyde or ketone. A nucleophile finds little to attack, and the typical C=O additions do not happen.",
      definition:
        "- The bonds to the carboxyl carbon lie in **one plane**, about **120°** apart (sp² carbon).\n" +
        "- The -OH oxygen donates a lone pair into the C=O by **resonance**, so the **carboxylic carbon is less electrophilic** than the carbonyl carbon of aldehydes and ketones.\n" +
        "- That is why carboxylic acids do **not** give the characteristic reactions of the carbonyl group (HCN, NaHSO₃, ammonia derivatives).\n" +
        "- In the **carboxylate ion** the negative charge is shared equally by **two equivalent oxygen atoms**.",
      formula: {
        label: "Resonance in the carboxyl group",
        latex: "\\text{R-C(=O)-OH} \\longleftrightarrow \\text{R-C(-O}^-\\text{)=}\\overset{+}{\\text{O}}\\text{H}",
      },
      authoredExample: {
        prompt: "State the hybridisation of the carboxyl carbon in ethanoic acid and the angle between the bonds around it.",
        steps: [
          "The carboxyl carbon forms three sigma bonds (to CH₃, to =O and to -OH) and one pi bond to oxygen.",
          "Three sigma bonds in one plane need sp² hybridisation.",
          "The three bonds are spread evenly in that plane.",
        ],
        answer: "sp², with bond angles of about 120° in one plane",
      },
      selfCheckExample: {
        prompt: "Write the two resonance structures of the ethanoate ion and say why its two C-O bonds are the same length.",
        steps: [
          "\\(\\text{CH}_3\\text{-C(=O)-O}^- \\longleftrightarrow \\text{CH}_3\\text{-C(-O}^-\\text{)=O}\\)",
          "The two structures are equivalent: each oxygen carries the charge in one of them.",
          "So each C-O bond is halfway between single and double.",
        ],
        answer: "Two equivalent structures share the charge between both oxygens, so both C-O bonds are identical",
      },
      practiceSet: [
        { prompt: "Which atom in -COOH donates the lone pair that reduces the positive charge on the carboxyl carbon?", answer: "The oxygen of the -OH group" },
        { prompt: "Which is more electrophilic, the carbonyl carbon of propanal or the carboxyl carbon of propanoic acid?", answer: "The carbonyl carbon of propanal" },
        { prompt: "Name the common reducing agent that does not reduce the -COOH group.", answer: "Sodium borohydride, NaBH₄" },
      ],
      pyqExampleId: "727ef5b2-7fef-426f-85a4-9ffc57959cb4",
      traps: [
        {
          title: "Treating -COOH as a ketone with an extra -OH",
          body: "The -OH is part of the group: its lone pair is shared with the C=O. So -COOH does not form a cyanohydrin, a bisulphite compound or an oxime the way an aldehyde does. Write the resonance reason, not just \"it is an acid\".",
        },
      ],
    },
  ],
};
