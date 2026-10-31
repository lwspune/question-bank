import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_PGS_JUDICIARY_NOTE: SubtopicNote = {
  subtopicName: "Supreme Court and High Courts",
  title: "Supreme Court and High Courts",
  oneLineDefinition:
    "The Supreme Court's Articles and jurisdiction, the High Courts and the five writs, and the judges and judgments SSC has named, each with its year.",
  whyItMatters:
    "Thirty-two questions in the bank, the most on any page of this chapter: 16 from the 2023 shifts, ten from the 2024 shifts and six from the 2025 shifts, and six of them HARD. The hard ones name a 2021 judgment; the rest give an Article and ask what it does, so the Article table answers most of the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscpgsju-supreme",
      name: "Supreme Court: Articles and jurisdiction",
      intuition:
        "The Supreme Court's Articles run from 124 to 147, and SSC asks a handful of them again and again: who appoints judges, what the Court can hear first, what binds lower courts, and what Parliament can add.",
      definition:
        "The facts:\n" +
        "- The Court came into being on **26 January 1950**, replacing the Federal Court. India has an **integrated and independent** judiciary, not the dual system of the USA.\n" +
        "- **Strength**: the Chief Justice and **33** other judges (since 2019). **Art 124(2)**: judges are appointed by the **President**.\n" +
        "- **Art 131**: **original jurisdiction** over disputes between the **Centre and States**, or between States. Inter-State water disputes are kept out (Art 262).\n" +
        "- **Art 137**: the Court may **review** its own judgments. **Art 139A** (added by the **42nd Amendment**): it may **transfer** cases between High Courts.\n" +
        "- **Art 140**: **Parliament** may give it ancillary powers. **Art 141**: its law **binds all courts**. **Art 142**: orders for complete justice.\n" +
        "- **Art 146(3)**: its expenses, including staff pensions, are charged on the **Consolidated Fund of India**.\n" +
        "- **Art 247**: Parliament may set up **additional courts** for its own laws.",
      table: {
        columns: ["Article", "Subject"],
        rows: [
          { cells: ["124(2)", "President appoints Supreme Court judges"], pyqExampleId: "b75b63f6-e75c-4b45-a999-ad95bcbaa9ce" },
          { cells: ["131", "Original jurisdiction: Centre against States"], pyqExampleId: "d6bbdc3b-c507-4729-a3c6-19073895d127" },
          { cells: ["137", "Review of its own judgments"], pyqExampleId: "3ddbc497-bb7a-40e7-b871-e186d034ea38" },
          { cells: ["139A", "Transfer of cases (42nd Amendment)"], pyqExampleId: "3074b604-4df8-433a-a821-17f26bb7ceae" },
          { cells: ["140", "Ancillary powers given by Parliament"], pyqExampleId: "3c098447-15f5-4dfd-bc09-c1468a7ff138" },
          { cells: ["141", "Its law binds all courts"], pyqExampleId: "1759a954-83e1-40a7-8af7-1d4bf6aca8d3" },
          { cells: ["247", "Parliament may set up additional courts"], pyqExampleId: "f0c0491a-c9f6-4363-bdb7-cd6be2696b05" },
        ],
      },
      pyqExampleId: "4083a052-c2e0-440a-ad85-9e70a22b1e95",
      selfCheckExample: {
        prompt: "Which two neighbouring Articles are often confused: one makes the Supreme Court's law binding, the other lets it pass orders for complete justice?",
        steps: ["Article 141: the law declared by the Supreme Court is binding on all courts.", "Article 142: the Court may pass any order needed to do complete justice."],
        answer: "Article 141 (binding law) and Article 142 (complete justice).",
      },
      practiceSet: [
        { prompt: "On what date did the Supreme Court of India come into being?", answer: "26 January 1950" },
        { prompt: "How many judges besides the Chief Justice may the Supreme Court have?", answer: "33" },
        { prompt: "Under which Article can the Supreme Court reconsider a judgment it has given?", answer: "Article 137" },
        { prompt: "Who can give the Supreme Court ancillary powers?", answer: "Parliament (Article 140)" },
        { prompt: "On which fund are the Supreme Court staff's pensions charged?", answer: "The Consolidated Fund of India" },
      ],
      traps: [
        {
          title: "Water disputes are not under Article 131",
          body: "Article 131 covers disputes between the **Centre and States** or between States, but **inter-State water disputes** are kept out by **Article 262**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsju-high",
      name: "High Courts and writs",
      intuition:
        "High Courts are the top courts of the States, with their own power to issue writs. Learn the five writs by what each one says to its target.",
      definition:
        "The High Courts:\n" +
        "- Articles **214 to 231** (Part VI). There are **25** High Courts; the 25th, for Andhra Pradesh, opened in 2019.\n" +
        "- **Art 226**: High Courts issue **writs**, like the Supreme Court under Art 32. Both together hold the power of **judicial review**.\n" +
        "- **Art 222**: the **President** transfers a judge from one High Court to another, after consulting the Chief Justice of India.\n" +
        "- **Anna Chandy** became the first woman High Court judge, in **Kerala** (1959). The Delhi High Court served Himachal Pradesh until **1971**.\n" +
        "- **Public Interest Litigation** began in the **USA**; in India Justices Bhagwati and Krishna Iyer developed it.\n\n" +
        "The five writs:\n" +
        "- **Habeas corpus**: produce the person you have detained.\n" +
        "- **Mandamus**: do your public duty.\n" +
        "- **Prohibition**: a lower court must **stop** acting beyond its jurisdiction.\n" +
        "- **Certiorari**: quash an order a lower court has **already** passed.\n" +
        "- **Quo warranto**: by what authority do you hold this public office?",
      table: {
        columns: ["Writ", "Meaning"],
        rows: [
          { cells: ["Habeas corpus", "Produce the detained person"] },
          { cells: ["Mandamus", "Perform your public duty"] },
          { cells: ["Prohibition", "Stop exceeding your jurisdiction"] },
          { cells: ["Certiorari", "The order already passed is quashed"] },
          { cells: ["Quo warranto", "By what authority do you hold office"] },
        ],
      },
      pyqExampleId: "01b1c48c-471b-4d56-aacf-8f63590ab9b7",
      selfCheckExample: {
        prompt: "A tribunal has already passed an order it had no power to pass. Which writ undoes it, and how is that different from prohibition?",
        steps: ["Certiorari quashes an order already passed.", "Prohibition is issued earlier, to stop a court that is still acting beyond its jurisdiction."],
        answer: "Certiorari; prohibition stops the case before an order is passed.",
      },
      practiceSet: [
        { prompt: "Which Article gives High Courts the power to issue writs?", answer: "Article 226" },
        { prompt: "Who transfers a judge from one High Court to another?", answer: "The President, after consulting the Chief Justice of India" },
        { prompt: "Which Articles of Part VI deal with the High Courts?", answer: "Articles 214 to 231" },
        { prompt: "In which country did Public Interest Litigation begin?", answer: "The USA" },
        { prompt: "In which High Court did Anna Chandy become India's first woman High Court judge?", answer: "Kerala" },
      ],
      traps: [
        {
          title: "Article 13, not 23, makes laws void",
          body: "In Part III, **Article 13** makes laws that violate Fundamental Rights void, the base of judicial review. **Article 23** bans forced labour.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscpgsju-cases",
      name: "Judges and landmark cases",
      intuition:
        "Some questions name a case or a judge. The old cases come in a fixed order; the recent ones come with their year. Learn each case as a year and one line.",
      definition:
        "Landmark cases in order:\n" +
        "- **Berubari Union (1960)**, **Kesavananda Bharati (1973)**, **S. R. Bommai (1994)**.\n" +
        "- **Sabarimala (2018)**: women of all ages allowed into the temple, 4 to 1; **Justice Indu Malhotra** dissented.\n\n" +
        "Cases of 2021 that SSC has asked:\n" +
        "- **State of Kerala v. Leesamma Joseph** (June 2021): persons with **disabilities** have a right to reservation in **promotion**.\n" +
        "- **Laxmibai Chandaragi v. State of Karnataka** (February 2021): when two adults marry, the **family's consent** is not needed.\n" +
        "- **Devilal v. State of Madhya Pradesh** (February 2021): an offender aged between 16 and 18 was sent to the **Juvenile Justice Board**.\n\n" +
        "Chief Justices: **N. V. Ramana** became the **48th** CJI in April 2021; **Sanjiv Khanna** the **51st** in November 2024, after D. Y. Chandrachud. **Justice Arun Palli** became Chief Justice of the Jammu and Kashmir and Ladakh High Court in 2025.",
      table: {
        columns: ["Case or judge", "Year", "Remember for"],
        rows: [
          { cells: ["Sabarimala", "2018", "Indu Malhotra the lone dissent"], pyqExampleId: "5dac43bc-753f-46f7-90a0-37fda1da5fae" },
          { cells: ["Leesamma Joseph", "2021", "Disability reservation in promotion"], pyqExampleId: "965122ab-7035-48f2-9707-7f51d41de905" },
          { cells: ["Laxmibai Chandaragi", "2021", "Adults need no family consent to marry"], pyqExampleId: "962e6859-391a-4532-a557-a5c6d4e52cce" },
          { cells: ["N. V. Ramana", "2021", "48th Chief Justice"], pyqExampleId: "ce703bcc-6aa7-41fa-996f-a2b935e3ea63" },
          { cells: ["Sanjiv Khanna", "2024", "51st Chief Justice"], pyqExampleId: "d3327720-057d-4d88-be81-13444d354747" },
        ],
      },
      pyqExampleId: "aee6bd50-7208-4566-b68f-1d69663202f2",
      selfCheckExample: {
        prompt: "Three 2021 cases appear together as options. Which one was about the right to marry, and which about disability?",
        steps: ["Laxmibai Chandaragi: two adults need no family consent to marry.", "Leesamma Joseph: persons with disabilities have a right to reservation in promotion."],
        answer: "Marriage: Laxmibai Chandaragi. Disability: Leesamma Joseph.",
      },
      practiceSet: [
        { prompt: "Who wrote the lone dissent in the Sabarimala case?", answer: "Justice Indu Malhotra" },
        { prompt: "Whom did Sanjiv Khanna succeed as Chief Justice of India?", answer: "D. Y. Chandrachud" },
        { prompt: "In which year was the Kesavananda Bharati case decided?", answer: "1973" },
        { prompt: "Which 2021 case dealt with an offender aged between 16 and 18?", answer: "Devilal v. State of Madhya Pradesh" },
      ],
      traps: [
        {
          title: "Khanna took office in 2024",
          body: "**Sanjiv Khanna** became Chief Justice in **November 2024**. A statement that he served from 2023 is false.",
        },
      ],
    },
  ],
};
