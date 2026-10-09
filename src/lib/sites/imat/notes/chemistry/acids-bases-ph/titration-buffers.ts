import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_TITRATION_BUFFERS_NOTE: SubtopicNote = {
  subtopicName: "Titrations and Buffers",
  title: "Neutralisation, Titration, Indicators and Buffers",
  oneLineDefinition:
    "Acids and bases neutralise each other mole for mole of H⁺ and OH⁻; an indicator shows when that point is reached, and a buffer is a mixture that resists changes in pH.",
  whyItMatters:
    "Only one past question, from 2019, is on this page: the colours of universal indicator as an alkali is neutralised. Titration calculations and buffers are on the syllabus but have not been asked, so learn them as likely new questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-abp-neutralisation",
      name: "Neutralisation and titration calculations",
      intuition:
        "However the acid and base are dressed up, the reaction underneath is one \\(\\mathrm{H^+}\\) meeting one \\(\\mathrm{OH^-}\\) to make water. So neutralisation is complete when the moles of \\(\\mathrm{H^+}\\) supplied equal the moles of \\(\\mathrm{OH^-}\\) supplied. A titration measures the volume needed to reach that point.",
      definition:
        "- **Neutralisation**: acid + base \\(\\rightarrow\\) salt + water; the ionic equation is \\(\\mathrm{H^+ + OH^- \\rightarrow H_2O}\\).\n" +
        "- In a **titration**, a solution of known concentration is added from a burette until the reaction is just complete.\n" +
        "- The **equivalence point** is where moles of \\(\\mathrm{H^+}\\) equal moles of \\(\\mathrm{OH^-}\\). The **end point** is where the indicator changes colour; a good indicator makes them coincide.\n" +
        "- Moles = concentration × volume in litres. Count 2 for each \\(\\mathrm{H_2SO_4}\\) or \\(\\mathrm{Ba(OH)_2}\\).\n" +
        "- If one reagent is in excess, the leftover moles divided by the TOTAL volume give the final concentration and pH.",
      formula: {
        label: "At the equivalence point",
        latex: "n_a\\, c_a V_a = n_b\\, c_b V_b",
        symbols: [
          { symbol: "\\(c_a, V_a\\)", meaning: "concentration and volume of the acid" },
          { symbol: "\\(c_b, V_b\\)", meaning: "concentration and volume of the base" },
          { symbol: "\\(n_a, n_b\\)", meaning: "\\(\\mathrm{H^+}\\) per acid formula, \\(\\mathrm{OH^-}\\) per base formula" },
        ],
      },
      authoredExample: {
        prompt:
          "20.0 mL of sulfuric acid is exactly neutralised by 25.0 mL of 0.10 mol/L sodium hydroxide. Find the concentration of the sulfuric acid.",
        steps: [
          "Moles of NaOH: \\(0.10 \\times 0.0250 = 2.5 \\times 10^{-3}\\ \\text{mol}\\), so \\(2.5 \\times 10^{-3}\\) mol of \\(\\mathrm{OH^-}\\).",
          "\\(\\mathrm{H_2SO_4 + 2NaOH \\rightarrow Na_2SO_4 + 2H_2O}\\): one acid needs two NaOH, so acid moles \\(= 1.25 \\times 10^{-3}\\ \\text{mol}\\).",
          "Concentration: \\(1.25 \\times 10^{-3} / 0.0200 = 0.0625\\ \\text{mol/L}\\).",
        ],
        answer: "0.0625 mol/L",
      },
      selfCheckExample: {
        prompt:
          "What volume of 0.20 mol/L hydrochloric acid exactly neutralises 30 mL of 0.10 mol/L barium hydroxide, \\(\\mathrm{Ba(OH)_2}\\)?",
        options: [
          "30 mL",
          "15 mL",
          "60 mL",
          "7.5 mL",
          "3.0 mL",
        ],
        steps: [
          "Moles of \\(\\mathrm{OH^-}\\): \\(2 \\times 0.10 \\times 0.030 = 6.0 \\times 10^{-3}\\ \\text{mol}\\).",
          "HCl gives one \\(\\mathrm{H^+}\\) each, so \\(V = 6.0 \\times 10^{-3} / 0.20 = 0.030\\ \\text{L} = 30\\ \\text{mL}\\).",
          "B forgets that each \\(\\mathrm{Ba(OH)_2}\\) gives two \\(\\mathrm{OH^-}\\). C counts the factor of 2 twice. D divides by 2 instead of multiplying. E slips a power of ten.",
        ],
        answer: "(A) 30 mL",
      },
      practiceSet: [
        { prompt: "How many moles of NaOH neutralise 0.050 mol of \\(\\mathrm{H_2SO_4}\\)?", answer: "0.10 mol", method: "Two \\(\\mathrm{OH^-}\\) per acid molecule" },
        { prompt: "What volume of 0.50 mol/L NaOH neutralises 25 mL of 0.20 mol/L \\(\\mathrm{HNO_3}\\)?", answer: "10 mL", method: "\\(0.20 \\times 25 / 0.50\\)" },
        { prompt: "55 mL of 0.10 mol/L HCl is mixed with 45 mL of 0.10 mol/L NaOH. What is the pH of the mixture?", answer: "2", method: "\\(1.0 \\times 10^{-3}\\) mol of \\(\\mathrm{H^+}\\) left in 0.100 L" },
      ],
      traps: [
        {
          title: "Use the total volume after mixing",
          body: "When an acid and a base are mixed and one is in excess, the leftover \\(\\mathrm{H^+}\\) or \\(\\mathrm{OH^-}\\) is spread through BOTH volumes added together. Dividing by only the acid's volume gives a concentration that is too high and a pH that is off.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-abp-indicators",
      name: "Titration curves, equivalence point pH and indicators",
      intuition:
        "As base is added to an acid, the pH creeps up slowly, then leaps by several units around the equivalence point, then levels off. Where that leap is centred depends on the salt formed, since the salt itself may be acidic or basic. An indicator is a weak acid whose two forms have different colours, and it is useful only if its colour change falls inside the leap.",
      definition:
        "- The **pH at the equivalence point** is the pH of the salt solution formed (see the salt rules on the previous page).\n" +
        "- An **acid-base indicator** changes colour over about two pH units. Choose one whose range lies on the steep part of the curve.\n" +
        "- **Litmus**: red in acid, blue in alkali.\n" +
        "- **Phenolphthalein**: colourless below about pH 8.2, pink above about pH 10.\n" +
        "- **Methyl orange**: red below about pH 3.1, yellow above about pH 4.4.\n" +
        "- **Universal indicator** is a mixture: red at low pH, then orange, yellow, green at pH 7, blue, and violet (purple) at high pH.",
      table: {
        columns: ["Titration", "pH at equivalence", "Salt formed", "Suitable indicator"],
        rows: [
          { cells: ["Strong acid + strong base", "7", "Neutral, e.g. \\(\\mathrm{NaCl}\\)", "Phenolphthalein or methyl orange (the jump is very large)"] },
          { cells: ["Weak acid + strong base", "Above 7, about 8 to 9", "Basic, e.g. \\(\\mathrm{CH_3COONa}\\)", "Phenolphthalein"] },
          { cells: ["Strong acid + weak base", "Below 7, about 5", "Acidic, e.g. \\(\\mathrm{NH_4Cl}\\)", "Methyl orange"] },
          { cells: ["Weak acid + weak base", "Near 7", "Depends on Ka and Kb", "None works well: there is no sharp jump"] },
        ],
      },
      selfCheckExample: {
        prompt: "Ethanoic acid is titrated with sodium hydroxide solution. Which statement about the equivalence point is correct?",
        options: [
          "The pH is exactly 7 at the equivalence point",
          "The pH is above 7, and phenolphthalein is a suitable indicator",
          "The pH is below 7, and methyl orange is a suitable indicator",
          "The pH is above 7, and methyl orange is a suitable indicator",
          "No indicator can show the equivalence point",
        ],
        steps: [
          "At equivalence the flask holds sodium ethanoate, a salt of a weak acid and a strong base, so the pH is above 7.",
          "Phenolphthalein changes in the range 8.2 to 10, on the steep part of this curve.",
          "A assumes every neutralisation ends at 7. C fits a strong acid with a weak base. D picks an indicator that changes long before the equivalence point. E is true only for weak acid with weak base.",
        ],
        answer: "(B) The pH is above 7, and phenolphthalein is a suitable indicator",
      },
      practiceSet: [
        { prompt: "What colour is phenolphthalein in sodium hydroxide solution?", answer: "Pink", method: "It turns pink above about pH 10" },
        { prompt: "Universal indicator is added to a solution of pH 2, and alkali is added until the pH reaches 7. Which colours appear, in order?", answer: "Red, orange, yellow, green", method: "Acid end of the scale towards neutral" },
        { prompt: "Which indicator suits titrating aqueous ammonia with hydrochloric acid?", answer: "Methyl orange", method: "The equivalence point is acidic (ammonium chloride)" },
      ],
      traps: [
        {
          title: "The end point is not always at pH 7",
          body: "The equivalence point sits at pH 7 only for a strong acid with a strong base. With a weak acid it is basic, with a weak base it is acidic, because the salt formed hydrolyses. Pick the indicator by where the jump is, not by where 7 is.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-buffers",
      name: "Buffer solutions and the Henderson-Hasselbalch equation",
      intuition:
        "A buffer holds a weak acid and its conjugate base side by side. Added \\(\\mathrm{H^+}\\) is taken up by the base; added \\(\\mathrm{OH^-}\\) is neutralised by the acid. Either way the change becomes a small shift in the acid to base ratio, and the pH depends only on the logarithm of that ratio, so it barely moves.",
      definition:
        "- A **buffer** is a solution that resists changes in pH when small amounts of acid or base are added, or when it is diluted.\n" +
        "- It is made from a **weak acid and its conjugate base** (\\(\\mathrm{CH_3COOH}\\) with \\(\\mathrm{CH_3COONa}\\)) or a **weak base and its conjugate acid** (\\(\\mathrm{NH_3}\\) with \\(\\mathrm{NH_4Cl}\\)). A strong acid with its salt is NOT a buffer.\n" +
        "- Added acid: \\(\\mathrm{A^- + H^+ \\rightarrow HA}\\). Added base: \\(\\mathrm{HA + OH^- \\rightarrow A^- + H_2O}\\).\n" +
        "- **Henderson-Hasselbalch**: pH equals pKa plus the log of (base over acid). With equal amounts, **pH = pKa**. A buffer works best within about one pH unit of its pKa.\n" +
        "- A weak acid half-neutralised by a strong base is a buffer with pH = pKa.\n" +
        "- **Blood** is kept at pH 7.35 to 7.45, mainly by the carbonic acid and hydrogencarbonate buffer: \\(\\mathrm{CO_2 + H_2O \\rightleftharpoons H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-}\\). The lungs remove \\(\\mathrm{CO_2}\\) and the kidneys adjust \\(\\mathrm{HCO_3^-}\\). Phosphate and proteins (including haemoglobin) buffer too. Blood pH below the range is **acidosis**, above it **alkalosis**.",
      formula: {
        label: "Henderson-Hasselbalch equation",
        latex: "\\text{pH} = \\text{p}K_a + \\log_{10}\\frac{[\\mathrm{A^-}]}{[\\mathrm{HA}]}",
        symbols: [
          { symbol: "\\([\\mathrm{A^-}]\\)", meaning: "concentration (or moles) of the conjugate base" },
          { symbol: "\\([\\mathrm{HA}]\\)", meaning: "concentration (or moles) of the weak acid" },
        ],
      },
      authoredExample: {
        prompt:
          "A buffer contains 0.20 mol of a weak acid HA (pKa 4.8) and 0.020 mol of its sodium salt NaA in 1.0 L. Find its pH, and say what happens to the pH if the buffer is diluted to 2.0 L.",
        steps: [
          "Ratio of base to acid: \\(0.020 / 0.20 = 0.10\\), and \\(\\log 0.10 = -1\\).",
          "\\(\\text{pH} = 4.8 + (-1) = 3.8\\).",
          "Diluting changes both concentrations by the same factor, so the ratio and the pH stay the same.",
        ],
        answer: "pH 3.8, unchanged on dilution",
      },
      selfCheckExample: {
        prompt: "Which of these mixtures in water forms a buffer solution?",
        options: [
          "Hydrochloric acid and sodium chloride",
          "Sodium hydroxide and sodium chloride",
          "Ethanoic acid and sodium ethanoate",
          "Nitric acid and sodium nitrate",
          "Equal moles of hydrochloric acid and sodium hydroxide",
        ],
        steps: [
          "A buffer needs a weak acid and its conjugate base in reasonable amounts: ethanoic acid with ethanoate fits.",
          "A and D pair a strong acid with its salt; the chloride and nitrate ions cannot take up added \\(\\mathrm{H^+}\\). B has no weak acid. E is just a neutral salt solution.",
        ],
        answer: "(C) Ethanoic acid and sodium ethanoate",
      },
      practiceSet: [
        { prompt: "A buffer has equal concentrations of a weak acid (pKa 6.5) and its conjugate base. What is its pH?", answer: "6.5", method: "\\(\\log 1 = 0\\)" },
        { prompt: "An ammonia buffer has \\([\\mathrm{NH_3}]\\) ten times \\([\\mathrm{NH_4^+}]\\). The pKa of \\(\\mathrm{NH_4^+}\\) is 9.25. What is the pH?", answer: "10.25", method: "\\(9.25 + \\log 10\\)" },
        { prompt: "For the blood buffer take pKa 6.1. What ratio of \\(\\mathrm{HCO_3^-}\\) to \\(\\mathrm{H_2CO_3}\\) gives pH 7.4? Take \\(\\log 20 = 1.3\\).", answer: "About 20 to 1", method: "\\(7.4 - 6.1 = 1.3\\)" },
        { prompt: "0.10 mol of ethanoic acid (pKa 4.7) is mixed with 0.050 mol of NaOH. What is the pH?", answer: "4.7", method: "Half the acid becomes ethanoate: equal amounts, pH = pKa" },
      ],
      traps: [
        {
          title: "A strong acid with its own salt is not a buffer",
          body: "HCl with NaCl cannot resist added acid, because \\(\\mathrm{Cl^-}\\) does not take up protons. A buffer needs a WEAK acid with its conjugate base, or a weak base with its conjugate acid.",
        },
        {
          title: "A buffer slows pH change; it does not stop it",
          body: "A buffer absorbs small additions. Add more acid than it has base to react with and its capacity is used up, after which the pH falls sharply. Options claiming the pH can never change are wrong.",
        },
      ],
    },
  ],
};
