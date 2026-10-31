import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_COMPANY_NOTE: SubtopicNote = {
  subtopicName: "Company Conquest and Land Revenue",
  title: "Company Conquest and Land Revenue",
  oneLineDefinition:
    "How the East India Company won Bengal and then the rest of India, the three ways it collected land revenue, and the nationalist case that its rule drained India's wealth.",
  whyItMatters:
    "Twenty questions in the bank: nine from the 2023 shifts, eight from the 2024 shifts and three from the 2025 shifts, 14 of them EASY. SSC asks almost every one as a match of a name to a policy: which Governor-General devised which policy, which settlement ran in which province, who first wrote of the drain. Learn each policy with its maker and the trap is gone.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmoco-conquest",
      name: "Battles and annexation policies",
      intuition:
        "The Company began as traders, won Bengal with two battles, and then took the rest of India with policies rather than wars alone. " +
        "Each policy has one Governor-General's name on it, and SSC asks that pairing more than anything else.",
      definition:
        "In time order:\n" +
        "- **Murshid Quli Khan** made Bengal virtually independent of the Mughals from **1717** and moved its capital to **Murshidabad**.\n" +
        "- **Plassey (1757)**: **Robert Clive** defeated **Siraj-ud-Daulah**. It is taken as the start of British political power in India.\n" +
        "- **Buxar (1764)**: **Major Hector Munro** defeated three allies together: **Mir Qasim**, **Shuja-ud-Daula** of Awadh and the Mughal emperor **Shah Alam II**. The Treaty of Allahabad (1765) then gave the Company the **Diwani** (revenue rights) of Bengal, Bihar and Orissa.\n" +
        "- **Ring-fence policy**: **Warren Hastings** defended the Company's lands by protecting neighbouring states such as **Awadh** as **buffer states**.\n" +
        "- **Subsidiary Alliance (1798)**: **Lord Wellesley**. The ruler kept a **British force** paid for by him, accepted a **British Resident** at his court and made no war or alliance without British consent. The **Nizam of Hyderabad** accepted first.\n" +
        "- **Doctrine of Lapse**: **Lord Dalhousie** (1848 to 1856). A dependent state whose ruler died without a natural heir passed to the Company: **Satara** (1848), **Jhansi** and **Nagpur** among them.\n" +
        "- **James Rennell**, asked by **Clive**, drew the first map of Hindustan.",
      table: {
        columns: ["Policy or event", "Year", "Name to remember"],
        rows: [
          { cells: ["Bengal made independent, capital Murshidabad", "1717", "Murshid Quli Khan"] },
          { cells: ["Battle of Plassey", "1757", "Robert Clive"], pyqExampleId: "7dfaf0d7-7911-4250-86ec-c150e3e90e1b" },
          { cells: ["Battle of Buxar", "1764", "Hector Munro"], pyqExampleId: "58e31a73-00e5-4f10-b57f-baeef6213eef" },
          { cells: ["Ring-fence (buffer states)", "1770s", "Warren Hastings"], pyqExampleId: "05e744e4-4836-4c1c-84ac-f9e182369602" },
          { cells: ["Subsidiary Alliance", "1798", "Lord Wellesley"], pyqExampleId: "596a3e98-9717-433c-afcb-7acd8179e09f" },
          { cells: ["Doctrine of Lapse", "1848 to 1856", "Lord Dalhousie"], pyqExampleId: "acd48151-e6f9-484e-acc5-522d53d909d4" },
        ],
      },
      pyqExampleId: "8a7fd316-2c3c-40da-bde2-dc7e4ad22605",
      selfCheckExample: {
        prompt: "Which battle did the Company fight against three Indian powers at once, and who were they?",
        steps: [
          "Plassey (1757) was against one ruler, Siraj-ud-Daulah.",
          "Buxar (1764) was against Mir Qasim, Shuja-ud-Daula of Awadh and the Mughal emperor Shah Alam II together.",
        ],
        answer: "Buxar, 1764: Mir Qasim, Shuja-ud-Daula and Shah Alam II.",
      },
      practiceSet: [
        { prompt: "Which Governor-General is linked with the Doctrine of Lapse?", answer: "Lord Dalhousie" },
        { prompt: "Which ruler was the first to accept the Subsidiary Alliance?", answer: "The Nizam of Hyderabad (1798)" },
        { prompt: "What did the Treaty of Allahabad (1765) give the Company?", answer: "The Diwani (revenue rights) of Bengal, Bihar and Orissa" },
        { prompt: "Which Governor-General followed the ring-fence policy of buffer states?", answer: "Warren Hastings" },
        { prompt: "Who moved the capital of Bengal to Murshidabad?", answer: "Murshid Quli Khan" },
      ],
      traps: [
        {
          title: "Wellesley and Dalhousie swapped",
          body: "**Wellesley** devised the **Subsidiary Alliance**; **Dalhousie** applied the **Doctrine of Lapse**. Both annexed states, so SSC puts each as a wrong option for the other.",
        },
        {
          title: "Clive did not fight at Buxar",
          body: "Clive won **Plassey (1757)**. **Buxar (1764)** was won by **Hector Munro**. Clive came back in 1765 to sign the Treaty of Allahabad.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoco-revenue",
      name: "Land revenue settlements",
      intuition:
        "Land tax was the Company's biggest income, and it tried three systems. The question each system answers is the same: who pays the government, a landlord, the farmer himself, or the village as a whole?",
      definition:
        "The three systems:\n" +
        "- **Permanent Settlement (Zamindari)**, **1793**, **Lord Cornwallis**: in **Bengal, Bihar and Orissa**. The **zamindar** paid a revenue **fixed for ever**.\n" +
        "- **Ryotwari**, **Thomas Munro and Alexander Read**: mainly in **Madras and Bombay**. The **ryot** (cultivator) paid the government **directly**. Its assessment followed **David Ricardo's theory of rent**.\n" +
        "- **Mahalwari**, **Holt Mackenzie** (1822): in the **North-Western Provinces, Punjab and the Central Provinces**. The **village (mahal)** as a whole was assessed.",
      table: {
        columns: ["System", "Who paid", "Where", "Name to remember"],
        rows: [
          { cells: ["Permanent Settlement (1793)", "Zamindar, fixed amount", "Bengal, Bihar, Orissa", "Lord Cornwallis"], pyqExampleId: "67ed30da-c39f-4463-92fe-c44fde03f0c3" },
          { cells: ["Ryotwari", "The cultivator, directly", "Madras, Bombay", "Thomas Munro, Alexander Read"] },
          { cells: ["Mahalwari (1822)", "The village as a whole", "North-West, Punjab, Central Provinces", "Holt Mackenzie"] },
        ],
      },
      pyqExampleId: "725778ba-edc3-442c-83eb-f94e2e497dda",
      selfCheckExample: {
        prompt: "In which settlement did the revenue a landlord paid stay the same for ever, and who introduced it?",
        steps: [
          "Only one system fixed the revenue in perpetuity: the Permanent Settlement.",
          "It was introduced in 1793 by Lord Cornwallis, with the zamindar as the one who paid.",
        ],
        answer: "The Permanent Settlement of 1793, introduced by Lord Cornwallis.",
      },
      practiceSet: [
        { prompt: "Whose theory of rent shaped the Ryotwari assessment?", answer: "David Ricardo's" },
        { prompt: "In the Mahalwari system, what was the unit of assessment?", answer: "The village (mahal)" },
        { prompt: "Which two officers developed the Ryotwari system?", answer: "Thomas Munro and Alexander Read" },
        { prompt: "In which year did the Permanent Settlement begin?", answer: "1793" },
      ],
      traps: [
        {
          title: "Cornwallis, not Wellesley or Curzon",
          body: "The **Zamindari (Permanent) Settlement** is **Cornwallis's**, in **1793**. The options often add other famous Governors-General.",
        },
        {
          title: "Ryotwari is south and west, Mahalwari is north",
          body: "**Ryotwari** ran mainly in **Madras and Bombay**. **Punjab** and the **Central Provinces** had **Mahalwari**, and **Bengal** had the **Permanent Settlement**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoco-drain",
      name: "The drain of wealth and early industry",
      intuition:
        "Before British rule India sold the world its cloth. Under British rule money flowed the other way, to pay salaries, pensions and interest in England, and the nationalists named this flow the drain.",
      definition:
        "The facts:\n" +
        "- Before modern industry, India's chief exports were **cotton and silk fabrics**.\n" +
        "- **Dadabhai Naoroji** was the first nationalist to set out the **drain theory**, in **Poverty and Un-British Rule in India** (1901, built on his papers from 1867). **R. C. Dutt** carried it forward in **The Economic History of India**.\n" +
        "- The drain went through the **home charges**: salaries, pensions and interest paid in England out of Indian revenue.\n" +
        "- Modern industry under British rule: the first **cotton mill** at **Bombay (1854)**, the first **jute mill** at **Rishra** near Calcutta **(1855)**, and the **Tata Iron and Steel Company** at **Jamshedpur (1907)**.",
      table: {
        columns: ["Fact", "Year", "Name or place"],
        rows: [
          { cells: ["Poverty and Un-British Rule in India", "1901", "Dadabhai Naoroji"], pyqExampleId: "456095bf-0e45-40a0-ab3b-a63bf66495d3" },
          { cells: ["The Economic History of India", "1902", "R. C. Dutt"] },
          { cells: ["First cotton mill", "1854", "Bombay"] },
          { cells: ["First jute mill", "1855", "Rishra, near Calcutta"] },
          { cells: ["Tata Iron and Steel Company", "1907", "Jamshedpur"] },
        ],
      },
      pyqExampleId: "356e70b1-a4a7-4c74-b1b1-89a162906533",
      selfCheckExample: {
        prompt: "Name the book in which the drain theory was set out, and the economic historian who later built on it.",
        steps: [
          "Dadabhai Naoroji's book is Poverty and Un-British Rule in India.",
          "R. C. Dutt developed the idea in The Economic History of India.",
        ],
        answer: "Poverty and Un-British Rule in India (Naoroji); R. C. Dutt built on it.",
      },
      practiceSet: [
        { prompt: "What were India's chief exports before the modern industrial system?", answer: "Cotton and silk fabrics" },
        { prompt: "Where was the first jute mill in India set up?", answer: "At Rishra, near Calcutta (1855)" },
        { prompt: "Where was the Tata Iron and Steel Company set up in 1907?", answer: "Jamshedpur" },
        { prompt: "Through what were salaries, pensions and interest paid to England out of Indian revenue?", answer: "The home charges" },
      ],
      traps: [
        {
          title: "Naoroji first, Dutt later",
          body: "SSC asks for the **first** nationalist to give the drain theory: **Dadabhai Naoroji**. **R. C. Dutt** is a correct name for the theory, but not the first.",
        },
      ],
    },
  ],
};
