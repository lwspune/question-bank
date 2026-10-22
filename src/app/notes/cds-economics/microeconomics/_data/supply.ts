import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MI_SUPPLY_NOTE: SubtopicNote = {
  subtopicName: "Supply, Elasticity and Market Price",
  title: "Supply, Elasticity and Market Price",
  oneLineDefinition:
    "The inputs a producer needs, what moves supply, how elasticity measures the response to price, how demand and supply settle the price, and where markets go wrong.",
  whyItMatters:
    "Eight CDS questions, two of them HARD and both from CDS 2024 (I). The hard ones test special cases: a perfectly elastic supply curve and a good with a spill-over benefit, so learn the extreme curves and not only the normal ones.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmi-factors",
      name: "Factors of production and capital",
      intuition:
        "To make anything you need a place to work, people to do the work, things to work with, and the skill to do it well. NCERT's village of Palampur groups these into land, labour, physical capital and human capital. Physical capital is everything man-made that goes into production, whether it lasts for years or is used up at once.",
      definition:
        "The four requirements of production (NCERT Class 9):\n" +
        "- **Land** and other natural resources.\n" +
        "- **Labour**: people who do the work.\n" +
        "- **Physical capital**: all man-made inputs needed at every stage of production, made of two parts.\n" +
        "- **Fixed capital** (part of physical capital): tools, machines and buildings, used over many years.\n" +
        "- **Working capital** (part of physical capital): raw materials and money in hand, used up in one round of production.\n" +
        "- **Human capital**: the knowledge and skill (enterprise) that puts the other three together.\n" +
        "- **Non-farm activities** (small manufacturing, shops, transport) need **little land**, unlike farming.",
      table: {
        columns: ["Input", "Examples"],
        rows: [
          { cells: ["Fixed capital", "Tools, machines, buildings"] },
          { cells: ["Working capital", "Raw materials, money in hand"] },
          { cells: ["Physical capital", "Fixed capital and working capital together"] },
          { cells: ["Human capital", "Knowledge, skill and enterprise of people"] },
          {
            cells: ["Land", "The input non-farm activities need least"],
            noteAmber: "CDS 2022 (I): land is required in less quantity in non-farming activities.",
            pyqExampleId: "fe2bc5d3-f702-48a5-a089-4f12220e388b",
          },
        ],
      },
      pyqExampleId: "b86c3e43-28f3-40e2-938d-c345369dca32",
      selfCheckExample: {
        prompt: "A potter buys clay, owns a wheel and a kiln, and keeps ₹2,000 in cash for the week. Sort these into fixed and working capital.",
        steps: [
          "The wheel and the kiln are used again and again for years, so they are fixed capital.",
          "The clay is used up in making pots, and the cash pays for this week's needs, so they are working capital.",
        ],
        answer: "Fixed capital: the wheel and the kiln. Working capital: the clay and the ₹2,000 cash.",
      },
      practiceSet: [
        { prompt: "Are raw materials fixed capital or working capital?", answer: "Working capital" },
        { prompt: "Name the four requirements of production in NCERT's Palampur story.", answer: "Land, labour, physical capital and human capital" },
        { prompt: "Which input do non-farm activities such as shops and small workshops need least?", answer: "Land" },
      ],
      traps: [
        {
          title: "Physical capital is the whole, not one part",
          body: "Tools, machines and buildings are **fixed** capital; raw materials and money in hand are **working** capital. A list that holds **both** kinds is **physical capital**.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmi-supply-elasticity",
      name: "Supply and price elasticity",
      intuition:
        "Sellers offer more when the price rises, because producing pays better. Elasticity measures how strongly a quantity reacts to a price change: a big reaction is elastic, a small one inelastic. Two extremes matter. If the amount simply cannot change, the curve is a vertical line. If sellers will supply any amount at one price, the curve is a flat line.",
      definition:
        "Supply and elasticity:\n" +
        "- **Law of supply**: other things constant, a **higher price** brings a **larger quantity supplied**. The supply curve slopes **upward**.\n" +
        "- Supply also rises when **input prices fall** (cost falls), when **technology improves**, or when the **prices of other goods** the firm could make **fall** (resources move to this good).\n" +
        "- **Price elasticity** = percentage change in quantity divided by percentage change in price.\n" +
        "- Greater than 1: **elastic**. Less than 1: **inelastic**. Equal to 1: **unit elastic**.\n" +
        "- **Perfectly inelastic** (elasticity 0): quantity fixed whatever the price, a **vertical** curve.\n" +
        "- **Perfectly elastic** (elasticity infinite): any quantity at one price, a **horizontal** curve.",
      formula: {
        label: "Price elasticity",
        latex: "e = \\dfrac{\\%\\ \\text{change in quantity}}{\\%\\ \\text{change in price}}",
        symbols: [
          { symbol: "\\(e\\)", meaning: "price elasticity of demand or of supply (demand elasticity is read without its minus sign)" },
        ],
      },
      authoredExample: {
        prompt: "The price of a pen rises from ₹10 to ₹12, and the quantity demanded falls from 100 pens to 90. Find the price elasticity of demand and say whether demand is elastic.",
        steps: [
          "Percentage change in price = (12 − 10) ÷ 10 × 100 = 20%.",
          "Percentage change in quantity = (90 − 100) ÷ 100 × 100 = −10%.",
          "Elasticity = 10 ÷ 20 = 0.5, ignoring the minus sign.",
          "0.5 is less than 1.",
        ],
        answer: "Elasticity is 0.5, so demand for pens is inelastic.",
      },
      selfCheckExample: {
        prompt: "When the price of tomatoes rises by 20%, farmers bring 30% more tomatoes to market. Find the price elasticity of supply.",
        steps: [
          "Elasticity of supply = 30 ÷ 20.",
          "1.5 is more than 1.",
        ],
        answer: "1.5, so supply is elastic.",
      },
      pyqExampleId: "39475029-9109-42b8-bc04-aaf60e10a0b3",
      practiceSet: [
        { prompt: "Which way does a normal supply curve slope?", answer: "Upward from left to right" },
        { prompt: "What is the elasticity of a horizontal (flat) supply curve?", answer: "Infinite: it is perfectly elastic" },
        { prompt: "A price elasticity of 0.4 is elastic or inelastic?", answer: "Inelastic, because it is less than 1" },
        { prompt: "What is an elasticity of exactly 1 called?", answer: "Unit elastic" },
        {
          prompt: "Other things equal, what happens to the supply of a good when the price of the raw material used to make it falls?",
          answer: "Supply increases, because the cost of production falls",
        },
      ],
      traps: [
        {
          title: "Vertical is inelastic, horizontal is elastic",
          body: "A **vertical** curve means quantity cannot change at all: elasticity **zero**, perfectly inelastic. A **horizontal** curve means any quantity at one price: elasticity **infinite**, perfectly elastic. Students often swap the two.",
        },
        {
          title: "A cheaper other good raises this good's supply",
          body: "If another good the firm could make becomes **cheaper**, making it pays less, so the firm moves its resources to **this** good and its supply **rises**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmi-equilibrium",
      name: "Market equilibrium and price controls",
      intuition:
        "In a free market the price is not set by anyone. It settles where the amount buyers want equals the amount sellers offer. If the price is too high, unsold goods pile up and sellers cut it; if it is too low, buyers queue and the price rises. The government sometimes overrides this with a legal minimum or maximum price.",
      definition:
        "How the market price works:\n" +
        "- **Price mechanism**: in a free market, price is set by the **interplay of demand and supply**.\n" +
        "- **Equilibrium**: where quantity demanded equals quantity supplied. Above it there is a **surplus**; below it a **shortage**.\n" +
        "- **Price floor**: a legal **minimum** price, set **above** equilibrium. Examples: **Minimum Support Price** (MSP) for crops, minimum wage.\n" +
        "- **Price ceiling**: a legal **maximum** price, set **below** equilibrium. Examples: **ration shop** prices, the **Maximum Retail Price** (MRP).\n" +
        "- With a **horizontal (perfectly elastic) supply** curve, a shift in demand changes only the **quantity**, never the price.\n" +
        "- With a **vertical (perfectly inelastic) supply** curve, a shift in demand changes only the **price**.",
      table: {
        columns: ["Case", "Result"],
        rows: [
          {
            cells: ["Price floor", "Legal minimum, for example MSP for crops"],
            noteAmber: "CDS 2019 (II): MSP for jowar is a price floor; MRP is a ceiling.",
            pyqExampleId: "738156c2-4143-4db3-92ca-9cf75b3fcf24",
          },
          { cells: ["Price ceiling", "Legal maximum, for example ration shop prices"] },
          {
            cells: ["Free-market price mechanism", "Price set by the forces of demand and supply"],
            noteAmber: "CDS 2019 (II): the working of the price mechanism is the interplay of demand and supply.",
            pyqExampleId: "7a14e15f-398c-471e-8d5f-b84e1ea8a2ab",
          },
          {
            cells: ["Demand falls, supply perfectly elastic", "Quantity falls, price unchanged"],
            noteAmber: "CDS 2024 (I), a HARD question.",
            pyqExampleId: "78f7e0da-0f6e-490f-be94-2b25d5beca6b",
          },
          { cells: ["Demand rises, supply perfectly inelastic", "Price rises, quantity unchanged"] },
        ],
      },
      pyqExampleId: "738156c2-4143-4db3-92ca-9cf75b3fcf24",
      selfCheckExample: {
        prompt: "At a price of ₹40, buyers want 500 kg of onions but sellers bring 700 kg. Is there a surplus or a shortage, and which way will the free-market price move?",
        steps: [
          "Quantity supplied (700) is more than quantity demanded (500), so 200 kg is left unsold.",
          "Sellers cut the price to clear the extra stock.",
        ],
        answer: "A surplus of 200 kg, so the price falls towards equilibrium.",
      },
      practiceSet: [
        { prompt: "Is a price ceiling set above or below the equilibrium price?", answer: "Below it" },
        { prompt: "In a free market, what does the price settle at?", answer: "The level where quantity demanded equals quantity supplied" },
        { prompt: "Supply of a painting by a dead artist is fixed. If demand for it rises, what changes: price, quantity or both?", answer: "Only the price rises" },
        { prompt: "When a price ceiling is set below the equilibrium price, is there a surplus or a shortage?", answer: "A shortage" },
      ],
      traps: [
        {
          title: "Floor is a minimum, ceiling is a maximum",
          body: "A **floor** stops the price falling (MSP, minimum wage). A **ceiling** stops it rising (ration shop prices, MRP). The words describe the limit, not the level of the price.",
        },
        {
          title: "Flat supply absorbs the shift in quantity",
          body: "If supply is **perfectly elastic** (horizontal), a fall in demand cuts the **quantity** and leaves the **price** where it was. Options that change the price are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmi-externality",
      name: "Externalities and market failure",
      intuition:
        "Sometimes an activity touches people who are not part of the deal. A factory's smoke harms neighbours who are never paid; a vaccinated child protects classmates who never paid for the shot. The market counts only the buyer's and seller's gains and costs, so it makes too much of the harmful thing and too little of the helpful one.",
      definition:
        "The ideas:\n" +
        "- **Externality**: a cost or benefit falling on people outside the transaction.\n" +
        "- **Negative externality** (pollution, overgrazing): social cost is more than private cost, so the market **over-produces**. Remedies: a **tax** or **cap and trade** of pollution permits.\n" +
        "- **Positive externality** (vaccination, education): social benefit is more than private benefit, so the market **under-produces**. Remedy: a **subsidy** equal to the gap between social and private benefit at the best output.\n" +
        "- **Tragedy of the commons**: a shared resource with free access (a pasture, a fishing ground) is overused, a classic **negative** externality.\n" +
        "- **Public goods** (street lights, national defence) are **non-rival** and **non-excludable**, so private firms under-supply them.",
      table: {
        columns: ["Case", "What the free market does"],
        rows: [
          { cells: ["Negative externality, such as factory smoke", "Over-produces"] },
          {
            cells: ["Positive externality, such as vaccination", "Under-produces"],
            noteAmber: "CDS 2024 (I): the statement that is NOT correct says the market over-produces a good with a positive externality.",
            pyqExampleId: "8a1307dc-8480-4e26-a2d4-da281f314d8d",
          },
          { cells: ["Shared pasture with free access", "Overuses it: the tragedy of the commons"] },
          { cells: ["Public good, such as a street light", "Supplies too little or none"] },
        ],
      },
      pyqExampleId: "8a1307dc-8480-4e26-a2d4-da281f314d8d",
      practiceSet: [
        { prompt: "Is the smoke from a factory a positive or a negative externality?", answer: "Negative" },
        { prompt: "Give one example of an activity with a positive externality.", answer: "Vaccination (education also counts)" },
        { prompt: "Name the two features of a public good.", answer: "Non-rival and non-excludable" },
        { prompt: "What tool does a government use to raise the output of a good with a positive externality?", answer: "A subsidy" },
      ],
      traps: [
        {
          title: "Positive externality means too little, not too much",
          body: "A spill-over **benefit** is not paid for, so buyers buy less than society would want: the market **under-produces**. Over-production goes with a spill-over **cost**.",
        },
      ],
    },
  ],
};
