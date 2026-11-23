import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_COLLISION_NOTE: SubtopicNote = {
  subtopicName: "Collision Theory of Bimolecular Reactions",
  title: "Collision Theory and Activation Energy",
  oneLineDefinition:
    "Why only a few collisions between reactant molecules lead to products: the energy condition (activation energy), the orientation condition, the activated complex and the potential energy barrier.",
  whyItMatters:
    "5 questions, all from the textbook: why all collisions do not lead to reaction, the requirements for a successful collision, the meaning of activation energy, the fraction of molecules with energy above the activation energy, and the activation energies of the forward and reverse steps of an endothermic reaction. No board question in this bank is filed on this page, but the board's questions on temperature and catalysts are answered from these ideas.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccck-successful-collisions",
      name: "Conditions for a successful collision",
      intuition:
        "If every collision caused a reaction, gas reactions would be over in a flash: molecules collide many powers of ten more often than the rates we observe. Most collisions are too gentle, or the molecules meet the wrong way round, and they simply bounce apart.",
      definition:
        "- Chemical reactions occur as a result of collisions between the reactant species, but the number of collisions in a gas is far larger, by many powers of ten, than the observed rate.\n" +
        "- **Energy:** the colliding molecules must possess a minimum kinetic energy, the activation energy. Reaction occurs only if their kinetic energy is equal to or greater than the activation energy.\n" +
        "- **Orientation:** the colliding molecules must be so oriented that the reacting groups approach closely. This matters for complex molecules; for simple molecules or ions the energy condition is enough.\n" +
        "- In \\(\\text{A} + \\text{C{-}B} \\to \\text{A{-}B} + \\text{C}\\): if A approaches the C end, the molecules collide and separate with no reaction; if A approaches the B end, the collision can succeed.\n" +
        "- Only collisions meeting both conditions are successful, so only a small fraction of collisions lead to products.",
      table: {
        columns: ["Requirement", "What it means", "If it is not met"],
        rows: [
          { cells: ["Sufficient energy", "Kinetic energy of the colliding molecules equal to or greater than the activation energy", "The molecules cannot climb the energy barrier and separate unchanged"] },
          { cells: ["Proper orientation", "The reacting groups approach each other closely (A meets the B end of the C-B molecule)", "The molecules collide and separate; no new bond forms"] },
          {
            cells: ["Both together", "A successful collision, which converts reactants into products", "Only a small fraction of all collisions lead to reaction"],
            pyqExampleId: "4f884161-2ae0-4471-8ed9-e133ce0ef16d",
          },
        ],
      },
      practiceSet: [
        { prompt: "Is the rate of a gas phase reaction equal to the rate of collision of its molecules?", answer: "No. The number of collisions is many powers of ten greater than the observed rate" },
        { prompt: "For which kind of molecules does the orientation requirement matter most?", answer: "Complex molecules; for simple molecules or ions the energy requirement is enough" },
        { prompt: "What happens when two reactant molecules with enough energy collide with the wrong orientation?", answer: "They collide and separate without reacting" },
      ],
      pyqExampleId: "6c665187-65e4-4e84-b7d2-d3b4a035714e",
      traps: [
        {
          title: "Giving only the energy condition",
          body: "Two requirements earn two marks: enough energy (at least \\(E_a\\)) and proper orientation. Leaving out orientation is the usual half-mark answer.",
        },
        {
          title: "Saying more collisions always means more reaction",
          body: "Collisions far outnumber reactions. What matters is the fraction of collisions that have enough energy and the right orientation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-activation-energy",
      name: "Activation energy and the potential energy barrier",
      intuition:
        "Think of reactants in a valley and products in the next valley, with a hill between them. To get across, the molecules must climb the hill, using the kinetic energy they bring into the collision. The height of the hill is the activation energy, and only a tiny fraction of molecules ever has that much energy.",
      definition:
        "- **Activation energy (Eₐ):** the minimum kinetic energy the colliding reactant molecules must possess for the reaction to occur. It is also the height of the energy barrier between reactants and products (Fig. 6.7).\n" +
        "- **Activated complex:** during the collision in \\(\\text{A} + \\text{B{-}C}\\), the new bond between A and B forms while the bond between B and C breaks. The configuration \\(\\text{A} \\cdots \\text{B} \\cdots \\text{C}\\), in which all three atoms are weakly connected, is the activated complex. The energy to reach it comes from the kinetic energy of the colliding molecules.\n" +
        "- **Fraction of molecules with energy greater than \\(E_a\\):** \\(f = e^{-E_a/RT}\\). Example from the book: for \\(E_a = 75\\) kJ mol⁻¹ at 298 K, \\(f = 7 \\times 10^{-14}\\), only 7 collisions in \\(10^{14}\\) are energetic enough.\n" +
        "- **Forward and reverse barriers:** on the energy diagram the products lie above or below the reactants by \\(\\Delta H\\). The barrier climbed going forward is \\(E_f\\) and going back is \\(E_r\\), so \\(\\Delta H = E_f - E_r\\). For an endothermic reaction \\(\\Delta H\\) is positive and \\(E_f > E_r\\).",
      formula: {
        label: "Fraction of molecules with energy above Ea",
        latex: "f = e^{-E_a/RT}, \\qquad \\log_{10} f = -\\frac{E_a}{2.303\\,RT}",
      },
      authoredExample: {
        prompt: "Calculate the fraction of molecules at 400 K that have energy equal to or greater than an activation energy of 60 kJ mol⁻¹. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(E_a = 60\\) kJ mol⁻¹ \\(= 60 \\times 10^3\\) J mol⁻¹, \\(T = 400\\) K, \\(R = 8.314\\) J K⁻¹ mol⁻¹.",
          "Formula: \\(f = e^{-E_a/RT}\\), or \\(\\log_{10} f = -\\dfrac{E_a}{2.303\\,RT}\\).",
          "Substitution: \\(\\dfrac{E_a}{RT} = \\dfrac{60 \\times 10^3\\ \\text{J mol}^{-1}}{8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1} \\times 400\\ \\text{K}} = 18.04\\); \\(\\log_{10} f = -\\dfrac{18.04}{2.303} = -7.835\\).",
          "\\(f = \\text{antilog}(-7.835) = 1.46 \\times 10^{-8}\\).",
        ],
        answer: "f = 1.46 × 10⁻⁸ (about 15 molecules in a thousand million)",
      },
      selfCheckExample: {
        prompt: "For a reaction, the activation energy of the forward step is 80 kJ mol⁻¹ and of the reverse step is 45 kJ mol⁻¹. Find ΔH and say whether the reaction is exothermic or endothermic.",
        steps: ["\\(\\Delta H = E_f - E_r = 80 - 45 = +35\\) kJ mol⁻¹.", "\\(\\Delta H\\) is positive, so the reaction is endothermic."],
        answer: "ΔH = +35 kJ mol⁻¹; endothermic",
      },
      practiceSet: [
        { prompt: "What is the activated complex?", answer: "The configuration in which the atoms of the colliding molecules are all weakly connected, as old bonds break and new bonds form" },
        { prompt: "Does a larger activation energy give a larger or a smaller fraction of molecules able to react at a given temperature?", answer: "A smaller fraction, since \\(f = e^{-E_a/RT}\\)" },
        { prompt: "For an exothermic reaction, which is larger: the forward or the reverse activation energy?", answer: "The reverse one, \\(E_r > E_f\\)" },
      ],
      pyqExampleId: "5177a5c1-f352-4953-8197-5159a5857816",
      traps: [
        {
          title: "Eₐ left in kJ",
          body: "\\(R = 8.314\\) J K⁻¹ mol⁻¹ is in joules, so \\(E_a\\) must be in J mol⁻¹. Leaving it in kJ makes \\(E_a/RT\\) a thousand times too small.",
        },
        {
          title: "Antilog of a negative number",
          body: "\\(\\log_{10} f\\) is negative, so \\(f\\) is a very small number. An answer bigger than 1 for a fraction means a lost minus sign.",
        },
      ],
    },
  ],
};
