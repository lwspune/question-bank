import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RCD_CODES_NOTE: SubtopicNote = {
  subtopicName: "Letter, Number and Word Codes",
  title: "Letter, Number and Word Codes",
  oneLineDefinition:
    "Find the rule that turns a word into its code (a shift of letters, a number from letter positions, or a shared code word) and apply it to a new word.",
  whyItMatters:
    "17 questions in the Tier II bank, 12 EASY and 5 MODERATE. The MODERATE ones are number codes, where the rule is a sum or a step pattern you must test on both examples.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rcdco-letter",
      name: "Letter shifts and swaps",
      intuition:
        "Compare each letter of the word with the letter under it in the code. The shift may be the same for every letter (+1), alternate (+1, +2), or the letters may be swapped in pairs or reversed.",
      definition:
        "- **Steady shift:** every letter moves the same number of places.\n" +
        "- **Alternating shift:** +1, +2, +1, +2 or +1, −1.\n" +
        "- **Swapped pairs:** COMPUTER becomes OC PM TU RE: each pair of letters is reversed.\n" +
        "- **Reversed word,** then shifted: check by writing the word backwards.\n" +
        "- **Check on both given examples** before applying the rule.",
      authoredExample: {
        prompt: "In a code, GAME is written HBNF. How is SHIP written?",
        steps: ["G to H, A to B, M to N, E to F: every letter +1.", "S + 1 = T, H + 1 = I, I + 1 = J, P + 1 = Q."],
        answer: "TIJQ",
      },
      selfCheckExample: {
        prompt: "In a code, CAT is written FDW. How is DOG written?",
        steps: ["C to F, A to D, T to W: +3 each.", "D + 3 = G, O + 3 = R, G + 3 = J."],
        answer: "GRJ",
      },
      practiceSet: [
        { prompt: "If BOOK is written CQPM (+1, +2, +1, +2), how is DESK written?", answer: "EGTM" },
        { prompt: "If PAPER is written REPAP, what is the rule?", answer: "The word is reversed" },
        { prompt: "If MANGO is written AMGNO (pairs swapped), how is LEMON written?", answer: "ELOMN" },
      ],
      pyqExampleId: "c878c5a4-0218-419b-b85f-264e3bcd7b7b",
      traps: [
        {
          title: "Checking the rule on one example only",
          body: "A +1 shift may fit the first word and fail the second. A rule is right only if it turns both given words into their codes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rcdco-number",
      name: "Number codes from letter positions",
      intuition:
        "When a word becomes a number or a string of numbers, the numbers almost always come from alphabet positions: each letter's position shifted, or the positions added up.",
      definition:
        "- **Letter by letter:** each code number is the letter's position, sometimes +1 or with a repeating step (+1, +1, +2).\n" +
        "- **One total:** the code is the sum of the positions, sometimes with a fixed amount added or a multiple taken.\n" +
        "- **Test on both examples:** a sum rule must give both totals.\n" +
        "- **Positions to know:** E 5, J 10, O 15, T 20, Z 26.",
      formula: { label: "Sum of positions", latex: "\\text{code} = \\sum \\text{position}(\\text{letter})" },
      authoredExample: {
        prompt: "If BAT is coded 23 (B 2 + A 1 + T 20), what is the code for CAP?",
        steps: ["The code is the sum of the positions.", "C 3 + A 1 + P 16 = 20."],
        answer: "20",
      },
      selfCheckExample: {
        prompt: "In a code, DEAF is written 4-5-1-6. How is BEAD written?",
        steps: ["Each number is the letter's position.", "B 2, E 5, A 1, D 4."],
        answer: "2-5-1-4",
      },
      practiceSet: [
        { prompt: "If CAB is coded 4-2-3 (each position + 1), how is DIG coded?", answer: "5-10-8" },
        { prompt: "If ACE is coded 9 (sum of positions), what is BAD?", answer: "7" },
        { prompt: "What is the position of the letter W?", answer: "23" },
      ],
      pyqExampleId: "29d1ec68-a0e1-4a94-9f3e-03db381db95e",
      traps: [
        {
          title: "Missing a step pattern inside the code",
          body: "If DOOR is 5-16-17-19, the shifts are +1, +1, +2, +1, not a steady +1. Write the shift under every letter before applying it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rcdco-common",
      name: "Codes found from what two words share",
      visualizationSlug: "ssc-t2-shared-code",
      intuition:
        "When two coded sentences or words share exactly one word or letter, the code they share belongs to it. No arithmetic is needed: just match what is common.",
      definition:
        "- **Sentences:** the word in both sentences takes the code in both codes.\n" +
        "- **Words coded digit by digit** (CARD = 7359): a letter in both words takes the digit in both codes.\n" +
        "- **Matrix codes:** each letter is given by its row number then its column number; pick the option whose every pair points to the right letter.",
      authoredExample: {
        prompt: "'red apple sweet' is 'la pi to' and 'sweet mango' is 'to ru'. What is the code for 'sweet'?",
        steps: ["'sweet' is the only word in both sentences.", "'to' is the only code in both."],
        answer: "to",
      },
      selfCheckExample: {
        prompt: "In a code, LAMP is 5926 and PALM is 6952. What is the code for M?",
        steps: ["Match each letter to its digit in LAMP: L 5, A 9, M 2, P 6.", "Check in PALM: P 6, A 9, L 5, M 2."],
        answer: "2",
      },
      practiceSet: [
        { prompt: "'go home now' is 'ka ri so' and 'come home' is 'ri pu'. What is the code for 'home'?", answer: "ri" },
        { prompt: "TEA is 384 and EAR is 849 (letter by letter). What is the code for R?", answer: "9" },
        { prompt: "In a matrix code, a letter is written as row then column. What does 32 point to?", answer: "The letter in row 3, column 2" },
      ],
      pyqExampleId: "b631bbcf-41d6-40d9-9443-a8e51156a8e7",
      traps: [
        {
          title: "Assuming the codes keep the word order",
          body: "Codes are usually jumbled: the first word need not have the first code. Match by what is shared, not by position.",
        },
      ],
    },
  ],
};
