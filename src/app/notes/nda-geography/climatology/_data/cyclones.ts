import type { SubtopicNote } from "@/app/notes/_types";

export const CYCLONES_NOTE: SubtopicNote = {
  subtopicName: "Cyclones, Fronts and Local Winds",
  title: "Cyclones, Fronts and Local Winds",
  oneLineDefinition:
    "Cyclones are low-pressure storms with inward-spiralling winds — tropical ones born over warm seas, temperate ones born along fronts where air masses meet — and around them swirl the named local winds the NDA loves to test.",
  whyItMatters:
    "14 PYQs — tied for the largest subtopic, and rich in HARD multi-statement traps. Three blocks of marks: tropical vs temperate (extratropical) cyclones and their rotation/formation; fronts and air masses; and the named local winds (Mistral, Sirocco, Chinook, Santa Ana, Loo, Bora, Purga...). The local-wind names are pure recall — drill them to reflex.",
  concepts: [
    // 1. tropical vs temperate cyclones (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "tropical-vs-temperate-cyclones",
      name: "Tropical vs temperate cyclones",
      intuition:
        "A cyclone is a low-pressure storm whose winds spiral INWARD — anticlockwise in the Northern Hemisphere, clockwise in the Southern (because Coriolis deflects to the left there). TROPICAL cyclones are compact, born over warm seas, and feed on ocean heat. TEMPERATE (extratropical) cyclones are larger, born in the mid/high latitudes along FRONTS where warm and cold air masses meet (the Polar Front Theory). Cyclones bring cloudy, rainy weather; anticyclones bring fair weather.",
      definition:
        "- **Cyclone rotation**: winds spiral inward, **anticlockwise in the Northern Hemisphere, CLOCKWISE in the Southern** (Coriolis deflects left in the SH). Anticyclones rotate the opposite way.\n" +
        "- **Tropical cyclones** — form over warm tropical seas (need warm water, Coriolis, upper-air divergence, LOW vertical wind shear). Called **hurricanes** (N Atlantic / E N Pacific), **typhoons** (NW Pacific / China), **cyclones** (Indian & S Pacific Oceans), **Willy Willy** (Australia), **Baguio** (Philippines).\n" +
        "- **Temperate / extratropical cyclones** — form in **mid and high latitudes** along the **Polar Front**; they cover a **much larger area** than tropical cyclones and generally move **WEST to EAST** (NOT east to west).\n" +
        "- **Cyclones → cloudy/rainy weather; anticyclones → fair weather.**",
      visualizationSlug: "clim-tropical-cyclone-structure",
      authoredExample: {
        prompt:
          "Three claims: (1) in the Northern Hemisphere cyclones rotate anticlockwise and anticyclones clockwise; (2) cyclones bring rainy weather, anticyclones fair weather; (3) in the Southern Hemisphere the cyclonic spiral is clockwise because Coriolis acts to the left. How many are correct?",
        steps: [
          "NH cyclone = anticlockwise, anticyclone = clockwise — (1) correct.",
          "Cyclone = cloudy/rainy, anticyclone = fair — (2) correct.",
          "SH Coriolis deflects left, so the cyclonic spiral is clockwise — (3) correct.",
        ],
        answer: "All three statements are correct.",
      },
      selfCheckExample: {
        prompt:
          "Which type of cyclone is essentially related to the 'Polar Front Theory'?",
        steps: [
          "The Polar Front is where polar and tropical air masses meet in the mid-latitudes.",
          "Cyclones forming there are temperate (extratropical) cyclones.",
        ],
        answer: "The temperate (extratropical) cyclone.",
      },
      practiceSet: [
        { prompt: "Which way do cyclones spiral in the Southern Hemisphere?", answer: "Clockwise (Coriolis deflects left)" },
        { prompt: "What is a Northwest-Pacific tropical cyclone called?", answer: "Typhoon" },
        { prompt: "Do temperate cyclones move west-to-east or east-to-west?", answer: "West to east" },
        { prompt: "Polar Front Theory explains which cyclone type?", answer: "Temperate (extratropical) cyclone" },
      ],
      pyqExampleId: "4c0c98e6-efa4-4b31-b185-b451b3986c2f", // cyclone rotation / weather, all three correct
      traps: [
        {
          title: "Temperate cyclones move WEST to EAST",
          body:
            "An extratropical-cyclone trap claims 'they move from east to west'. Mid-latitude (temperate) cyclones are steered by the westerlies and move **west to east**. They DO develop in mid/high latitudes and DO affect a larger area — those two claims are true.",
        },
        {
          title: "Hurricane vs typhoon by ocean",
          body:
            "Tropical cyclones of the **North Atlantic / eastern North Pacific** are **hurricanes**; those of the NW Pacific are **typhoons**. A trap swaps these names. The Indian and South Pacific Oceans just call them 'cyclones'.",
        },
      ],
    },

    // 2. fronts and air masses (formula + diagram)
    {
      kind: "formula" as const,
      slug: "fronts-air-masses",
      name: "Fronts and air masses",
      intuition:
        "An AIR MASS is a huge body of air with uniform temperature and humidity, formed over a large source region (tropical or polar, land or sea) — it forms under SETTLED conditions, not cyclonic ones. Where two air masses meet, the boundary is a FRONT. At a WARM front, advancing warm air rides gently up over cold air; at a COLD front, advancing cold air shoves under warm air, forcing it up steeply — which is why cold fronts spawn thunderstorms.",
      definition:
        "- An **air mass** forms in a tropical OR polar source region, over continents OR oceans, and changes the weather of areas it moves into. It forms under **stable/settled** conditions — it does NOT 'develop in a cyclonic condition' (that claim is false).\n" +
        "- A **front** is the boundary between two air masses.\n" +
        "- **Warm front** — advancing warm air **rides up OVER** a retreating colder air mass (gentle slope, steady rain). This is the correct definition.\n" +
        "- **Cold front** — advancing cold air undercuts warm air, lifting it steeply — **associated with thunderstorms**.\n" +
        "- A front's passage usually brings a **fairly rapid** (not slow) change of weather — so 'a front causes a SLOW change in weather' is the false statement.",
      visualizationSlug: "clim-warm-cold-front",
      authoredExample: {
        prompt:
          "Three claims about fronts: (1) a front's movement causes a SLOW change in weather; (2) cold fronts are associated with thunderstorms; (3) a warm front is where advancing warm air overrides and rises above colder air. Which are correct?",
        steps: [
          "A front usually brings a fairly rapid weather change, not a slow one — (1) wrong.",
          "Cold fronts lift warm air steeply, triggering thunderstorms — (2) correct.",
          "A warm front is exactly warm air overriding cold air — (3) correct.",
        ],
        answer: "Statements 2 and 3 are correct.",
      },
      selfCheckExample: {
        prompt:
          "Which statement about air masses is NOT true: (a) they form in tropical or polar regions; (b) they develop over land and ocean; (c) they develop in a cyclonic condition; (d) they change weather conditions?",
        steps: [
          "Air masses form in stable source regions, not in cyclonic conditions.",
          "Claims (a), (b) and (d) are all true of air masses.",
        ],
        answer: "(c) — air masses do NOT develop in a cyclonic condition.",
      },
      practiceSet: [
        { prompt: "Which front is associated with thunderstorms?", answer: "Cold front" },
        { prompt: "At a warm front, does warm air rise over cold or shove under it?", answer: "Rises over the cold air" },
        { prompt: "Do air masses form in cyclonic or settled conditions?", answer: "Settled (stable) conditions" },
      ],
      pyqExampleId: "e6de738f-a0ef-4fde-8cb1-2396000a81a2", // fronts statements 2 and 3 correct
      traps: [
        {
          title: "A front's passage is a RAPID change, not slow",
          body:
            "The statement 'the movement of a front causes a SLOW change in weather' is false — a passing front brings a comparatively **abrupt** shift (temperature, wind, cloud and rain all change quickly).",
        },
        {
          title: "Air masses form in SETTLED conditions",
          body:
            "An air mass needs a large, calm source region to take on uniform properties — it does NOT 'develop in a cyclonic condition'. That is the odd-one-out in 'which is NOT true' questions.",
        },
      ],
    },

    // 3. local winds (REFERENCE)
    {
      kind: "reference" as const,
      slug: "local-winds",
      name: "Named local winds",
      intuition:
        "Local winds are short-range winds with regional names, and the NDA tests the name-to-place pairing relentlessly. Group them by region — Mediterranean (Sirocco, Mistral, Khamsin), North America (Chinook, Santa Ana), the Middle East / Mesopotamia (Shamal), Siberia (Purga). The classic odd-one-out: the Harmattan blows in West Africa, NOT the Mediterranean.",
      definition:
        "Memorise the wind-to-place pairs:\n" +
        "- **Mediterranean winds** — **Sirocco** (hot, from the Sahara), **Mistral** (cold, down the Rhone), **Khamsin** (hot, Egypt). The **Harmattan** is NOT Mediterranean — it blows over **West Africa**.\n" +
        "- **North America** — **Chinook** (warm, dry; 'snow-eater', raises winter temperatures fast), **Santa Ana** (hot, dry; fuels Southern California wildfires).\n" +
        "- **Mesopotamia / Middle East** — **Shamal** (warm, dry).\n" +
        "- **Siberia** — **Purga** (cold blizzard wind blowing out of Siberia).\n" +
        "- The **doldrums** (equatorial low) is a belt of calm winds, NOT a local wind.",
      table: {
        columns: ["Local wind", "Region", "Character"],
        rows: [
          {
            cells: ["**Harmattan**", "West Africa", "NOT Mediterranean (the odd one out)"],
            noteAmber: "NDA 2024 — Harmattan is the one NOT related to the Mediterranean.",
          },
          { cells: ["**Sirocco**", "Mediterranean (from Sahara)", "Hot, dusty"] },
          { cells: ["**Mistral**", "Mediterranean (Rhone valley)", "COLD, dry"] },
          { cells: ["**Khamsin**", "Egypt / Mediterranean", "Hot"] },
          { cells: ["**Chinook**", "North America (Rockies)", "Warm, dry 'snow-eater'"] },
          {
            cells: ["**Santa Ana**", "Southern California", "Hot, dry; causes wildfires"],
            noteAmber: "NDA 2026 — Santa Ana wind drives Southern California wildfires.",
          },
          {
            cells: ["**Shamal**", "Mesopotamia / Middle East", "Warm, dry"],
            noteAmber: "NDA 2019 — Shamal is found in Mesopotamia.",
          },
          {
            cells: ["**Purga**", "Siberia", "Cold blizzard wind"],
            noteAmber: "NDA 2018 — Purga blows out from Siberia.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which local wind is NOT related to the Mediterranean Sea: Harmattan, Khamsin, Sirocco, Mistral?",
        steps: [
          "Khamsin, Sirocco and Mistral are all Mediterranean winds.",
          "The Harmattan blows over West Africa.",
        ],
        answer: "Harmattan.",
      },
      practiceSet: [
        { prompt: "Which wind causes Southern California wildfires?", answer: "Santa Ana" },
        { prompt: "Which cold blizzard wind blows out of Siberia?", answer: "Purga" },
        { prompt: "The Shamal is a local wind of which region?", answer: "Mesopotamia" },
        { prompt: "Chinook is what kind of wind?", answer: "Warm, dry 'snow-eater'" },
        { prompt: "Is the doldrums a local wind?", answer: "No — it is the calm equatorial low-pressure belt" },
      ],
      pyqExampleId: "fbee888c-196d-4c7d-aeba-9dc658d139d8", // Harmattan NOT Mediterranean
      traps: [
        {
          title: "Harmattan is West African, not Mediterranean",
          body:
            "Grouped with Khamsin, Sirocco and Mistral (all Mediterranean), the **Harmattan** is the outsider — a dry, dusty **West African** wind.",
        },
        {
          title: "Chinook is HOT-DRY, the doldrums is CALM",
          body:
            "The Chinook is a warm, dry descending wind that raises temperatures quickly in winter (true). The doldrums is a belt of **calm** equatorial winds — a pressure belt, not a local wind.",
        },
      ],
    },
  ],
};
