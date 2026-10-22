import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_STATES_NOTE: SubtopicNote = {
  subtopicName: "Governor and State Legislature",
  title: "Governor and State Legislature",
  oneLineDefinition:
    "What the Governor can and cannot do, the Governor's ordinance power, and how a State legislature is made up, with the six States that have a Legislative Council.",
  whyItMatters:
    "Fifteen CDS questions from 2018 to 2026, 11 MODERATE and 4 HARD. Seven came in the two 2018 papers alone. The ordinance power was asked three times (twice in 2018, once in 2026), and the Legislative Council three times, so the Council's make-up and the list of States that have one are worth learning exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-governor",
      name: "The Governor's powers",
      intuition:
        "The Governor is to a State what the President is to India: the formal head, acting on the advice of the Chief Minister's Council of Ministers. But defence and foreign affairs belong to the Union, so a Governor has none of the President's military or diplomatic powers.",
      definition:
        "The Governor's powers:\n" +
        "- **Executive**: appoints the **Chief Minister** and the ministers; appoints the **Advocate General** (Article 165), who holds office **during the Governor's pleasure**; appoints the **chairman and members of the State Public Service Commission** (Article 316).\n" +
        "- **Legislative**: summons, prorogues and **dissolves** the Assembly (Article 174); gives the **special address** (Article 176) at the start of the **first session after each general election** and the **first session of each year**; promulgates **ordinances** (Article 213).\n" +
        "- **Judicial**: grants **pardons**, reprieves and remissions for offences against State law (Article 161).\n" +
        "- **No diplomatic or military powers**: those belong to the President.\n" +
        "- **Article 167**: the **Chief Minister** must tell the **Governor** all decisions of the Council of Ministers and give any information the Governor asks for.\n" +
        "- A State PSC member is **removed by the President** (Article 317), after a Supreme Court inquiry in a case of misbehaviour, not by the Governor.\n" +
        "- **Fifth Schedule**: a **Tribes Advisory Council** must exist in every State with Scheduled Areas; in a State with Scheduled Tribes but **no** Scheduled Areas, one is set up **if the President so directs**.",
      table: {
        columns: ["Power", "Who holds it in a State"],
        rows: [
          {
            cells: ["Appointing the Advocate General", "The Governor"],
            noteAmber: "CDS 2019 (II): the Advocate General is appointed by the Governor, not by the President on the Governor's recommendation.",
            pyqExampleId: "2b5eb338-1f87-4520-8af0-a1f26c766443",
          },
          { cells: ["Appointing State PSC members", "The Governor"] },
          {
            cells: ["Removing State PSC members", "The President"],
            noteAmber: "CDS 2026 (I): the false statement was that the President removes them on the Governor's report.",
            pyqExampleId: "f2dd8e33-441f-4387-8dca-a290965a7b9e",
          },
          { cells: ["Pardoning an offence against State law", "The Governor"] },
          { cells: ["Diplomatic and military powers", "Nobody in the State: these are the President's"] },
        ],
      },
      pyqExampleId: "ef4c8025-1215-4878-820c-5696e74a2124",
      selfCheckExample: {
        prompt: "A State has many Scheduled Tribes but no Scheduled Areas. Who decides whether it must set up a Tribes Advisory Council?",
        steps: [
          "The Fifth Schedule makes a Tribes Advisory Council compulsory only where there are Scheduled Areas.",
          "For a State with Scheduled Tribes but no Scheduled Areas, it says a Council shall be set up if the President so directs.",
        ],
        answer: "The President.",
      },
      practiceSet: [
        { prompt: "Which Article requires the Governor's special address at the start of the first session each year?", answer: "Article 176" },
        { prompt: "Which Article sets out the Chief Minister's duty to keep the Governor informed?", answer: "Article 167" },
        { prompt: "Who removes a member of a State Public Service Commission?", answer: "The President" },
        { prompt: "During whose pleasure does the Advocate General of a State hold office?", answer: "The Governor's" },
      ],
      traps: [
        {
          title: "The Chief Minister reports to the Governor",
          body: "Under Article 167 the Chief Minister communicates the Council's decisions to the **Governor**. There is no duty to send the **President** a monthly report.",
        },
        {
          title: "The Governor appoints, the President removes",
          body: "The Governor **appoints** State PSC members, but only the **President** can **remove** them. The Governor can at most suspend a member while an inquiry is pending.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-state-ordinance",
      name: "The Governor's ordinance power",
      intuition:
        "Sometimes a law is needed urgently when the State legislature is not meeting. An ordinance fills that gap: it works like a law for a short time. Because it bypasses the legislature, it is tightly limited: it is made on the ministers' advice, must go before the legislature, and dies soon if the legislature does not adopt it.",
      definition:
        "Article 213 (the President's matching power is Article 123):\n" +
        "- The Governor may promulgate an ordinance only when the **Legislature is not in session** and immediate action is needed.\n" +
        "- It is made on the **aid and advice of the Council of Ministers**; it is **not a discretionary** power.\n" +
        "- It must be **laid before the Legislative Assembly** (and the Council too, where there is one).\n" +
        "- It **ceases to operate six weeks after the Legislature reassembles**, or earlier if the Legislature disapproves it.\n" +
        "- The Article says it **may be withdrawn at any time by the Governor**.",
      table: {
        columns: ["Point", "Rule under Article 213"],
        rows: [
          { cells: ["When it can be issued", "Only when the Legislature is not in session"] },
          {
            cells: ["On whose advice", "The Council of Ministers; not discretionary"],
            noteAmber: "CDS 2018 (II): the false statement was that the aid and advice of ministers is not required.",
            pyqExampleId: "d0d97b77-008c-4ffb-a52c-b0ac5d38cb0b",
          },
          { cells: ["Life after the Legislature meets", "Six weeks from reassembly"] },
          { cells: ["Laid before", "The Assembly, and the Council too where one exists"] },
        ],
      },
      pyqExampleId: "09bd7774-1e15-444c-b8ab-81843ce0d139",
      selfCheckExample: {
        prompt: "The Chief Minister's cabinet advises against an ordinance, but the Governor wants to issue it anyway. Can the Governor do so on his own?",
        steps: [
          "Promulgating an ordinance is an executive act under Article 213.",
          "It is done on the aid and advice of the Council of Ministers; it is not one of the Governor's discretionary powers.",
        ],
        answer: "No. The Governor issues an ordinance only on the Council of Ministers' advice.",
      },
      practiceSet: [
        { prompt: "Which Article gives the Governor the power to promulgate ordinances?", answer: "Article 213" },
        { prompt: "Which Article gives the President the power to promulgate ordinances?", answer: "Article 123" },
        { prompt: "Can a Governor issue an ordinance while both Houses of the State legislature are in session?", answer: "No" },
        { prompt: "Is the Governor's ordinance power a discretionary power?", answer: "No, it is used on the Council of Ministers' advice" },
      ],
      traps: [
        {
          title: "Six weeks, not two months",
          body: "An ordinance lapses **six weeks** after the Legislature **reassembles**. A statement giving two months, or six months, is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-state-legislature",
      name: "The State legislature and Legislative Councils",
      intuition:
        "Every State has an elected Legislative Assembly. Only a few also have a second, smaller House, the Legislative Council, whose members come from many different groups: local bodies, graduates, teachers, the Assembly itself and the Governor's nominees. Parliament can create or abolish a Council if the State's Assembly asks.",
      definition:
        "The rules:\n" +
        "- **Article 168**: the Legislature of a State is the **Governor** together with one or two Houses. The **Chief Minister** is not part of the Legislature as such.\n" +
        "- **Six States** have a **Legislative Council**: **Andhra Pradesh, Telangana, Bihar, Karnataka, Maharashtra and Uttar Pradesh**. Jammu and Kashmir's Council was abolished in **2019**, when the State became a Union Territory.\n" +
        "- **Article 169**: **Parliament** creates or abolishes a Council by law, after the **Assembly** passes a resolution by a special majority.\n" +
        "- **Article 171**: a Council has at most **one-third** of the Assembly's members, and at least 40. About **one-third** are elected by **local bodies**, **one-third** by the **MLAs**, **one-twelfth** by **graduates**, **one-twelfth** by **teachers**, and **one-sixth** are **nominated by the Governor**.",
      table: {
        columns: ["State", "Assembly seats", "Legislative Council?"],
        rows: [
          { cells: ["Uttar Pradesh", "403, the most", "Yes"] },
          {
            cells: ["West Bengal", "294", "No"],
            noteAmber: "CDS 2018 (I): of West Bengal, Bihar, Madhya Pradesh and Tamil Nadu, West Bengal has the most Assembly seats.",
            pyqExampleId: "30d35137-aa09-4947-9dfb-d02daa8c5b20",
          },
          { cells: ["Maharashtra", "288", "Yes"] },
          { cells: ["Bihar", "243", "Yes"] },
          { cells: ["Tamil Nadu", "234", "No"] },
          { cells: ["Madhya Pradesh", "230", "No"] },
          { cells: ["Karnataka", "224", "Yes"] },
          { cells: ["Andhra Pradesh", "175", "Yes"] },
          {
            cells: ["Telangana", "119", "Yes"],
            noteAmber: "CDS 2022 (II): Andhra Pradesh, Telangana, Bihar and Uttar Pradesh all have bicameral legislatures.",
            pyqExampleId: "7af03bad-8c90-42f1-85ec-116214fd143a",
          },
          { cells: ["Arunachal Pradesh", "60", "No"] },
        ],
      },
      pyqExampleId: "0940cbc7-1c67-4bb6-b5b7-05bc499a25ed",
      selfCheckExample: {
        prompt: "A State with a Legislative Council wants to abolish it. Who must act, and in what order?",
        steps: [
          "Article 169 starts with the State's Legislative Assembly, which passes a resolution by a special majority.",
          "Parliament then abolishes the Council by an ordinary law; this is not treated as an amendment under Article 368.",
        ],
        answer: "First the State Assembly passes a resolution, then Parliament passes a law.",
      },
      practiceSet: [
        { prompt: "How many States have a Legislative Council?", answer: "Six" },
        { prompt: "Which State has the largest Legislative Assembly?", answer: "Uttar Pradesh (403 seats)" },
        { prompt: "Which Article says the State Legislature is the Governor and one or two Houses?", answer: "Article 168" },
        { prompt: "Does Tamil Nadu have a Legislative Council?", answer: "No" },
      ],
      traps: [
        {
          title: "One-third from local bodies",
          body: "In a Legislative Council, **one-third** is elected by **local bodies**. The **one-twelfth** shares belong to the **graduates** and the **teachers**.",
        },
        {
          title: "The Chief Minister is not part of the Legislature",
          body: "Article 168 names the **Governor** and the Houses. The Chief Minister heads the executive and sits in the House as a member, but is not named as part of the Legislature.",
        },
      ],
    },
  ],
};
