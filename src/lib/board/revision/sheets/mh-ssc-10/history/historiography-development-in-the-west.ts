import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 History, Ch. 1 Historiography: Development in the West. Points in
 * the Balbharati text's own wording; most-asked years and marks from the board
 * past-paper questions in the bank, 2020-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "History",
  subjectRoute: "history",
  chapterName: "Historiography: Development in the West",
  chapterSlug: "historiography-development-in-the-west",
  source: "Balbharati History and Political Science Std X (Maharashtra State Board), History Chapter 1",
  keyPoints: [
    {
      term: "Historiography",
      text: "The writing of critical historical narrative is known as **historiography**. A scholar who writes such a narrative is a historian.",
    },
    {
      term: "Four characteristics of modern historiography",
      text: "(1) Its method is based on scientific principles and begins with relevant questions. (2) The questions are **anthropocentric** (about human deeds). (3) Answers are supported by reliable evidence. (4) It presents a graph of mankind's journey.",
    },
    {
      term: "The word 'History'",
      text: "A Greek term. **Herodotus**, the Greek historian of the fifth century B.C.E., used it first for his book **'The Histories'**.",
    },
    {
      term: "First history department",
      text: "In **1737 C.E.** the **Gottingen University** was founded in Germany. It was the first to have an independent department of history.",
    },
    {
      term: "Rene Descartes (1596-1650)",
      text: "Insisted on verifying historical documents by examining them critically. His book: **'Discourse on the Method'**. His rule: never to accept anything for true till all grounds of doubt are excluded.",
    },
    {
      term: "Voltaire (1694-1778)",
      text: "French; original name **Francois-Marie Arouet**. Along with truth and chronology, he said social traditions, trade, economy and agriculture matter too. So he is called the **founder of modern historiography**.",
    },
    {
      term: "Hegel (1770-1831)",
      text: "German philosopher. Historical reality should be presented in a **logical** manner; the timeline of events shows progress. Books: **'Reason in History'** and 'Encyclopaedia of Philosophical Sciences'.",
    },
    {
      term: "Dialectics",
      text: "Hegel's method of analysis based on opposites. A **thesis** is proposed, then a contrary **antithesis**; after discussion a new thesis holding the gist of both is reached: the **synthesis**.",
    },
    {
      term: "Leopold von Ranke (1795-1886)",
      text: "Of Berlin University. Spoke of the **critical method** of research; stressed original documents, examined with great care. Criticised imaginative narration. Books: 'The Theory and Practice of History', **'The Secret of World History'**.",
    },
    {
      term: "Karl Marx (1818-1883)",
      text: "History is not about abstract ideas but about living people. Unequal access to the **means of production** divides society into classes. **Human history is the history of class struggle.** His book: **'Das Kapital'**.",
    },
    {
      term: "Annales School",
      text: "Arose in **France** at the start of the twentieth century, started by French historians. History is not only politics, kings and wars but also climate, local people, agriculture, trade, technology and collective psychology.",
    },
    {
      term: "Feminist historiography",
      text: "The restructuring of history from the perspective of **women**. **Simone de Beauvoir** (French) laid its fundamentals. It also rethinks the male dominated view. After 1990 women were shown as an independent social class.",
    },
    {
      term: "Michel Foucault (1926-1984)",
      text: "French historian. In **'Archaeology of Knowledge'** he said arranging events in chronological order is not right; explaining the **transitions** in history matters more. He studied madness, medicine and prisons.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Concept chart: Notable scholars in Europe",
      labels: [
        "Descartes: Discourse on the Method",
        "Voltaire: founder of modern historiography",
        "Hegel: Reason in History, dialectics",
        "Ranke: critical method",
        "Marx: Das Kapital, class struggle",
        "Foucault: Archaeology of Knowledge",
      ],
    },
  ],
  mostAsked: [
    { topic: "Voltaire, the founder of modern historiography: choose the option, short note, give reasons", marks: 1, years: [2026, 2024, 2022, 2020] },
    { topic: "Feminist historiography; why research focused on women's life", marks: 2, years: [2026, 2025, 2024, 2020] },
    { topic: "Explain Karl Marx's class theory (Marxist history, class struggle)", marks: 3, years: [2026, 2024, 2020] },
    { topic: "Thinkers and their books: find the wrong pair or complete the sentence", marks: 1, years: [2025, 2024] },
    { topic: "Give reasons: Foucault called his method 'the archaeology of knowledge'", marks: 2, years: [2025, 2024] },
    { topic: "Short note: Annales School", marks: 2, years: [2026] },
  ],
  mistakes: [
    {
      title: "Ranke for Voltaire",
      body: "The founder of modern historiography is **Voltaire**. Ranke gave the critical method; Marx gave class struggle.",
    },
    {
      title: "Wrong book with the author",
      body: "Descartes: Discourse on the Method. Herodotus: The Histories. Hegel: Reason in History. Ranke: The Secret of World History. Marx: Das Kapital. Foucault: Archaeology of Knowledge.",
    },
    {
      title: "History as the mother of all sciences",
      body: "The board has asked this (2020). The answer is **Philosophy**, considered the mother of science and all other subjects, not History.",
    },
    {
      title: "Placing the Annales School in Germany",
      body: "The Annales School arose in **France** (twentieth century). Germany gave the Gottingen University (1737), the first independent history department.",
    },
    {
      title: "A bare definition for a 3-mark answer",
      body: "For Marx's class theory write the chain: needs, means of production, unequal access, classes, class struggle, exploitation by the owning class.",
    },
  ],
};

export default sheet;
