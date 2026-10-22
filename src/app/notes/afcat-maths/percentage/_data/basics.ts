import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Basic Percentage Calculations",
  title: "Percentage Basics: Of, What Percent, and the Whole",
  oneLineDefinition:
    "A percentage is a fraction out of 100: find x% of a number, say what percent one number is of another, and get the whole back from a part.",
  whyItMatters:
    "Only one question on this page is HARD, and two AFCAT past-year questions sit here, from 2016 and 2017. Both are one equation: a difference of two percentages of the same number. Marks are lost on units (minutes against days, grams against kilograms) and on dividing by the wrong base.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-percent-of",
      name: "x% of a number, and what percent one number is of another",
      intuition:
        "Per cent means per hundred. 35% of 260 is 35 hundredths of 260. Asking what percent 18 is of 90 is asking how many hundredths of 90 make 18.",
      definition:
        "- \\(x\\%\\) of \\(y\\) is \\(\\dfrac{x}{100} \\times y\\).\n" +
        "- \\(a\\) as a percentage of \\(b\\) is \\(\\dfrac{a}{b} \\times 100\\). The number after 'of' is the **base** and goes underneath.\n" +
        "- Put both quantities in the **same unit** first: hours into minutes, kilograms into grams.\n" +
        "- A percentage can pass 100: 40 is 800% of 5.\n" +
        "- \\(x\\%\\) of \\(y\\) equals \\(y\\%\\) of \\(x\\), so 8% of 25 is the same as 25% of 8, which is 2.",
      formula: {
        label: "Percent of, and as a percent",
        latex: "x\\% \\text{ of } y = \\dfrac{xy}{100}, \\qquad \\dfrac{a}{b} \\times 100 = \\text{a as a percentage of b}",
      },
      authoredExample: {
        prompt: "What percent of one and a half hours is 18 minutes?",
        steps: [
          "One and a half hours is 90 minutes, so both are in minutes.",
          "\\(\\dfrac{18}{90} \\times 100 = 20\\).",
        ],
        answer: "20%.",
      },
      selfCheckExample: {
        prompt: "What percent of 2 kg is 250 g?",
        steps: ["2 kg is 2,000 g.", "\\(\\dfrac{250}{2000} \\times 100 = 12.5\\)."],
        answer: "12.5%.",
      },
      practiceSet: [
        { prompt: "What percent of 60 is 45?", answer: "75%" },
        { prompt: "What is 35% of 260?", answer: "\\(91\\)" },
        { prompt: "What percent of 5 is 40?", answer: "800%" },
        { prompt: "What percent of a day is 90 minutes?", answer: "6.25%", method: "A day is 1,440 minutes." },
      ],
      pyqExampleId: "45bb5e22-4850-4995-a618-ba17e485cbb3",
      traps: [
        {
          title: "Convert the units first",
          body: "15 minutes of an hour is 25%, but dividing 15 by 1 gives 1,500%. Bring both quantities to minutes (or grams, or rupees) before dividing.",
        },
        {
          title: "The base follows 'of'",
          body: "'What percent of 80 is 20' divides by 80 and gives 25%. Dividing 80 by 20 answers a different question.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afpc-convert",
      name: "Fractions and their percentages",
      intuition:
        "Most AFCAT percentages are friendly fractions in disguise. 12.5% is one eighth and 16⅔% is one sixth, so '12.5% of 640' is just 640 divided by 8.",
      definition:
        "A fraction becomes a percentage when multiplied by 100, and a percentage becomes a fraction when divided by 100. Learn the unit fractions below; any other fraction is a multiple of one of them, so three sixteenths is \\(3 \\times 6.25\\% = 18.75\\%\\).",
      table: {
        columns: ["Fraction", "Percentage", "Use it like this"],
        rows: [
          { cells: ["\\(\\tfrac 12\\)", "50%", "50% of 86 is 43"] },
          { cells: ["\\(\\tfrac 13\\)", "\\(33\\tfrac 13\\%\\)", "\\(\\tfrac 23 = 66\\tfrac 23\\%\\)"] },
          { cells: ["\\(\\tfrac 14\\)", "25%", "\\(\\tfrac 34 = 75\\%\\)"] },
          { cells: ["\\(\\tfrac 15\\)", "20%", "\\(\\tfrac 25 = 40\\%\\)"] },
          { cells: ["\\(\\tfrac 16\\)", "\\(16\\tfrac 23\\%\\)", "\\(\\tfrac 56 = 83\\tfrac 13\\%\\)"] },
          { cells: ["\\(\\tfrac 17\\)", "\\(14\\tfrac 27\\%\\)", "\\(\\tfrac 67 = 85\\tfrac 57\\%\\)"] },
          { cells: ["\\(\\tfrac 18\\)", "12.5%", "\\(\\tfrac 38 = 37.5\\%\\), \\(\\tfrac 78 = 87.5\\%\\)"] },
          { cells: ["\\(\\tfrac 19\\)", "\\(11\\tfrac 19\\%\\)", "\\(\\tfrac 29 = 22\\tfrac 29\\%\\)"] },
          { cells: ["\\(\\tfrac 1{11}\\)", "\\(9\\tfrac 1{11}\\%\\)", "\\(\\tfrac 2{11} = 18\\tfrac 2{11}\\%\\)"] },
          { cells: ["\\(\\tfrac 1{12}\\)", "\\(8\\tfrac 13\\%\\)", "\\(8\\tfrac 13\\%\\) of 600 is 50"] },
          {
            cells: ["\\(\\tfrac 1{16}\\)", "6.25%", "\\(\\tfrac 3{16} = 18.75\\%\\)"],
            noteAmber: "Sixteenths turn up as 6.25%, 18.75% and the like: divide by 6.25 to find how many sixteenths.",
          },
          { cells: ["\\(\\tfrac 54\\)", "125%", "a percentage over 100 is a fraction over 1"] },
        ],
        caption: "Decimal to percentage: move the point two places right, so 0.045 is 4.5%.",
      },
      selfCheckExample: {
        prompt: "Express \\(\\tfrac{3}{16}\\) as a percentage, and find \\(11\\tfrac19\\%\\) of 450.",
        steps: ["\\(\\tfrac{1}{16} = 6.25\\%\\), so three sixteenths are 18.75%.", "\\(11\\tfrac19\\% = \\tfrac19\\), and \\(450 \\div 9 = 50\\)."],
        answer: "18.75%; 50.",
      },
      practiceSet: [
        { prompt: "Write 175% as a fraction.", answer: "\\(\\tfrac 74\\)" },
        { prompt: "What is \\(8\\tfrac13\\%\\) of 600?", answer: "\\(50\\)" },
        { prompt: "Express 0.045 as a percentage.", answer: "4.5%" },
        { prompt: "What is \\(83\\tfrac13\\%\\) of 180?", answer: "\\(150\\)", method: "It is \\(\\tfrac 56\\)." },
      ],
      pyqExampleId: "db93cadf-8b79-4804-98e5-db700dc4ebdf",
      traps: [
        {
          title: "One ninth is not 11%",
          body: "\\(\\tfrac 19\\) is \\(11\\tfrac 19\\%\\), and options often sit 11% beside it. Keep the fraction part; an option written as 11.11% is the same value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-percent-of-percent",
      name: "A percentage of a percentage",
      intuition:
        "Taking 20% of 15% of a number is taking 0.2 of 0.15 of it, which is 0.03 of it. Multiply the decimals once, then use the result.",
      definition:
        "- \\(a\\%\\) of \\(b\\%\\) of \\(N\\) is \\(\\dfrac{a}{100} \\times \\dfrac{b}{100} \\times N\\).\n" +
        "- If that is given and \\(N\\) is asked, divide by the product of the two decimals.\n" +
        "- Chains work the same way: if \\(x\\) is 50% of \\(y\\) and \\(y\\) is 70% of \\(z\\), then \\(x = 0.5 \\times 0.7\\,z = 0.35z\\). Take \\(z = 100\\) to read the answer as a percentage.\n" +
        "- 'x% of y is 7x' cancels the \\(x\\): \\(\\tfrac{y}{100} = 7\\), so \\(y = 700\\).",
      formula: {
        label: "Percent of a percent",
        latex: "a\\% \\text{ of } b\\% \\text{ of } N = \\dfrac{ab}{10000}\\,N",
      },
      authoredExample: {
        prompt: "Find 20% of 15% of 2,000.",
        steps: ["\\(0.2 \\times 0.15 = 0.03\\).", "\\(0.03 \\times 2000 = 60\\)."],
        answer: "\\(60\\).",
      },
      selfCheckExample: {
        prompt: "25% of 60% of a number is 45. Find the number.",
        steps: ["\\(0.25 \\times 0.6 = 0.15\\), so 15% of the number is 45.", "\\(45 \\div 0.15 = 300\\)."],
        answer: "\\(300\\).",
      },
      practiceSet: [
        { prompt: "What is 10% of 10% of 5,000?", answer: "\\(50\\)" },
        { prompt: "x is 20% of y and y is 45% of z. x is what percent of z?", answer: "9%" },
        { prompt: "12% of a number equals 20% of 36. Find the number.", answer: "\\(60\\)", method: "20% of 36 is 7.2." },
        { prompt: "If x% of y is 7x, find y.", answer: "\\(700\\)" },
      ],
      pyqExampleId: "1cb8bf54-3ada-4447-9af3-047d98df7fce",
      traps: [
        {
          title: "Multiply, do not add",
          body: "20% of 15% is 3%, not 35%. Each 'of' multiplies.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-whole-from-part",
      name: "Finding the whole from a part",
      intuition:
        "If 85% of a load is 1,700 kg, then 1% is 20 kg and the whole is 2,000 kg. Divide the part by its decimal, or go through 1%.",
      definition:
        "- If \\(p\\%\\) of \\(N\\) is \\(A\\), then \\(N = \\dfrac{A}{p/100} = \\dfrac{100A}{p}\\).\n" +
        "- When the question then asks another percentage of the same number, find the number first, or scale directly: if 40% is 64, then 75% is \\(64 \\times \\tfrac{75}{40} = 120\\).\n" +
        "- A loss or a gap is a part too. After 15% is lost, 85% is left; a tank 20% empty is 80% full.\n" +
        "- 'Half and 60% more' is \\(0.5 \\times 1.6 = 0.8\\) of the whole.",
      formula: {
        label: "The whole from a part",
        latex: "N = \\dfrac{100 \\times \\text{part}}{p}",
      },
      authoredExample: {
        prompt: "After 15% of a rice consignment is lost in transit, 1,700 kg arrives. How much was sent?",
        steps: ["What arrives is \\(100\\% - 15\\% = 85\\%\\) of what was sent.", "\\(1700 \\div 0.85 = 2000\\)."],
        answer: "2,000 kg.",
      },
      selfCheckExample: {
        prompt: "A tank holds 48 L of water and is 20% empty. How much more water fills it?",
        steps: ["48 L is 80% of the tank, so the tank holds \\(48 \\div 0.8 = 60\\) L.", "\\(60 - 48 = 12\\)."],
        answer: "12 L.",
      },
      practiceSet: [
        { prompt: "40% of a number is 64. Find 75% of it.", answer: "\\(120\\)" },
        { prompt: "120% of a number is 96. Find the number.", answer: "\\(80\\)" },
        { prompt: "A farmer sold 60% more than half of his eggs, which was 240 eggs. How many did he have?", answer: "\\(300\\)", method: "\\(0.5 \\times 1.6 = 0.8\\)." },
      ],
      pyqExampleId: "826534fd-82aa-4900-91b3-3b790dd8810a",
      traps: [
        {
          title: "Use the percentage that is left",
          body: "If 15% is wasted and 1,700 kg remains, divide by 0.85. Dividing by 0.15 finds the waste's whole, a number that means nothing here.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-difference-of-percents",
      name: "Two percentages of the same number",
      intuition:
        "70% of a number and 55% of the same number differ by 15% of it. Subtract the percentages first; the gap is a single percentage of the number.",
      definition:
        "- \\(a\\%\\) of \\(N\\) exceeds \\(b\\%\\) of \\(N\\) by \\(D\\) means \\((a - b)\\%\\) of \\(N\\) is \\(D\\).\n" +
        "- 'Adding 42 to 40% of a number gives the number' says the other 60% is 42: \\(0.4x + 42 = x\\).\n" +
        "- A fraction and a percentage mix freely: four fifths is 80%.\n" +
        "- Then answer what is asked: the number, or another percentage of it.",
      formula: {
        label: "Difference of two percentages",
        latex: "(a - b)\\% \\text{ of } N = D \\;\\Rightarrow\\; N = \\dfrac{100D}{a - b}",
      },
      authoredExample: {
        prompt: "70% of a number exceeds 55% of it by 36. Find 40% of the number.",
        steps: ["\\(70\\% - 55\\% = 15\\%\\) of the number is 36.", "The number is \\(36 \\div 0.15 = 240\\).", "40% of 240 is 96."],
        answer: "\\(96\\).",
      },
      selfCheckExample: {
        prompt: "When 35% of a number is added to 52, the result is the number itself. Find the number.",
        steps: ["\\(0.35x + 52 = x\\), so \\(0.65x = 52\\).", "\\(x = 80\\)."],
        answer: "\\(80\\).",
      },
      practiceSet: [
        { prompt: "30% of a number is 18 less than 42% of it. Find the number.", answer: "\\(150\\)" },
        { prompt: "85% of a number is 27 more than 70% of it. Find the number.", answer: "\\(180\\)" },
        { prompt: "Two thirds of a number is 20 more than 50% of it. Find the number.", answer: "\\(120\\)", method: "\\(\\tfrac 23 - \\tfrac 12 = \\tfrac 16\\)." },
      ],
      pyqExampleId: "2cf0e4a3-ffbf-4c0b-9c34-c0e8971c9606",
      traps: [
        {
          title: "Answer the last line",
          body: "These questions often find the number and then ask for another percentage of it. Stopping at the number picks the distractor that is always among the options.",
        },
      ],
    },
  ],
};
