import type { SubtopicNote } from "@/app/notes/_types";

export const TITRATION_SBC_NOTE: SubtopicNote = {
  subtopicName: "Equivalents and Titrations",
  title: "Equivalents and Titrations",
  oneLineDefinition:
    "Equal milliequivalents at the end point for acid–base and redox titrations, and the rules that make a substance a primary standard.",
  whyItMatters:
    "Thirty-one PYQs, twenty of them numerical and six from 2026. Twelve are acid–base neutralisations, where the number of H⁺ or OH⁻ sets the n-factor. Thirteen are redox titrations with permanganate, dichromate or thiosulphate, and six test the rules for a primary standard. One equation, equal milliequivalents, solves every calculation on the page.",
  concepts: [
    // C1 — acid-base
    {
      kind: "formula" as const,
      slug: "jcsbc-acid-base",
      name: "Acid–base titration and the n-factor",
      intuition:
        "At the end point the acid has given as many \\(\\mathrm{H^+}\\) as the base has taken. Count each side as molarity \\(\\times\\) volume \\(\\times\\) the number of \\(\\mathrm{H^+}\\) or \\(\\mathrm{OH^-}\\) per formula unit, and set them equal.",
      definition:
        "- Milliequivalents \\(=M\\times n\\times V(\\mathrm{mL})\\). At the end point, meq of acid \\(=\\) meq of base.\n" +
        "- n-factor: HCl and \\(\\mathrm{HNO_3}\\) 1; \\(\\mathrm{H_2SO_4}\\) and \\(\\mathrm{H_2C_2O_4}\\) 2; \\(\\mathrm{H_3PO_4}\\) 3 when fully neutralised; NaOH 1; \\(\\mathrm{Ca(OH)_2}\\) and \\(\\mathrm{Ba(OH)_2}\\) 2.\n" +
        "- Normality \\(N=M\\times n\\).\n" +
        "- Excess acid or base: subtract the meq, then divide by the total volume.\n" +
        "- Back titration: add a known excess, titrate what is left; the amount that reacted is added \\(-\\) left.\n" +
        "- A compound that makes acids in water counts all of them: \\(\\mathrm{SO_2Cl_2+2H_2O\\rightarrow H_2SO_4+2HCl}\\) gives 4 \\(\\mathrm{H^+}\\).",
      formula: {
        label: "End point",
        latex: "M_1n_1V_1=M_2n_2V_2",
      },
      authoredExample: {
        prompt: "What volume of \\(0.2\\) M \\(\\mathrm{H_2SO_4}\\) neutralises 30 mL of \\(0.1\\) M \\(\\mathrm{Ca(OH)_2}\\)?",
        steps: [
          "Base: \\(0.1\\times2\\times30=6\\) meq.",
          "Acid: \\(0.2\\times2\\times V=6\\), so \\(V=15\\) mL.",
        ],
        answer: "15 mL.",
      },
      selfCheckExample: {
        prompt: "25 mL of \\(0.1\\) M \\(\\mathrm{H_2SO_4}\\) is mixed with 30 mL of \\(0.1\\) M NaOH. How many millimoles of \\(\\mathrm{H^+}\\) are left, and what is \\([\\mathrm{H^+}]\\)?",
        steps: [
          "\\(\\mathrm{H^+}\\): \\(0.1\\times2\\times25=5\\) mmol. \\(\\mathrm{OH^-}\\): \\(0.1\\times30=3\\) mmol.",
          "Left: 2 mmol of \\(\\mathrm{H^+}\\) in 55 mL, so \\([\\mathrm{H^+}]=\\frac{2}{55}=0.036\\) M.",
        ],
        answer: "2 mmol; \\(0.036\\) M.",
      },
      practiceSet: [
        { prompt: "n-factor of \\(\\mathrm{Ba(OH)_2}\\)?", answer: "2" },
        { prompt: "Normality of \\(0.3\\) M \\(\\mathrm{H_2SO_4}\\)?", answer: "\\(0.6\\) N" },
        { prompt: "mL of \\(0.1\\) M NaOH to fully neutralise 10 mL of \\(0.1\\) M \\(\\mathrm{H_3PO_4}\\)?", answer: "30 mL" },
        { prompt: "meq in 20 mL of \\(0.5\\) M HCl?", answer: "10" },
      ],
      pyqExampleId: "49a59bac-510b-486e-872a-61660e7980da", // 23 Jan 2026 S1 — mass of HCl titrated by Ba(OH)2
      traps: [
        {
          title: "Forgetting n = 2",
          body: "\\(\\mathrm{Ba(OH)_2}\\), \\(\\mathrm{Ca(OH)_2}\\) and \\(\\mathrm{H_2SO_4}\\) each carry two. The options are built a factor of two apart for exactly this slip.",
        },
      ],
    },

    // C2 — redox titrations
    {
      kind: "formula" as const,
      slug: "jcsbc-redox-titration",
      name: "Redox titrations: permanganate, dichromate and iodometry",
      intuition:
        "The same equal-equivalents rule, with \\(n\\) now the electrons one formula unit gains or loses. In iodometry, iodine is only a messenger: count the thiosulphate and trace it back to what freed the iodine.",
      definition:
        "- n-factors: \\(\\mathrm{MnO_4^-}\\) 5 in acid, 3 in neutral or basic solution; \\(\\mathrm{Cr_2O_7^{2-}}\\) 6; \\(\\mathrm{Fe^{2+}}\\) 1; \\(\\mathrm{C_2O_4^{2-}}\\) 2; \\(\\mathrm{FeC_2O_4}\\) 3, since both Fe and C are oxidised; \\(\\mathrm{S_2O_3^{2-}}\\) 1.\n" +
        "- Iodometry: \\(\\mathrm{I_2+2S_2O_3^{2-}\\rightarrow2I^-+S_4O_6^{2-}}\\). With copper, \\(\\mathrm{2Cu^{2+}+4I^-\\rightarrow2CuI+I_2}\\), so one \\(\\mathrm{Cu^{2+}}\\) per thiosulphate.\n" +
        "- \\(\\mathrm{KMnO_4}\\) against oxalic acid: warm to about 60 °C at the start; the \\(\\mathrm{Mn^{2+}}\\) formed then catalyses the reaction.\n" +
        "- \\(\\mathrm{KMnO_4}\\) against Mohr's salt: no heating, or air oxidises the \\(\\mathrm{Fe^{2+}}\\).\n" +
        "- \\(\\mathrm{KMnO_4}\\) is its own indicator: the end point is the first lasting pink.",
      formula: {
        label: "Redox end point",
        latex: "M_1n_1V_1=M_2n_2V_2,\\qquad n=\\text{electrons per formula unit}",
      },
      authoredExample: {
        prompt: "What volume of \\(0.02\\) M \\(\\mathrm{KMnO_4}\\) oxidises 25 mL of \\(0.1\\) M \\(\\mathrm{FeSO_4}\\) in acid?",
        steps: [
          "\\(\\mathrm{Fe^{2+}}\\): \\(0.1\\times1\\times25=2.5\\) meq.",
          "\\(\\mathrm{KMnO_4}\\): \\(0.02\\times5\\times V=2.5\\), so \\(V=25\\) mL.",
        ],
        answer: "25 mL.",
      },
      selfCheckExample: {
        prompt: "Excess KI is added to 20 mL of a \\(\\mathrm{CuSO_4}\\) solution. The iodine released needs 12 mL of \\(0.05\\) M \\(\\mathrm{Na_2S_2O_3}\\). Find \\([\\mathrm{Cu^{2+}}]\\).",
        steps: [
          "Thiosulphate: \\(0.05\\times12=0.6\\) mmol.",
          "One \\(\\mathrm{Cu^{2+}}\\) per thiosulphate: \\(0.6\\) mmol of \\(\\mathrm{Cu^{2+}}\\).",
          "\\([\\mathrm{Cu^{2+}}]=\\frac{0.6}{20}=0.03\\) M.",
        ],
        answer: "\\(0.03\\) M.",
      },
      practiceSet: [
        { prompt: "n-factor of \\(\\mathrm{K_2Cr_2O_7}\\) in acid?", answer: "6" },
        { prompt: "n-factor of \\(\\mathrm{KMnO_4}\\) in basic solution?", answer: "3" },
        { prompt: "mL of \\(0.1\\) M \\(\\mathrm{Na_2S_2O_3}\\) for 1 mmol of \\(\\mathrm{I_2}\\)?", answer: "20 mL" },
        { prompt: "Which permanganate titration is warmed to 60 °C?", answer: "The one against oxalic acid" },
      ],
      pyqExampleId: "06f8738e-5eed-4cfa-9229-9a4567a738de", // 23 Jan 2026 S2 — dichromate needed for Mohr's salt
      traps: [
        {
          title: "Count every oxidisable part",
          body: "In \\(\\mathrm{FeC_2O_4}\\) both \\(\\mathrm{Fe^{2+}}\\) (1 electron) and oxalate (2 electrons) are oxidised by permanganate, so \\(n=3\\). \\(\\mathrm{Fe^{3+}}\\) and sulphate take no oxidant at all.",
        },
      ],
    },

    // C3 — primary standards
    {
      kind: "reference" as const,
      slug: "jcsbc-standards",
      name: "Primary standards",
      intuition:
        "A primary standard is weighed out to make a solution of exactly known concentration. So it must weigh what it says it weighs: pure, dry, stable in air, not a water absorber, and heavy enough that small weighing errors do not matter.",
      definition:
        "- Available pure and dry.\n" +
        "- Stable in air: not oxidised, not reacting with \\(\\mathrm{CO_2}\\).\n" +
        "- **Not** hygroscopic, and not losing water either.\n" +
        "- High molar mass, so weighing errors are small.\n" +
        "- Soluble in water, and reacts quickly and stoichiometrically.\n" +
        "- A fixed amount of water of crystallisation is allowed: oxalic acid dihydrate, borax and Mohr's salt are standards.",
      table: {
        columns: ["Substance", "Primary standard?", "Reason"],
        rows: [
          { cells: ["Oxalic acid dihydrate, \\(\\mathrm{H_2C_2O_4\\cdot2H_2O}\\)", "Yes", "Stable crystals of fixed composition"] },
          { cells: ["Potassium hydrogen phthalate (KHP)", "Yes", "High molar mass, not hygroscopic; standardises NaOH with phenolphthalein"] },
          { cells: ["Mohr's salt, \\(\\mathrm{(NH_4)_2Fe(SO_4)_2\\cdot6H_2O}\\)", "Yes", "Its \\(\\mathrm{Fe^{2+}}\\) resists air oxidation, unlike ferrous sulphate"] },
          { cells: ["\\(\\mathrm{K_2Cr_2O_7}\\)", "Yes", "Pure, stable and not hygroscopic"] },
          { cells: ["Borax, \\(\\mathrm{Na_2B_4O_7\\cdot10H_2O}\\)", "Yes", "Used to standardise acids"] },
          { cells: ["NaOH", "No", "Absorbs water and \\(\\mathrm{CO_2}\\) from air"] },
          { cells: ["\\(\\mathrm{KMnO_4}\\)", "No", "Hard to get pure; slowly reduced by light and traces of organic matter"] },
          { cells: ["\\(\\mathrm{Na_2Cr_2O_7}\\)", "No", "Hygroscopic, unlike the potassium salt"] },
          { cells: ["Ferrous sulphate hydrates", "No", "Air oxidises \\(\\mathrm{Fe^{2+}}\\) to \\(\\mathrm{Fe^{3+}}\\)"] },
        ],
        caption: "The potassium dichromate is a standard; the sodium one is not.",
      },
      selfCheckExample: {
        prompt: "Which of these is a primary standard: NaOH, \\(\\mathrm{KMnO_4}\\), \\(\\mathrm{K_2Cr_2O_7}\\), HCl?",
        steps: [
          "NaOH absorbs water and \\(\\mathrm{CO_2}\\); \\(\\mathrm{KMnO_4}\\) is not obtained pure; hydrochloric acid loses HCl gas, so its strength drifts.",
          "\\(\\mathrm{K_2Cr_2O_7}\\) is pure, stable and not hygroscopic.",
        ],
        answer: "\\(\\mathrm{K_2Cr_2O_7}\\).",
      },
      practiceSet: [
        { prompt: "Should a primary standard be hygroscopic?", answer: "No" },
        { prompt: "Indicator when KHP standardises NaOH?", answer: "Phenolphthalein" },
        { prompt: "Why is NaOH not a primary standard?", answer: "It absorbs water and \\(\\mathrm{CO_2}\\) from air" },
        { prompt: "High or low molar mass preferred?", answer: "High" },
      ],
      pyqExampleId: "272d2a46-504e-4807-88bc-41a3331983ee", // 3 Apr 2025 — which compounds should not be primary standards
      traps: [
        {
          title: "Hydrated salts can qualify",
          body: "Water of crystallisation is fine when its amount is fixed. What rules a salt out is taking up or losing water, or being oxidised by air.",
        },
      ],
    },
  ],
};
