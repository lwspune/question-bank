import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_SOLID_NOTE: SubtopicNote = {
  subtopicName: "Hooke's Law and Elastic Potential Energy",
  title: "Hooke's Law and Elastic Potential Energy",
  oneLineDefinition:
    "Within the elastic limit the tension is proportional to the extension, T = k(l − l₀), and a stretched wire stores energy ½FΔL, which is ½ × stress × strain in every cubic metre.",
  whyItMatters:
    "Thirteen PYQs, seven of them asking for a number, and one from 2026. Seven find a natural length, or a tension, from two loaded lengths, and six find the energy stored in a stretched wire. Both are short once the right relation is written; the slips are proportional to length instead of extension, and the half in ½FΔL.",
  concepts: [
    // C1 — natural length from two readings
    {
      kind: "formula" as const,
      slug: "jpsolid-natural-length",
      name: "Natural length from two loaded lengths",
      intuition:
        "Within the elastic limit the tension is proportional to the extension, not to the length: T = k(l − l₀). Two readings of length under two tensions are two equations in k and l₀. Subtracting them gives k; either one then gives l₀.",
      definition:
        "- \\(T = k(l - l_0)\\), so \\(l = l_0 + T/k\\).\n" +
        "- From \\((T_1, l_1)\\) and \\((T_2, l_2)\\): \\(k = \\dfrac{T_2 - T_1}{l_2 - l_1}\\) and \\(l_0 = \\dfrac{T_2l_1 - T_1l_2}{T_2 - T_1}\\).\n" +
        "- A length \\(pl_1 - ql_2\\) with \\(p - q = 1\\) goes with the tension \\(pT_1 - qT_2\\), because the \\(l_0\\) parts leave exactly one \\(l_0\\).\n" +
        "- For extensions there is no \\(l_0\\) to cancel: \\(px_1 - qx_2\\) goes with \\(pT_1 - qT_2\\) for any p and q.\n" +
        "- Masses hung on a wire: use their weights as the tensions; g cancels in \\(l_0\\).",
      formula: {
        label: "Natural length",
        latex: "T = k(l - l_0) \\qquad l_0 = \\frac{T_2l_1 - T_1l_2}{T_2 - T_1}",
      },
      authoredExample: {
        prompt:
          "A wire is 2.04 m long under a tension of 4 N and 2.10 m long under a tension of 10 N. Find its natural length.",
        steps: [
          "\\(k = \\dfrac{10 - 4}{2.10 - 2.04} = \\dfrac{6}{0.06} = 100\\ \\text{N/m}\\).",
          "\\(l_0 = 2.04 - \\dfrac{4}{100} = 2.00\\ \\text{m}\\).",
          "Check with the formula: \\(\\dfrac{10 \\times 2.04 - 4 \\times 2.10}{10 - 4} = \\dfrac{20.4 - 8.4}{6} = 2.00\\ \\text{m}\\).",
        ],
        answer: "2.00 m",
      },
      selfCheckExample: {
        prompt:
          "A spring is a long under a tension of 4 N and b long under 6 N. What tension makes it \\(2a - b\\) long?",
        steps: [
          "The coefficients 2 and −1 add to 1, so \\(2a - b = l_0 + \\dfrac{2(4) - 6}{k}\\).",
          "That is the length under a tension of \\(8 - 6 = 2\\ \\text{N}\\).",
        ],
        answer: "2 N",
      },
      practiceSet: [
        { prompt: "A spring is 10 cm long under 2 N and 12 cm long under 4 N. Natural length?", answer: "8 cm" },
        { prompt: "A wire is \\(L_1\\) long with 1 kg hung on it and \\(L_2\\) long with 3 kg. Natural length?", answer: "\\(\\dfrac{3L_1 - L_2}{2}\\)" },
        { prompt: "A spring extends by \\(x_1\\) under 4 N and \\(x_2\\) under 6 N. Tension for an extension \\(3x_1 - x_2\\)?", answer: "6 N" },
        { prompt: "A string is 1.5 m long under 3 N and 1.6 m long under 5 N. Natural length?", answer: "1.35 m", method: "\\(k = 2/0.1 = 20\\ \\text{N/m}\\); \\(1.5 - 3/20\\)." },
      ],
      pyqExampleId: "0f92fc64-17ae-4b56-8cf5-6ca0e2fdb2ef", // 4 Apr 2024: length a under 3 N, b under 2 N, tension for 3a − 2b
      traps: [
        {
          title: "Tension proportional to length",
          body: "T₁/T₂ = l₁/l₂ is wrong: the tension follows the extension l − l₀. Setting up T = k(l − l₀) for both readings avoids it.",
        },
        {
          title: "Swapping the pairs in the l₀ formula",
          body: "Check the formula by putting T₁ = 0: it must give l₀ = l₁. The other arrangement fails this test.",
        },
      ],
    },

    // C2 — elastic potential energy
    {
      kind: "formula" as const,
      slug: "jpsolid-elastic-energy",
      name: "Energy stored in a stretched wire",
      intuition:
        "Stretching a wire takes work, and the wire stores it as elastic energy. The force grows from zero to F as the wire stretches, so the work is the average force times the stretch, ½FΔL. Shared over the wire's volume, it is half the stress times the strain in each cubic metre.",
      definition:
        "- \\(U = \\tfrac{1}{2}F\\,\\Delta L = \\dfrac{YA\\,\\Delta L^{2}}{2L}\\).\n" +
        "- Energy per unit volume: \\(u = \\tfrac{1}{2}\\,\\text{stress} \\times \\text{strain} = \\tfrac{1}{2}Y\\varepsilon^{2} = \\dfrac{\\text{stress}^{2}}{2Y}\\); total \\(U = u \\times AL\\).\n" +
        "- Given Poisson's ratio and the lateral strain, the longitudinal strain is lateral strain ÷ σ; use that in u.\n" +
        "- From a stress–strain graph: Y is the slope, and u is the area under the line up to the strain asked.\n" +
        "- Stored energy handed to a mass becomes kinetic energy: \\(U = \\tfrac{1}{2}mv^{2}\\).",
      formula: {
        label: "Elastic energy",
        latex: "u = \\tfrac{1}{2}\\,(\\text{stress})(\\text{strain}) = \\tfrac{1}{2}Y\\varepsilon^{2} \\qquad U = \\tfrac{1}{2}F\\,\\Delta L",
      },
      authoredExample: {
        prompt:
          "A steel wire 2 m long with a cross-section of \\(1\\ \\text{mm}^{2}\\) \\((Y = 2 \\times 10^{11}\\ \\text{N/m}^{2})\\) is stretched by 1 mm. Find the energy stored.",
        steps: [
          "Strain \\(\\varepsilon = \\dfrac{10^{-3}}{2} = 5 \\times 10^{-4}\\).",
          "\\(u = \\tfrac{1}{2} \\times 2 \\times 10^{11} \\times (5 \\times 10^{-4})^{2} = 2.5 \\times 10^{4}\\ \\text{J/m}^{3}\\).",
          "Volume \\(= 10^{-6} \\times 2 = 2 \\times 10^{-6}\\ \\text{m}^{3}\\), so \\(U = 2.5 \\times 10^{4} \\times 2 \\times 10^{-6} = 0.05\\ \\text{J}\\).",
          "Check: \\(F = YA\\varepsilon = 100\\ \\text{N}\\) and \\(\\tfrac{1}{2} \\times 100 \\times 10^{-3} = 0.05\\ \\text{J}\\).",
        ],
        answer: "0.05 J",
      },
      selfCheckExample: {
        prompt:
          "A wire has Poisson's ratio 0.25 and its lateral strain is \\(5 \\times 10^{-4}\\). \\(Y = 1 \\times 10^{11}\\ \\text{N/m}^{2}\\). Find the elastic energy per unit volume.",
        steps: [
          "Longitudinal strain \\(= \\dfrac{5 \\times 10^{-4}}{0.25} = 2 \\times 10^{-3}\\).",
          "\\(u = \\tfrac{1}{2} \\times 10^{11} \\times (2 \\times 10^{-3})^{2} = 2 \\times 10^{5}\\ \\text{J/m}^{3}\\).",
        ],
        answer: "\\(2 \\times 10^{5}\\ \\text{J/m}^{3}\\)",
      },
      practiceSet: [
        { prompt: "Strain 0.1%, \\(Y = 10^{11}\\ \\text{N/m}^{2}\\). Energy per unit volume?", answer: "\\(5 \\times 10^{4}\\ \\text{J/m}^{3}\\)" },
        { prompt: "Stress \\(2 \\times 10^{8}\\ \\text{N/m}^{2}\\), \\(Y = 2 \\times 10^{11}\\ \\text{N/m}^{2}\\). Energy per unit volume?", answer: "\\(10^{5}\\ \\text{J/m}^{3}\\)", method: "\\(\\text{stress}^{2}/(2Y)\\)." },
        { prompt: "0.2 J of stored elastic energy is given to a 100 g ball. Its speed?", answer: "\\(2\\ \\text{m/s}\\)" },
        { prompt: "A wire 10 m long \\((Y = 2 \\times 10^{11}\\ \\text{N/m}^{2})\\) stretched by 1 cm stores 50 J. Its area?", answer: "\\(50\\ \\text{mm}^{2}\\)", method: "\\(A = 2UL/(Y\\Delta L^{2})\\)." },
      ],
      pyqExampleId: "2893367b-c010-493a-b819-568b7b4fabff", // 5 Apr 2026 Shift 2: copper wire of volume 600 cm³ stretched 3 mm
      traps: [
        {
          title: "The load's work is not the energy stored",
          body: "A load that stretches a wire by ΔL loses mgΔL of potential energy, but the wire stores only ½mgΔL. The other half leaves as heat or oscillation.",
        },
        {
          title: "Using the lateral strain as the strain",
          body: "u = ½Yε² needs the lengthwise strain. When the question gives the sideways strain, divide it by Poisson's ratio first.",
        },
      ],
    },
  ],
};
