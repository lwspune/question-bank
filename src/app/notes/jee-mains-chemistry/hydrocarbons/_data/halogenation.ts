import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const HALOGENATION_HC_NOTE: SubtopicNote = {
  subtopicName: "Free-Radical Halogenation of Alkanes",
  title: "Free-Radical Halogenation of Alkanes",
  oneLineDefinition:
    "In light or heat, a halogen replaces the hydrogens of an alkane one at a time by a free-radical chain; each set of equivalent hydrogens gives one monohalo product, and bromine strongly prefers a tertiary hydrogen.",
  whyItMatters:
    "Eleven PYQs, five of them multiple choice, and three from 2026. Seven count the monohalo or dihalo products of an alkane, sometimes with stereoisomers included; four ask where the halogen goes, how many products excess halogen gives, or the percentage of halogen in the product. Six of the eleven ask for a number.",
  concepts: [
    // C1 — counting products
    {
      kind: "formula" as const,
      slug: "jchc-halo-count",
      name: "Counting monohalogenation products",
      intuition:
        "Replacing any one hydrogen of a set of equivalent hydrogens gives the same compound. So the number of monohalo products is the number of different kinds of hydrogen. To find them, look for the molecule's symmetry: every methyl on the same carbon is one kind, and the two ends of a symmetrical chain are one kind. If the question counts stereoisomers too, check each product for a stereocentre and count a chiral product twice.",
      definition:
        "- Structural products = number of **non-equivalent H** sets.\n" +
        "- n-Pentane has 3 sets, 2-methylbutane 4, 2,2-dimethylpropane 1.\n" +
        "- A product with a carbon carrying four different groups is chiral and exists as two enantiomers.\n" +
        "- Read the stem: \"excluding stereoisomers\" means structural only; \"all isomers\" or \"maximum number\" means enantiomers are counted.\n" +
        "- Further halogenation of a haloalkane is counted the same way, on the haloalkane's remaining hydrogens.",
      formula: {
        label: "Counting products",
        latex: "N_{\\text{structural}} = \\text{number of non-equivalent H sets},\\qquad N_{\\text{total}} = N_{\\text{achiral}} + 2\\,N_{\\text{chiral}}",
      },
      authoredExample: {
        prompt: "How many monochloro products does 2-methylpentane give in light, (a) structural only and (b) counting stereoisomers?",
        steps: [
          "\\(\\mathrm{CH_3{-}CH(CH_3){-}CH_2{-}CH_2{-}CH_3}\\): the two methyls on C-2 are one set; C-2, C-3, C-4 and C-5 are four more. Five sets, so five structural products.",
          "1-Chloro-2-methylpentane: C-2 has H, CH₃, CH₂Cl and propyl, so it is chiral.",
          "2-Chloro-2-methylpentane: C-2 has two CH₃ groups, achiral. 1-Chloro-4-methylpentane (Cl on C-5): no stereocentre.",
          "3-Chloro-2-methylpentane (C-3: H, Cl, isopropyl, ethyl) and 2-chloro-4-methylpentane (Cl on C-4: H, Cl, CH₃, isobutyl) are both chiral.",
          "Three chiral and two achiral: \\(2 + 2(3) = 8\\).",
        ],
        answer: "(a) 5; (b) 8.",
      },
      selfCheckExample: {
        prompt: "How many structural monochloro products does 2,2,4-trimethylpentane give?",
        steps: [
          "\\(\\mathrm{(CH_3)_3C{-}CH_2{-}CH(CH_3)_2}\\): the three methyls of the tert-butyl group are one set.",
          "The CH₂ is a second set, the CH a third, and the two methyls on C-4 a fourth.",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "How many monochloro products does n-butane give, counting stereoisomers?", answer: "3 (1-chlorobutane and the two enantiomers of 2-chlorobutane)" },
        { prompt: "How many monochloro products does cyclohexane give?", answer: "1 (all twelve H are equivalent)" },
        { prompt: "How many monochloro products does methylcyclohexane give, structural only?", answer: "5 (CH₃, C-1, C-2, C-3, C-4)" },
        { prompt: "How many dichloro products (structural) does propane give?", answer: "4 (1,1-, 1,2-, 1,3- and 2,2-)" },
      ],
      pyqExampleId: "0356affa-d00b-45c1-9230-456116134edf", // 2022 — monobromo derivatives of all C5H12 isomers
      traps: [
        {
          title: "Do not count equivalent methyls twice",
          body: "The two methyl groups on C-2 of 2-methylbutane are one set, not two. Chlorinating either gives 1-chloro-2-methylbutane.",
        },
        {
          title: "Read whether stereoisomers are counted",
          body: "2-Methylbutane gives 4 structural monochloro products. Two of them, 1-chloro-2-methylbutane and 2-chloro-3-methylbutane, are chiral, so the count with stereoisomers is 6. The wording of the stem decides which number is wanted.",
        },
        {
          title: "Cyclic isomers do not decolourise KMnO₄",
          body: "When a question says the isomers of CₙH₂ₙ do not decolourise KMnO₄, it means the cycloalkanes only. Draw every ring size and every position of the side chains.",
        },
      ],
    },

    // C2 — which H is replaced, and multiple substitution
    {
      kind: "reference" as const,
      slug: "jchc-radical-selectivity",
      name: "Radical selectivity and multiple halogenation",
      intuition:
        "The chain carrier is a halogen atom that pulls off a hydrogen. It pulls off the hydrogen that leaves the most stable radical, and radicals are stabilised by alkyl groups: 3° > 2° > 1° > methyl. A bromine atom is slow and choosy, so it takes a tertiary H almost every time. A chlorine atom is fast and less choosy, so it gives a mixture close to the ratio of hydrogens. With excess halogen the reaction keeps going until every H can be replaced.",
      definition:
        "- **Initiation**: \\(\\mathrm{Cl_2 \\xrightarrow{h\\nu} 2Cl^\\bullet}\\).\n" +
        "- **Propagation**: \\(\\mathrm{CH_4 + Cl^\\bullet \\rightarrow CH_3^\\bullet + HCl}\\); \\(\\mathrm{CH_3^\\bullet + Cl_2 \\rightarrow CH_3Cl + Cl^\\bullet}\\).\n" +
        "- **Termination**: two radicals combine, for example \\(\\mathrm{CH_3^\\bullet + CH_3^\\bullet \\rightarrow C_2H_6}\\).\n" +
        "- Reactivity of the halogen: \\(\\mathrm{F_2 > Cl_2 > Br_2 > I_2}\\). Reactivity of the hydrogen: 3° > 2° > 1°.\n" +
        "- Each substitution uses one \\(\\mathrm{X_2}\\) and releases one HX; the product carries ONE X per substitution.",
      table: {
        columns: ["Substrate and conditions", "What happens", "Product", "Reason"],
        rows: [
          { cells: ["2-Methylpropane, \\(\\mathrm{Br_2}\\), light", "Bromine takes the tertiary H", "2-Bromo-2-methylpropane (major)", "Br· is highly selective for the most stable radical"] },
          { cells: ["Propane, \\(\\mathrm{Cl_2}\\), light", "Chlorine attacks both kinds of H", "1-Chloropropane and 2-chloropropane in similar amounts", "Cl· is fast and less selective"] },
          { cells: ["Methane, excess \\(\\mathrm{Cl_2}\\), light", "Substitution continues", "\\(\\mathrm{CH_3Cl,\\ CH_2Cl_2,\\ CHCl_3,\\ CCl_4}\\)", "Each product still has H to replace"] },
          { cells: ["Ethane, excess \\(\\mathrm{Br_2}\\), light", "Every degree of substitution forms", "9 bromoethanes, from \\(\\mathrm{C_2H_5Br}\\) to \\(\\mathrm{C_2Br_6}\\)", "Counts per formula: 1, 2, 2, 2, 1, 1"] },
          { cells: ["Cyclopropane, \\(\\mathrm{Br_2}\\), light", "One Br replaces one H when the data show one Br per molecule", "Bromocyclopropane, \\(\\mathrm{C_3H_5Br}\\)", "One \\(\\mathrm{Br_2}\\) used, the second Br leaves as HBr"] },
        ],
        caption: "Use the product's C : X ratio to tell substitution (one X per \\(\\mathrm{X_2}\\) used) from addition (two X).",
      },
      selfCheckExample: {
        prompt: "What is the major monobromination product of 2-methylbutane in light?",
        steps: [
          "2-Methylbutane has one tertiary H, on C-2.",
          "Br· takes that H because it leaves the most stable, tertiary radical.",
        ],
        answer: "2-Bromo-2-methylbutane",
      },
      practiceSet: [
        { prompt: "Order the ease of H abstraction by a halogen atom: 1°, 2°, 3°.", answer: "3° > 2° > 1°" },
        { prompt: "Which halogen is more selective in radical substitution, Cl₂ or Br₂?", answer: "Br₂" },
        { prompt: "How many dibromoethanes are there?", answer: "2 (1,1- and 1,2-)" },
        { prompt: "What is the percentage of chlorine in chloromethane? (C 12, H 1, Cl 35.5)", answer: "About 70% (35.5/50.5)" },
      ],
      pyqExampleId: "1d2e89c7-dc3c-4af4-8bfb-505912da1ca6", // 2026 — cycloalkane monobromide, C:Br = 3:1, % Br
      traps: [
        {
          title: "Substitution puts one halogen in the product",
          body: "One mole of \\(\\mathrm{X_2}\\) per mole of alkane in substitution gives RX + HX, not RX₂. An addition product would carry both halogen atoms, so the product's C : X ratio tells the two apart.",
        },
        {
          title: "Chlorination does not pick only the tertiary H",
          body: "Because Cl· is fast, primary hydrogens, which are often more numerous, give a large share of the product. \"Tertiary product only\" is true for bromination, not chlorination.",
        },
      ],
    },
  ],
  related: [
    { label: "Alkanes: Preparation, Structure and Conformations — classing carbons 1°, 2°, 3°", href: `${BASE}/jch-hc-alkanes` },
    { label: "Halogen Addition, Oxidation and Ozonolysis of Alkenes — allylic substitution", href: `${BASE}/jch-hc-oxidation` },
  ],
};
