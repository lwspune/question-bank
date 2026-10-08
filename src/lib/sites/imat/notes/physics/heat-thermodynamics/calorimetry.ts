import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_HTH_CALORIMETRY_NOTE: SubtopicNote = {
  subtopicName: "Specific and Latent Heat",
  title: "Specific Heat, Latent Heat and Mixing",
  oneLineDefinition:
    "Heating a body raises its temperature by an amount set by its mass and specific heat; at a change of state the energy goes into the change and the temperature stays put.",
  whyItMatters:
    "Six of the 13 past questions are on this page: rearranging Q = mcΔT, a heater's power or a latent heat found from a heater, what happens to a solid as it melts, and in 2023 a ministry question on ice melting in warm water.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-hth-specific-heat",
      name: "Specific heat capacity: the energy to warm a mass",
      intuition:
        "Twice the mass needs twice the energy for the same warming, and twice the warming needs twice the energy. The material matters too: water needs about ten times more energy per kilogram than iron for the same rise. The specific heat capacity is that material constant.",
      definition:
        "- The **specific heat capacity** \\(c\\) of a material is the energy needed to raise the temperature of 1 kg of it by 1 K. Unit: \\(\\text{J kg}^{-1}\\text{K}^{-1}\\).\n" +
        "- Water has a very high value, about \\(4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\); most metals are a few hundred.\n" +
        "- The **heat capacity** of a whole object is \\(C = mc\\), the energy per kelvin for that object.\n" +
        "- An electric heater of power \\(P\\) running for time \\(t\\) supplies \\(Q = Pt\\), with \\(t\\) in **seconds**.",
      formula: {
        label: "Heating without a change of state",
        latex: "Q = m c \\Delta T \\qquad Q = P t",
        symbols: [
          { symbol: "\\(Q\\)", meaning: "energy supplied, in J" },
          { symbol: "\\(m\\)", meaning: "mass, in kg" },
          { symbol: "\\(c\\)", meaning: "specific heat capacity, in J kg⁻¹ K⁻¹" },
          { symbol: "\\(\\Delta T\\)", meaning: "temperature change, in K" },
          { symbol: "\\(P,\\ t\\)", meaning: "heater power in W, and time in s" },
        ],
      },
      authoredExample: {
        prompt:
          "How much energy is needed to heat 0.50 kg of water from 20 °C to 100 °C? Take \\(c = 4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\). How long does a 2.0 kW kettle take to supply it, if no energy is lost?",
        steps: [
          "\\(\\Delta T = 100 - 20 = 80\\ \\text{K}\\).",
          "\\(Q = 0.50 \\times 4200 \\times 80 = 1.68 \\times 10^5\\ \\text{J}\\).",
          "\\(t = Q / P = 1.68 \\times 10^5 / 2000 = 84\\ \\text{s}\\).",
        ],
        answer: "\\(1.68 \\times 10^5\\ \\text{J}\\); 84 s",
      },
      selfCheckExample: {
        prompt:
          "A 2.0 kg block of a metal with specific heat capacity \\(450\\ \\text{J kg}^{-1}\\text{K}^{-1}\\) is warmed by a 150 W heater for 4.0 minutes. No energy is lost. By how much does its temperature rise?",
        options: ["0.67 K", "4.0 K", "40 K", "80 K", "0.025 K"],
        steps: [
          "Energy: \\(Q = Pt = 150 \\times 240 = 3.6 \\times 10^4\\ \\text{J}\\) (4.0 minutes is 240 s).",
          "\\(\\Delta T = Q/(mc) = 3.6 \\times 10^4 / (2.0 \\times 450) = 40\\ \\text{K}\\).",
          "Option A leaves the time in minutes; D leaves out the mass; E turns the fraction upside down.",
        ],
        answer: "(C) 40 K",
      },
      practiceSet: [
        { prompt: "How much energy warms 3.0 kg of water by 10 K? Take \\(c = 4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\).", answer: "\\(1.26 \\times 10^5\\ \\text{J}\\)", method: "\\(3.0 \\times 4200 \\times 10\\)" },
        { prompt: "How much energy does a 500 W heater supply in 1 minute?", answer: "\\(3.0 \\times 10^4\\ \\text{J}\\)", method: "\\(500 \\times 60\\)" },
        { prompt: "A 1.5 kg block absorbs 6000 J and warms by 8.0 K. What is its specific heat capacity?", answer: "\\(500\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)", method: "\\(c = Q/(m\\Delta T)\\)" },
        { prompt: "1 kg of water and 1 kg of dry sand each receive the same energy. Which warms more?", answer: "The sand", method: "Sand has a much smaller specific heat capacity than water" },
      ],
      traps: [
        {
          title: "Power times time needs seconds",
          body: "A watt is a joule per second, so \\(Q = Pt\\) gives joules only with \\(t\\) in seconds. Leaving minutes in gives an answer 60 times too small, and that wrong value is usually one of the options.",
        },
        {
          title: "Thermal conductivity is not specific heat capacity",
          body: "Specific heat capacity says how much energy warms a kilogram; thermal conductivity says how fast heat passes through a material. A calorimetry calculation never needs the conductivity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hth-latent-heat",
      name: "Latent heat and changes of state",
      intuition:
        "Keep heating melting ice and the thermometer stays at 0 °C until all the ice has gone. The energy is not lost: it is pulling the molecules apart against their attractions, so their potential energy rises while their kinetic energy, and so the temperature, does not. Boiling takes far more energy than melting, because the molecules must be separated completely.",
      definition:
        "- The **specific latent heat** \\(L\\) is the energy needed to change the state of 1 kg of a substance at constant temperature. Unit: \\(\\text{J kg}^{-1}\\).\n" +
        "- **Fusion** (\\(L_f\\)) is solid to liquid; **vaporisation** (\\(L_v\\)) is liquid to gas. For water, \\(L_f \\approx 3.3 \\times 10^5\\ \\text{J kg}^{-1}\\) and \\(L_v \\approx 2.3 \\times 10^6\\ \\text{J kg}^{-1}\\), about seven times more.\n" +
        "- During a change of state the temperature stays **constant**: the energy overcomes the forces **between** molecules. Bonds **inside** the molecules are not broken.\n" +
        "- Melting and boiling make the particles **more disordered**. Freezing and condensing release the same latent heat back.\n" +
        "- **Evaporation** happens at the surface at any temperature; the fastest molecules escape, so the liquid left behind cools (why sweating cools you). **Boiling** happens throughout the liquid at one fixed temperature.",
      formula: {
        label: "Energy for a change of state",
        latex: "Q = m L",
        symbols: [
          { symbol: "\\(Q\\)", meaning: "energy absorbed or released, in J" },
          { symbol: "\\(m\\)", meaning: "mass that changes state, in kg" },
          { symbol: "\\(L\\)", meaning: "specific latent heat, in J kg⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "Take \\(L_f = 3.34 \\times 10^5\\ \\text{J kg}^{-1}\\) and \\(L_v = 2.26 \\times 10^6\\ \\text{J kg}^{-1}\\) for water. How much energy melts 0.20 kg of ice at 0 °C, and how much boils away 0.20 kg of water at 100 °C?",
        steps: [
          "Melting: \\(Q = 0.20 \\times 3.34 \\times 10^5 = 6.68 \\times 10^4\\ \\text{J}\\).",
          "Boiling: \\(Q = 0.20 \\times 2.26 \\times 10^6 = 4.52 \\times 10^5\\ \\text{J}\\).",
          "Boiling the same mass takes about 6.8 times as much energy as melting it, and neither step changes the temperature.",
        ],
        answer: "\\(6.68 \\times 10^4\\ \\text{J}\\) to melt; \\(4.52 \\times 10^5\\ \\text{J}\\) to boil",
      },
      selfCheckExample: {
        prompt:
          "A 60 W heater is packed in crushed ice at 0 °C. In 400 s it melts 72 g of ice. Assuming all its energy goes into the ice, what is the specific latent heat of fusion of ice?",
        options: [
          "\\(3.3 \\times 10^2\\ \\text{J kg}^{-1}\\)",
          "\\(8.3 \\times 10^2\\ \\text{J kg}^{-1}\\)",
          "\\(5.6 \\times 10^3\\ \\text{J kg}^{-1}\\)",
          "\\(3.3 \\times 10^5\\ \\text{J kg}^{-1}\\)",
          "\\(1.7 \\times 10^6\\ \\text{J kg}^{-1}\\)",
        ],
        steps: [
          "Energy supplied: \\(Q = Pt = 60 \\times 400 = 2.4 \\times 10^4\\ \\text{J}\\).",
          "\\(L_f = Q/m = 2.4 \\times 10^4 / 0.072 = 3.3 \\times 10^5\\ \\text{J kg}^{-1}\\).",
          "Option A divides by 72 instead of 0.072 (it is the answer in J/g, mislabelled). B leaves out the time; C leaves out the power; E multiplies by the mass.",
        ],
        answer: "(D) \\(3.3 \\times 10^5\\ \\text{J kg}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "How much energy melts 2.0 kg of ice at 0 °C? Take \\(L_f = 3.3 \\times 10^5\\ \\text{J kg}^{-1}\\).", answer: "\\(6.6 \\times 10^5\\ \\text{J}\\)", method: "\\(Q = mL\\)" },
        { prompt: "Water boils at 100 °C in an open pan and the heating continues. What does the thermometer in the water read?", answer: "It stays at 100 °C until the water has gone" },
        { prompt: "Why does sweat evaporating from the skin cool you?", answer: "The evaporating water takes its latent heat of vaporisation from the skin" },
        { prompt: "For water, which needs more energy per kilogram: melting or boiling?", answer: "Boiling, roughly seven times more" },
      ],
      traps: [
        {
          title: "Melting breaks forces between molecules, not bonds inside them",
          body: "When wax or ice melts, the energy overcomes the attractions between molecules. The covalent bonds within each molecule are untouched; breaking those would be a chemical change. Statements that melting breaks the bonds inside the molecules are wrong.",
        },
        {
          title: "The temperature does not rise during a change of state",
          body: "While a pure substance melts or boils, the energy supplied goes into the change of state and the temperature stays constant. A heating curve shows a flat section there, not a slope.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hth-mixing",
      name: "Calorimetry: heat lost equals heat gained",
      intuition:
        "In an insulated container no energy escapes, so every joule the hot things lose is gained by the cold things. Write one side for each, set them equal, and solve. If ice melts, the cold side has two terms: the energy to melt it, and then the energy to warm the meltwater up from 0 °C.",
      definition:
        "- In an insulated system, **energy lost by the hotter bodies = energy gained by the colder bodies**, and all end at one **final temperature** \\(T\\).\n" +
        "- Write each change as a positive amount: (higher temperature minus lower temperature).\n" +
        "- If ice at 0 °C melts completely, the gain is \\(m_{\\text{ice}} L_f + m_{\\text{ice}} c_w (T - 0)\\). Leaving out the second term is the classic slip.\n" +
        "- The final temperature is the simple average only if the two masses and their specific heats are equal.",
      formula: {
        label: "Mixing in an insulated container",
        latex: "m_1 c_1 (T_1 - T) = m_2 c_2 (T - T_2)",
        symbols: [
          { symbol: "\\(m_1, c_1, T_1\\)", meaning: "mass, specific heat and starting temperature of the hotter body" },
          { symbol: "\\(m_2, c_2, T_2\\)", meaning: "the same for the colder body" },
          { symbol: "\\(T\\)", meaning: "the shared final temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "0.10 kg of ice at 0 °C is dropped into 0.90 kg of water at 40 °C in an insulated flask. All the ice melts. Take \\(c_w = 4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\) and \\(L_f = 3.36 \\times 10^5\\ \\text{J kg}^{-1}\\). Find the final temperature.",
        steps: [
          "Energy lost by the warm water: \\(0.90 \\times 4200 \\times (40 - T)\\).",
          "Energy gained by the ice: melting \\(0.10 \\times 3.36 \\times 10^5 = 33\\,600\\ \\text{J}\\), plus warming the meltwater \\(0.10 \\times 4200 \\times T\\).",
          "Set equal: \\(151\\,200 - 3780T = 33\\,600 + 420T\\), so \\(4200T = 117\\,600\\).",
          "\\(T = 28\\ ^\\circ\\text{C}\\).",
        ],
        answer: "28 °C",
      },
      selfCheckExample: {
        prompt:
          "A 0.50 kg block of metal at 90 °C is placed in 1.0 kg of water at 15 °C in an insulated container. The final temperature is 20 °C. Taking \\(c_w = 4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\), what is the specific heat capacity of the metal?",
        options: [
          "\\(300\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)",
          "\\(560\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)",
          "\\(2100\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)",
          "\\(4200\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)",
          "\\(600\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)",
        ],
        steps: [
          "Water gains \\(1.0 \\times 4200 \\times (20 - 15) = 21\\,000\\ \\text{J}\\).",
          "The metal loses the same: \\(0.50 \\times c \\times (90 - 20) = 35c\\).",
          "\\(c = 21\\,000 / 35 = 600\\ \\text{J kg}^{-1}\\text{K}^{-1}\\).",
          "Option A leaves out the metal's mass; B uses the gap between the two starting temperatures; C uses the final temperature as the metal's change.",
        ],
        answer: "(E) \\(600\\ \\text{J kg}^{-1}\\text{K}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "2.0 kg of water at 10 °C is mixed with 1.0 kg of water at 70 °C. What is the final temperature?", answer: "30 °C", method: "\\(2(T - 10) = 1(70 - T)\\)" },
        { prompt: "Equal masses of water at 20 °C and 60 °C are mixed. What is the final temperature?", answer: "40 °C", method: "Equal masses and equal \\(c\\): the simple average" },
        { prompt: "In a mixing problem, what does the insulated container let you assume?", answer: "The energy lost by the hot bodies equals the energy gained by the cold ones" },
      ],
      traps: [
        {
          title: "Melted ice must still warm up",
          body: "When ice melts and the mixture ends above 0 °C, the meltwater also warms from 0 °C to the final temperature. The energy balance needs \\(m L_f + m c T\\) on the gaining side, not \\(m L_f\\) alone.",
        },
      ],
    },
  ],
};
