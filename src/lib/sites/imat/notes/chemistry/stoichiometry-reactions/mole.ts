import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_STO_MOLE_NOTE: SubtopicNote = {
  subtopicName: "The Mole Concept",
  title: "The Mole, Molar Mass and Avogadro's Number",
  oneLineDefinition:
    "A mole is a fixed count of particles, 6.02 × 10²³ of them, and the molar mass turns a mass in grams into that count.",
  whyItMatters:
    "Counting particles in a given mass appears in 2012, 2013, 2017 and 2024. The 2024 ministry question asked how many atoms are in a small mass of a gas made of two-atom molecules, so the trap was the factor of two.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sto-relative-mass",
      name: "Relative atomic mass, relative formula mass and molar mass",
      intuition:
        "Atoms are far too light to weigh in grams, so chemists compare them with a standard: one twelfth of a carbon-12 atom. A formula tells you which atoms are in one unit of a substance, so adding their relative masses gives the mass of that unit. The same number, in grams, is the mass of one mole.",
      definition:
        "- **Relative atomic mass** \\(A_r\\): the average mass of an atom of an element (over its isotopes) compared with one twelfth of the mass of a carbon-12 atom. It has no unit; in atomic mass units it is written in u.\n" +
        "- **Relative formula mass** \\(M_r\\): the sum of the \\(A_r\\) values of all the atoms in the formula. For molecules it is also called the relative molecular mass.\n" +
        "- **Molar mass** \\(M\\): the mass of one mole of the substance. It has the same number as \\(M_r\\), with the unit g/mol.\n" +
        "- A number in front of a bracket, or after a bracket, multiplies **everything** inside it. In a hydrate such as \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\), the water counts too.",
      formula: {
        label: "Relative formula mass",
        latex: "M_r = \\sum (\\text{number of atoms} \\times A_r)",
        symbols: [
          { symbol: "\\(M_r\\)", meaning: "relative formula mass (no unit)" },
          { symbol: "\\(A_r\\)", meaning: "relative atomic mass of each element" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the molar mass of blue copper(II) sulfate crystals, \\(\\mathrm{CuSO_4 \\cdot 5H_2O}\\). Use \\(A_r\\): Cu = 63.5, S = 32, O = 16, H = 1.",
        steps: [
          "The salt part: \\(63.5 + 32 + 4 \\times 16 = 159.5\\).",
          "One water molecule: \\(2 \\times 1 + 16 = 18\\). Five of them: \\(5 \\times 18 = 90\\).",
          "Add them: \\(159.5 + 90 = 249.5\\), so \\(M = 249.5\\ \\text{g/mol}\\).",
        ],
        answer: "\\(249.5\\ \\text{g/mol}\\)",
      },
      selfCheckExample: {
        prompt:
          "What is the relative formula mass of aluminium sulfate, \\(\\mathrm{Al_2(SO_4)_3}\\)? Use \\(A_r\\): Al = 27, S = 32, O = 16.",
        options: ["150", "214", "315", "342", "123"],
        steps: [
          "One sulfate group: \\(32 + 4 \\times 16 = 96\\). Three of them: \\(288\\).",
          "Two aluminium atoms: \\(2 \\times 27 = 54\\). Total: \\(54 + 288 = 342\\).",
          "Option A ignores the 3 outside the bracket. B multiplies only the sulfur by 3. C uses one aluminium. E is \\(\\mathrm{AlSO_4}\\).",
        ],
        answer: "(D) 342",
      },
      practiceSet: [
        { prompt: "What is the \\(M_r\\) of carbon dioxide? (C = 12, O = 16)", answer: "44", method: "\\(12 + 2 \\times 16\\)" },
        { prompt: "What is the \\(M_r\\) of calcium hydroxide, \\(\\mathrm{Ca(OH)_2}\\)? (Ca = 40, O = 16, H = 1)", answer: "74", method: "\\(40 + 2 \\times 17\\)" },
        { prompt: "What is the molar mass of sodium chloride? (Na = 23, Cl = 35.5)", answer: "58.5 g/mol", method: "\\(23 + 35.5\\)" },
        { prompt: "What is the \\(M_r\\) of ammonium sulfate, \\(\\mathrm{(NH_4)_2SO_4}\\)? (N = 14, H = 1, S = 32, O = 16)", answer: "132", method: "\\(2 \\times 18 + 32 + 64\\)" },
      ],
      traps: [
        {
          title: "A bracket multiplies everything inside it",
          body: "In \\(\\mathrm{Ca(NO_3)_2}\\) there are 2 nitrogen atoms and 6 oxygen atoms, not 1 and 3. Forgetting the number outside the bracket gives a formula mass that is too small, and that wrong value is usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-moles-mass",
      name: "Amount of substance: moles from a mass",
      intuition:
        "Equations count particles, but a balance measures grams. The molar mass is the exchange rate between the two: one mole of any substance has a mass in grams equal to its formula mass. Divide a mass by the molar mass and you know how many moles, and so how many particles, you have.",
      definition:
        "- The **mole** (mol) is the SI unit of **amount of substance**: one mole contains exactly \\(6.022 \\times 10^{23}\\) particles.\n" +
        "- Moles from mass: divide the mass in grams by the molar mass in g/mol.\n" +
        "- Mass from moles: multiply the moles by the molar mass.\n" +
        "- Convert kilograms and milligrams to **grams** first: \\(1\\ \\text{kg} = 1000\\ \\text{g}\\), \\(1\\ \\text{mg} = 10^{-3}\\ \\text{g}\\).\n" +
        "- The sample with the largest mass does not always have the most moles: a light molecule gives many moles per gram.",
      formula: {
        label: "Moles from mass",
        latex: "n = \\frac{m}{M}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "amount of substance, in mol" },
          { symbol: "\\(m\\)", meaning: "mass, in g" },
          { symbol: "\\(M\\)", meaning: "molar mass, in g/mol" },
        ],
      },
      authoredExample: {
        prompt:
          "(a) How many moles are in 4.9 g of sulfuric acid, \\(\\mathrm{H_2SO_4}\\) (\\(M = 98\\ \\text{g/mol}\\))? (b) What is the mass of 0.25 mol of calcium carbonate (\\(M = 100\\ \\text{g/mol}\\))?",
        steps: [
          "(a) \\(n = m/M = 4.9 / 98 = 0.050\\ \\text{mol}\\).",
          "(b) \\(m = n \\times M = 0.25 \\times 100 = 25\\ \\text{g}\\).",
        ],
        answer: "(a) 0.050 mol; (b) 25 g",
      },
      selfCheckExample: {
        prompt:
          "Which sample contains the greatest amount of substance (the most moles)? Use \\(A_r\\): H = 1, C = 12, N = 14, O = 16, Ca = 40.",
        options: [
          "100 g of calcium carbonate, \\(\\mathrm{CaCO_3}\\)",
          "9.0 g of water",
          "24 g of oxygen, \\(\\mathrm{O_2}\\)",
          "7.0 g of nitrogen, \\(\\mathrm{N_2}\\)",
          "3.0 g of hydrogen, \\(\\mathrm{H_2}\\)",
        ],
        steps: [
          "Divide each mass by its molar mass: \\(\\mathrm{CaCO_3}\\) \\(100/100 = 1.0\\); water \\(9.0/18 = 0.50\\); \\(\\mathrm{O_2}\\) \\(24/32 = 0.75\\); \\(\\mathrm{N_2}\\) \\(7.0/28 = 0.25\\); \\(\\mathrm{H_2}\\) \\(3.0/2 = 1.5\\).",
          "Hydrogen has the most moles, though it is the lightest sample.",
          "Option A is the trap: the largest mass, but a heavy formula unit, so only 1.0 mol.",
        ],
        answer: "(E) 3.0 g of hydrogen",
      },
      practiceSet: [
        { prompt: "How many moles are in 9.0 g of water? (\\(M = 18\\ \\text{g/mol}\\))", answer: "0.50 mol", method: "\\(9.0 / 18\\)" },
        { prompt: "What is the mass of 2.5 mol of sodium hydroxide? (\\(M = 40\\ \\text{g/mol}\\))", answer: "100 g", method: "\\(2.5 \\times 40\\)" },
        { prompt: "How many moles are in 1.0 kg of calcium carbonate? (\\(M = 100\\ \\text{g/mol}\\))", answer: "10 mol", method: "\\(1000 / 100\\)" },
      ],
      traps: [
        {
          title: "Kilograms must become grams before you divide",
          body: "Molar masses are in grams per mole. Dividing a mass in kilograms by a molar mass gives an answer 1000 times too small. Convert first: 3.2 kg is 3200 g.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-avogadro",
      name: "Avogadro's number: counting molecules and atoms",
      intuition:
        "Once you have moles, the number of particles is just moles times Avogadro's number. The question then is which particles are being counted. One mole of water molecules contains two moles of hydrogen atoms, so counting atoms means one more multiplication by the number of those atoms in the formula.",
      definition:
        "- **Avogadro's number** (the Avogadro constant) \\(N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}\\): the number of particles in one mole.\n" +
        "- Number of formula units or molecules: \\(N = n \\times N_A\\).\n" +
        "- Number of atoms of one element: multiply again by how many of those atoms are in the formula.\n" +
        "- Many elements exist as **diatomic molecules**: \\(\\mathrm{H_2}\\), \\(\\mathrm{N_2}\\), \\(\\mathrm{O_2}\\), \\(\\mathrm{F_2}\\), \\(\\mathrm{Cl_2}\\), \\(\\mathrm{Br_2}\\), \\(\\mathrm{I_2}\\). Noble gases exist as single atoms.\n" +
        "- Equal moles of any gases at the same temperature and pressure take up equal volumes (Avogadro's law; see States of Matter and Gas Laws).",
      formula: {
        label: "Number of particles",
        latex: "N = n \\times N_A = \\frac{m}{M} \\times N_A",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of particles (molecules or formula units)" },
          { symbol: "\\(N_A\\)", meaning: "Avogadro's number, \\(6.02 \\times 10^{23}\\ \\text{mol}^{-1}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "How many oxygen atoms are there in 8.8 g of carbon dioxide? (C = 12, O = 16, \\(N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}\\))",
        steps: [
          "Moles of \\(\\mathrm{CO_2}\\): \\(8.8 / 44 = 0.20\\ \\text{mol}\\).",
          "Molecules: \\(0.20 \\times 6.02 \\times 10^{23} = 1.20 \\times 10^{23}\\).",
          "Each molecule has 2 oxygen atoms: \\(2 \\times 1.20 \\times 10^{23} = 2.4 \\times 10^{23}\\).",
        ],
        answer: "About \\(2.4 \\times 10^{23}\\) oxygen atoms",
      },
      selfCheckExample: {
        prompt:
          "How many hydrogen atoms are there in 1.7 g of ammonia, \\(\\mathrm{NH_3}\\)? (N = 14, H = 1, \\(N_A = 6.0 \\times 10^{23}\\ \\text{mol}^{-1}\\))",
        options: [
          "\\(6.0 \\times 10^{22}\\)",
          "\\(1.8 \\times 10^{22}\\)",
          "\\(1.8 \\times 10^{23}\\)",
          "\\(2.4 \\times 10^{23}\\)",
          "\\(1.0 \\times 10^{24}\\)",
        ],
        steps: [
          "Moles of ammonia: \\(1.7 / 17 = 0.10\\ \\text{mol}\\), so \\(0.10 \\times 6.0 \\times 10^{23} = 6.0 \\times 10^{22}\\) molecules.",
          "Three hydrogen atoms per molecule: \\(3 \\times 6.0 \\times 10^{22} = 1.8 \\times 10^{23}\\).",
          "A counts molecules, not hydrogen atoms. B slips a power of ten. D counts all four atoms. E multiplies the mass by \\(N_A\\) without dividing by the molar mass.",
        ],
        answer: "(C) \\(1.8 \\times 10^{23}\\)",
      },
      practiceSet: [
        { prompt: "How many atoms are in 0.50 mol of neon gas?", answer: "\\(3.0 \\times 10^{23}\\)", method: "Neon is monatomic: \\(0.50 \\times 6.02 \\times 10^{23}\\)" },
        { prompt: "How many molecules are in 3.6 g of water? (\\(M = 18\\ \\text{g/mol}\\))", answer: "\\(1.2 \\times 10^{23}\\)", method: "\\(0.20\\ \\text{mol} \\times 6.02 \\times 10^{23}\\)" },
        { prompt: "How many atoms in total are in 0.10 mol of methane, \\(\\mathrm{CH_4}\\)?", answer: "\\(3.0 \\times 10^{23}\\)", method: "5 atoms per molecule, so 0.50 mol of atoms" },
        { prompt: "What is the mass of \\(3.01 \\times 10^{23}\\) carbon atoms? (C = 12)", answer: "6.0 g", method: "Half a mole of carbon" },
      ],
      traps: [
        {
          title: "Nitrogen gas is made of two-atom molecules",
          body: "A mass of \\(\\mathrm{N_2}\\) divided by 28 gives moles of molecules, and the number of nitrogen atoms is twice that. Dividing by 28 and stopping gives half the right number of atoms, and that answer is usually an option. (Dividing the mass by 14 gives moles of atoms directly.) Decide first whether the question counts atoms or molecules.",
        },
      ],
    },
  ],
};
