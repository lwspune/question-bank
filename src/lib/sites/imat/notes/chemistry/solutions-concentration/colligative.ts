import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_SOL_COLLIGATIVE_NOTE: SubtopicNote = {
  subtopicName: "Colligative Properties",
  title: "Boiling Point, Freezing Point and Osmotic Pressure",
  oneLineDefinition:
    "Some properties of a solution depend only on how many solute particles it contains, not on what they are: it boils higher, freezes lower and draws water across a membrane.",
  whyItMatters:
    "The past papers have touched this page only once, in 2020, through a statement about the freezing point of a sugar solution. The syllabus lists colligative properties, and osmosis links straight to the cell biology questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sol-vant-hoff",
      name: "Colligative properties and the van 't Hoff factor",
      intuition:
        "Dissolved particles get in the way of the solvent: fewer solvent molecules sit at the surface to escape, and the solvent is less free to freeze. Each particle has the same effect whatever it is, so what matters is how many particles there are. A salt that splits into ions gives more particles than the same amount of sugar.",
      definition:
        "- **Colligative properties** depend on the **number** of dissolved particles, not their identity: vapour pressure lowering, **boiling point elevation**, **freezing point depression** and **osmotic pressure**.\n" +
        "- The **van 't Hoff factor** \\(i\\) is the number of particles one formula unit gives in solution.\n" +
        "- Non-electrolytes (glucose, sucrose, urea): \\(i = 1\\). Strong electrolytes: NaCl \\(i = 2\\), \\(\\mathrm{CaCl_2}\\) \\(i = 3\\), \\(\\mathrm{Na_3PO_4}\\) \\(i = 4\\).\n" +
        "- Weak electrolytes have \\(i\\) only a little above 1. In concentrated solutions real values are a little below the ideal ones; IMAT uses the ideal values.\n" +
        "- The concentration of particles is \\(i\\) times the concentration of solute.",
      formula: {
        label: "Concentration of dissolved particles",
        latex: "c_{\\text{particles}} = i \\times c",
        symbols: [
          { symbol: "\\(i\\)", meaning: "van 't Hoff factor: particles per formula unit" },
          { symbol: "\\(c\\)", meaning: "concentration of the solute" },
        ],
      },
      authoredExample: {
        prompt:
          "Rank these 0.10 mol/L solutions by their concentration of dissolved particles: glucose, sodium chloride, calcium chloride, aluminium sulfate \\(\\mathrm{Al_2(SO_4)_3}\\).",
        steps: [
          "Glucose \\(i = 1\\): 0.10 mol/L of particles.",
          "NaCl \\(i = 2\\): 0.20. \\(\\mathrm{CaCl_2}\\) \\(i = 3\\): 0.30. \\(\\mathrm{Al_2(SO_4)_3}\\) \\(i = 5\\): 0.50.",
          "So the colligative effects grow in the order glucose, NaCl, \\(\\mathrm{CaCl_2}\\), \\(\\mathrm{Al_2(SO_4)_3}\\).",
        ],
        answer: "Glucose < NaCl < \\(\\mathrm{CaCl_2}\\) < \\(\\mathrm{Al_2(SO_4)_3}\\)",
      },
      selfCheckExample: {
        prompt: "Which of the following aqueous solutions has the greatest total concentration of dissolved particles?",
        options: [
          "0.20 mol/L glucose",
          "0.15 mol/L sodium chloride",
          "0.30 mol/L ethanol",
          "0.12 mol/L magnesium chloride",
          "0.08 mol/L potassium sulfate",
        ],
        steps: [
          "Multiply each concentration by \\(i\\): glucose 0.20; NaCl \\(2 \\times 0.15 = 0.30\\); ethanol 0.30; \\(\\mathrm{MgCl_2}\\) \\(3 \\times 0.12 = 0.36\\); \\(\\mathrm{K_2SO_4}\\) \\(3 \\times 0.08 = 0.24\\).",
          "Magnesium chloride is highest. C has the largest solute concentration, but ethanol does not split into ions.",
        ],
        answer: "(D) 0.12 mol/L magnesium chloride",
      },
      practiceSet: [
        { prompt: "What is the van 't Hoff factor of potassium nitrate?", answer: "2" },
        { prompt: "What is the van 't Hoff factor of sucrose?", answer: "1", method: "A non-electrolyte" },
        { prompt: "What is the van 't Hoff factor of sodium phosphate, \\(\\mathrm{Na_3PO_4}\\)?", answer: "4" },
        { prompt: "What is the concentration of particles in 0.20 mol/L magnesium chloride?", answer: "0.60 mol/L" },
      ],
      traps: [
        {
          title: "Count particles, not formula units",
          body: "At the same concentration, a sodium chloride solution has twice the effect of a glucose solution, because each NaCl gives two ions. Comparing solute concentrations without multiplying by \\(i\\) picks the wrong solution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-bp-fp",
      name: "Boiling point elevation and freezing point depression",
      intuition:
        "Solute particles lower the vapour pressure of the solvent, so the solution must be heated further before it boils. They also disturb the ordered solid that forms on freezing, so the solution must be cooled further before it freezes. Both changes grow in proportion to the number of particles.",
      definition:
        "- A solution **boils above** and **freezes below** the pure solvent: its liquid range widens at both ends.\n" +
        "- The changes are proportional to the **molality** of particles, \\(i \\times b\\).\n" +
        "- For water: \\(K_b = 0.512\\ \\text{K kg/mol}\\) and \\(K_f = 1.86\\ \\text{K kg/mol}\\). A change of 1 K equals a change of 1 °C.\n" +
        "- Uses: salt spread on icy roads, antifreeze (ethylene glycol) in car radiators.\n" +
        "- The lowering of vapour pressure (**Raoult's law**: the solvent's vapour pressure is proportional to its mole fraction) is the cause of the higher boiling point.",
      formula: {
        label: "Boiling and freezing point changes",
        latex: "\\Delta T_b = i\\,K_b\\,b \\qquad \\Delta T_f = i\\,K_f\\,b",
        symbols: [
          { symbol: "\\(\\Delta T_b, \\Delta T_f\\)", meaning: "rise in boiling point, fall in freezing point, in K" },
          { symbol: "\\(K_b, K_f\\)", meaning: "constants of the solvent, in K kg/mol" },
          { symbol: "\\(b\\)", meaning: "molality of the solute, in mol/kg" },
          { symbol: "\\(i\\)", meaning: "van 't Hoff factor" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the freezing point and boiling point of a 0.50 mol/kg sodium chloride solution in water. (\\(K_f = 1.86\\), \\(K_b = 0.512\\ \\text{K kg/mol}\\))",
        steps: [
          "NaCl gives two ions: \\(i = 2\\), so the particle molality is 1.0 mol/kg.",
          "\\(\\Delta T_f = 2 \\times 1.86 \\times 0.50 = 1.86\\ \\text{K}\\), so it freezes at about \\(-1.86\\ ^\\circ\\text{C}\\).",
          "\\(\\Delta T_b = 2 \\times 0.512 \\times 0.50 = 0.512\\ \\text{K}\\), so it boils at about \\(100.51\\ ^\\circ\\text{C}\\).",
        ],
        answer: "Freezes at about \\(-1.86\\ ^\\circ\\text{C}\\); boils at about \\(100.51\\ ^\\circ\\text{C}\\)",
      },
      selfCheckExample: {
        prompt:
          "18 g of glucose (\\(M = 180\\ \\text{g/mol}\\)) is dissolved in 500 g of water. What is the freezing point of the solution? (\\(K_f = 1.86\\ \\text{K kg/mol}\\))",
        options: [
          "\\(+0.37\\ ^\\circ\\text{C}\\)",
          "\\(-0.19\\ ^\\circ\\text{C}\\)",
          "\\(-0.37\\ ^\\circ\\text{C}\\)",
          "\\(-0.74\\ ^\\circ\\text{C}\\)",
          "\\(0\\ ^\\circ\\text{C}\\)",
        ],
        steps: [
          "Moles of glucose: \\(18/180 = 0.10\\ \\text{mol}\\). Molality: \\(0.10/0.500 = 0.20\\ \\text{mol/kg}\\).",
          "Glucose is a non-electrolyte, \\(i = 1\\): \\(\\Delta T_f = 1.86 \\times 0.20 = 0.37\\ \\text{K}\\). It freezes at \\(-0.37\\ ^\\circ\\text{C}\\).",
          "A has the right size in the wrong direction. B forgets to divide by the mass of water in kg. D uses \\(i = 2\\). E ignores the solute.",
        ],
        answer: "(C) \\(-0.37\\ ^\\circ\\text{C}\\)",
      },
      practiceSet: [
        { prompt: "By how much is the freezing point of water lowered by 1.0 mol/kg calcium chloride? (\\(K_f = 1.86\\))", answer: "5.58 K", method: "\\(i = 3\\)" },
        { prompt: "Which boils at the higher temperature: 0.1 mol/kg NaCl or 0.1 mol/kg glucose?", answer: "The NaCl solution", method: "Twice the particles" },
        { prompt: "What is the freezing point of a 0.25 mol/kg urea solution? (\\(K_f = 1.86\\))", answer: "About \\(-0.47\\ ^\\circ\\text{C}\\)" },
        { prompt: "Why is salt spread on icy roads?", answer: "It lowers the freezing point of water, so the ice melts" },
      ],
      traps: [
        {
          title: "A solution boils higher and freezes lower",
          body: "Dissolving a solute raises the boiling point and lowers the freezing point. A saturated sugar solution does not freeze at 0 °C; it freezes below it. Options with the change in the wrong direction are common.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-osmotic",
      name: "Osmosis and osmotic pressure",
      intuition:
        "A semipermeable membrane lets water through but not the solute. Water moves from the side where it is more concentrated (fewer solute particles) to the side where it is less concentrated (more solute particles). The pressure needed to stop this flow is the osmotic pressure, and like the other colligative properties it depends on the number of particles.",
      definition:
        "- **Osmosis**: net movement of water through a **semipermeable membrane** from a solution of **lower** solute concentration to one of **higher** solute concentration.\n" +
        "- **Osmotic pressure** \\(\\pi\\): the pressure needed to stop osmosis. It rises with particle concentration and temperature.\n" +
        "- Compared with a cell: an **isotonic** solution has the same particle concentration (no net flow); a **hypotonic** one has fewer particles (water enters, red blood cells swell and may burst, **haemolysis**); a **hypertonic** one has more (water leaves, red blood cells shrink, **crenation**).\n" +
        "- 0.9% NaCl (about 0.15 mol/L, so about 0.3 mol/L of particles) is isotonic with blood.",
      formula: {
        label: "Osmotic pressure",
        latex: "\\pi = i\\,c\\,R\\,T",
        symbols: [
          { symbol: "\\(c\\)", meaning: "molar concentration of the solute (mol/L with R = 0.0821 L atm/(mol K), or mol/m³ with R = 8.314 J/(mol K))" },
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
          { symbol: "\\(i\\)", meaning: "van 't Hoff factor" },
        ],
      },
      authoredExample: {
        prompt: "What is the osmotic pressure of a 0.10 mol/L glucose solution at 27 °C? (\\(R = 0.0821\\ \\text{L atm/(mol K)}\\))",
        steps: [
          "\\(T = 27 + 273 = 300\\ \\text{K}\\), and \\(i = 1\\) for glucose.",
          "\\(\\pi = 1 \\times 0.10 \\times 0.0821 \\times 300 = 2.46\\ \\text{atm}\\).",
          "In SI units: \\(100\\ \\text{mol/m}^3 \\times 8.314 \\times 300 \\approx 2.5 \\times 10^5\\ \\text{Pa}\\), the same value.",
        ],
        answer: "About 2.5 atm (\\(2.5 \\times 10^5\\ \\text{Pa}\\))",
      },
      selfCheckExample: {
        prompt: "Red blood cells are placed in a 0.30 mol/L sodium chloride solution. What happens to them?",
        options: [
          "They swell and may burst, because water enters them.",
          "They shrink, because water leaves them by osmosis.",
          "Nothing, because the solution is isotonic with blood.",
          "They shrink, because sodium chloride moves out of them.",
          "They swell, because sodium ions enter them.",
        ],
        steps: [
          "0.30 mol/L NaCl gives 0.60 mol/L of particles, twice the particle concentration inside the cells (about 0.3 mol/L). The solution is hypertonic.",
          "Water moves out of the cells, towards the higher solute concentration, and they shrink.",
          "C mistakes 0.30 mol/L of NaCl for 0.30 mol/L of particles. D and E have solute crossing the membrane; osmosis is the movement of water.",
        ],
        answer: "(B) They shrink, because water leaves them by osmosis.",
      },
      practiceSet: [
        { prompt: "What concentration of NaCl is isotonic with 0.30 mol/L glucose?", answer: "0.15 mol/L", method: "Same particle concentration" },
        { prompt: "Water can cross a membrane between 0.1 mol/L and 0.5 mol/L sucrose. Which way is the net flow?", answer: "Into the 0.5 mol/L solution" },
        { prompt: "At constant temperature, the concentration of a solution doubles. What happens to its osmotic pressure?", answer: "It doubles" },
        { prompt: "Compare the osmotic pressures of 0.2 mol/L NaCl and 0.2 mol/L glucose at the same temperature.", answer: "NaCl is twice as large" },
      ],
      traps: [
        {
          title: "Water moves towards the more concentrated solution",
          body: "In osmosis it is water, not solute, that moves, and it moves towards the side with more dissolved particles. Count particles: 0.15 mol/L NaCl matches 0.30 mol/L glucose, not 0.15 mol/L glucose.",
        },
      ],
    },
  ],
};
