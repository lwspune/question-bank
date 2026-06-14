import type { SubtopicNote } from "@/app/notes/_types";

export const MINERALS_MINING_NOTE: SubtopicNote = {
  subtopicName: "Minerals and Mining",
  title: "Minerals and Mining",
  oneLineDefinition:
    "The mineral-to-state and mine-to-mineral pairs of India, the metallic vs non-metallic split, and the coal and copper belts.",
  whyItMatters:
    "About 14 PYQs, skewing HARD because so many are four-way match-the-list questions (place to mineral, mineral to leading state). The payoff is pure recall: a handful of mine-to-mineral anchors (Zawar zinc, Bailadila iron, Ghatsila copper, Malanjkhand copper), the leading-producer states, and the coalfield geography. Drill the anchor pairs and the match-lists become solvable by elimination.",
  concepts: [
    // 1. FOUNDATION — metallic vs non-metallic (formula, reasoning)
    {
      kind: "formula" as const,
      slug: "mineral-classification",
      name: "Classifying minerals — metallic, non-metallic, energy",
      intuition:
        "Minerals split into broad classes, and the exam tests the boundary. METALLIC minerals yield metals on smelting — iron, copper, bauxite (aluminium), manganese, gold. NON-METALLIC minerals contain no metal you extract for use — mica, limestone, gypsum, dolomite. A separate ENERGY/fuel class covers coal and petroleum. The classic question hands you a list with one impostor; knowing which class each belongs to is the whole answer.",
      definition:
        "- **Metallic** — yield a metal: **iron ore, copper, bauxite, manganese, gold, zinc, nickel**.\n" +
        "- **Non-metallic** — no extractable metal: **mica, limestone, gypsum, dolomite, graphite, fluorspar**.\n" +
        "- **Energy / fuel minerals** — coal, petroleum, natural gas, uranium.\n" +
        "- **Mica** is the staple non-metallic answer; it is used mainly in the **electrical and electronics** industry (an excellent insulator).",
      authoredExample: {
        prompt:
          "Which one of these is a NON-metallic mineral: iron, mica, copper, bauxite?",
        steps: [
          "Iron, copper and bauxite all yield metals on smelting — they are metallic.",
          "Mica is a sheet silicate used as an insulator; no metal is extracted from it.",
        ],
        answer: "Mica.",
      },
      selfCheckExample: {
        prompt: "In which industry is mica mainly used?",
        steps: [
          "Mica is a superb electrical insulator that resists heat.",
          "That makes it valuable in electrical and electronic goods, not in food or aluminium making.",
        ],
        answer: "The electrical and electronic industries.",
      },
      practiceSet: [
        { prompt: "Is bauxite metallic or non-metallic?", answer: "Metallic (yields aluminium)" },
        { prompt: "Name a non-metallic mineral.", answer: "Mica (also limestone, gypsum)" },
        { prompt: "Mica's main industrial use?", answer: "Electrical and electronics (insulation)" },
      ],
      pyqExampleId: "93a7b8af-e161-4f99-b11a-d72962d23a67", // non-metallic = mica
    },

    // 2. mineral -> leading state (REFERENCE)
    {
      kind: "reference" as const,
      slug: "mineral-leading-states",
      name: "Leading producer states by mineral",
      intuition:
        "Half the chapter's match-lists are 'mineral → leading state' grids. A core set of anchors solves most of them: Madhya Pradesh leads manganese, Rajasthan leads gypsum (and is the copper state with MP), Odisha leads magnetite/chromite, Karnataka leads limestone and iron. Memorise the leading state for the half-dozen most-tested minerals and the four-way codes fall by elimination.",
      definition:
        "- **Manganese → Madhya Pradesh** (Balaghat belt).\n" +
        "- **Gypsum → Rajasthan**.\n" +
        "- **Limestone → Karnataka** (among the leaders).\n" +
        "- **Magnesite → Uttarakhand**.\n" +
        "- **Copper → Rajasthan and Madhya Pradesh** (Khetri in Rajasthan, Malanjkhand in MP) per the Ministry of Mines.\n" +
        "- **Graphite → Odisha/Arunachal**; **Fluorspar → Gujarat**; **Nickel → Odisha**.",
      table: {
        columns: ["Mineral", "Leading state(s)"],
        rows: [
          {
            cells: ["**Manganese**", "Madhya Pradesh"],
            noteAmber: "NDA 2023 — MP is the leading manganese producer.",
          },
          {
            cells: ["**Copper**", "Rajasthan and Madhya Pradesh"],
            noteAmber: "NDA 2025 — per the Ministry of Mines, Rajasthan + MP.",
          },
          { cells: ["Gypsum", "Rajasthan"] },
          { cells: ["Magnesite", "Uttarakhand"] },
          { cells: ["Limestone", "Karnataka"] },
        ],
      },
      selfCheckExample: {
        prompt: "According to the Ministry of Mines, which two states are India's major copper producers?",
        steps: [
          "Copper in India centres on Khetri (Rajasthan) and Malanjkhand (Madhya Pradesh).",
          "So the leading pair is Rajasthan and Madhya Pradesh.",
        ],
        answer: "Rajasthan and Madhya Pradesh.",
      },
      practiceSet: [
        { prompt: "Leading manganese state?", answer: "Madhya Pradesh" },
        { prompt: "Major copper producers (Ministry of Mines)?", answer: "Rajasthan and Madhya Pradesh" },
        { prompt: "Leading gypsum state?", answer: "Rajasthan" },
      ],
      pyqExampleId: "a4b6dd8a-3234-45d3-a445-36861eb8e6af", // manganese leading = MP
    },

    // 3. mine -> mineral pairs (REFERENCE)
    {
      kind: "reference" as const,
      slug: "mine-mineral-pairs",
      name: "Mine and place to mineral pairs",
      intuition:
        "Specific mines anchor the place-to-mineral match-lists. The most-tested pairs: Zawar (Rajasthan) = zinc, Bailadila (Chhattisgarh) = iron ore, Ghatsila (Jharkhand) = copper, Malanjkhand (MP) = copper, Khetri = copper, Kudremukh = IRON (not bauxite — the classic trap), Lakwa (Assam) = petroleum. Lock these anchors and the four-way codes are solvable.",
      definition:
        "- **Zawar (Rajasthan) → Zinc**; **Bailadila (Chhattisgarh) → Iron ore**; **Ghatsila (Jharkhand) → Copper**.\n" +
        "- **Malanjkhand (MP) → Copper**; **Khetri (Rajasthan) → Copper**.\n" +
        "- **Kudremukh (Karnataka) → Iron ore** (the trap pairs it wrongly with bauxite).\n" +
        "- **Lakwa (Assam) → Petroleum**; **Kalakot → Coal**.\n" +
        "- Match-list anchors (NDA 2025): Balaghat → Manganese, Bilaspur → Iron-ore, Ballary → Bauxite.",
      table: {
        columns: ["Mine / place", "Mineral"],
        rows: [
          { cells: ["Zawar", "Zinc"] },
          { cells: ["Bailadila", "Iron ore"] },
          { cells: ["Ghatsila", "Copper"] },
          {
            cells: ["**Kudremukh**", "Iron ore (NOT bauxite)"],
            noteAmber: "NDA 2023 — 'Kudremukh : Bauxite' is the wrongly-matched pair; it is iron ore.",
          },
          { cells: ["Lakwa", "Petroleum"] },
        ],
      },
      selfCheckExample: {
        prompt: "Zawar in Rajasthan is famous for the mining of which mineral?",
        steps: [
          "Rajasthan's Zawar belt is India's classic base-metal field.",
          "It is the country's best-known source of zinc (and lead).",
        ],
        answer: "Zinc.",
      },
      practiceSet: [
        { prompt: "Zawar mine yields which mineral?", answer: "Zinc" },
        { prompt: "Kudremukh is mined for?", answer: "Iron ore" },
        { prompt: "Ghatsila is associated with which mineral?", answer: "Copper" },
      ],
      pyqExampleId: "733165ea-6817-4989-ab12-4a1f40b13155", // Kudremukh:Bauxite not matched
    },

    // 4. iron ore + critical minerals (REFERENCE)
    {
      kind: "reference" as const,
      slug: "iron-ore-critical-minerals",
      name: "Iron-ore grades and critical minerals",
      intuition:
        "Two niche-but-tested facts sit here. IRON-ORE grades: magnetite is the highest-grade 'black ore' with 60–70% iron and magnetic properties; haematite is the red ore. And the new CRITICAL-minerals theme: rare-earths and metalloids used in solar photovoltaic cells — tellurium and gallium go into PV cells, while neodymium and dysprosium are rare-earth magnet metals NOT used in standard solar panels.",
      definition:
        "- **Magnetite** — the **black ore** of iron, **60–70% pure iron**, and **magnetic**: all three statements hold.\n" +
        "- **Haematite** — the red ore of iron.\n" +
        "- **Solar PV critical minerals** — **tellurium and gallium** are used in photovoltaic cells; **neodymium and dysprosium** are rare-earth magnet metals (wind turbines, motors), NOT in standard PV cells.",
      table: {
        columns: ["Mineral", "Key fact"],
        rows: [
          {
            cells: ["**Magnetite**", "Black ore, 60–70% iron, magnetic"],
            noteAmber: "NDA 2017 (Sep) — all three statements about magnetite are correct.",
          },
          { cells: ["Haematite", "Red ore of iron"] },
          { cells: ["Tellurium, Gallium", "Used in solar PV cells"] },
          {
            cells: ["**Neodymium, Dysprosium**", "Rare-earth magnets — NOT in PV cells"],
            noteAmber: "NDA 2026 — Nd and Dy are the pair NOT used for photovoltaic cells.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which statements about magnetite are correct: (i) it is the black ore, (ii) 60–70% iron, (iii) magnetic?",
        steps: [
          "Magnetite is indeed called the black ore.",
          "It carries 60–70% iron and is strongly magnetic — its very name.",
        ],
        answer: "All three are correct.",
      },
      practiceSet: [
        { prompt: "Which iron ore is the 'black ore'?", answer: "Magnetite" },
        { prompt: "Iron content of magnetite?", answer: "60 to 70 per cent" },
        { prompt: "Which two critical minerals are NOT used in solar PV cells?", answer: "Neodymium and dysprosium" },
      ],
      pyqExampleId: "283104b6-728a-4649-af3a-33befcd9b807", // critical minerals not in PV cells
    },

    // 5. coal geography (REFERENCE)
    {
      kind: "reference" as const,
      slug: "coal-geography",
      name: "Coalfields and coal-reserve geography",
      intuition:
        "Coal questions test reserves order and field locations. By proved reserves the order is Jharkhand > Chhattisgarh > Odisha > West Bengal. Most coalfields cluster in the Damodar valley (Jharia, Raniganj, Bokaro) of Jharkhand and West Bengal — so the trick is spotting the field that is NOT in Jharkhand (Umaria is in Madhya Pradesh). The Kalakot tertiary coalfield is the odd one out — it lies in the Himalayan mountain region, not the peninsular Gondwana basins.",
      definition:
        "- **Proved coal-reserve order**: **Jharkhand > Chhattisgarh > Odisha > West Bengal**.\n" +
        "- Jharkhand coalfields: **Jharia, Bokaro, Ramgarh, Deogarh**. **Umaria** is in **Madhya Pradesh** (the impostor in a 'not in Jharkhand' list).\n" +
        "- **Kalakot tertiary coalfield → Himalayan mountain region** (tertiary coal, not Gondwana).",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          {
            cells: ["Proved reserves order", "Jharkhand > Chhattisgarh > Odisha > West Bengal"],
            noteAmber: "NDA 2019 — decreasing order of proved coal reserves.",
          },
          {
            cells: ["Coalfield NOT in Jharkhand", "Umaria (Madhya Pradesh)"],
            noteAmber: "NDA 2021 (Sep) — Umaria is in MP, the odd one out.",
          },
          {
            cells: ["Kalakot tertiary coalfield", "Himalayan mountain region"],
            noteAmber: "NDA 2017 (Sep) — tertiary coal of the Himalaya.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which coalfield is NOT in Jharkhand: Jharia, Ramgarh, Deogarh, Umaria?",
        steps: [
          "Jharia, Ramgarh and Deogarh all lie in Jharkhand's Damodar belt.",
          "Umaria is a Madhya Pradesh coalfield.",
        ],
        answer: "Umaria.",
      },
      practiceSet: [
        { prompt: "State with the largest proved coal reserves?", answer: "Jharkhand" },
        { prompt: "Where is the Kalakot tertiary coalfield?", answer: "Himalayan mountain region" },
        { prompt: "Is Jharia in Jharkhand?", answer: "Yes" },
      ],
      pyqExampleId: "c5a0711c-406d-48dd-9ac8-b58ee9671336", // Umaria coalfield not in Jharkhand
    },
  ],
};
