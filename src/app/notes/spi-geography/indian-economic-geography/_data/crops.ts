import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_IG_CROPS_NOTE: SubtopicNote = {
  subtopicName: "Crops and Farming",
  title: "Crops and Farming",
  oneLineDefinition:
    "India grows its crops in three seasons; each main crop needs its own heat, rain and soil; and farming also includes plantations and the rearing of silkworms, bees and fish.",
  whyItMatters:
    "Six questions in the bank, four EASY and two MODERATE: the season sown from October to December, the staple food of most Indians, the golden fibre, the conditions cotton needs, what helps plantations grow and what sericulture means.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiigcr-seasons",
      name: "The three cropping seasons",
      intuition:
        "Indian farming follows the monsoon. Some crops are sown when the rains come, some after the rains in the cool winter, and a few in the short dry summer between the two.",
      definition:
        "- **Kharif** crops are sown with the onset of the monsoon and harvested in September and October: paddy, maize, jowar, bajra, tur, moong, urad, cotton, jute, groundnut, soyabean.\n" +
        "- **Rabi** crops are sown in winter, from October to December, and harvested in summer, from April to June: wheat, barley, peas, gram, mustard.\n" +
        "- **Zaid** is the short summer season between rabi and kharif: watermelon, muskmelon, cucumber, vegetables and fodder crops.",
      table: {
        columns: ["Season", "Sown", "Harvested", "Crops"],
        rows: [
          { cells: ["Kharif", "Onset of the monsoon", "September and October", "Paddy, maize, cotton, jute, groundnut"] },
          { cells: ["Rabi", "October to December", "April to June", "Wheat, barley, peas, gram, mustard"] },
          { cells: ["Zaid", "Summer, between rabi and kharif", "Before the monsoon", "Watermelon, muskmelon, cucumber"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which cropping season are crops sown with the onset of the monsoon?",
        steps: ["Three seasons: kharif, rabi, zaid.", "The one that starts with the monsoon rains is kharif."],
        answer: "Kharif.",
      },
      practiceSet: [
        { prompt: "In which season is wheat grown?", answer: "Rabi" },
        { prompt: "Watermelon and cucumber are crops of which season?", answer: "Zaid" },
        { prompt: "In which months are kharif crops harvested?", answer: "September and October" },
        { prompt: "Is paddy a kharif or a rabi crop?", answer: "Kharif" },
      ],
      pyqExampleId: "c5d8b672-308b-4416-ad5e-141eeac5832d",
      traps: [
        {
          title: "Mixing up rabi and kharif",
          body:
            "Rabi is the winter crop, sown from October and harvested in spring and summer. Kharif is the monsoon crop. Wheat is rabi; rice is kharif.",
        },
        {
          title: "Taking zaid for a winter season",
          body: "Zaid is the short summer season between the rabi harvest and the kharif sowing, not a winter one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigcr-crops",
      name: "Main crops and what they need",
      intuition:
        "Each crop does well only where the heat, rain and soil suit it. Learn each crop with its needs and you can also answer the reverse question: given the conditions, which crop?",
      definition:
        "- **Rice** is the staple food of most people in India. It is a kharif crop that needs high heat (above 25 °C), high humidity and over 100 cm of rain. India is the second largest producer of rice, after China.\n" +
        "- **Wheat** is the second most important cereal and the staple of the north and north west. It is a rabi crop that needs a cool growing season, bright sunshine as it ripens and 50 to 75 cm of rain spread evenly.\n" +
        "- **Cotton** grows best on the black soil of the Deccan. It needs high temperature, light rainfall, 210 frost free days and bright sunshine.\n" +
        "- **Jute** is called the golden fibre. It grows on well drained, fertile soils of flood plains, renewed every year, and needs high temperature. West Bengal grows the most.\n" +
        "- **Tea** is a plantation crop of Assam, the Darjeeling and Jalpaiguri hills of West Bengal, Tamil Nadu and Kerala.",
      table: {
        columns: ["Crop", "Season", "Needs"],
        rows: [
          { cells: ["Rice", "Kharif", "Above 25 °C, high humidity, over 100 cm rain"] },
          { cells: ["Wheat", "Rabi", "Cool growing season, 50 to 75 cm rain, sunshine at ripening"] },
          {
            cells: ["Cotton", "Kharif", "Black soil, high heat, light rain, 210 frost free days, bright sunshine"],
            noteAmber: "Cotton needs light rain, not heavy rain.",
          },
          { cells: ["Jute (golden fibre)", "Kharif", "Fertile flood plain soils renewed each year, high heat"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which cereal is the staple food of the north and north west of India?",
        steps: ["Rice is the staple of most of the country.", "In the north and north west the main food grain is the rabi cereal."],
        answer: "Wheat.",
      },
      practiceSet: [
        { prompt: "How many frost free days does cotton need?", answer: "210" },
        { prompt: "How much rain does wheat need in a year?", answer: "50 to 75 cm, spread evenly" },
        { prompt: "Which country produces more rice than India?", answer: "China" },
        { prompt: "On which soils does jute grow best?", answer: "Well drained, fertile flood plain soils renewed every year" },
      ],
      pyqExampleId: "bec9f438-60d3-474f-8448-ea92962fe8cb",
      traps: [
        {
          title: "Choosing wheat as India's staple",
          body: "Wheat is the staple only in the north and north west. Rice is the staple food of most people in India.",
        },
        {
          title: "Calling cotton the golden fibre",
          body: "The golden fibre is jute, named for its colour and its value as a cash crop. Cotton is a fibre crop of the black soil.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigcr-farming",
      name: "Plantations and allied activities",
      intuition:
        "Some farming grows one crop on a huge estate to sell to factories. Some farming rears animals or insects instead of crops. Each of these has its own name, and the names are built from Latin roots.",
      definition:
        "- A **plantation** grows a single crop over a large area, with a lot of capital and many workers, and the crop goes to factories and markets. A network of transport and communication linking the estates to **processing industries and markets** is what helps plantations grow.\n" +
        "- Plantation crops in India include tea, coffee, rubber, sugarcane and banana.\n" +
        "- **Sericulture** is the rearing of silkworms for silk. A silkworm is the young (larva) of a moth.\n" +
        "- **Apiculture** is bee keeping, **pisciculture** is fish farming, **viticulture** is growing grapes and **horticulture** is growing fruits, vegetables and flowers.",
      table: {
        columns: ["Name", "Meaning"],
        rows: [
          { cells: ["Sericulture", "Rearing silkworms for silk"] },
          { cells: ["Apiculture", "Keeping bees for honey"] },
          { cells: ["Pisciculture", "Breeding fish"] },
          { cells: ["Viticulture", "Growing grapes"] },
          { cells: ["Horticulture", "Growing fruits, vegetables and flowers"] },
          { cells: ["Plantation", "One crop on a large estate, sold to industries and markets"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is apiculture?",
        steps: ["Each word names what is reared or grown.", "Api means bee."],
        answer: "Keeping bees (bee keeping).",
      },
      practiceSet: [
        { prompt: "What is pisciculture?", answer: "Breeding fish" },
        { prompt: "What is viticulture?", answer: "Growing grapes" },
        { prompt: "Name two plantation crops grown in India.", answer: "Tea and coffee (also rubber, sugarcane, banana)" },
        { prompt: "How many crops does a plantation usually grow?", answer: "One, over a large area" },
      ],
      pyqExampleId: "cba67d67-ad47-49c1-8f33-314177c087f7",
      traps: [
        {
          title: "Thinking silk comes from a butterfly",
          body: "The silkworm is the larva of a moth. Sericulture is the rearing of these silkworms.",
        },
        {
          title: "Picking climate as what develops plantations",
          body:
            "Climate decides where a plantation crop can grow, but plantations develop because their crop reaches processing industries and markets through good transport.",
        },
      ],
    },
  ],
};
