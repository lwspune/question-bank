import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FR_RIGHTS_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Rights and Directive Principles",
  title: "Fundamental Rights and Directive Principles",
  oneLineDefinition:
    "The six Fundamental Rights of Part III with their article numbers, the Right to Property that left that list, and the Directive Principles of Part IV that guide the government but cannot be enforced in court.",
  whyItMatters:
    "Six questions in the bank: four EASY, one MODERATE and one HARD, the HARD one from the 2022 paper. Most give a right or a line from an article and ask which group it belongs to, or give a group and ask its articles. Learn the six groups with their article ranges and the exceptions take care of themselves.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spifrri-rights",
      name: "The six Fundamental Rights and their articles",
      intuition:
        "Fundamental Rights are promises the Constitution makes to every person against the government, and a citizen can go to court if one is broken. " +
        "They sit in Part III and fall into six groups, each a block of articles in a fixed order.",
      definition:
        "- **Right to Equality (Articles 14 to 18)**: equality before law; no discrimination on grounds of religion, race, caste, sex or place of birth; equal chance in government jobs; untouchability abolished; titles abolished.\n" +
        "- **Right to Freedom (Articles 19 to 22)**: freedom of speech and expression, to **assemble peacefully without arms**, to form associations, to move and live anywhere in India, and to follow any profession; protection of life and personal liberty (Article 21); free education for children of 6 to 14 (Article 21A).\n" +
        "- **Right against Exploitation (Articles 23 and 24)**: no trafficking or forced labour; no child below 14 in a factory, mine or hazardous work.\n" +
        "- **Right to Freedom of Religion (Articles 25 to 28)**: to profess, practise and spread one's religion; the State has no religion of its own.\n" +
        "- **Cultural and Educational Rights (Articles 29 and 30)**: minorities may keep their language and culture and run their own schools.\n" +
        "- **Right to Constitutional Remedies (Article 32)**: the right to go to the Supreme Court when a right is broken. Dr Ambedkar called it the heart and soul of the Constitution.\n" +
        "- The rights to equality and freedom of religion are what make the Constitution **non-discriminatory and secular**.\n" +
        "- Even these freedoms have limits: a citizen may criticise the government or campaign peacefully to change it, but there is **no freedom to take part in armed revolt**.",
      table: {
        columns: ["Right", "Articles", "Example"],
        rows: [
          { cells: ["Right to Equality", "14 to 18", "Untouchability abolished (Article 17)"] },
          { cells: ["Right to Freedom", "19 to 22", "Assemble peacefully **without arms**"] },
          { cells: ["Right against Exploitation", "23 and 24", "No child below 14 in a factory or mine"] },
          { cells: ["Right to Freedom of Religion", "25 to 28", "Profess, practise and spread any religion"] },
          { cells: ["Cultural and Educational Rights", "**29 and 30**", "Minorities may run their own schools"] },
          { cells: ["Right to Constitutional Remedies", "32", "Go to the Supreme Court for a broken right"] },
        ],
      },
      selfCheckExample: {
        prompt: "Untouchability is abolished by the Constitution. Under which Fundamental Right does this fall?",
        steps: ["Abolishing untouchability makes all people equal in society.", "It is Article 17, inside Articles 14 to 18."],
        answer: "The Right to Equality",
      },
      practiceSet: [
        { prompt: "Which articles of the Constitution contain the Right to Freedom of Religion?", answer: "Articles 25 to 28" },
        { prompt: "Which Fundamental Right lets a citizen go to the Supreme Court when another right is broken?", answer: "The Right to Constitutional Remedies (Article 32)" },
        { prompt: "Which articles hold the Right to Equality?", answer: "Articles 14 to 18" },
        { prompt: "Under which Fundamental Right may a minority set up and run its own school?", answer: "Cultural and Educational Rights" },
        { prompt: "Does the Right to Freedom protect a meeting where people carry arms?", answer: "No. It protects only peaceful assembly without arms" },
        { prompt: "Which article gives children of 6 to 14 the right to free education?", answer: "Article 21A" },
      ],
      pyqExampleId: "81d9aab7-f290-4e6a-b9c1-06b40e9f5cf6",
      traps: [
        {
          title: "The four article ranges in a row",
          body:
            "Freedom is 19 to 22, Exploitation 23 and 24, Religion 25 to 28, Cultural and Educational 29 and 30. Options often print all four ranges, so learn the order of the groups, not single numbers.",
        },
        {
          title: "Criticism is allowed, armed revolt is not",
          body:
            "A citizen may criticise the government, oppose a law peacefully and start a movement to change the government. Taking part in an armed revolution is not a freedom any citizen has.",
        },
        {
          title: "Child labour is exploitation, not equality",
          body:
            "The ban on employing children below 14 in factories, mines and hazardous work is Article 24, part of the Right against Exploitation.",
        },
        {
          title: "Secular does not mean against religion",
          body:
            "A secular State has no religion of its own and treats every religion equally. Every person may still profess, practise and spread a religion under Articles 25 to 28.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spifrri-dpsp",
      name: "The Right to Property and the Directive Principles",
      intuition:
        "Not every promise in the Constitution is a Fundamental Right. The Right to Property was moved out of the list, and the Directive Principles are goals the government should follow, which no court can force it to meet.",
      definition:
        "- The **Right to Property** was a Fundamental Right until the **44th Amendment (1978)** removed it. It is now a **constitutional (legal) right** under **Article 300A**.\n" +
        "- The **Directive Principles of State Policy** are in **Part IV**, **Articles 36 to 51**. The idea was taken from the Constitution of **Ireland**.\n" +
        "- They are **not enforceable in a court**, but the government is to apply them in making laws.\n" +
        "- The **Fundamental Duties** are in **Article 51A** (Part IVA), added by the **42nd Amendment (1976)**.",
      table: {
        columns: ["Article", "Directive Principle"],
        rows: [
          { cells: ["40", "Organise village panchayats"] },
          { cells: ["43", "A living wage for workers"] },
          { cells: ["44", "A uniform civil code for all citizens"] },
          { cells: ["47", "Better nutrition and public health; prohibition of harmful drinks and drugs"] },
          { cells: ["48A", "Protect the environment, forests and wildlife"] },
          { cells: ["50", "Separate the judiciary from the executive"] },
          { cells: ["51", "Promote international peace and security; the last article of Part IV"] },
        ],
        caption: "Part III (Fundamental Rights) can be enforced in court; Part IV (Directive Principles, Articles 36 to 51) cannot.",
      },
      selfCheckExample: {
        prompt: "Which Directive Principle asks the State to organise village panchayats?",
        steps: ["The Directive Principles run from Article 36 to 51.", "Village panchayats are in Article 40."],
        answer: "Article 40",
      },
      practiceSet: [
        { prompt: "In which Part of the Constitution are the Directive Principles of State Policy?", answer: "Part IV (Articles 36 to 51)" },
        { prompt: "From which country's Constitution did India take the idea of Directive Principles?", answer: "Ireland" },
        { prompt: "Can a citizen go to court to enforce a Directive Principle?", answer: "No. Directive Principles are not enforceable in court" },
        { prompt: "Which article asks the State to separate the judiciary from the executive?", answer: "Article 50" },
        { prompt: "In which article are the Fundamental Duties listed?", answer: "Article 51A" },
      ],
      pyqExampleId: "5851e968-5045-4395-a37d-a996cd3912f4",
      traps: [
        {
          title: "Property is no longer a Fundamental Right",
          body:
            "Since the 44th Amendment of 1978 the Right to Property is a constitutional right under Article 300A, not a Fundamental Right. A question asking which right is only a constitutional right wants property.",
        },
        {
          title: "No single article holds all the Directive Principles",
          body:
            "The Directive Principles fill Articles 36 to 51. Article 51 is the last of them, on international peace, and Article 51A is the Fundamental Duties, not a Directive Principle.",
        },
        {
          title: "Goals, not rights you can take to court",
          body:
            "A Directive Principle such as a living wage (Article 43) cannot be enforced by a court. When a question asks which can be enforced by the courts, the answer is a Fundamental Right.",
        },
      ],
    },
  ],
};
