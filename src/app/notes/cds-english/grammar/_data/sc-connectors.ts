import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SC_CONNECTORS_NOTE: SubtopicNote = {
  subtopicName: "Connectors and Clause Joining",
  title: "Joining clauses: name the relation, then pick the connector",
  oneLineDefinition:
    "Two ideas are joined by one word such as but, because, although, therefore or where. Decide first how the two ideas relate, then choose the word that carries that relation and the grammar it needs.",
  whyItMatters:
    "Connectors are one of the most tested ideas in CDS grammar. They appear in sentence completion, in 'combine the two sentences' items and in 'is the underlined word used correctly' items. " +
    "Most wrong options are grammatical. They fail because the connector says the opposite of what the sentence means.",
  concepts: [
    // C1 — relation first
    {
      kind: "formula" as const,
      slug: "cdsensc-relation-first",
      name: "Read the relation first: contrast, cause, result, condition, place or time",
      intuition:
        "Every connector carries a relation. But and although say the second idea goes against the first. Because and since give a reason. Therefore and so give a result. " +
        "Work out the relation from the meaning of the two halves before you look at the options.",
      definition:
        "The terms:\n" +
        "- **Connector**: a word that joins two ideas (but, because, although, therefore, so, where, when).\n" +
        "- **Conjunction**: a connector followed by a full clause: because **he was ill**.\n" +
        "- **Preposition**: a connector followed by a noun or an -ing word: because of **his illness**, despite **being tired**.\n" +
        "The six relations:\n" +
        "- **Contrast**: but, yet, although, though.\n" +
        "- **Cause**: because, since, as, for.\n" +
        "- **Result**: therefore, so, hence.\n" +
        "- **Condition**: if, unless, as long as.\n" +
        "- **Place**: where, wherever. **Time**: when, whenever.\n" +
        "The method:\n" +
        "- Read both halves and say in your own words how they connect.\n" +
        "- Name the relation.\n" +
        "- Strike every option whose connector carries a different relation.\n" +
        "- Of what is left, check the grammar and the tense.\n" +
        "- Words such as fortunately and sadly also set the direction: fortunately must lead to a good outcome.",
      authoredExample: {
        prompt:
          "Choose the ending: The tickets were very expensive, ___ (a) but the hall was full (b) therefore the hall was full (c) because the hall was full (d) so nobody came, but the hall was full",
        steps: [
          "Say how the halves connect: expensive tickets would usually keep people away.",
          "A full hall goes against that, so the relation is contrast.",
          "(b) 'therefore' says the high price caused the crowd. (c) 'because' turns the full hall into the reason for the price. (d) joins three ideas with two connectors and contradicts itself.",
        ],
        answer: "(a) The tickets were very expensive, but the hall was full.",
      },
      pyqExampleId: "0cdaac7e-ce98-4d0b-9629-9364af189778",
      selfCheckExample: {
        prompt:
          "Choose the ending: The river rose above the danger mark; therefore ___ (a) the villages were safe (b) the villages near it were moved to higher ground (c) the rain had stopped (d) nobody worried",
        steps: [
          "Therefore introduces a result.",
          "A river above the danger mark leads to danger, so the result must be an action against danger.",
          "(a) and (d) are the opposite of a danger result, and (c) is not a result of the river rising.",
        ],
        answer: "(b) The river rose above the danger mark; therefore the villages near it were moved to higher ground.",
      },
      practiceSet: [
        { prompt: "Name the relation: He was ill, ___ he came to work.", answer: "Contrast: but or yet" },
        { prompt: "Name the relation: She stayed at home ___ she was ill.", answer: "Cause: because or as" },
        {
          prompt: "You will find mosquitoes ___ there is still water. (wherever / whenever)",
          answer: "wherever",
          method: "the sentence is about places",
        },
        {
          prompt: "Sadly, the chemist's shop was closed when we got there, so ___ (we could not buy the medicine / we bought the medicine)",
          answer: "we could not buy the medicine",
          method: "'sadly' and 'so' point to a bad result",
        },
      ],
      traps: [
        {
          title: "Reading only the second half",
          body: "An ending can be perfectly grammatical and still be wrong. 'Although he trained hard, he won the race' fails: training hard and winning agree, and 'although' needs a contrast. Read the first half, then the connector, then the ending.",
        },
        {
          title: "Two connectors for one link",
          body: "'Although ... but', 'as because' and 'so ... therefore' each use two connectors for a single link. One link, one connector.",
        },
        {
          title: "Cause and result reversed",
          body: "Because gives the reason, therefore gives the result. 'The bid was rejected since it filled all the conditions' gives a reason for **acceptance**, so it cannot explain a rejection.",
        },
        {
          title: "Wherever versus whenever",
          body: "Wherever is about place, whenever about time. 'He led the caravan **wherever** he wanted to go': a caravan goes to places.",
        },
      ],
    },
    // C2 — concession and contrast words
    {
      kind: "reference" as const,
      slug: "cdsensc-concession-words",
      name: "Concession and contrast words and the grammar each takes",
      intuition:
        "Concession means the first fact should have stopped the second, but it did not. English has several words for this, and each takes its own grammar. " +
        "Despite takes a noun; although takes a clause; nevertheless starts a new clause after a semicolon. Words of cause behave the same way.",
      definition:
        "The terms:\n" +
        "- **Concession**: admitting a fact that goes against the main point. Although it was late, he kept working.\n" +
        "The grammar of each word:\n" +
        "- **Despite + noun or -ing**: despite the rain, despite being tired. Never 'despite of'.\n" +
        "- **In spite of + noun or -ing**: always with 'of'. In spite of the fact that + clause.\n" +
        "- **Although / though + clause**.\n" +
        "- **Because + clause; because of + noun**. **Due to + noun**, never due to + clause.\n" +
        "- **Since** and **for** (meaning because) + clause.\n" +
        "- **Whereas** puts two different facts side by side.\n" +
        "- **Nevertheless / however** start a new clause, after a semicolon or a full stop.\n" +
        "- One connector per link: never 'as because', 'even he', 'forever he'.",
      table: {
        columns: ["Word", "Followed by", "Relation", "Tested in", "Sitting"],
        rows: [
          {
            cells: [
              "Despite",
              "A noun or -ing word, no 'of'",
              "Contrast",
              "I could not sleep despite being very tired. 'Despite of the warning' is wrong.",
              "2021 (I), 2024 (II)",
            ],
          },
          {
            cells: [
              "In spite of",
              "A noun, an -ing word, or 'the fact that' + clause",
              "Contrast",
              "He undertook the difficult task in spite of the fact that he had no spare time. 'In spite the cold' is wrong.",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "Because of / because",
              "Because of + noun; because + clause",
              "Cause",
              "She married him because of his nature. He pledged his organs because he had himself received one.",
              "2021 (I), 2024 (II)",
            ],
          },
          {
            cells: [
              "Although",
              "A full clause",
              "Contrast",
              "He wrote the exam with the utmost confidence although he was grossly underprepared.",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "Since",
              "A full clause",
              "Cause",
              "He refused the honour since he did not trust the organisation. 'As because' and 'due to he' are wrong.",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "For (= because)",
              "A full clause, after the main clause",
              "Cause",
              "He was adamant to undertake the journey, for he had promised to visit his school.",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "Whereas",
              "A full clause with a different fact",
              "Contrast of two facts",
              "Kavya is interested in reading books, whereas her sister's interest is outdoor games. You have been frivolous, whereas I have been serious.",
              "2020 (I), 2024 (II)",
            ],
          },
          {
            cells: [
              "Nevertheless",
              "A new clause, after a semicolon",
              "Contrast",
              "The difficulties seemed insurmountable; nevertheless, the courage to carry on was undaunted.",
              "2024 (II)",
            ],
          },
        ],
        caption: "Ask two questions: what relation does the word carry, and does it want a noun or a clause after it?",
      },
      pyqExampleId: "392571f8-53be-4ba5-8acd-e1b74fcd0862",
      selfCheckExample: {
        prompt: "Correct the sentence: Due to he was late, he missed the bus.",
        steps: [
          "'He was late' is a full clause: it has a subject and a verb.",
          "'Due to' must be followed by a noun, not a clause.",
          "Use a conjunction of cause before a clause, or turn the clause into a noun.",
        ],
        answer: "Because he was late, he missed the bus. (Or: Due to his lateness, he missed the bus.)",
      },
      practiceSet: [
        { prompt: "Fill the blank: In spite ___ the heat, they played the match.", answer: "of", method: "in spite always takes of" },
        { prompt: "___ it was raining, the match went on. (In spite of / Although)", answer: "Although", method: "a full clause follows" },
        { prompt: "Fix: In spite the warnings, they went ahead.", answer: "In spite of the warnings, they went ahead." },
        { prompt: "Which one takes a full clause: 'because' or 'because of'?", answer: "because" },
      ],
      traps: [
        {
          title: "Despite of",
          body: "**Despite** never takes 'of'. **In spite** always does. The two are swapped in exam options: 'despite of the warning' and 'in spite the cold' are both wrong.",
        },
        {
          title: "Nevertheless used like but",
          body: "Nevertheless is an adverb, not a conjunction. It starts a new clause after a semicolon or a full stop: '...; nevertheless, ...'. Dropped into the middle of a sentence with no punctuation, it is wrong.",
        },
        {
          title: "Two conjunctions together",
          body: "'As because', 'even he' and 'forever he' are not connectors. One clean word does the job: since, although, for.",
        },
        {
          title: "Contrast where the meaning is cause",
          body: "'He pledged his organs **though** he had himself received one' sets up a contrast that is not there. Receiving an organ is the reason for the pledge, so the word is **because**.",
        },
      ],
    },
    // C3 — fixed pairs
    {
      kind: "reference" as const,
      slug: "cdsensc-fixed-pairs",
      name: "Fixed pairs: no sooner...than, not only...but also, so...that, as...so",
      intuition:
        "Some connectors come in two parts, and the second part is fixed. Once a sentence opens with 'no sooner', the other half must start with 'than'. " +
        "'Not only' needs 'but also'; 'so' + adjective needs 'that'. Learn each pair as one unit.",
      definition:
        "The terms:\n" +
        "- **Correlative pair**: a connector in two parts that always work together.\n" +
        "The pairs:\n" +
        "- **No sooner ... than**: one action came right after another. The verb after no sooner is inverted: No sooner had he left than it rained (or No sooner did he leave than ...). Never 'then', 'but' or 'when'.\n" +
        "- **Hardly / scarcely ... when**: the same meaning, but with 'when'.\n" +
        "- **Not only ... but also**: adds a second quality or action.\n" +
        "- **So + adjective ... that**: a cause and its result. **Too ... to** has the same sense: too tired to stand.\n" +
        "- **As ... so**: As you sow, so shall you reap.\n" +
        "- **More ... than**: comparison. Than, never then.\n" +
        "- **No option but to + verb**.",
      table: {
        columns: ["Pair", "Fixed second part", "Tested in", "Sitting"],
        rows: [
          {
            cells: [
              "No sooner",
              "than",
              "No sooner did I arrive at the airport than the flight took off. No sooner had he returned than he was off again. No sooner did the teacher enter the classroom than the students stopped talking.",
              "2020 (I), 2022 (I), 2023 (II)",
            ],
          },
          {
            cells: ["Not only", "but also", "He is not only hard-working, but also honest.", "2020 (I)"],
          },
          {
            cells: ["So + adjective", "that + result", "He is so tired that he could scarcely stand.", "2020 (I)"],
          },
          {
            cells: ["As", "so", "As you have made your bed, so you must lie on it.", "2022 (I)"],
          },
          {
            cells: ["No other option", "but to + verb", "Elam has no other option but to accept the challenge.", "2021 (I)"],
          },
          {
            cells: ["More", "than", "The younger man has more money than brains.", "2022 (I)"],
          },
          {
            cells: [
              "Where there is a will",
              "there is a way",
              "A proverb: the second half is fixed and stays in the present.",
              "2022 (II)",
            ],
          },
        ],
        caption: "If you see the first half of a pair, look for its fixed second half in the options before anything else.",
      },
      pyqExampleId: "2226b125-5bff-42c1-ba43-56c340086acd",
      selfCheckExample: {
        prompt: "Choose: The tea was so hot ___ (a) to drink (b) that I could not drink it (c) than I could not drink it",
        steps: [
          "The sentence opens with 'so' + adjective (so hot).",
          "So + adjective is completed by 'that' + result.",
          "(a) belongs with 'too hot', and (c) uses 'than', which only follows a comparative.",
        ],
        answer: "(b) The tea was so hot that I could not drink it.",
      },
      practiceSet: [
        { prompt: "She speaks not only Hindi ___ Tamil.", answer: "but also" },
        { prompt: "He had no choice but ___. (to leave / leaving)", answer: "to leave" },
        {
          prompt: "Hardly had we sat down ___ the lights went out. (when / than)",
          answer: "when",
          method: "hardly pairs with when",
        },
        { prompt: "She is more careful ___ her brother. (then / than)", answer: "than" },
      ],
      traps: [
        {
          title: "Then for than",
          body: "**Than** compares (more money than brains) and closes 'no sooner'. **Then** means 'next' or 'at that time'. 'No sooner had the bell rung then the children ran out' is wrong.",
        },
        {
          title: "Swapped pairs",
          body: "No sooner goes with **than**; hardly and scarcely go with **when**. 'No sooner ... when' and 'Hardly ... than' are both wrong.",
        },
        {
          title: "Too with that",
          body: "**Too** goes with **to**: too tired to stand. **So** goes with **that**: so tired that he could not stand. Do not mix them.",
        },
        {
          title: "Half of 'not only ... but also'",
          body: "'He is not hard-working but also honest' drops the 'only' and now says he is not hard-working. Keep both halves of the pair.",
        },
      ],
    },
    // C4 — relative clauses
    {
      kind: "formula" as const,
      slug: "cdsensc-relative-clauses",
      name: "Relative clauses: who, that, what",
      intuition:
        "A relative clause is a small clause that describes a noun: the man who called you. The relative pronoun links it to the noun. " +
        "Who is for people, which for things, that for either in a defining clause, and what means 'the thing that' and needs no noun before it.",
      definition:
        "The terms:\n" +
        "- **Relative pronoun**: who, whom, whose, which, that. It starts a clause that describes the noun before it.\n" +
        "- **Defining clause**: a relative clause that tells which one: stories that have unhappy endings. It has no commas.\n" +
        "The rules:\n" +
        "- **Who** for people; **which** for things; **that** for people or things in a defining clause.\n" +
        "- After **everything, all, nothing, the only** and a **superlative**, use **that**.\n" +
        "- **What = the thing that**. It never follows a noun: 'everything what' is wrong; 'what I told him' is right.\n" +
        "- When the relative pronoun is the subject of its clause, it cannot be dropped: a man who sold fruit, not 'a man he sold fruit'.\n" +
        "The method:\n" +
        "- Find the noun the clause describes. Is it a person, a thing, or no noun at all?\n" +
        "- Check whether that noun is everything, all or a superlative.\n" +
        "- Pick the pronoun that fits both.",
      authoredExample: {
        prompt:
          "Choose: This is the best film ___ (a) which I have ever seen (b) what I have ever seen (c) that I have ever seen (d) I have ever seen it",
        steps: [
          "The noun the clause describes is 'the best film', a superlative.",
          "After a superlative, the relative pronoun is that.",
          "(b) 'what' never follows a noun. (d) repeats the object as 'it', which the relative clause already contains.",
        ],
        answer: "(c) This is the best film that I have ever seen.",
      },
      pyqExampleId: "8cb5ab66-93df-474f-b934-ab2072ed1276",
      selfCheckExample: {
        prompt: "Join with a relative pronoun: I met a girl. Her father is a pilot.",
        steps: [
          "'Her father' shows possession, so the pronoun is whose.",
          "Whose replaces 'her' and comes right after the noun it describes.",
        ],
        answer: "I met a girl whose father is a pilot.",
      },
      practiceSet: [
        { prompt: "All ___ glitters is not gold. (that / what)", answer: "that", method: "after all, use that" },
        { prompt: "Tell me ___ you want. (that / what)", answer: "what", method: "no noun before it: what = the thing that" },
        { prompt: "The book ___ you lent me is lost. (which / who)", answer: "which", method: "a thing; that also works" },
      ],
      traps: [
        {
          title: "What after a noun",
          body: "'Not everything **what** happened was my fault' is wrong. What already contains its own noun ('the thing that'). After everything, use **that**.",
        },
        {
          title: "Dropping the subject pronoun",
          body: "'I met a man he sold fruit' runs two sentences together. The relative pronoun is needed to join them: I met a man **who** sold fruit.",
        },
        {
          title: "A changed tense or a stray modal",
          body: "When two options use the right pronoun, check the verb. 'I don't like stories that **have** unhappy endings' is a general fact, so the present is right; 'had' or 'can have' change the meaning.",
        },
      ],
    },
  ],
};
