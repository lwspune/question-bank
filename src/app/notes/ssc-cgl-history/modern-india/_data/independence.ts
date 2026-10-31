import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_HMO_INDEPENDENCE_NOTE: SubtopicNote = {
  subtopicName: "Quit India and Independence",
  title: "Quit India and Independence",
  oneLineDefinition:
    "The last decade before freedom: the new parties of 1936 to 1939, Subhas Chandra Bose and the INA, Quit India and its young martyrs, and the British missions that ended in the partition plan of 1947.",
  whyItMatters:
    "Fourteen questions in the bank: eight from the 2023 shifts, three from the 2024 shifts and three from the 2025 shifts, and all but one EASY. The 2025 papers asked about the martyrs of Quit India, people a textbook mentions in a line, so learn the names in the table along with the big events.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sschmoqi-bose",
      name: "Subhas Chandra Bose, the Forward Bloc and the INA",
      intuition:
        "Bose broke with Gandhi in 1939 and then fought from abroad, first from Germany and then from South-East Asia. Each body he built has a year and a country, and SSC asks the country.",
      definition:
        "In time order:\n" +
        "- **The Indian Struggle (1935)**: Bose's history of the freedom movement, written in exile.\n" +
        "- **Forward Bloc (1939)**: founded after Bose **resigned as Congress President** over his differences with Gandhi.\n" +
        "- **Free India Legion, or Tiger Legion (1941)**: raised by Bose in **Germany** from Indian prisoners of war.\n" +
        "- **Indian National Army**: formed in **Singapore** in **1942** by **Captain Mohan Singh** from prisoners taken by the Japanese, and revived by **Bose** there in **1943**.",
      table: {
        columns: ["Body or book", "Year", "Where or why"],
        rows: [
          { cells: ["The Indian Struggle", "1935", "Bose's history of the movement"], pyqExampleId: "bb1ae608-0367-4725-89b3-1fb84d736644" },
          { cells: ["All India Forward Bloc", "1939", "After he resigned the Congress presidency"], pyqExampleId: "46cab347-f715-487f-bcbe-4f9b119356d2" },
          { cells: ["Free India Legion (Tiger Legion)", "1941", "Germany"], pyqExampleId: "2efca488-38a1-424f-a174-8b82aab1ad6b" },
          { cells: ["Indian National Army", "1942, revived 1943", "Singapore"] },
        ],
      },
      pyqExampleId: "b3549da5-5fa9-47c2-b68d-6e12ccdd6446",
      selfCheckExample: {
        prompt: "Bose raised one force in Europe and led another in Asia. Name each with its country.",
        steps: ["In Europe: the Free India Legion (Tiger Legion), in Germany.", "In Asia: the Indian National Army, which he revived in Singapore in 1943."],
        answer: "Free India Legion: Germany. INA: Singapore.",
      },
      practiceSet: [
        { prompt: "Which party did Subhas Chandra Bose found in 1939?", answer: "The All India Forward Bloc" },
        { prompt: "In which country did Bose raise the Free India Legion?", answer: "Germany" },
        { prompt: "Which officer first formed the Indian National Army in 1942?", answer: "Captain Mohan Singh" },
        { prompt: "Which book did Subhas Chandra Bose write about the freedom movement?", answer: "The Indian Struggle" },
      ],
      traps: [
        {
          title: "Germany for the Legion, Singapore for the INA",
          body: "The **Tiger Legion** was raised in **Germany**. The **INA** was formed and revived in **Singapore**, not in Japan, though the Japanese backed it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoqi-quit",
      name: "Quit India and its martyrs",
      intuition:
        "In August 1942 the leaders were arrested within hours, so ordinary people led the movement. Many of the people SSC asks about were young, and several were women who died holding the flag.",
      definition:
        "The facts:\n" +
        "- **8 August 1942**, Gowalia Tank Maidan, **Bombay**: the Quit India resolution; **Gandhi** gave the call **Do or Die**.\n" +
        "- **Usha Mehta**, with her associates, ran the secret **Congress Radio** from Bombay.\n" +
        "- **Matangini Hazra**, known as Gandhi Buri, was shot dead leading a march on the **Tamluk** police station in **Bengal**, holding the flag.\n" +
        "- **Kanaklata Barua**, aged 17, was shot dead at the **Gohpur** police station in **Assam** while trying to hoist the flag.\n\n" +
        "Earlier, in **1938**, **Baji Raut**, a **12-year-old** boatman of Dhenkanal in **Odisha**, was shot for refusing to ferry the police across the Brahmani river. He is remembered as one of India's youngest martyrs.",
      table: {
        columns: ["Person", "Year", "What they did"],
        rows: [
          { cells: ["Mahatma Gandhi", "1942", "Gave the call Do or Die, Bombay"], pyqExampleId: "fe81ce83-1876-441d-a85a-4fd3d6d41bba" },
          { cells: ["Usha Mehta", "1942", "Ran the secret Congress Radio"], pyqExampleId: "c7078a4d-3e57-4298-835c-a2710161a838" },
          { cells: ["Matangini Hazra", "1942", "Shot leading a march on Tamluk police station, Bengal"], pyqExampleId: "31c5d008-8713-42f1-9fa2-b7a9d4833645" },
          { cells: ["Baji Raut", "1938", "Boy boatman of Odisha, shot at 12"], pyqExampleId: "cd26fffb-560e-4392-ae8a-7753c0992a1c" },
        ],
      },
      pyqExampleId: "40e61738-4417-4858-9c81-7487805f94f3",
      selfCheckExample: {
        prompt: "Two women died holding the flag during Quit India. Name each with the police station she marched on.",
        steps: ["Matangini Hazra marched on the Tamluk police station in Bengal.", "Kanaklata Barua marched on the Gohpur police station."],
        answer: "Matangini Hazra: Tamluk. Kanaklata Barua: Gohpur.",
      },
      practiceSet: [
        { prompt: "Who gave the call Do or Die in August 1942?", answer: "Mahatma Gandhi" },
        { prompt: "Who ran the secret Congress Radio during the Quit India Movement?", answer: "Usha Mehta" },
        { prompt: "By what name was Matangini Hazra known?", answer: "Gandhi Buri" },
        { prompt: "How old was Baji Raut when the police shot him in 1938?", answer: "12" },
      ],
      traps: [
        {
          title: "Bhikaji Cama is 1907, not 1942",
          body: "A question on the **Congress Radio** may list **Bhikaji Cama**. She unfurled a flag at **Stuttgart in 1907**; the radio was **Usha Mehta's** in **1942**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sschmoqi-missions",
      name: "New parties of 1936 and the missions to 1947",
      intuition:
        "In 1936 peasants and workers got all-India bodies of their own. During and after the war Britain sent mission after mission with offers, and the last Viceroy announced partition. SSC asks the year of each mission.",
      definition:
        "In time order:\n" +
        "- **All India Kisan Sabha (April 1936)**: founded at **Lucknow**, with **Swami Sahajanand Saraswati** as president.\n" +
        "- **Independent Labour Party (1936)**: **B. R. Ambedkar**.\n" +
        "- **Cripps Mission (March 1942)**: **Sir Stafford Cripps** offered dominion status after the war.\n" +
        "- **Cabinet Mission (March 1946)**: Pethick-Lawrence, Cripps and A. V. Alexander, to plan the transfer of power.\n" +
        "- **Mountbatten Plan (3 June 1947)**: **Lord Mountbatten**, the last Viceroy, announced the division of British India into India and Pakistan.",
      table: {
        columns: ["Event", "Year", "Name to remember"],
        rows: [
          { cells: ["All India Kisan Sabha", "1936", "Lucknow; Sahajanand Saraswati"], pyqExampleId: "0facb78c-947e-4afa-9db5-057e74c9cc12" },
          { cells: ["Independent Labour Party", "1936", "B. R. Ambedkar"], pyqExampleId: "a48d0025-82af-4254-b53e-918337342501" },
          { cells: ["Cripps Mission", "1942", "Sir Stafford Cripps"], pyqExampleId: "cf154db9-9bf2-4c24-9fe6-5f549b66d78e" },
          { cells: ["Cabinet Mission", "1946", "Three British cabinet ministers"] },
          { cells: ["Partition plan", "3 June 1947", "Lord Mountbatten"], pyqExampleId: "7b641d57-7d3d-4ce5-8535-4eccdf08ebf7" },
        ],
      },
      pyqExampleId: "dba6cd0b-151b-4045-82c6-b3c499019d6a",
      selfCheckExample: {
        prompt: "Stafford Cripps came to India twice. In which years, and how did the two visits differ?",
        steps: [
          "In 1942 he led a mission of his own, the Cripps Mission, offering dominion status after the war.",
          "In 1946 he came as one of three ministers of the Cabinet Mission, to plan the transfer of power.",
        ],
        answer: "1942: the Cripps Mission. 1946: a member of the Cabinet Mission.",
      },
      practiceSet: [
        { prompt: "Where was the All India Kisan Sabha founded in 1936?", answer: "Lucknow" },
        { prompt: "Which party did B. R. Ambedkar found in 1936?", answer: "The Independent Labour Party" },
        { prompt: "Which Viceroy announced the plan to divide British India in June 1947?", answer: "Lord Mountbatten" },
        { prompt: "Who led the British mission to India in March 1942?", answer: "Sir Stafford Cripps" },
      ],
      traps: [
        {
          title: "Cripps 1942, Cabinet 1946",
          body: "The two missions are asked as each other's wrong year. **Cripps** came in **1942**, during the war; the **Cabinet Mission** came in **1946**, after it.",
        },
      ],
    },
  ],
};
