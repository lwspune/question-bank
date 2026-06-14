import type { SubtopicNote } from "@/app/notes/_types";

export const LATITUDE_LONGITUDE_GRID_NOTE: SubtopicNote = {
  subtopicName: "Latitude, Longitude and Geographical Grid",
  title: "Latitude, Longitude and the Geographical Grid",
  oneLineDefinition:
    "Latitude and longitude form the grid of imaginary lines that lets us name any point on Earth — parallels run east-west and shrink toward the poles, meridians run pole to pole and are all equal in length.",
  whyItMatters:
    "6 PYQs, mostly EASY to MODERATE 'which is/are correct' and 'arrange in order' questions. Master four facts: parallels run east-west and meridians run north-south, the Equator is the longest parallel (and a great circle), meridians all have equal length while parallels shrink toward the poles, and a great circle is any circle whose plane passes through the Earth's centre.",
  concepts: [
    // 1. Latitude and longitude defined (formula + diagram)
    {
      kind: "formula" as const,
      slug: "latitude-longitude-defined",
      name: "Latitude and longitude — the geographical grid",
      intuition:
        "Two families of lines wrap the globe. **Parallels of latitude** run **east to west** (like the rungs of a ladder) and measure how far north or south of the Equator you are. **Meridians of longitude** run **north to south, from pole to pole**, and measure how far east or west of the Prime Meridian you are. Together they form the geographical grid, so any place is fixed by a (latitude, longitude) pair.",
      definition:
        "- **Latitude** — angular distance north or south of the Equator (0 deg to 90 deg). Its lines, the **parallels**, run **east to west** around the globe and are parallel to one another.\n" +
        "- **Longitude** — angular distance east or west of the Prime Meridian (0 deg to 180 deg). Its lines, the **meridians**, run **north to south from the North Pole to the South Pole**.\n" +
        "- The crossing of the two families is the **geographical grid**; a place is located by its latitude AND longitude together.\n" +
        "- **Number of meridians (longitudes) is greater than the number of parallels (latitudes)** in the usual convention: 360 meridians (one per degree of longitude, 0–180 each side) versus 181 parallels (90 each side plus the Equator).",
      visualizationSlug: "eis-lat-long-grid",
      authoredExample: {
        prompt:
          "A grid book says: 'Lines running east-west mark latitude; lines running north-south from pole to pole mark longitude.' Are both statements correct?",
        steps: [
          "Parallels of latitude do run east to west around the globe — correct.",
          "Meridians of longitude do run north to south from pole to pole — correct.",
          "Both statements match the definitions of the grid.",
        ],
        answer: "Yes — both statements are correct.",
      },
      selfCheckExample: {
        prompt: "Do lines of longitude run east-west or north-south?",
        steps: [
          "Longitude measures east-west position, but its LINES connect the poles.",
          "Pole-to-pole lines run north to south.",
        ],
        answer: "North to south (pole to pole).",
      },
      practiceSet: [
        { prompt: "Parallels of latitude run in which direction?", answer: "East to west" },
        { prompt: "Meridians of longitude run between what?", answer: "The North and South Poles (north-south)" },
        { prompt: "To locate a place you need which two coordinates?", answer: "Latitude and longitude" },
      ],
      pyqExampleId: "c274f2ef-5b57-4099-8081-59ed4f749980", // grid: latitude E-W, longitude N-S, both correct
    },

    // 2. Equator longest parallel (formula)
    {
      kind: "formula" as const,
      slug: "equator-longest-parallel",
      name: "The Equator is the longest parallel of latitude",
      intuition:
        "Parallels are circles around the globe, and they get smaller the closer you go to a pole. The biggest of all is the one around the middle — the **Equator (0 deg)**. The Tropic of Cancer, Arctic Circle and the rest are all shorter, and at the poles a 'parallel' shrinks to a single point. So the longest latitude line is always the Equator.",
      definition:
        "- **Parallels of latitude shrink toward the poles** — they are largest at the Equator and become a point at 90 deg (the poles).\n" +
        "- The **Equator (0 deg latitude) is the longest parallel** and the only parallel that is a great circle.\n" +
        "- So when asked for the 'longest latitude' or 'longest parallel', the answer is the **Equator**, NOT 23.5 deg or 66.5 deg.\n" +
        "- 90 deg latitude is a single point (a pole), which is the SHORTEST possible parallel.",
      authoredExample: {
        prompt:
          "Order these parallels from longest to shortest: Arctic Circle (66.5 deg N), Tropic of Cancer (23.5 deg N), Equator (0 deg).",
        steps: [
          "Parallels shrink as latitude increases toward a pole.",
          "Equator (0 deg) is the largest, then the Tropic of Cancer (23.5 deg), then the Arctic Circle (66.5 deg).",
        ],
        answer: "Equator > Tropic of Cancer > Arctic Circle.",
      },
      selfCheckExample: {
        prompt: "Which is the longest parallel of latitude — 0 deg, 23.5 deg, 66.5 deg or 90 deg?",
        steps: [
          "Parallels are largest at the Equator and shrink to a point at the poles.",
          "0 deg is the Equator, the largest of all.",
        ],
        answer: "0 deg (the Equator).",
      },
      practiceSet: [
        { prompt: "Which is the longest parallel of latitude?", answer: "The Equator (0 deg)" },
        { prompt: "What does a parallel become at 90 deg latitude?", answer: "A single point (a pole)" },
        { prompt: "Is the Arctic Circle longer or shorter than the Equator?", answer: "Shorter" },
      ],
      pyqExampleId: "a79408a2-ae8c-4b37-98bc-359a6d8a855d", // longest parallel of latitude = Equator
      traps: [
        {
          title: "Longest latitude = Equator, not 90 degrees",
          body:
            "A 'longest latitude' question may list **90 deg** as a tempting big-number choice. But 90 deg is a pole — a single point, the SHORTEST. The longest is **0 deg, the Equator**.",
        },
      ],
    },

    // 3. Meridians equal, parallels unequal; great circle (formula)
    {
      kind: "formula" as const,
      slug: "meridians-parallels-great-circle",
      name: "Equal meridians, unequal parallels, and great circles",
      intuition:
        "All **meridians of longitude are the same length** — each is a half-circle from pole to pole — and the gap between two meridians is widest at the Equator and shrinks to zero at the poles. **Parallels are unequal** (shrinking poleward). A **great circle** is any circle on the globe whose plane passes through the Earth's centre — the Equator and every full meridian-pair are great circles, but the smaller parallels (Tropics, Arctic Circle) are NOT.",
      definition:
        "- **Distance between meridians (longitudes)** is **maximum at the Equator** and becomes **zero at the poles** (the meridians meet there).\n" +
        "- **Parallels are unequal** in length (shrink poleward); **meridians are all equal** in length.\n" +
        "- A **Great Circle** = a circle whose plane passes through the **centre of the Earth**, dividing it into two equal halves. It is the **shortest route** between two points on the globe.\n" +
        "  - The **Equator** is a great circle; **every meridian** (paired with its opposite to make a full circle) is part of a great circle.\n" +
        "  - The **Tropic of Cancer, Arctic Circle and other parallels are NOT great circles** (their planes do not pass through the centre) — they are small circles.",
      authoredExample: {
        prompt:
          "Of the Prime Meridian, the Tropic of Cancer and the Equator, which are great circles?",
        steps: [
          "A great circle's plane must pass through the Earth's centre.",
          "The Equator passes through the centre — great circle.",
          "The Prime Meridian (with its opposite meridian) forms a full circle through the centre — great circle.",
          "The Tropic of Cancer is a small parallel, off-centre — not a great circle.",
        ],
        answer: "The Prime Meridian and the Equator are great circles; the Tropic of Cancer is not.",
      },
      selfCheckExample: {
        prompt: "Where is the distance between two meridians the greatest?",
        steps: [
          "Meridians fan out widest at the middle of the globe and meet at the poles.",
          "The widest separation is therefore at the Equator.",
        ],
        answer: "At the Equator.",
      },
      practiceSet: [
        { prompt: "Are all meridians of longitude equal in length?", answer: "Yes" },
        { prompt: "Distance between longitudes is maximum where?", answer: "At the Equator" },
        { prompt: "Distance between longitudes at the poles is?", answer: "Zero" },
        { prompt: "Is the Tropic of Cancer a great circle?", answer: "No (it is a small circle)" },
      ],
      pyqExampleId: "f3e93170-0865-4110-abd0-729271867ee8", // great circles: Prime Meridian + Equator (1 and 3)
      traps: [
        {
          title: "Only the Equator and full meridians are great circles",
          body:
            "Among latitude lines, ONLY the **Equator** is a great circle. The Tropics, Arctic and Antarctic Circles are **small circles**. Every full meridian, however, lies on a great circle. So 'Prime Meridian + Equator' is the classic correct pair.",
        },
      ],
    },

    // 4. Longitude-distance multi-statement (formula)
    {
      kind: "formula" as const,
      slug: "longitude-distance-facts",
      name: "How meridian spacing changes — and counting the lines",
      intuition:
        "Three facts get bundled into multi-statement questions: the gap between meridians is **zero at the poles** (where they meet), **maximum at the Equator**, and there are **more longitudes than latitudes** in the standard count. All three are true together, so 'all of the above' is the usual answer.",
      definition:
        "All three of these statements are correct:\n" +
        "- The distance between two longitudes (meridians) **becomes zero at the North and South Poles** — the meridians converge there.\n" +
        "- The distance between two longitudes is **maximum at the Equator**.\n" +
        "- The **number of longitudes is greater than the number of latitudes** (360 meridians at 1 deg spacing vs 181 parallels including the Equator).",
      authoredExample: {
        prompt:
          "True or false: 'There are more lines of longitude than lines of latitude on the standard grid.'",
        steps: [
          "Longitudes run 0–180 degrees on each side of the Prime Meridian: 360 lines at 1-degree spacing.",
          "Latitudes run 0–90 degrees on each side of the Equator: 90 + 90 + 1 = 181 lines.",
          "360 is greater than 181.",
        ],
        answer: "True — there are more longitudes (360) than latitudes (181).",
      },
      practiceSet: [
        { prompt: "Distance between longitudes at the poles is?", answer: "Zero" },
        { prompt: "Distance between longitudes is maximum where?", answer: "At the Equator" },
        { prompt: "Are there more longitudes or more latitudes?", answer: "More longitudes" },
      ],
      pyqExampleId: "d8170ae3-0dcd-420a-a1ee-c694ce2d9b1c", // 3 statements all correct: 1, 2 and 3
    },

    // 5. Latitudinal zones / heat belts (formula)
    {
      kind: "formula" as const,
      slug: "latitudinal-zones",
      name: "Latitudinal heat zones and their extent",
      intuition:
        "Latitude bands group into climatic/heat zones, and the NDA asks you to ORDER them by how wide a band of latitude each covers. From the Equator outward: the **equatorial/tropical** belt near the middle, the **mid-latitude (temperate)** belt, then the **subarctic/polar** belts. Each zone spans a different number of degrees of latitude, so 'arrange by latitudinal extent' is really 'arrange by band width'.",
      definition:
        "- **Latitudinal (heat) zones** are bands of latitude with similar Sun-angle and climate: the **Torrid/Tropical** zone (0–23.5 deg), the **Temperate/mid-latitude** zone (23.5–66.5 deg), and the **Frigid/polar (incl. subarctic)** zone (66.5–90 deg).\n" +
        "- Questions ask you to **arrange zones by their latitudinal extent** (the width of the latitude band each occupies), ascending or descending.\n" +
        "- The narrow equatorial belt is small; the **mid-latitude/temperate belt is the widest** band of the three main zones.\n" +
        "- Read the question's exact zone names and order them by band width — the trap is the ordering, not the geography.",
      authoredExample: {
        prompt:
          "Arrange by latitudinal extent (narrowest first): a narrow equatorial belt, the wide mid-latitude belt, the subarctic belt.",
        steps: [
          "The equatorial belt hugs the Equator and is the narrowest.",
          "The subarctic belt is a moderate band near the polar circle.",
          "The mid-latitude belt spans the widest range of degrees.",
        ],
        answer: "Equatorial < Subarctic < Mid-latitude (narrowest to widest).",
      },
      practiceSet: [
        { prompt: "Which of the main heat zones is the widest band?", answer: "The mid-latitude (temperate) zone" },
        { prompt: "The torrid (tropical) zone lies between which latitudes?", answer: "0 deg and 23.5 deg" },
        { prompt: "'Arrange zones by latitudinal extent' is really arranging by what?", answer: "The width of each latitude band" },
      ],
      pyqExampleId: "99e0ba26-e38b-4179-a409-662c837ffc0c", // arrange zones ascending by latitudinal extent
      traps: [
        {
          title: "Read the exact zone names before ordering",
          body:
            "These 'arrange the zones' questions give a fixed coded order (e.g. 1-4-2-3). The mistake is mis-ordering the band widths, not the geography — line up each named zone with its degree-span and sort carefully.",
        },
      ],
    },
  ],
};
