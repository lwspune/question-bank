import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ID_PHRASAL_NOTE: SubtopicNote = {
  subtopicName: "Phrasal Verbs and Prepositions",
  title: "Phrasal Verbs and Prepositions",
  oneLineDefinition:
    "A phrasal verb is a verb plus a small word such as off, over or up, and that small word changes the meaning; an idiom's preposition is fixed in the same way.",
  whyItMatters:
    "Three questions in the bank, two MODERATE and one HARD, the hardest in the chapter. Each turns on one small word: get off against get over, bear up against put up with, to the bitter end. You cannot work these out from the verb, so learn each one as a new word.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiidph-verbs",
      name: "Phrasal verbs with get and bear",
      intuition:
        "Get and bear are ordinary verbs, but add off, over, up or with and you get a new verb with its own meaning. The options in these questions are usually the same verb with four different small words.",
      definition:
        "How to use this table:\n" +
        "- Read the sentence and decide what happened: someone escaped, recovered, stayed strong, waited patiently.\n" +
        "- Then pick the phrasal verb that means exactly that.\n" +
        "- **Bear** alone, and **put up with**, mean to tolerate. **Bear up** is different: it means to stay strong.",
      table: {
        columns: ["Phrasal verb", "Meaning", "Example"],
        rows: [
          { cells: ["get off (with)", "escape with only a light punishment", "The thief got off lightly as it was his first offence."] },
          { cells: ["get over", "recover from", "She got over her fever in a week."] },
          { cells: ["get through", "pass, or reach the end of", "He got through the interview."] },
          { cells: ["get back", "return", "We got back home at night."] },
          { cells: ["get along (with)", "be friendly with", "The two cousins get along well."] },
          { cells: ["bear up", "stay strong in a hard time", "She is bearing up well after the loss."] },
          { cells: ["bear with", "be patient with", "Please bear with me for a minute."] },
          { cells: ["bear out", "show to be true, confirm", "The report bears out his story."] },
          { cells: ["put up with", "tolerate", "I cannot put up with this noise."] },
        ],
      },
      pyqExampleId: "0110fa7e-9ad7-4bc2-9ec4-0237ba90b9a6",
      selfCheckExample: {
        prompt:
          "Fill in the blank: Please ____ me while I look for the file. (a) bear up (b) bear with (c) bear out (d) bear down",
        steps: [
          "The speaker is asking for patience while he searches.",
          "Bear with means be patient with.",
          "Bear up (stay strong) and bear out (confirm) do not fit.",
        ],
        answer: "(b) bear with",
      },
      practiceSet: [
        { prompt: "What does 'get over' mean?", answer: "recover from" },
        {
          prompt: "Fill in the blank: The test results ____ the doctor's opinion. (a) bear with (b) bear up (c) bear out (d) get back",
          answer: "(c) bear out",
          method: "Bear out means show to be true.",
        },
        { prompt: "What does 'get along with' mean?", answer: "be friendly with" },
        { prompt: "Which phrasal verb means 'to tolerate': bear up or put up with?", answer: "put up with" },
      ],
      traps: [
        {
          title: "One small word changes the whole verb",
          body:
            "Get off, get over, get through and get back are four different verbs: escape, recover, pass, return. Treat each as a word of its own, not as 'get' plus a direction.",
        },
        {
          title: "Bear up is not put up with",
          body:
            "Bear up means to stay strong in a hard time. Put up with means to tolerate something. Students mix them up because 'bear' on its own also means to tolerate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiidph-prepositions",
      name: "The fixed small word inside an idiom",
      intuition:
        "Many idioms hold a preposition that cannot be changed: at the eleventh hour, never in the eleventh hour. A fill-in question gives the idiom with that word missing and four prepositions to choose from.",
      definition:
        "How to use this table:\n" +
        "- Learn the idiom whole, with its preposition, the way you learn a word's spelling.\n" +
        "- In a question, say each option inside the idiom aloud. The right one is the only one you have heard before.\n" +
        "- The meaning gives no clue to the preposition, so there is no rule to fall back on.",
      table: {
        columns: ["Idiom", "Meaning"],
        rows: [
          { cells: ["to the bitter end", "right to the finish, however hard it gets"] },
          { cells: ["at the eleventh hour", "at the last possible moment"] },
          { cells: ["in the long run", "over a long time, in the end"] },
          { cells: ["by and large", "on the whole, generally"] },
          { cells: ["on cloud nine", "extremely happy"] },
          { cells: ["out of the blue", "suddenly, without warning"] },
          { cells: ["in hot water", "in trouble"] },
        ],
      },
      pyqExampleId: "723eb738-2849-4a95-bb3d-bd39a41b53cf",
      selfCheckExample: {
        prompt: "Fill in the blank: His letter arrived ____ the blue after ten years. (a) in (b) out of (c) from (d) on",
        steps: ["The idiom is 'out of the blue', meaning suddenly and without warning."],
        answer: "(b) out of",
      },
      practiceSet: [
        { prompt: "Fill in the blank: He finished the project ____ the eleventh hour.", answer: "at" },
        { prompt: "Fill in the blank: ____ the long run, hard work pays.", answer: "In" },
        { prompt: "Fill in the blank: She was ____ cloud nine after the result.", answer: "on" },
        { prompt: "What does 'by and large' mean?", answer: "on the whole, generally" },
      ],
      traps: [
        {
          title: "Do not swap the preposition",
          body:
            "The small word in an idiom is fixed. 'In the eleventh hour' and 'at the long run' are wrong even though each preposition is correct English elsewhere.",
        },
        {
          title: "In the long run is about time",
          body: "In the long run means over a long time, in the end. It has nothing to do with running or with distance.",
        },
      ],
    },
  ],
};
