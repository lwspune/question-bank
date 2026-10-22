import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_AGREEMENT_NOTE: SubtopicNote = {
  subtopicName: "Agreement and Conjunctions",
  title: "Agreement and Conjunctions",
  oneLineDefinition:
    "A verb must match its real subject in number, and a conjunction is the joining word whose meaning decides how two ideas fit together.",
  whyItMatters:
    "Eight questions in the bank: 6 EASY and 2 MODERATE, and one is from the 2022 paper. Three ask which verb agrees with a tricky subject; five ask you to spot, count or choose a joining word.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrag-agreement",
      name: "Finding the real subject before choosing the verb",
      intuition:
        "Long subjects hide the one word the verb must agree with. Cover up the extra words, find that word, and ask whether it is one thing or many.",
      definition:
        "- A singular subject takes a singular verb (is, was, has); a plural subject takes a plural verb (are, were, have).\n" +
        "- Words added with **along with, as well as, together with, with** do not change the number: the verb follows the **first** subject.\n" +
        "- With **neither ... nor** and **either ... or**, the verb agrees with the subject **nearer** to it.\n" +
        "- Two subjects joined by **and** take a plural verb.\n" +
        "- **Uncountable** nouns such as furniture, news, information, luggage and advice are singular.",
      table: {
        columns: ["Subject pattern", "Verb follows", "Example"],
        rows: [
          { cells: ["A as well as B", "A, the first subject", "The teacher, as well as her pupils, was excited."] },
          { cells: ["Neither A nor B", "B, the nearer subject", "Neither my brother nor my parents were at home."] },
          { cells: ["Either A or B", "B, the nearer subject", "Either the boys or their father has the key."] },
          { cells: ["A and B", "plural", "Ravi and Meena are cousins."] },
          { cells: ["Each, every, everyone", "singular", "Every student has a locker."] },
          { cells: ["Uncountable noun", "singular", "The news is good."] },
        ],
        caption: "Cover the words between commas and the verb's real subject is left standing.",
      },
      selfCheckExample: {
        prompt: "Choose the verb: The manager, together with his assistants, ____ (has / have) left the office.",
        steps: [
          "'Together with his assistants' is an added phrase, so cover it.",
          "The real subject is 'the manager', which is singular.",
        ],
        answer: "The manager, together with his assistants, has left the office.",
      },
      practiceSet: [
        { prompt: "Fill in: Neither the teacher nor the students ____ (was / were) late.", answer: "were" },
        { prompt: "Fill in: The information you gave me ____ (is / are) correct.", answer: "is" },
        { prompt: "Fill in: Either you or he ____ (is / are) to blame.", answer: "is" },
        { prompt: "Fill in: Sita and her sister ____ (sing / sings) well.", answer: "sing" },
        { prompt: "Fill in: The captain as well as the players ____ (was / were) praised.", answer: "was" },
      ],
      pyqExampleId: "5f9935b5-bf4a-4df4-a697-667c61b0a981",
      traps: [
        {
          title: "Letting the nearest plural noun choose the verb",
          body:
            "In 'The leader with his followers', the verb follows 'leader', not 'followers'. Only neither ... nor and either ... or use the nearer subject.",
        },
        {
          title: "Treating furniture or news as plural",
          body:
            "Furniture, news, luggage and information have no plural form. They always take a singular verb: 'The luggage is heavy.'",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrag-conjunctions",
      name: "Conjunctions and what each one means",
      intuition:
        "A conjunction joins words or whole sentences, and each one carries a meaning: adding, contrasting, choosing, giving a reason, a result, a condition or a time. Prepositions and determiners look similar but join nothing.",
      definition:
        "- A **conjunction** joins two words, phrases or clauses: and, but, or, so, because, if, though, although, unless, till, until, than, when, while.\n" +
        "- A **preposition** (on, at, through, under, with) sits before a noun and joins no clauses.\n" +
        "- A **determiner** or pronoun (some, many, this) is not a conjunction.\n" +
        "- An **interjection** (hurrah, alas, oh) shows a feeling and joins nothing.",
      table: {
        columns: ["Conjunction", "Job", "Example"],
        rows: [
          { cells: ["and", "adds", "She cooked and I washed up."] },
          { cells: ["but, though", "contrasts", "He is rich but unhappy."] },
          { cells: ["or", "offers a choice", "Will you walk or take the bus?"] },
          { cells: ["so", "gives a result", "It was late, so we left."] },
          { cells: ["because, as", "gives a reason", "We stayed in because it was cold."] },
          { cells: ["if, unless", "gives a condition", "Call me if you need help."] },
          { cells: ["till, until, when", "gives a time", "Wait until the bell rings."] },
          { cells: ["than", "compares", "She is taller than her sister."] },
        ],
        caption: "To test a word, try joining two short sentences with it. If it cannot join them, it is not a conjunction.",
      },
      selfCheckExample: {
        prompt: "Which of these words are conjunctions: because, under, unless, many, while?",
        steps: [
          "'Because', 'unless' and 'while' can each join two clauses: 'I left because I was tired.'",
          "'Under' is a preposition and 'many' is a determiner, so neither joins clauses.",
        ],
        answer: "because, unless, while",
      },
      practiceSet: [
        { prompt: "Pick the conjunction: quickly, although, beside.", answer: "although" },
        { prompt: "Which conjunction offers a choice between two things?", answer: "or" },
        { prompt: "Is 'with' a conjunction or a preposition?", answer: "A preposition" },
        { prompt: "Which conjunction is used to compare: than or then?", answer: "than" },
        { prompt: "What part of speech is 'alas'?", answer: "An interjection" },
      ],
      pyqExampleId: "cc9b13d3-bc65-4965-8ed5-7050bd6cafa7",
      traps: [
        {
          title: "Counting prepositions as conjunctions",
          body:
            "On, at, through and under are prepositions: they come before a noun. Through and though look alike, but only though is a conjunction.",
        },
        {
          title: "Mixing up than and then",
          body: "Than compares ('taller than') and is a conjunction. Then means 'after that' and is an adverb of time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spigrag-joining",
      name: "Joining two sentences with the right conjunction",
      intuition:
        "Before you join two sentences, decide how they are related. If the second adds to the first, use and; if it goes against it, use but; if it follows from it, use so.",
      definition:
        "- Decide the link: **addition** (and), **contrast** (but), **result** (so), **reason** (because, as), **choice** (or).\n" +
        "- Keep both verbs in the **same tense** unless the meaning changes.\n" +
        "- Do not change the facts: a conjunction such as neither ... nor or as can add a meaning the two sentences never had.",
      authoredExample: {
        prompt: "Join with a conjunction: The road was wet. We drove slowly.",
        steps: [
          "The slow driving follows from the wet road, so the link is a result.",
          "A result is joined with 'so', and both verbs stay in the past.",
        ],
        answer: "The road was wet, so we drove slowly.",
      },
      selfCheckExample: {
        prompt: "Join with a conjunction: She is poor. She is honest.",
        steps: [
          "Being poor and being honest are set against each other, so the link is a contrast.",
          "Use 'but' and drop the repeated 'she is' if you like.",
        ],
        answer: "She is poor but honest.",
      },
      practiceSet: [
        { prompt: "Join: He ran fast. He missed the train.", answer: "He ran fast but missed the train." },
        { prompt: "Join with 'or': Hurry up. You will be late.", answer: "Hurry up or you will be late." },
        { prompt: "Join: I was hungry. I ate an apple.", answer: "I was hungry, so I ate an apple." },
        { prompt: "Join: She sang a song. She danced.", answer: "She sang a song and danced." },
      ],
      pyqExampleId: "a932a710-a69b-4dce-825f-a16583a6e3ff",
      traps: [
        {
          title: "Joining a contrast with 'and'",
          body: "'And' only adds. When the second fact goes against the first, the joining word is 'but'.",
        },
        {
          title: "Changing the tense while joining",
          body:
            "Two past actions stay past: 'bought a pen and gave it away', not 'bought a pen and give it away'.",
        },
      ],
    },
  ],
};
