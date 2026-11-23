import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_COLLIGATIVE_NOTE: SubtopicNote = {
  subtopicName: "Colligative Properties of Nonelectrolyte Solutions",
  title: "Colligative Properties and Molality",
  oneLineDefinition:
    "The four properties of a dilute solution that depend only on the number of solute particles, and the concentration units, molality and molarity, they are written in.",
  whyItMatters:
    "7 questions. Four were set in board papers: pick the property that is not colligative (2014), say what a colligative property depends on (2015), find the moles and the molality of a urea solution (2018), and define colligative properties along with isotonic solutions (2025). The textbook adds why molality, not molarity, is used for boiling and freezing points.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccso-colligative-four",
      name: "The four colligative properties",
      intuition:
        "Some properties of a solution do not care what the solute is, only how many particles of it there are. A mole of urea and a mole of glucose in the same mass of water change these properties by exactly the same amount, because each puts the same number of particles in the water.",
      definition:
        "- **Colligative properties** are the physical properties of solutions that depend on the **number of solute particles** in the solution and not on their nature.\n" +
        "- There are four: vapour pressure lowering, boiling point elevation, freezing point depression and osmotic pressure.\n" +
        "- They are studied for relatively dilute solutions, with concentrations of 0.2 M or less.\n" +
        "- Each equation below contains only an amount of solute; the nature of the solvent enters only through its constants \\(P_1^0\\), \\(K_b\\) and \\(K_f\\).",
      table: {
        columns: ["Colligative property", "Equation", "Concentration term"],
        rows: [
          {
            cells: ["Vapour pressure lowering", "\\(\\Delta P = P_1^0x_2\\)", "Mole fraction of solute"],
            pyqExampleId: "4fa6743a-db80-4fa8-995d-d7111b492c89",
            noteAmber: "Board 2014 asked which property is not colligative: vapour pressure itself is not; its lowering is.",
          },
          { cells: ["Boiling point elevation", "\\(\\Delta T_b = K_bm\\)", "Molality"] },
          { cells: ["Freezing point depression", "\\(\\Delta T_f = K_fm\\)", "Molality"] },
          {
            cells: ["Osmotic pressure", "\\(\\pi = MRT\\)", "Molarity"],
            pyqExampleId: "c39b489a-21c4-4cac-8a39-f26c807b0805",
            noteAmber: "Board 2025 asked you to define colligative properties together with isotonic solutions.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Name the four colligative properties.", answer: "Vapour pressure lowering, boiling point elevation, freezing point depression and osmotic pressure" },
        { prompt: "Is the boiling point of a solution a colligative property?", answer: "No. The elevation of the boiling point is" },
        { prompt: "0.1 mol of urea and 0.1 mol of glucose are each dissolved in 1 kg of water. Compare the depressions of freezing point.", answer: "They are equal: both solutions have the same number of solute particles" },
        { prompt: "Up to what concentration are the colligative relations of nonelectrolytes applied in the textbook?", answer: "Dilute solutions of 0.2 M or less" },
      ],
      pyqExampleId: "ca97f915-86c3-4a3e-b35d-c635ad4b5e6d",
      traps: [
        {
          title: "Naming the property, not the change",
          body: "Vapour pressure, boiling point and freezing point belong to any pure liquid, so they are not colligative. Their lowering, elevation and depression, caused by the solute, are.",
        },
        {
          title: "Osmosis is not a colligative property",
          body: "Osmosis is the flow of solvent through a membrane, a process. The colligative property is the osmotic pressure.",
        },
        {
          title: "Number, not nature",
          body: "A definition that says 'depends on the solute' loses the mark. Write 'depends on the number of solute particles and not on their nature'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-molality",
      name: "Molality and molarity",
      intuition:
        "Molality counts moles of solute against a mass of solvent, and masses do not change when you heat or cool. Molarity counts moles against a volume of solution, and volumes swell and shrink with temperature. So when the temperature changes during an experiment, molality is the steady measure to use.",
      definition:
        "- **Molality (m):** the number of moles of solute dissolved in one kilogram of solvent. For \\(W_2\\) g of solute of molar mass \\(M_2\\) in \\(W_1\\) g of solvent, \\(m = \\dfrac{W_2/M_2}{W_1/1000} = \\dfrac{1000\\,W_2}{M_2W_1}\\) mol kg⁻¹.\n" +
        "- **Molarity (M):** the number of moles of solute in one dm³ (litre) of solution.\n" +
        "- Molality is a ratio of masses, so it does not change with temperature. Molarity uses the volume of the solution, which changes with temperature.\n" +
        "- Boiling point elevation and freezing point depression are measured while the temperature changes, so they use **molality**. Osmotic pressure is measured at one constant temperature, so it uses **molarity**.",
      formula: {
        label: "Molality",
        latex: "m = \\frac{\\text{moles of solute}}{\\text{mass of solvent in kg}} = \\frac{1000\\,W_2}{M_2W_1}\\ \\text{mol kg}^{-1}",
      },
      authoredExample: {
        prompt:
          "What mass of glucose (molar mass 180 g mol⁻¹) must be dissolved in 250 g of water to make a solution of molality 0.20 mol kg⁻¹?",
        steps: [
          "Given: \\(m = 0.20\\) mol kg⁻¹, \\(W_1 = 250\\) g \\(= 0.250\\) kg, \\(M_2 = 180\\) g mol⁻¹.",
          "Formula: \\(m = \\dfrac{n_2}{\\text{mass of solvent in kg}}\\), so \\(n_2 = m \\times \\text{mass of solvent in kg}\\).",
          "Substitution: \\(n_2 = 0.20\\ \\text{mol kg}^{-1} \\times 0.250\\ \\text{kg} = 0.050\\) mol.",
          "Mass of glucose: \\(W_2 = n_2M_2 = 0.050\\ \\text{mol} \\times 180\\ \\text{g mol}^{-1} = 9.0\\) g.",
        ],
        answer: "9.0 g of glucose",
      },
      selfCheckExample: {
        prompt: "A 0.40 mol kg⁻¹ solution of a solute in water contains 0.10 mol of the solute. What mass of water does it contain?",
        steps: [
          "Mass of solvent in kg \\(= \\dfrac{n_2}{m} = \\dfrac{0.10}{0.40} = 0.25\\) kg.",
          "That is 250 g of water.",
        ],
        answer: "0.25 kg (250 g) of water",
      },
      practiceSet: [
        { prompt: "What is the unit of molality?", answer: "mol kg⁻¹" },
        { prompt: "Why does the molarity of a solution change when it is heated?", answer: "The volume of the solution changes with temperature; the number of moles does not" },
        { prompt: "Why is molality, not molarity, used in \\(\\Delta T_f = K_fm\\)?", answer: "The temperature changes during the measurement, and molality, a ratio of masses, does not change with temperature" },
      ],
      pyqExampleId: "c7e2ccf9-b068-448a-90fa-07c26a63dafd",
      traps: [
        {
          title: "Dividing by the mass of the solution",
          body: "Molality is per kilogram of solvent, not of solution. Do not add the mass of the solute to the mass of the solvent.",
        },
        {
          title: "Grams left as grams",
          body: "Convert the solvent's mass to kilograms (or keep the factor 1000 in \\(1000\\,W_2/(M_2W_1)\\)). Dividing moles by grams gives an answer a thousand times too small.",
        },
      ],
    },
  ],
};
