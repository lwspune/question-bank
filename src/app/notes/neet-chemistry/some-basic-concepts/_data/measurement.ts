import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SB_MEASUREMENT_NOTE: SubtopicNote = {
  subtopicName: "Measurement and Chemical Laws",
  title: "Measurement and Chemical Laws",
  oneLineDefinition:
    "SI units, significant figures and the rules for rounding off, then the laws of chemical combination and Dalton's atomic theory.",
  whyItMatters:
    "Two NEET questions, one on each half of this page. Re-NEET 2026 rounded 17.0145 and 21.0235 to three decimal places, and NEET 2025 asked which law Dalton's atomic theory could not explain. Both are rule questions: learn the rule once and the mark is safe.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchsb-sig-figs",
      name: "Significant figures and rounding off",
      intuition:
        "Every measurement has some uncertainty, so we write only the digits we are sure of plus one last digit that is a little uncertain. These are the significant figures. A few rules tell you which zeros count, how many figures an answer can keep after a calculation, and how to drop the extra digits.",
      definition:
        "- **SI base units** (seven): metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd).\n" +
        "- All non-zero digits are significant. Zeros between two non-zero digits are significant.\n" +
        "- Zeros to the left of the first non-zero digit are not significant: \\(0.0052\\) has 2.\n" +
        "- Zeros at the right are significant only when the number has a decimal point: 100 has 1, but 100.0 has 4.\n" +
        "- In scientific notation every digit shown counts: \\(4.01 \\times 10^{2}\\) has 3.\n" +
        "- Exact counted numbers (2 balls, 20 eggs) have an infinite number of significant figures.\n" +
        "- **Multiplying or dividing:** keep as many significant figures as the value with the fewest. **Adding or subtracting:** keep as many decimal places as the value with the fewest.\n" +
        "- **Rounding off:** if the digit removed is more than 5, raise the digit before it by one; if it is less than 5, leave it. If it is exactly 5, leave the digit before it when that digit is even and raise it by one when it is odd.",
      table: {
        columns: ["Number or calculation", "Rule used", "Result"],
        rows: [
          { cells: ["\\(0.0052\\)", "Zeros before the first non-zero digit do not count", "2 significant figures"] },
          { cells: ["\\(2.005\\)", "Zeros between non-zero digits count", "4 significant figures"] },
          { cells: ["\\(0.200\\)", "Zeros at the right count after a decimal point", "3 significant figures"] },
          { cells: ["\\(100\\)", "Zeros at the right without a decimal point do not count", "1 significant figure"] },
          { cells: ["\\(4.62 \\times 0.31 = 1.4322\\)", "Fewest significant figures (0.31 has 2)", "\\(1.4\\)"] },
          { cells: ["\\(12.11 + 18.0 + 1.012 = 31.122\\)", "Fewest decimal places (18.0 has 1)", "\\(31.1\\)"] },
          { cells: ["\\(1.386\\) to two decimal places", "Digit removed is 6, more than 5: raise", "\\(1.39\\)"] },
          { cells: ["\\(4.334\\) to two decimal places", "Digit removed is 4, less than 5: leave", "\\(4.33\\)"] },
          {
            cells: ["\\(6.35\\) and \\(6.25\\) to one decimal place", "Digit removed is 5: raise an odd digit, leave an even one", "\\(6.4\\) and \\(6.2\\)"],
            pyqExampleId: "4aeffdd4-ca44-4f21-8546-cf0e21084c54",
            noteAmber: "Re-NEET 2026: 17.0145 became 17.014 (4 is even) and 21.0235 became 21.024 (3 is odd).",
          },
        ],
        caption: "A power of ten never adds or removes a significant figure.",
      },
      pyqExampleId: "4aeffdd4-ca44-4f21-8546-cf0e21084c54",
      selfCheckExample: {
        prompt: "How many significant figures are there in 0.00340, and how many in 100.0?",
        steps: [
          "In 0.00340 the three zeros in front do not count. The 3, the 4 and the last zero (after a decimal point) do: 3 significant figures.",
          "In 100.0 there is a decimal point, so every zero counts: 4 significant figures.",
        ],
        answer: "3 in 0.00340 and 4 in 100.0",
      },
      practiceSet: [
        { prompt: "How many significant figures are there in 0.0306?", answer: "3" },
        { prompt: "How many significant figures are there in \\(5.00 \\times 10^{4}\\)?", answer: "3" },
        { prompt: "Give \\(3.2 \\times 1.111\\) to the correct number of significant figures.", answer: "\\(3.6\\)", method: "The product is 3.5552; 3.2 has only 2 significant figures, so keep 2." },
        { prompt: "Round 2.346 to two decimal places.", answer: "2.35" },
        { prompt: "Which SI base unit measures the amount of substance?", answer: "The mole (mol)" },
      ],
      traps: [
        {
          title: "An exact 5 is not always rounded up",
          body: "When the digit removed is exactly 5, look at the digit before it. Raise it only if it is odd: 6.35 becomes 6.4, but 6.25 becomes 6.2.",
        },
        {
          title: "The decimal point makes trailing zeros count",
          body: "100 has one significant figure, but 100.0 has four. Zeros at the right of a number count only when a decimal point is written.",
        },
        {
          title: "Two different rules for answers",
          body: "For multiplying and dividing, count significant figures. For adding and subtracting, count decimal places. 12.11 + 18.0 + 1.012 is reported as 31.1 because 18.0 has one decimal place.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchsb-laws",
      name: "Laws of chemical combination and Dalton's theory",
      intuition:
        "Before anyone could see atoms, chemists found that elements combine by fixed rules of mass and volume. Dalton's atomic theory explained the mass rules: if matter is made of atoms of fixed mass that join in whole numbers, fixed mass ratios must follow. It could not explain why gases react in simple ratios by volume.",
      definition:
        "- **Conservation of mass** (Lavoisier): matter can neither be created nor destroyed, so the total mass of the products equals the total mass of the reactants.\n" +
        "- **Definite proportions** (Proust): a given compound always contains exactly the same proportion of elements by weight, wherever it comes from.\n" +
        "- **Multiple proportions** (Dalton): if two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a small whole-number ratio.\n" +
        "- **Gay Lussac's law of gaseous volumes:** gases combine, or are produced, in a simple whole-number ratio by volume, when all volumes are measured at the same temperature and pressure.\n" +
        "- **Avogadro's law:** equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules.\n" +
        "- **Dalton's atomic theory (1808):** matter is made of indivisible atoms; all atoms of an element are identical, including in mass, and differ from atoms of other elements; compounds form when atoms of different elements combine in a fixed ratio; a reaction only reorganises atoms, which are neither created nor destroyed.\n" +
        "- Dalton's theory explained the laws of chemical combination by mass, but **not the law of gaseous volumes**.",
      table: {
        columns: ["Law", "What it says", "Example"],
        rows: [
          { cells: ["Conservation of mass", "Total mass of products equals total mass of reactants", "2 g of hydrogen and 16 g of oxygen give 18 g of water"] },
          { cells: ["Definite proportions", "One compound always has the same mass ratio of its elements", "Copper carbonate from nature and from the laboratory have the same percentages of copper, carbon and oxygen"] },
          { cells: ["Multiple proportions", "Two compounds of the same two elements: masses of one element with a fixed mass of the other are in a simple ratio", "2 g of hydrogen combines with 16 g of oxygen in water and 32 g in hydrogen peroxide: 16 : 32 = 1 : 2"] },
          { cells: ["Gaseous volumes (Gay Lussac)", "Gases react in a simple ratio by volume at the same temperature and pressure", "100 mL of hydrogen and 50 mL of oxygen give 100 mL of water vapour: 2 : 1 : 2"] },
          { cells: ["Avogadro's law", "Equal volumes of gases at the same temperature and pressure hold equal numbers of molecules", "Two flasks of the same size, at the same temperature and pressure, hold the same number of moles of any gas"] },
          {
            cells: ["Dalton's atomic theory", "Explains the three mass laws above", "Cannot explain the law of gaseous volumes"],
            pyqExampleId: "af318b9d-a119-4f00-9f89-96eac921091d",
            noteAmber: "NEET 2025: asked which law Dalton's theory could not explain. The answer was the law of gaseous volumes.",
          },
        ],
      },
      pyqExampleId: "af318b9d-a119-4f00-9f89-96eac921091d",
      selfCheckExample: {
        prompt: "Carbon forms CO and CO₂. In CO, 12 g of carbon is joined to 16 g of oxygen; in CO₂, 12 g of carbon is joined to 32 g of oxygen. Which law does this show, and what is the ratio?",
        steps: [
          "The same two elements form two compounds, and the mass of carbon is fixed at 12 g.",
          "The masses of oxygen are 16 g and 32 g, a simple ratio of 1 : 2.",
        ],
        answer: "The law of multiple proportions, with oxygen in the ratio 1 : 2",
      },
      practiceSet: [
        { prompt: "Who stated the law of definite proportions?", answer: "Joseph Proust" },
        { prompt: "10 g of A reacts completely with 5 g of B and forms only C. What mass of C forms?", answer: "15 g", method: "Law of conservation of mass." },
        { prompt: "Which law says that equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules?", answer: "Avogadro's law" },
        { prompt: "According to Dalton's atomic theory, can atoms be created or destroyed in a chemical reaction?", answer: "No; a reaction only reorganises atoms" },
      ],
      traps: [
        {
          title: "Definite and multiple proportions are different laws",
          body: "Definite proportions is about one compound: its mass ratio never changes. Multiple proportions compares two compounds of the same two elements, such as water and hydrogen peroxide.",
        },
        {
          title: "Dalton's theory fails on gas volumes",
          body: "Dalton's atomic theory explains the laws by mass but not Gay Lussac's law of gaseous volumes. Avogadro's idea that equal volumes of gases hold equal numbers of molecules accounts for those simple volume ratios.",
        },
      ],
    },
  ],
};
