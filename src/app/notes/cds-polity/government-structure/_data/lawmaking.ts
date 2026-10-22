import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_LAWMAKING_NOTE: SubtopicNote = {
  subtopicName: "Bills, Motions and Committees",
  title: "Bills, Motions and Committees",
  oneLineDefinition:
    "How an ordinary bill becomes law and when a joint sitting is called, what makes a money bill and the budget, the adjournment motion, and Parliament's committees.",
  whyItMatters:
    "Fourteen CDS questions from 2017 to 2026: 8 MODERATE, 5 HARD and 1 EASY. Five are on money bills and the budget and five on committees, so those two tables carry most of the marks. Three of the five committee questions are HARD, and two of them turn on how many members each House sends.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-ordinary-bills",
      name: "Ordinary bills and the joint sitting",
      intuition:
        "An ordinary bill needs both Houses to agree. If they cannot, the Constitution has a tie-breaker: both Houses sit together and vote as one body. The Lok Sabha is more than twice the size of the Rajya Sabha, so in a joint sitting the Lok Sabha's view usually wins.",
      definition:
        "The path of an ordinary bill:\n" +
        "- It may start in **either House**. After it is introduced, the member in charge may move that it be **taken into consideration**, **referred to a Select Committee** of the House, **referred to a Joint Committee** of both Houses (only with the **other House's concurrence**), or **circulated to elicit public opinion**.\n" +
        "- It is passed by each House and then goes to the **President for assent** (Article 111).\n" +
        "- **Article 108**: if one House **rejects** the bill, the Houses **disagree on amendments**, or **six months** pass without the other House passing it, the **President** may call a **joint sitting**. The **Speaker** presides and a simple majority of members present and voting decides.\n" +
        "- A joint sitting is **not** available for a **money bill** (the Rajya Sabha can only delay it) or a **constitutional amendment bill** (each House must pass it separately by a special majority).\n" +
        "- Joint sittings have been held **three times**: the Dowry Prohibition Bill (**1961**), the Banking Service Commission (Repeal) Bill (**1978**) and the Prevention of Terrorism Bill (**2002**).",
      table: {
        columns: ["Kind of bill", "Can a joint sitting settle a deadlock?"],
        rows: [
          { cells: ["Ordinary bill", "Yes"] },
          { cells: ["Financial bill that is not a money bill", "Yes"] },
          { cells: ["Money bill", "No, the Rajya Sabha can only delay it 14 days"] },
          { cells: ["Constitutional amendment bill", "No, each House passes it separately"] },
        ],
      },
      pyqExampleId: "110fb5f8-251c-45bf-bdf3-5d24499a287d",
      selfCheckExample: {
        prompt: "The Lok Sabha passes an ordinary bill. The Rajya Sabha receives it and takes no action on it for seven months. What can the President do?",
        steps: [
          "Article 108 allows a joint sitting when more than six months pass without the other House passing the bill.",
          "Seven months is more than six, and this is an ordinary bill.",
        ],
        answer: "The President may summon a joint sitting of both Houses to decide the bill.",
      },
      practiceSet: [
        { prompt: "How many joint sittings of Parliament have been held?", answer: "Three (1961, 1978 and 2002)" },
        { prompt: "On which bill was the first joint sitting held, in 1961?", answer: "The Dowry Prohibition Bill" },
        { prompt: "Who summons a joint sitting of the two Houses?", answer: "The President" },
        { prompt: "Which Article deals with the President's assent to bills?", answer: "Article 111" },
      ],
      traps: [
        {
          title: "A joint committee needs both Houses",
          body: "After introduction, a bill may be sent to a **Joint Committee** only if the **other House agrees**. A motion to refer it to a joint committee **without** that concurrence cannot be made.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-money-bills",
      name: "Money bills and the budget",
      intuition:
        "Money bills deal with the people's money: taxes, borrowing and spending from the government's main account. Only the elected House should control that. So a money bill starts in the Lok Sabha, and the Rajya Sabha can comment on it and delay it a little, but cannot block or change it.",
      definition:
        "Money bills (Articles 109, 110 and 117):\n" +
        "- **Article 110**: a money bill deals **only** with taxes, government **borrowing**, the **custody** of the Consolidated Fund or the Contingency Fund, and **appropriation** of money from the Consolidated Fund, and related matters.\n" +
        "- A bill is **not** a money bill merely because it provides for **fines**, **fees** for licences or services, or a **tax by a local authority** for local purposes.\n" +
        "- The **Speaker** decides whether a bill is a money bill, and the decision is **final**.\n" +
        "- It can be introduced **only in the Lok Sabha**, on the **President's recommendation** (Article 117).\n" +
        "- **Article 109**: the Rajya Sabha may **discuss** it and **recommend** changes, but must return it within **14 days**, and **cannot reject or amend** it. The Lok Sabha may accept or reject the recommendations.\n\n" +
        "The budget: **Article 112** requires the **Annual Financial Statement** (estimated receipts and expenditure for the year) to be laid before Parliament. **Article 113**: the **demands for grants** are voted by the **Lok Sabha** only. **Article 114**: the **Appropriation Bill**.",
      table: {
        columns: ["Article", "Rule"],
        rows: [
          {
            cells: ["109", "The Rajya Sabha must return a money bill within 14 days"],
            noteAmber: "CDS 2017 (II): the Rajya Sabha can hold up a money bill for two weeks.",
            pyqExampleId: "7975e2da-53b5-4cbd-a672-32acbf922fe7",
          },
          {
            cells: ["110", "What a money bill is, and what does not make one (fines, fees, local taxes)"],
            noteAmber: "CDS 2022 (I): fines imposed by a local authority for local purposes are not a money bill provision.",
            pyqExampleId: "47c1618a-9cc6-48e8-8a81-4ce847977cc2",
          },
          {
            cells: ["112", "The Annual Financial Statement (the budget) is laid before Parliament"],
            noteAmber: "CDS 2019 (II): the statement of estimated receipts and expenditure is required by Article 112.",
            pyqExampleId: "d2bcf481-cca7-4022-8dfe-cda691861445",
          },
          { cells: ["113", "Demands for grants are voted by the Lok Sabha"] },
          { cells: ["117", "A money bill needs the President's recommendation"] },
        ],
      },
      pyqExampleId: "f4dd847b-7ac0-4532-8a6d-cab7ab38926d",
      selfCheckExample: {
        prompt: "A bill's only financial clause sets a fine of Rs 500 for littering in public parks. Is it a money bill?",
        steps: [
          "Article 110(2) says a bill is not a money bill merely because it provides for fines or other pecuniary penalties.",
          "The bill has no clause on taxes, borrowing or the Consolidated Fund.",
        ],
        answer: "No. It is an ordinary bill.",
      },
      practiceSet: [
        { prompt: "Within how many days must the Rajya Sabha return a money bill?", answer: "14 days" },
        { prompt: "Which Article defines a money bill?", answer: "Article 110" },
        { prompt: "On whose recommendation is a money bill introduced?", answer: "The President's (Article 117)" },
        { prompt: "Which Article requires the Annual Financial Statement to be laid before Parliament?", answer: "Article 112" },
      ],
      traps: [
        {
          title: "The Rajya Sabha can talk, not block",
          body: "The Rajya Sabha **can discuss** a money bill and **recommend** changes. It **cannot reject or amend** it, and must return it within 14 days, after which it is deemed passed.",
        },
        {
          title: "A constitutional amendment can start in the Rajya Sabha",
          body: "Only money bills and the budget must begin in the Lok Sabha. A **constitutional amendment bill** and a bill to **alter State boundaries** may be introduced in **either House**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-motions",
      name: "The adjournment motion and other devices",
      intuition:
        "Normally the House follows its agenda. An adjournment motion is an emergency brake: members set the agenda aside to discuss something urgent that happened just now. Because it stops the House's work and blames the government, it is allowed only for a matter the Union Government answers for.",
      definition:
        "The adjournment motion:\n" +
        "- Draws the House's attention to a **definite matter of urgent public importance** that is **recent**. It is an **extraordinary** procedure that sets aside normal business.\n" +
        "- Used in the **Lok Sabha** only, and needs the support of **50 members**. It carries an element of **censure** of the government.\n" +
        "- The matter must be one for which the **Government of India** is responsible. A matter within the jurisdiction of a **State Government** cannot be raised by it.\n" +
        "- The **Speaker** has full discretion to give or refuse consent.\n\n" +
        "Parliament likewise does not discuss matters that lie wholly with a State government.",
      table: {
        columns: ["Device", "Key point"],
        rows: [
          { cells: ["Question Hour", "The first hour of a sitting; starred questions get an oral answer, unstarred a written one"] },
          { cells: ["Zero Hour", "Starts right after Question Hour; an Indian practice not in the rules of procedure"] },
          { cells: ["Calling attention motion", "Calls a minister's attention to an urgent matter; an Indian innovation of 1954"] },
          {
            cells: ["Adjournment motion", "Lok Sabha only; urgent matter of recent occurrence; 50 members' support"],
            noteAmber: "CDS 2025 (I): the false statement was that it may cover a matter within a State Government's jurisdiction.",
            pyqExampleId: "d0fc20f7-360c-4049-a949-4dfaa3b66d2f",
          },
        ],
      },
      pyqExampleId: "d0fc20f7-360c-4049-a949-4dfaa3b66d2f",
      selfCheckExample: {
        prompt: "A bridge built and run by a Union ministry collapsed yesterday, killing many people. Which device lets the Lok Sabha set aside its business today to discuss it?",
        steps: [
          "The matter is definite, recent and urgent.",
          "The Government of India is responsible for the bridge.",
          "Setting aside normal business for such a matter is what an adjournment motion does, if 50 members support it.",
        ],
        answer: "An adjournment motion.",
      },
      practiceSet: [
        { prompt: "How many members must support an adjournment motion?", answer: "50" },
        { prompt: "In which House is the adjournment motion used?", answer: "The Lok Sabha" },
        { prompt: "Which kind of question in Parliament gets an oral answer?", answer: "A starred question" },
        { prompt: "Which parliamentary practice, starting right after Question Hour, is not in the rules of procedure?", answer: "Zero Hour" },
      ],
      traps: [
        {
          title: "Union matters only",
          body: "An adjournment motion must concern something the **Government of India** answers for. A matter wholly within a **State Government's** jurisdiction is outside it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-committees",
      name: "Parliamentary committees",
      intuition:
        "Parliament is too big to check every rupee and every scheme on the floor, so small groups of members do the detailed work. Some committees exist all the time (standing committees); others are set up for one job and end with it (ad hoc). The financial ones check how money is planned and spent.",
      definition:
        "How committees work:\n" +
        "- Members are **elected** by the House (by proportional representation) on a motion, or **nominated** by the **Speaker** or the **Chairman**, depending on the committee.\n" +
        "- **Standing** committees are permanent; **ad hoc** committees are set up for a task and end with it (the **Railway Convention Committee** is ad hoc).\n" +
        "- The three **financial committees** are standing committees: the **Public Accounts Committee**, the **Estimates Committee** and the **Committee on Public Undertakings**.\n" +
        "- **Public Accounts Committee**: examines the **accounts** of the Government of India and the CAG's audit reports. **22** members (15 Lok Sabha, 7 Rajya Sabha). Its chairperson is **appointed by the Speaker**, by convention from the opposition.\n" +
        "- **Estimates Committee**: **30** members, **all from the Lok Sabha**.",
      table: {
        columns: ["Committee", "Members (Lok Sabha + Rajya Sabha)", "Chairperson"],
        rows: [
          { cells: ["Public Accounts Committee", "15 + 7 = 22", "Appointed by the Speaker"] },
          {
            cells: ["Estimates Committee", "30 + 0 = 30", "Appointed by the Speaker"],
            noteAmber: "CDS 2023 (I): the Estimates Committee is the one with no Rajya Sabha members.",
            pyqExampleId: "268991ee-d80b-4985-8996-dc4250ea66e9",
          },
          { cells: ["Committee on Public Undertakings", "15 + 7 = 22", "Appointed by the Speaker"] },
          { cells: ["Welfare of Scheduled Castes and Scheduled Tribes", "20 + 10 = 30", "Appointed by the Speaker"] },
          { cells: ["Empowerment of Women", "20 + 10 = 30", "Appointed by the Speaker"] },
          {
            cells: ["Welfare of Other Backward Classes", "20 + 10 = 30", "Appointed by the Speaker"],
            noteAmber: "CDS 2026 (II): the Speaker appoints this committee's chairperson; on every committee in that question the Lok Sabha has more members.",
            pyqExampleId: "58f9ef9d-6ddc-4f4a-9501-8e50bc58d906",
          },
        ],
      },
      pyqExampleId: "411ea245-8cd6-4328-8b90-90b542a5f4c4",
      selfCheckExample: {
        prompt: "On the Committee on Empowerment of Women, which House has more members, and by how many?",
        steps: [
          "The committee has 30 members.",
          "20 come from the Lok Sabha and 10 from the Rajya Sabha.",
        ],
        answer: "The Lok Sabha, by 10 (20 against 10).",
      },
      practiceSet: [
        { prompt: "How many members does the Estimates Committee have?", answer: "30, all from the Lok Sabha" },
        { prompt: "Is the Railway Convention Committee a standing or an ad hoc committee?", answer: "Ad hoc" },
        { prompt: "Name the three financial committees of Parliament.", answer: "Public Accounts, Estimates, and Public Undertakings" },
        { prompt: "How many Rajya Sabha members sit on the Committee on Public Undertakings?", answer: "7" },
      ],
      traps: [
        {
          title: "The Estimates Committee is a standing committee",
          body: "The Estimates Committee is a **standing** financial committee with **no** Rajya Sabha members. The **Railway Convention Committee** is the **ad hoc** one. A pair of statements calling them the other way round is wrong on both counts.",
        },
        {
          title: "Chairpersons are appointed, not elected",
          body: "The chairpersons of these Lok Sabha committees are **appointed by the Speaker** from among the members. A statement that the PAC elects its own chairperson is false.",
        },
      ],
    },
  ],
};
