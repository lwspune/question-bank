import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_OC_NAMING_NOTE: SubtopicNote = {
  subtopicName: "Naming and Isomerism",
  title: "Naming and Isomerism",
  oneLineDefinition:
    "How to count the sigma and pi bonds in a molecule and sort its carbons into primary, secondary and tertiary, how to name a compound that carries a functional group, how to number a benzene ring, and the kinds of structural isomers, metamers among them.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026. Two are about the bonds and carbons of a molecule: the σ bonds, π bonds and lone pairs of pyridine (2023) and the C₆H₁₄ with two tertiary carbons (NEET 2024). Three are names: the structure of 2,6-dimethyldec-4-ene (2021), a hexanol carrying bromo, chloro and methyl groups (2022) and a benzene ring with three groups (Re-NEET 2024). Two ask about metamers: which formula shows metamerism (2021) and which pair of ethers are metamers (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchoc-structure",
      name: "Bonds, hybridisation and kinds of carbon",
      intuition:
        "Every bond between two atoms has exactly one sigma (σ) bond. A double bond adds one pi (π) bond on top of it, and a triple bond adds two. So to count bonds, draw every bond, C-H bonds included, and add them up. The kind of bond also tells you how the carbon is hybridised: four single bonds mean sp³, one double bond means sp², a triple bond means sp.",
      definition:
        "- **Single bond**: one σ bond. **Double bond**: one σ and one π. **Triple bond**: one σ and two π.\n" +
        "- **sp³ carbon** (four single bonds): tetrahedral. **sp² carbon** (one double bond): trigonal planar. **sp carbon** (a triple bond): linear.\n" +
        "- The more s-character a hybrid orbital has (sp³ 25%, sp² 33%, sp 50%), the closer its electrons stay to the nucleus. So an sp carbon is the most electronegative, and its bonds are the shortest.\n" +
        "- Lone pairs are counted apart from bonds: N in an amine or pyridine carries one, O in an alcohol or ether carries two.\n" +
        "- A carbon bonded to one other carbon is **primary (1°)**, to two is **secondary (2°)**, to three is **tertiary (3°)** and to four is **quaternary (4°)**.",
      formula: {
        label: "Counting bonds",
        latex: "\\text{single} = 1\\sigma \\qquad \\text{double} = 1\\sigma + 1\\pi \\qquad \\text{triple} = 1\\sigma + 2\\pi",
      },
      authoredExample: {
        prompt:
          "Count the σ bonds, π bonds and lone pairs in acrylonitrile, \\(\\text{CH}_2{=}\\text{CH-C}{\\equiv}\\text{N}\\), and give the hybridisation of each carbon.",
        steps: [
          "Bonds: three C-H, one C=C, one C-C and one C≡N.",
          "σ bonds: each of the 6 bonds has one, so 6.",
          "π bonds: one in C=C and two in C≡N, so 3.",
          "Lone pairs: the nitrogen of C≡N keeps one.",
          "The two carbons of C=C are sp². The carbon of C≡N is sp.",
        ],
        answer: "6 σ, 3 π, 1 lone pair; sp², sp², sp",
      },
      selfCheckExample: {
        prompt: "Count the σ and π bonds in propyne, \\(\\text{CH}_3\\text{-C}{\\equiv}\\text{CH}\\), and give the hybridisation of each carbon from left to right.",
        steps: [
          "Bonds: four C-H, one C-C and one C≡C.",
          "σ bonds: 4 + 1 + 1 = 6. π bonds: the triple bond has 2.",
          "The \\(\\text{CH}_3\\) carbon has four single bonds (sp³); both carbons of the triple bond are sp.",
        ],
        answer: "6 σ and 2 π; sp³, sp, sp",
      },
      practiceSet: [
        { prompt: "How many σ bonds and how many π bonds are there in ethene, \\(\\text{CH}_2{=}\\text{CH}_2\\)?", answer: "5 σ and 1 π" },
        { prompt: "What is the hybridisation of the carbon atom in a C=O group?", answer: "sp²" },
        { prompt: "How many tertiary carbon atoms does 2-methylbutane, \\(\\text{CH}_3\\text{CH(CH}_3\\text{)CH}_2\\text{CH}_3\\), have?", answer: "One (C2)" },
        { prompt: "Which forms the shortest C-H bond: an sp³, an sp² or an sp carbon?", answer: "The sp carbon (50% s-character)" },
      ],
      pyqExampleId: "b348e8f2-27f7-429a-a012-8b9e1951b690",
      traps: [
        {
          title: "Count the C-H bonds too",
          body: "Every C-H bond is a σ bond. In a ring like benzene the ring bonds give 6 σ bonds and the six C-H bonds give 6 more, so benzene has 12 σ bonds, not 6.",
        },
        {
          title: "Four carbon neighbours is quaternary, not tertiary",
          body: "In 2,2-dimethylbutane, \\(\\text{CH}_3\\text{C(CH}_3\\text{)}_2\\text{CH}_2\\text{CH}_3\\), C2 is bonded to four carbons, so it is quaternary. The molecule has no tertiary carbon at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchoc-naming",
      name: "Naming a compound with a functional group",
      intuition:
        "A name has a root, a suffix and prefixes. Pick the most senior functional group: it becomes the suffix, and the parent chain must contain it. Number the chain so that this group gets the lowest number. Every other group becomes a prefix, written in alphabetical order with its number.",
      definition:
        "- **Seniority** (highest first): \\(\\text{-COOH}\\), \\(\\text{-SO}_3\\text{H}\\), \\(\\text{-COOR}\\), \\(\\text{-COCl}\\), \\(\\text{-CONH}_2\\), \\(\\text{-CN}\\), \\(\\text{-CHO}\\), \\(\\text{>C=O}\\), \\(\\text{-OH}\\), \\(\\text{-NH}_2\\), C=C, C≡C.\n" +
        "- **Suffixes**: alcohol -ol, aldehyde -al, ketone -one, carboxylic acid -oic acid, amine -amine, alkene -ene, alkyne -yne. A group that is not the senior one becomes a prefix: -OH becomes hydroxy.\n" +
        "- **Always prefixes**: halogens (fluoro, chloro, bromo, iodo), \\(\\text{-NO}_2\\) (nitro) and \\(\\text{-OR}\\) (alkoxy, such as methoxy).\n" +
        "- **Numbering**: the senior group gets the lowest number; then a double or triple bond; then the prefixes.\n" +
        "- **Order**: prefixes in alphabetical order, whatever their numbers. Each number stands just before the part it belongs to: hexan-3-ol, but-2-ene, prop-2-en-1-ol.",
      authoredExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CO-CH}_2\\text{-CH(CH}_3\\text{)-CH}_3\\).",
        steps: [
          "The senior (and only) functional group is the ketone C=O, so the suffix is -one.",
          "The longest chain through it has 5 carbons: pentan-...-one.",
          "From the left the C=O carbon is C2; from the right it is C4. Number from the left.",
          "The methyl branch then sits on C4.",
        ],
        answer: "4-Methylpentan-2-one",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{CH}_2{=}\\text{CH-CH}_2\\text{-OH}\\).",
        steps: [
          "-OH is senior to C=C, so the suffix is -ol and the OH carbon is C1.",
          "Counting from that end, the double bond starts at C2.",
          "Three carbons with a double bond: prop-2-en, then -1-ol.",
        ],
        answer: "Prop-2-en-1-ol",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{CHO}\\).", answer: "Propanal" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CH(OH)-CH}_2\\text{-CH}_3\\).", answer: "Butan-2-ol" },
        { prompt: "A compound carries both a -COOH group and an -OH group. Which one gives the suffix?", answer: "-COOH (the -OH is written as the prefix hydroxy)" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CH=CH-CH}_2\\text{-CH}_3\\).", answer: "Pent-2-ene" },
      ],
      pyqExampleId: "5c7839ab-940f-4806-a106-e305531e7f0d",
      traps: [
        {
          title: "The senior group gets the lowest number, not the prefixes",
          body: "Number the chain to give the suffix group the lowest number first. Only then look at the prefixes, even if another numbering would give the prefixes a lower set.",
        },
        {
          title: "Prefixes go in alphabetical order, not in order of number",
          body: "Bromo, chloro and methyl are written in that order: 1-bromo-5-chloro-4-methylhexan-3-ol, never 1-bromo-4-methyl-5-chlorohexan-3-ol.",
        },
        {
          title: "Halogens and nitro never take a suffix",
          body: "A chloro or nitro group is always a prefix, so a chain carrying Cl and OH is named as an alcohol (-ol), never as a chloride.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchoc-benzene",
      name: "Naming benzene derivatives",
      intuition:
        "A benzene ring has no ends, so you choose where C1 is. With two groups you can use positions 1,2 (ortho), 1,3 (meta) or 1,4 (para). With three or more, use numbers only: go round the ring the way that gives the lowest set of numbers, and let the alphabet decide only when two ways tie.",
      definition:
        "- One group: its prefix and benzene (chlorobenzene, nitrobenzene). Some have accepted base names: phenol (-OH), aniline (\\(\\text{-NH}_2\\)), toluene (\\(\\text{-CH}_3\\)).\n" +
        "- Two groups: 1,2 is **ortho (o)**, 1,3 is **meta (m)**, 1,4 is **para (p)**.\n" +
        "- Three or more groups: number the ring to give the **lowest set of locants**; o, m and p are not used.\n" +
        "- If two numberings give the same set, the group that comes first in the alphabet gets the lower number.\n" +
        "- When the base name comes from a group (phenol, aniline), that group's carbon is C1, and the numbering runs the way that gives the next group the lower number. Groups are written in alphabetical order.",
      authoredExample: {
        prompt:
          "A phenol carries a methyl group on the carbon next to the -OH carbon and a chlorine atom on the carbon opposite the -OH carbon. Name it.",
        steps: [
          "The base is phenol, so the -OH carbon is C1.",
          "Going towards the methyl group: methyl on C2, chlorine on C4. The set is 2, 4.",
          "Going the other way: methyl on C6, chlorine on C4. The set 4, 6 is higher.",
          "Write chloro before methyl.",
        ],
        answer: "4-Chloro-2-methylphenol",
      },
      selfCheckExample: {
        prompt: "A benzene ring carries two chlorine atoms on neighbouring carbons. Give its IUPAC name and its ortho, meta or para name.",
        steps: [
          "Neighbouring carbons are positions 1 and 2.",
          "Positions 1 and 2 are called ortho.",
        ],
        answer: "1,2-Dichlorobenzene (o-dichlorobenzene)",
      },
      practiceSet: [
        { prompt: "A benzene ring carries two bromine atoms on opposite carbons. Give its IUPAC name.", answer: "1,4-Dibromobenzene (p-dibromobenzene)" },
        { prompt: "Which positions on a benzene ring does the prefix m- stand for?", answer: "1 and 3" },
        { prompt: "Why are o, m and p not used for a benzene ring with three groups?", answer: "They describe only two positions; three groups need numbers" },
        { prompt: "A benzene ring carries Cl and \\(\\text{NO}_2\\) on carbons 1 and 3. Which group gets number 1?", answer: "Cl, because chloro comes before nitro in the alphabet: 1-chloro-3-nitrobenzene" },
      ],
      pyqExampleId: "ea603a33-edab-4411-b853-833413afb8fc",
      traps: [
        {
          title: "The lowest set comes first, the alphabet second",
          body: "Compare the whole set of locants first. The alphabet decides which group is C1 only when two numberings give exactly the same set.",
        },
        {
          title: "In phenol and aniline the base group is C1",
          body: "The carbon carrying -OH in a phenol, or \\(\\text{-NH}_2\\) in an aniline, is always C1, even if starting elsewhere would give a lower set.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchoc-isomerism",
      name: "Structural isomerism and metamerism",
      intuition:
        "Isomers have the same molecular formula but are different compounds. In structural isomers the atoms are joined in a different order. Ask what changed: the carbon skeleton, the place of a group, the functional group itself, or only the alkyl groups on the two sides of the same functional group. Stereoisomers are joined in the same order and differ only in how the atoms sit in space.",
      definition:
        "- **Chain isomers**: different carbon skeletons.\n" +
        "- **Position isomers**: the same skeleton, with the group or multiple bond at a different position.\n" +
        "- **Functional group isomers**: different functional groups.\n" +
        "- **Metamers**: the same functional group with different alkyl groups on its two sides. An ether needs at least two different ways of splitting its carbons between the two sides of O.\n" +
        "- **Stereoisomers**: the same structure, different arrangement in space. They are geometrical (cis and trans) or optical isomers.",
      table: {
        columns: ["Kind", "What differs", "Example (same formula)"],
        rows: [
          { cells: ["Chain isomerism", "The carbon skeleton", "Pentane, 2-methylbutane and 2,2-dimethylpropane (\\(\\text{C}_5\\text{H}_{12}\\))"] },
          { cells: ["Position isomerism", "Where the group sits on the chain", "Propan-1-ol and propan-2-ol (\\(\\text{C}_3\\text{H}_8\\text{O}\\))"] },
          { cells: ["Functional group isomerism", "The functional group", "Propanal and propanone (\\(\\text{C}_3\\text{H}_6\\text{O}\\))"] },
          {
            cells: ["Metamerism", "The alkyl groups on the two sides of one functional group", "Methoxypropane and ethoxyethane (\\(\\text{C}_4\\text{H}_{10}\\text{O}\\))"],
            noteAmber: "NEET 2021 asked which formula shows metamerism; NEET 2026 asked which pair of compounds are metamers.",
          },
          { cells: ["Stereoisomerism", "Only the arrangement in space", "cis- and trans-but-2-ene (\\(\\text{C}_4\\text{H}_8\\))"] },
        ],
        caption: "Chain, position, functional group and metamerism are all structural isomerism.",
      },
      selfCheckExample: {
        prompt: "What kind of isomers are but-1-ene and but-2-ene?",
        steps: [
          "Both have the formula \\(\\text{C}_4\\text{H}_8\\) and the same straight chain of four carbons.",
          "Only the place of the double bond differs.",
        ],
        answer: "Position isomers",
      },
      practiceSet: [
        { prompt: "What kind of isomers are ethanol, \\(\\text{C}_2\\text{H}_5\\text{OH}\\), and methoxymethane, \\(\\text{CH}_3\\text{OCH}_3\\)?", answer: "Functional group isomers" },
        { prompt: "What kind of isomers are butane and 2-methylpropane?", answer: "Chain isomers" },
        { prompt: "What kind of isomers are 1-chloropropane and 2-chloropropane?", answer: "Position isomers" },
        { prompt: "What kind of isomers are propanoic acid, \\(\\text{CH}_3\\text{CH}_2\\text{COOH}\\), and methyl ethanoate, \\(\\text{CH}_3\\text{COOCH}_3\\)?", answer: "Functional group isomers" },
      ],
      pyqExampleId: "212bbdde-3420-4c2c-9fd5-1780c4c6046a",
      traps: [
        {
          title: "Metamers share one functional group",
          body: "Propanal and propanone have different functional groups (aldehyde and ketone), so they are functional group isomers, not metamers.",
        },
        {
          title: "One ether cannot be a metamer",
          body: "\\(\\text{C}_3\\text{H}_8\\text{O}\\) has only one ether, methoxyethane, because three carbons can be split round O only as one and two. So \\(\\text{C}_3\\text{H}_8\\text{O}\\) shows no metamerism.",
        },
      ],
    },
  ],
};
