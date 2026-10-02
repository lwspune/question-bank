import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_JOINING_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Parts of Speech: Prepositions, Conjunctions and Interjections",
  title: "Prepositions, conjunctions, connecting adverbs and interjections",
  oneLineDefinition:
    "Prepositions link a noun to the sentence, conjunctions join words and clauses, connecting adverbs link ideas across sentences, and interjections stand outside the sentence.",
  whyItMatters:
    "These small words are a regular part of the underlined-word block. Two pairs cause most mistakes: a preposition against an adverb (over, around, since), and a conjunction against a connecting adverb (and against therefore). " +
    "One test settles each pair: look for the object, and try moving the word.",
  concepts: [
    // C1 — prepositions
    {
      kind: "formula" as const,
      slug: "cdsenpos-preposition",
      name: "A preposition links a noun to the rest of the sentence",
      intuition:
        "A preposition never stands alone. It always has a noun or pronoun after it, its **object**, and it shows how that noun relates to the rest of the sentence: in time, in place, in direction or as a cause.",
      definition:
        "Terms:\n" +
        "- The **object of a preposition** is the noun or pronoun that follows it (through **the forest**, under **the banyan tree**).\n" +
        "- A **compound preposition** is two or three words that work as one: owing to, because of, in front of, instead of (**Owing to** his ill health, he retired).\n" +
        "- Some prepositions are fixed in a phrase and cannot be changed: **second to none** (the best of all).\n" +
        "What prepositions show:\n" +
        "- Place: in, on, under, above, between, through.\n" +
        "- Time: in, on, at, during, since, for.\n" +
        "- Cause: owing to, because of.\n" +
        "The method:\n" +
        "- Find the noun or pronoun right after the word.\n" +
        "- If the word links that noun to a verb or another noun, it is a preposition.\n" +
        "- If there is no such noun, it is not a preposition (see the next concept).",
      authoredExample: {
        prompt:
          "Name the part of speech of the underlined word: The cat hid \\(\\underline{\\text{behind}}\\) the sofa.",
        steps: [
          "Look right after the word: 'the sofa', a noun.",
          "'Behind' links 'the sofa' to the verb 'hid' and shows place: hid where? behind the sofa.",
          "A word that links a noun to the rest of the sentence is a preposition.",
        ],
        answer: "Preposition.",
      },
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined words: \\(\\underline{\\text{Because of}}\\) the rain, the match was stopped.",
        steps: [
          "Look right after the words: 'the rain', a noun.",
          "The two words act as one unit and link 'the rain' to the sentence as a cause.",
          "Two words that work together as one preposition form a compound preposition.",
        ],
        answer: "Preposition (a compound preposition).",
      },
      practiceSet: [
        { prompt: "The book is \\(\\underline{\\text{on}}\\) the table.", answer: "Preposition", method: "object: the table" },
        { prompt: "She is good _______ mathematics. (at / in / on)", answer: "at", method: "fixed pairing: good at" },
        { prompt: "The road runs _______ the river. (along / while)", answer: "along", method: "a preposition before the noun 'the river'" },
        { prompt: "\\(\\underline{\\text{Instead of}}\\) tea, he drank milk.", answer: "Preposition (compound)", method: "object: tea" },
      ],
      pyqExampleId: "8b2eec32-1c82-4aa3-897e-c66df27d3ea2",
      traps: [
        {
          title: "'Owing to' is not a participle",
          body:
            "'Owing' looks like an -ing verb form, but 'owing to' works as one unit meaning 'because of', with the noun 'his ill health' as its object. It is a **compound preposition**.",
        },
        {
          title: "Because of + noun, because + clause",
          body:
            "'Because of the rain' (preposition: a noun follows). 'Because it rained' (conjunction: a clause follows). The same test separates 'during the holidays' from 'while we were on holiday'.",
        },
        {
          title: "Two nouns, one preposition",
          body:
            "In 'many a slip between the cup and the lip', 'between' has two nouns as its object. It is still one **preposition**, not a conjunction; the 'and' is the conjunction.",
        },
      ],
    },

    // C2 — preposition or adverb: the object test
    {
      kind: "formula" as const,
      slug: "cdsenpos-object-test",
      name: "Preposition or adverb? Look for the object",
      intuition:
        "Over, around, off, up, in, since: these can be prepositions or adverbs. The difference is one thing. A preposition has an object after it. An adverb does not.",
      definition:
        "Terms:\n" +
        "- A **particle** (adverbial particle) is a small adverb such as over, off, up, out, around that goes with a verb.\n" +
        "- A **phrasal verb** is a verb + particle with its own meaning: knock over, switch off, take off, look up.\n" +
        "The object test:\n" +
        "- Is there a noun or pronoun after the word that answers 'over what?', 'off what?'? Then it is a **preposition** (presiding over **the meeting**).\n" +
        "- No such noun? Then it is an **adverb** (moves around in her class; the plane took off).\n" +
        "The movement test, for a phrasal verb with a noun nearby:\n" +
        "- If the small word can move past the noun (switch off the fan = switch the fan off), it is a **particle**, an adverb.\n" +
        "- If it cannot (presiding over the meeting, never 'presiding the meeting over'), it is a **preposition**.\n" +
        "For 'since':\n" +
        "- since + a point of time (since 2002) = preposition; since + a clause (since he left) = conjunction; since alone at the end (I have not seen him since) = adverb.",
      authoredExample: {
        prompt:
          "Name the part of speech of the underlined word: When the storm began, the children ran \\(\\underline{\\text{inside}}\\).",
        steps: [
          "Look right after the word: the sentence ends. There is no noun to answer 'inside what?'.",
          "So it has no object and cannot be a preposition.",
          "It tells where the children ran, so it is an adverb of place. (In 'ran inside the house' it would be a preposition.)",
        ],
        answer: "Adverb.",
      },
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: Please switch the fan \\(\\underline{\\text{off}}\\).",
        steps: [
          "The noun 'the fan' comes before the word, not after it.",
          "Try moving it: 'switch off the fan' means the same. The word can move, so it is a particle.",
          "A particle has no object of its own: it is an adverb.",
        ],
        answer: "Adverb (a particle).",
      },
      practiceSet: [
        { prompt: "The cat jumped \\(\\underline{\\text{off}}\\) the wall.", answer: "Preposition", method: "object: the wall" },
        { prompt: "The plane took \\(\\underline{\\text{off}}\\) on time.", answer: "Adverb (particle)", method: "no object after it" },
        { prompt: "She looked the word \\(\\underline{\\text{up}}\\).", answer: "Adverb (particle)", method: "it can move: looked up the word" },
        { prompt: "We walked \\(\\underline{\\text{along}}\\) the beach.", answer: "Preposition", method: "object: the beach" },
      ],
      pyqExampleId: "4e6d2cbe-1a58-47f7-a47f-a1fe2d03b948",
      traps: [
        {
          title: "A noun nearby is not always its object",
          body:
            "In 'switch the fan off' the noun sits before the small word. It belongs to the verb, not to 'off'. Use the movement test: if the word can jump past the noun, it is an **adverb** particle.",
        },
        {
          title: "Same word, two answers on the same paper",
          body:
            "'moves around in her class' (adverb: nothing after 'around' answers 'around what?') and 'presiding over the meeting' (preposition: 'the meeting' is the object). Do not answer from the word; answer from what follows it.",
        },
        {
          title: "When the right label is missing",
          body:
            "Sometimes the four options leave out the class you found. Choose the closest one offered. A preposition's nearest neighbour is the adverb: both tell when or where.",
        },
      ],
    },

    // C3 — conjunctions
    {
      kind: "formula" as const,
      slug: "cdsenpos-conjunction",
      name: "Conjunctions join: coordinating and subordinating",
      intuition:
        "A conjunction is glue. Some join two equal parts: two nouns, or two full sentences. Others hang a dependent clause onto a main one and say how they are related: why, when, on what condition.",
      definition:
        "Terms:\n" +
        "- **Coordinating conjunction**: joins two equal parts: **for, and, nor, but, or, yet, so** (Jasmines **and** roses; I was tired, **but** I went).\n" +
        "- **Subordinating conjunction**: begins a clause that depends on the main clause: **because, after, before, although, if, unless, when, since, except that** (We went away **after** they had left).\n" +
        "The method:\n" +
        "- Is the word joining two parts? If it only links a single noun, it is a preposition.\n" +
        "- Can each part stand as a sentence on its own, with the word between them? Coordinating.\n" +
        "- Does the word begin a part that cannot stand alone (because he had hit the most fours)? Subordinating.",
      authoredExample: {
        prompt:
          "Name the kind of conjunction underlined: Call me \\(\\underline{\\text{when}}\\) you reach the station.",
        steps: [
          "The word joins 'Call me' and 'you reach the station', a clause with its own subject and verb.",
          "'When you reach the station' cannot stand alone; it depends on 'Call me' and tells the time.",
          "A conjunction that begins a dependent clause is subordinating.",
        ],
        answer: "Subordinating conjunction.",
      },
      selfCheckExample: {
        prompt:
          "Name the kind of conjunction underlined: He was tired, \\(\\underline{\\text{yet}}\\) he finished the race.",
        steps: [
          "'He was tired' and 'he finished the race' are both full sentences.",
          "The word joins two equal parts and shows contrast.",
          "Yet is one of the seven coordinating conjunctions (for, and, nor, but, or, yet, so).",
        ],
        answer: "Coordinating conjunction.",
      },
      practiceSet: [
        { prompt: "\\(\\underline{\\text{Although}}\\) it was late, she kept working.", answer: "Subordinating conjunction" },
        { prompt: "Would you like tea \\(\\underline{\\text{or}}\\) coffee?", answer: "Coordinating conjunction", method: "it joins two equal nouns" },
        { prompt: "She left \\(\\underline{\\text{after}}\\) lunch.", answer: "Preposition", method: "only a noun follows, no clause" },
        { prompt: "\\(\\underline{\\text{Unless}}\\) you hurry, you will miss the bus.", answer: "Subordinating conjunction" },
      ],
      pyqExampleId: "9f864428-3301-4ecf-a6a9-3fe97c1aebf3",
      traps: [
        {
          title: "After, before, since, except: two classes each",
          body:
            "With a noun after them they are **prepositions** (after lunch). With a clause after them they are **conjunctions** (after they had left; except that I needed the money).",
        },
        {
          title: "'Connector' is not a word class",
          body:
            "Options sometimes offer 'Connector'. It describes what the word does but is not a part of speech. The class name is **Conjunction**.",
        },
        {
          title: "A conjunction can join two single words",
          body:
            "A conjunction does not need two sentences. 'Bread and butter' and 'tea or coffee' join two nouns, and the joining word is still a **conjunction**.",
        },
      ],
    },

    // C4 — connecting adverbs
    {
      kind: "reference" as const,
      slug: "cdsenpos-connecting-adverbs",
      name: "Connecting adverbs: therefore, besides, otherwise, consequently",
      intuition:
        "Words like therefore and besides link one idea to another, so they feel like conjunctions. But they are adverbs: they can move about in their sentence, and a real conjunction cannot.",
      definition:
        "Terms:\n" +
        "- A **conjunctive adverb** (connecting adverb) links the idea of one sentence or clause to another. It usually has a comma after it, or a semicolon or 'and' before it.\n" +
        "- Common ones: therefore, besides, otherwise, consequently, however, moreover, nevertheless, hence, thus, meanwhile.\n" +
        "The movement test:\n" +
        "- 'Therefore, I stayed.' = 'I, therefore, stayed.' = 'I stayed, therefore.' The word moves: **adverb**.\n" +
        "- 'I was tired, so I stayed' cannot become 'I was tired, I so stayed': **conjunction**.\n" +
        "- 'Besides' with a noun after it (Besides English, he speaks Tamil) is a **preposition**. Alone, followed by a comma, it is an adverb.",
      table: {
        columns: ["Word", "Meaning", "Signals", "Sitting"],
        rows: [
          {
            cells: ["Besides", "in addition, moreover", "one more reason", "2022 (I)"],
            pyqExampleId: "658aef3f-609c-4408-af34-aeab6f360a55",
          },
          {
            cells: ["Otherwise", "if not, or else", "what would happen in the other case", "2022 (I)"],
            pyqExampleId: "4fdedce7-e2fd-42c8-b2c0-72ed8195c4eb",
          },
          {
            cells: ["therefore", "for that reason", "a result", "2023 (I)"],
          },
          {
            cells: ["Consequently", "as a result", "a result", "2024 (II)"],
            pyqExampleId: "39051af2-a9c0-4d46-baed-cd1db806451d",
          },
        ],
        caption: "Each of these is an adverb, even though it links two ideas.",
      },
      pyqExampleId: "750e3779-9663-40e8-9bd2-bf4a8a16bb06",
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: It was raining heavily; \\(\\underline{\\text{however}}\\), the match went on.",
        steps: [
          "The word links two ideas, but the semicolon already joins the two clauses.",
          "Try moving it: 'the match, however, went on' still works.",
          "A linking word that can move is a conjunctive adverb.",
        ],
        answer: "Adverb (a conjunctive adverb).",
      },
      practiceSet: [
        { prompt: "Spot the wrong row: (1) 'but' is a conjunction; (2) 'moreover' is a conjunction.", answer: "Row 2", method: "'moreover' is an adverb: it can move" },
        { prompt: "\\(\\underline{\\text{Besides}}\\) English, he speaks Tamil. Class?", answer: "Preposition", method: "it has the object 'English'" },
        { prompt: "Which one signals a result: hence or nevertheless?", answer: "hence", method: "nevertheless signals a contrast" },
        { prompt: "He failed the test; \\(\\underline{\\text{thus}}\\) he lost his place. Class?", answer: "Adverb (conjunctive)" },
      ],
      traps: [
        {
          title: "'And therefore': the 'and' joins",
          body:
            "In 'My sister is just sixteen and therefore not eligible', the conjunction is 'and'. 'Therefore' adds the idea of result and is an **adverb**.",
        },
        {
          title: "'Besides' with and without a noun",
          body:
            "'Besides, I don't like parties' (adverb: no object, a comma after it). 'Besides the work, I have guests' (preposition: 'the work' is its object).",
        },
        {
          title: "'Otherwise' is not a conjunction",
          body:
            "'Otherwise, I could not have afforded the trip' opens a new sentence after a full stop. Conjunctions do not usually open a sentence like this; the word is an **adverb**.",
        },
      ],
    },

    // C5 — interjections
    {
      kind: "reference" as const,
      slug: "cdsenpos-interjection",
      name: "Interjections: words that stand outside the sentence",
      intuition:
        "An interjection is a sudden cry of feeling. It has no grammatical link with the rest of the sentence: take it away and the sentence is still complete. It is usually followed by '!' or a comma.",
      definition:
        "The signs of an interjection:\n" +
        "- It shows a sudden feeling: joy, sorrow, surprise, pain, praise.\n" +
        "- It stands at the start, set off by '!' or a comma.\n" +
        "- Removing it leaves a complete sentence.\n" +
        "- A short group of words can work as one interjection (Oh no!).\n" +
        "Other common ones: Bravo (praise), Ouch (pain), Oh (surprise), Wow (wonder), Hush (silence).",
      table: {
        columns: ["Interjection", "Feeling", "Sitting"],
        rows: [
          {
            cells: ["Hurrah", "joy, victory", "2019 (II), 2020 (I)"],
            pyqExampleId: "c9335ad3-2f55-4cb3-bca7-180c025c1f58",
          },
          {
            cells: ["Alas", "sorrow, grief", "2021 (I), 2022 (II), 2023 (I)"],
            pyqExampleId: "4e78c513-f581-496a-9f32-18d23e04cc2c",
          },
          {
            cells: ["Why (with a comma after it)", "surprise", "2021 (II)"],
          },
          {
            cells: ["Oh no", "dismay", "2023 (II)"],
            pyqExampleId: "b05a3401-13ff-488e-927b-00730b424241",
          },
          {
            cells: ["Hurray", "joy", "2024 (I)"],
            pyqExampleId: "4595e8b5-58a2-41b3-bfbb-91fe44df509a",
          },
        ],
        caption: "Hurrah and Alas have each been asked in more than one sitting.",
      },
      pyqExampleId: "d1b82e93-4760-4d4f-940f-0723c3b07031",
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: \\(\\underline{\\text{Ouch}}\\)! That hurt.",
        steps: [
          "The word is set off by '!' at the start.",
          "It shows a sudden feeling: pain.",
          "Remove it: 'That hurt.' The sentence is complete without it.",
        ],
        answer: "Interjection.",
      },
      practiceSet: [
        { prompt: "\\(\\underline{\\text{Bravo}}\\)! You have done it. Class?", answer: "Interjection", method: "a cry of praise" },
        { prompt: "Spot the wrong row: (1) Alas: sorrow; (2) Hurrah: sorrow.", answer: "Row 2", method: "Hurrah shows joy" },
        { prompt: "\\(\\underline{\\text{Wow}}\\), what a view! Class?", answer: "Interjection", method: "a sudden feeling of wonder, set off by a comma" },
      ],
      traps: [
        {
          title: "'Why' that asks is an adverb",
          body:
            "'Why are you late?' asks a question: 'why' is an adverb. 'Why, is it really you?' shows surprise and is set off by a comma: an **interjection**. Look for the comma and the feeling.",
        },
        {
          title: "The whole cry is one interjection",
          body:
            "When two words such as 'Oh no!' are underlined together, they work as one cry of feeling. The answer is still **Interjection**, not Noun or Adverb.",
        },
        {
          title: "The exclamation mark is a clue, not the test",
          body:
            "'What a scintillating beauty the landscape is!' ends in '!' but is a full sentence. Only the separate cry at the start (Hurrah!) is the interjection.",
        },
      ],
    },
  ],
};
