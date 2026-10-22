import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_NI_POVERTY_NOTE: SubtopicNote = {
  subtopicName: "Poverty and Its Measurement",
  title: "Poverty and Its Measurement",
  oneLineDefinition:
    "How India draws its poverty line, from Naoroji to the Tendulkar and Rangarajan committees, how the Multidimensional Poverty Index counts the poor, and the schemes CDS asks about.",
  whyItMatters:
    "Eleven CDS questions, four of them in 2023. The committees are the core: Tendulkar was asked twice (2023 (I) and 2024 (I)), and the Multidimensional Poverty Index three times.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecni-poverty-lines",
      name: "Poverty lines and the committees",
      intuition:
        "A poverty line is the money a person needs each month to buy a minimum basket of food and other needs. The arguments are about what goes in the basket. Early lines counted calories; later committees added health, education and other spending and changed how the spending is recorded.",
      definition:
        "In time order:\n" +
        "- **Dadabhai Naoroji**, *Poverty and Un-British Rule in India* (1901): the first estimate of a **subsistence poverty line**, which made poverty a measurable indicator.\n" +
        "- **Alagh Task Force** (1979): a **calorie norm** of **2,400 per person per day in rural areas** and **2,100 in urban areas** (rural work is heavier). The basket also covered clothing, footwear, fuel and light, education and medical needs.\n" +
        "- **Lakdawala Committee** (1993): State-wise lines, still anchored to calories, on the **Uniform Reference Period** (URP: 30-day recall for all items).\n" +
        "- **Tendulkar Committee** (2009): **dropped the calorie anchor**, added spending on **health and education**, used the **all-India urban poverty line basket** as the reference for both rural and urban lines, and moved to the **Mixed Reference Period** (MRP: 365-day recall for some items). Poverty 2011-12: **21.9 per cent**.\n" +
        "- **Rangarajan Committee** (2014): a **food** component (calories, protein, fat), a **normative** level for essential non-food items (clothing, education, health, rent, conveyance) and a **behaviourally determined** level for other non-food items. Poverty 2011-12: **29.5 per cent**.",
      table: {
        columns: ["Year", "Body", "Key point"],
        rows: [
          {
            cells: ["1901", "Dadabhai Naoroji", "First estimate of a poverty line"],
            pyqExampleId: "82263863-617e-4c5b-9026-69a6293e42c6",
          },
          {
            cells: ["1979", "Alagh Task Force", "2,400 calories rural, 2,100 urban"],
            pyqExampleId: "50ee72fc-b9c8-4db7-9c7d-030656504321",
          },
          { cells: ["1993", "Lakdawala Committee", "State-wise calorie-based lines, uniform reference period"] },
          {
            cells: ["2009", "Tendulkar Committee", "No calorie anchor; urban basket as reference; mixed reference period; 21.9 per cent poor in 2011-12"],
            noteAmber: "CDS 2024 (I): Tendulkar used the all-India urban basket as the reference, and did not anchor to calories.",
            pyqExampleId: "c0112453-dbce-4c41-abe2-50561459db85",
          },
          {
            cells: ["2014", "Rangarajan Committee", "Food plus normative non-food plus behavioural non-food; 29.5 per cent poor in 2011-12"],
            pyqExampleId: "7dec2d5c-9420-4da6-ab44-2cc7a9e58598",
          },
        ],
      },
      pyqExampleId: "df6c5822-cf84-4852-8d6f-45cf32a4d234",
      selfCheckExample: {
        prompt: "One committee's line for 2011-12 put 21.9 per cent of Indians below it and another's put 29.5 per cent. Which committee gave the higher figure, and why would a later committee's line be higher?",
        steps: [
          "21.9 per cent is the Tendulkar figure; 29.5 per cent is the Rangarajan figure.",
          "Rangarajan added a normative allowance for essential non-food items, so its basket costs more and its line is higher.",
        ],
        answer: "Rangarajan; its basket includes more non-food spending, which raises the line and so the share below it.",
      },
      practiceSet: [
        { prompt: "What calorie norm per person per day was set for urban India?", answer: "2,100 calories" },
        { prompt: "Which committee of 2014 split non-food spending into a normative part and a behavioural part?", answer: "The Rangarajan Committee" },
        { prompt: "Which book of Dadabhai Naoroji first estimated a poverty line for India?", answer: "Poverty and Un-British Rule in India" },
        { prompt: "Which reference period did the Lakdawala Committee use?", answer: "The Uniform Reference Period (30-day recall for all items)" },
      ],
      traps: [
        {
          title: "Rural calories are higher, not lower",
          body: "The norm is **2,400** calories in **rural** areas and **2,100** in **urban** areas, because rural work is more physical. Options often swap the two.",
        },
        {
          title: "Tendulkar moved away from calories",
          body: "The Tendulkar Committee **dropped** the calorie anchor and added health and education spending. 'Anchored to the official calorie norm' describes the older method.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecni-mpi",
      name: "The Multidimensional Poverty Index",
      intuition:
        "Income alone can miss poverty: a family may have some cash but no clean water, no schooling and too little food. The Multidimensional Poverty Index counts a person as poor when they are short of several basic things at the same time, and then measures both how many are poor and how deep their poverty runs.",
      definition:
        "How it works:\n" +
        "- **Global MPI**: UNDP and the **Oxford Poverty and Human Development Initiative** (OPHI), from **2010**. Three dimensions, **health, education and standard of living**, with **10 indicators**.\n" +
        "- A person is **multidimensionally poor** if their **overlapping deprivations** reach **one third** or more of the weighted indicators.\n" +
        "- **MPI = H × A**: **H** (headcount ratio) is the share of people who are poor; **A** (intensity) is the average share of indicators in which the poor are deprived.\n" +
        "- **National MPI** (**NITI Aayog**, first report 2021, built on NFHS data): the same three dimensions with **12 indicators**, adding **maternal health** and **bank account**.\n" +
        "- Education is measured by **years of schooling** and **school attendance**, not by the literacy rate.\n" +
        "- Nutrition: a household is deprived if **any one member** is undernourished; for a woman of 15 to 49 that means a **body mass index below 18.5**.",
      formula: {
        label: "Multidimensional Poverty Index",
        latex: "\\text{MPI} = H \\times A",
        symbols: [
          { symbol: "\\(H\\)", meaning: "headcount ratio: share of the population that is poor" },
          { symbol: "\\(A\\)", meaning: "intensity: average share of weighted indicators in which the poor are deprived" },
        ],
      },
      authoredExample: {
        prompt: "In a State, 25 per cent of people are multidimensionally poor, and on average the poor are deprived in 40 per cent of the weighted indicators. Find the MPI.",
        steps: [
          "H = 0.25 and A = 0.40.",
          "MPI = 0.25 × 0.40 = 0.10.",
        ],
        answer: "MPI = 0.10.",
      },
      selfCheckExample: {
        prompt: "A person is deprived in indicators that carry 30 per cent of the total weight. Is this person counted as multidimensionally poor?",
        steps: [
          "The cut-off is one third of the weighted indicators, about 33.3 per cent.",
          "30 per cent is below it.",
        ],
        answer: "No: the deprivations fall short of the one-third cut-off.",
      },
      pyqExampleId: "e2e3d3a5-03a3-4e23-b76a-7821702a3241",
      practiceSet: [
        { prompt: "Which body in India publishes the National Multidimensional Poverty Index?", answer: "NITI Aayog" },
        { prompt: "Which Oxford research centre builds the global MPI with UNDP?", answer: "The Oxford Poverty and Human Development Initiative (OPHI)" },
        { prompt: "If H is 0.20 and A is 0.45, what is the MPI?", answer: "0.09" },
        { prompt: "Which two indicators does India's national MPI add to the global ten?", answer: "Maternal health and bank account" },
      ],
      traps: [
        {
          title: "Years of schooling, not literacy",
          body: "The MPI's education indicators are **years of schooling** and **school attendance**. Literacy rate, life expectancy and income per head are **not** MPI indicators.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-antipoverty",
      name: "Anti-poverty schemes",
      intuition:
        "Two ideas recur. One is a guarantee of paid work for anyone in a village who asks for it. The other is to replace many small subsidies with one cash payment to every citizen.",
      definition:
        "The schemes:\n" +
        "- **MGNREGA** (Act of **2005**, in force from February 2006): at least **100 days** of **unskilled manual** wage work in a financial year for every **rural** household whose adults ask for it. **Equal wages** for women and men, at least **one third** of the beneficiaries women. Aims: livelihood security, **productive assets**, empowerment of women. It runs **only in rural areas**.\n" +
        "- In **December 2025** Parliament passed a law to replace MGNREGA with a new rural jobs guarantee (VB-G RAM G, 125 days). The CDS questions so far ask about MGNREGA as it stood.\n" +
        "- **Universal Basic Income (UBI)**: an unconditional cash payment to every citizen, discussed in the **Economic Survey 2016-17** as an alternative to subsidies.",
      table: {
        columns: ["Scheme", "Key fact"],
        rows: [
          {
            cells: ["MGNREGA, 2005", "100 days of unskilled manual work a year for a rural household"],
            noteAmber: "Asked twice: CDS 2020 (I) and 2022 (I). The work is unskilled, and only in rural areas.",
            pyqExampleId: "d6d17d84-0bd1-4888-89e3-9013e0639fde",
          },
          {
            cells: ["Universal Basic Income", "Cash to every citizen; Economic Survey 2016-17"],
            pyqExampleId: "517d4f3c-3ae7-4248-a4b5-e35dd1c12496",
          },
        ],
      },
      pyqExampleId: "6231d203-2692-4c7e-a227-158a780eff28",
      practiceSet: [
        { prompt: "In which year was the rural employment guarantee Act passed?", answer: "2005" },
        { prompt: "What share of MGNREGA beneficiaries must be women, at the least?", answer: "One third" },
        { prompt: "Which Economic Survey discussed a Universal Basic Income?", answer: "The Economic Survey 2016-17" },
      ],
      traps: [
        {
          title: "100 days, unskilled, rural",
          body: "MGNREGA guarantees **100** days (not 150 or 175) of **unskilled** manual work, only in **rural** areas, at **equal** wages for women and men.",
        },
        {
          title: "UBI is universal",
          body: "The U in UBI stands for **Universal**: everyone gets it, with no conditions. 'Unconditional' describes it but is not what the letter stands for.",
        },
      ],
    },
  ],
};
