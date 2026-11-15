import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_PP_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Percentage Basics",
  title: "Percentage Basics",
  oneLineDefinition:
    "A percentage is a fraction with 100 underneath: swap it for its simple fraction, read 'a% of A equals b% of B' as a ratio, and always ask which number a 'more than' or 'less than' is measured from.",
  whyItMatters:
    "11 questions in the Tier II bank, every one of them EASY. They are the quickest marks in the chapter, and every later page leans on the fractions and the changing base taught here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ppba-fraction",
      name: "Percentage as a fraction",
      intuition:
        "Per cent means 'out of a hundred', so every percentage is a fraction in disguise. A fast student swaps the percentage for its fraction first and only then multiplies, because \\(\\frac{3}{8}\\) of a number is far quicker than 37.5% of it.",
      definition:
        "- \\(x\\%\\) of \\(N\\) is \\(\\frac{x}{100} \\times N\\).\n" +
        "- Learn these by heart: \\(12\\frac{1}{2}\\% = \\frac{1}{8}\\), \\(16\\frac{2}{3}\\% = \\frac{1}{6}\\), \\(33\\frac{1}{3}\\% = \\frac{1}{3}\\), \\(37\\frac{1}{2}\\% = \\frac{3}{8}\\), \\(62\\frac{1}{2}\\% = \\frac{5}{8}\\), \\(66\\frac{2}{3}\\% = \\frac{2}{3}\\), \\(83\\frac{1}{3}\\% = \\frac{5}{6}\\), \\(11\\frac{1}{9}\\% = \\frac{1}{9}\\), \\(14\\frac{2}{7}\\% = \\frac{1}{7}\\).\n" +
        "- 'x% of y% of N' multiplies the fractions. The order does not matter, so cancel before you multiply.\n" +
        "- **Swap trick:** \\(x\\%\\) of \\(y\\) equals \\(y\\%\\) of \\(x\\). So 8% of 25 is 25% of 8, which is 2.",
      formula: {
        label: "A percentage of a number",
        latex: "x\\% \\text{ of } N = \\frac{x}{100} \\times N",
      },
      authoredExample: {
        prompt: "Find \\(37\\frac{1}{2}\\%\\) of \\(62\\frac{1}{2}\\%\\) of 1,280.",
        steps: [
          "\\(37\\frac{1}{2}\\% = \\frac{3}{8}\\) and \\(62\\frac{1}{2}\\% = \\frac{5}{8}\\).",
          "\\(1280 \\times \\frac{5}{8} = 800\\).",
          "\\(800 \\times \\frac{3}{8} = 300\\).",
        ],
        answer: "300",
      },
      selfCheckExample: {
        prompt: "Find \\(16\\frac{2}{3}\\%\\) of \\(14\\frac{2}{7}\\%\\) of 8,400.",
        steps: ["\\(14\\frac{2}{7}\\% = \\frac{1}{7}\\), so \\(8400 \\times \\frac{1}{7} = 1200\\).", "\\(16\\frac{2}{3}\\% = \\frac{1}{6}\\), so \\(1200 \\times \\frac{1}{6} = 200\\)."],
        answer: "200",
      },
      practiceSet: [
        { prompt: "Find \\(83\\frac{1}{3}\\%\\) of 2,400.", answer: "2,000", method: "\\(\\frac{5}{6} \\times 2400\\)" },
        { prompt: "Find 4% of 75 by swapping it for 75% of 4.", answer: "3" },
        { prompt: "45% of a number is 27. Find 80% of the same number.", answer: "48", method: "The number is \\(27 \\div 0.45 = 60\\)." },
      ],
      pyqExampleId: "d543c602-6546-4278-8f6d-f6e0fdc1d70c",
      traps: [
        {
          title: "Reading a mixed-number percentage as a fraction",
          body: "\\(3\\frac{1}{4}\\%\\) is \\(\\frac{13}{4} \\div 100 = \\frac{13}{400}\\), not \\(\\frac{3}{4}\\). Put the whole percentage over 100 first.",
        },
        {
          title: "Multiplying the percentage signs",
          body: "20% of 30% is \\(0.2 \\times 0.3 = 0.06\\), which is 6%, not 600%. Change each percentage to a fraction before you multiply.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ppba-equations",
      name: "Equations with percentages",
      intuition:
        "A stem that says 'a% of A equals b% of B' is telling you the ratio of A to B. Turn it into that ratio first, and most of these questions end in one line.",
      definition:
        "- \\(a\\%\\) of A \\(=\\) \\(b\\%\\) of B gives \\(A : B = b : a\\). The bigger percentage sits with the smaller number.\n" +
        "- 'B is \\(x\\%\\) of A' means \\(x = \\frac{B}{A} \\times 100\\).\n" +
        "- A bracket inside the percentage, like \\((x + 20)\\%\\) of 250, is just \\(\\frac{x + 20}{100} \\times 250\\): solve the linear equation that follows.\n" +
        "- Check by putting the answer back. Both sides must give the same number.",
      formula: {
        label: "Equal percentages as a ratio",
        latex: "\\frac{a}{100}A = \\frac{b}{100}B \\;\\Rightarrow\\; \\frac{A}{B} = \\frac{b}{a}",
      },
      authoredExample: {
        prompt: "If 35% of P equals 21% of Q, what percentage of P is Q?",
        steps: [
          "\\(0.35P = 0.21Q\\), so \\(\\frac{Q}{P} = \\frac{35}{21} = \\frac{5}{3}\\).",
          "Q is \\(\\frac{5}{3} \\times 100 = 166\\frac{2}{3}\\%\\) of P.",
        ],
        answer: "\\(166\\frac{2}{3}\\%\\)",
      },
      selfCheckExample: {
        prompt: "If 15% of (M + N) equals 25% of (M − N), find M as a percentage of N.",
        steps: ["\\(0.15M + 0.15N = 0.25M - 0.25N\\).", "\\(0.4N = 0.1M\\), so \\(M = 4N\\), which is 400% of N."],
        answer: "400%",
      },
      practiceSet: [
        { prompt: "If 48% of A equals 36% of B, find A : B.", answer: "3 : 4" },
        { prompt: "If \\((x + 10)\\%\\) of 300 equals 90, find \\(x\\).", answer: "20", method: "\\(3(x + 10) = 90\\)" },
        { prompt: "60% of a number is 12 more than 50% of it. Find the number.", answer: "120", method: "10% of the number is 12." },
      ],
      pyqExampleId: "8251c8b3-1878-497c-ac4f-d39eb78b1afe",
      traps: [
        {
          title: "Turning the ratio upside down",
          body: "From 20% of A = 50% of B, A is the larger number: \\(A : B = 50 : 20 = 5 : 2\\). A small percentage of A can only match a big percentage of B if A is bigger.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ppba-base",
      name: "More than and less than: the changing base",
      intuition:
        "'More than B' is measured from B; 'less than A' is measured from A. The gap between the two numbers is the same, but it is divided by a different base, so the two percentages are never equal.",
      definition:
        "- If A is \\(r\\%\\) more than B, then B is \\(\\frac{r}{100 + r} \\times 100\\%\\) less than A.\n" +
        "- If A is \\(r\\%\\) less than B, then B is \\(\\frac{r}{100 - r} \\times 100\\%\\) more than A.\n" +
        "- Two numbers that are \\(a\\%\\) and \\(b\\%\\) more than a third are in the ratio \\((100 + a) : (100 + b)\\).\n" +
        "- **Fast route:** write the change as a fraction. 25% more is \\(\\frac{5}{4}\\); going back is \\(\\frac{4}{5}\\), which is 20% less.",
      formula: {
        label: "Going back after an increase",
        latex: "\\text{decrease}\\% = \\frac{r}{100 + r} \\times 100",
      },
      authoredExample: {
        prompt: "A's salary is 25% more than B's. By what percentage is B's salary less than A's?",
        steps: ["Take B = 100, so A = 125.", "The gap is 25, measured from A: \\(\\frac{25}{125} \\times 100 = 20\\%\\)."],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "P is 20% less than Q. By what percentage is Q more than P?",
        steps: ["Take Q = 100, so P = 80.", "The gap is 20, measured from P: \\(\\frac{20}{80} \\times 100 = 25\\%\\)."],
        answer: "25%",
      },
      practiceSet: [
        { prompt: "X is 50% more than Y. By what percentage is Y less than X?", answer: "\\(33\\frac{1}{3}\\%\\)" },
        { prompt: "A first number exceeds a third by 25%, and a second number exceeds the same third by 50%. Find the ratio of the first to the second.", answer: "5 : 6", method: "\\(125 : 150\\)" },
        { prompt: "One price is 40% less than another. By what percentage is the second price more than the first?", answer: "\\(66\\frac{2}{3}\\%\\)", method: "\\(\\frac{40}{60} \\times 100\\)" },
      ],
      pyqExampleId: "9edcecc8-c6fd-41b1-995b-a7ea8e7785be",
      traps: [
        {
          title: "Using the same base both ways",
          body: "If A is 100% more than B (double), B is 50% less than A, not 100% less. The way back is always measured from the bigger number.",
        },
      ],
    },
  ],
};
