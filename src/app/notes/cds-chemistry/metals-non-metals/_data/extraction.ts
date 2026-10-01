import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MN_EXTRACTION_NOTE: SubtopicNote = {
  subtopicName: "Extraction of Metals and Alloys",
  title: "Extraction of Metals and Alloys",
  oneLineDefinition:
    "Which ore gives which metal, roasting against calcination, why the most reactive metals need electrolysis, and what common alloys are made of.",
  whyItMatters:
    "Four CDS questions, all EASY or MODERATE: one ore, one process name, one extraction method and one alloy. Each is a single fact from the tables below.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschmn-ores",
      name: "Ores and how metals are extracted",
      intuition:
        "How a metal is won depends on how reactive it is. Unreactive metals such as gold occur free. Middle metals such as iron and zinc are roasted or calcined to an oxide and then reduced with carbon. The most reactive metals hold on to their partners so tightly that only electricity can pull them apart.",
      definition:
        "The steps and the methods:\n" +
        "- **Roasting**: heating a **sulphide** ore strongly in **excess air**, giving the oxide (2ZnS + 3O₂ → 2ZnO + 2SO₂).\n" +
        "- **Calcination**: heating a **carbonate** ore in **limited air**, giving the oxide and CO₂.\n" +
        "- **Smelting / reduction**: the oxide is reduced to the metal, usually with carbon.\n" +
        "- **Electrolysis of the molten compound** for the most reactive metals (K, **Na**, Ca, Mg, **Al**): sodium from fused NaCl (Down's process), aluminium from alumina made from **bauxite**.",
      table: {
        columns: ["Metal", "Main ore", "Extracted by"],
        rows: [
          {
            cells: ["Aluminium", "Bauxite (Al₂O₃·2H₂O)", "Electrolysis of alumina"],
            pyqExampleId: "995524f9-7430-4f11-a8cc-931cf626d9c2",
          },
          {
            cells: ["Sodium", "Rock salt (NaCl)", "Electrolysis of fused NaCl"],
            noteAmber: "CDS 2025 (II): sodium is the metal won by electrolysis of its molten compound.",
            pyqExampleId: "b81f1c92-3ec6-4e23-857d-9c93d1e928b7",
          },
          { cells: ["Iron", "Haematite (Fe₂O₃)", "Reduction with coke in a blast furnace"] },
          { cells: ["Zinc", "Zinc blende (ZnS)", "Roasting, then reduction with carbon"] },
          { cells: ["Mercury", "Cinnabar (HgS)", "Roasting"] },
          { cells: ["Copper", "Copper pyrites (CuFeS₂)", "Roasting and smelting"] },
        ],
      },
      pyqExampleId: "f51f7818-097b-4e97-bab6-b57e5543a321",
      selfCheckExample: {
        prompt: "Zinc carbonate ore is heated in a limited supply of air. What is the process called, and what does it give?",
        steps: [
          "Heating a carbonate ore in limited air is calcination.",
          "ZnCO₃ → ZnO + CO₂.",
        ],
        answer: "Calcination; it gives zinc oxide and carbon dioxide.",
      },
      practiceSet: [
        { prompt: "What is the ore of aluminium?", answer: "Bauxite" },
        { prompt: "What is the process of heating a sulphide ore in excess air called?", answer: "Roasting" },
        { prompt: "Why is sodium not obtained by reducing its oxide with carbon?", answer: "It is too reactive; it is won by electrolysis of the molten chloride" },
        { prompt: "Which ore is mercury obtained from?", answer: "Cinnabar (HgS)" },
      ],
      traps: [
        {
          title: "Roasting is for sulphides, calcination for carbonates",
          body: "**Roasting** heats a **sulphide** ore in **excess** air. **Calcination** heats a **carbonate** ore in **limited** air. Smelting is the later reduction to the metal.",
        },
        {
          title: "Electrolysis is for the most reactive metals",
          body: "Sodium, potassium, calcium, magnesium and aluminium are won by **electrolysis of a molten compound**. Copper and tin are reduced by smelting, and gold occurs free, so none of them needs it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschmn-alloys",
      name: "Common alloys and what they are made of",
      intuition:
        "An alloy is a mixture of a metal with other metals or carbon, made to change a property: harder, lower melting, rust-proof. Each alloy has a fixed recipe, and CDS asks for it.",
      definition:
        "The alloys to know:\n" +
        "- **Solder**: **lead and tin**; low melting point, used to join electrical wires.\n" +
        "- **Brass**: copper and zinc. **Bronze**: copper and tin.\n" +
        "- **Steel**: iron and a little carbon. **Stainless steel**: iron with chromium and nickel; it does not rust.\n" +
        "- **Duralumin**: aluminium with copper, magnesium and manganese; light and strong, for aircraft.\n" +
        "- An **amalgam** is any alloy of **mercury**.",
      table: {
        columns: ["Alloy", "Made of", "Used for"],
        rows: [
          {
            cells: ["Solder", "Lead and tin", "Joining wires (low melting point)"],
            pyqExampleId: "655070a3-36c8-421e-8b0a-cc342cdfb25e",
          },
          { cells: ["Brass", "Copper and zinc", "Fittings, instruments"] },
          { cells: ["Bronze", "Copper and tin", "Statues, medals"] },
          { cells: ["Stainless steel", "Iron, chromium, nickel", "Utensils; does not rust"] },
          { cells: ["Duralumin", "Aluminium, copper, magnesium, manganese", "Aircraft bodies"] },
          { cells: ["Amalgam", "Mercury with another metal", "Dental fillings"] },
        ],
      },
      pyqExampleId: "655070a3-36c8-421e-8b0a-cc342cdfb25e",
      practiceSet: [
        { prompt: "What are the constituents of brass?", answer: "Copper and zinc" },
        { prompt: "Which alloy is used to join electrical wires?", answer: "Solder (lead and tin)" },
        { prompt: "What is an amalgam?", answer: "An alloy of mercury" },
        { prompt: "Which metals are added to iron to make stainless steel?", answer: "Chromium and nickel" },
      ],
      traps: [
        {
          title: "Brass has zinc, bronze has tin",
          body: "Both are copper alloys. **Brass** = copper + **zinc**; **bronze** = copper + **tin**. Solder is lead + tin, with no copper.",
        },
      ],
    },
  ],
};
