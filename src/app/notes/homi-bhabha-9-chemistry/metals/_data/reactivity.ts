import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MT_REACTIVITY_NOTE: SubtopicNote = {
  subtopicName: "Reactivity Series and Displacement",
  title: "Reactivity Series and Displacement",
  oneLineDefinition:
    "The reactivity series lists metals from potassium, the most reactive, down to gold and platinum, the least; a metal displaces any metal below it from a solution of its salt, and never one above it.",
  whyItMatters:
    "Four questions in the bank, two EASY, one MODERATE and one HARD. One asks which metal is not a noble metal; three are about displacement: which beaker turns blue when copper is added, which displacement cannot take place, and ranking four metals from a table of what each one displaced.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mtre-series",
      name: "The reactivity series",
      intuition:
        "Some metals, like sodium, react so fast with water that they are kept under kerosene; others, like gold, stay shiny for thousands of years. Arranging metals from the most reactive to the least gives the reactivity series. Metals above hydrogen push hydrogen out of dilute acids; metals below it cannot.",
      definition:
        "- **Reactivity series**, most to least reactive: **K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au > Pt**.\n" +
        "- Metals **above hydrogen** give hydrogen gas with dilute acids. **Copper, mercury, silver, gold and platinum**, below hydrogen, do not.\n" +
        "- **Noble metals**, such as **gold, platinum, palladium and rhodium**, hardly react at all, so they keep their shine.\n" +
        "- Sodium and potassium react violently with water and are stored under kerosene.",
      table: {
        columns: ["Metals", "Reactivity", "With water", "With dilute acid"],
        rows: [
          { cells: ["Potassium, sodium, calcium", "Very high", "React with cold water (potassium and sodium violently)", "React very fast"] },
          { cells: ["Magnesium, aluminium, zinc, iron", "Moderate", "React only with hot water or steam", "Give hydrogen"] },
          { cells: ["Lead", "Low", "No reaction", "Reacts very slowly"] },
          { cells: ["Copper, mercury, silver", "Below hydrogen", "No reaction", "No hydrogen given"] },
          { cells: ["Gold, platinum (noble metals)", "Least", "No reaction", "No reaction"] },
        ],
        caption: "The higher a metal stands in the series, the more easily it loses electrons.",
      },
      selfCheckExample: {
        prompt: "Arrange in decreasing order of reactivity: copper, sodium, iron.",
        steps: ["Sodium is near the top of the series, iron in the middle and copper below hydrogen."],
        answer: "Sodium, iron, copper",
      },
      practiceSet: [
        { prompt: "Name a metal that does not give hydrogen gas with dilute hydrochloric acid.", answer: "Copper (or silver, gold, mercury, platinum)" },
        { prompt: "Which is more reactive, magnesium or zinc?", answer: "Magnesium" },
        { prompt: "Why are gold and platinum called noble metals?", answer: "They hardly react with air, water or acids, so they stay shiny" },
        { prompt: "Which is the most reactive of potassium, aluminium and lead?", answer: "Potassium" },
      ],
      pyqExampleId: "ef8b66de-bf91-4f00-bf91-7d4b74a8db4d",
      traps: [
        {
          title: "Putting aluminium below iron",
          body: "Aluminium is more reactive than iron. It seems not to corrode only because a thin oxide layer protects it.",
        },
        {
          title: "Thinking every metal gives hydrogen with an acid",
          body: "Only metals above hydrogen in the series do. Copper and silver give no hydrogen with dilute acids.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mtre-displacement",
      name: "Displacement of one metal by another",
      intuition:
        "Put a more reactive metal into the salt solution of a less reactive one, and it takes that metal's place: the less reactive metal comes out as a coating, and the solution often changes colour. The reverse never happens. So if you know the series you can say which reaction is possible, and if you see which reactions happen you can build the series.",
      definition:
        "- A metal **displaces** another from its salt solution **only if it is more reactive** (higher in the series).\n" +
        "- Iron in **blue** copper sulphate: the solution turns **pale green** (iron sulphate) and brown copper coats the iron.\n" +
        "- Copper in colourless **silver nitrate**: the solution turns **blue** (copper nitrate) and silver is deposited. Copper does nothing in zinc sulphate or iron sulphate.\n" +
        "- **Ranking from observations**: the metal that displaces the most others is the most reactive; the one that displaces none is the least.",
      authoredExample: {
        prompt: "Metals A, B and C are each placed in solutions of the salts of the other two. A displaces both B and C. C displaces B. B displaces neither. Arrange A, B and C in increasing order of reactivity.",
        steps: [
          "B displaces nothing, so it is the least reactive.",
          "C displaces one metal (B), so it comes next.",
          "A displaces both, so it is the most reactive.",
        ],
        answer: "B, C, A",
      },
      selfCheckExample: {
        prompt: "An iron nail is kept in copper sulphate solution for an hour. What do you see, and why?",
        steps: ["Iron is above copper in the reactivity series, so it displaces copper.", "Iron sulphate forms and copper is deposited."],
        answer: "The blue solution turns pale green and a brown coat of copper forms on the nail.",
      },
      practiceSet: [
        { prompt: "Can copper displace zinc from zinc sulphate solution?", answer: "No: copper is less reactive than zinc" },
        { prompt: "A strip of zinc is put into silver nitrate solution. Which metal is deposited?", answer: "Silver" },
        { prompt: "Why is copper sulphate solution not stored in an iron vessel?", answer: "Iron displaces copper from it, so the vessel would be eaten away" },
        { prompt: "Lead displaces copper from its salt, and zinc displaces lead. Arrange copper, lead and zinc in increasing order of reactivity.", answer: "Copper, lead, zinc" },
      ],
      pyqExampleId: "011164dd-1387-4d96-b3fd-a9d6619011ba",
      traps: [
        {
          title: "Expecting a less reactive metal to displace a more reactive one",
          body: "Copper placed in zinc sulphate solution does nothing. Only a metal higher in the series can displace one lower down.",
        },
        {
          title: "Expecting copper to colour every solution blue",
          body: "The blue colour appears only where copper actually reacts, as in silver nitrate. In zinc sulphate or iron sulphate copper does not react.",
        },
      ],
    },
  ],
};
