import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESE_VERBS_NOTE: SubtopicNote = {
  subtopicName: "Tenses and Verb Forms",
  title: "Tenses and Verb Forms",
  oneLineDefinition:
    "Choosing the tense the time words call for, and the form a verb must take after will, had, to, a preposition or a verb such as avoid.",
  whyItMatters:
    "Ninety-six questions in the bank, 43 from the 2023 shifts, 24 from the 2024 shifts and 29 from the 2025 shifts. Most turn on a time word that fixes the tense (since, for, yesterday, by next year) or on the form a verb must take after another word.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesvb-tense",
      name: "The tense the time words call for",
      intuition:
        "Time words fix the tense. An action still going on since a point of time takes the present perfect; a finished time such as yesterday takes the simple past; the earlier of two past actions takes the past perfect. In if and when clauses about the future, the verb is present, never will.",
      definition:
        "- **Since and for:** since with a point of time (since 2018), for with a period (for two hours); an action still going on takes the present perfect (continuous).\n" +
        "- **Finished past time:** yesterday, last year, in 1999 and ago take the simple past, not the present perfect.\n" +
        "- **Two past actions:** the earlier takes the past perfect: \"The train had left before we arrived\".\n" +
        "- **After a past reporting verb** (said, asked), the reported verb moves back: will becomes would, is becomes was.\n" +
        "- **Conditionals:** if + present, will; if + past, would; if + had + participle, would have + participle. \"Had I known\" means \"If I had known\".\n" +
        "- **Time clauses about the future** (when, until, before, as soon as) take the present: \"When I see him, I will ask\".\n" +
        "- **Unreal wishes:** if only, if I were and it is high time take the past: \"If I were rich\", \"It is high time you left\".\n" +
        "- **Stative verbs** (know, like, own, have meaning possess) are not used in the continuous.",
      authoredExample: {
        prompt:
          "Find the part with the error: (a) When we reached the station, (b) the train already left, (c) so we took a taxi. (d) No error",
        steps: [
          "Two past actions: the train left first, then we reached.",
          "The earlier action takes the past perfect: \"the train had already left\".",
        ],
        answer: "(b) the train already left",
      },
      selfCheckExample: {
        prompt: "Choose the correct option: If it rains tomorrow, we ___ the match. (a) would cancel (b) will cancel (c) cancelled (d) had cancelled",
        steps: ["A real condition about the future: if + present, then will.", "So \"will cancel\"."],
        answer: "(b) will cancel",
      },
      practiceSet: [
        { prompt: "Since or for: I have lived here ___ five years.", answer: "for" },
        { prompt: "Correct the sentence: I have met him yesterday.", answer: "I met him yesterday." },
        { prompt: "Correct the sentence: He said that he will come.", answer: "He said that he would come." },
        { prompt: "Correct the sentence: I am knowing the answer.", answer: "I know the answer." },
      ],
      pyqExampleId: "5e81b274-46b1-4fff-be7a-e1d51f7e047d",
      traps: [
        {
          title: "The present perfect with a finished time",
          body: "\"I have seen the film last week\" is wrong: last week is finished, so the simple past is needed, \"I saw the film last week\".",
        },
        {
          title: "Will in the if or when clause",
          body: "\"If it will rain\" and \"when he will come\" are wrong; the clause takes the present, and will goes in the main clause.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesvb-form",
      name: "The form a verb must take",
      intuition:
        "Some words fix the form of the verb after them. A modal (will, can, should, might) takes the base form; have, has and had take the past participle; to as part of an infinitive takes the base form, but to as a preposition (object to, with a view to) takes the -ing form.",
      definition:
        "- **Modal + base form:** will go, should leave, might succeed; never \"will went\" or \"should to leave\".\n" +
        "- **Have, has, had + past participle:** has won, had gone, will have saved.\n" +
        "- **To as a preposition + -ing:** look forward to hearing, object to waiting, with a view to becoming, used to living.\n" +
        "- **-ing after** avoid, enjoy, mind, finish, and prevent someone from.\n" +
        "- **To + base form after** fail, refuse, decide, and advise someone not to.\n" +
        "- **Passive when the subject receives the action:** \"He was invited by the club\".\n" +
        "- **Demand, insist, suggest that** + base form or should + base form: \"that he be present\".\n" +
        "- **Every sentence needs a finite verb:** \"The river flowing under the bridge\" has none.",
      authoredExample: {
        prompt:
          "Find the part with the error: (a) The workers had (b) finish the job (c) before the rain started. (d) No error",
        steps: [
          "\"Had\" must be followed by a past participle.",
          "The participle of finish is finished: \"had finished the job\".",
        ],
        answer: "(b) finish the job",
      },
      selfCheckExample: {
        prompt: "Choose the correct option: She is used to ___ early. (a) wake (b) waking (c) woke (d) woken",
        steps: ["In \"be used to\", to is a preposition.", "A preposition takes the -ing form: \"used to waking\"."],
        answer: "(b) waking",
      },
      practiceSet: [
        { prompt: "Correct the sentence: He can speaks three languages.", answer: "He can speak three languages." },
        { prompt: "Correct the sentence: She avoided to meet him.", answer: "She avoided meeting him." },
        { prompt: "Correct the sentence: They have went home.", answer: "They have gone home." },
        { prompt: "Choose: The letter ___ by the clerk yesterday. (posted / was posted)", answer: "was posted" },
      ],
      pyqExampleId: "922b4830-0e34-4312-ad02-012816816b3c",
      traps: [
        {
          title: "Reading every 'to' as an infinitive",
          body: "In \"object to\", \"with a view to\" and \"be used to\", to is a preposition, so the -ing form follows, not the base verb.",
        },
        {
          title: "The past tense in place of the participle",
          body: "\"Had went\" and \"has wrote\" are wrong; after have, has and had comes the participle: gone, written.",
        },
      ],
    },
  ],
};
