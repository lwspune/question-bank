import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_INDEPENDENCE_NOTE: SubtopicNote = {
  subtopicName: "Independence and After",
  title: "Independence and After",
  oneLineDefinition:
    "The road to freedom from the 1937 elections through Cripps, Quit India and the INA to the Cabinet Mission and partition, and the events of independent India that CDS now asks.",
  whyItMatters:
    "Twenty-one CDS questions, most of them MODERATE. The questions on India after 1947 are new: five of the seven are from 2025 and 2026. The freedom-struggle questions ask what a plan said or which party did what, so read each statement against the table.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-quit-india",
      name: "From the 1937 elections to Quit India",
      intuition:
        "The Congress won most provinces in 1937, but the war and the League's demand for Pakistan changed everything. Britain offered a deal through Cripps; the Congress answered with Quit India, and in some districts people set up their own governments.",
      definition:
        "The years 1937 to 1943:\n" +
        "- **1937 provincial elections**: the Congress was the largest party in most provinces, but **not in Punjab** (the **Unionist Party** led) **and Sind**.\n" +
        "- **1940**: **Subhas Bose** worked with the **Muslim League** in the satyagraha to remove the **Holwell Monument** in Calcutta.\n" +
        "- **1941**: **Sikandar Hayat Khan**, Unionist Premier of Punjab, rejected a Pakistan meaning \"Muslim Raj here and Hindu Raj elsewhere\".\n" +
        "- **Cripps Mission (March 1942)**: an **elected Constituent Assembly** after the war; a province unwilling to join could **keep its existing constitution**, and Britain could make a **separate arrangement with such non-acceding provinces**.\n" +
        "- **Quit India (August 1942)**: **Matangini Hazra** was shot at Tamluk, Bengal (1942), and **Lakshman Naik** of Koraput, Odisha, was hanged (1943).\n" +
        "- **Satara (1943)**: young leaders set up a **parallel government (prati sarkar)** with volunteer corps (**seva dals**) and village units (**tufan dals**).",
      table: {
        columns: ["Event", "Year", "Fact"],
        rows: [
          {
            cells: ["Provincial elections", "1937", "Congress not the largest party in Punjab and Sind"],
            pyqExampleId: "51c5e459-cacd-4c8c-b5f1-6a0118a1eb39",
          },
          {
            cells: ["Holwell Monument satyagraha", "1940", "Bose allied with the Muslim League"],
            pyqExampleId: "8e149c1d-1ce7-4071-ac11-8ce48dae90d7",
          },
          {
            cells: ["\"Muslim Raj here, Hindu Raj elsewhere\" rejected", "1941", "Sikandar Hayat Khan, Punjab"],
            pyqExampleId: "43b6400e-ae4d-494a-adb2-90a75b448c38",
          },
          {
            cells: ["Cripps Mission", "March 1942", "Elected Constituent Assembly; provinces could stay out"],
            pyqExampleId: "38f50384-d2cb-4788-9d6e-e549542c80c0",
          },
          { cells: ["Quit India", "August 1942", "Matangini Hazra and Lakshman Naik gave their lives"] },
          {
            cells: ["Satara parallel government", "1943", "Prati sarkar with seva dals and tufan dals"],
            pyqExampleId: "f0386a7d-f633-4898-930a-f04a567c4307",
          },
        ],
      },
      pyqExampleId: "9daa94d5-1513-4646-88f2-a68e45a51747",
      selfCheckExample: {
        prompt: "Under the Cripps offer of 1942, what could a province do if it did not want to join the new Union?",
        steps: [
          "It could keep its existing constitutional position.",
          "Britain would then make a separate constitutional arrangement with that non-acceding province.",
        ],
        answer: "Stay out with its existing constitution; Britain would make a separate arrangement with it.",
      },
      practiceSet: [
        { prompt: "Which party led in Punjab in the 1937 elections?", answer: "The Unionist Party" },
        { prompt: "In which month and year did the Cripps Mission come to India?", answer: "March 1942" },
        { prompt: "What were the village units of the Satara parallel government called?", answer: "Tufan dals" },
      ],
      traps: [
        {
          title: "Separate deal for those who stayed out",
          body: "Cripps promised a separate arrangement with provinces that did **not** join. A statement giving it to the **acceding** provinces reverses the offer.",
        },
        {
          title: "Punjab and Sind in 1937",
          body: "The Congress fell short in **Punjab and Sind**. Assam, Madras and the North-West Frontier Province are the wrong picks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-bose",
      name: "Subhas Bose and the INA",
      intuition:
        "Bose left the ICS to join the movement, broke with the Congress leadership, and in the war looked abroad for help: first to Germany, then to Japan. In South-East Asia he built an army out of Indian prisoners of war.",
      definition:
        "Bose's path:\n" +
        "- He resigned from the **Indian Civil Service** and **returned to India in 1921**.\n" +
        "- He wrote **The Indian Struggle**, his own account of the movement from 1920.\n" +
        "- In **1942**, in **Germany**, he started **Azad Hind Radio** (Berlin).\n" +
        "- In **1943** he took charge of the **Indian National Army** in South-East Asia. Its soldiers came largely from **Indian prisoners of war** held by Japan, and it had a women's unit, the **Rani of Jhansi Regiment**.\n" +
        "- The **Royal Indian Navy mutiny** broke out at **Bombay in February 1946**.",
      table: {
        columns: ["Event", "Year", "Fact"],
        rows: [
          {
            cells: ["Bose returns to India", "1921", "After resigning from the ICS"],
            noteAmber: "CDS 2024 (II) order: Lucknow Pact (1916), Bose's return, Cripps Mission (1942), naval mutiny (1946).",
            pyqExampleId: "b6535158-dd42-471d-b6b9-7371e955a3f3",
          },
          {
            cells: ["Azad Hind Radio", "1942", "Started by Bose in Germany"],
            pyqExampleId: "b77241ec-6f9b-403a-885c-165a03364467",
          },
          { cells: ["Bose leads the INA", "1943", "Prisoners of war; Rani of Jhansi Regiment"] },
          { cells: ["Royal Indian Navy mutiny", "February 1946", "Bombay"] },
        ],
      },
      pyqExampleId: "5f41c10f-dda2-42bd-890c-acb2b5f79d59",
      selfCheckExample: {
        prompt: "Put in order: the Cripps Mission, the Lucknow Pact, the naval mutiny at Bombay, and Bose's return to India.",
        steps: [
          "Lucknow Pact: 1916.",
          "Bose's return after leaving the ICS: 1921.",
          "Cripps Mission: 1942. Naval mutiny: February 1946.",
        ],
        answer: "Lucknow Pact, Bose's return, Cripps Mission, naval mutiny.",
      },
      practiceSet: [
        { prompt: "Which service did Bose resign from before returning to India in 1921?", answer: "The Indian Civil Service" },
        { prompt: "In which city did the Royal Indian Navy mutiny break out in 1946?", answer: "Bombay" },
        { prompt: "Which book did Bose write on the national movement?", answer: "The Indian Struggle" },
      ],
      traps: [
        {
          title: "Azad Hind Radio began in Germany",
          body: "Bose started **Azad Hind Radio** in **Germany** (1942), before he went to South-East Asia. Japan and Malaysia are the distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-transfer",
      name: "From the Cabinet Mission to partition",
      intuition:
        "In 1946 Britain sent three Cabinet ministers to hand over power to a united India with weak centre and strong provinces. The plan broke down, and in 1947 the country was divided, with the new borders drawn in a few weeks.",
      definition:
        "The last years:\n" +
        "- **Cabinet Mission (1946)**: came to negotiate the **transfer of power**. It proposed a federation of **provinces and princely states** with a **Union centre** for **defence, foreign affairs and communications**. Provinces could form **regional groups** and give them some powers by mutual agreement.\n" +
        "- The **Muslim League accepted** the plan on **6 June 1946**, although it rejected a sovereign Pakistan; the Congress gave a qualified acceptance later that month.\n" +
        "- **Sylhet referendum (July 1947)**: Sylhet district went from Assam to **East Bengal**.\n" +
        "- **Sir Cyril Radcliffe** chaired the commissions that drew the partition lines in **Punjab and Bengal**. The **Durand Line** (Afghanistan) and **McMahon Line** (Tibet) are older frontiers.\n" +
        "- In **January 1948** Gandhi proposed that the Congress be dissolved as a political body and become a **Lok Sevak Sangh** for social service.",
      table: {
        columns: ["Event", "Date", "Fact"],
        rows: [
          {
            cells: ["Cabinet Mission", "1946", "Union centre for defence, foreign affairs, communications; provinces could group"],
            pyqExampleId: "61f3e1e2-b5f0-4501-bb6a-007a1a03b117",
          },
          {
            cells: ["Muslim League accepts the plan", "6 June 1946", "Though it rejected a sovereign Pakistan"],
            pyqExampleId: "2a561891-6b5e-4396-956b-1c72b17d366f",
          },
          {
            cells: ["Sylhet referendum", "July 1947", "Sylhet joined East Bengal"],
            pyqExampleId: "f84cddef-277b-49cf-a957-d1669e67b304",
          },
          { cells: ["Partition boundaries", "August 1947", "Drawn by commissions under Cyril Radcliffe"] },
          {
            cells: ["Lok Sevak Sangh proposal", "January 1948", "Gandhi: dissolve the Congress as a political party"],
            pyqExampleId: "c2b73278-6878-4563-b95f-32cce5b21355",
          },
        ],
      },
      pyqExampleId: "dd66b154-ec7f-42bb-ac5c-a50360e9be95",
      selfCheckExample: {
        prompt: "Why did the Muslim League accept the Cabinet Mission Plan in June 1946, when the plan rejected a sovereign Pakistan?",
        steps: [
          "The plan let provinces form regional groups with their own powers.",
          "The League hoped these groups of Muslim-majority provinces would give it much of what it wanted.",
        ],
        answer: "Because it hoped the grouping of provinces would serve nearly the same end as Pakistan.",
      },
      practiceSet: [
        { prompt: "Which three subjects did the Cabinet Mission leave to the Union centre?", answer: "Defence, foreign affairs and communications" },
        { prompt: "Into which province or state did Sylhet go after the 1947 referendum?", answer: "East Bengal" },
        { prompt: "Into what did Gandhi propose to turn the Congress in 1948?", answer: "A Lok Sevak Sangh" },
      ],
      traps: [
        {
          title: "The League accepted first",
          body: "On **6 June 1946** it was the **Muslim League** that formally accepted the Cabinet Mission Plan. The Congress accepted with reservations later in June.",
        },
        {
          title: "Durand and McMahon are older lines",
          body: "The **Durand Line** (1893, Afghanistan) and the **McMahon Line** (1914, Tibet) were drawn long before partition. The 1947 borders were **Radcliffe's**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-after",
      name: "India after independence",
      intuition:
        "CDS has begun to ask about India after 1947: how the states joined, the wars and agreements with Pakistan and China, and the first holders of high offices. Learn them in time order.",
      definition:
        "In time order:\n" +
        "- **Hyderabad (1948)**: the Nizam signed only a Standstill Agreement; after the **police action of September 1948** the state joined India.\n" +
        "- **1954**: the first Bharat Ratna awards, to **C. Rajagopalachari**, S. Radhakrishnan and C.V. Raman.\n" +
        "- **December 1962**: Soviet leader **Nikita Khrushchev** held China responsible for the 1962 war with India.\n" +
        "- **1963**: **Sucheta Kripalani** became Chief Minister of Uttar Pradesh, India's **first woman Chief Minister**.\n" +
        "- **January 1966**: the **Tashkent Declaration** between **India and Pakistan** (Shastri and Ayub Khan), with the Soviet Union as host.\n" +
        "- **Integral Humanism**: the doctrine of **Deendayal Upadhyaya**, adopted by the Bharatiya Jana Sangh in 1965.\n" +
        "- **Simla Agreement (1972)**, **Pokhran-I (1974)**, **SAARC Charter at Dhaka (1985)**, **Agra Summit (2001)**.\n" +
        "- **Morarji Desai** was Prime Minister from **March 1977 to July 1979**; **Charan Singh** (founder of the Bharatiya Kranti Dal) followed until January 1980.",
      table: {
        columns: ["Event", "Year", "Fact"],
        rows: [
          {
            cells: ["Hyderabad joins India", "1948", "After the police action of September 1948"],
            pyqExampleId: "a2e1cdd5-34c4-482b-8ddf-62a8dadb5125",
          },
          {
            cells: ["Khrushchev blames China", "December 1962", "Soviet view of the Sino-Indian war"],
            pyqExampleId: "0f3c7ba4-771a-4ae8-92c7-8a0a3ad8004d",
          },
          {
            cells: ["First woman Chief Minister", "1963", "Sucheta Kripalani, Uttar Pradesh"],
            pyqExampleId: "72d9df6c-09a4-4902-bced-4c685da836cb",
          },
          { cells: ["Tashkent Declaration", "January 1966", "India and Pakistan, after the 1965 war"] },
          {
            cells: ["Simla Agreement", "1972", "India and Pakistan"],
            noteAmber: "CDS 2025 (II) order: Simla (1972), Pokhran-I (1974), SAARC Charter (1985), Agra Summit (2001).",
            pyqExampleId: "7d4ed22c-cb9e-4551-a7f4-ca4457b0dcca",
          },
          { cells: ["Pokhran-I", "1974", "India's first nuclear test"] },
          {
            cells: ["Morarji Desai Prime Minister", "1977 to 1979", "Charan Singh followed until 1980"],
            pyqExampleId: "f3ff521a-d91f-45ae-9489-d6a1e14a2486",
          },
          { cells: ["SAARC Charter", "1985", "First SAARC Summit, Dhaka"] },
          { cells: ["Agra Summit", "2001", "Vajpayee and Musharraf"] },
        ],
      },
      pyqExampleId: "a6ec7b81-24c5-48b5-88bc-128dd0278ff0",
      selfCheckExample: {
        prompt: "Why did Hyderabad's joining India need a police action in 1948?",
        steps: [
          "The Nizam refused to accede and signed only a Standstill Agreement.",
          "The Indian army entered the state in September 1948; the Nizam surrendered and Hyderabad joined India.",
        ],
        answer: "The Nizam would not accede, so India sent in the army in September 1948.",
      },
      practiceSet: [
        { prompt: "Which state did Sucheta Kripalani lead as Chief Minister?", answer: "Uttar Pradesh" },
        { prompt: "Who became Prime Minister after Morarji Desai in 1979?", answer: "Charan Singh" },
        { prompt: "Who propounded the doctrine of Integral Humanism?", answer: "Deendayal Upadhyaya" },
        { prompt: "In which year was India's first nuclear test held at Pokhran?", answer: "1974" },
      ],
      traps: [
        {
          title: "Morarji left in 1979",
          body: "**Morarji Desai** was Prime Minister from **1977 to 1979**, not to 1980. Charan Singh held office from July 1979 to January 1980.",
        },
      ],
    },
  ],
};
