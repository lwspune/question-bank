import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_EC_IN_BOP_NOTE: SubtopicNote = {
  subtopicName: "Balance of Payments and Foreign Capital",
  title: "Balance of Payments and Foreign Capital",
  oneLineDefinition:
    "The current and capital accounts and what goes in each, why India runs a current account deficit, direct against portfolio investment, the foreign exchange reserves, and the IMF and WTO dates CDS asks.",
  whyItMatters:
    "Eight CDS questions, three of them HARD. The commonest trap is putting an item in the wrong account: invisibles belong to the current account, FDI to the capital account.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsecin-bop-accounts",
      name: "The current account and the capital account",
      intuition:
        "The balance of payments records every rupee that crosses India's border. Money for goods and services, and income and gifts, goes in the current account. Money that buys or sells assets, or is borrowed and lent, goes in the capital account. If India spends more abroad on the current account than it earns, it must cover the gap with capital flowing in.",
      definition:
        "The two accounts:\n" +
        "- **Current account**: **merchandise trade** (goods) plus **invisibles**. Invisibles are **services** (IT, travel, transport), **income** (interest, dividends, wages) and **transfers** (above all **remittances** from Indians abroad).\n" +
        "- **Capital account** (also called the financial account): **foreign direct investment**, **portfolio investment**, **external commercial borrowing**, **external assistance**, NRI deposits, and changes in the **reserves**.\n" +
        "- India's **merchandise imports exceed its exports** in almost every year. Services exports and remittances **narrow** the gap but usually do not close it, so India usually runs a **current account deficit (CAD)**.\n" +
        "- A CAD is **financed** by net capital inflows such as FDI. Financing it does not make FDI part of the current account.",
      formula: {
        label: "Current account balance",
        latex: "\\text{Current account balance} = (\\text{Exports} - \\text{Imports})_{\\text{goods}} + \\text{Net invisibles}",
      },
      authoredExample: {
        prompt:
          "In a year India's goods exports are 450 and goods imports 700 (billion dollars). Net services earn 160, net transfers 100, and net income is −40. Find the current account balance.",
        steps: [
          "Trade balance = 450 − 700 = −250.",
          "Net invisibles = 160 + 100 − 40 = 220.",
          "Current account balance = −250 + 220 = −30.",
        ],
        answer: "A current account deficit of 30 billion dollars.",
      },
      selfCheckExample: {
        prompt: "A country's trade deficit in goods is 80 and its net invisibles are +95. Does it have a current account deficit or surplus?",
        steps: [
          "Current account balance = −80 + 95 = +15.",
        ],
        answer: "A surplus of 15.",
      },
      pyqExampleId: "f031f636-da3f-44de-a9d5-8f4dead51616",
      practiceSet: [
        { prompt: "In which account are remittances from Indians working abroad recorded?", answer: "The current account (as transfers)" },
        { prompt: "Is external commercial borrowing a current or a capital account item?", answer: "Capital account" },
        { prompt: "Goods exports are 300, goods imports 380 and net invisibles +50. What is the current account balance?", answer: "A deficit of 30" },
        { prompt: "Which two items most narrow India's trade deficit on the current account?", answer: "Services exports and remittances" },
      ],
      traps: [
        {
          title: "Invisibles are current account",
          body: "Services, income and transfers are **invisibles**, and they sit in the **current account**. FDI, borrowing and aid sit in the **capital account**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecin-foreign-capital",
      name: "FDI, portfolio money and the reserves",
      intuition:
        "A foreign company that builds a factory or a college in India is here to stay: that is direct investment. A fund that buys Indian shares on the stock exchange can sell them tomorrow: that is portfolio investment, and money that can leave that fast is called hot money. The RBI keeps reserves of foreign currency to steady the rupee when such money moves.",
      definition:
        "The terms:\n" +
        "- **Foreign direct investment (FDI)**: a **lasting interest** and a say in running the business: setting up a plant, a company or an **educational institution**, or buying 10 per cent or more of a listed company.\n" +
        "- **Foreign portfolio investment (FPI)**: buying shares and bonds through the **stock market** without control. It can leave quickly, so it is called **hot money**.\n" +
        "- **India's foreign exchange reserves**: mostly **foreign currency assets**, plus **gold**, **special drawing rights** (SDRs) and the **reserve tranche position** with the IMF.\n" +
        "- Holding reserves has a **cost**: they earn low returns in safe assets, and the RBI pays to **sterilise** their effect on money supply.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          {
            cells: ["Hot money", "Foreign portfolio investment"],
            pyqExampleId: "c876e8b3-8e0d-4f70-aa91-635ff8e78320",
          },
          { cells: ["FDI", "Lasting interest with control; new plants, firms or institutions"] },
          {
            cells: ["Largest part of India's reserves", "Foreign currency assets"],
            noteAmber: "CDS 2024 (I): holding reserves is not free of cost.",
            pyqExampleId: "f25f388d-b72a-4f64-ab3d-d9882b127d3a",
          },
          { cells: ["Other parts of the reserves", "Gold, SDRs, reserve tranche position with the IMF"] },
        ],
      },
      pyqExampleId: "3ae011b6-ef6b-43e8-b462-a87f692031a1",
      practiceSet: [
        { prompt: "Why is portfolio investment called hot money?", answer: "Because it can be pulled out of the country at short notice" },
        { prompt: "What are the four parts of India's foreign exchange reserves?", answer: "Foreign currency assets, gold, SDRs and the reserve tranche position with the IMF" },
        { prompt: "Name one cost of holding large foreign exchange reserves.", answer: "Low returns on safe assets, or the cost of sterilisation" },
      ],
      traps: [
        {
          title: "Buying listed shares is portfolio, not direct",
          body: "A foreign fund, bank or company buying shares **on a stock exchange** is **portfolio** investment, whoever the buyer is. Direct investment means building or controlling a business.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsecin-global-bodies",
      name: "The IMF, the WTO and the dates",
      intuition:
        "When a country runs short of foreign currency it turns to the IMF. Trade rules are set at the WTO, which grew out of the GATT. CDS asks which body gives which help, and when the big trade and payments events happened.",
      definition:
        "The bodies and dates:\n" +
        "- **IMF**: lends to countries with **balance of payments** problems. The **Extended Fund Facility** gives **medium-term** help for **structural** problems, with a reform programme.\n" +
        "- Not IMF: **IFAD** (agriculture loans), **IBRD** (the World Bank's lending arm), **UNDP** (development programmes).\n" +
        "- **GATT** 1947; its **Uruguay Round** ended in **1994**; the **WTO** began on **1 January 1995**.\n" +
        "- **SWIFT** (interbank messaging) was founded in **1973** and went live in **1977**.\n" +
        "- **Nasdaq**, the first fully electronic stock market, opened in **1971**.",
      table: {
        columns: ["Event", "Year"],
        rows: [
          { cells: ["GATT signed", "1947"] },
          { cells: ["Nasdaq opens", "1971"] },
          {
            cells: ["SWIFT founded", "1973 (live in 1977)"],
            noteAmber: "CDS 2018 (I): SWIFT dated to 1985 was the wrong pair.",
            pyqExampleId: "108f261e-26e8-44ac-b705-57f8e8e59cd3",
          },
          { cells: ["Uruguay Round concluded", "1994"] },
          { cells: ["WTO begins", "1995"] },
        ],
      },
      pyqExampleId: "bdb60fc3-8cac-4234-b615-38c2c819e567",
      practiceSet: [
        { prompt: "In which year did the WTO begin work?", answer: "1995" },
        { prompt: "Which round of GATT talks led to the WTO?", answer: "The Uruguay Round" },
        { prompt: "Which UN agency lends for agriculture and rural development?", answer: "IFAD, the International Fund for Agricultural Development" },
      ],
      traps: [
        {
          title: "SWIFT is older than it looks",
          body: "SWIFT was founded in **1973** and carried its first live message in **1977**, not in the 1980s.",
        },
      ],
    },
  ],
};
