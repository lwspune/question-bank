import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 4 History of Indian Arts. Points in the Balbharati
 * text's own wording; most-asked years and marks from the board past-paper
 * questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "History of Indian Arts",
  chapterSlug: "history-of-indian-arts",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 4",
  keyPoints: [
    {
      term: "Art",
      text: "It is a natural human instinct to share experience, wisdom and emotions. When that instinct results in a beautiful creation, it is called **art**. Its roots: the artist's imagination, sensibility, emotion and skill.",
    },
    {
      term: "Visual and performing arts",
      text: "Two types of art. **Visual arts** (Drik Kala): painting and sculpting. **Performing arts** (Lalit or Aangik Kala): music, dance, theatre.",
    },
    {
      term: "Folk art and classical art",
      text: "**Folk art** continues from prehistoric times, is part of people's way of living, is spontaneous and is made collectively. **Classical art** follows established rules and needs prolonged training.",
    },
    {
      term: "Maratha style of painting",
      text: "Developed from the latter half of the **17th century C.E.**: coloured murals and miniatures in manuscripts. Murals in old wadas at **Wai, Menavali, Satara**. Influenced by the **Rajput and European** styles.",
    },
    {
      term: "Folk painting: Warli and Chitrakathi",
      text: "**Jivya Somya Mashe** (Thane) made Warli painting popular; Padmashree 2011. **Chitrakathi** (Pinguli): stories of Ramayana and Mahabharata told with wooden puppets and paintings. It is on the verge of extinction.",
    },
    {
      term: "Six aspects of painting (Shadange)",
      text: "Roopbheda (shapes), Pramana (proportion), Bhava (expression), Lavanyayojana (aesthetics), Sadrushyata (resemblance to reality), Varnikabhang (colour composition).",
    },
    {
      term: "Western style in India",
      text: "**James Wales**, a Scottish artist, set up an art school in Shaniwar Wada, Pune, in Savai Madhavrao Peshwe's time. **Gangaram Tambat** drew the caves at Verul and Karle. **J. J. School of Art** was founded in 1857.",
    },
    {
      term: "Sculpture",
      text: "Sculptures are three dimensional. The **Kailasa temple at Verul** is a monolithic sculpture. The lion capital of the Asokan pillar at **Sarnath** is India's national emblem. **Borobudur** (Indonesia) is the largest stupa.",
    },
    {
      term: "Indian iconography",
      text: "**Gandhara school**: 2nd century B.C.E., Greek and Persian influence. **Mathura school** rose in the **Kushana period** (1st-3rd century C.E.) and laid the foundation of iconography. Gupta period: rules set. Chola kings: bronze images.",
    },
    {
      term: "Styles of temple architecture",
      text: "Known by the tower (**shikhara**). **Nagara** (North India) and **Dravida** (South India) are the two main styles; their blend is **Vesara**. **Bhoomija** (Madhya Pradesh, Maharashtra) has rows of miniature towers.",
    },
    {
      term: "Hemadpanti temples",
      text: "Temples in **Maharashtra** built in the **12th-13th centuries**. Star-shaped outer walls (zigzag) give light and shadow. Stones locked by **tenon and mortise joints**, without mortar. E.g. Ambreshwar (Ambarnath), Gondeshwar (Sinnar), Aundha Nagnath (Hingoli).",
    },
    {
      term: "Islamic and Indo-Gothic architecture",
      text: "Islamic: Persian, Central Asian, Arabic and Indian styles blended. **Qutub Minar** (Mehrauli, 73 m), **Taj Mahal** (Agra, by Shah Jahan), **Gol Gumbaz** (Bijapur, whispering gallery). Indo-Gothic (British period): **CSMT, Mumbai**.",
    },
    {
      term: "Classical performing arts",
      text: "**Natyashastra** by **Bharatmuni** is the earliest text on music and theatre; it gives the nine rasas. Dances: Kathak (north India), **Lavani** (Maharashtra), Odisi, **Bharatnatyam** (Tamilnadu), Kuchipudi, **Kathakali** and Mohiniattam (Kerala).",
    },
    {
      term: "Professional opportunities in arts",
      text: "Art history: **journalism**, the **art market** (valuing art and checking it is genuine), heritage management, cultural tourism, museums, archives. Applied art: advertisement, interior and stage design, films, calligraphy. Institute: **NID, Ahmedabad**.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Table: temple architecture (Nagara, Dravida, Hemadpanti)",
      labels: [
        "Nagara: North India, tower style",
        "Dravida: South India, gopura",
        "Hemadpanti: Maharashtra, 12th-13th c.",
        "Hemadpanti: star plan, no mortar",
        "an example of each",
      ],
    },
    {
      title: "Concept chart: classical dances and their regions",
      labels: ["Kathak: north India", "Lavani: Maharashtra", "Bharatnatyam: Tamilnadu", "Kathakali, Mohiniattam: Kerala", "Odisi: Odisha", "Kuchipudi: Andhra"],
    },
  ],
  mostAsked: [
    { topic: "Hemadpanti temples: where, which centuries, star-shaped walls, masonry, examples", marks: 1, years: [2026, 2024] },
    { topic: "What professional opportunities are available in the field of arts?", marks: 3, years: [2025, 2024, 2020] },
    { topic: "Give reasons: an expert in art history is required in the art market", marks: 2, years: [2026, 2020] },
    { topic: "Islamic architecture in India with examples; monument and place wrong pair", years: [2026] },
    { topic: "The Kushana period saw the rise of the Mathura school", marks: 1, years: [2024] },
    { topic: "Art: short note; painting and sculpting are visual arts", years: [2026, 2024] },
    { topic: "Painting traditions: Maratha style short note; why preserve Chitrakathi", marks: 2, years: [2025, 2024] },
    { topic: "Concept chart: Indian dance forms and their regions", marks: 2, years: [2025] },
  ],
  mistakes: [
    {
      title: "CSMT in Delhi",
      body: "**CSMT** is in **Mumbai** (Indo-Gothic, not Islamic). Qutub Minar: Mehrauli. Gol Gumbaz: Bijapur. Taj Mahal: Agra.",
    },
    {
      title: "Gupta for Mathura",
      body: "The Mathura school rose in the **Kushana** period. The Gupta period formulated the rules of iconography; Gandhara came earlier, with Greek influence.",
    },
    {
      title: "Hemadpanti outside Maharashtra",
      body: "Hemadpanti temples are in **Maharashtra**, built in the **12th-13th centuries**. Their walls are joined without mortar, by tenon and mortise joints.",
    },
    {
      title: "Painting as a performing art",
      body: "Painting and sculpting are **visual arts** (Drik Kala). Music, dance and theatre are performing arts.",
    },
    {
      title: "The first keertankar",
      body: "Asked with this chapter in 2026: **Saint Namdev** is the first keertankar of Maharashtra (taught in Entertainment and History).",
    },
  ],
};

export default sheet;
