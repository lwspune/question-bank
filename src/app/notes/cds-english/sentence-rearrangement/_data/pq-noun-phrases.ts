import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_NOUN_PHRASES_NOTE: SubtopicNote = {
  subtopicName: "Noun Phrases (PQRS)",
  title: "Noun Phrases: Keep the Noun's Words Together",
  oneLineDefinition:
    "An article or an adjective at the end of a part (a, the, some of the, modern) points to a noun, and the part that starts with that noun must come next.",
  whyItMatters:
    "Examiners often cut a sentence between a describing word and its noun: 'a successful' in one part, 'man' in another. " +
    "The first part then ends on a word that cannot stand alone, so the part with its noun is forced to follow. It is one of the quickest pairs to lock.",
  concepts: [
    {
      kind: "formula",
      slug: "cdsenpq-adjective-noun",
      name: "An adjective or article needs its noun",
      intuition:
        "a, the, some of the, light, modern: these words describe or point to a noun. On their own they mean nothing. " +
        "If a part ends on one of them, the next part must begin with its noun.",
      definition:
        "The terms:\n" +
        "- **Article**: a, an or the. It always comes before a noun.\n" +
        "- **Adjective**: a word that describes a noun: modern, successful, brief.\n" +
        "- **Noun phrase**: a noun with all its describing words: a successful man; some of the most spectacular gold coins.\n" +
        "The method:\n" +
        "- Read the last word of each part. If it is a, an, the, some of the, or an adjective, the part ends in the middle of a noun phrase.\n" +
        "- Find the part that begins with a noun that fits: the right meaning and the right number (a takes one thing, several takes many).\n" +
        "- Lock the pair. Strike every option that separates them or puts the first part last.\n" +
        "- A part ending on 'a brief and' or 'significant and' needs a second adjective and then the noun: a brief and pointed saying.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: a brave / Q: soldier who saved / R: the young cadet was praised as / S: three lives in the flood. " +
          "Options: (a) RPQS (b) RQPS (c) PQRS (d) RSPQ",
        steps: [
          "P ends on the adjective 'brave'. Brave what? Q starts with the noun 'soldier'. Lock P Q.",
          "Options with P then Q side by side: (a) and (c).",
          "R holds the subject 'the young cadet' and its verb. R also ends on 'as', which needs a noun phrase after it: 'a brave soldier'. So R comes before P Q.",
          "That is (a). In (c), 'who saved' would be followed by 'the young cadet was praised', which makes no sense.",
          "Read it: 'the young cadet was praised as a brave soldier who saved three lives in the flood'.",
        ],
        answer: "(a) RPQS",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: some of the / Q: finest paintings / R: in the city museum / S: the visitors admired. " +
          "Options: (a) SPQR (b) SQPR (c) PSQR (d) RPSQ",
        steps: [
          "P ends on 'the', an article. Some of the what? Q, 'finest paintings'. Lock P Q.",
          "S holds the subject and verb; admired what? 'some of the finest paintings'. So S P Q.",
          "Only (a) has S P Q. R closes it.",
        ],
        answer: "(a) SPQR",
      },
      practiceSet: [
        {
          prompt: "Can 'the most' end a sentence?",
          answer: "No.",
          method: "It needs an adjective and a noun: the most famous fort.",
        },
        {
          prompt: "Arrange: P: modern / Q: weapons / R: the army bought",
          answer: "R, P, Q: the army bought modern weapons.",
        },
        {
          prompt: "Which part follows 'a brief but'? P: useful talk / Q: the officer gave",
          answer: "P: a brief but useful talk.",
          method: "The second adjective and the noun complete the phrase.",
        },
        {
          prompt: "Which part can follow 'a few'? P: soldiers / Q: soldier",
          answer: "P",
          method: "a few takes a plural noun.",
        },
      ],
      pyqExampleId: "0d522021-f9ad-4c36-b893-509498a7f915",
      traps: [
        {
          title: "Ending on an article or adjective",
          body:
            "An option whose last part ends on 'a', 'the', 'some of the' or an adjective leaves the noun missing. Strike it at once.",
        },
        {
          title: "The wrong number",
          body:
            "a and an take one thing; several, many and some of the take more than one. " +
            "If two parts both start with a noun, the number of the noun often shows which one belongs after the article.",
        },
        {
          title: "Joining the adjective to the wrong noun",
          body:
            "'the coarse' could take 'woollens' or 'weather'. Both are nouns, but only one lets every other part find a home. " +
            "Check the whole sentence, not just the pair.",
        },
      ],
    },
  ],
};
