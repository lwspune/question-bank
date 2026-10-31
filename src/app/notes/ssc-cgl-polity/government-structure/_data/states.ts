import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PGS_STATES_NOTE: SubtopicNote = {
  subtopicName: "State Legislatures and Governors",
  title: "State Legislatures and Governors",
  oneLineDefinition:
    "The Governor's appointment, oath and powers, the Chief Minister and the State Council of Ministers, the Advocate General, and the State Legislature with its Legislative Council.",
  whyItMatters:
    "Twenty-seven questions in the bank: ten from the 2023 shifts, nine from the 2024 shifts and eight from the 2025 shifts, and 15 of them MODERATE. Most mirror a Union rule at State level, so the trick is to know where the State rule differs: the Governor cannot pardon a death sentence, and the State ministry answers to the Assembly alone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpgsst-governor",
      name: "The Governor",
      intuition:
        "The Governor heads a State the way the President heads the Union, with one big difference: he is appointed, not elected. SSC asks how he comes in, whom he swears before, and what he can and cannot do.",
      definition:
        "The facts:\n" +
        "- **Art 155**: **appointed by the President**. **Art 156**: a five-year term. **Art 158**: he may not be a member of Parliament or of any State legislature listed in the **First Schedule**. **Art 159**: he takes his oath before the **Chief Justice of the High Court** of the State.\n" +
        "- The **7th Amendment (1956)** lets one person be Governor of **two or more States**. The Supreme Court (1979) held that the office is independent, not under the Central Government.\n" +
        "- **Art 161**: he can pardon, but **not a death sentence**; that is the President's power under Art 72.\n" +
        "- **Art 174**: he can **dissolve the Assembly**. **Art 200**: he may **reserve a Bill for the President**. Under **Art 356** his report can lead to President's Rule.\n" +
        "- He unfurls the flag in the State capital on **Republic Day**.\n" +
        "- The **Sarkaria Commission** advised that a Governor not be removed before his term ends except in rare cases.\n" +
        "- **Sarojini Naidu** (Uttar Pradesh, 1947) was the first woman Governor. **Anandiben Patel** became Governor of Uttar Pradesh in 2019.",
      table: {
        columns: ["Article", "Governor's"],
        rows: [
          { cells: ["155", "Appointment by the President"] },
          { cells: ["158", "Conditions of office"], pyqExampleId: "02281b75-47f1-42f6-abde-167213da70cb" },
          { cells: ["159", "Oath before the High Court Chief Justice"], pyqExampleId: "87588cff-8b10-477f-b9f7-7ed4a86d229b" },
          { cells: ["161", "Pardon (not a death sentence)"], pyqExampleId: "56a6ec9a-05bb-4ecc-833a-12da8a25cedc" },
          { cells: ["174", "Dissolving the Assembly"], pyqExampleId: "af0653d2-f5c8-42f7-838b-02664a181981" },
          { cells: ["200", "Reserving a Bill for the President"], pyqExampleId: "f0d262e9-66d0-4db4-8f58-94a6a0b6497c" },
        ],
      },
      pyqExampleId: "73a85da9-e7bd-4306-9051-5ddba08684a4",
      selfCheckExample: {
        prompt: "Both the President and the Governor can show mercy. Which of them can pardon a death sentence, and under which Article?",
        steps: [
          "The President can pardon any sentence, including death, under Article 72.",
          "The Governor's power under Article 161 does not reach a death sentence: he can suspend or commute it, but not pardon it.",
        ],
        answer: "Only the President, under Article 72.",
      },
      practiceSet: [
        { prompt: "Before whom does a Governor take his oath?", answer: "The Chief Justice of the State's High Court" },
        { prompt: "Which amendment allowed one person to be Governor of two States?", answer: "The 7th Amendment (1956)" },
        { prompt: "Who unfurls the flag in a State capital on Republic Day?", answer: "The Governor" },
        { prompt: "Who was the first woman Governor of independent India?", answer: "Sarojini Naidu (Uttar Pradesh)" },
      ],
      traps: [
        {
          title: "Pardon is Article 72 for the President, 161 for the Governor",
          body: "A statement that both pardon under **Article 72** is false: the Governor's power is in **Article 161**.",
        },
        {
          title: "The Governor's term was never cut",
          body: "The Governor's term is **five years** (Art 156). A statement that an amendment cut it to four years is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsst-ministers",
      name: "Chief Minister, ministers and the Advocate General",
      intuition:
        "The State Council of Ministers works like the Union one, with a size limit added in 2003. Learn the limit, the Chief Minister's one written duty, and to whom the ministry answers.",
      definition:
        "The rules:\n" +
        "- **Art 164(1A)** (91st Amendment, 2003): ministers, including the Chief Minister, may not exceed **15%** of the Assembly's members, and may not be fewer than **12**.\n" +
        "- **Art 164(2)**: the State Council of Ministers is collectively responsible to the **Legislative Assembly**, even where a Council exists. (The Union ministry answers to the Lok Sabha.)\n" +
        "- **Art 166**: conduct of business of the State government. **Art 167**: the Chief Minister must **communicate the Cabinet's decisions to the Governor**.\n" +
        "- **Art 165**: the **Advocate General**, the **highest law officer of the State**, advises the State government on legal matters.",
      table: {
        columns: ["Article", "Subject"],
        rows: [
          { cells: ["164(1A)", "Ministers: at most 15% of the Assembly, at least 12"], pyqExampleId: "c8e45b6a-6558-4659-8a2c-bcb282478222" },
          { cells: ["165", "Advocate General"], pyqExampleId: "c8621fdc-d289-42f3-a1d7-867222f9ab2e" },
          { cells: ["166", "Conduct of business of the State government"], pyqExampleId: "39d7677c-24da-420d-a354-9eae2b90b158" },
          { cells: ["167", "Chief Minister informs the Governor"], pyqExampleId: "1c4e3af8-a3e6-4025-9321-b6cea4d0f6f3" },
        ],
      },
      pyqExampleId: "3713d1fe-9176-4962-8eec-f9408bc97877",
      selfCheckExample: {
        prompt: "A State Assembly has 200 members. What are the most and the fewest ministers it may have, including the Chief Minister?",
        steps: ["The cap is 15% of 200, which is 30.", "The floor is 12, whatever the size of the Assembly."],
        answer: "At most 30, at least 12.",
      },
      practiceSet: [
        { prompt: "Who is the highest law officer of a State?", answer: "The Advocate General" },
        { prompt: "What is the minimum number of ministers in a State, including the Chief Minister?", answer: "12" },
        { prompt: "Which amendment capped the size of ministries?", answer: "The 91st Amendment (2003)" },
        { prompt: "Which Article deals with the conduct of business of the State government?", answer: "Article 166" },
      ],
      traps: [
        {
          title: "Responsible to the Assembly, not the Council",
          body: "Even in a State with a Legislative Council, the ministry answers to the **Legislative Assembly** only.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsst-legislature",
      name: "The State Legislature",
      intuition:
        "Most States have one House; a few have two. The upper House, the Legislative Council, is the one SSC asks about: its size, how its members come in, and how a State gets or loses one.",
      definition:
        "The facts:\n" +
        "- Articles **168 to 212** (Part VI) cover the State Legislature. The upper House is the **Legislative Council (Vidhan Parishad)**, the lower the **Legislative Assembly (Vidhan Sabha)**.\n" +
        "- **Art 169**: a State creates or abolishes its Council by an Assembly resolution followed by a law of Parliament. **West Bengal** passed such a resolution in 2021.\n" +
        "- **Art 171**: a Council has at most **one-third** of the Assembly's strength and at least **40** members. Five-sixths are elected indirectly (by local bodies, graduates, teachers and MLAs) and **one-sixth are nominated** by the Governor; those nominations cannot be challenged in court.\n" +
        "- **Art 172(2)**: the Council is **never dissolved**.\n" +
        "- **Art 207**: a Money Bill needs the **Governor's** recommendation.\n" +
        "- The Governor's power to nominate an **Anglo-Indian** to the Assembly (Art 333) ended with the **104th Amendment** (from January 2020). Telangana's Assembly has **119** elected members.",
      table: {
        columns: ["Rule", "Answer"],
        rows: [
          { cells: ["Articles on the State Legislature", "168 to 212"], pyqExampleId: "c6be351f-792e-4d97-858f-f6bd3cc97571" },
          { cells: ["Council size", "At most one-third of the Assembly; at least 40"], pyqExampleId: "2ff7e639-977f-4f7b-a0ce-20339dbc1476" },
          { cells: ["Council dissolved?", "Never (Art 172(2))"], pyqExampleId: "d8302fbf-b76f-4235-8619-f771c9a131ab" },
          { cells: ["Money Bill introduced with", "The Governor's recommendation"], pyqExampleId: "2a7a7b8a-47db-451c-8e20-d61943521e49" },
          { cells: ["State that voted for a Council in 2021", "West Bengal"], pyqExampleId: "9944d104-598b-49d3-addd-87c896d933ae" },
        ],
      },
      pyqExampleId: "1b796e48-c1be-4d5e-9f65-9cc65782d19f",
      selfCheckExample: {
        prompt: "A State's Legislative Council has 90 members. What is the smallest its Assembly could be, and how many Council members are nominated?",
        steps: ["The Council can be at most one-third of the Assembly, so the Assembly must have at least 270 members.", "One-sixth of the Council is nominated: 90 divided by 6 is 15."],
        answer: "An Assembly of at least 270; 15 nominated members.",
      },
      practiceSet: [
        { prompt: "What is the upper House of a State legislature called?", answer: "The Legislative Council (Vidhan Parishad)" },
        { prompt: "What is the minimum strength of a Legislative Council?", answer: "40" },
        { prompt: "What share of a Legislative Council is nominated by the Governor?", answer: "One-sixth" },
        { prompt: "Which amendment ended Anglo-Indian nominations to State Assemblies?", answer: "The 104th Amendment" },
        { prompt: "How many elected members does the Telangana Assembly have?", answer: "119" },
      ],
      traps: [
        {
          title: "The Governor's nominations cannot be challenged",
          body: "A statement that the Governor's nominations to the Council can be challenged in court is false.",
        },
      ],
    },
  ],
};
