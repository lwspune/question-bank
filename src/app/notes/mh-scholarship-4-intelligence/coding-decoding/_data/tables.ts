import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_CD_TABLES_NOTE: SubtopicNote = {
  subtopicName: "Code Tables and Swapped Names",
  title: "Code Tables and Swapped Names",
  oneLineDefinition:
    "With a code table, change each letter or sign one at a time; with swapped names, find the real answer first and then say its new name.",
  whyItMatters:
    "3 of the chapter's 5 questions: 2 EASY and 1 MODERATE. Two read a table of signs for letters (one asks you to first think of the young one of a sheep), and one swaps fruit names.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4cdta-table",
      name: "Reading a code table",
      intuition:
        "A code table is a key: each letter has its own sign. To read a coded word, look up each sign and write its letter. To write a word in code, do the opposite.",
      definition:
        "- **Decoding** (signs to word): look up the signs one by one, **left to right**.\n" +
        "- **Coding** (word to signs): spell the word first, then change each letter.\n" +
        "- If the question names the word in a riddle (\"the young one of a sheep\"), **find the word first**.\n" +
        "- Check the **first and last signs** of each option: they rule out most wrong options quickly.",
      authoredExample: {
        prompt: "In a code, C = ■, A = ◆, T = ✚, D = ★, O = ●, G = ▲. Which word is ■◆✚?",
        steps: [
          "■ is C, ◆ is A, ✚ is T.",
          "Read them in order: C, A, T.",
        ],
        answer: "CAT",
      },
      selfCheckExample: {
        prompt: "In a code, D = ★, O = ●, G = ▲. Write DOG in this code.",
        steps: ["D is ★, O is ●, G is ▲."],
        answer: "★●▲",
      },
      practiceSet: [
        { prompt: "In a code, R = 5, U = 2, N = 3. Which word does 5 2 3 stand for?", answer: "RUN" },
        { prompt: "In a code, B = #, A = @, T = %. Write BAT in this code.", answer: "#@%" },
        { prompt: "In a code, M = 1, A = 2, P = 3. Which word is written 1 2 3?", answer: "MAP" },
        { prompt: "In a code, H = 1, E = 2, N = 3. How is the word for a female chicken written?", answer: "1 2 3, for HEN" },
      ],
      pyqExampleId: "6b97306b-57c0-425c-a1ab-fc915203fa76",
      traps: [
        {
          title: "Reading the signs out of order",
          body: "The signs follow the letters from left to right. Write each letter down as you find it, then read the word.",
        },
        {
          title: "Spelling the riddle word wrong",
          body: "The young one of a sheep is a LAMB. Get the word right before you change any letter into a sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4cdta-swap",
      name: "Swapped names",
      intuition:
        "In these questions things get new names. The question asks about the real world, so first answer it in real life, then give that answer's new name.",
      definition:
        "- Step 1: answer the question **in real life**: what does Nagpur grow? Oranges.\n" +
        "- Step 2: find what that thing **is called** in the question: orange is called banana.\n" +
        "- Rename **only once**: do not follow the chain further.",
      authoredExample: {
        prompt: "Red is called blue, blue is called green, and green is called yellow. What is the colour of grass?",
        steps: [
          "In real life grass is green.",
          "Here green is called yellow.",
        ],
        answer: "Yellow",
      },
      selfCheckExample: {
        prompt: "Sky is called sea, sea is called land, and land is called air. Where do fish live?",
        steps: ["Fish live in the sea, and the sea is called land."],
        answer: "Land",
      },
      practiceSet: [
        { prompt: "Pen is called pencil, pencil is called book, and book is called bag. What do we read?", answer: "Bag. We read a book, and a book is called bag." },
        { prompt: "Cow is called horse, horse is called goat, and goat is called dog. Which animal runs in a horse race?", answer: "Goat. A horse runs in the race, and a horse is called goat." },
        { prompt: "Water is called milk, milk is called tea, and tea is called juice. What do we drink when we are thirsty?", answer: "Milk. We drink water, and water is called milk." },
        { prompt: "Monday is called Tuesday and Tuesday is called Wednesday. Which day comes after Sunday?", answer: "Tuesday. Monday comes after Sunday, and Monday is called Tuesday." },
      ],
      pyqExampleId: "df1a4ffb-c5e7-4b61-b14e-968381cd05b5",
      traps: [
        {
          title: "Giving the real name",
          body: "The real answer is the first step, not the last. Always change it into its new name.",
        },
        {
          title: "Renaming twice",
          body: "If water is called milk and milk is called tea, water is still just milk. Rename once and stop.",
        },
      ],
    },
  ],
};
