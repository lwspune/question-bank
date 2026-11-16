import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_KT_KINETIC_NOTE: SubtopicNote = {
  subtopicName: "Kinetic Energy, Speeds and Equipartition",
  title: "Kinetic Energy, Speeds and Equipartition",
  oneLineDefinition:
    "Gas pressure from molecules hitting the walls, average kinetic energy 3/2 kT, the rms speed, the law of equipartition with the specific heats it predicts, and the mean free path.",
  whyItMatters:
    "Six NEET questions from 2021 to 2026, four of them from 2024 or later. One matches four kinetic theory formulas (2021), two use the rms speed (a gas heated until its rms speed grows, 2023; argon against chlorine at one temperature, 2026), two find the number of vibrational modes from the ratio of specific heats (Re-NEET 2024 and Re-NEET 2026) and one compares mean free paths (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphkt-pressure-energy",
      name: "Pressure and kinetic energy of a gas",
      intuition:
        "A gas presses on its walls because its molecules keep hitting them and bouncing back, and each bounce hands the wall some momentum. Faster molecules hit harder and more often, so the pressure grows with the mean of the squared speed. Put this next to PV = μRT and a striking result drops out: the average kinetic energy of a molecule depends on the temperature alone, not on which gas it is.",
      definition:
        "- Pressure of an ideal gas: \\(P = \\dfrac{1}{3}nm\\overline{v^{2}} = \\dfrac{1}{3}\\rho\\overline{v^{2}}\\), where n is the number of molecules per unit volume, m the mass of one molecule and \\(\\rho = nm\\) the density.\n" +
        "- In terms of the total translational kinetic energy E of the gas: \\(PV = \\dfrac{2}{3}E\\).\n" +
        "- Average translational kinetic energy of one molecule: \\(\\dfrac{1}{2}m\\overline{v^{2}} = \\dfrac{3}{2}k_BT\\). For one mole: \\(\\dfrac{3}{2}RT\\).\n" +
        "- So at one temperature every gas, light or heavy, has the same average kinetic energy per molecule. **Temperature is a measure of the average kinetic energy of the molecules.**",
      formula: {
        label: "Pressure and energy",
        latex: "P = \\frac{1}{3}nm\\overline{v^{2}}, \\qquad PV = \\frac{2}{3}E, \\qquad \\frac{1}{2}m\\overline{v^{2}} = \\frac{3}{2}k_BT",
        symbols: [
          { symbol: "\\(n\\)", meaning: "molecules per unit volume" },
          { symbol: "\\(m\\)", meaning: "mass of one molecule" },
          { symbol: "\\(E\\)", meaning: "total translational kinetic energy" },
        ],
      },
      authoredExample: {
        prompt:
          "What is the average translational kinetic energy of a gas molecule at 27 °C? (\\(k_B = 1.38 \\times 10^{-23}\\) J/K)",
        steps: [
          "\\(T = 27 + 273 = 300\\) K.",
          "\\(\\dfrac{3}{2}k_BT = 1.5 \\times 1.38 \\times 10^{-23} \\times 300 = 6.21 \\times 10^{-21}\\) J.",
        ],
        answer: "\\(6.21 \\times 10^{-21}\\) J",
      },
      selfCheckExample: {
        prompt:
          "At what temperature is the average kinetic energy of a gas molecule twice its value at 27 °C?",
        steps: [
          "Average kinetic energy is proportional to kelvin temperature, so T must double: \\(2 \\times 300 = 600\\) K.",
          "\\(600 - 273 = 327\\) °C.",
        ],
        answer: "600 K, which is 327 °C",
      },
      practiceSet: [
        { prompt: "A gas fills 2 m³ at a pressure of \\(1.0 \\times 10^{5}\\) Pa. What is the total translational kinetic energy of its molecules?", answer: "\\(3 \\times 10^{5}\\) J" },
        { prompt: "Total translational kinetic energy of 2 mol of an ideal gas at 300 K? (R = 8.3 J/mol K)", answer: "7470 J" },
        { prompt: "Do a hydrogen molecule and an oxygen molecule at the same temperature have the same average kinetic energy?", answer: "Yes. It depends on temperature only" },
        { prompt: "The kelvin temperature of a gas is tripled. By what factor does the average kinetic energy of a molecule change?", answer: "It becomes 3 times" },
      ],
      pyqExampleId: "c2624d77-44f6-4ae1-b60a-27e82033a2f4",
      traps: [
        {
          title: "The average kinetic energy does not depend on mass",
          body: "At one temperature a heavy molecule moves slower, but its average kinetic energy is the same \\(\\dfrac{3}{2}k_BT\\) as a light one's.",
        },
        {
          title: "3/2 kT is the translational part only",
          body: "\\(\\dfrac{3}{2}k_BT\\) per molecule counts only motion from place to place. A diatomic molecule also rotates, so its total energy is more, \\(\\dfrac{5}{2}k_BT\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphkt-rms-speed",
      name: "Root mean square speed",
      intuition:
        "Molecules in a gas move at many different speeds. A single speed that stands for them all is the rms speed: square every speed, take the mean, then take the square root. Since the average kinetic energy is fixed by temperature, heavier molecules must move slower, and heating a gas makes all of them faster.",
      definition:
        "- \\(v_{rms} = \\sqrt{\\overline{v^{2}}} = \\sqrt{\\dfrac{3k_BT}{m}} = \\sqrt{\\dfrac{3RT}{M}} = \\sqrt{\\dfrac{3P}{\\rho}}\\), with M the molar mass in kg/mol.\n" +
        "- For one gas: \\(v_{rms} \\propto \\sqrt{T}\\). To double the rms speed the kelvin temperature must become four times.\n" +
        "- For different gases at one temperature: \\(v_{rms} \\propto \\dfrac{1}{\\sqrt{M}}\\).\n" +
        "- Changing the pressure at a fixed temperature does not change \\(v_{rms}\\).",
      formula: {
        label: "RMS speed",
        latex: "v_{rms} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3k_BT}{m}} = \\sqrt{\\frac{3P}{\\rho}}",
        symbols: [
          { symbol: "\\(M\\)", meaning: "molar mass in kg/mol" },
          { symbol: "\\(\\rho\\)", meaning: "density of the gas" },
        ],
      },
      authoredExample: {
        prompt: "Find the rms speed of nitrogen molecules at 300 K. (R = 8.31 J/mol K, molar mass of nitrogen 28 g/mol)",
        steps: [
          "Molar mass in kg/mol: \\(M = 0.028\\).",
          "\\(v_{rms} = \\sqrt{\\dfrac{3 \\times 8.31 \\times 300}{0.028}} = \\sqrt{2.67 \\times 10^{5}} \\approx 517\\) m/s.",
        ],
        answer: "About 517 m/s",
      },
      selfCheckExample: {
        prompt: "At what temperature is the rms speed of a gas twice its value at 27 °C?",
        steps: [
          "\\(v_{rms} \\propto \\sqrt{T}\\), so doubling the speed needs four times the kelvin temperature.",
          "\\(4 \\times 300 = 1200\\) K, which is \\(1200 - 273 = 927\\) °C.",
        ],
        answer: "1200 K, which is 927 °C",
      },
      practiceSet: [
        { prompt: "A gas has density 1.5 kg/m³ at a pressure of \\(1.0 \\times 10^{5}\\) Pa. What is its rms speed?", answer: "About 447 m/s" },
        { prompt: "The kelvin temperature of a gas is made 9 times. By what factor does its rms speed change?", answer: "It becomes 3 times" },
        { prompt: "The pressure of a gas is doubled at a fixed temperature. What happens to its rms speed?", answer: "It does not change" },
        { prompt: "Write the rms speed of a gas in terms of its pressure and density.", answer: "\\(v_{rms} = \\sqrt{3P/\\rho}\\)" },
      ],
      pyqExampleId: "2c40094e-2eda-4c73-b5c0-8d0ecbdee3fb",
      traps: [
        {
          title: "Speed goes as the square root of temperature",
          body: "Doubling the kelvin temperature raises the rms speed only by \\(\\sqrt{2}\\), about 1.41 times. To double the speed, make the temperature four times.",
        },
        {
          title: "Use the molar mass in kg/mol",
          body: "In \\(\\sqrt{3RT/M}\\), M for nitrogen is 0.028 kg/mol, not 28. Using 28 makes the speed about 32 times too small.",
        },
        {
          title: "Read 'increased by' with care",
          body: "A speed increased by 3 times its value, added on, becomes 4 times the old speed. NEET 2023 read it this way, which needed the kelvin temperature to become 16 times.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphkt-equipartition",
      name: "Equipartition of energy and specific heats",
      intuition:
        "A molecule can store energy in more than one way. It moves along x, y and z; a molecule with two or more atoms also spins; and its atoms can vibrate against each other. Each independent way is a degree of freedom. In thermal equilibrium, energy is shared out equally among them. Count the degrees of freedom and you know the internal energy, and from it the specific heats and their ratio γ.",
      definition:
        "- **Law of equipartition:** each translational and each rotational degree of freedom holds \\(\\dfrac{1}{2}k_BT\\) on average. Each vibrational mode holds \\(k_BT\\), because it has kinetic and potential energy.\n" +
        "- **Monatomic** (3 translational): \\(C_v = \\dfrac{3}{2}R\\), \\(C_p = \\dfrac{5}{2}R\\), \\(\\gamma = \\dfrac{5}{3}\\).\n" +
        "- **Diatomic, rigid** (3 translational, 2 rotational): \\(C_v = \\dfrac{5}{2}R\\), \\(C_p = \\dfrac{7}{2}R\\), \\(\\gamma = \\dfrac{7}{5}\\). If it also vibrates: \\(C_v = \\dfrac{7}{2}R\\), \\(\\gamma = \\dfrac{9}{7}\\).\n" +
        "- **Polyatomic** (3 translational, 3 rotational, f vibrational modes): \\(C_v = (3 + f)R\\), \\(C_p = (4 + f)R\\), \\(\\gamma = \\dfrac{4 + f}{3 + f}\\).\n" +
        "- Always \\(C_p - C_v = R\\). Short cut: if one molecule's average energy is \\(\\dfrac{s}{2}k_BT\\), then \\(C_v = \\dfrac{s}{2}R\\) and \\(\\gamma = 1 + \\dfrac{2}{s}\\), where s counts each vibrational mode twice.",
      formula: {
        label: "Equipartition",
        latex: "U = \\frac{s}{2}RT\\ \\text{per mole}, \\qquad C_v = \\frac{s}{2}R, \\qquad C_p = C_v + R, \\qquad \\gamma = 1 + \\frac{2}{s}",
        symbols: [
          { symbol: "\\(s\\)", meaning: "energy terms per molecule: one per translational or rotational degree, two per vibrational mode" },
          { symbol: "\\(\\gamma\\)", meaning: "ratio of the specific heats Cp over Cv" },
        ],
      },
      authoredExample: {
        prompt:
          "One mole of a monatomic gas is mixed with one mole of a rigid diatomic gas. Find the molar \\(C_v\\) of the mixture and its \\(\\gamma\\).",
        steps: [
          "Heat to raise both moles by 1 K: \\(\\dfrac{3}{2}R + \\dfrac{5}{2}R = 4R\\), shared by 2 moles, so \\(C_v = 2R\\).",
          "\\(C_p = C_v + R = 3R\\).",
          "\\(\\gamma = \\dfrac{3R}{2R} = 1.5\\).",
        ],
        answer: "\\(C_v = 2R\\) and \\(\\gamma = 1.5\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\gamma\\) for a diatomic gas whose molecules also vibrate, with one vibrational mode.",
        steps: [
          "Energy terms: 3 translational + 2 rotational + 2 for the vibration = 7, so \\(C_v = \\dfrac{7}{2}R\\).",
          "\\(C_p = \\dfrac{9}{2}R\\), so \\(\\gamma = \\dfrac{9}{7}\\).",
        ],
        answer: "9/7",
      },
      practiceSet: [
        { prompt: "What is the ratio of specific heats \\(\\gamma\\) for a monatomic gas?", answer: "5/3" },
        { prompt: "What is the average energy of one molecule of a rigid diatomic gas at temperature T?", answer: "\\(\\dfrac{5}{2}k_BT\\)" },
        { prompt: "Internal energy of 2 mol of oxygen, treated as a rigid diatomic gas, at 300 K? (R = 8.3 J/mol K)", answer: "12450 J" },
        { prompt: "On average, how much energy does one vibrational mode of a molecule hold?", answer: "\\(k_BT\\)" },
      ],
      pyqExampleId: "ac6b0a40-d95e-440d-aa33-b0930c84fef7",
      traps: [
        {
          title: "A vibrational mode counts twice",
          body: "Each vibrational mode holds \\(k_BT\\), not \\(\\dfrac{1}{2}k_BT\\), because the vibrating atoms have both kinetic and potential energy.",
        },
        {
          title: "7/5 is for a rigid diatomic gas",
          body: "\\(\\gamma = \\dfrac{7}{5}\\) holds only when the diatomic molecule does not vibrate. With vibration \\(C_v\\) rises to \\(\\dfrac{7}{2}R\\) and \\(\\gamma\\) falls to \\(\\dfrac{9}{7}\\).",
        },
        {
          title: "More degrees of freedom, smaller γ",
          body: "\\(\\gamma = 1 + \\dfrac{2}{s}\\) falls towards 1 as a molecule gets more ways to store energy: 5/3 for a monatomic gas, then 7/5, then 9/7.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphkt-mean-free-path",
      name: "Mean free path",
      intuition:
        "Molecules are tiny, but there are so many of them that each one keeps bumping into others. The average distance it travels between two collisions is the mean free path. Pack the molecules closer, or make them fatter, and a molecule hits another sooner.",
      definition:
        "- \\(l = \\dfrac{1}{\\sqrt{2}\\,n\\pi d^{2}}\\), where n is the number of molecules per unit volume and d the diameter of a molecule.\n" +
        "- \\(l \\propto \\dfrac{1}{n}\\) and \\(l \\propto \\dfrac{1}{d^{2}}\\). It does not depend on how fast the molecules move.\n" +
        "- At a fixed temperature, n is proportional to pressure, so halving the pressure doubles the mean free path. Heating a gas in a closed rigid vessel keeps n, so l does not change.",
      formula: {
        label: "Mean free path",
        latex: "l = \\frac{1}{\\sqrt{2}\\,n\\pi d^{2}}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "molecules per unit volume" },
          { symbol: "\\(d\\)", meaning: "diameter of a molecule" },
        ],
      },
      authoredExample: {
        prompt:
          "Nitrogen molecules of diameter \\(3 \\times 10^{-10}\\) m have a number density of \\(2.7 \\times 10^{25}\\) per m³. Find the mean free path.",
        steps: [
          "\\(\\pi d^{2} = 3.14 \\times 9 \\times 10^{-20} = 2.83 \\times 10^{-19}\\ \\text{m}^{2}\\).",
          "\\(\\sqrt{2}\\,n\\pi d^{2} = 1.414 \\times 2.7 \\times 10^{25} \\times 2.83 \\times 10^{-19} \\approx 1.08 \\times 10^{7}\\) per m.",
          "\\(l = \\dfrac{1}{1.08 \\times 10^{7}} \\approx 9.3 \\times 10^{-8}\\) m.",
        ],
        answer: "About \\(9.3 \\times 10^{-8}\\) m",
      },
      selfCheckExample: {
        prompt: "The pressure of a gas is halved at a fixed temperature. What happens to its mean free path?",
        steps: [
          "At a fixed temperature \\(n = \\dfrac{P}{k_BT}\\), so halving P halves n.",
          "\\(l \\propto \\dfrac{1}{n}\\), so l doubles.",
        ],
        answer: "It doubles",
      },
      practiceSet: [
        { prompt: "Write the mean free path of a gas in terms of its number density n and molecular diameter d.", answer: "\\(l = \\dfrac{1}{\\sqrt{2}\\,n\\pi d^{2}}\\)" },
        { prompt: "A gas in a closed rigid vessel is heated. Does the mean free path of its molecules change?", answer: "No. The number density stays the same" },
        { prompt: "The mean free path of air molecules at 1 atm is about \\(10^{-7}\\) m. Roughly what is it at \\(10^{-3}\\) atm and the same temperature?", answer: "About \\(10^{-4}\\) m" },
      ],
      pyqExampleId: "fa9e4ff2-e235-462b-a7da-1268b1a9d235",
      traps: [
        {
          title: "The diameter is squared",
          body: "Doubling the diameter of the molecules cuts the mean free path to a quarter, not to a half, because \\(l \\propto 1/d^{2}\\).",
        },
        {
          title: "Heating alone does not change the mean free path",
          body: "Faster molecules collide more often but cover more distance in between. In a rigid vessel n is unchanged, so l stays the same.",
        },
      ],
    },
  ],
};
