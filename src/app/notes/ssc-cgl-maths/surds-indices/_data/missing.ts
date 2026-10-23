import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_MISSING_NOTE: SubtopicNote = {
  subtopicName: "Missing Numbers and Letters",
  title: "Missing Numbers and Letters",
  oneLineDefinition:
    "When a letter or a blank sits inside a BODMAS chain, simplify everything around it first, then undo what is left; when the whole expression is in letters, open the brackets and collect like terms, or substitute with care over signs.",
  whyItMatters:
    "Nine questions in the bank, eight EASY and one MODERATE, from the 2023 and 2024 shifts. They test the same BODMAS order as the chapter's first page, run backwards or done with letters, and the printed wrong options come from a sign slip with a negative value.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsimi-backwards",
      name: "Finding a missing number in an expression",
      intuition:
        "Most of the line has no unknown in it. Simplify all of that first, using BODMAS, and the unknown is left in a short equation. Then undo its operations in reverse order.",
      definition:
        "- Work out every part that has no unknown.\n" +
        "- Keep the unknown's own operation attached to it: in \\(4 \\times A\\) the 4 stays with A until the end.\n" +
        "- Undo in reverse order: undo an addition by subtracting, a multiplication by dividing.\n" +
        "- When the unknown is deep inside brackets, treat the whole bracket as one number first. In \\(30 - [\\,\\dots\\,] = 28\\) the bracket must be 2.\n" +
        "- **Fast route: test the options.** Put each into the line and keep the one that balances. Start with a middle option; if it is too big or too small, that tells you which way to go.",
      authoredExample: {
        prompt: "Find \\(x\\) if \\(56 \\div 7 + 3 \\times x - 45 \\div 9 = 24\\).",
        steps: [
          "Simplify the parts without \\(x\\): \\(56 \\div 7 = 8\\) and \\(45 \\div 9 = 5\\).",
          "The line becomes \\(8 + 3x - 5 = 24\\), that is \\(3x + 3 = 24\\).",
          "Undo: \\(3x = 21\\), so \\(x = 7\\).",
          "Check: \\(8 + 21 - 5 = 24\\).",
        ],
        answer: "7",
      },
      selfCheckExample: {
        prompt: "Find \\(k\\) if \\(30 - [12 - \\{8 + 6 \\div (k - 1)\\}] = 28\\).",
        steps: [
          "The square bracket must be \\(30 - 28 = 2\\), so \\(12 - 8 - \\frac{6}{k - 1} = 2\\).",
          "\\(4 - \\frac{6}{k - 1} = 2\\) gives \\(\\frac{6}{k - 1} = 2\\), so \\(k - 1 = 3\\).",
          "Check: \\(6 \\div 3 = 2\\), \\(8 + 2 = 10\\), \\(12 - 10 = 2\\), \\(30 - 2 = 28\\).",
        ],
        answer: "\\(k = 4\\)",
      },
      practiceSet: [
        { prompt: "If \\(5 \\times n - 12 = 23\\), what is \\(n\\)?", answer: "7" },
        { prompt: "If \\(48 \\div m + 6 = 14\\), what is \\(m\\)?", answer: "6", method: "\\(48 \\div m = 8\\)." },
        { prompt: "If \\(x \\text{ of } 6 \\div 3 = 14\\), what is \\(x\\)?", answer: "7", method: "'Of' first: \\(6x \\div 3 = 2x = 14\\)." },
        { prompt: "What number, multiplied by 18, gives \\(36^2\\)?", answer: "72", method: "\\(36 \\times 36 \\div 18 = 36 \\times 2 = 72\\); no need to square 36." },
      ],
      pyqExampleId: "508282db-d1ce-478c-b1a9-af8df9163906",
      traps: [
        {
          title: "Pulling the unknown away from its multiplier",
          body:
            "In \\(20 - 3 \\times y = 5\\) the 3 belongs to \\(y\\): \\(3y = 15\\), so \\(y = 5\\). Working \\(20 - 3 = 17\\) first breaks BODMAS and gives \\(y = \\frac{5}{17}\\).",
        },
        {
          title: "Skipping the check",
          body:
            "An answer found by undoing steps is easily off by a sign. Put it back into the original line before marking it: the check takes a few seconds and catches the slip that the wrong options are built on.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsimi-letters",
      name: "Simplifying and evaluating expressions in letters",
      intuition:
        "Letters obey the same bracket and sign rules as numbers. Open each bracket from the inside and collect like terms as you go. To find a value, put each number in with its sign, inside brackets.",
      definition:
        "- **Like terms** have the same letters to the same powers: \\(5p\\) and \\(-2p\\) make \\(3p\\); \\(p\\) and \\(q\\) do not combine.\n" +
        "- Open brackets from the inside out, flipping every sign after a minus, exactly as with numbers.\n" +
        "- **Substitute inside brackets:** for \\(x = -3\\), write \\((-3)^2 = 9\\) and \\((-3)^3 = -27\\).\n" +
        "- An **even power** of a negative number is positive; an **odd power** stays negative.\n" +
        "- **Fast route:** fix the sign of each term before working out its size; many wrong options differ from the key only in one sign.",
      formula: {
        label: "Powers of a negative number",
        latex: "(-a)^{2} = a^{2} \\qquad (-a)^{3} = -a^{3}",
      },
      authoredExample: {
        prompt: "Simplify \\(4a - [2b - \\{5a - (3b - a)\\}]\\).",
        steps: [
          "Innermost: \\(5a - (3b - a) = 5a - 3b + a = 6a - 3b\\).",
          "Next: \\(2b - (6a - 3b) = 5b - 6a\\).",
          "Outside: \\(4a - (5b - 6a) = 10a - 5b\\).",
        ],
        answer: "\\(10a - 5b\\)",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(2x^3 - 3x^2y + xy^2\\) when \\(x = -2\\) and \\(y = 3\\).",
        steps: [
          "\\(2x^3 = 2(-8) = -16\\).",
          "\\(-3x^2y = -3(4)(3) = -36\\).",
          "\\(xy^2 = (-2)(9) = -18\\).",
          "Total: \\(-16 - 36 - 18 = -70\\).",
        ],
        answer: "\\(-70\\)",
      },
      practiceSet: [
        { prompt: "Simplify \\(7m - (3m - 2n) + n\\).", answer: "\\(4m + 3n\\)" },
        { prompt: "What is \\((-4)^3\\)?", answer: "\\(-64\\)" },
        { prompt: "Find \\(x^2 - 2xy\\) when \\(x = -1\\) and \\(y = 2\\).", answer: "5", method: "\\(1 - 2(-1)(2) = 1 + 4 = 5\\)." },
        { prompt: "Simplify \\(3(a - b) - 2(a - 2b)\\).", answer: "\\(a + b\\)" },
      ],
      pyqExampleId: "3b403d96-5778-40ce-ab10-a807bf508071",
      traps: [
        {
          title: "Squaring a negative without brackets",
          body:
            "\\(-3^2\\) means \\(-(3^2) = -9\\), but \\((-3)^2 = 9\\). When you put \\(x = -3\\) into \\(x^2\\), write \\((-3)^2\\).",
        },
        {
          title: "Adding unlike terms",
          body: "\\(3p + 2q\\) cannot be written as \\(5pq\\) or \\(5p\\). Only terms with the same letters to the same powers combine.",
        },
      ],
    },
  ],
};
