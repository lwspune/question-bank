import type { SubtopicNote } from "@/app/notes/_types";

export const REDOX_AND_TESTS_NOTE: SubtopicNote = {
  subtopicName: "Oxidation, Reduction and Identification Tests",
  title: "Oxidation, Reduction and Identification Tests",
  oneLineDefinition:
    "A carbonyl is reduced to CH₂ by Clemmensen (Zn–Hg/conc. HCl) or Wolff–Kishner (hydrazine, then KOH in ethylene glycol), to the alcohol by LiAlH₄; aldehydes alone are oxidised by Tollens and Fehling and turn Schiff's reagent pink, and methyl ketones and ethanal give the haloform reaction.",
  whyItMatters:
    "21 PYQs, 1 HARD. Twelve are the two carbonyl-to-methylene reductions — name from reagent, reagent from name, the propiophenone → n-propylbenzene product — plus LiAlH₄ leaving a C=C alone; nine are the tests — Tollens' silver mirror with ethanal, Schiff's magenta, why aldehydes oxidise and ketones do not, which compound lacks the CH₃CO group for the haloform reaction. " +
    "Two cards.",
  concepts: [
    // 1 — reductions
    {
      kind: "formula" as const,
      slug: "cetald-clemmensen-wolff-kishner-and-hydride",
      name: "Clemmensen, Wolff–Kishner and Hydride Reductions",
      intuition:
        "Two reactions take C=O all the way to CH₂: Clemmensen in ACID (zinc amalgam, concentrated HCl) and Wolff–Kishner in BASE (hydrazine first, then KOH in hot ethylene glycol). Choose by what else the molecule tolerates. Hydride reagents stop at the alcohol: LiAlH₄ and NaBH₄ reduce C=O but leave an isolated C=C untouched.",
      definition:
        "- **Clemmensen**: \\(\\text{RCHO} \\xrightarrow{\\text{Zn-Hg / conc. HCl}} \\text{RCH}_3\\); \\(\\text{RCOR'} \\to \\text{RCH}_2\\text{R'}\\). Acidic.\n" +
        "- **Wolff–Kishner**: \\(\\text{RCOR'} \\xrightarrow{\\text{NH}_2\\text{NH}_2} \\text{hydrazone} \\xrightarrow{\\text{KOH},\\ (\\text{HOCH}_2)_2,\\ \\Delta} \\text{RCH}_2\\text{R'} + \\text{N}_2\\). Basic. Ethyl phenyl ketone → **n-propylbenzene** (all three side-chain carbons kept).\n" +
        "- **LiAlH₄ / NaBH₄**: C=O → CH–OH only. \\(\\text{CH}_3\\text{CH=CHCH}_2\\text{CHO} \\to \\text{CH}_3\\text{CH=CHCH}_2\\text{CH}_2\\text{OH}\\); the C=C stays.\n" +
        "- Reagent ↔ name: Stephen SnCl₂/HCl · Etard CrO₂Cl₂ · Rosenmund H₂/Pd–BaSO₄ · Gattermann–Koch CO/HCl/AlCl₃ (NOT CrO₃/Ac₂O).",
      formula: {
        label: "C=O to CH₂",
        latex:
          "\\text{Clemmensen: Zn-Hg / conc. HCl};\\qquad \\text{Wolff–Kishner: NH}_2\\text{NH}_2 \\text{ then KOH / ethylene glycol}",
      },
      authoredExample: {
        prompt: "Convert acetophenone into ethylbenzene by two different named reductions, and say what NaBH₄ would give instead.",
        steps: [
          "Clemmensen (Zn–Hg/HCl) or Wolff–Kishner (N₂H₄, then KOH/glycol) both give ethylbenzene. NaBH₄ stops at 1-phenylethanol.",
        ],
        answer: "Clemmensen or Wolff–Kishner → ethylbenzene; NaBH₄ → 1-phenylethanol",
      },
      selfCheckExample: {
        prompt: "Ethyl phenyl ketone → (N₂H₄) A → (KOH, ethylene glycol, Δ) B. Name A and B.",
        steps: [
          "A is the hydrazone; B keeps three carbons on the ring: n-propylbenzene.",
        ],
        answer: "Hydrazone; n-propylbenzene",
      },
      practiceSet: [
        { prompt: "Reagent of the Clemmensen reduction?", answer: "Zn–Hg / conc. HCl" },
        { prompt: "Hydrazine then NaOH in ethylene glycol is which reduction?", answer: "Wolff–Kishner" },
        { prompt: "\\(\\text{CH}_3\\text{CH=CHCH}_2\\text{CHO}\\) + LiAlH₄ gives?", answer: "\\(\\text{CH}_3\\text{CH=CHCH}_2\\text{CH}_2\\text{OH}\\)" },
        { prompt: "Which reagent pairing is wrong: Gattermann–Koch with CrO₃/Ac₂O, or Etard with CrO₂Cl₂?", answer: "Gattermann–Koch with CrO₃/Ac₂O" },
      ],
      pyqExampleId: "4325b452-cd3f-409c-ad5b-6e3924d6db19",
      traps: [
        {
          title: "Losing a carbon in Wolff–Kishner",
          body:
            "The reduction replaces O by two H and changes nothing else. Propiophenone (three side-chain carbons) gives n-PROPYLbenzene; 'ethylbenzene' is the planted option.",
        },
      ],
    },

    // 2 — oxidation and tests
    {
      kind: "formula" as const,
      slug: "cetald-oxidation-and-tests",
      name: "Tollens, Fehling, Schiff and the Haloform Test",
      intuition:
        "An aldehyde carries a hydrogen on its carbonyl carbon that an oxidant can take, so mild oxidants convert it to the acid; a ketone has no such hydrogen and resists. Tollens' reagent (ammoniacal AgNO₃) is reduced to a silver mirror, Fehling's to red Cu₂O, Schiff's reagent turns magenta — all by aldehydes only. The haloform (iodoform) reaction is different: it needs a CH₃CO– group, so ethanal and methyl ketones give it, propanal does not.",
      definition:
        "- **Tollens' test**: ammoniacal AgNO₃ + aldehyde, boiled → silver mirror. Ethanal yes; ethanol, ethoxyethane, ethanoic acid no.\n" +
        "- **Fehling's test**: aldehydes (aliphatic) → red Cu₂O. **Schiff's test**: aldehydes restore the **magenta/pink** colour of decolourised fuchsin; ketones do not.\n" +
        "- Why: aldehydes have the abstractable C–H on the carbonyl carbon; ketones lack it.\n" +
        "- **Haloform**: needs \\(\\text{CH}_3\\text{CO-}\\) (or CH₃CH(OH)–): ethanal, propanone, butanone give CHI₃; **propanal does not**.\n" +
        "- Strong oxidants: alkaline KMnO₄ takes ethylbenzene (any side chain) to benzoic acid; cyclohexene with acidic KMnO₄ opens to adipic acid.",
      formula: {
        label: "Tollens' reaction",
        latex:
          "\\text{RCHO} + 2[\\text{Ag(NH}_3)_2]^+ + 3\\text{OH}^- \\to \\text{RCOO}^- + 2\\text{Ag}\\downarrow + 4\\text{NH}_3 + 2\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Three liquids are propanal, propanone and propan-1-ol. Assign a test that identifies each.",
        steps: [
          "Tollens or Schiff: only propanal responds. Iodoform: propanone gives CHI₃, propanal and propan-1-ol do not. The remaining liquid is propan-1-ol (confirm with Lucas — no turbidity).",
        ],
        answer: "Propanal — Tollens/Schiff; propanone — iodoform; propan-1-ol — neither",
      },
      selfCheckExample: {
        prompt: "Which does NOT give the haloform reaction: ethanal, propanal, propanone, butanone?",
        steps: [
          "No CH₃CO– group in propanal.",
        ],
        answer: "Propanal",
      },
      practiceSet: [
        { prompt: "Silver mirror with ammoniacal AgNO₃: ethanol, ethanal, ethoxyethane or ethanoic acid?", answer: "Ethanal" },
        { prompt: "Colour of a positive Schiff's test?", answer: "Magenta (pink)" },
        { prompt: "Why do ketones resist oxidation?", answer: "No H on the carbonyl carbon" },
        { prompt: "Ethylbenzene + alkaline KMnO₄, then acid, gives?", answer: "Benzoic acid" },
      ],
      pyqExampleId: "94f5f1a7-418c-4153-aff1-16b1731f5651",
      traps: [
        {
          title: "Expecting the haloform reaction from every carbonyl",
          body:
            "It is a test for the CH₃CO– fragment, not for carbonyls in general. Ethanal passes; propanal, one carbon longer on the wrong side, fails.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Preparation — Rosenmund and Stephen, the aldehyde-making reductions",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-preparation",
    },
    {
      label: "Carboxylic Acids — what Tollens oxidises the aldehyde to",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-carboxylic-acids",
    },
  ],
};
