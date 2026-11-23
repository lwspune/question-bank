import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_RMS_NOTE: SubtopicNote = {
  subtopicName: "RMS Speed and Interpretation of Temperature",
  title: "RMS Speed and the Meaning of Temperature",
  oneLineDefinition:
    "The root mean square speed of gas molecules, v rms = √(3RT/M₀), and the kinetic meaning of temperature: the average kinetic energy of a molecule is (3/2)kT, k being the Boltzmann constant.",
  whyItMatters:
    "16 questions. Seven were set in board papers: prove that the rms speed is proportional to √T (2017), the kinetic energy per molecule (2018), what the rms speed is proportional to (2022), show that the average energy of a molecule is proportional to T (2024), compare the rms speeds of hydrogen and oxygen (2024), the kinetic energy of a litre of gas at S.T.P. (2025), and the temperature at which a molecule has the energy of an electron accelerated through 1 volt (2026). The textbook adds the rms speed of helium, gases with equal rms speeds, and energy per kilomole, per kilogram and per molecule.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpkt-rms-speed",
      name: "Root mean square speed",
      intuition:
        "Molecules of a gas have all sorts of speeds, so we need one typical value. Square every speed, take the average, then take the square root: that is the rms speed. It grows with temperature, but only as the square root. And at the same temperature, lighter molecules move faster.",
      definition:
        "**Derivation:**\n" +
        "- Pressure of a gas: \\(P = \\dfrac{1}{3}\\dfrac{N}{V}m\\overline{v^2}\\), so \\(PV = \\dfrac{1}{3}Nm\\overline{v^2}\\).\n" +
        "- For n moles, the total mass is \\(Nm = nM_0\\), where \\(M_0\\) is the molar mass: \\(PV = \\dfrac{1}{3}nM_0\\overline{v^2}\\).\n" +
        "- The ideal gas equation gives \\(PV = nRT\\). Comparing, \\(\\overline{v^2} = \\dfrac{3RT}{M_0}\\).\n" +
        "- \\(v_{rms} = \\sqrt{\\overline{v^2}} = \\sqrt{\\dfrac{3RT}{M_0}} = \\sqrt{\\dfrac{3k_BT}{m}}\\).\n" +
        "- For a given gas, \\(\\sqrt{3R/M_0}\\) is constant, so \\(v_{rms} \\propto \\sqrt{T}\\).\n" +
        "- For two gases: \\(\\dfrac{v_1}{v_2} = \\sqrt{\\dfrac{T_1}{T_2} \\times \\dfrac{M_2}{M_1}}\\).",
      formula: {
        label: "RMS speed",
        latex: "v_{rms} = \\sqrt{\\frac{3RT}{M_0}} = \\sqrt{\\frac{3k_BT}{m}}",
        symbols: [
          { symbol: "\\(M_0\\)", meaning: "molar mass in kg/mol" },
          { symbol: "\\(m\\)", meaning: "mass of one molecule" },
          { symbol: "\\(T\\)", meaning: "absolute temperature" },
        ],
      },
      authoredExample: {
        prompt: "Find the rms speed of nitrogen molecules at 27 °C. (Molar mass of nitrogen 28 g/mol, R = 8.31 J mol⁻¹ K⁻¹)",
        steps: [
          "Given: \\(T = 27 + 273 = 300\\) K, \\(M_0 = 28\\) g/mol \\(= 0.028\\) kg/mol, \\(R = 8.31\\) J mol⁻¹ K⁻¹.",
          "Formula: \\(v_{rms} = \\sqrt{\\dfrac{3RT}{M_0}}\\).",
          "Substitution: \\(v_{rms} = \\sqrt{\\dfrac{3 \\times 8.31 \\times 300}{0.028}} = \\sqrt{2.67 \\times 10^5}\\).",
          "\\(v_{rms} = 517\\) m/s.",
        ],
        answer: "517 m/s",
      },
      selfCheckExample: {
        prompt: "The rms speed of the molecules of a gas at 27 °C is 400 m/s. At what temperature will it be 800 m/s?",
        steps: [
          "\\(v_{rms} \\propto \\sqrt{T}\\), so doubling the speed needs four times the absolute temperature.",
          "\\(T = 4 \\times 300 = 1200\\) K, that is \\(1200 - 273 = 927\\) °C.",
        ],
        answer: "1200 K (927 °C)",
      },
      practiceSet: [
        { prompt: "The absolute temperature of a gas is made nine times. By what factor does the rms speed change?", answer: "It becomes three times" },
        { prompt: "At the same temperature, find the ratio of the rms speeds of helium (M₀ = 4) and oxygen (M₀ = 32) molecules.", answer: "\\(\\sqrt{32/4} = \\sqrt{8} = 2\\sqrt{2}\\), about 2.83 : 1" },
        { prompt: "In \\(v_{rms} = \\sqrt{3RT/M_0}\\), in what unit must \\(M_0\\) be put to get m/s?", answer: "kg/mol" },
      ],
      pyqExampleId: "68e4ef64-679b-4a97-8b07-1c65ddba7420",
      traps: [
        {
          title: "Molar mass in grams",
          body: "With R in J mol⁻¹ K⁻¹, the molar mass must be in kg/mol. Using 28 instead of 0.028 for nitrogen makes the speed \\(\\sqrt{1000}\\), about 32 times, too small.",
        },
        {
          title: "Speed proportional to T",
          body: "\\(v_{rms} \\propto \\sqrt{T}\\), not T. Four times the absolute temperature only doubles the rms speed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-temperature",
      name: "Kinetic interpretation of temperature",
      intuition:
        "What does a thermometer really measure? Kinetic theory answers: the average kinetic energy of the molecules. Heat a gas and its molecules speed up; that faster motion is what we read as a higher temperature. At the same temperature every gas, light or heavy, has the same average energy per molecule.",
      definition:
        "**Derivation:**\n" +
        "- \\(PV = \\dfrac{1}{3}Nm\\overline{v^2} = \\dfrac{2}{3}N\\left(\\dfrac{1}{2}m\\overline{v^2}\\right)\\).\n" +
        "- The ideal gas equation for N molecules: \\(PV = Nk_BT\\).\n" +
        "- Comparing: \\(\\dfrac{1}{2}m\\overline{v^2} = \\dfrac{3}{2}k_BT\\).\n" +
        "- So the **average kinetic energy per molecule** is directly proportional to the absolute temperature, and does not depend on the nature of the gas.\n" +
        "- Per mole: \\(E = \\dfrac{3}{2}RT\\). Per kilogram: \\(E = \\dfrac{3}{2}\\dfrac{RT}{M_0}\\).\n" +
        "- The mean square speed \\(\\overline{v^2} = \\dfrac{3k_BT}{m}\\) is proportional to T.\n" +
        "- When a gas is heated, the heat goes into the kinetic energy of its molecules (an ideal gas has no potential energy), so its temperature rises.",
      formula: {
        label: "Average kinetic energy of a molecule",
        latex: "\\frac{1}{2}m\\overline{v^2} = \\frac{3}{2}k_BT",
      },
      authoredExample: {
        prompt: "Find the average kinetic energy of a gas molecule at 27 °C. (\\(k_B = 1.38 \\times 10^{-23}\\) J/K)",
        steps: [
          "Given: \\(T = 27 + 273 = 300\\) K, \\(k_B = 1.38 \\times 10^{-23}\\) J/K.",
          "Formula: \\(E = \\dfrac{3}{2}k_BT\\).",
          "Substitution: \\(E = 1.5 \\times 1.38 \\times 10^{-23} \\times 300\\).",
          "\\(E = 6.21 \\times 10^{-21}\\) J.",
        ],
        answer: "6.21 × 10⁻²¹ J",
      },
      selfCheckExample: {
        prompt: "At what temperature will the average kinetic energy of a gas molecule be double its value at 27 °C?",
        steps: ["E is proportional to the absolute temperature.", "\\(T = 2 \\times 300 = 600\\) K, that is 327 °C."],
        answer: "600 K (327 °C)",
      },
      practiceSet: [
        { prompt: "Find the average kinetic energy of one mole of a gas at 300 K. (R = 8.31 J mol⁻¹ K⁻¹)", answer: "\\(\\frac{3}{2} \\times 8.31 \\times 300 = 3739.5\\) J, about 3.74 × 10³ J" },
        { prompt: "Hydrogen and oxygen are at the same temperature. Compare the average kinetic energies of their molecules.", answer: "Equal. It depends only on the temperature" },
        { prompt: "The absolute temperature of a gas is doubled. What happens to the mean square speed and to the rms speed?", answer: "The mean square speed doubles; the rms speed becomes \\(\\sqrt{2}\\) times" },
        { prompt: "Explain in one line why heating a gas raises its temperature.", answer: "The heat increases the average kinetic energy of the molecules, and temperature is a measure of that energy" },
      ],
      pyqExampleId: "c415987a-aae7-4ab2-8c1a-61eaf3a0d775",
      traps: [
        {
          title: "k_B per molecule, R per mole",
          body: "\\(\\frac{3}{2}k_BT\\) is the energy of ONE molecule; \\(\\frac{3}{2}RT\\) is the energy of one MOLE. Mixing them changes the answer by a factor of \\(6 \\times 10^{23}\\).",
        },
        {
          title: "Mean square speed and rms speed are different",
          body: "\\(\\overline{v^2}\\) is proportional to T; \\(v_{rms}\\) is proportional to \\(\\sqrt{T}\\). Read which one the question asks for.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-gas-energy",
      name: "Total kinetic energy of a gas",
      intuition:
        "Pressure and kinetic energy are two views of the same molecular motion. Multiply the pressure by the volume and you get two thirds of the total kinetic energy of all the molecules inside. So pressure and volume alone tell you the energy: no temperature and no molar mass needed.",
      definition:
        "- \\(PV = \\dfrac{1}{3}Nm\\overline{v^2} = \\dfrac{2}{3}\\left(N \\times \\dfrac{1}{2}m\\overline{v^2}\\right) = \\dfrac{2}{3}E\\), where E is the total translational kinetic energy of the gas.\n" +
        "- So \\(E = \\dfrac{3}{2}PV\\), and the kinetic energy per unit volume is \\(\\dfrac{3}{2}P\\).\n" +
        "- Also \\(E = \\dfrac{3}{2}Nk_BT\\).\n" +
        "- Units: 1 cc = 1 cm³ = 10⁻⁶ m³; 1 litre = 10⁻³ m³; standard pressure \\(1.013 \\times 10^5\\) N/m².",
      formula: {
        label: "Total kinetic energy",
        latex: "E = \\frac{3}{2}PV = \\frac{3}{2}Nk_BT",
      },
      authoredExample: {
        prompt: "The molecules of a gas in a cylinder of volume 0.02 m³ have a total translational kinetic energy of 6000 J. Find the pressure of the gas.",
        steps: [
          "Given: \\(E = 6000\\) J, \\(V = 0.02\\) m³.",
          "Formula: \\(E = \\dfrac{3}{2}PV\\), so \\(P = \\dfrac{2E}{3V}\\).",
          "Substitution: \\(P = \\dfrac{2 \\times 6000}{3 \\times 0.02} = \\dfrac{12000}{0.06}\\).",
          "\\(P = 2 \\times 10^5\\) N/m².",
        ],
        answer: "2 × 10⁵ N/m²",
      },
      selfCheckExample: {
        prompt: "The molecules of a gas at 300 K have a total translational kinetic energy of 1500 J. How many molecules are there? (\\(k_B = 1.38 \\times 10^{-23}\\) J/K)",
        steps: [
          "\\(E = \\dfrac{3}{2}Nk_BT\\), so \\(N = \\dfrac{2E}{3k_BT}\\).",
          "\\(N = \\dfrac{3000}{3 \\times 1.38 \\times 10^{-23} \\times 300} = 2.42 \\times 10^{23}\\).",
        ],
        answer: "About 2.42 × 10²³ molecules",
      },
      practiceSet: [
        { prompt: "Does the total kinetic energy given by \\(E = \\frac{3}{2}PV\\) depend on which gas it is?", answer: "No. Only the pressure and volume matter" },
        { prompt: "The pressure of a gas is doubled at constant volume. What happens to its total translational kinetic energy?", answer: "It doubles" },
        { prompt: "Express 2500 cc in m³.", answer: "\\(2.5 \\times 10^{-3}\\) m³" },
      ],
      pyqExampleId: "0873b1bd-7027-42b9-8e05-7a91536815d7",
      traps: [
        {
          title: "Volume left in cc or litres",
          body: "With pressure in N/m², the volume must be in m³ to give joules. 1 cc is 10⁻⁶ m³, not 10⁻³ m³.",
        },
        {
          title: "Writing E = PV",
          body: "PV is two thirds of the energy, so \\(E = \\frac{3}{2}PV\\). Dropping the \\(\\frac{3}{2}\\) loses the answer mark.",
        },
      ],
    },
  ],
};
