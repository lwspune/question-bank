import type { SubtopicNote } from "@/app/notes/_types";

export const MOLE_INTERCONVERSIONS_NOTE: SubtopicNote = {
  subtopicName: "Mole Concept and Interconversions",
  title: "The Mole and Its Interconversions",
  oneLineDefinition:
    "A mole is a fixed count of particles (6.022 × 10^23 of them); molar mass, molar volume (22.4 dm^3 at STP) and Avogadro's number are the three bridges that turn grams, litres and particle-counts into moles and back.",
  whyItMatters:
    "This is the single most-tested subtopic of the chapter — 31 PYQs, and every one of them is a walk along the same small conversion map: mass to moles to volume to particle-count. Most are one-step EASY plug-ins (mass of 0.25 mol water, volume of 3 mol NH3 at STP, moles in 8.8 × 10^-2 kg of CO2); the MODERATE ones only chain two steps or add a per-molecule multiplier (electrons in 1.6 g of methane, ratio of molecules from a mass ratio, vapour density to volume). " +
    "Learn n = m/M, n = V/22.4 and N = n·NA cold — and watch the kg-to-g and dm^3-to-m^3 unit traps — and you can attempt every question here on sight.",
  concepts: [
    // FOUNDATION — the mole, Avogadro's number, mass/volume of ONE particle
    {
      kind: "formula" as const,
      slug: "cetsbcc-mole-and-avogadro",
      name: "The mole, Avogadro's number, and one single particle",
      intuition:
        "Atoms are far too small to count one by one, so chemists count them in a fixed-size bundle called a mole — exactly 6.022 × 10^23 particles, the same way a dozen is always 12. " +
        "Turn that idea around and you can also find the mass or volume of a single atom or molecule: just divide the mass or volume of one mole by Avogadro's number.",
      definition:
        "Key definitions:\n" +
        "- A **mole** is the amount of substance that contains as many elementary particles (atoms, molecules, ions) as there are atoms in exactly 12 g of carbon-12.\n" +
        "- That count is **Avogadro's number**, \\(N_A = 6.022 \\times 10^{23}\\) particles per mole.\n" +
        "- Mass of one particle \\(= \\dfrac{M}{N_A}\\) (M = molar mass in g/mol), so a single atom of a 10 u element weighs \\(\\dfrac{10}{6.022 \\times 10^{23}} = 1.66 \\times 10^{-23}\\) g.\n" +
        "- Volume of one molecule \\(= \\dfrac{\\text{mass of one molecule}}{\\text{density}} = \\dfrac{M}{N_A \\, \\rho}\\).",
      formula: {
        label: "Mass and volume of one particle",
        latex: "m_{1} = \\dfrac{M}{N_A}, \\qquad V_{1} = \\dfrac{M}{N_A \\, \\rho}",
        symbols: [
          { symbol: "m_1", meaning: "mass of one particle (g)" },
          { symbol: "V_1", meaning: "volume of one particle" },
          { symbol: "M", meaning: "molar mass (g/mol)" },
          { symbol: "N_A", meaning: "Avogadro's number, \\(6.022 \\times 10^{23}\\)" },
          { symbol: "\\(\\rho\\)", meaning: "density" },
        ],
      },
      pyqExampleId: "5e97cb48-673d-469b-a7fa-eb8dd30abe2a", // mass in g of 1 atom of a 10 u element
      authoredExample: {
        prompt:
          "What is the mass in grams of one atom of sulphur? (Atomic mass of S = 32 u)",
        steps: [
          "One mole of sulphur atoms weighs 32 g and contains \\(6.022 \\times 10^{23}\\) atoms.",
          "Mass of one atom \\(= \\dfrac{M}{N_A} = \\dfrac{32}{6.022 \\times 10^{23}}\\).",
        ],
        answer: "About \\(5.31 \\times 10^{-23}\\) g.",
      },
      selfCheckExample: {
        prompt:
          "The density of a liquid is \\(1\\ \\text{g cm}^{-3}\\) and its molar mass is 18 g/mol. What volume does one molecule occupy?",
        steps: [
          "Mass of one molecule \\(= \\dfrac{18}{6.022 \\times 10^{23}} = 2.99 \\times 10^{-23}\\) g.",
          "Volume \\(= \\dfrac{\\text{mass}}{\\text{density}} = \\dfrac{2.99 \\times 10^{-23}}{1}\\).",
        ],
        answer: "About \\(2.98 \\times 10^{-23}\\ \\text{cm}^3\\).",
      },
      practiceSet: [
        { prompt: "How many particles are in one mole?", answer: "\\(6.022 \\times 10^{23}\\)", method: "that is Avogadro's number" },
        { prompt: "Mass of one atom of carbon-12 (M = 12)?", answer: "\\(\\dfrac{12}{6.022 \\times 10^{23}} = 1.99 \\times 10^{-23}\\) g" },
        { prompt: "Mass of one molecule of O2 (M = 32)?", answer: "\\(5.31 \\times 10^{-23}\\) g", method: "\\(32 / N_A\\)" },
      ],
      traps: [
        {
          title: "Divide by \\(N_A\\), not multiply, for one particle",
          body:
            "To go from one mole to one particle you **divide** the molar quantity by \\(6.022 \\times 10^{23}\\). A single atom weighs about \\(10^{-23}\\) g — an answer near \\(10^{+23}\\) means you multiplied by mistake.",
        },
        {
          title: "Volume of one molecule needs the density",
          body:
            "Mass alone will not give a volume — divide the mass of one molecule by the **density** (\\(V = m/\\rho\\)). For water at \\(1\\ \\text{g cm}^{-3}\\) the number of grams equals the number of \\(\\text{cm}^3\\), which is why the two answers look identical.",
        },
      ],
    },

    // moles from mass — n = m/M (watch kg -> g)
    {
      kind: "formula" as const,
      slug: "cetsbcc-moles-from-mass",
      name: "Moles from mass and molar mass",
      intuition:
        "Molar mass is the mass of one mole, in grams, and equals the atomic or molecular mass read straight off the periodic table. " +
        "To get moles from a given mass, divide the mass by the molar mass; to get mass from moles, multiply. The one thing that trips people up is the units — masses are often given in kilograms.",
      definition:
        "Working rules:\n" +
        "- **Molar mass (M)** = mass of one mole in grams; numerically equal to the atomic mass (element) or molecular mass (compound). Example: \\(M(\\text{H}_2\\text{O}) = 18\\), \\(M(\\text{CO}_2) = 44\\), \\(M(\\text{NH}_3) = 17\\) g/mol.\n" +
        "- Number of moles from mass: \\(n = m / M\\).\n" +
        "- Mass from moles: \\(m = n \\times M\\).\n" +
        "- **Always convert kg to grams first**: \\(1\\,\\text{kg} = 10^3\\,\\text{g}\\), so \\(8.8 \\times 10^{-2}\\,\\text{kg} = 88\\,\\text{g}\\).\n" +
        "- To count moles of a particular **atom**, multiply the moles of compound by the number of those atoms per formula unit.",
      formula: {
        label: "Moles from mass",
        latex: "n = \\dfrac{m}{M}",
        symbols: [
          { symbol: "n", meaning: "number of moles" },
          { symbol: "m", meaning: "given mass (g)" },
          { symbol: "M", meaning: "molar mass (g/mol)" },
        ],
      },
      pyqExampleId: "a9986f68-f133-4cef-ba9c-3234ad2e2436", // moles of CO2 in 8.8e-2 kg = 2 mol
      authoredExample: {
        prompt:
          "What is the mass, in kg, of 5 mole of acetic acid? (Molar mass = 60 g/mol)",
        steps: [
          "Mass \\(= n \\times M = 5 \\times 60 = 300\\) g.",
          "Convert to kg: \\(300\\,\\text{g} = 300 / 1000 = 0.3\\) kg.",
        ],
        answer: "0.3 kg.",
      },
      selfCheckExample: {
        prompt:
          "How many moles of nitrogen atoms are present in 8 g of ammonium nitrate, NH4NO3? (Molar mass = 80 g/mol)",
        steps: [
          "Moles of \\(\\text{NH}_4\\text{NO}_3 = m/M = 8/80 = 0.1\\) mol.",
          "Each formula unit has 2 N atoms, so moles of N \\(= 0.1 \\times 2\\).",
        ],
        answer: "0.2 mole of N atoms.",
      },
      practiceSet: [
        { prompt: "Moles in 88 g of CO2 (M = 44)?", answer: "2 mol" },
        { prompt: "Mass of 2.5 mol of NH3 (M = 17) in kg?", answer: "\\(4.25 \\times 10^{-2}\\) kg", method: "\\(2.5 \\times 17 = 42.5\\) g" },
        { prompt: "Moles of Na atoms in \\(6.9 \\times 10^{-2}\\) kg (M = 23)?", answer: "3.0 mol", method: "69 g / 23" },
        { prompt: "Moles in \\(9.10 \\times 10^{-2}\\) kg of water (M = 18)?", answer: "about 5.0 mol", method: "91 g / 18" },
        { prompt: "Molar mass of ethanol, C2H6O (C=12, H=1, O=16)?", answer: "46 g/mol", method: "24 + 6 + 16" },
      ],
      traps: [
        {
          title: "Convert kg to grams before dividing",
          body:
            "Molar mass is in **g/mol**, so a mass in kilograms must be turned into grams first. \\(3.6\\,\\text{kg}\\) of carbon is \\(3600\\,\\text{g}\\), giving \\(3600/12 = 300 = 3.0 \\times 10^2\\) mol — forgetting the \\(\\times 1000\\) makes the answer 1000 times too small.",
        },
        {
          title: "Use the molar mass of the WHOLE molecule",
          body:
            "For ammonia use \\(M = 17\\) (14 + 3), not 14 for N alone or 18 (that is water). Picking the wrong molar mass is the most common way these one-step questions are missed.",
        },
        {
          title: "Atoms of an element vs formula units",
          body:
            "\"Moles of N atoms\" in \\(\\text{NH}_4\\text{NO}_3\\) is **twice** the moles of the compound, because each formula unit carries 2 nitrogen atoms. Read whether the question wants moles of the compound or moles of a particular atom.",
        },
      ],
    },

    // molar volume at STP — n = V/22.4 (dm3 <-> m3)
    {
      kind: "formula" as const,
      slug: "cetsbcc-molar-volume",
      name: "Molar volume at STP",
      intuition:
        "One mole of ANY gas occupies the same volume at STP — 22.4 dm^3 (litres). So for gases you can bridge straight from volume to moles, and then on to mass or particle-count. " +
        "This is the gas shortcut the bank leans on again and again.",
      definition:
        "The gas-phase bridge:\n" +
        "- **Molar volume** — one mole of any gas occupies **22.4 dm^3 (22.4 L = 22,400 mL)** at STP (0 deg C, 1 atm).\n" +
        "- Moles from gas volume at STP: \\(n = V / 22.4\\) (V in dm^3 / litres).\n" +
        "- Volume from moles: \\(V = n \\times 22.4\\) dm^3.\n" +
        "- Chain to mass or identity: \\(M = \\dfrac{m}{n} = \\dfrac{m \\times 22.4}{V}\\) lets you name a gas from its mass and volume.\n" +
        "- **Watch the volume units**: \\(1\\,\\text{m}^3 = 10^3\\,\\text{dm}^3\\) and \\(1\\,\\text{mL} = 10^{-3}\\,\\text{dm}^3\\).",
      formula: {
        label: "Moles from gas volume at STP",
        latex: "n = \\dfrac{V}{22.4}",
        symbols: [
          { symbol: "n", meaning: "number of moles" },
          { symbol: "V", meaning: "volume of gas at STP (dm^3 / litres)" },
          { symbol: "22.4", meaning: "molar volume at STP (dm^3/mol)" },
        ],
      },
      pyqExampleId: "c4cbe5b9-d7fa-4e1f-93db-a4af6140db50", // volume of 3 mol NH3 at STP = 67.2 dm3
      authoredExample: {
        prompt: "Find the volume occupied by 56 g of dinitrogen (N2) at STP.",
        steps: [
          "Molar mass of \\(\\text{N}_2 = 28\\) g/mol, so moles \\(= 56/28 = 2\\) mol.",
          "Volume \\(= n \\times 22.4 = 2 \\times 22.4\\).",
        ],
        answer: "44.8 dm^3.",
      },
      selfCheckExample: {
        prompt:
          "The mass of 4.48 dm^3 of a gas is 5.6 g at STP. Identify the probable gas.",
        steps: [
          "Moles \\(= V/22.4 = 4.48/22.4 = 0.2\\) mol.",
          "Molar mass \\(= m/n = 5.6/0.2 = 28\\) g/mol.",
        ],
        answer: "M = 28 g/mol, so the gas is \\(\\text{N}_2\\).",
      },
      practiceSet: [
        { prompt: "Volume of 0.5 mol CO2 at STP?", answer: "11.2 dm^3", method: "\\(0.5 \\times 22.4\\)" },
        { prompt: "Volume of 2.5 mol NH3 at STP?", answer: "56.0 dm^3" },
        { prompt: "Moles in 0.448 L of H2 at STP?", answer: "0.02 mol", method: "\\(0.448/22.4\\)" },
        { prompt: "Moles in 1 m^3 of any gas at STP?", answer: "44.6 mol", method: "\\(10^3/22.4\\)" },
        { prompt: "Mass of CO2 in 4.48 dm^3 at STP?", answer: "8.8 g", method: "\\(0.2\\,\\text{mol} \\times 44\\)" },
      ],
      traps: [
        {
          title: "22.4 dm^3 only at STP, and only for gases",
          body:
            "The molar volume of 22.4 dm^3 per mole applies to **gases at STP** only. It does not apply to liquids or solids, nor to a gas at room temperature or another pressure.",
        },
        {
          title: "\\(1\\,\\text{m}^3 = 1000\\,\\text{dm}^3\\)",
          body:
            "For 1 m^3 of gas at STP, convert first: \\(1\\,\\text{m}^3 = 10^3\\,\\text{dm}^3\\), so \\(n = 10^3 / 22.4 = 44.6\\) mol — not \\(1/22.4\\). Likewise 1 mL is \\(10^{-3}\\,\\text{dm}^3\\), giving a tiny fraction of a mole.",
        },
      ],
    },

    // particles from moles — N = n*NA
    {
      kind: "formula" as const,
      slug: "cetsbcc-particles-from-moles",
      name: "Counting molecules and atoms from moles",
      intuition:
        "Once you know the moles, the number of actual molecules is just moles times Avogadro's number. " +
        "If a question asks for atoms, multiply once more by the number of atoms per molecule — so the whole path from a mass or volume to a raw atom-count is one chain.",
      definition:
        "The particle bridge:\n" +
        "- Number of molecules: \\(N = n \\times N_A\\), with \\(N_A = 6.022 \\times 10^{23}\\).\n" +
        "- Chained from mass: \\(N = \\dfrac{m}{M} \\times N_A\\); from gas volume at STP: \\(N = \\dfrac{V}{22.4} \\times N_A\\).\n" +
        "- **Atoms** \\(= N \\times (\\text{atoms per molecule})\\). For \\(\\text{NH}_3\\) that is 4 atoms per molecule; for glucose \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\) there are 6 C atoms per molecule.",
      formula: {
        label: "Particles from moles",
        latex: "N = n \\, N_A = \\dfrac{m}{M}\\, N_A",
        symbols: [
          { symbol: "N", meaning: "number of molecules" },
          { symbol: "n", meaning: "number of moles" },
          { symbol: "N_A", meaning: "Avogadro's number, \\(6.022 \\times 10^{23}\\)" },
        ],
      },
      pyqExampleId: "a1a07228-99d6-48e7-9850-36b4128a8348", // molecules in 5.4 g urea (M=60)
      authoredExample: {
        prompt:
          "Calculate the number of molecules present in 5.4 g of urea. (Molar mass = 60 g/mol)",
        steps: [
          "Moles \\(= m/M = 5.4/60 = 0.09\\) mol.",
          "Molecules \\(= n \\times N_A = 0.09 \\times 6.022 \\times 10^{23}\\).",
        ],
        answer: "\\(5.42 \\times 10^{22}\\) molecules.",
      },
      selfCheckExample: {
        prompt:
          "Find the number of carbon atoms in 0.35 mole of glucose, C6H12O6.",
        steps: [
          "Molecules \\(= 0.35 \\times 6.022 \\times 10^{23} = 2.108 \\times 10^{23}\\).",
          "Each glucose molecule has 6 C atoms, so C atoms \\(= 6 \\times 2.108 \\times 10^{23}\\).",
        ],
        answer: "About \\(1.264 \\times 10^{24}\\) carbon atoms.",
      },
      practiceSet: [
        { prompt: "Molecules in 1 mole of CO2?", answer: "\\(6.022 \\times 10^{23}\\)" },
        { prompt: "Total atoms in 2.24 dm^3 of NH3 at STP?", answer: "\\(2.4088 \\times 10^{23}\\)", method: "\\(0.1\\,\\text{mol} \\times 4 \\times N_A\\)" },
        { prompt: "Molecules in 1 mL of water vapour at STP?", answer: "\\(2.69 \\times 10^{19}\\)", method: "\\((10^{-3}/22.4) \\times N_A\\)" },
        { prompt: "Carbon atoms in 1 mol of glucose?", answer: "\\(6 \\times 6.022 \\times 10^{23} = 3.61 \\times 10^{24}\\)" },
      ],
      traps: [
        {
          title: "Atoms need an extra multiplier",
          body:
            "\\(N = n N_A\\) gives **molecules**. For atoms multiply by the number of atoms per molecule: 2.24 dm^3 of \\(\\text{NH}_3\\) at STP is 0.1 mol = \\(6.022 \\times 10^{22}\\) molecules but \\(0.1 \\times 4 \\times N_A = 2.4088 \\times 10^{23}\\) atoms.",
        },
        {
          title: "Convert the given volume to dm^3 first",
          body:
            "For 1 mL of vapour, use \\(10^{-3}\\,\\text{dm}^3\\) in \\(n = V/22.4\\). Skipping the mL-to-dm^3 step inflates the answer by a factor of 1000.",
        },
      ],
    },

    // ions and electrons per formula unit
    {
      kind: "formula" as const,
      slug: "cetsbcc-ions-and-electrons",
      name: "Counting ions and electrons",
      intuition:
        "The mole bridge counts more than whole molecules — it also counts the ions an ionic compound releases and the electrons a molecule carries. " +
        "Get to moles first, then multiply by how many ions (or electrons) each formula unit or molecule contributes.",
      definition:
        "Per-particle counting:\n" +
        "- **Ions**: work out the ions per formula unit from the formula. \\(\\text{CaCl}_2\\) gives 1 \\(\\text{Ca}^{2+}\\) and 2 \\(\\text{Cl}^{-}\\) per unit, so 2 mol of \\(\\text{CaCl}_2\\) releases \\(2\\,N_A\\) \\(\\text{Ca}^{2+}\\) and \\(4\\,N_A\\) \\(\\text{Cl}^{-}\\).\n" +
        "- **Electrons**: count the electrons in one molecule (sum of atomic numbers). \\(\\text{CH}_4\\) has \\(6 + 4 \\times 1 = 10\\) electrons per molecule.\n" +
        "- Total ions or electrons \\(= n \\times N_A \\times (\\text{ions or electrons per unit})\\).",
      formula: {
        label: "Ions / electrons from moles",
        latex: "N_{\\text{ion/e}} = n \\, N_A \\times k",
        symbols: [
          { symbol: "n", meaning: "moles of compound" },
          { symbol: "N_A", meaning: "Avogadro's number" },
          { symbol: "k", meaning: "ions (or electrons) per formula unit / molecule" },
        ],
      },
      pyqExampleId: "e80a0aea-d6a9-4537-a3ff-97dc71384502", // Ca2+ ions in 222 g CaCl2 = 2 NA
      authoredExample: {
        prompt:
          "Calculate the number of Cl- ions in 222 g of anhydrous calcium chloride. (Ca = 40, Cl = 35.5)",
        steps: [
          "Molar mass of \\(\\text{CaCl}_2 = 40 + 2(35.5) = 111\\) g/mol.",
          "Moles \\(= 222/111 = 2\\) mol.",
          "Each \\(\\text{CaCl}_2\\) gives 2 \\(\\text{Cl}^{-}\\), so \\(\\text{Cl}^{-}\\) \\(= 2 \\times 2 \\times N_A = 4\\,N_A\\).",
        ],
        answer: "\\(4\\,N_A\\) chloride ions.",
      },
      selfCheckExample: {
        prompt: "Find the total number of electrons present in 1.6 g of methane, CH4.",
        steps: [
          "Moles \\(= 1.6/16 = 0.1\\) mol, so molecules \\(= 0.1 \\times N_A = 6.022 \\times 10^{22}\\).",
          "Each \\(\\text{CH}_4\\) has \\(6 + 4 = 10\\) electrons.",
          "Total electrons \\(= 6.022 \\times 10^{22} \\times 10\\).",
        ],
        answer: "\\(6.022 \\times 10^{23}\\) electrons.",
      },
      practiceSet: [
        { prompt: "Ca2+ ions in 2 mol of CaCl2?", answer: "\\(2\\,N_A\\)", method: "1 Ca2+ per unit" },
        { prompt: "Electrons per molecule of CH4?", answer: "10", method: "6 (C) + 4 (H)" },
        { prompt: "Total electrons in 3.2 g of CH4 (M = 16)?", answer: "\\(1.204 \\times 10^{24}\\)", method: "0.2 mol \\(\\times N_A \\times 10\\)" },
        { prompt: "Cl- ions in 1 mol of CaCl2?", answer: "\\(2\\,N_A\\)" },
      ],
      traps: [
        {
          title: "Ca2+ and Cl- counts differ for the same salt",
          body:
            "One mole of \\(\\text{CaCl}_2\\) releases 1 mole of \\(\\text{Ca}^{2+}\\) but 2 moles of \\(\\text{Cl}^{-}\\). From 222 g (2 mol) you get \\(2\\,N_A\\) \\(\\text{Ca}^{2+}\\) but \\(4\\,N_A\\) \\(\\text{Cl}^{-}\\) — read which ion is asked.",
        },
        {
          title: "Electrons per molecule = sum of atomic numbers",
          body:
            "\\(\\text{CH}_4\\) carries 10 electrons (carbon's 6 plus four hydrogens' 4), not 4 or 5. After finding molecules, multiply by this per-molecule electron count.",
        },
      ],
    },

    // molecule ratio from a mass ratio
    {
      kind: "formula" as const,
      slug: "cetsbcc-molecule-ratio-from-mass",
      name: "Ratio of molecules from a mass ratio",
      intuition:
        "The number of molecules of a gas is proportional to its moles, and moles equal mass divided by molar mass. " +
        "So to compare molecule counts of two gases from their mass ratio, just divide each mass by its own molar mass.",
      definition:
        "Comparing two species:\n" +
        "- Molecules \\(\\propto\\) moles \\(= \\dfrac{\\text{mass}}{M}\\).\n" +
        "- For two gases A and B: \\(\\dfrac{N_A^{\\text{mol}}}{N_B^{\\text{mol}}} = \\dfrac{m_A / M_A}{m_B / M_B}\\).\n" +
        "- The molar masses do the work — a heavier molecule contributes fewer molecules for the same mass.",
      formula: {
        label: "Molecule ratio of two gases",
        latex: "\\dfrac{N_A}{N_B} = \\dfrac{m_A / M_A}{m_B / M_B}",
        symbols: [
          { symbol: "m_A, m_B", meaning: "masses of the two gases" },
          { symbol: "M_A, M_B", meaning: "their molar masses" },
        ],
      },
      pyqExampleId: "8536284f-0eae-4393-8fff-b56eacf8be16", // O2:CH4 = 1:4 by mass -> molecules 1:8
      authoredExample: {
        prompt:
          "A gaseous mixture has O2 and CH4 in the ratio 1 : 4 by mass. Find the ratio of the number of their molecules.",
        steps: [
          "Take masses \\(m(\\text{O}_2) = 1\\), \\(m(\\text{CH}_4) = 4\\) (any consistent units).",
          "Moles \\(\\text{O}_2 = 1/32\\); moles \\(\\text{CH}_4 = 4/16 = 1/4\\).",
          "Ratio \\(= \\dfrac{1/32}{1/4} = \\dfrac{1}{32} \\times 4 = \\dfrac{1}{8}\\).",
        ],
        answer: "1 : 8.",
      },
      selfCheckExample: {
        prompt:
          "Equal masses of H2 (M = 2) and O2 (M = 32) are taken. What is the ratio of their molecules?",
        steps: [
          "Moles \\(\\text{H}_2 = m/2\\); moles \\(\\text{O}_2 = m/32\\).",
          "Ratio \\(= \\dfrac{m/2}{m/32} = \\dfrac{32}{2} = 16\\).",
        ],
        answer: "16 : 1 (H2 : O2).",
      },
      practiceSet: [
        { prompt: "Equal masses of CH4 (16) and O2 (32): molecule ratio?", answer: "2 : 1", method: "inverse of molar-mass ratio" },
        { prompt: "1 g of H2 (2) vs 1 g of He (4): molecule ratio?", answer: "2 : 1" },
        { prompt: "Which has more molecules — 8 g of CH4 or 8 g of O2?", answer: "CH4", method: "smaller molar mass → more moles" },
      ],
      traps: [
        {
          title: "Lighter molecule wins for the same mass",
          body:
            "Do not read the mass ratio straight across — divide each by its molar mass. A 1 : 4 mass ratio of \\(\\text{O}_2\\) (32) to \\(\\text{CH}_4\\) (16) becomes a **1 : 8** molecule ratio, because \\(\\text{CH}_4\\) is both lighter and present in greater mass.",
        },
      ],
    },

    // vapour density -> molar mass -> volume
    {
      kind: "formula" as const,
      slug: "cetsbcc-vapour-density",
      name: "Vapour density to molar mass",
      intuition:
        "Vapour density is a gas's density relative to hydrogen, and it is exactly half the molar mass. " +
        "So doubling the vapour density gives the molar mass, which then plugs straight into the mole bridges for mass, moles or volume.",
      definition:
        "The vapour-density shortcut:\n" +
        "- **Molar mass** \\(M = 2 \\times \\text{vapour density}\\).\n" +
        "- Once M is known, chain as usual: \\(n = m/M\\) and \\(V = n \\times 22.4\\) dm^3 at STP.\n" +
        "- Example: vapour density 16 means \\(M = 32\\) g/mol (the gas behaves like \\(\\text{O}_2\\)).",
      formula: {
        label: "Molar mass from vapour density",
        latex: "M = 2 \\times \\text{V.D.}",
        symbols: [
          { symbol: "M", meaning: "molar mass (g/mol)" },
          { symbol: "\\(\\text{V.D.}\\)", meaning: "vapour density (relative to H2)" },
        ],
      },
      pyqExampleId: "cc044b12-ef50-41a2-acbe-b5aa5d36b35d", // VD=16, 8 g -> 5.6 dm3
      authoredExample: {
        prompt:
          "The vapour density of a gas is 16. What volume does 8 g of it occupy at STP?",
        steps: [
          "Molar mass \\(M = 2 \\times 16 = 32\\) g/mol.",
          "Moles \\(= m/M = 8/32 = 0.25\\) mol.",
          "Volume \\(= n \\times 22.4 = 0.25 \\times 22.4\\).",
        ],
        answer: "5.6 dm^3.",
      },
      selfCheckExample: {
        prompt:
          "A gas has vapour density 22. What is the mass of 11.2 dm^3 of it at STP?",
        steps: [
          "Molar mass \\(M = 2 \\times 22 = 44\\) g/mol.",
          "Moles in 11.2 dm^3 \\(= 11.2/22.4 = 0.5\\) mol.",
          "Mass \\(= n \\times M = 0.5 \\times 44\\).",
        ],
        answer: "22 g.",
      },
      practiceSet: [
        { prompt: "Molar mass if vapour density is 14?", answer: "28 g/mol", method: "\\(2 \\times 14\\)" },
        { prompt: "Vapour density of O2 (M = 32)?", answer: "16", method: "\\(M/2\\)" },
        { prompt: "Moles in 16 g of a gas with V.D. = 16?", answer: "0.5 mol", method: "M = 32, so 16/32" },
      ],
      traps: [
        {
          title: "Vapour density is HALF the molar mass",
          body:
            "V.D. is measured against hydrogen (M = 2), so \\(M = 2 \\times \\text{V.D.}\\) — never use the vapour density directly as the molar mass. V.D. 16 means M = 32, not 16.",
        },
      ],
    },
  ],
};
