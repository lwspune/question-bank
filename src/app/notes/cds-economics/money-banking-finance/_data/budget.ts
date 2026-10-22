import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MB_BUDGET_NOTE: SubtopicNote = {
  subtopicName: "Budget, Deficits and Fiscal Policy",
  title: "Budget, Deficits and Fiscal Policy",
  oneLineDefinition:
    "How the Union Budget is passed and where its money goes, the four deficits and how to work each one out, and what government borrowing does to interest rates and private investment.",
  whyItMatters:
    "Sixteen CDS questions, five of them HARD, from 2017 (II) to 2026 (II). The deficit definitions were asked in 2017 (II), 2021 (I) and 2023 (II), and interest payments as the biggest revenue expense in 2024 (II) and 2026 (I), so the definitions repeat more than any budget figure does.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmb-budget-basics",
      name: "The Union Budget: process and main items",
      intuition:
        "The Budget is the government's yearly statement of what it expects to earn and spend. Spending on the running of government (salaries, interest, subsidies) is revenue expenditure; spending that builds assets or repays loans is capital expenditure. Parliament must approve the spending, and if it cannot finish before 1 April, it gives the government an advance to carry on.",
      definition:
        "The terms:\n" +
        "- **Revenue expenditure**: does not create assets (salaries, pensions, **interest**, subsidies). **Capital expenditure**: creates assets or reduces liabilities (roads, loans given, repayment of debt).\n" +
        "- **Interest payments** are the **largest single item** of the Union's revenue expenditure (true in Budget 2025-26), ahead of defence, pensions and subsidies.\n" +
        "- **Effective capital expenditure** = capital expenditure + **grants for creation of capital assets** given to States. As a share of GDP it rose from 2020-21 to 2023-24, while revenue expenditure fell back from its pandemic peak.\n" +
        "- **Vote on account**: an **advance grant** from the Consolidated Fund for part of the new year, until the demands for grants are voted. A **vote of credit** is for an unforeseen need whose amount cannot be stated.\n" +
        "- **Appropriation Bill**: authorises withdrawals from the Consolidated Fund; **Finance Bill**: the tax proposals.\n" +
        "- **Food subsidy** is the largest major subsidy (2019-20 Budget Estimates, about ₹1.84 lakh crore).\n" +
        "- **Union Budget 2025-26** raised the **FDI cap in insurance from 74% to 100%**.",
      table: {
        columns: ["Item", "Key fact"],
        rows: [
          {
            cells: ["Largest item of revenue expenditure", "Interest payments"],
            noteAmber: "Asked twice: CDS 2024 (II) and CDS 2026 (I, about Budget 2025-26).",
            pyqExampleId: "0121bee7-2a69-4a8a-8357-c49365536507",
          },
          {
            cells: ["Largest major subsidy", "Food subsidy (2019-20 Budget Estimates)"],
            noteAmber: "CDS 2020 (II).",
            pyqExampleId: "975eb08b-966f-416b-9596-23ce693ffa30",
          },
          {
            cells: ["Effective capital expenditure", "Capital expenditure plus grants for creation of capital assets"],
            noteAmber: "CDS 2025 (II), a HARD question: it rose as a share of GDP from 2020-21 to 2023-24; revenue expenditure did not.",
            pyqExampleId: "d5072fb9-6a05-44bd-a7ce-0345848bf629",
          },
          {
            cells: ["FDI cap in insurance", "Raised from 74% to 100% in Budget 2025-26"],
            noteAmber: "CDS 2025 (II).",
            pyqExampleId: "cb4b09ee-36d4-470c-bf4c-0cc78a652c33",
          },
          { cells: ["Vote on account", "Advance grant until the demands for grants are passed"] },
        ],
      },
      pyqExampleId: "0ee327d1-a708-4b57-893a-01a1d0d7efa5",
      selfCheckExample: {
        prompt: "Sort these into revenue and capital expenditure: interest on past loans, building a highway, salaries of soldiers, a loan given to a State.",
        steps: [
          "Revenue expenditure creates no asset: interest and salaries.",
          "Capital expenditure creates an asset or a claim: the highway and the loan to a State.",
        ],
        answer: "Revenue: interest and salaries. Capital: the highway and the loan to the State.",
      },
      practiceSet: [
        { prompt: "Which single item takes the largest share of the Union government's revenue expenditure?", answer: "Interest payments" },
        { prompt: "What is added to capital expenditure to get effective capital expenditure?", answer: "Grants for creation of capital assets" },
        { prompt: "To what level did Budget 2025-26 raise the FDI cap in insurance?", answer: "100% (from 74%)" },
        { prompt: "Which Bill carries the government's tax proposals?", answer: "The Finance Bill" },
      ],
      traps: [
        {
          title: "Vote on account, not vote of credit",
          body: "An advance to keep the government running until the Budget is passed is a **vote on account**. A **vote of credit** is a blank grant for an unexpected need, such as a war.",
        },
        {
          title: "Interest beats defence and pensions",
          body: "In the Union Budget the largest revenue expense is **interest payments**, not defence, salaries or pensions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmb-deficits",
      name: "Fiscal, revenue and primary deficits",
      intuition:
        "Each deficit answers a different question. The fiscal deficit asks how much the government must borrow this year. The revenue deficit asks whether it borrows to pay day-to-day bills. The primary deficit asks how much it would borrow if there were no interest on old loans to pay.",
      definition:
        "The four deficits:\n" +
        "- **Fiscal deficit** = total expenditure − (revenue receipts + non-debt capital receipts). In words: total expenditure over total receipts **excluding borrowings**. It equals the government's **borrowing need**.\n" +
        "- **Revenue deficit** = revenue expenditure − revenue receipts.\n" +
        "- **Effective revenue deficit** = revenue deficit − grants for creation of capital assets.\n" +
        "- **Primary deficit** = fiscal deficit − **interest payments**.\n" +
        "- Targets (figures that change): the FRBM Act (2003) aimed at a fiscal deficit of **3% of GDP**. Budget 2025-26 put the Union's fiscal deficit at **4.4% of GDP**, down from 4.8% in 2024-25. In 2019-20 the budgeted 3.3% could not be held and was revised up.",
      formula: {
        label: "The deficits",
        latex: "FD = TE - (RR + NDCR) \\qquad PD = FD - \\text{Interest} \\qquad RD = RE - RR",
        symbols: [
          { symbol: "\\(TE\\)", meaning: "total expenditure" },
          { symbol: "\\(RR\\)", meaning: "revenue receipts" },
          { symbol: "\\(NDCR\\)", meaning: "non-debt capital receipts (recovery of loans, disinvestment)" },
          { symbol: "\\(RE\\)", meaning: "revenue expenditure" },
        ],
      },
      authoredExample: {
        prompt: "A government spends ₹500 crore in all, of which ₹380 crore is revenue expenditure and ₹60 crore is interest. Its revenue receipts are ₹300 crore and non-debt capital receipts ₹20 crore. Find the fiscal, revenue and primary deficits.",
        steps: [
          "Fiscal deficit = 500 − (300 + 20) = ₹180 crore.",
          "Revenue deficit = 380 − 300 = ₹80 crore.",
          "Primary deficit = 180 − 60 = ₹120 crore.",
        ],
        answer: "Fiscal deficit ₹180 crore, revenue deficit ₹80 crore, primary deficit ₹120 crore.",
      },
      selfCheckExample: {
        prompt: "A government's revenue expenditure is ₹900 crore and its revenue receipts ₹750 crore. Of its revenue spending, ₹40 crore is grants to States for building capital assets. Find the revenue deficit and the effective revenue deficit.",
        steps: [
          "Revenue deficit = 900 − 750 = ₹150 crore.",
          "Effective revenue deficit = 150 − 40 = ₹110 crore.",
        ],
        answer: "Revenue deficit ₹150 crore; effective revenue deficit ₹110 crore.",
      },
      pyqExampleId: "e63148cf-5170-44ec-8da2-d6b142279b73",
      practiceSet: [
        { prompt: "What is subtracted from the fiscal deficit to get the primary deficit?", answer: "Interest payments" },
        { prompt: "Revenue expenditure minus revenue receipts gives which deficit?", answer: "The revenue deficit" },
        { prompt: "What fiscal deficit target, as a share of GDP, did the FRBM Act set?", answer: "3% of GDP" },
        { prompt: "A primary deficit of zero means the government borrows only for what?", answer: "To pay interest on past borrowing" },
      ],
      traps: [
        {
          title: "Primary deficit removes interest, nothing else",
          body: "Primary deficit = fiscal deficit − **interest payments**. Defence, subsidies or pensions are never the item subtracted.",
        },
        {
          title: "Fiscal deficit excludes borrowings from receipts",
          body: "The fiscal deficit compares spending with receipts **other than borrowing**, so it measures how much must be borrowed. Including borrowings in receipts would make every budget balance.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-fiscal-effects",
      name: "Crowding out, crowding in and the policy mix",
      intuition:
        "When the government borrows heavily, it competes with businesses for the same savings, so interest rates rise and some private projects are dropped: crowding out. But public spending also raises demand, and if firms expect more sales they may invest more: crowding in. Which wins depends on the money supply and on what the government spends on.",
      definition:
        "The effects:\n" +
        "- **Crowding out**: deficit spending **raises interest rates** and **reduces private investment**.\n" +
        "- **Crowding in**: government spending **raises demand and expectations** and **induces more private investment**.\n" +
        "- A deficit from **subsidies** (no new supply) tends to **raise inflation**, may **raise interest rates** and may **slow private investment**.\n" +
        "- If extra government spending is **not matched by more money supply**, interest rates rise and the effect on income is **smaller**.\n" +
        "- **₹X of government purchases** raises income **more** than **₹X of transfers** to households, because households save part of a transfer.\n" +
        "- **Contractionary monetary policy + expansionary fiscal policy**: both raise interest rates, so the rise is **unambiguous**, capital flows in and the **currency appreciates**.",
      table: {
        columns: ["Situation", "Result"],
        rows: [
          {
            cells: ["Government spending induces private investment", "Crowding in"],
            noteAmber: "CDS 2021 (I).",
            pyqExampleId: "f20f21ac-8de3-4990-9e2f-bfca5ce486f2",
          },
          {
            cells: ["Tight money with expansionary fiscal policy", "Interest rate rises unambiguously; currency appreciates"],
            noteAmber: "CDS 2023 (I), a HARD question.",
            pyqExampleId: "9933f661-04ea-4b85-be91-e2a1e443f361",
          },
          {
            cells: ["Extra spending without more money supply", "Smaller rise in income (interest rates go up)"],
            noteAmber: "CDS 2024 (II), a HARD question: spending has a LARGER effect than an equal transfer, not smaller.",
            pyqExampleId: "b9e41475-d94c-466c-b63e-df9c13f7df10",
          },
          {
            cells: ["Deficit widened by subsidies, taxes unchanged", "Inflation rises, interest rates may rise, private investment may slow"],
            noteAmber: "CDS 2026 (II).",
            pyqExampleId: "bc4538f0-b7b2-4597-8a20-e41acaaf3367",
          },
        ],
      },
      pyqExampleId: "c27e47b8-4e49-4059-bff2-a24ac6def18f",
      practiceSet: [
        { prompt: "What is the increase in private investment induced by government spending called?", answer: "Crowding in" },
        { prompt: "Which raises national income more: ₹100 crore of government purchases or ₹100 crore of transfers to households?", answer: "₹100 crore of government purchases" },
        { prompt: "Which mix of policies raises the interest rate without doubt: tight money with loose fiscal policy, or loose money with tight fiscal policy?", answer: "Tight (contractionary) monetary policy with loose (expansionary) fiscal policy" },
        { prompt: "What usually happens to inflation when a government widens its deficit by spending more on subsidies?", answer: "It rises" },
      ],
      traps: [
        {
          title: "Out means less private investment, in means more",
          body: "**Crowding out**: government borrowing pushes up interest rates and **reduces** private investment. **Crowding in**: government spending **encourages** private investment. Pump priming means spending to restart a slack economy.",
        },
        {
          title: "Spending beats an equal transfer",
          body: "A rupee of government purchase is spent in full in the first round. A rupee of transfer is partly saved, so its multiplier is **smaller**. A statement that spending has less impact than an equal transfer is false.",
        },
      ],
    },
  ],
};
