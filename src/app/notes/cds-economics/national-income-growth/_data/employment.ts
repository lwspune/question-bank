import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_NI_EMPLOYMENT_NOTE: SubtopicNote = {
  subtopicName: "Employment and Unemployment",
  title: "Employment and Unemployment",
  oneLineDefinition:
    "The kinds of unemployment, the three labour rates of the Periodic Labour Force Survey and how they link, and what the demographic dividend means.",
  whyItMatters:
    "Eight CDS questions. Structural unemployment came up twice (2021 (I) and 2023 (I)) and so did the demographic dividend (2017 (II) and 2019 (II)). CDS 2026 (II) asked for an unemployment rate from two other rates, a sum you can do in your head.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecni-unemployment-types",
      name: "Kinds of unemployment",
      intuition:
        "People can be out of work for very different reasons. Some are between jobs, some have skills nobody wants any more, some lost work because the whole economy slowed, and some look employed but add nothing. Each reason has its own name.",
      definition:
        "The kinds:\n" +
        "- **Frictional**: short spells while people **move between jobs** or search.\n" +
        "- **Structural**: a lasting **mismatch** between the skills or places of workers and the jobs on offer. It follows **changes in technology** or a **permanent fall in demand** for a product.\n" +
        "- **Cyclical**: caused by a **slump** in the business cycle; it goes when demand recovers.\n" +
        "- **Disguised**: more people working than the work needs, so the extra workers add **nothing** to output (their marginal product is zero). Common on Indian family farms.\n" +
        "- **Seasonal**: no work in the off-season, as in farming between harvests.",
      table: {
        columns: ["Kind", "Cause", "Example"],
        rows: [
          { cells: ["Frictional", "Changing or searching for a job", "A graduate waiting for the first offer"] },
          {
            cells: ["Structural", "Skills or places do not match the vacancies; new technology", "Typists after computers spread"],
            noteAmber: "CDS 2021 (I): a mismatch between vacancies and available workers is structural unemployment.",
            pyqExampleId: "8f9be95d-e623-4529-bc27-0be63e35b13b",
          },
          { cells: ["Cyclical", "A fall in total demand", "Factory layoffs in a recession"] },
          { cells: ["Disguised", "Too many hands on one job", "Seven family members on a farm that needs four"] },
          { cells: ["Seasonal", "Work only in one season", "Farm labour after the harvest"] },
        ],
      },
      pyqExampleId: "14c02c78-4c4c-4dcc-8728-dc5ae999b789",
      practiceSet: [
        { prompt: "Which unemployment comes from a slump in the business cycle?", answer: "Cyclical unemployment" },
        { prompt: "What is the marginal product of a disguisedly unemployed worker?", answer: "Zero" },
        { prompt: "A worker leaves one job and spends two weeks finding the next. What kind of unemployment is this?", answer: "Frictional unemployment" },
      ],
      traps: [
        {
          title: "Disguised workers look employed",
          body: "Disguised unemployment is **invisible**: the people are at work, but removing them would not cut output. It is not the same as being openly without a job.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecni-labour-rates",
      name: "Labour force rates and the PLFS",
      intuition:
        "The labour force is everyone who is working or looking for work. Divide it by the population and you get the participation rate. Divide the people actually working by the population and you get the worker population ratio. The gap between the two is the unemployed, and the unemployment rate measures that gap against the labour force, not against the population.",
      definition:
        "The three rates of the **Periodic Labour Force Survey** (PLFS, NSO, from 2017-18):\n" +
        "- **Labour force participation rate (LFPR)**: labour force ÷ population × 100.\n" +
        "- **Worker population ratio (WPR)**: employed ÷ population × 100.\n" +
        "- **Unemployment rate (UR)**: unemployed ÷ **labour force** × 100.\n" +
        "- PLFS 2023-24: agriculture's share of all employment rose from about **44 per cent (2017-18) to about 46 per cent (2023-24)**, and the share of **women workers in agriculture** also rose, as more rural women took up self-employment.\n" +
        "- **Flexi workers**: formal contract staff on the payroll of an organised **staffing company**, deployed to client firms; they count as formal employment.",
      formula: {
        label: "Unemployment rate from LFPR and WPR",
        latex: "\\text{UR} = \\dfrac{\\text{LFPR} - \\text{WPR}}{\\text{LFPR}} \\times 100",
        symbols: [
          { symbol: "\\(\\text{LFPR}\\)", meaning: "labour force participation rate, per cent of population" },
          { symbol: "\\(\\text{WPR}\\)", meaning: "worker population ratio, per cent of population" },
        ],
      },
      authoredExample: {
        prompt: "In a district the labour force participation rate is 40 per cent and the worker population ratio is 38 per cent. Find the unemployment rate.",
        steps: [
          "The unemployed are 40 − 38 = 2 per cent of the population.",
          "The unemployment rate is measured against the labour force: 2 ÷ 40 × 100.",
        ],
        answer: "5 per cent.",
      },
      selfCheckExample: {
        prompt: "A town has 1,000 people. 550 are in the labour force and 440 of them have jobs. Find the LFPR, the WPR and the unemployment rate.",
        steps: [
          "LFPR = 550 ÷ 1,000 × 100 = 55 per cent.",
          "WPR = 440 ÷ 1,000 × 100 = 44 per cent.",
          "Unemployed = 550 − 440 = 110, so UR = 110 ÷ 550 × 100 = 20 per cent.",
        ],
        answer: "LFPR 55 per cent, WPR 44 per cent, unemployment rate 20 per cent.",
      },
      pyqExampleId: "03d54b83-02fe-453a-9a9c-3e12cfa4d91c",
      practiceSet: [
        { prompt: "A labour force of 500 has 440 people at work. What is the unemployment rate?", answer: "12 per cent" },
        { prompt: "Which survey of the NSO gives India's official LFPR and unemployment rate?", answer: "The Periodic Labour Force Survey" },
        { prompt: "In PLFS 2023-24, did agriculture's share of employment rise or fall since 2017-18?", answer: "It rose, from about 44 to about 46 per cent" },
        { prompt: "Who are flexi workers?", answer: "Formal contract staff employed through organised staffing companies" },
      ],
      traps: [
        {
          title: "Unemployment rate is out of the labour force",
          body: "With LFPR 60 and WPR 54, the unemployment rate is **6 ÷ 60 = 10 per cent**, not 6 per cent. The 6 is a share of the **population**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-demographic-dividend",
      name: "The demographic dividend",
      intuition:
        "When birth rates fall, a country goes through a period with many people of working age and fewer children and old people to support. More earners and savers per head can lift growth. That chance is the demographic dividend, and it pays only if those people find jobs.",
      definition:
        "The idea:\n" +
        "- **Demographic dividend**: faster growth that comes from a **larger share of working-age people** (about 15 to 64) in the population.\n" +
        "- It appears when **fertility falls**, so the **dependency ratio** (children and old people per working-age person) drops.\n" +
        "- It is a **window**, not a gift: without jobs and skills the extra workers become unemployed instead.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Demographic dividend", "Growth from a higher share of working-age people"],
            noteAmber: "Asked twice: CDS 2017 (II) and 2019 (II).",
            pyqExampleId: "cefed420-8007-4f76-95e4-8d62f10dafaa",
          },
          { cells: ["Working-age population", "People aged about 15 to 64"] },
          { cells: ["Dependency ratio", "Children and old people for each person of working age"] },
        ],
      },
      pyqExampleId: "3f20640a-67e3-40d3-a33d-d136c53622e2",
      practiceSet: [
        { prompt: "What happens to the dependency ratio when the working-age share rises?", answer: "It falls" },
        { prompt: "Which fall must come first for a demographic dividend to open up?", answer: "A fall in fertility (birth rates)" },
        { prompt: "Roughly which ages count as working age?", answer: "About 15 to 64" },
      ],
      traps: [
        {
          title: "It is about the age mix, not the total",
          body: "The dividend comes from more **working-age** people relative to dependants. A sharp fall in total population or a rise in the sex ratio is not what it means.",
        },
      ],
    },
  ],
};
