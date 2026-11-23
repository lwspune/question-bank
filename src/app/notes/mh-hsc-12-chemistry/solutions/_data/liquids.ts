import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_LIQUIDS_NOTE: SubtopicNote = {
  subtopicName: "Vapour Pressure of Solutions of Liquids in Liquids",
  title: "Two Volatile Liquids: Raoult's Law, Ideal and Nonideal Solutions",
  oneLineDefinition:
    "How Raoult's law and Dalton's law give the vapour pressure and the vapour composition of a mixture of two volatile liquids, and how ideal and nonideal solutions differ.",
  whyItMatters:
    "4 questions. Two were set in board papers: state Henry's law and write four conditions for an ideal solution (2024), and find the partial pressures of benzene and toluene in a mixture given by mass (2025). The textbook adds finding the composition of both the liquid and the vapour from the total vapour pressure.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccso-raoult-volatile",
      name: "Raoult's law and Dalton's law for two volatile liquids",
      intuition:
        "When both liquids can evaporate, both send molecules into the vapour. Each liquid's share of the vapour pressure is its own pure vapour pressure scaled down by how much of the mixture it makes up. Add the two shares and you have the total vapour pressure.",
      definition:
        "- **Raoult's law:** the partial vapour pressure of any volatile component of a solution is equal to the vapour pressure of the pure component multiplied by its mole fraction in the solution: \\(P_1 = x_1P_1^0\\) and \\(P_2 = x_2P_2^0\\).\n" +
        "- **Dalton's law of partial pressures:** the total vapour pressure is \\(P = P_1 + P_2 = P_1^0x_1 + P_2^0x_2\\).\n" +
        "- Since \\(x_1 = 1 - x_2\\): \\(P = (P_2^0 - P_1^0)x_2 + P_1^0\\). A plot of \\(P\\) against \\(x_2\\) is a straight line from \\(P_1^0\\) at \\(x_2 = 0\\) to \\(P_2^0\\) at \\(x_2 = 1\\) (Fig. 2.2).\n" +
        "- **Composition of the vapour:** if \\(y_1\\) and \\(y_2\\) are the mole fractions in the vapour, \\(P_1 = y_1P\\) and \\(P_2 = y_2P\\), so \\(y_1 = \\dfrac{P_1^0x_1}{P}\\).\n" +
        "- When the mixture is given by mass, convert each mass to moles first, then find the mole fractions.",
      formula: {
        label: "Raoult's law with Dalton's law",
        latex: "P_1 = x_1P_1^0,\\quad P_2 = x_2P_2^0,\\quad P = (P_2^0 - P_1^0)x_2 + P_1^0,\\quad y_1 = \\frac{P_1}{P}",
      },
      authoredExample: {
        prompt:
          "Liquids A and B form an ideal solution. At 300 K the vapour pressure of pure A is 200 mm Hg and that of pure B is 500 mm Hg. For a solution in which the mole fraction of B is 0.4, find the total vapour pressure and the mole fraction of A in the vapour.",
        steps: [
          "Given: \\(P_A^0 = 200\\) mm Hg, \\(P_B^0 = 500\\) mm Hg, \\(x_B = 0.4\\), so \\(x_A = 1 - 0.4 = 0.6\\).",
          "Partial pressures: \\(P_A = x_AP_A^0 = 0.6 \\times 200 = 120\\) mm Hg; \\(P_B = x_BP_B^0 = 0.4 \\times 500 = 200\\) mm Hg.",
          "Total (Dalton's law): \\(P = 120 + 200 = 320\\) mm Hg.",
          "Vapour: \\(y_A = \\dfrac{P_A}{P} = \\dfrac{120}{320} = 0.375\\), and \\(y_B = 1 - 0.375 = 0.625\\).",
        ],
        answer: "Total vapour pressure 320 mm Hg; mole fraction of A in the vapour 0.375",
      },
      selfCheckExample: {
        prompt:
          "Pure liquids X and Y have vapour pressures of 300 mm Hg and 600 mm Hg at a certain temperature. An ideal solution of the two has a total vapour pressure of 420 mm Hg. Find the mole fraction of Y in the liquid.",
        steps: [
          "\\(P = (P_Y^0 - P_X^0)x_Y + P_X^0\\), so \\(420 = (600 - 300)x_Y + 300\\).",
          "\\(300x_Y = 120\\), so \\(x_Y = 0.4\\).",
        ],
        answer: "Mole fraction of Y = 0.4",
      },
      practiceSet: [
        { prompt: "In Fig. 2.2, what is the total vapour pressure when the mole fraction of component 2 is zero?", answer: "\\(P_1^0\\), the vapour pressure of pure component 1" },
        { prompt: "32 g of methanol (molar mass 32 g mol⁻¹) is mixed with 36 g of water (molar mass 18 g mol⁻¹). Find the mole fraction of methanol.", answer: "\\(1/(1 + 2) = 0.333\\)" },
        { prompt: "Which law gives the total vapour pressure as the sum of the partial pressures?", answer: "Dalton's law of partial pressures" },
        { prompt: "In an ideal solution of two liquids, the mole fraction of A in the liquid is 0.3. What is the mole fraction of B in the liquid?", answer: "0.7" },
      ],
      pyqExampleId: "568ea38b-1cd8-4344-99c2-f2e5dadedabd",
      traps: [
        {
          title: "Using mass percentages as mole fractions",
          body: "A mixture given as a percentage by mass must be turned into moles before Raoult's law is used. Take 100 g of the mixture, divide each mass by its molar mass, then find the mole fractions.",
        },
        {
          title: "Mixing up x and y",
          body: "\\(x\\) is a mole fraction in the liquid; \\(y\\) is a mole fraction in the vapour. Raoult's law uses \\(x\\); the vapour composition comes from \\(y_1 = P_1/P\\).",
        },
        {
          title: "Stopping at the partial pressures",
          body: "If the question asks for the total pressure too, add the partial pressures (Dalton's law) and give the total with its unit.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccso-ideal-nonideal",
      name: "Ideal and nonideal solutions",
      intuition:
        "If molecules of A and B pull on each other just as A pulls on A and B on B, mixing changes nothing: no heat, no change in volume, and Raoult's law holds exactly. If the unlike pull is weaker, molecules escape more easily and the vapour pressure is higher than Raoult's law says; if it is stronger, they escape less and it is lower.",
      definition:
        "- **Ideal solution, condition 1:** it obeys Raoult's law over the entire range of concentrations.\n" +
        "- **Condition 2:** no heat is evolved or absorbed on mixing: \\(\\Delta_{\\text{mix}}H = 0\\).\n" +
        "- **Condition 3:** there is no volume change on mixing: \\(\\Delta_{\\text{mix}}V = 0\\).\n" +
        "- **Condition 4:** solvent-solute, solute-solute and solvent-solvent interactions are comparable.\n" +
        "- **Condition 5:** its vapour pressure always lies between the vapour pressures of the pure components.\n" +
        "- Perfectly ideal solutions are uncommon; benzene with toluene behaves nearly ideal.\n" +
        "- A **nonideal solution** does not obey Raoult's law over the entire range of concentrations, and shows a positive or a negative deviation.",
      table: {
        columns: ["Type", "Attractions between unlike molecules", "Vapour pressure", "Examples"],
        rows: [
          {
            cells: ["Ideal", "Comparable with those between like molecules", "As Raoult's law predicts; between those of the pure components", "Benzene and toluene (nearly ideal)"],
            pyqExampleId: "5d224540-8318-4be8-b761-f36792253c5c",
            noteAmber: "Board 2024 asked for four conditions of an ideal solution, together with Henry's law.",
          },
          { cells: ["Positive deviation", "Weaker than solute-solute and solvent-solvent attractions", "Higher than Raoult's law predicts (Fig. 2.3)", "Ethanol and acetone; carbon disulphide and acetone"] },
          { cells: ["Negative deviation", "Stronger than solute-solute and solvent-solvent attractions", "Lower than Raoult's law predicts (Fig. 2.4)", "Phenol and aniline; chloroform and acetone"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the enthalpy of mixing for an ideal solution?", answer: "Zero, \\(\\Delta_{\\text{mix}}H = 0\\)" },
        { prompt: "Name one pair of liquids that shows a positive deviation from Raoult's law.", answer: "Ethanol and acetone (or carbon disulphide and acetone)" },
        { prompt: "In a solution, attractions between unlike molecules are stronger than between like molecules. Which deviation does it show?", answer: "A negative deviation from Raoult's law" },
      ],
      pyqExampleId: "5d224540-8318-4be8-b761-f36792253c5c",
      traps: [
        {
          title: "Four conditions that are really one",
          body: "For four marks give four different conditions: Raoult's law obeyed over the entire range, \\(\\Delta_{\\text{mix}}H = 0\\), \\(\\Delta_{\\text{mix}}V = 0\\), and comparable interactions between all the molecules.",
        },
        {
          title: "Swapping the two deviations",
          body: "Positive deviation: weaker unlike attractions, vapour pressure higher than Raoult's law predicts. Negative deviation: stronger unlike attractions, vapour pressure lower.",
        },
      ],
    },
  ],
};
