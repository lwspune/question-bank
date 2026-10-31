import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PCO_RELATIONS_NOTE: SubtopicNote = {
  subtopicName: "Centre-State Relations",
  title: "Centre-State Relations",
  oneLineDefinition:
    "How the Constitution divides law-making between the Union and the States, which Article settles a clash, and the councils and commissions that manage the relationship.",
  whyItMatters:
    "Twenty-eight questions in the bank, and 23 of them come from the 2025 shifts: Centre-State relations was the big new topic of 2025 Polity questions on the Constitution. Most are two-statement questions that swap one detail (President for Parliament, binding for advisory, State for Union), so learn each Article with its exact actor and effect.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpcocs-lists",
      name: "The three Lists and the Articles on a clash",
      intuition:
        "Law-making is split into three Lists. Most questions ask which List a subject sits in, or which law wins when two collide. The answer almost always favours the Union, which is why Indian federalism is said to lean towards the Centre.",
      definition:
        "The basics:\n" +
        "- **Article 1**: 'India, that is Bharat, shall be a **Union of States**'; its territory is the States and Union Territories of the First Schedule. The word 'federal' appears nowhere, and the system has a **bias towards the Centre**.\n" +
        "- The **Seventh Schedule** holds the **Union, State and Concurrent Lists** (Article 246). Articles **245 to 255** cover legislative relations.\n" +
        "- Subjects in no List are **residuary**, and Parliament makes laws on them (Art 248).\n" +
        "- A few entries: **criminal law** is in the **Concurrent List**; **agriculture** and **trade within a State** are in the **State List**.\n\n" +
        "When laws collide:\n" +
        "- Union List against State List: the **Union List prevails**.\n" +
        "- **Art 254**, Concurrent List: the **Union law prevails**, unless a State law was **reserved for the President and got his assent**; then it prevails in that State, until Parliament passes a fresh law.\n" +
        "- **Art 252**: a law Parliament makes at the request of two or more States applies **only to those States** and any that adopt it later.\n" +
        "- **Art 255**: a law is not invalid just because a required recommendation was missing, if assent was given.\n" +
        "- **Art 256 and 257**: the Union may **give directions** to States, and a State must not obstruct the Union's executive power.",
      table: {
        columns: ["Subject", "List"],
        rows: [
          { cells: ["Criminal law", "Concurrent"] },
          { cells: ["Education (since 1976)", "Concurrent"] },
          { cells: ["Agriculture", "State"] },
          { cells: ["Trade and commerce within a State", "State"] },
          { cells: ["Matters in no List (residuary)", "Union (Parliament)"], pyqExampleId: "dcd5472d-49ba-43ab-bdda-4c445e9e1628" },
        ],
      },
      pyqExampleId: "91b4fea2-ef3d-4474-aa9e-2f809dc3adba",
      selfCheckExample: {
        prompt: "A State passes a law on a Concurrent subject that clashes with an older Union law. When can the State law prevail, and can Parliament undo it?",
        steps: [
          "Under Article 254(2), the State law prevails in that State if it was reserved for the President and received his assent.",
          "Parliament can later amend or repeal it by passing a fresh law on the same subject.",
        ],
        answer: "Only with the President's assent; and Parliament can still override it later.",
      },
      practiceSet: [
        { prompt: "How does Article 1 describe India?", answer: "As a Union of States" },
        { prompt: "Which Articles of Part XI deal with legislative relations?", answer: "Articles 245 to 255" },
        { prompt: "Who makes laws on residuary subjects?", answer: "Parliament" },
        { prompt: "Which Article lets the Union give directions to the States?", answer: "Article 256" },
        { prompt: "In which List is criminal law?", answer: "The Concurrent List" },
      ],
      traps: [
        {
          title: "Conflict on the Concurrent List: Union wins by default",
          body: "A statement that a **State** law prevails over a Union law on a Concurrent subject is false, unless it adds that the State law got the **President's assent**.",
        },
        {
          title: "Article 252 laws bind only the asking States",
          body: "A law made at the request of two or more States applies **only to them** and to States that adopt it, not to all States.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpcocs-councils",
      name: "Councils, commissions and water disputes",
      intuition:
        "Disagreements between the Centre and the States go to advisory bodies, not courts, and water disputes go to special tribunals. SSC asks who set each body up, when, and whether its advice binds anyone.",
      definition:
        "The bodies, in time order:\n" +
        "- **States Reorganisation Commission** (Fazl Ali), set up in **December 1953**; it led to the **States Reorganisation Act, 1956**, which also created the five **Zonal Councils**.\n" +
        "- **Sarkaria Commission** on Centre-State relations, set up in **1983**, reported in **1988**.\n" +
        "- **Inter-State Council**: **Article 263** lets the **President** set it up; it was set up in **1990** after the Sarkaria Commission recommended it. It is chaired by the **Prime Minister**, with the Chief Ministers and six Union Cabinet ministers. It can inquire into disputes, but its advice is **recommendatory, not binding**, and it cannot enforce anything.\n" +
        "- **Punchhi Commission** on Centre-State relations, set up in **2007**.\n\n" +
        "**Water disputes (Art 262)**: Parliament may set up **tribunals** for inter-State river disputes and **bar the Supreme Court** from them.\n\n" +
        "**Article 370**: in August 2019 it was made inoperative by **Presidential Orders** under Article **370(3)**, not by an amendment under Article 368.",
      table: {
        columns: ["Body or event", "Year", "Fact"],
        rows: [
          { cells: ["States Reorganisation Commission", "1953", "Led to the 1956 Act"], pyqExampleId: "aa6ce5f1-86ca-45df-8adb-3e439264f84c" },
          { cells: ["Zonal Councils", "1956", "Created by the States Reorganisation Act"], pyqExampleId: "014b67ab-3ded-454d-99e9-cbf7ab2446f1" },
          { cells: ["Sarkaria Commission", "1983", "Report 1988"], pyqExampleId: "c85a954a-a13a-4615-884f-283c8f9f6849" },
          { cells: ["Inter-State Council", "1990", "Article 263; PM chairs; advisory"], pyqExampleId: "2f23e2b1-e77b-45b3-9948-eae5c7f6e559" },
          { cells: ["Punchhi Commission", "2007", "Second look at Centre-State relations"] },
        ],
      },
      pyqExampleId: "5ddfd299-6789-4d57-94c0-70c898a887ef",
      selfCheckExample: {
        prompt: "Put these in order: the Inter-State Council set up, the Sarkaria report, the Punchhi Commission set up.",
        steps: ["The Sarkaria Commission reported in 1988.", "The Inter-State Council followed in 1990, and the Punchhi Commission in 2007."],
        answer: "Sarkaria report, Inter-State Council, Punchhi Commission.",
      },
      practiceSet: [
        { prompt: "Who chairs the Inter-State Council?", answer: "The Prime Minister" },
        { prompt: "Under which Article can the President set up an Inter-State Council?", answer: "Article 263" },
        { prompt: "In which year was the Sarkaria Commission set up?", answer: "1983" },
        { prompt: "Under which Act were the Zonal Councils created?", answer: "The States Reorganisation Act, 1956" },
        { prompt: "Can the Supreme Court be barred from inter-State river water disputes?", answer: "Yes, by a law under Article 262" },
      ],
      traps: [
        {
          title: "The President sets up the Council, not Parliament",
          body: "Article 263 gives the power to the **President**. A statement that it empowers **Parliament** is false.",
        },
        {
          title: "Advice, not orders",
          body: "The Inter-State Council's recommendations are **not binding**. Statements that it can enforce compliance are false.",
        },
      ],
    },
  ],
};
