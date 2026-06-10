import type { SubtopicNote } from "@/app/notes/_types";

export const COMMON_COMPOUNDS_NOTE: SubtopicNote = {
  subtopicName: "Common Carbon Compounds and Pigments",
  title: "Common Carbon Compounds and Pigments",
  oneLineDefinition:
    "The everyday names, formulas and uses of carbonate and bicarbonate compounds, their waters of crystallization, and the pigments used in paints.",
  whyItMatters:
    "Ten PYQs of name↔formula↔use recall — washing soda, baking soda, dry ice, chalk — plus the water-of-crystallization counts and a 'which is not a pigment' trap. " +
    "This is a memorise-the-table subtopic; the only catch is the hydration numbers.",
  concepts: [
    // named compounds: name <-> formula <-> use (reference)
    {
      kind: "reference" as const,
      slug: "named-compounds-formulas",
      name: "Common names, formulas and uses",
      intuition:
        "The bank keeps a short list of household carbon compounds and asks the formula, the common name, or the use — any of the three columns. Learn all three for each.",
      definition:
        "The high-frequency name↔formula↔use facts:\n" +
        "- **Washing soda** = **Na₂CO₃·10H₂O** (sodium carbonate decahydrate).\n" +
        "- **Baking soda** = **NaHCO₃** (sodium bicarbonate).\n" +
        "- **Dry ice** = **solid CO₂** (sublimes directly to gas; used as a refrigerant).\n" +
        "- **Chalk and marble** = **CaCO₃** (calcium carbonate).\n" +
        "- **Vinegar** = **acetic acid** (ethanoic acid, a dilute solution).\n" +
        "- **Silica gel** = a **desiccant** (drying agent that absorbs moisture).",
      table: {
        columns: ["Common name", "Chemical name / formula", "Use or identity"],
        rows: [
          { cells: ["Washing soda", "Na₂CO₃·10H₂O", "Cleaning, water softening"] },
          { cells: ["Baking soda", "NaHCO₃", "Baking, antacid"] },
          {
            cells: ["Dry ice", "Solid CO₂", "Refrigerant — sublimes, no liquid"],
            noteAmber: "Dry ice is solid carbon dioxide, NOT frozen water.",
          },
          { cells: ["Chalk / Marble", "CaCO₃", "Building, blackboard chalk"] },
          { cells: ["Vinegar", "Acetic (ethanoic) acid", "Food preservative, flavouring"] },
          { cells: ["Silica gel", "SiO₂ (hydrated)", "Desiccant — absorbs moisture"] },
        ],
      },
      pyqExampleId: "c757c40a-0747-44fc-b5f3-78f64e1c2f9c", // washing soda formula
      practiceSet: [
        { prompt: "Chemical formula of washing soda?", answer: "Na₂CO₃·10H₂O" },
        { prompt: "Dry ice (in solid form) is which compound?", answer: "CO₂ (solid carbon dioxide)" },
        { prompt: "Chalk and marble are different forms of which compound?", answer: "Calcium carbonate (CaCO₃)" },
        { prompt: "Vinegar is also known as?", answer: "Ethanoic (acetic) acid" },
        { prompt: "Best example of a desiccant?", answer: "Silica gel" },
      ],
      traps: [
        {
          title: "Dry ice is CO₂, not ice",
          body:
            "'Dry ice' is solid **carbon dioxide**, not frozen water. It sublimes (solid → gas) with no liquid stage, which is why it is 'dry'.",
        },
      ],
    },

    // water of crystallization (reference)
    {
      kind: "reference" as const,
      slug: "water-of-crystallization",
      name: "Water of crystallization",
      intuition:
        "Water of crystallization is the fixed number of water molecules locked into a crystal's structure, written after a dot in the formula. The bank asks for the count for a few specific salts — memorise the numbers.",
      definition:
        "The hydration numbers the bank tests:\n" +
        "- **Blue vitriol** (copper sulphate) = **CuSO₄·5H₂O** → **5**.\n" +
        "- **Washing soda** (sodium carbonate) = **Na₂CO₃·10H₂O** → **10**.\n" +
        "- **Gypsum** (calcium sulphate) = **CaSO₄·2H₂O** → **2**.\n" +
        "- **Plaster of Paris** = **(CaSO₄)₂·H₂O** (i.e. CaSO₄·½H₂O) → **one** water shared between **two** formula units of CaSO₄.",
      table: {
        columns: ["Salt", "Formula", "Water molecules"],
        rows: [
          { cells: ["Blue vitriol (copper sulphate)", "CuSO₄·5H₂O", "5"] },
          { cells: ["Washing soda", "Na₂CO₃·10H₂O", "10"] },
          { cells: ["Gypsum", "CaSO₄·2H₂O", "2"] },
          {
            cells: ["Plaster of Paris", "(CaSO₄)₂·H₂O", "1 (shared by two CaSO₄ units)"],
            noteAmber: "Plaster of Paris has ONE water of crystallization per TWO formula units of CaSO₄ — i.e. CaSO₄·½H₂O.",
          },
        ],
      },
      pyqExampleId: "507a0f65-5fa0-41f8-a081-8a03c3d85c1c", // 5, 10 and 2 respectively
      practiceSet: [
        { prompt: "Waters of crystallization in copper sulphate (blue vitriol)?", answer: "5" },
        { prompt: "Waters of crystallization in washing soda?", answer: "10" },
        { prompt: "Waters of crystallization in gypsum?", answer: "2" },
        { prompt: "How many water molecules does plaster of Paris share between two CaSO₄ units?", answer: "One" },
      ],
      traps: [
        {
          title: "Plaster of Paris = half a water per CaSO₄",
          body:
            "Plaster of Paris is written (CaSO₄)₂·H₂O — **one** water molecule shared by **two** units of CaSO₄. It is not two waters; gypsum (CaSO₄·2H₂O) is the one with two.",
        },
      ],
    },

    // pigments (reference)
    {
      kind: "reference" as const,
      slug: "pigments",
      name: "Pigments and carbon black",
      intuition:
        "Pigments are the insoluble solids that give paint its colour. The bank lists three white pigments and slips in one non-pigment (silica). Carbon black is the black pigment, made by burning hydrocarbons with too little air.",
      definition:
        "The pigment facts:\n" +
        "- **White pigments**: **zinc oxide**, **white lead**, and **chalk** (CaCO₃).\n" +
        "- **Silica** is **NOT a pigment** (it is a filler/abrasive).\n" +
        "- **Carbon black** is a black pigment made by the **incomplete combustion of hydrocarbons** (burning in a limited supply of air).",
      table: {
        columns: ["Substance", "Pigment?", "Note"],
        rows: [
          { cells: ["Zinc oxide", "Yes (white)", "Common white pigment"] },
          { cells: ["White lead", "Yes (white)", "Traditional white pigment"] },
          { cells: ["Chalk (CaCO₃)", "Yes (white)", "Cheap white pigment/filler"] },
          {
            cells: ["Silica", "No", "A filler/abrasive, not a pigment"],
            noteAmber: "Of zinc oxide, chalk, white lead and silica, the odd one out (NOT a pigment) is silica.",
          },
          { cells: ["Carbon black", "Yes (black)", "Made by incomplete combustion of hydrocarbons"] },
        ],
      },
      pyqExampleId: "e1c1fd52-cacb-4115-8eb4-c190a08e2707", // which is NOT a pigment — silica
      practiceSet: [
        { prompt: "Which of zinc oxide, chalk, white lead and silica is NOT a pigment?", answer: "Silica" },
        { prompt: "How is carbon black obtained?", answer: "By burning hydrocarbons in a limited supply of air" },
        { prompt: "Name a common white pigment.", answer: "Zinc oxide (or chalk, white lead)" },
      ],
    },
  ],
};
