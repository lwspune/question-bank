import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_EQK_ENERGETICS_NOTE: SubtopicNote = {
  subtopicName: "Enthalpy Changes",
  title: "Exothermic and Endothermic Reactions, Bond Enthalpies and Hess's Law",
  oneLineDefinition:
    "The enthalpy change ΔH is the heat a reaction gives out or takes in at constant pressure: negative when products are lower in energy than reactants, positive when they are higher.",
  whyItMatters:
    "The 2026 paper asked what is true of the energy of the products in an exothermic reaction, and the 2025 paper asked what the activation energy represents on an energy profile. Bond enthalpy and Hess's law calculations are in the syllabus but have not been set yet.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-eqk-exo-endo",
      name: "Exothermic and endothermic reactions and the sign of ΔH",
      intuition:
        "Chemicals store energy in their bonds. If the products hold less of it than the reactants, the difference escapes as heat and the surroundings warm up: the reaction is exothermic. If the products hold more, the reaction must pull heat in from the surroundings, which cool down: it is endothermic.",
      definition:
        "- The **system** is the reacting chemicals; the **surroundings** are everything else (the water, the beaker, the air).\n" +
        "- The **enthalpy change** \\(\\Delta H\\) is the heat exchanged at constant pressure, in kJ/mol: \\(\\Delta H = H_\\text{products} - H_\\text{reactants}\\).\n" +
        "- **Exothermic**: heat is released, \\(\\Delta H < 0\\), the products have **lower** energy than the reactants.\n" +
        "- **Endothermic**: heat is absorbed, \\(\\Delta H > 0\\), the products have **higher** energy than the reactants.\n" +
        "- **Breaking bonds always takes in energy; making bonds always releases it.** The sign of \\(\\Delta H\\) depends on which is larger.\n" +
        "- \\(\\Delta H\\) says nothing about how fast a reaction goes.",
      table: {
        columns: ["Feature", "Exothermic", "Endothermic"],
        rows: [
          { cells: ["Heat flow", "Released to the surroundings", "Absorbed from the surroundings"] },
          { cells: ["Sign of ΔH", "Negative", "Positive"] },
          { cells: ["Energy of products", "Lower than the reactants", "Higher than the reactants"] },
          { cells: ["Temperature of surroundings", "Rises", "Falls"] },
          { cells: ["Examples", "Combustion, respiration, neutralisation, freezing, condensation", "Photosynthesis, thermal decomposition of \\(\\mathrm{CaCO_3}\\), melting, dissolving ammonium nitrate"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "When ammonium nitrate dissolves in water, the beaker becomes cold. Which statement about this process is correct?",
        options: [
          "It is exothermic and ΔH is negative",
          "It is endothermic and the products have more energy than the reactants",
          "It is endothermic and ΔH is negative",
          "It is exothermic and the products have more energy than the reactants",
          "No energy change takes place; the cold comes from evaporation",
        ],
        steps: [
          "The surroundings (water and beaker) get colder, so heat flows into the system: the process is endothermic.",
          "Endothermic means \\(\\Delta H > 0\\), so the products are higher in energy than the reactants.",
          "A and D are exothermic, which would warm the beaker. C pairs endothermic with the wrong sign.",
        ],
        answer: "(B) It is endothermic and the products have more energy than the reactants",
      },
      practiceSet: [
        { prompt: "What is the sign of ΔH for the combustion of methane?", answer: "Negative (exothermic)" },
        { prompt: "Is breaking a chemical bond exothermic or endothermic?", answer: "Endothermic: it always needs energy" },
        { prompt: "Is the freezing of water exothermic or endothermic?", answer: "Exothermic" },
        { prompt: "A reaction has ΔH = +50 kJ/mol. Are the products higher or lower in energy than the reactants?", answer: "Higher, by 50 kJ/mol" },
      ],
      traps: [
        {
          title: "Exothermic does not mean fast",
          body: "Rusting is exothermic but takes weeks, and wood does not catch fire at room temperature even though burning is exothermic. Whether a reaction gives out heat (ΔH) and how fast it goes (the activation energy and the conditions) are separate questions.",
        },
        {
          title: "Breaking bonds never releases energy",
          body: "Energy is released when bonds form, and must be supplied to break them. A reaction is exothermic when the bonds formed release more energy than the bonds broken took in.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-energy-profile",
      name: "Energy profiles and the activation energy",
      intuition:
        "Even an exothermic reaction does not simply run downhill. Bonds must first start to break, which needs energy, so the reactants have to climb over an energy barrier before they can fall to the products. The height of that barrier, measured from the reactants, is the activation energy.",
      definition:
        "An **energy profile** plots the energy of the system against the progress of the reaction.\n" +
        "- The peak is the **transition state** (activated complex).\n" +
        "- The **activation energy** \\(E_a\\) is the energy **barrier the reactants must overcome** to become products: from the reactants up to the peak.\n" +
        "- \\(\\Delta H\\) is the vertical gap from the **reactants to the products**, not to the peak.\n" +
        "- For the reverse reaction, the barrier is measured from the products up to the same peak.\n" +
        "- A **catalyst** lowers the peak (so lowers \\(E_a\\) both ways) but leaves the reactant and product levels, and so \\(\\Delta H\\), unchanged.",
      formula: {
        label: "Energy profile relations",
        latex: "\\Delta H = H_{\\text{products}} - H_{\\text{reactants}} \\qquad E_{a,\\text{reverse}} = E_{a,\\text{forward}} - \\Delta H",
        symbols: [
          { symbol: "\\(E_a\\)", meaning: "activation energy, measured from the starting level up to the peak" },
          { symbol: "\\(\\Delta H\\)", meaning: "enthalpy change of the forward reaction" },
        ],
      },
      authoredExample: {
        prompt:
          "A reaction has a forward activation energy of 120 kJ/mol and \\(\\Delta H = -80\\ \\text{kJ/mol}\\). Describe its profile and find the activation energy of the reverse reaction.",
        steps: [
          "Take the reactants at 0. The peak is 120 kJ/mol above them, and the products are 80 kJ/mol below them (exothermic).",
          "The reverse reaction starts at the products, \\(-80\\), and climbs to the peak at \\(+120\\): \\(120 - (-80) = 200\\ \\text{kJ/mol}\\).",
          "For an exothermic reaction the reverse barrier is always the larger one.",
        ],
        answer: "Reverse activation energy 200 kJ/mol",
      },
      selfCheckExample: {
        prompt:
          "On an energy profile, the reactants are at 40 kJ/mol, the peak at 150 kJ/mol and the products at 90 kJ/mol. What are the activation energy and the enthalpy change of the forward reaction?",
        options: [
          "\\(E_a = 110\\ \\text{kJ/mol}\\), \\(\\Delta H = -50\\ \\text{kJ/mol}\\)",
          "\\(E_a = 60\\ \\text{kJ/mol}\\), \\(\\Delta H = +50\\ \\text{kJ/mol}\\)",
          "\\(E_a = 150\\ \\text{kJ/mol}\\), \\(\\Delta H = +90\\ \\text{kJ/mol}\\)",
          "\\(E_a = 110\\ \\text{kJ/mol}\\), \\(\\Delta H = +50\\ \\text{kJ/mol}\\)",
          "\\(E_a = 60\\ \\text{kJ/mol}\\), \\(\\Delta H = -50\\ \\text{kJ/mol}\\)",
        ],
        steps: [
          "\\(E_a\\) runs from the reactants to the peak: \\(150 - 40 = 110\\ \\text{kJ/mol}\\).",
          "\\(\\Delta H\\) runs from the reactants to the products: \\(90 - 40 = +50\\ \\text{kJ/mol}\\). The products are higher, so it is endothermic.",
          "B measures the barrier from the products, which is the reverse activation energy. C reads absolute levels instead of differences. A gets the sign of \\(\\Delta H\\) backwards.",
        ],
        answer: "(D) \\(E_a = 110\\ \\text{kJ/mol}\\), \\(\\Delta H = +50\\ \\text{kJ/mol}\\)",
      },
      practiceSet: [
        { prompt: "A reaction has \\(E_a = 75\\ \\text{kJ/mol}\\) and \\(\\Delta H = -25\\ \\text{kJ/mol}\\). What is the activation energy of the reverse reaction?", answer: "100 kJ/mol", method: "\\(75 - (-25)\\)" },
        { prompt: "An endothermic reaction has \\(E_a = 90\\ \\text{kJ/mol}\\) and \\(\\Delta H = +30\\ \\text{kJ/mol}\\). What is the reverse activation energy?", answer: "60 kJ/mol", method: "\\(90 - 30\\)" },
        { prompt: "Which feature of an energy profile does a catalyst change?", answer: "The height of the peak (the activation energy), not \\(\\Delta H\\)" },
      ],
      traps: [
        {
          title: "Activation energy is not the energy difference between products and reactants",
          body: "The gap between reactants and products is \\(\\Delta H\\). The activation energy is the barrier from the reactants up to the transition state. Options describing \\(E_a\\) as energy released, or as the products minus the reactants, are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-bond-enthalpy",
      name: "Estimating ΔH from bond enthalpies",
      intuition:
        "Imagine the reaction in two steps: first break every bond in the reactants, then make every bond in the products. Breaking costs energy, making pays it back. The enthalpy change is the cost minus the pay-back, so a reaction that forms stronger bonds than it breaks is exothermic.",
      definition:
        "- The **bond enthalpy** is the energy needed to break one mole of a given bond in gaseous molecules, in kJ/mol. It is always positive.\n" +
        "- Tables give **mean** bond enthalpies (averaged over many compounds), so the answer is an estimate.\n" +
        "- Count every bond: \\(\\mathrm{CH_4}\\) has four C-H bonds; two molecules of \\(\\mathrm{H_2O}\\) contain four O-H bonds.",
      formula: {
        label: "ΔH from bond enthalpies",
        latex: "\\Delta H \\approx \\sum E(\\text{bonds broken}) - \\sum E(\\text{bonds formed})",
        symbols: [
          { symbol: "\\(E\\)", meaning: "mean bond enthalpy, in kJ/mol" },
        ],
      },
      authoredExample: {
        prompt:
          "Estimate \\(\\Delta H\\) for \\(\\mathrm{H_2 + Cl_2 \\rightarrow 2HCl}\\). Bond enthalpies in kJ/mol: H-H 436, Cl-Cl 243, H-Cl 432.",
        steps: [
          "Bonds broken: one H-H and one Cl-Cl: \\(436 + 243 = 679\\ \\text{kJ}\\).",
          "Bonds formed: two H-Cl: \\(2 \\times 432 = 864\\ \\text{kJ}\\).",
          "\\(\\Delta H \\approx 679 - 864 = -185\\ \\text{kJ}\\) per mole of reaction as written. More energy is released than taken in: exothermic.",
        ],
        answer: "About \\(-185\\ \\text{kJ/mol}\\)",
      },
      selfCheckExample: {
        prompt:
          "Use the bond enthalpies H-H 436, O=O 498 and O-H 464 kJ/mol to estimate \\(\\Delta H\\) for \\(\\mathrm{2H_2(g) + O_2(g) \\rightarrow 2H_2O(g)}\\), as written.",
        options: [
          "\\(-486\\ \\text{kJ}\\)",
          "\\(+486\\ \\text{kJ}\\)",
          "\\(-922\\ \\text{kJ}\\)",
          "\\(+442\\ \\text{kJ}\\)",
          "\\(-1856\\ \\text{kJ}\\)",
        ],
        steps: [
          "Broken: two H-H and one O=O: \\(2 \\times 436 + 498 = 1370\\ \\text{kJ}\\).",
          "Formed: two water molecules, each with two O-H: \\(4 \\times 464 = 1856\\ \\text{kJ}\\).",
          "\\(\\Delta H \\approx 1370 - 1856 = -486\\ \\text{kJ}\\). B subtracts the wrong way round. C breaks only one H-H. D forms only two O-H. E forgets the bonds broken.",
        ],
        answer: "(A) \\(-486\\ \\text{kJ}\\)",
      },
      practiceSet: [
        { prompt: "Estimate \\(\\Delta H\\) for \\(\\mathrm{N_2 + 3H_2 \\rightarrow 2NH_3}\\). N≡N 945, H-H 436, N-H 391 kJ/mol.", answer: "About \\(-93\\ \\text{kJ}\\)", method: "\\((945 + 3 \\times 436) - 6 \\times 391\\)" },
        { prompt: "When a bond breaks, is energy taken in or given out?", answer: "Taken in" },
        { prompt: "Why does a ΔH from bond enthalpies differ slightly from a measured value?", answer: "The bond enthalpies are averages over many compounds and assume gases." },
      ],
      traps: [
        {
          title: "Bonds broken minus bonds formed, not the other way round",
          body: "\\(\\Delta H \\approx\\) (energy to break bonds) minus (energy released forming bonds). Subtracting in the other order gives the right size with the wrong sign, and that wrong sign is always one of the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-hess",
      name: "Hess's law and enthalpies of formation",
      intuition:
        "Energy cannot be created or destroyed, so the energy change between a starting point and an end point cannot depend on the route taken. If a reaction is hard to measure directly, you can add up the enthalpy changes of other reactions that together lead to the same place.",
      definition:
        "- **Hess's law**: the enthalpy change of a reaction is the same whatever route is taken, as long as the start and end are the same.\n" +
        "- Reversing an equation **changes the sign** of \\(\\Delta H\\). Multiplying an equation by a number **multiplies** \\(\\Delta H\\) by it.\n" +
        "- The **standard enthalpy of formation** \\(\\Delta H_f^\\circ\\) is the enthalpy change when one mole of a compound forms from its elements in their standard states. It is **zero for an element** in its standard state (\\(\\mathrm{O_2(g)}\\), graphite).",
      formula: {
        label: "ΔH from enthalpies of formation",
        latex: "\\Delta H = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})",
        symbols: [
          { symbol: "\\(\\Delta H_f^\\circ\\)", meaning: "standard enthalpy of formation, in kJ/mol, multiplied by the coefficient in the equation" },
        ],
      },
      authoredExample: {
        prompt:
          "Given \\(\\mathrm{C(s) + O_2(g) \\rightarrow CO_2(g)}\\), \\(\\Delta H = -394\\ \\text{kJ/mol}\\), and \\(\\mathrm{CO(g) + \\tfrac{1}{2}O_2(g) \\rightarrow CO_2(g)}\\), \\(\\Delta H = -283\\ \\text{kJ/mol}\\), find \\(\\Delta H\\) for \\(\\mathrm{C(s) + \\tfrac{1}{2}O_2(g) \\rightarrow CO(g)}\\).",
        steps: [
          "Route: carbon to carbon dioxide directly (\\(-394\\)), then back from carbon dioxide to carbon monoxide.",
          "Going back means reversing the second equation, which changes its sign to \\(+283\\).",
          "\\(\\Delta H = -394 + 283 = -111\\ \\text{kJ/mol}\\).",
        ],
        answer: "\\(-111\\ \\text{kJ/mol}\\)",
      },
      selfCheckExample: {
        prompt:
          "Use the enthalpies of formation \\(\\mathrm{CaCO_3(s)}\\) \\(-1207\\), \\(\\mathrm{CaO(s)}\\) \\(-635\\) and \\(\\mathrm{CO_2(g)}\\) \\(-394\\ \\text{kJ/mol}\\) to find \\(\\Delta H\\) for \\(\\mathrm{CaCO_3(s) \\rightarrow CaO(s) + CO_2(g)}\\).",
        options: [
          "\\(-178\\ \\text{kJ/mol}\\)",
          "\\(-1029\\ \\text{kJ/mol}\\)",
          "\\(-2236\\ \\text{kJ/mol}\\)",
          "\\(+2236\\ \\text{kJ/mol}\\)",
          "\\(+178\\ \\text{kJ/mol}\\)",
        ],
        steps: [
          "Products: \\(-635 + (-394) = -1029\\ \\text{kJ/mol}\\). Reactants: \\(-1207\\ \\text{kJ/mol}\\).",
          "\\(\\Delta H = -1029 - (-1207) = +178\\ \\text{kJ/mol}\\): endothermic, as a thermal decomposition should be.",
          "A subtracts the wrong way round. B uses only the products. C and D add all three values instead of subtracting.",
        ],
        answer: "(E) \\(+178\\ \\text{kJ/mol}\\)",
      },
      practiceSet: [
        { prompt: "A → B has \\(\\Delta H = -50\\ \\text{kJ}\\) and B → C has \\(\\Delta H = +20\\ \\text{kJ}\\). What is \\(\\Delta H\\) for A → C?", answer: "\\(-30\\ \\text{kJ}\\)" },
        { prompt: "A reaction has \\(\\Delta H = +92\\ \\text{kJ}\\). What is \\(\\Delta H\\) for the reverse reaction?", answer: "\\(-92\\ \\text{kJ}\\)" },
        { prompt: "What is the standard enthalpy of formation of \\(\\mathrm{O_2(g)}\\)?", answer: "Zero: it is an element in its standard state" },
      ],
      traps: [
        {
          title: "Formation enthalpy is zero only for the standard form of an element",
          body: "\\(\\Delta H_f^\\circ\\) is zero for \\(\\mathrm{O_2(g)}\\) or graphite, but not for ozone or diamond, which are not the standard states. And it is products minus reactants, each multiplied by its coefficient.",
        },
      ],
    },
  ],
};
