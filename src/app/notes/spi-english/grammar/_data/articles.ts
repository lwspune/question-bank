import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_ARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Articles",
  title: "Articles: a, an, the and no article",
  oneLineDefinition:
    "A and an point to any one of many things, the points to a particular thing both people know, and most proper names take no article at all.",
  whyItMatters:
    "Fifteen questions in the bank, 13 EASY and 2 MODERATE, and almost every mock paper has one or two. Each is a blank before a noun: decide first whether the noun is any one or a particular one, then listen to its first sound.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spigrar-a-an",
      name: "A or an: go by the first sound, not the first letter",
      intuition:
        "A and an mean the same thing: one, any one. The only difference is ease of speaking, so an goes before a vowel sound and a before a consonant sound. Say the word aloud and listen.",
      definition:
        "- Use **a** or **an** for one countable thing that is not particular: 'I saw a film.'\n" +
        "- **An** before a vowel **sound**: an apple, an hour, an heir, an MLA (em-el-ay).\n" +
        "- **A** before a consonant **sound**: a book, a university (you-ni), a European (you-ro), a one-day match (wun).\n" +
        "- The letter h is silent in hour, heir, honour and their family, so they take **an**.\n" +
        "- Use a or an for a job or a member of a group: 'She is a doctor.'",
      table: {
        columns: ["Word", "First sound", "Article"],
        rows: [
          { cells: ["umbrella", "vowel (uh)", "an umbrella"] },
          { cells: ["hour", "vowel (h silent)", "an hour"] },
          { cells: ["heir", "vowel (h silent)", "an heir"] },
          { cells: ["MBA", "vowel (em)", "an MBA"] },
          { cells: ["university", "consonant (you)", "a university"] },
          { cells: ["one-rupee coin", "consonant (wun)", "a one-rupee coin"] },
          { cells: ["horse", "consonant (h spoken)", "a horse"] },
          { cells: ["engineer", "vowel (en)", "an engineer"] },
        ],
        caption: "Spelling misleads: a university and an hour both break the letter rule, and both follow the sound rule.",
      },
      selfCheckExample: {
        prompt: "Fill in a or an: He waited for ____ hour and then left for ____ university meeting.",
        steps: [
          "'Hour' begins with a silent h, so its first sound is a vowel: an hour.",
          "'University' begins with the sound 'you', a consonant sound: a university.",
        ],
        answer: "He waited for an hour and then left for a university meeting.",
      },
      practiceSet: [
        { prompt: "Fill in: She is ____ engineer.", answer: "an" },
        { prompt: "Fill in: He bought ____ umbrella.", answer: "an" },
        { prompt: "Fill in: It was ____ useful lesson.", answer: "a: 'useful' begins with the sound 'you'" },
        { prompt: "Fill in: My father is ____ farmer.", answer: "a" },
        { prompt: "Fill in: It is ____ honour to meet you.", answer: "an: the h is silent" },
      ],
      pyqExampleId: "0bfc9fb0-957c-4f87-9237-d63aa575e63b",
      traps: [
        {
          title: "Going by the first letter",
          body:
            "'A hour' and 'an university' are wrong. The article follows the first sound: hour starts with a vowel sound, university with the sound 'you'.",
        },
        {
          title: "Using 'the' for a thing mentioned for the first time",
          body:
            "When a noun is any one of many and has not been named before, it takes a or an: 'We went to a park.' The comes later, once it is known.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrar-the",
      name: "The: a particular or a one-of-a-kind thing",
      intuition:
        "Use the when both you and the listener know exactly which thing you mean. Something can be known because it was mentioned before, because the sentence tells you which one, or because there is only one of it.",
      definition:
        "- A noun made **particular** by a phrase or clause: 'the boy in the red shirt', 'the book that you lent me'.\n" +
        "- A thing **already mentioned** or known to both speakers: 'I bought a pen. The pen leaks.' 'Where is the station?'\n" +
        "- Something **unique**: the sun, the sky, the Taj Mahal, the Statue of Liberty.\n" +
        "- A **superlative** or an order word: the best, the tallest, the first, the last.\n" +
        "- One sentence can need both: 'A dog chased the cat that lives upstairs.'",
      table: {
        columns: ["Reason for the", "Example"],
        rows: [
          { cells: ["made particular by a clause", "The man who called you is my uncle."] },
          { cells: ["made particular by an of-phrase", "the roof of the house"] },
          { cells: ["known to both speakers", "Please close the door."] },
          { cells: ["one of a kind", "The moon is bright tonight."] },
          { cells: ["superlative", "She is the tallest girl in the team."] },
          { cells: ["order word", "He was the first to arrive."] },
        ],
        caption: "If you can answer 'which one?' from the sentence or from what both people know, use the.",
      },
      selfCheckExample: {
        prompt: "Fill in the articles: ____ boy who sits behind me wants to be ____ pilot.",
        steps: [
          "'Who sits behind me' tells us exactly which boy, so: the boy.",
          "'Pilot' is any one of many pilots, a job, and starts with a consonant sound: a pilot.",
        ],
        answer: "The boy who sits behind me wants to be a pilot.",
      },
      practiceSet: [
        { prompt: "Fill in: Mount Everest is ____ highest peak in the world.", answer: "the" },
        { prompt: "Fill in: ____ sun rises in the east.", answer: "The" },
        { prompt: "Fill in: Please pass me ____ salt that is on the table.", answer: "the" },
        { prompt: "Fill in: Ravi was ____ first boy to finish the race.", answer: "the" },
        { prompt: "Fill in: I saw ____ owl on ____ branch of the old tree.", answer: "an, the" },
      ],
      pyqExampleId: "04295919-553d-40c1-a577-8afb8dd1ea64",
      traps: [
        {
          title: "Leaving out 'the' before a superlative",
          body: "'She is best singer' is wrong. A superlative always takes the: 'the best singer', 'the tallest tower'.",
        },
        {
          title: "Using 'a' when a clause makes the noun particular",
          body:
            "'A girl who won the prize is my cousin' sounds wrong because the clause tells you which girl. Use the: 'The girl who won the prize'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrar-names",
      name: "Names: when there is no article and when there is the",
      intuition:
        "A person's name, a city, a state or a country is already one particular place, so it needs no article. A small set of names (rivers, seas, mountain ranges, newspapers, famous buildings) takes the by custom.",
      definition:
        "- **No article** before names of people, cities, states, most countries, single mountains and lakes: Ravi, Agra, Kerala, India, Mount Abu.\n" +
        "- **The** before names of rivers, seas, oceans, mountain ranges, deserts and groups of islands: the Ganga, the Indian Ocean, the Himalayas, the Thar, the Andamans.\n" +
        "- **The** before newspapers, holy books and famous buildings: the Hindu, the Ramayana, the Red Fort.\n" +
        "- **The** before a country name that is a plural or a union: the USA, the Netherlands.",
      table: {
        columns: ["Kind of name", "Article", "Example"],
        rows: [
          { cells: ["city, state, most countries", "none", "Chennai is in Tamil Nadu."] },
          { cells: ["person", "none", "Arjun is my friend."] },
          { cells: ["river, sea, ocean", "the", "the Godavari, the Arabian Sea"] },
          { cells: ["mountain range", "the", "the Western Ghats"] },
          { cells: ["newspaper", "the", "the Times of India"] },
          { cells: ["holy book", "the", "the Gita"] },
          { cells: ["famous building", "the", "the Gateway of India"] },
          { cells: ["country that is a union or plural", "the", "the United Kingdom"] },
        ],
      },
      selfCheckExample: {
        prompt: "Fill in the articles (or write 'none'): ____ Narmada flows through ____ Gujarat.",
        steps: [
          "The Narmada is a river, and rivers take the.",
          "Gujarat is the name of a state, and states take no article.",
        ],
        answer: "The Narmada flows through Gujarat (no article before Gujarat).",
      },
      practiceSet: [
        { prompt: "Fill in, or write 'none': ____ Mumbai is a busy city.", answer: "none" },
        { prompt: "Fill in, or write 'none': ____ Himalayas lie to the north of India.", answer: "The" },
        { prompt: "Fill in, or write 'none': My uncle reads ____ Indian Express every morning.", answer: "the" },
        { prompt: "Fill in, or write 'none': ____ Bihar is in the east of India.", answer: "none" },
      ],
      pyqExampleId: "eb17a5a1-adc9-4679-a0ba-c47563a4786b",
      traps: [
        {
          title: "Putting 'the' before a city or a state",
          body: "'The Delhi' and 'the Punjab' are wrong in modern English. Cities and states take no article: 'Delhi', 'Punjab'.",
        },
        {
          title: "Dropping 'the' before a river or a newspaper",
          body: "Rivers and newspapers take the by custom: 'the Yamuna', 'the Hindu'.",
        },
      ],
    },
  ],
};
