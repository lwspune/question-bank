import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Political Science, Ch. 3 Political Parties. Points in the
 * Balbharati text's own wording; most-asked years and marks from the board
 * past-paper questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Political Science",
  subjectRoute: "political-science",
  chapterName: "Political Parties",
  chapterSlug: "political-parties",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), Political Science Chapter 3",
  keyPoints: [
    {
      term: "Political party",
      text: "When people form organisations to achieve **political power** and take part in the electoral process, they are political parties: groups that aim to contest and win elections and form their party's government. They compete only in a democracy.",
    },
    {
      term: "Characteristics of political parties",
      text: "(1) **To be in power** through elections. (2) **To pursue an ideology**; their social support is the **mass base**. (3) **To have a party agenda.** (4) **To establish a government**; parties without a majority act as the **opposition**.",
    },
    {
      term: "Link between government and people",
      text: "Political parties carry the **demands and complaints of the people** to the government. The government gets people's support for its policies through parties.",
    },
    {
      term: "Party systems",
      text: "**One party system**: one party in power for long, no other influential. **Two party system**: two parties hold power by turns. **Multi-party system**: many parties, more or less equally influential, compete for power.",
    },
    {
      term: "Changing party system in India",
      text: "After independence, **single dominant party system** (Congress). In **1977** non-Congress parties challenged it. After **1989** coalition governments began; the belief that coalitions bring instability was **proved wrong**.",
    },
    {
      term: "Norms for a national party",
      text: "(a) At least **6% of valid votes in four or more States** and at least **4 Lok Sabha members** in the earlier elections. Or (b) members elected from at least **2% of Lok Sabha constituencies** from at least **3 States**.",
    },
    {
      term: "Norms for a regional party",
      text: "(a) At least **6% of valid votes** and at least **2 members** in the Vidhan Sabha. Or (b) at least **3% of the Vidhan Sabha seats** or at least **3 seats**.",
    },
    {
      term: "Congress and the Communist parties",
      text: "**Indian National Congress**: 1885; secularism, democratic socialism. **Communist Party of India**: 1925; for labourers and workers, opposes capitalism. It split in **1964** to form the **CPI (Marxist)**.",
    },
    {
      term: "Other national parties",
      text: "**BJP**: Jan Sangh (1951) merged in the Janata Party (1977), then formed BJP in **1980**. **BSP**: 1984, for the 'majority'. **NCP**: 1999, split from Congress. **Trinamool Congress**: 1998; national party since 2016.",
    },
    {
      term: "Regionalism",
      text: "Affinity for one's language and region turns into identity consciousness and finally gives rise to **regionalism**: people think first of their region's interest and development, its resources and jobs.",
    },
    {
      term: "Regional parties",
      text: "Groups proud of their region's identity, competing for power for **regional development**. Their influence is limited to a region, but they affect national politics. They demand **more autonomy** and jobs for local people.",
    },
    {
      term: "Changing nature of regional parties",
      text: "First **separatist** demands (Khalistan, Dravidistan). After 1990, demands for **autonomy**. Then power for regional people at State and national level. North East parties too moved from separatism to the **mainstream**.",
    },
    {
      term: "Major regional parties (1)",
      text: "**Shiv Sena**: Maharashtra, 1966; rights of Marathi people. **Shiromani Akali Dal**: Punjab, 1920. **Jammu and Kashmir National Conference**: 1932; autonomy of Kashmir. **Assam Gan Parishad**: Assam, after the 1985 Assam agreement.",
    },
    {
      term: "Major regional parties (2)",
      text: "The **Justice Party**, a non-Brahmin movement (1920), became Dravida Kazhagam (1944); the **DMK** broke away in 1949 and the **AIADMK** in 1972. They protect Tamil identity.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept map: national parties of India",
      labels: [
        "Indian National Congress",
        "Bharatiya Janata Party",
        "Communist Party of India, CPI (Marxist)",
        "Bahujan Samaj Party",
        "Nationalist Congress Party",
        "Trinamool Congress",
      ],
    },
    {
      title: "Concept map: regional parties in Maharashtra",
      labels: ["Shiv Sena", "Maharashtra Navnirman Sena", "Peasants and Workers Party", "Republican Party of India", "Bahujan Vikas Aghadi"],
    },
  ],
  mostAsked: [
    { topic: "Characteristics of political parties; are they a link between government and people?", marks: 2, years: [2026, 2025, 2020] },
    { topic: "National parties: name them in a concept map; norms for recognition", marks: 2, years: [2025, 2024, 2020] },
    { topic: "Regionalism and regional parties; regional parties in Maharashtra", marks: 2, years: [2026, 2024, 2022] },
    { topic: "True or false: coalition politics leads to instability", marks: 2, years: [2025, 2024] },
    { topic: "Explain the concept: multiparty system", marks: 2, years: [2022] },
  ],
  mistakes: [
    {
      title: "'Coalition politics leads to instability': true",
      body: "**False.** Since 1989 both the BJP and Congress have led coalitions, and the coalition system has **stabilised** in India.",
    },
    {
      title: "A regional party called national",
      body: "**Shiromani Akali Dal** (Punjab), Shiv Sena, DMK, National Conference and Assam Gan Parishad are **regional** parties. NCP and Trinamool Congress are national.",
    },
    {
      title: "National and regional norms mixed",
      body: "National: 6% votes in **4 States** + **4 Lok Sabha** seats, or 2% of Lok Sabha seats from **3 States**. Regional: 6% votes + **2 Vidhan Sabha** seats, or 3% of seats or 3 seats.",
    },
    {
      title: "Wrong region for a party",
      body: "National Conference: **Jammu and Kashmir**. Assam Gan Parishad: Assam. Justice Party became the **DMK** (Tamil Nadu).",
    },
  ],
};

export default sheet;
