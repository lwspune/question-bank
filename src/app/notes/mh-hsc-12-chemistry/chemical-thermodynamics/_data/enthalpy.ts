import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TH_ENTHALPY_NOTE: SubtopicNote = {
  subtopicName: "Enthalpy and Enthalpies of Physical Transformations",
  title: "Enthalpy, ΔH and ΔU, and Physical Changes",
  oneLineDefinition:
    "Enthalpy H = U + PV, the relation ΔH = ΔU + Δn(g)RT, the work done in a chemical reaction W = −Δn(g)RT, and the enthalpies of fusion, vaporization, sublimation, atomization, ionization and solution.",
  whyItMatters:
    "27 questions. Fourteen were set in board papers: derive the relation between ΔH and ΔU (2014, 2023 and 2025); define enthalpy (2017); find ΔU from ΔH (2018 and 2025) and Δn(g) for a reaction (2025); find the work done in a reaction (2019 and 2020) and in oxidising sulphur dioxide (2026); define or describe the enthalpies of atomization, vaporization, sublimation and combustion (2015, 2016 and 2024); and name the enthalpy change when liquid water turns to vapour (2022). The textbook adds the work done when ammonium nitrate decomposes, ΔU and work from gas volumes, and the total heat to melt ice, warm the water and boil it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccth-dh-du",
      name: "Enthalpy and the relation between ΔH and ΔU",
      intuition:
        "Enthalpy is internal energy plus the energy tied up in making room for the system, PV. In an open flask the heat you measure is the enthalpy change. When a reaction makes more gas, part of the heat goes into pushing the air back, so ΔH and ΔU differ by exactly that work, Δn(g)RT. When the moles of gas do not change, or only solids and liquids take part, the two are equal.",
      definition:
        "- **Enthalpy:** the sum of the internal energy of a system and the energy equivalent to its PV work, \\(H = U + PV\\). H is a state function; \\(\\Delta H = H_2 - H_1\\).\n" +
        "- At constant pressure \\(\\Delta H = \\Delta U + P\\Delta V = Q_p\\): the enthalpy change is the heat exchanged at constant pressure.\n" +
        "Derivation of the relation (book §4.8.1), one step a line:\n" +
        "- \\(\\Delta H = \\Delta U + P\\Delta V = \\Delta U + P(V_2 - V_1) = \\Delta U + PV_2 - PV_1\\)\n" +
        "- \\(V_1\\): volume of gaseous reactants; \\(V_2\\): volume of gaseous products; assume ideal behaviour.\n" +
        "- \\(n_1\\) mol of gaseous reactants give \\(n_2\\) mol of gaseous products: \\(PV_1 = n_1RT\\), \\(PV_2 = n_2RT\\)\n" +
        "- \\(\\Delta H = \\Delta U + n_2RT - n_1RT = \\Delta U + (n_2 - n_1)RT\\)\n" +
        "- \\(\\Delta H = \\Delta U + \\Delta n_g RT\\)\n" +
        "- Solids and liquids only: \\(\\Delta V\\) is very small and \\(\\Delta H = \\Delta U\\). Gases with \\(\\Delta n_g = 0\\): again \\(\\Delta H = \\Delta U\\).",
      formula: {
        label: "Enthalpy and internal energy",
        latex: "H = U + PV, \\qquad \\Delta H = \\Delta U + \\Delta n_g RT",
        symbols: [
          { symbol: "\\(\\Delta n_g\\)", meaning: "moles of gaseous products minus moles of gaseous reactants" },
          { symbol: "\\(R\\)", meaning: "8.314 J per kelvin per mole; use 8.314 × 10⁻³ kJ with ΔH in kJ" },
        ],
      },
      authoredExample: {
        prompt:
          "For the combustion of propane, C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l), ΔH = −2220 kJ at 298 K. Calculate ΔU. (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\(\\Delta H = -2220\\ \\text{kJ}\\), \\(T = 298\\ \\text{K}\\), \\(R = 8.314 \\times 10^{-3}\\ \\text{kJ K}^{-1}\\ \\text{mol}^{-1}\\).",
          "Water is a liquid, so it is not counted: \\(\\Delta n_g = 3 - (1 + 5) = -3\\ \\text{mol}\\).",
          "Formula: \\(\\Delta U = \\Delta H - \\Delta n_g RT\\).",
          "Substitution: \\(\\Delta U = -2220 - (-3)(8.314 \\times 10^{-3})(298) = -2220 + 7.43\\ \\text{kJ}\\).",
          "\\(\\Delta U = -2212.6\\ \\text{kJ}\\).",
        ],
        answer: "ΔU = −2212.6 kJ",
      },
      selfCheckExample: {
        prompt: "For N₂O₄(g) → 2NO₂(g), ΔU = +54.7 kJ at 298 K. Find ΔH.",
        steps: ["\\(\\Delta n_g = 2 - 1 = +1\\).", "\\(\\Delta H = 54.7 + 1 \\times 8.314 \\times 10^{-3} \\times 298 = 54.7 + 2.48 = +57.2\\ \\text{kJ}\\)."],
        answer: "ΔH = +57.2 kJ",
      },
      practiceSet: [
        { prompt: "Find Δn(g) for CaCO₃(s) → CaO(s) + CO₂(g).", answer: "+1 (only CO₂ is a gas)" },
        { prompt: "For H₂(g) + Cl₂(g) → 2HCl(g), compare ΔH and ΔU.", answer: "Equal, since \\(\\Delta n_g = 2 - 2 = 0\\)" },
        { prompt: "Write the definition of enthalpy as an equation.", answer: "\\(H = U + PV\\)" },
      ],
      pyqExampleId: "54bf8c01-4a8b-4c26-a600-6b2208230b0a",
      traps: [
        {
          title: "Mixing kJ and J",
          body: "ΔH is usually in kJ while R is 8.314 J K⁻¹ mol⁻¹. Convert R to \\(8.314 \\times 10^{-3}\\ \\text{kJ K}^{-1}\\ \\text{mol}^{-1}\\) before you add the two terms.",
        },
        {
          title: "Counting water as a gas when it is a liquid",
          body: "Read the state symbols. H₂O(l) is not counted in \\(\\Delta n_g\\); H₂O(g) is. The same equation can give two different answers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-reaction-work",
      name: "Work done in a chemical reaction",
      intuition:
        "A reaction that makes gas pushes the air back and does work, like the oxygen from hydrogen peroxide lifting a piston. A reaction that uses up gas lets the air push in, so work is done on it. The work only depends on how many moles of gas appear or disappear, and the temperature.",
      definition:
        "Derivation (book §4.8.2), one step a line:\n" +
        "- At constant temperature and pressure, with \\(P_{ext} = P\\): \\(W = -P\\Delta V = -P(V_2 - V_1) = -PV_2 + PV_1\\)\n" +
        "- Ideal gases: \\(PV_1 = n_1RT\\), \\(PV_2 = n_2RT\\)\n" +
        "- \\(W = -n_2RT + n_1RT = -(n_2 - n_1)RT = -\\Delta n_g RT\\)\n" +
        "- If \\(n_2 > n_1\\): \\(\\Delta n_g > 0\\), \\(W < 0\\), work is done by the system.\n" +
        "- If \\(n_1 > n_2\\): \\(\\Delta n_g < 0\\), \\(W > 0\\), work is done on the system.\n" +
        "- If \\(n_1 = n_2\\): \\(W = 0\\), no PV work.\n" +
        "- For a stated amount, scale the equation first (oxidising 4 mol instead of 2 mol doubles \\(\\Delta n_g\\)).",
      formula: {
        label: "Work in a chemical reaction",
        latex: "W = -\\Delta n_g RT",
      },
      authoredExample: {
        prompt:
          "Calculate the work done when 1 mol of calcium carbonate decomposes at 1000 K: CaCO₃(s) → CaO(s) + CO₂(g). State whether work is done on the system or by the system.",
        steps: [
          "Given: \\(T = 1000\\ \\text{K}\\), \\(R = 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1}\\).",
          "Only CO₂ is a gas: \\(\\Delta n_g = 1 - 0 = +1\\ \\text{mol}\\).",
          "Formula: \\(W = -\\Delta n_g RT\\).",
          "Substitution: \\(W = -1\\ \\text{mol} \\times 8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1} \\times 1000\\ \\text{K} = -8314\\ \\text{J}\\).",
          "W is negative, so work is done by the system: the CO₂ formed pushes the surroundings back.",
        ],
        answer: "W = −8.314 kJ; work is done by the system",
      },
      selfCheckExample: {
        prompt: "Find the work done in N₂(g) + 3H₂(g) → 2NH₃(g) at 400 K, and say on or by the system.",
        steps: ["\\(\\Delta n_g = 2 - 4 = -2\\ \\text{mol}\\).", "\\(W = -(-2) \\times 8.314 \\times 400 = +6651\\ \\text{J}\\), positive."],
        answer: "+6.65 kJ, done on the system",
      },
      practiceSet: [
        { prompt: "Find W for 2H₂(g) + O₂(g) → 2H₂O(l) at 298 K.", answer: "\\(\\Delta n_g = -3\\), \\(W = +3 \\times 8.314 \\times 298 = +7433\\ \\text{J}\\)" },
        { prompt: "When is no PV work done in a reaction?", answer: "When the moles of gaseous products equal the moles of gaseous reactants (\\(\\Delta n_g = 0\\))" },
        { prompt: "For PCl₅(g) → PCl₃(g) + Cl₂(g), is work done on or by the system?", answer: "By the system, since \\(\\Delta n_g = +1\\)" },
      ],
      pyqExampleId: "13c0bec7-4e1b-47a2-a219-0d2f590e1c47",
      traps: [
        {
          title: "Celsius in the formula",
          body: "T must be in kelvin. Add 273 to a Celsius temperature before you substitute.",
        },
        {
          title: "Not scaling Δn to the amount asked",
          body: "If the question names a mass or a number of moles, find how many times the written equation runs and multiply \\(\\Delta n_g\\) by that.",
        },
        {
          title: "No direction in the answer",
          body: "The board asks 'on the system or by the system'. A positive W means on the system; a negative W means by the system. Write the words.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccth-phase-enthalpies",
      name: "Enthalpies of physical transformations",
      intuition:
        "Melting, boiling and subliming change only the state of a substance, not its formula, and all three need heat to pull particles apart. Atomization, ionization and dissolving are changes at the level of atoms and ions. Each enthalpy is quoted for one mole, at constant temperature and pressure.",
      definition:
        "- **Phase transition:** one phase converted into another at constant temperature and pressure without change in chemical composition.\n" +
        "- Fusion, vaporization and sublimation are endothermic; their reverses (freezing, condensation) release the same heat: water freezing at 0 °C, \\(\\Delta_{freez}H = -6.01\\ \\text{kJ mol}^{-1}\\).\n" +
        "- Enthalpy is a state function, so solid to vapour in one step or in two steps gives the same change: \\(\\Delta_{sub}H = \\Delta_{fus}H + \\Delta_{vap}H\\). For ice at 0 °C: \\(6.01 + 45.07 = 51.08\\ \\text{kJ mol}^{-1}\\).\n" +
        "- For a diatomic molecule the enthalpy of atomization equals the bond enthalpy.\n" +
        "- Enthalpy of solution = crystal lattice enthalpy (always positive) + enthalpy of hydration (always negative).",
      table: {
        columns: ["Enthalpy change", "For one mole, at constant T and P", "Book example"],
        rows: [
          {
            cells: ["Fusion", "Solid to liquid without change in temperature", "\\(\\text{H}_2\\text{O(s)} \\to \\text{H}_2\\text{O(l)}\\), \\(+6.01\\ \\text{kJ mol}^{-1}\\) at 0 °C"],
            pyqExampleId: "35ca0ee7-ec8a-4d01-bb1d-a340618b046c",
          },
          {
            cells: ["Vaporization", "Liquid to vapour without change in temperature", "\\(\\text{H}_2\\text{O(l)} \\to \\text{H}_2\\text{O(g)}\\), about \\(+40\\ \\text{kJ mol}^{-1}\\) at 100 °C and \\(+44\\ \\text{kJ mol}^{-1}\\) at 25 °C"],
            pyqExampleId: "f12ae6af-00e9-4f72-904f-2e21d28c3228",
            noteAmber: "Board 2022 asked you to name this change; Board 2015 asked you to define it.",
          },
          {
            cells: ["Sublimation", "Solid directly to vapour", "\\(\\Delta_{sub}H = \\Delta_{fus}H + \\Delta_{vap}H\\)"],
            pyqExampleId: "800032cc-9537-4f4b-a39b-6c7cab53430d",
            noteAmber: "Board 2016 asked you to describe it and relate it to fusion and vaporization.",
          },
          {
            cells: ["Atomization", "One mole of a gaseous substance dissociated into atoms", "\\(\\text{Cl}_2\\text{(g)} \\to 2\\text{Cl(g)}\\), \\(242\\ \\text{kJ mol}^{-1}\\); \\(\\text{CH}_4\\text{(g)} \\to \\text{C(g)} + 4\\text{H(g)}\\), \\(1660\\ \\text{kJ mol}^{-1}\\)"],
            pyqExampleId: "a95ae5b5-9ade-4309-ad57-12b832618cd6",
            noteAmber: "Board 2015 and 2024 asked you to define it.",
          },
          { cells: ["Ionization", "Removal of an electron from one mole of gaseous atoms", "\\(\\text{Na(g)} \\to \\text{Na}^+\\text{(g)} + e^-\\), \\(494\\ \\text{kJ mol}^{-1}\\)"] },
          { cells: ["Electron gain", "One mole of gaseous atoms accept an electron to form anions", "\\(\\text{Cl(g)} + e^- \\to \\text{Cl}^-\\text{(g)}\\), \\(-349\\ \\text{kJ mol}^{-1}\\)"] },
          { cells: ["Solution", "One mole of a substance dissolved in a specified amount of solvent", "\\(\\text{NaCl(s)} + aq \\to \\text{NaCl(aq)}\\), \\(4\\ \\text{kJ mol}^{-1}\\)"] },
        ],
      },
      practiceSet: [
        { prompt: "Which is the largest for a substance: its enthalpy of fusion, of vaporization or of sublimation?", answer: "Enthalpy of sublimation, the sum of the other two" },
        { prompt: "Write the equation for the enthalpy of atomization of hydrogen gas.", answer: "\\(\\text{H}_2\\text{(g)} \\to 2\\text{H(g)}\\)" },
        { prompt: "What is the enthalpy of freezing of water at 0 °C?", answer: "\\(-6.01\\ \\text{kJ mol}^{-1}\\)" },
      ],
      pyqExampleId: "800032cc-9537-4f4b-a39b-6c7cab53430d",
      traps: [
        {
          title: "A definition without 'one mole' and the conditions",
          body: "Each of these is defined for one mole, at constant temperature and pressure. Leaving either out costs the definition mark.",
        },
        {
          title: "Atomization of any substance",
          body: "The book defines the enthalpy of atomization for one mole of a gaseous substance broken into gaseous atoms. Write 'gaseous' in the definition.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-phase-heat",
      name: "Heat for a phase change",
      intuition:
        "A molar enthalpy is a price per mole. To find the heat for a given mass, change grams to moles and multiply by the price. Going the other way, divide the heat by the moles to get the price per mole.",
      definition:
        "- Heat for n mol: \\(q = n \\times \\Delta_{trs}H\\), with \\(n = m/M\\).\n" +
        "- Molar enthalpy from data: \\(\\Delta_{trs}H = q/n\\).\n" +
        "- Warming without a change of state uses \\(q = m \\times c \\times \\Delta T\\), with c the specific heat in J g⁻¹ K⁻¹.\n" +
        "- For several steps (melt, warm, boil) add the heat of each step.",
      formula: {
        label: "Heat for a phase change",
        latex: "q = n \\times \\Delta_{trs}H, \\qquad n = \\frac{m}{M}",
      },
      authoredExample: {
        prompt: "How much heat is needed to melt 54 g of ice at 0 °C? (Enthalpy of fusion of ice = 6.01 kJ mol⁻¹)",
        steps: [
          "Given: \\(m = 54\\ \\text{g}\\), \\(M(\\text{H}_2\\text{O}) = 18\\ \\text{g mol}^{-1}\\), \\(\\Delta_{fus}H = 6.01\\ \\text{kJ mol}^{-1}\\).",
          "Moles: \\(n = 54/18 = 3\\ \\text{mol}\\).",
          "Formula: \\(q = n \\times \\Delta_{fus}H\\).",
          "Substitution: \\(q = 3\\ \\text{mol} \\times 6.01\\ \\text{kJ mol}^{-1} = 18.03\\ \\text{kJ}\\).",
        ],
        answer: "18.03 kJ of heat is absorbed",
      },
      selfCheckExample: {
        prompt: "15.6 g of benzene (C₆H₆) is vaporized by supplying 6.0 kJ of heat. Find the enthalpy of vaporization of benzene.",
        steps: ["\\(M = 78\\ \\text{g mol}^{-1}\\), \\(n = 15.6/78 = 0.2\\ \\text{mol}\\).", "\\(\\Delta_{vap}H = 6.0/0.2 = 30.0\\ \\text{kJ mol}^{-1}\\)."],
        answer: "30.0 kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "How much heat is released when 36 g of steam condenses at 100 °C? (Enthalpy of vaporization = 40.7 kJ mol⁻¹)", answer: "\\(2 \\times 40.7 = 81.4\\ \\text{kJ}\\) released" },
        { prompt: "A substance has an enthalpy of fusion of 10 kJ mol⁻¹ and of vaporization of 30 kJ mol⁻¹. Find its enthalpy of sublimation.", answer: "40 kJ mol⁻¹" },
      ],
      pyqExampleId: "056370df-9df3-4070-b8b8-0590f0ed0be9",
      traps: [
        {
          title: "Dividing by grams instead of moles",
          body: "A molar enthalpy is per mole. Dividing the heat by the mass gives kJ per gram, which matches none of the options.",
        },
        {
          title: "Leaving out the warming step",
          body: "From ice at 0 °C to steam at 100 °C there are three steps: melt, warm the water, boil. The middle one uses \\(m c \\Delta T\\), not an enthalpy.",
        },
      ],
    },
  ],
};
