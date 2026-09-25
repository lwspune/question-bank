import type { SubtopicNote } from "@/app/notes/_types";

export const PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Alkyl Halides",
  title: "Preparation of Alkyl Halides",
  oneLineDefinition:
    "Alkyl halides come from alcohols (HX, PCl₅, SOCl₂), from alkenes by Markovnikov addition of HX, and from other halides by exchange — Finkelstein for iodides, Swarts for fluorides; the reverse direction, Wurtz and Fittig coupling with sodium, removes the halogen and joins two carbons.",
  whyItMatters:
    "16 PYQs, none HARD. Seven are the two exchange reactions by name or product (Finkelstein → iodide, Swarts → fluoride, tert-butyl bromide + AgF), six are Wurtz, Fittig and Wurtz–Fittig — which is which, which halide couples to a named alkane, which alkane cannot form — and three are reagent-from-by-products or the alkene that adds HBr to a named product. " +
    "Names and one Markovnikov rule.",
  concepts: [
    // 1 — from alcohols and alkenes
    {
      kind: "formula" as const,
      slug: "cethal-from-alcohols-and-alkenes",
      name: "From Alcohols and Alkenes",
      intuition:
        "An alcohol's OH is swapped for X by HX (tertiary fastest), by PCl₅ (giving HCl and POCl₃) or by SOCl₂ (giving only gases, the cleanest). An alkene adds HX across the double bond with the halogen going to the MORE substituted carbon — Markovnikov — so 1-methylcyclohexene gives 1-bromo-1-methylcyclohexane.",
      definition:
        "- \\(\\text{R-OH} + \\text{HX} \\to \\text{R-X} + \\text{H}_2\\text{O}\\); with HCl needs ZnCl₂ (Lucas); rate 3° > 2° > 1°.\n" +
        "- \\(\\text{R-OH} + \\text{PCl}_5 \\to \\text{R-Cl} + \\text{HCl} + \\text{POCl}_3\\) — the by-products HCl + POCl₃ identify PCl₅. \\(3\\text{R-OH} + \\text{PCl}_3 \\to 3\\text{R-Cl} + \\text{H}_3\\text{PO}_3\\). \\(\\text{R-OH} + \\text{SOCl}_2 \\to \\text{R-Cl} + \\text{SO}_2 + \\text{HCl}\\) (Darzen; gaseous by-products).\n" +
        "- Alkene + HX: Markovnikov — H to the carbon with more H, X to the more substituted carbon. 1-Methylcyclohexene + HBr → 1-bromo-1-methylcyclohexane (3° bromide); propene + HBr → 2-bromopropane. Peroxide reverses it for HBr only.\n" +
        "- Alkane + X₂ (light): free-radical substitution, a mixture.",
      formula: {
        label: "Alcohol to halide",
        latex:
          "\\text{R-OH} \\xrightarrow{\\text{HX / PCl}_5\\text{ / SOCl}_2} \\text{R-X};\\qquad \\text{alkene} + \\text{HX} \\xrightarrow{\\text{Markovnikov}} \\text{R-X}",
      },
      authoredExample: {
        prompt: "Name the product of 2-methylpropene with HBr, and identify Q in \\(\\text{R-OH} + \\text{Q} \\to \\text{R-Cl} + \\text{SO}_2 + \\text{HCl}\\).",
        steps: [
          "Markovnikov: Br to the tertiary carbon — 2-bromo-2-methylpropane. Gaseous by-products SO₂ + HCl mean thionyl chloride.",
        ],
        answer: "2-Bromo-2-methylpropane; \\(\\text{SOCl}_2\\)",
      },
      selfCheckExample: {
        prompt: "Which alkene gives 1-bromo-1-methylcyclohexane with HBr: 1-methylcyclohexene, 3-methylcyclohexene or 4-methylcyclohexene?",
        steps: [
          "Br must land on the methyl-bearing carbon, so that carbon must be in the double bond: 1-methylcyclohexene.",
        ],
        answer: "1-Methylcyclohexene",
      },
      practiceSet: [
        { prompt: "Q in \\(\\text{ROH} + \\text{Q} \\to \\text{RCl} + \\text{HCl} + \\text{POCl}_3\\)?", answer: "\\(\\text{PCl}_5\\)" },
        { prompt: "Alkene that gives 1-bromo-1-methylcyclohexane with HBr?", answer: "1-Methylcyclohexene" },
        { prompt: "Which alcohol class reacts fastest with HBr?", answer: "Tertiary" },
        { prompt: "By-products of SOCl₂ with an alcohol?", answer: "SO₂ and HCl" },
      ],
      pyqExampleId: "d0e2958f-783f-401e-9248-703658007e84",
      traps: [
        {
          title: "Adding HBr the wrong way round",
          body:
            "Without peroxide the H goes where the hydrogens already are. On 1-methylcyclohexene that puts Br on C1 with the methyl — the tertiary product — not on C2.",
        },
      ],
    },

    // 2 — halogen exchange
    {
      kind: "formula" as const,
      slug: "cethal-halogen-exchange",
      name: "Finkelstein and Swarts: Swapping the Halogen",
      intuition:
        "Two exchanges with names. Finkelstein: chloride or bromide + NaI in dry acetone gives the iodide, pushed by NaCl or NaBr precipitating out of acetone. Swarts: chloride or bromide + a metal fluoride (AgF, Hg₂F₂, CoF₂, SbF₃) gives the fluoride. Both keep the carbon skeleton — tert-butyl bromide + AgF is 2-fluoro-2-methylpropane.",
      definition:
        "- **Finkelstein**: \\(\\text{R-Cl} + \\text{NaI} \\xrightarrow{\\text{dry acetone}} \\text{R-I} + \\text{NaCl}\\downarrow\\) — alkyl IODIDES.\n" +
        "- **Swarts**: \\(\\text{R-Br} + \\text{AgF} \\to \\text{R-F} + \\text{AgBr}\\) — alkyl FLUORIDES (also Hg₂F₂, CoF₂, SbF₃).\n" +
        "- tert-Butyl bromide + AgF → 2-fluoro-2-methylpropane, skeleton unchanged.\n" +
        "- Fluorination of chloroform gives refrigerant-22, \\(\\text{CHClF}_2\\): \\(\\text{CHCl}_3 \\xrightarrow{\\text{SbF}_3} \\text{CHClF}_2\\).",
      formula: {
        label: "The two exchanges",
        latex:
          "\\text{Finkelstein: R-X} + \\text{NaI} \\to \\text{R-I};\\qquad \\text{Swarts: R-X} + \\text{AgF} \\to \\text{R-F}",
      },
      authoredExample: {
        prompt: "How would you convert 1-chloropropane into 1-iodopropane, and into 1-fluoropropane?",
        steps: [
          "NaI in dry acetone (Finkelstein) for the iodide; AgF or Hg₂F₂ (Swarts) for the fluoride.",
        ],
        answer: "Finkelstein with NaI/acetone; Swarts with AgF",
      },
      selfCheckExample: {
        prompt: "Name the reaction and the product when 2-bromobutane is heated with silver fluoride.",
        steps: [
          "Swarts; 2-fluorobutane.",
        ],
        answer: "Swarts reaction; 2-fluorobutane",
      },
      practiceSet: [
        { prompt: "Finkelstein reaction gives alkyl?", answer: "Iodides" },
        { prompt: "Swarts reaction gives alkyl?", answer: "Fluorides" },
        { prompt: "tert-Butyl bromide + AgF: product?", answer: "2-Fluoro-2-methylpropane" },
        { prompt: "Refrigerant-22 is made from?", answer: "Trichloromethane (chloroform)" },
      ],
      pyqExampleId: "fcb074ff-b5e8-4cf6-8c66-15ff2c3c7c4c",
      traps: [
        {
          title: "Swapping the two names",
          body:
            "Finkelstein — Iodide (NaI). Swarts — Fluoride (AgF). The pairing is asked more often than either reaction, and always with both names as options.",
        },
      ],
    },

    // 3 — Wurtz and Fittig
    {
      kind: "formula" as const,
      slug: "cethal-wurtz-and-fittig",
      name: "Wurtz, Fittig and Wurtz–Fittig Coupling",
      intuition:
        "Sodium in dry ether pulls the halogens off two molecules and joins the carbons. Two alkyl halides — Wurtz, an alkane with an even carbon count. Two aryl halides — Fittig, a biaryl. One of each — Wurtz–Fittig, an alkylbenzene. A MIXTURE of two alkyl halides gives three alkanes, never one with more carbons than the two combined.",
      definition:
        "- **Wurtz**: \\(2\\text{R-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{R-R} + 2\\text{NaX}\\). tert-Butyl bromide → 2,2,3,3-tetramethylbutane.\n" +
        "- Mixture CH₃Br + C₂H₅Br: ethane, propane, butane — NOT pentane.\n" +
        "- **Fittig**: \\(2\\text{C}_6\\text{H}_5\\text{Cl} + 2\\text{Na} \\to \\text{C}_6\\text{H}_5\\text{-C}_6\\text{H}_5\\) (biphenyl).\n" +
        "- **Wurtz–Fittig**: \\(\\text{C}_6\\text{H}_5\\text{Br} + \\text{CH}_3\\text{Br} + 2\\text{Na} \\to \\text{C}_6\\text{H}_5\\text{CH}_3\\) (toluene).\n" +
        "- Wurtz fails for methyl (no C₂ from one carbon... it gives ethane) and gives poor yields with tertiary halides (elimination competes).",
      formula: {
        label: "Sodium coupling",
        latex:
          "\\text{R-X} + \\text{R'-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{R-R'} + 2\\text{NaX}",
      },
      authoredExample: {
        prompt: "Which halide gives 2,3-dimethylbutane by the Wurtz reaction, and what does bromobenzene with ethyl bromide and sodium give?",
        steps: [
          "2,3-Dimethylbutane is two isopropyls joined: 2-bromopropane. Aryl + alkyl + Na: ethylbenzene (Wurtz–Fittig).",
        ],
        answer: "2-Bromopropane; ethylbenzene",
      },
      selfCheckExample: {
        prompt: "Sodium in dry ether is added to a mixture of ethyl bromide and propyl bromide. Name the alkanes formed.",
        steps: [
          "Ethyl–ethyl: butane; ethyl–propyl: pentane; propyl–propyl: hexane.",
        ],
        answer: "Butane, pentane, hexane",
      },
      practiceSet: [
        { prompt: "Halide that gives 2,2,3,3-tetramethylbutane with Na?", answer: "tert-Butyl bromide" },
        { prompt: "NOT formed from CH₃Br + C₂H₅Br + Na?", answer: "Pentane" },
        { prompt: "Two aryl halides + Na → biaryl is the?", answer: "Fittig reaction" },
        { prompt: "Bromobenzene + bromomethane + Na → toluene is the?", answer: "Wurtz–Fittig reaction" },
      ],
      pyqExampleId: "be4e5cb5-fc7f-47be-ae03-33e4d4f60346",
      traps: [
        {
          title: "Calling the aryl + alkyl coupling 'Fittig'",
          body:
            "Fittig needs TWO aryl halides and gives a biaryl. Aryl + alkyl is Wurtz–Fittig. The 2025 papers printed the name as 'Wurtzilite'; the intended reaction is the same.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Classification — which product class each preparation gives",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties",
    },
    {
      label: "Nucleophilic Substitution — Finkelstein and Swarts are SN reactions",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-nucleophilic-substitution",
    },
  ],
};
