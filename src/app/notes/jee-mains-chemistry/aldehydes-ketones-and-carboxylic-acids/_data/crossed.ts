import type { SubtopicNote } from "@/app/notes/_types";

export const CROSSED_ALD_NOTE: SubtopicNote = {
  subtopicName: "Crossed Aldol and Cannizzaro Reactions",
  title: "Crossed Aldol and Cannizzaro Reactions",
  oneLineDefinition:
    "Two different carbonyl compounds give a mixture of aldol products unless one of them has no α-hydrogen; an aldehyde with no α-hydrogen in concentrated alkali disproportionates instead, in the Cannizzaro reaction.",
  whyItMatters:
    "Seventeen PYQs, three numerical, five from 2026. Nine mix two carbonyl partners and ask which products form, or how many; eight use the Cannizzaro reaction of an aldehyde with no α-hydrogen, alone or after an aldol step.",
  concepts: [
    // C1 — crossed aldol
    {
      kind: "formula" as const,
      slug: "jcald-crossed-aldol",
      name: "Crossed aldol: counting and naming the products",
      intuition:
        "Every partner that has an α-hydrogen can act as the enolate, and every partner can be attacked. So count the possible pairs: each enolate with each carbonyl group. A partner with no α-hydrogen can only be attacked, which cuts the mixture down.",
      definition:
        "- Two different aldehydes that both have α-hydrogens give four aldol products: two self and two crossed. The count assumes each partner has only one kind of α-carbon.\n" +
        "- If one partner has no α-hydrogen (an aromatic aldehyde, methanal, 2,2-dimethylpropanal), there is only one enolate, and it gives two products. Using the non-enolisable partner in excess makes the crossed product the main one.\n" +
        "- **Claisen–Schmidt condensation**: an aromatic aldehyde with an aldehyde or ketone that has α-hydrogens, in NaOH. Benzaldehyde and acetophenone give chalcone, \\(\\mathrm{C_6H_5CH{=}CHCOC_6H_5}\\); two benzaldehydes and one propanone give dibenzalacetone, \\(\\mathrm{C_6H_5CH{=}CHCOCH{=}CHC_6H_5}\\).\n" +
        "- Methanal is the best acceptor. With \\(\\mathrm{R_2CHCHO}\\) it adds once and stops at \\(\\mathrm{HOCH_2CR_2CHO}\\), which has no α-hydrogen left. With excess methanal, every α-hydrogen is replaced by \\(\\mathrm{CH_2OH}\\) and a crossed Cannizzaro step then reduces the CHO: ethanal and four methanal give pentaerythritol, \\(\\mathrm{C(CH_2OH)_4}\\).\n" +
        "- An aldehyde with no α-hydrogen, such as vanillin, cannot undergo self-aldol condensation.",
      formula: {
        label: "Number of aldol products (ignoring stereoisomers)",
        latex:
          "N = (\\text{partners with an }\\alpha\\text{-H}) \\times (\\text{all partners})",
      },
      authoredExample: {
        prompt: "Name every aldol condensation product, ignoring stereoisomers, from a mixture of ethanal and butanal with dilute NaOH and heat.",
        steps: [
          "Both have α-hydrogens, so there are two enolates and two acceptors: four products.",
          "Ethanal with ethanal: but-2-enal. Butanal with butanal: 2-ethylhex-2-enal.",
          "Ethanal enolate on butanal: \\(\\mathrm{CH_3CH_2CH_2CH{=}CHCHO}\\), hex-2-enal.",
          "Butanal enolate on ethanal: \\(\\mathrm{CH_3CH{=}C(C_2H_5)CHO}\\), 2-ethylbut-2-enal.",
        ],
        answer: "Four: but-2-enal, 2-ethylhex-2-enal, hex-2-enal and 2-ethylbut-2-enal",
      },
      selfCheckExample: {
        prompt: "Benzaldehyde and cyclohexanone (one mole each) are heated with NaOH. How many aldol condensation products can form, and which is the crossed one?",
        steps: [
          "Only cyclohexanone has α-hydrogens, so there is one enolate.",
          "It can attack benzaldehyde or another cyclohexanone: two products.",
          "The crossed product has the benzylidene group on the α-carbon, conjugated with the C=O.",
        ],
        answer: "Two; the crossed product is 2-benzylidenecyclohexan-1-one (the other is 2-cyclohexylidenecyclohexan-1-one)",
      },
      practiceSet: [
        { prompt: "What does benzaldehyde give with ethanal in NaOH on heating?", answer: "Cinnamaldehyde, \\(\\mathrm{C_6H_5CH{=}CHCHO}\\)" },
        { prompt: "Does a crossed aldol between two aldehydes always give four products?", answer: "No: only when both have α-hydrogens" },
        { prompt: "How many aldol products do methanal and benzaldehyde give?", answer: "None: neither has an α-hydrogen" },
        { prompt: "What does 2-methylpropanal give with one mole of methanal and \\(\\mathrm{K_2CO_3}\\)?", answer: "3-Hydroxy-2,2-dimethylpropanal, \\(\\mathrm{HOCH_2C(CH_3)_2CHO}\\)" },
      ],
      pyqExampleId: "7c4b3f1e-e526-4461-98e6-515e9614a382", // 2026 — two aldehydes from a nitrile and an ozonolysis; which product does not form
      traps: [
        {
          title: "Name each crossed product by which partner is the enolate",
          body: "The enolate supplies the α-carbon, and the acceptor supplies the carbon that ends up doubly bonded to it. Swapping roles gives a different product, so write both crossed pairs separately.",
        },
        {
          title: "A partner with no α-hydrogen is never the enolate",
          body: "Aromatic aldehydes and methanal can only be attacked. Any option that needs them as the enolate is not formed.",
        },
      ],
    },

    // C2 — Cannizzaro
    {
      kind: "formula" as const,
      slug: "jcald-cannizzaro",
      name: "Cannizzaro reaction",
      intuition:
        "An aldehyde with no α-hydrogen cannot form an enolate. In concentrated alkali, hydroxide adds to one molecule, and that adduct hands a hydride from its carbon to a second molecule. One aldehyde is oxidised to the carboxylate, the other reduced to the alcohol.",
      definition:
        "- Needs an aldehyde with **no α-hydrogen** (methanal, aromatic aldehydes, \\(\\mathrm{R_3CCHO}\\)) and **concentrated** alkali, such as 50% KOH.\n" +
        "- It is a disproportionation: \\(\\mathrm{2\\,ArCHO \\to ArCOO^- + ArCH_2OH}\\).\n" +
        "- **Crossed Cannizzaro** with methanal: methanal is attacked first and is oxidised to methanoate; the other aldehyde is reduced to its alcohol.\n" +
        "- The hydride moves from carbon to carbon, not from the solvent. In NaOD and \\(\\mathrm{D_2O}\\), the \\(\\mathrm{CH_2}\\) of the alcohol carries no deuterium; D appears only on oxygen.\n" +
        "- A dialdehyde can react within one molecule: glyoxal, OHC–CHO, gives glycolate, \\(\\mathrm{HOCH_2COO^-}\\).",
      formula: {
        label: "Cannizzaro and crossed Cannizzaro",
        latex:
          "\\mathrm{2\\,ArCHO \\xrightarrow{conc.\\ OH^-} ArCOO^- + ArCH_2OH} \\qquad \\mathrm{HCHO + ArCHO \\xrightarrow{conc.\\ OH^-} HCOO^- + ArCH_2OH}",
      },
      authoredExample: {
        prompt: "4-Chlorobenzaldehyde is heated with methanal and concentrated NaOH. Give the products.",
        steps: [
          "Neither aldehyde has an α-hydrogen, so no aldol reaction is possible.",
          "Methanal is attacked by hydroxide more easily, so it becomes the hydride donor and is oxidised.",
          "4-Chlorobenzaldehyde takes the hydride and is reduced.",
        ],
        answer: "Sodium methanoate, \\(\\mathrm{HCOONa}\\), and 4-chlorobenzyl alcohol, \\(\\mathrm{ClC_6H_4CH_2OH}\\)",
      },
      selfCheckExample: {
        prompt: "Furan-2-carbaldehyde (furfural) is heated alone with concentrated NaOH. Give the products.",
        steps: [
          "The CHO is attached to a ring carbon that carries no hydrogen, so there is no α-hydrogen.",
          "Two molecules disproportionate: one is oxidised, one is reduced.",
        ],
        answer: "Sodium furan-2-carboxylate and furan-2-ylmethanol (furfuryl alcohol)",
      },
      practiceSet: [
        { prompt: "What does 2,2-dimethylpropanal give with concentrated NaOH?", answer: "2,2-Dimethylpropanoate and 2,2-dimethylpropan-1-ol" },
        { prompt: "Does ethanal undergo the Cannizzaro reaction?", answer: "No: it has α-hydrogens and gives an aldol instead" },
        { prompt: "What does methanal give alone with concentrated NaOH?", answer: "Sodium methanoate and methanol" },
        { prompt: "In the crossed Cannizzaro reaction of methanal with benzaldehyde, which one is oxidised?", answer: "Methanal, to methanoate" },
      ],
      pyqExampleId: "7f7c0c87-1233-42b8-a669-18e983ccd7d1", // 2026 — C8H8O2 aldehyde: single crossed-aldol product and a Cannizzaro alcohol
      traps: [
        {
          title: "Concentrated alkali, not dilute",
          body: "Dilute base with an aldehyde that has α-hydrogens gives an aldol. The Cannizzaro reaction needs concentrated alkali and an aldehyde with no α-hydrogen.",
        },
        {
          title: "The transferred hydrogen comes from carbon",
          body: "Run in \\(\\mathrm{D_2O}\\) with NaOD, the alcohol is \\(\\mathrm{ArCH_2OD}\\): the \\(\\mathrm{CH_2}\\) keeps both hydrogens, because the hydride came from the other aldehyde, not from the solvent.",
        },
      ],
    },
  ],
};
