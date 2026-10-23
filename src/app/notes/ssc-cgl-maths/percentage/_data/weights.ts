import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PP_WEIGHTS_NOTE: SubtopicNote = {
  subtopicName: "Faulty Weights and Article Counts",
  title: "Faulty Weights and Article Counts",
  oneLineDefinition:
    "A seller who hands over less than he charges for gains on quantity as well as on price; both effects multiply, and 'cost of x articles equals selling price of y' is the same idea counted in pieces.",
  whyItMatters:
    "28 questions in the bank, 20 of them MODERATE, which makes this the hardest page of the chapter for its size. Every one is the same comparison of what the customer pays for against what the seller gives, so learn the one factor and the dishonest-dealer questions become two-line sums.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscppfw-cost",
      name: "Faulty weight at the cost price",
      intuition:
        "A grocer who charges for 1 kg but hands over 900 g keeps 100 g for free on every sale. He paid only for the 900 g he gave, so his gain is the 100 g he kept, measured against the 900 g he gave.",
      definition:
        "- Gain % \\(= \\frac{\\text{true weight} - \\text{false weight}}{\\text{false weight}} \\times 100\\). The base is what the seller **gives**, because that is what he paid for.\n" +
        "- Working back: for a gain of g% at cost price, he gives \\(1000 \\times \\frac{100}{100 + g}\\) grams for each kilogram.\n" +
        "- Counting cheats work the same way: selling 11 eggs as a dozen gains 1 on 11.\n" +
        "- In rupees, the profit is the money taken minus the cost of the goods actually handed over.",
      formula: {
        label: "Gain from a short weight",
        latex: "\\text{gain}\\% = \\frac{\\text{true} - \\text{false}}{\\text{false}} \\times 100",
      },
      authoredExample: {
        prompt: "A grocer claims to sell at cost price but uses a 900 g weight for 1 kg. Find his gain percentage.",
        steps: [
          "He keeps \\(1000 - 900 = 100\\) g on every 900 g he gives.",
          "Gain \\(= \\frac{100}{900} \\times 100 = 11\\frac{1}{9}\\%\\).",
        ],
        answer: "\\(11\\frac{1}{9}\\%\\)",
      },
      selfCheckExample: {
        prompt: "A shopkeeper claims to sell at cost price but gains 25%. How many grams does he give for each kilogram?",
        steps: ["He gives \\(1000 \\times \\frac{100}{125}\\) grams.", "That is 800 g."],
        answer: "800 g",
      },
      practiceSet: [
        { prompt: "A seller gives 960 g for every kilogram and charges the cost price. Find his gain percentage.", answer: "\\(4\\frac{1}{6}\\%\\)" },
        { prompt: "A trader uses a 750 g weight in place of 1 kg and charges the cost price. Find his gain percentage.", answer: "\\(33\\frac{1}{3}\\%\\)" },
        { prompt: "A vendor sells 11 eggs as a dozen at the cost price of a dozen. Find his gain percentage.", answer: "\\(9\\frac{1}{11}\\%\\)" },
      ],
      pyqExampleId: "6895a490-68c7-4de6-a127-e09dc622ef29",
      traps: [
        {
          title: "Dividing by the true weight",
          body:
            "50 g short on every kilogram is a gain of \\(\\frac{50}{950} \\times 100 \\approx 5.26\\%\\), not 5%. The base is the 950 g handed over.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppfw-markup",
      name: "Faulty weight with a profit or loss on price",
      intuition:
        "Some sellers cheat twice: they charge more than cost and they give less than the weight. The price gives one factor, the weight gives another, and the real profit factor is the product of the two.",
      definition:
        "- Real factor \\(= \\left(1 + \\frac{p}{100}\\right) \\times \\frac{\\text{true}}{\\text{false}}\\). Subtract 1 and multiply by 100 for the real profit %.\n" +
        "- A loss on price uses \\(1 - \\frac{l}{100}\\); the short weight can still turn it into a gain.\n" +
        "- 'Weights 20% less than true' means false \\(= 0.8 \\times\\) true, so the weight factor is \\(\\frac{1}{0.8} = 1.25\\).\n" +
        "- **Rupee route:** take the cost of 1 kg as 100. Compare the money taken for the 'kilogram' with the cost of the grams actually given.",
      formula: {
        label: "Real profit with a short weight",
        latex: "1 + \\frac{\\text{gain}}{100} = \\left(1 + \\frac{p}{100}\\right) \\times \\frac{\\text{true}}{\\text{false}}",
      },
      authoredExample: {
        prompt: "A trader adds a 10% profit to the cost price and also gives 900 g for every kilogram. Find his real profit percentage.",
        steps: [
          "Price factor 1.1; weight factor \\(\\frac{1000}{900} = \\frac{10}{9}\\).",
          "Real factor \\(= 1.1 \\times \\frac{10}{9} = \\frac{11}{9}\\).",
          "Profit \\(= \\frac{2}{9} = 22\\frac{2}{9}\\%\\).",
        ],
        answer: "\\(22\\frac{2}{9}\\%\\)",
      },
      selfCheckExample: {
        prompt: "A seller sells at a 4% loss on cost but uses a 750 g weight for 1 kg. Find his real gain or loss percentage.",
        steps: ["Real factor \\(= 0.96 \\times \\frac{1000}{750} = 0.96 \\times \\frac{4}{3} = 1.28\\).", "A gain of 28%."],
        answer: "A 28% gain",
      },
      practiceSet: [
        { prompt: "Rice costs a seller ₹40 per kg. He charges ₹45 per kg and gives only 900 g. Find his real gain percentage.", answer: "25% (900 g cost him ₹36)" },
        {
          prompt: "A seller charges 20% above cost and his weights are 25% less than true. Find his real gain percentage.",
          answer: "60% (\\(1.2 \\times \\frac{4}{3} = 1.6\\))",
        },
        { prompt: "A vendor charges ₹9 for what he calls 1 kg of onions but gives only 900 g. What is the true price per kg?", answer: "₹10" },
      ],
      pyqExampleId: "75ab5939-d520-4b9d-a375-c281320c27d1",
      traps: [
        {
          title: "Adding the two gains",
          body:
            "A 10% mark-up with a weight 10% short is not a 20% gain. The factors multiply: \\(1.1 \\times \\frac{10}{9} = \\frac{11}{9}\\), a gain of about 22.2%.",
        },
        {
          title: "Reading 'weight 20% less' as a 20% gain",
          body:
            "If the weight is 20% less than true, the seller gives 0.8 of what he charges for, so the weight factor is \\(\\frac{1}{0.8} = 1.25\\), a 25% gain from the weight alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscppfw-counts",
      name: "Cost price of some articles equal to the selling price of others",
      intuition:
        "'The cost price of 28 oranges equals the selling price of 24' says that the money from selling 24 oranges buys 28. It is a faulty-weight question counted in pieces: the seller gets the value of 28 for handing over 24.",
      definition:
        "- If CP of x articles \\(=\\) SP of y articles, the profit % is \\(\\frac{x - y}{y} \\times 100\\). If \\(y > x\\), it is a loss of \\(\\frac{y - x}{y} \\times 100\\).\n" +
        "- 'Selling m articles gains the **selling** price of n': SP of \\((m - n)\\) \\(=\\) CP of m.\n" +
        "- 'Selling m articles gains the **cost** price of n': the profit % is \\(\\frac{n}{m} \\times 100\\).\n" +
        "- 'Buys x articles for the price of y': his cost per article is \\(\\frac{y}{x}\\) of the price, and a discount on that price works as on the Marked Price and Discount page.",
      formula: {
        label: "Profit when two counts are equal in value",
        latex: "\\text{profit}\\% = \\frac{x - y}{y} \\times 100 \\text{ when CP of } x = \\text{SP of } y",
      },
      authoredExample: {
        prompt: "The cost price of 15 pens equals the selling price of 12 pens. Find the profit percentage.",
        steps: [
          "Let one pen cost ₹1, so 12 pens sell for ₹15.",
          "Profit on 12 pens \\(= 15 - 12 = 3\\) on a cost of 12.",
          "\\(\\frac{3}{12} \\times 100 = 25\\%\\).",
        ],
        answer: "25%",
      },
      selfCheckExample: {
        prompt: "By selling 30 bags a trader gains the selling price of 5 bags. Find his gain percentage.",
        steps: ["SP of \\(30 - 5 = 25\\) bags \\(=\\) CP of 30 bags.", "Gain \\(= \\frac{30 - 25}{25} \\times 100 = 20\\%\\)."],
        answer: "20%",
      },
      practiceSet: [
        { prompt: "The cost price of 10 chairs equals the selling price of 12 chairs. Find the profit or loss percentage.", answer: "A loss of \\(16\\frac{2}{3}\\%\\)" },
        { prompt: "On selling 20 kg of rice, a grocer gains the cost price of 4 kg. Find his gain percentage.", answer: "20%" },
        {
          prompt: "A shopkeeper buys 6 books for the price of 5 and sells each book at the full price. Find his gain percentage.",
          answer: "20% (each book costs him \\(\\frac{5}{6}\\) of the price)",
        },
      ],
      pyqExampleId: "c7f366ef-a212-417b-ae49-ecf83099e154",
      traps: [
        {
          title: "Dividing by the larger count",
          body:
            "When the cost price of 28 equals the selling price of 24, the gain is 4 on the 24 sold, so \\(\\frac{4}{24} = 16\\frac{2}{3}\\%\\), not \\(\\frac{4}{28}\\).",
        },
        {
          title: "Mixing up 'gains the SP of n' and 'gains the CP of n'",
          body:
            "Gaining the cost price of 3 articles on 12 sold is a gain of \\(\\frac{3}{12} = 25\\%\\). Gaining the selling price of 3 on 12 sold means SP of 9 equals CP of 12, a gain of \\(33\\frac{1}{3}\\%\\).",
        },
      ],
    },
  ],
};
