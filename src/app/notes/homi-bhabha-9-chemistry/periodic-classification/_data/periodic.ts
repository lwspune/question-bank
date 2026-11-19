import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_EP_PERIODIC_NOTE: SubtopicNote = {
  subtopicName: "Metals, Non-metals and the Periodic Table",
  title: "Metals, Non-metals and the Periodic Table",
  oneLineDefinition:
    "Elements are metals, non-metals or metalloids; the modern periodic table arranges them by atomic number in 7 periods and 18 groups, with atoms getting smaller across a period and each group sharing its properties.",
  whyItMatters:
    "Seven questions in the bank, four EASY and three MODERATE. Three sort elements into metals, non-metals and metalloids or use the acidic nature of non-metal oxides; two compare atomic size across a period; two are about groups: why group 17 is called the halogens, and which noble gases fill a sodium vapour lamp.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9eppe-types",
      name: "Metals, non-metals and metalloids",
      intuition:
        "Most elements fall into one of two families. Metals are shiny, bend without breaking and carry electricity. Non-metals are dull, brittle when solid and do not carry electricity. A few elements sit in between and behave partly like each: these are the metalloids.",
      definition:
        "- Elements are classified into **metals**, **non-metals** and **metalloids**.\n" +
        "- **Oxides of metals** are **basic**: in water they turn red litmus **blue**.\n" +
        "- **Oxides of non-metals** are generally **acidic**: \\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\) and \\(\\mathrm{P_2O_5}\\) dissolve in water to give acids that turn blue litmus **red**.\n" +
        "- **Metalloids** (boron, silicon, germanium, arsenic) have properties between those of metals and non-metals.\n" +
        "- Exceptions: **mercury** is a liquid metal, **bromine** a liquid non-metal, and **graphite**, a form of carbon, conducts electricity.",
      table: {
        columns: ["Property", "Metals", "Non-metals"],
        rows: [
          { cells: ["Lustre", "Shiny", "Dull (iodine is an exception)"] },
          { cells: ["Heat and electricity", "Good conductors", "Poor conductors (graphite conducts)"] },
          { cells: ["When beaten or drawn", "Malleable and ductile", "Brittle when solid"] },
          { cells: ["State at room temperature", "Solid, except mercury", "Solid, liquid (bromine) or gas"] },
          { cells: ["Nature of oxide", "Basic", "Generally acidic"] },
          { cells: ["Examples", "Sodium, magnesium, iron, copper", "Carbon, sulphur, phosphorus, nitrogen, oxygen"] },
        ],
        caption: "Metalloids such as silicon and arsenic fall between the two columns.",
      },
      selfCheckExample: {
        prompt: "An element Y is shiny and conducts electricity. Its oxide dissolves in water and turns red litmus blue. Is Y a metal or a non-metal?",
        steps: ["Lustre and conduction point to a metal.", "A basic oxide (red litmus turns blue) confirms it."],
        answer: "A metal",
      },
      practiceSet: [
        { prompt: "What is the nature of the oxides of metals?", answer: "Basic" },
        { prompt: "Name one metalloid.", answer: "Silicon (or boron, germanium, arsenic)" },
        { prompt: "Which form of carbon, a non-metal, conducts electricity?", answer: "Graphite" },
        { prompt: "Which metal is a liquid at room temperature?", answer: "Mercury" },
      ],
      pyqExampleId: "b8c8a370-b658-4020-9ffe-dd67e1017ca0",
      traps: [
        {
          title: "Calling non-metal oxides basic",
          body: "Non-metal oxides such as \\(\\mathrm{SO_2}\\) and \\(\\mathrm{CO_2}\\) give acids in water. It is metal oxides that are basic.",
        },
        {
          title: "Saying no non-metal conducts",
          body: "Graphite is a non-metal (a form of carbon) and still conducts electricity. A clue like 'bad conductor' can rule carbon out.",
        },
        {
          title: "Treating metalloids as metals",
          body: "Metalloids are a third group with mixed properties. Silicon is a metalloid, not a metal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9eppe-trends",
      name: "The modern periodic table and atomic size",
      intuition:
        "Across a period each element has one more proton than the one before, but its electrons are still in the same shells. The bigger pull of the nucleus draws them in, so atoms shrink from left to right. Going down a group a new shell is added each time, so atoms grow.",
      definition:
        "- The **modern periodic table** arranges elements in order of **increasing atomic number** (Moseley).\n" +
        "- It has **7 periods** (horizontal rows) and **18 groups** (vertical columns).\n" +
        "- **Across a period, left to right**: atomic size **decreases**, metallic character **decreases**, and metals become **less reactive**.\n" +
        "- **Down a group**: atomic size **increases** and metallic character **increases**.\n" +
        "- Period 3 runs Na, Mg, Al, Si, P, S, Cl, Ar: metals on the left, a metalloid (Si) in the middle, non-metals on the right.",
      table: {
        columns: ["Change", "Across a period (left to right)", "Down a group"],
        rows: [
          { cells: ["Atomic size", "Decreases", "Increases"] },
          { cells: ["Metallic character", "Decreases", "Increases"] },
          { cells: ["Number of shells", "Stays the same", "Increases by one each step"] },
          { cells: ["Valence electrons", "Increase by one each step", "Stay the same"] },
        ],
        caption: "Group 1 and group 2 elements of the same period are both metals; the group 1 element is larger and more reactive.",
      },
      selfCheckExample: {
        prompt: "Arrange magnesium, sodium and chlorine, all in period 3, in decreasing order of atomic size.",
        steps: ["Across a period size decreases, and the order in period 3 is Na, Mg, then Cl."],
        answer: "Sodium, magnesium, chlorine",
      },
      practiceSet: [
        { prompt: "Which atom is larger, sodium or potassium, which lies below it in group 1?", answer: "Potassium: size increases down a group" },
        { prompt: "How many groups and periods does the modern periodic table have?", answer: "18 groups and 7 periods" },
        { prompt: "Does metallic character increase or decrease across a period from left to right?", answer: "It decreases" },
        { prompt: "On what property are elements arranged in the modern periodic table?", answer: "Increasing atomic number" },
      ],
      pyqExampleId: "7081f624-3c2d-433d-985c-94a81d36f4bb",
      traps: [
        {
          title: "Thinking more protons make a bigger atom across a period",
          body: "Across a period the shells stay the same and the stronger nucleus pulls them in, so atoms get smaller from left to right.",
        },
        {
          title: "Mixing up periods and groups",
          body: "Periods are the 7 horizontal rows; groups are the 18 vertical columns.",
        },
        {
          title: "Calling a group 2 element a non-metal",
          body: "Groups 1 and 2 are both metals (alkali metals and alkaline earth metals). The group 1 metal is the more reactive of the two.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9eppe-groups",
      name: "Halogens, noble gases and other families",
      intuition:
        "Elements in one group have the same number of electrons in their outer shell, so they behave alike. That is why whole groups have family names: the alkali metals all react fiercely with water, the halogens all form salts with metals, and the noble gases hardly react at all.",
      definition:
        "- **Group 1, alkali metals** (Li, Na, K): very reactive; sodium is kept under **kerosene**.\n" +
        "- **Group 2, alkaline earth metals** (Be, Mg, Ca).\n" +
        "- **Group 17, halogens** (F, Cl, Br, I): the name means **salt formers**, because they react with metals to form salts such as sodium chloride.\n" +
        "- **Group 18, noble gases** (He, Ne, Ar, Kr, Xe, Rn): their outer shell is full, so they are **inert** (valency zero).\n" +
        "- Uses of noble gases: **argon** in electric bulbs; **neon** in glowing advertising signs; **helium** in balloons; a **low pressure sodium vapour lamp** holds sodium with a little **neon and argon** to start it.",
      table: {
        columns: ["Group", "Family name", "Members", "Key fact"],
        rows: [
          { cells: ["1", "Alkali metals", "Lithium, sodium, potassium", "Very reactive metals"] },
          { cells: ["2", "Alkaline earth metals", "Beryllium, magnesium, calcium", "Reactive metals, less so than group 1"] },
          { cells: ["17", "Halogens", "Fluorine, chlorine, bromine, iodine", "Salt formers"] },
          {
            cells: ["18", "Noble gases", "Helium, neon, argon, krypton, xenon, radon", "Inert: full outer shell"],
            noteAmber: "Neon and argon start a low pressure sodium vapour lamp.",
          },
        ],
        caption: "The family name usually tells you the property the group shares.",
      },
      selfCheckExample: {
        prompt: "Why is argon, and not air, filled in electric bulbs?",
        steps: ["The hot filament would burn in the oxygen of air.", "Argon is a noble gas and does not react with the filament."],
        answer: "Argon is inert, so the filament does not burn away",
      },
      practiceSet: [
        { prompt: "Name two halogens.", answer: "Chlorine and bromine (also fluorine, iodine)" },
        { prompt: "To which group of the periodic table do the noble gases belong?", answer: "Group 18" },
        { prompt: "Which noble gas glows in advertising signs?", answer: "Neon" },
        { prompt: "Why is sodium kept under kerosene?", answer: "It is an alkali metal and reacts vigorously with air and water" },
      ],
      pyqExampleId: "b68327c5-1151-4efc-a10a-72a48ea8150d",
      traps: [
        {
          title: "Explaining 'halogen' as 'non-metal'",
          body: "Halogens are non-metals, but the name means salt former: they combine with metals to make salts.",
        },
        {
          title: "Putting nitrogen among the noble gases",
          body: "Nitrogen is in group 15, not group 18. The noble gases are helium, neon, argon, krypton, xenon and radon.",
        },
        {
          title: "Thinking noble gases react easily",
          body: "Their outer shell is full, so they are inert. That is why argon protects a bulb's filament.",
        },
      ],
    },
  ],
};
