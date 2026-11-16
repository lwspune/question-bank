import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EFB_BLANKS_NOTE: SubtopicNote = {
  subtopicName: "Sentence Fill-in-Blanks",
  title: "Sentence Fill-in-Blanks",
  oneLineDefinition:
    "One sentence, one gap, four options: the right word is the one English always pairs with its neighbour, the one the grammar of a comparison needs, or the one the sentence's meaning points to.",
  whyItMatters:
    "12 questions in the Tier II bank, 11 EASY and 1 MODERATE. Nearly half test a fixed word partnership, which is quick once you have met the pair before.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2efbbl-collocation",
      name: "Words that go together",
      intuition:
        "Some words simply belong together in English: we pay attention, we do not give or make it. When the gap sits next to such a partner, only one option sounds natural, even if two mean nearly the same.",
      definition:
        "- **Verb and noun pairs:** pay attention, conduct a survey, impose restrictions, face criticism, kill time, make an effort, take a decision.\n" +
        "- The meaning of two options can be close; the partner word decides between them.\n" +
        "- **Fast route:** read the gap with the word after it ('___ attention') and pick the option you have heard in that pair.",
      authoredExample: {
        prompt: "Fill in the blank: The police will ___ an inquiry into the accident. (a) do (b) conduct (c) perform (d) make",
        steps: ["'Inquiry' pairs with 'conduct' or 'hold'.", "Conduct is the option that forms the usual pair."],
        answer: "(b) conduct",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: She had to ___ a difficult decision about her job. (a) do (b) take (c) give (d) put",
        steps: ["A decision is taken (or made), not done or given.", "Take is the option that forms the pair."],
        answer: "(b) take",
      },
      practiceSet: [
        { prompt: "Fill in the blank: Please ___ notice of the change in timing.", answer: "take" },
        { prompt: "Fill in the blank: The doctor told him to ___ a balanced diet.", answer: "follow (or eat)" },
        { prompt: "Fill in the blank: The government decided to ___ a ban on plastic bags.", answer: "impose" },
      ],
      pyqExampleId: "a0c79feb-130f-4a03-9249-9f3377f0fbd7",
      traps: [
        {
          title: "Choosing a word that means the same but does not pair",
          body: "'Give attention' and 'pay attention' mean the same, but English says pay attention. The partner word, not the meaning, decides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2efbbl-compare",
      name: "Comparisons with than",
      intuition:
        "When a sentence compares two things, the gap usually needs a comparative word (easier, later, smarter) followed by 'than'. If 'than' is already in the sentence, the gap needs the comparative form.",
      definition:
        "- Short adjectives add -er: smart, smarter; strong, stronger.\n" +
        "- Long adjectives take 'more': more careful, more expensive.\n" +
        "- A comparative is followed by 'than', never 'then' or 'that'.\n" +
        "- Two comparatives can be joined: 'smarter and stronger than'.",
      authoredExample: {
        prompt: "Fill in the blank: Travelling by train is ___ than travelling by bus. (a) comfortable (b) most comfortable (c) more comfortable (d) comfortably",
        steps: ["'Than' follows the gap, so a comparative is needed.", "'Comfortable' is long, so it takes 'more'."],
        answer: "(c) more comfortable",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: This year's results were better ___ last year's. (a) then (b) than (c) that (d) as",
        steps: ["'Better' is a comparative.", "A comparative is followed by 'than'."],
        answer: "(b) than",
      },
      practiceSet: [
        { prompt: "Fill in the blank: The second test was ___ than the first. (hard)", answer: "harder" },
        { prompt: "Fill in the blank: This route is more scenic ___ the highway.", answer: "than" },
        { prompt: "Fill in the blank: Of the two plans, this one is ___ practical.", answer: "more" },
      ],
      pyqExampleId: "92f04d84-f086-45c9-b8b3-71af5dbc9995",
      traps: [
        {
          title: "Writing 'then' for 'than'",
          body: "'Then' is about time (first this, then that); 'than' compares. 'Easier than shopping' needs than.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2efbbl-meaning",
      name: "The word the sentence asks for",
      intuition:
        "Most sentences carry a clue to the missing word: a reason (as she was drenched in the rain), a result, or a contrast. Find that clue first, and the gap's meaning follows before you look at the options.",
      definition:
        "- **Reason clues** (because, as, since): the gap is what the reason leads to. Drenched in the rain, she was cold.\n" +
        "- **Contrast clues** (although, but, despite): the gap goes against the other half.\n" +
        "- **Description clues:** a word nearby (tiny, steadily) tells you what kind of word fits.\n" +
        "- **Fast route:** cover the options, put your own word in the gap, then pick the nearest option.",
      authoredExample: {
        prompt: "Fill in the blank: As the train was running two hours late, the passengers grew ___. (a) cheerful (b) restless (c) sleepy (d) silent",
        steps: ["'As ... running late' gives the reason.", "Delay makes people impatient: restless."],
        answer: "(b) restless",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: Although the road was narrow, the driver steered the bus ___ through the crowd. (a) carelessly (b) skilfully (c) slowly (d) loudly",
        steps: ["'Although the road was narrow' sets up a contrast: he did well despite it.", "Skilfully fits the contrast best."],
        answer: "(b) skilfully",
      },
      practiceSet: [
        { prompt: "Fill in the blank: The old bridge was so ___ that it was closed to traffic. (a) strong (b) weak (c) wide (d) new", answer: "(b) weak" },
        { prompt: "Fill in the blank: Despite the rain, the match ___ as planned. (a) stopped (b) continued (c) ended (d) failed", answer: "(b) continued" },
        { prompt: "Fill in the blank: The child was ___ after the long walk and fell asleep at once. (a) exhausted (b) excited (c) angry (d) hungry", answer: "(a) exhausted" },
      ],
      pyqExampleId: "e290c5e0-3d7a-4d8e-916b-bc9f3c4337ba",
      traps: [
        {
          title: "Picking a word that fits only half the sentence",
          body: "An option can sound right next to the gap but clash with the clue elsewhere. Check the chosen word against the whole sentence before you mark it.",
        },
      ],
    },
  ],
};
