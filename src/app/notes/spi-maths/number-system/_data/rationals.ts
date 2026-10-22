import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_NS_RATIONALS_NOTE: SubtopicNote = {
  subtopicName: "Fractions and Rational Numbers",
  title: "Fractions and Rational Numbers",
  oneLineDefinition:
    "A rational number is one integer divided by another non-zero integer; you compare, add and take fractions of them with a common denominator.",
  whyItMatters:
    "Ten questions in the bank, six EASY and four MODERATE. Three test what a rational number is and which one lies between two others, four are fraction sums and word problems, and three turn a recurring decimal into a fraction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spinsra-rational",
      name: "Rational numbers and comparing them",
      intuition:
        "A rational number is any number you can write as a fraction of two integers. To compare two of them, give them the same denominator or turn both into decimals, then read them on the number line.",
      definition:
        "- A **rational number** is \\(\\frac{p}{q}\\) where \\(p\\) and \\(q\\) are integers and \\(q \\ne 0\\).\n" +
        "- The numerator may be 0: \\(\\frac{0}{5} = 0\\) is rational. The denominator may be negative: \\(\\frac{3}{-4} = -\\frac{3}{4}\\). Only a zero denominator is barred.\n" +
        "- Every integer is rational: \\(7 = \\frac{7}{1}\\).\n" +
        "- On the negative side, a bigger size means a smaller number: \\(-\\frac{1}{2} < -\\frac{1}{4}\\).\n" +
        "- Between any two rationals lies another, for example their average.",
      formula: {
        label: "Rational number",
        latex: "\\frac{p}{q}, \\quad p, q \\text{ integers}, \\quad q \\ne 0 \\qquad \\text{a number between } x \\text{ and } y: \\frac{x + y}{2}",
      },
      authoredExample: {
        prompt:
          "Which of \\(-\\frac{3}{4}\\), \\(-\\frac{2}{5}\\) and \\(-\\frac{1}{2}\\) lies between \\(-\\frac{7}{10}\\) and \\(-\\frac{9}{20}\\)?",
        steps: [
          "As decimals the limits are \\(-0.7\\) and \\(-0.45\\).",
          "\\(-\\frac{3}{4} = -0.75\\) is below \\(-0.7\\), and \\(-\\frac{2}{5} = -0.4\\) is above \\(-0.45\\).",
          "\\(-\\frac{1}{2} = -0.5\\) lies between them.",
        ],
        answer: "\\(-\\frac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\frac{2}{3}\\), \\(\\frac{3}{5}\\) and \\(\\frac{5}{8}\\) in increasing order.",
        steps: [
          "Common denominator 120: \\(\\frac{80}{120}\\), \\(\\frac{72}{120}\\), \\(\\frac{75}{120}\\).",
          "So \\(\\frac{3}{5} < \\frac{5}{8} < \\frac{2}{3}\\).",
        ],
        answer: "\\(\\frac{3}{5}, \\frac{5}{8}, \\frac{2}{3}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\frac{0}{7}\\) a rational number?", answer: "Yes, it equals 0." },
        { prompt: "Which is greater, \\(-\\frac{1}{3}\\) or \\(-\\frac{1}{2}\\)?", answer: "\\(-\\frac{1}{3}\\)" },
        { prompt: "Find a rational number between \\(\\frac{1}{4}\\) and \\(\\frac{1}{2}\\).", answer: "\\(\\frac{3}{8}\\) (their average; there are many others)" },
        { prompt: "Can the denominator of a rational number be a negative integer?", answer: "Yes, for example \\(\\frac{3}{-4}\\). It only cannot be 0." },
      ],
      pyqExampleId: "aa2365e3-070f-4f92-803c-d13c934772e3",
      traps: [
        {
          title: "Reading negative fractions by size",
          body: "\\(-\\frac{2}{3}\\) is less than \\(-\\frac{1}{5}\\), because it lies further left on the number line. Every number between two negatives is negative, so a positive option can never lie between them.",
        },
        {
          title: "Thinking the numerator cannot be 0",
          body: "\\(\\frac{0}{q}\\) is a rational number (it is 0) for any non-zero integer q. The rule that forbids 0 is for the denominator.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinsra-operations",
      name: "Adding fractions and taking a fraction of a number",
      intuition:
        "Fractions add only when they count the same size of piece, so first give them a common denominator. 'A fraction of' something means multiply. In a word problem, write each group as a fraction of the whole before you use any number.",
      definition:
        "- Add or subtract over the **LCM of the denominators**: \\(\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}\\).\n" +
        "- \\(\\frac{a}{b}\\) **of** \\(N\\) means \\(\\frac{a}{b} \\times N\\).\n" +
        "- A fraction **of the rest** multiplies the fraction that is left: \\(\\frac{1}{2}\\) of the remaining \\(\\frac{3}{5}\\) is \\(\\frac{3}{10}\\) of the whole.\n" +
        "- 'What must be subtracted from \\(a\\) to get \\(b\\)?' The answer is \\(a - b\\). 'What must be added to \\(a\\) to get \\(b\\)?' The answer is \\(b - a\\).",
      formula: {
        label: "Fraction sums and parts",
        latex: "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd} \\qquad \\frac{a}{b} \\text{ of } N = \\frac{a}{b} \\times N",
      },
      authoredExample: {
        prompt:
          "In a class, \\(\\frac{1}{3}\\) of the students play cricket and \\(\\frac{1}{4}\\) play football. Half of the rest play chess, and the other 15 play nothing. How many students are in the class?",
        steps: [
          "The rest: \\(1 - \\frac{1}{3} - \\frac{1}{4} = \\frac{12 - 4 - 3}{12} = \\frac{5}{12}\\).",
          "Those who play nothing are half of that: \\(\\frac{5}{24}\\) of the class.",
          "\\(\\frac{5}{24}\\) of the class is 15, so the class has \\(15 \\times \\frac{24}{5} = 72\\) students.",
          "Check: 24 cricket, 18 football, 30 left, 15 chess, 15 nothing.",
        ],
        answer: "72",
      },
      selfCheckExample: {
        prompt: "What should be added to \\(-\\frac{3}{8}\\) to get \\(\\frac{1}{4}\\)?",
        steps: ["Answer \\(= \\frac{1}{4} - \\left(-\\frac{3}{8}\\right) = \\frac{2}{8} + \\frac{3}{8} = \\frac{5}{8}\\)."],
        answer: "\\(\\frac{5}{8}\\)",
      },
      practiceSet: [
        { prompt: "Find \\(\\frac{2}{3} + \\frac{1}{6}\\).", answer: "\\(\\frac{5}{6}\\)" },
        { prompt: "Find \\(\\frac{-5}{6} - \\frac{1}{3}\\).", answer: "\\(\\frac{-7}{6}\\)" },
        { prompt: "Find \\(\\frac{3}{5}\\) of 85.", answer: "51" },
        { prompt: "By how much is \\(\\frac{1}{2}\\) of 90 more than \\(\\frac{2}{5}\\) of 80?", answer: "\\(45 - 32 = 13\\)" },
      ],
      pyqExampleId: "f65a1bc0-cbb6-4cc8-afb4-449f3e14d5d5",
      traps: [
        {
          title: "Taking a fraction of the whole instead of the rest",
          body: "If half of the remaining people stay home, multiply \\(\\frac{1}{2}\\) by the fraction that remains. Taking \\(\\frac{1}{2}\\) of the whole group gives a wrong total.",
        },
        {
          title: "Adding the denominators",
          body: "\\(\\frac{1}{2} + \\frac{1}{3}\\) is \\(\\frac{5}{6}\\), not \\(\\frac{2}{5}\\). Only the numerators add, and only after the denominators are made the same.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinsra-recurring",
      name: "Recurring decimals as fractions",
      intuition:
        "A decimal that repeats forever is still a fraction. Multiply by 10 for every digit in the repeating block, subtract the original, and the endless tail cancels.",
      definition:
        "- \\(0.\\overline{6}\\) means \\(0.666\\ldots\\) and \\(0.\\overline{45}\\) means \\(0.4545\\ldots\\)\n" +
        "- A one-digit block over 9, a two-digit block over 99: \\(0.\\overline{7} = \\frac{7}{9}\\), \\(0.\\overline{12} = \\frac{12}{99}\\).\n" +
        "- Keep the whole-number part outside: \\(4.\\overline{2} = 4 + \\frac{2}{9} = \\frac{38}{9}\\).\n" +
        "- A fraction in lowest terms gives a decimal that **ends** when its denominator has no prime factors but 2 and 5; otherwise the decimal **recurs**.\n" +
        "- Every terminating or recurring decimal is rational.",
      formula: {
        label: "Pure recurring decimals",
        latex: "0.\\overline{a} = \\frac{a}{9} \\qquad 0.\\overline{ab} = \\frac{ab}{99}",
        symbols: [{ symbol: "ab", meaning: "the two-digit block that repeats, read as one number" }],
      },
      authoredExample: {
        prompt: "Write \\(0.\\overline{27}\\) as a fraction in lowest terms.",
        steps: [
          "Let \\(x = 0.2727\\ldots\\) The block has two digits, so multiply by 100: \\(100x = 27.2727\\ldots\\)",
          "Subtract: \\(99x = 27\\), so \\(x = \\frac{27}{99}\\).",
          "Divide top and bottom by 9: \\(\\frac{3}{11}\\).",
        ],
        answer: "\\(\\frac{3}{11}\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(3.\\overline{4}\\) as a fraction.",
        steps: ["\\(3.\\overline{4} = 3 + \\frac{4}{9} = \\frac{27 + 4}{9} = \\frac{31}{9}\\)."],
        answer: "\\(\\frac{31}{9}\\)",
      },
      practiceSet: [
        { prompt: "Write \\(0.\\overline{5}\\) as a fraction.", answer: "\\(\\frac{5}{9}\\)" },
        { prompt: "Write \\(0.\\overline{81}\\) as a fraction in lowest terms.", answer: "\\(\\frac{81}{99} = \\frac{9}{11}\\)" },
        { prompt: "Find \\(0.\\overline{3} + 0.\\overline{6}\\).", answer: "\\(\\frac{3}{9} + \\frac{6}{9} = 1\\)" },
        { prompt: "Does \\(\\frac{7}{40}\\) give a terminating decimal?", answer: "Yes: \\(40 = 2^3 \\times 5\\), and \\(\\frac{7}{40} = 0.175\\)." },
      ],
      pyqExampleId: "b93d0d3b-9563-400b-8daa-c1ed01fba0a9",
      traps: [
        {
          title: "Putting the whole part into the block",
          body: "\\(3.\\overline{18}\\) is \\(3 + \\frac{18}{99} = \\frac{35}{11}\\), not \\(\\frac{318}{99}\\). Only the repeating digits go over the nines.",
        },
        {
          title: "Mixing up where the bar starts",
          body: "\\(0.\\overline{45}\\) is \\(0.4545\\ldots\\), but \\(0.4\\overline{5}\\) is \\(0.4555\\ldots\\). They are different numbers, and both can appear among the options.",
        },
      ],
    },
  ],
};
