import type { SubtopicNote } from "@/app/notes/_types";

export const AGRICULTURE_CROPS_SOILS_NOTE: SubtopicNote = {
  subtopicName: "Agriculture, Crops, Soils and Land Use",
  title: "Agriculture, Crops, Soils and Land Use",
  oneLineDefinition:
    "What India grows and where, the soils it grows in, the cropping seasons, and how the land-revenue records officially classify every parcel of land.",
  whyItMatters:
    "The single largest subtopic in the chapter — around 23 PYQs once the misfiled stems are set aside, leaning EASY-to-MODERATE. The marks cluster in four buckets: the land-use / fallow-land vocabulary (current fallow vs culturable wasteland is asked almost every year), the soil-to-region pairs (black/regur, laterite), the crop conditions and crop-to-state pairs, and the agricultural schemes. Learn the fallow-land thresholds and the regur/laterite facts cold.",
  concepts: [
    // 1. FOUNDATION — cropping seasons (formula, no formula box, reasoning example)
    {
      kind: "formula" as const,
      slug: "cropping-seasons",
      name: "Kharif, Rabi and Zaid — the three cropping seasons",
      intuition:
        "Indian farming follows the monsoon clock. KHARIF crops are sown with the arriving monsoon in June–July and harvested in autumn — they need heat and heavy water (rice, bajra, jowar, maize, cotton, jute). RABI crops are sown in the cool, dry winter (October–November) and harvested in spring — they need a mild start and dry ripening (wheat, barley, gram, mustard). ZAID is the short summer season between rabi and kharif for quick crops (watermelon, cucumber, fodder). Knowing which season a crop belongs to is the fastest way to answer 'which is a rabi crop?' questions.",
      definition:
        "- **Kharif** (monsoon, sown Jun–Jul, harvested Sep–Oct) — **rice, bajra, jowar, maize, cotton, jute, groundnut**. Needs warmth + heavy rain.\n" +
        "- **Rabi** (winter, sown Oct–Nov, harvested Mar–Apr) — **wheat, barley, gram, peas, mustard**. Needs a cool growing period and dry, warm ripening.\n" +
        "- **Zaid** (short summer, Mar–Jun) — watermelon, muskmelon, cucumber, fodder crops.\n" +
        "- A crop's season is the key recall fact: in the Northern States **barley is a rabi crop**, while rice and bajra are kharif.",
      visualizationSlug: "ige-cropping-calendar",
      authoredExample: {
        prompt:
          "A farmer in Punjab sows a cereal in November and harvests it in April. Which cropping season is this, and name a typical crop?",
        steps: [
          "Sowing in the cool winter and harvesting in spring is the rabi pattern.",
          "Kharif would be sown in June with the monsoon; zaid is the short summer season.",
          "The classic rabi cereal of the north-west is wheat (also barley, gram, mustard).",
        ],
        answer: "Rabi season — typically wheat.",
      },
      selfCheckExample: {
        prompt:
          "A crop is sown in June with the onset of the monsoon and harvested in October. Which season is it?",
        steps: [
          "Sowing with the monsoon and autumn harvest is the kharif pattern.",
          "Rabi is sown in winter; zaid is the short summer season.",
        ],
        answer: "Kharif.",
      },
      practiceSet: [
        { prompt: "Wheat belongs to which cropping season?", answer: "Rabi" },
        { prompt: "Name two kharif cereals.", answer: "Rice and bajra (also maize, jowar)" },
        { prompt: "Which short season grows watermelon and cucumber?", answer: "Zaid" },
      ],
      pyqExampleId: "7125ad5c-fe6f-4b37-aceb-0d179e93d811", // barley is a rabi crop
    },

    // 2. land-use / fallow vocabulary (REFERENCE) — the most-tested bucket
    {
      kind: "reference" as const,
      slug: "land-use-fallow",
      name: "Land-use categories and fallow land",
      intuition:
        "India's Land Revenue Records sort every parcel into NINE land-use categories, and the exam's favourite trap is the fallow-land vocabulary. The threshold is the whole game: land left uncultivated up to ONE year is current fallow; for MORE than one year but LESS than five years it is 'fallow other than current fallow'; once it crosses FIVE years it becomes culturable wasteland. (Older land-revenue wording also calls land fallow for more than three years culturable wasteland — the NDA has used both, so read the option list.)",
      definition:
        "- Land-Revenue Records classify land into **9 categories** of land use.\n" +
        "- **Current fallow** — left uncultivated for up to one year (a normal rest).\n" +
        "- **Fallow other than current fallow** — uncultivated for **more than 1 year but less than 5 years**.\n" +
        "- **Culturable wasteland** — left fallow for **more than 5 years** (it has gone out of cultivation but could be reclaimed).\n" +
        "- **Barren and waste land** — land that cannot be brought under cultivation at all (rocky, desert).",
      table: {
        columns: ["Term", "How long uncultivated", "Meaning"],
        rows: [
          {
            cells: ["Current fallow", "Up to 1 year", "A normal one-season rest"],
          },
          {
            cells: ["**Fallow other than current fallow**", "1 to 5 years", "Resting longer than a season"],
            noteAmber: "NDA repeats this 1-to-5-year band almost every year.",
          },
          {
            cells: ["**Culturable wasteland**", "More than 5 years", "Out of cultivation but reclaimable"],
            noteAmber: "NDA 2024 (Sep) — fallow for more than five years is culturable wasteland.",
          },
          { cells: ["Barren and waste land", "Permanently", "Cannot be cultivated"] },
          { cells: ["(Land-use categories in total)", "—", "9 categories"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A field has been left uncultivated for three years. Under the Land Revenue Records, what is it called?",
        steps: [
          "More than one year rules out 'current fallow'.",
          "Less than five years rules out 'culturable wasteland'.",
          "The band 1–5 years is 'fallow other than current fallow'.",
        ],
        answer: "Fallow other than current fallow.",
      },
      practiceSet: [
        { prompt: "Land left fallow for more than five years is termed?", answer: "Culturable wasteland" },
        { prompt: "How many land-use categories do the Land Revenue Records use?", answer: "Nine" },
        { prompt: "Land uncultivated for up to one year is?", answer: "Current fallow" },
      ],
      pyqExampleId: "187be76d-237b-4b6c-a27f-c5844e5ffbc5", // 1-5 yr = fallow other than current fallow
      traps: [
        {
          title: "Mind the threshold word",
          body:
            "Current fallow = up to 1 year; **fallow other than current fallow** = 1 to 5 years; **culturable wasteland** = more than 5 years. The trap is to pick the neighbouring band — always anchor on the exact number in the stem.",
        },
      ],
    },

    // 3. soils of India (REFERENCE)
    {
      kind: "reference" as const,
      slug: "indian-soils",
      name: "Soils of India — black, laterite, alluvial",
      intuition:
        "Three soil facts carry most of the soil questions. BLACK / REGUR soil is the cotton soil of the Deccan — it formed on basaltic lava but under hot DRY (semi-arid) conditions, not 'hot and humid', and it is dark, not light. LATERITE soil forms in hot WET climates by intense leaching, so it keeps iron and aluminium but loses bases — it is rich in iron, poor in nitrogen, phosphate and lime, with only potash among the listed nutrients. Spot the deliberately-wrong adjective ('hot and humid', 'light coloured') and the answer follows.",
      definition:
        "- **Black / Regur soil** — Deccan cotton soil; develops on **basaltic lava under hot, SEMI-ARID (dry)** conditions; **dark coloured, clayey, moisture-retentive**; ideal for **cotton**. (A claim of 'light coloured' or 'hot and humid' is the trap.)\n" +
        "- **Laterite soil** — forms in hot, wet climates by heavy leaching; rich in **iron and aluminium**, but poor in nitrogen, lime and phosphate. Of {calcium, nitrogen, phosphate, potash}, it is comparatively rich only in **potash**.\n" +
        "- **Alkaline soils** — high sodium, pH above 7.0.\n" +
        "- Bajra grows on **sandy / shallow black** soils (Rajasthan, UP, Maharashtra); ragi suits **red and shallow black** soils (Karnataka, Tamil Nadu).",
      table: {
        columns: ["Soil", "Forms under", "Best for / key fact"],
        rows: [
          {
            cells: ["**Black / Regur**", "Basaltic lava, hot dry climate", "Cotton; dark, clayey, retains moisture"],
            noteAmber: "NDA 2024 — regur is DARK and forms under hot DRY (not humid) conditions.",
          },
          {
            cells: ["**Laterite**", "Hot wet, heavy leaching", "Rich in iron/aluminium; of the nutrients, only potash"],
            noteAmber: "NDA 2025 (Sep) — laterite is rich in potash, poor in N, P, lime.",
          },
          { cells: ["Alkaline", "High sodium, pH > 7", "Needs reclamation"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Statement: 'Black cotton soil developed on the Deccan basaltic lava under hot and humid conditions.' Is it correct?",
        steps: [
          "Black/regur soil did form on Deccan basalt — that part is right.",
          "But it formed under hot, SEMI-ARID (dry) conditions, not humid.",
        ],
        answer: "Incorrect — it formed under hot DRY conditions, not humid.",
      },
      practiceSet: [
        { prompt: "Which soil is best for cotton?", answer: "Black / regur soil" },
        { prompt: "Laterite soil is rich in which of N, P, potash, lime?", answer: "Potash only" },
        { prompt: "Regur soil colour?", answer: "Dark (black)" },
      ],
      pyqExampleId: "23b8ad79-0746-400f-a826-77f31a541b02", // Regur statements
      traps: [
        {
          title: "Regur: dark + dry, never light + humid",
          body:
            "The exam plants two wrong adjectives in regur questions — 'light coloured' and 'hot and humid'. Regur is **dark** and forms under hot **dry** conditions. The only safe statement is 'cotton is grown extensively in it'.",
        },
      ],
    },

    // 4. crop conditions + plantation crops (REFERENCE)
    {
      kind: "reference" as const,
      slug: "crop-conditions",
      name: "Crop-growing conditions and plantation crops",
      intuition:
        "Plantation-crop questions test the climate-and-soil recipe. TEA needs a warm tropical/sub-tropical climate and heavy rain (150–250 cm), but well-drained acidic slopes — lime in the soil is bad for tea, so 'soil should contain lime' is the wrong clause. COFFEE needs warm moist conditions with a dry spell at ripening and good drainage on hilly slopes, but NOT scorching 35°C-plus sun; Karnataka leads. Match the right pair of conditions and the multi-statement question falls.",
      definition:
        "- **Tea** — tropical/sub-tropical climate, heavy rainfall **150–250 cm**, well-drained **acidic** soil (NOT lime-rich). Assam, Darjeeling, Nilgiris.\n" +
        "- **Coffee** — warm, moist climate with a **dry spell at ripening**, rolling well-drained fields; does NOT want sunshine above ~35 °C. **Karnataka** is the leading producer.\n" +
        "- Crop-product pairings the NDA tests: **food crop = ragi**, **cash crop = jute**, **plantation crop = coconut** (all correctly matched).\n" +
        "- Specialised farming: **apiculture = honey, sericulture = silk, silviculture = forestry, viticulture = grapes**.",
      table: {
        columns: ["Crop / activity", "Key condition or product"],
        rows: [
          {
            cells: ["**Tea**", "150–250 cm rain; acidic, well-drained soil (NOT lime)"],
            noteAmber: "NDA 2018 — only conditions 1 and 2 hold; 'soil should contain lime' is wrong.",
          },
          {
            cells: ["**Coffee**", "Warm + moist, dry spell at ripening; Karnataka leads"],
            noteAmber: "NDA 2017 — correct set is 1, 2 and 4 (not the '>35 °C sunshine' clause).",
          },
          { cells: ["Apiculture", "Honey"] },
          { cells: ["Viticulture", "Grapes"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Is 'the soil should contain a good amount of lime' an essential condition for tea cultivation?",
        steps: [
          "Tea needs heavy rainfall and warm tropical conditions — both true.",
          "But tea grows on acidic, well-drained soil; lime is harmful, not essential.",
        ],
        answer: "No — lime-rich soil is not a condition for tea.",
      },
      practiceSet: [
        { prompt: "Which state leads coffee production in India?", answer: "Karnataka" },
        { prompt: "Tea needs roughly how much annual rainfall?", answer: "150 to 250 cm" },
        { prompt: "Sericulture yields which product?", answer: "Silk" },
      ],
      pyqExampleId: "85157290-e681-41dd-ace4-bd933ddca694", // tea cultivation conditions
      traps: [
        {
          title: "Tea hates lime; coffee hates scorching sun",
          body:
            "For tea, the impostor clause is 'soil should contain lime' (tea wants acidic soil). For coffee, the impostor is 'strong sunshine exceeding 35 °C' — coffee wants a moist, shaded ripening, not extreme heat.",
        },
      ],
    },

    // 5. agriculture types, dry/rainfed farming + schemes (REFERENCE)
    {
      kind: "reference" as const,
      slug: "farming-types-schemes",
      name: "Farming types, dry-land farming and farm schemes",
      intuition:
        "Two threads sit here. First, the TYPE of Indian agriculture — it is subsistence, monsoon-dependent and population-pressured; the predominance of CASH crops is NOT a feature, and intensive subsistence farming is practised in India/Japan/Indonesia but NOT in Canada (large mechanised farms). Second, the rain-and-water rules: dry-land farming is confined to areas with less than 75 cm of rainfall, an area escapes the drought-prone tag if 20% or more of its gross cropped area is irrigated, and the Rainfed Area Development (RAD) scheme uses diversified farming, soil-health management and cluster approaches — NOT canal irrigation.",
      definition:
        "- **Features of Indian agriculture** — subsistence farming, heavy population pressure on land, dependence on the monsoon. Predominance of **cash crops is NOT** a feature.\n" +
        "- **Intensive subsistence agriculture** — practised in India, Japan, Indonesia; NOT in **Canada** (extensive mechanised farming).\n" +
        "- **Dry-land farming** — confined to areas with rainfall **less than 75 cm**.\n" +
        "- An area leaves the **drought-prone** category if **20% or more** of its gross cropped area is irrigated.\n" +
        "- **RAD (Rainfed Area Development)** — diversified farming, soil-health management, cluster-based approaches. 'Optimizing canal irrigation' is NOT an RAD strategy.\n" +
        "- **NFSM-CC (Commercial Crops)** covers cotton, jute and sugarcane — NOT coffee.",
      table: {
        columns: ["Item", "Key threshold / fact"],
        rows: [
          {
            cells: ["Dry-land farming", "Rainfall < 75 cm"],
            noteAmber: "NDA 2020 — confined to areas below 75 cm rainfall.",
          },
          {
            cells: ["Excluded from drought-prone", "≥ 20% gross cropped area irrigated"],
            noteAmber: "NDA 2020 — 20 per cent or more under irrigation.",
          },
          { cells: ["RAD scheme", "NOT canal irrigation"] },
          { cells: ["NFSM-CC commercial crops", "Cotton, jute, sugarcane (NOT coffee)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In which country is intensive subsistence agriculture NOT predominantly practised: India, Japan, Canada, Indonesia?",
        steps: [
          "Intensive subsistence farming is the small-plot, high-labour farming of monsoon Asia — India, Japan, Indonesia.",
          "Canada uses large mechanised extensive farms.",
        ],
        answer: "Canada.",
      },
      practiceSet: [
        { prompt: "Dry-land farming is confined to rainfall below how many cm?", answer: "75 cm" },
        { prompt: "What irrigation share excludes an area from being drought-prone?", answer: "20% or more" },
        { prompt: "Is predominance of cash crops a feature of Indian agriculture?", answer: "No" },
      ],
      pyqExampleId: "2ba87f72-e593-4023-bc7a-d0f4c904213e", // intensive subsistence not in Canada
      traps: [
        {
          title: "RAD does not mean canal irrigation",
          body:
            "Rainfed Area Development is about making un-irrigated land productive without big canals — diversified farming, soil health, clusters. 'Optimizing canal irrigation' is the impostor strategy in RAD questions.",
        },
      ],
    },
  ],
};
