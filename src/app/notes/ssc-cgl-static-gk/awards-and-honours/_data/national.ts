import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAW_NATIONAL_NOTE: SubtopicNote = {
  subtopicName: "Bharat Ratna, Padma and Gallantry Awards",
  title: "Bharat Ratna, Padma and Gallantry Awards",
  oneLineDefinition:
    "The order of India's civilian and gallantry honours, the musicians who received the Bharat Ratna and when, and the Padma awards of the great dancers and instrumentalists.",
  whyItMatters:
    "15 questions in the bank, 11 of them from the 2024 shifts. They give an artist and a year and ask which award, or give the award and ask the year. Learn the order of the honours first, then the year each great musician reached each step.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsawna-ladder",
      name: "The order of India's national honours",
      intuition:
        "India's civilian honours form a ladder of four steps, and an artist usually climbs it over many years. Know the order and a \"which award in this year\" question is often settled by the step the artist had already reached.",
      definition:
        "**Civilian honours**, highest first:\n" +
        "- **Bharat Ratna**, then **Padma Vibhushan**, then **Padma Bhushan**, then **Padma Shri**.\n" +
        "- The Padma awards are announced every year on the eve of **Republic Day**.\n\n" +
        "**Gallantry awards:**\n" +
        "- **Param Vir Chakra:** the highest award for bravery in war; then Maha Vir Chakra and **Vir Chakra**.\n" +
        "- **Ashoka Chakra:** the highest award for bravery away from the battlefield (peacetime).\n\n" +
        "**Speed move:** if an artist got the Padma Bhushan years earlier, a later award in the options is the Padma Vibhushan or the Bharat Ratna, never the Padma Shri.",
      table: {
        columns: ["Honour", "Place in the order", "Given for"],
        rows: [
          { cells: ["Bharat Ratna", "Highest civilian honour", "Service of the highest order"] },
          { cells: ["Padma Vibhushan", "Second civilian honour", "Exceptional and distinguished service"], pyqExampleId: "6b8c656d-b400-45f8-8f6d-d13127954bc4" },
          { cells: ["Padma Bhushan", "Third civilian honour", "Distinguished service of a high order"] },
          { cells: ["Padma Shri", "Fourth civilian honour", "Distinguished service"] },
          { cells: ["Param Vir Chakra", "Highest wartime gallantry award", "Bravery in the face of the enemy"], pyqExampleId: "029aab7a-54f8-4d32-aee3-561a6a236beb" },
          { cells: ["Ashoka Chakra", "Highest peacetime gallantry award", "Bravery away from the battlefield"] },
        ],
      },
      pyqExampleId: "4a4b5c39-a033-4a7e-9d1c-0c8bfbf7938c",
      selfCheckExample: {
        prompt: "Which ranks higher: the Padma Bhushan or the Padma Vibhushan?",
        steps: ["The ladder is Bharat Ratna, Padma Vibhushan, Padma Bhushan, Padma Shri.", "The Padma Vibhushan is second, the Padma Bhushan third."],
        answer: "The Padma Vibhushan",
      },
      practiceSet: [
        { prompt: "What is India's highest peacetime gallantry award?", answer: "The Ashoka Chakra" },
        { prompt: "Which civilian honour is fourth in order?", answer: "The Padma Shri" },
        { prompt: "On the eve of which day are the Padma awards announced?", answer: "Republic Day" },
        { prompt: "What is India's highest wartime gallantry award?", answer: "The Param Vir Chakra" },
      ],
      traps: [
        {
          title: "Vibhushan outranks Bhushan",
          body: "The Padma Vibhushan is the second civilian honour and the Padma Bhushan the third. The longer name is the higher award.",
        },
        {
          title: "Gallantry awards are not civilian honours",
          body: "The Param Vir Chakra and the Ashoka Chakra are for bravery. They are not part of the Bharat Ratna and Padma ladder.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsawna-ratna",
      name: "Musicians with the Bharat Ratna",
      intuition:
        "Only a handful of musicians have received the Bharat Ratna, and SSC asks them by year. Six names and their years cover every question so far.",
      definition:
        "- **M. S. Subbulakshmi** (1998): the Carnatic vocalist, the **first musician** to receive it.\n" +
        "- **Ravi Shankar** (1999): the sitar maestro.\n" +
        "- **Lata Mangeshkar** and **Bismillah Khan** (both **2001**): the playback singer and the shehnai maestro.\n" +
        "- **Bhimsen Joshi**: the Kirana gharana vocalist, famous for khayal. His award was announced in **November 2008** and presented in **2009**.\n" +
        "- **Bhupen Hazarika** (2019): the Assamese singer and composer, given it **after his death**, the same year as Pranab Mukherjee and Nanaji Deshmukh.",
      table: {
        columns: ["Musician", "Bharat Ratna", "Known for"],
        rows: [
          { cells: ["M. S. Subbulakshmi", "1998", "Carnatic vocalist; first musician"] },
          { cells: ["Ravi Shankar", "1999", "Sitar"], pyqExampleId: "baac0022-6328-4fac-8153-dc33642cf7a1" },
          { cells: ["Lata Mangeshkar", "2001", "Playback singer"], pyqExampleId: "2f736540-7501-4b80-8fdc-f83cad3b638a" },
          { cells: ["Bismillah Khan", "2001", "Shehnai"] },
          { cells: ["Bhimsen Joshi", "Announced 2008, given 2009", "Kirana gharana; khayal"], pyqExampleId: "a27bec8c-71ca-4f8e-8e5a-d33ebb1a5349" },
          { cells: ["Bhupen Hazarika", "2019, after his death", "Assamese singer and composer"] },
        ],
      },
      pyqExampleId: "0876cad6-eba7-4064-82bd-618bfca545ab",
      selfCheckExample: {
        prompt: "In which year did Bismillah Khan receive the Bharat Ratna?",
        steps: ["Two musicians received it in the same year: Lata Mangeshkar and Bismillah Khan.", "That year was 2001."],
        answer: "2001",
      },
      practiceSet: [
        { prompt: "Who was the first musician to receive the Bharat Ratna?", answer: "M. S. Subbulakshmi (1998)" },
        { prompt: "Which Kirana gharana vocalist received the Bharat Ratna?", answer: "Pandit Bhimsen Joshi" },
        { prompt: "In which year did Ravi Shankar receive the Bharat Ratna?", answer: "1999" },
        { prompt: "Lata Mangeshkar shared her Bharat Ratna year with which shehnai player?", answer: "Bismillah Khan" },
      ],
      traps: [
        {
          title: "2001 has two musicians",
          body: "Lata Mangeshkar and Bismillah Khan both received the Bharat Ratna in 2001. Either can be the answer for that year.",
        },
        {
          title: "Bhimsen Joshi: 2008 or 2009",
          body: "His Bharat Ratna was announced in November 2008 and presented in 2009, and SSC has printed both years. Pick whichever of the two is offered.",
        },
        {
          title: "Bhimsen Joshi was not the first vocalist",
          body: "M. S. Subbulakshmi (1998) and Lata Mangeshkar (2001) were vocalists who got the Bharat Ratna before him. He is still the answer when he is the only Bharat Ratna among the options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsawna-padma",
      name: "Padma awards of the great artists",
      intuition:
        "SSC gives a great dancer or instrumentalist and a year and asks which Padma award it was. The table gives each artist's steps with their years.",
      definition:
        "- **Birju Maharaj** (Kathak): Padma Vibhushan, **1986**.\n" +
        "- **Kelucharan Mohapatra** (Odissi): Padma Vibhushan, **2000**, the **first from Odisha** to receive it.\n" +
        "- **Sonal Mansingh** (Bharatanatyam, Odissi): Padma Bhushan 1992, Padma Vibhushan 2003. She is not from Odisha.\n" +
        "- **Zakir Hussain** (tabla): Padma Shri 1988, Padma Bhushan **2002**, at 51 the **youngest percussionist** to receive it.\n" +
        "- **Hariprasad Chaurasia** (bansuri): Padma Bhushan 1992, Padma Vibhushan **2000**.\n" +
        "- **Amjad Ali Khan** (sarod): Padma Shri 1975, Padma Bhushan 1991, Padma Vibhushan 2001.\n" +
        "- **Ravi Shankar** (sitar): Padma Bhushan 1967, Padma Vibhushan 1981.\n" +
        "- **Shivkumar Sharma** (santoor): Padma Shri 1991, Padma Vibhushan 2001.",
      table: {
        columns: ["Artist", "Art", "Padma awards"],
        rows: [
          { cells: ["Birju Maharaj", "Kathak", "Padma Vibhushan 1986"], pyqExampleId: "0ae24520-8077-4a2e-b808-78d25a7d9856" },
          { cells: ["Kelucharan Mohapatra", "Odissi", "Padma Vibhushan 2000; first from Odisha"], pyqExampleId: "ed932d3c-e294-4e98-bdba-7120e601eb8d" },
          { cells: ["Sonal Mansingh", "Bharatanatyam, Odissi", "Padma Bhushan 1992, Padma Vibhushan 2003"] },
          { cells: ["Zakir Hussain", "Tabla", "Padma Shri 1988, Padma Bhushan 2002"], pyqExampleId: "6ae50335-0696-48ff-877c-432cca667e2c" },
          { cells: ["Hariprasad Chaurasia", "Bansuri", "Padma Bhushan 1992, Padma Vibhushan 2000"] },
          { cells: ["Amjad Ali Khan", "Sarod", "Padma Shri 1975, Padma Bhushan 1991, Padma Vibhushan 2001"] },
          { cells: ["Ravi Shankar", "Sitar", "Padma Bhushan 1967, Padma Vibhushan 1981"] },
          { cells: ["Shivkumar Sharma", "Santoor", "Padma Shri 1991, Padma Vibhushan 2001"] },
        ],
      },
      pyqExampleId: "5bfcee39-bc90-446b-83ad-72275e307c95",
      selfCheckExample: {
        prompt: "In which year did Birju Maharaj receive the Padma Vibhushan?",
        steps: ["Birju Maharaj received the Padma Vibhushan long before the Odissi and music maestros of 2000 and 2001.", "The year was 1986."],
        answer: "1986",
      },
      practiceSet: [
        { prompt: "Which tabla player received the Padma Bhushan in 2002?", answer: "Zakir Hussain" },
        { prompt: "In which year did Sonal Mansingh receive the Padma Vibhushan?", answer: "2003" },
        { prompt: "In which year did Ravi Shankar receive the Padma Vibhushan?", answer: "1981" },
        { prompt: "Which Padma award did Shivkumar Sharma receive in 1991?", answer: "The Padma Shri" },
      ],
      traps: [
        {
          title: "Sonal Mansingh is not the first from Odisha",
          body: "Kelucharan Mohapatra (2000) was the first from Odisha to get the Padma Vibhushan. Sonal Mansingh received hers in 2003 and is not from Odisha.",
        },
        {
          title: "Zakir Hussain's 2002 award is the Padma Bhushan",
          body: "His Padma Shri came in 1988. In 2002 he received the Padma Bhushan, the third civilian honour.",
        },
      ],
    },
  ],
};
