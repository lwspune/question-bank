import type { SubtopicNote } from "@/app/notes/_types";

export const SHAPE_ROTATION_MOTION_NOTE: SubtopicNote = {
  subtopicName: "Earth's Shape, Rotation and Motion",
  title: "Earth's Shape, Rotation and Motion",
  oneLineDefinition:
    "The Earth is a slightly squashed ball (an oblate spheroid) that spins on a tilted axis once a day and circles the Sun once a year — its rotation gives day and night, its revolution plus tilt gives the seasons.",
  whyItMatters:
    "The largest subtopic here (7 PYQs) and the source of the chapter's trickiest reasoning. Three pictures earn most marks: oblate spheroid (bulges at the Equator, flattened at the poles), rotation gives day/night while revolution + tilt gives seasons, and linear velocity is fastest at the Equator. Multi-statement 'which is/are correct' questions dominate, so know which effect comes from rotation and which from revolution.",
  concepts: [
    // 1. Shape of the Earth (formula, no box)
    {
      kind: "formula" as const,
      slug: "shape-of-earth",
      name: "The shape of the Earth — oblate spheroid",
      intuition:
        "The Earth is not a perfect sphere. Because it spins, the material is flung outward a little at the Equator, so the planet bulges at the middle and is flattened at the poles. This squashed-sphere shape is called an **oblate spheroid** (or geoid). The bulge means the equatorial diameter is the LARGER one and the polar diameter is the smaller one.",
      definition:
        "- The Earth's true shape is an **oblate spheroid** — a sphere bulging at the Equator and flattened at the poles.\n" +
        "- The **equatorial diameter is greater** than the polar diameter (by about 43 km). The polar diameter is NOT the bigger one.\n" +
        "- The equatorial bulge is caused by the Earth's **rotation** (its daily spin), NOT its revolution around the Sun.\n" +
        "- A precise model of this shape that follows mean sea level is called the **geoid**.",
      authoredExample: {
        prompt:
          "A student claims: 'The Earth bulges at the Equator because it revolves around the Sun.' Correct the error.",
        steps: [
          "The bulge comes from the Earth spinning on its own axis, which flings material outward at the middle.",
          "Spinning on its own axis is ROTATION, not revolution.",
          "Revolution is the yearly trip around the Sun and does not cause the bulge.",
        ],
        answer: "The bulge is caused by ROTATION (the daily spin), not revolution.",
      },
      selfCheckExample: {
        prompt:
          "Which is larger — the Earth's equatorial diameter or its polar diameter?",
        steps: [
          "The Earth bulges at the Equator and is flattened at the poles.",
          "A bulge means a larger diameter through the Equator.",
        ],
        answer: "The equatorial diameter is larger.",
      },
      practiceSet: [
        { prompt: "Name the true shape of the Earth.", answer: "Oblate spheroid (geoid)" },
        { prompt: "Which diameter is greater, equatorial or polar?", answer: "Equatorial" },
        { prompt: "The equatorial bulge is caused by rotation or revolution?", answer: "Rotation" },
      ],
      pyqExampleId: "91561faa-a788-4738-82af-65f283ca4fdf", // oblate spheroid; only Student 1 correct
      traps: [
        {
          title: "Polar diameter is NOT greater",
          body:
            "A classic trap states 'the polar diameter is more than the equatorial diameter'. It is the other way round — the **equatorial diameter is greater** because the Earth bulges at the Equator.",
        },
        {
          title: "Bulge = rotation, not revolution",
          body:
            "Another trap blames the equatorial bulge on **revolution**. The bulge comes from the daily spin (**rotation**); revolution is the yearly orbit and is unrelated to the bulge.",
        },
      ],
    },

    // 2. Rotation and its effects (formula + diagram)
    {
      kind: "formula" as const,
      slug: "rotation-effects",
      name: "Rotation — day, night and its effects",
      intuition:
        "Rotation is the Earth spinning on its own axis, once every 24 hours, from **west to east**. The half facing the Sun has day; the half facing away has night; the boundary is the terminator. Spin is also why winds and currents get deflected (the Coriolis effect) — but the **tides** are caused by the Moon and Sun's gravity, NOT by rotation.",
      definition:
        "Rotation = the Earth spinning on its axis once in ~24 hours (west to east). Its effects:\n" +
        "- **Day and night** — the fundamental effect; the lit half has day, the dark half night.\n" +
        "- **Diurnal (daily) rhythm** of daylight and air temperature.\n" +
        "- **Deflection of moving air and water** (the Coriolis effect) — winds and currents turn consistently sideways (right in the Northern Hemisphere, left in the Southern).\n" +
        "- **Tides are NOT an effect of rotation** — they are caused by the **gravitational pull of the Moon and Sun**. (Rotation only affects the *timing* of high tides at a place.)",
      visualizationSlug: "eis-rotation-revolution",
      authoredExample: {
        prompt:
          "Of these three, which are direct effects of the Earth's rotation: (i) day and night, (ii) deflection of winds, (iii) the ocean tides?",
        steps: [
          "Day and night come straight from the spin — yes.",
          "Deflection of winds and currents (Coriolis) comes from the spin — yes.",
          "Tides come from the Moon and Sun's gravity, not from the spin — no.",
        ],
        answer: "(i) and (ii) are effects of rotation; (iii) tides are not.",
      },
      selfCheckExample: {
        prompt: "In which direction does the Earth rotate?",
        steps: [
          "Sunrise is in the east and sunset in the west.",
          "For the Sun to appear to rise in the east, the Earth must spin toward the east.",
        ],
        answer: "From west to east.",
      },
      practiceSet: [
        { prompt: "Rotation produces which most basic effect?", answer: "Day and night" },
        { prompt: "Are tides an effect of rotation?", answer: "No — they are caused by Moon/Sun gravity" },
        { prompt: "Name the sideways deflection of winds caused by spin.", answer: "Coriolis effect" },
      ],
      pyqExampleId: "85bc4c41-4780-4a4e-b147-264a5f197329", // environmental effects of rotation: 1 and 2 only
      traps: [
        {
          title: "Tides are not caused by rotation",
          body:
            "A 'pick the effects of rotation' question lists the **tides** as a tempting third option. Tides come from the **gravitational pull of the Moon and Sun** — rotation only fixes *when* the tide arrives, not the tide itself.",
        },
      ],
    },

    // 3. Why we don't feel the spin (formula)
    {
      kind: "formula" as const,
      slug: "why-no-spin-felt",
      name: "Why we do not feel the Earth spin",
      intuition:
        "The Earth's surface moves very fast, yet nobody feels it. Three reasons combine: the spin is **steady** (no jerks because the angular velocity is constant), the **atmosphere turns along with us** so there is no rushing wind, and there is **no nearby fixed object** to compare against — everything around us moves with the Earth.",
      definition:
        "We are unaware of the Earth's rotation because ALL THREE of these hold:\n" +
        "- The **angular velocity is constant** for every place — the spin is smooth, with no sudden change to feel.\n" +
        "- The **atmosphere rotates with the Earth** — so the air does not blow past us as a constant gale.\n" +
        "- There is **no nearby stationary or differently-moving object** to notice the motion against; everything visible moves with the Earth.",
      authoredExample: {
        prompt:
          "Give one reason a passenger on the spinning Earth feels no motion, even though the surface moves at hundreds of metres per second.",
        steps: [
          "Compare with a smoothly-cruising train: you only feel speed when it changes or when something rushes past.",
          "The Earth's spin is steady (constant angular velocity) and the air moves with us, so neither cue is present.",
        ],
        answer:
          "Because the spin is steady and the atmosphere moves along with us, there is no felt motion (and no nearby fixed object to compare against).",
      },
      practiceSet: [
        { prompt: "Why is there no constant wind from the Earth's spin?", answer: "The atmosphere rotates with the Earth" },
        { prompt: "Is the angular velocity of rotation constant for a place?", answer: "Yes" },
      ],
      pyqExampleId: "d2edfba8-facf-4de6-800e-53d06c462c40", // unaware of rotation: 1, 2 and 3
    },

    // 4. Linear velocity vs latitude (formula)
    {
      kind: "formula" as const,
      slug: "linear-velocity-latitude",
      name: "Linear velocity of rotation is fastest at the Equator",
      intuition:
        "Every point on Earth completes one full spin in the same 24 hours, but points near the Equator have a much bigger circle to travel, so they move faster in metres per second. A place **on the Equator** has the greatest linear (rotational) velocity; a place near a pole barely moves; at the poles the linear velocity is zero. So the lower the latitude, the faster you are whipped around.",
      definition:
        "- **Angular velocity** (degrees per hour) is the SAME everywhere — one rotation per day.\n" +
        "- **Linear velocity** (distance per second) DEPENDS on latitude: it is **maximum at the Equator** (~1670 km/h) and falls to **zero at the poles**.\n" +
        "- So among several cities, the one **nearest the Equator (lowest latitude)** has the greatest linear velocity of rotation.\n" +
        "- Rule of thumb: lower latitude → bigger circle of travel → faster linear speed.",
      authoredExample: {
        prompt:
          "Of these cities, which has the greatest linear velocity due to the Earth's rotation: Singapore (~1 deg N), Cairo (~30 deg N), Oslo (~60 deg N)?",
        steps: [
          "Linear velocity is largest at the lowest latitude (nearest the Equator).",
          "Singapore is almost on the Equator; Cairo and Oslo are far from it.",
          "So Singapore, the lowest-latitude city, is fastest.",
        ],
        answer: "Singapore — it lies nearest the Equator, so it has the greatest linear velocity.",
      },
      selfCheckExample: {
        prompt: "What is the linear velocity of rotation at the North Pole?",
        steps: [
          "A point at the pole sits on the axis itself and traces almost no circle.",
          "With essentially zero circle to travel, its linear speed is zero.",
        ],
        answer: "Zero.",
      },
      practiceSet: [
        { prompt: "Where on Earth is linear velocity of rotation greatest?", answer: "At the Equator" },
        { prompt: "Linear velocity at the poles is?", answer: "Zero" },
        { prompt: "Lower latitude means faster or slower linear velocity?", answer: "Faster" },
      ],
      pyqExampleId: "d84f98b2-17b1-46a9-a426-373131f10708", // Kampala (near Equator) = greatest linear velocity
      traps: [
        {
          title: "Angular speed is equal — LINEAR speed is not",
          body:
            "Don't confuse the two. Every place finishes one spin in 24 hours (**angular** velocity equal). But **linear** velocity (km/h on the ground) is largest at the Equator and zero at the poles. The city question is about *linear* velocity.",
        },
      ],
    },

    // 5. Sun's perpendicular rays / Tropics (formula)
    {
      kind: "formula" as const,
      slug: "perpendicular-sun-rays",
      name: "Where the Sun can be overhead — the Tropics",
      intuition:
        "The Sun is only ever directly overhead (rays perpendicular) **between the Tropic of Cancer (23.5 deg N) and the Tropic of Capricorn (23.5 deg S)**. Any place poleward of 23.5 degrees never gets a vertical Sun. In India this matters: the Tropic of Cancer runs through the middle of the country, so states LYING ENTIRELY NORTH of it (like Bihar) never have a perpendicular Sun, while states the Tropic crosses or that lie south of it can.",
      definition:
        "- The Sun's rays are perpendicular (Sun directly overhead) ONLY within the tropics — **between 23.5 deg N and 23.5 deg S**.\n" +
        "- Anywhere with latitude **greater than 23.5 degrees** (north or south) NEVER gets a vertical Sun.\n" +
        "- In India the **Tropic of Cancer (~23.5 deg N)** passes through eight states. A state lying **wholly north of it** (e.g. Bihar, Manipur) never has the Sun overhead; states it crosses or that lie south of it do.\n" +
        "- This is a consequence of the Earth's **23.5-degree axial tilt** combined with its revolution.",
      authoredExample: {
        prompt:
          "Can the Sun ever be exactly overhead at New Delhi (~28.6 deg N)? Explain.",
        steps: [
          "The Sun is overhead only between 23.5 deg N and 23.5 deg S.",
          "New Delhi lies at 28.6 deg N, which is north of 23.5 deg N.",
          "So the Sun's rays can never be perpendicular there.",
        ],
        answer: "No — Delhi is north of the Tropic of Cancer, so the Sun is never directly overhead.",
      },
      selfCheckExample: {
        prompt: "Between which two parallels can the Sun be directly overhead?",
        steps: [
          "Overhead Sun is limited to the tropics.",
          "The tropics are the Tropic of Cancer and the Tropic of Capricorn.",
        ],
        answer: "Between 23.5 deg N (Tropic of Cancer) and 23.5 deg S (Tropic of Capricorn).",
      },
      practiceSet: [
        { prompt: "The Sun is overhead only within which latitude band?", answer: "23.5 deg N to 23.5 deg S (the tropics)" },
        { prompt: "Can the Sun be overhead at 40 deg N?", answer: "No (poleward of the Tropic of Cancer)" },
        { prompt: "Which tropic passes through India?", answer: "Tropic of Cancer (~23.5 deg N)" },
      ],
      traps: [
        {
          title: "Tilt limits the overhead Sun to 23.5 degrees",
          body:
            "Because the axis is tilted 23.5 degrees, the overhead point shifts only between the two Tropics over a year. Any latitude **beyond 23.5 degrees** never sees a perpendicular Sun — that is the key to the 'which state never has overhead Sun' question.",
        },
        {
          title: "Which Indian states NEVER get a perpendicular Sun — go by the Tropic",
          body:
            "Only states lying **wholly north of the Tropic of Cancer** qualify. Among Bihar, Chhattisgarh, Manipur and Rajasthan, the Tropic of Cancer CROSSES Chhattisgarh and southern Rajasthan (so their southern parts DO get an overhead Sun), while **Bihar and Manipur** lie entirely north — so the geographically-correct answer is **Bihar and Manipur**. (A 2024 NDA-2 paper recorded 'Bihar and Chhattisgarh', which is contested — Chhattisgarh is one of the eight states the Tropic passes through.)",
        },
      ],
    },

    // 6. The Equator passing through places (formula)
    {
      kind: "formula" as const,
      slug: "equator-through-places",
      name: "Which places the Equator passes through",
      intuition:
        "The Equator (0 deg latitude) crosses several countries, and the NDA likes asking which island or state it touches. For Indonesia, the Equator runs across **Sumatra, Kalimantan (Borneo) and Sulawesi** but JUST MISSES **Java**, which lies a little south of it. Picturing the Equator on the map separates the touched islands from the untouched one.",
      definition:
        "- The **Equator** is the 0 deg parallel, dividing the globe into the Northern and Southern Hemispheres.\n" +
        "- In Indonesia, the Equator passes through **Sumatra, Kalimantan (Borneo) and Sulawesi**, but does NOT touch **Java** (which lies south of the Equator).\n" +
        "- Knowing roughly where 0 degrees runs on a map is enough to answer 'which place is/is not on the Equator'.",
      authoredExample: {
        prompt:
          "Among the Indonesian islands Sumatra, Java, Kalimantan and Sulawesi, which one does the Equator NOT cross?",
        steps: [
          "The Equator runs across the northern-central Indonesian islands.",
          "Sumatra, Kalimantan and Sulawesi are all crossed by it.",
          "Java sits a little south of the Equator and is missed.",
        ],
        answer: "Java is not touched by the Equator.",
      },
      practiceSet: [
        { prompt: "Which Indonesian island is NOT crossed by the Equator?", answer: "Java" },
        { prompt: "The Equator marks what latitude?", answer: "0 degrees" },
      ],
      pyqExampleId: "ccd8ce9f-d376-4182-b133-4ff7b4dc2e13", // Indonesia island NOT touched by Equator: Java
    },

    // 7. Solstices / shortest day (formula)
    {
      kind: "formula" as const,
      slug: "solstices-day-length",
      name: "Solstices, equinoxes and day length",
      intuition:
        "Because the Earth's axis is tilted as it revolves, day length changes through the year. The **shortest day in the Northern Hemisphere is around 22 December** (the winter solstice), when the North Pole leans away from the Sun. The longest is around 21 June (summer solstice). On the two equinoxes (around 21 March and 23 September) day and night are equal everywhere.",
      definition:
        "Key dates (Northern Hemisphere):\n" +
        "- **22 December — winter solstice**: the **shortest day** (North Pole tilted away from the Sun). In the Southern Hemisphere this is the longest day.\n" +
        "- **21 June — summer solstice**: the longest day (North Pole tilted toward the Sun).\n" +
        "- **21 March (spring) and 23 September (autumn) — equinoxes**: day and night equal everywhere; the Sun is overhead at the Equator.\n" +
        "- These arise from the **23.5-degree axial tilt combined with revolution** — not from rotation alone.",
      authoredExample: {
        prompt:
          "On which date does the Northern Hemisphere have its longest day, and why?",
        steps: [
          "Day length is longest when that hemisphere leans most toward the Sun.",
          "The North Pole leans most toward the Sun around 21 June (summer solstice).",
        ],
        answer: "Around 21 June — the summer solstice, when the North Pole is tilted toward the Sun.",
      },
      selfCheckExample: {
        prompt: "Which date marks the SHORTEST day in the Northern Hemisphere?",
        steps: [
          "The shortest day is when the North Pole leans furthest away from the Sun.",
          "That occurs at the winter solstice, around 22 December.",
        ],
        answer: "Around 22 December (winter solstice).",
      },
      practiceSet: [
        { prompt: "Shortest day in the Northern Hemisphere is on?", answer: "About 22 December" },
        { prompt: "Longest day in the Northern Hemisphere is on?", answer: "About 21 June" },
        { prompt: "On the equinoxes the Sun is overhead at the?", answer: "Equator" },
      ],
      pyqExampleId: "de87c9ad-17cd-4f16-9571-3bbc7fc7d189", // shortest day in N. hemisphere = 22 December
      traps: [
        {
          title: "Don't pick an equinox for the shortest day",
          body:
            "21 March and 23 September are **equinoxes** (equal day and night), not the shortest day. The shortest day in the Northern Hemisphere is the **22 December solstice**.",
        },
      ],
    },
  ],
};
