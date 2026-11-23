import type { SubtopicNote } from "@/app/notes/_types";

export const MS7_AN_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Word, Number and Letter Pairs",
  title: "Word, Number and Letter Pairs",
  oneLineDefinition:
    "State the link of the first pair exactly (a unit, a two-step digit rule, a letter move), test it on the given pair, and apply it unchanged to the second.",
  whyItMatters:
    "4 of the chapter's 7 questions: 1 EASY, 2 MODERATE and 1 HARD. One word pair (work and its unit), two number pairs (both with two answers accepted in MSCE's key) and one letter pair built from letters whose places add to 26.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms7anpa-words",
      name: "Word pairs: units, tools and places",
      intuition:
        "Class 7 word pairs often test what you learn in science and geography: a quantity and its unit, an instrument and what it measures, a state and its capital. Find the link and the matching fact.",
      definition:
        "- **Quantity and SI unit**: length, metre; mass, kilogram; time, second; force, newton; work and energy, joule; pressure, pascal; power, watt; electric current, ampere.\n" +
        "- **Instrument and what it measures**: thermometer, temperature; barometer, air pressure.\n" +
        "- **Maker and work**: author, book; composer, music.\n" +
        "- Keep the **same direction** as the first pair.",
      authoredExample: {
        prompt: "Length : Metre : : Mass : ?",
        steps: [
          "The metre is the SI unit of length.",
          "The SI unit of mass is the kilogram.",
        ],
        answer: "Kilogram",
      },
      selfCheckExample: {
        prompt: "Thermometer : Temperature : : Barometer : ?",
        steps: ["A thermometer measures temperature; a barometer measures the pressure of the air."],
        answer: "Air pressure",
      },
      practiceSet: [
        { prompt: "Time : Second : : Electric current : ?", answer: "Ampere" },
        { prompt: "Author : Book : : Composer : ?", answer: "Music" },
        { prompt: "Kolkata : West Bengal : : Bhopal : ?", answer: "Madhya Pradesh" },
        { prompt: "Pressure : Pascal : : Power : ?", answer: "Watt" },
      ],
      pyqExampleId: "67126d9c-0b2b-4d13-ba82-a62d106bba6e",
      traps: [
        {
          title: "Picking an older unit",
          body: "Units like the dyne and the erg are old units, not SI units. When the first pair uses an SI unit, answer with an SI unit too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7anpa-numbers",
      name: "Number pairs: two steps on the digits",
      intuition:
        "At Class 7 a number pair often works on the digits in two steps: add them and square the sum, or multiply them and take away their sum. Try a rule on the first pair, then make sure it lands on an option.",
      definition:
        "- Work with the **digits**: their sum, their product, and the difference of the two.\n" +
        "- **Two-step rules**: sum then square; square then minus 1; product then plus or minus the sum.\n" +
        "- **Powers of the whole number**: square, cube, square minus 1, cube minus 1.\n" +
        "- A rule is right only if it fits the first pair **exactly** and gives an **option**.",
      authoredExample: {
        prompt: "23 : 11 : : 45 : ? (choose from 29, 20, 9, 36)",
        steps: [
          "Try product plus sum on 23: \\(2 \\times 3 + (2 + 3) = 6 + 5 = 11\\). It fits.",
          "For 45: \\(4 \\times 5 + (4 + 5) = 20 + 9 = 29\\), which is an option.",
        ],
        answer: "29",
      },
      selfCheckExample: {
        prompt: "5 : 124 : : 6 : ? (choose from 215, 216, 36, 35)",
        steps: ["\\(5^3 - 1 = 125 - 1 = 124\\). For 6: \\(6^3 - 1 = 216 - 1\\)."],
        answer: "215",
      },
      practiceSet: [
        { prompt: "12 : 3 : : 45 : ? (choose from 9, 20, 1, 5)", answer: "9. Add the digits." },
        { prompt: "24 : 8 : : 36 : ? (choose from 18, 9, 15, 27)", answer: "18. Multiply the digits." },
        { prompt: "7 : 48 : : 9 : ? (choose from 80, 81, 72, 90)", answer: "80. Square, then take away 1." },
        { prompt: "36 : 80 : : 25 : ? (choose from 48, 49, 10, 24)", answer: "48. Add the digits (9), square (81), take away 1. For 25: 7, 49, 48." },
      ],
      traps: [
        {
          title: "Trusting a rule that only nearly fits",
          body: "A rule that gives 98 when the pair says 99 is wrong, however close. Look for one that fits exactly.",
        },
        {
          title: "Ignoring a second rule",
          body: "Some pairs fit two rules, and the paper then accepts two answers. Work out both, and if both answers are options, either may be marked right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms7anpa-letters",
      name: "Letter pairs: moves, opposites and reversals",
      intuition:
        "A three-letter group can be moved forward, reversed, or turned into its opposite letters. Write the place numbers of both groups in the first pair and see which of these happened.",
      definition:
        "- **Move**: every letter goes the same number of places, \\(+1\\), \\(+3\\).\n" +
        "- **Reverse**: the letters are read backwards.\n" +
        "- **Opposite letters**: places add up to a fixed number, usually 27 (A and Z). Check the given pair, because a paper may use 26.\n" +
        "- Moves and reversals can **combine**: opposite letters, then read backwards.",
      authoredExample: {
        prompt: "ACE : ZXV : : BDF : ?",
        steps: [
          "A (1) to Z (26), C (3) to X (24), E (5) to V (22): each pair adds to 27, so these are opposite letters.",
          "Opposites of B, D, F: Y (25), W (23), U (21).",
        ],
        answer: "YWU",
      },
      selfCheckExample: {
        prompt: "AB : CD : : MN : ?",
        steps: ["Each letter moves 2 places forward: M to O, N to P."],
        answer: "OP",
      },
      practiceSet: [
        { prompt: "ABC : DEF : : PQR : ?", answer: "STU. Each letter moves 3 places." },
        { prompt: "AZ : BY : : CX : ?", answer: "DW. Each letter moves one step inward from its end." },
        { prompt: "CAT : DBU : : DOG : ?", answer: "EPH. Each letter moves 1 place forward." },
        { prompt: "MAD : DAM : : TOP : ?", answer: "POT. The letters are reversed." },
      ],
      pyqExampleId: "bc1ac0e9-6708-46a1-872a-d60c40a0d7fc",
      traps: [
        {
          title: "Assuming the sum is 27",
          body: "Most opposite-letter pairs add to 27, but a question can use 26. Add the places of the given pair to find the sum it uses.",
        },
        {
          title: "Missing a reversal",
          body: "If the letters were also read backwards, the first letter of the answer comes from the last letter of the question. Track each letter to its new position.",
        },
      ],
    },
  ],
};
