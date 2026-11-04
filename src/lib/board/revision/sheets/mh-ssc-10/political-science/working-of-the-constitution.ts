import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Political Science, Ch. 1 Working of the Constitution. Points in
 * the Balbharati text's own wording; most-asked years and marks from the board
 * past-paper questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Political Science",
  subjectRoute: "political-science",
  chapterName: "Working of the Constitution",
  chapterSlug: "working-of-the-constitution",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), Political Science Chapter 1",
  keyPoints: [
    {
      term: "Aim of the Constitution",
      text: "To establish a **sovereign, socialist, secular, democratic Republic**, with justice and freedom for citizens. It came into force on **26th January 1950**. This chapter reviews democracy, social justice and the judicial system.",
    },
    {
      term: "Political maturity",
      text: "Holding **free and fair elections at regular intervals** is an important indicator of India's successful democracy. Rising participation and political competition show it has largely succeeded.",
    },
    {
      term: "Right to vote",
      text: "The Constitution gave **adult suffrage** equally to men and women above **21**. The voting age was later reduced to **18**, giving the young a chance to take part. This made India the **largest democracy** in the world.",
    },
    {
      term: "Decentralisation of power",
      text: "**Decentralisation of power is central to democratic government.** It controls misuse of power and lets common people take part. The **73rd and 74th amendments** gave **constitutional status to local self-governing institutions**.",
    },
    {
      term: "Rights based approach",
      text: "After 2000, democratic reforms are seen as **rights** of citizens, not favours to beneficiaries. So citizens got the Right to Information, education and food security, which strengthened democracy.",
    },
    {
      term: "Right to Information (2005)",
      text: "Citizens have a right to know how the government works. RTI ensures **transparency and accountability**, the hallmarks of good governance, and has **reduced secrecy** in the working of government.",
    },
    {
      term: "Establishing social justice",
      text: "To remove the social conditions responsible for injustice and insist on **equality of dignity** for all. It ends discrimination by caste, religion, language, gender, birth place, race or property and gives everyone equal opportunity.",
    },
    {
      term: "Policy of reservation of seats",
      text: "For sections **deprived of education and employment** for a long time: seats reserved in educational institutions and government services for SC and ST, and also for other backward classes.",
    },
    {
      term: "Atrocities Act and minorities",
      text: "The **SC and ST (Prevention of Atrocities) Act** punishes atrocities against them. For **minorities**, the Constitution bans discrimination by caste, religion, race, language and region and protects their cultural and educational rights.",
    },
    {
      term: "Laws relating to women",
      text: "Equal share in the property of father and husband; **Dowry Prohibition Act**; act against sexual harassment; **Domestic Violence Prohibition Act**. A **National Commission for Women** was set up, with commissions in States too.",
    },
    {
      term: "Women's representation",
      text: "The 73rd and 74th amendments reserved **33%** of seats for women in local bodies; raised to **50%** in several states including **Maharashtra**. Women MPs in the Lok Sabha: fewest in **1977** (19), most in **2014** (66, 12.15%).",
    },
    {
      term: "Basic structure of the Constitution",
      text: "The Constitution is dynamic, a **living document**. **Parliament** can amend it but **cannot alter its basic structure**: republican democracy, federal structure, unity and integrity, sovereignty, secularism and supremacy of the Constitution.",
    },
    {
      term: "Significant judicial decisions",
      text: "Judgements on **rights of children, human rights, honour and dignity of women, individual freedom and tribal empowerment** made fundamental rights more meaningful and the political process in India **more mature**.",
    },
    {
      term: "Features of good governance",
      text: "Accountable, effective and responsive government; **transparency**; just and all-inclusive development; **people's participation** in governing and decision making.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept map: laws related to women",
      labels: ["equal share in property", "Dowry Prohibition Act", "act against sexual harassment", "Domestic Violence Prohibition Act"],
    },
    {
      title: "Chart: women MPs in the Lok Sabha (1951-2014)",
      labels: ["fewest: 1977, 19 MPs (3.51%)", "most: 2014, 66 MPs (12.15%)", "1951-52: 22 MPs (4.50%)", "draw it as a bar chart"],
    },
  ],
  mostAsked: [
    { topic: "Women: laws for women, 50% seats in Maharashtra, representation in the Lok Sabha, court decisions", marks: 2, years: [2026, 2025, 2022] },
    { topic: "Social justice: reservation of seats, provisions for minorities, meaning of social justice", marks: 2, years: [2026, 2025, 2024] },
    { topic: "Right to vote: voting age 18, effects of lowering it, largest democracy", marks: 2, years: [2025, 2024, 2020] },
    { topic: "Essence of democracy; 73rd and 74th amendments and local self-government", marks: 1, years: [2024, 2022, 2020] },
    { topic: "Judiciary: living document, Parliament and the basic structure, judgements that made politics mature", marks: 2, years: [2026, 2024, 2022] },
    { topic: "Right to Information: explain the concept; did it increase secrecy?", marks: 2, years: [2026, 2025] },
    { topic: "Concept diagram: democratic values", marks: 2, years: [2020] },
  ],
  mistakes: [
    {
      title: "'RTI increased secrecy': true",
      body: "**False.** RTI made the government more transparent and **reduced** secrecy in its working.",
    },
    {
      title: "33% or 50%",
      body: "The 73rd and 74th amendments reserved **33%** for women in local bodies; **Maharashtra** has raised it to **50%**.",
    },
    {
      title: "Who can amend the Constitution",
      body: "**Parliament** can change the Constitution, but cannot alter its **basic structure**. Not the President, not the citizens.",
    },
    {
      title: "The essence of democracy",
      body: "From the book: **decentralisation of power** is central to democratic government. Universal adult franchise is the right to vote, a separate point.",
    },
    {
      title: "True or false with no reason",
      body: "Every true or false carries marks only for the reason: e.g. 'largest democracy' is **true** because India has the largest number of voters of any democracy.",
    },
  ],
};

export default sheet;
