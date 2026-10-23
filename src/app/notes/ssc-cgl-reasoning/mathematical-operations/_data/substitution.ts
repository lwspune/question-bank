import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RMO_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Symbol Substitution",
  title: "Symbol Substitution",
  oneLineDefinition:
    "Each sign, word or letter in the row is given a new meaning. Rewrite the whole row with the real signs first, then work it out in BODMAS order.",
  whyItMatters:
    "Sixty-four questions in the bank, 41 EASY and 23 MODERATE, and 54 of them come from the 2025 shifts. The meanings arrive as other signs, as words or as letters, and a mark is usually lost to one sign rewritten wrong, not to the arithmetic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrmosu-bodmas",
      name: "Work the row in BODMAS order",
      intuition:
        "SSC prints the expression in one line, but you cannot work it from left to right. Brackets go first, then division and multiplication, then addition and subtraction.",
      definition:
        "- **Brackets** first, the innermost pair first.\n" +
        "- **Powers** next: \\(5^2\\) is 25.\n" +
        "- **Division and multiplication** are one level. Work them as they come, from left to right: \\(24 \\div 4 \\times 2 = 6 \\times 2 = 12\\).\n" +
        "- **Addition and subtraction** are the lowest level, again from left to right.\n" +
        "- A negative number in brackets, such as \\((-6)\\), is one number. Subtracting it adds 6.\n" +
        "- Quick check: when every option is a whole number and your answer is not, look for a slip before you move on.",
      formula: {
        label: "Order of operations",
        latex: "\\text{Brackets} \\to \\text{Powers} \\to (\\div \\text{ and } \\times) \\to (+ \\text{ and } -)",
      },
      authoredExample: {
        prompt: "Work out \\(48 \\div 6 \\times 2 + 15 - 3 \\times 4\\).",
        steps: [
          "Division and multiplication first, from left to right: \\(48 \\div 6 = 8\\), then \\(8 \\times 2 = 16\\).",
          "The other block: \\(3 \\times 4 = 12\\).",
          "Now addition and subtraction from left to right: \\(16 + 15 - 12 = 19\\).",
        ],
        answer: "19",
      },
      selfCheckExample: {
        prompt: "Work out \\(\\{30 - (4 + 8)\\} \\div 3 + 2 \\times 5\\).",
        steps: [
          "Inner bracket: \\(4 + 8 = 12\\). Outer bracket: \\(30 - 12 = 18\\).",
          "Then \\(18 \\div 3 = 6\\) and \\(2 \\times 5 = 10\\).",
          "\\(6 + 10 = 16\\).",
        ],
        answer: "16",
      },
      practiceSet: [
        { prompt: "Work out \\(36 \\div 4 \\times 3 - 5\\).", answer: "22", method: "\\(9 \\times 3 = 27\\), then \\(27 - 5\\)." },
        { prompt: "Work out \\(7 + 18 \\div 3 \\times 2\\).", answer: "19", method: "\\(18 \\div 3 \\times 2 = 12\\), then \\(7 + 12\\)." },
        { prompt: "Work out \\(2^3 + 6 \\times 5 - 10 \\div 2\\).", answer: "33", method: "\\(8 + 30 - 5\\)." },
        { prompt: "Work out \\(5 \\times (9 - 3) \\div 10 + 4\\).", answer: "7", method: "\\(5 \\times 6 = 30\\), \\(30 \\div 10 = 3\\), then \\(3 + 4\\)." },
      ],
      pyqExampleId: "38a923cd-c671-4e09-b8aa-c14a6aef72b6",
      traps: [
        {
          title: "Always multiplying before dividing",
          body:
            "Division and multiplication share one level. \\(24 \\div 4 \\times 2\\) is \\(6 \\times 2 = 12\\), worked from the left. Doing the multiplication first gives \\(24 \\div 8 = 3\\), which is wrong.",
        },
        {
          title: "Always adding before subtracting",
          body:
            "Addition and subtraction also share one level. \\(20 - 8 + 2\\) is \\(12 + 2 = 14\\), not \\(20 - 10 = 10\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmosu-signs",
      name: "Signs that stand for other signs",
      intuition:
        "When ‘+’ means ‘×’ and ‘×’ means ‘−’, every sign in the row changes at the same moment. Copy the row once with the new signs, reading each sign from the printed row, and only then calculate.",
      definition:
        "- Write the key first, for example: + becomes ×, − becomes ÷, × becomes +, ÷ becomes −.\n" +
        "- Go along the **printed** row and write the new sign under each old one. Each printed sign changes once.\n" +
        "- Meanings in words work the same way: subtraction is −, addition is +, multiplication is ×, division is ÷.\n" +
        "- The letter x may be given its own meaning, such as ‘minus’. Then the x in the row is a minus sign, not a times sign.\n" +
        "- A sign the stem does not mention keeps its usual meaning.\n" +
        "- Then work out the new row in BODMAS order.\n" +
        "- Fast route: after rewriting, work out the division and multiplication blocks first. The options are usually far apart, so the blocks alone often show which option the total must be.",
      authoredExample: {
        prompt:
          "If ‘+’ means ‘÷’, ‘−’ means ‘+’, ‘×’ means ‘−’ and ‘÷’ means ‘×’, what is the value of \\(72 + 8 \\div 3 - 15 \\times 6\\)?",
        steps: [
          "Rewrite sign by sign from the printed row: \\(72 \\div 8 \\times 3 + 15 - 6\\).",
          "Division and multiplication from the left: \\(72 \\div 8 = 9\\), then \\(9 \\times 3 = 27\\).",
          "Then \\(27 + 15 - 6 = 36\\).",
        ],
        answer: "36",
      },
      selfCheckExample: {
        prompt:
          "If ‘+’ means ‘subtraction’, ‘×’ means ‘addition’, ‘−’ means ‘division’ and ‘÷’ means ‘multiplication’, what is the value of \\(40 - 8 \\div 3 + 6 \\times 9\\)?",
        steps: [
          "Rewrite: \\(40 \\div 8 \\times 3 - 6 + 9\\).",
          "\\(40 \\div 8 = 5\\), then \\(5 \\times 3 = 15\\).",
          "\\(15 - 6 + 9 = 18\\).",
        ],
        answer: "18",
      },
      practiceSet: [
        { prompt: "If ‘+’ means ‘−’ and ‘−’ means ‘+’, find \\(30 + 12 - 7\\).", answer: "25", method: "\\(30 - 12 + 7\\)." },
        { prompt: "If ‘×’ means ‘÷’ and ‘÷’ means ‘×’, find \\(64 \\times 8 \\div 5\\).", answer: "40", method: "\\(64 \\div 8 \\times 5\\)." },
        { prompt: "If ‘+’ means ‘×’ and ‘×’ means ‘+’, find \\(9 + 4 \\times 7\\).", answer: "43", method: "\\(9 \\times 4 + 7\\)." },
        { prompt: "If ‘−’ means ‘÷’ and ‘÷’ means ‘−’, find \\(50 - 5 \\div 3\\).", answer: "7", method: "\\(50 \\div 5 - 3\\)." },
      ],
      pyqExampleId: "2cc6803f-5e1d-4e5e-ae6a-2a62652df255",
      traps: [
        {
          title: "Changing a sign twice",
          body:
            "With + becoming × and × becoming +, a student who rewrites + as × and then reads that new × as + has undone the change. Read every sign from the printed row, never from your rewritten one.",
        },
        {
          title: "Reading the letter x as times",
          body:
            "When the stem says ‘x’ means ‘minus’, the x in the expression is a minus sign. Only the printed × sign, if the stem gives it a meaning, follows that meaning.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmosu-letters",
      name: "Letters and symbols in place of signs",
      intuition:
        "Here the row has no signs at all, only letters such as P and Q or marks such as # and @. Turn each one into its sign and you have an ordinary sum.",
      definition:
        "- Write the key, for example P is +, Q is ×, R is −, S is ÷.\n" +
        "- Rewrite the row with real signs. The numbers stay where they are.\n" +
        "- If the meanings are given in words (‘P denotes addition’), turn the words into signs first.\n" +
        "- Then work it out in BODMAS order, brackets first.",
      authoredExample: {
        prompt: "If ‘A’ means ‘×’, ‘B’ means ‘+’, ‘C’ means ‘÷’ and ‘D’ means ‘−’, find the value of 14 A 3 B 56 C 8 D 5.",
        steps: [
          "Rewrite: \\(14 \\times 3 + 56 \\div 8 - 5\\).",
          "Blocks: \\(14 \\times 3 = 42\\) and \\(56 \\div 8 = 7\\).",
          "\\(42 + 7 - 5 = 44\\).",
        ],
        answer: "44",
      },
      selfCheckExample: {
        prompt: "If # means ‘÷’, @ means ‘+’ and & means ‘×’, find the value of 90 # 15 @ 4 & 7.",
        steps: [
          "Rewrite: \\(90 \\div 15 + 4 \\times 7\\).",
          "\\(90 \\div 15 = 6\\) and \\(4 \\times 7 = 28\\), so the value is \\(6 + 28 = 34\\).",
        ],
        answer: "34",
      },
      practiceSet: [
        { prompt: "If P means ‘+’ and Q means ‘×’, find 6 P 4 Q 5.", answer: "26", method: "\\(6 + 4 \\times 5 = 6 + 20\\)." },
        { prompt: "If & means ‘−’ and # means ‘÷’, find 50 & 36 # 4.", answer: "41", method: "\\(50 - 36 \\div 4 = 50 - 9\\)." },
        { prompt: "If # means ‘×’ and @ means ‘−’, find 12 # 3 @ 10.", answer: "26", method: "\\(12 \\times 3 - 10\\)." },
        { prompt: "If M means ‘÷’ and N means ‘+’, find 81 M 9 N 11.", answer: "20", method: "\\(81 \\div 9 + 11\\)." },
      ],
      pyqExampleId: "c1f492b1-a479-4562-8878-1487a503bbe5",
      traps: [
        {
          title: "Working the letters from left to right",
          body:
            "Once the letters are signs, BODMAS still applies. If P is + and Q is ×, then 6 P 4 Q 5 is \\(6 + 20 = 26\\), not \\(10 \\times 5 = 50\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrmosu-equations",
      name: "Which equation is correct?",
      intuition:
        "Now the meanings are given and four whole equations are offered. Rewrite each option with the real signs, work it out, and keep the one whose two sides agree.",
      definition:
        "- Apply the key to every sign in the option, on both sides of the = sign. The numbers do not change.\n" +
        "- Work out each side in BODMAS order.\n" +
        "- Fast route: start with options whose rewritten row divides cleanly. A division that leaves a fraction no later step clears cannot reach a whole-number right side.\n" +
        "- When all four options share one left side and only the right side differs, work out the left side once and pick the matching number.",
      authoredExample: {
        prompt:
          "If ‘+’ means ‘−’, ‘−’ means ‘×’, ‘×’ means ‘÷’ and ‘÷’ means ‘+’, which equation is correct? (a) \\(20 + 4 - 3 \\div 6 = 14\\) (b) \\(18 \\times 3 - 2 + 5 = 9\\) (c) \\(9 - 4 \\times 6 \\div 1 = 8\\)",
        steps: [
          "(a) becomes \\(20 - 4 \\times 3 + 6 = 20 - 12 + 6 = 14\\). Both sides agree.",
          "(b) becomes \\(18 \\div 3 \\times 2 - 5 = 12 - 5 = 7\\), not 9.",
          "(c) becomes \\(9 \\times 4 \\div 6 + 1 = 6 + 1 = 7\\), not 8.",
        ],
        answer: "(a)",
      },
      selfCheckExample: {
        prompt:
          "If ‘×’ means ‘+’, ‘+’ means ‘×’, ‘÷’ means ‘−’ and ‘−’ means ‘÷’, which equation is correct? (a) \\(6 + 4 \\times 3 \\div 5 = 22\\) (b) \\(8 \\times 2 + 5 - 1 = 50\\)",
        steps: [
          "(a) becomes \\(6 \\times 4 + 3 - 5 = 24 + 3 - 5 = 22\\). Correct.",
          "(b) becomes \\(8 + 2 \\times 5 \\div 1 = 8 + 10 = 18\\), not 50.",
        ],
        answer: "(a)",
      },
      practiceSet: [
        { prompt: "If ‘+’ means ‘×’ and ‘×’ means ‘+’, is \\(5 + 3 \\times 2 = 17\\) correct?", answer: "Yes", method: "\\(5 \\times 3 + 2 = 17\\)." },
        { prompt: "If ‘−’ means ‘÷’ and ‘÷’ means ‘−’, is \\(24 - 6 \\div 1 = 5\\) correct?", answer: "No: the left side is 3", method: "\\(24 \\div 6 - 1 = 3\\)." },
        { prompt: "If ‘+’ means ‘−’ and ‘−’ means ‘+’, which is correct: \\(15 + 4 - 2 = 13\\) or \\(15 + 4 - 2 = 9\\)?", answer: "\\(15 + 4 - 2 = 13\\)", method: "\\(15 - 4 + 2 = 13\\)." },
        { prompt: "If ‘×’ means ‘÷’ and ‘÷’ means ‘×’, what right side makes \\(36 \\times 4 \\div 2\\) a correct equation?", answer: "18", method: "\\(36 \\div 4 \\times 2 = 18\\)." },
      ],
      pyqExampleId: "6b237b4e-c457-48b6-8ab2-8a5a0f8a8947",
      traps: [
        {
          title: "Stopping at a near miss",
          body:
            "SSC prints options that come close. A left side of 10.5 against a right side of 10 is wrong, so finish the arithmetic before you choose.",
        },
        {
          title: "Rewriting only the left side",
          body:
            "The key applies to every sign in the option. If a sign stands on the right of the = sign, it changes too.",
        },
      ],
    },
  ],
};
