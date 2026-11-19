import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MM_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Laws of Chemical Combination",
  title: "Laws of Chemical Combination",
  oneLineDefinition:
    "Mass is neither made nor lost in a reaction, a compound always holds its elements in the same proportion by weight, and that proportion comes straight from the atomic masses in its formula.",
  whyItMatters:
    "Four questions in the bank, three MODERATE and one HARD. One asks which laws a reaction confirms; the other three are about proportion by weight: the ratio of copper to oxygen in CuO, the compound whose ratio is 3 : 8, and a molecular formula worked back from a ratio and a molecular mass.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mmla-laws",
      name: "The three laws of chemical combination",
      intuition:
        "Atoms are only rearranged in a reaction, never made or destroyed, so the total mass cannot change. And because a compound is always built from the same atoms in the same numbers, its elements are always in the same ratio by weight, wherever the sample came from.",
      definition:
        "- **Law of conservation of mass** (Lavoisier): in a chemical reaction the **total mass of the reactants used** equals the **total mass of the products**.\n" +
        "- **Law of constant proportions** (Proust): a pure compound always contains the **same elements combined in the same proportion by weight**, however it is made.\n" +
        "- **Law of multiple proportions** (Dalton): when two elements form **more than one compound**, the masses of one element that combine with a fixed mass of the other are in a **simple whole-number ratio**.\n" +
        "- Only the reactant that actually **reacts** counts. Any reactant left over is subtracted before you compare masses.",
      table: {
        columns: ["Law", "Given by", "Example"],
        rows: [
          { cells: ["Conservation of mass", "Lavoisier", "12 g of carbon burns completely in 32 g of oxygen to give 44 g of carbon dioxide"] },
          { cells: ["Constant proportions", "Proust", "Pure water from any source has hydrogen and oxygen in the ratio 1 : 8 by weight"] },
          {
            cells: ["Multiple proportions", "Dalton", "With 12 g of carbon, 16 g of oxygen gives CO and 32 g gives CO₂: the oxygen masses are 1 : 2"],
            noteAmber: "Needs two different compounds of the same two elements.",
          },
        ],
        caption: "A single reaction between two substances can show the first two laws, never the third.",
      },
      selfCheckExample: {
        prompt: "In a closed tube, 10 g of calcium carbonate is heated until it all breaks down into 5.6 g of calcium oxide and carbon dioxide gas. What mass of carbon dioxide is formed, and which law did you use?",
        steps: ["Total mass after the reaction equals the mass before it.", "Carbon dioxide = 10 g minus 5.6 g = 4.4 g."],
        answer: "4.4 g, by the law of conservation of mass",
      },
      practiceSet: [
        { prompt: "Who stated the law of conservation of mass?", answer: "Lavoisier" },
        { prompt: "Water from a river and water made in a laboratory both have hydrogen and oxygen in the ratio 1 : 8 by weight. Which law does this show?", answer: "The law of constant proportions" },
        { prompt: "Which law of chemical combination needs two different compounds of the same two elements?", answer: "The law of multiple proportions" },
        { prompt: "3 g of carbon burns completely in 8 g of oxygen and nothing is left over. What mass of carbon dioxide forms?", answer: "11 g" },
      ],
      pyqExampleId: "af39f112-e39a-4f48-a4ee-49a3efdf234d",
      traps: [
        {
          title: "Counting the leftover reactant",
          body: "If some of a reactant is left unreacted, subtract it first. Only the mass that reacted must equal the mass of the product.",
        },
        {
          title: "Finding multiple proportions in one reaction",
          body: "The law of multiple proportions compares two or more compounds of the same two elements, such as CO and CO₂. One reaction making one product cannot show it.",
        },
        {
          title: "Mixing up the scientists",
          body: "Conservation of mass is Lavoisier's law, constant proportions is Proust's, and multiple proportions is Dalton's.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mmla-ratio",
      name: "Proportion by weight from a formula",
      intuition:
        "The formula tells you how many atoms of each element are in one molecule, and the atomic masses tell you how heavy each kind is. Multiply them and you have the weight of each element in one molecule. Their ratio is the proportion by weight, and it is the same in a speck or a sack of the compound.",
      definition:
        "- For each element: **atomic mass × number of atoms** in the formula.\n" +
        "- Write these masses as a ratio and **simplify** it.\n" +
        "- If the options are in the form **x : 1**, divide both numbers by the second one.\n" +
        "- **Working back**: to find which formula fits a given ratio and molecular mass, check each option's molecular mass first, then its mass ratio.",
      formula: {
        label: "Proportion by weight of elements A and B in a compound",
        latex: "\\text{A} : \\text{B} = (\\text{atomic mass of A} \\times n_A) : (\\text{atomic mass of B} \\times n_B)",
        symbols: [
          { symbol: "nA", meaning: "number of atoms of A in one molecule" },
          { symbol: "nB", meaning: "number of atoms of B in one molecule" },
        ],
      },
      authoredExample: {
        prompt: "Find the proportion by weight of nitrogen and hydrogen in ammonia, \\(\\mathrm{NH_3}\\). (N = 14, H = 1)",
        steps: [
          "Nitrogen: one atom, so \\(14 \\times 1 = 14\\).",
          "Hydrogen: three atoms, so \\(1 \\times 3 = 3\\).",
          "N : H = 14 : 3, which cannot be simplified further.",
        ],
        answer: "14 : 3",
      },
      selfCheckExample: {
        prompt: "Find the proportion by weight of sulphur and oxygen in sulphur trioxide, \\(\\mathrm{SO_3}\\). (S = 32, O = 16)",
        steps: ["S : O \\(= 32 : 3 \\times 16 = 32 : 48\\).", "Divide both by 16: 2 : 3."],
        answer: "2 : 3",
      },
      practiceSet: [
        { prompt: "Find the proportion by weight of hydrogen and oxygen in water, \\(\\mathrm{H_2O}\\). (H = 1, O = 16)", answer: "2 : 16 = 1 : 8" },
        { prompt: "Find the proportion by weight of iron and sulphur in iron sulphide, FeS. (Fe = 56, S = 32)", answer: "56 : 32 = 7 : 4" },
        { prompt: "Write the proportion by weight of calcium to oxygen in calcium oxide, CaO, in the form x : 1. (Ca = 40, O = 16)", answer: "\\(\\frac{40}{16} = 2.5\\), so 2.5 : 1" },
        { prompt: "A compound of carbon and hydrogen has C : H = 3 : 1 by weight and molecular mass 16. What is its formula? (C = 12, H = 1)", answer: "\\(\\mathrm{CH_4}\\): 12 : 4 = 3 : 1, and 12 + 4 = 16" },
      ],
      pyqExampleId: "cbca09ed-bff5-4889-94ea-e984e58a559f",
      traps: [
        {
          title: "Using the number of atoms instead of their mass",
          body: "Proportion by weight uses masses. Ammonia has 1 N atom to 3 H atoms, but by weight it is 14 : 3, not 1 : 3.",
        },
        {
          title: "Forgetting to multiply by the number of atoms",
          body: "In \\(\\mathrm{SO_3}\\) oxygen weighs \\(3 \\times 16 = 48\\), not 16. Leaving out the 3 gives 2 : 1 instead of 2 : 3.",
        },
        {
          title: "Stopping at a ratio that fits but a mass that does not",
          body: "When working back to a formula, several formulas can share one ratio (CH and \\(\\mathrm{C_2H_2}\\) both have C : H = 12 : 1). The molecular mass decides which one it is.",
        },
      ],
    },
  ],
};
