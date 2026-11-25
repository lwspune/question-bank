import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature",
  title: "Nomenclature of Amines",
  oneLineDefinition:
    "Common names (alkylamine) and IUPAC names (alkanamine, with the locant N for groups on the nitrogen, and benzenamine for aniline), and the isomers of one amine formula.",
  whyItMatters:
    "4 questions, two of them from board papers: the IUPAC name of a tertiary amine with three different groups on nitrogen (2023, and an MCQ in 2025). The two NCERT rows ask you to name and classify seven amines and to write all eight isomers of C₄H₁₁N. A 2022 question on the preparation page also opens with an IUPAC name.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcam-naming",
      name: "Common and IUPAC names",
      intuition:
        "The IUPAC name treats a primary amine as its alkane with the last \"e\" changed to \"amine\". For a secondary or tertiary amine, pick the longest carbon chain joined to the nitrogen as the parent. Every other group sitting on the nitrogen is written in front with the locant N, so a reader knows it hangs on the nitrogen and not on the chain.",
      definition:
        "- **Common names:** the alkyl group is put in front of \"amine\" as one word (methylamine, ethylmethylamine). Identical groups take di or tri (trimethylamine).\n" +
        "- **IUPAC, primary amines:** alkanamines. Replace the \"e\" of the alkane by \"amine\": CH₃NH₂ is methanamine; a number shows where the -NH₂ sits (propan-2-amine).\n" +
        "- **More than one -NH₂:** number each carbon that carries one, add di or tri, and keep the \"e\": H₂N-CH₂-CH₂-NH₂ is ethane-1,2-diamine.\n" +
        "- **Secondary and tertiary amines:** the longest chain on nitrogen is the parent; other groups on nitrogen take the locant N. CH₃NHCH₂CH₃ is N-methylethanamine and (CH₃CH₂)₃N is N,N-diethylethanamine. Different N-groups are written in alphabetical order.\n" +
        "- **Arylamines:** C₆H₅NH₂ is aniline, also an accepted IUPAC name, or benzenamine. p-Bromoaniline is 4-bromobenzenamine (4-bromoaniline) and N,N-dimethylaniline is N,N-dimethylbenzenamine.",
      formula: {
        label: "IUPAC name of a secondary or tertiary amine",
        latex: "\\text{CH}_3\\text{-NH-CH}_2\\text{CH}_3 \\;\\longrightarrow\\; \\underbrace{\\text{N-methyl}}_{\\text{group on N}}\\underbrace{\\text{ethanamine}}_{\\text{parent chain}}",
      },
      authoredExample: {
        prompt: "Write the IUPAC name of (CH₃)₂CH-N(CH₃)₂.",
        steps: [
          "The groups on nitrogen are one isopropyl and two methyl groups, so it is a tertiary amine.",
          "The longest chain on nitrogen is the three-carbon isopropyl group, joined at its middle carbon: the parent is propan-2-amine.",
          "The two methyl groups on nitrogen each take the locant N: N,N-dimethyl.",
        ],
        answer: "N,N-Dimethylpropan-2-amine",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of C₆H₅-NH-CH₂CH₃ and classify it.",
        steps: [
          "The ring makes it an arylamine, so the parent is aniline (benzenamine).",
          "The ethyl group is on the nitrogen, so it takes the locant N.",
          "Two carbon groups on nitrogen make it secondary.",
        ],
        answer: "N-Ethylaniline (N-ethylbenzenamine), a secondary amine",
      },
      practiceSet: [
        { prompt: "Give the IUPAC name of H₂N-CH₂-CH₂-CH₂-NH₂.", answer: "Propane-1,3-diamine" },
        { prompt: "Give the IUPAC name of allylamine, CH₂=CH-CH₂-NH₂.", answer: "Prop-2-en-1-amine" },
        { prompt: "Give the IUPAC name of trimethylamine, (CH₃)₃N.", answer: "N,N-Dimethylmethanamine" },
      ],
      pyqExampleId: "579bde76-a9d0-46dd-859f-a2ed615cc02d",
      traps: [
        {
          title: "Running the chain through the nitrogen",
          body: "Nitrogen breaks the carbon chain. CH₃CH₂-NH-CH₂CH₂CH₃ is N-ethylpropan-1-amine, not a pentanamine: the longest chain on one side of the nitrogen is the parent.",
        },
        {
          title: "Using a number for a group on nitrogen",
          body: "A group on the nitrogen takes the locant N, never 1 or 2. Two groups on nitrogen take N twice: N,N-diethyl, not N-diethyl.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-isomers",
      name: "Isomeric amines of one formula",
      intuition:
        "A formula such as C₃H₉N can be built several ways: put all the carbons in one group on the nitrogen (primary), split them between two groups (secondary) or three (tertiary). Write them in that order and you will not miss one.",
      definition:
        "- A saturated, open-chain amine has the formula \\(\\text{C}_n\\text{H}_{2n+3}\\text{N}\\).\n" +
        "- List the **primary** amines first: every chain shape, with the -NH₂ on every different carbon.\n" +
        "- Then the **secondary** amines: share the carbons between two groups on nitrogen in every way.\n" +
        "- Then the **tertiary** amines: share them between three groups.\n" +
        "- **Chain isomers** differ in the carbon skeleton, **position isomers** in where the -NH₂ sits, **metamers** carry different groups round the nitrogen in the same class, and a primary, a secondary and a tertiary amine of one formula are **functional isomers**.",
      formula: {
        label: "General formula of a saturated open-chain amine",
        latex: "\\text{C}_n\\text{H}_{2n+3}\\text{N}",
      },
      authoredExample: {
        prompt: "Write the isomeric amines of C₃H₉N with their IUPAC names and classes.",
        steps: [
          "Primary, three carbons in one group: CH₃CH₂CH₂NH₂, propan-1-amine, and (CH₃)₂CHNH₂, propan-2-amine.",
          "Secondary, carbons split two and one: CH₃NHCH₂CH₃, N-methylethanamine.",
          "Tertiary, three groups of one carbon: (CH₃)₃N, N,N-dimethylmethanamine.",
        ],
        answer: "Four isomers: two primary, one secondary and one tertiary",
      },
      selfCheckExample: {
        prompt: "Write the two isomeric amines of C₂H₇N and say what kind of isomers they are.",
        steps: [
          "Both carbons in one group: CH₃CH₂NH₂, ethanamine, a primary amine.",
          "One carbon in each of two groups: CH₃NHCH₃, N-methylmethanamine, a secondary amine.",
          "A primary and a secondary amine of one formula are functional isomers.",
        ],
        answer: "Ethanamine and N-methylmethanamine, functional isomers",
      },
      practiceSet: [
        { prompt: "Which type of isomers are propan-1-amine and propan-2-amine?", answer: "Position isomers" },
        { prompt: "Which type of isomers are N-ethylethanamine and N-methylpropan-1-amine?", answer: "Metamers: same class, different groups round the nitrogen" },
        { prompt: "Write the IUPAC names of the tertiary amines of formula C₅H₁₃N.", answer: "Three: N,N-dimethylpropan-1-amine, N,N-dimethylpropan-2-amine and N-ethyl-N-methylethanamine" },
      ],
      pyqExampleId: "8037e35e-6155-4cb5-9abf-5192d07d50a9",
      traps: [
        {
          title: "Missing the branched primary amines",
          body: "Students often write only the straight-chain primary amines. Try every chain shape, straight and branched, and put the -NH₂ on every different carbon of each, before you move on to secondary amines.",
        },
      ],
    },
  ],
};
