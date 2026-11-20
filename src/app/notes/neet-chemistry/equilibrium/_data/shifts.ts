import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EQ_SHIFTS_NOTE: SubtopicNote = {
  subtopicName: "Reaction Quotient and Le Chatelier's Principle",
  title: "Reaction Quotient and Le Chatelier's Principle",
  oneLineDefinition:
    "Using the reaction quotient Q to tell which way a mixture will move, and Le Chatelier's principle for how an equilibrium responds to a change in concentration, pressure or temperature, or a catalyst.",
  whyItMatters:
    "Three NEET questions from 2024 to 2025. One compares Qc with Kc to find the direction a mixture will move (NEET 2024), and two apply Le Chatelier's principle: the conditions that favour ammonia in the Haber process (Re-NEET 2024) and the conditions that give more NO from nitrogen and oxygen in an endothermic reaction (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncheq-quotient",
      name: "Reaction quotient and the direction of change",
      intuition:
        "The reaction quotient is the same ratio as K, but worked out with the amounts present right now, at any moment. Comparing it with K tells you where the mixture stands. If Q is too big, there is too much product, so the reaction runs backward. If Q is too small, it runs forward. If they are equal, nothing more changes.",
      definition:
        "- \\(Q_c\\) has the same form as \\(K_c\\), but uses the concentrations at that moment, not at equilibrium.\n" +
        "- \\(Q_c > K_c\\): the reaction goes **backward**, towards the reactants.\n" +
        "- \\(Q_c < K_c\\): the reaction goes **forward**, towards the products.\n" +
        "- \\(Q_c = K_c\\): the mixture is already at equilibrium.\n" +
        "- As the reaction moves, \\(Q_c\\) changes until it equals \\(K_c\\).",
      formula: {
        label: "Reaction quotient",
        latex: "Q_c = \\frac{[\\text{C}]^{c}[\\text{D}]^{d}}{[\\text{A}]^{a}[\\text{B}]^{b}}\\ \\text{(at any moment)}, \\qquad Q_c < K_c \\Rightarrow \\text{forward}, \\quad Q_c > K_c \\Rightarrow \\text{backward}",
      },
      authoredExample: {
        prompt:
          "For \\(\\text{H}_2(g) + \\text{I}_2(g) \\rightleftharpoons 2\\text{HI}(g)\\), \\(K_c = 50\\) at a certain temperature. A mixture has \\([\\text{H}_2] = [\\text{I}_2] = 0.1\\) M and \\([\\text{HI}] = 0.5\\) M. Which way will it move?",
        steps: [
          "\\(Q_c = \\dfrac{[\\text{HI}]^{2}}{[\\text{H}_2][\\text{I}_2]} = \\dfrac{0.25}{0.01} = 25\\).",
          "\\(Q_c = 25 < K_c = 50\\), so there is too little product.",
        ],
        answer: "Forward, making more HI",
      },
      selfCheckExample: {
        prompt:
          "A reaction mixture has \\(Q_c\\) smaller than \\(K_c\\). Which way does the reaction go, and does \\(Q_c\\) rise or fall as it does?",
        steps: [
          "\\(Q_c < K_c\\) means too little product, so the reaction goes forward.",
          "Making product raises the top of the ratio, so \\(Q_c\\) rises until it equals \\(K_c\\).",
        ],
        answer: "Forward; \\(Q_c\\) rises until it equals \\(K_c\\)",
      },
      practiceSet: [
        { prompt: "For a mixture, \\(Q_c = K_c\\). What does this tell you?", answer: "The mixture is at equilibrium" },
        { prompt: "For \\(\\text{A} \\rightleftharpoons \\text{B}\\), \\(K_c = 10\\). A mixture has \\([\\text{A}] = 0.5\\) M and \\([\\text{B}] = 2\\) M. Which way will it move?", answer: "Forward (\\(Q_c = 4 < 10\\))" },
        { prompt: "For a reaction \\(Q_c = 100\\) and \\(K_c = 1\\). Towards which side does it move?", answer: "Towards the reactants (backward)" },
        { prompt: "What is the difference between \\(Q_c\\) and \\(K_c\\)?", answer: "\\(Q_c\\) uses concentrations at any moment; \\(K_c\\) uses those at equilibrium" },
      ],
      pyqExampleId: "e6d5840f-4dd5-420f-8b51-1c170bc245e2",
      traps: [
        {
          title: "A larger Q runs backward",
          body: "When \\(Q_c > K_c\\) there is more product than equilibrium allows, so the reaction goes backward, not forward.",
        },
        {
          title: "Powers count in Q too",
          body: "\\(Q_c\\) uses the same powers as \\(K_c\\). Equal concentrations do not make \\(Q_c = 1\\) unless the powers on top and bottom add up to the same number.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncheq-le-chatelier",
      name: "Le Chatelier's principle: concentration and pressure",
      visualizationSlug: "imat-le-chatelier",
      intuition:
        "Le Chatelier's principle says that when an equilibrium is disturbed, it shifts in the direction that undoes the disturbance. Add a reactant, and the reaction uses some of it up by going forward. Squeeze a gas mixture, and the reaction moves to the side with fewer gas molecules, which lowers the pressure.",
      definition:
        "- **Adding a reactant** or **removing a product** shifts the equilibrium forward. Adding a product or removing a reactant shifts it backward.\n" +
        "- **Increasing the pressure** (by reducing the volume) shifts a gas equilibrium towards the side with fewer moles of gas. Decreasing the pressure shifts it towards more moles.\n" +
        "- If the moles of gas are equal on both sides, pressure has no effect.\n" +
        "- Adding an inert gas at constant volume does not shift the equilibrium: the partial pressures of the reacting gases do not change.\n" +
        "- Concentration and pressure changes shift the equilibrium but **do not change K**.",
      table: {
        columns: ["Change", "Equilibrium shifts", "Does K change"],
        rows: [
          { cells: ["Add a reactant", "Forward", "No"], noteAmber: "Re-NEET 2024: high pressure, low temperature and more H₂ favour N₂ + 3H₂ ⇌ 2NH₃." },
          { cells: ["Remove a product", "Forward", "No"] },
          { cells: ["Add a product", "Backward", "No"] },
          { cells: ["Raise the pressure", "To the side with fewer gas moles", "No"] },
          { cells: ["Raise the pressure, equal gas moles on both sides", "No shift", "No"] },
          { cells: ["Add an inert gas at constant volume", "No shift", "No"] },
        ],
      },
      pyqExampleId: "88d13090-2f6d-4c75-997c-67fa2e2310a0",
      selfCheckExample: {
        prompt:
          "For \\(2\\text{SO}_2(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{SO}_3(g)\\), which way does the equilibrium shift when the volume of the vessel is halved?",
        steps: [
          "Halving the volume raises the pressure.",
          "The left has 3 mol of gas and the right has 2, so the equilibrium shifts to the right.",
        ],
        answer: "Forward, making more \\(\\text{SO}_3\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\text{H}_2(g) + \\text{I}_2(g) \\rightleftharpoons 2\\text{HI}(g)\\), does raising the pressure shift the equilibrium?", answer: "No: the gas moles are equal on both sides" },
        { prompt: "For \\(\\text{PCl}_5(g) \\rightleftharpoons \\text{PCl}_3(g) + \\text{Cl}_2(g)\\), which way does an increase in pressure shift the equilibrium?", answer: "Backward, towards \\(\\text{PCl}_5\\)" },
        { prompt: "Some \\(\\text{PCl}_3\\) is removed from an equilibrium mixture of \\(\\text{PCl}_5\\), \\(\\text{PCl}_3\\) and \\(\\text{Cl}_2\\). Which way does it shift?", answer: "Forward" },
        { prompt: "Argon is added at constant volume to an equilibrium mixture of gases. What happens to the equilibrium?", answer: "Nothing: it does not shift" },
      ],
      traps: [
        {
          title: "Pressure acts through gas moles only",
          body: "A pressure change shifts an equilibrium only when the moles of gas differ on the two sides. With equal gas moles, as in \\(\\text{H}_2 + \\text{I}_2 \\rightleftharpoons 2\\text{HI}\\), it has no effect.",
        },
        {
          title: "A shift is not a new K",
          body: "Adding a reactant or raising the pressure moves the equilibrium, but K stays the same. Only a change of temperature changes K.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ncheq-temperature",
      name: "Le Chatelier's principle: temperature and catalysts",
      intuition:
        "Treat heat as if it were a reactant or a product. In an exothermic reaction heat is a product, so heating the mixture is like adding product: the reaction goes backward. In an endothermic reaction heat is a reactant, so heating pushes it forward. A catalyst is different: it speeds up both directions equally, so it helps reach equilibrium sooner but does not move it.",
      definition:
        "- **Exothermic** reaction (\\(\\Delta H < 0\\)): heating shifts it backward and K **decreases**; cooling shifts it forward.\n" +
        "- **Endothermic** reaction (\\(\\Delta H > 0\\)): heating shifts it forward and K **increases**.\n" +
        "- Temperature is the only change that alters the value of K.\n" +
        "- A **catalyst** speeds up the forward and backward reactions equally. Equilibrium is reached sooner, but its position and K do not change.",
      table: {
        columns: ["Change", "Effect on the equilibrium", "Effect on K"],
        rows: [
          { cells: ["Heat an exothermic reaction", "Shifts backward", "K decreases"] },
          { cells: ["Cool an exothermic reaction", "Shifts forward", "K increases"] },
          { cells: ["Heat an endothermic reaction", "Shifts forward", "K increases"], noteAmber: "NEET 2025: N₂ + O₂ ⇌ 2NO has ΔH = +180.7 kJ/mol, so a higher temperature and more N₂ and O₂ give more NO." },
          { cells: ["Add a catalyst", "No shift; equilibrium is reached sooner", "No change"] },
        ],
      },
      pyqExampleId: "2b3d7dd9-4218-4535-a189-8cab4118118b",
      selfCheckExample: {
        prompt: "The formation of \\(\\text{SO}_3\\) from \\(\\text{SO}_2\\) and \\(\\text{O}_2\\) is exothermic. Why is its K smaller at a higher temperature?",
        steps: [
          "Heat is a product of the forward reaction.",
          "Heating favours the backward, heat-absorbing direction, so less \\(\\text{SO}_3\\) is present at the new equilibrium.",
        ],
        answer: "Heating favours the backward reaction, so less product is present and K falls",
      },
      practiceSet: [
        { prompt: "Does a catalyst change the value of an equilibrium constant?", answer: "No" },
        { prompt: "For an endothermic reaction, does K increase or decrease on heating?", answer: "It increases" },
        { prompt: "Which of these changes the value of K: adding a reactant, raising the pressure, or raising the temperature?", answer: "Raising the temperature" },
        { prompt: "For an exothermic gas reaction, is more product present at equilibrium at a low or a high temperature?", answer: "At a low temperature" },
      ],
      traps: [
        {
          title: "A catalyst does not shift equilibrium",
          body: "A catalyst speeds up both directions equally. It gets the mixture to equilibrium sooner but does not give more product and does not change K.",
        },
        {
          title: "Heat favours the endothermic direction",
          body: "Raising the temperature always favours the direction that absorbs heat. For an exothermic forward reaction that is the backward direction, so the yield falls.",
        },
      ],
    },
  ],
};
