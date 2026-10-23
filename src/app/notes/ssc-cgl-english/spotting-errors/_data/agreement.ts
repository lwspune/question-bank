import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESE_AGREEMENT_NOTE: SubtopicNote = {
  subtopicName: "Agreement and Pronouns",
  title: "Agreement and Pronouns",
  oneLineDefinition:
    "A verb must agree with its true subject in number, and a pronoun must match the noun it stands for in number, person and case.",
  whyItMatters:
    "Sixty-one questions in the bank, 16 from the 2023 shifts, 15 from the 2024 shifts and 30 from the 2025 shifts. The 2025 shifts hide the subject behind a long phrase or a whole clause, so the work is finding the true subject before you check the verb.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesag-subject",
      name: "Finding the true subject",
      intuition:
        "The verb agrees with its subject, not with the noun nearest to it. Strip away the phrase between them (of the boxes, along with his friends, though peaceful in nature) and ask whether what is left is one thing or many.",
      definition:
        "- **Phrases in between do not count:** \"One of these boxes has\", \"The quality of the mangoes is\".\n" +
        "- **And:** two subjects joined by and take a plural verb.\n" +
        "- **With, along with, as well as, together with:** the verb follows the first subject.\n" +
        "- **Either ... or, neither ... nor, not only ... but also:** the verb follows the nearer subject.\n" +
        "- **Each, every, neither of, one of:** a singular verb.\n" +
        "- **A clause as the subject** (\"That the plan failed\", \"What he said\", \"All that is needed\") takes a singular verb.\n" +
        "- **One of those who:** the verb after who is plural, since who means those.\n" +
        "- **Always plural:** police, people, cattle. **Uncountable, so singular:** information, advice, news.",
      authoredExample: {
        prompt:
          "Find the part with the error: (a) The list of items (b) on the shelves (c) are kept near the door. (d) No error",
        steps: [
          "Strip the phrases \"of items\" and \"on the shelves\": the subject is \"The list\".",
          "A list is one thing, so the verb must be singular: \"is kept\".",
        ],
        answer: "(c) are kept near the door",
      },
      selfCheckExample: {
        prompt:
          "Find the part with the error: (a) The teacher, together with her pupils, (b) were invited (c) to the function. (d) No error",
        steps: [
          "With \"together with\", the verb follows the first subject, \"The teacher\".",
          "One teacher takes a singular verb: \"was invited\".",
        ],
        answer: "(b) were invited",
      },
      practiceSet: [
        { prompt: "Choose the verb: Each of the players ___ a medal. (has / have)", answer: "has" },
        { prompt: "Choose the verb: The police ___ looking into the case. (is / are)", answer: "are" },
        { prompt: "Choose the verb: Either the students or the teacher ___ to blame. (is / are)", answer: "is (the nearer subject, the teacher, is singular)" },
        { prompt: "Choose the verb: What he said ___ true. (was / were)", answer: "was" },
      ],
      pyqExampleId: "0c5f1c3d-55a6-4294-80ad-563530f44fb7",
      traps: [
        {
          title: "Agreeing with the nearest noun",
          body:
            "In \"The quality of the mangoes ___ poor\", mangoes sits next to the verb but the subject is quality, so the verb is \"is\".",
        },
        {
          title: "Treating 'as well as' like 'and'",
          body:
            "\"The captain as well as the players was praised\": as well as adds to the first subject without making it plural, so the verb follows the captain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesag-pronoun",
      name: "Pronouns that match",
      intuition:
        "A pronoun must match the noun it stands for: a singular noun takes its or his or her, a plural takes their. It must also take the right case (she as a subject, her as an object), and who is for people, which for things.",
      definition:
        "- **Number:** \"The bank changed its rules\"; \"Every girl brought her lunch\".\n" +
        "- **Case:** subject forms I, he, she, we, they; object forms me, him, her, us, them: \"because he was tired\", \"between you and me\".\n" +
        "- **Who and which:** who for people, which for things.\n" +
        "- **Its and it's:** its is the possessive; it's means it is.\n" +
        "- **Reflexives** (myself, themselves) point back to the subject and cannot be the subject; enjoy needs one when it has no other object: \"They enjoyed themselves\".\n" +
        "- **Each other and one another:** by the rule SSC follows, each other is for two people, one another for more than two.",
      authoredExample: {
        prompt:
          "Find the part with the error: (a) Every girl in the class (b) brought their own lunch (c) to the picnic. (d) No error",
        steps: [
          "\"Every girl\" is singular, so the pronoun that refers to it must be singular.",
          "It should read \"brought her own lunch\".",
        ],
        answer: "(b) brought their own lunch",
      },
      selfCheckExample: {
        prompt: "Choose the correct option: The bank changed ___ rules last year. (a) their (b) it's (c) its (d) his",
        steps: ["The bank is one thing, so the possessive is singular.", "The possessive of it has no apostrophe: its."],
        answer: "(c) its",
      },
      practiceSet: [
        { prompt: "Correct the sentence: Him and I went to the market.", answer: "He and I went to the market." },
        { prompt: "Who or which: the man ___ called you", answer: "who" },
        { prompt: "Correct the sentence: The dog wagged it's tail.", answer: "The dog wagged its tail." },
        { prompt: "By the rule SSC follows, do more than two people help each other or one another?", answer: "One another" },
      ],
      pyqExampleId: "4a7506c4-749b-474d-a03f-5ff818beface",
      traps: [
        {
          title: "Its with an apostrophe",
          body: "\"It's\" always means \"it is\" or \"it has\". The possessive, as in \"its colour\", never takes an apostrophe.",
        },
        {
          title: "A reflexive as the subject",
          body: "\"Myself and Ravi will attend\" is wrong; the subject form is needed: \"Ravi and I will attend\".",
        },
      ],
    },
  ],
};
