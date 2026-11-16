import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SO_COLLIGATIVE_NOTE: SubtopicNote = {
  subtopicName: "Colligative Properties",
  title: "Colligative Properties",
  oneLineDefinition:
    "Properties that depend only on the number of solute particles: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure, with the van 't Hoff factor for solutes that dissociate or associate.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025. One ranks solutions of 10 g of glucose, urea and sucrose in 250 mL by osmotic pressure (2021), one finds the temperature from the slope of a plot of osmotic pressure against concentration (NEET 2024), one finds the mass of glucose isotonic with a 15 g/L urea solution (Re-NEET 2024), and one picks the highest boiling point among urea, KNO₃, Na₂SO₄ and glucose solutions (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchso-boiling-freezing",
      name: "Boiling point, freezing point and the van 't Hoff factor",
      intuition:
        "A non-volatile solute takes up part of the surface, so fewer solvent molecules escape and the vapour pressure falls. The solution then has to be heated further before its vapour pressure reaches the atmospheric pressure, so it boils higher; it also freezes lower than the pure solvent. These changes depend only on how many solute particles there are, not on what they are. A salt that splits into ions gives more particles, and the van 't Hoff factor counts them.",
      definition:
        "- **Colligative properties** depend on the number of solute particles, not on their nature: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure.\n" +
        "- **Relative lowering of vapour pressure** for a non-volatile solute equals the mole fraction of the solute: \\(\\dfrac{p_1^\\circ - p_1}{p_1^\\circ} = x_2\\).\n" +
        "- **Elevation of boiling point:** \\(\\Delta T_b = K_b m\\). For water \\(K_b = 0.52\\ \\text{K kg mol}^{-1}\\).\n" +
        "- **Depression of freezing point:** \\(\\Delta T_f = K_f m\\). For water \\(K_f = 1.86\\ \\text{K kg mol}^{-1}\\).\n" +
        "- Molar mass of the solute from either: \\(M_2 = \\dfrac{K \\times w_2 \\times 1000}{\\Delta T \\times w_1}\\), with \\(w_2\\) grams of solute in \\(w_1\\) grams of solvent.\n" +
        "- **van 't Hoff factor** \\(i\\) = normal molar mass ÷ abnormal molar mass = observed colligative property ÷ calculated colligative property. For a solute that dissociates or associates, multiply by i: \\(\\Delta T_b = iK_b m\\), \\(\\Delta T_f = iK_f m\\).\n" +
        "- A strong electrolyte gives i equal to its number of ions: KCl 2, \\(\\text{K}_2\\text{SO}_4\\) 3. A non-electrolyte such as glucose or urea has i = 1.\n" +
        "- Dissociation into n ions with degree \\(\\alpha\\): \\(i = 1 + (n - 1)\\alpha\\). Association into dimers, as ethanoic acid does in benzene: \\(i = 1 - \\dfrac{\\alpha}{2}\\), so i is less than 1.\n" +
        "- To compare solutions, compare \\(i \\times m\\): the larger it is, the higher the boiling point and the lower the freezing point.",
      formula: {
        label: "Boiling point, freezing point and the van 't Hoff factor",
        latex: "\\frac{p_1^\\circ - p_1}{p_1^\\circ} = x_2, \\qquad \\Delta T_b = iK_b m, \\qquad \\Delta T_f = iK_f m, \\qquad i = 1 + (n - 1)\\alpha",
        symbols: [
          { symbol: "\\(m\\)", meaning: "molality, moles of solute per kg of solvent" },
          { symbol: "\\(K_b, K_f\\)", meaning: "ebullioscopic and cryoscopic constants of the solvent" },
          { symbol: "\\(i\\)", meaning: "van 't Hoff factor, the number of particles each formula unit gives in solution" },
          { symbol: "\\(\\alpha\\)", meaning: "degree of dissociation or association" },
        ],
      },
      authoredExample: {
        prompt:
          "1.8 g of glucose (molar mass 180 g/mol) is dissolved in 100 g of water. Find the boiling point of the solution. (\\(K_b\\) for water = 0.52 K kg mol⁻¹; water boils at 373.15 K.)",
        steps: [
          "Moles of glucose \\(= \\dfrac{1.8}{180} = 0.01\\) mol; mass of water \\(= 0.1\\) kg.",
          "Molality \\(m = \\dfrac{0.01}{0.1} = 0.1\\) m. Glucose does not dissociate, so \\(i = 1\\).",
          "\\(\\Delta T_b = 0.52 \\times 0.1 = 0.052\\) K.",
          "Boiling point \\(= 373.15 + 0.052 = 373.202\\) K.",
        ],
        answer: "373.202 K",
      },
      selfCheckExample: {
        prompt:
          "Find the depression of freezing point of a 0.1 m aqueous solution of \\(\\text{K}_2\\text{SO}_4\\), taking it as fully dissociated. (\\(K_f\\) for water = 1.86 K kg mol⁻¹)",
        steps: [
          "\\(\\text{K}_2\\text{SO}_4 \\rightarrow 2\\text{K}^+ + \\text{SO}_4^{2-}\\): 3 ions, so \\(i = 3\\).",
          "\\(\\Delta T_f = iK_f m = 3 \\times 1.86 \\times 0.1 = 0.558\\) K.",
        ],
        answer: "0.558 K",
      },
      practiceSet: [
        { prompt: "A salt \\(\\text{AB}_2\\) is 50% dissociated into \\(\\text{A}^{2+}\\) and \\(2\\text{B}^-\\) in water. Find its van 't Hoff factor.", answer: "2" },
        { prompt: "In a solution the mole fraction of a non-volatile solute is 0.02. Find the relative lowering of the solvent's vapour pressure.", answer: "0.02" },
        { prompt: "Ethanoic acid dimerises completely in benzene. What is its van 't Hoff factor?", answer: "0.5" },
        { prompt: "3 g of a non-electrolyte in 100 g of water lowers the freezing point by 0.186 K. Find its molar mass. (\\(K_f\\) for water = 1.86 K kg mol⁻¹)", answer: "300 g/mol" },
      ],
      pyqExampleId: "4a58db76-92df-4872-84c5-97fdfce0d951",
      traps: [
        {
          title: "Count the ions, not the formula units",
          body: "0.01 M \\(\\text{Na}_2\\text{SO}_4\\) gives 3 ions per formula unit, so it acts like 0.03 M of particles. A non-electrolyte at a higher concentration can still give fewer particles.",
        },
        {
          title: "Association makes i less than 1",
          body: "When solute molecules pair up, as ethanoic acid does in benzene, there are fewer particles than formula units. Then i is below 1 and the measured molar mass comes out larger than the true one.",
        },
        {
          title: "The freezing point falls, the boiling point rises",
          body: "Subtract \\(\\Delta T_f\\) from the solvent's freezing point and add \\(\\Delta T_b\\) to its boiling point. The solution with the largest \\(i \\times m\\) has the lowest freezing point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchso-osmotic",
      name: "Osmotic pressure and isotonic solutions",
      intuition:
        "Put a solution and the pure solvent on the two sides of a membrane that lets only solvent molecules through. Solvent flows into the solution: this is osmosis. The extra pressure you must put on the solution to just stop that flow is its osmotic pressure. It follows the same form as the gas law, with the molar concentration of solute particles in place of n/V.",
      definition:
        "- **Osmosis** is the flow of solvent through a semipermeable membrane from the pure solvent (or a dilute solution) into the more concentrated solution.\n" +
        "- **Osmotic pressure** \\(\\pi\\) is the extra pressure applied to the solution that just stops osmosis: \\(\\pi = CRT = \\dfrac{n_2}{V}RT\\). For a solute that dissociates or associates, \\(\\pi = iCRT\\).\n" +
        "- A plot of \\(\\pi\\) against C at a fixed temperature is a straight line through the origin, with slope RT.\n" +
        "- Molar mass: \\(M_2 = \\dfrac{w_2RT}{\\pi V}\\). This is the preferred method for proteins and polymers: it works at room temperature and gives a large value even for a very dilute solution.\n" +
        "- **Isotonic** solutions have the same osmotic pressure at the same temperature, so the same \\(iC\\). A 0.9% (mass/volume) sodium chloride solution, normal saline, is isotonic with the fluid inside blood cells.\n" +
        "- In a **hypertonic** solution (higher osmotic pressure) a cell loses water and shrinks; in a **hypotonic** one it takes in water and swells.\n" +
        "- **Reverse osmosis:** a pressure larger than the osmotic pressure, applied to the solution side, pushes pure solvent out through the membrane. It is used to desalinate sea water.",
      formula: {
        label: "Osmotic pressure",
        latex: "\\pi = iCRT = \\frac{i\\,n_2RT}{V}, \\qquad M_2 = \\frac{w_2RT}{\\pi V}",
        symbols: [
          { symbol: "\\(C\\)", meaning: "molar concentration of the solute, in mol per litre" },
          { symbol: "\\(R\\)", meaning: "gas constant, 0.083 L bar per mol per K" },
          { symbol: "\\(T\\)", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "3.42 g of sucrose (molar mass 342 g/mol) is dissolved in water to make 500 mL of solution. Find its osmotic pressure at 300 K. (R = 0.083 L bar mol⁻¹ K⁻¹)",
        steps: [
          "Moles of sucrose \\(= \\dfrac{3.42}{342} = 0.01\\) mol.",
          "\\(C = \\dfrac{0.01}{0.5} = 0.02\\) mol/L. Sucrose does not dissociate, so \\(i = 1\\).",
          "\\(\\pi = 0.02 \\times 0.083 \\times 300 = 0.498\\) bar.",
        ],
        answer: "0.498 bar",
      },
      selfCheckExample: {
        prompt:
          "At the same temperature, is 0.1 M NaCl isotonic with 0.2 M glucose? Take NaCl as fully dissociated.",
        steps: [
          "NaCl gives \\(\\text{Na}^+\\) and \\(\\text{Cl}^-\\), so \\(i = 2\\) and \\(iC = 2 \\times 0.1 = 0.2\\).",
          "Glucose does not dissociate: \\(iC = 1 \\times 0.2 = 0.2\\).",
          "Equal \\(iC\\) at the same temperature means equal osmotic pressure.",
        ],
        answer: "Yes, they are isotonic",
      },
      practiceSet: [
        { prompt: "Which sodium chloride solution is isotonic with the fluid inside blood cells?", answer: "0.9% (mass/volume) NaCl, normal saline" },
        { prompt: "What happens to a blood cell placed in a hypertonic solution?", answer: "It loses water and shrinks" },
        { prompt: "2 g of a protein in 1 L of solution has an osmotic pressure of 0.0083 bar at 300 K. Find the molar mass of the protein. (R = 0.083 L bar mol⁻¹ K⁻¹)", answer: "6000 g/mol" },
        { prompt: "What is reverse osmosis used for?", answer: "Desalination of sea water" },
      ],
      pyqExampleId: "6892717f-233e-4ec9-91af-55039f42395c",
      traps: [
        {
          title: "Use the temperature in kelvin",
          body: "In \\(\\pi = CRT\\), T is in kelvin: 37 °C is 310 K. A temperature found from the formula comes out in kelvin, so subtract 273 to give it in °C.",
        },
        {
          title: "Equal masses do not give equal osmotic pressure",
          body: "10 g of urea (60 g/mol) holds more moles than 10 g of glucose (180 g/mol), so in the same volume urea gives the higher osmotic pressure. Convert mass to moles first.",
        },
        {
          title: "Isotonic means equal particle concentration",
          body: "Two solutions are isotonic when \\(iC\\) is the same, not when the grams per litre are the same. Different molar masses need different masses for the same molarity.",
        },
      ],
    },
  ],
};
