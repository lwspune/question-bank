import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FB_TENSES_NOTE: SubtopicNote = {
  subtopicName: "Tenses",
  title: "Tenses",
  oneLineDefinition:
    "A tense gap is filled from the clues around it: a time word, the tense of the rest of the story, or the order in which two actions happened.",
  whyItMatters:
    "Six questions in the bank, all from LWS mocks: two EASY, three MODERATE and one HARD. Four of them have two blanks, and the two verbs must fit each other as well as the time.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spifbte-one-blank",
      name: "One blank: match the time clue",
      intuition:
        "For a single verb gap, find what fixes the time. It may be a word like 'yesterday' or 'every day', or it may be the other verbs in the passage: a story told in the past keeps every verb in the past.",
      definition:
        "Where the clue comes from:\n" +
        "- **A time word**: yesterday, last year, ago (simple past); now, at the moment (present continuous); every day, always (simple present); tomorrow, next week (future with will).\n" +
        "- **The rest of the passage**: if the story says 'became' and 'was', the next verb is in the past too.\n" +
        "- **The subject**: a singular subject needs the singular form (was, has, goes).\n" +
        "- Strike out options that cannot be verbs on their own: 'beginning' or 'going' with no helper cannot fill the gap.",
      table: {
        columns: ["Clue", "Tense", "Correct example"],
        rows: [
          { cells: ["yesterday, last year, ago", "simple past", "We played football last Sunday."] },
          { cells: ["a story told in the past", "simple past", "The sky grew dark, and the wind started to blow."] },
          { cells: ["now, at the moment", "present continuous", "She is cooking now."] },
          { cells: ["every day, always, usually", "simple present", "He reads the paper every day."] },
          { cells: ["tomorrow, next week", "future with will", "They will arrive tomorrow."] },
        ],
        caption: "An -ing word alone (beginning, going) is never a full verb.",
      },
      pyqExampleId: "7a4f9438-8201-40ce-8a3e-a5db40758e5c",
      selfCheckExample: {
        prompt:
          "Fill in the blank: The rain stopped, the clouds moved away and the children ____ out to play. (a) run (b) runs (c) ran (d) running",
        steps: [
          "The other verbs, 'stopped' and 'moved', are in the simple past.",
          "So the gap is the simple past of run: 'ran'.",
          "'Running' alone cannot be the verb.",
        ],
        answer: "(c) ran",
      },
      practiceSet: [
        { prompt: "Choose: 'My grandmother (visits / visited) us last week.'", answer: "visited" },
        { prompt: "Choose: 'Look! The dog (chases / is chasing) a cat.'", answer: "is chasing" },
        { prompt: "Choose: 'The sun (rises / rose) in the east every morning.'", answer: "rises", method: "A fact that is always true takes the simple present." },
        { prompt: "Choose: 'We (will go / went) to the zoo tomorrow.'", answer: "will go" },
      ],
      traps: [
        {
          title: "A past story keeps its verbs in the past",
          body:
            "If a passage begins 'One cold night, the old man lit a fire', the next blank in it is in the past as well. Do not switch to the present halfway.",
        },
        {
          title: "Were is plural",
          body:
            "'Were' goes with we, you, they and plural nouns. One person takes 'was'. And neither 'was' nor 'were' can replace a full verb like 'went'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spifbte-two-blanks",
      name: "Two blanks: the order of the two actions",
      intuition:
        "When a sentence has two verb gaps, the two actions happen at different times, and the tenses must show which came first. " +
        "Decide the order of events, then fill the earlier action and the later one so they fit together.",
      definition:
        "The rules:\n" +
        "- **Two past actions**: the earlier one takes **had** + third form; the later one takes the simple past. 'When we arrived, the show had begun.'\n" +
        "- **By the time** + simple past, then **had** + third form for what was already complete.\n" +
        "- **A present main verb** (says, hopes, fears) can be followed by **will** for a future idea: 'He hopes that he will win.'\n" +
        "- **A past main verb** (said, hoped, feared) is followed by **would**: 'He hoped that he would win.'\n" +
        "- An action going on for some time **before** a past point takes **had been** + -ing: 'She had been waiting for an hour when the bus came.'",
      authoredExample: {
        prompt:
          "Fill in the blanks: When we ____ the station, the train ____. (a) reach / left (b) reached / had left (c) reached / has left (d) had reached / leaves",
        steps: [
          "Both actions are in the past. Which came first? The train left before we reached.",
          "The earlier action takes had + third form: 'had left'.",
          "The later one takes the simple past: 'reached'.",
          "The sentence: When we reached the station, the train had left.",
        ],
        answer: "(b) reached / had left",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: She says that she ____ us tomorrow. (a) visited (b) would visit (c) will visit (d) had visited",
        steps: [
          "'Says' is a present main verb and 'tomorrow' is in the future.",
          "A present main verb with a future idea takes 'will'.",
        ],
        answer: "(c) will visit",
      },
      practiceSet: [
        { prompt: "Choose: 'He told me that he (will / would) call later.'", answer: "would", method: "'Told' is a past main verb, so 'would'." },
        { prompt: "Choose: 'The film (had started / has started) before we reached the hall.'", answer: "had started" },
        { prompt: "Choose: 'I hope that it (will not / would not) rain tomorrow.'", answer: "will not" },
        {
          prompt: "Choose: 'They (had been waiting / are waiting) for an hour when the bus finally came.'",
          answer: "had been waiting",
        },
      ],
      pyqExampleId: "6b2f6c4c-5e74-4376-8f72-8059e49e0f4c",
      traps: [
        {
          title: "Have and had do not mix in one past story",
          body:
            "'When I reached, the class has started' is wrong: the earlier past action takes 'had started'. 'Has' and 'have' belong to the present.",
        },
        {
          title: "Will after a present verb, would after a past one",
          body:
            "'She thinks she will pass' and 'She thought she would pass' are right. 'She thought she will pass' mixes a past verb with a present-based future.",
        },
      ],
    },
  ],
};
