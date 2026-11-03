import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XMB_BUDGET_NOTE: SubtopicNote = {
  subtopicName: "Budget, Fiscal Policy and Taxation",
  title: "Budget, Fiscal Policy and Taxation",
  oneLineDefinition:
    "Revenue and capital receipts with their examples, the three deficits and how they are worked out, fiscal policy, and GST with the Finance Commissions and the history of Indian taxes.",
  whyItMatters:
    "Twenty-nine questions in the bank: 12 from the 2023 shifts, seven from the 2024 shifts and ten from the 2025 shifts. Half of them ask whether one item is a revenue or a capital receipt, and one test answers every one of those.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxmbbu-receipts",
      name: "Revenue and capital receipts",
      intuition:
        "Ask one question of any receipt: does it create a debt the government must repay, or does it shrink what the government owns? If yes, it is a capital receipt. If neither, it is revenue.",
      definition:
        "The budget:\n" +
        "- An annual statement of **estimated** receipts and **estimated** expenditure (the Annual Financial Statement, **Article 112**).\n" +
        "- India's financial year runs **1 April to 31 March**.\n" +
        "- The **revenue account** is also called the **revenue budget**; the capital account, the capital budget.\n\n" +
        "Receipts:\n" +
        "- **Revenue receipts** create no liability and reduce no asset: **tax revenue** (income tax, GST) and **non-tax revenue** (interest, **dividends** from PSUs, **fees and fines**).\n" +
        "- **Capital receipts** **create a liability** or **reduce an asset**: borrowings (including from the RBI), foreign loans, **recovery of loans** and **disinvestment** (selling stakes in public enterprises).\n\n" +
        "Expenditure: grants to States for building assets count as **revenue expenditure**, because the assets do not belong to the Centre.",
      table: {
        columns: ["Item", "Kind"],
        rows: [
          { cells: ["Taxes, GST", "Revenue receipt"], pyqExampleId: "0f9aae88-6010-43d7-9acc-cf1a9a8fc291" },
          { cells: ["Fees and fines", "Non-tax revenue"], pyqExampleId: "30a59ab7-f4e6-4fe5-9c3f-80559fdf2356" },
          { cells: ["Loan from the RBI", "Capital receipt"], pyqExampleId: "440465fc-28d3-4399-a1d5-742532b0d847" },
          { cells: ["Sale of government assets", "Capital receipt"], pyqExampleId: "bf4b1541-e5ce-49ba-9ba7-5a5015e24eaa" },
          { cells: ["Grants for asset creation", "Revenue expenditure"], pyqExampleId: "d8ef15a5-d68c-43fc-8a4e-59454c7e6eae" },
        ],
      },
      pyqExampleId: "98952b0e-3a3d-45ba-9040-0bcad3c3eb9d",
      selfCheckExample: {
        prompt: "Sort these: dividend from a PSU, recovery of a loan given to a State, corporation tax.",
        steps: ["A dividend and a tax create no liability and reduce no asset: revenue.", "A recovered loan reduces the government's assets (the loan it held): capital."],
        answer: "Revenue: PSU dividend, corporation tax. Capital: loan recovery.",
      },
      practiceSet: [
        { prompt: "What period is Financial Year 2022-23?", answer: "1 April 2022 to 31 March 2023" },
        { prompt: "Is disinvestment a revenue or a capital receipt?", answer: "Capital" },
        { prompt: "What is another name for the revenue account?", answer: "The revenue budget" },
      ],
      traps: [
        {
          title: "Disinvestment is not revenue",
          body: "Disinvestment brings in money, but it **reduces** the government's assets, so it is a **capital** receipt. A statement calling it revenue is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscxmbbu-deficits",
      name: "Deficits and fiscal policy",
      intuition:
        "Each deficit compares a different pair of totals. The fiscal deficit is the one that matters most: it is the amount the government must borrow in the year.",
      definition:
        "The deficits:\n" +
        "- **Revenue deficit** = revenue expenditure minus revenue receipts. It means borrowing to pay for **current** spending, not for assets.\n" +
        "- **Fiscal deficit** = total expenditure minus total receipts **other than borrowings**. It equals the year's borrowing: **net borrowing at home + borrowing from the RBI + borrowing from abroad**.\n" +
        "- **Primary deficit** = fiscal deficit minus **interest payments**.\n" +
        "- A **deficit budget** is one where expenditure exceeds revenue.\n\n" +
        "Fiscal policy:\n" +
        "- **Expansionary**: **cut** taxes and **raise** government spending. A cut in spending is contractionary.\n" +
        "- **Farm subsidies** lower costs and spread new technology to farmers.\n" +
        "- India's first sovereign wealth fund, the **NIIF**, was announced in the **2015-16** budget.",
      formula: {
        latex: "\\text{Primary deficit} = \\text{Fiscal deficit}-\\text{Interest payments}",
        label: "Primary deficit",
        symbols: [
          { symbol: "Fiscal deficit", meaning: "Total expenditure minus receipts other than borrowings" },
          { symbol: "Interest payments", meaning: "Interest on past borrowing" },
        ],
      },
      authoredExample: {
        prompt: "Total expenditure is Rs 900 crore. Revenue receipts are Rs 600 crore and non-debt capital receipts Rs 100 crore. Interest payments are Rs 120 crore. Find the fiscal and primary deficits.",
        steps: [
          "Receipts other than borrowings = 600 + 100 = 700.",
          "Fiscal deficit = 900 minus 700 = 200.",
          "Primary deficit = 200 minus 120 = 80.",
        ],
        answer: "Fiscal deficit Rs 200 crore; primary deficit Rs 80 crore.",
      },
      pyqExampleId: "6da566ea-d6e7-4ba4-aa02-63a48d664966",
      selfCheckExample: {
        prompt: "Why is a revenue deficit a worry even when total spending looks productive?",
        steps: ["A revenue deficit means revenue spending is larger than revenue income.", "The gap is met by borrowing, so the government borrows to consume, not to build assets."],
        answer: "It shows borrowing to fund current spending.",
      },
      practiceSet: [
        { prompt: "Which three sources make up the gross fiscal deficit?", answer: "Net borrowing at home, borrowing from the RBI, borrowing from abroad" },
        { prompt: "Name two moves of an expansionary fiscal policy.", answer: "Cutting taxes and raising government spending" },
        { prompt: "In which budget was the NIIF announced?", answer: "2015-16" },
      ],
      traps: [
        {
          title: "All three borrowings are added",
          body: "The gross fiscal deficit **adds** all three: home borrowing, RBI borrowing and foreign borrowing. A formula that subtracts any of them is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxmbbu-tax",
      name: "GST, Finance Commissions and the order of taxes",
      intuition:
        "GST replaced a tangle of indirect taxes in 2017. SSC asks the steps that led to it, who chairs its council, and who chaired the recent Finance Commissions.",
      definition:
        "GST:\n" +
        "- An **indirect** tax: its burden passes to the buyer.\n" +
        "- In order: the **101st Amendment** Act (**8 September 2016**), then the **GST Council** (September 2016, **Article 279A**), then **GST** itself (**1 July 2017**).\n" +
        "- The GST Council is chaired by the **Union Finance Minister**.\n\n" +
        "Finance Commissions: **15th, N. K. Singh**; 14th, Y. V. Reddy; 13th, Vijay Kelkar.\n\n" +
        "Order of Indian taxes: **land revenue** (oldest), **sales tax** (1930s and 1940s), **MODVAT** (**1986**), **service tax** (**1994**).",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["GST", "Indirect tax"], pyqExampleId: "3b5b6139-454c-4af9-92fc-9fc7868a6099" },
          { cells: ["GST steps", "Amendment, Council, launch"], pyqExampleId: "29163f8c-9682-4406-b324-1a0063242330" },
          { cells: ["15th Finance Commission", "N. K. Singh"], pyqExampleId: "a8cb1c89-1725-49c6-9b91-bbcba669768b" },
          { cells: ["Tax order", "Land revenue, sales tax, MODVAT, service tax"], pyqExampleId: "fc6bce29-0d0d-4929-a046-899fc2a6e4a5" },
        ],
      },
      pyqExampleId: "49e83470-bcc6-41b7-b978-39a4f91c9042",
      selfCheckExample: {
        prompt: "Which came first: MODVAT or service tax? Give both years.",
        steps: ["MODVAT on excise came in 1986.", "Service tax came in 1994."],
        answer: "MODVAT (1986), then service tax (1994).",
      },
      practiceSet: [
        { prompt: "Under which Article is the GST Council set up?", answer: "Article 279A" },
        { prompt: "On what date was GST launched?", answer: "1 July 2017" },
        { prompt: "Who chaired the 14th Finance Commission?", answer: "Y. V. Reddy" },
      ],
      traps: [
        {
          title: "The amendment came before the Council",
          body: "The **101st Amendment** created Article 279A, and only then could the **GST Council** be formed. An order with the Council first is wrong.",
        },
      ],
    },
  ],
};
