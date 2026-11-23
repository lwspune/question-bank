import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AM_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Classification and Nomenclature of Amines",
  title: "Classifying and Naming Amines",
  oneLineDefinition:
    "What amines are, how they are classified as primary, secondary and tertiary, simple or mixed, aliphatic or aromatic, and how they get their common and IUPAC names.",
  whyItMatters:
    "10 questions. Four were set in board papers: what amines are (2019), the IUPAC name and structure of methylphenylamine (2023), the structural formula of N,N-dimethylethanamine (2025), and which of four amines is secondary (2025). The textbook adds what kind of amine isobutylamine is, the hybridisation of nitrogen, and IUPAC names for chain amines, a diamine and ring compounds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccam-classification",
      name: "What amines are and how they are classified",
      intuition:
        "Start from ammonia, NH₃. Swap one of its hydrogen atoms for an alkyl or aryl group and you have a primary amine; swap two and it is secondary; swap all three and it is tertiary. So to classify an amine, look only at the nitrogen and count the groups on it. The carbon chain can be as branched as it likes: that does not change the class.",
      definition:
        "- **Amines** are nitrogen containing organic compounds having basic character. They are derivatives of ammonia in which one, two or three hydrogen atoms are replaced by alkyl or aryl groups. They occur in proteins, vitamins, hormones and plant products such as nicotine.\n" +
        "- **By the number of groups on nitrogen:** primary (1°) has one group and the amino group \\(\\text{-NH}_2\\); secondary (2°) has two groups and the imino group \\(\\text{>NH}\\); tertiary (3°) has three groups and a tertiary nitrogen.\n" +
        "- **Simple and mixed:** a secondary or tertiary amine is simple (symmetrical) when all the groups on nitrogen are the same, and mixed (unsymmetrical) when they differ.\n" +
        "- **Aliphatic and aromatic:** by the nature of the groups on nitrogen. In an aromatic amine (arylamine) the nitrogen is bonded directly to a benzene ring; aniline, \\(\\text{C}_6\\text{H}_5\\text{NH}_2\\), is the parent.\n" +
        "- Alkyl halides and alcohols are classified by the carbon that carries the functional group; amines are not. So isopropylamine is a 1° amine, while isopropyl alcohol is a 2° alcohol.\n" +
        "- The nitrogen keeps a lone pair in every amine. With three bonds and one lone pair it is \\(sp^3\\) hybridised, as in ammonia.",
      table: {
        columns: ["Type", "Functional group", "Example"],
        rows: [
          { cells: ["Primary (1°)", "Amino, \\(\\text{-NH}_2\\)", "Ethylamine, \\(\\text{C}_2\\text{H}_5\\text{NH}_2\\)"] },
          {
            cells: ["Secondary (2°)", "Imino, \\(\\text{>NH}\\)", "Dimethylamine, \\((\\text{CH}_3)_2\\text{NH}\\)"],
            pyqExampleId: "528dd165-45f9-40af-829d-7d169581cf6c",
            noteAmber: "Board 2025 asked you to pick the secondary amine from four: count the groups on nitrogen, not the carbon atoms.",
          },
          { cells: ["Tertiary (3°)", "Tertiary nitrogen, no H on N", "Trimethylamine, \\((\\text{CH}_3)_3\\text{N}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify N-methylaniline, \\(\\text{C}_6\\text{H}_5\\text{NHCH}_3\\), in three ways: by the number of groups on nitrogen, as simple or mixed, and as aliphatic or aromatic.",
        steps: [
          "Groups on nitrogen: one phenyl and one methyl, with one H left. Two groups, so it is secondary (2°).",
          "The two groups differ, so it is a mixed (unsymmetrical) amine.",
          "The nitrogen is bonded directly to a benzene ring, so it is an aromatic amine.",
        ],
        answer: "Secondary, mixed and aromatic",
      },
      practiceSet: [
        { prompt: "Classify \\((\\text{C}_2\\text{H}_5)_3\\text{N}\\) as 1°, 2° or 3°, and as simple or mixed.", answer: "Tertiary and simple" },
        { prompt: "Is \\(\\text{C}_2\\text{H}_5\\text{NHCH}_3\\) a simple or a mixed amine?", answer: "Mixed: the two groups on nitrogen, ethyl and methyl, are different" },
        { prompt: "Name the functional group of a secondary amine.", answer: "The imino group, \\(\\text{>NH}\\)" },
        { prompt: "tert-Butylamine, \\((\\text{CH}_3)_3\\text{C-NH}_2\\), has its nitrogen on a tertiary carbon. What class of amine is it?", answer: "Primary: only one group is attached to nitrogen" },
      ],
      pyqExampleId: "a6d86344-4f96-4e22-bb31-5f592190310d",
      traps: [
        {
          title: "Classifying by the carbon atom",
          body: "An amine's class comes from the number of groups on NITROGEN. Isopropylamine and tert-butylamine are both primary, though the carbon carrying \\(\\text{-NH}_2\\) is secondary or tertiary.",
        },
        {
          title: "A definition with no ammonia in it",
          body: "When the board asks what amines are, say they are derivatives of ammonia in which one, two or three H atoms are replaced by alkyl or aryl groups, and that they are basic. 'Compounds containing nitrogen' alone does not earn the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccam-naming",
      name: "Common and IUPAC names",
      intuition:
        "Common names just list the groups on nitrogen and add 'amine': ethylmethylamine. IUPAC names treat the amine as an alkane whose ending 'e' becomes 'amine': ethanamine. For a secondary or tertiary amine, the biggest group on nitrogen gives the parent name, and the smaller groups are written in front with the letter N to show they sit on nitrogen.",
      definition:
        "- **Common names:** the alkyl group name followed by 'amine' (alkyl amine). In a mixed amine the groups are written in alphabetical order, and 'di' or 'tri' is added for two or three identical groups. The name is written as ONE word.\n" +
        "- **IUPAC, primary amines:** replace the ending 'e' of the parent alkane by 'amine' (alkanamine), with a locant for the position of the amino group: propan-2-amine.\n" +
        "- **Two or more amino groups:** use 'di', 'tri' with locants, and KEEP the ending 'e' of the alkane: ethane-1,2-diamine, hexane-1,6-diamine.\n" +
        "- **IUPAC, secondary and tertiary amines:** named as N-substituted primary amines. The largest alkyl group on nitrogen is the parent alkane; the other groups are N-substituents.\n" +
        "- **Arylamines:** the ending 'e' of the arene is replaced by 'amine' (benzenamine). The common name aniline is also accepted by IUPAC, and other aromatic amines are named as derivatives of aniline: 4-methylaniline.",
      table: {
        columns: ["Common name", "Formula", "IUPAC name"],
        rows: [
          { cells: ["Methylamine", "\\(\\text{CH}_3\\text{NH}_2\\)", "Methanamine"] },
          { cells: ["Isopropylamine", "\\((\\text{CH}_3)_2\\text{CHNH}_2\\)", "Propan-2-amine"] },
          { cells: ["Ethylenediamine", "\\(\\text{H}_2\\text{NCH}_2\\text{CH}_2\\text{NH}_2\\)", "Ethane-1,2-diamine"] },
          { cells: ["Allylamine", "\\(\\text{CH}_2\\text{=CHCH}_2\\text{NH}_2\\)", "Prop-2-en-1-amine"] },
          { cells: ["p-Toluidine", "\\(\\text{CH}_3\\text{C}_6\\text{H}_4\\text{NH}_2\\) (para)", "4-Methylaniline"] },
          { cells: ["Dimethylamine", "\\((\\text{CH}_3)_2\\text{NH}\\)", "N-Methylmethanamine"] },
          { cells: ["Ethylmethylamine", "\\(\\text{C}_2\\text{H}_5\\text{NHCH}_3\\)", "N-Methylethanamine"] },
          {
            cells: ["Methylphenylamine", "\\(\\text{C}_6\\text{H}_5\\text{NHCH}_3\\)", "N-Methylaniline (N-methylbenzenamine)"],
            pyqExampleId: "18fb3df7-182b-420b-9643-b3874f0424ec",
            noteAmber: "Board 2023 asked for both the IUPAC name and the structure of methylphenylamine: give both.",
          },
          { cells: ["Trimethylamine", "\\((\\text{CH}_3)_3\\text{N}\\)", "N,N-Dimethylmethanamine"] },
          { cells: ["N,N-Dimethylaniline", "\\(\\text{C}_6\\text{H}_5\\text{N(CH}_3)_2\\)", "N,N-Dimethylbenzenamine"] },
        ],
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{N(CH}_3)\\text{CH}_2\\text{CH}_3\\).",
        steps: [
          "Groups on nitrogen: ethyl, ethyl and methyl. Three groups, so it is a tertiary amine.",
          "The largest group is ethyl, so the parent is ethanamine.",
          "The other two groups, one ethyl and one methyl, are N-substituents, written in alphabetical order.",
        ],
        answer: "N-Ethyl-N-methylethanamine",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{NH}_2\\).", answer: "Butan-1-amine" },
        { prompt: "Write the IUPAC name of \\((\\text{C}_2\\text{H}_5)_2\\text{NH}\\).", answer: "N-Ethylethanamine" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{NHCH}_2\\text{CH}_2\\text{CH}_3\\).", answer: "N-Methylpropan-1-amine" },
        { prompt: "Write the structure of N-methylpropan-2-amine.", answer: "\\((\\text{CH}_3)_2\\text{CH-NH-CH}_3\\)" },
      ],
      pyqExampleId: "1adba037-6d86-425f-98ce-8721f3b95846",
      traps: [
        {
          title: "Taking the smaller group as the parent",
          body: "In \\(\\text{C}_3\\text{H}_7\\text{NHCH}_3\\) the parent is the propyl chain (N-methylpropan-1-amine), not the methyl. The largest group on nitrogen always names the parent.",
        },
        {
          title: "Leaving out the N locant",
          body: "Writing 'methylethanamine' for \\(\\text{C}_2\\text{H}_5\\text{NHCH}_3\\) puts the methyl on the carbon chain. Write N-methylethanamine; for two groups on nitrogen write N,N.",
        },
        {
          title: "Dropping the 'e' in a diamine",
          body: "With two amino groups the alkane keeps its ending 'e': hexane-1,6-diamine, not hexan-1,6-diamine.",
        },
      ],
    },
  ],
};
