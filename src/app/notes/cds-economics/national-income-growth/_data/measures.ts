import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_NI_MEASURES_NOTE: SubtopicNote = {
  subtopicName: "National Income Measures",
  title: "National Income Measures",
  oneLineDefinition:
    "How GDP becomes GNP, NNP and national income, real against nominal GDP and the deflator, who measures it in India, and how the sectors share the output.",
  whyItMatters:
    "Thirteen CDS questions, seven of them HARD. Three came in CDS 2024 (I) alone. Most ask what a measure includes or leaves out, so the chain from GDP to national income pays off first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsecni-aggregates",
      name: "From GDP to national income",
      intuition:
        "GDP is the value of all final goods and services made inside the country in a year. Every other measure is GDP with something added or taken away: income earned abroad, the wear and tear of machines, and the taxes and subsidies that lift or lower market prices.",
      definition:
        "The chain:\n" +
        "- **GDP** (gross domestic product): final output produced **within the domestic territory**, whoever produces it. By spending, GDP = C + I + G + (X − M), so **imports are subtracted**.\n" +
        "- **GNP** = GDP + **net factor income from abroad** (NFIA). NFIA is income earned by Indians abroad minus income earned by foreigners in India. It is **not part of GDP**.\n" +
        "- **NNP** = GNP − **depreciation** (consumption of fixed capital).\n" +
        "- **Factor cost** = market price − **net indirect taxes** (indirect taxes − subsidies). **NNP at factor cost is the national income.**\n" +
        "- **Personal income** = national income − undistributed profits − corporation tax − social security contributions + transfer payments.\n" +
        "- **Personal disposable income** = personal income − **direct taxes** paid by households − fees and fines.\n" +
        "- **Not counted**: sale of second-hand goods (no new output), intermediate goods (counted inside the final good), transfer payments such as pensions. The **change in stocks** (inventories) is part of capital formation.",
      formula: {
        label: "National income from GDP",
        latex: "\\text{NNP}_{FC} = \\text{GDP}_{MP} + \\text{NFIA} - \\text{Depreciation} - (\\text{Indirect taxes} - \\text{Subsidies})",
        symbols: [
          { symbol: "\\(\\text{GDP}_{MP}\\)", meaning: "GDP at market prices" },
          { symbol: "\\(\\text{NFIA}\\)", meaning: "net factor income from abroad" },
          { symbol: "\\(\\text{NNP}_{FC}\\)", meaning: "NNP at factor cost, the national income" },
        ],
      },
      authoredExample: {
        prompt:
          "A country has GDP at market prices of 500, net factor income from abroad of −10, depreciation of 40, indirect taxes of 60 and subsidies of 10 (all in thousand crore rupees). Find its national income.",
        steps: [
          "GNP at market prices = 500 + (−10) = 490.",
          "NNP at market prices = 490 − 40 = 450.",
          "Net indirect taxes = 60 − 10 = 50.",
          "NNP at factor cost = 450 − 50 = 400.",
        ],
        answer: "National income is 400 thousand crore rupees.",
      },
      selfCheckExample: {
        prompt: "GDP at market prices is 1,000, depreciation is 100 and net factor income from abroad is 20. What is NNP at market prices?",
        steps: [
          "GNP at market prices = 1,000 + 20 = 1,020.",
          "NNP at market prices = 1,020 − 100 = 920.",
        ],
        answer: "920.",
      },
      pyqExampleId: "cf0f6fe8-8350-4e2b-ae31-90bfa7b10de2",
      practiceSet: [
        { prompt: "GDP at market prices is 800 and depreciation is 60. What is NDP at market prices?", answer: "740" },
        { prompt: "Indirect taxes are 70 and subsidies are 20. What are net indirect taxes?", answer: "50" },
        { prompt: "Which measure is called the national income of a country?", answer: "NNP at factor cost" },
        { prompt: "Personal disposable income is personal income minus which payments?", answer: "Direct taxes paid by households, and fees and fines" },
      ],
      traps: [
        {
          title: "Domestic is not national",
          body: "GDP counts output made **inside the country**. Income Indians earn abroad enters only when you move to **GNP**, by adding net factor income from abroad.",
        },
        {
          title: "Factor cost removes taxes and adds back subsidies",
          body: "Going from market price to factor cost, **subtract indirect taxes and add subsidies**. Subtracting subsidies too is the usual slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecni-real-nominal",
      name: "Real and nominal GDP, the deflator and GDP per head",
      intuition:
        "If prices double and nothing else changes, GDP in rupees doubles, but the country is no richer. Real GDP removes this by valuing every year's output at the prices of one fixed base year. The ratio of the two is the GDP deflator, a price index for everything the country produces.",
      definition:
        "The terms:\n" +
        "- **Nominal GDP**: each year's output at **that year's own (current) prices**.\n" +
        "- **Real GDP**: each year's output at **constant (base-year) prices**, so years can be compared.\n" +
        "- **GDP deflator** = nominal GDP ÷ real GDP × 100. Its basket is **all of current output**, so the basket **changes every year** (a CPI uses a fixed basket). It is also a measure of **inflation**.\n" +
        "- **Potential GDP**: the real GDP the economy would produce with **all its resources fully employed**.\n" +
        "- **Real GDP per capita** = real GDP ÷ population. It rises with **output per worker**, the **share of working-age people who work** (work participation) and the **share of the population of working age**.",
      formula: {
        label: "GDP deflator",
        latex: "\\text{GDP deflator} = \\dfrac{\\text{Nominal GDP}}{\\text{Real GDP}} \\times 100",
      },
      authoredExample: {
        prompt: "In a year a country's nominal GDP is 1,200 and its real GDP at base-year prices is 1,000. Find the GDP deflator and say what it shows.",
        steps: [
          "Deflator = 1,200 ÷ 1,000 × 100 = 120.",
          "A deflator of 100 means base-year prices, so 120 means prices are 20 per cent above the base year.",
        ],
        answer: "The deflator is 120: the general price level of output is 20 per cent higher than in the base year.",
      },
      selfCheckExample: {
        prompt: "Nominal GDP grows by 10 per cent in a year and the GDP deflator rises by 6 per cent. Roughly how fast did real GDP grow?",
        steps: [
          "Nominal growth is roughly real growth plus price growth.",
          "Real growth ≈ 10 − 6 = 4 per cent.",
        ],
        answer: "About 4 per cent.",
      },
      pyqExampleId: "136fc98b-11e1-48d4-9a84-18e11f06fa1b",
      practiceSet: [
        { prompt: "Nominal GDP is 600 and the GDP deflator is 150. What is real GDP?", answer: "400" },
        { prompt: "Real GDP is 5,000 crore rupees and the population is 50 crore. What is real GDP per head?", answer: "100 rupees" },
        { prompt: "Does the GDP deflator use a fixed basket of goods?", answer: "No. Its basket is the whole of current output, which changes every year" },
        { prompt: "What is the real GDP an economy would produce with all its resources fully employed called?", answer: "Potential GDP" },
      ],
      traps: [
        {
          title: "The deflator does measure inflation",
          body: "The GDP deflator is a **price index**, and deflator-based inflation is reported beside CPI and WPI. A statement that it gives real GDP 'but not the inflation rate' is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-data",
      name: "Who measures national income in India",
      intuition:
        "India's national accounts are built by a statistics office, not by the RBI or the Finance Ministry. It picks a base year whose prices value real output, and it runs the surveys that feed the accounts.",
      definition:
        "The facts:\n" +
        "- The **National Statistical Office (NSO)** under the **Ministry of Statistics and Programme Implementation (MoSPI)** compiles national income. The NSO was formed in **2019** by merging the **CSO** and the **NSSO**.\n" +
        "- In **January 2015** the base year moved from **2004-05 to 2011-12**, and headline growth moved to **GVA at basic prices** (GDP = GVA + product taxes − product subsidies). MoSPI has since announced a newer base year, **2022-23**, so check which series a question means.\n" +
        "- The NSO's surveys include the **Periodic Labour Force Survey**, the **Annual Survey of Unincorporated Sector Enterprises**, the **Survey on Social Consumption** (health, education) and the **Comprehensive Modular Survey** (telecom, ICT skills).\n" +
        "- The first estimate of India's national income was made by **Dadabhai Naoroji** (1867-68 figures, in *Poverty and Un-British Rule in India*); the first scientific estimate by **V. K. R. V. Rao** (1931-32).",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Compiled by", "National Statistical Office (MoSPI)"] },
          {
            cells: ["Base year since 2015", "2011-12 (was 2004-05)"],
            noteAmber: "CDS 2017 (II): the new series moved the base year to 2011-12.",
            pyqExampleId: "e515798e-64ea-4666-b069-e294976c475b",
          },
          { cells: ["Headline measure in the new series", "GVA at basic prices"] },
          {
            cells: ["NSO household and enterprise surveys", "PLFS, unincorporated enterprises, social consumption (health), modular survey on telecom and ICT skills"],
            noteAmber: "CDS 2025 (II): all four of these surveys are MoSPI's.",
            pyqExampleId: "443a6170-87fb-4697-a57b-49b7d690bda1",
          },
        ],
      },
      pyqExampleId: "e515798e-64ea-4666-b069-e294976c475b",
      practiceSet: [
        { prompt: "Which ministry's National Statistical Office compiles India's national income?", answer: "The Ministry of Statistics and Programme Implementation" },
        { prompt: "Which two bodies merged in 2019 to form the National Statistical Office?", answer: "The CSO and the NSSO" },
        { prompt: "Which measure became the headline for sector growth in the 2015 series?", answer: "Gross value added at basic prices" },
      ],
      traps: [
        {
          title: "The RBI does not compute GDP",
          body: "National income comes from the **NSO under MoSPI**. The RBI publishes money and banking data, not the national accounts.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-sectors",
      name: "How the sectors share India's output",
      intuition:
        "As a country grows, people move from farms to factories and offices, and output follows. In India the jump went mostly from agriculture straight to services: services now make up more than half of output, while manufacturing's share has stayed about the same.",
      definition:
        "The pattern (gross value added):\n" +
        "- **Services**: over **half** of GVA, up sharply since the 1990s. They also draw most of the foreign direct investment.\n" +
        "- **Industry**: about a quarter to a third; **manufacturing** alone about 15 to 17 per cent, broadly **flat** rather than falling.\n" +
        "- **Agriculture**: under a fifth of GVA and **falling**, yet still close to **half of all workers**. Its growth swings with the **monsoon**, so it is the **most volatile** sector.\n" +
        "- In **2020-21**, the COVID year, total GVA shrank; **agriculture** was the sector that kept growing.\n" +
        "- **Horticulture** output (fruits and vegetables) has been **larger than foodgrain output** by weight for over a decade (Economic Survey 2025-26).\n" +
        "- India's world rank by nominal GDP: **sixth in 2017** (World Bank, passing France); IMF figures for **2025** put it **fourth**, past the UK and Japan.",
      table: {
        columns: ["Claim", "True or false", "Holds for"],
        rows: [
          {
            cells: ["Services make up more than half of India's GVA", "True", "2010s to now"],
            pyqExampleId: "4b652ba3-69a7-4b3e-84f1-918f7e76a9e0",
          },
          {
            cells: ["The share of services has fallen", "False: it has risen sharply", "Since the 1990s"],
            noteAmber: "CDS 2016 (II): the share of services increased sharply.",
            pyqExampleId: "c4693a42-6cf9-4451-99d4-bcd5ae259fe4",
          },
          { cells: ["Services growth is more volatile than farm growth", "False: farm growth is the volatile one", "Monsoon years"] },
          {
            cells: ["Horticulture output is larger than foodgrain output", "True", "Economic Survey 2025-26"],
            noteAmber: "CDS 2026 (II) asked this from the Economic Survey 2025-26.",
            pyqExampleId: "3c10a5a8-b7f2-4a81-8d4d-c648e54e0a43",
          },
          {
            cells: ["India is the sixth largest economy, just ahead of France", "True then", "World Bank data for 2017; India has since moved up to fourth (IMF, 2025)"],
            pyqExampleId: "8e4fddba-fe84-4f97-8250-0bd82cd60f21",
          },
        ],
      },
      pyqExampleId: "4b652ba3-69a7-4b3e-84f1-918f7e76a9e0",
      selfCheckExample: {
        prompt: "Agriculture is under a fifth of India's output but employs close to half of its workers. What does that say about output per worker in agriculture?",
        steps: [
          "Output per worker = share of output ÷ share of workers.",
          "Under 20 per cent of output shared by about 45 per cent of workers is well under half the average.",
        ],
        answer: "Output per worker in agriculture is far below the average for the economy.",
      },
      practiceSet: [
        { prompt: "Which sector of India's economy is most volatile from year to year?", answer: "Agriculture, because it depends on the monsoon" },
        { prompt: "In 2020-21, which broad sector kept growing while total output shrank?", answer: "Agriculture" },
        { prompt: "Which is larger in India by weight: horticulture output or foodgrain output?", answer: "Horticulture output" },
        { prompt: "Which country did India pass in 2017 to become the sixth largest economy?", answer: "France" },
      ],
      traps: [
        {
          title: "Manufacturing did not shrink",
          body: "The share that **fell** is agriculture's. Manufacturing's share has stayed **roughly flat**; services rose.",
        },
        {
          title: "A GDP rank needs its year",
          body: "India was **sixth** in 2017, **fifth** by about 2021 and **fourth** in IMF figures for 2025. Answer a ranking question for the year the stem names.",
        },
      ],
    },
  ],
};
