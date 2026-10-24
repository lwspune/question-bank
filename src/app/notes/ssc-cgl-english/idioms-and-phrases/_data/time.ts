import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EID_TIME_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Time and Company",
  title: "Idioms: Time and Company",
  oneLineDefinition:
    "Idioms about when and how often things happen, about waiting and acting too soon, and about friendship, making peace and keeping people at a distance.",
  whyItMatters:
    "Twenty-four questions in the bank, 8 from the 2023 shifts, 10 from the 2024 shifts and 6 from the 2025 shifts, nearly all EASY. Several idioms here were asked more than once (once in a blue moon, through thick and thin, off and on), so learning this short list pays back quickly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscidti-time",
      name: "Time, timing and how often",
      intuition:
        "These idioms answer three questions: how often (once in a blue moon, off and on), how suddenly (out of the blue), and whether the timing was right (jump the gun, miss the boat, let the dust settle). Decide which question the idiom answers and most options fall away.",
      definition:
        "The groups:\n" +
        "- **How often:** once in a blue moon (very rarely), off and on (now and then), day and night (all the time).\n" +
        "- **Suddenly:** out of the blue (unexpectedly).\n" +
        "- **Too soon or too late:** jump the gun (act too soon), miss the boat (lose a chance), hang fire (delay a decision).\n" +
        "- **Waiting and beginnings:** let the dust settle (wait until things are clear), in the bud (at an early stage).\n" +
        "- **Whatever happens:** come rain or shine.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Once in a blue moon", "Very rarely", "2023, 2024"] },
          { cells: ["Out of the blue", "Unexpectedly", "2023"] },
          { cells: ["Miss the boat", "Lose a good opportunity", "2023"] },
          { cells: ["Jump the gun", "Act too soon, before the right time", "2024"] },
          { cells: ["Let the dust settle", "Wait until a situation becomes clear", "2024"] },
          { cells: ["Off and on", "Now and then, from time to time", "2024 (twice)"] },
          { cells: ["Day and night", "All the time, around the clock", "2024"] },
          { cells: ["Come rain or shine", "Whatever happens", "2024"] },
          { cells: ["Hang fire", "Delay taking action or a decision", "2025"] },
          { cells: ["In the bud", "At an early, developing stage", "2025"] },
          { cells: ["Raining cats and dogs", "Raining very heavily", "2023"] },
        ],
      },
      pyqExampleId: "77a7935a-9dc6-445f-a93b-ca066a7300fa",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Out of the blue'. (a) Sadly (b) Unexpectedly (c) Very slowly (d) In the sky",
        steps: ["'Out of the blue' describes something that happens without warning.", "That is unexpectedly."],
        answer: "(b) Unexpectedly",
      },
      practiceSet: [
        { prompt: "What does 'once in a blue moon' mean?", answer: "Very rarely" },
        { prompt: "What does 'miss the boat' mean?", answer: "To lose a good opportunity" },
        { prompt: "What does 'hang fire' mean?", answer: "To delay taking action or a decision" },
        { prompt: "What does 'off and on' mean?", answer: "Now and then" },
      ],
      traps: [
        {
          title: "Reading 'out of the blue' as sadness",
          body:
            "Blue can suggest sadness, but 'out of the blue' means unexpectedly, like a sudden flash from a clear sky.",
        },
        {
          title: "Taking 'jump the gun' as speed in general",
          body:
            "To jump the gun is to act too early, before the right moment, not simply to act quickly.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscidti-company",
      name: "Company, friendship and making peace",
      intuition:
        "These idioms describe how people stand with each other: close (hand and glove), loyal (through thick and thin), cold (keep at arm's length, cut someone dead, left out in the cold), or making up (break the ice, bury the hatchet).",
      definition:
        "The groups:\n" +
        "- **Close or loyal:** hand and glove (very closely associated), through thick and thin (in good times and bad).\n" +
        "- **Distant or ignored:** keep someone at arm's length, cut someone dead (ignore deliberately), left out in the cold.\n" +
        "- **Easing and making peace:** break the ice (make people feel relaxed), bury the hatchet (end a quarrel).\n" +
        "- **Unwanted:** play gooseberry (be the unwanted third person with a couple).\n" +
        "- **Proverb:** familiarity breeds contempt.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Through thick and thin", "In good times and in bad", "2023, 2024"] },
          { cells: ["Keep someone at arm's length", "Avoid becoming friendly with someone", "2023"] },
          { cells: ["Left out in the cold", "Ignored, left out", "2024"] },
          { cells: ["Break the ice", "Say or do something that makes people relax", "2024"] },
          { cells: ["Cut someone dead", "Ignore someone deliberately", "2025"] },
          { cells: ["Hand and glove", "Very closely associated", "2025"] },
          { cells: ["Bury the hatchet", "Make peace after a quarrel", "2025"] },
          { cells: ["Play gooseberry", "Be an unwanted third person with a couple", "2025"] },
          { cells: ["Familiarity breeds contempt", "The better you know someone, the less you respect them", "2023"] },
        ],
      },
      pyqExampleId: "50a99f99-4df0-46eb-8efe-5a7153569286",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Break the ice'. (a) Start a fight (b) Make people feel relaxed at a first meeting (c) Cool a drink (d) Leave a party early",
        steps: ["Ice stands for the stiffness when people first meet.", "Breaking it makes them feel at ease."],
        answer: "(b) Make people feel relaxed at a first meeting",
      },
      practiceSet: [
        { prompt: "What does 'hand and glove' mean?", answer: "Very closely associated" },
        { prompt: "What does 'cut someone dead' mean?", answer: "Ignore someone deliberately" },
        { prompt: "What does 'through thick and thin' mean?", answer: "In good times and in bad" },
        { prompt: "What does 'play gooseberry' mean?", answer: "Be an unwanted third person with a couple" },
      ],
      traps: [
        {
          title: "Reading 'cut someone dead' literally",
          body: "It means to ignore someone on purpose, usually by pretending not to see them. No harm is meant.",
        },
        {
          title: "Taking 'keep at arm's length' as closeness",
          body: "An arm's length is a distance kept on purpose: the idiom means avoiding becoming close to someone.",
        },
      ],
    },
  ],
};
