import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_TH_ENTHALPY_NOTE: SubtopicNote = {
  subtopicName: "Enthalpy and Thermochemistry",
  title: "Enthalpy and Thermochemistry",
  oneLineDefinition:
    "Enthalpy as heat at constant pressure, the link ΔH = ΔU + Δn(g)RT and Cp − Cv = R, the sign of a reaction enthalpy, standard enthalpies of formation, Hess's law, and enthalpies of combustion, atomisation, bonds and lattices.",
  whyItMatters:
    "Six NEET questions from 2021 to 2025. Three use ΔH = ΔU + Δn(g)RT: the relation itself (2023), ΔU from ΔH for a gas reaction (Re-NEET 2024) and its result Cp − Cv = R for an ideal gas (2021). Two ask about the sign of ΔH: the signs of ΔH and q for an endothermic reaction (Re-NEET 2024) and the energy profile of an exothermic one (2025). One is a Hess's law cycle for the formation enthalpy of an ion (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncht-enthalpy",
      name: "Enthalpy, and ΔH against ΔU",
      intuition:
        "Most reactions are done in open flasks, at the constant pressure of the air, not in sealed vessels. If a reaction makes gas, part of the heat goes into pushing back the atmosphere. Enthalpy H is defined so that its change is exactly the heat taken in at constant pressure. The gap between ΔH and ΔU is just that pushing work, and only gases do enough of it to count.",
      definition:
        "- **Enthalpy:** \\(H = U + pV\\). Like U, H is a state function.\n" +
        "- At constant pressure \\(\\Delta H = \\Delta U + p\\Delta V = q_p\\). At constant volume \\(\\Delta U = q_V\\).\n" +
        "- For gases \\(p\\Delta V = \\Delta n_g RT\\), so \\(\\Delta H = \\Delta U + \\Delta n_g RT\\), where \\(\\Delta n_g\\) = moles of gaseous products minus moles of gaseous reactants. Solids and liquids are left out.\n" +
        "- \\(\\Delta n_g = 0\\): \\(\\Delta H = \\Delta U\\). \\(\\Delta n_g > 0\\): \\(\\Delta H > \\Delta U\\). \\(\\Delta n_g < 0\\): \\(\\Delta H < \\Delta U\\).\n" +
        "- **Heat capacity:** \\(q = C\\Delta T\\). For one mole of an ideal gas \\(q_V = C_v\\Delta T = \\Delta U\\) and \\(q_p = C_p\\Delta T = \\Delta H\\); since \\(\\Delta H = \\Delta U + R\\Delta T\\), \\(C_p - C_v = R\\).",
      formula: {
        label: "Enthalpy and internal energy",
        latex: "\\Delta H = \\Delta U + \\Delta n_g RT, \\qquad C_p - C_v = R",
        symbols: [
          { symbol: "\\(\\Delta n_g\\)", meaning: "moles of gaseous products minus moles of gaseous reactants" },
          { symbol: "\\(C_p, C_v\\)", meaning: "molar heat capacities at constant pressure and constant volume" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(\\text{CaCO}_3\\text{(s)} \\rightarrow \\text{CaO(s)} + \\text{CO}_2\\text{(g)}\\), \\(\\Delta H = +178.3\\) kJ at 298 K. Find \\(\\Delta U\\) (R = 8.314 J/(K mol)).",
        steps: [
          "Count only the gases: one mole of \\(\\text{CO}_2\\) is made and no gas is used, so \\(\\Delta n_g = 1 - 0 = 1\\).",
          "\\(\\Delta n_g RT = 1 \\times 8.314 \\times 298 = 2478\\) J \\(= 2.48\\) kJ.",
          "\\(\\Delta U = \\Delta H - \\Delta n_g RT = 178.3 - 2.48 = 175.8\\) kJ.",
        ],
        answer: "\\(\\Delta U \\approx +175.8\\) kJ",
      },
      selfCheckExample: {
        prompt:
          "For which reaction is ΔH equal to ΔU: \\(\\text{H}_2\\text{(g)} + \\text{Cl}_2\\text{(g)} \\rightarrow 2\\text{HCl(g)}\\) or \\(2\\text{CO(g)} + \\text{O}_2\\text{(g)} \\rightarrow 2\\text{CO}_2\\text{(g)}\\)?",
        steps: [
          "First reaction: 2 moles of gas on each side, so \\(\\Delta n_g = 0\\).",
          "Second reaction: 3 moles of gas become 2, so \\(\\Delta n_g = -1\\) and \\(\\Delta H < \\Delta U\\).",
        ],
        answer: "The hydrogen and chlorine reaction",
      },
      practiceSet: [
        { prompt: "Find Δn(g) for the burning of graphite, C(s) + O₂(g) → CO₂(g).", answer: "\\(\\Delta n_g = 0\\)" },
        { prompt: "For 2 mol of an ideal gas, what is Cp − Cv?", answer: "\\(2R\\)" },
        { prompt: "For PCl₅(g) → PCl₃(g) + Cl₂(g), is ΔH greater or less than ΔU?", answer: "Greater, since \\(\\Delta n_g = +1\\)" },
        {
          prompt: "Find ΔH − ΔU at 300 K for 2CO(g) + O₂(g) → 2CO₂(g), with R = 8.314 J/(K mol).",
          answer: "\\(-2494\\) J (\\(\\Delta n_g = -1\\))",
        },
      ],
      pyqExampleId: "a931f537-604d-4843-acbd-75b4b256d50e",
      traps: [
        {
          title: "Count only the gases",
          body: "In \\(\\Delta n_g\\) solids and liquids are left out. When methane burns to carbon dioxide and liquid water, the water does not count: \\(\\Delta n_g = 1 - 3 = -2\\).",
        },
        {
          title: "Products minus reactants",
          body: "\\(\\Delta n_g\\) is gaseous products minus gaseous reactants. For \\(\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3\\) it is \\(2 - 4 = -2\\), so \\(\\Delta U = \\Delta H + 2RT\\).",
        },
        {
          title: "Match the units before adding",
          body: "\\(\\Delta H\\) is usually given in kJ but \\(RT\\) with R = 8.314 comes out in J: at 300 K, \\(RT = 2494\\) J \\(= 2.494\\) kJ. Convert one of them before you add.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncht-reaction-enthalpy",
      name: "Reaction enthalpy and standard enthalpy of formation",
      intuition:
        "A reaction either gives heat out or takes it in. If the products hold less enthalpy than the reactants, the difference is released: the reaction is exothermic and ΔH is negative. If the products hold more, the reaction must absorb heat: it is endothermic and ΔH is positive. To compare reactions fairly we fix the conditions, and we measure every compound from the same zero: its elements.",
      definition:
        "- \\(\\Delta_r H = \\sum a_i H_{\\text{products}} - \\sum b_i H_{\\text{reactants}}\\), with the coefficients of the balanced equation.\n" +
        "- **Exothermic:** \\(\\Delta_r H < 0\\), heat is given out. **Endothermic:** \\(\\Delta_r H > 0\\), heat is absorbed, so \\(q_p\\) is positive too.\n" +
        "- **Standard state:** the pure substance at 1 bar and the stated temperature, usually 298 K.\n" +
        "- **Standard enthalpy of formation** \\(\\Delta_f H^\\ominus\\): the enthalpy change when one mole of a compound is formed from its elements in their most stable states (reference states). For an element in its reference state it is zero: \\(\\text{H}_2\\text{(g)}\\), \\(\\text{O}_2\\text{(g)}\\), C (graphite), \\(\\text{Br}_2\\text{(l)}\\).\n" +
        "- \\(\\Delta_r H^\\ominus = \\sum a_i\\,\\Delta_f H^\\ominus(\\text{products}) - \\sum b_i\\,\\Delta_f H^\\ominus(\\text{reactants})\\).\n" +
        "- A **thermochemical equation** gives the physical states and the \\(\\Delta_r H\\) for the moles written. Reverse it and \\(\\Delta_r H\\) changes sign; double it and \\(\\Delta_r H\\) doubles.\n" +
        "- On an **energy profile** the products of an exothermic reaction sit below the reactants by \\(|\\Delta H|\\). The barrier between them is the activation energy, and \\(\\Delta H = E_a(\\text{forward}) - E_a(\\text{backward})\\).",
      formula: {
        label: "Reaction enthalpy from formation enthalpies",
        latex: "\\Delta_r H^\\ominus = \\sum a_i\\,\\Delta_f H^\\ominus_{\\text{products}} - \\sum b_i\\,\\Delta_f H^\\ominus_{\\text{reactants}}",
        symbols: [
          { symbol: "\\(a_i, b_i\\)", meaning: "coefficients of products and reactants in the balanced equation" },
          { symbol: "\\(\\Delta_f H^\\ominus\\)", meaning: "standard enthalpy of formation, per mole" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(\\Delta_r H^\\ominus\\) for \\(\\text{Fe}_2\\text{O}_3\\text{(s)} + 3\\text{H}_2\\text{(g)} \\rightarrow 2\\text{Fe(s)} + 3\\text{H}_2\\text{O(l)}\\). \\(\\Delta_f H^\\ominus\\) (kJ/mol): \\(\\text{Fe}_2\\text{O}_3\\text{(s)}\\) \\(-824.2\\), \\(\\text{H}_2\\text{O(l)}\\) \\(-285.8\\).",
        steps: [
          "Fe(s) and \\(\\text{H}_2\\text{(g)}\\) are elements in their reference states, so their \\(\\Delta_f H^\\ominus\\) is zero.",
          "Products: \\(3 \\times (-285.8) = -857.4\\) kJ. Reactants: \\(-824.2\\) kJ.",
          "\\(\\Delta_r H^\\ominus = -857.4 - (-824.2) = -33.2\\) kJ.",
        ],
        answer: "\\(-33.2\\) kJ (exothermic)",
      },
      selfCheckExample: {
        prompt:
          "Using \\(\\Delta_f H^\\ominus\\) of CO(g) \\(= -110.5\\) and of \\(\\text{CO}_2\\text{(g)} = -393.5\\) kJ/mol, find \\(\\Delta_r H^\\ominus\\) for \\(\\text{CO(g)} + \\tfrac{1}{2}\\text{O}_2\\text{(g)} \\rightarrow \\text{CO}_2\\text{(g)}\\).",
        steps: [
          "\\(\\text{O}_2\\) is an element in its reference state: zero.",
          "\\(\\Delta_r H^\\ominus = -393.5 - (-110.5) = -283.0\\) kJ.",
        ],
        answer: "\\(-283.0\\) kJ",
      },
      practiceSet: [
        { prompt: "A reaction has ΔH = −50 kJ/mol. On its energy profile, where do the products lie compared with the reactants?", answer: "50 kJ/mol below the reactants" },
        { prompt: "What is the standard enthalpy of formation of O₂(g) at 298 K?", answer: "Zero" },
        { prompt: "A thermochemical equation has ΔH = −92 kJ. What is ΔH for the reverse reaction?", answer: "\\(+92\\) kJ" },
        {
          prompt: "A reaction has a forward activation energy of 120 kJ/mol and a backward activation energy of 150 kJ/mol. Find ΔH.",
          answer: "\\(-30\\) kJ/mol",
        },
      ],
      pyqExampleId: "8e866383-69e8-4959-ade8-05d87e0ffc6a",
      traps: [
        {
          title: "Bromine's reference state is a liquid",
          body: "\\(\\Delta_f H^\\ominus\\) is zero for \\(\\text{Br}_2\\text{(l)}\\), not for \\(\\text{Br}_2\\text{(g)}\\). Chlorine is a gas at 298 K, so \\(\\Delta_f H^\\ominus\\) of \\(\\text{Cl}_2\\text{(g)}\\) is zero.",
        },
        {
          title: "Diamond is not carbon's reference state",
          body: "Graphite is the most stable form of carbon, so \\(\\Delta_f H^\\ominus\\) is zero for graphite and not for diamond.",
        },
        {
          title: "Multiply by the coefficients",
          body: "Each \\(\\Delta_f H^\\ominus\\) is per mole. Multiply it by the coefficient in the balanced equation before adding; using one mole of each species is the commonest slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncht-hess",
      name: "Hess's law and enthalpies of different types",
      intuition:
        "Enthalpy is a state function, so the enthalpy change from reactants to products is the same whether the reaction goes in one step or in several. That lets you treat thermochemical equations like algebra: add them, reverse them, multiply them, and their ΔH values follow along. Many enthalpies that cannot be measured directly, such as the formation of CO or the lattice enthalpy of a salt, are found this way.",
      definition:
        "- **Hess's law:** if a reaction takes place in several steps, its standard reaction enthalpy is the sum of the standard enthalpies of the intermediate reactions, at the same temperature.\n" +
        "- To build a target equation: reverse an equation and change the sign of its \\(\\Delta H\\); multiply an equation and multiply its \\(\\Delta H\\) by the same number; then add.\n" +
        "- **Enthalpy of combustion** \\(\\Delta_c H^\\ominus\\): the enthalpy change per mole of a substance when it burns completely in oxygen. It is always negative.\n" +
        "- **Enthalpy of atomisation** \\(\\Delta_a H^\\ominus\\): the enthalpy change to break one mole of a substance completely into gaseous atoms. For \\(\\text{H}_2\\text{(g)} \\rightarrow 2\\text{H(g)}\\) it is 435.0 kJ/mol, the same as the H-H bond dissociation enthalpy.\n" +
        "- **Bond enthalpy:** for a reaction in which every species is a gas, \\(\\Delta_r H^\\ominus = \\sum\\) bond enthalpies of reactants \\(- \\sum\\) bond enthalpies of products.\n" +
        "- **Lattice enthalpy:** the enthalpy change when one mole of an ionic compound dissociates into its gaseous ions; for \\(\\text{NaCl(s)} \\rightarrow \\text{Na}^+\\text{(g)} + \\text{Cl}^-\\text{(g)}\\) it is +788 kJ/mol. It is found with a **Born-Haber cycle**, which is Hess's law applied to sublimation, ionisation, bond dissociation, electron gain and the lattice step.",
      formula: {
        label: "Hess's law and bond enthalpy",
        latex: "\\Delta_r H = \\Delta_r H_1 + \\Delta_r H_2 + \\Delta_r H_3 + \\dots, \\qquad \\Delta_r H^\\ominus = \\sum \\text{B.E.}_{\\text{reactants}} - \\sum \\text{B.E.}_{\\text{products}}",
      },
      authoredExample: {
        prompt:
          "Find \\(\\Delta_f H^\\ominus\\) of CO(g) from (1) \\(\\text{C(graphite)} + \\text{O}_2\\text{(g)} \\rightarrow \\text{CO}_2\\text{(g)}\\), \\(\\Delta H = -393.5\\) kJ and (2) \\(\\text{CO(g)} + \\tfrac{1}{2}\\text{O}_2\\text{(g)} \\rightarrow \\text{CO}_2\\text{(g)}\\), \\(\\Delta H = -283.0\\) kJ.",
        steps: [
          "Target: \\(\\text{C(graphite)} + \\tfrac{1}{2}\\text{O}_2\\text{(g)} \\rightarrow \\text{CO(g)}\\).",
          "Keep (1) as it is and reverse (2): \\(\\text{CO}_2 \\rightarrow \\text{CO} + \\tfrac{1}{2}\\text{O}_2\\), \\(\\Delta H = +283.0\\) kJ.",
          "Add: \\(\\text{CO}_2\\) cancels and half the oxygen cancels. \\(\\Delta H = -393.5 + 283.0 = -110.5\\) kJ.",
        ],
        answer: "\\(-110.5\\) kJ/mol",
      },
      selfCheckExample: {
        prompt:
          "Bond enthalpies (kJ/mol): H-H 435, Cl-Cl 243, H-Cl 431. Find \\(\\Delta_r H\\) for \\(\\text{H}_2\\text{(g)} + \\text{Cl}_2\\text{(g)} \\rightarrow 2\\text{HCl(g)}\\).",
        steps: [
          "Bonds broken (reactants): \\(435 + 243 = 678\\) kJ.",
          "Bonds formed (products): \\(2 \\times 431 = 862\\) kJ.",
          "\\(\\Delta_r H = 678 - 862 = -184\\) kJ.",
        ],
        answer: "\\(-184\\) kJ",
      },
      practiceSet: [
        {
          prompt: "Combustion enthalpies (kJ/mol): C(graphite) −393.5, H₂(g) −285.8 (to liquid water), CH₄(g) −890.3. Find the standard enthalpy of formation of methane.",
          answer: "\\(-74.8\\) kJ/mol",
        },
        { prompt: "Is the lattice enthalpy of NaCl, for breaking the solid into gaseous ions, positive or negative?", answer: "Positive (+788 kJ/mol)" },
        { prompt: "An equation has ΔH = −x. What is ΔH for twice the reverse of that equation?", answer: "\\(+2x\\)" },
        {
          prompt: "Which is larger: the enthalpy of atomisation of Br₂(l) or the Br-Br bond enthalpy?",
          answer: "The enthalpy of atomisation: it also includes turning the liquid into gas",
        },
      ],
      pyqExampleId: "a7d0cba2-a8d4-4d5d-b94f-7c907dcd0780",
      traps: [
        {
          title: "Reversing an equation flips the sign",
          body: "When an equation is turned round to fit the target, its \\(\\Delta H\\) changes sign. Forgetting this on one equation of three is the usual Hess's law error.",
        },
        {
          title: "Bond enthalpies go reactants minus products",
          body: "With bond enthalpies, \\(\\Delta_r H\\) is bonds broken minus bonds formed, that is reactants minus products. With formation enthalpies it is the other way: products minus reactants.",
        },
        {
          title: "Bond enthalpies need gases",
          body: "The bond enthalpy rule holds only when every species is a gas. A liquid or solid also needs the enthalpy to turn it into gas, which bond enthalpies leave out.",
        },
        {
          title: "Combustion is per mole of fuel",
          body: "\\(\\Delta_c H^\\ominus\\) is quoted per mole of the substance burnt. If an equation burns 2 moles, its \\(\\Delta H\\) is twice the combustion enthalpy.",
        },
      ],
    },
  ],
};
