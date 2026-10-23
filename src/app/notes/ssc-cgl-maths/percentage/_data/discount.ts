import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_DISCOUNT_NOTE: SubtopicNote = {
  subtopicName: "Marked Price and Discount",
  title: "Marked Price and Discount",
  oneLineDefinition:
    "A discount is taken off the marked price; a trader marks above cost and discounts below the mark, and the profit is what survives both steps.",
  whyItMatters:
    "81 questions in the bank, the largest page of the chapter, and 42 of them from 2025. 53 are EASY. Almost every one is the chain cost price, then marked price, then selling price, run forwards to find a profit or backwards to find a price, so one equation does most of the work.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscppmd-discount",
      name: "Discount on the marked price",
      intuition:
        "The marked price (MP), also called the list, printed or labelled price, is what the tag says. A discount is a reduction from it, and its percentage is always measured on the marked price unless the question says 'on the discounted price'.",
      definition:
        "- Discount \\(= MP - SP\\), and discount % \\(= \\frac{\\text{discount}}{MP} \\times 100\\).\n" +
        "- \\(SP = MP\\left(1 - \\frac{d}{100}\\right)\\), so \\(MP = \\frac{SP}{1 - d/100}\\).\n" +
        "- A flat discount in rupees is simply subtracted; as a percentage it is \\(\\frac{\\text{rupees}}{MP} \\times 100\\).\n" +
        "- Tax such as GST or VAT is charged on the price after discount: amount paid \\(= MP\\left(1 - \\frac{d}{100}\\right)\\left(1 + \\frac{t}{100}\\right)\\).\n" +
        "- Two percentage steps give the same answer in either order, but a flat rupee discount and a percentage discount do **not**: the order changes the answer.",
      formula: {
        label: "Selling price after a discount",
        latex: "SP = MP\\left(1 - \\frac{d}{100}\\right) \\qquad d\\% = \\frac{MP - SP}{MP} \\times 100",
      },
      authoredExample: {
        prompt: "A jacket marked ₹2,400 is sold for ₹2,040. Find the discount percentage.",
        steps: ["Discount \\(= 2400 - 2040 = 360\\).", "Discount % \\(= \\frac{360}{2400} \\times 100 = 15\\%\\)."],
        answer: "15%",
      },
      selfCheckExample: {
        prompt: "A lamp is sold for ₹1,530 after a 10% discount. What was its marked price?",
        steps: ["\\(SP = 0.9 \\times MP\\).", "\\(MP = \\frac{1530}{0.9} = 1700\\)."],
        answer: "₹1,700",
      },
      practiceSet: [
        { prompt: "A bag marked ₹1,250 is sold at an 8% discount. Find its selling price.", answer: "₹1,150" },
        { prompt: "A shop takes ₹90 off an item marked ₹720. What is the discount percentage?", answer: "12.5%" },
        {
          prompt: "A shop raises its discount on an item marked ₹4,000 from 5% to 12%. How much more does a buyer save?",
          answer: "₹280",
        },
      ],
      pyqExampleId: "02a19e10-08f1-4a45-96fe-6a8b2dad9b95",
      traps: [
        {
          title: "Adding the discount back on the selling price",
          body:
            "After a 20% discount the selling price is 0.8 of the marked price, so the marked price is SP divided by 0.8. Multiplying the SP by 1.2 gives too small an answer.",
        },
        {
          title: "Treating a rupee discount like a percentage",
          body:
            "₹500 off and then 7% off a ₹10,000 bill leaves \\(9500 \\times 0.93 = 8835\\); 7% off first and then ₹500 off leaves 8,800. Apply them in the order the question gives.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppmd-forward",
      name: "Profit after a mark-up and a discount",
      intuition:
        "Marking up multiplies the cost by one factor and the discount multiplies the marked price by another. The profit factor is the product of the two, which is the successive-change rule with the discount as a fall.",
      definition:
        "- \\(SP = CP\\left(1 + \\frac{m}{100}\\right)\\left(1 - \\frac{d}{100}\\right)\\).\n" +
        "- Profit % \\(= m - d - \\frac{m\\,d}{100}\\). A negative answer is a loss.\n" +
        "- **Fast route:** call the cost price 100. Then MP \\(= 100 + m\\), SP \\(=\\) MP \\(\\times \\left(1 - \\frac{d}{100}\\right)\\), and the profit is SP \\(- 100\\).\n" +
        "- If the cost is given as a share of the marked price (CP is 75% of MP), call the MP 100 instead.\n" +
        "- If a selling price is given as a letter (sold at ₹P for a 20% profit), write CP in terms of P first, then follow the new marked price.",
      formula: {
        label: "Profit after mark-up and discount",
        latex: "\\text{profit}\\% = m - d - \\frac{m\\,d}{100}",
        symbols: [
          { symbol: "m", meaning: "mark-up above cost, in per cent" },
          { symbol: "d", meaning: "discount on the marked price, in per cent" },
        ],
      },
      authoredExample: {
        prompt: "A dealer marks his goods 30% above cost and gives a discount of 10%. Find his profit percentage.",
        steps: [
          "CP 100, MP 130, SP \\(= 130 \\times 0.9 = 117\\).",
          "Profit \\(= 17\\%\\). Formula check: \\(30 - 10 - \\frac{30 \\times 10}{100} = 17\\).",
        ],
        answer: "17%",
      },
      selfCheckExample: {
        prompt: "A shopkeeper marks an item 15% above cost and gives a 20% discount. Find his profit or loss percentage.",
        steps: ["CP 100, MP 115, SP \\(= 115 \\times 0.8 = 92\\).", "He loses 8 on 100."],
        answer: "An 8% loss",
      },
      practiceSet: [
        { prompt: "Goods marked 50% above cost are sold at a 30% discount. Find the profit or loss percentage.", answer: "A 5% profit" },
        { prompt: "The cost price is 80% of the marked price and the discount is 10%. Find the profit percentage.", answer: "12.5%" },
        {
          prompt: "An item sold for ₹Q gives a 10% profit. Later its marked price is set at ₹1.5Q with a 20% discount. Find the new profit percentage.",
          answer: "32% (\\(1.2 \\times 1.1 = 1.32\\))",
        },
      ],
      pyqExampleId: "de1a10e1-45f0-493c-9b96-8521c0bb0794",
      traps: [
        {
          title: "Subtracting the discount from the mark-up",
          body:
            "A 40% mark-up with a 15% discount is a profit of \\(40 - 15 - 6 = 19\\%\\), not 25%. The discount is taken on the larger marked price.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppmd-back",
      name: "Finding the cost or marked price from the profit",
      intuition:
        "The selling price can be reached from two sides: up from the cost by the profit, or down from the marked price by the discount. Setting the two equal gives one equation that answers almost every 'find the price' question.",
      definition:
        "- \\(CP\\left(1 + \\frac{p}{100}\\right) = SP = MP\\left(1 - \\frac{d}{100}\\right)\\).\n" +
        "- So \\(CP : MP = (100 - d) : (100 + p)\\).\n" +
        "- Mark-up needed for a profit p after a discount d: \\(\\frac{MP}{CP} = \\frac{100 + p}{100 - d}\\).\n" +
        "- Discount that gives a profit p from a mark-up m: SP \\(= 100 + p\\) on MP \\(= 100 + m\\), so \\(d = \\frac{m - p}{100 + m} \\times 100\\).\n" +
        "- A profit given in rupees is p% of CP, so CP \\(=\\) rupees \\(\\times \\frac{100}{p}\\).",
      formula: {
        label: "The two routes to the selling price",
        latex: "CP\\left(1 + \\frac{p}{100}\\right) = MP\\left(1 - \\frac{d}{100}\\right) \\qquad \\frac{CP}{MP} = \\frac{100 - d}{100 + p}",
      },
      authoredExample: {
        prompt: "A trader gives a 25% discount and still makes a 20% profit. His cost price is ₹1,000. Find the marked price.",
        steps: [
          "SP \\(= 1000 \\times 1.2 = 1200\\).",
          "SP is 75% of MP, so \\(MP = \\frac{1200}{0.75} = 1600\\).",
          "Check: 25% off 1,600 is 1,200.",
        ],
        answer: "₹1,600",
      },
      selfCheckExample: {
        prompt: "Goods are marked 40% above cost. What discount on the marked price gives a profit of 12%?",
        steps: ["CP 100, MP 140, SP must be 112.", "Discount \\(= \\frac{140 - 112}{140} \\times 100 = \\frac{28}{140} \\times 100 = 20\\%\\)."],
        answer: "20%",
      },
      practiceSet: [
        { prompt: "After a 10% discount a seller still gains 8%. Find the ratio CP : MP.", answer: "5 : 6" },
        {
          prompt: "An item marked 25% above cost is sold at a 4% discount for a gain of ₹80. Find the cost price.",
          answer: "₹400 (\\(1.25 \\times 0.96 = 1.2\\), a 20% gain)",
        },
        { prompt: "A seller wants a 26% profit after a 10% discount. By what percentage above cost must he mark his goods?", answer: "40%" },
      ],
      pyqExampleId: "23e0b488-621d-4eb4-8ce5-5ba83e4131aa",
      traps: [
        {
          title: "Marking up by profit plus discount",
          body:
            "To gain 20% after a 25% discount, the marked price must be \\(\\frac{120}{75} = 1.6\\) times the cost, that is 60% above cost, not 45%.",
        },
        {
          title: "Taking the discount as a share of the cost",
          body:
            "A discount percentage is of the marked price. With CP 100 and MP 140, a discount of 28 rupees is 20%, not 28%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppmd-stages",
      name: "Several stages and fixed rupee amounts",
      intuition:
        "The longest questions chain several steps: a wholesaler's mark-up and trade discount, then a retailer's mark-up and festival discount, a handling fee, a cash discount in rupees. The percentage steps multiply; the rupee amounts do not, so they go into an equation.",
      definition:
        "- Every percentage step is a factor: a mark-up \\(1 + \\frac{m}{100}\\), a discount \\(1 - \\frac{d}{100}\\), a fee or tax \\(1 + \\frac{f}{100}\\).\n" +
        "- Final price \\(=\\) first cost \\(\\times\\) all the factors. Divide by their product to go back.\n" +
        "- A fixed rupee amount (cash discount, repairs) cannot go into the product. Write an equation: \\(CP \\times \\text{factors} - 150 = CP\\left(1 + \\frac{p}{100}\\right)\\).\n" +
        "- Read who is paying whom at each step: one trader's selling price is the next trader's cost price.",
      formula: {
        label: "Price after several stages",
        latex:
          "\\text{final} = C\\left(1 + \\frac{m_1}{100}\\right)\\left(1 - \\frac{d_1}{100}\\right)\\left(1 + \\frac{m_2}{100}\\right)\\left(1 - \\frac{d_2}{100}\\right)",
      },
      authoredExample: {
        prompt:
          "A maker sells a lamp to a dealer at a 25% profit. The dealer marks it 40% above his own cost and gives a 10% discount. The customer pays ₹1,575. What did the lamp cost the maker?",
        steps: [
          "Combined factor: \\(1.25 \\times 1.4 \\times 0.9 = 1.575\\).",
          "Maker's cost \\(= \\frac{1575}{1.575} = 1000\\).",
          "Check forward: 1,000 to 1,250 to 1,750 to 1,575.",
        ],
        answer: "₹1,000",
      },
      selfCheckExample: {
        prompt: "Goods are marked 50% above cost, sold at a 20% discount and then given a further cash discount of ₹100. The profit is 15%. Find the cost price.",
        steps: [
          "Price after the 20% discount: \\(1.5 \\times 0.8 \\times C = 1.2C\\).",
          "\\(1.2C - 100 = 1.15C\\), so \\(0.05C = 100\\) and \\(C = 2000\\).",
        ],
        answer: "₹2,000",
      },
      practiceSet: [
        {
          prompt: "A wholesaler marks goods 40% above cost and gives a retailer a 25% trade discount. The retailer pays ₹2,100. Find the wholesaler's cost.",
          answer: "₹2,000 (factor 1.05)",
        },
        {
          prompt: "A buyer gets 20% off a ₹5,000 cycle, spends ₹600 on repairs and sells it for ₹5,750. Find his profit percentage.",
          answer: "25% (cost ₹4,600, profit ₹1,150)",
        },
      ],
      pyqExampleId: "8409d40f-b22c-4c6d-a74b-248025265428",
      traps: [
        {
          title: "Putting a rupee discount into the product",
          body:
            "A cash discount of ₹150 is not a percentage, so it cannot be multiplied in. Finish the percentage steps, then subtract the rupees.",
        },
      ],
    },
  ],
};
