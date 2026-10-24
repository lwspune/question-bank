import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAL_POSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Letter Position and Alphabet Test",
  title: "Letter Position and Alphabet Test",
  oneLineDefinition:
    "Questions about where a letter sits in the alphabet, how far apart two letters are, how a word changes when its letters are shifted, and which item stands at a given place in a word, sentence or series.",
  whyItMatters:
    "Nineteen questions in the bank: 11 from the 2025 shifts, 5 from the 2023 shifts and 3 from the 2024 shifts, with 11 EASY and 8 MODERATE. Each one needs letter positions you can recall without counting on your fingers, and the habit of numbering a word or sentence once before you answer.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscralpo-positions",
      name: "Letter positions, reverse positions and opposite letters",
      intuition:
        "Every letter has a number: A is 1 and Z is 26. Once you know the numbers by heart, questions about gaps, middles and reverse codes turn into small sums you can do in your head.",
      definition:
        "- **Forward position:** A1, B2, C3 up to Z26. Learn the anchors **EJOTY**: E5, J10, O15, T20, Y25. Any other letter is one or two steps from an anchor.\n" +
        "- **Reverse position** (Z = 1, A = 26) is 27 minus the forward position. M is 13, so its reverse position is 14.\n" +
        "- **Opposite letters** are pairs whose positions add to 27: A and Z, B and Y, C and X, D and W, E and V, F and U, G and T, H and S, I and R, J and Q, K and P, L and O, M and N. A letter's opposite is the letter with its reverse position as its forward position.\n" +
        "- **Letters between** two letters leave out both ends: between positions p and q there are |p minus q| minus 1 letters.\n" +
        "- **The middle letter** of two letters sits at (p + q) ÷ 2. It exists only when p + q is even.\n" +
        "- **Fast route:** the reverse positions of k letters add to 27k minus their forward positions, so you never need a second table.",
      formula: {
        label: "Positions in the alphabet",
        latex:
          "\\text{reverse} = 27 - n \\qquad \\text{letters between} = |p - q| - 1 \\qquad \\text{middle} = \\frac{p + q}{2}",
        symbols: [
          { symbol: "n", meaning: "a letter's forward position, A = 1 to Z = 26" },
          { symbol: "p and q", meaning: "the forward positions of the two letters compared" },
        ],
      },
      authoredExample: {
        prompt: "Using the reverse code (Z = 1, A = 26), what is the sum of the reverse positions of M and W?",
        steps: [
          "Forward positions: M is 13 and W is 23.",
          "Reverse positions: 27 minus 13 is 14, and 27 minus 23 is 4.",
          "Sum: 14 + 4 = 18. Fast check: 2 × 27 minus (13 + 23) = 54 minus 36 = 18.",
        ],
        answer: "18",
      },
      selfCheckExample: {
        prompt: "Which letter lies exactly midway between D and R in the English alphabet?",
        steps: [
          "D is 4 and R is 18.",
          "The middle position is (4 + 18) ÷ 2 = 11, which is K.",
          "Check: E to J (six letters) lie on one side of K and L to Q (six letters) on the other.",
        ],
        answer: "K",
      },
      practiceSet: [
        { prompt: "Which letter is the opposite of P, the letter whose position adds with P's to 27?", answer: "K", method: "P is 16, and 27 minus 16 is 11, which is K." },
        { prompt: "How many letters lie between F and S in the English alphabet?", answer: "12", method: "F is 6 and S is 19: 19 minus 6 minus 1 = 12." },
        { prompt: "Which letter is 19th from the right end of the English alphabet?", answer: "H", method: "The 19th from the right is 27 minus 19 = 8th from the left." },
        { prompt: "Which letter is 7th to the right of the 12th letter from the left of the English alphabet?", answer: "S", method: "12 + 7 = 19, which is S." },
      ],
      pyqExampleId: "98818204-434c-48d8-b405-237c74bfcfd2",
      traps: [
        {
          title: "Counting the end letters as 'between'",
          body:
            "The letters between H and P are I to O: seven letters, not nine. 'Between' in an alphabet gap leaves out both named letters, so subtract one from the difference of the positions.",
        },
        {
          title: "Using 26 minus n for the reverse position",
          body:
            "Z is 1 in the reverse code and A is 26, so the reverse position is 27 minus the forward one. With 26 minus n, Z would come out as 0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralpo-shift",
      name: "Shifting vowels and consonants, then counting a gap",
      intuition:
        "These questions change every letter of a word by one step, vowels one way and consonants the other, and then ask about the gap between two letters of the new word. Each letter changes on its own and keeps its place, so you only ever need the two letters the question points at.",
      definition:
        "1. Mark the vowels A, E, I, O, U. Every other letter is a consonant.\n" +
        "2. Read the rule twice: 'following' or 'next' means one step forward, 'previous' or 'preceding' means one step back.\n" +
        "3. Find the two places asked for. In a word of n letters, the kth from the right is the (n minus k + 1)th from the left.\n" +
        "4. Shift only the letters at those two places. Remember the wrap: A one step back is Z, and Z one step forward is A.\n" +
        "5. Count the letters between the two new letters: their positions' difference minus 1.\n" +
        "- **Fast route:** steps 3 and 4 skip writing the whole new word. This is safe because the shift never moves a letter to a new place; it breaks only if the question also reverses or sorts the word, and then you must write it all out.",
      authoredExample: {
        prompt:
          "Each vowel in the word PLANET is changed to the following letter in the alphabet and each consonant to the previous letter. How many letters lie in the alphabet between the 2nd letter from the left and the 1st letter from the right of the new word?",
        steps: [
          "The 2nd letter from the left is L and the 1st from the right is T. Both are consonants, so each moves one step back: K and S.",
          "The full new word, for a check, is OKBMFS.",
          "K is 11 and S is 19: 19 minus 11 minus 1 = 7.",
        ],
        answer: "7",
      },
      selfCheckExample: {
        prompt:
          "Each vowel in the word MOTHER is changed to the previous letter in the alphabet and each consonant to the following letter. How many letters lie in the alphabet between the 3rd letter from the left and the 2nd letter from the right of the new word?",
        steps: [
          "The 3rd from the left is T, a consonant, so it becomes U.",
          "MOTHER has 6 letters, so the 2nd from the right is the 5th from the left, E. A vowel moves back: D.",
          "U is 21 and D is 4: 21 minus 4 minus 1 = 16.",
        ],
        answer: "16",
      },
      practiceSet: [
        { prompt: "Each vowel in the word AXE is changed to the previous letter in the alphabet and each consonant to the following letter. What is the new word?", answer: "ZYD", method: "A moves back to Z, X forward to Y, E back to D." },
        { prompt: "Each consonant in the word BAKE is changed to the following letter in the alphabet, and the vowels stay as they are. What is the new word?", answer: "CALE" },
        { prompt: "In a word of 9 letters, which place from the left is the 4th letter from the right?", answer: "The 6th", method: "9 minus 4 + 1 = 6." },
        { prompt: "What letter does Z become when it is changed to the following letter in the alphabet?", answer: "A", method: "The alphabet wraps round after Z." },
      ],
      pyqExampleId: "e995fc96-6a7f-4d0a-bbf9-c4e2b0d9c243",
      traps: [
        {
          title: "Counting places in the old word after a sort",
          body:
            "A vowel and consonant shift keeps every letter in its place, so the old word's places are the new word's places. If a question also arranges the letters in order, the places change, and the full new word must be written first.",
        },
        {
          title: "Forgetting the wrap at A and Z",
          body:
            "In CAPSULE, with vowels moving back, the A becomes Z, not to a blank. A one step back is Z, and Z one step forward is A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralpo-counting",
      name: "Counting places in a word, a sentence or a series",
      intuition:
        "Some questions hand you a word, a sentence or a row of mixed letters, digits and symbols, and ask what stands at a certain place. Write a small number under each item once, then every question about that row is a lookup.",
      definition:
        "- **Number once:** write 1, 2, 3 under the items from the left. In a row of n items, the kth from the right is the (n minus k + 1)th from the left.\n" +
        "- **Moving from a place:** '2 to the right of the 7th from the left' is the 9th from the left; '3 to the left of the 8th' is the 5th.\n" +
        "- **The middle item** of an odd count n sits at place (n + 1) ÷ 2. An even count has no single middle item.\n" +
        "- **'Every 2nd word'** means the 2nd, 4th, 6th and so on: start at the 2nd, not the 1st.\n" +
        "- **'Between' inside a word:** in an alphabet gap it leaves out both ends. One question from the 2025 shifts, counting the letters of a word 'between the 2nd and 7th letter', was keyed with both ends counted, so when a stem could go either way, work out both counts before you choose.\n" +
        "- **Fast route:** when options are close, count only the stretch the question names, and count it twice in the same direction.",
      authoredExample: {
        prompt:
          "In the sentence 'Every student must finish the test early', the 2nd letter of every 2nd word is written in order. What word is formed?",
        steps: [
          "Number the words: Every (1), student (2), must (3), finish (4), the (5), test (6), early (7).",
          "Every 2nd word: student, finish, test.",
          "Their 2nd letters are t, i and e, which read 'tie'.",
        ],
        answer: "tie",
      },
      selfCheckExample: {
        prompt: "In the series 3 K 7 M R 2 Q 9 B T 5, which element is 3rd to the left of the 4th element from the right?",
        steps: [
          "There are 11 elements, so the 4th from the right is the 11 minus 4 + 1 = 8th from the left, which is 9.",
          "Three places to its left is the 5th from the left.",
          "The 5th element is R.",
        ],
        answer: "R",
      },
      practiceSet: [
        { prompt: "If the vowels are removed from the word MOUNTAIN, which letter is 2nd from the left?", answer: "N", method: "MOUNTAIN without its vowels is MNTN." },
        { prompt: "How many words in the sentence 'An old owl sat under a tall tree' begin with a vowel?", answer: "5", method: "An, old, owl, under and a." },
        { prompt: "In a row of 15 symbols, which place from the left is the 5th from the right?", answer: "The 11th", method: "15 minus 5 + 1 = 11." },
        { prompt: "Which letter of the word CHAMPION is the same distance from both ends?", answer: "None: CHAMPION has 8 letters, so its middle falls between M and P." },
      ],
      pyqExampleId: "3a2d8643-b9bd-4f60-a87f-cc1c1a3e60dc",
      traps: [
        {
          title: "Starting 'every 2nd word' at the first word",
          body:
            "Every 2nd word is the 2nd, 4th and 6th word. Taking the 1st, 3rd and 5th gives a different set of letters, and SSC usually prints that wrong word among the options.",
        },
        {
          title: "Counting from the wrong end",
          body:
            "A row read from the right starts at its last item. Turn every 'from the right' place into a 'from the left' place with n minus k + 1 before you look anything up.",
        },
      ],
    },
  ],
};
