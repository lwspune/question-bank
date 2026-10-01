import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MO_STOICH_NOTE: SubtopicNote = {
  subtopicName: "Stoichiometry and Laws of Chemical Combination",
  title: "Balancing Equations and Reacting Amounts",
  oneLineDefinition:
    "Balancing a chemical equation by counting atoms, then reading it as a mole ratio to find how much reacts, how much forms, and which reactant runs out first.",
  whyItMatters:
    "Five CDS questions, three of them from the 2018 papers. Two ask for a balanced equation; three use a balanced equation's mole ratio, one of them HARD (which fuel gives the most hydrogen per gram).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschmo-balancing",
      name: "Balancing a chemical equation",
      intuition:
        "Atoms are neither made nor destroyed in a reaction (conservation of mass), so every element must have the same number of atoms on both sides. Balance by changing the numbers in front of formulas, never the subscripts inside them.",
      definition:
        "The method:\n" +
        "- Write the skeleton equation with correct formulas.\n" +
        "- Balance the element in the **most complex formula** first, then the others; leave H and O (or free elements) for last.\n" +
        "- Change only the **coefficients**, never the subscripts.\n" +
        "- Check every element at the end.",
      formula: {
        label: "Conservation of atoms",
        latex: "\\sum \\text{atoms of each element (reactants)} = \\sum \\text{atoms of that element (products)}",
      },
      authoredExample: {
        prompt: "Balance: Al + O₂ → Al₂O₃.",
        steps: [
          "Oxygen: 2 on the left, 3 on the right. The lowest common multiple is 6, so write 3O₂ and 2Al₂O₃.",
          "Aluminium: now 4 on the right, so write 4Al.",
          "Check: Al 4 = 4, O 6 = 6.",
        ],
        answer: "4Al + 3O₂ → 2Al₂O₃.",
      },
      selfCheckExample: {
        prompt: "Balance the combustion of propane: C₃H₈ + O₂ → CO₂ + H₂O.",
        steps: [
          "Carbon: 3 on the left, so 3CO₂.",
          "Hydrogen: 8 on the left, so 4H₂O.",
          "Oxygen on the right = 3 × 2 + 4 = 10, so 5O₂.",
        ],
        answer: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.",
      },
      pyqExampleId: "45cf974d-fa75-477e-acb2-42088e910f2a",
      practiceSet: [
        { prompt: "Balance: H₂ + O₂ → H₂O.", answer: "2H₂ + O₂ → 2H₂O" },
        { prompt: "Balance: N₂ + H₂ → NH₃.", answer: "N₂ + 3H₂ → 2NH₃" },
        { prompt: "When balancing, may you change a subscript such as the 2 in H₂O?", answer: "No — only the coefficients" },
      ],
      traps: [
        {
          title: "Re-check the first element after fixing the second",
          body: "In Fe + Cl₂ → FeCl₃, fixing chlorine to 3Cl₂ → 2FeCl₃ puts 2 Fe on the right, so the iron must go back to **2Fe**: 2Fe + 3Cl₂ → 2FeCl₃.",
        },
        {
          title: "Never change a subscript",
          body: "Changing H₂O to H₂O₂ to balance oxygen makes a different substance (hydrogen peroxide). Only the numbers in front of formulas may change.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschmo-mole-ratio",
      name: "Mole ratios and the limiting reactant",
      intuition:
        "A balanced equation is a recipe in moles. Its coefficients tell you how many moles react and form. If you have more of one reactant than the recipe needs, the other one runs out first and decides how much product you get.",
      definition:
        "The steps:\n" +
        "- Read the coefficients as **mole ratios**.\n" +
        "- For each reactant, work out how much it **needs** of the other. The one that runs out is the **limiting reactant**; it fixes the amount of product.\n" +
        "- To compare yields **per gram**, divide moles of product by the mass of reactant used.",
      formula: {
        label: "Mole ratio from coefficients",
        latex: "aA + bB \\rightarrow cC: \\qquad n_C = \\frac{c}{a}\\, n_A",
      },
      authoredExample: {
        prompt: "In N₂ + 3H₂ → 2NH₃, 2 mol of N₂ is mixed with 3 mol of H₂. Which is limiting, and how much NH₃ forms?",
        steps: [
          "2 mol of N₂ would need 2 × 3 = 6 mol of H₂. Only 3 mol is present, so H₂ is limiting.",
          "3 mol of H₂ uses 1 mol of N₂ and gives \\(\\frac{2}{3} \\times 3 = 2\\) mol of NH₃.",
        ],
        answer: "H₂ is limiting; 2 mol of NH₃ forms.",
      },
      selfCheckExample: {
        prompt: "How many moles of oxygen are needed to burn 1 mol of methane completely? (CH₄ + 2O₂ → CO₂ + 2H₂O)",
        steps: [
          "The equation shows 2 mol of O₂ per 1 mol of CH₄.",
        ],
        answer: "2 mol of O₂.",
      },
      pyqExampleId: "4d46136a-90fc-4147-8615-79058a2f5b56",
      practiceSet: [
        { prompt: "In 2H₂ + O₂ → 2H₂O, how many moles of water form from 2 mol of H₂ with excess oxygen?", answer: "2 mol" },
        { prompt: "What is the reactant that runs out first called?", answer: "The limiting reactant" },
        { prompt: "In N₂ + 3H₂ → 2NH₃, how many moles of H₂ react with 1 mol of N₂?", answer: "3 mol" },
      ],
      traps: [
        {
          title: "The reactant in excess does not set the yield",
          body: "In CH₄ + ½O₂ → CO + 2H₂ with 3 mol CH₄ and 1 mol O₂, the methane would need 1.5 mol O₂, so **oxygen** is limiting: 1 mol O₂ reacts with 2 mol CH₄ and gives 2 mol CO.",
        },
        {
          title: "Mass is conserved, moles need not be",
          body: "In 2H₂ + O₂ → 2H₂O, three moles of gas give two moles of water, yet the mass on both sides is the same (36 g). Conservation applies to mass and atoms, not to the number of moles.",
        },
        {
          title: "Per gram means divide by mass",
          body: "To find which reaction gives the most product per gram, divide the moles of product by the reactant's molar mass. A larger coefficient does not mean more per gram if the reactant is heavy.",
        },
      ],
    },
  ],
};
