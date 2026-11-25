import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CK_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Temperature Dependence of the Rate of a Reaction",
  title: "Temperature and the Arrhenius Equation",
  oneLineDefinition:
    "Why a rise in temperature speeds up a reaction, the Arrhenius equation and the meaning of each term, the plot of ln k against 1/T, the activation energy from rate constants at two temperatures, and reading the activation energy from a given equation.",
  whyItMatters:
    "41 questions, twenty-eight of them from board papers. An activation energy from two temperatures is set every year from 2023 to 2026, eleven times in all: the rate doubles, triples or quadruples between two temperatures, or a first order reaction's half-life is given at two temperatures (2023, 2025). In 2024 and in 2026 two sets printed the same question with different temperatures. MCQs ask the form of the Arrhenius equation (2024), what A stands for (2025), the fraction of molecules with energy at least Ea (2024, 2025, 2026), the plot whose slope gives Ea (2024, 2025, 2026) and what raises k (2024). Short answers ask the effect of temperature on the rate or on k (2022 twice, 2025), what happens to k and Ea when the temperature rises (2023) and the definition of activation energy (2026). Ea from a given equation for log k came in 2023. The textbook adds the Arrhenius examples and exercises.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcck-arrhenius",
      name: "The Arrhenius equation and the effect of temperature",
      intuition:
        "Molecules in a gas have a spread of energies. Only the few with at least the activation energy react when they collide. A small rise in temperature shifts the whole spread towards higher energies, and the share of molecules beyond the activation energy grows far more than the temperature does. That is why a 10 degree rise nearly doubles the rate.",
      definition:
        "- For a rise in temperature of 10°, the rate constant is nearly doubled. Example: N₂O₅ takes 12 min to decompose to half at 50 °C, 5 h at 25 °C and 10 days at 0 °C.\n" +
        "- **Arrhenius equation:** \\(k = A\\,e^{-E_a/RT}\\). A is the **Arrhenius factor** (frequency factor, pre-exponential factor), a constant specific to the reaction. \\(E_a\\) is the activation energy in J mol⁻¹, R the gas constant, T the temperature in kelvin.\n" +
        "- **Activation energy:** the energy required to form the intermediate called the activated complex. Example: \\(\\text{H}_2 + \\text{I}_2\\) collide to form an unstable intermediate, which breaks up into 2HI. A plot of potential energy against reaction coordinate shows this energy barrier.\n" +
        "- **Energy distribution (Maxwell and Boltzmann):** the fraction of molecules with a given kinetic energy plotted against kinetic energy. The peak is the most probable kinetic energy. On heating, the peak moves to higher energy and the curve broadens; the area under it stays constant. At \\(t + 10\\) the area beyond \\(E_a\\) roughly doubles.\n" +
        "- \\(e^{-E_a/RT}\\) is the **fraction of molecules** with kinetic energy equal to or greater than \\(E_a\\).\n" +
        "- **Log form:** \\(\\ln k = -\\dfrac{E_a}{RT} + \\ln A\\). A plot of ln k against 1/T is a straight line with slope \\(-\\dfrac{E_a}{R}\\) and intercept ln A. With log k the slope is \\(-\\dfrac{E_a}{2.303R}\\) and the intercept log A.\n" +
        "- Increasing the temperature or decreasing the activation energy increases the rate and makes k rise exponentially. Heating does not change \\(E_a\\) itself.",
      formula: {
        label: "Arrhenius equation",
        latex: "k = A\\,e^{-E_a/RT}, \\qquad \\ln k = \\ln A - \\frac{E_a}{RT}, \\qquad \\log k = \\log A - \\frac{E_a}{2.303\\,RT}",
        symbols: [
          { symbol: "\\(A\\)", meaning: "Arrhenius (frequency, pre-exponential) factor, same unit as k" },
          { symbol: "\\(E_a\\)", meaning: "activation energy, J mol⁻¹" },
          { symbol: "\\(e^{-E_a/RT}\\)", meaning: "fraction of molecules with energy equal to or greater than Ea" },
        ],
      },
      authoredExample: {
        prompt:
          "A reaction has \\(E_a = 50\\) kJ mol⁻¹. Find the fraction of molecules with energy at least \\(E_a\\) at 300 K and at 310 K, and the ratio of the two. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(E_a = 50\\,000\\) J mol⁻¹ (convert kJ to J).",
          "At 300 K: \\(\\dfrac{E_a}{RT} = \\dfrac{50\\,000}{8.314 \\times 300} = 20.05\\), so the fraction \\(= e^{-20.05} = 1.97 \\times 10^{-9}\\).",
          "At 310 K: \\(\\dfrac{E_a}{RT} = \\dfrac{50\\,000}{8.314 \\times 310} = 19.40\\), so the fraction \\(= e^{-19.40} = 3.76 \\times 10^{-9}\\).",
          "Ratio \\(= \\dfrac{3.76 \\times 10^{-9}}{1.97 \\times 10^{-9}} = 1.91\\).",
        ],
        answer: "1.97 × 10⁻⁹ at 300 K and 3.76 × 10⁻⁹ at 310 K; a 10 K rise nearly doubles the fraction (1.91 times)",
      },
      selfCheckExample: {
        prompt: "A plot of ln k against 1/T has a slope of −6000 K. Find the activation energy. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: ["Slope \\(= -\\dfrac{E_a}{R}\\), so \\(E_a = 6000 \\times 8.314\\).", "\\(E_a = 49\\,884\\) J mol⁻¹ \\(= 49.9\\) kJ mol⁻¹."],
        answer: "49.9 kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "What does A stand for in the Arrhenius equation?", answer: "The Arrhenius factor, also called the frequency factor or pre-exponential factor" },
        { prompt: "What does \\(e^{-E_a/RT}\\) represent?", answer: "The fraction of molecules with kinetic energy equal to or greater than the activation energy" },
        { prompt: "What is plotted against what to get a straight line from the Arrhenius equation?", answer: "ln k (or log k) against 1/T" },
        { prompt: "According to the Arrhenius equation, which two changes make a reaction faster?", answer: "Raising the temperature, and lowering the activation energy (as a catalyst does)" },
      ],
      pyqExampleId: "5655a01d-a321-40e3-b07d-4aa6ed8084e5",
      traps: [
        {
          title: "Describe the energy distribution graph in words",
          body: "No graph can be drawn here, so learn it: fraction of molecules on the y-axis, kinetic energy on the x-axis, two curves at t and t + 10, a vertical line at Ea, and the area beyond Ea larger for the hotter curve. A labelled sketch carries marks in an 'explain with a graph' answer.",
        },
        {
          title: "A positive exponent",
          body: "The fraction must be less than 1, so the exponent is negative: \\(e^{-E_a/RT}\\). An option with \\(e^{+E_a/RT}\\) or a minus sign in front of A is always wrong.",
        },
        {
          title: "Forgetting 2.303 in the log plot",
          body: "With ln k against 1/T the slope is \\(-E_a/R\\). With log k against 1/T it is \\(-E_a/2.303R\\). The slope never contains T.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-two-temperatures",
      name: "Activation energy from rate constants at two temperatures",
      intuition:
        "The rate constant at one temperature cannot give Ea, because A is unknown. Measure k at two temperatures and divide: A cancels, and the ratio of the two rate constants depends on Ea alone. A big rise in k for a small rise in temperature means a large activation energy.",
      definition:
        "- **Derivation outline:**\n" +
        "- At \\(T_1\\): \\(\\ln k_1 = -\\dfrac{E_a}{RT_1} + \\ln A\\). At \\(T_2\\): \\(\\ln k_2 = -\\dfrac{E_a}{RT_2} + \\ln A\\) (A is constant for a reaction).\n" +
        "- Subtracting: \\(\\ln\\dfrac{k_2}{k_1} = \\dfrac{E_a}{R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)\\).\n" +
        "- In common logarithms: \\(\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left(\\dfrac{T_2 - T_1}{T_1T_2}\\right)\\).\n" +
        "- At fixed concentrations the rate is proportional to k, so 'the rate doubles' means \\(k_2/k_1 = 2\\).\n" +
        "- For a first order reaction, \\(k = 0.693/t_{1/2}\\), so \\(\\dfrac{k_2}{k_1} = \\dfrac{(t_{1/2})_1}{(t_{1/2})_2}\\): the ratio of the half-lives turned upside down.\n" +
        "- Temperatures must be in kelvin. When the paper gives \\(2.303R = 19.15\\) J K⁻¹ mol⁻¹, use it as one number.",
      formula: {
        label: "Two-temperature form of the Arrhenius equation",
        latex: "\\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303\\,R}\\left[\\frac{T_2 - T_1}{T_1T_2}\\right]",
      },
      authoredExample: {
        prompt:
          "The rate constant of a reaction is 1.5 × 10⁻³ s⁻¹ at 320 K and 6.0 × 10⁻³ s⁻¹ at 340 K. Calculate the activation energy. (R = 8.314 J K⁻¹ mol⁻¹, log 4 = 0.6021)",
        steps: [
          "Given: \\(k_1 = 1.5 \\times 10^{-3}\\) s⁻¹ at \\(T_1 = 320\\) K, \\(k_2 = 6.0 \\times 10^{-3}\\) s⁻¹ at \\(T_2 = 340\\) K, so \\(\\dfrac{k_2}{k_1} = 4\\).",
          "Formula: \\(\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left[\\dfrac{T_2 - T_1}{T_1T_2}\\right]\\).",
          "Substitution: \\(0.6021 = \\dfrac{E_a}{2.303 \\times 8.314} \\times \\dfrac{20}{320 \\times 340}\\).",
          "\\(E_a = \\dfrac{0.6021 \\times 19.147 \\times 320 \\times 340}{20} = 62\\,715\\) J mol⁻¹.",
        ],
        answer: "Ea = 62.7 kJ mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A first order reaction has a half-life of 40 min at 300 K and 20 min at 330 K. Find its activation energy. (2.303R = 19.147 J K⁻¹ mol⁻¹, log 2 = 0.3010)",
        steps: [
          "\\(\\dfrac{k_2}{k_1} = \\dfrac{40}{20} = 2\\).",
          "\\(E_a = \\dfrac{0.3010 \\times 19.147 \\times 300 \\times 330}{30} = 19\\,019\\) J mol⁻¹.",
        ],
        answer: "Ea = 19.0 kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "Convert 37 °C into kelvin for use in the Arrhenius equation.", answer: "310 K" },
        { prompt: "The half-life of a first order reaction falls from 50 min to 10 min on heating. What is \\(k_2/k_1\\)?", answer: "5" },
        { prompt: "A paper gives 2.303R = 19.15 J K⁻¹ mol⁻¹. What is the common slip with this value?", answer: "Multiplying it by R = 8.314 again" },
        { prompt: "Why does A not appear in the two-temperature formula?", answer: "It is the same at both temperatures, so it cancels when the two equations are subtracted" },
      ],
      pyqExampleId: "77a74fe3-3dcd-4c1a-b429-b7edfecd1632",
      traps: [
        {
          title: "Temperatures left in °C",
          body: "Convert every Celsius temperature to kelvin before substituting. The difference \\(T_2 - T_1\\) is the same either way, but the product \\(T_1T_2\\) is not.",
        },
        {
          title: "Turning a half-life ratio the wrong way",
          body: "A shorter half-life means a larger k. If the half-life falls from 30 to 10 minutes, \\(k_2/k_1 = 3\\), not 1/3.",
        },
        {
          title: "Leaving out the unit",
          body: "Activation energy is in J mol⁻¹ or kJ mol⁻¹. A numerical answer without its unit loses the answer mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-ea-from-equation",
      name: "Activation energy and A from a given equation",
      intuition:
        "Sometimes the question gives you the Arrhenius equation with numbers already put in. Then nothing needs calculating from data: match the given equation term by term with the general form, and the activation energy and A drop out.",
      definition:
        "- Compare \\(\\log k = \\log A - \\dfrac{E_a}{2.303\\,R}\\cdot\\dfrac{1}{T}\\) with the given equation: the number multiplying \\(1/T\\) is \\(\\dfrac{E_a}{2.303R}\\), and the constant term is log A.\n" +
        "- If the equation is given as \\(k = A\\,e^{-E/T}\\), then \\(\\dfrac{E_a}{R} = E\\), so \\(E_a = E \\times R\\).\n" +
        "- **A from k and \\(E_a\\):** \\(A = k\\,e^{E_a/RT}\\), or \\(\\log A = \\log k + \\dfrac{E_a}{2.303RT}\\). A has the same unit as k.\n" +
        "- **Fraction of molecules** with energy at least \\(E_a\\): \\(x = e^{-E_a/RT}\\). Work it through logs: \\(\\log x = -\\dfrac{E_a}{2.303RT}\\).\n" +
        "- Put \\(E_a\\) in J mol⁻¹ when R is 8.314 J K⁻¹ mol⁻¹.",
      formula: {
        label: "Matching a given equation",
        latex: "\\log k = \\log A - \\frac{E_a}{2.303\\,R}\\cdot\\frac{1}{T} \\quad\\text{or}\\quad k = A\\,e^{-E_a/RT}",
      },
      authoredExample: {
        prompt:
          "For a first order reaction, \\(k = (2.0 \\times 10^{13}\\ \\text{s}^{-1})\\,e^{-15\\,000\\ \\text{K}/T}\\). Find the activation energy and the rate constant at 500 K. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Compare with \\(k = A\\,e^{-E_a/RT}\\): \\(\\dfrac{E_a}{R} = 15\\,000\\) K and \\(A = 2.0 \\times 10^{13}\\) s⁻¹.",
          "\\(E_a = 15\\,000 \\times 8.314 = 124\\,710\\) J mol⁻¹ \\(= 124.7\\) kJ mol⁻¹.",
          "At 500 K: \\(\\dfrac{15\\,000}{500} = 30\\), so \\(k = 2.0 \\times 10^{13} \\times e^{-30}\\).",
          "\\(e^{-30} = 9.36 \\times 10^{-14}\\), so \\(k = 2.0 \\times 10^{13} \\times 9.36 \\times 10^{-14} = 1.87\\) s⁻¹.",
        ],
        answer: "Ea = 124.7 kJ mol⁻¹; k at 500 K = 1.87 s⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A reaction has \\(E_a = 100\\) kJ mol⁻¹. What fraction of the molecules have energy equal to or greater than \\(E_a\\) at 500 K? (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\dfrac{E_a}{RT} = \\dfrac{100\\,000}{8.314 \\times 500} = 24.06\\).",
          "\\(\\log x = -\\dfrac{24.06}{2.303} = -10.45\\), so \\(x = 3.6 \\times 10^{-11}\\).",
        ],
        answer: "About 3.6 × 10⁻¹¹",
      },
      practiceSet: [
        { prompt: "Rearrange the Arrhenius equation to give A.", answer: "\\(A = k\\,e^{E_a/RT}\\)" },
        { prompt: "What is the unit of A for a second order reaction?", answer: "L mol⁻¹ s⁻¹, the same as k" },
        { prompt: "At the same temperature, a reaction with a larger Ea has a larger or smaller fraction of molecules able to react?", answer: "Smaller, because \\(e^{-E_a/RT}\\) falls as Ea rises" },
      ],
      pyqExampleId: "452ebdc4-143f-4a37-af97-cac886cd3453",
      traps: [
        {
          title: "kJ put into an equation that uses J",
          body: "R = 8.314 is in joules. Convert Ea from kJ mol⁻¹ to J mol⁻¹ before dividing by RT, or the exponent comes out a thousand times too small.",
        },
        {
          title: "Leaving out 2.303 when the equation is in log k",
          body: "In a log k equation the coefficient of 1/T is \\(E_a/2.303R\\), not \\(E_a/R\\). Only an equation in ln k or in the exponential form gives \\(E_a/R\\) directly.",
        },
      ],
    },
  ],
};
