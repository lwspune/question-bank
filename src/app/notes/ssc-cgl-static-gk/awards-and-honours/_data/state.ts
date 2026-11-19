import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAW_STATE_NOTE: SubtopicNote = {
  subtopicName: "State and Academy Awards",
  title: "State and Academy Awards",
  oneLineDefinition:
    "Arts awards given by state governments, the highest honours of some states, and the awards of the Sangeet Natak Akademi and the Music Academy, Madras.",
  whyItMatters:
    "11 questions in the bank, 10 of them from the 2024 shifts. Most ask who gives an award: a state government, a national academy or a music society. The award's name usually holds the clue, so learn to read it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsawst-giver",
      name: "Reading the giver from the award's name",
      intuition:
        "An award is often named after someone or something of the place that gives it: a great musician who lived there, a temple song, the state's own name. Read the name before the options.",
      definition:
        "- **A state's name with Ratna or Bhushan** is that state's highest civilian honour: **Maharashtra Bhushan**, **Karnataka Ratna**.\n" +
        "- **Named after an artist of the region:** the **Tansen Samman** and the **Kalidas Samman** are both given by **Madhya Pradesh** (both since **1980**). Tansen's tomb is at Gwalior, where the Tansen music festival is held.\n" +
        "- **Named after a temple song:** the **Harivarasanam** award is given by **Kerala**; Harivarasanam is the song sung at Sabarimala each night as the shrine closes.\n" +
        "- **A national academy:** the **Sangeet Natak Akademi Award**, New Delhi, for music, dance and drama.\n" +
        "- **A music society:** the **Music Academy, Madras** gives the **Sangita Kalanidhi** and the **Sangeetha Kala Acharya**, both for Carnatic music.\n\n" +
        "The clue fails for awards named after a body rather than a person or place (the MG Music Awards of Nagaland, the Nandi Awards of Andhra Pradesh). Those you learn from the table.",
      authoredExample: {
        prompt: "The Kalidas Samman for the arts is given by which state government? (a) Kerala (b) Madhya Pradesh (c) Nagaland (d) Andhra Pradesh",
        steps: [
          "Madhya Pradesh names its arts awards after great artists linked to the state, as with the Tansen Samman.",
          "The Kalidas Samman is the Madhya Pradesh government's arts award, started in 1980 like the Tansen Samman.",
        ],
        answer: "(b) Madhya Pradesh",
      },
      selfCheckExample: {
        prompt: "Who gives the Sangita Kalanidhi: a state government or the Music Academy, Madras?",
        steps: ["The Sangita Kalanidhi is a Carnatic music award.", "It is given by the Music Academy, Madras, a music society, not by a government."],
        answer: "The Music Academy, Madras",
      },
      practiceSet: [
        { prompt: "The Karnataka Ratna is the highest civilian honour of which state?", answer: "Karnataka" },
        { prompt: "Which state government gives the Tansen Samman?", answer: "Madhya Pradesh" },
        { prompt: "Which body gives the Sangeetha Kala Acharya award?", answer: "The Music Academy, Madras" },
        { prompt: "The Harivarasanam award is named after a song of which shrine?", answer: "Sabarimala" },
      ],
      traps: [
        {
          title: "Tansen Samman is Madhya Pradesh's",
          body: "Tansen is linked with Gwalior, so his award is Madhya Pradesh's. The Kishore Kumar Samman (cinema) and the Iqbal Samman (Urdu literature) are other Madhya Pradesh awards, not for classical music.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsawst-state",
      name: "State government awards",
      intuition:
        "Each state award below has a giver, a field and one fact SSC has asked. The giver is what most questions want.",
      definition:
        "- **Tansen Samman:** Madhya Pradesh, for Hindustani classical music, since **1980**; presented at the Tansen festival in Gwalior.\n" +
        "- **Nandi Awards:** Andhra Pradesh, for Telugu cinema; the Best Male Playback Singer award began in **1977**.\n" +
        "- **Harivarasanam Puraskaram:** Kerala, for music.\n" +
        "- **MG Music Awards:** Nagaland.\n" +
        "- **Maharashtra Bhushan:** Maharashtra's highest civilian honour; Bhimsen Joshi received it in **2002**.\n" +
        "- **Karnataka Ratna:** Karnataka's highest civilian honour; Bhimsen Joshi, born in Gadag, Karnataka, received it in **2005**.\n" +
        "- **Gujarat State Film Award:** Mallika Sarabhai won Best Actress for the Gujarati film **Meena Gurjari** (1975).",
      table: {
        columns: ["Award", "Given by", "Field", "Remember for"],
        rows: [
          { cells: ["Tansen Samman", "Madhya Pradesh", "Hindustani classical music", "Since 1980"], pyqExampleId: "0fca7f9c-b240-4ead-b132-776197ba7a69" },
          { cells: ["Nandi Awards", "Andhra Pradesh", "Telugu cinema", "Best Male Playback Singer from 1977"], pyqExampleId: "36e46f81-bf2f-41eb-b424-1ad6c646ae8c" },
          { cells: ["Harivarasanam Puraskaram", "Kerala", "Music", "Named after the Sabarimala song"] },
          { cells: ["MG Music Awards", "Nagaland", "Music", "Given by Nagaland's musicians' guild"], pyqExampleId: "91bf880b-d9c8-45da-938e-94f87994928c" },
          { cells: ["Maharashtra Bhushan", "Maharashtra", "Highest state civilian honour", "Bhimsen Joshi, 2002"], pyqExampleId: "9cc4fc91-491f-4a8c-8376-7d345a73ccf9" },
          { cells: ["Karnataka Ratna", "Karnataka", "Highest state civilian honour", "Bhimsen Joshi, 2005"], pyqExampleId: "f9e9afc9-44b8-4fdb-982d-345077a002ce" },
          { cells: ["Gujarat State Film Award", "Gujarat", "Gujarati cinema", "Mallika Sarabhai, Meena Gurjari (1975)"], pyqExampleId: "8b3b47e9-4b3c-4d16-8255-8d90d2bfb077" },
        ],
      },
      pyqExampleId: "4d862265-bd14-4ca2-812c-98bdcc10f130",
      selfCheckExample: {
        prompt: "Which state's government gives the Nandi Awards?",
        steps: ["The Nandi Awards honour Telugu cinema.", "They are given by the Government of Andhra Pradesh."],
        answer: "Andhra Pradesh",
      },
      practiceSet: [
        { prompt: "In which year did Bhimsen Joshi receive the Maharashtra Bhushan?", answer: "2002" },
        { prompt: "Which state presents the MG Music Awards?", answer: "Nagaland" },
        { prompt: "In which year was the Tansen Samman started?", answer: "1980" },
        { prompt: "For which Gujarati film did Mallika Sarabhai win a best actress award?", answer: "Meena Gurjari" },
      ],
      traps: [
        {
          title: "Bhimsen Joshi has two state honours",
          body: "Bhimsen Joshi received the Maharashtra Bhushan (2002) and the Karnataka Ratna (2005). Read which state the stem names before you answer.",
        },
        {
          title: "Nandi is Andhra Pradesh's",
          body: "The Nandi Awards are Andhra Pradesh's film awards. Maharashtra, Gujarat and Tripura are the distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsawst-academy",
      name: "Academy and music society awards",
      intuition:
        "Two bodies give most of these awards: the Sangeet Natak Akademi in New Delhi and the Music Academy in Madras (Chennai). One more award is named after a sarod maestro.",
      definition:
        "- **Sangeet Natak Akademi Award:** the national academy's award for music, dance and drama; **Shivkumar Sharma** received it in **1986**.\n" +
        "- **Sangita Kalanidhi:** the Music Academy, Madras; **Semmangudi Srinivasa Iyer** received it in **1947**, its youngest winner.\n" +
        "- **Sangeetha Kala Acharya:** the Music Academy, Madras, every year since **1993**, for teachers and scholars of Carnatic music.\n" +
        "- **Ustad Hafiz Ali Khan Award:** named after the sarod player Hafiz Ali Khan, father of Amjad Ali Khan; **Shivkumar Sharma** received it in **1998**.",
      table: {
        columns: ["Award", "Given by", "Remember for"],
        rows: [
          { cells: ["Sangeet Natak Akademi Award", "Sangeet Natak Akademi, New Delhi", "Shivkumar Sharma, 1986"] },
          { cells: ["Sangita Kalanidhi", "Music Academy, Madras", "Semmangudi Srinivasa Iyer, 1947, the youngest"], pyqExampleId: "18dad24b-3b9a-40a0-8a7d-1dc3fa2f8556" },
          { cells: ["Sangeetha Kala Acharya", "Music Academy, Madras", "Every year since 1993"], pyqExampleId: "5f3d77c3-b1f5-429e-8d7c-ebc0d3326a48" },
          { cells: ["Ustad Hafiz Ali Khan Award", "Named after Amjad Ali Khan's father", "Shivkumar Sharma, 1998"], pyqExampleId: "45cf7402-0b28-4537-b4d5-6a02e4e66826" },
        ],
      },
      pyqExampleId: "7da60b8b-9861-4a90-a2c6-dc27f345db57",
      selfCheckExample: {
        prompt: "Since which year has the Music Academy, Madras given the Sangeetha Kala Acharya award?",
        steps: ["The Sangeetha Kala Acharya honours teachers of Carnatic music.", "The Music Academy has given it every year since 1993."],
        answer: "1993",
      },
      practiceSet: [
        { prompt: "Who was the youngest winner of the Sangita Kalanidhi, in 1947?", answer: "Semmangudi Srinivasa Iyer" },
        { prompt: "Which santoor player received the Ustad Hafiz Ali Khan Award in 1998?", answer: "Shivkumar Sharma" },
        { prompt: "Which body gives the Sangita Kalanidhi?", answer: "The Music Academy, Madras" },
        { prompt: "Hafiz Ali Khan was the father of which sarod player?", answer: "Amjad Ali Khan" },
      ],
      traps: [
        {
          title: "The Music Academy is in Madras, not Calcutta",
          body: "The Sangita Kalanidhi and the Sangeetha Kala Acharya come from the Music Academy, Madras (Chennai). A Calcutta school or a private academy is the distractor.",
        },
      ],
    },
  ],
};
