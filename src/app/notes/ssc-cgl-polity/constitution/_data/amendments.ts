import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PCO_AMENDMENTS_NOTE: SubtopicNote = {
  subtopicName: "Constitutional Amendments",
  title: "Constitutional Amendments",
  oneLineDefinition:
    "The 42nd Amendment and everything it added, and the other amendments SSC asks about by number: the 43rd, 44th, 86th, 101st and a few more.",
  whyItMatters:
    "Fifteen questions in the bank: seven from the 2023 shifts, three from the 2024 shifts and five from the 2025 shifts, and 12 of them EASY. Eight of the fifteen are about the 42nd Amendment alone, so learn its list of changes first; the others ask one amendment for one change.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpcoam-fortysecond",
      name: "The 42nd Amendment (1976)",
      intuition:
        "The 42nd Amendment, passed during the Emergency, changed so much that it is called the Mini-Constitution. When an SSC option says 42nd, it is right more often than not, so know exactly what it did.",
      definition:
        "The **42nd Amendment Act, 1976**, the **Mini-Constitution**, on the advice of the **Swaran Singh Committee**:\n" +
        "- Added **Fundamental Duties**: a new **Part IV-A** (Article **51A**) with ten duties.\n" +
        "- Added the words **Socialist, Secular** and **Integrity** to the Preamble.\n" +
        "- Added four Directive Principles: **39(f)** (children), **39A** (free legal aid), **43A** (workers in management) and **48A** (environment and wildlife).\n" +
        "- Moved **education**, forests, weights and measures, wild animals and the administration of justice out of the State List and into the **Concurrent List**.\n" +
        "- Inserted Article **131A** (the Supreme Court alone to judge central laws), which the **43rd Amendment (1977)** removed.",
      table: {
        columns: ["Change", "Detail"],
        rows: [
          { cells: ["Fundamental Duties", "Part IV-A, Article 51A"], pyqExampleId: "6aa86b10-2b7f-44ed-922b-51f8a4e7c5c5" },
          { cells: ["New Directive Principles", "39(f), 39A, 43A, 48A"], pyqExampleId: "896dfb2a-70e5-4959-b222-41af692174a3" },
          { cells: ["Education moved", "State List to Concurrent List"], pyqExampleId: "0533d368-d148-4256-8fa7-8a751d40eb50" },
          { cells: ["Preamble", "Socialist, Secular, Integrity added"] },
        ],
      },
      pyqExampleId: "741b389f-6c5e-4b34-8411-2da480a69294",
      selfCheckExample: {
        prompt: "Name the committee behind the 42nd Amendment and the Part it added to the Constitution.",
        steps: ["The Swaran Singh Committee recommended the Fundamental Duties.", "The amendment added them as Part IV-A, Article 51A."],
        answer: "The Swaran Singh Committee; Part IV-A (Article 51A).",
      },
      practiceSet: [
        { prompt: "Which amendment added the Fundamental Duties?", answer: "The 42nd Amendment, 1976" },
        { prompt: "In which list has education been placed since the 42nd Amendment?", answer: "The Concurrent List" },
        { prompt: "Which three words did the 42nd Amendment add to the Preamble?", answer: "Socialist, Secular and Integrity" },
        { prompt: "Which amendment removed Article 131A?", answer: "The 43rd Amendment (1977)" },
      ],
      traps: [
        {
          title: "Article 131A was for the Supreme Court",
          body: "Article 131A gave the **Supreme Court**, not the High Courts, sole power over the validity of central laws. The **43rd Amendment** took it out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpcoam-others",
      name: "Other amendments to remember",
      intuition:
        "Beyond the 42nd, SSC asks a short list of amendments, each for one change. Learn the number and the change as a pair.",
      definition:
        "The amendments:\n" +
        "- **44th (1978)**: took the **right to property** out of Part III and made it an ordinary legal right (**Article 300A**). It also made sure Articles 20 and 21 cannot be suspended in an emergency.\n" +
        "- **52nd (1985)**: anti-defection law (Tenth Schedule).\n" +
        "- **73rd (1992)**: Panchayati Raj.\n" +
        "- **86th (2002)**: **Article 21A**: every child aged **6 to 14** gets a Fundamental Right to free, compulsory schooling.\n" +
        "- **97th (2011)**: co-operative societies (Part IXB).\n" +
        "- **101st (2016)**: **GST** and the **GST Council** (Article 279A).\n" +
        "- **102nd**: made the National Commission for Backward Classes a constitutional body. **103rd**: the **10% EWS** reservation.\n\n" +
        "On the amending process itself, **K. C. Wheare** wrote that 'this variety in the amending process is wise but is rarely found'.",
      table: {
        columns: ["Amendment", "Year", "Change"],
        rows: [
          { cells: ["44th", "1978", "Right to property made a legal right"], pyqExampleId: "50e5807f-8c39-4f31-82d2-d5692b8b48bc" },
          { cells: ["86th", "2002", "Right to education (Article 21A)"], pyqExampleId: "8e274e5d-1f08-4da7-b8db-993f8ce63110" },
          { cells: ["101st", "2016", "GST and the GST Council"], pyqExampleId: "d69d2f5c-c373-41af-9505-6a5a331122fa" },
          { cells: ["43rd", "1977", "Removed Article 131A"], pyqExampleId: "6d756893-d9d0-4251-a8b8-0bf26e9b85f3" },
          { cells: ["103rd", "2019", "10% EWS reservation"] },
        ],
      },
      pyqExampleId: "4c85af1f-d022-4779-9da9-c2cfa94cff95",
      selfCheckExample: {
        prompt: "Two amendments are confused in questions on property and education. Which did each?",
        steps: ["The 44th Amendment (1978) removed the right to property from the Fundamental Rights.", "The 86th Amendment (2002) made education a Fundamental Right under Article 21A."],
        answer: "44th: property; 86th: education.",
      },
      practiceSet: [
        { prompt: "Which Article now holds the right to property?", answer: "Article 300A" },
        { prompt: "Which amendment created the GST Council?", answer: "The 101st Amendment (2016)" },
        { prompt: "For which age group does Article 21A guarantee free education?", answer: "6 to 14 years" },
        { prompt: "Who said 'this variety in the amending process is wise but is rarely found'?", answer: "K. C. Wheare" },
      ],
      traps: [
        {
          title: "Property is a legal right, not abolished",
          body: "The 44th Amendment did not abolish the right to property; it moved it to **Article 300A** as a **legal** right.",
        },
      ],
    },
  ],
};
