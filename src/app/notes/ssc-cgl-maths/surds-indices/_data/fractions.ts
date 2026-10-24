import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SI_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Fractions and Decimals",
  title: "Fractions and Decimals",
  oneLineDefinition:
    "Fractions and decimals follow the same BODMAS order as whole numbers; what changes is the arithmetic: mixed numbers, reciprocals, decimal places, and knowing which form makes a step easy.",
  whyItMatters:
    "Forty-four questions in the bank, 38 EASY and 6 MODERATE, and 26 of them come from the 2025 shifts. The 2025 papers moved from long bracket chains to short decimal sums and small word problems, so speed with decimal places and with the common fraction and decimal pairs now decides these marks.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsifr-fractions",
      name: "Fractions and mixed numbers in BODMAS",
      intuition:
        "A fraction expression is worked in the usual BODMAS order. Make every mixed number an improper fraction, turn every division into multiplication by the reciprocal, and cancel before you multiply so the numbers stay small.",
      definition:
        "- **Mixed to improper:** \\(3\\frac{2}{5} = \\frac{3 \\times 5 + 2}{5} = \\frac{17}{5}\\).\n" +
        "- **Divide by a fraction:** multiply by its reciprocal, \\(\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}\\).\n" +
        "- **Add or subtract:** bring both fractions to the LCM of the denominators.\n" +
        "- **Cancel first:** \\(\\frac{14}{15} \\times \\frac{25}{28} = \\frac{1}{3} \\times \\frac{5}{2} = \\frac{5}{6}\\).\n" +
        "- **Reduce a fraction when you see it:** \\(\\frac{38}{57} = \\frac{2}{3}\\), since both are multiples of 19.\n" +
        "- **Fast route:** read left to right, \\(x \\div y \\times y = x\\). Dividing and then multiplying by the same number cancels, so do not work it out.",
      formula: {
        label: "Fraction rules",
        latex: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{ad}{bc} \\qquad \\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd} \\qquad p\\frac{q}{r} = \\frac{pr + q}{r}",
      },
      authoredExample: {
        prompt: "Simplify \\(2\\frac{1}{4} \\div \\frac{3}{8} - \\frac{5}{6} \\times 1\\frac{1}{5}\\).",
        steps: [
          "Mixed to improper: \\(2\\frac{1}{4} = \\frac{9}{4}\\) and \\(1\\frac{1}{5} = \\frac{6}{5}\\).",
          "Division: \\(\\frac{9}{4} \\times \\frac{8}{3} = \\frac{3 \\times 2}{1 \\times 1} = 6\\).",
          "Multiplication: \\(\\frac{5}{6} \\times \\frac{6}{5} = 1\\).",
          "Subtraction last: \\(6 - 1 = 5\\).",
        ],
        answer: "5",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\left(\\frac{2}{5} + \\frac{1}{3}\\right) \\div \\left(1\\frac{1}{4} - \\frac{2}{3}\\right)\\).",
        steps: [
          "First bracket: \\(\\frac{6 + 5}{15} = \\frac{11}{15}\\).",
          "Second bracket: \\(\\frac{5}{4} - \\frac{2}{3} = \\frac{15 - 8}{12} = \\frac{7}{12}\\).",
          "\\(\\frac{11}{15} \\times \\frac{12}{7} = \\frac{11 \\times 4}{5 \\times 7} = \\frac{44}{35}\\).",
        ],
        answer: "\\(\\frac{44}{35} = 1\\frac{9}{35}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(4\\frac{3}{7}\\) as an improper fraction.", answer: "\\(\\frac{31}{7}\\)" },
        { prompt: "What is \\(\\frac{5}{9} \\div \\frac{10}{3}\\)?", answer: "\\(\\frac{1}{6}\\)" },
        { prompt: "What is \\(\\frac{2}{3} + \\frac{3}{5}\\)?", answer: "\\(\\frac{19}{15}\\)" },
        {
          prompt: "What is \\(7\\frac{1}{2} \\div 2\\frac{1}{2} \\times 2\\frac{1}{2}\\)?",
          answer: "\\(7\\frac{1}{2}\\)",
          method: "Left to right, dividing by \\(2\\frac{1}{2}\\) and then multiplying by it cancel.",
        },
      ],
      pyqExampleId: "2f72b0b0-0dfc-439b-8bb8-74bf940dc7cb",
      traps: [
        {
          title: "Multiplying mixed numbers part by part",
          body:
            "\\(2\\frac{1}{2} \\times 3\\frac{1}{3}\\) is not \\(6\\frac{1}{6}\\). Convert first: \\(\\frac{5}{2} \\times \\frac{10}{3} = \\frac{25}{3} = 8\\frac{1}{3}\\).",
        },
        {
          title: "Turning the wrong fraction upside down",
          body:
            "Only the divisor is flipped: \\(\\frac{2}{5} \\div \\frac{4}{15} = \\frac{2}{5} \\times \\frac{15}{4} = \\frac{3}{2}\\). Flipping the first fraction instead gives \\(\\frac{5}{2} \\times \\frac{4}{15} = \\frac{2}{3}\\), the reciprocal of the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsifr-decimals",
      name: "Working with decimals",
      intuition:
        "A decimal is a fraction with 10, 100 or 1000 below it. To multiply, count decimal places; to divide, slide the point in both numbers. And many decimals are fractions you already know, which is often the quickest way through.",
      definition:
        "- **Multiply:** multiply as whole numbers, then give the answer as many decimal places as the two numbers have between them: \\(0.6 \\times 0.07 = 0.042\\).\n" +
        "- **Divide:** move the point the same number of places in both numbers until the divisor is whole: \\(1.44 \\div 0.12 = 144 \\div 12 = 12\\).\n" +
        "- **Add or subtract:** line up the decimal points; fill gaps with zeros.\n" +
        "- **Switch to a fraction when it helps:** \\(0.125 = \\frac{1}{8}\\), \\(0.375 = \\frac{3}{8}\\), \\(0.625 = \\frac{5}{8}\\), \\(0.75 = \\frac{3}{4}\\), \\(0.2 = \\frac{1}{5}\\). Dividing by 0.25 is multiplying by 4; dividing by 0.5 is doubling.\n" +
        "- **Recurring decimals:** one repeating digit goes over 9, two repeating digits over 99: \\(0.\\overline{7} = \\frac{7}{9}\\), \\(0.\\overline{45} = \\frac{45}{99} = \\frac{5}{11}\\).\n" +
        "- **Estimate first:** round each number and fix the sign and rough size of the answer before working. When the options differ in sign or by a lot, the estimate alone picks one. When they agree in the first figures, it is not enough.",
      formula: {
        label: "Recurring decimals and handy divisions",
        latex: "0.\\overline{a} = \\frac{a}{9} \\qquad 0.\\overline{ab} = \\frac{ab}{99} \\qquad x \\div 0.25 = 4x \\qquad x \\div 0.5 = 2x",
        symbols: [
          { symbol: "a", meaning: "the single repeating digit" },
          { symbol: "ab", meaning: "the two-digit number made by the repeating pair" },
        ],
      },
      authoredExample: {
        prompt: "Simplify \\(3.6 \\times 0.5 + 2.7 \\div 0.9 - 1.25\\).",
        steps: [
          "Estimate: about \\(2 + 3 - 1 = 4\\), so the answer is a little under 4.",
          "\\(3.6 \\times 0.5 = 1.8\\) (half of 3.6).",
          "\\(2.7 \\div 0.9 = 27 \\div 9 = 3\\).",
          "\\(1.8 + 3 - 1.25 = 3.55\\), which fits the estimate.",
        ],
        answer: "3.55",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\left(3\\frac{1}{4} + 0.35\\right) \\div 0.9\\).",
        steps: [
          "\\(3\\frac{1}{4} = 3.25\\), so the bracket is \\(3.25 + 0.35 = 3.6\\).",
          "\\(3.6 \\div 0.9 = 36 \\div 9 = 4\\).",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "What is \\(0.08 \\times 0.5\\)?", answer: "0.04" },
        { prompt: "What is \\(2.56 \\div 0.16\\)?", answer: "16" },
        { prompt: "Write \\(0.\\overline{36}\\) as a fraction in lowest terms.", answer: "\\(\\frac{4}{11}\\)", method: "\\(\\frac{36}{99} = \\frac{4}{11}\\)." },
        { prompt: "A bottle holds 0.625 litres. How much do 8 such bottles hold?", answer: "5 litres", method: "\\(0.625 = \\frac{5}{8}\\), and \\(\\frac{5}{8} \\times 8 = 5\\)." },
      ],
      pyqExampleId: "7686e445-b87c-4188-bd3f-8a568411b7f9",
      traps: [
        {
          title: "Too few decimal places in a product",
          body:
            "\\(0.3 \\times 0.2 = 0.06\\), not 0.6. Each number has one decimal place, so the product needs two.",
        },
        {
          title: "Expecting division to make a number smaller",
          body:
            "Dividing by a number below 1 makes the result bigger: \\(4.5 \\div 0.5 = 9\\). An option smaller than 4.5 can be ruled out at once.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsifr-compare",
      name: "Comparing and ordering fractions",
      intuition:
        "Two fractions can only be compared on one scale: a common denominator, decimals, or a cross-multiplication. Often a simpler test settles it, because only one fraction sits on the far side of one half.",
      definition:
        "- **Cross-multiply:** for positive denominators, \\(\\frac{a}{b} > \\frac{c}{d}\\) exactly when \\(ad > bc\\).\n" +
        "- **Benchmark first:** compare each fraction with \\(\\frac{1}{2}\\) (is the top more than half the bottom?) or with 1.\n" +
        "- **Gap from 1:** for fractions just below 1, the one with the smaller gap \\(1 - \\frac{a}{b}\\) is the larger.\n" +
        "- **Decimals:** three decimal places is enough to separate the options SSC prints.",
      formula: {
        label: "Cross-multiplication test",
        latex: "\\frac{a}{b} > \\frac{c}{d} \\text{ exactly when } ad > bc \\quad (b, d > 0)",
      },
      authoredExample: {
        prompt: "Arrange \\(\\frac{3}{8}, \\frac{2}{5}, \\frac{5}{12}\\) in ascending order.",
        steps: [
          "\\(\\frac{3}{8}\\) against \\(\\frac{2}{5}\\): \\(3 \\times 5 = 15 < 2 \\times 8 = 16\\), so \\(\\frac{3}{8} < \\frac{2}{5}\\).",
          "\\(\\frac{2}{5}\\) against \\(\\frac{5}{12}\\): \\(2 \\times 12 = 24 < 5 \\times 5 = 25\\), so \\(\\frac{2}{5} < \\frac{5}{12}\\).",
          "Decimal check: 0.375, 0.4, 0.417.",
        ],
        answer: "\\(\\frac{3}{8}, \\frac{2}{5}, \\frac{5}{12}\\)",
      },
      selfCheckExample: {
        prompt: "Which is the largest of \\(\\frac{4}{9}, \\frac{7}{13}, \\frac{5}{11}, \\frac{3}{7}\\)?",
        steps: [
          "Against \\(\\frac{1}{2}\\): \\(2 \\times 4 = 8 < 9\\), \\(2 \\times 7 = 14 > 13\\), \\(2 \\times 5 = 10 < 11\\), \\(2 \\times 3 = 6 < 7\\).",
          "Only \\(\\frac{7}{13}\\) is above one half.",
        ],
        answer: "\\(\\frac{7}{13}\\)",
      },
      practiceSet: [
        { prompt: "Which is larger, \\(\\frac{5}{7}\\) or \\(\\frac{7}{10}\\)?", answer: "\\(\\frac{5}{7}\\)", method: "\\(50 > 49\\)." },
        { prompt: "Is \\(\\frac{11}{20}\\) more or less than \\(\\frac{1}{2}\\)?", answer: "More: 11 is more than half of 20" },
        { prompt: "Which is larger, \\(\\frac{8}{9}\\) or \\(\\frac{9}{10}\\)?", answer: "\\(\\frac{9}{10}\\): its gap from 1 is smaller" },
        { prompt: "Arrange \\(0.6, \\frac{2}{3}, \\frac{5}{8}\\) in ascending order.", answer: "\\(0.6, \\frac{5}{8}, \\frac{2}{3}\\)", method: "0.6, 0.625, 0.667." },
      ],
      pyqExampleId: "0fd7b842-a60c-41f8-b761-c7ff9f984dac",
      traps: [
        {
          title: "Judging a fraction by the size of its numbers",
          body:
            "\\(\\frac{9}{70}\\) has bigger numbers than \\(\\frac{2}{3}\\) but is far smaller: about 0.13 against 0.67. Compare values, not the size of the top and bottom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscsifr-continued",
      name: "Continued fractions",
      intuition:
        "A continued fraction has a fraction inside the denominator of a fraction, several levels deep. You cannot start at the top. Start at the bottom, turn each level into one fraction, and climb.",
      definition:
        "- Work from the **lowest** level: write the last \\(a + \\frac{1}{b}\\) as one fraction, flip it, add it to the level above, and repeat.\n" +
        "- **One over a fraction** is that fraction upside down: \\(\\frac{1}{\\;2/7\\;} = \\frac{7}{2}\\).\n" +
        "- When a letter sits inside, simplify the levels the same way, then solve the equation that is left.\n" +
        "- **Fast check:** if every lower level is at least 1, the value lies between the top whole number and one more than it. For \\(2 + \\frac{1}{3 + \\dots}\\) the value is between 2 and 3, which often removes two options.",
      formula: {
        label: "Building one level",
        latex: "a + \\frac{1}{b} = \\frac{ab + 1}{b} \\qquad \\frac{1}{\\;p/q\\;} = \\frac{q}{p}",
      },
      authoredExample: {
        prompt: "Find \\(3 + \\frac{1}{1 + \\frac{1}{4 + \\frac{1}{3}}}\\).",
        steps: [
          "Bottom level: \\(4 + \\frac{1}{3} = \\frac{13}{3}\\), so \\(\\frac{1}{13/3} = \\frac{3}{13}\\).",
          "Next: \\(1 + \\frac{3}{13} = \\frac{16}{13}\\), so its reciprocal is \\(\\frac{13}{16}\\).",
          "Top: \\(3 + \\frac{13}{16} = \\frac{61}{16}\\), which lies between 3 and 4 as the fast check says.",
        ],
        answer: "\\(\\frac{61}{16} = 3\\frac{13}{16}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(1 + \\frac{1}{3 + \\frac{1}{1 + \\frac{1}{2}}}\\).",
        steps: [
          "\\(1 + \\frac{1}{2} = \\frac{3}{2}\\), reciprocal \\(\\frac{2}{3}\\).",
          "\\(3 + \\frac{2}{3} = \\frac{11}{3}\\), reciprocal \\(\\frac{3}{11}\\).",
          "\\(1 + \\frac{3}{11} = \\frac{14}{11}\\).",
        ],
        answer: "\\(\\frac{14}{11}\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\frac{1}{\\;2/7\\;}\\)?", answer: "\\(\\frac{7}{2}\\)" },
        { prompt: "Write \\(2 + \\frac{1}{5}\\) as a single fraction.", answer: "\\(\\frac{11}{5}\\)" },
        { prompt: "What is \\(1 + \\frac{1}{1 + \\frac{1}{1}}\\)?", answer: "\\(\\frac{3}{2}\\)" },
        {
          prompt: "Solve \\(\\frac{1}{1 + \\frac{1}{x}} = \\frac{2}{3}\\).",
          answer: "\\(x = 2\\)",
          method: "Flip both sides: \\(1 + \\frac{1}{x} = \\frac{3}{2}\\), so \\(\\frac{1}{x} = \\frac{1}{2}\\).",
        },
      ],
      pyqExampleId: "367e4e44-00a9-42ca-a398-9b756afec919",
      traps: [
        {
          title: "Starting a continued fraction from the top",
          body:
            "In \\(2 + \\frac{1}{3 + \\frac{1}{2}}\\) you cannot add 2 and 1 first. The bottom gives \\(3 + \\frac{1}{2} = \\frac{7}{2}\\), its reciprocal is \\(\\frac{2}{7}\\), and the value is \\(2 + \\frac{2}{7} = \\frac{16}{7}\\).",
        },
      ],
    },
  ],
};
