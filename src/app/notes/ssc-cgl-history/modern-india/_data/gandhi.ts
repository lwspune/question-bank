import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_GANDHI_NOTE: SubtopicNote = {
  subtopicName: "Gandhi and the Mass Movements",
  title: "Gandhi and the Mass Movements",
  oneLineDefinition:
    "Gandhi from South Africa to Champaran, the Non-Cooperation Movement, the road from the Simon Commission to the Salt March and the Poona Pact, and the other movements of the 1920s and early 1930s.",
  whyItMatters:
    "Thirty-eight questions in the bank: 15 from the 2023 shifts, 19 from the 2024 shifts and four from the 2025 shifts, and 36 of them EASY. They are the most predictable questions in the chapter: a date, a place or a leader for an event every textbook covers. A year line from 1915 to 1932 answers most of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmoga-early",
      name: "Gandhi's early life and first satyagrahas",
      intuition:
        "Gandhi learned his method in South Africa and tried it in India on three local struggles before leading the whole country. SSC asks the year, the place and the people of each.",
      definition:
        "In time order:\n" +
        "- Born **2 October 1869** at **Porbandar**, Gujarat.\n" +
        "- **Natal Indian Congress (1894)**: founded by Gandhi at Durban, **South Africa**, against racial discrimination.\n" +
        "- **Hind Swaraj (1909)**: written by Gandhi in Gujarati; published in English as **Indian Home Rule** (1910).\n" +
        "- **Returned to India**: **January 1915** (9 January, now Pravasi Bharatiya Divas).\n" +
        "- **Champaran, Bihar (1917)**: his first satyagraha in India, for **indigo** cultivators. **Rajkumar Shukla** persuaded him to come.\n" +
        "- **Ahmedabad (1918)**: mill workers. **Kheda (1918)**: peasants, over land revenue.\n" +
        "- His non-violence won admirers abroad, among them **Albert Einstein**.",
      table: {
        columns: ["Event", "Year", "Place or people"],
        rows: [
          { cells: ["Gandhi born", "1869", "Porbandar"], pyqExampleId: "b8048be4-605a-46b0-bb90-e7569ccf9d1a" },
          { cells: ["Natal Indian Congress", "1894", "Durban, South Africa"], pyqExampleId: "aa3ff521-6db9-4dc2-8082-01660e1ac661" },
          { cells: ["Hind Swaraj written", "1909", "In Gujarati"], pyqExampleId: "fa096c65-0a4a-4890-b0a3-308b813dee12" },
          { cells: ["Return to India", "1915", "Bombay, 9 January"], pyqExampleId: "af19e482-5d2b-457f-80ff-cbe5245f6941" },
          { cells: ["Champaran Satyagraha", "1917", "Bihar; indigo; Rajkumar Shukla"], pyqExampleId: "eedc3f7a-1da8-4e0e-a531-ea5f99f43c88" },
          { cells: ["Ahmedabad mill strike and Kheda Satyagraha", "1918", "Gujarat"] },
        ],
      },
      pyqExampleId: "9218473b-7634-4c6c-aef5-410d6745cfa4",
      selfCheckExample: {
        prompt: "Gandhi led three struggles in 1917 and 1918. Match each to the people it was for.",
        steps: [
          "Champaran (1917): indigo cultivators in Bihar.",
          "Ahmedabad (1918): cotton mill workers.",
          "Kheda (1918): peasants who could not pay land revenue after a crop failure.",
        ],
        answer: "Champaran: indigo cultivators. Ahmedabad: mill workers. Kheda: peasants.",
      },
      practiceSet: [
        { prompt: "In which month and year did Gandhi return to India from South Africa?", answer: "January 1915" },
        { prompt: "Who persuaded Gandhi to visit Champaran?", answer: "Rajkumar Shukla" },
        { prompt: "In which language did Gandhi first write Hind Swaraj?", answer: "Gujarati" },
        { prompt: "Where was Gandhi born?", answer: "Porbandar, Gujarat" },
      ],
      traps: [
        {
          title: "Bardoli was Patel's, in 1928",
          body: "Gandhi's satyagrahas of **1917 and 1918** were **Champaran, Ahmedabad and Kheda**. **Bardoli (1928)** was led by **Vallabhbhai Patel**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoga-ncm",
      name: "Rowlatt, Jallianwala and Non-Cooperation (1919 to 1924)",
      intuition:
        "A harsh law in 1919 led to a massacre, and the massacre led to the first all-India movement. When it turned violent Gandhi stopped it, and some Congress leaders took a different path into the councils.",
      definition:
        "In time order:\n" +
        "- **Rowlatt Act (1919)**: allowed **detention without trial** for up to **two years**. Gandhi called a satyagraha against it.\n" +
        "- **Jallianwala Bagh (13 April 1919)**, **Amritsar**: General Dyer's troops fired on a crowd on Baisakhi day. **Rabindranath Tagore** gave up his **knighthood** in protest.\n" +
        "- **All India Trade Union Congress (1920)**, Bombay: first president **Lala Lajpat Rai**.\n" +
        "- **Non-Cooperation Movement (1920 to 1922)**: called off after **Chauri Chaura** (Gorakhpur, United Provinces, **February 1922**), where a crowd burned a police station.\n" +
        "- **Swaraj Party (1923)**: **C. R. Das (Deshbandhu)** and **Motilal Nehru**, to contest council elections.\n" +
        "- **Belgaum session (1924)**: the only Congress session **Gandhi** presided over.",
      table: {
        columns: ["Event", "Year", "Fact"],
        rows: [
          { cells: ["Rowlatt Act", "1919", "Detention without trial for two years"], pyqExampleId: "f130eb75-cf64-43c3-9bea-167735e9571b" },
          { cells: ["Jallianwala Bagh", "13 April 1919", "Amritsar; Tagore returned his knighthood"], pyqExampleId: "66f58670-6ac9-4427-912b-227ff8cbd758" },
          { cells: ["AITUC founded", "1920", "Bombay; Lala Lajpat Rai president"], pyqExampleId: "434abe73-9f9a-422a-9aca-ee92596aa052" },
          { cells: ["Chauri Chaura", "February 1922", "Non-Cooperation called off"], pyqExampleId: "ed86f323-8519-4fa5-854b-000c77951a6c" },
          { cells: ["Swaraj Party", "1923", "C. R. Das and Motilal Nehru"], pyqExampleId: "be6334cf-4d44-4e05-a6f3-c2e7b85f9a5d" },
          { cells: ["Belgaum session", "1924", "Gandhi presided"], pyqExampleId: "7662a9a4-44cd-4985-b130-0bf272d895c0" },
        ],
      },
      pyqExampleId: "06e9498c-34f7-43c8-b725-6f150faa1ddd",
      selfCheckExample: {
        prompt: "Why did Rabindranath Tagore give up his knighthood, and in which year?",
        steps: ["He did it in protest at the Jallianwala Bagh massacre at Amritsar.", "The massacre was on 13 April 1919, and he wrote to the Viceroy that May."],
        answer: "In protest at the Jallianwala Bagh massacre, in 1919.",
      },
      practiceSet: [
        { prompt: "Which freedom fighter is known as Deshbandhu?", answer: "Chittaranjan (C. R.) Das" },
        { prompt: "In which year was the AITUC founded?", answer: "1920" },
        { prompt: "Over which Congress session did Gandhi preside, the only one he ever did?", answer: "Belgaum, 1924" },
        { prompt: "For how long could the Rowlatt Act detain a person without trial?", answer: "Up to two years" },
      ],
      traps: [
        {
          title: "Chauri Chaura was in the United Provinces",
          body: "**Chauri Chaura** is in **Gorakhpur**, in present Uttar Pradesh, then the United Provinces. **Kakori (1925)** is also in UP but is a train robbery, three years later.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoga-cdm",
      name: "From the Simon Commission to the Poona Pact (1927 to 1932)",
      intuition:
        "An all-British commission set off protests, the Congress raised its demand to full independence, and the Salt March began a second mass movement. It ended with talks in London and a pact in Poona. Learn the six years in order.",
      definition:
        "In time order:\n" +
        "- **Simon Commission (appointed 1927)**: all seven members British, so the Congress boycotted it (\"Simon Go Back\"). **Lala Lajpat Rai** was hurt in the lathi charge at **Lahore** in 1928 and died weeks later.\n" +
        "- **Bardoli Satyagraha (1928)**: led by **Vallabhbhai Patel**, who earned the title Sardar.\n" +
        "- **Lahore session (December 1929)**: **Jawaharlal Nehru** presided; it passed the **Purna Swaraj** resolution. **26 January 1930** was kept as Independence Day, which is why the Constitution began on **26 January 1950**.\n" +
        "- **Dandi March (12 March 1930)**: against the British **monopoly on salt**; it began the **Civil Disobedience Movement**. The Viceroy was **Lord Irwin**.\n" +
        "- **Gandhi-Irwin Pact (March 1931)**: Gandhi then went to the **Second Round Table Conference** in London as the **Congress's sole representative**.\n" +
        "- **Poona Pact (September 1932)**: signed by Gandhi and **B. R. Ambedkar**; reserved seats in joint electorates replaced separate electorates for the depressed classes. Gandhi then founded the **Harijan Sevak Sangh (1932)**.",
      table: {
        columns: ["Event", "Year", "Name to remember"],
        rows: [
          { cells: ["Simon Commission protests", "1928", "Lala Lajpat Rai died after the Lahore lathi charge"], pyqExampleId: "21efb7bb-6b75-45ae-bdf3-a923bb25a365" },
          { cells: ["Bardoli Satyagraha", "1928", "Vallabhbhai Patel"], pyqExampleId: "48848858-c79f-41ff-8725-c2f9188dcc16" },
          { cells: ["Purna Swaraj resolution", "1929", "Lahore session, Nehru presiding"], pyqExampleId: "daf0c2b6-19e9-4146-8347-207dcffcc9ec" },
          { cells: ["Dandi March", "1930", "Viceroy Lord Irwin"], pyqExampleId: "29942331-079b-4ece-b56b-bf79764e59a2" },
          { cells: ["Gandhi-Irwin Pact", "1931", "Then the Second Round Table Conference"], pyqExampleId: "3d6f2f85-b77c-4259-83e2-f99200e93449" },
          { cells: ["Poona Pact", "1932", "Gandhi and Ambedkar"], pyqExampleId: "7d196bfc-d5d5-4d07-beec-2659340d614e" },
        ],
      },
      pyqExampleId: "f4c2caf1-dfcc-4b3e-901a-d00afadd5eaf",
      selfCheckExample: {
        prompt: "Why is 26 January the date of Republic Day?",
        steps: [
          "The Lahore session of December 1929 passed the Purna Swaraj resolution.",
          "The Congress kept 26 January 1930 as Independence Day, and the Constitution was brought into force on the same date in 1950 to honour it.",
        ],
        answer: "Because 26 January 1930 was observed as Purna Swaraj (Independence) Day.",
      },
      practiceSet: [
        { prompt: "Who presided over the Lahore session of 1929?", answer: "Jawaharlal Nehru" },
        { prompt: "Which British policy did the Salt Satyagraha of 1930 break?", answer: "The government's monopoly on making and selling salt" },
        { prompt: "Which Congress leader attended the Second Round Table Conference?", answer: "Mahatma Gandhi, as its sole representative" },
        { prompt: "With whom did Gandhi sign the Poona Pact?", answer: "B. R. Ambedkar" },
        { prompt: "Who led the Bardoli Satyagraha of 1928?", answer: "Vallabhbhai Patel" },
      ],
      traps: [
        {
          title: "Lahore 1929 is Purna Swaraj, Karachi 1931 is Fundamental Rights",
          body: "The demand for **complete independence** was passed at **Lahore (1929)**. The **Karachi (1931)** session passed the resolution on **Fundamental Rights**.",
        },
        {
          title: "Irwin at Dandi, Willingdon after",
          body: "**Lord Irwin** was Viceroy from **1926 to 1931**, so the Dandi March and the Gandhi-Irwin Pact fall in his time. **Willingdon** came in 1931.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoga-frontier",
      name: "Red Shirts, kisan sabhas and the revolutionaries of 1930",
      intuition:
        "Alongside Gandhi's movements ran others: a non-violent army of Pathans, peasant unions in Bihar, and young revolutionaries in Bengal who raided an armoury and stormed the secretariat. SSC asks the leader of each.",
      definition:
        "The movements:\n" +
        "- **Khudai Khidmatgar (1929)**, the **Red Shirts**: a non-violent movement of the **Pathans** of the North-West Frontier, founded by **Khan Abdul Ghaffar Khan**, the Frontier Gandhi.\n" +
        "- **Bihar Provincial Kisan Sabha (1929)**: **Swami Sahajanand Saraswati**.\n" +
        "- **Chittagong Armoury Raid (18 April 1930)**: led by **Surya Sen (Masterda)**.\n" +
        "- **Writers' Building, Calcutta (8 December 1930)**: **Benoy, Badal and Dinesh** shot the Inspector General of Prisons, N. S. Simpson.\n" +
        "- **Baikuntha Shukla (1932)**, Bihar: killed **Phanindra Nath Ghosh**, the **approver** whose evidence helped send Bhagat Singh to the gallows. He was hanged in 1934.",
      table: {
        columns: ["Movement or act", "Year", "Leader"],
        rows: [
          { cells: ["Khudai Khidmatgar (Red Shirts)", "1929", "Khan Abdul Ghaffar Khan"], pyqExampleId: "477108fc-0f4e-4f48-848d-50e6fe623072" },
          { cells: ["Bihar Provincial Kisan Sabha", "1929", "Swami Sahajanand Saraswati"], pyqExampleId: "8aeff368-229a-4340-abda-e6c1697bdd9f" },
          { cells: ["Chittagong Armoury Raid", "1930", "Surya Sen"], pyqExampleId: "fadcc33c-c3a0-4f9c-baac-667309e6ce48" },
          { cells: ["Approver Phanindra Nath Ghosh killed", "1932", "Baikuntha Shukla"], pyqExampleId: "b0cd0283-e41e-48bb-a867-5fb367b8fd41" },
        ],
      },
      pyqExampleId: "5fe401be-a65c-4e8b-beaa-d84bf3dadae9",
      selfCheckExample: {
        prompt: "Two bodies were founded in 1929, one among the Pathans and one among the peasants of Bihar. Name each with its founder.",
        steps: [
          "Among the Pathans: the Khudai Khidmatgar (Red Shirts), founded by Khan Abdul Ghaffar Khan.",
          "In Bihar: the Bihar Provincial Kisan Sabha, founded by Swami Sahajanand Saraswati.",
        ],
        answer: "Khudai Khidmatgar: Khan Abdul Ghaffar Khan. Bihar Provincial Kisan Sabha: Swami Sahajanand Saraswati.",
      },
      practiceSet: [
        { prompt: "Who led the Chittagong Armoury Raid of 1930?", answer: "Surya Sen (Masterda)" },
        { prompt: "By what name were the Khudai Khidmatgars popularly known?", answer: "The Red Shirts" },
        { prompt: "Who is called the Frontier Gandhi?", answer: "Khan Abdul Ghaffar Khan" },
        { prompt: "Whom did Baikuntha Shukla kill in 1932?", answer: "Phanindra Nath Ghosh, an approver in the Lahore Conspiracy Case" },
      ],
      traps: [
        {
          title: "The Red Shirts were non-violent",
          body: "The **Khudai Khidmatgars** were a **non-violent** body allied with the Congress. Do not mix them with the armed revolutionaries of the same years.",
        },
      ],
    },
  ],
};
