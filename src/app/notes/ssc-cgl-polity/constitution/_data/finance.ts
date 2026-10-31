import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PCO_FINANCE_NOTE: SubtopicNote = {
  subtopicName: "Centre-State Finance and GST",
  title: "Centre-State Finance and GST",
  oneLineDefinition:
    "Who may make GST laws, how the GST Council votes, and the Articles that decide who levies, collects and keeps each tax, plus the Finance Commission and State borrowing.",
  whyItMatters:
    "Eleven questions in the bank, and ten of them come from the 2025 shifts; ten are MODERATE or HARD. They are Article-number questions with statements that swap the Union and the States, so learn each Article as who levies, who collects and who keeps.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpcofi-gst",
      name: "GST and the GST Council",
      intuition:
        "GST is the one tax both Parliament and the States make laws on, so it needed a shared council. Learn who may legislate and how the Council's votes are weighted: the Centre holds one-third, the States two-thirds.",
      definition:
        "The **101st Amendment (2016)** brought in GST:\n" +
        "- **Article 246A**: **both Parliament and the State legislatures** may make laws on GST. The States legislate on **supply within the State**; **inter-State** supply is for Parliament alone.\n" +
        "- **Article 279A**: the **GST Council**, a constitutional body of the Union Finance Minister and the States' finance ministers.\n" +
        "- **Voting** (279A(9)): a decision needs **three-fourths of the weighted votes** of members present and voting. The **Centre's vote weighs one-third** and **all the States together two-thirds**, so the States together weigh **twice** the Centre.\n" +
        "- The Council's recommendations are **persuasive, not binding** (Supreme Court, 2022).",
      table: {
        columns: ["Rule", "Answer"],
        rows: [
          { cells: ["Who may make GST laws", "Parliament and the State legislatures (Art 246A)"], pyqExampleId: "2731dc3f-7171-491b-9c3b-9d95178903bb" },
          { cells: ["GST Council created by", "Article 279A"], pyqExampleId: "33171c76-baba-4120-a8cb-ff6e37bb15ef" },
          { cells: ["Majority for a decision", "Three-fourths of weighted votes"] },
          { cells: ["Weight of votes", "Centre one-third, States two-thirds"], pyqExampleId: "490f8512-061c-47e8-adde-6f8c6f3becb7" },
          { cells: ["Are its recommendations binding?", "No, persuasive"], pyqExampleId: "3b4aab64-680e-4a0c-a02a-ba043b03dba6" },
        ],
      },
      pyqExampleId: "0073a065-a68f-42c7-818b-c33daa446b85",
      selfCheckExample: {
        prompt: "Can the Centre carry a GST Council decision with its own vote plus one State's?",
        steps: [
          "The Centre's vote weighs one-third of the votes cast, short of the three-fourths needed.",
          "One State adds only a small share of the States' two-thirds, so the decision still falls short.",
        ],
        answer: "No: a decision needs three-fourths of the weighted votes, which needs most of the States.",
      },
      practiceSet: [
        { prompt: "Which Article gives both Parliament and the States power to make GST laws?", answer: "Article 246A" },
        { prompt: "Which amendment introduced GST?", answer: "The 101st Amendment (2016)" },
        { prompt: "What share of the GST Council's voting weight do the States hold together?", answer: "Two-thirds" },
        { prompt: "Who alone may make laws on inter-State supply under GST?", answer: "Parliament" },
      ],
      traps: [
        {
          title: "Article 246A is shared, not exclusive",
          body: "A statement that Article 246A gives **Parliament exclusive** power over GST is false. The **States** legislate on supply within the State.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpcofi-taxes",
      name: "Who levies, collects and keeps each tax",
      intuition:
        "Each tax Article answers three questions: who imposes the tax, who collects it, and who keeps the money. Learn the few Articles SSC asks about by those three answers.",
      definition:
        "The Articles:\n" +
        "- **Article 268**: duties **levied by the Union but collected and kept by the States**: the **stamp duties** in the Union List.\n" +
        "- **Article 270**: taxes levied and collected by the Union and **shared** with the States. Since the 101st Amendment it covers **GST** collected by the Union too. Cesses and surcharges for a special purpose, such as the GST compensation cess, are **not** shared under it.\n" +
        "- **Taxes on railway fares and freights** go to the **Union**.\n" +
        "- **Article 286**: limits a State's power to tax sales that happen **outside the State** or in the course of import or export.\n" +
        "- **Article 293**: a State may borrow only **within India**, and needs the **Centre's consent** while it still owes the Centre money. Foreign loans for States come only through or with the Union's approval.\n\n" +
        "**Finance Commission**: a chairman and **four** members. **Article 280** sets it up; **Article 281** lays its recommendations before Parliament. Its advice is not binding.",
      table: {
        columns: ["Article", "Subject"],
        rows: [
          { cells: ["268", "Union levies, States collect and keep (stamp duties)"] },
          { cells: ["270", "Union taxes shared with States, including GST"], pyqExampleId: "d9ebad47-f9b2-4a1a-8682-ac3b51c07619" },
          { cells: ["280", "Finance Commission set up"], pyqExampleId: "07af71e8-d05f-4071-aeb0-b825d7602cf3" },
          { cells: ["286", "Limits on State taxes on inter-State trade"], pyqExampleId: "b483ab73-95e4-457b-9475-178be4ae9da5" },
          { cells: ["293", "State borrowing"], pyqExampleId: "d2d376c3-0452-4b21-9666-c2d9385c812f" },
        ],
      },
      pyqExampleId: "9b83c9a9-4427-47d2-800f-09f9fe961c4e",
      selfCheckExample: {
        prompt: "A State still owes the Centre money and wants a new loan from a bank in India. Can it borrow on its own?",
        steps: ["Article 293 lets a State borrow within India.", "But while any loan from the Centre is outstanding, it needs the Centre's consent."],
        answer: "No: it needs the Centre's consent while the earlier loan is outstanding.",
      },
      practiceSet: [
        { prompt: "How many members does the Finance Commission have besides its chairman?", answer: "Four" },
        { prompt: "Which Article lays the Finance Commission's recommendations before Parliament?", answer: "Article 281" },
        { prompt: "To which government do taxes on railway fares and freights go?", answer: "The Union" },
        { prompt: "Which Article restricts States from taxing inter-State trade?", answer: "Article 286" },
      ],
      traps: [
        {
          title: "Article 280 sets up, 281 reports",
          body: "**Article 280** constitutes the Finance Commission; its recommendations are dealt with in **Article 281**. A statement that 280 is about the recommendations is false.",
        },
      ],
    },
  ],
};
