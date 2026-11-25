import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_RAOULT_NOTE: SubtopicNote = {
  subtopicName: "Vapour Pressure of Liquid Solutions",
  title: "Vapour Pressure of Solutions: Raoult's Law",
  oneLineDefinition:
    "Raoult's law for a solution of two volatile liquids and for a solution of a non-volatile solid, the total vapour pressure and the composition of the vapour, and how vapour pressure decides when a liquid boils.",
  whyItMatters:
    "16 questions. Eight were set in board papers from 2023 to 2026: the vapour pressure of an ideal solution made from equal moles of two liquids (2023, and the same question again in 2025), state Raoult's law for volatile components (2025, in two papers), explain why a glucose solution has a lower vapour pressure than water (2025), find the vapour pressure of a glucose solution (2024), the pressure cooker as an assertion-reason item (2025, in two sets with opposite reasons), and what happens when the pressure over a liquid and its vapour suddenly falls (2026). The NCERT examples and exercises add the vapour composition and finding a pure liquid's vapour pressure from a mixture.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcso-volatile",
      name: "Raoult's law for two volatile liquids",
      intuition:
        "In a mixture of two liquids, each kind of molecule escapes only from its share of the surface. So each liquid's vapour pressure is its pure vapour pressure scaled down by its mole fraction, and the total is the sum of the two. The vapour above is richer in the liquid that escapes more easily, the one with the higher pure vapour pressure.",
      definition:
        "- **Raoult's law (volatile liquids):** for a solution of volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction in the solution: \\(p_1 = p_1^{\\circ}x_1\\), \\(p_2 = p_2^{\\circ}x_2\\).\n" +
        "- **Total pressure** (Dalton's law of partial pressures): \\(p_{\\text{total}} = p_1 + p_2 = p_1^{\\circ}x_1 + p_2^{\\circ}x_2 = p_1^{\\circ} + (p_2^{\\circ} - p_1^{\\circ})x_2\\).\n" +
        "- Plotted against \\(x_2\\), the total vapour pressure is a straight line from \\(p_1^{\\circ}\\) to \\(p_2^{\\circ}\\).\n" +
        "- **Composition of the vapour:** \\(y_1 = \\dfrac{p_1}{p_{\\text{total}}}\\), \\(y_2 = \\dfrac{p_2}{p_{\\text{total}}}\\). The vapour is always richer in the more volatile component.\n" +
        "- Change grams into moles before using any mole fraction.",
      formula: {
        label: "Raoult's law and Dalton's law",
        latex: "p_{\\text{total}} = p_1^{\\circ}x_1 + p_2^{\\circ}x_2, \\qquad y_i = \\frac{p_i}{p_{\\text{total}}}",
        symbols: [
          { symbol: "\\(p_1^{\\circ}, p_2^{\\circ}\\)", meaning: "vapour pressures of the pure liquids" },
          { symbol: "\\(x_1, x_2\\)", meaning: "mole fractions in the liquid" },
          { symbol: "\\(y_1, y_2\\)", meaning: "mole fractions in the vapour" },
        ],
      },
      authoredExample: {
        prompt: "Liquids A and B form an ideal solution. At a certain temperature the vapour pressures of pure A and pure B are 300 mm Hg and 500 mm Hg. Find the total vapour pressure of a solution in which the mole fraction of A is 0.25, and the mole fraction of A in the vapour.",
        steps: [
          "Given: \\(p_A^{\\circ} = 300\\) mm Hg, \\(p_B^{\\circ} = 500\\) mm Hg, \\(x_A = 0.25\\), so \\(x_B = 0.75\\).",
          "Raoult's law: \\(p_A = 300 \\times 0.25 = 75\\) mm Hg; \\(p_B = 500 \\times 0.75 = 375\\) mm Hg.",
          "\\(p_{\\text{total}} = 75 + 375 = 450\\) mm Hg.",
          "Vapour: \\(y_A = \\dfrac{p_A}{p_{\\text{total}}} = \\dfrac{75}{450} = 0.167\\).",
        ],
        answer: "Total vapour pressure 450 mm Hg; mole fraction of A in the vapour 0.167",
      },
      selfCheckExample: {
        prompt: "The vapour pressures of pure liquids A and B are 400 mm Hg and 200 mm Hg. An ideal solution of the two has a total vapour pressure of 280 mm Hg. Find the mole fraction of A in the liquid.",
        steps: ["\\(280 = 400x_A + 200(1 - x_A) = 200 + 200x_A\\).", "\\(x_A = \\dfrac{80}{200} = 0.40\\)."],
        answer: "0.40",
      },
      practiceSet: [
        { prompt: "In an ideal solution of a liquid with pure vapour pressure 90 mm Hg and another with 30 mm Hg, which liquid is the vapour richer in?", answer: "The one with 90 mm Hg, the more volatile liquid" },
        { prompt: "What shape is the graph of total vapour pressure against the mole fraction of one component for an ideal solution?", answer: "A straight line joining the two pure vapour pressures" },
        { prompt: "Pure liquid A alone has a mole fraction of 1. What is the total vapour pressure then?", answer: "\\(p_A^{\\circ}\\), the vapour pressure of pure A" },
      ],
      pyqExampleId: "f2e20f83-1d63-48a8-8abe-bbfd87941326",
      traps: [
        {
          title: "Using liquid mole fractions for the vapour",
          body: "The mole fractions in the vapour are \\(y = p/p_{\\text{total}}\\), not the liquid's x. When a question asks for the vapour composition, do the extra step.",
        },
        {
          title: "Putting grams into Raoult's law",
          body: "Mole fractions need moles. Divide each mass by its molar mass first; equal masses are not equal mole fractions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-non-volatile",
      name: "Vapour pressure of a solution of a non-volatile solute",
      intuition:
        "A non-volatile solute such as glucose does not escape into the vapour, but its particles take up part of the surface. Fewer solvent molecules are at the surface to escape, so the vapour pressure falls. Only the solvent is in the vapour, so Raoult's law is used for the solvent alone.",
      definition:
        "- In a solution of a non-volatile solute, only the solvent contributes to the vapour pressure.\n" +
        "- **Raoult's law (general form):** for any solution, the partial vapour pressure of each volatile component is directly proportional to its mole fraction. For the solvent: \\(p_1 = x_1 p_1^{\\circ}\\).\n" +
        "- Since \\(x_1 < 1\\), the vapour pressure of the solution is lower than that of the pure solvent.\n" +
        "- **Why:** solute particles occupy part of the surface, so fewer solvent molecules escape from it.\n" +
        "- The lowering depends on the amount of solute, not its nature: 1.0 mol of sucrose or 1.0 mol of urea in 1 kg of water lowers the vapour pressure by nearly the same amount.",
      formula: {
        label: "Raoult's law for the solvent",
        latex: "p_1 = x_1\\,p_1^{\\circ}, \\qquad x_1 = \\frac{n_1}{n_1 + n_2}",
      },
      authoredExample: {
        prompt: "6.0 g of urea (molar mass 60 g mol⁻¹) is dissolved in 90 g of water. The vapour pressure of pure water at this temperature is 30.0 mm Hg. Calculate the vapour pressure of the solution.",
        steps: [
          "Given: \\(w_2 = 6.0\\) g, \\(M_2 = 60\\) g mol⁻¹, \\(w_1 = 90\\) g, \\(p_1^{\\circ} = 30.0\\) mm Hg.",
          "Moles: \\(n_2 = \\dfrac{6.0}{60} = 0.10\\) mol; \\(n_1 = \\dfrac{90}{18} = 5.0\\) mol.",
          "\\(x_1 = \\dfrac{5.0}{5.0 + 0.10} = 0.980\\).",
          "Formula: \\(p_1 = x_1 p_1^{\\circ} = 0.980 \\times 30.0 = 29.4\\) mm Hg.",
        ],
        answer: "29.4 mm Hg",
      },
      selfCheckExample: {
        prompt: "In a solution of a non-volatile solute, the mole fraction of the solvent is 0.95. The pure solvent has a vapour pressure of 40 mm Hg. What is the vapour pressure of the solution?",
        steps: ["\\(p_1 = 0.95 \\times 40\\)."],
        answer: "38 mm Hg",
      },
      practiceSet: [
        { prompt: "1 mol of sucrose and 1 mol of urea are each dissolved in 1 kg of water. Compare the lowering of vapour pressure.", answer: "Nearly the same: the lowering depends on the amount of solute, not its nature" },
        { prompt: "A solution of a non-volatile solute is plotted as vapour pressure against the mole fraction of the solvent. What does the graph look like?", answer: "A straight line from zero to \\(p_1^{\\circ}\\), the vapour pressure of the pure solvent" },
        { prompt: "Does sucrose contribute to the vapour above its aqueous solution?", answer: "No. Sucrose is non-volatile; only water is in the vapour" },
      ],
      pyqExampleId: "0dba291d-dc6a-4dfa-86a9-91204e4ab34c",
      traps: [
        {
          title: "Forgetting why the vapour pressure falls",
          body: "Say that the solute particles occupy part of the surface, so fewer solvent molecules escape. \"Because a solute is added\" earns nothing.",
        },
        {
          title: "Using the mass of the solution for the solvent",
          body: "In a 5% solution by mass, 100 g holds 95 g of water. Use 95 g, not 100 g, when you find the moles of water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcso-boiling-pressure",
      name: "Vapour pressure, external pressure and boiling",
      intuition:
        "A liquid boils when its vapour pressure becomes equal to the pressure pressing on it. Raise the pressure above the water and it must get hotter before it can boil; lower the pressure and it boils at a lower temperature. The board uses this idea for the pressure cooker and the hill station.",
      definition:
        "- A liquid boils at the temperature at which its vapour pressure is equal to the atmospheric (external) pressure. Water boils at 373.15 K at 1.013 bar.\n" +
        "- A higher external pressure means a higher boiling point; a lower external pressure means a lower boiling point.\n" +
        "- The present NCERT chapter states only the first point. The pressure cooker (asked in 2025) and the cooling of a liquid when the pressure over it suddenly falls (asked in 2026) are not covered in the book, so learn the reasons in the table and give them little extra time.",
      table: {
        columns: ["Situation", "What happens", "Reason"],
        rows: [
          {
            cells: ["Pressure cooker", "Food cooks faster", "Steam raises the pressure inside, so water boils above 100 °C and food cooks at a higher temperature"],
            noteAmber: "Board 2025 asked this twice as assertion-reason: with \"boiling point is elevated\" as the reason, both true and the reason explains; with \"boiling point is lowered\", the reason is false.",
          },
          { cells: ["Cooking at a hill station", "Food takes longer to cook", "The atmospheric pressure is lower, so water boils below 100 °C"] },
          { cells: ["Liquid and its vapour at equilibrium, pressure suddenly lowered", "The liquid cools", "More liquid evaporates, and the heat needed for evaporation is taken from the liquid itself"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why does rice take longer to cook in an open pan on a high mountain?",
        steps: ["The atmospheric pressure on a mountain is lower.", "Water reaches that lower pressure at a lower temperature, so it boils below 100 °C and the rice cooks at a lower temperature."],
        answer: "Water boils below 100 °C at the lower pressure, so cooking is slower",
      },
      practiceSet: [
        { prompt: "At what condition does a liquid boil?", answer: "When its vapour pressure equals the external (atmospheric) pressure" },
        { prompt: "Is the boiling point of water inside a working pressure cooker above or below 100 °C?", answer: "Above 100 °C" },
        { prompt: "Where does the heat come from when a liquid evaporates fast after the pressure over it is suddenly lowered?", answer: "From the liquid itself, so the liquid cools" },
      ],
      pyqExampleId: "744ee540-64a9-438c-b080-3f0ef3fd3fc4",
      traps: [
        {
          title: "Saying the pressure cooker lowers the boiling point",
          body: "The higher pressure RAISES the boiling point. That higher temperature is why food cooks faster. The board set the wrong version as a false reason in 2025.",
        },
        {
          title: "Saying the liquid warms when the pressure drops",
          body: "A sudden fall in pressure makes more liquid evaporate. Evaporation takes heat from the liquid, so it cools.",
        },
      ],
    },
  ],
};
