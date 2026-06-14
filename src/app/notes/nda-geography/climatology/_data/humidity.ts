import type { SubtopicNote } from "@/app/notes/_types";

export const HUMIDITY_NOTE: SubtopicNote = {
  subtopicName: "Humidity, Condensation, Clouds and Precipitation",
  title: "Humidity, Condensation, Clouds and Precipitation",
  oneLineDefinition:
    "Water vapour in the air (humidity) condenses when air is cooled past saturation, forming dew, fog, frost and clouds; when the droplets grow heavy enough they fall as precipitation — rain, snow, sleet or hail.",
  whyItMatters:
    "10 PYQs spanning easy recall and HARD multi-statement traps. The high-value distinctions: condensation forms (dew, fog, frost) vs precipitation forms (rain, snow, sleet, hail); the cloud families by altitude (high/middle/low) and which clouds bring rain (the nimbus family); and relative humidity (a ratio that FALLS as temperature rises). Drill the cloud names — they recur every year.",
  concepts: [
    // 1. humidity (FOUNDATION, formula)
    {
      kind: "formula" as const,
      slug: "humidity-relative",
      name: "Humidity and relative humidity",
      intuition:
        "Warm air can hold more water vapour than cold air. RELATIVE humidity is how full the air is — the actual vapour as a fraction of the most it could hold at that temperature. So if you heat the air without adding water, its capacity grows and the relative humidity FALLS. When relative humidity is high the air is nearly saturated, so sweat evaporates SLOWLY (and you feel sticky).",
      definition:
        "- **Relative humidity** = the **ratio of the actual water vapour in the air to the maximum it can hold at that temperature** (often a percentage).\n" +
        "- **Higher air temperature → LOWER relative humidity** (warm air can hold more, so the same vapour fills a smaller fraction).\n" +
        "- When relative humidity is **HIGH**, the air is near saturation, so **LESS** water evaporates from the skin (sweat lingers) — high humidity does NOT speed up evaporation.\n" +
        "- Condensation of vapour into water is influenced by the **volume of air, the humidity, and the temperature**.",
      authoredExample: {
        prompt:
          "Three claims: (1) relative humidity is the ratio of actual vapour to the maximum the air can hold at a given temperature; (2) when relative humidity is high, MORE water evaporates from the skin; (3) higher air temperature gives lower relative humidity. Which are correct?",
        steps: [
          "Definition of relative humidity — (1) correct.",
          "High relative humidity means the air is near saturated, so LESS evaporates, not more — (2) wrong.",
          "Warmer air holds more vapour, so the same amount fills a smaller fraction — relative humidity falls — (3) correct.",
        ],
        answer: "Statements 1 and 3 are correct.",
      },
      selfCheckExample: {
        prompt:
          "If you warm a parcel of air without adding water vapour, does its relative humidity rise or fall?",
        steps: [
          "Warmer air can hold more water vapour (greater capacity).",
          "The same vapour now fills a smaller fraction of that bigger capacity.",
        ],
        answer: "It falls.",
      },
      practiceSet: [
        { prompt: "Relative humidity is a ratio of what to what?", answer: "Actual vapour to maximum the air can hold at that temperature" },
        { prompt: "Higher temperature -> relative humidity does what?", answer: "Falls" },
        { prompt: "Name the three factors influencing condensation.", answer: "Volume of air, humidity, temperature" },
      ],
      pyqExampleId: "ae84719f-d31e-4a3a-9c61-c4360915fb25", // humidity statements 1 and 3
      traps: [
        {
          title: "High humidity SLOWS evaporation",
          body:
            "The seductive wrong claim is that high relative humidity makes MORE sweat evaporate. The opposite is true — near-saturated air can absorb little more, so evaporation (and cooling) SLOWS, which is why humid heat feels worse.",
        },
      ],
    },

    // 2. condensation vs precipitation (formula)
    {
      kind: "formula" as const,
      slug: "condensation-vs-precipitation",
      name: "Condensation forms vs precipitation forms",
      intuition:
        "Sort the watery words into two buckets. CONDENSATION is vapour turning to liquid/solid on a surface or in the air without falling: dew, fog, frost (and clouds). PRECIPITATION is water that FALLS from clouds to the ground: rain, snow, sleet, hail. The classic trap is sleet — it FALLS, so it is precipitation, NOT condensation.",
      definition:
        "- **Condensation** (vapour → water/ice, no falling): **dew, fog, frost** (and cloud).\n" +
        "- **Precipitation** (water falling to the ground): **rain, snow, sleet, hail**.\n" +
        "- **Sleet** = frozen raindrops / refrozen melted snow-water; it forms when a sub-freezing layer overlies a warmer layer — and because it FALLS, it is **precipitation, not condensation**.\n" +
        "- **Snow, sleet and hail are all forms of PRECIPITATION.**",
      authoredExample: {
        prompt:
          "Which one is NOT a form of condensation: dew, fog, frost, sleet?",
        steps: [
          "Dew, fog and frost are vapour condensing on/near surfaces without falling.",
          "Sleet falls from the sky — it is precipitation.",
        ],
        answer: "Sleet.",
      },
      selfCheckExample: {
        prompt:
          "Snow, sleet and hail are forms of which process — condensation or precipitation?",
        steps: [
          "All three fall from clouds to the ground.",
          "Falling water is precipitation.",
        ],
        answer: "Precipitation.",
      },
      practiceSet: [
        { prompt: "Dew, fog and frost are forms of?", answer: "Condensation" },
        { prompt: "Rain, snow, sleet, hail are forms of?", answer: "Precipitation" },
        { prompt: "Is sleet condensation or precipitation?", answer: "Precipitation" },
      ],
      pyqExampleId: "52f2a313-2cea-4ba5-9136-c7389fa98c55", // not a form of condensation = sleet
      traps: [
        {
          title: "Sleet FALLS — so it is precipitation",
          body:
            "Sleet looks like it belongs with dew/fog/frost, but it is frozen rain that **falls** to the ground, making it **precipitation**. Condensation forms (dew, fog, frost) do not fall.",
        },
        {
          title: "Sleet definition — sub-freezing layer OVER a warm layer",
          body:
            "Sleet forms when a layer of below-freezing air **overlies a warm layer** near the ground (raindrops refreeze on the way down). Reversing the layer order is the trap.",
        },
      ],
    },

    // 3. cloud types + rain-bearing (REFERENCE)
    {
      kind: "reference" as const,
      slug: "cloud-types",
      name: "Cloud families and rain-bearing clouds",
      intuition:
        "Clouds are named two ways at once — by their ALTITUDE (high / middle / low) and by their FORM (cirrus = wispy, cumulus = heaped, stratus = layered, nimbus = rain-bearing). The 'nimbo-' / '-nimbus' prefix or suffix always means rain. Stratus-family low clouds (stratus, nimbostratus, stratocumulus) are LOW clouds — a common trap calls them 'high'.",
      definition:
        "Clouds are classified by **altitude (high/middle/low)** AND by **form**:\n" +
        "- **Cirrus** — high, wispy, ice-crystal clouds (fair weather).\n" +
        "- **Cumulus** — heaped, cotton-wool clouds.\n" +
        "- **Stratus** — layered, sheet-like LOW clouds (Stratus, Nimbostratus, Stratocumulus are all LOW clouds, NOT high).\n" +
        "- **Nimbus / nimbo-** — the **rain-bearing** family. **Nimbostratus** gives steady, CONTINUOUS precipitation; **Cumulonimbus** gives heavy showers/thunderstorms.",
      table: {
        columns: ["Cloud", "Family / altitude", "Weather it brings"],
        rows: [
          { cells: ["**Cirrus**", "High, wispy ice clouds", "Fair, no rain"] },
          { cells: ["**Cumulus**", "Heaped fair-weather cloud", "Usually fair; can build up"] },
          {
            cells: ["**Nimbus (Nimbostratus)**", "Low, layered rain cloud", "Steady CONTINUOUS rain"],
            noteAmber: "NDA 2018 — Nimbostratus = continuous precipitation; NDA 2021 — nimbus = the rain-bearing cloud.",
          },
          { cells: ["**Cumulonimbus**", "Towering storm cloud", "Heavy showers, thunderstorms"] },
          {
            cells: ["Stratus / Stratocumulus", "**LOW** clouds (NOT high)", "Overcast, drizzle"],
            noteAmber: "NDA 2024 — Stratus/Nimbostratus/Stratocumulus are LOW clouds, not high.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which cloud is the rain-bearing one: cumulus, stratus, nimbus, cirrus?",
        steps: [
          "The 'nimbus' family is by definition the rain-bearing one.",
          "Cumulus, stratus and cirrus are not specifically rain clouds.",
        ],
        answer: "Nimbus.",
      },
      practiceSet: [
        { prompt: "Which cloud gives continuous precipitation?", answer: "Nimbostratus" },
        { prompt: "Are stratus / nimbostratus / stratocumulus high or low clouds?", answer: "Low clouds" },
        { prompt: "Clouds are classified on the basis of which two things?", answer: "Altitude and form" },
        { prompt: "Which prefix/suffix means a rain-bearing cloud?", answer: "Nimbus / nimbo-" },
      ],
      pyqExampleId: "5cad6c71-7391-42c9-a824-39f42b45e844", // continuous precipitation = nimbostratus
      traps: [
        {
          title: "Stratus family are LOW clouds",
          body:
            "A multi-statement trap calls 'Stratus, Nimbostratus and Stratocumulus' HIGH clouds. They are **LOW** clouds. The high clouds are the cirrus family (cirrus, cirrostratus, cirrocumulus).",
        },
      ],
    },

    // 4. precipitation types + cloudburst (formula)
    {
      kind: "formula" as const,
      slug: "precipitation-types",
      name: "Sleet, cloudburst and inversion of rainfall",
      intuition:
        "Beyond plain rain, the NDA tests a few special precipitation ideas: SLEET (frozen rain from a cold-over-warm air layering), CLOUDBURST (a very heavy downpour over a tiny area in a short time, triggering flash floods), and 'INVERSION of rainfall' — a feature of TEMPERATE (frontal) cyclones where the rain pattern reverses through the passage of the warm and cold fronts.",
      definition:
        "- **Sleet** — frozen raindrops or refrozen melted snow-water; forms when a **below-freezing layer overlies a warmer layer near the ground** (statement 1 is the correct definition; statement 2 reverses the layering and is wrong).\n" +
        "- **Cloudburst** (per the IMD) — **heavy precipitation in a short time over a small area**, generally during the monsoon, triggering **flash floods and landslides**.\n" +
        "- **'Inversion of rainfall'** is associated with **temperate (frontal) cyclones** — the cyclonic rainfall of the mid-latitudes, where the warm and cold fronts give a characteristic reversed rainfall sequence.",
      authoredExample: {
        prompt:
          "Two claims about sleet: (1) sleet is frozen raindrops and refrozen melted snow-water; (2) it forms when a layer of below-freezing air lies UNDER a warm layer. Which are correct?",
        steps: [
          "Definition of sleet — (1) correct.",
          "Sleet needs the cold layer OVER (above) the warm layer, so the raindrops refreeze on the way down — (2) reverses this and is wrong.",
        ],
        answer: "Only statement 1 is correct.",
      },
      selfCheckExample: {
        prompt: "'Inversion of rainfall' is associated with which kind of rainfall?",
        steps: [
          "It is not orographic or convectional or tropical-cyclonic.",
          "It belongs to the frontal rainfall of temperate (mid-latitude) cyclones.",
        ],
        answer: "Cyclonic rainfall of temperate (frontal) cyclones.",
      },
      practiceSet: [
        { prompt: "A cloudburst is heavy rain over what kind of area, in what time?", answer: "A small area, in a short period" },
        { prompt: "Inversion of rainfall is linked to which cyclone type?", answer: "Temperate (frontal) cyclone" },
        { prompt: "Sleet needs the cold layer above or below the warm layer?", answer: "Above (cold over warm)" },
      ],
      pyqExampleId: "dc198d96-3b46-4bb4-972b-ade0af2b3436", // sleet statement 1 only
      traps: [
        {
          title: "Inversion of rainfall = TEMPERATE cyclone",
          body:
            "Don't pick orographic, convectional or tropical-cyclonic. 'Inversion of rainfall' is specifically the frontal rainfall pattern of **temperate (mid-latitude) cyclones**.",
        },
      ],
    },
  ],
};
