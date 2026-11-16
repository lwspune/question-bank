import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SB_MOLE_NOTE: SubtopicNote = {
  subtopicName: "Mole Concept and Formulae",
  title: "Mole Concept and Formulae",
  oneLineDefinition:
    "Atomic and molecular mass, the mole and Avogadro's number (n = m/M = N/Nₐ), counting atoms in a sample, and empirical and molecular formulae from percentage composition.",
  whyItMatters:
    "Six NEET questions, five of them from 2024 or later. Three count particles: which mass of N₂ has as many molecules as 1.0 g of H₂ (Re-NEET 2024), which sample of helium has the most atoms (NEET 2024) and how many hydrogen atoms are in 5.4 g of urea (NEET 2026). One picks the samples with equal numbers of atoms (NEET 2025), and two find an empirical formula from percentages (NEET 2021 and NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchsb-mole",
      name: "Atomic mass, the mole and molar mass",
      intuition:
        "Atoms are far too small to count one by one, so chemists count them in bundles. One bundle, the mole, holds 6.022 × 10²³ particles. The bundle is chosen so that one mole of a substance weighs, in grams, the same number as one particle weighs in atomic mass units. So a mass in grams turns straight into moles, and moles turn into a number of particles.",
      definition:
        "- **Atomic mass unit:** 1 u is one-twelfth of the mass of one carbon-12 atom. Atomic masses are given relative to it.\n" +
        "- **Average atomic mass:** most elements are a mix of isotopes, so multiply each isotope's mass by its fractional abundance and add. Carbon's average atomic mass is 12.011 u.\n" +
        "- **Molecular mass** is the sum of the atomic masses in a molecule: \\(\\text{CH}_4 = 12.011 + 4(1.008) = 16.043\\) u. For an ionic solid such as NaCl the same sum is called the **formula mass**: 23.0 + 35.5 = 58.5 u.\n" +
        "- **The mole:** the amount of a substance that contains exactly \\(6.02214076 \\times 10^{23}\\) particles (atoms, molecules or ions). This is **Avogadro's number** \\(N_A\\), usually taken as \\(6.022 \\times 10^{23}\\ \\text{mol}^{-1}\\).\n" +
        "- **Molar mass** is the mass of one mole in grams. It has the same value as the atomic, molecular or formula mass in u: water is 18 u per molecule and 18 g per mole.\n" +
        "- For a gas, one mole occupies 22.7 L at STP (273.15 K and 1 bar). Older books use 22.4 L at 273 K and 1 atm.",
      formula: {
        label: "Mole relations",
        latex: "n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V}{22.7\\ \\text{L mol}^{-1}}\\ (\\text{gas at STP})",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of moles" },
          { symbol: "\\(m\\)", meaning: "mass of the sample in grams" },
          { symbol: "\\(M\\)", meaning: "molar mass in grams per mole" },
          { symbol: "\\(N\\)", meaning: "number of particles" },
          { symbol: "\\(N_A\\)", meaning: "Avogadro's number, 6.022 × 10²³ per mole" },
        ],
      },
      authoredExample: {
        prompt: "A sample of methane, \\(\\text{CH}_4\\), contains \\(3.011 \\times 10^{23}\\) molecules. Find its moles, its mass and its volume at STP.",
        steps: [
          "\\(n = \\dfrac{N}{N_A} = \\dfrac{3.011 \\times 10^{23}}{6.022 \\times 10^{23}} = 0.5\\) mol.",
          "Molar mass of \\(\\text{CH}_4 = 12 + 4(1) = 16\\) g mol\\(^{-1}\\), so mass \\(= 0.5 \\times 16 = 8\\) g.",
          "Volume at STP \\(= 0.5 \\times 22.7 = 11.35\\) L.",
        ],
        answer: "0.5 mol, 8 g and 11.35 L",
      },
      selfCheckExample: {
        prompt: "What is the mass of one molecule of water, \\(\\text{H}_2\\text{O}\\) (molar mass 18 g mol\\(^{-1}\\))?",
        steps: [
          "One mole, \\(6.022 \\times 10^{23}\\) molecules, weighs 18 g.",
          "One molecule weighs \\(\\dfrac{18}{6.022 \\times 10^{23}} = 2.99 \\times 10^{-23}\\) g.",
        ],
        answer: "\\(2.99 \\times 10^{-23}\\) g",
      },
      practiceSet: [
        { prompt: "How many moles are there in 9 g of water (molar mass 18 g mol\\(^{-1}\\))?", answer: "0.5 mol" },
        { prompt: "What is the mass of 0.25 mol of \\(\\text{CaCO}_3\\) (molar mass 100 g mol\\(^{-1}\\))?", answer: "25 g" },
        { prompt: "What volume does 0.2 mol of oxygen gas occupy at STP (273.15 K and 1 bar)?", answer: "4.54 L", method: "\\(0.2 \\times 22.7\\) L." },
        { prompt: "Chlorine is 75% chlorine-35 and 25% chlorine-37. What is its average atomic mass?", answer: "35.5 u", method: "\\(35 \\times 0.75 + 37 \\times 0.25 = 35.5\\)." },
      ],
      pyqExampleId: "b81c48ac-2330-4357-9f8b-e2fcfc7d94fc",
      traps: [
        {
          title: "u is one particle, grams is a mole",
          body: "4 u of helium is the mass of a single helium atom, but 4 g of helium is one mole, \\(6.022 \\times 10^{23}\\) atoms. Read the unit before you count.",
        },
        {
          title: "22.7 L or 22.4 L",
          body: "At STP (273.15 K and 1 bar) one mole of gas occupies 22.7 L. The older value, 22.4 L, is for 273 K and 1 atm. Use the volume the question gives or implies.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsb-atoms",
      name: "Counting atoms in a sample",
      intuition:
        "Find the moles of the substance first. That gives the number of molecules or formula units. Then multiply by how many atoms each one holds: all its atoms if the question asks for atoms in total, or the subscript of one element if it asks for that element alone.",
      definition:
        "- Number of molecules (or formula units) \\(= n \\times N_A\\).\n" +
        "- Total atoms \\(= n \\times N_A \\times\\) the number of atoms in one formula: \\(\\text{H}_2\\text{O}\\) has 3, \\(\\text{Na}_2\\text{CO}_3\\) has 6, \\(\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}\\) has 45.\n" +
        "- Atoms of one element \\(= n \\times N_A \\times\\) that element's subscript.\n" +
        "- To compare samples, compare moles of atoms; \\(N_A\\) is the same for all of them.",
      formula: {
        label: "Number of atoms",
        latex: "\\text{Atoms} = \\frac{m}{M} \\times N_A \\times (\\text{atoms per formula unit})",
      },
      authoredExample: {
        prompt: "How many atoms in all, and how many oxygen atoms, are there in 8.8 g of \\(\\text{CO}_2\\) (molar mass 44 g mol\\(^{-1}\\))?",
        steps: [
          "\\(n = \\dfrac{8.8}{44} = 0.2\\) mol of \\(\\text{CO}_2\\).",
          "Each molecule has 3 atoms, so atoms in all \\(= 0.2 \\times 3 \\times 6.022 \\times 10^{23} = 3.61 \\times 10^{23}\\).",
          "Each molecule has 2 oxygen atoms, so oxygen atoms \\(= 0.2 \\times 2 \\times 6.022 \\times 10^{23} = 2.41 \\times 10^{23}\\).",
        ],
        answer: "\\(3.61 \\times 10^{23}\\) atoms in all, of which \\(2.41 \\times 10^{23}\\) are oxygen",
      },
      selfCheckExample: {
        prompt: "How many moles of oxygen atoms, and what mass of oxygen, are there in 0.5 mol of \\(\\text{H}_2\\text{SO}_4\\)?",
        steps: [
          "One molecule of \\(\\text{H}_2\\text{SO}_4\\) has 4 oxygen atoms, so 0.5 mol has \\(0.5 \\times 4 = 2\\) mol of oxygen atoms.",
          "Mass of oxygen \\(= 2 \\times 16 = 32\\) g.",
        ],
        answer: "2 mol of oxygen atoms, 32 g",
      },
      practiceSet: [
        { prompt: "How many atoms are there in one molecule of sucrose, \\(\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}\\)?", answer: "45" },
        { prompt: "How many moles of hydrogen atoms are there in 0.5 mol of \\(\\text{CH}_4\\)?", answer: "2 mol" },
        { prompt: "How many molecules are there in 0.1 mol of water?", answer: "\\(6.022 \\times 10^{22}\\)" },
        { prompt: "How many sodium ions are there in 5.85 g of NaCl (molar mass 58.5 g mol\\(^{-1}\\))?", answer: "\\(6.022 \\times 10^{22}\\)", method: "0.1 mol of NaCl gives 0.1 mol of sodium ions." },
      ],
      pyqExampleId: "e6d54784-4a7d-4267-8e6a-3fda5a80d688",
      traps: [
        {
          title: "Molecules are not atoms",
          body: "1 mol of \\(\\text{O}_2\\) holds \\(N_A\\) molecules but \\(2N_A\\) atoms. Options often offer both numbers, so check which one the question asks for.",
        },
        {
          title: "Count every atom in the formula",
          body: "\\(\\text{Na}_2\\text{CO}_3\\) has 2 + 1 + 3 = 6 atoms, not 3. Add up all the subscripts before you multiply.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsb-empirical",
      name: "Empirical and molecular formulae",
      intuition:
        "Percentages tell you masses, but a formula is a ratio of atoms. So turn each percentage into moles of atoms by dividing by the atomic mass, then find the simplest whole-number ratio. That is the empirical formula. The molar mass then tells you how many of those units make one molecule.",
      definition:
        "- **Mass percent** of an element \\(= \\dfrac{\\text{mass of that element in one mole}}{\\text{molar mass}} \\times 100\\).\n" +
        "- The **empirical formula** is the simplest whole-number ratio of atoms. The **molecular formula** is the exact number of each atom in a molecule.\n" +
        "- **Steps:** take 100 g, so each percentage becomes grams; divide each by its atomic mass to get moles; divide every value by the smallest; if a value ends in about .5, multiply all of them by 2.\n" +
        "- \\(n = \\dfrac{\\text{molar mass}}{\\text{empirical formula mass}}\\); molecular formula \\(= (\\text{empirical formula})_n\\).",
      formula: {
        label: "Empirical to molecular formula",
        latex: "n = \\frac{\\text{molar mass}}{\\text{empirical formula mass}}, \\qquad \\text{molecular formula} = (\\text{empirical formula})_n",
      },
      authoredExample: {
        prompt: "A compound contains 4.07% hydrogen, 24.27% carbon and 71.65% chlorine. Its molar mass is 98.96 g mol\\(^{-1}\\). Find its empirical and molecular formulae (H = 1, C = 12, Cl = 35.5).",
        steps: [
          "In 100 g: moles of H \\(= \\dfrac{4.07}{1} = 4.07\\); C \\(= \\dfrac{24.27}{12} = 2.02\\); Cl \\(= \\dfrac{71.65}{35.5} = 2.02\\).",
          "Divide by the smallest, 2.02: H : C : Cl = 2 : 1 : 1. Empirical formula \\(\\text{CH}_2\\text{Cl}\\).",
          "Empirical formula mass \\(= 12 + 2 + 35.5 = 49.5\\); \\(n = \\dfrac{98.96}{49.5} = 2\\).",
          "Molecular formula \\(= (\\text{CH}_2\\text{Cl})_2 = \\text{C}_2\\text{H}_4\\text{Cl}_2\\).",
        ],
        answer: "Empirical formula \\(\\text{CH}_2\\text{Cl}\\), molecular formula \\(\\text{C}_2\\text{H}_4\\text{Cl}_2\\)",
      },
      selfCheckExample: {
        prompt: "Find the mass percent of carbon in ethanol, \\(\\text{C}_2\\text{H}_5\\text{OH}\\) (C = 12, H = 1, O = 16).",
        steps: [
          "Molar mass \\(= 2(12) + 6(1) + 16 = 46\\) g mol\\(^{-1}\\).",
          "Carbon in one mole \\(= 2 \\times 12 = 24\\) g, so mass percent \\(= \\dfrac{24}{46} \\times 100 = 52.2\\%\\).",
        ],
        answer: "52.2%",
      },
      practiceSet: [
        { prompt: "What is the empirical formula of glucose, \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\)?", answer: "\\(\\text{CH}_2\\text{O}\\)" },
        { prompt: "A compound has the empirical formula \\(\\text{CH}_2\\) and molar mass 42 g mol\\(^{-1}\\). What is its molecular formula?", answer: "\\(\\text{C}_3\\text{H}_6\\)" },
        { prompt: "What is the mass percent of oxygen in water (H = 1, O = 16)?", answer: "88.9%" },
        { prompt: "The mole ratio of carbon to hydrogen in a compound is 1 : 1.5. What is its empirical formula?", answer: "\\(\\text{C}_2\\text{H}_3\\)", method: "Multiply both by 2 to reach whole numbers." },
      ],
      pyqExampleId: "278ba814-7407-4099-ba2c-f45794f8887b",
      traps: [
        {
          title: "Percentages are masses, not atoms",
          body: "Divide each percentage by the atomic mass before you compare. Comparing the percentages directly gives a mass ratio, not the ratio of atoms a formula needs.",
        },
        {
          title: "Do not round 1.5 to a whole number",
          body: "A mole ratio such as 1 : 1.5 is not 1 : 1 or 1 : 2. Multiply every value by 2 to get 2 : 3.",
        },
      ],
    },
  ],
};
