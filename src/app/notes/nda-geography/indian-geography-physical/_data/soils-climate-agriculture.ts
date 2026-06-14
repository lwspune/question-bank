import type { SubtopicNote } from "@/app/notes/_types";

export const SOILS_CLIMATE_AGRICULTURE_NOTE: SubtopicNote = {
  subtopicName: "Indian Soils and Climate-Agriculture",
  title: "Indian Soils and Climate-Agriculture",
  oneLineDefinition:
    "India's soils — alluvial, black (regur), red, laterite, desert — each suit particular crops, and the monsoon's timing, variability and regional swings govern when and where those crops grow.",
  whyItMatters:
    "10 PYQs. The marks split between (1) soil-to-crop pairings (black cotton soil = regur = cotton; laterite's nutrient profile) and (2) the monsoon (its variability, ~100-140 day duration, the dominance of the South-West Monsoon, and the special winter rains western disturbances bring to Kashmir). Both are flat recall once you pin the soil-crop table and the monsoon facts.",
  concepts: [
    // 1. soils and crops (reference)
    {
      kind: "reference" as const,
      slug: "soils-and-crops",
      name: "Indian soils and the crops they suit",
      intuition:
        "Each soil has a personality. **Black soil (regur)** is the cotton soil — moisture-retentive, lime-rich, made of clay, found on the Deccan lava. **Laterite** is leached and iron-rich (and, in India, holds an appreciable amount of calcium among the listed nutrients). **Alluvial** soil feeds the great plains. Learn the soil → crop match and the odd-one-out statements.",
      definition:
        "- **Black soil (Regur)** — the **cotton** soil; highly **moisture-retentive**, rich in **lime**, made of fine clay (so it CRACKS when dry). It does NOT have 'less clay factor' — that statement is false.\n" +
        "- **Laterite soil** — leached, iron/aluminium-rich; among the listed nutrients it holds an appreciable amount of **calcium** (it is generally poor in nitrogen, phosphate and potash).\n" +
        "- **Alluvial soil** — the fertile soil of the Northern Plains and deltas.\n" +
        "- **Desert soil**, **mountain soil**, **red soil** — region-specific, lower fertility.",
      table: {
        columns: ["Soil", "Key fact / crop"],
        rows: [
          {
            cells: ["**Black soil (Regur)**", "Cotton soil; moisture-retentive, lime-rich, clayey"],
            noteAmber: "NDA 2023 — regur is the ideal cotton soil; NDA 2024 — 'less clay factor' is the FALSE statement about black soil.",
            pyqExampleId: "7f9f8529-1d0f-44aa-b847-ceaee2884721",
          },
          {
            cells: ["**Laterite soil**", "Holds appreciable **calcium** among the listed nutrients"],
            noteAmber: "NDA 2024 — calcium is the answer for laterite (it is poor in N, P and potash).",
            pyqExampleId: "840f174f-ebce-4ed4-8266-68c70a992afc",
          },
          { cells: ["Alluvial soil", "Fertile soil of the plains and deltas"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which soil is ideal for growing cotton: regur, laterite, desert or mountainous?",
        steps: [
          "Cotton needs a deep, moisture-retentive, lime-rich soil.",
          "That describes the black soil of the Deccan, also called regur.",
        ],
        answer: "Regur (black) soil.",
      },
      practiceSet: [
        { prompt: "Black cotton soil is also called?", answer: "Regur" },
        { prompt: "Which nutrient is found in appreciable amount in laterite soil?", answer: "Calcium" },
        { prompt: "Which statement about black soil is FALSE: lime-rich / moisture-retentive / less clay factor?", answer: "Less clay factor" },
      ],
      pyqExampleId: "7f9f8529-1d0f-44aa-b847-ceaee2884721", // cotton = regur
      traps: [
        {
          title: "Black soil has MORE clay, not less",
          body:
            "A 'which is NOT correct about black cotton soil' question slips in 'these soils have less clay factor'. That is FALSE — regur is a fine CLAY soil (which is why it holds moisture and cracks). The lime-rich and moisture-retentive statements are true.",
        },
      ],
    },

    // 2. monsoon and climate (formula)
    {
      kind: "formula" as const,
      slug: "monsoon-and-climate",
      name: "The Indian monsoon and its climate quirks",
      intuition:
        "The monsoon is irregular by nature. India's rain is largely controlled by **topography**, shows huge **regional and seasonal variation**, and pours down in **heavy bursts** with lots of runoff — but its onset and withdrawal are NOT punctual. The bulk of the rain comes from the **South-West Monsoon**; the north-west gets an extra winter ration from **western disturbances** (which help the wheat crop).",
      definition:
        "- **Monsoon character** — governed by **topography**; shows strong **regional + seasonal variation**; falls as **heavy downpours with high runoff**. Its beginning and end are NOT regular/on-time.\n" +
        "- **Most of India's rain** comes from the **South-West (summer) Monsoon**.\n" +
        "- **Western disturbances** — winter rain-bearing systems from the Mediterranean that water the north-west; the **Kashmir region** gets extra winter precipitation from them, and the **wheat** (rabi) crop benefits.\n" +
        "- **Monsoon duration** — averages about **100–140 days**.\n" +
        "- **Tropic of Cancer** crosses several states (Gujarat, MP, Jharkhand, West Bengal, etc.) but **NOT Manipur**.",
      authoredExample: {
        prompt:
          "Which crop is generally benefited by the rain caused by western disturbances in India — rice, wheat, bajra or cotton?",
        steps: [
          "Western disturbances bring rain in WINTER to north-west India.",
          "The winter (rabi) crop grown there is wheat.",
          "So wheat benefits from western-disturbance rain.",
        ],
        answer: "Wheat.",
      },
      selfCheckExample: {
        prompt:
          "Which statements about Indian monsoonal rainfall are correct? (1) governed by topography; (2) regional/seasonal variation; (3) heavy downpour with runoff; (4) onset and end are regular and on time.",
        steps: [
          "Topographic control, regional variation and heavy bursts with runoff are all true — (1), (2), (3) correct.",
          "The onset and withdrawal of the monsoon are notoriously irregular — (4) is false.",
        ],
        answer: "1, 2 and 3 only.",
      },
      practiceSet: [
        { prompt: "Most of India's rainfall comes from which monsoon?", answer: "South-West (summer) Monsoon" },
        { prompt: "Western disturbances bring winter rain that helps which crop?", answer: "Wheat" },
        { prompt: "Which state does the Tropic of Cancer NOT pass through: Manipur, West Bengal, Gujarat, Jharkhand?", answer: "Manipur" },
      ],
      pyqExampleId: "00059538-123f-431c-a18a-d88a1f0b5e66", // monsoonal rainfall statements
      traps: [
        {
          title: "The monsoon is NOT punctual",
          body:
            "A multi-statement monsoon question slips in 'beginning and end of rain is regular and on time'. That is FALSE — the monsoon's onset and withdrawal vary year to year. Topographic control, regional variation and heavy runoff are the true statements.",
        },
      ],
    },

    // 3. climate classification (reference)
    {
      kind: "reference" as const,
      slug: "climate-types",
      name: "Köppen climate types of India",
      intuition:
        "India's regions fall into named Köppen climate types, and the NDA tests the type ↔ region matching. The cues are in the codes: Amw (monsoon, short dry season) on the wet south-west coast; As (monsoon, dry SUMMER) on the Tamil Nadu coast; Cwg (monsoon, dry winter) over UP/Bihar; Dfc (cold humid winter) in Arunachal.",
      definition:
        "India's Köppen climate types (the bank's matching):\n" +
        "- **Amw** — monsoon with short dry season → **Kerala & Karnataka coast**.\n" +
        "- **Dfc** — cold humid winter, short summer → **Arunachal Pradesh**.\n" +
        "- **Cwg** — monsoon with dry winter → **Uttar Pradesh & Bihar**.\n" +
        "- **As** — monsoon with dry summer → **Tamil Nadu coast**.",
      table: {
        columns: ["Climate code", "Region"],
        rows: [
          {
            cells: ["**Amw** (short dry season)", "Kerala & Karnataka coast"],
            noteAmber: "NDA 2017 — climate-type ↔ state match-list.",
            pyqExampleId: "af549231-0143-4635-9bd7-cadb071c88b4",
          },
          { cells: ["Dfc (cold humid winter)", "Arunachal Pradesh"] },
          { cells: ["Cwg (dry winter)", "Uttar Pradesh & Bihar"] },
          { cells: ["As (dry summer)", "Tamil Nadu coast"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Match: Amw (monsoon, short dry season) belongs to which region — UP/Bihar, Tamil Nadu coast, Arunachal, or Kerala/Karnataka coast?",
        steps: [
          "Amw is the wettest type with only a short dry spell.",
          "That fits the heavy-rain south-west coast of Kerala and Karnataka.",
        ],
        answer: "Kerala & Karnataka coast.",
      },
      practiceSet: [
        { prompt: "Amw climate maps to which Indian coast?", answer: "Kerala & Karnataka coast" },
        { prompt: "Which climate type belongs to Arunachal Pradesh?", answer: "Dfc (cold humid winter)" },
        { prompt: "As (dry summer) maps to which coast?", answer: "Tamil Nadu coast" },
      ],
      pyqExampleId: "af549231-0143-4635-9bd7-cadb071c88b4", // climate match-list
    },
  ],
};
