import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "Decimals and Percentages",
  title: "Decimals and Percentages: Converting, Percent Of, and Percentage Change",
  oneLineDefinition:
    "A percentage is a number of hundredths, so moving between decimals and percentages is a shift of two places, and every percentage question is a multiplication or a division by 100.",
  whyItMatters:
    "The page asks four things: convert, take a percentage of a number, say what percentage one number is of another, and find a percentage change. Each is one line. The marks go on a point moved one place instead of two, and on dividing a change by the new value instead of the original.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afdf-percent-convert",
      name: "Decimals to percentages and back",
      intuition:
        "Per cent means per hundred. A decimal is turned into hundredths by multiplying by 100, which moves the point two places right; a percentage goes back by moving it two places left.",
      definition:
        "- Decimal to percentage: multiply by 100 (\\(0.06 = 6\\%\\)).\n" +
        "- Percentage to decimal: divide by 100 (\\(7.5\\% = 0.075\\)).\n" +
        "- A fraction: make it a decimal first, or multiply by 100 directly (\\(\\tfrac38 = 37.5\\%\\)).\n" +
        "- Values above 1 are over 100%: \\(1.25 = 125\\%\\).",
      formula: {
        label: "Decimal and percentage",
        latex: "x = (100x)\\%, \\qquad p\\% = \\dfrac{p}{100}",
      },
      authoredExample: {
        prompt: "Write \\(0.06\\) and \\(1.25\\) as percentages, and \\(7.5\\%\\) as a decimal.",
        steps: [
          "\\(0.06 \\times 100 = 6\\), so \\(6\\%\\).",
          "\\(1.25 \\times 100 = 125\\), so \\(125\\%\\).",
          "\\(7.5 \\div 100 = 0.075\\).",
        ],
        answer: "\\(6\\%\\), \\(125\\%\\) and \\(0.075\\).",
      },
      selfCheckExample: {
        prompt: "Write \\(0.045\\) as a percentage, and \\(64\\%\\) as a decimal.",
        steps: ["\\(0.045 \\times 100 = 4.5\\).", "\\(64 \\div 100 = 0.64\\)."],
        answer: "\\(4.5\\%\\) and \\(0.64\\).",
      },
      practiceSet: [
        { prompt: "Write \\(0.9\\) as a percentage.", answer: "\\(90\\%\\)" },
        { prompt: "Write \\(2\\%\\) as a decimal.", answer: "\\(0.02\\)" },
        { prompt: "Write \\(\\tfrac34\\) as a percentage.", answer: "\\(75\\%\\)" },
        { prompt: "Write \\(0.125\\) as a percentage.", answer: "\\(12.5\\%\\)" },
      ],
      pyqExampleId: "40eed371-8808-4c52-b399-a3e1ee967bb3",
      traps: [
        {
          title: "Two places, not one",
          body: "\\(0.05 = 5\\%\\), not \\(50\\%\\) or \\(0.5\\%\\). The options are usually the right answer with the point moved one place too far or too little.",
        },
        {
          title: "Going back divides",
          body: "\\(8\\% = 0.08\\). Writing \\(0.8\\) moves the point only one place.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-percent-of",
      name: "A percentage of a number",
      intuition:
        "\\(p\\%\\) of a number is \\(\\tfrac{p}{100}\\) of it. Ten per cent is the number with its point moved one place left, and most percentages can be built from 10%, 5% and 1%.",
      definition:
        "- \\(p\\%\\) of \\(N\\) is \\(\\dfrac{p}{100} \\times N\\).\n" +
        "- Quick pieces: 10% moves the point one place left, 5% is half of that, 1% moves it two places.\n" +
        "- Fraction equivalents help: \\(25\\% = \\tfrac14\\), \\(12.5\\% = \\tfrac18\\), \\(50\\% = \\tfrac12\\).",
      formula: {
        label: "Percent of a number",
        latex: "p\\% \\text{ of } N = \\dfrac{p}{100} \\times N",
      },
      authoredExample: {
        prompt: "Find \\(35\\%\\) of 260, and \\(12.5\\%\\) of 480.",
        steps: [
          "10% of 260 is 26, so 30% is 78 and 5% is 13. Then \\(35\\% = 78 + 13 = 91\\).",
          "\\(12.5\\% = \\tfrac18\\), and \\(\\tfrac18 \\times 480 = 60\\).",
        ],
        answer: "\\(91\\) and \\(60\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(45\\%\\) of 160.",
        steps: ["10% is 16, so 40% is 64.", "5% is 8. Together \\(64 + 8\\)."],
        answer: "\\(72\\).",
      },
      practiceSet: [
        { prompt: "Find \\(20\\%\\) of 85.", answer: "\\(17\\)" },
        { prompt: "Find \\(8\\%\\) of 250.", answer: "\\(20\\)" },
        { prompt: "Find \\(60\\%\\) of 45.", answer: "\\(27\\)" },
        { prompt: "Find \\(2.5\\%\\) of 400.", answer: "\\(10\\)" },
      ],
      pyqExampleId: "4a5c6632-e333-49a5-bb9a-1a3707f83204",
      traps: [
        {
          title: "Percent of is not percent off",
          body: "\\(40\\%\\) of 70 is 28; 70 reduced by \\(40\\%\\) is 42. Read whether the question wants the part or what is left.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-what-percent",
      name: "What percentage one number is of another",
      intuition:
        "To say what percentage \\(a\\) is of \\(b\\), write \\(a\\) as a fraction of \\(b\\) and multiply by 100. The number after 'of' is always the whole, so it goes underneath.",
      definition:
        "- \\(a\\) as a percentage of \\(b\\) is \\(\\dfrac ab \\times 100\\%\\).\n" +
        "- The number after 'of' is the **whole**, the denominator.\n" +
        "- Simplify the fraction first when it helps: \\(\\tfrac{18}{72} = \\tfrac14 = 25\\%\\).\n" +
        "- The answer can pass 100% when the part is bigger than the whole.",
      formula: {
        label: "Part as a percentage of the whole",
        latex: "\\dfrac{\\text{part}}{\\text{whole}} \\times 100\\%",
      },
      authoredExample: {
        prompt: "18 is what percentage of 72? And what percentage of 64 is 40?",
        steps: [
          "\\(\\tfrac{18}{72} = \\tfrac14 = 25\\%\\).",
          "\\(\\tfrac{40}{64} = \\tfrac58 = 0.625 = 62.5\\%\\).",
        ],
        answer: "\\(25\\%\\) and \\(62.5\\%\\).",
      },
      selfCheckExample: {
        prompt: "What percentage of 250 is 35?",
        steps: ["\\(\\tfrac{35}{250} = 0.14\\).", "\\(0.14 \\times 100 = 14\\)."],
        answer: "\\(14\\%\\).",
      },
      practiceSet: [
        { prompt: "12 is what percentage of 48?", answer: "\\(25\\%\\)" },
        { prompt: "9 is what percentage of 60?", answer: "\\(15\\%\\)" },
        { prompt: "70 is what percentage of 56?", answer: "\\(125\\%\\)" },
        { prompt: "3 is what percentage of 40?", answer: "\\(7.5\\%\\)" },
      ],
      pyqExampleId: "518fafb2-3fa2-4757-96ad-9fb2c6f00395",
      traps: [
        {
          title: "The whole goes underneath",
          body: "'15 is what percentage of 60' is \\(\\tfrac{15}{60} = 25\\%\\). Turning it round, \\(\\tfrac{60}{15}\\), gives \\(400\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-percent-change",
      name: "Percentage increase and decrease",
      intuition:
        "A change is always measured against where you started. Find the change, divide by the original value, and multiply by 100. To apply a change, multiply by \\(1 + \\tfrac{p}{100}\\) or \\(1 - \\tfrac{p}{100}\\).",
      definition:
        "- Percentage change \\(= \\dfrac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%\\).\n" +
        "- Increase by \\(p\\%\\): multiply by \\(1 + \\tfrac{p}{100}\\) (up 15% is \\(\\times 1.15\\)).\n" +
        "- Decrease by \\(p\\%\\): multiply by \\(1 - \\tfrac{p}{100}\\) (down 15% is \\(\\times 0.85\\)).",
      formula: {
        label: "Percentage change",
        latex: "\\text{change}\\% = \\dfrac{\\text{new} - \\text{original}}{\\text{original}} \\times 100",
      },
      authoredExample: {
        prompt: "A price rises from 240 to 300. Find the percentage rise. Then reduce 300 by \\(15\\%\\).",
        steps: [
          "The rise is 60, and \\(\\tfrac{60}{240} = \\tfrac14 = 25\\%\\).",
          "\\(300 \\times 0.85 = 255\\).",
        ],
        answer: "A \\(25\\%\\) rise; 255.",
      },
      selfCheckExample: {
        prompt: "A share falls from 250 to 210. Find the percentage fall.",
        steps: ["The fall is 40.", "\\(\\tfrac{40}{250} = 0.16\\)."],
        answer: "\\(16\\%\\).",
      },
      practiceSet: [
        { prompt: "Increase 60 by \\(15\\%\\).", answer: "\\(69\\)" },
        { prompt: "A value goes from 80 to 100. Find the percentage rise.", answer: "\\(25\\%\\)" },
        { prompt: "Decrease 90 by \\(30\\%\\).", answer: "\\(63\\)" },
        { prompt: "A value goes from 160 to 120. Find the percentage fall.", answer: "\\(25\\%\\)" },
      ],
      pyqExampleId: "be61242c-c36e-4dac-a4d5-797b20e894d3",
      traps: [
        {
          title: "Divide by the original, not the new value",
          body: "50 to 75 is a \\(50\\%\\) rise (25 on 50), but 75 back to 50 is a \\(33\\tfrac13\\%\\) fall (25 on 75). The same gap gives a different percentage.",
        },
        {
          title: "Up and down by the same percentage does not cancel",
          body: "100 up \\(10\\%\\) is 110, and 110 down \\(10\\%\\) is 99, not 100.",
        },
      ],
    },
  ],
};
