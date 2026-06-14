import type { SubtopicNote } from "@/app/notes/_types";

export const WAVES_SEAFLOOR_NOTE: SubtopicNote = {
  subtopicName: "Ocean Waves and Sea-Floor Topography",
  title: "Ocean Waves and Sea-Floor Topography",
  oneLineDefinition:
    "The ocean basin is built in zones — shelf, slope, abyssal plain, trench and mid-ocean ridge — and across its surface waves carry energy (not water) from the wind that raised them.",
  whyItMatters:
    "5 PYQs, leaning MODERATE. Two ideas earn the marks: the named sea-floor zones (and which one is deepest — the trench, e.g. the Mariana Trench in the Western Pacific), and what a wave really is — wind-built, energy-carrying, with its height set by wind speed, duration and fetch. The salinity/temperature 'cline' words (halocline, thermocline, pycnocline) are a recurring single-fact trap.",
  concepts: [
    // 1. sea-floor topography (FOUNDATION-ish, formula + diagram)
    {
      kind: "formula" as const,
      slug: "seafloor-zones",
      name: "The zones of the ocean floor",
      intuition:
        "Walk off the beach and into the sea and the floor steps down in stages. First a gentle shallow shelf, then a steep drop, then a flat deep plain, with the deepest scars of all — the trenches — and long underwater mountain chains — the ridges. Each zone has a name the NDA likes to test, and the single most important fact is that the OCEANIC TRENCH is the deepest part of the ocean.",
      definition:
        "Sea-floor zones, shore outward:\n" +
        "- **Continental shelf** — the shallow, gently-sloping submerged edge of the continent (the most biologically rich zone).\n" +
        "- **Continental slope** — the steep drop from the shelf edge down to the deep floor.\n" +
        "- **Continental rise** — a gentler apron of sediment at the foot of the slope.\n" +
        "- **Abyssal plain** — the broad, flat, very deep ocean floor.\n" +
        "- **Oceanic trench** — a long, narrow, V-shaped DEEPEST gash, formed at subduction zones; associated with active volcanoes and strong earthquakes. The **Mariana Trench** (Western Pacific) is the deepest point on Earth.\n" +
        "- **Mid-ocean ridge** — a submarine mountain chain at divergent boundaries (sea-floor spreading). Islands like the **Azores, Ascension and Tristan da Cunha** sit on the Mid-Atlantic Ridge; **Hawaii** does NOT (it is a hot-spot island, away from any ridge).",
      visualizationSlug: "ocn-seafloor-profile",
      authoredExample: {
        prompt:
          "Arrange these ocean-floor zones from the coast outward: abyssal plain, continental shelf, continental slope.",
        steps: [
          "The shelf is the shallow submerged continental edge nearest the coast.",
          "Beyond the shelf edge the floor drops steeply down the slope.",
          "The slope levels out onto the deep, flat abyssal plain.",
        ],
        answer: "Continental shelf → Continental slope → Abyssal plain.",
      },
      selfCheckExample: {
        prompt:
          "Statements about oceanic trenches: (1) they are significant in the study of plate movements; (2) they are associated with active volcanoes and strong earthquakes. Which are correct?",
        steps: [
          "Trenches form where one plate subducts beneath another — so they are central to studying plate movements.",
          "Subduction zones are exactly where volcanoes and major earthquakes cluster.",
        ],
        answer: "Both statements are correct.",
      },
      practiceSet: [
        { prompt: "Which is the deepest zone of the ocean floor?", answer: "The oceanic trench" },
        { prompt: "In which ocean is the Mariana Trench located?", answer: "Western Pacific Ocean" },
        { prompt: "Which volcanic island is NOT on a mid-ocean ridge: Azores, Ascension, Hawaii, Tristan da Cunha?", answer: "Hawaii (it is a hot-spot island)" },
        { prompt: "Name the shallow, gently-sloping submerged continental edge.", answer: "Continental shelf" },
      ],
      pyqExampleId: "55a95db9-d5ec-4c2c-8a4b-1871328c3a16", // trenches: both statements correct
      traps: [
        {
          title: "Hawaii is NOT a mid-ocean-ridge island",
          body:
            "Azores, Ascension and Tristan da Cunha all straddle the Mid-Atlantic Ridge. **Hawaii** is the odd one out — it is built over a mantle HOT SPOT in the middle of the Pacific plate, far from any ridge.",
        },
        {
          title: "Trench = deepest, not the shelf",
          body:
            "The continental shelf is the SHALLOWEST zone; the OCEANIC TRENCH is the deepest. Don't let 'continental' tempt you into picking the shelf as deepest.",
        },
      ],
    },

    // 2. salinity/temperature clines (reference)
    {
      kind: "reference" as const,
      slug: "ocean-clines-zones",
      name: "Salinity, temperature and depth zones",
      intuition:
        "As you descend through the ocean, properties change fastest across thin transition layers called 'clines'. The exam tests which property each cline tracks: a HALOcline is a sharp change in SALT (halo = salt), a THERMOcline a sharp change in TEMPERATURE, and a PYCNOcline a sharp change in DENSITY. The sunlit surface layer is the photic zone.",
      definition:
        "The vertical transition layers and zones:\n" +
        "- **Halocline** — the layer of rapid SALINITY change (the answer to 'sharp salinity change with depth').\n" +
        "- **Thermocline** — the layer of rapid TEMPERATURE change.\n" +
        "- **Pycnocline** — the layer of rapid DENSITY change.\n" +
        "- **Photic zone** — the sunlit upper layer where light penetrates (not a 'cline' — it is a light zone).",
      table: {
        columns: ["Layer / zone", "What changes sharply"],
        rows: [
          {
            cells: ["**Halocline**", "Salinity (salt content)"],
            noteAmber: "NDA 2018 — 'sharp salinity change in the vertical section' = halocline.",
          },
          { cells: ["Thermocline", "Temperature"] },
          { cells: ["Pycnocline", "Density"] },
          { cells: ["Photic zone", "(sunlit surface layer — light, not a cline)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which layer marks a sharp change in TEMPERATURE with depth?",
        steps: [
          "Halo = salt, pycno = density, photic = light.",
          "Thermo = temperature — the thermocline.",
        ],
        answer: "The thermocline.",
      },
      practiceSet: [
        { prompt: "Sharp change in salinity with depth is the?", answer: "Halocline" },
        { prompt: "Sharp change in density with depth is the?", answer: "Pycnocline" },
        { prompt: "The sunlit upper ocean layer is the?", answer: "Photic zone" },
      ],
      pyqExampleId: "86b80b7d-d7fd-4ada-afcd-291dd1a704e2", // halocline = sharp salinity change
      traps: [
        {
          title: "Match the prefix to the property",
          body:
            "These look alike but the Greek prefix gives it away: **halo**cline = salt, **thermo**cline = heat, **pycno**cline = density. The **photic** zone is a light zone, not a cline at all.",
        },
      ],
    },

    // 3. ocean waves (formula, mechanism)
    {
      kind: "formula" as const,
      slug: "ocean-waves",
      name: "What an ocean wave is",
      intuition:
        "A wave does NOT carry water across the ocean — it carries ENERGY. The water itself just bobs up and down in a circle as the wave passes through. The wind makes the wave, and how big a wave gets depends on three things: how hard the wind blows (speed), how long it blows (duration), and how far the open water stretches (fetch). A wave's energy is huge — it stays nearly intact across the whole deep ocean and only spends itself when it crashes on a shore.",
      definition:
        "Key facts about sea waves:\n" +
        "- A wave transmits **energy**, not water; the water particles move in small circular orbits.\n" +
        "- **Wave height** is determined by wind **speed**, wind **duration**, and **fetch** (the open distance over which the wind blows).\n" +
        "- A wave's **energy is proportional to the SQUARE of its height** — double the height, four times the energy.\n" +
        "- Waves **retain most of their energy** as they travel across the deep ocean, losing it only when they break against a coast.",
      authoredExample: {
        prompt:
          "Two waves cross the open ocean; wave B is twice as tall as wave A. How does wave B's energy compare?",
        steps: [
          "Wave energy is proportional to the square of the wave height.",
          "Wave B's height is 2 times wave A's height.",
          "So wave B's energy is 2 squared = 4 times that of wave A.",
        ],
        answer: "Wave B carries about four times the energy of wave A.",
      },
      selfCheckExample: {
        prompt:
          "Statement: 'The height of an ocean wave is set by wind speed, wind duration and fetch.' Is this correct?",
        steps: [
          "These are exactly the three controls on wave height.",
          "A stronger, longer-lasting wind over a greater open distance builds taller waves.",
        ],
        answer: "Correct.",
      },
      practiceSet: [
        { prompt: "What does an ocean wave actually transmit — water or energy?", answer: "Energy" },
        { prompt: "Name the three factors that determine wave height.", answer: "Wind speed, wind duration, and fetch" },
        { prompt: "Wave energy is proportional to which power of the wave height?", answer: "The square (height squared)" },
      ],
      pyqExampleId: "163f0e89-017f-4a39-a06d-c05417a5c4a5", // three sea-wave statements all correct
      traps: [
        {
          title: "Waves carry energy, not water",
          body:
            "A common wrong belief is that waves push water across the ocean. They don't — the WATER stays put (orbiting in place) while the ENERGY moves. The wave 'travels'; the water does not.",
        },
        {
          title: "Waves keep their energy across the deep ocean",
          body:
            "It's tempting to think a wave fades as it crosses the ocean. In deep water it loses very little — it keeps MOST of its energy and only releases it when it breaks on a shore.",
        },
      ],
    },
  ],
};
