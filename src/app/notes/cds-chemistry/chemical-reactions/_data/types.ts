import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CR_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Reactions and Energy Changes",
  title: "Types of Reactions and Energy Changes",
  oneLineDefinition:
    "Physical against chemical change, the main reaction types, what heating lead nitrate gives, and the energy ideas behind whether a reaction goes: state functions and Gibbs energy.",
  whyItMatters:
    "Eight CDS questions. Lead nitrate on heating alone was asked three times (2020, 2021, 2023). The two energy questions are HARD Class 11 thermodynamics, the only ones of their kind in CDS chemistry.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschcr-physical-chemical",
      name: "Physical and chemical changes",
      intuition:
        "A physical change alters form but makes no new substance, and can usually be undone. A chemical change makes a new substance. Some everyday events do both at once: a burning candle melts (physical) and burns (chemical).",
      definition:
        "The test:\n" +
        "- **Physical change**: no new substance; usually reversible (melting, freezing, dissolving, evaporating).\n" +
        "- **Chemical change**: a new substance forms; usually not reversible (burning, rusting, cooking).\n" +
        "- **Both at once**: a **burning candle** — the wax melts and vaporises (physical), and the vapour burns to CO₂ and water (chemical).",
      table: {
        columns: ["Event", "Kind of change"],
        rows: [
          { cells: ["Freezing of water", "Physical"] },
          { cells: ["Rusting of iron", "Chemical"] },
          { cells: ["Cooking food", "Chemical"] },
          {
            cells: ["Burning candle", "Both physical and chemical"],
            pyqExampleId: "30d2afea-1513-48a0-bdca-7489ad800862",
          },
        ],
      },
      pyqExampleId: "30d2afea-1513-48a0-bdca-7489ad800862",
      practiceSet: [
        { prompt: "Is dissolving sugar in water a physical or a chemical change?", answer: "Physical" },
        { prompt: "Is burning of paper a physical or a chemical change?", answer: "Chemical" },
        { prompt: "Name an everyday event that involves both kinds of change.", answer: "A burning candle" },
      ],
      traps: [
        {
          title: "The candle is the 'both' answer",
          body: "Freezing is only physical and rusting only chemical. A **burning candle** is the standard example of both at once: melting wax plus burning vapour.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcr-reaction-types",
      name: "Combination, decomposition, displacement and double displacement",
      intuition:
        "Reactions are named by what happens to the reactants. Two join into one: combination. One breaks into several: decomposition. One element pushes another out: displacement. Two compounds swap partners: double displacement.",
      definition:
        "The four types:\n" +
        "- **Combination**: A + B → AB. Magnesium burning in air, 2Mg + O₂ → 2MgO, is combination and **combustion**: a white powder forms and heat and light are given out.\n" +
        "- **Decomposition**: AB → A + B, by heat (thermal), light (photochemical) or electricity.\n" +
        "- **Displacement**: A + BC → AC + B (a more reactive element takes the place of a less reactive one).\n" +
        "- **Double displacement**: AB + CD → AD + CB. When one product is insoluble it is also a **precipitation** reaction: K₂SO₄ + BaCl₂ → 2KCl + **BaSO₄↓**.",
      table: {
        columns: ["Type", "Pattern", "Example"],
        rows: [
          {
            cells: ["Combination", "A + B → AB", "2Mg + O₂ → 2MgO (white powder, heat and light)"],
            pyqExampleId: "3c29c4c3-0673-4052-ac40-498510305127",
          },
          { cells: ["Decomposition", "AB → A + B", "CaCO₃ → CaO + CO₂ (on heating)"] },
          { cells: ["Displacement", "A + BC → AC + B", "Zn + CuSO₄ → ZnSO₄ + Cu"] },
          {
            cells: ["Double displacement", "AB + CD → AD + CB", "K₂SO₄ + BaCl₂ → 2KCl + BaSO₄↓"],
            pyqExampleId: "bfff9830-9232-450e-8b51-34d1c90e5806",
          },
        ],
      },
      pyqExampleId: "bfff9830-9232-450e-8b51-34d1c90e5806",
      selfCheckExample: {
        prompt: "Name the type of each reaction: (i) silver nitrate + sodium chloride → silver chloride (white precipitate) + sodium nitrate; (ii) calcium oxide + water → calcium hydroxide.",
        steps: [
          "(i) The two compounds swap partners and an insoluble solid forms: double displacement (precipitation).",
          "(ii) Two substances join into one: combination.",
        ],
        answer: "(i) Double displacement; (ii) combination.",
      },
      practiceSet: [
        { prompt: "What type of reaction is 2H₂ + O₂ → 2H₂O?", answer: "Combination" },
        { prompt: "What is a double displacement reaction that forms an insoluble solid also called?", answer: "A precipitation reaction" },
        { prompt: "What type of reaction is CaCO₃ → CaO + CO₂?", answer: "Decomposition (thermal)" },
      ],
      traps: [
        {
          title: "Swapping partners is double displacement",
          body: "In K₂SO₄ + BaCl₂ both compounds exchange ions. That is **double** displacement, not a single displacement or an addition reaction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcr-lead-nitrate",
      name: "Heating lead nitrate",
      intuition:
        "Lead nitrate is the textbook thermal decomposition. Heated in a tube it crackles and gives off brown fumes. The brown gas is nitrogen dioxide; a colourless gas, oxygen, comes with it, and yellow lead monoxide is left.",
      definition:
        "The reaction:\n" +
        "- 2Pb(NO₃)₂ → **2PbO** + **4NO₂** + **O₂**, on heating.\n" +
        "- **NO₂** is the **brown** gas. **O₂** is colourless. Lead monoxide, PbO, is left behind.\n" +
        "- It is a **thermal decomposition**, not an oxidation reaction. NO, not NO₂, is colourless, so 'brown fumes of NO' is wrong.",
      table: {
        columns: ["Product", "Formula", "Seen as"],
        rows: [
          {
            cells: ["Lead monoxide", "PbO", "Yellow solid left in the tube"],
            pyqExampleId: "356ae366-b658-40c6-a510-1e4d8e397f09",
          },
          {
            cells: ["Nitrogen dioxide", "NO₂", "Brown fumes"],
            pyqExampleId: "bbb00052-83b3-4f8a-afe3-e48bd47f8783",
          },
          {
            cells: ["Oxygen", "O₂", "Colourless gas"],
            noteAmber: "CDS 2023 (I): the correct statements were 'colourless O₂ is released' and 'thermal decomposition producing NO₂'.",
            pyqExampleId: "bdac71e2-64eb-4129-a068-be11edb2076d",
          },
        ],
      },
      pyqExampleId: "bdac71e2-64eb-4129-a068-be11edb2076d",
      practiceSet: [
        { prompt: "What colour are the fumes given off when lead nitrate is heated?", answer: "Brown (NO₂)" },
        { prompt: "Which solid is left when lead nitrate is heated?", answer: "Lead monoxide, PbO" },
        { prompt: "What type of reaction is the heating of lead nitrate?", answer: "Thermal decomposition" },
      ],
      traps: [
        {
          title: "Lead nitrate gives PbO, not PbO₂",
          body: "The solid left is **lead monoxide, PbO**, and the brown gas is **NO₂**. Options with PbO₂ or with NO are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschcr-energy",
      name: "State functions and Gibbs energy",
      intuition:
        "A state function depends only on where a system starts and ends, like the height between two floors, whatever stairs you take. Heat and work depend on the route, but their sum does not. Gibbs energy combines heat and disorder and tells you whether a reaction goes on its own.",
      definition:
        "The ideas:\n" +
        "- **Exothermic** reactions give out heat (ΔH negative); **endothermic** ones take it in (ΔH positive).\n" +
        "- **State functions**: internal energy U, enthalpy H, entropy S, Gibbs energy G = H − TS. **Heat q and work w** are **path functions**, but **q + w = ΔU** is a state function.\n" +
        "- A reaction is **spontaneous when ΔG is negative**.\n" +
        "- Where ΔG changes sign, **ΔG = 0**, so **T = ΔH ÷ ΔS**. If ΔH and ΔS are both negative, the reaction goes **below** that temperature; if both positive, **above** it.",
      formula: {
        label: "Gibbs energy",
        latex: "\\Delta G = \\Delta H - T\\Delta S \\qquad T_{\\text{switch}} = \\frac{\\Delta H}{\\Delta S}",
        symbols: [
          { symbol: "\\(\\Delta H\\)", meaning: "enthalpy change (heat at constant pressure)" },
          { symbol: "\\(\\Delta S\\)", meaning: "entropy change" },
          { symbol: "\\(T\\)", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt: "For a reaction, ΔH = +40 kJ/mol and ΔS = +100 J/(mol·K). Above or below what temperature is it spontaneous?",
        steps: [
          "Convert to the same units: ΔS = 0.1 kJ/(mol·K).",
          "\\(T = \\frac{\\Delta H}{\\Delta S} = \\frac{40}{0.1} = 400\\) K.",
          "Both are positive, so \\(\\Delta G = 40 - 0.1T\\) is negative only when T is above 400 K.",
        ],
        answer: "Spontaneous above 400 K.",
      },
      selfCheckExample: {
        prompt: "For a reaction, ΔH = −60 kJ/mol and ΔS = −200 J/(mol·K). Below what temperature is it spontaneous?",
        steps: [
          "ΔS = −0.2 kJ/(mol·K).",
          "\\(T = \\frac{-60}{-0.2} = 300\\) K.",
          "Both are negative, so ΔG = −60 + 0.2T is negative only below 300 K.",
        ],
        answer: "Below 300 K.",
      },
      pyqExampleId: "000ea8d1-eae9-4621-a575-0a3e3e1b8eaa",
      practiceSet: [
        { prompt: "Is heat q a state function or a path function?", answer: "A path function" },
        { prompt: "What sign does ΔG have for a spontaneous reaction?", answer: "Negative" },
        { prompt: "Is H − TS a state function?", answer: "Yes — it is the Gibbs energy G" },
        { prompt: "Does an exothermic reaction have a positive or negative ΔH?", answer: "Negative" },
      ],
      traps: [
        {
          title: "q and w are path functions, their sum is not",
          body: "Heat and work each depend on the route taken, but **q + w = ΔU**, the change in internal energy, depends only on the start and end states.",
        },
        {
          title: "Both negative means 'below', not 'above'",
          body: "When ΔH and ΔS are **both negative**, the reaction is spontaneous **below** T = ΔH ÷ ΔS. That temperature is a maximum, not a minimum.",
        },
      ],
    },
  ],
};
