import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PCO_MAKING_NOTE: SubtopicNote = {
  subtopicName: "Making and Features of the Constitution",
  title: "Making and Features of the Constitution",
  oneLineDefinition:
    "The dates of the Constitution, the countries and Acts its features were borrowed from, the words of the Preamble, and the Parts and Schedules SSC asks about.",
  whyItMatters:
    "Twenty-five questions in the bank: 12 from the 2023 shifts, nine from the 2024 shifts and four from the 2025 shifts, 20 of them EASY. They are the quickest marks in Polity: a source country, a date, a Part number, a word of the Preamble.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpcomk-sources",
      name: "Dates and borrowed features",
      intuition:
        "The Constitution's makers borrowed freely. Learn each country with what it gave, and the two British Acts whose features carried over: SSC turns any one pair into a question.",
      definition:
        "The dates:\n" +
        "- The **Drafting Committee** under B. R. Ambedkar published the draft in **February 1948**.\n" +
        "- The Constitution was **adopted and enacted on 26 November 1949**, now **Constitution Day**. It came into force on **26 January 1950**.\n\n" +
        "Borrowed features:\n" +
        "- **Britain**: parliamentary government, the **law-making procedure**, the rule of law, single citizenship.\n" +
        "- **USA**: Fundamental Rights, judicial review, **independence of the judiciary**.\n" +
        "- **Ireland**: the **Directive Principles**, nomination to the Rajya Sabha.\n" +
        "- **France**: the **republic**, and liberty, equality and fraternity.\n" +
        "- **Australia**: the Concurrent List. **Canada**: a federation with a strong Centre. **USSR**: Fundamental Duties.\n\n" +
        "From British Acts: the **Government of India Act, 1919** first gave the Centre **two Houses**; the **1935 Act** gave the federal scheme with **provincial autonomy**.",
      table: {
        columns: ["Source", "Feature"],
        rows: [
          { cells: ["Britain", "Parliamentary system and law-making"], pyqExampleId: "0d8c756b-f740-4f1a-bba8-29c2b7f97d52" },
          { cells: ["USA", "Fundamental Rights; independent judiciary"], pyqExampleId: "9e2a2d43-9054-4f48-88a4-2c37a49af45b" },
          { cells: ["Ireland", "Directive Principles"], pyqExampleId: "5e7359c9-0e15-4337-bc5e-e3cb267e9bd1" },
          { cells: ["France", "Republic; liberty, equality, fraternity"], pyqExampleId: "0f731a77-2262-4d7c-aedc-51c015363678" },
          { cells: ["Government of India Act, 1919", "Two Houses at the Centre"], pyqExampleId: "c4269f82-afb2-40bc-b53e-b995f6cd553d" },
          { cells: ["Government of India Act, 1935", "Federal scheme; provincial autonomy"] },
        ],
      },
      pyqExampleId: "ce1fd651-98e8-440c-9b88-1de397ebaef3",
      selfCheckExample: {
        prompt: "Which two dates does the Constitution carry, and what is each one celebrated as?",
        steps: [
          "It was adopted and enacted on 26 November 1949, celebrated as Constitution Day.",
          "It came into force on 26 January 1950, celebrated as Republic Day.",
        ],
        answer: "26 November 1949 (Constitution Day) and 26 January 1950 (Republic Day).",
      },
      practiceSet: [
        { prompt: "From which country did India borrow the Directive Principles?", answer: "Ireland" },
        { prompt: "Which Act first gave India a two-House legislature at the Centre?", answer: "The Government of India Act, 1919" },
        { prompt: "In which month and year was the draft Constitution published?", answer: "February 1948" },
        { prompt: "From which country did the idea of a republic come?", answer: "France" },
        { prompt: "On which date is Constitution Day observed?", answer: "26 November" },
      ],
      traps: [
        {
          title: "Enacted 1949, in force 1950",
          body: "The Constitution was **enacted on 26 November 1949**. **26 January 1950** is when it came into force. SSC offers each as the other.",
        },
        {
          title: "1919 for two Houses, 1935 for provincial autonomy",
          body: "**Bicameralism at the Centre** came in **1919**. **Provincial autonomy** and the federal plan came in **1935**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpcomk-parts",
      name: "Preamble, Parts and Schedules",
      intuition:
        "The Constitution is divided into Parts and Schedules, and SSC asks which Part holds what. Learn the handful of Parts below, the exact words of the Preamble, and what India chose not to copy.",
      definition:
        "The Preamble's words, exactly:\n" +
        "- **Justice**, social, economic and **political**. **Liberty** of thought, expression, belief, faith and worship. **Equality** of status and of **opportunity**. **Fraternity** assuring the **dignity of the individual**.\n" +
        "- **Republic** means the head of the State is **elected**, not hereditary.\n\n" +
        "The original Constitution had **395 Articles**, 22 Parts and 8 Schedules.\n\n" +
        "Parts:\n" +
        "- **Part II** (Arts 5 to 11): citizenship. India has **single citizenship**; in the USA a person is a citizen of the country **and** of a State (dual citizenship).\n" +
        "- **Part V**: the Union; Articles **52 to 78** are the **Union Executive**, including the Vice-President's election.\n" +
        "- **Part IXB**: **co-operative societies** (97th Amendment); the Supreme Court struck down part of it in July 2021.\n" +
        "- **Part XV**: **elections** and the Election Commission.\n" +
        "- **Article 343**: **Hindi in Devanagari** is the official language of the Union.\n\n" +
        "Schedules: the **Seventh** holds the **three Lists**. The **Sixth** applies to the tribal areas of four States, **Assam, Meghalaya, Tripura and Mizoram**, and lets **autonomous district councils** make laws on listed subjects.",
      table: {
        columns: ["Part or Schedule", "Subject"],
        rows: [
          { cells: ["Part II", "Citizenship (Articles 5 to 11)"], pyqExampleId: "cd52098d-c680-4d9b-9020-839efc2e69e7" },
          { cells: ["Part V", "The Union; Union Executive"], pyqExampleId: "64ad5354-c2fd-47b6-ad38-0241447b8450" },
          { cells: ["Part IXB", "Co-operative societies"], pyqExampleId: "7925e11e-159a-4bf2-80e2-fd9b07189261" },
          { cells: ["Part XV", "Elections"], pyqExampleId: "eb432cd1-74bc-42e5-88cb-a27d30464b77" },
          { cells: ["Sixth Schedule", "Tribal areas of four north-eastern States"], pyqExampleId: "8e17e5c6-ae50-4c57-aec2-a616faf539a8" },
          { cells: ["Seventh Schedule", "Union, State and Concurrent Lists"] },
        ],
      },
      pyqExampleId: "ad4e54dd-2a05-4717-aaa4-3671fbe1446b",
      selfCheckExample: {
        prompt: "One Preamble phrase is misquoted: 'Equality of status and employment'. Correct it, and give the Preamble's wording for Fraternity.",
        steps: ["The Preamble says Equality of status and of opportunity.", "It says Fraternity assuring the dignity of the individual."],
        answer: "Equality of status and of opportunity; Fraternity assuring the dignity of the individual.",
      },
      practiceSet: [
        { prompt: "How many Articles did the original Constitution have?", answer: "395" },
        { prompt: "Which Articles deal with citizenship?", answer: "Articles 5 to 11" },
        { prompt: "Which Part of the Constitution deals with elections?", answer: "Part XV" },
        { prompt: "What does Republic mean in the Preamble?", answer: "The head of the State is elected, not hereditary" },
        { prompt: "What does the Seventh Schedule contain?", answer: "The Union, State and Concurrent Lists" },
      ],
      traps: [
        {
          title: "No dual citizenship in India",
          body: "India has **single citizenship**. **Dual citizenship** (of the country and of a State) is the US model, and is the false feature in a 'which is NOT a feature' question.",
        },
        {
          title: "The Sixth Schedule skips Nagaland and Arunachal",
          body: "The **Sixth Schedule** covers **Assam, Meghalaya, Tripura and Mizoram**. A statement naming Nagaland or Arunachal Pradesh is false.",
        },
      ],
    },
  ],
};
