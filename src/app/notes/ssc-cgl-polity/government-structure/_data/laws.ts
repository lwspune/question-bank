import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PGS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "New Criminal Laws and Other Acts",
  title: "New Criminal Laws and Other Acts",
  oneLineDefinition:
    "The three criminal laws of 2023 (BNS, BNSS and BSA), which old law each replaced and what each changed, plus the other Acts and statutory bodies SSC has asked about.",
  whyItMatters:
    "Thirty-six questions in the bank, and 26 of them come from the 2025 shifts alone: no page of this chapter drew more questions from the 2025 shifts. Most questions ask which old law a new one replaced, or what one new rule does (Zero FIR, video-recorded searches, electronic evidence), so learn the three laws side by side.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpgsla-bns",
      name: "Bharatiya Nyaya Sanhita (BNS)",
      intuition:
        "Three laws replaced three colonial ones on 1 July 2024. The BNS is the one that says what a crime is and how it is punished: it took the place of the Indian Penal Code.",
      definition:
        "The facts:\n" +
        "- The **Bharatiya Nyaya Sanhita, 2023** replaced the **Indian Penal Code, 1860**, in force from **1 July 2024**, as part of the effort to **modernise and decolonise** criminal justice.\n" +
        "- It is **substantive criminal law**: it defines offences and their punishments. Procedure went to the BNSS and evidence to the BSA.\n" +
        "- It newly defines **organised crime** (Section 111) and **petty organised crime** (Section 112): crimes by a gang such as **theft**, snatching and cheating. A **terrorist act** is a separate offence (Section 113).\n" +
        "- Stealing someone's personal details to pose as them and cheat is **identity theft** (cheating by personation).",
      table: {
        columns: ["New law", "Replaced", "Branch of law"],
        rows: [
          { cells: ["Bharatiya Nyaya Sanhita (BNS)", "Indian Penal Code, 1860", "Offences and punishments"], pyqExampleId: "7ae47650-45a7-4dcb-a17b-084bf89c0a75" },
          { cells: ["Bharatiya Nagarik Suraksha Sanhita (BNSS)", "Code of Criminal Procedure", "Criminal procedure"] },
          { cells: ["Bharatiya Sakshya Adhiniyam (BSA)", "Indian Evidence Act, 1872", "Evidence"] },
        ],
      },
      pyqExampleId: "5b8af4a4-477c-4c7e-9cad-3e0b24aa1d33",
      selfCheckExample: {
        prompt: "A gang steals phones on buses. Under which law, and which category of crime, does that fall?",
        steps: ["Offences are defined in the Bharatiya Nyaya Sanhita.", "Theft by a gang is petty organised crime (Section 112); large-scale trafficking or contract killing would be organised crime."],
        answer: "The BNS; petty organised crime.",
      },
      practiceSet: [
        { prompt: "Which law did the Bharatiya Nyaya Sanhita replace?", answer: "The Indian Penal Code, 1860" },
        { prompt: "From which date did the three new criminal laws come into force?", answer: "1 July 2024" },
        { prompt: "Which branch of law does the BNS cover?", answer: "Substantive criminal law (offences and punishments)" },
        { prompt: "Give one example of petty organised crime under the BNS.", answer: "Theft, snatching or cheating by a gang" },
      ],
      traps: [
        {
          title: "BNS is not procedure",
          body: "The **BNS** says what a crime is. **Video recording, FIRs and bail** belong to the **BNSS**, the procedure law.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsla-bnss",
      name: "Bharatiya Nagarik Suraksha Sanhita (BNSS)",
      intuition:
        "The BNSS is the rulebook for what the police and courts do: registering a complaint, searching, holding a suspect and granting bail. Its new rules lean on technology and fixed time limits.",
      definition:
        "The facts:\n" +
        "- The **BNSS, 2023** replaced the **Code of Criminal Procedure**.\n" +
        "- **Zero FIR** (Section 173): a complaint about a cognizable offence can be filed at **any police station**, whatever the place of the crime, and is then sent to the right station.\n" +
        "- **Search and seizure** must be **video-recorded** (Section 105). Statements and confessions may be recorded by **audio-video** means, and trials and summons may be held **electronically**, to speed up justice.\n" +
        "- **Police custody**: at most **15 days** in all, which may be taken in parts.\n" +
        "- **Default bail** (Section 187): if the charge-sheet is not filed within **60 days** (offences punishable with less than ten years) or **90 days** (death, life or ten years and more), the **Magistrate** must release the accused on bail.",
      table: {
        columns: ["Rule", "BNSS"],
        rows: [
          { cells: ["Zero FIR", "File at any police station"] },
          { cells: ["Search and seizure", "Video-recorded (Section 105)"], pyqExampleId: "b76de842-8f66-47c7-84ec-b1c6a4aaf10a" },
          { cells: ["Police custody", "15 days in all"], pyqExampleId: "32c8fa6c-f876-44e4-9a43-5c672cd46772" },
          { cells: ["Default bail, lesser offences", "After 60 days"], pyqExampleId: "40dfd545-9583-4cc2-b036-b349dad2b52e" },
          { cells: ["Default bail, grave offences", "After 90 days"] },
          { cells: ["Who grants default bail", "The Magistrate"], pyqExampleId: "6bff3df8-9c28-4134-912b-345fbed243eb" },
        ],
      },
      pyqExampleId: "e81a0ca0-1b13-4984-b4e5-8f54f5185849",
      selfCheckExample: {
        prompt: "An accused is charged with an offence punishable with seven years. The charge-sheet is not filed within 60 days. What happens?",
        steps: ["For offences punishable with less than ten years, the limit is 60 days.", "Once it passes without a charge-sheet, the Magistrate must grant default bail."],
        answer: "He is entitled to default bail from the Magistrate.",
      },
      practiceSet: [
        { prompt: "Which law did the BNSS replace?", answer: "The Code of Criminal Procedure" },
        { prompt: "Which section of the BNSS requires search and seizure to be video-recorded?", answer: "Section 105" },
        { prompt: "What is the longest a person can spend in police custody in all under the BNSS?", answer: "15 days" },
        { prompt: "Name one technology change in the BNSS meant to speed up trials.", answer: "Audio-video recording of statements, or electronic trials and summons" },
      ],
      traps: [
        {
          title: "15 days is police custody, 60 and 90 are the outer limits",
          body: "Police custody is capped at **15 days**. The **60 and 90 days** are the limits for filing a charge-sheet, most of it spent in judicial custody.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsla-bsa",
      name: "Bharatiya Sakshya Adhiniyam (BSA)",
      intuition:
        "The BSA is the law of evidence: what a court may believe and how it must be proved. Its big change is that digital records now count fully, provided they come with a certificate.",
      definition:
        "The facts:\n" +
        "- The **BSA, 2023** replaced the **Indian Evidence Act, 1872**. It aims to admit **modern evidence**, in line with the **Information Technology Act, 2000**, forensic science and digital technology.\n" +
        "- **Electronic and digital records** are documents and count as **primary evidence** (Section 57).\n" +
        "- To be admitted, an electronic record must come with a **certificate** (Section 63, the old Section 65B), signed by the person in charge of the device and an expert.\n" +
        "- **Secondary evidence**, such as a photocopy, is allowed only when the original is lost, destroyed or unavailable for a valid reason.\n" +
        "- **Oral evidence** must be **direct**: what the witness saw or heard.\n" +
        "- A **confession to a police officer** cannot be proved against the accused (Section 23), because it may not be voluntary.",
      table: {
        columns: ["Rule", "BSA"],
        rows: [
          { cells: ["Electronic records", "Primary evidence"], pyqExampleId: "5110352b-b120-4e62-9c80-e0a6c2242a9c" },
          { cells: ["Admitting an electronic record", "A certificate (Section 63)"], pyqExampleId: "e8f593ec-2589-4d1c-8ebe-d0509e53fd1b" },
          { cells: ["Secondary evidence", "Only if the original is unavailable"], pyqExampleId: "8e496cd6-d314-4ad7-8f2a-e4db8293fdc1" },
          { cells: ["Oral evidence", "Must be direct"], pyqExampleId: "b4a563e2-9052-461e-83f1-4e1f7581f8eb" },
          { cells: ["Confession to the police", "Not admissible (Section 23)"], pyqExampleId: "1d0aec80-5264-4b41-8932-4aee9ff0513a" },
        ],
      },
      pyqExampleId: "6c788687-cc2f-450a-baa0-2b57c69ea7d7",
      selfCheckExample: {
        prompt: "A prosecutor wants to use a WhatsApp chat as evidence. What does the BSA say about its status and what must accompany it?",
        steps: ["Under the BSA an electronic record is a document and can be primary evidence.", "To admit it, it must be accompanied by the certificate required by Section 63."],
        answer: "It is valid primary evidence if it comes with the Section 63 certificate.",
      },
      practiceSet: [
        { prompt: "Which law did the Bharatiya Sakshya Adhiniyam replace?", answer: "The Indian Evidence Act, 1872" },
        { prompt: "Is a confession made to a police officer admissible under the BSA?", answer: "No" },
        { prompt: "With which Act does the BSA align its treatment of electronic records?", answer: "The Information Technology Act, 2000" },
        { prompt: "When may secondary evidence of a document be given?", answer: "Only when the original is lost, destroyed or not available for a valid reason" },
      ],
      traps: [
        {
          title: "Electronic records are primary, not secondary",
          body: "A statement that the BSA treats electronic records as **secondary** evidence is false. They are **primary**, though they need a certificate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsla-acts",
      name: "Other Acts and statutory bodies",
      intuition:
        "SSC also asks the year or purpose of Acts that were in the news, and the make-up of a few bodies set up by law rather than by the Constitution. Each is one line.",
      definition:
        "Acts:\n" +
        "- **Epidemic Diseases Act, 1897**: amended by an ordinance in **2020**, during COVID-19, to protect health workers.\n" +
        "- **Hindu Succession Act, 1956**: in 2022 the Supreme Court held that a daughter could inherit her father's property even before this Act.\n" +
        "- **Environment (Protection) Act, 1986**: lets the **Central Government** set up authorities against pollution.\n" +
        "- **Rights of Persons with Disabilities Act, 2016**: raised the recognised disabilities from 7 to 21.\n" +
        "- **Muslim Women (Protection of Rights on Marriage) Act, 2019**: made triple talaq void; **Section 5** gives the woman a subsistence allowance.\n" +
        "- **Essential Defence Services Act, 2021**: lets the government ban **strikes and lockouts** in essential defence units.\n" +
        "- **Constitution (Scheduled Castes) Order (Amendment) Bill, 2021**: changed **Tamil Nadu's** Scheduled Caste list.\n\n" +
        "Bodies:\n" +
        "- **National Human Rights Commission** (Act of 1993): a former Chief Justice of India heads it, with a former Supreme Court judge and a former High Court Chief Justice among its members. A District Magistrate is not a member.\n" +
        "- **Zonal Councils** (States Reorganisation Act, 1956): the **Union Home Minister** is chairman **ex officio**.\n" +
        "- **Sports Authority of India**: under the **Ministry of Youth Affairs and Sports**.",
      table: {
        columns: ["Act or body", "Year", "Remember for"],
        rows: [
          { cells: ["Epidemic Diseases Act", "1897", "Amended by ordinance in 2020"], pyqExampleId: "68f3732a-9fa4-4587-9364-dc2b308150fd" },
          { cells: ["Hindu Succession Act", "1956", "Daughters' inheritance case of 2022"], pyqExampleId: "902f461e-2d3f-4bdb-b60a-e34f5facf023" },
          { cells: ["Environment (Protection) Act", "1986", "Central Government sets up authorities"], pyqExampleId: "2b22306b-11e0-4d84-8c26-d0663544d01a" },
          { cells: ["Rights of Persons with Disabilities Act", "2016", "21 disabilities"], pyqExampleId: "6b2f488f-a194-473e-8494-745cafaf0c8c" },
          { cells: ["Essential Defence Services Act", "2021", "Bans strikes in defence units"], pyqExampleId: "81bb0cf9-8ae9-4197-a943-dc62626710f9" },
          { cells: ["Zonal Councils", "1956", "Union Home Minister chairs"], pyqExampleId: "f4e91d6c-58ea-4d7d-bf5e-1453583410e0" },
        ],
      },
      pyqExampleId: "2c2e9f2c-bff2-4c11-a6f0-caf395b85e14",
      selfCheckExample: {
        prompt: "Which Act did the 2020 ordinance on attacks against health workers amend, and why was that old Act passed?",
        steps: ["It amended the Epidemic Diseases Act of 1897.", "That Act was passed during the plague in Bombay."],
        answer: "The Epidemic Diseases Act, 1897, a plague-era law.",
      },
      practiceSet: [
        { prompt: "Under which ministry does the Sports Authority of India work?", answer: "The Ministry of Youth Affairs and Sports" },
        { prompt: "In which year was the Rights of Persons with Disabilities Act passed?", answer: "2016" },
        { prompt: "Which section of the 2019 Muslim Women Act provides a subsistence allowance?", answer: "Section 5" },
        { prompt: "Who chairs a Zonal Council?", answer: "The Union Home Minister, ex officio" },
      ],
      traps: [
        {
          title: "The Home Minister chairs, the chief ministers rotate",
          body: "The **Union Home Minister** is always the chairman of a Zonal Council. Only the **vice-chairmanship** rotates among the chief ministers.",
        },
      ],
    },
  ],
};
