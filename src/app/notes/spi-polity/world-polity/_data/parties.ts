import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_WP_PARTIES_NOTE: SubtopicNote = {
  subtopicName: "Forms of Government and Political Parties",
  title: "Forms of Government and Political Parties",
  oneLineDefinition:
    "The State and the ways it can be governed, the one-party, two-party and multi-party systems, and what a political party is made of, what it does and where it falls short, with India's main parties.",
  whyItMatters:
    "Eleven questions in the bank, all from the LWS mock tests: four EASY, six MODERATE and one HARD. Most of them come straight from the NCERT Class 10 chapter Political Parties, often as a \"which is NOT\" question, so you need the whole list of functions, components and weaknesses, not one item from it. The rest ask the name of a form of government or the party system of a country.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiwpgp-forms",
      name: "The State and forms of government",
      intuition:
        "The State is the whole political unit: its people, its land, its government and its freedom to decide for itself. The government is only the machinery that runs the State. " +
        "Forms of government differ in one question: who holds the power?",
      definition:
        "- The four elements of the **State**: **population**, **territory**, **government** and **sovereignty**.\n" +
        "- The **government** is the machinery through which the State is organised and its decisions carried out.\n" +
        "- **Democracy**: the people choose their rulers in elections. **Monarchy**: a king or queen rules, usually by birth. **Oligarchy**: power rests with a **small group**. **Dictatorship**: one person holds all power without being elected.\n" +
        "- **Federal** and **unitary** describe how power is shared: in a federal system between the centre and the states, in a unitary system it stays with one central government.\n" +
        "- **Parliamentary** and **presidential** describe the executive: in a parliamentary system (India, the United Kingdom) it answers to the legislature; in a presidential system (the United States) the President is elected separately.",
      table: {
        columns: ["Form", "Who holds power"],
        rows: [
          { cells: ["Democracy", "The **people**, through elected representatives"] },
          { cells: ["Monarchy", "A king or queen, usually by birth"] },
          { cells: ["Oligarchy", "A **small group** of people"] },
          { cells: ["Dictatorship", "One person, not elected"] },
          { cells: ["Federal", "Shared between the centre and the states"] },
          { cells: ["Unitary", "One central government"] },
        ],
        caption: "The State has four elements: population, territory, government and sovereignty.",
      },
      selfCheckExample: {
        prompt: "Name the four elements of a State.",
        steps: ["A State needs people and land.", "It also needs a government to run it and the freedom to decide for itself."],
        answer: "Population, territory, government and sovereignty",
      },
      practiceSet: [
        { prompt: "What is the rule of a small group of people called?", answer: "Oligarchy" },
        { prompt: "In which system is power shared between the centre and the states?", answer: "A federal system" },
        { prompt: "What does the government organise and run?", answer: "The State" },
        { prompt: "Name a country with a presidential system.", answer: "The United States" },
        { prompt: "What is rule by one person who holds all power without being elected called?", answer: "Dictatorship" },
      ],
      pyqExampleId: "ebf4b28e-86f5-4795-ba7b-805ac4fcf13f",
      traps: [
        {
          title: "Federal is not a form of rule by the people",
          body:
            "Federal and unitary say how power is divided between levels of government. Parliamentary says how the executive relates to the legislature. Only democracy says the people choose their leaders.",
        },
        {
          title: "Government and State are not the same",
          body:
            "The government is one of the four elements of the State. A government can change at an election; the State goes on.",
        },
        {
          title: "A few is oligarchy, one is dictatorship",
          body:
            "Power with a small group of people is an oligarchy. Power with one person who was not elected is a dictatorship, and power with a king or queen is a monarchy.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwpgp-systems",
      name: "One-party, two-party and multi-party systems",
      intuition:
        "Count the parties that can really win power. If only one is allowed to run the government, it is a one-party system. If power usually moves between two big parties, it is a two-party system. If many parties compete and often share power, it is multi-party.",
      definition:
        "- **One-party system**: one single party controls and runs the government. Example: **China** (the Communist Party).\n" +
        "- **Two-party system**: power usually changes between two main parties. Examples: the **United States** (the Democratic and the Republican Party) and the **United Kingdom** (mainly the Conservative and the Labour Party).\n" +
        "- **Multi-party system**: several parties compete and can come to power alone or in a coalition. Example: **India**.\n" +
        "- When several parties join to fight elections and form a government together, the group is an **alliance** or a **front**.\n" +
        "- Parties abroad are asked by founder too: **Forza Italia**, an Italian party, was founded in **1993** by **Silvio Berlusconi**.",
      table: {
        columns: ["System", "Meaning", "Example"],
        rows: [
          { cells: ["One-party", "One single party runs the government", "China"] },
          { cells: ["Two-party", "Power moves between two main parties", "**United States**, United Kingdom"] },
          { cells: ["Multi-party", "Many parties; coalitions are common", "India"] },
        ],
      },
      selfCheckExample: {
        prompt: "India has many parties that compete and often form governments together. What is this kind of party system called?",
        steps: ["More than two parties can win power.", "Coalitions of parties are common."],
        answer: "A multi-party system",
      },
      practiceSet: [
        { prompt: "What is a one-party system?", answer: "A system in which one single party controls and runs the government" },
        { prompt: "Name the two main parties of the United States.", answer: "The Democratic Party and the Republican Party" },
        { prompt: "Which country is the standard example of a one-party system?", answer: "China" },
        { prompt: "Who founded the Italian party Forza Italia in 1993?", answer: "Silvio Berlusconi" },
        { prompt: "What is a group of parties that fight elections together called?", answer: "An alliance or a front" },
      ],
      pyqExampleId: "224490b3-7a4b-466b-91fb-8aedf79c6fcc",
      traps: [
        {
          title: "India is multi-party",
          body:
            "India has many parties and coalition governments are common, so it is a multi-party system. The two-party example is the United States.",
        },
        {
          title: "One party, not one person",
          body:
            "A one-party system means one party runs the government. One person ruling is a dictatorship, and a king ruling is a monarchy.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwpgp-parties",
      name: "What a party is made of, what it does, and where it falls short",
      intuition:
        "A political party is a group of people who come together to contest elections and hold power. The NCERT chapter lists its parts, its jobs and its weaknesses, and the bank asks which item does not belong to a list.",
      definition:
        "- A party has three **components**: the **leaders**, the **active members** and the **followers**.\n" +
        "- Its **functions**: contest elections and choose candidates; put forward policies by grouping similar opinions; make laws; form and run governments; play the opposition; **shape public opinion**; give people access to government machinery and welfare schemes.\n" +
        "- Signs of a **lack of internal democracy**: power with one or a few leaders at the top; no membership registers; no organisational meetings; no regular internal elections.\n" +
        "- Other challenges: **dynastic succession**, the growing role of **money and muscle power**, and a **lack of meaningful choice** between parties.",
      table: {
        columns: ["List", "Items"],
        rows: [
          { cells: ["Components", "Leaders, active members, followers"] },
          { cells: ["Functions", "Contest elections, offer policies, make laws, run governments, act as opposition, shape **public** opinion, give access to welfare schemes"] },
          { cells: ["Lack of internal democracy", "Power at the top, **no membership registers**, no meetings, no regular internal elections"] },
          { cells: ["Other challenges", "Dynastic succession, money and muscle power, lack of meaningful choice"] },
        ],
      },
      selfCheckExample: {
        prompt: "A party's top posts pass from parents to their children. Which challenge to political parties does this show?",
        steps: ["Leadership stays within one family.", "The NCERT chapter calls this dynastic succession."],
        answer: "Dynastic succession",
      },
      practiceSet: [
        { prompt: "Name one function of a political party in a democracy.", answer: "Any one of: contest elections, put forward policies, make laws, form and run governments, act as opposition, shape public opinion, give access to welfare schemes" },
        { prompt: "Do political parties shape public opinion or private opinion?", answer: "Public opinion" },
        { prompt: "Is keeping membership registers a sign of a lack of internal democracy?", answer: "No. Not keeping them is the sign" },
        { prompt: "Name one sign of a lack of internal democracy in a party.", answer: "Any one of: power with a few leaders at the top, no membership registers, no organisational meetings, no regular internal elections" },
        { prompt: "Name two challenges to political parties besides internal democracy.", answer: "Any two of: dynastic succession, money and muscle power, lack of meaningful choice" },
      ],
      pyqExampleId: "2828d5e9-0ea3-4390-b584-5dac127a832f",
      traps: [
        {
          title: "Public opinion, not private",
          body:
            "Parties raise issues and run campaigns to shape public opinion. An option saying they shape private opinion is the one that is not a function.",
        },
        {
          title: "Registers are a good sign",
          body:
            "Parties that do not keep membership registers lack internal democracy. Keeping them is what a healthy party does, so it is the odd one out in that list.",
        },
        {
          title: "Citizens are not a component",
          body:
            "The three components are the leaders, the active members and the followers. Citizens in general are not a part of any party.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwpgp-india",
      name: "India's main national parties",
      intuition:
        "Each national party in the NCERT chapter is asked by its founding year, its founder or one idea it stands for. Learn one line for each.",
      definition:
        "- **Indian National Congress (INC)**: founded in **1885**; the oldest party.\n" +
        "- **Bharatiya Janata Party (BJP)**: founded in **1980**. **Cultural nationalism** (Hindutva) is an important element in its idea of Indian nationhood and politics.\n" +
        "- **Communist Party of India (Marxist), CPI(M)**: founded in **1964**.\n" +
        "- **Bahujan Samaj Party (BSP)**: founded in **1984** under **Kanshi Ram**.\n" +
        "- **Nationalist Congress Party (NCP)**: formed in **1999** after a split in the Congress; NCERT describes it as a member of the United Progressive Alliance (UPA) since 2004.\n" +
        "- The **Election Commission** recognises parties and gives each a symbol.",
      table: {
        columns: ["Party", "Founded", "One line"],
        rows: [
          { cells: ["Indian National Congress", "1885", "The oldest party"] },
          { cells: ["Bharatiya Janata Party", "1980", "**Cultural nationalism** in its idea of the nation"] },
          { cells: ["CPI(M)", "1964", "A communist party"] },
          { cells: ["Bahujan Samaj Party", "1984", "Founded under Kanshi Ram"] },
          { cells: ["Nationalist Congress Party", "1999", "Formed after a split in the Congress; in the UPA from 2004"] },
        ],
      },
      selfCheckExample: {
        prompt: "Under whose leadership was the Bahujan Samaj Party formed in 1984?",
        steps: ["The BSP was formed to represent the bahujan samaj, the Dalits and other weaker sections.", "Its founder was Kanshi Ram."],
        answer: "Kanshi Ram",
      },
      practiceSet: [
        { prompt: "In which year was the Indian National Congress founded?", answer: "1885" },
        { prompt: "In which year was the Bharatiya Janata Party founded?", answer: "1980" },
        { prompt: "Which party was formed in 1999 after a split in the Congress?", answer: "The Nationalist Congress Party" },
        { prompt: "Which body recognises political parties and gives them symbols?", answer: "The Election Commission" },
      ],
      pyqExampleId: "04463ddf-d49f-4816-b4ba-b03c1e98eb73",
      traps: [
        {
          title: "Nationalism, not secularism",
          body:
            "The NCERT line on the BJP names cultural nationalism as the important element in its idea of the nation. Options built from the word secularism are the distractors.",
        },
        {
          title: "Led by the Congress, joined by the NCP",
          body:
            "The Congress led the United Progressive Alliance from 2004, and the NCP was a member of it. The BJP leads a different alliance, the National Democratic Alliance (NDA).",
        },
      ],
    },
  ],
};
