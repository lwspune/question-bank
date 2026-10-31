import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PFR_RIGHTS_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Rights",
  title: "Fundamental Rights",
  oneLineDefinition:
    "The six groups of Fundamental Rights in Part III, the Article for each right SSC asks about, the right to constitutional remedies, and the court doctrines that shape them.",
  whyItMatters:
    "Twenty questions in the bank: 12 from the 2023 shifts, three from the 2024 shifts and five from the 2025 shifts, 17 of them EASY. Several describe a situation (a maid sent out of a cinema, a child in a carpet factory) and ask which Article helps, so learn each Article as the problem it solves.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpfrfr-articles",
      name: "The six groups, Article by Article",
      intuition:
        "Part III runs from Article 12 to 35 in six groups. Learn each group's range first, then the single Articles SSC names: most questions are a situation and four Article numbers.",
      definition:
        "The **six groups** (Part III, Articles **12 to 35**):\n" +
        "- **Equality (14 to 18)**: **14** equality before law; **15** no discrimination, including access to shops, restaurants and **places of public entertainment**; **16** public employment; **17** **untouchability** abolished; **18** **titles** abolished.\n" +
        "- **Freedom (19 to 22)**: **19** six freedoms, including speech; **20** protection in conviction; **21** life and personal liberty; **22** protection on **arrest**, including the right to a lawyer.\n" +
        "- **Against exploitation (23, 24)**: **23** traffic in human beings and forced labour; **24** no child **under 14** in factories or mines.\n" +
        "- **Religion (25 to 28)**: **25** freedom of religion; **28** no **religious instruction** in institutions wholly funded by the State.\n" +
        "- **Cultural and educational (29, 30)**: rights of minorities.\n" +
        "- **Constitutional remedies (32)**.\n\n" +
        "There were seven groups until the **44th Amendment (1978)** removed the **right to property**; **Article 300A** now holds it as a legal right, so Article 32 cannot enforce it. The **right to vote** (Article 326) is not a Fundamental Right either.",
      table: {
        columns: ["Article", "Right"],
        rows: [
          { cells: ["15", "No discrimination; access to public places"], pyqExampleId: "b9ef7355-aa7e-48ac-a575-f101e8743e96" },
          { cells: ["18", "Titles abolished"], pyqExampleId: "3b2ed4e9-7cf8-40a6-956b-c2cf89adee37" },
          { cells: ["22", "Protection on arrest; right to a lawyer"], pyqExampleId: "9dfec1f6-eda2-404f-a268-3069fcb49c73" },
          { cells: ["23", "Against traffic in humans and forced labour"], pyqExampleId: "4508473d-123c-45c0-8c1d-1290e5f5d225" },
          { cells: ["24", "No child labour under 14 in factories"], pyqExampleId: "6f9c6d24-70e7-4bee-803c-1a40a2271ce3" },
          { cells: ["25", "Freedom of religion"], pyqExampleId: "39552377-f6cd-488d-880b-ba7eb45c750c" },
          { cells: ["28", "No religious instruction in State-funded schools"], pyqExampleId: "140691d9-1c7e-46a1-b11a-ac7009dc7f31" },
        ],
      },
      pyqExampleId: "9ff30963-82c2-4c49-8fe1-b68ed2762e78",
      selfCheckExample: {
        prompt: "A shop owner refuses to sell to a customer because of her caste, and a factory employs a 13-year-old. Which Article does each break?",
        steps: ["Refusing access to a shop on grounds of caste breaks Article 15.", "Employing a child under 14 in a factory breaks Article 24."],
        answer: "The shop: Article 15. The factory: Article 24.",
      },
      practiceSet: [
        { prompt: "How many groups of Fundamental Rights does Part III list today?", answer: "Six" },
        { prompt: "Which Article abolishes untouchability?", answer: "Article 17" },
        { prompt: "Which Article deals with the right against exploitation?", answer: "Article 23 (with 24)" },
        { prompt: "Is the right to vote a Fundamental Right?", answer: "No; it is a constitutional right under Article 326" },
        { prompt: "Under which Article is the right to property now held?", answer: "Article 300A" },
      ],
      traps: [
        {
          title: "Article 17 is untouchability, 18 is titles",
          body: "**Article 17** abolishes untouchability and **Article 18** abolishes titles. Pairs that swap them are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpfrfr-remedies",
      name: "Remedies, doctrines and sources",
      intuition:
        "A right is only as good as its remedy. Article 32 lets a citizen go straight to the Supreme Court, and the courts have built doctrines to decide when a law that limits a right is still valid.",
      definition:
        "Remedies:\n" +
        "- **Article 32**: the right to move the **Supreme Court** to enforce Fundamental Rights. **Ambedkar** described it as the Constitution's **heart and soul**.\n" +
        "- **Article 21** includes the right to a **speedy trial**: in a 2021 case (Union of India v. K. A. Najeeb) the Supreme Court granted bail to an undertrial held for years.\n\n" +
        "Doctrines:\n" +
        "- **Severability** (Article 13): only the part of a law that violates a right is struck down; the **valid** part survives.\n" +
        "- **Reasonable classification** (State of West Bengal v. **Anwar Ali Sarkar**, 1952): Article 14 allows a law to treat groups differently if the grouping is sensible and linked to the law's aim.\n\n" +
        "Sources: the first written charter of rights was the **Magna Carta** of **England** (1215). India's Fundamental Rights were borrowed from the **USA**, not Britain.",
      table: {
        columns: ["Idea", "Source or Article"],
        rows: [
          { cells: ["Right to constitutional remedies", "Article 32"] },
          { cells: ["Speedy trial", "Article 21 (K. A. Najeeb, 2021)"], pyqExampleId: "381dc7fb-d19a-4d0f-b132-1134a97aa1ac" },
          { cells: ["Severability", "Article 13"], pyqExampleId: "8c587d22-2798-491e-91ba-fc4eccdf4880" },
          { cells: ["Reasonable classification", "Anwar Ali Sarkar, 1952"], pyqExampleId: "37bbf2a2-67d3-42fb-a433-66c65e085cb0" },
          { cells: ["First charter of rights", "Magna Carta, England"], pyqExampleId: "262a4f1a-ec83-40c6-ac47-17a24a93ad42" },
        ],
      },
      pyqExampleId: "00d0c5a5-f2e7-43a9-83d7-f571b0dd835f",
      selfCheckExample: {
        prompt: "A court finds that one section of a long Act violates Article 14. What happens to the rest of the Act, and what is this rule called?",
        steps: ["Only the offending section is struck down; the valid part that can stand alone survives.", "This is the doctrine of severability under Article 13."],
        answer: "The rest survives; the doctrine of severability.",
      },
      practiceSet: [
        { prompt: "Who called Article 32 the heart and soul of the Constitution?", answer: "B. R. Ambedkar" },
        { prompt: "From which country did India borrow its Fundamental Rights?", answer: "The USA" },
        { prompt: "In which country did the Magna Carta come about?", answer: "England" },
        { prompt: "Which case laid down the test of reasonable classification under Article 14?", answer: "State of West Bengal v. Anwar Ali Sarkar (1952)" },
      ],
      traps: [
        {
          title: "Fundamental Rights came from the USA",
          body: "A statement that India's Fundamental Rights were taken from the **British** Constitution is false: Britain has no written bill of rights. They came from the **USA**.",
        },
      ],
    },
  ],
};
