import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_IC_FERTILIZERS_NOTE: SubtopicNote = {
  subtopicName: "Fertilizers",
  title: "Fertilizers",
  oneLineDefinition:
    "What fertilizers supply (nitrogen, phosphorus, potassium), which compounds are nitrogen fertilizers, and how too much nitrate poisons groundwater.",
  whyItMatters:
    "Three CDS questions, from 2016, 2021 and 2025. Each is one fact: which nutrient fertilizers do not carry, which compound is not a nitrogen fertilizer, and which fertilizer pollutes groundwater.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschic-npk",
      name: "What fertilizers supply",
      intuition:
        "Crops take three nutrients from the soil in large amounts: nitrogen, phosphorus and potassium. Fertilizers are made to put these back. Plants cannot use nitrogen gas from the air, so a nitrogen fertilizer must carry it as ammonium, nitrate or urea.",
      definition:
        "The facts:\n" +
        "- Fertilizers supply the major nutrients **N, P and K**.\n" +
        "- **Nitrogen fertilizers**: **urea** (NH₂)₂CO (46% N), **ammonium sulphate** (NH₄)₂SO₄, **ammonium nitrate** NH₄NO₃, calcium ammonium nitrate.\n" +
        "- **Nitrogen gas, N₂**, is **not** a fertilizer: most plants cannot use it until it is fixed by bacteria or by industry.\n" +
        "- Phosphorus: **superphosphate**. Potassium: **muriate of potash** (KCl).\n" +
        "- **Micronutrients** such as **iron**, zinc and boron are **not usually** in fertilizers; they come from manure and the soil.",
      table: {
        columns: ["Nutrient", "Fertilizer"],
        rows: [
          {
            cells: ["Nitrogen", "Urea, ammonium sulphate, ammonium nitrate"],
            noteAmber: "CDS 2025 (II): N₂ is the one that is not a nitrogen fertilizer.",
            pyqExampleId: "d8e0dbc8-0d4c-4457-b3e4-497216175e5d",
          },
          { cells: ["Phosphorus", "Superphosphate"] },
          { cells: ["Potassium", "Muriate of potash (KCl)"] },
          {
            cells: ["Iron (micronutrient)", "Not usually in fertilizers"],
            pyqExampleId: "37ac3694-f8c6-4df4-80be-9250ecf489d8",
          },
        ],
      },
      pyqExampleId: "d8e0dbc8-0d4c-4457-b3e4-497216175e5d",
      practiceSet: [
        { prompt: "What is the chemical formula of urea?", answer: "(NH₂)₂CO" },
        { prompt: "Which three nutrients do fertilizers mainly supply?", answer: "Nitrogen, phosphorus and potassium" },
        { prompt: "About what percentage of nitrogen does urea contain?", answer: "About 46%" },
      ],
      traps: [
        {
          title: "Nitrogen gas is not a fertilizer",
          body: "N₂ is the form plants **cannot** use. Urea, ammonium sulphate and ammonium nitrate carry nitrogen in a form they can.",
        },
        {
          title: "Iron is not an NPK nutrient",
          body: "Fertilizers are built around **nitrogen, phosphorus and potassium**. Iron is a micronutrient and is usually not in them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschic-nitrate-pollution",
      name: "Nitrate pollution of groundwater",
      intuition:
        "Nitrate dissolves easily and is not held by soil, so excess nitrogen fertilizer washes down into groundwater. Phosphate and potassium cling to soil particles and move far less.",
      definition:
        "The effect:\n" +
        "- Excess **nitrogen** fertilizer → **nitrate** leaches into **groundwater**.\n" +
        "- Nitrate in drinking water causes **methaemoglobinaemia** (**blue baby syndrome**) in infants.\n" +
        "- Run-off of fertilizer into lakes also feeds algal growth (**eutrophication**).",
      table: {
        columns: ["Fertilizer", "Moves into groundwater?", "Harm"],
        rows: [
          {
            cells: ["Nitrogen (as nitrate)", "Yes — very soluble", "Blue baby syndrome"],
            pyqExampleId: "eed83c35-7ce9-4fb8-8a2f-b1340b95c1b4",
          },
          { cells: ["Phosphate", "Little — held by soil", "Eutrophication in lakes via run-off"] },
          { cells: ["Potassium", "Little — held by soil", "Rarely a problem"] },
        ],
      },
      pyqExampleId: "eed83c35-7ce9-4fb8-8a2f-b1340b95c1b4",
      practiceSet: [
        { prompt: "Which disease is caused by nitrate in drinking water?", answer: "Blue baby syndrome (methaemoglobinaemia)" },
        { prompt: "What is eutrophication?", answer: "Overgrowth of algae in water fed by fertilizer run-off" },
      ],
      traps: [
        {
          title: "Nitrate, not phosphate, reaches groundwater",
          body: "Nitrate is highly soluble and leaches down. Phosphate and potassium are held by soil, so the groundwater toxin is the **nitrate** from nitrogen fertilizer.",
        },
      ],
    },
  ],
};
