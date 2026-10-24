import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_PRESIDENT_NOTE: SubtopicNote = {
  subtopicName: "The President and Vice-President",
  title: "The President and Vice-President",
  oneLineDefinition:
    "Who elects the President and how, who may stand, the term, resignation and removal, the President's immunity, and how the Vice-President's office differs.",
  whyItMatters:
    "Ten CDS questions from 2017 to 2026, eight MODERATE and two HARD. Four are about the election itself: who votes, the voting system and who may stand. Two ask to whom an office-holder hands a resignation, so learn the resignation table as pairs.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-president-election",
      name: "Electing the President",
      intuition:
        "The President is not chosen by the people directly. A special body of elected lawmakers, from the Centre and from the States, chooses the President, so the head of the whole country has the backing of both. Only ELECTED members take part: anyone who was nominated, or who sits in a State's upper House, does not vote.",
      definition:
        "The rules (Articles 54, 55, 57 and 58):\n" +
        "- **Article 54**: the President is elected by an **electoral college** of the **elected members of both Houses of Parliament** and the **elected members of the Legislative Assemblies of the States**.\n" +
        "- The **70th Amendment (1992)** added the elected members of the Assemblies of **Delhi** and **Puducherry**.\n" +
        "- **Nominated members** of Parliament or an Assembly and members of **Legislative Councils** do **not** vote.\n" +
        "- **Article 55**: the voting is by **proportional representation by means of the single transferable vote**, by **secret ballot**.\n" +
        "- **Article 58**: a candidate must be a citizen, at least **35 years** old, qualified to be a Lok Sabha member, and must not hold an **office of profit**. Being President, Vice-President, a Governor or a **Union or State Minister** does not count as an office of profit.\n" +
        "- **Article 57**: a President may be **re-elected**. **Article 71**: disputes about the election are decided by the **Supreme Court**.",
      table: {
        columns: ["Member", "Votes for the President?"],
        rows: [
          { cells: ["Elected member of the Lok Sabha or Rajya Sabha", "Yes"] },
          { cells: ["Nominated member of the Rajya Sabha", "No"] },
          { cells: ["Elected member of a State Legislative Assembly", "Yes"] },
          {
            cells: ["Member of a State Legislative Council", "No"],
            noteAmber: "CDS 2022 (I): an electoral college of all MPs and all State legislators is the wrong statement. Only elected MPs and MLAs vote.",
            pyqExampleId: "a8953ac6-df3b-4476-a0bf-e18da04116d1",
          },
          { cells: ["Elected member of the Delhi or Puducherry Assembly", "Yes, since the 70th Amendment (1992)"] },
        ],
      },
      pyqExampleId: "5b066ded-63db-4bf0-9131-ce872711d54b",
      selfCheckExample: {
        prompt: "A serving Union Cabinet Minister files nomination papers for the presidential election. Does holding the ministry make the candidate ineligible?",
        steps: [
          "Article 58 bars a person who holds an office of profit.",
          "Its explanation says that being a Union or State Minister is not an office of profit for this purpose.",
          "So the ministry is no bar to standing.",
        ],
        answer: "No. A Union Minister is eligible to stand for President.",
      },
      practiceSet: [
        { prompt: "By what voting system is the President of India elected?", answer: "Proportional representation by means of the single transferable vote, by secret ballot" },
        { prompt: "What is the minimum age to be elected President of India?", answer: "35 years" },
        { prompt: "Which court decides a dispute about a presidential election?", answer: "The Supreme Court (Article 71)" },
        { prompt: "Can a person who has already served as President be elected again?", answer: "Yes (Article 57)" },
      ],
      traps: [
        {
          title: "Elected members only",
          body: "The President's electoral college has **elected** MPs and **elected** MLAs only. Nominated members and members of **Legislative Councils** have no vote, so a statement that all MPs and all State legislators vote is false.",
        },
        {
          title: "A Minister may stand",
          body: "Article 58 bars an office of profit, but it says that the posts of President, Vice-President, Governor and **Union or State Minister** are not offices of profit. A statement that a Union Minister cannot be elected President is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-president-office",
      name: "Term, resignation, removal and immunity",
      intuition:
        "The President holds the highest office, so the rules about leaving it are written into the Constitution. Every office-holder who resigns hands the letter to a named person, and those pairs are what CDS asks. While in office, the President cannot be dragged into court for official acts, so the office is never held up by lawsuits.",
      definition:
        "The office:\n" +
        "- **Article 53**: the **executive power of the Union** is vested in the President; Parliament may by law give functions to other authorities too.\n" +
        "- **Article 56**: the term is **five years**. The President **resigns by writing to the Vice-President** and continues in office until the successor takes over.\n" +
        "- **Article 61**: removal is by **impeachment**, on one ground only: **violation of the Constitution**.\n" +
        "- **Article 361**: the President (and a Governor) is **not answerable to any court** for the exercise of the powers and duties of the office.\n" +
        "- **Table of Precedence**: President (1), Vice-President (2), Prime Minister (3), **Governors within their own States** (4), **former Presidents** (5), **Deputy Prime Minister** (5A), **Chief Justice of India** and the Speaker of the Lok Sabha (6).",
      table: {
        columns: ["Office", "Resigns by writing to", "Removed by"],
        rows: [
          {
            cells: ["President", "The Vice-President", "Impeachment by Parliament for violating the Constitution"],
            noteAmber: "CDS 2020 (II): resigning by writing to the Speaker of the Lok Sabha is the false statement.",
            pyqExampleId: "20505007-4c72-4f27-82e0-65ac3e16165a",
          },
          { cells: ["Vice-President", "The President", "A Rajya Sabha resolution agreed to by the Lok Sabha"] },
          {
            cells: ["Judge of the Supreme Court", "The President", "The President, after an address by both Houses passed by a special majority"],
            noteAmber: "CDS 2019 (II): a Supreme Court judge resigns to the President, not to the Chief Justice of India.",
            pyqExampleId: "e48fbc0c-7cb9-46b7-b692-1df91f1d8504",
          },
          { cells: ["Comptroller and Auditor General", "The President", "In the same way as a Supreme Court judge"] },
          { cells: ["Speaker of the Lok Sabha", "The Deputy Speaker", "A Lok Sabha resolution passed by a majority of all its then members"] },
        ],
      },
      pyqExampleId: "42d12018-74da-4e3a-8040-c0a586c76630",
      selfCheckExample: {
        prompt: "A President's five-year term ends, but the election of the next President has not been completed. Who holds the office in the meantime?",
        steps: [
          "Article 56 fixes the term at five years.",
          "It also says the President continues to hold office, even after the term ends, until the successor enters office.",
        ],
        answer: "The outgoing President stays in office until the successor takes over.",
      },
      practiceSet: [
        { prompt: "To whom does the President of India address a letter of resignation?", answer: "The Vice-President" },
        { prompt: "On what ground can the President be impeached?", answer: "Violation of the Constitution" },
        { prompt: "Which Article vests the executive power of the Union in the President?", answer: "Article 53" },
        { prompt: "In the Table of Precedence, who ranks just after former Presidents?", answer: "The Deputy Prime Minister (rank 5A)" },
      ],
      traps: [
        {
          title: "The CAG is removed like a judge",
          body: "The Comptroller and Auditor General is removed **in the same way as a Supreme Court judge**, not in the same way as the President. The President alone is removed by impeachment.",
        },
        {
          title: "Governors outrank former Presidents",
          body: "Within their own States, Governors are 4th in the Table of Precedence, above former Presidents (5th) and the Deputy Prime Minister (5A). The Chief Justice of India comes after all three, at 6th.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-vice-president",
      name: "The Vice-President",
      intuition:
        "The Vice-President has two jobs: chairing the Rajya Sabha every day, and stepping in if the President's office falls vacant. Because the job is tied to Parliament, only Parliament elects the Vice-President: the State Assemblies have no part in it.",
      definition:
        "The office (Articles 63 to 71):\n" +
        "- **Article 64**: the Vice-President is the **ex officio Chairman of the Rajya Sabha**.\n" +
        "- **Article 66**: elected by an electoral college of **all members of both Houses of Parliament**, elected **and nominated**. State Assemblies do not vote.\n" +
        "- Must be at least **35 years** old and qualified to be a **Rajya Sabha** member. The term is **five years**, and there is **no bar on re-election**.\n" +
        "- Resigns by writing to the **President**. Removed by a **Rajya Sabha** resolution passed by a majority of all its then members and **agreed to by the Lok Sabha**.\n" +
        "- Acts as President when that office falls vacant, until a new President is elected (within six months).",
      table: {
        columns: ["Person", "Vice-President", "President"],
        rows: [
          { cells: ["Sarvepalli Radhakrishnan", "1952 to 1962 (two terms)", "1962 to 1967"] },
          { cells: ["Zakir Husain", "1962 to 1967", "1967 to 1969"] },
          { cells: ["V. V. Giri", "1967 to 1969", "1969 to 1974"] },
          { cells: ["R. Venkataraman", "1984 to 1987", "1987 to 1992"] },
          { cells: ["Shankar Dayal Sharma", "1987 to 1992", "1992 to 1997"] },
          { cells: ["K. R. Narayanan", "1992 to 1997", "1997 to 2002"] },
          {
            cells: ["Neelam Sanjiva Reddy", "Never (he was Speaker of the Lok Sabha)", "1977 to 1982"],
            noteAmber: "CDS 2026 (I): of Radhakrishnan, Zakir Husain and Sanjiva Reddy, two had been Vice-President.",
            pyqExampleId: "990d602f-2253-484a-96ca-e8457af50a16",
          },
        ],
      },
      pyqExampleId: "ebb28bdf-c017-4c41-ad1c-d2965a4a4db9",
      selfCheckExample: {
        prompt: "A nominated member of the Rajya Sabha and an elected member of the Bihar Legislative Assembly both want to vote in the Vice-President's election. Which of them can?",
        steps: [
          "Article 66 gives the vote to all members of both Houses of Parliament, nominated members included.",
          "State Assemblies have no part in the Vice-President's election.",
        ],
        answer: "Only the nominated Rajya Sabha member.",
      },
      practiceSet: [
        { prompt: "Of which House is the Vice-President the ex officio Chairman?", answer: "The Rajya Sabha" },
        { prompt: "To whom does the Vice-President address a letter of resignation?", answer: "The President" },
        { prompt: "In which House must a resolution to remove the Vice-President begin?", answer: "The Rajya Sabha" },
        { prompt: "Who was the first Vice-President of India?", answer: "Sarvepalli Radhakrishnan" },
      ],
      traps: [
        {
          title: "Two different electoral colleges",
          body: "The **President's** college has elected MPs and elected MLAs. The **Vice-President's** college has **all** MPs, nominated ones included, and **no** MLAs. Do not carry one rule over to the other.",
        },
        {
          title: "Sanjiva Reddy came from the Speaker's chair",
          body: "Neelam Sanjiva Reddy became President after being **Speaker of the Lok Sabha**. He was never Vice-President, unlike Radhakrishnan, Zakir Husain, V. V. Giri, R. Venkataraman, Shankar Dayal Sharma and K. R. Narayanan.",
        },
      ],
    },
  ],
};
