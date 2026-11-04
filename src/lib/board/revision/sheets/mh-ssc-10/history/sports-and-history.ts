import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 7 Sports and History. Points in the Balbharati text's
 * own wording; most-asked years and marks from the board past-paper questions
 * in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Sports and History",
  chapterSlug: "sports-and-history",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 7",
  keyPoints: [
    {
      term: "Sports in history",
      text: "Sports combine entertainment and physical exercise; to play is a natural human instinct. Ancient Indian literature mentions dice (dyut), wrestling, horse and chariot races and chess.",
    },
    {
      term: "The Greeks and the Olympics",
      text: "The **Greeks** were the first to standardise the rules of sports. The ancient Olympic competitions were held at **Olympia**, Greece.",
    },
    {
      term: "Importance of sports",
      text: "Games relax and refresh the mind and build a strong body. They develop **courage, determination and sportsmanship**; team games build **cooperation, team spirit** and leadership.",
    },
    {
      term: "Indoor games",
      text: "Played in a closed space, many sitting at one place: **chess**, cards, carom, Kachkavadya or Chaukabara (Indian Ludo), Sagargote, Bhatukali (playing house).",
    },
    {
      term: "Outdoor games",
      text: "**Indian**: Langadi, Kabaddi, **Atyapatya**, Kho-kho, marbles, Vitti-Dandu. **International**: badminton, table tennis, hockey, cricket, football, golf, polo. **Physical skills**: races, jumps, swimming, water polo, mallakhamb.",
    },
    {
      term: "Adventurous games",
      text: "Need balancing skills: **ice skating**, skiing, ice hockey. Also rock-climbing, gliding, car and motorbike racing.",
    },
    {
      term: "Mallakhamb",
      text: "Devised by **Balambhat Deodhar**, physical trainer of Peshwa Bajirao II, inspired by monkeys leaping on trees. Rani **Lakshmibai** of Jhansi exercised on it daily ('Maza Pravas' by Vishnubhat Godse).",
    },
    {
      term: "Major Dhyan Chand",
      text: "Captain of the Indian hockey team; gold at the **1936 Berlin Olympics** (also gold in 1928 and 1932). His birth date, **29th August**, is **National Sports Day**. Called the **'Wizard of Hockey'**; Padmabhushan 1956. Hockey is our national game.",
    },
    {
      term: "Players to know",
      text: "**Khashaba Jadhav** and Maruti Mane: wrestlers. **Sachin Tendulkar**: cricketer, Bharatratna. **Mary Kom**: first Indian woman boxer to win an Olympic medal (bronze).",
    },
    {
      term: "Globalisation and the sports economy",
      text: "Matches are watched on television all over the world, so fans everywhere have **significantly affected the structure of sports economy**: companies advertise, and retired players become commentators.",
    },
    {
      term: "Toys in ancient India",
      text: "Toys are means for children's entertainment and education. Clay toys are found in excavations. Shudraka's play **'Mrichchhakatika'** means a clay cart. **'Kathasaritsagara'** describes flying dolls. Maharashtra's wooden dolls: **Thaki**.",
    },
    {
      term: "Toys tell history",
      text: "Toys throw light on history, technology and culture. Diwali **model forts** keep alive the role of forts. An Indian **ivory doll at Pompeii** (Italy, 1st century C.E.) shows **Indo-Roman trade**.",
    },
    {
      term: "Literature and movies on sport",
      text: "A history of Mallakhamb and an encyclopaedia on exercise exist; **'Shatkar'** was a sports magazine. Films: **Mary Kom**, and **Dangal** (the Phogat sisters, wrestlers).",
    },
    {
      term: "Sports and professional opportunities",
      text: "Sports journalism, expert **commentators**, recording telecasts, trained **referees**. **Bal J. Pandit** pioneered cricket commentary on Akashvani; his history-rich commentary was entertaining.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept map: types of sports",
      labels: [
        "Indoor: chess, carom, cards",
        "Outdoor Indian: kabaddi, kho-kho, atyapatya",
        "Outdoor international: hockey, cricket",
        "Physical skills: mallakhamb, water polo",
        "Adventurous: skating, skiing",
      ],
    },
  ],
  mostAsked: [
    { topic: "Types of games: indoor and outdoor, the difference, examples, find the wrong pair", years: [2026, 2025, 2024, 2022, 2020] },
    { topic: "Major Dhyan Chand and hockey; players and their sports", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Toys and history: why toys tell cultural history; books on toys", marks: 2, years: [2026, 2024, 2022] },
    { topic: "Explain the close tie between sports and history", marks: 3, years: [2025, 2024] },
    { topic: "Give reasons: the structure of sports economy has been significantly affected", marks: 2, years: [2026] },
    { topic: "Short note: importance of sports", marks: 2, years: [2020] },
  ],
  mistakes: [
    {
      title: "Chess or Atyapatya in the wrong group",
      body: "**Chess** is an **indoor** game. **Atyapatya** is an **outdoor** Indian game. Mallakhamb is an outdoor game based on physical skills; skating is an adventurous ice sport.",
    },
    {
      title: "Khashaba Jadhav and football",
      body: "Khashaba Jadhav was a **wrestler**. Dhyan Chand: hockey. Sachin Tendulkar: cricket. Balambhat Deodhar: mallakhamb.",
    },
    {
      title: "The ivory doll's source",
      body: "The ivory doll was found at **Pompeii**. 'Mrichchhakatika' means a **clay cart**; 'Kathasaritsagara' has the flying dolls.",
    },
    {
      title: "Dhyan Chand's dates",
      body: "Gold as captain: **1936, Berlin**. National Sports Day: **29th August**, his birth date.",
    },
    {
      title: "Close tie answered with one point",
      body: "Give several links: sports journalism, commentary, records and statistics, sports films, encyclopaedias and articles; each needs the history of the game.",
    },
  ],
};

export default sheet;
