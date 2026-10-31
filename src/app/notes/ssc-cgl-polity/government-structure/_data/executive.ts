import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PGS_EXECUTIVE_NOTE: SubtopicNote = {
  subtopicName: "Union Executive and Constitutional Bodies",
  title: "Union Executive and Constitutional Bodies",
  oneLineDefinition:
    "The President and Vice-President article by article, the law officers of the Union, and the constitutional bodies: the CAG, the Finance Commission, the Election Commission and the Public Service Commissions.",
  whyItMatters:
    "Twenty-nine questions in the bank: ten from the 2023 shifts, 13 from the 2024 shifts and six from the 2025 shifts, 19 of them EASY. Most give an Article number and ask what it does, or the other way round, so the Article tables on this page are the fastest marks in Polity.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpgsex-president",
      name: "President and Vice-President",
      intuition:
        "Part V opens with the President, and the Articles run in a natural order: who he is, how he is elected, how long he serves, how he can be removed, and what powers he holds. Learn them in that order and the numbers follow.",
      definition:
        "The President:\n" +
        "- **Art 54**: elected by an electoral college of the elected members of both Houses of Parliament and of the State Assemblies.\n" +
        "- **Art 56**: five-year term. **Art 57**: eligible for **re-election**. **Art 58**: a citizen of at least **35 years** who is qualified for the Lok Sabha. A candidate deposits **Rs 15,000**.\n" +
        "- **Art 59**: not a member of either House, holds no other office of profit, uses his official residence **without paying rent**, and his allowances cannot be cut during his term.\n" +
        "- **Art 61** (impeachment): may start in **either House**; the charges must be signed by **one-fourth** of its members, with **14 days'** notice; each House must pass it by **two-thirds of its total membership**.\n" +
        "- **Art 72**: power to **pardon**. **Art 75**: appoints the **Prime Minister**. **Art 77**: all executive action is taken in his name. **Art 123**: **ordinances** when Parliament is not sitting.\n\n" +
        "The Vice-President: **Art 63** creates the office; **Art 69**: he takes his oath **before the President**.",
      table: {
        columns: ["Article", "Subject"],
        rows: [
          { cells: ["54", "Election of the President"], pyqExampleId: "9fe23a10-a172-42ce-b05c-dd19d29f3f41" },
          { cells: ["57", "President eligible for re-election"], pyqExampleId: "d1169e3f-6ce7-4e46-94d4-47997b1feee7" },
          { cells: ["61", "Impeachment of the President"], pyqExampleId: "282d423e-4186-4601-bd15-00a6b8fb0ea9" },
          { cells: ["63", "There shall be a Vice-President"], pyqExampleId: "5f0e0848-5706-4fb9-afbb-517f18c5f6e0" },
          { cells: ["72", "President's power to pardon"], pyqExampleId: "67cf43d9-0dbc-4094-a098-77e66a456b25" },
          { cells: ["75", "Prime Minister appointed by the President"], pyqExampleId: "32b03294-ece7-4d3c-9275-6039cf8a7947" },
          { cells: ["77", "Conduct of business of the Government of India"], pyqExampleId: "7064ba80-713c-4022-8799-678ece97dcc0" },
          { cells: ["123", "President's power to make ordinances"], pyqExampleId: "9d11df05-3cef-4bb2-a244-89eef26a05f2" },
        ],
      },
      pyqExampleId: "00bd858d-b84e-4859-9e54-9824d3e7a52b",
      selfCheckExample: {
        prompt: "In an impeachment of the President, what share of a House must sign the charges, and what majority must pass them?",
        steps: [
          "One-fourth of the members of the House that starts it must sign the charges, after 14 days' notice.",
          "Each House must then pass the resolution by two-thirds of its total membership.",
        ],
        answer: "One-fourth to sign; two-thirds of the total membership to pass.",
      },
      practiceSet: [
        { prompt: "Which Article says the President is eligible for re-election?", answer: "Article 57" },
        { prompt: "Before whom does the Vice-President take his oath?", answer: "The President" },
        { prompt: "Which Article gives the President the power to make ordinances?", answer: "Article 123" },
        { prompt: "How much does a candidate for President deposit?", answer: "Rs 15,000" },
        { prompt: "Must the President pay rent for his official residence?", answer: "No: Article 59 gives it to him rent-free" },
      ],
      traps: [
        {
          title: "One-fourth to sign, not one-third",
          body: "Impeachment charges need the signatures of **one-fourth** of the House, and the notice is **14 days**, not 30.",
        },
        {
          title: "The Chief Justice swears in the President, not the Vice-President",
          body: "The **President** takes his oath before the **Chief Justice of India** (Art 60). The **Vice-President** takes his before the **President** (Art 69).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsex-law",
      name: "Law officers of the Union",
      intuition:
        "The government has its own lawyers. One is created by the Constitution, the other is not, and SSC asks exactly that difference.",
      definition:
        "The officers:\n" +
        "- **Attorney General of India** (**Art 76**): the **first (highest) law officer** of the country, appointed by the President.\n" +
        "- **Solicitor General**: helps the Attorney General. The Constitution does **not** create this post; the Appointments Committee of the Cabinet fills it. **Tushar Mehta** has held it since 2018 and was re-appointed in 2023.\n" +
        "- A **State's** highest law officer is its **Advocate General** (Art 165); see the page on the States.",
      table: {
        columns: ["Office", "Source", "Fact"],
        rows: [
          { cells: ["Attorney General", "Article 76", "Highest law officer of India"], pyqExampleId: "b5c82966-9fe3-4c0f-a1db-02db2ace61e2" },
          { cells: ["Solicitor General", "Not in the Constitution", "Tushar Mehta, re-appointed in 2023"], pyqExampleId: "8f1ca783-5035-423b-afda-1353adb73422" },
          { cells: ["Advocate General", "Article 165", "Highest law officer of a State"] },
        ],
      },
      pyqExampleId: "67225464-ef2e-4e91-b04d-22e89a3023fc",
      selfCheckExample: {
        prompt: "Which of the two Union law officers is a constitutional office, and who appoints the other?",
        steps: ["The Attorney General is created by Article 76 and appointed by the President.", "The Solicitor General is not in the Constitution; the Appointments Committee of the Cabinet appoints him."],
        answer: "The Attorney General; the Solicitor General is appointed by the Appointments Committee of the Cabinet.",
      },
      practiceSet: [
        { prompt: "Under which Article is the Attorney General appointed?", answer: "Article 76" },
        { prompt: "Who is the first law officer of India?", answer: "The Attorney General" },
        { prompt: "Who was re-appointed Solicitor General in 2023?", answer: "Tushar Mehta" },
      ],
      traps: [
        {
          title: "Attorney General for India, Advocate General for a State",
          body: "The **Attorney General** is the highest law officer of **India**. The **Advocate General** is the highest law officer of a **State**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsex-bodies",
      name: "CAG, Finance Commission, Election Commission and PSCs",
      intuition:
        "Four bodies the Constitution sets up to keep the government honest: one audits it, one shares out money, one runs elections and two pick its officers. SSC asks each body's Article, its tenure and to whom it reports.",
      definition:
        "The bodies:\n" +
        "- **Comptroller and Auditor General** (**Art 148**): heads the **Indian Audit and Accounts Department**; holds office for **six years or until 65**. **K. Sanjay Murthy** became CAG in November 2024, succeeding Girish Chandra Murmu.\n" +
        "- **Finance Commission** (**Art 280**): set up by the President every five years; reports **to the President**. Its recommendations are **advisory**, not binding.\n" +
        "- **Election Commission** (Art 324): set up on **25 January 1950** (now National Voters' Day). The Chief Election Commissioner serves **six years or until 65**. The first CEC was **Sukumar Sen**.\n" +
        "- **Public Service Commissions**: **Art 320** gives their functions (conducting examinations for Union and State services); **Art 323** requires **annual reports** to the President or Governor. The President makes the rules on UPSC members' service (Art 318). A **State** PSC chairman is appointed by the **Governor** but removed only by the **President** (Art 317). The UPSC grew out of the Federal PSC of the 1935 Act.",
      table: {
        columns: ["Body", "Article", "Remember for"],
        rows: [
          { cells: ["CAG", "148", "Heads the Indian Audit and Accounts Department"], pyqExampleId: "196b3778-de1f-48a2-bb78-cb0d451d79be" },
          { cells: ["Finance Commission", "280", "Reports to the President; advisory"], pyqExampleId: "5d0501aa-50fb-4e90-b0f6-3ff8020bfe0f" },
          { cells: ["Election Commission", "324", "Set up 25 January 1950"], pyqExampleId: "a77fb4c4-d528-4cd4-b32f-30e1a7a4fdc6" },
          { cells: ["PSC functions", "320", "Conduct examinations"], pyqExampleId: "1bee5e40-005b-4c77-8eb4-500360b4b80c" },
          { cells: ["PSC reports", "323", "Annual reports"], pyqExampleId: "2ce3d528-4bf1-441f-a692-46f02e1aafcf" },
        ],
      },
      pyqExampleId: "b94a5d75-18dd-430b-82b2-282224b28c35",
      selfCheckExample: {
        prompt: "Who appoints the chairman of a State Public Service Commission, and who can remove him?",
        steps: ["The Governor appoints him.", "Only the President can remove him (Article 317)."],
        answer: "Appointed by the Governor; removed by the President.",
      },
      practiceSet: [
        { prompt: "What is the CAG's term of office?", answer: "Six years or until the age of 65, whichever comes first" },
        { prompt: "Who was the first Chief Election Commissioner of India?", answer: "Sukumar Sen" },
        { prompt: "In which year was the Election Commission of India set up?", answer: "1950" },
        { prompt: "Which department does the CAG head?", answer: "The Indian Audit and Accounts Department" },
        { prompt: "To whom does the Finance Commission make its recommendations?", answer: "The President" },
      ],
      traps: [
        {
          title: "The CAG's term is six years",
          body: "Both the **CAG** and the **Chief Election Commissioner** serve **six years or until 65**. A statement giving five years is false.",
        },
        {
          title: "The President, not Parliament, regulates the UPSC's members",
          body: "Under **Art 318** the **President** makes the rules on the number and service of UPSC members. A statement giving that power to Parliament is false.",
        },
      ],
    },
  ],
};
