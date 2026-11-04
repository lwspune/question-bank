import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 5 Mass Media and History. Points in the Balbharati
 * text's own wording; most-asked years and marks from the board past-paper
 * questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Mass Media and History",
  chapterSlug: "mass-media-and-history",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 5",
  keyPoints: [
    {
      term: "Mass media",
      text: "'Mass' means an aggregation of people; 'media' means modes of communication. So mass media is a field of **mass communication**. Newspapers were the first mass medium in India, after the British brought printing.",
    },
    {
      term: "Before newspapers",
      text: "Royal decrees on inscriptions in public places (Egypt, **Emperor Asoka**); decrees on paper in the Roman Empire; **'Acta Diurna'** in Julius Caesar's Rome; criers beating drums; travellers' stories; ambassadors' reports.",
    },
    {
      term: "Bengal Gazette",
      text: "The **first English newspaper** of India, printed on **29th January 1780**; also called 'Calcutta General Advertiser'. Started by **James Augustus Hickey**, an Irish gentleman.",
    },
    {
      term: "Darpan",
      text: "Started in **1832** in Mumbai; editor **Balshastri Jambhekar**, called the 'First Editor' (first Marathi newspaper). His birth date, **6th January**, is Patrakar Din. He also started 'Digdarshan', the first Marathi monthly.",
    },
    {
      term: "Prabhakar and Dnyanoday",
      text: "**'Prabhakar'**: started by **Bhau Mahajan**; printed Lokhitvadi's 'Shatpatre'. **'Dnyanoday'**: first illustration in an Indian newspaper (map of Asia, 1842); reported railways as 'Chakya Mhasoba' and the war of 1857.",
    },
    {
      term: "Deenbandhu and Induprakash",
      text: "**'Deenbandhu'**, for the Bahujansamaj, was started by **Krishnarao Bhalekar**, close associate of Mahatma Phule. 'Induprakash' strongly supported widow remarriage.",
    },
    {
      term: "Kesari and Maratha",
      text: "Started in **1881** by **Gopal Ganesh Agarkar and Bal Gangadhar Tilak**. They spoke on the social and political issues of the time. Newspapers came to be called the **fourth column of democracy**.",
    },
    {
      term: "Radio: from IBC to Akashvani",
      text: "Indian Broadcasting Company (IBC), then ISBS, renamed **All India Radio** on **8th June 1936**; now under the Ministry of Information and Broadcasting. Named **Akashvani** on poet **Pandit Narendra Sharma**'s suggestion.",
    },
    {
      term: "Akashvani's programmes",
      text: "First English news bulletin: **23rd July 1927**, Mumbai station of IBC. Programmes for farmers, workers, youth and women. **'Vividh Bharati'**: 24 regional languages and 146 dialects.",
    },
    {
      term: "Television",
      text: "Delhi Doordarshan inaugurated by **Dr. Rajendra Prasad** on **15th September 1959**. Mumbai centre: **1st May 1972**. Colour TV: **15th August 1982**. **1991**: private channels allowed. Television is an **audio-visual** medium.",
    },
    {
      term: "Why we need mass media",
      text: "To facilitate **free flow of information to all strata of the society**. Readers get a platform to voice opinions, so newspapers make democracy stronger. Television shows the actual visuals of an event.",
    },
    {
      term: "Review media critically",
      text: "News may not always be the exact truth. **'Stern'**, a German weekly, sold so-called diaries of **Adolf Hitler**; they were later proved to be **forged**.",
    },
    {
      term: "History in newspapers",
      text: "To give the background of news, papers compare it with past events and print columns like **'50 Years Ago'**, 'On This Day in History', and special issues (World War I centenary 2014, 75 years of Quit India 2017).",
    },
    {
      term: "Bharat Ek Khoj",
      text: "Doordarshan serial based on Nehru's **'Discovery of India'**, directed by **Shyam Benegal**; Roshan Seth played Nehru. It showed Harappan, Vedic, Mauryan and Mughal periods, the Bhakti movement, Shivaji Maharaj and the freedom struggle.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Timeline: television in India",
      labels: ["1959: Delhi Doordarshan inaugurated", "1972: Mumbai centre begins", "1982: colour television", "1991: private channels allowed"],
    },
    {
      title: "Concept chart: newspapers, radio, television",
      labels: ["beginning or background", "nature of information or programmes", "functions"],
    },
  ],
  mostAsked: [
    { topic: "Newspapers and their founders or editors: first English newspaper, find the wrong pair", marks: 1, years: [2026, 2025, 2022, 2020] },
    { topic: "Write the history of Akashvani", marks: 3, years: [2026, 2025, 2022] },
    { topic: "Give reasons: knowledge of history is essential for newspaper articles", marks: 2, years: [2026, 2024, 2022] },
    { topic: "History of television; complete its timeline", years: [2026] },
    { topic: "Short note: the role of newspapers in the Indian struggle for independence", marks: 2, years: [2024] },
    { topic: "Why we need mass media; mass media and professional opportunities", marks: 2, years: [2025] },
    { topic: "Concept map: aspects of Indian history shown in 'Bharat Ek Khoj'", marks: 2, years: [2025] },
    { topic: "Means of communication known before the advent of newspapers", marks: 3, years: [2020] },
  ],
  mistakes: [
    {
      title: "Wrong editor for a newspaper",
      body: "Prabhakar: **Bhau Mahajan** (not Atre). Darpan: Balshastri Jambhekar. Deenbandhu: **Krishnarao Bhalekar** (not Gopal Hari Deshmukh). Kesari: Tilak. Bengal Gazette: Hickey.",
    },
    {
      title: "Jambhekar as the first English newspaper",
      body: "The first **English** newspaper was Hickey's Bengal Gazette (1780). Jambhekar edited **Darpan** (1832), the first Marathi newspaper.",
    },
    {
      title: "Mixing the television dates",
      body: "1959: Delhi Doordarshan. 1972: Mumbai centre. 1982: colour. 1991: private channels. In the timeline the year goes above the line, the event below.",
    },
    {
      title: "A history of Akashvani with no steps",
      body: "Write the chain: IBC, then ISBS, then All India Radio (1936), then the name Akashvani (Narendra Sharma); add Vividh Bharati and the kinds of programmes.",
    },
    {
      title: "Freedom struggle note without names",
      body: "Name the papers: Kesari and Maratha (Tilak, Agarkar, 1881) spoke on political and social issues and the situation across the nation; Dnyanoday reported 1857.",
    },
  ],
};

export default sheet;
