import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCD_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Position Values and Sums",
  title: "Position Values and Sums",
  oneLineDefinition:
    "Letters become numbers: each letter is written as its place in the alphabet (from the front or from the back, sometimes changed by a fixed rule), the places are added into one number, or the code depends only on how many letters the word has.",
  whyItMatters:
    "Sixty questions in the bank: thirty-two code each letter as a number, nineteen add the letters into a single number, and nine use only the word's length or a number system. Twenty-seven are MODERATE, more than on any other page of this chapter, because a rule has to be found and then tested on a second example.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrcdva-letters",
      name: "Each letter written as a number",
      intuition:
        "Write the position of every letter of the example word and put those numbers next to the code. Either they are the code, or every one has been changed the same way: counted from Z, increased by a fixed number, doubled, or doubled only for the vowels.",
      definition:
        "- **Forward position:** A = 1 to Z = 26 (anchors E 5, J 10, O 15, T 20, Y 25).\n" +
        "- **Reverse position:** A = 26 to Z = 1. It equals 27 minus the forward position, which is the forward position of the opposite letter: H is 8, so its reverse position is 19 (S).\n" +
        "- **Usual changes:** position plus or minus a fixed number, twice the position, the square of the position, or a change for vowels only or consonants only.\n" +
        "- **Reading a joined code:** one- and two-digit numbers run together (DOLL is 4, 15, 12, 12, written 4151212). Split it from the left using the letters you know, never by guessing.\n" +
        "- **Two different reversals:** the word read **backwards** (TOP as P, O, T gives 161520) is not the same as the **digits** reversed (201516 reversed is 615102). Test both on the example.\n" +
        "- **Fast route:** work out the first and last letters' numbers only; they usually leave one option.",
      formula: {
        label: "Reverse position of a letter",
        latex: "\\text{reverse position} = 27 - \\text{forward position}",
      },
      authoredExample: {
        prompt: "In a certain code language, 'FISH' is written as '21-18-8-19'. How will 'CRAB' be written in that language?",
        steps: [
          "F is 6, but its code is 21; 6 + 21 = 27. I is 9 and 9 + 18 = 27. Each letter is written as its reverse position, 27 minus its forward position.",
          "C: 27 minus 3 = 24. R: 27 minus 18 = 9. A: 27 minus 1 = 26. B: 27 minus 2 = 25.",
        ],
        answer: "24-9-26-25",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'MOON' is written as '15171716'. How will 'STAR' be written in that language?",
        steps: [
          "M, O, O, N are 13, 15, 15, 14. The code reads 15, 17, 17, 16: each position plus 2.",
          "S, T, A, R are 19, 20, 1, 18; plus 2 gives 21, 22, 3, 20.",
        ],
        answer: "2122320",
      },
      practiceSet: [
        { prompt: "What is the reverse alphabet position of the letter H, counting Z as 1?", answer: "19", method: "27 minus 8." },
        { prompt: "In a certain code, each letter is written as its position in the alphabet. How is 'BEEF' written?", answer: "2556" },
        { prompt: "In a certain code, a word is read backwards and each letter is written as its position in the alphabet. How is 'TEA' written?", answer: "1520", method: "A, E, T are 1, 5, 20." },
        { prompt: "In a certain code, each vowel is written as twice its position and each consonant as its position. How is 'CODE' written?", answer: "330410", method: "C 3, O 30, D 4, E 10." },
      ],
      pyqExampleId: "d07d1443-a04c-4bdc-8f03-2fc71c455f51",
      traps: [
        {
          title: "Splitting a joined code the wrong way",
          body:
            "1121 can be read as 1, 1, 2, 1 or 11, 21 or 1, 12, 1. Split the code by the letters you already know; an option that only works with a different split is wrong.",
        },
        {
          title: "Reversing the digits when the letters were reversed",
          body:
            "Writing a word backwards reverses the order of its numbers; reversing the whole digit string also flips each two-digit number (20 becomes 02). The two give different codes, and SSC prints both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdva-sums",
      name: "Adding the letters into one number",
      intuition:
        "When a whole word becomes one number, add its letters' positions and compare the total with the code. The code is the total itself or the total changed by one simple step, and that step has to fit both examples.",
      definition:
        "1. Add the **forward** positions. Compare with the code: equal, total plus a number, total times a number, total times the **number of letters**, or total divided by the number of letters.\n" +
        "2. If nothing fits, add the **reverse** positions and compare again.\n" +
        "3. **Shortcut:** for a word of n letters, reverse sum = 27n minus forward sum. Work out one sum and you have both.\n" +
        "4. Test the step on **both** examples. +10 and times 2 can both fit one word.\n" +
        "5. **Fast route:** look at the options' last digits, or which options are multiples of the letter count; often only one can be right.",
      formula: {
        label: "Reverse sum of a word",
        latex: "\\text{reverse sum} = 27n - \\text{forward sum}",
        symbols: [{ symbol: "\\(n\\)", meaning: "the number of letters in the word" }],
      },
      authoredExample: {
        prompt: "In a certain code language, 'BOX' is coded as '82' and 'CUP' is coded as '80'. How will 'JAR' be coded in that language?",
        steps: [
          "BOX: 2 + 15 + 24 = 41, and 82 is twice 41. CUP: 3 + 21 + 16 = 40, and 80 is twice 40.",
          "JAR: 10 + 1 + 18 = 29, and twice 29 is 58.",
        ],
        answer: "58",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'DOG' is coded as '55' and 'HEN' is coded as '54'. How will 'COW' be coded in that language?",
        steps: [
          "Forward sums: DOG 26, HEN 27. They do not lead to 55 and 54 by one step.",
          "Reverse sums: \\(81 - 26 = 55\\) and \\(81 - 27 = 54\\). They match (three letters, so 27 times 3 = 81).",
          "COW: 3 + 15 + 23 = 41, and \\(81 - 41 = 40\\).",
        ],
        answer: "40",
      },
      practiceSet: [
        { prompt: "What is the sum of the alphabet positions of the letters of 'ACE'?", answer: "9" },
        { prompt: "The forward positions of the letters of a four-letter word add up to 50. What do their reverse positions add up to?", answer: "58", method: "27 times 4 = 108, and 108 minus 50 = 58." },
        { prompt: "In a certain code, a word's code is the sum of its letters' positions times the number of letters. What is the code for 'BAD'?", answer: "21", method: "(2 + 1 + 4) times 3." },
        { prompt: "In a certain code, a word's code is the sum of its letters' positions plus 5. What is the code for 'SUN'?", answer: "59", method: "19 + 21 + 14 = 54." },
      ],
      pyqExampleId: "e00bbf7e-4dd5-43e1-af9f-518c8b50d833",
      traps: [
        {
          title: "Trusting a step that fits one example",
          body:
            "A total of 40 coded as 80 fits both 'times 2' and 'plus 40'. Only the second example decides, so never skip it.",
        },
        {
          title: "Counting a repeated letter once",
          body:
            "In a word such as 'GRASS' both S's are added. Dropping the second one is the most common slip in these sums, and its total is often printed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdva-length",
      name: "Codes from the number of letters, and number systems",
      intuition:
        "If two words with quite different letters get codes like 16 and 25, count their letters before adding anything: 4 and 5. A code that is a perfect square or cube, or a neat multiple, is often about length alone.",
      definition:
        "- **Count the letters, n.** Try n squared, n cubed, 2n, 7n, n minus 1. A square (16, 25, 36) or a cube (27, 64, 125) is a strong hint.\n" +
        "- If two words of the **same length** but different letters have the **same code**, the letters do not matter.\n" +
        "- **Two-sign number systems** are binary: one sign stands for 0, the other for 1. Write the number as a sum of 64, 32, 16, 8, 4, 2, 1 and put 1 for each value used, 0 for each one skipped.\n" +
        "- **Remainder codes:** a number coded by its remainders on division by 3, 7 and 11. A number leaving the same remainder r on all three is r more than a multiple of 3 times 7 times 11, which is 231.",
      formula: {
        label: "Binary place values",
        latex: "64 \\quad 32 \\quad 16 \\quad 8 \\quad 4 \\quad 2 \\quad 1",
      },
      authoredExample: {
        prompt: "In a certain code language, 'TREE' is coded as '64' and 'BRANCH' is coded as '216'. How will 'PLANT' be coded in that language?",
        steps: [
          "TREE has 4 letters, and 64 is 4 cubed. BRANCH has 6 letters, and 216 is 6 cubed.",
          "PLANT has 5 letters; 5 cubed is 125.",
        ],
        answer: "125",
      },
      selfCheckExample: {
        prompt: "In a number system, 0 is written as # and 1 as @, and numbers are written as in binary (2 is @#, 3 is @@). How is 13 written?",
        steps: [
          "13 = 8 + 4 + 1. Of the values 8, 4, 2, 1 it uses 8, 4 and 1: binary 1101.",
          "Write @ for 1 and # for 0.",
        ],
        answer: "@@#@",
      },
      practiceSet: [
        { prompt: "In a certain code language, 'SKY' is coded as 9 and 'CLOUD' is coded as 25. How will 'RAIN' be coded in that language?", answer: "16", method: "The code is the square of the number of letters." },
        { prompt: "In a certain code, a word's code is its number of letters times 7. What is the code for 'WINTER'?", answer: "42" },
        { prompt: "What is 22 written in binary?", answer: "10110", method: "22 = 16 + 4 + 2." },
        { prompt: "Which number does the binary code 100101 stand for?", answer: "37", method: "32 + 4 + 1." },
      ],
      pyqExampleId: "0d71c810-4a86-4511-80fd-ed299a168c09",
      traps: [
        {
          title: "Adding letters when only the length matters",
          body:
            "Before summing positions, check whether the codes simply follow the word lengths. A 5-letter and an 8-letter word coded 15 and 24 need no letter values at all: 5 and 8 times 3.",
        },
        {
          title: "Dropping the zeros in binary",
          body:
            "41 = 32 + 8 + 1, which is 101001: six places, with a 0 for 16, 4 and 2. Writing only the 1s (111) or skipping a 0 gives a different number.",
        },
      ],
    },
  ],
};
