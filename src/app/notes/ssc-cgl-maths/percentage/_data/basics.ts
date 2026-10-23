import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Percentage Basics",
  title: "Percentage Basics",
  oneLineDefinition:
    "A percentage is a fraction with 100 at the bottom: x% of a number is x hundredths of it, and every percentage is measured against a base.",
  whyItMatters:
    "31 questions in the bank, 29 of them EASY and 22 from 2025 alone. They are one-line sums (a percentage of a number, the whole from a part, a ratio from equal percentages, more than and less than), so they are the marks to bank in under 30 seconds each. Speed comes from knowing the common percentages as fractions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscppba-of",
      name: "Percentage of a quantity and finding the whole",
      intuition:
        "Per cent means 'out of 100'. So 35% of something is 35 parts in every 100 parts of it. If you know the size of a part and its percentage, you can scale back up to the whole.",
      definition:
        "- \\(x\\%\\) of \\(N\\) is \\(\\frac{x}{100} \\times N\\).\n" +
        "- If \\(x\\%\\) of a whole is \\(A\\), the whole is \\(\\frac{A \\times 100}{x}\\).\n" +
        "- Shares of the **same** whole add up to \\(100\\%\\). If 30% and 45% are used, 25% is left.\n" +
        "- **Fast route:** \\(10\\%\\) is the number with the decimal point moved one place, \\(1\\%\\) two places. Build any percentage from these: \\(35\\% = 10\\% + 10\\% + 10\\% + 5\\%\\).\n" +
        "- Put both amounts in the same unit before you divide (litres with litres, paise with paise).",
      formula: {
        label: "Part and whole",
        latex: "x\\% \\text{ of } N = \\frac{x}{100} \\times N \\qquad \\text{whole} = \\frac{\\text{part} \\times 100}{x}",
      },
      authoredExample: {
        prompt: "A school has 640 students and 35% of them come by bus. How many students come by bus?",
        steps: [
          "\\(10\\%\\) of 640 is 64, so \\(30\\%\\) is \\(3 \\times 64 = 192\\).",
          "\\(5\\%\\) is half of \\(10\\%\\), which is 32.",
          "\\(35\\% = 192 + 32 = 224\\). Check: \\(\\frac{35}{100} \\times 640 = 224\\).",
        ],
        answer: "224 students",
      },
      selfCheckExample: {
        prompt: "18 is 15% of which number?",
        steps: ["Whole \\(= \\frac{18 \\times 100}{15}\\).", "\\(= \\frac{1800}{15} = 120\\)."],
        answer: "120",
      },
      practiceSet: [
        { prompt: "Find 15% of 480.", answer: "72 (10% is 48 and 5% is 24)" },
        { prompt: "What is 0.5% of 3,600?", answer: "18" },
        { prompt: "45 is 9% of which number?", answer: "500" },
        {
          prompt: "A club spends 45% of its fund on books and 30% on trips, and ₹1,500 of the fund is left. How large was the fund?",
          answer: "₹6,000 (₹1,500 is the remaining 25%)",
        },
      ],
      pyqExampleId: "1290c6d3-79c5-47cc-a4ce-56a42c1e2c7b",
      traps: [
        {
          title: "Answering the part that was given",
          body:
            "When a question asks for the part left over (empty, saved, spent on other things), take the given shares away from 100% first. A 5 L can holding 4 L is 80% full, so the empty share asked for is 20%.",
        },
        {
          title: "Mixing units",
          body:
            "A percentage compares like with like. 0.002 kilolitres is 2,000 millilitres, so change every amount to one unit before dividing.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscppba-fractions",
      name: "Common percentages as fractions",
      intuition:
        "SSC numbers are chosen to divide cleanly by a friendly fraction. \\(12\\frac{1}{2}\\%\\) of 720 is just \\(720 \\div 8 = 90\\), one step instead of a long multiplication. Learn this table both ways and most percentage sums become a single division.",
      definition:
        "- A percentage with a fraction in it, such as \\(33\\frac{1}{3}\\%\\), is almost always a simple fraction in disguise.\n" +
        "- Build new ones from the table: \\(37\\frac{1}{2}\\% = 3 \\times 12\\frac{1}{2}\\% = \\frac{3}{8}\\), and \\(83\\frac{1}{3}\\% = 5 \\times 16\\frac{2}{3}\\% = \\frac{5}{6}\\).\n" +
        "- Keep recurring ones as fractions until the last step; rounding early gives a wrong option.",
      table: {
        columns: ["Fraction", "Percentage"],
        rows: [
          { cells: ["\\(\\frac{1}{2}\\)", "\\(50\\%\\)"] },
          { cells: ["\\(\\frac{1}{3}\\)", "\\(33\\frac{1}{3}\\%\\)"] },
          { cells: ["\\(\\frac{2}{3}\\)", "\\(66\\frac{2}{3}\\%\\)"] },
          { cells: ["\\(\\frac{1}{4}\\)", "\\(25\\%\\)"] },
          { cells: ["\\(\\frac{1}{5}\\)", "\\(20\\%\\)"] },
          { cells: ["\\(\\frac{1}{6}\\)", "\\(16\\frac{2}{3}\\%\\)"] },
          { cells: ["\\(\\frac{1}{7}\\)", "\\(14\\frac{2}{7}\\%\\)"] },
          { cells: ["\\(\\frac{1}{8}\\)", "\\(12\\frac{1}{2}\\%\\)"] },
          { cells: ["\\(\\frac{3}{8}\\)", "\\(37\\frac{1}{2}\\%\\)"] },
          { cells: ["\\(\\frac{5}{8}\\)", "\\(62\\frac{1}{2}\\%\\)"] },
          { cells: ["\\(\\frac{1}{9}\\)", "\\(11\\frac{1}{9}\\%\\)"] },
          { cells: ["\\(\\frac{1}{11}\\)", "\\(9\\frac{1}{11}\\%\\)"] },
          {
            cells: ["\\(\\frac{1}{12}\\)", "\\(8\\frac{1}{3}\\%\\)"],
            noteAmber: "Easy to confuse with one eighth, which is 12½%.",
          },
          { cells: ["\\(\\frac{1}{16}\\)", "\\(6\\frac{1}{4}\\%\\)"] },
          { cells: ["\\(\\frac{1}{20}\\)", "\\(5\\%\\)"] },
          { cells: ["\\(\\frac{1}{25}\\)", "\\(4\\%\\)"] },
        ],
        caption: "To use a row, divide by the bottom of the fraction and multiply by the top.",
      },
      selfCheckExample: {
        prompt: "Find \\(16\\frac{2}{3}\\%\\) of 540.",
        steps: ["\\(16\\frac{2}{3}\\% = \\frac{1}{6}\\).", "\\(540 \\div 6 = 90\\)."],
        answer: "90",
      },
      practiceSet: [
        { prompt: "Write \\(62\\frac{1}{2}\\%\\) as a fraction.", answer: "\\(\\frac{5}{8}\\)" },
        { prompt: "Find \\(11\\frac{1}{9}\\%\\) of 360.", answer: "40" },
        { prompt: "Which percentage is equal to \\(\\frac{3}{8}\\)?", answer: "\\(37\\frac{1}{2}\\%\\)" },
        { prompt: "Find \\(83\\frac{1}{3}\\%\\) of 120.", answer: "100" },
      ],
      pyqExampleId: "cf5aa74f-9c74-4194-8dc5-7b22092b9486",
      traps: [
        {
          title: "Rounding a recurring percentage too early",
          body:
            "\\(33\\%\\) of 900 is 297, but \\(33\\frac{1}{3}\\%\\) of 900 is exactly 300. Use the fraction \\(\\frac{1}{3}\\), not 33.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppba-equal",
      name: "Equal percentages of two numbers give their ratio",
      intuition:
        "If 40% of A is the same as 24% of B, then A must be the smaller number: it takes a bigger share of A to match a smaller share of B. The two percentages, swapped, give the ratio.",
      definition:
        "- From \\(\\frac{a}{100}A = \\frac{b}{100}B\\) we get \\(A : B = b : a\\).\n" +
        "- For three numbers with \\(a\\%\\) of A \\(=\\) \\(b\\%\\) of B \\(=\\) \\(c\\%\\) of C, set each equal to 1. Then \\(A = \\frac{100}{a}\\), \\(B = \\frac{100}{b}\\), \\(C = \\frac{100}{c}\\), and clear the fractions.\n" +
        "- A difference of two percentages of the **same** number is one percentage: \\(x\\%\\) of N minus \\(y\\%\\) of N is \\((x - y)\\%\\) of N.\n" +
        "- With brackets such as 25% of \\((P + Q)\\), multiply out, collect P on one side and Q on the other, then read the ratio.",
      formula: {
        label: "Equal percentages and differences",
        latex:
          "a\\% \\text{ of } A = b\\% \\text{ of } B \\implies A : B = b : a \\qquad x\\% \\text{ of } N - y\\% \\text{ of } N = (x - y)\\% \\text{ of } N",
      },
      authoredExample: {
        prompt: "If 40% of A is equal to 24% of B, find A : B.",
        steps: [
          "\\(0.40A = 0.24B\\).",
          "\\(\\frac{A}{B} = \\frac{0.24}{0.40} = \\frac{24}{40} = \\frac{3}{5}\\).",
          "Swap rule check: the percentages are 40 and 24, so \\(A : B = 24 : 40 = 3 : 5\\).",
        ],
        answer: "3 : 5",
      },
      selfCheckExample: {
        prompt: "35% of a number is 42 more than 28% of the same number. Find the number.",
        steps: ["The gap is \\(35\\% - 28\\% = 7\\%\\) of the number.", "\\(7\\%\\) is 42, so the number is \\(\\frac{42 \\times 100}{7} = 600\\)."],
        answer: "600",
      },
      practiceSet: [
        { prompt: "If 15% of x equals 25% of y, find x : y.", answer: "5 : 3" },
        { prompt: "If 20% of P = 30% of Q = 60% of R, find P : Q : R.", answer: "3 : 2 : 1" },
        { prompt: "If 60% of \\((A - B)\\) equals 40% of \\((A + B)\\), find A : B.", answer: "5 : 1" },
        { prompt: "The difference between 18% and 12% of a number is 54. Find the number.", answer: "900" },
      ],
      pyqExampleId: "ae602b2a-e363-472a-b3a3-ec671bf43c50",
      traps: [
        {
          title: "Writing the ratio the wrong way round",
          body:
            "When 40% of A equals 24% of B, A is the smaller number, so A : B is 24 : 40, which is 3 : 5. Writing 40 : 24 gives the reverse ratio, and SSC prints it as an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppba-base",
      name: "More than, less than and the changing base",
      intuition:
        "Every percentage is measured against a base: the number after 'than' or 'of'. If Rahul earns 25% more than Sumit, the base is Sumit's pay. Turn the sentence around and the base becomes Rahul's pay, which is bigger, so the percentage gets smaller.",
      definition:
        "- 'A is r% more than B' means \\(A = B\\left(1 + \\frac{r}{100}\\right)\\).\n" +
        "- Then B is less than A by \\(\\frac{r}{100 + r} \\times 100\\%\\).\n" +
        "- 'A is r% less than B' makes B more than A by \\(\\frac{r}{100 - r} \\times 100\\%\\).\n" +
        "- **Fast route:** call the base 100. If B is 100, A is 125; the gap of 25 out of 125 is 20%.\n" +
        "- **Fraction route:** a rise of \\(\\frac{1}{n}\\) is undone by a fall of \\(\\frac{1}{n + 1}\\). A rise of \\(\\frac{1}{4}\\) (25%) needs a fall of \\(\\frac{1}{5}\\) (20%).\n" +
        "- For a chain (A more than B, B more than C), call the last one 100 and walk up the chain one step at a time.",
      formula: {
        label: "Turning a comparison around",
        latex: "\\text{less by } \\frac{r}{100 + r} \\times 100\\% \\qquad \\text{more by } \\frac{r}{100 - r} \\times 100\\%",
        symbols: [{ symbol: "r", meaning: "the percentage in the original comparison" }],
      },
      authoredExample: {
        prompt: "Rahul earns 25% more than Sumit. By what percentage does Sumit earn less than Rahul?",
        steps: [
          "Let Sumit earn 100, so Rahul earns 125.",
          "Sumit is 25 less, and the base is now Rahul's 125.",
          "\\(\\frac{25}{125} \\times 100 = 20\\%\\). The formula gives the same: \\(\\frac{25}{125} \\times 100\\).",
        ],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "The price of rice is 20% less than the price of wheat. By what percentage is the price of wheat more than the price of rice?",
        steps: ["Let wheat be 100, so rice is 80.", "Wheat is 20 more on a base of 80: \\(\\frac{20}{80} \\times 100 = 25\\%\\)."],
        answer: "25%",
      },
      practiceSet: [
        { prompt: "A is 60% more than B. By what percentage is B less than A?", answer: "37.5%" },
        { prompt: "X is 10% less than Y. By what percentage is Y more than X?", answer: "\\(11\\frac{1}{9}\\%\\)" },
        { prompt: "P is 50% more than Q, and Q is 20% less than R. Find P : R.", answer: "6 : 5 (R = 100, Q = 80, P = 120)" },
        { prompt: "Two numbers are 20% and 50% more than a third number. Find the ratio of the two numbers.", answer: "4 : 5" },
      ],
      pyqExampleId: "f4253ccf-d00b-482e-95ac-bc636779e6ab",
      traps: [
        {
          title: "Using the same percentage both ways",
          body:
            "If A is 20% more than B, B is not 20% less than A. With B = 100 and A = 120, B is 20 less on a base of 120, which is \\(16\\frac{2}{3}\\%\\).",
        },
        {
          title: "Comparing against the wrong number",
          body:
            "In 'by what per cent is the wrong result more than the correct one', the base is the correct result. A wrong 150 against a correct 120 is 25% more, not 20%.",
        },
      ],
    },
  ],
};
