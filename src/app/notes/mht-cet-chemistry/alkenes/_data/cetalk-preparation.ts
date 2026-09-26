import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkenes";

export const ALKENE_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Alkenes by Elimination",
  title: "Preparing Alkenes: Dehydrohalogenation and Saytzeff's Rule",
  oneLineDefinition:
    "Heating an alkyl halide with alcoholic KOH removes H and X from neighbouring carbons to give an alkene, and when more than one alkene can form the more substituted one is the major product.",
  whyItMatters:
    "3 PYQs, none HARD, and two of them are the same question set in both 14 May 2024 shifts: the major product from 3-bromo-2-methylpentane. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetalk-dehydrohalogenation",
      name: "Dehydrohalogenation with Alcoholic KOH",
      intuition:
        "Alcoholic KOH is a strong base in a solvent that does not favour substitution, so it pulls an H off a carbon next to the C–X carbon and the halide leaves: a double bond forms. If H can come from two different neighbours, the product with more alkyl groups on the double bond wins (Saytzeff). AQUEOUS KOH would substitute instead, giving an alcohol.",
      definition:
        "- **Alcoholic KOH, heat**: elimination (E2) — **alkene**. **Aqueous KOH**: substitution — alcohol.\n" +
        "- **Saytzeff (Zaitsev) rule**: the **more substituted** alkene is the major product.\n" +
        "- 2-Bromopropane → **propene**; 3-bromo-2-methylpentane → **2-methylpent-2-ene** (trisubstituted) over 4-methylpent-2-ene.",
      formula: {
        label: "Dehydrohalogenation",
        latex: "\\mathrm{R{-}CH_2{-}CHX{-}R' \\xrightarrow{\\text{alc. KOH},\\ \\Delta} R{-}CH{=}CH{-}R' + KX + H_2O}",
      },
      authoredExample: {
        prompt: "Major product of 3-bromo-2-methylpentane with alcoholic KOH on heating?",
        steps: [
          "CH₃–CH(CH₃)–CHBr–CH₂–CH₃. H can leave from C2 or C4.",
          "Losing H from C2 gives (CH₃)₂C=CH–CH₂CH₃ — three alkyl groups on the C=C.",
          "Losing H from C4 gives (CH₃)₂CH–CH=CH–CH₃ — two. Saytzeff picks the first.",
        ],
        answer: "2-Methylpent-2-ene",
      },
      selfCheckExample: {
        prompt: "2-Bromopropane is heated with alcoholic KOH. Product?",
        steps: ["Removing HBr from a three-carbon halide gives a three-carbon alkene."],
        answer: "Propene, CH₃–CH=CH₂",
      },
      practiceSet: [
        { prompt: "Which rule predicts the major alkene from elimination?", answer: "Saytzeff (Zaitsev) — the more substituted alkene" },
      ],
      pyqExampleId: "e9e9a669-b9fd-4285-8e2a-ebb8433c8f2d",
      traps: [
        {
          title: "Picking the alcohol",
          body: "2-Methylpentan-3-ol is offered for alcoholic KOH. That is the AQUEOUS-KOH (substitution) product; alcoholic KOH eliminates.",
        },
      ],
    },
  ],
  related: [
    { label: "Stability of alkenes — why the more substituted product wins", href: `${BASE}/cetalk-structure` },
    { label: "Reactions of alkenes", href: `${BASE}/cetalk-reactions` },
  ],
};
