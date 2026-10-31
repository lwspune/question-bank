import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PFR_LOCAL_NOTE: SubtopicNote = {
  subtopicName: "Local Self-Government and Panchayati Raj",
  title: "Local Self-Government and Panchayati Raj",
  oneLineDefinition:
    "Panchayati Raj from Ripon to the 73rd Amendment, the committees that shaped it, the States left outside it, and two facts about elections and parties.",
  whyItMatters:
    "Ten questions in the bank: three from the 2023 shifts and seven from the 2024 shifts. Each asks for one name, Article or Part, so a single list of facts covers the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpfrlg-panchayats",
      name: "Panchayati Raj",
      intuition:
        "Local self-government began as a British resolution, became a Directive Principle, and finally got its own Part of the Constitution in 1992. Learn the steps in that order, and the few States that stayed outside.",
      definition:
        "In time order:\n" +
        "- **Lord Ripon's** resolution of **1882** made him the **father of local self-government** in India.\n" +
        "- **Article 40**, a Directive Principle, asked the State to organise **village panchayats**.\n" +
        "- Committees: **Balwant Rai Mehta (1957)** proposed three tiers; **Ashok Mehta (1978)**; **P. K. Thungon (1989)** recommended **constitutional recognition**.\n" +
        "- **Part IX** on the Panchayats (Articles 243 to 243-O) came with the **73rd Amendment (1992)**.\n" +
        "- A **State Election Commissioner**, appointed by the **Governor**, conducts panchayat elections.\n" +
        "- Article 243M keeps **Nagaland**, Meghalaya and Mizoram outside Part IX, so they have no Panchayati Raj institutions.\n" +
        "- In **December 2021** the Supreme Court stayed OBC quotas in local body elections in **Maharashtra and Madhya Pradesh**.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Father of local self-government", "Lord Ripon"], pyqExampleId: "20b4a50b-0ec7-40ed-9924-02327dfe403e" },
          { cells: ["Directive on village panchayats", "Article 40"], pyqExampleId: "70d47c69-0a74-4b28-a7d4-bbec4301a981" },
          { cells: ["Part on the Panchayats", "Part IX (73rd Amendment)"], pyqExampleId: "8dd77a6a-baa5-48a9-9bbb-adbf3a483240" },
          { cells: ["Committee for constitutional recognition", "P. K. Thungon (1989)"], pyqExampleId: "b06266b2-d8e7-48fc-ade0-deffbaad5620" },
          { cells: ["Appoints the State Election Commissioner", "The Governor"], pyqExampleId: "5d8e3d47-39f2-4a1b-b4b2-5dbe811963f1" },
        ],
      },
      pyqExampleId: "0acc6199-ac74-42bb-81f4-6267f8fd5481",
      selfCheckExample: {
        prompt: "Put these in order: Ripon's resolution, the 73rd Amendment, the Balwant Rai Mehta Committee.",
        steps: ["Ripon's resolution came in 1882.", "The Balwant Rai Mehta Committee reported in 1957, and the 73rd Amendment came in 1992."],
        answer: "Ripon (1882), Balwant Rai Mehta (1957), 73rd Amendment (1992).",
      },
      practiceSet: [
        { prompt: "Which Part of the Constitution deals with the Panchayats?", answer: "Part IX" },
        { prompt: "Which amendment gave panchayats constitutional status?", answer: "The 73rd Amendment (1992)" },
        { prompt: "Who appoints a State Election Commissioner?", answer: "The Governor" },
        { prompt: "Who is called the father of local self-government in India?", answer: "Lord Ripon" },
      ],
      traps: [
        {
          title: "Thungon for recognition, Balwant Rai Mehta for three tiers",
          body: "The committee that recommended **constitutional recognition** in 1989 was **P. K. Thungon's**. **Balwant Rai Mehta** (1957) proposed the three-tier structure.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpfrlg-elections",
      name: "Parties and voter enrolment",
      intuition:
        "Two election facts SSC has asked: who controls parties, and how often a young voter can enrol. Both belong to the Election Commission and Parliament, not the courts or the President.",
      definition:
        "The facts:\n" +
        "- India has a **multi-party system** with recognised **national** and **state** parties.\n" +
        "- Parties **register with**, get **symbols from** and are **recognised by** the **Election Commission**, not the Supreme Court, the President or Parliament.\n" +
        "- The **Election Laws (Amendment) Act, 2021** gave **four qualifying dates** a year for enrolment, **1 January, 1 April, 1 July and 1 October**, in place of 1 January alone.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Who registers parties and allots symbols", "The Election Commission"] },
          { cells: ["Qualifying dates for enrolment (since 2021)", "1 January, 1 April, 1 July, 1 October"], pyqExampleId: "a257783f-0744-4b70-ab6c-04b272e1dc98" },
        ],
      },
      pyqExampleId: "541096e8-d8c0-4655-9401-0c7966f682ed",
      selfCheckExample: {
        prompt: "Before 2021 a person turning 18 in February waited for the next 1 January to enrol. What changed?",
        steps: ["The Election Laws (Amendment) Act, 2021 added three more qualifying dates.", "Now there are four: 1 January, 1 April, 1 July and 1 October, so she can enrol on 1 April."],
        answer: "She can enrol from the next quarterly date, 1 April.",
      },
      practiceSet: [
        { prompt: "Which body allots symbols to political parties?", answer: "The Election Commission of India" },
        { prompt: "How many qualifying dates a year does the 2021 Act give for voter enrolment?", answer: "Four" },
      ],
      traps: [
        {
          title: "The President does not allot symbols",
          body: "Party symbols and recognition come from the **Election Commission**. Options naming the President, Parliament or the Supreme Court are wrong.",
        },
      ],
    },
  ],
};
