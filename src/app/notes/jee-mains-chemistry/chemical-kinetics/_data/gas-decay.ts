import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_GAS_DECAY_NOTE: SubtopicNote = {
  subtopicName: "First Order in Gases and Radioactive Decay",
  title: "First Order in Gases and Radioactive Decay",
  oneLineDefinition:
    "The first-order law applied twice more: to a gas decomposing in a closed vessel, where the pressure of the reactant is worked out from the total pressure, and to radioactive decay and bacterial growth.",
  whyItMatters:
    "Eighteen PYQs, eight of them multiple choice, and four from 2026. Ten follow a gas decomposition through its total pressure — for the rate constant, a later pressure, or the formula for k itself; eight are radioactive decay, carbon dating or bacterial growth, all first order. Two ideas cover the page.",
  concepts: [
    // C1 — gas-phase first order from total pressure
    {
      kind: "formula" as const,
      slug: "jckin-gas-pressure",
      name: "Rate constant of a gas reaction from the total pressure",
      intuition:
        "In a closed vessel at fixed temperature, pressure is proportional to moles, so partial pressures behave like concentrations. The gauge reads only the TOTAL pressure. Let \\(x\\) be the pressure of reactant used, write every partial pressure in terms of \\(x\\), and solve for \\(x\\) from the total. The first-order law needs the reactant's pressure alone.",
      definition:
        "- \\(A(g) \\rightarrow B(g) + C(g)\\): \\(P_t = p_i + x\\), so \\(p_A = 2p_i - P_t\\) and \\(k = \\dfrac{1}{t}\\ln\\dfrac{p_i}{2p_i - P_t}\\).\n" +
        "- The same reaction with \\(P_\\infty\\) given: \\(P_\\infty = 2p_i\\), \\(p_A = P_\\infty - P_t\\), so \\(k = \\dfrac{1}{t}\\ln\\dfrac{P_\\infty}{2(P_\\infty - P_t)}\\).\n" +
        "- \\(A(g) \\rightarrow 2B(g) + C(g)\\): \\(P_t = p_i + 2x\\) and \\(P_\\infty = 3p_i\\).\n" +
        "- \\(2A(g) \\rightarrow 4B(g) + C(g)\\): with \\(x\\) the pressure of \\(C\\), \\(p_A = p_i - 2x\\) and \\(P_t = p_i + 3x\\).\n" +
        "- Rule: find the change in gas moles per unit of \\(A\\) used, then \\(P_t = p_i + (\\text{that change}) \\times x\\).",
      formula: {
        label: "A(g) → B(g) + C(g)",
        latex: "k = \\frac{2.303}{t}\\log\\frac{p_i}{2p_i - P_t}",
      },
      authoredExample: {
        prompt:
          "The first-order reaction \\(A(g) \\rightarrow 2B(g) + C(g)\\) starts with pure \\(A\\) at 0.30 atm. After 20 min the total pressure is 0.66 atm. Find \\(k\\). (\\(\\log 2.5 = 0.398\\))",
        steps: [
          "\\(P_t = 0.30 + 2x = 0.66\\), so \\(x = 0.18\\) atm and \\(p_A = 0.30 - 0.18 = 0.12\\) atm.",
          "\\(k = \\dfrac{2.303}{20}\\log\\dfrac{0.30}{0.12} = 0.1152 \\times 0.398 = 0.0458\\) min\\(^{-1}\\).",
        ],
        answer: "\\(k \\approx 4.58 \\times 10^{-2}\\) min\\(^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "The first-order reaction \\(A(g) \\rightarrow B(g) + C(g)\\) starts with pure \\(A\\). The total pressure is 250 mm Hg after 10 min and 300 mm Hg after a very long time. Find \\(k\\). (\\(\\log 3 = 0.477\\))",
        steps: [
          "\\(P_\\infty = 2p_i = 300\\), so \\(p_i = 150\\) mm Hg.",
          "\\(p_A = P_\\infty - P_t = 300 - 250 = 50\\) mm Hg.",
          "\\(k = \\dfrac{2.303}{10}\\log\\dfrac{150}{50} = 0.2303 \\times 0.477 = 0.110\\) min\\(^{-1}\\).",
        ],
        answer: "\\(k \\approx 0.11\\) min\\(^{-1}\\).",
      },
      practiceSet: [
        { prompt: "For \\(A(g) \\rightarrow B(g) + C(g)\\), \\(p_i = 0.5\\) atm and \\(P_t = 0.8\\) atm. Pressure of \\(A\\)?", answer: "\\(0.2\\) atm" },
        { prompt: "For \\(A(g) \\rightarrow 2B(g) + C(g)\\) from pure \\(A\\), \\(P_\\infty = 180\\) mm Hg. Initial pressure of \\(A\\)?", answer: "\\(60\\) mm Hg" },
        { prompt: "For \\(2A(g) \\rightarrow 4B(g) + C(g)\\), the total pressure rises by 30 mm Hg. Pressure of \\(C\\) formed?", answer: "\\(10\\) mm Hg" },
        { prompt: "For \\(A(g) \\rightarrow B(g) + C(g)\\) from 1 bar of \\(A\\), total pressure when half the \\(A\\) is gone?", answer: "\\(1.5\\) bar" },
      ],
      pyqExampleId: "a8c79b4d-1dd5-4c44-bbec-b85696473ae9", // 2026 — derive k for A → B + C from p_i and p_t
      traps: [
        {
          title: "The total pressure put into the log",
          body:
            "\\(\\ln\\dfrac{p_i}{P_t}\\) is wrong: the first-order law needs the pressure of \\(A\\) alone. For \\(A(g) \\rightarrow B(g) + C(g)\\) that is \\(2p_i - P_t\\).",
        },
        {
          title: "P∞ taken as the initial pressure",
          body:
            "At the end every \\(A\\) has turned into products. For \\(A \\rightarrow B + C\\), \\(P_\\infty = 2p_i\\); for \\(A \\rightarrow 2B + C\\), \\(P_\\infty = 3p_i\\). Divide before using it as \\(p_i\\).",
        },
      ],
    },

    // C2 — radioactive decay and growth
    {
      kind: "formula" as const,
      slug: "jckin-decay-growth",
      name: "Radioactive decay, carbon dating and bacterial growth",
      intuition:
        "Each nucleus has the same chance of decaying in the next second, whatever the others do. So the number decaying per second is proportional to the number present: first order. Bacterial growth is the same law with the sign flipped — each cell divides, so the growth rate is proportional to the number of cells.",
      definition:
        "- \\(N = N_0e^{-\\lambda t}\\), \\(\\dfrac{N}{N_0} = \\left(\\tfrac12\\right)^{t/t_{1/2}}\\), \\(\\lambda = \\dfrac{0.693}{t_{1/2}}\\).\n" +
        "- The decay constant is fixed by the nucleus. It does NOT change with temperature or pressure.\n" +
        "- Activity is proportional to \\(N\\), so a percentage of activity left is the percentage of nuclei left.\n" +
        "- **Carbon dating**: the \\(^{14}\\)C/\\(^{12}\\)C ratio as a fraction of the living value; \\(\\tfrac18\\) left means 3 half-lives.\n" +
        "- A time that is not a whole number of half-lives: \\(\\log\\dfrac{N_0}{N} = \\dfrac{0.301\\,t}{t_{1/2}}\\), then take the antilog.\n" +
        "- **Bacterial growth**: \\(\\dfrac{dN}{dt} = kN\\), so \\(N = N_0e^{kt}\\); \\(N/N_0\\) starts at 1 and rises exponentially. A decay rate proportional to \\(N^2\\) makes the rate against \\(N\\) an upward parabola.",
      formula: {
        label: "Radioactive decay",
        latex: "\\frac{N}{N_0} = e^{-\\lambda t} = \\left(\\tfrac12\\right)^{t/t_{1/2}},\\qquad \\lambda = \\frac{0.693}{t_{1/2}}",
      },
      authoredExample: {
        prompt:
          "An isotope has a half-life of 25 days. What percentage of a sample is left after 10 days? (\\(\\log 2 = 0.301\\), antilog \\(0.1204 = 1.319\\))",
        steps: [
          "\\(\\log\\dfrac{N_0}{N} = \\dfrac{0.301 \\times 10}{25} = 0.1204\\).",
          "\\(\\dfrac{N_0}{N} = 1.319\\), so \\(\\dfrac{N}{N_0} = \\dfrac{1}{1.319} = 0.758\\).",
        ],
        answer: "About \\(75.8\\%\\).",
      },
      selfCheckExample: {
        prompt:
          "A piece of wood has a \\(^{14}\\)C activity one-sixteenth that of living wood. The half-life of \\(^{14}\\)C is 5730 years. How old is it?",
        steps: [
          "\\(\\tfrac{1}{16} = \\left(\\tfrac12\\right)^4\\): four half-lives.",
          "Age \\(= 4 \\times 5730 = 22920\\) years.",
        ],
        answer: "\\(22920\\) years.",
      },
      practiceSet: [
        { prompt: "Fraction of a radioactive sample left after 3 half-lives?", answer: "\\(\\tfrac18\\)" },
        { prompt: "Does heating a radioactive sample change its decay constant?", answer: "No" },
        { prompt: "A radioisotope has \\(t_{1/2} = 69.3\\) min. Decay constant?", answer: "\\(0.01\\) min\\(^{-1}\\)" },
        { prompt: "A culture grows by first order with \\(k = 0.693\\) h\\(^{-1}\\). Value of \\(N/N_0\\) after 3 h?", answer: "\\(8\\)" },
      ],
      pyqExampleId: "73c53a04-6df2-43dc-9687-4d1457bb8048", // 2026 — Zn-65, days for 75% of the activity to remain
      traps: [
        {
          title: "Decay constant rising with temperature",
          body:
            "Heating speeds up chemical reactions, not radioactive decay. The decay constant is a property of the nucleus and stays the same at any temperature.",
        },
        {
          title: "Growth drawn as decay",
          body:
            "For bacterial growth \\(N = N_0e^{kt}\\): the plot of \\(N/N_0\\) against \\(t\\) starts at 1 and curves UPWARD. A falling curve is decay.",
        },
      ],
    },
  ],
};
