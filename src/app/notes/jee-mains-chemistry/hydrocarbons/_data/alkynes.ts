import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const ALKYNES_HC_NOTE: SubtopicNote = {
  subtopicName: "Alkynes: Preparation, Acidity, Reduction and Addition",
  title: "Alkynes: Preparation, Acidity, Reduction and Addition",
  oneLineDefinition:
    "Alkynes are made by removing two HX from a dihalide; a terminal alkyne's C–H is acidic enough to give an acetylide, which builds longer chains; H₂ with Lindlar's catalyst gives the cis alkene and Na in liquid NH₃ the trans; water adds with Hg²⁺ to give a ketone.",
  whyItMatters:
    "Twenty PYQs, seventeen of them multiple choice, and five from 2026. Six are about making alkynes and the acidity of the terminal H: sodium or sodamide, the gas released and the chain built from an acetylide. Eight are about reducing alkynes to cis or trans alkenes, or turning one alkene isomer into the other. Six follow additions to the triple bond: bromine, water with Hg²⁺, ozone, and cyclisation to an arene.",
  concepts: [
    // C1 — preparation and acidity
    {
      kind: "formula" as const,
      slug: "jchc-alkyne-acidity",
      name: "Making alkynes and using the acidic terminal H",
      intuition:
        "Two eliminations of HX from a vicinal or geminal dihalide give a triple bond; the first needs alcoholic KOH, the second a stronger base, NaNH₂. The H on a triple-bonded carbon sits on an sp carbon with 50% s-character, so the C–H bond gives up H⁺ to Na or NaNH₂. The acetylide ion formed is a strong nucleophile: with a primary alkyl halide it forms a new C–C bond, which lengthens the chain.",
      definition:
        "- **Preparation**: \\(\\mathrm{R{-}CHBr{-}CH_2Br \\xrightarrow{alc.\\ KOH} R{-}CBr{=}CH_2 \\xrightarrow{NaNH_2} R{-}C{\\equiv}CH}\\). Alcoholic KOH alone stops at the vinyl halide.\n" +
        "- **Acidity**: \\(\\mathrm{HC{\\equiv}CH > H_2C{=}CH_2 > H_3C{-}CH_3}\\). Only a terminal alkyne (\\(\\mathrm{R{-}C{\\equiv}C{-}H}\\)) reacts; but-2-yne has no acidic H.\n" +
        "- With Na: 2 mol alkyne give 1 mol H₂. With NaNH₂: 1 mol alkyne gives 1 mol NH₃. Moles of gas × 22.4 L gives the volume at STP.\n" +
        "- **Chain building**: \\(\\mathrm{R{-}C{\\equiv}C^-Na^+ + R'{-}X \\rightarrow R{-}C{\\equiv}C{-}R' + NaX}\\), best with a primary R'X.\n" +
        "- Terminal alkynes give a white precipitate with ammoniacal AgNO₃ and a red one with ammoniacal Cu₂Cl₂.",
      formula: {
        label: "Acidic terminal H",
        latex: "\\mathrm{2R{-}C{\\equiv}CH + 2Na \\rightarrow 2R{-}C{\\equiv}C^-Na^+ + H_2}\\qquad \\mathrm{R{-}C{\\equiv}CH + NaNH_2 \\rightarrow R{-}C{\\equiv}C^-Na^+ + NH_3}",
      },
      authoredExample: {
        prompt: "2.7 g of but-1-yne (M = 54) is treated separately with excess Na and with excess NaNH₂. What volume of gas at STP does each give?",
        steps: [
          "Moles of but-1-yne \\(= 2.7/54 = 0.05\\). It has one acidic H.",
          "With Na: 0.05 mol alkyne gives \\(0.05/2 = 0.025\\) mol H₂ \\(= 0.025 \\times 22400 = 560\\) mL.",
          "With NaNH₂: 0.05 mol gives 0.05 mol NH₃ \\(= 1120\\) mL.",
        ],
        answer: "560 mL of H₂; 1120 mL of NH₃.",
      },
      selfCheckExample: {
        prompt: "Sodium propynide is treated with bromoethane. Name the product.",
        steps: [
          "\\(\\mathrm{CH_3{-}C{\\equiv}C^-}\\) displaces Br⁻ from \\(\\mathrm{CH_3CH_2Br}\\).",
          "The product is \\(\\mathrm{CH_3{-}C{\\equiv}C{-}CH_2CH_3}\\).",
        ],
        answer: "Pent-2-yne",
      },
      practiceSet: [
        { prompt: "Which gives a white precipitate with ammoniacal AgNO₃: but-1-yne or but-2-yne?", answer: "But-1-yne" },
        { prompt: "What does 1,2-dibromopropane give with excess NaNH₂?", answer: "Propyne (as its sodium salt, until water is added)" },
        { prompt: "What does 1,2-dibromopropane give with alcoholic KOH alone?", answer: "A bromopropene (the vinyl bromide)" },
        { prompt: "Arrange by acidity: ethane, ethene, ethyne.", answer: "Ethyne > ethene > ethane" },
      ],
      pyqExampleId: "45073f1a-dbff-42c7-b047-86ef563a336f", // 2025 — propyne with Na and with NaNH2, gas volumes
      traps: [
        {
          title: "Na gives half a mole of H₂ per acidic H",
          body: "Two acidic hydrogens make one H₂ molecule, so one mole of a terminal alkyne gives half a mole of H₂. NaNH₂ gives one NH₃ for every H removed.",
        },
        {
          title: "Convert moles to millilitres carefully",
          body: "One mole of gas is 22,400 mL at STP. 0.1 mol is 2240 mL, not 224 mL; a slip of ten is a common wrong option.",
        },
        {
          title: "Only a terminal alkyne has the acidic H",
          body: "An internal alkyne such as but-2-yne has no H on a triple-bonded carbon, so it gives no acetylide, no H₂ with Na and no silver precipitate.",
        },
      ],
    },

    // C2 — reduction
    {
      kind: "reference" as const,
      slug: "jchc-alkyne-reduction",
      name: "Reducing alkynes to cis or trans alkenes",
      intuition:
        "The catalyst decides the geometry. On a metal surface both H atoms arrive from the same side, so a partly poisoned catalyst that stops at the alkene gives the cis isomer. Sodium in liquid ammonia adds one electron and one proton at a time, and the intermediate settles with its groups apart, so the trans isomer forms. With an active catalyst and excess H₂, the reduction runs on to the alkane.",
      definition:
        "- **Lindlar's catalyst**: Pd on CaCO₃ (or BaSO₄) poisoned with lead acetate or quinoline. H₂ adds syn: cis-alkene.\n" +
        "- **Na in liquid NH₃** (Birch-type): trans-alkene.\n" +
        "- **Excess H₂ with Pt, Pd or Ni**: alkane.\n" +
        "- cis isomers are polar and boil higher (cis-but-2-ene 277 K, trans 274 K); trans isomers are non-polar or less polar and pack better, so they melt higher.\n" +
        "- To turn a trans alkene into the cis one: Br₂, then alcoholic KOH and NaNH₂ (back to the alkyne), then H₂ with Lindlar's catalyst.",
      table: {
        columns: ["Reagent", "How H adds", "Product from pent-2-yne", "Dipole of product"],
        rows: [
          { cells: ["H₂, Lindlar's catalyst", "Syn, stops at the alkene", "cis-Pent-2-ene", "Non-zero"] },
          { cells: ["Na in liquid NH₃", "Anti, stepwise", "trans-Pent-2-ene", "Close to zero"] },
          { cells: ["Excess H₂, Pt or Ni", "Syn, twice", "Pentane", "Close to zero"] },
        ],
        caption: "Lindlar gives cis, sodium in ammonia gives trans, and an unpoisoned catalyst with excess H₂ goes to the alkane.",
      },
      selfCheckExample: {
        prompt: "What does hex-3-yne give with sodium in liquid ammonia?",
        steps: [
          "Na in liquid NH₃ reduces an internal alkyne to the trans alkene.",
          "The two ethyl groups end up on opposite sides of the C=C.",
        ],
        answer: "trans-Hex-3-ene",
      },
      practiceSet: [
        { prompt: "What is Lindlar's catalyst?", answer: "Pd on CaCO₃ (or BaSO₄) poisoned with lead acetate or quinoline" },
        { prompt: "Which has the higher boiling point, cis- or trans-but-2-ene?", answer: "cis (it is polar)" },
        { prompt: "Do cis- and trans-but-2-ene give the same ozonolysis product?", answer: "Yes, ethanal" },
        { prompt: "What does but-2-yne give with one mole of H₂ over a Lindlar catalyst?", answer: "cis-But-2-ene" },
      ],
      pyqExampleId: "c93421ce-738c-46e4-a0e6-52b7bf591ffd", // 2023 — reagents to turn trans-1-phenylpropene into the cis isomer
      traps: [
        {
          title: "Aqueous KOH substitutes, alcoholic KOH eliminates",
          body: "To return a dibromide to the alkyne you need alcoholic KOH (then NaNH₂). Aqueous KOH replaces Br by OH and gives a diol, which cannot become an alkyne.",
        },
        {
          title: "The cis isomer is the more polar one",
          body: "In the cis isomer the two C–R bond dipoles add; in the trans isomer they cancel. So cis boils higher and dissolves better in polar solvents, while trans melts higher.",
        },
      ],
    },

    // C3 — addition to alkynes
    {
      kind: "formula" as const,
      slug: "jchc-alkyne-addition",
      name: "Adding water, halogens and ozone to alkynes",
      intuition:
        "A triple bond can add two molecules of a reagent. Water adds once, with Hg²⁺ and dilute acid as catalysts, to give an enol, which at once becomes the carbonyl form. By Markovnikov's rule the OH goes to the inner carbon, so every alkyne except ethyne gives a ketone, and a terminal alkyne gives a methyl ketone. Bromine adds twice, to a tetrabromide. Three ethyne molecules can also join into a benzene ring in a red-hot iron tube.",
      definition:
        "- **Hydration**: HgSO₄, dil. H₂SO₄, 333 K. Ethyne → ethanal; R–C≡CH → R–CO–CH₃ (a methyl ketone: iodoform positive, Tollens negative).\n" +
        "- **Halogen**: \\(\\mathrm{R{-}C{\\equiv}CH + 2Br_2 \\rightarrow R{-}CBr_2{-}CHBr_2}\\).\n" +
        "- **HX**: two moles add, both Markovnikov, giving a geminal dihalide.\n" +
        "- **Ozonolysis**: C≡C is cut into two carboxylic acids (a terminal ≡CH gives HCOOH, which reduces Tollens' reagent).\n" +
        "- **Cyclic polymerisation**: \\(\\mathrm{3HC{\\equiv}CH \\xrightarrow{red\\text{-}hot\\ Fe,\\ 873\\,K} C_6H_6}\\); propyne gives 1,3,5-trimethylbenzene (mesitylene).",
      formula: {
        label: "Hydration of a terminal alkyne",
        latex: "\\mathrm{R{-}C{\\equiv}CH + H_2O \\xrightarrow{Hg^{2+},\\ H_2SO_4} [R{-}C(OH){=}CH_2] \\rightarrow R{-}CO{-}CH_3}",
      },
      authoredExample: {
        prompt: "Pent-1-yne is warmed with HgSO₄ and dilute H₂SO₄. Name the product and say whether it gives the iodoform test.",
        steps: [
          "OH goes to C-2 (Markovnikov), giving the enol \\(\\mathrm{CH_3CH_2CH_2{-}C(OH){=}CH_2}\\).",
          "The enol becomes the ketone \\(\\mathrm{CH_3CH_2CH_2{-}CO{-}CH_3}\\).",
          "It has a \\(\\mathrm{CH_3CO{-}}\\) group, so it gives the iodoform test.",
        ],
        answer: "Pentan-2-one; iodoform test positive.",
      },
      selfCheckExample: {
        prompt: "Which alkyne gives an aldehyde on hydration with HgSO₄ and dilute H₂SO₄?",
        steps: [
          "Markovnikov addition puts OH on the inner carbon, giving a ketone.",
          "Only ethyne has no inner carbon: both carbons carry an H, so the product is \\(\\mathrm{CH_3CHO}\\).",
        ],
        answer: "Ethyne",
      },
      practiceSet: [
        { prompt: "What does hex-3-yne give on hydration?", answer: "Hexan-3-one" },
        { prompt: "What does propyne give with excess HBr?", answer: "2,2-Dibromopropane" },
        { prompt: "What is the product when propyne is passed through a red-hot iron tube?", answer: "Mesitylene (1,3,5-trimethylbenzene)" },
        { prompt: "What does ozonolysis of pent-1-yne give?", answer: "Butanoic acid and methanoic acid" },
      ],
      pyqExampleId: "6c3ec028-a277-46e9-9b50-c9364165efae", // 2025 — alkyl halide → alkene → dibromide → alkyne → hydration
      traps: [
        {
          title: "An enol is not the final product",
          body: "Hydration first gives an enol, but the enol turns into the aldehyde or ketone at once. Options that show a vinyl alcohol as the product are wrong.",
        },
        {
          title: "A terminal alkyne gives a methyl ketone, not an aldehyde",
          body: "Markovnikov addition puts OH on C-2, so R–C≡CH gives R–CO–CH₃. Only ethyne gives an aldehyde.",
        },
      ],
    },
  ],
  related: [
    { label: "Halogen Addition, Oxidation and Ozonolysis of Alkenes", href: `${BASE}/jch-hc-oxidation` },
    { label: "Benzene and Aromaticity — what cyclic polymerisation of ethyne makes", href: `${BASE}/jch-hc-aromaticity` },
  ],
};
