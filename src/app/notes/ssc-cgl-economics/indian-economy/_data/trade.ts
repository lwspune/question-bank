import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XIE_TRADE_NOTE: SubtopicNote = {
  subtopicName: "International Trade and Finance",
  title: "International Trade and the 1991 Crisis",
  oneLineDefinition:
    "Terms of trade, devaluation and the foreign exchange laws, India's trade agreements and the WTO, and the 1991 balance of payments crisis that led to the reforms.",
  whyItMatters:
    "Twenty-seven questions in the bank: seven from the 2023 shifts, six from the 2024 shifts and 14 from the 2025 shifts, and six of them HARD, the most in this chapter. The hard ones ask a year or a member list for a trade scheme, so learn the agreement table with its years.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxietr-terms",
      name: "Trade terms and exchange rates",
      intuition:
        "A few words describe how a country trades and what its currency is worth. SSC gives the definition and asks the word, or the reverse.",
      definition:
        "The terms:\n" +
        "- **Terms of trade**: the ratio of **export prices to import prices**. An excess of imports over exports is a trade deficit, a different thing.\n" +
        "- **Devaluation**: an **official** cut in the external value of the currency. **Depreciation**: a fall in the **market** rate. **Deflation**: a contraction of money at home. **Exchange control**: rationing foreign exchange.\n" +
        "- **Marshall-Lerner condition**: devaluation improves the balance of payments only when the export and import demand elasticities **add up to more than one**.\n" +
        "- In an **open economy**, trade widens the choice of consumers and producers.\n\n" +
        "Laws and history:\n" +
        "- **FERA** (1973) regulated foreign exchange; **FEMA** replaced it in 1999.\n" +
        "- Under **PL 480** India imported wheat from the **USA**.\n" +
        "- Under British rule India ran an **export surplus**, but it was drained to Britain, not used to develop India.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Devaluation", "Official cut in the currency's external value"], pyqExampleId: "817d54ea-0812-4be6-afc2-30e8298445aa" },
          { cells: ["Marshall-Lerner", "Elasticities must sum to more than one"], pyqExampleId: "51a86c4c-7baf-42bb-9b6d-29b12d25c39b" },
          { cells: ["FERA", "1973 foreign exchange law"], pyqExampleId: "56c989af-1e5a-4f0e-8ded-03a8d4968c1c" },
          { cells: ["PL 480", "Wheat imports from the USA"], pyqExampleId: "9f198d82-d8d0-4592-95f3-737033765ada" },
        ],
      },
      pyqExampleId: "1e7e7db2-7387-4f08-8541-0345b9d85e28",
      selfCheckExample: {
        prompt: "The rupee falls against the dollar because traders sell it, with no government order. Is that devaluation or depreciation?",
        steps: ["Devaluation is an official decision to lower the currency's value.", "A fall set by the market is depreciation."],
        answer: "Depreciation.",
      },
      practiceSet: [
        { prompt: "Which Act replaced FERA in 1999?", answer: "FEMA" },
        { prompt: "What is exchange control?", answer: "Rationing of foreign exchange" },
        { prompt: "Did British India run an export surplus or a deficit?", answer: "An export surplus" },
      ],
      traps: [
        {
          title: "The surplus did not build India",
          body: "India's export surplus under British rule is true, but it went to pay Britain's charges. A reason saying it was **used for India's development** is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxietr-agreements",
      name: "Trade agreements, schemes and the WTO",
      intuition:
        "India belongs to several trade groupings and runs a few schemes for poorer countries and for its own exporters. The questions ask the year, the members or the purpose.",
      definition:
        "Agreements:\n" +
        "- **SAFTA**: the free trade area of the **SAARC** countries (signed 2004, in force 2006). Its **Article 23** admits **no reservations**, so Pakistan's 2012 negative list of 1,209 lines drew India's objection.\n" +
        "- **Global System of Trade Preferences**: **1988**. India and the **Gulf Cooperation Council**: framework agreement **2004**. **India-Korea CEPA**: **2010**. India's **7th Trade Policy Review** at the WTO: **2021**.\n\n" +
        "Schemes:\n" +
        "- **DFTP** (**2008**): duty-free access to India for **Least Developed Countries** that send a letter of intent (Angola never did).\n" +
        "- **TIES** (2017): money for **export infrastructure**.\n" +
        "- **IIPDF** (**2007**, Department of Economic Affairs): pays project development costs of PPP projects.\n\n" +
        "Bodies and ideas:\n" +
        "- The **WTO** (1995) sets **fair trade rules** and settles disputes. It does not allow arbitrary restrictions.\n" +
        "- The **Washington Consensus** (1989): fiscal discipline, tax reform, trade liberalisation; **export subsidies** are not in it.",
      table: {
        columns: ["Name", "Year or purpose"],
        rows: [
          { cells: ["DFTP for LDCs", "2008"], pyqExampleId: "4b441f48-25a8-430d-8a96-8f2b490c2373" },
          { cells: ["IIPDF", "2007, not 2017"], pyqExampleId: "76f31437-ddec-4baf-b0f2-1a56852c1853" },
          { cells: ["TIES", "Export infrastructure"], pyqExampleId: "70488667-6135-47f3-94f5-b23c9ee11054" },
          { cells: ["WTO", "Fair trade rules"], pyqExampleId: "c48ebd44-36d0-4f4d-bf53-3613d2e31768" },
          { cells: ["Washington Consensus", "No export subsidies"], pyqExampleId: "74fa5139-e3c9-40c7-938c-d9490fe9ec21" },
        ],
      },
      pyqExampleId: "673decde-323d-45dc-9b31-859802de4183",
      selfCheckExample: {
        prompt: "Put in order of year: India-Korea CEPA, Global System of Trade Preferences, India-GCC framework agreement.",
        steps: ["GSTP came in 1988 and the GCC framework in 2004.", "The India-Korea CEPA came into force in 2010."],
        answer: "GSTP (1988), India-GCC (2004), India-Korea CEPA (2010).",
      },
      practiceSet: [
        { prompt: "SAFTA is the free trade area of which grouping?", answer: "SAARC" },
        { prompt: "Which countries does India's DFTP scheme cover?", answer: "Least Developed Countries" },
        { prompt: "In which year was the WTO set up?", answer: "1995" },
      ],
      traps: [
        {
          title: "SAFTA admits no reservations",
          body: "A reason saying **Article 23** lets SAFTA members make unilateral reservations is false. It says no reservations are admitted.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscxietr-crisis",
      name: "The 1991 crisis and globalisation",
      intuition:
        "In 1991 India nearly ran out of dollars. The crisis forced short-term repairs and long-term reforms, and the reforms opened India to foreign firms.",
      definition:
        "The crisis:\n" +
        "- A **balance of payments crisis**: a shortage of **foreign exchange**. Reserves fell to about **two weeks of imports**, so India went to the **IMF and World Bank** and pledged gold.\n\n" +
        "The response:\n" +
        "- **Stabilisation** (short term): restore the balance of payments and **control inflation**.\n" +
        "- **Structural reforms** (long term): liberalisation, privatisation, **globalisation**.\n" +
        "- **Globalisation** joins India to the world economy: **FDI** and the entry of **MNCs** belong to it.\n\n" +
        "Results: freer trade and capital inflows raised **foreign exchange reserves**; India became a base for **outsourced services** because it offers **low-cost, skilled** workers.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Reserves in mid-1991", "About two weeks of imports"], pyqExampleId: "f09908f2-51e8-4100-b66e-7a277d4fee96" },
          { cells: ["Stabilisation aimed at", "Inflation and the balance of payments"], pyqExampleId: "5d8361fa-4b7e-4d5e-8cfb-21c1a37779c8" },
          { cells: ["FDI is part of", "Globalisation"], pyqExampleId: "15fdafdd-7985-4454-a5a3-ba809efcfeb2" },
        ],
      },
      pyqExampleId: "fcf6e5c7-a477-4eb0-8505-89cfe1d71c17",
      selfCheckExample: {
        prompt: "Which reform of 1991 let multinational companies set up in India?",
        steps: ["Of liberalisation, privatisation and globalisation, the one about joining the world economy is globalisation.", "Foreign firms entering India is part of it."],
        answer: "Globalisation.",
      },
      practiceSet: [
        { prompt: "What did India run short of in 1991?", answer: "Foreign exchange" },
        { prompt: "Is the stabilisation part of the reforms short term or long term?", answer: "Short term" },
        { prompt: "Which two bodies lent to India in 1991?", answer: "The IMF and the World Bank" },
      ],
      traps: [
        {
          title: "Low cost, high skill",
          body: "Firms outsource to India for **low-cost, skilled** services. A reason saying India offers high-cost, low-skill services is false.",
        },
      ],
    },
  ],
};
