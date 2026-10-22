import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_FR_RIGHTS_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Rights",
  title: "Fundamental Rights",
  oneLineDefinition:
    "The rights of Part III, Articles 12 to 30: who holds each one, against whom it can be claimed, and what each Article says.",
  whyItMatters:
    "This is the biggest page: 20 CDS questions, 12 MODERATE, 6 HARD and 2 EASY. Seven of them are about the reach of the rights: who holds them (citizens only, or every person) and against whom they can be claimed. The rest name a right and ask its Article, or the other way round, so learn the Articles as a numbered list.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolfr-scope",
      name: "Who holds the rights, and against whom",
      intuition:
        "A Fundamental Right is a promise the Constitution makes against the government. So two questions come first: who can claim the right (every person, or only a citizen), and who must respect it (the State, which Article 12 defines very widely).",
      definition:
        "The rules:\n" +
        "- **Article 12** defines **the State** for Part III: the Government and Parliament of India, the Government and Legislature of each State, and **all local or other authorities** in India or under the control of the Government of India.\n" +
        "- **Article 13**: a law that takes away or cuts down a Fundamental Right is **void** to that extent.\n" +
        "- **Citizens only**: Articles **15, 16, 19, 29 and 30**.\n" +
        "- **Every person**, foreigners included: Articles **14, 20, 21, 22** and **23 to 28**.\n" +
        "- A right can be broken by what a government authority **does** and also by what it **fails to do** when the Constitution puts a duty on it.\n" +
        "- Most rights carry **reasonable restrictions**; very few are absolute.\n" +
        "- **Articles 31A and 31C** save certain laws (land reform, laws giving effect to some Directive Principles) from challenge under **Articles 14 and 19**. **Article 31B** protects the laws in the **Ninth Schedule**.",
      table: {
        columns: ["Question", "Answer", "Article"],
        rows: [
          {
            cells: ["What is the State?", "Union and State governments and legislatures, and all local or other authorities", "12"],
            noteAmber: "CDS 2021 (II) and 2025 (I) both asked this: the answer always includes local authorities.",
            pyqExampleId: "5ad1ebcc-f28b-4fcd-ba94-284aba9712c2",
          },
          { cells: ["What happens to a law that breaks a right?", "It is void to that extent", "13"] },
          {
            cells: ["Which rights are for citizens only?", "Non-discrimination, public jobs, the six freedoms, culture, minority schools", "15, 16, 19, 29, 30"],
            pyqExampleId: "8e29cac1-f17b-4340-a716-7db81960e5ec",
          },
          { cells: ["Which rights cover every person?", "Equality before law, protection in criminal cases, life and liberty, religion", "14, 20, 21, 22, 23 to 28"] },
          {
            cells: ["Which Articles shield some laws from Articles 14 and 19?", "Land reform laws and laws for certain Directive Principles", "31A and 31C"],
            pyqExampleId: "8fced09e-f31b-41aa-8038-64869ffe85c2",
          },
        ],
      },
      pyqExampleId: "3c36e2a6-67a9-4791-8a1b-a9bf6571647a",
      selfCheckExample: {
        prompt: "Which one of these is available to citizens only: Article 14, Article 20 or Article 29?",
        steps: [
          "Article 14 (equality before law) and Article 20 (protection in criminal cases) are worded for every person.",
          "Article 29 protects the language, script and culture of a section of citizens.",
        ],
        answer: "Article 29",
      },
      practiceSet: [
        { prompt: "Which Article defines the State for the purpose of the Fundamental Rights?", answer: "Article 12" },
        { prompt: "Is a municipal corporation part of the State under Article 12?", answer: "Yes. Local authorities are included" },
        { prompt: "Which Article makes a law void if it takes away a Fundamental Right?", answer: "Article 13" },
        { prompt: "Can a foreign national in India claim freedom of religion under Article 25?", answer: "Yes. Article 25 protects every person" },
        { prompt: "Which Article protects the laws placed in the Ninth Schedule?", answer: "Article 31B" },
      ],
      traps: [
        {
          title: "Equality before law is for everyone",
          body: "Article 14 protects every person, foreigners included. It is Articles 15 and 16, on discrimination and public jobs, that are for citizens only.",
        },
        {
          title: "The State is more than the government",
          body: "Under Article 12 the State also includes Parliament, the State legislatures and all local or other authorities. An option that stops at the Government of India is too narrow.",
        },
        {
          title: "31B is wider than 31A and 31C",
          body: "Articles 31A and 31C save laws from Articles 14 and 19 only. Article 31B protects Ninth Schedule laws against all the Fundamental Rights, so it is not the answer when a question names Articles 14 and 19.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-equality",
      name: "Right to Equality, Articles 14 to 18",
      intuition:
        "The five Articles of the Right to Equality run from the general to the particular: equal law for all, no discrimination, equal chance in government jobs, an end to untouchability, an end to titles.",
      definition:
        "The five Articles:\n" +
        "- **Article 14**: equality before the law and equal protection of the laws, for every person.\n" +
        "- **Article 15**: no discrimination on grounds only of **religion, race, caste, sex or place of birth**. Clause 15(2) covers shops, public restaurants, **wells, tanks, bathing ghats**, roads and places of public resort.\n" +
        "- **Article 15(5)**, added by the **93rd Amendment (2005)**: special provisions for admission of SC, ST and backward classes to educational institutions, aided or unaided, **except minority institutions** under Article 30.\n" +
        "- **Article 16**: equality of opportunity in public employment.\n" +
        "- **Article 17**: untouchability is abolished. The **Protection of Civil Rights Act, 1955** and the **SC and ST (Prevention of Atrocities) Act, 1989** give it force.\n" +
        "- **Article 18**: titles are abolished (military and academic distinctions are allowed).",
      table: {
        columns: ["Article", "What it says", "Who"],
        rows: [
          {
            cells: ["14", "Equality before the law and equal protection of the laws", "Every person"],
            pyqExampleId: "ca887587-db01-4427-8429-793281d0b4f2",
          },
          { cells: ["15", "No discrimination on religion, race, caste, sex or place of birth", "Citizens"] },
          {
            cells: ["15(5)", "Admission quotas in aided and unaided private institutions, not minority ones", "SC, ST, backward classes"],
            pyqExampleId: "35aab9fe-cbcb-49d3-9d2b-9f8e9fc3275c",
          },
          { cells: ["16", "Equality of opportunity in public employment", "Citizens"] },
          {
            cells: ["17", "Untouchability abolished; its practice is an offence", "Everyone"],
            noteAmber: "CDS 2016 (II): Article 17, the 1955 Civil Rights Act and the 1989 Atrocities Act all protect the Scheduled Castes.",
            pyqExampleId: "40501071-03c6-4987-ac3a-c120569a40f1",
          },
          { cells: ["18", "Titles abolished", "Everyone"] },
        ],
      },
      pyqExampleId: "615e1661-231d-44ef-97db-8d69d9f6a808",
      selfCheckExample: {
        prompt: "A State law sets aside seats for Scheduled Caste students in an unaided private college and in a college run by a religious minority. Which of the two does Article 15(5) allow?",
        steps: [
          "Article 15(5) covers educational institutions, aided or unaided.",
          "It expressly leaves out the minority institutions protected by Article 30(1).",
        ],
        answer: "Only the unaided private college.",
      },
      practiceSet: [
        { prompt: "Which Article abolishes untouchability?", answer: "Article 17" },
        { prompt: "Which Article guarantees equality of opportunity in public employment?", answer: "Article 16" },
        { prompt: "Name the five grounds of discrimination barred by Article 15.", answer: "Religion, race, caste, sex and place of birth" },
        { prompt: "Which amendment inserted Article 15(5) on admissions?", answer: "The 93rd Amendment (2005)" },
        { prompt: "Which Article abolishes titles?", answer: "Article 18" },
      ],
      traps: [
        {
          title: "Five grounds, not three",
          body: "Article 15 bars discrimination on religion, race, caste, **sex and place of birth**. CDS 2026 (I) offered a list of only religion, race and caste as the statement that is not correct.",
        },
        {
          title: "Wells and bathing ghats are Article 15",
          body: "Access to wells, tanks, bathing ghats, shops and public places is Article 15(2). Article 17 abolishes untouchability, which is a different clause.",
        },
        {
          title: "15(5) stops at minority institutions",
          body: "Quotas under Article 15(5) reach unaided private colleges too, but never the minority institutions of Article 30.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-freedom",
      name: "Right to Freedom, Articles 19 to 22",
      intuition:
        "Article 19 lists six freedoms for citizens, each with limits the Constitution names. Articles 20 to 22 then protect every person who is accused, arrested or detained, and Article 21 guards life and liberty, which the courts have read very widely.",
      definition:
        "The four Articles:\n" +
        "- **Article 19(1)**, citizens only, six freedoms: speech and expression; to **assemble peaceably and without arms**; to form associations or unions; to move freely in India; to reside and settle anywhere in India; to practise any profession or carry on any trade or business.\n" +
        "- The right to acquire and dispose of property was taken out of Article 19 by the **44th Amendment (1978)**. Property is now a legal right under **Article 300A**.\n" +
        "- **Article 19(2)** lists the grounds for limiting speech: sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, **decency or morality**, contempt of court, **defamation**, **incitement to an offence**.\n" +
        "- **Article 20**: no punishment under a law made after the act (ex post facto), no heavier punishment than the law then allowed, **no double jeopardy** (20(2)), **no compelled self-incrimination** (20(3)). A confession made freely can still be used.\n" +
        "- **Article 21**: life and personal liberty. The courts read it to include dignity, the identity of transgender persons and the choice of a life partner.\n" +
        "- **Article 21A**: free and compulsory education for children aged 6 to 14, added by the **86th Amendment (2002)**.\n" +
        "- **Article 22**: protection on arrest, and the rules for **preventive detention**.",
      table: {
        columns: ["Article", "Protects", "Holds for"],
        rows: [
          {
            cells: ["19(1)", "Six freedoms: speech, assembly without arms, association, movement, residence, profession", "Citizens"],
            noteAmber: "CDS 2016 (II): the right to form associations and unions is a freedom for citizens only.",
            pyqExampleId: "152d24b0-45fc-400a-8ec7-9679dcdb8f54",
          },
          {
            cells: ["19(2)", "Reasonable limits on speech, including defamation, decency and incitement", "Citizens"],
            pyqExampleId: "e3d35f6e-0ab3-4837-8645-2b1ba801d450",
          },
          {
            cells: ["20", "No ex post facto punishment, no double jeopardy, no self-incrimination", "Every person"],
            pyqExampleId: "5107f1fd-7898-4429-bf88-b37e8b976bcd",
          },
          { cells: ["21", "Life and personal liberty", "Every person"] },
          { cells: ["21A", "Free and compulsory education, ages 6 to 14 (86th Amendment)", "Every child"] },
          { cells: ["22", "Rights on arrest; preventive detention", "Every person"] },
        ],
      },
      pyqExampleId: "b87759c5-fbe3-4a37-ab27-1995428bea8f",
      selfCheckExample: {
        prompt: "A trade union is formed by bank employees. On which freedom of Article 19(1) does it rest?",
        steps: [
          "Article 19(1) lists six freedoms.",
          "One of them is the freedom to form associations or unions.",
        ],
        answer: "The freedom to form associations or unions, Article 19(1)(c).",
      },
      practiceSet: [
        { prompt: "Which clause of Article 20 protects against double jeopardy?", answer: "Article 20(2)" },
        { prompt: "Which Article deals with preventive detention?", answer: "Article 22" },
        { prompt: "Which amendment made education for children of 6 to 14 a Fundamental Right?", answer: "The 86th Amendment (2002), as Article 21A" },
        { prompt: "Under which Article is the right to marry a person of one's choice protected?", answer: "Article 21" },
        { prompt: "Is incitement to an offence a ground for limiting free speech?", answer: "Yes. It is one of the grounds in Article 19(2)" },
      ],
      traps: [
        {
          title: "Property left Article 19 in 1978",
          body: "The 44th Amendment removed the right to acquire, hold and dispose of property from Article 19. It is now only a legal right under Article 300A.",
        },
        {
          title: "A free confession is not barred",
          body: "Article 20(3) stops an accused being **compelled** to be a witness against himself. A confession made freely can be used as evidence, so 'a confession can never be used' is wrong.",
        },
        {
          title: "21A came with the 86th, not the 85th",
          body: "Article 21A, the right to education, was inserted by the 86th Amendment of 2002. The 85th Amendment dealt with seniority in promotion for SC and ST employees.",
        },
        {
          title: "Assembly must be peaceful and unarmed",
          body: "Article 19(1)(b) protects only assembling peaceably and without arms. A meeting with weapons has no protection.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolfr-religion",
      name: "Exploitation, religion and minorities, Articles 23 to 30",
      intuition:
        "The last groups of rights protect the weak from being used (no forced labour, no child labour), protect faith, and let minorities keep their culture and run their own schools.",
      definition:
        "The Articles:\n" +
        "- **Article 23**: no traffic in human beings, no begar (unpaid forced work), no forced labour.\n" +
        "- **Article 24**: no child below **14** in a factory, mine or other hazardous work.\n" +
        "- **Article 25**: freedom of conscience and the right to profess, practise and propagate religion, for every person, subject to public order, morality and health.\n" +
        "- **Article 26**: a religious denomination may manage its own religious affairs, again **subject to public order, morality and health**. It is not absolute.\n" +
        "- **Article 29**: any section of citizens may conserve its own language, script or culture.\n" +
        "- **Article 30**: minorities based on **religion or language** may set up and run educational institutions of their choice.\n" +
        "- Rights that look similar but are **not** in Part III: workers' participation in management of industries (**Article 43A**, a Directive Principle).",
      table: {
        columns: ["Article", "Protects", "Group"],
        rows: [
          { cells: ["23", "No trafficking, begar or forced labour", "Against exploitation"] },
          { cells: ["24", "No child below 14 in factories, mines or hazardous work", "Against exploitation"] },
          { cells: ["25", "Conscience; profess, practise and propagate religion", "Freedom of religion"] },
          { cells: ["26", "Denominations manage their religious affairs, within limits", "Freedom of religion"] },
          { cells: ["29", "Language, script and culture of any section of citizens", "Cultural and educational"] },
          { cells: ["30", "Minorities by religion or language run their own schools", "Cultural and educational"] },
          {
            cells: ["43A", "Workers' participation in management of industries", "Directive Principle, not a right"],
            noteAmber: "CDS 2019 (II): this was the item that is not a Fundamental Right.",
            pyqExampleId: "2532f5a0-f20e-4c79-a9ce-8d513e96c7ea",
          },
        ],
      },
      pyqExampleId: "d3082345-3149-4180-ab92-8c44d33b47dd",
      selfCheckExample: {
        prompt: "A ten-year-old is employed in a fireworks factory. Which Article of the Fundamental Rights does this break?",
        steps: [
          "Child labour falls under the Right against Exploitation, Articles 23 and 24.",
          "Article 24 bars any child below 14 from factories, mines and hazardous work.",
        ],
        answer: "Article 24",
      },
      practiceSet: [
        { prompt: "Which Article bans begar and forced labour?", answer: "Article 23" },
        { prompt: "Which Article protects freedom of conscience?", answer: "Article 25" },
        { prompt: "Which Article lets any section of citizens conserve its own language, script or culture?", answer: "Article 29" },
        { prompt: "Is workers' participation in the management of industries a Fundamental Right?", answer: "No. It is a Directive Principle, Article 43A" },
      ],
      traps: [
        {
          title: "Religious freedom has limits",
          body: "Articles 25 and 26 are subject to public order, morality and health. An option calling a denomination's power 'absolute' is wrong.",
        },
        {
          title: "Only two kinds of minority in Article 30",
          body: "Article 30 names minorities based on religion or language and no other kind.",
        },
      ],
    },
  ],
};
