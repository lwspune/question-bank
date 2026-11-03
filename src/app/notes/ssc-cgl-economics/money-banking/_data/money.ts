import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XMB_MONEY_NOTE: SubtopicNote = {
  subtopicName: "Money, the RBI and Monetary Policy",
  title: "Money, the RBI and Monetary Policy",
  oneLineDefinition:
    "The functions and measures of money, Fisher's equation and the demand for money, and how the RBI was set up and controls credit with the bank rate, CRR and SLR.",
  whyItMatters:
    "Twenty-one questions in the bank: nine from the 2023 shifts, eight from the 2024 shifts and four from the 2025 shifts. Most test one definition or one direction (a rate goes up, so credit goes down), so learn which way each tool pushes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscxmbmo-money",
      name: "Money: functions, measures and demand",
      intuition:
        "Money replaced barter because it does four jobs. The RBI counts it in layers, from cash in hand to all bank deposits. Fisher tied the amount of money to the price level.",
      definition:
        "Functions: **medium of exchange**, **measure of value**, **store of value**, **standard of deferred payments**. In **barter**, goods themselves are the medium of exchange.\n\n" +
        "Measures (the RBI's older set):\n" +
        "- **M1** = currency with the public + demand deposits + other deposits with the RBI.\n" +
        "- **M2** = M1 + **post office savings deposits**.\n" +
        "- **M3** = M1 + **net time deposits** of banks: **broad money**, or **aggregate monetary resources**.\n" +
        "- **M4** = M3 + all post office deposits (not National Savings Certificates).\n" +
        "- The **Y. V. Reddy** Working Group (**1998**) proposed the new aggregates NM0 to NM3, including **NM2**.\n" +
        "- Money supply is a **stock**: measured at a point in time.\n\n" +
        "Demand: the interest rate is the cost of holding cash, so demand for money moves **inversely** with the interest rate.",
      formula: {
        latex: "MV = PT",
        label: "Fisher's equation of exchange",
        symbols: [
          { symbol: "M", meaning: "Money supply" },
          { symbol: "V", meaning: "Velocity of circulation" },
          { symbol: "P", meaning: "Price level" },
          { symbol: "T", meaning: "Volume of transactions" },
        ],
      },
      authoredExample: {
        prompt: "Money supply doubles while velocity and the volume of transactions stay the same. What happens to the price level, by Fisher's equation?",
        steps: ["MV = PT, with V and T fixed.", "If M doubles, P must double to keep both sides equal."],
        answer: "The price level doubles.",
      },
      pyqExampleId: "4cf20029-5c05-4ebf-917e-d46d73d73567",
      selfCheckExample: {
        prompt: "What is added to M1 to get M2, and what is added to M1 to get M3?",
        steps: ["M2 adds savings deposits with post office savings banks.", "M3 adds the net time deposits of commercial banks."],
        answer: "M2: post office savings deposits. M3: banks' net time deposits.",
      },
      practiceSet: [
        { prompt: "Which measure is called aggregate monetary resources?", answer: "M3" },
        { prompt: "Is money supply a stock or a flow?", answer: "A stock" },
        { prompt: "If interest rates rise, what happens to the demand for money?", answer: "It falls" },
      ],
      traps: [
        {
          title: "M2 is post office, M3 is banks",
          body: "**M2** adds post office savings; **M3** adds banks' **net time deposits**. Options swap the two, and offer M4's definition for M3.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxmbmo-rbi",
      name: "The RBI and credit control",
      intuition:
        "The RBI is the bank of banks. It slows lending by making money dearer or by locking more of it up, and speeds lending by doing the opposite.",
      definition:
        "The RBI:\n" +
        "- Recommended by the **Hilton Young Commission** (1926); set up under the **RBI Act, 1934**.\n" +
        "- The **lender of the last resort** to banks in trouble.\n" +
        "- **Flexible inflation targeting** came with the **2016** amendment of the RBI Act: a CPI target of **4%**, band 2% to 6%, set by the Monetary Policy Committee.\n\n" +
        "Credit tools:\n" +
        "- **To discourage credit**: **raise** the bank rate, **raise** CRR or SLR, **sell** securities.\n" +
        "- **CRR**: a share of deposits kept with the RBI. **SLR**: a share of total **demand and time** deposits held in liquid assets. Both **reduce** what banks can lend.\n" +
        "- **Money multiplier** = (1 + c) / (c + r), where c is the public's cash-deposit ratio and r the reserve ratio. More cash with the public or higher reserves **lower** it.\n" +
        "- Banks and other **intermediaries** pass policy rates on to borrowers.\n\n" +
        "On a bank's books, assets above liabilities are its **net worth**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["RBI recommended by", "Hilton Young Commission"], pyqExampleId: "c8bd9222-50c0-4b25-9f1e-2215bfb5ccc9" },
          { cells: ["Inflation targeting", "2016 amendment; 4% CPI"], pyqExampleId: "85671f78-bab3-4d93-a7e8-8ba77b7577e6" },
          { cells: ["To discourage credit", "Raise the bank rate"], pyqExampleId: "223957f7-dfdf-4fb8-92df-81380f6dffba" },
          { cells: ["SLR applies to", "Total demand and time deposits"], pyqExampleId: "ac7627a1-f391-4752-8624-6a84380a4949" },
          { cells: ["Higher CRR", "Lower money multiplier"], pyqExampleId: "5ae50612-6647-4801-a214-bbb7ef3d271f" },
        ],
      },
      pyqExampleId: "c1258827-a5ed-466d-ba48-0ac3d7535888",
      selfCheckExample: {
        prompt: "The RBI wants banks to lend more. Should it raise or cut the CRR, and buy or sell securities?",
        steps: ["Cutting the CRR frees deposits for lending.", "Buying securities puts money into the banks."],
        answer: "Cut the CRR and buy securities.",
      },
      practiceSet: [
        { prompt: "Which commission recommended a central bank for India?", answer: "The Hilton Young Commission" },
        { prompt: "What is the RBI's inflation target?", answer: "4% CPI, within 2% to 6%" },
        { prompt: "What is a bank's net worth?", answer: "Assets minus liabilities" },
      ],
      traps: [
        {
          title: "CRR and SLR cut lending",
          body: "A statement that CRR and SLR **increase** banks' lending capacity is false. They lock up deposits and **reduce** lending.",
        },
      ],
    },
  ],
};
