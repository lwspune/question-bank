import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_FARMING_NOTE: SubtopicNote = {
  subtopicName: "Farming and Crops",
  title: "Farming and Crops",
  oneLineDefinition:
    "The types of farming, the ways crops are sown together or in turn, the farm policy after Independence, and the needs and main areas of India's chief crops.",
  whyItMatters:
    "Eighteen CDS questions, the most of any page, from 2017 to 2026. Many ask which item does NOT belong: the crop not grown on dry land, the State not known for plantations, the requirement cotton does not have. Intercropping alone was asked twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-farming-types",
      name: "Types of farming",
      intuition:
        "The first question about any farm is who eats what it grows. If the farmer's own family eats most of it, it is subsistence farming. If it is grown to be sold, it is commercial farming. " +
        "Plantations are the extreme case of commercial farming: one crop, a huge estate, a lot of money and a factory-like system.",
      definition:
        "- **Primitive subsistence** (shifting) farming: clear a patch by slash and burn, farm it for a few years, then move on. Called **jhumming** in north-east India, **roca** in Brazil, **chena** in Sri Lanka, **masole** in Central Africa (Zaire) and **tamrai** in Thailand.\n" +
        "- **Intensive subsistence** farming: small plots, much labour, and the crop is **eaten mainly by the farm family**. It is **not** commercial farming.\n" +
        "- **Commercial** farming grows for sale: **commercial grain farming**, **dairy farming**, **livestock ranching** and **plantations**.\n" +
        "- A **plantation** is a large estate growing **one cash crop** (tea, coffee, rubber, sugarcane), with **heavy capital**, **scientific management**, and historically **foreign ownership with local labour**. Plantations need heavy rain, so they are found in Assam, Kerala and Karnataka, not in dry Rajasthan.\n" +
        "- **Dryland farming** is practised where rainfall is **below about 75 cm**, with hardy crops such as **jowar, bajra, ragi, gram and groundnut**. Water-hungry crops such as **sugarcane** and rice belong to **wetland** farming.",
      table: {
        columns: ["Type of farming", "Key feature"],
        rows: [
          {
            cells: ["Shifting cultivation", "Slash and burn, then move on; roca (Brazil), chena (Sri Lanka), masole (Zaire), tamrai (Thailand)"],
            noteAmber: "CDS 2023 (II): a four-way match of these local names with their countries.",
            pyqExampleId: "c50d2495-eee0-4be1-a47d-e989323f8b97",
          },
          {
            cells: ["Intensive subsistence", "Crop eaten mainly by the farm family"],
            noteAmber: "CDS 2020 (I): the one type that is not commercial, against dairy, grain farming and ranching.",
            pyqExampleId: "cccccb1b-5700-48f0-9b56-13930c03afc6",
          },
          { cells: ["Commercial grain farming", "Wheat and maize on large machine-worked farms, for sale"] },
          { cells: ["Livestock ranching", "Animals reared on a large scale for sale"] },
          { cells: ["Plantation", "One cash crop, a large estate, heavy capital, scientific management"] },
          {
            cells: ["Dryland farming", "Rainfall under about 75 cm; hardy crops such as jowar, ragi and groundnut"],
            noteAmber: "CDS 2023 (II): sugarcane is the one crop not grown under dryland farming.",
            pyqExampleId: "b5cade2b-e29e-4e7e-9569-7dc9c7717970",
          },
        ],
      },
      pyqExampleId: "005b8f61-76d5-4328-87fc-27d0a08d2994",
      selfCheckExample: {
        prompt: "A family in Bihar grows rice on two small plots with a lot of hand labour, and eats almost all of it at home. What type of farming is this?",
        steps: [
          "The crop is eaten by the family, not sold, so it is subsistence farming.",
          "The plots are small and worked hard with much labour, so it is intensive, not shifting.",
        ],
        answer: "Intensive subsistence farming",
      },
      practiceSet: [
        { prompt: "What is shifting cultivation called in north-east India?", answer: "Jhumming" },
        { prompt: "Below roughly how much annual rainfall is dryland farming practised in India?", answer: "About 75 cm" },
        { prompt: "Name two crops grown on plantations in India.", answer: "Any two of tea, coffee, rubber and spices" },
        { prompt: "Why is Rajasthan not known for plantation farming?", answer: "Plantation crops need heavy rain and humid air, and Rajasthan is dry" },
      ],
      traps: [
        {
          title: "Subsistence is not commercial",
          body: "Dairy farming, grain farming and livestock ranching are all **commercial**: they grow for sale. **Intensive subsistence** farming feeds the farm family, so it is the odd one out.",
        },
        {
          title: "Plantations grow crops, not animals",
          body: "A plantation grows **one cash crop** on a large estate. Rearing animals for sale is **livestock ranching**, not plantation farming.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-cropping",
      name: "Cropping methods and farm policy",
      intuition:
        "Farmers can grow more than one crop on a field in three different ways: mixed up together, in neat alternating rows, or one after another through the year. Each has its own name, and CDS asks you to tell them apart. " +
        "The other questions here are about what the government did to grow more food, first just after 1947 and then in the Green Revolution.",
      definition:
        "- **Intercropping**: two or more crops on the **same field at the same time**, in a **definite row pattern**.\n" +
        "- **Mixed cropping**: two or more crops sown together **without any pattern**.\n" +
        "- **Crop rotation**: **different crops on the same land in a planned succession**, season after season. It **breaks the life cycle of pests and weeds** and keeps the soil fertile.\n" +
        "- **Mixed farming**: crops **and livestock** on the same farm.\n" +
        "- **Organic farming** uses **no synthetic fertilizers or pesticides**. It **does** use manure, **vermicompost** (compost made by earthworms, rich in organic matter and nutrients), **biofertilizers** and **bio-pesticides**.\n" +
        "- **Just after Independence**, food output was raised in three ways: **switching from cash crops to food crops**, **cropping already-farmed land more intensively**, and **bringing culturable and fallow land under the plough**. **High-yielding variety (HYV) seeds** came only with the **Green Revolution** from the **mid-1960s**.\n" +
        "- Revolutions by product: **Green** for food grains, **White** for milk, **Blue** for fish, **Yellow** for oilseeds, **Golden** for horticulture and honey, **Silver** for eggs.",
      table: {
        columns: ["Method", "What it means"],
        rows: [
          {
            cells: ["Intercropping", "Two or more crops together on one field in a definite row pattern"],
            noteAmber: "Asked twice: CDS 2019 (II) and 2021 (I).",
            pyqExampleId: "7bf15c73-2ef9-4e81-b18d-2b6362d3da01",
          },
          { cells: ["Mixed cropping", "Two or more crops sown together with no pattern"] },
          {
            cells: ["Crop rotation", "Different crops on the same land in a planned order; controls pests and weeds"],
            noteAmber: "CDS 2026 (I): crop rotation helps control insects, pests and weeds.",
            pyqExampleId: "2e07a3b5-250a-4e0e-b506-423bb0d2ff30",
          },
          { cells: ["Mixed farming", "Crops and livestock on the same farm"] },
          { cells: ["Organic farming", "No synthetic chemicals; manure, vermicompost, biofertilizers and bio-pesticides instead"] },
        ],
      },
      pyqExampleId: "f76da327-158e-4d9c-9b9b-c533bd81de5d",
      selfCheckExample: {
        prompt: "A farmer grows rice, then pulses, then wheat on the same field over three seasons. How does this sequence help her keep pests down without chemicals?",
        steps: [
          "Growing different crops in a planned order on one field is crop rotation.",
          "Many pests and weeds live on one particular crop.",
          "When that crop is missing next season, their life cycle is broken.",
        ],
        answer: "It is crop rotation: changing the crop each season breaks the life cycle of pests and weeds that depend on one crop.",
      },
      practiceSet: [
        { prompt: "What is mixed farming?", answer: "Growing crops and rearing livestock on the same farm" },
        { prompt: "When did high-yielding variety seeds reach Indian farms on a large scale?", answer: "From the mid-1960s, with the Green Revolution" },
        { prompt: "Which colour of revolution is linked with oilseeds?", answer: "The Yellow Revolution" },
        { prompt: "Name two inputs that organic farming uses in place of synthetic fertilizers and pesticides.", answer: "Any two of manure, vermicompost, biofertilizers and bio-pesticides" },
      ],
      traps: [
        {
          title: "Pattern or no pattern",
          body: "Crops in a **definite row pattern** is **intercropping**. Crops sown together **without a pattern** is **mixed cropping**. Crops in a **planned succession** is **crop rotation**.",
        },
        {
          title: "HYV seeds came later",
          body: "The steps taken **just after Independence** were more land, more intensive cropping and a switch to food crops. **HYV seeds** belong to the **Green Revolution of the mid-1960s**, so they are the odd one out.",
        },
        {
          title: "Organic does not mean no inputs",
          body: "Organic farming avoids **synthetic** chemicals, but it relies on **biofertilizers and bio-pesticides**. A statement that it does not use them is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-crops",
      name: "Crops and where they grow",
      intuition:
        "Every crop is where it is for a reason: the heat, the rain and the soil it needs. Learn the need first and the main States follow from it. " +
        "Cotton needs black soil and a long frost-free season, so it is a Deccan crop; jute needs fertile delta silt and plenty of water, so it belongs to Bengal.",
      definition:
        "- **Rice**: the main **kharif** crop. In eastern India it is grown in **three seasons, aus, aman and boro**, and it covers about **one-fourth** of India's total cropped area.\n" +
        "- **Cotton**: kharif crop of the drier parts of the **black soil** region. Needs **high temperature**, **light rainfall**, **about 210 frost-free days** and bright sunshine. Main States: **Gujarat, Maharashtra, Telangana**.\n" +
        "- **Jute**: needs **well-drained fertile alluvium of the delta**, high temperature and heavy rain. Main States: **West Bengal, Bihar, Assam, Odisha, Meghalaya**.\n" +
        "- **Coffee**: three species, **Arabica, Robusta and Liberica**. India grows mainly **Arabica**, in the hills of **Karnataka, Kerala and Tamil Nadu**.\n" +
        "- **Bajra** grows well on **sandy and shallow black soils** (Rajasthan, Uttar Pradesh, Maharashtra, Gujarat, Haryana). **Ragi** suits the **red and shallow black soils** of dry regions (Karnataka, Tamil Nadu).\n" +
        "- The **karewas** of the Kashmir valley (old lake deposits) are famous for **saffron**, **almond**, **walnut** and apple.\n" +
        "- **Coconut** is almost the only crop of **Lakshadweep**, which has the **highest coconut yield per hectare in India**.",
      table: {
        columns: ["Crop", "Needs and main areas"],
        rows: [
          { cells: ["Rice", "Kharif; heat and heavy rain; aus, aman and boro seasons in the east"] },
          {
            cells: ["Cotton", "Black soil, light rain, about 210 frost-free days; Gujarat, Maharashtra, Telangana"],
            noteAmber: "CDS 2019 (II): 'at least 100 frost-free days' is the requirement cotton does not have.",
            pyqExampleId: "a2c9f92c-788b-46b5-b1b7-530520aac73c",
          },
          {
            cells: ["Jute", "Delta alluvium and heavy rain; West Bengal, Bihar, Assam, Odisha, Meghalaya"],
            noteAmber: "CDS 2019 (II): jute is not a significant crop of Andhra Pradesh.",
            pyqExampleId: "12d896af-c517-4ad2-ace4-9815975bae17",
          },
          {
            cells: ["Coffee", "Arabica, Robusta and Liberica; hills of Karnataka, Kerala, Tamil Nadu"],
            pyqExampleId: "35b769d4-d72e-4e9c-bc3b-a6179c3b44e7",
          },
          { cells: ["Bajra", "Sandy and shallow black soils; Rajasthan, Uttar Pradesh, Gujarat"] },
          { cells: ["Ragi", "Red and shallow black soils; Karnataka, Tamil Nadu"] },
          {
            cells: ["Saffron, almond, walnut", "Karewa terraces of the Kashmir valley"],
            noteAmber: "CDS 2018 (I): water chestnut (ling nut) grows in the lakes, not on the karewas.",
            pyqExampleId: "4ea93290-0327-4d3c-a935-1c7421965254",
          },
          { cells: ["Coconut", "Kerala, Karnataka, Tamil Nadu; Lakshadweep has the highest yield per hectare"] },
        ],
      },
      pyqExampleId: "aa3cccbd-dcfe-408b-968e-d1d91dea722d",
      selfCheckExample: {
        prompt: "Why is jute grown mainly in West Bengal and almost not at all in Rajasthan?",
        steps: [
          "Jute needs fertile, well-drained delta alluvium, high temperature and heavy rain.",
          "West Bengal lies on the Ganga-Brahmaputra delta and gets heavy monsoon rain.",
          "Rajasthan is dry and has no delta soil.",
        ],
        answer: "Jute needs delta alluvium and heavy rain, which West Bengal has and Rajasthan does not.",
      },
      practiceSet: [
        { prompt: "Which coffee species is chiefly grown in India?", answer: "Arabica" },
        { prompt: "Which costly spice is grown on the karewas of Kashmir?", answer: "Saffron" },
        { prompt: "How many frost-free days does cotton need?", answer: "About 210" },
        { prompt: "On which soils does ragi grow well?", answer: "Red and shallow black soils of dry regions" },
      ],
      traps: [
        {
          title: "Cotton needs a long season",
          body: "Cotton needs about **210 frost-free days**. An option offering **100** frost-free days is the one that is not a requirement.",
        },
        {
          title: "Water chestnut is a lake crop",
          body: "The **karewas** grow saffron, almond and walnut. **Ling nut (water chestnut)** grows in the shallow water of the Wular and Dal lakes, not on the raised karewa terraces.",
        },
        {
          title: "Jute stays in the east",
          body: "Jute belongs to **West Bengal, Bihar, Assam, Odisha and Meghalaya**. Andhra Pradesh is not a significant jute State.",
        },
      ],
    },
  ],
};
