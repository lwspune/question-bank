import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AK_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature and Structure of Carbonyl Group",
  title: "Naming Aldehydes and Ketones and the Carbonyl Group",
  oneLineDefinition:
    "The carbonyl group C=O is planar and polar; aldehydes and ketones have common names from their acids or attached groups, and IUPAC names ending in -al, -one or -carbaldehyde.",
  whyItMatters:
    "5 questions, one of them from a board paper: 2024 asked the IUPAC name of a compound carrying both an aldehyde and a ketone group. The textbook adds writing IUPAC and common names, and drawing structures from them. A naming part also sits inside longer board questions on other pages, such as the IUPAC name of CH₃CH=CHCHO (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcak-carbonyl",
      name: "The carbonyl group and common names",
      intuition:
        "The carbon of a C=O group uses three sp² orbitals, so the carbon and the three atoms on it lie flat, about 120° apart. Oxygen pulls the shared electrons towards itself, so the carbon is slightly positive and the oxygen slightly negative. Common names came before the IUPAC rules and are still used in questions, so learn to turn them into structures.",
      definition:
        "- The carbonyl carbon is **sp² hybridised**: three sigma bonds in one plane at about **120°**, and a **pi bond** with oxygen above and below that plane.\n" +
        "- The C=O bond is **polarised** because oxygen is more electronegative: the carbon is an **electrophilic (Lewis acid)** centre and the oxygen a **nucleophilic (Lewis base)** centre.\n" +
        "- Carbonyl compounds have large dipole moments and are **more polar than ethers**.\n" +
        "- **Common names of aldehydes** come from the common name of the acid with -ic acid replaced by **aldehyde** (formic acid, formaldehyde). Positions are marked with Greek letters: the **α-carbon** is the one joined directly to the -CHO group, then β, γ.\n" +
        "- **Common names of ketones** name the two groups on the C=O and add **ketone** (ethyl methyl ketone). Alkyl phenyl ketones add the acyl name to **phenone** (acetophenone, propiophenone).",
      table: {
        columns: ["Structure", "Common name", "IUPAC name"],
        rows: [
          { cells: ["\\(\\text{HCHO}\\)", "Formaldehyde", "Methanal"] },
          { cells: ["\\(\\text{CH}_3\\text{CHO}\\)", "Acetaldehyde", "Ethanal"] },
          { cells: ["\\((\\text{CH}_3)_2\\text{CHCHO}\\)", "Isobutyraldehyde", "2-Methylpropanal"] },
          { cells: ["\\(\\text{CH}_2\\text{=CHCHO}\\)", "Acrolein", "Prop-2-enal"] },
          { cells: ["\\(\\text{CH}_3\\text{COCH}_3\\)", "Acetone (dimethyl ketone)", "Propanone"] },
          { cells: ["\\(\\text{CH}_3\\text{COCH}_2\\text{CH}_2\\text{CH}_3\\)", "Methyl n-propyl ketone", "Pentan-2-one"] },
          { cells: ["\\((\\text{CH}_3)_2\\text{CHCOCH(CH}_3)_2\\)", "Diisopropyl ketone", "2,4-Dimethylpentan-3-one"] },
          { cells: ["\\(\\text{C}_6\\text{H}_5\\text{COCH}_3\\)", "Acetophenone (methyl phenyl ketone)", "1-Phenylethan-1-one"] },
        ],
      },
      selfCheckExample: {
        prompt: "Write the structure and the IUPAC name of α-methylbutyraldehyde.",
        steps: [
          "Butyraldehyde is the four-carbon aldehyde, \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CHO}\\).",
          "The α-carbon is the one joined to the -CHO group, so the methyl group goes there.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH(CH}_3)\\text{CHO}\\): the -CHO carbon is C-1 and the methyl is on C-2.",
        ],
        answer: "CH₃CH₂CH(CH₃)CHO, 2-methylbutanal",
      },
      practiceSet: [
        { prompt: "Give the common name of CH₃COCH₂CH₃.", answer: "Ethyl methyl ketone (IUPAC: butanone)" },
        { prompt: "Name C₆H₅COCH₂CH₃ by the phenone rule.", answer: "Propiophenone (1-phenylpropan-1-one)" },
        { prompt: "What is the shape around a carbonyl carbon, and the bond angle?", answer: "Trigonal planar, about 120°" },
      ],
      pyqExampleId: "a5614e6f-b59e-43a3-8434-70d15f83def4",
      traps: [
        {
          title: "Counting the α-carbon from the wrong atom",
          body: "In a common name, the α-carbon is the carbon joined to the -CHO group, not the -CHO carbon itself. In an IUPAC name the same carbon is C-2, because the -CHO carbon is C-1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcak-iupac",
      name: "IUPAC names: -al, -one, -carbaldehyde and oxo",
      intuition:
        "Find the longest chain that holds the carbonyl carbon, name it as the alkane, and change the last -e to -al for an aldehyde or -one for a ketone. Then number so that the carbonyl group gets the smallest number. When an aldehyde and a ketone are in the same molecule, the aldehyde wins the ending.",
      definition:
        "- Replace the **-e** of the alkane name by **-al** (aldehyde) or **-one** (ketone).\n" +
        "- **Aldehydes:** number the chain from the -CHO carbon, which is always C-1 (no locant is written: butanal).\n" +
        "- **Ketones:** number from the end **nearer the C=O** and give its position (pentan-2-one).\n" +
        "- Substituents are written as prefixes in **alphabetical order** with their positions.\n" +
        "- **Cyclic ketones:** the carbonyl carbon is C-1 (2-methylcyclohexanone).\n" +
        "- **-CHO on a ring:** add **carbaldehyde** to the ring name; the ring carbon carrying -CHO is C-1. Benzenecarbaldehyde is accepted as **benzaldehyde**, and other aromatic aldehydes are named as substituted benzaldehydes.\n" +
        "- When -CHO and a ketone C=O are both present, -CHO is the **principal group** (the ending -al) and the ketone oxygen is written as the prefix **oxo**.",
      formula: {
        label: "Naming rule for aldehydes and ketones",
        latex: "\\text{alkan}\\textbf{e} \\rightarrow \\text{alkan}\\textbf{al}\\ (\\text{-CHO}) \\quad \\text{or} \\quad \\text{alkan}\\textbf{one}\\ (\\text{>C=O})",
      },
      authoredExample: {
        prompt: "Give the IUPAC name of (CH₃)₂CHCH₂COCH₃.",
        steps: [
          "Write it out: \\(\\text{CH}_3\\text{-CH(CH}_3)\\text{-CH}_2\\text{-CO-CH}_3\\). The longest chain holding the C=O has five carbons: pentan-?-one.",
          "Number from the end nearer the C=O: the carbonyl carbon is C-2 (from the other end it would be C-4).",
          "The methyl branch is then on C-4.",
          "Name: 4-methylpentan-2-one.",
        ],
        answer: "4-Methylpentan-2-one",
      },
      selfCheckExample: {
        prompt: "Name the compound in which a cyclohexane ring carries a -CHO group, with a methyl group on the third ring carbon counted from the carbon bearing -CHO.",
        steps: [
          "-CHO on a ring: use the ending carbaldehyde, and the ring carbon carrying -CHO is C-1.",
          "The methyl is then on C-3.",
          "Name: 3-methylcyclohexanecarbaldehyde.",
        ],
        answer: "3-Methylcyclohexanecarbaldehyde",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name of CH₂=CH-CHO.", answer: "Prop-2-enal" },
        { prompt: "Give the IUPAC name of (CH₃)₂CHCHO.", answer: "2-Methylpropanal" },
        { prompt: "Why is CH₃COCH₂CH₂CH₃ named pentan-2-one and not pentan-4-one?", answer: "A ketone chain is numbered from the end nearer the C=O, which gives it the lower number, 2" },
      ],
      pyqExampleId: "c185975d-f709-4714-a78e-eaaafc8717f3",
      traps: [
        {
          title: "Giving the ketone the ending in a keto-aldehyde",
          body: "When a molecule has both -CHO and a ketone group, the aldehyde is the principal group: the name ends in -al and the ketone oxygen is the prefix oxo. A name ending in -one there loses the mark.",
        },
        {
          title: "Writing a locant for the aldehyde",
          body: "The -CHO carbon is always C-1, so the name is butanal, not butan-1-al. Count the -CHO carbon in the chain, except when -CHO hangs on a ring (then the name ends in carbaldehyde and the ring alone is counted).",
        },
      ],
    },
  ],
};
