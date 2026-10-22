import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_SCHEDULES_NOTE: SubtopicNote = {
  subtopicName: "Parts, Schedules and Citizenship",
  title: "Parts, Schedules and Citizenship",
  oneLineDefinition:
    "What each of the twelve Schedules contains, the tribal-area Schedules (Fifth and Sixth) in detail, the languages of the Eighth Schedule, and citizenship under Part II.",
  whyItMatters:
    "Fifteen CDS questions, twelve of them MODERATE. A Schedule question gives a number and asks its content, or the other way round, so the table of twelve is the single most useful thing on this page. The Fifth and Sixth Schedules and the Eighth Schedule languages have each come up more than once.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-schedules",
      name: "The twelve Schedules and the main Parts",
      intuition:
        "The Articles are grouped into Parts, and the long lists that would clutter the Articles are put at the end as Schedules. " +
        "A Schedule question is a matching question: learn the twelve in order, one line each.",
      definition:
        "Parts CDS asks about:\n" +
        "- **Part I** (Articles 1 to 4): the Union and its territory. **Part II** (Articles 5 to 11): citizenship.\n" +
        "- **Part III** (Articles 12 to 35): Fundamental Rights. **Part IV** (Articles 36 to 51): Directive Principles; **Article 50** asks the State to **separate the judiciary from the executive**.\n" +
        "- **Part XVIII** (Articles 352 to 360): emergency. **Part XX** (Article 368): amendment.\n\n" +
        "The **Ninth Schedule** was added by the **First Amendment, 1951** with **Article 31B**: a law placed in it is **not void** just because it takes away a Fundamental Right. The legislature can still amend or repeal such a law, and since the **I. R. Coelho case (2007)** the courts can test laws added after 24 April 1973 against the basic structure.",
      table: {
        columns: ["Schedule", "Contents"],
        rows: [
          { cells: ["First", "Names of the States and Union Territories, and their territories"] },
          { cells: ["Second", "Pay and allowances of the President, Governors, judges, the CAG and others"] },
          { cells: ["Third", "Forms of oaths and affirmations"] },
          {
            cells: ["Fourth", "Allocation of Rajya Sabha seats to the States and Union Territories"],
            noteAmber: "CDS 2022 (II): of four Schedule pairs, only the Fifth was correctly matched.",
            pyqExampleId: "46cb4e86-7aa6-4947-9142-dfbf1103b2fe",
          },
          { cells: ["Fifth", "Administration of Scheduled Areas and Scheduled Tribes"] },
          { cells: ["Sixth", "Tribal areas of Assam, Meghalaya, Tripura and Mizoram"] },
          { cells: ["Seventh", "Union List, State List and Concurrent List"] },
          { cells: ["Eighth", "The 22 official languages"] },
          {
            cells: ["Ninth", "Laws protected from challenge on Fundamental Rights (First Amendment, 1951)"],
            pyqExampleId: "a8ce79a7-53ef-4ed0-9ad3-22ce6426f536",
          },
          { cells: ["Tenth", "Anti-defection rules (52nd Amendment, 1985)"] },
          { cells: ["Eleventh", "Powers of Panchayats, 29 subjects (73rd Amendment, 1992)"] },
          { cells: ["Twelfth", "Powers of Municipalities, 18 subjects (74th Amendment, 1992)"] },
        ],
      },
      pyqExampleId: "d3327b46-a271-48ba-95e5-81379698e924",
      selfCheckExample: {
        prompt: "In which Schedule of the Constitution would you find the forms of oath taken by a Union minister?",
        steps: ["Oaths and affirmations are listed together in one Schedule.", "It comes just after the Second Schedule on salaries."],
        answer: "The Third Schedule.",
      },
      practiceSet: [
        { prompt: "Which Schedule contains the anti-defection rules?", answer: "The Tenth Schedule" },
        { prompt: "Which Schedule lists the names of the States and Union Territories?", answer: "The First Schedule" },
        { prompt: "In which Part of the Constitution are the Directive Principles of State Policy?", answer: "Part IV" },
        { prompt: "Which amendment added the Ninth Schedule to the Constitution?", answer: "The First Amendment, 1951" },
        { prompt: "Which Article asks the State to separate the judiciary from the executive?", answer: "Article 50" },
      ],
      traps: [
        {
          title: "Third is oaths, Fourth is Rajya Sabha seats",
          body: "The **Third Schedule** holds the forms of oaths. The **Fourth Schedule** allots Rajya Sabha seats to each State. The First Schedule is the list of States and Union Territories.",
        },
        {
          title: "The Ninth Schedule shields laws, not courts",
          body: "A law in the Ninth Schedule is **not void** for breaking a Fundamental Right (Article 31B). It is still open to repeal or amendment by the legislature, and to review on basic-structure grounds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-tribal",
      name: "The Fifth and Sixth Schedules",
      intuition:
        "Two Schedules protect tribal people, in two different ways. " +
        "The Sixth Schedule gives four north-eastern States elected councils that make their own rules; the Fifth covers tribal areas everywhere else and leaves the Governor in charge.",
      definition:
        "The **Sixth Schedule**:\n" +
        "- covers the tribal areas of **Assam, Meghalaya, Tripura and Mizoram** only;\n" +
        "- sets up **Autonomous District Councils** (and regional councils) that can make laws, collect some taxes and run courts on customary law.\n\n" +
        "The **Fifth Schedule**:\n" +
        "- covers **Scheduled Areas** in all **other** States;\n" +
        "- a **Tribes Advisory Council** advises on the welfare of the Scheduled Tribes;\n" +
        "- the **Governor** reports to the **President** annually or when asked, and the **Union** can give the State directions on these areas;\n" +
        "- the Governor **can make regulations** that prohibit or restrict the **transfer of land** by or among Scheduled Tribe members.",
      table: {
        columns: ["Point", "Fifth Schedule", "Sixth Schedule"],
        rows: [
          { cells: ["Where", "Scheduled Areas in States other than the four", "Assam, Meghalaya, Tripura, Mizoram"] },
          { cells: ["Body", "Tribes Advisory Council (advises)", "Autonomous District Councils (make laws)"] },
          {
            cells: ["Land", "Governor may make regulations restricting land transfer by or among Scheduled Tribes", "District Councils make laws on land, forests and customs"],
            noteAmber: "CDS 2019 (II): the false statement denied the Governor's power to restrict land transfer.",
            pyqExampleId: "e14551fe-8f45-4ab5-abff-ac0ff4ac4e16",
          },
          {
            cells: ["Oversight", "Governor reports to the President; the Union can give the State directions", "Governor can create, merge or change autonomous districts"],
            pyqExampleId: "bf9f78ba-98c2-437e-b4a0-d18d2f9bbfd2",
          },
        ],
      },
      pyqExampleId: "1a0028ca-4cec-42f3-b2c1-1c19e5522ee5",
      selfCheckExample: {
        prompt: "Tribal areas of Manipur are not covered by the Sixth Schedule. Which four States are?",
        steps: ["The Sixth Schedule is for four north-eastern States only.", "Manipur and Arunachal Pradesh are not among them."],
        answer: "Assam, Meghalaya, Tripura and Mizoram.",
      },
      practiceSet: [
        { prompt: "Which body advises on tribal welfare in a State with Fifth Schedule areas?", answer: "The Tribes Advisory Council" },
        { prompt: "Under the Fifth Schedule, to whom does the Governor report on the Scheduled Areas?", answer: "The President" },
        { prompt: "Does the Sixth Schedule apply to Arunachal Pradesh?", answer: "No. It applies only to Assam, Meghalaya, Tripura and Mizoram" },
      ],
      traps: [
        {
          title: "District councils belong to the Sixth, not the Fifth",
          body: "**Autonomous District Councils** are a **Sixth Schedule** body. The Fifth Schedule has only a Tribes Advisory Council, which advises and does not make laws.",
        },
        {
          title: "Manipur is not a Sixth Schedule State",
          body: "The four Sixth Schedule States are **Assam, Meghalaya, Tripura and Mizoram**. Options often slip in Manipur or Arunachal Pradesh.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-languages",
      name: "The Eighth Schedule languages",
      intuition:
        "The Eighth Schedule began with 14 languages and has grown to 22 through three amendments. " +
        "Learn the three groups of additions with their years; any language outside the 22, however widely spoken, is the 'not listed' option.",
      definition:
        "How the list grew:\n" +
        "- **Original 14** (1950), including Hindi, Urdu, **Kashmiri**, Sanskrit, Bengali and Tamil.\n" +
        "- **Sindhi**: **21st Amendment, 1967**.\n" +
        "- **Konkani, Manipuri, Nepali**: **71st Amendment, 1992**.\n" +
        "- **Bodo, Dogri, Maithili, Santhali**: **92nd Amendment, 2003**, the latest additions.\n" +
        "- Widely spoken languages such as **Gondi**, Bhili and English are **not** in the Schedule.",
      table: {
        columns: ["Languages added", "Amendment", "Year"],
        rows: [
          {
            cells: ["Sindhi", "21st", "1967"],
            pyqExampleId: "3d0492cf-530f-43b7-a822-50ee66573df4",
          },
          { cells: ["Konkani, Manipuri, Nepali", "71st", "1992"] },
          { cells: ["Bodo, Dogri, Maithili, Santhali", "92nd", "2003"] },
          {
            cells: ["Not listed: Gondi", "None", "Never added"],
            noteAmber: "CDS 2025 (II): Gondi was the language not in the Eighth Schedule.",
            pyqExampleId: "b988d93a-5914-4743-a047-011b62aaac87",
          },
        ],
      },
      pyqExampleId: "109ca8d8-3808-4bcb-b92f-dd8cf2b3b9a8",
      selfCheckExample: {
        prompt: "Were Kashmiri and Urdu added to the Eighth Schedule by an amendment?",
        steps: ["Both were among the original 14 languages of 1950.", "The first language added later was Sindhi, in 1967."],
        answer: "No. Both were in the original list.",
      },
      practiceSet: [
        { prompt: "How many languages are in the Eighth Schedule today?", answer: "22" },
        { prompt: "Which amendment added Konkani, Manipuri and Nepali to the Eighth Schedule?", answer: "The 71st Amendment, 1992" },
        { prompt: "How many languages did the Eighth Schedule have when the Constitution began?", answer: "14" },
      ],
      traps: [
        {
          title: "Nepali and Manipuri are older than Maithili and Dogri",
          body: "Konkani, Manipuri and Nepali came in **1992**. Bodo, Dogri, Maithili and Santhali came in **2003**, so any of those four is the most recent addition.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-citizenship",
      name: "Citizenship",
      intuition:
        "The Constitution itself only says who was a citizen on the day it began. Everything after that, how a person becomes or stops being a citizen, is left to an ordinary law of Parliament, the Citizenship Act of 1955.",
      definition:
        "The rules:\n" +
        "- Citizenship is **Part II**, **Articles 5 to 11**. Articles 5 to 8 say who was a citizen at the start; **Article 11** lets Parliament make laws on citizenship.\n" +
        "- The **Citizenship Act, 1955** governs citizenship **on or after 26 January 1950**. It can be gained by birth, descent, registration, naturalisation or incorporation of territory.\n" +
        "- It is **lost** by **renunciation** (giving it up), **termination** (voluntarily taking another country's citizenship) or **deprivation** (taken away by the government, for example for fraud).\n" +
        "- India has **single citizenship**. Marrying a foreigner or criticising the government does **not** end it.\n" +
        "- The **Citizenship (Amendment) Act, 2019** eased citizenship for Hindu, Sikh, Buddhist, Jain, Parsi and Christian migrants from Afghanistan, Bangladesh and Pakistan, but it does **not apply** to the **Sixth Schedule** tribal areas or to areas under the Inner Line Permit.",
      table: {
        columns: ["Way citizenship ends", "What happens"],
        rows: [
          { cells: ["Renunciation", "The citizen gives up Indian citizenship by declaration"] },
          { cells: ["Termination", "The citizen voluntarily acquires another country's citizenship"] },
          { cells: ["Deprivation", "The government takes it away, for example for fraud or disloyalty"] },
        ],
      },
      pyqExampleId: "8631a68e-f300-4b6a-babe-e02cca18acb5",
      selfCheckExample: {
        prompt: "Which law decides how a person becomes an Indian citizen today, and from which date does it apply?",
        steps: ["Part II of the Constitution only settled who was a citizen at the start.", "Later citizenship is governed by an Act of Parliament made under Article 11."],
        answer: "The Citizenship Act, 1955, for citizenship on or after 26 January 1950.",
      },
      practiceSet: [
        { prompt: "Which Article lets Parliament make laws on citizenship?", answer: "Article 11" },
        { prompt: "Which areas are kept out of the Citizenship (Amendment) Act, 2019?", answer: "The Sixth Schedule tribal areas and the Inner Line Permit areas" },
        { prompt: "Does India give dual citizenship of the Union and a State?", answer: "No. India has single citizenship" },
        { prompt: "Name three ways a person can acquire Indian citizenship under the 1955 Act.", answer: "Any three of birth, descent, registration, naturalisation, incorporation of territory" },
      ],
      traps: [
        {
          title: "Citizenship is Part II, not Part I",
          body: "Part I (Articles 1 to 4) is the Union and its territory. Citizenship is **Part II**, Articles 5 to 11, and the Citizenship (Amendment) Act is made under that Part.",
        },
        {
          title: "Marriage does not end citizenship",
          body: "Marrying a foreign citizen does **not** take away Indian citizenship. Only renunciation, termination and deprivation do.",
        },
      ],
    },
  ],
};
