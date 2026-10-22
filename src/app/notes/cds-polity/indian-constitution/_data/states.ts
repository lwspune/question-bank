import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_STATES_NOTE: SubtopicNote = {
  subtopicName: "The Union and the States",
  title: "The Union and the States",
  oneLineDefinition:
    "Why India is a Union of States, how Parliament can make or change a State, the special provisions of Articles 370 and 371, and the rules for Delhi and the Union Territories.",
  whyItMatters:
    "Sixteen CDS questions, five of them HARD. The Article 371 family alone gave five of them, from 2018 (II) to 2026 (I), always as 'which State goes with which letter'. The rest test one idea: Indian States did not join by agreement, so Parliament can redraw them by a simple law.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-union-of-states",
      name: "A Union of States",
      intuition:
        "In the USA, independent States came together and agreed to form a federation, so no State can be wiped out. " +
        "India went the other way: one country divided into States for convenience. That is why the Constitution says 'Union', why no State can leave, and why Parliament can redraw the map.",
      definition:
        "The key ideas:\n" +
        "- **Article 1**: 'India, that is Bharat, shall be a **Union of States**'. The Draft Constitution moved by Ambedkar on 4 November 1948 used this phrase on purpose: the Union is **not the result of an agreement** among the States, and **no State can secede**.\n" +
        "- India is an **indestructible Union of destructible States**. The **USA** is 'an indestructible Union of indestructible States' (Texas v. White, 1869).\n" +
        "- The Constitution is called **quasi-federal**: federal in normal times, with **unitary** features such as a strong Centre, **single citizenship**, **residuary powers with the Centre**, unequal seats for States in the Rajya Sabha, and emergency powers that make the system work like a unitary one.\n" +
        "- States **cannot have their own constitutions** (Jammu and Kashmir had one until 2019).",
      table: {
        columns: ["Feature", "Federal or unitary"],
        rows: [
          { cells: ["Two levels of government with divided powers", "Federal"] },
          { cells: ["Written Constitution and independent courts", "Federal"] },
          { cells: ["Single citizenship", "Unitary"] },
          { cells: ["Residuary powers with the Centre (Article 248)", "Unitary"] },
          { cells: ["Rajya Sabha seats by population, not equal for each State", "Unitary"] },
          { cells: ["Emergency powers", "Unitary"] },
          {
            cells: ["Union not formed by agreement of the States", "Unitary"],
            noteAmber: "CDS 2024 (II): the Draft Constitution called India a 'Union of States', not a 'Federation of States'.",
            pyqExampleId: "2e3e9078-1cba-4ba7-9004-584bf27d0eae",
          },
        ],
      },
      pyqExampleId: "16de403e-1ae0-49bd-948c-b291c6409fd0",
      selfCheckExample: {
        prompt: "Which country's federation is described as 'an indestructible Union of indestructible States', and how is India's different?",
        steps: [
          "The phrase comes from a judgment of the US Supreme Court.",
          "In India, Parliament can change the area, boundaries and names of the States.",
        ],
        answer: "The USA. India is an indestructible Union of destructible States.",
      },
      practiceSet: [
        { prompt: "Which Article says 'India, that is Bharat, shall be a Union of States'?", answer: "Article 1" },
        { prompt: "With whom do the residuary powers of legislation lie in India?", answer: "Parliament (the Centre), under Article 248" },
        { prompt: "What name is given to a constitution that is federal in form but has strong unitary features?", answer: "Quasi-federal" },
        { prompt: "Can an Indian State secede from the Union?", answer: "No" },
      ],
      traps: [
        {
          title: "India's States did not consent to form the Union",
          body: "The USA was formed by an **agreement** of States. India was **not**: that is the whole reason for the words 'Union of States'. An option saying the federating units agreed to form a union is the feature India lacks.",
        },
        {
          title: "Equal seats is American, not Indian",
          body: "Every US State has two Senators. In India the Fourth Schedule gives each State Rajya Sabha seats **by population**, so representation is unequal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-new-states",
      name: "Making and changing States (Articles 2 to 4)",
      intuition:
        "Because States are not partners to a treaty, Parliament can create, merge, split or rename them by an ordinary law. " +
        "The affected State is asked for its view, but it cannot stop the change.",
      definition:
        "The rules:\n" +
        "- **Article 2**: Parliament may admit or establish **new States** from outside India.\n" +
        "- **Article 3**: Parliament may form a new State, **increase or diminish the area** of any State, and **alter its boundaries or its name**.\n" +
        "- The Bill needs the **President's recommendation**, and the President first sends it to the State legislature for its **views**, which do **not bind** Parliament.\n" +
        "- It passes by a **simple majority** like an ordinary law.\n" +
        "- **Article 4**: such a law is **not an amendment under Article 368**, so no special majority and **no ratification by the States** is needed.\n" +
        "- Giving Indian territory to **another country** is different: it needs a constitutional amendment (the **100th Amendment, 2015**, for the land swap with Bangladesh).",
      table: {
        columns: ["Change", "Procedure"],
        rows: [
          {
            cells: ["Increase or reduce a State's area", "Ordinary law under Article 3"],
            pyqExampleId: "ffab1c4c-c5a5-4f01-9779-cebcf2300c96",
          },
          { cells: ["Change a State's boundary or name", "Ordinary law under Article 3"] },
          { cells: ["Form a new State", "Ordinary law under Article 3, simple majority"] },
          { cells: ["Hand territory to a foreign country", "Constitutional amendment under Article 368"] },
        ],
      },
      pyqExampleId: "7f6c60f4-f326-4381-a6b0-b2749a0de5c1",
      selfCheckExample: {
        prompt: "Parliament wants to rename a State. Must it obey the State legislature's opinion on the Bill?",
        steps: [
          "The President refers the Bill to the State legislature for its views.",
          "Article 3 does not make those views binding.",
        ],
        answer: "No. The State's views are asked for but do not bind Parliament.",
      },
      practiceSet: [
        { prompt: "Whose recommendation is needed before a Bill to form a new State is introduced?", answer: "The President's" },
        { prompt: "Which Article lets Parliament change the name of a State?", answer: "Article 3" },
        { prompt: "Which Article lets Parliament admit new States into the Union?", answer: "Article 2" },
      ],
      traps: [
        {
          title: "A new State is not a constitutional amendment",
          body: "Even though it changes the First Schedule, a law under Article 3 is **not** treated as an amendment (Article 4). No two-thirds majority and no State ratification is needed.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-special-provisions",
      name: "Special provisions: Articles 370 and 371",
      intuition:
        "Some States were given special arrangements to protect their customs, land or backward regions. " +
        "The Article 371 family runs alphabetically from 371A, and CDS asks which letter belongs to which State, so learn the list as a table.",
      definition:
        "The provisions:\n" +
        "- **Article 370** gave **Jammu and Kashmir** a special status: its own constitution, Article 35A on rights of permanent residents, the Directive Principles not applying, and Article 19(1)(f) on property still in force there. In **August 2019** the whole Constitution was applied to it, and Parliament split the State into two Union Territories.\n" +
        "- **Article 371**: development boards for regions of **Maharashtra and Gujarat**.\n" +
        "- **371A Nagaland** and **371G Mizoram**: no Act of Parliament on their **religious or social practices, customary law, justice under customary law, or ownership and transfer of land** applies unless the State Assembly agrees.\n" +
        "- **371F Sikkim**, **371I Goa** (minimum size of the Assembly), **371J Karnataka** (the Hyderabad-Karnataka region).",
      table: {
        columns: ["Article", "State", "Added by"],
        rows: [
          { cells: ["371", "Maharashtra and Gujarat", "Original"] },
          {
            cells: ["371A", "Nagaland", "13th Amendment, 1962"],
            pyqExampleId: "a8fa0887-765f-4a60-af67-f68e72b55ec2",
          },
          {
            cells: ["371B", "Assam", "22nd Amendment, 1969"],
            pyqExampleId: "b1e7b87c-a6d6-45d0-9026-bc215783f03d",
          },
          { cells: ["371C", "Manipur", "27th Amendment, 1971"] },
          { cells: ["371D", "Andhra Pradesh (and Telangana)", "32nd Amendment, 1973"] },
          { cells: ["371F", "Sikkim", "36th Amendment, 1975"] },
          {
            cells: ["371G", "Mizoram", "53rd Amendment, 1986"],
            noteAmber: "CDS 2024 (II): 371G protects land, not natural resources in general.",
            pyqExampleId: "6e16107e-ed15-454a-b3b8-8f71bb0f827b",
          },
          { cells: ["371H", "Arunachal Pradesh", "55th Amendment, 1986"] },
          {
            cells: ["371I", "Goa", "56th Amendment, 1987"],
            pyqExampleId: "399e680d-6a1c-4126-aecc-6ef694fe3426",
          },
          { cells: ["371J", "Karnataka", "98th Amendment, 2012"] },
        ],
      },
      pyqExampleId: "55288cda-d8d5-4af8-84d0-561bc9328f10",
      selfCheckExample: {
        prompt: "Article 371C and Article 371H give special provisions to two north-eastern States. Which ones?",
        steps: ["371A is Nagaland and 371B is Assam, so 371C is the next: Manipur.", "371G is Mizoram and 371H is Arunachal Pradesh."],
        answer: "371C is Manipur; 371H is Arunachal Pradesh.",
      },
      practiceSet: [
        { prompt: "Which Article gives special provisions for regions of Maharashtra and Gujarat?", answer: "Article 371" },
        { prompt: "Which Article gave special status to Jammu and Kashmir until 2019?", answer: "Article 370" },
        { prompt: "Under Article 371G, does an Act of Parliament on Mizo customary law apply in Mizoram without the State Assembly's agreement?", answer: "No. It applies only if the Mizoram Assembly so decides by a resolution" },
        { prompt: "Which Article gives special provisions for the Hyderabad-Karnataka region?", answer: "Article 371J" },
      ],
      traps: [
        {
          title: "371D is Andhra Pradesh, not Sikkim",
          body: "**371D** is Andhra Pradesh (and Telangana). Sikkim is **371F**, added when Sikkim became a State in 1975.",
        },
        {
          title: "Article 371 itself is Maharashtra and Gujarat",
          body: "The bare **Article 371** (no letter) covers development boards in **Maharashtra and Gujarat**. Goa is **371I**.",
        },
        {
          title: "Right to property survived in Jammu and Kashmir",
          body: "The 44th Amendment removed Article 19(1)(f) for the rest of India, but it was never extended to Jammu and Kashmir. So until 2019 the right to property stayed a Fundamental Right there.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-territories",
      name: "Delhi and the Union Territories",
      intuition:
        "Union Territories are run by the Centre, but a few have their own legislature. Their limits are set by Article 239AA for Delhi and by Acts of Parliament for the rest.",
      definition:
        "The facts:\n" +
        "- **Delhi** is a Union Territory with a legislature under **Article 239AA** (69th Amendment, 1991). Its Council of Ministers can be at most **10 per cent** of the Assembly.\n" +
        "- In a **State**, the Council of Ministers can be at most **15 per cent** of the Assembly (91st Amendment, 2003).\n" +
        "- **Dadra and Nagar Haveli and Daman and Diu** were merged into one Union Territory by an **Act of Parliament** in 2019. It has **two** Lok Sabha seats and stays under the **Bombay High Court**.\n" +
        "- In 2019, Jammu and Kashmir was split into two Union Territories: **Jammu and Kashmir** and **Ladakh**.",
      table: {
        columns: ["Unit", "Council of Ministers limit or fact"],
        rows: [
          {
            cells: ["A State", "At most 15 per cent of the Assembly"],
            pyqExampleId: "a06d7ce2-2a84-4633-b1c0-2215a1ca937b",
          },
          { cells: ["Delhi (Article 239AA)", "At most 10 per cent of the Assembly"] },
          { cells: ["Dadra and Nagar Haveli and Daman and Diu", "Merged by an Act of Parliament; 2 Lok Sabha seats; Bombay High Court"] },
        ],
      },
      pyqExampleId: "1f5ab234-09a0-4bfb-a0b5-64eac8441f72",
      selfCheckExample: {
        prompt: "Delhi's Legislative Assembly has 70 members. At most how many ministers can its Council of Ministers have?",
        steps: ["Article 239AA caps Delhi's Council of Ministers at 10 per cent of the Assembly.", "10 per cent of 70 is 7."],
        answer: "7.",
      },
      practiceSet: [
        { prompt: "Which Article gives Delhi its Legislative Assembly?", answer: "Article 239AA" },
        { prompt: "Into which two Union Territories was Jammu and Kashmir divided in 2019?", answer: "Jammu and Kashmir, and Ladakh" },
        { prompt: "What is the largest size of a State's Council of Ministers, as a share of its Assembly?", answer: "15 per cent" },
      ],
      traps: [
        {
          title: "Delhi is 10 per cent, the States 15",
          body: "The 15 per cent limit of the 91st Amendment is for the Lok Sabha and State Assemblies. Delhi, a Union Territory, has its own **10 per cent** limit under Article 239AA.",
        },
      ],
    },
  ],
};
