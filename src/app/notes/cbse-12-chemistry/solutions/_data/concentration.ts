import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_CONCENTRATION_NOTE: SubtopicNote = {
  subtopicName: "Expressing Concentration of Solutions",
  title: "Concentration: Percentage, Mole Fraction, Molality and Molarity",
  oneLineDefinition:
    "The ways of stating how much solute a solution holds (mass and volume percentage, ppm, mole fraction, molality and molarity) and how to change one into another using molar mass and density.",
  whyItMatters:
    "20 questions. One was set in a board paper: the mole fraction of the solute in a 2.0 molal aqueous solution (2026). The rest are the NCERT chapter's examples and exercises: mass percentage, ppm, the mole fraction of a component, the molality and molarity of a solution, and changing a percentage into a molarity with the density. Every colligative numerical later in the chapter starts with one of these conversions, so the marks for them are won or lost here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcso-percent",
      name: "Mass percentage, volume percentage and parts per million",
      intuition:
        "A percentage compares the solute with the whole solution, never with the solvent alone. For very small amounts, such as a pollutant in water, per hundred gives awkward numbers, so we count per million parts instead.",
      definition:
        "- **Mass percentage (w/w):** \\(\\dfrac{\\text{mass of the component}}{\\text{total mass of the solution}} \\times 100\\). A 10% glucose solution by mass has 10 g of glucose in 100 g of solution, that is in 90 g of water.\n" +
        "- **Volume percentage (V/V):** \\(\\dfrac{\\text{volume of the component}}{\\text{total volume of the solution}} \\times 100\\). Used for liquids: a 35% (v/v) solution of ethylene glycol is used as an antifreeze in car engines.\n" +
        "- **Mass by volume percentage (w/V):** mass of solute in grams in 100 mL of solution. Used in medicine and pharmacy.\n" +
        "- **Parts per million (ppm):** \\(\\dfrac{\\text{parts of the component}}{\\text{total parts of all components}} \\times 10^{6}\\). Used for trace amounts, such as pollutants in water or air.\n" +
        "- Mass percentage and ppm do not depend on temperature, because masses do not change with temperature.",
      formula: {
        label: "Mass percentage and ppm",
        latex: "\\text{mass } \\% = \\frac{w_{\\text{component}}}{w_{\\text{solution}}} \\times 100, \\qquad \\text{ppm} = \\frac{w_{\\text{component}}}{w_{\\text{solution}}} \\times 10^{6}",
      },
      authoredExample: {
        prompt: "12 g of sugar is dissolved in 138 g of water. Calculate the mass percentage of sugar in the solution.",
        steps: [
          "Given: mass of sugar = 12 g, mass of water = 138 g.",
          "Mass of solution = 12 + 138 = 150 g.",
          "Formula: mass % = \\(\\dfrac{\\text{mass of sugar}}{\\text{mass of solution}} \\times 100\\).",
          "Substitution: mass % = \\(\\dfrac{12}{150} \\times 100 = 8\\%\\).",
          "Mass percentage of water = 100 − 8 = 92%.",
        ],
        answer: "Sugar 8% by mass (water 92%)",
      },
      selfCheckExample: {
        prompt: "A 500 g sample of water contains 0.002 g of fluoride. Express the fluoride content in ppm.",
        steps: ["ppm = \\(\\dfrac{0.002}{500} \\times 10^{6}\\).", "= 4 ppm."],
        answer: "4 ppm",
      },
      practiceSet: [
        { prompt: "5 g of salt is dissolved in 45 g of water. What is the mass percentage of salt?", answer: "\\(\\dfrac{5}{50} \\times 100 = 10\\%\\)" },
        { prompt: "25 mL of ethanol is made up to 100 mL of solution with water. State its concentration as a volume percentage.", answer: "25% (v/v)" },
        { prompt: "Name two ways of stating concentration that do not change with temperature.", answer: "Any two of mass percentage, ppm, mole fraction and molality" },
      ],
      pyqExampleId: "796d39fc-0680-4afd-87cb-b6d93f5aa374",
      traps: [
        {
          title: "Dividing by the mass of the solvent",
          body: "Mass percentage is taken over the mass of the SOLUTION, solute plus solvent. Dividing by the solvent's mass alone gives too large a percentage.",
        },
        {
          title: "Averaging percentages when two solutions are mixed",
          body: "When two solutions of different strength are mixed, add the masses of solute and add the masses of solution, then divide. The plain average of the two percentages is right only when the two masses are equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-mole-fraction",
      name: "Mole fraction and molality",
      intuition:
        "Colligative properties count particles, so the most useful concentrations count moles. Mole fraction is a share of all the moles present. Molality counts moles of solute against the mass of the solvent; since masses do not change on heating, molality stays the same at any temperature.",
      definition:
        "- **Mole fraction:** \\(x_A = \\dfrac{n_A}{n_A + n_B}\\) for a binary solution of A and B. It has no unit, and \\(x_A + x_B = 1\\).\n" +
        "- **Molality (m):** moles of solute dissolved in 1 kg of SOLVENT. \\(m = \\dfrac{n_{\\text{solute}}}{\\text{mass of solvent in kg}} = \\dfrac{w_2 \\times 1000}{M_2 \\times w_1}\\) with \\(w_1\\) in grams. Unit: mol kg⁻¹.\n" +
        "- Mass percentage, ppm, mole fraction and molality do not depend on temperature. Molarity does, because volume changes with temperature.\n" +
        "- To find a mole fraction from a molality, take 1 kg of solvent: it holds m mol of solute and \\(1000/M_1\\) mol of solvent (55.56 mol for water).",
      formula: {
        label: "Mole fraction and molality",
        latex: "x_A = \\frac{n_A}{n_A + n_B}, \\qquad m = \\frac{n_{\\text{solute}}}{\\text{mass of solvent (kg)}}",
        symbols: [
          { symbol: "\\(n_A, n_B\\)", meaning: "moles of A and of B" },
          { symbol: "\\(w_1, w_2\\)", meaning: "mass of solvent and of solute in grams" },
          { symbol: "\\(M_2\\)", meaning: "molar mass of the solute" },
        ],
      },
      authoredExample: {
        prompt: "9.0 g of glucose (molar mass 180 g mol⁻¹) is dissolved in 250 g of water. Calculate (a) the molality of the solution and (b) the mole fraction of glucose.",
        steps: [
          "Given: \\(w_2 = 9.0\\) g, \\(M_2 = 180\\) g mol⁻¹, \\(w_1 = 250\\) g = 0.250 kg.",
          "Moles of glucose: \\(n_2 = \\dfrac{9.0}{180} = 0.050\\) mol.",
          "(a) Formula: \\(m = \\dfrac{n_2}{\\text{mass of water in kg}} = \\dfrac{0.050}{0.250} = 0.20\\) mol kg⁻¹.",
          "(b) Moles of water: \\(n_1 = \\dfrac{250}{18} = 13.89\\) mol.",
          "\\(x_2 = \\dfrac{n_2}{n_1 + n_2} = \\dfrac{0.050}{13.89 + 0.050} = 3.59 \\times 10^{-3}\\).",
        ],
        answer: "(a) 0.20 mol kg⁻¹; (b) 3.59 × 10⁻³",
      },
      selfCheckExample: {
        prompt: "46 g of ethanol (molar mass 46 g mol⁻¹) is mixed with 36 g of water. Find the mole fraction of ethanol.",
        steps: ["Moles of ethanol = 46/46 = 1 mol; moles of water = 36/18 = 2 mol.", "\\(x_{\\text{ethanol}} = \\dfrac{1}{1 + 2} = 0.333\\)."],
        answer: "0.333",
      },
      practiceSet: [
        { prompt: "0.30 mol of urea is dissolved in 1.5 kg of water. What is the molality?", answer: "0.20 mol kg⁻¹" },
        { prompt: "In a binary solution the mole fraction of the solvent is 0.92. What is the mole fraction of the solute?", answer: "0.08, because the two mole fractions add to 1" },
        { prompt: "Why is molality preferred to molarity for work over a range of temperature?", answer: "Molality uses the mass of the solvent, which does not change with temperature; molarity uses the volume of the solution, which does" },
      ],
      pyqExampleId: "624c82e9-05d3-4290-bb0a-85b782938603",
      traps: [
        {
          title: "Dividing by the solvent's moles alone",
          body: "A mole fraction is moles of the component over the TOTAL moles. Leaving the solute out of the denominator gives a slightly larger number, and the board offers that number as a wrong option.",
        },
        {
          title: "Using the mass of the solution in molality",
          body: "Molality is per kilogram of SOLVENT. In a 10% solution by mass, 100 g of solution holds 90 g of solvent, and it is the 90 g that goes into the formula.",
        },
        {
          title: "Leaving the solvent mass in grams",
          body: "Divide the moles of solute by the solvent's mass in kilograms, or multiply by 1000 and divide by grams. Forgetting this makes the molality 1000 times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-molarity",
      name: "Molarity, dilution and using the density",
      intuition:
        "Molarity is what a laboratory makes: weigh the solute, put it in a flask and add solvent up to the mark. It counts moles per litre of SOLUTION. A percentage by mass tells you masses only, so to reach a molarity you need the density, which turns the mass of the solution into its volume.",
      definition:
        "- **Molarity (M):** moles of solute dissolved in 1 litre of SOLUTION. \\(M = \\dfrac{n_{\\text{solute}}}{V \\text{ in L}} = \\dfrac{w_2 \\times 1000}{M_2 \\times V \\text{ in mL}}\\). Unit: mol L⁻¹, written M.\n" +
        "- Molarity changes with temperature, because the volume of a solution changes with temperature.\n" +
        "- **Dilution:** adding solvent leaves the moles of solute unchanged, so \\(M_1V_1 = M_2V_2\\).\n" +
        "- **From a mass percentage and density:** take 100 g of solution. Moles of solute = mass of solute / molar mass. Volume of solution = 100 g / density. Then \\(M = \\dfrac{\\text{moles}}{\\text{volume in L}}\\).\n" +
        "- For molality from the same data, divide the same moles by the mass of SOLVENT in kg.",
      formula: {
        label: "Molarity and dilution",
        latex: "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}\\,(\\text{L})}, \\qquad M_1V_1 = M_2V_2, \\qquad V = \\frac{\\text{mass}}{\\text{density}}",
      },
      authoredExample: {
        prompt: "A solution of sodium hydroxide is 20% NaOH by mass and has a density of 1.2 g mL⁻¹. Calculate its molarity and its molality. (Molar mass of NaOH = 40 g mol⁻¹)",
        steps: [
          "Take 100 g of solution: it has 20 g of NaOH and 80 g of water.",
          "Moles of NaOH: \\(n = \\dfrac{20}{40} = 0.50\\) mol.",
          "Volume of solution: \\(V = \\dfrac{100\\ \\text{g}}{1.2\\ \\text{g mL}^{-1}} = 83.33\\) mL = 0.08333 L.",
          "Molarity: \\(M = \\dfrac{0.50}{0.08333} = 6.0\\) mol L⁻¹.",
          "Molality: \\(m = \\dfrac{0.50}{0.080\\ \\text{kg}} = 6.25\\) mol kg⁻¹.",
        ],
        answer: "Molarity 6.0 M; molality 6.25 mol kg⁻¹",
      },
      selfCheckExample: {
        prompt: "5.6 g of KOH (molar mass 56 g mol⁻¹) is dissolved in water to make 500 mL of solution. Find the molarity.",
        steps: ["Moles of KOH = 5.6/56 = 0.10 mol.", "\\(M = \\dfrac{0.10}{0.500} = 0.20\\) M."],
        answer: "0.20 M",
      },
      practiceSet: [
        { prompt: "50 mL of 2.0 M HCl is diluted with water to 250 mL. What is the new molarity?", answer: "\\(\\dfrac{2.0 \\times 50}{250} = 0.40\\) M" },
        { prompt: "What mass of NaCl (molar mass 58.5 g mol⁻¹) is needed to make 250 mL of a 0.20 M solution?", answer: "0.050 mol × 58.5 = 2.925 g" },
        { prompt: "Why does the molarity of a solution change when it is warmed?", answer: "The volume of the solution increases on warming while the moles of solute stay the same, so moles per litre fall" },
      ],
      pyqExampleId: "89dd0c75-c1a8-4581-a02b-7c4c517f23c6",
      traps: [
        {
          title: "Taking the mass of solution as its volume",
          body: "100 g of solution is 100 mL only when the density is 1 g mL⁻¹. When a density is given, divide the mass by the density to get the volume.",
        },
        {
          title: "Using the volume of the solvent",
          body: "Molarity is per litre of SOLUTION. 250 mL of a solution made up in a flask is not 250 mL of solvent added to the solute.",
        },
      ],
    },
  ],
};
