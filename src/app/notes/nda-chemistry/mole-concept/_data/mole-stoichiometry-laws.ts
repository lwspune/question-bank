import type { SubtopicNote } from "@/app/notes/_types";

export const MOLE_STOICHIOMETRY_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Stoichiometry and Laws of Chemical Combination",
  title: "Stoichiometry and the Laws of Chemical Combination",
  oneLineDefinition:
    "A balanced equation is a recipe in moles: its coefficients give the ratio in which substances react and form, while the named laws (conservation of mass, definite and multiple proportions) state why those ratios are fixed.",
  whyItMatters:
    "Four PYQs here, split two ways: a couple of calculation questions (mass of CO2 from 1 kg of carbon, equivalent weight of oxalic acid) and a couple of name-the-law questions (which law a given reaction or statement illustrates). " +
    "The calculation half rests on the mole bridges from the previous subtopic; the name-the-law half is pure recall of one short table — so this subtopic mixes one formula technique with one reference table.",
  concepts: [
    // mole ratios from a balanced equation
    {
      kind: "formula" as const,
      slug: "mole-ratios-from-equation",
      name: "Mole ratios from a balanced equation",
      intuition:
        "The big coefficients in a balanced equation are a ratio of moles, not of grams. " +
        "So the recipe is always the same: turn the known mass into moles, scale by the coefficient ratio to get moles of the product, then turn those moles back into grams.",
      definition:
        "Stoichiometry in three steps:\n" +
        "- Balance the equation; the coefficients are the **mole ratio** of reactants to products.\n" +
        "- For \\(\\text{C} + \\text{O}_2 \\to \\text{CO}_2\\) the ratio C : \\(\\text{CO}_2\\) is **1 : 1**, so 1 mole of carbon makes 1 mole of \\(\\text{CO}_2\\).\n" +
        "- Mass of product \\(= (\\text{moles of known}) \\times (\\text{ratio}) \\times (\\text{molar mass of product})\\).\n" +
        "- Always go through moles — a gram-to-gram shortcut only works by accident.",
      formula: {
        label: "Mass of product from mass of reactant",
        latex: "m_{\\text{product}} = \\dfrac{m_{\\text{reactant}}}{M_{\\text{reactant}}}\\times \\text{(mole ratio)} \\times M_{\\text{product}}",
      },
      pyqExampleId: "5d2c8321-0105-4cb7-8673-f76074dbe5d0", // 1 kg C -> 11/3 kg CO2
      authoredExample: {
        prompt:
          "How much CO2 is produced on burning 1 kg of carbon? C + O2 -> CO2 (C = 12, CO2 = 44).",
        steps: [
          "Moles of carbon \\(= 1000/12\\) mol (1 kg = 1000 g).",
          "Ratio C : \\(\\text{CO}_2\\) is 1 : 1, so moles of \\(\\text{CO}_2 = 1000/12\\) mol.",
          "Mass of \\(\\text{CO}_2 = (1000/12) \\times 44 = 44000/12 = 11000/3\\) g \\(= 11/3\\) kg.",
        ],
        answer: "\\(\\dfrac{11}{3}\\) kg of \\(\\text{CO}_2\\) (about 3.67 kg).",
      },
      selfCheckExample: {
        prompt:
          "How many grams of water form when 4 g of hydrogen burns completely? 2H2 + O2 -> 2H2O (H2 = 2, H2O = 18).",
        steps: [
          "Moles of \\(\\text{H}_2 = 4/2 = 2\\) mol.",
          "Ratio \\(\\text{H}_2 : \\text{H}_2\\text{O}\\) is 2 : 2 = 1 : 1, so moles of water \\(= 2\\) mol.",
          "Mass of water \\(= 2 \\times 18 = 36\\) g.",
        ],
        answer: "36 g of water.",
      },
      practiceSet: [
        { prompt: "In C + O2 -> CO2, how many moles of CO2 come from 1 mole of carbon?", answer: "1 mole" },
        { prompt: "Mass of CO2 from 12 g (1 mol) of carbon?", answer: "44 g", method: "1 mol C -> 1 mol CO2 = 44 g" },
        { prompt: "In 2H2 + O2 -> 2H2O, moles of water from 1 mole of O2?", answer: "2 moles" },
      ],
      traps: [
        {
          title: "Coefficients are moles, not grams",
          body:
            "The 1 : 1 in \\(\\text{C} + \\text{O}_2 \\to \\text{CO}_2\\) means 1 **mole** carbon gives 1 **mole** \\(\\text{CO}_2\\) — but 12 g of carbon gives 44 g of \\(\\text{CO}_2\\), because their molar masses differ. Never assume equal masses.",
        },
      ],
    },

    // equivalent weight and n-factor
    {
      kind: "formula" as const,
      slug: "equivalent-weight",
      name: "Equivalent weight and n-factor",
      intuition:
        "Equivalent weight is the molar mass scaled down by how many reactive units the substance contributes per molecule — for an acid, how many replaceable hydrogen ions it has. " +
        "Find the molar mass, find the n-factor, divide.",
      definition:
        "The equivalent-weight rule:\n" +
        "- **Equivalent weight** \\(= \\dfrac{\\text{molar mass}}{n\\text{-factor}}\\).\n" +
        "- For an **acid**, the n-factor is its **basicity** — the number of replaceable \\(\\text{H}^+\\) ions (1 for HCl, 2 for \\(\\text{H}_2\\text{SO}_4\\), 2 for oxalic acid).\n" +
        "- For a **base**, the n-factor is its **acidity** — the number of \\(\\text{OH}^-\\) ions.\n" +
        "- Oxalic acid dihydrate \\(\\text{C}_2\\text{H}_2\\text{O}_4 \\cdot 2\\text{H}_2\\text{O}\\) has molar mass 126 and is dibasic, so equivalent weight \\(= 126/2 = 63\\).",
      formula: {
        label: "Equivalent weight",
        latex: "E = \\dfrac{M}{n\\text{-factor}}",
        symbols: [
          { symbol: "E", meaning: "equivalent weight" },
          { symbol: "M", meaning: "molar mass" },
          { symbol: "n\\text{-factor}", meaning: "replaceable H+ (acid) or OH- (base) per molecule" },
        ],
      },
      pyqExampleId: "6ba46ed2-9561-4bb2-9849-ab894c7769be", // eq wt of oxalic acid dihydrate = 63
      authoredExample: {
        prompt: "Find the equivalent weight of sulphuric acid, H2SO4. (M = 98)",
        steps: [
          "\\(\\text{H}_2\\text{SO}_4\\) has two replaceable \\(\\text{H}^+\\) ions, so n-factor = 2 (dibasic).",
          "Equivalent weight \\(= M/n = 98/2\\).",
        ],
        answer: "49.",
      },
      selfCheckExample: {
        prompt: "Find the equivalent weight of oxalic acid dihydrate, C2H2O4.2H2O.",
        steps: [
          "Molar mass \\(= 2(12) + 2(1) + 4(16) + 2(18) = 24 + 2 + 64 + 36 = 126\\) g/mol.",
          "Oxalic acid is dibasic, so n-factor = 2.",
          "Equivalent weight \\(= 126/2\\).",
        ],
        answer: "63.",
      },
      practiceSet: [
        { prompt: "Equivalent weight of HCl (M = 36.5, monobasic)?", answer: "36.5", method: "n-factor = 1" },
        { prompt: "n-factor of oxalic acid?", answer: "2", method: "it is dibasic (two replaceable H+)" },
        { prompt: "Equivalent weight of NaOH (M = 40, monoacidic base)?", answer: "40" },
      ],
      traps: [
        {
          title: "Include the water of crystallisation in the molar mass",
          body:
            "Oxalic acid dihydrate is \\(\\text{C}_2\\text{H}_2\\text{O}_4 \\cdot 2\\text{H}_2\\text{O}\\) with molar mass **126**, not 90 (the anhydrous value). Forgetting the \\(2\\text{H}_2\\text{O}\\) gives the wrong equivalent weight (45 instead of 63).",
        },
      ],
    },

    // laws of chemical combination — reference table
    {
      kind: "reference" as const,
      slug: "laws-of-chemical-combination",
      name: "Laws of chemical combination",
      intuition:
        "These are the named rules the bank asks you to recognise from a one-line description or a worked example. " +
        "Learn the name, its one-line statement, and a stock example of each.",
      definition:
        "Five named laws govern how elements combine. Each is tested by either a definition or a 'which law is shown' example:\n" +
        "- **Conservation of mass** — the most-asked: total mass of reactants equals total mass of products.\n" +
        "- **Definite (constant) proportions** — a pure compound always has the same elements in the same fixed mass ratio.\n" +
        "- **Multiple proportions** — when two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in small whole-number ratios.",
      table: {
        columns: ["Law", "Statement", "Stock example"],
        rows: [
          {
            cells: [
              "Law of conservation of mass",
              "Matter can neither be created nor destroyed in a chemical reaction; total mass of reactants = total mass of products.",
              "1.7 g AgNO3 + 0.585 g NaCl produce 1.435 g AgCl + 0.85 g NaNO3 (masses balance both sides).",
            ],
            noteAmber:
              "By far the most-asked law in this chapter; any reaction where the two sides' masses add up to the same total is illustrating this law.",
            pyqExampleId: "2b99b67d-24af-4ee9-bd9e-e61a91101ef5",
          },
          {
            cells: [
              "Law of definite (constant) proportions",
              "A given pure compound always contains the same elements in the same fixed proportion by mass.",
              "Water is always 1 : 8 hydrogen to oxygen by mass, whatever its source.",
            ],
          },
          {
            cells: [
              "Law of multiple proportions",
              "If two elements form more than one compound, the masses of one combining with a fixed mass of the other are in a ratio of small whole numbers.",
              "Carbon + oxygen: CO and CO2 — the oxygen masses per fixed carbon are in a 1 : 2 ratio.",
            ],
          },
          {
            cells: [
              "Avogadro's law",
              "Equal volumes of all gases at the same temperature and pressure contain an equal number of molecules.",
              "22.4 L of any gas at STP contains one mole (6.022 x 10^23 molecules).",
            ],
            noteAmber: "Also the basis for the 22.4 L molar volume used in the previous subtopic.",
          },
        ],
        caption: "Recognise the law from either its definition or a worked mass-balance example.",
      },
      pyqExampleId: "36a2ca3d-3045-4030-9232-7997aa222ce1", // AgNO3 + NaCl mass balance -> conservation of mass
      selfCheckExample: {
        prompt:
          "When 1.7 g of silver nitrate reacts with 0.585 g of sodium chloride to give 1.435 g of silver chloride and 0.85 g of sodium nitrate, which law of chemical combination is illustrated?",
        steps: [
          "Total reactant mass \\(= 1.7 + 0.585 = 2.285\\) g.",
          "Total product mass \\(= 1.435 + 0.85 = 2.285\\) g.",
          "The two totals are equal — mass is conserved.",
        ],
        answer: "Law of conservation of mass.",
      },
      practiceSet: [
        { prompt: "Which law states matter can neither be created nor destroyed?", answer: "Law of conservation of mass" },
        { prompt: "Which law says a pure compound always has the same fixed mass ratio of elements?", answer: "Law of definite (constant) proportions" },
        { prompt: "CO and CO2 (oxygen masses in a 1 : 2 ratio per fixed carbon) illustrate which law?", answer: "Law of multiple proportions" },
        { prompt: "Which law underlies the 22.4 L molar volume of a gas at STP?", answer: "Avogadro's law" },
      ],
      traps: [
        {
          title: "Mass balancing means conservation of mass, not definite proportions",
          body:
            "When a question gives reactant and product masses that add to the same total, the law shown is **conservation of mass**. Definite proportions is about one compound's fixed internal ratio, not about both sides of a reaction balancing.",
        },
        {
          title: "Definite vs multiple proportions",
          body:
            "**Definite** proportions = one compound, one fixed ratio. **Multiple** proportions = two different compounds of the same two elements, ratios in small whole numbers. The give-away for multiple proportions is two compounds being compared (CO vs CO2).",
        },
      ],
    },
  ],
};
