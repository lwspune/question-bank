import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_IE_PH_NOTE: SubtopicNote = {
  subtopicName: "pH Scale",
  title: "Ionic Product of Water and the pH Scale",
  oneLineDefinition:
    "The ionic product of water, the definitions of pH and pOH, the relation pH + pOH = 14, and how to go from a concentration to a pH and back again.",
  whyItMatters:
    "19 questions, six of them from board papers from 2023 to 2026, five of those one-mark MCQs: the pH of 0.01 M and of 0.001 M HCl (2024), the pOH of an HCl solution (2026), the hydroxide ion concentration of a base of pH 11.2 (2023) and the pH of human blood (2025). A two-mark question in 2025 asked for the pOH from a hydrogen ion concentration. The textbook adds the derivation of pH + pOH = 14, mixtures of an acid and a base, a very dilute acid and the antilog method.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccie-ph-poh",
      name: "Ionic product of water, pH and pOH",
      intuition:
        "Water ionises very slightly, and at a given temperature the product of its two ion concentrations is fixed. Raise one and the other must fall. Writing these tiny concentrations as negative logarithms turns them into small, easy numbers: the pH and the pOH, which always add up to 14 at 298 K.",
      definition:
        "- **Autoionisation of water:** \\(\\text{H}_2\\text{O} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-\\).\n" +
        "- **Ionic product of water:** the product of the molar concentrations of hydronium and hydroxyl ions at equilibrium in pure water at a given temperature, \\(K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-]\\). In pure water at 298 K each is \\(1.0 \\times 10^{-7}\\) mol/L, so \\(K_w = 1.0 \\times 10^{-14}\\).\n" +
        "- **pH** (Sorensen, 1909): the negative logarithm to the base 10 of the concentration of \\(\\text{H}^+\\) ions in mol dm\\(^{-3}\\), \\(\\text{pH} = -\\log_{10}[\\text{H}^+]\\). **pOH** \\(= -\\log_{10}[\\text{OH}^-]\\).\n" +
        "- **Derivation of pH + pOH = 14:**\n" +
        "- Step 1: \\(K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}\\) at 298 K.\n" +
        "- Step 2: take logarithms: \\(\\log_{10}[\\text{H}_3\\text{O}^+] + \\log_{10}[\\text{OH}^-] = -14\\).\n" +
        "- Step 3: multiply by \\(-1\\): \\(-\\log_{10}[\\text{H}_3\\text{O}^+] + \\{-\\log_{10}[\\text{OH}^-]\\} = 14\\).\n" +
        "- Step 4: by the definitions, \\(\\text{pH} + \\text{pOH} = 14\\).\n" +
        "- **Neutral** (298 K): \\([\\text{H}_3\\text{O}^+] = [\\text{OH}^-] = 1.0 \\times 10^{-7}\\) M, pH = 7. **Acidic:** \\([\\text{H}_3\\text{O}^+] > 1 \\times 10^{-7}\\), pH < 7. **Basic:** \\([\\text{H}_3\\text{O}^+] < 1 \\times 10^{-7}\\), pH > 7.\n" +
        "- The textbook's 'Do you know' box: gastric juice has pH about 2, and the pH of blood is kept within 7.36 to 7.42.",
      formula: {
        label: "pH and pOH at 298 K",
        latex: "K_w = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}, \\qquad \\text{pH} + \\text{pOH} = 14",
      },
      authoredExample: {
        prompt:
          "The hydroxide ion concentration of a solution is \\(1 \\times 10^{-5}\\) mol dm\\(^{-3}\\). Calculate its pOH and pH, and say whether it is acidic or basic.",
        steps: [
          "Given: \\([\\text{OH}^-] = 1 \\times 10^{-5}\\) mol dm\\(^{-3}\\).",
          "Formula: \\(\\text{pOH} = -\\log_{10}[\\text{OH}^-]\\); \\(\\text{pH} = 14 - \\text{pOH}\\) at 298 K.",
          "Substitution: \\(\\text{pOH} = -\\log_{10}(10^{-5}) = 5\\); \\(\\text{pH} = 14 - 5 = 9\\).",
          "pH is above 7, so the solution is basic.",
        ],
        answer: "pOH = 5, pH = 9, basic",
      },
      selfCheckExample: {
        prompt: "The pOH of a solution at 298 K is 4.5. Find its pH and say whether the solution is acidic or basic.",
        steps: ["\\(\\text{pH} = 14 - 4.5 = 9.5\\).", "9.5 is above 7."],
        answer: "pH 9.5, basic",
      },
      practiceSet: [
        { prompt: "What is the value of the ionic product of water at 298 K?", answer: "\\(1.0 \\times 10^{-14}\\)" },
        { prompt: "What is the pH of pure water at 298 K?", answer: "7" },
        { prompt: "Blood has a pH of about 7.4. Is it acidic, basic or neutral?", answer: "Slightly basic, since 7.4 is above 7" },
        { prompt: "For a solution with pH greater than 7, is \\([\\text{H}_3\\text{O}^+]\\) above or below \\(10^{-7}\\) M?", answer: "Below \\(10^{-7}\\) M" },
      ],
      pyqExampleId: "ea7a5d8b-d9bd-42ef-92bd-d613b528f8f6",
      traps: [
        {
          title: "Forgetting the temperature",
          body: "\\(K_w = 1.0 \\times 10^{-14}\\) and pH + pOH = 14 hold at 298 K. Write 'at 298 K' in the derivation; the value of \\(K_w\\) is different at other temperatures.",
        },
        {
          title: "Answering pH when pOH is asked",
          body: "Many one-mark MCQs ask for the pOH of an acid. Find the pH first, then subtract it from 14. An acid has a LOW pH and a HIGH pOH.",
        },
        {
          title: "The minus sign in the definition",
          body: "pH is the NEGATIVE logarithm. Without the minus sign every pH comes out negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-strong-ph",
      name: "pH of strong acids, strong bases and their mixtures",
      intuition:
        "A strong acid is almost completely ionised, so the hydronium ion concentration is simply the acid's concentration (twice it for a dibasic acid like sulphuric acid). A strong base gives its hydroxide ions the same way; find pOH first, then pH. When an acid and a base are mixed, they cancel each other, and only the one left over sets the pH.",
      definition:
        "- **Strong monobasic acid** (HCl, \\(\\text{HNO}_3\\)): \\([\\text{H}_3\\text{O}^+] = c\\), so \\(\\text{pH} = -\\log_{10} c\\).\n" +
        "- **Strong dibasic acid** (\\(\\text{H}_2\\text{SO}_4\\), taking both protons as ionised): \\([\\text{H}_3\\text{O}^+] = 2c\\).\n" +
        "- **Strong base** (NaOH, KOH): \\([\\text{OH}^-] = c\\), \\(\\text{pOH} = -\\log_{10} c\\), then \\(\\text{pH} = 14 - \\text{pOH}\\).\n" +
        "- **Mixture of a strong acid and a strong base:** millimoles = volume in mL × molarity. Subtract to find the excess, and divide it by the TOTAL volume. Equal millimoles give a neutral solution, pH 7.\n" +
        "- **A very dilute acid** (\\(10^{-8}\\) M HCl): water itself supplies \\(10^{-7}\\) M of \\(\\text{H}_3\\text{O}^+\\), more than the acid. The pH is just below 7, never 8: adding an acid cannot make water basic.",
      formula: {
        label: "Strong acid and strong base",
        latex: "\\text{pH} = -\\log_{10}[\\text{H}_3\\text{O}^+], \\qquad \\text{pH} = 14 + \\log_{10}[\\text{OH}^-]",
      },
      authoredExample: {
        prompt: "Calculate the pH of a 0.004 M NaOH solution.",
        steps: [
          "Given: NaOH is a strong base, so \\([\\text{OH}^-] = c = 4 \\times 10^{-3}\\) M.",
          "Formula: \\(\\text{pOH} = -\\log_{10}[\\text{OH}^-]\\), \\(\\text{pH} = 14 - \\text{pOH}\\).",
          "Substitution: \\(\\text{pOH} = -\\log_{10}(4 \\times 10^{-3}) = 3 - \\log_{10} 4 = 3 - 0.6021 = 2.398\\).",
          "\\(\\text{pH} = 14 - 2.398 = 11.60\\). It is above 7, as a base must be.",
        ],
        answer: "pH = 11.60",
      },
      selfCheckExample: {
        prompt: "50 mL of 0.2 M HCl is mixed with 50 mL of 0.1 M NaOH. Calculate the pH of the mixture.",
        steps: [
          "HCl: \\(50 \\times 0.2 = 10\\) mmol; NaOH: \\(50 \\times 0.1 = 5\\) mmol. Excess HCl \\(= 5\\) mmol.",
          "Total volume 100 mL, so \\([\\text{H}_3\\text{O}^+] = 5/100 = 0.05\\) M.",
          "\\(\\text{pH} = 2 - \\log_{10} 5 = 2 - 0.6990 = 1.30\\).",
        ],
        answer: "pH = 1.30",
      },
      practiceSet: [
        { prompt: "40 mL of 0.1 M HCl is mixed with 60 mL of 0.1 M NaOH. Find the pH of the mixture.", answer: "Excess NaOH = 2 mmol in 100 mL = 0.02 M; pOH = 1.70; pH = 12.30" },
        { prompt: "Find the pH of 0.005 M \\(\\text{H}_2\\text{SO}_4\\), taking both protons as ionised.", answer: "\\([\\text{H}_3\\text{O}^+] = 0.01\\) M, so pH = 2" },
        { prompt: "Why can the pH of a very dilute solution of HCl never be above 7?", answer: "Adding an acid to water can only raise \\([\\text{H}_3\\text{O}^+]\\) above \\(10^{-7}\\) M, so the pH stays below 7" },
      ],
      pyqExampleId: "d8349de7-2ae0-45f8-ab1a-04518419adb8",
      traps: [
        {
          title: "Taking pOH as the pH of a base",
          body: "For a base, \\(-\\log_{10}[\\text{OH}^-]\\) is the pOH. Stopping there gives an acidic-looking answer for NaOH; subtract from 14.",
        },
        {
          title: "Forgetting the total volume in a mixture",
          body: "After mixing, the excess acid or base is spread through BOTH volumes. Dividing by one volume alone gives a concentration that is too large.",
        },
        {
          title: "pH 8 for \\(10^{-8}\\) M HCl",
          body: "\\(-\\log_{10}(10^{-8}) = 8\\) is the trap answer. Water's own \\(10^{-7}\\) M cannot be ignored here, and an acid solution cannot be basic: the pH is a little less than 7.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccie-antilog",
      name: "From pH back to concentration: the antilog method",
      intuition:
        "Going from a concentration to a pH needs a logarithm; going back needs an antilog. The log tables need a positive decimal part, so a negative number like \\(-3.12\\) is first rewritten as \\(-4 + 0.88\\). Once you have the ion concentration, the degree of dissociation of a weak acid or base follows by dividing by its concentration.",
      definition:
        "- \\(\\log_{10}[\\text{H}_3\\text{O}^+] = -\\text{pH}\\). Write \\(-\\text{pH}\\) with a positive mantissa in bar form, for example \\(-3.12 = -4 + 0.88 = \\bar{4}.88\\).\n" +
        "- \\([\\text{H}_3\\text{O}^+] = \\text{antilog}\\ \\bar{4}.88 = 7.586 \\times 10^{-4}\\) M. In short, \\([\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}\\).\n" +
        "- For a base, first find \\(\\text{pOH} = 14 - \\text{pH}\\), then \\([\\text{OH}^-] = 10^{-\\text{pOH}}\\).\n" +
        "- For a weak monobasic acid or monoacidic base of concentration \\(c\\): \\(\\alpha = [\\text{H}_3\\text{O}^+]/c\\) or \\([\\text{OH}^-]/c\\); percent dissociation \\(= \\alpha \\times 100\\).",
      formula: {
        label: "Concentration from pH",
        latex: "[\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}, \\qquad [\\text{OH}^-] = 10^{-(14 - \\text{pH})}",
      },
      authoredExample: {
        prompt: "The pH of a solution is 4.7. Calculate the concentration of \\(\\text{H}_3\\text{O}^+\\) ions.",
        steps: [
          "Given: pH = 4.7.",
          "Formula: \\(\\log_{10}[\\text{H}_3\\text{O}^+] = -\\text{pH}\\).",
          "Substitution: \\(\\log_{10}[\\text{H}_3\\text{O}^+] = -4.7 = -5 + 0.3 = \\bar{5}.3\\).",
          "\\([\\text{H}_3\\text{O}^+] = \\text{antilog}\\ \\bar{5}.3 = 1.995 \\times 10^{-5}\\) mol dm\\(^{-3}\\).",
        ],
        answer: "\\(1.995 \\times 10^{-5}\\) mol dm\\(^{-3}\\)",
      },
      selfCheckExample: {
        prompt: "A 0.05 M solution of a weak monoacidic base has pH 10.3. Calculate its percent dissociation.",
        steps: [
          "\\(\\text{pOH} = 14 - 10.3 = 3.7\\); \\(\\log_{10}[\\text{OH}^-] = -3.7 = \\bar{4}.3\\).",
          "\\([\\text{OH}^-] = 1.995 \\times 10^{-4}\\) M.",
          "\\(\\alpha = \\dfrac{1.995 \\times 10^{-4}}{0.05} = 3.99 \\times 10^{-3}\\); percent \\(= 0.399\\%\\).",
        ],
        answer: "0.399%",
      },
      practiceSet: [
        { prompt: "The pOH of a solution is 5.4. Find \\([\\text{OH}^-]\\).", answer: "\\(3.98 \\times 10^{-6}\\) mol dm\\(^{-3}\\)" },
        { prompt: "The pH of a solution is 2.5. Find \\([\\text{H}_3\\text{O}^+]\\).", answer: "\\(3.16 \\times 10^{-3}\\) mol dm\\(^{-3}\\)" },
        { prompt: "A 0.01 M solution of a weak monobasic acid has pH 4.0. Find its percent dissociation.", answer: "\\([\\text{H}_3\\text{O}^+] = 10^{-4}\\) M, \\(\\alpha = 0.01\\), so 1%" },
      ],
      pyqExampleId: "481f4da6-ba6c-4a11-99a7-1d96812a48c6",
      traps: [
        {
          title: "A negative mantissa",
          body: "\\(-3.12\\) is NOT \\(\\bar{3}.12\\). The decimal part must be positive: \\(-3.12 = -4 + 0.88 = \\bar{4}.88\\). Getting this wrong puts the answer out by a factor of about ten.",
        },
        {
          title: "Taking the antilog of the pH for a base",
          body: "For a base, \\(10^{-\\text{pH}}\\) gives \\([\\text{H}_3\\text{O}^+]\\), not \\([\\text{OH}^-]\\). Find the pOH from 14 minus the pH first; a base must have \\([\\text{OH}^-]\\) above \\(10^{-7}\\) M.",
        },
      ],
    },
  ],
};
