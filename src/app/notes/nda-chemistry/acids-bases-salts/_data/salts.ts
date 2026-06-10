import type { SubtopicNote } from "@/app/notes/_types";

export const SALTS_NOTE: SubtopicNote = {
  subtopicName: "Salts and Common Compounds",
  title: "Salts and Common Compounds",
  oneLineDefinition:
    "The household name↔formula table for the common salts (washing soda, baking soda, bleaching powder, gypsum, brine), what is manufactured from common salt, and the properties of bleaching powder.",
  whyItMatters:
    "Seven PYQs of name↔formula↔use recall plus two trap questions ('which is NOT made from common salt', 'which statement about bleaching powder is wrong'). " +
    "The match-list question recurs almost verbatim — learn the four-way table and it is a guaranteed mark.",
  concepts: [
    // common salt names and formulas (reference)
    {
      kind: "reference" as const,
      slug: "common-salt-names",
      name: "Common names and formulas of salts",
      intuition:
        "Every Indian entrance exam keeps a short list of household salts with their 'kitchen' name, chemical name and formula. The bank tests any column — give the name, ask the formula, or run a four-way match-list. Learn all three columns for each.",
      definition:
        "The high-frequency name↔formula facts:\n" +
        "- **Washing soda** = **Na2CO3·10H2O** (sodium carbonate decahydrate).\n" +
        "- **Baking soda** = **NaHCO3** (sodium bicarbonate).\n" +
        "- **Bleaching powder** = **CaOCl2** (calcium oxychloride, also written Ca(OCl)Cl).\n" +
        "- **Gypsum** = **CaSO4·2H2O**.\n" +
        "- **Brine** = an **aqueous solution of NaCl** (common salt in water).\n" +
        "- **Milk of magnesia** = **Mg(OH)2** (magnesium hydroxide) — an antacid.\n" +
        "- **Limestone / Chalk / Marble** = **CaCO3**. (Lime water is Ca(OH)2 solution — NOT CaCO3.)",
      table: {
        columns: ["Common name", "Chemical name / formula"],
        rows: [
          { cells: ["Washing soda", "Sodium carbonate, Na2CO3·10H2O"], pyqExampleId: "98537e97-64c0-4c37-b621-397c2c25413d" },
          { cells: ["Baking soda", "Sodium bicarbonate, NaHCO3"] },
          { cells: ["Bleaching powder", "Calcium oxychloride, CaOCl2"] },
          { cells: ["Gypsum", "Calcium sulphate dihydrate, CaSO4·2H2O"] },
          {
            cells: ["Brine", "Aqueous solution of NaCl (common salt)"],
            noteAmber: "Brine is NaCl in water — not NaOH, NaHCO3 or Na2CO3.",
          },
          { cells: ["Milk of magnesia", "Magnesium hydroxide, Mg(OH)2"] },
          {
            cells: ["Lime water", "Calcium hydroxide solution, Ca(OH)2"],
            noteAmber: "Lime water is Ca(OH)2 — it does NOT represent calcium carbonate. Limestone, chalk and marble are the CaCO3 ones.",
          },
        ],
      },
      pyqExampleId: "275d852e-6c19-4cc4-baae-4b5b3c6a601e", // brine = NaCl
      selfCheckExample: {
        prompt: "Match each common name to its formula: Washing soda, Baking soda, Bleaching powder, Gypsum.",
        steps: [
          "Washing soda = Na2CO3·10H2O.",
          "Baking soda = NaHCO3.",
          "Bleaching powder = CaOCl2.",
          "Gypsum = CaSO4·2H2O.",
        ],
        answer: "Washing soda → Na2CO3·10H2O; Baking soda → NaHCO3; Bleaching powder → CaOCl2; Gypsum → CaSO4·2H2O.",
      },
      practiceSet: [
        { prompt: "Chemical formula of washing soda?", answer: "Na2CO3·10H2O" },
        { prompt: "Chemical formula of baking soda?", answer: "NaHCO3" },
        { prompt: "Chemical formula of bleaching powder?", answer: "CaOCl2" },
        { prompt: "Brine is an aqueous solution of which compound?", answer: "NaCl (common salt)" },
        { prompt: "Milk of magnesia is which compound?", answer: "Magnesium hydroxide, Mg(OH)2" },
        { prompt: "Which does NOT represent calcium carbonate: lime water, limestone, chalk or marble?", answer: "Lime water", method: "lime water is Ca(OH)2; the others are CaCO3" },
      ],
      traps: [
        {
          title: "Lime water is Ca(OH)2, not CaCO3",
          body:
            "Limestone, chalk and marble are all calcium carbonate (**CaCO3**). **Lime water** is the odd one out — it is a solution of **calcium hydroxide, Ca(OH)2**, and does NOT represent calcium carbonate.",
        },
        {
          title: "Milk of magnesia = Mg(OH)2, not a carbonate",
          body:
            "Milk of magnesia is **magnesium hydroxide, Mg(OH)2** — an antacid base. It is not magnesium carbonate, bicarbonate or sulphate.",
        },
      ],
    },

    // products from common salt (reference)
    {
      kind: "reference" as const,
      slug: "products-from-common-salt",
      name: "Compounds manufactured from common salt",
      intuition:
        "Common salt (NaCl) is the feedstock for a whole family of sodium and chlorine chemicals — washing soda, baking soda and bleaching powder all trace back to NaCl. The bank's trap is plaster of Paris, which comes from gypsum, not salt.",
      definition:
        "What is and is not made from NaCl:\n" +
        "- **From NaCl** (via the Solvay or chlor-alkali process): **washing soda (Na2CO3)**, **baking soda (NaHCO3)**, **bleaching powder**, NaOH and chlorine.\n" +
        "- **NOT from NaCl**: **Plaster of Paris** — it is made from **gypsum (CaSO4·2H2O)**, a calcium compound, not a sodium one.",
      table: {
        columns: ["Compound", "Made from common salt?", "Actual source"],
        rows: [
          { cells: ["Washing soda (Na2CO3)", "Yes", "NaCl, via Solvay process"] },
          { cells: ["Baking soda (NaHCO3)", "Yes", "NaCl, via Solvay process"] },
          { cells: ["Bleaching powder", "Yes", "Chlorine (from NaCl) + slaked lime"] },
          {
            cells: ["Plaster of Paris", "No", "Gypsum (CaSO4·2H2O)"],
            noteAmber: "Plaster of Paris is the trap — it is made from gypsum, NOT from common salt.",
          },
        ],
      },
      pyqExampleId: "c55289fa-0337-421c-9450-d56e1d87f9db", // NaCl not used for PoP
      practiceSet: [
        { prompt: "Which is NOT made from common salt: bleaching powder, baking soda, plaster of Paris or washing soda?", answer: "Plaster of Paris", method: "it is made from gypsum" },
        { prompt: "Name two compounds manufactured from common salt.", answer: "Washing soda and baking soda (also bleaching powder, NaOH, chlorine)" },
        { prompt: "Plaster of Paris is made from which raw material?", answer: "Gypsum (CaSO4·2H2O)" },
      ],
      traps: [
        {
          title: "Plaster of Paris comes from gypsum, not salt",
          body:
            "Washing soda, baking soda and bleaching powder all start from **NaCl**. **Plaster of Paris** is the exception — it is made by heating **gypsum (CaSO4·2H2O)**, a calcium mineral, so it is NOT a product of common salt.",
        },
      ],
    },

    // bleaching powder properties (reference)
    {
      kind: "reference" as const,
      slug: "bleaching-powder",
      name: "Bleaching powder: formula, uses and properties",
      intuition:
        "Bleaching powder (CaOCl2) is an oxidising agent that releases chlorine. Its jobs all rely on that: bleaching paper and textiles, and disinfecting water. The classic trap calls it a reducing agent — it is an OXIDISING agent.",
      definition:
        "Bleaching powder facts:\n" +
        "- Formula **CaOCl2** (calcium oxychloride); it is an **oxidising agent**, not a reducing agent.\n" +
        "- **Uses**: bleaching wood pulp in paper factories, bleaching linen/cotton in textiles, and **disinfecting drinking water**.\n" +
        "- Bleaching powder and **DDT** share one feature: **both contain chlorine** (bleaching powder is inorganic; DDT is organic).",
      table: {
        columns: ["Property / use", "Detail"],
        rows: [
          {
            cells: ["Chemical nature", "Oxidising agent (NOT reducing)"],
            noteAmber: "The bank's wrong statement is 'bleaching powder is a reducing agent' — it is an oxidising agent.",
          },
          { cells: ["Use 1", "Bleaching wood pulp in paper factories"] },
          { cells: ["Use 2", "Bleaching linen and cotton in textiles"] },
          { cells: ["Use 3", "Disinfecting drinking water"] },
          {
            cells: ["Shared with DDT", "Both contain chlorine"],
            noteAmber: "Bleaching powder and DDT both contain chlorine — bleaching powder is inorganic, DDT is organic.",
          },
        ],
      },
      pyqExampleId: "67311c12-bebb-4e6e-ad76-06f2423a468d", // bleaching powder reducing agent is NOT true
      practiceSet: [
        { prompt: "Is bleaching powder an oxidising agent or a reducing agent?", answer: "Oxidising agent" },
        { prompt: "What feature do bleaching powder and DDT have in common?", answer: "Both contain chlorine" },
        { prompt: "Name one use of bleaching powder besides bleaching textiles.", answer: "Disinfecting drinking water (or bleaching wood pulp in paper)" },
        { prompt: "Chemical formula of bleaching powder?", answer: "CaOCl2" },
      ],
      traps: [
        {
          title: "Bleaching powder oxidises, it does not reduce",
          body:
            "The statement 'bleaching powder is used as a reducing agent' is **NOT true** — bleaching powder is an **oxidising agent** (it releases chlorine). Its bleaching and disinfecting actions are oxidation.",
        },
        {
          title: "Bleaching powder and DDT share chlorine, not calcium",
          body:
            "The correct shared fact is that **both contain chlorine**. They do NOT both contain calcium (DDT has none), and they are not both organic (bleaching powder is inorganic) or both inorganic (DDT is organic).",
        },
      ],
    },
  ],
};
