import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_ACTS_NOTE: SubtopicNote = {
  subtopicName: "Acts and Administration",
  title: "Acts and Administration",
  oneLineDefinition:
    "The Acts that shaped British rule from the Regulating Act of 1773 to the Indian Independence Act of 1947, and the colleges, services, census and commissions through which India was run.",
  whyItMatters:
    "Twenty-one CDS questions from 2016 to 2026, seven of them HARD. The Acts are asked as 'which statement is not correct', so learn what each Act did and also what it did not do. The census came back twice, in 2016 and 2024, with the same two dates.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-company-acts",
      name: "From the Regulating Act to the Councils Act of 1861",
      intuition:
        "Parliament slowly took control of a trading company that had become a government. First it put a Governor-General over it, then it took away its trade, and after 1857 it took away its rule. " +
        "In 1861 a few Indians were let into law-making for the first time, but only to discuss what was put before them.",
      definition:
        "The Acts in order:\n" +
        "- **Regulating Act (1773)**: the Governor of Bengal became **Governor-General of Bengal**, with a council of four. **Warren Hastings** was the first.\n" +
        "- **Charter Act (1813)**: ended the Company's monopoly of **Indian** trade.\n" +
        "- **Charter Act (1833)**: ended its monopoly of the **China** (and tea) trade. The Company became a purely administrative body.\n" +
        "- **Act V of 1843**: courts would **not enforce** any claim of a master over a slave, so masters lost the use of the courts.\n" +
        "- **Government of India Act (1858)**: the **Crown** took over from the Company. It was the first law for India's direct rule, run through a **Secretary of State**, with **no popular element**.\n" +
        "- **Indian Councils Act (1861)**: **nominated non-official members** joined the Governor-General's council for law-making. They could only consider the bills placed before them, and the Governor-General kept his **veto** and his power to issue **ordinances**.",
      table: {
        columns: ["Act", "Year", "What it did"],
        rows: [
          {
            cells: ["Regulating Act", "1773", "Governor-General of Bengal; Warren Hastings the first"],
            pyqExampleId: "524d6ad4-4a48-41e6-bc83-5cb8c2202295",
          },
          { cells: ["Charter Act", "1813", "Ended the monopoly of Indian trade"] },
          { cells: ["Charter Act", "1833", "Ended the monopoly of the China trade"] },
          {
            cells: ["Act V", "1843", "Masters could not use the courts to claim slaves"],
            pyqExampleId: "6dda8547-25c2-499c-95b2-2f65ec8621e5",
          },
          {
            cells: ["Government of India Act", "1858", "Crown took over; no popular participation"],
            pyqExampleId: "4c4f4ceb-37c4-4959-af95-779a82c210b0",
          },
          {
            cells: ["Indian Councils Act", "1861", "Nominated non-officials added for law-making only"],
            pyqExampleId: "e27ec4d3-09ae-4ac3-935e-02390b2f05dd",
          },
        ],
      },
      pyqExampleId: "58a515be-6adf-499f-b0fa-4074eeb3a579",
      selfCheckExample: {
        prompt: "The Indian Councils Act of 1861 let Indians into law-making. What were the limits?",
        steps: [
          "The non-official members were nominated, not elected.",
          "They could only consider the bills the Governor-General placed before them.",
          "The Governor-General kept his veto and his power to issue ordinances.",
        ],
        answer: "Nominated members, limited to bills placed before them, under a Governor-General with a veto and ordinance power.",
      },
      practiceSet: [
        { prompt: "Which Act of 1858 transferred the rule of India from the Company to the Crown?", answer: "The Government of India Act, 1858" },
        { prompt: "Under the Regulating Act, how many members sat on the Governor-General's council?", answer: "Four" },
        { prompt: "After Act V of 1843, could a master go to court to claim a runaway slave?", answer: "No" },
      ],
      traps: [
        {
          title: "1813 for India, 1833 for China",
          body: "The Charter Act of **1813** ended the Company's monopoly of **Indian** trade. Its **China** trade monopoly went only in **1833**.",
        },
        {
          title: "1861 did not weaken the Governor-General",
          body: "'The Governor-General did not have effective legislative power' is **false** for 1861. He kept the veto and could issue ordinances.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-reform-acts",
      name: "From the Press Act to the Independence Act",
      intuition:
        "After 1858 each new Act gave Indians a little more say, while keeping real power in British hands. " +
        "CDS tests the boundary: separate electorates began in 1909, dyarchy in 1919 touched only the provinces, and the 1935 Act built the frame the Constitution later used.",
      definition:
        "The later Acts:\n" +
        "- **Vernacular Press Act (1878, Lord Lytton)**: gagged the Indian-language press. The only Indian member present in the Legislative Council was **Raja Jotendra Mohan Tagore**.\n" +
        "- **Indian Councils Act (1909, Morley-Minto Reforms)**: **separate electorates for Muslims** for the first time.\n" +
        "- **Government of India Act (1919, Montagu-Chelmsford Reforms)**: **dyarchy in the provinces** only. The **central executive was not responsible** to the legislature. It extended communal representation and separated central and provincial subjects.\n" +
        "- In 1919 **Annie Besant, Sarojini Naidu and Herabai Tata** gave evidence for votes for women before the Joint Select Committee.\n" +
        "- **Government of India Act (1935)**: a **Federal Court** (set up in **1937**), provincial autonomy, and **seats reserved for women** within each community's share.\n" +
        "- **Indian Independence Act (1947)**: introduced on **4 July**, Royal Assent on **18 July**. It created **two Dominions**, India and Pakistan, and gave each Constituent Assembly unlimited power. It did **not** lay down the framework of the Constitution.",
      table: {
        columns: ["Act or code", "Year", "Fact CDS asks"],
        rows: [
          {
            cells: ["Cornwallis Code", "1793", "Rules of Cornwallis's administration in Bengal"],
            noteAmber: "CDS 2019 (II) asked these four in order: 1793, 1878, 1881, 1909.",
            pyqExampleId: "085197da-77d9-4013-b8af-27ad6de3b90e",
          },
          {
            cells: ["Vernacular Press Act", "1878", "Only Indian member present: Jotendra Mohan Tagore"],
            pyqExampleId: "eceb2a5e-2653-45f8-9980-4966e4217de7",
          },
          { cells: ["First Indian Factory Act", "1881", "First law on factory labour"] },
          {
            cells: ["Morley-Minto Reforms", "1909", "Separate electorates for Muslims"],
            pyqExampleId: "d5ff29ef-4112-47b3-a1a6-4c27a85184af",
          },
          {
            cells: ["Montagu-Chelmsford Reforms", "1919", "Dyarchy in the provinces; centre not responsible"],
            pyqExampleId: "f51df84b-7d50-4cb1-ae59-69e08e9664d8",
          },
          {
            cells: ["Government of India Act", "1935", "Federal Court; seats for women within communal shares"],
            pyqExampleId: "9be905ab-6452-4103-a870-c2cbd327cc4c",
          },
          {
            cells: ["Indian Independence Act", "1947", "Two Dominions; did not frame the Constitution"],
            pyqExampleId: "d97b0295-3e96-49af-9a94-496403c86bd5",
          },
        ],
      },
      pyqExampleId: "f6223d97-ab8e-4866-8bbf-bd48ab313d50",
      selfCheckExample: {
        prompt: "Which Act provided for a Federal Court and reserved seats for women in the legislatures, and when did the court start work?",
        steps: [
          "Both came with the Government of India Act of 1935.",
          "The Federal Court was set up at Delhi in 1937 and gave way to the Supreme Court in 1950.",
        ],
        answer: "The Government of India Act, 1935; the Federal Court began in 1937.",
      },
      practiceSet: [
        { prompt: "Which Viceroy passed the Vernacular Press Act of 1878?", answer: "Lord Lytton" },
        { prompt: "On what date did the Indian Independence Act receive the Royal Assent?", answer: "18 July 1947" },
        { prompt: "Which reforms first gave Muslims separate electorates?", answer: "The Morley-Minto Reforms of 1909" },
        { prompt: "Which Act's structure did the Constitution of India draw on most?", answer: "The Government of India Act, 1935" },
      ],
      traps: [
        {
          title: "Dyarchy was provincial only",
          body: "The 1919 Act brought dyarchy to the **provinces**. 'It made the central executive responsible to the legislature' is the **false** statement.",
        },
        {
          title: "The 1947 Act did not write the Constitution",
          body: "The Indian Independence Act ended British rule and created two Dominions. The framework the Constitution drew on came from the **1935 Act**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-administration",
      name: "Colleges, services, census and commissions",
      intuition:
        "To run India the British needed trained officers, doctors, numbers and schools. Each of these began with a named person or a date that CDS likes to ask.",
      definition:
        "How India was run:\n" +
        "- **Indian Medical Service**: began in **1764**, first to look after the **troops**. It recruited by competitive examination, and **Indians were admitted** from the 1850s.\n" +
        "- **College of Fort William (1800)**: founded at Calcutta by **Lord Wellesley** to train the Company's young officers in Indian languages and law.\n" +
        "- **Simla**: Viceroy **John Lawrence** formally moved the government and his council there for the summer from **1864**.\n" +
        "- **Census**: first attempted in **1872** (Lord Mayo); regular every **ten years** from **1881** (Lord Ripon).\n" +
        "- **Hunter Commission (1882)**: endorsed **Wood's Despatch of 1854**, with greater emphasis on **primary education**.\n" +
        "- **Gokhale's bill (1911)** in the Imperial Legislative Council sought **free and compulsory primary education**; it was defeated in 1912.\n" +
        "- **Lord Curzon** reorganised agriculture: an Inspector-General of Agriculture and the research institute at **Pusa**.",
      table: {
        columns: ["Step", "Year", "Who or what"],
        rows: [
          {
            cells: ["Indian Medical Service begins", "1764", "First for the troops; Indians later admitted"],
            pyqExampleId: "db66855b-28a2-479c-a5b0-bc49c8da71e3",
          },
          {
            cells: ["College of Fort William", "1800", "Lord Wellesley"],
            pyqExampleId: "0eb1a0a5-b5d2-4986-9c5e-865999c28f54",
          },
          { cells: ["Wood's Despatch", "1854", "Plan for education in India"] },
          {
            cells: ["Simla made the summer seat", "1864", "John Lawrence"],
            pyqExampleId: "f61a4316-b613-407f-8956-179366e48d2b",
          },
          {
            cells: ["First census attempt", "1872", "Lord Mayo"],
            noteAmber: "CDS 2016 (II) and CDS 2024 (II) both asked 1872 and 1881.",
            pyqExampleId: "22ff797e-3ef8-4bda-8f7b-438fa2c79a09",
          },
          { cells: ["Regular ten-yearly census", "1881", "Lord Ripon"] },
          { cells: ["Hunter Commission", "1882", "Primary education stressed"] },
          {
            cells: ["Free and compulsory education bill", "1911", "Gopal Krishna Gokhale"],
            pyqExampleId: "3757b14a-c292-460d-96eb-c95425112dc1",
          },
        ],
      },
      pyqExampleId: "0ee004dd-50ca-4bc6-9cc7-cd839854cbdd",
      selfCheckExample: {
        prompt: "When was an all-India census first attempted, when did it become regular, and how often has it been held?",
        steps: [
          "The first attempt was in 1872, under Lord Mayo.",
          "From 1881, under Lord Ripon, it became regular.",
          "It has always been held every ten years, never every five.",
        ],
        answer: "First attempted 1872; regular from 1881; every ten years.",
      },
      practiceSet: [
        { prompt: "Why was the College of Fort William set up?", answer: "To train the Company's young officers in Indian languages and law" },
        { prompt: "Which Viceroy first formally moved the government to Simla for the summer?", answer: "John Lawrence" },
        { prompt: "For whom was the Indian Medical Service first meant?", answer: "The troops" },
        { prompt: "What did Gokhale's bill of 1911 ask for?", answer: "Free and compulsory primary education" },
      ],
      traps: [
        {
          title: "The census is ten-yearly",
          body: "'Always undertaken as a five-year exercise' is **false**. The census has been **decennial** (every ten years) since 1881.",
        },
        {
          title: "Indians did enter the IMS",
          body: "'Indians were never admitted to the IMS' is the **wrong** statement. Indians entered it through the competitive examination from the 1850s.",
        },
      ],
    },
  ],
};
