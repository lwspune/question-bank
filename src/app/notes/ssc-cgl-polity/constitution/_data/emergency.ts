import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PCO_EMERGENCY_NOTE: SubtopicNote = {
  subtopicName: "Emergency Provisions",
  title: "Emergency Provisions",
  oneLineDefinition:
    "Part XVIII's three emergencies (for the country, for one State, and for the nation's finances): their Articles, how soon Parliament must approve each, and what each lets the Union do.",
  whyItMatters:
    "Ten questions in the bank: two from the 2024 shifts and eight from the 2025 shifts, nine of them EASY. They ask an Article number or a time limit, so a three-row table of Articles and deadlines answers nearly all of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpcoem-national",
      name: "National Emergency and President's Rule",
      intuition:
        "Two emergencies hand power to the Union: one for the whole country under threat, one for a single State whose government has failed. Each needs Parliament's approval within a deadline, and the deadlines differ.",
      definition:
        "**National Emergency (Art 352)**: on war, external aggression or armed rebellion.\n" +
        "- Both Houses must approve it within **one month** (two months before the 44th Amendment of 1978). Once approved it lasts six months and can be extended.\n" +
        "- **Art 250**: while it lasts, Parliament may make laws on **State List** subjects.\n" +
        "- **Art 359**: the enforcement of Fundamental Rights may be suspended, **except Articles 20 and 21**.\n\n" +
        "**President's Rule (Art 356)**: when the constitutional machinery of a State fails, usually on the Governor's report.\n" +
        "- The President takes over the State government's functions; the State legislature's powers pass to **Parliament**.\n" +
        "- Both Houses must approve it within **two months**.\n" +
        "- It is called the most controversial Article of the Constitution.",
      table: {
        columns: ["Emergency", "Article", "Parliament must approve within"],
        rows: [
          { cells: ["National Emergency", "352", "One month"], pyqExampleId: "f972e3fd-4c0d-456f-94a3-07a836112363" },
          { cells: ["President's Rule in a State", "356", "Two months"], pyqExampleId: "d2072f1a-9275-4b83-9825-f63851af83b1" },
          { cells: ["Financial Emergency", "360", "Two months"] },
        ],
      },
      pyqExampleId: "7eed06ae-5adf-4a75-ba8c-699807dd812b",
      selfCheckExample: {
        prompt: "During a National Emergency, which Fundamental Rights stay enforceable, and since which amendment?",
        steps: ["Articles 20 and 21 cannot be suspended, even in a National Emergency.", "This protection was added by the 44th Amendment (1978)."],
        answer: "Articles 20 and 21; since the 44th Amendment.",
      },
      practiceSet: [
        { prompt: "Which Article provides for President's Rule in a State?", answer: "Article 356" },
        { prompt: "Within how long must Parliament approve a National Emergency?", answer: "One month" },
        { prompt: "Which Article lets Parliament legislate on State List subjects during a National Emergency?", answer: "Article 250" },
        { prompt: "Who exercises a State legislature's powers during President's Rule?", answer: "Parliament" },
      ],
      traps: [
        {
          title: "One month for 352, two for 356",
          body: "A **National Emergency** needs approval within **one month**; **President's Rule** within **two months**. SSC swaps them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpcoem-financial",
      name: "Financial Emergency",
      intuition:
        "The third emergency has never been used. SSC asks its Article, who declares it, and the one striking power it gives: cutting the salaries of judges.",
      definition:
        "**Financial Emergency (Art 360)**:\n" +
        "- Declared by the **President** when India's financial stability or credit is under threat.\n" +
        "- The President may order **cuts in the salaries** of Union employees, including **judges of the Supreme Court and High Courts**.\n" +
        "- It has **never been declared**, not even in the crisis of 1991.\n\n" +
        "Do not mix it with **Article 365**, which deals with a State failing to follow the Union's directions.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Article", "360"], pyqExampleId: "68c88f5f-6fd4-4bca-ab5e-4ca787522baa" },
          { cells: ["Declared by", "The President"] },
          { cells: ["Can cut judges' salaries?", "Yes, on the President's direction"], pyqExampleId: "1846f7c6-8abe-4615-8f92-08e9732dcf20" },
          { cells: ["Ever declared?", "Never"] },
        ],
      },
      pyqExampleId: "73e005d9-8bf9-4be1-86d7-7d216c902beb",
      selfCheckExample: {
        prompt: "Name the three emergencies by Article, from the one for the whole country to the one about money.",
        steps: ["Article 352 is the National Emergency, and Article 356 President's Rule in a State.", "Article 360 is the Financial Emergency."],
        answer: "352 National, 356 President's Rule, 360 Financial.",
      },
      practiceSet: [
        { prompt: "Who can reduce the salaries of judges during a Financial Emergency?", answer: "The President" },
        { prompt: "Has India ever declared a Financial Emergency?", answer: "No" },
        { prompt: "What does Article 365 deal with?", answer: "A State's failure to comply with the Union's directions" },
      ],
      traps: [
        {
          title: "1991 was a crisis, not an emergency",
          body: "India faced a financial crisis in **1991** but **no Financial Emergency** was declared. A statement saying otherwise is false.",
        },
      ],
    },
  ],
};
