import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_NOUNS_PRONOUNS_NOTE: SubtopicNote = {
  subtopicName: "Parts of Speech: Nouns and Pronouns",
  title: "Parts of speech: the job a word does, nouns and pronouns",
  oneLineDefinition:
    "A word's part of speech is the job it does in this sentence, not the class it usually has. This page names the eight jobs, then the kinds of noun and pronoun the paper asks about.",
  whyItMatters:
    "Most CDS English papers since 2019 carry a block of items that underline one word and ask for its part of speech. " +
    "Nouns and pronouns are among the commonest answers. The words are often easy; marks are lost by naming the class from memory instead of reading what the word does in the sentence.",
  concepts: [
    // C1 — the eight jobs, and the method
    {
      kind: "formula" as const,
      slug: "cdsenpos-job-decides",
      name: "Name the class by the job the word does",
      intuition:
        "Many English words can do more than one job. 'Book' names a thing in 'a good book' but is an action in 'book a ticket'. " +
        "So never answer from what the word usually is. Read the sentence, see what the word is doing there, and name that job.",
      definition:
        "The eight parts of speech (word classes):\n" +
        "- **Noun**: names a person, place, thing or idea (soldier, Delhi, river, courage).\n" +
        "- **Pronoun**: stands in place of a noun (he, it, they, myself, who).\n" +
        "- **Adjective**: describes a noun (a **tall** tower, the road is **narrow**).\n" +
        "- **Verb**: an action or a state (run, think, is, seems).\n" +
        "- **Adverb**: tells how, when, where or how much about a verb, an adjective or another adverb (ran **quickly**, **very** tall).\n" +
        "- **Preposition**: links a noun or pronoun to the rest of the sentence (in, on, under, through).\n" +
        "- **Conjunction**: joins words or parts of a sentence (and, but, because).\n" +
        "- **Interjection**: a sudden cry of feeling that stands outside the sentence (Alas! Hurrah!).\n" +
        "- **Article**: a, an and the. They stand before a noun.\n" +
        "Two more terms:\n" +
        "- **Subject**: who or what does the action (**The boys** played).\n" +
        "- **Object**: who or what receives the action (The boys played **cricket**).\n" +
        "The method:\n" +
        "- Find the underlined word and the words right next to it.\n" +
        "- After a, an, the, his, my or a describing word? It is naming something: **noun**.\n" +
        "- After a subject, or after will, can, could not, to? Does it take an object? It is an action: **verb**.\n" +
        "- Describing a noun? **Adjective**. Telling how, when or where about an action? **Adverb**.\n" +
        "- Then strike the options that do not fit and pick the plain class that does.",
      authoredExample: {
        prompt:
          "Name the part of speech of the underlined word: She will \\(\\underline{\\text{book}}\\) two seats for the evening show.",
        steps: [
          "The word before it is 'will', so an action is coming next.",
          "Ask 'will book what?' The answer is 'two seats'. That is an object, and only a verb takes an object.",
          "In 'a good book' the same word would be a noun. Here it is doing the job of an action.",
        ],
        answer: "Verb.",
      },
      selfCheckExample: {
        prompt:
          "Name the part of speech of the underlined word: The \\(\\underline{\\text{fast}}\\) lasted three days.",
        steps: [
          "'Fast' is usually an adjective (a fast car) or an adverb (run fast).",
          "Here it comes after 'The' and is the subject of 'lasted'. It names a thing: a time without food.",
          "A word that names a thing is a noun.",
        ],
        answer: "Noun.",
      },
      practiceSet: [
        {
          prompt: "He ran \\(\\underline{\\text{fast}}\\) to catch the bus.",
          answer: "Adverb",
          method: "it tells how he ran",
        },
        {
          prompt: "Give me a \\(\\underline{\\text{hand}}\\) with these boxes.",
          answer: "Noun",
          method: "it comes after 'a' and names a thing (help)",
        },
        {
          prompt: "Please \\(\\underline{\\text{hand}}\\) me the file.",
          answer: "Verb",
          method: "it is the action, and 'the file' is its object",
        },
        {
          prompt: "I heard a strange \\(\\underline{\\text{sound}}\\) at night.",
          answer: "Noun",
          method: "it comes after 'a strange' and names a thing",
        },
      ],
      pyqExampleId: "08788cc5-18fe-41d1-8f30-382f613ea2b1",
      traps: [
        {
          title: "Answering from memory",
          body:
            "'Finance' is usually a noun, but in 'could not \\(\\underline{\\text{finance}}\\) the project' it follows 'could not' and takes an object, so it is a **verb**. " +
            "Always decide from the sentence, never from the dictionary entry you remember.",
        },
        {
          title: "A word after 'a' or 'the' is doing a noun's job",
          body:
            "'Daily' is usually an adjective (a daily paper). In 'in all the \\(\\underline{\\text{dailies}}\\)' it comes after 'the', has a plural -s and names newspapers, so it is a **noun**.",
        },
        {
          title: "Some options are not word classes at all",
          body:
            "Labels such as 'Cause', 'Place value', 'Connector' or 'Nominative' are not parts of speech. They are put there to distract you. Choose from the real classes.",
        },
      ],
    },

    // C2 — kinds of noun
    {
      kind: "reference" as const,
      slug: "cdsenpos-noun-kinds",
      name: "Kinds of noun: common, proper, abstract, collective, countable, uncountable",
      intuition:
        "Once you know a word is a noun, some items go one step further and ask which kind. " +
        "Ask two questions: can you touch it or only feel it, and can you count it?",
      definition:
        "The kinds of noun:\n" +
        "- **Common noun**: the general name of a person, place or thing (statue, river, city).\n" +
        "- **Proper noun**: the name of one particular person or place; it starts with a capital letter (Delhi, Cauvery, Ramesh).\n" +
        "- **Abstract noun**: the name of a quality, feeling or state that you cannot touch (happiness, honesty, courage).\n" +
        "- **Collective noun**: the name of a group taken as one (team, army, jury, flock).\n" +
        "- **Compound noun**: a noun made of two words joined (playtime, fountainhead, bottomline).\n" +
        "- **Countable noun**: can be counted and has a plural (one opportunity, two opportunities).\n" +
        "- **Uncountable noun**: cannot be counted and has no plural (honesty, water, advice).\n" +
        "- **The + adjective** can work as a **plural noun** for a class of people: the poor, the rich, the righteous. It takes a plural verb (the righteous **emerge** victorious).\n" +
        "- A **noun phrase** is a group of words built round a noun (the wonderful statue). If only one word is underlined and it names a thing, the answer is **Noun**.",
      table: {
        columns: ["Word", "In the sentence", "Kind of noun", "Sitting"],
        rows: [
          {
            cells: ["statue", "The wonderful statue of the leader welcomes all people", "Common noun, the subject", "2020 (II)"],
            pyqExampleId: "c38ebaad-f7ee-4f26-96c6-355aa3ea7745",
          },
          {
            cells: ["exultation", "There was an exultation in the group", "Abstract noun: a feeling of great joy", "2021 (I)"],
            pyqExampleId: "5ffc68b8-3987-4c78-bee1-088298f5dce6",
          },
          {
            cells: ["opportunities", "work opportunities are immense", "Common noun, plural; 'work' only describes it", "2021 (II)"],
            pyqExampleId: "8cd2d88a-55bd-40f1-977f-d585dd1f7453",
          },
          {
            cells: ["quincentenary", "This year marks the quincentenary of Columbus's voyage", "Common noun: a 500th anniversary", "2022 (I)"],
            pyqExampleId: "e98a4b8b-ae2a-4c54-969e-71806282f7ba",
          },
          {
            cells: ["bottomline", "The bottomline is that we have to make a decision", "Compound noun: the main point", "2022 (I)"],
            pyqExampleId: "60ee5baa-26d9-423d-ae27-4620ce2e58a7",
          },
          {
            cells: ["Honesty", "Honesty is the best policy", "Abstract and uncountable noun", "2022 (II)"],
            pyqExampleId: "ec218ced-9ce6-4a8d-9ea5-ceb7c23d9649",
          },
          {
            cells: ["happiness", "Without health there is no happiness", "Abstract noun", "2023 (I)"],
            pyqExampleId: "79668ab5-a0b8-454f-b47c-a379b54c76e9",
          },
          {
            cells: ["playtime", "their playtime is very limited", "Compound noun (play + time)", "2023 (II)"],
            pyqExampleId: "5025e513-d4e3-45e3-9134-6ce512b2585d",
          },
          {
            cells: ["fountainhead", "India is revered as the fountainhead of democracy", "Compound noun: the source", "2024 (I)"],
            pyqExampleId: "0ea19877-cbb2-4ed2-bcbe-4daedf37ad7a",
          },
          {
            cells: ["river", "The river that flows through the village is a tributary", "Common noun, the subject", "2024 (II)"],
            pyqExampleId: "5193eded-1a44-4139-953b-6ac9ba597267",
          },
          {
            cells: ["happiness", "His happiness was obvious", "Abstract noun", "2025 (II)"],
          },
          {
            cells: ["heights", "he is afraid of heights", "Common noun, plural, after 'of'", "2026 (I)"],
            pyqExampleId: "e2287f4f-ad28-426e-a734-e0b3ad5776f7",
          },
        ],
        caption: "When the options only say 'Noun', that is the answer for every row above. The kind matters only when the options name kinds.",
      },
      pyqExampleId: "3aea6997-0c37-41dd-a80c-7e9850344d3a",
      selfCheckExample: {
        prompt:
          "Name the kind of noun underlined: The \\(\\underline{\\text{jury}}\\) has given its decision.",
        steps: [
          "'Jury' names a thing you can point at, so it is not abstract.",
          "It is not the name of one particular body, so it is not proper.",
          "A jury is a group of people taken together as one unit, and the verb is singular ('has').",
        ],
        answer: "Collective noun.",
      },
      practiceSet: [
        { prompt: "\\(\\underline{\\text{Bravery}}\\) won him the medal. Kind of noun?", answer: "Abstract (and uncountable) noun", method: "a quality you cannot touch or count" },
        { prompt: "\\(\\underline{\\text{Pune}}\\) is a big city. Kind of noun?", answer: "Proper noun", method: "the name of one particular place" },
        { prompt: "We saw a \\(\\underline{\\text{flock}}\\) of sheep. Kind of noun?", answer: "Collective noun" },
        { prompt: "The \\(\\underline{\\text{rich}}\\) should help the needy. What is 'rich' doing here?", answer: "A plural noun (the + adjective = rich people)" },
      ],
      traps: [
        {
          title: "A quality is abstract, not common",
          body:
            "Honesty, happiness and courage name qualities or feelings. When both 'Common noun' and 'Abstract noun' (or 'Uncountable noun') are offered, the exact label is **Abstract** or **Uncountable**, not Common.",
        },
        {
          title: "Noun or noun phrase",
          body:
            "If one word is underlined and it names a thing, choose **Noun**. 'Noun phrase' fits only a group of words, such as 'the wonderful statue of the leader'.",
        },
        {
          title: "Two nouns side by side",
          body:
            "In 'work opportunities', the first noun only describes the second. The main noun is the last one, **opportunities**. Name the class of the word that is underlined, not its neighbour.",
        },
      ],
    },

    // C3 — kinds of pronoun
    {
      kind: "reference" as const,
      slug: "cdsenpos-pronoun-kinds",
      name: "Kinds of pronoun: personal, reflexive, impersonal, indefinite, distributive",
      intuition:
        "A pronoun saves you repeating a noun. Most items only need you to see that the word stands for a noun. " +
        "Harder items ask which kind, and the -self words and 'it' are where students slip.",
      definition:
        "The kinds of pronoun:\n" +
        "- **Personal**: I, you, he, she, it, we, they (and me, him, her, us, them). It stands for a person or thing already named.\n" +
        "- **Reflexive**: myself, himself, themselves. The action comes back to the subject (I hurt **myself**). Remove it and the sentence breaks.\n" +
        "- **Emphatic**: the same -self forms used only to stress the noun (The secretary **himself** visited). Remove it and the sentence is still complete.\n" +
        "- **Impersonal 'it'**: 'it' that stands for no noun at all, used for time, weather and distance (It is raining; It is ten o'clock).\n" +
        "- **Indefinite**: does not point to a particular person or thing: one, none, someone, anybody, everything.\n" +
        "- **Distributive**: takes the members of a group one at a time: **each, either, neither**.",
      table: {
        columns: ["Word", "In the sentence", "Kind of pronoun", "Sitting"],
        rows: [
          {
            cells: ["himself", "The secretary himself visited the affected families", "Emphatic: it only adds stress", "2019 (II)"],
            pyqExampleId: "d11f349a-16ba-4b69-8acd-73692f8c0526",
          },
          {
            cells: ["it", "they gave it to him (it = the jewel)", "Personal: stands for a noun already named", "2020 (II)"],
            pyqExampleId: "4ca8d431-0e40-4390-b54d-ab0a3ec7a0d9",
          },
          {
            cells: ["It", "It is eleven O'clock now", "Impersonal: stands for no noun (time)", "2020 (II)"],
          },
          {
            cells: ["myself", "I hurt myself", "Reflexive: the action comes back to 'I'", "2020 (II)"],
            pyqExampleId: "078efee8-9150-4da0-b2f0-41a54493d1cb",
          },
          {
            cells: ["thyself", "Love your neighbour as thyself", "Reflexive: the old form of 'yourself'", "2021 (I)"],
            pyqExampleId: "7c9ca54d-8d80-4a46-bb4a-ea02414ffb45",
          },
          {
            cells: ["one", "I'd like an ice cream. Are you having one too?", "Indefinite: 'one' = an ice cream", "2022 (I)"],
            pyqExampleId: "c424b3d4-c698-4f81-bad6-1437b834f75a",
          },
          {
            cells: ["None", "None of these cars is in use", "Indefinite: 'none' = not one", "2023 (I)"],
            pyqExampleId: "2145d309-6041-471c-aab2-a2936fffe151",
          },
          {
            cells: ["They", "They are all going to attend the function", "Personal", "2023 (II)"],
            pyqExampleId: "5d3448f3-c00f-4c7d-ba64-005451d2c535",
          },
          {
            cells: ["one", "What made you choose the one rather than the other?", "Indefinite: stands for the thing chosen", "2024 (I)"],
            pyqExampleId: "b489e860-c9b6-4a4f-bb08-0d007c3c3d84",
          },
          {
            cells: ["himself", "The money which one earns is not the money for himself", "Reflexive: refers back to 'one'", "2024 (II)"],
            pyqExampleId: "12bcab3a-5267-4db3-a9ef-433507fc7d41",
          },
        ],
        caption: "When the options give only 'Pronoun' and no kinds, choose Pronoun for every row above.",
      },
      pyqExampleId: "4fe3b13c-1293-4e9d-baeb-aa9e8114e4d5",
      selfCheckExample: {
        prompt:
          "Name the kind of pronoun underlined: The children made the posters \\(\\underline{\\text{themselves}}\\).",
        steps: [
          "Remove the word: 'The children made the posters.' The sentence is still complete.",
          "So the word is not needed as an object. It only stresses that the children, and nobody else, made them.",
          "A -self word used only for stress is emphatic.",
        ],
        answer: "Emphatic pronoun.",
      },
      practiceSet: [
        { prompt: "She cut \\(\\underline{\\text{herself}}\\) on the broken glass. Kind of pronoun?", answer: "Reflexive", method: "remove it and 'She cut on the glass' breaks" },
        { prompt: "\\(\\underline{\\text{Each}}\\) of the boys got a prize. Kind of pronoun?", answer: "Distributive", method: "one boy at a time" },
        { prompt: "\\(\\underline{\\text{Somebody}}\\) has left the gate open. Kind of pronoun?", answer: "Indefinite" },
        { prompt: "I met Meena and gave \\(\\underline{\\text{her}}\\) the book. Kind of pronoun?", answer: "Personal", method: "it stands for Meena" },
      ],
      traps: [
        {
          title: "Reflexive or emphatic: use the remove test",
          body:
            "Both use -self forms. Take the word out. If the sentence breaks ('I hurt'), it is **reflexive**. If the sentence still stands ('The secretary visited the families'), it is **emphatic**.",
        },
        {
          title: "'It' that stands for nothing",
          body:
            "'It' is **personal** when it stands for a thing already named (the jewel ... gave it). It is **impersonal** when there is no such thing: time, weather, distance.",
        },
        {
          title: "'None' is not distributive",
          body:
            "The distributive pronouns are only **each, either, neither**: they take a group one at a time. 'None' means 'not one' and is **indefinite**.",
        },
      ],
    },

    // C4 — relative pronouns
    {
      kind: "formula" as const,
      slug: "cdsenpos-relative-pronouns",
      name: "Relative pronouns: who, whom, which, that",
      intuition:
        "A relative pronoun does two jobs at once. It stands for a noun just named, and it joins a describing part to that noun. " +
        "'The man who called' = 'the man' + 'he called'. Pick the form by asking what the pronoun does inside its own part.",
      definition:
        "Terms:\n" +
        "- A **clause** is a group of words with its own subject and verb (he called).\n" +
        "- A **relative clause** describes a noun. It opens with a relative pronoun.\n" +
        "- The **antecedent** is the noun the relative pronoun stands for (the **man** who called).\n" +
        "The forms:\n" +
        "- **who**: for people, when it is the subject of its clause (the man **who** won).\n" +
        "- **whom**: for people, when it is the object, or after a preposition (the man **whom** we met; the person **to whom** you spoke).\n" +
        "- **whose**: shows possession (the girl **whose** bag was lost).\n" +
        "- **which**: for things and animals (the struggle **which** paved the way).\n" +
        "- **that**: for people or things, but never straight after a preposition.\n" +
        "The method:\n" +
        "- Find the antecedent. Person or thing?\n" +
        "- Read the clause. Does the pronoun do the action (subject) or receive it, or follow a preposition (object)?\n" +
        "- Person + subject = who. Person + object = whom. Thing = which or that.",
      authoredExample: {
        prompt:
          "Fill in the blank: The officer _______ led the parade was given a medal. (a) whom (b) who (c) which (d) whose",
        steps: [
          "The antecedent is 'the officer', a person, so 'which' is out.",
          "Read the clause: '_______ led the parade'. The pronoun is the one who led, so it is the subject.",
          "A person as subject takes 'who'. 'Whose' would need a noun after it (whose horse).",
        ],
        answer: "(b) who.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: The bridge _______ was built last year has already cracked. (a) who (b) whom (c) which (d) whose",
        steps: [
          "The antecedent is 'the bridge', a thing.",
          "'Who' and 'whom' are only for people.",
          "'Whose' needs a noun after it. The clause '_______ was built last year' needs a subject for a thing.",
        ],
        answer: "(c) which.",
      },
      practiceSet: [
        { prompt: "The girl _______ bag was stolen went to the police.", answer: "whose", method: "possession: her bag" },
        { prompt: "This is the book _______ I told you about.", answer: "which (or that)", method: "a thing, the object of 'told you about'" },
        { prompt: "The doctor _______ examined me was very kind.", answer: "who", method: "a person, the subject of 'examined'" },
        { prompt: "Is 'who' in 'Who broke the window?' a relative pronoun?", answer: "No. It is an interrogative pronoun", method: "it asks a question and has no antecedent" },
      ],
      pyqExampleId: "f8003e9a-7a71-4fd9-9c44-ce335c7808d2",
      traps: [
        {
          title: "After a preposition: whom or which, never who or that",
          body:
            "Write 'to **whom**', 'with **whom**', 'about **which**'. 'To who' and 'to that' are wrong in formal English.",
        },
        {
          title: "The clause is not the word",
          body:
            "Options sometimes include 'Relative clause'. The clause is the whole describing part. The underlined single word that opens it is a **relative pronoun**.",
        },
        {
          title: "Relative or interrogative",
          body:
            "'Who' that asks a question is an **interrogative** pronoun. 'Who' that joins a describing clause to a noun before it is a **relative** pronoun. Look for the antecedent.",
        },
      ],
    },
  ],
};
