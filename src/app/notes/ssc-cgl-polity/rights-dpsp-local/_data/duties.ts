import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PFR_DUTIES_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Duties",
  title: "Fundamental Duties",
  oneLineDefinition:
    "Where the Fundamental Duties came from and why they sit apart from the Rights, and the eleven duties of Article 51A, each with its clause letter.",
  whyItMatters:
    "Twenty questions in the bank: nine from the 2023 shifts and 11 from the 2024 shifts, 14 of them EASY. The 2024 shifts liked a small story (students writing on Humayun's Tomb, a flag used as a desk cover) and asked which duty applies, so learn each duty by the kind of act it covers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpfrfd-origin",
      name: "Origin and nature",
      intuition:
        "The duties were added in 1976, borrowed from the Soviet constitution, and placed in a Part of their own. The reason for the separate Part is the key fact: rights can be enforced in court, duties cannot.",
      definition:
        "The facts:\n" +
        "- Recommended by the **Swaran Singh Committee** and added by the **42nd Amendment (1976)** as **Part IV-A, Article 51A**: ten duties at first.\n" +
        "- The **86th Amendment (2002)** added the eleventh, **51A(k)**.\n" +
        "- Borrowed from the constitution of the **USSR**, the first to list such duties.\n" +
        "- Part III is **justiciable**; the duties are **not enforceable** in court, which is why they were not placed in Part III. Courts still take them into account.\n" +
        "- The **Justice Verma Committee** (1999) found existing laws that already give effect to some of the duties.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Recommended by", "Swaran Singh Committee"], pyqExampleId: "5595082d-ca32-44ac-b18d-93199d07b6ee" },
          { cells: ["Added by", "42nd Amendment, 1976"] },
          { cells: ["Where", "Part IV-A, Article 51A"], pyqExampleId: "cb7279d9-b922-4be0-bc23-554cc588a3d3" },
          { cells: ["Borrowed from", "USSR"], pyqExampleId: "fc91b246-0d60-4b23-b09d-283e9cafa036" },
          { cells: ["Eleventh duty added by", "86th Amendment, 2002"] },
        ],
      },
      pyqExampleId: "59941104-1931-4f02-a2a5-8fe7563ac785",
      selfCheckExample: {
        prompt: "Why were the Fundamental Duties not put in Part III with the Rights?",
        steps: ["Part III is justiciable: its rights can be enforced in court under Article 32.", "The duties cannot be enforced in court, so they were given a Part of their own, IV-A."],
        answer: "Because Part III is justiciable and the duties are not.",
      },
      practiceSet: [
        { prompt: "Which committee recommended the Fundamental Duties?", answer: "The Swaran Singh Committee" },
        { prompt: "Which country first put fundamental duties in its constitution?", answer: "The USSR" },
        { prompt: "Which amendment added the eleventh Fundamental Duty?", answer: "The 86th Amendment (2002)" },
        { prompt: "Which Article lists the Fundamental Duties?", answer: "Article 51A" },
      ],
      traps: [
        {
          title: "Sarkaria and Balwant Rai Mehta are decoys",
          body: "The duties came from the **Swaran Singh Committee**. **Sarkaria** studied Centre-State relations and **Balwant Rai Mehta** Panchayati Raj.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpfrfd-list",
      name: "The eleven duties",
      intuition:
        "Each duty covers one kind of act. When SSC tells a short story, ask what was harmed: the flag, the country, harmony, culture, nature, public property, or a child's schooling. The clause follows from that.",
      definition:
        "Article 51A, clause by clause:\n" +
        "- **(a)** abide by the Constitution and respect its ideals, the **National Flag** and the National Anthem.\n" +
        "- **(b)** cherish the ideals of the **freedom struggle**.\n" +
        "- **(c)** uphold the **sovereignty, unity and integrity** of India.\n" +
        "- **(d)** **defend the country** and render national service **when called upon**.\n" +
        "- **(e)** promote **harmony** and brotherhood across religion, language and region; respect the dignity of women.\n" +
        "- **(f)** value and preserve our **composite culture**.\n" +
        "- **(g)** protect and improve the **natural environment**.\n" +
        "- **(h)** develop the **scientific temper**, humanism and the spirit of inquiry.\n" +
        "- **(i)** safeguard **public property** and abjure violence.\n" +
        "- **(j)** strive towards **excellence**.\n" +
        "- **(k)** a parent or guardian to give a child aged **6 to 14** opportunities for **education**.\n\n" +
        "**Not** among the duties: voting, paying taxes, five years of compulsory national service.",
      table: {
        columns: ["Situation", "Duty"],
        rows: [
          { cells: ["The flag used as a table cover", "51A(a)"], pyqExampleId: "c81545f3-ab8c-4b8c-a24d-64f2e4d319bf" },
          { cells: ["Calming a quarrel over religious remarks", "51A(e)"], pyqExampleId: "b6aa8f2e-6b20-4a20-bb2a-d12f7ebb4a50" },
          { cells: ["Making compost for a park", "51A(g)"], pyqExampleId: "e97ac0c8-2540-4b62-b637-9e4838eb36f3" },
          { cells: ["Students defacing a monument", "51A(i)"], pyqExampleId: "a5decc77-8c36-465a-88bb-21ae0137cc5e" },
          { cells: ["A parent keeps a 10-year-old home instead of at school", "51A(k)"] },
        ],
      },
      pyqExampleId: "e6539a24-cbed-40bf-8aa9-d77aba5b3033",
      selfCheckExample: {
        prompt: "Which two of these are NOT Fundamental Duties: defending the country, paying income tax, voting in elections, protecting public property?",
        steps: ["Defending the country is 51A(d) and protecting public property is 51A(i).", "Paying tax and voting are not listed in Article 51A."],
        answer: "Paying income tax and voting.",
      },
      practiceSet: [
        { prompt: "Which clause of Article 51A is about the scientific temper?", answer: "51A(h)" },
        { prompt: "Which clause asks citizens to value and preserve the composite culture?", answer: "51A(f)" },
        { prompt: "Is voting a Fundamental Duty?", answer: "No" },
        { prompt: "What does 51A(d) ask of citizens?", answer: "To defend the country and render national service when called upon" },
      ],
      traps: [
        {
          title: "National service only when called upon",
          body: "51A(d) asks for national service **when called upon**. A duty of **five years' compulsory** service does not exist.",
        },
        {
          title: "The environment duty is general",
          body: "51A(g) asks citizens to **protect and improve the natural environment**. A duty to prohibit trade in endangered species is not in the list.",
        },
      ],
    },
  ],
};
