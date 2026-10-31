import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PGS_PARLIAMENT_NOTE: SubtopicNote = {
  subtopicName: "Parliament",
  title: "Parliament",
  oneLineDefinition:
    "The two Houses and the Articles that set them up, how a Money Bill passes, the Rajya Sabha's special powers, and the committees and devices of parliamentary business.",
  whyItMatters:
    "Twenty-four questions in the bank: four from the 2023 shifts, seven from the 2024 shifts and 13 from the 2025 shifts. The 2025 papers favoured two-statement questions on Money Bills and the Rajya Sabha's powers, where one wrong word (Lok Sabha for Rajya Sabha, approve for recommend) makes a statement false.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpgspa-houses",
      name: "The two Houses",
      intuition:
        "Parliament is three parts, not two: the President and both Houses. The Rajya Sabha never dissolves; the Lok Sabha does. Learn the Articles that set them up and the numbers that describe them.",
      definition:
        "The facts:\n" +
        "- **Art 79**: Parliament is the **President** and **two Houses**, the Council of States (**Rajya Sabha**) and the House of the People (**Lok Sabha**). Articles **79 to 122** (Part V) cover Parliament.\n" +
        "- **Art 80**: the Rajya Sabha's composition. The President **nominates 12** members for knowledge of literature, science, art and social service; the seats of the States and Union Territories follow the **Fourth Schedule**.\n" +
        "- **Art 81**: the Lok Sabha's composition. **Art 83**: the Rajya Sabha is **never dissolved**; its members serve **six years**, and **one-third retire every two years**.\n" +
        "- The first Lok Sabha met on **13 May 1952**.\n" +
        "- Each MP can recommend local works under the **MPLADS** scheme, begun in **1993**.",
      table: {
        columns: ["Article", "Subject"],
        rows: [
          { cells: ["79", "Parliament: President and two Houses"], pyqExampleId: "5fff65ae-93e0-4b3b-a4f5-562f991bc041" },
          { cells: ["80", "Composition of the Rajya Sabha"], pyqExampleId: "cf0a4d3f-5f7e-4e7f-91d4-a7f8543702cd" },
          { cells: ["81", "Composition of the Lok Sabha"] },
          { cells: ["83", "Duration of the Houses"] },
          { cells: ["79 to 122", "Parliament as a whole (Part V)"], pyqExampleId: "c393b134-61fa-409c-b24d-83fe86a2dabd" },
        ],
      },
      pyqExampleId: "103ba4b7-78f1-4539-b5fd-9a0a4baf95ac",
      selfCheckExample: {
        prompt: "How many members does the President nominate to the Rajya Sabha, and for what?",
        steps: ["Article 80 lets the President nominate 12 members.", "They are chosen for special knowledge of literature, science, art and social service."],
        answer: "Twelve, for literature, science, art and social service.",
      },
      practiceSet: [
        { prompt: "Which Article provides for a Parliament of the President and two Houses?", answer: "Article 79" },
        { prompt: "Which Schedule allots Rajya Sabha seats to the States?", answer: "The Fourth Schedule" },
        { prompt: "On what date did the first Lok Sabha meet?", answer: "13 May 1952" },
        { prompt: "In which year did the MPLADS scheme begin?", answer: "1993" },
      ],
      traps: [
        {
          title: "The Rajya Sabha is not dissolved",
          body: "Only the **Lok Sabha** can be dissolved. The **Rajya Sabha** is a continuing House; one-third of its members retire every second year.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgspa-bills",
      name: "Money Bills and Financial Bills",
      intuition:
        "Money belongs to the elected House. A Money Bill starts only in the Lok Sabha, the Speaker decides what counts as one, and the upper House can only suggest changes. Every rule follows from that.",
      definition:
        "The rules:\n" +
        "- **Art 110**: a Bill dealing only with taxes, borrowing or the Consolidated Fund is a **Money Bill**; for example, a Bill that **imposes a new tax**. The **Speaker of the Lok Sabha** decides whether a Bill is one, and the Speaker's decision is final.\n" +
        "- It is introduced **only in the Lok Sabha**, with the President's recommendation. After the Lok Sabha passes it, the **Rajya Sabha** has **14 days** and can only **recommend** changes; it cannot reject or amend it (Art 109). Then it goes to the President.\n" +
        "- A State **Legislative Council** has the same limited role (Art 198).\n" +
        "- **Every Money Bill is a Financial Bill, but not every Financial Bill is a Money Bill** (Art 117).\n" +
        "- The **Appropriation Bill** (Art 114) authorises withdrawals from the Consolidated Fund; it is a Money Bill.",
      table: {
        columns: ["Step", "What happens"],
        rows: [
          { cells: ["1", "Introduced in the Lok Sabha"], pyqExampleId: "bcc9bda6-d291-4f60-9cd3-0133a0a4a1f0" },
          { cells: ["2", "Passed by the Lok Sabha"] },
          { cells: ["3", "Sent to the Rajya Sabha: 14 days, recommendations only"], pyqExampleId: "145a8028-38bd-43b9-916c-c9bcf80fdb67" },
          { cells: ["4", "Presented to the President for assent"] },
        ],
      },
      pyqExampleId: "bb4812ee-4d70-4e1e-bbff-a281b2acbb18",
      selfCheckExample: {
        prompt: "The Rajya Sabha wants to change a Money Bill. What can it do, and how long does it have?",
        steps: ["It cannot reject or amend a Money Bill.", "It can return it with recommendations within 14 days; the Lok Sabha may accept or reject them."],
        answer: "Only recommend changes, within 14 days.",
      },
      practiceSet: [
        { prompt: "In which House can a Money Bill be introduced?", answer: "Only the Lok Sabha" },
        { prompt: "Is every Financial Bill a Money Bill?", answer: "No; but every Money Bill is a Financial Bill" },
        { prompt: "What kind of Bill is one that imposes a new tax?", answer: "A Money Bill" },
        { prompt: "What does the Appropriation Bill authorise?", answer: "Withdrawal of money from the Consolidated Fund of India" },
      ],
      traps: [
        {
          title: "The Speaker decides, not the Finance Minister",
          body: "Whether a Bill is a Money Bill is decided by the **Speaker of the Lok Sabha**. The President and the Finance Minister are decoys.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgspa-rajya",
      name: "The Rajya Sabha's special powers",
      intuition:
        "The Rajya Sabha speaks for the States, so two powers that touch the States belong to it alone: letting Parliament make law on a State subject, and creating a new All India Service.",
      definition:
        "The two powers, each needing a resolution of **two-thirds of members present and voting** in the Rajya Sabha:\n" +
        "- **Art 249**: Parliament may make laws on a **State List** subject in the national interest. The resolution lasts **one year** and can be renewed.\n" +
        "- **Art 312**: Parliament may create a **new All India Service**. The Article names the IAS and the IPS; it mentions no 'security service'.\n\n" +
        "By contrast, extending a proclamation of **President's Rule** (Art 356) needs the approval of **both** Houses, not the Rajya Sabha alone.",
      table: {
        columns: ["Article", "Rajya Sabha resolution lets Parliament"],
        rows: [
          { cells: ["249", "Make laws on a State List subject, for a year at a time"], pyqExampleId: "a8992c81-0cfb-4826-9c3a-14b203153099" },
          { cells: ["312", "Create a new All India Service"], pyqExampleId: "c15733ab-ec50-4506-9975-67da026c08b6" },
        ],
      },
      pyqExampleId: "e605ce07-ab42-4aee-95f8-2790304c8880",
      selfCheckExample: {
        prompt: "What majority does the Rajya Sabha need to let Parliament legislate on a State subject, and how long does it last?",
        steps: ["Two-thirds of the members present and voting.", "The resolution lasts one year and can be renewed."],
        answer: "Two-thirds present and voting; one year, renewable.",
      },
      practiceSet: [
        { prompt: "Which House can pass a resolution to create a new All India Service?", answer: "The Rajya Sabha" },
        { prompt: "Which Article provides for new All India Services?", answer: "Article 312" },
        { prompt: "How long does a resolution under Article 249 remain in force?", answer: "One year (renewable)" },
      ],
      traps: [
        {
          title: "President's Rule needs both Houses",
          body: "A statement that President's Rule can be extended with the **Rajya Sabha's** concurrence alone is false: **both Houses** must approve.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgspa-procedure",
      name: "Committees, devices and delegated law",
      intuition:
        "Parliament controls the government through committees and through set times for questions and debates. SSC asks who may sit on a committee and which devices exist.",
      definition:
        "Committees:\n" +
        "- **No minister** may be a member of the **Public Accounts Committee** or the **Estimates Committee**.\n" +
        "- The Estimates Committee's 30 members are **elected** by the Lok Sabha, not nominated by the Speaker.\n" +
        "- Members of the Committee on Public Undertakings serve **one year**.\n\n" +
        "Devices of debate: Question Hour, **Zero Hour**, the **half-an-hour discussion**, the **short duration (two-hour) discussion**, calling attention and motions. There is no 'full-day discussion'.\n\n" +
        "**Delegated legislation**: rules made by the executive under power given by an Act. It **can be challenged** in court if it goes beyond the Act. The Prime Minister may advise dissolving the Lok Sabha, and a Chief Minister the State Assembly.",
      table: {
        columns: ["Device or committee", "Fact"],
        rows: [
          { cells: ["Public Accounts Committee", "No minister may be a member"], pyqExampleId: "e3cb427d-b342-4e85-869e-f1a1240dd91e" },
          { cells: ["Estimates Committee", "30 members elected by the Lok Sabha"] },
          { cells: ["Short duration discussion", "Two hours, on an urgent matter"], pyqExampleId: "b1004dc2-6eff-4c1a-a2e9-108f465a1586" },
          { cells: ["Delegated legislation", "Made by the executive; open to judicial review"] },
        ],
      },
      pyqExampleId: "2101e329-0bc4-417c-8881-f8b6cab436e4",
      selfCheckExample: {
        prompt: "A minister wants to sit on the Public Accounts Committee and the Estimates Committee. Can he, and how are the Estimates Committee's members chosen?",
        steps: ["No minister may be a member of either committee.", "The Estimates Committee's 30 members are elected by the Lok Sabha, not nominated by the Speaker."],
        answer: "He cannot sit on either; the Estimates Committee is elected by the Lok Sabha.",
      },
      practiceSet: [
        { prompt: "Name two devices of parliamentary proceedings besides Question Hour.", answer: "Any two of: Zero Hour, half-an-hour discussion, short duration discussion, calling attention" },
        { prompt: "How long is a short duration discussion?", answer: "Two hours" },
        { prompt: "Can delegated legislation be challenged in court?", answer: "Yes, if it goes beyond its parent Act or the Constitution" },
        { prompt: "For how long do members of the Committee on Public Undertakings serve?", answer: "One year" },
      ],
      traps: [
        {
          title: "Elected, not nominated",
          body: "The **Estimates Committee** is **elected** by the Lok Sabha by proportional representation. A statement that the Speaker nominates it is false.",
        },
      ],
    },
  ],
};
