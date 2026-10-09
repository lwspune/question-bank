import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_EQK_RATES_NOTE: SubtopicNote = {
  subtopicName: "Reaction Rates",
  title: "Reaction Rate, Collision Theory, Catalysts and Rate Laws",
  oneLineDefinition:
    "A reaction goes faster when particles collide more often or when more of the collisions carry at least the activation energy; the exact dependence on concentration has to be measured.",
  whyItMatters:
    "Rates appear in the 2014, 2018, 2025 and 2026 papers: the effect of a more concentrated reactant on rate and on the amount of product, why higher pressure speeds up a gas reaction, what the activation energy is, and the fact that a rate law must be found by experiment.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-eqk-rate-measure",
      name: "Measuring the rate of a reaction",
      intuition:
        "The rate of a reaction is how quickly a reactant is used up or a product appears, just as speed is how quickly distance changes. You can follow anything that changes as the reaction goes: the volume of gas given off, the mass lost from a flask, a colour, the pH. The rate is fastest at the start and slows as the reactants run out.",
      definition:
        "- **Rate of reaction** = change in concentration (or amount, volume, mass) divided by the time taken. For concentrations the unit is \\(\\text{mol dm}^{-3}\\,\\text{s}^{-1}\\).\n" +
        "- A more **concentrated** reactant usually reacts faster; the next concept explains why.\n" +
        "- The rate falls as the reaction proceeds, because the reactants are used up. The **initial rate** is the gradient of the curve at time zero.\n" +
        "- **Rate and yield are different things.** How fast the product forms depends on the conditions. How much product forms in the end depends on the amount of the **limiting reactant**.",
      formula: {
        label: "Average rate",
        latex: "\\text{rate} = \\frac{\\Delta[\\text{reactant or product}]}{\\Delta t}",
        symbols: [
          { symbol: "\\(\\Delta[\\ ]\\)", meaning: "change in concentration, in mol/dm³ (taken as positive)" },
          { symbol: "\\(\\Delta t\\)", meaning: "time taken, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "In a reaction, the concentration of a reactant falls from 0.80 mol/dm³ to 0.50 mol/dm³ in the first 60 s. What is the average rate over this time?",
        steps: [
          "Change in concentration: \\(0.80 - 0.50 = 0.30\\ \\text{mol dm}^{-3}\\).",
          "Rate \\(= 0.30 / 60 = 5.0 \\times 10^{-3}\\ \\text{mol dm}^{-3}\\,\\text{s}^{-1}\\).",
          "Over the next 60 s the rate will be lower, because less reactant is left.",
        ],
        answer: "\\(5.0 \\times 10^{-3}\\ \\text{mol dm}^{-3}\\,\\text{s}^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "Excess magnesium ribbon reacts with 40 cm³ of 1.0 mol/dm³ hydrochloric acid and the hydrogen is collected. The experiment is repeated with 80 cm³ of the same acid, at the same temperature, with the same excess of magnesium. Compared with the first experiment, what happens to the initial rate and to the total volume of hydrogen?",
        options: [
          "Rate doubled; volume doubled",
          "Rate doubled; volume the same",
          "Rate the same; volume the same",
          "Rate halved; volume doubled",
          "Rate about the same; volume doubled",
        ],
        steps: [
          "The acid has the same concentration, so its particles are just as crowded: the initial rate is about the same.",
          "The acid is the limiting reactant and there is twice as much of it, so twice as much hydrogen forms in the end.",
          "A and B treat a larger volume as a higher concentration. The amount of product follows the limiting reactant, not the rate.",
        ],
        answer: "(E) Rate about the same; volume doubled",
      },
      practiceSet: [
        { prompt: "A flask loses 0.60 g as carbon dioxide escapes during the first 30 s. What is the average rate of mass loss?", answer: "0.020 g/s", method: "\\(0.60/30\\)" },
        { prompt: "The concentration of a product rises from 0 to 0.12 mol/dm³ in 40 s. What is the average rate of its formation?", answer: "\\(3.0 \\times 10^{-3}\\ \\text{mol dm}^{-3}\\,\\text{s}^{-1}\\)", method: "\\(0.12/40\\)" },
        { prompt: "Why does the rate of a reaction usually fall as time passes?", answer: "The reactants are used up, so their concentration falls" },
      ],
      traps: [
        {
          title: "A faster reaction does not make more product",
          body: "Speeding a reaction up gets to the end sooner, but the amount of product is fixed by the limiting reactant. Doubling the amount of the limiting reactant doubles the product; doubling only the rate does not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eqk-collision",
      name: "Collision theory and the factors that change the rate",
      intuition:
        "Particles can only react when they meet, and most meetings are too gentle to break any bonds. Only collisions with at least the activation energy, and with the particles the right way round, lead to a reaction. So there are two ways to speed a reaction up: make collisions more frequent, or make a larger fraction of them energetic enough.",
      definition:
        "**Collision theory**: particles react only if they **collide** with energy **at least equal to the activation energy** and in a suitable orientation.\n" +
        "- **Concentration**, **pressure** (for gases) and **surface area** raise the **frequency of collisions**. They do not change the fraction of particles with enough energy.\n" +
        "- **Temperature** raises the collision frequency a little, but mainly increases the **fraction of particles with energy at least \\(E_a\\)**. Many reactions roughly double in rate for a 10 °C rise.\n" +
        "- A **catalyst** gives a route with a **lower activation energy**, so a larger fraction of collisions succeed.\n" +
        "- The spread of particle energies is the **Maxwell-Boltzmann distribution**: at higher temperature the curve flattens and shifts right, and the area beyond \\(E_a\\) grows sharply.",
      table: {
        columns: ["Factor increased", "Effect on rate", "Why"],
        rows: [
          { cells: ["Concentration of a solution", "Faster", "More particles per volume, so more frequent collisions"] },
          { cells: ["Pressure of a gas", "Faster", "Particles closer together, so more frequent collisions"] },
          { cells: ["Surface area of a solid", "Faster", "More particles exposed, so more frequent collisions"] },
          { cells: ["Temperature", "Faster", "Mainly a larger fraction of collisions with energy at least \\(E_a\\)"] },
          { cells: ["Catalyst added", "Faster", "Lower activation energy, so more collisions succeed"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "For many reactions, a 10 °C rise in temperature roughly doubles the rate, although the number of collisions per second rises by only a few per cent. What mainly explains the large increase in rate?",
        options: [
          "A much larger fraction of collisions have energy at least equal to the activation energy",
          "The activation energy decreases as the temperature rises",
          "The concentrations of the reactants increase",
          "The enthalpy change becomes more negative",
          "The particles become larger and collide more easily",
        ],
        steps: [
          "A few per cent more collisions cannot double the rate, so the extra speed must come from the collisions being more effective.",
          "Heating shifts the energy distribution: many more particles now have at least \\(E_a\\), so a much larger fraction of collisions react.",
          "B describes a catalyst, not heating: \\(E_a\\) stays the same. C, D and E are not effects of heating.",
        ],
        answer: "(A) A much larger fraction of collisions have energy at least equal to the activation energy",
      },
      practiceSet: [
        { prompt: "Why does powdered calcium carbonate react faster with acid than marble chips of the same mass?", answer: "Larger surface area, so more frequent collisions" },
        { prompt: "Does increasing the concentration change the fraction of particles with energy at least \\(E_a\\)?", answer: "No: it only makes collisions more frequent" },
        { prompt: "Why does food keep longer in a fridge?", answer: "At lower temperature fewer collisions have enough energy, so the reactions that spoil food are slower" },
      ],
      traps: [
        {
          title: "Pressure and concentration change how often particles collide, not how hard",
          body: "Raising the pressure of a gas at constant temperature speeds a reaction because collisions become more frequent. It does not give more molecules energy above the activation energy: only a rise in temperature does that, and a catalyst lowers the barrier instead.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eqk-catalyst",
      name: "Catalysts: a lower-energy route, not more product",
      intuition:
        "A catalyst is like a tunnel through a mountain. It offers the reactants a different route with a lower barrier, so more of them get through each second. The start and the end of the journey are unchanged, so the catalyst changes neither the energy released nor how far the reaction finally goes.",
      definition:
        "A **catalyst** increases the rate of a reaction without being used up overall.\n" +
        "- It provides an **alternative pathway** with a **lower activation energy**.\n" +
        "- It is **regenerated** at the end, so a small amount works for a long time.\n" +
        "- It **does not change** \\(\\Delta H\\), the position of equilibrium, the equilibrium constant, or the yield.\n" +
        "- In a reversible reaction it speeds up the forward and reverse reactions **equally**, so equilibrium is reached **sooner**.\n" +
        "- **Enzymes** are biological catalysts (catalase breaks down hydrogen peroxide in cells).",
      table: {
        columns: ["Feature", "What a catalyst does"],
        rows: [
          { cells: ["Activation energy", "Lowers it, for both the forward and the reverse reaction"] },
          { cells: ["Rate", "Increases the rates of both directions equally"] },
          { cells: ["ΔH", "No change"] },
          { cells: ["Equilibrium position, K and yield", "No change; equilibrium is reached sooner"] },
          { cells: ["Amount at the end", "Same as at the start"] },
          { cells: ["Examples", "\\(\\mathrm{MnO_2}\\) for \\(\\mathrm{H_2O_2}\\) decomposition, iron in ammonia synthesis, enzymes"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A suitable catalyst is added to a reversible gas reaction that is already at equilibrium. Which statement is correct?",
        options: [
          "The equilibrium yield of products increases",
          "The equilibrium constant increases",
          "The enthalpy change becomes less negative",
          "The rates of the forward and reverse reactions increase by the same factor",
          "The catalyst is gradually used up",
        ],
        steps: [
          "A catalyst lowers the activation energy of both directions by the same amount, so both rates rise equally.",
          "With both rates still equal, the composition of the mixture does not change: no change in yield or in K.",
          "C is wrong because a catalyst leaves the energy levels of reactants and products alone. E is wrong by definition.",
        ],
        answer: "(D) The rates of the forward and reverse reactions increase by the same factor",
      },
      practiceSet: [
        { prompt: "Does a catalyst change the activation energy of the reverse reaction?", answer: "Yes: it lowers it by the same amount as the forward one" },
        { prompt: "What are biological catalysts called?", answer: "Enzymes" },
        { prompt: "Which black solid is used to catalyse the decomposition of hydrogen peroxide in the lab?", answer: "Manganese(IV) oxide, \\(\\mathrm{MnO_2}\\)" },
      ],
      traps: [
        {
          title: "A catalyst never increases the yield",
          body: "A catalyst gets a reversible reaction to equilibrium faster, but the equilibrium mixture is exactly the same as without it. Options saying a catalyst increases the yield, shifts the equilibrium or changes K are always wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-rate-law",
      name: "Rate laws and orders of reaction are found by experiment",
      intuition:
        "Most reactions do not happen in one collision of all the reactants. They go through several steps, and the slowest step controls the rate. Since the balanced equation hides those steps, it cannot tell you how the rate depends on each concentration: that has to be measured.",
      definition:
        "- The **rate law** (rate equation) has the form \\(\\text{rate} = k[\\mathrm{A}]^m[\\mathrm{B}]^n\\).\n" +
        "- \\(m\\) and \\(n\\) are the **orders** with respect to A and B; the **overall order** is \\(m + n\\). They are found **experimentally** and are usually 0, 1 or 2.\n" +
        "- The orders are **not** the coefficients of the balanced equation in general. They match only for a single-step (elementary) reaction.\n" +
        "- Doubling a concentration: order 0, no change; order 1, rate doubles; order 2, rate goes up four times.\n" +
        "- The **rate constant** \\(k\\) depends on temperature (and on a catalyst), not on concentration. It rises with temperature and is smaller when the activation energy is larger.",
      formula: {
        label: "Rate law",
        latex: "\\text{rate} = k\\,[\\mathrm{A}]^m\\,[\\mathrm{B}]^n",
        symbols: [
          { symbol: "\\(k\\)", meaning: "rate constant, fixed at a given temperature" },
          { symbol: "\\(m, n\\)", meaning: "orders with respect to A and B, found by experiment" },
        ],
      },
      authoredExample: {
        prompt:
          "For A + B → products, three initial-rate experiments gave: [A] = 0.10, [B] = 0.10, rate \\(2.0 \\times 10^{-4}\\); [A] = 0.20, [B] = 0.10, rate \\(8.0 \\times 10^{-4}\\); [A] = 0.10, [B] = 0.20, rate \\(2.0 \\times 10^{-4}\\) (concentrations in mol/dm³, rates in mol dm⁻³ s⁻¹). Find the rate law and k.",
        steps: [
          "Experiments 1 and 2: [A] doubles, [B] is fixed, and the rate rises \\(8.0/2.0 = 4\\) times, so the order in A is 2.",
          "Experiments 1 and 3: [B] doubles and the rate does not change, so the order in B is 0.",
          "Rate \\(= k[\\mathrm{A}]^2\\), and \\(k = 2.0 \\times 10^{-4} / 0.10^2 = 0.020\\ \\text{dm}^3\\,\\text{mol}^{-1}\\,\\text{s}^{-1}\\). The equation A + B alone could not have predicted this.",
        ],
        answer: "Rate \\(= k[\\mathrm{A}]^2\\), \\(k = 0.020\\ \\text{dm}^3\\,\\text{mol}^{-1}\\,\\text{s}^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(\\mathrm{2NO(g) + O_2(g) \\rightarrow 2NO_2(g)}\\), experiments show that rate \\(= k[\\mathrm{NO}]^2[\\mathrm{O_2}]\\). If both concentrations are doubled at the same time, by what factor does the rate increase?",
        options: ["2", "4", "6", "8", "16"],
        steps: [
          "Doubling [NO] multiplies the rate by \\(2^2 = 4\\).",
          "Doubling \\([\\mathrm{O_2}]\\) multiplies it by \\(2^1 = 2\\).",
          "Together: \\(4 \\times 2 = 8\\). C adds the factors instead of multiplying them. B ignores the oxygen.",
        ],
        answer: "(D) 8",
      },
      practiceSet: [
        { prompt: "Rate \\(= k[\\mathrm{X}]\\). What happens to the rate when [X] is tripled?", answer: "It triples" },
        { prompt: "A reaction is zero order in Y. What happens to the rate when [Y] doubles?", answer: "Nothing: it stays the same" },
        { prompt: "What is the overall order of a reaction with rate \\(= k[\\mathrm{A}][\\mathrm{B}]^2\\)?", answer: "3" },
        { prompt: "Can the rate law of A + B → C be written down from the equation alone?", answer: "No: it must be determined experimentally" },
      ],
      traps: [
        {
          title: "Orders are not the coefficients of the equation",
          body: "The rate law of a reaction cannot be read from its balanced equation, because most reactions go through several steps. Options like rate = k[A][B] written straight from A + B → C are guesses; the right answer is that the rate law is found by experiment. For a simple reaction, the products do not normally appear in it.",
        },
      ],
    },
  ],
};
