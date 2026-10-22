import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_CONSTITUTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Constitutional Bodies",
  title: "Constitutional Bodies",
  oneLineDefinition:
    "The Election Commission, the CAG and the Finance Commission, the commissions for Scheduled Castes, Scheduled Tribes and Backward Classes, and the Articles that protect civil servants.",
  whyItMatters:
    "Eleven CDS questions from 2016 to 2026, 7 MODERATE and 4 HARD. Four are about the commissions for Scheduled Castes, Scheduled Tribes and Backward Classes, so learn their Article numbers (338, 338A, 338B) as a set. Two are about the Election Commission, and both turn on who appoints or removes its officers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-election-commission",
      name: "The Election Commission",
      intuition:
        "Free elections need an umpire the government cannot push around. So the Constitution makes the Chief Election Commissioner as hard to remove as a Supreme Court judge, and protects the other Election Commissioners too: the government cannot remove them unless the Chief Election Commissioner asks for it.",
      definition:
        "Article 324:\n" +
        "- The Election Commission **superintends, directs and controls** the preparation of **electoral rolls** and the conduct of elections to **Parliament**, the **State Legislatures**, and the offices of **President** and **Vice-President**.\n" +
        "- It has the **Chief Election Commissioner** and other **Election Commissioners** (three members in all since 1993), **appointed by the President**. Since the **2023 Act**, the President appoints them on the recommendation of a committee of the Prime Minister, the Leader of the Opposition in the Lok Sabha and a Union Minister.\n" +
        "- The **Chief Election Commissioner** is removed only **like a Supreme Court judge**. Another **Election Commissioner** or a **Regional Commissioner** can be removed **only on the Chief Election Commissioner's recommendation**.\n" +
        "- **Regional Commissioners** are appointed by the **President**, after **consulting** the Commission.\n" +
        "- The President or a Governor must provide the **staff** the Commission needs, when it asks.\n" +
        "- Elections to **panchayats and municipalities** are run by each State's **State Election Commission**, not by this Commission.\n" +
        "- The Commission was set up on **25 January 1950**, now kept as National Voters' Day.",
      table: {
        columns: ["Task", "Done by"],
        rows: [
          { cells: ["Conducting Lok Sabha and State Assembly elections", "The Election Commission"] },
          { cells: ["Conducting the President's and Vice-President's elections", "The Election Commission"] },
          {
            cells: ["Appointing Regional Commissioners", "The President, after consulting the Commission"],
            noteAmber: "CDS 2018 (II): appointing Regional Commissioners is not among the Commission's own powers.",
            pyqExampleId: "ae5a816d-0184-4f31-adfd-63fc0b7da593",
          },
          { cells: ["Conducting panchayat and municipal elections", "The State Election Commission"] },
        ],
      },
      pyqExampleId: "d9b7ff03-15ae-4dba-b319-d00ecccb8308",
      selfCheckExample: {
        prompt: "A municipal corporation in Maharashtra is due for elections. Which body conducts them?",
        steps: [
          "Article 324's Election Commission conducts elections to Parliament, State Legislatures, the President and the Vice-President.",
          "Elections to panchayats and municipalities are given to each State's own State Election Commission.",
        ],
        answer: "The State Election Commission of Maharashtra.",
      },
      practiceSet: [
        { prompt: "Which Article sets up the Election Commission of India?", answer: "Article 324" },
        { prompt: "On what date was the Election Commission set up?", answer: "25 January 1950" },
        { prompt: "How is the Chief Election Commissioner removed?", answer: "In the same way as a Supreme Court judge" },
        { prompt: "Who appoints the Regional Commissioners who assist the Election Commission?", answer: "The President, after consulting the Commission" },
      ],
      traps: [
        {
          title: "Commissioners are protected by the Chief",
          body: "An Election Commissioner **cannot** be removed except on the **Chief Election Commissioner's recommendation**. A statement that one can be removed without it is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-cag-finance",
      name: "The CAG, the Finance Commission and the order of commissions",
      intuition:
        "The CAG checks how the government spends public money and reports to the head of state, who sends the reports to the legislature. The Finance Commission decides how the taxes the Centre collects are shared with the States. Both are in the Constitution, which is why they appear in exam lists next to bodies that are not.",
      definition:
        "The bodies:\n" +
        "- **Comptroller and Auditor General (Article 148)**: appointed by the President; serves **six years or until 65**; removed like a Supreme Court judge.\n" +
        "- **Article 151**: the CAG's reports on the **Union's accounts** go to the **President**, who has them laid before **each House of Parliament**; reports on a **State's** accounts go to its **Governor**.\n" +
        "- **Finance Commission (Article 280)**: appointed by the President **every five years** to recommend how central taxes are shared between the Centre and the States.\n" +
        "- The **Planning Commission** (1950 to 2014) was set up by a **Cabinet resolution**, not by the Constitution, and was replaced by NITI Aayog in 2015.",
      table: {
        columns: ["Body", "Set up", "Key fact"],
        rows: [
          { cells: ["Election Commission", "25 January 1950", "Article 324"] },
          { cells: ["Planning Commission", "March 1950", "A Cabinet resolution, not the Constitution"] },
          {
            cells: ["First Finance Commission", "November 1951", "Article 280; chaired by K. C. Neogy"],
            noteAmber: "CDS 2020 (I): from the earliest, the order is Election, Planning, Finance and then Investment Commission.",
            pyqExampleId: "9adbc1d3-7ac0-4ae1-97e1-c5e72f530fc5",
          },
          { cells: ["Investment Commission", "2004", "An advisory body chaired by Ratan Tata"] },
          {
            cells: ["Fourteenth Finance Commission", "2013", "Chaired by Y. V. Reddy; raised the States' share to 42 per cent for 2015 to 2020"],
            noteAmber: "CDS 2016 (II): the chairman of the Fourteenth Finance Commission was Y. V. Reddy.",
            pyqExampleId: "cc22adba-c43f-42b2-b55f-8b9e0197cf69",
          },
          { cells: ["Fifteenth Finance Commission", "2017", "Chaired by N. K. Singh; States' share 41 per cent"] },
          { cells: ["Sixteenth Finance Commission", "2023", "Chaired by Arvind Panagariya, for 2026 to 2031"] },
        ],
      },
      pyqExampleId: "d961e261-7feb-4a79-90c8-631a3fc248f0",
      selfCheckExample: {
        prompt: "Put these in the order they were first set up: the Investment Commission, the Election Commission, the Finance Commission and the Planning Commission.",
        steps: [
          "The Election Commission came first, on 25 January 1950.",
          "The Planning Commission followed in March 1950.",
          "The first Finance Commission was set up in November 1951.",
          "The Investment Commission came much later, in 2004.",
        ],
        answer: "Election, Planning, Finance, Investment.",
      },
      practiceSet: [
        { prompt: "Which Article creates the office of the Comptroller and Auditor General?", answer: "Article 148" },
        { prompt: "Which Article provides for the Finance Commission?", answer: "Article 280" },
        { prompt: "Who chaired the first Finance Commission?", answer: "K. C. Neogy" },
        { prompt: "To whom does the CAG submit reports on a State's accounts?", answer: "The Governor of that State" },
      ],
      traps: [
        {
          title: "CAG reports go to the President",
          body: "The CAG's reports on the Union's accounts go to the **President**, not to the Speaker, the Prime Minister or the Vice-President. The President has them laid before Parliament.",
        },
        {
          title: "The Planning Commission was never constitutional",
          body: "The Planning Commission came from a **Cabinet resolution** of 1950, as NITI Aayog did in 2015. The Finance Commission and the Election Commission are **constitutional** bodies.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-commissions",
      name: "Commissions for SCs, STs and Backward Classes",
      intuition:
        "To guard the special protections given to disadvantaged groups, the Constitution sets up commissions that watch over them. They started as one commission, were split in two, and a third for Backward Classes was added later, each with the next Article number: 338, 338A, 338B.",
      definition:
        "The commissions:\n" +
        "- **Article 338**: National Commission for **Scheduled Castes**. **Article 338A**: National Commission for **Scheduled Tribes**. Both became separate bodies under the **89th Amendment (2003)**, which split the old joint commission.\n" +
        "- **Article 338B**: National Commission for **Backward Classes**, made **constitutional** by the **102nd Amendment (2018)**. It earlier worked under the NCBC Act of 1993, which was **repealed in 2018**. It is headed by a **Chairperson**.\n" +
        "- Each reports to the **President**, who has the reports laid before **each House of Parliament** with a memorandum on action taken. Each has the **powers of a civil court** when investigating, and the Union and every State must **consult** it on major policy matters.\n" +
        "- **Article 340**: the President may appoint a commission to study backward classes. The **First Backward Classes Commission** (1953) was chaired by **Kaka Kalelkar**; the **Second** (1979) by **B. P. Mandal**.",
      table: {
        columns: ["Commission", "Article", "Key fact"],
        rows: [
          { cells: ["National Commission for Scheduled Castes", "338", "A separate commission since the 89th Amendment (2003)"] },
          { cells: ["National Commission for Scheduled Tribes", "338A", "Inserted by the 89th Amendment (2003)"] },
          {
            cells: ["National Commission for Backward Classes", "338B", "Made constitutional by the 102nd Amendment (2018)"],
            noteAmber: "CDS 2026 (I): it is a constitutional body and the 1993 Act is repealed; it is not headed by a ministry Secretary.",
            pyqExampleId: "a01d4cc1-7a7c-409d-abbd-08c578d03395",
          },
          {
            cells: ["First Backward Classes Commission", "340", "Appointed 1953, chaired by Kaka Kalelkar"],
            noteAmber: "CDS 2025 (I): Kalelkar chaired the First commission; Mandal chaired the Second, not the Third.",
            pyqExampleId: "55e64f3f-6452-4ec0-b142-d7c72187a9d9",
          },
          { cells: ["Second Backward Classes Commission", "340", "Appointed 1979, chaired by B. P. Mandal"] },
        ],
      },
      pyqExampleId: "56bd7df5-b0d2-4535-acb9-b82e7cf090b1",
      selfCheckExample: {
        prompt: "A student says the National Commission for Backward Classes is a statutory body set up under an Act of 1993. Is that right today?",
        steps: [
          "It did begin under the NCBC Act of 1993.",
          "The 102nd Amendment (2018) inserted Article 338B and made it a constitutional body; the 1993 Act was repealed the same year.",
        ],
        answer: "No. Since 2018 it is a constitutional body under Article 338B.",
      },
      practiceSet: [
        { prompt: "Which Article provides for the National Commission for Backward Classes?", answer: "Article 338B" },
        { prompt: "Which amendment split the joint commission into separate SC and ST commissions?", answer: "The 89th Amendment (2003)" },
        { prompt: "Who chaired the First Backward Classes Commission?", answer: "Kaka Kalelkar" },
        { prompt: "Which Backward Classes Commission was chaired by B. P. Mandal?", answer: "The Second (1979)" },
      ],
      traps: [
        {
          title: "Reports go to both Houses",
          body: "These commissions report to the **President**, who has the reports laid before **each House** of Parliament, not the Lok Sabha alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-civil-services",
      name: "Civil services and the All India Services",
      intuition:
        "Civil servants serve 'at the pleasure' of the government, but the Constitution does not leave them unprotected: a junior officer cannot sack them, and they must be heard before they are punished. The All India Services belong to the Centre and the States together, so the States' House must agree before a new one is created.",
      definition:
        "Part XIV:\n" +
        "- **Article 309**: the legislature regulates recruitment and conditions of service.\n" +
        "- **Article 310**: the **doctrine of pleasure**: civil servants hold office during the pleasure of the President or the Governor.\n" +
        "- **Article 311**: the **safeguards**: no dismissal or removal by an authority **subordinate to the appointing authority**, and no dismissal, removal or reduction in rank **without an inquiry** and a **reasonable opportunity of being heard**.\n" +
        "- **Article 312**: **Parliament** may by law create a new **All India Service**, but only after the **Rajya Sabha** passes a resolution by **two-thirds** of members present and voting. Today there are three: the **IAS**, the **IPS** and the **Indian Forest Service**.\n" +
        "- Recruitment rules and conditions of service of the All India Services are made by the **Central Government** under the All India Services Act, 1951, not by the UPSC.",
      table: {
        columns: ["Article", "What it says"],
        rows: [
          { cells: ["309", "The legislature regulates recruitment and conditions of service"] },
          { cells: ["310", "Civil servants hold office during the pleasure of the President or Governor"] },
          { cells: ["311", "Safeguards against dismissal, removal or reduction in rank"] },
          {
            cells: ["312", "Parliament creates All India Services after a Rajya Sabha resolution"],
            noteAmber: "CDS 2017 (II): an All India Service may be created by an Act of Parliament; the Rajya Sabha's endorsement is essential.",
            pyqExampleId: "7cbe008d-d7e8-4799-b479-0827d1463040",
          },
        ],
      },
      pyqExampleId: "30f75cb7-d780-4644-b275-486434d3420e",
      selfCheckExample: {
        prompt: "Parliament wants to create a new Indian Medical Service as an All India Service. What must happen first?",
        steps: [
          "Article 312 lets Parliament create a new All India Service by law.",
          "Before that, the Rajya Sabha must declare it necessary in the national interest by a resolution of two-thirds of the members present and voting.",
        ],
        answer: "A two-thirds resolution of the Rajya Sabha, followed by a law of Parliament.",
      },
      practiceSet: [
        { prompt: "Which Article states the doctrine of pleasure for civil servants?", answer: "Article 310" },
        { prompt: "Name the three All India Services that exist today.", answer: "IAS, IPS and the Indian Forest Service" },
        { prompt: "Which Article provides for the creation of All India Services?", answer: "Article 312" },
        { prompt: "Under which Act are the rules for the All India Services made?", answer: "The All India Services Act, 1951" },
      ],
      traps: [
        {
          title: "The UPSC does not make the service rules",
          body: "The UPSC recruits, but the **rules** of recruitment and the **conditions of service** of the All India Services are made by the **Central Government**. Statements giving that power to the UPSC are false.",
        },
      ],
    },
  ],
};
