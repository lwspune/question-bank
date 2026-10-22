import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FR_PANCHAYATS_NOTE: SubtopicNote = {
  subtopicName: "Panchayati Raj and Autonomous Councils",
  title: "Panchayati Raj and Autonomous Councils",
  oneLineDefinition:
    "Part IX of the Constitution (Articles 243 to 243O, the 73rd Amendment): the three tiers, the Gram Sabha, reservation, panchayat elections, and the Sixth Schedule councils of the tribal areas where Part IX does not apply.",
  whyItMatters:
    "17 CDS questions: 10 MODERATE, 6 HARD and 1 EASY, a harder mix than the rest of the chapter. Most of them quote an Article of the 243 series or a rule from it and ask if it is right, so learn which Article does which job. Three questions on the Sixth Schedule councils all came in one paper, CDS 2018 (II).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolfr-part-ix",
      name: "Part IX: tiers, Gram Sabha and powers",
      intuition:
        "Article 40 asked the State to organise village panchayats, but for forty years that was only a goal. The 73rd Amendment (1992) wrote the panchayats into the Constitution as Part IX, with a fixed shape that every State must follow and details each State fills in by its own law.",
      definition:
        "The structure:\n" +
        "- The **73rd Amendment (1992)** added **Part IX**, Articles **243 to 243O**, and the **Eleventh Schedule**. It came into force on **24 April 1993**.\n" +
        "- **Article 243A**: the **Gram Sabha** is everyone on the electoral rolls of a village within the panchayat area.\n" +
        "- **Article 243B**: panchayats at **village, intermediate and district** level. A State whose population is **not above 20 lakh** may skip the intermediate level, so three tiers are not found everywhere.\n" +
        "- **Article 243C**: the **State Legislature** decides the composition. All seats are filled by **direct election**; the chairperson is elected as State law provides. The chairperson and members vote in meetings **whether or not** they were directly elected.\n" +
        "- **Article 243G** and the **Eleventh Schedule** (**29 subjects**, such as agriculture and drinking water): what a State may hand over to its panchayats.\n" +
        "- **Article 243H**: the State may let panchayats **levy, collect and keep taxes**, duties, tolls and fees.\n" +
        "- **Article 243I**: a **State Finance Commission** every five years.\n" +
        "- Towns: the **74th Amendment (1992)** added **Part IXA** (municipalities, Articles 243P to 243ZG) and the **Twelfth Schedule** (18 subjects).",
      table: {
        columns: ["Article", "Provision"],
        rows: [
          { cells: ["243A", "Gram Sabha"] },
          { cells: ["243B", "Constitution of panchayats: three tiers"] },
          { cells: ["243C", "Composition of panchayats"] },
          { cells: ["243D", "Reservation of seats"] },
          { cells: ["243E", "Duration of panchayats"] },
          { cells: ["243F", "Disqualifications for membership"] },
          {
            cells: ["243G", "Powers and responsibilities; Eleventh Schedule"],
            pyqExampleId: "0eaec48d-19b7-4df2-a89f-039c8eb03857",
          },
          { cells: ["243H", "Power to impose taxes"] },
          { cells: ["243I", "State Finance Commission"] },
          {
            cells: ["243K", "Elections to the panchayats; State Election Commission"],
            noteAmber: "CDS 2026 (I): '243D: Election to the Panchayats' was the wrong pair. 243D is reservation; elections are 243K.",
            pyqExampleId: "9fd2829f-8a3d-4146-98b7-6a92e6d73f72",
          },
          { cells: ["243M", "Areas where Part IX does not apply"] },
        ],
      },
      pyqExampleId: "7c5e287c-cb9e-4f52-a7ee-604b0c29fb81",
      selfCheckExample: {
        prompt: "Which Article sets out the Gram Sabha, and who are its members?",
        steps: [
          "The Gram Sabha comes first in Part IX, at Article 243A.",
          "It is made up of the persons on the electoral rolls of the village.",
        ],
        answer: "Article 243A; everyone registered on the village electoral rolls.",
      },
      practiceSet: [
        { prompt: "Which amendment added Part IX on panchayats?", answer: "The 73rd Amendment (1992)" },
        { prompt: "Which Schedule lists the subjects a State may give to its panchayats?", answer: "The Eleventh Schedule (29 subjects)" },
        { prompt: "Which Part of the Constitution deals with municipalities?", answer: "Part IXA, added by the 74th Amendment" },
        { prompt: "Can a State allow its panchayats to levy taxes?", answer: "Yes, under Article 243H" },
        { prompt: "How many subjects are there in the Twelfth Schedule?", answer: "18" },
      ],
      traps: [
        {
          title: "Three tiers are not compulsory everywhere",
          body: "A State with a population not above 20 lakh may do without the intermediate tier, so 'every State must have three tiers' is wrong.",
        },
        {
          title: "Panchayats can tax",
          body: "Under Article 243H a State law may let panchayats levy, collect and keep taxes, duties, tolls and fees. 'Panchayats cannot collect taxes' is wrong.",
        },
        {
          title: "The Eleventh Schedule is State to panchayat",
          body: "The Eleventh Schedule lists what a State may devolve to its panchayats. It does not divide powers between the Union and the States; that is the Seventh Schedule.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-reservation",
      name: "Reservation in panchayats, Article 243D",
      intuition:
        "Article 243D makes sure that groups long kept out of village power get seats: Scheduled Castes and Scheduled Tribes by their share of the population, and women by at least one third of the seats.",
      definition:
        "The rules of Article 243D:\n" +
        "- Seats for **Scheduled Castes and Scheduled Tribes** in every panchayat, in the **same proportion as their population** in that area.\n" +
        "- **Not less than one-third** of all seats for **women**, counting the SC and ST seats kept for women.\n" +
        "- Reserved seats **rotate** among constituencies.\n" +
        "- Reservation for **backward classes** is left to the State: it **may** provide it.\n" +
        "- One-third is a floor. Many States reserve **half** the seats for women by their own law.",
      table: {
        columns: ["Group", "Rule"],
        rows: [
          { cells: ["Scheduled Castes and Scheduled Tribes", "Seats in proportion to their population in the panchayat area"] },
          {
            cells: ["Women", "Not less than one-third of all seats"],
            noteAmber: "CDS 2021 (II): women's reservation is Article 243D, not 243B, 243C or 243E.",
            pyqExampleId: "be763fe5-a34b-44ae-a48a-a5ad24ec1b18",
          },
          { cells: ["Backward classes", "Optional: the State may provide it"] },
          { cells: ["Reserved seats", "Rotate among constituencies"] },
        ],
      },
      pyqExampleId: "92296efa-4dde-4ee7-80f9-2ac9c9e09877",
      selfCheckExample: {
        prompt: "A village panchayat has 15 seats. At least how many must be reserved for women?",
        steps: [
          "Article 243D reserves not less than one-third of the seats for women.",
          "One-third of 15 is 5.",
        ],
        answer: "5 seats",
      },
      practiceSet: [
        { prompt: "What is the least share of panchayat seats that must be reserved for women?", answer: "One-third" },
        { prompt: "Which Article provides for reservation of seats in panchayats?", answer: "Article 243D" },
        { prompt: "Must a State reserve panchayat seats for backward classes?", answer: "No. It may do so by its own law" },
      ],
      traps: [
        {
          title: "SC and ST seats follow population",
          body: "The SC and ST seats in a panchayat match their share of the population in that panchayat area. They are not a fixed number.",
        },
        {
          title: "One-third is the minimum",
          body: "The Constitution says not less than one-third for women. A State may reserve more, and many reserve half.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-panchayat-elections",
      name: "Panchayat elections and the State Election Commission",
      intuition:
        "Panchayat elections are a State affair. The State Legislature makes the rules, and a State Election Commission, not the Election Commission of India, runs the polls.",
      definition:
        "The rules:\n" +
        "- **Article 243K**: the **State Election Commission** controls the **electoral rolls** and the **conduct** of panchayat elections.\n" +
        "- The State Election Commissioner is **appointed by the Governor** and can be removed only like a High Court judge. The Chief Election Commissioner of India has **no role**.\n" +
        "- The **State Legislature** makes the law on all matters about panchayat elections.\n" +
        "- **Article 243E**: a panchayat lasts **five years** from the date fixed for its first meeting. If dissolved early, a new one is elected **within six months** and serves only the **rest** of the five years.\n" +
        "- **Article 243F**: the minimum age to be a member is **21**, not 25.\n" +
        "- A State may add conditions by law. In **2015 Rajasthan and Haryana** set minimum school qualifications for candidates, and the Supreme Court upheld Haryana's law in **Rajbala v. State of Haryana**.",
      table: {
        columns: ["Point", "Rule"],
        rows: [
          {
            cells: ["Who runs the polls and the rolls", "The State Election Commission (Article 243K)"],
            noteAmber: "CDS 2026 (II): he is appointed by the Governor, not on the advice of the Chief Election Commissioner.",
            pyqExampleId: "8b1e5169-cab0-4753-add8-03f7a14df31f",
          },
          { cells: ["Who appoints the State Election Commissioner", "The Governor"] },
          {
            cells: ["Who makes the election law", "The State Legislature"],
            pyqExampleId: "f243237b-b27b-408f-83bc-584069422e4b",
          },
          { cells: ["Term", "Five years from the date fixed for the first meeting"] },
          { cells: ["After early dissolution", "Election within six months; the new body serves the rest of the term"] },
          { cells: ["Minimum age", "21 years"] },
          {
            cells: ["School qualification for candidates", "Rajasthan and Haryana, 2015"],
            pyqExampleId: "3081da6b-254b-4b8f-87d7-ebaedefd682a",
          },
        ],
      },
      pyqExampleId: "c51a0d34-7298-439f-bc48-d83b1eed2373",
      selfCheckExample: {
        prompt: "A panchayat is dissolved early. Within how long must the election to the new panchayat be held?",
        steps: [
          "Article 243E sets the deadline after an early dissolution.",
          "The election must be completed within six months of the dissolution.",
        ],
        answer: "Within six months.",
      },
      practiceSet: [
        { prompt: "Who appoints a State Election Commissioner?", answer: "The Governor of the State" },
        { prompt: "Which Article sets up the State Election Commission?", answer: "Article 243K" },
        { prompt: "Who makes the law on panchayat elections?", answer: "The State Legislature" },
        { prompt: "Which two States first required minimum schooling for panchayat candidates in 2015?", answer: "Rajasthan and Haryana" },
      ],
      traps: [
        {
          title: "The State Election Commission is not the ECI",
          body: "Panchayat elections are run by the State Election Commission, whose head the Governor appoints. The Election Commission of India and its Chief Election Commissioner have no part in it.",
        },
        {
          title: "21, not 25",
          body: "A person can be a panchayat member at 21. Twenty-five is the age for the Lok Sabha and the State Assembly.",
        },
        {
          title: "Parliament does not make panchayat election law",
          body: "All matters about panchayat elections are for the State Legislature, under Article 243K.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-councils",
      name: "Where Part IX does not apply: the Sixth Schedule councils",
      intuition:
        "Some tribal areas of the North-East already govern themselves through autonomous district councils under the Sixth Schedule. So Part IX keeps out of them, and the Sixth Schedule sets its own rules for the councils.",
      definition:
        "The rules:\n" +
        "- **Article 243M**: Part IX does **not** apply to **Nagaland, Meghalaya and Mizoram**, to the Scheduled and tribal areas, to the hill areas of Manipur that have district councils, or to the Darjeeling hill council area.\n" +
        "- Assam and Tripura **do** have panchayats, except in their Sixth Schedule areas.\n" +
        "- The **Sixth Schedule** (Article 244(2)) covers tribal areas of **Assam, Meghalaya, Tripura and Mizoram**.\n" +
        "- A **District Council** has up to **30 members**, up to **4 nominated** by the Governor and the rest elected. Elected members serve **five years from the date fixed for the first meeting** after the election.\n" +
        "- The accounts are kept in the form the **Comptroller and Auditor General** sets with the President's approval, and the **CAG** has them audited.\n" +
        "- The **Governor** may **annul or suspend** a council's act or resolution that endangers the safety of India or public order.",
      table: {
        columns: ["Point", "Rule"],
        rows: [
          { cells: ["States outside Part IX", "Nagaland, Meghalaya, Mizoram"] },
          { cells: ["Sixth Schedule States", "Assam, Meghalaya, Tripura, Mizoram"] },
          {
            cells: ["Term of elected council members", "Five years from the date fixed for the first meeting"],
            pyqExampleId: "70cac812-c522-44a0-baab-4732c3d0a02f",
          },
          {
            cells: ["Audit of council funds", "Comptroller and Auditor General"],
            pyqExampleId: "c8922d6e-5d2d-4d55-ac5f-b3420730a674",
          },
          {
            cells: ["Annuls or suspends council acts", "The Governor"],
            pyqExampleId: "192b4ac9-4ada-4885-b112-72c28c471851",
          },
        ],
      },
      pyqExampleId: "5883dbe6-358c-4e82-9f5c-8eab30d00d57",
      selfCheckExample: {
        prompt: "From which date is the five-year term of an elected member of an autonomous district council counted?",
        steps: [
          "The Sixth Schedule does not count from polling day.",
          "It counts from the date fixed for the council's first meeting after the election.",
        ],
        answer: "From the date fixed for the first meeting of the council after the election.",
      },
      practiceSet: [
        { prompt: "Which four States have Sixth Schedule tribal areas?", answer: "Assam, Meghalaya, Tripura and Mizoram" },
        { prompt: "Who audits the accounts of an autonomous district council?", answer: "The Comptroller and Auditor General of India" },
        { prompt: "Who may annul or suspend an act of a district council that endangers public order?", answer: "The Governor" },
        { prompt: "At most how many members can an autonomous district council have?", answer: "30" },
      ],
      traps: [
        {
          title: "Council audit is by the CAG",
          body: "The accounts of a district or regional council are audited as the CAG directs, not by State auditors or a private chartered accountant.",
        },
        {
          title: "The Governor, not the President, controls council acts",
          body: "Under the Sixth Schedule it is the Governor of the State who may annul or suspend a council's act or resolution.",
        },
        {
          title: "Assam and Tripura are not exempt",
          body: "Part IX applies to Assam and Tripura outside their Sixth Schedule areas. The States wholly outside it are Nagaland, Meghalaya and Mizoram.",
        },
      ],
    },
  ],
};
