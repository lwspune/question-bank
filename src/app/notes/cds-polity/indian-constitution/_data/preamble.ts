import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_CO_PREAMBLE_NOTE: SubtopicNote = {
  subtopicName: "Sources and the Preamble",
  title: "Sources and the Preamble",
  oneLineDefinition:
    "Which features the Constitution borrowed from which country, the exact words of the Preamble in their order, and the three words the 42nd Amendment added in 1976.",
  whyItMatters:
    "Five CDS questions, all MODERATE, four of them on the Preamble. Every Preamble question turns on the exact text: which word comes first, which word was there in 1949 and which came in 1976. Read the Preamble slowly once and these become free marks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolco-sources",
      name: "Features borrowed from other constitutions",
      intuition:
        "The makers of the Constitution studied many constitutions and took what worked. " +
        "The quickest way to remember the sources is by idea: the way Parliament works came from Britain, the rights and the courts from the USA, and the guiding principles from Ireland.",
      definition:
        "The main sources:\n" +
        "- **Britain**: the **parliamentary system**, the **rule of law**, the **law-making procedure**, single citizenship, the cabinet system.\n" +
        "- **USA**: **Fundamental Rights**, **independence of the judiciary** and judicial review, impeachment of the President, the Vice-President.\n" +
        "- **Ireland**: the **Directive Principles**, nomination of members to the Rajya Sabha.\n" +
        "- **Canada**: a federation with a **strong Centre**, residuary powers with the Centre.\n" +
        "- **Australia**: the **Concurrent List**, the joint sitting of the two Houses.\n" +
        "- **USSR**: the **Fundamental Duties**. **France**: the ideals of liberty, equality and fraternity, and the republic.\n" +
        "- **Weimar Germany**: suspension of Fundamental Rights during an emergency. **South Africa**: the procedure for amending the Constitution.\n" +
        "- **Government of India Act, 1935**: the federal scheme, the office of Governor, the emergency provisions.",
      table: {
        columns: ["Source", "Features taken"],
        rows: [
          {
            cells: ["Britain", "Parliamentary system, rule of law, law-making procedure, single citizenship"],
            noteAmber: "CDS 2017 (II): independence of the judiciary was the one feature in the list NOT from Britain.",
            pyqExampleId: "a0ed71e3-1bee-413f-86e7-53f259a6d5ae",
          },
          { cells: ["USA", "Fundamental Rights, independent judiciary, judicial review"] },
          { cells: ["Ireland", "Directive Principles of State Policy"] },
          { cells: ["Canada", "Federation with a strong Centre"] },
          { cells: ["Australia", "Concurrent List, joint sitting"] },
          { cells: ["USSR", "Fundamental Duties"] },
          { cells: ["France", "Republic; liberty, equality and fraternity"] },
          { cells: ["Weimar Germany", "Suspending Fundamental Rights in an emergency"] },
          { cells: ["South Africa", "Procedure for amending the Constitution"] },
          { cells: ["Government of India Act, 1935", "Federal scheme, Governor, emergency provisions"] },
        ],
      },
      pyqExampleId: "a0ed71e3-1bee-413f-86e7-53f259a6d5ae",
      selfCheckExample: {
        prompt: "The Directive Principles of State Policy and the Fundamental Duties came from two different countries. Name them.",
        steps: ["The Directive Principles were modelled on the Irish constitution.", "The Fundamental Duties came from the constitution of the USSR."],
        answer: "Ireland for the Directive Principles, the USSR for the Fundamental Duties.",
      },
      practiceSet: [
        { prompt: "From which country's constitution did India take the Concurrent List?", answer: "Australia" },
        { prompt: "From which country did India take the idea of a federation with a strong Centre?", answer: "Canada" },
        { prompt: "From which country did India take the procedure for amending the Constitution?", answer: "South Africa" },
        { prompt: "Which earlier Act gave the Constitution its emergency provisions and the office of Governor?", answer: "The Government of India Act, 1935" },
      ],
      traps: [
        {
          title: "Independent judiciary is American, not British",
          body: "Britain gave the **parliamentary system**, the **rule of law** and the **law-making procedure**. The **independence of the judiciary** and judicial review are traced to the **USA**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-preamble-text",
      name: "The words of the Preamble",
      intuition:
        "The Preamble is one long sentence. It says who makes the Constitution (we, the people), what kind of State India is, and what the State promises its citizens. " +
        "CDS asks about the order of the words, so learn them in the order they appear.",
      definition:
        "The text, in order:\n" +
        "- **WE, THE PEOPLE OF INDIA**, having solemnly resolved to constitute India into a **SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC**\n" +
        "- and to secure to all its citizens: **JUSTICE**, social, economic and political;\n" +
        "- **LIBERTY** of thought, expression, belief, faith and worship;\n" +
        "- **EQUALITY** of status and of opportunity;\n" +
        "- and to promote among them all **FRATERNITY** assuring the dignity of the individual and the unity and integrity of the Nation;\n" +
        "- IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.\n\n" +
        "The ideals run **Justice, Liberty, Equality, Fraternity**. In **Kesavananda Bharati (1973)** the Supreme Court held that the Preamble is a part of the Constitution.",
      table: {
        columns: ["Part of the Preamble", "Words"],
        rows: [
          { cells: ["Source of authority", "We, the people of India"] },
          { cells: ["Nature of the State", "Sovereign, Socialist, Secular, Democratic, Republic"] },
          { cells: ["Justice", "Social, economic and political"] },
          { cells: ["Liberty", "Of thought, expression, belief, faith and worship"] },
          {
            cells: ["Equality", "Of status and of opportunity"],
            pyqExampleId: "c26cb036-100c-4216-9e14-802821bed07f",
          },
          { cells: ["Fraternity", "Assuring the dignity of the individual and the unity and integrity of the Nation"] },
          { cells: ["Date of adoption", "26 November 1949"] },
        ],
      },
      pyqExampleId: "5e053c40-2fd6-46e1-bb73-f8207af395e4",
      selfCheckExample: {
        prompt: "In the Preamble, what kind of liberty is promised to citizens? Name all five things.",
        steps: ["The Preamble promises liberty of thought and expression.", "It adds belief, faith and worship."],
        answer: "Liberty of thought, expression, belief, faith and worship.",
      },
      practiceSet: [
        { prompt: "With which words does the Preamble begin?", answer: "We, the people of India" },
        { prompt: "What two kinds of equality does the Preamble promise?", answer: "Equality of status and of opportunity" },
        { prompt: "What three kinds of justice does the Preamble promise?", answer: "Social, economic and political" },
        { prompt: "In which case did the Supreme Court hold that the Preamble is a part of the Constitution?", answer: "Kesavananda Bharati (1973)" },
      ],
      traps: [
        {
          title: "Socialist comes before secular",
          body: "The Preamble reads **Sovereign Socialist Secular Democratic Republic**. Learn the five words as one phrase; an option that puts secular first is wrong.",
        },
        {
          title: "Fraternity is the last ideal",
          body: "The order is **Justice, Liberty, Equality, Fraternity**. Fraternity comes after liberty, and justice comes first of all.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolco-preamble-1976",
      name: "The 42nd Amendment and the Preamble",
      intuition:
        "The Preamble has been amended only once, in 1976. Three words were added; everything else is as it was adopted in 1949. " +
        "So the question is always: was this word there from the start, or did it come in 1976?",
      definition:
        "The **42nd Amendment Act, 1976** made three changes:\n" +
        "- added **SOCIALIST**,\n" +
        "- added **SECULAR**,\n" +
        "- changed 'unity of the Nation' to 'unity **and integrity** of the Nation'.\n\n" +
        "Words that were there **from 1949**: sovereign, democratic, republic, justice, liberty (of thought, expression, belief, faith and worship), equality, **fraternity**.",
      table: {
        columns: ["Word or phrase", "In the Preamble since"],
        rows: [
          { cells: ["Sovereign, Democratic, Republic", "1949"] },
          { cells: ["Socialist", "1976 (42nd Amendment)"] },
          { cells: ["Secular", "1976 (42nd Amendment)"] },
          {
            cells: ["Integrity (in 'unity and integrity of the Nation')", "1976 (42nd Amendment)"],
            noteAmber: "CDS 2024 (I): the liberty clause was NOT changed in 1976; only 'unity' became 'unity and integrity'.",
            pyqExampleId: "9c14f05b-178a-4b0c-8aaa-8dd66d84447c",
          },
          { cells: ["Fraternity", "1949"] },
          { cells: ["Liberty of thought, expression, belief, faith and worship", "1949"] },
        ],
      },
      pyqExampleId: "c9403d6c-1c60-4546-b831-992b2a131147",
      selfCheckExample: {
        prompt: "Was the word 'democratic' added to the Preamble by the 42nd Amendment?",
        steps: [
          "The 42nd Amendment added only socialist, secular and integrity.",
          "'Sovereign Democratic Republic' was in the Preamble from 1949.",
        ],
        answer: "No. 'Democratic' has been there since 1949.",
      },
      practiceSet: [
        { prompt: "How many times has the Preamble been amended?", answer: "Once, by the 42nd Amendment of 1976" },
        { prompt: "Was 'sovereign' in the Preamble as adopted in 1949?", answer: "Yes" },
        { prompt: "In which year was the 42nd Amendment passed?", answer: "1976" },
      ],
      traps: [
        {
          title: "Fraternity is original",
          body: "The 42nd Amendment added **socialist, secular and integrity**. **Fraternity** was in the Preamble from the day it was adopted.",
        },
        {
          title: "Integrity was added, unity was not",
          body: "The 1949 text already said 'unity of the Nation'. The 1976 change made it 'unity **and integrity** of the Nation'.",
        },
      ],
    },
  ],
};
