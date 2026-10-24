import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EA_HAZARDS_NOTE: SubtopicNote = {
  subtopicName: "Natural Hazards and Disasters",
  title: "Natural Hazards and Disasters",
  oneLineDefinition:
    "How natural disasters are grouped, the kinds of drought, India's earthquake zones and what decides how much damage a quake does.",
  whyItMatters:
    "Seven questions, three of them from the papers of 2025 and 2026. The avalanche has been asked twice, both times as a question of which group of disaster it belongs to.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeea-disaster-types",
      name: "Kinds of natural disaster",
      intuition:
        "A natural disaster is grouped by where it starts: in the air, on or under the land, in water, or in living things. " +
        "Ask where the trouble begins and the group follows.",
      definition:
        "The four groups (NCERT, India: Physical Environment):\n" +
        "- **Atmospheric**: blizzards, thunderstorms, lightning, tornadoes, tropical cyclones, **drought**, **hailstorm**, **frost**, heat waves and cold waves.\n" +
        "- **Terrestrial**: **earthquakes**, **volcanic eruptions**, **landslides**, **avalanches**, subsidence and soil erosion.\n" +
        "- **Aquatic**: **floods**, tidal waves, storm surges and **tsunamis**.\n" +
        "- **Biological**: plants and animals as colonisers (locusts), insect infestations, and diseases such as epidemics.\n" +
        "Kinds of drought:\n" +
        "- **Meteorological drought**: a long spell of too little rain, badly spread over time and place. India's weather office declares it when rain falls short of the normal by about a quarter or more.\n" +
        "- **Agricultural drought**: too little **soil moisture** for crops, also called **soil moisture drought**.\n" +
        "- **Hydrological drought**: water in rivers, lakes and the ground runs short.\n" +
        "- **Ecological drought**: the natural ecosystem suffers from water shortage.\n" +
        "In India, the **National Disaster Management Authority** (headed by the Prime Minister) and the **National Institute of Disaster Management** work under the **Disaster Management Act, 2005**. The **Central Water Commission** runs the country's flood forecasting stations.",
      table: {
        columns: ["Group", "Examples"],
        rows: [
          {
            cells: ["Atmospheric", "Cyclone, drought, hailstorm, frost, heat wave"],
            noteAmber: "CDS 2025 (II): the avalanche was the one that is NOT atmospheric.",
            pyqExampleId: "5824eb03-4296-4b9a-9ad7-59f700ea8dd2",
          },
          { cells: ["Terrestrial", "Earthquake, volcano, landslide, avalanche"] },
          { cells: ["Aquatic", "Flood, storm surge, tsunami"] },
          { cells: ["Biological", "Locust swarms, insect pests, epidemics"] },
        ],
      },
      pyqExampleId: "2926f682-d6ad-4833-8d75-1afa25831b68",
      selfCheckExample: {
        prompt: "A tsunami is set off by an earthquake under the sea. Is it grouped as a terrestrial or an aquatic disaster?",
        steps: [
          "The earthquake is the trigger, but the disaster itself is a huge sea wave.",
          "A wave of sea water belongs with floods and storm surges, and NCERT lists tsunamis there.",
        ],
        answer: "Aquatic.",
      },
      practiceSet: [
        { prompt: "In which group of disasters do locust swarms fall?", answer: "Biological" },
        { prompt: "What is another name for agricultural drought?", answer: "Soil moisture drought" },
        { prompt: "Which Act set up India's present framework for disaster management?", answer: "The Disaster Management Act, 2005" },
        { prompt: "Which body runs India's flood forecasting stations?", answer: "The Central Water Commission" },
      ],
      traps: [
        {
          title: "Drought is atmospheric, avalanche is terrestrial",
          body: "Drought, hailstorm and frost start in the **atmosphere**. An **avalanche** is snow and rock moving down a slope, so it is a **terrestrial** disaster.",
        },
        {
          title: "Agricultural drought is the soil moisture drought",
          body: "When soil holds too little water for crops, that is **agricultural** drought, also called **soil moisture** drought. Meteorological drought is about the rain itself.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-seismic-risk",
      name: "Earthquake zones of India and damage",
      intuition:
        "Earthquakes strike hardest where the Indian plate pushes into Asia, along the Himalayas and the North-East. " +
        "The old, stable Deccan block shakes least. How much is lost in a quake then depends on people and buildings, not on the weather.",
      definition:
        "India's seismic zones:\n" +
        "- The map is drawn by the **Bureau of Indian Standards**. Its 2002 version, the one in the textbooks, runs from **Zone II** (lowest risk) to **Zone V** (highest).\n" +
        "- **Zone V**: the **Himalayan belt** (including **Kumaon and Garhwal in Uttarakhand**, such as **Pithoragarh**), the **North-East**, **Kachchh** in Gujarat and the **Andaman and Nicobar Islands**.\n" +
        "- The **peninsular plateau** is old and stable, so most of it is in the **low** zones. Hyderabad and Secunderabad sit in Zone II.\n" +
        "What decides the damage:\n" +
        "- The **strength** of the earthquake.\n" +
        "- How many **people and buildings** are in the area (population density).\n" +
        "- The **type and quality of buildings**: most deaths come from collapsing structures, not from the shaking itself.\n" +
        "- **Climate** has no bearing on the damage.",
      table: {
        columns: ["Zone (2002 map)", "Risk", "Example places"],
        rows: [
          {
            cells: ["Zone V", "Very high", "Pithoragarh and the Himalayan belt, North-East, Kachchh, Andaman Islands"],
          },
          { cells: ["Zone IV", "High", "Delhi, much of the Ganga plain near the Himalayas"] },
          { cells: ["Zone III", "Moderate", "Much of central and eastern India, including Bhubaneswar"] },
          { cells: ["Zone II", "Low", "Much of the Deccan plateau, including Hyderabad and Secunderabad"] },
        ],
      },
      pyqExampleId: "5d21b5e5-8774-48aa-b1f7-33dc0342a0f8",
      selfCheckExample: {
        prompt: "Two towns feel the same earthquake equally strongly. One has old brick houses packed close together; the other has few people and modern earthquake-resistant buildings. Which loses more?",
        steps: [
          "The shaking is the same, so the strength of the quake is not the difference.",
          "Damage then depends on how many people live there and how well the buildings stand up.",
        ],
        answer: "The crowded town with old brick houses.",
      },
      practiceSet: [
        { prompt: "Name two regions of India in the highest earthquake risk zone.", answer: "Any two of the Himalayan belt, the North-East, Kachchh and the Andaman Islands" },
        { prompt: "Which organisation draws India's seismic zone map?", answer: "The Bureau of Indian Standards" },
        { prompt: "Why does most of the Deccan plateau carry a low earthquake risk?", answer: "It is an old, stable block of rock far from the plate boundary" },
      ],
      traps: [
        {
          title: "Climate does not decide earthquake damage",
          body: "The damage depends on the **strength** of the quake, the **number of people** and the **type of buildings**. The climate of the area plays no part.",
        },
        {
          title: "The Himalayan belt, not the plateau, is the danger zone",
          body: "Places such as **Pithoragarh** in the Himalayas lie in the **highest** zone. Plateau cities such as Secunderabad and Indore lie in lower zones.",
        },
      ],
    },
  ],
};
