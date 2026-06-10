import type { SubtopicNote } from "@/app/notes/_types";

export const MOLE_MOLAR_CALCULATIONS_NOTE: SubtopicNote = {
  subtopicName: "Mole Concept, Avogadro's Law and Molar Calculations",
  title: "The Mole, Avogadro's Law and Molar Calculations",
  oneLineDefinition:
    "A mole is a fixed count of particles (6.022 × 10^23 of them); molar mass, molar volume and Avogadro's number are the three bridges that turn grams, litres and molecule-counts into moles and back.",
  whyItMatters:
    "This is the engine room of the chapter. Three of five PYQs here are direct one-step conversions (mass of 0.5 mol N2, who proposed the equal-volume law), and the two harder ones (a NOT-correct statement testing all three conversions, and a mass-percent comparison) still reduce to the same mole bridges. " +
    "Learn n = m/M, N = n*NA and n = V/22.4 cold and you can attempt every question in this subtopic on sight.",
  concepts: [
    // FOUNDATION — the mole and Avogadro's number
    {
      kind: "formula" as const,
      slug: "mole-and-avogadro-number",
      name: "The mole and Avogadro's number",
      intuition:
        "Chemists count atoms by weighing them, but atoms are far too small to count one by one — so they count in bundles. " +
        "One mole is just a fixed-size bundle: exactly 6.022 x 10^23 particles, the same way a dozen is always 12. The number 6.022 x 10^23 is Avogadro's number.",
      definition:
        "Key definitions:\n" +
        "- A **mole** is the amount of a substance that contains as many elementary particles (atoms, molecules, ions) as there are atoms in exactly 12 g of carbon-12.\n" +
        "- That count is **Avogadro's number**, \\(N_A = 6.022 \\times 10^{23}\\) particles per mole.\n" +
        "- 'Particle' means whatever the substance is made of: for \\(\\text{H}_2\\) one mole = \\(6.022 \\times 10^{23}\\) **molecules** (and \\(2 \\times 6.022 \\times 10^{23}\\) atoms).\n" +
        "- The mole is a **counting unit**, like 'a dozen' — it says nothing about mass on its own; mass depends on the molar mass.",
      formula: {
        label: "Avogadro's number",
        latex: "N_A = 6.022 \\times 10^{23}\\ \\text{particles per mole}",
      },
      // no PYQ — foundation primitive (the named-law PYQs sit in the Avogadro's-law concept below)
      authoredExample: {
        prompt:
          "How many oxygen atoms are present in 2 moles of oxygen gas (O2)?",
        steps: [
          "Oxygen gas is \\(\\text{O}_2\\), so each molecule has 2 atoms.",
          "Molecules in 2 mol \\(= 2 \\times 6.022 \\times 10^{23} = 1.2044 \\times 10^{24}\\) molecules.",
          "Atoms \\(= 2 \\times 1.2044 \\times 10^{24} = 2.4088 \\times 10^{24}\\) atoms.",
        ],
        answer: "About \\(2.41 \\times 10^{24}\\) oxygen atoms.",
      },
      practiceSet: [
        { prompt: "How many particles are in one mole?", answer: "\\(6.022 \\times 10^{23}\\)", method: "that is Avogadro's number" },
        { prompt: "How many molecules are in 3 moles of any gas?", answer: "\\(3 \\times 6.022 \\times 10^{23} = 1.81 \\times 10^{24}\\)" },
        { prompt: "How many atoms are in 1 mole of helium (He)?", answer: "\\(6.022 \\times 10^{23}\\)", method: "helium is monatomic, so atoms = molecules" },
      ],
      traps: [
        {
          title: "Molecules and atoms differ for diatomic gases",
          body:
            "One mole of \\(\\text{H}_2\\), \\(\\text{O}_2\\) or \\(\\text{N}_2\\) holds \\(6.022 \\times 10^{23}\\) **molecules** but **twice** that many **atoms**. Read whether the question asks for molecules or atoms.",
        },
      ],
    },

    // moles from mass — n = m/M
    {
      kind: "formula" as const,
      slug: "moles-from-mass",
      name: "Molar mass and moles from mass",
      intuition:
        "Molar mass is the mass of one mole, in grams, and it equals the atomic or molecular mass read straight off the periodic table. " +
        "To get moles from a given mass, divide the mass by the molar mass; to get mass from moles, multiply.",
      definition:
        "Working rules:\n" +
        "- **Molar mass (M)** = mass of one mole in grams; numerically equal to the atomic mass (element) or molecular mass (compound). Example: \\(M(\\text{N}_2) = 28\\) g/mol, \\(M(\\text{CO}_2) = 44\\) g/mol.\n" +
        "- Number of moles from mass: \\(n = m / M\\).\n" +
        "- Mass from moles: \\(m = n \\times M\\).\n" +
        "- Build the molecular mass by adding each element's atomic mass times the number of atoms.",
      formula: {
        label: "Moles from mass",
        latex: "n = \\dfrac{m}{M}",
        symbols: [
          { symbol: "n", meaning: "number of moles" },
          { symbol: "m", meaning: "given mass (g)" },
          { symbol: "M", meaning: "molar mass (g/mol)" },
        ],
      },
      pyqExampleId: "1467248e-1f5f-48c5-b1d1-91f07b948a56", // mass of 0.5 mol N2 = 14 g
      authoredExample: {
        prompt: "What is the mass of 0.25 mole of calcium carbonate, CaCO3? (Ca = 40, C = 12, O = 16)",
        steps: [
          "Molar mass \\(M(\\text{CaCO}_3) = 40 + 12 + 3(16) = 100\\) g/mol.",
          "Mass \\(= n \\times M = 0.25 \\times 100\\).",
        ],
        answer: "25 g.",
      },
      selfCheckExample: {
        prompt: "How many moles are present in 8 g of methane, CH4? (C = 12, H = 1)",
        steps: [
          "Molar mass \\(M(\\text{CH}_4) = 12 + 4(1) = 16\\) g/mol.",
          "Moles \\(= m/M = 8/16\\).",
        ],
        answer: "0.5 mole.",
      },
      practiceSet: [
        { prompt: "Mass of 2 mol of water (M = 18)?", answer: "36 g", method: "m = nM = 2 x 18" },
        { prompt: "Moles in 44 g of CO2 (M = 44)?", answer: "1 mole" },
        { prompt: "Mass of 0.5 mol of O2 (M = 32)?", answer: "16 g" },
        { prompt: "Molar mass of ammonia, NH3 (N = 14, H = 1)?", answer: "17 g/mol" },
      ],
      traps: [
        {
          title: "Use the molar mass of the WHOLE molecule",
          body:
            "For 0.5 mol of \\(\\text{N}_2\\) the molar mass is **28** g/mol (a nitrogen molecule), not 14. So mass \\(= 0.5 \\times 28 = 14\\) g — the 14 comes from the calculation, not from using the atomic mass of one N.",
        },
      ],
    },

    // Avogadro's law and molar volume at STP — n = V/22.4
    {
      kind: "formula" as const,
      slug: "avogadro-law-molar-volume",
      name: "Avogadro's law and molar volume at STP",
      intuition:
        "Avogadro's law says equal volumes of any gases, at the same temperature and pressure, hold equal numbers of molecules. " +
        "A direct consequence: one mole of ANY gas occupies the same volume at STP — 22.4 litres. So for gases you can bridge straight from volume to moles.",
      definition:
        "The gas-phase bridge:\n" +
        "- **Avogadro's law** — equal volumes of all gases at the same temperature and pressure contain an equal number of molecules.\n" +
        "- **Molar volume** — one mole of any gas occupies **22.4 L (22,400 mL)** at STP (0 deg C, 1 atm).\n" +
        "- Moles from gas volume at STP: \\(n = V / 22.4\\) (V in litres).\n" +
        "- This is why half a mole of \\(\\text{N}_2\\) measures 11.2 L, and 22.4 L of \\(\\text{CO}_2\\) at STP weighs 44 g (one mole).",
      formula: {
        label: "Moles from gas volume at STP",
        latex: "n = \\dfrac{V}{22.4}",
        symbols: [
          { symbol: "n", meaning: "number of moles" },
          { symbol: "V", meaning: "volume of gas at STP (litres)" },
          { symbol: "22.4", meaning: "molar volume at STP (L/mol)" },
        ],
      },
      pyqExampleId: "d3b97b2a-28a3-4a11-9b2d-e24bf4ad1ae2", // Avogadro's hypothesis (equal volumes -> equal molecules)
      authoredExample: {
        prompt: "What volume does 0.5 mole of oxygen gas occupy at STP?",
        steps: [
          "At STP, one mole of any gas occupies 22.4 L.",
          "Volume \\(= n \\times 22.4 = 0.5 \\times 22.4\\).",
        ],
        answer: "11.2 L.",
      },
      selfCheckExample: {
        prompt: "How many moles of a gas are present in 5.6 litres measured at STP?",
        steps: [
          "Moles \\(= V/22.4 = 5.6/22.4\\).",
          "\\(= 0.25\\) mole.",
        ],
        answer: "0.25 mole.",
      },
      practiceSet: [
        { prompt: "Volume of 1 mole of CO2 at STP?", answer: "22.4 L" },
        { prompt: "Volume of 2 moles of any gas at STP?", answer: "44.8 L", method: "V = n x 22.4" },
        { prompt: "Moles in 11.2 L of N2 at STP?", answer: "0.5 mole" },
        { prompt: "Who proposed that equal volumes of gases hold equal numbers of molecules?", answer: "Avogadro" },
      ],
      traps: [
        {
          title: "22.4 L only at STP, and only for gases",
          body:
            "The molar volume of 22.4 L per mole applies to **gases at STP** only. It does not apply to liquids or solids, and it does not apply to a gas at room temperature or other pressures.",
        },
        {
          title: "Half a mole of a gas = 11.2 L (this is correct)",
          body:
            "In a NOT-correct statement question, 'half mole of nitrogen measures 11.2 L at STP' is a **true** statement (\\(0.5 \\times 22.4 = 11.2\\)) — so it is not the wrong one. Check each option's arithmetic separately.",
        },
      ],
    },

    // particles from moles — N = n*NA
    {
      kind: "formula" as const,
      slug: "particles-from-moles",
      name: "Counting particles from moles",
      intuition:
        "Once you know the moles, the number of actual molecules is just moles times Avogadro's number. " +
        "Combined with n = m/M, this lets you go all the way from a mass in grams to a raw molecule count.",
      definition:
        "The particle bridge:\n" +
        "- Number of particles: \\(N = n \\times N_A\\), with \\(N_A = 6.022 \\times 10^{23}\\).\n" +
        "- Chained from mass: \\(N = (m/M) \\times N_A\\).\n" +
        "- So **one mole** of a substance always contains \\(6.022 \\times 10^{23}\\) molecules — for example, 17 g of \\(\\text{NH}_3\\) (M = 17) is exactly one mole and holds \\(6.022 \\times 10^{23}\\) molecules.",
      formula: {
        label: "Particles from moles",
        latex: "N = n \\, N_A = \\dfrac{m}{M}\\, N_A",
        symbols: [
          { symbol: "N", meaning: "number of particles (molecules/atoms)" },
          { symbol: "n", meaning: "number of moles" },
          { symbol: "N_A", meaning: "Avogadro's number, \\(6.022 \\times 10^{23}\\)" },
        ],
      },
      pyqExampleId: "59202a81-94ce-47ca-9c9a-1d3e25b2f61a", // NOT-correct: 4 g H2 holds 1 NA (false; it holds 2 NA)
      authoredExample: {
        prompt: "How many molecules are present in 9 g of water, H2O? (M = 18)",
        steps: [
          "Moles \\(= m/M = 9/18 = 0.5\\) mol.",
          "Molecules \\(= n \\times N_A = 0.5 \\times 6.022 \\times 10^{23}\\).",
        ],
        answer: "\\(3.011 \\times 10^{23}\\) molecules.",
      },
      selfCheckExample: {
        prompt: "How many molecules are present in 4 g of hydrogen gas, H2? (M = 2)",
        steps: [
          "Moles \\(= m/M = 4/2 = 2\\) mol.",
          "Molecules \\(= n \\times N_A = 2 \\times 6.022 \\times 10^{23}\\).",
        ],
        answer: "\\(1.2044 \\times 10^{24}\\) molecules (i.e. 2 Avogadro numbers, not one).",
      },
      practiceSet: [
        { prompt: "Molecules in 1 mole of CO2?", answer: "\\(6.022 \\times 10^{23}\\)" },
        { prompt: "Molecules in 17 g of NH3 (M = 17)?", answer: "\\(6.022 \\times 10^{23}\\)", method: "17 g = 1 mole" },
        { prompt: "Molecules in 0.25 mol of any gas?", answer: "\\(1.5055 \\times 10^{23}\\)", method: "0.25 x NA" },
      ],
      traps: [
        {
          title: "4 g of H2 is TWO Avogadro numbers, not one",
          body:
            "\\(\\text{H}_2\\) has molar mass 2, so 4 g \\(= 2\\) mol \\(= 2 \\times 6.022 \\times 10^{23}\\) molecules. The classic NOT-correct option claims '4 g of hydrogen contains \\(6.022 \\times 10^{23}\\) molecules' — that is the **false** statement.",
        },
      ],
    },

    // mass-percent composition
    {
      kind: "formula" as const,
      slug: "mass-percent-composition",
      name: "Mass-percent composition",
      intuition:
        "To find how much of a compound's mass comes from one element, take that element's total mass in the formula and divide by the whole molar mass. " +
        "The ratio of two elements' mass-percents is fixed by the formula alone — handy for the comparison questions the bank likes.",
      definition:
        "Composition by mass:\n" +
        "- Mass percent of an element \\(= \\dfrac{(\\text{atoms of element}) \\times (\\text{atomic mass})}{\\text{molar mass of compound}} \\times 100\\).\n" +
        "- The **ratio** of two elements' mass-percents does not depend on the rest of the formula. For any \\(\\text{C}_6\\text{H}_{12}\\text{O}_n\\): \\(\\dfrac{\\%\\text{C}}{\\%\\text{H}} = \\dfrac{6 \\times 12}{12 \\times 1} = 6\\), so %C is always six times %H.",
      formula: {
        label: "Mass percent of an element",
        latex: "\\%\\,\\text{element} = \\dfrac{a \\times A}{M} \\times 100",
        symbols: [
          { symbol: "a", meaning: "number of atoms of the element in the formula" },
          { symbol: "A", meaning: "atomic mass of the element" },
          { symbol: "M", meaning: "molar mass of the whole compound" },
        ],
      },
      pyqExampleId: "c5ddc56b-34ec-4126-9c50-d678db2d9dd8", // C6H12On: %C = 6 x %H
      authoredExample: {
        prompt: "Find the mass percent of carbon in methane, CH4. (C = 12, H = 1)",
        steps: [
          "Molar mass \\(M(\\text{CH}_4) = 12 + 4 = 16\\) g/mol.",
          "Mass of carbon \\(= 1 \\times 12 = 12\\).",
          "\\(\\%\\text{C} = (12/16) \\times 100\\).",
        ],
        answer: "75% carbon by mass.",
      },
      selfCheckExample: {
        prompt: "In glucose C6H12O6, how does the mass percent of carbon compare with the mass percent of hydrogen?",
        steps: [
          "\\(\\%\\text{C}/\\%\\text{H} = (6 \\times 12)/(12 \\times 1) = 72/12 = 6\\).",
          "So %C is six times %H, independent of the oxygen content.",
        ],
        answer: "Mass percent of C is six times the mass percent of H.",
      },
      practiceSet: [
        { prompt: "Mass percent of oxygen in water, H2O (M = 18)?", answer: "\\((16/18) \\times 100 \\approx 88.9\\%\\)" },
        { prompt: "Mass percent of carbon in CO2 (M = 44)?", answer: "\\((12/44) \\times 100 \\approx 27.3\\%\\)" },
        { prompt: "In any C6H12On compound, %C is how many times %H?", answer: "Six times", method: "ratio = (6 x 12)/(12 x 1) = 6" },
      ],
      traps: [
        {
          title: "Mass-percent ratio ignores the oxygen count",
          body:
            "For \\(\\text{C}_6\\text{H}_{12}\\text{O}_4\\) versus \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\), the **%C : %H ratio is the same** (= 6) because the oxygen mass cancels from the ratio. Changing n only changes the individual percents, not their ratio.",
        },
      ],
    },
  ],
};
