import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAL_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Formation",
  title: "Word Formation",
  oneLineDefinition:
    "Questions that test which words a set of letters can or cannot make: words formed from a longer word, jumbled letters turned into a word, and counts of the words some picked letters can spell.",
  whyItMatters:
    "Twenty-one questions in the bank, all from the 2025 shifts, with 14 EASY and 7 MODERATE. They are quick marks once you count letters instead of reading meanings, because most wrong options fail on a single missing or doubled letter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscralwo-supply",
      name: "Checking the letter supply",
      intuition:
        "Think of the given word as a bag of letter tiles. A word can be formed only if every tile it needs is in the bag, as many times as it needs it. Each tile is used once.",
      definition:
        "1. List the given word's letters with their counts: ACCEPTANCE has A 2, C 3, E 2, P 1, T 1, N 1.\n" +
        "2. For each option, check every letter: is it in the list, and is it there often enough?\n" +
        "3. 'Cannot be formed' picks the option that fails; 'can be formed' picks the one that passes.\n" +
        "- **Fast route:** first scan each option for a letter the given word does not have at all; that settles most questions in a few seconds. Only if every letter is present, check the doubled letters (two Ls, two Ts).",
      authoredExample: {
        prompt:
          "Which word cannot be formed from the letters of DEMONSTRATE, using each letter only as often as it appears? (a) STREAM (b) MASTER (c) MONSTER (d) STATEMENT",
        steps: [
          "DEMONSTRATE has D 1, E 2, M 1, O 1, N 1, S 1, T 2, R 1, A 1.",
          "STREAM, MASTER and MONSTER need only one of each letter they use, and all are present.",
          "STATEMENT needs three Ts, and the word has only two.",
        ],
        answer: "(d) STATEMENT",
      },
      selfCheckExample: {
        prompt: "Which word can be formed from the letters of PERSONAL? (a) PLANET (b) SALOON (c) LEARN (d) PROPER",
        steps: [
          "PERSONAL has P, E, R, S, O, N, A, L, each once.",
          "PLANET needs T; SALOON needs two Os; PROPER needs two Ps and two Rs.",
          "LEARN uses L, E, A, R, N, all present once.",
        ],
        answer: "(c) LEARN",
      },
      practiceSet: [
        { prompt: "Can the word DREAM be formed from the letters of MODERATE?", answer: "Yes", method: "D, R, E, A and M are all in MODERATE." },
        { prompt: "Can the word BALLOON be formed from the letters of BALCONY?", answer: "No", method: "BALLOON needs two Ls and two Os; BALCONY has one of each." },
        { prompt: "Can the word TENT be formed from the letters of PATIENT?", answer: "Yes", method: "PATIENT has two Ts, one E and one N." },
        { prompt: "Can the word SPEED be formed from the letters of SPIDER?", answer: "No", method: "SPEED needs two Es; SPIDER has one." },
      ],
      pyqExampleId: "a57b6ac6-42b1-47ef-aa98-a0d86f4d4c07",
      traps: [
        {
          title: "Checking letters but not counts",
          body:
            "THRILLS uses only letters found in RELATIONSHIP, yet it needs two Ls and RELATIONSHIP has one. A letter that appears in both words still fails if the option needs it more often.",
        },
        {
          title: "Judging by meaning instead of letters",
          body:
            "An option can be a common, sensible word and still be impossible to form. Decide by the letter counts alone; meaning matters only in the jumble questions on this page.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralwo-anagram",
      name: "Rearranging letters into a word",
      intuition:
        "A jumble question gives you letters and asks for the real word they spell. The right option uses exactly the same letters, each the same number of times, and is a word you know. Counting letters rules out the fakes before you need to think about meaning.",
      definition:
        "- **Same letters, same counts:** an anagram uses every given letter exactly once. Check the length first, then the letters.\n" +
        "- **Meaning:** among the options with the right letters, pick the real word (or the one with the meaning asked, such as a weapon or an animal).\n" +
        "- **Place of a letter:** form the word first, then number it from the left.\n" +
        "- **Number codes:** if each letter carries a number, write the word, then write the number under each letter in order.\n" +
        "- **One letter changed:** the new word has the same length, and every place but one keeps its letter.\n" +
        "- **Fast route:** in a long jumble, look for a common ending (TION, ING, ENT) among the letters and build the word around it.",
      authoredExample: {
        prompt:
          "The letters N, A, L, P, T, E can be arranged to form the name of a heavenly body. Which letter is 4th from the left in that word?",
        steps: [
          "The six letters spell PLANET.",
          "Number it: P (1), L (2), A (3), N (4), E (5), T (6).",
          "The 4th letter is N.",
        ],
        answer: "N",
      },
      selfCheckExample: {
        prompt: "Which of these is not an anagram of LISTEN: SILENT, TINSEL, ENLIST, LISTED?",
        steps: [
          "LISTEN has L, I, S, T, E, N.",
          "SILENT, TINSEL and ENLIST use exactly these six letters.",
          "LISTED has a D and no N.",
        ],
        answer: "LISTED",
      },
      practiceSet: [
        { prompt: "Rearrange the letters of TAPS to form a word meaning 'earlier times'.", answer: "PAST" },
        { prompt: "Which word is formed by changing exactly one letter of BRIGHT: BRIGHTER, FRIGHT, BRING or RIGHT?", answer: "FRIGHT", method: "Only FRIGHT keeps the length and changes one place, B to F." },
        { prompt: "Rearrange the letters R, C, A, E into a word meaning a contest of speed.", answer: "RACE" },
        { prompt: "How many letters does any anagram of TRIANGLE have?", answer: "8", method: "An anagram uses every letter once, so it keeps the length." },
      ],
      pyqExampleId: "0d8696fb-ec60-4bae-834f-91d1ca701566",
      traps: [
        {
          title: "Taking a near-anagram",
          body:
            "LITERAL looks like INTEGRAL but has seven letters, two Ls and no N or G. Count the letters of each option against the given ones before you accept it.",
        },
        {
          title: "Changing more than one letter",
          body:
            "POSSESSION shares many letters with PROFESSION but differs in more than one place. For a one-letter change, line the two words up and check that exactly one place differs and the length is the same.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralwo-count",
      name: "Counting the words that picked letters can make",
      intuition:
        "These questions pick four letters out of a word by their places and ask how many meaningful four-letter words use each of them once. A tidy list, built one starting letter at a time, makes sure you neither miss a word nor count one twice.",
      definition:
        "1. Pick the letters by their places in the word, counted from the left.\n" +
        "2. Take each letter in turn as the first letter and try the other three behind it. Write down every real word.\n" +
        "3. Count the words, each once.\n" +
        "- **Fast route:** with one vowel among the four letters, the words are few; start from the patterns you know (consonant, vowel, consonant, consonant).\n" +
        "- **Limit:** SSC's key sometimes counts a rare word (COSH from S, C, H, O; DORP from P, R, O, D). When your count falls one short of an option, look for a less common word before you answer.",
      authoredExample: {
        prompt:
          "How many meaningful four-letter English words can be formed from the 1st, 2nd, 3rd and 4th letters of POSTER, using each letter once?",
        steps: [
          "The letters are P, O, S, T.",
          "Starting with P: POST, POTS. With O: OPTS. With S: SPOT, STOP. With T: TOPS.",
          "That is six words.",
        ],
        answer: "Six (POST, POTS, OPTS, SPOT, STOP, TOPS)",
      },
      selfCheckExample: {
        prompt:
          "How many meaningful four-letter English words can be formed from the 1st, 2nd, 3rd and 4th letters of LIVES, using each letter once?",
        steps: ["The letters are L, I, V, E.", "The words are LIVE, EVIL, VILE and VEIL."],
        answer: "Four",
      },
      practiceSet: [
        { prompt: "Name two meaningful four-letter words that use each of the letters E, A, R, N once.", answer: "EARN and NEAR" },
        { prompt: "Which three common four-letter words use each of the letters L, A, T, E once?", answer: "LATE, TALE and TEAL" },
        { prompt: "What are the 1st, 3rd, 4th and 6th letters of the word CAMERA?", answer: "C, M, E, A" },
      ],
      pyqExampleId: "24df1f87-848f-49ea-9907-5e0bb54c5142",
      traps: [
        {
          title: "Using a letter twice",
          body:
            "From P, O, S, T you may not write POOT or STOT: each picked letter is used once in each word. A word that needs a letter twice is not counted.",
        },
        {
          title: "Picking the letters from the wrong places",
          body:
            "'The first, second, fourth and sixth letters of PLANET' are P, L, N and T, not P, L, A and N. Count the places from the left and skip the ones not named.",
        },
      ],
    },
  ],
};
