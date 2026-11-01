import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GCL_WINDS_NOTE: SubtopicNote = {
  subtopicName: "Pressure, Winds and Storms",
  title: "Pressure, Winds and Storms",
  oneLineDefinition:
    "What drives the monsoon (the ITCZ, the jet streams and the Tahiti-Darwin pressure gap), the retreating monsoon, and India's local winds and storms with their names.",
  whyItMatters:
    "Sixteen questions in the bank: six from the 2023 shifts, nine from the 2024 shifts and one from the 2025 shifts, 12 of them EASY. Most give a wind or shower and ask where it blows or what it does, so a table of local winds is the heart of the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgclwi-monsoon",
      name: "What drives the monsoon",
      intuition:
        "The monsoon follows a belt of low pressure that moves north with the sun and draws moist air in from the sea. A few named features steer it, and they come up in questions.",
      definition:
        "The features:\n" +
        "- **ITCZ** (Inter Tropical Convergence Zone): it moves north with the sun, and in **July** it lies at about **20 to 25 degrees N** over the Gangetic plain, as the **monsoon trough**.\n" +
        "- **Easterly jet stream**: in summer it blows over the peninsula at about **14 degrees N**.\n" +
        "- **Tahiti and Darwin**: the pressure difference between them forecasts the monsoon. If it is **negative**, expect a **below-average and late** monsoon.\n\n" +
        "The retreating monsoon (October and November):\n" +
        "- **High pressure** replaces the low over the northern plains, so skies clear.\n" +
        "- Hot, humid days follow, called **October heat**.\n" +
        "- The **north-east monsoon** brings rain to **Tamil Nadu**, Kerala and coastal Andhra Pradesh from October to December.\n\n" +
        "Wind speed is measured with an **anemometer**, first described around 1450.",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          { cells: ["ITCZ in July", "20 to 25 degrees N"], pyqExampleId: "fa6bd2ef-0d0b-4898-9da6-b3ea810b64a3" },
          { cells: ["Summer easterly jet", "About 14 degrees N"], pyqExampleId: "bd167dc8-56a7-4701-94bc-7953ed6d0a4f" },
          { cells: ["Tahiti-Darwin gap negative", "Below-average, late monsoon"], pyqExampleId: "436d1ce6-1a93-4bb8-94c9-16ae8d89077a" },
          { cells: ["October heat", "Retreating monsoon"], pyqExampleId: "b5746e79-9382-4e53-b9e3-de47e115d562" },
          { cells: ["North-east monsoon rain", "Tamil Nadu, Kerala, Andhra Pradesh"], pyqExampleId: "f1a569a6-f624-4e82-bc8b-cccf72716e6d" },
        ],
      },
      pyqExampleId: "67acfba2-4c5a-456c-89b9-2a4ae29e0f21",
      selfCheckExample: {
        prompt: "Why are October skies clear over the northern plains?",
        steps: ["The low pressure of the monsoon trough weakens over the plains.", "High pressure replaces it and the monsoon winds withdraw, so skies clear."],
        answer: "High pressure replaces the monsoon low as the monsoon retreats.",
      },
      practiceSet: [
        { prompt: "Where does the ITCZ lie in July?", answer: "Over the Gangetic plain, about 20 to 25 degrees N" },
        { prompt: "What is October heat linked with?", answer: "The retreating monsoon" },
        { prompt: "Which instrument measures wind speed?", answer: "The anemometer" },
      ],
      traps: [
        {
          title: "Negative means a weak monsoon",
          body: "A **negative** Tahiti-Darwin pressure difference points to a **below-average and late** monsoon, not an early or strong one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgclwi-local",
      name: "Local winds, showers and storms",
      intuition:
        "Each local wind or shower has a region and a job. The Loo bakes the north; the mango and blossom showers help crops in the south; the Nor'westers storm the east. Learn each name with its place.",
      definition:
        "Local winds and showers:\n" +
        "- **Loo**: a hot, dry, dusty wind over the **north and north-western plains** (Rajasthan, Punjab, Haryana, Uttar Pradesh) in May and June.\n" +
        "- **Nor'westers**: violent evening thunderstorms of **Bengal and Assam**, called Kalbaisakhi in Bengal.\n" +
        "- **Mango showers**: pre-monsoon rain in **Kerala and Karnataka** that ripens mangoes.\n" +
        "- **Blossom showers**: pre-monsoon rain that makes **coffee** flower in Karnataka.\n" +
        "- **Western disturbances**: winter storms from the **Mediterranean** that bring rain and snow to the north-west.\n\n" +
        "Cyclones:\n" +
        "- The calm centre of a cyclone is its **eye**.\n" +
        "- Tropical cyclones are called **hurricanes** in the Atlantic, **typhoons** in the western Pacific, cyclones in the Indian Ocean and **willy-willies** in **Australia**.",
      table: {
        columns: ["Wind or shower", "Where"],
        rows: [
          { cells: ["Loo", "North and north-west plains"], pyqExampleId: "f9e5ff57-e3b5-410e-a810-9ed4924c5f31" },
          { cells: ["Nor'westers", "Bengal and Assam"], pyqExampleId: "ad311e95-4930-47ba-b528-72f6f161e5d6" },
          { cells: ["Mango showers", "Kerala and Karnataka"] },
          { cells: ["Blossom showers", "Karnataka's coffee country"], pyqExampleId: "6a70d221-965c-405c-a6b4-a1aee5baafd8" },
          { cells: ["Western disturbances", "From the Mediterranean"], pyqExampleId: "6063eb21-1a86-4bc2-9c9c-55098181f87b" },
          { cells: ["Willy-willies", "Australia"], pyqExampleId: "acb9a7ef-85e9-446e-88f3-4c72a7acccfc" },
        ],
      },
      pyqExampleId: "14523d40-1a38-46b8-b2ac-be20459509b8",
      selfCheckExample: {
        prompt: "Two pre-monsoon showers help two crops in the south. Which shower helps which crop?",
        steps: ["Mango showers help mangoes ripen in Kerala and Karnataka.", "Blossom showers make coffee flower in Karnataka."],
        answer: "Mango showers: mangoes. Blossom showers: coffee.",
      },
      practiceSet: [
        { prompt: "In which State is the Loo felt most among Rajasthan, Assam and Kerala?", answer: "Rajasthan" },
        { prompt: "What is the calm centre of a cyclone called?", answer: "The eye" },
        { prompt: "Where do western disturbances come from?", answer: "The Mediterranean" },
        { prompt: "What are tropical cyclones called in the western Pacific?", answer: "Typhoons" },
      ],
      traps: [
        {
          title: "Mango showers are not Nor'westers",
          body: "**Mango showers** fall in the **south**. **Nor'westers** (Kalbaisakhi) storm the **east**. SSC puts each among the options for the other.",
        },
      ],
    },
  ],
};
