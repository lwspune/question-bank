import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_FREEZING_NOTE: SubtopicNote = {
  subtopicName: "Depression in Freezing Point",
  title: "Depression in Freezing Point",
  oneLineDefinition:
    "Why a nonvolatile solute lowers the freezing point of a solvent, the cryoscopic constant, and the molar mass of a solute from the depression, including the method of comparing two solutions.",
  whyItMatters:
    "9 questions. Five were set in board papers: find a molar mass by comparing two solutions in the same solvent (2015), write the formula for molar mass by this method (2016), write the SI unit of the cryoscopic constant (2023), pick the freezing point of a urea solution (2025), and state Raoult's law and derive the molar mass relation (2026). The textbook adds the freezing point of a glucose solution worked out from a cane sugar one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccso-cryoscopic",
      name: "Freezing point depression and the cryoscopic constant",
      intuition:
        "To freeze, solvent molecules must pull together into a solid. Solute particles sit between them and keep them apart, so the pull is weaker and the solution has to be cooled further before it freezes. The more solute particles per kilogram of solvent, the further the freezing point falls.",
      definition:
        "- **Freezing point:** the temperature at which the liquid and the solid are in equilibrium and have the same vapour pressure.\n" +
        "- **Depression in freezing point:** \\(\\Delta T_f = T_f^0 - T_f\\), where \\(T_f^0\\) is the freezing point of the pure solvent and \\(T_f\\) that of the solution, with \\(T_f^0 > T_f\\).\n" +
        "- **The diagram (Fig. 2.7):** AB is the vapour pressure curve of the solid solvent, CD of the pure liquid solvent, and EF of the solution, always below CD. AB meets CD at B, the freezing point \\(T_f^0\\); AB meets EF at E, the freezing point \\(T_f\\) of the solution, which is lower. The solute does not dissolve in the solid solvent.\n" +
        "- **Reason:** solute molecules separate the solvent molecules, so the attractive forces between solvent molecules decrease and a lower temperature is needed for the change of phase.\n" +
        "- \\(\\Delta T_f = K_fm\\). \\(K_f\\) is the **freezing point depression constant** or **cryoscopic constant**. If \\(m = 1\\), \\(\\Delta T_f = K_f\\): it is the depression produced by a 1 molal solution of a nonvolatile solute.\n" +
        "- Unit of \\(K_f\\): K kg mol⁻¹ (or °C kg mol⁻¹). Its value depends on the nature of the solvent only.",
      formula: {
        label: "Freezing point depression",
        latex: "\\Delta T_f = T_f^0 - T_f = K_fm, \\qquad K_f\\ \\ (\\text{K kg mol}^{-1})",
      },
      authoredExample: {
        prompt:
          "A 0.25 m solution of a nonvolatile nonelectrolyte is made in benzene, which freezes at 278.60 K. \\(K_f\\) for benzene is 5.12 K kg mol⁻¹. Calculate the freezing point of the solution.",
        steps: [
          "Given: \\(m = 0.25\\) mol kg⁻¹, \\(K_f = 5.12\\) K kg mol⁻¹, \\(T_f^0 = 278.60\\) K.",
          "Formula: \\(\\Delta T_f = K_fm\\).",
          "Substitution: \\(\\Delta T_f = 5.12\\ \\text{K kg mol}^{-1} \\times 0.25\\ \\text{mol kg}^{-1} = 1.28\\) K.",
          "\\(T_f = T_f^0 - \\Delta T_f = 278.60 - 1.28 = 277.32\\) K.",
        ],
        answer: "Freezing point of the solution = 277.32 K",
      },
      selfCheckExample: {
        prompt: "An aqueous solution of a nonelectrolyte freezes at −0.93 °C. \\(K_f\\) for water is 1.86 K kg mol⁻¹. Find the molality of the solution.",
        steps: [
          "\\(\\Delta T_f = 0 - (-0.93) = 0.93\\) °C \\(= 0.93\\) K.",
          "\\(m = \\dfrac{\\Delta T_f}{K_f} = \\dfrac{0.93}{1.86} = 0.50\\) mol kg⁻¹.",
        ],
        answer: "0.50 mol kg⁻¹",
      },
      practiceSet: [
        { prompt: "What is the cryoscopic constant numerically equal to?", answer: "The depression in freezing point produced by a 1 molal solution of a nonvolatile solute" },
        { prompt: "In Fig. 2.7, which curve belongs to the solid solvent?", answer: "AB" },
        { prompt: "Does the cryoscopic constant depend on the solute dissolved?", answer: "No. It depends only on the nature of the solvent" },
        { prompt: "Pure water freezes at 0 °C and a solution at −0.372 °C. Find the depression in freezing point.", answer: "0.372 K" },
      ],
      pyqExampleId: "a3b385c8-6f65-470a-86e6-00d88b62f027",
      traps: [
        {
          title: "Giving the depression as the freezing point",
          body: "\\(K_fm\\) is the fall, a positive number. The freezing point of an aqueous solution is that fall below 0 °C, so it is negative in °C. A solution never freezes above its pure solvent.",
        },
        {
          title: "Subtracting the wrong way round",
          body: "\\(\\Delta T_f = T_f^0 - T_f\\) (solvent minus solution), while \\(\\Delta T_b = T_b - T_b^0\\) (solution minus solvent). Both come out positive.",
        },
        {
          title: "A two-curve diagram",
          body: "Fig. 2.7 needs three curves: the solid solvent (AB), the liquid solvent (CD) and the solution (EF). The freezing points are where the liquid curves meet the solid curve.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-fp-molar-mass",
      name: "Molar mass from freezing point depression",
      intuition:
        "This is the same idea as the boiling point method, run the other way on the thermometer. And when \\(K_f\\) for a solvent is not given, a solute of known molar mass in the same solvent can stand in for it, because \\(K_f\\) belongs to the solvent alone.",
      definition:
        "- **Step 1:** \\(\\Delta T_f = K_fm\\).\n" +
        "- **Step 2:** for \\(W_2\\) g of solute of molar mass \\(M_2\\) in \\(W_1\\) g of solvent, \\(m = \\dfrac{1000\\,W_2}{M_2W_1}\\) mol kg⁻¹.\n" +
        "- **Step 3:** substituting, \\(\\Delta T_f = K_f\\dfrac{1000\\,W_2}{M_2W_1}\\).\n" +
        "- **Step 4:** \\(M_2 = \\dfrac{1000\\,K_fW_2}{\\Delta T_fW_1}\\).\n" +
        "- **Two solutions in the same solvent:** \\(K_f\\) is the same for both, so \\(1000\\,K_f = \\dfrac{M_2\\,\\Delta T_f\\,W_1}{W_2} = \\dfrac{M_2'\\,\\Delta T_f'\\,W_1'}{W_2'}\\), and the unknown \\(M_2'\\) follows without \\(K_f\\).",
      formula: {
        label: "Molar mass from freezing point depression",
        latex: "M_2 = \\frac{1000\\,K_fW_2}{\\Delta T_f\\,W_1}",
      },
      authoredExample: {
        prompt:
          "0.90 g of a nonvolatile nonelectrolyte is dissolved in 50 g of water. The solution freezes at −0.279 °C. \\(K_f\\) for water is 1.86 K kg mol⁻¹. Calculate the molar mass of the solute.",
        steps: [
          "Given: \\(W_2 = 0.90\\) g, \\(W_1 = 50\\) g, \\(K_f = 1.86\\) K kg mol⁻¹, \\(\\Delta T_f = 0 - (-0.279) = 0.279\\) K.",
          "Formula: \\(M_2 = \\dfrac{1000\\,K_fW_2}{\\Delta T_fW_1}\\).",
          "Substitution: \\(M_2 = \\dfrac{1000\\ \\text{g kg}^{-1} \\times 1.86\\ \\text{K kg mol}^{-1} \\times 0.90\\ \\text{g}}{0.279\\ \\text{K} \\times 50\\ \\text{g}} = \\dfrac{1674}{13.95}\\) g mol⁻¹.",
          "\\(M_2 = 120\\) g mol⁻¹.",
        ],
        answer: "Molar mass of the solute = 120 g mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "In a certain solvent, 1.2 g of urea (molar mass 60 g mol⁻¹) in 100 g of the solvent lowers the freezing point by 0.40 K. 3.0 g of an unknown nonelectrolyte in 100 g of the same solvent lowers it by 0.25 K. Find the molar mass of the unknown.",
        steps: [
          "Urea: \\(1000\\,K_f = \\dfrac{60 \\times 0.40 \\times 100}{1.2} = 2000\\).",
          "Unknown: \\(2000 = \\dfrac{M_2' \\times 0.25 \\times 100}{3.0}\\), so \\(M_2' = \\dfrac{2000 \\times 3.0}{25} = 240\\) g mol⁻¹.",
        ],
        answer: "240 g mol⁻¹",
      },
      practiceSet: [
        { prompt: "Write the formula for the molar mass of a solute by the freezing point method.", answer: "\\(M_2 = \\dfrac{1000\\,K_fW_2}{\\Delta T_fW_1}\\)" },
        { prompt: "Why can \\(K_f\\) be cancelled when two solutions in the same solvent are compared?", answer: "\\(K_f\\) depends only on the solvent, so it is the same for both" },
        { prompt: "Equal masses of glucose (180 g mol⁻¹) and sucrose (342 g mol⁻¹) are dissolved in equal masses of water. Which solution has the larger depression in freezing point?", answer: "Glucose: the same mass holds more moles" },
      ],
      pyqExampleId: "21b27d83-680e-48f3-9491-c77c11ed7614",
      traps: [
        {
          title: "Using the mass of the solution for \\(W_1\\)",
          body: "\\(W_1\\) is the mass of the solvent only. A '5% solution by mass' has 5 g of solute in 95 g of solvent, not in 100 g.",
        },
        {
          title: "Stopping the derivation at \\(\\Delta T_f = K_fm\\)",
          body: "The board asks for the molar mass relation. Write the molality in terms of \\(W_2\\), \\(M_2\\) and \\(W_1\\), substitute, and finish with \\(M_2\\) on its own.",
        },
      ],
    },
  ],
};
