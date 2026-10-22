import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MI_DEMAND_NOTE: SubtopicNote = {
  subtopicName: "Choice, Utility and Demand",
  title: "Choice, Utility and Demand",
  oneLineDefinition:
    "Opportunity cost and why people trade, how total and marginal utility move together, and what makes a buyer move along a demand curve or shift the whole curve.",
  whyItMatters:
    "Thirteen CDS questions, five of them from the two 2019 papers. Movement along the curve against a shift of the curve was asked in 2020 (II) and again in 2021 (II), and opportunity cost in 2020 (I) and 2021 (II), so these two ideas pay off first.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmi-opportunity-cost",
      name: "Scarcity, opportunity cost and exchange",
      intuition:
        "Time and money are limited, so choosing one thing means giving up another. Economists measure the cost of a choice by the best thing you gave up, not by every thing you could have done. The same idea explains trade: two people swap only when each gets something worth more to them than what they hand over.",
      definition:
        "The basic ideas:\n" +
        "- **Scarcity**: wants are unlimited, resources are limited, so every society must choose.\n" +
        "- **Opportunity cost** of a choice = the value of the **next best alternative** given up. Not the sum of all alternatives, and not just the money paid out.\n" +
        "- **Voluntary exchange**: both sides trade only if each expects to gain, so it is a **win-win**, not a zero-sum game.\n" +
        "- An **economic model** simplifies reality to show cause and effect. It can be written in **words, diagrams, tables or equations**: equations are only one form.",
      table: {
        columns: ["Idea", "What it means"],
        rows: [
          {
            cells: ["Opportunity cost", "The value of the next best alternative given up"],
            noteAmber: "Asked twice: CDS 2020 (I) as a sum with daily wages, and CDS 2021 (II) as a definition.",
            pyqExampleId: "758a95d6-e4db-4f60-bc60-28f887f37da3",
          },
          {
            cells: ["Voluntary exchange", "Both parties gain, or they would not trade"],
            noteAmber: "CDS 2021 (II): a pure voluntary exchange is a win-win situation.",
            pyqExampleId: "cb1365c4-5912-4da8-8023-1ccccc1dd468",
          },
          {
            cells: ["Economic model", "A simplified picture of a theory, in words, diagrams or equations"],
            noteAmber: "CDS 2019 (II): the statement that is NOT correct is that models can be expressed only through equations.",
            pyqExampleId: "8ca98f5a-44f0-4bb0-b762-16c178e82d03",
          },
          { cells: ["Scarcity", "Limited resources against unlimited wants, which forces choice"] },
        ],
      },
      pyqExampleId: "6e93d83f-0301-4c0f-a979-d1aeb47abe76",
      selfCheckExample: {
        prompt: "A farmer grows wheat worth ₹50,000 on his land. He could instead have grown rice worth ₹40,000 or rented the land out for ₹30,000. What is the opportunity cost of growing wheat?",
        steps: [
          "Opportunity cost is the next best alternative given up, not the one chosen.",
          "Of the two choices he gave up, rice at ₹40,000 is worth more than the rent of ₹30,000.",
        ],
        answer: "₹40,000, the value of the rice he did not grow.",
      },
      practiceSet: [
        { prompt: "Is the opportunity cost of a choice the value of all the alternatives given up?", answer: "No. It is the value of the single next best alternative given up." },
        { prompt: "In a pure voluntary exchange between two people, who gains?", answer: "Both of them" },
        { prompt: "Name two forms, other than equations, in which an economic model can be set out.", answer: "Words and diagrams (tables also count)" },
        { prompt: "What basic problem forces every economy to make choices?", answer: "Scarcity: limited resources against unlimited wants" },
      ],
      traps: [
        {
          title: "Opportunity cost is what you give up, not what you take",
          body: "If a worker keeps a job paying ₹500 and turns down one paying ₹800, the opportunity cost is **₹800**, the wage given up. Adding the two (₹1,300) or taking the difference (₹300) are the usual distractors.",
        },
        {
          title: "Trade is not a zero-sum game",
          body: "An option saying one party's profit must be the other's loss is wrong for a voluntary exchange. **Both** sides gain, or the trade would not happen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmi-utility",
      name: "Total utility, marginal utility and indifference curves",
      intuition:
        "Utility is the satisfaction a good gives. The first glass of water on a hot day gives a lot, the fifth much less. So each extra unit adds less than the one before (falling marginal utility), and total utility keeps rising more and more slowly until it stops rising at all.",
      definition:
        "The rules:\n" +
        "- **Total utility (TU)**: satisfaction from all the units consumed.\n" +
        "- **Marginal utility (MU)**: the extra satisfaction from **one more** unit.\n" +
        "- **Law of diminishing marginal utility**: as more of a good is consumed, MU **falls**.\n" +
        "- While MU is **positive**, TU **rises**. When MU is **zero**, TU is at its **maximum**. When MU is **negative**, TU **falls**.\n" +
        "- At maximum TU, **average utility** (TU divided by units) is still **positive**, so it is not equal to MU there.\n" +
        "- **Indifference curve**: combinations of two goods giving the **same** satisfaction. Indifference curves are **convex to the origin**, a **higher** curve means **more** satisfaction, and two curves **never cut** each other.",
      formula: {
        label: "Marginal utility",
        latex: "MU_n = TU_n - TU_{n-1}",
        symbols: [
          { symbol: "\\(TU_n\\)", meaning: "total utility from n units" },
          { symbol: "\\(MU_n\\)", meaning: "extra utility from the nth unit" },
        ],
      },
      authoredExample: {
        prompt: "Total utility from 1, 2, 3 and 4 mangoes is 10, 18, 22 and 22 units. Find the marginal utility of each mango and say where total utility is at its maximum.",
        steps: [
          "MU of the 1st = 10 − 0 = 10.",
          "MU of the 2nd = 18 − 10 = 8; of the 3rd = 22 − 18 = 4; of the 4th = 22 − 22 = 0.",
          "MU falls from 10 to 0, which is diminishing marginal utility.",
          "TU stops rising where MU becomes zero, at the 4th mango.",
        ],
        answer: "MU = 10, 8, 4, 0. TU is at its maximum (22) at 4 mangoes, where MU is zero.",
      },
      selfCheckExample: {
        prompt: "Total utility from 3 cups of tea is 24 units and from 4 cups it is 21 units. What is the marginal utility of the 4th cup, and what is happening to total utility?",
        steps: [
          "MU of the 4th cup = 21 − 24 = −3.",
          "A negative MU means each extra cup lowers total satisfaction.",
        ],
        answer: "MU is −3, so total utility is falling.",
      },
      pyqExampleId: "036f13e1-ad52-45a5-9249-0c6ffcdd5d15",
      practiceSet: [
        { prompt: "Does a higher indifference curve show more or less satisfaction than a lower one?", answer: "More satisfaction" },
        { prompt: "What shape do indifference curves have with respect to the origin?", answer: "Convex to the origin" },
        { prompt: "Can two indifference curves of the same consumer cut each other?", answer: "No" },
        { prompt: "What happens to marginal utility as more units of a good are consumed?", answer: "It diminishes" },
      ],
      traps: [
        {
          title: "At maximum total utility, only marginal utility is zero",
          body: "When TU peaks, **MU = 0** but **average utility is still positive** (a positive total divided by a positive number of units). A statement that MU and average utility are equal there is wrong.",
        },
        {
          title: "Indifference curves never intersect",
          body: "If two curves crossed, the crossing point would give two different levels of satisfaction at once. So a statement that two indifference curves cut each other is always false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmi-law-of-demand",
      name: "The law of demand: movement and shift",
      intuition:
        "A demand curve answers one question: how much of this good will people buy at each of its prices, with everything else held fixed. So a change in the good's own price slides the buyer along the curve. A change in anything else (income, tastes, the price of another good, the number of buyers) moves the whole curve.",
      definition:
        "The law and its conditions:\n" +
        "- **Law of demand**: other things constant, a **rise in price lowers quantity demanded**. The demand curve slopes **downward**, so its **slope is negative**.\n" +
        "- **Assumptions** held constant: consumers' **income**, **tastes and preferences**, and **prices of related goods** (substitutes and complements). A **demonstration effect** (buying to copy others) is **not** one of them.\n" +
        "- **Movement along** the curve: caused **only** by a change in the good's **own price**.\n" +
        "- **Shift** of the curve: caused by a change in **income**, **tastes**, **population**, or **prices of substitutes and complements**.\n" +
        "- **Prices of inputs** affect the **seller's cost**, so they change **supply**, not demand.\n" +
        "- If the price of one good X rises: demand for X falls, but for another good Y the effect can go either way. Y becomes cheaper compared with X (buyers switch to it), yet buyers are poorer in real terms (they buy less of a normal good).",
      table: {
        columns: ["Change", "Effect on the demand curve for the good"],
        rows: [
          {
            cells: ["The good's own price falls", "Movement along the curve (more is bought)"],
            noteAmber: "Asked twice: CDS 2020 (II) asked what does NOT shift the curve, CDS 2021 (II) what moves along it. Both answers are the good's own price.",
            pyqExampleId: "14e165f6-a619-40f0-b61f-4f750c97514b",
          },
          { cells: ["Consumers' income rises", "The curve shifts (right for a normal good)"] },
          { cells: ["Population grows", "The curve shifts right"] },
          { cells: ["Price of a substitute or complement changes", "The curve shifts"] },
          {
            cells: ["Prices of inputs used to make the good change", "No effect on demand; supply changes instead"],
            noteAmber: "CDS 2022 (I): input prices are the one factor that does not influence quantity demanded.",
            pyqExampleId: "b8dbb7cb-10c2-409e-8428-bcdb0ba6e257",
          },
        ],
      },
      pyqExampleId: "e3b3b571-f041-4f5a-ac2d-5637447f401b",
      practiceSet: [
        { prompt: "What is the sign of the slope of a normal demand curve?", answer: "Negative" },
        { prompt: "Coffee becomes cheaper. Does the demand curve for tea (a substitute) move along itself or shift?", answer: "It shifts, to the left" },
        { prompt: "Do the prices of inputs used to make a good change its demand or its supply?", answer: "Its supply" },
        { prompt: "Is the demonstration effect one of the assumptions of the law of demand?", answer: "No. The law assumes income, tastes and the prices of related goods stay constant." },
      ],
      traps: [
        {
          title: "Own price moves along, everything else shifts",
          body: "Only a change in the good's **own price** gives a movement along its demand curve. Income, tastes, population and the prices of **other** goods all **shift** the curve.",
        },
        {
          title: "Input prices belong to supply",
          body: "The cost of raw materials or labour changes how much sellers offer, so it acts on **supply**. It is the odd one out in a list of things that influence demand.",
        },
        {
          title: "The effect on the other good is often indeterminate",
          body: "When good X becomes dearer, demand for X falls. For a second normal good Y, switching from X pushes demand up while the loss of real income pulls it down, so the **net effect on Y cannot be told** without more information.",
        },
      ],
    },
  ],
};
