import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_PP_DISCOUNT_NOTE: SubtopicNote = {
  subtopicName: "Marked Price and Discount",
  title: "Marked Price and Discount",
  oneLineDefinition:
    "A discount is a percentage of the marked price; cost, selling price and marked price sit on one line, and discounts given one after another multiply like any other chain of changes.",
  whyItMatters:
    "20 questions in the Tier II bank, 16 EASY and 4 MODERATE. Mark-up with profit, single and successive discounts, and 'buy some, get one free' offers all appear, and each is one or two multiplications once the cost is taken as 100.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ppdi-discount",
      name: "Discount on the marked price",
      intuition:
        "A discount is always a share of the marked price. A 30% discount means the customer pays 70% of the marked price, so the marked price is what was paid divided by 0.7.",
      definition:
        "- \\(SP = MP \\times \\left(1 - \\frac{d}{100}\\right)\\), so \\(MP = SP \\div \\left(1 - \\frac{d}{100}\\right)\\).\n" +
        "- The discount in rupees is \\(MP - SP\\); the discount percentage uses MP as its base.\n" +
        "- Changing the discount from \\(d_1\\) to \\(d_2\\) changes the price by \\((d_1 - d_2)\\%\\) of the MARKED price.",
      formula: {
        label: "Price after a discount",
        latex: "SP = MP\\left(1 - \\frac{d}{100}\\right)",
      },
      authoredExample: {
        prompt: "A sofa is sold for ₹22,800 after a 24% discount. Find its marked price.",
        steps: ["The buyer pays 76% of the marked price.", "\\(MP = 22800 \\div 0.76 = 30000\\)."],
        answer: "₹30,000",
      },
      selfCheckExample: {
        prompt: "A jacket sells for ₹1,770 after an 11.5% discount. What would it sell for with a 4% discount?",
        steps: [
          "\\(MP = 1770 \\div 0.885 = 2000\\).",
          "With 4% off it sells for \\(2000 \\times 0.96 = 1920\\).",
          "Check: the discount fell by 7.5% of 2000, that is ₹150, and \\(1770 + 150 = 1920\\).",
        ],
        answer: "₹1,920",
      },
      practiceSet: [
        { prompt: "An item marked ₹640 is sold for ₹512. Find the discount percentage.", answer: "20%" },
        { prompt: "A shirt marked ₹1,250 is sold at 16% off. How much does the buyer pay?", answer: "₹1,050" },
        { prompt: "A customer pays ₹2,550 after a 15% discount. How many rupees did the discount save?", answer: "₹450", method: "The marked price is ₹3,000." },
      ],
      pyqExampleId: "dd098e40-b66a-4419-bac8-9b47665a1f46",
      traps: [
        {
          title: "Adding the discount back to the selling price",
          body: "A price of ₹420 after a 30% discount gives \\(MP = 420 \\div 0.7 = 600\\), not \\(420 \\times 1.3 = 546\\). The 30% was of the marked price.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ppdi-markup",
      name: "Mark-up, discount and profit together",
      intuition:
        "Cost, selling price and marked price sit on one line. Take the cost as 100, mark it up, take the discount off, and whatever is left above 100 is the profit.",
      definition:
        "- With cost 100, a mark-up of \\(m\\%\\) and a discount of \\(d\\%\\): \\(SP = (100 + m)\\left(1 - \\frac{d}{100}\\right)\\).\n" +
        "- Net profit % \\(= m - d - \\frac{md}{100}\\).\n" +
        "- \\(\\frac{MP}{CP} = \\frac{100 + p}{100 - d}\\) links the mark-up, the discount and the profit \\(p\\).\n" +
        "- To find the discount that gives a profit \\(p\\%\\): \\(SP = CP\\left(1 + \\frac{p}{100}\\right)\\), then discount \\(= \\frac{MP - SP}{MP} \\times 100\\).\n" +
        "- If the cost changes but the marked price does not, find the new selling price from the NEW cost and compare it with the same marked price.",
      formula: {
        label: "Marked price, discount and profit",
        latex: "\\frac{MP}{CP} = \\frac{100 + p}{100 - d}, \\quad p = m - d - \\frac{md}{100}",
      },
      authoredExample: {
        prompt: "A trader marks his goods 60% above cost and gives a 25% discount. Find his profit percentage.",
        steps: ["Cost 100, marked price 160.", "Selling price \\(= 160 \\times 0.75 = 120\\), a 20% profit.", "Check: \\(60 - 25 - \\frac{60 \\times 25}{100} = 20\\)."],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "An item is marked 30% above its cost. What discount gives a profit of 17%?",
        steps: ["Cost 100: marked price 130, selling price 117.", "Discount \\(= \\frac{13}{130} \\times 100 = 10\\%\\)."],
        answer: "10%",
      },
      practiceSet: [
        { prompt: "A dealer marks his goods 40% above cost and allows 25% off. Find his profit or loss percentage.", answer: "A 5% profit", method: "\\(140 \\times 0.75 = 105\\)" },
        { prompt: "A shop wants a 26% profit after a 10% discount. How far above cost must it mark its goods?", answer: "40%", method: "\\(\\frac{126}{90} = 1.4\\)" },
        { prompt: "A shop gains 32% after giving a 12% discount. What would it gain with no discount?", answer: "50%", method: "\\(MP = 132 \\div 0.88 = 150\\)" },
      ],
      pyqExampleId: "a3641dad-38ab-4955-ad7f-0302c7ffab20",
      traps: [
        {
          title: "Subtracting the discount from the mark-up",
          body: "A 30% mark-up with a 30% discount is not break-even: \\(1.3 \\times 0.7 = 0.91\\), a 9% loss.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ppdi-successive",
      name: "Successive discounts and free-item offers",
      intuition:
        "A second discount acts on the price left after the first, so discounts in a row multiply like any chain of changes. 'Buy some, get some free' is a discount as well, counted in pieces instead of rupees.",
      definition:
        "- Discounts \\(d_1, d_2, d_3\\) leave \\(\\left(1 - \\frac{d_1}{100}\\right)\\left(1 - \\frac{d_2}{100}\\right)\\left(1 - \\frac{d_3}{100}\\right)\\) of the marked price.\n" +
        "- Two discounts equal one discount of \\(d_1 + d_2 - \\frac{d_1 d_2}{100}\\). The order of the discounts does not matter.\n" +
        "- Two discounts of \\(a\\%\\) and \\(b\\%\\) always take off less than one discount of \\((a + b)\\%\\).\n" +
        "- 'Buy \\(n\\), get \\(m\\) free': the customer pays for \\(n\\) of \\(n + m\\) items, a discount of \\(\\frac{m}{n + m} \\times 100\\).",
      formula: {
        label: "Single discount equal to two",
        latex: "d = d_1 + d_2 - \\frac{d_1 d_2}{100}",
      },
      authoredExample: {
        prompt: "Find the single discount equal to successive discounts of 25%, 20% and 10%.",
        steps: ["The buyer pays \\(0.75 \\times 0.8 \\times 0.9 = 0.54\\) of the marked price.", "The single discount is \\(1 - 0.54 = 0.46\\), that is 46%."],
        answer: "46%",
      },
      selfCheckExample: {
        prompt: "A shop offers 'buy 3, get 1 free' and then 10% off the bill. Find the single equivalent discount.",
        steps: ["The offer means paying for 3 of 4 items, a factor of 0.75.", "With 10% off: \\(0.75 \\times 0.9 = 0.675\\), so the discount is 32.5%."],
        answer: "32.5%",
      },
      practiceSet: [
        { prompt: "A TV marked ₹40,000 gets successive discounts of 15% and 5%. Find the price paid.", answer: "₹32,300" },
        { prompt: "Which is better for a buyer: one discount of 30%, or 20% followed by 10%?", answer: "One discount of 30%", method: "20% then 10% is only 28% off." },
        { prompt: "After successive discounts of 20% and 25%, a lamp costs ₹1,440. Find its marked price.", answer: "₹2,400", method: "\\(1440 \\div 0.6\\)" },
      ],
      pyqExampleId: "5c8192b7-818f-4852-b5f6-3ead68a18ee8",
      traps: [
        {
          title: "Adding successive discounts",
          body: "Two discounts of 15% take off 27.75% in all, not 30%: \\(0.85 \\times 0.85 = 0.7225\\).",
        },
        {
          title: "Counting the free item against what is paid",
          body: "'Buy 4, get 1 free' is 1 free item in 5, a 20% discount, not 25%. The base is all the items taken home.",
        },
      ],
    },
  ],
};
