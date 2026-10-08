import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_EQK_EQUILIBRIUM_NOTE: SubtopicNote = {
  subtopicName: "Equilibrium Constant",
  title: "Dynamic Equilibrium and the Equilibrium Constant Kc",
  oneLineDefinition:
    "At dynamic equilibrium the forward and reverse reactions run at the same rate, and the ratio of product to reactant concentrations, Kc, takes a fixed value at a given temperature.",
  whyItMatters:
    "The 2019 paper asked for a Kc value from equilibrium amounts, and the 2023 paper asked what a very small Kc says about where the equilibrium lies. The 2025 paper used an equilibrium with solids in it, which do not appear in Kc.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-eqk-dynamic",
      name: "Dynamic equilibrium in a closed system",
      intuition:
        "Picture people walking up a down escalator at exactly the speed it moves: they stay in the same place although both motions continue. In a reversible reaction at equilibrium, reactants keep turning into products and products keep turning back, at exactly the same rate. Nothing seems to change, but nothing has stopped.",
      definition:
        "A reversible reaction (\\(\\rightleftharpoons\\)) in a **closed system** reaches **dynamic equilibrium** when:\n" +
        "- the **forward and reverse rates are equal**, and neither is zero;\n" +
        "- the **concentrations stay constant**, but they are generally **not equal** to each other;\n" +
        "- the measurable properties (colour, pressure, density) no longer change.\n" +
        "The same equilibrium mixture is reached whether you start from the reactants or from the products, under the same conditions. An open system, where a gas can escape, cannot reach equilibrium.",
      table: {
        columns: ["Feature", "At dynamic equilibrium"],
        rows: [
          { cells: ["Forward and reverse rates", "Equal, and both greater than zero"] },
          { cells: ["Concentrations", "Constant, but usually not equal"] },
          { cells: ["System", "Closed: no matter enters or leaves"] },
          { cells: ["Starting point", "The same equilibrium is reached from either side"] },
          { cells: ["Evidence that it is dynamic", "A labelled isotope added to one side soon appears on the other side"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement is true for a reversible reaction at dynamic equilibrium?",
        options: [
          "The forward and reverse reactions have stopped",
          "The concentrations of reactants and products are equal",
          "The rate of the forward reaction equals the rate of the reverse reaction",
          "The forward reaction is faster than the reverse reaction",
          "Equilibrium can only be reached by starting from the reactants",
        ],
        steps: [
          "Dynamic means both reactions continue, at equal rates, so the amounts no longer change.",
          "A forgets that the reactions continue. B confuses constant with equal. D would mean the amounts were still changing. E is wrong: the same equilibrium is reached from either direction.",
        ],
        answer: "(C) The rate of the forward reaction equals the rate of the reverse reaction",
      },
      practiceSet: [
        { prompt: "Can calcium carbonate decomposing in an open crucible reach equilibrium?", answer: "No: the carbon dioxide escapes, so the system is not closed" },
        { prompt: "At equilibrium, are the concentrations constant, equal, or both?", answer: "Constant, but not necessarily equal" },
        { prompt: "Radioactive iodine is added to a saturated iodine solution in contact with solid iodine. Later the solid is radioactive too. What does this show?", answer: "The equilibrium is dynamic: dissolving and crystallising continue at equal rates" },
      ],
      traps: [
        {
          title: "Equilibrium does not mean equal amounts",
          body: "At equilibrium the rates are equal, not the concentrations. The mixture may be almost all products, almost all reactants, or anything between, depending on K.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-kc-expression",
      name: "Writing the Kc expression",
      intuition:
        "At equilibrium, whatever amounts you started with, one particular ratio of concentrations always comes out the same at a given temperature. That ratio puts the products on top and the reactants underneath, each raised to the power of its coefficient in the equation. Its value is the equilibrium constant.",
      definition:
        "For \\(a\\mathrm{A} + b\\mathrm{B} \\rightleftharpoons c\\mathrm{C} + d\\mathrm{D}\\):\n" +
        "- **Products over reactants**, each concentration (in mol/dm³, at equilibrium) raised to the power of its coefficient.\n" +
        "- **Pure solids and pure liquids are left out**: their concentration does not change. So is water when it is the solvent.\n" +
        "- The **units** of Kc depend on the powers: they cancel when the total powers on top and bottom are equal.\n" +
        "- Kc changes **only with temperature**.\n" +
        "- For the reverse reaction the constant is \\(1/K_c\\).",
      formula: {
        label: "Equilibrium constant",
        latex: "K_c = \\frac{[\\mathrm{C}]^c\\,[\\mathrm{D}]^d}{[\\mathrm{A}]^a\\,[\\mathrm{B}]^b}",
        symbols: [
          { symbol: "\\([\\ ]\\)", meaning: "equilibrium concentration, in mol/dm³" },
          { symbol: "\\(a, b, c, d\\)", meaning: "coefficients in the balanced equation" },
        ],
      },
      authoredExample: {
        prompt:
          "Write Kc, with units, for \\(\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}\\), and for \\(\\mathrm{CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g)}\\).",
        steps: [
          "Ammonia: \\(K_c = \\dfrac{[\\mathrm{NH_3}]^2}{[\\mathrm{N_2}][\\mathrm{H_2}]^3}\\).",
          "Units: \\((\\text{mol dm}^{-3})^2 / (\\text{mol dm}^{-3})^4 = (\\text{mol dm}^{-3})^{-2} = \\text{dm}^6\\,\\text{mol}^{-2}\\).",
          "Calcium carbonate: both solids are left out, so \\(K_c = [\\mathrm{CO_2}]\\), in mol/dm³.",
        ],
        answer: "\\(K_c = [\\mathrm{NH_3}]^2/([\\mathrm{N_2}][\\mathrm{H_2}]^3)\\) in dm⁶ mol⁻²; \\(K_c = [\\mathrm{CO_2}]\\) in mol/dm³",
      },
      selfCheckExample: {
        prompt:
          "What is the Kc expression for \\(\\mathrm{C(s) + H_2O(g) \\rightleftharpoons CO(g) + H_2(g)}\\)?",
        options: [
          "\\(\\dfrac{[\\mathrm{CO}][\\mathrm{H_2}]}{[\\mathrm{C}][\\mathrm{H_2O}]}\\)",
          "\\(\\dfrac{[\\mathrm{CO}][\\mathrm{H_2}]}{[\\mathrm{H_2O}]}\\)",
          "\\(\\dfrac{[\\mathrm{H_2O}]}{[\\mathrm{CO}][\\mathrm{H_2}]}\\)",
          "\\([\\mathrm{CO}][\\mathrm{H_2}]\\)",
          "\\(\\dfrac{[\\mathrm{C}][\\mathrm{H_2O}]}{[\\mathrm{CO}][\\mathrm{H_2}]}\\)",
        ],
        steps: [
          "Products on top: \\([\\mathrm{CO}][\\mathrm{H_2}]\\).",
          "Reactants below, but carbon is a solid and is left out. Here water is a gas, not a solvent, so it stays in.",
          "A includes the solid. C and E are upside down. D drops the gaseous water as if it were a liquid.",
        ],
        answer: "(B) \\(\\dfrac{[\\mathrm{CO}][\\mathrm{H_2}]}{[\\mathrm{H_2O}]}\\)",
      },
      practiceSet: [
        { prompt: "Write Kc for \\(\\mathrm{2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)}\\).", answer: "\\(K_c = [\\mathrm{SO_3}]^2/([\\mathrm{SO_2}]^2[\\mathrm{O_2}])\\)" },
        { prompt: "Kc for A ⇌ B is 4.0. What is Kc for B ⇌ A at the same temperature?", answer: "0.25", method: "\\(1/4.0\\)" },
        { prompt: "What are the units of Kc for \\(\\mathrm{H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)}\\)?", answer: "None: the units cancel", method: "Power 2 on top, 1 + 1 below" },
      ],
      traps: [
        {
          title: "Solids and pure liquids are not in Kc",
          body: "A solid's concentration is fixed by its density, so it is left out of Kc. Adding or removing some of a solid therefore does not shift an equilibrium. To shift it, change the concentration of a gas or a dissolved species, or the temperature.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-kc-value",
      name: "Calculating Kc and what its size means",
      intuition:
        "Kc is a single number that tells you where the equilibrium lies. A huge Kc means the top of the fraction, the products, dominates: the reaction goes almost to completion. A tiny Kc means hardly any products form. To calculate it, you need equilibrium concentrations, so moles must be divided by the volume first.",
      definition:
        "- Convert every equilibrium amount to a **concentration**: \\(c = n/V\\). The volume cancels only when the total powers on top and bottom are equal.\n" +
        "- If you are given starting amounts, use a table of **initial, change, equilibrium** amounts, with the changes in the ratio of the coefficients.\n" +
        "- \\(K_c \\gg 1\\): the equilibrium lies to the **right** (mostly products). \\(K_c \\ll 1\\): it lies to the **left** (mostly reactants).\n" +
        "- K tells you **how far**, never **how fast**.\n" +
        "- The **reaction quotient** \\(Q\\) uses the same expression with the current concentrations. If \\(Q < K\\) the reaction moves forward; if \\(Q > K\\) it moves backward; if \\(Q = K\\) it is at equilibrium.",
      formula: {
        label: "Concentration from amount",
        latex: "c = \\frac{n}{V}",
        symbols: [
          { symbol: "\\(c\\)", meaning: "concentration, in mol/dm³" },
          { symbol: "\\(n\\)", meaning: "amount at equilibrium, in mol" },
          { symbol: "\\(V\\)", meaning: "volume of the vessel, in dm³" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(\\mathrm{PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)}\\) is at equilibrium in a 2.0 dm³ vessel with 0.40 mol \\(\\mathrm{PCl_5}\\), 0.20 mol \\(\\mathrm{PCl_3}\\) and 0.20 mol \\(\\mathrm{Cl_2}\\). Find Kc.",
        steps: [
          "Concentrations: \\(\\mathrm{PCl_5}\\) \\(0.40/2.0 = 0.20\\), \\(\\mathrm{PCl_3}\\) \\(0.10\\), \\(\\mathrm{Cl_2}\\) \\(0.10\\ \\text{mol/dm}^3\\).",
          "\\(K_c = (0.10 \\times 0.10)/0.20 = 0.050\\ \\text{mol/dm}^3\\).",
          "Using moles directly would give \\(0.040/0.40 = 0.10\\), twice too big: here the powers do not balance (2 on top, 1 below), so the volume does not cancel.",
        ],
        answer: "\\(K_c = 0.050\\ \\text{mol/dm}^3\\)",
      },
      selfCheckExample: {
        prompt:
          "1.0 mol of gas A is placed in a sealed 1.0 dm³ vessel and reaches equilibrium \\(\\mathrm{A(g) \\rightleftharpoons 2B(g)}\\). At equilibrium there is 0.40 mol of B. What is Kc?",
        options: ["0.20", "0.16", "0.40", "0.50", "5.0"],
        steps: [
          "Making 0.40 mol of B uses half as much A: 0.20 mol. So 0.80 mol of A is left.",
          "In 1.0 dm³: \\(K_c = [\\mathrm{B}]^2/[\\mathrm{A}] = 0.40^2/0.80 = 0.16/0.80 = 0.20\\).",
          "B uses the starting amount of A. D forgets the square. E is the expression upside down. C does both of the first two mistakes.",
        ],
        answer: "(A) 0.20",
      },
      practiceSet: [
        { prompt: "At equilibrium in 2.0 dm³ there are 0.20 mol of \\(\\mathrm{H_2}\\), 0.20 mol of \\(\\mathrm{I_2}\\) and 1.6 mol of HI. Find Kc for \\(\\mathrm{H_2 + I_2 \\rightleftharpoons 2HI}\\).", answer: "64", method: "\\(0.80^2/(0.10 \\times 0.10)\\)" },
        { prompt: "A reaction has \\(K_c = 1 \\times 10^{10}\\). Where does the equilibrium lie?", answer: "Far to the right: almost all products" },
        { prompt: "For a reaction, Q = 0.5 and K = 2. Which way will it move to reach equilibrium?", answer: "Forward (to the right)", method: "\\(Q < K\\)" },
        { prompt: "Does a very large K mean the reaction is fast?", answer: "No: K says how far, not how fast" },
      ],
      traps: [
        {
          title: "A small Kc means few products, not fewer moles on one side",
          body: "A Kc much smaller than 1 tells you the equilibrium lies to the left, with mostly reactants. It says nothing about which side of the equation has more moles, and nothing about how fast equilibrium is reached.",
        },
      ],
    },
  ],
};
