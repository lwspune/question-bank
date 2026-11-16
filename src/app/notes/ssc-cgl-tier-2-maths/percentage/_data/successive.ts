import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_PP_SUCCESSIVE_NOTE: SubtopicNote = {
  subtopicName: "Successive Percentage Change",
  title: "Successive Percentage Change",
  oneLineDefinition:
    "Changes made one after another act on the new value each time, so they multiply as factors; the same idea covers price against quantity and a chain of people compared through one of them.",
  whyItMatters:
    "8 questions in the Tier II bank, 2 of them MODERATE. Populations, salaries and sales over two or three years, revenue when price and sales both move, and 'A is x% more than B' chains all come down to multiplying factors.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ppsu-chain",
      name: "Successive changes multiply",
      intuition:
        "A 10% rise turns 100 into 110. A second rise of 20% acts on 110, not on the old 100. So changes in a row multiply as factors; adding the percentages is always a little wrong.",
      definition:
        "- A rise of \\(r\\%\\) is the factor \\(1 + \\frac{r}{100}\\); a fall of \\(r\\%\\) is \\(1 - \\frac{r}{100}\\).\n" +
        "- The same rate for \\(n\\) years gives the factor \\(\\left(1 \\pm \\frac{r}{100}\\right)^n\\). To go back to an earlier year, divide by the factor.\n" +
        "- Two changes \\(a\\%\\) and \\(b\\%\\) make one change of \\(a + b + \\frac{ab}{100}\\) (write a fall as a negative number).\n" +
        "- **Fast route:** use fractions. 10% up is \\(\\frac{11}{10}\\), 20% down is \\(\\frac{4}{5}\\), 25% up is \\(\\frac{5}{4}\\).",
      formula: {
        label: "Changes one after another",
        latex: "\\text{final} = \\text{initial}\\left(1 + \\tfrac{a}{100}\\right)\\left(1 + \\tfrac{b}{100}\\right), \\quad \\text{net}\\% = a + b + \\tfrac{ab}{100}",
      },
      authoredExample: {
        prompt: "A town has 64,000 people. Its population grows by 25% in the first year and falls by 10% in the second. Find the population after two years.",
        steps: [
          "\\(64000 \\times \\frac{5}{4} = 80000\\).",
          "\\(80000 \\times \\frac{9}{10} = 72000\\).",
          "Check with the net change: \\(25 - 10 - \\frac{25 \\times 10}{100} = 12.5\\%\\), and \\(64000 \\times 1.125 = 72000\\).",
        ],
        answer: "72,000",
      },
      selfCheckExample: {
        prompt: "A car loses 20% of its value every year. It is worth ₹4,09,600 now. What was it worth two years ago?",
        steps: ["Two years multiply the value by \\(0.8^2 = 0.64\\).", "Value two years ago \\(= 409600 \\div 0.64 = 640000\\)."],
        answer: "₹6,40,000",
      },
      practiceSet: [
        { prompt: "A price rises by 20% and then by 20% again. Find the single equivalent rise.", answer: "44%" },
        { prompt: "A salary of ₹50,000 rises by 10% and then falls by 10%. Find the new salary.", answer: "₹49,500" },
        { prompt: "A number becomes 1.21 times itself after two equal yearly rises. Find the yearly rate.", answer: "10%", method: "\\(1.1^2 = 1.21\\)" },
      ],
      pyqExampleId: "9522a0f0-ca4a-4b66-b6d8-cd4e59ac8f2e",
      traps: [
        {
          title: "Adding the percentages",
          body: "A 30% rise followed by a 30% fall does not bring a value back: \\(1.3 \\times 0.7 = 0.91\\), a 9% fall in all.",
        },
        {
          title: "Going back by subtracting the rate",
          body: "A population that grew by 8% to 54,000 was \\(54000 \\div 1.08 = 50000\\) before. Taking 8% off 54,000 gives 49,680, which is wrong because the 8% was of the smaller number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ppsu-product",
      name: "Price and quantity",
      intuition:
        "Money spent is price times quantity. If the price moves and the money stays the same, the quantity must move the other way, and its factor is the price factor turned upside down.",
      definition:
        "- Expenditure \\(=\\) price \\(\\times\\) quantity, and revenue \\(=\\) price \\(\\times\\) number sold.\n" +
        "- If the price rises by \\(r\\%\\) and spending stays fixed, use falls by \\(\\frac{r}{100 + r} \\times 100\\%\\).\n" +
        "- If the price falls by \\(r\\%\\), the same money buys \\(\\frac{r}{100 - r} \\times 100\\%\\) more.\n" +
        "- The money a price fall saves, divided by the extra quantity it buys, is the NEW price of one unit.",
      formula: {
        label: "Spending",
        latex: "\\text{expenditure} = \\text{price} \\times \\text{quantity}",
      },
      authoredExample: {
        prompt: "The price of sugar rises by 25%. By what percentage must a family cut its sugar use so that its spending stays the same?",
        steps: ["The price factor is \\(\\frac{5}{4}\\).", "To keep the product fixed, use must be multiplied by \\(\\frac{4}{5}\\), a cut of 20%."],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "The price of oil falls by 20%, so ₹1,200 now buys 5 litres more. Find the new price of one litre.",
        steps: [
          "The fall saves 20% of ₹1,200, that is ₹240.",
          "₹240 buys the extra 5 litres, so the new price is \\(240 \\div 5 = 48\\) rupees a litre.",
          "Check: the old price was 60, and \\(1200 \\div 60 = 20\\) litres against \\(1200 \\div 48 = 25\\) litres.",
        ],
        answer: "₹48 a litre",
      },
      practiceSet: [
        { prompt: "A ticket price is cut by 10% and ticket sales rise by 30%. By what percentage does revenue change?", answer: "A rise of 17%", method: "\\(0.9 \\times 1.3 = 1.17\\)" },
        { prompt: "The price of rice rises by 50%. By what percentage must use fall to keep spending the same?", answer: "\\(33\\frac{1}{3}\\%\\)" },
        { prompt: "A shop cuts its price by 25%. By what percentage must sales rise for revenue to rise by 20%?", answer: "60%", method: "\\(1.2 \\div 0.75 = 1.6\\)" },
      ],
      pyqExampleId: "80ffd93e-7266-4672-ad1d-ec4b2be6b07c",
      traps: [
        {
          title: "Cutting use by the same percentage as the price rise",
          body: "After a 60% price rise, use must fall by 37.5%, not by 60%: \\(1.6 \\times 0.625 = 1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ppsu-compare",
      name: "Comparing people through a common base",
      intuition:
        "When a stem links several people by percentages (A to C, B to A, D to C), give one of them the value 100 and work out the others from it. Then compare only the two the question asks about.",
      definition:
        "- Set the person everyone is measured from to 100, or to a number the fractions divide evenly.\n" +
        "- Each 'r% more' multiplies by \\(1 + \\frac{r}{100}\\); each 'r% less' multiplies by \\(1 - \\frac{r}{100}\\).\n" +
        "- 'By what percentage is X more than Y' is \\(\\frac{X - Y}{Y} \\times 100\\): the base is the person after 'than'.\n" +
        "- Skip anyone the question does not ask about.",
      formula: {
        label: "X compared with Y",
        latex: "\\text{X is more than Y by } \\frac{X - Y}{Y} \\times 100\\%",
      },
      authoredExample: {
        prompt: "P earns 20% more than R, and Q earns 25% less than R. By what percentage are P's earnings more than Q's?",
        steps: ["Take R = 100. Then P = 120 and Q = 75.", "P is more than Q by \\(\\frac{45}{75} \\times 100 = 60\\%\\)."],
        answer: "60%",
      },
      selfCheckExample: {
        prompt: "M is 50% more than N, and K is 64% less than the sum of M and N. By what percentage is K less than M?",
        steps: ["Take N = 100, so M = 150 and M + N = 250.", "K \\(= 250 \\times 0.36 = 90\\).", "K is less than M by \\(\\frac{60}{150} \\times 100 = 40\\%\\)."],
        answer: "40%",
      },
      practiceSet: [
        { prompt: "A is 10% more than B, and B is 10% more than C. By what percentage is A more than C?", answer: "21%" },
        { prompt: "X is 20% less than Z, and Y is 20% more than Z. Find X : Y.", answer: "2 : 3", method: "\\(80 : 120\\)" },
        { prompt: "A scored 30% more than C, and B scored 30% less than C. By what percentage did A score more than B?", answer: "\\(85\\frac{5}{7}\\%\\)", method: "\\(\\frac{130 - 70}{70} \\times 100\\)" },
      ],
      pyqExampleId: "1a70e6bc-162c-4017-a73d-f9be2fb78963",
      traps: [
        {
          title: "Dividing by the wrong person",
          body: "With X = 80 and Y = 100, X is 20% less than Y, but Y is 25% more than X. The base is always the person named after 'than'.",
        },
      ],
    },
  ],
};
