import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FB_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Choice and Collocations",
  title: "Word Choice and Collocations",
  oneLineDefinition:
    "A word gap is filled by the option that fits both the meaning of the sentence and the words it must sit beside.",
  whyItMatters:
    "Five questions in the bank, all from the sample paper: four EASY and one MODERATE. Often two options mean nearly the same thing, and only one of them is the word English uses in that phrase.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spifbwo-sense",
      name: "Fit the meaning, the feeling and the grammar",
      intuition:
        "Read the whole sentence before the options. Decide what the gap must say, and whether the sentence is praising, warning or simply reporting. " +
        "Then make sure the option also fits the words after the gap: some verbs need a 'to', some need 'that', some need a preposition.",
      definition:
        "Three tests for each option:\n" +
        "- **Meaning**: does it say what the sentence needs?\n" +
        "- **Feeling**: a warning needs a strong, bad word; praise needs a good one. **Gruesome** (horrible, shocking) and **winsome** (charming) look alike but have opposite feelings.\n" +
        "- **Grammar**: does it fit the words after the gap? 'Arrive' needs **at** or **in** (arrive at the gate), but 'reach' needs nothing (reach the gate). 'Refuse' takes **to** + verb (refuse to go); 'deny' takes a **that** clause or a noun (deny that it happened).\n" +
        "- Keep the option that passes all three.",
      authoredExample: {
        prompt:
          "Fill in the blank: The tired runner ____ the finish line just before the whistle. (a) reached (b) arrived (c) came (d) went",
        steps: [
          "Meaning: the runner got to the finish line. All four options are about movement.",
          "Grammar: there is no preposition after the gap. 'Arrived', 'came' and 'went' would need 'at' or 'to'.",
          "'Reached' takes the place directly: reached the finish line.",
        ],
        answer: "(a) reached",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: The film had a ____ ending that made everyone in the hall cry. (a) cheerful (b) tragic (c) funny (d) tiny",
        steps: [
          "The ending made people cry, so the word must be sad.",
          "'Cheerful' and 'funny' have the wrong feeling, and 'tiny' is about size.",
          "'Tragic' means very sad.",
        ],
        answer: "(b) tragic",
      },
      practiceSet: [
        { prompt: "Choose: 'Please (reach / arrive) at the gate by six.'", answer: "arrive", method: "'At' follows the gap, and 'arrive' takes 'at'." },
        { prompt: "Choose: 'The storm caused (heavy / tall) damage to the crops.'", answer: "heavy" },
        { prompt: "Choose: 'Her (winsome / gruesome) smile won everyone over.'", answer: "winsome" },
        { prompt: "Choose: 'The teacher (told / said) the class to be quiet.'", answer: "told", method: "'Tell' takes a person after it; 'say' does not." },
      ],
      pyqExampleId: "13d75aec-3898-4ed4-98a8-c598c39b33bc",
      traps: [
        {
          title: "Look-alike words can have opposite feelings",
          body:
            "Gruesome means horrible and winsome means charming. Read every letter of an option before you decide it fits.",
        },
        {
          title: "The word after the gap can rule an option out",
          body:
            "'Refuse' is followed by 'to' and a verb (refused to answer), so it cannot go before a 'that' clause. 'Deny' can: 'She denied that she was late.'",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spifbwo-collocation",
      name: "Words that always go together",
      intuition:
        "A collocation is a pair of words that English always puts together, like 'heavy rain' or 'make a mistake'. Another word with the same meaning sounds wrong in its place: nobody says 'big rain' or 'do a mistake'. " +
        "Fill-in-the-blank questions often give three near-synonyms and one collocation. Learn the pairs.",
      definition:
        "How to use the table:\n" +
        "- Learn each phrase as one unit, with its meaning.\n" +
        "- When the options are close in meaning, ask which one **this phrase** takes.\n" +
        "- A phrasal verb (a verb with a small word such as up, off or out) has its own meaning: **set up** is not **put up**.",
      table: {
        columns: ["Phrase", "Meaning", "Correct example"],
        rows: [
          { cells: ["commit to memory", "learn by heart", "She committed the poem to memory."] },
          { cells: ["previous conviction", "an earlier finding of guilt in court", "The thief had two previous convictions."] },
          { cells: ["set someone up as", "start someone in a business or post", "His aunt set him up as a tailor."] },
          { cells: ["put someone up", "give someone a place to stay", "Our friends put us up for the night."] },
          { cells: ["make a mistake", "do something wrong", "I made a mistake in the sum."], noteAmber: "Not 'do a mistake'." },
          { cells: ["pay attention", "listen or look carefully", "Pay attention to the teacher."] },
          { cells: ["keep a promise", "do what you said you would", "He always keeps his promises."] },
          { cells: ["take part in", "join in an activity", "She took part in the race."] },
        ],
        caption: "Near-synonyms are the usual wrong options: retain, keep and hoard sound close to commit but do not fit 'to memory'.",
      },
      pyqExampleId: "4c67c2c1-38ae-42a4-8bac-a1f50474b694",
      selfCheckExample: {
        prompt:
          "Fill in the blank: You must ____ attention in class if you want to understand the lesson. (a) give (b) pay (c) put (d) keep",
        steps: [
          "The fixed phrase is 'pay attention'.",
          "'Give attention' and 'keep attention' are not the usual pair, and 'put attention' is not English.",
        ],
        answer: "(b) pay",
      },
      practiceSet: [
        { prompt: "Complete the phrase: 'I ____ a mistake in the last sum.' (did / made)", answer: "made" },
        { prompt: "Complete the phrase: 'She always ____ her promises.' (keeps / holds)", answer: "keeps" },
        {
          prompt: "Complete the phrase: 'Our cousins ____ us up for the night when we missed the train.' (set / put)",
          answer: "put",
          method: "To put someone up is to give them a place to stay.",
        },
        { prompt: "What does 'a previous conviction' mean?", answer: "An earlier finding of guilt in court." },
      ],
      traps: [
        {
          title: "Same meaning, wrong partner",
          body:
            "Retain and commit both relate to memory, but only 'commit' takes 'to memory'. In a collocation question the near-synonym is the trap.",
        },
        {
          title: "A small word changes a phrasal verb",
          body:
            "'Set up' starts something (set up a shop); 'put up' gives a guest a bed; 'make up' invents a story. Learn the meaning of each pair, not of the verb alone.",
        },
      ],
    },
  ],
};
