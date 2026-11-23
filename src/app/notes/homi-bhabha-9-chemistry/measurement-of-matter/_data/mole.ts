import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MM_MOLE_NOTE: SubtopicNote = {
  subtopicName: "Mole Concept",
  title: "Mole Concept",
  oneLineDefinition:
    "One mole is 6.022 × 10²³ particles and weighs the molecular mass in grams, so every sum goes grams to moles to particles or back; molarity is the number of moles in one litre of solution.",
  whyItMatters:
    "The busiest page of the chapter: seven questions, all MODERATE. Five turn a mass into a number of molecules or a number of molecules into a mass (carbon dioxide, ethanol, water twice, sulphuric acid); two use molarity, once to find it and once to find the mass of solute needed. Each one is two short steps through the number of moles.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9mmmo-moles",
      name: "Moles, mass and number of particles",
      intuition:
        "A mole is a counting word, like a dozen, only far bigger: one mole is 6.022 × 10²³ things. Its use is that one mole of any substance weighs its molecular mass in grams. So 18 g of water and 44 g of carbon dioxide hold exactly the same number of molecules. To count molecules, weigh the substance and change grams into moles.",
      definition:
        "- **Avogadro's number**: \\(N_A = 6.022 \\times 10^{23}\\) particles in **one mole**.\n" +
        "- **Molar mass**: the mass of one mole, which is the **molecular mass in grams** (\\(\\mathrm{H_2O}\\): 18 g, \\(\\mathrm{CO_2}\\): 44 g).\n" +
        "- **Mass to particles**: moles \\(= \\frac{\\text{mass}}{\\text{molar mass}}\\), then particles \\(=\\) moles \\(\\times N_A\\).\n" +
        "- **Particles to mass**: moles \\(= \\frac{\\text{particles}}{N_A}\\), then mass \\(=\\) moles \\(\\times\\) molar mass.\n" +
        "- \\(10.5 \\times 10^{23}\\) and \\(1.05 \\times 10^{24}\\) are the **same number**: move the decimal one place and change the power by one.",
      formula: {
        label: "Mole relations",
        latex: "n = \\frac{m}{M} = \\frac{N}{N_A} \\qquad N_A = 6.022 \\times 10^{23}",
        symbols: [
          { symbol: "n", meaning: "number of moles" },
          { symbol: "m", meaning: "mass of the substance, in grams" },
          { symbol: "M", meaning: "molar mass, in grams per mole" },
          { symbol: "N", meaning: "number of particles (molecules or atoms)" },
          { symbol: "NA", meaning: "Avogadro's number" },
        ],
      },
      authoredExample: {
        prompt: "How many molecules are there in 34 g of ammonia, \\(\\mathrm{NH_3}\\)? (N = 14, H = 1)",
        steps: [
          "Molar mass of \\(\\mathrm{NH_3}\\) \\(= 14 + 3 = 17\\) g.",
          "Moles \\(= \\frac{34}{17} = 2\\).",
          "Molecules \\(= 2 \\times 6.022 \\times 10^{23} = 12.044 \\times 10^{23} = 1.2044 \\times 10^{24}\\).",
        ],
        answer: "\\(1.2044 \\times 10^{24}\\) molecules",
      },
      selfCheckExample: {
        prompt: "What is the mass of \\(3.011 \\times 10^{23}\\) molecules of methane, \\(\\mathrm{CH_4}\\)? (C = 12, H = 1)",
        steps: [
          "Moles \\(= \\frac{3.011 \\times 10^{23}}{6.022 \\times 10^{23}} = 0.5\\).",
          "Molar mass of \\(\\mathrm{CH_4}\\) \\(= 12 + 4 = 16\\) g, so mass \\(= 0.5 \\times 16 = 8\\) g.",
        ],
        answer: "8 g",
      },
      practiceSet: [
        { prompt: "How many moles are there in 88 g of carbon dioxide, \\(\\mathrm{CO_2}\\)? (C = 12, O = 16)", answer: "\\(\\frac{88}{44} = 2\\) moles" },
        { prompt: "How many molecules are there in one mole of any substance?", answer: "\\(6.022 \\times 10^{23}\\)" },
        { prompt: "What is the mass of \\(1.2044 \\times 10^{24}\\) molecules of oxygen gas, \\(\\mathrm{O_2}\\)? (O = 16)", answer: "2 moles \\(\\times\\) 32 g \\(= 64\\) g" },
        { prompt: "How many molecules are there in 1 g of hydrogen gas, \\(\\mathrm{H_2}\\)? (H = 1)", answer: "0.5 mole, so \\(3.011 \\times 10^{23}\\)" },
      ],
      pyqExampleId: "9384e40f-f8ce-45c8-95b6-813277973b54",
      traps: [
        {
          title: "Multiplying grams by Avogadro's number",
          body: "Change grams into moles first by dividing by the molar mass. Only moles are multiplied by \\(6.022 \\times 10^{23}\\).",
        },
        {
          title: "Thinking two ways of writing one number differ",
          body: "\\(10.5385 \\times 10^{23}\\) is the same as \\(1.05385 \\times 10^{24}\\). Check whether an option is just your answer written the other way.",
        },
        {
          title: "Using the atomic mass for a gas",
          body: "One mole of oxygen gas, \\(\\mathrm{O_2}\\), weighs 32 g, not 16 g. Use the molecular mass of the formula the question names.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mmmo-molarity",
      name: "Molarity of a solution",
      intuition:
        "Molarity tells you how strong a solution is: how many moles of the dissolved substance sit in one litre of the solution. Twice the moles in the same volume is twice as strong; the same moles in twice the volume is half as strong.",
      definition:
        "- **Molarity (M)** \\(= \\frac{\\text{moles of solute}}{\\text{volume of solution in litres}}\\). Its unit is **mol/L**, written M.\n" +
        "- A **2 M** solution has 2 moles of solute in every litre of solution.\n" +
        "- Change **millilitres to litres** first: 250 mL = 0.25 L.\n" +
        "- **Mass of solute needed** = molarity × volume in litres × molar mass.",
      formula: {
        label: "Molarity",
        latex: "\\text{M} = \\frac{n}{V} \\qquad m = \\text{M} \\times V \\times \\text{molar mass}",
        symbols: [
          { symbol: "M", meaning: "molarity, in mol/L" },
          { symbol: "n", meaning: "moles of solute" },
          { symbol: "V", meaning: "volume of the solution, in litres" },
          { symbol: "m", meaning: "mass of solute, in grams" },
        ],
      },
      authoredExample: {
        prompt: "20 g of sodium hydroxide, NaOH, is dissolved in water to make 500 mL of solution. Find its molarity. (Na = 23, O = 16, H = 1)",
        steps: [
          "Molar mass of NaOH \\(= 23 + 16 + 1 = 40\\) g, so moles \\(= \\frac{20}{40} = 0.5\\).",
          "Volume \\(= 500\\) mL \\(= 0.5\\) L.",
          "Molarity \\(= \\frac{0.5}{0.5} = 1\\) M.",
        ],
        answer: "1 M",
      },
      selfCheckExample: {
        prompt: "How many grams of sodium chloride, NaCl, are needed to make 250 mL of a 0.2 M solution? (Na = 23, Cl = 35.5)",
        steps: [
          "Moles \\(= 0.2 \\times 0.25 = 0.05\\).",
          "Molar mass of NaCl \\(= 58.5\\) g, so mass \\(= 0.05 \\times 58.5 = 2.925\\) g.",
        ],
        answer: "2.925 g",
      },
      practiceSet: [
        { prompt: "49 g of sulphuric acid, \\(\\mathrm{H_2SO_4}\\), is dissolved to make 1 L of solution. What is its molarity? (H = 1, S = 32, O = 16)", answer: "\\(\\frac{49}{98} = 0.5\\) M" },
        { prompt: "4 g of NaOH is dissolved to make 250 mL of solution. What is its molarity? (Na = 23, O = 16, H = 1)", answer: "\\(\\frac{0.1}{0.25} = 0.4\\) M" },
        { prompt: "How many moles of solute are there in 500 mL of a 2 M solution?", answer: "\\(2 \\times 0.5 = 1\\) mole" },
        { prompt: "In what unit is molarity measured?", answer: "Moles per litre (mol/L), written M" },
      ],
      pyqExampleId: "e2b2ba7f-eb3e-4f10-8974-7c2b9e132640",
      traps: [
        {
          title: "Leaving the volume in millilitres",
          body: "Molarity uses litres. 100 mL is 0.1 L, so 0.2 mole in 100 mL is 2 M, not 0.002 M.",
        },
        {
          title: "Dividing grams by the volume",
          body: "Molarity counts moles, not grams. Change the mass of solute into moles before dividing by the volume.",
        },
        {
          title: "Using the volume of water added",
          body: "Molarity is per litre of the final solution. Dissolve the solute and make the whole solution up to the stated volume.",
        },
      ],
    },
  ],
};
