import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TH_THERMOCHEMISTRY_NOTE: SubtopicNote = {
  subtopicName: "Thermochemistry",
  title: "Thermochemistry: Standard Enthalpies, Bond Enthalpies and Hess's Law",
  oneLineDefinition:
    "Standard states and thermochemical equations, enthalpies of formation and combustion, scaling a reaction enthalpy to a given mass, reaction enthalpy from bond enthalpies, and Hess's law of constant heat summation.",
  whyItMatters:
    "27 questions. Nine were set in board papers: state and explain Hess's law (2020 and 2026); use it to find an enthalpy of formation (2017 and 2022) or a reaction enthalpy (2024); find an enthalpy of combustion from enthalpies of formation (2024); scale a reaction enthalpy to a given mass (2019 and 2025); and find a C-Cl bond enthalpy (2016). The textbook adds standard states, the zero enthalpy of formation of elements, more bond enthalpy problems and more Hess's law cycles.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccth-standard-enthalpy",
      name: "Standard enthalpies of formation, combustion and reaction",
      intuition:
        "To compare reactions fairly, every enthalpy is quoted under the same agreed conditions, the standard state. The enthalpy of formation of each compound then works like a height above a common ground level, and the elements sit at ground level, zero. A reaction enthalpy is just the height of the products minus the height of the reactants.",
      definition:
        "- **Standard state:** the form in which a substance is most stable at 1 bar and 298 K; for species in solution, 1 M concentration.\n" +
        "- **Thermochemical equation:** a balanced equation with physical states (s, l, g, aq) and \\(\\Delta_r H^0\\) written on the right. Reversing it changes the sign of \\(\\Delta_r H^0\\); multiplying the coefficients by a number multiplies \\(\\Delta_r H^0\\) by the same number.\n" +
        "- **Standard enthalpy of formation**, \\(\\Delta_f H^0\\): the enthalpy change when one mole of a pure compound in its standard state is formed from its elements in their standard states. For every element in its standard state \\(\\Delta_f H^0 = 0\\).\n" +
        "- **Standard enthalpy of combustion**, \\(\\Delta_c H^0\\): the standard enthalpy change when one mole of a substance in its standard state is completely oxidised. Example: \\(\\text{C}_2\\text{H}_2\\text{(g)} + \\tfrac{5}{2}\\text{O}_2\\text{(g)} \\to 2\\text{CO}_2\\text{(g)} + \\text{H}_2\\text{O(l)}\\), \\(\\Delta_c H^0 = -1300\\ \\text{kJ}\\).\n" +
        "- **Exothermic:** \\(\\Delta_r H < 0\\) (products lower in enthalpy). **Endothermic:** \\(\\Delta_r H > 0\\).",
      formula: {
        label: "Reaction enthalpy from enthalpies of formation",
        latex: "\\Delta_r H^0 = \\sum \\Delta_f H^0(\\text{products}) - \\sum \\Delta_f H^0(\\text{reactants})",
      },
      authoredExample: {
        prompt:
          "Calculate the standard enthalpy of the reaction CaCO₃(s) → CaO(s) + CO₂(g), given the standard enthalpies of formation: CaCO₃(s) −1207 kJ mol⁻¹, CaO(s) −635 kJ mol⁻¹, CO₂(g) −393.5 kJ mol⁻¹. Is the reaction exothermic or endothermic?",
        steps: [
          "Given: \\(\\Delta_f H^0(\\text{CaCO}_3) = -1207\\), \\(\\Delta_f H^0(\\text{CaO}) = -635\\), \\(\\Delta_f H^0(\\text{CO}_2) = -393.5\\ \\text{kJ mol}^{-1}\\).",
          "Formula: \\(\\Delta_r H^0 = \\sum \\Delta_f H^0(\\text{products}) - \\sum \\Delta_f H^0(\\text{reactants})\\).",
          "Substitution: \\(\\Delta_r H^0 = [(-635) + (-393.5)] - [(-1207)]\\).",
          "\\(= -1028.5 + 1207 = +178.5\\ \\text{kJ}\\).",
          "Positive, so the decomposition is endothermic.",
        ],
        answer: "+178.5 kJ, endothermic",
      },
      selfCheckExample: {
        prompt:
          "Find the standard enthalpy of combustion of propane, C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l), if the standard enthalpies of formation are C₃H₈(g) −103.8, CO₂(g) −393.5 and H₂O(l) −285.8 kJ mol⁻¹.",
        steps: [
          "\\(\\Delta_f H^0(\\text{O}_2) = 0\\).",
          "\\(\\Delta_c H^0 = [3(-393.5) + 4(-285.8)] - [(-103.8)] = -2323.7 + 103.8 = -2219.9\\ \\text{kJ mol}^{-1}\\).",
        ],
        answer: "−2219.9 kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "What is the standard enthalpy of formation of O₂(g)?", answer: "Zero, as for every element in its standard state" },
        { prompt: "Write the thermochemical equation for the standard enthalpy of formation of liquid water, −286 kJ mol⁻¹.", answer: "\\(\\text{H}_2\\text{(g)} + \\tfrac{1}{2}\\text{O}_2\\text{(g)} \\to \\text{H}_2\\text{O(l)}\\), \\(\\Delta_f H^0 = -286\\ \\text{kJ mol}^{-1}\\)" },
        { prompt: "What is the standard state of carbon?", answer: "Graphite, at 1 bar and 298 K" },
      ],
      pyqExampleId: "e321610a-231d-41bc-8e49-b8ba8b746ba3",
      traps: [
        {
          title: "Forgetting the coefficients",
          body: "Multiply each \\(\\Delta_f H^0\\) by the number of moles in the balanced equation before adding. Four moles of water count four times.",
        },
        {
          title: "Reactants minus products",
          body: "With enthalpies of formation it is products minus reactants. (With bond enthalpies it is the other way round; do not mix the two.)",
        },
        {
          title: "Combustion defined without 'one mole' or 'completely'",
          body: "The definition needs both: one mole of the substance, and complete oxidation. Give a balanced equation with its value as the example.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-scaling",
      name: "Scaling a reaction enthalpy to a given amount",
      intuition:
        "A thermochemical equation is a recipe with its heat label: the ΔH belongs to the amounts written. Burn half the amount and you get half the heat. Measure the heat for a small sample and you can scale it up to the amounts in the equation.",
      definition:
        "- \\(\\Delta_r H^0\\) refers to the moles written in the balanced equation.\n" +
        "- Heat for a given amount: \\(q = \\dfrac{n(\\text{given})}{n(\\text{in equation})} \\times \\Delta_r H^0\\), with \\(n = m/M\\).\n" +
        "- From a measured heat to the standard enthalpy: \\(\\Delta_r H^0 = q \\times \\dfrac{n(\\text{in equation})}{n(\\text{reacted})}\\).\n" +
        "- A sample smaller than the equation's amount gives a smaller heat, so check that the scaling goes the right way.",
      formula: {
        label: "Heat for a given amount",
        latex: "q = \\frac{n_{\\text{given}}}{n_{\\text{equation}}} \\times \\Delta_r H^0",
      },
      authoredExample: {
        prompt:
          "2H₂(g) + O₂(g) → 2H₂O(l), ΔrH° = −572 kJ. Calculate the heat evolved when 8.0 g of hydrogen burns completely.",
        steps: [
          "Given: \\(m(\\text{H}_2) = 8.0\\ \\text{g}\\), \\(M = 2\\ \\text{g mol}^{-1}\\), so \\(n = 4\\ \\text{mol}\\). The equation is written for 2 mol of H₂.",
          "Formula: \\(q = \\dfrac{n_{\\text{given}}}{n_{\\text{equation}}} \\times \\Delta_r H^0\\).",
          "Substitution: \\(q = \\dfrac{4}{2} \\times (-572\\ \\text{kJ}) = -1144\\ \\text{kJ}\\).",
          "The negative sign means heat is evolved.",
        ],
        answer: "1144 kJ of heat is evolved",
      },
      selfCheckExample: {
        prompt: "C(graphite) + O₂(g) → CO₂(g), ΔrH° = −393.5 kJ. How much heat is released when 6.0 g of carbon burns?",
        steps: ["\\(n = 6.0/12 = 0.5\\ \\text{mol}\\).", "\\(q = 0.5 \\times 393.5 = 196.75\\ \\text{kJ}\\)."],
        answer: "196.8 kJ released",
      },
      practiceSet: [
        { prompt: "All the coefficients of a thermochemical equation are doubled. What happens to ΔrH°?", answer: "It is doubled" },
        { prompt: "3H₂(g) + N₂(g) → 2NH₃(g) has ΔrH° = −92.2 kJ. What is ΔrH° for the reverse reaction?", answer: "+92.2 kJ (endothermic)" },
      ],
      pyqExampleId: "a2d02130-8441-4707-b0cc-ce3ac61dbc08",
      traps: [
        {
          title: "Scaling the wrong way",
          body: "Ask first: is the given amount more or less than the equation's amount? The heat must change in the same direction.",
        },
        {
          title: "Dropping the sign",
          body: "'Heat evolved' is a positive number of kilojoules, but ΔH is negative. Write both: 'heat evolved = x kJ, ΔH = −x kJ'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-bond-enthalpy",
      name: "Reaction enthalpy from bond enthalpies",
      intuition:
        "Every reaction first breaks bonds, which costs energy, and then makes new ones, which pays energy back. If the new bonds are stronger than the old ones, the reaction gives out heat. So the reaction enthalpy is the cost of breaking minus the pay back of making.",
      definition:
        "- **Bond enthalpy:** the enthalpy change needed to break a particular covalent bond in one mole of gaseous molecules to give gaseous atoms or radicals. H₂(g) → 2H(g), 436.4 kJ, so \\(\\Delta H^0(\\text{H-H}) = 436.4\\ \\text{kJ mol}^{-1}\\).\n" +
        "- For a diatomic molecule the bond enthalpy equals the enthalpy of atomization.\n" +
        "- In a polyatomic molecule the same bonds break with different energies, so an **average bond enthalpy** is used: O-H in water is \\(927/2 = 463.5\\ \\text{kJ mol}^{-1}\\); C-H in methane is \\(1665/4 = 416\\ \\text{kJ mol}^{-1}\\).\n" +
        "- The method assumes all bonds of one type are identical. It is accurate for diatomic molecules and approximate for polyatomic ones.\n" +
        "- Bonds common to both sides cancel, so you need only the bonds that change.",
      formula: {
        label: "Reaction enthalpy from bond enthalpies",
        latex: "\\Delta_r H^0 = \\sum \\Delta H^0(\\text{bonds in reactants}) - \\sum \\Delta H^0(\\text{bonds in products})",
      },
      authoredExample: {
        prompt:
          "Calculate ΔrH° for H₂(g) + I₂(g) → 2HI(g), given the bond enthalpies H-H = 436, I-I = 151 and H-I = 299 kJ mol⁻¹.",
        steps: [
          "Bonds broken: one H-H and one I-I. Bonds formed: two H-I.",
          "Formula: \\(\\Delta_r H^0 = [\\Delta H^0(\\text{H-H}) + \\Delta H^0(\\text{I-I})] - [2\\,\\Delta H^0(\\text{H-I})]\\).",
          "Substitution: \\(\\Delta_r H^0 = [436 + 151] - [2 \\times 299] = 587 - 598\\).",
          "\\(\\Delta_r H^0 = -11\\ \\text{kJ}\\), slightly exothermic.",
        ],
        answer: "ΔrH° = −11 kJ",
      },
      selfCheckExample: {
        prompt: "H₂O(g) → 2H(g) + O(g) needs 927 kJ. Find the average O-H bond enthalpy.",
        steps: ["Two O-H bonds are broken.", "Average = \\(927/2 = 463.5\\ \\text{kJ mol}^{-1}\\)."],
        answer: "463.5 kJ mol⁻¹",
      },
      practiceSet: [
        { prompt: "For a diatomic molecule, the bond enthalpy is equal to which other enthalpy?", answer: "Its enthalpy of atomization" },
        { prompt: "Is breaking a bond exothermic or endothermic?", answer: "Endothermic: energy must be supplied" },
        { prompt: "Why are reaction enthalpies from bond enthalpies only approximate for polyatomic molecules?", answer: "Average bond enthalpies are used, but the same bonds in a molecule break with different energies" },
      ],
      pyqExampleId: "c676fdd0-31e3-4f45-a38f-bb7b5ef24cb3",
      traps: [
        {
          title: "Products minus reactants with bond enthalpies",
          body: "Here it is bonds broken (reactants) minus bonds formed (products). Using the formation-enthalpy order flips the sign of the answer.",
        },
        {
          title: "Counting every bond instead of the ones that change",
          body: "Write the structures, count each bond type on both sides, and cancel the ones that survive. Miscounting the C-H bonds is the usual slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccth-hess",
      name: "Hess's law of constant heat summation",
      intuition:
        "Climbing from the ground floor to the third floor raises you by the same height whether you take the stairs or the lift. Enthalpy is a state function, so a reaction's enthalpy change is the same whether it happens in one step or several. That lets you add and subtract thermochemical equations like algebra to reach a reaction you cannot measure.",
      definition:
        "- **Statement:** overall, the enthalpy change for a reaction is equal to the sum of the enthalpy changes of the individual steps in the reaction.\n" +
        "- **Reason:** enthalpy is a state function; \\(\\Delta H\\) depends only on the initial and final states, not on the path.\n" +
        "- **Book example:** \\(2\\text{H}_2 + \\text{N}_2 \\to \\text{N}_2\\text{H}_4\\), \\(+95.4\\ \\text{kJ}\\); \\(\\text{N}_2\\text{H}_4 + \\text{H}_2 \\to 2\\text{NH}_3\\), \\(-187.6\\ \\text{kJ}\\); adding, \\(3\\text{H}_2 + \\text{N}_2 \\to 2\\text{NH}_3\\), \\(-92.2\\ \\text{kJ}\\).\n" +
        "- **Method:** arrange the given equations so each wanted substance is on the correct side (reverse an equation and change the sign of its \\(\\Delta H\\)), multiply to get the right amounts, add, and cancel what appears on both sides.\n" +
        "- **Application:** to find enthalpy changes of reactions that cannot be measured directly, such as enthalpies of formation from combustion data.",
      formula: {
        label: "Hess's law",
        latex: "\\Delta H_{\\text{overall}} = \\Delta H_1 + \\Delta H_2 + \\Delta H_3 + \\dots",
      },
      authoredExample: {
        prompt:
          "Calculate the standard enthalpy of formation of ethyne, 2C(graphite) + H₂(g) → C₂H₂(g), from: (i) C(graphite) + O₂(g) → CO₂(g), ΔH° = −393.5 kJ; (ii) H₂(g) + ½O₂(g) → H₂O(l), ΔH° = −286 kJ; (iii) C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(l), ΔH° = −1300 kJ.",
        steps: [
          "Target needs 2C on the left, H₂ on the left and C₂H₂ on the right.",
          "Take 2 × (i): \\(2\\text{C} + 2\\text{O}_2 \\to 2\\text{CO}_2\\), \\(\\Delta H = -787\\ \\text{kJ}\\). Take (ii) as written: \\(-286\\ \\text{kJ}\\).",
          "Reverse (iii): \\(2\\text{CO}_2 + \\text{H}_2\\text{O} \\to \\text{C}_2\\text{H}_2 + \\tfrac{5}{2}\\text{O}_2\\), \\(\\Delta H = +1300\\ \\text{kJ}\\).",
          "Add: CO₂, H₂O and the 5/2 O₂ cancel, leaving \\(2\\text{C} + \\text{H}_2 \\to \\text{C}_2\\text{H}_2\\).",
          "\\(\\Delta_f H^0 = -787 - 286 + 1300 = +227\\ \\text{kJ mol}^{-1}\\).",
        ],
        answer: "ΔfH°(C₂H₂) = +227 kJ mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "S(s) + O₂(g) → SO₂(g), ΔH° = −297 kJ; SO₂(g) + ½O₂(g) → SO₃(g), ΔH° = −99 kJ. Find ΔH° for S(s) + 3/2 O₂(g) → SO₃(g).",
        steps: ["Add the two equations: SO₂ cancels.", "\\(\\Delta H^0 = -297 + (-99) = -396\\ \\text{kJ}\\)."],
        answer: "−396 kJ",
      },
      practiceSet: [
        { prompt: "What happens to ΔH when a thermochemical equation is reversed?", answer: "Its sign changes; its size stays the same" },
        { prompt: "On which property of enthalpy does Hess's law rest?", answer: "Enthalpy is a state function" },
        { prompt: "Give one use of Hess's law.", answer: "To find the enthalpy change of a reaction that cannot be measured directly, such as an enthalpy of formation" },
      ],
      pyqExampleId: "e99904f6-b3d0-4da4-b5a3-0ab5bf4b76cb",
      traps: [
        {
          title: "Reversing an equation but keeping its sign",
          body: "Every reversed equation needs its \\(\\Delta H\\) sign changed. Mark it as you write the step so it is not lost at the adding stage.",
        },
        {
          title: "Multiplying the equation but not ΔH",
          body: "If you take twice an equation, take twice its \\(\\Delta H\\) too.",
        },
        {
          title: "Statement with no explanation",
          body: "For 'state and explain', add the reason (enthalpy is a state function) and a worked example with numbers. The statement alone is one mark.",
        },
      ],
    },
  ],
};
