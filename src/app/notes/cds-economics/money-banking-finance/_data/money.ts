import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MB_MONEY_NOTE: SubtopicNote = {
  subtopicName: "Money and Monetary Policy",
  title: "Money and Monetary Policy",
  oneLineDefinition:
    "What money does, how India measures it from M1 to M3, how banks multiply it, and the tools the RBI uses to control it.",
  whyItMatters:
    "Thirteen CDS questions, ten of them from 2021 (I) onwards. The definition of M1 was asked in 2023 (II) and again in 2024 (I), and the RBI's tools come up almost every year, so learn exactly what each measure and each rate includes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmb-functions",
      name: "Functions of money and the terms of credit",
      intuition:
        "Before money, a weaver who wanted rice had to find a farmer who wanted cloth: a double coincidence of wants. Money removes that problem because everyone accepts it. Once money exists, people can also lend it, and a loan comes with terms: the interest to pay and the security to pledge.",
      definition:
        "Money and credit:\n" +
        "- **Medium of exchange**: money is the go-between in buying and selling, which ends the need for a double coincidence of wants.\n" +
        "- **Unit of account**: prices of all goods are stated in money.\n" +
        "- **Store of value**: money can be kept and spent later.\n" +
        "- Regulating consumption is **not** a function of money; that is a job of government policy.\n" +
        "- **Collateral**: an asset the borrower pledges (land, gold, a deposit) as a guarantee of repayment. The lender can sell it if the loan is not repaid.\n" +
        "- **Nominal interest rate**: the percentage by which the money paid back exceeds the money borrowed.\n" +
        "- **Real interest rate** = nominal rate minus the rate of inflation.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Medium of exchange", "Accepted in payment for goods and services"] },
          { cells: ["Store of value", "Can be saved and spent later"] },
          {
            cells: ["Collateral", "Asset pledged to guarantee repayment of a loan"],
            noteAmber: "CDS 2021 (I).",
            pyqExampleId: "8c1676c4-37ab-4b14-9a29-55bf9ba027f8",
          },
          {
            cells: ["Nominal interest rate", "Percentage by which repayment exceeds the amount borrowed"],
            noteAmber: "CDS 2021 (I), asked in the same paper as collateral.",
            pyqExampleId: "ecba279e-13e2-4b00-abb2-7a7e9cdf0454",
          },
          { cells: ["Real interest rate", "Nominal interest rate minus inflation"] },
        ],
      },
      pyqExampleId: "8625f61d-f530-44d3-a9ad-f03857ce0cd9",
      selfCheckExample: {
        prompt: "A bank lends ₹10,000 at a nominal interest rate of 9% a year. Prices rise by 5% that year. What is the real interest rate?",
        steps: [
          "Real interest rate = nominal rate minus inflation.",
          "9% − 5% = 4%.",
        ],
        answer: "About 4% a year.",
      },
      practiceSet: [
        { prompt: "What problem of barter does money solve as a medium of exchange?", answer: "The need for a double coincidence of wants" },
        { prompt: "What is an asset that a borrower pledges to guarantee repayment of a loan called?", answer: "Collateral" },
        { prompt: "What is the percentage by which the money repaid exceeds the money borrowed called?", answer: "The nominal interest rate" },
        { prompt: "How do you get the real interest rate from the nominal interest rate?", answer: "Subtract the rate of inflation" },
      ],
      traps: [
        {
          title: "Nominal, not real, is the plain percentage",
          body: "The rate by which the money repaid exceeds the money borrowed is the **nominal** interest rate. The **real** rate subtracts inflation. The bank rate is a rate the RBI charges banks, not the rate on your loan.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-measures",
      name: "Measures of money: M1 to M4",
      intuition:
        "Not all money is equally easy to spend. Notes in your pocket and a savings account you can draw a cheque on are spendable at once. A fixed deposit takes a little longer to turn into cash. India's measures of money start with the most spendable kind (M1) and add less liquid kinds step by step.",
      definition:
        "The RBI's measures (NCERT Class 12):\n" +
        "- **M1** (narrow money) = **currency with the public** + **demand deposits** with banks + **other deposits with the RBI**.\n" +
        "- **M2** = M1 + savings deposits with post office savings banks.\n" +
        "- **M3** (broad money) = M1 + **time deposits** with banks. M3 is the **most commonly used** measure, also called **aggregate monetary resources**.\n" +
        "- **M4** = M3 + total deposits with post office savings organisations (excluding NSC).\n" +
        "- M1 and M2 are **narrow money**; M3 and M4 are **broad money**. Liquidity falls from M1 to M4.\n" +
        "- **Bankers' deposits with the RBI** and bank reserves are part of **reserve money** (M0), not of M1.",
      table: {
        columns: ["Measure", "Made up of"],
        rows: [
          {
            cells: ["M1 (narrow money)", "Currency with the public, demand deposits, other deposits with the RBI"],
            noteAmber: "Asked twice: CDS 2023 (II) and CDS 2024 (I). Time deposits and bank reserves are the wrong options both times.",
            pyqExampleId: "83268a91-15a8-4913-adcb-bf653e355103",
          },
          { cells: ["M2", "M1 plus post office savings bank deposits"] },
          {
            cells: ["M3 (broad money)", "M1 plus time deposits with banks; the most used measure"],
            noteAmber: "CDS 2022 (II): M3 is the most widely used measure.",
            pyqExampleId: "75231659-573a-4521-a59d-34d43d267d3a",
          },
          { cells: ["M4", "M3 plus all post office savings deposits"] },
          { cells: ["M0 (reserve money)", "Currency in circulation, bankers' deposits with the RBI, other deposits with the RBI"] },
        ],
      },
      pyqExampleId: "de91ba9c-f60b-4fc7-bbd2-7ec1fa6f238b",
      practiceSet: [
        { prompt: "Which measure of money is called aggregate monetary resources?", answer: "M3" },
        { prompt: "Are time (fixed) deposits part of M1 or of M3?", answer: "Of M3, not M1" },
        { prompt: "Which two measures of money are called broad money?", answer: "M3 and M4" },
        { prompt: "What is M1 plus post office savings bank deposits called?", answer: "M2" },
      ],
      traps: [
        {
          title: "Bankers' deposits with the RBI are not in M1",
          body: "M1 has 'other deposits' with the RBI, but **bankers' deposits** with the RBI belong to **reserve money**. Counting them in M1 would count the same money twice.",
        },
        {
          title: "Time deposits make the jump from M1 to M3",
          body: "M1 holds only **demand** deposits. Adding **time** deposits gives **M3**. An option putting time deposits in M1 is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsecmb-multiplier",
      name: "Credit creation and the money multiplier",
      intuition:
        "When you deposit ₹100, the bank keeps a part as reserve and lends out the rest. The borrower spends it, the money is deposited in another bank, which lends out most of it again. Each round creates new deposits, so total money ends up a multiple of the reserve money the RBI created. Cash that people keep at home drops out of this chain.",
      definition:
        "The rules (NCERT Class 12):\n" +
        "- **Reserve money** (high-powered money, M0) is what the RBI creates: currency plus banks' reserves with it.\n" +
        "- **Money supply = money multiplier × reserve money.**\n" +
        "- The multiplier depends on the **currency-deposit ratio** (cash people hold compared with their deposits) and the **reserve-deposit ratio** (reserves banks keep, set mainly by the CRR).\n" +
        "- If people hold **more cash** and less in deposits, the multiplier **falls**.\n" +
        "- If the RBI **raises the CRR**, the multiplier **falls**; cutting it raises the multiplier.\n" +
        "- With no cash held by the public, the multiplier is simply 1 divided by the reserve ratio.",
      formula: {
        label: "Money multiplier",
        latex: "m = \\dfrac{1 + cdr}{cdr + rdr} \\qquad M = m \\times H",
        symbols: [
          { symbol: "\\(cdr\\)", meaning: "currency-deposit ratio" },
          { symbol: "\\(rdr\\)", meaning: "reserve-deposit ratio" },
          { symbol: "\\(H\\)", meaning: "high-powered (reserve) money" },
          { symbol: "\\(M\\)", meaning: "money supply" },
        ],
      },
      authoredExample: {
        prompt: "People hold ₹20 in cash for every ₹100 in deposits, and banks keep ₹10 in reserve for every ₹100 of deposits. Reserve money is ₹1,000 crore. Find the money multiplier and the money supply.",
        steps: [
          "cdr = 20 ÷ 100 = 0.2 and rdr = 10 ÷ 100 = 0.1.",
          "m = (1 + 0.2) ÷ (0.2 + 0.1) = 1.2 ÷ 0.3 = 4.",
          "Money supply = 4 × ₹1,000 crore.",
        ],
        answer: "The multiplier is 4 and the money supply is ₹4,000 crore.",
      },
      selfCheckExample: {
        prompt: "People keep no cash at home and banks must hold 20% of deposits as reserve. A new deposit of ₹500 is made. How much total money can the banking system create from it?",
        steps: [
          "With no cash held, the multiplier = 1 ÷ 0.2 = 5.",
          "Total deposits = 5 × ₹500.",
        ],
        answer: "₹2,500.",
      },
      pyqExampleId: "72a70611-5b58-4884-b0b7-17dbef85c295",
      practiceSet: [
        { prompt: "What is another name for reserve money (M0)?", answer: "High-powered money" },
        { prompt: "If the RBI raises the cash reserve ratio, what happens to the money multiplier?", answer: "It falls" },
        { prompt: "With no cash held by the public and a reserve ratio of 10%, what is the money multiplier?", answer: "10" },
      ],
      traps: [
        {
          title: "More cash in hand means a smaller multiplier",
          body: "Cash kept at home cannot be lent again, so it breaks the chain of credit creation. A **higher currency-deposit ratio lowers** the money multiplier; it does not raise it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-rbi-tools",
      name: "The RBI's tools of monetary policy",
      intuition:
        "The RBI controls money in two ways. It sets the price of the money it lends to banks (the repo rate), and it sets how much of their deposits banks must lock away (the reserve ratios). It can also buy or sell securities and foreign currency: when it sells, buyers pay it rupees and money leaves the economy.",
      definition:
        "The tools:\n" +
        "- **Repo rate**: the rate at which the RBI lends **overnight** to banks against government securities (the securities are the collateral). It is the main **policy rate**.\n" +
        "- **Standing Deposit Facility (SDF)**: introduced **April 2022**; banks park surplus funds with the RBI **without collateral**. The SDF rate **replaced the fixed reverse repo rate as the floor** of the LAF corridor.\n" +
        "- **Marginal Standing Facility (MSF)**: emergency borrowing, the **ceiling** of the corridor; the **bank rate** is kept equal to it.\n" +
        "- **CRR** (cash reserve ratio): share of net demand and time liabilities (NDTL) a bank must keep as a **cash balance with the RBI**. **SLR** (statutory liquidity ratio): share of NDTL a bank keeps **with itself** in liquid assets such as gold, cash and government securities.\n" +
        "- **Open market operations**: the RBI **buys** securities (or foreign exchange) to **add** money and **sells** them to **remove** money.\n" +
        "- **Transmission** of a policy change is judged by bank rates: the **weighted average lending rate**, the **weighted average domestic term deposit rate** and the **one-year median MCLR**.\n" +
        "- Public debt and public revenue are tools of **fiscal** policy (the government), not monetary policy.\n" +
        "- Figures change: in late 2025 the CRR stood at 3% (cut from 4% in four steps announced in June 2025) and the SLR at 18%. Check the current values before an exam.",
      table: {
        columns: ["Tool", "What it is"],
        rows: [
          {
            cells: ["Repo rate", "RBI's overnight lending rate to banks, against securities"],
            noteAmber: "CDS 2020 (I): the repo rate is NOT the cost of the collateral.",
            pyqExampleId: "a707b15c-e99c-419a-b222-f1bcb94e1bb0",
          },
          {
            cells: ["Standing Deposit Facility", "Floor of the corridor since April 2022, replacing the fixed reverse repo"],
            noteAmber: "CDS 2024 (I): both facts were correct.",
            pyqExampleId: "2e4dcf62-22c1-4002-ab5a-b8873b147d65",
          },
          { cells: ["Cash Reserve Ratio", "Share of NDTL kept as a balance with the RBI"] },
          { cells: ["Statutory Liquidity Ratio", "Share of NDTL kept by the bank itself in liquid assets"] },
          {
            cells: ["Open market operations", "Selling securities or foreign exchange removes money; buying adds it"],
            noteAmber: "CDS 2023 (II): sale of Treasury Bills and of foreign exchange contract money supply.",
            pyqExampleId: "0e12e3ae-9b22-4081-a55b-967a8e1a0f01",
          },
          {
            cells: ["Transmission indicators", "Weighted average lending rate, weighted average term deposit rate, 1-year median MCLR"],
            noteAmber: "CDS 2024 (I), a HARD question: the SDF rate is a tool, not an indicator.",
            pyqExampleId: "e68ff903-e6db-4fab-a743-c73afe7db597",
          },
        ],
      },
      pyqExampleId: "59e4f43e-27d1-4b37-ad8a-d061fad68206",
      practiceSet: [
        { prompt: "Where does a bank keep the assets that count towards its SLR?", answer: "With itself, as liquid assets such as cash, gold and government securities" },
        { prompt: "To reduce money supply, does the RBI buy or sell government securities?", answer: "It sells them" },
        { prompt: "Which rate became the floor of the LAF corridor in April 2022?", answer: "The Standing Deposit Facility (SDF) rate" },
        { prompt: "Is public debt a tool of monetary policy or of fiscal policy?", answer: "Fiscal policy" },
        { prompt: "The bank rate is kept equal to which other rate?", answer: "The Marginal Standing Facility (MSF) rate" },
      ],
      traps: [
        {
          title: "CRR with the RBI, SLR with the bank",
          body: "The **CRR** is a cash balance kept **with the RBI**. The **SLR** is kept **by the bank itself** in liquid assets. An option saying CRR is held 'as liquid assets' or 'as cash reserves' describes the wrong ratio.",
        },
        {
          title: "Selling removes money, buying adds it",
          body: "When the RBI **sells** Treasury Bills or foreign exchange, buyers pay it rupees, so money **leaves** circulation. When it **buys**, it pays rupees out and money supply **expands**.",
        },
        {
          title: "Bank rate and public debt are different worlds",
          body: "The bank rate and open market operations are **monetary** tools run by the RBI. Public debt and public revenue belong to **fiscal** policy, run by the government.",
        },
      ],
    },
  ],
};
