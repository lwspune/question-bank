import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Political Science, Ch. 4 Social and Political Movements. Points in
 * the Balbharati text's own wording; most-asked years and marks from the board
 * past-paper questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Political Science",
  subjectRoute: "political-science",
  chapterName: "Social and Political Movements",
  chapterSlug: "social-and-political-movements",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), Political Science Chapter 4",
  keyPoints: [
    {
      term: "Why movements?",
      text: "Parties take a comprehensive view; some people focus on **one issue**, organise people and **pressurise the government** to resolve it. This organised activity is a movement. **Organised activity is the essence of any movement.**",
    },
    {
      term: "Movements in a democracy",
      text: "Such movements are very important in a democracy: social problems come under discussion and the government must pay attention. Leaders give it useful information for policies. The **right to protest** must be used patiently and responsibly.",
    },
    {
      term: "Features of a movement",
      text: "A **collective action** with a particular social objective. It has a **leadership** that decides objectives, programme and strategy; **a strong leadership makes a movement effective**. It needs an organisation, public support and a programme of action.",
    },
    {
      term: "Ideology and neosocial movements",
      text: "Movements are devoted to one issue but have an **ideology** behind them; some turn into political parties. The **post 1980** movements are called **neosocial movements**: they are issue-based.",
    },
    {
      term: "Tribal movement",
      text: "The British denied tribals their livelihood from forests. Uprisings: **Kolam** (Chota Nagpur), **Gond** (Orissa), **Koli, Bhilla, Ramoshi** (Maharashtra), **Santhal, Birsa Munda and Munda** (Bihar). Main demand: **right over forests** and to cultivate forest land.",
    },
    {
      term: "Farmers movement",
      text: "Began against the British anti-agriculture policies (Bardoli, Champaranya); inspired by Phule, Ranade and Gandhi. The **Green Revolution** raised production and self-sufficiency in food grains but did not help poor farmers, so the movement grew.",
    },
    {
      term: "Demands of farmers",
      text: "**Appropriate price for agricultural products**, agriculture treated as an industry, the Swaminathan Commission's recommendations, debt relief. Organisations: **Shetkari Sanghatana**, Bharatiya Kisan Union, All India Kisan Sabha.",
    },
    {
      term: "Labour movement",
      text: "Grew with industrialisation. Railway workers struck in **1899**. The first workers' organisation, the **All India Trade Union Congress**, came in **1920**. Strong agitations in the 1960s-70s; from the 1980s it began to disintegrate; globalisation affected it.",
    },
    {
      term: "Problems of workers",
      text: "Unstable employment, **contract labour**, financial insecurity, no legal protection, unlimited working hours, insecurity at the workplace and **health hazards**.",
    },
    {
      term: "Women's movement before independence",
      text: "Begun by progressive men to end injustice and exploitation. Reformers: Vidyasagar, Rammohan Roy, **Jyotirao and Savitribai Phule**, D. K. Karve, Pandita Ramabai, Ramabai Ranade. Fought **Sati and child marriage**; won **widow remarriage, women's education, right to vote**.",
    },
    {
      term: "Women's movement after independence",
      text: "The Constitution gave equal rights, but equality did not come. The movement demanded that women be treated as **human beings**; it now takes up women's health, social security, financial independence and empowerment.",
    },
    {
      term: "Environmental movements",
      text: "Take up protection of **biodiversity**, sources of water, **forests**, green belts, **pollution of rivers**, and the ill effects of chemicals. There is much international cooperation in this field.",
    },
    {
      term: "Water revolution",
      text: "**Dr Rajendra Singh**, the **'Waterman of India'**, brought a water revolution in **Rajasthan** by building thousands of **johads** through his Tarun Bharat Sangh and reviving rivers. He won the **Stockholm Water Prize**.",
    },
    {
      term: "Consumer movement",
      text: "Emerged after the **Consumer Protection Act, 1986**. Every member of society is a consumer. It protects people from **adulteration**, rising prices and frauds in weights and measures.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept map: tribal uprisings and their places",
      labels: ["Kolam: Chota Nagpur", "Gond: Orissa", "Koli, Bhilla, Ramoshi: Maharashtra", "Santhal, Munda: Bihar"],
    },
  ],
  mostAsked: [
    { topic: "Farmers movement: the Green Revolution, the main demand of farmers", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Tribal uprisings before independence and their places", years: [2026, 2025, 2022] },
    { topic: "Movements: why they matter in a democracy; why they need a strong leadership", marks: 2, years: [2026, 2024, 2022] },
    { topic: "True or false: consumer movement came into existence", marks: 2, years: [2024, 2022] },
    { topic: "Environmental movement: its functions; water revolution", marks: 2, years: [2025, 2022] },
    { topic: "Explain the concept: workers (labour) movement", marks: 2, years: [2025] },
    { topic: "Reforms the women's movement fought for before independence", marks: 2, years: [2020] },
  ],
  mistakes: [
    {
      title: "Tribes in the wrong place",
      body: "Kolam: **Chota Nagpur**. Gond: **Orissa**. Koli, Bhilla, Ramoshi: **Maharashtra**. Santhal and Munda: **Bihar**.",
    },
    {
      title: "Green, water or white revolution",
      body: "More food grains and self-sufficiency: **Green Revolution**. Water revolution: Rajendra Singh's johads in Rajasthan. White revolution (milk) is not this chapter's answer.",
    },
    {
      title: "Farmers' and tribals' demands swapped",
      body: "Farmers: the **right price for agricultural products**. Tribals: the right over forests and to cultivate forest land.",
    },
    {
      title: "True or false statements",
      body: "'Movements do not need a strong leadership': **false**, leadership keeps a movement active and effective. 'Consumer movement came into existence': **true**, after the Consumer Protection Act, 1986.",
    },
  ],
};

export default sheet;
