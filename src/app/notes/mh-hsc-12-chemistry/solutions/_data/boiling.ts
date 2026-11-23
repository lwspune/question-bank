import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_BOILING_NOTE: SubtopicNote = {
  subtopicName: "Boiling Point Elevation",
  title: "Boiling Point Elevation",
  oneLineDefinition:
    "Why a nonvolatile solute raises the boiling point of a solvent, how the rise depends on molality through the ebullioscopic constant, and how it gives the molar mass of the solute.",
  whyItMatters:
    "16 questions. Seven were set in board papers: define boiling point (2014), name the method of finding molar mass from boiling point elevation (2016), find a molar mass from the boiling points of a solvent and a solution (2017 with benzene, 2024 with ethyl acetate), and derive or explain the molar mass relation (2018, 2020 and 2023). The textbook adds the vapour pressure diagram, the meaning of the ebullioscopic constant, the pressure cooker and the formula of sulphur in carbon disulphide.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccso-bp-diagram",
      name: "Boiling point elevation from vapour pressure lowering",
      intuition:
        "A liquid boils when its vapour pressure climbs up to the pressure of the air above it. A solution has a lower vapour pressure than the pure solvent at every temperature, so it has further to climb: it must be heated to a higher temperature before it boils.",
      definition:
        "- **Boiling point:** the temperature at which the vapour pressure of a liquid equals the applied pressure. For a liquid in an open container the applied pressure is atmospheric pressure.\n" +
        "- **Boiling point elevation:** the difference between the boiling point of the solution and that of the pure solvent at the same constant pressure: \\(\\Delta T_b = T_b - T_b^0\\), with \\(T_b > T_b^0\\).\n" +
        "- **The diagram (Fig. 2.6):** plot vapour pressure against temperature. Draw AB for the pure solvent and CD for the solution, below AB at every temperature. Draw a horizontal line at 760 mm and mark where each curve meets it.\n" +
        "- The gap between the curves grows as temperature rises, as \\(\\Delta P = x_2P_1^0\\) predicts, because \\(P_1^0\\) grows with temperature.\n" +
        "- So the solution must be heated to a higher temperature than the pure solvent for its vapour pressure to reach 1 atm: the boiling point elevation is a consequence of vapour pressure lowering.",
      table: {
        columns: ["Part of Fig. 2.6", "What it shows"],
        rows: [
          { cells: ["Axes", "Vapour pressure on the vertical axis, temperature on the horizontal axis"] },
          { cells: ["Curve AB", "Vapour pressure of the pure solvent at each temperature"] },
          { cells: ["Curve CD", "Vapour pressure of the solution; it lies below AB at every temperature"] },
          {
            cells: ["Horizontal line at 760 mm", "1 atm: a curve meets it at that liquid's boiling point"],
            pyqExampleId: "3c981c6b-f6a7-4f21-8bfc-5c1dff87c163",
            noteAmber: "Board 2014 asked: what is boiling point? Name the applied pressure in your answer.",
          },
          { cells: ["\\(T_b^0\\) and \\(T_b\\)", "AB meets the line at \\(T_b^0\\); CD meets it further right at \\(T_b\\), so \\(T_b > T_b^0\\) and \\(\\Delta T_b = T_b - T_b^0\\)"] },
        ],
      },
      practiceSet: [
        { prompt: "Why does a pressure cooker cook food faster?", answer: "The higher pressure inside raises the boiling point of water, so the food cooks at a higher temperature" },
        { prompt: "In the vapour pressure against temperature diagram, does the solution's curve lie above or below the solvent's?", answer: "Below, at every temperature" },
        { prompt: "Pure water boils at 373.15 K and a solution at 373.67 K. Find the boiling point elevation.", answer: "0.52 K" },
      ],
      pyqExampleId: "3c981c6b-f6a7-4f21-8bfc-5c1dff87c163",
      traps: [
        {
          title: "No diagram where one is asked",
          body: "'Explain with diagram' carries marks for the figure itself. Label both axes, the solvent curve AB, the solution curve CD below it, the 760 mm line, and \\(T_b^0\\) and \\(T_b\\).",
        },
        {
          title: "Drawing the solution's curve above the solvent's",
          body: "The solute lowers the vapour pressure, so the solution's curve is the lower one. Drawn above, it would meet the 760 mm line first and give a lower boiling point.",
        },
        {
          title: "Forgetting the word nonvolatile",
          body: "The rise in boiling point is for a nonvolatile solute, one that adds nothing to the vapour. Write the word in every definition and derivation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-ebullioscopic",
      name: "The ebullioscopic constant",
      intuition:
        "The more solute particles there are in a kilogram of solvent, the more the boiling point rises, in direct proportion. The constant of proportion belongs to the solvent: it is simply how far the boiling point rises for a one molal solution.",
      definition:
        "- For a dilute solution the boiling point elevation is directly proportional to the molality: \\(\\Delta T_b \\propto m\\), so \\(\\Delta T_b = K_bm\\).\n" +
        "- \\(K_b\\) is called the boiling point elevation constant, the molal elevation constant or the **ebullioscopic constant**.\n" +
        "- If \\(m = 1\\), \\(\\Delta T_b = K_b\\): the ebullioscopic constant is the boiling point elevation produced by a 1 molal solution.\n" +
        "- Unit: \\(K_b = \\dfrac{\\Delta T_b}{m} = \\dfrac{\\text{K}}{\\text{mol kg}^{-1}} = \\text{K kg mol}^{-1}\\).\n" +
        "- \\(K_b\\) and \\(\\Delta T_b\\) are differences of temperature, so their values are the same in K and in °C.\n" +
        "- The temperature is not constant in this experiment, so the concentration is in molality (temperature independent), not molarity.",
      formula: {
        label: "Boiling point elevation",
        latex: "\\Delta T_b = K_bm, \\qquad K_b = \\frac{\\Delta T_b}{m}\\ \\ (\\text{K kg mol}^{-1})",
      },
      authoredExample: {
        prompt:
          "A solution of a nonvolatile solute in water has a molality of 0.25 mol kg⁻¹. \\(K_b\\) for water is 0.52 K kg mol⁻¹ and pure water boils at 373.15 K. Calculate the boiling point of the solution.",
        steps: [
          "Given: \\(m = 0.25\\) mol kg⁻¹, \\(K_b = 0.52\\) K kg mol⁻¹, \\(T_b^0 = 373.15\\) K.",
          "Formula: \\(\\Delta T_b = K_bm\\).",
          "Substitution: \\(\\Delta T_b = 0.52\\ \\text{K kg mol}^{-1} \\times 0.25\\ \\text{mol kg}^{-1} = 0.13\\) K.",
          "\\(T_b = T_b^0 + \\Delta T_b = 373.15 + 0.13 = 373.28\\) K.",
        ],
        answer: "Boiling point of the solution = 373.28 K",
      },
      selfCheckExample: {
        prompt: "A 0.50 molal solution of a nonvolatile solute boils 1.2 K above the pure solvent. Find the ebullioscopic constant of the solvent.",
        steps: ["\\(K_b = \\dfrac{\\Delta T_b}{m} = \\dfrac{1.2\\ \\text{K}}{0.50\\ \\text{mol kg}^{-1}}\\).", "\\(K_b = 2.4\\) K kg mol⁻¹."],
        answer: "2.4 K kg mol⁻¹",
      },
      practiceSet: [
        { prompt: "What is the ebullioscopic constant numerically equal to?", answer: "The boiling point elevation of a 1 molal solution" },
        { prompt: "What is the unit of the ebullioscopic constant?", answer: "K kg mol⁻¹" },
        { prompt: "Is a boiling point elevation of 2 °C the same as 2 K?", answer: "Yes. A difference of temperature has the same value in K and °C" },
        { prompt: "Give two other names of \\(K_b\\).", answer: "Boiling point elevation constant and molal elevation constant" },
      ],
      pyqExampleId: "ce735482-49ea-4cfc-92d6-c9224aec3aaa",
      traps: [
        {
          title: "Molarity in \\(\\Delta T_b = K_bm\\)",
          body: "The \\(m\\) here is molality, moles per kilogram of solvent. Molarity changes as the solution is heated, which is exactly why it is not used here.",
        },
        {
          title: "Giving the rise as the boiling point",
          body: "\\(\\Delta T_b\\) is only the rise. If the question asks for the boiling point, add it to the boiling point of the pure solvent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-bp-molar-mass",
      name: "Molar mass from boiling point elevation",
      intuition:
        "Weigh out a solute, dissolve it, and measure how far the boiling point rises. The rise tells you the molality, the molality tells you how many moles you dissolved, and the mass you weighed divided by those moles is the molar mass.",
      definition:
        "- **Step 1:** \\(\\Delta T_b = K_bm\\).\n" +
        "- **Step 2:** dissolve \\(W_2\\) g of solute of molar mass \\(M_2\\) in \\(W_1\\) g of solvent. Moles of solute \\(= W_2/M_2\\); mass of solvent \\(= W_1/1000\\) kg.\n" +
        "- **Step 3:** \\(m = \\dfrac{W_2/M_2}{W_1/1000} = \\dfrac{1000\\,W_2}{M_2W_1}\\) mol kg⁻¹.\n" +
        "- **Step 4:** substituting, \\(\\Delta T_b = K_b\\dfrac{1000\\,W_2}{M_2W_1}\\).\n" +
        "- **Step 5:** \\(M_2 = \\dfrac{1000\\,K_bW_2}{\\Delta T_bW_1}\\).\n" +
        "- This way of finding molar mass is called **ebullioscopy** (Board 2016).\n" +
        "- **Molecular formula:** atoms in one molecule = molar mass of the molecule ÷ atomic mass. Sulphur in carbon disulphide gives 8, so it is S₈.",
      formula: {
        label: "Molar mass from boiling point elevation",
        latex: "M_2 = \\frac{1000\\,K_bW_2}{\\Delta T_b\\,W_1}",
      },
      authoredExample: {
        prompt:
          "2.5 g of a nonvolatile solute is dissolved in 100 g of water. The solution boils at 373.28 K, and pure water at 373.15 K. \\(K_b\\) for water is 0.52 K kg mol⁻¹. Calculate the molar mass of the solute.",
        steps: [
          "Given: \\(W_2 = 2.5\\) g, \\(W_1 = 100\\) g, \\(K_b = 0.52\\) K kg mol⁻¹, \\(\\Delta T_b = 373.28 - 373.15 = 0.13\\) K.",
          "Formula: \\(M_2 = \\dfrac{1000\\,K_bW_2}{\\Delta T_bW_1}\\).",
          "Substitution: \\(M_2 = \\dfrac{1000\\ \\text{g kg}^{-1} \\times 0.52\\ \\text{K kg mol}^{-1} \\times 2.5\\ \\text{g}}{0.13\\ \\text{K} \\times 100\\ \\text{g}} = \\dfrac{1300}{13}\\) g mol⁻¹.",
          "\\(M_2 = 100\\) g mol⁻¹.",
        ],
        answer: "Molar mass of the solute = 100 g mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "6.4 g of a nonvolatile solute dissolved in 200 g of benzene raises its boiling point by 0.40 K. \\(K_b\\) for benzene is 2.5 K kg mol⁻¹. Find the molar mass of the solute.",
        steps: [
          "\\(M_2 = \\dfrac{1000 \\times 2.5 \\times 6.4}{0.40 \\times 200}\\).",
          "\\(M_2 = \\dfrac{16000}{80} = 200\\) g mol⁻¹.",
        ],
        answer: "200 g mol⁻¹",
      },
      practiceSet: [
        { prompt: "Sulphur dissolved in a solvent shows a molar mass of 256 g mol⁻¹. If the atomic mass of S is 32 u, what is its molecular formula?", answer: "\\(256/32 = 8\\), so S₈" },
        { prompt: "In \\(M_2 = 1000\\,K_bW_2/(\\Delta T_bW_1)\\), in what unit must \\(W_1\\) be?", answer: "Grams; the 1000 turns grams of solvent into kilograms" },
        { prompt: "What is the method of finding molar mass from the rise in boiling point called?", answer: "Ebullioscopy" },
      ],
      pyqExampleId: "b8081eca-76cb-4d6f-a5a2-7247d39af067",
      traps: [
        {
          title: "Putting the boiling point of the solution in place of the rise",
          body: "The formula needs \\(\\Delta T_b = T_b - T_b^0\\). Subtract the solvent's boiling point first; the boiling point itself in the denominator gives an absurdly small molar mass.",
        },
        {
          title: "Using the 1000 with the solvent in kilograms",
          body: "Either write \\(W_1\\) in grams with the factor 1000, or in kilograms without it. Doing both makes the molar mass a thousand times too big.",
        },
        {
          title: "Rounding the atoms too early",
          body: "For a molecular formula, find the molar mass to a few figures first, then divide by the atomic mass and round to the nearest whole number of atoms at the very end.",
        },
      ],
    },
  ],
};
