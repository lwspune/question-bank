import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FR_DPSP_NOTE: SubtopicNote = {
  subtopicName: "Directive Principles and Fundamental Duties",
  title: "Directive Principles and Fundamental Duties",
  oneLineDefinition:
    "Part IV (Articles 36 to 51), the goals the State must follow but no court can enforce, and Part IVA (Article 51A), the eleven duties of every citizen.",
  whyItMatters:
    "11 CDS questions: 8 MODERATE, 2 HARD and 1 EASY. Three of the five duty questions give four items and ask which one is NOT a Fundamental Duty, and in two of them the odd item out is a Directive Principle. So the two lists are learnt together, each against the other.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolfr-dpsp",
      name: "Directive Principles of State Policy, Part IV",
      intuition:
        "The Fundamental Rights say what the State must not do to a person. The Directive Principles say what the State should do for the people: a living wage, legal aid, education, a healthy environment. They guide every government, but no court can order one to be carried out.",
      definition:
        "The rules:\n" +
        "- **Part IV, Articles 36 to 51**. The idea came from the Constitution of **Ireland**.\n" +
        "- **Article 37**: they are **not enforceable by any court**, yet they are **fundamental in the governance** of the country and the State must apply them in making laws.\n" +
        "- They aim at **social and economic democracy**, beside the political democracy the rights secure. Granville Austin called the rights and the Directive Principles together the **conscience of the Constitution**.\n" +
        "- Some ideas sit in both lists. **Education** is a right under Article 21A and a directive under Articles 41 and 45. The **right to work** (Article 41) is only a directive, never a Fundamental Right.\n" +
        "- After the 86th Amendment (2002), **Article 45** covers early childhood care and education for children **below six**.\n" +
        "- The Supreme Court has also told the police to inform the nearest **Legal Aid Committee** as soon as a person is arrested.",
      table: {
        columns: ["Article", "Directive"],
        rows: [
          {
            cells: ["39A", "Equal justice and free legal aid"],
            noteAmber: "CDS 2024 (I): legal aid is a Directive Principle.",
            pyqExampleId: "1fa7fcf9-9dd7-4d9c-bdae-c2c47c2abd68",
          },
          { cells: ["40", "Organise village panchayats"] },
          {
            cells: ["41", "Right to work, to education and to public assistance"],
            noteAmber: "CDS 2025 (I): the right to work is a Directive Principle only.",
            pyqExampleId: "5a9ea888-8504-43ea-aa2c-5ba593b354a5",
          },
          { cells: ["43", "A living wage; cottage industries in rural areas"] },
          { cells: ["43A", "Workers' participation in the management of industries"] },
          { cells: ["44", "A uniform civil code for citizens throughout India"] },
          { cells: ["45", "Early childhood care and education below age six"] },
          { cells: ["48A", "Protect the environment, forests and wildlife"] },
          { cells: ["50", "Separate the judiciary from the executive"] },
          {
            cells: ["51", "International peace and security; just and honourable relations between nations; respect for international law; settling disputes by arbitration"],
            noteAmber: "CDS 2023 (I): UN peacekeeping forces are not mentioned in Article 51.",
            pyqExampleId: "41ed66f1-3cb5-4fa0-ab4e-2495cafa46bf",
          },
        ],
        caption: "Part III rights can be taken to court; Part IV directives cannot (Article 37).",
      },
      pyqExampleId: "f72dad96-e806-46f0-bd8d-4cc73c1baf98",
      selfCheckExample: {
        prompt: "A citizen asks the High Court to order her State to separate the judiciary from the executive, relying on Article 50. Will the court order it?",
        steps: [
          "Article 50 is in Part IV, among the Directive Principles.",
          "Article 37 says no court can enforce a Directive Principle, though the State must apply it in making laws.",
        ],
        answer: "No. A Directive Principle cannot be enforced by a court.",
      },
      practiceSet: [
        { prompt: "Which Article asks the State to organise village panchayats?", answer: "Article 40" },
        { prompt: "Which Article mentions the right to work?", answer: "Article 41" },
        { prompt: "Which Article provides for free legal aid?", answer: "Article 39A" },
        { prompt: "From which country's Constitution did India take the idea of Directive Principles?", answer: "Ireland" },
        { prompt: "Which Article asks the State to promote international peace and security?", answer: "Article 51" },
      ],
      traps: [
        {
          title: "The right to work is not a Fundamental Right",
          body: "Education is both a right (Article 21A) and a directive (Article 41). The right to work is only in Article 41, a Directive Principle.",
        },
        {
          title: "The 86th Amendment put education among the rights",
          body: "The 86th Amendment made education a Fundamental Right (Article 21A) and changed Article 45 to cover children below six. It did not add education to the Directive Principles.",
        },
        {
          title: "Secularism is not universal",
          body: "Secularism is a basic feature of the Indian Constitution, not of every country's constitution. Many States have an official religion.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-duties",
      name: "Fundamental Duties, Part IVA",
      intuition:
        "The duties are the citizen's side of the bargain: respect the Constitution, defend the country, protect the environment, keep public property safe. They are a list of eleven, and CDS checks whether you can tell a real duty from a look-alike taken from the Directive Principles.",
      definition:
        "The facts:\n" +
        "- **Part IVA, Article 51A**, added by the **42nd Amendment (1976)** on the advice of the **Swaran Singh Committee**. It began with **ten** duties.\n" +
        "- The **86th Amendment (2002)** added the **eleventh**: a parent or guardian must give a child of **6 to 14** the chance of an education.\n" +
        "- The duties are for **citizens**; the Directive Principles are addressed to **the State**.\n" +
        "- The wording matters: the duty is to preserve our **composite culture**, and to develop the **scientific temper**, humanism and the spirit of inquiry and reform.",
      table: {
        columns: ["Clause of 51A", "Duty"],
        rows: [
          { cells: ["(a)", "Abide by the Constitution; respect its ideals, the National Flag and the National Anthem"] },
          { cells: ["(b)", "Cherish the noble ideals of the freedom struggle"] },
          { cells: ["(c)", "Uphold the sovereignty, unity and integrity of India"] },
          { cells: ["(d)", "Defend the country and render national service when called upon"] },
          { cells: ["(e)", "Promote harmony and brotherhood; renounce practices against the dignity of women"] },
          {
            cells: ["(f)", "Value and preserve the rich heritage of our composite culture"],
            noteAmber: "CDS 2022 (I): 'a unitary national culture' was the item that is not a duty.",
            pyqExampleId: "b0b9147e-c6d5-46fe-bdcb-de6475bbcf29",
          },
          { cells: ["(g)", "Protect and improve the natural environment; have compassion for living creatures"] },
          { cells: ["(h)", "Develop the scientific temper, humanism and the spirit of inquiry and reform"] },
          { cells: ["(i)", "Safeguard public property and abjure violence"] },
          { cells: ["(j)", "Strive towards excellence in individual and collective activity"] },
          {
            cells: ["(k)", "Parent or guardian to provide opportunities for education to a child of 6 to 14 (86th Amendment)"],
            pyqExampleId: "b06c8d15-7eb0-4815-933f-70375f057132",
          },
        ],
      },
      pyqExampleId: "6893781e-4ea9-43fb-a68c-4acbd580b5da",
      selfCheckExample: {
        prompt: "Which one of these is a Fundamental Duty: (a) separate the judiciary from the executive, (b) strive towards excellence in individual and collective activity, (c) secure a uniform civil code?",
        steps: [
          "(a) is Article 50 and (c) is Article 44, both Directive Principles addressed to the State.",
          "(b) is clause (j) of Article 51A.",
        ],
        answer: "(b) Strive towards excellence.",
      },
      practiceSet: [
        { prompt: "Which amendment added the Fundamental Duties to the Constitution?", answer: "The 42nd Amendment (1976)" },
        { prompt: "How many Fundamental Duties are there now?", answer: "Eleven" },
        { prompt: "Which committee recommended adding Fundamental Duties?", answer: "The Swaran Singh Committee" },
        { prompt: "Is promoting village and cottage industries a Fundamental Duty?", answer: "No. It is a Directive Principle (Article 43)" },
      ],
      traps: [
        {
          title: "Composite culture, not unitary culture",
          body: "Article 51A(f) asks citizens to preserve the rich heritage of our **composite** culture. 'A unitary national culture' is the opposite idea.",
        },
        {
          title: "51 is a directive, 51A is a duty",
          body: "Promoting international peace and security is Article 51, the last Directive Principle. The duties start at Article 51A.",
        },
        {
          title: "The education duty came last",
          body: "The duty of a parent to educate a child of 6 to 14 was added in 2002 by the 86th Amendment, not in 1976 with the first ten.",
        },
      ],
    },
  ],
};
