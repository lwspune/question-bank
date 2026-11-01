import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XNI_INCOME_NOTE: SubtopicNote = {
  subtopicName: "National Income Accounting",
  title: "National Income Accounting",
  oneLineDefinition:
    "GDP, GNP, NDP and NNP and how each is reached from the others, what national income counts and leaves out, the history of measuring it in India, and the circular flow with the multiplier.",
  whyItMatters:
    "Twenty-seven questions in the bank: eight from the 2023 shifts, 14 from the 2024 shifts and five from the 2025 shifts. Most are one-step relations (NDP is GDP minus depreciation, real growth is nominal growth minus inflation), so the formulas on this page answer them in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscxnina-aggregates",
      name: "From GDP to national income",
      intuition:
        "Four aggregates differ by two corrections. Add the income Indians earn abroad (net of what foreigners earn here) to go from domestic to national. Take away depreciation to go from gross to net. National income is the net, national figure at factor cost.",
      definition:
        "The relations:\n" +
        "- **GNP = GDP + net factor income from abroad**.\n" +
        "- **NDP = GDP minus depreciation**; **NNP = GNP minus depreciation**. Depreciation is also called **consumption of fixed capital**.\n" +
        "- **National income = NNP at factor cost** (NNP at market prices less net indirect taxes).\n" +
        "- **Gross investment = net investment + depreciation**.\n\n" +
        "What is counted:\n" +
        "- Only **final** goods. **Intermediate** goods are left out, because their value is already inside the final goods.\n" +
        "- **Factor payments** are rent, wages, interest and profit. A **pension** is a transfer, not a factor payment.\n" +
        "- **Domestic income** is earned inside the country, by anyone; it excludes what non-residents earn abroad.\n" +
        "- A **flow** (production, imports) is measured over a period; a **stock** at a point in time.\n" +
        "- **Change in inventories = production minus sales** in the year.\n\n" +
        "Prices: nominal GDP is at **current** prices, real GDP at **constant** prices, and the **GDP deflator = nominal GDP / real GDP x 100**. **Real growth is about nominal growth minus inflation.** **Per capita income** falls when population grows faster than income.\n\n" +
        "GDP is not a full measure of welfare: it ignores depreciation, pollution and how income is shared.",
      formula: {
        latex: "\\text{NNP}_{FC} = \\text{GDP}_{MP} + \\text{NFIA}-\\text{Dep}-\\text{NIT}",
        label: "National income from GDP",
        symbols: [
          { symbol: "NFIA", meaning: "Net factor income from abroad" },
          { symbol: "Dep", meaning: "Depreciation" },
          { symbol: "NIT", meaning: "Net indirect taxes" },
        ],
      },
      authoredExample: {
        prompt: "A country's GDP at market prices is Rs 500 crore, net factor income from abroad is Rs 20 crore, depreciation Rs 40 crore and net indirect taxes Rs 30 crore. Find the national income.",
        steps: [
          "GNP at market prices = 500 + 20 = 520.",
          "NNP at market prices = 520 minus 40 = 480.",
          "National income (NNP at factor cost) = 480 minus 30 = 450.",
        ],
        answer: "Rs 450 crore.",
      },
      pyqExampleId: "e0f28469-1cc2-4ae1-99b8-82731e28f5d3",
      selfCheckExample: {
        prompt: "Nominal GDP grew 12% and prices rose 5%. About how much did real output grow?",
        steps: ["Real growth is about nominal growth minus inflation.", "12 minus 5 is 7."],
        answer: "About 7%.",
      },
      practiceSet: [
        { prompt: "What is subtracted from GDP to get NDP?", answer: "Depreciation" },
        { prompt: "Is a pension a factor payment?", answer: "No; it is a transfer payment" },
        { prompt: "Why are intermediate goods left out of GDP?", answer: "Their value is already counted in the final goods" },
        { prompt: "What is the GDP deflator?", answer: "Nominal GDP divided by real GDP, times 100" },
        { prompt: "National income is which aggregate?", answer: "NNP at factor cost" },
      ],
      traps: [
        {
          title: "Domestic adds nothing from abroad",
          body: "**GDP + net factor income from abroad = GNP**. A formula that adds it to get NDP is wrong; **NDP = GDP minus depreciation**.",
        },
        {
          title: "Gross is net plus depreciation",
          body: "**Gross investment = net investment + depreciation**. So net investment is gross minus depreciation, not plus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxnina-history",
      name: "Sectors and how India measured its income",
      intuition:
        "The economy has three sectors, and agriculture's share of output shrank while its share of workers barely moved. The first estimates of India's income came from three people SSC asks about.",
      definition:
        "Sectors: **primary** (agriculture, forestry, fishing, mining), **secondary** (manufacturing), **tertiary** (services).\n\n" +
        "Measuring national income:\n" +
        "- **Dadabhai Naoroji** made the **first** attempt.\n" +
        "- **V. K. R. V. Rao** used the **first scientific** method (1931) and divided the economy into a primary and a secondary sector.\n" +
        "- **P. C. Mahalanobis** led the **first official** attempt.\n" +
        "- The CSO switched to **Gross Value Added** in **January 2015**, with base year 2011-12.\n\n" +
        "Structural change: after independence agriculture's **share of GDP fell sharply**, but the **share of workers** in agriculture stayed high, about **65%** until 1990.",
      table: {
        columns: ["Person", "Contribution"],
        rows: [
          { cells: ["Dadabhai Naoroji", "First attempt"] },
          { cells: ["V. K. R. V. Rao", "First scientific method; primary and secondary sectors"], pyqExampleId: "09fb7266-ea0a-403a-beea-a08f2c57ea62" },
          { cells: ["P. C. Mahalanobis", "First official estimate"] },
          { cells: ["CSO, 2015", "Gross Value Added adopted"], pyqExampleId: "89ceb6ea-e0ff-43eb-ad7c-2849aea2a9af" },
        ],
      },
      pyqExampleId: "a621f2fc-1cc4-4931-a5fb-3cf8d789fa52",
      selfCheckExample: {
        prompt: "Who made the first, the first scientific, and the first official estimates of India's national income?",
        steps: ["The first attempt was Dadabhai Naoroji's.", "The first scientific method was V. K. R. V. Rao's, and the first official estimate P. C. Mahalanobis's."],
        answer: "Naoroji, V. K. R. V. Rao, Mahalanobis.",
      },
      practiceSet: [
        { prompt: "To which sector does agriculture belong?", answer: "The primary sector" },
        { prompt: "When did the CSO adopt Gross Value Added?", answer: "January 2015" },
        { prompt: "What happened to agriculture's share of workers between 1950 and 1990?", answer: "It stayed high, about 65%" },
      ],
      traps: [
        {
          title: "Rao, not Naoroji, split the sectors",
          body: "It was **V. K. R. V. Rao** who divided the economy into primary and secondary sectors. A statement giving this to Naoroji is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscxnina-flow",
      name: "Circular flow and the multiplier",
      intuition:
        "Money goes round: households spend on firms, firms pay households. Some money leaks out of the circle and some is injected in. An extra rupee of investment raises income by more than a rupee, because each round of spending becomes someone else's income.",
      definition:
        "Circular flow:\n" +
        "- **Leakages**: savings, taxes, imports. **Injections**: investment, government spending, exports. In balance, leakages equal injections.\n" +
        "- Goods flow one way and money the other.\n\n" +
        "The **multiplier**: a rise in investment raises income by **k** times as much, where **k = 1 / MPS = 1 / (1 minus MPC)**. Because the MPS is less than one, k is more than one.",
      formula: {
        latex: "k = \\frac{1}{1-MPC} = \\frac{1}{MPS}",
        label: "Investment multiplier",
        symbols: [
          { symbol: "MPC", meaning: "Marginal propensity to consume" },
          { symbol: "MPS", meaning: "Marginal propensity to save" },
        ],
      },
      authoredExample: {
        prompt: "The marginal propensity to consume is 0.75. By how much will income rise if investment rises by Rs 100 crore?",
        steps: ["k = 1 / (1 minus 0.75) = 1 / 0.25 = 4.", "Rise in income = 4 x 100 = 400."],
        answer: "Rs 400 crore.",
      },
      pyqExampleId: "5ba658af-279d-4081-90d6-00bdfb706a30",
      selfCheckExample: {
        prompt: "Is saving an injection into or a leakage from the circular flow? Name one injection.",
        steps: ["Saving takes money out of the spending stream, so it is a leakage.", "Investment, government spending and exports are injections."],
        answer: "A leakage; investment (or government spending or exports) is an injection.",
      },
      practiceSet: [
        { prompt: "If the MPS is 0.2, what is the multiplier?", answer: "5" },
        { prompt: "Are exports a leakage or an injection?", answer: "An injection" },
        { prompt: "Are imports a leakage or an injection?", answer: "A leakage" },
      ],
      traps: [
        {
          title: "Saving is a leakage",
          body: "A statement that savings and government spending are both injections is false: **saving is a leakage**.",
        },
      ],
    },
  ],
};
