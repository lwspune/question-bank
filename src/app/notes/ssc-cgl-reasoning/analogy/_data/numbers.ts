import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAN_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Number Analogy",
  title: "Number Analogy",
  oneLineDefinition:
    "A number analogy joins two numbers by a rule and asks you to use the same rule on a third. On this page the rule is one or two plain steps: multiply or divide, add or take away, or multiply and then add.",
  whyItMatters:
    "Fifty-nine questions in the bank, forty-eight EASY and eleven MODERATE, forty-three of them from the 2024 shifts. They reward a fixed order of checks: the ratio, then the difference, then a two-step rule. Squares and cubes come on the last page of this chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrannm-multiply",
      name: "Multiply or divide by one number",
      intuition:
        "Divide the larger number of each pair by the smaller. If both pairs give the same answer, that number is the rule, and the missing term is one multiplication or division away.",
      definition:
        "- Divide the second number by the first (or the first by the second if the second is smaller).\n" +
        "- If both pairs give the same whole number or simple fraction, use it on the third number.\n" +
        "- A pair can also be a ratio: 39 and 65 are both 13 times something, 3 and 5. The answer pair must be in the same ratio.\n" +
        "- **Fast route:** divisibility tests. A number is divisible by 3 or 9 when its digit sum is, and by 4 when its last two digits are. You may use digits to TEST divisibility even when the printed note forbids building the rule from digits.",
      formula: {
        label: "One multiplier",
        latex: "\\text{second} = k \\times \\text{first}",
        symbols: [{ symbol: "k", meaning: "the same multiplier in every pair (it may be a fraction)" }],
      },
      authoredExample: {
        prompt: "23 : 161 :: 34 : ?",
        steps: [
          "\\(161 \\div 23 = 7\\), so the second number is 7 times the first.",
          "\\(34 \\times 7 = 238\\).",
        ],
        answer: "238",
      },
      selfCheckExample: {
        prompt: "360 : 40 :: 252 : ?",
        steps: [
          "\\(360 \\div 40 = 9\\): the second number is the first divided by 9.",
          "\\(252 \\div 9 = 28\\). Check: \\(28 \\times 9 = 252\\).",
        ],
        answer: "28",
      },
      practiceSet: [
        { prompt: "15 : 60 :: 27 : ?", answer: "108", method: "Multiply by 4." },
        { prompt: "96 : 12 :: 136 : ?", answer: "17", method: "Divide by 8." },
        { prompt: "Which pair is in the same ratio as 28 : 49? (a) 16 : 28 (b) 20 : 30 (c) 12 : 18", answer: "(a) 16 : 28", method: "28 : 49 is 4 : 7, and so is 16 : 28." },
        { prompt: "14 : 21 :: 36 : ?", answer: "54", method: "Multiply by \\(\\frac{3}{2}\\)." },
      ],
      pyqExampleId: "febfb6d0-d33e-4943-a7cb-47092f938379",
      traps: [
        {
          title: "Deciding the rule from one pair",
          body:
            "3 : 12 could be 'multiply by 4' or 'add 9'. When two pairs are given, the second one decides; when only one is given, test both rules on the options and keep the one that lands on exactly one of them.",
        },
        {
          title: "Splitting the digits when the note forbids it",
          body:
            "When SSC prints the note about whole numbers, a rule such as 'add the digits of 52' is not allowed. A digit sum used only to check divisibility is fine, because the rule itself still works on the whole number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrannm-add",
      name: "Add or take away one number",
      intuition:
        "When the two numbers of a pair are close in size, their ratio is an awkward decimal but their difference is clean. Subtract, and see whether the same difference appears in the other pair.",
      definition:
        "- Work out second minus first for each pair.\n" +
        "- If the difference is the same in both, add it to (or take it from) the third number.\n" +
        "- **Fast route:** with big numbers that are close together, take the difference before trying anything else. With an option pair question, the difference of each option settles it in a few seconds.",
      formula: {
        label: "One fixed difference",
        latex: "\\text{second} = \\text{first} + d",
        symbols: [{ symbol: "d", meaning: "the same difference in every pair (negative when the second is smaller)" }],
      },
      authoredExample: {
        prompt: "147 : 212 :: 389 : ?",
        steps: [
          "\\(212 - 147 = 65\\): the second number is 65 more than the first.",
          "\\(389 + 65 = 454\\).",
        ],
        answer: "454",
      },
      selfCheckExample: {
        prompt: "512 : 437 :: 263 : ?",
        steps: ["\\(512 - 437 = 75\\): the second number is 75 less.", "\\(263 - 75 = 188\\)."],
        answer: "188",
      },
      practiceSet: [
        { prompt: "35 : 52 :: 61 : ?", answer: "78", method: "Add 17." },
        { prompt: "803 : 700 :: 618 : ?", answer: "515", method: "Take away 103." },
        { prompt: "Which pair matches 44 : 70? (a) 21 : 47 (b) 30 : 50 (c) 62 : 90", answer: "(a) 21 : 47", method: "Each adds 26." },
        { prompt: "1234 : 3456 :: 2000 : ?", answer: "4222", method: "Add 2222." },
      ],
      pyqExampleId: "95070454-6ed2-4277-b521-5ee7c02b40f5",
      traps: [
        {
          title: "The same gap in the wrong direction",
          body:
            "If the given pair goes down by 56, an option that goes up by 56 has the same gap but the wrong sign. Write the difference as second minus first every time.",
        },
        {
          title: "Multiplying first out of habit",
          body:
            "For 214 and 131 the ratio is about 0.61 and leads nowhere, while the difference, 83, is the whole rule. When the numbers are close, the difference is the first check, not the last.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrannm-twostep",
      name: "Two steps: multiply, then add",
      intuition:
        "When neither the ratio nor the difference is the same in both pairs, the rule usually has two steps: multiply by one number and add another. Comparing the two given pairs with each other finds both numbers at once.",
      definition:
        "- Try **second = a × first + b**. The forms (first \\(-\\) c) \\(\\times\\) a and (first + c) \\(\\div\\) a are the same rule written another way.\n" +
        "- **Fast route:** the change in the second numbers divided by the change in the first numbers is a. Then b is the second number less a times the first.\n" +
        "- **When it breaks:** two pairs always fit some rule of this shape. If a or b comes out as an untidy fraction, the true rule is something else (a square, a product), so move on.\n" +
        "- Use a and b on the third number, then check the answer is one of the options.",
      formula: {
        label: "Multiplier and constant from two pairs",
        latex: "a = \\frac{y_2 - y_1}{x_2 - x_1} \\qquad b = y_1 - a\\,x_1",
        symbols: [
          { symbol: "\\(x_1, y_1\\)", meaning: "the first given pair" },
          { symbol: "\\(x_2, y_2\\)", meaning: "the second given pair" },
        ],
      },
      authoredExample: {
        prompt: "13 : 59 :: 20 : 94 :: 31 : ?",
        steps: [
          "Ratios (about 4.5 and 4.7) and differences (46 and 74) are not constant, so try two steps.",
          "\\(a = \\frac{94 - 59}{20 - 13} = \\frac{35}{7} = 5\\), and \\(b = 59 - 5 \\times 13 = -6\\). The rule is 5 times the number, less 6.",
          "Check: \\(5 \\times 20 - 6 = 94\\). Then \\(5 \\times 31 - 6 = 149\\).",
        ],
        answer: "149",
      },
      selfCheckExample: {
        prompt: "8 : 27 :: 15 : 48 :: 22 : ?",
        steps: [
          "\\(a = \\frac{48 - 27}{15 - 8} = \\frac{21}{7} = 3\\), and \\(b = 27 - 24 = 3\\).",
          "\\(3 \\times 22 + 3 = 69\\).",
        ],
        answer: "69",
      },
      practiceSet: [
        { prompt: "5 : 11 :: 9 : 19 :: 14 : ?", answer: "29", method: "Double and add 1." },
        { prompt: "30 : 16 :: 50 : 26 :: 74 : ?", answer: "38", method: "Halve and add 1." },
        { prompt: "A rule takes away 4 and then multiplies by 3. It sends 10 to 18 and 15 to 33. What does it send 26 to?", answer: "66", method: "\\((26 - 4) \\times 3\\)." },
        { prompt: "7 : 45 :: 12 : 80 :: 20 : ?", answer: "136", method: "\\(a = 7\\), \\(b = -4\\)." },
      ],
      pyqExampleId: "836bf17a-ecce-4d5c-99cd-254928575103",
      traps: [
        {
          title: "Accepting an untidy line",
          body:
            "Any two pairs fit some rule 'times a, plus b'. If a comes out as \\(\\frac{37}{9}\\), that is a sign the real rule is a square or a product, not a reason to use the fraction.",
        },
        {
          title: "A one-pair question with two answers in mind",
          body:
            "With one given pair, such as 15 : 31, both 'double and add 1' and 'add 16' fit. Work out each rule's answer and keep the one that is printed; if both are printed, the question is ambiguous.",
        },
      ],
    },
  ],
};
