import type { SubtopicNote } from "@/app/notes/_types";

export const TYPES_SOLUBILITY_HENRY_NOTE: SubtopicNote = {
  subtopicName: "Types of Solutions, Solubility and Henry's Law",
  title: "Types of Solutions, Solubility and Henry's Law",
  oneLineDefinition:
    "A solution is named by the physical states of its solute and solvent; a solid's solubility follows the enthalpy of solution and Le Chatelier; a gas's solubility is Henry's law, S = K_H · P.",
  whyItMatters:
    "29 PYQs, one HARD — the chapter's largest page and its most recall-heavy. Half the stems are Henry's law arithmetic (solubility from K_H and pressure, or K_H from solubility), and the rest name a solution type from an example, pick the salt whose solubility falls on heating (sodium sulphate, four sittings), state which concentration term depends on temperature, or add a lattice and a hydration enthalpy. " +
    "Learn the solution-type table and the one salt; the arithmetic is a single multiplication.",
  concepts: [
    // 1 — types of solutions (reference)
    {
      kind: "reference" as const,
      slug: "cetsol-types-of-solutions",
      name: "Types of Solutions by the States of Solute and Solvent",
      intuition:
        "The solvent is the component present in the larger amount and in the same physical state as the solution; the solute is what is dissolved in it. Nine pairings are possible, and the exam asks you to name the pairing for a given everyday example.",
      definition:
        "- **Solvent** decides the state of the solution; **solute** is the minor component.\n" +
        "- Gas in liquid: carbonated water (\\(\\text{CO}_2\\) in water). Liquid in liquid: ethanol in water, gasoline (liquid hydrocarbons in each other). Solid in liquid: sea water (salt in water), sugar solution.\n" +
        "- Solid in gas: iodine vapour in air, camphor in nitrogen. Liquid in gas: chloroform mixed with nitrogen, humidity. Gas in gas: air.\n" +
        "- Solid in solid: alloys — brass (zinc in copper), bronze (tin in copper). Gas in solid: hydrogen in palladium. Liquid in solid: amalgam (mercury in a metal).",
      table: {
        columns: ["Solute", "Solvent", "Example"],
        rows: [
          { cells: ["Gas", "Liquid", "Carbonated water (\\(\\text{CO}_2\\) in water), oxygen in water"], noteAmber: "The gas is the solute even though it is what the drink is named for." },
          { cells: ["Liquid", "Liquid", "Ethanol in water; gasoline (a liquid-in-liquid mixture of hydrocarbons)"] },
          { cells: ["Solid", "Liquid", "Sea water (salt in water), sugar in water"] },
          { cells: ["Solid", "Gas", "Iodine vapour in air; camphor in nitrogen"], noteAmber: "Iodine in air is solid-in-GAS — air is the solvent, whatever the amount of iodine." },
          { cells: ["Liquid", "Gas", "Chloroform mixed with nitrogen; water vapour in air (humidity)"] },
          { cells: ["Gas", "Gas", "Air (oxygen in nitrogen)"] },
          { cells: ["Solid", "Solid", "Alloys — brass (zinc in copper), bronze (tin in copper)"], noteAmber: "An alloy is a solid solution; bronze is NOT solid-in-liquid." },
          { cells: ["Gas", "Solid", "Hydrogen adsorbed in palladium"] },
          { cells: ["Liquid", "Solid", "Amalgam — mercury in sodium or in silver"] },
        ],
        caption: "Name the solute first, then the solvent: 'solid in gas' means a solid solute in a gaseous solvent.",
      },
      selfCheckExample: {
        prompt: "Classify (i) brass, (ii) mist, (iii) oxygen dissolved in a pond.",
        steps: [
          "Brass: zinc in copper — solid in solid.",
          "Mist: water droplets in air — liquid in gas.",
          "Oxygen in pond water — gas in liquid.",
        ],
        answer: "(i) solid in solid; (ii) liquid in gas; (iii) gas in liquid.",
      },
      practiceSet: [
        { prompt: "Iodine in air is a solution of?", answer: "Solid in gas" },
        { prompt: "Bronze is a solution of?", answer: "Solid in solid" },
        { prompt: "Carbonated water is a solution of?", answer: "Gas in liquid" },
        { prompt: "Chloroform in nitrogen is a solution of?", answer: "Liquid in gas" },
      ],
      pyqExampleId: "1edf5925-8bab-47e1-bd11-15e03f70a4cd",
      traps: [
        {
          title: "Naming the solvent first",
          body:
            "'Solid in gas' is a solid solute in a gas solvent. Iodine in air is solid-in-gas, not gas-in-solid; the reversed option is always offered.",
        },
      ],
    },

    // 2 — concentration terms and temperature
    {
      kind: "formula" as const,
      slug: "cetsol-concentration-terms-and-temperature",
      name: "Concentration Terms: Which Ones Change With Temperature",
      intuition:
        "Molarity divides by the solution's VOLUME, and volume expands on heating — so molarity is the temperature-dependent term. Molality, mole fraction and mass per cent use masses and mole counts, which do not change with temperature.",
      definition:
        "- Molarity \\(M = \\dfrac{n_{\\text{solute}}}{V_{\\text{solution}}\\,(\\text{L})}\\) — temperature dependent.\n" +
        "- Molality \\(m = \\dfrac{n_{\\text{solute}}}{W_{\\text{solvent}}\\,(\\text{kg})}\\), mole fraction \\(x = \\dfrac{n}{n_{\\text{total}}}\\), mass per cent \\(= \\dfrac{W_{\\text{solute}}}{W_{\\text{solution}}} \\times 100\\) — all temperature independent.\n" +
        "- Colligative-property formulas use molality (or mole fraction), which is why they hold at any temperature.\n" +
        "- A hydrated salt in a mass-per-cent problem: the water of crystallisation counts as solvent. \\(50\\) g of \\(12\\%\\) \\(\\text{BaCl}_2\\) needs \\(6\\) g of \\(\\text{BaCl}_2\\), i.e. \\(6 \\times \\dfrac{244}{208} = 7.04\\) g of \\(\\text{BaCl}_2\\cdot2\\text{H}_2\\text{O}\\), and \\(50 - 7.04 \\approx 42.9\\) g of added water.",
      formula: {
        label: "Concentration terms",
        latex:
          "M = \\frac{n}{V(\\text{L})} \\ (\\text{T-dependent}),\\qquad m = \\frac{n}{W_{\\text{solvent}}(\\text{kg})},\\qquad x = \\frac{n}{n_{\\text{total}}}",
      },
      authoredExample: {
        prompt: "\\(4\\) g of NaOH is dissolved in \\(96\\) g of water. Find the mass per cent and the molality (NaOH \\(= 40\\) g mol\\(^{-1}\\)).",
        steps: [
          "Mass per cent \\(= \\dfrac{4}{100} \\times 100 = 4\\%\\).",
          "Molality \\(= \\dfrac{4/40}{0.096} = 1.04\\) mol kg\\(^{-1}\\).",
        ],
        answer: "\\(4\\%\\); \\(1.04\\) mol kg\\(^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "How much \\(\\text{CuSO}_4\\cdot5\\text{H}_2\\text{O}\\) (\\(250\\) g mol\\(^{-1}\\)) gives \\(100\\) g of a \\(16\\%\\) (by mass) \\(\\text{CuSO}_4\\) solution? (\\(\\text{CuSO}_4 = 160\\) g mol\\(^{-1}\\))",
        steps: [
          "\\(\\text{CuSO}_4\\) needed \\(= 16\\) g \\(= 0.1\\) mol; hydrated salt \\(= 0.1 \\times 250 = 25\\) g; water to add \\(= 75\\) g.",
        ],
        answer: "\\(25\\) g of the hydrate with \\(75\\) g of water",
      },
      practiceSet: [
        { prompt: "Which term depends on temperature: molality or molarity?", answer: "Molarity" },
        { prompt: "Molality of \\(0.5\\) mol in \\(250\\) g solvent?", answer: "\\(2\\) mol kg\\(^{-1}\\)" },
        { prompt: "Mole fraction of solute with \\(1\\) mol solute in \\(9\\) mol solvent?", answer: "\\(0.1\\)" },
        { prompt: "Mass of \\(\\text{BaCl}_2\\) in \\(50\\) g of a \\(12\\%\\) solution?", answer: "\\(6\\) g" },
      ],
      pyqExampleId: "ef07ab96-f17b-4f49-9e05-52012a2581eb",
      traps: [
        {
          title: "Ignoring the water of crystallisation",
          body:
            "\\(\\text{BaCl}_2\\cdot2\\text{H}_2\\text{O}\\) brings its own water; the water to ADD is \\(50 - 7.04\\), not \\(50 - 6\\). Option (D) \\(50.0\\) g is the version that forgot the hydrate entirely.",
        },
      ],
    },

    // 3 — solubility of solids and enthalpy
    {
      kind: "formula" as const,
      slug: "cetsol-solubility-of-solids-and-enthalpy-of-solution",
      name: "Solubility of Solids: Like Dissolves Like, ΔH of Solution, and the Salt That Dissolves Less on Heating",
      intuition:
        "A solid dissolves when solute–solvent attractions are comparable to the solute–solute and solvent–solvent ones. The enthalpy of solution is the lattice enthalpy (to be paid) plus the hydration enthalpy (recovered); if dissolution is exothermic, heating REDUCES solubility — sodium sulphate is the exam's standard example.",
      definition:
        "- **Like dissolves like**: a polar solute dissolves in a polar solvent because solute–solute, solute–solvent and solvent–solvent interactions are of similar magnitude.\n" +
        "- \\(\\Delta H_{\\text{sol}} = \\Delta H_{\\text{lattice}} + \\Delta H_{\\text{hyd}}\\): KCl \\(699 + (-681.8) = 17.2\\) kJ mol\\(^{-1}\\) (endothermic); NaCl with \\(\\Delta H_{\\text{sol}} = 4\\) and lattice \\(790\\) has \\(\\Delta H_{\\text{hyd}} = -786\\) kJ mol\\(^{-1}\\).\n" +
        "- Most salts (NaCl, KNO\\(_3\\), NaNO\\(_3\\), KBr, NaBr) dissolve endothermically and become MORE soluble on heating. \\(\\text{Na}_2\\text{SO}_4\\) is the exception — its solubility falls above about \\(32^\\circ\\)C, when the decahydrate gives way to the anhydrous salt whose dissolution is exothermic.\n" +
        "- Le Chatelier: exothermic dissolution + heating → equilibrium shifts back to the solid.",
      formula: {
        label: "Enthalpy of solution",
        latex:
          "\\Delta H_{\\text{sol}} = \\Delta H_{\\text{lattice}} + \\Delta H_{\\text{hyd}}",
      },
      authoredExample: {
        prompt: "The lattice enthalpy of a salt is \\(760\\) kJ mol\\(^{-1}\\) and its hydration enthalpy is \\(-740\\) kJ mol\\(^{-1}\\). Is its dissolution endothermic, and does its solubility rise on heating?",
        steps: [
          "\\(\\Delta H_{\\text{sol}} = 760 - 740 = +20\\) kJ mol\\(^{-1}\\): endothermic.",
          "Heating an endothermic dissolution favours dissolving: solubility rises.",
        ],
        answer: "Endothermic (\\(+20\\) kJ mol\\(^{-1}\\)); solubility increases with temperature.",
      },
      selfCheckExample: {
        prompt: "A salt has \\(\\Delta H_{\\text{sol}} = -12\\) kJ mol\\(^{-1}\\) and hydration enthalpy \\(-812\\) kJ mol\\(^{-1}\\). Find its lattice enthalpy and predict the effect of heating on its solubility.",
        steps: [
          "\\(\\Delta H_{\\text{lattice}} = -12 - (-812) = 800\\) kJ mol\\(^{-1}\\). Exothermic dissolution: solubility falls on heating.",
        ],
        answer: "\\(800\\) kJ mol\\(^{-1}\\); solubility decreases with temperature.",
      },
      practiceSet: [
        { prompt: "Salt whose solubility falls on heating?", answer: "\\(\\text{Na}_2\\text{SO}_4\\)" },
        { prompt: "\\(699 + (-681.8) = ?\\)", answer: "\\(17.2\\) kJ mol\\(^{-1}\\)" },
        { prompt: "\\(\\Delta H_{\\text{hyd}}\\) if \\(\\Delta H_{\\text{sol}} = 4\\), lattice \\(790\\)?", answer: "\\(-786\\) kJ mol\\(^{-1}\\)" },
        { prompt: "Why does a polar solute dissolve in a polar solvent?", answer: "The three interactions are of similar magnitude." },
      ],
      pyqExampleId: "ffce4912-6fcc-4c6a-8f6b-ffc1e040fe61",
      traps: [
        {
          title: "Subtracting the hydration enthalpy",
          body:
            "\\(\\Delta H_{\\text{hyd}}\\) is already negative; ADD it. \\(699 - (-681.8)\\) gives \\(1380\\), not on the list, but a sign slip in the NaCl stem gives \\(+786\\), which is option (A).",
        },
      ],
    },

    // 4 — Henry's law and Dalton
    {
      kind: "formula" as const,
      slug: "cetsol-henrys-law",
      name: "Henry's Law: S = K_H · P, and Partial Pressures From Mole Fractions",
      intuition:
        "The amount of gas that dissolves is proportional to its partial pressure above the liquid: \\(S = K_H\\,P\\) in the CET form (with \\(K_H\\) in mol dm\\(^{-3}\\) atm\\(^{-1}\\)). Partial pressure itself comes from Dalton's law, \\(P_i = x_i P_{\\text{total}}\\).",
      definition:
        "- \\(S = K_H\\,P\\): \\(K_H = 6.85 \\times 10^{-4}\\) mol dm\\(^{-3}\\) atm\\(^{-1}\\) at \\(0.8\\) atm gives \\(5.48 \\times 10^{-4}\\) mol dm\\(^{-3}\\); \\(K_H = 0.16\\), \\(P = 0.15\\) bar gives \\(2.4 \\times 10^{-2}\\).\n" +
        "- \\(K_H = \\dfrac{S}{P}\\): \\(\\dfrac{5.14 \\times 10^{-4}}{0.75} = 6.85 \\times 10^{-4}\\); \\(\\dfrac{0.028}{0.346} = 0.081\\).\n" +
        "- Dalton: \\(x_i = \\dfrac{P_i}{P_{\\text{total}}}\\). Partial pressures \\(4.5\\) and \\(5.5\\) bar give mole fractions \\(0.45\\), \\(0.55\\); \\(64\\) g O\\(_2\\) (\\(2\\) mol) with \\(160\\) g Ne (\\(8\\) mol) at \\(25\\) bar gives \\(P_{\\text{O}_2} = 0.2 \\times 25 = 5\\) bar.\n" +
        "- Gases that REACT with water (\\(\\text{CO}_2\\), \\(\\text{NH}_3\\), HCl) do not follow Henry's law strictly; \\(\\text{O}_2\\) has very low physical solubility. Solubility of a gas falls as temperature rises.\n" +
        "- Statement form: 'solubility of a gas in a liquid is directly proportional to the pressure of the gas over the solution' — Henry's law, not Raoult's or Dalton's.",
      formula: {
        label: "Henry and Dalton",
        latex:
          "S = K_H\\,P \\qquad K_H = \\frac{S}{P} \\qquad P_i = x_i\\,P_{\\text{total}}",
      },
      authoredExample: {
        prompt: "The Henry's law constant of a gas is \\(0.12\\) mol dm\\(^{-3}\\) bar\\(^{-1}\\). Find its solubility when its partial pressure is \\(0.25\\) bar, and the pressure needed for a solubility of \\(0.06\\) mol dm\\(^{-3}\\).",
        steps: [
          "\\(S = 0.12 \\times 0.25 = 0.03\\) mol dm\\(^{-3}\\).",
          "\\(P = \\dfrac{0.06}{0.12} = 0.5\\) bar.",
        ],
        answer: "\\(0.03\\) mol dm\\(^{-3}\\); \\(0.5\\) bar",
      },
      selfCheckExample: {
        prompt: "A vessel holds \\(28\\) g of N\\(_2\\) and \\(32\\) g of O\\(_2\\) at a total pressure of \\(6\\) bar. Find the partial pressure of oxygen and its solubility in water if \\(K_H = 0.02\\) mol dm\\(^{-3}\\) bar\\(^{-1}\\).",
        steps: [
          "\\(1\\) mol N\\(_2\\), \\(1\\) mol O\\(_2\\): \\(x_{\\text{O}_2} = 0.5\\), \\(P = 3\\) bar.",
          "\\(S = 0.02 \\times 3 = 0.06\\) mol dm\\(^{-3}\\).",
        ],
        answer: "\\(3\\) bar; \\(0.06\\) mol dm\\(^{-3}\\)",
      },
      practiceSet: [
        { prompt: "\\(K_H = 0.159\\), \\(P = 0.346\\) bar: \\(S = ?\\)", answer: "\\(0.055\\) mol dm\\(^{-3}\\)" },
        { prompt: "\\(S = 0.028\\), \\(P = 0.346\\): \\(K_H = ?\\)", answer: "\\(0.081\\) mol dm\\(^{-3}\\) bar\\(^{-1}\\)" },
        { prompt: "Mole fraction of O\\(_2\\) for \\(2\\) mol O\\(_2\\) and \\(8\\) mol Ne?", answer: "\\(0.2\\)" },
        { prompt: "Gas with very low solubility in water?", answer: "\\(\\text{O}_2\\)" },
      ],
      pyqExampleId: "871b02c6-efb3-46f9-aba1-2656a79db1a2",
      traps: [
        {
          title: "Dividing by the pressure",
          body:
            "In the CET form \\(S = K_H P\\); solubility is \\(K_H\\) TIMES \\(P\\). Dividing gives \\(8.56 \\times 10^{-4}\\), and the un-multiplied \\(K_H\\) itself is offered as option (C).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Vapour Pressure and Raoult's Law — the other proportionality, for the solvent",
      href: "/notes/mht-cet-chemistry/solutions/cetsol-vapour-pressure-raoult",
    },
  ],
};
