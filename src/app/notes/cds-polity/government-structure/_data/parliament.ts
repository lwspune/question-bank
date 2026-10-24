import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_PARLIAMENT_NOTE: SubtopicNote = {
  subtopicName: "Houses of Parliament and Their Members",
  title: "Houses of Parliament and Their Members",
  oneLineDefinition:
    "How the Lok Sabha and Rajya Sabha are filled, the Rajya Sabha's special powers, the Speaker, and when a member loses a seat or is protected by privilege.",
  whyItMatters:
    "Nineteen CDS questions from 2018 to 2026: 3 EASY, 9 MODERATE and 7 HARD. Four pairs come back again: Rajya Sabha seats by State (2021 and 2025), the list of Speakers (2022 and 2024), defection (2023 and 2026) and privileges (2020 and 2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-houses",
      name: "The two Houses and the Rajya Sabha's special powers",
      intuition:
        "The Lok Sabha speaks for the people, so its members are elected directly. The Rajya Sabha speaks for the States, so the State Assemblies elect its members, and big States get more seats than small ones. Because it is the States' House, the Rajya Sabha alone can open the door for Parliament to step into a State subject.",
      definition:
        "Composition:\n" +
        "- **Article 79**: Parliament is the **President** and the two Houses, the **Rajya Sabha** (Council of States) and the **Lok Sabha** (House of the People).\n" +
        "- **Rajya Sabha**: at most **250** members, **238** from States and Union Territories and **12 nominated** by the President (Article 80) for knowledge or experience in **literature, science, art and social service**. A State's members are elected **indirectly**, by the **elected members of its Legislative Assembly**, by the single transferable vote. Seats go roughly by **population** (Fourth Schedule).\n" +
        "- **Lok Sabha**: members from States **and** Union Territories are **directly elected**; seats are **reserved for SCs and STs** (Article 330).\n\n" +
        "The Rajya Sabha's own powers:\n" +
        "- **Article 249**: by a **two-thirds** resolution it can let Parliament make a law on a **State List** subject in the national interest.\n" +
        "- **Article 312**: by a two-thirds resolution it can let Parliament create a new **All India Service**.\n\n" +
        "Bicameralism (two Houses) lets a second chamber **check** the first and the executive. Its standard **criticism** is that a House whose members are nominated or indirectly elected can block the directly elected one.",
      table: {
        columns: ["State", "Rajya Sabha seats"],
        rows: [
          { cells: ["Uttar Pradesh", "31, the most"] },
          { cells: ["Maharashtra", "19"] },
          {
            cells: ["Tamil Nadu", "18"],
            noteAmber: "CDS 2025 (I): of Andhra Pradesh, Bihar, Madhya Pradesh and Tamil Nadu, Tamil Nadu has the most seats.",
            pyqExampleId: "3af28068-76e3-43a9-b6a5-11410bfe1eb2",
          },
          {
            cells: ["Bihar", "16"],
            noteAmber: "CDS 2021 (II): of Andhra Pradesh, Bihar, Rajasthan and Karnataka, Bihar has the most seats.",
            pyqExampleId: "870bfdf0-4be6-4ff0-81f2-d4d8e979e1bd",
          },
          { cells: ["West Bengal", "16"] },
          { cells: ["Karnataka", "12"] },
          { cells: ["Andhra Pradesh", "11"] },
          { cells: ["Madhya Pradesh", "11"] },
          { cells: ["Rajasthan", "10"] },
        ],
      },
      pyqExampleId: "282da97d-d594-49bc-873a-6dc3391470fb",
      selfCheckExample: {
        prompt: "Parliament wants to make a law on a subject in the State List, in the national interest. What must happen first, and in which House?",
        steps: [
          "Article 249 allows this only after a resolution of the Rajya Sabha.",
          "The resolution must be passed by two-thirds of the members present and voting.",
          "The Lok Sabha has no matching power, so the Rajya Sabha's resolution is the only gate.",
        ],
        answer: "The Rajya Sabha must pass a two-thirds resolution under Article 249.",
      },
      practiceSet: [
        { prompt: "Who elects the members of the Rajya Sabha from a State?", answer: "The elected members of that State's Legislative Assembly" },
        { prompt: "What is the largest number of members the Rajya Sabha may have?", answer: "250" },
        { prompt: "Which State sends the most members to the Rajya Sabha?", answer: "Uttar Pradesh (31)" },
        { prompt: "Are seats reserved for Scheduled Castes and Scheduled Tribes in the Lok Sabha?", answer: "Yes (Article 330)" },
      ],
      traps: [
        {
          title: "The Rajya Sabha is elected indirectly",
          body: "A State's Rajya Sabha members are chosen by the **elected MLAs** of that State, not by the people. Members from Union Territories to the **Lok Sabha**, on the other hand, are directly elected.",
        },
        {
          title: "Tamil Nadu 18, Bihar 16",
          body: "Seat counts are compared within the four options given. Tamil Nadu (18) beats Bihar (16); Bihar beats Karnataka (12), Andhra Pradesh (11), Madhya Pradesh (11) and Rajasthan (10).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-speaker",
      name: "The Speaker of the Lok Sabha",
      intuition:
        "The Speaker runs the Lok Sabha and must look fair to every side. So the Speaker does not join the ordinary voting. The Speaker votes only to break a tie, which is the one moment the House cannot decide on its own.",
      definition:
        "The office (Articles 93 to 96 and 100):\n" +
        "- Elected by the **Lok Sabha** from among its members; vacates office on **ceasing to be a member**.\n" +
        "- **Resigns** by writing to the **Deputy Speaker** (and the Deputy Speaker to the Speaker).\n" +
        "- **Removed** by a resolution passed by a **majority of all the then members** of the Lok Sabha, after 14 days' notice.\n" +
        "- While the office is vacant, the **Deputy Speaker** performs its duties.\n" +
        "- **Article 100**: the Speaker does **not vote in the first instance**, but has a **casting vote** when the votes are **equal**.\n" +
        "- The Speaker presides over a **joint sitting**, certifies **money bills** and decides **defection** cases in the Lok Sabha.\n" +
        "- **Article 120**: business is in **Hindi or English**, but the presiding officer may let a member who cannot express himself in either speak in his **mother tongue**.",
      table: {
        columns: ["Speaker", "Years", "Lok Sabha"],
        rows: [
          { cells: ["G. V. Mavalankar (the first)", "1952 to 1956", "1st"] },
          { cells: ["M. A. Ayyangar", "1956 to 1962", "1st and 2nd"] },
          { cells: ["G. S. Dhillon", "1969 to 1975", "4th and 5th"] },
          { cells: ["Balram Jakhar (the longest)", "1980 to 1989", "7th and 8th"] },
          {
            cells: ["P. A. Sangma", "1996 to 1998", "11th"],
            noteAmber: "CDS 2022 (II): Ayyangar, Dhillon, Jakhar and Sangma were all Speakers of the Lok Sabha.",
            pyqExampleId: "65e9aa02-1c3c-48b8-90fd-38d58a88f00e",
          },
          {
            cells: ["Manohar Joshi", "2002 to 2004", "13th"],
            noteAmber: "CDS 2024 (II): matched Joshi, Chatterjee, Meira Kumar and Mahajan to the 13th, 14th, 15th and 16th Lok Sabha.",
            pyqExampleId: "f8c51afb-605d-415e-80ec-4918076cf5aa",
          },
          { cells: ["Somnath Chatterjee", "2004 to 2009", "14th"] },
          { cells: ["Meira Kumar (the first woman)", "2009 to 2014", "15th"] },
          { cells: ["Sumitra Mahajan", "2014 to 2019", "16th"] },
          { cells: ["Om Birla", "2019 onward", "17th and 18th"] },
        ],
      },
      pyqExampleId: "35b0778c-d9f3-46cd-8307-d4cfc929f879",
      selfCheckExample: {
        prompt: "The Speaker of the Lok Sabha decides to step down. To whom must the resignation letter be addressed?",
        steps: [
          "Article 94 pairs the two presiding officers of the Lok Sabha.",
          "The Speaker resigns to the Deputy Speaker, and the Deputy Speaker to the Speaker.",
        ],
        answer: "To the Deputy Speaker.",
      },
      practiceSet: [
        { prompt: "Who was the first Speaker of the Lok Sabha?", answer: "G. V. Mavalankar" },
        { prompt: "Who was the first woman Speaker of the Lok Sabha?", answer: "Meira Kumar" },
        { prompt: "Who presides over a joint sitting of the two Houses?", answer: "The Speaker of the Lok Sabha" },
        { prompt: "In which two languages is business in Parliament transacted?", answer: "Hindi and English (Article 120)" },
      ],
      traps: [
        {
          title: "The Speaker resigns to the Deputy Speaker",
          body: "Not to the President. The President receives the resignations of the Vice-President and the judges; the Speaker writes to the **Deputy Speaker**.",
        },
        {
          title: "A casting vote is not a second vote",
          body: "The Speaker does **not** vote first and then again. He stays out of the first vote and uses a **casting vote only when the votes are tied**. No rule says it must favour the existing position.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-disqualification",
      name: "Disqualification and the anti-defection law",
      intuition:
        "Some people are kept out of Parliament because they could not serve fairly or properly: someone holding a paid government post, a bankrupt, a person a court has declared of unsound mind. A second set of rules, against defection, stops a member from switching parties after the voters chose him under one party's name.",
      definition:
        "Article 102 has two parts:\n" +
        "- **Article 102(1)**: a person is disqualified **for being chosen as, and for being**, a member if he holds an **office of profit** under a government (other than one Parliament has exempted by law), is of **unsound mind** and so declared by a court, is an **undischarged insolvent**, is **not a citizen** or has **voluntarily acquired a foreign citizenship**, or is disqualified by a law of Parliament. Under **Article 103** the **President** decides such a question, on the **Election Commission's** opinion.\n" +
        "- **Article 102(2)**: a person is disqualified **for being a member** if he is disqualified under the **Tenth Schedule** (anti-defection law, added by the **52nd Amendment, 1985**).\n\n" +
        "The Tenth Schedule:\n" +
        "- A member is disqualified if he **voluntarily gives up** his party's membership, or **votes or abstains contrary to the party's direction** without prior permission (unless the party condones it within 15 days).\n" +
        "- An **independent** who joins a party is disqualified; a **nominated** member who joins a party **after six months** is disqualified.\n" +
        "- **Merger** exception: no disqualification if **two-thirds** of the legislature party agree to merge with another party. Members who **do not accept** the merger and work as a **separate group** are also protected.\n" +
        "- The question is decided by the **Speaker** (Lok Sabha) or **Chairman** (Rajya Sabha). The decision is open to **judicial review** (Kihoto Hollohan, 1992).",
      table: {
        columns: ["Case under the Tenth Schedule", "Disqualified?"],
        rows: [
          { cells: ["Member voluntarily gives up the party's membership", "Yes"] },
          { cells: ["Member votes against the party whip without permission, not condoned within 15 days", "Yes"] },
          { cells: ["Independent member joins a political party", "Yes"] },
          { cells: ["Nominated member joins a party within six months of taking his seat", "No"] },
          { cells: ["Nominated member joins a party after six months", "Yes"] },
          { cells: ["Two-thirds of the legislature party agree to merge with another party", "No"] },
        ],
      },
      pyqExampleId: "df1b9c14-188a-4d49-8b65-e9dc72ea231c",
      selfCheckExample: {
        prompt: "An independent MP, two years after winning, formally joins a national political party. What happens to the MP's seat, and who decides?",
        steps: [
          "The Tenth Schedule disqualifies an independent member who joins a political party after the election.",
          "In the Lok Sabha, a defection question is decided by the Speaker.",
        ],
        answer: "The MP is disqualified; the Speaker decides, subject to judicial review.",
      },
      practiceSet: [
        { prompt: "Who decides a defection case against a member of the Rajya Sabha?", answer: "The Chairman of the Rajya Sabha" },
        { prompt: "Which amendment added the anti-defection law to the Constitution?", answer: "The 52nd Amendment (1985)" },
        { prompt: "Who decides whether an MP is disqualified for holding an office of profit?", answer: "The President, acting on the Election Commission's opinion (Article 103)" },
        { prompt: "Which 1992 case held that a defection decision is open to judicial review?", answer: "Kihoto Hollohan" },
      ],
      traps: [
        {
          title: "Two deciders for two kinds of disqualification",
          body: "Office of profit, insolvency and the other Article 102(1) grounds are decided by the **President** on the Election Commission's opinion. **Defection** is decided by the **Speaker or Chairman**, not the President, the Supreme Court or the party.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-privileges",
      name: "Parliamentary privileges",
      intuition:
        "MPs must be able to speak their mind in the House without fear of being sued, and must not be kept away from the House by a civil case. Those protections are privileges. They protect the House's work, so they cover what is said inside the House and do not make an MP free of the criminal law.",
      definition:
        "Article 105 and the practice of the House:\n" +
        "- **Freedom of speech in Parliament**: a separate guarantee, not cut down by the limits on Article 19(1)(a).\n" +
        "- **No proceedings in any court** for anything said or any vote given **in Parliament or its committees**. Words said **outside** the House get no such cover.\n" +
        "- **Freedom from arrest** in **civil** cases only, during a session and **40 days before and after** it. There is **no** protection from arrest on a **criminal** charge or under **preventive detention**.\n" +
        "- A **question of privilege** gets **priority** over other listed business, and the Speaker may refer one **on his own** (suo motu) to the **Committee of Privileges**.\n" +
        "- The **Attorney General** also has the privileges of an MP (Article 105(4)).",
      table: {
        columns: ["Situation", "Protected by privilege?"],
        rows: [
          { cells: ["A speech made in the Lok Sabha", "Yes, no court may act on it"] },
          { cells: ["A vote given in a parliamentary committee", "Yes"] },
          { cells: ["The same remark repeated at a press conference", "No"] },
          { cells: ["Arrest in a civil case during a session", "Yes"] },
          {
            cells: ["Arrest on a criminal charge or under preventive detention", "No"],
            noteAmber: "CDS 2025 (I): privilege does not extend to freedom from preventive arrest or detention.",
            pyqExampleId: "0fc0d70c-fcfa-43b1-affc-b068ae286e02",
          },
        ],
      },
      pyqExampleId: "0fc0d70c-fcfa-43b1-affc-b068ae286e02",
      selfCheckExample: {
        prompt: "An MP makes a defamatory remark in a Lok Sabha debate and repeats it word for word to reporters outside the House. Which statement can be taken to court?",
        steps: [
          "Article 105 bars court proceedings only for what is said in Parliament or its committees.",
          "The remark to reporters was made outside the House, where the ordinary law applies.",
        ],
        answer: "Only the remark made to the reporters.",
      },
      practiceSet: [
        { prompt: "Which Article deals with the privileges of Members of Parliament?", answer: "Article 105" },
        { prompt: "For how many days before and after a session does an MP's freedom from civil arrest run?", answer: "40 days" },
        { prompt: "Can an MP be sued for a vote given in the House?", answer: "No" },
        { prompt: "Which officer of the Government, though not an MP, enjoys the privileges of an MP?", answer: "The Attorney General" },
      ],
      traps: [
        {
          title: "Freedom from arrest is civil only",
          body: "An MP is free from arrest only in **civil** cases, during a session and 40 days either side. A **criminal** case or **preventive detention** is not covered.",
        },
        {
          title: "Privilege covers the House, not private life",
          body: "Immunity attaches to what is said or voted **in Parliament or its committees**. It does not cover what an MP says in a personal or private capacity outside.",
        },
      ],
    },
  ],
};
