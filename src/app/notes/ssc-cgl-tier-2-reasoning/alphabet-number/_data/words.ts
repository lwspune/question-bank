import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RAL_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Formation and Digit Order",
  title: "Word Formation and Digit Order",
  oneLineDefinition:
    "Arrange numbered letters into a word, count or check the words a set of letters can make, and find which digits stay put when a number is sorted.",
  whyItMatters:
    "12 questions in the Tier II bank, all EASY. Each is lost only by a slip (a letter used twice, a position miscounted), so a written check is worth the few seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ralwd-word",
      name: "Forming words from letters",
      intuition:
        "Guess the word from the letters first; then turn it into the numbers given. To check whether a word can be made from a longer word, cross off each letter as you use it.",
      definition:
        "- **Numbered letters:** spot the word (TIGER), then write each letter's number in order.\n" +
        "- **Can it be made?** Cross letters off the given word; a letter needed twice must appear twice.\n" +
        "- **How many words?** Try the arrangements that start with likely letters; SSC answers are usually none, one or two.",
      authoredExample: {
        prompt: "G = 1, E = 2, R = 3, T = 4, I = 5. Which arrangement spells a word?",
        steps: ["The letters make TIGER.", "T 4, I 5, G 1, E 2, R 3."],
        answer: "4, 5, 1, 2, 3",
      },
      selfCheckExample: {
        prompt: "Which word cannot be made from the letters of TEACHER? (a) CHEAT (b) REACH (c) TEACH (d) CHAIR",
        steps: ["TEACHER has T, E, A, C, H, E, R.", "CHAIR needs an I, which TEACHER does not have."],
        answer: "(d) CHAIR",
      },
      practiceSet: [
        { prompt: "N = 1, I = 2, E = 3, S = 4, H = 5. Arrange the numbers to make a word.", answer: "4, 5, 2, 1, 3 (SHINE)" },
        { prompt: "Can PRINT be made from the letters of PAINTER?", answer: "Yes: P, R, I, N and T are all in PAINTER" },
        { prompt: "How many meaningful words use all of T, A, P once each?", answer: "Three: TAP, PAT and APT" },
      ],
      pyqExampleId: "f06b043a-17df-49a4-a00c-22b31d1b83b1",
      traps: [
        {
          title: "Using a letter twice",
          body: "A word that needs two E's cannot be made from a word with one E. Cross each letter off as you use it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ralwd-digit",
      name: "Digits that stay in place",
      intuition:
        "Write the number and, under it, its digits sorted (ascending or descending, as asked). Count the places where the digit above equals the digit below.",
      definition:
        "- **Write both lines,** one above the other, digit under digit.\n" +
        "- **Ascending** = smallest on the left; **descending** = largest on the left.\n" +
        "- **Count matches** place by place; do not compare a digit with its neighbour.",
      authoredExample: {
        prompt: "The digits of 42715 are arranged in ascending order. How many digits stay in the same place?",
        steps: ["Original: 4 2 7 1 5. Sorted: 1 2 4 5 7.", "Only the 2 (second place) matches."],
        answer: "One",
      },
      selfCheckExample: {
        prompt: "The digits of 63491 are arranged in ascending order. How many digits stay in the same place?",
        steps: ["Original: 6 3 4 9 1. Sorted: 1 3 4 6 9.", "3 and 4 (second and third places) match."],
        answer: "Two",
      },
      practiceSet: [
        { prompt: "Digits of 3152 in ascending order: how many stay in place?", answer: "None (3152 vs 1235)" },
        { prompt: "Digits of 5321 in descending order: how many stay in place?", answer: "Four (it is already descending)" },
        { prompt: "What does 'ascending order' mean?", answer: "Smallest to largest, left to right" },
      ],
      pyqExampleId: "55414742-4e92-4988-b184-009487ca9cee",
      traps: [
        {
          title: "Sorting in the wrong direction",
          body: "Ascending puts the smallest digit first. Sorting the other way changes which digits match.",
        },
      ],
    },
  ],
};
