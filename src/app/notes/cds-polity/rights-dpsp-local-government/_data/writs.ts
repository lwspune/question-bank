import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FR_WRITS_NOTE: SubtopicNote = {
  subtopicName: "Writs and Constitutional Remedies",
  title: "Writs and Constitutional Remedies",
  oneLineDefinition:
    "Article 32, the right to go to the Supreme Court when a Fundamental Right is broken, how it differs from a High Court's power under Article 226, and the five writs the courts issue.",
  whyItMatters:
    "7 CDS questions: 3 EASY, 2 MODERATE and 2 HARD. Habeas corpus has been asked twice in almost the same words, in CDS 2022 (I) and 2026 (II). The writ questions give a job (quash an order, free a prisoner) and ask for its name, so learn each writ by what it does.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolfr-article32",
      name: "Article 32 and Article 226",
      intuition:
        "A right is only as good as the remedy behind it. Article 32 makes the remedy itself a Fundamental Right: any person may go straight to the Supreme Court. The High Courts have a similar but wider power under Article 226.",
      definition:
        "The points CDS tests:\n" +
        "- **Article 32** is in **Part III**, so the right to move the Supreme Court is itself a Fundamental Right. Dr **B. R. Ambedkar** called it the **heart and soul** of the Constitution.\n" +
        "- Article 32 can be used **only to enforce Fundamental Rights**. A claim under ordinary law goes to a High Court or another court.\n" +
        "- **Article 32(3)**: Parliament may by law let any other court issue these writs within its local limits.\n" +
        "- **Article 226** lets a High Court issue writs for Fundamental Rights **and for any other purpose**, so the **High Court's writ power is wider** than the Supreme Court's.",
      table: {
        columns: ["Point", "Article 32", "Article 226"],
        rows: [
          { cells: ["Court", "Supreme Court", "High Court"] },
          { cells: ["Place in the Constitution", "Part III, so it is itself a Fundamental Right", "Part VI, a power of the High Courts"] },
          {
            cells: ["Can be used for", "Fundamental Rights only", "Fundamental Rights and any other legal right"],
            noteAmber: "CDS 2021 (II): 'the writ jurisdiction of High Courts is wider than the Supreme Court's' was a correct statement.",
            pyqExampleId: "9fc243e3-2b25-4c9b-9a87-c3ea64d8075d",
          },
        ],
      },
      pyqExampleId: "ab3333ca-a6be-43c4-a73b-cf694d343f81",
      selfCheckExample: {
        prompt: "A student's admission is cancelled in breach of a university's own rules, and no Fundamental Right is involved. Can she use Article 32, or must she use Article 226?",
        steps: [
          "Article 32 can enforce only Fundamental Rights.",
          "Article 226 also covers any other legal right.",
        ],
        answer: "Article 226, before the High Court.",
      },
      practiceSet: [
        { prompt: "Under which Article does a High Court issue writs?", answer: "Article 226" },
        { prompt: "In which Part of the Constitution is Article 32?", answer: "Part III, the Fundamental Rights" },
        { prompt: "Which clause of Article 32 lets Parliament empower other courts to issue writs?", answer: "Article 32(3)" },
        { prompt: "Can Article 32 be used to enforce a right that comes only from an ordinary law?", answer: "No. It enforces Fundamental Rights only" },
      ],
      traps: [
        {
          title: "The High Court's writ power is the wider one",
          body: "The Supreme Court under Article 32 enforces Fundamental Rights only. A High Court under Article 226 can issue writs for any other purpose too.",
        },
        {
          title: "Heart and soul is Article 32",
          body: "Ambedkar's phrase was for Article 32, the right to constitutional remedies, not Article 21 or any other right.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-writs",
      name: "The five writs",
      intuition:
        "Each writ is a Latin name for one job. Habeas corpus frees a person held without legal cause, mandamus makes an official do a duty, prohibition stops a lower court before it acts, certiorari undoes what a lower court has done, and quo warranto removes a person from an office he has no right to hold.",
      definition:
        "The five writs:\n" +
        "- **Habeas corpus** (you may have the body): the detained person must be produced so the court can test the detention.\n" +
        "- **Mandamus** (we command): orders a public official or body to do a public duty it has failed to do.\n" +
        "- **Prohibition** (to forbid): stops a lower court or tribunal from going on with a case **still pending** beyond its powers.\n" +
        "- **Certiorari** (to be certified): **quashes an order already passed** by a lower court or tribunal, or moves the case up.\n" +
        "- **Quo warranto** (by what authority): asks a person holding a public office by what right he holds it. The office must be **public**, created by **a statute or the Constitution**, **substantive** (an independent office, not a servant's post), and held **against the law**.",
      table: {
        columns: ["Writ", "Meaning", "What it does"],
        rows: [
          {
            cells: ["Habeas corpus", "You may have the body", "Produce a detained person so the court can test the detention"],
            noteAmber: "Asked twice: CDS 2022 (I) and CDS 2026 (II).",
            pyqExampleId: "b83e6f85-4826-4d89-a24b-4b49816d8a40",
          },
          { cells: ["Mandamus", "We command", "Make a public official do a public duty"] },
          { cells: ["Prohibition", "To forbid", "Stop a lower court from going on with a pending case"] },
          { cells: ["Certiorari", "To be certified", "Quash an order a lower court has already passed"] },
          {
            cells: ["Quo warranto", "By what authority", "Remove a person from a public office he holds against the law"],
            noteAmber: "CDS 2020 (II): the office must be substantive, so 'must not be substantive' is not a condition.",
            pyqExampleId: "91849e44-5e9c-43c9-a7ce-0453b3b937c7",
          },
        ],
      },
      pyqExampleId: "146c95a1-6d74-4969-b701-b5c0d4cb08c6",
      selfCheckExample: {
        prompt: "A municipal officer refuses to issue a trade licence that the law says he must issue. Which writ will the High Court use?",
        steps: [
          "The officer has a public duty and has failed to do it.",
          "The writ that orders an official to do a public duty is mandamus.",
        ],
        answer: "Mandamus",
      },
      practiceSet: [
        { prompt: "Which writ means 'we command'?", answer: "Mandamus" },
        { prompt: "Which writ asks a person by what authority he holds a public office?", answer: "Quo warranto" },
        { prompt: "Which writ is used to free a person held without legal cause?", answer: "Habeas corpus" },
        { prompt: "Which writ stops a lower court from continuing a case it has no power to hear?", answer: "Prohibition" },
      ],
      traps: [
        {
          title: "Prohibition stops, certiorari undoes",
          body: "Prohibition is issued while the case is still pending. Once the lower court has passed its order, the writ to quash it is certiorari.",
        },
        {
          title: "Quo warranto needs a substantive public office",
          body: "The office must be public, created by law or the Constitution, and substantive. A private post or a servant's post under another officer does not qualify.",
        },
      ],
    },
  ],
};
