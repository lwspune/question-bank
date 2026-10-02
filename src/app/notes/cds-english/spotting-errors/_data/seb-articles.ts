import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEB_ARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Articles, Determiners and Comparison",
  title: "Articles, determiners and comparison",
  oneLineDefinition:
    "The fourth check: look at the small word in front of each noun (a, an, the, few, much, every) and at the form of each adjective in a comparison.",
  whyItMatters:
    "A missing 'the' or a wrong 'much' is easy to read past, because the sentence still makes sense. That is exactly why the exam keeps setting it. " +
    "Go through the sentence noun by noun: does each one have the right word in front of it, and is each comparison in the right form?",
  concepts: [
    // C1 — degrees of comparison
    {
      kind: "reference" as const,
      slug: "cdsenseb-comparison",
      name: "Degrees of comparison: 'the' + superlative, -er + than",
      intuition:
        "Adjectives have three degrees: tall, taller, tallest. The comparative compares two things. The superlative picks one out of a group of three or more, and because it points to one particular member, it takes 'the'.",
      definition:
        "- **Articles** are a, an and the. A **determiner** is any word in front of a noun that tells which one or how many: the articles, this/that, my/your, some, many, every, few.\n" +
        "- **Comparative** (-er or more): compares two things and is followed by **than**: 'heavier than', 'more useful than'.\n" +
        "- **Superlative** (-est or most): picks one from three or more and takes **the**: 'the tallest', 'the most useful', 'the second largest', 'one of the most famous'.\n" +
        "- With **of the two**, use the comparative with 'the': 'the taller of the two sisters'.\n" +
        "- Never use two comparison markers together: 'more heavier' and 'most tallest' are wrong.\n" +
        "- A possessive can take the place of 'the': 'India's largest state' is correct.",
      table: {
        columns: ["Pattern", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["the + superlative", "Rajasthan is the largest state in India.", "2019 (II)"],
            pyqExampleId: "48a98415-2018-4177-ac50-d18e54f31162",
          },
          {
            cells: ["the + second / third + superlative", "K2 is the second highest peak in the world.", "2019 (I)"],
            pyqExampleId: "35b7a8e7-383b-4c57-a5ad-7e57cb0ad2a2",
          },
          {
            cells: ["one of the + superlative + plural noun", "It is one of the most famous poems in Hindi.", "2024 (I)"],
            pyqExampleId: "6a101f30-a14b-4c40-9093-9727caf6018c",
          },
          {
            cells: ["comparative + than", "This bag is lighter than that one.", "2017 (II)"],
            pyqExampleId: "213c40b9-8432-4ab8-95e8-8c26b385f7c2",
          },
        ],
        caption: "Senior, junior, superior, inferior and prior take 'to', not 'than': 'superior to', 'senior to'.",
      },
      pyqExampleId: "48a98415-2018-4177-ac50-d18e54f31162",
      selfCheckExample: {
        prompt: item("Of the two sisters,", "Meena is the tallest", "and the quieter."),
        steps: [
          "'Of the two sisters' compares exactly two people.",
          "Two things take the comparative, not the superlative: 'the taller', just as the sentence already says 'the quieter'.",
          "The wrong word 'tallest' is in part (b).",
        ],
        answer: "(b). Of the two sisters, Meena is **the taller** and the quieter.",
      },
      practiceSet: [
        { prompt: "Correct it: 'It was one of most thrilling finals ever played.'", answer: "It was one of **the most thrilling** finals ever played.", method: "A superlative takes 'the', even after 'one of'." },
        { prompt: "Correct it: 'This road is more wider than that one.'", answer: "This road is **wider** than that one.", method: "One comparison marker only." },
        { prompt: "Correct it: 'Gold is costlier from silver.'", answer: "Gold is costlier **than** silver.", method: "Comparative + than." },
        { prompt: "Correct it: 'He is senior than me.'", answer: "He is senior **to** me.", method: "Senior takes 'to'." },
      ],
      traps: [
        {
          title: "A superlative without 'the'",
          body: "'India is second most populous country' reads quickly, but a superlative needs 'the': 'the second most populous country'. Check the part that holds the superlative.",
        },
        {
          title: "Positive form before 'than'",
          body: "'This box is heavy than the other' has 'than' but no comparative. 'Than' always needs -er or more before it: 'heavier than'.",
        },
        {
          title: "Two comparison markers",
          body: "'More better', 'more wider' and 'most tallest' mark the comparison twice. Use one: 'better', 'wider', 'tallest'.",
        },
      ],
    },

    // C2 — when 'the' is needed
    {
      kind: "reference" as const,
      slug: "cdsenseb-the",
      name: "When 'the' is needed: same, a named event, a specific noun",
      intuition:
        "'The' tells the listener: you know which one I mean. Use it when the thing is the only one of its kind, when it has already been named, or when a phrase after it makes it specific.",
      definition:
        "- **the same**: 'same' always takes 'the': 'the same book'.\n" +
        "- A noun made specific by an **of-phrase** or a clause after it: 'the safety of the passengers', 'the book that you lent me'.\n" +
        "- Things that are the only one of their kind, and particular events or periods: **the sun**, **the monsoon**, **the recession**, **the Indian economy**.\n" +
        "- A **specific** singular noun, such as a particular rate or figure: '**The** literacy rate in Kerala is high.'\n" +
        "- No 'the' with a general uncountable or plural noun: 'Water is precious', 'Books are good friends', 'Honesty pays'.",
      table: {
        columns: ["Use 'the' with", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["same", "We stayed in the same hotel as last year.", "2023 (I)"],
            pyqExampleId: "2798b340-f8ba-43b6-a864-80399869bd03",
          },
          {
            cells: ["a particular rate or figure", "The literacy rate in Kerala is high.", "2019 (I)"],
            pyqExampleId: "70d745ec-45d1-41ae-b834-1aaab73278f4",
          },
          {
            cells: ["the monsoon", "The monsoon arrived early this year.", "2021 (I)"],
            pyqExampleId: "5b870406-90b5-4846-84cd-8f6916b5713b",
          },
          {
            cells: ["a particular period or event", "Many small shops closed during the lockdown.", "2024 (I)"],
            pyqExampleId: "78054025-074c-4ba1-992d-bee5f53dbdfc",
          },
        ],
        caption: "Ask: which one? If the sentence answers that question, the noun needs 'the'.",
      },
      pyqExampleId: "2798b340-f8ba-43b6-a864-80399869bd03",
      selfCheckExample: {
        prompt: item("Sun", "rises in the east", "and sets in the west."),
        steps: [
          "There is only one sun, so the noun is specific.",
          "A noun that is the only one of its kind takes 'the'.",
          "Part (a) needs 'The sun'. Parts (b) and (c) already have 'the east' and 'the west'.",
        ],
        answer: "(a). **The sun** rises in the east and sets in the west.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Taj Mahal is in Agra.'", answer: "**The** Taj Mahal is in Agra.", method: "A unique, named building takes 'the'." },
        { prompt: "Correct it: 'The honesty is the best policy.'", answer: "**Honesty** is the best policy.", method: "A general idea takes no 'the'." },
        { prompt: "Correct it: 'He is the best player of team.'", answer: "He is the best player of **the team**.", method: "A specific team: 'the'." },
        { prompt: "Correct it: 'Price of onions has gone up.'", answer: "**The price** of onions has gone up.", method: "An of-phrase makes 'price' specific." },
      ],
      traps: [
        {
          title: "'Same' never stands alone",
          body: "Whenever you see 'same' in front of a noun, check for 'the' before it. 'At same time' and 'in same class' are both errors.",
        },
        {
          title: "Don't add 'the' to a general idea",
          body: "Abstract and general nouns take no article: 'Honesty pays', 'Nature heals', 'Water boils at 100 degrees'. 'The honesty' is wrong unless a phrase makes it specific ('the honesty of the witness').",
        },
        {
          title: "A noun followed by 'of' usually needs 'the'",
          body: "'Safety of the passengers', 'history of India', 'price of rice': each is made specific by its of-phrase, so each needs 'the' in front.",
        },
      ],
    },

    // C3 — a / an and bare singular nouns
    {
      kind: "formula" as const,
      slug: "cdsenseb-a-an",
      name: "A singular countable noun needs a determiner; a vs an goes by sound",
      intuition:
        "In English, a singular countable noun cannot stand alone. It needs a, an, the, or a word such as my, this or their in front of it. And the choice between 'a' and 'an' depends on the first sound you say, not the first letter you see.",
      definition:
        "- A **singular countable** noun needs a determiner: 'a guest', 'the trip', 'their favourite star', not bare 'guest' or 'trip'.\n" +
        "- **a** before a consonant **sound**: a book, a university (you-), a one-day match (wun-), a European (you-).\n" +
        "- **an** before a vowel **sound**: an apple, an hour (silent h), an honest man, an MP (em-), an X-ray (ex-).\n" +
        "- **A/an** means 'one', so it never goes before a **plural** noun: 'an essential mode' or 'essential modes', not 'an essential modes'.\n" +
        "- Plural and uncountable nouns can stand alone when they are general: 'Guests are welcome', 'Water is life'.",
      authoredExample: {
        prompt: item("He waited for", "a hour", "outside the office."),
        steps: [
          "Read the whole sentence and check every noun: 'hour' and 'office'.",
          "'The office' has its article. 'Hour' has 'a'.",
          "In 'hour' the h is silent, so the word starts with a vowel sound (our). A vowel sound takes 'an'.",
          "The wrong word is in part (b): 'an hour'.",
        ],
        answer: "(b). He waited for **an hour** outside the office.",
      },
      selfCheckExample: {
        prompt: item("My uncle is", "engineer", "in a steel plant."),
        steps: [
          "'Engineer' is a singular countable noun with nothing in front of it.",
          "It needs a determiner. It begins with a vowel sound, so 'an'.",
          "The error is in part (b).",
        ],
        answer: "(b). My uncle is **an engineer** in a steel plant.",
      },
      practiceSet: [
        { prompt: "Correct it: 'She is a honest girl.'", answer: "She is **an** honest girl.", method: "Silent h: vowel sound." },
        { prompt: "Correct it: 'We drove down an one-way street.'", answer: "We drove down **a** one-way street.", method: "'One' starts with a 'w' sound." },
        { prompt: "Correct it: 'I need pen to sign this form.'", answer: "I need **a pen** to sign this form.", method: "A singular countable noun needs a determiner." },
        { prompt: "Correct it: 'There was an old temples on the hill.'", answer: "There was **an old temple** on the hill.", method: "'An' never goes before a plural." },
      ],
      pyqExampleId: "e484a103-98a1-4941-8ae4-8ef0c7018478",
      traps: [
        {
          title: "Sound, not spelling",
          body: "Words that start with a vowel letter but a consonant sound take 'a': a university, a European, a one-rupee coin. Words that start with a silent h take 'an': an hour, an honour, an heir.",
        },
        {
          title: "Bare singular nouns",
          body: "'Guest is unwelcome when he stays too long' sounds like a proverb, but 'guest' is singular and countable, so it needs 'A guest'. Check every singular noun for a word in front of it.",
        },
        {
          title: "'A' or 'an' before a plural noun",
          body: "'An essential modes' joins 'one' to a plural. The fix is either 'an essential mode' or 'essential modes', and the error is in the part that holds the article.",
        },
      ],
    },

    // C4 — countable vs uncountable, quantity words
    {
      kind: "reference" as const,
      slug: "cdsenseb-quantity",
      name: "Countable vs uncountable: few/a few, much/many, every, hundreds, furniture",
      intuition:
        "Countable nouns can be counted: one book, two books. Uncountable nouns cannot: water, advice, furniture. Each quantity word goes with only one of the two kinds.",
      definition:
        "- **Countable** nouns have a plural: days, courses, creatures. **Uncountable** nouns have no plural: furniture, equipment, information, advice, luggage, news.\n" +
        "- A **quantifier** is a word of quantity: many, much, few, little, every, most.\n" +
        "- **many / few / a few** + plural countable noun. **much / little / a little** + uncountable noun.\n" +
        "- **a few / a little** mean 'some' (positive). **few / little** mean 'hardly any' (negative).\n" +
        "- **every / each** + singular noun: 'every aspect'.\n" +
        "- **most / two / several** + plural noun: 'most parks', 'two kinds'.\n" +
        "- **hundreds of / thousands of** for a vague large number, but **two hundred** (exact, with no -s and no 'of').",
      table: {
        columns: ["Word", "Goes with", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["many", "a plural countable noun", "We do not have many options.", "2017 (II)"],
            pyqExampleId: "4b7f0354-5b3c-476d-83c6-140dffc4fde4",
          },
          {
            cells: ["a few", "a plural countable noun; means 'some'", "Except for a few minutes, the class was quiet.", "2019 (I)"],
            pyqExampleId: "94bd9908-0c3e-4d0a-85fb-66ea613fc9f5",
          },
          {
            cells: ["few", "a plural countable noun; means 'hardly any'", "Few students knew the answer.", "2019 (I)"],
            pyqExampleId: "15378ba2-e260-4242-a965-7ff16bfd7b1b",
          },
          {
            cells: ["a little", "an uncountable noun, or a comparative", "Please speak a little louder.", "2017 (II)"],
            pyqExampleId: "7b636dcd-38b8-4e59-9c76-b2c011163cbd",
          },
          {
            cells: ["every", "a singular noun", "Every corner of the room was clean.", "2020 (II)"],
            pyqExampleId: "9521b47b-c1d3-46df-b494-9e8747f4a0e4",
          },
          {
            cells: ["hundreds of", "a plural noun, for a vague large number", "Hundreds of people came to the fair.", "2019 (I)"],
            pyqExampleId: "7eca6083-dd32-4426-a93c-fe6bee4c5a67",
          },
          {
            cells: ["two, several", "a plural noun", "There are two types of clouds here.", "2022 (II)"],
            pyqExampleId: "789f7311-f2c7-487c-a9ac-964e955dcd57",
          },
          {
            cells: ["most", "a plural countable noun", "Most schools are closed today.", "2022 (I)"],
            pyqExampleId: "d999d214-4737-42de-820a-b5acc5e8630b",
          },
          {
            cells: ["furniture", "no plural; a singular verb", "The old furniture was sold.", "2017 (II)"],
            pyqExampleId: "70b8d165-023e-4c83-b0aa-cae563b37ea1",
          },
          {
            cells: ["equipment", "no plural; a singular verb", "This equipment is new.", "2024 (I)"],
            pyqExampleId: "0412313a-1a3d-4d99-8e6d-bad47ac2bdc9",
          },
        ],
        caption: "Also uncountable, so never with -s: advice, information, luggage, baggage, scenery, poetry, machinery.",
      },
      pyqExampleId: "4b7f0354-5b3c-476d-83c6-140dffc4fde4",
      selfCheckExample: {
        prompt: item("The teacher gave us", "many useful advices", "before the exam."),
        steps: [
          "'Advice' is uncountable: it has no plural, so 'advices' is wrong.",
          "An uncountable noun cannot take 'many' either.",
          "Both faults are in part (b). Write 'a lot of useful advice' or 'some useful advice'.",
        ],
        answer: "(b). The teacher gave us **a lot of useful advice** before the exam.",
      },
      practiceSet: [
        { prompt: "Correct it: 'There is few water in the jug.'", answer: "There is **little** water in the jug.", method: "Water is uncountable: little, not few." },
        { prompt: "Correct it: 'Every students must carry an ID card.'", answer: "**Every student** must carry an ID card.", method: "Every + singular noun." },
        { prompt: "Correct it: 'He bought three dozens eggs.'", answer: "He bought **three dozen** eggs.", method: "An exact number: no -s." },
        { prompt: "Correct it: 'Please pack your luggages.'", answer: "Please pack your **luggage**.", method: "Luggage is uncountable." },
      ],
      traps: [
        {
          title: "'A few' and 'few' are not the same",
          body: "'A few days' means some days (positive). 'Few days' means hardly any (negative). When the sentence means 'some', the article is required: 'except for a few days', 'walk a little faster'.",
        },
        {
          title: "No plural for furniture, equipment, luggage, advice",
          body: "These nouns never take -s, and they take a singular verb: 'The furniture was sold', 'This equipment is costly'. The bait is a plural-looking word such as 'furnitures' or 'equipments'.",
        },
        {
          title: "'Hundred' or 'hundreds'?",
          body: "An exact number takes no -s and no 'of': 'two hundred people'. A vague number takes both: 'hundreds of people'. 'Hundred of' is always wrong.",
        },
      ],
    },
  ],
};
