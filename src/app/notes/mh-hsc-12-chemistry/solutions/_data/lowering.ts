import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_LOWERING_NOTE: SubtopicNote = {
  subtopicName: "Vapour Pressure Lowering",
  title: "Vapour Pressure Lowering and Raoult's Law",
  oneLineDefinition:
    "Why a nonvolatile solute lowers the vapour pressure of a solvent, Raoult's law for such a solution, relative lowering equal to the mole fraction of the solute, and the molar mass of the solute found from it.",
  whyItMatters:
    "13 questions. Five were set in board papers: the molar mass of a solute in benzene from two vapour pressures (2016), derive the relation between relative lowering and molar mass (2017 and 2026), the mole fraction of solute from two vapour pressures (2023), and derive Raoult's law for a nonvolatile solute (2025). The textbook adds the vapour pressure of a urea solution, two solved molar mass problems and why the vapour pressure falls at all.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccso-raoult-nonvolatile",
      name: "Raoult's law for a nonvolatile solute",
      intuition:
        "Vapour pressure comes from solvent molecules escaping from the surface. Dissolve a solute that cannot evaporate and some of the surface is taken up by its particles, so fewer solvent molecules can escape from each bit of surface. The vapour pressure falls, and it falls in proportion to how much of the solution is solute.",
      definition:
        "- **Raoult's law (nonvolatile solute):** the vapour pressure of the solvent over the solution is equal to the vapour pressure of the pure solvent multiplied by its mole fraction in the solution: \\(P_1 = P_1^0x_1\\). The solute adds nothing to the vapour, so \\(P_1\\) is also the vapour pressure of the solution.\n" +
        "- **Why it is lowered:** some surface solvent molecules are replaced by nonvolatile solute molecules, so fewer solvent molecules per unit surface area are available to vaporise, and they vaporise at a slower rate.\n" +
        "- **Derivation, step 1:** \\(P_1 = P_1^0x_1\\).\n" +
        "- **Step 2:** for a binary solution \\(x_1 + x_2 = 1\\), so \\(x_1 = 1 - x_2\\).\n" +
        "- **Step 3:** \\(P_1 = P_1^0(1 - x_2) = P_1^0 - P_1^0x_2\\).\n" +
        "- **Step 4:** \\(P_1^0 - P_1 = P_1^0x_2\\). Since \\(\\Delta P = P_1^0 - P_1\\) is the lowering of vapour pressure, \\(\\Delta P = P_1^0x_2\\).\n" +
        "- **Step 5:** dividing by \\(P_1^0\\), the **relative lowering of vapour pressure** \\(\\dfrac{P_1^0 - P_1}{P_1^0} = x_2\\), the mole fraction of solute. It depends only on the number of solute particles, so it is a colligative property.",
      formula: {
        label: "Raoult's law and relative lowering",
        latex: "P_1 = P_1^0x_1, \\qquad \\Delta P = P_1^0 - P_1 = P_1^0x_2, \\qquad \\frac{P_1^0 - P_1}{P_1^0} = x_2",
      },
      authoredExample: {
        prompt:
          "The vapour pressure of pure water at a certain temperature is 30.0 mm Hg. A solution of a nonvolatile solute in water has a mole fraction of solute of 0.05. Calculate the lowering of vapour pressure and the vapour pressure of the solution.",
        steps: [
          "Given: \\(P_1^0 = 30.0\\) mm Hg, \\(x_2 = 0.05\\).",
          "Formula: \\(\\Delta P = P_1^0x_2\\).",
          "Substitution: \\(\\Delta P = 30.0\\ \\text{mm Hg} \\times 0.05 = 1.5\\) mm Hg.",
          "Vapour pressure of the solution: \\(P_1 = P_1^0 - \\Delta P = 30.0 - 1.5 = 28.5\\) mm Hg.",
        ],
        answer: "Lowering 1.5 mm Hg; vapour pressure of the solution 28.5 mm Hg",
      },
      selfCheckExample: {
        prompt:
          "1 mol of a nonvolatile solute is dissolved in 9 mol of water. The vapour pressure of pure water at that temperature is 20 mm Hg. Find the vapour pressure of the solution.",
        steps: [
          "Mole fraction of water: \\(x_1 = \\dfrac{9}{9 + 1} = 0.9\\).",
          "\\(P_1 = P_1^0x_1 = 20 \\times 0.9 = 18\\) mm Hg.",
        ],
        answer: "18 mm Hg",
      },
      practiceSet: [
        { prompt: "What is the relative lowering of vapour pressure equal to?", answer: "The mole fraction of the solute, \\(x_2\\)" },
        { prompt: "A solution of a nonvolatile solute shows a relative lowering of vapour pressure of 0.02. What is the mole fraction of the solvent?", answer: "\\(1 - 0.02 = 0.98\\)" },
        { prompt: "Is the vapour pressure of such a solution proportional to the mole fraction of the solute or of the solvent?", answer: "Of the solvent: \\(P_1 = P_1^0x_1\\)" },
        { prompt: "Does a nonvolatile solute add anything to the vapour above the solution?", answer: "No. Only the solvent is in the vapour" },
      ],
      pyqExampleId: "3b7fc184-c613-44aa-9649-8fa3fb5314aa",
      traps: [
        {
          title: "Solvent's mole fraction or solute's?",
          body: "\\(P_1 = P_1^0x_1\\) uses the solvent's mole fraction; \\(\\Delta P = P_1^0x_2\\) and the relative lowering use the solute's. Swapping them gives a vapour pressure that rises as solute is added, which is impossible.",
        },
        {
          title: "Lowering and relative lowering",
          body: "\\(\\Delta P\\) is a pressure and carries mm Hg. The relative lowering \\(\\Delta P/P_1^0\\) is a pure number with no unit. Say which one the question asks for.",
        },
        {
          title: "A derivation that skips \\(x_1 = 1 - x_2\\)",
          body: "The board gives marks for each line. Write Raoult's law, then \\(x_1 + x_2 = 1\\), then the substitution, then \\(\\Delta P = P_1^0x_2\\). Jumping straight to the result loses most of the marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-vp-molar-mass",
      name: "Molar mass of solute from vapour pressure lowering",
      intuition:
        "The relative lowering tells you the mole fraction of the solute. If you know what masses of solute and solvent went in, the mole fraction tells you how many moles of solute that mass was, and mass divided by moles is the molar mass.",
      definition:
        "- **Step 1:** \\(\\dfrac{P_1^0 - P_1}{P_1^0} = x_2 = \\dfrac{n_2}{n_1 + n_2}\\).\n" +
        "- **Step 2:** the solution is dilute, so \\(n_1 \\gg n_2\\) and \\(n_1 + n_2 \\approx n_1\\). Then \\(x_2 = \\dfrac{n_2}{n_1}\\).\n" +
        "- **Step 3:** for \\(W_2\\) g of solute (molar mass \\(M_2\\)) in \\(W_1\\) g of solvent (molar mass \\(M_1\\)): \\(n_2 = \\dfrac{W_2}{M_2}\\), \\(n_1 = \\dfrac{W_1}{M_1}\\).\n" +
        "- **Step 4:** \\(\\dfrac{P_1^0 - P_1}{P_1^0} = \\dfrac{W_2/M_2}{W_1/M_1} = \\dfrac{W_2M_1}{M_2W_1}\\).\n" +
        "- **Step 5:** \\(M_2 = \\dfrac{W_2M_1P_1^0}{W_1(P_1^0 - P_1)}\\). Knowing all the other quantities, the molar mass of the solute is found.",
      formula: {
        label: "Molar mass from relative lowering",
        latex: "\\frac{P_1^0 - P_1}{P_1^0} = \\frac{W_2M_1}{M_2W_1}, \\qquad M_2 = \\frac{W_2M_1P_1^0}{W_1(P_1^0 - P_1)}",
      },
      authoredExample: {
        prompt:
          "5.0 g of a nonvolatile solute is dissolved in 90 g of water. At the temperature of the experiment pure water has a vapour pressure of 25.00 mm Hg and the solution 24.75 mm Hg. Calculate the molar mass of the solute.",
        steps: [
          "Given: \\(W_2 = 5.0\\) g, \\(W_1 = 90\\) g, \\(M_1 = 18\\) g mol⁻¹, \\(P_1^0 = 25.00\\) mm Hg, \\(P_1 = 24.75\\) mm Hg.",
          "Relative lowering: \\(\\dfrac{25.00 - 24.75}{25.00} = \\dfrac{0.25}{25.00} = 0.010\\).",
          "Formula: \\(M_2 = \\dfrac{W_2M_1}{W_1} \\times \\dfrac{P_1^0}{P_1^0 - P_1}\\).",
          "Substitution: \\(M_2 = \\dfrac{5.0\\ \\text{g} \\times 18\\ \\text{g mol}^{-1}}{90\\ \\text{g} \\times 0.010} = \\dfrac{90}{0.90}\\) g mol⁻¹.",
          "\\(M_2 = 100\\) g mol⁻¹.",
        ],
        answer: "Molar mass of the solute = 100 g mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "3.0 g of a nonvolatile solute in 78 g of benzene (molar mass 78 g mol⁻¹) gives a relative lowering of vapour pressure of 0.020. Find the molar mass of the solute.",
        steps: [
          "\\(0.020 = \\dfrac{W_2M_1}{M_2W_1} = \\dfrac{3.0 \\times 78}{M_2 \\times 78}\\).",
          "\\(M_2 = \\dfrac{3.0}{0.020} = 150\\) g mol⁻¹.",
        ],
        answer: "150 g mol⁻¹",
      },
      practiceSet: [
        { prompt: "Which approximation is made in deriving the molar mass relation from relative lowering?", answer: "The solution is dilute, so \\(n_1 + n_2 \\approx n_1\\)" },
        { prompt: "2.0 g of a nonvolatile solute in 36 g of water gives a relative lowering of 0.020. Find the molar mass of the solute.", answer: "\\(M_2 = \\dfrac{2.0 \\times 18}{36 \\times 0.020} = 50\\) g mol⁻¹" },
        { prompt: "Besides the two masses and the two vapour pressures, whose molar mass must be known to find \\(M_2\\)?", answer: "The solvent's, \\(M_1\\)" },
      ],
      pyqExampleId: "c921ce5e-776c-4812-9751-acb3fb8c917f",
      traps: [
        {
          title: "Leaving out the dilute-solution step",
          body: "The step \\(n_1 + n_2 \\approx n_1\\) is what turns \\(x_2\\) into \\(W_2M_1/(M_2W_1)\\). Write it, with the reason (the solution is dilute), or the derivation is incomplete.",
        },
        {
          title: "Using the difference instead of the ratio",
          body: "The formula needs the relative lowering \\((P_1^0 - P_1)/P_1^0\\), not \\(P_1^0 - P_1\\) alone. Divide by the vapour pressure of the pure solvent.",
        },
      ],
    },
  ],
};
