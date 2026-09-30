import type { SubtopicNote } from "@/app/notes/_types";

export const EQUILIBRIUM_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Gibbs Energy and the Equilibrium Constant",
  title: "Gibbs Energy and the Equilibrium Constant",
  oneLineDefinition:
    "How far a reaction goes: ΔG° = −RT ln K, the equilibrium constant from a degree of dissociation or from rate constants, and the graphs of log K against 1/T and of G against the extent of reaction.",
  whyItMatters:
    "Fourteen PYQs, ten of them numerical, and five from 2026. Nine link ΔG° to K, often through a degree of dissociation, rate constants or a table of ΔH and S. Five read a graph: log K against 1/T, G against the extent of reaction, or ΔH and ΔS against temperature.",
  concepts: [
    // C1 — ΔG° and K
    {
      kind: "formula" as const,
      slug: "jcthermo-dg-and-k",
      name: "Standard Gibbs energy and the equilibrium constant",
      intuition:
        "ΔG° compares products and reactants in their standard states; K says where the real mixture settles. The more negative ΔG°, the further the equilibrium lies towards products. A positive ΔG° does not stop the reaction — it only means K is less than 1.",
      definition:
        "- \\(\\Delta G^\\circ = -RT\\ln K = -2.303\\,RT\\log K\\).\n" +
        "- \\(\\Delta G^\\circ < 0 \\Rightarrow K > 1\\); \\(\\Delta G^\\circ = 0 \\Rightarrow K = 1\\); \\(\\Delta G^\\circ > 0 \\Rightarrow K < 1\\).\n" +
        "- Combine it with \\(\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ\\) to find any one of \\(\\Delta H^\\circ\\), \\(\\Delta S^\\circ\\) or K from the other two.\n" +
        "- From rate constants: \\(K = \\frac{k_f}{k_r}\\).\n" +
        "- From a degree of dissociation: find the moles at equilibrium, turn them into partial pressures \\(p_i = x_i P\\), then build \\(K_p\\).",
      formula: {
        label: "Gibbs energy and the equilibrium constant",
        latex: "\\Delta G^\\circ = -RT\\ln K = -2.303\\,RT\\log K",
      },
      authoredExample: {
        prompt:
          "A reaction has \\(\\Delta H^\\circ = -20\\) kJ mol⁻¹ and \\(\\Delta S^\\circ = +12\\) J K⁻¹ mol⁻¹. Find \\(\\Delta G^\\circ\\) and K at 500 K. (\\(R = 8.314\\) J K⁻¹ mol⁻¹)",
        steps: [
          "\\(\\Delta G^\\circ = -20\\,000 - 500 \\times 12 = -26\\,000\\) J mol⁻¹.",
          "\\(2.303RT = 2.303 \\times 8.314 \\times 500 = 9574\\) J mol⁻¹.",
          "\\(\\log K = \\frac{26\\,000}{9574} = 2.72\\), so \\(K = 10^{2.72} \\approx 5.2 \\times 10^2\\).",
        ],
        answer: "\\(\\Delta G^\\circ = -26.0\\) kJ mol⁻¹, \\(K \\approx 5.2 \\times 10^2\\).",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)}\\) is 50% dissociated at 500 K and a total pressure of 1 atm. Find \\(K_p\\) and \\(\\Delta G^\\circ\\). (\\(R = 8.314\\) J K⁻¹ mol⁻¹, \\(\\ln 3 = 1.099\\))",
        steps: [
          "Start with 1 mol \\(\\mathrm{PCl_5}\\): at equilibrium 0.5, 0.5 and 0.5 mol, 1.5 mol in all. Each partial pressure is \\(\\tfrac{1}{3}\\) atm.",
          "\\(K_p = \\frac{(1/3)(1/3)}{1/3} = \\frac{1}{3}\\).",
          "\\(\\Delta G^\\circ = -RT\\ln\\tfrac{1}{3} = 8.314 \\times 500 \\times 1.099 = 4568\\) J mol⁻¹.",
        ],
        answer: "\\(K_p = \\tfrac{1}{3}\\), \\(\\Delta G^\\circ \\approx +4.57\\) kJ mol⁻¹.",
      },
      practiceSet: [
        { prompt: "K = 1. What is \\(\\Delta G^\\circ\\)?", answer: "\\(0\\)" },
        { prompt: "\\(k_f = 10^4\\) and \\(k_r = 10^2\\). Find K.", answer: "\\(100\\)" },
        {
          prompt: "At 298 K, \\(2.303RT = 5.7\\) kJ mol⁻¹. A reaction has \\(\\Delta G^\\circ = -5.7\\) kJ mol⁻¹. Find K.",
          answer: "\\(10\\)",
        },
        { prompt: "A reaction has a positive \\(\\Delta G^\\circ\\). Does any product form?", answer: "Yes; K is simply less than 1" },
      ],
      pyqExampleId: "9187b3bf-2863-4dfe-ad88-75247f44c38a", // 6 Apr 2026 S1 — ΔS from K = 1.8 × 10^-7 and ΔH
      traps: [
        {
          title: "A positive ΔG° is not 'no reaction'",
          body:
            "Some product always forms. \\(\\Delta G^\\circ > 0\\) only means the equilibrium lies on the reactant side, with K below 1. Statements that the reaction 'will not occur at all' are wrong.",
        },
        {
          title: "Moles are not partial pressures",
          body:
            "\\(K_p\\) uses partial pressures. Divide each equilibrium amount by the total moles to get a mole fraction, then multiply by the total pressure, before building \\(K_p\\).",
        },
      ],
    },

    // C2 — graphs
    {
      kind: "formula" as const,
      slug: "jcthermo-g-graphs",
      name: "Graphs of log K against 1/T and of G against extent",
      intuition:
        "Put ΔG° = ΔH° − TΔS° into ΔG° = −2.303RT log K, and log K becomes a straight line in 1/T. Its slope carries ΔH° and its intercept carries ΔS°. On a curve of G against how far the reaction has gone, the lowest point is equilibrium.",
      definition:
        "- \\(\\log K = -\\frac{\\Delta H^\\circ}{2.303R}\\cdot\\frac{1}{T} + \\frac{\\Delta S^\\circ}{2.303R}\\).\n" +
        "- Slope \\(= -\\frac{\\Delta H^\\circ}{2.303R}\\): negative for an endothermic reaction (K rises with T), positive for an exothermic one.\n" +
        "- Intercept \\(= \\frac{\\Delta S^\\circ}{2.303R}\\).\n" +
        "- In ln form: \\(\\ln K = -\\frac{\\Delta H^\\circ - T\\Delta S^\\circ}{RT}\\), and \\(K = e^{-\\Delta G^\\circ/RT}\\).\n" +
        "- G against extent of reaction: left of the minimum the forward reaction is spontaneous; at the minimum, equilibrium; right of it, the reverse. \\(\\Delta G^\\circ\\) = G(pure products) − G(pure reactants).\n" +
        "- If \\(\\Delta H^\\circ\\) and \\(\\Delta S^\\circ\\) do not change with T, their graphs against T are flat lines, while \\(\\Delta G^\\circ\\) is a sloping line.",
      formula: {
        label: "log K against 1/T",
        latex: "\\log K = -\\frac{\\Delta H^\\circ}{2.303R}\\cdot\\frac{1}{T} + \\frac{\\Delta S^\\circ}{2.303R}",
      },
      authoredExample: {
        prompt:
          "A plot of log K against 1/T is a straight line with slope −2000 K and intercept 3.0. Find \\(\\Delta H^\\circ\\) and \\(\\Delta S^\\circ\\). (\\(R = 8.314\\) J K⁻¹ mol⁻¹)",
        steps: [
          "\\(2.303R = 2.303 \\times 8.314 = 19.15\\) J K⁻¹ mol⁻¹.",
          "Slope: \\(-\\frac{\\Delta H^\\circ}{19.15} = -2000\\), so \\(\\Delta H^\\circ = 38\\,300\\) J mol⁻¹ = +38.3 kJ mol⁻¹. Endothermic.",
          "Intercept: \\(\\frac{\\Delta S^\\circ}{19.15} = 3.0\\), so \\(\\Delta S^\\circ = +57.4\\) J K⁻¹ mol⁻¹.",
        ],
        answer: "\\(\\Delta H^\\circ \\approx +38.3\\) kJ mol⁻¹, \\(\\Delta S^\\circ \\approx +57.4\\) J K⁻¹ mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "On a curve of G against the extent of reaction, point P lies left of the minimum, Q at the minimum and R to the right of it. What happens at each point?",
        steps: [
          "At P the curve still falls towards the minimum: the forward reaction is spontaneous.",
          "At Q the slope is zero: the mixture is at equilibrium.",
          "At R the curve falls back towards Q: the reverse reaction is spontaneous.",
        ],
        answer: "P forward spontaneous, Q equilibrium, R reverse spontaneous.",
      },
      practiceSet: [
        { prompt: "The plot of log K against 1/T has a positive slope. Is the reaction endothermic or exothermic?", answer: "Exothermic" },
        { prompt: "What does the intercept of log K against 1/T equal?", answer: "\\(\\Delta S^\\circ/2.303R\\)" },
        { prompt: "What is the lowest point on a curve of G against extent of reaction?", answer: "The equilibrium mixture" },
        {
          prompt: "Which is correct: \\(\\ln K = \\frac{\\Delta H^\\circ - T\\Delta S^\\circ}{RT}\\) or \\(\\ln K = \\frac{T\\Delta S^\\circ - \\Delta H^\\circ}{RT}\\)?",
          answer: "\\(\\ln K = \\frac{T\\Delta S^\\circ - \\Delta H^\\circ}{RT}\\)",
        },
      ],
      pyqExampleId: "db19bcbc-5ea2-42ec-8505-1958a4449303", // 28 Jan 2026 S2 — intercept and slope of log K against 1/T
      traps: [
        {
          title: "Dropping the minus sign",
          body:
            "\\(\\ln K = \\frac{\\Delta H^\\circ - T\\Delta S^\\circ}{RT}\\) is the planted wrong form. Since \\(\\ln K = -\\Delta G^\\circ/RT\\), the numerator is \\(T\\Delta S^\\circ - \\Delta H^\\circ\\).",
        },
        {
          title: "Reading the slope",
          body:
            "The slope is \\(-\\Delta H^\\circ/2.303R\\). A line that falls from left to right means \\(\\Delta H^\\circ > 0\\): K grows as the temperature rises.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Entropy, Gibbs Energy and Spontaneity — ΔG = ΔH − TΔS",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-spontaneity",
    },
  ],
};
