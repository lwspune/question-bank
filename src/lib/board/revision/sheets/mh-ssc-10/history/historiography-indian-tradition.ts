import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 2 Historiography: Indian Tradition. Points in the
 * Balbharati text's own wording; most-asked years and marks from the board
 * past-paper questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Historiography: Indian Tradition",
  chapterSlug: "historiography-indian-tradition",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 2",
  keyPoints: [
    {
      term: "Harshacharit and Rajtarangini",
      text: "**'Harshacharit'** (7th century C.E.) by **Banabhatta** is King Harsha's biography. **'Rajtarangini'**, the history of Kashmir by **Kalhana** (12th century C.E.), is close to modern historiography: he examined inscriptions, coins and records.",
    },
    {
      term: "Ziauddin Barani",
      text: "In **'Tarikh-i-Phiruz Shahi'** he stated the purpose of historiography: a historian should write about the ruler's valour and also his failings and incorrect policies. So Barani expanded the scope of historiography.",
    },
    {
      term: "Babur and Abul Fazl",
      text: "Babur, founder of the Mughal empire, wrote his autobiography **'Tuzuk-i-Babari'**, describing his battles. Abul Fazl's **'Akbarnama'** is important for critical historiography: his scrutiny of documents was free of bias.",
    },
    {
      term: "Bakhar",
      text: "An important type of historical document of medieval times: eulogies of heroes, stories of events, battles and lives of great men. **'Sabhasad Bakhar'** by Krishnaji Anant Sabhasad tells of Shivaji Maharaj's rule. 'Bhausahebanchi Bakhar' describes Panipat.",
    },
    {
      term: "Archaeology under British rule",
      text: "**Sir Alexander Cunningham** was the first Director General of the Archaeological Survey of India. The Harappan Civilisation was discovered during the tenure of **Sir John Marshall**.",
    },
    {
      term: "British officers' histories",
      text: "**James Mill**: 'The History of British India' (1817), the first such book by a British historian, full of prejudice. **Mountstuart Elphinstone**: 'The History of India' (1841). **Grant Duff**: 'A History of the Mahrattas'.",
    },
    {
      term: "Colonial historiography",
      text: "Written mainly by British officers and Christian missionaries; it ridiculed Indian culture and was used to justify British rule. Example: the five volumes of 'Cambridge History of India' (1922-1937).",
    },
    {
      term: "Orientalist historiography",
      text: "European scholars who admired the civilisations of the East were called **Orientalists**. They studied Sanskrit and the Vedic tradition. In **1784 Sir William Jones** founded the **Asiatic Society** in Kolkata.",
    },
    {
      term: "Friedrich Max Muller",
      text: "Held Sanskrit to be the most ancient Indo-European language. He translated **'Hitopadesh'** into German, edited 50 volumes of 'The Sacred Books of the East' and translated the Rigveda into German.",
    },
    {
      term: "Nationalistic historiography",
      text: "Indian historians' writing to restore pride in India's ancient glory. Inspired in Maharashtra by **Vishnushastri Chiplunkar**. Savarkar's 'The Indian War of Independence, 1857' is important. It gave momentum to **regional histories**, e.g. of south India.",
    },
    {
      term: "V. K. Rajwade",
      text: "Edited 22 volumes of **'Marathyanchya Itihasachi Sadhane'**; said history should use only authentic documents. Founded the **Bharat Itihas Samshodhak Mandal**, Pune, on 7th July 1910.",
    },
    {
      term: "Marxist history",
      text: "Means and modes of production and industrial relations are at its centre. Indian Marxist historians studied changes in the caste system: **D. D. Kosambi**, **Comrade S. A. Dange** ('Primitive Communism to Slavery'), R. S. Sharma, Sharad Patil.",
    },
    {
      term: "Subaltern history",
      text: "History written from the **bottommost ranks** of society; seeds in Marxist history; Gramsci (Italian); folklore a key source; **Ranjit Guha** made it a school. Earlier: Phule's **'Gulamgiri'**, Ambedkar's **'Who Were the Shudras'**.",
    },
    {
      term: "Feminist history",
      text: "**Tarabai Shinde**'s **'Stripurush Tulana'** (1882) is the first feminist book in India. **Pandita Ramabai**: 'The High Caste Hindu Woman' (1888). **Meera Kosambi**: 'Crossing Thresholds: Feminist Essays in Social History'.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Chart and concept map: historian and book",
      labels: [
        "Barani: Tarikh-i-Phiruz Shahi",
        "Babur: Tuzuk-i-Babari",
        "Kalhana: Rajtarangini",
        "Krishnaji Anant Sabhasad: Sabhasad Bakhar",
        "Grant Duff: A History of the Mahrattas",
        "Elphinstone: The History of India",
      ],
    },
  ],
  mostAsked: [
    { topic: "Wrong pair or choose the option: historians, their works and their school", marks: 1, years: [2025, 2024, 2020] },
    { topic: "Give reasons: Bakhar is an important type of historical documents", marks: 2, years: [2025, 2024] },
    { topic: "Short notes: Orientalist, Nationalistic and Subaltern historiography", marks: 2, years: [2026, 2024, 2022] },
    { topic: "Complete the chart or concept map: historian, subject and book", marks: 2, years: [2026, 2024] },
    { topic: "What is Marxist history?", marks: 3, years: [2025] },
    { topic: "Give reasons: writing of the regional history received a momentum", marks: 2, years: [2026] },
  ],
  mistakes: [
    {
      title: "Mixing the three British books",
      body: "'The History of British India': James Mill (1817). 'The History of India': Elphinstone (1841). 'A History of the Mahrattas': Grant Duff.",
    },
    {
      title: "Giving Tarabai's book to Pandita Ramabai",
      body: "'Stripurush Tulana' is by **Tarabai Shinde**. Pandita Ramabai wrote 'The High Caste Hindu Woman'. 'Who Were the Shudras' is by **Dr Ambedkar**, not Tarabai.",
    },
    {
      title: "Cunningham or Marshall",
      body: "**Cunningham** was the first Director General of the ASI. Harappa was discovered under **Marshall**.",
    },
    {
      title: "Putting a writer in the wrong school",
      body: "James Mill and Grant Duff: colonial. Max Muller: Orientalist. Ranade and Savarkar: nationalistic. Kosambi and Dange: Marxist. Phule and Ambedkar: subaltern type.",
    },
    {
      title: "Sabhasad Bakhar's reign",
      body: "It was written during the reign of **Chhatrapati Rajaram Maharaj**, but it is about the rule of **Chhatrapati Shivaji Maharaj**.",
    },
  ],
};

export default sheet;
