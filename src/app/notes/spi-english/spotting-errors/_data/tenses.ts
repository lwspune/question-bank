import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const SPI_SE_TENSES_NOTE: SubtopicNote = {
  subtopicName: "Tenses",
  title: "Tenses",
  oneLineDefinition:
    "A tense error is a verb that shows the wrong time, and the sentence nearly always carries a clue word that tells you the right one.",
  whyItMatters:
    "Five questions in the bank test the tense: one EASY and four MODERATE. Three hang on a time word such as 'yesterday' or 'in the 19th century', and two on the special rules for 'if' sentences and reported questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spisete-time-words",
      name: "Time words choose the tense",
      intuition:
        "A verb shows when something happens. Words like 'yesterday', 'since', 'so far' and 'every day' fix that time, so the verb must match them. " +
        "Find the time word first. The verb that clashes with it is the error, even when the two sit in different parts of the sentence.",
      definition:
        "The tenses you need:\n" +
        "- **Simple past** (went, saw): a finished time that is named. Clues: yesterday, last week, ago, in 2010, in the old days.\n" +
        "- **Present perfect** (have seen, has gone): done at some time before now, with no finished time named. Clues: just, already, yet, ever, so far.\n" +
        "- **Present perfect continuous** (have been waiting): started in the past and still going on. Clues: **for** a length of time, **since** a starting point.\n" +
        "- **Present continuous** (is playing): happening right now. Clues: now, at the moment, Look!\n" +
        "- **Simple present** (walks): a habit or a fact. Clues: every day, always, usually.",
      table: {
        columns: ["Clue in the sentence", "Tense", "Correct example"],
        rows: [
          { cells: ["yesterday, last week, ago, in 2010", "simple past", "We visited Agra last week."] },
          { cells: ["just, already, yet, ever, so far", "present perfect", "I have already eaten."] },
          {
            cells: ["for or since, and still going on", "present perfect continuous", "She has been waiting since noon."],
            noteAmber: "Not 'is waiting since noon'.",
          },
          { cells: ["now, at the moment, Look!", "present continuous", "Look! The baby is sleeping."] },
          { cells: ["every day, always, usually", "simple present", "He walks to school every day."] },
        ],
        caption: "A named finished time (yesterday, in 1990) never goes with have or has.",
      },
      pyqExampleId: "cb7d1c4b-4000-449f-9676-fb7fb356b067",
      selfCheckExample: {
        prompt: item("My grandfather has visited", "Shimla", "in 1985."),
        steps: [
          "The time clue is 'in 1985', a finished time that is named.",
          "A named past time takes the simple past, not 'has visited'.",
          "The correct sentence: My grandfather visited Shimla in 1985.",
        ],
        answer: "(a) My grandfather has visited",
      },
      practiceSet: [
        {
          prompt: "Correct the sentence: 'They are living in this town since 2015.'",
          answer: "They have been living in this town since 2015.",
          method: "'Since' with an action still going on takes the present perfect continuous.",
        },
        { prompt: "Correct the sentence: 'I have met her two days ago.'", answer: "I met her two days ago." },
        { prompt: "Correct the sentence: 'In ancient times, people cook on wood fires.'", answer: "In ancient times, people cooked on wood fires." },
        { prompt: "Choose: 'We (won / have won) ten matches so far.'", answer: "have won" },
      ],
      traps: [
        {
          title: "A named past time never takes have or has",
          body:
            "'I have seen that film last Sunday' is wrong because 'last Sunday' is finished. Say 'I saw that film last Sunday'. Use 'have seen' only when no finished time is named.",
        },
        {
          title: "'For' and 'since' with an action still going on",
          body:
            "An action that began earlier and has not stopped takes 'has been' or 'have been' with -ing: 'It has been raining for two days', not 'It is raining for two days'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spisete-if-reported",
      name: "If sentences and reported questions",
      intuition:
        "Two kinds of sentence have their own tense rules. An 'if' sentence pairs one tense in the 'if' part with another in the main part. " +
        "A reported question tells what someone asked, so it is no longer a question: the words go in normal statement order and the tense moves one step back.",
      definition:
        "The three common 'if' patterns:\n" +
        "- **Real, now or later**: If + present, will + verb. 'If it rains, we will stay in.'\n" +
        "- **Imagined, now**: If + past, would + verb. 'If I were rich, I would travel.'\n" +
        "- **Imagined, in the past**: If + had + third form, would have + third form. 'If you had asked, I would have helped.'\n" +
        "- **Never** put 'will' or 'would' in the 'if' part.\n\n" +
        "Reported questions:\n" +
        "- Use statement order, with no 'did' and no question mark: 'She asked me where I lived', not 'where did I live'.\n" +
        "- A yes or no question is reported with **if** or **whether**: 'He asked if I was ready.'\n" +
        "- After 'asked', the tense moves back: lives becomes lived, lived becomes had lived.",
      table: {
        columns: ["Sentence type", "Pattern", "Correct example"],
        rows: [
          { cells: ["if, real", "If + present, will + verb", "If it rains, we will stay in."] },
          { cells: ["if, imagined now", "If + past, would + verb", "If I were rich, I would travel."] },
          {
            cells: ["if, imagined past", "If + had + third form, would have + third form", "If you had asked, I would have helped."],
            noteAmber: "Not 'If you would have asked'.",
          },
          { cells: ["reported wh-question", "asked + wh-word + statement order", "She asked me where I lived."] },
          { cells: ["reported yes or no question", "asked + if or whether + statement order", "He asked if I was ready."] },
        ],
        caption: "The 'if' part never carries will or would; a reported question never carries did.",
      },
      pyqExampleId: "fc1f3cca-e0a9-489f-b2a6-19ad5e8ff4c0",
      selfCheckExample: {
        prompt: item("The teacher asked us", "where were we going", "after class."),
        steps: [
          "This reports a question, so it is a statement now.",
          "Statement order puts the subject before the verb: 'where we were going'.",
          "The correct sentence: The teacher asked us where we were going after class.",
        ],
        answer: "(b) where were we going",
      },
      practiceSet: [
        { prompt: "Correct the sentence: 'If he will come, I will tell him.'", answer: "If he comes, I will tell him." },
        {
          prompt: "Correct the sentence: 'If you had told me, I will have come.'",
          answer: "If you had told me, I would have come.",
          method: "'If' + had + third form pairs with 'would have' + third form.",
        },
        { prompt: "Correct the sentence: 'She asked me what was my name.'", answer: "She asked me what my name was." },
        { prompt: "Correct the sentence: 'He asked me did I like music.'", answer: "He asked me if I liked music." },
      ],
      traps: [
        {
          title: "No 'would' in the 'if' part",
          body:
            "'If I would know, I would tell you' is wrong. The 'if' part takes the past ('If I knew') and only the main part takes 'would'.",
        },
        {
          title: "A reported question is not a question",
          body:
            "After 'asked', drop 'did' and put the subject before the verb: 'He asked why I was late', not 'He asked why was I late'.",
        },
      ],
    },
  ],
};
