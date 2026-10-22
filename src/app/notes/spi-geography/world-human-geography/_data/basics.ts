import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_WG_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Resources, Industry and World Places",
  title: "Resources, Industry and World Places",
  oneLineDefinition:
    "The kinds of resources, what decides where a factory is built, the four ways we carry people and goods, and a few countries and peaks that come up by name.",
  whyItMatters:
    "Six questions in the bank, five EASY and one MODERATE, and each is a single fact: a word for a kind of resource, the odd one out among the factors of industry, the right mode of transport, a country's nickname or the country a peak stands in.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiwgba-resources",
      name: "Kinds of resources",
      intuition:
        "Anything that has a use for us is a resource. Geography sorts resources in a few different ways at once: by who made them, by whether they run out, and by where they are found. One resource can carry several labels, so read which way the question is sorting.",
      definition:
        "- **Natural** resources come from nature (air, water, soil, minerals). **Human made** resources are built by people (buildings, roads, machines, and technology too).\n" +
        "- **Renewable** resources are replaced quickly (sunlight, wind, forests). **Non renewable** ones run out once used (coal, petroleum, natural gas).\n" +
        "- **Ubiquitous** resources are found everywhere (air). **Localised** resources are found only in some places (copper, iron ore).\n" +
        "- **Actual** resources have been surveyed and are being used. **Potential** resources exist but are not used yet, such as the uranium found in Ladakh.\n" +
        "- **Human resources** are people. People are called the greatest resource because their knowledge, skill and technology turn the materials of nature into useful things.",
      table: {
        columns: ["Way of sorting", "Kind", "Example"],
        rows: [
          { cells: ["Who made it", "Natural", "Water, soil, minerals"] },
          { cells: ["Who made it", "Human made", "Bridges, machines, technology"] },
          { cells: ["Does it run out", "Renewable", "Sunlight, wind, forests"] },
          { cells: ["Does it run out", "Non renewable", "Coal, petroleum, natural gas"] },
          { cells: ["Where it is found", "Ubiquitous", "Air"] },
          { cells: ["Where it is found", "Localised", "Copper, iron ore"] },
          { cells: ["How far it is developed", "Actual", "Coal being mined today"] },
          { cells: ["How far it is developed", "Potential", "Uranium in Ladakh"] },
        ],
        caption: "Renewable and localised answer different questions: one is about running out, the other about where.",
      },
      selfCheckExample: {
        prompt: "What name is given to resources that are found only in certain places, such as copper and iron ore?",
        steps: [
          "The question sorts by where the resource is found.",
          "Found everywhere is ubiquitous; found only in some places is localised.",
        ],
        answer: "Localised resources.",
      },
      practiceSet: [
        { prompt: "Is petroleum a renewable or a non renewable resource?", answer: "Non renewable" },
        { prompt: "What is a resource called that exists but is not yet used, like the uranium in Ladakh?", answer: "A potential resource" },
        { prompt: "Is technology a natural or a human made resource?", answer: "Human made" },
        { prompt: "Why are people called the greatest resource?", answer: "Their knowledge, skill and technology turn natural materials into useful things." },
      ],
      pyqExampleId: "5a04e846-7cb7-44f4-ab31-60fafef4db6f",
      traps: [
        {
          title: "Answering renewable when the question asks where",
          body:
            "Air is renewable, but a question about resources found everywhere is sorting by place, and the word it wants is ubiquitous.",
        },
        {
          title: "Thinking numbers make people a resource",
          body:
            "People are not a resource because there are many of them or because they live everywhere. They are a resource because of their knowledge, skill and technology.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwgba-industry",
      name: "Where industries are set up and how goods move",
      intuition:
        "A factory is built where it can get what it needs and sell what it makes. Once made, goods and people travel by road, rail, water or air, and each mode suits a different job.",
      definition:
        "- The factors that decide where an industry is set up are **raw material, land, water, labour, power, capital, transport and market**.\n" +
        "- Weather such as rainfall is not one of these factors.\n" +
        "- The four modes of transport are **roads, railways, waterways and airways**.\n" +
        "- **Airways** are the fastest and the most costly, and they reach far countries and remote places quickly.\n" +
        "- **Waterways** are the cheapest way to carry heavy and bulky goods over long distances.",
      table: {
        columns: ["Mode of transport", "Best for"],
        rows: [
          { cells: ["Roads", "Short distances, door to door"] },
          { cells: ["Railways", "Heavy goods and many passengers over long distances on land"] },
          { cells: ["Waterways", "The cheapest way to carry heavy, bulky goods"] },
          { cells: ["Airways", "The fastest way, across oceans and to other countries"] },
        ],
        caption: "The eight factors of industrial location: raw material, land, water, labour, power, capital, transport, market.",
      },
      selfCheckExample: {
        prompt: "Which mode of transport is the cheapest for carrying heavy and bulky goods over long distances?",
        steps: [
          "Air is fastest but costly; roads suit short trips.",
          "Ships and boats carry the most weight for the least cost.",
        ],
        answer: "Waterways.",
      },
      practiceSet: [
        { prompt: "Which mode of transport is the fastest?", answer: "Airways" },
        { prompt: "Is the market a factor in deciding where an industry is set up?", answer: "Yes. Goods must reach the people who buy them." },
        { prompt: "Name the four modes of transport.", answer: "Roads, railways, waterways and airways" },
        { prompt: "Is capital a factor of industrial location?", answer: "Yes, money is needed to build and run the factory." },
      ],
      pyqExampleId: "03e41d9c-a013-42c9-9632-b48f42464368",
      traps: [
        {
          title: "Calling the cheapest mode the fastest",
          body: "Airways are the fastest but the most costly. Waterways are the cheapest for heavy goods but slow.",
        },
        {
          title: "Counting weather as a factor of location",
          body:
            "Rainfall is not one of the eight factors of industrial location. Water is a factor, because many industries use a lot of it, but the factor is a supply of water, not the weather.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwgba-nicknames",
      name: "Countries known by a nickname",
      intuition:
        "Some countries are known by a phrase that describes them: where the sun rises, a sun that never sets in summer, a land of many lakes. Each nickname comes from something true about the place.",
      definition:
        "- **Japan** is the Land of the Rising Sun: it lies at the far east of Asia, where the day begins.\n" +
        "- **Norway** is the Land of the Midnight Sun: in its far north the sun does not set for weeks in summer.\n" +
        "- **Finland** is the Land of a Thousand Lakes.\n" +
        "- **Bhutan** is the Land of the Thunder Dragon.",
      table: {
        columns: ["Nickname", "Country"],
        rows: [
          { cells: ["Land of the Rising Sun", "Japan"] },
          { cells: ["Land of the Midnight Sun", "Norway"] },
          { cells: ["Land of a Thousand Lakes", "Finland"] },
          { cells: ["Land of the Thunder Dragon", "Bhutan"] },
          { cells: ["Land of the Morning Calm", "Korea"] },
          { cells: ["Land of White Elephants", "Thailand"] },
          { cells: ["Pearl of the Indian Ocean", "Sri Lanka"] },
          { cells: ["Gift of the Nile", "Egypt"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which country is called the Land of the Midnight Sun?",
        steps: [
          "Midnight sun means the sun stays up all night in summer.",
          "That happens in the far north of Europe, in Norway.",
        ],
        answer: "Norway.",
      },
      practiceSet: [
        { prompt: "Which country is called the Land of the Thunder Dragon?", answer: "Bhutan" },
        { prompt: "Which country is known as the Land of a Thousand Lakes?", answer: "Finland" },
        { prompt: "Which country is called the Pearl of the Indian Ocean?", answer: "Sri Lanka" },
        { prompt: "Which country is called the Gift of the Nile?", answer: "Egypt" },
      ],
      pyqExampleId: "913df671-9540-4d61-a28f-4d506641bbeb",
      traps: [
        {
          title: "Mixing up Rising Sun and Midnight Sun",
          body: "The Rising Sun is Japan, in the far east. The Midnight Sun is Norway, in the far north, where summer nights stay light.",
        },
        {
          title: "Mixing up Morning Calm and Rising Sun",
          body: "Both nicknames are about the start of the day in East Asia, but the Land of the Morning Calm is Korea, not Japan.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiwgba-peaks",
      name: "Famous peaks and the countries they stand in",
      intuition:
        "Most of the world's highest peaks are in the Himalayas, and many of them are in Nepal. A few famous peaks of other continents are worth knowing too.",
      definition:
        "- **Mount Everest**, the highest peak in the world, is in **Nepal** on its border with China (Tibet).\n" +
        "- **Annapurna** and **Dhaulagiri** are in **Nepal**.\n" +
        "- **Kangchenjunga** stands on the border of **India (Sikkim)** and **Nepal**.\n" +
        "- **Nanda Devi** is in **Uttarakhand**, India.\n" +
        "- **Kilimanjaro**, the highest peak in Africa, is in **Tanzania**.",
      table: {
        columns: ["Peak", "Country", "Range"],
        rows: [
          { cells: ["Mount Everest", "Nepal (border with China)", "Himalayas"] },
          { cells: ["Annapurna", "Nepal", "Himalayas"] },
          { cells: ["Dhaulagiri", "Nepal", "Himalayas"] },
          { cells: ["Kangchenjunga", "India (Sikkim) and Nepal", "Himalayas"] },
          { cells: ["Nanda Devi", "India (Uttarakhand)", "Himalayas"] },
          { cells: ["Kilimanjaro", "Tanzania", "Highest peak of Africa"] },
        ],
      },
      selfCheckExample: {
        prompt: "Mount Everest stands on the border between Nepal and which other country?",
        steps: ["Everest is on the crest of the Himalayas, with Nepal to the south.", "To the north is Tibet, part of China."],
        answer: "China.",
      },
      practiceSet: [
        { prompt: "In which Indian state is Nanda Devi?", answer: "Uttarakhand" },
        { prompt: "Kangchenjunga stands on the border of India and which country?", answer: "Nepal" },
        { prompt: "In which country is Mount Kilimanjaro?", answer: "Tanzania" },
        { prompt: "In which country is Dhaulagiri?", answer: "Nepal" },
      ],
      pyqExampleId: "18e91f5a-1b98-41d0-b1dd-310a907cf9b8",
      traps: [
        {
          title: "Placing every Himalayan peak in India",
          body: "The Himalayas run through several countries. Everest, Annapurna and Dhaulagiri are in Nepal; Nanda Devi is in India.",
        },
      ],
    },
  ],
};
