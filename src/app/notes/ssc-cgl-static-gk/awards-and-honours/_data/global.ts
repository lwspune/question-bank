import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAW_GLOBAL_NOTE: SubtopicNote = {
  subtopicName: "Nobel, Grammy and Film Awards",
  title: "Nobel, Grammy and Film Awards",
  oneLineDefinition:
    "The early Nobel Prizes SSC has asked, the Grammys won by Indian musicians, and the film and music awards of famous Indian artists.",
  whyItMatters:
    "10 questions in the bank, five each from the 2023 and the 2024 shifts: three on Nobel Prizes, three on Grammys won by Indian musicians and four on film and music awards. Each asks one pairing of a person, a year and a work.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscsawgl-nobel",
      name: "Nobel Prizes SSC has asked",
      intuition:
        "The Nobel questions here ask the first winners and the famous firsts. Learn the first chemistry winners in order and Tagore's year.",
      definition:
        "- **Rabindranath Tagore**, **1913**, Literature, for **Gitanjali**: the **first non-European** to win a Nobel Prize.\n" +
        "- **C. V. Raman**, 1930, Physics, for the Raman effect.\n" +
        "- The first Chemistry Prizes in order: **J. H. van 't Hoff** (**1901**, the first; the laws of chemical dynamics and osmotic pressure), Emil Fischer (1902), Svante Arrhenius (1903). Henri Moissan won in 1906.\n" +
        "- **Linus Pauling**: Chemistry **1954** (the nature of the chemical bond) and Peace 1962, the only person to win two Nobel Prizes on his own.",
      table: {
        columns: ["Winner", "Year and field", "For"],
        rows: [
          { cells: ["Rabindranath Tagore", "1913, Literature", "Gitanjali; first non-European"] },
          { cells: ["C. V. Raman", "1930, Physics", "The Raman effect"] },
          { cells: ["J. H. van 't Hoff", "1901, Chemistry (the first)", "Chemical dynamics and osmotic pressure"], pyqExampleId: "73b0a80d-a9bb-4ae3-8ffe-6a5b33640a05" },
          { cells: ["Emil Fischer", "1902, Chemistry", "The second Chemistry Prize"] },
          { cells: ["Svante Arrhenius", "1903, Chemistry", "The third Chemistry Prize"] },
          { cells: ["Linus Pauling", "1954, Chemistry; 1962, Peace", "The nature of the chemical bond"], pyqExampleId: "baa61202-4691-46fd-9c2d-b12eab89e303" },
        ],
      },
      pyqExampleId: "5dbcd63b-f55c-42f3-9f8d-0a4916b907ea",
      selfCheckExample: {
        prompt: "Who won the first Nobel Prize in Chemistry, in 1901?",
        steps: ["Fischer (1902) and Arrhenius (1903) came after.", "The 1901 prize went to J. H. van 't Hoff."],
        answer: "J. H. van 't Hoff",
      },
      practiceSet: [
        { prompt: "For which work did Rabindranath Tagore win the Nobel Prize?", answer: "Gitanjali" },
        { prompt: "In which year did Linus Pauling win the Nobel Prize in Chemistry?", answer: "1954" },
        { prompt: "In which field did C. V. Raman win the Nobel Prize?", answer: "Physics" },
        { prompt: "Which second Nobel Prize did Linus Pauling win in 1962?", answer: "The Peace Prize" },
      ],
      traps: [
        {
          title: "Rabindranath, not another Tagore",
          body: "The 1913 Nobel went to Rabindranath Tagore. Dwarkanath and Abanindranath Tagore are his family members put in as distractors.",
        },
        {
          title: "1901 is van 't Hoff, not Arrhenius",
          body: "Arrhenius won in 1903 and Fischer in 1902. The first Chemistry Prize, in 1901, was van 't Hoff's.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsawgl-grammy",
      name: "Grammys won by Indian musicians",
      intuition:
        "Each Indian Grammy SSC asks has a year, a work and often a foreign partner. Learn the three together.",
      definition:
        "- **Ravi Shankar**, **1968**: his first Grammy (Best Chamber Music Performance) for **West Meets East**, recorded with the violinist **Yehudi Menuhin**.\n" +
        "- **Zakir Hussain**, 1992: his first Grammy, for Planet Drum with Mickey Hart.\n" +
        "- **Vishwa Mohan Bhatt**, **1994**: for **A Meeting by the River**, with Ry Cooder.\n" +
        "- **A. R. Rahman, Gulzar and Tanvi Shah**, **2010** (the 52nd Grammys): Best Song for a film, for **Jai Ho** from Slumdog Millionaire. Tanvi Shah wrote and sang its Spanish lines.",
      table: {
        columns: ["Musician", "Year", "For"],
        rows: [
          { cells: ["Ravi Shankar", "1968", "West Meets East, with Yehudi Menuhin"], pyqExampleId: "c69c3ec1-6394-4c67-ab48-c5e76c2d3c4f" },
          { cells: ["Zakir Hussain", "1992", "Planet Drum, with Mickey Hart"] },
          { cells: ["Vishwa Mohan Bhatt", "1994", "A Meeting by the River, with Ry Cooder"] },
          { cells: ["A. R. Rahman, Gulzar, Tanvi Shah", "2010 (52nd Grammys)", "Jai Ho, Slumdog Millionaire"], pyqExampleId: "1cfd8f4d-83e3-428c-9a07-f27526360bed" },
        ],
      },
      pyqExampleId: "96a630f5-1623-4382-bd17-9aa460480881",
      selfCheckExample: {
        prompt: "For which work did Ravi Shankar win his first Grammy?",
        steps: ["His first Grammy came in 1968, for chamber music.", "The album was West Meets East, recorded with Yehudi Menuhin."],
        answer: "West Meets East",
      },
      practiceSet: [
        { prompt: "With which violinist did Ravi Shankar record West Meets East?", answer: "Yehudi Menuhin" },
        { prompt: "Which song won A. R. Rahman and Gulzar a Grammy in 2010?", answer: "Jai Ho" },
        { prompt: "In which year did Zakir Hussain win his first Grammy?", answer: "1992" },
        { prompt: "Who shared the Jai Ho Grammy with A. R. Rahman and Gulzar?", answer: "Tanvi Shah" },
      ],
      traps: [
        {
          title: "The Jai Ho Grammy went to the songwriters",
          body: "The Grammy was for the song, so it went to A. R. Rahman, Gulzar and Tanvi Shah. Danny Boyle (the director) and the actors are distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsawgl-film",
      name: "Film and music awards of famous artists",
      intuition:
        "Film award questions name an artist and a year and ask the film, or name an award and ask who gives it. Remember the film each award was for.",
      definition:
        "- **Birju Maharaj** won the **Filmfare** award for Best Choreography in **2016** for the song \"Mohe Rang Do Laal\" in **Bajirao Mastani**.\n" +
        "- **Asha Bhosle** won the **IIFA** Best Female Playback award in **2002** for \"Radha Kaise Na Jale\" in **Lagaan**. In **1987** she received the **Nightingale of Asia** award from the Indo-Pak Association, UK.\n" +
        "- **Lata Mangeshkar** received the **Dadasaheb Phalke Award**, Indian cinema's highest honour, in 1989.\n" +
        "- The **IMMIES** (Indian Music Industry awards) are presented by **MTV** India.\n\n" +
        "An award year honours the films of the year before: the 2002 IIFA Awards judged the films of 2001, so a 2002 film cannot be the answer.",
      table: {
        columns: ["Artist or award", "Award", "For or given by"],
        rows: [
          { cells: ["Birju Maharaj", "Filmfare Best Choreography, 2016", "Bajirao Mastani"], pyqExampleId: "5cd0c350-03fe-43ff-bc43-4f9e8921c38c" },
          { cells: ["Asha Bhosle", "IIFA Best Female Playback, 2002", "Lagaan"] },
          { cells: ["Asha Bhosle", "Nightingale of Asia, 1987", "Indo-Pak Association, UK"], pyqExampleId: "7af46fcd-f9b5-4c96-afe9-c51e344014ef" },
          { cells: ["Lata Mangeshkar", "Dadasaheb Phalke Award, 1989", "Indian cinema's highest honour"] },
          { cells: ["IMMIES", "Indian music industry awards", "MTV India"], pyqExampleId: "d00333d1-a73e-48c0-92d7-551f3772731c" },
        ],
      },
      pyqExampleId: "903e789f-0bd2-4053-9d53-e9dcf3491ea9",
      selfCheckExample: {
        prompt: "Which channel presents the IMMIES awards?",
        steps: ["The IMMIES honour the Indian music industry.", "They are presented by MTV India."],
        answer: "MTV",
      },
      practiceSet: [
        { prompt: "For which film did Birju Maharaj win the Filmfare award for choreography?", answer: "Bajirao Mastani" },
        { prompt: "Which singer received the Nightingale of Asia award in 1987?", answer: "Asha Bhosle" },
        { prompt: "In which year did Lata Mangeshkar receive the Dadasaheb Phalke Award?", answer: "1989" },
        { prompt: "Which body gave Asha Bhosle the Nightingale of Asia award?", answer: "The Indo-Pak Association, UK" },
      ],
      traps: [
        {
          title: "An award year judges the year before",
          body: "The Filmfare awards of 2016 judged films of 2015, so Bajirao Mastani (2015) fits; Dangal and Befikre (2016 films) do not.",
        },
      ],
    },
  ],
};
