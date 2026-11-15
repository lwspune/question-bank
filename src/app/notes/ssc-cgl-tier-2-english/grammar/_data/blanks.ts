import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EGR_BLANKS_NOTE: SubtopicNote = {
  subtopicName: "One-Word Grammar Blanks",
  title: "One-Word Grammar Blanks",
  oneLineDefinition:
    "A single gap decided by a grammar rule: the right degree of an adjective, the preposition or particle a verb needs, or the tense, pronoun or article the sentence calls for.",
  whyItMatters:
    "13 questions in the Tier II bank, 12 EASY and 1 MODERATE. Each turns on one word next to the gap, so they take seconds once the rule is known.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2egrbl-compare",
      name: "Degree: positive, comparative, superlative",
      intuition:
        "Look for the clue word: 'than' needs the comparative (more spacious), 'the ... ever' or 'the ... of all' needs the superlative (the most interesting), and 'as ... as' needs the plain form (as much).",
      definition:
        "- **Than** follows a comparative: more spacious than, sweeter than.\n" +
        "- **The + superlative** for the top of a group: the sweetest fruit, the most interesting book I have read.\n" +
        "- **As ... as** takes the plain form: as much as, as good as.",
      authoredExample: {
        prompt: "Fill the gap: This is the ___ painting in the whole gallery. (a) beautiful (b) more beautiful (c) most beautiful (d) beautifuller",
        steps: ["'The ... in the whole gallery' compares with all the paintings.", "The superlative of a long adjective is 'most beautiful'."],
        answer: "(c) most beautiful",
      },
      selfCheckExample: {
        prompt: "Fill the gap: No other player scored as ___ runs as Rohit. (a) much (b) many (c) more (d) most",
        steps: ["'As ... as' takes the plain form.", "Runs can be counted, so 'many'."],
        answer: "(b) many",
      },
      practiceSet: [
        { prompt: "Fill the gap: Today is ___ than yesterday. (cold)", answer: "colder" },
        { prompt: "Fill the gap: Everest is the ___ mountain on Earth. (high)", answer: "highest" },
        { prompt: "Fill the gap: Nobody worked as ___ as Priya. (hard)", answer: "hard" },
      ],
      pyqExampleId: "1fd105cc-9b2d-46bd-899d-0e6f57d8b5fd",
      traps: [
        {
          title: "Using the comparative without 'than'",
          body: "'The more interesting book I have read' is wrong: with 'the' and a whole group, the superlative is needed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2egrbl-prep",
      name: "Prepositions and phrasal verbs",
      intuition:
        "Some verbs and adjectives carry their own preposition (depend upon, experienced in), and some verbs change meaning with a particle (give off, give in, hold on to). The meaning of the sentence picks the right one.",
      definition:
        "Pairs and phrasal verbs Tier II has asked:\n" +
        "- **depend upon** (rely on), **experienced in** (skilled at)\n" +
        "- **give off** (send out rays, smell, heat), **give in** (surrender, yield)\n" +
        "- **hold on to** (keep, not let go)\n" +
        "Fast route: say the sentence with each particle and match it to the meaning.",
      authoredExample: {
        prompt: "Fill the gap: Burning plastic ___ poisonous fumes. (a) gives in (b) gives off (c) gives up (d) gives away",
        steps: ["The sentence is about sending out fumes.", "'Give off' means send out."],
        answer: "(b) gives off",
      },
      selfCheckExample: {
        prompt: "Fill the gap: The team refused to ___ even when they were losing badly. (a) give off (b) give in (c) give out (d) give over",
        steps: ["The meaning is 'surrender'.", "That is 'give in'."],
        answer: "(b) give in",
      },
      practiceSet: [
        { prompt: "Fill the gap: You can always depend ___ your friends.", answer: "upon (or on)" },
        { prompt: "Fill the gap: She is experienced ___ teaching young children.", answer: "in" },
        { prompt: "Fill the gap: Hold ___ to your dreams.", answer: "on" },
      ],
      pyqExampleId: "9b3d24b3-7551-4380-a4cc-d7640b4574dd",
      traps: [
        {
          title: "Knowing the verb but not the particle",
          body: "Give off, give in, give up and give away are all real phrases with different meanings. Decide the meaning first, then the particle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2egrbl-misc",
      name: "Tense, pronoun and article in one gap",
      intuition:
        "A time phrase fixes the tense ('by this time tomorrow' means future perfect), a person fixes the pronoun (Mr Kumar takes 'his'), and a well-known role fixes the article ('Tagore, the poet').",
      definition:
        "- **By + future time:** will have + past participle: 'By this time tomorrow I will have done it.'\n" +
        "- **Pronoun** agrees with the noun it stands for: Mr Amit Kumar ... his honesty.\n" +
        "- **The** before a phrase that identifies a famous person: 'Tagore, the poet'.",
      authoredExample: {
        prompt: "Fill the gap: By next June, they ___ the new hospital. (a) complete (b) will complete (c) will have completed (d) completed",
        steps: ["'By next June' marks a point in the future by which the action is done.", "That is the future perfect: will have completed."],
        answer: "(c) will have completed",
      },
      selfCheckExample: {
        prompt: "Fill the gap: Ms Rao, the principal, is known for ___ strict rules. (a) his (b) her (c) their (d) its",
        steps: ["The pronoun stands for Ms Rao.", "That is 'her'."],
        answer: "(b) her",
      },
      practiceSet: [
        { prompt: "Fill the gap: By the time you arrive, we ___ dinner. (finish)", answer: "will have finished" },
        { prompt: "Fill the gap: Sachin Tendulkar, ___ cricketer, retired in 2013.", answer: "the" },
        { prompt: "Fill the gap: Each of the boys brought ___ own bag.", answer: "his" },
      ],
      pyqExampleId: "b0562ba6-41e5-444c-a5e6-8c5da76bc592",
      traps: [
        {
          title: "Using simple future after 'by'",
          body: "'By this time tomorrow I will do it' misses the sense of being finished. 'By' + a future time needs 'will have done'.",
        },
      ],
    },
  ],
};
