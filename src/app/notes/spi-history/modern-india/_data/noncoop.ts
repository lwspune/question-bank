import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MI_NONCOOP_NOTE: SubtopicNote = {
  subtopicName: "Gandhi and the Non-Cooperation Movement",
  title: "Gandhi and the Non-Cooperation Movement",
  oneLineDefinition:
    "From Gandhiji's return in 1915 to the end of Non-Cooperation in 1922: his first satyagrahas, the war years, Jallianwala Bagh, Khilafat, and how the movement spread and was called off.",
  whyItMatters:
    "Twelve questions in the bank, the most of any page here, four EASY and eight MODERATE. They test a year (1915), a place (Kheda, Amritsar, Bombay, Nagpur), a group (the Ali brothers, the Justice Party, the tribals of the Gudem Hills) and a reason (why the movement was withdrawn). The NCERT Class 10 chapter Nationalism in India is the source of almost every line.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimino-early",
      name: "Gandhi's return, the first satyagrahas and the war years",
      intuition:
        "Gandhiji came back from South Africa with a new way of fighting: satyagraha, the force of truth, without violence. " +
        "He tried it first on local problems in 1917 and 1918, while the First World War was making life harder for ordinary Indians.",
      definition:
        "- Gandhiji returned from South Africa in **January 1915**.\n" +
        "- **1917, Champaran** (Bihar): peasants against the oppressive plantation system of indigo.\n" +
        "- **1917, Kheda** (Gujarat): peasants hit by crop failure and plague who could not pay revenue.\n" +
        "- **1918, Ahmedabad**: a satyagraha among cotton mill workers.\n" +
        "- The **First World War** raised defence spending, paid for by war loans and higher taxes: customs duties went up and income tax was brought in. Villages faced forced recruitment for the army.\n" +
        "- The **Rowlatt Act** of 1919 let the government jail political prisoners without trial for two years. Gandhiji called a nationwide satyagraha against it.\n" +
        "- On **13 April 1919**, at **Jallianwala Bagh** in **Amritsar**, General **Dyer** ordered his troops to fire on an unarmed crowd.",
      table: {
        columns: ["Year", "Event", "Place or detail"],
        rows: [
          { cells: ["1915", "Gandhiji returns from South Africa", "January 1915"] },
          { cells: ["1917", "Champaran Satyagraha", "Bihar, indigo planters"] },
          { cells: ["1917", "**Kheda** Satyagraha", "Gujarat, peasants who could not pay revenue"] },
          { cells: ["1918", "Ahmedabad Satyagraha", "Cotton mill workers"] },
          { cells: ["1914 to 1918", "First World War", "War loans, higher taxes, income tax brought in"] },
          { cells: ["1919", "Rowlatt Act", "Detention without trial for two years"] },
          { cells: ["13 April 1919", "Jallianwala Bagh massacre", "**Amritsar**, General Dyer"] },
        ],
      },
      selfCheckExample: {
        prompt: "In 1917 Gandhiji went to Champaran in Bihar. Whom did he go there to support?",
        steps: ["Champaran was an indigo-growing area.", "The peasants there were being forced into an oppressive plantation system."],
        answer: "The peasants struggling against the indigo plantation system",
      },
      practiceSet: [
        { prompt: "In which year did Gandhiji organise a satyagraha of cotton mill workers in Ahmedabad?", answer: "1918" },
        { prompt: "Which Act of 1919 allowed political prisoners to be held without trial for two years?", answer: "The Rowlatt Act" },
        { prompt: "Which officer ordered the firing at Jallianwala Bagh?", answer: "General Dyer" },
        { prompt: "On what date did the Jallianwala Bagh massacre take place?", answer: "13 April 1919" },
        { prompt: "Which tax was brought in during the First World War to pay for defence?", answer: "Income tax" },
      ],
      pyqExampleId: "4cc97f2e-c485-4682-9ee7-bf8bf3699e3e",
      traps: [
        {
          title: "Champaran is Bihar, Kheda is Gujarat",
          body:
            "Both satyagrahas came in 1917. Champaran in Bihar was about indigo; Kheda in Gujarat was about land revenue after a crop failure. Sardar Patel helped at Kheda, but the movement was Gandhiji's.",
        },
        {
          title: "The war meant was the First, not the Second",
          body:
            "War loans, raised customs duties and a new income tax in the years before Non-Cooperation point to the First World War (1914 to 1918).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimino-khilafat",
      name: "Khilafat and the launch of Non-Cooperation",
      intuition:
        "Gandhiji saw a chance to bring Hindus and Muslims into one movement. Muslims were angry at how the Ottoman Khalifa was treated after the war, so he joined their Khilafat cause to a wider plan: refuse to cooperate with British rule.",
      definition:
        "- A **Khilafat Committee** was formed in **Bombay** in **March 1919**, led by the brothers **Muhammad Ali** and **Shaukat Ali**.\n" +
        "- At the **Calcutta** session of **September 1920** Gandhiji convinced the Congress to start Non-Cooperation in support of Khilafat and swaraj.\n" +
        "- At the **Nagpur** session of **December 1920** the Non-Cooperation programme was adopted.\n" +
        "- The movement asked people to give up titles and to boycott the civil services, the army, the police, the courts, the councils, schools and foreign goods.\n" +
        "- Council elections were boycotted in most provinces, but in **Madras** the **Justice Party**, a party of non-Brahmans, contested them as a way to gain power.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["Leaders of the Khilafat Movement", "The Ali brothers, **Muhammad Ali** and **Shaukat Ali**"] },
          { cells: ["Khilafat Committee formed", "**Bombay**, March 1919"] },
          { cells: ["Non-Cooperation proposed", "Calcutta session, September 1920"] },
          { cells: ["Non-Cooperation adopted", "**Nagpur** session, December 1920"] },
          { cells: ["Party that did not boycott the 1921 council elections", "The **Justice Party** of Madras"] },
        ],
      },
      selfCheckExample: {
        prompt: "At which Congress session of September 1920 did Gandhiji first win support for Non-Cooperation?",
        steps: ["The plan was put to a session in Calcutta in September 1920.", "It was adopted later, at Nagpur in December."],
        answer: "The Calcutta session",
      },
      practiceSet: [
        { prompt: "Which party of non-Brahmans in Madras contested the council elections during Non-Cooperation?", answer: "The Justice Party" },
        { prompt: "In which city was the Non-Cooperation programme adopted in December 1920?", answer: "Nagpur" },
        { prompt: "In which month and year was the Khilafat Committee formed?", answer: "March 1919" },
        { prompt: "Name two things the Non-Cooperation Movement asked people to boycott.", answer: "Any two of: government schools, courts, councils, foreign goods, the civil services, the army, the police" },
      ],
      pyqExampleId: "d955e4a8-cb19-4f63-8ec9-2836e01c0e64",
      traps: [
        {
          title: "Calcutta proposed, Nagpur adopted",
          body:
            "The Calcutta session of September 1920 agreed to start Non-Cooperation; the Nagpur session of December 1920 adopted the programme. An option saying Calcutta in January 1921 is wrong on both counts.",
        },
        {
          title: "The Justice Party took part",
          body:
            "Most of the country boycotted the council elections, but the Justice Party of Madras contested them. A statement that even the Justice Party boycotted them is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimino-spread",
      name: "How the movement spread and why it was called off",
      intuition:
        "Each group read swaraj in its own way. Townspeople left schools and courts, peasants fought landlords, tribals broke forest laws. " +
        "When a crowd turned violent at Chauri Chaura, Gandhiji stopped the whole movement.",
      definition:
        "- In the towns students left government schools, teachers resigned and lawyers gave up their practice; foreign cloth was boycotted and burnt.\n" +
        "- In **Awadh** the peasants were led by **Baba Ramchandra** against high rents and forced labour.\n" +
        "- In the **Gudem Hills** of Andhra Pradesh, tribals led by **Alluri Sitaram Raju** began a **militant guerrilla movement** in the early 1920s against forest laws.\n" +
        "- When tribals chanted Gandhiji's name and raised slogans for Swatantra Bharat, they were going beyond their own area and joining in feeling with an **all-India** movement.\n" +
        "- In **February 1922**, after a crowd set fire to the police station at **Chauri Chaura** and killed policemen, Gandhiji **withdrew** the movement: he felt it was turning violent and people needed more training for satyagraha.",
      table: {
        columns: ["Group", "What they did"],
        rows: [
          { cells: ["Students, teachers, lawyers", "Left government schools, resigned, gave up practice"] },
          { cells: ["Peasants of Awadh", "Led by **Baba Ramchandra** against landlords"] },
          { cells: ["Tribals of the Gudem Hills", "**Militant guerrilla** movement under **Alluri Sitaram Raju**"] },
          { cells: ["Crowd at Chauri Chaura", "Burnt a police station, February 1922"] },
          { cells: ["Gandhiji", "**Withdrew** the movement because it was turning violent"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who led the peasants of Awadh during the Non-Cooperation years?",
        steps: ["The Awadh peasants rose against landlords and high rents.", "Their leader was a sanyasi who had been an indentured labourer in Fiji."],
        answer: "Baba Ramchandra",
      },
      practiceSet: [
        { prompt: "Who led the tribals of the Gudem Hills of Andhra Pradesh in the early 1920s?", answer: "Alluri Sitaram Raju" },
        { prompt: "What kind of movement did the tribals of the Gudem Hills start?", answer: "A militant guerrilla movement" },
        { prompt: "At which place did a crowd burn a police station in February 1922?", answer: "Chauri Chaura" },
        { prompt: "When tribals chanted Gandhiji's name and called for Swatantra Bharat, what did it show?", answer: "They were identifying with an all-India movement beyond their own area" },
      ],
      pyqExampleId: "3ce60fd6-4fe7-408d-8c9b-a0f019b425ab",
      traps: [
        {
          title: "Raju's movement was not non-violent",
          body:
            "Alluri Sitaram Raju spoke of Gandhiji with respect, but his followers attacked police stations. The Gudem Hills rising was a militant guerrilla movement, not a satyagraha.",
        },
        {
          title: "Called off for violence, not for lack of support",
          body:
            "The movement was still strong in 1922. Gandhiji withdrew it because it was turning violent. The wish to contest council elections came after the withdrawal and led to the Swaraj Party.",
        },
      ],
    },
  ],
};
