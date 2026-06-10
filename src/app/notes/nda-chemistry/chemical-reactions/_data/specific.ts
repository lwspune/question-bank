import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIFIC_NOTE: SubtopicNote = {
  subtopicName: "Specific Reactions: Precipitation, Electrolysis and Daily Life",
  title: "Specific Reactions — Precipitation, Electrolysis and Daily Life",
  oneLineDefinition:
    "A handful of named everyday reactions the bank tests by name — the lime-water test, tarnishing of silver, electrolytic refining of copper, and which reactions give off hydrogen gas.",
  whyItMatters:
    "Five PYQs of high-yield recall — each is a single named reaction with a single right answer. " +
    "Know the products (silver sulphide for tarnish, calcium carbonate for the lime-water test) and the marks are quick.",
  concepts: [
    // lime water test (formula variant)
    {
      kind: "formula" as const,
      slug: "lime-water-test",
      name: "The lime-water test for carbon dioxide",
      intuition:
        "Bubbling carbon dioxide through lime water turns it milky white. The white solid is calcium carbonate (chalk) — the same reaction that confirms a gas is CO₂. It is a precipitation reaction.",
      definition:
        "The lime-water test:\n" +
        "- **Lime water** is a solution of **calcium hydroxide, Ca(OH)₂**.\n" +
        "- Passing **CO₂** through it: **Ca(OH)₂ + CO₂ → CaCO₃ + H₂O**.\n" +
        "- The **white precipitate** is **calcium carbonate (CaCO₃)** — the milkiness confirms the gas is carbon dioxide.\n" +
        "- With EXCESS CO₂ the milkiness disappears as soluble calcium bicarbonate forms (Ca(HCO₃)₂).",
      formula: {
        label: "Lime-water test for CO₂",
        latex: "\\text{Ca(OH)}_2 + \\text{CO}_2 \\to \\text{CaCO}_3\\!\\downarrow + \\text{H}_2\\text{O}",
      },
      pyqExampleId: "305850f1-a9c3-4697-8e6d-f7555410ee8f", // Ca(OH)2 + CO2 -> CaCO3 + H2O
      authoredExample: {
        prompt:
          "CO₂ gas is passed through lime water and a white precipitate forms. Write the reaction and name the precipitate and its colour.",
        steps: [
          "Lime water is calcium hydroxide, Ca(OH)₂.",
          "CO₂ reacts with it: Ca(OH)₂ + CO₂ → CaCO₃ + H₂O.",
          "The insoluble product CaCO₃ is the white precipitate that turns the lime water milky.",
        ],
        answer: "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O; the precipitate is calcium carbonate (CaCO₃), white in colour.",
      },
      practiceSet: [
        { prompt: "What is the chemical name of lime water?", answer: "Calcium hydroxide, Ca(OH)₂" },
        { prompt: "What colour is the precipitate when CO₂ is passed through lime water?", answer: "White" },
        { prompt: "Name the precipitate formed in the lime-water test.", answer: "Calcium carbonate (CaCO₃)" },
        { prompt: "Write the lime-water test reaction.", answer: "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O" },
      ],
      traps: [
        {
          title: "The precipitate is calcium carbonate, white",
          body:
            "Passing CO₂ through lime water gives a WHITE precipitate of CaCO₃ — not calcium hydroxide or calcium oxide. The white milkiness is the standard confirmatory test for carbon dioxide.",
        },
      ],
    },

    // tarnishing of silver (reference)
    {
      kind: "reference" as const,
      slug: "tarnishing-corrosion",
      name: "Tarnishing of silver and surface reactions",
      intuition:
        "Silver darkens over time because it reacts with traces of hydrogen sulphide in the air to form a black layer of silver sulphide. It is a slow surface reaction, like rusting is for iron.",
      definition:
        "Everyday surface reactions:\n" +
        "- **Tarnishing of silver** — silver reacts with **H₂S** in air to form a black layer of **silver sulphide (Ag₂S)**: 2Ag + H₂S → Ag₂S + H₂.\n" +
        "- The tarnish is **silver sulphide**, NOT silver oxide, chloride or sulphate.\n" +
        "- **Rusting of iron** — the analogous reaction for iron, forming hydrated iron(III) oxide (brown rust).",
      table: {
        columns: ["Metal", "Reacts with", "Product (the tarnish/coating)"],
        rows: [
          {
            cells: ["Silver", "H₂S in air", "Silver sulphide, Ag₂S (black)"],
            noteAmber: "Silver tarnish is silver SULPHIDE (Ag₂S) — not oxide, chloride or sulphate.",
          },
          { cells: ["Iron", "O₂ + moisture", "Hydrated iron(III) oxide (brown rust)"] },
          { cells: ["Copper", "Moist CO₂ / air", "Green basic copper carbonate (verdigris)"] },
        ],
      },
      pyqExampleId: "25b07fa9-d8a9-4365-8055-dfab8a4c5560", // silver tarnish = silver sulphide
      practiceSet: [
        { prompt: "Silver artefacts tarnish to form which compound?", answer: "Silver sulphide (Ag₂S)" },
        { prompt: "Which gas in air causes silver to tarnish?", answer: "Hydrogen sulphide (H₂S)" },
        { prompt: "What colour is tarnished silver?", answer: "Black", method: "Ag₂S is black" },
        { prompt: "What is the brown coating formed when iron corrodes called?", answer: "Rust (hydrated iron(III) oxide)" },
      ],
      traps: [
        {
          title: "Silver tarnish is the sulphide, not the oxide",
          body:
            "Silver tarnishes to silver SULPHIDE (Ag₂S) by reaction with H₂S in the air. Silver oxide, silver chloride and silver sulphate are the tempting wrong answers — the black tarnish is the sulphide.",
        },
      ],
    },

    // electrolysis and hydrogen evolution (reference)
    {
      kind: "reference" as const,
      slug: "electrolysis-hydrogen",
      name: "Electrolytic refining and hydrogen evolution",
      intuition:
        "Electrolysis uses electricity to drive a reaction — copper is purified by electrolysing acidified copper sulphate. Separately, the bank asks which reactions give off hydrogen gas: reactive metals with acids, water or alkali do; setting plaster of Paris does not.",
      definition:
        "Two daily-life electro/gas facts:\n" +
        "- **Electrolytic refining of copper** uses an electrolyte of **acidified copper sulphate (CuSO₄)** solution; impure copper is the anode, pure copper deposits on the cathode.\n" +
        "- **Hydrogen gas IS evolved** when a reactive metal meets an acid, water or alkali: **Zn + dilute H₂SO₄**, **K + H₂O**, **Zn + NaOH** all release H₂.\n" +
        "- **No hydrogen** is evolved when **water is added to Plaster of Paris** — it merely re-hydrates and SETS (CaSO₄·½H₂O + water → gypsum); this is not a hydrogen-releasing reaction.",
      table: {
        columns: ["Process", "Hydrogen gas evolved?"],
        rows: [
          { cells: ["Zinc + dilute H₂SO₄", "Yes"] },
          { cells: ["Potassium + water", "Yes"] },
          { cells: ["Zinc + sodium hydroxide solution", "Yes"] },
          {
            cells: ["Water added to Plaster of Paris", "No — it just sets (rehydrates)"],
            noteAmber: "Setting of Plaster of Paris is rehydration to gypsum — NO hydrogen gas is released.",
          },
        ],
        caption: "Electrolytic refining of copper uses an electrolyte of acidified copper sulphate solution.",
      },
      pyqExampleId: "28bad89b-5eec-40bf-b1e2-753c3ac32d1a", // which does NOT evolve H2 — water + Plaster of Paris
      practiceSet: [
        { prompt: "In electrolytic refining of copper, what is the electrolyte?", answer: "Acidified copper sulphate solution" },
        { prompt: "Does zinc + dilute sulphuric acid evolve hydrogen gas?", answer: "Yes" },
        { prompt: "Does adding water to Plaster of Paris evolve hydrogen gas?", answer: "No — it sets by rehydration" },
        { prompt: "Name one reaction of a metal with water that releases hydrogen.", answer: "Potassium + water → KOH + H₂" },
      ],
      traps: [
        {
          title: "Setting Plaster of Paris releases no hydrogen",
          body:
            "Adding water to Plaster of Paris makes it SET (rehydrate to gypsum) — no gas is produced. The hydrogen-evolving reactions are reactive metals with acid, water or alkali. The 'odd one out' that gives no H₂ is the Plaster of Paris setting.",
        },
      ],
    },
  ],
};
