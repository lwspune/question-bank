import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Percentage Change and Percent More or Less",
  title: "Percentage Change and Percent More or Less",
  oneLineDefinition:
    "A percentage change, or a \"percent more than\", is the difference divided by the base, and the base is the earlier value or the value after the word \"than\".",
  whyItMatters:
    "Twenty-three questions in the bank, nine of them MODERATE. Every wrong option in these is a wrong base: the same difference divided by the other value. Fix the base before you divide and the rest is one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdich-change",
      name: "Percentage increase or decrease between two values",
      intuition:
        "A change is measured against where you started. Going from 40 to 50 is a rise of 10 on a start of 40, which is 25%. Coming back from 50 to 40 is the same 10 on a start of 50, only 20%. The start is the earlier year, or the year after \"compared with\" or \"over\".",
      definition:
        "- **Full method:** \\(\\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\). A negative answer is a decrease; quote it without the sign as \"percentage decrease\".\n" +
        "- **Old value:** the earlier year, \"the previous year\", or the value after \"compared with\".\n" +
        "- **Fast route:** write new \\(\\div\\) old as a fraction. \\(\\frac{5}{4}\\) is a 25% rise, \\(\\frac{3}{4}\\) a 25% fall, doubling is a 100% rise.\n" +
        "- **Which change is largest in percentage:** compare change \\(\\div\\) old for each item. The largest change in units is not always the largest in percent, because a small base inflates the percentage.\n" +
        "- A table can print the yearly percentages themselves; then \"percentage increase from 70 to 84\" is still \\(\\frac{14}{70} = 20\\%\\), a change measured on the printed numbers.",
      formula: {
        label: "Percentage change",
        latex: "\\%\\,\\text{change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100",
      },
      authoredExample: {
        prompt:
          "The table shows a factory's monthly output of bulbs.\n\n| Month | March | April | May | June |\n|---|---|---|---|---|\n| Bulbs | 640 | 600 | 560 | 512 |\n\nWhat is the percentage decrease in output in June compared with March?",
        steps: [
          "Old \\(= 640\\) (March), new \\(= 512\\) (June). Decrease \\(= 128\\).",
          "Full method: \\(\\frac{128}{640} \\times 100 = 20\\%\\).",
          "Fast route: \\(\\frac{512}{640} = \\frac{4}{5}\\), which is a fall of one fifth, 20%.",
        ],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "Rainfall in a town rose from 30 mm to 48 mm in one month, and from 60 mm to 90 mm in another. Which month shows the larger percentage rise?",
        steps: [
          "First month: \\(\\frac{18}{30} = 60\\%\\).",
          "Second month: \\(\\frac{30}{60} = 50\\%\\).",
          "The first month rose by fewer millimetres but by the larger percentage.",
        ],
        answer: "The first month (60%)",
      },
      practiceSet: [
        { prompt: "Sales rose from 120 to 150. What is the percentage increase?", answer: "25%" },
        { prompt: "Production fell from 250 units to 190 units. What is the percentage decrease?", answer: "24%" },
        { prompt: "A value doubles from one year to the next. What is the percentage increase?", answer: "100%" },
        { prompt: "Sales went up from 18 to 45. What is the percentage increase?", answer: "150%" },
      ],
      pyqExampleId: "fcb73a0e-f2b1-412f-b0e8-572448431137",
      traps: [
        {
          title: "Dividing by the new value",
          body:
            "A rise from 40 to 50 is 25%, not 20%. The change is always divided by the starting value; dividing by the later value gives a smaller, wrong answer that sits among the options.",
        },
        {
          title: "Taking the biggest jump as the biggest percentage",
          body:
            "A rise of 36 on a base of 60 is 60%, while a rise of 21 on a base of 28 is 75%. Compare change over base, not the changes alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdich-moreless",
      name: "Percent more than and percent less than",
      intuition:
        "\"A is what percent more than B\" measures the gap against B, the value after \"than\". Turn it round and ask how much less B is than A, and the gap is now measured against A, so the percentage is smaller. The two answers are never equal.",
      definition:
        "- **A more than B:** \\(\\frac{A - B}{B} \\times 100\\). **A less than B:** \\(\\frac{B - A}{B} \\times 100\\). The base is the value after \"than\".\n" +
        "- **More/less options:** first decide the direction (is A bigger?), then work out the size.\n" +
        "- **Turning it round:** if A is \\(r\\%\\) more than B, then B is \\(\\frac{r}{100 + r} \\times 100\\%\\) less than A. 25% more one way is 20% less the other way.\n" +
        "- **Averages over the same count:** compare the totals; the divisions cancel.",
      formula: {
        label: "Percent more or less",
        latex: "\\frac{A - B}{B} \\times 100 \\qquad A = B\\left(1 + \\frac{r}{100}\\right) \\Rightarrow B \\text{ is } \\frac{r}{100 + r} \\times 100\\% \\text{ less than } A",
      },
      authoredExample: {
        prompt: "Plant P made 2,760 units and plant Q made 2,400 units. By what percent is P's output more than Q's? By what percent is Q's output less than P's?",
        steps: [
          "Gap \\(= 360\\).",
          "More than Q: base Q, \\(\\frac{360}{2400} \\times 100 = 15\\%\\).",
          "Less than P: base P, \\(\\frac{360}{2760} \\times 100 \\approx 13.04\\%\\). Check with the rule: \\(\\frac{15}{115} \\times 100 \\approx 13.04\\%\\).",
        ],
        answer: "15% more; about 13.04% less",
      },
      selfCheckExample: {
        prompt: "Over the same three years, company A made 1,950 units in all and company B made 2,600. A's average yearly output is what percent more or less than B's?",
        steps: [
          "Same count, so compare totals. A is smaller, so the answer is \"less\".",
          "\\(\\frac{2600 - 1950}{2600} \\times 100 = \\frac{650}{2600} \\times 100 = 25\\%\\).",
        ],
        answer: "25% less",
      },
      practiceSet: [
        { prompt: "63 is what percent more than 45?", answer: "40%" },
        { prompt: "45 is what percent less than 63?", answer: "about 28.57%" },
        { prompt: "A is 25% more than B. By what percent is B less than A?", answer: "20%" },
        { prompt: "X's total is 1,320 and Y's is 1,200. X is what percent more than Y?", answer: "10%" },
      ],
      pyqExampleId: "89f8a370-520a-4aaa-bd1c-1f4b5aa28bf4",
      traps: [
        {
          title: "Using the same percentage both ways",
          body:
            "If A is 25% more than B, B is not 25% less than A. The gap is measured on different bases, so B is 20% less than A.",
        },
        {
          title: "Picking the size before the direction",
          body:
            "More/less questions print each size twice, once with \"more\" and once with \"less\". Decide which value is bigger before you divide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdich-apply",
      name: "Applying a percentage change to find a value",
      intuition:
        "Sometimes the percentage is given and the value is asked: next year is 15% more than this year, income is expenditure plus a profit percentage. Multiply by one plus the rate. To go back from the new value, divide by the same factor.",
      definition:
        "- **Increase by \\(r\\%\\):** new \\(=\\) old \\(\\times (1 + \\frac{r}{100})\\). **Decrease by \\(r\\%\\):** new \\(=\\) old \\(\\times (1 - \\frac{r}{100})\\).\n" +
        "- **Profit on expenditure:** profit \\(=\\) expenditure \\(\\times \\frac{p}{100}\\); income \\(=\\) expenditure \\(\\times (1 + \\frac{p}{100})\\).\n" +
        "- **Back to the old value:** old \\(=\\) new \\(\\div (1 + \\frac{r}{100})\\). Taking \\(r\\%\\) off the new value is wrong.\n" +
        "- **Fast route:** split the rate into easy parts. 12.5% of 2,400 is \\(\\frac{1}{8}\\) of it, 300.",
      formula: {
        label: "Applying a percentage change",
        latex: "\\text{New} = \\text{Old} \\times \\left(1 + \\frac{r}{100}\\right) \\qquad \\text{Old} = \\frac{\\text{New}}{1 + \\frac{r}{100}}",
      },
      authoredExample: {
        prompt: "A company spent ₹36 crore in a year and made a profit of 35% on its expenditure. Taking income as expenditure plus profit, find its income.",
        steps: [
          "Profit \\(= 35\\%\\) of 36 \\(= 12.6\\) crore.",
          "Income \\(= 36 + 12.6 = 48.6\\) crore. In one step: \\(36 \\times 1.35 = 48.6\\).",
        ],
        answer: "₹48.6 crore",
      },
      selfCheckExample: {
        prompt: "This year's sales of 32,400 units are 8% more than last year's. What were last year's sales?",
        steps: [
          "Last year \\(\\times 1.08 = 32400\\), so last year \\(= 32400 \\div 1.08 = 30000\\).",
          "Check: 8% of 30,000 is 2,400, and \\(30000 + 2400 = 32400\\).",
        ],
        answer: "30,000 units",
      },
      practiceSet: [
        { prompt: "Increase 2,400 by 12.5%.", answer: "2,700" },
        { prompt: "Decrease 560 by 25%.", answer: "420" },
        { prompt: "A firm's cost was ₹4,800 lakh. For a 25% profit on cost, what must its gross amount be?", answer: "₹6,000 lakh" },
        { prompt: "A company spent ₹50 crore and earned 18% profit on its expenditure. How much was the profit?", answer: "₹9 crore" },
      ],
      pyqExampleId: "362a9360-8135-4e21-a712-ce44ee2fca2b",
      traps: [
        {
          title: "Taking the percentage off the new value",
          body:
            "If 32,400 is 8% more than last year, last year is \\(32400 \\div 1.08 = 30000\\), not \\(32400 - 8\\%\\) of 32,400. The 8% belongs to last year's value.",
        },
      ],
    },
  ],
};
