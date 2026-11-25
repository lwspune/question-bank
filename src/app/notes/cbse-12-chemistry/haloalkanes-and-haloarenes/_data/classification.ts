import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification",
  title: "Classification of Haloalkanes and Haloarenes",
  oneLineDefinition:
    "Mono, di and polyhalogen compounds; alkyl, allylic and benzylic halides (halogen on an sp³ carbon) against vinylic and aryl halides (halogen on an sp² carbon); and primary, secondary and tertiary halides.",
  whyItMatters:
    "9 questions, six of them from board papers. The board asks you to pick the vinylic halide (2023), the alkyl halide (2023), the benzylic halide (2024) or the allylic halide (2024, 2026) from four structures, and the compound with an sp² carbon bonded to the halogen (2024). The textbook adds naming and classifying twelve halides, the isomers of C₄H₉Br and the dihalogen derivatives of propane.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcha-classes",
      name: "Alkyl, allylic, benzylic, vinylic and aryl halides",
      intuition:
        "Look only at the carbon that holds the halogen. Ask two things: is that carbon joined by single bonds only (sp³) or is it part of a double bond or a benzene ring (sp²)? And what is it next to? The answer puts the compound in one of five classes, and the class tells you how the compound will react later in the chapter.",
      definition:
        "- **By number of halogen atoms:** mono, di or polyhalogen (tri-, tetra-, etc.) compounds.\n" +
        "- **Halogen on an sp³ carbon:**\n" +
        "- **Alkyl halides (haloalkanes), R-X:** the halogen is bonded to an alkyl group; they form the series CₙH₂ₙ₊₁X.\n" +
        "- **Allylic halides:** the halogen is bonded to an sp³ carbon next to a C=C double bond (an allylic carbon).\n" +
        "- **Benzylic halides:** the halogen is bonded to an sp³ carbon attached to an aromatic ring.\n" +
        "- **Halogen on an sp² carbon:**\n" +
        "- **Vinylic halides:** the halogen is bonded to an sp² carbon of a C=C double bond.\n" +
        "- **Aryl halides (haloarenes):** the halogen is bonded directly to an sp² carbon of an aromatic ring.\n" +
        "- **Primary, secondary, tertiary (1°, 2°, 3°):** decided by the carbon that carries the halogen: joined to one, two or three other carbons.",
      table: {
        columns: ["Class", "Where the halogen sits", "Carbon holding X", "Example"],
        rows: [
          {
            cells: ["Alkyl halide", "On a carbon with single bonds only, not next to a C=C or a ring", "sp³", "CH₃CH₂Br, bromoethane"],
            pyqExampleId: "f98d16be-4eb9-4497-bb28-8c6113fc4cdf",
            noteAmber: "Board 2023 asked which of four chlorides is an alkyl halide: the one whose C=C is two carbons away from the chlorine.",
          },
          {
            cells: ["Allylic halide", "On the carbon next to a C=C double bond", "sp³", "CH₂=CHCH₂Br, allyl bromide (3-bromopropene)"],
            pyqExampleId: "bd6be90a-21fc-42a2-9cd0-8031f181af44",
            noteAmber: "Board 2024 asked which of two bromides is allylic.",
          },
          {
            cells: ["Benzylic halide", "On the carbon attached to a benzene ring", "sp³", "C₆H₅CH₂Cl, benzyl chloride"],
          },
          {
            cells: ["Vinylic halide", "On a carbon of the C=C double bond itself", "sp²", "CH₂=CHCl, vinyl chloride (chloroethene)"],
            pyqExampleId: "c555e5e3-e935-4774-beb8-288200696712",
            noteAmber: "Board 2024 asked which compound has an sp² carbon bonded to X: the vinylic one.",
          },
          {
            cells: ["Aryl halide", "Directly on a carbon of the benzene ring", "sp²", "C₆H₅Br, bromobenzene"],
          },
        ],
      },
      selfCheckExample: {
        prompt: "The compound p-ClC₆H₄CH₂Br has two halogens. Classify each one.",
        steps: [
          "The chlorine is bonded directly to a ring carbon, which is sp²: an aryl halide.",
          "The bromine is on the CH₂ carbon attached to the ring, which is sp³: a benzylic halide.",
          "That CH₂ carbon is joined to only one other carbon (the ring carbon), so the benzylic bromide is primary.",
        ],
        answer: "Cl: aryl halide. Br: primary benzylic halide.",
      },
      practiceSet: [
        { prompt: "Classify (CH₃)₃CCl as a primary, secondary or tertiary halide.", answer: "Tertiary: the carbon holding Cl is joined to three other carbons" },
        { prompt: "In which two classes is the halogen bonded to an sp² carbon?", answer: "Vinylic halides and aryl halides" },
        { prompt: "Name the class of CH₂=CHCH₂CH₂Br.", answer: "Alkyl halide (primary): the C=C is two carbons away from the bromine" },
      ],
      pyqExampleId: "e7b26495-1fec-4cce-b705-cce8c3ce2867",
      traps: [
        {
          title: "Allylic or vinylic",
          body: "Both have a C=C nearby. Vinylic means the halogen is ON a doubly bonded carbon (sp²); allylic means it is on the NEXT carbon (sp³). Find the carbon carrying X before you look at the double bond.",
        },
        {
          title: "Benzylic or aryl",
          body: "In an aryl halide the halogen is on the ring itself. In a benzylic halide it is on the sp³ carbon joined to the ring. A halogen two carbons away from the ring, as in C₆H₅CH₂CH₂Br, is neither: it is an ordinary alkyl halide.",
        },
        {
          title: "Judging 1°, 2°, 3° by the whole molecule",
          body: "Count the carbons joined to the carbon that holds X, nothing else. Neopentyl bromide, (CH₃)₃CCH₂Br, looks crowded but is a primary halide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcha-isomers",
      name: "Counting the isomers of a haloalkane",
      intuition:
        "Draw every carbon skeleton first, the straight chain and each branched chain. Then put the halogen on each carbon that is different from the others. Two positions that look the same from either end of the chain give the same compound, so count them once.",
      definition:
        "- Step 1: write all the carbon skeletons for the formula (straight and branched).\n" +
        "- Step 2: on each skeleton, place the halogen on every carbon that is in a different environment.\n" +
        "- Step 3: remove repeats (a chain numbered from the other end is the same compound).\n" +
        "- Step 4: label each isomer 1°, 2° or 3° by the carbon holding the halogen.\n" +
        "- **Dihalides:** a **gem-dihalide** has both halogens on the same carbon (common name: alkylidene halide); a **vic-dihalide** has them on adjacent carbons (common name: alkylene dihalide). In IUPAC both are dihaloalkanes.",
      formula: {
        label: "Primary, secondary and tertiary halides",
        latex: "1^\\circ:\\ \\text{R-CH}_2\\text{-X} \\qquad 2^\\circ:\\ \\text{R}_2\\text{CH-X} \\qquad 3^\\circ:\\ \\text{R}_3\\text{C-X}",
        symbols: [
          { symbol: "\\(\\text{R}\\)", meaning: "an alkyl group" },
          { symbol: "\\(\\text{X}\\)", meaning: "a halogen atom" },
        ],
      },
      authoredExample: {
        prompt: "Write the dichloro derivatives of ethane, C₂H₄Cl₂, with their IUPAC and common names, and say which is gem and which is vic.",
        steps: [
          "Ethane has two carbons, so the two chlorines are either on the same carbon or one on each carbon.",
          "Both on one carbon: \\(\\text{CH}_3\\text{CHCl}_2\\), 1,1-dichloroethane, common name ethylidene chloride. This is the gem-dihalide.",
          "One on each carbon: \\(\\text{ClCH}_2\\text{CH}_2\\text{Cl}\\), 1,2-dichloroethane, common name ethylene dichloride. This is the vic-dihalide.",
        ],
        answer: "Two isomers: 1,1-dichloroethane (gem) and 1,2-dichloroethane (vic)",
      },
      selfCheckExample: {
        prompt: "Write the isomers of C₃H₇Br and classify each as primary or secondary.",
        steps: [
          "Three carbons give only a straight chain.",
          "Br on an end carbon: \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br}\\), 1-bromopropane, primary.",
          "Br on the middle carbon: \\(\\text{CH}_3\\text{CH(Br)CH}_3\\), 2-bromopropane, secondary.",
        ],
        answer: "Two isomers: 1-bromopropane (1°) and 2-bromopropane (2°)",
      },
      practiceSet: [
        { prompt: "C₅H₁₁Br has eight structural isomers. How many of them are primary, secondary and tertiary?", answer: "Four primary, three secondary and one tertiary (2-bromo-2-methylbutane)" },
        { prompt: "Name the gem-dibromide of propane that has both bromines on the middle carbon.", answer: "2,2-Dibromopropane, CH₃CBr₂CH₃" },
        { prompt: "Is 1,2-dibromoethane a gem or a vic dihalide?", answer: "Vic: the two bromines are on adjacent carbons" },
      ],
      pyqExampleId: "18209f38-b618-47c9-bb70-c1f548a070aa",
      traps: [
        {
          title: "Counting one isomer twice",
          body: "CH₃CH₂CH₂CH₂Br written from the right is BrCH₂CH₂CH₂CH₃, the same 1-bromobutane. Number each chain from the end nearer the halogen before you count.",
        },
        {
          title: "Missing the branched skeletons",
          body: "Most lost marks come from writing only the straight chain. For four carbons there is also the branched (CH₃)₂CH- skeleton, which gives one primary and one tertiary isomer.",
        },
      ],
    },
  ],
};
