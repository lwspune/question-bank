import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_MO_SOCIETY_NOTE: SubtopicNote = {
  subtopicName: "Caste, Women and Social Service",
  title: "Caste, Women and Social Service",
  oneLineDefinition:
    "The movements against caste from Phule to Ambedkar, the women reformers and firsts, and the service societies, journals and Marathi writers of social reform.",
  whyItMatters:
    "Sixteen CDS questions, nine of them HARD, and four of them from 2025 alone. The Seva Samiti of Allahabad was asked in 2020 and again in 2023, and its Boy Scouts wing in 2020 as well. The HARD ones name lesser-known people, so the tables list each person with exactly one deed.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshimo-caste",
      name: "Movements against caste",
      intuition:
        "Reform that began with the upper castes soon met reform led from below. Phule in Maharashtra, Narayana Guru in Kerala, Periyar in Tamil Nadu and Ambedkar across India each attacked caste in their own region and style.",
      definition:
        "The movements in time order:\n" +
        "- **Jyotiba Phule** founded the **Satyashodhak Samaj (1873)** in Maharashtra.\n" +
        "- **Sri Narayana Guru**: the **Sri Narayana Dharma Paripalana (SNDP) Yogam** in **Kerala**, for the dignity, education and temple entry of the **Ezhava** community.\n" +
        "- **E.V. Ramaswamy Naicker (Periyar)** began the **Self-Respect Movement** in Tamil Nadu in the mid-1920s, against Brahmin dominance and caste.\n" +
        "- **B.R. Ambedkar** led the temple entry satyagraha at the **Kalaram temple, Nashik (Maharashtra)**, from **1930**.\n" +
        "- Ambedkar founded the **All India Scheduled Castes Federation (1942)**, out of his earlier **Independent Labour Party**.",
      table: {
        columns: ["Movement", "Year", "Leader and region"],
        rows: [
          {
            cells: ["Satyashodhak Samaj", "1873", "Jyotiba Phule, Maharashtra"],
            noteAmber: "CDS 2025 (II) put it before the Bardoli Satyagraha (1928) and the Chipko Movement (1973).",
            pyqExampleId: "8a8296f1-6735-4e15-a7aa-39412965c756",
          },
          {
            cells: ["SNDP Yogam", "1903", "Sri Narayana Guru, Kerala"],
            pyqExampleId: "1297b7d9-4048-4e37-bec7-b2b911b60691",
          },
          { cells: ["Self-Respect Movement", "Mid-1920s", "Periyar, Tamil Nadu"] },
          {
            cells: ["Kalaram temple satyagraha", "1930", "B.R. Ambedkar, Nashik, Maharashtra"],
            pyqExampleId: "4256578d-e303-41fa-a9fe-4485d7d456dc",
          },
          {
            cells: ["All India Scheduled Castes Federation", "1942", "B.R. Ambedkar"],
            pyqExampleId: "cbbb2e40-a236-4833-874e-899a38c3c2b6",
          },
        ],
      },
      pyqExampleId: "91733f7c-cc9f-48c4-9753-ebbf93807063",
      selfCheckExample: {
        prompt: "For which community did Sri Narayana Guru's SNDP Yogam work, and in which state?",
        steps: [
          "Sri Narayana Guru worked in Kerala.",
          "The Yogam pressed for temple entry, education and dignity for the Ezhavas.",
        ],
        answer: "The Ezhavas, in Kerala.",
      },
      practiceSet: [
        { prompt: "Who founded the Satyashodhak Samaj in 1873?", answer: "Jyotiba Phule" },
        { prompt: "Out of which earlier party of his did Ambedkar form the Scheduled Castes Federation?", answer: "The Independent Labour Party" },
        { prompt: "Who led the Bardoli Satyagraha of 1928?", answer: "Vallabhbhai Patel" },
      ],
      traps: [
        {
          title: "Self-Respect was Periyar's",
          body: "The **Self-Respect Movement** was begun by **Periyar** (E.V. Ramaswamy Naicker). Ambedkar and Phule led other movements, and Nehru none of this kind.",
        },
        {
          title: "Kalaram is in Maharashtra",
          body: "The **Kalaram temple** stands at **Nashik**, Maharashtra. Kerala's famous temple entry struggles were at Vaikom and Guruvayur.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-women",
      name: "Women reformers and firsts",
      intuition:
        "Reform for women began even before the British: two 18th-century leaders tried to allow widows to remarry. Later, women spoke for themselves, in a fierce book, in a girls' school, and in a legislature.",
      definition:
        "In time order:\n" +
        "- In the **18th century**, **Raja Sawai Jai Singh of Amber** and the Maratha general **Parshuram Bhau** tried to promote **widow remarriage**.\n" +
        "- **Raja Ram Mohan Roy** opposed **sati**, which was banned in 1829.\n" +
        "- **Tarabai Shinde** wrote **Stri Purush Tulana (A Comparison between Women and Men)**, attacking the double standards men set for women. She was a writer, not a doctor.\n" +
        "- **Pandita Ramabai** started a home for widows at Poona.\n" +
        "- **Mataji Maharani Tapaswini** founded the **Mahakali Pathshala** in Calcutta (**1893**), a girls' school rooted in Hindu learning.\n" +
        "- **Dr Muthulakshmi Reddy** was the first girl admitted to a men's college, a doctor, and the **first woman legislator** in British India (Madras Legislative Council, **1927**). Her 1956 honour was the **Padma Bhushan**.",
      table: {
        columns: ["Person", "Time", "What she or he did"],
        rows: [
          { cells: ["Raja Sawai Jai Singh of Amber", "18th century", "Tried to promote widow remarriage"] },
          {
            cells: ["Parshuram Bhau", "18th century", "Maratha general; tried to promote widow remarriage"],
            pyqExampleId: "4cd09848-c8c2-41eb-80ca-b106a60d6ddb",
          },
          {
            cells: ["Tarabai Shinde", "1882", "Wrote Stri Purush Tulana"],
            pyqExampleId: "e462285b-1eb3-440e-a5d6-b196d587b00b",
          },
          {
            cells: ["Mataji Maharani Tapaswini", "1893", "Founded the Mahakali Pathshala, Calcutta"],
            pyqExampleId: "b79afdad-9581-464a-8625-192d75e95e64",
          },
          { cells: ["Muthulakshmi Reddy", "1927", "First woman legislator in British India"] },
        ],
      },
      pyqExampleId: "a0d28def-1296-4a31-ba0e-796bb650c12c",
      selfCheckExample: {
        prompt: "Who wrote Stri Purush Tulana, and what kind of work was it?",
        steps: [
          "It was written by Tarabai Shinde of Maharashtra.",
          "It is a book of protest: it compares how society treats women and men and attacks men's double standards.",
        ],
        answer: "Tarabai Shinde; a book of social protest comparing the treatment of women and men.",
      },
      practiceSet: [
        { prompt: "Name an 18th-century Rajput ruler who tried to promote widow remarriage.", answer: "Raja Sawai Jai Singh of Amber" },
        { prompt: "Who founded the Mahakali Pathshala in Calcutta?", answer: "Mataji Maharani Tapaswini" },
        { prompt: "Which reformer started a home for widows at Poona?", answer: "Pandita Ramabai" },
      ],
      traps: [
        {
          title: "Tarabai Shinde wrote the Comparison",
          body: "**Stri Purush Tulana (A Comparison between Women and Men)** is **Tarabai Shinde's** book, not Pandita Ramabai's. CDS 2025 swapped the two names.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshimo-service",
      name: "Service societies, journals and Marathi reformers",
      intuition:
        "Some reformers worked by service: relief, scouting, tribal welfare. Others worked by writing: a reform weekly, or a hundred letters to a newspaper. CDS asks the person behind each, and the names are easy to mix up.",
      definition:
        "Who did what:\n" +
        "- **Gopal Hari Deshmukh**, known as **Lokahitwadi**, wrote the **Shatapatre** (a hundred letters) in the Marathi weekly **Prabhakar**, attacking caste orthodoxy.\n" +
        "- The **Indian Social Reformer** (1890) was edited by **K. Natarajan**.\n" +
        "- **Gopal Krishna Gokhale** founded the **Servants of India Society (1905)**.\n" +
        "- **Hriday Nath Kunzru**, a member of that Society, founded the **Seva Samiti** at **Allahabad** in **1914** for social service and relief.\n" +
        "- **Shri Ram Bajpai** organised the **Seva Samiti Boy Scouts Association** at Allahabad, at a time when the official Boy Scouts kept Indian boys out.\n" +
        "- **Amritlal Vithaldas Thakkar (Thakkar Bapa)** founded the **Bhil Seva Mandal (1922)** for the Bhil tribals.",
      table: {
        columns: ["Body or work", "Year", "Founder or writer"],
        rows: [
          {
            cells: ["Shatapatre in Prabhakar", "1848 to 1850", "Gopal Hari Deshmukh (Lokahitwadi)"],
            pyqExampleId: "332aaa1a-7580-4af8-93f8-bed2fafd231a",
          },
          {
            cells: ["Indian Social Reformer", "1890", "Edited by K. Natarajan"],
            pyqExampleId: "d8a82c97-79c0-43d7-a9cb-d617543dd422",
          },
          { cells: ["Servants of India Society", "1905", "Gopal Krishna Gokhale"] },
          {
            cells: ["Seva Samiti, Allahabad", "1914", "Hriday Nath Kunzru"],
            noteAmber: "CDS 2020 (I) and CDS 2023 (I) both asked it.",
            pyqExampleId: "23f243d2-1701-4dae-abc7-cfe1f96d9ea1",
          },
          { cells: ["Seva Samiti Boy Scouts Association", "1910s", "Shri Ram Bajpai"] },
          {
            cells: ["Bhil Seva Mandal", "1922", "Thakkar Bapa (A.V. Thakkar)"],
            pyqExampleId: "6dbb56d6-7c09-4127-9a10-e563e5b7f8e1",
          },
        ],
      },
      pyqExampleId: "c487ee21-9b24-45ad-a8d1-4a917fd35e90",
      selfCheckExample: {
        prompt: "What were the Shatapatre, and where were they published?",
        steps: [
          "Shatapatre means a hundred letters.",
          "Gopal Hari Deshmukh wrote them in the Marathi weekly Prabhakar, attacking caste orthodoxy and calling for reform.",
        ],
        answer: "A hundred reform letters by Gopal Hari Deshmukh, published in the weekly Prabhakar.",
      },
      practiceSet: [
        { prompt: "Who founded the Bhil Seva Mandal in 1922?", answer: "Amritlal Vithaldas Thakkar (Thakkar Bapa)" },
        { prompt: "Who edited the Indian Social Reformer?", answer: "K. Natarajan" },
        { prompt: "Which society did Gokhale found in 1905?", answer: "The Servants of India Society" },
        { prompt: "What does the pen name Lokahitwadi mean?", answer: "One who wishes the welfare of the people" },
      ],
      traps: [
        {
          title: "Kunzru's Samiti, Bajpai's Scouts",
          body: "**Hriday Nath Kunzru** founded the **Seva Samiti**. **Shri Ram Bajpai** organised its **Boy Scouts Association**. Each name is the distractor in the other's question.",
        },
        {
          title: "Natarajan edited the Reformer",
          body: "**K. Natarajan** edited the **Indian Social Reformer**. N.G. Chandavarkar was a reform leader, not its editor.",
        },
      ],
    },
  ],
};
