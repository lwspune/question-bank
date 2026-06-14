import type { SubtopicNote } from "@/app/notes/_types";

export const FORESTS_NATURAL_VEGETATION_NOTE: SubtopicNote = {
  subtopicName: "Forests and Natural Vegetation of India",
  title: "Forests, Vegetation and Mixed Map-Facts of India",
  oneLineDefinition:
    "India's natural vegetation runs from tropical deciduous forests (the largest belt) to thorn, montane and evergreen types — and this is also where the bank files a band of mixed map-recall: forest-cover rankings, protected areas, river/dam facts, coastlines, borders and longitude.",
  whyItMatters:
    "34 PYQs — the single largest pool in the chapter, because the bank uses this subtopic as a catch-all. It mixes (1) vegetation belts and tree species, (2) forest-cover and biosphere/tiger-reserve rankings, (3) a big batch of river, dam and tributary facts, and (4) longitude/sunrise, coastline and border items. Drill each table; the spread is wide but every item is flat recall.",
  concepts: [
    // 1. natural vegetation belts (reference)
    {
      kind: "reference" as const,
      slug: "vegetation-belts",
      name: "Natural vegetation belts and tree species",
      intuition:
        "India's vegetation changes with rainfall and altitude. The **tropical deciduous (monsoon) forest** covers the LARGEST area. Dry-thorn trees (Khair, Neem, Khejri, Palas) signal the **desert/arid** region; oak and rhododendron signal the **Himalayas**; the high-altitude temperate 'Shola' forests sit in the South Indian hills (Nilgiris, Anaimalai, Palani).",
      definition:
        "- **Tropical deciduous (monsoon) forest** — covers the **maximum geographical area** of India.\n" +
        "- **Desert / arid trees** — **Khair, Neem, Khejri, Palas** indicate the **Desert region**.\n" +
        "- **Himalayan species** — **Oak and Rhododendron** are found on the Himalayas (Rosewood is a tropical/peninsular species, NOT Himalayan).\n" +
        "- **Shola forests** — temperate forests of South India, found in the **Anaimalai, Nilgiris and Palani** hills.\n" +
        "- **Himalayan altitude bands** — **Chir (pine)** grows about **1800–2600 m**; Deodar and Spruce higher.",
      table: {
        columns: ["Vegetation cue", "Region / answer"],
        rows: [
          {
            cells: ["Largest-area vegetation", "**Tropical deciduous forest**"],
            noteAmber: "NDA 2021 — tropical deciduous (monsoon) forest covers the most area.",
            pyqExampleId: "e358983a-e966-4a40-ab02-d8ffbcfb2e1f",
          },
          {
            cells: ["Khair, Neem, Khejri, Palas", "**Desert region**"],
            noteAmber: "NDA 2022 — these dry-thorn trees indicate the Desert region.",
            pyqExampleId: "f9bcc8e2-1cca-47d0-be26-643fd498c21d",
          },
          {
            cells: ["Shola (temperate S. India)", "Anaimalai, Nilgiris, Palani hills"],
            noteAmber: "NDA 2025 — Sholas occur in all three: Anaimalai, Nilgiris, Palani.",
            pyqExampleId: "e4447538-7182-4b2a-9baa-1b971f01eacd",
          },
          {
            cells: ["Himalayan trees", "Oak + Rhododendron (NOT Rosewood)"],
            pyqExampleId: "2694ac78-6500-4296-988e-1083e1436133",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A traveller finds Khair, Neem, Khejri and Palas trees. Which region did she most likely visit — Malabar Coast, Garo Hills, Sunderban Delta or Desert region?",
        steps: [
          "These are hardy, drought-tolerant dry-zone trees.",
          "They characterise the arid Desert region, not the wet coast/delta/hills.",
        ],
        answer: "Desert region.",
      },
      practiceSet: [
        { prompt: "Which natural vegetation covers the maximum area of India?", answer: "Tropical deciduous (monsoon) forest" },
        { prompt: "Sholas are found in which three hill ranges?", answer: "Anaimalai, Nilgiris, Palani" },
        { prompt: "Which is NOT a Himalayan tree: Oak, Rhododendron, Rosewood?", answer: "Rosewood" },
      ],
      pyqExampleId: "e358983a-e966-4a40-ab02-d8ffbcfb2e1f", // largest area = tropical deciduous
      traps: [
        {
          title: "Rosewood is NOT Himalayan",
          body:
            "In 'which tree is found on the Himalayas', Oak and Rhododendron are correct but **Rosewood** is a tropical/peninsular hardwood — it is the impostor in a Himalayan-species list.",
        },
      ],
    },

    // 2. world grasslands + forest fire news (reference)
    {
      kind: "reference" as const,
      slug: "grasslands-and-forest-events",
      name: "World grasslands and forest-fire current affairs",
      intuition:
        "Two recall odds-and-ends the bank files here. The mid-latitude treeless grassland with hot summers, cold winters and low spring/summer rain is the **Prairies** (North America). And the forests of Uttarakhand, Kullu (Himachal) and the Dzukou Valley (Nagaland/Manipur) made the news because of **forest fires**.",
      definition:
        "- **World grasslands** — the temperate, treeless grassland with hot summers, cold winters and low rainfall (grasses up to a metre in humid parts) is the **Prairies**. Steppes (Eurasia), Pampas (S. America), Savanna (tropical) are the other names.\n" +
        "- **Forest-fire news** — Uttarakhand, the Kullu Valley (Himachal) and the Dzukou Valley (Nagaland/Manipur) were in the news for **forest fires**.",
      table: {
        columns: ["Item", "Answer"],
        rows: [
          {
            cells: ["Hot-summer/cold-winter low-rain grassland", "**Prairies**"],
            noteAmber: "NDA 2024 — these characteristics describe the Prairies.",
            pyqExampleId: "88fb6d99-f965-47f2-b0ae-b5ba9763dc61",
          },
          {
            cells: ["Uttarakhand / Kullu / Dzukou Valley in the news", "**Forest fires**"],
            noteAmber: "NDA 2022 — the reason these forests were in the news.",
            pyqExampleId: "841c5223-be96-426f-83d9-05e3e8e72f55",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A mid-latitude grassland, treeless, with hot summers, cold winters and low spring/summer rain is which grassland?",
        steps: [
          "Savanna is tropical; that rules it out.",
          "The North American temperate grassland with these traits is the Prairies.",
        ],
        answer: "Prairies.",
      },
      practiceSet: [
        { prompt: "Which world grassland has hot summers, cold winters, low rain?", answer: "Prairies" },
        { prompt: "The tropical grassland is called?", answer: "Savanna" },
        { prompt: "Why were Uttarakhand/Kullu/Dzukou forests in the news?", answer: "Forest fires" },
      ],
      pyqExampleId: "88fb6d99-f965-47f2-b0ae-b5ba9763dc61", // grassland = Prairies
    },

    // 3. forest cover and reports (reference)
    {
      kind: "reference" as const,
      slug: "forest-cover-reports",
      name: "Forest cover rankings (India State of Forest Report)",
      intuition:
        "The bank tests two different 'most forest' answers, so keep them apart. By ABSOLUTE AREA, **Madhya Pradesh** has the largest forest cover (and Arunachal Pradesh is among the top by the 2021 report). By PERCENTAGE of geographical area, the **Himalayan/north-east states** lead — **Arunachal Pradesh** has the highest forest percentage among the Himalayan states.",
      definition:
        "- **Largest forest cover by AREA** — **Madhya Pradesh** (per older reports); by the **2021** Forest Survey Report, **Arunachal Pradesh** has the largest forest cover by area among the options the bank lists.\n" +
        "- **Highest forest cover by PERCENTAGE (Himalayan states)** — **Arunachal Pradesh** (ISFR 2021).\n" +
        "- **Descending forest % (ISFR-style):** among Karnataka, Odisha, Kerala, Andhra Pradesh the bank's order is **Kerala > Odisha > Karnataka > Andhra Pradesh**.",
      table: {
        columns: ["Ranking", "Answer"],
        rows: [
          {
            cells: ["Largest forest cover by AREA (older)", "**Madhya Pradesh**"],
            noteAmber: "NDA 2017 — by area, the largest forest cover is Madhya Pradesh.",
            pyqExampleId: "8ab7fb2a-4176-49f6-9bb6-003202b4e724",
          },
          {
            cells: ["Largest forest cover by AREA (ISFR 2021)", "**Arunachal Pradesh**"],
            noteAmber: "NDA 2022 — per the 2021 report, Arunachal Pradesh (among the listed states).",
            pyqExampleId: "5806cbc2-4a2e-4a2f-a9b5-4e0ee2b288b5",
          },
          {
            cells: ["Highest forest % among Himalayan states", "**Arunachal Pradesh**"],
            noteAmber: "NDA 2025 — highest percentage of geographical area under forest.",
            pyqExampleId: "e776d94d-69b2-451e-8601-7316c75a631e",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which Himalayan state has the highest PERCENTAGE of its area under forest (ISFR 2021)?",
        steps: [
          "Percentage-wise the heavily forested north-east leads.",
          "Among Arunachal, Himachal, Sikkim and Uttarakhand, Arunachal Pradesh is highest.",
        ],
        answer: "Arunachal Pradesh.",
      },
      practiceSet: [
        { prompt: "Largest forest cover by AREA (older reports)?", answer: "Madhya Pradesh" },
        { prompt: "Highest forest % among Himalayan states (ISFR 2021)?", answer: "Arunachal Pradesh" },
        { prompt: "Descending forest % among Karnataka/Odisha/Kerala/AP?", answer: "Kerala > Odisha > Karnataka > Andhra Pradesh" },
      ],
      pyqExampleId: "e776d94d-69b2-451e-8601-7316c75a631e", // highest % Himalayan = Arunachal
      traps: [
        {
          title: "By AREA vs by PERCENTAGE",
          body:
            "Read the wording. 'Largest forest cover' = by AREA (Madhya Pradesh in older data). 'Highest percentage of geographical area under forest' = the small heavily-forested north-east states. Don't give an area answer to a percentage question.",
        },
      ],
    },

    // 4. protected areas (reference)
    {
      kind: "reference" as const,
      slug: "protected-areas",
      name: "Tiger reserves, biosphere reserves and sanctuaries",
      intuition:
        "Protected-area recall. The largest tiger reserve by core habitat is **Nagarjunasagar–Srisailam**. India's biosphere reserves listed in UNESCO's World Network include Gulf of Mannar, Nokrek, Panchmarhi and Simlipal. And a few sanctuary-ordering items (south-to-north placement) appear as HARD match-style questions.",
      definition:
        "- **Largest tiger reserve** (core/critical habitat, by area) — **Nagarjunasagar–Srisailam** (Andhra/Telangana).\n" +
        "- **World Network of Biosphere Reserves (UNESCO)** — includes **Gulf of Mannar, Nokrek, Panchmarhi, Simlipal** (and Nilgiri, etc.).\n" +
        "- **Sanctuary south→north order** — e.g. Bhadra (south) → Simlipal → Pachmarhi → Shikari Devi (north).",
      table: {
        columns: ["Item", "Answer"],
        rows: [
          {
            cells: ["Largest tiger reserve (core habitat)", "**Nagarjunasagar–Srisailam**"],
            noteAmber: "NDA 2018 — largest by core/critical tiger habitat area.",
            pyqExampleId: "898af4cf-8f5e-4fa3-a3c7-cde6ec3058e7",
          },
          {
            cells: ["World Network Biosphere Reserves", "Gulf of Mannar, Nokrek, Panchmarhi, Simlipal"],
            noteAmber: "NDA 2017 — the set included in UNESCO's World Network.",
            pyqExampleId: "59873014-2ec7-492a-a90f-71aaad89d6f4",
          },
          {
            cells: ["Sanctuaries south→north", "Bhadra → Simlipal → Pachmarhi → Shikari Devi"],
            pyqExampleId: "dfed27fc-2950-4d63-ac90-2482e798b8ba",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which is the largest tiger reserve of India in terms of core/critical tiger-habitat area: Manas, Pakke, Nagarjunasagar–Srisailam or Periyar?",
        steps: [
          "Manas, Pakke and Periyar are smaller core habitats.",
          "Nagarjunasagar–Srisailam has the largest core/critical habitat.",
        ],
        answer: "Nagarjunasagar–Srisailam.",
      },
      practiceSet: [
        { prompt: "Largest tiger reserve by core habitat?", answer: "Nagarjunasagar–Srisailam" },
        { prompt: "Name a biosphere reserve in UNESCO's World Network.", answer: "Gulf of Mannar / Nokrek / Panchmarhi / Simlipal / Nilgiri" },
      ],
      pyqExampleId: "898af4cf-8f5e-4fa3-a3c7-cde6ec3058e7", // largest tiger reserve
    },

    // 5. rivers, dams and confluences filed here (reference)
    {
      kind: "reference" as const,
      slug: "rivers-dams-filed-here",
      name: "Rivers, dams, tributaries and confluences",
      intuition:
        "The bank parks a large batch of river/dam recall in this subtopic. Lock the alternative river names (Jhelum = Vitasta, Sarda = Kali), the dam-on-river pairs (KRS dam → Kaveri; Bagalihar/Dulhasti/Salal → Chenab), the confluence towns (Rudraprayag = Alaknanda + Mandakini), the river island (Majuli on the Brahmaputra), and the NOT-a-tributary catches (Indus has no Tawi; Cauvery has no Indravati; Penganga is Godavari's not Ganga's).",
      definition:
        "- **Alternative names** — **Jhelum = Vitasta**; the **Sarda (Sharda)** is known as the **Kali** before entering the UP plains.\n" +
        "- **Dams** — **Krishna Raja Sagara (KRS)** is on the **Kaveri**; **Bagalihar, Dulhasti and Salal** are on the **Chenab**.\n" +
        "- **Confluences** — **Rudraprayag** = Alaknanda + **Mandakini**.\n" +
        "- **River island** — **Majuli** lies on the **Brahmaputra**.\n" +
        "- **NOT-a-tributary catches** — **Tawi** is NOT an Indus tributary; **Indravati** is NOT a Cauvery tributary (it is Godavari's); **Penganga** belongs to the **Godavari**, NOT the Ganga.\n" +
        "- **West-flowing catch** — among Periyar, Bharatpuzha, Pamba, Tamraparni the **Tamraparni** flows EAST, not west.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          {
            cells: ["River island Majuli", "On the **Brahmaputra**"],
            noteAmber: "NDA 2018 — Majuli is on the Brahmaputra.",
            pyqExampleId: "f9ebec88-02e5-4933-b930-54bdf48368ff",
          },
          {
            cells: ["KRS Dam / Reservoir", "On the **Kaveri**"],
            noteAmber: "NDA 2020 — Krishna Raja Sagara is on the Kavery.",
            pyqExampleId: "047cbf0f-53c6-47ca-b82d-d5c46c32d368",
          },
          {
            cells: ["NOT a tributary of the Indus", "**Tawi**"],
            noteAmber: "NDA 2018 — Tawi is the odd one out (Beas/Ravi/Chenab are tributaries).",
            pyqExampleId: "8638de97-7b75-4e34-9931-af970a4c683e",
          },
          {
            cells: ["Wrongly matched river:tributary", "**Ganga : Penganga** (Penganga is Godavari's)"],
            noteAmber: "NDA 2017 — Ganga:Penganga is the incorrectly matched pair.",
            pyqExampleId: "8ac45b8f-0e23-456d-8e0d-9e1e168604a0",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which pair of river and tributary is NOT correctly matched: Godavari:Indravati, Ganga:Penganga, Krishna:Bhima, Luni:Sukri?",
        steps: [
          "Indravati→Godavari, Bhima→Krishna and Sukri→Luni are all correct.",
          "Penganga is a Godavari tributary, not the Ganga's — so Ganga:Penganga is wrong.",
        ],
        answer: "Ganga : Penganga.",
      },
      practiceSet: [
        { prompt: "The Jhelum was earlier called?", answer: "Vitasta" },
        { prompt: "The Sarda is known as which river before the UP plains?", answer: "Kali" },
        { prompt: "Bagalihar, Dulhasti and Salal projects are on which river?", answer: "Chenab" },
        { prompt: "Rudraprayag is the confluence of Alaknanda and?", answer: "Mandakini" },
      ],
      pyqExampleId: "8ac45b8f-0e23-456d-8e0d-9e1e168604a0", // Ganga:Penganga not matched
      traps: [
        {
          title: "Penganga ≠ Ganga, Indravati ≠ Cauvery",
          body:
            "Two sound-alike traps: **Penganga** belongs to the **Godavari** (not the Ganga), and **Indravati** is a **Godavari** tributary (not the Cauvery's). Match by river family, not by the name's first syllable.",
        },
      ],
    },

    // 6. drainage definitions + Himalayan river basins (formula)
    {
      kind: "formula" as const,
      slug: "drainage-and-basins",
      name: "Antecedent drainage and Himalayan river-basin towns",
      intuition:
        "Two concept-style items. An **antecedent** river is one that EXISTED BEFORE the mountain rose and kept cutting its valley down as the land lifted — that is why the Brahmaputra and Indus cut clean through the Himalayas. And the Garhwal-Himalaya towns sit on named river basins (Uttarkashi on the Bhagirathi, Pauri on the Alaknanda, Lansdowne on the Nayar, Narendra Nagar on the Ganga).",
      definition:
        "- **Antecedent drainage** — a river that **existed before the Himalayan range came into existence** and maintained its course by down-cutting as the mountains rose (e.g. Indus, Brahmaputra). It does NOT merely 'follow the initial slope' or 'the dip/strike of rock beds'.\n" +
        "- **Garhwal river-basin towns** — Bhagirathi → **Uttarkashi**; Alaknanda → **Pauri**; Nayar → **Lansdowne**; Ganga → **Narendra Nagar**.",
      authoredExample: {
        prompt:
          "The Brahmaputra and Indus are antecedent rivers. What is the true definition of antecedent drainage?",
        steps: [
          "Antecedent means 'coming before' in time.",
          "An antecedent river was already flowing before the mountains rose.",
          "As the range was uplifted, it kept cutting downward and held its course.",
        ],
        answer: "A river that existed before the Himalayan range came into existence (and cut down as the range rose).",
      },
      selfCheckExample: {
        prompt:
          "Match the Garhwal river basin to its town: Bhagirathi, Alaknanda, Nayar, Ganga ↔ Uttarkashi, Pauri, Lansdowne, Narendra Nagar.",
        steps: [
          "Bhagirathi → Uttarkashi; Alaknanda → Pauri.",
          "Nayar → Lansdowne; Ganga → Narendra Nagar.",
        ],
        answer: "Bhagirathi–Uttarkashi, Alaknanda–Pauri, Nayar–Lansdowne, Ganga–Narendra Nagar.",
      },
      practiceSet: [
        { prompt: "Define an antecedent river in one line.", answer: "One that existed before the mountains rose and cut down as they lifted" },
        { prompt: "Uttarkashi sits on which river basin?", answer: "Bhagirathi" },
        { prompt: "Which Himalayan rivers cut antecedent gorges?", answer: "Indus, Brahmaputra (and Satluj)" },
      ],
      pyqExampleId: "1769f22b-a8a2-4583-b843-5b6fd46c48d8", // antecedent drainage definition
    },

    // 7. longitude, coastline, borders and climate facts (formula)
    {
      kind: "formula" as const,
      slug: "longitude-coast-borders",
      name: "Longitude/sunrise, coastline, borders and climate facts",
      intuition:
        "India is so wide east-to-west that the sun rises about **two hours earlier** in eastern Arunachal than in western Gujarat (roughly 30° of longitude ≈ 2 hours). So eastern places see sunrise first — order any sunrise/longitude list from east to west. A few coastline, border and climate facts also live here: **Tamil Nadu** has the longest coastline among the listed states; the bulk of India's rain is the **South-West Monsoon**; **western disturbances** bring Kashmir its extra winter rain.",
      definition:
        "- **Longitude & sunrise** — India spans ~30° of longitude ≈ **2 hours**: the sun rises in **eastern Arunachal about two hours before western Gujarat**. Eastern places (Itanagar, Aizawl) see sunrise before western ones (Imphal, Agartala order east→west).\n" +
        "- **Coastline** — among Odisha, Tamil Nadu, Karnataka, West Bengal, **Tamil Nadu** has the longest coastline.\n" +
        "- **Borders** — among Arunachal, Assam, Mizoram, Tripura, the one that does NOT share an international border with two or more countries is **Tripura** (it borders only Bangladesh).\n" +
        "- **Climate facts filed here** — **most rainfall = South-West Monsoon**; **Kashmir's winter rain = western disturbances**; **monsoon duration ≈ 100–140 days**.",
      authoredExample: {
        prompt:
          "About how many hours before western Gujarat does the sun rise in eastern Arunachal Pradesh?",
        steps: [
          "Arunachal (~97°E) and Gujarat (~68°E) are roughly 29–30° of longitude apart.",
          "Each 15° of longitude is one hour of solar time.",
          "30° ÷ 15° per hour ≈ 2 hours, with Arunachal ahead (sun rises in the east first).",
        ],
        answer: "About two hours.",
      },
      selfCheckExample: {
        prompt:
          "Which listed state has the longest coastline: Odisha, Tamil Nadu, Karnataka or West Bengal?",
        steps: [
          "Tamil Nadu has a long eastern (Bay of Bengal) coast.",
          "Among the four, Tamil Nadu's coastline is the longest.",
        ],
        answer: "Tamil Nadu.",
      },
      practiceSet: [
        { prompt: "Sunrise in eastern Arunachal is ~how many hours before western Gujarat?", answer: "About two hours" },
        { prompt: "Which state does NOT border two+ countries: Arunachal, Assam, Mizoram, Tripura?", answer: "Tripura" },
        { prompt: "Most of India's rainfall comes from which monsoon?", answer: "South-West Monsoon" },
        { prompt: "Kashmir's extra winter rain comes from?", answer: "Western disturbances" },
      ],
      pyqExampleId: "f09eb31e-d9ab-4de4-82f9-ef19bb90ce9f", // Arunachal-Gujarat 2 hours
      traps: [
        {
          title: "Order sunrise lists EAST to WEST",
          body:
            "The sun rises first in the east. So in any 'chronological order of sunrise' list, the EASTERNMOST place comes first. 15° of longitude = 1 hour, so India's ~30° spread = ~2 hours between its eastern and western edges.",
        },
      ],
    },
  ],
};
