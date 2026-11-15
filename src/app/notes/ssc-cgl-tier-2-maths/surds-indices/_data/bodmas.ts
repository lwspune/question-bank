import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_SI_BODMAS_NOTE: SubtopicNote = {
  subtopicName: "BODMAS and Brackets",
  title: "BODMAS and Brackets",
  oneLineDefinition:
    "Everyone reaches the same value for a long sum only by working in one agreed order: brackets from the inside out, then 'of', then division and multiplication from the left, then addition and subtraction.",
  whyItMatters:
    "14 questions in the Tier II bank, 8 EASY and 6 MODERATE. Every one is lost by working in the wrong order or by grinding decimals that a simple identity would cancel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2sibo-order",
      name: "The order of operations",
      intuition:
        "A long string of operations has one right answer only if everyone works in the same order: brackets from the inside out, then 'of', then division and multiplication from left to right, then addition and subtraction.",
      definition:
        "- Order: brackets (innermost first), 'of', \\(\\div\\) and \\(\\times\\) from left to right, \\(+\\) and \\(-\\) from left to right.\n" +
        "- 'of' means multiply, but it is done BEFORE a division next to it: \\(3 \\div 18\\) of \\(3 = 3 \\div 54\\).\n" +
        "- \\(\\div\\) and \\(\\times\\) have equal rank, so work them strictly left to right: \\(12 \\div 4 \\times 3 = 9\\), not 1.\n" +
        "- A minus sign in front of a bracket changes the sign of everything inside it.",
      formula: {
        label: "Order of work",
        latex: "\\text{brackets} \\to \\text{of} \\to \\div, \\times \\text{ (left to right)} \\to +, - \\text{ (left to right)}",
      },
      authoredExample: {
        prompt: "Find \\(48 \\div 4\\) of \\(3 \\times 2 + 10 - 6 \\div 2\\).",
        steps: ["'of' first: 4 of 3 is 12, so \\(48 \\div 12 = 4\\).", "Then \\(4 \\times 2 = 8\\) and \\(6 \\div 2 = 3\\).", "\\(8 + 10 - 3 = 15\\)."],
        answer: "15",
      },
      selfCheckExample: {
        prompt: "Find \\(50 - [20 - \\{12 - (8 - 5)\\}]\\).",
        steps: ["\\(8 - 5 = 3\\); \\(12 - 3 = 9\\); \\(20 - 9 = 11\\).", "\\(50 - 11 = 39\\)."],
        answer: "39",
      },
      practiceSet: [
        { prompt: "Find \\(18 \\div 3 \\times 2\\).", answer: "12" },
        { prompt: "Find \\(7 + 3 \\times 4 - 10 \\div 5\\).", answer: "17" },
        { prompt: "Find \\(36 \\div 2\\) of \\(9 + 4\\).", answer: "6", method: "2 of 9 is 18." },
      ],
      pyqExampleId: "90e2ec1b-33e5-4292-85ad-5c291599b752",
      traps: [
        {
          title: "Multiplying before a division on its left",
          body: "\\(24 \\div 6 \\times 2\\) is \\(4 \\times 2 = 8\\), worked from the left. Doing the multiplication first gives \\(24 \\div 12 = 2\\), which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2sibo-mixed",
      name: "Mixed numbers and 'of'",
      intuition:
        "Long fraction expressions get easier the moment every mixed number becomes an improper fraction. Then cancel across before you multiply, and the numbers stay small.",
      definition:
        "- \\(2\\frac{4}{5} = \\frac{14}{5}\\): whole number times the denominator, plus the numerator, over the denominator.\n" +
        "- Dividing by a fraction is multiplying by its reciprocal.\n" +
        "- Cancel common factors across tops and bottoms before you multiply.\n" +
        "- Bring each bracket to one fraction, then combine the brackets.",
      formula: {
        label: "Mixed numbers and division",
        latex: "a\\frac{b}{c} = \\frac{ac + b}{c}, \\quad \\frac{p}{q} \\div \\frac{r}{s} = \\frac{p}{q} \\times \\frac{s}{r}",
      },
      authoredExample: {
        prompt: "Find \\(\\left(1\\frac{1}{3}\\text{ of } 2\\frac{1}{4}\\right) \\div \\left(1\\frac{1}{2}\\text{ of } \\frac{2}{3}\\right)\\).",
        steps: ["\\(\\frac{4}{3} \\times \\frac{9}{4} = 3\\).", "\\(\\frac{3}{2} \\times \\frac{2}{3} = 1\\).", "\\(3 \\div 1 = 3\\)."],
        answer: "3",
      },
      selfCheckExample: {
        prompt: "Find \\(3\\frac{1}{2} \\div 1\\frac{3}{4}\\) of \\(2 + \\frac{1}{3}\\).",
        steps: ["'of' first: \\(\\frac{7}{4} \\times 2 = \\frac{7}{2}\\).", "\\(\\frac{7}{2} \\div \\frac{7}{2} = 1\\), and \\(1 + \\frac{1}{3} = \\frac{4}{3}\\)."],
        answer: "\\(\\frac{4}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\frac{3}{5}\\) of \\(2\\frac{1}{2}\\).", answer: "\\(\\frac{3}{2}\\)" },
        { prompt: "Find \\(2\\frac{2}{3} \\div 1\\frac{1}{3}\\).", answer: "2" },
        { prompt: "Find \\(\\left(\\frac{5}{6} - \\frac{1}{3}\\right) \\div \\frac{1}{4}\\).", answer: "2" },
      ],
      pyqExampleId: "4b983355-b41b-4f0f-8815-54e692f2ad06",
      traps: [
        {
          title: "Doing the division before 'of'",
          body: "In \\(6 \\div 2\\) of 3, the 'of' comes first: \\(6 \\div 6 = 1\\). Working left to right as \\((6 \\div 2) \\times 3 = 9\\) ignores the rule.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2sibo-identity",
      name: "Spotting an identity in decimal arithmetic",
      intuition:
        "When a decimal sum looks brutal, look for a difference of squares or a common factor. Numbers like \\(20.35^2 - 8.35^2\\) and \\(1.05^2 + 1.05 \\times 27.65\\) are built to cancel.",
      definition:
        "- \\(a^2 - b^2 = (a - b)(a + b)\\): when \\(a - b\\) is a round number, the product is easy.\n" +
        "- \\(a^2 + ab = a(a + b)\\): take the common a out.\n" +
        "- Matching brackets above and below the line cancel completely.\n" +
        "- Decimals that are simple multiples of each other (0.0203 is \\(0.7 \\times 0.029\\)) cancel the same way.",
      formula: {
        label: "Two identities for quick arithmetic",
        latex: "a^2 - b^2 = (a - b)(a + b), \\quad a^2 + ab = a(a + b)",
      },
      authoredExample: {
        prompt: "Find \\((6.75^2 - 3.25^2) \\div 10\\).",
        steps: ["\\(6.75^2 - 3.25^2 = (6.75 - 3.25)(6.75 + 3.25) = 3.5 \\times 10 = 35\\).", "\\(35 \\div 10 = 3.5\\)."],
        answer: "3.5",
      },
      selfCheckExample: {
        prompt: "Find \\(\\dfrac{0.5^2 + 0.5 \\times 9.5}{2.5^2 - 1.5^2}\\).",
        steps: ["Top: \\(0.5(0.5 + 9.5) = 5\\).", "Bottom: \\((2.5 - 1.5)(2.5 + 1.5) = 4\\). Value \\(= 1.25\\)."],
        answer: "1.25",
      },
      practiceSet: [
        { prompt: "Find \\(105^2 - 95^2\\).", answer: "2,000" },
        { prompt: "Find \\(1.2^2 + 1.2 \\times 8.8\\).", answer: "12" },
        { prompt: "Find \\((7.3^2 - 2.7^2) \\div 4.6\\).", answer: "10" },
      ],
      pyqExampleId: "d51feaf8-4e47-4760-9bcb-4468e41acc30",
      traps: [
        {
          title: "Squaring every decimal",
          body: "Working out two squares of long decimals takes a minute and invites a slip; \\((a - b)(a + b)\\) with a round \\(a - b\\) takes seconds. Look for the identity before you multiply.",
        },
      ],
    },
  ],
};
