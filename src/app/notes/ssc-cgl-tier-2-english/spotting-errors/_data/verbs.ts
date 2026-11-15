import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ESE_VERBS_NOTE: SubtopicNote = {
  subtopicName: "Errors in Verbs and Pronouns",
  title: "Errors in Verbs and Pronouns",
  oneLineDefinition:
    "The verb in the wrong tense or form, a verb that does not agree with its subject, or a pronoun in the wrong case or order.",
  whyItMatters:
    "11 of the 29 Tier II error questions, 10 EASY and 1 MODERATE. Most are caught by asking one question of the verb: when did this happen, and who did it?",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2esevb-tense",
      name: "Tense that matches the time",
      intuition:
        "Every sentence fixes a time with a word like 'when I was twelve', 'returned' or 'when the road is finished'. The verb must sit in that time. A present verb in a past story, or a missing 'will' in a future one, is the error.",
      definition:
        "- **Past markers** (when I was young, yesterday, returned): use the past form. 'My father gave up smoking when I was twelve.'\n" +
        "- **Earlier past:** an action finished before another past action takes 'had' + past participle. 'When I returned, my friend had done everything.'\n" +
        "- **Future after a time clause:** 'when the road is finished, it will be quicker'. The time clause stays present; the main clause takes 'will'.\n" +
        "- **Fast route:** find the time word first, then read only the verbs.",
      authoredExample: {
        prompt: "Find the error: By the time the guests arrived / the hosts / have already finished / the dinner.",
        steps: [
          "'Arrived' puts the story in the past.",
          "Finishing dinner happened before the guests arrived, so it needs 'had already finished'.",
        ],
        answer: "have already finished (should be 'had already finished')",
      },
      selfCheckExample: {
        prompt: "Find the error: Last summer we / visit our grandparents / in the village / for a month.",
        steps: ["'Last summer' is past.", "'Visit' must be 'visited'."],
        answer: "visit our grandparents (should be 'visited')",
      },
      practiceSet: [
        { prompt: "Correct the verb: When I was a child, I play cricket every evening.", answer: "played" },
        { prompt: "Correct the verb: Once the shop opens, the prices be lower.", answer: "will be" },
        { prompt: "Correct the verb: She told me she has lost her keys the day before.", answer: "had lost" },
      ],
      pyqExampleId: "15a0e125-8e6f-405a-9cb1-36e6b0e39342",
      traps: [
        {
          title: "Leaving 'has' in a past story",
          body: "'Has done' belongs to the present. Once the sentence says 'when I returned', the earlier action needs 'had done'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esevb-form",
      name: "Verb form and agreement",
      intuition:
        "Some words fix the form of the verb after them: 'should', 'can', 'will' are always followed by the plain verb. And the verb must agree with its subject: we have, he has.",
      definition:
        "- **After should, can, must, will:** the base form. 'We should sort it out', never 'should sorted'.\n" +
        "- **Agreement:** I/we/you/they take 'have'; he/she/it takes 'has'.\n" +
        "- **Conditions:** 'if you will' is not used for a wish or need; say 'if you want to' or 'if you are to'.",
      authoredExample: {
        prompt: "Find the error: The students / must submitted / their projects / by Friday.",
        steps: ["'Must' is followed by the base form.", "'Submitted' should be 'submit'."],
        answer: "must submitted (should be 'must submit')",
      },
      selfCheckExample: {
        prompt: "Find the error: They / has finished / the work / early today.",
        steps: ["'They' is plural.", "It takes 'have', not 'has'."],
        answer: "has finished (should be 'have finished')",
      },
      practiceSet: [
        { prompt: "Correct the verb: You can went home now.", answer: "can go" },
        { prompt: "Correct the verb: The children plays in the garden every day.", answer: "play" },
        { prompt: "Correct the phrase: Hurry up if you will reach the hall on time.", answer: "if you want to reach" },
      ],
      pyqExampleId: "5acbdee0-0d74-47a6-8fd7-75e4191a6c04",
      traps: [
        {
          title: "A past form after a modal",
          body: "'Should', 'could', 'must' already carry the meaning; the verb after them never takes -ed or -s.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esevb-pronoun",
      name: "The right pronoun in the right place",
      intuition:
        "A pronoun changes form with its job: I before a verb, me after it. 'Whom' is only for people, and polite order puts yourself last.",
      definition:
        "- **Subject or object:** I, he, she, we, they before a verb; me, him, her, us, them after a verb or preposition. 'When I entered', not 'when me entered'.\n" +
        "- **Who, whom, which:** who/whom for people, which/that for things. 'The book which I wanted.'\n" +
        "- **Order of persons:** second, third, first: 'you, she and I'.\n" +
        "- **This or those vs their:** 'respect their parents' when the parents belong to the person; 'those' points at particular ones.",
      authoredExample: {
        prompt: "Find the error: Me and my sister / went to the market / to buy / some fruit.",
        steps: ["The pronoun is the subject of 'went'.", "Subject form and polite order give 'My sister and I'."],
        answer: "Me and my sister (should be 'My sister and I')",
      },
      selfCheckExample: {
        prompt: "Find the error: This is the pen / whom my uncle / gave me / on my birthday.",
        steps: ["A pen is a thing.", "'Whom' must be 'which' or 'that'."],
        answer: "whom my uncle (should be 'which my uncle')",
      },
      practiceSet: [
        { prompt: "Correct the pronoun: Him and I were late for class.", answer: "He and I" },
        { prompt: "Put in polite order: I, he and you will go together.", answer: "You, he and I" },
        { prompt: "Correct the pronoun: The house whom we bought is old.", answer: "which (or that)" },
      ],
      pyqExampleId: "ca0d4a11-a9a6-424b-b38d-cab5cc9f2d66",
      traps: [
        {
          title: "Putting I first",
          body: "'I, you and she' is grammatical in case but wrong in order. English puts the second person first and the first person last.",
        },
      ],
    },
  ],
};
