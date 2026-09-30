import type { SubtopicNote } from "@/app/notes/_types";

export const REDUCE_ALD_NOTE: SubtopicNote = {
  subtopicName: "Reductions: Clemmensen, Wolff-Kishner and Hydrides",
  title: "Reductions: Clemmensen, Wolff-Kishner and Hydrides",
  oneLineDefinition:
    "Clemmensen (in acid) and Wolff–Kishner (in base) turn C=O into CH₂; LiAlH₄, NaBH₄ and DIBAL-H reduce each group to a different level, or leave it alone.",
  whyItMatters:
    "Twenty-one PYQs, none numerical, two from 2026. Thirteen turn a C=O into CH₂ by Clemmensen or Wolff–Kishner and ask which other groups survive; eight ask how far LiAlH₄, NaBH₄ or DIBAL-H reduces each group in a molecule.",
  concepts: [
    // C1 — Clemmensen and Wolff–Kishner
    {
      kind: "reference" as const,
      slug: "jcald-clemmensen-wk",
      name: "Clemmensen and Wolff–Kishner reductions",
      intuition:
        "Both methods remove the oxygen of an aldehyde or ketone completely and leave \\(\\mathrm{CH_2}\\). They differ in the medium: Clemmensen is strongly acidic, Wolff–Kishner strongly basic and hot. Choose the one that the rest of the molecule can survive.",
      definition:
        "- **Clemmensen**: zinc amalgam and concentrated HCl. \\(\\mathrm{{>}C{=}O \\to {>}CH_2}\\).\n" +
        "- **Wolff–Kishner**: hydrazine forms the hydrazone, and heating with KOH in ethylene glycol (about 470 K) drives off \\(\\mathrm{N_2}\\), leaving \\(\\mathrm{CH_2}\\).\n" +
        "- Neither method stops at the alcohol, and neither touches an isolated C=C or a COOH group.\n" +
        "- A molecule that cannot stand acid (a 3° or benzylic alcohol, which dehydrates) needs Wolff–Kishner. A molecule that cannot stand hot base (a C–Cl bond, which is substituted or eliminated) needs Clemmensen.\n" +
        "- Friedel–Crafts acylation followed by Clemmensen puts a straight alkyl chain on a ring. Direct alkylation with a 1° halide would rearrange.",
      table: {
        columns: ["Feature of the substrate", "Clemmensen: Zn-Hg, conc. HCl", "Wolff–Kishner: NH₂NH₂, KOH, glycol, heat"],
        rows: [
          { cells: ["Aldehyde or ketone C=O", "Reduced to \\(\\mathrm{CH_2}\\)", "Reduced to \\(\\mathrm{CH_2}\\), with loss of \\(\\mathrm{N_2}\\)"] },
          { cells: ["Medium", "Strongly acidic, aqueous", "Strongly basic, about 470 K"] },
          { cells: ["Isolated C=C", "Unchanged", "Unchanged"] },
          { cells: ["COOH group", "Unchanged", "Unchanged (present as the carboxylate until acidified)"] },
          { cells: ["3° or benzylic OH", "Dehydrated; avoid this method", "Unchanged; use this method"] },
          { cells: ["C–Cl bond in the chain", "Survives the acid; use this method", "Substituted or eliminated by hot base; avoid this method"] },
          { cells: ["Amide \\(\\mathrm{CONH_2}\\)", "Hydrolysed to COOH by the hot acid", "Hydrolysed to the carboxylate by the hot base"] },
        ],
        caption: "Same result on the C=O; the rest of the molecule decides the method.",
      },
      selfCheckExample: {
        prompt: "Give the product and a suitable method for turning the C=O into \\(\\mathrm{CH_2}\\) in 1-phenylpropan-1-one, and in 4-hydroxy-4-methylcyclohexan-1-one.",
        steps: [
          "1-Phenylpropan-1-one has nothing else that reacts, so either method gives propylbenzene.",
          "4-Hydroxy-4-methylcyclohexan-1-one has a 3° alcohol, which strong acid would dehydrate. Use Wolff–Kishner.",
          "The ring C=O becomes \\(\\mathrm{CH_2}\\) and the 3° OH stays.",
        ],
        answer: "Propylbenzene (either method); 1-methylcyclohexan-1-ol (Wolff–Kishner)",
      },
      practiceSet: [
        { prompt: "What does cyclohexanone give with Zn-Hg and concentrated HCl?", answer: "Cyclohexane" },
        { prompt: "What does 4-oxopentanoic acid give by Wolff–Kishner reduction?", answer: "Pentanoic acid" },
        { prompt: "Which method keeps a tertiary alcohol intact?", answer: "Wolff–Kishner" },
        { prompt: "How is propylbenzene made from benzene without rearrangement?", answer: "Propanoyl chloride with anhydrous \\(\\mathrm{AlCl_3}\\), then Clemmensen reduction" },
      ],
      pyqExampleId: "28039bb8-3bdf-4d0c-a1b0-87849ff03926", // 2026 — match reagents with Wolff–Kishner, Tollens', Fehling's and Clemmensen
      traps: [
        {
          title: "Neither method stops at the alcohol",
          body: "Clemmensen and Wolff–Kishner give \\(\\mathrm{CH_2}\\), not CHOH. An option showing the alcohol is the product of a hydride such as \\(\\mathrm{NaBH_4}\\), not of these reagents.",
        },
        {
          title: "Choose the method by what else is in the molecule",
          body: "A statement that a molecule 'can be reduced' by one of these methods is false if the medium destroys another group: acid dehydrates a 3° alcohol, hot base removes a chlorine.",
        },
      ],
    },

    // C2 — hydrides
    {
      kind: "reference" as const,
      slug: "jcald-hydrides",
      name: "How far LiAlH₄, NaBH₄ and DIBAL-H reduce each group",
      intuition:
        "The three hydride reagents differ in strength. \\(\\mathrm{LiAlH_4}\\) reduces almost every polar multiple bond. \\(\\mathrm{NaBH_4}\\) reduces only aldehydes and ketones. DIBAL-H at low temperature adds a single hydride, so esters and nitriles stop at the aldehyde.",
      definition:
        "- \\(\\mathrm{LiAlH_4}\\) reduces aldehydes and ketones to alcohols, acids and esters to 1° alcohols, amides and nitriles to amines. It does not reduce an isolated C=C.\n" +
        "- \\(\\mathrm{NaBH_4}\\) reduces aldehydes and ketones only. An ester, an acid, an amide or a lactam in the same molecule survives, so \\(\\mathrm{NaBH_4}\\) can reduce the ketone of a keto-ester alone.\n" +
        "- **DIBAL-H** (diisobutylaluminium hydride) at about −78 °C adds one hydride to an ester, a lactone or a nitrile. The intermediate breaks down to the aldehyde only on work-up.\n" +
        "- A lactone (cyclic ester) with DIBAL-H gives a hydroxy aldehyde, which may close to a cyclic hemiacetal (lactol).",
      table: {
        columns: ["Group", "LiAlH₄, then H₃O⁺", "NaBH₄", "DIBAL-H at low temperature, then H₂O"],
        rows: [
          { cells: ["Aldehyde \\(\\mathrm{RCHO}\\)", "\\(\\mathrm{RCH_2OH}\\)", "\\(\\mathrm{RCH_2OH}\\)", "\\(\\mathrm{RCH_2OH}\\)"] },
          { cells: ["Ketone \\(\\mathrm{RCOR'}\\)", "\\(\\mathrm{RCH(OH)R'}\\)", "\\(\\mathrm{RCH(OH)R'}\\)", "\\(\\mathrm{RCH(OH)R'}\\)"] },
          { cells: ["Ester \\(\\mathrm{RCOOR'}\\)", "\\(\\mathrm{RCH_2OH + R'OH}\\)", "No reaction", "\\(\\mathrm{RCHO + R'OH}\\)"] },
          { cells: ["Lactone (cyclic ester)", "Diol", "No reaction", "Hydroxy aldehyde (or its lactol)"] },
          { cells: ["Nitrile \\(\\mathrm{RC{\\equiv}N}\\)", "\\(\\mathrm{RCH_2NH_2}\\)", "No reaction", "\\(\\mathrm{RCHO}\\)"] },
          { cells: ["Isolated C=C", "Unchanged", "Unchanged", "Unchanged"] },
        ],
        caption: "NaBH₄ is the selective one; DIBAL-H is the one that stops at the aldehyde.",
      },
      selfCheckExample: {
        prompt: "Methyl 4-formylbenzoate, \\(\\mathrm{OHC{-}C_6H_4{-}COOCH_3}\\), is treated separately with \\(\\mathrm{NaBH_4}\\) and with excess \\(\\mathrm{LiAlH_4}\\). Give both products.",
        steps: [
          "\\(\\mathrm{NaBH_4}\\) reduces only the CHO: \\(\\mathrm{HOCH_2{-}C_6H_4{-}COOCH_3}\\).",
          "\\(\\mathrm{LiAlH_4}\\) reduces both the CHO and the ester to \\(\\mathrm{CH_2OH}\\), and releases methanol.",
        ],
        answer: "Methyl 4-(hydroxymethyl)benzoate; benzene-1,4-dimethanol, \\(\\mathrm{HOCH_2C_6H_4CH_2OH}\\), and methanol",
      },
      practiceSet: [
        { prompt: "What does methyl pentanoate give with \\(\\mathrm{LiAlH_4}\\)?", answer: "Pentan-1-ol and methanol" },
        { prompt: "Which reagent turns propanenitrile into propanal?", answer: "DIBAL-H, then water" },
        { prompt: "What does \\(\\mathrm{LiAlH_4}\\) do to N-methylethanamide, \\(\\mathrm{CH_3CONHCH_3}\\)?", answer: "Reduces it to the amine \\(\\mathrm{CH_3CH_2NHCH_3}\\)" },
        { prompt: "Which reduces the C=O of cyclohex-3-en-1-one but leaves its C=C: \\(\\mathrm{NaBH_4}\\) or \\(\\mathrm{H_2}\\)/Ni?", answer: "\\(\\mathrm{NaBH_4}\\)" },
      ],
      pyqExampleId: "086ae47f-da06-434a-86ed-a35e3cc7e2ac", // 2024 — match DIBAL-H, Zn(Hg)/HCl, CH3MgBr and NaBH4 with four changes
      traps: [
        {
          title: "NaBH₄ leaves esters, acids and amides alone",
          body: "In a molecule with a ketone and an ester, \\(\\mathrm{NaBH_4}\\) reduces the ketone only. \\(\\mathrm{LiAlH_4}\\) would reduce both.",
        },
        {
          title: "DIBAL-H must be cold",
          body: "DIBAL-H stops at the aldehyde only at low temperature with one equivalent. Warm, or in excess, it reduces the ester on to the alcohol.",
        },
      ],
    },
  ],
};
