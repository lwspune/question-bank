import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_ARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Articles: A, An and The",
  title: "Articles: a, an, the or no article",
  oneLineDefinition:
    "A and an introduce one thing the listener does not know yet; the sound that follows decides which. The points to one known thing. Some nouns, such as numbered ones, take no article.",
  whyItMatters:
    "Article blanks are short and quick, so they are easy marks if the two rules are clear. " +
    "The traps are always the same few: words that start with a vowel letter but a consonant sound (unique, university), a silent h, letters read aloud, and numbered nouns that take no article.",
  concepts: [
    // C1 — a or an
    {
      kind: "formula" as const,
      slug: "cdsenpos-a-or-an",
      name: "A or an: the first SOUND decides",
      intuition:
        "'An' exists only to make speech smooth. Say the next word aloud. If it starts with a vowel sound, use 'an'; if it starts with a consonant sound, use 'a'. " +
        "The spelling does not matter, only the sound.",
      definition:
        "Terms:\n" +
        "- **A** and **an** are the **indefinite articles**: they introduce one countable thing, not a particular known one (There is **a** visitor for you).\n" +
        "- **Vowel sound** vs **vowel letter**: the rule follows the sound you hear, not the letter you see.\n" +
        "The rules:\n" +
        "- Vowel sound: **an** apple, **an** honest man (the h is **silent**), **an** hour, **an** heir.\n" +
        "- A 'yoo' or 'w' sound is a consonant sound: **a** unique system, **a** university, **a** European, **a** one-day match.\n" +
        "- Letters read aloud: F, H, L, M, N, R, S, X begin with a vowel sound (eff, aitch, em ...): **an** MLA, **an** FIR. U is read 'yoo': **a** UN agency.\n" +
        "- A sounded h takes 'a': **a** house, **a** hotel.\n" +
        "- Fixed phrase: on the horns of **a** dilemma (facing two hard choices).",
      authoredExample: {
        prompt:
          "Fill in the blank: He waited for _______ hour at the station. (a) a (b) an (c) the (d) no article",
        steps: [
          "Say the word aloud: 'hour' is said 'our'. The h is silent.",
          "So the word starts with a vowel sound.",
          "A vowel sound takes 'an'. The hour is not a particular known one, so 'the' does not fit.",
        ],
        answer: "(b) an.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: She is _______ European by birth. (a) a (b) an (c) the (d) no article",
        steps: [
          "'European' starts with the letter e, a vowel letter.",
          "But it is said 'yoo-ropean'. The first sound is the consonant sound 'y'.",
          "A consonant sound takes 'a'.",
        ],
        answer: "(a) a.",
      },
      practiceSet: [
        { prompt: "_______ umbrella", answer: "an", method: "starts with the vowel sound 'uh'" },
        { prompt: "_______ one-rupee coin", answer: "a", method: "'one' starts with a 'w' sound" },
        { prompt: "_______ NCC cadet", answer: "an", method: "N is read 'en'" },
        { prompt: "_______ useful book", answer: "a", method: "'useful' starts with a 'yoo' sound" },
      ],
      pyqExampleId: "93ba7c0d-31a2-4ad6-93fc-81d52c131044",
      traps: [
        {
          title: "Vowel letter, consonant sound",
          body:
            "'Unique', 'university', 'European' and 'one' start with vowel letters but consonant sounds. They take **a**: a unique system, a university.",
        },
        {
          title: "The silent h",
          body:
            "In honest, hour, heir and honour the h is not said, so they take **an**: an honest contestant. In house and hotel the h is said, so they take **a**.",
        },
        {
          title: "Short forms read letter by letter",
          body:
            "Read the letters aloud. 'MLA' starts with 'em', so it is **an** MLA. 'NDA' starts with 'en': **an** NDA cadet. But 'UPSC' starts with 'yoo': **a** UPSC exam.",
        },
      ],
    },

    // C2 — the, or no article
    {
      kind: "formula" as const,
      slug: "cdsenpos-the-or-none",
      name: "'The' for the one known thing; no article before a numbered noun",
      intuition:
        "'The' says: you know which one I mean. Either it is the only one, or it was mentioned, or it is right in front of us. " +
        "If the listener cannot know which one, use a or an. And some nouns take no article at all.",
      definition:
        "Terms:\n" +
        "- **The** is the **definite article**. Like a and an, it is a **determiner**. Older grammar books call articles adjectives.\n" +
        "- **Zero article**: no article at all.\n" +
        "Use 'the':\n" +
        "- For the only one of its kind, or a post held by one person (the sun, the captain of the team).\n" +
        "- When an 'of' phrase or the situation makes it particular (the nightingale of the college; pass the sugar, the sugar on this table).\n" +
        "- Before a superlative (the best, the most sought after teacher).\n" +
        "- For a whole field or industry (the travel industry) and in fixed uses such as going to the dentist, the doctor.\n" +
        "- For a whole class with a singular noun (The cat loves comfort).\n" +
        "Use no article:\n" +
        "- Before a noun with a number after it: platform number 5, page 10, room 4, gate 2.\n" +
        "- Before an uncountable or plural noun used in general: Honesty is rare; Children learn fast.\n" +
        "- Before names of meals and languages: We had lunch; She speaks Tamil.",
      authoredExample: {
        prompt:
          "Fill in the blank: Please close _______ door; it is cold in here. (a) a (b) an (c) the (d) no article",
        steps: [
          "Both speakers are in the same room, so they know which door is meant.",
          "One known, particular thing takes the definite article.",
          "'A door' would mean any door at all.",
        ],
        answer: "(c) the.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: The answer is on _______ page 12 of your book. (a) a (b) the (c) an (d) no article",
        steps: [
          "'Page' has a number after it: page 12.",
          "A noun with a number after it takes no article.",
        ],
        answer: "(d) no article.",
      },
      practiceSet: [
        { prompt: "_______ Ganga flows through Varanasi.", answer: "The", method: "names of rivers take 'the'" },
        { prompt: "She is _______ best player in the team.", answer: "the", method: "a superlative" },
        { prompt: "_______ honesty is a rare quality. (the / no article)", answer: "No article", method: "an uncountable noun used in general" },
        { prompt: "We had _______ lunch at noon. (a / the / no article)", answer: "No article", method: "names of meals" },
      ],
      pyqExampleId: "1e7857d7-f210-4676-ac6b-22d46ab68f02",
      traps: [
        {
          title: "A number after the noun removes the article",
          body:
            "Write 'from platform number 5', 'turn to page 10', 'in room 4'. 'The platform number 5' is wrong.",
        },
        {
          title: "An 'of' phrase makes it particular",
          body:
            "'She is considered **the** nightingale of the college': the 'of the college' part picks out one title. Do not choose 'a' just because the noun is singular.",
        },
        {
          title: "Naming the class of 'the'",
          body:
            "If an item underlines 'the' and asks for its class, choose **Definite article** or **Determiner**. 'Adjective' is the old label; pick it only if neither of the others is offered.",
        },
      ],
    },
  ],
};
