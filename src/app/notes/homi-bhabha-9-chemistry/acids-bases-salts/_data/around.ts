import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AB_AROUND_NOTE: SubtopicNote = {
  subtopicName: "Acids and Bases Around Us",
  title: "Acids and Bases Around Us",
  oneLineDefinition:
    "Acids taste sour and are found in fruits, curd, vinegar and ant stings; some acids are solids at room temperature, others are liquids or exist only in water, and each has its own everyday use.",
  whyItMatters:
    "Five questions in the bank, two EASY, two MODERATE and one HARD. Two match a natural source with its acid (tartaric acid in grapes, citric acid in oranges, formic acid in red ants), two ask which acids are solids at room temperature (the same question in 2017 and 2021), and one asks for a use of an acid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9abar-natural",
      name: "Natural acids and where they are found",
      intuition:
        "The sour taste of a lemon, of curd and of vinegar all come from acids. Plants and animals make these acids themselves, so they are called natural or organic acids. Each sour food has its own acid, and the papers ask you to match the food with the acid.",
      definition:
        "- Acids that come from plants and animals are **natural (organic) acids**. They are usually **weak** acids.\n" +
        "- Acids made from minerals are **mineral acids**. **Hydrochloric**, **sulphuric** and **nitric** acid are strong mineral acids.\n" +
        "- Acids taste **sour**. Never taste a laboratory acid to find out.\n" +
        "- Learn the pairs in the table: one wrong pair is enough to change the answer in a matching question.",
      table: {
        columns: ["Natural source", "Acid in it"],
        rows: [
          { cells: ["Lemon, orange and other citrus fruits", "Citric acid"] },
          { cells: ["Tamarind, grapes, unripe mango", "Tartaric acid"] },
          { cells: ["Tomato, spinach", "Oxalic acid"] },
          { cells: ["Curd, sour milk", "Lactic acid"] },
          { cells: ["Vinegar", "Acetic acid"] },
          { cells: ["Sting of a red ant, nettle leaves", "Formic acid"], noteAmber: "Red ants carry formic acid, not oxalic acid." },
          { cells: ["Amla", "Ascorbic acid (vitamin C)"] },
          { cells: ["Apple", "Malic acid"] },
        ],
        caption: "The pairs a matching question is built from.",
      },
      selfCheckExample: {
        prompt: "Which acid gives curd its sour taste, and which acid is found in tamarind?",
        steps: ["Curd forms when bacteria turn the sugar of milk into lactic acid.", "Tamarind, like grapes, contains tartaric acid."],
        answer: "Curd: lactic acid. Tamarind: tartaric acid.",
      },
      practiceSet: [
        { prompt: "Which acid is found in lemons and oranges?", answer: "Citric acid" },
        { prompt: "Which acid is present in vinegar?", answer: "Acetic acid" },
        { prompt: "Which acid does a red ant inject when it stings?", answer: "Formic acid" },
        { prompt: "Name the acid found in amla.", answer: "Ascorbic acid (vitamin C)" },
      ],
      pyqExampleId: "b7ba7286-2a8f-43ef-a0e3-3022f10fdff2",
      traps: [
        {
          title: "Putting citric acid in grapes",
          body: "Grapes and tamarind contain tartaric acid. Citric acid belongs to lemons, oranges and other citrus fruits.",
        },
        {
          title: "Calling the ant's acid oxalic acid",
          body: "The sting of a red ant carries formic acid. Oxalic acid is the acid of tomato and spinach.",
        },
        {
          title: "Thinking amla has citric acid because it is sour",
          body: "Amla is rich in ascorbic acid, which is vitamin C.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9abar-uses",
      name: "Common acids: their state and their uses",
      intuition:
        "Not every acid is a liquid in a bottle. Boric acid and oxalic acid come as white crystals. Hydrochloric acid in the laboratory is really a gas dissolved in water, and carbonic acid exists only while carbon dioxide stays dissolved in water, as in soda water.",
      definition:
        "- **Solids** at room temperature: **boric acid**, **oxalic acid**, **sulphamic acid**, **citric acid** and **tartaric acid** (white crystals).\n" +
        "- **Liquids**: **sulphuric acid**, **nitric acid** and **acetic acid**.\n" +
        "- **Only in solution**: **hydrochloric acid** is hydrogen chloride gas dissolved in water, and **carbonic acid** is carbon dioxide dissolved in water.\n" +
        "- Each common acid has a use you should know (see the table).",
      table: {
        columns: ["Acid", "State at room temperature", "A common use"],
        rows: [
          { cells: ["Hydrochloric acid, \\(\\mathrm{HCl}\\)", "Solution of a gas in water", "Cleaning metal surfaces; made in the stomach to help digestion"] },
          { cells: ["Sulphuric acid, \\(\\mathrm{H_2SO_4}\\)", "Thick, oily liquid", "Car batteries, making fertilizers"] },
          { cells: ["Nitric acid, \\(\\mathrm{HNO_3}\\)", "Liquid", "Making fertilizers and explosives"] },
          { cells: ["Carbonic acid, \\(\\mathrm{H_2CO_3}\\)", "Only in solution (carbon dioxide in water)", "Soda water and fizzy drinks"] },
          { cells: ["Boric acid, \\(\\mathrm{H_3BO_3}\\)", "Solid (white crystals)", "Mild antiseptic, eye wash, carrom powder"] },
          { cells: ["Oxalic acid", "Solid (crystals)", "Removing rust and ink stains"] },
          { cells: ["Sulphamic acid", "Solid (crystals)", "Removing hard-water scale"] },
          { cells: ["Acetic acid", "Liquid", "Vinegar for pickles and cooking"] },
        ],
        caption: "In a which-are-solids question, the three crystals boric, oxalic and sulphamic acid are the usual answer.",
      },
      selfCheckExample: {
        prompt: "Which of these acids are solids at room temperature: nitric acid, citric acid, acetic acid, boric acid?",
        steps: ["Nitric acid and acetic acid are liquids.", "Citric acid and boric acid are white crystals."],
        answer: "Citric acid and boric acid",
      },
      practiceSet: [
        { prompt: "Which acid is used in car batteries?", answer: "Sulphuric acid" },
        { prompt: "In what form does carbonic acid exist?", answer: "Only in solution, as carbon dioxide dissolved in water" },
        { prompt: "Which acid is used as a mild antiseptic and in carrom powder?", answer: "Boric acid" },
        { prompt: "Is the hydrochloric acid of the laboratory a pure liquid?", answer: "No: it is hydrogen chloride gas dissolved in water" },
      ],
      pyqExampleId: "46ce8f5f-79c4-4d1b-8f4c-1a57b5d3c213",
      traps: [
        {
          title: "Calling hydrochloric acid a liquid acid",
          body: "Pure hydrogen chloride is a gas. The hydrochloric acid we use is that gas dissolved in water, so it is never a solid acid.",
        },
        {
          title: "Calling carbonic acid a solid",
          body: "Carbonic acid cannot be kept on its own. It exists only as carbon dioxide dissolved in water.",
        },
      ],
    },
  ],
};
