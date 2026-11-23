import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_CL_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word and Number Groups",
  title: "Word and Number Groups",
  oneLineDefinition:
    "Find the one property three terms share (a meaning, a category, a number rule), check it misses exactly one term, and check it against every option.",
  whyItMatters:
    "5 of the chapter's 9 questions: 2 EASY and 3 MODERATE. Two are words (state capitals, and words meaning happy) and three are numbers (prime digit sums, divisible by the digit sum, a square times the next number). MSCE's key accepts two answers for two of the number questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7clwo-meaning",
      name: "Words: meaning and category",
      intuition:
        "At Class 7 the word groups lean on what you know: capitals, planets, words with the same meaning. Name the category of each word, and if all four seem to fit, look for a sharper one.",
      definition:
        "- **Category**: capitals, planets, shapes, sports, tools.\n" +
        "- **Meaning**: three words mean the same (synonyms), or three share a quality.\n" +
        "- **Sharper test** when all fit: capital of a state or just a big city? A planet or a moon?\n" +
        "- In \"find the term that matches\", pick the option that shares the group's exact idea.",
      authoredExample: {
        prompt: "Select the odd term: Bhopal, Patna, Shimla, Indore.",
        steps: [
          "Bhopal (Madhya Pradesh), Patna (Bihar) and Shimla (Himachal Pradesh) are state capitals.",
          "Indore is a big city of Madhya Pradesh but not its capital.",
        ],
        answer: "Indore",
      },
      selfCheckExample: {
        prompt: "Which word matches the group brave, bold, fearless: timid, daring, gentle or careless?",
        steps: ["Brave, bold and fearless all mean not afraid. Daring means the same."],
        answer: "Daring",
      },
      practiceSet: [
        { prompt: "Select the odd term: Mercury, Venus, Moon, Mars.", answer: "Moon. The others are planets; the Moon goes round the Earth." },
        { prompt: "Select the odd term: Square, Rectangle, Circle, Rhombus.", answer: "Circle. The others have four sides." },
        { prompt: "Which word matches the group large, huge, enormous: tiny, vast, narrow or short?", answer: "Vast, which also means very big" },
        { prompt: "Select the odd term: Hockey, Cricket, Chess, Football.", answer: "Chess. It is a board game; the others are played on a field." },
      ],
      pyqExampleId: "7edd592d-d1e3-42b1-8c49-8b2ca4a509bf",
      traps: [
        {
          title: "Confusing a famous city with a capital",
          body: "Many big cities are not capitals. Check the state and its capital before deciding.",
        },
        {
          title: "Choosing a related word, not a matching one",
          body: "Playful and merciful are pleasant words, but the group means full of joy. Match the exact meaning.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7clwo-rules",
      name: "Number rules at Class 7",
      intuition:
        "Class 7 number groups use rules a step deeper than tables: primes, squares and cubes, and the digits' own sum. Test the rules one by one on all four numbers.",
      definition:
        "- **Primes** to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.\n" +
        "- **Squares** to \\(15^2\\): 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225. **Cubes** to \\(10^3\\): 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.\n" +
        "- **Digit sum**: is it prime, the same for all, or does it divide the number?\n" +
        "- **Built numbers**: \\(n \\times (n+1)\\) (2, 6, 12, 20, 30, 42), or \\(n^2 \\times (n+1)\\) (2, 12, 36, 80, 150).\n" +
        "- **Check all four options**: if two numbers break your rule, find another rule.",
      authoredExample: {
        prompt: "Which number matches the group 2431, 5203, 3322: 4321, 5214, 3333 or 7213?",
        steps: [
          "Digit sums of the group: \\(2+4+3+1 = 10\\), \\(5+2+0+3 = 10\\), \\(3+3+2+2 = 10\\).",
          "Options: 4321 gives 10, 5214 gives 12, 3333 gives 12, 7213 gives 13.",
        ],
        answer: "4321",
      },
      selfCheckExample: {
        prompt: "Select the odd term: 121, 169, 225, 250.",
        steps: ["\\(121 = 11^2\\), \\(169 = 13^2\\), \\(225 = 15^2\\). 250 is not a square."],
        answer: "250",
      },
      practiceSet: [
        { prompt: "Select the odd term: 17, 23, 29, 33.", answer: "33. It is \\(3 \\times 11\\); the others are prime." },
        { prompt: "Select the odd term: 8, 27, 64, 100.", answer: "100. The others are cubes: \\(2^3, 3^3, 4^3\\)." },
        { prompt: "Select the odd term: 12, 20, 30, 40.", answer: "40. The others are \\(3 \\times 4\\), \\(4 \\times 5\\), \\(5 \\times 6\\); the next is 42." },
        { prompt: "Which number matches the group 18, 27, 45 (each divides exactly by its digit sum): 36, 39, 46 or 55?", answer: "36. Its digit sum 9 divides it; 39, 46 and 55 fail." },
      ],
      pyqExampleId: "c84f6770-2d49-4088-b051-ce96c670225f",
      traps: [
        {
          title: "Stopping at the first rule",
          body: "A rule may single out one number by chance. If it also leaves another option out, the paper's rule is something else.",
        },
        {
          title: "Calling every odd number prime",
          body: "9, 15, 21, 27, 33 and 39 are odd but not prime. Check for a factor of 3, 5 or 7 before calling a number prime.",
        },
      ],
    },
  ],
};
