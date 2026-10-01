import type { SubtopicNote } from "@/app/notes/_types";

export const SPEED_WAVE_NOTE: SubtopicNote = {
  subtopicName: "Wave Speed in Strings, Solids and Gases",
  title: "Wave Speed in Strings, Solids and Gases",
  oneLineDefinition:
    "Wave speed is √(restoring property ÷ inertia): √(T/μ) on a string, √(Y/ρ) in a rod and √(γP/ρ) = √(γRT/M) in a gas.",
  whyItMatters:
    "Eleven PYQs, three of them asking for a number, and three from 2026. Four are about transverse waves on a stretched string, two about longitudinal waves in a solid rod, and five about sound in gases: the effect of temperature and molar mass, and why sound is faster in solids. Each is one square root; the marks go on units such as g/cm and on using °C where kelvin is needed.",
  concepts: [
    // C1 — speed on a stretched string
    {
      kind: "formula" as const,
      slug: "jpwave-string-speed",
      name: "Speed of a transverse wave on a stretched string",
      intuition:
        "Tension pulls a displaced bit of string back; its mass per unit length resists. A tighter or lighter string carries a wave faster. Because the speed is a square root, four times the tension only doubles the speed.",
      definition:
        "- \\(v = \\sqrt{\\dfrac{T}{\\mu}}\\), where \\(\\mu\\) is the mass per unit length in kg/m. So \\(T = \\mu v^{2}\\).\n" +
        "- \\(\\mu = \\dfrac{\\text{mass}}{\\text{length}}\\); for a wire of density \\(\\rho\\) and cross-section A, \\(\\mu = \\rho A\\).\n" +
        "- 1 g/m = \\(10^{-3}\\) kg/m and 1 g/cm = 0.1 kg/m.\n" +
        "- Time for a pulse to cross a length L: \\(t = L/v = L\\sqrt{\\mu/T}\\). Two strings joined under the same tension: \\(t \\propto L\\sqrt{\\mu}\\).\n" +
        "- If the speed comes from an equation, \\(v = \\omega/k\\), then \\(T = \\mu(\\omega/k)^{2}\\).\n" +
        "- Tension from a stretched wire: \\(T = \\dfrac{YA\\,\\Delta L}{L}\\), so the extension is \\(\\Delta L = \\dfrac{TL}{YA}\\).",
      formula: {
        label: "Wave speed on a string",
        latex: "v = \\sqrt{\\frac{T}{\\mu}} \\qquad \\mu = \\frac{m}{L} \\qquad T = \\frac{YA\\,\\Delta L}{L}",
      },
      authoredExample: {
        prompt:
          "A 2 m string of mass 5 g is held at a tension of 100 N. Find the wave speed, the time a pulse takes to cross it, and the tension that would double the speed.",
        steps: [
          "\\(\\mu = \\dfrac{0.005}{2} = 2.5 \\times 10^{-3}\\ \\text{kg/m}\\).",
          "\\(v = \\sqrt{\\dfrac{100}{2.5 \\times 10^{-3}}} = \\sqrt{4 \\times 10^{4}} = 200\\ \\text{m/s}\\), so \\(t = 2/200 = 0.01\\ \\text{s}\\).",
          "\\(v \\propto \\sqrt{T}\\): twice the speed needs four times the tension, 400 N.",
        ],
        answer: "\\(200\\ \\text{m/s}\\), 0.01 s, 400 N",
      },
      selfCheckExample: {
        prompt:
          "A wire 1 m long has mass 10 g, cross-section \\(1\\ \\text{mm}^{2}\\) and Young's modulus \\(2 \\times 10^{11}\\ \\text{N/m}^{2}\\). Transverse waves travel on it at \\(50\\ \\text{m/s}\\). Find the tension and the extension of the wire.",
        steps: [
          "\\(\\mu = 0.01\\ \\text{kg/m}\\), so \\(T = \\mu v^{2} = 0.01 \\times 2500 = 25\\ \\text{N}\\).",
          "\\(\\Delta L = \\dfrac{TL}{YA} = \\dfrac{25 \\times 1}{2 \\times 10^{11} \\times 10^{-6}} = 1.25 \\times 10^{-4}\\ \\text{m}\\).",
        ],
        answer: "25 N and \\(1.25 \\times 10^{-4}\\ \\text{m}\\)",
      },
      practiceSet: [
        { prompt: "T = 36 N and \\(\\mu = 0.01\\ \\text{kg/m}\\). Wave speed?", answer: "\\(60\\ \\text{m/s}\\)" },
        { prompt: "The tension in a string is made four times. The wave speed becomes?", answer: "Twice as much" },
        { prompt: "A wave \\(y = 0.1\\sin(2x - 80t)\\) (SI) runs on a string with \\(\\mu = 0.05\\ \\text{kg/m}\\). The tension?", answer: "80 N", method: "\\(v = 80/2 = 40\\ \\text{m/s}\\), \\(T = \\mu v^{2}\\)" },
        { prompt: "String P (9 g/m, 1.2 m) is joined to string Q (1 g/m, 0.8 m) under one tension. Ratio of pulse times \\(t_P/t_Q\\)?", answer: "4.5", method: "\\(t \\propto L\\sqrt{\\mu}\\): \\(\\dfrac{1.2 \\times 3}{0.8 \\times 1}\\)" },
      ],
      pyqExampleId: "2ae95733-7fd2-4499-ba7e-1f485bdd25f4", // 21 Jan 2026 S1: two joined strings, ratio of pulse times
      traps: [
        {
          title: "μ is mass per length, not density",
          body: "The string formula needs kg per metre of string. A density in kg/m³ must first be multiplied by the cross-section area to give μ.",
        },
        {
          title: "Grams per centimetre is not grams per metre",
          body: "1 g/cm is 100 g/m, which is 0.1 kg/m. Converting g/cm as if it were g/m makes μ a hundred times too small and the tension a hundred times too small.",
        },
      ],
    },

    // C2 — sound in solids and gases
    {
      kind: "formula" as const,
      slug: "jpwave-sound-speed",
      name: "Speed of sound in solids and gases",
      intuition:
        "Sound is a longitudinal wave, and its speed is √(elastic modulus ÷ density). In a rod the modulus is Young's modulus. In a gas the compressions are too fast for heat to flow, so the modulus is γP, and P/ρ = RT/M. The speed in a gas then depends only on temperature and on the gas, not on the pressure.",
      definition:
        "- Solid rod: \\(v = \\sqrt{\\dfrac{Y}{\\rho}}\\). Small changes: \\(\\dfrac{\\Delta v}{v} = \\dfrac{1}{2}\\dfrac{\\Delta Y}{Y} - \\dfrac{1}{2}\\dfrac{\\Delta\\rho}{\\rho}\\).\n" +
        "- Gas (Newton–Laplace): \\(v = \\sqrt{\\dfrac{\\gamma P}{\\rho}} = \\sqrt{\\dfrac{\\gamma RT}{M}}\\), with T in kelvin and M in kg/mol.\n" +
        "- \\(v \\propto \\sqrt{T}\\): compare temperatures in kelvin, never in °C.\n" +
        "- At the same temperature and the same γ, \\(v \\propto \\dfrac{1}{\\sqrt{M}}\\).\n" +
        "- \\(\\gamma = 1 + \\dfrac{2}{f}\\): monatomic 5/3; rigid diatomic 7/5; non-linear polyatomic (f = 6) 4/3.\n" +
        "- Changing the pressure at constant temperature changes P and ρ together: v does not change.\n" +
        "- Sound is fastest in solids because their elastic modulus is far larger; their higher density does not cancel it.",
      formula: {
        label: "Speed of sound",
        latex: "v = \\sqrt{\\frac{Y}{\\rho}} \\qquad v = \\sqrt{\\frac{\\gamma P}{\\rho}} = \\sqrt{\\frac{\\gamma RT}{M}} \\qquad \\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}}",
      },
      authoredExample: {
        prompt:
          "Find the speed of sound in nitrogen at 27 °C (\\(\\gamma = 1.4\\), \\(R = 8.3\\ \\text{J mol}^{-1}\\text{K}^{-1}\\), \\(M = 0.028\\ \\text{kg/mol}\\)). Then find it at 402 °C.",
        steps: [
          "27 °C = 300 K: \\(v = \\sqrt{\\dfrac{1.4 \\times 8.3 \\times 300}{0.028}} = \\sqrt{124500} \\approx 353\\ \\text{m/s}\\).",
          "402 °C = 675 K: \\(\\dfrac{v_2}{v_1} = \\sqrt{\\dfrac{675}{300}} = \\sqrt{2.25} = 1.5\\).",
          "\\(v_2 = 1.5 \\times 352.8 \\approx 529\\ \\text{m/s}\\).",
        ],
        answer: "About \\(353\\ \\text{m/s}\\), then about \\(529\\ \\text{m/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A rod has \\(Y = 2 \\times 10^{11}\\ \\text{N/m}^{2}\\) and density \\(8000\\ \\text{kg/m}^{3}\\). Find the speed of a longitudinal wave in it. If Y rises by 2% and the density by 1%, what is the new speed?",
        steps: [
          "\\(v = \\sqrt{\\dfrac{2 \\times 10^{11}}{8000}} = \\sqrt{2.5 \\times 10^{7}} = 5000\\ \\text{m/s}\\).",
          "\\(\\dfrac{\\Delta v}{v} = \\dfrac{1}{2}(2\\%) - \\dfrac{1}{2}(1\\%) = 0.5\\%\\), so v rises by 25 m/s.",
        ],
        answer: "\\(5000\\ \\text{m/s}\\), then about \\(5025\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "Two gases with the same γ have molar masses 64 and 16. Ratio of sound speeds at one temperature?", answer: "1 : 2" },
        { prompt: "γ of a monatomic ideal gas?", answer: "5/3" },
        { prompt: "The speed of sound in a gas rises by 10%. By what percentage did its absolute temperature rise?", answer: "About 21%", method: "\\(1.1^{2} = 1.21\\)" },
        { prompt: "The pressure of a gas is doubled at constant temperature. The speed of sound?", answer: "Unchanged" },
      ],
      pyqExampleId: "f54d66dc-322d-4485-a492-c2d1a82e0692", // 23 Jan 2026 S2: speed of sound doubled, find the new temperature
      traps: [
        {
          title: "Temperatures go in kelvin",
          body: "v ∝ √T only with absolute temperature. Doubling the speed from 27 °C means 4 × 300 K = 1200 K, which is 927 °C, not 4 × 27 °C.",
        },
        {
          title: "Pressure alone does not change the speed",
          body: "At a fixed temperature, P/ρ stays the same, so √(γP/ρ) does not move. Only temperature, γ and molar mass change the speed of sound in an ideal gas.",
        },
        {
          title: "Solids are faster because of the modulus",
          body: "A solid is denser than a gas, which alone would slow sound. Its elastic modulus is larger by a much bigger factor, so sound is faster in solids. Gases have the smaller modulus, not the larger.",
        },
      ],
    },
  ],
};
