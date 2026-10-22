import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_WH_HISTORIOGRAPHY_NOTE: SubtopicNote = {
  subtopicName: "Historiography and the Modern World",
  title: "Historiography and the Modern World",
  oneLineDefinition:
    "Historiography is the study of how history is written: the thinkers who shaped it and the use of history today. The modern-world facts asked beside it are the years women won the vote and the founder of modern Turkey.",
  whyItMatters:
    "Five questions in the bank, all MODERATE, and two of them are from the 2022 paper: who wrote The Archaeology of Knowledge, and the other name for Applied History. Both come from the first chapters of the Class 10 Balbharati History book, so learn each thinker with one idea. The other three ask a year or a country, and the years for women's vote sit close together.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiwhhm-historians",
      name: "Thinkers who shaped history writing",
      intuition:
        "History is not only what happened but also how someone chose to tell it. Over three hundred years Western thinkers changed that telling: check every source, look at society and not only kings, and do not force every story into a single line of dates.",
      definition:
        "- **Herodotus**, a Greek, wrote The Histories and is called the father of history.\n" +
        "- **René Descartes** asked historians to doubt: believe nothing until it is proved.\n" +
        "- **Voltaire** said history should include society, trade, farming and customs, not only kings and wars.\n" +
        "- **Hegel** explained history through **dialectics**: thesis, antithesis and synthesis.\n" +
        "- **Leopold von Ranke** insisted on original documents and a critical check of every source.\n" +
        "- **Karl Marx** saw history as a struggle between classes; he wrote **Das Kapital**.\n" +
        "- **Michel Foucault**, in **The Archaeology of Knowledge**, argued that history need not be told only in chronological order.\n" +
        "- **Applied History**, the use of history for people and society today (museums, archives, heritage, tourism), is also called **Public History**.",
      table: {
        columns: ["Thinker", "Idea or work"],
        rows: [
          { cells: ["Herodotus", "The Histories; the father of history"] },
          { cells: ["René Descartes", "Doubt everything until it is proved"] },
          { cells: ["Voltaire", "History of society, trade and customs, not only rulers"] },
          { cells: ["Hegel", "Dialectics: thesis, antithesis, synthesis"] },
          { cells: ["Leopold von Ranke", "Original documents, critical method"] },
          { cells: ["Karl Marx", "Class struggle; **Das Kapital**"] },
          { cells: ["Michel Foucault", "**The Archaeology of Knowledge**; not only chronological"] },
          { cells: ["Applied History", "Also called **Public History**"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which historian insisted that history must be written from original documents, each checked critically?",
        steps: ["This is the critical method of checking sources.", "It is linked with the German historian Leopold von Ranke."],
        answer: "Leopold von Ranke",
      },
      practiceSet: [
        { prompt: "Who explained history through thesis, antithesis and synthesis?", answer: "Hegel" },
        { prompt: "Who wrote Das Kapital?", answer: "Karl Marx" },
        { prompt: "Which Greek writer is called the father of history?", answer: "Herodotus" },
        { prompt: "What is Applied History also called?", answer: "Public History" },
        { prompt: "Which thinker said history should cover trade, farming and customs, not only kings and wars?", answer: "Voltaire" },
      ],
      pyqExampleId: "9cd6a65d-7586-414b-b7e1-939a9006a78c",
      traps: [
        {
          title: "Foucault, not Ranke or Hegel",
          body:
            "The Archaeology of Knowledge is Michel Foucault's book. Ranke is the name for original sources and Hegel for dialectics; neither wrote it.",
        },
        {
          title: "Public, not Social",
          body:
            "Applied History is also called Public History. Social history is a field about how ordinary people lived, a different thing.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwhhm-modern",
      name: "Votes for women and the founder of modern Turkey",
      intuition:
        "For a long time only men could vote. Women won the vote country by country, and often in two steps: first some women, then all women on the same terms as men. " +
        "In the same years after the First World War, Mustafa Kemal turned what was left of the Ottoman Empire into the modern Republic of Turkey.",
      definition:
        "- **New Zealand** was the first country to give women the vote, in **1893**.\n" +
        "- In the **United Kingdom**, women over 30 who met a property test got the vote in **1918**; all women got it on the same terms as men (from age 21) in **1928**.\n" +
        "- In the **United States**, the 19th Amendment gave women the vote in **1920**.\n" +
        "- In **India**, the Constitution gave every adult citizen the vote from **1950**, women and men alike.\n" +
        "- **Mustafa Kemal Pasha (Ataturk)** was born in **1881** in Salonika, then a city of the Ottoman (Turkish) Empire. He founded the **Republic of Turkey** in **1923** and abolished the caliphate in 1924.",
      table: {
        columns: ["Country", "Women's vote"],
        rows: [
          { cells: ["New Zealand", "1893, the first country"] },
          { cells: ["United Kingdom", "1918 for women over 30; **1928** on equal terms with men"] },
          { cells: ["United States", "**1920**, the 19th Amendment"] },
          { cells: ["India", "1950, every adult under the Constitution"] },
        ],
        caption: "Mustafa Kemal Pasha (Ataturk): born 1881 in Salonika in the Ottoman Empire; founded the Republic of Turkey in 1923.",
      },
      selfCheckExample: {
        prompt: "Which was the first country in the world to give women the right to vote?",
        steps: ["It happened in the 19th century, before any European country.", "The country was New Zealand, in 1893."],
        answer: "New Zealand",
      },
      practiceSet: [
        { prompt: "In which year did all women in the United Kingdom get the vote on the same terms as men?", answer: "1928" },
        { prompt: "Who founded the Republic of Turkey in 1923?", answer: "Mustafa Kemal Pasha (Ataturk)" },
        { prompt: "Which amendment to the US Constitution gave women the vote?", answer: "The 19th Amendment" },
        { prompt: "From which year did every adult citizen of India, man or woman, get the vote?", answer: "1950" },
      ],
      pyqExampleId: "8fed39e4-8093-4b04-b3e0-8a03335affff",
      traps: [
        {
          title: "Two dates for the United Kingdom",
          body:
            "In 1918 only women over 30 with property could vote in the UK. Equal voting with men came in 1928. A question on when UK women got the vote, with 1918 missing from the options, wants 1928.",
        },
        {
          title: "Kemal's birthplace was Turkish then",
          body:
            "Salonika is in Greece today, but in 1881 it was part of the Ottoman (Turkish) Empire. That is why the answer to where Kemal was born is given as Turkey.",
        },
      ],
    },
  ],
};
