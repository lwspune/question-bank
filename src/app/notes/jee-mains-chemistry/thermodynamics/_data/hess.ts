import type { SubtopicNote } from "@/app/notes/_types";

export const HESS_CHTHERMO_NOTE: SubtopicNote = {
  subtopicName: "Hess's Law: Formation and Combustion Enthalpies",
  title: "Hess's Law: Formation and Combustion Enthalpies",
  oneLineDefinition:
    "A reaction's enthalpy from formation enthalpies (products minus reactants), from combustion enthalpies (reactants minus products), or by adding, reversing and scaling given equations.",
  whyItMatters:
    "Seventeen PYQs, nine of them numerical, and two from 2026. Four sum formation enthalpies, six work from combustion enthalpies, and seven add, reverse and scale given equations, several with the heat written on the product side.",
  concepts: [
    // C1 — reaction enthalpy from formation enthalpies
    {
      kind: "formula" as const,
      slug: "jcthermo-formation-sum",
      name: "Reaction enthalpy from formation enthalpies",
      intuition:
        "Enthalpy is a state function, so any reaction can be taken apart into its elements and rebuilt. Each compound's formation enthalpy is the cost of making it from elements; products minus reactants gives the reaction. Elements in their reference state cost nothing.",
      definition:
        "- \\(\\Delta_r H^\\circ = \\sum\\nu\\,\\Delta_f H^\\circ(\\text{products}) - \\sum\\nu\\,\\Delta_f H^\\circ(\\text{reactants})\\), with the coefficients \\(\\nu\\) of the balanced equation.\n" +
        "- \\(\\Delta_f H^\\circ = 0\\) for an element in its reference state at ANY temperature: \\(\\mathrm{O_2(g)}\\), \\(\\mathrm{H_2(g)}\\), C(graphite). It is not zero for O(g), C(diamond) or \\(\\mathrm{O_3(g)}\\).\n" +
        "- Standard state: the pure substance at 1 bar, at whatever temperature is stated. No temperature is built in.\n" +
        "- \\(\\Delta_f H^\\circ\\) is per mole of compound; scale it to match the equation.\n" +
        "- Heat per gram of a mixture: divide the equation's heat by the total mass of the reactants in it.",
      formula: {
        label: "Reaction enthalpy from formation enthalpies",
        latex:
          "\\Delta_r H^\\circ = \\sum \\nu\\,\\Delta_f H^\\circ_{\\mathrm{products}} - \\sum \\nu\\,\\Delta_f H^\\circ_{\\mathrm{reactants}}",
      },
      authoredExample: {
        prompt:
          "Find \\(\\Delta_r H^\\circ\\) for \\(\\mathrm{4NH_3(g) + 5O_2(g) \\to 4NO(g) + 6H_2O(g)}\\). \\(\\Delta_f H^\\circ\\) (kJ mol⁻¹): \\(\\mathrm{NH_3}\\) −46, NO +90, \\(\\mathrm{H_2O(g)}\\) −242.",
        steps: [
          "Products: \\(4(90) + 6(-242) = 360 - 1452 = -1092\\) kJ.",
          "Reactants: \\(4(-46) + 5(0) = -184\\) kJ.",
          "\\(\\Delta_r H^\\circ = -1092 - (-184) = -908\\) kJ.",
        ],
        answer: "\\(-908\\) kJ.",
      },
      selfCheckExample: {
        prompt:
          "Find \\(\\Delta_r H^\\circ\\) for \\(\\mathrm{Fe_2O_3(s) + 3CO(g) \\to 2Fe(s) + 3CO_2(g)}\\). \\(\\Delta_f H^\\circ\\) (kJ mol⁻¹): \\(\\mathrm{Fe_2O_3}\\) −824, CO −110.5, \\(\\mathrm{CO_2}\\) −393.5.",
        steps: [
          "Products: \\(2(0) + 3(-393.5) = -1180.5\\) kJ.",
          "Reactants: \\(-824 + 3(-110.5) = -1155.5\\) kJ.",
          "\\(\\Delta_r H^\\circ = -1180.5 + 1155.5 = -25\\) kJ.",
        ],
        answer: "\\(-25\\) kJ.",
      },
      practiceSet: [
        { prompt: "What is \\(\\Delta_f H^\\circ\\) of \\(\\mathrm{N_2(g)}\\) at 400 K?", answer: "\\(0\\)" },
        {
          prompt: "\\(\\Delta_f H^\\circ\\): \\(\\mathrm{CO_2}\\) −394, \\(\\mathrm{H_2O(l)}\\) −286, \\(\\mathrm{CH_4}\\) −75 kJ mol⁻¹. Find \\(\\Delta_c H^\\circ\\) of methane.",
          answer: "\\(-891\\) kJ mol⁻¹",
        },
        { prompt: "Is \\(\\Delta_f H^\\circ\\) of O(g) zero?", answer: "No; the reference state of oxygen is \\(\\mathrm{O_2(g)}\\)" },
        {
          prompt: "\\(\\mathrm{2Al + Cr_2O_3 \\to Al_2O_3 + 2Cr}\\), with \\(\\Delta_f H^\\circ\\) of \\(\\mathrm{Al_2O_3}\\) −1676 and \\(\\mathrm{Cr_2O_3}\\) −1140 kJ mol⁻¹. Find \\(\\Delta_r H^\\circ\\).",
          answer: "\\(-536\\) kJ",
        },
      ],
      pyqExampleId: "16f62e73-2c0d-45bd-8ae8-fc87725540ce", // 8 Apr 2026 S2 — 2H2S + 3O2 to 2H2O + 2SO2
      traps: [
        {
          title: "The standard state is not 0 °C",
          body:
            "'Standard' fixes the pressure at 1 bar and says nothing about temperature. So \\(\\Delta_f H^\\circ_{500}\\) of \\(\\mathrm{O_2(g)}\\) is zero too, and options that say 273 K are wrong.",
        },
        {
          title: "One mole of everything",
          body:
            "Multiply each \\(\\Delta_f H^\\circ\\) by its coefficient in the balanced equation before adding. Using one mole of each species is the most common slip on this page.",
        },
      ],
    },

    // C2 — formation enthalpy from combustion enthalpies
    {
      kind: "formula" as const,
      slug: "jcthermo-from-combustion",
      name: "Formation enthalpy from combustion enthalpies",
      intuition:
        "Most compounds cannot be made directly from their elements, but almost all of them burn. Burning the elements and burning the compound both end at the same carbon dioxide and water. So the difference between the two heats of combustion is the heat of formation.",
      definition:
        "- \\(\\Delta_f H(\\text{compound}) = \\sum\\nu\\,\\Delta_c H(\\text{elements}) - \\Delta_c H(\\text{compound})\\).\n" +
        "- \\(\\Delta_c H\\)(C, graphite) \\(= \\Delta_f H(\\mathrm{CO_2})\\); \\(\\Delta_c H(\\mathrm{H_2}) = \\Delta_f H(\\mathrm{H_2O})\\).\n" +
        "- Any reaction: \\(\\Delta_r H = \\sum\\Delta_c H(\\text{reactants}) - \\sum\\Delta_c H(\\text{products})\\). Reactants minus products: the reverse of the formation rule.\n" +
        "- The same answer comes from writing \\(\\Delta_c H = \\sum\\Delta_f H(\\text{products}) - \\sum\\Delta_f H(\\text{reactants})\\) and solving for the unknown \\(\\Delta_f H\\).",
      formula: {
        label: "Formation enthalpy from combustion enthalpies",
        latex: "\\Delta_f H = \\sum \\nu\\,\\Delta_c H_{\\mathrm{elements}} - \\Delta_c H_{\\mathrm{compound}}",
      },
      authoredExample: {
        prompt:
          "\\(\\Delta_c H\\) (kJ mol⁻¹): \\(\\mathrm{CH_4}\\) −890, C(graphite) −393, \\(\\mathrm{H_2}\\) −286. Find \\(\\Delta_f H\\) of methane.",
        steps: [
          "Formation: \\(\\mathrm{C(graphite) + 2H_2(g) \\to CH_4(g)}\\).",
          "\\(\\Delta_f H = [-393 + 2(-286)] - (-890)\\).",
          "\\(= -965 + 890 = -75\\) kJ mol⁻¹.",
        ],
        answer: "\\(-75\\) kJ mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "\\(\\Delta_c H\\) (kJ mol⁻¹): \\(\\mathrm{C_2H_4}\\) −1411, \\(\\mathrm{H_2}\\) −286, \\(\\mathrm{C_2H_6}\\) −1560. Find \\(\\Delta H\\) for \\(\\mathrm{C_2H_4(g) + H_2(g) \\to C_2H_6(g)}\\).",
        steps: [
          "With combustion data it is reactants minus products.",
          "\\(\\Delta H = (-1411 - 286) - (-1560) = -1697 + 1560 = -137\\) kJ.",
        ],
        answer: "\\(-137\\) kJ.",
      },
      practiceSet: [
        { prompt: "\\(\\Delta_c H\\) of graphite is −393.5 kJ mol⁻¹. What is \\(\\Delta_f H\\) of \\(\\mathrm{CO_2(g)}\\)?", answer: "\\(-393.5\\) kJ mol⁻¹" },
        {
          prompt: "\\(\\Delta_c H\\): C −394, \\(\\mathrm{H_2}\\) −286, \\(\\mathrm{C_2H_2}\\) −1300 kJ mol⁻¹. Find \\(\\Delta_f H\\) of \\(\\mathrm{C_2H_2}\\).",
          answer: "\\(+226\\) kJ mol⁻¹",
        },
        { prompt: "With combustion enthalpies, is \\(\\Delta_r H\\) reactants minus products or products minus reactants?", answer: "Reactants minus products" },
        {
          prompt: "\\(\\Delta_c H\\): A −1000, B −600 kJ mol⁻¹. Find \\(\\Delta_r H\\) for \\(\\mathrm{A \\to 2B}\\).",
          answer: "\\(+200\\) kJ",
        },
      ],
      pyqExampleId: "0669133b-d3d3-45e3-b442-085e35f7e90d", // 25 Jul 2022 — formation enthalpy of propane from combustion data
      traps: [
        {
          title: "Flipping the combustion rule",
          body:
            "With combustion enthalpies it is reactants minus products. Using products minus reactants gives the right size with the wrong sign, and that sign-flipped value is always an option.",
        },
        {
          title: "Which water?",
          body:
            "\\(\\Delta_c H(\\mathrm{H_2})\\) is about −286 kJ mol⁻¹ when the water is liquid and about −242 kJ mol⁻¹ when it is vapour. Use the value the question gives and match the water's state in the target equation.",
        },
      ],
    },

    // C3 — combining equations
    {
      kind: "formula" as const,
      slug: "jcthermo-combining-equations",
      name: "Hess's law: adding, reversing and scaling equations",
      intuition:
        "Treat the given equations like algebra. Reverse one and its ΔH changes sign; multiply it and ΔH is multiplied; add equations and their ΔH values add. Arrange them so that everything except the target cancels.",
      definition:
        "- Reverse an equation: \\(\\Delta H \\to -\\Delta H\\). Multiply it by \\(k\\): \\(\\Delta H \\to k\\,\\Delta H\\). Add equations: add their \\(\\Delta H\\).\n" +
        "- Heat written on the product side (\"… + 400 kJ\") is heat released: \\(\\Delta H = -400\\) kJ. On the reactant side it means \\(\\Delta H > 0\\).\n" +
        "- Keep physical states apart: a solid, its aqueous solution and a gas are different species.\n" +
        "- Mixed fuels: find the moles of each fuel, then add moles × heat for each.\n" +
        "- Gas volumes at 25 °C and 1 atm: 24.47 L mol⁻¹. The value 22.4 L mol⁻¹ is for 0 °C.",
      formula: {
        label: "Hess's law",
        latex: "\\Delta H_{\\mathrm{target}} = \\sum_i k_i\\,\\Delta H_i",
      },
      authoredExample: {
        prompt:
          "Given \\(\\mathrm{C(graphite) + O_2(g) \\to CO_2(g)}\\), \\(\\Delta H = -393.5\\) kJ, and \\(\\mathrm{CO(g) + \\tfrac{1}{2}O_2(g) \\to CO_2(g)}\\), \\(\\Delta H = -283.0\\) kJ, find \\(\\Delta H\\) for \\(\\mathrm{C(graphite) + \\tfrac{1}{2}O_2(g) \\to CO(g)}\\).",
        steps: [
          "Keep the first equation: −393.5 kJ.",
          "Reverse the second: \\(\\mathrm{CO_2(g) \\to CO(g) + \\tfrac{1}{2}O_2(g)}\\), +283.0 kJ.",
          "Add: \\(\\mathrm{CO_2}\\) and half an \\(\\mathrm{O_2}\\) cancel, leaving the target. \\(\\Delta H = -393.5 + 283.0 = -110.5\\) kJ.",
        ],
        answer: "\\(-110.5\\) kJ.",
      },
      selfCheckExample: {
        prompt:
          "\\(\\mathrm{S(s) + O_2(g) \\to SO_2(g)} + 297\\) kJ and \\(\\mathrm{2SO_2(g) + O_2(g) \\to 2SO_3(g)} + 196\\) kJ. Find \\(\\Delta H\\) for \\(\\mathrm{S(s) + \\tfrac{3}{2}O_2(g) \\to SO_3(g)}\\).",
        steps: [
          "Heat on the product side: \\(\\Delta H_1 = -297\\) kJ, \\(\\Delta H_2 = -196\\) kJ.",
          "Half of the second: \\(\\mathrm{SO_2 + \\tfrac{1}{2}O_2 \\to SO_3}\\), −98 kJ.",
          "Add it to the first: \\(-297 - 98 = -395\\) kJ.",
        ],
        answer: "\\(-395\\) kJ.",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{A \\to B}\\) has \\(\\Delta H = -40\\) kJ. Find \\(\\Delta H\\) for \\(\\mathrm{2B \\to 2A}\\).", answer: "\\(+80\\) kJ" },
        { prompt: "\\(\\mathrm{X + Y \\to Z} + 50\\) kJ. What is \\(\\Delta H\\)?", answer: "\\(-50\\) kJ" },
        { prompt: "What volume does one mole of an ideal gas occupy at 25 °C and 1 atm?", answer: "\\(24.47\\) L" },
        {
          prompt: "12 g of carbon burns: 40% of it to CO (\\(\\Delta H = -110\\) kJ mol⁻¹) and the rest to \\(\\mathrm{CO_2}\\) (\\(\\Delta H = -394\\) kJ mol⁻¹). How much heat is released?",
          answer: "\\(280.4\\) kJ",
        },
      ],
      pyqExampleId: "27b399a6-5ea1-4f6b-bf53-09b928d7b80a", // 2 Apr 2026 S1 — enthalpy of formation of solid Al2Cl6 from four equations
      traps: [
        {
          title: "Heat on the product side",
          body:
            "'\\(\\mathrm{C(s) + O_2(g) \\to CO_2(g)} + 400\\) kJ' means \\(\\Delta H = -400\\) kJ. Taking it as +400 flips every sign that follows.",
        },
        {
          title: "22.4 L at room temperature",
          body:
            "At 25 °C and 1 atm one mole of gas fills 24.47 L, not 22.4 L. With 22.4 the moles, and so the heat, come out about 9% too large.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Bond enthalpies — another route to a reaction enthalpy",
      href: "/notes/jee-mains-chemistry/thermodynamics/jch-thermo-bond",
    },
  ],
};
