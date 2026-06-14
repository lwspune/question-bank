import type { SubtopicNote } from "@/app/notes/_types";

export const LAYERS_NOTE: SubtopicNote = {
  subtopicName: "Atmospheric Layers, Composition and Aurora",
  title: "Atmospheric Layers, Composition and Aurora",
  oneLineDefinition:
    "The atmosphere is built in five shells — troposphere, stratosphere, mesosphere, thermosphere, exosphere — each with its own temperature behaviour, gases and phenomena, from all our weather down low to the ozone shield and the aurora high up.",
  whyItMatters:
    "12 PYQs — one of the largest slices of the chapter, and a steady source of HARD multi-statement traps. Two ideas earn most of the marks: the ORDER of the layers and what happens in each (weather in the troposphere, ozone in the stratosphere, burning meteors in the mesosphere), and the lapse rate (temperature falls ~6.5 degrees C per km in the troposphere). Get the layer sequence and 'which layer does what' cold.",
  concepts: [
    // 1. layer structure + sequence (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "layer-structure-sequence",
      name: "The five layers of the atmosphere",
      intuition:
        "Rise straight up and you pass through five shells in order. Closest to the ground is the TROPOSPHERE — where all weather happens. Above it the STRATOSPHERE holds the ozone layer. Then the MESOSPHERE (coldest, where meteors burn up), the THERMOSPHERE (hottest, where the aurora glows and the ionosphere reflects radio waves), and finally the wispy EXOSPHERE fading into space. " +
        "Remember the order by going outward from the surface: Tropo, Strato, Meso, Thermo, Exo.",
      definition:
        "Surface upward:\n" +
        "- **Troposphere** — nearest the ground (~0–12 km). **ALL weather and clouds occur here.** Temperature FALLS with height. Thickest at the equator, thinnest at the poles.\n" +
        "- **Stratosphere** — holds the **OZONE layer**, which absorbs ultraviolet radiation. Temperature RISES with height (because ozone warms it). Smooth, so jets cruise here.\n" +
        "- **Mesosphere** — the **COLDEST** layer; meteors burn up here.\n" +
        "- **Thermosphere** — the **HOTTEST** layer; contains the **ionosphere**, which reflects radio waves back to Earth; auroras occur here.\n" +
        "- **Exosphere** — the outermost, merging into space.\n" +
        "The boundaries are the **tropopause** (top of troposphere), stratopause, mesopause.",
      visualizationSlug: "clim-atmosphere-layers",
      authoredExample: {
        prompt:
          "Three pairs are offered: (I) Troposphere absorbs ultraviolet radiation; (II) Stratosphere is where weather changes; (III) Mesosphere reflects radio waves. How many are correctly matched?",
        steps: [
          "Ultraviolet is absorbed by ozone in the STRATOSPHERE, not the troposphere — pair I wrong.",
          "Weather changes happen in the TROPOSPHERE, not the stratosphere — pair II wrong.",
          "Radio waves are reflected by the ionosphere in the THERMOSPHERE, not the mesosphere — pair III wrong.",
        ],
        answer: "None of the three pairs is correctly matched.",
      },
      selfCheckExample: {
        prompt:
          "Give the correct sequence of layers moving upward from the Earth's surface.",
        steps: [
          "Start at the ground: troposphere.",
          "Then stratosphere (ozone), then mesosphere (coldest), then thermosphere (hottest).",
        ],
        answer: "Troposphere, Stratosphere, Mesosphere, Thermosphere (then Exosphere).",
      },
      practiceSet: [
        { prompt: "In which layer do all weather phenomena occur?", answer: "Troposphere" },
        { prompt: "The ozone layer that absorbs UV is in which layer?", answer: "Stratosphere" },
        { prompt: "Which layer is the coldest?", answer: "Mesosphere" },
        { prompt: "Which layer reflects radio waves (the ionosphere)?", answer: "Thermosphere" },
      ],
      pyqExampleId: "7fa97737-d90c-43e9-b630-9fbf49649a58", // layer-characteristic pairs, none correct
      traps: [
        {
          title: "Ozone is in the STRATOSPHERE, weather in the TROPOSPHERE",
          body:
            "A favourite swap matches the troposphere with UV absorption (really the stratosphere's ozone) or the stratosphere with weather (really the troposphere). Keep them straight: **weather = troposphere, ozone/UV = stratosphere, radio-wave reflection = thermosphere (ionosphere).**",
        },
        {
          title: "Sequence trap",
          body:
            "An option may reorder the shells (e.g. troposphere → stratosphere → thermosphere → mesosphere). The correct order outward is **Tropo, Strato, Meso, Thermo, Exo** — mesosphere comes BEFORE thermosphere.",
        },
      ],
    },

    // 2. lapse rate + tropopause (formula)
    {
      kind: "formula" as const,
      slug: "lapse-rate-tropopause",
      name: "The normal lapse rate and the tropopause",
      intuition:
        "Inside the troposphere, the air gets colder the higher you go — about 6.5 degrees C for every kilometre. This steady cooling is the NORMAL (environmental) lapse rate. It keeps falling until you reach the tropopause, the ceiling of the troposphere, where the temperature stops dropping (and in the stratosphere above, it begins to rise).",
      definition:
        "- The **normal lapse rate** is the rate at which air temperature FALLS with height in the troposphere: about **6.5 degrees C per kilometre** (roughly 1 degree F per 165 m).\n" +
        "- Temperature **DECREASES with height in the troposphere**.\n" +
        "- At the **tropopause** (top of the troposphere) the falling temperature levels off — this is where the normal lapse rate effectively drops temperature to its tropospheric minimum.\n" +
        "- In the **stratosphere above, temperature RISES** with height (ozone warming), the reverse of the troposphere.",
      authoredExample: {
        prompt:
          "Statement: 'Temperature increases with height in the troposphere at about 6.5 degrees C per km.' Is it correct, and if not, fix it.",
        steps: [
          "In the troposphere temperature does the opposite of increasing — it FALLS with height.",
          "The rate is about 6.5 degrees C per km.",
          "So the statement is wrong on direction: it should read 'decreases with height'.",
        ],
        answer: "Incorrect — temperature DECREASES with height in the troposphere at about 6.5 degrees C per km.",
      },
      selfCheckExample: {
        prompt:
          "At which boundary does the normal lapse rate carry the temperature to roughly 0 degrees C / its tropospheric minimum?",
        steps: [
          "The lapse rate cools the air all the way up the troposphere.",
          "It stops at the ceiling of the troposphere — the tropopause.",
        ],
        answer: "At the upper boundary of the tropopause.",
      },
      practiceSet: [
        { prompt: "What is the normal lapse rate (degrees C per km)?", answer: "About 6.5 degrees C per km" },
        { prompt: "Does temperature rise or fall with height in the troposphere?", answer: "Falls" },
        { prompt: "Does temperature rise or fall with height in the stratosphere?", answer: "Rises (ozone warming)" },
      ],
      pyqExampleId: "3de3c1a7-0347-4e0b-aaa2-ba9eed9f36ec", // temperature decreases in troposphere ~6.4 C/km
      traps: [
        {
          title: "Direction matters",
          body:
            "Options often flip 'decreases' to 'increases' for the troposphere, or claim the stratosphere cools with height. Lock it in: **troposphere cools upward, stratosphere warms upward.**",
        },
      ],
    },

    // 3. composition / gases (REFERENCE)
    {
      kind: "reference" as const,
      slug: "composition-gases",
      name: "Composition of the atmosphere",
      intuition:
        "The lower atmosphere is mostly nitrogen and oxygen, but the NDA tests the trace gases and the very top. Carbon dioxide is the most abundant of the greenhouse gases that humans add; the exosphere, being lightest, is dominated by the lightest gases — hydrogen and helium.",
      definition:
        "Facts the NDA tests:\n" +
        "- The bulk of the air is **nitrogen (~78%)** and **oxygen (~21%)**.\n" +
        "- Among the **greenhouse gases**, **carbon dioxide** is present in the **largest concentration** (more than methane, nitrous oxide or CFCs).\n" +
        "- The **exosphere**, the outermost and lightest layer, is composed mainly of the lightest gases — **helium and hydrogen**.",
      table: {
        columns: ["Where / which", "Dominant gas(es)", "Note"],
        rows: [
          {
            cells: ["Lower atmosphere", "Nitrogen ~78%, Oxygen ~21%", "Argon + CO2 + trace gases make up the rest"],
          },
          {
            cells: ["Most abundant greenhouse gas", "**Carbon dioxide**", "Above methane, nitrous oxide, CFCs"],
            noteAmber: "NDA 2018 — CO2 is the greenhouse gas in largest concentration.",
          },
          {
            cells: ["Exosphere (outermost)", "**Helium and Hydrogen**", "The lightest gases float to the top"],
            noteAmber: "NDA 2021 — exosphere = helium + hydrogen.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which greenhouse gas is present in the largest concentration in the atmosphere?",
        steps: [
          "Compare CO2, methane, nitrous oxide, CFCs.",
          "Carbon dioxide far exceeds the others in concentration.",
        ],
        answer: "Carbon dioxide.",
      },
      practiceSet: [
        { prompt: "Which gases dominate the exosphere?", answer: "Helium and hydrogen" },
        { prompt: "Which greenhouse gas is in largest concentration?", answer: "Carbon dioxide" },
        { prompt: "What is the most abundant gas in the lower atmosphere?", answer: "Nitrogen (~78%)" },
      ],
      pyqExampleId: "c555718e-9c6b-4df0-931a-c8e0726ef970", // exosphere = helium and hydrogen
      traps: [
        {
          title: "Exosphere is light gases, not oxygen-rich",
          body:
            "Distractors offer 'neon and oxygen' or 'neon and hydrogen' for the exosphere. The right answer is the two LIGHTEST gases — **helium and hydrogen** — which is why they reach the outermost shell.",
        },
      ],
    },

    // 4. aurora + coriolis origin (formula)
    {
      kind: "formula" as const,
      slug: "aurora-coriolis-origin",
      name: "Aurora and the origin of the Coriolis effect",
      intuition:
        "Two high-atmosphere ideas live here. The AURORA is the coloured glow when charged particles from the solar wind are funnelled by Earth's magnetic field toward the poles and strike atmospheric gases — each gas glowing its own colour. And the CORIOLIS effect, which bends winds, is purely a result of the Earth's ROTATION (not its tilt or its orbit).",
      definition:
        "- **Aurora**: the **solar wind** reaching Earth is steered toward the **two magnetic poles**, producing a colourful night-sky display. Different atmospheric **gases glow with different colours**. (Auroras were even seen from Hanle, Ladakh in 2023.)\n" +
        "- **Coriolis effect**: an apparent deflection of moving air (and water) caused by **the Earth's rotation** — NOT by the pressure gradient, the axial tilt, or the Earth's revolution around the Sun.",
      authoredExample: {
        prompt:
          "Why does the aurora appear near the magnetic poles and show several colours?",
        steps: [
          "Charged particles in the solar wind are guided by Earth's magnetic field toward the magnetic poles.",
          "There they collide with atmospheric gases.",
          "Each gas (oxygen, nitrogen) emits a characteristic colour when excited, so the display is multi-coloured.",
        ],
        answer: "Solar-wind particles funnelled to the magnetic poles excite different gases, each glowing its own colour.",
      },
      selfCheckExample: {
        prompt: "The Coriolis effect is the result of which motion of the Earth?",
        steps: [
          "It is not caused by the pressure gradient or the axial tilt.",
          "It arises because the Earth spins on its axis.",
        ],
        answer: "The Earth's rotation.",
      },
      practiceSet: [
        { prompt: "Toward which region is the solar wind directed to make auroras?", answer: "The two magnetic poles" },
        { prompt: "The Coriolis effect results from what?", answer: "The Earth's rotation" },
        { prompt: "Why is the aurora multi-coloured?", answer: "Different gases glow with different colours" },
      ],
      pyqExampleId: "a38cbe38-384e-4a45-9375-bb084ec91fe9", // aurora statements all correct
      traps: [
        {
          title: "Coriolis = rotation, not tilt or revolution",
          body:
            "Distractors blame the Coriolis effect on the Earth's axial inclination or its revolution around the Sun. It is the **rotation (spin)** of the Earth that deflects moving air.",
        },
      ],
    },

    // 5. world vegetation recall (reference) — DB-filed here
    {
      kind: "reference" as const,
      slug: "regional-recall",
      name: "Regional climate-vegetation recall",
      intuition:
        "A couple of pure world-biome recall facts the bank files in this subtopic: the savanna grasslands of South America carry local names (Campos, Llanos), and south-east China is covered by subtropical broadleaf evergreen forest. Memorise the place-to-vegetation pairing — these reward recall, not reasoning.",
      definition:
        "- **Campos** (the Brazilian Highlands) and **Llanos** (the Orinoco basin of Venezuela/Colombia) are the local names for the **tropical savanna grasslands of South America**.\n" +
        "- The natural vegetation of **south-east China** is **subtropical broadleaf evergreen forest** (a warm, humid monsoon climate).",
      table: {
        columns: ["Fact", "Answer", "Note"],
        rows: [
          {
            cells: ["Campos / Llanos grasslands", "**South America**", "Tropical savanna by local name"],
            noteAmber: "NDA 2019 — Campos and Llanos are South American savanna grasslands.",
          },
          { cells: ["Natural vegetation of SE China", "**Subtropical broadleaf evergreen forest**", "Warm, humid south-east"] },
        ],
      },
      selfCheckExample: {
        prompt: "Campos and Llanos, the tropical savanna grasslands, are found on which continent?",
        steps: [
          "Campos is the savanna of the Brazilian Highlands; Llanos is the savanna of the Orinoco basin.",
          "Both lie in South America.",
        ],
        answer: "South America.",
      },
      practiceSet: [
        { prompt: "Campos and Llanos savanna grasslands are found in which continent?", answer: "South America" },
        { prompt: "Natural vegetation of SE China?", answer: "Subtropical broadleaf evergreen forest" },
      ],
      pyqExampleId: "df7d1537-50b2-4a75-8c6c-ce2a4f83caf9", // Campos/Llanos = South America
    },
  ],
};
