import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_GAS_NOTE: SubtopicNote = {
  subtopicName: "Behaviour of Gases, Ideal and Real Gas",
  title: "Gas Laws, Ideal Gas and Real Gas",
  oneLineDefinition:
    "Boyle's, Charles' and Gay-Lussac's laws combine into the ideal gas equation PV = nRT, which a real gas obeys only at low pressure and high temperature.",
  whyItMatters:
    "8 questions. Two were set in board papers: the initial temperature of a gas whose pressure rises by 0.4% for a 1 °C rise (2025), and what energy the molecules of an ideal gas possess (2026). The textbook adds the ideal gas equation for a given mass, the number of molecules in two vessels, a Boyle's law percentage change and when a real gas behaves like an ideal one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpkt-gas-laws",
      name: "Gas laws and the ideal gas equation",
      intuition:
        "A gas is described by three quantities: pressure, volume and temperature. Keep one of them fixed and the other two follow a simple rule. Put all three rules together and you get one equation for the gas. The one rule that never changes: temperature must be in kelvin, because the laws are proportions and a proportion needs a true zero.",
      definition:
        "- **Boyle's law:** at constant temperature, the pressure of a fixed mass of gas is inversely proportional to its volume, \\(PV = \\text{constant}\\).\n" +
        "- **Charles' law:** at constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature, \\(V \\propto T\\).\n" +
        "- **Gay-Lussac's law:** at constant volume, the pressure of a fixed mass of gas is directly proportional to its absolute temperature, \\(P \\propto T\\).\n" +
        "- Together they give the **ideal gas equation** \\(PV = nRT\\), where \\(n = \\dfrac{\\text{mass}}{M_0}\\) is the number of moles and \\(R = 8.31\\) J mol⁻¹ K⁻¹.\n" +
        "- In terms of the number of molecules N: \\(PV = Nk_BT\\), where \\(k_B = \\dfrac{R}{N_A} = 1.38 \\times 10^{-23}\\) J/K is the Boltzmann constant.",
      formula: {
        label: "Ideal gas equation",
        latex: "PV = nRT = N k_B T",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of moles" },
          { symbol: "\\(N\\)", meaning: "number of molecules" },
          { symbol: "\\(k_B\\)", meaning: "Boltzmann constant, R divided by the Avogadro number" },
          { symbol: "\\(T\\)", meaning: "absolute temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "A gas at 27 °C is heated at constant pressure until its volume becomes double. Find its final temperature.",
        steps: [
          "Given: \\(T_1 = 27 + 273 = 300\\) K, \\(V_2 = 2V_1\\), pressure constant.",
          "Formula (Charles' law): \\(\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}\\).",
          "Substitution: \\(T_2 = T_1 \\times \\dfrac{V_2}{V_1} = 300 \\times 2 = 600\\) K.",
          "In Celsius: \\(600 - 273 = 327\\) °C.",
        ],
        answer: "600 K, that is 327 °C",
      },
      selfCheckExample: {
        prompt: "How many moles are there in 16 g of oxygen gas (O₂)? Write the ideal gas equation for this mass.",
        steps: [
          "The molar mass of O₂ is \\(2 \\times 16 = 32\\) g/mol.",
          "\\(n = \\dfrac{16}{32} = 0.5\\) mol, so \\(PV = 0.5\\,RT\\).",
        ],
        answer: "0.5 mol; PV = RT/2",
      },
      practiceSet: [
        { prompt: "Gas in a sealed rigid vessel is heated from 27 °C to 127 °C. By what factor does its pressure increase?", answer: "4/3 (400 K over 300 K)" },
        { prompt: "State Boyle's law.", answer: "At constant temperature, the pressure of a fixed mass of gas is inversely proportional to its volume" },
        { prompt: "Write the Boltzmann constant in terms of R and the Avogadro number.", answer: "\\(k_B = R/N_A\\)" },
        { prompt: "Vessel X holds a gas at twice the pressure and half the volume of the same gas in vessel Y, at the same temperature. Compare the numbers of molecules.", answer: "Equal, since \\(N = PV/k_BT\\) and \\(2 \\times \\tfrac{1}{2} = 1\\)" },
      ],
      pyqExampleId: "6df106ba-1737-4aed-b634-5c7d17dabd6b",
      traps: [
        {
          title: "Celsius in a gas law",
          body: "Every gas law uses absolute temperature. Doubling 27 °C to 54 °C does not double the volume: in kelvin that is 300 K to 327 K, a rise of only 9%. Convert first, then use the law.",
        },
        {
          title: "Treating a percentage change as equal and opposite",
          body: "At constant temperature, a 20% fall in pressure does not give a 20% rise in volume. \\(V_2 = V_1/0.8 = 1.25\\,V_1\\), a 25% rise. Work it out from \\(P_1V_1 = P_2V_2\\).",
        },
        {
          title: "Using the atomic mass for a diatomic gas",
          body: "Nitrogen and oxygen gases are N₂ and O₂. Their molar masses are 28 and 32 g/mol, not 14 and 16.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpkt-ideal-real",
      name: "Ideal gas and real gas",
      intuition:
        "An ideal gas is a model: tiny molecules that never pull on each other. A real gas has molecules with some size and some attraction between them. When the molecules are far apart, at low pressure and high temperature, these two effects hardly matter, and the real gas behaves almost like the ideal one.",
      definition:
        "- An **ideal gas** obeys \\(PV = nRT\\) exactly at all pressures and all temperatures. Its molecules exert no force on one another except during collisions, so it has no potential energy: its internal energy is purely kinetic.\n" +
        "- No ideal gas exists. Every real gas is made of molecules of finite size that attract one another.\n" +
        "- A **real gas** obeys the ideal gas equation closely at **low pressure** and **high temperature**, that is at low density, when the molecules are far apart.",
      table: {
        columns: ["Point", "Ideal gas", "Real gas"],
        rows: [
          { cells: ["Ideal gas equation", "Obeyed at all pressures and temperatures", "Obeyed only at low pressure and high temperature"] },
          { cells: ["Size of molecules", "Negligible: point particles", "Finite"] },
          {
            cells: ["Force between molecules", "None, except during a collision", "Attractive forces act between molecules"],
            pyqExampleId: "1592f546-08df-4138-a0f5-93af70f08dce",
            noteAmber: "Board 2026 asked what energy the molecules of an ideal gas possess: only kinetic energy.",
          },
          { cells: ["Energy of molecules", "Only kinetic energy", "Kinetic energy and potential energy"] },
          { cells: ["Existence", "Does not exist; it is a model", "All actual gases"] },
        ],
      },
      selfCheckExample: {
        prompt: "A gas is squeezed to a very high pressure at a low temperature. Will it obey PV = nRT closely? Give the reason.",
        steps: [
          "At high pressure the molecules are close together, so their own size is no longer negligible.",
          "At low temperature they move slowly, so the attraction between them matters.",
        ],
        answer: "No. Both the size of the molecules and the forces between them now matter",
      },
      practiceSet: [
        { prompt: "Under which two conditions does a real gas behave like an ideal gas?", answer: "Low pressure and high temperature" },
        { prompt: "Why is the internal energy of an ideal gas purely kinetic?", answer: "Its molecules exert no force on one another, so there is no potential energy" },
        { prompt: "Does an ideal gas exist in practice?", answer: "No. Real molecules have a finite size and attract one another" },
      ],
      traps: [
        {
          title: "Naming only one condition",
          body: "A real gas behaves ideally at low pressure AND high temperature. Writing only one of them loses half the mark.",
        },
      ],
    },
  ],
};
