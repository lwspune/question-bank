import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SO_CONCENTRATION_NOTE: SubtopicNote = {
  subtopicName: "Concentration and Solubility",
  title: "Concentration and Solubility",
  oneLineDefinition:
    "The types of solutions, the ways of stating how much solute a solution holds (mass percentage, ppm, mole fraction, molarity and molality), and what decides solubility, including Henry's law for gases.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. One matches humidity, alloys, amalgams and smoke to their types of solution (2025), one finds the mass of solvent in a 1 molal solution holding 0.5 mol of solute (2022), one finds the mass of glucose for 250 mL of an M/20 solution (Re-NEET 2024), one checks five statements on molality, molarity, gas solubility and mole fraction (NEET 2026), one ranks three gases by solubility from their Henry's law constants (NEET 2024), and one ranks NaCl, CH₃OH, cyclohexane and CH₃CN by solubility in chloroform (Re-NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchso-types",
      name: "Types of solutions",
      intuition:
        "A solution is a mixture that is the same all the way through. The component present in the larger amount is the solvent, and it decides whether the solution is a gas, a liquid or a solid. The other component is the solute. Since the solute and the solvent can each be a gas, a liquid or a solid, there are nine types of solution.",
      definition:
        "- A **solution** is a homogeneous mixture of two or more components. A **binary solution** has two.\n" +
        "- The **solvent** is the component present in the largest amount. It decides the physical state of the solution.\n" +
        "- The **solute** is the component (or components) present in a smaller amount.\n" +
        "- Name a type as \"solute in solvent\": camphor in nitrogen gas is solid in gas, so it is a gaseous solution.",
      table: {
        columns: ["Type of solution", "Solute in solvent", "Example"],
        rows: [
          { cells: ["Gaseous", "Gas in gas", "Mixture of oxygen and nitrogen"] },
          { cells: ["Gaseous", "Liquid in gas", "Chloroform mixed with nitrogen gas"], noteAmber: "NEET 2025 counted humidity as a solution of liquid in gas." },
          { cells: ["Gaseous", "Solid in gas", "Camphor in nitrogen gas"], noteAmber: "NEET 2025 counted smoke as a solution of solid in gas." },
          { cells: ["Liquid", "Gas in liquid", "Oxygen dissolved in water"] },
          { cells: ["Liquid", "Liquid in liquid", "Ethanol dissolved in water"] },
          { cells: ["Liquid", "Solid in liquid", "Glucose dissolved in water"] },
          { cells: ["Solid", "Gas in solid", "Hydrogen in palladium"] },
          { cells: ["Solid", "Liquid in solid", "Amalgam of mercury with sodium"] },
          { cells: ["Solid", "Solid in solid", "Copper dissolved in gold (an alloy)"] },
        ],
        caption: "The solvent's state gives the first column; the solute's state comes first in the second.",
      },
      pyqExampleId: "cfb0dcff-2134-47a8-bfb0-d6447bac9d7a",
      selfCheckExample: {
        prompt: "2 g of sugar is dissolved in 100 g of water. Which component is the solvent, and what type of solution is it?",
        steps: [
          "Water is present in the larger amount, so water is the solvent and sugar is the solute.",
          "Sugar is a solid and water is a liquid, so the solute is a solid in a liquid solvent.",
        ],
        answer: "Water is the solvent; it is a solution of solid in liquid",
      },
      practiceSet: [
        { prompt: "What type of solution is oxygen dissolved in water?", answer: "Gas in liquid" },
        { prompt: "What type of solution is hydrogen dissolved in palladium?", answer: "Gas in solid" },
        { prompt: "Which component of a solution decides its physical state?", answer: "The solvent" },
        { prompt: "How many components does a binary solution have?", answer: "Two" },
      ],
      traps: [
        {
          title: "The solvent decides the state",
          body: "Camphor is a solid, but camphor in nitrogen gas is a gaseous solution, because nitrogen is the solvent. Read the solvent first, then the solute.",
        },
        {
          title: "An amalgam is liquid in solid",
          body: "In an amalgam of mercury with sodium, liquid mercury is the solute and solid sodium is the solvent. It is a liquid in solid solution, not solid in liquid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchso-concentration",
      name: "Concentration terms",
      intuition:
        "Concentration says how much solute there is in a given amount of solution or solvent. Some terms use masses or volumes, which you can weigh or measure. Others use moles, which count particles, and those are the ones the later formulas need. The key difference to remember: molarity divides by the volume of the whole solution, molality by the mass of the solvent alone.",
      definition:
        "- **Mass percentage (w/w)** = mass of the component ÷ total mass of the solution × 100.\n" +
        "- **Volume percentage (v/v)** = volume of the component ÷ total volume of the solution × 100.\n" +
        "- **Mass by volume percentage (w/v)** = grams of solute in 100 mL of solution.\n" +
        "- **Parts per million (ppm)** = parts of the component ÷ total parts of the solution × \\(10^{6}\\). It is used for very small amounts, such as traces of a gas in water.\n" +
        "- **Mole fraction** of B: \\(x_B = \\dfrac{n_B}{n_A + n_B}\\). The mole fractions of all the components add up to 1.\n" +
        "- **Molarity (M)** = moles of solute ÷ volume of solution in litres.\n" +
        "- **Molality (m)** = moles of solute ÷ mass of solvent in kilograms.\n" +
        "- Molarity changes with temperature, because volume changes. Mass percentage, ppm, mole fraction and molality do not.\n" +
        "- On dilution the moles of solute stay the same: \\(M_1V_1 = M_2V_2\\).",
      formula: {
        label: "Mole fraction, molarity and molality",
        latex: "x_B = \\frac{n_B}{n_A + n_B}, \\qquad M = \\frac{n_2}{V_{\\text{solution}}\\,(\\text{L})}, \\qquad m = \\frac{n_2}{W_{\\text{solvent}}\\,(\\text{kg})}",
        symbols: [
          { symbol: "\\(n_2\\)", meaning: "moles of solute, its mass divided by its molar mass" },
          { symbol: "\\(V_{\\text{solution}}\\)", meaning: "volume of the whole solution, in litres" },
          { symbol: "\\(W_{\\text{solvent}}\\)", meaning: "mass of the solvent alone, in kilograms" },
        ],
      },
      authoredExample: {
        prompt:
          "6 g of urea (molar mass 60 g/mol) is dissolved in 200 g of water (molar mass 18 g/mol). Find the molality of the solution and the mole fraction of urea.",
        steps: [
          "Moles of urea \\(= \\dfrac{6}{60} = 0.1\\) mol. Mass of water \\(= 200\\) g \\(= 0.2\\) kg.",
          "Molality \\(= \\dfrac{0.1}{0.2} = 0.5\\) m.",
          "Moles of water \\(= \\dfrac{200}{18} = 11.11\\) mol.",
          "\\(x_{\\text{urea}} = \\dfrac{0.1}{0.1 + 11.11} = 0.0089\\).",
        ],
        answer: "0.5 m; mole fraction of urea 0.0089",
      },
      selfCheckExample: {
        prompt:
          "A solution contains 10 g of glucose (molar mass 180 g/mol) in 90 g of water. Find the mass percentage of glucose and the molality of the solution.",
        steps: [
          "Total mass \\(= 10 + 90 = 100\\) g, so mass percentage \\(= \\dfrac{10}{100} \\times 100 = 10\\%\\).",
          "Moles of glucose \\(= \\dfrac{10}{180} = 0.0556\\) mol; mass of water \\(= 0.09\\) kg.",
          "Molality \\(= \\dfrac{0.0556}{0.09} = 0.617\\) m.",
        ],
        answer: "10%; 0.617 m",
      },
      practiceSet: [
        { prompt: "What volume of 2 M HCl must be diluted with water to make 500 mL of 0.5 M HCl?", answer: "125 mL" },
        { prompt: "A solution holds 1 mol of ethanol and 4 mol of water. Find the mole fraction of ethanol.", answer: "0.2" },
        { prompt: "Which of molarity and molality changes when a solution is warmed?", answer: "Molarity, because the volume of the solution changes" },
        { prompt: "1000 g of water contains 0.005 g of a dissolved gas. Express this amount in ppm.", answer: "5 ppm" },
      ],
      pyqExampleId: "2ec2f478-13fc-4533-9fe5-403f4b795b51",
      traps: [
        {
          title: "Molality divides by the solvent, not the solution",
          body: "Molality uses the mass of the solvent alone, in kilograms. Adding the solute's mass to it, or using grams, gives a wrong value.",
        },
        {
          title: "Molarity needs litres of solution",
          body: "Molarity divides by the volume of the whole solution in litres. For 250 mL, divide by 0.25 L, not by 250.",
        },
        {
          title: "The mole fraction of B has B on top",
          body: "\\(x_B = \\dfrac{n_B}{n_A + n_B}\\). Putting \\(n_A\\) on top gives the mole fraction of A instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchso-henry",
      name: "Solubility and Henry's law",
      intuition:
        "How much of a substance dissolves depends on the solute, the solvent, the temperature and, for a gas, the pressure. A solute dissolves best in a solvent with similar forces between its molecules: like dissolves like. For a gas, pressing harder on the gas above the liquid pushes more of it into solution. Warming does the opposite and drives gas out.",
      definition:
        "- **Like dissolves like:** polar and ionic solutes dissolve in polar solvents; non-polar solutes dissolve in non-polar solvents. Sodium chloride and sugar dissolve readily in water; naphthalene and anthracene dissolve readily in benzene.\n" +
        "- For a solid in a liquid, pressure has no significant effect, because solids and liquids are hardly compressed.\n" +
        "- For a gas in a liquid, solubility rises with pressure. **Henry's law:** the partial pressure of the gas in the vapour phase is proportional to its mole fraction in the solution, \\(p = K_H x\\).\n" +
        "- At a given pressure, the **higher** \\(K_H\\), the **lower** the solubility of the gas.\n" +
        "- \\(K_H\\) rises with temperature, so a gas is less soluble in warm water. This is why aquatic species are more comfortable in cold water than in warm water.\n" +
        "- Uses of Henry's law: soft drinks are sealed under high pressure to dissolve more \\(\\text{CO}_2\\); scuba divers breathing air at high pressure get more nitrogen dissolved in the blood, which forms bubbles (the bends) when they rise, so their tanks use air diluted with helium; at high altitude the low partial pressure of oxygen leaves less oxygen in the blood (anoxia).",
      formula: {
        label: "Henry's law",
        latex: "p = K_H\\,x",
        symbols: [
          { symbol: "\\(p\\)", meaning: "partial pressure of the gas above the solution" },
          { symbol: "\\(x\\)", meaning: "mole fraction of the gas in the solution" },
          { symbol: "\\(K_H\\)", meaning: "Henry's law constant, different for each gas and rising with temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "The Henry's law constant of a gas in water is 50 kbar at 298 K. Find the mole fraction of the gas in water when its partial pressure is 0.5 bar.",
        steps: [
          "Put both pressures in the same unit: \\(K_H = 50\\) kbar \\(= 50000\\) bar.",
          "\\(x = \\dfrac{p}{K_H} = \\dfrac{0.5}{50000} = 1 \\times 10^{-5}\\).",
        ],
        answer: "\\(1 \\times 10^{-5}\\)",
      },
      selfCheckExample: {
        prompt:
          "At a fixed temperature, the partial pressure of a gas over water is doubled. What happens to the mole fraction of the gas dissolved in the water?",
        steps: [
          "By Henry's law, \\(x = \\dfrac{p}{K_H}\\), and \\(K_H\\) is fixed at a fixed temperature.",
          "So x is proportional to p: doubling p doubles x.",
        ],
        answer: "It doubles",
      },
      practiceSet: [
        { prompt: "Which dissolves better in benzene: naphthalene or sodium chloride?", answer: "Naphthalene (like dissolves like)" },
        { prompt: "Why are bottles of soft drinks sealed under high pressure?", answer: "To dissolve more \\(\\text{CO}_2\\) in the drink, by Henry's law" },
        { prompt: "Is a gas more soluble in water at 20 °C or at 40 °C?", answer: "At 20 °C" },
        { prompt: "Why do scuba divers' tanks hold air diluted with helium?", answer: "To avoid the bends: less nitrogen dissolves in the blood at high pressure, so fewer bubbles form when the diver rises" },
      ],
      pyqExampleId: "3c898c32-5608-4bfc-b416-b9e18b7b4b4b",
      traps: [
        {
          title: "A larger KH means a less soluble gas",
          body: "From \\(x = \\dfrac{p}{K_H}\\), a gas with a larger \\(K_H\\) dissolves less at the same pressure. Ranking solubility in the same order as \\(K_H\\) gets it backwards.",
        },
        {
          title: "Gases dissolve less when it is warmer",
          body: "\\(K_H\\) rises with temperature, so a gas becomes less soluble as water warms. Lower pressure also lowers gas solubility; it never raises it.",
        },
      ],
    },
  ],
};
