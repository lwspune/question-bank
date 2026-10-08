import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_SOL_CONCENTRATION_NOTE: SubtopicNote = {
  subtopicName: "Concentration Units",
  title: "Molarity, Mass Concentration and Other Units",
  oneLineDefinition:
    "Concentration says how much solute is in a given amount of solution; the units differ in whether they count moles or grams, and per volume or per mass.",
  whyItMatters:
    "Converting between mol/L and g/L was asked in 2011, 2016 and 2019, and the 2024 ministry paper asked for the moles of one ion in a volume of a salt solution.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sol-molarity",
      name: "Molarity: moles of solute per litre of solution",
      intuition:
        "Molarity tells you how many moles of solute are in each litre of solution. Multiply by the volume you take and you know how many moles you have. If the solute splits into ions, each ion has its own concentration, set by how many of it come from one formula unit.",
      definition:
        "- **Molar concentration** (molarity) \\(c\\): moles of solute per **litre of solution**, unit mol/L, written M. So 0.5 M means 0.5 mol/L.\n" +
        "- Volumes must be in litres: \\(1\\ \\text{mL} = 1\\ \\text{cm}^3 = 10^{-3}\\ \\text{L}\\), and \\(1\\ \\text{dm}^3 = 1\\ \\text{L}\\).\n" +
        "- For a strong electrolyte, the concentration of each ion is \\(c\\) times the number of that ion in the formula: 0.2 M \\(\\mathrm{CaCl_2}\\) is 0.2 M in \\(\\mathrm{Ca^{2+}}\\) and 0.4 M in \\(\\mathrm{Cl^-}\\).\n" +
        "- Taking a sample from a solution does not change its concentration, only the moles in your sample.",
      formula: {
        label: "Molarity",
        latex: "c = \\frac{n}{V} \\qquad n = c\\,V",
        symbols: [
          { symbol: "\\(c\\)", meaning: "concentration, in mol/L" },
          { symbol: "\\(n\\)", meaning: "moles of solute, in mol" },
          { symbol: "\\(V\\)", meaning: "volume of solution, in L" },
        ],
      },
      authoredExample: {
        prompt:
          "11.1 g of calcium chloride, \\(\\mathrm{CaCl_2}\\) (\\(M = 111\\ \\text{g/mol}\\)), is dissolved in water and made up to 500 mL. Find the concentration of the solution and of the chloride ions.",
        steps: [
          "Moles: \\(11.1/111 = 0.100\\ \\text{mol}\\).",
          "Volume: \\(500\\ \\text{mL} = 0.500\\ \\text{L}\\). So \\(c = 0.100/0.500 = 0.200\\ \\text{mol/L}\\).",
          "Each formula unit gives two \\(\\mathrm{Cl^-}\\) ions: \\([\\mathrm{Cl^-}] = 2 \\times 0.200 = 0.400\\ \\text{mol/L}\\).",
        ],
        answer: "0.200 mol/L of \\(\\mathrm{CaCl_2}\\); 0.400 mol/L of \\(\\mathrm{Cl^-}\\)",
      },
      selfCheckExample: {
        prompt: "How many moles of chloride ions are present in 200 mL of a 0.30 M solution of aluminium chloride, \\(\\mathrm{AlCl_3}\\)?",
        options: ["0.060", "0.020", "0.18", "0.24", "0.90"],
        steps: [
          "Moles of \\(\\mathrm{AlCl_3}\\): \\(0.30 \\times 0.200 = 0.060\\ \\text{mol}\\).",
          "Three chloride ions per formula unit: \\(3 \\times 0.060 = 0.18\\ \\text{mol}\\).",
          "A forgets the three chlorides. B divides by 3 instead of multiplying. D counts all four ions. E ignores the volume.",
        ],
        answer: "(C) 0.18",
      },
      practiceSet: [
        { prompt: "How many moles of solute are in 2.0 L of a 0.50 M solution?", answer: "1.0 mol" },
        { prompt: "What volume of 0.25 M solution contains 0.050 mol of solute?", answer: "200 mL", method: "\\(0.050/0.25 = 0.20\\ \\text{L}\\)" },
        { prompt: "How many moles are in 50 mL of a 0.10 M solution?", answer: "0.0050 mol", method: "\\(0.10 \\times 0.050\\)" },
        { prompt: "What is the concentration of \\(\\mathrm{K^+}\\) in 0.15 M potassium sulfate, \\(\\mathrm{K_2SO_4}\\)?", answer: "0.30 M" },
      ],
      traps: [
        {
          title: "Millilitres must become litres",
          body: "Molarity is per litre. Multiplying 0.30 mol/L by 200 (mL) instead of 0.200 (L) gives an answer 1000 times too large. Convert the volume first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-mass-conc",
      name: "Mass concentration in g/L and converting it to mol/L",
      intuition:
        "Grams per litre and moles per litre describe the same solution in two currencies. The molar mass is the exchange rate: one mole weighs \\(M\\) grams, so a concentration in mol/L times \\(M\\) gives grams per litre.",
      definition:
        "- **Mass concentration**: grams of solute per litre of solution, unit g/L.\n" +
        "- From mol/L to g/L: multiply by the molar mass. From g/L to mol/L: divide by it.\n" +
        "- Mass of solute in a volume: \\(m = c \\times V \\times M\\).",
      formula: {
        label: "Mass concentration",
        latex: "\\rho_{\\text{solute}} = c \\times M",
        symbols: [
          { symbol: "\\(\\rho_{\\text{solute}}\\)", meaning: "mass concentration, in g/L" },
          { symbol: "\\(c\\)", meaning: "molar concentration, in mol/L" },
          { symbol: "\\(M\\)", meaning: "molar mass of the solute, in g/mol" },
        ],
      },
      authoredExample: {
        prompt:
          "A sulfuric acid solution is 0.25 mol/L. What is its concentration in g/L, and what mass of acid is in 200 mL of it? (\\(M(\\mathrm{H_2SO_4}) = 98\\ \\text{g/mol}\\))",
        steps: [
          "\\(0.25 \\times 98 = 24.5\\ \\text{g/L}\\).",
          "In 0.200 L: \\(24.5 \\times 0.200 = 4.9\\ \\text{g}\\).",
        ],
        answer: "24.5 g/L; 4.9 g in 200 mL",
      },
      selfCheckExample: {
        prompt: "8.0 g of sodium hydroxide (\\(M = 40\\ \\text{g/mol}\\)) is dissolved to make 500 mL of solution. What is its concentration?",
        options: ["0.20 mol/L", "16 mol/L", "0.10 mol/L", "0.40 mol/L", "4.0 mol/L"],
        steps: [
          "Moles: \\(8.0/40 = 0.20\\ \\text{mol}\\). Volume: 0.500 L.",
          "\\(c = 0.20/0.500 = 0.40\\ \\text{mol/L}\\).",
          "A forgets to divide by the volume. B is the concentration in g/L with the wrong unit. C multiplies by the volume. E uses 0.050 L for 500 mL.",
        ],
        answer: "(D) 0.40 mol/L",
      },
      practiceSet: [
        { prompt: "A potassium hydroxide solution is 0.20 mol/L. What is it in g/L? (\\(M = 56\\ \\text{g/mol}\\))", answer: "11.2 g/L" },
        { prompt: "A sulfuric acid solution contains 9.8 g/L. What is its molarity? (\\(M = 98\\ \\text{g/mol}\\))", answer: "0.10 mol/L" },
        { prompt: "What mass of sodium chloride is in 2.0 L of 0.50 mol/L solution? (\\(M = 58.5\\ \\text{g/mol}\\))", answer: "58.5 g", method: "1.0 mol" },
      ],
      traps: [
        {
          title: "g/L and mol/L differ by the molar mass",
          body: "A 0.1 mol/L solution of a substance with \\(M = 40\\) is 4 g/L, not 0.1 g/L. Check which unit the question asks for; options often give the right number in the wrong unit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-percent",
      name: "Percentage concentrations and parts per million",
      intuition:
        "Medicine and everyday labels use percentages instead of moles: a saline drip is 0.9%, a disinfectant 3%. Each percentage says how many grams (or mL) of solute are in 100 of something, so it is quick to turn into a mass. For very small amounts, parts per million is easier to read.",
      definition:
        "- **% w/w** (mass/mass): grams of solute per 100 g of **solution**.\n" +
        "- **% w/v** (mass/volume): grams of solute per 100 mL of solution. So 1% w/v = 10 g/L.\n" +
        "- **% v/v** (volume/volume): mL of solute per 100 mL of solution, used for liquids such as ethanol.\n" +
        "- **ppm** (parts per million): grams of solute per \\(10^6\\) g of solution, which is mg per kg. For dilute water solutions, 1 ppm is about 1 mg/L.\n" +
        "- The mass of the solution is solute plus solvent.",
      formula: {
        label: "Percentage by mass and by volume",
        latex: "\\%\\,w/w = \\frac{m_{\\text{solute}}}{m_{\\text{solution}}} \\times 100 \\qquad \\%\\,w/v = \\frac{m_{\\text{solute}}\\,(\\text{g})}{V_{\\text{solution}}\\,(\\text{mL})} \\times 100",
        symbols: [
          { symbol: "\\(m_{\\text{solution}}\\)", meaning: "mass of solute plus solvent" },
          { symbol: "\\(V_{\\text{solution}}\\)", meaning: "volume of the solution, in mL" },
        ],
      },
      authoredExample: {
        prompt:
          "Physiological saline is 0.9% w/v sodium chloride. What mass of NaCl is in a 500 mL bag, and what is its molarity? (\\(M = 58.5\\ \\text{g/mol}\\))",
        steps: [
          "0.9% w/v means 0.9 g per 100 mL, which is 9 g/L.",
          "In 500 mL: \\(0.9 \\times 5 = 4.5\\ \\text{g}\\).",
          "Molarity: \\(9/58.5 \\approx 0.15\\ \\text{mol/L}\\).",
        ],
        answer: "4.5 g of NaCl; about 0.15 mol/L",
      },
      selfCheckExample: {
        prompt: "20 g of sugar is dissolved in 80 g of water. What is the concentration of sugar as a percentage by mass?",
        options: ["25%", "20%", "80%", "2.5%", "16%"],
        steps: [
          "Mass of solution: \\(20 + 80 = 100\\ \\text{g}\\).",
          "\\(20/100 \\times 100 = 20\\%\\).",
          "A divides by the mass of water instead of the mass of solution.",
        ],
        answer: "(B) 20%",
      },
      practiceSet: [
        { prompt: "What mass of glucose is in 200 mL of a 5% w/v solution?", answer: "10 g" },
        { prompt: "1 kg of water contains 0.002 g of lead. What is the concentration in ppm?", answer: "2 ppm", method: "2 mg per kg" },
        { prompt: "What mass of hydrogen peroxide is in 50 g of a 3% w/w solution?", answer: "1.5 g" },
        { prompt: "40 mL of ethanol is made up to 250 mL with water. What is the % v/v?", answer: "16%" },
      ],
      traps: [
        {
          title: "Divide by the mass of solution, not of solvent",
          body: "In % w/w the bottom of the fraction is solute plus solvent. 20 g of sugar in 80 g of water is 20%, not 25%. The same rule applies to ppm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-molality",
      name: "Molality, mole fraction and converting with density",
      intuition:
        "Molarity uses the volume of the solution, and volumes change slightly with temperature. Molality uses the mass of the solvent instead, which never changes, so it is the unit used for boiling and freezing points. Mole fraction simply asks what share of all the particles is the solute.",
      definition:
        "- **Molality** \\(b\\): moles of solute per **kilogram of solvent**, unit mol/kg.\n" +
        "- **Mole fraction** \\(x\\): moles of one component divided by the total moles of all components. It has no unit, and the mole fractions of all components add up to 1.\n" +
        "- For dilute water solutions, molality and molarity are almost equal, because 1 L of solution contains nearly 1 kg of water.\n" +
        "- To convert between per-volume and per-mass units you need the **density** of the solution: mass of 1 L of solution = density (g/mL) times 1000 mL.",
      formula: {
        label: "Molality and mole fraction",
        latex: "b = \\frac{n_{\\text{solute}}}{m_{\\text{solvent}}\\,(\\text{kg})} \\qquad x_A = \\frac{n_A}{n_A + n_B}",
        symbols: [
          { symbol: "\\(b\\)", meaning: "molality, in mol/kg" },
          { symbol: "\\(m_{\\text{solvent}}\\)", meaning: "mass of solvent only, in kg" },
          { symbol: "\\(x_A\\)", meaning: "mole fraction of A" },
        ],
      },
      authoredExample: {
        prompt:
          "(a) 6.0 g of urea (\\(M = 60\\ \\text{g/mol}\\)) is dissolved in 250 g of water. Find the molality. (b) 46 g of ethanol (\\(M = 46\\)) is mixed with 72 g of water (\\(M = 18\\)). Find the mole fraction of ethanol.",
        steps: [
          "(a) Moles of urea: \\(6.0/60 = 0.10\\ \\text{mol}\\). Water: 0.250 kg. \\(b = 0.10/0.250 = 0.40\\ \\text{mol/kg}\\).",
          "(b) Ethanol: 1.0 mol. Water: \\(72/18 = 4.0\\ \\text{mol}\\).",
          "\\(x = 1.0/(1.0 + 4.0) = 0.20\\).",
        ],
        answer: "(a) 0.40 mol/kg; (b) 0.20",
      },
      selfCheckExample: {
        prompt: "9.0 g of glucose (\\(M = 180\\ \\text{g/mol}\\)) is dissolved in 500 g of water. What is the molality of the solution?",
        options: [
          "0.050 mol/kg",
          "18 mol/kg",
          "0.018 mol/kg",
          "\\(1.0 \\times 10^{-4}\\ \\text{mol/kg}\\)",
          "0.10 mol/kg",
        ],
        steps: [
          "Moles of glucose: \\(9.0/180 = 0.050\\ \\text{mol}\\).",
          "Mass of water: 0.500 kg. \\(b = 0.050/0.500 = 0.10\\ \\text{mol/kg}\\).",
          "A gives the moles only. B is grams per kilogram. C divides grams by grams. D uses 500 instead of 0.500 kg.",
        ],
        answer: "(E) 0.10 mol/kg",
      },
      practiceSet: [
        { prompt: "A mixture has 2 mol of A and 3 mol of B. What is the mole fraction of A?", answer: "0.40" },
        { prompt: "0.25 mol of NaCl is dissolved in 500 g of water. What is the molality?", answer: "0.50 mol/kg" },
        { prompt: "A solution has a density of 1.20 g/mL. What is the mass of 1.0 L of it?", answer: "1200 g" },
        { prompt: "Why does molality not change when a solution is warmed?", answer: "It depends only on masses, which do not change; volumes expand" },
      ],
      traps: [
        {
          title: "Molality uses kilograms of solvent, molarity uses litres of solution",
          body: "Molality divides by the mass of the solvent alone, in kilograms. Molarity divides by the volume of the whole solution, in litres. Using grams, or the mass of the solution, gives a wrong molality.",
        },
      ],
    },
  ],
};
