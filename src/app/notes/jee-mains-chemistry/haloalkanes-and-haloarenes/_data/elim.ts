import type { SubtopicNote } from "@/app/notes/_types";

export const ELIM_HALO_NOTE: SubtopicNote = {
  subtopicName: "Elimination Versus Substitution",
  title: "Elimination Versus Substitution",
  oneLineDefinition:
    "Hydroxide or alkoxide can attack carbon (substitution) or remove a β-hydrogen (elimination); water favours substitution, alcoholic KOH with heat, a bulky base or a tertiary halide favours the alkene, and the major alkene is the more substituted one unless another is conjugated.",
  whyItMatters:
    "Fifteen PYQs, three numerical, one from 2026. Ten decide between substitution and elimination from the reagent, the solvent and the halide, often across a two- or three-step sequence; five ask which alkene forms, or how many.",
  concepts: [
    // C1 — substitution or elimination
    {
      kind: "formula" as const,
      slug: "jchalo-sub-vs-elim",
      name: "Substitution or elimination: reading the reagent, solvent and halide",
      intuition:
        "The same reagent can do two jobs. As a nucleophile, \\(\\mathrm{OH^-}\\) attacks the carbon that holds the halogen and gives an alcohol. As a base, it pulls off a hydrogen from the next carbon (the β-carbon) and the halide leaves, giving a C=C. Water surrounds hydroxide and keeps it acting as a nucleophile; ethanol and heat let it act as a base.",
      definition:
        "- **Aqueous KOH or NaOH**: substitution, giving the alcohol.\n" +
        "- **Alcoholic KOH, heat**: β-elimination (dehydrohalogenation) by E2, giving the alkene.\n" +
        "- A strong nucleophile that is a weak base (\\(\\mathrm{CN^-}\\), \\(\\mathrm{I^-}\\), \\(\\mathrm{RS^-}\\)) substitutes, by SN2 on a primary or secondary halide.\n" +
        "- A tertiary halide with a strong base (\\(\\mathrm{C_2H_5O^-}\\), \\(\\mathrm{(CH_3)_3CO^-}\\)) eliminates; the same halide in water with no base substitutes by SN1.\n" +
        "- A bulky base such as \\(\\mathrm{(CH_3)_3COK}\\) eliminates even where substitution is possible.\n" +
        "- No β-hydrogen, no elimination: \\(\\mathrm{(CH_3)_3C{-}CH_2Br}\\) cannot give an alkene by E2.\n" +
        "- Moving a halogen along a chain: alcoholic KOH gives the alkene, HBr adds by Markovnikov's rule, and aqueous KOH then gives the new alcohol.",
      formula: {
        label: "Dehydrohalogenation with alcoholic KOH",
        latex:
          "\\mathrm{R{-}CH_2{-}CH_2{-}X + KOH \\xrightarrow{\\text{ethanol},\\ \\Delta} R{-}CH{=}CH_2 + KX + H_2O}",
      },
      authoredExample: {
        prompt: "Give the major product in each case: (i) 1-bromobutane with NaCN in DMSO; (ii) bromocyclohexane with sodium ethoxide in ethanol, heated; (iii) 2-bromo-2-methylpropane in water at room temperature.",
        steps: [
          "(i) Primary halide, cyanide is a good nucleophile and a weak base, aprotic solvent: SN2. Product \\(\\mathrm{CH_3CH_2CH_2CH_2CN}\\), pentanenitrile.",
          "(ii) Secondary halide, strong base, ethanol and heat: E2. Only one alkene can form: cyclohexene.",
          "(iii) Tertiary halide in water with no added base: SN1. Product \\(\\mathrm{(CH_3)_3C{-}OH}\\), 2-methylpropan-2-ol.",
        ],
        answer: "(i) Pentanenitrile; (ii) cyclohexene; (iii) 2-methylpropan-2-ol.",
      },
      selfCheckExample: {
        prompt: "Give the reagents, in order, that convert 1-bromobutane into butan-2-ol.",
        steps: [
          "Alcoholic KOH with heat removes HBr: but-1-ene.",
          "HBr with no peroxide adds by Markovnikov's rule: 2-bromobutane.",
          "Aqueous KOH substitutes: butan-2-ol.",
        ],
        answer: "(1) Alcoholic KOH, heat; (2) HBr, no peroxide; (3) aqueous KOH.",
      },
      practiceSet: [
        { prompt: "What does 2-bromopropane give with aqueous NaOH?", answer: "Propan-2-ol" },
        { prompt: "What does 2-bromopropane give with alcoholic KOH and heat?", answer: "Propene" },
        { prompt: "What is the major product of tert-butyl bromide with potassium tert-butoxide?", answer: "2-Methylpropene" },
        { prompt: "Can 1-chloro-2,2-dimethylpropane undergo β-elimination?", answer: "No: its β-carbon carries no hydrogen" },
      ],
      pyqExampleId: "8dc38c31-1ba5-4792-8331-52c67fa705ff", // 2025 — aqueous against alcoholic KOH
      traps: [
        {
          title: "A bulky alkoxide gives the alkene, not the ether",
          body: "Potassium tert-butoxide is an alkoxide, but it is too crowded to attack carbon. With a tertiary or secondary halide it removes a β-hydrogen and gives the alkene.",
        },
        {
          title: "No β-hydrogen, no elimination",
          body: "A halide such as \\(\\mathrm{(CH_3)_3C{-}CH_2Br}\\) has no hydrogen on the carbon next to the C–Br carbon. Alcoholic KOH cannot give an alkene from it by E2.",
        },
      ],
    },

    // C2 — Zaitsev rule and counting alkenes
    {
      kind: "formula" as const,
      slug: "jchalo-saytzeff",
      name: "Zaitsev rule and counting the alkenes from dehydrohalogenation",
      intuition:
        "When hydrogens can be removed from more than one β-carbon, several alkenes can form. The major one is the most stable, which is usually the one with more alkyl groups on the double-bond carbons. A C=C that can conjugate with a benzene ring or another C=C is more stable still, and wins even with fewer alkyl groups.",
      definition:
        "- **Zaitsev (Saytzeff) rule**: the more substituted alkene is the major product.\n" +
        "- **Conjugation wins**: if one alkene is conjugated with a ring or another C=C, it is the major product.\n" +
        "- A very bulky base such as \\(\\mathrm{(CH_3)_3CO^-}\\) gives more of the less substituted alkene.\n" +
        "- **Counting**: list each different β-carbon that carries H, write the alkene each gives, then check each for cis and trans isomers. Ignore rearrangement unless the question allows it.\n" +
        "- Excess alcoholic KOH removes two HX from a dihalide and gives a diene, conjugated where possible.\n" +
        "- In yield problems, carry moles through each step: moles of product = moles of starting material × each fractional yield.",
      formula: {
        label: "Stability order of alkenes (Zaitsev)",
        latex:
          "\\text{tetrasubstituted} > \\text{trisubstituted} > \\text{disubstituted} > \\text{monosubstituted}",
      },
      authoredExample: {
        prompt: "2-Bromo-2-methylbutane is heated with alcoholic KOH. Name the two alkenes that can form and say which is major.",
        steps: [
          "The halide is \\(\\mathrm{(CH_3)_2C(Br){-}CH_2CH_3}\\). Its β-carbons are the two \\(\\mathrm{CH_3}\\) groups on C-2 (equivalent) and C-3.",
          "Removing H from a methyl gives \\(\\mathrm{CH_2{=}C(CH_3)CH_2CH_3}\\), 2-methylbut-1-ene: disubstituted.",
          "Removing H from C-3 gives \\(\\mathrm{(CH_3)_2C{=}CHCH_3}\\), 2-methylbut-2-ene: trisubstituted.",
          "Neither alkene has cis and trans forms. The more substituted alkene is major.",
        ],
        answer: "2-Methylbut-2-ene (major) and 2-methylbut-1-ene (minor).",
      },
      selfCheckExample: {
        prompt: "How many alkenes, counting stereoisomers, can 3-bromohexane give on dehydrohalogenation without rearrangement?",
        steps: [
          "3-Bromohexane is \\(\\mathrm{CH_3CH_2CH(Br)CH_2CH_2CH_3}\\); its β-carbons are C-2 and C-4.",
          "Losing H from C-2 gives hex-2-ene, which exists as cis and trans.",
          "Losing H from C-4 gives hex-3-ene, which also exists as cis and trans.",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "What is the major product of 1-bromo-1-methylcyclohexane with alcoholic KOH?", answer: "1-Methylcyclohexene" },
        { prompt: "What is the major alkene from \\(\\mathrm{C_6H_5CH_2CH(Br)CH_3}\\) with alcoholic KOH?", answer: "\\(\\mathrm{C_6H_5CH{=}CHCH_3}\\), 1-phenylprop-1-ene (conjugated with the ring)" },
        { prompt: "How many alkenes, counting stereoisomers, can 2-bromobutane give?", answer: "3: but-1-ene, cis-but-2-ene and trans-but-2-ene" },
        { prompt: "0.5 mol of an alkyl bromide gives an alkene in 60% yield. How many moles of alkene form?", answer: "0.3 mol" },
      ],
      pyqExampleId: "9c47dcc7-45c8-458d-9810-80424d26fa29", // 2023 — which halide gives the most isomeric alkenes
      traps: [
        {
          title: "Count cis and trans separately",
          body: "A question asking for isomeric alkenes counts geometrical isomers. An alkene such as hept-3-ene counts as two, cis and trans.",
        },
        {
          title: "Conjugation beats the Zaitsev count",
          body: "When one possible C=C lies next to a benzene ring, it is the major product even if another alkene carries more alkyl groups. Check for conjugation before counting substituents.",
        },
        {
          title: "A dihalide with excess base gives a diene",
          body: "Excess alcoholic KOH removes both HX molecules. The two new double bonds form in conjugation, with each other and with any ring, wherever the structure allows.",
        },
      ],
    },
  ],
};
