import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EQ_CONSTANTS_NOTE: SubtopicNote = {
  subtopicName: "Equilibrium Constants",
  title: "Equilibrium Constants",
  oneLineDefinition:
    "The law of mass action and Kc, equilibrium amounts worked out from a starting amount, how K changes when an equation is reversed, scaled or added, and the link between Kp and Kc.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. One finds an equilibrium concentration from Kc (ozone from oxygen, 2022), one finds the degree of dissociation of NO from a given set of concentrations (NEET 2024), one relates the K of an equation to the K of its reverse halved (Re-NEET 2024), and three use Kp = Kc(RT) raised to Δn: picking the reaction where Kp and Kc differ (NEET 2024 and NEET 2026) and finding Kp from two rate constants (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncheq-kc",
      name: "Law of mass action and Kc",
      intuition:
        "At equilibrium the forward and backward reactions have not stopped. They run at the same rate, so the amounts stop changing: the equilibrium is dynamic. At a fixed temperature, one particular ratio of these amounts always comes out the same, however much of each substance you started with. That ratio is the equilibrium constant.",
      definition:
        "- For \\(a\\text{A} + b\\text{B} \\rightleftharpoons c\\text{C} + d\\text{D}\\): \\(K_c = \\dfrac{[\\text{C}]^{c}[\\text{D}]^{d}}{[\\text{A}]^{a}[\\text{B}]^{b}}\\), using molar concentrations at equilibrium.\n" +
        "- Products go on top, reactants below, and **each concentration is raised to its coefficient** in the balanced equation.\n" +
        "- Pure solids and pure liquids are left out of the expression: their concentration is constant. For \\(\\text{CaCO}_3(s) \\rightleftharpoons \\text{CaO}(s) + \\text{CO}_2(g)\\), \\(K_c = [\\text{CO}_2]\\).\n" +
        "- For a given equation, K changes only with temperature.\n" +
        "- Size of K: above about \\(10^{3}\\) products dominate; below about \\(10^{-3}\\) reactants dominate; in between both are present in good amounts.\n" +
        "- At equilibrium the two rates are equal, so for a one-step reaction \\(K_c = \\dfrac{k_f}{k_b}\\), the forward rate constant over the backward one.",
      formula: {
        label: "Equilibrium constant",
        latex: "K_c = \\frac{[\\text{C}]^{c}[\\text{D}]^{d}}{[\\text{A}]^{a}[\\text{B}]^{b}}, \\qquad K_c = \\frac{k_f}{k_b}",
        symbols: [
          { symbol: "\\([\\text{X}]\\)", meaning: "molar concentration of X at equilibrium" },
          { symbol: "\\(k_f, k_b\\)", meaning: "forward and backward rate constants" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(\\text{N}_2\\text{O}_4(g) \\rightleftharpoons 2\\text{NO}_2(g)\\) at a certain temperature, the equilibrium concentrations are \\([\\text{N}_2\\text{O}_4] = 0.04\\) M and \\([\\text{NO}_2] = 0.02\\) M. Find \\(K_c\\).",
        steps: [
          "\\(K_c = \\dfrac{[\\text{NO}_2]^{2}}{[\\text{N}_2\\text{O}_4]}\\): the coefficient 2 becomes a square.",
          "\\(K_c = \\dfrac{(0.02)^{2}}{0.04} = \\dfrac{4 \\times 10^{-4}}{4 \\times 10^{-2}} = 0.01\\).",
        ],
        answer: "\\(K_c = 0.01\\)",
      },
      selfCheckExample: {
        prompt:
          "Write \\(K_c\\) for \\(\\text{CaCO}_3(s) \\rightleftharpoons \\text{CaO}(s) + \\text{CO}_2(g)\\).",
        steps: [
          "\\(\\text{CaCO}_3\\) and CaO are pure solids, so they are left out.",
          "Only the gas remains in the expression.",
        ],
        answer: "\\(K_c = [\\text{CO}_2]\\)",
      },
      practiceSet: [
        { prompt: "Write \\(K_c\\) for \\(\\text{PCl}_5(g) \\rightleftharpoons \\text{PCl}_3(g) + \\text{Cl}_2(g)\\).", answer: "\\(K_c = \\dfrac{[\\text{PCl}_3][\\text{Cl}_2]}{[\\text{PCl}_5]}\\)" },
        { prompt: "For \\(\\text{H}_2(g) + \\text{I}_2(g) \\rightleftharpoons 2\\text{HI}(g)\\), \\([\\text{H}_2] = [\\text{I}_2] = 0.1\\) M and \\([\\text{HI}] = 0.8\\) M at equilibrium. Find \\(K_c\\).", answer: "64" },
        { prompt: "A reaction has \\(K_c = 10^{5}\\) at 300 K. Do products or reactants dominate at equilibrium?", answer: "Products" },
        { prompt: "Is chemical equilibrium static or dynamic?", answer: "Dynamic: the forward and backward reactions go on at equal rates" },
      ],
      pyqExampleId: "40dec421-6ac9-47f5-9173-75efce38c0c1",
      traps: [
        {
          title: "A squared product gives a square root",
          body: "When a product appears as \\([\\text{X}]^{2}\\) in \\(K_c\\), solving the expression gives \\([\\text{X}]^{2}\\). Take the square root at the end, or the answer comes out squared.",
        },
        {
          title: "Solids and pure liquids stay out",
          body: "A pure solid or pure liquid never appears in \\(K_c\\) or \\(K_p\\). Only gases and dissolved species are written.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncheq-ice",
      name: "Equilibrium amounts from a starting amount",
      intuition:
        "When you know what you started with and K, you can find what is present at equilibrium. Write three lines: the start, the change and the equilibrium amounts. The changes always follow the coefficients of the equation, so one unknown is enough. Put the equilibrium line into K and solve.",
      definition:
        "- Write the initial amounts, the change, and the amounts at equilibrium. Changes are in the ratio of the coefficients.\n" +
        "- **Degree of dissociation** \\(\\alpha\\) is the fraction of a reactant that has dissociated at equilibrium. Starting with c of A in \\(\\text{A} \\rightleftharpoons \\text{B} + \\text{C}\\): \\([\\text{A}] = c(1 - \\alpha)\\), \\([\\text{B}] = [\\text{C}] = c\\alpha\\).\n" +
        "- For \\(2\\text{A} \\rightleftharpoons \\text{B} + \\text{C}\\), losing \\(c\\alpha\\) of A makes only \\(\\dfrac{c\\alpha}{2}\\) of B and of C.\n" +
        "- When the moles are the same on both sides, the volume cancels, so moles can be put straight into \\(K_c\\).\n" +
        "- K at one temperature can be found from one set of equilibrium concentrations and then used for a new starting mixture at the same temperature.",
      formula: {
        label: "Degree of dissociation",
        latex: "\\alpha = \\frac{\\text{amount dissociated}}{\\text{amount taken}}, \\qquad \\text{A} \\rightleftharpoons \\text{B} + \\text{C}:\\ K_c = \\frac{c\\alpha^{2}}{1 - \\alpha}",
      },
      authoredExample: {
        prompt:
          "1.0 mol of \\(\\text{H}_2\\) and 1.0 mol of \\(\\text{I}_2\\) are heated in a 1 L flask. For \\(\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}\\), \\(K_c = 64\\). Find \\([\\text{HI}]\\) at equilibrium.",
        steps: [
          "Let x react: \\([\\text{H}_2] = [\\text{I}_2] = 1 - x\\), \\([\\text{HI}] = 2x\\).",
          "\\(\\dfrac{(2x)^{2}}{(1 - x)^{2}} = 64\\), so \\(\\dfrac{2x}{1 - x} = 8\\).",
          "\\(2x = 8 - 8x\\), so \\(x = 0.8\\) and \\([\\text{HI}] = 2x = 1.6\\) M.",
          "Check: \\(\\dfrac{1.6^{2}}{0.2 \\times 0.2} = \\dfrac{2.56}{0.04} = 64\\).",
        ],
        answer: "1.6 M",
      },
      selfCheckExample: {
        prompt:
          "\\(\\text{PCl}_5\\) at 0.5 mol/L is heated in a closed vessel and 20% of it dissociates: \\(\\text{PCl}_5 \\rightleftharpoons \\text{PCl}_3 + \\text{Cl}_2\\). Find \\(K_c\\).",
        steps: [
          "Dissociated: \\(0.5 \\times 0.2 = 0.1\\) mol/L. So \\([\\text{PCl}_5] = 0.4\\), \\([\\text{PCl}_3] = [\\text{Cl}_2] = 0.1\\).",
          "\\(K_c = \\dfrac{0.1 \\times 0.1}{0.4} = 0.025\\).",
        ],
        answer: "\\(K_c = 0.025\\)",
      },
      practiceSet: [
        { prompt: "4 mol of A and 4 mol of B are mixed in a 1 L vessel for \\(\\text{A} + \\text{B} \\rightleftharpoons \\text{C} + \\text{D}\\). At equilibrium 2 mol of C is present. Find \\(K_c\\).", answer: "1" },
        { prompt: "0.2 mol of \\(\\text{N}_2\\text{O}_4\\) in a 1 L flask dissociates 25% into \\(\\text{NO}_2\\). Find \\([\\text{NO}_2]\\) at equilibrium.", answer: "0.1 M" },
        { prompt: "1 mol of HI is taken for \\(2\\text{HI} \\rightleftharpoons \\text{H}_2 + \\text{I}_2\\) and its degree of dissociation is 0.2. How many moles of \\(\\text{H}_2\\) form?", answer: "0.1 mol" },
        { prompt: "Why can moles be used in place of concentrations in \\(K_c\\) for \\(\\text{A} + \\text{B} \\rightleftharpoons \\text{C} + \\text{D}\\)?", answer: "The moles are equal on both sides, so the volume cancels" },
      ],
      pyqExampleId: "aa64b6f8-5345-4c22-b4a0-cf7d6f44c085",
      traps: [
        {
          title: "Changes follow the coefficients",
          body: "In \\(2\\text{NO} \\rightleftharpoons \\text{N}_2 + \\text{O}_2\\), losing 2x of NO makes only x of \\(\\text{N}_2\\) and x of \\(\\text{O}_2\\). Using the same change for every species gives a wrong K.",
        },
        {
          title: "The volume cancels only when the moles balance",
          body: "Moles can replace concentrations only when the total moles are equal on both sides. Otherwise divide each amount by the volume first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncheq-combining",
      name: "K for reversed, scaled and added equations",
      intuition:
        "K belongs to the equation exactly as written. Turn the equation round and the expression turns upside down. Double every coefficient and every power doubles, so K is squared. Add two equations and their expressions multiply. So you never need a new experiment, only a little algebra.",
      definition:
        "- **Reverse** the equation: \\(K' = \\dfrac{1}{K}\\).\n" +
        "- **Multiply** every coefficient by n: \\(K' = K^{n}\\). Halving the equation gives \\(K' = \\sqrt{K}\\).\n" +
        "- **Add** two equations: \\(K = K_1 \\times K_2\\).\n" +
        "- These rules hold for \\(K_c\\) and for \\(K_p\\).",
      formula: {
        label: "Changing the equation",
        latex: "\\text{reversed: } K' = \\frac{1}{K}, \\qquad \\text{times } n: K' = K^{n}, \\qquad \\text{added: } K = K_1 K_2",
      },
      authoredExample: {
        prompt:
          "For \\(\\text{A} \\rightleftharpoons \\text{B}\\), \\(K_1 = 2\\); for \\(\\text{B} \\rightleftharpoons \\text{C}\\), \\(K_2 = 5\\). Find K for \\(\\text{A} \\rightleftharpoons \\text{C}\\) and for \\(\\text{C} \\rightleftharpoons \\text{A}\\).",
        steps: [
          "Adding the two equations gives \\(\\text{A} \\rightleftharpoons \\text{C}\\), so \\(K = K_1 K_2 = 2 \\times 5 = 10\\).",
          "\\(\\text{C} \\rightleftharpoons \\text{A}\\) is the reverse, so \\(K' = \\dfrac{1}{10} = 0.1\\).",
        ],
        answer: "10 and 0.1",
      },
      selfCheckExample: {
        prompt:
          "The equilibrium constant for \\(2\\text{SO}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{SO}_3\\) is K. Write the constant for \\(4\\text{SO}_2 + 2\\text{O}_2 \\rightleftharpoons 4\\text{SO}_3\\).",
        steps: [
          "Every coefficient has been multiplied by 2.",
          "So the constant is raised to the power 2.",
        ],
        answer: "\\(K^{2}\\)",
      },
      practiceSet: [
        { prompt: "\\(K_c\\) for \\(\\text{A} \\rightleftharpoons \\text{B}\\) is 50. Find \\(K_c\\) for \\(\\text{B} \\rightleftharpoons \\text{A}\\).", answer: "0.02" },
        { prompt: "\\(K_c\\) for \\(2\\text{A} \\rightleftharpoons \\text{B}\\) is 16. Find \\(K_c\\) for \\(4\\text{A} \\rightleftharpoons 2\\text{B}\\).", answer: "256" },
        { prompt: "K for \\(\\text{X} \\rightleftharpoons \\text{Z}\\) is 12 and K for \\(\\text{X} \\rightleftharpoons \\text{Y}\\) is 3. Find K for \\(\\text{Y} \\rightleftharpoons \\text{Z}\\).", answer: "4" },
        { prompt: "Does the value of K change when a balanced equation is written the other way round?", answer: "Yes: it becomes 1/K" },
      ],
      pyqExampleId: "2602942b-4239-4991-adf0-5aef775a878a",
      traps: [
        {
          title: "Scaling raises K to a power",
          body: "Halving an equation gives \\(\\sqrt{K}\\), not \\(\\dfrac{K}{2}\\). Doubling it gives \\(K^{2}\\), not 2K.",
        },
        {
          title: "Added equations multiply their K values",
          body: "When two equations are added, their equilibrium constants are multiplied, not added.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncheq-kp",
      name: "Kp and its link to Kc",
      intuition:
        "For gases it is often easier to measure pressures than concentrations, so the same ratio is written with partial pressures. The two constants differ by a factor RT for every mole of gas gained. If the gas moles are the same on both sides, the factor disappears and the two constants are equal.",
      definition:
        "- For gases: \\(K_p = \\dfrac{p_{\\text{C}}^{c}\\,p_{\\text{D}}^{d}}{p_{\\text{A}}^{a}\\,p_{\\text{B}}^{b}}\\), using partial pressures at equilibrium.\n" +
        "- \\(K_p = K_c(RT)^{\\Delta n_g}\\), where \\(\\Delta n_g\\) = moles of gaseous products minus moles of gaseous reactants. Count gases only.\n" +
        "- \\(\\Delta n_g = 0\\) gives \\(K_p = K_c\\), as in \\(\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}\\).\n" +
        "- With pressure in bar, \\(R = 0.0831\\ \\text{bar L mol}^{-1}\\,\\text{K}^{-1}\\).",
      formula: {
        label: "Kp and Kc",
        latex: "K_p = K_c (RT)^{\\Delta n_g}, \\qquad \\Delta n_g = n_{\\text{gas, products}} - n_{\\text{gas, reactants}}",
        symbols: [
          { symbol: "\\(\\Delta n_g\\)", meaning: "change in moles of gas, products minus reactants" },
          { symbol: "\\(R\\)", meaning: "gas constant, 0.0831 bar L per mol per K" },
          { symbol: "\\(T\\)", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(2\\text{SO}_2(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{SO}_3(g)\\) at 1000 K, \\(K_c = 250\\). Find \\(K_p\\), with \\(R = 0.0831\\ \\text{bar L mol}^{-1}\\,\\text{K}^{-1}\\).",
        steps: [
          "\\(\\Delta n_g = 2 - 3 = -1\\).",
          "\\(K_p = K_c(RT)^{-1} = \\dfrac{250}{0.0831 \\times 1000} = \\dfrac{250}{83.1}\\).",
          "\\(K_p = 3.0\\) (to two figures).",
        ],
        answer: "\\(K_p \\approx 3.0\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\(\\Delta n_g\\) for \\(\\text{CaCO}_3(s) \\rightleftharpoons \\text{CaO}(s) + \\text{CO}_2(g)\\). Is \\(K_p\\) equal to \\(K_c\\)?",
        steps: [
          "Only gases count: 1 mol of \\(\\text{CO}_2\\) on the right, none on the left.",
          "\\(\\Delta n_g = 1\\), so \\(K_p = K_c RT\\).",
        ],
        answer: "\\(\\Delta n_g = 1\\); no, \\(K_p = K_c RT\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\Delta n_g\\) for \\(2\\text{NO}_2(g) \\rightleftharpoons \\text{N}_2\\text{O}_4(g)\\).", answer: "\\(-1\\)" },
        { prompt: "When is \\(K_p\\) equal to \\(K_c\\)?", answer: "When \\(\\Delta n_g = 0\\)" },
        { prompt: "For \\(\\text{N}_2\\text{O}_4(g) \\rightleftharpoons 2\\text{NO}_2(g)\\) at 500 K, \\(K_c = 0.02\\). Find \\(K_p\\) with \\(R = 0.0831\\ \\text{bar L mol}^{-1}\\,\\text{K}^{-1}\\).", answer: "0.831" },
        { prompt: "In \\(K_p = K_c(RT)^{\\Delta n_g}\\), which species are counted to find \\(\\Delta n_g\\)?", answer: "Only the gases" },
      ],
      pyqExampleId: "b07d5f3a-71de-43bf-85ec-0173a671ea4b",
      traps: [
        {
          title: "Products minus reactants",
          body: "\\(\\Delta n_g\\) is gas moles of products minus gas moles of reactants. For \\(\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3\\) it is \\(2 - 4 = -2\\), not +2.",
        },
        {
          title: "Count only the gases",
          body: "Solids and liquids do not enter \\(\\Delta n_g\\). A reaction can have equal total moles on both sides and still have \\(K_p \\neq K_c\\) if a gas is made from a solid.",
        },
      ],
    },
  ],
};
