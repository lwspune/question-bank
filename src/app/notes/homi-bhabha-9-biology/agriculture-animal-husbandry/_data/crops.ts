import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AG_CROPS_NOTE: SubtopicNote = {
  subtopicName: "Crop Production",
  title: "Crop Production",
  oneLineDefinition:
    "Growing a crop runs in order: prepare the soil, sow, then water, weed, manure and protect the crop until harvest; India's farm revolutions and its medicinal plants are part of the same story.",
  whyItMatters:
    "Six questions in the bank, one EASY, three MODERATE and two HARD: the stage of farming that cuts furrows, a crop that grows in sandy soil, a wild plant that is a weed, the animal whose manure is richest, the Golden Revolution, and the plants that treat malaria and cancer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9agcr-farming",
      name: "Steps of farming, soil, weeds and manure",
      intuition:
        "A farmer first gets the field ready, then sows, then looks after the young crop until it is ready to cut. Each step has its own jobs. Ploughing comes before sowing because the seed needs loose soil. Weeds grow beside the crop and steal its water, light and food, so they must be pulled out. Manure puts back what the crop takes from the soil.",
      definition:
        "- **Pre-sowing**: ploughing (which loosens the soil and **cuts furrows**), levelling and adding manure.\n" +
        "- **Sowing**: placing good seed in the soil at the right depth and distance.\n" +
        "- **Post-sowing**: irrigation, **weeding**, adding fertilisers, protecting the crop from pests, then harvesting, threshing and storage.\n" +
        "- **Soil and crop**: a hardy crop such as **mustard** or bajra grows in light **sandy** soil with little water; **pepper** needs rich, moist soil and heavy rain.\n" +
        "- **Weeds** are unwanted plants growing with a crop. **Wild oat** is a common weed of **wheat** fields; **Parthenium** (congress grass) is a weed of waste land and fields.\n" +
        "- **Manure**: the droppings of **sheep and goats** hold more **nitrogen, phosphorus and potash** than the dung of cows, buffaloes and oxen. Compost and **vermicompost** (made by earthworms) are other manures.",
      table: {
        columns: ["Stage", "Main jobs"],
        rows: [
          { cells: ["Pre-sowing", "Ploughing, cutting furrows, levelling, adding manure"] },
          { cells: ["Sowing", "Choosing good seed and placing it in the soil"] },
          { cells: ["Post-sowing", "Irrigation, weeding, fertilisers, pest control"] },
          { cells: ["After the crop is ripe", "Harvesting, threshing, drying and storage"] },
        ],
        caption: "Furrows are cut while the soil is being ready, so they belong to the pre-sowing stage.",
      },
      selfCheckExample: {
        prompt: "A farmer levels his field and mixes compost into it. Has he finished sowing yet?",
        steps: ["Levelling the field and adding manure get the soil ready for the seed.", "Those jobs come before the seed is placed in the soil."],
        answer: "No: these are pre-sowing jobs, done before sowing.",
      },
      practiceSet: [
        { prompt: "Name a weed that commonly grows in wheat fields.", answer: "Wild oat" },
        { prompt: "Why must weeds be removed from a field of crops?", answer: "They take the water, light and nutrients the crop needs" },
        { prompt: "Which needs heavy rain and rich, moist soil: mustard or pepper?", answer: "Pepper" },
        { prompt: "Which animals help to make vermicompost?", answer: "Earthworms" },
      ],
      pyqExampleId: "63d9ea39-2100-4a4f-9c8b-4fc706398c21",
      traps: [
        {
          title: "Putting ploughing after sowing",
          body: "Ploughing and cutting furrows loosen the soil for the seed, so they are pre-sowing jobs. Weeding and irrigation come after sowing.",
        },
        {
          title: "Thinking a weed must be a wild, useless plant",
          body: "A weed is any unwanted plant in a crop field. The wild form of the oat plant is a weed in wheat, even though oats are a food crop elsewhere.",
        },
        {
          title: "Taking cow dung as the richest manure",
          body: "Cow dung is the most used manure, but sheep and goat droppings hold more nitrogen, phosphorus and potash.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9agcr-revolutions",
      name: "India's farm revolutions",
      intuition:
        "After independence India grew too little food. Better seeds, irrigation and fertilisers raised grain output so fast that it was called a revolution. The same word was then used for big jumps in milk, fish, oilseeds and fruit. Each revolution is known by a colour.",
      definition:
        "- **Green Revolution**: food grains, mainly **wheat** and rice, from high-yield seeds (M. S. Swaminathan led it in India).\n" +
        "- **White Revolution**: **milk**, through Operation Flood and dairy co-operatives (Verghese Kurien).\n" +
        "- **Blue Revolution**: **fish**.\n" +
        "- **Yellow Revolution**: **oilseeds**.\n" +
        "- **Golden Revolution**: **horticulture** (fruits and vegetables) and **honey**.\n" +
        "- **Golden Fibre Revolution**: **jute**.\n" +
        "- **Silver Revolution**: **eggs**.",
      table: {
        columns: ["Revolution", "What it raised"],
        rows: [
          { cells: ["Green", "Food grains (wheat, rice)"] },
          { cells: ["White", "Milk"] },
          { cells: ["Blue", "Fish"] },
          { cells: ["Yellow", "Oilseeds"] },
          { cells: ["Golden", "Horticulture and honey"] },
          { cells: ["Golden Fibre", "Jute"], noteAmber: "Not the same as the Golden Revolution." },
          { cells: ["Silver", "Eggs"] },
        ],
        caption: "Jute's revolution has 'Fibre' in its name; plain Golden means fruit, vegetables and honey.",
      },
      selfCheckExample: {
        prompt: "Operation Flood made India the largest producer of milk in the world. Which revolution is this?",
        steps: ["Milk is white."],
        answer: "The White Revolution",
      },
      practiceSet: [
        { prompt: "Which revolution is linked with fish production?", answer: "The Blue Revolution" },
        { prompt: "Which revolution raised the output of oilseeds such as mustard and groundnut?", answer: "The Yellow Revolution" },
        { prompt: "Which crop is the Golden Fibre Revolution about?", answer: "Jute" },
        { prompt: "Which revolution brought high-yield varieties of wheat to Indian farms?", answer: "The Green Revolution" },
      ],
      pyqExampleId: "479e7baa-a5c4-4c74-b95e-ee48aa3cd94b",
      traps: [
        {
          title: "Calling jute the Golden Revolution",
          body: "Jute belongs to the Golden Fibre Revolution. The Golden Revolution is about horticulture and honey.",
        },
        {
          title: "Linking the Green Revolution with forests or vegetables",
          body: "The Green Revolution was about food grains, mainly wheat and rice, grown from high-yield seeds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9agcr-medicinal",
      name: "Medicinal plants and the diseases they treat",
      intuition:
        "Many medicines first came from plants. The bark of one tree gave the first good medicine for malaria, and a small garden flower gives medicines used against cancer. Learn each plant with the part used and the illness it treats.",
      definition:
        "- **Cinchona**: its bark gives **quinine**, used against **malaria**.\n" +
        "- **Periwinkle** (sadaphuli): gives **vinblastine and vincristine**, used against **cancer**.\n" +
        "- **Sarpagandha**: its root is used for **high blood pressure**.\n" +
        "- **Adulsa** and **tulsi**: used for **cough and cold**.\n" +
        "- **Neem** and **turmeric**: **antiseptic**, used on wounds and skin problems.\n" +
        "- **Aloe vera** (korphad): soothes **burns** and skin.\n" +
        "- **Bel**: its fruit is used for **stomach troubles** such as loose motions.",
      table: {
        columns: ["Plant", "Used for"],
        rows: [
          { cells: ["Cinchona (bark, quinine)", "Malaria"] },
          { cells: ["Periwinkle, sadaphuli", "Cancer"] },
          { cells: ["Sarpagandha (root)", "High blood pressure"] },
          { cells: ["Adulsa, tulsi", "Cough and cold"] },
          { cells: ["Neem, turmeric", "Antiseptic for wounds and skin"] },
          { cells: ["Aloe vera", "Burns and skin"] },
          { cells: ["Bel (fruit)", "Stomach troubles"] },
        ],
        caption: "Cinnamon is a spice, not a malaria medicine.",
      },
      selfCheckExample: {
        prompt: "From tulsi, cinchona, adulsa and bel, pick the two plants used for cough and cold.",
        steps: ["Cinchona is used against malaria and bel for stomach troubles.", "Tulsi and adulsa ease cough and cold."],
        answer: "Tulsi and adulsa",
      },
      practiceSet: [
        { prompt: "What is the periwinkle plant called in Marathi?", answer: "Sadaphuli" },
        { prompt: "Which plant's root is used to treat high blood pressure?", answer: "Sarpagandha" },
        { prompt: "Name two plants used as antiseptics.", answer: "Neem and turmeric" },
        { prompt: "Which plant's gel is put on burns?", answer: "Aloe vera" },
      ],
      pyqExampleId: "8c6931e6-21ef-4007-920e-1a6d88704340",
      traps: [
        {
          title: "Swapping cinchona and periwinkle",
          body: "Cinchona bark gives quinine for malaria. Periwinkle gives the cancer medicines vinblastine and vincristine.",
        },
        {
          title: "Taking bel as a cancer medicine",
          body: "Bel fruit is used for stomach troubles. Periwinkle is the plant used against cancer.",
        },
      ],
    },
  ],
};
