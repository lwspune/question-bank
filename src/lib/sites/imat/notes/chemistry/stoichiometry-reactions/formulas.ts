import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_STO_FORMULAS_NOTE: SubtopicNote = {
  subtopicName: "Formulas from Composition",
  title: "Percentage Composition, Empirical and Molecular Formulas",
  oneLineDefinition:
    "The masses of the elements in a compound, turned into moles, give the simplest whole-number ratio of atoms; the molar mass then gives the real formula.",
  whyItMatters:
    "Finding a formula from masses appears in 2015, 2019 and 2021: a hydrocarbon from its carbon content, a compound of carbon, hydrogen and oxygen, and an oxide of a metal. The options are usually formulas that differ only in their ratios.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sto-percent-mass",
      name: "Percentage by mass of an element in a compound",
      intuition:
        "Every formula unit of a compound has the same make-up, so the share of the mass that belongs to one element is fixed. Work it out for one formula unit and it holds for any sample, from a milligram to a tonne.",
      definition:
        "- **Percentage by mass** of an element: the mass of that element in one formula unit divided by the formula mass, times 100.\n" +
        "- Multiply the element's \\(A_r\\) by the **number of its atoms** in the formula.\n" +
        "- The mass of an element in any sample is the sample mass times that fraction.\n" +
        "- This is the **law of definite proportions**: a pure compound always has the same composition by mass, however it was made.",
      formula: {
        label: "Percentage by mass",
        latex: "\\%\\,\\text{element} = \\frac{x \\times A_r}{M_r} \\times 100",
        symbols: [
          { symbol: "\\(x\\)", meaning: "number of atoms of the element in the formula" },
          { symbol: "\\(A_r\\)", meaning: "relative atomic mass of the element" },
          { symbol: "\\(M_r\\)", meaning: "relative formula mass of the compound" },
        ],
      },
      authoredExample: {
        prompt:
          "Ammonium nitrate, \\(\\mathrm{NH_4NO_3}\\), is used as a fertiliser. What percentage of its mass is nitrogen? (N = 14, H = 1, O = 16)",
        steps: [
          "\\(M_r = 14 + 4 + 14 + 3 \\times 16 = 80\\).",
          "There are 2 nitrogen atoms: \\(2 \\times 14 = 28\\).",
          "\\(28 / 80 \\times 100 = 35\\%\\).",
        ],
        answer: "35%",
      },
      selfCheckExample: {
        prompt:
          "What mass of iron is contained in 40 g of iron(III) oxide, \\(\\mathrm{Fe_2O_3}\\)? (Fe = 56, O = 16)",
        options: ["28 g", "14 g", "16 g", "12 g", "20 g"],
        steps: [
          "\\(M_r = 2 \\times 56 + 3 \\times 16 = 160\\), and iron makes up \\(112/160 = 0.70\\) of the mass.",
          "Mass of iron: \\(0.70 \\times 40 = 28\\ \\text{g}\\).",
          "B counts only one iron atom. C uses the share of atoms (2 out of 5) instead of the share of mass. D is the mass of oxygen. E assumes the mass is split equally.",
        ],
        answer: "(A) 28 g",
      },
      practiceSet: [
        { prompt: "What percentage of the mass of carbon dioxide is carbon? (C = 12, O = 16)", answer: "About 27%", method: "\\(12/44 \\times 100\\)" },
        { prompt: "What percentage of the mass of water is hydrogen?", answer: "About 11%", method: "\\(2/18 \\times 100\\)" },
        { prompt: "What mass of sulfur is in 64 g of sulfur dioxide? (S = 32, O = 16)", answer: "32 g", method: "Sulfur is half the mass of \\(\\mathrm{SO_2}\\)" },
        { prompt: "What percentage of the mass of urea, \\(\\mathrm{CO(NH_2)_2}\\), is nitrogen? (\\(M_r = 60\\))", answer: "About 47%", method: "\\(28/60 \\times 100\\)" },
      ],
      traps: [
        {
          title: "Share of atoms is not share of mass",
          body: "Two of the five atoms in \\(\\mathrm{Fe_2O_3}\\) are iron, but iron is 70% of the mass, not 40%, because an iron atom is much heavier than an oxygen atom. Always weight each atom by its \\(A_r\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-empirical",
      name: "Empirical formula from masses or percentages",
      intuition:
        "A formula is a ratio of atoms, but analysis gives a ratio of masses. Dividing each mass by its atomic mass turns masses into moles, and moles are proportional to numbers of atoms. Then you only need to tidy the ratio into small whole numbers.",
      definition:
        "The **empirical formula** is the simplest whole-number ratio of atoms in a compound. To find it:\n" +
        "- Write the mass of each element (with percentages, take a 100 g sample so each percentage becomes grams).\n" +
        "- If one element's mass is missing, it is the total minus the others.\n" +
        "- Divide each mass by its \\(A_r\\) to get moles.\n" +
        "- Divide every result by the **smallest** one.\n" +
        "- If a value ends in .5, double everything; if it ends in .33 or .67, triple everything.",
      formula: {
        label: "Mole ratio of elements",
        latex: "\\text{ratio of atoms} = \\frac{m_1}{A_{r,1}} : \\frac{m_2}{A_{r,2}} : \\dots",
        symbols: [
          { symbol: "\\(m_1, m_2\\)", meaning: "masses of each element in the sample, in g" },
          { symbol: "\\(A_{r,1}, A_{r,2}\\)", meaning: "their relative atomic masses" },
        ],
      },
      authoredExample: {
        prompt:
          "A compound contains 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. Find its empirical formula. (C = 12, H = 1, O = 16)",
        steps: [
          "Take 100 g: 40.0 g C, 6.7 g H, 53.3 g O.",
          "Moles: C \\(40.0/12 = 3.33\\); H \\(6.7/1 = 6.7\\); O \\(53.3/16 = 3.33\\).",
          "Divide by the smallest (3.33): C 1, H 2.0, O 1.",
          "Empirical formula: \\(\\mathrm{CH_2O}\\).",
        ],
        answer: "\\(\\mathrm{CH_2O}\\)",
      },
      selfCheckExample: {
        prompt:
          "When 2.08 g of chromium is heated in oxygen, it combines with 0.96 g of oxygen to form a single oxide. What is the empirical formula of the oxide? (Cr = 52, O = 16)",
        options: [
          "\\(\\mathrm{CrO}\\)",
          "\\(\\mathrm{Cr_2O_3}\\)",
          "\\(\\mathrm{CrO_3}\\)",
          "\\(\\mathrm{Cr_3O_2}\\)",
          "\\(\\mathrm{CrO_2}\\)",
        ],
        steps: [
          "Moles: Cr \\(2.08/52 = 0.040\\); O \\(0.96/16 = 0.060\\).",
          "Divide by 0.040: Cr 1, O 1.5. Double to whole numbers: 2 : 3.",
          "A rounds 1.5 down to 1. D turns the ratio upside down. C and E are real chromium oxides, but not with these masses.",
        ],
        answer: "(B) \\(\\mathrm{Cr_2O_3}\\)",
      },
      practiceSet: [
        { prompt: "2.4 g of magnesium combines with 1.6 g of oxygen. What is the empirical formula? (Mg = 24, O = 16)", answer: "\\(\\mathrm{MgO}\\)", method: "0.10 mol : 0.10 mol" },
        { prompt: "A hydrocarbon is 75% carbon and 25% hydrogen by mass. What is its empirical formula?", answer: "\\(\\mathrm{CH_4}\\)", method: "\\(75/12 = 6.25\\) and \\(25/1 = 25\\), ratio 1 : 4" },
        { prompt: "An oxide contains 1.4 g of nitrogen and 3.2 g of oxygen. What is its empirical formula? (N = 14, O = 16)", answer: "\\(\\mathrm{NO_2}\\)", method: "0.10 : 0.20" },
        { prompt: "A mole ratio comes out as 1 : 1.33. What whole-number ratio is it?", answer: "3 : 4", method: "Multiply both by 3" },
      ],
      traps: [
        {
          title: "Do not round 1.5 or 1.33 to the nearest whole number",
          body: "A ratio of 1 : 1.5 is 2 : 3, and 1 : 1.33 is 3 : 4. Rounding them to 1 : 1 or 1 : 2 gives a wrong formula, and IMAT lists those wrong formulas as options. Only values within about 0.1 of a whole number may be rounded.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-molecular",
      name: "Molecular formula from the empirical formula and molar mass",
      intuition:
        "The empirical formula is only a ratio: \\(\\mathrm{CH_2}\\), \\(\\mathrm{C_2H_4}\\) and \\(\\mathrm{C_6H_{12}}\\) all share it. To pick the real molecule you need its molar mass. The molecular formula is a whole-number multiple of the empirical formula, and the molar mass tells you which multiple.",
      definition:
        "- The **molecular formula** gives the actual number of each atom in one molecule.\n" +
        "- It is \\(n\\) times the empirical formula, where \\(n\\) is a whole number.\n" +
        "- \\(n\\) is the molar mass divided by the empirical formula mass.\n" +
        "- Without a molar mass, any multiple is possible: a question can only ask which formula **could** be the molecular formula. Check each option by reducing it to its simplest ratio.\n" +
        "- Ionic compounds have no molecules, so their formula is always the empirical one (NaCl, \\(\\mathrm{Al_2O_3}\\)).",
      formula: {
        label: "Molecular formula multiplier",
        latex: "n = \\frac{M_r(\\text{compound})}{M_r(\\text{empirical formula})}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "whole number that multiplies every subscript" },
        ],
      },
      authoredExample: {
        prompt:
          "A hydrocarbon has the empirical formula \\(\\mathrm{CH_2}\\) and a molar mass of 84 g/mol. What is its molecular formula? (C = 12, H = 1)",
        steps: [
          "Empirical formula mass: \\(12 + 2 = 14\\).",
          "\\(n = 84 / 14 = 6\\).",
          "Multiply every subscript by 6: \\(\\mathrm{C_6H_{12}}\\).",
        ],
        answer: "\\(\\mathrm{C_6H_{12}}\\)",
      },
      selfCheckExample: {
        prompt:
          "5.6 g of a hydrocarbon contains 4.8 g of carbon. Which of the following could be its molecular formula? (C = 12, H = 1)",
        options: [
          "\\(\\mathrm{CH_4}\\)",
          "\\(\\mathrm{C_2H_6}\\)",
          "\\(\\mathrm{C_3H_8}\\)",
          "\\(\\mathrm{C_2H_2}\\)",
          "\\(\\mathrm{C_3H_6}\\)",
        ],
        steps: [
          "Hydrogen is the rest: \\(5.6 - 4.8 = 0.8\\ \\text{g}\\).",
          "Moles: C \\(4.8/12 = 0.40\\); H \\(0.8/1 = 0.8\\). Ratio 1 : 2, so the empirical formula is \\(\\mathrm{CH_2}\\).",
          "Only \\(\\mathrm{C_3H_6}\\) reduces to \\(\\mathrm{CH_2}\\). The others reduce to \\(\\mathrm{CH_4}\\), \\(\\mathrm{CH_3}\\), \\(\\mathrm{C_3H_8}\\) and \\(\\mathrm{CH}\\).",
        ],
        answer: "(E) \\(\\mathrm{C_3H_6}\\)",
      },
      practiceSet: [
        { prompt: "Empirical formula \\(\\mathrm{CH_2O}\\), molar mass 180 g/mol. Molecular formula?", answer: "\\(\\mathrm{C_6H_{12}O_6}\\)", method: "\\(180/30 = 6\\)" },
        { prompt: "Empirical formula \\(\\mathrm{NO_2}\\), molar mass 92 g/mol. Molecular formula?", answer: "\\(\\mathrm{N_2O_4}\\)", method: "\\(92/46 = 2\\)" },
        { prompt: "Empirical formula \\(\\mathrm{C_2H_5}\\), molar mass 58 g/mol. Molecular formula?", answer: "\\(\\mathrm{C_4H_{10}}\\)", method: "\\(58/29 = 2\\)" },
      ],
      traps: [
        {
          title: "Different compounds can share one empirical formula",
          body: "Ethyne \\(\\mathrm{C_2H_2}\\) and benzene \\(\\mathrm{C_6H_6}\\) both have the empirical formula CH. Analysis by mass cannot tell them apart; only the molar mass can. And sometimes the two formulas are the same, as in methane, \\(\\mathrm{CH_4}\\).",
        },
      ],
    },
  ],
};
