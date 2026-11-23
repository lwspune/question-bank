import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Temperature Dependence of Reaction Rates",
  title: "Temperature and Rate: the Arrhenius Equation",
  oneLineDefinition:
    "The Arrhenius equation k = A e^(−Ea/RT) and its terms, its logarithmic form and the Arrhenius plot, the activation energy from rate constants at two temperatures, and why a rise in temperature speeds up a reaction.",
  whyItMatters:
    "15 questions. Three were set in board papers: the temperature at which a first order reaction has a given half life, from its pre-exponential factor and activation energy (2017); derive the Arrhenius equation and the expression for the change of rate constant with temperature (2019); and the activation energy of a reaction whose rate constant doubles between 303 K and 313 K (2026). The textbook adds rate constants at a new temperature, the frequency factor, half lives at two temperatures, and the effect of temperature and activation energy explained with graphs and with the Arrhenius equation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccck-arrhenius",
      name: "The Arrhenius equation and the Arrhenius plot",
      intuition:
        "Concentrations hardly change when you warm a reaction, yet the rate can rise sharply. The rate constant is what changes, and the Arrhenius equation says how: the exponential term is the fraction of molecules energetic enough to react, and that fraction grows quickly with temperature.",
      definition:
        "- **Arrhenius equation:** \\(k = \\text{A}\\,e^{-E_a/RT}\\) (6.18), where \\(k\\) is the rate constant, \\(E_a\\) the activation energy, \\(R\\) the molar gas constant (8.314 J K⁻¹ mol⁻¹), \\(T\\) the temperature in kelvin and A the **pre-exponential factor**.\n" +
        "- A has the same unit as \\(k\\) for a first order reaction, and A is related to the frequency of collisions (so it is also called the frequency factor).\n" +
        "- **Logarithmic form:** \\(\\ln k = -\\dfrac{E_a}{RT} + \\ln \\text{A}\\) (6.19), or \\(\\log_{10} k = -\\dfrac{E_a}{2.303\\,R}\\cdot\\dfrac{1}{T} + \\log_{10}\\text{A}\\) (6.20).\n" +
        "- **Arrhenius plot:** (6.20) has the form \\(y = mx + c\\). A graph of \\(\\log_{10} k\\) against \\(1/T\\) is a straight line of slope \\(-\\dfrac{E_a}{2.303\\,R}\\) and intercept \\(\\log_{10}\\text{A}\\) (Fig. 6.8). So \\(E_a = -2.303\\,R \\times \\text{slope}\\).\n" +
        "- To find \\(k\\) from A: \\(\\log_{10}\\dfrac{\\text{A}}{k} = \\dfrac{E_a}{2.303\\,RT}\\).",
      formula: {
        label: "Arrhenius equation",
        latex: "k = \\text{A}\\,e^{-E_a/RT}, \\qquad \\log_{10} k = \\log_{10}\\text{A} - \\frac{E_a}{2.303\\,RT}",
        symbols: [
          { symbol: "\\(\\text{A}\\)", meaning: "pre-exponential (frequency) factor" },
          { symbol: "\\(E_a\\)", meaning: "activation energy, in J mol⁻¹" },
          { symbol: "\\(T\\)", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "A first order reaction has an activation energy of 100 kJ mol⁻¹ and a pre-exponential factor of \\(2.0 \\times 10^{12}\\) s⁻¹. Calculate its rate constant at 450 K. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(E_a = 100 \\times 10^3\\) J mol⁻¹, \\(\\text{A} = 2.0 \\times 10^{12}\\) s⁻¹, \\(T = 450\\) K.",
          "Formula: \\(\\log_{10}\\dfrac{\\text{A}}{k} = \\dfrac{E_a}{2.303\\,RT}\\).",
          "Substitution: \\(\\log_{10}\\dfrac{\\text{A}}{k} = \\dfrac{100 \\times 10^3\\ \\text{J mol}^{-1}}{2.303 \\times 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1} \\times 450\\ \\text{K}} = 11.61\\).",
          "\\(\\dfrac{\\text{A}}{k} = \\text{antilog } 11.61 = 4.04 \\times 10^{11}\\), so \\(k = \\dfrac{2.0 \\times 10^{12}\\ \\text{s}^{-1}}{4.04 \\times 10^{11}} = 4.95\\) s⁻¹.",
        ],
        answer: "k = 4.95 s⁻¹",
      },
      selfCheckExample: {
        prompt: "The rate constant of a reaction follows \\(\\log_{10} k = 12.0 - \\dfrac{5000}{T}\\). Find the activation energy. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: ["Compare with \\(\\log_{10} k = \\log_{10}\\text{A} - \\dfrac{E_a}{2.303\\,R}\\cdot\\dfrac{1}{T}\\): \\(\\dfrac{E_a}{2.303\\,R} = 5000\\) K.", "\\(E_a = 2.303 \\times 8.314 \\times 5000 = 95\\,736\\) J mol⁻¹ \\(= 95.7\\) kJ mol⁻¹."],
        answer: "95.7 kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "What is plotted against what in an Arrhenius plot, and what does its slope give?", answer: "\\(\\log_{10} k\\) against \\(1/T\\); slope \\(= -E_a/2.303R\\)" },
        { prompt: "An Arrhenius plot has a slope of −4000 K. Find Eₐ.", answer: "\\(E_a = 2.303 \\times 8.314 \\times 4000 = 76.6\\) kJ mol⁻¹" },
        { prompt: "For a first order reaction, what is the unit of the pre-exponential factor?", answer: "The same as k: s⁻¹" },
      ],
      pyqExampleId: "5d95360d-e338-48a6-84c2-125a4250bd71",
      traps: [
        {
          title: "Temperature left in °C",
          body: "Every \\(T\\) in the Arrhenius equation is in kelvin. 25 °C is 298 K; putting 25 in its place gives a wrong exponent.",
        },
        {
          title: "Slope taken as +Eₐ/2.303R",
          body: "The Arrhenius line slopes downwards, so its slope is negative: \\(E_a = -2.303R \\times \\text{slope}\\). A negative activation energy means a sign was dropped.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-two-temperatures",
      name: "Activation energy from rate constants at two temperatures",
      intuition:
        "Write the Arrhenius equation at two temperatures and subtract: the unknown A drops out. What is left links the ratio of the two rate constants to the activation energy, so measuring k at two temperatures is enough to find Eₐ.",
      definition:
        "- **Derivation** (the board asks for it):\n" +
        "- At \\(T_1\\): \\(\\log_{10} k_1 = \\log_{10}\\text{A} - \\dfrac{E_a}{2.303\\,RT_1}\\) (6.21)\n" +
        "- At \\(T_2\\): \\(\\log_{10} k_2 = \\log_{10}\\text{A} - \\dfrac{E_a}{2.303\\,RT_2}\\) (6.22)\n" +
        "- Subtract (6.21) from (6.22); \\(\\log_{10}\\text{A}\\) cancels: \\(\\log_{10} k_2 - \\log_{10} k_1 = \\dfrac{E_a}{2.303\\,R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)\\)\n" +
        "- \\(\\log_{10}\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303\\,R}\\left(\\dfrac{T_2 - T_1}{T_1 T_2}\\right)\\) (6.23)\n" +
        "- For \\(T_2 > T_1\\) the right side is positive, so \\(k_2 > k_1\\): the rate constant rises with temperature.\n" +
        "- **Half lives:** for a first order reaction \\(t_{1/2} = 0.693/k\\), so \\(\\dfrac{(t_{1/2})_1}{(t_{1/2})_2} = \\dfrac{k_2}{k_1}\\); put this ratio into (6.23) to compare half lives at two temperatures.\n" +
        "- Only the ratio \\(k_2/k_1\\) is needed, so 'the rate constant doubles' means \\(k_2/k_1 = 2\\).",
      formula: {
        label: "Rate constants at two temperatures",
        latex: "\\log_{10}\\frac{k_2}{k_1} = \\frac{E_a}{2.303\\,R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
      },
      authoredExample: {
        prompt:
          "The rate constant of a reaction is \\(2.0 \\times 10^{-3}\\) s⁻¹ at 300 K and \\(9.0 \\times 10^{-3}\\) s⁻¹ at 320 K. Calculate the activation energy. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(k_1 = 2.0 \\times 10^{-3}\\) s⁻¹ at \\(T_1 = 300\\) K; \\(k_2 = 9.0 \\times 10^{-3}\\) s⁻¹ at \\(T_2 = 320\\) K.",
          "Formula: \\(E_a = \\dfrac{2.303\\,R\\,T_1T_2}{T_2 - T_1}\\log_{10}\\dfrac{k_2}{k_1}\\).",
          "Substitution: \\(E_a = \\dfrac{2.303 \\times 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1} \\times 300\\ \\text{K} \\times 320\\ \\text{K}}{20\\ \\text{K}} \\times \\log_{10} 4.5 = 91\\,906 \\times 0.6532\\) J mol⁻¹.",
          "\\(E_a = 60\\,030\\) J mol⁻¹ \\(= 60.0\\) kJ mol⁻¹.",
        ],
        answer: "Eₐ = 60.0 kJ mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A reaction has Eₐ = 52 kJ mol⁻¹ and a rate constant of \\(1.0 \\times 10^{-3}\\) s⁻¹ at 300 K. Find its rate constant at 310 K. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\log_{10}\\dfrac{k_2}{k_1} = \\dfrac{52\\,000}{2.303 \\times 8.314} \\times \\dfrac{10}{300 \\times 310} = 0.292\\).",
          "\\(\\dfrac{k_2}{k_1} = \\text{antilog } 0.292 = 1.96\\), so \\(k_2 = 1.96 \\times 10^{-3}\\) s⁻¹.",
        ],
        answer: "1.96 × 10⁻³ s⁻¹",
      },
      practiceSet: [
        { prompt: "In the derivation of the two-temperature equation, which term cancels on subtracting?", answer: "\\(\\log_{10}\\text{A}\\), since A does not change with temperature" },
        { prompt: "A first order reaction has a half life of 40 min at T₁ and 10 min at T₂. What is k₂/k₁?", answer: "4, because the ratio of half lives \\((t_{1/2})_1/(t_{1/2})_2 = k_2/k_1\\)" },
        { prompt: "If T₂ is greater than T₁, is k₂ greater or smaller than k₁?", answer: "Greater: the right side of the equation is positive" },
      ],
      pyqExampleId: "cf0aa5ca-5d69-42e9-9f31-e62dc06716c1",
      traps: [
        {
          title: "2.303RT in the denominator",
          body: "The equation has \\(2.303R\\), not \\(2.303RT\\); the temperatures sit in the bracket \\((T_2 - T_1)/T_1T_2\\). A copied extra \\(T\\) shrinks the answer hundreds of times.",
        },
        {
          title: "Half lives the wrong way up",
          body: "A shorter half life means a larger rate constant. The ratio \\(k_2/k_1\\) equals \\((t_{1/2})_1/(t_{1/2})_2\\), first half life over second.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccck-temperature-effect",
      name: "Why a rise in temperature increases the rate",
      intuition:
        "Fuels such as coal and oil sit unchanged at room temperature but burn fast when hot; food lasts longer in a freezer. Warming the molecules does not change how many there are, but it moves more of them past the activation energy.",
      definition:
        "- The average kinetic energy of molecules is proportional to temperature.\n" +
        "- A bimolecular reaction occurs only if the colliding molecules have kinetic energy of at least \\(E_a\\) and proper orientation.\n" +
        "- **Graph (Fig. 6.9):** fraction of molecules with a given kinetic energy (y-axis) against kinetic energy (x-axis), at \\(T_1\\) and at a higher \\(T_2\\). The area under each curve is proportional to the number of molecules, so the total area is the same at both temperatures. The shaded area beyond \\(E_a\\) is the fraction of molecules with energy above \\(E_a\\), and it is larger at \\(T_2\\).\n" +
        "- **From the Arrhenius equation:** as \\(T\\) rises, \\(-E_a/RT\\) becomes less negative, so \\(k\\) and the rate increase. At a fixed temperature, a larger \\(E_a\\) gives a smaller \\(k\\) and a slower reaction.\n" +
        "- The rate constant depends on temperature but not on concentration.",
      table: {
        columns: ["Change", "Effect on the fraction of molecules with energy at least Ea", "Effect on k and rate"],
        rows: [
          {
            cells: ["Temperature raised from \\(T_1\\) to \\(T_2\\)", "Increases: the curve at \\(T_2\\) is flatter and spreads to higher energy, so the area beyond \\(E_a\\) is larger", "Both increase"],
          },
          {
            cells: ["Larger activation energy at the same temperature", "Decreases: \\(e^{-E_a/RT}\\) is smaller", "Both decrease"],
            pyqExampleId: "b74fba47-5090-44e0-abb4-bd4227f36fae",
          },
          {
            cells: ["Concentration of a reactant increased", "Unchanged", "Rate increases; k does not change"],
            pyqExampleId: "50079648-cf48-4da1-b6fd-6b480807b8c9",
          },
        ],
      },
      practiceSet: [
        { prompt: "In the graph of fraction of molecules against kinetic energy, why is the total area under the curve the same at T₁ and T₂?", answer: "The total number of molecules does not change with temperature" },
        { prompt: "Which of these increases the rate constant: a higher concentration or a higher temperature?", answer: "A higher temperature" },
        { prompt: "Give an everyday example of temperature affecting the rate of a reaction.", answer: "Food spoils quickly at room temperature but lasts longer in a freezer (or fuels burn only when hot)" },
      ],
      pyqExampleId: "655ba070-27dc-43a3-b950-670d7d9da22b",
      traps: [
        {
          title: "Two curves with different areas",
          body: "When you draw Fig. 6.9, keep the areas under the two curves equal; only the shape changes. Mark \\(E_a\\) on the energy axis and shade the area beyond it for both temperatures.",
        },
        {
          title: "Saying temperature raises the activation energy",
          body: "Temperature does not change \\(E_a\\). It increases the fraction of molecules whose energy is at least \\(E_a\\).",
        },
      ],
    },
  ],
};
