import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XNI_INDICES_NOTE: SubtopicNote = {
  subtopicName: "Economic Indices and Reports",
  title: "Economic Indices and Reports",
  oneLineDefinition:
    "Which body publishes each global index or report, what each one measures, and the Phillips curve.",
  whyItMatters:
    "Sixteen questions in the bank, and 15 of them come from the 2025 shifts: global indices were new to the 2025 papers. Nearly every question asks who publishes an index or what it measures, so the publisher table is the whole job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxniix-publishers",
      name: "Who publishes which index",
      intuition:
        "Each global index belongs to one organisation. The options are always other real organisations, so the only way through is to know the pairs.",
      definition:
        "The pairs:\n" +
        "- **Index of Economic Freedom**: the **Heritage Foundation**, a conservative think tank in Washington.\n" +
        "- **Logistics Performance Index**: the **World Bank**.\n" +
        "- **World Competitiveness Ranking**: the **IMD** business school in Switzerland. It measures how well a country lets **enterprises compete**.\n" +
        "- **Global Gender Gap Report** and the **Travel and Tourism Development Index**: the **World Economic Forum**. The gender gap is measured in **economy, education, health and politics**.\n" +
        "- **World Happiness Report**: the UN Sustainable Development Solutions Network, **not the UNDP**. It counts social support and freedom among its factors.\n" +
        "- **Sustainable Development Report**: tracks the 17 **Sustainable Development Goals**.\n" +
        "- **Corruption Perceptions Index**: Transparency International.",
      table: {
        columns: ["Index or report", "Published by"],
        rows: [
          { cells: ["Index of Economic Freedom", "Heritage Foundation"], pyqExampleId: "7c66aa96-c26a-4176-8c9a-1ce271ab8491" },
          { cells: ["World Competitiveness Ranking", "IMD, Switzerland"], pyqExampleId: "b94117df-8b4c-4a0e-aca7-c63b3a55c00e" },
          { cells: ["Global Gender Gap Report", "World Economic Forum"], pyqExampleId: "b526e7ee-d58f-409e-87b5-1f1b33bf57bd" },
          { cells: ["Travel and Tourism Development Index", "World Economic Forum"], pyqExampleId: "e4997692-53e5-4a62-a2b7-1347864e0f65" },
          { cells: ["Corruption Perceptions Index", "Transparency International"] },
        ],
      },
      pyqExampleId: "a7862cd0-f8a5-4096-b66c-a07f1f72e90d",
      selfCheckExample: {
        prompt: "Name the publishers of the Logistics Performance Index and the Index of Economic Freedom.",
        steps: ["The Logistics Performance Index is the World Bank's.", "The Index of Economic Freedom is the Heritage Foundation's."],
        answer: "World Bank; Heritage Foundation.",
      },
      practiceSet: [
        { prompt: "Which business school publishes the World Competitiveness Ranking?", answer: "IMD, in Switzerland" },
        { prompt: "In which four areas does the Global Gender Gap Report measure gaps?", answer: "Economy, education, health and politics" },
        { prompt: "Which goals does the Sustainable Development Report track?", answer: "The Sustainable Development Goals" },
      ],
      traps: [
        {
          title: "The Happiness Report is not the UNDP's",
          body: "The UNDP publishes the **Human Development** Index. The **World Happiness Report** comes from a different UN network.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxniix-measures",
      name: "What the indices and curves measure",
      intuition:
        "Some questions ask what a score means or what an index left out. Learn which way each scale runs and the one curve SSC names.",
      definition:
        "The facts:\n" +
        "- **Corruption Perceptions Index**: scores run from **0 (highly corrupt)** to 100 (very clean), so a **low** score means **more** corruption.\n" +
        "- **Ease of Doing Business** (World Bank): it used **10** indicators, starting a business among them, without giving that one the most weight, and it left out the **informal** sector, which is hard to measure the same way everywhere.\n" +
        "- **Index of Economic Freedom**: its **Government Size** pillar looks at government spending and the tax burden.\n" +
        "- **Logistics Performance Index 2023**: added indicators of **trade speed from big data** on shipments.\n" +
        "- **Phillips curve**: the inverse relation between the rate of change of **money wages** and **unemployment**.\n" +
        "- India ranks below most South Asian neighbours on happiness, but its income per head is **not** the lowest in South Asia.",
      table: {
        columns: ["Index or idea", "Remember"],
        rows: [
          { cells: ["Corruption Perceptions Index", "Low score means more corruption"] },
          { cells: ["Ease of Doing Business", "10 indicators; informal sector left out"], pyqExampleId: "634a684a-37c6-4b54-93e1-3798b9f73cf6" },
          { cells: ["Phillips curve", "Wage change against unemployment"], pyqExampleId: "9f5f3c25-6f96-48ac-88cc-613f76b014af" },
          { cells: ["LPI 2023", "Big-data trade-speed indicators"], pyqExampleId: "ceb3ced5-dad4-482d-9e92-18d78074ed64" },
        ],
      },
      pyqExampleId: "700ec98f-da97-4c63-9b9c-fb7b73a18618",
      selfCheckExample: {
        prompt: "Country X scores 25 and country Y scores 80 on the Corruption Perceptions Index. Which is seen as more corrupt?",
        steps: ["The scale runs from 0 (highly corrupt) to 100 (very clean).", "25 is nearer 0, so X is seen as more corrupt."],
        answer: "Country X.",
      },
      practiceSet: [
        { prompt: "What relationship does the Phillips curve show?", answer: "Between the rate of change of money wages and unemployment" },
        { prompt: "How many indicators did the Ease of Doing Business ranking use?", answer: "10" },
        { prompt: "What does the Government Size pillar of the Index of Economic Freedom look at?", answer: "Government spending and the tax burden" },
      ],
      traps: [
        {
          title: "Starting a business was not given the most weight",
          body: "Starting a business was **one of 10** indicators. A statement that it carried the most weight is false.",
        },
      ],
    },
  ],
};
