import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_STO_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Balancing Equations",
  title: "Conservation of Mass, Balancing and Ionic Equations",
  oneLineDefinition:
    "Atoms are neither made nor destroyed in a reaction, so a correct equation has the same atoms, and the same total charge, on both sides.",
  whyItMatters:
    "Balancing appears in 2013, 2015 and 2020: a missing coefficient, the ratio of products when an organic compound burns, and picking the one correct equation. Ionic equations for a precipitate were asked in 2016 and 2022.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-sto-balancing",
      name: "Conservation of mass and balancing an equation",
      intuition:
        "A reaction only rearranges atoms into new partners. Every atom on the left must turn up on the right, so the total mass cannot change. Balancing is the bookkeeping that makes this true: you change how many of each substance take part, never what the substances are.",
      definition:
        "- **Law of conservation of mass**: in a closed system the total mass of the products equals the total mass of the reactants.\n" +
        "- A **balanced equation** has the same number of each kind of atom on both sides.\n" +
        "- Change only the **coefficients** (the numbers in front). Changing a subscript changes the substance.\n" +
        "- Start with an element that appears in only one substance on each side; leave elements that appear as the free element (\\(\\mathrm{O_2}\\), \\(\\mathrm{H_2}\\), a metal) until last.\n" +
        "- Use the smallest whole numbers. For a missing coefficient written as a letter, count one element at a time and solve for it.",
      formula: {
        label: "Conservation of mass",
        latex: "\\sum m_{\\text{reactants}} = \\sum m_{\\text{products}}",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass of each substance taking part, in g" },
        ],
      },
      authoredExample: {
        prompt:
          "Balance the equation for aluminium burning in oxygen: \\(\\mathrm{Al} + \\mathrm{O_2} \\rightarrow \\mathrm{Al_2O_3}\\). Then check that mass is conserved. (Al = 27, O = 16)",
        steps: [
          "Oxygen: 2 on the left, 3 on the right. The lowest common multiple is 6, so write \\(3\\mathrm{O_2}\\) and \\(2\\mathrm{Al_2O_3}\\).",
          "Aluminium: now 4 on the right, so write \\(4\\mathrm{Al}\\): \\(4\\mathrm{Al} + 3\\mathrm{O_2} \\rightarrow 2\\mathrm{Al_2O_3}\\).",
          "Mass check: left \\(4 \\times 27 + 3 \\times 32 = 204\\); right \\(2 \\times 102 = 204\\).",
        ],
        answer: "\\(4\\mathrm{Al} + 3\\mathrm{O_2} \\rightarrow 2\\mathrm{Al_2O_3}\\)",
      },
      selfCheckExample: {
        prompt:
          "Ammonia burns over a catalyst: \\(a\\,\\mathrm{NH_3} + b\\,\\mathrm{O_2} \\rightarrow 4\\mathrm{NO} + c\\,\\mathrm{H_2O}\\). What is the value of \\(b\\) in the balanced equation?",
        options: ["3", "4", "5", "6", "7"],
        steps: [
          "Nitrogen: 4 on the right, so \\(a = 4\\).",
          "Hydrogen: \\(4 \\times 3 = 12\\) on the left, so \\(c = 6\\).",
          "Oxygen on the right: \\(4 + 6 = 10\\) atoms, so \\(b = 5\\). D is the coefficient of water, not of oxygen.",
        ],
        answer: "(C) 5",
      },
      practiceSet: [
        { prompt: "Balance: \\(\\mathrm{N_2} + \\mathrm{H_2} \\rightarrow \\mathrm{NH_3}\\)", answer: "\\(\\mathrm{N_2} + 3\\mathrm{H_2} \\rightarrow 2\\mathrm{NH_3}\\)" },
        { prompt: "Balance: \\(\\mathrm{Na} + \\mathrm{H_2O} \\rightarrow \\mathrm{NaOH} + \\mathrm{H_2}\\)", answer: "\\(2\\mathrm{Na} + 2\\mathrm{H_2O} \\rightarrow 2\\mathrm{NaOH} + \\mathrm{H_2}\\)" },
        { prompt: "Balance: \\(\\mathrm{KClO_3} \\rightarrow \\mathrm{KCl} + \\mathrm{O_2}\\)", answer: "\\(2\\mathrm{KClO_3} \\rightarrow 2\\mathrm{KCl} + 3\\mathrm{O_2}\\)" },
        { prompt: "10 g of A reacts completely with 6 g of B to give C as the only product. What mass of C forms?", answer: "16 g", method: "Conservation of mass" },
      ],
      traps: [
        {
          title: "Never balance by changing a subscript",
          body: "Turning \\(\\mathrm{H_2O}\\) into \\(\\mathrm{H_2O_2}\\) to fix the oxygen count makes hydrogen peroxide, a different substance. Options that balance the atoms with an impossible formula (MgOH, \\(\\mathrm{Mg_2O}\\)) are wrong even when the atoms add up.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-combustion",
      name: "Balancing the combustion of organic compounds",
      intuition:
        "When a compound of carbon and hydrogen burns completely, every carbon atom ends up in a \\(\\mathrm{CO_2}\\) molecule and every pair of hydrogen atoms in a water molecule. So the products follow straight from the formula, and oxygen is balanced last. If the fuel already contains oxygen, less oxygen gas is needed.",
      definition:
        "For complete combustion of \\(\\mathrm{C_xH_yO_z}\\) in excess oxygen:\n" +
        "- The only products are **carbon dioxide** and **water**.\n" +
        "- Moles of \\(\\mathrm{CO_2}\\) = \\(x\\); moles of \\(\\mathrm{H_2O}\\) = \\(y/2\\) (per mole of fuel).\n" +
        "- Moles of \\(\\mathrm{O_2}\\) needed = \\(x + y/4 - z/2\\).\n" +
        "- If the result is a fraction, double every coefficient.\n" +
        "- In too little oxygen, combustion is **incomplete**: carbon monoxide or soot (carbon) forms as well.",
      formula: {
        label: "Complete combustion",
        latex: "\\mathrm{C_xH_yO_z} + \\left(x + \\tfrac{y}{4} - \\tfrac{z}{2}\\right)\\mathrm{O_2} \\rightarrow x\\,\\mathrm{CO_2} + \\tfrac{y}{2}\\,\\mathrm{H_2O}",
        symbols: [
          { symbol: "\\(x, y, z\\)", meaning: "numbers of C, H and O atoms in one molecule of the fuel" },
        ],
      },
      authoredExample: {
        prompt: "Write the balanced equation for the complete combustion of butane, \\(\\mathrm{C_4H_{10}}\\).",
        steps: [
          "Products per molecule: 4 \\(\\mathrm{CO_2}\\) and \\(10/2 = 5\\) \\(\\mathrm{H_2O}\\).",
          "Oxygen needed: \\(4 + 10/4 = 6.5\\) molecules of \\(\\mathrm{O_2}\\).",
          "Double to remove the half: \\(2\\mathrm{C_4H_{10}} + 13\\mathrm{O_2} \\rightarrow 8\\mathrm{CO_2} + 10\\mathrm{H_2O}\\).",
        ],
        answer: "\\(2\\mathrm{C_4H_{10}} + 13\\mathrm{O_2} \\rightarrow 8\\mathrm{CO_2} + 10\\mathrm{H_2O}\\)",
      },
      selfCheckExample: {
        prompt:
          "Ethanol, \\(\\mathrm{C_2H_5OH}\\), burns completely in oxygen. How many moles of oxygen gas react with one mole of ethanol?",
        options: ["3.5", "2", "4", "3", "2.5"],
        steps: [
          "Ethanol is \\(\\mathrm{C_2H_6O}\\): \\(x = 2\\), \\(y = 6\\), \\(z = 1\\).",
          "\\(2 + 6/4 - 1/2 = 3\\): \\(\\mathrm{C_2H_5OH} + 3\\mathrm{O_2} \\rightarrow 2\\mathrm{CO_2} + 3\\mathrm{H_2O}\\).",
          "A forgets the oxygen atom already in the ethanol. B is the number of \\(\\mathrm{CO_2}\\) molecules.",
        ],
        answer: "(D) 3",
      },
      practiceSet: [
        { prompt: "How many moles of \\(\\mathrm{O_2}\\) burn one mole of methane completely?", answer: "2", method: "\\(1 + 4/4\\)" },
        { prompt: "What is the ratio of \\(\\mathrm{CO_2}\\) to \\(\\mathrm{H_2O}\\) molecules when benzene, \\(\\mathrm{C_6H_6}\\), burns completely?", answer: "2 : 1", method: "6 : 3" },
        { prompt: "Name a poisonous product of the incomplete combustion of a hydrocarbon.", answer: "Carbon monoxide", method: "Too little oxygen" },
      ],
      traps: [
        {
          title: "Count the oxygen already inside the fuel",
          body: "Alcohols, sugars and other oxygen-containing fuels bring some oxygen atoms with them, so they need less \\(\\mathrm{O_2}\\) than the hydrocarbon with the same carbon and hydrogen. Forgetting this gives a coefficient that is too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sto-ionic",
      name: "Ionic equations and spectator ions",
      intuition:
        "In solution, soluble ionic compounds are split into separate ions. When two such solutions are mixed, most ions simply float around unchanged. The ionic equation keeps only the particles that actually change, which shows what the reaction really is.",
      definition:
        "- Write soluble ionic compounds, strong acids and strong bases as separate **ions**.\n" +
        "- Keep solids (precipitates), liquids, gases, water and weak acids as **formulas**.\n" +
        "- Ions that appear unchanged on both sides are **spectator ions**; cross them out to get the **net (simplest) ionic equation**.\n" +
        "- A correct ionic equation balances **atoms and charge**. The ion charges set the formula of the precipitate: \\(\\mathrm{Pb^{2+}}\\) needs two \\(\\mathrm{I^-}\\), giving \\(\\mathrm{PbI_2}\\).\n" +
        "- State symbols: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water.",
      authoredExample: {
        prompt:
          "Silver nitrate solution is mixed with sodium chloride solution and a white precipitate of silver chloride forms. Write the net ionic equation and name the spectator ions.",
        steps: [
          "Full equation: \\(\\mathrm{AgNO_3(aq)} + \\mathrm{NaCl(aq)} \\rightarrow \\mathrm{AgCl(s)} + \\mathrm{NaNO_3(aq)}\\).",
          "As ions: \\(\\mathrm{Ag^+} + \\mathrm{NO_3^-} + \\mathrm{Na^+} + \\mathrm{Cl^-} \\rightarrow \\mathrm{AgCl(s)} + \\mathrm{Na^+} + \\mathrm{NO_3^-}\\).",
          "Cross out \\(\\mathrm{Na^+}\\) and \\(\\mathrm{NO_3^-}\\), which do not change.",
        ],
        answer: "\\(\\mathrm{Ag^+(aq)} + \\mathrm{Cl^-(aq)} \\rightarrow \\mathrm{AgCl(s)}\\); spectators \\(\\mathrm{Na^+}\\) and \\(\\mathrm{NO_3^-}\\)",
      },
      selfCheckExample: {
        prompt:
          "Solutions of calcium chloride and sodium carbonate are mixed, and calcium carbonate precipitates. Which is the simplest ionic equation for the reaction?",
        options: [
          "\\(\\mathrm{CaCl_2(aq)} + \\mathrm{Na_2CO_3(aq)} \\rightarrow \\mathrm{CaCO_3(s)} + 2\\mathrm{NaCl(aq)}\\)",
          "\\(\\mathrm{Ca^{2+}(aq)} + \\mathrm{CO_3^{2-}(aq)} \\rightarrow \\mathrm{CaCO_3(s)}\\)",
          "\\(\\mathrm{Ca^{2+}} + 2\\mathrm{Cl^-} + 2\\mathrm{Na^+} + \\mathrm{CO_3^{2-}} \\rightarrow \\mathrm{CaCO_3(s)} + 2\\mathrm{Na^+} + 2\\mathrm{Cl^-}\\)",
          "\\(\\mathrm{Ca^+(aq)} + \\mathrm{CO_3^-(aq)} \\rightarrow \\mathrm{CaCO_3(s)}\\)",
          "\\(2\\mathrm{Na^+(aq)} + 2\\mathrm{Cl^-(aq)} \\rightarrow 2\\mathrm{NaCl(s)}\\)",
        ],
        steps: [
          "Only calcium and carbonate ions change, from dissolved to solid.",
          "A is the full equation and C still contains the spectator ions: both are correct, but not the simplest.",
          "D has the wrong ion charges. E shows a precipitate that does not form, because sodium chloride is soluble.",
        ],
        answer: "(B) \\(\\mathrm{Ca^{2+}(aq)} + \\mathrm{CO_3^{2-}(aq)} \\rightarrow \\mathrm{CaCO_3(s)}\\)",
      },
      practiceSet: [
        { prompt: "Which ions are spectators when hydrochloric acid neutralises sodium hydroxide solution?", answer: "\\(\\mathrm{Na^+}\\) and \\(\\mathrm{Cl^-}\\)" },
        { prompt: "Write the net ionic equation for any strong acid neutralising a strong base.", answer: "\\(\\mathrm{H^+(aq)} + \\mathrm{OH^-(aq)} \\rightarrow \\mathrm{H_2O(l)}\\)" },
        { prompt: "What is the formula of the precipitate formed from \\(\\mathrm{Mg^{2+}}\\) and \\(\\mathrm{OH^-}\\) ions?", answer: "\\(\\mathrm{Mg(OH)_2}\\)", method: "Two \\(\\mathrm{OH^-}\\) balance one \\(\\mathrm{Mg^{2+}}\\)" },
        { prompt: "Write the ionic equation for zinc metal in copper(II) sulfate solution.", answer: "\\(\\mathrm{Zn(s)} + \\mathrm{Cu^{2+}(aq)} \\rightarrow \\mathrm{Zn^{2+}(aq)} + \\mathrm{Cu(s)}\\)", method: "Sulfate is a spectator" },
      ],
      traps: [
        {
          title: "Simplest ionic equation means no spectators",
          body: "An equation that lists every ion on both sides is balanced, but it is not the simplest ionic equation. Remove every ion that appears unchanged on both sides; what is left must still balance in atoms and in charge.",
        },
      ],
    },
  ],
};
