import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_CD_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Number Codes",
  title: "Number Codes",
  oneLineDefinition:
    "Find the rule that turns each given number or word into its code, check it on every example, then use it on the new one.",
  whyItMatters:
    "2 of the chapter's 5 questions: 1 MODERATE and 1 HARD. One codes a number by a sum made from its digits; the hard one gives words that share a part, and shared parts share a digit.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4cdnu-rule",
      name: "Digit rules",
      intuition:
        "A number code is a sum hidden in the digits. Try the simple ones first: add the digits, multiply them, take one from the other. A rule only counts when it works for every example given.",
      definition:
        "- Try in order: **sum of the digits**, **product of the digits**, **difference of the digits**.\n" +
        "- For three digits, try mixing: **first times last, plus the middle**.\n" +
        "- **Check the rule on every example**, not just the first.\n" +
        "- Then use it on the new number.",
      authoredExample: {
        prompt: "In a code, 23 = 5, 41 = 5 and 72 = 9. What is 36?",
        steps: [
          "Add the digits: 2 + 3 = 5, 4 + 1 = 5, 7 + 2 = 9. The rule works every time.",
          "For 36: 3 + 6 = 9.",
        ],
        answer: "9",
      },
      selfCheckExample: {
        prompt: "In a code, 24 = 8, 33 = 9 and 52 = 10. What is 43?",
        steps: ["Multiply the digits: 2 × 4 = 8, 3 × 3 = 9, 5 × 2 = 10. For 43: 4 × 3 = 12."],
        answer: "12",
      },
      practiceSet: [
        { prompt: "In a code, 123 = 6 and 451 = 10. What is 333?", answer: "9. Add the digits." },
        { prompt: "In a code, 25 = 10 and 34 = 12. What is 62?", answer: "12. Multiply the digits." },
        { prompt: "In a code, 52 = 3, 94 = 5 and 71 = 6. What is 83?", answer: "5. Take the second digit from the first." },
        { prompt: "In a code, 213 = 7 and 412 = 9. What is 315?", answer: "16. First digit times last digit, plus the middle digit: 3 × 5 + 1." },
      ],
      pyqExampleId: "7b14dce5-b1bb-4b96-9620-db09bbda14b6",
      traps: [
        {
          title: "Checking only one example",
          body: "Many rules fit one example. A rule is right only when it fits all of them.",
        },
        {
          title: "Picking an option that just reuses the digits",
          body: "An option made from the question's own digits can look right without following the rule. Work out the answer first, then find it among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4cdnu-parts",
      name: "Shared parts, shared digits",
      intuition:
        "When two words share a part, their codes share a digit. Match each shared part to its shared digit, and the rest of each code belongs to the rest of the word.",
      definition:
        "- Find the **part that repeats** in the words (\"Raj\" in Rajpur and Maharaj).\n" +
        "- Find the **digit that repeats** in their codes: it stands for that part.\n" +
        "- The **leftover digit** of each code stands for the leftover part of its word.\n" +
        "- Build the new word from its parts and put their digits together.",
      authoredExample: {
        prompt: "In a code, 'sun rise' is 4 7 and 'sun set' is 7 2. What is the code for 'rise'?",
        steps: [
          "'sun' is in both, and 7 is in both codes, so sun is 7.",
          "Then 'rise' is the other digit of 4 7.",
        ],
        answer: "4",
      },
      selfCheckExample: {
        prompt: "In a code, 'big cat' is 1 5 and 'big dog' is 3 5. What digit stands for 'dog'?",
        steps: ["'big' is in both and 5 is in both, so big is 5 and dog is 3."],
        answer: "3",
      },
      practiceSet: [
        { prompt: "In a code, 'red ball' is 9 4 and 'red cap' is 9 6. What is the code for 'cap'?", answer: "6" },
        { prompt: "In a code, Sunday is 38 and Monday is 58. Which digit stands for 'day'?", answer: "8" },
        { prompt: "In a code, 'pink rose' is 7 2 and 'pink lily' is 7 5. Which two digits make the code for 'rose lily'?", answer: "2 and 5" },
        { prompt: "In a code, Goldfish is 46 and Goldmine is 49. Which digit stands for 'fish'?", answer: "6. Gold is 4, the shared digit." },
      ],
      pyqExampleId: "cf460fe4-08b1-40aa-9c98-fbe66736a236",
      traps: [
        {
          title: "Matching by position",
          body: "The digits may not be in the same order as the word parts. Match the part to the digit by what they share, not by where they sit.",
        },
      ],
    },
  ],
};
