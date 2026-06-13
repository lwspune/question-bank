import type { SubtopicNote } from "@/app/notes/_types";

export const LANDFORMS_MASS_MOVEMENTS_NOTE: SubtopicNote = {
  subtopicName: "Landforms and Mass Movements",
  title: "Landforms and Mass Movements",
  oneLineDefinition:
    "Each gradational agent — rivers, glaciers, wind, the sea and underground water — carves its own signature erosional and depositional landforms, while gravity drives rock and soil downslope as mass movements.",
  whyItMatters:
    "15 PYQs. The skill is matching a landform to its AGENT: oxbow lake → river, drumlin → glacier, barchan → wind, sea stack → waves, stalactite → underground water. Most traps are 'which is NOT a depositional/erosional feature' or 'which agent made this' — learn the landform-by-agent table and the mass-movement triggers.",
  concepts: [
    // 1. mountains & plateaus (reference)
    {
      kind: "reference" as const,
      slug: "mountains-plateaus",
      name: "Mountains and plateaus by origin",
      intuition:
        "Mountains are classified by HOW they formed. Fold mountains are crumpled at convergent boundaries (Himalayas, Alps, Andes, Rockies). Block mountains are uplifted between faults. Volcanic mountains are built of erupted material (Fuji). Residual mountains are the worn-down stumps of old ranges (Aravalli).",
      definition:
        "- **Fold mountains** — buckled by compression at convergent boundaries: **Himalayas, Alps, Andes, Rockies**.\n" +
        "- **Block mountains** — uplifted between faults (horst): Sierra Nevada, Vosges, Black Forest.\n" +
        "- **Volcanic mountains** — built of lava/ash: **Mount Fuji**, Vesuvius, Mauna Loa.\n" +
        "- **Residual mountains** — erosion remnants of old ranges: Aravalli (among the world's oldest).\n" +
        "- **Plateaus**: intermontane (Tibet), piedmont (Patagonia), volcanic/lava (Deccan).",
      table: {
        columns: ["Mountain type", "Origin", "Example"],
        rows: [
          {
            cells: ["Fold", "Compression at convergent boundary", "Himalayas, Alps, Andes, Rockies"],
            noteAmber: "NDA 2023 — Alps, Andes, Rockies are fold mountains; Mt. Fuji is NOT.",
          },
          { cells: ["Block", "Faulting (uplifted block)", "Sierra Nevada, Black Forest"] },
          { cells: ["**Volcanic**", "Lava / ash build-up", "**Mount Fuji**, Vesuvius"] },
          { cells: ["Residual", "Erosion remnant", "Aravalli"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is NOT a fold mountain: Mt. Fuji, Alps, Andes, Rockies?",
        steps: [
          "Alps, Andes and Rockies are all great fold-mountain belts.",
          "Mt. Fuji is built of erupted lava and ash — a volcanic mountain.",
        ],
        answer: "Mt. Fuji.",
      },
      practiceSet: [
        { prompt: "The Himalayas are which mountain type?", answer: "Fold mountains" },
        { prompt: "Mount Fuji is which mountain type?", answer: "Volcanic" },
        { prompt: "The Aravalli range is which type?", answer: "Residual" },
      ],
      pyqExampleId: "85b70048-6b27-4fa1-944f-1bb9288f52fb", // NOT fold mountain = Fuji
    },

    // 2. fluvial landforms (reference + diagram)
    {
      kind: "reference" as const,
      slug: "fluvial-landforms",
      name: "River (fluvial) landforms",
      intuition:
        "A river erodes in its youthful, steep upper course and deposits in its old, flat lower course. Upstream it cuts gorges, canyons and potholes; as it matures it swings into meanders that pinch off into oxbow lakes; near the sea it dumps its load as levees and a delta. Match the feature to the stage and the agent is obvious.",
      definition:
        "- **Erosional** (upper course): V-shaped valley, **gorge**, **canyon** (a deep valley with steep step-like sides), potholes, waterfalls.\n" +
        "- **Depositional** (lower course): **oxbow lake** (cut-off meander — needs both erosion AND deposition), natural levee, floodplain, **delta**.\n" +
        "- Delta features: **chars** are the uplands/islands of a delta region; Paradeep Port sits on the **Mahanadi** delta.",
      visualizationSlug: "esl-fluvial-landforms",
      table: {
        columns: ["Landform", "Type", "Where"],
        rows: [
          { cells: ["Gorge / Canyon", "Erosional", "Upper course"] },
          {
            cells: ["**Oxbow lake**", "Erosion + deposition", "Middle/lower course"],
            noteAmber: "NDA 2021 — an oxbow lake results from both erosion and deposition by a river.",
          },
          { cells: ["Delta, levee", "Depositional", "Lower course / mouth"] },
        ],
      },
      selfCheckExample: {
        prompt: "A deep valley with steep, step-like sides is called a?",
        steps: [
          "A U-shaped valley is glacial; a gorge is narrow and steep-walled.",
          "A very deep valley with steep step-like sides is a canyon.",
        ],
        answer: "A canyon.",
      },
      practiceSet: [
        { prompt: "A cut-off meander loop becomes a?", answer: "Oxbow lake" },
        { prompt: "Paradeep Port lies on the delta of which river?", answer: "Mahanadi" },
        { prompt: "The uplands of a delta region are called?", answer: "Chars" },
      ],
      pyqExampleId: "cdfd89a0-38da-4908-9a51-4d811024d6ab", // oxbow lake = erosion + deposition
    },

    // 3. glacial landforms (reference)
    {
      kind: "reference" as const,
      slug: "glacial-landforms",
      name: "Glacial landforms",
      intuition:
        "Moving ice grinds out its own set of features. It scoops armchair hollows (cirques) and U-shaped valleys, and it dumps debris as moraines, eskers and drumlins. The drumlin — a smooth, egg-shaped mound of glacial till — gives a field of them the nickname 'basket-of-eggs' topography.",
      definition:
        "- **Erosional**: **cirque** (armchair hollow), U-shaped valley, arete, horn, fjord.\n" +
        "- **Depositional**: **moraine** (rock debris), **esker** (winding ridge), **drumlin** (smooth egg-shaped mound of till).\n" +
        "- A field of drumlins looks like a **'basket-of-eggs' topography**.",
      table: {
        columns: ["Landform", "Type"],
        rows: [
          { cells: ["Cirque, U-valley, fjord", "Erosional"] },
          {
            cells: ["**Drumlin**", "Depositional ('basket-of-eggs')"],
            noteAmber: "NDA 2021 — basket-of-eggs topography = drumlins.",
          },
          { cells: ["Esker, moraine", "Depositional"] },
        ],
      },
      selfCheckExample: {
        prompt: "'Basket-of-eggs' topography is made of which glacial landform?",
        steps: [
          "Eskers are ridges; cirques are hollows; moraines are debris piles.",
          "Smooth egg-shaped mounds in a field describe drumlins.",
        ],
        answer: "Drumlins.",
      },
      practiceSet: [
        { prompt: "An armchair-shaped glacial hollow is a?", answer: "Cirque" },
        { prompt: "Egg-shaped depositional mounds of till are?", answer: "Drumlins" },
      ],
      pyqExampleId: "5916ef58-1c3e-40d4-8f52-486976c3fa5a", // basket-of-eggs = drumlins
    },

    // 4. arid / aeolian landforms (reference)
    {
      kind: "reference" as const,
      slug: "arid-aeolian-landforms",
      name: "Desert (arid / wind) landforms",
      intuition:
        "In deserts, wind and rare flash floods are the sculptors. Wind piles sand into crescent dunes called barchans, and the dry beds of short-lived desert lakes harden into flat playas. These are ARID landforms — a category of their own, not fluvial or glacial.",
      definition:
        "- **Barchan** — a crescent-shaped sand dune formed by wind blowing steadily from ONE direction; its horns point DOWNWIND (the way the wind blows), and the windward slope is gentle (not steep).\n" +
        "- **Playa** — the fine-grained bed of an ephemeral (temporary) desert lake; it occupies the lowest part of a basin (bolson). It is an **arid** landform.\n" +
        "- Other wind features: yardangs, mushroom (pedestal) rocks.",
      table: {
        columns: ["Landform", "What it is"],
        rows: [
          {
            cells: ["**Barchan**", "Crescent wind-blown dune; horns point downwind"],
            noteAmber: "NDA 2024 — barchan is a crescent dune from a one-direction wind (only that claim is fully correct).",
          },
          {
            cells: ["**Playa**", "Bed of a temporary desert lake (arid landform)"],
            noteAmber: "NDA 2021 & 2024 — playa = fine-grained ephemeral-lake bed in a bolson; an ARID landform.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "The fine-grained bed of an ephemeral desert lake is called a?",
        steps: [
          "A drumlin is glacial; a natural levee is fluvial.",
          "The dry bed of a temporary desert lake is a playa.",
        ],
        answer: "A playa.",
      },
      practiceSet: [
        { prompt: "A crescent-shaped sand dune is a?", answer: "Barchan" },
        { prompt: "A playa belongs to which landform category?", answer: "Arid (desert) landforms" },
      ],
      pyqExampleId: "6d429719-14ce-42a2-bb91-9ae782d70139", // playa = ephemeral lake bed
      traps: [
        {
          title: "A playa is an ARID landform, not fluvial",
          body:
            "Because a playa holds water occasionally, students file it under fluvial/lake landforms. It is classified as an **arid** landform — it occupies the floor of a desert basin (bolson).",
        },
      ],
    },

    // 5. coastal & karst landforms (reference)
    {
      kind: "reference" as const,
      slug: "coastal-karst-landforms",
      name: "Coastal and karst landforms",
      intuition:
        "Waves attack a coast (erosion) and also build it up (deposition). Erosion cuts notches, sea caves, arches, stacks and cliffs; deposition builds beaches, spits, bars and tombolos. Separately, underground water dissolving limestone (karst) hangs stalactites from cave roofs and grows stalagmites from the floor.",
      definition:
        "- **Coastal EROSIONAL**: notch, sea cave, **sea arch**, **stack**, **cliff**, hook (a stack is erosional — wave-cut).\n" +
        "- **Coastal DEPOSITIONAL**: beach, **spit**, **sand bar**, **tombolo**.\n" +
        "- **Karst (underground water)**: dissolving limestone forms caves, sinkholes, and the deposits **stalactites** (from the roof), **stalagmites** (from the floor) and pillars.",
      table: {
        columns: ["Landform", "Type / agent"],
        rows: [
          {
            cells: ["**Stack**, sea arch, cliff, notch", "Coastal EROSIONAL (waves)"],
            noteAmber: "NDA 2018 — a stack is erosional, NOT a depositional feature.",
          },
          { cells: ["Spit, bar, tombolo, beach", "Coastal DEPOSITIONAL"] },
          {
            cells: ["**Stalactite, stalagmite, pillar**", "Underground water (karst)"],
            noteAmber: "NDA 2019 — stalactites/stalagmites are deposits of underground water.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which is NOT a coastal DEPOSITIONAL feature: tombolo, sand bar, stack, spit?",
        steps: [
          "Tombolo, sand bar and spit are all built by deposition.",
          "A stack is a wave-cut erosional pillar.",
        ],
        answer: "Stack (it is erosional).",
      },
      practiceSet: [
        { prompt: "Stalactites and stalagmites are deposited by which agent?", answer: "Underground water (karst)" },
        { prompt: "Is a sea stack erosional or depositional?", answer: "Erosional" },
        { prompt: "Name one coastal depositional feature.", answer: "Spit / sand bar / tombolo / beach" },
      ],
      pyqExampleId: "5b6e8f65-c465-44a3-a853-97e0f24b5629", // stalactite/stalagmite = underground water
      traps: [
        {
          title: "Stack = erosional",
          body:
            "A sea **stack** is an isolated pillar left after waves erode an arch — it is EROSIONAL. Don't group it with depositional features like spits, bars and tombolos.",
        },
      ],
    },

    // 6. mass movements (formula)
    {
      kind: "formula" as const,
      slug: "mass-movements",
      name: "Mass movements",
      intuition:
        "When gravity pulls weathered rock and soil downslope, that is mass movement (mass wasting). It ranges from fast and violent — avalanches of snow and ice, landslides, rockfalls — to slow and quiet creep. Heavy rain and earthquakes are the usual triggers, and clay-rich, steep slopes are the most prone.",
      definition:
        "- **Avalanche** — torrents of snow and ice roaring down a steep mountainside; a mix of falling, rolling, sliding and flowing; hazardous to skiers/mountaineers.\n" +
        "- **Landslide** — rapid downslope slip; favoured by STEEP slopes, **clay-rich** soil, and **earthquake** or heavy-rain triggers (NOT gentle slopes).\n" +
        "- A boulder loosened by rain rolling downhill involves **mass wasting + erosion** (it is moved AND worn).\n" +
        "- Slower forms: soil creep, solifluction, mudflow, slump.",
      authoredExample: {
        prompt:
          "Torrents of snow and ice roar down a steep slope, mixing falling, rolling, sliding and flowing — dangerous to mountaineers. What phenomenon is this?",
        steps: [
          "Snow + ice + steep slope + mixed motion is the key combination.",
          "A landslide/rockslide is rock, not snow; an earthflow is slow mud.",
          "Fast-moving snow and ice down a mountainside is an avalanche.",
        ],
        answer: "An avalanche.",
      },
      selfCheckExample: {
        prompt:
          "Landslides: (1) occur only on gentle slopes; (2) occur in clay-rich soil; (3) are triggered by earthquakes. Which are correct?",
        steps: [
          "Landslides need STEEP slopes, so (1) is false.",
          "Clay-rich soil is slip-prone — (2) true.",
          "Earthquakes shake slopes loose — (3) true.",
        ],
        answer: "Statements 2 and 3.",
      },
      practiceSet: [
        { prompt: "Fast-moving snow and ice down a steep slope is a?", answer: "Avalanche" },
        { prompt: "Do landslides occur on gentle or steep slopes?", answer: "Steep" },
        { prompt: "Name one trigger of landslides.", answer: "Earthquake (or heavy rain)" },
      ],
      pyqExampleId: "21905186-64c7-4330-9ed5-c18c0508fb70", // avalanche
      traps: [
        {
          title: "Landslides need STEEP slopes",
          body:
            "A trap states landslides happen 'only on gentle slopes during rain'. Wrong — they need STEEP slopes. The true conditions are clay-rich soil and an earthquake/rain trigger.",
        },
      ],
    },
  ],
};
