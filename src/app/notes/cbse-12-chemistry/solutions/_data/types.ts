import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Solutions",
  title: "Types of Solutions",
  oneLineDefinition:
    "What a solution is, which component is the solvent and which the solute, and the nine kinds of binary solution with an example of each.",
  whyItMatters:
    "2 questions, both from the NCERT exercises: define a solution and describe its types with examples, and give an example of a solid solution in which the solute is a gas. No board paper from 2023 to 2026 set a question on this page alone, but the words solute, solvent and binary solution are used in every answer that follows.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcso-types",
      name: "Solute, solvent and the nine types of solution",
      intuition:
        "A solution looks the same everywhere you sample it: that is what homogeneous means. The component present in the largest amount is the solvent, and it decides whether the solution is a gas, a liquid or a solid. The other component is the solute. Since each of the two can be a gas, a liquid or a solid, there are three times three, that is nine, kinds of binary solution.",
      definition:
        "- **Solution:** a homogeneous mixture of two or more components; its composition and properties are uniform throughout.\n" +
        "- **Solvent:** the component present in the largest quantity. It decides the physical state of the solution.\n" +
        "- **Solute:** any component other than the solvent.\n" +
        "- **Binary solution:** a solution of only two components. This chapter deals with binary solutions.\n" +
        "- Each component can be a solid, a liquid or a gas, so there are nine types, grouped as gaseous, liquid and solid solutions by the state of the solvent.",
      table: {
        columns: ["Type of solution", "Solute", "Solvent", "Common example"],
        rows: [
          { cells: ["Gaseous", "Gas", "Gas", "Mixture of oxygen and nitrogen gases"] },
          { cells: ["Gaseous", "Liquid", "Gas", "Chloroform mixed with nitrogen gas"] },
          { cells: ["Gaseous", "Solid", "Gas", "Camphor in nitrogen gas"] },
          { cells: ["Liquid", "Gas", "Liquid", "Oxygen dissolved in water"] },
          { cells: ["Liquid", "Liquid", "Liquid", "Ethanol dissolved in water"] },
          { cells: ["Liquid", "Solid", "Liquid", "Glucose dissolved in water"] },
          { cells: ["Solid", "Gas", "Solid", "Solution of hydrogen in palladium"] },
          { cells: ["Solid", "Liquid", "Solid", "Amalgam of mercury with sodium"] },
          { cells: ["Solid", "Solid", "Solid", "Copper dissolved in gold"] },
        ],
      },
      selfCheckExample: {
        prompt: "Glucose is dissolved in water. Name the solute and the solvent, and say which of the two decides that the solution is a liquid.",
        steps: [
          "The component present in the larger amount is water, so water is the solvent.",
          "Glucose is the solute.",
          "The solvent decides the physical state, so the solution is a liquid because water is a liquid.",
        ],
        answer: "Solute: glucose. Solvent: water, which makes it a liquid solution.",
      },
      practiceSet: [
        { prompt: "How many types of binary solution are possible, and why that number?", answer: "Nine: the solute and the solvent can each be a solid, a liquid or a gas, and 3 × 3 = 9" },
        { prompt: "An amalgam of mercury with sodium is which type of solution?", answer: "A solid solution with a liquid solute (mercury) in a solid solvent (sodium)" },
        { prompt: "Give an example of a liquid solution in which the solute is a gas.", answer: "Oxygen dissolved in water" },
      ],
      pyqExampleId: "30c315f5-1c24-4457-af7d-bcb4943b11d0",
      traps: [
        {
          title: "Naming the solute by its state",
          body: "The solvent is the component present in the largest amount, not the one that happens to be a liquid. In an amalgam, the liquid mercury is the solute and the solid metal is the solvent.",
        },
        {
          title: "Leaving out the example",
          body: "A question on types of solutions asks for an example of each type. A list of types without examples is half an answer.",
        },
      ],
    },
  ],
};
