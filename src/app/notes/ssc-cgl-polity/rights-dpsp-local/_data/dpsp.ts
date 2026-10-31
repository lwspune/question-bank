import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PFR_DPSP_NOTE: SubtopicNote = {
  subtopicName: "Directive Principles of State Policy",
  title: "Directive Principles of State Policy",
  oneLineDefinition:
    "What the Directive Principles are and how they differ from Fundamental Rights, the Articles SSC names in Part IV, and the Uniform Civil Code of Article 44.",
  whyItMatters:
    "Nineteen questions in the bank: two from the 2023 shifts, 11 from the 2024 shifts and six from the 2025 shifts, 13 of them EASY. The 2024 shifts quoted a line of a Directive and asked its Article; the 2025 shifts asked about the Uniform Civil Code, which a State put into force that year.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpfrdp-nature",
      name: "What the Directive Principles are",
      intuition:
        "The Rights mostly stop the State from harming a person; the Directives ask the State to act for the community. One set can be taken to court, the other cannot. Most questions test exactly that contrast.",
      definition:
        "The facts:\n" +
        "- **Part IV**, Articles **36 to 51**, borrowed from **Ireland**. Their roots go back to the Congress's **Karachi Resolution (1931)**.\n" +
        "- **Article 37**: no court can enforce them (they are **non-justiciable**), but they are fundamental in governance and morally and politically binding.\n" +
        "- They are **positive** (they ask the State to act) and aim at **social and economic democracy**. They serve the **community**, so they are called socialistic; the Fundamental Rights serve the **individual**.\n" +
        "- **Ambedkar** called them a **novel feature** of the Constitution.\n" +
        "- In a conflict, Fundamental Rights generally prevail.",
      table: {
        columns: ["Feature", "Fundamental Rights", "Directive Principles"],
        rows: [
          { cells: ["Part", "III", "IV"], pyqExampleId: "9c078fd6-1c0f-43d1-b7f9-3ca1d6771e16" },
          { cells: ["Enforceable in court?", "Yes", "No (Article 37)"], pyqExampleId: "e5f400ec-ad55-483d-b7b1-d6c6f6025956" },
          { cells: ["Nature", "Mostly limits on the State", "Positive duties of the State"] },
          { cells: ["Serve", "The individual", "The community"], pyqExampleId: "060d2feb-5434-49f1-8565-104d14856fdd" },
        ],
      },
      pyqExampleId: "3cb6eac1-7712-4d7a-971e-07e4852acdfd",
      selfCheckExample: {
        prompt: "A statement says the Directive Principles are personal and individualistic. Is it right? Explain.",
        steps: ["Personal and individualistic describes the Fundamental Rights, which protect the individual.", "The Directive Principles promote the welfare of the community, so they are called societarian and socialistic."],
        answer: "No: that describes the Fundamental Rights.",
      },
      practiceSet: [
        { prompt: "Which Articles make up Part IV?", answer: "Articles 36 to 51" },
        { prompt: "Which Article says the Directive Principles are not enforceable by courts?", answer: "Article 37" },
        { prompt: "To which resolution can the Directive Principles be traced?", answer: "The Karachi Resolution of 1931" },
        { prompt: "How did Ambedkar describe the Directive Principles?", answer: "As a novel feature of the Constitution" },
      ],
      traps: [
        {
          title: "Non-justiciable, not unimportant",
          body: "The Directive Principles cannot be enforced in court, yet Article 37 calls them **fundamental in the governance** of the country. A statement calling them justiciable is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpfrdp-articles",
      name: "The Directive Articles SSC names",
      intuition:
        "SSC quotes a phrase from a Directive and asks its number. The Articles run in rough groups: the social order (38, 39), work and welfare (41 to 43), and specific goals (44 to 50).",
      definition:
        "The Articles:\n" +
        "- **38**: a social order for the **welfare of the people**.\n" +
        "- **39**: (a) adequate livelihood; **(b)** ownership of **material resources** distributed for the common good; (c) no concentration of wealth; (d) equal pay for equal work.\n" +
        "- **40**: organise **village panchayats** as units of self-government.\n" +
        "- **42**: just and humane conditions of work, maternity relief.\n" +
        "- **43**: a living wage, and **cottage industries** in rural areas.\n" +
        "- **44**: a **Uniform Civil Code**.\n" +
        "- **46**: educational and economic interests of **SCs, STs and weaker sections**.\n" +
        "- **48A**: protect the **environment, forests and wildlife**.\n" +
        "- **50**: separate the **judiciary from the executive**.\n\n" +
        "The **42nd Amendment (1976)** added **four**: 39(f), 39A (free legal aid), 43A (workers in management) and 48A.",
      table: {
        columns: ["Article", "Directs the State to"],
        rows: [
          { cells: ["38", "Secure a social order for the people's welfare"], pyqExampleId: "26bfc790-4b9c-452a-97f0-9c51b3ea6094" },
          { cells: ["39(b)", "Distribute material resources for the common good"], pyqExampleId: "38a43467-c53b-4208-bdbf-f2070f751abf" },
          { cells: ["40", "Organise village panchayats"], pyqExampleId: "be13552b-a2f8-429e-b03c-4d9a9141d684" },
          { cells: ["43", "Living wage; cottage industries"], pyqExampleId: "d767ab0c-004f-469a-b965-56ba1f8353b2" },
          { cells: ["46", "Advance SCs, STs and weaker sections"], pyqExampleId: "b760b7db-e6c1-41a4-bd74-9f5b4e2c5570" },
          { cells: ["48A", "Protect environment, forests and wildlife"], pyqExampleId: "b7f5eb2f-a6f5-4acf-a924-127ba2caf4a4" },
          { cells: ["50", "Keep the courts apart from the executive"] },
        ],
      },
      pyqExampleId: "51625ffd-ec4e-4b60-a64f-b1f9b7cf67ac",
      selfCheckExample: {
        prompt: "Which four Directives did the 42nd Amendment add, and which of them is about the environment?",
        steps: ["It added 39(f), 39A, 43A and 48A.", "Article 48A asks the State to protect the environment, forests and wildlife."],
        answer: "39(f), 39A, 43A and 48A; 48A is the environment.",
      },
      practiceSet: [
        { prompt: "Which Article directs the State to organise village panchayats?", answer: "Article 40" },
        { prompt: "Which Article asks for a Uniform Civil Code?", answer: "Article 44" },
        { prompt: "How many Directive Principles did the 42nd Amendment add?", answer: "Four" },
        { prompt: "Which Article asks the State to separate the judiciary from the executive?", answer: "Article 50" },
      ],
      traps: [
        {
          title: "39(b) and 39(c) are neighbours",
          body: "**39(b)** is about distributing **material resources** for the common good; **39(c)** is about preventing **concentration of wealth**. SSC offers both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpfrdp-ucc",
      name: "The Uniform Civil Code",
      intuition:
        "Personal matters such as marriage and inheritance are still governed by each religion's own law. Article 44 asks the State to replace them with one common law, and two States show what that looks like.",
      definition:
        "The facts:\n" +
        "- **Article 44**, a **Directive Principle**, asks the State to secure a **Uniform Civil Code** for all citizens.\n" +
        "- It would replace the separate **religious personal laws** on marriage, divorce, inheritance and adoption. Criminal law is already uniform.\n" +
        "- **Goa** has long had a common civil code, from the **Portuguese** Civil Code of 1867, applying to all communities.\n" +
        "- **Uttarakhand** passed its own code in 2024 and brought it into force in **January 2025**, the first State to enact and implement one.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Article", "44 (Directive Principle)"], pyqExampleId: "297d64ed-ceff-442d-b902-f2f7309aabfc" },
          { cells: ["Would replace", "Religious personal laws"], pyqExampleId: "5f1fcd22-b5ea-43e4-9e7d-30dc589238a1" },
          { cells: ["Goa's code comes from", "The Portuguese Civil Code of 1867"], pyqExampleId: "12af3d09-89f3-4eb1-aa80-bdbd7a20213f" },
        ],
      },
      pyqExampleId: "77bd16cc-a749-44cb-b4ae-23beecf3c2d5",
      selfCheckExample: {
        prompt: "Goa and Uttarakhand both have a common civil code. How did each get it?",
        steps: ["Goa inherited the Portuguese Civil Code of 1867 from colonial rule.", "Uttarakhand passed its own law in 2024 and put it into force in January 2025."],
        answer: "Goa inherited it; Uttarakhand enacted it.",
      },
      practiceSet: [
        { prompt: "In which Part of the Constitution is the Uniform Civil Code mentioned?", answer: "Part IV, the Directive Principles" },
        { prompt: "On which country's code is Goa's civil code based?", answer: "Portugal's" },
        { prompt: "Which kind of law would a Uniform Civil Code replace?", answer: "Religious personal laws on marriage, divorce and inheritance" },
      ],
      traps: [
        {
          title: "A Directive, not a Fundamental Right",
          body: "The Uniform Civil Code is in **Article 44**, a **Directive Principle**. A statement putting it among the Fundamental Rights is false.",
        },
      ],
    },
  ],
};
