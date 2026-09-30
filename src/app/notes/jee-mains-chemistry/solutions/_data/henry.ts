import type { SubtopicNote } from "@/app/notes/_types";

export const HENRY_SOL_NOTE: SubtopicNote = {
  subtopicName: "Henry's Law and Solubility of Gases",
  title: "Henry's Law and Solubility of Gases",
  oneLineDefinition:
    "The partial pressure of a gas above a solution equals its Henry constant times its mole fraction in the solution, p = KH·x, and the constant depends on the gas, the solvent and the temperature.",
  whyItMatters:
    "Eight PYQs, six of them multiple choice, and three from 2026. Four apply p = KH·x to find a mole fraction, a number of millimoles or a mass of dissolved gas; four ask what the Henry constant depends on and why warm water holds less gas. The arithmetic is short, so the marks go on the partial pressure and the units.",
  concepts: [
    // C1 — Henry's law calculations
    {
      kind: "formula" as const,
      slug: "jcsol-henry-law",
      name: "Henry's law, p = KH·x",
      intuition:
        "A gas dissolves until the pressure it exerts from inside the liquid matches its partial pressure outside. Double the partial pressure and twice as much dissolves. The Henry constant \\(K_H\\) is the pressure needed per unit mole fraction, so a LARGE \\(K_H\\) means a gas that dissolves poorly.",
      definition:
        "- \\(p = K_H\\,x\\): \\(p\\) is the PARTIAL pressure of the gas, \\(x\\) its mole fraction in the solution.\n" +
        "- Partial pressure from air: \\(p = (\\text{mole fraction in air}) \\times P_{\\text{total}}\\).\n" +
        "- Units of \\(K_H\\) are those of pressure; convert \\(p\\) to the same unit first (\\(1\\ \\text{atm} = 760\\ \\text{mmHg}\\), \\(1\\ \\text{kbar} = 1000\\ \\text{bar}\\)).\n" +
        "- Moles dissolved in 1 L of water: water is \\(1000/18 = 55.56\\) mol, and \\(x\\) is tiny, so \\(n \\approx 55.56\\,x\\).\n" +
        "- Log form: \\(\\log p = \\log K_H + \\log x\\), a straight line of slope 1 and intercept \\(\\log K_H\\).",
      formula: {
        label: "Henry's law",
        latex: "p = K_H\\,x \\qquad n_{\\text{gas}} \\approx x \\times 55.56 \\text{ mol per litre of water}",
      },
      authoredExample: {
        prompt:
          "Air at a total pressure of 2 atm contains 20 mol% \\(\\mathrm{O_2}\\). For \\(\\mathrm{O_2}\\) in water, \\(K_H = 4.0 \\times 10^{4}\\) atm. Find the mole fraction of \\(\\mathrm{O_2}\\) in the water and the millimoles dissolved in 1 L.",
        steps: [
          "Partial pressure: \\(p = 0.20 \\times 2 = 0.4\\) atm.",
          "\\(x = \\dfrac{p}{K_H} = \\dfrac{0.4}{4.0 \\times 10^{4}} = 1.0 \\times 10^{-5}\\).",
          "Moles in 1 L of water: \\(n \\approx 55.56 \\times 1.0 \\times 10^{-5} = 5.56 \\times 10^{-4}\\) mol \\(= 0.556\\) mmol.",
        ],
        answer: "\\(x = 1.0 \\times 10^{-5}\\); about \\(0.56\\) mmol per litre.",
      },
      selfCheckExample: {
        prompt:
          "Soda water is made at a \\(\\mathrm{CO_2}\\) partial pressure of 2.5 bar. \\(K_H\\) for \\(\\mathrm{CO_2}\\) is 1.25 kbar. What mass of \\(\\mathrm{CO_2}\\) (M = 44 g/mol) dissolves in 1 L of water?",
        steps: [
          "\\(K_H = 1250\\) bar, so \\(x = \\dfrac{2.5}{1250} = 2.0 \\times 10^{-3}\\).",
          "\\(n \\approx 55.56 \\times 2.0 \\times 10^{-3} = 0.111\\) mol.",
          "Mass \\(= 0.111 \\times 44 = 4.89\\) g.",
        ],
        answer: "About \\(4.9\\) g.",
      },
      practiceSet: [
        { prompt: "A gas has \\(K_H = 100\\) kbar and a partial pressure of 1 bar. What is its mole fraction in water?", answer: "\\(1 \\times 10^{-5}\\)" },
        { prompt: "A gas has mole fraction \\(2 \\times 10^{-4}\\) in water. How many millimoles are in 1 L of water?", answer: "About \\(11.1\\) mmol" },
        { prompt: "Convert \\(K_H = 7.6 \\times 10^{4}\\) mmHg to atm.", answer: "\\(100\\) atm" },
        { prompt: "Gas P has \\(K_H = 1\\) kbar and gas Q has \\(K_H = 50\\) kbar in water. Which is more soluble at the same partial pressure?", answer: "Gas P (smaller \\(K_H\\))" },
      ],
      pyqExampleId: "ba0f41c3-2a21-4346-ae4d-14cbdb4e66db", // 2026 — N2 from air at 10 atm, KH in mmHg
      traps: [
        {
          title: "Use the partial pressure, not the total pressure",
          body: "Henry's law uses the gas's own partial pressure. For a gas that is 20% of air at 5 atm, \\(p = 1\\) atm. Putting 5 atm into \\(p = K_H x\\) gives a mole fraction five times too large.",
        },
        {
          title: "Match the pressure unit to KH",
          body: "If \\(K_H\\) is in mmHg, convert the partial pressure from atm to mmHg (\\(\\times 760\\)) before dividing. Dividing atm by mmHg gives an answer 760 times too small, and that wrong value is usually an option.",
        },
      ],
    },

    // C2 — what KH depends on
    {
      kind: "reference" as const,
      slug: "jcsol-gas-solubility",
      name: "What the Henry constant depends on",
      intuition:
        "\\(K_H\\) belongs to a gas-solvent pair at a given temperature. It does not change with concentration while the solution stays dilute. Dissolving a gas gives out heat, so warming the liquid pushes gas out: \\(K_H\\) rises with temperature and solubility falls.",
      definition:
        "- Constant with concentration over the ideally dilute range.\n" +
        "- Different for the same gas in different solvents.\n" +
        "- Rises with temperature for most gases in water, so solubility falls as the water warms.\n" +
        "- Larger \\(K_H\\) at the same partial pressure means a smaller mole fraction dissolved.\n" +
        "- Cold water holds more dissolved oxygen than hot water; boiling drives dissolved gases out.",
      table: {
        columns: ["Gas", "Temperature", "Henry constant in water (kbar)", "What it shows"],
        rows: [
          { cells: ["He", "293 K", "144.97", "The largest constant here, so the least soluble gas"] },
          { cells: ["\\(\\mathrm{H_2}\\)", "293 K", "69.16", "About half of helium's constant, so about twice as soluble"] },
          { cells: ["\\(\\mathrm{N_2}\\)", "293 K", "76.48", "Less soluble than oxygen at the same temperature"] },
          { cells: ["\\(\\mathrm{N_2}\\)", "303 K", "88.84", "The constant rises on warming by 10 K, so solubility falls"] },
          { cells: ["\\(\\mathrm{O_2}\\)", "293 K", "34.86", "About 2.2 times as soluble as nitrogen at 293 K"] },
          { cells: ["\\(\\mathrm{O_2}\\)", "303 K", "46.82", "Warmer water holds less oxygen"], noteAmber: "The same gas at two temperatures: the constant is not fixed for a gas." },
          { cells: ["\\(\\mathrm{CO_2}\\)", "298 K", "1.67", "A small constant: very soluble, which is why soda water holds so much"] },
        ],
        caption: "A larger constant means a less soluble gas; every gas listed at two temperatures has the larger constant at the higher one.",
      },
      selfCheckExample: {
        prompt: "At 293 K the Henry constants of \\(\\mathrm{N_2}\\) and \\(\\mathrm{O_2}\\) in water are 76.48 and 34.86 kbar. Which gas is more soluble at the same partial pressure, and by roughly what factor?",
        steps: [
          "At equal \\(p\\), \\(x = p/K_H\\), so the gas with the smaller constant dissolves more.",
          "\\(76.48/34.86 = 2.19\\).",
        ],
        answer: "Oxygen, about 2.2 times as much.",
      },
      practiceSet: [
        { prompt: "Does KH change with the solution's concentration in the ideally dilute range?", answer: "No" },
        { prompt: "Does KH for O₂ in water rise or fall from 293 K to 303 K?", answer: "It rises, from 34.86 to 46.82 kbar" },
        { prompt: "Does one gas have the same KH in two different solvents?", answer: "No; KH belongs to the gas-solvent pair" },
        { prompt: "Which holds more dissolved oxygen: water at 10 °C or water at 40 °C?", answer: "Water at 10 °C" },
      ],
      pyqExampleId: "5187c906-b0e1-4b7f-8b65-1ed4d368540c", // 2026 — statements on what KH depends on
      traps: [
        {
          title: "KH is not a property of the gas alone",
          body: "The statement 'KH does not differ for the same gas in different solvents' is false. The constant measures how readily the gas dissolves in that particular liquid, so it changes with the solvent and with temperature.",
        },
        {
          title: "Warm water holds less gas",
          body: "Dissolving a gas is exothermic, so raising the temperature drives gas out. The Henry constant rises with temperature and the solubility falls; water near 4 °C holds more oxygen than boiling water.",
        },
      ],
    },
  ],
};
