import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_OFFERS_NOTE: SubtopicNote = {
  subtopicName: "Successive Discounts and Offers",
  title: "Successive Discounts and Offers",
  oneLineDefinition:
    "Two or more discounts one after another, and offers such as 'buy 5, get 2 free', each turned into a single equal discount so they can be priced and compared.",
  whyItMatters:
    "54 questions in the bank and 47 of them EASY, so this is the quickest page in the chapter to master. The work is always the share of the price that is kept, multiplied through. The only real traps are adding discounts and reading a free-item offer over the wrong total.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscppsd-equivalent",
      name: "Single discount equal to successive discounts",
      intuition:
        "The second discount is taken on the price that is already reduced, so it saves less than it would on the marked price. Two discounts of a% and b% therefore add up to less than \\((a + b)\\%\\).",
      definition:
        "- Price paid \\(= MP\\left(1 - \\frac{a}{100}\\right)\\left(1 - \\frac{b}{100}\\right)\\).\n" +
        "- Single equal discount \\(= a + b - \\frac{ab}{100}\\) per cent.\n" +
        "- For three discounts, combine two with the formula and then combine that result with the third.\n" +
        "- The order of the discounts does not change the final price.\n" +
        "- **Fast route:** multiply what is **kept**. Discounts of 20% and 25% keep \\(0.8 \\times 0.75 = 0.6\\) of the price, so the single discount is 40%.",
      formula: {
        label: "Equal single discount",
        latex: "D = a + b - \\frac{ab}{100}",
        symbols: [{ symbol: "a, b", meaning: "the two successive discounts, in per cent" }],
      },
      authoredExample: {
        prompt: "Find the single discount equal to successive discounts of 20% and 15%.",
        steps: [
          "\\(D = 20 + 15 - \\frac{20 \\times 15}{100} = 35 - 3 = 32\\%\\).",
          "Kept check: \\(0.8 \\times 0.85 = 0.68\\), so 32% is taken off.",
        ],
        answer: "32%",
      },
      selfCheckExample: {
        prompt: "An item marked ₹8,000 is given successive discounts of 10%, 10% and 5%. Find its selling price.",
        steps: ["Kept: \\(0.9 \\times 0.9 \\times 0.95 = 0.7695\\).", "\\(8000 \\times 0.7695 = 6156\\)."],
        answer: "₹6,156",
      },
      practiceSet: [
        { prompt: "Successive discounts of 30% and 20% are equal to what single discount?", answer: "44%" },
        { prompt: "Two successive discounts of 50% each are equal to what single discount?", answer: "75%" },
        {
          prompt: "After successive discounts of 25%, 25% and 20%, what percentage of the marked price does a buyer pay?",
          answer: "45% (\\(0.75 \\times 0.75 \\times 0.8\\))",
        },
      ],
      pyqExampleId: "907fe6ac-decc-40cd-aab9-cb4344138513",
      traps: [
        {
          title: "Adding successive discounts",
          body: "Discounts of 30% and 20% one after the other are a single discount of 44%, not 50%.",
        },
        {
          title: "Giving the share paid as the discount",
          body: "If the buyer pays 0.528 of the marked price, the single discount is 47.2%, not 52.8%. Subtract the kept share from 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppsd-unknown",
      name: "Finding a missing discount or the bill",
      intuition:
        "If you know the marked price, the final price and one discount, the other discount is whatever share is still missing. If you know how far apart two discount schemes are in rupees, that gap is a known percentage of the bill.",
      definition:
        "- **Missing second discount:** find the price after the first discount, then second discount \\(= \\frac{\\text{price after first} - \\text{final}}{\\text{price after first}} \\times 100\\).\n" +
        "- **Missing first discount:** divide the final price by the second factor to get the price after the first.\n" +
        "- **Gap between schemes:** a single discount D and successive discounts with equal single discount \\(D_{eq}\\) differ by \\((D - D_{eq})\\%\\) of the bill, so bill \\(=\\) rupee gap \\(\\div \\frac{D - D_{eq}}{100}\\).\n" +
        "- **Missing third discount:** the product of the kept factors equals \\(1 - \\frac{\\text{single discount}}{100}\\).",
      formula: {
        label: "Bill from the gap between two schemes",
        latex: "\\text{bill} = \\frac{\\text{rupee gap}}{(D - D_{eq}) / 100}",
      },
      authoredExample: {
        prompt: "A bag marked ₹2,500 is sold for ₹1,800 after two successive discounts. The first discount is 20%. Find the second.",
        steps: [
          "After the first discount: \\(2500 \\times 0.8 = 2000\\).",
          "Second discount \\(= \\frac{2000 - 1800}{2000} \\times 100 = 10\\%\\).",
        ],
        answer: "10%",
      },
      selfCheckExample: {
        prompt: "On a bill, a single discount of 35% saves ₹90 more than successive discounts of 20% and 15%. Find the bill.",
        steps: [
          "Successive 20% and 15% equal \\(20 + 15 - 3 = 32\\%\\).",
          "The gap is \\(35\\% - 32\\% = 3\\%\\) of the bill, which is 90.",
          "Bill \\(= \\frac{90}{0.03} = 3000\\).",
        ],
        answer: "₹3,000",
      },
      practiceSet: [
        { prompt: "Successive discounts of 20% and x% are equal to a single discount of 28%. Find x.", answer: "10" },
        {
          prompt: "An item marked ₹1,200 is sold for ₹900 after a first discount of 10% and then a second discount. Find the second discount.",
          answer: "\\(16\\frac{2}{3}\\%\\)",
        },
      ],
      pyqExampleId: "5531783d-348a-42be-88e0-b5c2b75e0fc4",
      traps: [
        {
          title: "Taking the second discount on the marked price",
          body:
            "The second discount is a share of the price after the first one. ₹1,200 down to ₹900 with a first 10% leaves a second discount of 180 out of 1,080, which is \\(16\\frac{2}{3}\\%\\), not 180 out of 1,200.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppsd-compare",
      name: "Comparing schemes and free-item offers",
      intuition:
        "To compare schemes that look different (two discounts, one discount, free items), turn every one into the same number: the share of the price the buyer actually pays. The smallest share is the biggest discount and the lowest price.",
      definition:
        "- **Buy x, get y free:** the buyer pays for x and takes away \\(x + y\\), so the discount is \\(\\frac{y}{x + y}\\).\n" +
        "- 'Buy 3 for the price of 2' gives one free in every three: a discount of \\(\\frac{1}{3}\\).\n" +
        "- For successive schemes, compare the products of the kept factors.\n" +
        "- Read the question's direction: the **lowest** selling price has the **largest** discount, and the **highest** selling price has the smallest.\n" +
        "- Free items given away by the seller still cost him money, so in a profit question count them in the cost but not in the sales.",
      formula: {
        label: "Discount from free items",
        latex: "\\text{buy } x \\text{ get } y \\text{ free: discount} = \\frac{y}{x + y} \\times 100\\%",
      },
      authoredExample: {
        prompt: "Which is better for a buyer: 'buy 4, get 1 free' or a single discount of 22%?",
        steps: [
          "Buy 4, get 1 free: the buyer pays for 4 of 5, a discount of \\(\\frac{1}{5} = 20\\%\\).",
          "22% is more than 20%, so the single discount is better.",
        ],
        answer: "The single discount of 22%",
      },
      selfCheckExample: {
        prompt:
          "Which scheme gives the lowest price: (i) successive discounts of 30% and 10%, (ii) successive discounts of 25% and 15%, (iii) a single discount of 36%?",
        steps: [
          "Kept shares: (i) \\(0.7 \\times 0.9 = 0.63\\); (ii) \\(0.75 \\times 0.85 = 0.6375\\); (iii) 0.64.",
          "The smallest kept share is (i), a discount of 37%.",
        ],
        answer: "Scheme (i)",
      },
      practiceSet: [
        { prompt: "What discount does 'buy 2, get 1 free' give?", answer: "\\(33\\frac{1}{3}\\%\\)" },
        { prompt: "A shop gives 2 items free with every 8 bought. What percentage of the items taken are paid for?", answer: "80%" },
        { prompt: "Which is larger: two successive discounts of 10% each, or a single discount of 19.5%?", answer: "The single 19.5% (the pair is 19%)" },
      ],
      pyqExampleId: "c032b2e5-3aaa-4a87-b87b-fecd0ee83f98",
      traps: [
        {
          title: "Dividing the free items by the items paid for",
          body:
            "'Buy 5, get 2 free' is a discount of \\(\\frac{2}{7}\\), about 28.6%, because the buyer takes away 7 items. Dividing 2 by 5 gives 40%, which is wrong.",
        },
        {
          title: "Answering the opposite of the question",
          body:
            "A question that asks under which scheme the selling price is highest wants the scheme with the smallest discount, not the largest.",
        },
      ],
    },
  ],
};
