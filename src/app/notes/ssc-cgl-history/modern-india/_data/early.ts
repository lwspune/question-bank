import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_EARLY_NOTE: SubtopicNote = {
  subtopicName: "Early Nationalism and Revolutionaries",
  title: "Early Nationalism and Revolutionaries",
  oneLineDefinition:
    "The Congress from 1885 to 1916, the partition of Bengal and the Swadeshi movement, and the revolutionaries who fought in India and from London, Germany and America up to the First World War.",
  whyItMatters:
    "Twenty questions in the bank: 11 from the 2023 shifts, five from the 2024 shifts and four from the 2025 shifts, 15 of them EASY. The questions are about firsts and places: the first sessions of the Congress, the city where each revolutionary body was founded, the country that turned the Komagata Maru away.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmoen-congress",
      name: "The early Congress and the Swadeshi years",
      intuition:
        "The Congress began as a yearly meeting of educated Indians asking for reforms. The partition of Bengal in 1905 turned petition into protest: Swadeshi, boycott, and the demand for Swaraj. Each step has a session or a year attached.",
      definition:
        "In time order:\n" +
        "- **Indian National Congress (1885)**, founded at **Bombay** in December. First president **W. C. Bonnerjee**; the second session (Calcutta, **1886**) was presided over by **Dadabhai Naoroji**.\n" +
        "- **Partition of Bengal**: announced by **Curzon** in **July 1905**, in force from **16 October 1905**, annulled in **1911**. It started the **Swadeshi movement**.\n" +
        "- **V. O. Chidambaram Pillai**, Kappalottiya Thamizhan (the Tamil who sailed ships), founded the **Swadeshi Steam Navigation Company** at **Tuticorin (1906)**.\n" +
        "- **Calcutta session (1906)**, presided over by **Naoroji**: **Swaraj** declared the Congress's goal. The Muslim League was founded the same year.\n" +
        "- **Bankipore (Patna) session (1912)**: the Congress session held in Bihar.\n" +
        "- **Hindu Mahasabha (1915)**, founded at Haridwar.\n" +
        "- **Lucknow Pact (1916)**: the Congress and the Muslim League agreed on joint demands at their **Lucknow** sessions.\n" +
        "- **Home Rule Leagues (1916)**: two leagues, one under **Tilak** and one under **Annie Besant**.",
      table: {
        columns: ["Event", "Year", "Name or place"],
        rows: [
          { cells: ["Indian National Congress founded", "1885", "Bombay"], pyqExampleId: "91fe3d4f-76b7-482b-8217-bc8c0d2ee847" },
          { cells: ["Second Congress session", "1886", "Calcutta, Dadabhai Naoroji presiding"], pyqExampleId: "d4350359-619a-4d90-a6b0-f8b45d971891" },
          { cells: ["Partition of Bengal", "1905", "Lord Curzon"], pyqExampleId: "c629e72b-14e9-4b37-b3c1-5a138100d661" },
          { cells: ["Swaraj declared the goal", "1906", "Calcutta session, Naoroji presiding"], pyqExampleId: "f5b7f906-4f98-4bcf-9505-a948eff8cf28" },
          { cells: ["Congress session in Bihar", "1912", "Bankipore (Patna)"], pyqExampleId: "638c2533-0a5e-4311-a1da-b23cda2a726a" },
          { cells: ["Lucknow Pact", "1916", "Congress and Muslim League"], pyqExampleId: "d1cdfab2-dddf-49e8-bf78-d46e9f413a6d" },
          { cells: ["Home Rule Leagues", "1916", "Tilak and Annie Besant"], pyqExampleId: "d8e48afa-79f1-4e17-9eea-6126ab95c168" },
        ],
      },
      pyqExampleId: "9e75fdfb-f097-4b02-b313-1aedef8d3973",
      selfCheckExample: {
        prompt: "Dadabhai Naoroji presided over two Congress sessions in Calcutta that SSC asks about. What is each remembered for?",
        steps: [
          "In 1886 he presided over the second session of the Congress.",
          "In 1906 he presided over the session that declared Swaraj the Congress's goal.",
        ],
        answer: "1886: the second session. 1906: Swaraj declared the goal.",
      },
      practiceSet: [
        { prompt: "Who was the first president of the Indian National Congress?", answer: "W. C. Bonnerjee" },
        { prompt: "In which year was the partition of Bengal annulled?", answer: "1911" },
        { prompt: "Which two leaders set up the two Home Rule Leagues of 1916?", answer: "Bal Gangadhar Tilak and Annie Besant" },
        { prompt: "At which city's sessions did the Congress and the Muslim League sign their pact of 1916?", answer: "Lucknow" },
        { prompt: "Where was the 1912 session of the Congress held?", answer: "Bankipore (Patna), Bihar" },
      ],
      traps: [
        {
          title: "Naoroji, not Bonnerjee, at the second session",
          body: "**W. C. Bonnerjee** presided over the **first** session (Bombay, 1885). The **second** (Calcutta, 1886) was **Dadabhai Naoroji's**.",
        },
        {
          title: "Bengal partitioned in 1905, reunited in 1911",
          body: "An option of **1911** is the year the partition was **annulled**, not made.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoen-revolutionaries",
      name: "Revolutionaries at home and abroad (1897 to 1915)",
      intuition:
        "Some nationalists gave up on petitions and turned to the bomb and the gun. Many worked from abroad, in London, Paris, Germany and the American west coast. SSC asks who did what, and where.",
      definition:
        "In time order:\n" +
        "- **Chapekar brothers (1897)**: shot **W. C. Rand**, head of the plague committee in **Pune**.\n" +
        "- **India House (1905)**, **London**: **Shyamji Krishna Varma**. Savarkar and Madan Lal Dhingra worked there.\n" +
        "- **Bhikaji Cama (1907)**: unfurled an Indian flag at the **International Socialist Congress, Stuttgart**, Germany.\n" +
        "- **Khudiram Bose and Prafulla Chaki (1908)**: threw a bomb at **Muzaffarpur** at a carriage they thought carried the judge **Kingsford**.\n" +
        "- **United India House (1910)**, **Seattle**: **Tarak Nath Das** and **G. D. Kumar**.\n" +
        "- **V. D. Savarkar**: arrested in London in 1910, sent to the **Cellular Jail, Andaman, in 1911**.\n" +
        "- **Ghadar Party (1913)**, **San Francisco**: **Sohan Singh Bhakna** (president) and **Lala Har Dayal**.\n" +
        "- **Komagata Maru (1914)**: a ship of Indian passengers turned away at Vancouver by **Canada**.\n" +
        "- **Bagha Jatin (Jatindranath Mukherjee)**: a **Jugantar** leader of **Bengal**, who died of his wounds after a gun battle at Balasore in 1915.",
      table: {
        columns: ["Revolutionary or body", "Year", "Place"],
        rows: [
          { cells: ["Chapekar brothers", "1897", "Pune"], pyqExampleId: "53b56e87-2615-4f0b-b08c-420e49caba93" },
          { cells: ["India House (Shyamji Krishna Varma)", "1905", "London"], pyqExampleId: "2de13068-5dbe-40ae-9fcb-b827eae3d2c7" },
          { cells: ["Khudiram Bose and Prafulla Chaki", "1908", "Muzaffarpur"], pyqExampleId: "a19ee14c-4114-498d-83fd-7109b92a7340" },
          { cells: ["United India House (Tarak Nath Das)", "1910", "Seattle"], pyqExampleId: "84d96f0d-2cc7-4df0-8bfb-4820887e3bd7" },
          { cells: ["Ghadar Party (Bhakna, Har Dayal)", "1913", "San Francisco"], pyqExampleId: "decc2bf0-27d1-4f7b-bad4-52d0b9ebb7ff" },
          { cells: ["Komagata Maru turned away", "1914", "Vancouver, Canada"], pyqExampleId: "2e08c947-4f91-4645-bb02-36b32dc0735b" },
        ],
      },
      pyqExampleId: "bc88c958-f420-45be-9e90-3662159918e2",
      selfCheckExample: {
        prompt: "Three revolutionary bodies were set up abroad between 1905 and 1913. Name each with its city.",
        steps: [
          "India House, by Shyamji Krishna Varma, in London (1905).",
          "United India House, by Tarak Nath Das and G. D. Kumar, in Seattle (1910).",
          "The Ghadar Party, under Sohan Singh Bhakna and Har Dayal, in San Francisco (1913).",
        ],
        answer: "India House: London. United India House: Seattle. Ghadar Party: San Francisco.",
      },
      practiceSet: [
        { prompt: "Which country refused to let the Komagata Maru's passengers land in 1914?", answer: "Canada" },
        { prompt: "With whom did Khudiram Bose throw the bomb at Muzaffarpur in 1908?", answer: "Prafulla Chaki" },
        { prompt: "In which year was V. D. Savarkar sent to the Cellular Jail in the Andamans?", answer: "1911" },
        { prompt: "Which British official did the Chapekar brothers shoot in 1897?", answer: "W. C. Rand, head of the plague committee in Pune" },
        { prompt: "With which revolutionary group of Bengal was Bagha Jatin linked?", answer: "Jugantar" },
      ],
      traps: [
        {
          title: "Arrested in 1910, in the Andamans in 1911",
          body: "Savarkar was **arrested** in London in **1910** and reached the **Cellular Jail** in **1911**. SSC asks the jail year, so 1910 is the trap.",
        },
        {
          title: "Two India Houses",
          body: "**India House** in **London (1905)** was Shyamji Krishna Varma's. The **United India House** in **Seattle (1910)** was Tarak Nath Das's.",
        },
      ],
    },
  ],
};
