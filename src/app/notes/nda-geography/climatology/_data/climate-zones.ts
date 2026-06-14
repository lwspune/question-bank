import type { SubtopicNote } from "@/app/notes/_types";

export const CLIMATE_ZONES_NOTE: SubtopicNote = {
  subtopicName: "Climate Classification and Zones",
  title: "Climate Classification and Zones",
  oneLineDefinition:
    "Koppen's scheme sorts the world's climates by temperature and rainfall into letter-coded types (A tropical, B dry, C warm-temperate, D cold, E polar), and the NDA tests both the letter codes and the example regions of each climatic zone.",
  whyItMatters:
    "8 PYQs, several of them HARD (Koppen letter-matching and the ITCZ link). The two skills tested: decoding the letter codes (Cfa = humid subtropical, Af = tropical wet, BWk = mid-latitude desert, Cs = Mediterranean), and recognising which regions belong to which climate (and which is the odd one out). The Monsoon climate's signature is the seasonal REVERSAL of winds.",
  concepts: [
    // 1. Koppen letter codes (REFERENCE, FOUNDATION-ish)
    {
      kind: "reference" as const,
      slug: "koppen-codes",
      name: "Koppen's climate classification codes",
      intuition:
        "Koppen labelled climates with letters. The FIRST capital sets the broad group: A = tropical (hot, wet), B = dry (deserts/steppes), C = warm temperate, D = cold/continental, E = polar. Extra small letters add the rainfall pattern (f = no dry season, w = dry winter, s = dry summer/Mediterranean) and heat. Learn the handful the NDA reuses.",
      definition:
        "The first-letter groups:\n" +
        "- **A — Tropical** (hot, wet). **Af** = tropical wet (rainforest).\n" +
        "- **B — Dry** (deserts and steppes). **BWk** = mid-latitude (cold) desert.\n" +
        "- **C — Warm temperate**. **Cs** = **Mediterranean** (dry SUMMER). **Cfa** = **humid subtropical**. **Cwg** = the monsoon-influenced warm climate of the Great Northern Plains of India.\n" +
        "- **D — Cold / continental**. **Df** = humid continental (no dry season).\n" +
        "- **E — Polar** (tundra, ice cap).\n" +
        "Second letters: **f** = no dry season, **w** = dry winter, **s** = dry summer.",
      table: {
        columns: ["Code", "Climate type"],
        rows: [
          {
            cells: ["**Af**", "Tropical wet (rainforest)"],
            noteAmber: "NDA 2018 — Af = tropical wet.",
          },
          { cells: ["**BWk**", "Mid-latitude (cold) desert"] },
          { cells: ["**Cs**", "Mediterranean (dry summer)"] },
          {
            cells: ["**Cfa**", "Humid subtropical"],
            noteAmber: "NDA 2019 — Cfa = humid subtropical.",
          },
          {
            cells: ["**Cwg**", "Great Northern Plains of India (monsoon-influenced warm)"],
            noteAmber: "NDA 2023 — Great Northern Plains = Cwg.",
          },
          { cells: ["**Df**", "Humid continental"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Match: A. Tropical wet, B. Mid-latitude desert, C. Mediterranean, D. Humid continental with 1. Af, 2. Cs, 3. Df, 4. BWk.",
        steps: [
          "Tropical wet = Af (A-1).",
          "Mid-latitude desert = BWk (B-4).",
          "Mediterranean = Cs (C-2).",
          "Humid continental = Df (D-3).",
        ],
        answer: "A-1, B-4, C-2, D-3.",
      },
      practiceSet: [
        { prompt: "What does Koppen's 'Cfa' denote?", answer: "Humid subtropical climate" },
        { prompt: "What climate is 'Af'?", answer: "Tropical wet" },
        { prompt: "What does 'Cs' denote?", answer: "Mediterranean (dry summer)" },
        { prompt: "Which Koppen code fits India's Great Northern Plains?", answer: "Cwg" },
      ],
      pyqExampleId: "2894446b-3b8d-4d2c-90ed-d51f3c432a14", // Cfa = humid subtropical
      traps: [
        {
          title: "Second letter is the rainfall season",
          body:
            "The small letter matters: **f** = no dry season, **w** = dry WINTER, **s** = dry SUMMER (Mediterranean). Confusing 'w' and 's' flips the climate type.",
        },
      ],
    },

    // 2. climate regions + odd-one-out (formula)
    {
      kind: "formula" as const,
      slug: "climate-regions",
      name: "Climate regions and the odd-one-out",
      intuition:
        "Many questions list four places and ask which does NOT have a given climate. The trick is to know which latitude band and continent each climate occupies. Humid subtropical climate sits on the east coasts of continents in the warm temperate belt; the steppe (temperate continental) climate sits in continental interiors. Find the place that does not fit that pattern.",
      definition:
        "- **Humid Subtropical (Cfa)** — warm, on the EAST coasts of continents: SE USA, South Japan, east-coast Australia, coastal South Africa. **South Argentina is too far south/cold**, so it does NOT have this climate.\n" +
        "- **Steppe / temperate continental (BSk)** — semi-arid grassland of continental interiors: Saskatchewan, Buenos Aires region (Pampas), Pretoria. **Perth** (SW Australia) has a **Mediterranean** climate, so it is the odd one out for steppe.\n" +
        "- **Monsoon climate** — its signature is the **seasonal REVERSAL of winds** (onshore wet summer, offshore dry winter).\n" +
        "- In India, **Ladakh** receives the **lowest rainfall** (a cold desert, below 50 cm).",
      authoredExample: {
        prompt:
          "Steppe (temperate continental) climate is NOT experienced in which place: Pretoria, Saskatchewan, Perth, Buenos Aires?",
        steps: [
          "Saskatchewan (Canadian prairies), Buenos Aires (Pampas) and Pretoria all have continental semi-arid grassland.",
          "Perth in south-west Australia has a Mediterranean climate, not a steppe climate.",
        ],
        answer: "Perth.",
      },
      selfCheckExample: {
        prompt: "Which climatic region is typified by a seasonal reversal of wind?",
        steps: [
          "British, Mediterranean and China-type climates do not reverse their winds seasonally.",
          "The monsoon climate is defined by the onshore/offshore seasonal wind reversal.",
        ],
        answer: "The Monsoon climate.",
      },
      practiceSet: [
        { prompt: "Which has NO humid subtropical climate: coastal South Africa, east Australia, South Japan, South Argentina?", answer: "South Argentina" },
        { prompt: "Which climate is marked by seasonal reversal of wind?", answer: "Monsoon climate" },
        { prompt: "Which Indian region gets below 50 cm of rain (lowest)?", answer: "Ladakh" },
        { prompt: "Perth has which climate (not steppe)?", answer: "Mediterranean" },
      ],
      pyqExampleId: "1e83c016-91b4-47ec-b298-a75709c00676", // steppe NOT at Perth
      traps: [
        {
          title: "Perth is Mediterranean, not steppe",
          body:
            "In a 'where is steppe NOT found' list, **Perth** is the trap — it has a **Mediterranean** climate (SW Australia), unlike the continental-interior steppe sites Saskatchewan, Buenos Aires and Pretoria.",
        },
        {
          title: "Monsoon = seasonal wind reversal",
          body:
            "The monsoon climate's defining feature is the **seasonal reversal of wind direction**, not just heavy rain. British / Mediterranean / China-type climates do not reverse their winds.",
        },
      ],
    },

    // 3. ITCZ and tropical climates (formula)
    {
      kind: "formula" as const,
      slug: "itcz-tropical-climates",
      name: "The ITCZ and the tropical climates",
      intuition:
        "The Inter-Tropical Convergence Zone (ITCZ) is the rainy low-pressure belt where the trade winds meet near the equator. Climates near it are wet; climates that the ITCZ visits only seasonally (as it shifts north and south with the Sun) get a wet-and-dry alternation. That shifting ITCZ is the engine behind the tropical wet, savanna and monsoon climates.",
      definition:
        "- The **Tropical Wet climate** is among the world's rainiest because the **ITCZ dominates over it** all year — correct.\n" +
        "- The **Tropical Savanna climate** has a distinct **wet-and-dry alternation**, caused chiefly by the **seasonal latitude shift of the subtropical highs AND the ITCZ** — correct.\n" +
        "- The **Tropical Monsoon climate** — the bank's keyed answer treats the simple 'heavy rain just from nearness of the ITCZ' framing as the statement to DROP (monsoon rain owes much to the seasonal wind reversal and orography, not only ITCZ nearness), so in the PYQ statements 1 and 2 are correct and statement 3 is the one excluded.",
      authoredExample: {
        prompt:
          "Three claims link world climates to the ITCZ: (1) Tropical Wet is rainiest due to ITCZ dominance; (2) Tropical Savanna's wet/dry seasons come from the seasonal shift of the subtropical highs and ITCZ; (3) the Tropical Monsoon's heavy rain is simply due to the nearness of the ITCZ much of the year. Which are correct?",
        steps: [
          "ITCZ sits over the tropical-wet belt all year giving heavy rain — (1) correct.",
          "Savanna's wet/dry split tracks the migrating ITCZ and subtropical highs — (2) correct.",
          "Monsoon rain is driven mainly by seasonal wind reversal/orography, so the 'nearness of ITCZ' framing is the one dropped — (3) excluded.",
        ],
        answer: "Statements 1 and 2 are correct.",
      },
      practiceSet: [
        { prompt: "What does ITCZ stand for?", answer: "Inter-Tropical Convergence Zone" },
        { prompt: "Why does the savanna climate alternate wet and dry?", answer: "Seasonal latitude shift of the ITCZ and subtropical highs" },
        { prompt: "Which tropical climate has the ITCZ over it all year?", answer: "Tropical Wet climate" },
      ],
      pyqExampleId: "5566f098-3ea0-4dcb-9c54-58d206b4762d", // ITCZ statements 1 and 2 correct
    },
  ],
};
