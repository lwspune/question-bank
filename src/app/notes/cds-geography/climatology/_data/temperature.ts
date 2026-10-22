import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_CL_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Insolation and Temperature",
  title: "Insolation and Temperature",
  oneLineDefinition:
    "How sunlight reaches and heats the Earth, why some surfaces reflect more of it, how temperature falls with height, and when that fall turns round into an inversion.",
  whyItMatters:
    "Nine CDS questions from 2018 to 2026, all MODERATE. Four are about temperature inversion (2022, 2025 and 2026), so inversion is the one idea on this page to know in full: when it forms, what it does to the air and why it traps smog.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgecl-insolation",
      name: "Insolation, albedo and global dimming",
      intuition:
        "The Sun is very hot, so it sends its energy as short waves, mostly visible light. The Earth's round surface spreads that energy unevenly: rays fall straight down near the equator and at a slant near the poles. Some of the light is bounced straight back, and how much depends on the surface.",
      definition:
        "The terms:\n" +
        "- **Insolation** (incoming solar radiation): the Sun's energy received by the Earth. It is mostly **short-wave** radiation, much of it **visible light**.\n" +
        "- It is **unevenly** spread: because the Earth is **curved**, rays strike low latitudes nearly **vertically** and high latitudes **obliquely**, spreading the same energy over a larger area.\n" +
        "- The Earth gives heat back out as **long-wave** (terrestrial) radiation, which greenhouse gases trap.\n" +
        "- **Albedo**: the share of incoming light a surface **reflects**. Of every 100 units of sunlight reaching the top of the atmosphere, about **35** are reflected back to space (the Earth's albedo).\n" +
        "- **Global dimming**: a **fall in the sunlight** reaching the ground because **particulates** (dust, smoke, aerosols) scatter and absorb it. Its effect is a **fall in surface temperature**.",
      table: {
        columns: ["Surface", "Share of sunlight it reflects"],
        rows: [
          {
            cells: ["Fresh snow", "About 80 to 90 per cent, the highest"],
            noteAmber: "CDS 2022 (I): a snow covered mountain has the highest albedo, above a sandy desert, bare rock or a mangrove forest.",
            pyqExampleId: "8ee0929c-5a48-49cb-87e3-d0ebd602b15f",
          },
          { cells: ["Desert sand", "About 30 to 40 per cent"] },
          { cells: ["Grassland", "About 20 to 25 per cent"] },
          { cells: ["Dense forest", "About 5 to 15 per cent"] },
          { cells: ["Open water with the Sun high", "Under 10 per cent"] },
        ],
      },
      pyqExampleId: "8ee0929c-5a48-49cb-87e3-d0ebd602b15f",
      selfCheckExample: {
        prompt: "Two places receive the same amount of sunlight at the top of the atmosphere, one at the equator and one at 60° N. Why does the ground at 60° N heat up less?",
        steps: [
          "At 60° N the Sun's rays arrive at a slant, not straight down.",
          "Slanting rays spread the same energy over a larger area of ground.",
          "Slanting rays also pass through more air, which absorbs and scatters more of them.",
        ],
        answer: "Its rays are oblique, so each square metre of ground gets less energy.",
      },
      practiceSet: [
        { prompt: "Is insolation mostly short-wave or long-wave radiation?", answer: "Short-wave" },
        { prompt: "What is albedo?", answer: "The share of incoming sunlight that a surface reflects" },
        { prompt: "What does global dimming do to the temperature at the ground?", answer: "It lowers it" },
        { prompt: "Which causes global dimming: more particulates in the air, or fewer?", answer: "More particulates (dust, smoke, aerosols)" },
      ],
      traps: [
        {
          title: "The curve makes insolation uneven",
          body: "A statement that insolation is **evenly** spread **because** the Earth is curved is false. The curve is exactly why it is **uneven**: straight rays at the equator, slanting rays near the poles.",
        },
        {
          title: "Dimming cools, it does not change pressure",
          body: "Global dimming is about **less sunlight and a fall in temperature** caused by particulates. Options that tie it to a rise or fall in **air pressure**, or to a rise in temperature, are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsgecl-lapse-rate",
      name: "Lapse rate and adiabatic change",
      intuition:
        "Air near the ground is heated by the ground, so it gets colder as you go up: about 6.5 °C for every kilometre. A hill station is cooler than the plain below for this reason alone. A rising parcel of air cools in a different way: it has less air pushing on it, so it expands, and expanding air cools without losing any heat to its surroundings.",
      definition:
        "The rules:\n" +
        "- **Normal lapse rate**: temperature falls by about **6.5 °C per 1,000 m** of height in the troposphere.\n" +
        "- **Adiabatic** change: a temperature change with **no heat added or removed**. Rising air **expands and cools**; sinking air is **compressed and warms**.\n" +
        "- Because hills are cooler, the **India Meteorological Department** uses lower limits for them: a **heat wave** is a maximum of **40 °C or more in the plains** or **30 °C or more in the hills**; a **cold wave** is a minimum of **10 °C or less in the plains** or **0 °C or less in the hills**.",
      formula: {
        label: "Temperature at a height, using the normal lapse rate",
        latex: "T_h = T_0 - 6.5 \\times h",
        symbols: [
          { symbol: "\\(T_0\\)", meaning: "temperature at the lower place, in °C" },
          { symbol: "\\(h\\)", meaning: "height climbed, in kilometres" },
          { symbol: "\\(T_h\\)", meaning: "temperature at the higher place, in °C" },
        ],
      },
      authoredExample: {
        prompt: "It is 30 °C at a town at sea level. Using the normal lapse rate, what temperature would you expect at a hill station 2,000 m up?",
        steps: [
          "The climb is 2,000 m, which is \\(h = 2\\) km.",
          "The fall is \\(6.5 \\times 2 = 13\\) °C.",
          "\\(T_h = 30 - 13 = 17\\) °C.",
        ],
        answer: "About 17 °C.",
      },
      selfCheckExample: {
        prompt: "The temperature at the foot of a hill, 500 m above sea level, is 25 °C. What is the expected temperature at the top, 2,500 m above sea level?",
        steps: [
          "The climb is \\(2500 - 500 = 2000\\) m, so \\(h = 2\\) km.",
          "The fall is \\(6.5 \\times 2 = 13\\) °C.",
          "\\(25 - 13 = 12\\) °C.",
        ],
        answer: "About 12 °C.",
      },
      pyqExampleId: "8be2a0a8-ecb1-473c-93b0-292d7be0a148",
      practiceSet: [
        { prompt: "What is the normal lapse rate in the troposphere?", answer: "About 6.5 °C per 1,000 m" },
        { prompt: "By how much does temperature fall over a climb of 1,000 m, at the normal lapse rate?", answer: "About 6.5 °C" },
        { prompt: "What maximum temperature in the hills counts as a heat wave for the India Meteorological Department?", answer: "30 °C or more" },
        { prompt: "What minimum temperature in the plains counts as a cold wave?", answer: "10 °C or less" },
      ],
      traps: [
        {
          title: "Adiabatic means no heat is exchanged",
          body: "In an adiabatic change the air's temperature changes only because it **expands** (cools) or is **compressed** (warms). Latent heat, absorption of sunlight and advection are other ways of changing temperature, not adiabatic ones.",
        },
        {
          title: "Different heat wave limits for hills",
          body: "The heat wave limit is **40 °C for the plains** but **30 °C for the hills**, because hills are cooler to begin with. A statement giving both limits correctly is true.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-inversion",
      name: "Temperature inversion",
      intuition:
        "Normally the air gets colder as you go up. On a long, clear, calm winter night the ground loses its heat fast and chills the air touching it, so for a while the air near the ground is colder than the air above. The usual order is turned upside down. Cold heavy air sitting under warm air cannot rise, so the air goes still and holds whatever is in it: fog, frost, smoke.",
      definition:
        "Inversion of temperature:\n" +
        "- **Temperature rises with height** instead of falling: the normal lapse rate is reversed (a **negative lapse rate**).\n" +
        "- **Ideal conditions**: a **long winter night**, **clear skies** and **still air**.\n" +
        "- **Surface inversion** forms as the ground loses heat by radiation at night, so it is also called **radiation inversion**. It usually lasts **a few hours, until the Sun heats the ground** again.\n" +
        "- It makes the lower air **stable**: cold air below cannot rise, so there is no mixing.\n" +
        "- So it traps pollution under an **inversion lid**, the main cause of **smog**, and helps **fog** and **frost** form.\n" +
        "- **Valley inversion**: at night cold air slides down the slopes and collects in the valley floor, so the valley is colder than the slopes (frost pockets).",
      table: {
        columns: ["Feature", "Inversion"],
        rows: [
          { cells: ["Temperature with height", "Rises"] },
          {
            cells: ["Effect on the lower air", "Stable, no vertical mixing"],
            noteAmber: "CDS 2025 (I): surface inversion causes stability, not instability, and lasts a few hours until sunrise.",
            pyqExampleId: "c24c717f-dc04-4c0a-9086-80c8ac9007ab",
          },
          {
            cells: ["Main reason smog lingers", "The inversion lid holds pollutants near the ground"],
            noteAmber: "CDS 2022 (I): the inversion lid is the most important factor, ahead of long nights or many pollution sources.",
            pyqExampleId: "f7c11dfd-a6b5-470c-ae0e-5bc4ca39c81f",
          },
          { cells: ["Other name for surface inversion", "Radiation inversion"] },
          { cells: ["Ideal conditions", "Long winter night, clear sky, still air"] },
        ],
      },
      pyqExampleId: "c24c717f-dc04-4c0a-9086-80c8ac9007ab",
      selfCheckExample: {
        prompt: "In hill country, frost often forms on the valley floor on a calm winter night while the slopes above stay free of it. Why?",
        steps: [
          "At night the slopes lose heat and chill the air touching them.",
          "Cold air is heavy, so it slides down the slopes and collects in the valley.",
          "The valley floor is now colder than the slopes above it: a valley inversion, cold enough for frost.",
        ],
        answer: "Cold air drains down into the valley at night (valley inversion), so the valley floor is the coldest place.",
      },
      practiceSet: [
        { prompt: "What is the ideal weather for a temperature inversion?", answer: "A long winter night with clear skies and still air" },
        { prompt: "What is another name for a ground surface inversion?", answer: "Radiation inversion" },
        { prompt: "In a temperature inversion, does temperature rise or fall with height?", answer: "It rises" },
        { prompt: "Why does a temperature inversion let smog build up?", answer: "Cold air under warm air cannot rise, so the inversion lid holds pollutants near the ground" },
      ],
      traps: [
        {
          title: "Inversion means stability",
          body: "Cold, heavy air under warm air cannot rise, so an inversion makes the lower air **stable**. A statement that it causes **instability** is false.",
        },
        {
          title: "A fast fall with height spreads smog",
          body: "Smog builds up under an **inversion lid**. A rapid fall of temperature with height (a steep normal lapse rate) does the opposite: it makes air rise and carries pollutants away.",
        },
      ],
    },
  ],
};
