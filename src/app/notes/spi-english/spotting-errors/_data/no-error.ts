import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const SPI_SE_NO_ERROR_NOTE: SubtopicNote = {
  subtopicName: "Sentences with No Error",
  title: "Sentences with No Error",
  oneLineDefinition:
    "When every check passes, the answer is No error; mark it with confidence instead of inventing a mistake.",
  whyItMatters:
    "Seven of the 33 questions in the bank have No error as the key, five of them on this page and one from the 2022 paper. One is EASY and four are MODERATE here: they are hard because the sentence looks unusual, not because it is wrong.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiseno-checklist",
      name: "Run the checks in order, then trust the result",
      intuition:
        "A spotting-errors question allows for no error at all, and the bank uses that answer often. If you run the same checks on every sentence and none of them finds a fault, choose No error. " +
        "Do not hunt for something because you feel a question must have an answer among the first parts.",
      definition:
        "The checklist, in the order these pages teach it:\n" +
        "- **Verb**: does it agree with its subject? Is it a full verb, and passive where the subject is acted on? Is the form after words like 'enjoy' or 'decide' right?\n" +
        "- **Tense**: does each verb match the time word? Are 'if' sentences and reported questions built correctly?\n" +
        "- **Preposition**: does each word have its own preposition, and no extra one?\n" +
        "- **Small words**: who or whom, one comparing form, the right partner for 'no sooner' or 'though', and words that make sense.\n" +
        "- If all four checks pass, the answer is **No error**.",
      authoredExample: {
        prompt: item("The children were playing", "in the garden when", "it began to rain."),
        steps: [
          "Verb: 'children' is plural, so 'were playing' agrees. 'Began' is a full verb.",
          "Tense: 'were playing' (going on) and 'began' (a short past action) fit a past story.",
          "Preposition: 'in the garden' is right.",
          "Small words: 'when' joins the two parts correctly.",
          "Every check passes, so there is no error.",
        ],
        answer: "(d) No error",
      },
      selfCheckExample: {
        prompt: item("Close the door", "and switch off the fan", "before you leave."),
        steps: [
          "Two orders, 'close' and 'switch off', are joined by 'and'. An order needs no subject.",
          "'Before you leave' is right for a future action.",
          "No check finds a fault.",
        ],
        answer: "(d) No error",
      },
      practiceSet: [
        { prompt: "Error or no error? 'She has lived in Delhi since 2019.'", answer: "No error" },
        { prompt: "Error or no error? 'Each of the boys have a cycle.'", answer: "Error: 'Each of the boys has a cycle.'" },
        { prompt: "Error or no error? 'We reached the station before the train left.'", answer: "No error" },
        { prompt: "Error or no error? 'He is senior than his cousin.'", answer: "Error: 'He is senior to his cousin.'" },
      ],
      pyqExampleId: "49b64d32-a734-4e2a-9971-ae45c97b2f8a",
      traps: [
        {
          title: "No error is a real answer",
          body:
            "In this bank, about one question in five has No error as its key. Choosing a part only because 'there must be a mistake' throws away a mark you had earned.",
        },
        {
          title: "Different is not wrong",
          body:
            "A sentence you would have written another way can still be correct. Mark a part only when you can name the rule it breaks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiseno-looks-wrong",
      name: "Correct English that looks wrong",
      intuition:
        "The No error questions in the bank use English that looks odd at first: a long sentence, an old idiom, or a pattern you may not have met. " +
        "These forms are correct, so learn them and do not mark them as errors.",
      definition:
        "Forms that are correct:\n" +
        "- **Double possessive**: 'a friend of mine', 'a cousin of Ravi's'. Both 'of' and the 's are right together.\n" +
        "- **A phrase set off by commas** inside a sentence: 'He left home and, holding a bag, walked to the bus.'\n" +
        "- **Someone, everyone, nobody** take a singular verb: 'Someone has left a bag.'\n" +
        "- **Idioms** keep their own meaning: 'feet of clay' is a hidden weakness in a person others admire.\n" +
        "- **It is well to** do something: an older, formal way of saying it is wise to do it.",
      table: {
        columns: ["Correct form", "Why it is right", "Example"],
        rows: [
          { cells: ["double possessive", "standard English", "She is a friend of my father's."] },
          { cells: ["a phrase set off by commas", "the commas mark extra information", "She went out and, holding an umbrella, crossed the road."] },
          { cells: ["someone, everyone, nobody", "singular, so the verb takes -s", "Nobody knows the answer."] },
          { cells: ["feet of clay", "an idiom: a hidden weakness in an admired person", "The hero turned out to have feet of clay."] },
          { cells: ["it is well to", "formal for 'it is wise to'", "It is well to check the map first."] },
        ],
        caption: "If an unusual form appears in an otherwise clean sentence, ask whether it is one of these before you mark it.",
      },
      pyqExampleId: "16af4417-59f2-4fe4-8835-47399109423e",
      selfCheckExample: {
        prompt: item("Rohan is", "a classmate", "of my brother's."),
        steps: [
          "'A classmate of my brother's' is a double possessive.",
          "Both 'of' and the 's are standard English here.",
          "The verb 'is' agrees with 'Rohan', so nothing is wrong.",
        ],
        answer: "(d) No error",
      },
      practiceSet: [
        { prompt: "Error or no error? 'Somebody has taken my pen.'", answer: "No error" },
        { prompt: "Error or no error? 'Everyone in the class knows the answer.'", answer: "No error" },
        { prompt: "What does the idiom 'feet of clay' mean?", answer: "A hidden weakness in a person others admire." },
        { prompt: "Error or no error? 'This is a book of hers.'", answer: "No error" },
      ],
      traps: [
        {
          title: "A long sentence is not a wrong sentence",
          body:
            "A sentence from a story can run over three long parts with commas and extra phrases. Length alone is never an error; check each part with the same four checks.",
        },
        {
          title: "Someone and everyone are singular",
          body:
            "They talk about people, so they feel plural, but they take a singular verb: 'Everyone has arrived', not 'Everyone have arrived'.",
        },
      ],
    },
  ],
};
