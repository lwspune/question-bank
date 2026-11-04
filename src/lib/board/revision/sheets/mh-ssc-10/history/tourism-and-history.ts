import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 8 Tourism and History. Points in the Balbharati
 * text's own wording; most-asked years and marks from the board past-paper
 * questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Tourism and History",
  chapterSlug: "tourism-and-history",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 8",
  keyPoints: [
    {
      term: "Tradition of travelling",
      text: "Travelling is an old tradition in India: for pilgrimage, fairs and festivals, a good teacher and education, and trade. Buddhist and Jain monks kept travelling. **Yuan Shwang**, the Chinese monk, came to India in 630 C.E.",
    },
    {
      term: "Benjamin of Tudela",
      text: "Known as the **first European traveller**. Born in **Spain**; travelled 1159-1173 C.E. up to India and China. His diaries are important historical documents.",
    },
    {
      term: "Marco Polo",
      text: "The **Italian** traveller of the **13th century**. He introduced Asia, especially **China**, to Europe; stayed in China for 17 years; wrote on its flora, fauna, social life, culture and trade.",
    },
    {
      term: "Ibn Batuta and Mercator",
      text: "**Ibn Batuta** (14th century) travelled the **Islamic world** for 30 years and never took the same route twice. **Gerardus Mercator** (16th century), a cartographer, made a world map and globe.",
    },
    {
      term: "Tourism and Thomas Cook",
      text: "Tourism: travelling to distant places for a specific purpose. **Thomas Cook** took about 600 people by train from Leicester to Loughborough, and set up a travel agency selling **tourist tickets**.",
    },
    {
      term: "Maza Pravas",
      text: "**Vishnubhat Godse**'s account of his journey from Maharashtra to Ayodhya and back during the war of **1857**; he was an eye witness, especially of the life of **Lakshmibai**, queen of Jhansi.",
    },
    {
      term: "Types of tourism",
      text: "Local, interstate, international, religious, **historical**, geographic, **health**, science, **agro-tourism**, **sports** and tourism based on special events (film festivals, Marathi Sahitya Sammelan).",
    },
    {
      term: "Historical and religious tourism",
      text: "**Gopal Neelkanth Dandekar** led hiking tours to Maharashtra's forts linked to Shivaji Maharaj. **Ahilyabai Holkar** built amenities on pilgrim routes (Chardham, Bara Jyotirlingas) from her own funds.",
    },
    {
      term: "Geographic and health tourism",
      text: "Geographic: Valley of Flowers, beaches, **Lonar** crater lake, ranjankhalage at **Nighoj**. Health: good, cheaper medical care in India, sunlight all year, **Yoga and Ayurveda**.",
    },
    {
      term: "Agro-tourism",
      text: "Also called agri-tourism; growing fast, especially for **urban people** with little exposure to rural life and farming. Indian farmers also visit research centres, agricultural universities and countries like **Israel**.",
    },
    {
      term: "Precautions at heritage sites",
      text: "Never vandalise or deface monuments: no writing on walls, carving on trees or painting monuments in garish colours. Resolve: (1) keep heritage sites clean, (2) do nothing that vandalises a historical site.",
    },
    {
      term: "Tourism and hospitality jobs",
      text: "Can create maximum employment. **Heritage walks** (Ahmedabad, Mumbai, Pune); blue plaques on homes of renowned citizens. Revenue starts with the visa; guides, hotels, local handicrafts and food all earn.",
    },
    {
      term: "Tourist centres of Maharashtra",
      text: "Caves: Ajanta, Verul, Gharapuri. Hill stations: **Mahabaleshwar, Panchgani, Khandala, Lonavala, Matheran, Chikhaldara**. Sanctuaries: Dajipur, Sagareshwar, **Tadoba**. MTDC was set up in **1975**.",
    },
    {
      term: "Bhilar, the Village of Books",
      text: "A village near **Mahabaleshwar** where every household keeps a library for tourists. The **Maharashtra State Government** began the scheme to speed up the **'Reading Culture'** movement.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept map: types of tourism",
      labels: ["historical tourism", "geographic tourism", "health tourism", "agro-tourism", "sports tourism", "religious tourism"],
    },
    {
      title: "Concept map: tourist places of Maharashtra",
      labels: [
        "Rock-cut caves: Ajanta, Verul, Gharapuri",
        "Natural heritage: Kas plateau",
        "Railway station: CSMT, Mumbai",
        "Sanctuary: Dajipur, Tadoba",
        "Hill station: Matheran, Mahabaleshwar",
      ],
    },
  ],
  mostAsked: [
    { topic: "Types of tourism: concept map, explain any three, agro-tourism", marks: 2, years: [2026, 2025, 2024, 2020] },
    { topic: "Bhilar, the village of books, and the scheme behind it", marks: 1, years: [2025, 2024, 2020] },
    { topic: "Tourist places of Maharashtra: hill stations, caves, sanctuaries; find the wrong pair", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Conserving heritage sites: precautions and measures", years: [2026] },
    { topic: "Travellers: Marco Polo; travellers and their countries", years: [2026, 2022] },
    { topic: "Professional opportunities in the tourism and hospitality industry", marks: 3, years: [2022] },
  ],
  mistakes: [
    {
      title: "Tadoba as rock-cut caves",
      body: "**Tadoba** is a **sanctuary**. Matheran and Chikhaldara are **hill stations**. Rock-cut caves: Ajanta, Verul, Gharapuri.",
    },
    {
      title: "Ibn Batuta from India",
      body: "Asked as a wrong pair (2022): Ibn Batuta was not Indian; he toured the Islamic world (he came from Morocco). Benjamin of Tudela: Spain. Marco Polo: Italy. Yuan Shwang: China.",
    },
    {
      title: "Bhilar's name",
      body: "Bhilar, near Mahabaleshwar, is the village of **books** (it is also known for strawberries, but not called a village of plants or mangoes).",
    },
    {
      title: "Conservation with no measures",
      body: "List concrete steps: clean premises, good amenities and washrooms, guides and pamphlets in many languages, safe transport, no writing or carving on monuments.",
    },
  ],
};

export default sheet;
