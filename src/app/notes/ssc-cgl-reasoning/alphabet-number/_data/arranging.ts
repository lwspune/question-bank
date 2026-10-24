import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAL_ARRANGING_NOTE: SubtopicNote = {
  subtopicName: "Arranging Letters and Digits",
  title: "Arranging Letters and Digits",
  oneLineDefinition:
    "A word's letters, or a number's digits, are put in order, and the question asks how many keep their place or how far apart two of the new places are.",
  whyItMatters:
    "Fifty-five questions in the bank, the biggest page of the chapter: 36 from the 2024 shifts and 19 from the 2025 shifts, with 44 EASY and 11 MODERATE. Every one is solved by writing the sorted row under the original once, so the marks go to students who sort carefully and keep repeated letters.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscralar-unchanged",
      name: "Letters that keep their place after sorting",
      intuition:
        "Write the word, write its letters in alphabetical order directly underneath, and read down the columns. A letter that sits on top of itself has kept its place. The whole question is one careful sort and one careful comparison.",
      definition:
        "1. Write the word in capitals with a little space between the letters.\n" +
        "2. Under it, write the same letters in alphabetical order. Keep every repeat: DEVELOP has two Es, so the sorted row has two Es.\n" +
        "3. Compare column by column and count the columns where the top and bottom letters match.\n" +
        "4. 'How many change' is the word's length minus the number that stay.\n" +
        "- **Fast route:** a letter keeps its place only if exactly the right number of letters come before it in the alphabet. The 1st letter stays only if it is the earliest letter of the word; the last stays only if it is the latest. Checking the two ends first often settles the count.",
      authoredExample: {
        prompt: "How many letters keep their place when the letters of the word CANDLE are arranged in alphabetical order?",
        steps: [
          "CANDLE in alphabetical order is A C D E L N.",
          "Column by column: C/A, A/C, N/D, D/E, L/L, E/N.",
          "Only L, in the 5th place, matches.",
        ],
        answer: "One",
      },
      selfCheckExample: {
        prompt: "How many letters change their place when the letters of the word FORMAT are arranged in alphabetical order?",
        steps: [
          "FORMAT in alphabetical order is A F M O R T.",
          "Column by column: F/A, O/F, R/M, M/O, A/R, T/T. Only T stays.",
          "Six letters minus one that stays: five change.",
        ],
        answer: "Five",
      },
      practiceSet: [
        { prompt: "How many letters keep their place when the letters of the word BELOW are arranged in alphabetical order?", answer: "All five", method: "B, E, L, O, W are already in alphabetical order." },
        { prompt: "How many letters keep their place when the letters of the word GARDEN are arranged in alphabetical order?", answer: "None", method: "Sorted: A D E G N R. No column matches." },
        { prompt: "How many letters keep their place when the letters of the word PENCIL are arranged in alphabetical order?", answer: "One (E)", method: "Sorted: C E I L N P. Only the 2nd column, E, matches." },
        { prompt: "A word's first letter is R and the word also contains the letter B. Can R keep its place after the letters are arranged in alphabetical order?", answer: "No. B comes before R, so the sorted row cannot start with R." },
      ],
      pyqExampleId: "84c2f1e4-0c69-4ca0-86c2-64736312c5b6",
      traps: [
        {
          title: "Dropping a repeated letter",
          body:
            "TOMATO has two Ts and two Os, so its sorted row A M O O T T has six letters. Writing one O shortens the row, shifts every later letter one place left and changes the count.",
        },
        {
          title: "Answering 'unchanged' when the stem asks 'change'",
          body:
            "Most of these questions ask how many letters stay, but some ask how many change. Read the verb last, after the count, and subtract from the word's length if it asks for the changes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralar-between",
      name: "Sorting, then counting the letters between two picks",
      intuition:
        "Here the sort is only the first step. You then pick two letters of the sorted row by their places and count how many letters of the alphabet lie between them. It joins this page's sort to the gap rule of the first page.",
      definition:
        "1. Sort the letters into alphabetical order, keeping repeats.\n" +
        "2. Number the sorted row from the left. In a row of n letters, the kth from the right is the (n minus k + 1)th from the left.\n" +
        "3. Read off the two letters asked for.\n" +
        "4. Turn both into alphabet positions and count the letters between them: the difference minus 1.\n" +
        "- **Fast route:** you need only the two picked letters. The 2nd from the left is the 2nd earliest letter of the word, so you can often find it without writing the full row. This breaks when the word has repeats near the picked place: then write the row.",
      authoredExample: {
        prompt:
          "The letters of the word GLIMPSE are arranged in alphabetical order. How many letters of the alphabet lie between the 2nd letter from the left and the 3rd letter from the right of the new cluster?",
        steps: [
          "Sorted: E G I L M P S.",
          "2nd from the left is G. With 7 letters, the 3rd from the right is the 5th from the left, M.",
          "G is 7 and M is 13: 13 minus 7 minus 1 = 5.",
        ],
        answer: "5",
      },
      selfCheckExample: {
        prompt:
          "The letters of the word BUTTER are arranged in alphabetical order. How many letters of the alphabet lie between the 1st letter from the left and the 2nd letter from the right of the new cluster?",
        steps: [
          "Sorted, keeping both Ts: B E R T T U.",
          "1st from the left is B; 2nd from the right is T.",
          "B is 2 and T is 20: 20 minus 2 minus 1 = 17.",
        ],
        answer: "17",
      },
      practiceSet: [
        { prompt: "The letters of the word HOUSE are arranged in alphabetical order. Which letter is 3rd from the left?", answer: "O", method: "Sorted: E H O S U." },
        { prompt: "How many letters of the alphabet lie between E and N?", answer: "8", method: "14 minus 5 minus 1 = 8." },
        { prompt: "In a cluster of 7 letters, which place from the left is the 3rd letter from the right?", answer: "The 5th" },
        { prompt: "The letters of the word CANDY are arranged in alphabetical order. How many letters of the alphabet lie between the 2nd and the 4th letters from the left?", answer: "10", method: "Sorted: A C D N Y. C is 3 and N is 14." },
      ],
      pyqExampleId: "7b48875b-2beb-46dd-bc91-aa91ba34cccc",
      traps: [
        {
          title: "Mixing places in the cluster with places in the alphabet",
          body:
            "The 4th letter of the sorted cluster is not the 4th letter of the alphabet. First find which letter stands in that place, then look up that letter's own alphabet number.",
        },
        {
          title: "Counting the gap with both ends",
          body:
            "Between G and M there are five letters, H to L. Subtracting the positions gives 6; the letters strictly between are one fewer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscralar-digits",
      name: "Digit tests: arranging, summing and checking numbers",
      intuition:
        "The same tests come with digits in place of letters: put the digits of a number in order and read places, change digits by a rule, or check a number against a stated property. A few digit facts make most of these one-line questions.",
      definition:
        "- **Arranging digits:** write the digits in ascending or descending order, keeping repeats, then read the places as you would for letters.\n" +
        "- **A rule on each digit** (add 1 to every even digit, take 1 from every odd one): change every digit first, then arrange. Doing it the other way round gives a different row.\n" +
        "- **Digit facts:** 0 + 1 + ... + 9 = 45. Any product that includes 0 is 0.\n" +
        "- **Digital root:** add the digits, and keep adding until one digit is left. It equals the remainder when the number is divided by 9, with 9 in place of 0.\n" +
        "- **Palindrome:** a number that reads the same backwards, such as 345543.\n" +
        "- **Odd one out by a rule:** test each option against the rule; the one that fails is the answer.",
      formula: {
        label: "Digit facts",
        latex: "0 + 1 + 2 + \\cdots + 9 = 45 \\qquad \\text{digital root of } N = \\text{remainder of } N \\div 9 \\ (\\text{or } 9)",
      },
      authoredExample: {
        prompt:
          "The digits of 5281947 are arranged in ascending order. What is the sum of the 2nd digit from the left and the 3rd digit from the right?",
        steps: [
          "Ascending order: 1 2 4 5 7 8 9.",
          "2nd from the left is 2. With 7 digits, the 3rd from the right is the 5th from the left, 7.",
          "Sum: 2 + 7 = 9.",
        ],
        answer: "9",
      },
      selfCheckExample: {
        prompt: "What is the digital root of 47268?",
        steps: ["4 + 7 + 2 + 6 + 8 = 27.", "2 + 7 = 9, a single digit."],
        answer: "9",
      },
      practiceSet: [
        { prompt: "Which of 2442, 3553, 4664 and 5764 is not a palindrome?", answer: "5764", method: "5764 read backwards is 4675." },
        { prompt: "What is the sum of the digits 1 to 9?", answer: "45" },
        { prompt: "Each odd digit of 3816 is increased by 1. What is the new number?", answer: "4826", method: "3 becomes 4 and 1 becomes 2; 8 and 6 are even and stay." },
        { prompt: "What remainder does 7254 leave on division by 9?", answer: "0", method: "7 + 2 + 5 + 4 = 18, and 18 is a multiple of 9." },
      ],
      pyqExampleId: "a1b561f2-e731-4475-83f6-ab1cf95fd662",
      traps: [
        {
          title: "Arranging before changing the digits",
          body:
            "When a question changes each digit and then arranges them, change first. Sorting first and then changing gives a row that is no longer in order, and its places are wrong.",
        },
        {
          title: "Reading 'last five from the right' as the five largest",
          body:
            "In a row arranged in descending order, the digits at the right end are the smallest ones. Write the row out and point at the end the question names before you add.",
        },
      ],
    },
  ],
};
