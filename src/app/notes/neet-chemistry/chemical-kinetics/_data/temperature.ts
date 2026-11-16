import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CK_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Temperature and Activation Energy",
  title: "Temperature and Activation Energy",
  oneLineDefinition:
    "Activation energy and the energy profile of a reaction, what a catalyst changes, the Arrhenius equation k = A e^(−Ea/RT) with its ln k against 1/T plot, and Ea from rate constants at two temperatures.",
  whyItMatters:
    "Ten NEET questions from 2021 to 2026, the largest share of the chapter. Five read the Arrhenius equation or its plot: Ea from a slope of −5 × 10³ K (2021), the shape of the ln k against 1/T line (NEET 2024 and Re-NEET 2024), Ea from ln k = 14.34 − 1.25 × 10⁴/T (2026), and a temperature from the plot's intercept (Re-NEET 2026). Three use rate constants at two temperatures: what you need to find Ea (2024), a rate that quadruples from 27 °C to 57 °C (2024), and 0.04 and 0.14 s⁻¹ at 500 K and 700 K (Re-NEET 2024). Two are on activation energy itself: the energy profile of an exothermic reaction (2021) and an assertion about activation energy (2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchck-energy-profile",
      name: "Activation energy, energy profiles and catalysts",
      intuition:
        "Reactant molecules cannot turn straight into products. They must first climb an energy hill to an unstable arrangement called the activated complex, and only then roll down to products. The height of the hill above the reactants is the activation energy. A catalyst does not move the reactants or the products; it opens a lower path over the hill.",
      definition:
        "- **Activated complex:** an unstable intermediate at the top of the energy barrier. The energy needed to form it from the reactants is the **activation energy**, \\(E_a\\).\n" +
        "- The forward and backward reactions have their own activation energies: \\(\\Delta H = E_{a(f)} - E_{a(b)}\\).\n" +
        "- Exothermic: products lie below reactants, so \\(E_{a(b)} > E_{a(f)}\\). Endothermic: products lie above reactants, so \\(E_{a(f)} > E_{a(b)}\\) and \\(E_{a(f)}\\) is larger than \\(\\Delta H\\).\n" +
        "- **Collision theory:** molecules react only through effective collisions, those with enough energy (at least the threshold energy) and the proper orientation.\n" +
        "- **Catalyst:** gives an alternative path with a lower activation energy, so more molecules can cross the barrier. It does not change \\(\\Delta H\\) or \\(\\Delta G\\), does not change the equilibrium constant (it only helps reach equilibrium faster), and cannot make a non-spontaneous reaction take place.",
      formula: {
        label: "Enthalpy and the two barriers",
        latex: "\\Delta H = E_{a(f)} - E_{a(b)}",
        symbols: [
          { symbol: "\\(E_{a(f)}\\)", meaning: "activation energy of the forward reaction" },
          { symbol: "\\(E_{a(b)}\\)", meaning: "activation energy of the backward reaction" },
        ],
      },
      authoredExample: {
        prompt:
          "A reaction has a forward activation energy of 50 kJ mol⁻¹ and \\(\\Delta H = +20\\) kJ mol⁻¹. Find the activation energy of the backward reaction, and say where the products lie.",
        steps: [
          "\\(E_{a(b)} = E_{a(f)} - \\Delta H = 50 - 20 = 30\\) kJ mol⁻¹.",
          "\\(\\Delta H\\) is positive, so the reaction is endothermic: the products lie 20 kJ mol⁻¹ above the reactants.",
        ],
        answer: "30 kJ mol⁻¹; the products lie above the reactants",
      },
      selfCheckExample: {
        prompt:
          "A reaction has \\(\\Delta H = -30\\) kJ mol⁻¹. A catalyst lowers its forward activation energy from 80 to 50 kJ mol⁻¹. What is the backward activation energy with the catalyst?",
        steps: [
          "The catalyst does not change \\(\\Delta H\\).",
          "\\(E_{a(b)} = E_{a(f)} - \\Delta H = 50 - (-30) = 80\\) kJ mol⁻¹.",
        ],
        answer: "80 kJ mol⁻¹ (lowered from 110 by the same 30)",
      },
      practiceSet: [
        { prompt: "Does a catalyst change the enthalpy change \\(\\Delta H\\) of a reaction?", answer: "No" },
        { prompt: "A reaction has \\(E_{a(f)} = 65\\) kJ mol⁻¹ and \\(E_{a(b)} = 40\\) kJ mol⁻¹. Find \\(\\Delta H\\). Is it exothermic or endothermic?", answer: "+25 kJ mol⁻¹, endothermic" },
        { prompt: "Does a catalyst change the equilibrium constant of a reaction?", answer: "No; it only helps the reaction reach equilibrium faster" },
        { prompt: "What two conditions must a collision meet to lead to reaction?", answer: "Enough energy (at least the threshold energy) and the proper orientation" },
      ],
      pyqExampleId: "d4f339c0-18e2-4f60-849d-88c666fb689b",
      traps: [
        {
          title: "A catalyst lowers both barriers",
          body: "A catalyst lowers the forward and the backward activation energies by the same amount. The reactants and products stay where they were, so \\(\\Delta H\\) does not change.",
        },
        {
          title: "Endothermic means Ea is more than ΔH",
          body: "In an endothermic reaction the products lie above the reactants and the peak lies above the products, so the forward activation energy is always larger than \\(\\Delta H\\).",
        },
        {
          title: "Exothermic means a taller backward barrier",
          body: "When the products lie below the reactants, the climb back from the products to the peak is the longer one: \\(E_{a(b)} = E_{a(f)} + |\\Delta H|\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchck-arrhenius",
      name: "The Arrhenius equation and its plot",
      intuition:
        "Heating a reaction gives more molecules enough energy to get over the barrier, so the rate constant rises with temperature. The Arrhenius equation puts a number on this. Taking logs turns it into a straight line in 1/T: the slope holds the activation energy and the intercept holds A.",
      definition:
        "- \\(k = A\\,e^{-E_a/RT}\\). A is the Arrhenius factor (frequency factor), \\(E_a\\) is in J mol⁻¹ and T in kelvin.\n" +
        "- \\(e^{-E_a/RT}\\) is the fraction of molecules with energy equal to or more than \\(E_a\\).\n" +
        "- \\(\\ln k = \\ln A - \\dfrac{E_a}{RT}\\): ln k against \\(\\dfrac{1}{T}\\) is a straight line with slope \\(-\\dfrac{E_a}{R}\\) and intercept ln A.\n" +
        "- In base-10 logs: \\(\\log k = \\log A - \\dfrac{E_a}{2.303RT}\\), slope \\(-\\dfrac{E_a}{2.303R}\\).\n" +
        "- A rise of 10 °C nearly doubles the rate constant of a typical reaction.\n" +
        "- At the same temperature and the same A, a lower \\(E_a\\) gives a larger k.",
      formula: {
        label: "Arrhenius equation",
        latex: "k = A\\,e^{-E_a/RT}, \\qquad \\ln k = \\ln A - \\frac{E_a}{R}\\cdot\\frac{1}{T}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "Arrhenius (frequency) factor, same unit as k" },
          { symbol: "\\(E_a\\)", meaning: "activation energy" },
          { symbol: "\\(R\\)", meaning: "gas constant, 8.314 J per K per mol" },
        ],
      },
      authoredExample: {
        prompt:
          "For a first-order reaction, \\(\\log k = 12.0 - \\dfrac{5000\\ \\text{K}}{T}\\), with k in s⁻¹. Find \\(E_a\\) and A. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "This is the base-10 form, so \\(\\dfrac{E_a}{2.303R} = 5000\\) K.",
          "\\(E_a = 2.303 \\times 8.314 \\times 5000 = 95\\,736\\) J mol⁻¹ \\(\\approx 95.7\\) kJ mol⁻¹.",
          "\\(\\log A = 12.0\\), so \\(A = 10^{12}\\ \\text{s}^{-1}\\).",
        ],
        answer: "\\(E_a \\approx 95.7\\) kJ mol⁻¹, \\(A = 10^{12}\\ \\text{s}^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "For a reaction, \\(\\ln k = 25 - \\dfrac{10000\\ \\text{K}}{T}\\). At what temperature is ln k equal to 5?",
        steps: [
          "\\(5 = 25 - \\dfrac{10000}{T}\\), so \\(\\dfrac{10000}{T} = 20\\).",
          "\\(T = \\dfrac{10000}{20} = 500\\) K.",
        ],
        answer: "500 K",
      },
      practiceSet: [
        { prompt: "In the plot of ln k against 1/T for the Arrhenius equation, what is the intercept?", answer: "ln A" },
        { prompt: "For a reaction, ln A = 10 and \\(\\dfrac{E_a}{R} = 2000\\) K. What is ln k at 400 K?", answer: "5" },
        { prompt: "What does the factor \\(e^{-E_a/RT}\\) stand for?", answer: "The fraction of molecules with energy equal to or more than \\(E_a\\)" },
        { prompt: "Two reactions have the same A and run at the same temperature. One has \\(E_a = 50\\) kJ mol⁻¹, the other 80 kJ mol⁻¹. Which has the larger k?", answer: "The one with \\(E_a = 50\\) kJ mol⁻¹" },
      ],
      pyqExampleId: "1fc147e0-64b7-4bc5-8f82-8b37ff759e1e",
      traps: [
        {
          title: "The slope is negative",
          body: "ln k against 1/T is a straight line that falls, with slope \\(-\\dfrac{E_a}{R}\\) and intercept ln A. A line with a positive slope, or one through the origin, does not fit the Arrhenius equation.",
        },
        {
          title: "ln or log changes the slope",
          body: "The slope of ln k against 1/T is \\(-\\dfrac{E_a}{R}\\); the slope of log k against 1/T is \\(-\\dfrac{E_a}{2.303R}\\). Mixing them puts \\(E_a\\) out by a factor of 2.303.",
        },
        {
          title: "Ea comes in the units of R",
          body: "With R in J K⁻¹ mol⁻¹, \\(E_a\\) comes out in J mol⁻¹: divide by 1000 for kJ. With R = 1.987 cal K⁻¹ mol⁻¹, it comes out in cal mol⁻¹.",
        },
        {
          title: "Against 1/T, not T",
          body: "k against T is a rising curve. The straight line is ln k against \\(\\dfrac{1}{T}\\), and it falls as \\(\\dfrac{1}{T}\\) grows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchck-two-temperatures",
      name: "Activation energy from two temperatures",
      intuition:
        "Write the Arrhenius equation at two temperatures and subtract one from the other. The unknown A cancels, leaving a relation between the two rate constants, the two temperatures and the activation energy. So measuring k at two temperatures is enough to find Ea.",
      definition:
        "- \\(\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right) = \\dfrac{E_a}{2.303R}\\left(\\dfrac{T_2 - T_1}{T_1 T_2}\\right)\\).\n" +
        "- \\(k_2\\) is the rate constant at the higher temperature \\(T_2\\).\n" +
        "- If the concentrations are the same, the ratio of rates equals the ratio of rate constants: a rate that quadruples means \\(\\dfrac{k_2}{k_1} = 4\\).\n" +
        "- Temperatures must be in kelvin: add 273 to a temperature in °C.\n" +
        "- With R = 8.314 J K⁻¹ mol⁻¹, \\(2.303R = 19.15\\) J K⁻¹ mol⁻¹.",
      formula: {
        label: "Two-temperature form",
        latex: "\\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
      },
      authoredExample: {
        prompt:
          "A first-order reaction has \\(k = 2.0 \\times 10^{-3}\\ \\text{s}^{-1}\\) at 300 K and \\(2.0 \\times 10^{-2}\\ \\text{s}^{-1}\\) at 350 K. Find \\(E_a\\). (2.303R = 19.15 J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\dfrac{k_2}{k_1} = 10\\), so \\(\\log\\dfrac{k_2}{k_1} = 1\\).",
          "\\(\\dfrac{T_2 - T_1}{T_1 T_2} = \\dfrac{50}{300 \\times 350} = \\dfrac{1}{2100}\\ \\text{K}^{-1}\\).",
          "\\(E_a = 19.15 \\times 1 \\times 2100 = 40\\,215\\) J mol⁻¹ \\(\\approx 40.2\\) kJ mol⁻¹.",
        ],
        answer: "\\(E_a \\approx 40.2\\) kJ mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A reaction has \\(E_a = 38.3\\) kJ mol⁻¹ and \\(k = 1.5 \\times 10^{-3}\\ \\text{s}^{-1}\\) at 400 K. Find k at 500 K. (2.303R = 19.15 J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\dfrac{E_a}{2.303R} = \\dfrac{38300}{19.15} = 2000\\) K.",
          "\\(\\dfrac{1}{400} - \\dfrac{1}{500} = \\dfrac{100}{200000} = 5 \\times 10^{-4}\\ \\text{K}^{-1}\\).",
          "\\(\\log\\dfrac{k_2}{k_1} = 2000 \\times 5 \\times 10^{-4} = 1\\), so \\(k_2 = 10k_1 = 1.5 \\times 10^{-2}\\ \\text{s}^{-1}\\).",
        ],
        answer: "\\(1.5 \\times 10^{-2}\\ \\text{s}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "Why does finding \\(E_a\\) need the rate constant at two temperatures, and not at one?", answer: "A is unknown; taking the ratio of the two rate constants cancels it" },
        { prompt: "A reaction has \\(\\dfrac{E_a}{2.303R} = 3000\\) K. Find \\(\\log\\dfrac{k_2}{k_1}\\) between 300 K and 400 K.", answer: "2.5", method: "\\(3000 \\times \\left(\\dfrac{1}{300} - \\dfrac{1}{400}\\right) = 3000 \\times \\dfrac{1}{1200}\\)" },
        { prompt: "Convert 27 °C and 127 °C to kelvin.", answer: "300 K and 400 K" },
        { prompt: "In \\(\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)\\) with \\(T_2 > T_1\\), is \\(k_2\\) larger or smaller than \\(k_1\\)?", answer: "Larger" },
      ],
      pyqExampleId: "c84a260f-ab8e-4b26-9a37-73b0a6097807",
      traps: [
        {
          title: "Kelvin, always",
          body: "27 °C and 57 °C are 300 K and 330 K. Putting the Celsius numbers into \\(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\) gives a wrong answer.",
        },
        {
          title: "Keep the pair in order",
          body: "\\(k_2\\) belongs with \\(T_2\\). Swapping one pair and not the other gives a negative activation energy, which is a sign of the slip.",
        },
        {
          title: "2.303 comes with log",
          body: "With base-10 logs the formula has 2.303R. With natural logs it is \\(\\ln\\dfrac{k_2}{k_1} = \\dfrac{E_a}{R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)\\), with no 2.303.",
        },
      ],
    },
  ],
};
