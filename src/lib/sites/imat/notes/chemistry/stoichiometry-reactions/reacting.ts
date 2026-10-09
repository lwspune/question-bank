import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_STO_REACTING_NOTE: SubtopicNote = {
  subtopicName: "Reacting Masses and Yield",
  title: "Reacting Masses, Limiting Reagent and Percentage Yield",
  oneLineDefinition:
    "A balanced equation is a ratio of moles: use it to find how much product a mass of reactant can make, which reactant runs out first, and what share of the maximum you actually got.",
  whyItMatters:
    "This is the most asked page. Percentage yield appears in 2011, 2014, 2015 and the 2023 ministry paper, and the 2024 ministry paper asked twice about which reactant runs out and what is left over.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sto-mole-ratio",
      name: "Reacting masses through the mole ratio",
      intuition:
        "The coefficients in an equation count particles, not grams. Two moles of magnesium react with one mole of oxygen, though the masses are 48 g and 32 g. So every reacting-mass problem runs the same three steps: grams into moles, moles through the ratio, moles back into grams.",
      definition:
        "- Step 1: convert the known mass to **moles** (\\(n = m/M\\)).\n" +
        "- Step 2: use the **coefficients** of the balanced equation to find the moles of the substance you want.\n" +
        "- Step 3: convert those moles to a **mass** (\\(m = nM\\)), or to a number of particles.\n" +
        "- When a reactant is a solution, its moles come from \\(n = cV\\) (see Solutions and Concentration).\n" +
        "- For gases at the same temperature and pressure, volumes react in the same ratio as moles (see States of Matter and Gas Laws).",
      formula: {
        label: "Mole ratio from the equation",
        latex: "\\frac{n_B}{n_A} = \\frac{b}{a}",
        symbols: [
          { symbol: "\\(n_A, n_B\\)", meaning: "moles of substances A and B" },
          { symbol: "\\(a, b\\)", meaning: "their coefficients in the balanced equation" },
        ],
      },
      authoredExample: {
        prompt:
          "Limestone decomposes on heating: \\(\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}\\). What masses of calcium oxide and carbon dioxide form from 25 g of calcium carbonate? (Ca = 40, C = 12, O = 16)",
        steps: [
          "Moles of \\(\\mathrm{CaCO_3}\\): \\(25/100 = 0.25\\ \\text{mol}\\).",
          "The ratio is 1 : 1 : 1, so 0.25 mol of each product forms.",
          "\\(\\mathrm{CaO}\\): \\(0.25 \\times 56 = 14\\ \\text{g}\\). \\(\\mathrm{CO_2}\\): \\(0.25 \\times 44 = 11\\ \\text{g}\\).",
          "Check: \\(14 + 11 = 25\\ \\text{g}\\), so mass is conserved.",
        ],
        answer: "14 g of CaO and 11 g of \\(\\mathrm{CO_2}\\)",
      },
      selfCheckExample: {
        prompt:
          "Magnesium burns in oxygen: \\(2\\mathrm{Mg} + \\mathrm{O_2} \\rightarrow 2\\mathrm{MgO}\\). What mass of oxygen is needed to burn 6.0 g of magnesium completely? (Mg = 24, O = 16)",
        options: ["2.0 g", "8.0 g", "16 g", "10 g", "4.0 g"],
        steps: [
          "Moles of Mg: \\(6.0/24 = 0.25\\ \\text{mol}\\).",
          "Ratio Mg : \\(\\mathrm{O_2}\\) = 2 : 1, so 0.125 mol of \\(\\mathrm{O_2}\\), which is \\(0.125 \\times 32 = 4.0\\ \\text{g}\\).",
          "B ignores the 2 : 1 ratio. C applies the ratio upside down. D is the mass of magnesium oxide made. A uses 16 for the molar mass of oxygen gas.",
        ],
        answer: "(E) 4.0 g",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{N_2} + 3\\mathrm{H_2} \\rightarrow 2\\mathrm{NH_3}\\). What mass of hydrogen makes 34 g of ammonia? (N = 14, H = 1)", answer: "6.0 g", method: "2 mol \\(\\mathrm{NH_3}\\) needs 3 mol \\(\\mathrm{H_2}\\)" },
        { prompt: "What mass of \\(\\mathrm{CO_2}\\) forms when 16 g of methane burns completely?", answer: "44 g", method: "1 mol \\(\\mathrm{CH_4}\\) gives 1 mol \\(\\mathrm{CO_2}\\)" },
        { prompt: "\\(\\mathrm{CaCO_3} + 2\\mathrm{HCl} \\rightarrow \\mathrm{CaCl_2} + \\mathrm{H_2O} + \\mathrm{CO_2}\\). How many moles of HCl react with 0.10 mol of \\(\\mathrm{CaCO_3}\\)?", answer: "0.20 mol" },
        { prompt: "At the same temperature and pressure, what volume of oxygen burns 50 cm³ of methane completely?", answer: "100 cm³", method: "\\(\\mathrm{CH_4} + 2\\mathrm{O_2}\\): volumes follow the mole ratio" },
      ],
      traps: [
        {
          title: "Coefficients are a ratio of moles, not of grams",
          body: "In \\(2\\mathrm{Mg} + \\mathrm{O_2} \\rightarrow 2\\mathrm{MgO}\\), 2 g of magnesium does not react with 1 g of oxygen. Convert to moles before using the coefficients, and back to grams afterwards.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-limiting",
      name: "Limiting reagent and the reactant in excess",
      intuition:
        "Making sandwiches with 10 slices of bread and 3 slices of cheese gives 3 sandwiches, not 5: the cheese runs out first. In a reaction, the reactant that runs out first is the limiting reagent. It alone decides how much product forms; some of the other reactant is left over.",
      definition:
        "- The **limiting reagent** is used up completely and sets the amount of product.\n" +
        "- The other reactant is **in excess**: some of it is left at the end.\n" +
        "- To find the limiting reagent, divide the moles of each reactant by its **coefficient**. The smallest result is the limiting reagent.\n" +
        "- Work out the product from the limiting reagent only.\n" +
        "- Excess left = moles at the start minus moles used (found from the limiting reagent through the ratio).\n" +
        "- Total mass is still conserved: mass of products plus mass of excess left equals the mass at the start.",
      formula: {
        label: "Finding the limiting reagent",
        latex: "\\text{limiting} = \\text{smallest of } \\frac{n_A}{a},\\ \\frac{n_B}{b}",
        symbols: [
          { symbol: "\\(n_A, n_B\\)", meaning: "moles of each reactant at the start" },
          { symbol: "\\(a, b\\)", meaning: "their coefficients in the balanced equation" },
        ],
      },
      authoredExample: {
        prompt:
          "4.0 g of hydrogen is exploded with 16 g of oxygen: \\(2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}\\). Which reactant is limiting? What mass of water forms, and what mass of which gas is left over? (H = 1, O = 16)",
        steps: [
          "Moles: \\(\\mathrm{H_2}\\) \\(4.0/2 = 2.0\\); \\(\\mathrm{O_2}\\) \\(16/32 = 0.50\\).",
          "Divide by the coefficients: \\(\\mathrm{H_2}\\) \\(2.0/2 = 1.0\\); \\(\\mathrm{O_2}\\) \\(0.50/1 = 0.50\\). Oxygen is limiting.",
          "Water: \\(2 \\times 0.50 = 1.0\\ \\text{mol} = 18\\ \\text{g}\\).",
          "Hydrogen used: 1.0 mol, so 1.0 mol (2.0 g) is left. Check: \\(18 + 2.0 = 20\\ \\text{g} = 4.0 + 16\\).",
        ],
        answer: "Oxygen is limiting; 18 g of water forms and 2.0 g of hydrogen is left",
      },
      selfCheckExample: {
        prompt:
          "2.4 g of magnesium is heated with 2.4 g of oxygen gas: \\(2\\mathrm{Mg} + \\mathrm{O_2} \\rightarrow 2\\mathrm{MgO}\\). Assuming the reaction goes to completion, which statement is correct? (Mg = 24, O = 16)",
        options: [
          "4.8 g of magnesium oxide is produced.",
          "4.0 g of magnesium oxide is produced and 0.8 g of oxygen remains.",
          "Oxygen is the limiting reactant.",
          "6.0 g of magnesium oxide is produced.",
          "4.0 g of magnesium oxide is produced and 1.6 g of oxygen remains.",
        ],
        steps: [
          "Moles: Mg \\(2.4/24 = 0.10\\); \\(\\mathrm{O_2}\\) \\(2.4/32 = 0.075\\). Divided by coefficients: 0.050 and 0.075, so magnesium is limiting.",
          "MgO: 0.10 mol, which is \\(0.10 \\times 40 = 4.0\\ \\text{g}\\). Oxygen used: 0.050 mol = 1.6 g, so \\(2.4 - 1.6 = 0.8\\ \\text{g}\\) remains.",
          "A adds the two masses as if both were used up. C and D treat oxygen as limiting. E gives the oxygen used instead of the oxygen left.",
        ],
        answer: "(B) 4.0 g of magnesium oxide is produced and 0.8 g of oxygen remains.",
      },
      practiceSet: [
        { prompt: "1.0 mol of \\(\\mathrm{N_2}\\) and 6.0 mol of \\(\\mathrm{H_2}\\) react: \\(\\mathrm{N_2} + 3\\mathrm{H_2} \\rightarrow 2\\mathrm{NH_3}\\). How much ammonia forms, and how much hydrogen is left?", answer: "2.0 mol of \\(\\mathrm{NH_3}\\); 3.0 mol of \\(\\mathrm{H_2}\\) left", method: "Nitrogen is limiting" },
        { prompt: "10 g of \\(\\mathrm{CaCO_3}\\) is added to 0.10 mol of HCl: \\(\\mathrm{CaCO_3} + 2\\mathrm{HCl} \\rightarrow \\mathrm{CaCl_2} + \\mathrm{H_2O} + \\mathrm{CO_2}\\). Which is limiting?", answer: "The hydrochloric acid", method: "0.10 mol of \\(\\mathrm{CaCO_3}\\) would need 0.20 mol HCl" },
        { prompt: "12 g of carbon burns in 16 g of oxygen to give \\(\\mathrm{CO_2}\\) only. What mass of \\(\\mathrm{CO_2}\\) forms?", answer: "22 g", method: "Oxygen (0.50 mol) is limiting; 6 g of carbon is left" },
      ],
      traps: [
        {
          title: "The limiting reagent is not simply the smaller mass or the fewer moles",
          body: "Compare moles divided by coefficients. 0.10 mol of magnesium is limiting against 0.075 mol of oxygen, because the equation needs twice as much magnesium as oxygen. Then calculate the product from the limiting reagent, never from the one in excess.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-yield",
      name: "Percentage yield",
      intuition:
        "The equation tells you the most product you could possibly get, the theoretical yield. Real experiments get less: some reactant does not react, side reactions make other products, and some product is lost while filtering, drying or transferring it. Percentage yield measures how close you came.",
      definition:
        "- **Theoretical yield**: the mass (or moles) of product calculated from the **limiting reagent** with the balanced equation.\n" +
        "- **Actual yield**: the mass of product really obtained.\n" +
        "- **Percentage yield** = actual yield divided by theoretical yield, times 100. Compare product with the same product, in the same units.\n" +
        "- Yield is below 100% because of incomplete or reversible reactions, side reactions and losses during separation.\n" +
        "- A measured yield above 100% means the product is impure (for example, still wet).",
      formula: {
        label: "Percentage yield",
        latex: "\\%\\,\\text{yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100",
        symbols: [
          { symbol: "actual yield", meaning: "mass of product obtained, in g" },
          { symbol: "theoretical yield", meaning: "maximum mass of product from the limiting reagent, in g" },
        ],
      },
      authoredExample: {
        prompt:
          "50 g of calcium carbonate is heated and 21 g of calcium oxide is collected: \\(\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}\\). What is the percentage yield? (Ca = 40, C = 12, O = 16)",
        steps: [
          "Moles of \\(\\mathrm{CaCO_3}\\): \\(50/100 = 0.50\\ \\text{mol}\\), so at most 0.50 mol of CaO.",
          "Theoretical yield: \\(0.50 \\times 56 = 28\\ \\text{g}\\).",
          "Percentage yield: \\(21/28 \\times 100 = 75\\%\\).",
        ],
        answer: "75%",
      },
      selfCheckExample: {
        prompt:
          "4.6 g of sodium reacts with excess chlorine, \\(2\\mathrm{Na} + \\mathrm{Cl_2} \\rightarrow 2\\mathrm{NaCl}\\), and 9.36 g of sodium chloride is collected. What is the percentage yield? (Na = 23, Cl = 35.5)",
        options: ["40%", "49%", "80%", "125%", "20%"],
        steps: [
          "Moles of Na: \\(4.6/23 = 0.20\\ \\text{mol}\\), so at most 0.20 mol of NaCl.",
          "Theoretical yield: \\(0.20 \\times 58.5 = 11.7\\ \\text{g}\\). Yield: \\(9.36/11.7 \\times 100 = 80\\%\\).",
          "A doubles the theoretical yield by misreading the 2 : 2 ratio. B divides the reactant mass by the product mass. D turns the fraction upside down. E is the percentage lost.",
        ],
        answer: "(C) 80%",
      },
      practiceSet: [
        { prompt: "The theoretical yield is 40 g and 30 g is obtained. What is the percentage yield?", answer: "75%" },
        { prompt: "A reaction has a 60% yield and a theoretical yield of 15 g. What mass is obtained?", answer: "9.0 g", method: "\\(0.60 \\times 15\\)" },
        { prompt: "3.2 g of sulfur burns to sulfur dioxide (\\(\\mathrm{S} + \\mathrm{O_2} \\rightarrow \\mathrm{SO_2}\\)) and 5.12 g of \\(\\mathrm{SO_2}\\) is collected. What is the yield? (S = 32, O = 16)", answer: "80%", method: "Theoretical yield 6.4 g" },
        { prompt: "Give two reasons why the actual yield is usually less than the theoretical yield.", answer: "Incomplete reaction, side reactions, or product lost while separating it" },
      ],
      traps: [
        {
          title: "Compare product with product, not product with reactant",
          body: "Percentage yield is actual product mass over the theoretical mass of the same product. Dividing the product mass by the mass of reactant used is a common wrong option, because the two substances have different molar masses.",
        },
      ],
    },
  ],
};
