import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_GAS_IDEAL_NOTE: SubtopicNote = {
  subtopicName: "Ideal Gas Equation",
  title: "The Ideal Gas Equation and Mixtures of Gases",
  oneLineDefinition:
    "PV = nRT joins all the gas laws in one equation; in a mixture each gas adds its own partial pressure, set by its share of the moles.",
  whyItMatters:
    "The 2025 paper asked for the ideal gas equation itself, and the 2024 paper asked for the partial pressure of one gas in a mixture of three. The 2018 paper asked which changes raise the total kinetic energy of a fixed sample of gas, which is a reading of PV = nRT.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-gas-ideal-equation",
      name: "The ideal gas equation PV = nRT",
      intuition:
        "Boyle, Charles, Gay-Lussac and Avogadro each describe one slice of the same behaviour: pressure times volume grows with the number of moles and with the kelvin temperature. Putting them together with one constant, R, gives a single equation that holds for any ideal gas.",
      definition:
        "- **Ideal gas equation**: \\(PV = nRT\\). Every gas law on the previous page is this equation with two of the quantities held constant.\n" +
        "- The **gas constant** \\(R = 8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}\\) when \\(P\\) is in Pa and \\(V\\) in m³. With \\(P\\) in atm and \\(V\\) in litres, \\(R = 0.0821\\ \\text{L atm mol}^{-1}\\text{K}^{-1}\\).\n" +
        "- \\(T\\) is always in kelvin. Volume conversions: \\(1\\ \\text{L} = 1\\ \\text{dm}^3 = 10^{-3}\\ \\text{m}^3\\).\n" +
        "- With \\(n = m/M\\), the equation gives a molar mass: \\(M = mRT/(PV)\\).\n" +
        "- The total translational kinetic energy of the molecules of an ideal gas is \\(\\tfrac{3}{2}nRT = \\tfrac{3}{2}PV\\). For a fixed sample, \\(T\\) and the kinetic energy rise whenever \\(PV\\) rises.",
      formula: {
        label: "Ideal gas equation",
        latex: "PV = nRT",
        symbols: [
          { symbol: "\\(P\\)", meaning: "pressure, in Pa (or atm with the other R)" },
          { symbol: "\\(V\\)", meaning: "volume, in m³ (or L with the other R)" },
          { symbol: "\\(n\\)", meaning: "amount of gas, in mol" },
          { symbol: "\\(R\\)", meaning: "gas constant, 8.314 J/(mol K) or 0.0821 L atm/(mol K)" },
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
        ],
      },
      authoredExample: {
        prompt:
          "2.0 mol of nitrogen is kept in a container of volume 0.050 m³ at 300 K. What is its pressure? (\\(R = 8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}\\))",
        steps: [
          "Units are already SI: \\(V\\) in m³ and \\(T\\) in K, so the answer comes out in Pa.",
          "\\(P = nRT/V = 2.0 \\times 8.314 \\times 300 / 0.050\\).",
          "\\(= 4988 / 0.050 \\approx 9.98 \\times 10^4\\ \\text{Pa}\\), which is about 1 atm.",
        ],
        answer: "About \\(1.0 \\times 10^5\\ \\text{Pa}\\)",
      },
      selfCheckExample: {
        prompt:
          "A 1.00 L flask contains 1.25 g of a gas at 273 K and 1.00 atm. Which gas could it be? (\\(R = 0.0821\\ \\text{L atm mol}^{-1}\\text{K}^{-1}\\))",
        options: [
          "Helium (M = 4 g/mol)",
          "Methane (M = 16 g/mol)",
          "Nitrogen (M = 28 g/mol)",
          "Oxygen (M = 32 g/mol)",
          "Carbon dioxide (M = 44 g/mol)",
        ],
        steps: [
          "\\(n = PV/(RT) = 1.00 \\times 1.00 / (0.0821 \\times 273) \\approx 0.0446\\ \\text{mol}\\).",
          "\\(M = m/n = 1.25 / 0.0446 \\approx 28\\ \\text{g/mol}\\), which matches nitrogen.",
          "Quick check: at STP 1 mol fills 22.4 L, so 1 L holds \\(1/22.4\\) mol, and \\(1.25 \\times 22.4 = 28\\). Oxygen would need 1.43 g in the same flask.",
        ],
        answer: "(C) Nitrogen (M = 28 g/mol)",
      },
      practiceSet: [
        { prompt: "What volume does 1.00 mol of an ideal gas occupy at 273 K and 101 325 Pa?", answer: "About 0.0224 m³ (22.4 L)", method: "\\(V = nRT/P = 8.314 \\times 273 / 101\\,325\\)" },
        { prompt: "For a fixed amount of gas, the pressure is tripled and the kelvin temperature is doubled. By what factor does the volume change?", answer: "It becomes 2/3 of the original", method: "\\(V \\propto T/P\\)" },
        { prompt: "Using \\(R = 8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}\\) with pressure in Pa, in what unit must the volume be?", answer: "m³" },
        { prompt: "The pressure of a gas in a sealed rigid container rises from 1.0 atm to 1.5 atm. What happens to the total kinetic energy of its molecules?", answer: "It rises by a factor of 1.5", method: "At fixed \\(n\\) and \\(V\\), \\(T \\propto P\\), and the kinetic energy follows \\(T\\)" },
      ],
      traps: [
        {
          title: "Litres with R = 8.314 gives an answer 1000 times wrong",
          body: "\\(R = 8.314\\) needs pressure in Pa and volume in m³. Putting in litres gives a pressure 1000 times too large. With litres and atmospheres, use \\(R = 0.0821\\).",
        },
        {
          title: "Adding gas at constant pressure and volume cools the gas",
          body: "From \\(T = PV/(nR)\\), if more moles go into the container while \\(P\\) and \\(V\\) stay fixed, the temperature must fall, and so does the kinetic energy of the molecules that were there at the start. At fixed \\(n\\), raising either \\(P\\) or \\(V\\) raises \\(T\\) and the kinetic energy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-dalton",
      name: "Dalton's law of partial pressures",
      intuition:
        "In a mixture of ideal gases the molecules ignore one another, so each gas hits the walls exactly as it would if it were alone. The total pressure is the sum of these separate pushes. Since pressure depends on the number of molecules, each gas's share of the pressure equals its share of the moles.",
      definition:
        "- **Dalton's law**: the total pressure of a mixture of gases is the sum of the **partial pressures** of the gases: \\(P_\\text{total} = p_A + p_B + \\dots\\)\n" +
        "- The partial pressure of a gas is the pressure it would exert alone in the same volume at the same temperature.\n" +
        "- The **mole fraction** \\(x_A = n_A / n_\\text{total}\\), and \\(p_A = x_A\\,P_\\text{total}\\). Moles, not masses, decide the share.\n" +
        "- Example: dry air is about 21% oxygen by moles, so at 100 kPa the partial pressure of oxygen is about 21 kPa.\n" +
        "- A gas collected over water is mixed with water vapour: subtract the vapour pressure of water to get the pressure of the dry gas.",
      formula: {
        label: "Partial pressure",
        latex: "p_A = x_A\\,P_{\\text{total}} = \\frac{n_A}{n_{\\text{total}}}\\,P_{\\text{total}}",
        symbols: [
          { symbol: "\\(p_A\\)", meaning: "partial pressure of gas A" },
          { symbol: "\\(x_A\\)", meaning: "mole fraction of A" },
          { symbol: "\\(n_A, n_\\text{total}\\)", meaning: "moles of A and total moles of gas" },
        ],
      },
      authoredExample: {
        prompt:
          "A diver's cylinder contains 16 g of oxygen (\\(M = 32\\)) and 14 g of helium (\\(M = 4\\)) at a total pressure of 8.0 atm. Find the partial pressure of each gas.",
        steps: [
          "Convert masses to moles: oxygen \\(16/32 = 0.50\\ \\text{mol}\\), helium \\(14/4 = 3.5\\ \\text{mol}\\). Total 4.0 mol.",
          "Mole fractions: oxygen \\(0.50/4.0 = 0.125\\), helium \\(3.5/4.0 = 0.875\\).",
          "\\(p_{\\mathrm{O_2}} = 0.125 \\times 8.0 = 1.0\\ \\text{atm}\\) and \\(p_\\text{He} = 0.875 \\times 8.0 = 7.0\\ \\text{atm}\\). They add up to 8.0 atm.",
        ],
        answer: "Oxygen 1.0 atm, helium 7.0 atm",
      },
      selfCheckExample: {
        prompt:
          "A flask holds a mixture of nitrogen and argon, 0.60 mol of gas in total, at a total pressure of 150 kPa. The partial pressure of argon is 30 kPa. How many moles of nitrogen are in the flask?",
        options: ["0.12 mol", "0.20 mol", "0.80 mol", "0.48 mol", "0.60 mol"],
        steps: [
          "Partial pressure of nitrogen: \\(150 - 30 = 120\\ \\text{kPa}\\).",
          "Mole fraction of nitrogen: \\(120/150 = 0.80\\), so \\(n = 0.80 \\times 0.60 = 0.48\\ \\text{mol}\\).",
          "A is the moles of argon. B and C are the mole fractions of argon and nitrogen, not amounts. E is the total.",
        ],
        answer: "(D) 0.48 mol",
      },
      practiceSet: [
        { prompt: "Air is 21% oxygen by moles. What is the partial pressure of oxygen when the total pressure is 100 kPa?", answer: "21 kPa" },
        { prompt: "Hydrogen is collected over water at 25 °C. The total pressure is 101.3 kPa and the vapour pressure of water is 3.2 kPa. What is the pressure of the dry hydrogen?", answer: "98.1 kPa", method: "\\(101.3 - 3.2\\)" },
        { prompt: "A container holds equal masses of hydrogen (\\(M = 2\\)) and helium (\\(M = 4\\)). What fraction of the total pressure is due to hydrogen?", answer: "Two thirds", method: "Twice as many moles of hydrogen" },
      ],
      traps: [
        {
          title: "Partial pressures follow moles, not masses",
          body: "In a mixture of 1 g of hydrogen and 1 g of helium, hydrogen exerts two thirds of the pressure, because it has twice as many moles. Always convert masses to moles before sharing out the pressure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-graham",
      name: "Graham's law: lighter gases diffuse and effuse faster",
      intuition:
        "At the same temperature every gas molecule has the same average kinetic energy, \\(\\tfrac{1}{2}mv^2\\). A lighter molecule must therefore move faster, and so it spreads out (diffuses) or escapes through a tiny hole (effuses) faster. Speed goes as one over the square root of the mass.",
      definition:
        "- **Diffusion**: the spreading of a gas through another. **Effusion**: the escape of a gas through a tiny hole.\n" +
        "- **Graham's law**: at the same temperature and pressure, the rate of effusion is **inversely proportional to the square root** of the molar mass.\n" +
        "- A gas 4 times heavier effuses at half the rate; one 16 times heavier at a quarter of the rate.\n" +
        "- Classic demonstration: ammonia (\\(M = 17\\)) and hydrogen chloride (\\(M = 36.5\\)) released at the two ends of a tube meet nearer the hydrogen chloride end, forming a white ring of ammonium chloride.",
      formula: {
        label: "Graham's law",
        latex: "\\frac{\\text{rate}_1}{\\text{rate}_2} = \\sqrt{\\frac{M_2}{M_1}}",
        symbols: [
          { symbol: "\\(\\text{rate}_1, \\text{rate}_2\\)", meaning: "rates of effusion of gases 1 and 2" },
          { symbol: "\\(M_1, M_2\\)", meaning: "their molar masses" },
        ],
      },
      authoredExample: {
        prompt: "How many times faster does hydrogen (\\(M = 2\\)) effuse than oxygen (\\(M = 32\\)) under the same conditions?",
        steps: [
          "\\(\\text{rate}_{\\mathrm{H_2}}/\\text{rate}_{\\mathrm{O_2}} = \\sqrt{32/2} = \\sqrt{16} = 4\\).",
          "The heavier gas is on top inside the square root: the lighter gas is the faster one.",
        ],
        answer: "4 times faster",
      },
      selfCheckExample: {
        prompt:
          "Under the same conditions, gas X effuses through a pinhole at half the rate of methane (\\(M = 16\\ \\text{g/mol}\\)). What is the molar mass of X?",
        options: ["8 g/mol", "32 g/mol", "64 g/mol", "4 g/mol", "256 g/mol"],
        steps: [
          "\\(\\text{rate}_X/\\text{rate}_{\\mathrm{CH_4}} = \\tfrac{1}{2} = \\sqrt{16/M_X}\\).",
          "Square both sides: \\(\\tfrac{1}{4} = 16/M_X\\), so \\(M_X = 64\\ \\text{g/mol}\\) (for example sulfur dioxide).",
          "B forgets to square: it treats the rate as inversely proportional to M. A and D make X lighter, but a slower gas must be heavier.",
        ],
        answer: "(C) 64 g/mol",
      },
      practiceSet: [
        { prompt: "Which diffuses faster at the same temperature: helium or neon?", answer: "Helium", method: "Lower molar mass" },
        { prompt: "What is the ratio of the effusion rates of helium (\\(M = 4\\)) and methane (\\(M = 16\\))?", answer: "2 : 1", method: "\\(\\sqrt{16/4}\\)" },
        { prompt: "Ammonia and hydrogen chloride diffuse towards each other along a tube. Nearer which end does the white ring form?", answer: "Nearer the hydrogen chloride end", method: "Ammonia is lighter and travels further" },
      ],
      traps: [
        {
          title: "Rate goes with the square root of the molar mass",
          body: "A gas 4 times heavier is 2 times slower, not 4 times slower. Leaving out the square root is the commonest wrong answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gas-real",
      name: "Real gases and the assumptions of the ideal gas model",
      intuition:
        "The ideal gas model pretends molecules are points that never attract one another. That is close to true when the molecules are far apart and fast. Squeeze a gas hard, or cool it, and the molecules come close and slow down: their size and their attractions start to matter, and the gas stops obeying PV = nRT exactly.",
      definition:
        "The **kinetic model of an ideal gas** assumes:\n" +
        "- the molecules move randomly in straight lines between collisions;\n" +
        "- their own volume is negligible compared with the volume of the container;\n" +
        "- there are no forces between molecules except during collisions;\n" +
        "- collisions are perfectly elastic.\n" +
        "**Real gases** come closest to ideal at **high temperature and low pressure**, and deviate most at **high pressure and low temperature** (near condensation). Small, non-polar molecules such as helium and hydrogen are the most nearly ideal.",
      table: {
        columns: ["Idea", "Ideal gas model", "Real gas"],
        rows: [
          { cells: ["Volume of the molecules", "Negligible", "Small but real; matters at high pressure"] },
          { cells: ["Forces between molecules", "None", "Weak attractions; matter at low temperature"] },
          { cells: ["Can it be liquefied?", "Never", "Yes, by cooling and compressing"] },
          { cells: ["Closest to ideal", "Any gas, at any conditions", "Helium and hydrogen, at high temperature and low pressure"] },
        ],
      },
      selfCheckExample: {
        prompt: "Under which conditions does a sample of nitrogen behave most like an ideal gas?",
        options: [
          "High pressure and low temperature",
          "Low pressure and high temperature",
          "High pressure and high temperature",
          "Low pressure and low temperature",
          "At its boiling point",
        ],
        steps: [
          "The model fails when the molecules are close together (high pressure) or slow enough for attractions to matter (low temperature).",
          "So the best conditions are the opposite of both: low pressure and high temperature.",
          "A is the worst case. E is where the gas starts to turn into a liquid, which an ideal gas never does.",
        ],
        answer: "(B) Low pressure and high temperature",
      },
      practiceSet: [
        { prompt: "Why can a real gas be liquefied, but an ideal gas could not be?", answer: "Real molecules attract one another; ideal ones are assumed not to." },
        { prompt: "At room temperature, which deviates more from ideal behaviour: helium or ammonia?", answer: "Ammonia", method: "Polar molecules with stronger attractions" },
        { prompt: "Name two assumptions of the ideal gas model.", answer: "Any two of: negligible molecular volume, no intermolecular forces, elastic collisions, random straight-line motion." },
      ],
    },
  ],
};
