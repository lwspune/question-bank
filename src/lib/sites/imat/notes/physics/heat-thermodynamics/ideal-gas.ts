import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_HTH_IDEAL_GAS_NOTE: SubtopicNote = {
  subtopicName: "Ideal Gas and Kinetic Theory",
  title: "Ideal Gases and Kinetic Theory",
  oneLineDefinition:
    "Pressure, volume and kelvin temperature of a fixed amount of gas are tied by pV = nRT, and temperature is a measure of the molecules' average kinetic energy.",
  whyItMatters:
    "Five past questions sit here, two of them in the ministry papers: Boyle's law as a pressure change and as a graph, a temperature found after a gas cools at fixed volume, and what does or does not change for gas molecules at a given temperature.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-hth-gas-laws",
      name: "The ideal gas equation and the three gas laws",
      intuition:
        "Gas pressure comes from molecules hitting the walls. Squeeze the same molecules into half the space and they hit each wall twice as often, so the pressure doubles. Heat them and they hit harder and more often, so the pressure rises unless the gas is allowed to expand. All of this only works with kelvin, because the molecules' energy is proportional to the kelvin temperature.",
      definition:
        "- An **ideal gas** obeys \\(pV = nRT\\) exactly; real gases come close at low pressure and high temperature.\n" +
        "- For a fixed amount of gas, \\(pV/T\\) is constant, so \\(\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}\\), with \\(T\\) **always in kelvin**.\n" +
        "- **Boyle's law** (constant \\(T\\)): \\(pV\\) is constant. Halve the volume and the pressure doubles. A graph of \\(p\\) against \\(V\\) is a falling curve (a hyperbola), steep at small volume and flattening out; \\(p\\) against \\(1/V\\) is a straight line through the origin.\n" +
        "- **Charles's law** (constant \\(p\\)): \\(V \\propto T\\).\n" +
        "- **Gay-Lussac's law** (constant \\(V\\)): \\(p \\propto T\\).",
      formula: {
        label: "Ideal gas equation",
        latex: "pV = nRT \\qquad \\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}",
        symbols: [
          { symbol: "\\(p\\)", meaning: "pressure, in Pa" },
          { symbol: "\\(V\\)", meaning: "volume, in m³" },
          { symbol: "\\(n\\)", meaning: "amount of gas, in mol" },
          { symbol: "\\(R\\)", meaning: "gas constant, 8.31 J mol⁻¹ K⁻¹" },
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas occupies 2.0 L at \\(2.0 \\times 10^5\\ \\text{Pa}\\) and 27 °C. It is compressed to 1.0 L and its temperature rises to 177 °C. What is its new pressure?",
        steps: [
          "Kelvin: \\(T_1 = 300\\ \\text{K}\\), \\(T_2 = 450\\ \\text{K}\\).",
          "\\(p_2 = p_1 \\times \\dfrac{V_1}{V_2} \\times \\dfrac{T_2}{T_1} = 2.0 \\times 10^5 \\times \\dfrac{2.0}{1.0} \\times \\dfrac{450}{300}\\).",
          "\\(p_2 = 2.0 \\times 10^5 \\times 2 \\times 1.5 = 6.0 \\times 10^5\\ \\text{Pa}\\). The volume ratio can stay in litres, because the units cancel.",
        ],
        answer: "\\(6.0 \\times 10^5\\ \\text{Pa}\\)",
      },
      selfCheckExample: {
        prompt:
          "A sealed rigid container holds gas at 27 °C and \\(1.2 \\times 10^5\\ \\text{Pa}\\). It is heated to 177 °C. What is the new pressure?",
        options: [
          "\\(0.80 \\times 10^5\\ \\text{Pa}\\)",
          "\\(1.2 \\times 10^5\\ \\text{Pa}\\)",
          "\\(1.8 \\times 10^5\\ \\text{Pa}\\)",
          "\\(2.4 \\times 10^5\\ \\text{Pa}\\)",
          "\\(7.9 \\times 10^5\\ \\text{Pa}\\)",
        ],
        steps: [
          "Rigid means constant volume, so \\(p \\propto T\\) in kelvin.",
          "\\(p_2 = 1.2 \\times 10^5 \\times 450/300 = 1.8 \\times 10^5\\ \\text{Pa}\\).",
          "Option E uses the Celsius ratio \\(177/27\\); A turns the ratio upside down; B forgets that heating changes the pressure.",
        ],
        answer: "(C) \\(1.8 \\times 10^5\\ \\text{Pa}\\)",
      },
      practiceSet: [
        { prompt: "4.0 L of gas at 1.0 atm is compressed to 1.0 L at constant temperature. What is the new pressure?", answer: "4.0 atm", method: "Boyle: \\(pV\\) constant" },
        { prompt: "2.0 L of gas at 300 K is heated to 600 K at constant pressure. What is its new volume?", answer: "4.0 L", method: "Charles: \\(V \\propto T\\)" },
        { prompt: "How many moles are in 0.0249 m³ of gas at \\(1.0 \\times 10^5\\ \\text{Pa}\\) and 300 K?", answer: "About 1.0 mol", method: "\\(n = pV/(RT)\\)" },
        { prompt: "Describe the graph of \\(p\\) against \\(V\\) for a gas at constant temperature.", answer: "A falling curve (hyperbola), steep at small volume and flatter at large volume" },
      ],
      traps: [
        {
          title: "Gas laws need kelvin, never Celsius",
          body: "Proportions such as \\(p \\propto T\\) hold only for absolute temperature. Heating from 10 °C to 20 °C does not double the pressure; it raises it by about 3.5%, from 283 K to 293 K.",
        },
        {
          title: "Boyle's law is not a straight line on a p against V graph",
          body: "At constant temperature, \\(p = \\text{constant}/V\\), a curve that falls ever less steeply. A straight line through the origin appears only when \\(p\\) is plotted against \\(1/V\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hth-kinetic",
      name: "Kinetic theory: temperature and molecular speed",
      intuition:
        "At one temperature every kind of gas molecule carries the same average kinetic energy. A heavy molecule with that energy must move more slowly than a light one, so light molecules are fast and heavy ones slow. In an ideal gas the molecules do not attract one another, so their kinetic energy is all the internal energy there is: fix the temperature and you fix the internal energy.",
      definition:
        "- The **mean kinetic energy** of a gas molecule depends **only on the kelvin temperature**, not on the type of gas.\n" +
        "- At the same temperature, lighter molecules have a larger **mean square speed** \\(\\langle v^2 \\rangle\\): the **rms speed** \\(v_{\\text{rms}} = \\sqrt{\\langle v^2 \\rangle}\\) goes as \\(1/\\sqrt{M}\\).\n" +
        "- The rms speed goes as \\(\\sqrt{T}\\): four times the kelvin temperature doubles it.\n" +
        "- The **internal energy** of a fixed amount of ideal gas depends only on its temperature. An ideal gas compressed or expanded at constant temperature keeps the same internal energy.",
      formula: {
        label: "Mean kinetic energy of a molecule",
        latex: "\\overline{E_k} = \\tfrac{1}{2} m \\langle v^2 \\rangle = \\tfrac{3}{2} k_B T",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass of one molecule, in kg" },
          { symbol: "\\(\\langle v^2 \\rangle\\)", meaning: "mean of the squared speeds" },
          { symbol: "\\(k_B\\)", meaning: "Boltzmann constant, 1.38 × 10⁻²³ J K⁻¹" },
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
        ],
      },
      authoredExample: {
        prompt:
          "Helium (molar mass 4 g/mol) and argon (40 g/mol) are mixed at 300 K. Find the mean kinetic energy of a molecule, and the ratio of the rms speed of helium to that of argon.",
        steps: [
          "\\(\\overline{E_k} = \\tfrac{3}{2} \\times 1.38 \\times 10^{-23} \\times 300 = 6.2 \\times 10^{-21}\\ \\text{J}\\), the same for both gases.",
          "Equal \\(\\tfrac{1}{2}m\\langle v^2 \\rangle\\) means \\(v_{\\text{rms}} \\propto 1/\\sqrt{m}\\).",
          "Ratio: \\(\\sqrt{40/4} = \\sqrt{10} \\approx 3.2\\). Helium atoms move about 3.2 times faster.",
        ],
        answer: "\\(6.2 \\times 10^{-21}\\ \\text{J}\\) each; helium about 3.2 times faster",
      },
      selfCheckExample: {
        prompt:
          "The absolute temperature of a gas is raised from 300 K to 1200 K. By what factor does the rms speed of its molecules change?",
        options: ["2", "4", "16", "\\(\\sqrt{2}\\)", "1 (no change)"],
        steps: [
          "The mean kinetic energy, and so \\(\\langle v^2 \\rangle\\), is proportional to \\(T\\): it rises by a factor of 4.",
          "The rms speed is the square root: \\(\\sqrt{4} = 2\\).",
          "Option B is the factor for the kinetic energy, not the speed; C squares instead of taking the root.",
        ],
        answer: "(A) 2",
      },
      practiceSet: [
        { prompt: "A gas goes from 300 K to 600 K. What happens to the mean kinetic energy of its molecules?", answer: "It doubles" },
        { prompt: "Hydrogen (2 g/mol) and oxygen (32 g/mol) are at the same temperature. What is the ratio of their rms speeds?", answer: "Hydrogen is 4 times faster", method: "\\(\\sqrt{32/2}\\)" },
        { prompt: "An ideal gas is compressed slowly at constant temperature. What happens to its internal energy?", answer: "It stays the same", method: "Internal energy depends only on \\(T\\)" },
      ],
      traps: [
        {
          title: "Heavier molecules do not have more kinetic energy",
          body: "At the same temperature all gas molecules have the same mean kinetic energy, whatever their mass. The heavier ones simply move more slowly, with a smaller mean square speed.",
        },
      ],
    },
  ],
};
