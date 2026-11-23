import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_THERMODYNAMICS_NOTE: SubtopicNote = {
  subtopicName: "Thermodynamics of Galvanic Cells",
  title: "Gibbs Energy, Cell Potential and Equilibrium Constant",
  oneLineDefinition:
    "How the electrical work of a cell equals the fall in Gibbs energy, why cell potential is an intensive property, and how the standard cell potential gives the equilibrium constant.",
  whyItMatters:
    "9 questions. Three were set in board papers: the cell potential and Gibbs energy change of a magnesium and tin cell away from 1 M, with whether it is spontaneous (2015), the standard Gibbs energy change of a cadmium and tin cell (2023), and the relation between standard cell potential and equilibrium constant (2026). The textbook adds the derivation of that relation, why cell potential is intensive, and equilibrium constants from E⁰.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccec-gibbs",
      name: "Gibbs energy change and cell potential",
      intuition:
        "A cell does electrical work by pushing charge through a voltage, and that work is paid for by the cell reaction's fall in Gibbs energy. So a positive cell potential and a negative Gibbs energy change are the same fact said twice: the reaction is spontaneous.",
      definition:
        "- Electrical work = charge passed × cell potential. For n moles of electrons the charge is nF, so the work is \\(nFE_{\\text{cell}}\\).\n" +
        "- The electrical work done by a galvanic cell equals the decrease in Gibbs energy, \\(-\\Delta G\\), of the cell reaction. So \\(\\Delta G = -nFE_{\\text{cell}}\\), and under standard conditions \\(\\Delta G^0 = -nFE^0_{\\text{cell}}\\).\n" +
        "- A reaction is spontaneous when \\(\\Delta G\\) is negative, so \\(E_{\\text{cell}}\\) must be positive.\n" +
        "- **Cell potential is intensive:** \\(E^0_{\\text{cell}} = -\\dfrac{\\Delta G^0}{nF}\\). If the reaction is multiplied by 2, \\(\\Delta G^0\\) (extensive) doubles and n doubles too, so \\(E^0_{\\text{cell}} = -\\dfrac{2\\Delta G^0}{2nF}\\) is unchanged.\n" +
        "- Units: with F in C mol⁻¹ and E in V, \\(\\Delta G\\) comes out in J (1 V C = 1 J); divide by 1000 for kJ.",
      formula: {
        label: "Gibbs energy and cell potential",
        latex: "\\Delta G^0 = -nFE^0_{\\text{cell}}",
      },
      authoredExample: {
        prompt:
          "The standard potential of the Daniell cell, Zn(s) | Zn²⁺(1 M) || Cu²⁺(1 M) | Cu(s), is 1.10 V. Calculate the standard Gibbs energy change of the cell reaction. Is the reaction spontaneous?",
        steps: [
          "Given: \\(E^0_{\\text{cell}} = 1.10\\) V. Cell reaction \\(\\text{Zn} + \\text{Cu}^{2+} \\to \\text{Zn}^{2+} + \\text{Cu}\\), so \\(n = 2\\).",
          "Formula: \\(\\Delta G^0 = -nFE^0_{\\text{cell}}\\).",
          "Substitution: \\(\\Delta G^0 = -2\\ \\text{mol} \\times 96500\\ \\text{C mol}^{-1} \\times 1.10\\ \\text{V} = -212300\\) J.",
          "\\(\\Delta G^0 = -212.3\\) kJ. It is negative, so the reaction is spontaneous.",
        ],
        answer: "ΔG⁰ = −212.3 kJ; spontaneous",
      },
      selfCheckExample: {
        prompt: "A cell reaction transfers one mole of electrons and has ΔG⁰ = −96.5 kJ. Find E⁰cell.",
        steps: ["\\(E^0_{\\text{cell}} = -\\dfrac{\\Delta G^0}{nF} = -\\dfrac{-96500\\ \\text{J}}{1 \\times 96500\\ \\text{C}}\\).", "\\(E^0_{\\text{cell}} = 1.00\\) V."],
        answer: "1.00 V",
      },
      practiceSet: [
        { prompt: "Is Gibbs energy an intensive or an extensive property?", answer: "Extensive" },
        { prompt: "A cell has a negative E⁰cell. What is the sign of ΔG⁰, and is the reaction spontaneous?", answer: "ΔG⁰ is positive; the reaction is not spontaneous" },
        { prompt: "When a cell reaction is multiplied by 3, what happens to ΔG⁰ and to E⁰cell?", answer: "ΔG⁰ is tripled; E⁰cell is unchanged" },
      ],
      pyqExampleId: "89fbadd5-f3aa-48bd-810e-31a145e28ef0",
      traps: [
        {
          title: "Leaving n out of ΔG = −nFE",
          body: "Count the electrons in the balanced cell reaction. Using n = 1 for a two electron reaction halves the answer.",
        },
        {
          title: "Joules reported as kilojoules",
          body: "\\(nFE\\) with F = 96500 C gives joules. Write the value in J, then divide by 1000 for kJ, and keep the minus sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-equilibrium-constant",
      name: "Standard cell potential and equilibrium constant",
      intuition:
        "Two different formulas give the standard Gibbs energy change: one from the cell potential, one from the equilibrium constant. Set them equal and you have a bridge from a voltage to K. A cell with a large positive E⁰ has a huge K: the reaction goes almost to completion.",
      definition:
        "Derivation, one step a line:\n" +
        "- From electrochemistry: \\(\\Delta G^0 = -nFE^0_{\\text{cell}}\\).\n" +
        "- From thermodynamics: \\(\\Delta G^0 = -RT\\ln K\\).\n" +
        "- Equating: \\(-nFE^0_{\\text{cell}} = -RT\\ln K\\).\n" +
        "- So \\(E^0_{\\text{cell}} = \\dfrac{RT}{nF}\\ln K = \\dfrac{2.303\\,RT}{nF}\\log_{10}K\\).\n" +
        "- At 25 °C, \\(\\dfrac{2.303\\,RT}{F} = 0.0592\\) V, so \\(E^0_{\\text{cell}} = \\dfrac{0.0592}{n}\\log_{10}K\\).\n" +
        "- Turned round: \\(\\log_{10}K = \\dfrac{nE^0_{\\text{cell}}}{0.0592}\\). A positive \\(E^0_{\\text{cell}}\\) gives K greater than 1.",
      formula: {
        label: "Standard cell potential and equilibrium constant",
        latex: "E^0_{\\text{cell}} = \\frac{2.303\\,RT}{nF}\\log_{10}K = \\frac{0.0592}{n}\\log_{10}K \\ (\\text{at } 25\\ ^\\circ\\text{C})",
      },
      authoredExample: {
        prompt: "A cell reaction with n = 2 has a standard cell potential of 0.46 V at 25 °C. Calculate its equilibrium constant.",
        steps: [
          "Given: \\(E^0_{\\text{cell}} = 0.46\\) V, \\(n = 2\\).",
          "Formula: \\(\\log_{10}K = \\dfrac{nE^0_{\\text{cell}}}{0.0592}\\).",
          "Substitution: \\(\\log_{10}K = \\dfrac{2 \\times 0.46}{0.0592} = 15.54\\).",
          "\\(K = \\text{antilog}\\ 15.54 = 3.5 \\times 10^{15}\\).",
        ],
        answer: "K = 3.5 × 10¹⁵",
      },
      selfCheckExample: {
        prompt: "A one electron cell reaction has K = 1.0 × 10¹⁰ at 25 °C. Find E⁰cell.",
        steps: ["\\(E^0_{\\text{cell}} = \\dfrac{0.0592}{1}\\log_{10}(10^{10}) = 0.0592 \\times 10\\).", "\\(= 0.592\\) V."],
        answer: "0.592 V",
      },
      practiceSet: [
        { prompt: "Write the relation between ΔG⁰ and the equilibrium constant.", answer: "\\(\\Delta G^0 = -RT\\ln K = -2.303\\,RT\\log_{10}K\\)" },
        { prompt: "If E⁰cell is positive, is K greater or less than 1?", answer: "Greater than 1" },
        { prompt: "What is K for a cell reaction with E⁰cell = 0?", answer: "1" },
      ],
      pyqExampleId: "bc596b0b-d699-41ad-bbad-e82e87386c32",
      traps: [
        {
          title: "Mixing ln and log",
          body: "\\(\\ln K = 2.303\\log_{10}K\\). If you use 0.0592 you must use \\(\\log_{10}\\); the 2.303 is already inside it.",
        },
        {
          title: "A derivation without its starting relations",
          body: "Write both \\(\\Delta G^0 = -nFE^0\\) and \\(\\Delta G^0 = -RT\\ln K\\) first, then equate them. Jumping straight to the result loses most of the marks.",
        },
      ],
    },
  ],
};
