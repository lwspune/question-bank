import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_MB_BANKS_NOTE: SubtopicNote = {
  subtopicName: "Banks and Financial Markets",
  title: "Banks and Financial Markets",
  oneLineDefinition:
    "What commercial banks, NBFCs, payments banks and microfinance lenders may and may not do, the instruments and agencies of the financial markets, new payment systems, and the NIIF.",
  whyItMatters:
    "Sixteen CDS questions, half of them HARD, and five came in the single paper of 2022 (II). Most are current-affairs facts about a named body or scheme, so this page is a list to learn rather than a method.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsecmb-bank-types",
      name: "Banks, NBFCs and other lenders",
      intuition:
        "A commercial bank does two kinds of work: its own business of taking deposits and lending, and errands it runs for customers and the government, such as collecting cheques and taxes. Other lenders do part of this job. An NBFC lends but cannot take ordinary savings deposits; a payments bank takes deposits but cannot lend.",
      definition:
        "The lenders:\n" +
        "- **Commercial bank, primary functions**: accepting **deposits**, giving **loans** and overdrafts, investing its funds.\n" +
        "- **Commercial bank, agency functions**: work done **on behalf of** customers or the government, such as **collecting tax payments**, cheques and bills, and paying insurance premiums.\n" +
        "- **NBFC** (non-banking financial company): **gives loans**, but **cannot accept demand deposits**, **cannot issue cheques drawn on itself**, and its deposits get **no DICGC deposit insurance**.\n" +
        "- **Payments bank**: accepts small deposits but **cannot lend**. The **India Post Payments Bank** is a **public limited company** fully owned by the government under the Department of Posts. Its two pilot branches opened in **Raipur and Ranchi** (January 2017).\n" +
        "- **Microfinance loan**: **collateral-free**, for low-income households, with limits on borrower income and loan size.\n" +
        "- **Bank run**: depositors **panic** and rush to withdraw cash at once. Since a bank keeps only a part of deposits as cash, a run can make it fail.",
      table: {
        columns: ["Lender", "Key rule"],
        rows: [
          {
            cells: ["NBFC", "Can lend; cannot take demand deposits or issue cheques; no deposit insurance"],
            noteAmber: "CDS 2022 (II): 'NBFCs cannot give loans' is the wrong statement.",
            pyqExampleId: "f19b2660-b5ba-407d-9b21-5bf76c980ec4",
          },
          {
            cells: ["India Post Payments Bank", "Public limited company; pilot branches in Raipur and Ranchi"],
            noteAmber: "CDS 2018 (I), a HARD question: the pilots were NOT in Hyderabad and Varanasi.",
            pyqExampleId: "66056539-19d0-474a-aae3-a18d0f0552dc",
          },
          { cells: ["Microfinance lender", "Loans without collateral to low-income households"] },
          {
            cells: ["Bank run", "Panic withdrawal of deposits by many depositors at once"],
            noteAmber: "CDS 2016 (II).",
            pyqExampleId: "93e3ae2f-85ac-4374-a1c9-a6e1d21ae41e",
          },
        ],
      },
      pyqExampleId: "97477391-3c7c-4670-a9b7-3a29a12b5dbd",
      selfCheckExample: {
        prompt: "Sort these into a bank's primary and agency functions: giving an overdraft, collecting a customer's cheque, accepting a fixed deposit, paying a customer's insurance premium.",
        steps: [
          "Primary functions are the bank's own business: taking deposits and lending.",
          "Agency functions are errands done on the customer's behalf.",
        ],
        answer: "Primary: the overdraft and the fixed deposit. Agency: collecting the cheque and paying the premium.",
      },
      practiceSet: [
        { prompt: "Can an NBFC issue cheques drawn on itself?", answer: "No" },
        { prompt: "In which two cities did the India Post Payments Bank open its pilot branches?", answer: "Raipur and Ranchi" },
        { prompt: "Must a borrower pledge collateral for a microfinance loan?", answer: "No. Microfinance loans are collateral-free." },
        { prompt: "What is a panic in which many depositors withdraw cash from a bank at once called?", answer: "A bank run" },
      ],
      traps: [
        {
          title: "NBFCs do lend",
          body: "Lending is an NBFC's main business. What it **cannot** do is take **demand deposits**, issue **cheques** on itself, or offer **DICGC deposit insurance**.",
        },
        {
          title: "Collecting taxes is an agency function",
          body: "Accepting deposits, giving overdrafts and investing surplus funds are a bank's **primary** functions. Collecting **income tax** or cheques **for someone else** is an **agency** function.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-markets",
      name: "Financial market instruments and agencies",
      intuition:
        "Savers and borrowers also meet outside banks: in markets for shares, bonds and funds. Each instrument has one fact that CDS asks: who rates the borrower, what a green bond pays for, how an exchange-traded fund differs from an ordinary mutual fund.",
      definition:
        "The instruments and bodies:\n" +
        "- **Credit rating agencies** registered with SEBI include **CRISIL, ICRA, CARE**, India Ratings and Brickwork.\n" +
        "- **Exchange-Traded Fund (ETF)**: a fund traded on a stock exchange like a share. Its price changes **throughout the day**, and it usually has **higher liquidity and lower fees** than ordinary mutual fund units.\n" +
        "- **Green bonds**: debt whose money goes to **environmentally sustainable, climate-friendly** projects such as renewable energy.\n" +
        "- **SEBI (Index Providers) Regulations, 2024**: cover only providers of **significant indices** of Indian listed securities used in the Indian market; aim: **transparency and accountability** in running indices.\n" +
        "- **Sub-prime crisis** (USA, 2007-08): risky home loans failed, banks collapsed, and a **global recession** followed.\n" +
        "- **Insurance density** = premium **per person**; **insurance penetration** = premium as a **share of GDP**. In India most policies are savings-linked, so density overstates real life cover.",
      table: {
        columns: ["Item", "Key fact"],
        rows: [
          {
            cells: ["Exchange-Traded Fund", "Traded all day on an exchange; higher liquidity, lower fees than mutual funds"],
            noteAmber: "CDS 2018 (I), a HARD question: the false statement says ETFs have lower liquidity and higher fees.",
            pyqExampleId: "8b3467c1-913c-4ca4-8fd6-1954278341ae",
          },
          {
            cells: ["Green bonds", "Fund environmentally sustainable, climate-friendly projects"],
            noteAmber: "CDS 2026 (I).",
            pyqExampleId: "d83ac9bb-9c18-448f-87d2-02ef3087dc2f",
          },
          {
            cells: ["SEBI (Index Providers) Regulations, 2024", "Cover significant indices only; aim at transparency and accountability"],
            noteAmber: "CDS 2026 (II), a HARD question: both statements were correct.",
            pyqExampleId: "1e56765d-b9c7-4728-8839-70fed4969dbb",
          },
          {
            cells: ["Sub-prime crisis", "US mortgage collapse of 2007-08 that led to a global recession"],
            noteAmber: "CDS 2019 (I).",
            pyqExampleId: "c1036c89-1202-441d-a188-9a28ba6fd547",
          },
        ],
      },
      pyqExampleId: "9b0a3b90-d721-461c-980e-031ac1a9116a",
      practiceSet: [
        { prompt: "What are bonds whose proceeds pay only for climate-friendly projects called?", answer: "Green bonds" },
        { prompt: "Compared with ordinary mutual fund units, do ETFs usually have higher or lower fees?", answer: "Lower fees" },
        { prompt: "With which economic event is the term 'sub-prime crisis' linked?", answer: "Economic recession (the global financial crisis of 2007-08)" },
        { prompt: "What is the difference between insurance density and insurance penetration?", answer: "Density is premium per person; penetration is premium as a share of GDP" },
      ],
      traps: [
        {
          title: "ETFs are the more liquid, cheaper option",
          body: "Because an ETF trades on an exchange all day, it is **more liquid** and usually **cheaper** than a mutual fund. A statement giving it lower liquidity and higher fees is the false one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-payments",
      name: "Payment systems: e-RUPI, SWIFT, Nexus, Vostro",
      intuition:
        "Money now moves as messages. Inside India, e-RUPI sends a pre-paid voucher to a phone. Between countries, banks send payment instructions over SWIFT, and new links like Project Nexus join national instant-payment systems. Trade in rupees runs through special accounts that Indian banks keep for foreign banks.",
      definition:
        "The systems:\n" +
        "- **e-RUPI** (launched August 2021, built by NPCI): a pre-paid digital **voucher** sent as an **SMS or QR code**. The receiver needs **no bank account** and **no smartphone or internet**. The cap per voucher was **₹10,000** at launch and was **raised to ₹1 lakh in 2022**.\n" +
        "- **SWIFT**: a worldwide network over which banks send **messages that instruct cross-border payments**. CDS calls it a global money transfer system.\n" +
        "- **Project Nexus**: a **Bank for International Settlements** initiative linking national instant payment systems (India's UPI among them) for **instant cross-border retail payments**.\n" +
        "- **Vostro account**: an account an Indian bank holds **for a foreign bank in rupees**. Special rupee vostro accounts (2022) let trade be settled in rupees. A **nostro** account is the reverse: an Indian bank's account abroad in foreign currency.",
      table: {
        columns: ["System", "What it does"],
        rows: [
          { cells: ["e-RUPI", "Pre-paid voucher by SMS or QR code; no bank account or smartphone needed"] },
          { cells: ["SWIFT", "Global messaging network for cross-border payments"] },
          {
            cells: ["Project Nexus", "BIS initiative for instant cross-border retail payments"],
            noteAmber: "CDS 2025 (I), a HARD question.",
            pyqExampleId: "13981a2f-ec93-48b9-81b4-dd83f23bacef",
          },
          {
            cells: ["Rupee Vostro account", "Account an Indian bank keeps for a foreign bank, in rupees"],
            noteAmber: "CDS 2024 (II), a HARD question.",
            pyqExampleId: "6239f7ec-54c8-4aa6-b2e1-18790281359d",
          },
        ],
      },
      pyqExampleId: "6fb88882-72da-47f9-9a82-517e2b83edd4",
      practiceSet: [
        { prompt: "Does a person need a smartphone with internet to receive e-RUPI?", answer: "No. It comes as an SMS or a QR code." },
        { prompt: "Which international body runs Project Nexus?", answer: "The Bank for International Settlements (BIS)" },
        { prompt: "What is an account that an Indian bank holds for a foreign bank, in rupees, called?", answer: "A (rupee) vostro account" },
        { prompt: "What was the e-RUPI cap per voucher at its launch in 2021?", answer: "₹10,000 (raised to ₹1 lakh in 2022)" },
      ],
      traps: [
        {
          title: "e-RUPI needs neither a bank account nor a smartphone",
          body: "The voucher reaches the phone as an **SMS string or QR code**, so a basic phone is enough and **no bank account** is needed. A statement that a smartphone with internet is required is false.",
        },
        {
          title: "Vostro is yours, held for them",
          body: "A **vostro** account is held **in India, in rupees, for a foreign bank**. A **nostro** account is an Indian bank's account **abroad**, in foreign currency.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecmb-niif",
      name: "National Investment and Infrastructure Fund",
      intuition:
        "Two government funds have almost the same name. The older one, the National Investment Fund, holds money the government raises by selling shares in public sector companies. The newer one, the National Investment and Infrastructure Fund, raises money from India and abroad to invest in infrastructure, and works through several separate funds.",
      definition:
        "The two funds:\n" +
        "- **National Investment Fund (NIF)**, 2005: holds the **disinvestment** proceeds of public sector undertakings.\n" +
        "- **National Investment and Infrastructure Fund (NIIF)**: announced in the **Union Budget 2015-16** to finance **infrastructure**. It is a different body from the NIF.\n" +
        "- NIIF can run **more than one alternative investment fund**. Its funds: the **Master Fund** (core infrastructure), the **Fund of Funds** (backs other fund managers), the **Strategic Opportunities Fund** (also called the Private Markets Fund) and the India-Japan Fund.\n" +
        "- There is **no 'Global Investment Fund'** under NIIF.",
      table: {
        columns: ["Fund", "Purpose"],
        rows: [
          { cells: ["National Investment Fund (2005)", "Holds disinvestment proceeds"] },
          {
            cells: ["NIIF (Budget 2015-16)", "Invests in infrastructure through several funds"],
            noteAmber: "CDS 2016 (II), a HARD question: NIIF and NIF are NOT the same organisation.",
            pyqExampleId: "17bd449f-1f6d-41b7-a10c-fcf0970d7d42",
          },
          { cells: ["NIIF Master Fund", "Invests in core infrastructure"] },
          { cells: ["NIIF Fund of Funds", "Invests in funds run by other managers"] },
          { cells: ["NIIF Strategic Opportunities Fund", "Invests in businesses beyond core infrastructure"] },
        ],
      },
      pyqExampleId: "ffd311b4-53d7-4f87-9cc6-5b6a67cfa563",
      practiceSet: [
        { prompt: "In which Union Budget was the National Investment and Infrastructure Fund announced?", answer: "Union Budget 2015-16" },
        { prompt: "What money does the National Investment Fund hold?", answer: "The proceeds of disinvestment of public sector undertakings" },
        { prompt: "Are NIIF and NIF the same organisation?", answer: "No" },
      ],
      traps: [
        {
          title: "NIIF is not NIF",
          body: "The **NIF** (2005) holds disinvestment money. The **NIIF** (Budget 2015-16) finances infrastructure. A statement that they are the same body is false.",
        },
      ],
    },
  ],
};
