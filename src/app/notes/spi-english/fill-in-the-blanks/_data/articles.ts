import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FB_ARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Articles and Agreement",
  title: "Articles and Agreement",
  oneLineDefinition:
    "An article gap asks whether the noun is one of many (a, an), already known or one of a kind (the); an agreement gap asks whether the subject is one or more.",
  whyItMatters:
    "Five questions in the bank, all from LWS mocks: three EASY, one MODERATE and one HARD. The HARD one joins the two rules: a single 'the' before two job titles makes them one person, and one person takes a singular verb.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spifbar-articles",
      name: "A, an or the",
      intuition:
        "'A' and 'an' point to any one of many: a dog, an apple. 'The' points to one particular thing, either because it has been mentioned, because both speakers know which one, or because there is only one of it. " +
        "Choose between 'a' and 'an' by the first sound you say, not the first letter you see.",
      definition:
        "The rules:\n" +
        "- **a** before a consonant sound: a book, a uniform (you-niform), a tall tree.\n" +
        "- **an** before a vowel sound: an egg, an hour (the h is silent), an honest man.\n" +
        "- **a** or **an** for something mentioned for the first time, or for one of many: 'I saw a bird.'\n" +
        "- **the** for something already known: 'The bird flew away.'\n" +
        "- **the** for things that are one of a kind: the sun, the moon, the earth, the sky.\n" +
        "- **the** for rivers, canals, seas, oceans and mountain ranges: the Ganga, the Panama Canal, the Arabian Sea, the Himalayas.",
      table: {
        columns: ["Noun", "Article", "Correct example"],
        rows: [
          { cells: ["a consonant sound", "a", "a tall tree, a university"] },
          { cells: ["a vowel sound", "an", "an orange, an hour"], noteAmber: "Hour starts with a vowel sound, so it is an hour." },
          { cells: ["first mention, one of many", "a or an", "A man knocked at the door."] },
          { cells: ["already known to both speakers", "the", "Shut the window, please."] },
          { cells: ["one of a kind", "the", "the sun, the sky, the earth"] },
          { cells: ["river, canal, sea, ocean, mountain range", "the", "the Ganga, the Panama Canal, the Himalayas"] },
        ],
        caption: "A two-blank article question is two separate decisions: settle each gap on its own.",
      },
      pyqExampleId: "443e3eec-0ae6-4d6d-a51e-53f429a00d2e",
      selfCheckExample: {
        prompt: "Fill in the blanks: She waited for ____ hour, and then ____ sun came out. (a) a, the (b) an, the (c) an, a (d) the, a",
        steps: [
          "'Hour' begins with a vowel sound (the h is silent), so 'an hour'.",
          "There is only one sun, so 'the sun'.",
        ],
        answer: "(b) an, the",
      },
      practiceSet: [
        { prompt: "Choose: '(A / An) honest boy returned the purse.'", answer: "An", method: "The h in honest is silent." },
        { prompt: "Choose: 'He goes to (a / an) university in Delhi.'", answer: "a", method: "University begins with a 'you' sound, a consonant sound." },
        { prompt: "Choose: '(A / The) Brahmaputra flows through Assam.'", answer: "The" },
        { prompt: "Choose: 'I bought a pen. (A / The) pen writes well.'", answer: "The", method: "The pen has already been mentioned." },
      ],
      traps: [
        {
          title: "Go by the sound, not the letter",
          body:
            "'A university' and 'a one-day match' start with consonant sounds; 'an hour' and 'an MLA' start with vowel sounds. Say the word aloud in your head.",
        },
        {
          title: "One of a kind takes the",
          body:
            "There is only one moon and one sky, so they take 'the'. Writing 'a moon' for our Moon is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spifbar-agreement",
      name: "One or more: the verb for the subject",
      intuition:
        "Before you fill a verb gap, decide whether the subject is one person or thing or more than one. Some subjects that sound like many people are grammatically one. " +
        "Then check that the verb form fits the word after the gap: '-ing' needs a form of 'be', a third form like 'left' needs a form of 'have'.",
      definition:
        "The rules:\n" +
        "- **Everybody**, **everyone**, **somebody**, **nobody**, **each** and **every** are singular: 'Everyone is here.'\n" +
        "- Two nouns joined by **and** are plural: 'Ravi and Anu are friends.'\n" +
        "- But **one 'the' before two titles** means one person holding both posts: 'The captain and coach **is** here' (one person). Two people need two articles: 'The captain and the coach **are** here.'\n" +
        "- An -ing word after the gap needs **is, was, are, were**. A third form (gone, left, eaten) needs **has, have, had**.",
      table: {
        columns: ["Subject", "Number", "Correct example"],
        rows: [
          { cells: ["everybody, everyone, nobody, each", "singular", "Everyone in the bus was singing."] },
          { cells: ["A and B (two people or things)", "plural", "The pen and the pencil are on the desk."] },
          {
            cells: ["the + title and title (one article)", "singular: one person", "The poet and painter was honoured."],
            noteAmber: "With 'the poet and the painter', it is two people: were honoured.",
          },
          { cells: ["one name or one thing", "singular", "My friend has gone home."] },
        ],
        caption: "Count the articles before two job titles: one 'the' means one person.",
      },
      pyqExampleId: "18d85190-fa61-46ec-af8b-af462087dd2c",
      selfCheckExample: {
        prompt: "Fill in the blank: Nobody in the class ____ finished the test yet. (a) have (b) has (c) are (d) were",
        steps: [
          "'Nobody' is singular.",
          "'Finished' after the gap is a third form, so the verb is a form of 'have'.",
          "Singular 'have' is 'has'.",
        ],
        answer: "(b) has",
      },
      practiceSet: [
        { prompt: "Choose: 'Each of the boys (has / have) a ticket.'", answer: "has" },
        {
          prompt: "Choose: 'The headmaster and teacher of the village school (was / were) present.' (one person holds both posts)",
          answer: "was",
        },
        { prompt: "Choose: 'Somebody (is / are) knocking at the door.'", answer: "is" },
        { prompt: "Choose: 'The doctor and the nurse (has / have) arrived.'", answer: "have", method: "Two articles, so two people." },
      ],
      traps: [
        {
          title: "Everybody sounds like many but is one",
          body:
            "'Everybody', 'everyone' and 'nobody' take a singular verb even though they talk about a group: 'Everybody likes him', not 'Everybody like him'.",
        },
        {
          title: "The word after the gap picks the helper",
          body:
            "'-ing' needs a form of be (was singing); a third form needs a form of have (has gone). 'Has singing' is not English, and 'is left' cannot stand for 'has left'.",
        },
      ],
    },
  ],
};
