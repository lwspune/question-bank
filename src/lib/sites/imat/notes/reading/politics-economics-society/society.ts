import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_PES_SOCIETY_NOTE: SubtopicNote = {
  subtopicName: "Society and the Modern World",
  title: "Society, Rights, Media and the Modern Economy",
  oneLineDefinition:
    "Names for new kinds of economy, the vocabulary of social science and research, landmarks in voting rights and women's leadership, the media and tech companies, and which islands belong to which country.",
  whyItMatters:
    "The 2026 ministry paper asked for the name of an economy built on digital technology, and the Cambridge papers asked about the sharing economy, a placebo, women prime ministers, a speech at the UN, national newspapers, the founder of a social network and island groups.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-pes-economy-types",
      name: "Types of economy and modern economic terms",
      intuition:
        "Economists name an economy after whatever organises it: prices (a market economy), the state (a planned economy), or, more recently, digital platforms, shared assets or recycling. Each new label describes a real change in how goods and work are organised. Learn the label with its defining feature.",
      definition:
        "- **Market economy**: prices and production set by supply and demand. **Planned (command) economy**: set by the state. **Mixed economy**: markets plus a large public sector.\n" +
        "- **Welfare state**: the state provides health care, pensions and unemployment support (the UK's Beveridge Report, 1942, is a founding text).\n" +
        "- **Digital economy**: economic activity in which digital technologies, the internet and ICT are central to producing, distributing and exchanging goods and services.\n" +
        "- **Sustainable development**: meeting present needs without compromising future generations (Brundtland Report, 1987).",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Mixed economy", "Private markets alongside a large public sector", "Italy and most of Europe"] },
          { cells: ["Planned (command) economy", "The state decides what is produced and at what price", "The Soviet Union"] },
          { cells: ["Digital economy", "Production and exchange built on digital technology, the internet and ICT", "Online shops, app stores, streaming"] },
          { cells: ["Sharing economy", "People share access to under-used goods and services through platforms; access is preferred to ownership", "Car sharing, home sharing"] },
          { cells: ["Gig economy", "Short-term, task-by-task work arranged through apps", "Food-delivery riders, ride-hailing drivers"] },
          { cells: ["Circular economy", "Products and materials kept in use by repair, reuse and recycling, so waste becomes a resource", "Opposite of the linear take, make, dispose model"] },
          { cells: ["Globalisation", "Growing integration of world trade, finance, people and culture", "Global supply chains"] },
          { cells: ["Sustainable development", "Growth that does not harm future generations", "UN 2030 Agenda: 17 Sustainable Development Goals (2015)"] },
        ],
      },
      selfCheckExample: {
        prompt: "An economy that keeps products and materials in use through repair, reuse and recycling, so that waste becomes a resource, is called",
        options: ["the gig economy", "the sharing economy", "the circular economy", "the digital economy", "the planned economy"],
        steps: [
          "Keeping materials in a loop of reuse and recycling, instead of take, make, dispose, defines the circular economy.",
          "The gig economy is about short-term app work, the sharing economy about shared access, the digital economy about ICT, and a planned economy about state control.",
        ],
        answer: "(C) the circular economy",
      },
      practiceSet: [
        { prompt: "In which year did the UN adopt the 17 Sustainable Development Goals?", answer: "2015" },
        { prompt: "What kind of economy did the Soviet Union have?", answer: "A planned (command) economy" },
        { prompt: "What does ICT stand for?", answer: "Information and Communication Technologies" },
      ],
      traps: [
        {
          title: "Sharing economy is not charity, and it is not anti-market",
          body: "In the sharing economy, people pay to use something they do not own, usually through a commercial platform that rates users so strangers can trust each other. It is a market model in which platforms compete with each other and with traditional firms, not a rejection of competition.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-social-terms",
      name: "Social science and research vocabulary",
      intuition:
        "Society is studied with the same tools as medicine: counts, samples and controlled comparisons. Many words a medical student meets first in a clinical trial (placebo, double-blind, sample) come from this shared vocabulary, alongside the demographic terms used to describe a population.",
      definition:
        "- **Demography** is the study of populations: births, deaths, migration and age structure.\n" +
        "- The **replacement fertility rate** is about **2.1 children per woman**; below it, a population shrinks without immigration. Italy is well below it and has one of the oldest populations in the world.\n" +
        "- A **placebo** is an inactive treatment, such as a sugar pill, given to a control group. Any improvement it produces is the **placebo effect**.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Census", "An official count of a whole population (in Italy, run by ISTAT)"] },
          { cells: ["Sample", "A part of a population studied to draw conclusions about the whole"] },
          { cells: ["Birth rate", "Births per 1,000 people per year"] },
          { cells: ["Fertility rate", "Average number of children per woman"] },
          { cells: ["Ageing population", "A rising share of older people in the population"] },
          { cells: ["Urbanisation", "The movement of people from the countryside to cities"] },
          { cells: ["Placebo", "An inactive substance or treatment given for comparison"] },
          { cells: ["Double-blind trial", "Neither the patients nor the researchers know who receives the real treatment"] },
          { cells: ["Social mobility", "Movement of people between social classes or income levels"] },
          { cells: ["Meritocracy", "A system in which positions are earned by ability and effort"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is a double-blind clinical trial?",
        options: [
          "A trial in which every patient receives the same drug",
          "A trial in which the patients know their treatment but the doctors do not",
          "A trial in which each patient receives the drug twice",
          "A trial carried out at the same time in two countries",
          "A trial in which neither the patients nor the researchers know who receives the real treatment",
        ],
        steps: [
          "\"Double\" refers to the two groups kept unaware: the patients and the researchers who assess them. This stops expectations from biasing the results.",
          "Hiding the treatment from only one side is a single-blind trial; the other options describe nothing to do with blinding.",
        ],
        answer: "(E) A trial in which neither the patients nor the researchers know who receives the real treatment",
      },
      practiceSet: [
        { prompt: "About what fertility rate keeps a population stable without migration?", answer: "About 2.1 children per woman" },
        { prompt: "Which Italian body runs the national census?", answer: "ISTAT" },
        { prompt: "What is the study of births, deaths and migration in a population called?", answer: "Demography" },
      ],
      traps: [
        {
          title: "A placebo has no active ingredient",
          body: "A placebo is not a mild painkiller, sedative or stimulant. It is deliberately inactive; any benefit comes from the patient's expectations. That is why trials compare a new drug against a placebo.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-rights-milestones",
      name: "Milestones in voting rights and women in leadership",
      intuition:
        "The vote was extended step by step: first to wealthy men, then all men, then women, often decades apart even in neighbouring countries. Women reached the top of government later still. Learn the first country, Italy's date, and the most famous first women prime ministers.",
      definition:
        "- **Universal suffrage**: every adult citizen can vote, whatever their sex, wealth or education.\n" +
        "- Italian women first voted nationally on **2 June 1946**.\n" +
        "- The world's first woman prime minister was **Sirimavo Bandaranaike** of Sri Lanka (then Ceylon), in **1960**.\n" +
        "- **Malala Yousafzai** spoke at the UN for girls' education on her 16th birthday, 12 July 2013, and won the Nobel Peace Prize in 2014.",
      table: {
        columns: ["Date", "Milestone", "Country or person"],
        rows: [
          { cells: ["1893", "First country where women vote in national elections", "New Zealand"] },
          { cells: ["1906", "First European country to give women the vote and the right to stand", "Finland"] },
          { cells: ["1918 and 1928", "Women's vote, then on equal terms with men", "United Kingdom"] },
          { cells: ["1946", "Women vote in a national election", "Italy"] },
          { cells: ["1971", "Women's vote at federal level", "Switzerland"] },
          { cells: ["1960", "World's first woman prime minister", "Sirimavo Bandaranaike, Sri Lanka"] },
          { cells: ["1966, 1969, 1979", "Women prime ministers", "Indira Gandhi (India), Golda Meir (Israel), Margaret Thatcher (United Kingdom)"] },
          { cells: ["1988", "First woman to lead a Muslim-majority country", "Benazir Bhutto, Pakistan"] },
          { cells: ["1964", "Civil Rights Act ends legal segregation", "USA, after the movement led by Martin Luther King"] },
          { cells: ["1994", "First free elections, end of apartheid", "South Africa; Nelson Mandela president"] },
          { cells: ["2021 and 2022", "First women prime ministers", "Magdalena Andersson (Sweden); Giorgia Meloni (Italy)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which was the first country in the world to give women the vote in national elections?",
        options: ["The United Kingdom", "The United States", "Finland", "New Zealand", "Switzerland"],
        steps: [
          "New Zealand gave women the vote in 1893.",
          "Finland (1906) was the first in Europe; the UK began in 1918 and the USA in 1920; Switzerland waited until 1971 at federal level.",
        ],
        answer: "(D) New Zealand",
      },
      practiceSet: [
        { prompt: "Who was the world's first woman prime minister?", answer: "Sirimavo Bandaranaike (Sri Lanka, 1960)" },
        { prompt: "In which year did Swiss women gain the vote at federal level?", answer: "1971" },
        { prompt: "Who was the first woman prime minister of the United Kingdom?", answer: "Margaret Thatcher (1979)" },
      ],
      traps: [
        {
          title: "Progressive does not mean early",
          body: "Countries known for equality were not always first. Sweden had no woman prime minister until 2021 and Switzerland no federal women's vote until 1971, while India (1966), Israel (1969) and Pakistan (1988) had women prime ministers much earlier.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-media-tech",
      name: "Newspapers and technology companies",
      intuition:
        "Each major country has one or two national newspapers whose names are general knowledge, and a few internet companies changed daily life so much that their founders are household names. Learn the paper with its country and the company with its founder and year.",
      definition:
        "- The two best-known **Italian** dailies are the **Corriere della Sera** (Milan, 1876) and **La Repubblica** (Rome, 1976).\n" +
        "- **De Telegraaf** is Dutch (Amsterdam), not Danish; Denmark's best-known dailies include Politiken and Berlingske.\n" +
        "- Most famous tech companies were founded in the **USA** between **1975 and 2006**.",
      table: {
        columns: ["Name", "Country or type", "Fact to remember"],
        rows: [
          { cells: ["Corriere della Sera; La Repubblica", "Italy", "Milan, 1876; Rome, 1976"] },
          { cells: ["Le Monde; Le Figaro", "France", "Paris dailies"] },
          { cells: ["The Times; The Guardian", "United Kingdom", "London dailies"] },
          { cells: ["El País", "Spain", "Madrid, 1976"] },
          { cells: ["Frankfurter Allgemeine Zeitung; Süddeutsche Zeitung", "Germany", "Frankfurt; Munich"] },
          { cells: ["De Telegraaf", "Netherlands", "Amsterdam"] },
          { cells: ["The New York Times; The Washington Post", "USA", "Washington Post broke the Watergate story (1972)"] },
          { cells: ["Microsoft", "Tech company, 1975", "Bill Gates and Paul Allen"] },
          { cells: ["Apple", "Tech company, 1976", "Steve Jobs and Steve Wozniak"] },
          { cells: ["Amazon", "Tech company, 1994", "Jeff Bezos"] },
          { cells: ["Google", "Tech company, 1998", "Larry Page and Sergey Brin"] },
          { cells: ["Wikipedia", "Online encyclopedia, 2001", "Jimmy Wales and Larry Sanger"] },
          { cells: ["Facebook (now Meta)", "Social network, 2004", "Mark Zuckerberg"] },
          { cells: ["YouTube", "Video platform, 2005", "Chad Hurley, Steve Chen and Jawed Karim; bought by Google in 2006"] },
          { cells: ["Twitter (now X)", "Social network, 2006", "Jack Dorsey and others"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who founded Microsoft in 1975?",
        options: [
          "Steve Jobs and Steve Wozniak",
          "Bill Gates and Paul Allen",
          "Larry Page and Sergey Brin",
          "Jeff Bezos",
          "Jimmy Wales and Larry Sanger",
        ],
        steps: [
          "Microsoft was founded by Bill Gates and Paul Allen in 1975.",
          "Jobs and Wozniak founded Apple (1976), Page and Brin Google (1998), Bezos Amazon (1994), Wales and Sanger Wikipedia (2001).",
        ],
        answer: "(B) Bill Gates and Paul Allen",
      },
      practiceSet: [
        { prompt: "In which city is the Corriere della Sera based?", answer: "Milan" },
        { prompt: "In which year was Google founded?", answer: "1998" },
        { prompt: "Which country does Le Monde come from?", answer: "France" },
      ],
      traps: [
        {
          title: "Netherlands and Denmark are different countries",
          body: "Students mix up the two small North Sea monarchies. De Telegraaf is published in Amsterdam, the Netherlands. Danish papers have Danish names such as Politiken.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-pes-territories",
      name: "Island groups and the countries they belong to",
      intuition:
        "Many island groups lie far from the country that governs them, a legacy of exploration and empire. Some, like Cape Verde, have since become independent. Learn the islands with their country and one fact.",
      definition:
        "- **Autonomous regions** of Portugal: the **Azores** and **Madeira**; of Spain: the **Canary** and **Balearic Islands**.\n" +
        "- **Denmark** includes two self-governing territories: **Greenland** (the largest island in the world) and the **Faroe Islands**.\n" +
        "- **Cape Verde**, a former Portuguese colony, has been independent since **1975**.",
      table: {
        columns: ["Islands", "Country", "Fact to remember"],
        rows: [
          { cells: ["Azores and Madeira", "Portugal", "Autonomous regions in the Atlantic"] },
          { cells: ["Canary Islands", "Spain", "Atlantic, off the coast of Morocco"] },
          { cells: ["Balearic Islands", "Spain", "Mallorca, Menorca, Ibiza, in the Mediterranean"] },
          { cells: ["Corsica", "France", "Birthplace of Napoleon"] },
          { cells: ["Sicily and Sardinia", "Italy", "Regions with a special statute"] },
          { cells: ["Greenland and the Faroe Islands", "Denmark", "Self-governing territories"] },
          { cells: ["Svalbard", "Norway", "Arctic archipelago"] },
          { cells: ["Falkland Islands", "United Kingdom", "Claimed by Argentina (Malvinas); war of 1982"] },
          { cells: ["Galápagos Islands", "Ecuador", "Visited by Darwin in 1835"] },
          { cells: ["Hawaii", "USA", "Became the 50th state in 1959"] },
          { cells: ["Cape Verde", "Independent republic since 1975", "Former Portuguese colony off West Africa"] },
        ],
      },
      selfCheckExample: {
        prompt: "The Faroe Islands are a self-governing territory of which country?",
        options: ["Denmark", "Norway", "The United Kingdom", "Iceland", "Sweden"],
        steps: [
          "The Faroe Islands, like Greenland, belong to the Kingdom of Denmark but govern most of their own affairs.",
          "Norway's Arctic islands are Svalbard; the UK's include the Falklands; Iceland and Sweden have no such territory.",
        ],
        answer: "(A) Denmark",
      },
      practiceSet: [
        { prompt: "To which country do the Galápagos Islands belong?", answer: "Ecuador" },
        { prompt: "Which country governs the Balearic Islands?", answer: "Spain" },
        { prompt: "From which country did Cape Verde become independent in 1975?", answer: "Portugal" },
      ],
      traps: [
        {
          title: "Portuguese-speaking does not mean Brazilian",
          body: "Cape Verde, off West Africa, speaks Portuguese because it was a Portuguese colony, not because of Brazil. It has been an independent country since 1975. The Portuguese islands today are the Azores and Madeira.",
        },
      ],
    },
  ],
};
