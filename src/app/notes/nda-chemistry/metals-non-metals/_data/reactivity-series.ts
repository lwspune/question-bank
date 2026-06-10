import type { SubtopicNote } from "@/app/notes/_types";

export const REACTIVITY_SERIES_NOTE: SubtopicNote = {
  subtopicName: "Reactivity Series and Reactions with Water",
  title: "Reactivity Series and Reactions with Water",
  oneLineDefinition:
    "Metals ranked from most reactive (potassium) to least reactive (gold), and how each one behaves toward cold water, hot water and steam.",
  whyItMatters:
    "The highest-yield subtopic in the chapter — about 6 PYQs, recurring most years. " +
    "The bank tests it three ways: order the metals by reactivity, decide which metals react with cold water versus steam, and recall the alkali-metal melting-point trend. " +
    "Learn the reactivity series cold and most of these become one-line answers.",
  concepts: [
    // FOUNDATION — what makes a metal vs a non-metal (teach from zero, no PYQ)
    {
      kind: "reference" as const,
      slug: "metal-vs-nonmetal-properties",
      name: "Metals versus non-metals — the property contrast",
      intuition:
        "Before ranking metals, fix the basic contrast. Metals lose electrons easily, so they are shiny, bendable, conduct heat and electricity, and form basic oxides. Non-metals gain or share electrons, so they are dull, brittle, poor conductors, and form acidic oxides. This electron behaviour is what the whole chapter rests on.",
      definition:
        "The defining differences:\n" +
        "- **Metals** are **electropositive** — they lose electrons to form positive ions (cations). They are lustrous, malleable, ductile, good conductors of heat and electricity, and usually solid at room temperature (mercury is the liquid exception).\n" +
        "- **Non-metals** are **electronegative** — they gain or share electrons. They are dull, brittle when solid, poor conductors (graphite is the exception), and can be solid, liquid or gas.\n" +
        "- **Metal oxides are basic**; **non-metal oxides are acidic**.\n" +
        "- A more reactive metal is a stronger reducing agent because it gives up electrons more readily.",
      table: {
        columns: ["Property", "Metals", "Non-metals"],
        rows: [
          { cells: ["Electron behaviour", "Lose electrons (electropositive)", "Gain/share electrons (electronegative)"] },
          { cells: ["Appearance", "Lustrous (shiny)", "Dull (except graphite, iodine)"] },
          { cells: ["Malleability", "Malleable and ductile", "Brittle when solid"] },
          { cells: ["Conductivity", "Good conductors", "Poor conductors (except graphite)"] },
          {
            cells: ["Nature of oxide", "Basic", "Acidic"],
            noteAmber: "Metal oxide + water → base; non-metal oxide + water → acid. This is a common 'which statement is correct' test.",
          },
        ],
        caption: "Metals are electropositive and form basic oxides; non-metals are electronegative and form acidic oxides.",
      },
      practiceSet: [
        { prompt: "Are metals electropositive or electronegative?", answer: "Electropositive (they lose electrons)" },
        { prompt: "Is a metal oxide acidic or basic?", answer: "Basic" },
        { prompt: "Name the only metal that is liquid at room temperature.", answer: "Mercury" },
        { prompt: "Which non-metal conducts electricity?", answer: "Graphite (a form of carbon)" },
      ],
      traps: [
        {
          title: "Oxide nature is reversed for non-metals",
          body:
            "Metal oxides are **basic** and non-metal oxides are **acidic**. A statement claiming metal oxides are acidic, or non-metal oxides basic, is the wrong one.",
        },
      ],
    },

    // reactivity series order + reducing strength
    {
      kind: "reference" as const,
      slug: "reactivity-series-order",
      name: "The reactivity series — order of metals",
      intuition:
        "The reactivity series ranks metals from the one that loses electrons most eagerly (potassium) down to the one that barely reacts at all (gold). A metal higher in the series displaces any metal below it from its salt solution. The bank asks you to put four metals in decreasing order — memorise the spine of the list.",
      definition:
        "The reactivity series, most reactive first:\n" +
        "**K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au**\n" +
        "- The metals **above hydrogen** (K to Pb) displace hydrogen from acids; those **below** (Cu, Hg, Ag, Au) do not.\n" +
        "- A more reactive metal is a stronger **reducing agent** and is harder to extract from its ore.\n" +
        "- Decreasing-reactivity examples the bank uses: **Sodium > Iron > Copper > Silver**.",
      table: {
        columns: ["Reactivity", "Metals (in order)"],
        rows: [
          { cells: ["Most reactive", "Potassium (K), Sodium (Na), Calcium (Ca)"] },
          { cells: ["Moderately reactive", "Magnesium (Mg), Aluminium (Al), Zinc (Zn), Iron (Fe)"] },
          { cells: ["Least reactive", "Copper (Cu), Mercury (Hg), Silver (Ag), Gold (Au)"] },
        ],
        caption: "Decreasing reactivity: K > Na > Ca > Mg > Al > Zn > Fe > Pb > Cu > Hg > Ag > Au.",
      },
      pyqExampleId: "e1776ca5-baf3-4c97-be0a-8be0303f3f6e", // Sodium, Iron, Copper, Silver
      selfCheckExample: {
        prompt: "Arrange in decreasing order of reactivity: Copper, Zinc, Iron, Magnesium.",
        steps: [
          "From the series, the order high-to-low is Mg, then Zn, then Fe, then Cu.",
          "Magnesium is most reactive of the four; copper is least.",
        ],
        answer: "Magnesium > Zinc > Iron > Copper.",
      },
      practiceSet: [
        { prompt: "Which is more reactive, sodium or copper?", answer: "Sodium" },
        { prompt: "Which is the least reactive metal in the series?", answer: "Gold" },
        { prompt: "Order by decreasing reactivity: Silver, Iron, Sodium, Copper.", answer: "Sodium > Iron > Copper > Silver" },
        { prompt: "Which metals do NOT displace hydrogen from acids?", answer: "Copper, mercury, silver, gold (below hydrogen)" },
      ],
      traps: [
        {
          title: "Iron beats copper, copper beats silver",
          body:
            "A common wrong ordering swaps copper and iron, or copper and silver. The correct decreasing order is **Sodium > Iron > Copper > Silver** — iron is above copper, copper is above silver.",
        },
      ],
    },

    // reactions with water — cold water / steam, floating, melting points
    {
      kind: "reference" as const,
      slug: "reactions-with-water",
      name: "Reactions with water and alkali-metal trends",
      intuition:
        "How violently a metal reacts with water tracks its place in the series. Potassium and sodium react with cold water and float; magnesium and iron need hot water or steam; copper does nothing. Alongside this the bank tests one physical trend — alkali-metal melting points fall as you go down the group, so caesium melts lowest.",
      definition:
        "What reacts with what:\n" +
        "- **K, Na, Ca** react with **cold water**, releasing hydrogen. **Potassium and sodium are less dense than water and float** during the reaction.\n" +
        "- **Magnesium** reacts only with **hot water / steam** — it does **NOT** react with cold water.\n" +
        "- **Iron** reacts slowly with **steam**, not cold water, so it does **NOT** liberate hydrogen from cold water.\n" +
        "- **Copper** does not react with water at all.\n" +
        "- **Alkali-metal melting points decrease down the group** (Li > Na > K > Rb > Cs), so **caesium has the lowest melting point** (about 28.5 °C).\n" +
        "- The reactivity-with-water order the bank uses: **Zinc > Iron > Lead > Copper**.",
      table: {
        columns: ["Metal", "Reacts with water?", "Note"],
        rows: [
          {
            cells: ["Potassium / Sodium", "Yes, with cold water", "Float and react vigorously (less dense than water)"],
            noteAmber: "Both K and Na float on water; potassium reacts even more vigorously than sodium.",
          },
          { cells: ["Calcium", "Yes, with cold water", "Reacts steadily, releasing H₂"] },
          { cells: ["Magnesium", "No (cold); yes with steam", "Does NOT react with cold water"] },
          { cells: ["Iron", "No (cold); slow with steam", "Does NOT liberate H₂ from cold water"] },
          { cells: ["Copper", "No", "Below hydrogen — does not react with water"] },
        ],
        caption: "Reactivity with water: Zinc > Iron > Lead > Copper. Caesium has the lowest alkali-metal melting point.",
      },
      pyqExampleId: "86b7fac1-11ea-475a-b291-d2813262d58d", // metal that floats in cold water — potassium
      selfCheckExample: {
        prompt: "Two metals are dropped in cold water: one floats and fizzes, the other sits unreacted. Identify likely candidates.",
        steps: [
          "A metal that floats and reacts vigorously with cold water is an alkali metal such as sodium or potassium.",
          "A metal that does not react with cold water sits below calcium in reactivity — for example copper, or magnesium (which needs steam).",
        ],
        answer: "Floating + reacting = potassium (or sodium); unreacted = copper (or magnesium).",
      },
      practiceSet: [
        { prompt: "Which metal floats in cold water while reacting?", answer: "Potassium (also sodium)" },
        { prompt: "Does magnesium react with cold water?", answer: "No — it needs hot water or steam" },
        { prompt: "Which alkali metal has the lowest melting point?", answer: "Caesium" },
        { prompt: "Does iron liberate hydrogen from cold water?", answer: "No" },
        { prompt: "Reactivity-with-water order of Zn, Fe, Pb, Cu?", answer: "Zinc > Iron > Lead > Copper" },
      ],
      traps: [
        {
          title: "Magnesium and iron do NOT react with cold water",
          body:
            "Only the most reactive metals (K, Na, Ca) react with **cold** water. Magnesium and iron react only with **steam**, so a 'reacts with cold water' claim for them is false.",
        },
        {
          title: "Melting point falls DOWN the alkali group",
          body:
            "Among alkali metals melting point **decreases** going down (Na > K > Rb > Cs), so caesium is lowest — not sodium. Bigger atoms = weaker metallic bonding = lower melting point.",
        },
      ],
    },
  ],
};
