import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const SPI_SE_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions and Fixed Phrases",
  title: "Prepositions and Fixed Phrases",
  oneLineDefinition:
    "Many English words take one fixed preposition, and some take none at all; a wrong or extra preposition is the error.",
  whyItMatters:
    "Eight questions in the bank test a preposition, one of them from the 2022 paper. Two are EASY and six MODERATE. No rule tells you the right preposition: it belongs to the word, so the pairs have to be learnt.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spisepr-after-word",
      name: "The preposition a word takes",
      intuition:
        "A preposition is a small word such as in, on, at, of, for, from or to. Many verbs and describing words come with their own preposition, and changing it makes the sentence wrong even though the meaning is clear. " +
        "A few words take no preposition at all, and adding one is the error.",
      definition:
        "Learn the word with its partner:\n" +
        "- **different from** (not different than), **senior to** and **junior to** (not senior than), **prefer A to B**.\n" +
        "- **consist of**, but **comprise** takes nothing: 'The kit comprises a bat and pads.'\n" +
        "- **discuss** takes nothing: 'We discussed the plan', not 'discussed about'.\n" +
        "- **comment on** (or upon) something.\n" +
        "- **as** for a job or role, **at** or **in** for a place: 'She works as a nurse at a hospital.'\n" +
        "- **for** shows a purpose: 'We need time for rest.'",
      table: {
        columns: ["Word", "Takes", "Correct example"],
        rows: [
          { cells: ["different", "from", "This bag is different from that one."] },
          { cells: ["senior, junior, superior, inferior", "to", "He is senior to me."] },
          { cells: ["consist", "of", "The kit consists of a bat and pads."] },
          { cells: ["comprise", "nothing", "The kit comprises a bat and pads."], noteAmber: "Never 'comprises of'." },
          { cells: ["discuss", "nothing", "We discussed the plan."] },
          { cells: ["comment", "on or upon", "She commented on the film."] },
          { cells: ["employed, works (a job)", "as", "He works as a driver."] },
          { cells: ["employed, works (a place)", "at or in", "He works at a hotel."] },
          { cells: ["time, money, leisure (a purpose)", "for", "We need money for books."] },
        ],
        caption: "When a word you know well appears with an unfamiliar preposition, test the pair before anything else.",
      },
      pyqExampleId: "e3bb3e74-4eef-46c6-8c5b-6126cca8ae2c",
      selfCheckExample: {
        prompt: item("Ravi is senior", "than me", "by two years."),
        steps: [
          "'Senior' is not a comparing word ending in -er, so it does not take 'than'.",
          "It takes 'to': senior to, junior to.",
          "The correct sentence: Ravi is senior to me by two years.",
        ],
        answer: "(b) than me",
      },
      practiceSet: [
        { prompt: "Correct the sentence: 'Let us discuss about the plan.'", answer: "Let us discuss the plan." },
        { prompt: "Correct the sentence: 'The book consists from five chapters.'", answer: "The book consists of five chapters." },
        {
          prompt: "Correct the sentence: 'Her uncle works at a teacher in Pune.'",
          answer: "Her uncle works as a teacher in Pune.",
          method: "A job takes 'as'; a place takes 'at' or 'in'.",
        },
        { prompt: "Correct the sentence: 'The flat comprises of two bedrooms.'", answer: "The flat comprises two bedrooms." },
      ],
      traps: [
        {
          title: "Comprise and discuss take no preposition",
          body:
            "'Comprises of' and 'discussed about' are among the commonest errors. Say 'consists of' or 'comprises', and 'discussed the matter'.",
        },
        {
          title: "As for a job, at for a place",
          body:
            "'She is employed at a clerk' is wrong because clerk is a job: 'employed as a clerk'. Use 'at' for the place: 'employed at a bank'.",
        },
        {
          title: "Senior and junior do not take than",
          body:
            "Only comparing words ending in -er (taller, better) take 'than'. Senior, junior, superior and inferior take 'to'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spisepr-phrases",
      name: "Fixed phrases with one right preposition",
      intuition:
        "Some phrases are fixed: native speakers always say them the same way, and one changed word makes them wrong. " +
        "These are learnt like vocabulary. If a phrase sounds almost right, check whether its preposition has been swapped.",
      definition:
        "Phrases to know:\n" +
        "- **taken by surprise**: surprised suddenly.\n" +
        "- **owing to**: because of. 'Owed to' is about a debt: 'Ten rupees are owed to me.'\n" +
        "- **in someone's absence** and **in someone's presence**, never 'at'.\n" +
        "- **stay clear of**: keep away from.\n" +
        "- **on foot**, **by mistake**, **by heart**.",
      table: {
        columns: ["Wrong", "Right", "Meaning"],
        rows: [
          { cells: ["taken with surprise", "taken by surprise", "surprised suddenly"] },
          { cells: ["owed to the rain", "owing to the rain", "because of the rain"], noteAmber: "'Owed to' means a debt is due to someone." },
          { cells: ["at his absence", "in his absence", "while he was away"] },
          { cells: ["stay clear from", "stay clear of", "keep away from"] },
          { cells: ["by foot", "on foot", "walking"] },
          { cells: ["in mistake", "by mistake", "without meaning to"] },
          { cells: ["learn on heart", "learn by heart", "learn word for word"] },
        ],
        caption: "These are fixed by use, not by a rule. Learn the whole phrase.",
      },
      pyqExampleId: "318f93f5-3e75-4dd4-87ae-92f0d9be69c6",
      selfCheckExample: {
        prompt: item("We walked to the fort", "by foot", "because the road was closed."),
        steps: [
          "The fixed phrase for walking is 'on foot'.",
          "'By' goes with vehicles: by bus, by car, but not by foot.",
          "The correct sentence: We walked to the fort on foot because the road was closed.",
        ],
        answer: "(b) by foot",
      },
      practiceSet: [
        { prompt: "Correct the sentence: 'The match was put off owed to rain.'", answer: "The match was put off owing to rain." },
        { prompt: "Correct the sentence: 'He took my umbrella in mistake.'", answer: "He took my umbrella by mistake." },
        {
          prompt: "Correct the sentence: 'The meeting was held at the principal's absence.'",
          answer: "The meeting was held in the principal's absence.",
        },
        { prompt: "Fill the fixed phrase: 'I learnt the poem ___ heart.'", answer: "by" },
      ],
      traps: [
        {
          title: "Owing to, not owed to",
          body:
            "To give a reason, write 'owing to' (because of). 'Owed to' is about money or thanks that are due: 'The shopkeeper is owed two hundred rupees.'",
        },
        {
          title: "Absence and presence take in",
          body:
            "'In my absence' and 'in your presence' are fixed. 'At my absence' is wrong even though 'at' sounds natural before many nouns.",
        },
      ],
    },
  ],
};
