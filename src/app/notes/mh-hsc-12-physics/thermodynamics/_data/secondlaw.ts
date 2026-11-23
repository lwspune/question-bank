import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_SECONDLAW_NOTE: SubtopicNote = {
  subtopicName: "Second Law of Thermodynamics",
  title: "The Second Law of Thermodynamics",
  oneLineDefinition:
    "Why heat flows on its own only from hot to cold, and why no engine can turn all its heat into work: the Kelvin-Planck and Clausius statements.",
  whyItMatters:
    "1 question, a textbook multiple-choice item on what the second law deals with, and none from board papers. Learn the two statements word for word anyway: they are short, exact sentences, and they explain why every heat engine, refrigerator and Carnot engine in this chapter needs both a hot and a cold reservoir.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscptd-second-law",
      name: "Kelvin-Planck and Clausius statements",
      intuition:
        "The first law would allow a cold drink to get colder while the warm room gets warmer, as long as the energy balances. That never happens. The second law adds the missing rule about direction: heat flows on its own only from hot to cold, and heat can never be turned completely into work.",
      definition:
        "- **Limitation of the first law:** it does not say in which direction heat flows, or whether all of a quantity of heat can be turned into work.\n" +
        "- **Kelvin-Planck statement:** it is impossible to extract an amount of heat \\(Q_H\\) from a hot reservoir and use it all to do work W. Some amount of heat \\(Q_C\\) must be exhausted to a cold reservoir. So no heat engine can be 100% efficient.\n" +
        "- **Clausius statement:** energy will not flow spontaneously from an object at a low temperature to an object at a higher temperature. Heat can be moved from cold to hot only when work is done, so a refrigerator needs work.\n" +
        "- In any spontaneous process, the net transfer of energy is from the hot object to the cold object.",
      table: {
        columns: ["Statement", "What it rules out", "Device it limits"],
        rows: [
          {
            cells: ["Kelvin-Planck", "An engine that turns all the heat it takes in into work", "Heat engine: its efficiency is always less than 1"],
          },
          {
            cells: ["Clausius", "Heat flowing on its own from a cold body to a hot body", "Refrigerator: it needs work to move heat out"],
            pyqExampleId: "4282c503-01ce-4207-b862-fb2fe033fbf9",
            noteAmber: "The textbook asks what the second law deals with: the transfer of energy.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "An inventor claims an engine that takes 1000 J of heat from a furnace in each cycle and does 1000 J of work, rejecting nothing. Which law does the claim break?",
        steps: ["Energy balances, so the first law is obeyed.", "No heat is rejected to a cold reservoir, which the Kelvin-Planck statement forbids."],
        answer: "The second law (Kelvin-Planck statement)",
      },
      practiceSet: [
        { prompt: "Which statement of the second law forbids a heat engine of 100% efficiency?", answer: "The Kelvin-Planck statement" },
        { prompt: "Which statement of the second law explains why a refrigerator needs work to run?", answer: "The Clausius statement" },
        { prompt: "In a spontaneous process, which way does energy flow between a hot and a cold object?", answer: "From the hot object to the cold object" },
      ],
      pyqExampleId: "4282c503-01ce-4207-b862-fb2fe033fbf9",
      traps: [
        {
          title: "Saying a perfect engine breaks the first law",
          body: "An engine turning all its heat into work balances its energy, so it obeys the first law. It is the second law that forbids it.",
        },
        {
          title: "Dropping 'spontaneously'",
          body: "Heat can flow from cold to hot, as in a refrigerator, but only when work is done. The Clausius statement needs the word 'spontaneously' or the words 'without work'.",
        },
      ],
    },
  ],
};
