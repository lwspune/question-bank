import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MT_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties, Uses and Ores of Metals",
  title: "Properties, Uses and Ores of Metals",
  oneLineDefinition:
    "Metals are lustrous, malleable, ductile conductors that lose electrons and form basic oxides; zinc and aluminium also react with bases, and every metal is obtained from its own ores.",
  whyItMatters:
    "Six questions in the bank, two EASY, one MODERATE and three HARD. One puts metals in order of malleability and one pairs metals with their uses; two are about zinc and aluminium, which give hydrogen with both an acid and a base; and two ask which ore belongs to which metal.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mtpr-physical",
      name: "Physical properties and uses of metals",
      intuition:
        "Most metals shine, ring when struck, can be beaten into sheets (malleable) and drawn into wires (ductile), and carry heat and electricity well. Each metal is used for the property it has most: gold for thin leaf and jewellery, copper for wires, tungsten, which melts only at a very high temperature, for bulb filaments.",
      definition:
        "- Metals have **lustre**, are **sonorous**, **malleable** and **ductile**, and are **good conductors** of heat and electricity.\n" +
        "- **Malleability**, most to less: **gold, silver, aluminium, copper, tin, platinum**. Gold is also the most ductile metal.\n" +
        "- **Electrical conductivity**: **silver** is the best conductor, then **copper**. Copper is used for wires because it is much cheaper.\n" +
        "- Exceptions: **mercury** is a liquid at room temperature; **sodium and potassium** are soft enough to cut with a knife; **tungsten** has the highest melting point of all metals.\n" +
        "- **Magnesium** burns with a dazzling white light; **thorium** is a nuclear fuel.",
      table: {
        columns: ["Metal", "Property used", "Use"],
        rows: [
          { cells: ["Gold", "Most malleable and ductile; does not tarnish", "Jewellery, gold leaf"] },
          { cells: ["Silver", "Best conductor of electricity", "Jewellery, electrical contacts"] },
          { cells: ["Copper", "Very good conductor, ductile", "Electric wires, vessels"] },
          { cells: ["Aluminium", "Light, malleable, good conductor", "Foil, aircraft bodies, power cables"] },
          { cells: ["Tungsten", "Highest melting point of all metals", "Filament of electric bulbs"] },
          { cells: ["Magnesium", "Burns with a dazzling white light", "Flash bulbs, fireworks"] },
          { cells: ["Mercury", "Liquid at room temperature", "Thermometers"] },
          { cells: ["Thorium", "Radioactive", "Nuclear fuel for atomic energy"] },
        ],
        caption: "Sodium compounds are used in glass, soap and paper making; potassium compounds mainly as fertilizers.",
      },
      selfCheckExample: {
        prompt: "Why are electric wires made of copper and not of iron?",
        steps: ["Copper conducts electricity much better than iron.", "Copper is also very ductile, so it is easily drawn into wires."],
        answer: "Copper is a far better conductor and is easily drawn into wires.",
      },
      practiceSet: [
        { prompt: "Which metal is used for the filament of an electric bulb, and why?", answer: "Tungsten, because it has the highest melting point of all metals" },
        { prompt: "Which metal is the best conductor of electricity?", answer: "Silver" },
        { prompt: "Which metal burns with a dazzling white light?", answer: "Magnesium" },
        { prompt: "Name two metals that are soft enough to be cut with a knife.", answer: "Sodium and potassium" },
      ],
      pyqExampleId: "31e787a0-26f6-4fcf-8509-4535f2326108",
      traps: [
        {
          title: "Calling copper the best conductor",
          body: "Silver conducts electricity best. Copper comes second and is used for wires because it is much cheaper.",
        },
        {
          title: "Putting platinum near the top for malleability",
          body: "Platinum is precious but less malleable than gold, silver and aluminium. Gold is the most malleable metal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mtpr-amphoteric",
      name: "Metals as electropositive elements and amphoteric metals",
      intuition:
        "Metals give up their outer electrons easily, so they form positive ions and are called electropositive. Their oxides usually behave as bases. Zinc and aluminium are double-sided: they react with acids like any metal, but also with a strong base such as caustic soda, and both times hydrogen gas bubbles off. Their oxides are double-sided too.",
      definition:
        "- Metals **lose electrons** to form positive ions: they are **electropositive**. Non-metals gain electrons: they are **electronegative**.\n" +
        "- Most **metal oxides are basic** (they react with acids); most **non-metal oxides are acidic**.\n" +
        "- **Zinc and aluminium** react with **dilute acids** and with **sodium hydroxide** (caustic soda), giving a salt and **hydrogen** gas each time: \\(\\mathrm{Zn + 2NaOH \\rightarrow Na_2ZnO_2 + H_2}\\).\n" +
        "- Their oxides, \\(\\mathrm{ZnO}\\) and \\(\\mathrm{Al_2O_3}\\), are **amphoteric**: they show both basic and acidic nature.\n" +
        "- Such metals are still metals, so they are still **electropositive**.",
      table: {
        columns: ["Kind of oxide", "Reacts with", "Examples"],
        rows: [
          { cells: ["Basic", "Acids", "\\(\\mathrm{Na_2O}\\), \\(\\mathrm{MgO}\\), \\(\\mathrm{CaO}\\)"] },
          { cells: ["Acidic", "Bases", "\\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\)"] },
          { cells: ["Amphoteric", "Both acids and bases", "\\(\\mathrm{ZnO}\\), \\(\\mathrm{Al_2O_3}\\)"] },
          { cells: ["Neutral", "Neither", "\\(\\mathrm{CO}\\), \\(\\mathrm{N_2O}\\)"] },
        ],
        caption: "A metal that gives hydrogen with both an acid and a base has an amphoteric oxide.",
      },
      selfCheckExample: {
        prompt: "An oxide reacts with dilute hydrochloric acid and also with sodium hydroxide solution, giving a salt and water each time. What kind of oxide is it?",
        steps: ["Reacting with an acid shows basic nature.", "Reacting with a base shows acidic nature."],
        answer: "Amphoteric",
      },
      practiceSet: [
        { prompt: "Is magnesium oxide an acidic or a basic oxide?", answer: "Basic" },
        { prompt: "Which gas is given off when zinc reacts with sodium hydroxide solution?", answer: "Hydrogen" },
        { prompt: "Do metals gain or lose electrons when they form ions?", answer: "They lose electrons, so they are electropositive" },
        { prompt: "Is sulphur dioxide an acidic or a basic oxide?", answer: "Acidic" },
      ],
      pyqExampleId: "5c2abab5-e388-4901-b830-0bd713b80675",
      traps: [
        {
          title: "Thinking every metal oxide is basic",
          body: "Zinc oxide and aluminium oxide react with bases as well as acids: they are amphoteric.",
        },
        {
          title: "Calling an amphoteric metal electronegative",
          body: "Zinc and aluminium react with bases, but they are still metals that lose electrons, so they are electropositive.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mtpr-ores",
      name: "Ores of metals",
      intuition:
        "Most metals are found in the earth joined with other elements as minerals. A mineral from which a metal can be extracted profitably is that metal's ore. Ore names are worth learning as pairs: the paper often hides one ore of another metal among three ores of the same metal.",
      definition:
        "- A **mineral** is a naturally occurring compound of a metal. An **ore** is a mineral from which the metal can be extracted **profitably**.\n" +
        "- **Iron**: haematite, magnetite, limonite, siderite. **Aluminium**: bauxite, cryolite. **Zinc**: zinc blende, calamine (smithsonite). **Lead**: galena. **Mercury**: cinnabar. **Copper**: copper pyrites.\n" +
        "- **Calcite** and limestone are calcium carbonate; **carnallite** is a chloride of potassium and magnesium.",
      table: {
        columns: ["Metal", "Ore", "Formula"],
        rows: [
          { cells: ["Iron", "Haematite", "\\(\\mathrm{Fe_2O_3}\\)"] },
          { cells: ["Iron", "Magnetite", "\\(\\mathrm{Fe_3O_4}\\)"] },
          { cells: ["Iron", "Siderite", "\\(\\mathrm{FeCO_3}\\)"] },
          { cells: ["Aluminium", "Bauxite", "\\(\\mathrm{Al_2O_3 \\cdot 2H_2O}\\)"] },
          { cells: ["Aluminium", "Cryolite", "\\(\\mathrm{Na_3AlF_6}\\)"] },
          { cells: ["Zinc", "Zinc blende", "\\(\\mathrm{ZnS}\\)"] },
          { cells: ["Zinc", "Calamine (smithsonite)", "\\(\\mathrm{ZnCO_3}\\)"] },
          { cells: ["Lead", "Galena", "\\(\\mathrm{PbS}\\)"] },
          { cells: ["Mercury", "Cinnabar", "\\(\\mathrm{HgS}\\)"] },
          { cells: ["Calcium", "Calcite, limestone", "\\(\\mathrm{CaCO_3}\\)"] },
        ],
        caption: "Limonite is a hydrated iron oxide, so it belongs with the iron ores.",
      },
      selfCheckExample: {
        prompt: "Galena is an ore of which metal?",
        steps: ["Galena is lead sulphide, \\(\\mathrm{PbS}\\)."],
        answer: "Lead",
      },
      practiceSet: [
        { prompt: "Which metal is obtained from cinnabar?", answer: "Mercury" },
        { prompt: "What is the formula of haematite?", answer: "\\(\\mathrm{Fe_2O_3}\\)" },
        { prompt: "Zinc blende is an ore of which metal?", answer: "Zinc" },
        { prompt: "What makes a mineral an ore?", answer: "The metal can be extracted from it profitably" },
      ],
      pyqExampleId: "126399bf-c0dd-4519-914f-478ad3bf9b50",
      traps: [
        {
          title: "Mixing up calamine and calcite",
          body: "Calamine is zinc carbonate, an ore of zinc. Calcite is calcium carbonate.",
        },
        {
          title: "Calling cryolite an iron ore",
          body: "Cryolite, \\(\\mathrm{Na_3AlF_6}\\), contains aluminium. It is used with bauxite in extracting aluminium.",
        },
      ],
    },
  ],
};
