import type { SubtopicNote } from "@/app/notes/_types";

export const INSOLATION_NOTE: SubtopicNote = {
  subtopicName: "Insolation, Temperature and Solar Geometry",
  title: "Insolation, Temperature and Solar Geometry",
  oneLineDefinition:
    "Insolation is the incoming solar energy; how much a place receives depends on the angle of the Sun's rays, the day length and the surface beneath — and crucially the air is warmed from BELOW, by the Earth re-radiating heat, not directly by sunlight.",
  whyItMatters:
    "5 PYQs but conceptually load-bearing — these ideas underpin the whole chapter. Two facts are tested repeatedly: the atmosphere is heated chiefly by LONG-WAVE terrestrial radiation (from the warmed ground, not directly by the Sun), and temperature inversion (when the normal lapse rate flips and air gets warmer with height). The solar-geometry questions reward picturing where the Sun's rays strike most slanted.",
  concepts: [
    // 1. how the atmosphere is heated (FOUNDATION, formula)
    {
      kind: "formula" as const,
      slug: "atmosphere-heating",
      name: "How the atmosphere is heated",
      intuition:
        "Sunlight is short-wave and mostly passes THROUGH the air without warming it much. It heats the GROUND, which then radiates that energy back as long-wave heat — and THAT is what warms the air. So the atmosphere is heated mainly from below, by long-wave terrestrial radiation, which is why it is warmest near the surface.",
      definition:
        "- Incoming sunlight (insolation) is **short-wave** radiation and passes largely through the atmosphere.\n" +
        "- It is absorbed by the Earth's surface, which warms and re-emits energy as **long-wave terrestrial radiation**.\n" +
        "- **The atmosphere is heated mainly by this long-wave terrestrial (ground) radiation**, not directly by the Sun's short-wave rays — which is why the troposphere is warmest at the bottom and cools upward.\n" +
        "- The amount of insolation a place receives varies with the **rotation of the Earth, the length of the day, and the distribution of land and water** (and the angle of the Sun's rays).",
      authoredExample: {
        prompt:
          "The Earth's atmosphere is mainly heated by which kind of radiation — incoming sunlight or radiation from the ground?",
        steps: [
          "Short-wave sunlight passes through the air and is absorbed by the ground.",
          "The warmed ground re-radiates long-wave heat upward.",
          "It is this long-wave terrestrial radiation that the air absorbs and is warmed by.",
        ],
        answer: "By long-wave terrestrial (ground) radiation.",
      },
      selfCheckExample: {
        prompt:
          "Name two factors (besides Sun angle) that make insolation vary across the Earth.",
        steps: [
          "The Earth's rotation and the length of day change how long a place is lit.",
          "Land and water heat differently, so their distribution matters too.",
        ],
        answer: "Rotation / length of day and the distribution of land and water.",
      },
      practiceSet: [
        { prompt: "Is the atmosphere heated mainly by short-wave or long-wave radiation?", answer: "Long-wave (terrestrial) radiation" },
        { prompt: "Insolation is what kind of solar radiation?", answer: "Incoming short-wave radiation" },
        { prompt: "Name one factor that varies the insolation received.", answer: "Day length / Sun angle / land-water distribution" },
      ],
      pyqExampleId: "62e229f9-8a73-410c-9b81-51ed03348fa7", // atmosphere heated by long-wave terrestrial radiation
      traps: [
        {
          title: "Air is warmed from BELOW",
          body:
            "The intuitive but wrong answer is 'short-wave solar radiation directly'. The atmosphere is warmed chiefly by **long-wave radiation re-emitted by the warmed ground** — heating from below, which is why the air cools with height.",
        },
      ],
    },

    // 2. air-temperature measurement + lapse rate definition (formula)
    {
      kind: "formula" as const,
      slug: "air-temperature-measurement",
      name: "Measuring air temperature and the lapse rate",
      intuition:
        "Weather services measure 'air temperature' at a fixed standard height above ground (about 1.2 m), in shade, so the figure is comparable everywhere. The steady fall of that temperature as you climb is the environmental lapse rate.",
      definition:
        "- Standard air temperature is measured at about **1.2 m (4 feet) above the ground**.\n" +
        "- The **average rate at which temperature decreases with height** is the **environmental (normal) temperature lapse rate** — roughly 6.5 degrees C per km.\n" +
        "- This lapse rate is what makes mountain tops colder than valleys at the same latitude.",
      authoredExample: {
        prompt:
          "Two statements: (i) air temperature is measured at a standard height of about 1.2 m; (ii) the average fall of temperature with height is the environmental lapse rate. Are they correct?",
        steps: [
          "Standard screen height for thermometers is ~1.2 m above ground — (i) correct.",
          "The mean decrease of temperature with altitude is by definition the environmental lapse rate — (ii) correct.",
        ],
        answer: "Both statements are correct.",
      },
      practiceSet: [
        { prompt: "At what standard height is air temperature measured?", answer: "About 1.2 m above the ground" },
        { prompt: "What is the mean fall of temperature with height called?", answer: "Environmental (normal) lapse rate" },
      ],
      pyqExampleId: "f0819b44-a2f2-47fb-bf27-474906c2da7b", // 1.2 m standard height; env lapse rate
    },

    // 3. temperature inversion (formula)
    {
      kind: "formula" as const,
      slug: "temperature-inversion",
      name: "Temperature inversion",
      intuition:
        "Normally air cools as you go up. But on a calm, clear winter night the ground loses heat fast and chills the air right above it, so a layer of cold air sits BELOW warmer air — the normal lapse rate is turned upside down. That is a temperature inversion. Clear (not cloudy) skies favour it, and the poles experience it almost year-round.",
      definition:
        "- A **temperature inversion** happens when the **normal lapse rate is reversed** — temperature INCREASES with height instead of decreasing (cold air trapped beneath warm air).\n" +
        "- It is favoured by **long, calm, CLEAR winter nights** (the ground radiates heat away rapidly under clear skies). Cloudy skies block this, so cloudy nights do NOT favour inversion.\n" +
        "- **Polar areas experience inversion through much of the year** (persistent cold surface).\n" +
        "- 'Inversion of rainfall' (in temperate cyclones) is a related but distinct idea — there the front lifts warm air over cold.",
      authoredExample: {
        prompt:
          "Three claims: (I) inversion is the normal lapse rate getting inverted; (II) cloudy winter nights favour inversion; (III) polar areas have inversion all year. Which are correct?",
        steps: [
          "Inversion IS the normal lapse rate reversing — (I) correct.",
          "Inversion needs CLEAR skies so the ground can radiate heat; cloudy skies prevent it — (II) wrong.",
          "Persistently cold polar surfaces keep an inversion most of the year — (III) correct.",
        ],
        answer: "Statements I and III are correct.",
      },
      selfCheckExample: {
        prompt: "Why do CLEAR winter nights favour temperature inversion?",
        steps: [
          "Under a clear sky the ground radiates its heat freely to space.",
          "The surface cools sharply and chills the air immediately above it.",
          "Cold air then sits beneath warmer air aloft — an inversion.",
        ],
        answer: "Clear skies let the ground lose heat fast, chilling the lowest air below the warmer air above.",
      },
      practiceSet: [
        { prompt: "In a temperature inversion, does temperature rise or fall with height?", answer: "Rises (lapse rate reversed)" },
        { prompt: "Clear or cloudy nights favour inversion?", answer: "Clear nights" },
        { prompt: "Do polar areas experience inversion often?", answer: "Yes, through much of the year" },
      ],
      pyqExampleId: "524ed115-e3e5-467e-9944-29325caa20bc", // inversion statements I and III correct
      traps: [
        {
          title: "CLOUDY nights do NOT favour inversion",
          body:
            "A trap statement says 'winter nights with cloudy skies are conducive for inversion'. The opposite is true — **CLEAR** skies are needed so the ground can radiate heat away. Clouds trap heat and prevent the surface chilling.",
        },
      ],
    },

    // 4. solar geometry — Sun's angle (formula)
    {
      kind: "formula" as const,
      slug: "solar-geometry-angle",
      name: "The angle of the Sun's rays and the solstice",
      intuition:
        "The more slanted the Sun's rays, the less heat a place gets. When it is the June (summer) solstice in the Northern Hemisphere, the Sun is overhead at the Tropic of Cancer — so the Southern Hemisphere tilts away and the most slanted (minimum-angle) rays fall on the southern latitudes like the Tropic of Capricorn.",
      definition:
        "- The Sun's energy is most concentrated where its rays strike **vertically** and weakest where they strike at a **low (minimum) angle**.\n" +
        "- At the **June Solstice** (summer in the Northern Hemisphere), the Sun is overhead at the **Tropic of Cancer**; the Southern Hemisphere is tilted away.\n" +
        "- So the **minimum angle** of the Sun's rays at that moment falls on a southern latitude — the **Tropic of Capricorn** receives the most slanting rays.",
      authoredExample: {
        prompt:
          "During the Northern Hemisphere summer solstice, which of these gets the most slanted (minimum-angle) Sun: Arctic Circle, Equator, Tropic of Cancer, Tropic of Capricorn?",
        steps: [
          "At the June solstice the Sun is vertical over the Tropic of Cancer (max angle there).",
          "The Southern Hemisphere is tilted away from the Sun.",
          "Of the choices, the Tropic of Capricorn (far south) receives the most slanting rays.",
        ],
        answer: "The Tropic of Capricorn.",
      },
      practiceSet: [
        { prompt: "At the June solstice the Sun is overhead at which latitude?", answer: "Tropic of Cancer" },
        { prompt: "Where do the most slanted rays fall during the NH summer solstice?", answer: "Tropic of Capricorn (far south)" },
      ],
      pyqExampleId: "1beeb968-9e63-479a-b5ce-ffc02d844d43", // min angle at Tropic of Capricorn during NH summer solstice
    },
  ],
};
