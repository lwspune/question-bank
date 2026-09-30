import type { SubtopicNote } from "@/app/notes/_types";

export const MOLE_SBC_NOTE: SubtopicNote = {
  subtopicName: "Measurement and the Mole",
  title: "Measurement and the Mole",
  oneLineDefinition:
    "Significant figures, SI units and Dalton's postulates, then the mole: n = m/M = N/Nₐ = V/Vₘ, used to count atoms, molecules and electrons.",
  whyItMatters:
    "Twenty-two PYQs, sixteen of them multiple choice and four from 2026. Seven test measurement: significant figures, SI units, mass against weight and Dalton's postulates. Nine count the atoms, molecules or electrons in a given amount, and six convert between mass, moles and gas volume. Every later page in the chapter starts with n = m/M.",
  concepts: [
    // C1 — significant figures, SI units, Dalton
    {
      kind: "reference" as const,
      slug: "jcsbc-measurement",
      name: "Significant figures, SI units and Dalton's theory",
      intuition:
        "These are rule questions, not calculations. Count significant figures with the four zero rules, and round a product or quotient to the fewest figures in its data. The rest is a short list of definitions that the paper quotes back with one word changed.",
      definition:
        "- Non-zero digits always count. Zeros between non-zero digits always count.\n" +
        "- Leading zeros never count: \\(0.0047\\) has 2.\n" +
        "- Trailing zeros count only when there is a decimal point: \\(2.500\\) has 4.\n" +
        "- A power of ten never changes the count: \\(3.20\\times10^{5}\\) has 3.\n" +
        "- For \\(\\times\\) and \\(\\div\\), keep the fewest significant figures in the data. For \\(+\\) and \\(-\\), keep the fewest decimal places.\n" +
        "- Mass is the amount of matter; weight is the force of gravity on it. The kelvin scale has no negative values. Precision is how close repeated readings are; accuracy is how close they are to the true value.\n" +
        "- Dalton: atoms are indivisible; atoms of one element are identical in mass and properties; atoms combine in a **fixed**, simple whole-number ratio; a reaction only rearranges atoms.",
      table: {
        columns: ["Number or statement", "Rule", "Result"],
        rows: [
          { cells: ["\\(0.0047\\)", "Leading zeros never count", "2 significant figures"] },
          { cells: ["\\(3.050\\)", "Captive zeros and trailing zeros after a decimal point count", "4 significant figures"] },
          { cells: ["\\(6.20\\times10^{-4}\\)", "The power of ten is ignored", "3 significant figures"] },
          { cells: ["\\(\\frac{4.52\\times1.3}{2.001}\\)", "Keep the fewest significant figures (1.3 has 2)", "\\(2.9\\)"] },
          { cells: ["\\(12.11+0.3+1.024\\)", "Keep the fewest decimal places (0.3 has 1)", "\\(13.4\\)"] },
          { cells: ["SI base units", "Seven: m, kg, s, A, K, mol, cd", "The candela uses \\(540\\times10^{12}\\) Hz and \\(\\frac{1}{683}\\) W sr\\(^{-1}\\)"] },
          { cells: ["Dalton's combining rule", "Atoms combine in a fixed, simple whole-number ratio", "'Any ratio' is false"], noteAmber: "'Atoms are divisible' and 'atoms of one element differ in mass' are the other planted false postulates." },
          { cells: ["Mass and weight", "Mass is matter; weight is a force", "A statement that swaps them is false"] },
        ],
        caption: "A power of ten never adds or removes a significant figure.",
      },
      selfCheckExample: {
        prompt: "How many significant figures does \\(0.040600\\) have? Give \\(2.61\\times0.0320\\) to the right number of figures.",
        steps: [
          "The two leading zeros do not count; 4, 0, 6, 0, 0 do. That is 5.",
          "\\(2.61\\times0.0320=0.083520\\). Both factors have 3 significant figures, so keep 3: \\(0.0835\\).",
        ],
        answer: "5 significant figures; \\(0.0835\\).",
      },
      practiceSet: [
        { prompt: "Significant figures in \\(0.00720\\)?", answer: "3" },
        { prompt: "Significant figures in \\(4.00\\times10^{3}\\)?", answer: "3" },
        { prompt: "True or false: weight is the amount of matter in a body.", answer: "False; that is mass" },
        { prompt: "Dalton: do atoms combine in any ratio?", answer: "No; in a fixed, simple whole-number ratio" },
      ],
      pyqExampleId: "ee477cbb-0e35-4736-a30c-87b2879ff042", // 8 Apr 2023 — which numbers share a significant-figure count
      traps: [
        {
          title: "A power of ten hides no digits",
          body: "\\(50.0\\times10^{3}\\) has 3 significant figures, not 5. Count only the digits in front of the power of ten.",
        },
        {
          title: "Precision is not accuracy",
          body: "Readings of 2.31, 2.32 and 2.31 are precise even if the true value is 2.50. Precision compares readings with each other; accuracy compares them with the true value.",
        },
      ],
    },

    // C2 — counting particles
    {
      kind: "formula" as const,
      slug: "jcsbc-counting",
      name: "Counting atoms, molecules and electrons",
      intuition:
        "Find the moles first, then count. The number of molecules is \\(n\\,N_A\\). Multiply by the atoms in one formula unit to count atoms, or by the electrons in one molecule to count electrons.",
      definition:
        "- \\(N=n\\,N_A\\), with \\(N_A=6.022\\times10^{23}\\ \\mathrm{mol^{-1}}\\).\n" +
        "- Atoms \\(=n\\times\\) atoms per formula unit: \\(\\mathrm{H_2O}\\) 3, \\(\\mathrm{C_6H_{12}}\\) 18, \\(\\mathrm{C_{12}H_{22}O_{11}}\\) 45.\n" +
        "- Atoms of one element \\(=n\\times\\) its subscript: \\(\\mathrm{C_7H_5N_3O_6}\\) has 3 N atoms per molecule.\n" +
        "- Electrons \\(=n\\times\\) electrons per molecule: \\(\\mathrm{CH_4}\\) has \\(6+4=10\\), \\(\\mathrm{N_2}\\) has 14.\n" +
        "- Equal masses of different elements: the smallest atomic mass gives the most atoms.\n" +
        "- From a mass percent: mass of the element \\(=\\) percent \\(\\times\\) sample mass, then divide by its atomic mass.",
      formula: {
        label: "Number of particles",
        latex: "N=\\frac{m}{M}\\,N_A\\times(\\text{particles per formula unit})",
      },
      authoredExample: {
        prompt: "How many oxygen atoms, and how many electrons, are there in \\(8.8\\) g of \\(\\mathrm{CO_2}\\)?",
        steps: [
          "\\(n=\\frac{8.8}{44}=0.2\\) mol of \\(\\mathrm{CO_2}\\).",
          "Oxygen atoms: \\(0.2\\times2\\times6.022\\times10^{23}=2.41\\times10^{23}\\).",
          "Electrons per molecule: \\(6+2(8)=22\\). Electrons: \\(0.2\\times22\\times6.022\\times10^{23}=2.65\\times10^{24}\\).",
        ],
        answer: "\\(2.41\\times10^{23}\\) O atoms and \\(2.65\\times10^{24}\\) electrons.",
      },
      selfCheckExample: {
        prompt: "Which contains more atoms: \\(3.4\\) g of \\(\\mathrm{NH_3}\\) or \\(3.2\\) g of \\(\\mathrm{O_2}\\)?",
        steps: [
          "\\(\\mathrm{NH_3}\\): \\(\\frac{3.4}{17}=0.2\\) mol, with 4 atoms each, so \\(0.8\\) mol of atoms.",
          "\\(\\mathrm{O_2}\\): \\(\\frac{3.2}{32}=0.1\\) mol, with 2 atoms each, so \\(0.2\\) mol of atoms.",
        ],
        answer: "\\(\\mathrm{NH_3}\\), with four times as many atoms.",
      },
      practiceSet: [
        { prompt: "Atoms in one molecule of \\(\\mathrm{C_{12}H_{22}O_{11}}\\)?", answer: "45" },
        { prompt: "Moles of H atoms in \\(0.5\\) mol of \\(\\mathrm{CH_4}\\)?", answer: "2" },
        { prompt: "Electrons in one \\(\\mathrm{NH_3}\\) molecule?", answer: "10" },
        { prompt: "Most atoms in 1 g each of Na, Mg, Al, K?", answer: "Na", method: "It has the smallest atomic mass, 23." },
      ],
      pyqExampleId: "7da7d72c-23fd-4ad5-ac7b-835a4191f0ad", // 8 Apr 2026 S2 — match milligram masses to numbers of atoms
      traps: [
        {
          title: "Molecules are not atoms",
          body: "\\(0.1\\) mol of \\(\\mathrm{O_2}\\) holds \\(0.1N_A\\) molecules but \\(0.2N_A\\) atoms. Options usually offer both; read which one the question asks for.",
        },
      ],
    },

    // C3 — mass, moles, molar volume
    {
      kind: "formula" as const,
      slug: "jcsbc-mole-conversions",
      name: "Mass, moles and molar volume",
      intuition:
        "The mole links three things you can measure: a mass, a number of particles and a gas volume. For a gas, use the molar volume that matches the conditions in the stem.",
      definition:
        "- \\(n=\\frac{m}{M}=\\frac{N}{N_A}=\\frac{V}{V_m}\\).\n" +
        "- \\(V_m=22.4\\) L at 273 K and 1 atm; \\(V_m=22.7\\) L at 273.15 K and 1 bar.\n" +
        "- If the stem names no molar volume, try both: the intended one gives round numbers.\n" +
        "- Equimolar mixture: call the common amount \\(n\\) and add the masses.\n" +
        "- Two samples of equal mass: write each mass as moles \\(\\times\\) molar mass and set them equal.",
      formula: {
        label: "Mole relations",
        latex: "n=\\frac{m}{M}=\\frac{N}{N_A}=\\frac{V}{V_m}",
      },
      authoredExample: {
        prompt: "Find the mass and the number of molecules in \\(5.6\\) L of \\(\\mathrm{N_2}\\) at 273 K and 1 atm.",
        steps: [
          "\\(n=\\frac{5.6}{22.4}=0.25\\) mol.",
          "Mass \\(=0.25\\times28=7.0\\) g.",
          "Molecules \\(=0.25\\times6.022\\times10^{23}=1.51\\times10^{23}\\).",
        ],
        answer: "\\(7.0\\) g and \\(1.51\\times10^{23}\\) molecules.",
      },
      selfCheckExample: {
        prompt: "An equimolar mixture of KOH and NaOH weighs \\(9.6\\) g. Find the mass of NaOH in it.",
        steps: [
          "One mole of each together weighs \\(56+40=96\\) g.",
          "\\(n=\\frac{9.6}{96}=0.1\\) mol of each, so NaOH \\(=0.1\\times40=4.0\\) g.",
        ],
        answer: "\\(4.0\\) g.",
      },
      practiceSet: [
        { prompt: "Moles in \\(11.35\\) L of gas at 273.15 K and 1 bar?", answer: "\\(0.5\\)" },
        { prompt: "Mass of \\(0.25\\) mol of \\(\\mathrm{CaCO_3}\\)?", answer: "25 g" },
        { prompt: "Molecules in \\(0.1\\) mol?", answer: "\\(6.022\\times10^{22}\\)" },
        { prompt: "Volume of 4 g of \\(\\mathrm{CH_4}\\) at 273 K and 1 atm?", answer: "\\(5.6\\) L" },
      ],
      pyqExampleId: "0fd14b40-57ea-46b3-abec-ceef92e91485", // 4 Apr 2026 S1 — moles and molecules of SO2 from a volume at STP
      traps: [
        {
          title: "22.4 or 22.7",
          body: "The two molar volumes differ by about 1.3%, enough to change a four-figure answer. 273 K and 1 atm gives 22.4 L; 273.15 K and 1 bar gives 22.7 L.",
        },
      ],
    },
  ],
};
