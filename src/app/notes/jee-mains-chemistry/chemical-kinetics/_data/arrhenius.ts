import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_ARRHENIUS_NOTE: SubtopicNote = {
  subtopicName: "Temperature and the Arrhenius Equation",
  title: "Temperature and the Arrhenius Equation",
  oneLineDefinition:
    "k = A e^(−Ea/RT): the activation energy is read from the equation or from the slope of ln k against 1/T, found from rate constants at two temperatures, or compared between two reactions with the same A.",
  whyItMatters:
    "Twenty-six PYQs, twenty of them numerical, and nine from 2026 — more recent questions than any other page. Fifteen read Ea or A from an equation or a plot, or test statements about the equation; seven use the two-temperature form; four compare two reactions with the same A, such as a catalysed and an uncatalysed path. Three ideas cover the page.",
  concepts: [
    // C1 — reading the equation and its plot
    {
      kind: "formula" as const,
      slug: "jckin-arrhenius-read",
      name: "Reading Ea and A from the Arrhenius equation or its plot",
      intuition:
        "Only molecules that collide with at least the activation energy \\(E_a\\) react, and the share of such molecules is \\(e^{-E_a/RT}\\). Taking logs turns the equation into a straight line in \\(1/T\\): the slope carries \\(E_a\\), the intercept carries \\(A\\). Most slips come from mixing the natural-log form with the base-10 form.",
      definition:
        "- \\(\\ln k = \\ln A - \\dfrac{E_a}{R}\\cdot\\dfrac1T\\): the coefficient of \\(\\dfrac1T\\) is \\(-\\dfrac{E_a}{R}\\).\n" +
        "- \\(\\log k = \\log A - \\dfrac{E_a}{2.303R}\\cdot\\dfrac1T\\): the coefficient is \\(-\\dfrac{E_a}{2.303R}\\). With \\(R = 8.314\\), \\(2.303R = 19.15\\) J K\\(^{-1}\\) mol\\(^{-1}\\).\n" +
        "- \\(\\ln k\\) against \\(\\dfrac{10^3}{T}\\): slope \\(= -\\dfrac{E_a}{10^3R}\\), so multiply the slope by \\(10^3R\\).\n" +
        "- \\(e^{-E_a/RT}\\) is the fraction of molecules with energy AT LEAST \\(E_a\\).\n" +
        "- \\(A\\) has the unit of \\(k\\). \\(A\\) and \\(E_a\\) are taken as independent of temperature.\n" +
        "- At a given \\(T\\), lower \\(E_a\\) means larger \\(k\\). Higher \\(E_a\\) means \\(k\\) is MORE sensitive to temperature, and a given rise in \\(T\\) changes \\(k\\) more at low temperature than at high.\n" +
        "- \\(k\\) rises with \\(T\\) for every reaction, endothermic or exothermic.",
      formula: {
        label: "Arrhenius equation",
        latex: "k = A\\,e^{-E_a/RT}\\qquad \\ln k = \\ln A - \\frac{E_a}{RT}\\qquad \\log k = \\log A - \\frac{E_a}{2.303RT}",
      },
      authoredExample: {
        prompt:
          "For a first-order reaction, \\(\\log k = 12.5 - \\dfrac{9000\\ \\text{K}}{T}\\), with \\(k\\) in s\\(^{-1}\\). Find \\(E_a\\) and \\(A\\). (\\(R = 8.314\\) J K\\(^{-1}\\) mol\\(^{-1}\\))",
        steps: [
          "Base-10 form: \\(\\dfrac{E_a}{2.303R} = 9000\\) K.",
          "\\(E_a = 2.303 \\times 8.314 \\times 9000 \\approx 172300\\) J mol\\(^{-1}\\) \\(\\approx 172\\) kJ mol\\(^{-1}\\).",
          "\\(\\log A = 12.5\\), so \\(A = 10^{12.5} = 3.16 \\times 10^{12}\\) s\\(^{-1}\\).",
        ],
        answer: "\\(E_a \\approx 172\\) kJ mol\\(^{-1}\\); \\(A = 3.16 \\times 10^{12}\\) s\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "A decomposition follows \\(k = (2 \\times 10^{13}\\ \\text{s}^{-1})\\,e^{-15000\\ \\text{K}/T}\\). Find \\(E_a\\). (\\(R = 8.3\\) J K\\(^{-1}\\) mol\\(^{-1}\\))",
        steps: [
          "The exponent is \\(-\\dfrac{E_a}{RT}\\), so \\(\\dfrac{E_a}{R} = 15000\\) K.",
          "\\(E_a = 15000 \\times 8.3 = 124500\\) J mol\\(^{-1}\\).",
        ],
        answer: "\\(124.5\\) kJ mol\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\ln k = 30 - \\dfrac{12000\\ \\text{K}}{T}\\). Find \\(E_a\\) (\\(R = 8.3\\) J K\\(^{-1}\\) mol\\(^{-1}\\)).", answer: "\\(99.6\\) kJ mol\\(^{-1}\\)" },
        { prompt: "The plot of \\(\\log k\\) against \\(1/T\\) has slope \\(-5000\\) K. Find \\(E_a\\) (\\(2.303R = 19.1\\) J K\\(^{-1}\\) mol\\(^{-1}\\)).", answer: "\\(95.5\\) kJ mol\\(^{-1}\\)" },
        { prompt: "Unit of \\(A\\) for a first-order reaction?", answer: "s\\(^{-1}\\)" },
        { prompt: "Does \\(k\\) of an exothermic reaction rise when the temperature rises?", answer: "Yes — \\(k\\) rises with \\(T\\) for every reaction" },
      ],
      pyqExampleId: "b5544978-9cfe-40c8-a21e-a63eea87b3ad", // 2026 — Ea from log k = 14.34 − 1.5×10⁴/T, then one-fifth of it
      traps: [
        {
          title: "The ln form read as the log form",
          body:
            "The slope of \\(\\ln k\\) against \\(1/T\\) is \\(-\\dfrac{E_a}{R}\\); the slope of \\(\\log k\\) against \\(1/T\\) is \\(-\\dfrac{E_a}{2.303R}\\). Using the wrong one puts \\(E_a\\) out by a factor of 2.303.",
        },
        {
          title: "Fraction BELOW the activation energy",
          body:
            "\\(e^{-E_a/RT}\\) is the fraction of molecules with energy equal to or MORE than \\(E_a\\) — the ones that can react. A statement calling it the fraction with less than \\(E_a\\) is false.",
        },
        {
          title: "Endothermic reactions slowing on heating",
          body:
            "The sign of \\(\\Delta H\\) does not enter \\(k = Ae^{-E_a/RT}\\). For every reaction \\(k\\) rises with temperature, along a curve that bends upward at first.",
        },
      ],
    },

    // C2 — two-temperature form
    {
      kind: "formula" as const,
      slug: "jckin-two-temperature",
      name: "Two-temperature form of the Arrhenius equation",
      intuition:
        "Write the log form at two temperatures and subtract: \\(A\\) cancels. What is left links the ratio of the two rate constants to \\(E_a\\) and the two temperatures. Any one of \\(E_a\\), \\(k_2\\) or \\(T_2\\) can then be found from the rest.",
      definition:
        "- \\(\\log\\dfrac{k_2}{k_1} = \\dfrac{E_a}{2.303R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)\\), with \\(k_2\\) at \\(T_2\\).\n" +
        "- \\(\\dfrac{1}{T_1} - \\dfrac{1}{T_2} = \\dfrac{T_2 - T_1}{T_1T_2}\\). Temperatures in kelvin.\n" +
        "- Near room temperature a 10 °C rise roughly doubles \\(k\\) when \\(E_a \\approx 53\\) kJ mol\\(^{-1}\\).\n" +
        "- kcal to kJ: multiply by 4.184 (or by the 4.2 the question gives).\n" +
        "- A half-life gives \\(k\\) first: \\(k = \\dfrac{0.693}{t_{1/2}}\\).",
      formula: {
        label: "Two-temperature form",
        latex: "\\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)",
      },
      authoredExample: {
        prompt:
          "The rate constant of a reaction doubles between 300 K and 320 K. Find \\(E_a\\). (\\(R = 8.314\\) J K\\(^{-1}\\) mol\\(^{-1}\\), \\(\\log 2 = 0.301\\))",
        steps: [
          "\\(\\dfrac{1}{300} - \\dfrac{1}{320} = \\dfrac{20}{96000} = \\dfrac{1}{4800}\\) K\\(^{-1}\\).",
          "\\(E_a = 2.303 \\times 8.314 \\times 0.301 \\times 4800 = 19.15 \\times 0.301 \\times 4800 \\approx 27660\\) J mol\\(^{-1}\\).",
        ],
        answer: "\\(E_a \\approx 27.7\\) kJ mol\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "A reaction has \\(E_a = 50\\) kJ mol\\(^{-1}\\) and \\(k = 2.0 \\times 10^{-3}\\) s\\(^{-1}\\) at 300 K. Find \\(k\\) at 330 K. (\\(R = 8.314\\) J K\\(^{-1}\\) mol\\(^{-1}\\), antilog \\(0.791 = 6.18\\))",
        steps: [
          "\\(\\dfrac{1}{300} - \\dfrac{1}{330} = \\dfrac{30}{99000} = 3.03 \\times 10^{-4}\\) K\\(^{-1}\\).",
          "\\(\\log\\dfrac{k_2}{k_1} = \\dfrac{50000}{19.15} \\times 3.03 \\times 10^{-4} = 2611 \\times 3.03 \\times 10^{-4} = 0.791\\).",
          "\\(\\dfrac{k_2}{k_1} = 6.18\\), so \\(k_2 = 6.18 \\times 2.0 \\times 10^{-3} = 1.24 \\times 10^{-2}\\) s\\(^{-1}\\).",
        ],
        answer: "\\(1.24 \\times 10^{-2}\\) s\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\dfrac{1}{300} - \\dfrac{1}{400}\\) in K\\(^{-1}\\).", answer: "\\(\\dfrac{1}{1200} = 8.33 \\times 10^{-4}\\)" },
        { prompt: "Write 12 kcal mol\\(^{-1}\\) in kJ mol\\(^{-1}\\), using 1 cal = 4.2 J.", answer: "\\(50.4\\) kJ mol\\(^{-1}\\)" },
        { prompt: "\\(k_2/k_1 = 10\\) and \\(\\dfrac{E_a}{2.303R} = 3000\\) K. Find \\(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\).", answer: "\\(\\dfrac{1}{3000}\\) K\\(^{-1}\\)" },
        { prompt: "About how much does \\(k\\) change for a 10 °C rise near room temperature when \\(E_a \\approx 53\\) kJ mol\\(^{-1}\\)?", answer: "It roughly doubles" },
      ],
      pyqExampleId: "fb34e46d-db76-41a8-8327-6df243512056", // 2026 — Ea 60 kJ, k triples from 27 °C, find the new temperature
      traps: [
        {
          title: "Celsius in the formula",
          body:
            "\\(\\dfrac{1}{T}\\) must be in kelvin. Convert 27 °C to 300 K before subtracting reciprocals, and convert an answer in kelvin back to °C only if the question asks.",
        },
        {
          title: "The reciprocals subtracted the wrong way round",
          body:
            "With \\(k_2\\) at the higher temperature \\(T_2\\), \\(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\) is positive, and so is \\(\\log\\dfrac{k_2}{k_1}\\). A negative \\(E_a\\) means one of the two was flipped.",
        },
      ],
    },

    // C3 — two reactions with the same A
    {
      kind: "formula" as const,
      slug: "jckin-compare-barriers",
      name: "Ratio of rate constants for two reactions with the same A",
      intuition:
        "When two reactions share the same \\(A\\) and temperature, only their activation energies differ. Dividing the two Arrhenius equations leaves \\(e^{\\Delta E_a/RT}\\). A catalyst that lowers \\(E_a\\) is the commonest case: the catalysed and uncatalysed paths share \\(A\\).",
      definition:
        "- \\(\\dfrac{k_2}{k_1} = e^{(E_{a1} - E_{a2})/RT}\\), so \\(\\ln\\dfrac{k_2}{k_1} = \\dfrac{E_{a1} - E_{a2}}{RT}\\) and \\(\\log\\dfrac{k_2}{k_1} = \\dfrac{E_{a1} - E_{a2}}{2.303RT}\\).\n" +
        "- Catalyst lowering \\(E_a\\) by \\(\\Delta E_a\\): \\(\\dfrac{k_{\\text{cat}}}{k_{\\text{uncat}}} = e^{\\Delta E_a/RT}\\).\n" +
        "- Catalysed at \\(T_1\\) as fast as uncatalysed at \\(T_2\\) (same \\(A\\)): \\(\\dfrac{E_{a,\\text{cat}}}{T_1} = \\dfrac{E_a}{T_2}\\).\n" +
        "- Temperature at which two rate constants are equal: \\(A_1e^{-E_1/RT} = A_2e^{-E_2/RT}\\), so \\(T = \\dfrac{E_1 - E_2}{R\\ln(A_1/A_2)}\\).",
      formula: {
        label: "Same A, different Ea",
        latex: "\\ln\\frac{k_2}{k_1} = \\frac{E_{a1} - E_{a2}}{RT}",
      },
      authoredExample: {
        prompt:
          "At 400 K a catalyst lowers the activation energy of a reaction by 15 kJ mol\\(^{-1}\\), with no change in \\(A\\). Find \\(\\ln\\dfrac{k_{\\text{cat}}}{k_{\\text{uncat}}}\\) and the ratio itself. (\\(R = 8.3\\) J K\\(^{-1}\\) mol\\(^{-1}\\))",
        steps: [
          "\\(\\ln\\dfrac{k_{\\text{cat}}}{k_{\\text{uncat}}} = \\dfrac{15000}{8.3 \\times 400} = \\dfrac{15000}{3320} = 4.52\\).",
          "\\(\\dfrac{k_{\\text{cat}}}{k_{\\text{uncat}}} = e^{4.52} \\approx 92\\).",
        ],
        answer: "\\(\\ln\\) ratio \\(\\approx 4.52\\); the catalysed reaction is about 92 times faster.",
      },
      selfCheckExample: {
        prompt:
          "Two reactions have \\(k_1 = 10^{8}e^{-20000\\ \\text{K}/T}\\) and \\(k_2 = 10^{6}e^{-15000\\ \\text{K}/T}\\). At what temperature are they equal? (\\(\\ln 10 = 2.303\\))",
        steps: [
          "\\(10^{8}e^{-20000/T} = 10^{6}e^{-15000/T}\\) gives \\(10^2 = e^{5000/T}\\).",
          "\\(2 \\times 2.303 = \\dfrac{5000}{T}\\), so \\(T = \\dfrac{5000}{4.606} = 1086\\) K.",
        ],
        answer: "About \\(1086\\) K.",
      },
      practiceSet: [
        { prompt: "Same \\(A\\); activation energies differ by 8.3 kJ mol\\(^{-1}\\) at 250 K. Find \\(\\ln(k_2/k_1)\\) (\\(R = 8.3\\) J K\\(^{-1}\\) mol\\(^{-1}\\)).", answer: "\\(4\\)" },
        { prompt: "Same \\(A\\) and temperature: does the reaction with the lower \\(E_a\\) have the larger or the smaller \\(k\\)?", answer: "The larger" },
        { prompt: "\\(\\ln(k_2/k_1) = 4.606\\). Find \\(\\log(k_2/k_1)\\).", answer: "\\(2\\)" },
        { prompt: "A catalyst lowers \\(E_a\\) and leaves \\(A\\) unchanged. Does \\(k\\) rise or fall?", answer: "It rises" },
      ],
      pyqExampleId: "3851679b-6de8-4b6f-8446-d4abe8bf98b7", // 2026 — same A, Ea differ by 20 kJ at 300 K, ln(k₂/k₁)
      traps: [
        {
          title: "ln of the ratio given when log was asked",
          body:
            "\\(\\log\\dfrac{k_2}{k_1} = \\dfrac{\\Delta E_a}{2.303RT}\\) and \\(\\ln\\dfrac{k_2}{k_1} = \\dfrac{\\Delta E_a}{RT}\\) differ by a factor of 2.303. Also keep \\(\\Delta E_a\\) in joules when \\(R\\) is in J K\\(^{-1}\\) mol\\(^{-1}\\); kJ puts the answer out by 1000.",
        },
      ],
    },
  ],
};
