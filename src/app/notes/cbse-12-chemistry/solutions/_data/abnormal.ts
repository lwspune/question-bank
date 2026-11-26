import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_ABNORMAL_NOTE: SubtopicNote = {
  subtopicName: "Abnormal Molar Masses",
  title: "Abnormal Molar Masses and the van't Hoff Factor",
  oneLineDefinition:
    "Why dissociation and association give a molar mass lower or higher than the true one, the van't Hoff factor i, the colligative formulas with i, and how i gives the degree of dissociation or association.",
  whyItMatters:
    "37 questions. Thirty were set in board papers, in every year from 2023 to 2026. The board asks the van't Hoff factor for complete dissociation, for complete dimerisation or tetramerisation and for hydrated salts (2023, 2024); which 1.0 M solution shows the largest depression (2023); the boiling or freezing point of an electrolyte solution assuming complete dissociation (2024, 2025, 2026); the osmotic pressure of a potassium sulphate solution (2023, 2026) and the mass of CaCl₂ for a given osmotic pressure (2026); the percentage association of acetic acid in benzene (2023, the same question again in 2025) and of benzoic acid (2023); the percentage dissociation of NaOH from its abnormal molar mass (2025, in two sets with different numbers); and in 2026 the boiling point and the vapour pressure of solutions of dimerised benzoic acid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcso-vant-hoff",
      name: "The van't Hoff factor",
      intuition:
        "Colligative properties count particles. One mole of KCl in water gives two moles of ions, so it lowers the freezing point about twice as much as one mole of glucose. If you did not know about the ions, you would think KCl's molar mass is about half its real value. Molecules that pair up do the opposite. The van't Hoff factor i is the correction: how many particles you really have for each one you put in.",
      definition:
        "- **Abnormal molar mass:** a molar mass found from a colligative property that is lower or higher than the expected value. Dissociation gives a LOWER molar mass; association gives a HIGHER one.\n" +
        "- **van't Hoff factor:** \\(i = \\dfrac{\\text{normal molar mass}}{\\text{abnormal molar mass}} = \\dfrac{\\text{observed colligative property}}{\\text{calculated colligative property}} = \\dfrac{\\text{total moles of particles after association or dissociation}}{\\text{moles of particles before}}\\).\n" +
        "- Association: \\(i < 1\\) (ethanoic acid in benzene, nearly 0.5, because its molecules dimerise through hydrogen bonds). Dissociation: \\(i > 1\\) (aqueous KCl, close to 2).\n" +
        "- For complete dissociation count the ions released: NaCl and KCl 2, K₂SO₄ 3, MgSO₄ 2. Water of crystallisation joins the solvent and is not counted, and a polyatomic ion such as SO₄²⁻ is one particle.\n" +
        "- Real values are a little below these at ordinary concentrations (KCl 1.85 at 0.1 m) and approach them as the solution becomes very dilute.",
      formula: {
        label: "van't Hoff factor",
        latex: "i = \\frac{\\text{normal molar mass}}{\\text{abnormal molar mass}} = \\frac{\\text{observed colligative property}}{\\text{calculated colligative property}}",
      },
      authoredExample: {
        prompt: "The molar mass of KCl found from the depression of freezing point of its 0.1 m aqueous solution is 40.3 g mol⁻¹. The normal molar mass of KCl is 74.5 g mol⁻¹. Calculate the van't Hoff factor and say what it shows.",
        steps: [
          "Formula: \\(i = \\dfrac{\\text{normal molar mass}}{\\text{abnormal molar mass}}\\).",
          "Substitution: \\(i = \\dfrac{74.5}{40.3} = 1.85\\).",
          "\\(i > 1\\), so KCl dissociates; it is a little below 2 because dissociation is not complete at this concentration.",
        ],
        answer: "i = 1.85; KCl dissociates into ions",
      },
      selfCheckExample: {
        prompt: "What is the van't Hoff factor for sodium phosphate, Na₃PO₄, in water, assuming complete dissociation?",
        steps: ["Na₃PO₄ gives three Na⁺ ions and one PO₄³⁻ ion.", "The phosphate ion counts once, so there are four particles per formula unit."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "When a solute associates in a solvent, is its abnormal molar mass higher or lower than the normal value?", answer: "Higher: fewer particles give a smaller colligative property, so the calculated molar mass comes out larger" },
        { prompt: "A solute trimerises completely in a solvent. What is its van't Hoff factor?", answer: "\\(\\dfrac{1}{3}\\), about 0.33" },
        { prompt: "Why is the van't Hoff factor of ethanoic acid in benzene close to 0.5?", answer: "Its molecules dimerise in benzene through hydrogen bonding, halving the number of particles" },
      ],
      pyqExampleId: "75ff0154-c867-4bb0-9cfd-cfcf9159d727",
      traps: [
        {
          title: "Counting the water of crystallisation",
          body: "The water in a hydrated salt becomes part of the solvent when it dissolves. Count only the ions the salt releases.",
        },
        {
          title: "Counting atoms instead of ions",
          body: "SO₄²⁻ is one particle, not five. Write the ions the salt releases and count each polyatomic ion once.",
        },
        {
          title: "Calling i for association negative or zero",
          body: "i is a ratio of two counts, so it is always positive. For association it lies between 0 and 1; for dissociation it is more than 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-ionic-colligative",
      name: "Colligative properties of electrolytes",
      intuition:
        "Every colligative formula counts moles of particles. For an electrolyte, multiply the moles of solute by i before you use any of the four formulas. Everything else stays as it was.",
      definition:
        "- Relative lowering of vapour pressure: \\(\\dfrac{p_1^{\\circ} - p_1}{p_1^{\\circ}} = \\dfrac{i\\,n_2}{n_1}\\).\n" +
        "- Elevation of boiling point: \\(\\Delta T_b = i\\,K_b\\,m\\).\n" +
        "- Depression of freezing point: \\(\\Delta T_f = i\\,K_f\\,m\\).\n" +
        "- Osmotic pressure: \\(\\pi = \\dfrac{i\\,n_2RT}{V} = i\\,CRT\\).\n" +
        "- \"Assuming complete dissociation\" in a question tells you to take i as the number of ions per formula unit.",
      formula: {
        label: "Colligative formulas with i",
        latex: "\\Delta T_b = i\\,K_b\\,m, \\qquad \\Delta T_f = i\\,K_f\\,m, \\qquad \\pi = i\\,CRT",
      },
      authoredExample: {
        prompt: "5.85 g of NaCl (molar mass 58.5 g mol⁻¹) is dissolved in 500 g of water. Assuming complete dissociation, find the freezing point of the solution. (\\(K_f\\) for water = 1.86 K kg mol⁻¹)",
        steps: [
          "NaCl gives Na⁺ and Cl⁻, so \\(i = 2\\).",
          "Molality: \\(m = \\dfrac{5.85/58.5}{0.500} = \\dfrac{0.10}{0.500} = 0.20\\) mol kg⁻¹.",
          "Formula: \\(\\Delta T_f = i\\,K_f\\,m = 2 \\times 1.86 \\times 0.20 = 0.744\\) K.",
          "\\(T_f = 273.15 - 0.744 = 272.41\\) K, that is −0.744 °C.",
        ],
        answer: "272.41 K (−0.744 °C)",
      },
      selfCheckExample: {
        prompt: "Find the osmotic pressure of a 0.010 M solution of K₂SO₄ at 300 K, assuming complete dissociation. (R = 0.083 L bar K⁻¹ mol⁻¹)",
        steps: ["K₂SO₄ gives 3 ions, so \\(i = 3\\).", "\\(\\pi = i\\,CRT = 3 \\times 0.010 \\times 0.083 \\times 300\\)."],
        answer: "0.747 bar",
      },
      practiceSet: [
        { prompt: "Arrange 0.1 m glucose, 0.1 m NaCl and 0.1 m CaCl₂ in water in order of increasing freezing point.", answer: "CaCl₂ < NaCl < glucose (most particles freeze lowest)" },
        { prompt: "How many times the elevation of a 1 m glucose solution is that of a 1 m MgSO₄ solution, assuming complete dissociation?", answer: "Two times, since MgSO₄ gives 2 ions" },
        { prompt: "Write the relative lowering of vapour pressure of a solution of an electrolyte with van't Hoff factor i.", answer: "\\(\\dfrac{p_1^{\\circ} - p_1}{p_1^{\\circ}} = \\dfrac{i\\,n_2}{n_1}\\)" },
      ],
      pyqExampleId: "bec2a2b9-0948-4e3f-8ade-022c1e6275d8",
      traps: [
        {
          title: "Leaving out i",
          body: "\"Assuming complete dissociation\" is in the question to make you use i. Without it the answer is too small by the factor i, and a wrong option is usually built from that.",
        },
        {
          title: "Getting the number of ions wrong",
          body: "MgBr₂ gives one Mg²⁺ and two Br⁻; Al₂(SO₄)₃ gives two Al³⁺ and three SO₄²⁻. Write the dissociation equation and count the ions before you choose i.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-degree",
      name: "Degree of dissociation and association from i",
      intuition:
        "If only some of the solute splits up, i lies between 1 and the full number of ions. If only some of it pairs up, i lies between 1 and one half. Count the particles at equilibrium from 1 mole of solute and you get i in terms of the degree of dissociation or association; then turn it round.",
      definition:
        "- **Dissociation** of one unit into n particles, degree α: from 1 mol, \\(1 - \\alpha\\) mol stays whole and \\(n\\alpha\\) mol of particles form. So \\(i = 1 + (n - 1)\\alpha\\) and \\(\\alpha = \\dfrac{i - 1}{n - 1}\\).\n" +
        "- **Association** of n molecules into one, degree α: from 1 mol, \\(1 - \\alpha\\) mol stays single and \\(\\alpha/n\\) mol of associated molecules form. So \\(i = 1 - \\alpha\\left(1 - \\dfrac{1}{n}\\right)\\) and \\(\\alpha = \\dfrac{1 - i}{1 - 1/n}\\). For a dimer, \\(\\alpha = 2(1 - i)\\).\n" +
        "- The usual route: find i from the measured property (\\(i = \\dfrac{\\text{observed}}{\\text{calculated}}\\)) or from the molar masses (\\(i = \\dfrac{\\text{normal}}{\\text{abnormal}}\\)), then use the formula for α. Multiply by 100 for a percentage.\n" +
        "- For a weak acid HA (\\(n = 2\\)), \\(\\alpha = i - 1\\), and then \\(K_a = \\dfrac{C\\alpha^2}{1 - \\alpha}\\).",
      formula: {
        label: "Degree of dissociation and association",
        latex: "\\alpha_{\\text{diss}} = \\frac{i - 1}{n - 1}, \\qquad \\alpha_{\\text{assoc}} = \\frac{1 - i}{1 - \\frac{1}{n}}",
      },
      authoredExample: {
        prompt: "A 0.10 m aqueous solution of a weak monobasic acid HA freezes at −0.205 °C. Find the van't Hoff factor and the percentage dissociation of the acid. (\\(K_f\\) for water = 1.86 K kg mol⁻¹)",
        steps: [
          "Observed depression: \\(\\Delta T_f = 0.205\\) K.",
          "Calculated (no dissociation): \\(\\Delta T_f = K_f\\,m = 1.86 \\times 0.10 = 0.186\\) K.",
          "\\(i = \\dfrac{0.205}{0.186} = 1.102\\).",
          "HA gives H⁺ and A⁻, so \\(n = 2\\): \\(\\alpha = \\dfrac{i - 1}{n - 1} = \\dfrac{1.102 - 1}{1} = 0.102\\).",
          "Percentage dissociation = 10.2%.",
        ],
        answer: "i = 1.102; 10.2% dissociated",
      },
      selfCheckExample: {
        prompt: "A solute dimerises in benzene and its van't Hoff factor is 0.55. Find the degree of association.",
        steps: ["For a dimer \\(n = 2\\): \\(\\alpha = \\dfrac{1 - 0.55}{1 - 1/2} = \\dfrac{0.45}{0.5}\\)."],
        answer: "0.90, that is 90% associated",
      },
      practiceSet: [
        { prompt: "An electrolyte A₂B is 50% dissociated in water. What is its van't Hoff factor?", answer: "\\(n = 3\\): \\(i = 1 + (3 - 1) \\times 0.5 = 2.0\\)" },
        { prompt: "What is n for an electrolyte A₂B₃ that dissociates into its ions?", answer: "5 (two cations and three anions)" },
        { prompt: "A solute is completely associated into dimers. What are α and i?", answer: "α = 1 and i = 0.5" },
      ],
      pyqExampleId: "da41e89b-7de8-47b7-a48c-daf9fed03280",
      traps: [
        {
          title: "Forgetting to divide by one half for a dimer",
          body: "For a dimer \\(\\alpha = \\dfrac{1 - i}{1/2}\\), which doubles \\(1 - i\\). Stopping at \\(1 - i\\) gives half the right answer, and the board offers that number as an option.",
        },
        {
          title: "Using the dissociation formula for association",
          body: "Decide first whether i is above 1 (dissociation) or below 1 (association), then pick the formula. A negative α is the sign you used the wrong one.",
        },
        {
          title: "Inverting the molar mass ratio",
          body: "\\(i = \\dfrac{\\text{normal}}{\\text{abnormal}}\\). Dissociation makes the measured molar mass smaller than the formula mass, so i must come out above 1.",
        },
      ],
    },
  ],
};
