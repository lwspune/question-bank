import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ABP_STRONG_NOTE: SubtopicNote = {
  subtopicName: "Strong Acid and Base pH",
  title: "Strong Acids and Bases: pH and Dilution",
  oneLineDefinition:
    "A strong acid or base splits completely into ions, so its H⁺ or OH⁻ concentration comes straight from its concentration, and every tenfold dilution moves the pH one unit towards 7.",
  whyItMatters:
    "This is where most of the chapter's arithmetic sits. The ministry papers asked for five solutions in order of pH (2023) and how much water dilutes an acid by two pH units (2024); the older papers asked for a pH from a mass of acid, from a hydroxide concentration and after a dilution, and whether a diprotic acid gives more hydrogen ions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-abp-strong-list",
      name: "The strong acids and strong bases to know",
      intuition:
        "Strong means the acid gives up its proton completely in water: no molecules of the acid are left, only ions. There are only a handful of strong acids and strong bases, so it is quicker to learn this short list and treat everything else as weak.",
      definition:
        "- A **strong acid** is fully dissociated in water: \\(\\mathrm{HCl \\rightarrow H^+ + Cl^-}\\), a one-way arrow.\n" +
        "- A **strong base** is fully dissociated into the metal ion and \\(\\mathrm{OH^-}\\). The Group 1 hydroxides and the heavier Group 2 hydroxides are strong bases.\n" +
        "- Strong is about **how completely** it ionises; concentrated is about **how much** is dissolved. A dilute strong acid and a concentrated weak acid are both possible.\n" +
        "- **Diprotic** strong acid: \\(\\mathrm{H_2SO_4}\\) loses its first proton completely and most of its second in dilute solution. IMAT calculations count 2 \\(\\mathrm{H^+}\\) per molecule unless told otherwise.",
      table: {
        columns: ["Substance", "Formula", "Type", "Ions per formula unit"],
        rows: [
          { cells: ["Hydrochloric acid", "\\(\\mathrm{HCl}\\)", "Strong acid", "1 \\(\\mathrm{H^+}\\)"] },
          { cells: ["Hydrobromic and hydroiodic acids", "\\(\\mathrm{HBr}\\), \\(\\mathrm{HI}\\)", "Strong acids", "1 \\(\\mathrm{H^+}\\)"] },
          {
            cells: ["Hydrofluoric acid", "\\(\\mathrm{HF}\\)", "WEAK acid", "Only a small fraction ionises"],
            noteAmber: "The odd one out of the hydrogen halides: the strong H-F bond keeps it a weak acid.",
          },
          { cells: ["Nitric acid", "\\(\\mathrm{HNO_3}\\)", "Strong acid", "1 \\(\\mathrm{H^+}\\)"] },
          { cells: ["Perchloric acid", "\\(\\mathrm{HClO_4}\\)", "Strong acid", "1 \\(\\mathrm{H^+}\\)"] },
          { cells: ["Sulfuric acid", "\\(\\mathrm{H_2SO_4}\\)", "Strong acid, diprotic", "2 \\(\\mathrm{H^+}\\) in IMAT calculations"] },
          { cells: ["Sodium and potassium hydroxide", "\\(\\mathrm{NaOH}\\), \\(\\mathrm{KOH}\\)", "Strong bases", "1 \\(\\mathrm{OH^-}\\)"] },
          { cells: ["Calcium and barium hydroxide", "\\(\\mathrm{Ca(OH)_2}\\), \\(\\mathrm{Ba(OH)_2}\\)", "Strong bases", "2 \\(\\mathrm{OH^-}\\)"] },
        ],
        caption: "Ammonia, ethanoic acid, methanoic acid, carbonic acid and phosphoric acid are all weak.",
      },
      selfCheckExample: {
        prompt: "Which of these acids is weak?",
        options: [
          "\\(\\mathrm{HNO_3}\\)",
          "\\(\\mathrm{HBr}\\)",
          "\\(\\mathrm{HF}\\)",
          "\\(\\mathrm{HClO_4}\\)",
          "\\(\\mathrm{H_2SO_4}\\)",
        ],
        steps: [
          "HF is the only hydrogen halide that is a weak acid.",
          "The other four are on the list of strong acids. Being a halogen acid, as in B, does not make an acid weak.",
        ],
        answer: "(C) \\(\\mathrm{HF}\\)",
      },
      practiceSet: [
        { prompt: "Is HI a strong or a weak acid?", answer: "Strong", method: "Like HCl and HBr" },
        { prompt: "How many hydroxide ions does one formula unit of \\(\\mathrm{Ba(OH)_2}\\) release?", answer: "2", method: "Two OH groups" },
        { prompt: "Is ammonia a strong base?", answer: "No, it is a weak base", method: "Only a small fraction reacts with water" },
      ],
      traps: [
        {
          title: "Strong is not the same as concentrated",
          body: "A strong acid is one that is fully ionised, whatever its concentration. A 0.001 mol/L solution of HCl is a dilute strong acid; a 10 mol/L solution of ethanoic acid is a concentrated weak acid. Options that swap these words are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-strong-ph",
      name: "pH of a strong acid or a strong base",
      intuition:
        "Because a strong acid ionises fully, the hydrogen ion concentration is just the acid concentration, times two for a diprotic acid. A strong base gives the hydroxide concentration the same way, but that leads to pOH, so one more step (14 minus) gives the pH.",
      definition:
        "- Strong acid: \\([\\mathrm{H^+}] = n \\times c\\), where \\(n\\) is the number of \\(\\mathrm{H^+}\\) per formula unit. Then \\(\\text{pH} = -\\log[\\mathrm{H^+}]\\).\n" +
        "- Strong base: \\([\\mathrm{OH^-}] = n \\times c\\), then \\(\\text{pOH} = -\\log[\\mathrm{OH^-}]\\) and \\(\\text{pH} = 14 - \\text{pOH}\\).\n" +
        "- Given a mass: moles = mass / molar mass, then concentration = moles / volume in litres.\n" +
        "- To rank solutions of equal concentration by pH: strong diprotic acid < strong monoprotic acid < weak acid < neutral salt < weak base < strong base < strong base with 2 \\(\\mathrm{OH^-}\\).",
      formula: {
        label: "Strong acid and strong base",
        latex: "\\text{pH} = -\\log(n\\,c_{\\text{acid}}) \\qquad \\text{pH} = 14 + \\log(n\\,c_{\\text{base}})",
        symbols: [
          { symbol: "\\(c\\)", meaning: "concentration of the acid or base, in mol/L" },
          { symbol: "\\(n\\)", meaning: "number of \\(\\mathrm{H^+}\\) or \\(\\mathrm{OH^-}\\) per formula unit" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the pH at 25 °C of (a) 0.020 mol/L sulfuric acid and (b) 0.0050 mol/L barium hydroxide.",
        steps: [
          "(a) Two \\(\\mathrm{H^+}\\) per molecule: \\([\\mathrm{H^+}] = 2 \\times 0.020 = 0.040 = 4.0 \\times 10^{-2}\\ \\text{mol/L}\\).",
          "\\(\\text{pH} = 2 - \\log 4.0 = 2 - 0.60 = 1.40\\).",
          "(b) Two \\(\\mathrm{OH^-}\\) per formula unit: \\([\\mathrm{OH^-}] = 2 \\times 0.0050 = 0.010\\ \\text{mol/L}\\), so pOH = 2.",
          "\\(\\text{pH} = 14 - 2 = 12\\).",
        ],
        answer: "(a) pH 1.40; (b) pH 12",
      },
      selfCheckExample: {
        prompt: "What is the pH at 25 °C of a 0.0010 mol/L solution of calcium hydroxide, \\(\\mathrm{Ca(OH)_2}\\)? Take \\(\\log 2 = 0.30\\).",
        options: [
          "11.0",
          "11.3",
          "3.0",
          "2.7",
          "10.7",
        ],
        steps: [
          "\\([\\mathrm{OH^-}] = 2 \\times 0.0010 = 2.0 \\times 10^{-3}\\ \\text{mol/L}\\).",
          "\\(\\text{pOH} = 3 - 0.30 = 2.70\\), so \\(\\text{pH} = 14 - 2.70 = 11.3\\).",
          "A forgets the factor of 2. C treats the base as an acid. D stops at the pOH. E subtracts log 2 from the wrong number.",
        ],
        answer: "(B) 11.3",
      },
      practiceSet: [
        { prompt: "What is the pH of 0.0010 mol/L nitric acid?", answer: "3", method: "\\([\\mathrm{H^+}] = 10^{-3}\\)" },
        { prompt: "What is the pH of 0.10 mol/L KOH at 25 °C?", answer: "13", method: "pOH 1, then 14 minus 1" },
        { prompt: "0.20 g of NaOH (molar mass 40 g/mol) is dissolved to make 500 mL of solution. What is the pH at 25 °C?", answer: "12", method: "0.0050 mol in 0.500 L is 0.010 mol/L, pOH 2" },
        { prompt: "Rank these 0.05 mol/L solutions by increasing pH: KOH, HCl, HCOOH, KNO₃, NH₃.", answer: "HCl, HCOOH, KNO₃, NH₃, KOH", method: "Strong acid, weak acid, neutral salt, weak base, strong base" },
      ],
      traps: [
        {
          title: "For a base, minus log of the concentration is the pOH",
          body: "For 0.01 mol/L NaOH, \\(-\\log 0.01 = 2\\) is the pOH, not the pH. The pH is \\(14 - 2 = 12\\). The pOH value is almost always one of the options.",
        },
        {
          title: "Count the ions per formula unit",
          body: "Sulfuric acid gives two \\(\\mathrm{H^+}\\) and barium or calcium hydroxide two \\(\\mathrm{OH^-}\\) per formula unit. Their \\([\\mathrm{H^+}]\\) or \\([\\mathrm{OH^-}]\\) is double the concentration of the compound, so the pH moves by \\(\\log 2 \\approx 0.30\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-abp-dilution",
      name: "Diluting a strong acid or base",
      intuition:
        "Adding water does not change the number of moles of \\(\\mathrm{H^+}\\); it only spreads them through a bigger volume. Make the volume ten times larger and the concentration is ten times smaller, which is exactly one pH unit. Dilution moves the pH towards 7, but it can never carry an acid past 7, because the water itself is neutral.",
      definition:
        "- Moles are conserved on dilution: \\(c_1 V_1 = c_2 V_2\\).\n" +
        "- Diluting by a factor of \\(10^n\\) raises the pH of a strong acid by \\(n\\) and lowers the pH of a strong base by \\(n\\).\n" +
        "- The **total** final volume sets the factor. The water **added** is the final volume minus the starting volume.\n" +
        "- Very dilute acid: below about \\(10^{-6}\\) mol/L the water's own \\(\\mathrm{H^+}\\) matters, and the pH approaches 7 from below. \\(10^{-8}\\) mol/L HCl has a pH of about 6.98, not 8.",
      formula: {
        label: "Dilution",
        latex: "c_1 V_1 = c_2 V_2",
        symbols: [
          { symbol: "\\(c_1, V_1\\)", meaning: "concentration and volume before dilution" },
          { symbol: "\\(c_2, V_2\\)", meaning: "concentration and TOTAL volume after dilution" },
        ],
      },
      authoredExample: {
        prompt: "25 mL of 0.10 mol/L HCl is diluted with water to a total volume of 250 mL. Find the pH before and after.",
        steps: [
          "Before: \\([\\mathrm{H^+}] = 0.10\\ \\text{mol/L}\\), so pH 1.",
          "Volume factor: \\(250 / 25 = 10\\), so \\(c_2 = 0.10 / 10 = 0.010\\ \\text{mol/L}\\).",
          "After: pH 2. A tenfold dilution has raised the pH by exactly one unit.",
        ],
        answer: "pH 1 before, pH 2 after",
      },
      selfCheckExample: {
        prompt: "5 mL of a sodium hydroxide solution has a pH of 13. What volume of water must be added to bring the pH to 11?",
        options: [
          "500 mL",
          "45 mL",
          "10 mL",
          "495 mL",
          "4.95 L",
        ],
        steps: [
          "A fall of two pH units means \\([\\mathrm{OH^-}]\\) must become 100 times smaller.",
          "So the total volume must be \\(5 \\times 100 = 500\\ \\text{mL}\\), and the water added is \\(500 - 5 = 495\\ \\text{mL}\\).",
          "A is the final volume, not the water added. B uses a factor of 10 (one pH unit). C doubles the volume as if pH were linear. E uses a factor of 1000.",
        ],
        answer: "(D) 495 mL",
      },
      practiceSet: [
        { prompt: "10 mL of an HCl solution of pH 2 is made up to 1.0 L with water. What is the new pH?", answer: "4", method: "Factor of 100 is two pH units" },
        { prompt: "A strong base of pH 12 is diluted tenfold. What is the new pH?", answer: "11", method: "One unit towards 7" },
        { prompt: "What volume of 2.0 mol/L acid is needed to make 400 mL of 0.25 mol/L acid?", answer: "50 mL", method: "\\(V_1 = 0.25 \\times 400 / 2.0\\)" },
      ],
      traps: [
        {
          title: "Diluting an acid never makes it basic",
          body: "Each tenfold dilution adds about one to the pH of a strong acid, but only until the acid's \\(\\mathrm{H^+}\\) becomes comparable with water's own. A very dilute acid has a pH just under 7. An answer of pH 8 or more for a diluted acid is always wrong.",
        },
      ],
    },
  ],
};
