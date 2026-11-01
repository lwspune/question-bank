import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GOC_OCEANS_NOTE: SubtopicNote = {
  subtopicName: "Tides, Salinity and Coral Reefs",
  title: "Tides, Salinity and Coral Reefs",
  oneLineDefinition:
    "Why the sea rises and falls twice a day, spring and neap tides, how salt sets the layers of the sea, and India's coral reefs and why corals bleach.",
  whyItMatters:
    "Seven questions in the bank: two from the 2023 shifts, three from the 2024 shifts and two from the 2025 shifts. Each is a single fact about tides, salt or corals, so one short list covers them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgococ-water",
      name: "Tides and salinity",
      intuition:
        "The moon and the sun pull the sea, so it rises and falls on a schedule. Salt makes water heavier, so salty water sinks under fresh. Both facts explain the questions on this page.",
      definition:
        "Tides:\n" +
        "- The pull of the **moon and the sun** makes most coasts rise and fall **twice a day**.\n" +
        "- **Spring tides** (highest) come when the sun, moon and Earth are in a **line**, at new and full moon.\n" +
        "- **Neap tides**, with the smallest range, come when the two pulls work at **right angles** as seen from the Earth.\n\n" +
        "Salinity:\n" +
        "- Less salty water is **lighter**, so it lies **above** saltier water.\n" +
        "- The open ocean holds about **35 grams** of salt per litre; the **Dead Sea** about ten times as much, which is why people float in it.",
      table: {
        columns: ["Tide", "Sun and moon"],
        rows: [
          { cells: ["Spring tide", "In a line with the Earth"] },
          { cells: ["Neap tide", "At right angles"] },
        ],
      },
      pyqExampleId: "5afd2a86-1601-4bfc-9947-7101722283cf",
      selfCheckExample: {
        prompt: "At full moon, will the tide range be large or small, and why?",
        steps: ["At full moon all three bodies stand in one straight line.", "Their pulls add up, giving a spring tide with a large range."],
        answer: "Large: a spring tide.",
      },
      practiceSet: [
        { prompt: "How many times a day does the sea rise and fall on most coasts?", answer: "Twice" },
        { prompt: "Does less salty water lie above or below saltier water?", answer: "Above" },
        { prompt: "About how much salt is in a litre of ocean water?", answer: "About 35 grams" },
      ],
      traps: [
        {
          title: "Neap is right angles, not a line",
          body: "A **line** of sun, moon and Earth gives a **spring** tide. **Right angles** give a **neap** tide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgococ-coral",
      name: "Coral reefs",
      intuition:
        "Corals need warm, clear, shallow sea, and they are fragile: if the water gets too warm they lose the algae that feed them and turn white.",
      definition:
        "The facts:\n" +
        "- India's four main coral reef areas: the **Gulf of Kutch**, the **Gulf of Mannar**, **Lakshadweep**, and the **Andaman and Nicobar** islands.\n" +
        "- **Coral bleaching** happens when warmer water makes corals throw out the algae that live in them. The main cause is a **rise in sea temperature** brought about by people.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Main cause of bleaching", "Rising sea temperature"], pyqExampleId: "94d0a671-5286-43f6-a419-36debee2aefa" },
          { cells: ["Reef areas of India", "Gulf of Kutch, Gulf of Mannar, Lakshadweep, Andaman and Nicobar"] },
        ],
      },
      pyqExampleId: "b7a0ed16-d5d3-4fad-915b-b1206ff90596",
      selfCheckExample: {
        prompt: "Why do coral reefs not grow off the mouths of India's big eastern rivers?",
        steps: ["Corals need clear, warm, shallow water.", "River mouths carry mud and fresh water, which corals cannot live in."],
        answer: "The water there is muddy and fresh.",
      },
      practiceSet: [
        { prompt: "Name two of India's coral reef areas.", answer: "Any two of: Gulf of Kutch, Gulf of Mannar, Lakshadweep, Andaman and Nicobar" },
        { prompt: "What mainly causes coral bleaching?", answer: "A rise in sea temperature" },
      ],
      traps: [
        {
          title: "Bleaching is about heat",
          body: "Coral bleaching is driven mainly by **warmer sea water**. Deep-sea mining and Arctic ice melt are decoys.",
        },
      ],
    },
  ],
};
