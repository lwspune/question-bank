import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MN_EXTRACTION_NOTE: SubtopicNote = {
  subtopicName: "Ores and Extraction of Metals",
  title: "Ores and Extraction of Metals",
  oneLineDefinition:
    "A metal comes from its ore in steps: the ore is concentrated, turned into an oxide, reduced to the metal, and the metal is then treated to give it the hardness needed.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE, one of them from the 2022 paper (the name for soaking bauxite in sodium hydroxide). The others ask the metal in bauxite, how iron pyrite is concentrated, and the name for cooling hot iron slowly. All four are names to recall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimnex-ores",
      name: "Minerals, ores and gangue",
      intuition:
        "Metals are found in the earth's crust as compounds called minerals. A mineral from which a metal can be taken out cheaply is an ore. The sand and rock that come with it are the gangue.",
      definition:
        "- A **mineral** is a natural compound of a metal. An **ore** is a mineral from which the metal can be extracted profitably. Every ore is a mineral; not every mineral is an ore.\n" +
        "- The unwanted earth, sand and rock mixed with an ore is the **gangue**.\n" +
        "- Ores are mostly **oxides**, **sulphides** or **carbonates**. Gold and platinum are found free.",
      table: {
        columns: ["Ore", "Formula", "Metal"],
        rows: [
          {
            cells: ["Bauxite", "\\(\\mathrm{Al_2O_3 \\cdot 2H_2O}\\)", "Aluminium"],
            noteAmber: "The chief ore of aluminium.",
          },
          { cells: ["Haematite", "\\(\\mathrm{Fe_2O_3}\\)", "Iron"] },
          { cells: ["Magnetite", "\\(\\mathrm{Fe_3O_4}\\)", "Iron"] },
          { cells: ["Zinc blende", "\\(\\mathrm{ZnS}\\)", "Zinc"] },
          { cells: ["Calamine", "\\(\\mathrm{ZnCO_3}\\)", "Zinc"] },
          { cells: ["Copper pyrites", "\\(\\mathrm{CuFeS_2}\\)", "Copper"] },
          { cells: ["Cinnabar", "\\(\\mathrm{HgS}\\)", "Mercury"] },
          { cells: ["Rock salt", "\\(\\mathrm{NaCl}\\)", "Sodium"] },
        ],
        caption: "Iron pyrites, \\(\\mathrm{FeS_2}\\), contains iron but is mined for its sulphur; iron is extracted from haematite.",
      },
      selfCheckExample: {
        prompt: "What is the difference between a mineral and an ore?",
        steps: ["Both are natural compounds of a metal.", "An ore is the mineral from which the metal can be extracted at a profit."],
        answer: "Every ore is a mineral, but only a mineral that pays to extract from is an ore.",
      },
      practiceSet: [
        { prompt: "Haematite is an ore of which metal?", answer: "Iron" },
        { prompt: "Which metal is extracted from cinnabar?", answer: "Mercury" },
        { prompt: "What are the unwanted sand and rock mixed with an ore called?", answer: "Gangue" },
        { prompt: "Name a sulphide ore of zinc.", answer: "Zinc blende, \\(\\mathrm{ZnS}\\)" },
        { prompt: "What is the formula of haematite?", answer: "\\(\\mathrm{Fe_2O_3}\\)" },
      ],
      pyqExampleId: "5e9b0260-166b-4724-8480-7f42a296b444",
      traps: [
        {
          title: "Calling every mineral an ore",
          body: "A mineral is an ore only if the metal can be extracted from it profitably. Every ore is a mineral, but the reverse is not true.",
        },
        {
          title: "Pairing an ore with the wrong metal",
          body: "Bauxite is aluminium, haematite and magnetite are iron, zinc blende and calamine are zinc, cinnabar is mercury. Copper pyrites contains iron too, but it is the ore of copper.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimnex-concentration",
      name: "Concentrating an ore",
      intuition:
        "Before a metal can be taken out, most of the gangue must go. Each method uses some difference between the ore and the gangue: weight, magnetism, wetting by oil, or dissolving in a chemical.",
      definition:
        "- **Hydraulic washing** (gravity separation): a stream of water washes away the lighter gangue; the heavy ore stays. Used for heavy oxide ores.\n" +
        "- **Magnetic separation**: a magnet picks out a magnetic ore such as magnetite from the gangue.\n" +
        "- **Froth flotation**: for **sulphide ores**. The powdered ore is mixed with water and pine oil and air is blown in. The ore is wetted by oil and rises with the froth; the gangue, wetted by water, sinks.\n" +
        "- **Leaching**: the ore is **dissolved** in a suitable chemical and the gangue is left behind. Bauxite dissolves in sodium hydroxide (Bayer's process); gold and silver ores dissolve in sodium cyanide.",
      table: {
        columns: ["Method", "Based on", "Used for"],
        rows: [
          { cells: ["Hydraulic washing", "Ore heavier than gangue", "Heavy oxide ores"] },
          { cells: ["Magnetic separation", "Ore is magnetic", "Magnetite"] },
          {
            cells: ["Froth flotation", "Ore wetted by oil, gangue by water", "Sulphide ores: zinc blende, copper pyrites, iron pyrites"],
            noteAmber: "Sulphide ore means froth flotation.",
          },
          { cells: ["Leaching", "Ore dissolves in a chemical", "Bauxite (sodium hydroxide), gold and silver (sodium cyanide)"] },
        ],
        caption: "Leaching is the only chemical method of the four; the other three are physical.",
      },
      selfCheckExample: {
        prompt: "Copper pyrites is a sulphide ore. Which method is used to concentrate it?",
        steps: ["Sulphide ores are wetted by oil.", "That is the basis of froth flotation."],
        answer: "Froth flotation",
      },
      practiceSet: [
        { prompt: "On what property does magnetic separation depend?", answer: "The ore is magnetic and the gangue is not" },
        { prompt: "Which method uses a stream of water to wash away the lighter gangue?", answer: "Hydraulic washing" },
        { prompt: "In froth flotation, which is wetted by the oil: the ore or the gangue?", answer: "The ore" },
        { prompt: "Which chemical is used to leach gold and silver ores?", answer: "Sodium cyanide solution" },
      ],
      pyqExampleId: "6308d841-1a9a-4192-b358-3702f2e49d10",
      traps: [
        {
          title: "Using froth flotation for an oxide ore",
          body: "Froth flotation suits sulphide ores, which oil wets. A heavy oxide ore is concentrated by hydraulic washing, and a magnetic one by a magnet.",
        },
        {
          title: "Confusing leaching with washing",
          body:
            "Hydraulic washing only carries the gangue away with water. Leaching dissolves the ore itself in a chemical, such as bauxite in sodium hydroxide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spimnex-reduction",
      name: "Roasting, calcination and reduction",
      intuition:
        "Once the ore is concentrated, it is first turned into an oxide, because an oxide is easiest to reduce. Then the oxygen is taken away, and how that is done depends on how reactive the metal is.",
      definition:
        "- **Roasting**: a **sulphide** ore is heated strongly in plenty of **air** and becomes an oxide, giving off sulphur dioxide.\n" +
        "- **Calcination**: a **carbonate** ore is heated strongly in **limited air** and becomes an oxide, giving off carbon dioxide.\n" +
        "- **Reduction**: metals in the middle of the series (zinc, iron, lead) are reduced from their oxides by **carbon**.\n" +
        "- The most reactive metals (potassium, sodium, calcium, magnesium, aluminium) are got by **electrolysis** of their molten compounds.",
      authoredExample: {
        prompt: "Zinc is got from zinc blende, \\(\\mathrm{ZnS}\\). Write the two steps that turn the concentrated ore into zinc.",
        steps: [
          "Roast it in air: \\(\\mathrm{2ZnS + 3O_2 \\rightarrow 2ZnO + 2SO_2}\\).",
          "Reduce the oxide with carbon: \\(\\mathrm{ZnO + C \\rightarrow Zn + CO}\\).",
        ],
        answer: "Roasting to zinc oxide, then reduction with carbon.",
      },
      selfCheckExample: {
        prompt: "Calamine, \\(\\mathrm{ZnCO_3}\\), is heated strongly in limited air. What is this step called, and what does it give?",
        steps: ["A carbonate heated in limited air is calcined.", "\\(\\mathrm{ZnCO_3 \\rightarrow ZnO + CO_2}\\)."],
        answer: "Calcination; zinc oxide and carbon dioxide.",
      },
      practiceSet: [
        { prompt: "How are very reactive metals such as sodium and aluminium extracted?", answer: "By electrolysis of their molten compounds" },
        { prompt: "What is heating a sulphide ore strongly in air called?", answer: "Roasting" },
        { prompt: "Which gas is given off when a sulphide ore is roasted?", answer: "Sulphur dioxide" },
        { prompt: "Which element is used to reduce zinc oxide to zinc?", answer: "Carbon (coke)" },
      ],
      traps: [
        {
          title: "Swapping roasting and calcination",
          body:
            "Roasting is for sulphide ores, heated in plenty of air. Calcination is for carbonate ores, heated in limited air. Both end with an oxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimnex-heat",
      name: "Heat treatment of steel",
      intuition:
        "The same piece of steel can be made soft or hard just by how it is cooled after heating. Slow cooling softens it, sudden cooling hardens it, and a gentle reheat takes the edge off the brittleness.",
      definition:
        "- **Annealing**: heat the metal, then let it cool **slowly and uniformly**. It becomes softer and less brittle.\n" +
        "- **Quenching**: heat the metal red hot, then cool it **suddenly** in water or oil. It becomes hard and brittle.\n" +
        "- **Tempering**: reheat quenched steel to a moderate temperature and cool it slowly. It keeps its hardness but loses much of its brittleness.",
      table: {
        columns: ["Treatment", "How it is cooled", "Effect"],
        rows: [
          {
            cells: ["Annealing", "Slowly and uniformly", "Softer, less brittle"],
            noteAmber: "Slow cooling is annealing.",
          },
          { cells: ["Quenching", "Suddenly, in water or oil", "Hard and brittle"] },
          { cells: ["Tempering", "Reheated quenched steel, cooled slowly", "Hard but less brittle"] },
        ],
        caption: "Tempering always comes after quenching.",
      },
      selfCheckExample: {
        prompt: "A steel rod is made red hot and plunged into cold water. What is this called, and what does it do to the steel?",
        steps: ["Sudden cooling in water is quenching.", "It makes the steel hard but brittle."],
        answer: "Quenching: the steel becomes hard and brittle.",
      },
      practiceSet: [
        { prompt: "Which treatment reduces the brittleness of quenched steel?", answer: "Tempering" },
        { prompt: "Does annealing make steel harder or softer?", answer: "Softer" },
        { prompt: "In quenching, into what is the hot metal plunged?", answer: "Water or oil" },
      ],
      pyqExampleId: "481a6894-ddcb-46e5-b19b-e42e2a1cbd09",
      traps: [
        {
          title: "Mixing up annealing and quenching",
          body: "Annealing is slow, even cooling and softens the metal. Quenching is sudden cooling and hardens it.",
        },
        {
          title: "Tempering a metal that was never quenched",
          body: "Tempering is a second step: it reheats steel that has already been quenched, to reduce its brittleness.",
        },
      ],
    },
  ],
};
