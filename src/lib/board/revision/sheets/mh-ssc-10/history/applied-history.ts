import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 3 Applied History. Points in the Balbharati text's
 * own wording; most-asked years and marks from the board past-paper questions
 * in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Applied History",
  chapterSlug: "applied-history",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 3",
  keyPoints: [
    {
      term: "Applied History",
      text: "Also known as **Public History**. A field of study concerned with the application of history for the benefit of people in the contemporary and future times. It connects people to history in everyday life.",
    },
    {
      term: "Centre for Public History",
      text: "An independent department of the **Srushti Institute of Art Design and Technology**, Bengaluru (Karnataka), doing projects and research in public history.",
    },
    {
      term: "History of science",
      text: "Helps us understand the chronological order of discoveries and inventions and the cause-effect chain behind them. **'Need' is the mother of inventions.**",
    },
    {
      term: "History of technology",
      text: "Explains changes in agriculture, production, architecture and engineering. Science and technology are **mutually dependent**; to understand mechanisation and this dependence we must know the history of technology.",
    },
    {
      term: "Humanities",
      text: "Include history, archaeology, sociology, anthropology, political science, economics, etc. All disciplines are supposed to have their origin in **philosophy**.",
    },
    {
      term: "Applied history and our present",
      text: "Relics of the past are our **heritage**; they build our identity and link us with our origin, so we preserve them. Heritage management creates **employment**. Applied history: understanding our present with history and finding the right direction for our future.",
    },
    {
      term: "Tangible cultural heritage",
      text: "Cultural heritage is a human creation, of two types. **Tangible**: ancient sites, buildings, artefacts, manuscripts, sculptures, paintings.",
    },
    {
      term: "Intangible cultural heritage",
      text: "Oral traditions and language, traditional knowledge, customs and festivals, performing arts, traditional skills. UNESCO list: Kootiyattam (Kerala, 2001), Vedic chanting, Ramlila, **Ramman** (Garhwal, 2009), **Kalbelia** (Rajasthan), **Chhau** (West Bengal), Yoga (2016).",
    },
    {
      term: "Natural heritage",
      text: "Gives importance to **biodiversity**: fauna, flora, and the ecology and landforms that sustain them.",
    },
    {
      term: "UNESCO World Heritage",
      text: "**UNESCO** announced directives to promote cultural and natural heritage; on their basis sites and traditions are declared **World Heritage**. The Western Ghats, with the **Kaas plateau** (Satara), are on its natural list.",
    },
    {
      term: "World Cultural Heritage Sites to remember",
      text: "Taj Mahal and Agra Fort (Agra), Ajanta, Verul (1983); Elephanta (1987); Humayun's Tomb, Kutub Minar (Delhi, 1993); CSMT Mumbai (2004); **Red Fort, Delhi (2007)**; **Jantar Mantar, Jaipur (2010)**; **Rani-ki-Vav, Patan (2014)**; Capital Complex, Chandigarh (2016).",
    },
    {
      term: "World Natural Heritage Sites",
      text: "**Kaziranga** (1985), Keoladeo, Manas (1985), **Sundarbans** (1987), Nanda Devi and Valley of Flowers (1988), **Western Ghats** (2012), **Great Himalayan National Park** (2014), Khangchendzonga (2016, mixed).",
    },
    {
      term: "Who conserves our heritage",
      text: "The **Archaeological Survey of India** and the State Departments of Archaeology; also **INTACH** (Indian National Trust for Art and Cultural Heritage). Experts must know the site's history so its original state is not changed.",
    },
    {
      term: "Museums and archives",
      text: "Earliest museum: city of **Ur**, Mesopotamia (curator, princess Ennigaldi). **National Archives of India**: New Delhi. **Indian Museum**, Kolkata: Asiatic Society, 1814. **National Film Archives of India**: Pune, 1964.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept map: Cultural Heritage, tangible and intangible",
      labels: [
        "Tangible: ancient sites, buildings",
        "Tangible: artefacts, manuscripts, sculptures",
        "Intangible: oral traditions, festivals",
        "Intangible: performing arts, traditional skills",
      ],
    },
    {
      title: "Timeline: World Natural Heritage Sites in India",
      labels: ["1985: Kaziranga National Park", "1987: Sundarbans National Park", "2012: Western Ghats", "2014: Great Himalayan National Park"],
    },
  ],
  mostAsked: [
    { topic: "World Heritage Sites: their places, UNESCO's list, the natural sites timeline", marks: 2, years: [2026, 2025, 2024] },
    { topic: "How can we correlate applied history with our present?", marks: 3, years: [2026, 2024, 2022] },
    { topic: "Cultural heritage, tangible and intangible: concept map; why preserve heritage", marks: 2, years: [2026, 2022] },
    { topic: "Short note: Applied History", marks: 2, years: [2026, 2025] },
    { topic: "Give reasons: it is essential to study the history of technology", marks: 2, years: [2025, 2024] },
    { topic: "Concept chart: disciplines in the humanities", marks: 2, years: [2025] },
  ],
  mistakes: [
    {
      title: "Red Fort in Mumbai",
      body: "The **Red Fort** is in **Delhi**. Mumbai's World Heritage Sites are CSMT (2004) and Gharapuri (Elephanta) Caves.",
    },
    {
      title: "Natural and cultural lists mixed",
      body: "Kaziranga, Sundarbans, Western Ghats and Great Himalayan National Park are **natural**. Taj Mahal, Red Fort, Jantar Mantar, Rani-ki-Vav are **cultural**.",
    },
    {
      title: "Wrong home for a tradition",
      body: "Ramman is a ritual theatre of **Garhwal, Uttarakhand**. Chhau is the dance of West Bengal, Jharkhand, Odisha. Kalbelia is from Rajasthan; Kootiyattam from Kerala.",
    },
    {
      title: "Reasons with no 'because'",
      body: "History of technology: science and technology depend on each other, so mechanisation cannot be understood without it. UNESCO's list: it follows UNESCO's directives to promote and protect heritage.",
    },
  ],
};

export default sheet;
