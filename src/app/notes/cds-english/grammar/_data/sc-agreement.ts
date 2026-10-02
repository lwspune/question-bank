import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SC_AGREEMENT_NOTE: SubtopicNote = {
  subtopicName: "Agreement, Determiners and Set Phrases",
  title: "Completing a sentence: agreement, quantifiers and set phrases",
  oneLineDefinition:
    "Half a sentence is given and you pick the ending. Many of these endings turn on one small word: a quantifier such as each or neither, an uncountable noun such as news, or a fixed phrase such as cut down on.",
  whyItMatters:
    "CDS sentence-completion sets often hang on a single small word. Each, either and neither take a singular verb; news and luggage have no plural; a phrasal verb has one fixed particle. " +
    "These are quick marks if you know the rule, and easy traps if you trust your ear.",
  concepts: [
    // C1 — quantifiers
    {
      kind: "reference" as const,
      slug: "cdsensc-quantifiers",
      name: "Neither, either, each, any, none, one: who the word points to and what verb follows",
      intuition:
        "A quantifier tells you how many people or things the sentence is about. First count the group: is it two, or more than two? " +
        "Then ask whether the word points to the whole group or to one member at a time. Each, either and neither point to one member, so the verb is singular.",
      definition:
        "The terms:\n" +
        "- **Quantifier**: a word that tells how many or how much (each, either, neither, any, none, all, both).\n" +
        "- **Singular verb**: has, was, is, does. **Plural verb**: have, were, are, do.\n" +
        "The rules:\n" +
        "- For **two** people or things: **either** (one of the two), **neither** (not this one and not that one), **both**.\n" +
        "- For **three or more**: **any**, **any one**, **none**, **all**.\n" +
        "- **Each of / either of / neither of + plural noun** takes a **singular** verb: Each of the boys **has** a bat.\n" +
        "- **Neither** already carries the 'not'. Do not add a second negative after it.\n" +
        "- A general **one** ('one should ...') is followed by **one's**, not his or their.",
      table: {
        columns: ["Word", "Rule", "Tested in", "Sitting"],
        rows: [
          {
            cells: [
              "Neither (of two)",
              "Not this one and not that one. Singular verb. Already negative.",
              "I asked two people the way to the station, but neither of them could help me.",
              "2021 (II)",
            ],
            noteAmber: "None is the wrong choice here: there were only two people.",
          },
          {
            cells: [
              "Neither of us",
              "The clean negative for two people. Not 'both of us do not', not 'either of us did not', no extra 'did'.",
              "Mohan and I couldn't get into the house because neither of us had the keys.",
              "2021 (II)",
            ],
          },
          {
            cells: [
              "Any / any one of",
              "One free choice from a group of three or more. Either is only for two.",
              "Many good hotels: you can stay in any one of them. Many career options: you can choose any of them.",
              "2021 (II), 2022 (II)",
            ],
          },
          {
            cells: ["Each of", "One member at a time. Singular verb.", "Each of the scholars has done well.", "2023 (II)"],
          },
          {
            cells: [
              "Either of",
              "One of two. Singular verb, and past here because the question is reported.",
              "He asked whether either of the brothers was at home.",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "One ... one's",
              "A general 'one' is followed by one's, not his or their.",
              "One cannot be too careful of one's good name.",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "The entire (time span)",
              "Say 'the entire evening'. Never 'all the entire evening', and 'entire' needs 'the'.",
              "Dan was very quiet. He didn't say a word the entire evening.",
              "2021 (II)",
            ],
          },
        ],
        caption: "Count the group first. Two people: either, neither, both. Three or more: any, none, all.",
      },
      pyqExampleId: "98a899d6-7368-48c6-9dbb-128835e82520",
      selfCheckExample: {
        prompt: "Choose the right verb: Neither of my two sisters ___ (like / likes) spicy food.",
        steps: [
          "The subject is 'neither', not 'sisters'. 'Of my two sisters' only names the group.",
          "Neither points to one member at a time, so the verb is singular.",
          "The singular present form of like is likes.",
        ],
        answer: "Neither of my two sisters likes spicy food.",
      },
      practiceSet: [
        {
          prompt: "Either of these two roads ___ to the fort. (lead / leads)",
          answer: "leads",
          method: "either of + plural noun takes a singular verb",
        },
        {
          prompt: "There are five pens on the table; take ___ of them. (either / any)",
          answer: "any",
          method: "five is more than two, so either is wrong",
        },
        { prompt: "One must keep ___ promises. (his / their / one's)", answer: "one's" },
        {
          prompt: "Ravi and I both tried, but ___ of us could lift the box. (none / neither)",
          answer: "neither",
          method: "two people, so neither",
        },
      ],
      traps: [
        {
          title: "The plural noun after 'of' is not the subject",
          body: "In 'Each of the players ...' the subject is **each**, not players. The verb stays singular: has, was, is. The plural noun only names the group.",
        },
        {
          title: "Either and neither are only for two",
          body: "If the sentence speaks of many hotels or many options, **either** is wrong. Use **any** or **any one**. For two people, **none** is wrong; use **neither**.",
        },
        {
          title: "A second negative after neither",
          body: "Neither already means 'not'. 'Neither of us did not have the keys' is a double negative, and 'neither of us did have' adds a false emphasis. The clean form is **neither of us had**.",
        },
      ],
    },
    // C2 — uncountables and comparison
    {
      kind: "reference" as const,
      slug: "cdsensc-uncountables-comparison",
      name: "Uncountable nouns and comparison forms",
      intuition:
        "Some nouns cannot be counted one by one: news, luggage, advice, information. They have no plural and take a singular verb. " +
        "Comparison has its own fixed shapes: 'the' before a superlative, 'than' after a comparative, and 'even' or 'much' to make a comparative stronger.",
      definition:
        "Uncountable nouns:\n" +
        "- An **uncountable noun** has no plural form: news, luggage, baggage, furniture, information, advice, sugar.\n" +
        "- It takes a **singular** verb: The news **was** good.\n" +
        "- It takes **all my, much, some, a piece of** in front. Not 'my some luggage', not 'a luggage'.\n" +
        "Comparison:\n" +
        "- **Comparative**: the -er or 'more' form that compares two (cheaper, earlier). It is followed by **than**, never 'to' or 'then'.\n" +
        "- **Superlative**: the -est or 'most' form for the top of a group (cheapest). It takes **the**, not 'a'.\n" +
        "- **Even / much + comparative** makes the comparison stronger: even earlier, much better.",
      table: {
        columns: ["Pattern", "Correct form", "Wrong forms offered", "Sitting"],
        rows: [
          {
            cells: [
              "News (uncountable)",
              "Fortunately the news wasn't as bad as we expected.",
              "the news weren't as bad",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "Luggage (uncountable)",
              "When I was on holiday, all my luggage was stolen.",
              "my whole luggage were stolen; my some luggage; my part luggage",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "The + superlative",
              "We stayed at the cheapest hotel in the town.",
              "at a cheapest hotel",
              "2023 (I)",
            ],
          },
          {
            cells: [
              "Even + comparative",
              "I got up very early, but Jack got up even earlier.",
              "got up earlier to me; got up even before",
              "2023 (II)",
            ],
          },
        ],
        caption: "An -s at the end does not make a noun plural: news is singular.",
      },
      pyqExampleId: "ddccdabb-383c-4d9a-b17a-448b6cbbee1c",
      selfCheckExample: {
        prompt: "Choose the right verb: All the furniture in the old hall ___ (has / have) been sold.",
        steps: [
          "Furniture is uncountable: you cannot say 'two furnitures'.",
          "An uncountable noun takes a singular verb, even after 'all the'.",
          "So the verb is has.",
        ],
        answer: "All the furniture in the old hall has been sold.",
      },
      practiceSet: [
        { prompt: "The information you gave me ___ very useful. (was / were)", answer: "was", method: "information is uncountable" },
        { prompt: "Mount Everest is ___ peak in the world. (a highest / the highest)", answer: "the highest" },
        { prompt: "My brother is taller ___ me. (to / than)", answer: "than" },
        { prompt: "Can you give me some ___? (advice / advices)", answer: "advice", method: "advice has no plural" },
      ],
      traps: [
        {
          title: "A noun that ends in -s but is singular",
          body: "**News** looks plural but is one uncountable noun. 'The news **was** good', never 'were'. The same holds for luggage, information and furniture, which have no plural at all.",
        },
        {
          title: "Comparative + to",
          body: "Only a few Latin words take 'to': senior to, junior to, superior to, prefer to. Ordinary comparatives take **than**: earlier than me, taller than you.",
        },
        {
          title: "A + superlative",
          body: "A superlative names the one at the very top, so it takes **the**: the cheapest, the best. 'A cheapest hotel' is always wrong.",
        },
      ],
    },
    // C3 — set phrases
    {
      kind: "reference" as const,
      slug: "cdsensc-set-phrases",
      name: "Set phrases, phrasal verbs and prepositions of place and frequency",
      intuition:
        "Some word groups are fixed by habit, not by logic. A bus comes every ten minutes, a plane flies over a house, a person cuts down on coffee. " +
        "No rule tells you which small word comes next. You learn the phrase as one unit.",
      definition:
        "The terms:\n" +
        "- **Phrasal verb**: a verb plus a small word (on, off, up, down) that together carry one meaning: cut down on = reduce.\n" +
        "- **Collocation**: words that normally go together: the right to vote.\n" +
        "The patterns tested:\n" +
        "- **Frequency**: every + time (every ten minutes) for something that repeats. 'In ten minutes' means once, ten minutes from now.\n" +
        "- **Place**: over = above and across; near and by = beside.\n" +
        "- **Polite request to act**: Can I / May I + verb: Can I turn on the lights?\n" +
        "- A fixed phrase takes no extra words: the right to vote, not 'the right to have vote'.",
      table: {
        columns: ["Phrase", "Meaning", "Tested in", "Sitting"],
        rows: [
          {
            cells: [
              "every ten minutes",
              "Again and again, once in each ten minutes",
              "The bus service is very good; there is a bus every ten minutes.",
              "2021 (II)",
            ],
          },
          {
            cells: ["fly over", "Pass above", "We live near a busy airport; the planes fly over our house.", "2021 (II)"],
          },
          {
            cells: [
              "get into / get to (a city)",
              "Arrive at a place. Both forms are standard; 'get at' and 'get in London' are not.",
              "The arrival time of a train in London",
              "2023 (I)",
            ],
          },
          {
            cells: ["get on (in a job)", "Make progress, manage", "How are you getting on in your new job?", "2023 (I)"],
          },
          {
            cells: ["cut down on", "Use less of something", "I am trying to cut down on coffee.", "2023 (I)"],
          },
          {
            cells: [
              "the right to vote",
              "The legal power to vote",
              "The applicant is a native of this country, so he has the right to vote.",
              "2023 (II)",
            ],
          },
          {
            cells: [
              "Can I turn on ...?",
              "A polite offer or request to do something",
              "It is getting dark, can I turn on the lights?",
              "2022 (II)",
            ],
          },
        ],
        caption: "Learn each phrase with its small word attached: cut down on, get on in, fly over.",
      },
      pyqExampleId: "ab98bb5c-22f6-47ff-97da-c8e0ecb79f96",
      selfCheckExample: {
        prompt: "Choose the phrasal verb: The meeting was ___ because the chief guest fell ill. (called off / called on)",
        steps: [
          "The meeting did not happen, so we need a verb meaning 'cancelled'.",
          "Call off = cancel. Call on = visit someone.",
          "So the answer is called off.",
        ],
        answer: "The meeting was called off because the chief guest fell ill.",
      },
      practiceSet: [
        { prompt: "The train for Pune leaves ___ hour. (every / in)", answer: "every", method: "a repeated event takes every" },
        { prompt: "The bird flew ___ the wall into the garden. (over / near)", answer: "over" },
        { prompt: "She has the right ___ her opinion. (of expressing / to express)", answer: "to express" },
        { prompt: "Please ___ the fan; it is cold. (turn off / turn out)", answer: "turn off" },
      ],
      traps: [
        {
          title: "'In ten minutes' is not 'every ten minutes'",
          body: "'In ten minutes' is one event, ten minutes from now. A good bus service runs **every** ten minutes, again and again.",
        },
        {
          title: "A particle that looks close",
          body: "Give up, give in and give out are all real phrasal verbs, but only **give up** means 'stop doing'. A wrong option often keeps the verb and swaps the small word. Check the meaning of the whole phrase, not just the verb.",
        },
        {
          title: "Adding words to a fixed phrase",
          body: "The phrase is **the right to vote**. 'The right to have vote', 'the right of vote' and 'the right at vote' are all wrong. A set phrase takes no extra words.",
        },
      ],
    },
  ],
};
