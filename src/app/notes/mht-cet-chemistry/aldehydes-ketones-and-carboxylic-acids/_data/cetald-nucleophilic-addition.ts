import type { SubtopicNote } from "@/app/notes/_types";

export const NUCLEOPHILIC_ADDITION_NOTE: SubtopicNote = {
  subtopicName: "Nucleophilic Addition and Condensation Reactions",
  title: "Nucleophilic Addition and Condensation Reactions",
  oneLineDefinition:
    "The carbonyl carbon is electrophilic, so nucleophiles add to it — HCN gives a cyanohydrin, an alcohol a hemiacetal, ammonia derivatives the oximes, hydrazones and semicarbazones — and two carbonyls with α-hydrogens combine in the aldol reaction, while those without α-hydrogen disproportionate in the Cannizzaro reaction.",
  whyItMatters:
    "15 PYQs, none HARD. Three ask the reagent for a semicarbazone (semicarbazide, three times), one for a cyanohydrin (HCN), one which drawing is a hemiacetal; nine are aldol and Cannizzaro — propanone to mesityl oxide, ethanal to but-2-enal, methanal plus benzaldehyde giving methanoic acid and benzyl alcohol, and what type of reaction each is. " +
    "Two cards.",
  concepts: [
    // 1 — addition derivatives
    {
      kind: "formula" as const,
      slug: "cetald-addition-derivatives",
      name: "Cyanohydrins, Hemiacetals and the Ammonia Derivatives",
      intuition:
        "The nucleophile's atom ends up on the carbonyl carbon. HCN puts CN there next to a new OH (cyanohydrin). One alcohol molecule gives a carbon carrying both OH and OR (hemiacetal); a second alcohol makes the acetal. Ammonia derivatives NH₂–Z add then lose water to give C=N–Z: Z = OH → oxime, Z = NH₂ → hydrazone, Z = NHC₆H₅ → phenylhydrazone, Z = NHCONH₂ → semicarbazone.",
      definition:
        "- \\(\\text{CH}_3\\text{CHO} + \\text{HCN} \\to \\text{CH}_3\\text{CH(OH)CN}\\), acetaldehyde cyanohydrin. Reagent: HCN (not NaHSO₃, which gives the bisulphite adduct).\n" +
        "- Hemiacetal: OH and OR on the SAME carbon, \\(\\text{RCH(OH)OR'}\\); acetal: two OR groups.\n" +
        "- \\(\\text{NH}_2\\text{OH}\\) → oxime; \\(\\text{NH}_2\\text{NH}_2\\) → hydrazone; \\(\\text{NH}_2\\text{NHC}_6\\text{H}_5\\) → phenylhydrazone; \\(\\text{NH}_2\\text{NHCONH}_2\\) (semicarbazide) → **semicarbazone**; 2,4-DNP → 2,4-dinitrophenylhydrazone (orange precipitate).\n" +
        "- A hydroxy-ketone such as \\(\\text{CH}_3\\text{CH(OH)COCH}_2\\text{CH}_3\\) is named as the ketone: 2-hydroxypentan-3-one.",
      formula: {
        label: "Addition then loss of water",
        latex:
          "\\text{>C=O} + \\text{H}_2\\text{N-Z} \\to \\text{>C(OH)-NH-Z} \\xrightarrow{-\\text{H}_2\\text{O}} \\text{>C=N-Z}",
      },
      authoredExample: {
        prompt: "Name the product of propanone with (i) hydroxylamine, (ii) phenylhydrazine, (iii) HCN.",
        steps: [
          "(i) Propanone oxime. (ii) Propanone phenylhydrazone. (iii) Acetone cyanohydrin, \\((\\text{CH}_3)_2\\text{C(OH)CN}\\).",
        ],
        answer: "Oxime; phenylhydrazone; acetone cyanohydrin",
      },
      selfCheckExample: {
        prompt: "Which reagent turns a ketone into a semicarbazone: NH₂OH, NH₂NHCONH₂, NH₂NHC₆H₅ or NH₂NH₂?",
        steps: [
          "Semicarbazide carries the CONH₂.",
        ],
        answer: "\\(\\text{NH}_2\\text{-NH-CONH}_2\\)",
      },
      practiceSet: [
        { prompt: "Reagent for acetaldehyde cyanohydrin?", answer: "HCN" },
        { prompt: "Reagent for a semicarbazone?", answer: "Semicarbazide, NH₂NHCONH₂" },
        { prompt: "A carbon bearing OH and OR is a?", answer: "Hemiacetal" },
        { prompt: "NH₂OH gives which derivative?", answer: "Oxime" },
      ],
      pyqExampleId: "73fe501b-f27b-4636-9051-cfab839cac3a",
      traps: [
        {
          title: "Confusing hydrazine with semicarbazide",
          body:
            "NH₂NH₂ gives a hydrazone; the semicarbazone needs the urea-like NH₂NHCONH₂. All four ammonia derivatives are offered together; match the Z group to the product name.",
        },
      ],
    },

    // 2 — aldol and Cannizzaro
    {
      kind: "formula" as const,
      slug: "cetald-aldol-and-cannizzaro",
      name: "Aldol Reaction and the Cannizzaro Reaction",
      intuition:
        "With an α-hydrogen, dilute base makes an enolate that ADDS to a second carbonyl — the aldol, a β-hydroxy carbonyl; heating then eliminates water to the α,β-unsaturated compound (aldol condensation = addition + elimination). Without an α-hydrogen (methanal, benzaldehyde), concentrated base makes two molecules DISPROPORTIONATE: one is oxidised to the acid, the other reduced to the alcohol (Cannizzaro).",
      definition:
        "- Ethanal \\(\\xrightarrow{\\text{dil. NaOH}}\\) 3-hydroxybutanal (aldol, A) \\(\\xrightarrow{\\Delta,\\ -\\text{H}_2\\text{O}}\\) **but-2-enal** (crotonaldehyde, B).\n" +
        "- Propanone \\(\\xrightarrow{\\text{Ba(OH)}_2}\\) 4-hydroxy-4-methylpentan-2-one (A) \\(\\xrightarrow{\\Delta}\\) **4-methylpent-3-en-2-one** (mesityl oxide, B).\n" +
        "- Aldol formation is a nucleophilic ADDITION; the condensation is addition–elimination (nucleophilic addition-elimination).\n" +
        "- **Cannizzaro** (no α-H, conc. NaOH): 2 HCHO → HCOOH + CH₃OH; 2 C₆H₅CHO → C₆H₅COOH + C₆H₅CH₂OH. Crossed: HCHO + C₆H₅CHO → **methanoic acid + phenylmethanol** (methanal is oxidised, benzaldehyde reduced). Type: disproportionation.",
      formula: {
        label: "Aldol and Cannizzaro",
        latex:
          "2\\,\\text{RCH}_2\\text{CHO} \\xrightarrow{\\text{OH}^-} \\text{RCH}_2\\text{CH(OH)CHR-CHO} \\xrightarrow{\\Delta} \\text{RCH}_2\\text{CH=CR-CHO};\\qquad 2\\,\\text{ArCHO} \\xrightarrow{\\text{conc. OH}^-} \\text{ArCOO}^- + \\text{ArCH}_2\\text{OH}",
      },
      authoredExample: {
        prompt: "Give the aldol and the condensation product of propanal, and the products of the Cannizzaro reaction of 2,2-dimethylpropanal.",
        steps: [
          "Propanal: 3-hydroxy-2-methylpentanal, then 2-methylpent-2-enal. 2,2-Dimethylpropanal has no α-H: 2,2-dimethylpropanoic acid + 2,2-dimethylpropan-1-ol.",
        ],
        answer: "3-Hydroxy-2-methylpentanal → 2-methylpent-2-enal; pivalic acid + neopentyl alcohol",
      },
      selfCheckExample: {
        prompt: "Which of ethanal, benzaldehyde, propanone and methanal can give an aldol, and which pair undergoes the crossed Cannizzaro reaction?",
        steps: [
          "Aldol needs α-H: ethanal and propanone. Cannizzaro needs none: methanal + benzaldehyde.",
        ],
        answer: "Ethanal, propanone; methanal + benzaldehyde",
      },
      practiceSet: [
        { prompt: "Ethanal → (dil. NaOH) A → (Δ) B: B?", answer: "But-2-enal" },
        { prompt: "Propanone → (Ba(OH)₂) A → (Δ, −H₂O) B: B?", answer: "4-Methylpent-3-en-2-one" },
        { prompt: "Methanal + benzaldehyde + conc. NaOH gives?", answer: "Methanoic acid + phenylmethanol" },
        { prompt: "Cannizzaro reaction is an example of?", answer: "Disproportionation" },
      ],
      pyqExampleId: "72c41a83-5aa2-436d-904d-73e438ebeafa",
      traps: [
        {
          title: "Reducing the wrong aldehyde in the crossed Cannizzaro",
          body:
            "Methanal is the stronger hydride donor, so IT is oxidised (to methanoic acid) and benzaldehyde is reduced (to benzyl alcohol). 'Methanol and benzoic acid' is the reversed, planted option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Redox and Tests — the oxidations that follow addition",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-redox-and-tests",
    },
    {
      label: "Preparation — where the carbonyls come from",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-preparation",
    },
  ],
};
