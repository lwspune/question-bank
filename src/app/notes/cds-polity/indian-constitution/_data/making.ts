import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_MAKING_NOTE: SubtopicNote = {
  subtopicName: "Making of the Constitution",
  title: "Making of the Constitution",
  oneLineDefinition:
    "How the Constituent Assembly was chosen, who drafted the Constitution, and the steps from the Indian Independence Act of 1947 to the Republic of 26 January 1950.",
  whyItMatters:
    "Eleven CDS questions, and four of them are HARD. They ask how the Assembly was elected, who sat on the Drafting Committee, and which dates and Articles began and ended the old order. The wrong options are always a nearby name or a nearby date, so learn each fact with the one it is confused with.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-assembly",
      name: "The Constituent Assembly",
      intuition:
        "India's Constitution was written by an Assembly of Indians, but that Assembly was not elected by the people directly. " +
        "It was set up under a British plan of 1946, and its members were chosen by the provincial legislatures that had been elected a few months before.",
      definition:
        "The facts CDS asks:\n" +
        "- The scheme came from the **Cabinet Mission Plan of 1946**, not the Mountbatten Plan of 1947.\n" +
        "- Members from the provinces were **elected indirectly** by the members of the **Provincial Legislative Assemblies**. There was **no universal adult franchise**.\n" +
        "- Seats were shared out by population, about one seat for every ten lakh people.\n" +
        "- Total strength **389**: 292 from the Governors' provinces, 4 from the Chief Commissioners' provinces and **93 from the Princely States**. After Partition it fell to 299.\n" +
        "- First meeting **9 December 1946**; **Dr Rajendra Prasad** was elected its President.\n" +
        "- Nehru moved the **Objectives Resolution** on **13 December 1946**; it was adopted on 22 January 1947 and became the basis of the Preamble.",
      table: {
        columns: ["Date", "Event"],
        rows: [
          { cells: ["1946 (July to August)", "Elections to the Assembly by the provincial legislatures"] },
          { cells: ["9 December 1946", "First meeting of the Constituent Assembly"] },
          {
            cells: ["13 December 1946", "Nehru moves the Objectives Resolution"],
            noteAmber: "CDS 2018 (II): it was 'a declaration, a firm resolve and a pledge' and gave the Constitution its philosophy.",
            pyqExampleId: "a8b0a1a5-6c6e-4a80-936e-dac6b004823e",
          },
          { cells: ["22 January 1947", "Objectives Resolution adopted"] },
          { cells: ["29 August 1947", "Drafting Committee set up under Dr B. R. Ambedkar"] },
          { cells: ["4 November 1948", "Ambedkar moves the Draft Constitution in the Assembly"] },
          { cells: ["26 November 1949", "Constitution adopted"] },
          { cells: ["26 January 1950", "Constitution comes into force; India becomes a Republic"] },
        ],
      },
      pyqExampleId: "45010b54-d50f-41f2-a576-67560dc226bf",
      selfCheckExample: {
        prompt: "The Constituent Assembly was planned with 389 seats. How many of them went to the Princely States, and how many does that leave for British India?",
        steps: [
          "The Princely States were given 93 seats.",
          "389 minus 93 leaves 296: 292 for the Governors' provinces and 4 for the Chief Commissioners' provinces.",
        ],
        answer: "93 for the Princely States and 296 for British India.",
      },
      practiceSet: [
        { prompt: "Who moved the Objectives Resolution in the Constituent Assembly?", answer: "Jawaharlal Nehru, on 13 December 1946" },
        { prompt: "On what date did the Constituent Assembly first meet?", answer: "9 December 1946" },
        { prompt: "Who was the President of the Constituent Assembly?", answer: "Dr Rajendra Prasad" },
        { prompt: "On what date did the Constituent Assembly adopt the Constitution?", answer: "26 November 1949" },
      ],
      traps: [
        {
          title: "Cabinet Mission, not Mountbatten",
          body: "The election scheme and the share of seats came from the **Cabinet Mission Plan of 1946**. The Mountbatten Plan of June 1947 was about Partition, and the Assembly already existed by then.",
        },
        {
          title: "Indirect election, no adult franchise",
          body: "Nobody voted directly for the Constituent Assembly. Its provincial members were chosen by the **Provincial Legislative Assemblies**, which had themselves been elected on a limited franchise.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-people",
      name: "The people behind the Constitution",
      intuition:
        "One adviser wrote the first draft, a seven-member committee turned it into the Draft Constitution, and the whole Assembly debated it clause by clause. " +
        "CDS asks who held which job, and likes to put the adviser among the committee members.",
      definition:
        "Who did what:\n" +
        "- **Sir B. N. Rau** was the **Constitutional Adviser** to the Assembly and prepared the first draft. He was **not** a member of the Drafting Committee.\n" +
        "- The **Drafting Committee** had seven members: **Dr B. R. Ambedkar** (chairman), N. Gopalaswami Ayyangar, **Alladi Krishnaswami Ayyar**, **K. M. Munshi**, Syed Muhammad Saadulla, N. Madhava Rau and T. T. Krishnamachari.\n" +
        "- Alladi Krishnaswami Ayyar, a leading lawyer, wanted the **Supreme Court** to interpret the Constitution and to draw the line between liberty and social control.\n" +
        "- In his last speech on **25 November 1949**, Ambedkar warned that on 26 January 1950 India would enter **a life of contradictions**: equality in politics (one person, one vote) but inequality in social and economic life.\n" +
        "- Much later, in **2000**, the government set up the **National Commission to Review the Working of the Constitution**, chaired by **Justice M. N. Venkatachaliah**. It reported in 2002.",
      table: {
        columns: ["Person", "Role"],
        rows: [
          {
            cells: ["Sir B. N. Rau", "Constitutional Adviser; prepared the first draft"],
            noteAmber: "CDS 2020 (II): the adviser to the Constituent Assembly was B. N. Rau.",
            pyqExampleId: "9d5b1436-7cd6-4bcb-a9c3-4ba881c28d92",
          },
          { cells: ["Dr B. R. Ambedkar", "Chairman of the Drafting Committee"] },
          { cells: ["Dr Rajendra Prasad", "President of the Assembly"] },
          {
            cells: ["Alladi Krishnaswami Ayyar", "Drafting Committee member; backed a strong Supreme Court"],
            pyqExampleId: "e3d5456b-67cd-4675-bd4e-d5ed7c0a33f8",
          },
          { cells: ["K. M. Munshi, N. Gopalaswami Ayyangar", "Drafting Committee members"] },
          { cells: ["Jawaharlal Nehru", "Moved the Objectives Resolution; chaired the Union Powers Committee"] },
          { cells: ["Sardar Vallabhbhai Patel", "Chaired the Advisory Committee on Fundamental Rights and Minorities"] },
          {
            cells: ["Justice M. N. Venkatachaliah", "Chaired the Commission to Review the Working of the Constitution (2000)"],
            pyqExampleId: "9deb8f87-e061-4720-b0a3-6fe847ca865c",
          },
        ],
      },
      pyqExampleId: "3598bb89-42cc-44bc-83f1-9b1d6e110524",
      selfCheckExample: {
        prompt: "Alladi Krishnaswami Ayyar was a member of the Drafting Committee. What job did he want the Supreme Court to do?",
        steps: [
          "He wanted the Supreme Court to have the final word on what the Constitution means.",
          "He also wanted it to decide where individual liberty ends and social control begins.",
        ],
        answer: "Interpret the Constitution, and draw the line between liberty and social control.",
      },
      practiceSet: [
        { prompt: "Who chaired the Drafting Committee of the Constituent Assembly?", answer: "Dr B. R. Ambedkar" },
        { prompt: "Who said that on 26 January 1950 India would enter a life of contradictions?", answer: "Dr B. R. Ambedkar" },
        { prompt: "Who chaired the National Commission to Review the Working of the Constitution set up in 2000?", answer: "Justice M. N. Venkatachaliah" },
        { prompt: "How many members did the Drafting Committee have?", answer: "Seven" },
      ],
      traps: [
        {
          title: "B. N. Rau advised; he did not sit on the Drafting Committee",
          body: "B. N. Rau prepared the first draft as **Constitutional Adviser**. Options that list him as a Drafting Committee member are wrong; Munshi, Ayyangar, Ayyar and Saadulla were members.",
        },
        {
          title: "Two chairs, two men",
          body: "**Rajendra Prasad** presided over the whole Assembly. **Ambedkar** chaired only the Drafting Committee.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-commencement",
      name: "From the 1947 Act to 26 January 1950",
      intuition:
        "Between Independence and the Republic, India was run under the old British law, changed to suit a free country. " +
        "The new Constitution was adopted on 26 November 1949, but only a few of its Articles began that day; the rest waited for 26 January 1950, when the old Acts were repealed.",
      definition:
        "The steps:\n" +
        "- The **Indian Independence Act, 1947** ended British rule from 15 August 1947. India **ceased to be a dependency**, the Crown stopped being the source of authority, the **Governor-General became a constitutional head**, and the **Government of India Act, 1935** (amended) served as the interim constitution.\n" +
        "- **26 November 1949**: under **Article 394**, a few provisions began at once, among them **citizenship** (Articles 5 to 9), **elections** (Article 324) and the **provisional Parliament** (Article 379).\n" +
        "- **26 January 1950**: the rest of the Constitution, including the **Fundamental Rights**, came into force.\n" +
        "- **Article 395** repealed the **Indian Independence Act, 1947** and the **Government of India Act, 1935**. It kept alive the Abolition of Privy Council Jurisdiction Act, 1949.",
      table: {
        columns: ["Provision", "Came into force"],
        rows: [
          { cells: ["Citizenship (Articles 5 to 9)", "26 November 1949"] },
          { cells: ["Elections (Article 324)", "26 November 1949"] },
          { cells: ["Provisional Parliament (Article 379)", "26 November 1949"] },
          { cells: ["Fundamental Rights (Part III)", "26 January 1950"] },
          {
            cells: ["Repeal of the 1935 and 1947 Acts (Article 395)", "26 January 1950"],
            noteAmber: "CDS 2016 (II): Article 395 repealed the 1935 and 1947 Acts only, not the Privy Council Act of 1949.",
            pyqExampleId: "54683caa-80ef-48f2-bcf9-f75464fd706c",
          },
        ],
      },
      pyqExampleId: "35a8aa00-4f20-4144-85f5-b7bad34eb74c",
      selfCheckExample: {
        prompt: "Which Article of the Constitution repealed the Government of India Act, 1935?",
        steps: [
          "The repeal of the old Acts is in the last Article of the Constitution.",
          "That Article also repealed the Indian Independence Act, 1947.",
        ],
        answer: "Article 395.",
      },
      practiceSet: [
        { prompt: "Which Act served as India's interim constitution from 1947 to 1950?", answer: "The Government of India Act, 1935, as amended" },
        { prompt: "Which Article brought a few provisions of the Constitution into force on 26 November 1949?", answer: "Article 394" },
        { prompt: "Which Act ended British rule in India from 15 August 1947?", answer: "The Indian Independence Act, 1947" },
        { prompt: "Under the Indian Independence Act, 1947, what kind of head did the Governor-General become?", answer: "A constitutional head" },
      ],
      traps: [
        {
          title: "Adopted is not the same as in force",
          body: "The Constitution was **adopted on 26 November 1949**, but most of it, including the Fundamental Rights, came into force on **26 January 1950**. Only citizenship, elections, the provisional Parliament and a few other provisions began in 1949.",
        },
        {
          title: "Article 395 did not repeal every old law",
          body: "It repealed the **1935** and **1947** Acts. The **1919** Act had already been replaced by the 1935 Act, and the Abolition of Privy Council Jurisdiction Act, 1949 was expressly kept.",
        },
      ],
    },
  ],
};
