import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAR_PERCENT_NOTE: SubtopicNote = {
  subtopicName: "Percentages and Interest",
  title: "Percentages and Interest",
  oneLineDefinition:
    "A percentage is a fraction out of 100: change it to a simple fraction to find a part, divide by it to find the whole, and multiply the factors when two changes come one after the other.",
  whyItMatters:
    "Twelve questions in the bank, all EASY and all from the 2025 shifts. Five find a percentage of a number or work back from one, three apply two changes one after the other, and four are about simple or compound interest.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrarpc-percent",
      name: "A percentage as a fraction",
      intuition:
        "Most SSC percentages are friendly fractions in disguise. 25% is a quarter, 20% is a fifth, 12.5% is an eighth. Change to the fraction and the arithmetic is one step.",
      definition:
        "- **Fractions to know:** 10% \\(= \\frac{1}{10}\\), 12.5% \\(= \\frac{1}{8}\\), 20% \\(= \\frac{1}{5}\\), 25% \\(= \\frac{1}{4}\\), 50% \\(= \\frac{1}{2}\\), 60% \\(= \\frac{3}{5}\\), 75% \\(= \\frac{3}{4}\\).\n" +
        "- **A part:** p% of N \\(= \\frac{p}{100} \\times N\\).\n" +
        "- **Working back:** if p% of a number is A, the number is \\(A \\times \\frac{100}{p}\\).\n" +
        "- **What is left:** if a share is used up, the rest is 100% minus that share. Work with the share the question gives you a number for.\n" +
        "- **Profit on cost:** selling price \\(=\\) cost price \\(\\times \\frac{100 + \\text{profit}\\%}{100}\\).\n" +
        "- The fraction route is exact for these friendly percentages; for a percentage such as 37% simply multiply.",
      formula: {
        label: "A part, the whole, and selling price",
        latex: "p\\% \\text{ of } N = \\frac{p}{100} \\times N \\qquad N = \\frac{A \\times 100}{p} \\qquad SP = CP \\times \\frac{100 + p}{100}",
        symbols: [
          { symbol: "A", meaning: "the amount that is p% of the number" },
          { symbol: "SP, CP", meaning: "selling price and cost price" },
        ],
      },
      authoredExample: {
        prompt: "A student spends 35% of her pocket money and has ₹520 left. What is her pocket money?",
        steps: [
          "She has \\(100\\% - 35\\% = 65\\%\\) left, and that is ₹520.",
          "\\(1\\%\\) is \\(520 \\div 65 = 8\\), so 100% is ₹800.",
          "Check: 35% of 800 is 280, and \\(800 - 280 = 520\\).",
        ],
        answer: "₹800",
      },
      selfCheckExample: {
        prompt: "A trader buys a bag for ₹250 and wants a profit of 12% on the cost. What should the selling price be?",
        steps: ["Profit \\(= 12\\%\\) of 250 \\(= 30\\).", "Selling price \\(= 250 + 30 = 280\\)."],
        answer: "₹280",
      },
      practiceSet: [
        { prompt: "What is 12.5% of 480?", answer: "60", method: "\\(480 \\div 8\\)." },
        { prompt: "If 20% of a number is 35, what is the number?", answer: "175" },
        { prompt: "In a school of 600 students, 45% are boys. How many are girls?", answer: "330" },
        { prompt: "Find 50% of 240 plus 25% of 360.", answer: "210", method: "\\(120 + 90\\)." },
      ],
      pyqExampleId: "b87d2f91-3974-4567-ac5b-c95a85f3cffb",
      traps: [
        {
          title: "Using the share spent when the amount given is what is left",
          body:
            "If the number you are given is the money left over, it matches 100% minus the share spent. Dividing it by the spent share gives a wrong total.",
        },
        {
          title: "Taking profit on the selling price",
          body:
            "A profit percentage is on the cost price unless the question says otherwise. A 20% profit on a cost of ₹150 is ₹30, giving ₹180.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarpc-successive",
      name: "Two changes one after the other",
      intuition:
        "The second change is taken on the new value, not the original. So a rise and an equal fall do not cancel: the fall is taken on a bigger number and wins.",
      definition:
        "- **Factors:** a rise of a% multiplies by \\(1 + \\frac{a}{100}\\); a fall of b% multiplies by \\(1 - \\frac{b}{100}\\). Multiply the two factors.\n" +
        "- **Shortcut:** the net change is \\(a + b + \\frac{ab}{100}\\) percent, with a fall written as a negative number.\n" +
        "- **Area:** a change in length and a change in width combine by the same rule.\n" +
        "- **Equal rise and fall of x%:** the result is always a fall of \\(\\frac{x^2}{100}\\) percent.\n" +
        "- **Check:** start from 100 and apply each change in turn.",
      formula: {
        label: "Net effect of two changes",
        latex: "\\text{Net change} = a + b + \\frac{ab}{100}",
        symbols: [
          { symbol: "a", meaning: "the first change in per cent (negative for a fall)" },
          { symbol: "b", meaning: "the second change in per cent (negative for a fall)" },
        ],
      },
      authoredExample: {
        prompt: "A price rises by 25% and then falls by 10%. What is the net change?",
        steps: [
          "Shortcut: \\(a = 25\\), \\(b = -10\\): \\(25 - 10 - \\frac{250}{100} = 12.5\\).",
          "Check from 100: a 25% rise gives 125, and a 10% fall from 125 removes 12.5, leaving 112.5.",
        ],
        answer: "A rise of 12.5%",
      },
      selfCheckExample: {
        prompt: "The length of a rectangle increases by 25% and its width by 4%. By what percentage does its area increase?",
        steps: ["\\(25 + 4 + \\frac{25 \\times 4}{100} = 30\\).", "Check: \\(1.25 \\times 1.04 = 1.3\\)."],
        answer: "30%",
      },
      practiceSet: [
        { prompt: "A number is increased by 10% and then by 10% again. What is the total increase?", answer: "21%" },
        { prompt: "A salary is cut by 40% and the new salary is then raised by 40%. What is the net change?", answer: "A fall of 16%" },
        {
          prompt: "The length of a rectangle increases by 15% and its width decreases by 15%. What is the change in its area?",
          answer: "A fall of 2.25%",
        },
        { prompt: "A price of ₹200 rises by 50% and then falls by 50%. What is the final price?", answer: "₹150" },
      ],
      pyqExampleId: "4230e27c-e2e8-4050-bccd-617a10b089dd",
      traps: [
        {
          title: "Adding the two percentages",
          body:
            "A 30% rise followed by a 30% fall is not zero change. The fall is taken on the bigger price, so the result is a 9% fall.",
        },
        {
          title: "Dropping the sign of a fall",
          body:
            "In \\(a + b + \\frac{ab}{100}\\), a fall is negative, so the product term is negative too. A 10% rise then a 10% fall is \\(10 - 10 - 1 = -1\\), a 1% fall.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarpc-interest",
      name: "Simple and compound interest",
      intuition:
        "Simple interest is the same every year, worked out on the original sum. Compound interest is earned on the amount at the end of the year before, so two consecutive years' amounts give the rate directly.",
      definition:
        "- **Simple interest:** \\(SI = \\frac{P \\times R \\times T}{100}\\). Rearranged, \\(R = \\frac{SI \\times 100}{P \\times T}\\).\n" +
        "- **A sum that becomes k times itself** at simple interest has earned \\((k - 1)\\) times the principal, so \\(R \\times T = 100(k - 1)\\). Doubling: \\(R \\times T = 100\\).\n" +
        "- **Compound interest from two consecutive years:** the gap between the amounts is one year's interest on the earlier amount, so the rate is that gap divided by the earlier amount.",
      formula: {
        label: "Simple interest, k times, and compound rate",
        latex: "SI = \\frac{PRT}{100} \\qquad R \\times T = 100(k - 1) \\qquad R = \\frac{A_{n+1} - A_n}{A_n} \\times 100",
        symbols: [
          { symbol: "P", meaning: "the principal" },
          { symbol: "R", meaning: "the rate in per cent a year" },
          { symbol: "T", meaning: "the time in years" },
          { symbol: "Aₙ", meaning: "the compound amount after n years" },
        ],
      },
      authoredExample: {
        prompt: "A sum becomes 3 times itself in 16 years at simple interest. What is the rate?",
        steps: [
          "It has earned twice the principal, that is 200% of it.",
          "\\(R \\times 16 = 200\\), so \\(R = 12.5\\%\\) a year.",
          "Check: 12.5% a year for 16 years is 200%, and \\(100\\% + 200\\% = 300\\%\\), three times the sum.",
        ],
        answer: "12.5% a year",
      },
      selfCheckExample: {
        prompt: "At compound interest a sum becomes ₹5,000 after 3 years and ₹5,400 after 4 years. What is the rate?",
        steps: ["The 4th year's interest is \\(5400 - 5000 = 400\\), earned on 5000.", "Rate \\(= \\frac{400}{5000} \\times 100 = 8\\%\\)."],
        answer: "8% a year",
      },
      practiceSet: [
        { prompt: "Find the simple interest on ₹2,500 at 6% a year for 3 years.", answer: "₹450" },
        { prompt: "At what rate of simple interest does a sum double in 8 years?", answer: "12.5% a year" },
        { prompt: "₹4,000 earns ₹960 simple interest in 4 years. What is the rate?", answer: "6% a year" },
        {
          prompt: "At compound interest a sum becomes ₹1,210 after 2 years and ₹1,331 after 3 years. What is the rate?",
          answer: "10% a year",
        },
      ],
      pyqExampleId: "04898936-58bc-468f-a2df-31b0c62444a8",
      traps: [
        {
          title: "Counting the whole amount as interest",
          body:
            "A sum that doubles has earned interest equal to the principal, not twice it. A sum that becomes 2.5 times has earned 1.5 times the principal.",
        },
        {
          title: "Dividing by the later amount",
          body:
            "For a compound rate from two consecutive years, divide the gap by the earlier year's amount. Dividing by the later amount gives a rate that is too small.",
        },
      ],
    },
  ],
};
