import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 9 Social Health. Statements
 * checked against the Balbharati text; most-asked years from the board past
 * papers in the bank. Organ donation items (taught in Ch. 8) and the full
 * form of WHO (named but not expanded in the book) are left out.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Social Health",
  chapterSlug: "social-health",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 9",
  keyPoints: [
    {
      term: "Social health",
      text: "The ability of a person to establish relationship with other persons, and to change one's own behaviour according to changing social conditions. Strong personality, many friends, trust and respect for others help it.",
    },
    {
      term: "Factors affecting social health",
      text: "Basic needs (food, clothing, shelter, medicines), education, financial status, job opportunities, transport, social safety, residential area, water, toilets, playgrounds, gardens, political conditions.",
    },
    {
      term: "Mental stress",
      text: "Caused by competition in education and jobs, loneliness in nuclear families, gender inequality (teasing, unequal duties for girls), and rising disorder, crime and violence.",
    },
    {
      term: "Addiction and peer group",
      text: "**Peer-group influence is stronger in adolescents.** They try tobacco, gutkha, cigarettes, alcohol and drugs from peer pressure, as a status symbol or by imitating elders; this leads to addiction. Tobacco causes cancer of mouth and lungs.",
    },
    {
      term: "Alcoholism",
      text: "Lowers the efficiency of the nervous system (brain) and liver and shortens lifespan; hinders brain development, memory and learning in adolescents; the addict cannot think rationally and faces social, mental and family illness.",
    },
    {
      term: "Chronic diseases and old age",
      text: "Ignoring people with chronic diseases like **AIDS, T.B., leprosy** and mental disorders, and old persons, increases old age homes and harms social health.",
    },
    {
      term: "Excessive use of technology",
      text: "Long hours on cell phones is a sort of addiction. Users become solitary, self-centred and less sensitive to others. Violent games and selfies in risky places can be fatal.",
    },
    {
      term: "Physical problems from mobile phones",
      text: "Radiation of cell phones may cause tiredness, headache, insomnia, forgetfulness, tinnitus, joint pains and problems in vision. It penetrates children's bones more than adults'.",
    },
    {
      term: "Cyber crime",
      text: "Hacking of information, fake Facebook accounts, card and PIN fraud, cheating consumers online, illegal sale of written literature, sending derogatory messages or vulgar pictures. Cyber crime experts in the police trace criminals.",
    },
    {
      term: "IT Act 2000",
      text: "In force since 17 October 2000, amended in 2008: up to 3 years' imprisonment or fine up to 5 lakh. **Maharashtra** was the first state to start a separate cyber crime unit.",
    },
    {
      term: "Stress management",
      text: "**Laughter club**, communicating with friends, teachers and parents, writing down feelings; hobbies (photography, reading, cooking, drawing, dancing); music; outdoor games; exercise; yoga and meditation; gardening and bird watching.",
    },
    {
      term: "Help available",
      text: "If stress leads to depression, medical advice, counselling and psychotherapy help. NGOs: Unified Movement against Tobacco, Salaam Mumbai Foundation (tobacco-free schools); helpline numbers for children in distress.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Write four methods to reduce stress",
      steps: [
        "Laughter club; sharing feelings with friends, cousins, teachers and parents.",
        "Hobbies like photography, reading, cooking, drawing, rangoli, dancing; music and singing.",
        "Outdoor games, regular exercise, yoga, deep breathing and meditation.",
        "Time management and planning; nature hobbies like gardening and bird watching.",
      ],
    },
    {
      title: "What will you do? Child of your neighbour is addicted to tobacco chewing",
      steps: [
        "Tell the child and the parents that tobacco causes cancer of mouth and lungs and damages the nervous system and heart.",
        "Keep the child away from bad company and engage the child in sports and hobbies.",
        "Seek counselling, or help from groups like the Unified Movement against Tobacco. Why: addiction harms physical and social health.",
      ],
    },
    {
      title: "What will you do? Your brother in XII has developed stress",
      steps: [
        "Talk with him and let him share his feelings; involve parents and teachers.",
        "Help him plan his time; encourage short breaks for music, games, yoga and meditation.",
        "If stress continues, take him for counselling. Why: unrelieved stress can lead to depression.",
      ],
    },
    {
      title: "What will you do? You spend more time on internet and mobile games",
      steps: [
        "Fix a limited time and use media only for essential needs and entertainment.",
        "Play outdoor games and meet friends and relatives instead.",
        "Why: excess use causes headache, insomnia and vision problems, and makes a person solitary and self-centred.",
      ],
    },
    {
      title: "Explain the importance of good communication with others",
      steps: [
        "Expressing feelings to friends, teachers and parents relieves stress.",
        "It builds relationships, trust and respect, the core of social health.",
        "People who communicate get help when in need and are not lonely or self-centred.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Factors affecting the social health (Fig. 9.1)",
      labels: ["basic needs: food, clothing, shelter, medicines", "education, financial status", "transport facilities, social safety", "residential area, water, toilets", "play grounds, gardens", "political conditions"],
    },
  ],
  mostAsked: [
    { topic: "What will you do? Why? Tobacco-addicted child, brother under stress, sister incommunicative, too much internet, selfies, use of free space", marks: 3, years: [2026, 2022, 2020] },
    { topic: "Stress: hobbies and methods to reduce it, laughter club", marks: 2, years: [2026, 2025, 2024, 2020] },
    { topic: "Addiction: tobacco and alcohol, peer-group influence, problems of alcoholism", marks: 1, years: [2025, 2024, 2020, 2019] },
    { topic: "Mobile phones and cyber crime: physical problems, cyber crime activities, first state with a cyber crime unit", years: [2026, 2025, 2024, 2019] },
    { topic: "Factors affecting social health; diseases endangering it", years: [2026, 2024] },
    { topic: "Crossword: addiction, an app causing cyber crime, a remedy for stress", years: [2025, 2023] },
    { topic: "Importance of good communication with others", marks: 3, years: [2025] },
  ],
  mistakes: [
    {
      title: "Answering 'What will you do?' without 'Why?'",
      body: "Write what you will do in two or three steps, then give the reason from the book: the harm to physical, mental or social health.",
    },
    {
      title: "Odd one out among addictions",
      body: "Gutkha, alcoholic drinks and cigarettes are addictive substances; yoga is a way to reduce stress.",
    },
    {
      title: "Laughter club is for stress",
      body: "A laughter club drives away mental stress, not a disease like cancer or diabetes.",
    },
    {
      title: "Wrong state for the cyber crime unit",
      body: "Maharashtra was the first state to start a separate cyber crime unit. IT Act: 2000, amended 2008.",
    },
    {
      title: "Not knowing WHO in full",
      body: "The board asked it in 2024: WHO is the World Health Organization.",
    },
  ],
};

export default sheet;
