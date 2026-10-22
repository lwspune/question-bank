import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_RELATIONS_NOTE: SubtopicNote = {
  subtopicName: "Centre-State Relations",
  title: "Centre-State Relations",
  oneLineDefinition:
    "How the Seventh Schedule divides law-making between the Union, State and Concurrent Lists, and the commissions and councils set up to manage relations between the Centre and the States.",
  whyItMatters:
    "Nine CDS questions, three of them HARD. Five ask which List a subject sits in, every one of them from 2021 (II) onwards, so this has become a regular question. The other four ask about the commissions, the councils and Special Category Status, where a number or a year is the whole question.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-lists",
      name: "The Union, State and Concurrent Lists",
      intuition:
        "Article 246 and the Seventh Schedule split the subjects of law-making three ways. " +
        "Subjects that need one rule for the whole country go to the Union, local matters to the States, and shared matters to the Concurrent List, where a Union law wins if the two clash.",
      definition:
        "The rules:\n" +
        "- **Union List**: only Parliament makes laws. Defence, foreign affairs, banking, **insurance**, **census**, atomic energy, railways.\n" +
        "- **State List**: normally only the State makes laws. **Public order**, police, **land**, **local government**, public health, agriculture, and taxes tied to **agricultural land**: tax on agricultural income, succession duty and estate duty on agricultural land, taxes on lands and buildings.\n" +
        "- **Concurrent List**: both can make laws; if they clash, the Union law prevails. **Criminal law** and criminal procedure, **civil procedure**, marriage and divorce, **economic and social planning**, **price control**, education, **forests**.\n" +
        "- The **42nd Amendment, 1976** moved five subjects from the State List to the Concurrent List: **education, forests**, weights and measures, protection of wild animals and birds, and administration of justice.\n" +
        "- **Residuary powers** (subjects in no list) belong to **Parliament** (Article 248).",
      table: {
        columns: ["Subject", "List"],
        rows: [
          {
            cells: ["Insurance", "Union"],
            pyqExampleId: "2325a50a-b348-4aee-bcfb-7f787520c142",
          },
          { cells: ["Census", "Union"] },
          { cells: ["Public order, land, local government", "State"] },
          {
            cells: ["Tax on agricultural income; succession and estate duty on agricultural land", "State"],
            pyqExampleId: "798cf956-0c26-4725-88e3-5673c32a969f",
          },
          { cells: ["Taxes on lands and buildings", "State"] },
          {
            cells: ["Criminal law, criminal procedure, civil procedure", "Concurrent"],
            noteAmber: "CDS 2024 (II): criminal law is NOT a State List subject; it is Concurrent.",
            pyqExampleId: "9268a65b-4222-4075-98f0-1a7322b4bba6",
          },
          {
            cells: ["Economic and social planning, price control", "Concurrent"],
            pyqExampleId: "72eeab87-13f7-4da0-81f3-73d86f06c043",
          },
          { cells: ["Forests, education (moved in 1976)", "Concurrent"] },
        ],
      },
      pyqExampleId: "dc33078d-713e-44b4-a1f8-f99102881ef9",
      selfCheckExample: {
        prompt: "A State law and a Union law on marriage and divorce contradict each other. Which one prevails, and why?",
        steps: [
          "Marriage and divorce is a Concurrent List subject, so both may make laws on it.",
          "On a clash in the Concurrent List, the Union law prevails.",
        ],
        answer: "The Union law, because the subject is in the Concurrent List.",
      },
      practiceSet: [
        { prompt: "In which List is police?", answer: "The State List" },
        { prompt: "Which amendment moved education and forests to the Concurrent List?", answer: "The 42nd Amendment, 1976" },
        { prompt: "Who can make laws on a subject that is in none of the three Lists?", answer: "Parliament (residuary power, Article 248)" },
        { prompt: "In which List is banking?", answer: "The Union List" },
      ],
      traps: [
        {
          title: "Criminal law is Concurrent",
          body: "Police and public order are State subjects, but **criminal law** and **criminal procedure** are in the **Concurrent List**. Do not let 'police is State' drag criminal law there too.",
        },
        {
          title: "Forests left the State List in 1976",
          body: "**Forests** and **education** were State subjects in 1950. The 42nd Amendment moved them to the **Concurrent List**.",
        },
        {
          title: "Planning is shared",
          body: "**Economic and social planning** is a **Concurrent** subject, not a State one, even though public order, land and local government are all in the State List.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-commissions",
      name: "Commissions and councils on Centre-State relations",
      intuition:
        "Whenever relations between the Centre and the States got tense, the government asked a commission for advice, and some advice led to new councils. " +
        "Learn each body with its year and its one famous recommendation.",
      definition:
        "The bodies:\n" +
        "- **Zonal Councils**: **five** (Northern, Central, Eastern, Western, Southern), set up by **Part III of the States Reorganisation Act, 1956**. The North Eastern Council came later, by a separate Act of 1971.\n" +
        "- **Sarkaria Commission** (1983 to 1988): recommended a permanent **Inter-State Council**.\n" +
        "- **Inter-State Council**: set up in **1990** under **Article 263**, on Sarkaria's advice. The Prime Minister chairs it.\n" +
        "- **Punchhi Commission** (set up 2007, reported 2010): among much else, said a State Bill **reserved for the President** should be decided within **six months**.\n" +
        "- **Special Category Status** for States (from 1969): given for **hilly and difficult terrain**, low population density or a **sizeable tribal population**, a strategic location on **international borders**, **economic and infrastructural backwardness**, and weak State finances.",
      table: {
        columns: ["Body", "Year", "Known for"],
        rows: [
          {
            cells: ["Zonal Councils (5)", "1956", "Set up by the States Reorganisation Act"],
            pyqExampleId: "6523fe7b-eaad-4703-8304-230abdb9536e",
          },
          { cells: ["Rajamannar Committee", "1969", "Set up by Tamil Nadu to study Centre-State relations"] },
          { cells: ["Sarkaria Commission", "1983", "Recommended a permanent Inter-State Council"] },
          { cells: ["Inter-State Council", "1990", "Set up under Article 263; chaired by the Prime Minister"] },
          {
            cells: ["Punchhi Commission", "2007", "Six months to decide a State Bill reserved for the President"],
            pyqExampleId: "e1b37e7d-822e-4406-814d-16c25ab2c87c",
          },
        ],
      },
      pyqExampleId: "9ad4499d-0d1f-477d-ae42-2a3698601009",
      selfCheckExample: {
        prompt: "Name the five Zonal Councils set up in 1956.",
        steps: ["They were set up by Part III of the States Reorganisation Act, 1956.", "One council for each of five zones of the country."],
        answer: "Northern, Central, Eastern, Western and Southern.",
      },
      practiceSet: [
        { prompt: "Under which Article of the Constitution is the Inter-State Council set up?", answer: "Article 263" },
        { prompt: "Who chairs the Inter-State Council?", answer: "The Prime Minister" },
        { prompt: "Is a strategic coastal zone one of the criteria for Special Category Status?", answer: "No. The strategic criterion is a location along international borders" },
        { prompt: "By which Act was the North Eastern Council set up?", answer: "A separate Act of Parliament of 1971" },
      ],
      traps: [
        {
          title: "Sarkaria came before Punchhi",
          body: "The Inter-State Council of **1990** followed the **Sarkaria** Commission. The **Punchhi** Commission came much later, in **2007**, so it cannot be the source.",
        },
        {
          title: "Five Zonal Councils, not six",
          body: "The 1956 Act set up **five** Zonal Councils. The North Eastern Council is a separate body, made by an Act of 1971.",
        },
      ],
    },
  ],
};
