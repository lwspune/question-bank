import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 9 Heritage Management. Points in the Balbharati
 * text's own wording; most-asked years and marks from the board past-paper
 * questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Heritage Management",
  chapterSlug: "heritage-management",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 9",
  keyPoints: [
    {
      term: "What heritage institutes do",
      text: "Libraries, museums and archives conserve and preserve our historical heritage. They exhibit important specimens and **publish research journals, informative pamphlets, leaflets, posters**, etc., and give stored documents to researchers.",
    },
    {
      term: "Only trained persons",
      text: "Collecting sources, making records and indexes, and exhibiting documents after treatment need careful handling and specific skills. So **only trained persons, who are duly qualified**, can take up these tasks.",
    },
    {
      term: "Training for written sources",
      text: "Knowledge of scripts like **Brahmi, Modi, Persian**; of past societies, dynasties and administration; of art styles; of **paper, ink and colours**; of stones and metals of inscriptions; of cleaning chemicals; of exhibitions and IT; writing research reports.",
    },
    {
      term: "Louvre Museum, France",
      text: "In **Paris**, established in the 18th century. Shows antiquities of the royal family, including **'Monalisa' by Leonardo da Vinci**. It grew with antiquities brought by **Napoleon Bonaparte**.",
    },
    {
      term: "British Museum, England",
      text: "In **London**, established in the 18th century. **Sir Hans Sloan** gave about 71 thousand objects to King **George II**; objects from British colonies were added later.",
    },
    {
      term: "Other world museums",
      text: "**National Museum of Natural History**, USA: run by the Smithsonian Institution, 1846; over 12 crore specimens. The earliest museum in the world was found at **Ur**, Mesopotamia.",
    },
    {
      term: "Museums in India",
      text: "First: **Indian Museum, Kolkata** (Asiatic Society of Bengal, **1814**). Second: Government Museum, Chennai (1851). National Museum, Delhi (1949). **Salarjang Museum, Hyderabad**. Prince of Wales Museum, Mumbai, renamed **CSMVS** in 1998.",
    },
    {
      term: "Courses in museology",
      text: "National Museum, Delhi; **Maharaja Sayajirao University, Vadodara**; Kolkata University; Banaras Hindu University, Varanasi; Aligarh Muslim University, Aligarh; **Jivaji University, Gwalior**.",
    },
    {
      term: "Libraries and library management",
      text: "Libraries are storehouses of knowledge. Key libraries: **National Library, Kolkata**; Nehru Memorial Museum and Library, Delhi; **State Central Library, Hyderabad**; Asiatic Society and **David Sassoon Library, Mumbai**. Main aim: give a reader the book he needs.",
    },
    {
      term: "Saraswati Mahal Granthalay",
      text: "At **Thanjavur**, Tamilnadu, built in the 16th-17th century under the Nayak dynasty. **Vyankojiraje Bhosale** (1675) and his successors expanded it; **Sarfojiraje Bhosale** most of all. Renamed in his honour in 1918.",
    },
    {
      term: "Archives",
      text: "First official archives: **Imperial Record Department**, Kolkata, **1891**; moved to Delhi in 1911; opened to the public in 1998 by President K. R. Narayanan. Pune branch holds about 5 crore Modi documents: the **'Peshwa Daftar'**.",
    },
    {
      term: "Encyclopaedia and its types",
      text: "A systematic compilation of knowledge on various topics, arranged by a set method. Four types: (1) **Dictionaries** (words, meanings, synonyms, etymology), (2) **Vishwakosh**, (3) Koshsadrush literature, (4) **Indexes**.",
    },
    {
      term: "Vishwakosh and Samdnya Kosh",
      text: "The first Chief Minister of Maharashtra, **Yashwantrao Chavan**, began the Marathi **Vishwakosh**, guided by Tarkteerth Lakshmanshastri Joshi. **Samdnya Kosh** explains terms of history (colonialism, globalisation).",
    },
    {
      term: "History encyclopaedias",
      text: "**1876**: Bharatvarshiya Prachin Aitihasik Kosh (Godbole), the earliest. Charitrakosh by Siddheshwarshastri Chitrav: Prachin **1932**, Madhyayugin **1937**, Arvachin **1946**. **Sthalakosh** (1969) on places. Ketkar: Maharashtriya Dnyankosh.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Timeline: encyclopaedias on history",
      labels: [
        "1876: Prachin Aitihasik Kosh",
        "1932: Prachin Charitrakosh",
        "1937: Madhyayugin Charitrakosh",
        "1946: Arvachin Charitrakosh",
        "1969: Prachin Bharatiya Sthalakosh",
      ],
    },
    {
      title: "Concept map: types of encyclopaedia",
      labels: ["Dictionaries", "Comprehensive Encyclopaedia (Vishwakosh)", "Encyclopaedic (Koshsadrush) literature", "Indexes"],
    },
  ],
  mostAsked: [
    { topic: "Museums: Louvre and Mona Lisa, world museums and countries, first museum in India and in the world", marks: 1, years: [2026, 2025, 2024, 2022] },
    { topic: "Sohagaura copper-plate: where found, period, script, its importance", marks: 1, years: [2026, 2022] },
    { topic: "Give reasons: only trained, qualified persons can do conservation; training for written sources", marks: 2, years: [2026, 2025, 2024, 2020] },
    { topic: "Libraries: Saraswati Mahal, libraries and cities, why library management matters", marks: 2, years: [2026, 2025, 2024, 2020] },
    { topic: "Encyclopaedias: timeline, short notes on Vishwakosh and dictionaries", marks: 2, years: [2026, 2025, 2024] },
    { topic: "The first Director General of the Archaeological Survey of India", marks: 1, years: [2022] },
  ],
  mistakes: [
    {
      title: "The first museum in India",
      body: "It is the **Indian Museum, Kolkata** (1814). Government Museum, Chennai (1851) was the second. The earliest museum in the world was at **Ur**, not Harappa.",
    },
    {
      title: "Sohagaura copper-plate (asked here, taught in Chapter 2)",
      body: "Found at Sohagaura, Gorakhpur district, Uttar Pradesh; **Mauryan** period; **Brahmi** script. It records a royal order to distribute granary grain carefully, a precaution in times of famine.",
    },
    {
      title: "Wrong city for a university",
      body: "Maharaja Sayajirao University is in **Vadodara**, not Delhi. Banaras Hindu University: Varanasi. Jivaji University: Gwalior.",
    },
    {
      title: "Mixing up the encyclopaedia years",
      body: "1876 Godbole; 1932, 1937, 1946 the three Charitrakosh volumes; 1969 Sthalakosh. The first Director General of the ASI was **Alexander Cunningham** (Chapter 2).",
    },
    {
      title: "Wrong country in the museums table",
      body: "Louvre: **France**. British Museum: **England**. Salarjang Museum: **India** (Hyderabad). National Museum of Natural History: **USA**.",
    },
  ],
};

export default sheet;
