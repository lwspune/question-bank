import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 6 Entertainment and History. Points in the Balbharati
 * text's own wording; most-asked years and marks from the board past-paper
 * questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Entertainment and History",
  chapterSlug: "entertainment-and-history",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 6",
  keyPoints: [
    {
      term: "Need of entertainment",
      text: "Healthy entertainment of excellent quality is essential for the healthy growth of one's personality. It keeps the mind lively and fresh, makes us feel more energetic, so our **efficiency at work improves**.",
    },
    {
      term: "Active and passive entertainment",
      text: "**Active**: needs our mental and physical participation (handicrafts, playing a sport). **Passive**: we are only viewers (watching a match or a movie, listening to music).",
    },
    {
      term: "Kathputali (puppetry)",
      text: "Two styles: one from **Rajasthan**, one from southern India. The narrator, the **sutradhara**, is crucial to the show. Shadow, hand, wooden and string puppets are used.",
    },
    {
      term: "Dashavatara theatre",
      text: "Folk theatre of **Maharashtra**, shown in **Konkan and Goa** after harvest. Stories of Vishnu's **10 incarnations**. The sutradhara first invokes **Lord Ganesha**. Gods wear wooden masks; it ends by breaking the dahihandi, then aarati.",
    },
    {
      term: "Dashavatara and Marathi theatre",
      text: "In the 18th century **Shyamji Naik Kale** started a phad (troupe) of Dashavatara artists. Vishnudas Bhave modified its style for his plays, so the origins of Marathi theatre are traced to Dashavatara.",
    },
    {
      term: "Bhajan",
      text: "Singing in praise of God with taal, mridangam, pakhavaj. Two types: **Chakri Bhajan** (moving in a circle, no break) and **Songi Bhajan** (singer-actors in dialogue). **Tukadoji Maharaj** introduced the **Khanjiri Bhajan**.",
    },
    {
      term: "Keertan",
      text: "**Naradmuni** is the founder of the tradition; **Saint Namdev** is the first keertankar of Maharashtra. Two traditions: Naradiya (Haridasi, solo) and Varkari (collective). **Rashtriya Keertan**: Dattopant Patwardhan of Wai. Gadge Maharaj spoke on caste and cleanliness.",
    },
    {
      term: "Lalit",
      text: "An old form of entertainment in Maharashtra, from the **Naradiya Keertan** tradition, popular in **Goa and Konkan**. The festival's deity is invoked on a throne for everyone's wishes. Part of the backdrop of modern Marathi theatre.",
    },
    {
      term: "Bharud",
      text: "A **metaphorical song** with spiritual and ethical lessons, like a road show. **Saint Eknath**'s Bharuds are popular: wide subjects, drama, easy rhythm and humour. He wrote them to educate people.",
    },
    {
      term: "Tamasha",
      text: "A Persian word meaning a **'pleasing sight'**; an independent art form from the **18th century**. Two types: **Sangeet Bari** and **Dholakicha Phad**. Order: Gana (praise of Ganesha), Gavalan, then the Vag (drama).",
    },
    {
      term: "Powada",
      text: "A ballad: dramatic narration alternating poetry and prose, telling heroes' great deeds forcefully. **Adnyandas**: killing of Afzal Khan; **Tulasidas**: battle of Sinhagad. Used in the **Samyukt Maharashtra** movement.",
    },
    {
      term: "Marathi theatre",
      text: "**Vishnudas Bhave** is the father of Marathi theatre; first play **Seetaswayamvar**. **V. J. Kirtane** wrote the first full script, Thorale Madhavrao Peshwe (1861). Khadilkar's **Keechakvadh** attacked Lord Curzon.",
    },
    {
      term: "Plays and playwrights",
      text: "Sangeet Shakuntal: **Annasaheb Kirloskar**. Sharada: G. B. Deval. **Ekach Pyala: Ram Ganesh Gadkari**. Sashtang Namaskar: Acharya Atre. Raigadala Jevha Jag Yete: Vasant Kanetkar. Tilak ani Agarkar: Vishram Bedekar. Natasamrat: Kusumagraj.",
    },
    {
      term: "Maharashtra and the film industry",
      text: "Maharashtra made the first full length movie. **Pundalik** (Torane, 1912). **Raja Harischandra** (Dadasaheb Phalke, 1913), first processed fully in India. Baburao Painter: Sairandhri, Simhgarh. Bajirao-Mastani (1925) was banned.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Chart: Bhajan, Keertan, Lalit, Bharud",
      labels: [
        "Bhajan: praise of God; Chakri, Songi",
        "Keertan: Namdev; Haridasi, Varkari",
        "Lalit: Naradiya tradition; Goa, Konkan",
        "Bharud: metaphorical song; Saint Eknath",
      ],
    },
  ],
  mostAsked: [
    { topic: "Dashavatara theatre: where, its form, what the narrator does", years: [2025, 2024, 2020] },
    { topic: "Chart: characteristics and examples of Bhajan, Lalit and Bharud", marks: 2, years: [2024] },
    { topic: "Folk forms and their saints: the first keertankar, find the wrong pair", marks: 1, years: [2025, 2024] },
    { topic: "Give reasons: expertise in history is important in the film industry", marks: 2, years: [2026, 2025] },
    { topic: "Why is Maharashtra known as the land that nurtured the Indian film industry?", marks: 3, years: [2024] },
    { topic: "Marathi plays and their playwrights: find the wrong pair", marks: 1, years: [2025] },
    { topic: "Short note: need of entertainment", marks: 2, years: [2020] },
  ],
  mistakes: [
    {
      title: "Ekach Pyala to Kirloskar",
      body: "**Ekach Pyala** is by **Ram Ganesh Gadkari**. Annasaheb Kirloskar wrote **Sangeet Shakuntal**.",
    },
    {
      title: "Founder or first keertankar",
      body: "**Naradmuni** founded the keertan tradition; **Saint Namdev** is the first keertankar of Maharashtra.",
    },
    {
      title: "Dashavatara with Tyagraj",
      body: "Dashavatara is a folk theatre of Maharashtra; Thyagaraj composed bhajans sung in Karnatak. Khanjiri Bhajan: Tukdoji Maharaj. Bharud: Saint Eknath.",
    },
    {
      title: "Pundalik or Raja Harischandra",
      body: "Pundalik (1912) was made with foreign technicians. **Raja Harischandra** (1913, Phalke) was the first processed completely in India.",
    },
    {
      title: "Film expertise answered vaguely",
      body: "Name the jobs: art directors design sets, costumes, jewellery, makeup and hair styles of the period; dialogue writers need its language and culture. Scholars of history can work as art directors or consultants.",
    },
  ],
};

export default sheet;
