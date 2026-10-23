import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_BODMAS_NOTE: SubtopicNote = {
  subtopicName: "BODMAS and Brackets",
  title: "BODMAS and Brackets",
  oneLineDefinition:
    "A long expression has one right value only when everyone works it in the same order: the bar, brackets from the inside out, 'of', then division and multiplication, then addition and subtraction.",
  whyItMatters:
    "Forty-four questions in the bank, 39 EASY and 5 MODERATE, all from the 2023 and 2024 shifts. Every one is a single chain of operations, and the wrong options are the values you get by doing one step out of order. Seventeen of them use the word 'of', which SSC uses to catch students who treat it as a plain multiplication.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsibo-order",
      name: "The order of operations (BODMAS)",
      intuition:
        "If one person divides first and another multiplies first, the same line gives two answers. BODMAS is the agreement that fixes one order, so the expression means one number.",
      definition:
        "- **B**rackets first, then **O**rders (powers and roots), then **D**ivision and **M**ultiplication, then **A**ddition and **S**ubtraction.\n" +
        "- Division and multiplication are **one level**. Work them **left to right**, whichever comes first. The same holds for addition and subtraction.\n" +
        "- So \\(12 \\div 4 \\times 3 = 3 \\times 3 = 9\\), not \\(12 \\div 12 = 1\\).\n" +
        "- **Fast route:** once every \\(\\div\\) and \\(\\times\\) is done, add all the positive terms, add all the negative terms, and subtract once. This avoids a long run of small signed steps.\n" +
        "- **Fast check:** the four options often differ in the last digit or the sign. Work out just the last digit, or just the sign, and two options usually fall away.",
      formula: {
        label: "Order of operations",
        latex: "\\text{Brackets} \\to \\text{Orders} \\to \\div,\\ \\times\\ (\\text{left to right}) \\to +,\\ -\\ (\\text{left to right})",
      },
      authoredExample: {
        prompt: "Simplify \\(48 \\div 6 \\times 2 + 35 - 9 \\times 4 \\div 12\\).",
        steps: [
          "No brackets or powers, so do division and multiplication left to right: \\(48 \\div 6 = 8\\), then \\(8 \\times 2 = 16\\).",
          "In the last term, left to right again: \\(9 \\times 4 = 36\\), then \\(36 \\div 12 = 3\\).",
          "Now add and subtract: \\(16 + 35 - 3 = 48\\).",
        ],
        answer: "48",
      },
      selfCheckExample: {
        prompt: "Simplify \\(90 \\div 15 \\times 4 - 6 \\times 7 + 81 \\div 9\\).",
        steps: [
          "\\(90 \\div 15 = 6\\) and \\(6 \\times 4 = 24\\); \\(6 \\times 7 = 42\\); \\(81 \\div 9 = 9\\).",
          "Positives \\(24 + 9 = 33\\), negatives \\(42\\), so the value is \\(33 - 42 = -9\\).",
        ],
        answer: "\\(-9\\)",
      },
      practiceSet: [
        { prompt: "What is \\(24 \\div 4 \\times 2\\)?", answer: "12" },
        { prompt: "What is \\(5 + 3 \\times 4 - 6 \\div 2\\)?", answer: "14", method: "\\(5 + 12 - 3 = 14\\)." },
        { prompt: "What is \\(100 - 64 \\div 8 \\times 5\\)?", answer: "60", method: "\\(64 \\div 8 = 8\\), \\(8 \\times 5 = 40\\), \\(100 - 40 = 60\\)." },
        { prompt: "What is \\(7 \\times 6 \\div 3 - 2^3\\)?", answer: "6", method: "\\(42 \\div 3 = 14\\) and \\(2^3 = 8\\), so \\(14 - 8 = 6\\)." },
      ],
      pyqExampleId: "b7c39123-28d8-4997-9da5-5ac1bf9b221e",
      traps: [
        {
          title: "Multiplying before dividing",
          body:
            "In \\(36 \\div 6 \\times 2\\) the division is on the left, so it goes first: \\(6 \\times 2 = 12\\). Doing \\(6 \\times 2\\) first gives \\(36 \\div 12 = 3\\), which is wrong. Division and multiplication share one level and go left to right.",
        },
        {
          title: "Adding before subtracting",
          body:
            "\\(20 - 5 + 3\\) is \\(15 + 3 = 18\\), not \\(20 - 8 = 12\\). Addition and subtraction also share one level and go left to right.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsibo-brackets",
      name: "Removing nested brackets from the inside out",
      intuition:
        "A bracket says: do this part first. When brackets sit inside brackets, the innermost one needs nothing else, so it is always the place to start. Each bracket you finish turns into a single number for the bracket around it.",
      definition:
        "- The usual nesting is ( ) inside { } inside [ ]. Open the **innermost** bracket first, whatever its shape.\n" +
        "- Inside each bracket, BODMAS applies as usual.\n" +
        "- A **minus before a bracket** changes the sign of every term inside it: \\(a - (b - c + d) = a - b + c - d\\).\n" +
        "- Two minus signs make a plus: \\(8 - (-3) = 11\\).\n" +
        "- A number written right next to a bracket multiplies it: \\(13(-3)\\) means \\(13 \\times (-3) = -39\\).",
      formula: {
        label: "Minus before a bracket",
        latex: "a - (b - c) = a - b + c \\qquad a - (-b) = a + b",
      },
      authoredExample: {
        prompt: "Simplify \\(40 - [12 + \\{18 - (9 - 4)\\}]\\).",
        steps: [
          "Innermost: \\(9 - 4 = 5\\).",
          "Curly bracket: \\(18 - 5 = 13\\).",
          "Square bracket: \\(12 + 13 = 25\\).",
          "Outside: \\(40 - 25 = 15\\).",
        ],
        answer: "15",
      },
      selfCheckExample: {
        prompt: "Simplify \\(6 - [5 - \\{9 - (2 - 8)\\}]\\).",
        steps: [
          "\\(2 - 8 = -6\\), so \\(9 - (-6) = 15\\).",
          "\\(5 - 15 = -10\\), so \\(6 - (-10) = 16\\).",
        ],
        answer: "16",
      },
      practiceSet: [
        { prompt: "What is \\(15 - (8 - 3)\\)?", answer: "10" },
        { prompt: "What is \\(7 - (-4) - 2\\)?", answer: "9" },
        { prompt: "What is \\(20 - \\{3 + (10 - 6)\\}\\)?", answer: "13" },
        { prompt: "What is \\(4(5 - 9) + 10\\)?", answer: "\\(-6\\)", method: "\\(4 \\times (-4) = -16\\), and \\(-16 + 10 = -6\\)." },
      ],
      pyqExampleId: "ff0b6d22-c876-435a-bfaa-219e6b8fb912",
      traps: [
        {
          title: "Flipping only the first sign after a minus",
          body:
            "\\(30 - (12 - 5 + 2)\\) is \\(30 - 12 + 5 - 2 = 21\\). A minus before a bracket flips every sign inside it. Flipping only the 12 gives \\(30 - 12 - 5 + 2 = 15\\), a typical wrong option.",
        },
        {
          title: "Losing a negative bracket",
          body:
            "In \\(4 - (6 - 6 - 8)\\) the bracket is \\(-8\\), so the value is \\(4 + 8 = 12\\). Writing \\(4 - 8 = -4\\) drops the minus that the bracket carries.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsibo-of",
      name: "The word 'of' and the bar in BODMAS",
      intuition:
        "SSC prints two signs that older textbooks use. 'Of' means multiply, but it binds two numbers more tightly than ÷ or ×. A bar drawn over some terms (the vinculum) groups them even before ordinary brackets.",
      definition:
        "- **'Of' means multiply, and it is done before division and multiplication:** \\(24 \\div 4 \\text{ of } 3 = 24 \\div 12 = 2\\), while \\(24 \\div 4 \\times 3 = 18\\).\n" +
        "- The full order SSC uses: the **bar**, then brackets, then **of**, then \\(\\div\\) and \\(\\times\\) left to right, then \\(+\\) and \\(-\\).\n" +
        "- A **bar** over terms makes them one number: \\(\\overline{9 - 5} = 4\\).\n" +
        "- A bracket after 'of' is still worked first: \\(3 \\text{ of } (2 + 5) = 3 \\times 7 = 21\\).\n" +
        "- 'Of' with a fraction is the usual fraction of a number: \\(\\frac{2}{3} \\text{ of } 27 = 18\\).",
      formula: {
        label: "Of against times after a division",
        latex: "a \\div b \\text{ of } c = \\frac{a}{bc} \\qquad a \\div b \\times c = \\frac{ac}{b}",
      },
      authoredExample: {
        prompt: "Simplify \\(96 \\div 4 \\text{ of } 6 + 3 \\text{ of } 5 \\times 2 - \\overline{11 - 4}\\).",
        steps: [
          "Bar first: \\(\\overline{11 - 4} = 7\\).",
          "'Of' next: \\(4 \\text{ of } 6 = 24\\) and \\(3 \\text{ of } 5 = 15\\).",
          "Division and multiplication: \\(96 \\div 24 = 4\\) and \\(15 \\times 2 = 30\\).",
          "Last: \\(4 + 30 - 7 = 27\\).",
          "Reading 'of' as a plain \\(\\times\\) would give \\(96 \\div 4 \\times 6 = 144\\) for the first part, which is why the rule matters.",
        ],
        answer: "27",
      },
      selfCheckExample: {
        prompt: "Simplify \\(60 \\div 5 \\text{ of } 2 \\times 4 - 18 \\div 3 \\text{ of } 3\\).",
        steps: [
          "'Of' first: \\(5 \\text{ of } 2 = 10\\) and \\(3 \\text{ of } 3 = 9\\).",
          "\\(60 \\div 10 \\times 4 = 6 \\times 4 = 24\\) and \\(18 \\div 9 = 2\\).",
          "\\(24 - 2 = 22\\).",
        ],
        answer: "22",
      },
      practiceSet: [
        { prompt: "What is \\(36 \\div 3 \\text{ of } 4\\)?", answer: "3" },
        { prompt: "What is \\(36 \\div 3 \\times 4\\)?", answer: "48" },
        { prompt: "What is \\(\\frac{3}{4} \\text{ of } 20 + 5\\)?", answer: "20" },
        { prompt: "What is \\(50 - \\overline{20 - 8}\\)?", answer: "38" },
      ],
      pyqExampleId: "c12e4b72-8618-4cab-a687-4e058c75a24c",
      traps: [
        {
          title: "Treating 'of' as an ordinary multiplication",
          body:
            "\\(48 \\div 8 \\text{ of } 2\\) is \\(48 \\div 16 = 3\\). Reading 'of' as a plain \\(\\times\\) gives \\(48 \\div 8 \\times 2 = 12\\), and SSC prints that as a wrong option.",
        },
        {
          title: "Ignoring the bar",
          body:
            "A bar over \\(4 - 9\\) makes it one number, \\(-5\\), so \\(10 - \\overline{4 - 9} = 10 + 5 = 15\\). Without the bar the minus would touch only the 4, giving \\(10 - 4 - 9 = -3\\).",
        },
        {
          title: "Doing 'of' before its own bracket",
          body:
            "In \\(3 \\text{ of } (2 + 5)\\) the bracket still comes first: \\(3 \\times 7 = 21\\). 'Of' outranks division, not brackets.",
        },
      ],
    },
  ],
};
