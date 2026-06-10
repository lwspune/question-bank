import type { SubtopicNote } from "@/app/notes/_types";

export const COMMON_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Common Acids: Names, Formulas and Uses",
  title: "Common Acids — Names, Formulas, Sources and Uses",
  oneLineDefinition:
    "The everyday acids the NDA tests by source (the acid in a bee sting, in tomatoes, in vinegar), by use (etching glass, cleaning gold), and by formula (naming the oxy-acids of a halogen).",
  whyItMatters:
    "The largest subtopic — eight PYQs, almost all single-fact recall. The bank repeats a tight set: natural acids and their sources, mineral acids and their industrial uses, the oxy-acid naming pattern, and two acid-reaction facts (which reaction gives NO gas, and which carbonate does NOT give CO2). " +
    "Learn the source table and the two reaction traps and this subtopic is free marks.",
  concepts: [
    // natural acids and their sources (reference)
    {
      kind: "reference" as const,
      slug: "natural-acid-sources",
      name: "Natural acids and their sources",
      intuition:
        "Many foods and stings owe their sour taste or sting to a specific acid. The bank pairs each source to its acid — bee sting to formic acid, vinegar to acetic acid, curd to lactic acid. Learn the pairs both ways.",
      definition:
        "The source↔acid pairs the bank tests (these follow the NCERT natural-acid table):\n" +
        "- **Bee sting / Nettle sting / Ant sting** → **methanoic acid** (formic acid, HCOOH).\n" +
        "- **Vinegar** → **ethanoic acid** (acetic acid, CH3COOH).\n" +
        "- **Curd** → **lactic acid**.\n" +
        "- **Lemon / Orange (citrus)** → **citric acid**.\n" +
        "- **Tamarind / Grapes** → **tartaric acid**.\n" +
        "- **Tomato / Spinach** → **oxalic acid** (the NCERT-listed answer for tomato).",
      table: {
        columns: ["Source", "Acid present"],
        rows: [
          {
            cells: ["Bee sting / Nettle sting / Ant", "Methanoic acid (formic acid)"],
            noteAmber: "Bee, nettle and ant stings all inject methanoic (formic) acid — the cause of the burning pain.",
          },
          { cells: ["Vinegar", "Ethanoic acid (acetic acid)"] },
          { cells: ["Curd / Sour milk", "Lactic acid"] },
          { cells: ["Lemon, orange (citrus)", "Citric acid"] },
          { cells: ["Tamarind, grapes", "Tartaric acid"] },
          {
            cells: ["Tomato, spinach", "Oxalic acid"],
            noteAmber: "For 'acid in tomatoes', the NCERT-listed answer is oxalic acid (not citric, which is not offered in the bank's options).",
          },
        ],
      },
      pyqExampleId: "3504e067-eead-4092-b982-7728993fdb05", // bee sting = methanoic acid
      selfCheckExample: {
        prompt: "A nettle leaf stings and leaves a burning sensation, and vinegar tastes sour. Name the acid responsible in each.",
        steps: [
          "A nettle (like a bee or ant) injects methanoic acid (formic acid).",
          "Vinegar is a dilute solution of ethanoic acid (acetic acid).",
        ],
        answer: "Nettle sting: methanoic (formic) acid. Vinegar: ethanoic (acetic) acid.",
      },
      practiceSet: [
        { prompt: "Which acid is released by a bee sting?", answer: "Methanoic acid (formic acid)" },
        { prompt: "Which acid is present in vinegar?", answer: "Ethanoic acid (acetic acid)" },
        { prompt: "Which acid is present in curd?", answer: "Lactic acid" },
        { prompt: "Which acid is associated with tomatoes (NCERT answer)?", answer: "Oxalic acid" },
        { prompt: "Which acid is present in tamarind and grapes?", answer: "Tartaric acid" },
      ],
      traps: [
        {
          title: "Bee and nettle stings = methanoic acid, not acetic",
          body:
            "The acid in a bee or nettle sting is **methanoic acid (formic acid, HCOOH)**, NOT ethanoic (acetic) acid. Ethanoic acid is the one in vinegar.",
        },
        {
          title: "Tomato = oxalic acid (in the bank)",
          body:
            "Biochemically tomatoes are richest in citric acid, but when citric acid is not an option the **NCERT-expected answer for tomato is oxalic acid**. Tamarind is the tartaric-acid one — do not swap them.",
        },
      ],
    },

    // mineral acids and their uses (reference)
    {
      kind: "reference" as const,
      slug: "mineral-acid-uses",
      name: "Mineral acids and their uses",
      intuition:
        "Each common mineral acid has a signature industrial job. Hydrofluoric acid etches glass; dilute nitric acid cleans gold and silver; sulphuric acid is the workhorse 'king of chemicals'. The bank asks 'principal use of X' or 'which acid does job Y'.",
      definition:
        "The use↔acid facts the bank tests:\n" +
        "- **Hydrofluoric acid (HF)** — used to **etch glass** (it attacks silica, SiO2).\n" +
        "- **Dilute nitric acid (HNO3)** — used by **goldsmiths to clean gold and silver** (it dissolves base-metal impurities without attacking the noble metal).\n" +
        "- **Sulphuric acid (H2SO4)** — the 'king of chemicals'; used in fertilisers, car batteries and many industrial processes.",
      table: {
        columns: ["Acid", "Principal use"],
        rows: [
          {
            cells: ["Hydrofluoric acid (HF)", "Etching glass (attacks SiO2)"],
            noteAmber: "HF is stored in plastic, not glass, because it dissolves glass — hence its use in etching.",
          },
          {
            cells: ["Dilute nitric acid (HNO3)", "Cleaning gold and silver articles (goldsmith)"],
            noteAmber: "Goldsmiths use dilute HNO3 — it removes base-metal impurities but leaves the noble metal.",
          },
          { cells: ["Sulphuric acid (H2SO4)", "Fertilisers, batteries, industry ('king of chemicals')"] },
          { cells: ["Hydrochloric acid (HCl)", "Cleaning metal surfaces (pickling), lab reagent"] },
        ],
      },
      pyqExampleId: "5e00d537-25aa-4468-ade4-91f3363efdf2", // HF etches glass
      practiceSet: [
        { prompt: "What is the principal use of hydrofluoric acid?", answer: "Etching glass" },
        { prompt: "Which acid does a goldsmith use to clean gold and silver articles?", answer: "Dilute nitric acid (HNO3)" },
        { prompt: "Why is hydrofluoric acid not stored in glass bottles?", answer: "It reacts with and dissolves glass (silica)" },
        { prompt: "Which acid is called the 'king of chemicals'?", answer: "Sulphuric acid (H2SO4)" },
      ],
      traps: [
        {
          title: "Glass etching = hydrofluoric acid only",
          body:
            "Only **hydrofluoric acid (HF)** etches glass, because it reacts with the silica (SiO2) in glass. The other mineral acids do not attack glass — that is why they can be stored in glass bottles.",
        },
      ],
    },

    // oxy-acid naming and formulas (reference)
    {
      kind: "reference" as const,
      slug: "oxyacid-formulas",
      name: "Naming oxy-acids: hypo-, -ous, -ic, per-",
      intuition:
        "The oxy-acids of a halogen (or sulphur, etc.) differ only in how many oxygen atoms they carry. The prefix/suffix encodes the count: 'hypo...ous' is the fewest oxygens, '...ic' is more, 'per...ic' is the most. Bromine's series runs HOBr, HBrO2, HBrO3, HBrO4.",
      definition:
        "The bromine oxy-acid series (lowest to highest oxidation state of Br):\n" +
        "- **Hypobromous acid** = **HOBr** (also written HBrO) — the 'hypo...ous' name marks the **lowest** oxygen count.\n" +
        "- **Bromous acid** = **HBrO2**.\n" +
        "- **Bromic acid** = **HBrO3**.\n" +
        "- **Perbromic acid** = **HBrO4** — 'per...ic' marks the **highest** oxygen count.\n" +
        "The same naming pattern applies to chlorine: hypochlorous (HOCl), chlorous (HClO2), chloric (HClO3), perchloric (HClO4).",
      table: {
        columns: ["Name", "Formula", "Oxygen count"],
        rows: [
          {
            cells: ["Hypobromous acid", "HOBr (HBrO)", "Lowest (hypo...ous)"],
            noteAmber: "The 'hypo-' prefix marks the lowest oxidation state — hypobromous acid is HOBr, not HBr.",
          },
          { cells: ["Bromous acid", "HBrO2", "Low (...ous)"] },
          { cells: ["Bromic acid", "HBrO3", "High (...ic)"] },
          { cells: ["Perbromic acid", "HBrO4", "Highest (per...ic)"] },
        ],
      },
      pyqExampleId: "7c4ba8c4-9431-4303-a796-03ce48c68c41", // hypobromous = HOBr
      practiceSet: [
        { prompt: "What is the formula of hypobromous acid?", answer: "HOBr (HBrO)" },
        { prompt: "What is the formula of perbromic acid?", answer: "HBrO4" },
        { prompt: "What is the formula of hypochlorous acid?", answer: "HOCl" },
        { prompt: "Which has more oxygen: bromic acid or bromous acid?", answer: "Bromic acid (HBrO3 vs HBrO2)" },
      ],
      traps: [
        {
          title: "Hypobromous acid is HOBr, not HBr",
          body:
            "**HBr** is hydrobromic acid (no oxygen). **Hypobromous acid** is the oxy-acid **HOBr** — the 'hypo...ous' name always means an oxy-acid with the fewest oxygens, never the binary hydracid.",
        },
      ],
    },

    // acid reactions: NO gas vs quicklime (formula variant)
    {
      kind: "formula" as const,
      slug: "acid-reactions",
      name: "Acid reactions: nitric acid with metals, and carbonates with HCl",
      intuition:
        "Two reaction facts recur. First: dilute nitric acid with copper gives NO gas, but concentrated nitric acid gives NO2 instead. Second: every carbonate (limestone, chalk, marble — all CaCO3) fizzes CO2 with HCl, but quicklime (CaO) gives no CO2 because it has no carbonate.",
      definition:
        "The two reaction facts:\n" +
        "- **Dilute HNO3 + Cu → NO gas** (nitric oxide); **concentrated HNO3 + Cu → NO2** (nitrogen dioxide). The concentration decides the gas.\n" +
        "- **Carbonates + HCl → CO2** — limestone, chalk and marble are all **CaCO3** and all fizz CO2.\n" +
        "- **Quick lime (CaO) + HCl → CaCl2 + H2O only**, with **no CO2**, because CaO is an oxide, not a carbonate.",
      formula: {
        label: "Dilute nitric acid with copper",
        latex: "3\\,\\text{Cu} + 8\\,\\text{HNO}_3(\\text{dil.}) \\rightarrow 3\\,\\text{Cu(NO}_3)_2 + 2\\,\\text{NO}\\uparrow + 4\\,\\text{H}_2\\text{O}",
      },
      pyqExampleId: "30a8fa50-6072-44c0-86e7-3f7f4b332286", // quick lime does NOT give CO2
      authoredExample: {
        prompt: "Limestone, chalk, marble and quick lime are each treated with dilute HCl. Which one does NOT release carbon dioxide, and why?",
        steps: [
          "Limestone, chalk and marble are all calcium carbonate (CaCO3); a carbonate + HCl releases CO2.",
          "Quick lime is calcium oxide (CaO) — it has no carbonate group.",
          "CaO + 2HCl gives CaCl2 + H2O only, with no CO2.",
        ],
        answer: "Quick lime (CaO) — it is an oxide, not a carbonate, so it releases no CO2.",
      },
      practiceSet: [
        { prompt: "What gas forms when dilute nitric acid reacts with copper?", answer: "NO (nitric oxide)" },
        { prompt: "What gas forms when concentrated nitric acid reacts with copper?", answer: "NO2 (nitrogen dioxide)" },
        { prompt: "Which does NOT give CO2 with HCl: limestone, quick lime, chalk or marble?", answer: "Quick lime (CaO)", method: "it is an oxide, not a carbonate" },
        { prompt: "What is the chemical name of limestone, chalk and marble?", answer: "Calcium carbonate (CaCO3)" },
      ],
      traps: [
        {
          title: "Quick lime has no carbonate, so no CO2",
          body:
            "Limestone, chalk and marble are all CaCO3 and fizz CO2 with HCl. **Quick lime is CaO** — an oxide with no carbonate group — so it gives **no CO2** (only CaCl2 and water).",
        },
        {
          title: "Dilute HNO3 gives NO, concentrated gives NO2",
          body:
            "With copper, **dilute** nitric acid produces **NO**, while **concentrated** nitric acid produces **NO2**. The concentration, not the metal, decides which oxide of nitrogen forms.",
        },
      ],
    },
  ],
};
