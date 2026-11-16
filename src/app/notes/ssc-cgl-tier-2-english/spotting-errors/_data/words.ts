import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ESE_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Errors in Comparison, Words and Prepositions",
  title: "Errors in Comparison, Words and Prepositions",
  oneLineDefinition:
    "A wrong comparative or superlative, a wrong word form (fastly, wiser), a wrong preposition or a word in the wrong place, and the sentences that have no error at all.",
  whyItMatters:
    "18 of the 29 Tier II error questions, 16 EASY and 2 MODERATE. Comparison alone is 9 of them, the largest single group in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2esewd-compare",
      name: "Comparatives and superlatives",
      intuition:
        "Two things compared take the comparative with 'than' (slower than, more handsome than). Three or more take the superlative with 'the' (the most challenging). Some adjectives, like round and universal, cannot be compared at all.",
      definition:
        "- **Two things:** -er or more + than: 'slower than', 'more handsome than'.\n" +
        "- **Joined comparatives** share 'than': 'taller and more handsome than', never 'most handsome than'.\n" +
        "- **The best of all:** the + -est or most: 'the most challenging task I have ever faced'.\n" +
        "- **No comparison:** absolute adjectives (round, unique, universal, perfect) take no -er or most.\n" +
        "- **'More' before a number** needs 'than': 'more than six hundred'.\n" +
        "- **Plain form** after 'a very': 'a very wise ruler', not 'a very wiser'.",
      authoredExample: {
        prompt: "Improve the underlined part: Of all the rivers in the state, this is the long one.",
        steps: ["'Of all' compares more than two.", "The superlative 'the longest' is needed."],
        answer: "the longest",
      },
      selfCheckExample: {
        prompt: "Improve the underlined part: My brother is more stronger than me.",
        steps: ["'Stronger' is already a comparative.", "Adding 'more' doubles it."],
        answer: "stronger",
      },
      practiceSet: [
        { prompt: "Correct the error: She is cleverer and most hardworking than her cousin.", answer: "more hardworking" },
        { prompt: "Correct the error: He paid more four thousand rupees for the phone.", answer: "more than four thousand" },
        { prompt: "Correct the error: This plate is more round than that one.", answer: "Round cannot be compared: say 'This plate is round and that one is not' (or use 'more circular')." },
      ],
      pyqExampleId: "57d76d96-a712-44bf-bdb6-bbce9e71ce40",
      traps: [
        {
          title: "Comparing an adjective that cannot be compared",
          body: "Universal, round, unique and perfect describe a state that is complete. 'More universal' or 'rounder stone' is the error.",
        },
        {
          title: "Marking a correct comparison as wrong",
          body: "'Not more popular than' is correct English. When the underlined part already pairs 'more' with 'than', choose no substitution.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esewd-prep",
      name: "Prepositions in fixed phrases",
      intuition:
        "Many prepositions are fixed by the words around them: on the first floor, by hand, peals of laughter, get a coat off. They have to be learnt as pairs, the same way idioms are.",
      definition:
        "- **Place:** on a floor ('on the first floor'), at a station, in a city.\n" +
        "- **Means:** by hand, by bus, by post.\n" +
        "- **Fixed nouns:** peals of laughter, a fit of anger, a piece of advice.\n" +
        "- **Beside and besides:** beside = next to; besides = in addition to.\n" +
        "- **Off and of:** off = away from ('took the coat off him'); of = belonging to.",
      authoredExample: {
        prompt: "Find the error: The parcel was / sent through post / to my office / last week.",
        steps: ["Sending by a means of transport or service uses 'by'.", "'Through post' should be 'by post'."],
        answer: "sent through post (should be 'sent by post')",
      },
      selfCheckExample: {
        prompt: "Improve the underlined part: She sat besides her friend during the film.",
        steps: ["The meaning is 'next to'.", "That is 'beside', not 'besides'."],
        answer: "beside her friend",
      },
      practiceSet: [
        { prompt: "Correct the preposition: Our office is in the third floor.", answer: "on the third floor" },
        { prompt: "Correct the preposition: The letter was written from hand.", answer: "by hand" },
        { prompt: "Correct the preposition: The crowd burst into a roar for applause.", answer: "a roar of applause" },
      ],
      pyqExampleId: "c92ffdef-aab2-4517-ae9c-73f7127fc060",
      traps: [
        {
          title: "Changing the verb when only the preposition is wrong",
          body: "In 'was standing besides the poster', the tense is right; changing 'standing' to 'stood' adds a second error. Fix only the word that is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2esewd-word",
      name: "Word form, word order and no error",
      intuition:
        "Some errors are a single word in the wrong form (fastly for fast) or the wrong place (married happily for happily married). And some sentences are correct: 'No error' is a real answer, not a filler option.",
      definition:
        "- **Adverbs without -ly:** fast, hard, late, early stay the same as adverbs: 'ran fast', never 'fastly'.\n" +
        "- **Set word order:** 'happily married', 'went for a ride', not 'married happily' or 'went afar a ride'.\n" +
        "- **No error:** if the tense, agreement, pronouns and prepositions all check out, mark no error with confidence.",
      authoredExample: {
        prompt: "Improve the underlined part: The workers worked hardly to finish the bridge on time.",
        steps: ["'Hardly' means 'almost not'.", "The adverb of 'hard work' is 'hard' itself."],
        answer: "hard",
      },
      selfCheckExample: {
        prompt: "Find the error, if any: She reached the station / early in the morning / and caught / the first train.",
        steps: ["Tense: all past. Agreement: fine.", "'Early' is correct as an adverb, and 'caught the first train' is correct."],
        answer: "No error",
      },
      practiceSet: [
        { prompt: "Correct the word: He came lately to the meeting.", answer: "late" },
        { prompt: "Correct the word order: My grandparents have been married happily for fifty years.", answer: "happily married" },
        { prompt: "Correct the phrase: We went afar a walk after dinner.", answer: "went for a walk" },
      ],
      pyqExampleId: "45620f47-a6d7-4fdc-8a19-1b06a2d60ab2",
      traps: [
        {
          title: "Adding -ly to every adverb",
          body: "Fast, hard and late are already adverbs. 'Hardly' and 'lately' are different words with different meanings.",
        },
      ],
    },
  ],
};
