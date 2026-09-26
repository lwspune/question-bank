import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkenes";

export const ALKENE_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature, Hybridization and Stability of Alkenes",
  title: "Alkenes: IUPAC Names, Isomers, Hybridisation and Stability",
  oneLineDefinition:
    "An alkene is named from the longest chain that contains its C=C, numbered to give the double bond the lowest locant; its stability grows with the number of alkyl groups on the double-bonded carbons.",
  whyItMatters:
    "14 PYQs, none HARD. Six are IUPAC names of a drawn alkene, four are isomers, sp³ counts and the alkadiene, and four put substituted alkenes in stability order. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetalk-iupac-naming",
      name: "Naming a Substituted Alkene",
      intuition:
        "Find the longest chain that passes through BOTH carbons of the double bond — it may not be the longest chain overall. Number it from the end that gives the C=C the lower locant, then list the substituents alphabetically with their numbers.",
      definition:
        "- **Parent chain**: the longest chain containing the C=C; suffix **-ene** with the locant of its first carbon.\n" +
        "- **Numbering**: lowest locant to the **double bond first**, then to the substituents.\n" +
        "- **Order**: substituents alphabetical — **bromo** before **methyl**, chloro before methyl.\n" +
        "- A name ending in 'but-3-ene' or 'pent-3-ene' is a numbering error — the double bond should have got the lower number.",
      formula: {
        label: "Name pattern",
        latex: "\\text{(locant-substituent)}_{\\text{alpha}}\\ +\\ \\text{parent}\\text{-}n\\text{-ene},\\quad n\\ \\text{as low as possible}",
      },
      authoredExample: {
        prompt: "Name CH₃–CH=CH–C(CH₃)(Br)–CH₃.",
        steps: [
          "Longest chain through the C=C: five carbons — pent-ene.",
          "From the left end the double bond starts at C2; from the right it starts at C3. Take C2: pent-2-ene.",
          "C4 carries a methyl and a bromine: 4-bromo-4-methyl, bromo first alphabetically.",
        ],
        answer: "4-Bromo-4-methylpent-2-ene",
      },
      selfCheckExample: {
        prompt: "Why is '2-Bromo-2-methylpent-3-ene' wrong for the same compound?",
        steps: ["It numbers from the end that gives the double bond locant 3 instead of 2."],
        answer: "The double bond must get the lower locant (2)",
      },
      practiceSet: [
        { prompt: "Parent of CH₃CH₂C(CH₃)=C(Br)CH₂CH₃?", answer: "Hex-3-ene (3-bromo-4-methylhex-3-ene)" },
        { prompt: "Which comes first in a name: bromo or methyl?", answer: "Bromo (alphabetical)" },
      ],
      pyqExampleId: "b780d647-7ae3-4202-b6cf-17c64d2e064f",
      traps: [
        {
          title: "Taking the longest chain that skips the double bond",
          body: "Options like '4-bromo-4-ethyl-3-methylbut-3-ene' come from a short chain through the C=C with an ethyl branch left over. The parent must contain the C=C AND be as long as possible — hex-3-ene here.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetalk-isomers-hybridisation",
      name: "Isomers, Hybridisation and Alkadienes",
      intuition:
        "Draw the carbon skeletons first, then place the double bond in every distinct position — that counts the structural isomers. Each double-bonded carbon is sp², every other carbon is sp³. Cis–trans isomers need two DIFFERENT groups on each end of the C=C.",
      definition:
        "- **C₅H₁₀ alkenes: 5 structural isomers** — pent-1-ene, pent-2-ene, 2-methylbut-1-ene, 3-methylbut-1-ene, 2-methylbut-2-ene.\n" +
        "- **Hybridisation**: C=C carbons **sp²**; the rest **sp³**. 2-Methylbut-2-ene has **3** sp³ carbons.\n" +
        "- **Cis–trans**: impossible if either C=C carbon carries two identical groups — **but-1-ene** (=CH₂) cannot; but-2-ene can.\n" +
        "- **Alkadiene**: two C=C — **isoprene** (2-methylbuta-1,3-diene).",
      authoredExample: {
        prompt: "How many sp³ carbons in one molecule of 2-methylbut-2-ene?",
        steps: [
          "(CH₃)₂C=CH–CH₃: five carbons.",
          "C2 and C3 form the double bond — sp².",
          "The two methyls on C2 and the CH₃ at C4 are sp³.",
        ],
        answer: "3",
      },
      selfCheckExample: {
        prompt: "Which does NOT show cis–trans isomerism: but-1-ene, but-2-ene, 3,4-dimethylhex-3-ene, pent-2-ene?",
        steps: ["But-1-ene ends in =CH₂, two identical H on one carbon."],
        answer: "But-1-ene",
      },
      practiceSet: [
        { prompt: "Number of structural isomers of C₅H₁₀ that are alkenes?", answer: "5" },
        { prompt: "Which is an alkadiene: isoprene, β-phellandrene, but-2-ene, pent-1-ene?", answer: "Isoprene" },
      ],
      pyqExampleId: "066fc1cf-e973-48d5-9d9a-0033215f3bcd",
    },
    {
      kind: "formula" as const,
      slug: "cetalk-stability",
      name: "Stability of Substituted Alkenes",
      intuition:
        "Every alkyl group attached to a double-bonded carbon donates electron density into the π bond (hyperconjugation), so more alkyl groups mean a more stable alkene. Count the R groups on the two sp² carbons and rank.",
      definition:
        "- **More alkyl groups on the C=C → more stable**: R₂C=CR₂ > R₂C=CHR > R₂C=CH₂ ≈ RCH=CHR > RCH=CH₂ > CH₂=CH₂.\n" +
        "- Reason: **hyperconjugation** (and the +I effect) of the alkyl groups.\n" +
        "- This is also why elimination gives the more substituted alkene (Saytzeff).",
      formula: {
        label: "Stability order",
        latex: "\\mathrm{R_2C{=}CR_2 > R_2C{=}CHR > R_2C{=}CH_2 > RCH{=}CH_2 > CH_2{=}CH_2}",
      },
      authoredExample: {
        prompt: "Order by stability: (I) (CH₃)₂C=C(CH₃)₂, (II) (CH₃)₂C=CH₂, (III) (CH₃)₂C=CHCH₃.",
        steps: [
          "Count methyls on the double-bonded carbons: I has 4, III has 3, II has 2.",
          "More alkyl groups, more stable.",
        ],
        answer: "I > III > II",
      },
      selfCheckExample: {
        prompt: "Most stable: R₂C=CR₂, R₂C=CHR, R₂C=CH₂, RCH=CH₂?",
        steps: ["Tetrasubstituted beats all the others."],
        answer: "R₂C=CR₂",
      },
      practiceSet: [
        { prompt: "Which effect explains why more alkyl groups stabilise an alkene?", answer: "Hyperconjugation" },
      ],
      pyqExampleId: "0e1b2d6e-2bcb-4758-a6ff-93041dbcdac3",
    },
  ],
  related: [
    { label: "Preparation — elimination and Saytzeff's rule", href: `${BASE}/cetalk-preparation` },
  ],
};
