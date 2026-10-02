import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_ADJECTIVES_NOTE: SubtopicNote = {
  subtopicName: "Parts of Speech: Adjectives and Determiners",
  title: "Adjectives, pointing words and degrees of comparison",
  oneLineDefinition:
    "An adjective describes a noun. Pointing words such as this, his and which stand before a noun and limit it. Degrees of comparison change the adjective's form to compare.",
  whyItMatters:
    "Describing words come up two ways: as the underlined word whose class you must name, and as a blank in front of a noun. " +
    "This, that, his and which are the hardest: the same word is a describing word before a noun and a pronoun when it stands alone.",
  concepts: [
    // C1 — what an adjective does
    {
      kind: "formula" as const,
      slug: "cdsenpos-adjective-job",
      name: "An adjective describes a noun, before it or after 'be'",
      intuition:
        "An adjective answers 'what kind?' about a noun: a **solo** fight, **dull** clouds. " +
        "It can sit right before its noun, or after a verb like 'is' or 'seems', and still describe the same noun.",
      definition:
        "Two positions:\n" +
        "- **Attributive**: right before the noun (meaningless **letters**, far-off **days**, the mighty **river**).\n" +
        "- **Predicative**: after be, seem, become, look, turn, describing the subject (The conclusions are **questionable**; It is **obligatory** to ...).\n" +
        "Forms that still count as adjectives:\n" +
        "- Words ending in -ed or -ing that describe a noun: an **anguished** letter, a **smiling** face.\n" +
        "- Hyphenated words: **far-off** days, a **well-known** writer.\n" +
        "- Two adjectives in a row: the **dull** grey clouds (both describe 'clouds').\n" +
        "The method:\n" +
        "- Find the noun the word describes. Ask 'what kind of [noun]?'.\n" +
        "- If the word answers it, it is an adjective, wherever it sits.\n" +
        "- If the word describes an action instead (spoke **softly**), it is not an adjective.",
      authoredExample: {
        prompt:
          "Name the part of speech of the underlined word: The \\(\\underline{\\text{tired}}\\) soldiers rested by the river.",
        steps: [
          "'Tired' looks like a past-tense verb because it ends in -ed.",
          "But the verb of the sentence is 'rested'. 'Tired' stands right before the noun 'soldiers'.",
          "Ask 'what kind of soldiers?' Tired soldiers. It describes the noun.",
        ],
        answer: "Adjective.",
      },
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: The road to the village is \\(\\underline{\\text{narrow}}\\).",
        steps: [
          "The word comes after 'is', not before a noun.",
          "Ask what it describes: the road. A narrow road.",
          "A word after 'is' that describes the subject is a predicative adjective.",
        ],
        answer: "Adjective.",
      },
      practiceSet: [
        { prompt: "She sat on a \\(\\underline{\\text{wooden}}\\) chair.", answer: "Adjective", method: "what kind of chair?" },
        { prompt: "The milk turned \\(\\underline{\\text{sour}}\\).", answer: "Adjective", method: "'turned' works like 'became'; sour milk" },
        { prompt: "He drove \\(\\underline{\\text{carefully}}\\).", answer: "Adverb", method: "it describes how he drove, not a noun" },
        { prompt: "It was a \\(\\underline{\\text{golden}}\\) chance.", answer: "Adjective" },
      ],
      pyqExampleId: "a2aa8a8e-1a2b-44ba-9587-447367a2bfce",
      traps: [
        {
          title: "An adjective can stand far from its noun",
          body:
            "In 'The conclusions that they came to are highly \\(\\underline{\\text{questionable}}\\)', the noun is at the start. The word after 'are' still describes it: **adjective**. 'Highly' is the adverb.",
        },
        {
          title: "An -ed word before a noun",
          body:
            "'An anguished letter' has no action in it. A word ending in -ed that stands before a noun and describes it is an **adjective**, not a verb.",
        },
        {
          title: "'Only' changes with its place",
          body:
            "'His only answer' means his single answer: 'only' describes the noun, so it is an **adjective**. In 'He only smiled', 'only' goes with the verb, so it is an **adverb**.",
        },
      ],
    },

    // C2 — pointing words (determiners)
    {
      kind: "reference" as const,
      slug: "cdsenpos-pointing-words",
      name: "Pointing words before a noun: this, that, his, which (determiners)",
      intuition:
        "Some words before a noun do not describe it. They point to it or say whose it is: **this** boy, **my** pen, **which** way. " +
        "Modern grammar calls them determiners; older books call them adjectives. Put the same word alone and it becomes a pronoun.",
      definition:
        "Terms:\n" +
        "- A **determiner** stands before a noun and points to it or limits it. The articles a, an, the are determiners too.\n" +
        "- **Demonstrative**: this, that, these, those. Before a noun = demonstrative adjective (**this** boy). Alone = demonstrative pronoun (**This** is mine).\n" +
        "- **Possessive adjective**: my, your, his, her, its, our, their. Always before a noun (**her** bag).\n" +
        "- **Possessive pronoun**: mine, yours, his, hers, ours, theirs. Always alone (The bag is **hers**).\n" +
        "- **Interrogative adjective**: which, what, whose before a noun in a question (**Which** way?).\n" +
        "The test: is there a noun right after the word?\n" +
        "- Yes: adjective (determiner).\n" +
        "- No: pronoun.",
      table: {
        columns: ["Word", "In the sentence", "Job here", "Sitting"],
        rows: [
          {
            cells: ["This", "This boy is stronger than Ramesh", "Demonstrative adjective: points to 'boy'", "2020 (II)"],
            pyqExampleId: "886606fd-6b46-46e9-98a2-90aa9bf8abc2",
          },
          {
            cells: ["his", "This is his pen", "Possessive adjective: stands before 'pen'", "2020 (II)"],
          },
          {
            cells: ["This", "This time we woke up to the virus related diseases", "Demonstrative: points to 'time'", "2021 (I)"],
            pyqExampleId: "30f83a66-c6ed-4223-bea3-face2941360c",
          },
          {
            cells: ["that", "I like that boy", "Demonstrative adjective: points to 'boy'", "2023 (I)"],
            noteAmber:
              "No 'Adjective' or 'Determiner' option was given here. When the exact label is missing, pick the closest one offered: 'Demonstrative Pronoun' at least names the right word family.",
          },
          {
            cells: ["Which", "Which way shall we go?", "Interrogative adjective: asks about 'way'", "2023 (I)"],
            pyqExampleId: "4d99db5b-9a6b-47bf-9721-c5f7b27259c8",
          },
          {
            cells: ["his", "one of the tallest boys in his class", "Possessive adjective: stands before 'class'", "2024 (II)"],
            noteAmber:
              "No possessive-adjective option was given here. The closest label offered was 'Possessive Pronoun'.",
          },
        ],
        caption: "'His' is the one word that is both: 'his pen' (adjective) and 'The pen is his' (pronoun).",
      },
      pyqExampleId: "9aacafa9-32d2-4381-912b-236e27352ca5",
      selfCheckExample: {
        prompt:
          "Name the class of the underlined word: \\(\\underline{\\text{Those}}\\) mangoes are ripe.",
        steps: [
          "Is there a noun right after it? Yes, 'mangoes'.",
          "The word points to the mangoes; it does not describe their quality.",
          "A pointing word before a noun is a demonstrative adjective (a determiner). In 'Those are ripe' it would be a pronoun.",
        ],
        answer: "Demonstrative adjective (determiner).",
      },
      practiceSet: [
        { prompt: "\\(\\underline{\\text{Their}}\\) house is near the lake.", answer: "Possessive adjective", method: "a noun follows" },
        { prompt: "The red bag is \\(\\underline{\\text{mine}}\\).", answer: "Possessive pronoun", method: "no noun follows" },
        { prompt: "\\(\\underline{\\text{What}}\\) colour do you like?", answer: "Interrogative adjective", method: "it asks about the noun 'colour'" },
        { prompt: "\\(\\underline{\\text{These}}\\) are my cousins.", answer: "Demonstrative pronoun", method: "it stands alone" },
      ],
      traps: [
        {
          title: "Same word, two classes",
          body:
            "This, that, these, those, which and what are **adjectives (determiners)** before a noun and **pronouns** on their own. Look at the next word before you answer.",
        },
        {
          title: "Her or hers",
          body:
            "'Her bag' (possessive adjective, a noun follows) and 'The bag is hers' (possessive pronoun, alone). Only 'his' and 'its' keep the same form in both jobs, so 'his' needs the noun test every time.",
        },
        {
          title: "'This' is not an article",
          body:
            "The only articles are **a, an, the**. An option 'Article' for this or that is always wrong.",
        },
      ],
    },

    // C3 — degrees of comparison
    {
      kind: "formula" as const,
      slug: "cdsenpos-degrees",
      name: "Degrees of comparison: positive, comparative, superlative",
      intuition:
        "An adjective has three forms. One thing alone: tall. Two things compared: taller. One out of three or more: the tallest. " +
        "The rest of the sentence tells you which form it wants.",
      definition:
        "The three degrees:\n" +
        "- **Positive**: the plain form (tall, beautiful, late).\n" +
        "- **Comparative**: two things compared; -er or more (taller, more beautiful). Signal: **than**.\n" +
        "- **Superlative**: one out of three or more; -est or most (the tallest, the most beautiful). Signals: **the**, of all, in the class, in the world.\n" +
        "Irregular forms:\n" +
        "- good, better, best; bad, worse, worst; little, less, least; many/much, more, most; late, later, latest.\n" +
        "The method:\n" +
        "- Read the signal words: 'than' wants the comparative; 'the ... of all' wants the superlative.\n" +
        "- Use only one marker: 'more taller' and 'most tallest' are wrong.\n" +
        "- A degree form before a noun is still an **adjective** (the **latest** news, **less** attention).",
      authoredExample: {
        prompt:
          "Fill in the blank: Of the three brothers, Arun is _______. (a) taller (b) the tallest (c) more tall (d) tallest",
        steps: [
          "'Of the three brothers' compares one with more than two, so the superlative is needed.",
          "(a) is comparative and (c) is a wrong form.",
          "A superlative needs 'the' before it, so (d) without 'the' is incomplete.",
        ],
        answer: "(b) the tallest.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: This road is _______ than the highway. (a) narrow (b) narrower (c) the narrowest (d) most narrow",
        steps: [
          "The signal word is 'than'.",
          "'Than' compares two things, so the comparative is needed.",
          "The comparative of 'narrow' is 'narrower'.",
        ],
        answer: "(b) narrower.",
      },
      practiceSet: [
        { prompt: "What is the comparative of 'good'?", answer: "better" },
        { prompt: "the \\(\\underline{\\text{oldest}}\\) temple in the town: class and degree?", answer: "Adjective, superlative degree" },
        { prompt: "Correct the sentence: 'She is more cleverer than her sister.'", answer: "She is cleverer than her sister.", method: "one comparative marker only" },
        { prompt: "What is the superlative of 'little' (amount)?", answer: "least" },
      ],
      pyqExampleId: "8ed6cfc8-de6b-4b55-a661-dafdd49fcc54",
      traps: [
        {
          title: "Two markers at once",
          body:
            "'More better', 'more cleverer' and 'most tallest' are always wrong. Use -er or more, -est or most, never both.",
        },
        {
          title: "A degree form is still an adjective",
          body:
            "'Latest' in 'the latest news' and 'less' in 'less attention' describe a noun, so they are **adjectives**. When 'most beautiful' is underlined as one piece before a noun, the whole is an adjective too.",
        },
        {
          title: "'Very' is not a degree",
          body:
            "'Very eloquent' is still the positive degree; 'very' only strengthens it. When the sentence compares one person with all others, only the superlative fits.",
        },
      ],
    },

    // C4 — blank by class
    {
      kind: "formula" as const,
      slug: "cdsenpos-blank-by-class",
      name: "Fill a blank by the class the slot needs, then by meaning",
      intuition:
        "A blank has neighbours, and the neighbours decide which class can fit. Often the four options are one word in four forms: a noun, an adjective, an adverb, a verb. " +
        "Find the class first. Meaning comes second.",
      definition:
        "Read the slot:\n" +
        "- Blank right **before a noun** (_______ growth): an **adjective**.\n" +
        "- Blank **after the / a** and before 'of' or a verb (The _______ of the car): a **noun**.\n" +
        "- Blank after a subject, where the action should be: a **verb**.\n" +
        "- Blank describing a verb or an adjective: an **adverb**.\n" +
        "The method:\n" +
        "- Strike every option of the wrong class.\n" +
        "- If one is left, that is the answer.\n" +
        "- If several are left, or all four are the same class, choose by meaning: the word that makes sense and usually goes with its neighbour.",
      authoredExample: {
        prompt:
          "Fill in the blank: The _______ rise in prices worried every family. (a) sharp (b) sharply (c) sharpness (d) sharpen",
        steps: [
          "The blank sits between 'The' and the noun 'rise'. It must describe the noun, so an adjective is needed.",
          "'Sharply' is an adverb, 'sharpness' a noun, 'sharpen' a verb. Strike them.",
          "Only 'sharp' is an adjective: a sharp rise.",
        ],
        answer: "(a) sharp.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: The _______ of the new bridge took two years. (a) construct (b) constructive (c) construction (d) constructively",
        steps: [
          "The blank comes after 'The' and before 'of'. It is the subject of 'took', so a noun is needed.",
          "'Construct' is a verb, 'constructive' an adjective, 'constructively' an adverb.",
          "Only 'construction' is a noun.",
        ],
        answer: "(c) construction.",
      },
      practiceSet: [
        { prompt: "She sings _______. (beautiful / beautifully)", answer: "beautifully", method: "it describes the verb 'sings', so an adverb" },
        { prompt: "His _______ to the team was praised. (contribute / contribution)", answer: "contribution", method: "after 'His', the subject: a noun" },
        { prompt: "We need a _______ solution. (practical / practically)", answer: "practical", method: "before the noun 'solution': an adjective" },
        { prompt: "The village needs clean drinking _______. (water / thirst / rain / river)", answer: "water", method: "all four are nouns, so meaning decides" },
      ],
      pyqExampleId: "cd8f3692-0a82-4859-bdc9-e37ed675d100",
      traps: [
        {
          title: "Four forms of one word",
          body:
            "When the options share a root, three of them are the wrong class. They look right because the meaning is close. Decide the class from the slot before you read the meanings.",
        },
        {
          title: "When all four are the same class",
          body:
            "If every option is a noun, the grammar test cannot help. Read the whole sentence and pick the word that makes sense with it, as in 'Developing _______ ... requires detailed planning'.",
        },
        {
          title: "A verb-looking word can be a noun",
          body:
            "In 'The _______ of the car is unknown', the answer is 'make', which here is a noun meaning the brand. Trust the slot (after 'The', before 'of'), not the look of the word.",
        },
      ],
    },
  ],
};
