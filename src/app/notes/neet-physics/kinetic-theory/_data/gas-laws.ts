import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_KT_GAS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Ideal Gas Laws",
  title: "Ideal Gas Laws",
  oneLineDefinition:
    "The ideal gas equation PV = μRT, the laws of Boyle and Charles and how to read them off a graph, and Dalton's law for a mixture of gases.",
  whyItMatters:
    "Four NEET questions from 2022 to 2025, three of them from 2024 or later. Two use the ideal gas equation (the volume 4.5 kg of water would fill as a gas at STP in 2022, the oxygen taken out of a cylinder in 2025), one reads pressures off temperature and volume lines in 2024, and one finds the pressure when two chambers of gas are joined in 2025.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphkt-gas-equation",
      name: "The ideal gas equation",
      intuition:
        "Pressure, volume and temperature of a gas are tied together. Squeeze a gas into less room and it presses harder; heat it and it presses harder still. For a gas thin enough that its molecules hardly attract each other, all of this is one equation, PV = μRT. Knowing any three of P, V, T and the amount of gas gives the fourth.",
      definition:
        "- \\(PV = \\mu RT\\), with \\(\\mu\\) the number of moles: \\(\\mu = \\dfrac{\\text{mass}}{\\text{molar mass}} = \\dfrac{N}{N_A}\\).\n" +
        "- Per molecule: \\(PV = Nk_BT\\), where \\(k_B = \\dfrac{R}{N_A} = 1.38 \\times 10^{-23}\\) J/K is Boltzmann's constant.\n" +
        "- T is always in kelvin: \\(T = t + 273\\). P is the **absolute** pressure: a gauge reads pressure above the atmosphere, so add 1 atm to a gauge reading.\n" +
        "- At STP (273 K and 1 atm) one mole of any ideal gas fills 22.4 litres.\n" +
        "- For a fixed amount of gas: \\(\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}\\).",
      formula: {
        label: "Ideal gas equation",
        latex: "PV = \\mu RT = Nk_BT, \\qquad k_B = \\frac{R}{N_A}, \\qquad \\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "number of moles" },
          { symbol: "\\(N\\)", meaning: "number of molecules" },
          { symbol: "\\(k_B\\)", meaning: "Boltzmann's constant" },
        ],
      },
      authoredExample: {
        prompt:
          "A 20 litre cylinder holds oxygen at 27 °C and an absolute pressure of \\(2.49 \\times 10^{5}\\) Pa. Find the number of moles and the mass of oxygen in it. (R = 8.3 J/mol K, molar mass of oxygen 32 g/mol)",
        steps: [
          "Use SI units: \\(V = 20 \\times 10^{-3} = 0.02\\ \\text{m}^{3}\\) and \\(T = 27 + 273 = 300\\) K.",
          "\\(\\mu = \\dfrac{PV}{RT} = \\dfrac{2.49 \\times 10^{5} \\times 0.02}{8.3 \\times 300} = \\dfrac{4980}{2490} = 2\\) mol.",
          "Mass \\(= 2 \\times 32 = 64\\) g.",
        ],
        answer: "2 mol, which is 64 g of oxygen",
      },
      selfCheckExample: {
        prompt:
          "How many molecules are there in 1 m³ of a gas at 300 K and \\(1.38 \\times 10^{5}\\) Pa? (\\(k_B = 1.38 \\times 10^{-23}\\) J/K)",
        steps: [
          "\\(N = \\dfrac{PV}{k_BT} = \\dfrac{1.38 \\times 10^{5} \\times 1}{1.38 \\times 10^{-23} \\times 300}\\).",
          "\\(N = \\dfrac{10^{28}}{300} \\approx 3.3 \\times 10^{25}\\).",
        ],
        answer: "About \\(3.3 \\times 10^{25}\\) molecules",
      },
      practiceSet: [
        { prompt: "A tyre gauge reads 2 atm. What is the absolute pressure of the air inside the tyre?", answer: "3 atm" },
        { prompt: "Write Boltzmann's constant in terms of the gas constant R and Avogadro's number.", answer: "\\(k_B = R/N_A\\)" },
        { prompt: "The pressure of a fixed amount of gas is doubled and its kelvin temperature is also doubled. What happens to its volume?", answer: "It stays the same" },
        { prompt: "A sealed rigid vessel of gas is heated from 27 °C to 127 °C. Ratio of final to initial pressure?", answer: "4 : 3" },
      ],
      pyqExampleId: "eafdeeb7-1deb-458c-97ca-1cae4ead73ff",
      traps: [
        {
          title: "Temperature goes in kelvin",
          body: "Heating a gas from 20 °C to 40 °C does not double its pressure or volume. Change to kelvin first: 293 K to 313 K is a rise of under 7%.",
        },
        {
          title: "A gauge reading is not the gas pressure",
          body: "A gauge shows how far the pressure is above the atmosphere. In \\(PV = \\mu RT\\) use the absolute pressure, the gauge reading plus 1 atm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphkt-gas-graphs",
      name: "Boyle's and Charles's laws on a graph",
      intuition:
        "Hold one of P, V and T fixed and the ideal gas equation turns into a simple law between the other two. Each law has a shape on a graph, and NEET likes to give the graph and ask which line is at the higher pressure or temperature. The trick is always the same: fix one quantity by drawing a line across the graph, then compare the other.",
      definition:
        "- **Boyle's law** (fixed T and amount): \\(PV\\) is constant. On a P-V graph each temperature gives a curve, an isotherm; the curve farther from the axes is at the higher temperature.\n" +
        "- **Charles's law** (fixed P and amount): \\(V \\propto T\\) in kelvin. On a V-T graph this is a straight line through the origin with slope \\(\\dfrac{\\mu R}{P}\\), so a steeper line means a lower pressure.\n" +
        "- At fixed V: \\(P \\propto T\\) in kelvin.\n" +
        "- To compare lines: at one temperature, the line with the larger volume is at the lower pressure.",
      formula: {
        label: "Gas laws",
        latex: "PV = \\text{constant}\\ (T\\ \\text{fixed}), \\qquad \\frac{V}{T} = \\frac{\\mu R}{P}\\ (P\\ \\text{fixed}), \\qquad \\frac{P}{T} = \\text{constant}\\ (V\\ \\text{fixed})",
      },
      authoredExample: {
        prompt:
          "Two straight lines through the origin on a V-T graph are drawn for the same amount of one gas at two fixed pressures. Line 1 is twice as steep as line 2. Find \\(P_1/P_2\\).",
        steps: [
          "At fixed pressure \\(V = \\dfrac{\\mu R}{P}T\\), so the slope is \\(\\dfrac{\\mu R}{P}\\).",
          "Slope 1 is twice slope 2, so \\(\\dfrac{\\mu R}{P_1} = 2 \\times \\dfrac{\\mu R}{P_2}\\), which gives \\(P_2 = 2P_1\\).",
        ],
        answer: "\\(P_1/P_2 = 1/2\\): the steeper line is at the lower pressure",
      },
      selfCheckExample: {
        prompt: "At a fixed temperature, 6 litres of a gas at 1 atm is squeezed to 2 litres. What is its new pressure?",
        steps: [
          "Boyle's law: \\(P_1V_1 = P_2V_2\\).",
          "\\(1 \\times 6 = P_2 \\times 2\\), so \\(P_2 = 3\\) atm.",
        ],
        answer: "3 atm",
      },
      practiceSet: [
        { prompt: "At constant pressure a gas fills 300 mL at 27 °C. What volume does it fill at 127 °C?", answer: "400 mL" },
        { prompt: "On a P-V graph, two isotherms are drawn for the same amount of gas. Which one is at the higher temperature?", answer: "The one farther from the axes" },
        { prompt: "A gas at 300 K is heated at constant volume until its pressure is 1.5 times the start. What is its new temperature?", answer: "450 K" },
        { prompt: "State Boyle's law for a fixed amount of gas.", answer: "At a fixed temperature, PV stays constant" },
      ],
      pyqExampleId: "36821154-d116-41ed-aa3d-9cae09bbb46f",
      traps: [
        {
          title: "The steeper V-T line is at the lower pressure",
          body: "The slope of a Charles's law line is \\(\\mu R/P\\), so a larger pressure gives a flatter line. At one temperature, more volume means less pressure.",
        },
        {
          title: "Charles's law needs kelvin",
          body: "\\(V \\propto T\\) holds only with T in kelvin. Going from 27 °C to 54 °C raises the volume by 27/300, about 9%, not by double.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphkt-mixtures",
      name: "Mixtures of gases and Dalton's law",
      intuition:
        "In a mixture of gases that do not react, each gas spreads through the whole vessel and pushes on the walls as if the others were not there. The pressure each gas would give alone is its partial pressure, and the total pressure is just their sum. The moles of the gases add too.",
      definition:
        "- **Dalton's law of partial pressures:** \\(P = P_1 + P_2 + \\dots\\) for non-reacting ideal gases, each \\(P_i = \\dfrac{\\mu_iRT}{V}\\) with V the whole volume.\n" +
        "- A gas's share of the pressure is its share of the moles: \\(P_i = \\dfrac{\\mu_i}{\\mu}P\\).\n" +
        "- Two gases at the same temperature, in volumes \\(V_1\\) and \\(V_2\\), joined into one vessel: each spreads into \\(V_1 + V_2\\) (Boyle) and the pressures add (Dalton), so \\(P(V_1 + V_2) = P_1V_1 + P_2V_2\\).\n" +
        "- The same result holds when two lots of one kind of gas mix in an insulated container with no work done: the total internal energy is kept, and for one kind of gas that energy is proportional to PV (the next page shows why).",
      formula: {
        label: "Dalton's law",
        latex: "P = P_1 + P_2, \\qquad P_i = \\frac{\\mu_i}{\\mu}P, \\qquad P(V_1 + V_2) = P_1V_1 + P_2V_2",
      },
      authoredExample: {
        prompt:
          "A 10 litre vessel at 300 K holds 0.2 mol of nitrogen and 0.3 mol of oxygen. Find each partial pressure and the total pressure. (R = 8.3 J/mol K)",
        steps: [
          "Each gas fills the whole \\(V = 0.01\\ \\text{m}^{3}\\).",
          "\\(P_{N_2} = \\dfrac{0.2 \\times 8.3 \\times 300}{0.01} = 4.98 \\times 10^{4}\\) Pa and \\(P_{O_2} = \\dfrac{0.3 \\times 8.3 \\times 300}{0.01} = 7.47 \\times 10^{4}\\) Pa.",
          "Total: \\(P = 4.98 \\times 10^{4} + 7.47 \\times 10^{4} = 1.245 \\times 10^{5}\\) Pa.",
        ],
        answer: "\\(4.98 \\times 10^{4}\\) Pa, \\(7.47 \\times 10^{4}\\) Pa, total \\(1.245 \\times 10^{5}\\) Pa",
      },
      selfCheckExample: {
        prompt:
          "Air is 79% nitrogen and 21% oxygen by moles. At a total pressure of \\(1.0 \\times 10^{5}\\) Pa, what is the partial pressure of oxygen?",
        steps: [
          "A gas's partial pressure is its mole fraction times the total: \\(P_{O_2} = 0.21 \\times 1.0 \\times 10^{5}\\).",
        ],
        answer: "\\(2.1 \\times 10^{4}\\) Pa",
      },
      practiceSet: [
        { prompt: "Two non-reacting gases in one vessel have partial pressures 0.4 atm and 0.6 atm. What is the total pressure?", answer: "1.0 atm" },
        { prompt: "1 mol of helium and 3 mol of argon in one vessel have a total pressure of 2 atm. What is the partial pressure of argon?", answer: "1.5 atm" },
        { prompt: "A gas fills 2 litres at 3 atm. At the same temperature it is let into an empty 4 litre vessel joined to it, 6 litres in all. Final pressure?", answer: "1 atm" },
      ],
      pyqExampleId: "84b11aad-1ab4-4b46-9ab4-2728c29fc8a5",
      traps: [
        {
          title: "Pressures do not simply average",
          body: "Joining 1 litre of gas at 3 atm to 3 litres at 1 atm, at one temperature, does not give 2 atm. Weight each pressure by its volume: \\(\\dfrac{3 \\times 1 + 1 \\times 3}{4} = 1.5\\) atm.",
        },
        {
          title: "A partial pressure uses the whole volume",
          body: "Each gas in a mixture fills the entire vessel, so its partial pressure is \\(\\mu_iRT/V\\) with the total V, not some part of it.",
        },
      ],
    },
  ],
};
