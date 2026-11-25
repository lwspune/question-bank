import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AP_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification",
  title: "Classification of Alcohols, Phenols and Ethers",
  oneLineDefinition:
    "How alcohols are sorted by the number of OH groups and by the carbon that carries the OH (primary, secondary, tertiary, allylic, benzylic, vinylic), and how ethers are sorted into symmetrical and unsymmetrical.",
  whyItMatters:
    "3 questions, all from the NCERT chapter: classify six alcohols as primary, secondary or tertiary, pick out the allylic ones, and draw and classify every alcohol of formula C₅H₁₂O. The board has not set a question on this page from 2023 to 2026, but every later page uses these words: the Lucas test, oxidation and dehydration all depend on whether an alcohol is primary, secondary or tertiary.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcap-alcohol-classes",
      name: "Primary, secondary, tertiary, allylic and benzylic alcohols",
      intuition:
        "Look at the carbon that carries the OH group (the carbinol carbon) and count the carbon atoms joined to it. One carbon makes the alcohol primary, two secondary, three tertiary. Then look one step further: if the carbinol carbon sits next to a C=C double bond the alcohol is allylic, and if it sits next to a benzene ring it is benzylic.",
      definition:
        "- **Mono-, di-, tri- and polyhydric:** alcohols and phenols with one, two, three or many OH groups. Ethane-1,2-diol is dihydric; propane-1,2,3-triol (glycerol) is trihydric.\n" +
        "- **Primary (1°), secondary (2°), tertiary (3°):** the OH group is on an sp³ carbon joined to one, two or three other carbon atoms: \\(\\text{R}-\\text{CH}_2-\\text{OH}\\), \\(\\text{R}_2\\text{CH}-\\text{OH}\\), \\(\\text{R}_3\\text{C}-\\text{OH}\\).\n" +
        "- **Allylic alcohol:** the OH group is on an sp³ carbon next to a carbon-carbon double bond, as in \\(\\text{CH}_2{=}\\text{CH}-\\text{CH}_2\\text{OH}\\).\n" +
        "- **Benzylic alcohol:** the OH group is on an sp³ carbon next to an aromatic ring, as in \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}\\). Allylic and benzylic alcohols can themselves be primary, secondary or tertiary.\n" +
        "- **Vinylic alcohol:** the OH group is on an sp² carbon of a C=C double bond, \\(\\text{CH}_2{=}\\text{CH}-\\text{OH}\\).\n" +
        "- **Phenols:** the OH group is on a carbon of a benzene ring (also an sp² carbon).\n" +
        "- **Ethers:** symmetrical (simple) when both groups on oxygen are the same, as in C₂H₅OC₂H₅; unsymmetrical (mixed) when they differ, as in C₂H₅OCH₃ and C₂H₅OC₆H₅.",
      table: {
        columns: ["Class", "Where the OH group sits", "Example"],
        rows: [
          { cells: ["Primary (1°)", "sp³ carbon joined to one carbon", "Propan-1-ol, CH₃CH₂CH₂OH"] },
          { cells: ["Secondary (2°)", "sp³ carbon joined to two carbons", "Propan-2-ol, CH₃CH(OH)CH₃"] },
          { cells: ["Tertiary (3°)", "sp³ carbon joined to three carbons", "2-Methylpropan-2-ol, (CH₃)₃COH"] },
          { cells: ["Allylic", "sp³ carbon next to a C=C double bond", "Prop-2-en-1-ol, CH₂=CHCH₂OH (primary allylic)"] },
          { cells: ["Benzylic", "sp³ carbon next to a benzene ring", "Phenylmethanol, C₆H₅CH₂OH (primary benzylic)"] },
          { cells: ["Vinylic", "sp² carbon of a C=C double bond", "CH₂=CH-OH"] },
          { cells: ["Phenol", "sp² carbon of a benzene ring", "C₆H₅OH"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify \\(\\text{C}_6\\text{H}_5-\\text{C}(\\text{CH}_3)_2-\\text{OH}\\) in two ways.",
        steps: [
          "The carbinol carbon is joined to two CH₃ groups and the ring: three carbons, so the alcohol is tertiary.",
          "That carbon is sp³ and sits next to a benzene ring, so the alcohol is benzylic.",
        ],
        answer: "A tertiary benzylic alcohol",
      },
      practiceSet: [
        { prompt: "Classify butan-2-ol as primary, secondary or tertiary.", answer: "Secondary: its carbinol carbon is joined to two carbons" },
        { prompt: "Is \\(\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{CH}_2-\\text{OH}\\) a benzylic alcohol?", answer: "No. Its carbinol carbon is joined to another CH₂, not to the ring; it is a primary alcohol only" },
        { prompt: "Is C₂H₅OCH₃ a symmetrical or an unsymmetrical ether?", answer: "Unsymmetrical (mixed): the two groups on oxygen differ" },
      ],
      pyqExampleId: "8210dfd6-7265-4caa-a021-1f54a3d24115",
      traps: [
        {
          title: "Counting hydrogens instead of carbons",
          body: "Classify by the number of carbon atoms joined to the carbinol carbon. A benzene ring counts as one carbon neighbour, so C₆H₅-CH(OH)-CH₂CH₃ (1-phenylpropan-1-ol) is secondary, not primary.",
        },
        {
          title: "Calling every alcohol with a ring benzylic",
          body: "Benzylic means the carbinol carbon itself is next to the ring. In 3-phenylpropan-1-ol, C₆H₅-CH₂-CH₂-CH₂OH, the ring is far from the OH carbon, so this alcohol is neither benzylic nor allylic.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcap-isomers",
      name: "Drawing and classifying isomeric alcohols",
      intuition:
        "To find every alcohol of a formula, first draw each possible carbon skeleton, then put the OH group on each different carbon of it. Two positions that are mirror images along the chain give the same compound, so count them once. Then classify each one by its carbinol carbon.",
      definition:
        "- Write every chain: straight, one branch, two branches.\n" +
        "- On each chain, place OH on each carbon that is different from the others; skip positions that repeat by symmetry.\n" +
        "- Name each one: the longest chain that holds the OH carbon is the parent, numbered from the end nearer the OH.\n" +
        "- Classify each: count the carbons joined to the carbinol carbon.",
      formula: {
        label: "Classes of alcohol by the carbinol carbon",
        latex: "1^{\\circ}: \\text{R}-\\text{CH}_2\\text{OH} \\qquad 2^{\\circ}: \\text{R}_2\\text{CH}-\\text{OH} \\qquad 3^{\\circ}: \\text{R}_3\\text{C}-\\text{OH}",
      },
      authoredExample: {
        prompt: "Write the structures and IUPAC names of all the alcohols of formula C₄H₁₀O and classify each.",
        steps: [
          "Straight chain C-C-C-C: OH on an end carbon gives \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{OH}\\), butan-1-ol (1°).",
          "OH on an inner carbon gives \\(\\text{CH}_3\\text{CH}(\\text{OH})\\text{CH}_2\\text{CH}_3\\), butan-2-ol (2°).",
          "Branched chain (CH₃)₂CH-CH₃: OH on a CH₃ end gives \\((\\text{CH}_3)_2\\text{CH}-\\text{CH}_2\\text{OH}\\), 2-methylpropan-1-ol (1°).",
          "OH on the central carbon gives \\((\\text{CH}_3)_3\\text{C}-\\text{OH}\\), 2-methylpropan-2-ol (3°).",
        ],
        answer: "Four alcohols: butan-1-ol (1°), butan-2-ol (2°), 2-methylpropan-1-ol (1°), 2-methylpropan-2-ol (3°)",
      },
      selfCheckExample: {
        prompt: "How many alcohols have the formula C₃H₈O? Name and classify them.",
        steps: ["Only one chain is possible, C-C-C.", "OH on an end carbon: propan-1-ol (1°). OH on the middle carbon: propan-2-ol (2°)."],
        answer: "Two: propan-1-ol (primary) and propan-2-ol (secondary)",
      },
      practiceSet: [
        { prompt: "Name and classify \\((\\text{CH}_3)_3\\text{C}-\\text{CH}_2\\text{CH}_2\\text{OH}\\).", answer: "3,3-Dimethylbutan-1-ol, a primary alcohol" },
        { prompt: "Classify cyclohexanol as primary, secondary or tertiary.", answer: "Secondary: its carbinol carbon is joined to two ring carbons" },
        { prompt: "Name and classify \\(\\text{CH}_3\\text{CH}_2\\text{C}(\\text{CH}_3)(\\text{OH})\\text{CH}_2\\text{CH}_3\\).", answer: "3-Methylpentan-3-ol, a tertiary alcohol" },
      ],
      pyqExampleId: "bb696b32-1e09-4fc2-bdab-aace3fd112a1",
      traps: [
        {
          title: "Counting one compound twice",
          body: "On a straight chain, OH on the first carbon and OH on the last carbon is the same compound. Number each structure from the end nearer the OH before you list it, and a repeat shows up at once.",
        },
      ],
    },
  ],
};
