import type { SubtopicNote } from "@/app/notes/_types";

export const PH_EQ_NOTE: SubtopicNote = {
  subtopicName: "pH of Acids and Bases",
  title: "pH of Acids and Bases",
  oneLineDefinition:
    "Finding pH for strong acids and bases, their mixtures and dilutions, and for weak acids and bases from Ka or Kb, including acids that give up two protons.",
  whyItMatters:
    "Twenty PYQs, half of them numerical, and five from 2026. Thirteen deal with strong acids and bases, their mixtures and their dilution; seven use Ka or Kb of a weak acid or base, including acids that lose two protons.",
  concepts: [
    // C1 — strong acids and bases
    {
      kind: "formula" as const,
      slug: "jceq-strong-ph",
      name: "Strong acids, bases and their mixtures",
      intuition:
        "A strong acid or base ionises completely, so \\([\\mathrm{H^+}]\\) or \\([\\mathrm{OH^-}]\\) comes straight from the concentration and the number of H or OH per formula. In a mixture, \\(\\mathrm{H^+}\\) and \\(\\mathrm{OH^-}\\) cancel mole for mole. Whatever is left over, divided by the total volume, sets the pH.",
      definition:
        "- \\(\\mathrm{pH}=-\\log[\\mathrm{H^+}]\\), \\(\\mathrm{pOH}=-\\log[\\mathrm{OH^-}]\\), \\(\\mathrm{pH+pOH}=14\\) at 25 °C.\n" +
        "- Count per formula: \\(\\mathrm{H_2SO_4}\\) gives 2 \\(\\mathrm{H^+}\\); \\(\\mathrm{Ca(OH)_2}\\) and \\(\\mathrm{Ba(OH)_2}\\) give 2 \\(\\mathrm{OH^-}\\).\n" +
        "- Mixture: millimoles of \\(\\mathrm{H^+}\\) minus millimoles of \\(\\mathrm{OH^-}\\), divided by the **total** volume.\n" +
        "- Diluting a strong acid n times raises its pH by \\(\\log n\\). A change of \\([\\mathrm{H^+}]\\) by a factor of 1000 moves the pH by 3.\n" +
        "- A very dilute acid never crosses 7: for \\(10^{-8}\\) M HCl, water's own \\(10^{-7}\\) M dominates and the pH is about 6.98.\n" +
        "- \\(K_w\\) rises with temperature, so hot pure water has pH below 7 but is still neutral, with \\([\\mathrm{H^+}]=[\\mathrm{OH^-}]\\).",
      formula: {
        label: "pH of a strong acid-base mixture",
        latex: "\\mathrm{pH}=-\\log\\frac{n_{\\mathrm{H^+}}-n_{\\mathrm{OH^-}}}{V_{\\text{total}}}",
      },
      authoredExample: {
        prompt:
          "40 mL of 0.1 M \\(\\mathrm{H_2SO_4}\\) is mixed with 60 mL of 0.1 M NaOH. Find the pH. (\\(\\log2=0.30\\))",
        steps: [
          "\\(\\mathrm{H^+}\\): \\(40\\times0.1\\times2=8\\) mmol. \\(\\mathrm{OH^-}\\): \\(60\\times0.1=6\\) mmol.",
          "Excess \\(\\mathrm{H^+}\\): 2 mmol in 100 mL, so \\([\\mathrm{H^+}]=0.02\\) M.",
          "\\(\\mathrm{pH}=-\\log(2\\times10^{-2})=2-0.30=1.70\\).",
        ],
        answer: "\\(\\mathrm{pH}=1.70\\).",
      },
      selfCheckExample: {
        prompt: "25 mL of 0.2 M NaOH is mixed with 25 mL of 0.1 M HCl. Find the pH. (\\(\\log5=0.70\\))",
        steps: [
          "\\(\\mathrm{OH^-}\\): 5 mmol. \\(\\mathrm{H^+}\\): 2.5 mmol. Excess \\(\\mathrm{OH^-}\\): 2.5 mmol in 50 mL.",
          "\\([\\mathrm{OH^-}]=0.05\\) M, so \\(\\mathrm{pOH}=2-0.70=1.30\\).",
          "\\(\\mathrm{pH}=14-1.30=12.70\\).",
        ],
        answer: "\\(\\mathrm{pH}=12.70\\).",
      },
      practiceSet: [
        { prompt: "pH of 0.001 M HCl?", answer: "\\(3\\)" },
        { prompt: "pH of 0.005 M \\(\\mathrm{H_2SO_4}\\)?", answer: "\\(2\\)" },
        { prompt: "A strong acid of pH 3 is diluted 100 times. New pH?", answer: "\\(5\\)" },
        { prompt: "pH of \\(10^{-8}\\) M HCl, roughly?", answer: "About 6.98, just below 7" },
      ],
      pyqExampleId: "ebd74feb-708c-489e-87fe-50dc42fe02bb", // 2022 — HCl and dibasic H2SO4 mixed; pH 1.78
      traps: [
        {
          title: "Sulphuric acid counts twice",
          body:
            "0.01 M \\(\\mathrm{H_2SO_4}\\) gives 0.02 M \\(\\mathrm{H^+}\\), and 0.01 M \\(\\mathrm{Ca(OH)_2}\\) gives 0.02 M \\(\\mathrm{OH^-}\\). Forgetting the 2 is the most common wrong option in mixture questions.",
        },
        {
          title: "Dilution does not cross 7",
          body:
            "Diluting HCl to \\(10^{-8}\\) M does not give pH 8. An acid stays acidic; water's \\(10^{-7}\\) M of \\(\\mathrm{H^+}\\) must be added in.",
        },
        {
          title: "Hot water is neutral at pH below 7",
          body:
            "Heating raises \\(K_w\\), so both \\([\\mathrm{H^+}]\\) and \\([\\mathrm{OH^-}]\\) rise together. The pH falls, but the water is still neutral. \"\\(\\mathrm{H^+}\\) rises and \\(\\mathrm{OH^-}\\) falls\" is wrong.",
        },
      ],
    },

    // C2 — weak acids and bases
    {
      kind: "formula" as const,
      slug: "jceq-weak-ph",
      name: "Weak acids and bases from Ka and Kb",
      intuition:
        "A weak acid ionises only a little, so its concentration hardly changes. Then \\(K_a\\approx C\\alpha^2\\), and \\([\\mathrm{H^+}]=C\\alpha=\\sqrt{K_aC}\\). A weak base works the same way with \\(K_b\\) and \\(\\mathrm{OH^-}\\). An acid with two protons gives up the first far more easily, so the first step sets the pH.",
      definition:
        "- Weak acid HA at concentration C: \\(K_a=\\frac{C\\alpha^2}{1-\\alpha}\\approx C\\alpha^2\\), so \\(\\alpha=\\sqrt{K_a/C}\\).\n" +
        "- \\([\\mathrm{H^+}]=\\sqrt{K_aC}\\), \\(\\mathrm{pH}=\\tfrac12(\\mathrm{p}K_a-\\log C)\\).\n" +
        "- Weak base: \\([\\mathrm{OH^-}]=\\sqrt{K_bC}\\), \\(\\mathrm{pOH}=\\tfrac12(\\mathrm{p}K_b-\\log C)\\).\n" +
        "- Diprotic acid \\(\\mathrm{H_2X}\\): \\(K_{a1}\\) sets \\([\\mathrm{H^+}]\\), and \\([\\mathrm{X^{2-}}]\\approx K_{a2}\\), whatever C is.\n" +
        "- In a strong acid, the extra \\(\\mathrm{H^+}\\) suppresses ionisation: \\([\\mathrm{HA^-}]=\\frac{K_{a1}[\\mathrm{H_2A}]}{[\\mathrm{H^+}]}\\).\n" +
        "- The overall step \\(\\mathrm{H_2A\\rightleftharpoons 2H^++A^{2-}}\\) has \\(K=K_{a1}K_{a2}\\).",
      formula: {
        label: "Weak acid",
        latex: "[\\mathrm{H^+}]=\\sqrt{K_aC},\\qquad \\mathrm{pH}=\\tfrac12\\left(\\mathrm{p}K_a-\\log C\\right)",
      },
      authoredExample: {
        prompt:
          "Find the pH and the degree of ionisation of a 0.04 M weak acid with \\(K_a=1.0\\times10^{-6}\\). (\\(\\log2=0.30\\))",
        steps: [
          "\\([\\mathrm{H^+}]=\\sqrt{1.0\\times10^{-6}\\times0.04}=\\sqrt{4\\times10^{-8}}=2\\times10^{-4}\\) M.",
          "\\(\\mathrm{pH}=4-0.30=3.70\\).",
          "\\(\\alpha=\\frac{2\\times10^{-4}}{0.04}=5\\times10^{-3}\\), small, so the approximation holds.",
        ],
        answer: "\\(\\mathrm{pH}=3.70\\), \\(\\alpha=0.005\\).",
      },
      selfCheckExample: {
        prompt: "Find the pH of a 0.025 M weak base with \\(K_b=4\\times10^{-5}\\).",
        steps: [
          "\\([\\mathrm{OH^-}]=\\sqrt{4\\times10^{-5}\\times0.025}=\\sqrt{10^{-6}}=10^{-3}\\) M.",
          "\\(\\mathrm{pOH}=3\\), so \\(\\mathrm{pH}=11\\).",
        ],
        answer: "\\(\\mathrm{pH}=11\\).",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{p}K_a=5\\), C = 0.1 M. pH?", answer: "\\(3\\)" },
        { prompt: "α of a 0.01 M acid with \\(K_a=10^{-6}\\)?", answer: "\\(10^{-2}\\)" },
        { prompt: "\\(\\mathrm{H_2X}\\) has \\(K_{a2}=10^{-12}\\). \\([\\mathrm{X^{2-}}]\\) in its solution?", answer: "About \\(10^{-12}\\) M" },
        { prompt: "\\(K_{a1}=10^{-4}\\), \\(K_{a2}=10^{-9}\\). K for \\(\\mathrm{H_2A\\rightleftharpoons 2H^++A^{2-}}\\)?", answer: "\\(10^{-13}\\)" },
      ],
      pyqExampleId: "cce3609b-c793-42e9-9d11-0a08d9aa4822", // 2026 — pKa 4, 10 mM weak acid; pH 3
      traps: [
        {
          title: "Take the square root",
          body:
            "\\([\\mathrm{H^+}]\\) is \\(\\sqrt{K_aC}\\), not \\(K_aC\\), and pH is half of \\(\\mathrm{p}K_a-\\log C\\). Forgetting the half gives a pH twice too large.",
        },
        {
          title: "In strong acid, divide by the strong acid's \\(\\mathrm{H^+}\\)",
          body:
            "A weak acid dissolved in 0.1 M HCl barely ionises. With \\([\\mathrm{H_2A}]=[\\mathrm{H^+}]=0.1\\) M, \\([\\mathrm{HA^-}]=K_{a1}\\). The option 0.1 M treats the weak acid as fully ionised.",
        },
      ],
    },
  ],
};
