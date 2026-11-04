import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Political Science, Ch. 2 The Electoral Process. Points in the
 * Balbharati text's own wording; most-asked years and marks from the board
 * past-paper questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Political Science",
  subjectRoute: "political-science",
  chapterName: "The Electoral Process",
  chapterSlug: "the-electoral-process",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), Political Science Chapter 2",
  keyPoints: [
    {
      term: "Why elections matter",
      text: "People's representatives are selected through elections. Elections help to bring a **change in power through peaceful means**, and different parties get a chance to rule. Modern democracy is a **representative democracy**.",
    },
    {
      term: "Election Commission",
      text: "**Art. 324** of the Constitution set up this **autonomous body**: one **Chief Election Commissioner** and two other commissioners. State Election Commissions conduct elections at the State level.",
    },
    {
      term: "The post of Election Commissioner",
      text: "The **President appoints** the election commissioners. The Chief Election Commissioner cannot be removed easily or for political reasons, to keep the Commission **independent**. It has separate funds but no separate staff.",
    },
    {
      term: "Firsts",
      text: "**Sukumar Sen** was the first Chief Election Commissioner (Commission set up in 1950). **Sham Sharan Negi** of Himachal Pradesh was the first voter (25th October 1951). The first election was held in 1951-52.",
    },
    {
      term: "Preparing the voters list",
      text: "Every Indian citizen who has completed **18 years** has the right to vote, if his name is in the voters list. The Commission prepares and updates the list and issues **identity cards** to voters.",
    },
    {
      term: "Timetable of elections",
      text: "The conduct of elections is entirely the Commission's responsibility. **The Election Commission** decides when to hold elections and **in how many stages** in every state.",
    },
    {
      term: "Candidates and parties",
      text: "The Commission **scrutinises the applications** of party and independent candidates and allows the eligible ones. It **recognises** (and can derecognise) political parties and **allots election symbols**.",
    },
    {
      term: "Resolving disputes",
      text: "The Commission resolves disputes about elections: it can **declare a candidate disqualified** or **conduct re-election** in a particular constituency.",
    },
    {
      term: "Restructuring of constituencies",
      text: "The Lok Sabha has **543** members, one per constituency. Creating constituencies is the work of the **Delimitation Commission**, which does not give in to any pressure.",
    },
    {
      term: "Code of Conduct",
      text: "Rules to be followed by the **Government, political parties and voters** before and during elections, laid down by the Election Commission for free and fair elections. Even the Government cannot violate them.",
    },
    {
      term: "Challenges to free and fair elections",
      text: "**Misuse of money**, candidates with a **criminal background**, **violence** during elections, and tickets to relatives creating a **family monopoly** in politics.",
    },
    {
      term: "Electoral reforms",
      text: "Parties should give **50% candidature to women**; no tickets to candidates with criminal background; the Government should bear election expenses; amend the Representation of the People Act to bar criminals.",
    },
    {
      term: "From ballot boxes to EVM",
      text: "EVMs came in the **1990s**: a **NOTA** option, easier voting for the disabled, fewer trees cut for paper, early results. **VVPAT** (expert committee, 8th October 2010) lets voters check their vote was recorded.",
    },
    {
      term: "General, midterm and by-elections",
      text: "**General**: Lok Sabha elections every five years. **Midterm**: held before the term ends when the government loses its majority and no other government is possible. **By-election**: for one seat left vacant by resignation or death.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Flow chart: process of elections",
      labels: [
        "1 Establishment of constituencies",
        "2 Finalising voter's list",
        "3 Nomination and scrutiny of forms",
        "4 Election campaign",
        "5 Actual voting, 6 Counting of votes",
        "7 Results, 8 Resolution of disputes",
      ],
    },
    {
      title: "Picture: the process of elections and its roles",
      labels: ["role of the Election Commission", "role of political parties and candidates", "role of the voters"],
    },
  ],
  mostAsked: [
    { topic: "Functions of the Election Commission: timetable and stages, re-elections, role chart", marks: 2, years: [2026, 2025, 2024, 2022] },
    { topic: "The Code of Conduct: what it is, who lays it down", marks: 2, years: [2026, 2024, 2020] },
    { topic: "The post of the Election Commissioner; who appoints the commissioners", marks: 2, years: [2026, 2025, 2024] },
    { topic: "Flow chart: process of elections", marks: 2, years: [2024, 2022] },
    { topic: "Challenges in free and fair elections; efforts for transparency", marks: 2, years: [2026] },
    { topic: "What is meant by midterm elections?", marks: 2, years: [2024] },
  ],
  mistakes: [
    {
      title: "'The State government decides the stages': true",
      body: "**False.** The **Election Commission** decides when and in how many stages elections are held in every state.",
    },
    {
      title: "Prime Minister appoints the commissioners",
      body: "The **President** appoints the election commissioners.",
    },
    {
      title: "Midterm or by-election",
      body: "Midterm: the **whole** house is elected early after the government loses its majority. By-election: **one** vacant seat after resignation or death.",
    },
    {
      title: "Re-election and code of conduct statements",
      body: "Both are **true**: the Commission holds re-elections in a constituency under special circumstances (resolving disputes), and it lays down the code of conduct.",
    },
    {
      title: "Flow chart in the wrong order",
      body: "Constituencies, voters list, nomination and scrutiny, campaign, voting, counting, results, disputes. Counting comes before results.",
    },
  ],
};

export default sheet;
