import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCD_SYMBOLS_NOTE: SubtopicNote = {
  subtopicName: "Number and Symbol Coding",
  title: "Number and Symbol Coding",
  oneLineDefinition:
    "Each letter has its own digit or symbol: either the code keeps the letters' order and can be read off like a table, or the code is shuffled and one letter's sign is found from what two words share.",
  whyItMatters:
    "Thirty questions in the bank, twenty-eight of them EASY. Twenty give two words with shuffled codes and ask for the digit of a letter only one word has; the ten from the 2025 shifts give a code table, often in Greek letters or symbols, and ask for a word read through it. Both take seconds once the method is fixed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrcdsy-lookup",
      name: "Reading a code off letter by letter",
      intuition:
        "When every letter keeps its own sign in every word and the code follows the letters in order, the examples are a dictionary. Build the small key from them and read the new word through it; no rule has to be found.",
      definition:
        "1. Write each example word above its code, one letter over one sign.\n" +
        "2. Make the key: one line per letter (S = 8, P = 3, ...).\n" +
        "3. **Check the repeats:** a letter that appears twice must have the same sign both times. If it does, the code is letter by letter.\n" +
        "4. Read the asked word through the key, letter by letter. The same works backwards: a code of signs is turned into letters with the key.\n" +
        "5. If the examples disagree letter by letter (A is 2 in one and @ in the other), the code is shuffled: use the common-letter method below.\n" +
        "6. **Fast route:** decode only the places where the options differ.",
      authoredExample: {
        prompt: "In a certain code language, each letter is written as one digit. 'MILK' is written as '3925' and 'SALT' is written as '6724'. How will 'SILK' be written in that language?",
        steps: [
          "From MILK: M = 3, I = 9, L = 2, K = 5. From SALT: S = 6, A = 7, L = 2, T = 4.",
          "L is 2 in both words, so the code keeps the letters in order.",
          "SILK: S = 6, I = 9, L = 2, K = 5.",
        ],
        answer: "6925",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'NOTE' is written as '#@%&' and 'DOT' is written as '!@%'. How will 'TONED' be written in that language?",
        steps: [
          "From NOTE: N = #, O = @, T = %, E = &. From DOT: D = !, and O and T agree.",
          "TONED: T = %, O = @, N = #, E = &, D = !.",
        ],
        answer: "%@#&!",
      },
      practiceSet: [
        { prompt: "In a certain code language, 'CAB' is written as '914' and 'BAD' is written as '416'. What is the code for 'D'?", answer: "6" },
        { prompt: "In a certain code language, 'TEN' is written as '#@%' and 'NET' is written as '%@#'. How will 'TENT' be written?", answer: "#@%#" },
        { prompt: "In a certain code, x is written as c, y as b and z as a. How is 'zyx' written?", answer: "abc" },
        { prompt: "In a certain code, 1 stands for D, 2 for O and 3 for G. Which word do the numbers 3, 2, 1 stand for?", answer: "GOD" },
      ],
      pyqExampleId: "836b2eeb-c5be-4f53-9f60-41463861d2ba",
      traps: [
        {
          title: "Assuming the code is in letter order",
          body:
            "Check one example against the other first. If a shared letter gets a different sign in each, the order is mixed, and reading the code off letter by letter gives a wrong answer.",
        },
        {
          title: "Ignoring a repeated letter",
          body:
            "A letter that appears twice in the asked word must show the same sign twice in the answer. An option with two different signs at those places can be struck out at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdsy-common",
      name: "One letter left over: matching the common letters",
      intuition:
        "Here the codes are shuffled, so you cannot tell which digit belongs to which letter. But the letters shared by the two words must take the digits shared by the two codes, so whatever is left over in a word pairs with whatever is left over in its code.",
      definition:
        "1. List the letters that are in **both** words, and the digits that are in **both** codes. They belong together, in an order you cannot know.\n" +
        "2. The letter left over in a word takes the digit left over in its code.\n" +
        "3. Only a leftover letter can be fixed. A letter shared by both words could have any of the shared digits.\n" +
        "4. The same works with symbols such as & and @.\n" +
        "5. **Fast route:** in the code of the word that holds the asked letter, cross out every digit that also appears in the other code. The one digit left is the answer.",
      authoredExample: {
        prompt: "In a certain code language, 'MILD' is written as '4718' and 'LIMB' is written as '1834'. What is the code for 'D' in that language?",
        steps: [
          "Both words have M, I and L. Both codes have 4, 1 and 8. So M, I and L take 4, 1 and 8 in some order.",
          "MILD's leftover letter is D, and 4718's leftover digit is 7.",
          "(LIMB's leftover letter B takes the leftover 3.)",
        ],
        answer: "7",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'PINK' is written as '5269' and 'WINK' is written as '9682'. What is the code for 'W' in that language?",
        steps: [
          "Shared letters I, N, K; shared digits 2, 6, 9.",
          "In 9682, cross out 9, 6 and 2: 8 is left, so W is 8.",
        ],
        answer: "8",
      },
      practiceSet: [
        { prompt: "In a certain code language, 'RAT' is written as '357' and 'TAN' is written as '583'. What is the code for 'N'?", answer: "8" },
        { prompt: "In a certain code language, 'BEAR' is written as '2916' and 'BEAD' is written as '6194'. What is the code for 'R'?", answer: "2" },
        { prompt: "In a certain code language, 'COLD' is written as '&%#@' and 'GOLD' is written as '#@!%'. What is the code for 'G'?", answer: "!" },
        { prompt: "Two four-letter words share three letters, and their shuffled codes share three digits. Which digit belongs to the fourth letter of the first word?", answer: "The digit of the first code that is not in the second code." },
      ],
      pyqExampleId: "95091762-b66d-4302-8dec-f023fc3de8f5",
      traps: [
        {
          title: "Giving a shared letter one digit",
          body:
            "A letter found in both words could be any of the shared digits; the two words alone cannot separate them. If the question asks for a shared letter, look for 'cannot be determined' among the options.",
        },
        {
          title: "Reading a shuffled code in letter order",
          body:
            "In these questions the first digit is not the code of the first letter: the order is mixed on purpose. Pair the letters by what the two words share, not by place.",
        },
      ],
    },
  ],
};
