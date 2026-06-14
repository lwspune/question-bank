import type { SubtopicNote } from "@/app/notes/_types";

export const CURRENTS_NOTE: SubtopicNote = {
  subtopicName: "Ocean Currents",
  title: "Ocean Currents",
  oneLineDefinition:
    "Ocean currents are great steady flows of surface water, driven by wind, the Coriolis force, gravity and solar heating — warm currents carry tropical water poleward, cold currents carry polar water toward the equator.",
  whyItMatters:
    "8 PYQs — the most-tested subtopic in the chapter, and almost every question is a WARM-vs-COLD recall list (including 'which is NOT a Pacific current' — Agulhas is the Indian-Ocean odd-one-out). The marks are pure memorisation: learn which named currents are warm and which are cold (and which ocean each belongs to), plus the four forces that drive currents (Coriolis, gravity, solar heating, wind). Get the cold-current list cold and you bank five marks.",
  concepts: [
    // 1. what drives currents (FOUNDATION, formula)
    {
      kind: "formula" as const,
      slug: "currents-drivers",
      name: "What drives ocean currents",
      intuition:
        "A current is a river within the sea — a steady, large-scale flow of surface water. Four things set it moving and steer it: the WIND drags the surface along, the CORIOLIS force (Earth's spin) bends the flow, GRAVITY and pressure differences pull it, and uneven SOLAR HEATING sets up the temperature and density contrasts that start the whole circulation. Together these forces organise the surface ocean into huge looping gyres.",
      definition:
        "The factors that influence ocean currents (ALL of these):\n" +
        "- **Wind** — the prevailing winds drag the surface water along (the primary driver of surface currents).\n" +
        "- **Coriolis force** — Earth's rotation deflects currents (right in the Northern Hemisphere, left in the Southern).\n" +
        "- **Gravity** — pulls water down slopes of the sea surface set up by piling and pressure differences.\n" +
        "- **Solar heating** — uneven heating creates temperature and density differences that drive the circulation.\n" +
        "The result is a system of looping **gyres** that move warm water poleward and cold water equatorward.",
      authoredExample: {
        prompt:
          "Which of these influence ocean currents: Coriolis force, gravity, solar heating, wind?",
        steps: [
          "Wind drags the surface; solar heating sets up density differences; gravity pulls water down surface slopes.",
          "The Coriolis force from Earth's rotation deflects the flow.",
          "Every one of the four plays a part.",
        ],
        answer: "All four — Coriolis force, gravity, solar heating and wind.",
      },
      selfCheckExample: {
        prompt: "Name the rotation-based force that deflects ocean currents, and which way it deflects them in the Northern Hemisphere.",
        steps: [
          "The deflecting force that arises from the Earth's spin is the Coriolis force.",
          "In the Northern Hemisphere it deflects moving water to the right.",
        ],
        answer: "The Coriolis force; it deflects to the right in the Northern Hemisphere.",
      },
      practiceSet: [
        { prompt: "Name the four factors that influence ocean currents.", answer: "Coriolis force, gravity, solar heating, and wind" },
        { prompt: "What is the primary driver of SURFACE currents?", answer: "Prevailing winds" },
        { prompt: "Which force, from Earth's rotation, bends the currents?", answer: "The Coriolis force" },
      ],
      pyqExampleId: "2b79da6c-c630-4659-a799-28728c22bb90", // all four factors influence currents
      traps: [
        {
          title: "It is all four, not a subset",
          body:
            "Coriolis, gravity, solar heating AND wind ALL influence currents. The trap offers tempting two- or three-factor combinations — the complete answer includes every one.",
        },
      ],
    },

    // 2. warm vs cold currents (reference)
    {
      kind: "reference" as const,
      slug: "warm-cold-currents",
      name: "Warm and cold ocean currents",
      intuition:
        "This single table is the most-tested thing in the chapter. WARM currents flow AWAY from the equator (carrying tropical water poleward, usually along the western side of an ocean basin and the east coast of continents); COLD currents flow TOWARD the equator (carrying polar water, usually along the eastern side of a basin and the west coast of continents). Memorise the named lists — the NDA asks 'which is/is-not a cold current' over and over.",
      definition:
        "Learn these named currents by temperature:\n" +
        "- **WARM currents** (tropical water moving poleward): **Gulf Stream**, **Kuroshio** (Japan Current), **North Atlantic Drift**, **Alaska Current**, **Agulhas Current**, **Mozambique Current**, **East Australian Current**, **Brazil Current**, **Caribbean Current**.\n" +
        "- **COLD currents** (polar water moving equatorward): **Labrador**, **Oyashio** (Kurile), **California**, **Canary**, **Benguela**, **Humboldt (Peru)**, **West Australian**, **Falkland**, **West Wind Drift**, **South Atlantic Drift**.\n" +
        "- The **Benguela** current is cold, flows in the Atlantic, runs South→North, and cools the **South-West African** coast (NOT North Africa).\n" +
        "- Pacific Ocean currents include **Oyashio, Alaska, California, Kuroshio, Humboldt** — but **Agulhas** is an INDIAN Ocean current, not Pacific.",
      table: {
        columns: ["Current", "Warm / Cold", "Note"],
        rows: [
          { cells: ["Gulf Stream, Kuroshio", "**Warm**", "Western-boundary, poleward"] },
          {
            cells: ["Alaska Current", "**Warm**", "Pacific — a classic 'odd one out' in cold-current lists"],
            noteAmber: "NDA 2025 — Alaska Current is WARM, not cold.",
          },
          {
            cells: ["Agulhas, Mozambique, East Australian", "**Warm**", "Agulhas/Mozambique = Indian Ocean"],
            noteAmber: "NDA 2023/2025 — East Australian is WARM (West Australian is cold).",
          },
          {
            cells: ["Kuroshio (Japan)", "**Warm**", "Often hidden in an all-cold list"],
            noteAmber: "NDA 2019 — Kuroshio is the warm one among Canary/California/Oyashio.",
          },
          { cells: ["Labrador, Oyashio", "**Cold**", "Polar water, equatorward"] },
          { cells: ["California, Canary, Humboldt (Peru)", "**Cold**", "Eastern-boundary, west coasts"] },
          {
            cells: ["**Benguela**", "**Cold**", "Atlantic; S→N; cools SW Africa, not North Africa"],
            noteAmber: "NDA 2024 — Benguela does NOT influence North Africa's climate (it cools SW Africa).",
          },
          {
            cells: ["West Wind Drift, South Atlantic Drift", "**Cold**", "West Wind Drift circles Antarctica"],
            noteAmber: "NDA 2025 — West Wind Drift is COLD; North Atlantic Drift is WARM.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which one of these is NOT a cold ocean current: Canary, California, Kuroshio, Oyashio?",
        steps: [
          "Canary, California and Oyashio all carry cold polar water equatorward.",
          "Kuroshio (the Japan Current) is a WARM western-boundary current.",
        ],
        answer: "Kuroshio (it is warm).",
      },
      practiceSet: [
        { prompt: "Is the Alaska Current warm or cold?", answer: "Warm" },
        { prompt: "Is the North Atlantic Drift warm or cold?", answer: "Warm" },
        { prompt: "Is the West Wind Drift warm or cold?", answer: "Cold" },
        { prompt: "Which Australian current is cold — East or West?", answer: "West Australian (East Australian is warm)" },
        { prompt: "Which coast does the cold Benguela current cool?", answer: "South-West Africa (NOT North Africa)" },
      ],
      pyqExampleId: "08970b4f-6790-4a56-ad29-03dcfe2fd6d9", // NOT a cold current = Kuroshio
      traps: [
        {
          title: "Alaska and Kuroshio are WARM — the favourite traps",
          body:
            "Both sit happily inside cold-current lists to fool you. The **Alaska Current** and the **Kuroshio (Japan Current)** are WARM. North Atlantic Drift is also warm; West Wind Drift is cold.",
        },
        {
          title: "East Australian (warm) vs West Australian (cold)",
          body:
            "Same continent, opposite temperatures. The **East** Australian Current is WARM; the **West** Australian Current is COLD. The eastern boundary of a basin runs cold, the western runs warm.",
        },
        {
          title: "Benguela cools SW Africa, not North Africa",
          body:
            "The Benguela is cold, Atlantic, and flows south→north — all true — but it cools the **South-West** African coast. A statement saying it influences NORTH Africa's climate is the wrong one.",
        },
      ],
    },
  ],
};
