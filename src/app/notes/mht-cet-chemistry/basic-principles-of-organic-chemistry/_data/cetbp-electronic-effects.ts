import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTRONIC_EFFECTS_NOTE: SubtopicNote = {
  subtopicName: "Electronic Effects, Hybridization, Intermediates and General Reactions",
  title: "Electronic Effects, Hybridisation, Intermediates and General Reactions",
  oneLineDefinition:
    "Carbon is sp³ with four single bonds, sp² at a double bond and sp at a triple bond; substituents push or pull electrons by induction and resonance, which is what ranks carbocations tertiary > secondary > primary > methyl and sorts groups into donors and withdrawers.",
  whyItMatters:
    "11 PYQs, 2 HARD. Four count sp³ or sp² carbons, atoms or moles from a formula (one is an empirical-formula derivation); three ask which group donates or withdraws electrons or which carbocation is least stable; three are named reagents — the Grignard reagent, its reaction with dry ice, the Clemmensen reduction. " +
    "Three cards.",
  concepts: [
    // 1 — hybridisation and counting
    {
      kind: "formula" as const,
      slug: "cetbp-hybridisation-and-counting",
      name: "Hybridisation of Carbon and Counting From a Formula",
      intuition:
        "Count what a carbon is bonded to: four single bonds → sp³; one double bond → sp²; a triple bond or two doubles → sp. A saturated formula has only sp³ carbons. For molecular formulas, work from percentages to the empirical formula and scale by the molar mass.",
      definition:
        "- sp³: alkanes, any carbon with four single bonds — isopentane has five sp³ carbons and **zero sp²**. \\(\\text{HO(CH}_2)_3\\text{CH(CH}_3)\\text{CH(CH}_3)_2\\): **eight** sp³ carbons.\n" +
        "- sp²: alkene and carbonyl carbons, aromatic ring carbons. sp: alkyne carbons, allene's central carbon.\n" +
        "- Moles of an element in n mol of compound = n × (atoms per molecule): but-2-ene \\(\\text{C}_4\\text{H}_8\\) gives 8n mol H. Burning \\(\\tfrac{6}{12} = 0.5\\) mol C gives 0.5 mol CO₂ = 11.2 dm³ at STP.\n" +
        "- Empirical formula: divide each mass % by the atomic mass, then by the smallest. C 42.8/12 = 3.57, H 7.2, N 50/14 = 3.57 → 1 : 2 : 1 → \\(\\text{CH}_2\\text{N}\\) (28). Molecular formula = (empirical) × (M / 28).",
      formula: {
        label: "Hybridisation from bonding",
        latex:
          "4\\ \\sigma \\Rightarrow sp^3;\\qquad 3\\ \\sigma + 1\\ \\pi \\Rightarrow sp^2;\\qquad 2\\ \\sigma + 2\\ \\pi \\Rightarrow sp",
      },
      authoredExample: {
        prompt: "Count the sp³, sp² and sp carbons in \\(\\text{CH}_3\\text{-CH=CH-C≡C-CH}_3\\).",
        steps: [
          "Two CH₃: sp³. Two CH=: sp². Two C≡: sp.",
        ],
        answer: "2 sp³, 2 sp², 2 sp",
      },
      selfCheckExample: {
        prompt: "A compound is 40% C, 6.7% H, 53.3% O with M = 60. Find its molecular formula.",
        steps: [
          "C 3.33, H 6.67, O 3.33 → 1 : 2 : 1 → CH₂O (30); M/30 = 2 → \\(\\text{C}_2\\text{H}_4\\text{O}_2\\).",
        ],
        answer: "\\(\\text{C}_2\\text{H}_4\\text{O}_2\\)",
      },
      practiceSet: [
        { prompt: "sp² carbons in isopentane?", answer: "Zero" },
        { prompt: "sp³ carbons in \\(\\text{HO(CH}_2)_3\\text{CH(CH}_3)\\text{CH(CH}_3)_2\\)?", answer: "Eight" },
        { prompt: "Moles of H in n mol of \\(\\text{C}_4\\text{H}_8\\)?", answer: "8n" },
        { prompt: "Volume of CO₂ at STP from 0.5 mol C?", answer: "11.2 dm³" },
      ],
      pyqExampleId: "df5073c4-b67e-4256-b0b8-e9cea77d0dfe",
      traps: [
        {
          title: "Hearing 'isopentane' as an alkene",
          body:
            "The iso- prefix marks a branch, not a double bond. Isopentane is 2-methylbutane, fully saturated: every carbon sp³.",
        },
      ],
    },

    // 2 — electronic effects and carbocations
    {
      kind: "formula" as const,
      slug: "cetbp-electronic-effects-and-carbocations",
      name: "Inductive and Resonance Effects; Carbocation Stability",
      intuition:
        "Alkyl groups push electrons (+I) and their C–H bonds hyperconjugate into an empty p orbital, so the more alkyls on a positive carbon, the steadier it is: 3° > 2° > 1° > CH₃⁺. Groups with a lone pair on the atom attached to a π-system donate by resonance (+R: −NH₂, −NHR, −OH, −OR); groups with a multiple bond to an electronegative atom withdraw (−R, −I: −NO₂, −CN, −COOH, −COOR, −CHO).",
      definition:
        "- **+I** (electron-releasing): alkyl groups, increasing with size. **−I** (withdrawing): −NO₂, −CN, −COOH, −F, −Cl, −Br, −OH, −OR (through the σ bond).\n" +
        "- **+R** (donating by resonance): −NH₂, −NHR, −NR₂, −OH, −OR, −Cl (lone pair conjugated). **−R** (withdrawing): −NO₂, −CN, −CHO, −COR, −COOH, −COOR.\n" +
        "- Attached to a π-bond, −COOH is a clean electron WITHDRAWER (−I and −R); −OH and −OR are net donors; −Cl is −I but +R, a weak net withdrawer.\n" +
        "- Carbocation stability: \\((\\text{R})_3\\text{C}^+ > (\\text{R})_2\\text{CH}^+ > \\text{RCH}_2^+ > \\text{CH}_3^+\\) — the methyl cation is LEAST stable. Reverse order for carbanions; free radicals follow the carbocation order.",
      formula: {
        label: "Carbocation order",
        latex:
          "3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3^+ \\quad (\\text{+I and hyperconjugation})",
      },
      authoredExample: {
        prompt: "Rank the stability of \\((\\text{CH}_3)_3\\text{C}^+\\), \\(\\text{CH}_3\\text{CH}_2^+\\) and \\(\\text{CH}_2\\text{=CH-CH}_2^+\\), and say which of −OCH₃ and −NO₂ shows +R.",
        steps: [
          "Allyl is resonance-stabilised, roughly with secondary; tertiary tops the list, ethyl (primary) is last: \\((\\text{CH}_3)_3\\text{C}^+ > \\text{allyl} > \\text{CH}_3\\text{CH}_2^+\\).",
          "−OCH₃ has a lone pair to donate: +R. −NO₂ withdraws: −R.",
        ],
        answer: "\\((\\text{CH}_3)_3\\text{C}^+ >\\) allyl \\(> \\text{CH}_3\\text{CH}_2^+\\); −OCH₃",
      },
      selfCheckExample: {
        prompt: "Which of −CN, −NO₂, −COOR and −NHR shows the +R effect, and which carbocation is least stable: \\(\\text{R}_3\\text{C}^+\\) or \\(\\text{CH}_3^+\\)?",
        steps: [
          "−NHR (lone pair on N). CH₃⁺ has no alkyl group to stabilise it.",
        ],
        answer: "−NHR; \\(\\text{CH}_3^+\\)",
      },
      practiceSet: [
        { prompt: "Least stable carbocation: 3°, 2°, 1° or CH₃⁺?", answer: "CH₃⁺" },
        { prompt: "Electron-withdrawing when attached to a π-bond: −COOH, −OR, −OH?", answer: "−COOH" },
        { prompt: "+R group among −NHR, −CN, −NO₂, −COOR?", answer: "−NHR" },
        { prompt: "Effect of an alkyl group?", answer: "+I (electron releasing)" },
      ],
      pyqExampleId: "ff997d00-da29-411e-abd7-12af2511a100",
      traps: [
        {
          title: "Calling −OH a withdrawer because oxygen is electronegative",
          body:
            "Through the σ bond it is (−I), but attached to a π-system the lone pair donates by resonance and +R wins: −OH and −OR are net DONORS. −COOH, with no lone pair to give and a C=O to pull, withdraws by both routes.",
        },
      ],
    },

    // 3 — named reagents and reactions
    {
      kind: "formula" as const,
      slug: "cetbp-named-reagents-and-reactions",
      name: "Grignard Reagent, Dry Ice and the Clemmensen Reduction",
      intuition:
        "Three named items recur. The Grignard reagent R–Mg–X is the chapter's carbon nucleophile; with dry ice (solid CO₂) in dry ether and then dilute acid it adds one carbon and gives a carboxylic acid. Clemmensen (Zn–Hg, conc. HCl) and Wolff–Kishner (hydrazine, KOH) both turn C=O into CH₂ — by different reagents.",
      definition:
        "- **Grignard reagent**: \\(\\text{R-Mg-X}\\) (R alkyl or aryl, X a halogen), made from R–X and Mg in dry ether; destroyed by water.\n" +
        "- \\(\\text{R-MgBr} + \\text{CO}_2 \\to \\text{R-COOMgBr} \\xrightarrow{\\text{dil. HCl}} \\text{R-COOH}\\): ethylmagnesium bromide gives **propanoic acid** (one carbon more than R).\n" +
        "- **Clemmensen**: \\(\\text{R-CHO} \\xrightarrow{\\text{Zn-Hg / conc. HCl}} \\text{R-CH}_3\\); \\(\\text{R-CO-R} \\to \\text{R-CH}_2\\text{-R}\\). **Wolff–Kishner**: the same change with \\(\\text{NH}_2\\text{NH}_2 / \\text{KOH}\\). \\(\\text{LiAlH}_4\\) gives the ALCOHOL, not the alkane.\n" +
        "- Stephen reduction: \\(\\text{R-CN} \\xrightarrow{\\text{SnCl}_2 / \\text{HCl}} \\text{R-CHO}\\).",
      formula: {
        label: "Grignard with dry ice",
        latex:
          "\\text{R-MgX} \\xrightarrow{\\ \\text{(i) CO}_2\\text{, dry ether; (ii) H}_3\\text{O}^+\\ } \\text{R-COOH}",
      },
      authoredExample: {
        prompt: "Which acid forms from isopropylmagnesium bromide and dry ice, and what does Clemmensen reduction do to propanone?",
        steps: [
          "\\((\\text{CH}_3)_2\\text{CH-MgBr} + \\text{CO}_2\\), then acid: 2-methylpropanoic acid. Propanone's C=O becomes CH₂: propane.",
        ],
        answer: "2-Methylpropanoic acid; propane",
      },
      selfCheckExample: {
        prompt: "Name the reagent that converts R–CHO to R–CH₃ using zinc amalgam, and the general formula of a Grignard reagent.",
        steps: [
          "Zn–Hg with concentrated HCl is the Clemmensen reduction; the Grignard reagent is R–Mg–X.",
        ],
        answer: "Clemmensen (Zn–Hg / conc. HCl); R–Mg–X",
      },
      practiceSet: [
        { prompt: "General formula of a Grignard reagent?", answer: "R–Mg–X" },
        { prompt: "\\(\\text{CH}_3\\text{CH}_2\\text{MgBr}\\) + dry ice, then dil. HCl gives?", answer: "Propanoic acid" },
        { prompt: "Reagent of the Clemmensen reduction?", answer: "Zn–Hg / conc. HCl" },
        { prompt: "\\(\\text{NH}_2\\text{NH}_2\\) / KOH on a ketone is which reduction?", answer: "Wolff–Kishner" },
      ],
      pyqExampleId: "55b25aa9-fa08-4404-bdb1-c9c776290cf3",
      traps: [
        {
          title: "Forgetting the extra carbon from CO₂",
          body:
            "Ethyl-MgBr does not give ethanoic acid. The CO₂ carbon joins the chain: ethyl becomes propanoic acid. Count R plus one.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Nomenclature — naming the products of these reactions",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-nomenclature-and-functional-groups",
    },
    {
      label: "Isomerism — chirality at the sp³ carbon",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-isomerism",
    },
  ],
};
