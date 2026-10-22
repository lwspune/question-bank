import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_NI_THEORY_NOTE: SubtopicNote = {
  subtopicName: "Macroeconomic Theory",
  title: "Macroeconomic Theory",
  oneLineDefinition:
    "The classical and Keynesian views of employment, the later ideas CDS names with their authors, and the economic curves and what each one plots.",
  whyItMatters:
    "Fourteen CDS questions, half of them HARD. Most are a name matched to an idea: who said employment depends on effective demand, who proposed the natural rate of unemployment, which curve plots tax rates against revenue.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecni-classical-keynes",
      name: "Classical economics and Keynes",
      intuition:
        "The classical economists trusted markets to clear: if workers were idle, wages would fall until firms hired them again. The Great Depression of the 1930s broke that faith. Keynes argued that output and jobs are set by total spending in the economy, and that when private spending is too low the government should spend more, even by borrowing.",
      definition:
        "The two views:\n" +
        "- **Classical theory** (Adam Smith, J. B. Say, Ricardo): **Say's law**, supply creates its own demand. Wages, prices and interest rates are **flexible**, so the economy returns to **full employment** by itself. Any unemployment is **temporary**.\n" +
        "- **Keynes**, *The General Theory of Employment, Interest and Money* (**1936**): employment depends on **effective demand**, the point where aggregate demand meets aggregate supply. The economy can stay stuck below full employment.\n" +
        "- Keynes's cure for a slump: the state spends more than it collects, which is **deficit financing**.\n" +
        "- **Recessionary (deflationary) gap**: equilibrium real GDP **below** potential GDP. **Inflationary gap**: equilibrium real GDP **above** it.\n" +
        "- **Crowding out**: government borrowing raises interest rates and pushes private investment **down**. **Crowding in**: public investment (roads, power, logistics) raises the returns on private projects and pulls private investment **up**.",
      table: {
        columns: ["Idea", "Who or what", "Meaning"],
        rows: [
          {
            cells: ["Unemployment is temporary", "Classical school", "Flexible wages and prices restore full employment"],
            noteAmber: "CDS 2016 (II): classical theory treats departures from full employment as purely temporary.",
            pyqExampleId: "f4e230cd-ed47-4d2c-95f6-08c46f368197",
          },
          {
            cells: ["Employment depends on effective demand", "J. M. Keynes", "Aggregate demand meets aggregate supply"],
            pyqExampleId: "9e9b325c-d6a9-4aac-848e-9ea37a0568a4",
          },
          {
            cells: ["Deficit financing", "J. M. Keynes", "Spend beyond revenue to lift demand in a slump"],
            noteAmber: "CDS 2022 (I): Keynes first mooted deficit financing.",
            pyqExampleId: "ab84b9a1-2e9b-403a-8630-8bba33ec2e61",
          },
          {
            cells: ["Recessionary gap", "Output below potential", "Resources lie idle"],
            pyqExampleId: "60589d16-4505-4121-972d-896d289c3fb7",
          },
          {
            cells: ["Crowding in", "Public investment", "Raises private investment"],
            noteAmber: "CDS 2026 (II): crowding in is public investment leading to more private investment.",
            pyqExampleId: "44999e38-4978-45a5-9391-f1b16cf0de22",
          },
        ],
      },
      pyqExampleId: "9e9b325c-d6a9-4aac-848e-9ea37a0568a4",
      selfCheckExample: {
        prompt: "An economy's equilibrium real GDP is 950 while its potential GDP is 1,000. Name the gap and say whether workers are idle.",
        steps: [
          "Equilibrium output is below potential output.",
          "That shortfall is a recessionary gap, and output below potential means some workers are without jobs.",
        ],
        answer: "A recessionary gap of 50; yes, some resources, including workers, are idle.",
      },
      practiceSet: [
        { prompt: "Which law says that supply creates its own demand?", answer: "Say's law" },
        { prompt: "In which year was Keynes's General Theory published?", answer: "1936" },
        { prompt: "What is it called when government borrowing pushes private investment down?", answer: "Crowding out" },
        { prompt: "Equilibrium real GDP is above potential GDP. What is this gap called?", answer: "An inflationary gap" },
      ],
      traps: [
        {
          title: "Effective demand, not aggregate demand alone",
          body: "For Keynes, employment is fixed by **effective demand**: the point where the aggregate demand and aggregate supply schedules meet. Aggregate demand by itself is the distractor.",
        },
        {
          title: "Crowding in is the opposite of crowding out",
          body: "Crowding **out**: public borrowing displaces private investment. Crowding **in**: public investment **raises** private investment. Lower private borrowing or a smaller fiscal deficit is not crowding in.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-later-schools",
      name: "Later ideas and their authors",
      intuition:
        "After Keynes, economists asked sharper questions. How do people decide how much to consume over a lifetime? Can a government buy lower unemployment with a little more inflation for ever? CDS asks you to match each answer to the name behind it.",
      definition:
        "The names:\n" +
        "- **Milton Friedman** (with **Edmund Phelps**): the **natural rate of unemployment** (late 1960s). The Phillips curve trade-off between inflation and unemployment holds only in the **short run**. Friedman also gave the **permanent income hypothesis** and led **monetarism**.\n" +
        "- **A. W. Phillips** (1958): the original **Phillips curve**. **R. G. Lipsey** extended it.\n" +
        "- Consumption theories: **absolute income** (Keynes: consumption follows current income), **relative income** (Duesenberry), **life cycle** (Modigliani, Ando and Brumberg: consumption depends on **lifetime resources, the return on them and the person's age**), **permanent income** (Friedman).\n" +
        "- **Capital deepening**: more capital **per worker**. **Capital widening**: more capital only in step with more workers.\n" +
        "- **Geoffrey Kay**, *Development and Underdevelopment* (1975): capital created underdevelopment 'not because it exploited the underdeveloped world, but because it did not exploit it enough'.",
      table: {
        columns: ["Idea", "Author"],
        rows: [
          {
            cells: ["Natural rate of unemployment", "Milton Friedman (and Edmund Phelps)"],
            pyqExampleId: "a4e73a3c-80f8-4163-afa9-cd9bf33cb75b",
          },
          { cells: ["Phillips curve", "A. W. Phillips"] },
          { cells: ["Relative income hypothesis", "James Duesenberry"] },
          {
            cells: ["Life cycle hypothesis", "Franco Modigliani, Albert Ando, Richard Brumberg"],
            noteAmber: "CDS 2019 (I): consumption depending on resources, the return on capital and age is the life cycle hypothesis.",
            pyqExampleId: "72fdfeef-5fc1-4d78-9948-f9568a1b4e80",
          },
          { cells: ["Permanent income hypothesis", "Milton Friedman"] },
          {
            cells: ["Capitalism underdeveloped the periphery by not exploiting it enough", "Geoffrey Kay"],
            pyqExampleId: "60c999d3-2c91-4a1d-b3a1-a592cccad606",
          },
        ],
      },
      pyqExampleId: "a4e73a3c-80f8-4163-afa9-cd9bf33cb75b",
      practiceSet: [
        { prompt: "Who gave the permanent income hypothesis of consumption?", answer: "Milton Friedman" },
        { prompt: "Who proposed the relative income hypothesis?", answer: "James Duesenberry" },
        { prompt: "What is capital deepening?", answer: "Giving each worker more capital, that is a higher capital to labour ratio" },
        { prompt: "Which consumption theory says spending follows current income?", answer: "The absolute income hypothesis of Keynes" },
      ],
      traps: [
        {
          title: "Phillips drew the curve, Friedman limited it",
          body: "The **natural rate** idea came from **Friedman and Phelps**, as a criticism of the long-run Phillips curve. Phillips and Lipsey are the names of the original curve.",
        },
        {
          title: "Deepening is per worker",
          body: "Capital **deepening** raises capital **per worker**. Adding capital just to equip new workers, with the ratio unchanged, is capital **widening**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecni-curves",
      name: "The economic curves",
      intuition:
        "Each famous curve in economics plots one thing against another. If you remember the two axes, you can answer any match-the-list question: inflation against unemployment is Phillips, tax rate against revenue is Laffer.",
      definition:
        "The curves and indicators:\n" +
        "- **Lorenz curve**: cumulative share of income against cumulative share of people; it measures **inequality**. The **Gini coefficient** comes from it and runs from **0 (perfect equality) to 1 (perfect inequality)**.\n" +
        "- **Phillips curve**: **inflation** against **unemployment**.\n" +
        "- **Engel curve**: income against spending on a good; the **share spent on food falls** as income rises (Engel's law).\n" +
        "- **Laffer curve**: **tax rate** against **tax revenue**; past some rate, higher taxes bring in less.\n" +
        "- **45-degree line**: through the origin, where X = Y. Reading 'equal' off it assumes both variables are in the **same unit**.\n" +
        "- **Credit to GDP ratio**: the standard gauge of where an economy stands in the **financial cycle** (credit booms and busts).",
      table: {
        columns: ["Curve", "Plots"],
        rows: [
          {
            cells: ["Lorenz curve", "Inequality of income or wealth"],
            noteAmber: "CDS 2019 (II): the Gini coefficient measures income inequality.",
            pyqExampleId: "f0b1806e-54c3-4c14-a263-e2134134a6d5",
          },
          { cells: ["Phillips curve", "Inflation and unemployment"] },
          { cells: ["Engel curve", "Income and the share spent on food"] },
          { cells: ["Laffer curve", "Tax rate and tax revenue"] },
          {
            cells: ["45-degree line", "X equals Y, with both in the same unit"],
            pyqExampleId: "ab752027-44ed-4acb-87b5-c5b386d8f3a3",
          },
          {
            cells: ["Credit to GDP ratio", "Position in the financial cycle"],
            noteAmber: "CDS 2025 (II): credit to GDP, not the fiscal deficit, tracks the financial cycle.",
            pyqExampleId: "49a53f1f-4040-435f-bc8a-a5d335f09cb7",
          },
        ],
      },
      pyqExampleId: "8a9ddd0c-0bc7-4d39-ac6b-1b9e9fe34357",
      selfCheckExample: {
        prompt: "Country P has a Gini coefficient of 0.30 and country Q one of 0.55. In which country is income more evenly shared?",
        steps: [
          "A Gini of 0 means perfect equality and 1 means perfect inequality.",
          "0.30 is nearer to 0 than 0.55.",
        ],
        answer: "Country P.",
      },
      practiceSet: [
        { prompt: "What range does the Gini coefficient take?", answer: "From 0 (perfect equality) to 1 (perfect inequality)" },
        { prompt: "According to Engel's law, what happens to the share of income spent on food as income rises?", answer: "It falls" },
        { prompt: "Which curve is drawn under the Gini coefficient?", answer: "The Lorenz curve" },
        { prompt: "Which ratio is the usual gauge of the financial cycle?", answer: "The credit to GDP ratio" },
      ],
      traps: [
        {
          title: "The Gini measures inequality, not poverty",
          body: "A country can have a **low Gini** and many poor people if nearly everyone is poor. The Gini is about how evenly income is **shared**, not how much there is.",
        },
        {
          title: "Phillips is inflation, Laffer is tax",
          body: "**Phillips**: inflation and unemployment. **Laffer**: tax rate and tax revenue. **Engel**: income and food spending. Swapping these is the match-list trap.",
        },
      ],
    },
  ],
};
