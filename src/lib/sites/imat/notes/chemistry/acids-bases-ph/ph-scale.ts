import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_PH_SCALE_NOTE: SubtopicNote = {
  subtopicName: "Water, pH and pOH",
  title: "The Water Equilibrium and the pH Scale",
  oneLineDefinition:
    "Water always holds a tiny, fixed product of H⁺ and OH⁻ ions; pH and pOH turn those very small concentrations into simple numbers on a scale of tens.",
  whyItMatters:
    "Every pH calculation in the chapter rests on this page. The older papers asked for the pH of a given hydrogen ion concentration, used Kw to turn a hydroxide concentration into a pH, and compared the hydrogen ion concentrations of two acids whose pH values differ by two.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-abp-kw",
      name: "The ionic product of water, Kw",
      intuition:
        "Even pure water is not just molecules. A very small fraction of molecules pass a proton to a neighbour, making one \\(\\mathrm{H_3O^+}\\) and one \\(\\mathrm{OH^-}\\). The product of the two concentrations is fixed at a given temperature, so if one goes up, the other must go down. Adding acid does not remove the hydroxide ions; it only makes them rarer.",
      definition:
        "- Water ionises: \\(\\mathrm{2H_2O \\rightleftharpoons H_3O^+ + OH^-}\\), often written \\(\\mathrm{H_2O \\rightleftharpoons H^+ + OH^-}\\).\n" +
        "- **Kw**, the **ionic product of water**, is \\([\\mathrm{H^+}][\\mathrm{OH^-}] = 1.0 \\times 10^{-14}\\ \\text{mol}^2\\,\\text{L}^{-2}\\) at 25 °C, in pure water and in every aqueous solution.\n" +
        "- **Neutral** means \\([\\mathrm{H^+}] = [\\mathrm{OH^-}]\\). At 25 °C both are \\(1.0 \\times 10^{-7}\\ \\text{mol/L}\\).\n" +
        "- **Acidic** means \\([\\mathrm{H^+}] > [\\mathrm{OH^-}]\\); **basic** (alkaline) means \\([\\mathrm{OH^-}] > [\\mathrm{H^+}]\\).\n" +
        "- The ionisation is endothermic, so **Kw grows with temperature**. At 50 °C Kw is about \\(5.5 \\times 10^{-14}\\), so neutral water there has a pH of about 6.6, and it is still neutral.",
      formula: {
        label: "Ionic product of water at 25 °C",
        latex: "K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 1.0 \\times 10^{-14}",
        symbols: [
          { symbol: "\\([\\mathrm{H^+}]\\)", meaning: "hydrogen ion concentration, in mol/L" },
          { symbol: "\\([\\mathrm{OH^-}]\\)", meaning: "hydroxide ion concentration, in mol/L" },
        ],
      },
      authoredExample: {
        prompt:
          "A cleaning solution at 25 °C has \\([\\mathrm{OH^-}] = 2.0 \\times 10^{-3}\\ \\text{mol/L}\\). Find \\([\\mathrm{H^+}]\\) and say whether the solution is acidic or basic.",
        steps: [
          "Rearrange Kw: \\([\\mathrm{H^+}] = K_w / [\\mathrm{OH^-}]\\).",
          "\\([\\mathrm{H^+}] = (1.0 \\times 10^{-14}) / (2.0 \\times 10^{-3}) = 5.0 \\times 10^{-12}\\ \\text{mol/L}\\).",
          "\\([\\mathrm{OH^-}]\\) is far larger than \\([\\mathrm{H^+}]\\), so the solution is basic.",
        ],
        answer: "\\([\\mathrm{H^+}] = 5.0 \\times 10^{-12}\\ \\text{mol/L}\\); basic",
      },
      selfCheckExample: {
        prompt:
          "A sample of rainwater at 25 °C has \\([\\mathrm{H^+}] = 4.0 \\times 10^{-9}\\ \\text{mol/L}\\). What is its hydroxide ion concentration?",
        options: [
          "\\(4.0 \\times 10^{-23}\\ \\text{mol/L}\\)",
          "\\(4.0 \\times 10^{-5}\\ \\text{mol/L}\\)",
          "\\(2.5 \\times 10^{-6}\\ \\text{mol/L}\\)",
          "\\(2.5 \\times 10^{-5}\\ \\text{mol/L}\\)",
          "\\(1.0 \\times 10^{-7}\\ \\text{mol/L}\\)",
        ],
        steps: [
          "\\([\\mathrm{OH^-}] = K_w / [\\mathrm{H^+}] = (1.0 \\times 10^{-14}) / (4.0 \\times 10^{-9})\\).",
          "\\(1/4.0 = 0.25\\) and \\(10^{-14}/10^{-9} = 10^{-5}\\), so \\(0.25 \\times 10^{-5} = 2.5 \\times 10^{-6}\\ \\text{mol/L}\\).",
          "A multiplies instead of dividing. B subtracts the exponents and keeps the 4.0. D forgets that 0.25 needs one more power of ten. E assumes the sample is neutral.",
        ],
        answer: "(C) \\(2.5 \\times 10^{-6}\\ \\text{mol/L}\\)",
      },
      practiceSet: [
        { prompt: "At 25 °C a solution has \\([\\mathrm{H^+}] = 1.0 \\times 10^{-3}\\ \\text{mol/L}\\). What is \\([\\mathrm{OH^-}]\\)?", answer: "\\(1.0 \\times 10^{-11}\\ \\text{mol/L}\\)", method: "\\(10^{-14}/10^{-3}\\)" },
        { prompt: "What is \\([\\mathrm{H^+}]\\) in pure water at 25 °C?", answer: "\\(1.0 \\times 10^{-7}\\ \\text{mol/L}\\)", method: "\\(\\sqrt{K_w}\\)" },
        { prompt: "Pure water is heated to 60 °C and its pH falls below 7. Is it now acidic?", answer: "No, it is still neutral", method: "\\([\\mathrm{H^+}]\\) and \\([\\mathrm{OH^-}]\\) both rose and are still equal" },
      ],
      traps: [
        {
          title: "pH below 7 does not always mean acidic",
          body: "The neutral point is pH 7 only at 25 °C. Kw increases with temperature, so hot pure water has a pH below 7 but is still neutral, because \\([\\mathrm{H^+}] = [\\mathrm{OH^-}]\\). Neutral is defined by equal concentrations, not by the number 7.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-ph",
      name: "pH as a logarithmic scale of hydrogen ion concentration",
      intuition:
        "Hydrogen ion concentrations run from about 1 mol/L down to \\(10^{-14}\\) mol/L: awkward numbers. pH keeps only the power of ten and drops the minus sign. So each step of one pH unit is a factor of ten in \\([\\mathrm{H^+}]\\), and a lower pH means more hydrogen ions.",
      definition:
        "- **pH** \\(= -\\log_{10}[\\mathrm{H^+}]\\), so \\([\\mathrm{H^+}] = 10^{-\\text{pH}}\\).\n" +
        "- At 25 °C: pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic.\n" +
        "- A difference of \\(n\\) pH units is a factor of \\(10^n\\) in \\([\\mathrm{H^+}]\\). pH 3 has 100 times the \\([\\mathrm{H^+}]\\) of pH 5.\n" +
        "- No calculator in IMAT: learn \\(\\log 2 \\approx 0.30\\), \\(\\log 3 \\approx 0.48\\), \\(\\log 5 \\approx 0.70\\). Then \\(-\\log(2 \\times 10^{-4}) = 4 - 0.30 = 3.70\\).\n" +
        "- pH can be below 0 (very concentrated strong acid) or above 14, though IMAT rarely goes there.",
      formula: {
        label: "pH",
        latex: "\\text{pH} = -\\log_{10}[\\mathrm{H^+}] \\qquad [\\mathrm{H^+}] = 10^{-\\text{pH}}",
        symbols: [
          { symbol: "\\([\\mathrm{H^+}]\\)", meaning: "hydrogen ion concentration, in mol/L" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the pH of a solution with \\([\\mathrm{H^+}] = 5.0 \\times 10^{-4}\\ \\text{mol/L}\\), and the \\([\\mathrm{H^+}]\\) of a solution of pH 9.",
        steps: [
          "\\(\\text{pH} = -\\log(5.0 \\times 10^{-4}) = -(\\log 5.0 + \\log 10^{-4}) = -(0.70 - 4) = 3.30\\).",
          "Check: \\(5.0 \\times 10^{-4}\\) lies between \\(10^{-4}\\) (pH 4) and \\(10^{-3}\\) (pH 3), so a pH between 3 and 4 is right.",
          "For pH 9: \\([\\mathrm{H^+}] = 10^{-9}\\ \\text{mol/L}\\).",
        ],
        answer: "pH 3.30; \\([\\mathrm{H^+}] = 1.0 \\times 10^{-9}\\ \\text{mol/L}\\)",
      },
      selfCheckExample: {
        prompt:
          "Solution P has a pH of 5 and solution Q has a pH of 2. Which statement about their hydrogen ion concentrations is correct?",
        options: [
          "Q has 3 times the hydrogen ion concentration of P",
          "P has 1000 times the hydrogen ion concentration of Q",
          "Q has 2.5 times the hydrogen ion concentration of P",
          "Q has 1000 times the hydrogen ion concentration of P",
          "Q has 100 times the hydrogen ion concentration of P",
        ],
        steps: [
          "The pH values differ by 3, so the concentrations differ by \\(10^3 = 1000\\).",
          "The lower pH (Q) has the higher \\([\\mathrm{H^+}]\\): \\(10^{-2}\\) against \\(10^{-5}\\).",
          "A and C treat pH as a linear scale. B has the direction reversed. E uses one power of ten too few.",
        ],
        answer: "(D) Q has 1000 times the hydrogen ion concentration of P",
      },
      practiceSet: [
        { prompt: "What is the pH when \\([\\mathrm{H^+}] = 1.0 \\times 10^{-5}\\ \\text{mol/L}\\)?", answer: "5", method: "\\(-\\log 10^{-5}\\)" },
        { prompt: "What is the pH when \\([\\mathrm{H^+}] = 2.0 \\times 10^{-3}\\ \\text{mol/L}\\)?", answer: "2.70", method: "\\(3 - \\log 2 = 3 - 0.30\\)" },
        { prompt: "A solution changes from pH 6 to pH 4. By what factor has \\([\\mathrm{H^+}]\\) changed?", answer: "It is 100 times larger", method: "Two pH units, \\(10^2\\)" },
      ],
      traps: [
        {
          title: "pH is a scale of tens, and lower means more acid",
          body: "pH 2 is not twice as acidic as pH 4: it has 100 times the hydrogen ion concentration. And because of the minus sign, the solution with the smaller pH number has the larger \\([\\mathrm{H^+}]\\). IMAT options often offer the ratio of the pH values or the reversed direction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-poh",
      name: "pOH and the rule pH + pOH = 14",
      intuition:
        "pOH does for hydroxide ions what pH does for hydrogen ions. Taking the log of Kw turns the product into a sum, so the two numbers always add up to 14 at 25 °C. For a base it is easier to find pOH first and then subtract from 14.",
      definition:
        "- **pOH** \\(= -\\log_{10}[\\mathrm{OH^-}]\\).\n" +
        "- At 25 °C, \\(\\text{pH} + \\text{pOH} = 14\\) (this is \\(-\\log K_w\\), sometimes written \\(\\text{p}K_w\\)).\n" +
        "- A high pOH means few hydroxide ions, so a low pOH goes with a high pH.",
      formula: {
        label: "pOH and pH at 25 °C",
        latex: "\\text{pOH} = -\\log_{10}[\\mathrm{OH^-}] \\qquad \\text{pH} + \\text{pOH} = 14",
        symbols: [
          { symbol: "\\([\\mathrm{OH^-}]\\)", meaning: "hydroxide ion concentration, in mol/L" },
        ],
      },
      authoredExample: {
        prompt: "A solution at 25 °C has \\([\\mathrm{OH^-}] = 1.0 \\times 10^{-4}\\ \\text{mol/L}\\). Find its pOH, its pH and its \\([\\mathrm{H^+}]\\).",
        steps: [
          "\\(\\text{pOH} = -\\log 10^{-4} = 4\\).",
          "\\(\\text{pH} = 14 - 4 = 10\\).",
          "\\([\\mathrm{H^+}] = 10^{-10}\\ \\text{mol/L}\\), which agrees with \\(K_w / 10^{-4}\\).",
        ],
        answer: "pOH 4, pH 10, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-10}\\ \\text{mol/L}\\)",
      },
      selfCheckExample: {
        prompt: "A solution at 25 °C has a pOH of 3.0. What are its pH and its hydrogen ion concentration?",
        options: [
          "pH 11, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-11}\\ \\text{mol/L}\\)",
          "pH 3, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-3}\\ \\text{mol/L}\\)",
          "pH 11, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-3}\\ \\text{mol/L}\\)",
          "pH 7, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-7}\\ \\text{mol/L}\\)",
          "pH 17, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-17}\\ \\text{mol/L}\\)",
        ],
        steps: [
          "\\(\\text{pH} = 14 - 3.0 = 11\\), so \\([\\mathrm{H^+}] = 10^{-11}\\ \\text{mol/L}\\).",
          "B reads pOH as pH. C has the right pH but gives \\([\\mathrm{OH^-}]\\) instead of \\([\\mathrm{H^+}]\\). E adds instead of subtracting.",
        ],
        answer: "(A) pH 11, \\([\\mathrm{H^+}] = 1.0 \\times 10^{-11}\\ \\text{mol/L}\\)",
      },
      practiceSet: [
        { prompt: "A solution has pH 4.5 at 25 °C. What is its pOH?", answer: "9.5", method: "\\(14 - 4.5\\)" },
        { prompt: "What is the pOH when \\([\\mathrm{OH^-}] = 1.0 \\times 10^{-2}\\ \\text{mol/L}\\)?", answer: "2", method: "\\(-\\log 10^{-2}\\)" },
        { prompt: "What is the pH of a solution with pOH 12 at 25 °C, and is it acidic or basic?", answer: "pH 2, acidic", method: "\\(14 - 12\\)" },
      ],
    },
  ],
};
