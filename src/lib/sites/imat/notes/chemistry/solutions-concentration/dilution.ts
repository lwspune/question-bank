import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_SOL_DILUTION_NOTE: SubtopicNote = {
  subtopicName: "Dilution and Titration",
  title: "Preparing, Diluting, Mixing and Reacting Solutions",
  oneLineDefinition:
    "Adding water spreads the same moles of solute through more volume, and in a reaction between solutions the moles from n = cV follow the equation's ratio.",
  whyItMatters:
    "Dilution appeared in 2021 and in the 2024 ministry paper, which asked how much water to add to reach a lower concentration. A titration with sulfuric acid, answered in g/L, appeared in 2020.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sol-preparing",
      name: "Preparing a solution of known concentration",
      intuition:
        "To make a solution of a chosen concentration, work out the moles you need in the final volume, then the mass of those moles. The solid is dissolved first and then topped up to the mark, because the concentration is per litre of solution, not per litre of water added.",
      definition:
        "- Mass of solute needed: \\(m = c \\times V \\times M\\).\n" +
        "- Method: weigh the solid, dissolve it in **less** water than the final volume, pour it into a **volumetric flask**, rinse the beaker into the flask, add water **up to the mark**, then stopper and invert to mix.\n" +
        "- The volumetric flask fixes the volume of the **solution**. Dissolving the solid in 1 L of water gives slightly more than 1 L of solution, so a slightly lower concentration.",
      formula: {
        label: "Mass of solute needed",
        latex: "m = c \\times V \\times M",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass of solute to weigh, in g" },
          { symbol: "\\(c\\)", meaning: "concentration wanted, in mol/L" },
          { symbol: "\\(V\\)", meaning: "final volume of solution, in L" },
          { symbol: "\\(M\\)", meaning: "molar mass, in g/mol" },
        ],
      },
      authoredExample: {
        prompt:
          "What mass of anhydrous sodium carbonate, \\(\\mathrm{Na_2CO_3}\\) (\\(M = 106\\ \\text{g/mol}\\)), is needed to make 250 mL of a 0.100 mol/L solution?",
        steps: [
          "Moles needed: \\(0.100 \\times 0.250 = 0.0250\\ \\text{mol}\\).",
          "Mass: \\(0.0250 \\times 106 = 2.65\\ \\text{g}\\).",
          "Dissolve it, transfer to a 250 mL volumetric flask and make up to the mark.",
        ],
        answer: "2.65 g",
      },
      selfCheckExample: {
        prompt: "What mass of potassium hydroxide (\\(M = 56\\ \\text{g/mol}\\)) is needed to make 500 mL of a 0.40 mol/L solution?",
        options: ["22.4 g", "0.20 g", "11.2 g", "5.6 g", "112 g"],
        steps: [
          "Moles: \\(0.40 \\times 0.500 = 0.20\\ \\text{mol}\\).",
          "Mass: \\(0.20 \\times 56 = 11.2\\ \\text{g}\\).",
          "A uses a volume of 1 L. B gives the moles, not the mass. D uses 250 mL. E slips a power of ten.",
        ],
        answer: "(C) 11.2 g",
      },
      practiceSet: [
        { prompt: "What mass of NaCl is needed for 100 mL of a 1.0 mol/L solution? (\\(M = 58.5\\))", answer: "5.85 g" },
        { prompt: "What mass of glucose (\\(M = 180\\)) is needed for 1.0 L of a 0.50 mol/L solution?", answer: "90 g" },
        { prompt: "Why is the solid dissolved in a little water first and then made up to the mark?", answer: "So that the final volume of the solution, not of the water, is exact" },
      ],
      traps: [
        {
          title: "Made up to 1 L is not the same as dissolved in 1 L",
          body: "Molarity is per litre of solution. Adding a solid to 1 L of water gives more than 1 L of solution, so the concentration is slightly below the target. Correct preparation always makes the solution up to the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-dilution",
      name: "Dilution: c₁V₁ = c₂V₂",
      intuition:
        "Adding water does not add or remove any solute. The same moles are spread through a larger volume, so the concentration falls by the same factor as the volume grows. Taking a sample out of a solution changes neither: the sample has the concentration of the solution it came from.",
      definition:
        "- On dilution, the **moles of solute stay the same**: \\(c_1V_1 = c_2V_2\\).\n" +
        "- Any volume unit works, as long as both volumes use the same one.\n" +
        "- **Water added** = final volume minus starting volume (assuming the volumes add).\n" +
        "- **Dilution factor** = \\(V_2/V_1\\) = \\(c_1/c_2\\). In a two-step dilution, multiply the factors.\n" +
        "- Taking a portion (an **aliquot**) with a pipette does not change the concentration.",
      formula: {
        label: "Dilution",
        latex: "c_1 V_1 = c_2 V_2",
        symbols: [
          { symbol: "\\(c_1, V_1\\)", meaning: "concentration and volume before adding water" },
          { symbol: "\\(c_2, V_2\\)", meaning: "concentration and total volume after" },
        ],
      },
      authoredExample: {
        prompt: "20 mL of 2.0 mol/L hydrochloric acid is diluted to 0.50 mol/L. What is the final volume, and how much water is added?",
        steps: [
          "\\(V_2 = c_1V_1/c_2 = 2.0 \\times 20/0.50 = 80\\ \\text{mL}\\).",
          "Water added: \\(80 - 20 = 60\\ \\text{mL}\\).",
        ],
        answer: "Final volume 80 mL; 60 mL of water added",
      },
      selfCheckExample: {
        prompt:
          "50 mL of a 1.2 mol/L solution is placed in a 200 mL volumetric flask and made up to the mark with water. A pipette then transfers 10 mL of this solution to a beaker. What is the concentration of the solution in the beaker?",
        options: ["0.30 mol/L", "1.2 mol/L", "0.060 mol/L", "0.015 mol/L", "4.8 mol/L"],
        steps: [
          "Dilution in the flask: \\(c_2 = 1.2 \\times 50/200 = 0.30\\ \\text{mol/L}\\).",
          "Taking 10 mL out does not change the concentration: it is still 0.30 mol/L.",
          "B ignores the dilution. C and D treat the 10 mL transfer as another dilution. E multiplies by the factor instead of dividing.",
        ],
        answer: "(A) 0.30 mol/L",
      },
      practiceSet: [
        { prompt: "What volume of 5.0 mol/L stock is needed to make 250 mL of 0.20 mol/L solution?", answer: "10 mL" },
        { prompt: "100 mL of 0.60 mol/L solution is diluted to 300 mL. What is the new concentration?", answer: "0.20 mol/L" },
        { prompt: "How much water must be added to 25 mL of 0.40 mol/L solution to make it 0.10 mol/L?", answer: "75 mL", method: "Final volume 100 mL" },
      ],
      traps: [
        {
          title: "Water added is not the final volume",
          body: "\\(c_1V_1 = c_2V_2\\) gives the final volume. If the question asks how much water to add, subtract the starting volume. The final volume itself is usually one of the wrong options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-mixing",
      name: "Mixing two solutions of the same solute",
      intuition:
        "When two solutions are poured together, nothing reacts and nothing is lost: the moles of solute add up, and so do the volumes. The new concentration is the total moles over the total volume, which always lies between the two starting concentrations.",
      definition:
        "- Moles add: \\(n = c_1V_1 + c_2V_2\\). Volumes add: \\(V = V_1 + V_2\\) (a good approximation for dilute solutions).\n" +
        "- The result lies between \\(c_1\\) and \\(c_2\\). It is their simple average only when the volumes are equal.\n" +
        "- If two different solutes are mixed, each one is diluted by the total volume. For an ion that comes from both, add its moles from each source.",
      formula: {
        label: "Concentration after mixing",
        latex: "c = \\frac{c_1V_1 + c_2V_2}{V_1 + V_2}",
        symbols: [
          { symbol: "\\(c_1, V_1\\)", meaning: "first solution" },
          { symbol: "\\(c_2, V_2\\)", meaning: "second solution" },
        ],
      },
      authoredExample: {
        prompt: "100 mL of 0.50 mol/L sodium chloride is mixed with 300 mL of 0.10 mol/L sodium chloride. What is the concentration of the mixture?",
        steps: [
          "Moles: \\(0.50 \\times 0.100 + 0.10 \\times 0.300 = 0.050 + 0.030 = 0.080\\ \\text{mol}\\).",
          "Volume: \\(0.400\\ \\text{L}\\). Concentration: \\(0.080/0.400 = 0.20\\ \\text{mol/L}\\).",
          "The simple average, 0.30 mol/L, is wrong because there is more of the weaker solution.",
        ],
        answer: "0.20 mol/L",
      },
      selfCheckExample: {
        prompt:
          "200 mL of 0.30 mol/L potassium chloride is mixed with 200 mL of 0.10 mol/L potassium sulfate, \\(\\mathrm{K_2SO_4}\\). What is the concentration of potassium ions in the mixture?",
        options: ["0.20 mol/L", "0.40 mol/L", "0.50 mol/L", "0.15 mol/L", "0.25 mol/L"],
        steps: [
          "\\(\\mathrm{K^+}\\) from KCl: \\(0.30 \\times 0.200 = 0.060\\ \\text{mol}\\). From \\(\\mathrm{K_2SO_4}\\): \\(2 \\times 0.10 \\times 0.200 = 0.040\\ \\text{mol}\\).",
          "Total: 0.100 mol in 0.400 L, so 0.25 mol/L.",
          "A averages the two salt concentrations. B and C add concentrations without allowing for the larger volume. D forgets the potassium sulfate.",
        ],
        answer: "(E) 0.25 mol/L",
      },
      practiceSet: [
        { prompt: "Equal volumes of 1.0 mol/L and 0.20 mol/L glucose are mixed. What is the concentration?", answer: "0.60 mol/L" },
        { prompt: "50 mL of 0.20 mol/L NaCl is mixed with 50 mL of water. What is the concentration?", answer: "0.10 mol/L" },
        { prompt: "100 mL of 0.10 mol/L NaCl is mixed with another 100 mL of 0.10 mol/L NaCl. What is the concentration?", answer: "0.10 mol/L", method: "Same concentration in, same out" },
      ],
      traps: [
        {
          title: "Concentrations do not add",
          body: "Mixing 0.1 mol/L with 0.1 mol/L gives 0.1 mol/L, not 0.2. Add moles and volumes separately, then divide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-titration",
      name: "Reacting volumes and titration",
      intuition:
        "In a titration, one solution is added from a burette until it has exactly reacted with a measured volume of the other. At that point the moles have met in the ratio of the balanced equation. Knowing one concentration, both volumes and the ratio gives the unknown concentration.",
      definition:
        "- Moles of the known solution: \\(n = cV\\).\n" +
        "- Use the **coefficients** of the balanced equation to get the moles of the other substance.\n" +
        "- Divide by its volume (in litres) for its concentration; multiply by its molar mass for g/L.\n" +
        "- The **equivalence point** is where the reactants have exactly reacted; an **indicator** shows it by a colour change.\n" +
        "- A **diprotic** acid such as \\(\\mathrm{H_2SO_4}\\) neutralises two moles of NaOH per mole.",
      formula: {
        label: "At the equivalence point",
        latex: "\\frac{c_A V_A}{a} = \\frac{c_B V_B}{b}",
        symbols: [
          { symbol: "\\(c_A, V_A\\)", meaning: "concentration and volume of solution A" },
          { symbol: "\\(a, b\\)", meaning: "coefficients of A and B in the balanced equation" },
        ],
      },
      authoredExample: {
        prompt:
          "25.0 mL of barium hydroxide solution is exactly neutralised by 20.0 mL of 0.150 mol/L hydrochloric acid: \\(\\mathrm{Ba(OH)_2} + 2\\mathrm{HCl} \\rightarrow \\mathrm{BaCl_2} + 2\\mathrm{H_2O}\\). What is the concentration of the barium hydroxide?",
        steps: [
          "Moles of HCl: \\(0.150 \\times 0.0200 = 0.00300\\ \\text{mol}\\).",
          "Ratio 1 : 2, so \\(\\mathrm{Ba(OH)_2}\\): \\(0.00300/2 = 0.00150\\ \\text{mol}\\).",
          "Concentration: \\(0.00150/0.0250 = 0.060\\ \\text{mol/L}\\).",
        ],
        answer: "0.060 mol/L",
      },
      selfCheckExample: {
        prompt:
          "What volume of 0.50 mol/L hydrochloric acid reacts exactly with 1.06 g of sodium carbonate? \\(\\mathrm{Na_2CO_3} + 2\\mathrm{HCl} \\rightarrow 2\\mathrm{NaCl} + \\mathrm{H_2O} + \\mathrm{CO_2}\\) (\\(M(\\mathrm{Na_2CO_3}) = 106\\ \\text{g/mol}\\))",
        options: ["10 mL", "20 mL", "80 mL", "40 mL", "4.0 mL"],
        steps: [
          "Moles of \\(\\mathrm{Na_2CO_3}\\): \\(1.06/106 = 0.0100\\ \\text{mol}\\), so HCl: 0.0200 mol.",
          "Volume: \\(0.0200/0.50 = 0.040\\ \\text{L} = 40\\ \\text{mL}\\).",
          "B ignores the 1 : 2 ratio. A applies it the wrong way round. C doubles twice. E slips a power of ten in converting litres to millilitres.",
        ],
        answer: "(D) 40 mL",
      },
      practiceSet: [
        { prompt: "How many moles of NaOH are in 25 mL of 0.20 mol/L solution?", answer: "0.0050 mol" },
        { prompt: "What volume of 0.10 mol/L NaOH neutralises 10 mL of 0.10 mol/L \\(\\mathrm{H_2SO_4}\\)?", answer: "20 mL", method: "Two NaOH per \\(\\mathrm{H_2SO_4}\\)" },
        { prompt: "20 mL of hydrochloric acid neutralises 25 mL of 0.080 mol/L NaOH. What is the acid's concentration?", answer: "0.10 mol/L", method: "Ratio 1 : 1" },
      ],
      traps: [
        {
          title: "Check the ratio before using c₁V₁ = c₂V₂",
          body: "The dilution formula only works for reactions in a 1 : 1 ratio. Sulfuric acid needs twice its moles of sodium hydroxide, and a carbonate needs twice its moles of hydrochloric acid. Use the coefficients of the balanced equation.",
        },
      ],
    },
  ],
};
