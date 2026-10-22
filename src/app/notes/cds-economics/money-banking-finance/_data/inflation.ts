import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MB_INFLATION_NOTE: SubtopicNote = {
  subtopicName: "Inflation and Price Indices",
  title: "Inflation and Price Indices",
  oneLineDefinition:
    "The kinds of inflation and their names, how to work out an inflation rate from a price index, what WPI, CPI and core inflation measure, and how inflation is fought.",
  whyItMatters:
    "Fourteen CDS questions, three of them HARD, spread over ten different papers from 2016 (II) to 2025 (II). Two of them are sums on a price index, so the rule that inflation is measured on the previous year is worth a mark every time.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmb-inflation-types",
      name: "Kinds of inflation and their effects",
      intuition:
        "Inflation is a lasting rise in the general price level, so each rupee buys less. It starts in one of two ways: buyers want more than the economy can make (demand pulls prices up), or making things gets dearer (costs push prices up). Each mix of prices and growth has its own name.",
      definition:
        "The names:\n" +
        "- **Inflation**: a sustained rise in the general price level.\n" +
        "- **Demand-pull**: aggregate demand grows faster than supply.\n" +
        "- **Cost-push**: costs rise, for example crude oil, freight or broken supply chains. Wholesale inflation in 2021-22 was mostly this kind.\n" +
        "- **Deflation**: a sustained **fall** in the general price level.\n" +
        "- **Disinflation**: inflation is still positive but **slowing**. **Reflation**: deliberately raising prices and output after a slump.\n" +
        "- **Stagflation**: **slow growth together with rapid inflation** (stagnation plus inflation).\n" +
        "- **Shrinkflation**: the pack gets **smaller** while the printed price stays the same.\n" +
        "- **Effects**: the rupee tends to **depreciate**, **exports** become less competitive, imports cost more, borrowing becomes **dearer**, and lenders and **bondholders lose** in real terms.",
      table: {
        columns: ["Term", "What happens"],
        rows: [
          { cells: ["Demand-pull inflation", "Demand grows faster than supply"] },
          {
            cells: ["Cost-push inflation", "Rising costs such as crude oil, freight and supply disruptions"],
            noteAmber: "CDS 2023 (II): the causes of high wholesale inflation in 2021-22 were crude oil, supply chains and freight, not falling activity.",
            pyqExampleId: "b9a94d1b-6161-4e08-a0d9-b546feb6b13b",
          },
          {
            cells: ["Deflation", "Sustained fall in the general price level"],
            noteAmber: "CDS 2023 (I).",
            pyqExampleId: "324ad185-8a4d-4fa3-9672-3f3254e9f446",
          },
          { cells: ["Stagflation", "Slow growth with rapid inflation"] },
          {
            cells: ["Shrinkflation", "Smaller pack at the same price"],
            noteAmber: "CDS 2025 (II).",
            pyqExampleId: "249ee798-d435-4c74-91cf-ab2945c7bc6c",
          },
          { cells: ["Disinflation", "Inflation positive but slowing down"] },
        ],
      },
      pyqExampleId: "00e484f2-f412-49ee-9646-b7fdf35b97d3",
      practiceSet: [
        { prompt: "What is a sustained fall in the general price level called?", answer: "Deflation" },
        { prompt: "A biscuit pack shrinks from 100 g to 90 g but still costs ₹10. What is this called?", answer: "Shrinkflation" },
        { prompt: "What kind of inflation results when aggregate demand grows faster than supply?", answer: "Demand-pull inflation" },
        { prompt: "Do holders of fixed-interest bonds gain or lose from inflation?", answer: "They lose in real terms" },
      ],
      traps: [
        {
          title: "Deflation is not devaluation or recession",
          body: "**Deflation** is a fall in prices. **Devaluation** is a fall in the external value of a currency, and a **recession** is a fall in output. **Disinflation** means prices still rise, only more slowly.",
        },
        {
          title: "Inflation makes borrowing dearer, not cheaper",
          body: "With prices rising, the central bank tightens and lenders ask more, so the **cost of borrowing rises**. Lenders and bondholders lose because they are repaid in money worth less.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmb-price-index",
      name: "Price index and the inflation rate",
      intuition:
        "A price index tracks the cost of the same fixed basket of goods over time, with the base year set at 100. The inflation rate for a year compares the index with the year just before, not with the base year. So the same rise of 11 points means less inflation when the index is already high.",
      definition:
        "The rules:\n" +
        "- A **price index** measures the change in the average price of a **constant basket** of goods; the base year is **100**.\n" +
        "- The **inflation rate** for a year = the rise in the index over the **previous year**, as a percentage of the previous year's index.\n" +
        "- Dividing by the base-year index instead gives the total rise since the base year, not that year's inflation.",
      formula: {
        label: "Inflation rate",
        latex: "\\pi_t = \\dfrac{P_t - P_{t-1}}{P_{t-1}} \\times 100",
        symbols: [
          { symbol: "\\(\\pi_t\\)", meaning: "inflation rate in year t (per cent)" },
          { symbol: "\\(P_t\\)", meaning: "price index in year t" },
          { symbol: "\\(P_{t-1}\\)", meaning: "price index in the previous year" },
        ],
      },
      authoredExample: {
        prompt: "A price index is 150 in one year and 165 the next. What is the rate of inflation?",
        steps: [
          "Rise in the index = 165 − 150 = 15.",
          "Inflation = 15 ÷ 150 × 100 = 10%.",
        ],
        answer: "10%.",
      },
      selfCheckExample: {
        prompt: "A price index is 200, 230 and 253 in three years in a row. Find the inflation rate in the 2nd and 3rd years.",
        steps: [
          "2nd year: (230 − 200) ÷ 200 × 100 = 15%.",
          "3rd year: (253 − 230) ÷ 230 × 100 = 23 ÷ 230 × 100 = 10%.",
        ],
        answer: "15% in the 2nd year and 10% in the 3rd year.",
      },
      pyqExampleId: "cedf37ef-a393-4e18-a4a2-e6dfaca0e90c",
      practiceSet: [
        { prompt: "What value does a price index take in its base year?", answer: "100" },
        { prompt: "A price index rises from 120 to 126. What is the inflation rate?", answer: "5%", method: "6 ÷ 120 × 100" },
        { prompt: "A price index falls from 250 to 245. What is the inflation rate?", answer: "−2%, which is deflation", method: "−5 ÷ 250 × 100" },
      ],
      traps: [
        {
          title: "Divide by last year, not by the base year",
          body: "If an index goes from 100 to 125 to 150, inflation in the third year is 25 ÷ 125 = **20%**, not 50%. Using the base-year 100 gives the total rise since the base year.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-wpi-cpi",
      name: "WPI, CPI and core inflation",
      intuition:
        "India measures prices at two points. The Wholesale Price Index follows prices in bulk trade, so it is mostly about manufactured goods. The Consumer Price Index follows what households pay, including services like rent. Food and fuel prices jump about with the weather and world oil, so 'core' inflation leaves them out to show the steady trend.",
      definition:
        "The indices:\n" +
        "- **WPI** (base 2011-12) weights: **manufactured products about 64%**, **primary articles about 23%**, **fuel and power about 13%**. It covers goods only, no services.\n" +
        "- **CPI** measures retail prices paid by households and includes **services** such as housing (rent), health and education.\n" +
        "- The RBI's inflation target is set on **CPI (combined)**: **4%, with a band of 2% to 6%**, under the framework adopted in 2016.\n" +
        "- **Core inflation** = headline CPI inflation **minus food and fuel (energy)** items.\n" +
        "- **Housing** in CPI is a **core service**: it is a service, and core inflation removes only food and fuel.",
      table: {
        columns: ["Index or measure", "Key fact"],
        rows: [
          {
            cells: ["WPI weights (base 2011-12)", "Manufactured about 64%, primary about 23%, fuel and power about 13%"],
            noteAmber: "CDS 2024 (I), a HARD question: fuel and power weigh LESS than primary articles.",
            pyqExampleId: "d5760014-24be-41f9-a6b4-b227789705f5",
          },
          { cells: ["CPI (combined)", "The index the RBI targets: 4%, band 2% to 6%"] },
          { cells: ["Core inflation", "Headline CPI minus food and fuel"] },
          {
            cells: ["Housing in CPI", "A core service"],
            noteAmber: "CDS 2025 (I), a HARD question.",
            pyqExampleId: "e5ba1468-8e57-4713-9be5-c9ecd9a2fa7f",
          },
        ],
      },
      pyqExampleId: "51de1973-d594-46ad-ae82-b113fa1f2506",
      practiceSet: [
        { prompt: "Which group has the largest weight in the Wholesale Price Index?", answer: "Manufactured products (about 64%)" },
        { prompt: "On which price index is the RBI's inflation target set?", answer: "The Consumer Price Index (combined)" },
        { prompt: "What is the RBI's inflation target and its band?", answer: "4%, with a band of 2% to 6%" },
        { prompt: "Does the Wholesale Price Index cover services?", answer: "No, only goods" },
      ],
      traps: [
        {
          title: "Fuel and power is the smallest WPI group",
          body: "In the WPI, **manufactured products** (about 64%) outweigh **primary articles** (about 23%), which outweigh **fuel and power** (about 13%). A statement that fuel and power outweigh primary articles is false.",
        },
        {
          title: "Core removes food and fuel, nothing else",
          body: "Core inflation strips out only the volatile **food and fuel (energy)** items from **CPI** headline inflation. It is not built on WPI, and it does not remove all non-food items.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-anti-inflation",
      name: "Fighting inflation and indexation",
      intuition:
        "To cool prices, you take spending power out of the economy: make borrowing dearer, reward saving, lock up bank money, and cut government spending. Some people cannot wait for that to work, so their pay is tied to a price index and rises with it. That is indexation: it protects incomes but does not stop inflation.",
      definition:
        "The measures:\n" +
        "- **Monetary**: **raise** the repo rate, **raise** the CRR, **sell** government securities, offer **higher interest on savings and fixed deposits**. All of these pull money out of spending.\n" +
        "- **Fiscal**: **cut** government spending, raise taxes, reduce the deficit.\n" +
        "- Measures that **add** to inflation: more government spending, export subsidies, a **cut** in the CRR.\n" +
        "- **Indexation**: linking a money payment to a price index so its real value is kept. It is used to **fix wage compensation**, such as **dearness allowance**. It protects incomes; it does not control inflation.",
      table: {
        columns: ["Measure", "Effect on inflation"],
        rows: [
          { cells: ["Higher interest on savings and fixed deposits", "Reduces it (people save instead of spend)"] },
          { cells: ["Raising the repo rate or CRR", "Reduces it"] },
          { cells: ["Cutting the CRR", "Adds to it"] },
          { cells: ["More government spending", "Adds to it"] },
          {
            cells: ["Indexation", "Protects wages against it; used to fix wage compensation"],
            noteAmber: "CDS 2019 (II): indexation is associated with fixing wage compensation, not with controlling inflation.",
            pyqExampleId: "389a9fad-b7dd-44ec-8ec8-488ef01cb14b",
          },
        ],
      },
      pyqExampleId: "cd0dc0de-b622-40ad-854f-bf22b69d0763",
      practiceSet: [
        { prompt: "To curb inflation, would the RBI raise or cut the repo rate?", answer: "Raise it" },
        { prompt: "Which allowance of government employees is indexed to the price level?", answer: "Dearness allowance" },
        { prompt: "To fight inflation, should a government raise or cut its own spending?", answer: "Cut it" },
      ],
      traps: [
        {
          title: "Indexation protects, it does not cure",
          body: "Indexation raises wages as prices rise, so it **protects incomes**. It is linked with **fixing wage compensation**, not with controlling inflation.",
        },
      ],
    },
  ],
};
