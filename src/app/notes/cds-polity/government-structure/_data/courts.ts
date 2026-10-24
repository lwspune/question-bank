import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_COURTS_NOTE: SubtopicNote = {
  subtopicName: "Supreme Court and High Courts",
  title: "Supreme Court and High Courts",
  oneLineDefinition:
    "Who can become a Supreme Court judge, the kinds of cases the Supreme Court hears and the Articles behind them, and how High Courts and their benches are set up.",
  whyItMatters:
    "Ten CDS questions from 2016 to 2026: 6 MODERATE, 3 HARD and 1 EASY. The three routes to the Supreme Court bench were asked twice (2018 and 2026), each time with one route changed. Most of the rest name an Article, so learn the jurisdiction table with its numbers.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-judges",
      name: "Judges of the Supreme Court",
      intuition:
        "A Supreme Court judge must already know the law deeply. The Constitution gives three ways to show that: years as a High Court judge, years arguing cases in a High Court, or being an outstanding legal scholar. For the third, someone has to judge who is outstanding, and the Constitution gives that judgement to the President.",
      definition:
        "Article 124:\n" +
        "- Judges are **appointed by the President**. A judge holds office until **65** (a High Court judge until **62**) and resigns by writing to the President.\n" +
        "- To be appointed, a person must be a **citizen** and meet one of three tests.\n" +
        "- Test 1: a **High Court judge** for at least **5 years** (in one High Court, or two or more in succession).\n" +
        "- Test 2: an **advocate of a High Court** for at least **10 years** (in one, or two or more in succession).\n" +
        "- Test 3: a **distinguished jurist** in the **opinion of the President**.\n" +
        "- Service as a magistrate or subordinate judge is **not** one of the routes.\n\n" +
        "Names CDS asks: **Harilal J. Kania** was the first Chief Justice of India (1950). **P. N. Bhagwati**, with **V. R. Krishna Iyer**, started **public interest litigation** around 1980 by letting any public-spirited person approach the court for those who cannot; Bhagwati was Chief Justice in 1985 and 1986. **H. L. Dattu** set up the **Social Justice Bench** in December 2014.",
      table: {
        columns: ["Route to the Supreme Court", "What is needed"],
        rows: [
          { cells: ["Judge of a High Court", "At least 5 years"] },
          {
            cells: ["Advocate of a High Court", "At least 10 years"],
            noteAmber: "CDS 2018 (II): twenty years as a sub-judicial magistrate is not a qualification.",
            pyqExampleId: "5966ac4d-58d2-43a0-a81e-0fbd63de413f",
          },
          { cells: ["Distinguished jurist", "So in the opinion of the President"] },
        ],
      },
      pyqExampleId: "03b37121-fe3a-4b2e-b15b-6f7d4ccd0ba6",
      selfCheckExample: {
        prompt: "A district magistrate has 22 years of service but has never been a High Court judge or a High Court advocate, and is not a jurist of note. Can she be appointed to the Supreme Court?",
        steps: [
          "Article 124 gives three routes: 5 years as a High Court judge, 10 years as a High Court advocate, or a distinguished jurist in the President's opinion.",
          "Her service as a magistrate is none of these.",
        ],
        answer: "No. Years as a magistrate do not qualify, however many.",
      },
      practiceSet: [
        { prompt: "Up to what age does a Supreme Court judge hold office?", answer: "65" },
        { prompt: "Who was the first Chief Justice of India?", answer: "Harilal J. Kania" },
        { prompt: "Which judge is best known for starting public interest litigation in India?", answer: "P. N. Bhagwati (with V. R. Krishna Iyer)" },
        { prompt: "Which Chief Justice set up the Supreme Court's Social Justice Bench in 2014?", answer: "H. L. Dattu" },
      ],
      traps: [
        {
          title: "The President, not the Chief Justice, judges the jurist",
          body: "The 'distinguished jurist' route turns on the **opinion of the President**. A statement putting it in the opinion of the Chief Justice of India is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-jurisdiction",
      name: "Jurisdiction of the Supreme Court",
      intuition:
        "Jurisdiction means the kinds of cases a court may hear. Some cases start in the Supreme Court (original), some come up to it from lower courts (appellate), and some are questions the President asks it (advisory). Each kind has its own Article, and CDS asks the number.",
      definition:
        "The Supreme Court's powers:\n" +
        "- **Original (Article 131)**: disputes between the **Centre and one or more States**, or **between States**. This is **exclusive**: such a case starts in the Supreme Court and nowhere else.\n" +
        "- **Writ (Article 32)**: to enforce **Fundamental Rights**. It is **not exclusive**: High Courts issue writs too, under Article 226.\n" +
        "- **Appellate (Articles 132 to 134)** and **special leave to appeal (Article 136)** from any court or tribunal.\n" +
        "- **Advisory (Article 143)**: the **President** may refer a question of **law or fact**; the opinion does not bind the President.\n" +
        "- **Review (Article 137)**: it may review its own judgments. **Court of record (Article 129)**: it can punish for its contempt.\n" +
        "- **Article 348(1)(a)**: all proceedings in the Supreme Court and every High Court are in **English** until Parliament provides otherwise.",
      table: {
        columns: ["Jurisdiction", "Article", "What it covers"],
        rows: [
          { cells: ["Original", "131", "Centre against States, or State against State"] },
          {
            cells: ["Writ", "32", "Enforcement of Fundamental Rights, shared with the High Courts"],
            noteAmber: "CDS 2016 (II): 'exclusive power to issue writs' is the false statement about the Supreme Court.",
            pyqExampleId: "193def63-0573-4eb0-9e40-1e3b664a6d5c",
          },
          { cells: ["Special leave", "136", "Appeal from any court or tribunal, at the Court's discretion"] },
          { cells: ["Review", "137", "Reviewing its own judgment or order"] },
          { cells: ["Advisory", "143", "A question of law or fact referred by the President"] },
          {
            cells: ["Language of proceedings", "348", "English in the Supreme Court and the High Courts"],
            noteAmber: "CDS 2019 (II): the rule that Supreme Court proceedings are in English is in Article 348, not Article 145 or the Supreme Court Rules.",
            pyqExampleId: "a10d49b4-c3a9-4795-90eb-794182569d1c",
          },
        ],
      },
      pyqExampleId: "6156385f-f0db-4c03-8460-f12024264991",
      selfCheckExample: {
        prompt: "The President wants the Supreme Court's view on whether a proposed law would be constitutional. Under which jurisdiction does the Court answer, and must the President follow the answer?",
        steps: [
          "A question referred by the President is heard under Article 143, the advisory jurisdiction.",
          "An advisory opinion is not a judgment, so it does not bind the President.",
        ],
        answer: "Advisory jurisdiction (Article 143); the opinion is not binding.",
      },
      practiceSet: [
        { prompt: "Which Article gives the Supreme Court its advisory jurisdiction?", answer: "Article 143" },
        { prompt: "Which Article lets the Supreme Court review its own judgments?", answer: "Article 137" },
        { prompt: "Which Article makes the Supreme Court a court of record?", answer: "Article 129" },
        { prompt: "Under which Article do High Courts issue writs?", answer: "Article 226" },
      ],
      traps: [
        {
          title: "Writ power is shared",
          body: "The Supreme Court does **not** have exclusive writ power. High Courts issue the same writs under Article 226, and for more purposes: Fundamental Rights **and** other legal rights.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-high-courts",
      name: "High Courts and their benches",
      intuition:
        "Every State has a High Court, but small neighbouring States do not each need a separate one. Parliament can give two or more States one shared High Court. A big State, on the other hand, can have benches of its High Court in other cities, so people need not travel to the capital.",
      definition:
        "The rules:\n" +
        "- **Article 214**: there shall be a **High Court for each State**.\n" +
        "- **Article 231**: **Parliament**, by law, may set up a **common High Court** for two or more States, or for States and a Union Territory.\n" +
        "- A High Court judge is appointed by the President and holds office until **62**.\n" +
        "- Examples of a shared court: the **Punjab and Haryana High Court** at Chandigarh; the **Gauhati High Court** for Assam, Nagaland, Mizoram and Arunachal Pradesh.",
      table: {
        columns: ["High Court", "Principal seat", "Benches"],
        rows: [
          { cells: ["Allahabad", "Prayagraj (Allahabad)", "Lucknow"] },
          { cells: ["Madhya Pradesh", "Jabalpur", "Gwalior and Indore"] },
          { cells: ["Rajasthan", "Jodhpur", "Jaipur"] },
          {
            cells: ["Gauhati", "Guwahati", "Kohima, Aizawl and Itanagar"],
            noteAmber: "CDS 2021 (II): 'the Gauhati High Court has no bench' is the false statement.",
            pyqExampleId: "73101f16-e7c3-49a3-87ba-7881129a9da5",
          },
        ],
      },
      pyqExampleId: "f02174af-c5c3-4445-accd-fb69f09d213c",
      selfCheckExample: {
        prompt: "A student says the Rajasthan High Court sits in Jaipur because Jaipur is the capital. Is that right?",
        steps: [
          "A High Court's principal seat need not be in the State capital.",
          "The Rajasthan High Court's principal seat is at Jodhpur, with a bench at Jaipur.",
        ],
        answer: "No. Its principal seat is Jodhpur; Jaipur has a bench.",
      },
      practiceSet: [
        { prompt: "Which Article says there shall be a High Court for each State?", answer: "Article 214" },
        { prompt: "Up to what age does a High Court judge hold office?", answer: "62" },
        { prompt: "Which High Court serves both Punjab and Haryana?", answer: "The Punjab and Haryana High Court, at Chandigarh" },
        { prompt: "In which city does the Allahabad High Court have a bench?", answer: "Lucknow" },
      ],
      traps: [
        {
          title: "Parliament sets up a common High Court",
          body: "A common High Court for two or more States is set up by **Parliament** by law (Article 231), not by the President, the Union Cabinet or the Supreme Court.",
        },
      ],
    },
  ],
};
