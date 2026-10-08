import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_EQK_LE_CHATELIER_NOTE: SubtopicNote = {
  subtopicName: "Le Chatelier's Principle",
  title: "Le Chatelier's Principle: Concentration, Pressure, Temperature and Catalysts",
  oneLineDefinition:
    "When the conditions of an equilibrium are changed, its position shifts to oppose the change; only a change in temperature alters the value of K.",
  whyItMatters:
    "This is the most asked page of the chapter. The 2015, 2016, 2020, 2022, 2023 and 2025 papers asked which way an equilibrium moves when a substance is added or removed or the temperature changes, and how temperature changes Kc, usually as a which of these statements question with a catalyst among the distractors.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-eqk-lc-concentration",
      name: "Changing a concentration shifts the equilibrium to oppose it",
      intuition:
        "An equilibrium behaves as if it resists being pushed. Add more of a substance and the reaction that uses it up speeds up until a new balance is reached; take a substance away and the reaction that makes it takes over. Kc itself does not change: the concentrations rearrange until the ratio is back to the same value.",
      definition:
        "**Le Chatelier's principle**: if a system at equilibrium is disturbed, the position of equilibrium shifts in the direction that **opposes the change**.\n" +
        "- **Adding** a reactant, or **removing** a product, shifts the equilibrium to the **right**.\n" +
        "- **Adding** a product, or **removing** a reactant, shifts it to the **left**.\n" +
        "- A species can be removed indirectly by adding something that **reacts with it**: an acid removes \\(\\mathrm{OH^-}\\), an alkali removes \\(\\mathrm{H^+}\\).\n" +
        "- Adding or removing a **pure solid or liquid** has **no effect**, since it is not in Kc.\n" +
        "- A concentration change does **not** change Kc.",
      table: {
        columns: ["Change", "Shift", "Reason"],
        rows: [
          { cells: ["Add a reactant", "To the right", "The forward reaction uses up the extra reactant"] },
          { cells: ["Remove a product", "To the right", "The forward reaction replaces it"] },
          { cells: ["Add a product", "To the left", "The reverse reaction uses up the extra product"] },
          { cells: ["Add a substance that reacts with a product", "To the right", "That product is being removed"] },
          { cells: ["Add more of a pure solid", "No shift", "A solid is not in Kc"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In solution, orange dichromate ions and yellow chromate ions are in equilibrium: \\(\\mathrm{Cr_2O_7^{2-}(aq) + H_2O(l) \\rightleftharpoons 2CrO_4^{2-}(aq) + 2H^+(aq)}\\). Which change turns the orange solution yellow?",
        options: [
          "Adding hydrochloric acid",
          "Adding sodium hydroxide solution",
          "Adding a catalyst",
          "Bubbling nitrogen gas through the solution",
          "Adding dilute sulfuric acid",
        ],
        steps: [
          "Yellow means more chromate, so the equilibrium must shift to the right.",
          "Hydroxide ions react with \\(\\mathrm{H^+}\\) to form water. Removing a product shifts the equilibrium right, giving more yellow chromate.",
          "A and E add \\(\\mathrm{H^+}\\), a product, so the shift is to the left: more orange. C and D do not change any concentration in Kc.",
        ],
        answer: "(B) Adding sodium hydroxide solution",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{Fe^{3+}(aq) + SCN^-(aq) \\rightleftharpoons FeSCN^{2+}(aq)}\\) (blood red). What happens to the colour when more KSCN is added?", answer: "It becomes deeper red", method: "Adding a reactant shifts it right" },
        { prompt: "In ammonia synthesis, ammonia is continuously removed. What does this do to the equilibrium?", answer: "It shifts to the right, so more ammonia forms" },
        { prompt: "\\(\\mathrm{CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g)}\\) is at equilibrium in a closed vessel. More CaO is added. What happens?", answer: "Nothing: CaO is a solid and is not in Kc" },
      ],
      traps: [
        {
          title: "Adding a solid does not shift an equilibrium",
          body: "In an equilibrium with a solid on one side, adding or removing some of that solid changes nothing, because a solid does not appear in Kc. Only the gases and dissolved species can be used to push the equilibrium.",
        },
        {
          title: "A reagent that removes a product shifts the equilibrium right",
          body: "You do not have to add a reactant to drive an equilibrium forward. Adding a substance that reacts with one of the products (an alkali removing \\(\\mathrm{H^+}\\), for example) also shifts it to the right. Adding a substance that supplies a product shifts it to the left.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eqk-lc-pressure",
      name: "Changing the pressure: count the moles of gas",
      intuition:
        "Gas pressure comes from the number of gas molecules. If you squeeze an equilibrium mixture, it can partly undo the squeeze by turning into fewer molecules. If you lower the pressure, it makes more molecules. When both sides have the same number of gas moles, pressure has nothing to work with.",
      definition:
        "- **Increasing the pressure** (by compressing) shifts the equilibrium towards the side with **fewer moles of gas**. Decreasing it shifts towards **more** moles of gas.\n" +
        "- Count only **gases**; ignore solids, liquids and dissolved species.\n" +
        "- Equal moles of gas on both sides: **no shift**.\n" +
        "- Adding an unreactive gas at **constant volume** changes no partial pressures: **no shift**.\n" +
        "- A pressure change does **not** change Kc. It also speeds up a gas reaction, so equilibrium is reached sooner.",
      table: {
        columns: ["Equilibrium", "Moles of gas, left : right", "Higher pressure shifts"],
        rows: [
          { cells: ["\\(\\mathrm{N_2 + 3H_2 \\rightleftharpoons 2NH_3}\\)", "4 : 2", "To the right"] },
          { cells: ["\\(\\mathrm{N_2O_4 \\rightleftharpoons 2NO_2}\\)", "1 : 2", "To the left"] },
          { cells: ["\\(\\mathrm{H_2 + I_2 \\rightleftharpoons 2HI}\\)", "2 : 2", "No shift"] },
          { cells: ["\\(\\mathrm{CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g)}\\)", "0 : 1", "To the left"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "For which equilibrium, all at constant temperature, does increasing the pressure increase the equilibrium yield of the products?",
        options: [
          "\\(\\mathrm{H_2(g) + Cl_2(g) \\rightleftharpoons 2HCl(g)}\\)",
          "\\(\\mathrm{N_2O_4(g) \\rightleftharpoons 2NO_2(g)}\\)",
          "\\(\\mathrm{2NO(g) + O_2(g) \\rightleftharpoons 2NO_2(g)}\\)",
          "\\(\\mathrm{CH_4(g) + H_2O(g) \\rightleftharpoons CO(g) + 3H_2(g)}\\)",
          "\\(\\mathrm{C(s) + CO_2(g) \\rightleftharpoons 2CO(g)}\\)",
        ],
        steps: [
          "Higher pressure favours the side with fewer moles of gas, so we need fewer gas moles on the right.",
          "C: 3 mol of gas on the left, 2 on the right. Yes.",
          "A has 2 : 2, no shift. B, D and E have more gas on the right (in E the solid carbon does not count: 1 : 2), so pressure lowers their yield.",
        ],
        answer: "(C) \\(\\mathrm{2NO(g) + O_2(g) \\rightleftharpoons 2NO_2(g)}\\)",
      },
      practiceSet: [
        { prompt: "For \\(\\mathrm{PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)}\\), which way does the equilibrium shift when the pressure is lowered?", answer: "To the right", method: "1 mol of gas becomes 2" },
        { prompt: "Does increasing the pressure change the value of Kc?", answer: "No: only temperature does" },
        { prompt: "Argon is added to an equilibrium mixture of gases at constant volume. What happens to the position of equilibrium?", answer: "Nothing: the partial pressures of the reacting gases are unchanged" },
      ],
      traps: [
        {
          title: "Count gas moles only",
          body: "In an equilibrium with solids or liquids, only the gases decide the effect of pressure. For \\(\\mathrm{C(s) + CO_2(g) \\rightleftharpoons 2CO(g)}\\) the count is 1 : 2, not 2 : 2.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eqk-lc-temperature",
      name: "Changing the temperature: the only change that alters K",
      intuition:
        "Treat heat as if it were a reactant or a product. In an exothermic reaction heat is a product, so heating the mixture is like adding product: the equilibrium shifts left. Cooling removes heat and shifts it right. Because this changes the ratio of products to reactants at the new temperature, K itself changes.",
      definition:
        "- **Raising the temperature** shifts the equilibrium in the **endothermic** direction; lowering it shifts it in the **exothermic** direction.\n" +
        "- Forward reaction **exothermic** (\\(\\Delta H < 0\\)): heating **decreases** K; cooling **increases** K.\n" +
        "- Forward reaction **endothermic** (\\(\\Delta H > 0\\)): heating **increases** K.\n" +
        "- **Temperature is the only factor that changes K.** Concentration, pressure and catalysts leave it unchanged.\n" +
        "- Example: the self-ionisation of water, \\(\\mathrm{H_2O \\rightleftharpoons H^+ + OH^-}\\), is endothermic. On heating, \\(K_w\\) rises (about \\(5.5 \\times 10^{-14}\\) at 50 °C) and the pH of pure water falls to about 6.6, but the water stays **neutral** because \\([\\mathrm{H^+}] = [\\mathrm{OH^-}]\\).",
      table: {
        columns: ["Forward reaction", "Raise the temperature", "Lower the temperature"],
        rows: [
          { cells: ["Exothermic (ΔH negative)", "Shifts left; K decreases", "Shifts right; K increases"] },
          { cells: ["Endothermic (ΔH positive)", "Shifts right; K increases", "Shifts left; K decreases"] },
          { cells: ["Self-ionisation of water (endothermic)", "Kw increases; pH falls below 7; still neutral", "Kw decreases; pH rises above 7; still neutral"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Brown nitrogen dioxide and colourless dinitrogen tetroxide are in equilibrium: \\(\\mathrm{2NO_2(g) \\rightleftharpoons N_2O_4(g)}\\), \\(\\Delta H = -57\\ \\text{kJ/mol}\\). A sealed tube of the mixture is put into ice water. What is seen, and what happens to Kc?",
        options: [
          "The colour becomes paler; Kc increases",
          "The colour becomes darker; Kc decreases",
          "The colour becomes paler; Kc does not change",
          "The colour becomes darker; Kc does not change",
          "The colour does not change; Kc increases",
        ],
        steps: [
          "The forward reaction is exothermic, so cooling shifts the equilibrium to the right, towards colourless \\(\\mathrm{N_2O_4}\\). The colour becomes paler.",
          "A temperature change does change K: for an exothermic reaction, cooling increases Kc.",
          "C is the classic slip of thinking K never changes. B and D have the direction backwards.",
        ],
        answer: "(A) The colour becomes paler; Kc increases",
      },
      practiceSet: [
        { prompt: "A reaction has a positive ΔH. Does raising the temperature increase or decrease K?", answer: "Increase" },
        { prompt: "Which single change can alter the value of Kc?", answer: "A change of temperature" },
        { prompt: "Pure water at 60 °C has a pH below 7. Is it acidic?", answer: "No: it is neutral, since \\([\\mathrm{H^+}] = [\\mathrm{OH^-}]\\)" },
      ],
      traps: [
        {
          title: "Heating an exothermic equilibrium lowers K",
          body: "For an exothermic forward reaction, raising the temperature shifts the equilibrium left and decreases K; lowering the temperature increases K. Options pairing an exothermic reaction with a K that rises on heating are wrong.",
        },
        {
          title: "Pure water is neutral at every temperature",
          body: "Neutral means \\([\\mathrm{H^+}] = [\\mathrm{OH^-}]\\), not pH 7. Hot pure water has a pH below 7 because more of it ionises, but the two ion concentrations stay equal, so it is still neutral.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eqk-lc-industry",
      name: "Putting the factors together: the compromise in ammonia synthesis",
      intuition:
        "Industry wants both a high yield and a fast rate, and for an exothermic reaction these pull in opposite directions: low temperature favours the yield but makes the reaction slow. The conditions chosen are a compromise, with a catalyst added to win back speed without touching the yield.",
      definition:
        "The **Haber process**: \\(\\mathrm{N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)}\\), \\(\\Delta H = -92\\ \\text{kJ/mol}\\).\n" +
        "- **High pressure** (about 200 atm) favours the side with fewer gas moles and raises the rate; higher still would cost too much in equipment and safety.\n" +
        "- **Moderate temperature** (about 450 °C): lower would give a higher yield but too slow a rate.\n" +
        "- **Iron catalyst**: faster, with no change in yield.\n" +
        "- Ammonia is **condensed and removed**, and unreacted gases are recycled.\n" +
        "The **Contact process** (\\(\\mathrm{2SO_2 + O_2 \\rightleftharpoons 2SO_3}\\), exothermic) uses the same reasoning with a vanadium(V) oxide catalyst at about 450 °C and low pressure, because the conversion is already high.",
      table: {
        columns: ["Condition", "Effect on equilibrium yield", "Effect on rate", "Choice in the Haber process"],
        rows: [
          { cells: ["Higher pressure", "Increases", "Increases", "About 200 atm"] },
          { cells: ["Lower temperature", "Increases", "Decreases", "A compromise near 450 °C"] },
          { cells: ["Catalyst", "No effect", "Increases", "Iron"] },
          { cells: ["Removing ammonia", "Increases the conversion", "Keeps the forward reaction going", "Ammonia condensed out"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In the Haber process (\\(\\Delta H = -92\\ \\text{kJ/mol}\\)), why is a temperature of about 450 °C used instead of a much lower one?",
        options: [
          "A higher temperature gives a higher equilibrium yield of ammonia",
          "At a much lower temperature the yield would be higher but the rate far too slow",
          "The iron catalyst increases the yield only at high temperature",
          "The reaction becomes endothermic below 450 °C",
          "A higher temperature increases the value of Kc",
        ],
        steps: [
          "The forward reaction is exothermic, so lower temperatures give a higher equilibrium yield (and a larger Kc).",
          "But at low temperatures very few collisions have enough energy, and the rate would be uneconomic. 450 °C is a compromise.",
          "A and E have the effect of temperature backwards for an exothermic reaction. C is wrong: a catalyst never changes the yield. D is wrong: the sign of ΔH does not flip.",
        ],
        answer: "(B) At a much lower temperature the yield would be higher but the rate far too slow",
      },
      practiceSet: [
        { prompt: "What is the effect of the iron catalyst on the equilibrium yield of ammonia?", answer: "None: equilibrium is only reached faster" },
        { prompt: "Why is ammonia removed from the reaction mixture as it forms?", answer: "Removing a product shifts the equilibrium right, so more of the nitrogen and hydrogen are converted" },
        { prompt: "Why is a pressure much higher than 200 atm not used?", answer: "The cost of equipment strong enough, and the safety risk, outweigh the extra yield" },
      ],
    },
  ],
};
