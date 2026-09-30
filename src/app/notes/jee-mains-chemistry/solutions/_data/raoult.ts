import type { SubtopicNote } from "@/app/notes/_types";

export const RAOULT_SOL_NOTE: SubtopicNote = {
  subtopicName: "Raoult's Law for Volatile Liquids",
  title: "Raoult's Law for Volatile Liquids",
  oneLineDefinition:
    "In an ideal mixture of two volatile liquids each exerts x·p° and the total is their sum; the vapour is richer in the more volatile liquid, and real mixtures deviate above or below the ideal line.",
  whyItMatters:
    "Seventeen PYQs, twelve of them multiple choice, and five from 2026. Four find the total vapour pressure or a pure-liquid vapour pressure from two measured totals; seven move between the liquid and the vapour mole fractions; six ask which mixtures deviate from Raoult's law, in which direction and with which azeotrope.",
  concepts: [
    // C1 — total pressure
    {
      kind: "formula" as const,
      slug: "jcsol-total-pressure",
      name: "Total vapour pressure of an ideal mixture",
      intuition:
        "Each liquid escapes in proportion to its share of the surface, so liquid A contributes \\(x_A p^\\circ_A\\) and liquid B contributes \\(x_B p^\\circ_B\\). The total is a straight line from \\(p^\\circ_B\\) (pure B) to \\(p^\\circ_A\\) (pure A). Two measured totals at two compositions give two linear equations for the two unknown pure vapour pressures.",
      definition:
        "- Partial pressures: \\(p_A = x_A p^\\circ_A\\), \\(p_B = x_B p^\\circ_B\\).\n" +
        "- Total: \\(P = x_A p^\\circ_A + x_B p^\\circ_B = p^\\circ_B + (p^\\circ_A - p^\\circ_B)x_A\\).\n" +
        "- Mole fractions come from moles: adding moles of one liquid changes BOTH mole fractions.\n" +
        "- The liquid with the higher \\(p^\\circ\\) is the MORE volatile one.",
      formula: {
        label: "Raoult's law for two volatile liquids",
        latex: "P = x_A p^\\circ_A + x_B p^\\circ_B = p^\\circ_B + \\left(p^\\circ_A - p^\\circ_B\\right)x_A",
      },
      authoredExample: {
        prompt:
          "Liquids P and Q form an ideal solution. With \\(x_P = 0.4\\) the vapour pressure is 360 mmHg; with \\(x_P = 0.8\\) it is 440 mmHg. Find \\(p^\\circ_P\\) and \\(p^\\circ_Q\\).",
        steps: [
          "\\(0.4p^\\circ_P + 0.6p^\\circ_Q = 360\\) and \\(0.8p^\\circ_P + 0.2p^\\circ_Q = 440\\).",
          "Multiply the second by 3: \\(2.4p^\\circ_P + 0.6p^\\circ_Q = 1320\\). Subtract the first: \\(2p^\\circ_P = 960\\), so \\(p^\\circ_P = 480\\).",
          "\\(0.6p^\\circ_Q = 360 - 192 = 168\\), so \\(p^\\circ_Q = 280\\).",
          "Check: \\(0.8(480) + 0.2(280) = 384 + 56 = 440\\).",
        ],
        answer: "\\(p^\\circ_P = 480\\) mmHg, \\(p^\\circ_Q = 280\\) mmHg.",
      },
      selfCheckExample: {
        prompt:
          "2 mol of liquid A (\\(p^\\circ_A = 150\\) mmHg) are mixed with 3 mol of liquid B. The ideal solution has a vapour pressure of 330 mmHg. Find \\(p^\\circ_B\\) and name the less volatile liquid.",
        steps: [
          "\\(x_A = 0.4\\), \\(x_B = 0.6\\).",
          "\\(0.4(150) + 0.6p^\\circ_B = 330\\), so \\(0.6p^\\circ_B = 270\\) and \\(p^\\circ_B = 450\\).",
          "A has the lower pure vapour pressure, so A is less volatile.",
        ],
        answer: "\\(p^\\circ_B = 450\\) mmHg; A is the less volatile liquid.",
      },
      practiceSet: [
        { prompt: "An equimolar ideal mixture has \\(p^\\circ_A = 100\\) and \\(p^\\circ_B = 60\\) mmHg. Find the total vapour pressure.", answer: "\\(80\\) mmHg" },
        { prompt: "\\(p^\\circ_A = 200\\) and \\(p^\\circ_B = 400\\) mmHg. At what \\(x_A\\) is the total 250 mmHg?", answer: "\\(x_A = 0.75\\)" },
        { prompt: "1 mol of A is mixed with 4 mol of B. What is \\(x_A\\)?", answer: "\\(0.2\\)" },
        { prompt: "Plotted against \\(x_A\\), what shape is the total vapour pressure of an ideal mixture?", answer: "A straight line from \\(p^\\circ_B\\) to \\(p^\\circ_A\\)" },
      ],
      pyqExampleId: "ec75c24b-17a0-4201-b783-6b4420baf0bf", // 2026 — 3A + 1B, then one more mol of A
      traps: [
        {
          title: "Attach each mole fraction to its own liquid",
          body: "With 1 mol A and 3 mol B, \\(x_A = 0.25\\) multiplies \\(p^\\circ_A\\), not \\(p^\\circ_B\\). Swapping them gives a pure vapour pressure several times too large, and that value is always among the options.",
        },
        {
          title: "Higher pure vapour pressure means more volatile",
          body: "The liquid that escapes more easily has the larger \\(p^\\circ\\). A question that asks for the LEAST volatile component wants the one with the smaller \\(p^\\circ\\).",
        },
      ],
    },

    // C2 — vapour composition
    {
      kind: "formula" as const,
      slug: "jcsol-vapour-composition",
      name: "Composition of the vapour over an ideal mixture",
      intuition:
        "Raoult's law gives the partial pressures; Dalton's law turns them into vapour mole fractions, \\(y_A = p_A/P\\). The more volatile liquid pushes more molecules into the vapour, so the vapour is richer in it than the liquid is.",
      definition:
        "- \\(y_A = \\dfrac{x_A p^\\circ_A}{P}\\), \\(y_B = 1 - y_A\\).\n" +
        "- From the vapour side: \\(\\dfrac{1}{P} = \\dfrac{y_A}{p^\\circ_A} + \\dfrac{y_B}{p^\\circ_B}\\), then \\(x_A = \\dfrac{y_A P}{p^\\circ_A}\\).\n" +
        "- Dividing: \\(\\dfrac{y_A}{y_B} = \\dfrac{x_A}{x_B}\\cdot\\dfrac{p^\\circ_A}{p^\\circ_B}\\). If \\(p^\\circ_A < p^\\circ_B\\), then \\(\\dfrac{x_A}{x_B} > \\dfrac{y_A}{y_B}\\).\n" +
        "- Given \\(y_A\\) and \\(P\\): \\(p_A = y_A P\\) (Dalton) and \\(p^\\circ_A = p_A/x_A\\) (Raoult).\n" +
        "- Straight-line form: \\(\\dfrac{1}{x_1} = \\dfrac{p^\\circ_1}{p^\\circ_2}\\cdot\\dfrac{1}{y_1} + \\dfrac{p^\\circ_2 - p^\\circ_1}{p^\\circ_2}\\).",
      formula: {
        label: "Vapour mole fraction",
        latex: "y_A = \\frac{x_A p^\\circ_A}{P} \\qquad \\frac{1}{P} = \\frac{y_A}{p^\\circ_A} + \\frac{y_B}{p^\\circ_B}",
      },
      authoredExample: {
        prompt:
          "An ideal mixture has \\(x_A = 0.25\\), with \\(p^\\circ_A = 90\\) and \\(p^\\circ_B = 30\\) torr. Find the total pressure and the mole fraction of A in the vapour.",
        steps: [
          "\\(p_A = 0.25 \\times 90 = 22.5\\) torr; \\(p_B = 0.75 \\times 30 = 22.5\\) torr.",
          "\\(P = 45\\) torr.",
          "\\(y_A = 22.5/45 = 0.5\\). The vapour holds twice the liquid's share of A.",
        ],
        answer: "\\(P = 45\\) torr, \\(y_A = 0.5\\).",
      },
      selfCheckExample: {
        prompt:
          "For an ideal mixture \\(p^\\circ_A = 60\\) kPa and \\(p^\\circ_B = 20\\) kPa. The vapour in equilibrium with it has \\(y_A = 0.6\\). Find \\(x_A\\).",
        steps: [
          "\\(\\dfrac{1}{P} = \\dfrac{0.6}{60} + \\dfrac{0.4}{20} = 0.01 + 0.02 = 0.03\\), so \\(P = \\dfrac{100}{3}\\) kPa.",
          "\\(x_A = \\dfrac{y_A P}{p^\\circ_A} = \\dfrac{0.6 \\times 100/3}{60} = \\dfrac{1}{3}\\).",
          "Check: \\(p_A = 20\\), \\(p_B = \\tfrac{2}{3}\\times 20 = 13.3\\), \\(y_A = 20/33.3 = 0.6\\).",
        ],
        answer: "\\(x_A = 1/3 \\approx 0.33\\)",
      },
      practiceSet: [
        { prompt: "An equimolar ideal mixture has \\(p^\\circ_A = 60\\) and \\(p^\\circ_B = 20\\) torr. Find \\(y_A\\).", answer: "\\(0.75\\)" },
        { prompt: "Over a mixture \\(p_A = 12\\) torr and the total is 48 torr. Find \\(y_A\\).", answer: "\\(0.25\\)" },
        { prompt: "A vapour has \\(y_A = 0.4\\) at a total of 1 atm, and \\(p^\\circ_A = 2\\) atm. Find \\(x_A\\).", answer: "\\(0.2\\)" },
        { prompt: "If \\(p^\\circ_A < p^\\circ_B\\), is \\(x_A/x_B\\) larger or smaller than \\(y_A/y_B\\)?", answer: "Larger" },
      ],
      pyqExampleId: "15c83d7e-f8f4-432d-bfe5-f877ee70110e", // 2026 — liquid mole fraction from a given vapour mole fraction
      traps: [
        {
          title: "The vapour mole fraction needs the total pressure",
          body: "\\(y_A\\) is \\(x_A p^\\circ_A\\) divided by the TOTAL vapour pressure, not by \\(p^\\circ_A\\). Stopping at \\(x_A p^\\circ_A\\) gives a partial pressure, not a mole fraction.",
        },
        {
          title: "The vapour is richer in the more volatile liquid",
          body: "The liquid with the larger \\(p^\\circ\\) always has a bigger share in the vapour than in the liquid. An answer with the vapour poorer in that liquid has a slip in it.",
        },
      ],
    },

    // C3 — deviations and azeotropes
    {
      kind: "reference" as const,
      slug: "jcsol-deviations",
      name: "Positive and negative deviations from Raoult's law",
      intuition:
        "An ideal mixture has A–B attractions equal to the average of A–A and B–B. If the new A–B attractions are weaker, molecules escape more easily: the vapour pressure rises above the Raoult line (positive deviation). If they are stronger, often a new hydrogen bond, the vapour pressure falls below it (negative deviation).",
      definition:
        "- Ideal: \\(\\Delta H_{\\text{mix}} = 0\\), \\(\\Delta V_{\\text{mix}} = 0\\); obeys Raoult's law at every composition.\n" +
        "- Positive deviation: A–B weaker; \\(\\Delta H_{\\text{mix}} > 0\\), \\(\\Delta V_{\\text{mix}} > 0\\); higher vapour pressure, lower boiling point; forms a MINIMUM-boiling azeotrope.\n" +
        "- Negative deviation: A–B stronger; \\(\\Delta H_{\\text{mix}} < 0\\), \\(\\Delta V_{\\text{mix}} < 0\\); lower vapour pressure, higher boiling point; forms a MAXIMUM-boiling azeotrope.\n" +
        "- An azeotrope boils at constant composition: its vapour has the same composition as the liquid, so fractional distillation cannot separate it.",
      table: {
        columns: ["Mixture", "Deviation", "Reason", "Vapour pressure and boiling point"],
        rows: [
          { cells: ["Benzene + toluene", "None (ideal)", "Similar molecules, similar attractions", "On the Raoult line; \\(\\Delta V_{\\text{mix}} = 0\\)"] },
          { cells: ["n-Hexane + n-heptane", "None (ideal)", "Two similar non-polar chains", "On the Raoult line; \\(\\Delta H_{\\text{mix}} = 0\\)"] },
          { cells: ["Acetone + \\(\\mathrm{CS_2}\\)", "Positive", "\\(\\mathrm{CS_2}\\) breaks the dipole attraction between acetone molecules", "Vapour pressure above the line; boils lower"] },
          { cells: ["Ethanol + water", "Positive", "Ethanol breaks some of water's hydrogen bonds", "Minimum-boiling azeotrope, about 95% ethanol by volume"] },
          { cells: ["Methanol + \\(\\mathrm{CCl_4}\\)", "Positive", "\\(\\mathrm{CCl_4}\\) breaks the hydrogen bonds of methanol", "Vapour pressure above the line; boils lower"] },
          { cells: ["Chloroform + acetone", "Negative", "The C–H of chloroform hydrogen-bonds to the C=O of acetone", "Maximum-boiling azeotrope"], noteAmber: "The standard negative-deviation pair; the answer to 'maximum-boiling azeotrope'." },
          { cells: ["Acetone + aniline", "Negative", "The N–H of aniline hydrogen-bonds to the C=O of acetone", "Vapour pressure below the line; boils higher"] },
          { cells: ["Nitric acid + water", "Negative", "Strong attraction between the acid and water", "Maximum-boiling azeotrope, about 68% nitric acid by mass"] },
        ],
        caption: "A new hydrogen bond between the two liquids means a negative deviation; broken attractions within one liquid mean a positive one.",
      },
      selfCheckExample: {
        prompt: "Which of these forms a maximum-boiling azeotrope: ethanol + water, chloroform + acetone, or benzene + toluene?",
        steps: [
          "A maximum-boiling azeotrope needs a negative deviation, so a stronger A–B attraction.",
          "Chloroform and acetone form a new hydrogen bond; ethanol + water deviates positively; benzene + toluene is ideal.",
        ],
        answer: "Chloroform + acetone",
      },
      practiceSet: [
        { prompt: "What is the sign of the enthalpy of mixing for a positive deviation?", answer: "Positive (mixing absorbs heat)" },
        { prompt: "Which kind of azeotrope does a negative deviation give?", answer: "Maximum-boiling" },
        { prompt: "Is the volume of mixing zero for benzene + toluene?", answer: "Yes; it is an ideal mixture" },
        { prompt: "Why can fractional distillation not separate an azeotrope?", answer: "Its vapour has the same composition as the liquid" },
      ],
      pyqExampleId: "d97278a6-fff8-409f-8a75-9579f59219f0", // 2026 — methanol + CCl4 mole fraction and deviation
      traps: [
        {
          title: "Positive deviation gives the MINIMUM-boiling azeotrope",
          body: "A positive deviation raises the vapour pressure, so the mixture boils at a lower temperature than either liquid near the azeotrope. Ethanol + water is minimum-boiling; chloroform + acetone is maximum-boiling. Swapping the two is the match-list trap.",
        },
        {
          title: "A new hydrogen bond means a negative deviation",
          body: "When mixing makes a hydrogen bond that neither pure liquid had (chloroform with acetone, aniline with acetone), the liquids hold each other more tightly and the vapour pressure falls. When mixing breaks hydrogen bonds (methanol or ethanol diluted by a non-polar liquid), the deviation is positive.",
        },
      ],
    },
  ],
};
