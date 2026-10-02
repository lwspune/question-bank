import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_ADVERBS_NOTE: SubtopicNote = {
  subtopicName: "Parts of Speech: Adverbs",
  title: "Adverbs: how, when, where, how often, how much",
  oneLineDefinition:
    "An adverb tells how, when, where, how often or how much about a verb, an adjective or another adverb. Many end in -ly, but the ending is not the test.",
  whyItMatters:
    "Adverbs are one of the commonest answers in the underlined-word items. The easy ones end in -ly and describe an action. " +
    "The marks are in the look-alikes: words like first, right and better that carry no -ly, -ly words that are adjectives, and degree words such as very and too.",
  concepts: [
    // C1 — what an adverb does
    {
      kind: "formula" as const,
      slug: "cdsenpos-adverb-job",
      name: "An adverb modifies a verb, an adjective or another adverb",
      intuition:
        "An adjective goes with a noun. An adverb goes with almost everything else: an action (walked **slowly**), a describing word (**very** tall) or another adverb (**quite** slowly). " +
        "Find the word it goes with and ask which question it answers.",
      definition:
        "The kinds, by the question they answer:\n" +
        "- **Manner** (how?): slowly, abruptly, truthfully, loosely.\n" +
        "- **Time** (when?): now, thereafter, tomorrow, soon.\n" +
        "- **Place** (where?): here, outside, everywhere.\n" +
        "- **Frequency** (how often?): always, never, seldom, often.\n" +
        "- **Degree** (how much?): very, hardly, nearly, too.\n" +
        "- **Relative adverb**: where, when, why joining a clause without asking anything (**Where** there is peace, there will be prosperity).\n" +
        "The method:\n" +
        "- Find the word the underlined word goes with.\n" +
        "- A noun? Then it is an adjective, not an adverb.\n" +
        "- A verb, an adjective or another adverb? Ask how, when, where, how often or how much. If it answers one of these, it is an adverb.",
      authoredExample: {
        prompt:
          "Name the part of speech of the underlined word: The guard spoke \\(\\underline{\\text{rudely}}\\) to the visitors.",
        steps: [
          "The word goes with the verb 'spoke', not with a noun.",
          "Ask 'spoke how?' Rudely. It answers 'how?'.",
          "A word that tells how an action is done is an adverb of manner.",
        ],
        answer: "Adverb.",
      },
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: We will leave \\(\\underline{\\text{tomorrow}}\\).",
        steps: [
          "The word goes with the verb 'will leave'.",
          "Ask 'leave when?' Tomorrow. It answers 'when?'.",
          "So here it is an adverb of time. (In 'Tomorrow is a holiday' the same word is the subject: a noun.)",
        ],
        answer: "Adverb.",
      },
      practiceSet: [
        { prompt: "She \\(\\underline{\\text{seldom}}\\) eats out.", answer: "Adverb (of frequency)", method: "how often?" },
        { prompt: "The children are playing \\(\\underline{\\text{outside}}\\).", answer: "Adverb (of place)", method: "where?" },
        { prompt: "\\(\\underline{\\text{Tomorrow}}\\) is a holiday.", answer: "Noun", method: "it is the subject of 'is'" },
        { prompt: "I \\(\\underline{\\text{nearly}}\\) missed the bus.", answer: "Adverb (of degree)", method: "how much did I miss it?" },
      ],
      pyqExampleId: "9c94fc9e-f5de-4dcb-8d36-1f91f0f53728",
      traps: [
        {
          title: "'Hardly' does not mean 'in a hard way'",
          body:
            "'I can hardly believe it' means 'I can almost not believe it'. 'Hardly' is an adverb of degree. Do not mix it up with the adverb 'hard' (He works hard).",
        },
        {
          title: "'Where' that asks nothing",
          body:
            "In 'Where there is peace, there will be prosperity', 'where' asks no question and stands for no noun. It joins a clause of place: a **relative adverb**. Choose Adverb, not Interrogative or Relative pronoun.",
        },
        {
          title: "After a linking verb, an adjective",
          body:
            "'She sings **sweetly**' (adverb: how she sings). 'The song sounds **sweet**' (adjective: it describes the song, after a linking verb). Check whether the word goes with the action or with the noun.",
        },
      ],
    },

    // C2 — look-alikes
    {
      kind: "formula" as const,
      slug: "cdsenpos-lookalikes",
      name: "Look-alikes: 'first', 'right', 'better' are adverbs; 'timely' is not",
      intuition:
        "Two kinds of word fool the eye. Some adverbs have no -ly at all: fast, hard, late, first. And some adjectives do end in -ly: timely, friendly, costly. " +
        "The ending tells you nothing. The job tells you everything.",
      definition:
        "Terms:\n" +
        "- A **flat adverb** has the same form as the adjective: fast, hard, late, early, first, right, straight. Run **fast** (adverb); a **fast** car (adjective).\n" +
        "- **-ly adjectives**: timely, friendly, lovely, costly, lonely, likely. They describe nouns: a **timely** delivery.\n" +
        "- **Better** and **best** are the comparative and superlative of both 'good' (adjective) and 'well' (adverb).\n" +
        "The method:\n" +
        "- Ignore the ending.\n" +
        "- Does the word go with a noun? Adjective.\n" +
        "- Does it go with a verb (came first, sings better, works hard)? Adverb.",
      authoredExample: {
        prompt:
          "Name the part of speech of the underlined word: Ravi works \\(\\underline{\\text{hard}}\\) on his farm.",
        steps: [
          "'Hard' has no -ly, so it looks like an adjective.",
          "It goes with the verb 'works'. Ask 'works how?' Hard.",
          "A word that tells how an action is done is an adverb, whatever its ending.",
        ],
        answer: "Adverb.",
      },
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: She gave me a \\(\\underline{\\text{friendly}}\\) smile.",
        steps: [
          "'Friendly' ends in -ly, so it looks like an adverb.",
          "It stands before the noun 'smile' and says what kind of smile.",
          "A word that describes a noun is an adjective.",
        ],
        answer: "Adjective.",
      },
      practiceSet: [
        { prompt: "The train arrived \\(\\underline{\\text{late}}\\).", answer: "Adverb", method: "arrived when?" },
        { prompt: "That was a \\(\\underline{\\text{costly}}\\) mistake.", answer: "Adjective", method: "it describes 'mistake'" },
        { prompt: "He runs \\(\\underline{\\text{faster}}\\) than his brother.", answer: "Adverb (comparative)", method: "runs how?" },
        { prompt: "This is a \\(\\underline{\\text{fast}}\\) train.", answer: "Adjective", method: "it describes 'train'" },
      ],
      pyqExampleId: "c4efd812-356c-45dc-b0fe-1833b2167209",
      traps: [
        {
          title: "-ly does not mean adverb",
          body:
            "'The timely delivery' and 'a friendly smile': each -ly word describes a noun, so it is an **adjective**. Some words do both jobs: 'a **daily** paper' (adjective) and 'it is published **daily**' (adverb).",
        },
        {
          title: "'Better' after a verb",
          body:
            "'She sings much better than I do': 'better' goes with 'sings', so it is the comparative of the adverb 'well'. In 'a better plan' it goes with a noun and is an adjective.",
        },
        {
          title: "'First' is not only a number",
          body:
            "'Who came first?' asks about the order of finishing. 'First' goes with the verb 'came', so it is an **adverb**. In 'the first prize' it describes a noun and is an adjective.",
        },
      ],
    },

    // C3 — degree words / intensifiers
    {
      kind: "reference" as const,
      slug: "cdsenpos-degree-words",
      name: "Degree words: very, too, extremely, most (intensifiers)",
      intuition:
        "Some adverbs only turn the volume of an adjective or adverb up or down: **very** cold, **too** heavy. " +
        "CDS calls them intensifiers. An intensifier is still an adverb: it is the adverb of degree under a narrower name.",
      definition:
        "Terms:\n" +
        "- An **intensifier** is an adverb of degree that strengthens or weakens an adjective or adverb: very, too, extremely, quite, rather, so, fairly.\n" +
        "- **Too** means more than is right or possible (too old to run fast). **Very** only strengthens (very old).\n" +
        "- **Most** before an adjective (the **most** beautiful) is an adverb of degree. **Most** before a noun (most people) is a determiner.\n" +
        "Which label to choose:\n" +
        "- If 'Intensifier' is offered, it is the more exact label for a degree word.\n" +
        "- If it is not offered, choose **Adverb**.\n" +
        "- Never choose Adjective: the word goes with an adjective, not with a noun.",
      table: {
        columns: ["Word", "In the sentence", "It strengthens", "Sitting"],
        rows: [
          {
            cells: ["most", "The most beautiful actor of the industry", "the adjective 'beautiful'", "2020 (I)"],
            pyqExampleId: "a1391b9c-dd93-4dbc-a296-2c08af4aaa6c",
          },
          {
            cells: ["very", "The flower is very beautiful", "the adjective 'beautiful'", "2020 (II)"],
          },
          {
            cells: ["extremely", "associated with extremely new civil societies", "the adjective 'new'", "2021 (II)"],
          },
          {
            cells: ["too", "Rakesh is too old to run fast", "the adjective 'old' (more than is right)", "2021 (II)"],
            pyqExampleId: "cbddae7b-7696-4833-8007-76d21a4bd398",
          },
        ],
        caption: "An intensifier is a kind of adverb: pick 'Intensifier' when it is offered, 'Adverb' when it is not.",
      },
      pyqExampleId: "e28ab16c-65c3-403d-87c7-4938a919d5c1",
      selfCheckExample: {
        prompt:
          "Name the class of the underlined word: The test was \\(\\underline{\\text{quite}}\\) easy. The options are: Adjective, Intensifier, Pronoun, Conjunction.",
        steps: [
          "The word goes with the adjective 'easy', so it is not an adjective itself.",
          "It tells how easy: it sets the degree.",
          "A degree word is an intensifier, and that label is offered.",
        ],
        answer: "Intensifier.",
      },
      practiceSet: [
        { prompt: "It is \\(\\underline{\\text{rather}}\\) cold today. Class?", answer: "Intensifier (adverb of degree)" },
        { prompt: "Spot the wrong row: (1) 'so' in 'so tired' is an adverb of degree; (2) 'so' in 'It rained, so we stayed in' is an adverb of degree.", answer: "Row 2", method: "there 'so' joins two clauses: a conjunction" },
        { prompt: "'Most' in '\\(\\underline{\\text{Most}}\\) students passed': intensifier or determiner?", answer: "Determiner", method: "it stands before a noun" },
        { prompt: "The food was \\(\\underline{\\text{fairly}}\\) good. Class?", answer: "Intensifier (adverb of degree)" },
      ],
      traps: [
        {
          title: "'Most' before an adjective is not an adjective",
          body:
            "In 'the \\(\\underline{\\text{most}}\\) beautiful actor', 'most' goes with 'beautiful', an adjective. A word that modifies an adjective is an **adverb** of degree.",
        },
        {
          title: "Too is not very",
          body:
            "'Too old to run' means so old that he cannot run. 'Very old' only means old to a high degree. In a blank, 'too' needs a 'to' or a problem after it.",
        },
        {
          title: "Two right labels, pick the narrower",
          body:
            "When both 'Adverb' and 'Intensifier' are offered for a degree word, choose **Intensifier**: it is the exact name. When only 'Adverb' is offered, that is correct.",
        },
      ],
    },
  ],
};
