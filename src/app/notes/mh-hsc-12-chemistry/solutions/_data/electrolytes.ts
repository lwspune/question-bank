import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_ELECTROLYTES_NOTE: SubtopicNote = {
  subtopicName: "Colligative Properties of Electrolytes",
  title: "Electrolytes and the van't Hoff Factor",
  oneLineDefinition:
    "Why electrolyte solutions show larger colligative properties, the van't Hoff factor i, the colligative equations rewritten for electrolytes, and how i is related to the degree of dissociation.",
  whyItMatters:
    "19 questions. Five were set in board papers: the mass of CaCl₂ that gives a stated osmotic pressure (2014), which of four solutions of the same molarity has the highest osmotic pressure (2018), the relation between the van't Hoff factor and the degree of dissociation (2024), the molality of a KBr solution from its freezing point (2025), and the degree of dissociation of formic acid from its freezing point (2026). The textbook adds the derivation of that relation, KCl solutions whose i falls short of 2, and acetic acid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccso-vant-hoff-factor",
      name: "The van't Hoff factor",
      intuition:
        "One formula unit of NaCl breaks into two ions in water, so a NaCl solution has about twice as many particles as a sucrose solution of the same concentration. Colligative properties count particles, so they come out about twice as large. The van't Hoff factor is that multiplier.",
      definition:
        "- **Observations:** electrolyte solutions show colligative properties greater than those of nonelectrolyte solutions of the same concentration, and the molar masses found from them are lower than the formula masses. The reason: one formula unit of an electrolyte gives two or more ions, so the number of particles increases.\n" +
        "- **Definition 1:** \\(i = \\dfrac{\\text{colligative property of electrolyte solution}}{\\text{colligative property of nonelectrolyte solution of the same concentration}} = \\dfrac{\\Delta T_f}{(\\Delta T_f)_0} = \\dfrac{\\Delta T_b}{(\\Delta T_b)_0} = \\dfrac{\\Delta P}{(\\Delta P)_0} = \\dfrac{\\pi}{\\pi_0}\\)\n" +
        "- **Definition 2:** \\(i = \\dfrac{\\text{actual moles of particles in solution after dissociation}}{\\text{moles of formula units dissolved}}\\)\n" +
        "- **Definition 3:** \\(i = \\dfrac{\\text{formula mass of substance}}{\\text{observed molar mass of substance}} = \\dfrac{M_{\\text{theoretical}}}{M_{\\text{observed}}}\\)\n" +
        "- \\(i = 1\\) for a nonelectrolyte, 2 for KNO₃ and NaCl, 3 for Na₂SO₄ and CaCl₂. These hold only for infinitely dilute solutions, where dissociation is complete.\n" +
        "- At higher concentrations a strong electrolyte gives a smaller \\(i\\) than expected: electrostatic attraction holds oppositely charged ions together as **ion pairs**, which reduces the number of particles.",
      formula: {
        label: "Van't Hoff factor",
        latex: "i = \\frac{\\Delta T_f}{(\\Delta T_f)_0} = \\frac{\\pi}{\\pi_0} = \\frac{M_{\\text{theoretical}}}{M_{\\text{observed}}}",
      },
      authoredExample: {
        prompt:
          "A 0.050 m aqueous solution of MgCl₂ freezes at −0.250 °C. \\(K_f\\) for water is 1.86 K kg mol⁻¹. Calculate the van't Hoff factor.",
        steps: [
          "Given: \\(m = 0.050\\) mol kg⁻¹, \\(K_f = 1.86\\) K kg mol⁻¹, observed \\(\\Delta T_f = 0 - (-0.250) = 0.250\\) K.",
          "Depression expected for a nonelectrolyte: \\((\\Delta T_f)_0 = K_fm = 1.86 \\times 0.050 = 0.093\\) K.",
          "Formula: \\(i = \\dfrac{\\Delta T_f}{(\\Delta T_f)_0}\\).",
          "Substitution: \\(i = \\dfrac{0.250\\ \\text{K}}{0.093\\ \\text{K}} = 2.69\\).",
        ],
        answer: "van't Hoff factor i = 2.69 (less than the ideal 3)",
      },
      selfCheckExample: {
        prompt:
          "A 1.25 m sucrose solution has a freezing point depression of 2.32 °C. What depression is expected for a 1.25 m CaCl₂ solution, assuming complete dissociation?",
        steps: ["CaCl₂ gives Ca²⁺ and 2Cl⁻, so \\(i = 3\\).", "\\(\\Delta T_f = 3 \\times 2.32 = 6.96\\) °C."],
        answer: "6.96 °C",
      },
      practiceSet: [
        { prompt: "What is the van't Hoff factor of a nonelectrolyte?", answer: "1" },
        { prompt: "What is the expected van't Hoff factor of Na₂SO₄ on complete dissociation?", answer: "3" },
        { prompt: "Why is the observed van't Hoff factor of a strong electrolyte often less than expected?", answer: "Oppositely charged ions form ion pairs, which reduces the number of particles" },
        { prompt: "An electrolyte has a formula mass of 120 g mol⁻¹ and an observed molar mass of 60 g mol⁻¹. Find i.", answer: "\\(i = 120/60 = 2\\)" },
      ],
      pyqExampleId: "e0ae56a9-6a98-4487-b613-b784be5aa3f8",
      traps: [
        {
          title: "Counting atoms instead of ions",
          body: "\\(i\\) counts the ions one formula unit gives: Na₃PO₄ gives 3Na⁺ and PO₄³⁻, so 4 particles, not the 8 atoms in its formula.",
        },
        {
          title: "Turning the ratio upside down",
          body: "\\(i\\) is the electrolyte's (observed) value over the nonelectrolyte's (calculated) value, so it is above 1 for dissociation. With molar masses it is the other way: formula mass over observed molar mass.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-electrolyte-equations",
      name: "Colligative equations for electrolytes",
      intuition:
        "Every colligative equation for a nonelectrolyte counts one particle per formula unit. For an electrolyte, multiply by i to count all the particles actually present. Nothing else in the equation changes.",
      definition:
        "- Vapour pressure lowering: \\(\\Delta P = iP_1^0x_2 = i\\dfrac{W_2M_1}{M_2W_1}P_1^0\\).\n" +
        "- Boiling point elevation: \\(\\Delta T_b = iK_bm = i\\dfrac{1000\\,K_bW_2}{M_2W_1}\\).\n" +
        "- Freezing point depression: \\(\\Delta T_f = iK_fm = i\\dfrac{1000\\,K_fW_2}{M_2W_1}\\).\n" +
        "- Osmotic pressure: \\(\\pi = iMRT = i\\dfrac{W_2RT}{M_2V}\\).\n" +
        "- 'Assuming complete dissociation' means take \\(i\\) as the number of ions from one formula unit.",
      formula: {
        label: "Colligative equations with i",
        latex: "\\Delta T_b = iK_bm, \\qquad \\Delta T_f = iK_fm, \\qquad \\pi = iMRT",
      },
      authoredExample: {
        prompt:
          "Assuming complete dissociation, calculate the boiling point of a 0.20 m aqueous solution of MgCl₂. \\(K_b\\) for water is 0.52 K kg mol⁻¹ and pure water boils at 373.15 K.",
        steps: [
          "Given: \\(m = 0.20\\) mol kg⁻¹, \\(K_b = 0.52\\) K kg mol⁻¹, \\(T_b^0 = 373.15\\) K. MgCl₂ gives Mg²⁺ and 2Cl⁻, so \\(i = 3\\).",
          "Formula: \\(\\Delta T_b = iK_bm\\).",
          "Substitution: \\(\\Delta T_b = 3 \\times 0.52\\ \\text{K kg mol}^{-1} \\times 0.20\\ \\text{mol kg}^{-1} = 0.312\\) K.",
          "\\(T_b = 373.15 + 0.312 = 373.46\\) K.",
        ],
        answer: "Boiling point = 373.46 K",
      },
      selfCheckExample: {
        prompt: "Find the osmotic pressure at 300 K of a 0.040 M NaCl solution, assuming complete dissociation. \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹.",
        steps: ["\\(i = 2\\).", "\\(\\pi = iMRT = 2 \\times 0.040 \\times 0.0821 \\times 300 = 1.97\\) atm."],
        answer: "1.97 atm",
      },
      practiceSet: [
        { prompt: "Assuming complete dissociation, find the boiling point elevation of a 0.10 m KNO₃ solution (\\(K_b = 0.52\\) K kg mol⁻¹).", answer: "\\(2 \\times 0.52 \\times 0.10 = 0.104\\) K" },
        { prompt: "Which has the larger freezing point depression, 0.10 m NaCl or 0.060 m CaCl₂, assuming complete dissociation?", answer: "NaCl: \\(2 \\times 0.10 = 0.20\\) against \\(3 \\times 0.060 = 0.18\\)" },
        { prompt: "Write the osmotic pressure equation for an electrolyte solution.", answer: "\\(\\pi = iMRT\\)" },
      ],
      pyqExampleId: "327d3423-02df-4ed9-8819-c3f3e4bf2577",
      traps: [
        {
          title: "Leaving out i",
          body: "For any salt, acid or base in water, put \\(i\\) into the equation. Without it the answer for a solution of NaCl is about half the right value.",
        },
        {
          title: "Concentration of formula units versus particles",
          body: "Compare solutions by \\(i \\times m\\), not by \\(m\\) alone. A more dilute solution of a salt that gives many ions can have the larger colligative property.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-degree-dissociation",
      name: "Van't Hoff factor and degree of dissociation",
      intuition:
        "A weak electrolyte breaks up only partly. If a fraction α of each mole splits into n ions, the particles present are the unsplit part plus the ions made. Count them and you get i; turn it round and the measured i gives you α.",
      definition:
        "- An electrolyte \\(\\text{A}_x\\text{B}_y\\) dissociates as \\(\\text{A}_x\\text{B}_y \\rightleftharpoons x\\,\\text{A}^{y+} + y\\,\\text{B}^{x-}\\).\n" +
        "- **Step 1:** initially 1 mol of \\(\\text{A}_x\\text{B}_y\\) and no ions.\n" +
        "- **Step 2:** if \\(\\alpha\\) is the degree of dissociation, at equilibrium \\((1 - \\alpha)\\) mol remains undissociated, and there are \\(x\\alpha\\) mol of cations and \\(y\\alpha\\) mol of anions.\n" +
        "- **Step 3:** total moles after dissociation \\(= (1 - \\alpha) + x\\alpha + y\\alpha = 1 + \\alpha(x + y - 1) = 1 + \\alpha(n - 1)\\), where \\(n = x + y\\) is the moles of ions from 1 mole of electrolyte.\n" +
        "- **Step 4:** \\(i = \\dfrac{\\text{actual moles of particles after dissociation}}{\\text{moles of formula units dissolved}} = \\dfrac{1 + \\alpha(n - 1)}{1}\\).\n" +
        "- **Step 5:** \\(i = 1 + \\alpha(n - 1)\\), or \\(\\alpha = \\dfrac{i - 1}{n - 1}\\).\n" +
        "- For a binary electrolyte (\\(n = 2\\)), \\(\\alpha = i - 1\\).",
      formula: {
        label: "Van't Hoff factor and degree of dissociation",
        latex: "i = 1 + \\alpha(n - 1), \\qquad \\alpha = \\frac{i - 1}{n - 1}",
      },
      authoredExample: {
        prompt:
          "A 0.020 m aqueous solution of a weak monobasic acid HA freezes at −0.0400 °C. \\(K_f\\) for water is 1.86 K kg mol⁻¹. Calculate the van't Hoff factor and the degree of dissociation.",
        steps: [
          "Given: \\(m = 0.020\\) mol kg⁻¹, \\(K_f = 1.86\\) K kg mol⁻¹, observed \\(\\Delta T_f = 0.0400\\) K.",
          "Expected for no dissociation: \\((\\Delta T_f)_0 = K_fm = 1.86 \\times 0.020 = 0.0372\\) K.",
          "\\(i = \\dfrac{\\Delta T_f}{(\\Delta T_f)_0} = \\dfrac{0.0400}{0.0372} = 1.075\\).",
          "\\(\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^-\\), so \\(n = 2\\) and \\(\\alpha = \\dfrac{i - 1}{n - 1} = \\dfrac{1.075 - 1}{1} = 0.075\\).",
        ],
        answer: "i = 1.075; degree of dissociation 0.075, that is 7.5%",
      },
      selfCheckExample: {
        prompt: "An electrolyte of formula AB₂ is 40% dissociated in water. Find its van't Hoff factor.",
        steps: ["AB₂ gives A²⁺ and 2B⁻, so \\(n = 3\\); \\(\\alpha = 0.40\\).", "\\(i = 1 + 0.40(3 - 1) = 1.8\\)."],
        answer: "i = 1.8",
      },
      practiceSet: [
        { prompt: "What does i become when the electrolyte is completely dissociated (\\(\\alpha = 1\\))?", answer: "\\(i = n\\), the number of ions per formula unit" },
        { prompt: "A binary electrolyte has i = 1.25. Find its degree of dissociation.", answer: "\\(\\alpha = 1.25 - 1 = 0.25\\)" },
        { prompt: "How many ions (n) does one formula unit of Na₃PO₄ give?", answer: "4" },
      ],
      pyqExampleId: "81165d85-91ff-42de-9dc1-8f948cb412e0",
      traps: [
        {
          title: "Using \\(\\alpha = i - 1\\) for every electrolyte",
          body: "That shortcut holds only when \\(n = 2\\). For CaCl₂ (\\(n = 3\\)) use \\(\\alpha = (i - 1)/2\\).",
        },
        {
          title: "A fraction reported as a percentage",
          body: "\\(\\alpha\\) from the formula is a fraction. If the question asks for per cent dissociation, multiply by 100 and say so.",
        },
        {
          title: "Starting the derivation without the mole count",
          body: "Write the initial and equilibrium moles (1, then \\(1 - \\alpha\\), \\(x\\alpha\\), \\(y\\alpha\\)) before adding them. That table is where most of the derivation marks are.",
        },
      ],
    },
  ],
};
