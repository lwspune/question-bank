import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_EMERGENCY_NOTE: SubtopicNote = {
  subtopicName: "Emergency Provisions",
  title: "Emergency Provisions",
  oneLineDefinition:
    "The three emergencies of Part XVIII (national, President's Rule in a State, financial), their grounds and Articles, and what happens to the Fundamental Rights while one is in force.",
  whyItMatters:
    "Ten CDS questions, from 2016 (II) to 2023 (II). The grounds for a national emergency were asked twice, both times with 'internal disturbance' among the options, and the rights that survive an emergency were asked twice more. Most of the answers on this page trace back to one amendment, the 44th of 1978.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-three-emergencies",
      name: "The three emergencies",
      intuition:
        "The Constitution lets the Centre take extra powers in three kinds of crisis: a threat to the whole country, a breakdown of government in one State, and a threat to the country's finances. " +
        "Each has its own Article, and only the President can declare any of them.",
      definition:
        "The three:\n" +
        "- **National Emergency, Article 352**: on the ground of **war, external aggression or armed rebellion**. The 44th Amendment (1978) replaced 'internal disturbance' with 'armed rebellion' and requires the **written advice of the Cabinet**. Parliament must approve it within one month by a special majority. Declared in 1962, 1971 and 1975.\n" +
        "- **President's Rule, Article 356**: when the constitutional machinery in a **State** fails.\n" +
        "- **Financial Emergency, Article 360**: when the financial stability or credit of India or any part of it is threatened. **Never declared.** The Centre can then order **cuts in the salaries** of State employees and give the States directions on money matters.\n" +
        "- There is **no other kind** of emergency, such as a 'health emergency'.\n" +
        "- A **Governor has no emergency powers**. Only the President can proclaim an emergency.\n" +
        "- During a national emergency the Union can **give directions to a State** on how to use its executive power.",
      table: {
        columns: ["Emergency", "Article", "Ground"],
        rows: [
          {
            cells: ["National Emergency", "352", "War, external aggression or armed rebellion"],
            noteAmber: "CDS 2021 (II): 'internal disturbance' is not a ground; it was removed in 1978.",
            pyqExampleId: "b7146fd7-d407-41fb-a288-ea251d513063",
          },
          { cells: ["President's Rule", "356", "Failure of constitutional machinery in a State"] },
          {
            cells: ["Financial Emergency", "360", "Threat to financial stability or credit"],
            noteAmber: "CDS 2017 (II): a Governor cannot declare a financial emergency; only the President can.",
            pyqExampleId: "b3ee37aa-1a86-40e1-891b-dec1f41fd334",
          },
        ],
      },
      pyqExampleId: "60468c83-d3d3-4750-939e-e9ece55093a7",
      selfCheckExample: {
        prompt: "Has India ever had a financial emergency under Article 360?",
        steps: ["National emergencies were declared in 1962, 1971 and 1975.", "Article 360 has never been used."],
        answer: "No. A financial emergency has never been declared.",
      },
      practiceSet: [
        { prompt: "Which Article provides for a financial emergency?", answer: "Article 360" },
        { prompt: "Whose written advice must the President have before proclaiming a national emergency?", answer: "The Union Cabinet's" },
        { prompt: "In which Part of the Constitution are the emergency provisions?", answer: "Part XVIII (Articles 352 to 360)" },
        { prompt: "Within how long must Parliament approve a proclamation of national emergency?", answer: "One month" },
      ],
      traps: [
        {
          title: "Armed rebellion, not internal disturbance",
          body: "Since the **44th Amendment (1978)** the grounds are **war, external aggression and armed rebellion**. 'Internal disturbance', the ground used in 1975, is no longer in the Constitution.",
        },
        {
          title: "Governors cannot declare emergencies",
          body: "Every emergency is proclaimed by the **President**. A Governor has **no emergency powers**, not even for a financial crisis in the State.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-presidents-rule",
      name: "President's Rule (Article 356)",
      intuition:
        "If a State's government cannot be carried on as the Constitution requires, the President can take it over. " +
        "The framers knew this power could be abused, so they promised it would be used only as a last step.",
      definition:
        "The rules:\n" +
        "- Imposed when the President is satisfied, on the **Governor's report** or otherwise, that the government of a State **cannot be carried on** under the Constitution.\n" +
        "- Parliament must approve it within **two months** by a simple majority. It can last at most **three years**, with approval every six months.\n" +
        "- In the Constituent Assembly, **Ambedkar** hoped it would be a **dead letter** and used only as **a matter of last resort**, after a warning to the State.\n" +
        "- **S. R. Bommai (1994)**: the Supreme Court held that a proclamation can be reviewed by the courts.\n" +
        "- It has been used many times; **Manipur** has had it more often than most States, more than Bihar, Punjab or Karnataka.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Article", "356"] },
          { cells: ["Approval by Parliament", "Within two months, simple majority"] },
          { cells: ["Longest duration", "Three years"] },
          { cells: ["Ambedkar's promise", "A dead letter, used only as a last resort"] },
          {
            cells: ["Used most often among Bihar, Karnataka, Manipur, Punjab", "Manipur"],
            pyqExampleId: "769352fd-03c0-4989-bd48-dabad24fd0f9",
          },
        ],
      },
      pyqExampleId: "76e5c903-12b1-42ea-915c-348db2630b4d",
      selfCheckExample: {
        prompt: "How long can President's Rule continue in a State at the most, and how often must Parliament renew it?",
        steps: ["Parliament approves it for six months at a time.", "The outer limit is three years."],
        answer: "Three years at most, renewed every six months.",
      },
      practiceSet: [
        { prompt: "Within how long must Parliament approve a proclamation of President's Rule?", answer: "Two months" },
        { prompt: "In which 1994 case did the Supreme Court rule on the use of President's Rule?", answer: "S. R. Bommai" },
        { prompt: "On whose report does the President usually impose President's Rule?", answer: "The Governor's" },
      ],
      traps: [
        {
          title: "President's Rule is Article 356, not 352",
          body: "**Article 352** is the national emergency. President's Rule in a State is **Article 356**, and the financial emergency is **Article 360**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-rights-in-emergency",
      name: "Fundamental Rights during an emergency",
      intuition:
        "A national emergency is the only way Fundamental Rights can be put on hold. " +
        "After the misuse of 1975, the 44th Amendment fenced off two rights that can never be suspended: Articles 20 and 21.",
      definition:
        "The rules:\n" +
        "- Fundamental Rights can be suspended **only during a national emergency**; not by an ordinary law, an amendment or a court.\n" +
        "- **Article 358**: the freedoms of **Article 19** are suspended automatically, but only when the emergency is on the ground of **war or external aggression**, not armed rebellion.\n" +
        "- **Article 359**: the President may suspend the **right to move a court** for other Fundamental Rights.\n" +
        "- **Never suspended** (44th Amendment): **Article 20** (protection in respect of conviction for offences) and **Article 21** (life and personal liberty).",
      table: {
        columns: ["Right", "During a national emergency"],
        rows: [
          { cells: ["Article 19 freedoms (speech, movement and others)", "Suspended automatically if the ground is war or external aggression"] },
          { cells: ["Equality before law, constitutional remedies and the rest", "Enforcement can be suspended by the President (Article 359)"] },
          {
            cells: ["Article 20: protection in respect of conviction for offences", "Never suspended"],
            noteAmber: "CDS 2023 (II): protection in respect of conviction for offences was the right NOT suspended.",
            pyqExampleId: "dac3dcea-dc95-41ec-ba99-19dacdc031f2",
          },
          { cells: ["Article 21: life and personal liberty", "Never suspended"] },
        ],
      },
      pyqExampleId: "27e26488-1d0d-461c-aee3-6b48afb187b3",
      selfCheckExample: {
        prompt: "A national emergency is declared on the ground of armed rebellion. Are the freedoms of Article 19 suspended automatically?",
        steps: [
          "Article 358 suspends Article 19 automatically only for war or external aggression.",
          "Armed rebellion is not one of those two grounds.",
        ],
        answer: "No. Automatic suspension applies only to war or external aggression.",
      },
      practiceSet: [
        { prompt: "Which Article lets the President suspend the right to move a court for Fundamental Rights during an emergency?", answer: "Article 359" },
        { prompt: "Can an Act of Parliament suspend the Fundamental Rights in normal times?", answer: "No. Only a proclamation of national emergency allows it" },
        { prompt: "Which amendment protected two Fundamental Rights from suspension during an emergency?", answer: "The 44th Amendment, 1978" },
      ],
      traps: [
        {
          title: "Articles 20 and 21, not 21 and 22",
          body: "The two rights that survive an emergency are **Article 20** (conviction for offences) and **Article 21** (life and liberty). Article 22 (arrest and detention) can be suspended.",
        },
        {
          title: "Movement is suspended, conviction rights are not",
          body: "Freedom of movement is part of Article 19, so it goes in a war emergency. Protection in respect of conviction for offences is Article 20, which is never suspended.",
        },
      ],
    },
  ],
};
