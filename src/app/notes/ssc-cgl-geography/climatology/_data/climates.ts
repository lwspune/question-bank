import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GCL_CLIMATES_NOTE: SubtopicNote = {
  subtopicName: "Climate Types and Rainfall",
  title: "Climate Types and Rainfall",
  oneLineDefinition:
    "What controls a climate, Koeppen's letters and India's climate types, and how moisture becomes rain: humidity, the three kinds of rainfall, and how rain is measured.",
  whyItMatters:
    "Fourteen questions in the bank: six from the 2023 shifts, five from the 2024 shifts and three from the 2025 shifts, 11 of them EASY. Several are 'which of these is NOT a control (or an element)' questions, so learn the two short lists exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgclcl-zones",
      name: "Climate controls and climate types",
      intuition:
        "Weather is today's air; climate is the pattern over years. A handful of controls decide a place's climate, and Koeppen gave each climate type a letter. SSC asks what is and is not a control, and what a letter means.",
      definition:
        "**Elements of weather**: temperature, pressure, **humidity**, wind, cloud and precipitation. (Soil pH is not one.)\n\n" +
        "**Controls of climate**: **latitude**, **altitude** and relief, **distance from the sea**, **ocean currents**, and pressure and winds. (The type of soil and the Earth's interior are not.)\n\n" +
        "**Continentality**: places far from the sea have **very hot summers and very cold winters**.\n\n" +
        "Zones: the **tropics** barely change temperature through the year; **temperate** zones have **four seasons**.\n\n" +
        "**Koeppen's letters**: A tropical humid, B dry, C warm temperate, D cold snow-forest, **E polar**. In India:\n" +
        "- **Cwg**: **monsoon with a dry winter**, over most of the Ganga plain.\n" +
        "- **E**: polar type, on the high Himalayas.\n" +
        "- **Montane** climate belongs to the Himalayan States (Jammu and Kashmir, Himachal Pradesh, Uttarakhand), not to Uttar Pradesh or Bihar.",
      table: {
        columns: ["Koeppen letter", "Meaning"],
        rows: [
          { cells: ["A", "Tropical humid"] },
          { cells: ["B", "Dry"] },
          { cells: ["Cwg", "Monsoon with dry winter"], pyqExampleId: "3db9ea41-083b-4d83-bf47-447be91d3508" },
          { cells: ["E", "Polar"], pyqExampleId: "e09bcf1c-f67e-4024-9e89-bf5f1851810d" },
        ],
      },
      pyqExampleId: "e3129ed0-1e14-4fc3-84c2-f55fe4ec28aa",
      selfCheckExample: {
        prompt: "Which of these is NOT a control of climate: latitude, ocean currents, type of soil, altitude?",
        steps: ["Latitude, ocean currents and altitude all shape a place's climate.", "The soil is shaped by climate; it does not control it."],
        answer: "The type of soil.",
      },
      practiceSet: [
        { prompt: "What does continentality mean?", answer: "Very hot summers and very cold winters, far from the sea" },
        { prompt: "What does the letter E stand for in Koeppen's scheme?", answer: "Polar climate" },
        { prompt: "Is soil pH an element of weather?", answer: "No" },
        { prompt: "How many distinct seasons do temperate zones have?", answer: "Four" },
      ],
      traps: [
        {
          title: "Montane climate is Himalayan",
          body: "A pair giving **montane** climate to Uttar Pradesh, Bihar and Jharkhand is wrong: it belongs to the **Himalayan** States.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgclcl-rain",
      name: "Humidity and rainfall",
      intuition:
        "Rain needs moist air that rises and cools. It can rise because the ground heated it, because a mountain pushed it up, or because a colder air mass lifted it. Each way gives one kind of rainfall.",
      definition:
        "The facts:\n" +
        "- **Humidity** is the water vapour in the air. When vapour condenses on smoke or dust over a city, the result is **smog**.\n" +
        "- **Convectional rain**: the ground **heats** the air, which rises and cools.\n" +
        "- **Orographic rain**: a mountain forces moist air up. The **windward** side gets the rain; the leeward side lies in the rain shadow.\n" +
        "- **Frontal (cyclonic) rain**: warm air is lifted over cold air at a front.\n" +
        "- Rainfall is measured as a depth, in **millimetres**. A **Doppler weather radar** detects rain and measures its speed and strength.",
      table: {
        columns: ["Kind of rain", "Why the air rises"],
        rows: [
          { cells: ["Convectional", "Heated by the ground"] },
          { cells: ["Orographic", "Pushed up a mountain"], pyqExampleId: "ab123f28-72ac-449d-84a8-f94d40e85c5c" },
          { cells: ["Frontal (cyclonic)", "Lifted over colder air"] },
        ],
      },
      pyqExampleId: "a99c606a-fb06-4bef-b4d1-56646da1e387",
      selfCheckExample: {
        prompt: "Moist winds blow from the sea over a mountain range. Which side gets the most rain, and why?",
        steps: ["On the windward side the air is forced up, cools and drops its moisture.", "By the time it crosses to the leeward side it is dry: the rain shadow."],
        answer: "The windward side.",
      },
      practiceSet: [
        { prompt: "In what unit is rainfall usually measured?", answer: "Millimetres" },
        { prompt: "What is humidity?", answer: "The water vapour present in the air" },
        { prompt: "Which instrument detects rain and measures its speed and strength?", answer: "Doppler weather radar" },
        { prompt: "What forms when water vapour condenses on smoke or dust?", answer: "Smog" },
      ],
      traps: [
        {
          title: "Pressure units are not rainfall units",
          body: "Rain is measured in **millimetres**. Hectopascals, millibars and kilopascals measure **pressure**.",
        },
      ],
    },
  ],
};
