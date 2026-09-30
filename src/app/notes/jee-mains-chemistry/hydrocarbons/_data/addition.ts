import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const ADDITION_HC_NOTE: SubtopicNote = {
  subtopicName: "Alkene Stability and Addition of HX and Water",
  title: "Alkene Stability and Addition of HX and Water",
  oneLineDefinition:
    "More alkyl groups on the C=C make an alkene more stable; HX and water add through the more stable carbocation (Markovnikov), which may rearrange first, while HBr with a peroxide adds the other way through a radical.",
  whyItMatters:
    "Twenty-nine PYQs, twenty-six of them multiple choice, and eight from 2026. Seven put alkenes or carbanions in order of stability or count hyperconjugating hydrogens. Sixteen ask for the product of HX addition, most of them with a hydride or methyl shift, a peroxide or a conjugated system to trap the careless. Six compare acid-catalysed hydration, oxymercuration and hydroboration of the same alkene.",
  concepts: [
    // C1 — stability of alkenes and carbanions
    {
      kind: "reference" as const,
      slug: "jchc-alkene-stability",
      name: "Stability of alkenes and carbanions",
      intuition:
        "Alkyl groups on the doubly bonded carbons feed electron density into the π bond through hyperconjugation: each C–H bond on a carbon next to the C=C (an α-H) takes part. So the more alkyl groups on the C=C, the more stable the alkene, and the less heat it gives out when hydrogenated. A carbanion is the opposite case: it already has a negative charge, so alkyl groups, which push electrons, destabilise it, while more s-character holds the lone pair closer to the nucleus and stabilises it.",
      definition:
        "- Alkene stability: tetrasubstituted > trisubstituted > disubstituted > monosubstituted > ethene. Among disubstituted, trans > cis (the cis alkyl groups crowd each other).\n" +
        "- Number of hyperconjugation structures = number of **α-H** (H on carbons attached to the C=C, or to a cation's positive carbon).\n" +
        "- An alkene is less stable than the alkane (the π bond is weaker than a σ bond), yet the C=C as a whole is stronger and shorter (134 pm) than a C–C single bond (154 pm).\n" +
        "- Carbanion stability by hybridisation: \\(\\mathrm{HC{\\equiv}C^- > CH_2{=}CH^- > CH_3CH_2^-}\\) (50%, 33%, 25% s-character).\n" +
        "- Carbanion stability by alkyl groups: \\(\\mathrm{CH_3^- > 1^\\circ > 2^\\circ > 3^\\circ}\\). Electron-withdrawing groups (–CHO, –NO₂, halogen) stabilise a carbanion; +R groups such as –OCH₃ destabilise it.",
      table: {
        columns: ["Alkene", "Alkyl groups on C=C", "α-H count", "Place in stability order"],
        rows: [
          { cells: ["2,3-Dimethylbut-2-ene", "4", "12", "Most stable of this list"] },
          { cells: ["2-Methylbut-2-ene", "3", "9", "Second"] },
          { cells: ["trans-But-2-ene", "2", "6", "Third"] },
          { cells: ["cis-But-2-ene", "2", "6", "Fourth (steric crowding of the cis groups)"] },
          { cells: ["Propene", "1", "3", "Fifth"] },
          { cells: ["Ethene", "0", "0", "Least stable"] },
        ],
        caption: "Stability follows the number of alkyl groups on the C=C; at equal substitution, trans beats cis.",
      },
      selfCheckExample: {
        prompt: "Arrange in decreasing stability: pent-1-ene, 2-methylpent-2-ene, trans-pent-2-ene.",
        steps: [
          "2-Methylpent-2-ene, \\(\\mathrm{(CH_3)_2C{=}CH{-}CH_2CH_3}\\), has three alkyl groups on the C=C.",
          "trans-Pent-2-ene has two; pent-1-ene has one.",
        ],
        answer: "2-Methylpent-2-ene > trans-pent-2-ene > pent-1-ene",
      },
      practiceSet: [
        { prompt: "How many α-hydrogens does 2-methylpropene have?", answer: "6" },
        { prompt: "Which is more stable, the vinyl carbanion or the ethyl carbanion?", answer: "Vinyl, \\(\\mathrm{CH_2{=}CH^-}\\) (sp², more s-character)" },
        { prompt: "Which is more stable, the methyl carbanion or the tert-butyl carbanion?", answer: "Methyl (alkyl groups destabilise a carbanion)" },
        { prompt: "Which releases more heat on hydrogenation, but-1-ene or trans-but-2-ene?", answer: "But-1-ene (it is less stable)" },
      ],
      pyqExampleId: "4bc9ce7b-5f7c-41f9-8966-5eaeb043de7b", // 2026 — stability order of four named alkenes
      traps: [
        {
          title: "Carbanions run the opposite way to carbocations",
          body: "Alkyl groups stabilise a carbocation (3° > 2° > 1°) but destabilise a carbanion (1° > 2° > 3°). Resonance stabilises both; more s-character stabilises a carbanion but destabilises a carbocation.",
        },
        {
          title: "A weaker π bond does not make C=C weaker than C–C",
          body: "The π bond is weaker than a σ bond, which is why alkenes react and are less stable than alkanes. But the C=C double bond (σ + π) is still stronger than a C–C single bond.",
        },
      ],
    },

    // C2 — HX addition
    {
      kind: "formula" as const,
      slug: "jchc-hx-addition",
      name: "Markovnikov and anti-Markovnikov addition of HX",
      intuition:
        "H⁺ adds first, to the carbon that leaves the MORE stable carbocation, and X⁻ then bonds to the positive carbon. That puts H on the carbon that already has more H (Markovnikov). If a hydride or methyl shift from the next carbon would give a more stable cation, it happens before X⁻ arrives. With HBr and a peroxide the order flips: Br· adds first, to the carbon that leaves the more stable RADICAL, so Br ends on the carbon with more H (anti-Markovnikov).",
      definition:
        "- **Ionic addition (HCl, HBr, HI)**: Markovnikov, through the more stable carbocation. HI > HBr > HCl in rate.\n" +
        "- **Rearrangement**: a 1,2-hydride or 1,2-methyl shift turns a 2° cation into a 3° one; a cyclobutylmethyl cation expands to a cyclopentyl ring.\n" +
        "- **Peroxide effect (Kharasch)**: only HBr. HCl's bond is too strong to give Cl·, and I· combines to I₂ instead of adding.\n" +
        "- **Conjugated dienes** add at the ends (1,4-addition) as well as 1,2, through an allylic cation.\n" +
        "- A C=C next to an O lone pair (an enol ether) protonates fastest: the cation is stabilised by the oxygen (oxocarbenium ion).",
      formula: {
        label: "Two orientations",
        latex: "\\mathrm{R{-}CH{=}CH_2 \\xrightarrow{HBr} R{-}CHBr{-}CH_3}\\qquad \\mathrm{R{-}CH{=}CH_2 \\xrightarrow{HBr,\\ (PhCOO)_2} R{-}CH_2{-}CH_2Br}",
      },
      authoredExample: {
        prompt: "What is the major product when 3-methylbut-1-ene reacts with HBr (a) in the dark with no peroxide and (b) with benzoyl peroxide?",
        steps: [
          "(a) H⁺ adds to C-1, giving a 2° cation at C-2: \\(\\mathrm{CH_3{-}\\overset{+}{C}H{-}CH(CH_3)_2}\\).",
          "A hydride shifts from C-3 to C-2, giving the 3° cation \\(\\mathrm{CH_3{-}CH_2{-}\\overset{+}{C}(CH_3)_2}\\). Br⁻ bonds there.",
          "(b) Br· adds to C-1, leaving the 2° radical at C-2, which is more stable than a 1° radical at C-1. H then comes from HBr.",
        ],
        answer: "(a) 2-Bromo-2-methylbutane; (b) 1-bromo-3-methylbutane.",
      },
      selfCheckExample: {
        prompt: "Propene reacts with HCl in the presence of a peroxide. What is the product?",
        steps: [
          "The peroxide effect works only with HBr.",
          "So HCl adds by the ionic route, through the 2° cation.",
        ],
        answer: "2-Chloropropane",
      },
      practiceSet: [
        { prompt: "Product of 1-methylcyclohexene with HBr (no peroxide)?", answer: "1-Bromo-1-methylcyclohexane" },
        { prompt: "Product of 3,3-dimethylbut-1-ene with HCl?", answer: "2-Chloro-2,3-dimethylbutane (methyl shift)" },
        { prompt: "What is the 1,4-addition product of buta-1,3-diene with one mole of HBr?", answer: "1-Bromobut-2-ene" },
        { prompt: "Styrene reacts with HBr and benzoyl peroxide. What aromatic by-product forms from the peroxide?", answer: "Benzene (a phenyl radical takes an H), with CO₂", method: "\\(\\mathrm{(PhCOO)_2 \\rightarrow 2Ph^\\bullet + 2CO_2}\\)" },
      ],
      pyqExampleId: "d99bf9f4-29b5-4bf5-a6e8-f54e9b286a2e", // 2024 — peroxide HBr adduct of 3-methylhex-2-ene, count stereoisomers
      traps: [
        {
          title: "Look for a shift before placing X",
          body: "Whenever the first cation is 2° and a neighbouring carbon is 3° or quaternary, check for a hydride or methyl shift. The answer that ignores the shift is always among the options.",
        },
        {
          title: "Peroxide changes only HBr",
          body: "HCl and HI with a peroxide still give the Markovnikov product. Only HBr adds anti-Markovnikov.",
        },
        {
          title: "Count stereocentres in the product, not the alkene",
          body: "A question may ask for the stereoisomers of the ADDITION product. Adding H and Br can create new stereocentres: two stereocentres give up to four stereoisomers.",
        },
      ],
    },

    // C3 — hydration routes
    {
      kind: "reference" as const,
      slug: "jchc-hydration",
      name: "Three ways to add water to an alkene",
      intuition:
        "All three routes put H and OH across the C=C, but they differ in where the OH goes and whether the carbon skeleton can change. Dilute acid goes through a free carbocation, so it is Markovnikov and can rearrange. Oxymercuration goes through a bridged mercurinium ion, so it is Markovnikov but never rearranges. Hydroboration puts boron, and later OH, on the LESS substituted carbon, with H and OH added on the same face.",
      definition:
        "- **Acid-catalysed hydration** (dil. H₂SO₄ or H₂O/H⁺): Markovnikov; carbocation shifts possible.\n" +
        "- **Oxymercuration–demercuration** (Hg(OAc)₂, H₂O; then NaBH₄): Markovnikov; no rearrangement.\n" +
        "- **Hydroboration–oxidation** (B₂H₆ or BH₃·THF; then H₂O₂, OH⁻): anti-Markovnikov; syn addition; no rearrangement.",
      table: {
        columns: ["Route", "Orientation", "Rearrangement", "Product from 3,3-dimethylbut-1-ene"],
        rows: [
          { cells: ["\\(\\mathrm{H_2O,\\ H^+}\\)", "Markovnikov", "Yes (methyl shift here)", "2,3-Dimethylbutan-2-ol"] },
          { cells: ["\\(\\mathrm{Hg(OAc)_2,\\ H_2O}\\); \\(\\mathrm{NaBH_4}\\)", "Markovnikov", "No", "3,3-Dimethylbutan-2-ol"] },
          { cells: ["\\(\\mathrm{B_2H_6}\\); \\(\\mathrm{H_2O_2,\\ OH^-}\\)", "Anti-Markovnikov, syn", "No", "3,3-Dimethylbutan-1-ol"] },
        ],
        caption: "One alkene, three different alcohols: the acid route is the only one that can move a methyl group.",
      },
      selfCheckExample: {
        prompt: "1-Methylcyclohexene is treated with \\(\\mathrm{B_2H_6}\\) and then alkaline \\(\\mathrm{H_2O_2}\\). What is the product?",
        steps: [
          "Boron goes to the less substituted carbon, C-2, and H to C-1, on the same face.",
          "OH replaces B with retention, so OH on C-2 and H on C-1 are cis; that leaves the CH₃ on C-1 trans to the OH.",
        ],
        answer: "trans-2-Methylcyclohexan-1-ol",
      },
      practiceSet: [
        { prompt: "Which route gives 2-methylpropan-1-ol from 2-methylpropene?", answer: "Hydroboration–oxidation" },
        { prompt: "Does oxymercuration of 3-methylbut-1-ene give a rearranged alcohol?", answer: "No; it gives 3-methylbutan-2-ol" },
        { prompt: "Acid-catalysed hydration of 3-methylbut-1-ene gives which alcohol?", answer: "2-Methylbutan-2-ol (hydride shift)" },
        { prompt: "Which reagent removes the mercury in oxymercuration?", answer: "\\(\\mathrm{NaBH_4}\\)" },
      ],
      pyqExampleId: "1162ff68-f58f-40d4-874e-38608155737e", // 2024 — acid hydration vs hydroboration of the same alkene
      traps: [
        {
          title: "Oxymercuration does not rearrange",
          body: "The mercurinium ion is bridged, so no free carbocation forms and no group shifts. An option that shows a shifted skeleton from oxymercuration is wrong.",
        },
        {
          title: "Hydroboration is anti-Markovnikov without any peroxide",
          body: "Boron is the electrophile and goes to the less crowded carbon. The result, OH on the less substituted carbon, needs no radical and no peroxide.",
        },
      ],
    },
  ],
  related: [
    { label: "Halogen Addition, Oxidation and Ozonolysis of Alkenes — the other reactions of C=C", href: `${BASE}/jch-hc-oxidation` },
  ],
};
