import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MN_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Properties of Metals, Non-Metals and Metalloids",
  title: "Properties of Metals, Non-Metals and Metalloids",
  oneLineDefinition:
    "The physical properties that mark a metal, the non-metals that break the rules, and the metalloids that sit between.",
  whyItMatters:
    "Five CDS questions, all EASY or MODERATE. Each asks for one property by its name (sonorous, ductile) or for the exception to a rule, such as the non-metal that shines.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschmn-metal-properties",
      name: "Physical properties of metals",
      intuition:
        "Metals share a set of properties because their outer electrons are free to move: they shine, bend without breaking, carry heat and electricity, and ring when struck. Each property has a one-word name, and CDS asks for the name.",
      definition:
        "The words to know:\n" +
        "- **Malleable**: can be beaten into sheets. **Ductile**: can be drawn into wires. **Gold** is the most malleable and ductile metal; silver is next.\n" +
        "- **Sonorous**: rings when struck, which is why **bells** are made of metal.\n" +
        "- **Lustrous**: shiny surface.\n" +
        "- **Conductors**: **silver** is the best conductor of heat and electricity, then **copper**. **Lead** and **mercury** are poor conductors for metals.\n" +
        "- Exceptions: **mercury** is a liquid at room temperature; **sodium** and **potassium** are soft enough to cut with a knife.",
      table: {
        columns: ["Property", "Meaning", "Example"],
        rows: [
          {
            cells: ["Malleable and ductile", "Beaten into sheets; drawn into wires", "Gold, the best at both"],
            pyqExampleId: "5e7a81ed-b6dd-40c7-999f-8b296fdb8771",
          },
          {
            cells: ["Sonorous", "Rings when struck", "School bells"],
            pyqExampleId: "eb6a9a55-999f-496f-895f-6ddc74e8109f",
          },
          { cells: ["Lustrous", "Shiny surface", "Polished silver"] },
          {
            cells: ["Good conductor", "Carries heat and electricity", "Silver best, then copper"],
            noteAmber: "CDS 2022 (II): silver and copper are the pair of very good heat conductors; lead and mercury are poor.",
            pyqExampleId: "416becae-a2da-42d0-af09-52bd9ab83818",
          },
        ],
      },
      pyqExampleId: "416becae-a2da-42d0-af09-52bd9ab83818",
      practiceSet: [
        { prompt: "What is the property that lets a metal be drawn into wire?", answer: "Ductility" },
        { prompt: "Why are bells made of metal?", answer: "Metals are sonorous: they ring when struck" },
        { prompt: "Which metal is the most malleable?", answer: "Gold" },
        { prompt: "Which metal is a liquid at room temperature?", answer: "Mercury" },
      ],
      traps: [
        {
          title: "Mercury is neither malleable nor ductile",
          body: "Mercury is a liquid at room temperature, so it cannot be beaten or drawn. Among Na, Au, Ce and Hg, only **gold** is clearly both malleable and ductile.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschmn-non-metals",
      name: "Non-metals that break the rules, and metalloids",
      intuition:
        "Non-metals are usually dull, brittle and poor conductors. CDS asks about the exceptions: iodine is shiny, graphite conducts. Metalloids sit on the boundary and show a little of both.",
      definition:
        "The exceptions and the in-between:\n" +
        "- **Iodine** is a non-metal with a **metallic lustre**.\n" +
        "- **Graphite** (carbon) conducts electricity; **diamond** (carbon) is the hardest natural substance.\n" +
        "- **Metalloids** show properties of both metals and non-metals: **boron, silicon, germanium, arsenic, antimony, tellurium**. Silicon and germanium are **semiconductors**.\n" +
        "- Coke is a form of carbon and sugar a compound of carbon; neither is a metalloid.",
      table: {
        columns: ["Element", "Kind", "Notable property"],
        rows: [
          {
            cells: ["Iodine", "Non-metal", "Lustrous (shiny)"],
            noteAmber: "CDS 2021 (I): iodine is the non-metal that is lustrous. Silicon and germanium are metalloids, not non-metals.",
            pyqExampleId: "d5aadc28-a833-4038-aa70-c8115841167f",
          },
          { cells: ["Graphite", "Non-metal (carbon)", "Conducts electricity"] },
          { cells: ["Diamond", "Non-metal (carbon)", "Hardest natural substance"] },
          {
            cells: ["Germanium", "Metalloid", "Semiconductor"],
            pyqExampleId: "024ce928-93f2-4b2d-bbbf-86a923b70062",
          },
          { cells: ["Silicon", "Metalloid", "Semiconductor"] },
          { cells: ["Boron, arsenic, antimony, tellurium", "Metalloids", "Properties of both metals and non-metals"] },
        ],
      },
      pyqExampleId: "024ce928-93f2-4b2d-bbbf-86a923b70062",
      practiceSet: [
        { prompt: "Which non-metal is lustrous?", answer: "Iodine" },
        { prompt: "Is boron a metal, a non-metal or a metalloid?", answer: "A metalloid" },
        { prompt: "Which form of carbon conducts electricity?", answer: "Graphite" },
        { prompt: "Is arsenic a metal, a non-metal or a metalloid?", answer: "A metalloid" },
      ],
      traps: [
        {
          title: "Silicon and germanium are metalloids",
          body: "When a question asks for a **non-metal** that shines, silicon and germanium are wrong: they are metalloids. The answer is **iodine**.",
        },
      ],
    },
  ],
};
