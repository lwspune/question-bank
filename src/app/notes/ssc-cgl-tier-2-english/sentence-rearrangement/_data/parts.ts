import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ESR_PARTS_NOTE: SubtopicNote = {
  subtopicName: "Ordering Parts of a Sentence",
  title: "Ordering Parts of a Sentence",
  oneLineDefinition:
    "The jumbled pieces of one sentence to be put in order, found by joining the subject to its verb and each small word to the phrase it belongs with.",
  whyItMatters:
    "9 of the 38 Tier II rearrangement questions, 6 EASY and 3 MODERATE. They are faster than paragraph questions once the subject and verb are found.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2esrpt-core",
      name: "Subject first, then the verb",
      intuition:
        "An English sentence is built on who did what. Find the part that names the subject and the part that holds its main verb, put them together, and the rest hangs on them.",
      definition:
        "- **Subject:** the part with a noun and no verb before it (the origin of the Moon, the hikers).\n" +
        "- **Verb:** the part with 'was', 'has been', 'trekked' attaches straight after the subject.\n" +
        "- **Adverbs** like eagerly sit before the main verb: 'The students eagerly awaited their results.'\n" +
        "- **Time and place** phrases usually go after the object or at the start.",
      authoredExample: {
        prompt: "Order the parts: a. for three days b. the old bridge c. across the river d. was closed",
        steps: ["The subject is 'the old bridge' (b), joined by its verb 'was closed' (d).", "'Across the river' describes the bridge, so it follows it; time comes last."],
        answer: "b, c, d, a (The old bridge across the river was closed for three days.)",
      },
      selfCheckExample: {
        prompt: "Order the parts: a. her homework b. carefully c. the girl d. finished",
        steps: ["Subject: the girl. Adverb before the verb: carefully finished.", "Object last: her homework."],
        answer: "c, b, d, a",
      },
      practiceSet: [
        { prompt: "Order: a. the match b. heavy rain c. stopped", answer: "b, c, a (Heavy rain stopped the match.)" },
        { prompt: "Order: a. quietly b. the children c. sat d. in the hall", answer: "b, a, c, d" },
        { prompt: "Order: a. in 1969 b. landed on the Moon c. the first astronauts", answer: "c, b, a" },
      ],
      pyqExampleId: "329c5293-02f8-48f4-bf51-c5860652c982",
      traps: [
        {
          title: "Starting with a time phrase that leaves the verb stranded",
          body: "'Beginning in the 19th century' can open a sentence only if the subject and verb follow it. Join subject and verb first; place time phrases after.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esrpt-join",
      name: "Joining words and the phrases they need",
      intuition:
        "Small words pull a particular part after them: 'of' needs a noun, 'so that' needs a clause, 'not in the sense ... but' needs both halves. Each such word fixes the part that comes next.",
      definition:
        "- **Of and by:** 'captivated by the tapestry of ... dilemmas'. The noun after 'of' follows directly.\n" +
        "- **That, which:** begin a part that describes the noun just before them.\n" +
        "- **So that, in order to:** give the purpose and usually come near the end.\n" +
        "- **Pairs:** not ... but, not only ... but also; the two halves keep that order.",
      authoredExample: {
        prompt: "Order the parts: a. of the long journey b. the travellers were tired c. that they had made d. at the end",
        steps: ["Subject and verb: the travellers were tired (b). 'At the end' (d) pulls 'of the long journey' (a) after it.", "'That they had made' (c) describes the journey, so it follows a."],
        answer: "b, d, a, c",
      },
      selfCheckExample: {
        prompt: "Order the parts: a. so that b. she studied every evening c. she could pass the test",
        steps: ["The main clause comes first: she studied every evening.", "'So that' introduces the purpose clause."],
        answer: "b, a, c",
      },
      practiceSet: [
        { prompt: "Order: a. of the old fort b. the walls c. were repaired", answer: "b, a, c" },
        { prompt: "Order: a. but for his kindness b. not for his wealth c. he is respected", answer: "c, b, a" },
        { prompt: "Order: a. that he wrote b. the letter c. was never posted", answer: "b, a, c" },
      ],
      pyqExampleId: "78b41d49-4f6c-45ac-8fc3-1f3d02fe8ed6",
      traps: [
        {
          title: "Leaving 'of' at the end of a part with nothing after it",
          body: "A part that ends in 'of' or 'by' must be followed at once by the noun it needs. Only one part can supply that noun.",
        },
      ],
    },
  ],
};
